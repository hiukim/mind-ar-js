const tf = require('@tensorflow/tfjs');
const {buildModelViewProjectionTransform} = require('../icp/utils.js');

const AR2_DEFAULT_TS = 6;
//const AR2_DEFAULT_TS = 12;
const AR2_SEARCH_SIZE = 6;
const AR2_SIM_THRESH = 0.9;

class Tracker {
  constructor(trackingDataList, imageListList, projectionTransform, inputWidth, inputHeight) {
    this.projectionTransform = projectionTransform;
    this.width = inputWidth;
    this.height = inputHeight;

    this.allFeaturePointsList = [];

    this.featurePointsListT = [];
    this.imagePixelsListT = [];
    this.imagePropertiesListT = [];

    let maxFeaturePointsCount = 0;

    for (let i = 0; i < trackingDataList.length; i++) {
      const featureSets = trackingDataList[i];
      const imageList = imageListList[i];

      const points = [];
      for (let j = 0; j < featureSets.length; j++) {
        for (let k = 0; k < featureSets[j].coords.length; k++) {
          const {mx, my} = featureSets[j].coords[k];
          points.push([mx, my, j]);
        }
      }
      this.allFeaturePointsList[i] = points;
      maxFeaturePointsCount = Math.max(maxFeaturePointsCount, points.length);

      const {imagePixels, imageProperties} = this._combineImageList(imageList);
      this.imagePixelsListT[i] = imagePixels;
      this.imagePropertiesListT[i] = imageProperties; // [ [width, height, scale] ]
    }

    for (let i = 0; i < trackingDataList.length; i++) {
      this.featurePointsListT[i] = this._buildFeaturePoints(this.allFeaturePointsList[i], imageListList[i], maxFeaturePointsCount);
    }

    this.tensorCaches = {};
  }

  track(input, lastModelViewTransform, targetIndex) {
    let inputImageT = this._loadInput(input);
    //inputImageT = tf.tensor(globalDebug.targetImage.toArray(), inputImageT.shape); // remove this line
    //const inputImageArr = inputImageT.reshape([inputImageT.shape[1] * inputImageT.shape[2]]).arraySync();
    //const debugTargetImage = globalDebug.targetImage.toArray();
    //console.log("debug targetImage 1", inputImageArr);
    //console.log("debug targetImage 2", debugTargetImage);
    //globalDebug.compareImage('templates', inputImageArr, debugTargetImage);

    const modelViewProjectionTransform = buildModelViewProjectionTransform(this.projectionTransform, lastModelViewTransform);

    const featurePointsT = this.featurePointsListT[targetIndex];
    const imagePixelsT = this.imagePixelsListT[targetIndex];
    const imagePropertiesT = this.imagePropertiesListT[targetIndex];

    const searchPointsT = this._computeSearchPoints(featurePointsT, modelViewProjectionTransform);

    /*
    const searchPointsXArr = searchPointsT.x.arraySync();
    const searchPointsYArr = searchPointsT.y.arraySync();
    const debugSearchPoints = globalDebug.searchPoints.toArray();
    let correct = 0;
    for (let i = 0; i < debugSearchPoints.length; i++) {
      if (debugSearchPoints[i][0] !== searchPointsXArr[i] || debugSearchPoints[i][1] !== searchPointsYArr[i]) {
        console.log("incorrect", i, debugSearchPoints[i], searchPointsXArr[i], searchPointsYArr[i]);
      } else {
        correct += 1;
      }
    }
    */
    //console.log("debug search correct:", correct);
    //console.log("debug searchPoints", debugSearchPoints);

    let {pixel: templatesT, valid: templatesValidT} = this._buildTemplates(imagePixelsT, imagePropertiesT, featurePointsT, searchPointsT, modelViewProjectionTransform);


    //templatesT = tf.tensor(globalDebug.templates.toArray(), [templatesT.shape[0], Math.sqrt(templatesT.shape[1]), Math.sqrt(templatesT.shape[1])]).reshape([templatesT.shape[0], templatesT.shape[1]]);
    //templatesT = tf.where(templatesT.notEqual(-1), templatesT, 0);

    //const templatesArr = templatesT.reshape([templatesT.shape[0], Math.sqrt(templatesT.shape[1]), Math.sqrt(templatesT.shape[1])]).arraySync();
    //const debugTemplates = globalDebug.templates.toArray();
    //globalDebug.compareImage('templates', templatesArr, debugTemplates);
    //console.log("debugTemplates", debugTemplates);

    const similarities = this._computeSimilarity(featurePointsT, inputImageT, searchPointsT, templatesT, templatesValidT);
    //globalDebug.compareImage('similarities', similarities.arraySync(), globalDebug.similarities.toArray(), 0.01);

    const best = this._pickBest(searchPointsT, similarities);
    //console.log("best", best.arraySync());
    //console.log("debug best", globalDebug.best.toArray());
    //globalDebug.compareImage('best', best.arraySync(), globalDebug.best.toArray(), 0.001);

    const allFeaturePoints = this.allFeaturePointsList[targetIndex];

    const bestArr = best.arraySync();

    inputImageT.dispose();
    searchPointsT.x.dispose();
    searchPointsT.y.dispose();
    templatesT.dispose();
    templatesValidT.dispose();
    similarities.dispose();
    best.dispose();
    console.log(tf.memory().numTensors);

    const selectedFeatures = [];
    for (let i = 0; i < bestArr.length; i++) {
      if (bestArr[i][2] > AR2_SIM_THRESH) {
        selectedFeatures.push({
          pos2D: {x: bestArr[i][0], y: bestArr[i][1]},
          pos3D: {x: allFeaturePoints[i][0], y: allFeaturePoints[i][1], z: 0},
          sim: bestArr[i][2]
        });
      }
    }

    /*
    console.log("compare selectedFeatures", selectedFeatures.length, globalDebug.selectedFeatures.length);
    for (let i = 0; i < selectedFeatures.length; i++) {
      console.log("2d", selectedFeatures[i].pos2D, globalDebug.selectedFeatures[i].pos2D);
      console.log("3d", selectedFeatures[i].pos3D, globalDebug.selectedFeatures[i].pos3D);
      console.log("si", selectedFeatures[i].sim, globalDebug.selectedFeatures[i].sim);
    }
    */
    return selectedFeatures;
  }

  _pickBest(searchPoints, similarities) {
    const searchOneSize = AR2_SEARCH_SIZE;
    const searchSize = searchOneSize * 2 + 1;

    return tf.tidy(() => {
      const maxIndex = similarities.argMax(1);
      const searchY = maxIndex.floorDiv(searchSize).sub(searchOneSize);
      const searchX = maxIndex.mod(searchSize).sub(searchOneSize);
      const x = searchPoints.x.add(searchX);
      const y = searchPoints.y.add(searchY);
      const sim = similarities.max(1);
      const result = tf.stack([x,y,sim], 1);
      return result;
    })
  }

  _computeSimilarity(featurePoints, targetImage, searchPoints, templates, templatesValid) {
    const templateOneSize = AR2_DEFAULT_TS;
    const templateSize = templateOneSize * 2 + 1;
    const searchOneSize = AR2_SEARCH_SIZE;
    const searchSize = searchOneSize * 2 + 1;
    const targetWidth = this.width;
    const targetHeight = this.height;

    return tf.tidy(() => {
      const sumTemplate = templates.sum([1]);
      const sumTemplateSquare = templates.mul(templates).sum([1]);

      const templateValidCount = templatesValid.sum([1]);

      const searchOffsetY = tf.range(-searchOneSize, searchOneSize+1, 1).expandDims(1).tile([1, searchSize]).reshape([searchSize*searchSize]);
      const searchOffsetX = tf.range(-searchOneSize, searchOneSize+1, 1).expandDims(0).tile([searchSize, 1]).reshape([searchSize*searchSize]);

      const templateOffsetY = tf.range(-templateOneSize, templateOneSize+1, 1).expandDims(1).tile([1, templateSize]).reshape([templateSize*templateSize]);
      const templateOffsetX = tf.range(-templateOneSize, templateOneSize+1, 1).expandDims(0).tile([templateSize, 1]).reshape([templateSize*templateSize]);

      let xWithSearch = searchPoints.x.expandDims(1).tile([1, searchSize*searchSize]);
      xWithSearch = xWithSearch.add(searchOffsetX);

      let yWithSearch = searchPoints.y.expandDims(1).tile([1, searchSize*searchSize]);
      yWithSearch = yWithSearch.add(searchOffsetY);

      let xWithSearchAndTemplate = xWithSearch.expandDims(2).tile([1, 1, templateSize*templateSize]);
      xWithSearchAndTemplate = xWithSearchAndTemplate.add(templateOffsetX);

      let yWithSearchAndTemplate = yWithSearch.expandDims(2).tile([1, 1, templateSize*templateSize]);
      yWithSearchAndTemplate = yWithSearchAndTemplate.add(templateOffsetY);

      const valid = templatesValid.expandDims(1)
                  .logicalAnd(xWithSearchAndTemplate.greaterEqual(0))
                  .logicalAnd(xWithSearchAndTemplate.less(targetWidth))
                  .logicalAnd(yWithSearchAndTemplate.greaterEqual(0))
                  .logicalAnd(yWithSearchAndTemplate.less(targetHeight));

      const pixelIndex = yWithSearchAndTemplate.mul(targetWidth).add(xWithSearchAndTemplate).cast('int32');
      const targetImageLinear = targetImage.reshape([targetImage.shape[1] * targetImage.shape[2]]);
      const pixel = tf.where(valid, tf.gather(targetImageLinear, pixelIndex), 0);

      const sumPoint = pixel.sum([2]);
      const sumPointSquare = pixel.mul(pixel).sum([2]);
      const sumPointTemplate = pixel.mul(templates.expandDims(1)).sum([2]);

      const pointVar = sumPointSquare.sub(sumPoint.mul(sumPoint).div(templateValidCount.expandDims(1))).sqrt();
      const templateVar = sumTemplateSquare.sub(sumTemplate.mul(sumTemplate).div(templateValidCount)).sqrt();

      const coVarValid = pointVar.greater(0)
                        .logicalAnd(templateVar.greater(0).expandDims(1))
                        .logicalAnd(templateValidCount.greater(0).expandDims(1));

      let coVar = sumPointTemplate.sub(sumPoint.mul(sumTemplate.expandDims(1)).div(templateValidCount.expandDims(1))).div(templateVar.expandDims(1)).div(pointVar);
      coVar = tf.where(coVarValid, coVar, -1);

      return coVar;
    });
  }

  _buildTemplates(imagePixelsT, imagePropertiesT, featurePointsT, searchPointsT, modelViewProjectionTransform) {
    const templateOneSize = AR2_DEFAULT_TS;
    const templateSize = templateOneSize * 2 + 1;

    return tf.tidy(() => {
      const sx = searchPointsT.x;
      const sy = searchPointsT.y;
      const sxExpand = sx.expandDims(1).tile([1, templateSize*templateSize]);
      const syExpand = sy.expandDims(1).tile([1, templateSize*templateSize]);
      const imageScaleExpand = featurePointsT.imageScale.expandDims(1).tile([1, templateSize*templateSize]);
      const imageHeightExpand = featurePointsT.imageHeight.expandDims(1).tile([1, templateSize*templateSize]);
      const imageWidthExpand = featurePointsT.imageWidth.expandDims(1).tile([1, templateSize*templateSize]);
      const pixelOffsetExpand = featurePointsT.pixelOffset.expandDims(1).tile([1, templateSize*templateSize]);

      const offsetY = tf.range(-templateOneSize, templateOneSize+1, 1).expandDims(1).tile([1, templateSize]).reshape([templateSize*templateSize]);;
      const offsetX = tf.range(-templateOneSize, templateOneSize+1, 1).expandDims(0).tile([templateSize, 1]).reshape([templateSize*templateSize]);;

      const sx2 = sxExpand.add(offsetX);
      const sy2 = syExpand.add(offsetY);

      // compute screenToMarker coordinate
      const c11 = sx2.mul(modelViewProjectionTransform[2][0]).sub(modelViewProjectionTransform[0][0]);
      const c12 = sx2.mul(modelViewProjectionTransform[2][1]).sub(modelViewProjectionTransform[0][1]);
      const c21 = sy2.mul(modelViewProjectionTransform[2][0]).sub(modelViewProjectionTransform[1][0]);
      const c22 = sy2.mul(modelViewProjectionTransform[2][1]).sub(modelViewProjectionTransform[1][1]);
      const b1 = sx2.mul(modelViewProjectionTransform[2][3]).sub(modelViewProjectionTransform[0][3]).neg();
      const b2 = sy2.mul(modelViewProjectionTransform[2][3]).sub(modelViewProjectionTransform[1][3]).neg();

      const m = c11.mul(c22).sub(c12.mul(c21));

      const mx2 = c22.mul(b1).sub(c12.mul(b2)).div(m);
      const my2 = c11.mul(b2).sub(c21.mul(b1)).div(m);

      const ix = mx2.mul(imageScaleExpand).add(0.5).floor();
      const iy = imageHeightExpand.sub(my2.mul(imageScaleExpand)).add(0.5).floor();

      const valid = ix.greaterEqual(0) // change back to 0
                  .logicalAnd(ix.less(imageWidthExpand))
                  .logicalAnd(iy.greaterEqual(0))
                  .logicalAnd(iy.less(imageHeightExpand));

      const pixelIndex = pixelOffsetExpand.add(iy.mul(imageWidthExpand).add(ix)).cast('int32');
      const pixel = tf.where(valid, tf.gather(imagePixelsT, pixelIndex), 0);

      return {valid, pixel};
    });
  }

  _computeSearchPoints(featurePoints, modelViewProjectionTransform) {
    return tf.tidy(() => {

      // compute screen coordinate
      const ux = featurePoints.x.mul(modelViewProjectionTransform[0][0])
                .add(featurePoints.y.mul(modelViewProjectionTransform[0][1]))
                .add(modelViewProjectionTransform[0][3]);

      const uy = featurePoints.x.mul(modelViewProjectionTransform[1][0])
                .add(featurePoints.y.mul(modelViewProjectionTransform[1][1]))
                .add(modelViewProjectionTransform[1][3]);

      const uz = featurePoints.x.mul(modelViewProjectionTransform[2][0])
                .add(featurePoints.y.mul(modelViewProjectionTransform[2][1]))
                .add(modelViewProjectionTransform[2][3]);

      const good = uz.abs().greater(0.000001);
      const x = tf.where(good, ux.div(uz).add(0.5).floor(), -1);
      const y = tf.where(good, uy.div(uz).add(0.5).floor(), -1);

      return {x, y};
    });
  }

  _buildFeaturePoints(featurePoints, imageList, maxFeaturePointsCount) {
    return tf.tidy(() => {

      let totalPixel = 0;
      const pixelOffsets = [];
      for (let i = 0; i < imageList.length; i++) {
        pixelOffsets.push(totalPixel);
        totalPixel += imageList[i].width * imageList[i].height;
      }

      const x = [];
      const y = [];
      const pixelOffset = [];
      const imageWidth = [];
      const imageHeight = [];
      const imageScale = [];

      for (let i = 0; i < featurePoints.length; i++) {
        x.push(featurePoints[i][0]);
        y.push(featurePoints[i][1]);
        const level = featurePoints[i][2];
        imageWidth.push(imageList[level].width);
        imageHeight.push(imageList[level].height);
        imageScale.push(imageList[level].scale);
        pixelOffset.push(pixelOffsets[level]);
      }
      return {
        x: tf.tensor(x, [x.length]),
        y: tf.tensor(y, [y.length]),
        pixelOffset: tf.tensor(pixelOffset, [pixelOffset.length]),
        imageWidth: tf.tensor(imageWidth, [imageWidth.length]),
        imageHeight: tf.tensor(imageHeight, [imageHeight.length]),
        imageScale: tf.tensor(imageScale, [imageScale.length])
      };
    });
  }

  _combineImageList(imageList) {
    let totalPixel = 0;
    let propertiesData = [];
    for (let i = 0; i < imageList.length; i++) {
      propertiesData.push([imageList[i].width, imageList[i].height, totalPixel, imageList[i].scale]);
      totalPixel += imageList[i].width * imageList[i].height;
    }

    let allPixels = [];
    let c = 0;
    for (let i = 0; i < imageList.length; i++) {
      for (let j = 0; j < imageList[i].data.length; j++) {
        allPixels[c++] = imageList[i].data[j];
      }
    }

    return tf.tidy(() => {
      const imagePixels = tf.tensor(allPixels, [allPixels.length]);
      const imageProperties = tf.tensor(propertiesData, [propertiesData.length, propertiesData[0].length]);

      return {
        imagePixels,
        imageProperties
      }
    });
  }

  _loadInput(input) {
    return tf.tidy(() => {
      let inputImage = tf.browser.fromPixels(input);
      inputImage = inputImage.mean(2).expandDims(2).expandDims(0);
      return inputImage;
    });
  }
}

module.exports = {
  Tracker
};
