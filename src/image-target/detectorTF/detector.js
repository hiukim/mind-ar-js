//import * as tfc from '@tensorflow/tfjs-core';
const tf = require('@tensorflow/tfjs');
const PYRAMID_NUM_SCALES_PER_OCTAVES = 3;
const PYRAMID_MIN_SIZE = 8;

const LAPLACIAN_THRESHOLD = 3;
const LAPLACIAN_SQR_THRESHOLD = LAPLACIAN_THRESHOLD * LAPLACIAN_THRESHOLD;
const MAX_SUBPIXEL_DISTANCE_SQR = 3 * 3;
const EDGE_THRESHOLD = 4.0;
const EDGE_HESSIAN_THRESHOLD = ((EDGE_THRESHOLD+1) * (EDGE_THRESHOLD+1) / EDGE_THRESHOLD);

const NUM_BUCKETS_PER_DIMENSION = 10;
const MAX_FEATURES_PER_BUCKET = 5;
//const NUM_BUCKETS_PER_DIMENSION = 20;
//const MAX_FEATURES_PER_BUCKET = 1;
const NUM_BUCKETS = NUM_BUCKETS_PER_DIMENSION * NUM_BUCKETS_PER_DIMENSION;
// total max feature points = NUM_BUCKETS * MAX_FEATURES_PER_BUCKET

const ORIENTATION_NUM_BINS = 36;
const ORIENTATION_SMOOTHING_ITERATIONS = 5;

const ORIENTATION_GAUSSIAN_EXPANSION_FACTOR = 3.0;
const ORIENTATION_REGION_EXPANSION_FACTOR = 1.5;
const FREAK_EXPANSION_FACTOR = 7.0;

// 37 points = 6 rings x 6 points per ring + 1 center
const FREAK_RINGS = [
  // ring 5
  {
    sigma: 0.550000,
    points: [
      [-1.000000, 0.000000],
      [-0.500000, -0.866025],
      [0.500000, -0.866025],
      [1.000000, -0.000000],
      [0.500000, 0.866025],
      [-0.500000, 0.866025]
    ]
  },
  // ring 4
  {
    sigma: 0.475000,
    points: [
      [0.000000, 0.930969],
      [-0.806243, 0.465485],
      [-0.806243, -0.465485],
      [-0.000000, -0.930969],
      [0.806243, -0.465485],
      [0.806243, 0.465485]
    ]
  },
  // ring 3
  {
    sigma: 0.400000,
    points: [
      [0.847306, -0.000000],
      [0.423653, 0.733789],
      [-0.423653, 0.733789],
      [-0.847306, 0.000000],
      [-0.423653, -0.733789],
      [0.423653, -0.733789]
    ]
  },
  // ring 2
  {
    sigma: 0.325000,
    points: [
      [-0.000000, -0.741094],
      [0.641806, -0.370547],
      [0.641806, 0.370547],
      [0.000000, 0.741094],
      [-0.641806, 0.370547],
      [-0.641806, -0.370547]
    ]
  },
  // ring 1
  {
    sigma: 0.250000,
    points: [
      [-0.595502, 0.000000],
      [-0.297751, -0.515720],
      [0.297751, -0.515720],
      [0.595502, -0.000000],
      [0.297751, 0.515720],
      [-0.297751, 0.515720]
    ]
  },
  // ring 0
  {
    sigma: 0.175000,
    points: [
      [0.000000, 0.362783],
      [-0.314179, 0.181391],
      [-0.314179, -0.181391],
      [-0.000000, -0.362783],
      [0.314179, -0.181391],
      [0.314179, 0.181391]
    ]
  },
  // center
  {
    sigma: 0.100000,
    points: [
      [0, 0]
    ]
  }
];

const FREAKPOINTS = [];
for (let r = 0; r < FREAK_RINGS.length; r++) {
  const sigma = FREAK_RINGS[r].sigma;
  for (let i = 0; i < FREAK_RINGS[r].points.length; i++) {
    const point = FREAK_RINGS[r].points[i];
    FREAKPOINTS.push([sigma, point[0], point[1]]);
  }
}

const FREAK_CONPARISON_COUNT = (FREAKPOINTS.length-1) * (FREAKPOINTS.length) / 2; // 666

class Detector {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.cache = {};

    let numOctaves = 0;
    while (width >= PYRAMID_MIN_SIZE && height >= PYRAMID_MIN_SIZE) {
      width /= 2;
      height /= 2;
      numOctaves++;
    }
    this.numOctaves = numOctaves;

    this.tensorCaches = {};

    //globalDebug.tf = tf;
  }

  detectImageData(imageData) {
    const arr = new Uint8ClampedArray(4 * imageData.length);
    for (let i = 0; i < imageData.length; i++) {
      arr[4*i] = imageData[i];
      arr[4*i+1] = imageData[i];
      arr[4*i+2] = imageData[i];
      arr[4*i+3] = 255;
    }
    const img = new ImageData(arr, this.width, this.height);
    return this.detect(img);
  }

  detect(input) {
    const inputImageT = this._loadInput(input);

    const featurePoints = [];

    // Build gaussian pyramid images
    const pyramidImagesT = [];
    for (let i = 0; i < this.numOctaves; i++) {
      if (i === 0) {
        pyramidImagesT.push(this._applyFilter(inputImageT));
      } else {
        pyramidImagesT.push(this._downsampleBilinear(pyramidImagesT[pyramidImagesT.length-1]));
      }
      for (let j = 0; j < PYRAMID_NUM_SCALES_PER_OCTAVES - 1; j++) {
        pyramidImagesT.push(this._applyFilter(pyramidImagesT[pyramidImagesT.length-1]));
      }
    }

    // Build difference of gaussian pyramid
    const dogPyramidImagesT = [];
    for (let i = 0; i < this.numOctaves; i++) {
      for (let j = 0; j < PYRAMID_NUM_SCALES_PER_OCTAVES - 1; j++) {
        if (i === 0 && j === 0) {
          dogPyramidImagesT.push(null); // the first dog image is never used, so skip to save memory
          continue;
        }
        const image1T = pyramidImagesT[i * PYRAMID_NUM_SCALES_PER_OCTAVES + j];
        const image2T = pyramidImagesT[i * PYRAMID_NUM_SCALES_PER_OCTAVES + j + 1];
        dogPyramidImagesT.push(this._differenceImageBinomial(image1T, image2T));
      }
    }

    const dogIndexes = [];
    const extremasResults = [];
    // Find feature points (i.e. extremas in dog images)
    for (let k = 1; k < dogPyramidImagesT.length - 1; k++) {
      // Experimental result shows that no extrema is possible for odd number of k
      // I believe it has something to do with how the gaussian pyramid being constructed
      if (k % 2 === 1) continue;

      dogIndexes.push(k);

      let image0 = dogPyramidImagesT[k-1];
      let image1 = dogPyramidImagesT[k];
      let image2 = dogPyramidImagesT[k+1];

      // find all extrema for image1
      const extremasResult = this._buildExtremas(k, image0, image1, image2);
      extremasResults.push(extremasResult);
    }

    const prunedExtremas = this._applyPrune(extremasResults, dogIndexes);
    const extremaHistograms = this._computeOrientationHistograms(prunedExtremas, pyramidImagesT, dogIndexes);

    const smoothedHistograms = this._smoothHistograms(extremaHistograms);
    const extremaAngles = this._computeExtremaAngles(smoothedHistograms);
    //const extremaFreaks = this._computeExtremaFreak(pyramidImagesT, this.numOctaves, prunedExtremas, extremaAngles, dogIndexes);
    const extremaFreaks = this._computeExtremaFreakOld(pyramidImagesT, this.numOctaves, prunedExtremas, extremaAngles, dogIndexes);

    const freakDescriptors = this._computeFreakDescriptors(extremaFreaks);
    //const encodedDescriptors = this._encodeDescriptors(freakDescriptors);
    const combinedExtremas = this._combine(prunedExtremas, freakDescriptors);
    const combinedExtremasArr = combinedExtremas.arraySync();

    if(typeof inputImageT !== 'undefined') inputImageT.dispose();
    if(typeof pyramidImagesT !== 'undefined') pyramidImagesT.forEach((t) => t.dispose());
    if(typeof dogPyramidImagesT !== 'undefined') dogPyramidImagesT.forEach((t) => t && t.dispose());
    if(typeof extremasResults !== 'undefined') extremasResults.forEach((t) => t.dispose());
    if (typeof prunedExtremas !== 'undefined') {
      prunedExtremas.score.dispose();
      prunedExtremas.dogIndex.dispose();
      prunedExtremas.sigma.dispose();
      prunedExtremas.yx.dispose();
      prunedExtremas.originalX.dispose();
      prunedExtremas.originalY.dispose();
    }
    if(typeof extremaHistograms !== 'undefined') extremaHistograms.dispose();

    if(typeof smoothedHistograms !== 'undefined') smoothedHistograms.dispose();
    if(typeof extremaAngles !== 'undefined') extremaAngles.dispose();
    if(typeof extremaFreaks !== 'undefined') extremaFreaks.dispose();
    if(typeof freakDescriptors !== 'undefined') freakDescriptors.dispose();
    if(typeof combinedExtremas !== 'undefined') combinedExtremas.dispose();
    console.log(tf.memory().numTensors);
    //return [];

    for (let i = 0; i < combinedExtremasArr.length; i++) {
      for (let j = 0; j < combinedExtremasArr[i].length; j++) {
        if (combinedExtremasArr[i][j][0] !== 0) {
          const ext = combinedExtremasArr[i][j];

          const desc = ext.slice(3);
          // encode descriptors in binary format
          // 37 samples = 1+2+3+...+36 = 666 comparisons = 666 bits
          // ceil(666/32) = 21 (32 bits number)
          const descriptors = [];
          let temp = 0;
          let count = 0;
          for (let m = 0; m < desc.length; m++) {
            if (desc[m]) temp += 1;
            count += 1;
            if (count === 32) {
              descriptors.push(temp);
              temp = 0;
              count = 0;
            } else {
              temp = temp * 2;
            }
          }
          descriptors.push(temp);

          featurePoints.push({
            maxima: ext[0] > 0,
            x: ext[1],
            y: ext[2],
            descriptors: descriptors
          });
        }
      }
    }
    //console.table(tf.memory());
    return featurePoints;
  }

  _loadInput(input) {
    return tf.tidy(() => {
      let inputImage = tf.browser.fromPixels(input);
      inputImage = inputImage.mean(2).expandDims(2).expandDims(0);
      return inputImage;
    });
  }

  _combine(prunedExtremas, freakDescriptors) {
    return tf.tidy(() => {
      const combined = tf.concat([prunedExtremas.score.expandDims(2), prunedExtremas.originalX.expandDims(2), prunedExtremas.originalY.expandDims(2), freakDescriptors], 2);
      return combined;
    })
  }

  // Due to precision issue. webgl seems to store values in float32
  // When we encode the bits into int32 integers, there are a few bits off.
  // Any fix? If this can be fix, could probably help performance
  _encodeDescriptors(extremaFreaks) {
    // tensorflow use 32 bit signed int type, not able to sum 2^31 + 2^30 + ... + 2^0
    // We do a little trick by storing the first bit as negative
    //  i.e.   (-1 * 2^31) + 2 ^ 30 + .... + 2^0
    //  when returned to CPU, a negative number means the first bit is negative, so we can add back (2 * 2^31)

    // encode descriptors in binary format
    // 37 samples = 1+2+3+...+36 = 666 comparisons = 666 bits
    // ceil(666/32) = 21 (32 bits number)
    return tf.tidy(() => {
      const nComparisons = extremaFreaks.shape[2]; // 666
      const totalNumber = Math.ceil(nComparisons / 32);  // 21
      const totalBits = totalNumber * 32; // 672
      const pad = totalBits - nComparisons; // 6

      if (!this.tensorCaches.encodeDescriptors) {
        const multiplier = [];
        for (let i = 0; i < totalBits; i++) {
          let index = 31 - (i % 32);

          if (i >= (totalNumber-1) * 32) { // legacy reason, for the last number, store with the least significant bits
            index -= pad;
          }

          if (index >= 0) {
            let m = Math.pow(2, index);
            if (index === 31) m = -m;
            multiplier.push(m)
          } else {
            multiplier.push(0)
          }
        }
        const multiplierT = tf.tensor(multiplier, [totalBits], 'int32');

        this.tensorCaches.encodeDescriptors = {
          multiplierT: tf.keep(multiplierT),
        }
      }
      const {multiplierT} = this.tensorCaches.encodeDescriptors;
      const expandedFreaks = extremaFreaks.pad([[0,0],[0,0],[0,pad]]).cast('int32');
      let combined = expandedFreaks.mul(multiplierT);

      let reshapedCombine =  combined.reshape([combined.shape[0], combined.shape[1], totalNumber, 32]);
      const encoded = reshapedCombine.sum(3);
      return encoded;
    })
  }

  _computeFreakDescriptors(extremaFreaks) {
    return tf.tidy(() => {
      if (!this.tensorCaches.freakDescriptors) {
        const indices1 = [];
        const indices2 = [];
        for (let j = 0; j < extremaFreaks.shape[0]; j++) {
          const row1 = [];
          const row2 = [];
          for (let i = 0; i < extremaFreaks.shape[1]; i++) {
            const col1 = [];
            const col2 = [];

            for (let k1 = 0; k1 < extremaFreaks.shape[2]; k1++) {
              for (let k2 = k1+1; k2 < extremaFreaks.shape[2]; k2++) {
                col1.push([j, i, k1]);
                col2.push([j, i, k2]);
              }
            }
            row1.push(col1);
            row2.push(col2);
          }
          indices1.push(row1);
          indices2.push(row2);
        }
        const in1 = tf.tensor(indices1).cast('int32');
        const in2 = tf.tensor(indices2).cast('int32');

        this.tensorCaches.freakDescriptors = {
          in1: tf.keep(in1),
          in2: tf.keep(in2),
        }
      }

      const {in1, in2} = this.tensorCaches.freakDescriptors;

      const freakDescriptors = tf.gatherND(extremaFreaks, in1).less(tf.gatherND(extremaFreaks, in2).add(0.01));
      return freakDescriptors;
    })
  }

  _computeExtremaFreak(pyramidImagesT, gaussianNumOctaves, prunedExtremas, prunedExtremasAngles, dogIndexes) {
    return tf.tidy(() => {
      const nBuckets = prunedExtremas.dogIndex.shape[0];
      const nFeatures = prunedExtremas.dogIndex.shape[1];
      const nFreaks = FREAKPOINTS.length;

      if (!this.tensorCaches.extremaFreak) {
        const freakPoints = tf.tensor(FREAKPOINTS);
        let [freakSigma, freakX, freakY] = tf.unstack(freakPoints, 1);
        freakX = freakX.broadcastTo([...prunedExtremasAngles.shape, ...freakX.shape]);
        freakY = freakY.broadcastTo([...prunedExtremasAngles.shape, ...freakY.shape]);
        this.tensorCaches.extremaFreak = {
          freakX: tf.keep(freakX),
          freakY: tf.keep(freakY),
        }
      }

      const freakX = this.tensorCaches.extremaFreak.freakX;
      const freakY = this.tensorCaches.extremaFreak.freakY;

      const inputX = prunedExtremas.originalX.expandDims(2);
      const inputY = prunedExtremas.originalY.expandDims(2);
      const inputSigma = prunedExtremas.sigma.expandDims(2);
      const inputAngle = prunedExtremasAngles.expandDims(2);

      const expansionFactor = FREAK_EXPANSION_FACTOR;
      const transformScale = inputSigma.mul(expansionFactor); // sigma = 2 ^ octave >=2, so clipping won't happen
      const cos = transformScale.mul(inputAngle.cos());
      const sin = transformScale.mul(inputAngle.sin());

      // compute freak point locations according to orientation angle
      let x = inputX.add(freakX.mul(cos)).add(freakY.mul(sin.neg()));
      let y = inputY.add(freakX.mul(sin)).add(freakY.mul(cos));

      const octave = tf.floorDiv(prunedExtremas.dogIndex, PYRAMID_NUM_SCALES_PER_OCTAVES-1).expandDims(2).tile([1,1,nFreaks]);
      const scale = tf.mod(prunedExtremas.dogIndex, PYRAMID_NUM_SCALES_PER_OCTAVES-1).expandDims(2).tile([1,1,nFreaks]);

      // downsample point back to octave
      const a = tf.onesLike(octave).div( tf.fill(octave.shape,2).pow(octave));
      const b = tf.fill(octave.shape, 0.5).mul(a).sub(0.5);
      x = x.mul(a).add(b); // x in octave
      y = y.mul(a).add(b); // y in octave

      x = x.expandDims(3);
      y = y.expandDims(3);

      // four neighbour points
      let x0 = tf.floor(x).cast('int32');
      let x1 = x0.add(1);
      let y0 = tf.floor(y).cast('int32');
      let y1 = y0.add(1);

      // ratio for interpolation between four neighbouring points
      const ratio1 = x1.sub(x).mul(y1.sub(y));
      const ratio2 = x.sub(x0).mul(y1.sub(y));
      const ratio3 = x1.sub(x).mul(y.sub(y0));
      const ratio4 = x.sub(x0).mul(y.sub(y0));
      const ratios = tf.concat([ratio1, ratio2, ratio3, ratio4], 3);

      // combine four neighobur points
      const yx = tf.concat([y0, x0, y0, x1, y1, x0, y1, x1], 3).reshape([nBuckets, nFeatures, nFreaks, 4, 2]);
      x0 = x0.squeeze();
      y0 = y0.squeeze();

      const expandedDogIndexes = prunedExtremas.dogIndex.expandDims(2).tile([1,1,nFreaks]);

      // loop each gaussian image and grab relevant pixels
      let combinedPixels = tf.zeros([nBuckets, nFeatures, nFreaks, 4]);
      for (let d = 0; d < dogIndexes.length; d++) {
        const dogIndex = dogIndexes[d];
        const octave2 = Math.floor(dogIndex / (PYRAMID_NUM_SCALES_PER_OCTAVES-1));
        const scale2 = dogIndex % (PYRAMID_NUM_SCALES_PER_OCTAVES-1) + 1;

        const gaussianIndex = octave2 * PYRAMID_NUM_SCALES_PER_OCTAVES + scale2;
        const gaussianImageSqueezed = pyramidImagesT[gaussianIndex].squeeze();
        let pixels = tf.gatherND(gaussianImageSqueezed, yx);

        // extrema dogIndex is correct and x, y within boundary
        let valid = expandedDogIndexes.equal(dogIndex)
                  .logicalAnd(y0.greaterEqual(0))
                  .logicalAnd(y0.less(gaussianImageSqueezed.shape[0]-1))
                  .logicalAnd(x0.greaterEqual(0))
                  .logicalAnd(x0.less(gaussianImageSqueezed.shape[1]-1));
        pixels = tf.where(valid.expandDims(3).tile([1,1,1,pixels.shape[3]]), pixels, 0);
        combinedPixels = combinedPixels.add(pixels);
      }

      const freakValues = combinedPixels.mul(ratios).sum(3);
      return freakValues;
    })
  }

  _computeExtremaFreakOld(pyramidImagesT, gaussianNumOctaves, prunedExtremas, prunedExtremasAngles) {
    return tf.tidy(() => {
      const freakPoints = tf.tensor(FREAKPOINTS);
      let [freakSigma, freakX, freakY] = tf.unstack(freakPoints, 1);
      freakX = freakX.broadcastTo([...prunedExtremasAngles.shape, ...freakX.shape]);
      freakY = freakY.broadcastTo([...prunedExtremasAngles.shape, ...freakY.shape]);
      freakSigma = freakSigma.broadcastTo([...prunedExtremasAngles.shape, ...freakSigma.shape]);

      const inputX = prunedExtremas.originalX.expandDims(2);
      const inputY = prunedExtremas.originalY.expandDims(2);
      const inputSigma = prunedExtremas.sigma.expandDims(2);
      const inputAngle = prunedExtremasAngles.expandDims(2);

      //console.log("input sigma", prunedExtremas.sigma.arraySync());

      const expansionFactor = FREAK_EXPANSION_FACTOR;
      //const transformScale = tf.clipByValue(inputSigma.mul(expansionFactor), 1, 10000); // no uppwer limit
      const transformScale = inputSigma.mul(expansionFactor); // sigma = 2 ^ octave >=2, so clipping won't happen
      const c = transformScale.mul(inputAngle.cos());
      const s = transformScale.mul(inputAngle.sin());

      const S0 = c;
      const S1 = s.neg();
      const S2 = inputX;
      const S3 = s;
      const S4 = c;
      const S5 = inputY;
      const sigma = transformScale.mul(freakSigma);

      const gaussianNumScalesPerOctaves = PYRAMID_NUM_SCALES_PER_OCTAVES;
      const mK = Math.pow(2, 1.0 / (gaussianNumScalesPerOctaves-1));
      const oneOverLogK = 1.0 / Math.log(mK);

      // log2(x)=ln(x)/ln(2).
      let octave = tf.floor(tf.log(sigma).div(Math.log(2)));
      //console.log("octave", octave.arraySync());
      const fscale = tf.log(sigma.div(tf.pow(tf.fill(octave.shape, 2), octave))).mul(oneOverLogK);
      let scale = tf.round(fscale);
      //console.log("scale", scale.arraySync());

      // sgima of last scale = sigma of the first scale in next octave
      // prefer coarser octaves for efficiency
      octave = tf.where(scale.equal(gaussianNumScalesPerOctaves-1), octave.add(1), octave);
      scale = tf.where(scale.equal(gaussianNumScalesPerOctaves-1), 0, scale);

      // clip octave and scale
      scale = tf.where(octave.less(0), 0, scale);
      octave = tf.where(octave.less(0), 0, octave);
      scale = tf.where(octave.greaterEqual(gaussianNumOctaves), gaussianNumScalesPerOctaves-1, scale);
      octave = tf.where(octave.greaterEqual(gaussianNumOctaves), gaussianNumOctaves-1, octave);

      // for downsample point
      const imageIndex = octave.mul(gaussianNumScalesPerOctaves).add(scale);
      const a = tf.onesLike(octave).div( tf.fill(octave.shape,2).pow(octave) );
      const b = tf.fill(octave.shape, 0.5).mul(a).sub(0.5);

      let xp = S0.mul(freakX).add(S1.mul(freakY)).add(S2);
      xp = xp.mul(a).add(b); // x in octave
      let yp = S3.mul(freakX).add(S4.mul(freakY)).add(S5);
      yp = yp.mul(a).add(b); // y in octave

      let paddedPyramidImages = [];
      let pyramidImageShapes = [];
      for (let i = 0; i < pyramidImagesT.length; i++) {
        let d1Diff = pyramidImagesT[0].shape[1] - pyramidImagesT[i].shape[1];
        let d2Diff = pyramidImagesT[0].shape[2] - pyramidImagesT[i].shape[2];
        pyramidImageShapes.push(tf.tensor([pyramidImagesT[i].shape[1], pyramidImagesT[i].shape[2]]));
        paddedPyramidImages.push(pyramidImagesT[i].squeeze().pad([[0, d1Diff], [0, d2Diff]]));
      }
      let allPyramidImages = tf.stack(paddedPyramidImages, 0);
      let allPyramidImageShapes = tf.stack(pyramidImageShapes, 0);

      const maxY = tf.gatherND(allPyramidImageShapes, tf.stack([imageIndex, tf.fill(imageIndex.shape, 0)], 3).cast('int32'));
      const maxX = tf.gatherND(allPyramidImageShapes, tf.stack([imageIndex, tf.fill(imageIndex.shape, 1)], 3).cast('int32'));

      // bilinear interpolation
      //yp = yp.clipByValue(0, pyramidImagesT[0].shape[1]-2); // TODO. fix: the max clip value should depend on imageIndex
      //xp = xp.clipByValue(0, pyramidImagesT[0].shape[2]-2);
      const x0 = tf.floor(xp);
      const x1 = x0.add(1);
      const y0 = tf.floor(yp);
      const y1 = y0.add(1);

      let valid = x0.greaterEqual(0).logicalAnd(x0.less(maxX.sub(1)));
      valid = valid.logicalAnd(y0.greaterEqual(0)).logicalAnd(y0.less(maxY.sub(1)));

      const indices1 = tf.stack([imageIndex, y0, x0], 3).cast('int32');
      const indices2 = tf.stack([imageIndex, y0, x1], 3).cast('int32');
      const indices3 = tf.stack([imageIndex, y1, x0], 3).cast('int32');
      const indices4 = tf.stack([imageIndex, y1, x1], 3).cast('int32');
      const freakValues1 = tf.gatherND(allPyramidImages, indices1);
      const freakValues2 = tf.gatherND(allPyramidImages, indices2);
      const freakValues3 = tf.gatherND(allPyramidImages, indices3);
      const freakValues4 = tf.gatherND(allPyramidImages, indices4);

      let freakValues = x1.sub(xp).mul(y1.sub(yp)).mul(freakValues1)
                     .add(xp.sub(x0).mul(y1.sub(yp)).mul(freakValues2))
                     .add(x1.sub(xp).mul(yp.sub(y0)).mul(freakValues3))
                     .add(xp.sub(x0).mul(yp.sub(y0)).mul(freakValues4));

      freakValues = tf.where(valid, freakValues, 0);

      return freakValues;
    })
  }

  _computeExtremaAngles(histograms) {
    return tf.tidy(() => {
      const numBins = ORIENTATION_NUM_BINS;

      if (!this.tensorCaches.extremaAngles) {
        const yIndices = tf.tile(tf.range(0, histograms.shape[0], 1).expandDims(1), [1, histograms.shape[1]]);
        const xIndices = tf.tile(tf.range(0, histograms.shape[1], 1).expandDims(0), [histograms.shape[0], 1]);
        const indices = tf.stack([yIndices, xIndices], 2);
        this.tensorCaches.extremaAngles = {
          indices: tf.keep(indices)
        }
      }
      const indices = this.tensorCaches.extremaAngles.indices;

      /**
       * Fit a quatratic to 3 points. The system of equations is:
       *
       * y0 = A*x0^2 + B*x0 + C
       * y1 = A*x1^2 + B*x1 + C
       * y2 = A*x2^2 + B*x2 + C
       *
       * This system of equations is solved for A,B,C.
       */
      const maxIndex = histograms.argMax(2);
      const prev = maxIndex.add(numBins-1).mod(numBins);
      const next = maxIndex.add(1).mod(numBins);

      const indices1 = tf.concat([indices, prev.expandDims(2)], 2).cast('int32');
      const indices2 = tf.concat([indices, maxIndex.expandDims(2)], 2).cast('int32');
      const indices3 = tf.concat([indices, next.expandDims(2)], 2).cast('int32');
      const p10 = maxIndex.sub(1);
      const p20 = maxIndex;
      const p30 = maxIndex.add(1);
      const p11 = tf.gatherND(histograms, indices1);
      const p21 = tf.gatherND(histograms, indices2);
      const p31 = tf.gatherND(histograms, indices3);

      const d1 = p30.sub(p20).mul(p30.sub(p10));
      const d2 = p10.sub(p20).mul(p30.sub(p10));
      const d3 = p10.sub(p20);

      const a = p10.mul(p10);
      const b = p20.mul(p20);
      const A = p31.sub(p21).div(d1).sub(p11.sub(p21).div(d2));
      const B = p11.sub(p21).add(A.mul(b.sub(a))).div(d3);
      const C = p11.sub(A.mul(a)).sub(B.mul(p10));

      // if no solution, just use maxIndex
      const fbin = tf.where(A.abs().greater(0), B.neg().div(A.mul(2)), maxIndex);

      const an = fbin.add(0.5).add(numBins).div(numBins).mul(2 * Math.PI).mod(2 * Math.PI);

      return an;
    })
  }

  _computeOrientationHistograms(prunedExtremas, pyramidImagesT, dogIndexes) {
    const nBuckets = prunedExtremas.dogIndex.shape[0];
    const nFeatures = prunedExtremas.dogIndex.shape[1];

    const numBins = ORIENTATION_NUM_BINS;
    const oneOver2PI = 0.159154943091895;
    const dogNumScalesPerOctaves = PYRAMID_NUM_SCALES_PER_OCTAVES - 1;
    const gaussianExpansionFactor = ORIENTATION_GAUSSIAN_EXPANSION_FACTOR;
    const regionExpansionFactor = ORIENTATION_REGION_EXPANSION_FACTOR;
    const mK = Math.pow(2, 1.0 / dogNumScalesPerOctaves);

    return tf.tidy(() => {
      if (!this.tensorCaches.orientationHistograms) {
        const sigma = 1; // because scale always 0, as dogIndex % 2 === 0. if not true, then it needs to be fixed
        const gwSigma = Math.max(1.0, gaussianExpansionFactor * sigma);
        const gwScale = -1.0 / (2 * gwSigma * gwSigma);
        const radius = regionExpansionFactor * gwSigma;
        const radiusCeil = Math.ceil(radius);

        const distanceSquares = [];
        const radialOffset = [];
        const radialPlusDiffOffsets = [];
        for (let y = -radiusCeil; y <= radiusCeil; y++) {
          for (let x = -radiusCeil; x <= radiusCeil; x++) {
            if (x * x + y * y <= radius * radius) {
              radialPlusDiffOffsets.push([[y+1, x], [y-1, x], [y, x+1], [y, x-1]]); // compute gradient using dy dx
              radialOffset.push([y, x]);
              distanceSquares.push(x * x + y * y);
            }
          }
        }
        const nRadial = radialPlusDiffOffsets.length;

        const radialPlusDiffOffsetsT = tf.tensor(radialPlusDiffOffsets, [nRadial, 4, 2], 'int32')
                                       .broadcastTo([nBuckets, nFeatures, nRadial, 4, 2]);

        const radialOffsetT = tf.tensor(radialOffset, [nRadial, 2], 'int32')
                            .broadcastTo([nBuckets, nFeatures, nRadial, 2]);

        const distanceSquaresT = tf.tensor(distanceSquares, [distanceSquares.length]);

        const _x = distanceSquaresT.mul(gwScale);
        // fast expontenial approx: w = (720+_x*(720+_x*(360+_x*(120+_x*(30+_x*(6+_x))))))*0.0013888888
        const wT = _x.add(6).mul(_x).add(30).mul(_x).add(120).mul(_x).add(360).mul(_x).add(720).mul(_x).add(720).mul(0.0013888888);

        this.tensorCaches.orientationHistograms = {
          radialPlusDiffOffsetsT: tf.keep(radialPlusDiffOffsetsT),
          radialOffsetT: tf.keep(radialOffsetT),
          wT: tf.keep(wT),
        }
      }

      const radialPlusDiffOffsetsT = this.tensorCaches.orientationHistograms.radialPlusDiffOffsetsT;
      const radialOffsetT = this.tensorCaches.orientationHistograms.radialOffsetT;
      const wT = this.tensorCaches.orientationHistograms.wT;

      const yxExpand1 = prunedExtremas.yx.expandDims(2).tile([1, 1, radialOffsetT.shape[2], 1]);
      const yxExpand2 = yxExpand1.expandDims(3).tile([1, 1, 1, radialPlusDiffOffsetsT.shape[3], 1]);

      // 4 dimensoins: nBuckets x nFeatures x |radius*2*PI| x 2
      const yxRadial = yxExpand1.add(radialOffsetT);

      // 5 dimensoins: nBuckets x nFeatures x |radius*2*PI| x 4 x 2
      const yxRadialPlusDiff = yxExpand2.add(radialPlusDiffOffsetsT);

      const expandedDogIndexes = prunedExtremas.dogIndex.expandDims(2).tile([1,1,yxRadial.shape[2]]);

      let [radialY, radialX] = yxRadial.split([1,1], 3);
      radialY = radialY.squeeze();
      radialX = radialX.squeeze();

      // STEP 1: grab all relevant pixels for each extremas
      //    all the pixels within the radius of the extremas are interested.
      //    for each of these pixels, grab four pixels [y+1,x], [y-1,x], [y,x+1], [y,x-1]
      //        these four pixels are used to compute gradients in next step
      let combinedPixels = tf.zeros([nBuckets, nFeatures, yxRadialPlusDiff.shape[2], yxRadialPlusDiff.shape[3]]);
      for (let d = 0; d < dogIndexes.length; d++) {
        const dogIndex = dogIndexes[d];
        const octave = Math.floor(dogIndex / (PYRAMID_NUM_SCALES_PER_OCTAVES-1));
        const scale = dogIndex % (PYRAMID_NUM_SCALES_PER_OCTAVES-1) + 1;
        const gaussianIndex = octave * PYRAMID_NUM_SCALES_PER_OCTAVES + scale;
        const gaussianImageSqueezed = pyramidImagesT[gaussianIndex].squeeze();
        let pixels = tf.gatherND(gaussianImageSqueezed, yxRadialPlusDiff);

        // extrema dogIndex is correct and x, y within boundary-1
        let valid = expandedDogIndexes.equal(dogIndex)
                  .logicalAnd(radialY.greaterEqual(1))
                  .logicalAnd(radialY.less(gaussianImageSqueezed.shape[0]-1))
                  .logicalAnd(radialX.greaterEqual(1))
                  .logicalAnd(radialX.less(gaussianImageSqueezed.shape[1]-1));
        pixels = tf.where(valid.expandDims(3).tile([1,1,1,pixels.shape[3]]), pixels, 0);
        combinedPixels = combinedPixels.add(pixels);
      }

      // Step 2: compute gradients
      let [y2, y1, x2, x1] = combinedPixels.split([1, 1, 1, 1], 3);
      y2 = y2.squeeze();
      y1 = y1.squeeze();
      x2 = x2.squeeze();
      x1 = x1.squeeze();
      const dy = y2.sub(y1);
      const dx = x2.sub(x1);
      const mag = tf.sqrt(tf.square(dx).add(tf.square(dy)));
      const angle = tf.atan2(dy, dx).add(Math.PI);

      // Step 3: compute orientations histograms, but expanding them into angle bins, and sum them up
      const fbin = angle.mul(numBins).mul(oneOver2PI);
      const magnitude = wT.mul(mag).expandDims(3);

      const bin = tf.floor(fbin.sub(0.5));
      let w2 = fbin.sub(bin).sub(0.5);
      let w1 = w2.mul(-1).add(1);
      w1 = w1.expandDims(3);
      w2 = w2.expandDims(3);
      const b1 = bin.add(numBins).mod(numBins).cast('int32');
      const b2 = bin.add(1).mod(numBins).cast('int32');

      const b1Hot = tf.oneHot(b1, numBins);
      const b1HotMag = b1Hot.mul(w1).mul(magnitude);
      const b1HotSum = b1HotMag.sum([2]);

      const b2Hot = tf.oneHot(b2, numBins);
      const b2HotMag = b2Hot.mul(w2).mul(magnitude);
      const b2HotSum = b2HotMag.sum([2]);
      const histograms = b1HotSum.add(b2HotSum);

      return histograms;
    });
  }

  _smoothHistograms(histograms) {
    return tf.tidy(() => {
      // probably one smoothing is enough?
      for (let k = 0; k < ORIENTATION_SMOOTHING_ITERATIONS; k++) {
      //for (let k = 0; k < 1; k++) {
        const numBins = ORIENTATION_NUM_BINS;
        const firstCol = histograms.slice([0, 0, 0], [-1, -1, 1]);
        const lastCol = histograms.slice([0, 0, histograms.shape[2]-1], [-1, -1, 1]);

        const filter = tf.tensor2d([[0.274068619061197, 0.451862761877606, 0.274068619061197]]).expandDims(2).expandDims(3);
        let expandedHistogram = tf.concat([lastCol, histograms, firstCol], 2);

        const originalShape = expandedHistogram.shape;
        expandedHistogram = expandedHistogram.reshape([-1, numBins+2]).expandDims(2).expandDims(0);
        expandedHistogram = tf.conv2d(expandedHistogram, filter, 1, 'same')
        expandedHistogram = expandedHistogram.reshape(originalShape);

        expandedHistogram = expandedHistogram.slice([0, 0, 1], [-1, -1, expandedHistogram.shape[2]-2]);
        histograms = expandedHistogram;
        //console.log("smoothedHistograms", k, histograms.arraySync());
      }
      return histograms;
    })
  }

  _applyPrune(extremasResults, dogIndexes) {
    return tf.tidy(() => {
      const nBuckets = NUM_BUCKETS_PER_DIMENSION * NUM_BUCKETS_PER_DIMENSION;

      if (!this.tensorCaches.prune) {
        const allPositions = []; // 100 x total points in bucket. each element is [dogIndex, y, x]
        for (let i = 0; i < NUM_BUCKETS_PER_DIMENSION * NUM_BUCKETS_PER_DIMENSION; i++) {
          allPositions.push([]);
        }

        const positionsByDogs = [];
        for (let i = 0; i < extremasResults.length; i++) {
          const extremaScores = extremasResults[i];
          const height = extremaScores.shape[0];
          const width = extremaScores.shape[1];
          const bucketWidth = Math.ceil(width / NUM_BUCKETS_PER_DIMENSION);
          const bucketHeight = Math.ceil(height / NUM_BUCKETS_PER_DIMENSION);
          const bucketWidthF = width / NUM_BUCKETS_PER_DIMENSION;
          const bucketHeightF = height / NUM_BUCKETS_PER_DIMENSION;

          let positionsByDog = [];
          for (let bucketY = 0; bucketY < NUM_BUCKETS_PER_DIMENSION; bucketY++) {
            const startY = Math.floor(bucketY * bucketHeightF);
            const endY = Math.floor((1+bucketY) * bucketHeightF);
            for (let bucketX = 0; bucketX < NUM_BUCKETS_PER_DIMENSION; bucketX++) {
              const bucketIndex = bucketY * NUM_BUCKETS_PER_DIMENSION + bucketX;

              const startX = Math.floor(bucketX * bucketWidthF);
              const endX = Math.floor((1+bucketX) * bucketWidthF);
              const loc = [];

              for (let ii = 0; ii < bucketWidth; ii++) {
                for (let jj = 0; jj < bucketHeight; jj++) {
                  if (startY + jj < endY && startX + ii < endX) {
                    loc.push([startY + jj, startX + ii]);
                    allPositions[bucketIndex].push([dogIndexes[i], startY + jj, startX + ii]);
                  } else {
                    loc.push([-1, -1]);
                    allPositions[bucketIndex].push([dogIndexes[i], -1, -1]);
                  }
                }
              }
              positionsByDog.push(loc);
            }
          }
          positionsByDog = tf.tensor(positionsByDog, [nBuckets, bucketWidth * bucketHeight, 2], 'int32');
          positionsByDogs.push(positionsByDog);
        }

        const bucketIndexes = tf.range(0, nBuckets, 1, 'int32').reshape([nBuckets, 1]).tile([1, MAX_FEATURES_PER_BUCKET]);
        const constant2 = tf.fill([nBuckets, MAX_FEATURES_PER_BUCKET], 2);
        const constantMK = tf.fill([nBuckets, MAX_FEATURES_PER_BUCKET], Math.pow(2, 1.0 / (PYRAMID_NUM_SCALES_PER_OCTAVES-1)));

        this.tensorCaches.prune = {
          allPositions: tf.keep( tf.tensor(allPositions, [allPositions.length, allPositions[0].length, 3], 'int32')),
          positionsByDogs: positionsByDogs.map((positionsByDog) => tf.keep(positionsByDog)),
          bucketIndexes: tf.keep(bucketIndexes),
          constant2: tf.keep(constant2),
          constantMK: tf.keep(constantMK),
        };
      }

      const positionsByDogs = this.tensorCaches.prune.positionsByDogs;
      const bucketIndexes = this.tensorCaches.prune.bucketIndexes;
      const allPositions = this.tensorCaches.prune.allPositions;
      const constant2 = this.tensorCaches.prune.constant2;
      const constantMK = this.tensorCaches.prune.constantMK;

      const bucketScores = [];
      for (let i = 0; i < extremasResults.length; i++) {
        const extremaScores = extremasResults[i];
        bucketScores.push(tf.gatherND(extremaScores, positionsByDogs[i]));
      }
      let allBucketScores = tf.concat(bucketScores, 1);

      if (allBucketScores.shape[1] < MAX_FEATURES_PER_BUCKET) {
        allBucketScores = tf.pad(allBucketScores, [[0,0],[0,MAX_FEATURES_PER_BUCKET-allBucketScores.shape[1]]], -1000);
      }
      const allBucketScoresAbs = allBucketScores.abs();

      let {values: topValues, indices: topIndices} = tf.topk(allBucketScoresAbs, MAX_FEATURES_PER_BUCKET);
      topIndices = tf.stack([bucketIndexes, topIndices], 2);

      const topScores = tf.gatherND(allBucketScores, topIndices);

      const topPosition = tf.gatherND(allPositions, topIndices); // nbucket x 5 x [dogIndex, y, x]
      let [topDogIndex, topYX] = tf.split(topPosition, [1,2], 2);
      topDogIndex = topDogIndex.squeeze();

      const topOctave = topDogIndex.floorDiv(PYRAMID_NUM_SCALES_PER_OCTAVES-1);
      const top2PowOctave = constant2.pow(topOctave);
      const top2PowOctaveMin1 = constant2.pow(topOctave.sub(1));

      let [topOriginalY, topOriginalX] = topYX.split([1,1], 2);
      topOriginalY = topOriginalY.squeeze().mul(top2PowOctave).add(top2PowOctaveMin1).sub(0.5);
      topOriginalX = topOriginalX.squeeze().mul(top2PowOctave).add(top2PowOctaveMin1).sub(0.5);

      const topScale = topDogIndex.mod(PYRAMID_NUM_SCALES_PER_OCTAVES-1); // TODO: must be zero?
      let topSigma = constantMK.pow(topScale).mul(top2PowOctave); // TODO: topScale always 0?

      //topDogIndex = tf.where(topScores.abs().greater(0), topDogIndex, 0);
      //topOriginalX = tf.where(topScores.abs().greater(0), topOriginalX, 0);
      //topOriginalY = tf.where(topScores.abs().greater(0), topOriginalY, 0);
      //topSigma = tf.where(topScores.abs().greater(0), topSigma, 0);

      return {
        score: topScores,
        dogIndex: topDogIndex,
        sigma: topSigma,
        yx: topYX,
        //x: topX,
        //y: topY,
        originalX: topOriginalX,
        originalY: topOriginalY,
      };
    })
  }

  _buildExtremas(dogIndex, image0, image1, image2) {
    return tf.tidy(() => {
      const dogNumScalesPerOctaves = PYRAMID_NUM_SCALES_PER_OCTAVES - 1;
      const width = image1.shape[2];
      const height = image1.shape[1];

      if (!this.tensorCaches.buildExtremas) {
        this.tensorCaches.buildExtremas = {
          filterEdges: [],
          thresholds: []
        }
      }
      if (!this.tensorCaches.buildExtremas.filterEdges[dogIndex]) {
        let startI = 1;
        let startJ = startI;
        let endI = image1.shape[2] - 1;
        let endJ = image1.shape[1] - 1;
        let filterEdgeArr = [];
        for (let j = 0; j < height; j++) {
          filterEdgeArr[j] = [];
          for (let i = 0; i < width; i++) {
            filterEdgeArr[j][i] = !(i < startI || i >= endI || j < startJ || j >= endJ);
          }
        }
        this.tensorCaches.buildExtremas.filterEdges[dogIndex] = tf.keep(tf.tensor2d(filterEdgeArr, [height, width], 'bool').expandDims(2).expandDims(0));
        this.tensorCaches.buildExtremas.thresholds[dogIndex] = tf.keep(tf.fill(image1.shape, LAPLACIAN_THRESHOLD));
      }
      const filterEdge = this.tensorCaches.buildExtremas.filterEdges[dogIndex];
      const threshold = this.tensorCaches.buildExtremas.thresholds[dogIndex];

      if ( Math.floor(image0.shape[2]/2) == image1.shape[2]) {
        image0 = this._downsampleBilinear(image0);
      }
      const image0Neg = image0.neg();
      const image1Neg = image1.neg();
      const image2Neg = image2.neg();
      const images = tf.concat([image0, image1, image2, threshold], 0);
      const imagesNeg = tf.concat([image0Neg, image1Neg, image2Neg, threshold], 0);
      const max = tf.maxPool3d(images, [4, 3, 3], [4, 1, 1], 'same');
      const min = tf.maxPool3d(imagesNeg, [4, 3, 3], [4, 1, 1], 'same');

      const isMax = max.lessEqual(image1);
      const isMin = min.lessEqual(image1Neg);

      let isExtrema = isMax.logicalOr(isMin);
      isExtrema = isExtrema.logicalAnd(filterEdge);

      //return tf.where(isExtrema, image1, 0).squeeze();

      // Step 2: sub-pixel refinement (I'm not sure what that means. Any educational ref?)
      // Compute spatial derivatives
      const dx = tf.conv2d(image1, tf.tensor2d([[-1, 0, 1]]).expandDims(2).expandDims(3), 1, 'same').mul(0.5);
      const dy = tf.conv2d(image1, tf.tensor2d([[-1], [0], [1]]).expandDims(2).expandDims(3), 1, 'same').mul(0.5);
      const dxx = tf.conv2d(image1, tf.tensor2d([[1, -2, 1]]).expandDims(2).expandDims(3), 1, 'same');
      const dyy = tf.conv2d(image1, tf.tensor2d([[1], [-2], [1]]).expandDims(2).expandDims(3), 1, 'same');
      const dxy = tf.conv2d(image1, tf.tensor2d([[1, 0, -1], [0, 0, 0], [-1, 0, 1]]).expandDims(2).expandDims(3), 1, 'same').mul(0.25);

      // Compute scale derivates
      const ds = image2.sub(image0).mul(0.5);
      const dss = image2.add(image0).sub(image1.mul(2));
      const dxs = tf.conv2d(image0, tf.tensor2d([[1, 0, -1]]).expandDims(2).expandDims(3), 1, 'same')
                .add(tf.conv2d(image2, tf.tensor2d([[-1, 0, 1]]).expandDims(2).expandDims(3), 1, 'same'))
                .mul(0.25);
      const dys = tf.conv2d(image0, tf.tensor2d([[1], [0], [-1]]).expandDims(2).expandDims(3), 1, 'same')
                .add(tf.conv2d(image2, tf.tensor2d([[-1], [0], [1]]).expandDims(2).expandDims(3), 1, 'same'))
                .mul(0.25);

      // Solve Hessian A * u = b;
      const A0 = dxx;
      const A1 = dxy;
      const A2 = dxs;
      const A3 = dxy;
      const A4 = dyy;
      const A5 = dys;
      const A6 = dxs;
      const A7 = dys;
      const A8 = dss;
      const b0 = dx.mul(-1);
      const b1 = dy.mul(-1);
      const b2 = ds.mul(-1);

      const detA = A0.mul(A4).mul(A8)
                  .sub( A0.mul(A5).mul(A5) )
                  .sub( A4.mul(A2).mul(A2) )
                  .sub( A8.mul(A1).mul(A1) )
                  .add( A1.mul(A2).mul(A5).mul(2) )

      isExtrema = isExtrema.logicalAnd(detA.abs().greater(0.0001));

      // B = inverse of A
      const B0 = A4.mul(A8).sub(A5.mul(A7));
      const B1 = A2.mul(A7).sub(A1.mul(A8));
      const B2 = A1.mul(A5).sub(A2.mul(A4));
      const B3 = B1;
      const B4 = A0.mul(A8).sub(A2.mul(A6));
      const B5 = A2.mul(A3).sub(A0.mul(A5));
      const B6 = B2;
      const B7 = B5;
      const B8 = A0.mul(A4).sub(A1.mul(A3));

      const u0 = (B0.mul(b0).add(B1.mul(b1)).add(B2.mul(b2))).div(detA);
      const u1 = (B3.mul(b0).add(B4.mul(b1)).add(B5.mul(b2))).div(detA);
      const u2 = (B6.mul(b0).add(B7.mul(b1)).add(B8.mul(b2))).div(detA);

      // If points move too much in the sub-pixel update, then the point probably unstable.
      isExtrema = isExtrema.logicalAnd( u0.mul(u0).add(u1.mul(u1)).lessEqual(MAX_SUBPIXEL_DISTANCE_SQR) );

      // compute edge score
      const det = dxx.mul(dyy).sub(dxy.mul(dxy));
      isExtrema = isExtrema.logicalAnd(det.abs().greater(0.0001));

      const edgeScore = ((dxx.add(dyy)).mul(dxx.add(dyy))).div(det);
      isExtrema = isExtrema.logicalAnd(edgeScore.abs().lessEqual(EDGE_HESSIAN_THRESHOLD));

      const score = image1.sub(b0.mul(u0).add(b1.mul(u1)).add(b2.mul(u2)));
      isExtrema = isExtrema.logicalAnd(score.mul(score).greaterEqual(LAPLACIAN_SQR_THRESHOLD));

      return tf.where(isExtrema, score, 0).squeeze();
    });
  }

  _differenceImageBinomial(image1, image2) {
    return tf.tidy(() => {
      return image1.sub(image2);
    });
  }

  // 4th order binomail filter
  _applyFilter(image) {
    return tf.tidy(() => {
      if (!this.tensorCaches.filter1) {
        this.tensorCaches.filter1 = tf.keep(tf.tensor2d([
          [1, 4, 6, 4, 1],
        ]).expandDims(2).expandDims(3));
        this.tensorCaches.filter2 = tf.keep(tf.tensor2d([
          [1], [4], [6], [4], [1],
        ]).expandDims(2).expandDims(3));
      }
      image = image.mirrorPad([[0,0], [2,2], [2,2], [0, 0]], 'symmetric');
      let ret = tf.conv2d(image, this.tensorCaches.filter1, [1,1], 'valid');
      ret = tf.conv2d(ret, this.tensorCaches.filter2, [1,1], 'valid');
      ret = ret.div(256);
      return ret;
    })
  }

  _downsampleBilinear(image) {
    return tf.tidy(() => {
      if (!this.tensorCaches.downsample) {
        this.tensorCaches.downsample = tf.keep(tf.tensor2d([
          [0.25, 0.25],
          [0.25, 0.25],
        ]).expandDims(2).expandDims(3));
      }
      let ret = tf.conv2d(image, this.tensorCaches.downsample, [2,2], 'valid');
      return ret;
    });
  }
}

module.exports = {
  Detector
};
