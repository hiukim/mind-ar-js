const {ImageTarget} = require('./image-target/index.js');

class Controller {
  constructor() {
    this._imageTargets = [];
  }

  addImageTarget(inputImage) {
    const imageTarget = new ImageTarget(inputImage);
    this._imageTargets.push(imageTarget);
  }

  process(queryImage) {
    this._imageTargets.forEach((imageTarget) => {
      imageTarget.process(queryImage);
    });
  }
}

module.exports = {
  Controller,
}
