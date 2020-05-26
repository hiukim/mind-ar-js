const TinyQueue = require('tinyqueue');
const {compute: hammingCompute} = require('./hamming_distance.js');
const {computeHoughMatches} = require('./hough.js');

const kMinNumInliers = 8;
const mMaxNodesToPop = 8;
const mThreshold = 0.7;
const kHoughBinDelta = 1;

const createMatcher = ({keyframes}) => {
  const matcher = {
    keyframes: keyframes,

    match: ({querypoints, querywidth, queryheight}) => {
      const results = [];

      for (let i = 0; i < matcher.keyframes.length; i++) {
        const keyframe = matcher.keyframes[i];
        const keypoints = keyframe.points;

        const matches = [];
        for (let j = 0; j < querypoints.length; j++) {
          const rootNode = keyframe.rootNode;
          const querypoint = querypoints[j];
          const keypointIndexes = [];
          const queue = new TinyQueue([], (a1, a2) => {return a1.d - a2.d});

          matcher._query({node: rootNode, keypoints, querypoint, queue, keypointIndexes, numPop: 0});

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
          if (bestIndex !== -1 && (bestD2 === Number.MAX_SAFE_INTEGER || (1.0 * bestD1 / bestD2) < mThreshold)) {
            matches.push({querypointIndex: j, keypointIndex: bestIndex});
          }

          results.push({
            keypointIndexes: keypointIndexes,
            bestD1,
            bestD2,
            bestIndex
          })
          //console.log("keypointIndexes:", keypointIndexes);
        }
        console.log("matches", matches);

        if (matches.length < kMinNumInliers) {
          console.log("hough matches []");
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
        console.log("hough matches", houghMatches);
      }
      return results;
    },

    _query: ({node, keypoints, querypoint, queue, keypointIndexes, numPop}) => {
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
          matcher._query({node: node.children[i], keypoints, querypoint, queue, keypointIndexes, numPop});
        }
      }

      if (numPop < mMaxNodesToPop && queue.length > 0) {
        const {node, d} = queue.pop();
        numPop += 1;
        matcher._query({node, keypoints, querypoint, queue, keypointIndexes, numPop});
      }
    }
  }
  return matcher;
}

module.exports = {
  createMatcher
}
