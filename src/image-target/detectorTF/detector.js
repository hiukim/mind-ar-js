const tf = require('@tensorflow/tfjs');
const {FREAKPOINTS} = require('./freak');

const PYRAMID_NUM_SCALES_PER_OCTAVES = 3;
const PYRAMID_MIN_SIZE = 8;
const PYRAMID_MAX_OCTAVE = 5;

const LAPLACIAN_THRESHOLD = 3;
const LAPLACIAN_SQR_THRESHOLD = LAPLACIAN_THRESHOLD * LAPLACIAN_THRESHOLD;
const MAX_SUBPIXEL_DISTANCE_SQR = 3 * 3;
const EDGE_THRESHOLD = 4.0;
const EDGE_HESSIAN_THRESHOLD = ((EDGE_THRESHOLD+1) * (EDGE_THRESHOLD+1) / EDGE_THRESHOLD);

const NUM_BUCKETS_PER_DIMENSION = 10;
const MAX_FEATURES_PER_BUCKET = 5;
const NUM_BUCKETS = NUM_BUCKETS_PER_DIMENSION * NUM_BUCKETS_PER_DIMENSION;
// total max feature points = NUM_BUCKETS * MAX_FEATURES_PER_BUCKET

const ORIENTATION_NUM_BINS = 36;
const ORIENTATION_SMOOTHING_ITERATIONS = 5;

const ORIENTATION_GAUSSIAN_EXPANSION_FACTOR = 3.0;
const ORIENTATION_REGION_EXPANSION_FACTOR = 1.5;
const FREAK_EXPANSION_FACTOR = 7.0;

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
      if (numOctaves === PYRAMID_MAX_OCTAVE) break;
    }
    this.numOctaves = numOctaves;

    this.tensorCaches = {};
    this.kernelCaches = {};
  }

  // used in compiler
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

  detect(inputImageT) {
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

    // Build difference-of-gaussian (dog) pyramid
    const dogPyramidImagesT = [];
    for (let i = 0; i < this.numOctaves; i++) {
      for (let j = 0; j < PYRAMID_NUM_SCALES_PER_OCTAVES - 1; j++) {
        if (i === 0 && j === 0) {
          dogPyramidImagesT.push(null); // the first dog image is never used, so skip to save memory
          continue;
        }

        dogPyramidImagesT.push(this._differenceImageBinomial(
	  pyramidImagesT[i * PYRAMID_NUM_SCALES_PER_OCTAVES + j],
	  pyramidImagesT[i * PYRAMID_NUM_SCALES_PER_OCTAVES + j + 1]
	));
      }
    }

    const dogIndexes = [];
    const extremasResultsT = [];
    // Find feature points (i.e. extremas in dog images)
    for (let k = 1; k < dogPyramidImagesT.length - 1; k++) {
      // Experimental result shows that no extrema is possible for odd number of k
      // I believe it has something to do with how the gaussian pyramid being constructed
      if (k % 2 === 1) continue;

      dogIndexes.push(k);

      const image0 = dogPyramidImagesT[k-1];
      const image1 = dogPyramidImagesT[k];
      const image2 = dogPyramidImagesT[k+1];

      // find all extrema for image1
      const extremasResultT = this._buildExtremas(k, image0, image1, image2);

      extremasResultsT.push(extremasResultT);
    }

    //console.log("ex", tf.gatherND(extremasResults[extremasResults.length-1], [0, 0]).arraySync());
    //return [];

    // divide the input into N by N buckets, and for each bucket,
    // collect the top 5 most significant extrema across extremas in all scale level
    // result would be NUM_BUCKETS x NUM_FEATURES_PER_BUCKET extremas
    const prunedExtremasT = this._applyPrune(extremasResultsT, dogIndexes);

    //console.log("prunedExtremas", prunedExtremas.arraySync());

    // compute the orientation angle for each pruned extremas
    const extremaHistogramsT = this._computeOrientationHistograms(prunedExtremasT, pyramidImagesT, dogIndexes);
    const smoothedHistogramsT = this._smoothHistograms(extremaHistogramsT);
    const extremaAnglesT = this._computeExtremaAngles(smoothedHistogramsT);

    // to compute freak descriptors, we first the pixel value of 37 freak points for each extrema 
    const extremaFreaksT = this._computeExtremaFreak(pyramidImagesT, this.numOctaves, prunedExtremasT, extremaAnglesT);
 
    // compute the bindary descriptors
    const freakDescriptorsT = this._computeFreakDescriptors(extremaFreaksT);

    // combine extrema data and return to cpu
    const combinedExtremasT = this._combine(prunedExtremasT, extremaAnglesT, freakDescriptorsT);
    const combinedExtremasArr = combinedExtremasT.arraySync();

    pyramidImagesT.forEach((t) => t.dispose());
    dogPyramidImagesT.forEach((t) => t && t.dispose());
    extremasResultsT.forEach((t) => t.dispose());
    prunedExtremasT.dispose();
    extremaHistogramsT.dispose();
    smoothedHistogramsT.dispose();
    extremaAnglesT.dispose();
    extremaFreaksT.dispose();
    freakDescriptorsT.dispose();
    combinedExtremasT.dispose();

    const featurePoints = [];

    for (let i = 0; i < combinedExtremasArr.length; i++) {
      for (let j = 0; j < combinedExtremasArr[i].length; j++) {
        if (combinedExtremasArr[i][j][0] !== 0) {
          const ext = combinedExtremasArr[i][j];

          const desc = ext.slice(5);
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
            scale: ext[3],
            angle: ext[4],
            descriptors: descriptors
          });
        }
      }
    }
    return featurePoints;
  }

  _combine(prunedExtremas, extremaAngles, freakDescriptors) {
    const nBuckets = NUM_BUCKETS_PER_DIMENSION * NUM_BUCKETS_PER_DIMENSION;

    if (!this.kernelCaches.combine) {
      // first dimension: [score, x, y, scale, angle, freak1, freak2, ..., freak37]
      const kernel =  {
	variableNames: ['extrema', 'angles', 'desc'],
	outputShape: [nBuckets, MAX_FEATURES_PER_BUCKET, 5 + FREAK_CONPARISON_COUNT],
	userCode: `
	  void main() {
	    ivec3 coords = getOutputCoords();
	    int bucketIndex = coords[0];
	    int featureIndex = coords[1];
	    int propertyIndex = coords[2];

	    if (propertyIndex == 0) {
	      setOutput(getExtrema(bucketIndex, featureIndex, 0));
	      return;
	    }
	    if (propertyIndex == 1) {
	      int extremaIndex = int(getExtrema(bucketIndex, featureIndex, 1));
	      int octave = extremaIndex + 1; // ref to buildExtrema, it starts at 2nd octave
	      float x = getExtrema(bucketIndex, featureIndex, 3);
	      float originalX = x * pow(2.0, float(octave)) + pow(2.0, float(octave-1)) - 0.5;
	      setOutput(originalX);
	      return;
	    }
	    if (propertyIndex == 2) {
	      int extremaIndex = int(getExtrema(bucketIndex, featureIndex, 1));
	      int octave = extremaIndex + 1; // ref to buildExtrema, it starts at 2nd octave
	      float y = getExtrema(bucketIndex, featureIndex, 2);
	      float originalY = y * pow(2.0, float(octave)) + pow(2.0, float(octave-1)) - 0.5;
	      setOutput(originalY);
	      return;
	    }
	    if (propertyIndex == 3) {
	      int extremaIndex = int(getExtrema(bucketIndex, featureIndex, 1));
	      int octave = extremaIndex + 1; // ref to buildExtrema, it starts at 2nd octave
	      float inputSigma = pow(2., float(octave));
	      setOutput(inputSigma);
	      return;
	    }
	    if (propertyIndex == 4) {
	      setOutput(getAngles(bucketIndex, featureIndex));
	      return;
	    }
	    setOutput( getDesc(bucketIndex, featureIndex, propertyIndex - 5));
	  }
	`
      }
      this.kernelCaches.combine = [kernel];
    }

    return tf.tidy(() => {
      const [program] = this.kernelCaches.combine;
      const result = tf.backend().compileAndRun(program, [prunedExtremas, extremaAngles, freakDescriptors]);
      return result;
    });
  }

  _computeFreakDescriptors(extremaFreaks) {
    if (!this.tensorCaches.computeFreakDescriptors) {
      const in1Arr = [];
      const in2Arr = [];
      for (let k1 = 0; k1 < extremaFreaks.shape[2]; k1++) {
	for (let k2 = k1+1; k2 < extremaFreaks.shape[2]; k2++) {
	  in1Arr.push(k1);
	  in2Arr.push(k2);
	}
      }
      const in1 = tf.tensor(in1Arr, [in1Arr.length]).cast('int32');
      const in2 = tf.tensor(in2Arr, [in2Arr.length]).cast('int32');

      this.tensorCaches.computeFreakDescriptors = {
	positionT: tf.keep(tf.stack([in1, in2], 1))
      }
    }

    const {positionT} = this.tensorCaches.computeFreakDescriptors;

    const nBuckets = NUM_BUCKETS_PER_DIMENSION * NUM_BUCKETS_PER_DIMENSION;
    const numFreakPoints = FREAKPOINTS.length

    if (!this.kernelCaches.computeFreakDescriptors) {
      const kernel =  {
	variableNames: ['freak', 'p'],
	outputShape: [nBuckets, MAX_FEATURES_PER_BUCKET, FREAK_CONPARISON_COUNT],
	userCode: `
	  void main() {
	    ivec3 coords = getOutputCoords();
	    int bucketIndex = coords[0];
	    int featureIndex = coords[1];
	    int descIndex = coords[2];

            int p1 = int(getP(descIndex, 0));
            int p2 = int(getP(descIndex, 1));

	    float v1 = getFreak(bucketIndex, featureIndex, p1);
	    float v2 = getFreak(bucketIndex, featureIndex, p2);

	    if (v1 < v2 + 0.01) {
	      setOutput(1.);
	      return;
	    }
	    setOutput(0.);
	  }
	`
      }
      this.kernelCaches.computeFreakDescriptors = [kernel];
    }

    return tf.tidy(() => {
      const [program] = this.kernelCaches.computeFreakDescriptors;
      const result = tf.backend().compileAndRun(program, [extremaFreaks, positionT]);
      return result;
    });
  }

  _computeExtremaFreak(pyramidImagesT, gaussianNumOctaves, prunedExtremas, prunedExtremasAngles) {
    const nBuckets = NUM_BUCKETS_PER_DIMENSION * NUM_BUCKETS_PER_DIMENSION;
    const mK = Math.pow(2, 1.0 / (PYRAMID_NUM_SCALES_PER_OCTAVES-1));
    const oneOverLogK = 1.0 / Math.log(mK);
    const expansionFactor = FREAK_EXPANSION_FACTOR;
    const gaussianNumScalesPerOctaves = PYRAMID_NUM_SCALES_PER_OCTAVES;
    
    if (!this.tensorCaches._computeExtremaFreak) {
      tf.tidy(() => {
	const freakPoints = tf.tensor(FREAKPOINTS);
	this.tensorCaches._computeExtremaFreak = {
	  freakPointsT: tf.keep(freakPoints),
	};
      });
    }

    const interestedGaussianIndexes = [];
    for (let i = 0; i < gaussianNumOctaves; i++) {
      for (let j = 0; j < PYRAMID_NUM_SCALES_PER_OCTAVES; j++) {
	// we didn't use the last scale image of each octave (except last octave), so skip those
	//   checkout implementation of kernel1
	if (j ===PYRAMID_NUM_SCALES_PER_OCTAVES -1 && i !== gaussianNumOctaves -1) continue;
	interestedGaussianIndexes.push(i * PYRAMID_NUM_SCALES_PER_OCTAVES + j);
      }
    }

    const {freakPointsT} = this.tensorCaches._computeExtremaFreak;

    if (!this.kernelCaches._computeExtremaFreak) {

      const kernel1 = {
	variableNames: ['extrema', 'angles', 'freakPoints'],
	outputShape: [nBuckets, MAX_FEATURES_PER_BUCKET, FREAKPOINTS.length, 3], // imageIndex, y, x
	userCode: `
	  void main() {
	    ivec4 coords = getOutputCoords();

	    int bucketIndex = coords[0];
	    int featureIndex = coords[1];
	    int freakIndex = coords[2];
	    int propertyIndex = coords[3];

	    float freakSigma = getFreakPoints(freakIndex, 0);
	    float freakX = getFreakPoints(freakIndex, 1);
	    float freakY = getFreakPoints(freakIndex, 2);

	    int extremaIndex = int(getExtrema(bucketIndex, featureIndex, 1));
	    float inputY = getExtrema(bucketIndex, featureIndex, 2);
	    float inputX = getExtrema(bucketIndex, featureIndex, 3);

            int inputOctave = extremaIndex + 1; // ref to buildExtrema, it starts at 2nd octave

	    float inputSigma = pow(2., float(inputOctave));
	    float inputAngle = getAngles(bucketIndex, featureIndex);

            // Ensure the scale of the similarity transform is at least "1".
            float transformScale = max(1., inputSigma * ${expansionFactor}.);
            float cos = transformScale * cos(inputAngle);
            float sin = transformScale * sin(inputAngle);

	    float sigma = transformScale * freakSigma;

	    int octave = int(floor(log(sigma) / ${Math.log(2)}));
	    float fscale = log( sigma / pow(2., float(octave))) * ${oneOverLogK};
            int scale = int(floor(fscale + 0.5)); // round() has problem in ios

            // sgima of last scale = sigma of the first scale in next octave
            // prefer coarser octaves for efficiency
            if ( scale == ${gaussianNumScalesPerOctaves} - 1) {
              octave = octave + 1;
              scale = 0;
            }
            // clip octave and scale
            if (octave < 0) {
              octave = 0;
              scale = 0;
            }
            if ( int(octave) >= ${gaussianNumOctaves}) {
              octave = ${gaussianNumOctaves} - 1;
              scale = ${gaussianNumScalesPerOctaves} - 1;
            }

            int imageIndex = octave * ${gaussianNumScalesPerOctaves} + scale;
	    if (propertyIndex == 0) {
	      setOutput(float(imageIndex));
	      return;
	    }

	    // 1) inputX, Y is the coordinate in the octave scale. scale it back respect to the original size (i.e. octave 0)

	    // 2) compute the freak point location, according to the orientation

            // 3) scale the freak point back into the octave scale

	    if (propertyIndex == 1) {
	      float originalY = inputY * pow(2.0, float(inputOctave)) + pow(2.0, float(inputOctave-1)) - 0.5;
	      float y = originalY + freakX * sin + freakY * cos;
	      float a = 1.0 / pow(2., float(octave));
	      float b = 0.5 * a - 0.5;
	      float yp = y * a + b; // y in octave
	      setOutput(yp);
	      return;
	    }
	    if (propertyIndex == 2) {
	      float originalX = inputX * pow(2.0, float(inputOctave)) + pow(2.0, float(inputOctave-1)) - 0.5;
	      float x = originalX + freakX * cos + freakY * -sin;
	      float a = 1.0 / pow(2., float(octave));
	      float b = 0.5 * a - 0.5;
	      float xp = x * a + b; // x in octave
	      setOutput(xp);
	      return;
	    }
	  }
	`
      };

      const kernel2 = [];
      for (let i = 0; i < interestedGaussianIndexes.length; i++) {
	const gaussianIndex = interestedGaussianIndexes[i];
	const height = pyramidImagesT[gaussianIndex].shape[0];
	const width = pyramidImagesT[gaussianIndex].shape[1];

	const subkernel = {
	  variableNames: ['pixel', 'position', 'combine'],
	  outputShape: [nBuckets, MAX_FEATURES_PER_BUCKET, FREAKPOINTS.length],
	  userCode: `
	    void main() {
	      ivec3 coords = getOutputCoords();
	      int bucketIndex = coords[0];
	      int featureIndex = coords[1];
	      int freakIndex = coords[2];

	      int imageIndex = int(getPosition(bucketIndex, featureIndex, freakIndex, 0));
	      if (imageIndex != ${gaussianIndex}) {
		setOutput(getCombine(bucketIndex, featureIndex, freakIndex));
		return;
	      }

	      float yp = getPosition(bucketIndex, featureIndex, freakIndex, 1);
	      float xp = getPosition(bucketIndex, featureIndex, freakIndex, 2);

	      int x0 = int(floor(xp));
	      int x1 = x0 + 1;
	      int y0 = int(floor(yp));
	      int y1 = y0 + 1;

	      if (x0 < 0 || x1 >= ${width} || y0 < 0 || y1 >= ${height}) {
		setOutput(0.);
		return;
	      }

	      float f1 = getPixel(y0, x0);
	      float f2 = getPixel(y0, x1);
	      float f3 = getPixel(y1, x0);
	      float f4 = getPixel(y1, x1);

	      float x1f = float(x1);
	      float y1f = float(y1);
	      float x0f = float(x0);
	      float y0f = float(y0);

	      // ratio for interpolation between four neighbouring points
	      float value = (x1f - xp) * (y1f - yp) * f1
			  + (xp - x0f) * (y1f - yp) * f2
			  + (x1f - xp) * (yp - y0f) * f3
			  + (xp - x0f) * (yp - y0f) * f4;

	      setOutput(value);
	    }
	  `
	}
	kernel2.push(subkernel);
      }

      this.kernelCaches._computeExtremaFreak = [kernel1, kernel2];
    }

    return tf.tidy(() => {
      const [program1, program2] = this.kernelCaches._computeExtremaFreak;
      
      const positionT = tf.backend().compileAndRun(program1, [prunedExtremas, prunedExtremasAngles, freakPointsT]);
      let combined = tf.zeros([nBuckets, MAX_FEATURES_PER_BUCKET, FREAKPOINTS.length]);
      for (let i = 0; i < interestedGaussianIndexes.length; i++) {
	const gaussianIndex = interestedGaussianIndexes[i];
	combined = tf.backend().compileAndRun(program2[i], [pyramidImagesT[gaussianIndex], positionT, combined]);
      }
      return combined;
    });
  }

  _computeExtremaAngles(histograms) {
    const nBuckets = NUM_BUCKETS_PER_DIMENSION * NUM_BUCKETS_PER_DIMENSION;
    if (!this.kernelCaches.computeExtremaAngles) {
      const kernel = {
	variableNames: ['histogram'],
	outputShape: [nBuckets, MAX_FEATURES_PER_BUCKET],
	userCode: `
	  void main() {
	    ivec2 coords = getOutputCoords();

	    int bucketIndex = coords[0];
	    int featureIndex = coords[1];

	    int maxIndex = 0;
	    for (int i = 1; i < ${ORIENTATION_NUM_BINS}; i++) {
	      if (getHistogram(bucketIndex, featureIndex, i) > getHistogram(bucketIndex, featureIndex, maxIndex)) {
		maxIndex = i;
	      }
	    }

	    int prev = imod(maxIndex - 1 + ${ORIENTATION_NUM_BINS}, ${ORIENTATION_NUM_BINS});
	    int next = imod(maxIndex + 1, ${ORIENTATION_NUM_BINS});

	    /**
	     * Fit a quatratic to 3 points. The system of equations is:
	     *
	     * y0 = A*x0^2 + B*x0 + C
	     * y1 = A*x1^2 + B*x1 + C
	     * y2 = A*x2^2 + B*x2 + C
	     *
	     * This system of equations is solved for A,B,C.
	     */
	    float p10 = float(maxIndex - 1);
	    float p11 = getHistogram(bucketIndex, featureIndex, prev); 
	    float p20 = float(maxIndex);
	    float p21 = getHistogram(bucketIndex, featureIndex, maxIndex); 
	    float p30 = float(maxIndex + 1);
	    float p31 = getHistogram(bucketIndex, featureIndex, next); 

	    float d1 = (p30-p20)*(p30-p10);
	    float d2 = (p10-p20)*(p30-p10);
	    float d3 = p10-p20;

	    // If any of the denominators are zero then, just use maxIndex.
            float fbin = float(maxIndex);
	    if ( abs(d1) > 0.00001 && abs(d2) > 0.00001 && abs(d3) > 0.00001) {
	      float a = p10*p10;
	      float b = p20*p20;

	      // Solve for the coefficients A,B,C
	      float A = ((p31-p21)/d1)-((p11-p21)/d2);
	      float B = ((p11-p21)+(A*(b-a)))/d3;
	      float C = p11-(A*a)-(B*p10);
	      fbin = -B / (2. * A);
	    }

	    float an =  2.0 * ${Math.PI} * ((fbin + 0.5 + ${ORIENTATION_NUM_BINS}.) / ${ORIENTATION_NUM_BINS}.);

	    for (int i = 0; i < 3; i++) { // stupid modula, while loop not support
	      if (an > 2.0 * ${Math.PI}) {
		an -= 2.0 * ${Math.PI};
	      }
	    }
	    setOutput(an);
	  }
	`
      }
      this.kernelCaches.computeExtremaAngles = kernel;
    }
    return tf.tidy(() => {
      const program = this.kernelCaches.computeExtremaAngles; 
      const result = tf.backend().compileAndRun(program, [histograms]);
      return result;
    });
  }

  _computeOrientationHistograms(prunedExtremas, pyramidImagesT, dogIndexes) {
    const nBuckets = NUM_BUCKETS_PER_DIMENSION * NUM_BUCKETS_PER_DIMENSION;
    const regionExpansionFactor = ORIENTATION_REGION_EXPANSION_FACTOR;
    const gaussianExpansionFactor = ORIENTATION_GAUSSIAN_EXPANSION_FACTOR;
    const oneOver2PI = 0.159154943091895;

    const gaussianImagesT = [];
    for (let i = 0; i < dogIndexes.length; i++) {
      const dogIndex = dogIndexes[i];
      const octave = Math.floor(dogIndex / (PYRAMID_NUM_SCALES_PER_OCTAVES-1));
      const scale = dogIndex % (PYRAMID_NUM_SCALES_PER_OCTAVES-1) + 1;
      const gaussianIndex = octave * PYRAMID_NUM_SCALES_PER_OCTAVES + scale;
      gaussianImagesT.push(pyramidImagesT[gaussianIndex]);
    }

    if (!this.tensorCaches.orientationHistograms) {
      tf.tidy(() => {
        const sigma = 1; // because scale always 0, as dogIndex % 2 === 0. if not true, then it needs to be fixed
        const gwSigma = Math.max(1.0, gaussianExpansionFactor * sigma);
        const gwScale = -1.0 / (2 * gwSigma * gwSigma);
        const radius = regionExpansionFactor * gwSigma;
        const radiusCeil = Math.ceil(radius);

	const radialProperties = [];
        for (let y = -radiusCeil; y <= radiusCeil; y++) {
          for (let x = -radiusCeil; x <= radiusCeil; x++) {
	    const distanceSquare = x * x + y * y;

            if (distanceSquare <= radius * radius) {
	      const _x = distanceSquare * gwScale; 
	      // fast expontenial approx
	      const w = (720+_x*(720+_x*(360+_x*(120+_x*(30+_x*(6+_x))))))*0.0013888888;
	      radialProperties.push([y, x, w]);
            }
          }
        }
	const imageSizes = [];
	for (let i = 0; i < gaussianImagesT.length; i++) {
	  imageSizes.push([gaussianImagesT[i].shape[0], gaussianImagesT[i].shape[1]]);
	}

        this.tensorCaches.orientationHistograms = {
          radialPropertiesT: tf.keep(tf.tensor(radialProperties, [radialProperties.length, 3])),
	  imageSizesT: tf.keep(tf.tensor(imageSizes, [imageSizes.length, 2]))
        }
      });
    }
    const {radialPropertiesT, imageSizesT} = this.tensorCaches.orientationHistograms;

    if (!this.kernelCaches.computeOrientationHistograms) {
      const imageVariableNames = [];
      for (let i = 0; i < gaussianImagesT.length; i++) {
	imageVariableNames.push('image' + i);
      }

      let kernel1SubCodes = `float getPixel(int gaussianIndex, int y, int x) {`;
      for (let i = 0; i < gaussianImagesT.length; i++) {
	kernel1SubCodes += `
	  if (gaussianIndex == ${i}) {
	    return getImage${i}(y, x);
	  }
	`
      }
      kernel1SubCodes += `}`;

      const kernel1 = {
	variableNames: [...imageVariableNames, 'imageSizes', 'extrema', 'radial'],
	outputShape: [nBuckets, MAX_FEATURES_PER_BUCKET, radialPropertiesT.shape[0], 2], // last dimension: [fbin, magnitude]
	userCode: `
	  ${kernel1SubCodes}

	  void main() {
	    ivec4 coords = getOutputCoords();
	    int bucketIndex = coords[0];
	    int featureIndex = coords[1];
	    int radialIndex = coords[2];
	    int propertyIndex = coords[3];

	    int radialY = int(getRadial(radialIndex, 0));
	    int radialX = int(getRadial(radialIndex, 1));
	    float radialW = getRadial(radialIndex, 2);

	    int extremaIndex = int(getExtrema(bucketIndex, featureIndex, 1));
	    int y = int(getExtrema(bucketIndex, featureIndex, 2));
	    int x = int(getExtrema(bucketIndex, featureIndex, 3));

	    int imageHeight = int(getImageSizes(extremaIndex, 0));
	    int imageWidth = int(getImageSizes(extremaIndex, 1));

	    int xp = x + radialX;
	    int yp = y + radialY;

	    if (xp < 1 || xp >= imageWidth - 1 || yp < 1 || yp >= imageHeight - 1) {
	      setOutput(0.);
	      return;
	    }

	    float dy = getPixel(extremaIndex, yp+1, xp) - getPixel(extremaIndex, yp-1, xp);
	    float dx = getPixel(extremaIndex, yp, xp+1) - getPixel(extremaIndex, yp, xp-1);

	    if (propertyIndex == 0) {
	      float angle = atan(dy, dx) + ${Math.PI};
	      float fbin = angle * ${ORIENTATION_NUM_BINS}. * ${oneOver2PI};
	      setOutput(fbin);
	      return;
	    }

	    if (propertyIndex == 1) {
	      float mag = sqrt(dx * dx + dy * dy);
	      float magnitude = radialW * mag;
	      setOutput(magnitude);
	      return;
	    }
	  }

	`
      }

      const kernel2 = {
	variableNames: ['fbinMag'],
	outputShape: [nBuckets, MAX_FEATURES_PER_BUCKET, ORIENTATION_NUM_BINS],
	userCode: `
	  void main() {
	    ivec3 coords = getOutputCoords();
	    int bucketIndex = coords[0];
	    int featureIndex = coords[1];
	    int binIndex = coords[2];

	    float sum = 0.;
	    for (int i = 0; i < ${radialPropertiesT.shape[0]}; i++) {
	      float fbin = getFbinMag(bucketIndex, featureIndex, i, 0);
	      int bin = int(floor(fbin - 0.5));
	      int b1 = imod(bin + ${ORIENTATION_NUM_BINS}, ${ORIENTATION_NUM_BINS});
	      int b2 = imod(bin + 1 + ${ORIENTATION_NUM_BINS}, ${ORIENTATION_NUM_BINS});

	      if (b1 == binIndex || b2 == binIndex) {
		float magnitude = getFbinMag(bucketIndex, featureIndex, i, 1);
		float w2 = fbin - float(bin) - 0.5;
		float w1 = w2 * -1. + 1.;

		if (b1 == binIndex) {
		  sum += w1 * magnitude;
		}
		if (b2 == binIndex) {
		  sum += w2 * magnitude;
		}
	      }
	    }
	    setOutput(sum);
	  }
	`
      }

      this.kernelCaches.computeOrientationHistograms = [kernel1, kernel2];
    }

    return tf.tidy(() => {
      const [program1, program2] = this.kernelCaches.computeOrientationHistograms;
      const result1 = tf.backend().compileAndRun(program1, [...gaussianImagesT, imageSizesT, prunedExtremas, radialPropertiesT]);
      const result2 = tf.backend().compileAndRun(program2, [result1]);
      return result2;
    });
  }

  // The histogram is smoothed with a Gaussian, with sigma = 1
  _smoothHistograms(histograms) {
    const nBuckets = NUM_BUCKETS_PER_DIMENSION * NUM_BUCKETS_PER_DIMENSION;

    if (!this.kernelCaches.smoothHistograms) {
      const kernel = {
	variableNames: ['histogram'],
	outputShape: [nBuckets, MAX_FEATURES_PER_BUCKET, ORIENTATION_NUM_BINS],
	userCode: `
	  void main() {
	    ivec3 coords = getOutputCoords();

	    int bucketIndex = coords[0];
	    int featureIndex = coords[1];
	    int binIndex = coords[2];

	    int prevBin = imod(binIndex - 1 + ${ORIENTATION_NUM_BINS}, ${ORIENTATION_NUM_BINS});
	    int nextBin = imod(binIndex + 1, ${ORIENTATION_NUM_BINS});

            float result = 0.274068619061197 * getHistogram(bucketIndex, featureIndex, prevBin) + 0.451862761877606 * getHistogram(bucketIndex, featureIndex, binIndex) + 0.274068619061197 * getHistogram(bucketIndex, featureIndex, nextBin);

	    setOutput(result);
	  }
	`
      }
      this.kernelCaches.smoothHistograms = kernel;
    }
    return tf.tidy(() => {
      const program = this.kernelCaches.smoothHistograms; 
      for (let i = 0; i < ORIENTATION_SMOOTHING_ITERATIONS; i++) {
	histograms = tf.backend().compileAndRun(program, [histograms]);
      }
      return histograms;
    });
  }

  // faster to do it in CPU
  // if we do in gpu, we probably need to use tf.topk(), which seems to be run in CPU anyway (no gpu operation for that)
  _applyPrune(extremasResultsT, dogIndexes) {
    const nBuckets = NUM_BUCKETS_PER_DIMENSION * NUM_BUCKETS_PER_DIMENSION;
    const nFeatures = MAX_FEATURES_PER_BUCKET;

    // combine results into a tensor of:
    //   nBuckets x nFeatures x [score, extremaIndex, y, x]
    const curAbsScores = [];
    const result = [];
    for (let i = 0; i < nBuckets; i++) {
      result.push([]);
      curAbsScores.push([]);
      for (let j = 0; j < nFeatures; j++) {
	result[i].push([0,0,0,0]);
	curAbsScores[i].push(0);
      }
    }

    for (let k = 0; k < extremasResultsT.length; k++) {
      const extremaScoresT = extremasResultsT[k];
      const extremaScores = extremaScoresT.arraySync();

      const height = extremaScoresT.shape[0];
      const width = extremaScoresT.shape[1];

      const bucketWidth = width / NUM_BUCKETS_PER_DIMENSION;
      const bucketHeight = height / NUM_BUCKETS_PER_DIMENSION;

      for (let j = 0; j < height; j++) {
	for (let i = 0; i < width; i++) {
	  const bucketX = Math.floor(i / bucketWidth);
	  const bucketY = Math.floor(j / bucketHeight);
	  const bucket = bucketY * NUM_BUCKETS_PER_DIMENSION + bucketX;

	  const score = extremaScores[j][i];
	  const absScore = Math.abs(score);

	  let tIndex = nFeatures;
	  while (tIndex >= 1 && absScore > curAbsScores[bucket][tIndex-1]) {
	    tIndex -= 1;
	  }

	  if (tIndex < nFeatures) {
	    for (let t = nFeatures - 1; t >= tIndex+1; t--) {
	      curAbsScores[bucket][t] = curAbsScores[bucket][t-1];
	      result[bucket][t][0] = result[bucket][t-1][0];
	      result[bucket][t][1] = result[bucket][t-1][1];
	      result[bucket][t][2] = result[bucket][t-1][2];
	      result[bucket][t][3] = result[bucket][t-1][3];
	    }
	    curAbsScores[bucket][tIndex] = absScore;
	    result[bucket][tIndex][0] = score;
	    result[bucket][tIndex][1] = k; 
	    result[bucket][tIndex][2] = j; 
	    result[bucket][tIndex][3] = i; 
	  }
	}
      }
    }
    return tf.tensor(result, [result.length, result[0].length, result[0][0].length]);
  }

  _buildExtremas(dogIndex, image0, image1, image2) {
    const imageHeight = image1.shape[0];
    const imageWidth = image1.shape[1];

    const kernelKey = 'w' + imageWidth;

    if (!this.kernelCaches.buildExtremas) {
      this.kernelCaches.buildExtremas = {};
    }
    if (!this.kernelCaches.buildExtremas[kernelKey]) {
      const kernel = {
	variableNames: ['image0', 'image1', 'image2'],
	outputShape: [imageHeight, imageWidth],
	userCode: `
	  void main() {
	    ivec2 coords = getOutputCoords();

	    int y = coords[0];
	    int x = coords[1];

	    // Step 1: find local maxima/minima
	    if (y == 0 || y == ${imageHeight} - 1 || x == 0 || x == ${imageWidth} - 1) {
	      setOutput(0.);
	      return;
	    }
	    if (getImage1(y, x) * getImage1(y, x) < ${LAPLACIAN_SQR_THRESHOLD}.) {
	      setOutput(0.);
	      return;
	    }

	    bool isMax = true;
	    for (int dy = -1; dy <= 1; dy++) {
	      for (int dx = -1; dx <= 1; dx++) {
	        if (getImage1(y, x) < getImage0(y+dy, x+dx)) {
		  isMax = false;
		}
	        if (getImage1(y, x) < getImage2(y+dy, x+dx)) {
		  isMax = false;
		}
	        if (getImage1(y, x) < getImage1(y+dy, x+dx)) {
		  isMax = false;
		}
	      }
	    }
	    bool isMin = false;
	    if (!isMax) {
	      isMin = true;

	      for (int dy = -1; dy <= 1; dy++) {
		for (int dx = -1; dx <= 1; dx++) {
		  if (getImage1(y, x) > getImage0(y+dy, x+dx)) {
		    isMin = false;
		  }
		  if (getImage1(y, x) > getImage2(y+dy, x+dx)) {
		    isMin = false;
		  }
		  if (getImage1(y, x) > getImage1(y+dy, x+dx)) {
		    isMin = false;
		  }
		}
	      }
	    }

	    if (!isMax && !isMin) {
	      setOutput(0.);
	      return;
	    }

	    // Step 2: sub-pixel refinement (I'm not sure what that means. Any educational ref?)
	    
	    // Compute spatial derivatives
	    float dx = 0.5 * (getImage1(y, x+1) - getImage1(y, x-1));
	    float dy = 0.5 * (getImage1(y+1, x) - getImage1(y-1, x));
	    float dxx = getImage1(y, x+1) + getImage1(y, x-1) - 2. * getImage1(y, x);
	    float dyy = getImage1(y+1, x) + getImage1(y-1, x) - 2. * getImage1(y, x);
	    float dxy = 0.25 * (getImage1(y-1,x-1) + getImage1(y+1,x+1) - getImage1(y-1,x+1) - getImage1(y+1,x-1));

	    // Compute scale derivates
	    float ds = 0.5 * (getImage2(y, x) - getImage0(y, x)); 
	    float dss = getImage2(y, x) + getImage0(y, x) - 2. * getImage1(y, x);
	    float dxs = 0.25 * ((getImage0(y, x-1) - getImage0(y, x+1)) + (getImage2(y, x+1) - getImage2(y, x-1)));
	    float dys = 0.25 * ((getImage0(y-1, x) - getImage0(y+1, x)) + (getImage2(y+1, x) - getImage2(y-1, x)));

	    // Solve Hessian A * u = b;
	    float A0 = dxx;
	    float A1 = dxy;
	    float A2 = dxs;
	    float A3 = dxy;
	    float A4 = dyy;
	    float A5 = dys;
	    float A6 = dxs;
	    float A7 = dys;
	    float A8 = dss;
	    float b0 = -dx;
	    float b1 = -dy;
	    float b2 = -ds;

	    float detA = A0 * A4 * A8
		       - A0 * A5 * A5
		       - A4 * A2 * A2
		       - A8 * A1 * A1
		       + 2. * A1 * A2 * A5;

	    // B = inverse of A
	    float B0 = A4 * A8 - A5 * A7;
	    float B1 = A2 * A7 - A1 * A8;
	    float B2 = A1 * A5 - A2 * A4;
	    float B3 = B1;
	    float B4 = A0 * A8 - A2 * A6;
	    float B5 = A2 * A3 - A0 * A5;
	    float B6 = B2;
	    float B7 = B5;
	    float B8 = A0 * A4 - A1 * A3;

	    float u0 = (B0 * b0 + B1 * b1 + B2 * b2) / detA;
	    float u1 = (B3 * b0 + B4 * b1 + B5 * b2) / detA;
	    float u2 = (B6 * b0 + B7 * b1 + B8 * b2) / detA;

	    // If points move too much in the sub-pixel update, then the point probably unstable.
	    if (u0 * u0 + u1 * u1 > ${MAX_SUBPIXEL_DISTANCE_SQR}.) {
	      setOutput(0.);
	      return;
	    }

	    // compute edge score
	    float det = (dxx * dyy) - (dxy * dxy);

	    if (abs(det) < 0.0001) { // determinant undefined. no solution
	      setOutput(0.);
	      return;
	    }

	    float edgeScore = (dxx + dyy) * (dxx + dyy) / det;

	    if (abs(edgeScore) >= ${EDGE_HESSIAN_THRESHOLD} ) {
	      setOutput(0.);
	      return;
	    }

	    float score = getImage1(y, x) - (b0 * u0 + b1 * u1 + b2 * u2);

	    if (score * score < ${LAPLACIAN_SQR_THRESHOLD}.) {
	      setOutput(0.);
	      return;
	    }

	    setOutput(score);
	  }
	`
      };
      this.kernelCaches.buildExtremas[kernelKey] = kernel;
    }

    return tf.tidy(() => {
      const program = this.kernelCaches.buildExtremas[kernelKey];

      if (Math.floor(image0.shape[1]/2) === image1.shape[1]) {
        image0 = this._downsampleBilinear(image0);
      }
      const result = tf.backend().compileAndRun(program, [image0, image1, image2]);
      return result;
    });
  }

  _differenceImageBinomial(image1, image2) {
    return tf.tidy(() => {
      return image1.sub(image2);
    });
  }

  // 4th order binomail filter [1,4,6,4,1] X [1,4,6,4,1]
  _applyFilter(image) {
    const imageHeight = image.shape[0];
    const imageWidth = image.shape[1];

    const kernelKey = 'w' + imageWidth;
    if (!this.kernelCaches.applyFilter) {
      this.kernelCaches.applyFilter = {};
    }

    if (!this.kernelCaches.applyFilter[kernelKey]) {
      const imaxmin = `
	int imax(int a, int b) {
	  if (a > b) return a;
	  return b;
	}
	int imin(int a, int b) {
	  if (a < b) return a;
	  return b;
	}

      `
      const kernel1 = {
	variableNames: ['p'],
	outputShape: [imageHeight, imageWidth],
	userCode: `
 	  ${imaxmin}
	  void main() {
	    ivec2 coords = getOutputCoords();

	    float sum = getP(coords[0], imax(0, coords[1]-2));
	    sum += getP(coords[0], imax(0, coords[1]-1)) * 4.;
	    sum += getP(coords[0], coords[1]) * 6.;
	    sum += getP(coords[0], imin(${imageWidth}-1, coords[1]+1)) * 4.;
	    sum += getP(coords[0], imin(${imageWidth}-1, coords[1]+2));
	    setOutput(sum);
	  }
	`
      };

      const kernel2 = {
	variableNames: ['p'],
	outputShape: [imageHeight, imageWidth],
	userCode: `
 	  ${imaxmin}
	  void main() {
	    ivec2 coords = getOutputCoords();

	    float sum = getP(imax(coords[0]-2, 0), coords[1]);
	    sum += getP(imax(coords[0]-1, 0), coords[1]) * 4.;
	    sum += getP(coords[0], coords[1]) * 6.;
	    sum += getP(imin(coords[0]+1, ${imageHeight}-1), coords[1]) * 4.;
	    sum += getP(imin(coords[0]+2, ${imageHeight}-1), coords[1]);
	    sum /= 256.;
	    setOutput(sum);
	  }
	`
      };
      this.kernelCaches.applyFilter[kernelKey] = [kernel1, kernel2];
    }

    return tf.tidy(() => {
      const [program1, program2] = this.kernelCaches.applyFilter[kernelKey];

      const result1 = tf.backend().compileAndRun(program1, [image]);
      const result2 = tf.backend().compileAndRun(program2, [result1]);
      return result2;
    });
  }

  _downsampleBilinear(image) {
    const imageHeight = image.shape[0];
    const imageWidth = image.shape[1];

    const kernelKey = 'w' + imageWidth;
    if (!this.kernelCaches.downsampleBilinear) {
      this.kernelCaches.downsampleBilinear = {};
    }

    if (!this.kernelCaches.downsampleBilinear[kernelKey]) {
      const kernel = {
	variableNames: ['p'],
	outputShape: [Math.floor(imageHeight/2), Math.floor(imageWidth/2)],
	userCode: `
	  void main() {
	    ivec2 coords = getOutputCoords();
	    int y = coords[0] * 2;
	    int x = coords[1] * 2;
	    float sum = getP(y, x) + getP(y+1,x) + getP(y, x+1) + getP(y+1,x+1);
	    sum *= 0.25;
	    setOutput(sum);
	  }
	`
      };
      this.kernelCaches.downsampleBilinear[kernelKey] = kernel;
    }

    return tf.tidy(() => {
      const program = this.kernelCaches.downsampleBilinear[kernelKey];
      const result = tf.backend().compileAndRun(program, [image]);
      return result;
    });
  }
}

module.exports = {
  Detector
};
