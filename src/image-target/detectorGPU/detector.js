// Deprecated  GPU.js version - only keep temporarily for reference
const {GPU} = require('gpu.js');

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

    let numOctaves = 0;
    while (width >= PYRAMID_MIN_SIZE && height >= PYRAMID_MIN_SIZE) {
      width /= 2;
      height /= 2;
      numOctaves++;
    }
    this.numOctaves = numOctaves;
    this.kernels = [];
    this.gpu = new GPU({mode: "webgl"});
    this.inputKernel = null;
  }

  detect(input) {
    if (this.inputKernel === null) {
      this.inputKernel = this.gpu.createKernel(function(inputFrame) {
        const pixel = inputFrame[this.constants.height-1-Math.floor(this.thread.x / this.constants.width)][this.thread.x % this.constants.width];
        //return (pixel[0] + pixel[1] + pixel[2]) * 255 / 3;
        // https://stackoverflow.com/questions/596216/formula-to-determine-brightness-of-rgb-color/596241#596241
        return 255 * (0.2126 * pixel[0] + 0.7152 * pixel[1] + 0.0722 * pixel[2]);
      }, {
        constants: {width: this.width, height: this.height},
        output: [this.width * this.height],
        pipeline: true,
      })
    }
    const result = this.inputKernel(input);
    return this.detectImageData(result);
  }

  detectImageData(imagedata) {
    this.kernelIndex = 0; // reset kernelIndex

    const inputImage = {width: this.width, height: this.height, data: imagedata};
    //globalDebug.inputImage = globalDebug.convertImage(inputImage);

    const originalWidth = this.width;
    const originalHeight = this.height;
    const numOctaves = this.numOctaves;

    // Build gaussian pyramid images
    const pyramidImages = [];
    for (let i = 0; i < numOctaves; i++) {
      if (i === 0) {
        pyramidImages.push(this._applyFilter(inputImage));
      } else {
        // first image of each octave, downsample from previous
        pyramidImages.push(this._downsampleBilinear(pyramidImages[pyramidImages.length-1]));
      }

      // remaining images of octave, 4th order binomail from previous
      for (let j = 0; j < PYRAMID_NUM_SCALES_PER_OCTAVES - 1; j++) {
        pyramidImages.push(this._applyFilter(pyramidImages[pyramidImages.length-1]));
      }
    }

    //globalDebug.pyramidImages = pyramidImages.map((image) => globalDebug.convertImage(image));

    // Build difference of gaussian pyramid
    const dogPyramidImages = [];
    for (let i = 0; i < numOctaves; i++) {
      for (let j = 0; j < PYRAMID_NUM_SCALES_PER_OCTAVES - 1; j++) {
        const image1 = pyramidImages[i * PYRAMID_NUM_SCALES_PER_OCTAVES + j];
        const image2 = pyramidImages[i * PYRAMID_NUM_SCALES_PER_OCTAVES + j + 1];
        dogPyramidImages.push(this._differenceImageBinomial(image1, image2));
      }
    }

    //globalDebug.dogPyramidImages = dogPyramidImages.map((image) => globalDebug.convertImage(image));

    //globalDebug.extremasResults = [];
    //globalDebug.image0s = [];
    //globalDebug.prunedExtremas = [];

    let prunedExtremas = this._initializePrune();

    // Find feature points (i.e. extremas in dog images)
    for (let k = 1; k < dogPyramidImages.length - 1; k++) {
      // Experimental result shows that no extrema is possible for odd number of k
      // I believe it has something to do with how the gaussian pyramid being constructed
      if (k % 2 === 1) continue;

      let image0 = dogPyramidImages[k-1];
      let image1 = dogPyramidImages[k];
      let image2 = dogPyramidImages[k+1];

      const octave = Math.floor(k / (PYRAMID_NUM_SCALES_PER_OCTAVES-1));
      const scale = k % (PYRAMID_NUM_SCALES_PER_OCTAVES-1);

      let hasUpsample = false;
      let hasPadOneWidth = false;
      let hasPadOneHeight = false;

      if ( Math.floor(image0.width/2) == image1.width) {
        image0 = this._downsampleBilinear(image0);
      }
      if ( Math.floor(image1.width/2) == image2.width) {
        hasUpsample = true;
        hasPadOneWidth = image1.width % 2 === 1;
        hasPadOneHeight = image1.height % 2 === 1;
        image2 = this._upsampleBilinear(image2, hasPadOneWidth, hasPadOneHeight);
      }

      // In upsample image, ignore the border
      // it's possible to further pad one more line (i.e. upsacale 2x2 -> 5x5), so ignore one more line
      let startI = hasUpsample? 2: 1;
      let startJ = startI;

      // should it be "image1.width -2" ? but this yield consistent result with artoolkit
      let endI = hasUpsample? image1.width - 3: image1.width - 1;
      let endJ = hasUpsample? image1.height - 3: image1.height - 1;
      if (hasPadOneWidth) endI -= 1;
      if (hasPadOneHeight) endJ -= 1;

      // find all extrema for image1
      const extremasResult = this._buildExtremas(image0, image1, image2, octave, scale, startI, startJ, endI, endJ);

      /*
      globalDebug.extremasResults.push(
        globalDebug.convertImage({width: image1.width, height: image1.height, data: extremasResult.toArray()})
      );
      globalDebug.image0s.push(globalDebug.convertImage(image0));
      */

      // combine this extrema with the existing
      prunedExtremas = this._applyPrune(k, prunedExtremas, extremasResult, image1.width, image1.height, octave, scale);

      //globalDebug.prunedExtremas.push(prunedExtremas);
    }

    //console.log("prunedExtremas", prunedExtremas.toArray());

    //globalDebug.gradients = [];
    //globalDebug.fbins = [];
    //globalDebug.magnitudes = [];
    //globalDebug.histograms = [];

    // compute the orientation angle of the extrema
    //  artoolkit picks mutiple angles (usually 1-3), but we pick one only for simplicity
    let extremaHistograms = this._initializeHistograms();
    for (let k = 1; k < dogPyramidImages.length - 1; k++) {
      if (k % 2 === 1) continue;

      const octave = Math.floor(k / (PYRAMID_NUM_SCALES_PER_OCTAVES-1));
      const scale = k % (PYRAMID_NUM_SCALES_PER_OCTAVES-1);
      const gaussianIndex = octave * PYRAMID_NUM_SCALES_PER_OCTAVES + scale;
      const gaussianImage = pyramidImages[gaussianIndex]

      const gradientResult = this._computeGradients(gaussianImage);

      /*
      globalDebug.gradients.push({
        mag: globalDebug.convertImage({width: dogPyramidImages[k].width, height: dogPyramidImages[k].height, data: gradientResult.saveMag.toArray()}),
        angle: globalDebug.convertImage({width: dogPyramidImages[k].width, height: dogPyramidImages[k].height, data: gradientResult.result.toArray()}),
      });
      */

      extremaHistograms = this._computeOrientationHistograms(extremaHistograms, gradientResult, prunedExtremas, k, gaussianImage.width, gaussianImage.height);

      //console.log("pruned extremas: ", prunedExtremas.toArray());

      //const extremaHistograms2 = this._computeOrientationHistograms2(extremaHistograms, gradientResult, prunedExtremas, k, gaussianImage.width, gaussianImage.height);


      /*
      const arr1 = extremaHistograms.toArray();
      const arr2 = extremaHistograms2.toArray();
      let correct = 0;
      for (let ii = 0; ii < arr1.length; ii++) {
        for (let jj = 0; jj < arr1[ii].length; jj++) {
          for (let kk = 0; kk < arr1[ii][jj].length; kk++) {
            if ( Math.abs(arr1[ii][jj][kk] - arr2[ii][jj][kk]) < 0.001) {
              correct += 1;
            } else {
              console.log("incorrect: ", arr1[ii][jj][kk], arr2[ii][jj][kk]);
            }
          }
        }
      }
      console.log("extrema correct: " + correct);
      */
    }

    //globalDebug.extremaHistograms = extremaHistograms.toArray();

    extremaHistograms = this._smoothHistograms(extremaHistograms);
    //globalDebug.smoothedExtremaHistograms = extremaHistograms.toArray();

    const extremaAngles = this._computeExtremaAngles(extremaHistograms);
    //globalDebug.extremaAngles = extremaAngles.toArray();

    // compute the FREAK descriptors for extremas
    const extremaFreaks = this._computeExtremaFreak(pyramidImages, numOctaves, prunedExtremas, extremaAngles);

    const freakDescriptors = this._computeFreakDescriptors(extremaFreaks);
    //globalDebug.freakDescriptors = freakDescriptors.toArray();

    // combine all needed data and return to CPU together
    const combinedExtremas = this._combine(prunedExtremas, freakDescriptors);

    const combinedExtremasArr = combinedExtremas.toArray();

    const featurePoints = [];
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

    return featurePoints;
  }

  _initializePrune() {
    if (this.kernelIndex === this.kernels.length) {
      this.kernels.push(
        this.gpu.createKernel(function() {
          return 0;
        }, {
          output: [5, MAX_FEATURES_PER_BUCKET, NUM_BUCKETS], // first dimension: [score, sigma, x, y, dogIndex]
          pipeline: true,
        })
      )
    }
    const kernel = this.kernels[this.kernelIndex++];
    const result = kernel();
    return result;
  }

  // combine necessary information to return to cpu
  // first dimension: [score, x, y, freak1, freak2, ..., freak37]
  _combine(prunedExtremas, freakDescriptors) {
    if (this.kernelIndex === this.kernels.length) {
      this.kernels.push(
        this.gpu.createKernel(function(prunedExtremas, freakDescriptors) {
          if (this.thread.x === 0) {
            return prunedExtremas[this.thread.z][this.thread.y][0];
          } else if (this.thread.x <= 2) {
            return prunedExtremas[this.thread.z][this.thread.y][this.thread.x + 1];
          }
          return freakDescriptors[this.thread.z][this.thread.y][this.thread.x-3];
        }, {
          output: [3 + FREAK_CONPARISON_COUNT, MAX_FEATURES_PER_BUCKET, NUM_BUCKETS],
          pipeline: true,
        })
      )
    }
    const kernel = this.kernels[this.kernelIndex++];
    const result = kernel(prunedExtremas, freakDescriptors);
    return result;
  }

  _initializeHistograms() {
    if (this.kernelIndex === this.kernels.length) {
      this.kernels.push(
        this.gpu.createKernel(function() {
          return 0;
        }, {
          output: [ORIENTATION_NUM_BINS, MAX_FEATURES_PER_BUCKET, NUM_BUCKETS],
          pipeline: true,
        })
      )
    }
    const kernel = this.kernels[this.kernelIndex++];
    const result = kernel();
    return result;
  }

  _computeOrientationHistograms2(extremaHistograms, gradientResult, prunedExtremas, dogIndex, width, height) {
    const dogNumScalesPerOctaves = PYRAMID_NUM_SCALES_PER_OCTAVES - 1;

    const octave = Math.floor(dogIndex / (PYRAMID_NUM_SCALES_PER_OCTAVES-1));
    const scale = dogIndex % (PYRAMID_NUM_SCALES_PER_OCTAVES-1);
    const mK = Math.pow(2, 1.0 / dogNumScalesPerOctaves);
    const originalSigma = Math.pow(mK, scale) * (1 << octave);
    const octaveFactor = 1.0 / Math.pow(2, octave);
    const sigma = originalSigma * octaveFactor;

    const gaussianExpansionFactor = ORIENTATION_GAUSSIAN_EXPANSION_FACTOR;
    const regionExpansionFactor = ORIENTATION_REGION_EXPANSION_FACTOR;
    const gwSigma = Math.max(1.0, gaussianExpansionFactor * sigma);
    const gwScale = -1.0 / (2 * gwSigma * gwSigma);

    const radius = regionExpansionFactor * gwSigma;
    const radiusCeil = Math.ceil(radius);
    const radius2 = Math.ceil(radius * radius - 0.5);

    if (this.kernelIndex === this.kernels.length) {
      const subKernels = [];
      subKernels.push(
        this.gpu.createKernel(function(extremaHistograms, gradientMags, gradientAngles, prunedExtremas) {
          const dogIndex = this.constants.dogIndex;
          const octave = this.constants.octave;
          const scale = this.constants.scale;
          const numBins = this.constants.numBins;
          const width = this.constants.width;
          const height = this.constants.height;
          const oneOver2PI = 0.159154943091895;
          const gaussianExpansionFactor = this.constants.gaussianExpansionFactor;
          const regionExpansionFactor = this.constants.regionExpansionFactor;
          const dogNumScalesPerOctaves = this.constants.dogNumScalesPerOctaves;
          const radius = this.constants.radius;
          const radiusCeil = this.constants.radiusCeil;
          const gwScale = this.constants.gwScale;
          const radius2 = Math.ceil(radius * radius - 0.5);

          const bucketPointIndex = this.thread.y;
          const bucketIndex = this.thread.z;
          const originalX = prunedExtremas[bucketIndex][bucketPointIndex][2];
          const originalY = prunedExtremas[bucketIndex][bucketPointIndex][3];

          const thisDogIndex = prunedExtremas[bucketIndex][bucketPointIndex][4];
          if (Math.abs(dogIndex - thisDogIndex) > 0.1) {
            return 0;
          }

          const octaveFactor = 1.0 / Math.pow(2, octave);
          const x = Math.floor(originalX * octaveFactor + 0.5 * octaveFactor);
          const y = Math.floor(originalY * octaveFactor + 0.5 * octaveFactor);

          //const x = this.thread.y;
          //const y = this.thread.z;

          const xoffset = this.thread.x % (2*radiusCeil+1);
          const yoffset = Math.floor(this.thread.x / (2*radiusCeil+1));

          const xp = x - radiusCeil + xoffset;
          const yp = y - radiusCeil + yoffset;

          if (xp < 0 || xp >= width || yp < 0 || yp >= height) return 0;

          const mag = gradientMags[yp * width + xp];
          const angle = gradientAngles[yp * width + xp];

          const dy = yp - y;
          const dx = xp - x;
          const dy2 = dy * dy;
          const dx2 = dx * dx;
          const r2 = dx2 + dy2;

          if (r2 > radius2) return 0;

          const _x = r2 * gwScale;
          const w = (720+_x*(720+_x*(360+_x*(120+_x*(30+_x*(6+_x))))))*0.0013888888;

          const fbin  = numBins * angle * oneOver2PI;
          return fbin;
         }, {
          constants: {
            dogIndex: dogIndex,
            octave: Math.floor(dogIndex / (PYRAMID_NUM_SCALES_PER_OCTAVES-1)),
            scale: dogIndex % (PYRAMID_NUM_SCALES_PER_OCTAVES-1),
            numBins: ORIENTATION_NUM_BINS,
            width: width,
            height: height,
            gaussianExpansionFactor: ORIENTATION_GAUSSIAN_EXPANSION_FACTOR,
            regionExpansionFactor: ORIENTATION_REGION_EXPANSION_FACTOR,
            dogNumScalesPerOctaves: dogNumScalesPerOctaves,
            radius: radius,
            radiusCeil: radiusCeil,
            gwScale: gwScale,
          },
          //output: [ (2*radiusCeil+1)*(2*radiusCeil+1), width, height],
          output: [(2*radiusCeil+1)*(2*radiusCeil+1), MAX_FEATURES_PER_BUCKET, NUM_BUCKETS],
          pipeline: true,
        })
      );

      subKernels.push(
        this.gpu.createKernel(function(extremaHistograms, gradientMags, gradientAngles, prunedExtremas) {
          const dogIndex = this.constants.dogIndex;
          const octave = this.constants.octave;
          const scale = this.constants.scale;
          const numBins = this.constants.numBins;
          const width = this.constants.width;
          const height = this.constants.height;
          const oneOver2PI = 0.159154943091895;
          const gaussianExpansionFactor = this.constants.gaussianExpansionFactor;
          const regionExpansionFactor = this.constants.regionExpansionFactor;
          const dogNumScalesPerOctaves = this.constants.dogNumScalesPerOctaves;
          const radius = this.constants.radius;
          const radiusCeil = this.constants.radiusCeil;
          const gwScale = this.constants.gwScale;
          const radius2 = Math.ceil(radius * radius - 0.5);

          const bucketPointIndex = this.thread.y;
          const bucketIndex = this.thread.z;
          const originalX = prunedExtremas[bucketIndex][bucketPointIndex][2];
          const originalY = prunedExtremas[bucketIndex][bucketPointIndex][3];
          const octaveFactor = 1.0 / Math.pow(2, octave);
          const x = Math.floor(originalX * octaveFactor + 0.5 * octaveFactor);
          const y = Math.floor(originalY * octaveFactor + 0.5 * octaveFactor);

          const thisDogIndex = prunedExtremas[bucketIndex][bucketPointIndex][4];
          if (Math.abs(dogIndex - thisDogIndex) > 0.1) {
            return 0;
          }

          //const x = this.thread.y;
          //const y = this.thread.z;

          const xoffset = this.thread.x % (2*radiusCeil+1);
          const yoffset = Math.floor(this.thread.x / (2*radiusCeil+1));

          const xp = x - radiusCeil + xoffset;
          const yp = y - radiusCeil + yoffset;
          if (xp < 0 || xp >= width || yp < 0 || yp >= height) return 0;

          const mag = gradientMags[yp * width + xp];
          const angle = gradientAngles[yp * width + xp];

          const dy = yp - y;
          const dx = xp - x;
          const dy2 = dy * dy;
          const dx2 = dx * dx;
          const r2 = dx2 + dy2;

          if (r2 > radius2) return 0;

          const _x = r2 * gwScale;

          const w = (720+_x*(720+_x*(360+_x*(120+_x*(30+_x*(6+_x))))))*0.0013888888;
          const magnitude = w * mag;
          return magnitude;
         }, {
          constants: {
            dogIndex: dogIndex,
            octave: Math.floor(dogIndex / (PYRAMID_NUM_SCALES_PER_OCTAVES-1)),
            scale: dogIndex % (PYRAMID_NUM_SCALES_PER_OCTAVES-1),
            numBins: ORIENTATION_NUM_BINS,
            width: width,
            height: height,
            gaussianExpansionFactor: ORIENTATION_GAUSSIAN_EXPANSION_FACTOR,
            regionExpansionFactor: ORIENTATION_REGION_EXPANSION_FACTOR,
            dogNumScalesPerOctaves: dogNumScalesPerOctaves,
            radius: radius,
            radiusCeil: radiusCeil,
            gwScale: gwScale,
          },
          //output: [ (2*radiusCeil+1)*(2*radiusCeil+1), width, height],
          output: [(2*radiusCeil+1)*(2*radiusCeil+1), MAX_FEATURES_PER_BUCKET, NUM_BUCKETS],
          pipeline: true,
        })
      );

      subKernels.push(
        this.gpu.createKernel(function(fbins, magnitudes) {
          const depth = this.constants.depth;
          const numBins = this.constants.numBins;
          const y = this.thread.z;
          const x = this.thread.y;

          let sum = 0;
          for (let i = 0; i < this.constants.depth; i++) {
            const index = i;
            const fbin = fbins[this.thread.z][this.thread.y][i];
            const magnitude = magnitudes[this.thread.z][this.thread.y][i];
            const bin = Math.floor(fbin - 0.5);
            const w2 = fbin - bin - 0.5;
            const w1 = (1.0 - w2);
            const b1 = (bin + numBins) % numBins;
            const b2 = (bin + 1) % numBins;
            if (b1 === this.thread.x) sum += w1 * magnitude;
            if (b2 === this.thread.x) sum += w2 * magnitude;
          }
          return sum;
        }, {
          constants: {
            numBins: ORIENTATION_NUM_BINS,
            depth: (2*radiusCeil+1) * (2*radiusCeil+1)
          },
          //output: [ORIENTATION_NUM_BINS, width, height],
          output: [ORIENTATION_NUM_BINS, MAX_FEATURES_PER_BUCKET, NUM_BUCKETS],
          pipeline: true,
        })
      );

      subKernels.push(
        this.gpu.createKernel(function(extremaHistograms, prunedExtremas, histograms) {
          const dogIndex = this.constants.dogIndex;
          const octave = this.constants.octave;
          const bucketPointIndex = this.thread.y;
          const bucketIndex = this.thread.z;

          const thisDogIndex = prunedExtremas[bucketIndex][bucketPointIndex][4];
          if (Math.abs(dogIndex - thisDogIndex) > 0.1) {
            return extremaHistograms[this.thread.z][this.thread.y][this.thread.x];
          }
          return histograms[this.thread.z][this.thread.y][this.thread.x];

          /*
          const originalX = prunedExtremas[bucketIndex][bucketPointIndex][2];
          const originalY = prunedExtremas[bucketIndex][bucketPointIndex][3];
          const octaveFactor = 1.0 / Math.pow(2, octave);
          const x = Math.floor(originalX * octaveFactor + 0.5 * octaveFactor);
          const y = Math.floor(originalY * octaveFactor + 0.5 * octaveFactor);

          return histograms[y][x][this.thread.x];
          */
        }, {
          constants: {
            dogIndex: dogIndex,
            octave: Math.floor(dogIndex / (PYRAMID_NUM_SCALES_PER_OCTAVES-1)),
          },
          output: [ORIENTATION_NUM_BINS, MAX_FEATURES_PER_BUCKET, NUM_BUCKETS],
          pipeline: true,
        })
      )
      this.kernels.push(subKernels);
    }
    const gradientMags = gradientResult.saveMag;
    const gradientAngles = gradientResult.result;

    const kernel = this.kernels[this.kernelIndex++];
    const fbins= kernel[0](extremaHistograms, gradientMags, gradientAngles, prunedExtremas);

    //globalDebug.fbins.push(fbins);

    //console.log("fbins: ", fbins.toArray());
    const magnitudes= kernel[1](extremaHistograms, gradientMags, gradientAngles, prunedExtremas);

    //globalDebug.magnitudes.push(magnitudes);

    //console.log("magnitudes: ", magnitudes.toArray());
    const histograms= kernel[2](fbins, magnitudes);

    //globalDebug.histograms.push(histograms);

    //console.log("histograms: ", histograms.toArray());
    const newExtremaHistograms= kernel[3](extremaHistograms, prunedExtremas, histograms);
    //console.log("newExtremaHistograms: ", newExtremaHistograms.toArray());
    return newExtremaHistograms;
    //const result = {fbins, magnitudes, histograms};
    //return result;
  }

  _computeOrientationHistograms(extremaHistograms, gradientResult, prunedExtremas, dogIndex, width, height) {
    if (this.kernelIndex === this.kernels.length) {
      this.kernels.push(
        this.gpu.createKernel(function(extremaHistograms, gradientMags, gradientAngles, prunedExtremas) {
          const dogIndex = this.constants.dogIndex;
          const bucketPointIndex = this.thread.y;
          const bucketIndex = this.thread.z;

          const thisDogIndex = prunedExtremas[bucketIndex][bucketPointIndex][4];
          //if (dogIndex !== thisDogIndex) {
          if (Math.abs(dogIndex - thisDogIndex) > 0.1) {
            return extremaHistograms[this.thread.z][this.thread.y][this.thread.x];
          }

          const octave = this.constants.octave;
          const scale = this.constants.scale;
          const numBins = this.constants.numBins;
          const width = this.constants.width;
          const height = this.constants.height;
          const oneOver2PI = 0.159154943091895;
          const gaussianExpansionFactor = this.constants.gaussianExpansionFactor;
          const regionExpansionFactor = this.constants.regionExpansionFactor;

          const histogramIndex = this.thread.x;

          const originalSigma = prunedExtremas[bucketIndex][bucketPointIndex][1];
          const originalX = prunedExtremas[bucketIndex][bucketPointIndex][2];
          const originalY = prunedExtremas[bucketIndex][bucketPointIndex][3];

          // x, y, sigma in current octave
          const octaveFactor = 1.0 / Math.pow(2, octave);
          const x = Math.floor(originalX * octaveFactor + 0.5 * octaveFactor);
          const y = Math.floor(originalY * octaveFactor + 0.5 * octaveFactor);
          const sigma = originalSigma * octaveFactor;

          const gwSigma = Math.max(1.0, gaussianExpansionFactor * sigma);
          const gwScale = -1.0 / (2 * gwSigma * gwSigma);

          const radius = regionExpansionFactor * gwSigma;
          const radius2 = Math.ceil(radius * radius - 0.5);

          const x0 = Math.max(0, x - Math.floor(radius + 0.5));
          const x1 = Math.min(width-1, x + Math.floor(radius + 0.5));
          const y0 = Math.max(0, y - Math.floor(radius + 0.5));
          const y1 = Math.min(height-1, y + Math.floor(radius + 0.5));

          let sum = 0;

          for (let yp = y0; yp <= y1; yp++) {
            const dy = yp - y;
            const dy2 = dy * dy;
            for (let xp = x0; xp <= x1; xp++) {
              const dx = xp - x;
              const dx2 = dx * dx;
              const r2 = dx2 + dy2;

              if (r2 <= radius2) {
                const mag = gradientMags[yp * width + xp];
                const angle = gradientAngles[yp * width + xp];
                const _x = r2 * gwScale;

                /**
                 * fast Exp6
                 * 0.01% error at 1.030
                 * 0.10% error at 1.520
                 * 1.00% error at 2.330
                 * 5.00% error at 3.285
                 */
                const w = (720+_x*(720+_x*(360+_x*(120+_x*(30+_x*(6+_x))))))*0.0013888888;

                const fbin  = numBins * angle * oneOver2PI;
                const bin = Math.floor(fbin - 0.5);
                const w2 = fbin - bin - 0.5;
                const w1 = (1.0 - w2);
                const b1 = (bin + numBins) % numBins;
                const b2 = (bin + 1) % numBins;
                const magnitude = w * mag;

                if (b1 === this.thread.x) sum += w1 * magnitude;
                if (b2 === this.thread.x) sum += w2 * magnitude;
              }
            }
          }
          return sum;
        }, {
          constants: {
            dogIndex: dogIndex,
            octave: Math.floor(dogIndex / (PYRAMID_NUM_SCALES_PER_OCTAVES-1)),
            scale: dogIndex % (PYRAMID_NUM_SCALES_PER_OCTAVES-1),
            numBins: ORIENTATION_NUM_BINS,
            width: width,
            height: height,
            gaussianExpansionFactor: ORIENTATION_GAUSSIAN_EXPANSION_FACTOR,
            regionExpansionFactor: ORIENTATION_REGION_EXPANSION_FACTOR
          },
          output: [ORIENTATION_NUM_BINS, MAX_FEATURES_PER_BUCKET, NUM_BUCKETS],
          pipeline: true,
        })
      )
    }
    const kernel = this.kernels[this.kernelIndex++];
    const gradientMags = gradientResult.saveMag;
    const gradientAngles = gradientResult.result;
    const result = kernel(extremaHistograms, gradientMags, gradientAngles, prunedExtremas);
    return result;
  }

  _smoothHistograms(histograms) {
    if (this.kernelIndex === this.kernels.length) {
      const subkernels = [];
      for (let k = 0; k < ORIENTATION_SMOOTHING_ITERATIONS; k++) {
        subkernels.push(
          this.gpu.createKernel(function(histograms) {
            const numBins = this.constants.numBins;
            // The histogram is smoothed with a Gaussian, with sigma = 1
            return 0.274068619061197 * histograms[this.thread.z][this.thread.y][(this.thread.x - 1 + numBins) % numBins]
                 + 0.451862761877606 * histograms[this.thread.z][this.thread.y][this.thread.x]
                 + 0.274068619061197 * histograms[this.thread.z][this.thread.y][(this.thread.x + 1) % numBins];
          }, {
            constants: {numBins: ORIENTATION_NUM_BINS},
            output: [ORIENTATION_NUM_BINS, MAX_FEATURES_PER_BUCKET, NUM_BUCKETS],
            pipeline: true,
          })
        );
      }
      this.kernels.push(subkernels);
    }
    const subkernels = this.kernels[this.kernelIndex++];
    //for (let k = 0; k < ORIENTATION_SMOOTHING_ITERATIONS; k++) {
    for (let k = 0; k < 1; k++) {
      histograms = subkernels[k](histograms);
    }
    return histograms;
  }

  _computeExtremaAngles(histograms) {
    if (this.kernelIndex === this.kernels.length) {
      this.kernels.push(
        this.gpu.createKernel(function(histograms) {
          const numBins = this.constants.numBins;

          let maxIndex = 0;
          for (let i = 1; i < this.constants.numBins; i++) {
            if (histograms[this.thread.z][this.thread.y][i] > histograms[this.thread.z][this.thread.y][maxIndex]) {
              maxIndex = i;
            }
          }

          const prev = (maxIndex - 1 + numBins) % numBins;
          const next = (maxIndex + 1) % numBins;

          let fbin = maxIndex; // default if no quadratic fit
          /**
           * Fit a quatratic to 3 points. The system of equations is:
           *
           * y0 = A*x0^2 + B*x0 + C
           * y1 = A*x1^2 + B*x1 + C
           * y2 = A*x2^2 + B*x2 + C
           *
           * This system of equations is solved for A,B,C.
           */
          const p10 = maxIndex-1;
          const p11 = histograms[this.thread.z][this.thread.y][prev];
          const p20 = maxIndex;
          const p21 = histograms[this.thread.z][this.thread.y][maxIndex];
          const p30 = maxIndex+1;
          const p31 = histograms[this.thread.z][this.thread.y][next];

          const d1 = (p30-p20)*(p30-p10);
          const d2 = (p10-p20)*(p30-p10);
          const d3 = p10-p20;

          // If any of the denominators are zero then return FALSE.
          if (d1 != 0 && d2 != 0 && d3 != 0) {
            const a = p10*p10;
            const b = p20*p20;

            // Solve for the coefficients A,B,C
            const A = ((p31-p21)/d1)-((p11-p21)/d2);
            const B = ((p11-p21)+(A*(b-a)))/d3;
            const C = p11-(A*a)-(B*p10);

            //if (Math.abs(A) > 0) {
              fbin = -B / (2 * A);
            //}
          }

          let an =  2.0 * Math.PI * ((fbin + 0.5 + numBins) / numBins);
          while (an > 2.0 * Math.PI) { // modula
            an -= 2.0 * Math.PI;
          }
          return an;
        }, {
          constants: {numBins: ORIENTATION_NUM_BINS},
          output: [1, MAX_FEATURES_PER_BUCKET, NUM_BUCKETS],
          pipeline: true,
        })
      );
    }
    const kernel = this.kernels[this.kernelIndex++];
    const result = kernel(histograms);
    return result;
  }

  _applyPrune(dogIndex, prunedExtremas, extremaScores, width, height, octave, scale) {
    const dogNumScalesPerOctaves = PYRAMID_NUM_SCALES_PER_OCTAVES - 1;

    if (this.kernelIndex === this.kernels.length) {
      const subkernels = [];

      subkernels.push( //dummy
        this.gpu.createKernel(function() {
          return -1;
        }, {
          output: [1, NUM_BUCKETS],
          pipeline: true,
        })
      );

      // compute the orders one by one, and store the index as:
      //  if maxIndex < 0: it means coming from the existing prunedExtremas. the position is (-maxIndex-1);
      //        e.g. -1 -> 0, -2 -> 1, -3 -> 2
      //  if maxIndex >= 0: it means coming from the new extremas. the position is the pixel index
      for (let i = 0; i < MAX_FEATURES_PER_BUCKET; i++) {
        subkernels.push(
          this.gpu.createKernel(function(orders, prunedExtremas, extremaScores) {
            const bucketPointIndex = this.thread.x;
            const bucketIndex = this.thread.y;
            const orderIndex = this.constants.orderIndex;
            if (bucketPointIndex < orderIndex) return orders[this.thread.y][this.thread.x];

            const width = this.constants.width;
            const height= this.constants.height;
            const numBucketsPerDimension = this.constants.numBucketsPerDimension;
            const dx = this.constants.bucketWidth;
            const dy = this.constants.bucketHeight;
            const dxF = this.constants.bucketWidthF;
            const dyF = this.constants.bucketHeightF;

            const bucketX = bucketIndex % numBucketsPerDimension;
            const bucketY = Math.floor(bucketIndex / numBucketsPerDimension);

            let currentPrunedMaxIndex = -1;
            for (let i = 0; i < this.constants.orderIndex; i++) {
              if (orders[bucketIndex][i] < 0) currentPrunedMaxIndex -= 1;
            }
            let maxIndex = currentPrunedMaxIndex;
            let maxScore = Math.abs(prunedExtremas[bucketIndex][-1 * currentPrunedMaxIndex - 1][0]); // score at propertyIndex 0
            maxScore = Math.max(maxScore, 0.0001); // safeguard, but probably not needed

            //let startX = Math.floor(bucketX * dx);
            //let startY = Math.floor(bucketY * dy);

            let startX = Math.floor(bucketX * dxF);
            let startY = Math.floor(bucketY * dyF);
            let endX = Math.floor((bucketX+1) * dxF);
            let endY = Math.floor((bucketY+1) * dyF);

            for (let ii = 0; ii < this.constants.bucketWidth; ii++) {
              const i = startX + ii;
              for (let jj = 0; jj < this.constants.bucketHeight; jj++) {
                const j = startY + jj;

                const pointIndex = j * width + i;
                const pointScore = Math.abs(extremaScores[pointIndex]);
                //if (pointScore > maxScore) {
                if (pointScore > maxScore && i < endX && j < endY) {
                  let selected = false;
                  for (let k = 0; k < this.constants.orderIndex; k++) {
                    //if (orders[bucketIndex][k] === pointIndex) selected = true;
                    if ( Math.abs(orders[bucketIndex][k] - pointIndex) < 0.1) selected = true;
                  }
                  if (!selected) {
                    maxScore = pointScore;
                    maxIndex = pointIndex;
                  }
                }
              }
            }
            return maxIndex;
          }, {
            constants: {
              bucketWidth: Math.ceil(width / NUM_BUCKETS_PER_DIMENSION),
              bucketHeight: Math.ceil(height / NUM_BUCKETS_PER_DIMENSION),
              bucketWidthF: width / NUM_BUCKETS_PER_DIMENSION,
              bucketHeightF: height / NUM_BUCKETS_PER_DIMENSION,
              width: width,
              height: height,
              numBucketsPerDimension: NUM_BUCKETS_PER_DIMENSION,
              orderIndex: i
            },
            output: [i+1, NUM_BUCKETS],
            pipeline: true,
          })
        )
      }

      subkernels.push(
        this.gpu.createKernel(function(orders, prunedExtremas, extremaScores) {

          const dogIndex = this.constants.dogIndex;
          const scale = this.constants.scale;
          const octave = this.constants.octave;
          const width = this.constants.width;
          const dogNumScalesPerOctaves = this.constants.dogNumScalesPerOctaves;

          const propertyIndex = this.thread.x;
          const bucketPointIndex = this.thread.y;
          const bucketIndex = this.thread.z;
          const maxIndex = Math.round(orders[bucketIndex][bucketPointIndex]); // weird roudning problem in safari.... can't index properly if Math.round missing

          if (maxIndex < 0) {
            return prunedExtremas[bucketIndex][-1 * maxIndex -1][propertyIndex];
          } else {
            if (propertyIndex === 0) {
              return extremaScores[Math.round(maxIndex)];
            }
            if (propertyIndex === 1) {
              const mK = Math.pow(2, 1.0 / dogNumScalesPerOctaves);
              const newSigma = Math.pow(mK, scale) * (1 << octave);
              return newSigma;
            }
            if (propertyIndex === 2) {
              const posI = maxIndex % width;
              return posI * Math.pow(2, octave) + Math.pow(2, octave-1) - 0.5;
            }
            if (propertyIndex === 3) {
              const posJ = Math.floor(maxIndex / width);
              return posJ * Math.pow(2, octave) + Math.pow(2, octave-1) - 0.5;
            }
            if (propertyIndex === 4) {
              return dogIndex;
            }
          }
        }, {
          constants: {
            dogIndex: dogIndex,
            octave: octave,
            scale: scale,
            width: width,
            dogNumScalesPerOctaves: dogNumScalesPerOctaves,
          },
          output: [5, MAX_FEATURES_PER_BUCKET, NUM_BUCKETS], // first dimension: [score, sigma, x, y, dogIndex]
          pipeline: true,
        })
      );
      this.kernels.push(subkernels);
    }

    const subkernels = this.kernels[this.kernelIndex++];
    let c = 0;
    let orders = subkernels[c++](); // dummy
    for (let i = 0; i < MAX_FEATURES_PER_BUCKET; i++) {
      orders = subkernels[c++](orders, prunedExtremas, extremaScores); // build max index one by one
    }
    // pack the result
    const result = subkernels[c++](orders, prunedExtremas, extremaScores);
    return result;
  }

  _computeGradients(image) {
    if (this.kernelIndex === this.kernels.length) {
      const k1 = this.gpu.createKernel(function(data) {
        const width = this.constants.width;
        const height = this.constants.height;

        const i = this.thread.x % width;
        const j = Math.floor(this.thread.x / width);
        /*
        const prevJ = j > 0? j - 1: j;
        const nextJ = j < height - 1? j + 1: j;
        const prevI = i > 0? i - 1: i;
        const nextI = i < width - 1? i + 1: i;
        const dx = data[j * width + nextI] - data[j * width + prevI];
        const dy = data[nextJ * width + i] - data[prevJ * width + i];
        */
        const dx = (i < width - 1? data[j * width + i + 1]: 0) - (i > 0? data[j * width + i -1]: 0);
        const dy = (j < height - 1? data[(j+1) * width + i]: 0) - (j > 0? data[(j-1) * width + i]: 0);

        const mag = Math.sqrt(dx * dx + dy * dy);
        return mag;
      }, {
        constants: {width: image.width, height: image.height},
        output: [image.width * image.height],
        pipeline: true,
      });

      const k2 = this.gpu.createKernel(function(data) {
        const width = this.constants.width;
        const height = this.constants.height;

        const i = this.thread.x % width;
        const j = Math.floor(this.thread.x / width);
        /*
        const prevJ = j > 0? j - 1: j;
        const nextJ = j < height - 1? j + 1: j;
        const prevI = i > 0? i - 1: i;
        const nextI = i < width - 1? i + 1: i;
        const dx = data[j * width + nextI] - data[j * width + prevI];
        const dy = data[nextJ * width + i] - data[prevJ * width + i];
        */
        const dx = (i < width - 1? data[j * width + i + 1]: 0) - (i > 0? data[j * width + i -1]: 0);
        const dy = (j < height - 1? data[(j+1) * width + i]: 0) - (j > 0? data[(j-1) * width + i]: 0);

        // seems like gpu atan2 doesn't handle dx === 0 well
        // angle = Math.atan2(dy, dx); can someone verify correctness?
        let angle = 0;
        if (dx === 0 && dy === 0) angle = 0;
        else if (dy === 0) {
          if (dx < 0) angle = Math.PI;
          else angle = 0;
        }
        else if (dx === 0) {
          if (dy < 0) angle = -Math.PI / 2;
          else angle = Math.PI / 2;
        }
        else {
          angle = Math.atan2(Math.abs(dy), Math.abs(dx));
          if (dx < 0 && dy > 0) angle = Math.PI - angle;
          else if (dx < 0 && dy < 0) angle = -(Math.PI - angle);
          else if (dx > 0 && dy < 0) angle = -angle;
        }
        angle += Math.PI;

        return angle;
      }, {
        constants: {width: image.width, height: image.height},
        output: [image.width * image.height],
        pipeline: true,
      });

      this.kernels.push([k1, k2]);
    }

    const [k1, k2] = this.kernels[this.kernelIndex++];
    const saveMag = k1(image.data);
    const result = k2(image.data);
    return {result, saveMag};
  }

  _computeFreakDescriptors(freakResult) {
    if (this.kernelIndex === this.kernels.length) {
      const subkernels = [];
      subkernels.push(
        this.gpu.createKernel(function(freakResult) {
          const numFreakPoints = this.constants.numFreakPoints;
          const x = this.thread.x;

          // binary search first point index
          let l = 0;
          let r = numFreakPoints - 1;
          let startAt = 0;

          // max loop needed = 7, l=0, r=36. max num of loops = m = 18,9,5,3,2,1,
          for (let i = 0; i < 7; i++) {
            if (l !== r) {
              let m = Math.ceil((l + r) / 2);
              startAt = (numFreakPoints-m + numFreakPoints-1) * m / 2;
              if (x < startAt) {
                r = m - 1;
              } else {
                l = m;
              }
            }
          }
          startAt = (numFreakPoints-l + numFreakPoints-1) * l / 2;
          const p1 = l;
          const p2 = x - startAt + (p1+1);

          if (freakResult[this.thread.z][this.thread.y][p1] < freakResult[this.thread.z][this.thread.y][p2] + 0.01) return 1;
          return 0;
        }, {
          constants: {
            numFreakPoints: FREAKPOINTS.length
          },
          output: [FREAK_CONPARISON_COUNT, MAX_FEATURES_PER_BUCKET, NUM_BUCKETS],
          pipeline: true,
        })
      )
      this.kernels.push(subkernels);
    }
    const subkernels = this.kernels[this.kernelIndex++];
    const result = subkernels[0](freakResult);
    return result;
  }

  _computeExtremaFreak(pyramidImages, gaussianNumOctaves, prunedExtremas, prunedExtremasAngles) {
    if (this.kernelIndex === this.kernels.length) {
      const subkernels = [];

      // unforutnately, kernelMap is not supported in some device. so we duplicate similar computations for 3 times
      //  for 1) x, 2) y and 3) imageIndex
      for (let i = 0; i < 3; i++) {
        subkernels.push(
          this.gpu.createKernel(function(prunedExtremas, prunedExtremasAngles, freakPoints) {
            const gaussianNumOctaves = this.constants.gaussianNumOctaves;
            const gaussianNumScalesPerOctaves = this.constants.gaussianNumScalesPerOctaves;
            const expansionFactor = this.constants.expansionFactor;
            const propertyType = this.constants.propertyType;

            const bucketPointIndex = this.thread.y;
            const bucketIndex = this.thread.z;

            const mK = Math.pow(2, 1.0 / (gaussianNumScalesPerOctaves-1));
            const oneOverLogK = 1.0 / Math.log(mK);

            const inputX = prunedExtremas[bucketIndex][bucketPointIndex][2];
            const inputY = prunedExtremas[bucketIndex][bucketPointIndex][3];
            const inputSigma = prunedExtremas[bucketIndex][bucketPointIndex][1];
            const inputAngle = prunedExtremasAngles[bucketIndex][bucketPointIndex][0];

            const xIndex = Math.round(this.thread.x);
            const freakSigma = freakPoints[xIndex][0];
            const freakX = freakPoints[xIndex][1];
            const freakY = freakPoints[xIndex][2];

            // Ensure the scale of the similarity transform is at least "1".
            const transformScale = Math.max(1, inputSigma * expansionFactor);

            const c = transformScale * Math.cos(inputAngle);
            const s = transformScale * Math.sin(inputAngle);
            // similarity matrix
            // const S = [
            //  c, -s, x,
            //  s, c, y,
            //  0, 0, 1
            //]
            const S0 = c;
            const S1 = -s;
            const S2 = inputX;
            const S3 = s;
            const S4 = c;
            const S5 = inputY;

            const sigma = transformScale * freakSigma;
            let octave = Math.floor(Math.log2(sigma));
            const fscale = Math.log(sigma / Math.pow(2, octave)) * oneOverLogK;
            let scale = Math.round(fscale);

            // sgima of last scale = sigma of the first scale in next octave
            // prefer coarser octaves for efficiency
            if (scale === gaussianNumScalesPerOctaves - 1) {
              octave = octave + 1;
              scale = 0;
            }
            // clip octave and scale
            if (octave < 0) {
              octave = 0;
              scale = 0;
            }
            if (octave >= gaussianNumOctaves) {
              octave = gaussianNumOctaves - 1;
              scale = gaussianNumScalesPerOctaves - 1;
            }

            // for downsample point
            const imageIndex = octave * gaussianNumScalesPerOctaves + scale;
            const a = 1.0 / (Math.pow(2, octave));
            const b = 0.5 * a - 0.5;

            if (propertyType === 0) {
              const x = S0 * freakX + S1 * freakY + S2;
              let xp = x * a + b; // x in octave
              return xp;
            }

            if (propertyType === 1) {
              const y = S3 * freakX + S4 * freakY + S5;
              let yp = y * a + b; // y in octave
              return yp
            }

            return imageIndex;
          }, {
            constants: {
              gaussianNumOctaves: gaussianNumOctaves,
              gaussianNumScalesPerOctaves: PYRAMID_NUM_SCALES_PER_OCTAVES,
              expansionFactor: FREAK_EXPANSION_FACTOR,
              propertyType: i
            },
            output: [FREAKPOINTS.length, MAX_FEATURES_PER_BUCKET, NUM_BUCKETS],
            pipeline: true,
          })
        )
      }

      subkernels.push(
        this.gpu.createKernel(function() {
          return 0;
        }, {
          output: [FREAKPOINTS.length, MAX_FEATURES_PER_BUCKET, NUM_BUCKETS],
          pipeline: true,
        })
      );

      for (let i = 0; i < pyramidImages.length; i++) {
        subkernels.push(
          this.gpu.createKernel(function(freakResult, imageData, xps, yps, imageIndexes) {
            const gaussianIndex = this.constants.gaussianIndex;
            const width = this.constants.width;
            const height = this.constants.height;

            //if (imageIndexes[this.thread.z][this.thread.y][this.thread.x] !== gaussianIndex) {
            if (Math.abs(imageIndexes[this.thread.z][this.thread.y][this.thread.x] - gaussianIndex) > 0.1) {
              return freakResult[this.thread.z][this.thread.y][this.thread.x];
            }

            let xp = xps[this.thread.z][this.thread.y][this.thread.x];
            let yp = yps[this.thread.z][this.thread.y][this.thread.x];

            // bilinear interpolation
            //xp = Math.max(0, Math.min(xp, width - 2));
            //yp = Math.max(0, Math.min(yp, height - 2));

            const x0 = Math.floor(xp);
            const x1 = x0 + 1;
            const y0 = Math.floor(yp);
            const y1 = y0 + 1;

            if (x0 < 0 || x0 >= width-1) return 0;
            if (y0 < 0 || y0 >= height-1) return 0;

            const value = (x1-xp) * (y1-yp) * imageData[y0 * width + x0]
                        + (xp-x0) * (y1-yp) * imageData[y0 * width + x1]
                        + (x1-xp) * (yp-y0) * imageData[y1 * width + x0]
                        + (xp-x0) * (yp-y0) * imageData[y1 * width + x1];
            return value;
          }, {
            constants: {
              gaussianIndex: i,
              width: pyramidImages[i].width,
              height: pyramidImages[i].height
            },
            output: [FREAKPOINTS.length, MAX_FEATURES_PER_BUCKET, NUM_BUCKETS],
            pipeline: true,
          })
        )
      }
      this.kernels.push(subkernels);
    }
    const subkernels = this.kernels[this.kernelIndex++];

    // compute the locations of all freak points
    const xps = subkernels[0](prunedExtremas, prunedExtremasAngles, FREAKPOINTS);
    const yps = subkernels[1](prunedExtremas, prunedExtremasAngles, FREAKPOINTS);
    const imageIndexes = subkernels[2](prunedExtremas, prunedExtremasAngles, FREAKPOINTS);

    //globalDebug.freakXps = xps;
    //globalDebug.freakYps = yps;
    //globalDebug.freakImageIndexes = imageIndexes;

    // compute the interpolated values of each freak coordinates (this values is used to build the freak descriptors)
    let freakResult = subkernels[3]();
    for (let i = 0; i < pyramidImages.length; i++) {
      freakResult = subkernels[i+4](freakResult, pyramidImages[i].data, xps, yps, imageIndexes);
    }
    //globalDebug.freakResult = freakResult;

    //console.log("freak result", freakResult.toArray());
    return freakResult;
  }

  _buildExtremas(image0, image1, image2, octave, scale, startI, startJ, endI, endJ) {
    const originalWidth = this.width;
    const originalHeight = this.height;
    const dogNumScalesPerOctaves = PYRAMID_NUM_SCALES_PER_OCTAVES - 1;

    if (this.kernelIndex === this.kernels.length) {
      const k = this.gpu.createKernel(function(data0, data1, data2, startI, startJ, endI, endJ) {
        const LAPLACIAN_SQR_THRESHOLD = this.constants.LAPLACIAN_SQR_THRESHOLD;
        const MAX_SUBPIXEL_DISTANCE_SQR = this.constants.MAX_SUBPIXEL_DISTANCE_SQR;
        const EDGE_HESSIAN_THRESHOLD = this.constants.EDGE_HESSIAN_THRESHOLD;
        const width = this.constants.width;
        const height = this.constants.height;

        const pos = this.thread.x;
        const posI = pos % width;
        const posJ = Math.floor(pos / width);
        if (posI < startI || posI >= endI || posJ < startJ || posJ >= endJ) return 0;

        const v = data1[pos];
        if (v * v < LAPLACIAN_SQR_THRESHOLD) return 0;

        let isMax = true;
        for (let d = 0; d < 9; d++) {
          const i = d % 3;
          const j = Math.floor(d / 3);
          const pos2 = pos + (j-1) * width + (i-1);
          //if (data1[pos] <= data0[pos2]) {isMax = false; break;};
          //if (data1[pos] <= data2[pos2]) {isMax = false; break;};
          //if (pos !== pos2 && data1[pos] <= data1[pos2]) {isMax = false; break;};
          if (data1[pos] < data0[pos2]) {isMax = false; break;};
          if (data1[pos] < data2[pos2]) {isMax = false; break;};
          if (pos !== pos2 && data1[pos] < data1[pos2]) {isMax = false; break;};
        }

        let isMin = false;
        if (!isMax) {
          isMin = true;
          for (let d = 0; d < 9; d++) {
            const i = d % 3;
            const j = Math.floor(d / 3);
            const pos2 = pos + (j-1) * width + (i-1);
            //if (data1[pos] >= data0[pos2]) {isMin = false; break};
            //if (data1[pos] >= data2[pos2]) {isMin = false; break};
            //if (pos !== pos2 && data1[pos] >= data1[pos2]) {isMin = false; break};
            if (data1[pos] > data0[pos2]) {isMin = false; break};
            if (data1[pos] > data2[pos2]) {isMin = false; break};
            if (pos !== pos2 && data1[pos] > data1[pos2]) {isMin = false; break};
          }
        }

        if (!isMax && !isMin) return 0;

        // Step 2: sub-pixel refinement (I'm not sure what that means. Any educational ref?)
        // not sure whether useful actually

        // Compute spatial derivatives
        const dx = 0.5 * (data1[pos + 1] - data1[pos - 1]);
        const dy = 0.5 * (data1[pos + width] - data1[pos - width]);
        const dxx = data1[pos + 1] + data1[pos - 1] - 2 * data1[pos];
        const dyy = data1[pos + width] + data1[pos - width] - 2 * data1[pos];
        const dxy = 0.25 * (data1[pos - width -1] + data1[pos + width + 1] - data1[pos - width +1] - data1[pos + width - 1]);

        // Compute scale derivates
        const ds = 0.5 * (data2[pos] - data0[pos]);
        const dss = data2[pos] + data0[pos] - 2 * data1[pos];
        const dxs = 0.25 * ((data0[pos-1] - data0[pos+1]) + (-data2[pos-1] + data2[pos+1]));
        const dys = 0.25 * ((data0[pos-width] - data0[pos+width]) + (-data2[pos-width] + data2[pos+width]));

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
        const b0 = -dx;
        const b1 = -dy;
        const b2 = -ds;

        const detA = A0 * A4 * A8
                  - A0 * A5 * A5
                  - A4 * A2 * A2
                  - A8 * A1 * A1
                  + 2 * A1 * A2 * A5;

        if ( Math.abs(detA) < 0.0001) {
          return 0; // determinant undefined. no solution
        }


        // B = inverse of A
        const B0 = A4 * A8 - A5 * A7;
        const B1 = A2 * A7 - A1 * A8;
        const B2 = A1 * A5 - A2 * A4;
        const B3 = B1;
        const B4 = A0 * A8 - A2 * A6;
        const B5 = A2 * A3 - A0 * A5;
        const B6 = B2;
        const B7 = B5;
        const B8 = A0 * A4 - A1 * A3;

        const u0 = (B0 * b0 + B1 * b1 + B2 * b2) / detA;
        const u1 = (B3 * b0 + B4 * b1 + B5 * b2) / detA;
        const u2 = (B6 * b0 + B7 * b1 + B8 * b2) / detA;

        // If points move too much in the sub-pixel update, then the point probably unstable.
        if (u0 * u0 + u1 * u1 > MAX_SUBPIXEL_DISTANCE_SQR) return 0;

        // compute edge score
        const det = (dxx * dyy) - (dxy * dxy);
        //if (det === 0) return 0;
        if ( Math.abs(det) < 0.0001) return 0; // determinant undefined. no solution

        const edgeScore = (dxx + dyy) * (dxx + dyy) / det;

        if (Math.abs(edgeScore) >= EDGE_HESSIAN_THRESHOLD ) return 0;

        const score = v - (b0 * u0 + b1 * u1 + b2 * u2);

        if (score * score < LAPLACIAN_SQR_THRESHOLD) return 0;

        return score;
      }, {
        constants: {
          LAPLACIAN_SQR_THRESHOLD: LAPLACIAN_SQR_THRESHOLD,
          MAX_SUBPIXEL_DISTANCE_SQR: MAX_SUBPIXEL_DISTANCE_SQR,
          EDGE_HESSIAN_THRESHOLD: EDGE_HESSIAN_THRESHOLD,
          width: image1.width,
          height: image1.height,
        },
        output: [image1.width * image1.height],
        pipeline: true,
      });

      this.kernels.push([k]);
    }
    const [k] = this.kernels[this.kernelIndex++];
    const result = k(image0.data, image1.data, image2.data, startI, startJ, endI, endJ);
    return result;
  }

  _downsampleBilinear(image) {
    const dstWidth = Math.floor(image.width / 2);
    const dstHeight = Math.floor(image.height / 2);

    if (this.kernelIndex === this.kernels.length) {
      this.kernels.push(
        this.gpu.createKernel(function(data) {
          const width = this.constants.width;
          const srcWidth = this.constants.srcWidth;
          const j = Math.floor(this.thread.x / width);
          const i = this.thread.x % width;
          const srcPos = j * 2 * srcWidth + i * 2;
          const v = (data[srcPos] + data[srcPos+1] + data[srcPos+srcWidth] + data[srcPos+srcWidth+1]) * 0.25;
          return v;
        }, {
          constants: {srcWidth: image.width, width: dstWidth},
          output: [dstWidth * dstHeight],
          pipeline: true,
        })
      );
    }
    const kernel = this.kernels[this.kernelIndex++];
    const result = kernel(image.data);
    return {width: dstWidth, height: dstHeight, data: result};
  }

  _upsampleBilinear(image, padOneWidth, padOneHeight) {
    const dstWidth = image.width * 2 + (padOneWidth?1:0);
    const dstHeight = image.height * 2 + (padOneHeight?1:0);

    if (this.kernelIndex === this.kernels.length) {
      this.kernels.push(
        this.gpu.createKernel(function(data) {
          const width = this.constants.width;
          const height = this.constants.height;

          const srcWidth = Math.floor(width / 2);
          const srcHeight = Math.floor(height / 2);

          const j = Math.floor(this.thread.x / width);
          const i = this.thread.x % width;
          const si = 0.5 * i - 0.25;
          const sj = 0.5 * j - 0.25;
          const si0 = Math.max(0, Math.floor(si));
          const si1 = Math.min(Math.ceil(si), srcWidth-1);
          const sj0 = Math.max(0, Math.floor(sj));
          const sj1 = Math.min(Math.ceil(sj), srcHeight-1);
          const value = (si1 - si) * (sj1 - sj) * data[ sj0 * width + si0 ] +
                        (si1 - si) * (sj - sj0) * data[ sj1 * width + si0 ] +
                        (si - si0) * (sj1 - sj) * data[ sj0 * width + si1 ] +
                        (si - si0) * (sj - sj0) * data[ sj1 * width + si1 ];
          return value;
        }, {
          constants: {width: dstWidth, height: dstHeight},
          output: [dstWidth * dstHeight],
          pipeline: true,
        })
      );
    }
    const kernel = this.kernels[this.kernelIndex++];
    const result = kernel(image.data);
    return {width: dstWidth, height: dstHeight, data: result};
  }

  // 4th order binomail filter
  _applyFilter(image) {
    if (this.kernelIndex === this.kernels.length) {
      const f1 = this.gpu.createKernel(function(data) {
        const width = this.constants.width;
        const j = Math.floor(this.thread.x / width);
        const i = this.thread.x % width;
        const joffset = j * width;
        //const v = (i >= 2? data[joffset + (i-2)]: 0) +
        //          (i >= 1? data[joffset + (i-1)]: 0) * 4 +
        //          data[joffset + i] * 6 +
        //          (i <= width -2? data[joffset + (i+1)]: 0) * 4 +
        //          (i <= width -3? data[joffset + (i+2)]: 0);
        const v = data[joffset + Math.max(i-2,0)] +
                  data[joffset + Math.max(i-1,0)] * 4 +
                  data[joffset + i] * 6 +
                  data[joffset + Math.min(i+1,width-1)] * 4 +
                  data[joffset + Math.min(i+2,width-1)];
        return v;
      }, {
        constants: {width: image.width},
        output: [image.width * image.height],
        pipeline: true
      });

      const f2 = this.gpu.createKernel(function(data) {
        const width = this.constants.width;
        const height = this.constants.height;
        const j = Math.floor(this.thread.x / width);
        const i = this.thread.x % width;
        //const v = (j >= 2? data[(j-2) * width + i]: 0) +
        //          (j >= 1? data[(j-1) * width + i]: 0) * 4 +
        //          data[j * width + i] * 6 +
        //          (j <= height-2? data[(j+1) * width + i]: 0) * 4 +
        //          (j <= height-3? data[(j+2) * width + i]: 0);
        const v = data[Math.max(j-2,0) * width + i] +
                  data[Math.max(j-1,0) * width + i] * 4 +
                  data[j * width + i] * 6 +
                  data[Math.min(j+1,height-1) * width + i] * 4 +
                  data[Math.min(j+2,height-1) * width + i];

        return v / 256; // altogether (1+4+6+4+1) * (1+4+6+4+1) numbers
      }, {
        constants: {width: image.width, height: image.height},
        output: [image.width * image.height],
        pipeline: true,
      });
      this.kernels.push({f1, f2});
    }
    const {f1, f2} = this.kernels[this.kernelIndex++];
    const result = f2(f1(image.data));
    return {width: image.width, height: image.height, data: result};
  }

  _differenceImageBinomial(image1, image2) {
    if (this.kernelIndex === this.kernels.length) {
      this.kernels.push(
        this.gpu.createKernel(function(data1, data2) {
          return data1[this.thread.x] - data2[this.thread.x];
        }, {
          output: [image1.width * image1.height],
          pipeline: true,
        })
      );
    }
    const kernel = this.kernels[this.kernelIndex++];
    const result = kernel(image1.data, image2.data);
    return {width: image1.width, height: image1.height, data: result};
  }
}

module.exports = {
  Detector
};
