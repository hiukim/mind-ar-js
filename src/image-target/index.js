const {resize} = require("./utils/images.js");
const {buildImageList} = require('./image-list.js');
const {Matcher, compileMatching} = require('./matching/matcher.js');
const {Tracker: Tracker2, compileTracking} = require('./tracking2/tracker.js');
const {Tracker: Tracker} = require('./trackingGPU/tracker.js');
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
    //console.log("image target consdtructor", imageList, matchingData, trackingData);

    this.projectionTransform = projectionTransform;

    this.matcher = new Matcher(matchingData);
    this.tracker = new Tracker(trackingData, imageList, projectionTransform);
    this.tracker2 = new Tracker2(trackingData, imageList, projectionTransform);
    this.isTracking = false;
  }

  setupQuery(queryWidth, queryHeight) {
    this.queryWidth = queryWidth;
    this.queryHeight = queryHeight;
    this.tracker.setupQuery(queryWidth, queryHeight);
    this.tracker2.setupQuery(queryWidth, queryHeight);
  }

  match(featurePoints) {
    const matchResult = this.matcher.matchDetection(this.queryWidth, this.queryHeight, featurePoints);
    if (matchResult === null) return null;

    const {screenCoords, worldCoords} = matchResult;

    const initialModelViewTransform = estimateHomography({screenCoords, worldCoords, projectionTransform: this.projectionTransform});
    console.log("initial matched model view transform", initialModelViewTransform);

    if (initialModelViewTransform === null) return null;
    //return initialModelViewTransform;

    // TODO: maybe don't this refineHomography. result seems worse when the detected size is big
    const {modelViewTransform: refinedModelViewTransform, err} = refineHomography({initialModelViewTransform, projectionTransform: this.projectionTransform, worldCoords, screenCoords});

    this.isTracking = true;
    this.tracker.detected(refinedModelViewTransform);
  }

  track(input) {
    const updatedModelViewTransform = this.tracker.track(input);
    if (updatedModelViewTransform === null) {
      this.isTracking = false;
    }
    return updatedModelViewTransform;
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
