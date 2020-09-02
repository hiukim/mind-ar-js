const {match} = require('./matching');

class Matcher {
  constructor(queryWidth, queryHeight) {
    this.queryWidth = queryWidth;
    this.queryHeight = queryHeight;
  }

  matchDetection(keyframes, featurePoints) {
    const result = match({keyframes: keyframes, querypoints: featurePoints, querywidth: this.queryWidth, queryheight: this.queryHeight});
    if (result === null) return null;

    const screenCoords = [];
    const worldCoords = [];
    const keyframe = keyframes[result.keyframeIndex];

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

    return {screenCoords, worldCoords, keyframeIndex: result.keyframeIndex};
  }
}

module.exports = {
  Matcher
}
