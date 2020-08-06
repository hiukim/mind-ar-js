const {build: hierarchicalClusteringBuild} = require('./hierarchical-clustering.js');
const {match} = require('./matching');
//const {Detector} = require('../detectorGPU/detector.js');
const {Detector} = require('../detectorCPU/detector.js');

const PYRAMID_NUM_SCALES_PER_OCTAVES = 3;
const PYRAMID_MIN_SIZE = 8;

class Matcher {
  constructor(matchingData) {
    this.keyframes = matchingData.keyframes;
  }

  matchDetection(queryWidth, queryHeight, featurePoints) {
    const querypoints = [];
    const dpi = 1.0;
    for (let i = 0; i < featurePoints.length; i++) {
      querypoints.push({
        x2D: featurePoints[i].x,
        y2D: featurePoints[i].y,
        x3D: (featurePoints[i].x + 0.5) / dpi,
        y3D: ((queryHeight-0.5) - featurePoints[i].y) / dpi,
        angle: featurePoints[i].angle,
        scale: featurePoints[i].sigma,
        maxima: featurePoints[i].score > 0,
        descriptors: featurePoints[i].descriptors
      })
    }
    const result = match({keyframes: this.keyframes, querypoints: querypoints, querywidth: queryWidth, queryheight: queryHeight});
    if (result === null) return null;

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

    return {screenCoords, worldCoords};
  }
}

const _extractPoints = ({image}) => {
  const detector = new Detector(image.width, image.height);
  const ps = detector.detect(image.data);
  const querypoints = [];
  const dpi = 1.0;
  for (let i = 0; i < ps.length; i++) {
    querypoints.push({
      x2D: ps[i].x,
      y2D: ps[i].y,
      x3D: (ps[i].x + 0.5) / image.dpi,
      y3D: ((image.height-0.5) - ps[i].y) / image.dpi,
      angle: ps[i].angle,
      scale: ps[i].sigma,
      maxima: ps[i].score > 0,
      descriptors: ps[i].descriptors
    })
  }
  return querypoints;
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
