const {resize} = require("./utils/images.js");
const {buildImageList} = require('./image-list.js');
const {createMatcher} = require('./matching/matcher.js');

class ImageTarget {
  constructor(targetImage) {
    const imageList = buildImageList(targetImage);
    this.matcher = createMatcher(imageList);
  }

  process(queryImage) {
    //const processImage = Object.assign(resize({image: queryImage, ratio: 0.5}), {dpi: 72});
    const processImage = Object.assign(resize({image: queryImage, ratio: 1}), {dpi: 72});
    const modelViewTransform = this.matcher.match(processImage);
    return modelViewTransform;
  }
}

module.exports = {
  ImageTarget
}
