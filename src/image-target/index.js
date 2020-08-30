const {Matcher} = require('./matching/matcher.js');
//const {Tracker: Tracker} = require('./tracking/tracker.js');
const {Tracker: Tracker} = require('./trackingGPU/tracker.js');
const {estimateHomography} = require('./icp/estimate_homography.js');
const {refineHomography} = require('./icp/refine_homography');

class ImageTarget {
  constructor({projectionTransform, imageList, matchingData, trackingData, targetImage}) {
    this.imageList = imageList;
    this.matchingData = matchingData;
    this.trackingData = trackingData;
    this.targetImage = targetImage;
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
    if (matchResult === null) return;

    const {screenCoords, worldCoords} = matchResult;

    const initialModelViewTransform = estimateHomography({screenCoords, worldCoords, projectionTransform: this.projectionTransform});

    if (initialModelViewTransform === null) return;

    this.isTracking = true;
    this.tracker.detected(initialModelViewTransform);
  }

  track(input) {
    const updatedModelViewTransform = this.tracker.track(input);
    if (updatedModelViewTransform === null) {
      this.isTracking = false;
    }
    return updatedModelViewTransform;
  }

  dummyRun(input) {
    this.tracker.detected([[0,0,0,0], [0,0,0,0], [0,0,0,0]]);
    this.tracker.track(input);
  }
}

module.exports = {
  ImageTarget,
}
