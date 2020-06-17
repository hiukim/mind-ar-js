const {build: buildGaussianPyramid} = require('./gaussian-pyramid');
const {build: buildDoGPyramid} = require('./dog-pyramid');
const {build: hierarchicalClusteringBuild} = require('./hierarchical-clustering.js');
const {detect} = require('./detector');
const {extract} = require('./freak-extractor');
const {match} = require('./matching');
const {estimateHomography} = require('../icp/estimate_homography.js');

const PYRAMID_NUM_SCALES_PER_OCTAVES = 3;
const PYRAMID_MIN_COARSE_SIZE = 8;
const FEATURE_DENSITY = 100;

class Matcher {
  constructor(matchingData) {
    this.keyframes = matchingData.keyframes;
  }

  match(targetImage) {
    const querypoints = _extractPoints({image: targetImage});
    console.log("querypoints", querypoints);
    console.log("keyframes", this.keyframes);
    const result = match({keyframes: this.keyframes, querypoints: querypoints, querywidth: targetImage.width, queryheight: targetImage.height});
    console.log("result", result);
    if (result === null) return null;
    //const match = ({keyframes, querypoints, querywidth, queryheight}) => {

    const screenCoords = [];
    const worldCoords = [];
    const keyframe = this.keyframes[result.keyframeIndex];
    for (let i = 0; i < result.matches.length; i++) {
      const querypointIndex = result.matches[i].querypointIndex;
      const keypointIndex = result.matches[i].keypointIndex;
      screenCoords.push({
        x: querypoints[querypointIndex].x2D,
        y: querypoints[querypointIndex].y2D,
      })
      worldCoords.push({
        x: keyframe.points[keypointIndex].x3D,
        y: keyframe.points[keypointIndex].y3D,
        z: 0,
      })
    }
    const modelViewTransform = estimateHomography({screenCoords, worldCoords});
    return modelViewTransform
  }
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

const compileMatching = ({imageList}) => {
  const keyframes = _buildKeyframes({imageList});
  return {keyframes};
}

module.exports = {
  Matcher,
  compileMatching
}
