const {build: buildGaussianPyramid} = require('./gaussian-pyramid');
const {build: buildDoGPyramid} = require('./dog-pyramid');
const {build: hierarchicalClusteringBuild} = require('./hierarchical-clustering.js');
const {detect} = require('./detector');
const {extract} = require('./freak-extractor');

const PYRAMID_NUM_SCALES_PER_OCTAVES = 3;
const PYRAMID_MIN_COARSE_SIZE = 8;
const FEATURE_DENSITY = 100;

const createMatcher = (imageList) => {
  const keyframes = _buildKeyframes({imageList});
  console.log("keyframes", keyframes);

  const matcher = {
    keyframes: keyframes,

    match: (targetImage) => {
      const querypoints = _extractPoints({image: targetImage});
      console.log("querypoints", querypoints);
    }
  }
  return matcher;
}

const _extractPoints = ({image}) => {
  const maxFeatureNum = FEATURE_DENSITY * image.width * image.height / (480.0*360);
  const gaussianPyramid = buildGaussianPyramid({image, minCoarseSize: PYRAMID_MIN_COARSE_SIZE, numScalesPerOctaves: PYRAMID_NUM_SCALES_PER_OCTAVES});

  const dogPyramid = buildDoGPyramid({gaussianPyramid: gaussianPyramid});

  const featurePoints = detect({gaussianPyramid, dogPyramid});

  const descriptors = extract({pyramid: gaussianPyramid, points: featurePoints});

  const keypoints = [];
  for (let i = 0; i < featurePoints.length; i++) {
    keypoints.push({
      x2D: featurePoints[i].x,
      y2D: featurePoints[i].y,
      x3D: (featurePoints[i].x + 0.5) / image.dpi * 25.4, // inch to millimeter
      y3D: ((image.height-0.5) - featurePoints[i].y) / image.dpi * 25.4, // inch to millimeter
      angle: featurePoints[i].angle,
      scale: featurePoints[i].sigma,
      maxima: featurePoints[i].score > 0,
      descriptors: descriptors[i]
    })
  }
  return keypoints;
}

const _buildKeyframes = ({imageList}) => {
  const keyframes = [];

  for (let i = 0; i < imageList.length; i++) {
    const image = imageList[i];
    const keypoints = _extractPoints({image});
    const pointsCluster = hierarchicalClusteringBuild({points: keypoints});
    keyframes.push({points: keypoints, pointsCluster, width: image.width, height: image.height});
  }
  return keyframes;
}

module.exports = {
  createMatcher
}
