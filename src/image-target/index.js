const {resize} = require("./utils/images.js");
const {buildImageList} = require('./image-list.js');
const {Matcher, compileMatching} = require('./matching/matcher.js');
const {Tracker, compileTracking} = require('./tracking/tracker.js');

class ImageTarget {
  constructor(options) {
    let imageList;
    let targetImage;
    let matchingData;
    let trackingData;

    if (options.type === 'compiled') {
      targetImage = options.input.targetImage;
      matchingData = options.input.matchingData;
      trackingData = options.input.trackingData;
      imageList = buildImageList(targetImage);
    } else {
      targetImage = options.input;
      imageList = buildImageList(targetImage);
      matchingData = compileMatching({imageList});
      trackingData = compileTracking({imageList});
    }
    console.log("image target consdtructor", imageList, matchingData, trackingData);
    this.matcher = new Matcher(matchingData);
    //this.tracker = new Tracker(imageList);
  }

  process(queryImage) {
    //const processImage = Object.assign(resize({image: queryImage, ratio: 0.5}), {dpi: 72});
    const processImage = Object.assign(resize({image: queryImage, ratio: 1}), {dpi: 72});
    const modelViewTransform = this.matcher.match(processImage);
    return modelViewTransform;
  }
}

const compile = (targetImage) => {
  const imageList = buildImageList(targetImage);
  const matchingData = compileMatching({imageList});
  const trackingData = compileTracking({imageList});
  return {targetImage, matchingData, trackingData};
}

module.exports = {
  ImageTarget,
  compile
}
