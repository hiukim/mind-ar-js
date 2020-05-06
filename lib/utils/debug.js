const {Image} = require('image-js');

const debugImageData = (options) => {
  const {filename, width, height, data} = options;
  const tmpData = new Uint8Array(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    tmpData[i*4 + 0] = data[i]*255;
    tmpData[i*4 + 1] = data[i]*255;
    tmpData[i*4 + 2] = data[i]*255;
    tmpData[i*4 + 3] = 255;
  }

  const tmpImage = new Image(width, height, tmpData);
  tmpImage.save(filename);
}

module.exports = {
  debugImageData
};
