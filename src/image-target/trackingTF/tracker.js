const tf = require('@tensorflow/tfjs');
const {buildModelViewProjectionTransform, computeScreenCoordiate} = require('../icp/utils.js');

//const AR2_DEFAULT_TS = 6;
const AR2_DEFAULT_TS = 4;
const AR2_SEARCH_SIZE = 6;
const AR2_SEARCH_GAP = 1;
//const AR2_SEARCH_SIZE = 2;
//const AR2_SEARCH_GAP = 3;
//const AR2_SIM_THRESH = 0.9;
const AR2_SIM_THRESH = 0.8;

class Tracker {
  constructor(trackingDataList, imageListList, projectionTransform, inputWidth, inputHeight) {
    this.trackingDataList = trackingDataList;
    this.imageListList = imageListList;
    this.projectionTransform = projectionTransform;
    this.width = inputWidth;
    this.height = inputHeight;

    // prebuild feature and image pixel tensors
    this.featurePointsListT = [];
    this.imagePixelsListT = [];
    for (let i = 0; i < trackingDataList.length; i++) {
      const {featureList, imagePixels} = this._prebuild(trackingDataList[i], imageListList[i]);
      this.featurePointsListT[i] = featureList;
      this.imagePixelsListT[i] = imagePixels;
    }

    this.tensorCaches = {};
  }

  track(input, lastModelViewTransform, targetIndex) {
    const modelViewProjectionTransform = buildModelViewProjectionTransform(this.projectionTransform, lastModelViewTransform);

    // get best keyframeIndex
    //  find projected location on screen for position (0, 0), (10, 0) and (0, 10) and see the projected distance.
    //  expected marker ratio would be  distance / 10
    let keyframeIndex = 0;
    const u = computeScreenCoordiate(modelViewProjectionTransform, 10, 10, 0);
    const u1 = computeScreenCoordiate(modelViewProjectionTransform, 10+10, 10, 0);
    const u2 = computeScreenCoordiate(modelViewProjectionTransform, 10, 10+10, 0);
    if (u && u1 && u2) {
      const d1 = (u1.x - u.x) * (u1.x - u.x) + (u1.y - u.y) * (u1.y - u.y);
      const d2 = (u2.x - u.x) * (u2.x - u.x) + (u2.y - u.y) * (u2.y - u.y);
      const minD = Math.sqrt(Math.min(d1, d2));
      const targetScale = minD / 10.0; // screen to marker ratio
      const imageList = this.imageListList[targetIndex];
      for (let i = 1; i < imageList.length; i++) {
        const rd1 = Math.abs(targetScale - imageList[keyframeIndex].scale);
        const rd2 = Math.abs(targetScale - imageList[i].scale);
        if (rd2 < rd1) keyframeIndex = i;
      }
    }
    const featurePointsT = this.featurePointsListT[targetIndex][keyframeIndex];
    const imagePixelsT = this.imagePixelsListT[targetIndex];

    const inputImageT = this._loadInput(input);

    const searchPointsT = this._computeSearchPoints(featurePointsT, modelViewProjectionTransform);

    const {templates: templatesT, templatesValid: templatesValidT} = this._buildTemplates(imagePixelsT, featurePointsT, searchPointsT, modelViewProjectionTransform);

    const similarities = this._computeSimilarity(featurePointsT, inputImageT, searchPointsT, templatesT, templatesValidT);
    const similaritiesArr = similarities.arraySync();

    inputImageT.dispose();
    searchPointsT.x.dispose();
    searchPointsT.y.dispose();
    templatesT.dispose();
    templatesValidT.dispose();
    similarities.dispose();

    const featureSet = this.trackingDataList[targetIndex][keyframeIndex];
    const selectedFeatures = [];
    for (let i = 0; i < featureSet.coords.length; i++) {
      if (similaritiesArr[i][2] > AR2_SIM_THRESH) {
        selectedFeatures.push({
          pos2D: {x: similaritiesArr[i][0], y: similaritiesArr[i][1]},
          pos3D: {x: featureSet.coords[i].mx, y: featureSet.coords[i].my, z: 0},
          sim: similaritiesArr[i][2]
        });
      }
    }
    //console.log("seleccted features length", keyframeIndex, selectedFeatures.length, '/', featureSet.coords.length);
    //console.log('n tensors: ', tf.memory().numTensors);
    return selectedFeatures;
  }

  _computeSimilarity(featurePoints, targetImage, searchPoints, templates, templatesValid) {
    const templateOneSize = AR2_DEFAULT_TS;
    const templateSize = templateOneSize * 2 + 1;
    const searchOneSize = AR2_SEARCH_SIZE;
    const searchSize = searchOneSize * 2 + 1;
    const targetWidth = this.width;
    const targetHeight = this.height;

    return tf.tidy(() => {
      if (!this.tensorCaches.computeSimilarity) {
        const searchOffsetY = tf.range(-searchOneSize, searchOneSize+1, 1).expandDims(1).tile([1, searchSize]).reshape([searchSize*searchSize]).mul(AR2_SEARCH_GAP);
        const searchOffsetX = tf.range(-searchOneSize, searchOneSize+1, 1).expandDims(0).tile([searchSize, 1]).reshape([searchSize*searchSize]).mul(AR2_SEARCH_GAP);

        const templateOffsetY = tf.range(-templateOneSize, templateOneSize+1, 1).expandDims(1).tile([1, templateSize]).reshape([templateSize*templateSize]);
        const templateOffsetX = tf.range(-templateOneSize, templateOneSize+1, 1).expandDims(0).tile([templateSize, 1]).reshape([templateSize*templateSize]);

        this.tensorCaches.computeSimilarity = {
          searchOffsetY: tf.keep(searchOffsetY),
          searchOffsetX: tf.keep(searchOffsetX),
          templateOffsetY: tf.keep(templateOffsetY),
          templateOffsetX: tf.keep(templateOffsetX),
        }
      }
      const {searchOffsetX, searchOffsetY, templateOffsetX, templateOffsetY} = this.tensorCaches.computeSimilarity;

      let xWithSearch = searchPoints.x.expandDims(1).tile([1, searchSize*searchSize]);
      xWithSearch = xWithSearch.add(searchOffsetX);

      let yWithSearch = searchPoints.y.expandDims(1).tile([1, searchSize*searchSize]);
      yWithSearch = yWithSearch.add(searchOffsetY);

      const valid = xWithSearch.greaterEqual(templateOneSize)
                    .logicalAnd(xWithSearch.less(targetWidth - templateOneSize))
                    .logicalAnd(yWithSearch.greaterEqual(templateOneSize))
                    .logicalAnd(yWithSearch.less(targetHeight - templateOneSize))

      // [ |search center points|, |search Size x search Size|, |templateSize x templateSize ]
      let xWithSearchAndTemplate = xWithSearch.expandDims(2).tile([1, 1, templateSize*templateSize]);
      xWithSearchAndTemplate = xWithSearchAndTemplate.add(templateOffsetX);

      let yWithSearchAndTemplate = yWithSearch.expandDims(2).tile([1, 1, templateSize*templateSize]);
      yWithSearchAndTemplate = yWithSearchAndTemplate.add(templateOffsetY);

      // faster than gatherND by stacking y and x
      const pixelIndex = yWithSearchAndTemplate.mul(targetWidth).add(xWithSearchAndTemplate).cast('int32');
      const targetImageLinear = targetImage.reshape([targetImage.shape[0] * targetImage.shape[1]]);
      const pixel = tf.gather(targetImageLinear, pixelIndex);

      // zero-normalized cross-correlation
      const pixelMean = pixel.mean(2);
      const pixelSubMean = pixel.sub(pixelMean.expandDims(2));
      const templatesMean = templates.mean(1);
      const templatesSubMean = templates.sub(templatesMean.expandDims(1));
      const sumPointTemplateSubMean = tf.sum(pixelSubMean.mul(templatesSubMean.expandDims(1)), 2);
      const sumPixelSubMeanSquare = tf.sum(pixelSubMean.mul(pixelSubMean), 2);
      const sumTemplatesSubMeanSquare = tf.sum(templatesSubMean.mul(templatesSubMean), 1);

      // delay dividing sumTemplatesSubMeanSquare.sqrt() for performance
      let allSim = sumPointTemplateSubMean
                    .div(sumPixelSubMeanSquare.sqrt())
                    //.div(sumTemplatesSubMeanSquare.sqrt().expandDims(1));
      allSim = tf.where(valid, allSim, -1);

      const maxIndex = allSim.argMax(1);
      let sim = allSim.max(1);
      sim = sim.div(sumTemplatesSubMeanSquare.sqrt());

      const searchY = maxIndex.floorDiv(searchSize).sub(searchOneSize);
      const searchX = maxIndex.mod(searchSize).sub(searchOneSize);
      const x = searchPoints.x.add(searchX);
      const y = searchPoints.y.add(searchY);

      const result = tf.stack([x,y,sim], 1);
      return result;
    });
  }

  _buildTemplates(imagePixelsT, featurePointsT, searchPointsT, modelViewProjectionTransform) {
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

      const templatesValid = ix.greaterEqual(0) // change back to 0
                  .logicalAnd(ix.less(imageWidthExpand))
                  .logicalAnd(iy.greaterEqual(0))
                  .logicalAnd(iy.less(imageHeightExpand));

      const pixelIndex = pixelOffsetExpand.add(iy.mul(imageWidthExpand).add(ix)).cast('int32');
      const templates = tf.where(templatesValid, tf.gather(imagePixelsT, pixelIndex), 0);

      return {templates, templatesValid};
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

  _prebuild(featureSets, imageList) {
    return tf.tidy(() => {
      let totalPixel = 0;
      const pixelOffsets = [];
      for (let i = 0; i < imageList.length; i++) {
        pixelOffsets.push(totalPixel);
        totalPixel += imageList[i].width * imageList[i].height;
      }

      let allPixels = [];
      let c = 0;
      for (let i = 0; i < imageList.length; i++) {
        for (let j = 0; j < imageList[i].data.length; j++) {
          allPixels[c++] = imageList[i].data[j];
        }
      }
      const imagePixels = tf.tensor(allPixels, [allPixels.length]);

      const featureList = [];
      let maxCount = 0;
      for (let j = 0; j < featureSets.length; j++) {
        maxCount = Math.max(maxCount, featureSets[j].coords.length);
      }
      for (let j = 0; j < featureSets.length; j++) {
        let mx = [];
        let my = [];
        let pixelOffset = [];
        let imageWidth = [];
        let imageHeight = [];
        let imageScale = [];

        for (let k = 0; k < maxCount; k++) {
          if (k < featureSets[j].coords.length) {
            mx.push(featureSets[j].coords[k].mx);
            my.push(featureSets[j].coords[k].my);
          } else {
            mx.push(-1);
            my.push(-1);
          }
          imageWidth.push(imageList[j].width);
          imageHeight.push(imageList[j].height);
          imageScale.push(imageList[j].scale);
          pixelOffset.push(pixelOffsets[j]);
        }

        featureList.push({
          x: tf.tensor(mx, [mx.length]),
          y: tf.tensor(my, [my.length]),
          pixelOffset: tf.tensor(pixelOffset, [pixelOffset.length]),
          imageWidth: tf.tensor(imageWidth, [imageWidth.length]),
          imageHeight: tf.tensor(imageHeight, [imageHeight.length]),
          imageScale: tf.tensor(imageScale, [imageScale.length])
        })
      }
      return {featureList, imagePixels};
    });
  }

  _loadInput(input) {
    return tf.tidy(() => {
      let inputImage = tf.browser.fromPixels(input);
      inputImage = inputImage.mean(2); //.expandDims(2).expandDims(0);
      return inputImage;
    });
  }
}

module.exports = {
  Tracker
};
