const {resize} = require("./utils/images.js");

const MIN_IMAGE_PIXEL_SIZE = 100;

// Build a list of image {data, width, height, scale} with different scales
const buildImageList = (inputImage) => {
  const minScale = MIN_IMAGE_PIXEL_SIZE / Math.min(inputImage.width, inputImage.height);

  const scaleList = [];
  let c = minScale;
  while (true) {
    scaleList.push(c);
    c *= Math.pow(2.0, 1.0/3.0);
    if (c >= 0.95) {
      c = 1;
      break;
    }
  }
  scaleList.push(c);
  scaleList.reverse();

  const imageList = [];
  for (let i = 0; i < scaleList.length; i++) {
    const w = inputImage.width * scaleList[i];
    const h = inputImage.height * scaleList[i];
    imageList.push(Object.assign(resize({image: inputImage, ratio: scaleList[i]}), {scale: scaleList[i]}));
  }
  return imageList;
}

const buildTrackingImageList = (inputImage) => {
  const minDimension = Math.min(inputImage.width, inputImage.height);
  const scaleList = [];
  const imageList = [];
  scaleList.push( 256.0 / minDimension);
  scaleList.push( 128.0 / minDimension);
  for (let i = 0; i < scaleList.length; i++) {
    imageList.push(Object.assign(resize({image: inputImage, ratio: scaleList[i]}), {scale: scaleList[i]}));
  }
  return imageList;
}

module.exports = {
  buildImageList,
  buildTrackingImageList
}
