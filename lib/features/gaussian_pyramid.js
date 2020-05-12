const {downsampleBilinear} = require('./utils');

// Build a gussian pyramid, with the following structure:
//
// pyramid = {
//   numOctaves,
//   numScalesPerOctaves,
//   images: [{imageData, width, height}, {}, {}] // image at octave i and scale j = images[i * numScalesPerOctaves + j]
// }

const build = (options) => {
  const {imageData, width, height, numScalesPerOctaves, minCoarseSize} = options;

  const numOctaves = _numOctaves({width, height, minSize: minCoarseSize});

  const pyramidImages = [];
  for (let i = 0; i < numOctaves; i++) {
    if (i === 0) {
      pyramidImages.push(_applyFilter({imageData: imageData, width: width, height: height}));
    } else {
      // first image of each octave, downsample from previous
      pyramidImages.push(downsampleBilinear(pyramidImages[pyramidImages.length-1]));
    }

    // remaining images of octave, 4th order binomail from previous
    for (let j = 0; j < numScalesPerOctaves - 1; j++) {
      if (j === 0) {
        pyramidImages.push(_applyFilter(pyramidImages[pyramidImages.length-1]));
      } else {
        // FIX ME?
        // in artoolkit, it apply filter twice....  is it a bug?
        pyramidImages.push(_applyFilter(_applyFilter(pyramidImages[pyramidImages.length-1])));
      }
    }
  }

  const pyramid = {
    numOctaves: numOctaves,
    numScalesPerOctaves: numScalesPerOctaves,
    images: pyramidImages
  }
  return pyramid;
}

const _numOctaves = (options) => {
  let {width, height, minSize} = options;
  let numOctaves = 0;
  while (width >= minSize && height >= minSize) {
    width /= 2;
    height /= 2;
    numOctaves++;
  }
  return numOctaves;
}

//4th order binomial
const _applyFilter = (options) => {
  const {imageData, width, height} = options;
  if (width < 5) {console.log("image too small"); return;}
  if (height < 5) {console.log("image too small"); return;}

  const temp = new Float32Array(imageData.length);

  // apply horizontal filter. border is computed by extending border pixel
  for (let j = 0; j < height; j++) {
    for (let i = 0; i < width; i++) {
      const pos = j * width + i;

      temp[pos] = imageData[j*width + Math.max(i-2,0)] +
                  imageData[j*width + Math.max(i-1,0)] * 4 +
                  imageData[j*width + i] * 6 +
                  imageData[j*width + Math.min(i+1,width-1)] * 4 +
                  imageData[j*width + Math.min(i+2,width-1)];
    }
  }

  const dst = new Float32Array(imageData.length);
  // apply vertical filter. border is computed by extending border pixel
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const pos = j * width + i;

      dst[pos] = temp[Math.max(j-2,0) * width + i] +
                 temp[Math.max(j-1,0) * width + i] * 4 +
                 temp[j * width + i] * 6 +
                 temp[Math.min(j+1,height-1) * width + i] * 4 +
                 temp[Math.min(j+2,height-1) * width + i];

      // average of (1+4+6+4+1) * (1+4+6+4+1) = 256 numbers
      dst[pos] = dst[pos] / 256.0;
    }
  }
  return {imageData: dst, width: width, height: height};
};

module.exports = {
  build
};
