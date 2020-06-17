const {compile} = require('./image-target/index.js');

const Utils = {
  compileImageTarget: (targetImage) => {
    return compile(targetImage);
  }
}

module.exports = {
  Utils
}
