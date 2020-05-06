const {Image} = require('image-js');
const path = require('path');

/*
 * Input image is in grey format. the imageData array size is width * height. value range from 0-255
 * pixel value at row r and c = imageData[r * width + c]
 *
 * @param {Uint8Array} options.imageData
 * @param {int} options.width image width
 * @param {int} options.height image height
 */
const extract = (options) => {
  const {imageData, width, height} = options;

  const image2Data = new Float32Array(imageData.length);
  for (let i = 0; i < width; i++) {
    image2Data[i] = -1;
    image2Data[width * (height-1) + i] = -1;
  }
  for (let j = 0; j < height; j++) {
    image2Data[j*width] = -1;
    image2Data[j*width + width-1] = -1;
  }

  for (let i = 1; i < width-1; i++) {
    for (let j = 1; j < height-1; j++) {
      let pos = i + width * j;

      let dx = 0.0;
      let dy = 0.0;
      for (let k = -1; k <= 1; k++) {
        dx += (imageData[pos + width*k + 1] - imageData[pos + width*k -1]);
        dy += (imageData[pos + width + k] - imageData[pos - width + k]);
      }
      dx /= (3 * 256);
      dy /= (3 * 256);
      image2Data[pos] = Math.sqrt( (dx * dx + dy * dy) / 2);
    }
  }

  //_debug1({filename: 'debug_' + width + '.png', width, height, data: image2Data});

  const hist = new Uint8Array(1000);
  for (let i = 0; i < 1000; i++) hist[i] = 0;
  const neighbourOffsets = [-1, 1, -width, width];
  let sum = 0;
  for (let i = 1; i < width-1; i++) {
    for (let j = 1; j < height-1; j++) {
      let pos = i + width * j;
      let isMax = true;
      for (let d = 0; d < neighbourOffsets.length; d++) {
        if (image2Data[pos] <= image2Data[pos + neighbourOffsets[d]]) {
          isMax = false;
          break;
        }
      }
      if (isMax) {
        let k = Math.floor(image2Data[pos] * 1000);
        if (k > 999) k = 999;
        if (k < 0) k = 0;
        hist[k] += 1;
        sum += 1;
      }
    }
  }

  let j = 0;
  let maxPoints = 0.02 * width * height;
  for (let i = 999; i >= 0; i--) {
    j += hist[i];
    if (j > maxPoints) break;
  }

  console.log("image size: ", width * height);
  console.log("extracted featues: ", sum);
  console.log("filtered featues: ", j);
}

const _debug1 = (options) => {
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
  extract
};
