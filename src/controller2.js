const {Engine} = require('./engine.js');

class Controller {
  constructor() {
  }

  setup(inputWidth, inputHeight) {
    this.engine = new Engine(inputWidth, inputHeight);
  }

  getProjectionMatrix() {
    return this.engine.getProjectionMatrix();
  }

  addImageTarget(options) {
    this.engine.addImageTarget(options);
  }

  process(queryImage) {
    return this.engine.process(queryImage);
  }
}

module.exports = {
  Controller,
}
