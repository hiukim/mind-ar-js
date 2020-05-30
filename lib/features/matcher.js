const TinyQueue = require('tinyqueue');
const {compute: hammingCompute} = require('./hamming_distance.js');
const {computeHoughMatches} = require('./hough.js');
const {computeHomography} = require('./homography.js');
const {multiplyPointHomographyInhomogenous, matrixInverse33} = require('./geometry.js');

const kHomographyInlierThreshold = 3;
const kMinNumInliers = 8;
const mMaxNodesToPop = 8;
const mThreshold = 0.7;
const kHoughBinDelta = 1;

const createMatcher = ({keyframes, debugContent}) => {
  const matcher = {
    keyframes: keyframes,


    match: ({querypoints, querywidth, queryheight}) => {
      let result = null;

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
        }
        console.log("matches1 length", matches.length, debugContent.querykeyframes[i].matches1.length);
        for (let j = 0; j < matches.length; j++) {
          if (matches[j].querypointIndex !== debugContent.querykeyframes[i].matches1[j].ins
            || matches[j].keypointIndex !== debugContent.querykeyframes[i].matches1[j].res) {
            console.log("INCORRECT MATCH", j, matches[j], debugContent.querykeyframes[i].matches1[j]);
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

        const H = computeHomography({
          srcPoints,
          dstPoints,
          keyframe,
          debugQuerykeyframe: debugContent.querykeyframes[i],
          startDebugIndex: 0
        });

        console.log("final H", H, debugContent.querykeyframes[i].H1);

        if (H === null) continue;

        const inlierMatches = findInlierMatches({
          querypoints,
          keypoints: keyframe.points,
          H,
          matches: houghMatches,
          threshold: kHomographyInlierThreshold
        });


        if (inlierMatches.length < kMinNumInliers) {
          continue;
        }

        console.log("inlier matches1 length", inlierMatches.length, debugContent.querykeyframes[i].inlierMatches1.length);
        for (let j = 0; j < inlierMatches.length; j++) {
          console.log(inlierMatches[j], debugContent.querykeyframes[i].inlierMatches1[j]);
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

            // TODO: optimize, hamming distance might have been computed before. can cache?
            const d = hammingCompute({v1: keypoint.descriptors, v2: querypoint.descriptors});
            if (d < bestD1) {
              bestD2 = bestD1;
              bestD1 = d;
              bestIndex = k;
            } else if (d < bestD2) {
              bestD2 = d;
            }
          }

          if (bestIndex !== -1 && (bestD2 === Number.MAX_SAFE_INTEGER || (1.0 * bestD1 / bestD2) < mThreshold)) {
            matches2.push({querypointIndex: j, keypointIndex: bestIndex});
          }
        }

        console.log("matches2 length", matches2.length, debugContent.querykeyframes[i].matches2.length);
        for (let j = 0; j < matches2.length; j++) {
          //console.log("MATCH 2", j, matches2[j], debugContent.querykeyframes[i].matches2[j]);
          if (matches2[j].querypointIndex !== debugContent.querykeyframes[i].matches2[j].ins
            || matches2[j].keypointIndex !== debugContent.querykeyframes[i].matches2[j].res) {
            console.log("INCORRECT MATCH 2", j, matches2[j], debugContent.querykeyframes[i].matches2[j]);
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
          debugQuerykeyframe: debugContent.querykeyframes[i],
        });
        //console.log("hough matches2 length", houghMatches2.length, debugContent.querykeyframes[i].houghMatches2.length);

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
          keyframe, debugQuerykeyframe: debugContent.querykeyframes[i]
        });

        console.log("final H2", H2, debugContent.querykeyframes[i].H2);

        if (H2 === null) continue;

        const inlierMatches2 = findInlierMatches({
          querypoints,
          keypoints: keyframe.points,
          H: H2,
          matches: houghMatches2,
          threshold: kHomographyInlierThreshold
        });

        if (inlierMatches2.length < kMinNumInliers) {
          continue;
        }

        console.log("inlier matches2 length", inlierMatches2.length, debugContent.querykeyframes[i].inlierMatches2.length);
        for (let j = 0; j < inlierMatches2.length; j++) {
          console.log(inlierMatches2[j], debugContent.querykeyframes[i].inlierMatches2[j]);
        }

        if (inlierMatches2.length < kMinNumInliers) {
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

const findInlierMatches = (options) => {
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
  createMatcher
}
