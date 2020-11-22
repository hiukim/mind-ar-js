const {downsampleBilinear} = require('../utils/images.js');

// Build a gussian pyramid, with the following structure:
//
// pyramid = {
//   numOctaves,
//   numScalesPerOctaves,
//   images: [{data, width, height}, {}, {}] // image at octave i and scale j = images[i * numScalesPerOctaves + j]
// }

const build = ({image, numScalesPerOctaves, minSize}) => {
  const {data, width, height} = image;

  const numOctaves = _numOctaves({width, height, minSize: minSize});

  if (typeof window !== 'undefined' && window.DEBUG_TIME) {
    var _start = new Date().getTime();
  }

  const pyramidImages = [];
  for (let i = 0; i < numOctaves; i++) {
    if (i === 0) {
      pyramidImages.push(_applyFilter(image));
    } else {
      // first image of each octave, downsample from previous
      pyramidImages.push(downsampleBilinear({image: pyramidImages[pyramidImages.length-1]}));
    }

    if (typeof window !== 'undefined' && window.DEBUG_TIME) {
      console.log('exec time Gaussian', i, 0, new Date().getTime() - _start);
    }

    // remaining images of octave, 4th order binomail from previous
    for (let j = 0; j < numScalesPerOctaves - 1; j++) {
      if (j === 0) {
        pyramidImages.push(_applyFilter(pyramidImages[pyramidImages.length-1]));
      } else {
        // in artoolkit, it apply filter twice....  is it a bug?
        //pyramidImages.push(_applyFilter(_applyFilter(pyramidImages[pyramidImages.length-1])));
        pyramidImages.push(_applyFilter(pyramidImages[pyramidImages.length-1]));
      }

      if (typeof window !== 'undefined' && window.DEBUG_TIME) {
        console.log('exec time Gaussian', i, j, new Date().getTime() - _start);
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
const _applyFilter = (image) => {
  const {data, width, height} = image;

  //if (width < 5) {console.log("image too small"); return;}
  //if (height < 5) {console.log("image too small"); return;}

  const temp = new Float32Array(data.length);

  // apply horizontal filter. border is computed by extending border pixel
  for (let j = 0; j < height; j++) {
    const joffset = j * width;
    for (let i = 0; i < width; i++) {
      const pos = joffset+ i;

      temp[pos] = (i >= 2? data[joffset + (i-2)]: 0) +
                  (i >= 1? data[joffset + (i-1)] * 4: 0) +
                  data[joffset + i] * 6 +
                  (i <= width-2? data[joffset + (i+1)] * 4: 0) +
                  (i <= width-3? data[joffset + (i+2)]: 0);
      //temp[pos] = data[joffset + Math.max(i-2,0)] +
      //            data[joffset + Math.max(i-1,0)] * 4 +
      //            data[joffset + i] * 6 +
      //            data[joffset + Math.min(i+1,width-1)] * 4 +
      //            data[joffset + Math.min(i+2,width-1)];
    }
  }


  const dst = new Float32Array(data.length);
  // apply vertical filter. border is computed by extending border pixel
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const pos = j * width + i;

      dst[pos] = (j >= 2? temp[(j-2) * width + i]: 0) +
                 (j >= 1? temp[(j-1) * width + i] * 4: 0) +
                 temp[j * width + i] * 6 +
                 (j <= height-2? temp[(j+1) * width + i] * 4: 0) +
                 (j <= height-3? temp[(j+2) * width + i]: 0);

      //dst[pos] = temp[Math.max(j-2,0) * width + i] +
      //           temp[Math.max(j-1,0) * width + i] * 4 +
      //           temp[j * width + i] * 6 +
      //           temp[Math.min(j+1,height-1) * width + i] * 4 +
      //           temp[Math.min(j+2,height-1) * width + i];

      // average of (1+4+6+4+1) * (1+4+6+4+1) = 256 numbers
      dst[pos] = dst[pos] / 256.0;
    }
  }
  return {data: dst, width: width, height: height};
};

module.exports = {
  build
};
