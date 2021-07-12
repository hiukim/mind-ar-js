const tf = require('@tensorflow/tfjs');
const {Detector} = require('./detector10.js');
const {buildModelViewProjectionTransform, computeScreenCoordiate} = require('../estimation/utils.js');

const PRECISION_ADJUST = 1000;

class SmartDetector {
  constructor(imageListList, projectionTransform, debugMode=false) {
    this.debugMode = debugMode;
    this.projectionTransform = projectionTransform;
    this.imageListList = imageListList;
    this.detectors = {};

    for (let i = 0; i < imageListList.length; i++) {
      const {width, height, detectorKey} = this._targetProperties(i);
      this.detectors[detectorKey] = new Detector(width, height, debugMode);
    }

    this.kernelCaches = {};
  }

  detect(inputImageT, modelViewTransform, targetIndex) { // expected model view transform
    let debugExtra = null;

    const {detectorKey} = this._targetProperties(targetIndex);

    const modelViewProjectionTransform = buildModelViewProjectionTransform(this.projectionTransform, modelViewTransform);
    const modelViewProjectionTransformT = this._buildAdjustedModelViewTransform(modelViewProjectionTransform);
    console.log("modelViewProjectionTransformT", modelViewProjectionTransformT.arraySync());

    const projectedImageT = this._computeProjection(modelViewProjectionTransformT, inputImageT, targetIndex);
    console.log("projectedImage", projectedImageT.arraySync());
    const detector = this.detectors[detectorKey];

    const {featurePoints} = detector.detect(projectedImageT);
    console.log("smart feature", featurePoints);

    const reprojectedFeaturePoints = featurePoints.map((p) => {
      const {x, y} = computeScreenCoordiate(modelViewProjectionTransform, p.x, p.y);
      return {x, y, angle: p.angle, scale: p.scale, maxima: p.maxima, descriptors: p.descriptors} ;
    });
    console.log("reprojectedFeaturePoints", reprojectedFeaturePoints);

    if (this.debugMode) {
      debugExtra = {
	projectedImage: projectedImageT.arraySync(),
	featurePoints,
	reprojectedFeaturePoints
      }
    }
    projectedImageT.dispose();

    return {featurePoints: reprojectedFeaturePoints, debugExtra};
    //return {featurePoints: featurePoints, debugExtra};
  }

  _targetProperties(targetIndex) {
    const imageList = this.imageListList[targetIndex];
    const width = imageList[0].width;
    const height = imageList[0].height;
    const detectorKey = width + "-" + height;
    return {width, height, detectorKey};
  }

  _buildAdjustedModelViewTransform(modelViewProjectionTransform) {
    return tf.tidy(() => {
      let modelViewProjectionTransformAdjusted = [];
      for (let i = 0; i < modelViewProjectionTransform.length; i++) {
	modelViewProjectionTransformAdjusted.push([]);
	for (let j = 0; j < modelViewProjectionTransform[i].length; j++) {
	  modelViewProjectionTransformAdjusted[i].push(modelViewProjectionTransform[i][j]/PRECISION_ADJUST);
	}
      }
      return tf.tensor(modelViewProjectionTransformAdjusted, [3, 4]);
    });
  }

  _computeProjection(modelViewProjectionTransformT, inputImageT, targetIndex) {
    const {width, height, detectorKey} = this._targetProperties(targetIndex);

    if (!this.kernelCaches.computeProjection) {
      this.kernelCaches.computeProjection = {};
    }

    if (!this.kernelCaches.computeProjection[detectorKey]) {
      const kernel = {
	variableNames: ['M', 'pixel'],
	outputShape: [height, width],
	userCode: `
	  void main() {
	      ivec2 coords = getOutputCoords();

	      float m00 = getM(0, 0) * ${PRECISION_ADJUST}.;
	      float m01 = getM(0, 1) * ${PRECISION_ADJUST}.;
	      float m03 = getM(0, 3) * ${PRECISION_ADJUST}.;
	      float m10 = getM(1, 0) * ${PRECISION_ADJUST}.;
	      float m11 = getM(1, 1) * ${PRECISION_ADJUST}.;
	      float m13 = getM(1, 3) * ${PRECISION_ADJUST}.;
	      float m20 = getM(2, 0) * ${PRECISION_ADJUST}.;
	      float m21 = getM(2, 1) * ${PRECISION_ADJUST}.;
	      float m23 = getM(2, 3) * ${PRECISION_ADJUST}.;

	      float y = float(coords[0]);
	      float x = float(coords[1]);
	      float uz = (x * m20) + (y * m21) + m23;
	      float oneOverUz = 1. / uz;

	      float ux = (x * m00) + (y * m01) + m03;
	      float uy = (x * m10) + (y * m11) + m13;

	      ux = floor(ux * oneOverUz + 0.5);
	      uy = floor(uy * oneOverUz + 0.5);

	      setOutput(getPixel( int(uy), int(ux)));
	    }
	`
      };

      this.kernelCaches.computeProjection[detectorKey] = kernel;
    }

    return tf.tidy(() => {
      const program = this.kernelCaches.computeProjection[detectorKey];
      const result = this._compileAndRun(program, [modelViewProjectionTransformT, inputImageT]);
      return result;
    });
  }

  _compileAndRun(program, inputs) {
    const outInfo = tf.backend().compileAndRun(program, inputs);
    return tf.engine().makeTensorFromDataId(outInfo.dataId, outInfo.shape, outInfo.dtype);
  }
}

module.exports = {
  SmartDetector
};
