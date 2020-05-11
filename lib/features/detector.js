const {debugImageData} = require('../utils/debug.js');
const {upsampleBilinear, downsampleBilinear} = require('./utils');

const mLaplacianThreshold = 3;

// Detect minima and maximum in Laplacian images
const extractFeatures = (options) => {
  const {gaussianPyramid, dogPyramid} = options;
  //console.log("extract: ", gaussianPyramid, dogPyramid);

  const laplacianSqrThreshold = mLaplacianThreshold * mLaplacianThreshold;
  const mK = Math.pow(2, 1.0 / (gaussianPyramid.numScalesPerOctaves-1));

  const featurePoints = [];

  for (let k = 1; k < dogPyramid.images.length - 1; k++) {
    let image0 = dogPyramid.images[k-1];
    let image1 = dogPyramid.images[k];
    let image2 = dogPyramid.images[k+1];

    const octave = Math.floor(k / dogPyramid.numScalesPerOctaves);
    const scale = k % dogPyramid.numScalesPerOctaves;

    let hasUpsample = false;
    let hasPadOneWidth = false;
    let hasPadOneHeight = false;

    if ( Math.floor(image0.width/2) == image1.width) {
      image0 = downsampleBilinear(image0);
    }

    if ( Math.floor(image1.width/2) == image2.width) {
      hasUpsample = true;
      hasPadOneWidth = image1.width % 2 === 1;
      hasPadOneHeight = image1.height % 2 === 1;
      //debugImageData({filename: "./debug/upsample_"+image1.width + "_" + k + "_before.png", data: image2.imageData, height: image2.height, width: image2.width});
//
      image2 = upsampleBilinear({imageData: image2.imageData, width: image2.width, height: image2.height,
        padOneWidth: hasPadOneWidth,
        padOneHeight: hasPadOneHeight,
      });
      //debugImageData({filename: "./debug/upsample_"+image1.width + "_" + k + "_after.png", data: image2.imageData, height: image2.height, width: image2.width});
    }

    const neighbours = [
      0, -1, 1,
      -image1.width, -image1.width-1, -image1.width+1,
      image1.width, image1.width-1, image1.width+1
    ];

    // In upsample image, ignore the border
    // it's possible to further pad one more line (i.e. upsacale 2x2 -> 5x5) at the end, so ignore one more line
    let startI = hasUpsample? 2: 1;
    let startJ = startI;

    // should it be image1.width -2 ? but this yield consistent result with artoolkit
    let endI = hasUpsample? image1.width - 3: image1.width - 1;
    let endJ = hasUpsample? image1.height - 3: image1.height - 1;
    if (hasPadOneWidth) endI -= 1;
    if (hasPadOneHeight) endJ -= 1;
    //console.log("area: ", image1.width, image1.height, startI, startJ, endI, endJ);

    for (let j = startJ; j < endJ; j++) {
      for (let i = startI; i < endI; i++) {
        const pos = j*image1.width + i;
        const v = image1.imageData[pos];

        if (v*v < laplacianSqrThreshold) continue;

        let isMax = true;
        for (let d = 0; d < neighbours.length; d++) {
          if (v <= image0.imageData[pos+neighbours[d]]) {isMax = false; break};
          if (v <= image2.imageData[pos+neighbours[d]]) {isMax = false; break};
          if (d !== 0 && v <= image1.imageData[pos+neighbours[d]]) {isMax = false; break};
        }

        let isMin = true;
        for (let d = 0; d < neighbours.length; d++) {
          if (v >= image0.imageData[pos+neighbours[d]]) {isMin = false; break};
          if (v >= image2.imageData[pos+neighbours[d]]) {isMin = false; break};
          if (d !== 0 && v >= image1.imageData[pos+neighbours[d]]) {isMin = false; break};
        }

        if (isMax || isMin) { // extrema -> feature point
          // original x = x*2^n + 2^(n-1) - 0.5
          // original y = y*2^n + 2^(n-1) - 0.5
          const originalX = i * Math.pow(2, octave) + Math.pow(2, octave-1) - 0.5;
          const originalY = j * Math.pow(2, octave) + Math.pow(2, octave-1) - 0.5;
          const sigma = Math.pow(mK, scale) * (1 << octave);

          featurePoints.push({
            octave: octave,
            scale: scale,
            score: v,
            x: originalX,
            y: originalY,
            sigma: sigma,
          })
        }
      }
    }
  }
  return featurePoints;
}

module.exports = {
  extractFeatures
}
