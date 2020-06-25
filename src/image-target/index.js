const {resize} = require("./utils/images.js");
const {buildImageList} = require('./image-list.js');
const {Matcher, compileMatching} = require('./matching/matcher.js');
const {Tracker, compileTracking} = require('./tracking/tracker.js');
const {estimateHomography} = require('./icp/estimate_homography.js');

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
    //this.tracker = new Tracker(trackingData, imageList, projectionTransform);
  }

  process(queryImage) {
    //const processImage = Object.assign(resize({image: queryImage, ratio: 0.5}), {dpi: 72});
    //const processImage = Object.assign(resize({image: queryImage, ratio: 1}), {dpi: 72});
    const processImage = Object.assign(queryImage, {dpi: 72});

    const matchResult = this.matcher.match(processImage);
    console.log("match result", matchResult);
    if (matchResult === null) return null;

    const {screenCoords, worldCoords} = matchResult;
    const modelViewTransform = estimateHomography({screenCoords, worldCoords, projectionTransform: this.projectionTransform});
    console.log("initial matched model view transform", modelViewTransform);
    return modelViewTransform;

    if (modelViewTransform === null) return null;

    modelViewTransform = [ [ 0.9265531301498413,
      -0.3751317262649536,
      -0.027848180383443832,
      90.0240249633789 ],
    [ -0.3739980459213257,
      -0.9266232252120972,
      0.038663968443870544,
      181.0799102783203 ],
    [ -0.04030885174870491,
      -0.02540905401110649,
      -0.9988641142845154,
      457.211669921875 ] ];

    //modelViewTransform = this.tracker.track(modelViewTransform, processImage);
    //console.log("new model view transform", modelViewTransform);
    return modelViewTransform;
  }
}

const compile = (targetImage) => {
  const imageList = buildImageList(targetImage);

  var _start = new Date().getTime();
  //const trackingData = compileTracking({imageList});
  const trackingData = null;
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
