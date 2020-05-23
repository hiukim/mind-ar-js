const TinyQueue = require('tinyqueue');
const {compute: hammingCompute} = require('./hamming_distance.js');
const mMaxNodesToPop = 8;
const mThreshold = 0.7;

const createMatcher = ({keyframes}) => {
  const matcher = {
    keyframes: keyframes,

    match: ({points}) => {
      const results = [];

      for (let i = 0; i < matcher.keyframes.length; i++) {
        const matches = [];
        for (let j = 0; j < points.length; j++) {
          const keyframe = matcher.keyframes[i];
          const keypoints = keyframe.points;
          const rootNode = keyframe.rootNode;
          const point = points[j];
          const queryPointIndexes = [];
          const queue = new TinyQueue([], (a1, a2) => {return a1.d - a2.d});

          matcher._query({node: rootNode, keypoints, point, queue, queryPointIndexes, numPop: 0});

          let bestIndex = -1;
          let bestD1 = Number.MAX_SAFE_INTEGER;
          let bestD2 = Number.MAX_SAFE_INTEGER;

          for (let k = 0; k < queryPointIndexes.length; k++) {
            const keypoint = keypoints[queryPointIndexes[k]];
            if (keypoint.maxima != point.maxima) continue;

            const d = hammingCompute({v1: keypoint.descriptors, v2: point.descriptors});
            if (d < bestD1) {
              bestD2 = bestD1;
              bestD1 = d;
              bestIndex = queryPointIndexes[k];
            } else if (d < bestD2) {
              bestD2 = d;
            }
          }
          if (bestIndex !== -1 && (bestD2 === Number.MAX_SAFE_INTEGER || (1.0 * bestD1 / bestD2) < mThreshold)) {
            matches.push({pointIndex: j, keypointIndex: bestIndex});
          }

          results.push({
            queryPointIndexes: queryPointIndexes,
            bestD1,
            bestD2,
            bestIndex
          })
          //console.log("queryPointIndexes:", queryPointIndexes);
        }
      }
      return results;
    },

    _query: ({node, keypoints, point, queue, queryPointIndexes, numPop}) => {
      if (node.leaf) {
        for (let i = 0; i < node.pointIndexes.length; i++) {
          queryPointIndexes.push(node.pointIndexes[i]);
        }
        return;
      }

      const distances = [];
      for (let i = 0; i < node.children.length; i++) {
        const childNode = node.children[i];
        const centerPointIndex = childNode.centerPointIndex;
        const d = hammingCompute({v1: keypoints[centerPointIndex].descriptors, v2: point.descriptors});
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
          matcher._query({node: node.children[i], keypoints, point, queue, queryPointIndexes, numPop});
        }
      }

      if (numPop < mMaxNodesToPop && queue.length > 0) {
        const {node, d} = queue.pop();
        numPop += 1;
        matcher._query({node, keypoints, point, queue, queryPointIndexes, numPop});
      }
    }
  }
  return matcher;
}

module.exports = {
  createMatcher
}
