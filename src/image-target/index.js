const {resize} = require("./utils/images.js");
const {buildImageList} = require('./image-list.js');
const {Matcher} = require('./matching/matcher.js');
//const {Tracker: Tracker} = require('./tracking/tracker.js');
const {Tracker: Tracker} = require('./trackingGPU/tracker.js');
const {estimateHomography} = require('./icp/estimate_homography.js');
const {refineHomography} = require('./icp/refine_homography');

class ImageTarget {
  constructor({projectionTransform, imageList, matchingData, trackingData}) {
    this.imageList = imageList;
    this.matchingData = matchingData;
    this.trackingData = trackingData;
    this.projectionTransform = projectionTransform;

    this.matcher = new Matcher(matchingData);
    this.tracker = new Tracker(trackingData, imageList, projectionTransform);
    this.isTracking = false;
  }

  setupQuery(queryWidth, queryHeight) {
    this.queryWidth = queryWidth;
    this.queryHeight = queryHeight;
    this.tracker.setupQuery(queryWidth, queryHeight);
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

module.exports = {
  ImageTarget,
}
