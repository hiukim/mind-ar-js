const {debugImageData} = require('../utils/debug.js');
const {upsampleBilinear, downsampleBilinear} = require('./utils');

const mLaplacianThreshold = 3;
const mMaxSubpixelDistanceSqr = 3 * 3;
const laplacianSqrThreshold = mLaplacianThreshold * mLaplacianThreshold;
const mEdgeThreshold = 4.0;
const hessianThreshold = ((mEdgeThreshold+1) * (mEdgeThreshold+1) / mEdgeThreshold);

// Detect minima and maximum in Laplacian images
const extractFeatures = (options) => {
  const {gaussianPyramid, dogPyramid} = options;
  //console.log("extract: ", gaussianPyramid, dogPyramid);

  const originalWidth = dogPyramid.images[0].width;
  const originalHeight = dogPyramid.images[0].height;

  const mK = Math.pow(2, 1.0 / (gaussianPyramid.numScalesPerOctaves-1));

  const featurePoints = [];
  const subPixelFeaturePoints = [];

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

    const width = image1.width;
    const height = image1.height;

    const neighbours = [
      0, -1, 1,
      -image1.width, -image1.width-1, -image1.width+1,
      image1.width, image1.width-1, image1.width+1
    ];

    // In upsample image, ignore the border
    // it's possible to further pad one more line (i.e. upsacale 2x2 -> 5x5) at the end, so ignore one more line
    let startI = hasUpsample? 2: 1;
    let startJ = startI;

    // should it be "image1.width -2" ? but this yield consistent result with artoolkit
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

        if (!isMax && !isMin) continue; // extrema -> feature point

        // original x = x*2^n + 2^(n-1) - 0.5
        // original y = y*2^n + 2^(n-1) - 0.5
        const originalX = i * Math.pow(2, octave) + Math.pow(2, octave-1) - 0.5;
        const originalY = j * Math.pow(2, octave) + Math.pow(2, octave-1) - 0.5;
        const sigma = _effectiveSigma({mK, scale, octave});

        featurePoints.push({
          octave: octave,
          scale: scale,
          score: v,
          x: originalX,
          y: originalY,
          sigma: sigma,
        })

        // Compute spatial derivatives
        const dx = 0.5 * (image1.imageData[pos + 1] - image1.imageData[pos - 1]);
        const dy = 0.5 * (image1.imageData[pos + width] - image1.imageData[pos - width]);
        const dxx = image1.imageData[pos + 1] + image1.imageData[pos - 1] - 2 * image1.imageData[pos];
        const dyy = image1.imageData[pos + width] + image1.imageData[pos - width] - 2 * image1.imageData[pos];
        const dxy = 0.25 * (image1.imageData[pos - width -1] + image1.imageData[pos + width + 1] - image1.imageData[pos - width +1] - image1.imageData[pos + width - 1]);

        // Compute scale derivates
        const ds = 0.5 * (image2.imageData[pos] - image0.imageData[pos]);
        const dss = image2.imageData[pos] + image0.imageData[pos] - 2 * image1.imageData[pos];
        const dxs = 0.25 * ((image0.imageData[pos-1] - image0.imageData[pos+1]) + (-image2.imageData[pos-1] + image2.imageData[pos+1]));
        const dys = 0.25 * ((image0.imageData[pos-width] - image0.imageData[pos+width]) + (-image2.imageData[pos-width] + image2.imageData[pos+width]));

        // Hessian matrix
        const hessian = [
          dxx, dxy, dxs,
          dxy, dyy, dys,
          dxs, dys, dss
        ];

        // b
        const b = [
          -dx,
          -dy,
          -ds
        ];

        // Solve H * u = b;
        const u = _solveSymmetric33({A: hessian, b: b});
        if (u === null) continue; // no solution

        // If points move too much in the sub-pixel update, then the point probably unstable.
        if (u[0] * u[0] + u[1] * u[1] > mMaxSubpixelDistanceSqr) continue;

        // compute edge score
        const det = (dxx * dyy) - (dxy * dxy);
        if (det === 0) continue;

        const edgeScore = (dxx + dyy) * (dxx + dyy) / det;
        if (Math.abs(edgeScore) >= hessianThreshold ) continue;

        const score = v - (b[0] * u[0] + b[1] * u[1] + b[2] * u[2]);
        if (score * score < laplacianSqrThreshold) continue;

        const newX = originalX + u[0] * Math.pow(2, octave);
        const newY = originalY + u[1] * Math.pow(2, octave);
        if (newX < 0 || newX >= originalWidth || newY < 0 || newY >= originalHeight) continue;

        const spScale = Math.min(Math.max(0, scale + u[2]), dogPyramid.numScalesPerOctaves);

        subPixelFeaturePoints.push({
          octave: octave,
          scale: scale,
          spScale: spScale,
          score: score,
          edgeScore: edgeScore,
          x: newX,
          y: newY,
          sigma: _effectiveSigma({scale: spScale, octave: octave, mK: mK})
        })
      }
    }
  }
  return {featurePoints, subPixelFeaturePoints};
}

const _effectiveSigma = (options) => {
  const {mK, scale, octave} = options;
  const sigma = Math.pow(mK, scale) * (1 << octave);
  return sigma;
}

// solve x = Ab, where A is symmetric
// [x0]   [A0 A1 A2] [b0]
// [x1] = [A3 A4 A5] [b1]
// [x2]   [A6 A7 A8] [b2]
const _solveSymmetric33 = (options) => {
  const {A, b} = options;

  const det = A[0] * A[4] * A[8]
            - A[0] * A[5] * A[5]
            - A[4] * A[2] * A[2]
            - A[8] * A[1] * A[1]
            + 2 * A[1] * A[2] * A[5];

  if ( Math.abs(det) < 0.0000001) return null; // determinant undefined. no solution

  const B = []; // inverse of A
  B[0] = A[4] * A[8] - A[5] * A[7];
  B[1] = A[2] * A[7] - A[1] * A[8];
  B[2] = A[1] * A[5] - A[2] * A[4];
  B[3] = A[5] * A[6] - A[3] * A[8];
  B[4] = A[0] * A[8] - A[2] * A[6];
  B[5] = A[2] * A[3] - A[0] * A[5];
  B[6] = A[3] * A[7] - A[4] * A[6];
  B[7] = A[1] * A[6] - A[0] * A[7];
  B[8] = A[0] * A[4] - A[1] * A[3];

  const x = [];
  x[0] = B[0] * b[0] + B[1] * b[1] + B[2] * b[2];
  x[1] = B[3] * b[0] + B[4] * b[1] + B[5] * b[2];
  x[2] = B[6] * b[0] + B[7] * b[1] + B[8] * b[2];

  x[0] = 1.0 * x[0] / det;
  x[1] = 1.0 * x[1] / det;
  x[2] = 1.0 * x[2] / det;

  return x;
}

module.exports = {
  extractFeatures
}
