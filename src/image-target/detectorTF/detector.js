//import * as tfc from '@tensorflow/tfjs-core';
const tf = require('@tensorflow/tfjs');
const PYRAMID_NUM_SCALES_PER_OCTAVES = 3;
const PYRAMID_MIN_SIZE = 8;

const LAPLACIAN_SQR_THRESHOLD = 3 * 3;
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

    globalDebug.tf = tf;
  }

  detect(input) {
    console.log("detect: ", input);

    const y = tf.tidy(() => {
      let inputImage = tf.browser.fromPixels(input);
      inputImage = inputImage.mean(2).expandDims(2).expandDims(0);

      // remove
      inputImage = tf.tensor(globalDebug.inputImage).expandDims(2).expandDims(0);

      //globalDebug.compareImage('inputimage: ', globalDebug.inputImage, inputImage.squeeze().arraySync());

      const data = inputImage.squeeze().arraySync();
      //console.log("image data: ", inputImage.squeeze().arraySync());
      //console.log("image data: ", inputImage.squeeze().reshape([-1]).arraySync());

      // Build gaussian pyramid images
      const pyramidImages = [];
      for (let i = 0; i < this.numOctaves; i++) {
        if (i === 0) {
          pyramidImages.push(this._applyFilter(inputImage));
        } else {
          pyramidImages.push(this._downsampleBilinear(pyramidImages[pyramidImages.length-1]));
        }
        for (let j = 0; j < PYRAMID_NUM_SCALES_PER_OCTAVES - 1; j++) {
          pyramidImages.push(this._applyFilter(pyramidImages[pyramidImages.length-1]));
        }
      }

      console.log("gaussian images count: ", pyramidImages.length, 'vs', globalDebug.pyramidImages.length);
      for (let i = 0; i < pyramidImages.length; i++) {
        //globalDebug.compareImage('gaussian image ' +i, globalDebug.pyramidImages[i], pyramidImages[i].squeeze().arraySync());
        //globalDebug.showImage(pyramidImages[i]);
      }

      // Build difference of gaussian pyramid
      const dogPyramidImages = [];
      for (let i = 0; i < this.numOctaves; i++) {
        for (let j = 0; j < PYRAMID_NUM_SCALES_PER_OCTAVES - 1; j++) {
          const image1 = pyramidImages[i * PYRAMID_NUM_SCALES_PER_OCTAVES + j];
          const image2 = pyramidImages[i * PYRAMID_NUM_SCALES_PER_OCTAVES + j + 1];
          dogPyramidImages.push(this._differenceImageBinomial(image1, image2));
        }
      }

      console.log("dog images count: ", dogPyramidImages.length, 'vs', globalDebug.dogPyramidImages.length);
      for (let i = 0; i < dogPyramidImages.length; i++) {
        //globalDebug.compareImage('dog image ' +i, globalDebug.dogPyramidImages[i], dogPyramidImages[i].squeeze().arraySync());
        //globalDebug.showImage(dogPyramidImages[i]);
      }

      let debugIndex = 0;

      const extremasResults = [];
      const dogIndexes = [];

      // Find feature points (i.e. extremas in dog images)
      for (let k = 1; k < dogPyramidImages.length - 1; k++) {
        // Experimental result shows that no extrema is possible for odd number of k
        // I believe it has something to do with how the gaussian pyramid being constructed
        if (k % 2 === 1) continue;

        dogIndexes.push(k);

        let image0 = dogPyramidImages[k-1];
        let image1 = dogPyramidImages[k];
        let image2 = dogPyramidImages[k+1];

        const octave = Math.floor(k / (PYRAMID_NUM_SCALES_PER_OCTAVES-1));
        const scale = k % (PYRAMID_NUM_SCALES_PER_OCTAVES-1);

        let hasUpsample = false;
        let hasPadOneWidth = false;
        let hasPadOneHeight = false;

        if ( Math.floor(image0.shape[2]/2) == image1.shape[2]) {
          image0 = this._downsampleBilinear(image0);
        }
        if ( Math.floor(image1.shape[2]/2) == image2.shape[2]) {
          hasUpsample = true;
          hasPadOneWidth = image1.shape[2] % 2 === 1;
          hasPadOneHeight = image1.shape[1] % 2 === 1;
          image2 = this._upsampleBilinear(image2, hasPadOneWidth, hasPadOneHeight);
        }

        // In upsample image, ignore the border
        // it's possible to further pad one more line (i.e. upsacale 2x2 -> 5x5), so ignore one more line
        let startI = hasUpsample? 2: 1;
        let startJ = startI;

        // should it be "image1.width -2" ? but this yield consistent result with artoolkit
        let endI = hasUpsample? image1.shape[2] - 3: image1.shape[2] - 1;
        let endJ = hasUpsample? image1.shape[1] - 3: image1.shape[1] - 1;
        if (hasPadOneWidth) endI -= 1;
        if (hasPadOneHeight) endJ -= 1;

        // find all extrema for image1
        const extremasResult = this._buildExtremas(image0, image1, image2, octave, scale, startI, startJ, endI, endJ);

        const gaussianIndex = octave * PYRAMID_NUM_SCALES_PER_OCTAVES + scale;
        const gaussianImage = pyramidImages[gaussianIndex];
        const gradients = this._computeGradient(gaussianImage, octave, scale);

        //const debugMag = globalDebug.gradients[debugIndex].mag;
        //const debugAngle = globalDebug.gradients[debugIndex].angle;
        //const debugFbin = globalDebug.fbins[debugIndex];
        //console.log("correct Fbin", debugFbin.toArray());
        //console.log("fbin", gradients.fbin.squeeze().arraySync());

        globalDebug.compareImage('extream result image ' +debugIndex, globalDebug.extremasResults[debugIndex], extremasResult.squeeze().arraySync());
        /*
        globalDebug.compareImage('gradient mag' + debugIndex, globalDebug.gradients[debugIndex].mag, gradients.mag.squeeze().arraySync());
        globalDebug.compareImage('gradient angle' + debugIndex, globalDebug.gradients[debugIndex].angle, gradients.angle.squeeze().arraySync(), 0.01);
        */
        debugIndex += 1;

        // combine this extrema with the existing
        //prunedExtremas = this._applyPrune(k, prunedExtremas, extremasResult, image1.width, image1.height, octave, scale);
        extremasResults.push(extremasResult);
      }

      const prunedExtremas = this._applyPrune(extremasResults, dogIndexes);
      const extremaHistograms = this._computeOrientationHistograms(prunedExtremas, pyramidImages, dogIndexes);
      const smoothedHistograms = this._smoothHistograms(extremaHistograms);

      globalDebug.compareImage('extream histograms', globalDebug.extremaHistograms, extremaHistograms.arraySync(), 0.1);
      globalDebug.compareImage('smoothed histograms', globalDebug.smoothedExtremaHistograms, smoothedHistograms.arraySync(), 0.1);

      const extremaAngles = this._computeExtremaAngles(smoothedHistograms);
      console.log("extrema angles", extremaAngles.arraySync());

      globalDebug.compareImage('extream angles', globalDebug.extremaAngles, extremaAngles.expandDims(2).arraySync(), 0.1);

      const extremaFreaks = this._computeExtremaFreak(pyramidImages, this.numOctaves, prunedExtremas, extremaAngles);

      const freakDescriptors = this._computeFreakDescriptors(extremaFreaks);
    });

    console.table(tf.memory());
  }

  _computeFreakDescriptors(extremaFreaks) {
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

    const freakDescriptors = tf.gatherND(extremaFreaks, in1).less(tf.gatherND(extremaFreaks, in2).add(0.0001));
    console.log("in1", in1.arraySync());
    console.log("in2", in2.arraySync());
    console.log("extrema freaks", extremaFreaks.arraySync());

    console.log("desc", freakDescriptors.arraySync());
    console.log("correct desc", globalDebug.freakDescriptors);
    globalDebug.compareImage('freak result', globalDebug.freakDescriptors, freakDescriptors.arraySync(), 0.0000001);
    return freakDescriptors;
  }

  _computeExtremaFreak(pyramidImages, gaussianNumOctaves, prunedExtremas, prunedExtremasAngles) {
    //console.log("pruned sigma: ", prunedExtremas.sigma.arraySync());
    //console.log("pruned original x: ", prunedExtremas.originalX.arraySync());
    //console.log("pruned original y: ", prunedExtremas.originalY.arraySync());
    //console.log("pruned angles: ", prunedExtremasAngles.arraySync());

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
    for (let i = 0; i < pyramidImages.length; i++) {
      let d1Diff = pyramidImages[0].shape[1] - pyramidImages[i].shape[1];
      let d2Diff = pyramidImages[0].shape[2] - pyramidImages[i].shape[2];
      pyramidImageShapes.push(tf.tensor([pyramidImages[i].shape[1], pyramidImages[i].shape[2]]));
      paddedPyramidImages.push(pyramidImages[i].squeeze().pad([[0, d1Diff], [0, d2Diff]]));
    }
    let allPyramidImages = tf.stack(paddedPyramidImages, 0);
    let allPyramidImageShapes = tf.stack(pyramidImageShapes, 0);

    const maxY = tf.gatherND(allPyramidImageShapes, tf.stack([imageIndex, tf.fill(imageIndex.shape, 0)], 3).cast('int32'));
    const maxX = tf.gatherND(allPyramidImageShapes, tf.stack([imageIndex, tf.fill(imageIndex.shape, 1)], 3).cast('int32'));

    // bilinear interpolation
    //yp = yp.clipByValue(0, pyramidImages[0].shape[1]-2); // TODO. fix: the max clip value should depend on imageIndex
    //xp = xp.clipByValue(0, pyramidImages[0].shape[2]-2);
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

    globalDebug.compareImage('freak result', globalDebug.freakResult.toArray(), freakValues.arraySync(), 0.1);

    return freakValues;
  }

  _computeExtremaAngles(histograms) {
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
  }

  _computeOrientationHistograms(prunedExtremas, pyramidImages, dogIndexes) {
    //console.log("pruned extremas: ", prunedExtremas);
    //console.log("pruned x: ", prunedExtremas.x.arraySync());
    //console.log("pruned y: ", prunedExtremas.y.arraySync());
    //console.log("pruned octave: ", prunedExtremas.octave.arraySync());
    //console.log("pruned dog: ", prunedExtremas.dogIndex.arraySync());

    const numBins = ORIENTATION_NUM_BINS;
    const oneOver2PI = 0.159154943091895;
    const dogNumScalesPerOctaves = PYRAMID_NUM_SCALES_PER_OCTAVES - 1;
    const gaussianExpansionFactor = ORIENTATION_GAUSSIAN_EXPANSION_FACTOR;
    const regionExpansionFactor = ORIENTATION_REGION_EXPANSION_FACTOR;
    const mK = Math.pow(2, 1.0 / dogNumScalesPerOctaves);

    let combinedHistograms = tf.zeros([prunedExtremas.dogIndex.shape[0], prunedExtremas.dogIndex.shape[1], numBins]);

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
      const yxIndices = tf.stack([prunedExtremas.y, prunedExtremas.x], 2);

      const indices = yxIndices.expandDims(2).expandDims(2).add(offset);

      const gaussianIndex = octave * PYRAMID_NUM_SCALES_PER_OCTAVES + scale;
      const gaussianImage = pyramidImages[gaussianIndex];
      const gradients = this._computeGradient(gaussianImage, octave, scale);

      const angleSqueeze = gradients.angle.squeeze();
      const magSqueeze = gradients.mag.squeeze();
      const [y, x] = indices.split([1,1], indices.shape.length-1);

      let valid  = offsetDistanceSquare.lessEqual(radiusSquare);
      valid = valid.logicalAnd(y.greaterEqual(0)).logicalAnd(y.less(angleSqueeze.shape[0])).logicalAnd(x.greaterEqual(0)).logicalAnd(x.less(angleSqueeze.shape[1])).squeeze();

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

      const verify = (label, fbinArr, debugFbin) => {
        let correctCount = 0;
        for (let i = 0; i < fbinArr.length; i++) {
          for (let j = 0; j < fbinArr[i].length; j++) {
            for (let k = 0; k < fbinArr[i][j].length; k++) {
              for (let l = 0; l < fbinArr[i][j][k].length; l++) {
                const v1 = fbinArr[i][j][k][l];
                const v2 = debugFbin[i][j][k * fbinArr[i][j].length + l];
                if (Math.abs(v1 - v2) > 0.001) {
                  console.log('incorrect', i, j, k, l, 'values: ', v1, v2);
                } else {
                  correctCount += 1;
                }
              }
            }
          }
        }
        console.log(label, "correct: " + correctCount);
      }
      //verify('fbin', fbin.arraySync(), globalDebug.fbins[d].toArray());
      //verify('magnitude', magnitude.arraySync(), globalDebug.magnitudes[d].toArray());
      //globalDebug.compareImage('histograms', histograms.arraySync(), globalDebug.histograms[d].toArray(), 0.01);
    }
    return combinedHistograms;
  }

  _smoothHistograms(histograms) {
    const numBins = ORIENTATION_NUM_BINS;
    const firstCol = histograms.slice([0, 0, 0], [-1, -1, 1]);
    const lastCol = histograms.slice([0, 0, histograms.shape[2]-1], [-1, -1, 1]);

    // TODO: cache
    const filter = tf.tensor2d([[0.274068619061197, 0.451862761877606, 0.274068619061197]]).expandDims(2).expandDims(3);
    let expandedHistogram = tf.concat([lastCol, histograms, firstCol], 2);

    const originalShape = expandedHistogram.shape;
    expandedHistogram = expandedHistogram.reshape([-1, numBins+2]).expandDims(2).expandDims(0);
    expandedHistogram = tf.conv2d(expandedHistogram, filter, 1, 'same')
    expandedHistogram = expandedHistogram.reshape(originalShape);

    expandedHistogram = expandedHistogram.slice([0, 0, 1], [-1, -1, expandedHistogram.shape[2]-2]);
    return expandedHistogram;
  }

  _computeGradient(gaussianImage, octave, scale) {
    // TODO: buildExtrema already computed this, can re-use?
    const dx = tf.conv2d(gaussianImage, tf.tensor2d([[-1, 0, 1]]).expandDims(2).expandDims(3), 1, 'same');
    const dy = tf.conv2d(gaussianImage, tf.tensor2d([[-1], [0], [1]]).expandDims(2).expandDims(3), 1, 'same');
    const mag = tf.sqrt(tf.square(dx).add(tf.square(dy)));
    const angle = tf.atan2(dy, dx).add(Math.PI);
    return {mag, angle};
  }

  _applyPrune(extremasResults, dogIndexes) {
    const nBuckets = NUM_BUCKETS_PER_DIMENSION * NUM_BUCKETS_PER_DIMENSION;

    const dogIndexList = [];
    const yList = [];
    const xList = [];
    const bucketScores = [];
    for (let i = 0; i < extremasResults.length; i++) {
      const extremaScores = extremasResults[i];

      const height = extremaScores.shape[0];
      const width = extremaScores.shape[1];

      const bucketWidth = Math.ceil(width / NUM_BUCKETS_PER_DIMENSION);
      const bucketHeight = Math.ceil(height / NUM_BUCKETS_PER_DIMENSION);
      const bucketWidthF = width / NUM_BUCKETS_PER_DIMENSION;
      const bucketHeightF = height / NUM_BUCKETS_PER_DIMENSION;
      // TODO: cache indices
      let indices = [];
      for (let bucketY = 0; bucketY < NUM_BUCKETS_PER_DIMENSION; bucketY++) {
        //const startY = Math.floor(bucketY * bucketHeight);
        const startY = Math.floor(bucketY * bucketHeightF);
        const endY = Math.floor((1+bucketY) * bucketHeightF);
        for (let bucketX = 0; bucketX < NUM_BUCKETS_PER_DIMENSION; bucketX++) {
          //const startX = Math.floor(bucketX * bucketWidth);
          const startX = Math.floor(bucketX * bucketWidthF);
          const endX = Math.floor((1+bucketX) * bucketWidthF);
          const loc = [];
          for (let ii = 0; ii < bucketWidth; ii++) {
            for (let jj = 0; jj < bucketHeight; jj++) {
              if (startY + jj < endY && startX + ii < endX) {
                loc.push([startY + jj, startX + ii]);
              } else {
                loc.push([-1, -1]);
              }
            }
          }
          indices.push(loc);
        }
      }
      indices = tf.tensor(indices, [nBuckets, bucketWidth * bucketHeight, 2], 'int32');

      bucketScores.push(tf.gatherND(extremaScores, indices).squeeze());
      dogIndexList.push(tf.fill([nBuckets, bucketWidth * bucketHeight], dogIndexes[i]));
      const [y, x] = tf.split(indices, [1,1], 2);
      yList.push(y);
      xList.push(x);
    }
    const allBucketScores = tf.concat(bucketScores, 1);
    const allBucketScoresAbs = allBucketScores.abs();
    const allDogIndexes = tf.concat(dogIndexList, 1);
    const allX = tf.concat(xList, 1).squeeze();
    const allY = tf.concat(yList, 1).squeeze();

    let {values: topValues, indices: topIndices} = tf.topk(allBucketScoresAbs, MAX_FEATURES_PER_BUCKET);
    let x = tf.range(0, nBuckets, 1, 'int32').reshape([nBuckets, 1]).tile([1, MAX_FEATURES_PER_BUCKET]);
    topIndices = tf.stack([x, topIndices], 2);

    const topScores = tf.gatherND(allBucketScores, topIndices);
    let topDogIndex = tf.gatherND(allDogIndexes, topIndices);
    topDogIndex = tf.where(topScores.abs().greater(0), topDogIndex, 0);

    const topOctave = topDogIndex.floorDiv(PYRAMID_NUM_SCALES_PER_OCTAVES-1);
    const top2PowOctave = tf.fill(topOctave.shape, 2).pow(topOctave);
    const top2PowOctaveMin1 = tf.fill(topOctave.shape, 2).pow(topOctave.sub(1));

    const topScale = topDogIndex.mod(PYRAMID_NUM_SCALES_PER_OCTAVES-1); // TODO: must be zero?
    const topXIndex = tf.gatherND(allX, topIndices);
    const topYIndex = tf.gatherND(allY, topIndices);

    //console.log("top octave", topOctave.arraySync());
    //console.log("top 2 pow octave", top2PowOctave.arraySync());
    //console.log("top 2 pow octave min 1", top2PowOctaveMin1.arraySync());
    //console.log("top scale", topScale.arraySync());
    //console.log("top x index", topXIndex.arraySync());
    //console.log("top y index", topYIndex.arraySync());

    let topX = topXIndex.mul(top2PowOctave).add(top2PowOctaveMin1).sub(0.5);
    topX = tf.where(topScores.abs().greater(0), topX, 0);
    let topY = topYIndex.mul(top2PowOctave).add(top2PowOctaveMin1).sub(0.5);
    topY = tf.where(topScores.abs().greater(0), topY, 0);

    const mK = Math.pow(2, 1.0 / (PYRAMID_NUM_SCALES_PER_OCTAVES-1));
    let topSigma = tf.fill(topDogIndex.shape, mK).pow(topScale).mul(top2PowOctave); // TODO: topScale always 0?
    topSigma = tf.where(topScores.abs().greater(0), topSigma, 0);

    //console.log("top scores", topScores.arraySync());
    //console.log("top sigma", topSigma.arraySync());
    //console.log("top x", topX.arraySync());
    //console.log("top y", topY.arraySync());
    //console.log("top dog index", topDogIndex.arraySync());

    const topScoresArray = topScores.arraySync();
    const topSigmaArray = topSigma.arraySync();
    const topXArray = topX.arraySync();
    const topYArray = topY.arraySync();
    const topDogIndexArray = topDogIndex.arraySync();
    const combine = [];
    for (let i = 0; i < topScoresArray.length; i++) {
      combine.push([]);
      for (let j = 0; j < topScoresArray[i].length; j++) {
        combine[i].push([]);

        if (Math.abs(topScoresArray[i][j]) > 0) {
          combine[i][j].push(
            topScoresArray[i][j],
            topSigmaArray[i][j],
            topXArray[i][j],
            topYArray[i][j],
            topDogIndexArray[i][j],
          );
        } else {
          combine[i][j].push(0,0,0,0,0);
        }
      }
    }

    console.log("combine: ", combine);
    console.log("debug pruned: ", globalDebug.prunedExtremas[globalDebug.prunedExtremas.length-1].toArray());

    globalDebug.compareImage('prune', combine, globalDebug.prunedExtremas[globalDebug.prunedExtremas.length-1].toArray());

    return {dogIndex: topDogIndex, sigma: topSigma, octave: topOctave, x: topXIndex, y: topYIndex, originalX: topX, originalY: topY};
  }

  _buildExtremas(image0, image1, image2, octave, scale, startI, startJ, endI, endJ) {
    const originalWidth = this.width;
    const originalHeight = this.height;
    const dogNumScalesPerOctaves = PYRAMID_NUM_SCALES_PER_OCTAVES - 1;
    const width = image1.shape[2];
    const height = image1.shape[1];

    // TODO: pre-build and reuse
    let filterEdgeArr = [];
    for (let j = 0; j < height; j++) {
      filterEdgeArr[j] = [];
      for (let i = 0; i < width; i++) {
        filterEdgeArr[j][i] = !(i < startI || i >= endI || j < startJ || j >= endJ);
      }
    }
    const filterEdge = tf.tensor2d(filterEdgeArr, [height, width], 'bool').expandDims(2).expandDims(0);

    const negImage0 = image0.mul(-1);
    const negImage1 = image1.mul(-1);
    const negImage2 = image2.mul(-1);
    const image1Square = image1.mul(image1);
    const max0 = tf.pool(image0, [3,3], 'max', 'same');
    const max1 = tf.pool(image1, [3,3], 'max', 'same');
    const max2 = tf.pool(image2, [3,3], 'max', 'same');
    const min0 = tf.pool(negImage0, [3,3], 'max', 'same');
    const min1 = tf.pool(negImage1, [3,3], 'max', 'same');
    const min2 = tf.pool(negImage2, [3,3], 'max', 'same');
    const isMax0 = max0.lessEqual(image1);
    const isMax1 = max1.lessEqual(image1);
    const isMax2 = max2.lessEqual(image1);
    const isMin0 = min0.lessEqual(negImage1);
    const isMin1 = min1.lessEqual(negImage1);
    const isMin2 = min2.lessEqual(negImage1);
    const isMax = isMax0.logicalAnd(isMax1).logicalAnd(isMax2);
    const isMin = isMin0.logicalAnd(isMin1).logicalAnd(isMin2);
    const filterLaplacianThreshold = image1Square.greater(LAPLACIAN_SQR_THRESHOLD);

    let isExtrema = (isMax.logicalOr(isMin)).logicalAnd(filterEdge).logicalAnd(filterLaplacianThreshold);

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
    const det = dxx.mul(dyy).sub( dxy.mul(dxy) )
    isExtrema = isExtrema.logicalAnd(det.abs().greater(0.0001));

    const edgeScore = ((dxx.add(dyy)).mul(dxx.add(dyy))).div(det);
    isExtrema = isExtrema.logicalAnd(edgeScore.abs().lessEqual(EDGE_HESSIAN_THRESHOLD));

    const score = image1.sub(b0.mul(u0).add(b1.mul(u1)).add(b2.mul(u2)));
    isExtrema = isExtrema.logicalAnd(score.mul(score).greaterEqual(LAPLACIAN_SQR_THRESHOLD));

    return tf.where(isExtrema, score, 0).squeeze();
  }

  _differenceImageBinomial(image1, image2) {
    return image1.sub(image2);
  }

  _applyFilter(image) {
    let filter = tf.tensor2d([
      [1, 4, 6, 4, 1],
      [4, 16, 24, 16, 4],
      [6, 24, 36, 24, 6],
      [4, 16, 24, 16, 4],
      [1,  4,  6,  4, 1],
    ]).expandDims(2).expandDims(3);
    let ret = tf.conv2d(image, filter, [1,1], 'same');
    ret = ret.div(256);
    return ret;
  }

  _downsampleBilinear(image) {
    let filter = tf.tensor2d([
      [0.25, 0.25],
      [0.25, 0.25],
    ]).expandDims(2).expandDims(3);
    let ret = tf.conv2d(image, filter, [2,2], 'valid');
    return ret;
  }
}

module.exports = {
  Detector
};
