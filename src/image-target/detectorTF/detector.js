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

class Detector {
  constructor(width, height) {
    this.width = width;
    this.height = height;

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

      globalDebug.compareImage('inputimage: ', globalDebug.inputImage, inputImage.squeeze().arraySync());

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

        globalDebug.compareImage('image0' +debugIndex, globalDebug.image0s[debugIndex], image0.squeeze().arraySync());
        globalDebug.compareImage('extream result image ' +debugIndex, globalDebug.extremasResults[debugIndex], extremasResult.squeeze().arraySync());
        debugIndex += 1;

        // combine this extrema with the existing
        //prunedExtremas = this._applyPrune(k, prunedExtremas, extremasResult, image1.width, image1.height, octave, scale);
        extremasResults.push(extremasResult);
      }

      this._applyPrune(extremasResults, dogIndexes);
    });

    console.table(tf.memory());
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
      // TODO: cache indices
      let indices = [];
      for (let bucketY = 0; bucketY < NUM_BUCKETS_PER_DIMENSION; bucketY++) {
        const startY = Math.floor(bucketY * bucketHeight);
        for (let bucketX = 0; bucketX < NUM_BUCKETS_PER_DIMENSION; bucketX++) {
          const startX = Math.floor(bucketX * bucketWidth);
          const loc = [];
          for (let ii = 0; ii < bucketWidth; ii++) {
            for (let jj = 0; jj < bucketHeight; jj++) {
              loc.push([startY + jj, startX + ii]);
            }
          }
          indices.push(loc);
        }
      }
      indices = tf.tensor(indices, [nBuckets, bucketWidth * bucketHeight, 2], 'int32');

      bucketScores.push(tf.gatherND(extremaScores, indices).squeeze());
      dogIndexList.push(tf.fill([nBuckets, bucketWidth * bucketHeight], dogIndexes[i]));
      const [x, y] = tf.split(indices, [1,1], 2);
      xList.push(x);
      yList.push(y);
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
    const topDogIndex = tf.gatherND(allDogIndexes, topIndices);
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

    const topX = topXIndex.mul(top2PowOctave).add(top2PowOctaveMin1).sub(0.5);
    const topY = topYIndex.mul(top2PowOctave).add(top2PowOctaveMin1).sub(0.5);

    const mK = Math.pow(2, 1.0 / (PYRAMID_NUM_SCALES_PER_OCTAVES-1));
    const topSigma = tf.fill(topDogIndex.shape, mK).pow(topScale).mul(top2PowOctave); // TODO: topScale always 0?

    console.log("top scores", topScores.arraySync());
    console.log("top sigma", topSigma.arraySync());
    console.log("top x", topX.arraySync());
    console.log("top y", topY.arraySync());
    console.log("top dog index", topDogIndex.arraySync());

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

        if (topScoresArray[i][j] > 0) {
          combine[i][j].push(
            topScoresArray[i][j],
            topSigmaArray[i][j],
            topYArray[i][j],
            topXArray[i][j],
            topDogIndexArray[i][j],
          );
        } else {
          combine[i][j].push([0,0,0,0,0]);
        }
      }
    }

    console.log("combine: ", combine);
    console.log("debug pruned: ", globalDebug.prunedExtremas[globalDebug.prunedExtremas.length-1].toArray());

    globalDebug.compareImage('prune', combine, globalDebug.prunedExtremas[globalDebug.prunedExtremas.length-1].toArray());
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
