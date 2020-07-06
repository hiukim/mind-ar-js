const {build: buildGaussianPyramid} = require('./gaussian-pyramid');
const {build: buildDoGPyramid} = require('./dog-pyramid');
const {build: hierarchicalClusteringBuild} = require('./hierarchical-clustering.js');
const {detect} = require('./detector');
const {extract} = require('./freak-extractor');
const {match} = require('./matching');

const PYRAMID_NUM_SCALES_PER_OCTAVES = 3;
const PYRAMID_MIN_SIZE = 8;
//const FEATURE_DENSITY = 100;

class Matcher {
  constructor(matchingData) {
    this.keyframes = matchingData.keyframes;
  }

  // return a list of screenCoords -> worldCoords pairs
  match(targetImage) {
    const querypoints = _extractPoints({image: targetImage});
    if (typeof window !== 'undefined' && window.DEBUG_MATCH) {
      if (querypoints.length !== window.debugMatch.points.length) {
        console.log("INCORRECT querypoints length", querypoints.length, window.debugMatch.points.length);
      }
      for (let i = 0; i < querypoints.length; i++) {
        if (!window.cmp(querypoints[i].x2D, window.debugMatch.points[i].x)) {
          console.log("INCORRECT query point", i, querypoints[i], window.debugMatch.points[i]);
        }
      }
    }
    const result = match({keyframes: this.keyframes, querypoints: querypoints, querywidth: targetImage.width, queryheight: targetImage.height});

    if (typeof window !== 'undefined' && window.DEBUG_MATCH) {
      console.log("result", result);
      if (!!result !== !!window.debugMatch.finalH) {
        console.log("INCORRECT match result", result, window.debugMatch.finalH);
      }
      if (result !== null) {
        if (result.keyframeIndex !== window.debugMatch.finalMatchId) {

        }
        if (!window.cmpArray(result.H, window.debugMatch.finalH)) {
          console.log("INCORRECT result H", result.H, window.debugMatch.finalH);
        }
        console.log("final matches length", result.matches.length, window.debugMatch.finalMatches.length);
        const dMatches = window.debugMatch.finalMatches;
        for (let i = 0; i < result.matches.length; i++) {
          if (result.matches[i].querypointIndex !== dMatches[i].ins || result.matches[i].keypointIndex !== dMatches[i].res) {
            console.log("INCORRECT final matches", i, result.matches, dMatches);
            break;
          }
        }
      }
    }

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
  //const maxFeatureNum = FEATURE_DENSITY * image.width * image.height / (480.0*360);
  const gaussianPyramid = buildGaussianPyramid({image, minSize: PYRAMID_MIN_SIZE, numScalesPerOctaves: PYRAMID_NUM_SCALES_PER_OCTAVES});

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

  if (typeof window !== 'undefined' && window.DEBUG) {
    const dPoints = window.debugContent.refDataSet[window.debug.keyframeIndex];
    console.log("keypoints length", window.debug.keyframeIndex, keypoints.length, 'vs', dPoints.length);
    for (let i = 0; i < keypoints.length; i++) {
      if (!window.cmpObj(keypoints[i], dPoints[i], ['x2D', 'y2D', 'x3D', 'y3D', 'scale', 'angle'])
         || (!!keypoints[i].maxima !== !!dPoints[i].maxima)
      ) {
        console.log("INCORRECT keypoint", i, keypoints[i], dPoints[i]);
      }
      const dDescriptors = [];
      for (let j = 0; j < keypoints[i].descriptors.length; j++) {
        let bit = "";
        // artoolkit bit ordering [7 6 5 4 3 2 1 0, 15 14 13 12 11 10 9 8, 23 22 21 20 19 18 17 15, ...]
        for (let k = 0; k < 4; k++) {
          let v = dPoints[i].descriptors[j*4+k].toString(2).padStart(8, 0).split("").reverse().join("");
          bit = bit + v;
        }
        let dVal = parseInt(bit, 2) >>> 0;
        dDescriptors.push(dVal);
      }

      for (let j = 0; j < keypoints[i].descriptors.length-1; j++) { // the last byte has different ordering. don't want to fix
        if (keypoints[i].descriptors[j] !== dDescriptors[j]) {
          console.log("INCORRECT keypoint descriptors", i, j, keypoints[i], dPoints[i], dDescriptors);
          break;
        }
      }
    }
  }

  return keypoints;
}

const _buildKeyframes = ({imageList}) => {
  const keyframes = [];

  for (let i = 0; i < imageList.length; i++) {
    if (typeof window !== 'undefined' && window.DEBUG) {
      window.debug.keyframeIndex = i;
    }

    const image = imageList[i];
    const keypoints = _extractPoints({image});
    const pointsCluster = hierarchicalClusteringBuild({points: keypoints});
    keyframes.push({points: keypoints, pointsCluster, width: image.width, height: image.height});

    if (typeof window !== 'undefined' && window.DEBUG) {
      const dCluster = window.debugContent.clusters[i];

      const goNode = (n1, n2) => {
        //console.log("node", n1.pointIndexes, n2.pointIndexes);
        if (!!n1.leaf !== !!n2.isLeaf) {
          console.log("INCORRECT node leaf", n1, n2);
        }
        if (n1.leaf) {
          if (n1.pointIndexes.length !== n2.pointIndexes.length) {
            console.log("INCORRECT node pointIndexes", n1, n2);
          }
          for (let i = 0; i < n1.pointIndexes.length; i++) {
            if (n1.pointIndexes[i] !== n2.pointIndexes[i]) {
              console.log("INCORRECT node pointIndexes", n1, n2);
            }
          }
        } else {
          if (n1.children.length !== n2.children.length) {
            console.log("INCORRECT node children length", n1, n2);
          }
          for (let i = 0; i < n1.children.length; i++) {
            goNode(n1.children[i], n2.children[i]);
          }
        }
      }
      goNode(pointsCluster.rootNode, dCluster);
    }
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
