const TinyQueue = require('tinyqueue');
const {compute: hammingCompute} = require('./hamming_distance.js');
const {computeHoughMatches} = require('./hough.js');
const {computeHomography} = require('./homography.js');

const kMinNumInliers = 8;
const mMaxNodesToPop = 8;
const mThreshold = 0.7;
const kHoughBinDelta = 1;

const createMatcher = ({keyframes, debugContent}) => {
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
        console.log("matches1 length", matches.length, debugContent.querykeyframes[i].matches1.length);
        for (let j = 0; j < matches.length; j++) {
          if (matches[j].querypointIndex !== debugContent.querykeyframes[i].matches1[j].ins
            || matches[j].keypointIndex !== debugContent.querykeyframes[i].matches1[j].res) {
            console.log("INCORRECT MATCH", j);
          }
        }

        if (matches.length < kMinNumInliers) {
          console.log("hough matches", [], debugContent.querykeyframes[i].houghMatches1);
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
          debugQuerykeyframe: debugContent.querykeyframes[i],
        });
        console.log("hough matches1 length", houghMatches.length, debugContent.querykeyframes[i].houghMatches1.length);
        for (let j = 0; j < houghMatches.length; j++) {
          console.log(houghMatches[j], debugContent.querykeyframes[i].houghMatches1[j]);
          //if (houghMatches[j].querypointIndex !== debugContent.querykeyframes[i].houghMatches1[j].ins
          //  || houghMatches[j].keypointIndex !== debugContent.querykeyframes[i].houghMatches1[j].res) {
          //  console.log("INCORRECT HOUGH MATCH1", j);
          //}
        }

        const srcPoints = [];
        const dstPoints = [];
        for (let i = 0; i < houghMatches.length; i++) {
          const querypoint = querypoints[houghMatches[i].querypointIndex];
          const keypoint = keypoints[houghMatches[i].keypointIndex];
          srcPoints.push([ keypoint.x2D, keypoint.y2D ]);
          dstPoints.push([ querypoint.x2D, querypoint.y2D ]);
        }
        const testPoints = [
          [0, 0],
          [keyframe.width, 0],
          [keyframe.width, keyframe.height],
          [0, keyframe.height]
        ]

        const H = computeHomography({srcPoints, dstPoints, testPoints, debugQuerykeyframe: debugContent.querykeyframes[i]});
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
