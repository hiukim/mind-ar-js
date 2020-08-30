const {match} = require('./matching');

class Matcher {
  constructor(matchingData,) {
    this.keyframes = matchingData;
  }

  matchDetection(queryWidth, queryHeight, featurePoints) {
    const result = match({keyframes: this.keyframes, querypoints: featurePoints, querywidth: queryWidth, queryheight: queryHeight});
    if (result === null) return null;

    const screenCoords = [];
    const worldCoords = [];
    const keyframe = this.keyframes[result.keyframeIndex];

    for (let i = 0; i < result.matches.length; i++) {
      const querypointIndex = result.matches[i].querypointIndex;
      const keypointIndex = result.matches[i].keypointIndex;
      screenCoords.push({
        x: featurePoints[querypointIndex].x,
        y: featurePoints[querypointIndex].y,
      })
      worldCoords.push({
        x: (keyframe.points[keypointIndex].x + 0.5) / keyframe.scale,
        y: ((keyframe.height-0.5) -keyframe.points[keypointIndex].y) / keyframe.scale,
        z: 0,
      })
    }

    return {screenCoords, worldCoords};
  }
}

module.exports = {
  Matcher
}
