const {match} = require('./matching');

class Matcher {
  constructor(queryWidth, queryHeight, debugMode = false) {
    this.queryWidth = queryWidth;
    this.queryHeight = queryHeight;
    this.debugMode = debugMode;
  }

  matchDetection(keyframes, featurePoints) {
    const {result, debugExtra} = match({keyframes: keyframes, querypoints: featurePoints, querywidth: this.queryWidth, queryheight: this.queryHeight, debugMode: this.debugMode});
    if (result === null) {
      return {keyframeIndex: -1, debugExtra};
    }

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
        //y: ((keyframe.height-0.5) -keyframe.points[keypointIndex].y) / keyframe.scale,
        y: (keyframe.points[keypointIndex].y + 0.5) / keyframe.scale,
        z: 0,
      })
    }

    return {screenCoords, worldCoords, keyframeIndex: result.keyframeIndex, debugExtra};
  }
}

module.exports = {
  Matcher
}
