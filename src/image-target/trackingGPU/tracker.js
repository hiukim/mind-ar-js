const {screenToMarkerCoordinate, applyModelViewProjectionTransform, buildModelViewProjectionTransform, computeScreenCoordiate} = require('../icp/utils.js');

const {createRandomizer} = require('../utils/randomizer.js');
const {GPU} = require('gpu.js');

const AR2_DEFAULT_SEARCH_FEATURE_NUM = 16;
const AR2_DEFAULT_TS = 6;
const AR2_SEARCH_SIZE = 6;
const AR2_SIM_THRESH = 0.5;
//const AR2_SIM_THRESH = 0.2; // 0.5 is default. 0.2 for debug

const PREV_KEEP = 3;

class Tracker {
  constructor(trackingData, imageList, projectionTransform) {
    this.gpu = new GPU();
    this._initializeGPU(this.gpu);

    this.featureSets = trackingData.featureSets;
    this.featurePoints = this._buildFeaturePoints(trackingData.featureSets);

    const {imagePixels, imageProperties} = this._combineImageList(imageList);
    this.imagePixels = imagePixels;
    this.imageProperties = imageProperties; // [ [width, height, dpi] ]

    this.projectionTransform = this._initializeProjectionTransform(projectionTransform);
    this.randomizer = createRandomizer();
    this.prevResults = [];

    this.videoKernel = null;
    this.detectedKernel = null;
    this.kernels = [];

    console.log('imagePixels', this.imagePixels.toArray());
    console.log('imageProperties', this.imageProperties.toArray());
  }

  _initializeProjectionTransform(projectionTransform) {
    const kernel = this.gpu.createKernel(function(data) {
      return data[this.thread.y][this.thread.x];
    }, {
      pipeline: true,
      output: [4, 3]
    });
    const result = kernel(projectionTransform);
    return result;
  }

  _initializeGPU(gpu) {
    gpu.addFunction(function computeScreenCoordiate(modelViewProjectionTransforms, t, x, y, z) {
      const ux = modelViewProjectionTransforms[t][0][0] * x + modelViewProjectionTransforms[t][0][1] * y
         + modelViewProjectionTransforms[t][0][2] * z + modelViewProjectionTransforms[t][0][3];
      const uy = modelViewProjectionTransforms[t][1][0] * x + modelViewProjectionTransforms[t][1][1] * y
         + modelViewProjectionTransforms[t][1][2] * z + modelViewProjectionTransforms[t][1][3];
      const uz = modelViewProjectionTransforms[t][2][0] * x + modelViewProjectionTransforms[t][2][1] * y
         + modelViewProjectionTransforms[t][2][2] * z + modelViewProjectionTransforms[t][2][3];
      if( Math.abs(uz) < 0.000001 ) return [0, 0, 0];
      // first number indicates has valid result
      return [1, ux/uz, uy/uz];
    });

    gpu.addFunction(function screenToMarkerCoordinate(modelViewProjectionTransform, t, sx, sy) {
      const c11 = modelViewProjectionTransform[t][2][0] * sx - modelViewProjectionTransform[t][0][0];
      const c12 = modelViewProjectionTransform[t][2][1] * sx - modelViewProjectionTransform[t][0][1];
      const c21 = modelViewProjectionTransform[t][2][0] * sy - modelViewProjectionTransform[t][1][0];
      const c22 = modelViewProjectionTransform[t][2][1] * sy - modelViewProjectionTransform[t][1][1];
      const b1  = modelViewProjectionTransform[t][0][3] - modelViewProjectionTransform[t][2][3] * sx;
      const b2  = modelViewProjectionTransform[t][1][3] - modelViewProjectionTransform[t][2][3] * sy;

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

    const initKernel = this.gpu.createKernel(function() {
      return -1;
    }, {
      output: [totalPixel],
      pipeline: true
    });
    let combined = initKernel();
    //initKernel.destroy();

    let startIndex = 0;
    let endIndex = 0;
    const kernels = [];
    for (let i = 0; i < imageList.length; i++) {
      endIndex = startIndex + imageList[i].width * imageList[i].height;

      const kernel = this.gpu.createKernel(function(data, imageData) {
        const {startIndex, endIndex} = this.constants;
        if (this.thread.x < startIndex || this.thread.x >= endIndex) return data[this.thread.x];
        return imageData[this.thread.x - startIndex];
      }, {
        constants: {startIndex, endIndex},
        output: [totalPixel],
        pipeline: true
      });
      combined = kernel(combined, imageList[i].data);
      kernels.push(kernel);
      startIndex = endIndex;
    }
    for (let i = 0; i < imageList.length-1; i++) {
      //kernels[i].destroy();
    }

    const propertiesKernel = this.gpu.createKernel(function(data) {
      return data[this.thread.y][this.thread.x];
    }, {
      output: [propertiesData[0].length, propertiesData.length],
      pipeline: true
    });
    const properties = propertiesKernel(propertiesData);
    //dimensionKernel.destroy();
    return {imagePixels: combined, imageProperties: properties};
  }

  // first dimension: [x, y, level index, maxdpi, mindpi]
  _buildFeaturePoints(featureSets) {
    const points = [];
    for (let j = 0; j < featureSets.length; j++) {
      const maxdpi = featureSets[j].maxdpi;
      const mindpi = featureSets[j].mindpi;
      for (let k = 0; k < featureSets[j].coords.length; k++) {
        const {mx, my} = featureSets[j].coords[k];
        points.push([mx, my, j, maxdpi, mindpi]);
      }
    }
    const kernel = this.gpu.createKernel(function(data) {
      return data[this.thread.y][this.thread.x];
    }, {
      pipeline: true,
      output: [5, points.length]
    });
    const result = kernel(points);
    //kernel.destroy();
    return result;
  }

  detected(modelViewTransform) {
    if (this.detectedKernel === null) {
      const buildModelView = this.gpu.createKernel(function(data) {
        return data[this.thread.y][this.thread.x];
      }, {
        pipeline: true,
        output: [4, 3, PREV_KEEP]
      });
      const buildModelViewProjection = this.gpu.createKernel(function(modelViewTransform, projectionTransform) {
        const j = this.thread.y;
        const i = this.thread.x;
        return projectionTransform[j][0] * modelViewTransform[0][i]
             + projectionTransform[j][1] * modelViewTransform[1][i]
             + projectionTransform[j][2] * modelViewTransform[2][i];
      }, {
        pipeline: true,
        output: [4, 3, PREV_KEEP]
      });
      const buildFeatureIndexes = this.gpu.createKernel(function() {
        return -1;
      }, {
        pipeline: true,
        output: [AR2_DEFAULT_SEARCH_FEATURE_NUM, PREV_KEEP]
      });

      this.detectedKernel = [buildModelView, buildModelViewProjection, buildFeatureIndexes];
    }

    this.prevModelViewTransforms = this.detectedKernel[0](modelViewTransform);
    this.prevModelViewProjectionTransforms = this.detectedKernel[1](modelViewTransform, this.projectionTransform);
    this.prevSelectedFeatureIndexes = this.detectedKernel[2]();

    console.log("detected", this.prevModelViewTransforms.toArray(), this.prevModelViewProjectionTransforms.toArray(), this.prevSelectedFeatureIndexes.toArray());

    const selectedFeatureIndexes = [];
    for (let i = 0; i < AR2_DEFAULT_SEARCH_FEATURE_NUM; i++) selectedFeatureIndexes[i] = -1;
    this.prevResults = [{
      modelViewTransform: modelViewTransform,
      selectedFeatureIndexes: selectedFeatureIndexes
    }];
  }

  setupQuery(queryWidth, queryHeight) {
    this.width = queryWidth;
    this.height = queryHeight;
  }

  track(video) {
    if (this.videoKernel === null) {
      this.videoKernel = this.gpu.createKernel(function(videoFrame) {
        const pixel = videoFrame[this.constants.height-1-Math.floor(this.thread.x / this.constants.width)][this.thread.x % this.constants.width];
        return Math.floor((pixel[0] + pixel[1] + pixel[2]) * 255 / 3);
      }, {
        constants: {width: this.width, height: this.height},
        output: [this.width * this.height],
        pipeline: true,
      })
    }
    const targetImage = this.videoKernel(video);

    this.kernelIndex = 0; // reset kernelIndex
    const candidates = this._computeCandidates();

    const candidateTypes = candidates.result;
    const candidateSXs = candidates.saveSX;
    const candidateSYs = candidates.saveSY;

    const candidateTypesArr = candidateTypes.toArray();
    const candidateSXsArr = candidateSXs.toArray();
    const candidateSYsArr = candidateSYs.toArray();

    const candidates1 = [];
    const candidates2 = [];
    for (let i = 0; i < candidateTypesArr.length; i++) {
      if (candidateTypesArr[i] === 1) candidates1.push({sx: candidateSXsArr[i], sy: candidateSYsArr[i]});
      if (candidateTypesArr[i] === 2) candidates2.push({sx: candidateSXsArr[i], sy: candidateSYsArr[i]});
    }
    console.log("candidates", candidates1, candidates2);

    // select feature one by one
    let i = 0;
    let num = 0;
    let selection = this._initializeSelection();
    for (let i = 0; i < AR2_DEFAULT_SEARCH_FEATURE_NUM; i++) {
      const newSelected = this._selectCandidate(selection, candidateTypes, candidateSXs, candidateSYs);
      console.log("new selected", newSelected.toArray(), candidateSXsArr[newSelected.toArray()[0]]);
      const mappedTargetPosition = this._mapCandidate(targetImage, newSelected);
      console.log("mappedTargetPosition", mappedTargetPosition.toArray());
      selection = this._combineSelection(selection, i, newSelected, mappedTargetPosition);
      console.log("combined selection", selection.toArray());
    }

    const result = null;
    if (result !== null) {
      this.prevResults.push(result);
      if (this.prevResults.length > 3) {
        this.prevResults.shift();
      }
    } else {
      this.prevResults = [];
    }
  }

  getLatest() {
    if (this.prevResults.length === 0) return null;

    return this.prevResults[this.prevResults.length-1].modelViewTransform;
  }

  // first dimension: [featureIndex, mx, my, ix, iy, similarity]
  _initializeSelection() {
    if (this.kernelIndex === this.kernels.length) {
      const kernel = this.gpu.createKernel(function() {
        return -1;
      }, {
        pipeline: true,
        output: [6, AR2_DEFAULT_SEARCH_FEATURE_NUM]
      });
      this.kernels.push(kernel);
    }
    const kernel = this.kernels[this.kernelIndex++];
    return kernel();
  }

  _combineSelection(selection, selectionIndex, newSelected, mappedTargetPosition) {
    if (this.kernelIndex === this.kernels.length) {
      const kernel = this.gpu.createKernel(function(selection, newSelected, featurePoints, mappedTargetPosition) {
        const {selectionIndex} = this.constants;
        if (this.thread.y !== selectionIndex) return selection[this.thread.y][this.thread.x];

        if (this.thread.x === 0) return newSelected[0];
        if (this.thread.x === 1) return featurePoints[newSelected[0]][0];
        if (this.thread.x === 2) return featurePoints[newSelected[0]][1];
        if (this.thread.x === 3) return mappedTargetPosition[0];
        if (this.thread.x === 4) return mappedTargetPosition[1];
        if (this.thread.x === 5) return mappedTargetPosition[2];
      }, {
        constants: {selectionIndex},
        pipeline: true,
        output: [6, AR2_DEFAULT_SEARCH_FEATURE_NUM]
      });
      this.kernels.push(kernel);
    }
    const kernel = this.kernels[this.kernelIndex++];
    return kernel(selection, newSelected, this.featurePoints, mappedTargetPosition);
  }

  _mapCandidate(targetImage, newSelected) {
    const templateOneSize = AR2_DEFAULT_TS;
    const templateSize = templateOneSize * 2 + 1;
    const searchOneSize = AR2_SEARCH_SIZE;
    const searchSize = searchOneSize * 2 + 1;

    if (this.kernelIndex === this.kernels.length) {
      const k = this.gpu.createKernel(function(imagePixels, imageProperties, featurePoints, newSelected, modelViewProjectionTransforms, modelViewTransforms) {
        const {templateOneSize} = this.constants;

        const featureIndex = newSelected[0];
        const i = this.thread.x;
        const j = this.thread.y;

        const mx = featurePoints[featureIndex][0];
        const my = featurePoints[featureIndex][1];
        const level = featurePoints[featureIndex][2];

        const u = computeScreenCoordiate(modelViewProjectionTransforms, 0, mx, my, 0);
        const sx = Math.floor(u[1] + 0.5);
        const sy = Math.floor(u[2] + 0.5);

        const sx2 = sx + (i - templateOneSize);
        const sy2 = sy + (j - templateOneSize);

        const m = screenToMarkerCoordinate(modelViewProjectionTransforms, 0, sx2, sy2);
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
        output: [templateSize, templateSize]
      });

      const k2 = this.gpu.createKernel(function(featurePoints, newSelected, modelViewProjectionTransforms) {
        const prevKeep = this.constants.prevKeep;

        const featureIndex = newSelected[0];
        const mx = featurePoints[featureIndex][0];
        const my = featurePoints[featureIndex][1];

        if (this.thread.y === 0) {
          const u = computeScreenCoordiate(modelViewProjectionTransforms, this.thread.y, mx, my, 0);
          return Math.floor(u[this.thread.x+1]);
        } else if (this.thread.y === 1) {
          const u1 = computeScreenCoordiate(modelViewProjectionTransforms, this.thread.y-1, mx, my, 0);
          const u = computeScreenCoordiate(modelViewProjectionTransforms, this.thread.y, mx, my, 0);
          return Math.floor(2 * u1[this.thread.x+1] - u[this.thread.x+1]);
        } else {
          const u1 = computeScreenCoordiate(modelViewProjectionTransforms, this.thread.y-2, mx, my, 0);
          const u2 = computeScreenCoordiate(modelViewProjectionTransforms, this.thread.y-1, mx, my, 0);
          const u = computeScreenCoordiate(modelViewProjectionTransforms, this.thread.y, mx, my, 0);
          return Math.floor(3 * u1[this.thread.x+1] - 3 * u2[this.thread.x+1] + u[this.thread.x+1]);
        }
      }, {
        constants: {prevKeep: PREV_KEEP},
        pipeline: true,
        output: [2, PREV_KEEP]
      });

      // compute similartiy with template of all neighbour points within search points
      const k3 = this.gpu.createKernel(function(targetImage, searchPoints, tem) {
        const {searchOneSize, templateSize, templateOneSize, targetWidth, targetHeight} = this.constants;

        const px = searchPoints[this.thread.z][0] - searchOneSize + this.thread.x;
        const py = searchPoints[this.thread.z][1] - searchOneSize + this.thread.y;
        if (px < 0 || px >= targetWidth) return -1;
        if (py < 0 || py >= targetHeight) return -1;

        let sumPoint = 0;
        let sumPointSquare = 0;
        let sumTemplate = 0;
        let sumTemplateSquare = 0;
        let sumPointTemplate = 0;
        let validCount = 0;
        let templateValidCount = 0;
        for (let j = 0; j < templateSize; j++) {
          for (let i = 0; i < templateSize; i++) {
            if (tem[j][i] !== -1) {
              const py2 = py - templateOneSize + j;
              const px2 = px - templateOneSize + i;

              sumTemplate += tem[j][i];
              sumTemplateSquare += tem[j][i] * tem[j][i];
              templateValidCount += 1;

              if (px2 >= 0 && px2 < targetWidth && py2 >=0 && py2 < targetHeight) {
                validCount += 1;
                sumPoint += targetImage[py2 * targetWidth + px2];
                sumPointSquare += targetImage[py2 * targetWidth + px2] * targetImage[py2 * targetWidth + px2];
                sumPointTemplate += targetImage[py2 * targetWidth + px2] * tem[j][i];
              }
            }
          }
        }
        // TODO: maybe just sum template only when point is also valid?
        sumPointTemplate -= sumPoint * sumTemplate / templateValidCount;

        const pointVar = Math.sqrt(sumPointSquare - sumPoint * sumPoint / templateValidCount);
        const templateVar = Math.sqrt(sumTemplateSquare - sumTemplate * sumTemplate / templateValidCount);
        const coVar = sumPointTemplate / templateVar / pointVar;

        return coVar;
      }, {
        constants: {
          searchOneSize,
          templateSize,
          templateOneSize,
          targetWidth: this.width,
          targetHeight: this.height
        },
        pipeline: true,
        output: [searchSize, searchSize, PREV_KEEP],
      });

      const k4 = this.gpu.createKernel(function(searchPoints, coVars) {
        const {prevKeep, searchOneSize, searchSize} = this.constants;

        let max = -1;
        let maxIndexI = -1;
        let maxIndexJ = -1;
        let maxIndexK = -1;
        for (let k = 0; k < prevKeep; k++) {
          for (let j = 0; j < searchSize; j++) {
            for (let i = 0; i < searchSize; i++) {
              if (coVars[k][j][i] > max) {
                max = coVars[k][j][i];
                maxIndexI = i;
                maxIndexJ = j;
                maxIndexK = k;
              }
            }
          }
        }
        if (max === -1) return -1;

        if (this.thread.x === 0) return searchPoints[maxIndexK][0] - searchOneSize + maxIndexI;
        if (this.thread.x === 1) return searchPoints[maxIndexK][1] - searchOneSize + maxIndexJ;
        return max;
      }, {
        constants: {
          prevKeep: PREV_KEEP,
          searchOneSize,
          searchSize,
        },
        pipeline: true,
        output: [3], // [x, y, coVar]
      });

      this.kernels.push([k, k2, k3, k4]);
    };
    const kernels = this.kernels[this.kernelIndex++];
    const template = kernels[0](this.imagePixels, this.imageProperties, this.featurePoints, newSelected, this.prevModelViewProjectionTransforms, this.prevModelViewTransforms);

    const searchPoints = kernels[1](this.featurePoints, newSelected, this.prevModelViewProjectionTransforms);
    const coVars = kernels[2](targetImage, searchPoints, template);
    const result = kernels[3](searchPoints, coVars);
    //console.log("template", template.toArray());
    //console.log("search points", searchPoints.toArray());
    //console.log("coVars", coVars.toArray());
    //console.log("result", result.toArray());
    return result;
  }

  _selectCandidate(selection, candidateTypes, candidateSXs, candidateSYs) {
    if (this.kernelIndex === this.kernels.length) {
      const kernel = this.gpu.createKernel(function(selection, candidateTypes, candidateSXs, candidateSYs) {
        const {selectionLength, candidateLength, targetWidth, targetHeight, simThreshold} = this.constants;

        let selected1 = -1;
        let selected2 = -1;
        let selected3 = -1;
        let selected4 = -1;
        for (let i = 0; i < selectionLength; i++) {
          if (selection[i][0] !== -1 && selection[i][5] > simThreshold) {

            if (selected1 === -1) selected1 = selection[i][0];
            else if (selected2 === -1) selected2 = selection[i][0];
            else if (selected3 === -1) selected3 = selection[i][0];
            else if (selected4 === -1) selected4 = selection[i][0];
          }
        }

        if (selected1 === -1) {
          let dmax1 = 0.0;
          let index1 = -1;
          let dmax2 = 0.0;
          let index2 = -1;

          for (let i = 0; i < candidateLength; i++) {
            if (candidateTypes[i] !== 0) {
              let used = false;
              for (let j = 0; j < selectionLength; j++) {
                if (selection[j][0] === i) used = true;
              }
              if (!used
                && candidateSXs[i] >= targetWidth/8 && candidateSXs[i] <= targetWidth * 7 / 8
                && candidateSYs[i] >= targetHeight/8 && candidateSYs[i] <= targetHeight * 7 / 8) {

                // distancce from center
                const d = (candidateSXs[i] - targetWidth/2) * (candidateSXs[i] - targetWidth/2)
                        + (candidateSYs[i] - targetHeight/2) * (candidateSYs[i] - targetHeight/2);

                if (candidateTypes[i] === 1 && d > dmax1) {
                  dmax1 = d;
                  index1 = i;
                }
                else if (candidateTypes[i] === 2 && d > dmax2) {
                  dmax2 = d;
                  index2 = i;
                }
              }
            }
          }
          if (index1 !== -1) return index1;
          if (index2 !== -1) return index2;
          return -1;
        }
        else if (selected2 === -1) {
          let dmax1 = 0.0;
          let index1 = -1;
          let dmax2 = 0.0;
          let index2 = -1;

          for (let i = 0; i < candidateLength; i++) {
            if (candidateTypes[i] !== 0) {
              let used = false;
              for (let j = 0; j < selectionLength; j++) {
                if (selection[j][0] === i) used = true;
              }
              if (!used
                && candidateSXs[i] >= targetWidth/8 && candidateSXs[i] <= targetWidth * 7 / 8
                && candidateSYs[i] >= targetHeight/8 && candidateSYs[i] <= targetHeight * 7 / 8) {

                // distancce from selection one
                const d = (candidateSXs[i] - candidateSXs[selected1]) * (candidateSXs[i] - candidateSXs[selected1])
                        + (candidateSYs[i] - candidateSYs[selected1]) * (candidateSYs[i] - candidateSYs[selected1]);

                if (candidateTypes[i] === 1 && d > dmax1) {
                  dmax1 = d;
                  index1 = i;
                }
                else if (candidateTypes[i] === 2 && d > dmax2) {
                  dmax2 = d;
                  index2 = i;
                }
              }
            }
          }
          if (index1 !== -1) return index1;
          if (index2 !== -1) return index2;
          return -1;
        }
        else if (selected3 === -1) {
          let dmax1 = 0.0;
          let index1 = -1;
          let dmax2 = 0.0;
          let index2 = -1;

          for (let i = 0; i < candidateLength; i++) {
            if (candidateTypes[i] !== 0) {
              let used = false;
              for (let j = 0; j < selectionLength; j++) {
                if (selection[j][0] === i) used = true;
              }
              if (!used
                && candidateSXs[i] >= targetWidth/8 && candidateSXs[i] <= targetWidth * 7 / 8
                && candidateSYs[i] >= targetHeight/8 && candidateSYs[i] <= targetHeight * 7 / 8) {

                // farest from the first two?
                let d = (candidateSXs[i] - candidateSXs[selected1]) * (candidateSYs[selected2] - candidateSYs[selected1])
                      - (candidateSYs[i] - candidateSYs[selected1]) * (candidateSXs[selected2] - candidateSXs[selected1]);
                d = d * d;

                if (candidateTypes[i] === 1 && d > dmax1) {
                  dmax1 = d;
                  index1 = i;
                }
                else if (candidateTypes[i] === 2 && d > dmax2) {
                  dmax2 = d;
                  index2 = i;
                }
              }
            }
          }
          if (index1 !== -1) return index1;
          if (index2 !== -1) return index2;
          return -1;
        }

        return -1;
      }, {
        constants: {
          simThreshold: AR2_SIM_THRESH,
          selectionLength: AR2_DEFAULT_SEARCH_FEATURE_NUM,
          candidateLength: candidateSXs.output[0],
          targetWidth: this.width,
          targetHeight: this.height
        },
        pipeline: true,
        output: [1]
      });
      this.kernels.push(kernel);
    }
    const kernel = this.kernels[this.kernelIndex++];
    const newSelected = kernel(selection, candidateTypes, candidateSXs, candidateSYs);
    return newSelected;
  }

  //  first dimension [level, sx, sy, mx, my]
  _computeCandidates() {
    if (this.kernelIndex === this.kernels.length) {
      const kernel = this.gpu.createKernelMap({
        saveSX: function(a) {return a},
        saveSY: function(a) {return a},
      }, function(featurePoints, modelViewProjectionTransforms, modelViewTransforms) {
        const {targetWidth, targetHeight} = this.constants;
        const mx = featurePoints[this.thread.x][0];
        const my = featurePoints[this.thread.x][1];
        const level = featurePoints[this.thread.x][2];
        const maxdpi = featurePoints[this.thread.x][3];
        const mindpi = featurePoints[this.thread.x][4];

        // compute screen coordinate
        const u = computeScreenCoordiate(modelViewProjectionTransforms, 0, mx, my, 0);
        const valid = u[0];
        if (valid === 0) return -1;

        const sx = u[1];
        const sy = u[2];

        if (sx < 0 || sx >= targetWidth) return -1;
        if (sy < 0 || sy >= targetHeight) return -1;

        const vdir = [0, 0, 0];
        vdir[0] = modelViewTransforms[0][0][0] * mx
                + modelViewTransforms[0][0][1] * my
                + modelViewTransforms[0][0][3];
        vdir[1] = modelViewTransforms[0][1][0] * mx
                + modelViewTransforms[0][1][1] * my
                + modelViewTransforms[0][1][3];
        vdir[2] = modelViewTransforms[0][2][0] * mx
                + modelViewTransforms[0][2][1] * my
                + modelViewTransforms[0][2][3];
        const vlen = Math.sqrt(vdir[0]*vdir[0] + vdir[1]*vdir[1] + vdir[2]*vdir[2]);
        vdir[0] /= vlen;
        vdir[1] /= vlen;
        vdir[2] /= vlen;
        const vdirValue = vdir[0]*modelViewTransforms[0][0][2] + vdir[1]*modelViewTransforms[0][1][2] + vdir[2]*modelViewTransforms[0][2][2];

        if (vdirValue > -0.1) return -1;

        // get resolution
        const u1 = computeScreenCoordiate(modelViewProjectionTransforms, 0, mx+10, my, 0);
        const u2 = computeScreenCoordiate(modelViewProjectionTransforms, 0, mx, my+10, 0);
        const d1 = (u1[1] - u[1]) * (u1[1] - u[1]) + (u1[2] - u[2]) * (u1[2] - u[2]);
        const d2 = (u2[1] - u[1]) * (u2[1] - u[1]) + (u2[2] - u[2]) * (u2[2] - u[2]);
        // 10 pixel in marker -> d mm in screen (screen scale in mm)
        const dpi = [0, 0];
        if (d1 < d2) {
          dpi[0] = Math.sqrt(d2) / 10;
          dpi[1] = Math.sqrt(d1) / 10;
        } else {
          dpi[0] = Math.sqrt(d1) / 10;
          dpi[1] = Math.sqrt(d2) / 10;
        }

        saveSX(u[1]);
        saveSY(u[2]);

        if (dpi[1] <= maxdpi && dpi[1] >= mindpi) {
          return 1;
        } else if (dpi[1] <= maxdpi * 2 && dpi[1] >= mindpi / 2) {
          return 2;
        }
        return 0;
      }, {
        constants: {targetWidth: this.width, targetHeight: this.height},
        output: [this.featurePoints.output[1]],
        pipeline: true
      });
      this.kernels.push(kernel);
    }
    const kernel = this.kernels[this.kernelIndex++];
    return kernel(this.featurePoints, this.prevModelViewProjectionTransforms, this.prevModelViewTransforms);
  }
}

module.exports = {
  Tracker,
}
