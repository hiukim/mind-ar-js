const {GPU} = require('gpu.js');
//const gpu = new GPU({mode: 'debug'});
const gpu = new GPU();

const PYRAMID_NUM_SCALES_PER_OCTAVES = 3;
const MK = Math.pow(2, 1.0 / (PYRAMID_NUM_SCALES_PER_OCTAVES-1));
const PYRAMID_MIN_SIZE = 8;

const LAPLACIAN_SQR_THRESHOLD = 3 * 3;
const MAX_SUBPIXEL_DISTANCE_SQR = 3 * 3;
const EDGE_THRESHOLD = 4.0;
const EDGE_HESSIAN_THRESHOLD = ((EDGE_THRESHOLD+1) * (EDGE_THRESHOLD+1) / EDGE_THRESHOLD);

const MAX_FEATURE_POINTS = 500;
const PRUNE_FEATURES_NUM_BUCKETS = 10; // per dimension
const ORIENTATION_NUM_BINS = 36;
const ORIENTATION_SMOOTHING_ITERATIONS = 5;
const ORIENTATION_PEAK_THRESHOLD = 0.8;


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

const freakPoints = [];
for (let r = 0; r < FREAK_RINGS.length; r++) {
  const sigma = FREAK_RINGS[r].sigma;
  for (let i = 0; i < FREAK_RINGS[r].points.length; i++) {
    const point = FREAK_RINGS[r].points[i];
    freakPoints.push([sigma, point[0], point[1]]);
  }
}

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
  }

  detect(imagedata) {
    this.kernelIndex = 0; // reset kernelIndex

    if (typeof window !== 'undefined' && window.DEBUG_TIME) {
      var _start = new Date().getTime();
    }

    const inputImage = {width: this.width, height: this.height, data: imagedata};

    const originalWidth = this.width;
    const originalHeight = this.height;
    const numOctaves = this.numOctaves;
    const numScalesPerOctaves = PYRAMID_NUM_SCALES_PER_OCTAVES;

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
      for (let j = 0; j < numScalesPerOctaves - 1; j++) {
        pyramidImages.push(this._applyFilter(pyramidImages[pyramidImages.length-1]));
      }

      if (typeof window !== 'undefined' && window.DEBUG_TIME) {
        console.log('exec time until build gausian', i,  new Date().getTime() - _start);
      }
    }

    const gaussianPyramid = {
      numOctaves: numOctaves,
      numScalesPerOctaves: numScalesPerOctaves,
      images: pyramidImages
    }

    const dogPyramidImages = [];
    for (let i = 0; i < numOctaves; i++) {
      for (let j = 0; j < numScalesPerOctaves - 1; j++) {
        const image1 = gaussianPyramid.images[i * gaussianPyramid.numScalesPerOctaves + j];
        const image2 = gaussianPyramid.images[i * gaussianPyramid.numScalesPerOctaves + j + 1];
        dogPyramidImages.push(this._differenceImageBinomial(image1, image2));
      }
    }
    const dogPyramid = {
      numOctaves: numOctaves,
      numScalesPerOctaves: numScalesPerOctaves - 1,
      images: dogPyramidImages
    }

    // Compute gradients of gaussian pyramid images
    // TODO: dont need to compute all gaussian images. check dog
    const gradients = [];
    for (let k = 0; k < pyramidImages.length; k++) {
      gradients.push(this._computeGradients(pyramidImages[k]));

      if (typeof window !== 'undefined' && window.DEBUG_TIME) {
        console.log('exec time until compute gradient', k,  new Date().getTime() - _start);
      }
    }

    let prunedExtremas = this.initialPrune();

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

      if (typeof window !== 'undefined' && window.DEBUG_TIME) {
        console.log('exec time until build extremas', k,  new Date().getTime() - _start);
      }

      // combine this extrema with the existing
      prunedExtremas = this._applyPrune(k, prunedExtremas, extremasResult, image1.width, image1.height);
      //prunedExtremas = this.__applyPrune(k, prunedExtremas, extremasResult.result, extremasResult.saveScore, extremasResult.saveSigma, extremasResult.saveX, extremasResult.saveY, image1.width, image1.height);

      if (typeof window !== 'undefined' && window.DEBUG_TIME) {
        console.log('exec time until apply prune', k,  new Date().getTime() - _start);
      }
    }

    const extremaAngles = this.computeExtremaAngle(dogPyramid, gaussianPyramid, gradients, prunedExtremas);
    const extremaFreaks = this.computeExtremaFreak(pyramidImages, gaussianPyramid.numOctaves, gaussianPyramid.numScalesPerOctaves, prunedExtremas, extremaAngles);

    const reducedExtremas = this.reducePrune(prunedExtremas, extremaAngles, extremaFreaks);
    if (typeof window !== 'undefined' && window.DEBUG_TIME) {
      console.log('exec time until reduce prune', new Date().getTime() - _start);
    }

    const reducedExtremasArr = reducedExtremas.toArray();

    if (typeof window !== 'undefined' && window.DEBUG_TIME) {
      console.log('exec time until reduce prune to array', new Date().getTime() - _start);
    }

    const orientedFeaturePoints2 = [];
    const descriptors2 = [];
    for (let i = 0; i < reducedExtremasArr.length; i++) {
      for (let j = 0; j < reducedExtremasArr[i].length; j++) {
        if (reducedExtremasArr[i][j][0] !== 0) {
          const ext = reducedExtremasArr[i][j];

          const desc = [];
          for (let m = 0; m < freakPoints.length; m++) {
            for (let n = m+1; n < freakPoints.length; n++) {
              // avoid too senstive to rounding precision
              desc.push(ext[m+5] < ext[n+5] + 0.0001);
            }
          }

          // encode descriptors in binary format
          // 37 samples = 1+2+3+...+36 = 666 comparisons = 666 bits
          // ceil(666/32) = 84 numbers (32bit number)
          const descBit = [];
          let temp = 0;
          let count = 0;
          for (let m = 0; m < desc.length; m++) {
            if (desc[m]) temp += 1;
            count += 1;
            if (count === 32) {
              descBit.push(temp);
              temp = 0;
              count = 0;
            } else {
              temp = (temp << 1) >>> 0; // >>> 0 to make it unsigned
            }
          }
          descBit.push(temp);

          orientedFeaturePoints2.push({
            score: ext[0],
            sigma: ext[1],
            x: ext[2],
            y: ext[3],
            angle: ext[4],
            descriptors: descBit
          });
        }
      }
    }

    if (typeof window !== 'undefined' && window.DEBUG_TIME) {
      console.log('exec time until feature points and descriptors', new Date().getTime() - _start);
    }
    return orientedFeaturePoints2;
  }

  initialPrune() {
    const nBuckets = PRUNE_FEATURES_NUM_BUCKETS * PRUNE_FEATURES_NUM_BUCKETS;
    const nPointsPerBuckets = MAX_FEATURE_POINTS / nBuckets;

    if (this.kernelIndex === this.kernels.length) {
      this.kernels.push(
        gpu.createKernel(function() {
          return 0;
        }, {
          output: [5, nPointsPerBuckets, nBuckets], // first dimension: [score, sigma, x, y, dogIndex]
          pipeline: true,
        })
      )
    }
    const kernel = this.kernels[this.kernelIndex++];
    const result = kernel();
    return result;
  }

  // combine necessary information for to return to cpu
  reducePrune(prunedExtremas, extremaAngles, extremaFreaks) {
    const nBuckets = PRUNE_FEATURES_NUM_BUCKETS * PRUNE_FEATURES_NUM_BUCKETS;
    const nPointsPerBuckets = MAX_FEATURE_POINTS / nBuckets;
    if (this.kernelIndex === this.kernels.length) {
      this.kernels.push(
        gpu.createKernel(function(prunedExtremas, extremaAngles, extremaFreaks) {
          if (this.thread.x < 4) {
            return prunedExtremas[this.thread.z][this.thread.y][this.thread.x];
          }
          if (this.thread.x < 5) {
            return extremaAngles[this.thread.z][this.thread.y][this.thread.x-4];
          }
          return extremaFreaks[this.thread.z][this.thread.y][this.thread.x-5];
        }, {
          output: [5 + freakPoints.length, nPointsPerBuckets, nBuckets], // first dimension: [score, sigma, x, y, angle, freaks...]
          pipeline: true,
        })
      )
    }
    const kernel = this.kernels[this.kernelIndex++];
    const result = kernel(prunedExtremas, extremaAngles, extremaFreaks);
    return result;
  }

  computeExtremaAngle(dogPyramid, gaussianPyramid, gradients, prunedExtremas) {
    const nBuckets = PRUNE_FEATURES_NUM_BUCKETS * PRUNE_FEATURES_NUM_BUCKETS;
    const nPointsPerBuckets = MAX_FEATURE_POINTS / nBuckets;

    if (this.kernelIndex === this.kernels.length) {
      const subkernels = [];

      subkernels.push(
        gpu.createKernel(function() {
          return 0;
        }, {
          output: [ORIENTATION_NUM_BINS, nPointsPerBuckets, nBuckets],
          pipeline: true,
        })
      )

      for (let k = 1; k < dogPyramid.images.length - 1; k++) {
        subkernels.push(
          gpu.createKernel(function(histograms, prunedExtremas, dogPyramidnumScalesPerOctaves, gaussianIndex, gradientMags, gradientAngles, width, height, numBins) {
            const histogramIndex = this.thread.x;
            const bucketPointIndex = this.thread.y;
            const bucketIndex = this.thread.z;

            const dogIndex = prunedExtremas[bucketIndex][bucketPointIndex][4];
            const octave = Math.floor(dogIndex / dogPyramidnumScalesPerOctaves);
            const scale = dogIndex % dogPyramidnumScalesPerOctaves;
            const thisGaussianindex = octave * (dogPyramidnumScalesPerOctaves+1) + scale;

            //if (thisGaussianindex !== 15) return -2;

            if (thisGaussianindex !== gaussianIndex) {
              return histograms[this.thread.z][this.thread.y][this.thread.x];
            }

            const newSigma = prunedExtremas[bucketIndex][bucketPointIndex][1];
            const newX = prunedExtremas[bucketIndex][bucketPointIndex][2];
            const newY = prunedExtremas[bucketIndex][bucketPointIndex][3];

            let x = newX * (1.0 / Math.pow(2, octave)) + 0.5 * (1.0 / Math.pow(2, octave)) - 0.5;
            let y = newY * (1.0 / Math.pow(2, octave)) + 0.5 * (1.0 / Math.pow(2, octave)) - 0.5;
            x = Math.floor(x + 0.5);
            y = Math.floor(y + 0.5);
            const sigma = newSigma * (1.0 / Math.pow(2, octave));

            const ORIENTATION_GAUSSIAN_EXPANSION_FACTOR = 3.0;
            const ORIENTATION_REGION_EXPANSION_FACTOR = 1.5;
            const ORIENTATION_SMOOTHING_ITERATIONS = 5;
            const ORIENTATION_PEAK_THRESHOLD = 0.8;
            const ONE_OVER_2PI = 0.159154943091895;

            const gwSigma = Math.max(1.0, ORIENTATION_GAUSSIAN_EXPANSION_FACTOR * sigma);
            const gwScale = -1.0 / (2 * gwSigma * gwSigma);

            const radius = ORIENTATION_REGION_EXPANSION_FACTOR * gwSigma;
            const radius2 = Math.ceil( radius * radius - 0.5);

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
                  const w = (720+_x*(720+_x*(360+_x*(120+_x*(30+_x*(6+_x))))))*0.0013888888;

                  const fbin  = numBins * angle * ONE_OVER_2PI;
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
            output: [ORIENTATION_NUM_BINS, nPointsPerBuckets, nBuckets],
            pipeline: true,
          })
        )
      }

      for (let k = 0; k < ORIENTATION_SMOOTHING_ITERATIONS; k++) {
        subkernels.push(
          gpu.createKernel(function(histograms, numBins) {
            const histogramIndex = this.thread.x;
            const bucketPointIndex = this.thread.y;
            const bucketIndex = this.thread.z;

            const kernel = [0.274068619061197, 0.451862761877606, 0.274068619061197];
            return kernel[0] * histograms[this.thread.z][this.thread.y][(histogramIndex - 1 + numBins) % numBins]
                 + kernel[1] * histograms[this.thread.z][this.thread.y][histogramIndex]
                 + kernel[2] * histograms[this.thread.z][this.thread.y][(histogramIndex+1) % numBins];
          }, {
            output: [ORIENTATION_NUM_BINS, nPointsPerBuckets, nBuckets],
            pipeline: true,
          })
        );
      }

      subkernels.push(
        gpu.createKernel(function(histograms, numBins) {
          const histogramIndex = this.thread.x;
          const bucketPointIndex = this.thread.y;
          const bucketIndex = this.thread.z;

          let maxIndex = 0;
          for (let i = 1; i < numBins; i++) {
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
            fbin = -B / (2 * A);
          }

          let an =  2.0 * Math.PI * ((fbin + 0.5 + numBins) / numBins);
          while (an > 2.0 * Math.PI) { // modula
            an -= 2.0 * Math.PI;
          }
          return an;
        }, {
          output: [1, nPointsPerBuckets, nBuckets],
          pipeline: true,
        })
      );

      this.kernels.push(subkernels);
    }
    const subkernels = this.kernels[this.kernelIndex++];

    let histograms = subkernels[0]();
    let c = 1;
    for (let k = 1; k < dogPyramid.images.length - 1; k++) {
      const octave = Math.floor(k / dogPyramid.numScalesPerOctaves);
      const scale = k % dogPyramid.numScalesPerOctaves;

      const gaussianIndex = octave * gaussianPyramid.numScalesPerOctaves + scale;
      const gaussianImage = gaussianPyramid.images[gaussianIndex];
      const gradientMags = gradients[gaussianIndex].saveMag;
      const gradientAngles = gradients[gaussianIndex].result;

      histograms = subkernels[c++](histograms, prunedExtremas, dogPyramid.numScalesPerOctaves, gaussianIndex, gradientMags, gradientAngles, gaussianImage.width, gaussianImage.height, ORIENTATION_NUM_BINS);
    }
    for (let k = 0; k < ORIENTATION_SMOOTHING_ITERATIONS; k++) {
      histograms = subkernels[c++](histograms, ORIENTATION_NUM_BINS);
    }

    const angles = subkernels[c++](histograms, ORIENTATION_NUM_BINS);
    return angles;
  }

  _applyPrune(dogIndex, prunedExtremas, extremasResult, width, height) {
    const isExtremas = extremasResult.result;
    const extremaScores = extremasResult.saveScore;
    const extremaSigmas = extremasResult.saveSigma;
    const extremaXs = extremasResult.saveX;
    const extremaYs = extremasResult.saveY;
    const numBucketsPerDimension = PRUNE_FEATURES_NUM_BUCKETS;
    const nBuckets = PRUNE_FEATURES_NUM_BUCKETS * PRUNE_FEATURES_NUM_BUCKETS;
    const nPointsPerBuckets = MAX_FEATURE_POINTS / nBuckets;

    if (this.kernelIndex === this.kernels.length) {
      const subkernels = [];

      subkernels.push( //dummy
        gpu.createKernel(function() {
          return 0;
        }, {
          output: [1, nBuckets],
          pipeline: true,
        })
      );
      for (let i = 0; i < nPointsPerBuckets; i++) {
        subkernels.push(
          gpu.createKernel(function(orders, prunedExtremas, isExtremas, extremaScores) {
            const bucketPointIndex = this.thread.x;
            const bucketIndex = this.thread.y;
            const orderIndex = this.constants.orderIndex;
            if (bucketPointIndex < orderIndex) return orders[this.thread.y][this.thread.x];

            const width = this.constants.width;
            const height= this.constants.height;
            const numBucketsPerDimension = this.constants.numBucketsPerDimension;
            const dx = this.constants.bucketWidth;
            const dy = this.constants.bucketHeight;

            const bucketX = bucketIndex % numBucketsPerDimension;
            const bucketY = Math.floor(bucketIndex / numBucketsPerDimension);

            let currentPrunedMaxIndex = -1;
            for (let i = 0; i < orderIndex; i++) {
              if (orders[bucketIndex][i] < 0) currentPrunedMaxIndex -= 1;
            }
            let maxIndex = currentPrunedMaxIndex;
            let maxScore = Math.abs(prunedExtremas[bucketIndex][-1 * currentPrunedMaxIndex - 1][0]); // score at propertyIndex 0

            for (let i = bucketX * dx; i < bucketX * dx + dx; i++) {
              for (let j = bucketY * dy; j < bucketY * dy + dy; j++) {
                const pointIndex = j * width + i;
                const pointScore = Math.abs(extremaScores[pointIndex]);
                if (isExtremas[pointIndex] === 1 && pointScore > maxScore) {
                  let selected = false;
                  for (let k = 0; k < orderIndex; k++) {
                    if (orders[bucketIndex][k] === pointIndex) selected = true;
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
              bucketWidth: Math.ceil(width / numBucketsPerDimension),
              bucketHeight: Math.ceil(height / numBucketsPerDimension),
              width,
              height,
              numBucketsPerDimension,
              orderIndex: i
            },
            output: [i+1, nBuckets],
            pipeline: true,
          })
        )
      }
      subkernels.push(
        gpu.createKernel(function(orders, prunedExtremas, extremaScores, extremaSigmas, extremaXs, extremaYs) {
          const dogIndex = this.constants.dogIndex;
          const propertyIndex = this.thread.x;
          const bucketPointIndex = this.thread.y;
          const bucketIndex = this.thread.z;
          const maxIndex = orders[bucketIndex][bucketPointIndex];
          if (maxIndex < 0) {
            return prunedExtremas[bucketIndex][-1 * maxIndex -1][propertyIndex];
          } else {
            if (propertyIndex === 0) return extremaScores[maxIndex];
            if (propertyIndex === 1) return extremaSigmas[maxIndex];
            if (propertyIndex === 2) return extremaXs[maxIndex];
            if (propertyIndex === 3) return extremaYs[maxIndex];
            if (propertyIndex === 4) return dogIndex;
          }
        }, {
          constants: {
            dogIndex: dogIndex,
          },
          output: [5, nPointsPerBuckets, nBuckets], // first dimension: [score, sigma, x, y, dogIndex]
          pipeline: true,
        })
      );
      this.kernels.push(subkernels);
    }

    const subkernels = this.kernels[this.kernelIndex++];
    let c = 0;
    let orders = subkernels[c++](); // dummy
    for (let i = 0; i < nPointsPerBuckets; i++) {
      orders = subkernels[c++](orders, prunedExtremas, isExtremas, extremaScores);
    }
    const result = subkernels[c++](orders, prunedExtremas, extremaScores, extremaSigmas, extremaXs, extremaYs);
    return result;
  }

  __applyPrune(dogIndex, prunedExtremas, isExtremas, extremaScores, extremaSigmas, extremaXs, extremaYs, width, height) {
    const nBuckets = PRUNE_FEATURES_NUM_BUCKETS * PRUNE_FEATURES_NUM_BUCKETS;
    const nPointsPerBuckets = MAX_FEATURE_POINTS / nBuckets;

    if (this.kernelIndex === this.kernels.length) {
      const subkernels = [];

      subkernels.push(
        gpu.createKernelMap({
          saveMax1: function(a) {return a},
          saveMax2: function(a) {return a},
          saveMax3: function(a) {return a},
          saveMax4: function(a) {return a},
          saveMax5: function(a) {return a}
        }, function(prunedExtremas, numBucketsPerDimension, nPointsPerBuckets, isExtremas, extremaScores, width, height) {
          const bucketIndex = this.thread.x;
          const bucketX = bucketIndex % numBucketsPerDimension;
          const bucketY = Math.floor(bucketIndex / numBucketsPerDimension);
          const dx = Math.ceil(width / numBucketsPerDimension);
          const dy = Math.ceil(height / numBucketsPerDimension);

          // can declare array in gpu.js?
          // negative numbers indicate from exsiting prunedExtremas
          let max1 = -1;
          let max2 = -2;
          let max3 = -3;
          let max4 = -4;
          let max5 = -5;

          for (let t = 0; t < 5; t++) {
            for (let i = bucketX * dx; i < bucketX * dx + dx; i++) {
              for (let j = bucketY * dy; j < bucketY * dy + dy; j++) {
                const pointIndex = j * width + i;
                if (isExtremas[pointIndex] === 1 && pointIndex !== max1 && pointIndex !== max2 && pointIndex !== max3 && pointIndex !== max4 && pointIndex !== max5)
                {
                  if ((max1 >= 0 && Math.abs(extremaScores[pointIndex]) > Math.abs(extremaScores[max1])) || (max1 < 0 && Math.abs(extremaScores[pointIndex]) > Math.abs(prunedExtremas[bucketIndex][-1 * max1 - 1][0]))) {
                    max5 = max4;
                    max4 = max3;
                    max3 = max2;
                    max2 = max1;
                    max1 = pointIndex;
                  }
                  else if ( (max2 >= 0 && Math.abs(extremaScores[pointIndex]) > Math.abs(extremaScores[max2])) || (max2 < 0 && Math.abs(extremaScores[pointIndex]) > Math.abs(prunedExtremas[bucketIndex][-1 * max2 -1][0]))) {
                    max5 = max4;
                    max4 = max3;
                    max3 = max2;
                    max2 = pointIndex;
                  }
                  else if ( (max3 >= 0 && Math.abs(extremaScores[pointIndex]) > Math.abs(extremaScores[max3])) || (max3 < 0 && Math.abs(extremaScores[pointIndex]) > Math.abs(prunedExtremas[bucketIndex][-1 * max3 -1][0]))) {
                    max5 = max4;
                    max4 = max3;
                    max3 = pointIndex;
                  }
                  else if ( (max4 >= 0 && Math.abs(extremaScores[pointIndex]) > Math.abs(extremaScores[max4])) || (max4 < 0 && Math.abs(extremaScores[pointIndex]) > Math.abs(prunedExtremas[bucketIndex][-1 * max4 -1][0]))) {
                    max5 = max4;
                    max4 = pointIndex;
                  }
                  else if ( (max5 >= 0 && Math.abs(extremaScores[pointIndex]) > Math.abs(extremaScores[max5])) || (max5 < 0 && Math.abs(extremaScores[pointIndex]) > Math.abs(prunedExtremas[bucketIndex][-1 * max5 -1][0]))) {
                    max5 = pointIndex;
                  }
                }
              }
            }
          }
          saveMax1(max1);
          saveMax2(max2);
          saveMax3(max3);
          saveMax4(max4);
          saveMax5(max5);
          return -1;
        }, {
          output: [nBuckets],
          pipeline: true,
        })
      );

      subkernels.push(
        gpu.createKernel(function(dogIndex, prunedExtremas, extremaScores, extremaSigmas, extremaXs, extremaYs, saveMax1, saveMax2, saveMax3, saveMax4, saveMax5) {
          const propertyIndex = this.thread.x;
          const bucketPointIndex = this.thread.y;
          const bucketIndex = this.thread.z;
          const max1 = saveMax1[bucketIndex];
          const max2 = saveMax2[bucketIndex];
          const max3 = saveMax3[bucketIndex];
          const max4 = saveMax4[bucketIndex];
          const max5 = saveMax5[bucketIndex];

          if (bucketPointIndex === 0) {
            if (max1 < 0) {
              return prunedExtremas[bucketIndex][-1 * max1 -1][propertyIndex];
            } else {
              if (propertyIndex === 0) return extremaScores[max1];
              if (propertyIndex === 1) return extremaSigmas[max1];
              if (propertyIndex === 2) return extremaXs[max1];
              if (propertyIndex === 3) return extremaYs[max1];
              if (propertyIndex === 4) return dogIndex;
            }
          }
          if (bucketPointIndex === 1) {
            if (max2 < 0) {
              return prunedExtremas[bucketIndex][-1 * max2 -1][propertyIndex];
            } else {
              if (propertyIndex === 0) return extremaScores[max2];
              if (propertyIndex === 1) return extremaSigmas[max2];
              if (propertyIndex === 2) return extremaXs[max2];
              if (propertyIndex === 3) return extremaYs[max2];
              if (propertyIndex === 4) return dogIndex;
            }
          }
          if (bucketPointIndex === 2) {
            if (max3 < 0) {
              return prunedExtremas[bucketIndex][-1 * max3 -1][propertyIndex];
            } else {
              if (propertyIndex === 0) return extremaScores[max3];
              if (propertyIndex === 1) return extremaSigmas[max3];
              if (propertyIndex === 2) return extremaXs[max3];
              if (propertyIndex === 3) return extremaYs[max3];
              if (propertyIndex === 4) return dogIndex;
            }
          }
          if (bucketPointIndex === 3) {
            if (max4 < 0) {
              return prunedExtremas[bucketIndex][-1 * max4 -1][propertyIndex];
            } else {
              if (propertyIndex === 0) return extremaScores[max4];
              if (propertyIndex === 1) return extremaSigmas[max4];
              if (propertyIndex === 2) return extremaXs[max4];
              if (propertyIndex === 3) return extremaYs[max4];
              if (propertyIndex === 4) return dogIndex;
            }
          }
          if (bucketPointIndex === 4) {
            if (max5 < 0) {
              return prunedExtremas[bucketIndex][-1 * max5 -1][propertyIndex];
            } else {
              if (propertyIndex === 0) return extremaScores[max5];
              if (propertyIndex === 1) return extremaSigmas[max5];
              if (propertyIndex === 2) return extremaXs[max5];
              if (propertyIndex === 3) return extremaYs[max5];
              if (propertyIndex === 4) return dogIndex;
            }
          }
        }, {
          output: [5, nPointsPerBuckets, nBuckets], // first dimension: [score, sigma, x, y, dogIndex]
          pipeline: true,
        })
      );
      this.kernels.push(subkernels);
    }
    const subkernels = this.kernels[this.kernelIndex++];
    const orderResult = subkernels[0](prunedExtremas, PRUNE_FEATURES_NUM_BUCKETS, nPointsPerBuckets, isExtremas, extremaScores, width, height);
    const result = subkernels[1](dogIndex, prunedExtremas, extremaScores, extremaSigmas, extremaXs, extremaYs, orderResult.saveMax1, orderResult.saveMax2, orderResult.saveMax3, orderResult.saveMax4, orderResult.saveMax5);
    return result;
  }

  _computeGradients(image) {
    if (this.kernelIndex === this.kernels.length) {
      this.kernels.push(
        gpu.createKernelMap({
          saveMag: function(a) {return a}
        },
        function(data) {
          const width = this.constants.width;
          const height = this.constants.height;

          const i = this.thread.x % width;
          const j = Math.floor(this.thread.x / width);
          const prevJ = j > 0? j - 1: j;
          const nextJ = j < height - 1? j + 1: j;
          const prevI = i > 0? i - 1: i;
          const nextI = i < width - 1? i + 1: i;
          const dx = data[j * width + nextI] - data[j * width + prevI];
          const dy = data[nextJ * width + i] - data[prevJ * width + i];

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

          const mag = Math.sqrt(dx * dx + dy * dy);
          saveMag(mag);
          return angle;
        }, {
          constants: {width: image.width, height: image.height},
          output: [image.width * image.height],
          pipeline: true,
        })
      )
    }
    const kernel = this.kernels[this.kernelIndex++];
    const result = kernel(image.data);
    return result;
  }

  computeExtremaFreak(pyramidImages, gaussianNumOctaves, gaussianNumScalesPerOctaves, prunedExtremas, prunedExtremasAngles) {
    const nBuckets = PRUNE_FEATURES_NUM_BUCKETS * PRUNE_FEATURES_NUM_BUCKETS;
    const nPointsPerBuckets = MAX_FEATURE_POINTS / nBuckets;

    if (this.kernelIndex === this.kernels.length) {
      const subkernels = [];

      subkernels.push(
        gpu.createKernelMap({
          saveXp: function(a) {return a},
          saveYp: function(a) {return a}
        },
        function(gaussianNumOctaves, gaussianNumScalesPerOctaves, prunedExtremas, prunedExtremasAngles, freakPoints) {
          const bucketPointIndex = this.thread.y;
          const bucketIndex = this.thread.z;

          const EXPANSION_FACTOR = 7;

          const mK = Math.pow(2, 1.0 / (gaussianNumScalesPerOctaves-1));
          const oneOverLogK = 1.0 / Math.log(mK);

          const inputX = prunedExtremas[bucketIndex][bucketPointIndex][2];
          const inputY = prunedExtremas[bucketIndex][bucketPointIndex][3];
          const inputSigma = prunedExtremas[bucketIndex][bucketPointIndex][1];
          const inputAngle = prunedExtremasAngles[bucketIndex][bucketPointIndex][0];

          const freakSigma = freakPoints[this.thread.x][0];
          const freakX = freakPoints[this.thread.x][1];
          const freakY = freakPoints[this.thread.x][2];

          // Ensure the scale of the similarity transform is at least "1".
          const transformScale = Math.max(1, inputSigma * EXPANSION_FACTOR);
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

          // sgima of last scale =  sigma of the first scale in next octave
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

          const x = S0 * freakX + S1 * freakY + S2;
          const y = S3 * freakX + S4 * freakY + S5;
          let xp = x * a + b; // x in octave
          let yp = y * a + b; // y in octave

          saveXp(xp);
          saveYp(yp);
          return imageIndex;
        }, {
          output: [freakPoints.length, nPointsPerBuckets, nBuckets],
          pipeline: true,
        })
      )

      subkernels.push(
        gpu.createKernel(function() {
          return 0;
        }, {
          output: [freakPoints.length, nPointsPerBuckets, nBuckets],
          pipeline: true,
        })
      );

      for (let i = 0; i < pyramidImages.length; i++) {
        subkernels.push(
          gpu.createKernel(function(data, thisIndex, imageData, width, height, xps, yps, imageIndexes) {
            if (imageIndexes[this.thread.z][this.thread.y][this.thread.x] !== thisIndex) return data[this.thread.z][this.thread.y][this.thread.x];

            let xp = xps[this.thread.z][this.thread.y][this.thread.x];
            let yp = yps[this.thread.z][this.thread.y][this.thread.x];

            // bilinear interpolation
            xp = Math.max(0, Math.min(xp, width - 2));
            yp = Math.max(0, Math.min(yp, height - 2));

            const x0 = Math.floor(xp);
            const x1 = x0 + 1;
            const y0 = Math.floor(yp);
            const y1 = y0 + 1;
            const value = (x1-xp) * (y1-yp) * imageData[y0 * width + x0]
                        + (xp-x0) * (y1-yp) * imageData[y0 * width + x1]
                        + (x1-xp) * (yp-y0) * imageData[y1 * width + x0]
                        + (xp-x0) * (yp-y0) * imageData[y1 * width + x1];
            return value;
          }, {
            output: [freakPoints.length, nPointsPerBuckets, nBuckets],
            pipeline: true,
          })
        )
      }
      this.kernels.push(subkernels);
    }
    const subkernels = this.kernels[this.kernelIndex++];

    const result = subkernels[0](gaussianNumOctaves, gaussianNumScalesPerOctaves, prunedExtremas, prunedExtremasAngles, freakPoints);

    const imageIndexes = result.result;
    const xps = result.saveXp;
    const yps = result.saveYp;

    let freakResult = subkernels[1]();
    for (let i = 0; i < pyramidImages.length; i++) {
      freakResult = subkernels[i+2](freakResult, i, pyramidImages[i].data, pyramidImages[i].width, pyramidImages[i].height, xps, yps, imageIndexes);
    }
    return freakResult;
  }

  _buildExtremas(image0, image1, image2, octave, scale, startI, startJ, endI, endJ) {
    const originalWidth = this.width;
    const originalHeight = this.height;
    const dogNumScalesPerOctaves = PYRAMID_NUM_SCALES_PER_OCTAVES - 1;

    if (this.kernelIndex === this.kernels.length) {
      this.kernels.push(
        // return
        //  1. result 1|0 (whether this coordinate is an extrema)
        //  2. score: how strong is the extrema. (the larger the difference of gaussian value, the stronger)
        //  3. x, y: the effective x, y coordinate in the original image
        //  4. sigma: the effective sigma in the original image (I'm not sure what sigma is. any educational reference?)
        gpu.createKernelMap({
          saveScore: function(a) {return a;},
          saveSigma: function(a) {return a;},
          saveX: function(a) {return a;},
          saveY: function(a) {return a;}
        },
        function(data0, data1, data2, startI, startJ, endI, endJ) {
          const LAPLACIAN_SQR_THRESHOLD = this.constants.LAPLACIAN_SQR_THRESHOLD;
          const MAX_SUBPIXEL_DISTANCE_SQR = this.constants.MAX_SUBPIXEL_DISTANCE_SQR;
          const EDGE_HESSIAN_THRESHOLD = this.constants.EDGE_HESSIAN_THRESHOLD;
          const originalWidth = this.constants.originalWidth;
          const originalHeight = this.constants.originalHeight;
          const width = this.constants.width;
          const height = this.constants.height;
          const octave = this.constants.octave;
          const scale = this.constants.scale;
          const dogNumScalesPerOctaves = this.constants.dogNumScalesPerOctaves;

          const pos = this.thread.x;
          const posI = pos % width;
          const posJ = Math.floor(pos / width);
          if (posI < startI || posI > endI || posJ < startJ || posJ > endJ) return 0;

          const v = data1[pos];
          if (v * v < LAPLACIAN_SQR_THRESHOLD) return 0;

          let isMax = true;
          for (let d = 0; d < 9; d++) {
            const i = d % 3;
            const j = Math.floor(d / 3);
            const pos2 = pos + (j-1) * width + (i-1);
            if (data1[pos] <= data0[pos2]) {isMax = false; break;};
            if (data1[pos] <= data2[pos2]) {isMax = false; break;};
            if (pos !== pos2 && data1[pos] <= data1[pos2]) {isMax = false; break;};
          }

          let isMin = false;
          if (!isMax) {
            isMin = true;
            for (let d = 0; d < 9; d++) {
              const i = d % 3;
              const j = Math.floor(d / 3);
              const pos2 = pos + (j-1) * width + (i-1);
              if (data1[pos] >= data0[pos2]) {isMin = false; break};
              if (data1[pos] >= data2[pos2]) {isMin = false; break};
              if (pos !== pos2 && data1[pos] >= data1[pos2]) {isMin = false; break};
            }
          }
          if (!isMax && !isMin) return 0;

          // Step 2: sub-pixel refinement (I'm not sure what that means. Any educational ref?)

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

          if ( Math.abs(detA) < 0.0000001) return 0; // determinant undefined. no solution

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
          if (det === 0) return 0;

          const edgeScore = (dxx + dyy) * (dxx + dyy) / det;
          if (Math.abs(edgeScore) >= EDGE_HESSIAN_THRESHOLD ) return 0;

          const score = v - (b0 * u0 + b1 * u1 + b2 * u2);
          if (score * score < LAPLACIAN_SQR_THRESHOLD) return 0;

          // original x = x*2^n + 2^(n-1) - 0.5
          // original y = y*2^n + 2^(n-1) - 0.5
          let originalX = posI * Math.pow(2, octave) + Math.pow(2, octave-1) - 0.5;
          let originalY = posJ * Math.pow(2, octave) + Math.pow(2, octave-1) - 0.5;
          originalX = originalX + u0 * Math.pow(2, octave);
          originalY = originalY + u1 * Math.pow(2, octave);
          if (originalX < 0 || originalX >= originalWidth || originalY < 0 || originalY >= originalHeight) return 0;

          const spScale = Math.min(Math.max(0, scale + u2), dogNumScalesPerOctaves);
          const mK = Math.pow(2, 1.0 / dogNumScalesPerOctaves);
          const newSigma = Math.pow(mK, spScale) * (1 << octave);

          saveScore(score);
          saveSigma(newSigma);
          saveX(originalX);
          saveY(originalY);

          return 1;
        }, {
          constants: {
            LAPLACIAN_SQR_THRESHOLD: LAPLACIAN_SQR_THRESHOLD,
            MAX_SUBPIXEL_DISTANCE_SQR: MAX_SUBPIXEL_DISTANCE_SQR,
            EDGE_HESSIAN_THRESHOLD: EDGE_HESSIAN_THRESHOLD,
            originalWidth: originalWidth,
            originalHeight: originalHeight,
            width: image1.width,
            height: image1.height,
            octave: octave,
            scale: scale,
            dogNumScalesPerOctaves: dogNumScalesPerOctaves,
          },
          output: [image1.width * image1.height],
          pipeline: true,
        })
      );
    }
    const kernel = this.kernels[this.kernelIndex++];
    const result = kernel(image0.data, image1.data, image2.data, startI, startJ, endI, endJ);
    return result;
  }

  _downsampleBilinear(image) {
    const dstWidth = Math.floor(image.width / 2);
    const dstHeight = Math.floor(image.height / 2);

    if (this.kernelIndex === this.kernels.length) {
      this.kernels.push(
        gpu.createKernel(function(data) {
          const width = this.constants.width;
          const srcWidth = width * 2;
          const j = Math.floor(this.thread.x / width);
          const i = this.thread.x % width;
          const srcPos = j * 2 * srcWidth + i * 2;
          const v = (data[srcPos] + data[srcPos+1] + data[srcPos+srcWidth] + data[srcPos+srcWidth+1]) * 0.25;
          return v;
        }, {
          constants: {width: dstWidth},
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
        gpu.createKernel(function(data) {
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
      const f1 = gpu.createKernel(function(data) {
        const width = this.constants.width;
        const j = Math.floor(this.thread.x / width);
        const i = this.thread.x % width;
        const joffset = j * width;
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

      const f2 = gpu.createKernel(function(data) {
        const width = this.constants.width;
        const height = this.constants.height;
        const j = Math.floor(this.thread.x / width);
        const i = this.thread.x % width;
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
        gpu.createKernel(function(data1, data2) {
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
