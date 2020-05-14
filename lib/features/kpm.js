const fs = require('fs');
const {build: buildGaussianPyramid} = require('./gaussian_pyramid');
const {build: buildDoGPyramid} = require('./dog_pyramid');
const {extractFeatures} = require('./detector');
const {debugImageData} = require('../utils/debug.js');

const PYRAMID_NUM_SCALES_PER_OCTAVES = 3;
const PYRAMID_MIN_COARSE_SIZE = 8;

const KPM_SURF_FEATURE_DENSITY_L1 = 100;
const FREAK_SUB_DIMENSION = 96;

const EPSILON =  0.0001;

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

  const {featurePoints, subPixelFeaturePoints, prunedFeaturePoints, orientedFeaturePoints} = extractFeatures({gaussianPyramid, dogPyramid});

  if (debugContent) {
    console.log("[DEBUG] verifying feature points....", imageNo);
    console.log("feature points length: ", featurePoints.length, debugContent.featurePoints[imageNo].length);
    let allGood = true;

    if (featurePoints.length !== debugContent.featurePoints[imageNo].length) {
      console.log("incorrect feature ponits length: ", imageNo, debugContent.featurePoints[imageNo].length, featurePoints.length);
      allGood = false;
    }

    for (let i = 0; i < Math.min(featurePoints.length, debugContent.featurePoints[imageNo].length); i++) {
      let p1 = featurePoints[i];
      let p2 = debugContent.featurePoints[imageNo][i];
      //console.log("compare: ", p1.octave, p1.scale, p1.x, p1.y, p1.score, "|", p2.octave, p2.scale, p2.x, p2.y, p2.score);

      if (p1.x != p2.x || p1.y != p2.y || Math.abs(p1.sigma - p2.sigma) > EPSILON || p1.octave != p2.octave || p1.scale != p2.scale || p1.score != p2.score) {
        console.log("incorrect feature point: ", p1, p2);
        allGood = false;
      }
    }
    if (allGood) console.log("[DEBUG] feature points good");
  }

  if (debugContent) {
    let allGood = true;
    console.log("[DEBUG] verifying subpixel feature points....", imageNo);

    console.log("subpixel feature points length: ", subPixelFeaturePoints.length, debugContent.featurePoints2[imageNo].length);

    for (let i = 0; i < debugContent.featurePoints2[imageNo].length; i++) {
      let p1 = subPixelFeaturePoints[i];
      let p2 = debugContent.featurePoints2[imageNo][i];
      //console.log("compare: ", p1.octave, p1.scale, p1.x, p1.y, p1.score, "|", p2.octave, p2.scale, p2.x, p2.y, p2.score);

      if ( Math.abs(p1.x - p2.x) > EPSILON || Math.abs(p1.y - p2.y) > EPSILON || Math.abs(p1.sigma - p2.sigma) > EPSILON || p1.octave != p2.octave || p1.scale != p2.scale || Math.abs(p1.score - p2.score) > EPSILON || Math.abs(p1.spScale - p2.spScale) > EPSILON || Math.abs(p1.edgeScore - p2.edgeScore) > EPSILON) {
        console.log("incorrect feature point 2: ", i, JSON.stringify(p1), '<===>', JSON.stringify(p2));
        allGood = false;
      }
    }
    //console.log("subpixels: ", debugContent.subpixels[imageNo]);
    if (allGood) console.log("[DEBUG] feature points 2 good");
  }

  if (debugContent) {
    console.log("[DEBUG] verifying pruned feature points....", imageNo);
    let allGood = true;

    const list1 = JSON.parse(JSON.stringify(debugContent.featurePoints3[imageNo]));
    const list2 = JSON.parse(JSON.stringify(prunedFeaturePoints));
    list1.sort((p1, p2) => {return p1.score-p2.score;});
    list2.sort((p1, p2) => {return p1.score-p2.score;});

    console.log("pruned feature points length: ", list1.length, list2.length);
    for (let i = 0; i < list1.length; i++) {
      let p1 = list1[i];
      let p2 = list2[i];

      if ( Math.abs(p1.x - p2.x) > EPSILON || Math.abs(p1.y - p2.y) > EPSILON || Math.abs(p1.sigma - p2.sigma) > EPSILON || p1.octave != p2.octave || p1.scale != p2.scale || Math.abs(p1.score - p2.score) > EPSILON || Math.abs(p1.spScale - p2.spScale) > EPSILON || Math.abs(p1.edgeScore - p2.edgeScore) > EPSILON) {
        console.log("incorrect feature point 3: ", i, JSON.stringify(p1), '<===>', JSON.stringify(p2));
        allGood = false;
      }
    }
    //console.log("subpixels: ", debugContent.subpixels[imageNo]);
    if (allGood) console.log("[DEBUG] pruned feature points good");
  }

  if (debugContent) {
    console.log("[DEBUG] verifying oriented feature points....", imageNo);
    let allGood = true;

    const list1 = JSON.parse(JSON.stringify(debugContent.featurePoints4[imageNo]));
    const list2 = JSON.parse(JSON.stringify(orientedFeaturePoints));
    const comp = (p1, p2) => {
      if (p1.octave < p2.octave) return -1;
      if (p2.octave < p1.octave) return 1;
      if (p1.scale < p2.scale) return -1;
      if (p2.scale < p1.scale) return 1;
      if (p1.x < p2.x) return -1;
      if (p2.x < p1.x) return 1;
      if (p1.y < p2.y) return -1;
      if (p2.y < p1.y) return 1;
      if (p1.angle < p2.angle) return -1;
      if (p2.angle < p1.angle) return 1;
      return 0;
    }
    list1.sort(comp);
    list2.sort(comp);
    console.log("oriented feature points length: ", list1.length, list2.length);
    for (let i = 0; i < list2.length; i++) {
      let p1 = list1[i];
      let p2 = list2[i];
      //console.log('compare:', JSON.stringify(p1), JSON.stringify(p2));

      if ( Math.abs(p1.angle - p2.angle) > EPSILON || Math.abs(p1.x - p2.x) > EPSILON || Math.abs(p1.y - p2.y) > EPSILON || Math.abs(p1.sigma - p2.sigma) > EPSILON || p1.octave != p2.octave || p1.scale != p2.scale || Math.abs(p1.score - p2.score) > EPSILON || Math.abs(p1.spScale - p2.spScale) > EPSILON || Math.abs(p1.edgeScore - p2.edgeScore) > EPSILON) {
        console.log("incorrect feature point 4: ", i, JSON.stringify(p1), '<===>', JSON.stringify(p2));
        allGood = false;
      }
    }

    if (allGood) console.log("[DEBUG] oriented feature points good");
  }
}

module.exports = {
  extract
};
