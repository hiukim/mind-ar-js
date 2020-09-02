const {refineHomography} = require('../icp/refine_homography.js');
const {buildModelViewProjectionTransform} = require('../icp/utils.js');
const {GPU} = require('gpu.js');

const AR2_DEFAULT_SEARCH_FEATURE_NUM = 16;
const AR2_DEFAULT_TS = 6;
const AR2_SEARCH_SIZE = 6;

//const AR2_SIM_THRESH = 0.5; // default
const AR2_SIM_THRESH = 0.9;

const AR2_TRACKING_THRESH = 5.0; // default

class Tracker {
  constructor(trackingData, imageList, projectionTransform) {
    this.gpu = new GPU();
    this._initializeGPU(this.gpu);

    this.featureSets = trackingData;
    this.projectionTransform = projectionTransform;

    const points = [];
    for (let j = 0; j < this.featureSets.length; j++) {
      for (let k = 0; k < this.featureSets[j].coords.length; k++) {
        const {mx, my} = this.featureSets[j].coords[k];
        points.push([mx, my, j]);
      }
    }
    this.allFeaturePoints = points;

    this.featurePoints = this._buildFeaturePoints(this.allFeaturePoints);
    const {imagePixels, imageProperties} = this._combineImageList(imageList);
    this.imagePixels = imagePixels;
    this.imageProperties = imageProperties; // [ [width, height, dpi] ]

    this.videoKernel = null;
    this.detectedKernel = null;
    this.updatePrevResultsKernel = null;
    this.kernels = [];
  }

  detected(modelViewTransform) {
    this.lastModelViewTransform = modelViewTransform;
  }

  setupQuery(queryWidth, queryHeight) {
    this.width = queryWidth;
    this.height = queryHeight;
  }

  track(video, lastModelViewTransform) {
    if (this.videoKernel === null) {
      this.videoKernel = this.gpu.createKernel(function(videoFrame) {
        const pixel = videoFrame[this.constants.height-1-Math.floor(this.thread.x / this.constants.width)][this.thread.x % this.constants.width];
        //return Math.floor((pixel[0] + pixel[1] + pixel[2]) * 255 / 3);
        // https://stackoverflow.com/questions/596216/formula-to-determine-brightness-of-rgb-color/596241#596241
        return 255 * (0.2126 * pixel[0] + 0.7152 * pixel[1] + 0.0722 * pixel[2]);
      }, {
        constants: {width: this.width, height: this.height},
        output: [this.width * this.height],
        pipeline: true,
      })
    }
    this.kernelIndex = 0; // reset kernelIndex

    const targetImage = this.videoKernel(video);

    this.lastModelViewTransform = lastModelViewTransform;

    const modelViewProjectionTransform = buildModelViewProjectionTransform(this.projectionTransform, this.lastModelViewTransform);

    const searchPoints = this._computeSearchPoints(this.featurePoints, modelViewProjectionTransform);

    const templates = this._buildTemplates(this.imagePixels, this.imageProperties, this.featurePoints, searchPoints, modelViewProjectionTransform);

    const similarities = this._computeSimilarity(targetImage, searchPoints, templates);

    const best = this._pickBest(searchPoints, similarities);

    const bestArr = best.toArray();

    const selectedFeatures = [];
    for (let i = 0; i < bestArr.length; i++) {
      if (bestArr[i][2] > AR2_SIM_THRESH) {
        selectedFeatures.push({
          pos2D: {x: bestArr[i][0], y: bestArr[i][1]},
          pos3D: {x: this.allFeaturePoints[i][0], y: this.allFeaturePoints[i][1], z: 0},
          sim: bestArr[i][2]
        });
      }
    }
    if (selectedFeatures.length < 4) {
      return null;
    }

    return selectedFeatures;

    const modelViewTransform = this.lastModelViewTransform;
    const projectionTransform = this.projectionTransform;

    const inlierProbs = [1.0, 0.8, 0.6, 0.4, 0.0];
    let err = null;
    let newModelViewTransform = modelViewTransform;
    let finalModelViewTransform = null;
    for (let i = 0; i < inlierProbs.length; i++) {
      let ret = _computeUpdatedTran({modelViewTransform: newModelViewTransform, selectedFeatures, projectionTransform, inlierProb: inlierProbs[i]});
      err = ret.err;
      newModelViewTransform = ret.newModelViewTransform;
      //console.log("_computeUpdatedTran", err)

      if (err < AR2_TRACKING_THRESH) {
        finalModelViewTransform = newModelViewTransform;
        break;
      }
    }

    if (finalModelViewTransform === null) return null;
    this.lastModelViewTransform = finalModelViewTransform;
    return finalModelViewTransform;
  }

  _computeSearchPoints(featurePoints, modelViewProjectionTransform) {
    if (this.kernelIndex === this.kernels.length) {
      const k = this.gpu.createKernel(function(featurePoints, modelViewProjectionTransform) {
        const mx = featurePoints[this.thread.y][0];
        const my = featurePoints[this.thread.y][1];
        const u = computeScreenCoordiate(modelViewProjectionTransform, mx, my, 0);

        if (this.thread.x === 0) return Math.floor(u[1] + 0.5); // x
        return Math.floor(u[2] + 0.5); // y
      }, {
        pipeline: true,
        output: [2, this.featurePoints.dimensions[1]]
      });
      this.kernels.push(k);
    }
    const kernel = this.kernels[this.kernelIndex++];
    const result = kernel(featurePoints, modelViewProjectionTransform);
    return result;
  }

  _buildTemplates(imagePixels, imageProperties, featurePoints, searchPoints, modelViewProjectionTransform) {
    const templateOneSize = AR2_DEFAULT_TS;
    const templateSize = templateOneSize * 2 + 1;
    if (this.kernelIndex === this.kernels.length) {
      const k = this.gpu.createKernel(function(imagePixels, imageProperties, featurePoints, searchPoints, modelViewProjectionTransform) {
        const {templateOneSize} = this.constants;

        const featureIndex = this.thread.z;
        const level = featurePoints[featureIndex][2];
        const sx = searchPoints[featureIndex][0];
        const sy = searchPoints[featureIndex][1];

        const sx2 = sx + (this.thread.x - templateOneSize);
        const sy2 = sy + (this.thread.y - templateOneSize);

        const m = screenToMarkerCoordinate(modelViewProjectionTransform, sx2, sy2);
        const mx2 = m[0];
        const my2 = m[1];

        const imageWidth = imageProperties[level][0];
        const imageHeight = imageProperties[level][1];
        const imagePixelOffset = imageProperties[level][2];
        const imageDPI = imageProperties[level][3];

        const ix = Math.floor(mx2 * imageDPI + 0.5);
        const iy = Math.floor(imageHeight - my2 * imageDPI + 0.5);

        if (ix < 0 || ix >= imageWidth) {
          return -1;
        }
        if (iy < 0 || iy >= imageHeight) {
          return -1;
        }
        return imagePixels[imagePixelOffset + iy * imageWidth + ix];
      }, {
        constants: {templateOneSize},
        pipeline: true,
        output: [templateSize, templateSize, this.featurePoints.dimensions[1]]
      });
      this.kernels.push(k);
    }
    const kernel = this.kernels[this.kernelIndex++];
    const result = kernel(imagePixels, imageProperties, featurePoints, searchPoints, modelViewProjectionTransform);
    return result;
  }

  _computeSimilarity(targetImage, searchPoints, tem) {
    const templateOneSize = AR2_DEFAULT_TS;
    const templateSize = templateOneSize * 2 + 1;
    const searchOneSize = AR2_SEARCH_SIZE;
    const searchSize = searchOneSize * 2 + 1;

    if (this.kernelIndex === this.kernels.length) {
      const k = this.gpu.createKernel(function(targetImage, searchPoints, tem) {
        const {searchSize, searchOneSize, templateSize, templateOneSize, targetWidth, targetHeight} = this.constants;

        if (searchPoints[this.thread.y][0] === -1) return -1;

        const featureIndex = this.thread.y;
        const dx = this.thread.x % searchSize;
        const dy = Math.floor(this.thread.x / searchSize);

        const px = searchPoints[featureIndex][0] - searchOneSize + dx;
        const py = searchPoints[featureIndex][1] - searchOneSize + dy;
        if (px < 0 || px >= targetWidth) return -1;
        if (py < 0 || py >= targetHeight) return -1;

        let sumPoint = 0;
        let sumPointSquare = 0;
        let sumTemplate = 0;
        let sumTemplateSquare = 0;
        let sumPointTemplate = 0;
        let templateValidCount = 0;
        for (let j = 0; j < templateSize; j++) {
          for (let i = 0; i < templateSize; i++) {
            if (tem[j][i] !== -1) {
              const py2 = py - templateOneSize + j;
              const px2 = px - templateOneSize + i;

              sumTemplate += tem[featureIndex][j][i];
              sumTemplateSquare += tem[featureIndex][j][i] * tem[featureIndex][j][i];
              templateValidCount += 1;

              if (px2 >= 0 && px2 < targetWidth && py2 >=0 && py2 < targetHeight) {
                sumPoint += targetImage[py2 * targetWidth + px2];
                sumPointSquare += targetImage[py2 * targetWidth + px2] * targetImage[py2 * targetWidth + px2];
                sumPointTemplate += targetImage[py2 * targetWidth + px2] * tem[featureIndex][j][i];
              }
            }
          }
        }

        // TODO: maybe just sum template only when point is also valid?
        sumPointTemplate -= sumPoint * sumTemplate / templateValidCount;

        const pointVar = Math.sqrt(sumPointSquare - sumPoint * sumPoint / templateValidCount);
        if (pointVar == 0) return -1;
        if (templateValidCount === 0) return -1;
        const templateVar = Math.sqrt(sumTemplateSquare - sumTemplate * sumTemplate / templateValidCount);
        if (templateVar == 0) return -1;
        const coVar = sumPointTemplate / templateVar / pointVar;

        return coVar;
      }, {
        constants: {
          searchOneSize,
          searchSize,
          templateSize,
          templateOneSize,
          targetWidth: this.width,
          targetHeight: this.height
        },
        pipeline: true,
        output: [searchSize * searchSize, this.featurePoints.dimensions[1]],
      });
      this.kernels.push(k);
    }
    const kernel = this.kernels[this.kernelIndex++];
    const result = kernel(targetImage, searchPoints, tem);
    return result;
  }

  _pickBest(searchPoints, similarities) {
    const searchOneSize = AR2_SEARCH_SIZE;
    const searchSize = searchOneSize * 2 + 1;

    if (this.kernelIndex === this.kernels.length) {
      const k = this.gpu.createKernel(function(searchPoints, similarities) {
        const {searchOneSize, searchSize} = this.constants;
        const featureIndex = this.thread.y;

        let max = -1;
        let maxIndexI = -1;
        for (let i = 0; i < searchSize * searchSize; i++) {
          if (similarities[featureIndex][i] > max) {
            max = similarities[featureIndex][i];
            maxIndexI = i;
          }
        }
        if (max === -1) return -1;

        if (this.thread.x === 0) return searchPoints[featureIndex][0] - searchOneSize + (maxIndexI % searchSize);
        if (this.thread.x === 1) return searchPoints[featureIndex][1] - searchOneSize + Math.floor(maxIndexI / searchSize);
        return max;
      }, {
        constants: {
          searchOneSize,
          searchSize,
        },
        pipeline: true,
        output: [3, this.featurePoints.dimensions[1]], // [x, y, coVar]
      });

      this.kernels.push(k);
    }
    const kernel = this.kernels[this.kernelIndex++];
    const result = kernel(searchPoints, similarities);
    return result;
  }

  // first dimension: [x, y, keyframeIndex]
  _buildFeaturePoints(featurePoints) {
    const kernel = this.gpu.createKernel(function(data) {
      return data[this.thread.y][this.thread.x];
    }, {
      pipeline: true,
      output: [3, featurePoints.length]
    });
    const result = kernel(featurePoints);
    return result;
  }

  _initializeGPU(gpu) {
    gpu.addFunction(function computeScreenCoordiate(modelViewProjectionTransforms, x, y, z) {
      const ux = modelViewProjectionTransforms[0][0] * x + modelViewProjectionTransforms[0][1] * y
         + modelViewProjectionTransforms[0][2] * z + modelViewProjectionTransforms[0][3];
      const uy = modelViewProjectionTransforms[1][0] * x + modelViewProjectionTransforms[1][1] * y
         + modelViewProjectionTransforms[1][2] * z + modelViewProjectionTransforms[1][3];
      const uz = modelViewProjectionTransforms[2][0] * x + modelViewProjectionTransforms[2][1] * y
         + modelViewProjectionTransforms[2][2] * z + modelViewProjectionTransforms[2][3];
      if( Math.abs(uz) < 0.000001 ) return [0, 0, 0];
      // first number indicates has valid result
      return [1, ux/uz, uy/uz];
    });

    gpu.addFunction(function screenToMarkerCoordinate(modelViewProjectionTransform, sx, sy) {
      const c11 = modelViewProjectionTransform[2][0] * sx - modelViewProjectionTransform[0][0];
      const c12 = modelViewProjectionTransform[2][1] * sx - modelViewProjectionTransform[0][1];
      const c21 = modelViewProjectionTransform[2][0] * sy - modelViewProjectionTransform[1][0];
      const c22 = modelViewProjectionTransform[2][1] * sy - modelViewProjectionTransform[1][1];
      const b1  = modelViewProjectionTransform[0][3] - modelViewProjectionTransform[2][3] * sx;
      const b2  = modelViewProjectionTransform[1][3] - modelViewProjectionTransform[2][3] * sy;

      const m = c11 * c22 - c12 * c21;
      return [
        (c22 * b1 - c12 * b2) / m,
        (c11 * b2 - c21 * b1) / m
      ]
    });
  }

  _combineImageList(imageList) {
    let totalPixel = 0;
    let propertiesData = [];
    for (let i = 0; i < imageList.length; i++) {
      propertiesData.push([imageList[i].width, imageList[i].height, totalPixel, imageList[i].dpi]);
      totalPixel += imageList[i].width * imageList[i].height;
    }

    let allPixels = [];
    let c = 0;
    for (let i = 0; i < imageList.length; i++) {
      for (let j = 0; j < imageList[i].data.length; j++) {
        allPixels[c++] = imageList[i].data[j];
      }
    }
    const imagePixelsKernel = this.gpu.createKernel(function(data) {
      return data[this.thread.x];
    }, {
      output: [allPixels.length],
      pipeline: true
    });
    const imagePixels = imagePixelsKernel(allPixels);

    const propertiesKernel = this.gpu.createKernel(function(data) {
      return data[this.thread.y][this.thread.x];
    }, {
      output: [propertiesData[0].length, propertiesData.length],
      pipeline: true
    });
    const properties = propertiesKernel(propertiesData);
    return {imagePixels: imagePixels, imageProperties: properties};
  }
}

const _computeUpdatedTran = ({modelViewTransform, projectionTransform, selectedFeatures, inlierProb}) => {
  let dx = 0;
  let dy = 0;
  let dz = 0;
  for (let i = 0; i < selectedFeatures.length; i++) {
    dx += selectedFeatures[i].pos3D.x;
    dy += selectedFeatures[i].pos3D.y;
    dz += selectedFeatures[i].pos3D.z;
  }
  dx /= selectedFeatures.length;
  dy /= selectedFeatures.length;
  dz /= selectedFeatures.length;

  const worldCoords = [];
  const screenCoords = [];
  for (let i = 0; i < selectedFeatures.length; i++) {
    screenCoords.push({x: selectedFeatures[i].pos2D.x, y: selectedFeatures[i].pos2D.y});
    worldCoords.push({x: selectedFeatures[i].pos3D.x - dx, y: selectedFeatures[i].pos3D.y - dy, z: selectedFeatures[i].pos3D.z - dz});
  }

  const diffModelViewTransform = [[],[],[]];
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      diffModelViewTransform[j][i] = modelViewTransform[j][i];
    }
  }
  diffModelViewTransform[0][3] = modelViewTransform[0][0] * dx + modelViewTransform[0][1] * dy + modelViewTransform[0][2] * dz + modelViewTransform[0][3];
  diffModelViewTransform[1][3] = modelViewTransform[1][0] * dx + modelViewTransform[1][1] * dy + modelViewTransform[1][2] * dz + modelViewTransform[1][3];
  diffModelViewTransform[2][3] = modelViewTransform[2][0] * dx + modelViewTransform[2][1] * dy + modelViewTransform[2][2] * dz + modelViewTransform[2][3];

  let ret;
  if (inlierProb < 1) {
     ret = refineHomography({initialModelViewTransform: diffModelViewTransform, projectionTransform, worldCoords, screenCoords, isRobustMode: true, inlierProb});
  } else {
     ret = refineHomography({initialModelViewTransform: diffModelViewTransform, projectionTransform, worldCoords, screenCoords, isRobustMode: false});
  }

  const newModelViewTransform = [[],[],[]];
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      newModelViewTransform[j][i] = ret.modelViewTransform[j][i];
    }
  }
  newModelViewTransform[0][3] = ret.modelViewTransform[0][3] - ret.modelViewTransform[0][0] * dx - ret.modelViewTransform[0][1] * dy - ret.modelViewTransform[0][2] * dz;
  newModelViewTransform[1][3] = ret.modelViewTransform[1][3] - ret.modelViewTransform[1][0] * dx - ret.modelViewTransform[1][1] * dy - ret.modelViewTransform[1][2] * dz;
  newModelViewTransform[2][3] = ret.modelViewTransform[2][3] - ret.modelViewTransform[2][0] * dx - ret.modelViewTransform[2][1] * dy - ret.modelViewTransform[2][2] * dz;


  return {err: ret.err, newModelViewTransform};
};

module.exports = {
  Tracker
}

