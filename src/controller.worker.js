const {Matcher} = require('./image-target/matching/matcher.js');
const {Estimator} = require('./image-target/estimation/estimator.js');

let projectionTransform = null;
let matchingDataList = null;
let debugMode = false;
let matcher = null;
let estimator = null;

onmessage = (msg) => {
  const {data} = msg;

  if (data.type === 'setup') {
    projectionTransform = data.projectionTransform;
    matchingDataList = data.matchingDataList;
    debugMode = data.debugMode;
    matcher = new Matcher(data.inputWidth, data.inputHeight, debugMode);
    estimator = new Estimator(data.projectionTransform);
  }
  else if (data.type === 'match') {
    const targetIndex = data.targetIndex;

    let matchedTargetIndex = -1;
    let matchedModelViewTransform = null;
    let debugExtras = null;

    const {keyframeIndex, screenCoords, worldCoords, debugExtra} = matcher.matchDetection(matchingDataList[targetIndex], data.featurePoints);

    if (keyframeIndex !== -1) {
      const modelViewTransform = estimator.estimate({screenCoords, worldCoords});
      if (modelViewTransform) {
	matchedTargetIndex = targetIndex;
	matchedModelViewTransform = modelViewTransform;
      }
    }

    postMessage({
      type: 'matchDone',
      targetIndex: matchedTargetIndex,
      modelViewTransform: matchedModelViewTransform,
      debugExtra
    });
  }
  else if (data.type === 'trackUpdate') {
    const {modelViewTransform, worldCoords, screenCoords} = data;
    const finalModelViewTransform = estimator.refineEstimate({initialModelViewTransform: modelViewTransform, worldCoords, screenCoords});
    postMessage({
      type: 'trackUpdateDone',
      modelViewTransform: finalModelViewTransform,
    });
  }
};

