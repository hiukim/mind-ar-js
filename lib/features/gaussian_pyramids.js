const kMinCoarseSize = 8;
const NUM_SCALES_PER_OCTAVES = 3;

const build = (options) => {
  const {imageData, width, height} = options;

  const numOctaves = _numOctaves({width, height, minSize: kMinCoarseSize});
  console.log("num octaves: ", numOctaves);

  const pyramids = [];
  for (let i = 0; i < numOctaves; i++) {
    if (i === 0) {
      pyramids.push(_applyFilter({imageData: imageData, width: width, height: height}));
    } else {
      // first image of each octave, downsample from previous
      pyramids.push(_downsampleBilinear(pyramids[pyramids.length-1]));
    }

    // remaining images of octave, 4th order binomail from previous
    for (let j = 0; j < NUM_SCALES_PER_OCTAVES - 1; j++) {
      if (j === 0) {
        pyramids.push(_applyFilter(pyramids[pyramids.length-1]));
      } else {
        // in artoolkit, it apply filter twice....  is it a bug?
        pyramids.push(_applyFilter(_applyFilter(pyramids[pyramids.length-1])));
      }
    }
  }
  return pyramids;
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


const _downsampleBilinear = (options) => {
  const {imageData, width, height} = options;

  const dstWidth = Math.floor(width / 2);
  const dstHeight = Math.floor(height / 2);

  const temp = new Float32Array(dstWidth * dstHeight);
  const offsets = [0, 1, width, width+1];
  for (let j = 0; j < dstHeight; j++) {
    for (let i = 0; i < dstWidth; i++) {
      let srcPos = j*2 * width + i*2;

      let value = 0.0;
      for (let d = 0; d < offsets.length; d++) {
        value += imageData[srcPos+ offsets[d]];
      }
      value *= 0.25;
      temp[j*dstWidth+i] = value;
    }
  }
  return {imageData: temp, width: dstWidth, height: dstHeight};
}

module.exports = {
  build
};
