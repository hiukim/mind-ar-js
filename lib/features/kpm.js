const fs = require('fs');
const {build: buildGaussianPyramid} = require('./gaussian_pyramid');
const {build: buildDoGPyramid} = require('./dog_pyramid');
const {extractFeatures} = require('./detector');
const {debugImageData} = require('../utils/debug.js');

const PYRAMID_NUM_SCALES_PER_OCTAVES = 3;
const PYRAMID_MIN_COARSE_SIZE = 8;

const KPM_SURF_FEATURE_DENSITY_L1 = 100;
const FREAK_SUB_DIMENSION = 96;

const extract = (options) => {
  const {imageData, width, height, dpi, pageNo, imageNo, debugContent} = options;
  const featureDensity = KPM_SURF_FEATURE_DENSITY_L1;

  const maxFeatureNum = featureDensity * width * height / (480.0*360);
  console.log('extract kpm: ', pageNo, imageNo, width, height, dpi, maxFeatureNum);

  const gaussianPyramid = buildGaussianPyramid({imageData, width, height, minCoarseSize: PYRAMID_MIN_COARSE_SIZE, numScalesPerOctaves: PYRAMID_NUM_SCALES_PER_OCTAVES});

  if (debugContent) {
    console.log("[DEBUG] verifying gaussian pyramid....", imageNo);
    console.log("gaussian pyramiage images length: ", gaussianPyramid.images.length);

    let allGood = true;

    if (debugContent.pyramids[imageNo].length !== gaussianPyramid.images.length) {
      console.log("incorrect number of gaussian pyramids.");
      allGood = false;
    }

    for (let i = 0; i < debugContent.pyramids[imageNo].length; i++) {
      const values = gaussianPyramid.images[i].imageData;
      const values2 = debugContent.pyramids[imageNo][i].values;
      if (values.length !== values2.length) {
        console.log("incorrect gaussian pyramid length: ", i, 'lens: ', values.length, values2.length);
        allGood = false;
      }
      for (let j = 0; j < values.length; j++) {
        if (values[j] !== values2[j]) {
          console.log("incorrect gaussian pyramid pixel", i, (j%gaussianPyramid.images[i].width), Math.floor(j/gaussianPyramid.images[i].width), values[j], values2[j]);
        }
      }
    }
    if (allGood) console.log("[DEBUG] gaussian pyramid good");
  }

  const dogPyramid = buildDoGPyramid({gaussianPyramid: gaussianPyramid});

  if (debugContent) {
    console.log("[DEBUG] verifying dog pyramid....", imageNo);
    console.log("dog pyramiage images length: ", dogPyramid.images.length);

    let allGood = true;
    if (debugContent.dogPyramidImages[imageNo].length !== dogPyramid.images.length) {
      console.log("incorrect number of gaussian pyramids.");
      allGood = false;
    }

    for (let i = 0; i < debugContent.dogPyramidImages[imageNo].length; i++) {
      const values = dogPyramid.images[i].imageData;
      const values2 = debugContent.dogPyramidImages[imageNo][i].values;

      if (values.length !== values2.length) {
        console.log("incorrect dog pyramid length: ", i, 'lens: ', values.length, values2.length);
        allGood = false;
      }

      for (let j = 0; j < values.length; j++) {
        if (values[j] !== values2[j]) {
          console.log("incorrect pixel", i, (j%dogPyramid.images[i].width), Math.floor(j/dogPyramid.images[i].width), values[j], values2[j]);
          allGood = false;
        }
      }
    }
    if (allGood) console.log("[DEBUG] dog pyramid good");
  }

  const featurePoints = extractFeatures({gaussianPyramid, dogPyramid});

  if (debugContent) {
    console.log("[DEBUG] verifying feature points....", imageNo);
    console.log("feature points length: ", featurePoints.length);
    let allGood = true;

    if (featurePoints.length !== debugContent.featurePoints[imageNo].length) {
      console.log("incorrect feature ponits length: ", imageNo, debugContent.featurePoints[imageNo].length, featurePoints.length);
      allGood = false;
    }

    for (let i = 0; i < Math.min(featurePoints.length, debugContent.featurePoints[imageNo].length); i++) {
      let p1 = featurePoints[i];
      let p2 = debugContent.featurePoints[imageNo][i];
      //console.log("compare: ", p1.octave, p1.scale, p1.x, p1.y, p1.score, "|", p2.octave, p2.scale, p2.x, p2.y, p2.score);

      if (p1.x != p2.x || p1.y != p2.y || Math.abs(p1.sigma - p2.sigma) > 0.00001 || p1.octave != p2.octave || p1.scale != p2.scale || p1.score != p2.score) {
        console.log("incorrect feature point: ", p1, p2);
        allGood = false;
      }
    }
    if (allGood) console.log("[DEBUG] dog pyramid good");
  }
}

module.exports = {
  extract
};
