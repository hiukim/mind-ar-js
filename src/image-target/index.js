const {resize} = require("./utils/images.js");
const {buildImageList} = require('./image-list.js');
const {Matcher, compileMatching} = require('./matching/matcher.js');
const {Tracker, compileTracking} = require('./tracking2/tracker.js');
const {estimateHomography} = require('./icp/estimate_homography.js');
const {refineHomography} = require('./icp/refine_homography');

class ImageTarget {
  constructor(options) {
    const {type, input, projectionTransform, smartMatching} = options;
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

    this.smartMatching = smartMatching;
    this.projectionTransform = projectionTransform;
    this.matcher = new Matcher(matchingData);
    this.tracker = new Tracker(trackingData, imageList, projectionTransform);

    this.isTracking = false;
  }

  process(queryImage, featurePoints) {
    //const processImage = Object.assign(queryImage, {dpi: 72});
    const processImage = Object.assign(queryImage, {dpi: 1});

    if (!this.isTracking) {

      let matchProcessImage;
      if (this.smartMatching) { // use a cropped version of image to improve processing speed
        matchProcessImage = {
          width: processImage.width / 2,
          height: processImage.height / 2,
          data: new Uint8Array(processImage.width * processImage.height)
        };
        for (let i = 0; i < matchProcessImage.width; i++) {
          for (let j = 0; j < matchProcessImage.height; j++) {
            matchProcessImage.data[j * matchProcessImage.width + i] = processImage.data[processImage.width * (j + processImage.height/4) + (i + processImage.width/4)];
          }
        }
      } else {
        matchProcessImage = processImage;
      }
      //const matchResult = this.matcher.match(processImage);
      //const matchResult = this.matcher.match(matchProcessImage);
      const matchResult = this.matcher.matchDetection(featurePoints);

      //console.log("match result", matchResult);
      if (matchResult === null) return null;

      const {screenCoords, worldCoords} = matchResult;

      if (this.smartMatching) {
        for (let i = 0; i < screenCoords.length; i++) {
          screenCoords[i].x += processImage.width / 4;
          screenCoords[i].y += processImage.height / 4;
        }
      }

      const initialModelViewTransform = estimateHomography({screenCoords, worldCoords, projectionTransform: this.projectionTransform});
      console.log("initial matched model view transform", initialModelViewTransform);

      if (initialModelViewTransform === null) return null;
      //return initialModelViewTransform;

      // TODO: maybe don't this refineHomography. result seems worse when the detected size is big
      const {modelViewTransform: refinedModelViewTransform, err} = refineHomography({initialModelViewTransform, projectionTransform: this.projectionTransform, worldCoords, screenCoords});

      if (typeof window !== 'undefined' && window.DEBUG_MATCH) {
        console.log("refine err", err);
        console.log("refinedModelViewTransform", refinedModelViewTransform, window.debugMatch.camPose);
        if (!window.cmp2DArray(refinedModelViewTransform, window.debugMatch.camPose, 0.0001)) {
          console.log("INCORRECT ICP refinedModelViewTransform", refinedModelViewTransform, window.debugMatch.camPose);
        }
      }
      console.log("initial refined model view transform", refinedModelViewTransform);

      this.isTracking = true;
      this.tracker.detected(refinedModelViewTransform);
    }

    if (this.isTracking) {
      this.tracker.track(processImage);
    }

    const updatedModelViewTransform = this.tracker.getLatest();
    //console.log("tracking updated model view transform", updatedModelViewTransform);
    if (updatedModelViewTransform === null) {
      this.isTracking = false;
    }

    return updatedModelViewTransform;
    //return initialModelViewTransform;
    //return refinedModelViewTransform;
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
