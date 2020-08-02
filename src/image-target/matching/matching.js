const TinyQueue = require('tinyqueue').default;
const {compute: hammingCompute} = require('./hamming-distance.js');
const {computeHoughMatches} = require('./hough.js');
const {computeHomography} = require('./homography.js');
const {multiplyPointHomographyInhomogenous, matrixInverse33} = require('../utils/geometry.js');

const INLIER_THRESHOLD = 3;
//const MIN_NUM_INLIERS = 8;  //default
const MIN_NUM_INLIERS = 6;
const CLUSTER_MAX_POP = 8;
const HAMMING_THRESHOLD = 0.7;

// match list of querpoints against pre-built list of keyframes
const match = ({keyframes, querypoints, querywidth, queryheight}) => {
  let result = null;

  for (let i = 0; i < keyframes.length; i++) {
    const keyframe = keyframes[i];
    const keypoints = keyframe.points;

    if (typeof window !== 'undefined' && window.DEBUG_MATCH) {
      window.debug.querykeyframeIndex = i;
    }
    if (typeof window !== 'undefined' && window.DEBUG_TIME) {
      var _start = new Date().getTime();
    }

    const matches = [];
    for (let j = 0; j < querypoints.length; j++) {
      const rootNode = keyframe.pointsCluster.rootNode;
      const querypoint = querypoints[j];
      const keypointIndexes = [];
      const queue = new TinyQueue([], (a1, a2) => {return a1.d - a2.d});

      _query({node: rootNode, keypoints, querypoint, queue, keypointIndexes, numPop: 0});

      let bestIndex = -1;
      let bestD1 = Number.MAX_SAFE_INTEGER;
      let bestD2 = Number.MAX_SAFE_INTEGER;

      for (let k = 0; k < keypointIndexes.length; k++) {
        const keypoint = keypoints[keypointIndexes[k]];
        if (keypoint.maxima != querypoint.maxima) continue;

        const d = hammingCompute({v1: keypoint.descriptors, v2: querypoint.descriptors});
        if (d < bestD1) {
          bestD2 = bestD1;
          bestD1 = d;
          bestIndex = keypointIndexes[k];
        } else if (d < bestD2) {
          bestD2 = d;
        }
      }
      if (bestIndex !== -1 && (bestD2 === Number.MAX_SAFE_INTEGER || (1.0 * bestD1 / bestD2) < HAMMING_THRESHOLD)) {
        matches.push({querypointIndex: j, keypointIndex: bestIndex});
      }

      if (typeof window !== 'undefined' && window.DEBUG_MATCH) {
        if (!window.debug.queryMatchIndex) window.debug.queryMatchIndex = 0;
        const dMatch = window.debugMatch.matches[window.debug.queryMatchIndex];
        if (bestIndex === -1) {
          if (dMatch && dMatch.bestIndex !== 2147483647) {
            console.log("INCORRECT query match", bestD1, bestD2, bestIndex, 'vs', dMatch.firstBest, dMatch.secondBest, dMatch.bestIndex);
          }
        } else {
          if (bestIndex !== dMatch.bestIndex) {
            console.log("INCORRECT query match", bestD1, bestD2, bestIndex, 'vs', dMatch.firstBest, dMatch.secondBest, dMatch.bestIndex);
          }
        }
        window.debug.queryMatchIndex += 1;
      }
    }

    if (typeof window !== 'undefined' && window.DEBUG_TIME) {
      console.log('exec time until first match: ', new Date().getTime() - _start);
    }

    if (typeof window !== 'undefined' && window.DEBUG_MATCH) {
      const dMatches = window.debugMatch.querykeyframes[i].matches1;
      console.log("matches 1", matches.length, dMatches.length);
      if (matches.length !== dMatches.length) {
        console.log("INCORRECT matches1 length");
      }
      for (let i = 0; i < matches.length; i++) {
        if (matches[i].querypointIndex !== dMatches[i].ins || matches[i].keypointIndex !== dMatches[i].res) {
          console.log("INCORRECT matches1", i, matches[i], dMatches[i]);
        }
      }
    }

    if (matches.length < MIN_NUM_INLIERS) {
      continue;
    }

    const houghMatches = computeHoughMatches({
      keypoints: keyframe.points,
      querypoints,
      keywidth: keyframe.width,
      keyheight: keyframe.height,
      querywidth,
      queryheight,
      matches,
    });

    if (typeof window !== 'undefined' && window.DEBUG_TIME) {
      console.log('exec time until first hough match: ', new Date().getTime() - _start);
    }

    if (typeof window !== 'undefined' && window.DEBUG_MATCH) {
      const dMatches = window.debugMatch.querykeyframes[i].houghMatches1;
      console.log("hough matches 1", houghMatches.length, dMatches.length);
      if (houghMatches.length !== dMatches.length) {
        console.log("INCORRECT matches1 length");
      }
      for (let i = 0; i < houghMatches.length; i++) {
        if (houghMatches[i].querypointIndex !== dMatches[i].ins || houghMatches[i].keypointIndex !== dMatches[i].res) {
          console.log("INCORRECT matches1", i);
        }
      }
    }

    const srcPoints = [];
    const dstPoints = [];
    for (let i = 0; i < houghMatches.length; i++) {
      const querypoint = querypoints[houghMatches[i].querypointIndex];
      const keypoint = keypoints[houghMatches[i].keypointIndex];
      srcPoints.push([ keypoint.x2D, keypoint.y2D ]);
      dstPoints.push([ querypoint.x2D, querypoint.y2D ]);
    }

    if (typeof window !== 'undefined' && window.DEBUG_MATCH) {
      window.debug.homographyIndex = -1; // +1 at start
    }

    const H = computeHomography({
      srcPoints,
      dstPoints,
      keyframe,
    });

    if (typeof window !== 'undefined' && window.DEBUG_TIME) {
      console.log('exec time until first Homography: ', new Date().getTime() - _start);
    }

    if (typeof window !== 'undefined' && window.DEBUG_MATCH) {
      const dH = window.debugMatch.querykeyframes[i].H1;
      if (!window.cmpArray(H, dH, 0.001)) {
        console.log("INCORRECT H1", i, H, dH);
      }
    }

    if (H === null) continue;

    const inlierMatches = _findInlierMatches({
      querypoints,
      keypoints: keyframe.points,
      H,
      matches: houghMatches,
      threshold: INLIER_THRESHOLD
    });

    if (typeof window !== 'undefined' && window.DEBUG_TIME) {
      console.log('exec time until first inlier matches: ', new Date().getTime() - _start);
    }

    //console.log("inlierMatches", inlierMatches);

    if (inlierMatches.length < MIN_NUM_INLIERS) {
      continue;
    }

    if (typeof window !== 'undefined' && window.DEBUG_MATCH) {
      const dMatches = window.debugMatch.querykeyframes[i].inlierMatches1;
      console.log("inlier matches 1", inlierMatches.length, dMatches.length);
      if (inlierMatches.length !== dMatches.length) {
        console.log("INCORRECT inlierMatches1 length");
      }
      for (let i = 0; i < inlierMatches.length; i++) {
        if (inlierMatches[i].querypointIndex !== dMatches[i].ins || inlierMatches[i].keypointIndex !== dMatches[i].res) {
          console.log("INCORRECT inlierMatches1", i);
        }
      }
    }

    // do another loop of match using the homography
    const HInv = matrixInverse33(H, 0.00001);
    const dThreshold2 = 10 * 10;
    const matches2 = [];
    for (let j = 0; j < querypoints.length; j++) {
      const querypoint = querypoints[j];
      const mapquerypoint = multiplyPointHomographyInhomogenous([querypoint.x2D, querypoint.y2D], HInv);

      let bestIndex = -1;
      let bestD1 = Number.MAX_SAFE_INTEGER;
      let bestD2 = Number.MAX_SAFE_INTEGER;

      for (let k = 0; k < keypoints.length; k++) {
        const keypoint = keypoints[k];
        if (keypoint.maxima != querypoint.maxima) continue;

        // check distance threshold
        const d2 = (keypoint.x2D - mapquerypoint[0]) * (keypoint.x2D - mapquerypoint[0])
                  + (keypoint.y2D - mapquerypoint[1]) * (keypoint.y2D - mapquerypoint[1]);
        if (d2 > dThreshold2) continue;

        const d = hammingCompute({v1: keypoint.descriptors, v2: querypoint.descriptors});
        if (d < bestD1) {
          bestD2 = bestD1;
          bestD1 = d;
          bestIndex = k;
        } else if (d < bestD2) {
          bestD2 = d;
        }
      }

      if (bestIndex !== -1 && (bestD2 === Number.MAX_SAFE_INTEGER || (1.0 * bestD1 / bestD2) < HAMMING_THRESHOLD)) {
        matches2.push({querypointIndex: j, keypointIndex: bestIndex});
      }
    }

    if (typeof window !== 'undefined' && window.DEBUG_TIME) {
      console.log('exec time until second matches: ', new Date().getTime() - _start);
    }

    if (typeof window !== 'undefined' && window.DEBUG_MATCH) {
      const dMatches = window.debugMatch.querykeyframes[i].matches2;
      console.log("matches 2", matches2.length, dMatches.length);
      if (matches2.length !== dMatches.length) {
        console.log("INCORRECT matches2 length");
      }
      for (let i = 0; i < matches2.length; i++) {
        if (matches2[i].querypointIndex !== dMatches[i].ins || matches2[i].keypointIndex !== dMatches[i].res) {
          console.log("INCORRECT matches2", i);
        }
      }
    }

    const houghMatches2 = computeHoughMatches({
      keypoints: keyframe.points,
      querypoints,
      keywidth: keyframe.width,
      keyheight: keyframe.height,
      querywidth,
      queryheight,
      matches: matches2,
    });

    if (typeof window !== 'undefined' && window.DEBUG_TIME) {
      console.log('exec time until second hough matches: ', new Date().getTime() - _start);
    }

    const srcPoints2 = [];
    const dstPoints2 = [];
    for (let i = 0; i < houghMatches2.length; i++) {
      const querypoint = querypoints[houghMatches2[i].querypointIndex];
      const keypoint = keypoints[houghMatches2[i].keypointIndex];
      srcPoints2.push([ keypoint.x2D, keypoint.y2D ]);
      dstPoints2.push([ querypoint.x2D, querypoint.y2D ]);
    }

    const H2 = computeHomography({
      srcPoints: srcPoints2,
      dstPoints: dstPoints2,
      keyframe
    });

    if (typeof window !== 'undefined' && window.DEBUG_MATCH) {
      const dH = window.debugMatch.querykeyframes[i].H2;
      if (!window.cmpArray(H2, dH, 0.0001)) {
        console.log("INCORRECT H2", i, H2, dH);
      }
    }

    if (typeof window !== 'undefined' && window.DEBUG_TIME) {
      console.log('exec time until second homography: ', new Date().getTime() - _start);
    }

    if (H2 === null) continue;

    const inlierMatches2 = _findInlierMatches({
      querypoints,
      keypoints: keyframe.points,
      H: H2,
      matches: houghMatches2,
      threshold: INLIER_THRESHOLD
    });

    if (typeof window !== 'undefined' && window.DEBUG_MATCH) {
      const dMatches = window.debugMatch.querykeyframes[i].inlierMatches2;
      console.log("inlier matches 2", inlierMatches2.length, dMatches.length);
      if (inlierMatches2.length !== dMatches.length) {
        console.log("INCORRECT inlierMatches2 length");
      }
      for (let i = 0; i < inlierMatches2.length; i++) {
        if (inlierMatches2[i].querypointIndex !== dMatches[i].ins || inlierMatches2[i].keypointIndex !== dMatches[i].res) {
          console.log("INCORRECT inlierMatches2", i);
        }
      }
    }

    if (typeof window !== 'undefined' && window.DEBUG_TIME) {
      console.log('exec time until second inlier matches: ', new Date().getTime() - _start);
    }

    if (inlierMatches2.length < MIN_NUM_INLIERS) {
      continue;
    }

    if (result === null || result.matches.length < inlierMatches2.length) {
      result = {
        keyframeIndex: i,
        matches: inlierMatches2,
        H: H2,
      }
    }
  }

  return result;
};

const _query = ({node, keypoints, querypoint, queue, keypointIndexes, numPop}) => {
  if (node.leaf) {
    for (let i = 0; i < node.pointIndexes.length; i++) {
      keypointIndexes.push(node.pointIndexes[i]);
    }
    return;
  }

  const distances = [];
  for (let i = 0; i < node.children.length; i++) {
    const childNode = node.children[i];
    const centerPointIndex = childNode.centerPointIndex;
    const d = hammingCompute({v1: keypoints[centerPointIndex].descriptors, v2: querypoint.descriptors});
    distances.push(d);
  }

  let minD = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < node.children.length; i++) {
    minD = Math.min(minD, distances[i]);
  }

  for (let i = 0; i < node.children.length; i++) {
    if (distances[i] !== minD) {
      queue.push({node: node.children[i], d: distances[i]});
    }
  }
  for (let i = 0; i < node.children.length; i++) {
    if (distances[i] === minD) {
      _query({node: node.children[i], keypoints, querypoint, queue, keypointIndexes, numPop});
    }
  }

  if (numPop < CLUSTER_MAX_POP && queue.length > 0) {
    const {node, d} = queue.pop();
    numPop += 1;
    _query({node, keypoints, querypoint, queue, keypointIndexes, numPop});
  }
};

const _findInlierMatches = (options) => {
  const {keypoints, querypoints, H, matches, threshold} = options;

  const threshold2 = threshold * threshold;

  const goodMatches = [];
  for (let i = 0; i < matches.length; i++) {
    const querypoint = querypoints[matches[i].querypointIndex];
    const keypoint = keypoints[matches[i].keypointIndex];
    const mp = multiplyPointHomographyInhomogenous([keypoint.x2D, keypoint.y2D], H);
    const d2 = (mp[0] - querypoint.x2D) * (mp[0] - querypoint.x2D) + (mp[1] - querypoint.y2D) * (mp[1] - querypoint.y2D);
    if (d2 <= threshold2) {
      goodMatches.push( matches[i] );
    }
  }
  return goodMatches;
}

module.exports = {
  match
}
