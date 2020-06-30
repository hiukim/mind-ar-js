const {resize} = require("./utils/images.js");
const {buildImageList} = require('./image-list.js');
const {Matcher, compileMatching} = require('./matching/matcher.js');
const {Tracker, compileTracking} = require('./tracking/tracker.js');
const {estimateHomography} = require('./icp/estimate_homography.js');
const {refineHomography} = require('./icp/refine_homography');

class ImageTarget {
  constructor(options) {
    const {type, input, projectionTransform} = options;
    let imageList;
    let targetImage;
    let matchingData;
    let trackingData;

    if (type === 'compiled') {
      targetImage = input.targetImage;
      imageList = input.imageList;
      matchingData = input.matchingData;
      trackingData = input.trackingData;
      //imageList = buildImageList(targetImage);
    } else {
      targetImage = input;
      imageList = buildImageList(targetImage);
      matchingData = compileMatching({imageList});
      trackingData = compileTracking({imageList});
    }
    console.log("image target consdtructor", imageList, matchingData, trackingData);

    this.projectionTransform = projectionTransform;
    this.matcher = new Matcher(matchingData);
    this.tracker = new Tracker(trackingData, imageList, projectionTransform);
  }

  process(queryImage) {
    //const processImage = Object.assign(resize({image: queryImage, ratio: 0.5}), {dpi: 72});
    //const processImage = Object.assign(resize({image: queryImage, ratio: 1}), {dpi: 72});
    const processImage = Object.assign(queryImage, {dpi: 72});

    const matchResult = this.matcher.match(processImage);
    console.log("match result", matchResult);
    if (matchResult === null) return null;

    if (window.DEBUG_MATCH) {
      console.log("projection transform", this.projectionTransform, window.debugMatch.matXc2U);
    }

    const {screenCoords, worldCoords} = matchResult;
    const initialModelViewTransform = estimateHomography({screenCoords, worldCoords, projectionTransform: this.projectionTransform});
    console.log("initial matched model view transform", initialModelViewTransform);
    if (initialModelViewTransform === null) return null;

    // TODO: maybe don't this this refineHomography. result seems worse when the detected size is big
    const {modelViewTransform: refinedModelViewTransform, err} = refineHomography({initialModelViewTransform, projectionTransform: this.projectionTransform, worldCoords, screenCoords});

    if (window.DEBUG_MATCH) {
      console.log("refine err", err);
      console.log("refinedModelViewTransform", refinedModelViewTransform, window.debugMatch.camPose);
      if (!window.cmp2DArray(refinedModelViewTransform, window.debugMatch.camPose, 0.0001)) {
        console.log("INCORRECT ICP refinedModelViewTransform", refinedModelViewTransform, window.debugMatch.camPose);
      }
    }

    console.log("initial refined model view transform", refinedModelViewTransform);

    const updatedModelViewTransform = this.tracker.track(refinedModelViewTransform, processImage);
    console.log("initial tracking updated model view transform", updatedModelViewTransform);

    //return updatedModelViewTransform;
    //return initialModelViewTransform;
    return refinedModelViewTransform;
  }
}

const compile = (targetImage) => {
  const imageList = buildImageList(targetImage);

  var _start = new Date().getTime();
  const trackingData = compileTracking({imageList});
  //const trackingData = null;
  var _end = new Date().getTime();
  console.log('exec time compile tracking: ', _start, _end, _end - _start);

  const matchingData = compileMatching({imageList});
  //const matchingData = null;
  return {targetImage, matchingData, trackingData, imageList};
  //return {matchingData, trackingData};
}

module.exports = {
  ImageTarget,
  compile
}
