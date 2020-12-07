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

  detect(input) {
    return this._detect(input);

    return new Promise(async (resolve, reject) => {
      let featurePoints;
      const time = await tf.time(() => {
        featurePoints = this._detect(input);
      });
      console.log("time", time);
      resolve(featurePoints);
    })
  }

  _detect(input) {
    const featurePoints = [];

    var _start = new Date();

    const inputImageT = this._loadInput(input);

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
    const allPyramidImages = this._packPyramidImages(pyramidImagesT);

    const extremaHistograms = this._computeOrientationHistograms(prunedExtremas, pyramidImagesT, dogIndexes, allPyramidImages);
    const smoothedHistograms = this._smoothHistograms(extremaHistograms);
    const extremaAngles = this._computeExtremaAngles(smoothedHistograms);
    const extremaFreaks = this._computeExtremaFreak(pyramidImagesT, this.numOctaves, prunedExtremas, extremaAngles);
    const freakDescriptors = this._computeFreakDescriptors(extremaFreaks);
    const combinedExtremas = this._combine(prunedExtremas, freakDescriptors);
    const combinedExtremasArr = combinedExtremas.arraySync();

    //console.log("combinedExtremasArr", combinedExtremasArr);

    tf.tidy(() => {
      //console.log("res", allPyramidImages.arraySync());
      console.log("res", extremaHistograms.sum().arraySync());
      //console.log("res", prunedExtremas.score.sum().arraySync());
    });

    inputImageT.dispose();
    allPyramidImages && allPyramidImages.dispose();
    pyramidImagesT.forEach((t) => t.dispose());
    dogPyramidImagesT.forEach((t) => t && t.dispose());
    extremasResults.forEach((t) => t.dispose());
    prunedExtremas.score.dispose();
    prunedExtremas.dogIndex.dispose();
    prunedExtremas.sigma.dispose();
    prunedExtremas.x.dispose();
    prunedExtremas.y.dispose();
    prunedExtremas.originalX.dispose();
    prunedExtremas.originalY.dispose();
    //console.log(tf.memory().numTensors);
    //return [];

    extremaHistograms.dispose();
    smoothedHistograms.dispose();
    extremaAngles.dispose();
    extremaFreaks.dispose();
    freakDescriptors.dispose();
    combinedExtremas.dispose();

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

  _packPyramidImages(pyramidImagesT) {
    return tf.tidy(() => {
      const paddedPyramidImages = [];
      for (let i = 0; i < pyramidImagesT.length; i++) {
        //let d1Diff = pyramidImagesT[0].shape[1] - pyramidImagesT[i].shape[1];
        //let d2Diff = pyramidImagesT[0].shape[2] - pyramidImagesT[i].shape[2];
        //paddedPyramidImages.push(pyramidImagesT[i].squeeze().pad([[0, d1Diff], [0, d2Diff]]));
        paddedPyramidImages.push(pyramidImagesT[i].reshape([-1]));
      }
      //const allPyramidImages = tf.stack(paddedPyramidImages, 0);
      const allPyramidImages = tf.concat(paddedPyramidImages, 0);
      return allPyramidImages;
    })
  }

  _combine(prunedExtremas, freakDescriptors) {
    return tf.tidy(() => {
      const combined = tf.concat([prunedExtremas.score.expandDims(2), prunedExtremas.originalX.expandDims(2), prunedExtremas.originalY.expandDims(2), freakDescriptors], 2);
      return combined;
    })
  }

  _computeFreakDescriptors(extremaFreaks) {
    return tf.tidy(() => {
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

      const freakDescriptors = tf.gatherND(extremaFreaks, in1).less(tf.gatherND(extremaFreaks, in2).add(0.01));
      return freakDescriptors;
    })
  }

  _computeExtremaFreak(pyramidImagesT, gaussianNumOctaves, prunedExtremas, prunedExtremasAngles) {
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

      const expansionFactor = FREAK_EXPANSION_FACTOR;
      const transformScale = tf.clipByValue(inputSigma.mul(expansionFactor), 1, 10000); // no uppwer limit
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
      const fscale = tf.log(sigma.div(tf.pow(tf.fill(octave.shape, 2), octave))).mul(oneOverLogK);
      let scale = tf.round(fscale);

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

      // TODO: cache
      const yIndices = tf.tile(tf.range(0, histograms.shape[0], 1).expandDims(1), [1, histograms.shape[1]]);
      const xIndices = tf.tile(tf.range(0, histograms.shape[1], 1).expandDims(0), [histograms.shape[0], 1]);
      const indices = tf.stack([yIndices, xIndices], 2);

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

  _computeOrientationHistograms(prunedExtremas, pyramidImagesT, dogIndexes, allPyramidImages) {
    const numBins = ORIENTATION_NUM_BINS;
    const oneOver2PI = 0.159154943091895;
    const dogNumScalesPerOctaves = PYRAMID_NUM_SCALES_PER_OCTAVES - 1;
    const gaussianExpansionFactor = ORIENTATION_GAUSSIAN_EXPANSION_FACTOR;
    const regionExpansionFactor = ORIENTATION_REGION_EXPANSION_FACTOR;
    const mK = Math.pow(2, 1.0 / dogNumScalesPerOctaves);

    return tf.tidy(() => {
      let combinedHistograms = tf.zeros([prunedExtremas.dogIndex.shape[0], prunedExtremas.dogIndex.shape[1], numBins]);

      const sigma = 1; // because scale always 0, as dogIndex % 2 === 0. if not true, then it needs to be fixed
      const gwSigma = Math.max(1.0, gaussianExpansionFactor * sigma);
      const gwScale = -1.0 / (2 * gwSigma * gwSigma);

      const radius = ORIENTATION_GAUSSIAN_EXPANSION_FACTOR * ORIENTATION_REGION_EXPANSION_FACTOR;
      const radiusCeil = Math.ceil(radius);
      const offsets = [];
      const distanceSquares = [];
      const centerOffset = [];
      for (let y = -radiusCeil; y <= radiusCeil; y++) {
        for (let x = -radiusCeil; x <= radiusCeil; x++) {
          if (x * x + y * y <= radius * radius) {
            offsets.push([[y+1, x], [y-1, x], [y, x+1], [y, x-1]]); // compute gradient using dy dx
            centerOffset.push([y, x]);
            distanceSquares.push(x * x + y * y);
          }
        }
      }
      const offsetsT = tf.tensor(offsets, [offsets.length, 4, 2], 'int32').broadcastTo([prunedExtremas.dogIndex.shape[0], prunedExtremas.dogIndex.shape[1], offsets.length, 4, 2]);
      const centerOffsetT = tf.tensor(centerOffset, [centerOffset.length, 2], 'int32').broadcastTo([prunedExtremas.dogIndex.shape[0], prunedExtremas.dogIndex.shape[1], offsets.length, 2]);

      const distanceSquaresT = tf.tensor(distanceSquares, [distanceSquares.length]);
      const _x = distanceSquaresT.mul(gwScale);
      // fast expontenial approx: w = (720+_x*(720+_x*(360+_x*(120+_x*(30+_x*(6+_x))))))*0.0013888888
      const w = _x.add(6).mul(_x).add(30).mul(_x).add(120).mul(_x).add(360).mul(_x).add(720).mul(_x).add(720).mul(0.0013888888);
      console.log("new w", w.shape, w.arraySync());

      let yx = tf.stack([prunedExtremas.y, prunedExtremas.x], 2);

      let yxCenter = yx.expandDims(2).tile([1, 1, centerOffsetT.shape[2], 1]).add(centerOffsetT);
      console.log("yxCenter", yxCenter.shape, yxCenter.arraySync());

      yx = yx.expandDims(2).expandDims(2).tile([1, 1, offsetsT.shape[2], offsetsT.shape[3], 1]);
      console.log("yx", yx.shape, yx.arraySync());
      console.log("offsetsT", offsetsT.shape, offsetsT.arraySync());

      // 5 dimensoins: nBuckets x nFeatures x |radius*2*PI| x 4 x 2
      let yxWithOffsets = yx.add(offsetsT);

      const expandedDogIndexes = prunedExtremas.dogIndex.expandDims(2).tile([1,1,yxCenter.shape[2]]);
      console.log("expandedDogIndexes", expandedDogIndexes.arraySync());
      console.log("yxWithOffsets", yxWithOffsets.arraySync());

      let combinedPixels = tf.zeros([yxWithOffsets.shape[0], yxWithOffsets.shape[1], yxWithOffsets.shape[2], yxWithOffsets.shape[3]]);
      for (let d = 0; d < dogIndexes.length; d++) {
        const dogIndex = dogIndexes[d];
        const octave = Math.floor(dogIndex / (PYRAMID_NUM_SCALES_PER_OCTAVES-1));
        const scale = dogIndex % (PYRAMID_NUM_SCALES_PER_OCTAVES-1);
        const gaussianIndex = octave * PYRAMID_NUM_SCALES_PER_OCTAVES + scale;
        const gaussianImageSqueezed = pyramidImagesT[gaussianIndex].squeeze();
        let pixels = tf.gatherND(gaussianImageSqueezed, yxWithOffsets);

        let [y, x] = yxWithOffsets.split([1,1], 4);
        let [centerY, centerX] = yxCenter.split([1,1], 3);
        centerY = centerY.squeeze();
        centerX = centerX.squeeze();
        let valid = expandedDogIndexes.equal(dogIndex)
                  .logicalAnd(centerY.greaterEqual(1))
                  .logicalAnd(centerY.less(gaussianImageSqueezed.shape[0]-1))
                  .logicalAnd(centerX.greaterEqual(1))
                  .logicalAnd(centerX.less(gaussianImageSqueezed.shape[1]-1));

        console.log("pixes", pixels.shape, pixels.arraySync());
        console.log("valid", valid.shape, valid.arraySync());

        pixels = tf.where(valid.expandDims(3).tile([1,1,1,pixels.shape[3]]), pixels, 0);
        combinedPixels = combinedPixels.add(pixels);
      }

      let [y2, y1, x2, x1] = combinedPixels.split([1, 1, 1, 1], 3);
      y2 = y2.squeeze();
      y1 = y1.squeeze();
      x2 = x2.squeeze();
      x1 = x1.squeeze();
      const dy = y2.sub(y1);
      const dx = x2.sub(x1);
      const mag = tf.sqrt(tf.square(dx).add(tf.square(dy)));
      const angle = tf.atan2(dy, dx).add(Math.PI);

      const fbin = angle.mul(numBins).mul(oneOver2PI);
      const magnitude = w.mul(mag).expandDims(3);

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

      for (let d = 0; d < dogIndexes.length; d++) {
        const dogIndex = dogIndexes[d];
        const octave = Math.floor(dogIndex / (PYRAMID_NUM_SCALES_PER_OCTAVES-1));
        const scale = dogIndex % (PYRAMID_NUM_SCALES_PER_OCTAVES-1);
        const originalSigma = Math.pow(mK, scale) * (1 << octave);
        const octaveFactor = 1.0 / Math.pow(2, octave);
        const sigma = originalSigma * octaveFactor;
        const gwSigma = Math.max(1.0, gaussianExpansionFactor * sigma);
        const gwScale = -1.0 / (2 * gwSigma * gwSigma);
        const radius = regionExpansionFactor * gwSigma;
        const radiusSquare = Math.ceil(radius * radius - 0.5);
        const radiusCeil = Math.ceil(radius);

        const radiusRange = tf.range(-radiusCeil, radiusCeil+1, 1, 'int32');
        const radiusRangeSquare = tf.square(radiusRange);
        const distanceSquare = radiusRangeSquare.add(radiusRangeSquare.expandDims(1));

        const offsetY = tf.tile(radiusRange.expandDims(1), [1, radiusRange.shape[0]]);
        const offsetX = tf.tile(radiusRange.expandDims(0), [radiusRange.shape[0], 1]);
        const offset = tf.stack([offsetY, offsetX], 2);
        const offsetDistanceSquare = tf.square(offsetX).add(tf.square(offsetY)).expandDims(2);
        const validDistance  = offsetDistanceSquare.lessEqual(radiusSquare);

        const yxIndices = tf.stack([prunedExtremas.y, prunedExtremas.x], 2);
        const indices = yxIndices.expandDims(2).expandDims(2).add(offset);

        // compute gradients
        const gaussianIndex = octave * PYRAMID_NUM_SCALES_PER_OCTAVES + scale;
        const gaussianImage = pyramidImagesT[gaussianIndex];
        const dx = tf.conv2d(gaussianImage, tf.tensor2d([[-1, 0, 1]]).expandDims(2).expandDims(3), 1, 'same');
        const dy = tf.conv2d(gaussianImage, tf.tensor2d([[-1], [0], [1]]).expandDims(2).expandDims(3), 1, 'same');
        const mag = tf.sqrt(tf.square(dx).add(tf.square(dy)));
        const angle = tf.atan2(dy, dx).add(Math.PI);
        const angleSqueeze = angle.squeeze();
        const magSqueeze = mag.squeeze();
        const [y, x] = indices.split([1,1], indices.shape.length-1);

        let valid = validDistance.logicalAnd(y.greaterEqual(1)).logicalAnd(y.less(angleSqueeze.shape[0]-1)).logicalAnd(x.greaterEqual(1)).logicalAnd(x.less(angleSqueeze.shape[1]-1)).squeeze();

        let validDog = prunedExtremas.dogIndex.equal(dogIndex).expandDims(2).expandDims(2).tile([1,1,valid.shape[2], valid.shape[3]]);
        valid = valid.logicalAnd(validDog);

        const selectedAngles = tf.where(valid, tf.gatherND(angleSqueeze, indices), 0);
        const fbin = selectedAngles.mul(numBins).mul(oneOver2PI);

        const selectedMags = tf.where(valid, tf.gatherND(magSqueeze, indices), 0);
        const _x = distanceSquare.mul(gwScale);
        // fast expontenial approx: w = (720+_x*(720+_x*(360+_x*(120+_x*(30+_x*(6+_x))))))*0.0013888888
        const w = _x.add(6).mul(_x).add(30).mul(_x).add(120).mul(_x).add(360).mul(_x).add(720).mul(_x).add(720).mul(0.0013888888);

        const magnitude = w.mul(selectedMags).expandDims(4);

        const bin = tf.floor(fbin.sub(0.5));
        let w2 = fbin.sub(bin).sub(0.5);
        let w1 = w2.mul(-1).add(1);
        w1 = w1.expandDims(4);
        w2 = w2.expandDims(4);
        const b1 = bin.add(numBins).mod(numBins).cast('int32');
        const b2 = bin.add(1).mod(numBins).cast('int32');

        const b1Hot = tf.oneHot(b1, numBins);
        const b1HotMag = b1Hot.mul(w1).mul(magnitude);
        const b1HotSum = b1HotMag.sum([2,3]);

        const b2Hot = tf.oneHot(b2, numBins);
        const b2HotMag = b2Hot.mul(w2).mul(magnitude);
        const b2HotSum = b2HotMag.sum([2,3]);

        const histograms = b1HotSum.add(b2HotSum);

        combinedHistograms = combinedHistograms.add(histograms);
      }

      const histogramsArr = histograms.arraySync();
      const oldHistogramsArr = combinedHistograms.arraySync();
      let correct = 0;
      for (let i = 0; i < histogramsArr.length; i++) {
        for (let j = 0; j < histogramsArr[i].length; j++) {
          for (let k = 0; k < histogramsArr[i][j].length; k++) {
            if (Math.abs(histogramsArr[i][j][k] - oldHistogramsArr[i][j][k]) < 0.001) {
              correct += 1;
            } else {
              console.log("INCORRECT", i, j, k, histogramsArr[i][j][k], oldHistogramsArr[i][j][k]);
            }
          }
        }
      }
      console.log("hist correct", correct);
      console.log(histogramsArr, oldHistogramsArr);
      return combinedHistograms;
    });
  }

  _smoothHistograms(histograms) {
    return tf.tidy(() => {
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
      return expandedHistogram;
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
        bucketScores.push(tf.gatherND(extremaScores, positionsByDogs[i]).squeeze());
      }
      const allBucketScores = tf.concat(bucketScores, 1);
      const allBucketScoresAbs = allBucketScores.abs();

      let {values: topValues, indices: topIndices} = tf.topk(allBucketScoresAbs, MAX_FEATURES_PER_BUCKET);
      topIndices = tf.stack([bucketIndexes, topIndices], 2);

      const topScores = tf.gatherND(allBucketScores, topIndices);

      const topPosition = tf.gatherND(allPositions, topIndices); // nbucket x 5 x [dogIndex, y, x]
      let [topDogIndex, topY, topX] = tf.split(topPosition, [1,1,1], 2);
      topDogIndex = topDogIndex.squeeze();
      topY = topY.squeeze();
      topX = topX.squeeze();

      const topOctave = topDogIndex.floorDiv(PYRAMID_NUM_SCALES_PER_OCTAVES-1);
      const top2PowOctave = constant2.pow(topOctave);
      const top2PowOctaveMin1 = constant2.pow(topOctave.sub(1));

      let topOriginalX = topX.mul(top2PowOctave).add(top2PowOctaveMin1).sub(0.5);
      let topOriginalY = topY.mul(top2PowOctave).add(top2PowOctaveMin1).sub(0.5);

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
        x: topX,
        y: topY,
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

      //let isExtrema = (isMax.logicalOr(isMin)).logicalAnd(filterEdge).logicalAnd(filterLaplacianThreshold);
      return tf.where(isExtrema, image1, 0).squeeze();

      // Step 2: sub-pixel refinement (I'm not sure what that means. Any educational ref?)
      // not sure whether useful actually

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
      let ret = tf.conv2d(image, this.tensorCaches.filter1, [1,1], 'same');
      ret = tf.conv2d(ret, this.tensorCaches.filter2, [1,1], 'same');
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
