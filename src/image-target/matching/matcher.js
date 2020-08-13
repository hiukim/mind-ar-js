const {build: hierarchicalClusteringBuild} = require('./hierarchical-clustering.js');
const {match} = require('./matching');

const PYRAMID_NUM_SCALES_PER_OCTAVES = 3;
const PYRAMID_MIN_SIZE = 8;

class Matcher {
  constructor(matchingData) {
    this.keyframes = matchingData;
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

module.exports = {
  Matcher
}
