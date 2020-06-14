const {resize} = require("./utils/images.js");
const {buildImageList} = require('./image-list.js');
const {createMatcher} = require('./matching/matcher.js');

class ImageTarget {
  constructor(targetImage) {
    const imageList = buildImageList(targetImage);
    this.matcher = createMatcher(imageList);
  }

  process(queryImage) {
    const processImage = Object.assign(resize({image: queryImage, ratio: 0.5}), {dpi: 72});
    console.log("process", processImage);
    this.matcher.match(processImage);
  }
}

module.exports = {
  ImageTarget
}
