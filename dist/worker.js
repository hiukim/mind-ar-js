/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/~hiukim/projects/WebCards/mind-ar-js/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/compiler.worker.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/compiler.worker.js":
/*!********************************!*\
  !*** ./src/compiler.worker.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const {extract} = __webpack_require__(/*! ./image-target/tracking/extractor.js */ "./src/image-target/tracking/extractor.js");
//const {Detector} = require('./image-target/detectorGPU/detector.js'); // gpu startup is very slow
const {Detector} = __webpack_require__(/*! ./image-target/detectorCPU/detector.js */ "./src/image-target/detectorCPU/detector.js");
const {build: hierarchicalClusteringBuild} = __webpack_require__(/*! ./image-target/matching/hierarchical-clustering.js */ "./src/image-target/matching/hierarchical-clustering.js");
const {buildImageList} = __webpack_require__(/*! ./image-target/image-list.js */ "./src/image-target/image-list.js");

onmessage = (msg) => {
  const {data} = msg;
  if (data.type === 'compile') {
    const {targetImages} = data;
    const list = [];
    for (let i = 0; i < targetImages.length; i++) {
      console.log("compiling...", i);
      const targetImage = targetImages[i];
      const imageList = buildImageList(targetImage);
      const trackingData = _extractTrackingFeatures(imageList);
      const matchingData = _extractMatchingFeatures(imageList);
      list.push({
        targetImage,
        imageList,
        trackingData,
        matchingData
      });
    }
    postMessage({
      type: 'compileDone',
      list,
    });
  }
};

const _extractMatchingFeatures = (imageList) => {
  const keyframes = [];
  for (let i = 0; i < imageList.length; i++) {
    const image = imageList[i];
    const detector = new Detector(image.width, image.height);
    const ps = detector.detectImageData(image.data);

    const keypoints = [];
    const dpi = 1.0;
    for (let i = 0; i < ps.length; i++) {
      keypoints.push({
        x2D: ps[i].x,
        y2D: ps[i].y,
        x3D: (ps[i].x + 0.5) / image.dpi,
        y3D: ((image.height-0.5) - ps[i].y) / image.dpi,
        angle: ps[i].angle,
        scale: ps[i].sigma,
        maxima: ps[i].score > 0,
        descriptors: ps[i].descriptors
      })
    }
    const pointsCluster = hierarchicalClusteringBuild({points: keypoints});
    keyframes.push({points: keypoints, pointsCluster, width: image.width, height: image.height});
  }
  return keyframes;
}

const _extractTrackingFeatures = (imageList) => {
  const featureSets = [];
  for (let i = 0; i < imageList.length; i++) {
    const image = imageList[i];
    const coords = extract(image);

    const featureSet = {};
    featureSet.scale = i;
    featureSet.mindpi = (i === imageList.length-1)? imageList[i].dpi * 0.5: imageList[i+1].dpi;
    featureSet.maxdpi = (i === 0)? imageList[i].dpi * 2: (imageList[i].dpi * 0.8 + imageList[i-1].dpi * 0.2);
    featureSet.coords = [];
    for (let j = 0; j < coords.length; j++) {
      featureSet.coords.push({
        mx: coords[j].mx,
        my: coords[j].my,
      });
    }
    featureSets.push(featureSet);
  }
  return featureSets;
}


/***/ }),

/***/ "./src/image-target/detectorCPU/detector.js":
/*!**************************************************!*\
  !*** ./src/image-target/detectorCPU/detector.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const {upsampleBilinear, downsampleBilinear} = __webpack_require__(/*! ../utils/images.js */ "./src/image-target/utils/images.js");
const {build: buildGaussianPyramid} = __webpack_require__(/*! ./gaussian-pyramid */ "./src/image-target/detectorCPU/gaussian-pyramid.js");
const {build: buildDoGPyramid} = __webpack_require__(/*! ./dog-pyramid */ "./src/image-target/detectorCPU/dog-pyramid.js");
const {extract} = __webpack_require__(/*! ./freak-extractor */ "./src/image-target/detectorCPU/freak-extractor.js");

const PYRAMID_NUM_SCALES_PER_OCTAVES = 3;
const PYRAMID_MIN_SIZE = 8;

const MAX_SUBPIXEL_DISTANCE_SQR = 3 * 3;
const LAPLACIAN_SQR_THRESHOLD = 3 * 3;
const EDGE_THRESHOLD = 4.0;
const EDGE_HESSIAN_THRESHOLD = ((EDGE_THRESHOLD+1) * (EDGE_THRESHOLD+1) / EDGE_THRESHOLD);
const MAX_FEATURE_POINTS = 500;
const PRUNE_FEATURES_NUM_BUCKETS = 10; // per dimension

const ORIENTATION_NUM_BINS = 36;
const ORIENTATION_GAUSSIAN_EXPANSION_FACTOR = 3.0;
const ORIENTATION_REGION_EXPANSION_FACTOR = 1.5;
const ORIENTATION_SMOOTHING_ITERATIONS = 5;
const ORIENTATION_PEAK_THRESHOLD = 0.8;

const ONE_OVER_2PI = 0.159154943091895;

class Detector {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.processData = null;
  }

  detect(input) {
    if (this.processData === null) {
      this.processCanvas = document.createElement('canvas');
      this.processCanvas.width = this.width;
      this.processCanvas.height = this.height;
      this.workerProcessContext = this.processCanvas.getContext('2d');
      this.processData = new Uint8Array(this.width * this.height);
    }
    this.workerProcessContext.clearRect(0, 0, this.width, this.height);
    this.workerProcessContext.drawImage(input, 0, 0, this.width, this.height);
    const imageData = this.workerProcessContext.getImageData(0, 0, this.width, this.height);

    for (let i = 0; i < this.processData.length; i++) {
      const offset = i * 4;
      //this.processData[i] = Math.floor((imageData.data[offset] + imageData.data[offset+1] + imageData.data[offset+2])/3);
      this.processData[i] = (imageData.data[offset] + imageData.data[offset+1] + imageData.data[offset+2])/3;
    }
    return this.detectImageData(this.processData);
  }

  detectImageData(imageData) {
    const image = {data: imageData, width: this.width, height: this.height};

    const gaussianPyramid = buildGaussianPyramid({image, minSize: PYRAMID_MIN_SIZE, numScalesPerOctaves: PYRAMID_NUM_SCALES_PER_OCTAVES});

    const dogPyramid = buildDoGPyramid({gaussianPyramid: gaussianPyramid});

    const featurePoints = _detectFeaturePoints({gaussianPyramid: gaussianPyramid, dogPyramid: dogPyramid});

    const descriptors = extract({pyramid: gaussianPyramid, points: featurePoints});

    for (let i = 0; i < featurePoints.length; i++) {
      featurePoints[i].descriptors = descriptors[i];
    }
    return featurePoints;
  }
}

// Detect minima and maximum in Laplacian images
const _detectFeaturePoints = ({gaussianPyramid, dogPyramid}) => {
  if (typeof window !== 'undefined' && window.DEBUG_TIME) {
    var _start = new Date().getTime();
  }

  const originalWidth = dogPyramid.images[0].width;
  const originalHeight = dogPyramid.images[0].height;

  const mK = Math.pow(2, 1.0 / (gaussianPyramid.numScalesPerOctaves-1));

  const featurePoints = [];

  let extremaCount = 0;
  for (let k = 1; k < dogPyramid.images.length - 1; k++) {
    // Experimental result shows that no extrema is possible for odd number of k
    // I believe it has something to do with how the gaussian pyramid being constructed
    if (k % 2 === 1) continue;

    let image0 = dogPyramid.images[k-1];
    let image1 = dogPyramid.images[k];
    let image2 = dogPyramid.images[k+1];

    const octave = Math.floor(k / dogPyramid.numScalesPerOctaves);
    const scale = k % dogPyramid.numScalesPerOctaves;

    let hasUpsample = false;
    let hasPadOneWidth = false;
    let hasPadOneHeight = false;

    if ( Math.floor(image0.width/2) == image1.width) {
      if (typeof window !== 'undefined' && window.DEBUG_TIME) {
        var __start = new Date().getTime();
      }
      image0 = downsampleBilinear({image: image0});
      if (typeof window !== 'undefined' && window.DEBUG_TIME) {
        console.log('exec time downsampleBilinear', image0.width, new Date().getTime() - __start);
      }
    }

    if ( Math.floor(image1.width/2) == image2.width) {
      hasUpsample = true;
      hasPadOneWidth = image1.width % 2 === 1;
      hasPadOneHeight = image1.height % 2 === 1;
      if (typeof window !== 'undefined' && window.DEBUG_TIME) {
        var __start = new Date().getTime();
      }
      image2 = upsampleBilinear({image: image2, padOneWidth: hasPadOneWidth, padOneHeight: hasPadOneHeight});
      if (typeof window !== 'undefined' && window.DEBUG_TIME) {
        console.log('exec time upsampleBilinear', new Date().getTime() - __start);
      }
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

    for (let j = startJ; j < endJ; j++) {
      for (let i = startI; i < endI; i++) {
        const pos = j*image1.width + i;
        const v = image1.data[pos];

        if (v*v < LAPLACIAN_SQR_THRESHOLD) continue;

        // Step 1: find maxima/ minima in laplacian images
        let isMax = true;
        for (let d = 0; d < neighbours.length; d++) {
          if (v <= image0.data[pos+neighbours[d]]) {isMax = false; break};
          if (v <= image2.data[pos+neighbours[d]]) {isMax = false; break};
          if (d !== 0 && v <= image1.data[pos+neighbours[d]]) {isMax = false; break};
        }
        let isMin = true;
        for (let d = 0; d < neighbours.length; d++) {
          if (v >= image0.data[pos+neighbours[d]]) {isMin = false; break};
          if (v >= image2.data[pos+neighbours[d]]) {isMin = false; break};
          if (d !== 0 && v >= image1.data[pos+neighbours[d]]) {isMin = false; break};
        }

        if (!isMax && !isMin) continue; // extrema -> feature point

        extremaCount += 1;

        // Step 2: sub-pixel refinement (I'm not sure what that means. Any educational ref?)

        // Compute spatial derivatives
        const dx = 0.5 * (image1.data[pos + 1] - image1.data[pos - 1]);
        const dy = 0.5 * (image1.data[pos + width] - image1.data[pos - width]);
        const dxx = image1.data[pos + 1] + image1.data[pos - 1] - 2 * image1.data[pos];
        const dyy = image1.data[pos + width] + image1.data[pos - width] - 2 * image1.data[pos];
        const dxy = 0.25 * (image1.data[pos - width -1] + image1.data[pos + width + 1] - image1.data[pos - width +1] - image1.data[pos + width - 1]);

        // Compute scale derivates
        const ds = 0.5 * (image2.data[pos] - image0.data[pos]);
        const dss = image2.data[pos] + image0.data[pos] - 2 * image1.data[pos];
        const dxs = 0.25 * ((image0.data[pos-1] - image0.data[pos+1]) + (-image2.data[pos-1] + image2.data[pos+1]));
        const dys = 0.25 * ((image0.data[pos-width] - image0.data[pos+width]) + (-image2.data[pos-width] + image2.data[pos+width]));

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
        if (u[0] * u[0] + u[1] * u[1] > MAX_SUBPIXEL_DISTANCE_SQR) continue;

        // compute edge score
        const det = (dxx * dyy) - (dxy * dxy);
        if (det === 0) continue;

        const edgeScore = (dxx + dyy) * (dxx + dyy) / det;
        if (Math.abs(edgeScore) >= EDGE_HESSIAN_THRESHOLD ) continue;

        const score = v - (b[0] * u[0] + b[1] * u[1] + b[2] * u[2]);
        if (score * score < LAPLACIAN_SQR_THRESHOLD) continue;

        // original x = x*2^n + 2^(n-1) - 0.5
        // original y = y*2^n + 2^(n-1) - 0.5
        const originalX = i * Math.pow(2, octave) + Math.pow(2, octave-1) - 0.5;
        const originalY = j * Math.pow(2, octave) + Math.pow(2, octave-1) - 0.5;

        const newX = originalX + u[0] * Math.pow(2, octave);
        const newY = originalY + u[1] * Math.pow(2, octave);
        if (newX < 0 || newX >= originalWidth || newY < 0 || newY >= originalHeight) continue;

        const spScale = Math.min(Math.max(0, scale + u[2]), dogPyramid.numScalesPerOctaves);
        const newSigma = Math.pow(mK, spScale) * (1 << octave);

        let newOctaveX = newX * (1.0 / Math.pow(2, octave)) + 0.5 * (1.0 / Math.pow(2, octave)) - 0.5;
        let newOctaveY = newY * (1.0 / Math.pow(2, octave)) + 0.5 * (1.0 / Math.pow(2, octave)) - 0.5;
        newOctaveX = Math.floor(newOctaveX + 0.5);
        newOctaveY = Math.floor(newOctaveY + 0.5);

        featurePoints.push({
          octave: octave,
          scale: scale,
          octaveX: newOctaveX,
          octaveY: newOctaveY,
          x: newX,
          y: newY,
          sigma: newSigma,
          score: score,
        })
      }
    }
  }

  if (typeof window !== 'undefined' && window.DEBUG) {
    const fps = window.debugContent.featurePoints2[window.debug.keyframeIndex];
    console.log("featurepoints2", featurePoints.length, 'vs', fps.length);
    for (let i = 0; i < fps.length; i++) {
      const fp1 = featurePoints[i];
      const fp2 = fps[i];
      //if (!window.cmpObj(fp1, fp2, ['x', 'y', 'score', 'sigma', 'spScale', 'edgeScore'])) {
      if (!window.cmpObj(fp1, fp2, ['x', 'y', 'score', 'sigma'])) {
        console.log("INCORRECT featurepoint2", fp1, fp2);
      }
    }
  }

  if (typeof window !== 'undefined' && window.DEBUG_TIME) {
    console.log('exec time DETECTION first extract', new Date().getTime() - _start);
  }

  const prunedFeaturePoints = _pruneFeatures({featurePoints: featurePoints, width: originalWidth, height: originalHeight});

  if (typeof window !== 'undefined' && window.DEBUG_TIME) {
    console.log('exec time DETECTION prune', new Date().getTime() - _start);
  }

  const orientedFeaturePoints = [];
  for (let i = 0; i < prunedFeaturePoints.length; i++) {
    if (typeof window !== 'undefined' && window.DEBUG) {
      window.debug.orientationComputeIndex = i;
    }

    const fp = prunedFeaturePoints[i];
    const octaveSigma = fp.sigma * (1.0 / Math.pow(2, fp.octave));

    const pyramidImageIndex = fp.octave * gaussianPyramid.numScalesPerOctaves + fp.scale;
    const angles = _computeOrientation({x: fp.octaveX, y: fp.octaveY, sigma: octaveSigma, octave: fp.octave, scale: fp.scale, pyramid: gaussianPyramid, pyramidImageIndex});

    for (let j = 0; j < angles.length; j++) {
      orientedFeaturePoints.push(Object.assign({
        angle: angles[j]
      }, prunedFeaturePoints[i]));
    }
  }

  if (typeof window !== 'undefined' && window.DEBUG) {
    const fps = window.debugContent.featurePoints4[window.debug.keyframeIndex];
    console.log("featurepoints4", orientedFeaturePoints.length, 'vs', fps.length);
    for (let i = 0; i < fps.length; i++) {
      const fp1 = orientedFeaturePoints[i];
      const fp2 = fps[i];
      //if (!window.cmpObj(fp1, fp2, ['x', 'y', 'score', 'sigma', 'spScale', 'edgeScore', 'angle'])) {
      if (!window.cmpObj(fp1, fp2, ['x', 'y', 'score', 'sigma', 'angle'])) {
        console.log("INCORRECT featurepoint4", fp1, fp2);
        return;
      }
    }
  }

  if (typeof window !== 'undefined' && window.DEBUG_TIME) {
    console.log('exec time DETECTION compute oriented', new Date().getTime() - _start);
  }

  return orientedFeaturePoints;
}

const _computeOrientation = (options) => {
  const {x, y, sigma, octave, scale, gradient, pyramid, pyramidImageIndex} = options;
  const image = pyramid.images[pyramidImageIndex];

  const gwSigma = Math.max(1.0, ORIENTATION_GAUSSIAN_EXPANSION_FACTOR * sigma);
  const gwScale = -1.0 / (2 * gwSigma * gwSigma);

  const radius = ORIENTATION_REGION_EXPANSION_FACTOR * gwSigma;
  const radius2 = Math.ceil( radius * radius - 0.5);

  const x0 = Math.max(0, x - Math.floor(radius + 0.5));
  const x1 = Math.min(image.width-1, x + Math.floor(radius + 0.5));
  const y0 = Math.max(0, y - Math.floor(radius + 0.5));
  const y1 = Math.min(image.height-1, y + Math.floor(radius + 0.5));

  if (typeof window !== 'undefined' && window.DEBUG) {
    const o = window.debugContent.orientationCompute[window.debug.keyframeIndex][window.debug.orientationComputeIndex];
    if (Math.floor(o.x + 0.5) !== x || Math.floor(o.y + 0.5) !== y) {
      console.log("INCORRECT orientation input");
    }
    if (x0 !== o.x0 || x1 !== o.x1 || y0 !== o.y0 || y1 !== o.y1) {
      console.log("INCORRECT xy range");
    }
    if (radius2 !== o.radius2) {
      console.log("INCORRECT radius", radius, radius2, o.radius, o.radius2);
    }
    window.debug.fbinIndex = -1;
  }

  const histogram = [];
  for (let i = 0; i < ORIENTATION_NUM_BINS; i++) {
    histogram.push(0);
  }

  for (let yp = y0; yp <= y1; yp++) {
    const dy = yp - y;
    const dy2 = dy * dy;

    for (let xp = x0; xp <= x1; xp++) {
      if (typeof window !== 'undefined' && window.DEBUG) {
        window.debug.fbinIndex += 1;
      }

      const dx = xp - x;
      const dx2 = dx * dx;

      const r2 = dx2 + dy2;
      if(r2 > radius2) {
        continue; // only use the gradients within the circular window
      }

      const {mag, angle} = _computeGradient(pyramid, pyramidImageIndex, yp, xp);

      const w = _fastExp6({x: r2 * gwScale}); // Compute the gaussian weight based on distance from center of keypoint

      const fbin  = ORIENTATION_NUM_BINS * angle * ONE_OVER_2PI;

      const bin = Math.floor(fbin - 0.5);
      const w2 = fbin - bin - 0.5;
      const w1 = (1.0 - w2);
      const b1 = (bin + ORIENTATION_NUM_BINS) % ORIENTATION_NUM_BINS;
      const b2 = (bin + 1) % ORIENTATION_NUM_BINS;
      const magnitude = w * mag;

      if (typeof window !== 'undefined' && window.DEBUG) {
        const o = window.debugContent.orientationCompute[window.debug.keyframeIndex][window.debug.orientationComputeIndex];
        if (Math.abs(fbin - o.fbins[window.debug.fbinIndex]) > 0.001) {
          console.log("INCORRECT fbin", r2, radius2, fbin, 'vs', o.fbins[window.debug.fbinIndex]);
        }
        const details = o.fbinDetails[window.debug.fbinIndex];
        if (b1 !== details.b1 || b2 !== details.b2) {
          console.log("INCORRECT b1b2", b1, b2, details.b1, details.b2);
        }
        if (Math.abs(w1 - details.w1) > 0.001 || Math.abs(w2 - details.w2) > 0.001) {
          console.log("INCORRECT w1w2", w1, w2, details.w1, details.w2);
        }
        if (Math.abs(details.magnitude - magnitude) > 0.001) {
          console.log("INCORRECT mag: ", magnitude, details.magnitude);
        }
      }

      histogram[b1] += w1 * magnitude;
      histogram[b2] += w2 * magnitude;
    }
  }
  //console.log("correct histograms", JSON.stringify(histogram));

  if (typeof window !== 'undefined' && window.DEBUG) {
    const o = window.debugContent.orientationCompute[window.debug.keyframeIndex][window.debug.orientationComputeIndex];
    for (let i = 0; i < histogram.length; i++) {
      if (Math.abs(o.histograms[i] - histogram[i]) > 0.001) {
        console.log("INCORRECT histogram", i, window.debug.orientationComputeIndex, JSON.stringify(o.histograms), JSON.stringify(histogram));
        console.log(o, 'vs', {x, y, sigma, octave });
        break;
      }
    }
  }

  //console.log("ori: ", x, y, octave, scale, gwSigma, gwScale, radius, radius2, JSON.stringify(histogram));

  // The orientation histogram is smoothed with a Gaussian
  // sigma=1
  const kernel = [0.274068619061197, 0.451862761877606, 0.274068619061197];
  for(let i = 0; i < ORIENTATION_SMOOTHING_ITERATIONS; i++) {
    const old = [];
    for (let j = 0; j < histogram.length; j++) {
      old[j] = histogram[j];
    }

    for (let j = 0; j < histogram.length; j++) {
      histogram[j] = kernel[0] * old[(j - 1 + histogram.length) % histogram.length]
                    + kernel[1] * old[j]
                    + kernel[2] * old[(j+1) % histogram.length];
    }
  }

  if (typeof window !== 'undefined' && window.DEBUG) {
    const o = window.debugContent.orientationCompute[window.debug.keyframeIndex][window.debug.orientationComputeIndex];
    for (let i = 0; i < histogram.length; i++) {
      if (Math.abs(o.smoothedHistograms[i] - histogram[i]) > 0.001) {
        console.log("INCORRECT smoothed histogram", i, window.debug.orientationComputeIndex, JSON.stringify(o.smoothedHistograms), JSON.stringify(histogram));
        break;
      }
    }
  }

  // Find the peak of the histogram.
  let maxHeight = 0;
  for(let i = 0; i < ORIENTATION_NUM_BINS; i++) {
    if(histogram[i] > maxHeight) {
      maxHeight = histogram[i];
    }
  }

  if (maxHeight === 0) {
    return [];
  }

  // Find all the peaks.
  const angles = [];
  for(let i = 0; i < ORIENTATION_NUM_BINS; i++) {
    const prev = (i - 1 + histogram.length) % histogram.length;
    const next = (i + 1) % histogram.length;

    // add 0.0001 in comparison to avoid too sensitive to rounding precision
    if (histogram[i] > ORIENTATION_PEAK_THRESHOLD * maxHeight && (histogram[i] > histogram[prev] + 0.0001) && (histogram[i] > histogram[next] + 0.0001)) {
      // The default sub-pixel bin location is the discrete location if the quadratic fitting fails.
      let fbin = i;

      const ret = _quadratic3Points({
        p1: [i-1, histogram[prev]],
        p2: [i, histogram[i]],
        p3: [i+1, histogram[next]]
      });

      if (ret !== null) {
        const {A, B, C} = ret;

        // Find the critical point of a quadratic. y = A*x^2 + B*x + C
        if (A != 0) {
          fbin = -B / (2 * A);
        }
      }

      if (typeof window !== 'undefined' && window.DEBUG) {
        const o = window.debugContent.orientationCompute[window.debug.keyframeIndex][window.debug.orientationComputeIndex];
        if (!window.cmp(fbin, o.histfbins[i])) {
          console.log("INCORRECT orientation fbin", i, fbin, 'vs', o.histfbins[i], o.histAs[i], o.histBs[i], o.histCs[i]);
          console.log("hist", histogram[i], histogram[prev], histogram[next], ORIENTATION_PEAK_THRESHOLD * maxHeight);
        }
      }

      let an =  2.0 * Math.PI * ((fbin + 0.5 + ORIENTATION_NUM_BINS) / ORIENTATION_NUM_BINS);
      while (an > 2.0 * Math.PI) { // modula
        an -= 2.0 * Math.PI;
      }
      angles.push(an);
    }
  }
  return angles;
}



/**
 * Fit a quatratic to 3 points. The system of equations is:
 *
 * y0 = A*x0^2 + B*x0 + C
 * y1 = A*x1^2 + B*x1 + C
 * y2 = A*x2^2 + B*x2 + C
 *
 * This system of equations is solved for A,B,C.
 */
const _quadratic3Points = (options) => {
  const {p1, p2, p3} = options;
  const d1 = (p3[0]-p2[0])*(p3[0]-p1[0]);
  const d2 = (p1[0]-p2[0])*(p3[0]-p1[0]);
  const d3 = p1[0]-p2[0];

  // If any of the denominators are zero then return FALSE.
  if (d1 == 0 || d2 == 0 || d3 == 0) {
    return null;
  }

  const a = p1[0]*p1[0];
  const b = p2[0]*p2[0];

  // Solve for the coefficients A,B,C
  const A = ((p3[1]-p2[1])/d1)-((p1[1]-p2[1])/d2);
  const B = ((p1[1]-p2[1])+(A*(b-a)))/d3;
  const C = p1[1]-(A*a)-(B*p1[0]);

  return {A, B, C};
}

/**
 * 0.01% error at 1.030
 * 0.10% error at 1.520
 * 1.00% error at 2.330
 * 5.00% error at 3.285
 */
const _fastExp6 = (options) => {
  const {x} = options;
  return (720+x*(720+x*(360+x*(120+x*(30+x*(6+x))))))*0.0013888888;
}

const _computeGradient = (pyramid, pyramidImageIndex, j, i) => {
  // cache computation?
  const image = pyramid.images[pyramidImageIndex];
  const prevJ = j > 0? j - 1: j;
  const nextJ = j < image.height - 1? j + 1: j;
  const prevI = i > 0? i - 1: i;
  const nextI = i < image.width - 1? i + 1: i;
  const dx = image.data[j * image.width + nextI] - image.data[j * image.width + prevI];
  const dy = image.data[nextJ * image.width + i] - image.data[prevJ * image.width + i];
  const angle = Math.atan2(dy, dx) + Math.PI;
  const mag = Math.sqrt(dx * dx + dy * dy);
  return {angle, mag};
}

// divide the image into PRUNE_FEATURES_NUM_BUCKETS * PRUNE_FEATURES_NUM_BUCKETS area
// in each area, sort feature points by score, and return the top N
const _pruneFeatures = (options) => {
  const {featurePoints, width, height} = options;

  // Note: seems not to be a consistent implementation. Might need to remove this line
  //   The feature points are prune per bucket, e.g. if 501 points in bucket 1, turns out only 5 valid
  //   Similarly, if 500 points all in bucket 1, they all passed because globally <= maxNumFeaturePoints
  if (featurePoints.length <= MAX_FEATURE_POINTS) return featurePoints;

  const resultFeaturePoints = [];

  const nBuckets = PRUNE_FEATURES_NUM_BUCKETS * PRUNE_FEATURES_NUM_BUCKETS;
  const nPointsPerBuckets = MAX_FEATURE_POINTS / nBuckets;

  const buckets = [];
  for (let i = 0; i < nBuckets; i++) {
    buckets.push([]);
  }

  const dx = Math.ceil(1.0 * width / PRUNE_FEATURES_NUM_BUCKETS);
  const dy = Math.ceil(1.0 * height / PRUNE_FEATURES_NUM_BUCKETS);

  for (let i = 0; i < featurePoints.length; i++) {
    const bucketX = Math.floor(featurePoints[i].x / dx);
    const bucketY = Math.floor(featurePoints[i].y / dy);

    const bucketIndex = bucketY * PRUNE_FEATURES_NUM_BUCKETS + bucketX;
    buckets[bucketIndex].push(featurePoints[i]);
  }

  for (let i = 0; i < PRUNE_FEATURES_NUM_BUCKETS; i++) {
    for (let j = 0; j < PRUNE_FEATURES_NUM_BUCKETS; j++) {
      const bucketIndex = j * PRUNE_FEATURES_NUM_BUCKETS + i;
      const bucket = buckets[bucketIndex];
      const nSelected = Math.min(bucket.length, nPointsPerBuckets);

      if (bucket.length > nSelected) {
        bucket.sort((f1, f2) => {
          return Math.abs(f1.score) > Math.abs(f2.score)? -1: 1;
        });
      }
      for (let k = 0; k < nSelected; k++) {
        resultFeaturePoints.push(bucket[k]);
      }
    }
  }
  return resultFeaturePoints;
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
  //B[3] = A[5] * A[6] - A[3] * A[8];
  B[3] = B[1];
  B[4] = A[0] * A[8] - A[2] * A[6];
  B[5] = A[2] * A[3] - A[0] * A[5];
  //B[6] = A[3] * A[7] - A[4] * A[6];
  //B[7] = A[1] * A[6] - A[0] * A[7];
  B[6] = B[2];
  B[7] = B[5];
  B[8] = A[0] * A[4] - A[1] * A[3];

  const x = [];
  x[0] = B[0] * b[0] + B[1] * b[1] + B[2] * b[2];
  x[1] = B[3] * b[0] + B[4] * b[1] + B[5] * b[2];
  x[2] = B[6] * b[0] + B[7] * b[1] + B[8] * b[2];

  x[0] = x[0] / det;
  x[1] = x[1] / det;
  x[2] = x[2] / det;

  return x;
}

module.exports = {
  Detector
}


/***/ }),

/***/ "./src/image-target/detectorCPU/dog-pyramid.js":
/*!*****************************************************!*\
  !*** ./src/image-target/detectorCPU/dog-pyramid.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// compute Difference-of-Gaussian pyramids from gaussian pyramids
//
// pyramid = {
//   numOctaves,
//   numScalesPerOctaves,
//   images: [{data, width, height}, {}, {}] // image at octave i and scale j = images[i * numScalesPerOctaves + j]
// }

const build = ({gaussianPyramid}) => {
  const numOctaves = gaussianPyramid.numOctaves;
  const numScalesPerOctaves = gaussianPyramid.numScalesPerOctaves - 1;

  const pyramidImages = [];
  for (let i = 0; i < numOctaves; i++) {
    for (let j = 0; j < numScalesPerOctaves; j++) {
      const image1 = gaussianPyramid.images[i * gaussianPyramid.numScalesPerOctaves + j];
      const image2 = gaussianPyramid.images[i * gaussianPyramid.numScalesPerOctaves + j + 1];
      pyramidImages.push(  _differenceImageBinomial({image1, image2}));
    }
  }
  return {
    numOctaves,
    numScalesPerOctaves,
    images: pyramidImages
  }
}

const _differenceImageBinomial = ({image1, image2}) => {
  if (image1.data.length !== image2.data.length) {
    throw "image length doesn't match";
  }

  const data = new Float32Array(image1.data.length);
  for (let i = 0; i < image1.data.length; i++) {
    data[i] = image1.data[i] - image2.data[i];
  }
  return {data: data, width: image1.width, height: image1.height};
}

module.exports = {
  build
};


/***/ }),

/***/ "./src/image-target/detectorCPU/freak-extractor.js":
/*!*********************************************************!*\
  !*** ./src/image-target/detectorCPU/freak-extractor.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

const EXPANSION_FACTOR = 7;

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
]

// pyramid: gaussian pyramid
const extract = (options) => {
  const {pyramid, points} = options;

  const mK = Math.pow(2, 1.0 / (pyramid.numScalesPerOctaves-1));
  const oneOverLogK = 1.0 / Math.log(mK);

  const descriptors = [];
  for (let p = 0; p < points.length; p++) {

    if (typeof window !== 'undefined' && window.DEBUG) {
      if (window.debugFreakSampleIndex === undefined) window.debugFreakSampleIndex = -1;
      window.debugFreakSampleIndex += 1;
    }

    const point = points[p];

    // Ensure the scale of the similarity transform is at least "1".
    const transformScale = Math.max(1, point.sigma * EXPANSION_FACTOR);

    // Transformation from canonical test locations to image
    const S = _similarityMatrix({scale: transformScale, angle: point.angle, x: point.x, y: point.y});

    //console.log("S: ", point.scale, point.angle, S);

    const samples = [];
    for (let r = 0; r < FREAK_RINGS.length; r++) {
      const sigma = transformScale * FREAK_RINGS[r].sigma;

      let octave = Math.floor(Math.log2(sigma));
      const fscale = Math.log(sigma / Math.pow(2, octave)) * oneOverLogK;
      let scale = Math.round(fscale);

      // sgima of last scale =  sigma of the first scale in next octave
      // prefer coarser octaves for efficiency
      if (scale === pyramid.numScalesPerOctaves - 1) {
        octave = octave + 1;
        scale = 0;
      }
      // clip octave and scale
      if (octave < 0) {
        octave = 0;
        scale = 0;
      }
      if (octave >= pyramid.numOctaves) {
        octave = pyramid.numOctaves - 1;
        scale = pyramid.numScalesPerOctaves - 1;
      }

      // for downsample point
      const image = pyramid.images[octave * pyramid.numScalesPerOctaves + scale];
      const a = 1.0 / (Math.pow(2, octave));
      const b = 0.5 * a - 0.5;

      for (let i = 0; i < FREAK_RINGS[r].points.length; i++) {
        const point = FREAK_RINGS[r].points[i];
        const x = S[0] * point[0] + S[1] * point[1] + S[2];
        const y = S[3] * point[0] + S[4] * point[1] + S[5];

        let xp = x * a + b; // x in octave
        let yp = y * a + b; // y in octave
        // bilinear interpolation
        xp = Math.max(0, Math.min(xp, image.width - 2));
        yp = Math.max(0, Math.min(yp, image.height - 2));

        const x0 = Math.floor(xp);
        const x1 = x0 + 1;
        const y0 = Math.floor(yp);
        const y1 = y0 + 1;

        const value = (x1-xp) * (y1-yp) * image.data[y0 * image.width + x0]
                    + (xp-x0) * (y1-yp) * image.data[y0 * image.width + x1]
                    + (x1-xp) * (yp-y0) * image.data[y1 * image.width + x0]
                    + (xp-x0) * (yp-y0) * image.data[y1 * image.width + x1];

        samples.push(value);

        if (typeof window !== 'undefined' && window.DEBUG) {
          if (window.debug.keyframeIndex === 2 && p === 424) {
            const sampleIndex = samples.length-1;
            const dSamples = window.debugContent.freakSamples[window.debugFreakSampleIndex];
            //console.log("freak sample", window.debug.keyframeIndex, sampleIndex, dSamples[sampleIndex], {xp, yp, value});
          }
        }
      }
    }


    const desc = [];
    for (let i = 0; i < samples.length; i++) {
      for (let j = i+1; j < samples.length; j++) {
        // avoid too senstive to rounding precision
        //desc.push(samples[i] < samples[j]);
        desc.push(samples[i] < samples[j] + 0.0001);

        if (typeof window !== 'undefined' && window.DEBUG) {
          //if (window.debug.keyframeIndex === 2 && p === 424) {
            if (i === 0 && j === 1) window.debugCompareFreakIndex = 0;
            const dCompare = window.debugContent.compareFreak[window.debugFreakSampleIndex];
            const dSamples = window.debugContent.freakSamples[window.debugFreakSampleIndex];
            if (!!desc[desc.length-1] !== !! dCompare[window.debugCompareFreakIndex]) {
              console.log("INCORRECT freak compare", i, j, desc[desc.length-1], 'vs', dCompare[window.debugCompareFreakIndex]);
              console.log(samples[i], samples[j], dSamples[i], dSamples[j]);
            }
            window.debugCompareFreakIndex += 1;
          //}
        }
      }
    }

    // encode descriptors in binary format
    // 37 samples = 1+2+3+...+36 = 666 comparisons = 666 bits
    // ceil(666/32) = 84 numbers (32bit number)
    const descBit = [];
    let temp = 0;
    let count = 0;
    for (let i = 0; i < desc.length; i++) {
      if (desc[i]) temp += 1;
      count += 1;
      if (count === 32) {
        descBit.push(temp);
        temp = 0;
        count = 0;
      } else {
        // probably can just do temp = temp * 2
        temp = (temp << 1) >>> 0; // >>> 0 to make it unsigned
      }
    }
    descBit.push(temp);

    descriptors.push(descBit);
  }
  return descriptors;
}

const _similarityMatrix = (options) => {
  const {scale, angle, x, y} = options;
  const c = scale * Math.cos(angle);
  const s = scale * Math.sin(angle);

  const S = [
    c, -s, x,
    s, c, y,
    0, 0, 1
  ]
  return S;
}

module.exports = {
  extract
}


/***/ }),

/***/ "./src/image-target/detectorCPU/gaussian-pyramid.js":
/*!**********************************************************!*\
  !*** ./src/image-target/detectorCPU/gaussian-pyramid.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const {downsampleBilinear} = __webpack_require__(/*! ../utils/images.js */ "./src/image-target/utils/images.js");

// Build a gussian pyramid, with the following structure:
//
// pyramid = {
//   numOctaves,
//   numScalesPerOctaves,
//   images: [{data, width, height}, {}, {}] // image at octave i and scale j = images[i * numScalesPerOctaves + j]
// }

const build = ({image, numScalesPerOctaves, minSize}) => {
  const {data, width, height} = image;

  const numOctaves = _numOctaves({width, height, minSize: minSize});

  if (typeof window !== 'undefined' && window.DEBUG_TIME) {
    var _start = new Date().getTime();
  }

  const pyramidImages = [];
  for (let i = 0; i < numOctaves; i++) {
    if (i === 0) {
      pyramidImages.push(_applyFilter(image));
    } else {
      // first image of each octave, downsample from previous
      pyramidImages.push(downsampleBilinear({image: pyramidImages[pyramidImages.length-1]}));
    }

    if (typeof window !== 'undefined' && window.DEBUG_TIME) {
      console.log('exec time Gaussian', i, 0, new Date().getTime() - _start);
    }

    // remaining images of octave, 4th order binomail from previous
    for (let j = 0; j < numScalesPerOctaves - 1; j++) {
      if (j === 0) {
        pyramidImages.push(_applyFilter(pyramidImages[pyramidImages.length-1]));
      } else {
        // in artoolkit, it apply filter twice....  is it a bug?
        //pyramidImages.push(_applyFilter(_applyFilter(pyramidImages[pyramidImages.length-1])));
        pyramidImages.push(_applyFilter(pyramidImages[pyramidImages.length-1]));
      }

      if (typeof window !== 'undefined' && window.DEBUG_TIME) {
        console.log('exec time Gaussian', i, j, new Date().getTime() - _start);
      }
    }
  }

  const pyramid = {
    numOctaves: numOctaves,
    numScalesPerOctaves: numScalesPerOctaves,
    images: pyramidImages
  }
  return pyramid;
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
const _applyFilter = (image) => {
  const {data, width, height} = image;

  //if (width < 5) {console.log("image too small"); return;}
  //if (height < 5) {console.log("image too small"); return;}

  const temp = new Float32Array(data.length);

  // apply horizontal filter. border is computed by extending border pixel
  for (let j = 0; j < height; j++) {
    const joffset = j * width;
    for (let i = 0; i < width; i++) {
      const pos = joffset+ i;

      temp[pos] = data[joffset + Math.max(i-2,0)] +
                  data[joffset + Math.max(i-1,0)] * 4 +
                  data[joffset + i] * 6 +
                  data[joffset + Math.min(i+1,width-1)] * 4 +
                  data[joffset + Math.min(i+2,width-1)];
    }
  }


  const dst = new Float32Array(data.length);
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
  return {data: dst, width: width, height: height};
};

module.exports = {
  build
};


/***/ }),

/***/ "./src/image-target/image-list.js":
/*!****************************************!*\
  !*** ./src/image-target/image-list.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const {resize} = __webpack_require__(/*! ./utils/images.js */ "./src/image-target/utils/images.js");

//const DEFAULT_DPI = 72;
const DEFAULT_DPI = 1;
const MIN_IMAGE_PIXEL_SIZE = 28;

// return list of {data, width, height, dpi}
const buildImageList = (inputImage) => {
  const dpi = DEFAULT_DPI;
  const minDpi = Math.floor(1.0 * MIN_IMAGE_PIXEL_SIZE / Math.min(inputImage.width, inputImage.height) * dpi * 1000) / 1000;
  const dpiList = [];

  let c = minDpi;
  while (true) {
    dpiList.push(c);
    c *= Math.pow(2.0, 1.0/3.0);
    c = Math.fround(c); // can remove this line in production. trying to reproduce the same result as artoolkit, which use float.
    if (c >= dpi * 0.95) {
      c = dpi;
      break;
    }
  }
  dpiList.push(c);
  dpiList.reverse();

  const imageList = []; // list of {data: [width x height], width, height}
  for (let i = 0; i < dpiList.length; i++) {
    const w = inputImage.width * dpiList[i] / dpi;
    const h = inputImage.height * dpiList[i] / dpi;
    imageList.push(Object.assign(resize({image: inputImage, ratio: dpiList[i]/dpi}), {dpi: dpiList[i]}));
  }

  //return [imageList[0]];

  return imageList;
}

module.exports = {
  buildImageList
}


/***/ }),

/***/ "./src/image-target/matching/hamming-distance.js":
/*!*******************************************************!*\
  !*** ./src/image-target/matching/hamming-distance.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Fast computation on number of bit sets
// Ref: https://graphics.stanford.edu/~seander/bithacks.html#CountBitsSetParallel
const compute = (options) => {
  const {v1, v2} = options;
  let d = 0;
  for (let i = 0; i < v1.length; i++) {
    let x = (v1[i] ^ v2[i]) >>> 0;
    d += bitCount(x);
  }
  return d;
}

const bitCount = (v) => {
  var c = v - ((v >> 1) & 0x55555555);
  c = ((c >> 2) & 0x33333333) + (c & 0x33333333);
  c = ((c >> 4) + c) & 0x0F0F0F0F;
  c = ((c >> 8) + c) & 0x00FF00FF;
  c = ((c >> 16) + c) & 0x0000FFFF;
  return c;
}

module.exports = {
  compute
};


/***/ }),

/***/ "./src/image-target/matching/hierarchical-clustering.js":
/*!**************************************************************!*\
  !*** ./src/image-target/matching/hierarchical-clustering.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const {compute: hammingCompute} = __webpack_require__(/*! ./hamming-distance.js */ "./src/image-target/matching/hamming-distance.js");
const {createRandomizer} = __webpack_require__(/*! ../utils/randomizer.js */ "./src/image-target/utils/randomizer.js");

const MIN_FEATURE_PER_NODE = 16;
const NUM_ASSIGNMENT_HYPOTHESES =  128;
const NUM_CENTERS = 8;

// kmedoids clustering of points, with hamming distance of FREAK descriptor
//
// node = {
//   isLeaf: bool,
//   children: [], list of children node
//   pointIndexes: [], list of int, point indexes
//   centerPointIndex: int
// }
const build = ({points}) => {
  const pointIndexes = [];
  for (let i = 0; i < points.length; i++) {
    pointIndexes.push(i);
  }

  const randomizer = createRandomizer();

  const rootNode = _build({points: points, pointIndexes: pointIndexes, centerPointIndex: null, randomizer});
  return {rootNode};
}

// recursive build hierarchy clusters
const _build = (options) => {
  const {points, pointIndexes, centerPointIndex, randomizer} = options;

  let isLeaf = false;

  if (pointIndexes.length <= NUM_CENTERS || pointIndexes.length <= MIN_FEATURE_PER_NODE) {
    isLeaf = true;
  }

  const clusters = {};
  if (!isLeaf) {
    // compute clusters
    const assignment = _computeKMedoids({points, pointIndexes, randomizer});

    for (let i = 0; i < assignment.length; i++) {
      if (clusters[pointIndexes[assignment[i]]] === undefined) {
        clusters[pointIndexes[assignment[i]]] = [];
      }
      clusters[pointIndexes[assignment[i]]].push(pointIndexes[i]);
    }
  }
  if (Object.keys(clusters).length === 1) {
    isLeaf = true;
  }

  const node = {
    centerPointIndex: centerPointIndex
  }

  if (isLeaf) {
    node.leaf = true;
    node.pointIndexes = [];
    for (let i = 0; i < pointIndexes.length; i++) {
      node.pointIndexes.push(pointIndexes[i]);
    }
    return node;
  }

  // recursive build children
  node.leaf = false;
  node.children = [];

  Object.keys(clusters).forEach((centerIndex) => {
    node.children.push(_build({points: points, pointIndexes: clusters[centerIndex], centerPointIndex: centerIndex, randomizer}));
  });
  return node;
}

_computeKMedoids = (options) => {
  const {points, pointIndexes, randomizer} = options;

  const randomPointIndexes = [];
  for (let i = 0; i < pointIndexes.length; i++) {
    randomPointIndexes.push(i);
  }

  let bestSumD = Number.MAX_SAFE_INTEGER;
  let bestAssignmentIndex = -1;

  const assignments = [];
  for (let i = 0; i < NUM_ASSIGNMENT_HYPOTHESES; i++) {
    randomizer.arrayShuffle({arr: randomPointIndexes, sampleSize: NUM_CENTERS});

    let sumD = 0;
    const assignment = [];
    for (let j = 0; j < pointIndexes.length; j++) {
      let bestD = Number.MAX_SAFE_INTEGER;
      for (let k = 0; k < NUM_CENTERS; k++) {
        const centerIndex = pointIndexes[randomPointIndexes[k]];
        const d = hammingCompute({v1: points[pointIndexes[j]].descriptors, v2: points[centerIndex].descriptors});
        if (d < bestD) {
          assignment[j] = randomPointIndexes[k];
          bestD = d;
        }
      }
      sumD += bestD;
    }
    assignments.push(assignment);

    if (sumD < bestSumD) {
      bestSumD = sumD;
      bestAssignmentIndex = i;
    }
  }
  return assignments[bestAssignmentIndex];
}

module.exports = {
  build,
};



/***/ }),

/***/ "./src/image-target/tracking/extractor.js":
/*!************************************************!*\
  !*** ./src/image-target/tracking/extractor.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const {Cumsum} = __webpack_require__(/*! ../utils/cumsum */ "./src/image-target/utils/cumsum.js");

const SEARCH_SIZE1 = 10;
const SEARCH_SIZE2 = 2;

//const TEMPLATE_SIZE = 22 // 22 is default from artoolkit
const TEMPLATE_SIZE = 6;
const TEMPLATE_SD_THRESH = 5.0;
const MAX_SIM_THRESH = 0.95;

const MAX_THRESH = 0.9;
const MIN_THRESH = 0.55;
const SD_THRESH = 8.0;
const OCCUPANCY_SIZE = 24 * 2 / 3;

/*
 * Input image is in grey format. the imageData array size is width * height. value range from 0-255
 * pixel value at row r and c = imageData[r * width + c]
 *
 * @param {Uint8Array} options.imageData
 * @param {int} options.width image width
 * @param {int} options.height image height
 */
const extract = (image) => {
  const {data: imageData, width, height, dpi} = image;

  // Step 1 - filter out interesting points. Interesting points have strong pixel value changed across neighbours
  const isPixelSelected = [width * height];
  for (let i = 0; i < isPixelSelected.length; i++) isPixelSelected[i] = false;

  // Step 1.1 consider a pixel at position (x, y). compute:
  //   dx = ((data[x+1, y-1] - data[x-1, y-1]) + (data[x+1, y] - data[x-1, y]) + (data[x+1, y+1] - data[x-1, y-1])) / 256 / 3
  //   dy = ((data[x+1, y+1] - data[x+1, y-1]) + (data[x, y+1] - data[x, y-1]) + (data[x-1, y+1] - data[x-1, y-1])) / 256 / 3
  //   dValue =  sqrt(dx^2 + dy^2) / 2;
  const dValue = new Float32Array(imageData.length);
  for (let i = 0; i < width; i++) {
    dValue[i] = -1;
    dValue[width * (height-1) + i] = -1;
  }
  for (let j = 0; j < height; j++) {
    dValue[j*width] = -1;
    dValue[j*width + width-1] = -1;
  }

  for (let i = 1; i < width-1; i++) {
    for (let j = 1; j < height-1; j++) {
      let pos = i + width * j;

      let dx = 0.0;
      let dy = 0.0;
      for (let k = -1; k <= 1; k++) {
        dx += (imageData[pos + width*k + 1] - imageData[pos + width*k -1]);
        dy += (imageData[pos + width + k] - imageData[pos - width + k]);
      }
      dx /= (3 * 256);
      dy /= (3 * 256);
      dValue[pos] = Math.sqrt( (dx * dx + dy * dy) / 2);
    }
  }

  // Step 1.2 - select all pixel which is dValue largest than all its neighbour as "potential" candidate
  //  the number of selected points is still too many, so we use the value to further filter (e.g. largest the dValue, the better)
  const dValueHist = new Uint32Array(1000); // histogram of dvalue scaled to [0, 1000)
  for (let i = 0; i < 1000; i++) dValueHist[i] = 0;
  const neighbourOffsets = [-1, 1, -width, width];
  let allCount = 0;
  for (let i = 1; i < width-1; i++) {
    for (let j = 1; j < height-1; j++) {
      let pos = i + width * j;
      let isMax = true;
      for (let d = 0; d < neighbourOffsets.length; d++) {
        if (dValue[pos] <= dValue[pos + neighbourOffsets[d]]) {
          isMax = false;
          break;
        }
      }
      if (isMax) {
        let k = Math.floor(dValue[pos] * 1000);
        if (k > 999) k = 999; // k>999 should not happen if computaiton is correction
        if (k < 0) k = 0; // k<0 should not happen if computaiton is correction
        dValueHist[k] += 1;
        allCount += 1;
        isPixelSelected[pos] = true;
      }
    }
  }

  // reduce number of points according to dValue.
  // actually, the whole Step 1. might be better to just sort the dvalues and pick the top (0.02 * width * height) points
  const maxPoints = 0.02 * width * height;
  let k = 999;
  let filteredCount = 0;
  while (k >= 0) {
    filteredCount += dValueHist[k];
    if (filteredCount > maxPoints) break;
    k--;
  }

  //console.log("image size: ", width * height);
  //console.log("extracted featues: ", allCount);
  //console.log("filtered featues: ", filteredCount);

  for (let i = 0; i < isPixelSelected.length; i++) {
    if (isPixelSelected[i]) {
      if (dValue[i] * 1000 < k) isPixelSelected[i] = false;
    }
  }

  //console.log("selected count: ", isPixelSelected.reduce((a, b) => {return a + (b?1:0);}, 0));

  // Step 2
  // prebuild cumulative sum matrix for fast computation
  const imageDataSqr = [];
  for (let i = 0; i < imageData.length; i++) {
    imageDataSqr[i] = imageData[i] * imageData[i];
  }
  const imageDataCumsum = new Cumsum(imageData, width, height);
  const imageDataSqrCumsum = new Cumsum(imageDataSqr, width, height);

  // holds the max similariliy value computed within SEARCH area of each pixel
  //   idea: if there is high simliarity with another pixel in nearby area, then it's not a good feature point
  //         next step is to find pixel with low similarity
  const featureMap = new Float32Array(imageData.length);

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const pos = j * width + i;
      if (!isPixelSelected[pos]) {
        featureMap[pos] = 1.0;
        continue;
      }

      const vlen = _templateVar({image, cx: i, cy: j, sdThresh: TEMPLATE_SD_THRESH, imageDataCumsum, imageDataSqrCumsum});
      if (vlen === null) {
        featureMap[pos] = 1.0;
        continue;
      }

      let max = -1.0;
      for (let jj = -SEARCH_SIZE1; jj <= SEARCH_SIZE1; jj++) {
        for (let ii = -SEARCH_SIZE1; ii <= SEARCH_SIZE1; ii++) {
          if (ii * ii + jj * jj <= SEARCH_SIZE2 * SEARCH_SIZE2) continue;
          const sim = _getSimilarity({image, cx: i+ii, cy: j+jj, vlen: vlen, tx: i, ty: j, imageDataCumsum, imageDataSqrCumsum});

          if (sim === null) continue;

          if (sim > max) {
            max = sim;
            if (max > MAX_SIM_THRESH) break;
          }
        }
        if (max > MAX_SIM_THRESH) break;
      }
      featureMap[pos] = max;
    }
  }

  // Step 2.2 select feature
  const coords = _selectFeature({image, featureMap, templateSize: TEMPLATE_SIZE, searchSize: SEARCH_SIZE2, occSize: OCCUPANCY_SIZE, maxSimThresh: MAX_THRESH, minSimThresh: MIN_THRESH, sdThresh: SD_THRESH, imageDataCumsum, imageDataSqrCumsum});

  return coords;
}

const _selectFeature = (options) => {
  let {image, featureMap, templateSize, searchSize, occSize, maxSimThresh, minSimThresh, sdThresh, imageDataCumsum, imageDataSqrCumsum} = options;
  const {data: imageData, width, height, dpi} = image;

  //console.log("params: ", templateSize, templateSize, occSize, maxSimThresh, minSimThresh, sdThresh);

  //occSize *= 2;
  occSize = Math.floor(Math.min(image.width, image.height) / 10);

  const divSize = (templateSize * 2 + 1) * 3;
  const xDiv = Math.floor(width / divSize);
  const yDiv = Math.floor(height / divSize);

  let maxFeatureNum = Math.floor(width / occSize) * Math.floor(height / occSize) + xDiv * yDiv;
  //console.log("max feature num: ", maxFeatureNum);

  const coords = [];
  const image2 = new Float32Array(imageData.length);
  for (let i = 0; i < image2.length; i++) {
    image2[i] = featureMap[i];
  }

  let num = 0;
  while (num < maxFeatureNum) {
    let minSim = maxSimThresh;
    let cx = -1;
    let cy = -1;
    for (let j = 0; j < height; j++) {
      for (let i = 0; i < width; i++) {
        if (image2[j*width+i] < minSim) {
          minSim = image2[j*width+i];
          cx = i;
          cy = j;
        }
      }
    }
    if (cx === -1) break;

    const vlen = _templateVar({image, cx: cx, cy: cy, sdThresh: 0, imageDataCumsum, imageDataSqrCumsum});
    if (vlen === null) {
      image2[ cy * width + cx ] = 1.0;
      continue;
    }
    if (vlen / (templateSize * 2 + 1) < sdThresh) {
      image2[ cy * width + cx ] = 1.0;
      continue;
    }

    let min = 1.0;
    let max = -1.0;

    for (let j = -searchSize; j <= searchSize; j++) {
      for (let i = -searchSize; i <= searchSize; i++) {
        if (i*i + j*j > searchSize * searchSize) continue;
        if (i === 0 && j === 0) continue;

        const sim = _getSimilarity({image, vlen, cx: cx+i, cy: cy+j, tx: cx, ty:cy, imageDataCumsum, imageDataSqrCumsum});
        if (sim === null) continue;

        if (sim < min) {
          min = sim;
          if (min < minSimThresh && min < minSim) break;
        }
        if (sim > max) {
          max = sim;
          if (max > 0.99) break;
        }
      }
      if( (min < minSimThresh && min < minSim) || max > 0.99 ) break;
    }

    if( (min < minSimThresh && min < minSim) || max > 0.99 ) {
        image2[ cy * width + cx ] = 1.0;
        continue;
    }

    coords.push({
      //x: cx,
      //y: cy,
      //mx: 1.0 * cx / dpi * 25.4,
      //my: 1.0 * (height - cy) / dpi * 25.4,
      mx: 1.0 * cx / dpi,
      my: 1.0 * (height - cy) / dpi,
      //maxSim: minSim,
    })

    num += 1;
    //console.log(num, '(', cx, ',', cy, ')', minSim, 'min = ', min, 'max = ', max, 'sd = ', vlen/(templateSize*2+1));

    // no other feature points within occSize square
    for (let j = -occSize; j <= occSize; j++) {
      for (let i = -occSize; i <= occSize; i++) {
        if (cy + j < 0 || cy + j >= height || cx + i < 0 || cx + i >= width) continue;
        image2[ (cy+j)*width + (cx+i) ] = 1.0;
      }
    }
  }
  return coords;
}

// compute variances of the pixels, centered at (cx, cy)
const _templateVar = ({image, cx, cy, sdThresh, imageDataCumsum, imageDataSqrCumsum}) => {
  if (cx - TEMPLATE_SIZE < 0 || cx + TEMPLATE_SIZE >= image.width) return null;
  if (cy - TEMPLATE_SIZE < 0 || cy + TEMPLATE_SIZE >= image.height) return null;

  const templateWidth = 2 * TEMPLATE_SIZE + 1;
  const nPixels = templateWidth * templateWidth;

  let average = imageDataCumsum.query(cx - TEMPLATE_SIZE, cy - TEMPLATE_SIZE, cx + TEMPLATE_SIZE, cy+TEMPLATE_SIZE);
  average /= nPixels;

  //v = sum((pixel_i - avg)^2) for all pixel i within the template
  //  = sum(pixel_i^2) - sum(2 * avg * pixel_i) + sum(avg^avg)

  let vlen = imageDataSqrCumsum.query(cx - TEMPLATE_SIZE, cy - TEMPLATE_SIZE, cx + TEMPLATE_SIZE, cy+TEMPLATE_SIZE);
  vlen -= 2 * average * imageDataCumsum.query(cx - TEMPLATE_SIZE, cy - TEMPLATE_SIZE, cx + TEMPLATE_SIZE, cy+TEMPLATE_SIZE);
  vlen += nPixels * average * average;

  if (vlen / nPixels < sdThresh * sdThresh) return null;
  vlen = Math.sqrt(vlen);
  return vlen;
}

const _getSimilarity = (options) => {
  const {image, cx, cy, vlen, tx, ty, imageDataCumsum, imageDataSqrCumsum} = options;
  const {data: imageData, width, height} = image;
  const templateSize = TEMPLATE_SIZE;

  if (cx - templateSize < 0 || cx + templateSize >= width) return null;
  if (cy - templateSize < 0 || cy + templateSize >= height) return null;

  const templateWidth = 2 * templateSize + 1;

  let sx = imageDataCumsum.query(cx-templateSize, cy-templateSize, cx+templateSize, cy+templateSize);
  let sxx = imageDataSqrCumsum.query(cx-templateSize, cy-templateSize, cx+templateSize, cy+templateSize);
  let sxy = 0;

  // !! This loop is the performance bottleneck. Use moving pointers to optimize
  //
  //   for (let i = cx - templateSize, i2 = tx - templateSize; i <= cx + templateSize; i++, i2++) {
  //     for (let j = cy - templateSize, j2 = ty - templateSize; j <= cy + templateSize; j++, j2++) {
  //       sxy += imageData[j*width + i] * imageData[j2*width + i2];
  //     }
  //   }
  //
  let p1 = (cy-templateSize) * width + (cx-templateSize);
  let p2 = (ty-templateSize) * width + (tx-templateSize);
  let nextRowOffset = width - templateWidth;
  for (let j = 0; j < templateWidth; j++) {
    for (let i = 0; i < templateWidth; i++) {
      sxy += imageData[p1] * imageData[p2];
      p1 +=1;
      p2 +=1;
    }
    p1 += nextRowOffset;
    p2 += nextRowOffset;
  }

  let templateAverage = imageDataCumsum.query(tx-templateSize, ty-templateSize, tx+templateSize, ty+templateSize);
  templateAverage /= templateWidth * templateWidth;
  sxy -= templateAverage * sx;

  let vlen2 = sxx - sx*sx / (templateWidth * templateWidth);
  if (vlen2 == 0) return null;
  vlen2 = Math.sqrt(vlen2);

  // covariance between template and current pixel
  const sim = 1.0 * sxy / (vlen * vlen2);
  return sim;
}

module.exports = {
  extract
};


/***/ }),

/***/ "./src/image-target/utils/cumsum.js":
/*!******************************************!*\
  !*** ./src/image-target/utils/cumsum.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// fast 2D submatrix sum using cumulative sum algorithm
class Cumsum {
  constructor(data, width, height) {
    this.cumsum = [];
    for (let j = 0; j < height; j++) {
      this.cumsum.push([]);
      for (let i = 0; i < width; i++) {
        this.cumsum[j].push(0);
      }
    }

    this.cumsum[0][0] = data[0];
    for (let i = 1; i < width; i++) {
      this.cumsum[0][i] = this.cumsum[0][i-1] + data[i];
    }
    for (let j = 1; j < height; j++) {
      this.cumsum[j][0] = this.cumsum[j-1][0] + data[j*width];
    }

    for (let j = 1; j < height; j++) {
      for (let i = 1; i < width; i++) {
        this.cumsum[j][i] = data[j*width+i]
                               + this.cumsum[j-1][i]
                               + this.cumsum[j][i-1]
                               - this.cumsum[j-1][i-1];
      }
    }
  }

  query(x1, y1, x2, y2) {
    let ret = this.cumsum[y2][x2];
    if (y1 > 0) ret -= this.cumsum[y1-1][x2];
    if (x1 > 0) ret -= this.cumsum[y2][x1-1];
    if (x1 > 0 && y1 > 0) ret += this.cumsum[y1-1][x1-1];
    return ret;
  }
}

module.exports = {
  Cumsum
}


/***/ }),

/***/ "./src/image-target/utils/images.js":
/*!******************************************!*\
  !*** ./src/image-target/utils/images.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// simpler version of upsampling. better performance
const _upsampleBilinear = ({image, padOneWidth, padOneHeight}) => {
  const {width, height, data} = image;
  const dstWidth = image.width * 2 + (padOneWidth?1:0);
  const dstHeight = image.height * 2 + (padOneHeight?1:0);
  const temp = new Float32Array(dstWidth * dstHeight);

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const v = 0.25 * data[j * width + i];
      const ii = Math.floor(i/2);
      const jj = Math.floor(j/2);
      const pos = Math.floor(j/2) * dstWidth + Math.floor(i/2);
      temp[pos] += v;
      temp[pos+1] += v;
      temp[pos+dstWidth] += v;
      temp[pos+dstWidth+1] += v;
    }
  }
  return {data: temp, width: dstWidth, height: dstHeight};
}

// artoolkit version. slower. is it necessary?
const upsampleBilinear = ({image, padOneWidth, padOneHeight}) => {
  const {width, height, data} = image;

  const dstWidth = image.width * 2 + (padOneWidth?1:0);
  const dstHeight = image.height * 2 + (padOneHeight?1:0);

  const temp = new Float32Array(dstWidth * dstHeight);
  for (let i = 0; i < dstWidth; i++) {
    const si = 0.5 * i - 0.25;
    let si0 = Math.floor(si);
    let si1 = Math.ceil(si);
    if (si0 < 0) si0 = 0; // border
    if (si1 >= width) si1 = width - 1; // border

    for (let j = 0; j < dstHeight; j++) {
      const sj = 0.5 * j - 0.25;
      let sj0 = Math.floor(sj);
      let sj1 = Math.ceil(sj);
      if (sj0 < 0) sj0 = 0; // border
      if (sj1 >= height) sj1 = height - 1; //border

      const value = (si1 - si) * (sj1 - sj) * data[ sj0 * width + si0 ] +
                    (si1 - si) * (sj - sj0) * data[ sj1 * width + si0 ] +
                    (si - si0) * (sj1 - sj) * data[ sj0 * width + si1 ] +
                    (si - si0) * (sj - sj0) * data[ sj1 * width + si1 ];

      temp[j * dstWidth + i] = value;
    }
  }

  return {data: temp, width: dstWidth, height: dstHeight};
}

const downsampleBilinear = ({image}) => {
  const {data, width, height} = image;

  const dstWidth = Math.floor(width / 2);
  const dstHeight = Math.floor(height / 2);

  const temp = new Float32Array(dstWidth * dstHeight);
  const offsets = [0, 1, width, width+1];

  for (let j = 0; j < dstHeight; j++) {
    for (let i = 0; i < dstWidth; i++) {
      let srcPos = j*2 * width + i*2;
      let value = 0.0;
      for (let d = 0; d < offsets.length; d++) {
        value += data[srcPos+ offsets[d]];
      }
      value *= 0.25;
      temp[j*dstWidth+i] = value;
    }
  }
  return {data: temp, width: dstWidth, height: dstHeight};
}

const resize = ({image, ratio}) => {
  const width = Math.round(image.width * ratio);
  const height = Math.round(image.height * ratio);

  //const imageData = new Float32Array(width * height);
  const imageData = new Uint8Array(width * height);
  for (let i = 0; i < width; i++) {
    let si1 = Math.round(1.0 * i / ratio);
    let si2 = Math.round(1.0 * (i+1) / ratio) - 1;
    if (si2 >= image.width) si2 = image.width - 1;

    for (let j = 0; j < height; j++) {
      let sj1 = Math.round(1.0 * j / ratio);
      let sj2 = Math.round(1.0 * (j+1) / ratio) - 1;
      if (sj2 >= image.height) sj2 = image.height - 1;

      let sum = 0;
      let count = 0;
      for (let ii = si1; ii <= si2; ii++) {
        for (let jj = sj1; jj <= sj2; jj++) {
          sum += (1.0 * image.data[jj * image.width + ii]);
          count += 1;
        }
      }
      imageData[j * width + i] = Math.floor(sum / count);
    }
  }
  return {data: imageData, width: width, height: height};
}

module.exports = {
  downsampleBilinear,
  upsampleBilinear,
  resize,
}



/***/ }),

/***/ "./src/image-target/utils/randomizer.js":
/*!**********************************************!*\
  !*** ./src/image-target/utils/randomizer.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

const mRandSeed = 1234;

const createRandomizer = () => {
  const randomizer = {
    seed: mRandSeed,

    arrayShuffle(options) {
      const {arr, sampleSize} = options;
      for (let i = 0; i < sampleSize; i++) {

        this.seed = (214013 * this.seed + 2531011) % (1 << 31);
        let k = (this.seed >> 16) & 0x7fff;
        k = k % arr.length;

        let tmp = arr[i];
        arr[i] = arr[k];
        arr[k] = tmp;
      }
    },

    nextInt(maxValue) {
      this.seed = (214013 * this.seed + 2531011) % (1 << 31);
      let k = (this.seed >> 16) & 0x7fff;
      k = k % maxValue;
      return k;
    }
  }
  return randomizer;
}

module.exports = {
  createRandomizer
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBpbGVyLndvcmtlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2UtdGFyZ2V0L2RldGVjdG9yQ1BVL2RldGVjdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9pbWFnZS10YXJnZXQvZGV0ZWN0b3JDUFUvZG9nLXB5cmFtaWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltYWdlLXRhcmdldC9kZXRlY3RvckNQVS9mcmVhay1leHRyYWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltYWdlLXRhcmdldC9kZXRlY3RvckNQVS9nYXVzc2lhbi1weXJhbWlkLmpzIiwid2VicGFjazovLy8uL3NyYy9pbWFnZS10YXJnZXQvaW1hZ2UtbGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2UtdGFyZ2V0L21hdGNoaW5nL2hhbW1pbmctZGlzdGFuY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltYWdlLXRhcmdldC9tYXRjaGluZy9oaWVyYXJjaGljYWwtY2x1c3RlcmluZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2UtdGFyZ2V0L3RyYWNraW5nL2V4dHJhY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2UtdGFyZ2V0L3V0aWxzL2N1bXN1bS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2UtdGFyZ2V0L3V0aWxzL2ltYWdlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2UtdGFyZ2V0L3V0aWxzL3JhbmRvbWl6ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdD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QTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EiLCJmaWxlIjoid29ya2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvfmhpdWtpbS9wcm9qZWN0cy9XZWJDYXJkcy9taW5kLWFyLWpzL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2NvbXBpbGVyLndvcmtlci5qc1wiKTtcbiIsImNvbnN0IHtleHRyYWN0fSA9IHJlcXVpcmUoJy4vaW1hZ2UtdGFyZ2V0L3RyYWNraW5nL2V4dHJhY3Rvci5qcycpO1xuLy9jb25zdCB7RGV0ZWN0b3J9ID0gcmVxdWlyZSgnLi9pbWFnZS10YXJnZXQvZGV0ZWN0b3JHUFUvZGV0ZWN0b3IuanMnKTsgLy8gZ3B1IHN0YXJ0dXAgaXMgdmVyeSBzbG93XG5jb25zdCB7RGV0ZWN0b3J9ID0gcmVxdWlyZSgnLi9pbWFnZS10YXJnZXQvZGV0ZWN0b3JDUFUvZGV0ZWN0b3IuanMnKTtcbmNvbnN0IHtidWlsZDogaGllcmFyY2hpY2FsQ2x1c3RlcmluZ0J1aWxkfSA9IHJlcXVpcmUoJy4vaW1hZ2UtdGFyZ2V0L21hdGNoaW5nL2hpZXJhcmNoaWNhbC1jbHVzdGVyaW5nLmpzJyk7XG5jb25zdCB7YnVpbGRJbWFnZUxpc3R9ID0gcmVxdWlyZSgnLi9pbWFnZS10YXJnZXQvaW1hZ2UtbGlzdC5qcycpO1xuXG5vbm1lc3NhZ2UgPSAobXNnKSA9PiB7XG4gIGNvbnN0IHtkYXRhfSA9IG1zZztcbiAgaWYgKGRhdGEudHlwZSA9PT0gJ2NvbXBpbGUnKSB7XG4gICAgY29uc3Qge3RhcmdldEltYWdlc30gPSBkYXRhO1xuICAgIGNvbnN0IGxpc3QgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRhcmdldEltYWdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc29sZS5sb2coXCJjb21waWxpbmcuLi5cIiwgaSk7XG4gICAgICBjb25zdCB0YXJnZXRJbWFnZSA9IHRhcmdldEltYWdlc1tpXTtcbiAgICAgIGNvbnN0IGltYWdlTGlzdCA9IGJ1aWxkSW1hZ2VMaXN0KHRhcmdldEltYWdlKTtcbiAgICAgIGNvbnN0IHRyYWNraW5nRGF0YSA9IF9leHRyYWN0VHJhY2tpbmdGZWF0dXJlcyhpbWFnZUxpc3QpO1xuICAgICAgY29uc3QgbWF0Y2hpbmdEYXRhID0gX2V4dHJhY3RNYXRjaGluZ0ZlYXR1cmVzKGltYWdlTGlzdCk7XG4gICAgICBsaXN0LnB1c2goe1xuICAgICAgICB0YXJnZXRJbWFnZSxcbiAgICAgICAgaW1hZ2VMaXN0LFxuICAgICAgICB0cmFja2luZ0RhdGEsXG4gICAgICAgIG1hdGNoaW5nRGF0YVxuICAgICAgfSk7XG4gICAgfVxuICAgIHBvc3RNZXNzYWdlKHtcbiAgICAgIHR5cGU6ICdjb21waWxlRG9uZScsXG4gICAgICBsaXN0LFxuICAgIH0pO1xuICB9XG59O1xuXG5jb25zdCBfZXh0cmFjdE1hdGNoaW5nRmVhdHVyZXMgPSAoaW1hZ2VMaXN0KSA9PiB7XG4gIGNvbnN0IGtleWZyYW1lcyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGltYWdlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGltYWdlID0gaW1hZ2VMaXN0W2ldO1xuICAgIGNvbnN0IGRldGVjdG9yID0gbmV3IERldGVjdG9yKGltYWdlLndpZHRoLCBpbWFnZS5oZWlnaHQpO1xuICAgIGNvbnN0IHBzID0gZGV0ZWN0b3IuZGV0ZWN0SW1hZ2VEYXRhKGltYWdlLmRhdGEpO1xuXG4gICAgY29uc3Qga2V5cG9pbnRzID0gW107XG4gICAgY29uc3QgZHBpID0gMS4wO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGtleXBvaW50cy5wdXNoKHtcbiAgICAgICAgeDJEOiBwc1tpXS54LFxuICAgICAgICB5MkQ6IHBzW2ldLnksXG4gICAgICAgIHgzRDogKHBzW2ldLnggKyAwLjUpIC8gaW1hZ2UuZHBpLFxuICAgICAgICB5M0Q6ICgoaW1hZ2UuaGVpZ2h0LTAuNSkgLSBwc1tpXS55KSAvIGltYWdlLmRwaSxcbiAgICAgICAgYW5nbGU6IHBzW2ldLmFuZ2xlLFxuICAgICAgICBzY2FsZTogcHNbaV0uc2lnbWEsXG4gICAgICAgIG1heGltYTogcHNbaV0uc2NvcmUgPiAwLFxuICAgICAgICBkZXNjcmlwdG9yczogcHNbaV0uZGVzY3JpcHRvcnNcbiAgICAgIH0pXG4gICAgfVxuICAgIGNvbnN0IHBvaW50c0NsdXN0ZXIgPSBoaWVyYXJjaGljYWxDbHVzdGVyaW5nQnVpbGQoe3BvaW50czoga2V5cG9pbnRzfSk7XG4gICAga2V5ZnJhbWVzLnB1c2goe3BvaW50czoga2V5cG9pbnRzLCBwb2ludHNDbHVzdGVyLCB3aWR0aDogaW1hZ2Uud2lkdGgsIGhlaWdodDogaW1hZ2UuaGVpZ2h0fSk7XG4gIH1cbiAgcmV0dXJuIGtleWZyYW1lcztcbn1cblxuY29uc3QgX2V4dHJhY3RUcmFja2luZ0ZlYXR1cmVzID0gKGltYWdlTGlzdCkgPT4ge1xuICBjb25zdCBmZWF0dXJlU2V0cyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGltYWdlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGltYWdlID0gaW1hZ2VMaXN0W2ldO1xuICAgIGNvbnN0IGNvb3JkcyA9IGV4dHJhY3QoaW1hZ2UpO1xuXG4gICAgY29uc3QgZmVhdHVyZVNldCA9IHt9O1xuICAgIGZlYXR1cmVTZXQuc2NhbGUgPSBpO1xuICAgIGZlYXR1cmVTZXQubWluZHBpID0gKGkgPT09IGltYWdlTGlzdC5sZW5ndGgtMSk/IGltYWdlTGlzdFtpXS5kcGkgKiAwLjU6IGltYWdlTGlzdFtpKzFdLmRwaTtcbiAgICBmZWF0dXJlU2V0Lm1heGRwaSA9IChpID09PSAwKT8gaW1hZ2VMaXN0W2ldLmRwaSAqIDI6IChpbWFnZUxpc3RbaV0uZHBpICogMC44ICsgaW1hZ2VMaXN0W2ktMV0uZHBpICogMC4yKTtcbiAgICBmZWF0dXJlU2V0LmNvb3JkcyA9IFtdO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29vcmRzLmxlbmd0aDsgaisrKSB7XG4gICAgICBmZWF0dXJlU2V0LmNvb3Jkcy5wdXNoKHtcbiAgICAgICAgbXg6IGNvb3Jkc1tqXS5teCxcbiAgICAgICAgbXk6IGNvb3Jkc1tqXS5teSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBmZWF0dXJlU2V0cy5wdXNoKGZlYXR1cmVTZXQpO1xuICB9XG4gIHJldHVybiBmZWF0dXJlU2V0cztcbn1cbiIsImNvbnN0IHt1cHNhbXBsZUJpbGluZWFyLCBkb3duc2FtcGxlQmlsaW5lYXJ9ID0gcmVxdWlyZSgnLi4vdXRpbHMvaW1hZ2VzLmpzJyk7XG5jb25zdCB7YnVpbGQ6IGJ1aWxkR2F1c3NpYW5QeXJhbWlkfSA9IHJlcXVpcmUoJy4vZ2F1c3NpYW4tcHlyYW1pZCcpO1xuY29uc3Qge2J1aWxkOiBidWlsZERvR1B5cmFtaWR9ID0gcmVxdWlyZSgnLi9kb2ctcHlyYW1pZCcpO1xuY29uc3Qge2V4dHJhY3R9ID0gcmVxdWlyZSgnLi9mcmVhay1leHRyYWN0b3InKTtcblxuY29uc3QgUFlSQU1JRF9OVU1fU0NBTEVTX1BFUl9PQ1RBVkVTID0gMztcbmNvbnN0IFBZUkFNSURfTUlOX1NJWkUgPSA4O1xuXG5jb25zdCBNQVhfU1VCUElYRUxfRElTVEFOQ0VfU1FSID0gMyAqIDM7XG5jb25zdCBMQVBMQUNJQU5fU1FSX1RIUkVTSE9MRCA9IDMgKiAzO1xuY29uc3QgRURHRV9USFJFU0hPTEQgPSA0LjA7XG5jb25zdCBFREdFX0hFU1NJQU5fVEhSRVNIT0xEID0gKChFREdFX1RIUkVTSE9MRCsxKSAqIChFREdFX1RIUkVTSE9MRCsxKSAvIEVER0VfVEhSRVNIT0xEKTtcbmNvbnN0IE1BWF9GRUFUVVJFX1BPSU5UUyA9IDUwMDtcbmNvbnN0IFBSVU5FX0ZFQVRVUkVTX05VTV9CVUNLRVRTID0gMTA7IC8vIHBlciBkaW1lbnNpb25cblxuY29uc3QgT1JJRU5UQVRJT05fTlVNX0JJTlMgPSAzNjtcbmNvbnN0IE9SSUVOVEFUSU9OX0dBVVNTSUFOX0VYUEFOU0lPTl9GQUNUT1IgPSAzLjA7XG5jb25zdCBPUklFTlRBVElPTl9SRUdJT05fRVhQQU5TSU9OX0ZBQ1RPUiA9IDEuNTtcbmNvbnN0IE9SSUVOVEFUSU9OX1NNT09USElOR19JVEVSQVRJT05TID0gNTtcbmNvbnN0IE9SSUVOVEFUSU9OX1BFQUtfVEhSRVNIT0xEID0gMC44O1xuXG5jb25zdCBPTkVfT1ZFUl8yUEkgPSAwLjE1OTE1NDk0MzA5MTg5NTtcblxuY2xhc3MgRGV0ZWN0b3Ige1xuICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMucHJvY2Vzc0RhdGEgPSBudWxsO1xuICB9XG5cbiAgZGV0ZWN0KGlucHV0KSB7XG4gICAgaWYgKHRoaXMucHJvY2Vzc0RhdGEgPT09IG51bGwpIHtcbiAgICAgIHRoaXMucHJvY2Vzc0NhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgdGhpcy5wcm9jZXNzQ2FudmFzLndpZHRoID0gdGhpcy53aWR0aDtcbiAgICAgIHRoaXMucHJvY2Vzc0NhbnZhcy5oZWlnaHQgPSB0aGlzLmhlaWdodDtcbiAgICAgIHRoaXMud29ya2VyUHJvY2Vzc0NvbnRleHQgPSB0aGlzLnByb2Nlc3NDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgIHRoaXMucHJvY2Vzc0RhdGEgPSBuZXcgVWludDhBcnJheSh0aGlzLndpZHRoICogdGhpcy5oZWlnaHQpO1xuICAgIH1cbiAgICB0aGlzLndvcmtlclByb2Nlc3NDb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgdGhpcy53b3JrZXJQcm9jZXNzQ29udGV4dC5kcmF3SW1hZ2UoaW5wdXQsIDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICBjb25zdCBpbWFnZURhdGEgPSB0aGlzLndvcmtlclByb2Nlc3NDb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucHJvY2Vzc0RhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IG9mZnNldCA9IGkgKiA0O1xuICAgICAgLy90aGlzLnByb2Nlc3NEYXRhW2ldID0gTWF0aC5mbG9vcigoaW1hZ2VEYXRhLmRhdGFbb2Zmc2V0XSArIGltYWdlRGF0YS5kYXRhW29mZnNldCsxXSArIGltYWdlRGF0YS5kYXRhW29mZnNldCsyXSkvMyk7XG4gICAgICB0aGlzLnByb2Nlc3NEYXRhW2ldID0gKGltYWdlRGF0YS5kYXRhW29mZnNldF0gKyBpbWFnZURhdGEuZGF0YVtvZmZzZXQrMV0gKyBpbWFnZURhdGEuZGF0YVtvZmZzZXQrMl0pLzM7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmRldGVjdEltYWdlRGF0YSh0aGlzLnByb2Nlc3NEYXRhKTtcbiAgfVxuXG4gIGRldGVjdEltYWdlRGF0YShpbWFnZURhdGEpIHtcbiAgICBjb25zdCBpbWFnZSA9IHtkYXRhOiBpbWFnZURhdGEsIHdpZHRoOiB0aGlzLndpZHRoLCBoZWlnaHQ6IHRoaXMuaGVpZ2h0fTtcblxuICAgIGNvbnN0IGdhdXNzaWFuUHlyYW1pZCA9IGJ1aWxkR2F1c3NpYW5QeXJhbWlkKHtpbWFnZSwgbWluU2l6ZTogUFlSQU1JRF9NSU5fU0laRSwgbnVtU2NhbGVzUGVyT2N0YXZlczogUFlSQU1JRF9OVU1fU0NBTEVTX1BFUl9PQ1RBVkVTfSk7XG5cbiAgICBjb25zdCBkb2dQeXJhbWlkID0gYnVpbGREb0dQeXJhbWlkKHtnYXVzc2lhblB5cmFtaWQ6IGdhdXNzaWFuUHlyYW1pZH0pO1xuXG4gICAgY29uc3QgZmVhdHVyZVBvaW50cyA9IF9kZXRlY3RGZWF0dXJlUG9pbnRzKHtnYXVzc2lhblB5cmFtaWQ6IGdhdXNzaWFuUHlyYW1pZCwgZG9nUHlyYW1pZDogZG9nUHlyYW1pZH0pO1xuXG4gICAgY29uc3QgZGVzY3JpcHRvcnMgPSBleHRyYWN0KHtweXJhbWlkOiBnYXVzc2lhblB5cmFtaWQsIHBvaW50czogZmVhdHVyZVBvaW50c30pO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmZWF0dXJlUG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBmZWF0dXJlUG9pbnRzW2ldLmRlc2NyaXB0b3JzID0gZGVzY3JpcHRvcnNbaV07XG4gICAgfVxuICAgIHJldHVybiBmZWF0dXJlUG9pbnRzO1xuICB9XG59XG5cbi8vIERldGVjdCBtaW5pbWEgYW5kIG1heGltdW0gaW4gTGFwbGFjaWFuIGltYWdlc1xuY29uc3QgX2RldGVjdEZlYXR1cmVQb2ludHMgPSAoe2dhdXNzaWFuUHlyYW1pZCwgZG9nUHlyYW1pZH0pID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5ERUJVR19USU1FKSB7XG4gICAgdmFyIF9zdGFydCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICB9XG5cbiAgY29uc3Qgb3JpZ2luYWxXaWR0aCA9IGRvZ1B5cmFtaWQuaW1hZ2VzWzBdLndpZHRoO1xuICBjb25zdCBvcmlnaW5hbEhlaWdodCA9IGRvZ1B5cmFtaWQuaW1hZ2VzWzBdLmhlaWdodDtcblxuICBjb25zdCBtSyA9IE1hdGgucG93KDIsIDEuMCAvIChnYXVzc2lhblB5cmFtaWQubnVtU2NhbGVzUGVyT2N0YXZlcy0xKSk7XG5cbiAgY29uc3QgZmVhdHVyZVBvaW50cyA9IFtdO1xuXG4gIGxldCBleHRyZW1hQ291bnQgPSAwO1xuICBmb3IgKGxldCBrID0gMTsgayA8IGRvZ1B5cmFtaWQuaW1hZ2VzLmxlbmd0aCAtIDE7IGsrKykge1xuICAgIC8vIEV4cGVyaW1lbnRhbCByZXN1bHQgc2hvd3MgdGhhdCBubyBleHRyZW1hIGlzIHBvc3NpYmxlIGZvciBvZGQgbnVtYmVyIG9mIGtcbiAgICAvLyBJIGJlbGlldmUgaXQgaGFzIHNvbWV0aGluZyB0byBkbyB3aXRoIGhvdyB0aGUgZ2F1c3NpYW4gcHlyYW1pZCBiZWluZyBjb25zdHJ1Y3RlZFxuICAgIGlmIChrICUgMiA9PT0gMSkgY29udGludWU7XG5cbiAgICBsZXQgaW1hZ2UwID0gZG9nUHlyYW1pZC5pbWFnZXNbay0xXTtcbiAgICBsZXQgaW1hZ2UxID0gZG9nUHlyYW1pZC5pbWFnZXNba107XG4gICAgbGV0IGltYWdlMiA9IGRvZ1B5cmFtaWQuaW1hZ2VzW2srMV07XG5cbiAgICBjb25zdCBvY3RhdmUgPSBNYXRoLmZsb29yKGsgLyBkb2dQeXJhbWlkLm51bVNjYWxlc1Blck9jdGF2ZXMpO1xuICAgIGNvbnN0IHNjYWxlID0gayAlIGRvZ1B5cmFtaWQubnVtU2NhbGVzUGVyT2N0YXZlcztcblxuICAgIGxldCBoYXNVcHNhbXBsZSA9IGZhbHNlO1xuICAgIGxldCBoYXNQYWRPbmVXaWR0aCA9IGZhbHNlO1xuICAgIGxldCBoYXNQYWRPbmVIZWlnaHQgPSBmYWxzZTtcblxuICAgIGlmICggTWF0aC5mbG9vcihpbWFnZTAud2lkdGgvMikgPT0gaW1hZ2UxLndpZHRoKSB7XG4gICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LkRFQlVHX1RJTUUpIHtcbiAgICAgICAgdmFyIF9fc3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgIH1cbiAgICAgIGltYWdlMCA9IGRvd25zYW1wbGVCaWxpbmVhcih7aW1hZ2U6IGltYWdlMH0pO1xuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5ERUJVR19USU1FKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdleGVjIHRpbWUgZG93bnNhbXBsZUJpbGluZWFyJywgaW1hZ2UwLndpZHRoLCBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIF9fc3RhcnQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICggTWF0aC5mbG9vcihpbWFnZTEud2lkdGgvMikgPT0gaW1hZ2UyLndpZHRoKSB7XG4gICAgICBoYXNVcHNhbXBsZSA9IHRydWU7XG4gICAgICBoYXNQYWRPbmVXaWR0aCA9IGltYWdlMS53aWR0aCAlIDIgPT09IDE7XG4gICAgICBoYXNQYWRPbmVIZWlnaHQgPSBpbWFnZTEuaGVpZ2h0ICUgMiA9PT0gMTtcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuREVCVUdfVElNRSkge1xuICAgICAgICB2YXIgX19zdGFydCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgfVxuICAgICAgaW1hZ2UyID0gdXBzYW1wbGVCaWxpbmVhcih7aW1hZ2U6IGltYWdlMiwgcGFkT25lV2lkdGg6IGhhc1BhZE9uZVdpZHRoLCBwYWRPbmVIZWlnaHQ6IGhhc1BhZE9uZUhlaWdodH0pO1xuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5ERUJVR19USU1FKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdleGVjIHRpbWUgdXBzYW1wbGVCaWxpbmVhcicsIG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gX19zdGFydCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgd2lkdGggPSBpbWFnZTEud2lkdGg7XG4gICAgY29uc3QgaGVpZ2h0ID0gaW1hZ2UxLmhlaWdodDtcblxuICAgIGNvbnN0IG5laWdoYm91cnMgPSBbXG4gICAgICAwLCAtMSwgMSxcbiAgICAgIC1pbWFnZTEud2lkdGgsIC1pbWFnZTEud2lkdGgtMSwgLWltYWdlMS53aWR0aCsxLFxuICAgICAgaW1hZ2UxLndpZHRoLCBpbWFnZTEud2lkdGgtMSwgaW1hZ2UxLndpZHRoKzFcbiAgICBdO1xuXG4gICAgLy8gSW4gdXBzYW1wbGUgaW1hZ2UsIGlnbm9yZSB0aGUgYm9yZGVyXG4gICAgLy8gaXQncyBwb3NzaWJsZSB0byBmdXJ0aGVyIHBhZCBvbmUgbW9yZSBsaW5lIChpLmUuIHVwc2FjYWxlIDJ4MiAtPiA1eDUpIGF0IHRoZSBlbmQsIHNvIGlnbm9yZSBvbmUgbW9yZSBsaW5lXG4gICAgbGV0IHN0YXJ0SSA9IGhhc1Vwc2FtcGxlPyAyOiAxO1xuICAgIGxldCBzdGFydEogPSBzdGFydEk7XG5cbiAgICAvLyBzaG91bGQgaXQgYmUgXCJpbWFnZTEud2lkdGggLTJcIiA/IGJ1dCB0aGlzIHlpZWxkIGNvbnNpc3RlbnQgcmVzdWx0IHdpdGggYXJ0b29sa2l0XG4gICAgbGV0IGVuZEkgPSBoYXNVcHNhbXBsZT8gaW1hZ2UxLndpZHRoIC0gMzogaW1hZ2UxLndpZHRoIC0gMTtcbiAgICBsZXQgZW5kSiA9IGhhc1Vwc2FtcGxlPyBpbWFnZTEuaGVpZ2h0IC0gMzogaW1hZ2UxLmhlaWdodCAtIDE7XG4gICAgaWYgKGhhc1BhZE9uZVdpZHRoKSBlbmRJIC09IDE7XG4gICAgaWYgKGhhc1BhZE9uZUhlaWdodCkgZW5kSiAtPSAxO1xuXG4gICAgZm9yIChsZXQgaiA9IHN0YXJ0SjsgaiA8IGVuZEo7IGorKykge1xuICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0STsgaSA8IGVuZEk7IGkrKykge1xuICAgICAgICBjb25zdCBwb3MgPSBqKmltYWdlMS53aWR0aCArIGk7XG4gICAgICAgIGNvbnN0IHYgPSBpbWFnZTEuZGF0YVtwb3NdO1xuXG4gICAgICAgIGlmICh2KnYgPCBMQVBMQUNJQU5fU1FSX1RIUkVTSE9MRCkgY29udGludWU7XG5cbiAgICAgICAgLy8gU3RlcCAxOiBmaW5kIG1heGltYS8gbWluaW1hIGluIGxhcGxhY2lhbiBpbWFnZXNcbiAgICAgICAgbGV0IGlzTWF4ID0gdHJ1ZTtcbiAgICAgICAgZm9yIChsZXQgZCA9IDA7IGQgPCBuZWlnaGJvdXJzLmxlbmd0aDsgZCsrKSB7XG4gICAgICAgICAgaWYgKHYgPD0gaW1hZ2UwLmRhdGFbcG9zK25laWdoYm91cnNbZF1dKSB7aXNNYXggPSBmYWxzZTsgYnJlYWt9O1xuICAgICAgICAgIGlmICh2IDw9IGltYWdlMi5kYXRhW3BvcytuZWlnaGJvdXJzW2RdXSkge2lzTWF4ID0gZmFsc2U7IGJyZWFrfTtcbiAgICAgICAgICBpZiAoZCAhPT0gMCAmJiB2IDw9IGltYWdlMS5kYXRhW3BvcytuZWlnaGJvdXJzW2RdXSkge2lzTWF4ID0gZmFsc2U7IGJyZWFrfTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgaXNNaW4gPSB0cnVlO1xuICAgICAgICBmb3IgKGxldCBkID0gMDsgZCA8IG5laWdoYm91cnMubGVuZ3RoOyBkKyspIHtcbiAgICAgICAgICBpZiAodiA+PSBpbWFnZTAuZGF0YVtwb3MrbmVpZ2hib3Vyc1tkXV0pIHtpc01pbiA9IGZhbHNlOyBicmVha307XG4gICAgICAgICAgaWYgKHYgPj0gaW1hZ2UyLmRhdGFbcG9zK25laWdoYm91cnNbZF1dKSB7aXNNaW4gPSBmYWxzZTsgYnJlYWt9O1xuICAgICAgICAgIGlmIChkICE9PSAwICYmIHYgPj0gaW1hZ2UxLmRhdGFbcG9zK25laWdoYm91cnNbZF1dKSB7aXNNaW4gPSBmYWxzZTsgYnJlYWt9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpc01heCAmJiAhaXNNaW4pIGNvbnRpbnVlOyAvLyBleHRyZW1hIC0+IGZlYXR1cmUgcG9pbnRcblxuICAgICAgICBleHRyZW1hQ291bnQgKz0gMTtcblxuICAgICAgICAvLyBTdGVwIDI6IHN1Yi1waXhlbCByZWZpbmVtZW50IChJJ20gbm90IHN1cmUgd2hhdCB0aGF0IG1lYW5zLiBBbnkgZWR1Y2F0aW9uYWwgcmVmPylcblxuICAgICAgICAvLyBDb21wdXRlIHNwYXRpYWwgZGVyaXZhdGl2ZXNcbiAgICAgICAgY29uc3QgZHggPSAwLjUgKiAoaW1hZ2UxLmRhdGFbcG9zICsgMV0gLSBpbWFnZTEuZGF0YVtwb3MgLSAxXSk7XG4gICAgICAgIGNvbnN0IGR5ID0gMC41ICogKGltYWdlMS5kYXRhW3BvcyArIHdpZHRoXSAtIGltYWdlMS5kYXRhW3BvcyAtIHdpZHRoXSk7XG4gICAgICAgIGNvbnN0IGR4eCA9IGltYWdlMS5kYXRhW3BvcyArIDFdICsgaW1hZ2UxLmRhdGFbcG9zIC0gMV0gLSAyICogaW1hZ2UxLmRhdGFbcG9zXTtcbiAgICAgICAgY29uc3QgZHl5ID0gaW1hZ2UxLmRhdGFbcG9zICsgd2lkdGhdICsgaW1hZ2UxLmRhdGFbcG9zIC0gd2lkdGhdIC0gMiAqIGltYWdlMS5kYXRhW3Bvc107XG4gICAgICAgIGNvbnN0IGR4eSA9IDAuMjUgKiAoaW1hZ2UxLmRhdGFbcG9zIC0gd2lkdGggLTFdICsgaW1hZ2UxLmRhdGFbcG9zICsgd2lkdGggKyAxXSAtIGltYWdlMS5kYXRhW3BvcyAtIHdpZHRoICsxXSAtIGltYWdlMS5kYXRhW3BvcyArIHdpZHRoIC0gMV0pO1xuXG4gICAgICAgIC8vIENvbXB1dGUgc2NhbGUgZGVyaXZhdGVzXG4gICAgICAgIGNvbnN0IGRzID0gMC41ICogKGltYWdlMi5kYXRhW3Bvc10gLSBpbWFnZTAuZGF0YVtwb3NdKTtcbiAgICAgICAgY29uc3QgZHNzID0gaW1hZ2UyLmRhdGFbcG9zXSArIGltYWdlMC5kYXRhW3Bvc10gLSAyICogaW1hZ2UxLmRhdGFbcG9zXTtcbiAgICAgICAgY29uc3QgZHhzID0gMC4yNSAqICgoaW1hZ2UwLmRhdGFbcG9zLTFdIC0gaW1hZ2UwLmRhdGFbcG9zKzFdKSArICgtaW1hZ2UyLmRhdGFbcG9zLTFdICsgaW1hZ2UyLmRhdGFbcG9zKzFdKSk7XG4gICAgICAgIGNvbnN0IGR5cyA9IDAuMjUgKiAoKGltYWdlMC5kYXRhW3Bvcy13aWR0aF0gLSBpbWFnZTAuZGF0YVtwb3Mrd2lkdGhdKSArICgtaW1hZ2UyLmRhdGFbcG9zLXdpZHRoXSArIGltYWdlMi5kYXRhW3Bvcyt3aWR0aF0pKTtcblxuICAgICAgICAvLyBIZXNzaWFuIG1hdHJpeFxuICAgICAgICBjb25zdCBoZXNzaWFuID0gW1xuICAgICAgICAgIGR4eCwgZHh5LCBkeHMsXG4gICAgICAgICAgZHh5LCBkeXksIGR5cyxcbiAgICAgICAgICBkeHMsIGR5cywgZHNzXG4gICAgICAgIF07XG5cbiAgICAgICAgLy8gYlxuICAgICAgICBjb25zdCBiID0gW1xuICAgICAgICAgIC1keCxcbiAgICAgICAgICAtZHksXG4gICAgICAgICAgLWRzXG4gICAgICAgIF07XG5cbiAgICAgICAgLy8gU29sdmUgSCAqIHUgPSBiO1xuICAgICAgICBjb25zdCB1ID0gX3NvbHZlU3ltbWV0cmljMzMoe0E6IGhlc3NpYW4sIGI6IGJ9KTtcbiAgICAgICAgaWYgKHUgPT09IG51bGwpIGNvbnRpbnVlOyAvLyBubyBzb2x1dGlvblxuXG4gICAgICAgIC8vIElmIHBvaW50cyBtb3ZlIHRvbyBtdWNoIGluIHRoZSBzdWItcGl4ZWwgdXBkYXRlLCB0aGVuIHRoZSBwb2ludCBwcm9iYWJseSB1bnN0YWJsZS5cbiAgICAgICAgaWYgKHVbMF0gKiB1WzBdICsgdVsxXSAqIHVbMV0gPiBNQVhfU1VCUElYRUxfRElTVEFOQ0VfU1FSKSBjb250aW51ZTtcblxuICAgICAgICAvLyBjb21wdXRlIGVkZ2Ugc2NvcmVcbiAgICAgICAgY29uc3QgZGV0ID0gKGR4eCAqIGR5eSkgLSAoZHh5ICogZHh5KTtcbiAgICAgICAgaWYgKGRldCA9PT0gMCkgY29udGludWU7XG5cbiAgICAgICAgY29uc3QgZWRnZVNjb3JlID0gKGR4eCArIGR5eSkgKiAoZHh4ICsgZHl5KSAvIGRldDtcbiAgICAgICAgaWYgKE1hdGguYWJzKGVkZ2VTY29yZSkgPj0gRURHRV9IRVNTSUFOX1RIUkVTSE9MRCApIGNvbnRpbnVlO1xuXG4gICAgICAgIGNvbnN0IHNjb3JlID0gdiAtIChiWzBdICogdVswXSArIGJbMV0gKiB1WzFdICsgYlsyXSAqIHVbMl0pO1xuICAgICAgICBpZiAoc2NvcmUgKiBzY29yZSA8IExBUExBQ0lBTl9TUVJfVEhSRVNIT0xEKSBjb250aW51ZTtcblxuICAgICAgICAvLyBvcmlnaW5hbCB4ID0geCoyXm4gKyAyXihuLTEpIC0gMC41XG4gICAgICAgIC8vIG9yaWdpbmFsIHkgPSB5KjJebiArIDJeKG4tMSkgLSAwLjVcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxYID0gaSAqIE1hdGgucG93KDIsIG9jdGF2ZSkgKyBNYXRoLnBvdygyLCBvY3RhdmUtMSkgLSAwLjU7XG4gICAgICAgIGNvbnN0IG9yaWdpbmFsWSA9IGogKiBNYXRoLnBvdygyLCBvY3RhdmUpICsgTWF0aC5wb3coMiwgb2N0YXZlLTEpIC0gMC41O1xuXG4gICAgICAgIGNvbnN0IG5ld1ggPSBvcmlnaW5hbFggKyB1WzBdICogTWF0aC5wb3coMiwgb2N0YXZlKTtcbiAgICAgICAgY29uc3QgbmV3WSA9IG9yaWdpbmFsWSArIHVbMV0gKiBNYXRoLnBvdygyLCBvY3RhdmUpO1xuICAgICAgICBpZiAobmV3WCA8IDAgfHwgbmV3WCA+PSBvcmlnaW5hbFdpZHRoIHx8IG5ld1kgPCAwIHx8IG5ld1kgPj0gb3JpZ2luYWxIZWlnaHQpIGNvbnRpbnVlO1xuXG4gICAgICAgIGNvbnN0IHNwU2NhbGUgPSBNYXRoLm1pbihNYXRoLm1heCgwLCBzY2FsZSArIHVbMl0pLCBkb2dQeXJhbWlkLm51bVNjYWxlc1Blck9jdGF2ZXMpO1xuICAgICAgICBjb25zdCBuZXdTaWdtYSA9IE1hdGgucG93KG1LLCBzcFNjYWxlKSAqICgxIDw8IG9jdGF2ZSk7XG5cbiAgICAgICAgbGV0IG5ld09jdGF2ZVggPSBuZXdYICogKDEuMCAvIE1hdGgucG93KDIsIG9jdGF2ZSkpICsgMC41ICogKDEuMCAvIE1hdGgucG93KDIsIG9jdGF2ZSkpIC0gMC41O1xuICAgICAgICBsZXQgbmV3T2N0YXZlWSA9IG5ld1kgKiAoMS4wIC8gTWF0aC5wb3coMiwgb2N0YXZlKSkgKyAwLjUgKiAoMS4wIC8gTWF0aC5wb3coMiwgb2N0YXZlKSkgLSAwLjU7XG4gICAgICAgIG5ld09jdGF2ZVggPSBNYXRoLmZsb29yKG5ld09jdGF2ZVggKyAwLjUpO1xuICAgICAgICBuZXdPY3RhdmVZID0gTWF0aC5mbG9vcihuZXdPY3RhdmVZICsgMC41KTtcblxuICAgICAgICBmZWF0dXJlUG9pbnRzLnB1c2goe1xuICAgICAgICAgIG9jdGF2ZTogb2N0YXZlLFxuICAgICAgICAgIHNjYWxlOiBzY2FsZSxcbiAgICAgICAgICBvY3RhdmVYOiBuZXdPY3RhdmVYLFxuICAgICAgICAgIG9jdGF2ZVk6IG5ld09jdGF2ZVksXG4gICAgICAgICAgeDogbmV3WCxcbiAgICAgICAgICB5OiBuZXdZLFxuICAgICAgICAgIHNpZ21hOiBuZXdTaWdtYSxcbiAgICAgICAgICBzY29yZTogc2NvcmUsXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5ERUJVRykge1xuICAgIGNvbnN0IGZwcyA9IHdpbmRvdy5kZWJ1Z0NvbnRlbnQuZmVhdHVyZVBvaW50czJbd2luZG93LmRlYnVnLmtleWZyYW1lSW5kZXhdO1xuICAgIGNvbnNvbGUubG9nKFwiZmVhdHVyZXBvaW50czJcIiwgZmVhdHVyZVBvaW50cy5sZW5ndGgsICd2cycsIGZwcy5sZW5ndGgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZnBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBmcDEgPSBmZWF0dXJlUG9pbnRzW2ldO1xuICAgICAgY29uc3QgZnAyID0gZnBzW2ldO1xuICAgICAgLy9pZiAoIXdpbmRvdy5jbXBPYmooZnAxLCBmcDIsIFsneCcsICd5JywgJ3Njb3JlJywgJ3NpZ21hJywgJ3NwU2NhbGUnLCAnZWRnZVNjb3JlJ10pKSB7XG4gICAgICBpZiAoIXdpbmRvdy5jbXBPYmooZnAxLCBmcDIsIFsneCcsICd5JywgJ3Njb3JlJywgJ3NpZ21hJ10pKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiSU5DT1JSRUNUIGZlYXR1cmVwb2ludDJcIiwgZnAxLCBmcDIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuREVCVUdfVElNRSkge1xuICAgIGNvbnNvbGUubG9nKCdleGVjIHRpbWUgREVURUNUSU9OIGZpcnN0IGV4dHJhY3QnLCBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIF9zdGFydCk7XG4gIH1cblxuICBjb25zdCBwcnVuZWRGZWF0dXJlUG9pbnRzID0gX3BydW5lRmVhdHVyZXMoe2ZlYXR1cmVQb2ludHM6IGZlYXR1cmVQb2ludHMsIHdpZHRoOiBvcmlnaW5hbFdpZHRoLCBoZWlnaHQ6IG9yaWdpbmFsSGVpZ2h0fSk7XG5cbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5ERUJVR19USU1FKSB7XG4gICAgY29uc29sZS5sb2coJ2V4ZWMgdGltZSBERVRFQ1RJT04gcHJ1bmUnLCBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIF9zdGFydCk7XG4gIH1cblxuICBjb25zdCBvcmllbnRlZEZlYXR1cmVQb2ludHMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcnVuZWRGZWF0dXJlUG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5ERUJVRykge1xuICAgICAgd2luZG93LmRlYnVnLm9yaWVudGF0aW9uQ29tcHV0ZUluZGV4ID0gaTtcbiAgICB9XG5cbiAgICBjb25zdCBmcCA9IHBydW5lZEZlYXR1cmVQb2ludHNbaV07XG4gICAgY29uc3Qgb2N0YXZlU2lnbWEgPSBmcC5zaWdtYSAqICgxLjAgLyBNYXRoLnBvdygyLCBmcC5vY3RhdmUpKTtcblxuICAgIGNvbnN0IHB5cmFtaWRJbWFnZUluZGV4ID0gZnAub2N0YXZlICogZ2F1c3NpYW5QeXJhbWlkLm51bVNjYWxlc1Blck9jdGF2ZXMgKyBmcC5zY2FsZTtcbiAgICBjb25zdCBhbmdsZXMgPSBfY29tcHV0ZU9yaWVudGF0aW9uKHt4OiBmcC5vY3RhdmVYLCB5OiBmcC5vY3RhdmVZLCBzaWdtYTogb2N0YXZlU2lnbWEsIG9jdGF2ZTogZnAub2N0YXZlLCBzY2FsZTogZnAuc2NhbGUsIHB5cmFtaWQ6IGdhdXNzaWFuUHlyYW1pZCwgcHlyYW1pZEltYWdlSW5kZXh9KTtcblxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgYW5nbGVzLmxlbmd0aDsgaisrKSB7XG4gICAgICBvcmllbnRlZEZlYXR1cmVQb2ludHMucHVzaChPYmplY3QuYXNzaWduKHtcbiAgICAgICAgYW5nbGU6IGFuZ2xlc1tqXVxuICAgICAgfSwgcHJ1bmVkRmVhdHVyZVBvaW50c1tpXSkpO1xuICAgIH1cbiAgfVxuXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuREVCVUcpIHtcbiAgICBjb25zdCBmcHMgPSB3aW5kb3cuZGVidWdDb250ZW50LmZlYXR1cmVQb2ludHM0W3dpbmRvdy5kZWJ1Zy5rZXlmcmFtZUluZGV4XTtcbiAgICBjb25zb2xlLmxvZyhcImZlYXR1cmVwb2ludHM0XCIsIG9yaWVudGVkRmVhdHVyZVBvaW50cy5sZW5ndGgsICd2cycsIGZwcy5sZW5ndGgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZnBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBmcDEgPSBvcmllbnRlZEZlYXR1cmVQb2ludHNbaV07XG4gICAgICBjb25zdCBmcDIgPSBmcHNbaV07XG4gICAgICAvL2lmICghd2luZG93LmNtcE9iaihmcDEsIGZwMiwgWyd4JywgJ3knLCAnc2NvcmUnLCAnc2lnbWEnLCAnc3BTY2FsZScsICdlZGdlU2NvcmUnLCAnYW5nbGUnXSkpIHtcbiAgICAgIGlmICghd2luZG93LmNtcE9iaihmcDEsIGZwMiwgWyd4JywgJ3knLCAnc2NvcmUnLCAnc2lnbWEnLCAnYW5nbGUnXSkpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJJTkNPUlJFQ1QgZmVhdHVyZXBvaW50NFwiLCBmcDEsIGZwMik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LkRFQlVHX1RJTUUpIHtcbiAgICBjb25zb2xlLmxvZygnZXhlYyB0aW1lIERFVEVDVElPTiBjb21wdXRlIG9yaWVudGVkJywgbmV3IERhdGUoKS5nZXRUaW1lKCkgLSBfc3RhcnQpO1xuICB9XG5cbiAgcmV0dXJuIG9yaWVudGVkRmVhdHVyZVBvaW50cztcbn1cblxuY29uc3QgX2NvbXB1dGVPcmllbnRhdGlvbiA9IChvcHRpb25zKSA9PiB7XG4gIGNvbnN0IHt4LCB5LCBzaWdtYSwgb2N0YXZlLCBzY2FsZSwgZ3JhZGllbnQsIHB5cmFtaWQsIHB5cmFtaWRJbWFnZUluZGV4fSA9IG9wdGlvbnM7XG4gIGNvbnN0IGltYWdlID0gcHlyYW1pZC5pbWFnZXNbcHlyYW1pZEltYWdlSW5kZXhdO1xuXG4gIGNvbnN0IGd3U2lnbWEgPSBNYXRoLm1heCgxLjAsIE9SSUVOVEFUSU9OX0dBVVNTSUFOX0VYUEFOU0lPTl9GQUNUT1IgKiBzaWdtYSk7XG4gIGNvbnN0IGd3U2NhbGUgPSAtMS4wIC8gKDIgKiBnd1NpZ21hICogZ3dTaWdtYSk7XG5cbiAgY29uc3QgcmFkaXVzID0gT1JJRU5UQVRJT05fUkVHSU9OX0VYUEFOU0lPTl9GQUNUT1IgKiBnd1NpZ21hO1xuICBjb25zdCByYWRpdXMyID0gTWF0aC5jZWlsKCByYWRpdXMgKiByYWRpdXMgLSAwLjUpO1xuXG4gIGNvbnN0IHgwID0gTWF0aC5tYXgoMCwgeCAtIE1hdGguZmxvb3IocmFkaXVzICsgMC41KSk7XG4gIGNvbnN0IHgxID0gTWF0aC5taW4oaW1hZ2Uud2lkdGgtMSwgeCArIE1hdGguZmxvb3IocmFkaXVzICsgMC41KSk7XG4gIGNvbnN0IHkwID0gTWF0aC5tYXgoMCwgeSAtIE1hdGguZmxvb3IocmFkaXVzICsgMC41KSk7XG4gIGNvbnN0IHkxID0gTWF0aC5taW4oaW1hZ2UuaGVpZ2h0LTEsIHkgKyBNYXRoLmZsb29yKHJhZGl1cyArIDAuNSkpO1xuXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuREVCVUcpIHtcbiAgICBjb25zdCBvID0gd2luZG93LmRlYnVnQ29udGVudC5vcmllbnRhdGlvbkNvbXB1dGVbd2luZG93LmRlYnVnLmtleWZyYW1lSW5kZXhdW3dpbmRvdy5kZWJ1Zy5vcmllbnRhdGlvbkNvbXB1dGVJbmRleF07XG4gICAgaWYgKE1hdGguZmxvb3Ioby54ICsgMC41KSAhPT0geCB8fCBNYXRoLmZsb29yKG8ueSArIDAuNSkgIT09IHkpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiSU5DT1JSRUNUIG9yaWVudGF0aW9uIGlucHV0XCIpO1xuICAgIH1cbiAgICBpZiAoeDAgIT09IG8ueDAgfHwgeDEgIT09IG8ueDEgfHwgeTAgIT09IG8ueTAgfHwgeTEgIT09IG8ueTEpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiSU5DT1JSRUNUIHh5IHJhbmdlXCIpO1xuICAgIH1cbiAgICBpZiAocmFkaXVzMiAhPT0gby5yYWRpdXMyKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIklOQ09SUkVDVCByYWRpdXNcIiwgcmFkaXVzLCByYWRpdXMyLCBvLnJhZGl1cywgby5yYWRpdXMyKTtcbiAgICB9XG4gICAgd2luZG93LmRlYnVnLmZiaW5JbmRleCA9IC0xO1xuICB9XG5cbiAgY29uc3QgaGlzdG9ncmFtID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgT1JJRU5UQVRJT05fTlVNX0JJTlM7IGkrKykge1xuICAgIGhpc3RvZ3JhbS5wdXNoKDApO1xuICB9XG5cbiAgZm9yIChsZXQgeXAgPSB5MDsgeXAgPD0geTE7IHlwKyspIHtcbiAgICBjb25zdCBkeSA9IHlwIC0geTtcbiAgICBjb25zdCBkeTIgPSBkeSAqIGR5O1xuXG4gICAgZm9yIChsZXQgeHAgPSB4MDsgeHAgPD0geDE7IHhwKyspIHtcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuREVCVUcpIHtcbiAgICAgICAgd2luZG93LmRlYnVnLmZiaW5JbmRleCArPSAxO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkeCA9IHhwIC0geDtcbiAgICAgIGNvbnN0IGR4MiA9IGR4ICogZHg7XG5cbiAgICAgIGNvbnN0IHIyID0gZHgyICsgZHkyO1xuICAgICAgaWYocjIgPiByYWRpdXMyKSB7XG4gICAgICAgIGNvbnRpbnVlOyAvLyBvbmx5IHVzZSB0aGUgZ3JhZGllbnRzIHdpdGhpbiB0aGUgY2lyY3VsYXIgd2luZG93XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHttYWcsIGFuZ2xlfSA9IF9jb21wdXRlR3JhZGllbnQocHlyYW1pZCwgcHlyYW1pZEltYWdlSW5kZXgsIHlwLCB4cCk7XG5cbiAgICAgIGNvbnN0IHcgPSBfZmFzdEV4cDYoe3g6IHIyICogZ3dTY2FsZX0pOyAvLyBDb21wdXRlIHRoZSBnYXVzc2lhbiB3ZWlnaHQgYmFzZWQgb24gZGlzdGFuY2UgZnJvbSBjZW50ZXIgb2Yga2V5cG9pbnRcblxuICAgICAgY29uc3QgZmJpbiAgPSBPUklFTlRBVElPTl9OVU1fQklOUyAqIGFuZ2xlICogT05FX09WRVJfMlBJO1xuXG4gICAgICBjb25zdCBiaW4gPSBNYXRoLmZsb29yKGZiaW4gLSAwLjUpO1xuICAgICAgY29uc3QgdzIgPSBmYmluIC0gYmluIC0gMC41O1xuICAgICAgY29uc3QgdzEgPSAoMS4wIC0gdzIpO1xuICAgICAgY29uc3QgYjEgPSAoYmluICsgT1JJRU5UQVRJT05fTlVNX0JJTlMpICUgT1JJRU5UQVRJT05fTlVNX0JJTlM7XG4gICAgICBjb25zdCBiMiA9IChiaW4gKyAxKSAlIE9SSUVOVEFUSU9OX05VTV9CSU5TO1xuICAgICAgY29uc3QgbWFnbml0dWRlID0gdyAqIG1hZztcblxuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5ERUJVRykge1xuICAgICAgICBjb25zdCBvID0gd2luZG93LmRlYnVnQ29udGVudC5vcmllbnRhdGlvbkNvbXB1dGVbd2luZG93LmRlYnVnLmtleWZyYW1lSW5kZXhdW3dpbmRvdy5kZWJ1Zy5vcmllbnRhdGlvbkNvbXB1dGVJbmRleF07XG4gICAgICAgIGlmIChNYXRoLmFicyhmYmluIC0gby5mYmluc1t3aW5kb3cuZGVidWcuZmJpbkluZGV4XSkgPiAwLjAwMSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiSU5DT1JSRUNUIGZiaW5cIiwgcjIsIHJhZGl1czIsIGZiaW4sICd2cycsIG8uZmJpbnNbd2luZG93LmRlYnVnLmZiaW5JbmRleF0pO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRldGFpbHMgPSBvLmZiaW5EZXRhaWxzW3dpbmRvdy5kZWJ1Zy5mYmluSW5kZXhdO1xuICAgICAgICBpZiAoYjEgIT09IGRldGFpbHMuYjEgfHwgYjIgIT09IGRldGFpbHMuYjIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIklOQ09SUkVDVCBiMWIyXCIsIGIxLCBiMiwgZGV0YWlscy5iMSwgZGV0YWlscy5iMik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE1hdGguYWJzKHcxIC0gZGV0YWlscy53MSkgPiAwLjAwMSB8fCBNYXRoLmFicyh3MiAtIGRldGFpbHMudzIpID4gMC4wMDEpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIklOQ09SUkVDVCB3MXcyXCIsIHcxLCB3MiwgZGV0YWlscy53MSwgZGV0YWlscy53Mik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE1hdGguYWJzKGRldGFpbHMubWFnbml0dWRlIC0gbWFnbml0dWRlKSA+IDAuMDAxKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJJTkNPUlJFQ1QgbWFnOiBcIiwgbWFnbml0dWRlLCBkZXRhaWxzLm1hZ25pdHVkZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaGlzdG9ncmFtW2IxXSArPSB3MSAqIG1hZ25pdHVkZTtcbiAgICAgIGhpc3RvZ3JhbVtiMl0gKz0gdzIgKiBtYWduaXR1ZGU7XG4gICAgfVxuICB9XG4gIC8vY29uc29sZS5sb2coXCJjb3JyZWN0IGhpc3RvZ3JhbXNcIiwgSlNPTi5zdHJpbmdpZnkoaGlzdG9ncmFtKSk7XG5cbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5ERUJVRykge1xuICAgIGNvbnN0IG8gPSB3aW5kb3cuZGVidWdDb250ZW50Lm9yaWVudGF0aW9uQ29tcHV0ZVt3aW5kb3cuZGVidWcua2V5ZnJhbWVJbmRleF1bd2luZG93LmRlYnVnLm9yaWVudGF0aW9uQ29tcHV0ZUluZGV4XTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhpc3RvZ3JhbS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKE1hdGguYWJzKG8uaGlzdG9ncmFtc1tpXSAtIGhpc3RvZ3JhbVtpXSkgPiAwLjAwMSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIklOQ09SUkVDVCBoaXN0b2dyYW1cIiwgaSwgd2luZG93LmRlYnVnLm9yaWVudGF0aW9uQ29tcHV0ZUluZGV4LCBKU09OLnN0cmluZ2lmeShvLmhpc3RvZ3JhbXMpLCBKU09OLnN0cmluZ2lmeShoaXN0b2dyYW0pKTtcbiAgICAgICAgY29uc29sZS5sb2cobywgJ3ZzJywge3gsIHksIHNpZ21hLCBvY3RhdmUgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vY29uc29sZS5sb2coXCJvcmk6IFwiLCB4LCB5LCBvY3RhdmUsIHNjYWxlLCBnd1NpZ21hLCBnd1NjYWxlLCByYWRpdXMsIHJhZGl1czIsIEpTT04uc3RyaW5naWZ5KGhpc3RvZ3JhbSkpO1xuXG4gIC8vIFRoZSBvcmllbnRhdGlvbiBoaXN0b2dyYW0gaXMgc21vb3RoZWQgd2l0aCBhIEdhdXNzaWFuXG4gIC8vIHNpZ21hPTFcbiAgY29uc3Qga2VybmVsID0gWzAuMjc0MDY4NjE5MDYxMTk3LCAwLjQ1MTg2Mjc2MTg3NzYwNiwgMC4yNzQwNjg2MTkwNjExOTddO1xuICBmb3IobGV0IGkgPSAwOyBpIDwgT1JJRU5UQVRJT05fU01PT1RISU5HX0lURVJBVElPTlM7IGkrKykge1xuICAgIGNvbnN0IG9sZCA9IFtdO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgaGlzdG9ncmFtLmxlbmd0aDsgaisrKSB7XG4gICAgICBvbGRbal0gPSBoaXN0b2dyYW1bal07XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBoaXN0b2dyYW0ubGVuZ3RoOyBqKyspIHtcbiAgICAgIGhpc3RvZ3JhbVtqXSA9IGtlcm5lbFswXSAqIG9sZFsoaiAtIDEgKyBoaXN0b2dyYW0ubGVuZ3RoKSAlIGhpc3RvZ3JhbS5sZW5ndGhdXG4gICAgICAgICAgICAgICAgICAgICsga2VybmVsWzFdICogb2xkW2pdXG4gICAgICAgICAgICAgICAgICAgICsga2VybmVsWzJdICogb2xkWyhqKzEpICUgaGlzdG9ncmFtLmxlbmd0aF07XG4gICAgfVxuICB9XG5cbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5ERUJVRykge1xuICAgIGNvbnN0IG8gPSB3aW5kb3cuZGVidWdDb250ZW50Lm9yaWVudGF0aW9uQ29tcHV0ZVt3aW5kb3cuZGVidWcua2V5ZnJhbWVJbmRleF1bd2luZG93LmRlYnVnLm9yaWVudGF0aW9uQ29tcHV0ZUluZGV4XTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhpc3RvZ3JhbS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKE1hdGguYWJzKG8uc21vb3RoZWRIaXN0b2dyYW1zW2ldIC0gaGlzdG9ncmFtW2ldKSA+IDAuMDAxKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiSU5DT1JSRUNUIHNtb290aGVkIGhpc3RvZ3JhbVwiLCBpLCB3aW5kb3cuZGVidWcub3JpZW50YXRpb25Db21wdXRlSW5kZXgsIEpTT04uc3RyaW5naWZ5KG8uc21vb3RoZWRIaXN0b2dyYW1zKSwgSlNPTi5zdHJpbmdpZnkoaGlzdG9ncmFtKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIEZpbmQgdGhlIHBlYWsgb2YgdGhlIGhpc3RvZ3JhbS5cbiAgbGV0IG1heEhlaWdodCA9IDA7XG4gIGZvcihsZXQgaSA9IDA7IGkgPCBPUklFTlRBVElPTl9OVU1fQklOUzsgaSsrKSB7XG4gICAgaWYoaGlzdG9ncmFtW2ldID4gbWF4SGVpZ2h0KSB7XG4gICAgICBtYXhIZWlnaHQgPSBoaXN0b2dyYW1baV07XG4gICAgfVxuICB9XG5cbiAgaWYgKG1heEhlaWdodCA9PT0gMCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIC8vIEZpbmQgYWxsIHRoZSBwZWFrcy5cbiAgY29uc3QgYW5nbGVzID0gW107XG4gIGZvcihsZXQgaSA9IDA7IGkgPCBPUklFTlRBVElPTl9OVU1fQklOUzsgaSsrKSB7XG4gICAgY29uc3QgcHJldiA9IChpIC0gMSArIGhpc3RvZ3JhbS5sZW5ndGgpICUgaGlzdG9ncmFtLmxlbmd0aDtcbiAgICBjb25zdCBuZXh0ID0gKGkgKyAxKSAlIGhpc3RvZ3JhbS5sZW5ndGg7XG5cbiAgICAvLyBhZGQgMC4wMDAxIGluIGNvbXBhcmlzb24gdG8gYXZvaWQgdG9vIHNlbnNpdGl2ZSB0byByb3VuZGluZyBwcmVjaXNpb25cbiAgICBpZiAoaGlzdG9ncmFtW2ldID4gT1JJRU5UQVRJT05fUEVBS19USFJFU0hPTEQgKiBtYXhIZWlnaHQgJiYgKGhpc3RvZ3JhbVtpXSA+IGhpc3RvZ3JhbVtwcmV2XSArIDAuMDAwMSkgJiYgKGhpc3RvZ3JhbVtpXSA+IGhpc3RvZ3JhbVtuZXh0XSArIDAuMDAwMSkpIHtcbiAgICAgIC8vIFRoZSBkZWZhdWx0IHN1Yi1waXhlbCBiaW4gbG9jYXRpb24gaXMgdGhlIGRpc2NyZXRlIGxvY2F0aW9uIGlmIHRoZSBxdWFkcmF0aWMgZml0dGluZyBmYWlscy5cbiAgICAgIGxldCBmYmluID0gaTtcblxuICAgICAgY29uc3QgcmV0ID0gX3F1YWRyYXRpYzNQb2ludHMoe1xuICAgICAgICBwMTogW2ktMSwgaGlzdG9ncmFtW3ByZXZdXSxcbiAgICAgICAgcDI6IFtpLCBoaXN0b2dyYW1baV1dLFxuICAgICAgICBwMzogW2krMSwgaGlzdG9ncmFtW25leHRdXVxuICAgICAgfSk7XG5cbiAgICAgIGlmIChyZXQgIT09IG51bGwpIHtcbiAgICAgICAgY29uc3Qge0EsIEIsIEN9ID0gcmV0O1xuXG4gICAgICAgIC8vIEZpbmQgdGhlIGNyaXRpY2FsIHBvaW50IG9mIGEgcXVhZHJhdGljLiB5ID0gQSp4XjIgKyBCKnggKyBDXG4gICAgICAgIGlmIChBICE9IDApIHtcbiAgICAgICAgICBmYmluID0gLUIgLyAoMiAqIEEpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuREVCVUcpIHtcbiAgICAgICAgY29uc3QgbyA9IHdpbmRvdy5kZWJ1Z0NvbnRlbnQub3JpZW50YXRpb25Db21wdXRlW3dpbmRvdy5kZWJ1Zy5rZXlmcmFtZUluZGV4XVt3aW5kb3cuZGVidWcub3JpZW50YXRpb25Db21wdXRlSW5kZXhdO1xuICAgICAgICBpZiAoIXdpbmRvdy5jbXAoZmJpbiwgby5oaXN0ZmJpbnNbaV0pKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJJTkNPUlJFQ1Qgb3JpZW50YXRpb24gZmJpblwiLCBpLCBmYmluLCAndnMnLCBvLmhpc3RmYmluc1tpXSwgby5oaXN0QXNbaV0sIG8uaGlzdEJzW2ldLCBvLmhpc3RDc1tpXSk7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJoaXN0XCIsIGhpc3RvZ3JhbVtpXSwgaGlzdG9ncmFtW3ByZXZdLCBoaXN0b2dyYW1bbmV4dF0sIE9SSUVOVEFUSU9OX1BFQUtfVEhSRVNIT0xEICogbWF4SGVpZ2h0KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsZXQgYW4gPSAgMi4wICogTWF0aC5QSSAqICgoZmJpbiArIDAuNSArIE9SSUVOVEFUSU9OX05VTV9CSU5TKSAvIE9SSUVOVEFUSU9OX05VTV9CSU5TKTtcbiAgICAgIHdoaWxlIChhbiA+IDIuMCAqIE1hdGguUEkpIHsgLy8gbW9kdWxhXG4gICAgICAgIGFuIC09IDIuMCAqIE1hdGguUEk7XG4gICAgICB9XG4gICAgICBhbmdsZXMucHVzaChhbik7XG4gICAgfVxuICB9XG4gIHJldHVybiBhbmdsZXM7XG59XG5cblxuXG4vKipcbiAqIEZpdCBhIHF1YXRyYXRpYyB0byAzIHBvaW50cy4gVGhlIHN5c3RlbSBvZiBlcXVhdGlvbnMgaXM6XG4gKlxuICogeTAgPSBBKngwXjIgKyBCKngwICsgQ1xuICogeTEgPSBBKngxXjIgKyBCKngxICsgQ1xuICogeTIgPSBBKngyXjIgKyBCKngyICsgQ1xuICpcbiAqIFRoaXMgc3lzdGVtIG9mIGVxdWF0aW9ucyBpcyBzb2x2ZWQgZm9yIEEsQixDLlxuICovXG5jb25zdCBfcXVhZHJhdGljM1BvaW50cyA9IChvcHRpb25zKSA9PiB7XG4gIGNvbnN0IHtwMSwgcDIsIHAzfSA9IG9wdGlvbnM7XG4gIGNvbnN0IGQxID0gKHAzWzBdLXAyWzBdKSoocDNbMF0tcDFbMF0pO1xuICBjb25zdCBkMiA9IChwMVswXS1wMlswXSkqKHAzWzBdLXAxWzBdKTtcbiAgY29uc3QgZDMgPSBwMVswXS1wMlswXTtcblxuICAvLyBJZiBhbnkgb2YgdGhlIGRlbm9taW5hdG9ycyBhcmUgemVybyB0aGVuIHJldHVybiBGQUxTRS5cbiAgaWYgKGQxID09IDAgfHwgZDIgPT0gMCB8fCBkMyA9PSAwKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCBhID0gcDFbMF0qcDFbMF07XG4gIGNvbnN0IGIgPSBwMlswXSpwMlswXTtcblxuICAvLyBTb2x2ZSBmb3IgdGhlIGNvZWZmaWNpZW50cyBBLEIsQ1xuICBjb25zdCBBID0gKChwM1sxXS1wMlsxXSkvZDEpLSgocDFbMV0tcDJbMV0pL2QyKTtcbiAgY29uc3QgQiA9ICgocDFbMV0tcDJbMV0pKyhBKihiLWEpKSkvZDM7XG4gIGNvbnN0IEMgPSBwMVsxXS0oQSphKS0oQipwMVswXSk7XG5cbiAgcmV0dXJuIHtBLCBCLCBDfTtcbn1cblxuLyoqXG4gKiAwLjAxJSBlcnJvciBhdCAxLjAzMFxuICogMC4xMCUgZXJyb3IgYXQgMS41MjBcbiAqIDEuMDAlIGVycm9yIGF0IDIuMzMwXG4gKiA1LjAwJSBlcnJvciBhdCAzLjI4NVxuICovXG5jb25zdCBfZmFzdEV4cDYgPSAob3B0aW9ucykgPT4ge1xuICBjb25zdCB7eH0gPSBvcHRpb25zO1xuICByZXR1cm4gKDcyMCt4Kig3MjAreCooMzYwK3gqKDEyMCt4KigzMCt4Kig2K3gpKSkpKSkqMC4wMDEzODg4ODg4O1xufVxuXG5jb25zdCBfY29tcHV0ZUdyYWRpZW50ID0gKHB5cmFtaWQsIHB5cmFtaWRJbWFnZUluZGV4LCBqLCBpKSA9PiB7XG4gIC8vIGNhY2hlIGNvbXB1dGF0aW9uP1xuICBjb25zdCBpbWFnZSA9IHB5cmFtaWQuaW1hZ2VzW3B5cmFtaWRJbWFnZUluZGV4XTtcbiAgY29uc3QgcHJldkogPSBqID4gMD8gaiAtIDE6IGo7XG4gIGNvbnN0IG5leHRKID0gaiA8IGltYWdlLmhlaWdodCAtIDE/IGogKyAxOiBqO1xuICBjb25zdCBwcmV2SSA9IGkgPiAwPyBpIC0gMTogaTtcbiAgY29uc3QgbmV4dEkgPSBpIDwgaW1hZ2Uud2lkdGggLSAxPyBpICsgMTogaTtcbiAgY29uc3QgZHggPSBpbWFnZS5kYXRhW2ogKiBpbWFnZS53aWR0aCArIG5leHRJXSAtIGltYWdlLmRhdGFbaiAqIGltYWdlLndpZHRoICsgcHJldkldO1xuICBjb25zdCBkeSA9IGltYWdlLmRhdGFbbmV4dEogKiBpbWFnZS53aWR0aCArIGldIC0gaW1hZ2UuZGF0YVtwcmV2SiAqIGltYWdlLndpZHRoICsgaV07XG4gIGNvbnN0IGFuZ2xlID0gTWF0aC5hdGFuMihkeSwgZHgpICsgTWF0aC5QSTtcbiAgY29uc3QgbWFnID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgcmV0dXJuIHthbmdsZSwgbWFnfTtcbn1cblxuLy8gZGl2aWRlIHRoZSBpbWFnZSBpbnRvIFBSVU5FX0ZFQVRVUkVTX05VTV9CVUNLRVRTICogUFJVTkVfRkVBVFVSRVNfTlVNX0JVQ0tFVFMgYXJlYVxuLy8gaW4gZWFjaCBhcmVhLCBzb3J0IGZlYXR1cmUgcG9pbnRzIGJ5IHNjb3JlLCBhbmQgcmV0dXJuIHRoZSB0b3AgTlxuY29uc3QgX3BydW5lRmVhdHVyZXMgPSAob3B0aW9ucykgPT4ge1xuICBjb25zdCB7ZmVhdHVyZVBvaW50cywgd2lkdGgsIGhlaWdodH0gPSBvcHRpb25zO1xuXG4gIC8vIE5vdGU6IHNlZW1zIG5vdCB0byBiZSBhIGNvbnNpc3RlbnQgaW1wbGVtZW50YXRpb24uIE1pZ2h0IG5lZWQgdG8gcmVtb3ZlIHRoaXMgbGluZVxuICAvLyAgIFRoZSBmZWF0dXJlIHBvaW50cyBhcmUgcHJ1bmUgcGVyIGJ1Y2tldCwgZS5nLiBpZiA1MDEgcG9pbnRzIGluIGJ1Y2tldCAxLCB0dXJucyBvdXQgb25seSA1IHZhbGlkXG4gIC8vICAgU2ltaWxhcmx5LCBpZiA1MDAgcG9pbnRzIGFsbCBpbiBidWNrZXQgMSwgdGhleSBhbGwgcGFzc2VkIGJlY2F1c2UgZ2xvYmFsbHkgPD0gbWF4TnVtRmVhdHVyZVBvaW50c1xuICBpZiAoZmVhdHVyZVBvaW50cy5sZW5ndGggPD0gTUFYX0ZFQVRVUkVfUE9JTlRTKSByZXR1cm4gZmVhdHVyZVBvaW50cztcblxuICBjb25zdCByZXN1bHRGZWF0dXJlUG9pbnRzID0gW107XG5cbiAgY29uc3QgbkJ1Y2tldHMgPSBQUlVORV9GRUFUVVJFU19OVU1fQlVDS0VUUyAqIFBSVU5FX0ZFQVRVUkVTX05VTV9CVUNLRVRTO1xuICBjb25zdCBuUG9pbnRzUGVyQnVja2V0cyA9IE1BWF9GRUFUVVJFX1BPSU5UUyAvIG5CdWNrZXRzO1xuXG4gIGNvbnN0IGJ1Y2tldHMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBuQnVja2V0czsgaSsrKSB7XG4gICAgYnVja2V0cy5wdXNoKFtdKTtcbiAgfVxuXG4gIGNvbnN0IGR4ID0gTWF0aC5jZWlsKDEuMCAqIHdpZHRoIC8gUFJVTkVfRkVBVFVSRVNfTlVNX0JVQ0tFVFMpO1xuICBjb25zdCBkeSA9IE1hdGguY2VpbCgxLjAgKiBoZWlnaHQgLyBQUlVORV9GRUFUVVJFU19OVU1fQlVDS0VUUyk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmZWF0dXJlUG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgYnVja2V0WCA9IE1hdGguZmxvb3IoZmVhdHVyZVBvaW50c1tpXS54IC8gZHgpO1xuICAgIGNvbnN0IGJ1Y2tldFkgPSBNYXRoLmZsb29yKGZlYXR1cmVQb2ludHNbaV0ueSAvIGR5KTtcblxuICAgIGNvbnN0IGJ1Y2tldEluZGV4ID0gYnVja2V0WSAqIFBSVU5FX0ZFQVRVUkVTX05VTV9CVUNLRVRTICsgYnVja2V0WDtcbiAgICBidWNrZXRzW2J1Y2tldEluZGV4XS5wdXNoKGZlYXR1cmVQb2ludHNbaV0pO1xuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBQUlVORV9GRUFUVVJFU19OVU1fQlVDS0VUUzsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBQUlVORV9GRUFUVVJFU19OVU1fQlVDS0VUUzsgaisrKSB7XG4gICAgICBjb25zdCBidWNrZXRJbmRleCA9IGogKiBQUlVORV9GRUFUVVJFU19OVU1fQlVDS0VUUyArIGk7XG4gICAgICBjb25zdCBidWNrZXQgPSBidWNrZXRzW2J1Y2tldEluZGV4XTtcbiAgICAgIGNvbnN0IG5TZWxlY3RlZCA9IE1hdGgubWluKGJ1Y2tldC5sZW5ndGgsIG5Qb2ludHNQZXJCdWNrZXRzKTtcblxuICAgICAgaWYgKGJ1Y2tldC5sZW5ndGggPiBuU2VsZWN0ZWQpIHtcbiAgICAgICAgYnVja2V0LnNvcnQoKGYxLCBmMikgPT4ge1xuICAgICAgICAgIHJldHVybiBNYXRoLmFicyhmMS5zY29yZSkgPiBNYXRoLmFicyhmMi5zY29yZSk/IC0xOiAxO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgblNlbGVjdGVkOyBrKyspIHtcbiAgICAgICAgcmVzdWx0RmVhdHVyZVBvaW50cy5wdXNoKGJ1Y2tldFtrXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHRGZWF0dXJlUG9pbnRzO1xufVxuXG4vLyBzb2x2ZSB4ID0gQWIsIHdoZXJlIEEgaXMgc3ltbWV0cmljXG4vLyBbeDBdICAgW0EwIEExIEEyXSBbYjBdXG4vLyBbeDFdID0gW0EzIEE0IEE1XSBbYjFdXG4vLyBbeDJdICAgW0E2IEE3IEE4XSBbYjJdXG5jb25zdCBfc29sdmVTeW1tZXRyaWMzMyA9IChvcHRpb25zKSA9PiB7XG4gIGNvbnN0IHtBLCBifSA9IG9wdGlvbnM7XG5cbiAgY29uc3QgZGV0ID0gQVswXSAqIEFbNF0gKiBBWzhdXG4gICAgICAgICAgICAtIEFbMF0gKiBBWzVdICogQVs1XVxuICAgICAgICAgICAgLSBBWzRdICogQVsyXSAqIEFbMl1cbiAgICAgICAgICAgIC0gQVs4XSAqIEFbMV0gKiBBWzFdXG4gICAgICAgICAgICArIDIgKiBBWzFdICogQVsyXSAqIEFbNV07XG5cbiAgaWYgKCBNYXRoLmFicyhkZXQpIDwgMC4wMDAwMDAxKSByZXR1cm4gbnVsbDsgLy8gZGV0ZXJtaW5hbnQgdW5kZWZpbmVkLiBubyBzb2x1dGlvblxuXG4gIGNvbnN0IEIgPSBbXTsgLy8gaW52ZXJzZSBvZiBBXG4gIEJbMF0gPSBBWzRdICogQVs4XSAtIEFbNV0gKiBBWzddO1xuICBCWzFdID0gQVsyXSAqIEFbN10gLSBBWzFdICogQVs4XTtcbiAgQlsyXSA9IEFbMV0gKiBBWzVdIC0gQVsyXSAqIEFbNF07XG4gIC8vQlszXSA9IEFbNV0gKiBBWzZdIC0gQVszXSAqIEFbOF07XG4gIEJbM10gPSBCWzFdO1xuICBCWzRdID0gQVswXSAqIEFbOF0gLSBBWzJdICogQVs2XTtcbiAgQls1XSA9IEFbMl0gKiBBWzNdIC0gQVswXSAqIEFbNV07XG4gIC8vQls2XSA9IEFbM10gKiBBWzddIC0gQVs0XSAqIEFbNl07XG4gIC8vQls3XSA9IEFbMV0gKiBBWzZdIC0gQVswXSAqIEFbN107XG4gIEJbNl0gPSBCWzJdO1xuICBCWzddID0gQls1XTtcbiAgQls4XSA9IEFbMF0gKiBBWzRdIC0gQVsxXSAqIEFbM107XG5cbiAgY29uc3QgeCA9IFtdO1xuICB4WzBdID0gQlswXSAqIGJbMF0gKyBCWzFdICogYlsxXSArIEJbMl0gKiBiWzJdO1xuICB4WzFdID0gQlszXSAqIGJbMF0gKyBCWzRdICogYlsxXSArIEJbNV0gKiBiWzJdO1xuICB4WzJdID0gQls2XSAqIGJbMF0gKyBCWzddICogYlsxXSArIEJbOF0gKiBiWzJdO1xuXG4gIHhbMF0gPSB4WzBdIC8gZGV0O1xuICB4WzFdID0geFsxXSAvIGRldDtcbiAgeFsyXSA9IHhbMl0gLyBkZXQ7XG5cbiAgcmV0dXJuIHg7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBEZXRlY3RvclxufVxuIiwiLy8gY29tcHV0ZSBEaWZmZXJlbmNlLW9mLUdhdXNzaWFuIHB5cmFtaWRzIGZyb20gZ2F1c3NpYW4gcHlyYW1pZHNcbi8vXG4vLyBweXJhbWlkID0ge1xuLy8gICBudW1PY3RhdmVzLFxuLy8gICBudW1TY2FsZXNQZXJPY3RhdmVzLFxuLy8gICBpbWFnZXM6IFt7ZGF0YSwgd2lkdGgsIGhlaWdodH0sIHt9LCB7fV0gLy8gaW1hZ2UgYXQgb2N0YXZlIGkgYW5kIHNjYWxlIGogPSBpbWFnZXNbaSAqIG51bVNjYWxlc1Blck9jdGF2ZXMgKyBqXVxuLy8gfVxuXG5jb25zdCBidWlsZCA9ICh7Z2F1c3NpYW5QeXJhbWlkfSkgPT4ge1xuICBjb25zdCBudW1PY3RhdmVzID0gZ2F1c3NpYW5QeXJhbWlkLm51bU9jdGF2ZXM7XG4gIGNvbnN0IG51bVNjYWxlc1Blck9jdGF2ZXMgPSBnYXVzc2lhblB5cmFtaWQubnVtU2NhbGVzUGVyT2N0YXZlcyAtIDE7XG5cbiAgY29uc3QgcHlyYW1pZEltYWdlcyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG51bU9jdGF2ZXM7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgbnVtU2NhbGVzUGVyT2N0YXZlczsgaisrKSB7XG4gICAgICBjb25zdCBpbWFnZTEgPSBnYXVzc2lhblB5cmFtaWQuaW1hZ2VzW2kgKiBnYXVzc2lhblB5cmFtaWQubnVtU2NhbGVzUGVyT2N0YXZlcyArIGpdO1xuICAgICAgY29uc3QgaW1hZ2UyID0gZ2F1c3NpYW5QeXJhbWlkLmltYWdlc1tpICogZ2F1c3NpYW5QeXJhbWlkLm51bVNjYWxlc1Blck9jdGF2ZXMgKyBqICsgMV07XG4gICAgICBweXJhbWlkSW1hZ2VzLnB1c2goICBfZGlmZmVyZW5jZUltYWdlQmlub21pYWwoe2ltYWdlMSwgaW1hZ2UyfSkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4ge1xuICAgIG51bU9jdGF2ZXMsXG4gICAgbnVtU2NhbGVzUGVyT2N0YXZlcyxcbiAgICBpbWFnZXM6IHB5cmFtaWRJbWFnZXNcbiAgfVxufVxuXG5jb25zdCBfZGlmZmVyZW5jZUltYWdlQmlub21pYWwgPSAoe2ltYWdlMSwgaW1hZ2UyfSkgPT4ge1xuICBpZiAoaW1hZ2UxLmRhdGEubGVuZ3RoICE9PSBpbWFnZTIuZGF0YS5sZW5ndGgpIHtcbiAgICB0aHJvdyBcImltYWdlIGxlbmd0aCBkb2Vzbid0IG1hdGNoXCI7XG4gIH1cblxuICBjb25zdCBkYXRhID0gbmV3IEZsb2F0MzJBcnJheShpbWFnZTEuZGF0YS5sZW5ndGgpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGltYWdlMS5kYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgZGF0YVtpXSA9IGltYWdlMS5kYXRhW2ldIC0gaW1hZ2UyLmRhdGFbaV07XG4gIH1cbiAgcmV0dXJuIHtkYXRhOiBkYXRhLCB3aWR0aDogaW1hZ2UxLndpZHRoLCBoZWlnaHQ6IGltYWdlMS5oZWlnaHR9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYnVpbGRcbn07XG4iLCJjb25zdCBFWFBBTlNJT05fRkFDVE9SID0gNztcblxuLy8gMzcgcG9pbnRzID0gNiByaW5ncyB4IDYgcG9pbnRzIHBlciByaW5nICsgMSBjZW50ZXJcbmNvbnN0IEZSRUFLX1JJTkdTID0gW1xuICAvLyByaW5nIDVcbiAge1xuICAgIHNpZ21hOiAwLjU1MDAwMCxcbiAgICBwb2ludHM6IFtcbiAgICAgIFstMS4wMDAwMDAsIDAuMDAwMDAwXSxcbiAgICAgIFstMC41MDAwMDAsIC0wLjg2NjAyNV0sXG4gICAgICBbMC41MDAwMDAsIC0wLjg2NjAyNV0sXG4gICAgICBbMS4wMDAwMDAsIC0wLjAwMDAwMF0sXG4gICAgICBbMC41MDAwMDAsIDAuODY2MDI1XSxcbiAgICAgIFstMC41MDAwMDAsIDAuODY2MDI1XVxuICAgIF1cbiAgfSxcbiAgLy8gcmluZyA0XG4gIHtcbiAgICBzaWdtYTogMC40NzUwMDAsXG4gICAgcG9pbnRzOiBbXG4gICAgICBbMC4wMDAwMDAsIDAuOTMwOTY5XSxcbiAgICAgIFstMC44MDYyNDMsIDAuNDY1NDg1XSxcbiAgICAgIFstMC44MDYyNDMsIC0wLjQ2NTQ4NV0sXG4gICAgICBbLTAuMDAwMDAwLCAtMC45MzA5NjldLFxuICAgICAgWzAuODA2MjQzLCAtMC40NjU0ODVdLFxuICAgICAgWzAuODA2MjQzLCAwLjQ2NTQ4NV1cbiAgICBdXG4gIH0sXG4gIC8vIHJpbmcgM1xuICB7XG4gICAgc2lnbWE6IDAuNDAwMDAwLFxuICAgIHBvaW50czogW1xuICAgICAgWzAuODQ3MzA2LCAtMC4wMDAwMDBdLFxuICAgICAgWzAuNDIzNjUzLCAwLjczMzc4OV0sXG4gICAgICBbLTAuNDIzNjUzLCAwLjczMzc4OV0sXG4gICAgICBbLTAuODQ3MzA2LCAwLjAwMDAwMF0sXG4gICAgICBbLTAuNDIzNjUzLCAtMC43MzM3ODldLFxuICAgICAgWzAuNDIzNjUzLCAtMC43MzM3ODldXG4gICAgXVxuICB9LFxuICAvLyByaW5nIDJcbiAge1xuICAgIHNpZ21hOiAwLjMyNTAwMCxcbiAgICBwb2ludHM6IFtcbiAgICAgIFstMC4wMDAwMDAsIC0wLjc0MTA5NF0sXG4gICAgICBbMC42NDE4MDYsIC0wLjM3MDU0N10sXG4gICAgICBbMC42NDE4MDYsIDAuMzcwNTQ3XSxcbiAgICAgIFswLjAwMDAwMCwgMC43NDEwOTRdLFxuICAgICAgWy0wLjY0MTgwNiwgMC4zNzA1NDddLFxuICAgICAgWy0wLjY0MTgwNiwgLTAuMzcwNTQ3XVxuICAgIF1cbiAgfSxcbiAgLy8gcmluZyAxXG4gIHtcbiAgICBzaWdtYTogMC4yNTAwMDAsXG4gICAgcG9pbnRzOiBbXG4gICAgICBbLTAuNTk1NTAyLCAwLjAwMDAwMF0sXG4gICAgICBbLTAuMjk3NzUxLCAtMC41MTU3MjBdLFxuICAgICAgWzAuMjk3NzUxLCAtMC41MTU3MjBdLFxuICAgICAgWzAuNTk1NTAyLCAtMC4wMDAwMDBdLFxuICAgICAgWzAuMjk3NzUxLCAwLjUxNTcyMF0sXG4gICAgICBbLTAuMjk3NzUxLCAwLjUxNTcyMF1cbiAgICBdXG4gIH0sXG4gIC8vIHJpbmcgMFxuICB7XG4gICAgc2lnbWE6IDAuMTc1MDAwLFxuICAgIHBvaW50czogW1xuICAgICAgWzAuMDAwMDAwLCAwLjM2Mjc4M10sXG4gICAgICBbLTAuMzE0MTc5LCAwLjE4MTM5MV0sXG4gICAgICBbLTAuMzE0MTc5LCAtMC4xODEzOTFdLFxuICAgICAgWy0wLjAwMDAwMCwgLTAuMzYyNzgzXSxcbiAgICAgIFswLjMxNDE3OSwgLTAuMTgxMzkxXSxcbiAgICAgIFswLjMxNDE3OSwgMC4xODEzOTFdXG4gICAgXVxuICB9LFxuICAvLyBjZW50ZXJcbiAge1xuICAgIHNpZ21hOiAwLjEwMDAwMCxcbiAgICBwb2ludHM6IFtcbiAgICAgIFswLCAwXVxuICAgIF1cbiAgfVxuXVxuXG4vLyBweXJhbWlkOiBnYXVzc2lhbiBweXJhbWlkXG5jb25zdCBleHRyYWN0ID0gKG9wdGlvbnMpID0+IHtcbiAgY29uc3Qge3B5cmFtaWQsIHBvaW50c30gPSBvcHRpb25zO1xuXG4gIGNvbnN0IG1LID0gTWF0aC5wb3coMiwgMS4wIC8gKHB5cmFtaWQubnVtU2NhbGVzUGVyT2N0YXZlcy0xKSk7XG4gIGNvbnN0IG9uZU92ZXJMb2dLID0gMS4wIC8gTWF0aC5sb2cobUspO1xuXG4gIGNvbnN0IGRlc2NyaXB0b3JzID0gW107XG4gIGZvciAobGV0IHAgPSAwOyBwIDwgcG9pbnRzLmxlbmd0aDsgcCsrKSB7XG5cbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LkRFQlVHKSB7XG4gICAgICBpZiAod2luZG93LmRlYnVnRnJlYWtTYW1wbGVJbmRleCA9PT0gdW5kZWZpbmVkKSB3aW5kb3cuZGVidWdGcmVha1NhbXBsZUluZGV4ID0gLTE7XG4gICAgICB3aW5kb3cuZGVidWdGcmVha1NhbXBsZUluZGV4ICs9IDE7XG4gICAgfVxuXG4gICAgY29uc3QgcG9pbnQgPSBwb2ludHNbcF07XG5cbiAgICAvLyBFbnN1cmUgdGhlIHNjYWxlIG9mIHRoZSBzaW1pbGFyaXR5IHRyYW5zZm9ybSBpcyBhdCBsZWFzdCBcIjFcIi5cbiAgICBjb25zdCB0cmFuc2Zvcm1TY2FsZSA9IE1hdGgubWF4KDEsIHBvaW50LnNpZ21hICogRVhQQU5TSU9OX0ZBQ1RPUik7XG5cbiAgICAvLyBUcmFuc2Zvcm1hdGlvbiBmcm9tIGNhbm9uaWNhbCB0ZXN0IGxvY2F0aW9ucyB0byBpbWFnZVxuICAgIGNvbnN0IFMgPSBfc2ltaWxhcml0eU1hdHJpeCh7c2NhbGU6IHRyYW5zZm9ybVNjYWxlLCBhbmdsZTogcG9pbnQuYW5nbGUsIHg6IHBvaW50LngsIHk6IHBvaW50Lnl9KTtcblxuICAgIC8vY29uc29sZS5sb2coXCJTOiBcIiwgcG9pbnQuc2NhbGUsIHBvaW50LmFuZ2xlLCBTKTtcblxuICAgIGNvbnN0IHNhbXBsZXMgPSBbXTtcbiAgICBmb3IgKGxldCByID0gMDsgciA8IEZSRUFLX1JJTkdTLmxlbmd0aDsgcisrKSB7XG4gICAgICBjb25zdCBzaWdtYSA9IHRyYW5zZm9ybVNjYWxlICogRlJFQUtfUklOR1Nbcl0uc2lnbWE7XG5cbiAgICAgIGxldCBvY3RhdmUgPSBNYXRoLmZsb29yKE1hdGgubG9nMihzaWdtYSkpO1xuICAgICAgY29uc3QgZnNjYWxlID0gTWF0aC5sb2coc2lnbWEgLyBNYXRoLnBvdygyLCBvY3RhdmUpKSAqIG9uZU92ZXJMb2dLO1xuICAgICAgbGV0IHNjYWxlID0gTWF0aC5yb3VuZChmc2NhbGUpO1xuXG4gICAgICAvLyBzZ2ltYSBvZiBsYXN0IHNjYWxlID0gIHNpZ21hIG9mIHRoZSBmaXJzdCBzY2FsZSBpbiBuZXh0IG9jdGF2ZVxuICAgICAgLy8gcHJlZmVyIGNvYXJzZXIgb2N0YXZlcyBmb3IgZWZmaWNpZW5jeVxuICAgICAgaWYgKHNjYWxlID09PSBweXJhbWlkLm51bVNjYWxlc1Blck9jdGF2ZXMgLSAxKSB7XG4gICAgICAgIG9jdGF2ZSA9IG9jdGF2ZSArIDE7XG4gICAgICAgIHNjYWxlID0gMDtcbiAgICAgIH1cbiAgICAgIC8vIGNsaXAgb2N0YXZlIGFuZCBzY2FsZVxuICAgICAgaWYgKG9jdGF2ZSA8IDApIHtcbiAgICAgICAgb2N0YXZlID0gMDtcbiAgICAgICAgc2NhbGUgPSAwO1xuICAgICAgfVxuICAgICAgaWYgKG9jdGF2ZSA+PSBweXJhbWlkLm51bU9jdGF2ZXMpIHtcbiAgICAgICAgb2N0YXZlID0gcHlyYW1pZC5udW1PY3RhdmVzIC0gMTtcbiAgICAgICAgc2NhbGUgPSBweXJhbWlkLm51bVNjYWxlc1Blck9jdGF2ZXMgLSAxO1xuICAgICAgfVxuXG4gICAgICAvLyBmb3IgZG93bnNhbXBsZSBwb2ludFxuICAgICAgY29uc3QgaW1hZ2UgPSBweXJhbWlkLmltYWdlc1tvY3RhdmUgKiBweXJhbWlkLm51bVNjYWxlc1Blck9jdGF2ZXMgKyBzY2FsZV07XG4gICAgICBjb25zdCBhID0gMS4wIC8gKE1hdGgucG93KDIsIG9jdGF2ZSkpO1xuICAgICAgY29uc3QgYiA9IDAuNSAqIGEgLSAwLjU7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgRlJFQUtfUklOR1Nbcl0ucG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHBvaW50ID0gRlJFQUtfUklOR1Nbcl0ucG9pbnRzW2ldO1xuICAgICAgICBjb25zdCB4ID0gU1swXSAqIHBvaW50WzBdICsgU1sxXSAqIHBvaW50WzFdICsgU1syXTtcbiAgICAgICAgY29uc3QgeSA9IFNbM10gKiBwb2ludFswXSArIFNbNF0gKiBwb2ludFsxXSArIFNbNV07XG5cbiAgICAgICAgbGV0IHhwID0geCAqIGEgKyBiOyAvLyB4IGluIG9jdGF2ZVxuICAgICAgICBsZXQgeXAgPSB5ICogYSArIGI7IC8vIHkgaW4gb2N0YXZlXG4gICAgICAgIC8vIGJpbGluZWFyIGludGVycG9sYXRpb25cbiAgICAgICAgeHAgPSBNYXRoLm1heCgwLCBNYXRoLm1pbih4cCwgaW1hZ2Uud2lkdGggLSAyKSk7XG4gICAgICAgIHlwID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oeXAsIGltYWdlLmhlaWdodCAtIDIpKTtcblxuICAgICAgICBjb25zdCB4MCA9IE1hdGguZmxvb3IoeHApO1xuICAgICAgICBjb25zdCB4MSA9IHgwICsgMTtcbiAgICAgICAgY29uc3QgeTAgPSBNYXRoLmZsb29yKHlwKTtcbiAgICAgICAgY29uc3QgeTEgPSB5MCArIDE7XG5cbiAgICAgICAgY29uc3QgdmFsdWUgPSAoeDEteHApICogKHkxLXlwKSAqIGltYWdlLmRhdGFbeTAgKiBpbWFnZS53aWR0aCArIHgwXVxuICAgICAgICAgICAgICAgICAgICArICh4cC14MCkgKiAoeTEteXApICogaW1hZ2UuZGF0YVt5MCAqIGltYWdlLndpZHRoICsgeDFdXG4gICAgICAgICAgICAgICAgICAgICsgKHgxLXhwKSAqICh5cC15MCkgKiBpbWFnZS5kYXRhW3kxICogaW1hZ2Uud2lkdGggKyB4MF1cbiAgICAgICAgICAgICAgICAgICAgKyAoeHAteDApICogKHlwLXkwKSAqIGltYWdlLmRhdGFbeTEgKiBpbWFnZS53aWR0aCArIHgxXTtcblxuICAgICAgICBzYW1wbGVzLnB1c2godmFsdWUpO1xuXG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuREVCVUcpIHtcbiAgICAgICAgICBpZiAod2luZG93LmRlYnVnLmtleWZyYW1lSW5kZXggPT09IDIgJiYgcCA9PT0gNDI0KSB7XG4gICAgICAgICAgICBjb25zdCBzYW1wbGVJbmRleCA9IHNhbXBsZXMubGVuZ3RoLTE7XG4gICAgICAgICAgICBjb25zdCBkU2FtcGxlcyA9IHdpbmRvdy5kZWJ1Z0NvbnRlbnQuZnJlYWtTYW1wbGVzW3dpbmRvdy5kZWJ1Z0ZyZWFrU2FtcGxlSW5kZXhdO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImZyZWFrIHNhbXBsZVwiLCB3aW5kb3cuZGVidWcua2V5ZnJhbWVJbmRleCwgc2FtcGxlSW5kZXgsIGRTYW1wbGVzW3NhbXBsZUluZGV4XSwge3hwLCB5cCwgdmFsdWV9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cblxuICAgIGNvbnN0IGRlc2MgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNhbXBsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSBpKzE7IGogPCBzYW1wbGVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIC8vIGF2b2lkIHRvbyBzZW5zdGl2ZSB0byByb3VuZGluZyBwcmVjaXNpb25cbiAgICAgICAgLy9kZXNjLnB1c2goc2FtcGxlc1tpXSA8IHNhbXBsZXNbal0pO1xuICAgICAgICBkZXNjLnB1c2goc2FtcGxlc1tpXSA8IHNhbXBsZXNbal0gKyAwLjAwMDEpO1xuXG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuREVCVUcpIHtcbiAgICAgICAgICAvL2lmICh3aW5kb3cuZGVidWcua2V5ZnJhbWVJbmRleCA9PT0gMiAmJiBwID09PSA0MjQpIHtcbiAgICAgICAgICAgIGlmIChpID09PSAwICYmIGogPT09IDEpIHdpbmRvdy5kZWJ1Z0NvbXBhcmVGcmVha0luZGV4ID0gMDtcbiAgICAgICAgICAgIGNvbnN0IGRDb21wYXJlID0gd2luZG93LmRlYnVnQ29udGVudC5jb21wYXJlRnJlYWtbd2luZG93LmRlYnVnRnJlYWtTYW1wbGVJbmRleF07XG4gICAgICAgICAgICBjb25zdCBkU2FtcGxlcyA9IHdpbmRvdy5kZWJ1Z0NvbnRlbnQuZnJlYWtTYW1wbGVzW3dpbmRvdy5kZWJ1Z0ZyZWFrU2FtcGxlSW5kZXhdO1xuICAgICAgICAgICAgaWYgKCEhZGVzY1tkZXNjLmxlbmd0aC0xXSAhPT0gISEgZENvbXBhcmVbd2luZG93LmRlYnVnQ29tcGFyZUZyZWFrSW5kZXhdKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSU5DT1JSRUNUIGZyZWFrIGNvbXBhcmVcIiwgaSwgaiwgZGVzY1tkZXNjLmxlbmd0aC0xXSwgJ3ZzJywgZENvbXBhcmVbd2luZG93LmRlYnVnQ29tcGFyZUZyZWFrSW5kZXhdKTtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coc2FtcGxlc1tpXSwgc2FtcGxlc1tqXSwgZFNhbXBsZXNbaV0sIGRTYW1wbGVzW2pdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdpbmRvdy5kZWJ1Z0NvbXBhcmVGcmVha0luZGV4ICs9IDE7XG4gICAgICAgICAgLy99XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBlbmNvZGUgZGVzY3JpcHRvcnMgaW4gYmluYXJ5IGZvcm1hdFxuICAgIC8vIDM3IHNhbXBsZXMgPSAxKzIrMysuLi4rMzYgPSA2NjYgY29tcGFyaXNvbnMgPSA2NjYgYml0c1xuICAgIC8vIGNlaWwoNjY2LzMyKSA9IDg0IG51bWJlcnMgKDMyYml0IG51bWJlcilcbiAgICBjb25zdCBkZXNjQml0ID0gW107XG4gICAgbGV0IHRlbXAgPSAwO1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZXNjLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoZGVzY1tpXSkgdGVtcCArPSAxO1xuICAgICAgY291bnQgKz0gMTtcbiAgICAgIGlmIChjb3VudCA9PT0gMzIpIHtcbiAgICAgICAgZGVzY0JpdC5wdXNoKHRlbXApO1xuICAgICAgICB0ZW1wID0gMDtcbiAgICAgICAgY291bnQgPSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gcHJvYmFibHkgY2FuIGp1c3QgZG8gdGVtcCA9IHRlbXAgKiAyXG4gICAgICAgIHRlbXAgPSAodGVtcCA8PCAxKSA+Pj4gMDsgLy8gPj4+IDAgdG8gbWFrZSBpdCB1bnNpZ25lZFxuICAgICAgfVxuICAgIH1cbiAgICBkZXNjQml0LnB1c2godGVtcCk7XG5cbiAgICBkZXNjcmlwdG9ycy5wdXNoKGRlc2NCaXQpO1xuICB9XG4gIHJldHVybiBkZXNjcmlwdG9ycztcbn1cblxuY29uc3QgX3NpbWlsYXJpdHlNYXRyaXggPSAob3B0aW9ucykgPT4ge1xuICBjb25zdCB7c2NhbGUsIGFuZ2xlLCB4LCB5fSA9IG9wdGlvbnM7XG4gIGNvbnN0IGMgPSBzY2FsZSAqIE1hdGguY29zKGFuZ2xlKTtcbiAgY29uc3QgcyA9IHNjYWxlICogTWF0aC5zaW4oYW5nbGUpO1xuXG4gIGNvbnN0IFMgPSBbXG4gICAgYywgLXMsIHgsXG4gICAgcywgYywgeSxcbiAgICAwLCAwLCAxXG4gIF1cbiAgcmV0dXJuIFM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBleHRyYWN0XG59XG4iLCJjb25zdCB7ZG93bnNhbXBsZUJpbGluZWFyfSA9IHJlcXVpcmUoJy4uL3V0aWxzL2ltYWdlcy5qcycpO1xuXG4vLyBCdWlsZCBhIGd1c3NpYW4gcHlyYW1pZCwgd2l0aCB0aGUgZm9sbG93aW5nIHN0cnVjdHVyZTpcbi8vXG4vLyBweXJhbWlkID0ge1xuLy8gICBudW1PY3RhdmVzLFxuLy8gICBudW1TY2FsZXNQZXJPY3RhdmVzLFxuLy8gICBpbWFnZXM6IFt7ZGF0YSwgd2lkdGgsIGhlaWdodH0sIHt9LCB7fV0gLy8gaW1hZ2UgYXQgb2N0YXZlIGkgYW5kIHNjYWxlIGogPSBpbWFnZXNbaSAqIG51bVNjYWxlc1Blck9jdGF2ZXMgKyBqXVxuLy8gfVxuXG5jb25zdCBidWlsZCA9ICh7aW1hZ2UsIG51bVNjYWxlc1Blck9jdGF2ZXMsIG1pblNpemV9KSA9PiB7XG4gIGNvbnN0IHtkYXRhLCB3aWR0aCwgaGVpZ2h0fSA9IGltYWdlO1xuXG4gIGNvbnN0IG51bU9jdGF2ZXMgPSBfbnVtT2N0YXZlcyh7d2lkdGgsIGhlaWdodCwgbWluU2l6ZTogbWluU2l6ZX0pO1xuXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuREVCVUdfVElNRSkge1xuICAgIHZhciBfc3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgfVxuXG4gIGNvbnN0IHB5cmFtaWRJbWFnZXMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1PY3RhdmVzOyBpKyspIHtcbiAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgcHlyYW1pZEltYWdlcy5wdXNoKF9hcHBseUZpbHRlcihpbWFnZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBmaXJzdCBpbWFnZSBvZiBlYWNoIG9jdGF2ZSwgZG93bnNhbXBsZSBmcm9tIHByZXZpb3VzXG4gICAgICBweXJhbWlkSW1hZ2VzLnB1c2goZG93bnNhbXBsZUJpbGluZWFyKHtpbWFnZTogcHlyYW1pZEltYWdlc1tweXJhbWlkSW1hZ2VzLmxlbmd0aC0xXX0pKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LkRFQlVHX1RJTUUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdleGVjIHRpbWUgR2F1c3NpYW4nLCBpLCAwLCBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIF9zdGFydCk7XG4gICAgfVxuXG4gICAgLy8gcmVtYWluaW5nIGltYWdlcyBvZiBvY3RhdmUsIDR0aCBvcmRlciBiaW5vbWFpbCBmcm9tIHByZXZpb3VzXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBudW1TY2FsZXNQZXJPY3RhdmVzIC0gMTsgaisrKSB7XG4gICAgICBpZiAoaiA9PT0gMCkge1xuICAgICAgICBweXJhbWlkSW1hZ2VzLnB1c2goX2FwcGx5RmlsdGVyKHB5cmFtaWRJbWFnZXNbcHlyYW1pZEltYWdlcy5sZW5ndGgtMV0pKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGluIGFydG9vbGtpdCwgaXQgYXBwbHkgZmlsdGVyIHR3aWNlLi4uLiAgaXMgaXQgYSBidWc/XG4gICAgICAgIC8vcHlyYW1pZEltYWdlcy5wdXNoKF9hcHBseUZpbHRlcihfYXBwbHlGaWx0ZXIocHlyYW1pZEltYWdlc1tweXJhbWlkSW1hZ2VzLmxlbmd0aC0xXSkpKTtcbiAgICAgICAgcHlyYW1pZEltYWdlcy5wdXNoKF9hcHBseUZpbHRlcihweXJhbWlkSW1hZ2VzW3B5cmFtaWRJbWFnZXMubGVuZ3RoLTFdKSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuREVCVUdfVElNRSkge1xuICAgICAgICBjb25zb2xlLmxvZygnZXhlYyB0aW1lIEdhdXNzaWFuJywgaSwgaiwgbmV3IERhdGUoKS5nZXRUaW1lKCkgLSBfc3RhcnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHB5cmFtaWQgPSB7XG4gICAgbnVtT2N0YXZlczogbnVtT2N0YXZlcyxcbiAgICBudW1TY2FsZXNQZXJPY3RhdmVzOiBudW1TY2FsZXNQZXJPY3RhdmVzLFxuICAgIGltYWdlczogcHlyYW1pZEltYWdlc1xuICB9XG4gIHJldHVybiBweXJhbWlkO1xufVxuXG5jb25zdCBfbnVtT2N0YXZlcyA9IChvcHRpb25zKSA9PiB7XG4gIGxldCB7d2lkdGgsIGhlaWdodCwgbWluU2l6ZX0gPSBvcHRpb25zO1xuICBsZXQgbnVtT2N0YXZlcyA9IDA7XG4gIHdoaWxlICh3aWR0aCA+PSBtaW5TaXplICYmIGhlaWdodCA+PSBtaW5TaXplKSB7XG4gICAgd2lkdGggLz0gMjtcbiAgICBoZWlnaHQgLz0gMjtcbiAgICBudW1PY3RhdmVzKys7XG4gIH1cbiAgcmV0dXJuIG51bU9jdGF2ZXM7XG59XG5cbi8vNHRoIG9yZGVyIGJpbm9taWFsXG5jb25zdCBfYXBwbHlGaWx0ZXIgPSAoaW1hZ2UpID0+IHtcbiAgY29uc3Qge2RhdGEsIHdpZHRoLCBoZWlnaHR9ID0gaW1hZ2U7XG5cbiAgLy9pZiAod2lkdGggPCA1KSB7Y29uc29sZS5sb2coXCJpbWFnZSB0b28gc21hbGxcIik7IHJldHVybjt9XG4gIC8vaWYgKGhlaWdodCA8IDUpIHtjb25zb2xlLmxvZyhcImltYWdlIHRvbyBzbWFsbFwiKTsgcmV0dXJuO31cblxuICBjb25zdCB0ZW1wID0gbmV3IEZsb2F0MzJBcnJheShkYXRhLmxlbmd0aCk7XG5cbiAgLy8gYXBwbHkgaG9yaXpvbnRhbCBmaWx0ZXIuIGJvcmRlciBpcyBjb21wdXRlZCBieSBleHRlbmRpbmcgYm9yZGVyIHBpeGVsXG4gIGZvciAobGV0IGogPSAwOyBqIDwgaGVpZ2h0OyBqKyspIHtcbiAgICBjb25zdCBqb2Zmc2V0ID0gaiAqIHdpZHRoO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2lkdGg7IGkrKykge1xuICAgICAgY29uc3QgcG9zID0gam9mZnNldCsgaTtcblxuICAgICAgdGVtcFtwb3NdID0gZGF0YVtqb2Zmc2V0ICsgTWF0aC5tYXgoaS0yLDApXSArXG4gICAgICAgICAgICAgICAgICBkYXRhW2pvZmZzZXQgKyBNYXRoLm1heChpLTEsMCldICogNCArXG4gICAgICAgICAgICAgICAgICBkYXRhW2pvZmZzZXQgKyBpXSAqIDYgK1xuICAgICAgICAgICAgICAgICAgZGF0YVtqb2Zmc2V0ICsgTWF0aC5taW4oaSsxLHdpZHRoLTEpXSAqIDQgK1xuICAgICAgICAgICAgICAgICAgZGF0YVtqb2Zmc2V0ICsgTWF0aC5taW4oaSsyLHdpZHRoLTEpXTtcbiAgICB9XG4gIH1cblxuXG4gIGNvbnN0IGRzdCA9IG5ldyBGbG9hdDMyQXJyYXkoZGF0YS5sZW5ndGgpO1xuICAvLyBhcHBseSB2ZXJ0aWNhbCBmaWx0ZXIuIGJvcmRlciBpcyBjb21wdXRlZCBieSBleHRlbmRpbmcgYm9yZGVyIHBpeGVsXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgd2lkdGg7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgaGVpZ2h0OyBqKyspIHtcbiAgICAgIGNvbnN0IHBvcyA9IGogKiB3aWR0aCArIGk7XG5cbiAgICAgIGRzdFtwb3NdID0gdGVtcFtNYXRoLm1heChqLTIsMCkgKiB3aWR0aCArIGldICtcbiAgICAgICAgICAgICAgICAgdGVtcFtNYXRoLm1heChqLTEsMCkgKiB3aWR0aCArIGldICogNCArXG4gICAgICAgICAgICAgICAgIHRlbXBbaiAqIHdpZHRoICsgaV0gKiA2ICtcbiAgICAgICAgICAgICAgICAgdGVtcFtNYXRoLm1pbihqKzEsaGVpZ2h0LTEpICogd2lkdGggKyBpXSAqIDQgK1xuICAgICAgICAgICAgICAgICB0ZW1wW01hdGgubWluKGorMixoZWlnaHQtMSkgKiB3aWR0aCArIGldO1xuXG4gICAgICAvLyBhdmVyYWdlIG9mICgxKzQrNis0KzEpICogKDErNCs2KzQrMSkgPSAyNTYgbnVtYmVyc1xuICAgICAgZHN0W3Bvc10gPSBkc3RbcG9zXSAvIDI1Ni4wO1xuICAgIH1cbiAgfVxuICByZXR1cm4ge2RhdGE6IGRzdCwgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYnVpbGRcbn07XG4iLCJjb25zdCB7cmVzaXplfSA9IHJlcXVpcmUoXCIuL3V0aWxzL2ltYWdlcy5qc1wiKTtcblxuLy9jb25zdCBERUZBVUxUX0RQSSA9IDcyO1xuY29uc3QgREVGQVVMVF9EUEkgPSAxO1xuY29uc3QgTUlOX0lNQUdFX1BJWEVMX1NJWkUgPSAyODtcblxuLy8gcmV0dXJuIGxpc3Qgb2Yge2RhdGEsIHdpZHRoLCBoZWlnaHQsIGRwaX1cbmNvbnN0IGJ1aWxkSW1hZ2VMaXN0ID0gKGlucHV0SW1hZ2UpID0+IHtcbiAgY29uc3QgZHBpID0gREVGQVVMVF9EUEk7XG4gIGNvbnN0IG1pbkRwaSA9IE1hdGguZmxvb3IoMS4wICogTUlOX0lNQUdFX1BJWEVMX1NJWkUgLyBNYXRoLm1pbihpbnB1dEltYWdlLndpZHRoLCBpbnB1dEltYWdlLmhlaWdodCkgKiBkcGkgKiAxMDAwKSAvIDEwMDA7XG4gIGNvbnN0IGRwaUxpc3QgPSBbXTtcblxuICBsZXQgYyA9IG1pbkRwaTtcbiAgd2hpbGUgKHRydWUpIHtcbiAgICBkcGlMaXN0LnB1c2goYyk7XG4gICAgYyAqPSBNYXRoLnBvdygyLjAsIDEuMC8zLjApO1xuICAgIGMgPSBNYXRoLmZyb3VuZChjKTsgLy8gY2FuIHJlbW92ZSB0aGlzIGxpbmUgaW4gcHJvZHVjdGlvbi4gdHJ5aW5nIHRvIHJlcHJvZHVjZSB0aGUgc2FtZSByZXN1bHQgYXMgYXJ0b29sa2l0LCB3aGljaCB1c2UgZmxvYXQuXG4gICAgaWYgKGMgPj0gZHBpICogMC45NSkge1xuICAgICAgYyA9IGRwaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBkcGlMaXN0LnB1c2goYyk7XG4gIGRwaUxpc3QucmV2ZXJzZSgpO1xuXG4gIGNvbnN0IGltYWdlTGlzdCA9IFtdOyAvLyBsaXN0IG9mIHtkYXRhOiBbd2lkdGggeCBoZWlnaHRdLCB3aWR0aCwgaGVpZ2h0fVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGRwaUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCB3ID0gaW5wdXRJbWFnZS53aWR0aCAqIGRwaUxpc3RbaV0gLyBkcGk7XG4gICAgY29uc3QgaCA9IGlucHV0SW1hZ2UuaGVpZ2h0ICogZHBpTGlzdFtpXSAvIGRwaTtcbiAgICBpbWFnZUxpc3QucHVzaChPYmplY3QuYXNzaWduKHJlc2l6ZSh7aW1hZ2U6IGlucHV0SW1hZ2UsIHJhdGlvOiBkcGlMaXN0W2ldL2RwaX0pLCB7ZHBpOiBkcGlMaXN0W2ldfSkpO1xuICB9XG5cbiAgLy9yZXR1cm4gW2ltYWdlTGlzdFswXV07XG5cbiAgcmV0dXJuIGltYWdlTGlzdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGJ1aWxkSW1hZ2VMaXN0XG59XG4iLCIvLyBGYXN0IGNvbXB1dGF0aW9uIG9uIG51bWJlciBvZiBiaXQgc2V0c1xuLy8gUmVmOiBodHRwczovL2dyYXBoaWNzLnN0YW5mb3JkLmVkdS9+c2VhbmRlci9iaXRoYWNrcy5odG1sI0NvdW50Qml0c1NldFBhcmFsbGVsXG5jb25zdCBjb21wdXRlID0gKG9wdGlvbnMpID0+IHtcbiAgY29uc3Qge3YxLCB2Mn0gPSBvcHRpb25zO1xuICBsZXQgZCA9IDA7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdjEubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgeCA9ICh2MVtpXSBeIHYyW2ldKSA+Pj4gMDtcbiAgICBkICs9IGJpdENvdW50KHgpO1xuICB9XG4gIHJldHVybiBkO1xufVxuXG5jb25zdCBiaXRDb3VudCA9ICh2KSA9PiB7XG4gIHZhciBjID0gdiAtICgodiA+PiAxKSAmIDB4NTU1NTU1NTUpO1xuICBjID0gKChjID4+IDIpICYgMHgzMzMzMzMzMykgKyAoYyAmIDB4MzMzMzMzMzMpO1xuICBjID0gKChjID4+IDQpICsgYykgJiAweDBGMEYwRjBGO1xuICBjID0gKChjID4+IDgpICsgYykgJiAweDAwRkYwMEZGO1xuICBjID0gKChjID4+IDE2KSArIGMpICYgMHgwMDAwRkZGRjtcbiAgcmV0dXJuIGM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjb21wdXRlXG59O1xuIiwiY29uc3Qge2NvbXB1dGU6IGhhbW1pbmdDb21wdXRlfSA9IHJlcXVpcmUoJy4vaGFtbWluZy1kaXN0YW5jZS5qcycpO1xuY29uc3Qge2NyZWF0ZVJhbmRvbWl6ZXJ9ID0gcmVxdWlyZSgnLi4vdXRpbHMvcmFuZG9taXplci5qcycpO1xuXG5jb25zdCBNSU5fRkVBVFVSRV9QRVJfTk9ERSA9IDE2O1xuY29uc3QgTlVNX0FTU0lHTk1FTlRfSFlQT1RIRVNFUyA9ICAxMjg7XG5jb25zdCBOVU1fQ0VOVEVSUyA9IDg7XG5cbi8vIGttZWRvaWRzIGNsdXN0ZXJpbmcgb2YgcG9pbnRzLCB3aXRoIGhhbW1pbmcgZGlzdGFuY2Ugb2YgRlJFQUsgZGVzY3JpcHRvclxuLy9cbi8vIG5vZGUgPSB7XG4vLyAgIGlzTGVhZjogYm9vbCxcbi8vICAgY2hpbGRyZW46IFtdLCBsaXN0IG9mIGNoaWxkcmVuIG5vZGVcbi8vICAgcG9pbnRJbmRleGVzOiBbXSwgbGlzdCBvZiBpbnQsIHBvaW50IGluZGV4ZXNcbi8vICAgY2VudGVyUG9pbnRJbmRleDogaW50XG4vLyB9XG5jb25zdCBidWlsZCA9ICh7cG9pbnRzfSkgPT4ge1xuICBjb25zdCBwb2ludEluZGV4ZXMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICBwb2ludEluZGV4ZXMucHVzaChpKTtcbiAgfVxuXG4gIGNvbnN0IHJhbmRvbWl6ZXIgPSBjcmVhdGVSYW5kb21pemVyKCk7XG5cbiAgY29uc3Qgcm9vdE5vZGUgPSBfYnVpbGQoe3BvaW50czogcG9pbnRzLCBwb2ludEluZGV4ZXM6IHBvaW50SW5kZXhlcywgY2VudGVyUG9pbnRJbmRleDogbnVsbCwgcmFuZG9taXplcn0pO1xuICByZXR1cm4ge3Jvb3ROb2RlfTtcbn1cblxuLy8gcmVjdXJzaXZlIGJ1aWxkIGhpZXJhcmNoeSBjbHVzdGVyc1xuY29uc3QgX2J1aWxkID0gKG9wdGlvbnMpID0+IHtcbiAgY29uc3Qge3BvaW50cywgcG9pbnRJbmRleGVzLCBjZW50ZXJQb2ludEluZGV4LCByYW5kb21pemVyfSA9IG9wdGlvbnM7XG5cbiAgbGV0IGlzTGVhZiA9IGZhbHNlO1xuXG4gIGlmIChwb2ludEluZGV4ZXMubGVuZ3RoIDw9IE5VTV9DRU5URVJTIHx8IHBvaW50SW5kZXhlcy5sZW5ndGggPD0gTUlOX0ZFQVRVUkVfUEVSX05PREUpIHtcbiAgICBpc0xlYWYgPSB0cnVlO1xuICB9XG5cbiAgY29uc3QgY2x1c3RlcnMgPSB7fTtcbiAgaWYgKCFpc0xlYWYpIHtcbiAgICAvLyBjb21wdXRlIGNsdXN0ZXJzXG4gICAgY29uc3QgYXNzaWdubWVudCA9IF9jb21wdXRlS01lZG9pZHMoe3BvaW50cywgcG9pbnRJbmRleGVzLCByYW5kb21pemVyfSk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFzc2lnbm1lbnQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChjbHVzdGVyc1twb2ludEluZGV4ZXNbYXNzaWdubWVudFtpXV1dID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY2x1c3RlcnNbcG9pbnRJbmRleGVzW2Fzc2lnbm1lbnRbaV1dXSA9IFtdO1xuICAgICAgfVxuICAgICAgY2x1c3RlcnNbcG9pbnRJbmRleGVzW2Fzc2lnbm1lbnRbaV1dXS5wdXNoKHBvaW50SW5kZXhlc1tpXSk7XG4gICAgfVxuICB9XG4gIGlmIChPYmplY3Qua2V5cyhjbHVzdGVycykubGVuZ3RoID09PSAxKSB7XG4gICAgaXNMZWFmID0gdHJ1ZTtcbiAgfVxuXG4gIGNvbnN0IG5vZGUgPSB7XG4gICAgY2VudGVyUG9pbnRJbmRleDogY2VudGVyUG9pbnRJbmRleFxuICB9XG5cbiAgaWYgKGlzTGVhZikge1xuICAgIG5vZGUubGVhZiA9IHRydWU7XG4gICAgbm9kZS5wb2ludEluZGV4ZXMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBvaW50SW5kZXhlcy5sZW5ndGg7IGkrKykge1xuICAgICAgbm9kZS5wb2ludEluZGV4ZXMucHVzaChwb2ludEluZGV4ZXNbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIC8vIHJlY3Vyc2l2ZSBidWlsZCBjaGlsZHJlblxuICBub2RlLmxlYWYgPSBmYWxzZTtcbiAgbm9kZS5jaGlsZHJlbiA9IFtdO1xuXG4gIE9iamVjdC5rZXlzKGNsdXN0ZXJzKS5mb3JFYWNoKChjZW50ZXJJbmRleCkgPT4ge1xuICAgIG5vZGUuY2hpbGRyZW4ucHVzaChfYnVpbGQoe3BvaW50czogcG9pbnRzLCBwb2ludEluZGV4ZXM6IGNsdXN0ZXJzW2NlbnRlckluZGV4XSwgY2VudGVyUG9pbnRJbmRleDogY2VudGVySW5kZXgsIHJhbmRvbWl6ZXJ9KSk7XG4gIH0pO1xuICByZXR1cm4gbm9kZTtcbn1cblxuX2NvbXB1dGVLTWVkb2lkcyA9IChvcHRpb25zKSA9PiB7XG4gIGNvbnN0IHtwb2ludHMsIHBvaW50SW5kZXhlcywgcmFuZG9taXplcn0gPSBvcHRpb25zO1xuXG4gIGNvbnN0IHJhbmRvbVBvaW50SW5kZXhlcyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHBvaW50SW5kZXhlcy5sZW5ndGg7IGkrKykge1xuICAgIHJhbmRvbVBvaW50SW5kZXhlcy5wdXNoKGkpO1xuICB9XG5cbiAgbGV0IGJlc3RTdW1EID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XG4gIGxldCBiZXN0QXNzaWdubWVudEluZGV4ID0gLTE7XG5cbiAgY29uc3QgYXNzaWdubWVudHMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBOVU1fQVNTSUdOTUVOVF9IWVBPVEhFU0VTOyBpKyspIHtcbiAgICByYW5kb21pemVyLmFycmF5U2h1ZmZsZSh7YXJyOiByYW5kb21Qb2ludEluZGV4ZXMsIHNhbXBsZVNpemU6IE5VTV9DRU5URVJTfSk7XG5cbiAgICBsZXQgc3VtRCA9IDA7XG4gICAgY29uc3QgYXNzaWdubWVudCA9IFtdO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgcG9pbnRJbmRleGVzLmxlbmd0aDsgaisrKSB7XG4gICAgICBsZXQgYmVzdEQgPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUjtcbiAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgTlVNX0NFTlRFUlM7IGsrKykge1xuICAgICAgICBjb25zdCBjZW50ZXJJbmRleCA9IHBvaW50SW5kZXhlc1tyYW5kb21Qb2ludEluZGV4ZXNba11dO1xuICAgICAgICBjb25zdCBkID0gaGFtbWluZ0NvbXB1dGUoe3YxOiBwb2ludHNbcG9pbnRJbmRleGVzW2pdXS5kZXNjcmlwdG9ycywgdjI6IHBvaW50c1tjZW50ZXJJbmRleF0uZGVzY3JpcHRvcnN9KTtcbiAgICAgICAgaWYgKGQgPCBiZXN0RCkge1xuICAgICAgICAgIGFzc2lnbm1lbnRbal0gPSByYW5kb21Qb2ludEluZGV4ZXNba107XG4gICAgICAgICAgYmVzdEQgPSBkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBzdW1EICs9IGJlc3REO1xuICAgIH1cbiAgICBhc3NpZ25tZW50cy5wdXNoKGFzc2lnbm1lbnQpO1xuXG4gICAgaWYgKHN1bUQgPCBiZXN0U3VtRCkge1xuICAgICAgYmVzdFN1bUQgPSBzdW1EO1xuICAgICAgYmVzdEFzc2lnbm1lbnRJbmRleCA9IGk7XG4gICAgfVxuICB9XG4gIHJldHVybiBhc3NpZ25tZW50c1tiZXN0QXNzaWdubWVudEluZGV4XTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGJ1aWxkLFxufTtcblxuIiwiY29uc3Qge0N1bXN1bX0gPSByZXF1aXJlKCcuLi91dGlscy9jdW1zdW0nKTtcblxuY29uc3QgU0VBUkNIX1NJWkUxID0gMTA7XG5jb25zdCBTRUFSQ0hfU0laRTIgPSAyO1xuXG4vL2NvbnN0IFRFTVBMQVRFX1NJWkUgPSAyMiAvLyAyMiBpcyBkZWZhdWx0IGZyb20gYXJ0b29sa2l0XG5jb25zdCBURU1QTEFURV9TSVpFID0gNjtcbmNvbnN0IFRFTVBMQVRFX1NEX1RIUkVTSCA9IDUuMDtcbmNvbnN0IE1BWF9TSU1fVEhSRVNIID0gMC45NTtcblxuY29uc3QgTUFYX1RIUkVTSCA9IDAuOTtcbmNvbnN0IE1JTl9USFJFU0ggPSAwLjU1O1xuY29uc3QgU0RfVEhSRVNIID0gOC4wO1xuY29uc3QgT0NDVVBBTkNZX1NJWkUgPSAyNCAqIDIgLyAzO1xuXG4vKlxuICogSW5wdXQgaW1hZ2UgaXMgaW4gZ3JleSBmb3JtYXQuIHRoZSBpbWFnZURhdGEgYXJyYXkgc2l6ZSBpcyB3aWR0aCAqIGhlaWdodC4gdmFsdWUgcmFuZ2UgZnJvbSAwLTI1NVxuICogcGl4ZWwgdmFsdWUgYXQgcm93IHIgYW5kIGMgPSBpbWFnZURhdGFbciAqIHdpZHRoICsgY11cbiAqXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IG9wdGlvbnMuaW1hZ2VEYXRhXG4gKiBAcGFyYW0ge2ludH0gb3B0aW9ucy53aWR0aCBpbWFnZSB3aWR0aFxuICogQHBhcmFtIHtpbnR9IG9wdGlvbnMuaGVpZ2h0IGltYWdlIGhlaWdodFxuICovXG5jb25zdCBleHRyYWN0ID0gKGltYWdlKSA9PiB7XG4gIGNvbnN0IHtkYXRhOiBpbWFnZURhdGEsIHdpZHRoLCBoZWlnaHQsIGRwaX0gPSBpbWFnZTtcblxuICAvLyBTdGVwIDEgLSBmaWx0ZXIgb3V0IGludGVyZXN0aW5nIHBvaW50cy4gSW50ZXJlc3RpbmcgcG9pbnRzIGhhdmUgc3Ryb25nIHBpeGVsIHZhbHVlIGNoYW5nZWQgYWNyb3NzIG5laWdoYm91cnNcbiAgY29uc3QgaXNQaXhlbFNlbGVjdGVkID0gW3dpZHRoICogaGVpZ2h0XTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpc1BpeGVsU2VsZWN0ZWQubGVuZ3RoOyBpKyspIGlzUGl4ZWxTZWxlY3RlZFtpXSA9IGZhbHNlO1xuXG4gIC8vIFN0ZXAgMS4xIGNvbnNpZGVyIGEgcGl4ZWwgYXQgcG9zaXRpb24gKHgsIHkpLiBjb21wdXRlOlxuICAvLyAgIGR4ID0gKChkYXRhW3grMSwgeS0xXSAtIGRhdGFbeC0xLCB5LTFdKSArIChkYXRhW3grMSwgeV0gLSBkYXRhW3gtMSwgeV0pICsgKGRhdGFbeCsxLCB5KzFdIC0gZGF0YVt4LTEsIHktMV0pKSAvIDI1NiAvIDNcbiAgLy8gICBkeSA9ICgoZGF0YVt4KzEsIHkrMV0gLSBkYXRhW3grMSwgeS0xXSkgKyAoZGF0YVt4LCB5KzFdIC0gZGF0YVt4LCB5LTFdKSArIChkYXRhW3gtMSwgeSsxXSAtIGRhdGFbeC0xLCB5LTFdKSkgLyAyNTYgLyAzXG4gIC8vICAgZFZhbHVlID0gIHNxcnQoZHheMiArIGR5XjIpIC8gMjtcbiAgY29uc3QgZFZhbHVlID0gbmV3IEZsb2F0MzJBcnJheShpbWFnZURhdGEubGVuZ3RoKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB3aWR0aDsgaSsrKSB7XG4gICAgZFZhbHVlW2ldID0gLTE7XG4gICAgZFZhbHVlW3dpZHRoICogKGhlaWdodC0xKSArIGldID0gLTE7XG4gIH1cbiAgZm9yIChsZXQgaiA9IDA7IGogPCBoZWlnaHQ7IGorKykge1xuICAgIGRWYWx1ZVtqKndpZHRoXSA9IC0xO1xuICAgIGRWYWx1ZVtqKndpZHRoICsgd2lkdGgtMV0gPSAtMTtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAxOyBpIDwgd2lkdGgtMTsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDE7IGogPCBoZWlnaHQtMTsgaisrKSB7XG4gICAgICBsZXQgcG9zID0gaSArIHdpZHRoICogajtcblxuICAgICAgbGV0IGR4ID0gMC4wO1xuICAgICAgbGV0IGR5ID0gMC4wO1xuICAgICAgZm9yIChsZXQgayA9IC0xOyBrIDw9IDE7IGsrKykge1xuICAgICAgICBkeCArPSAoaW1hZ2VEYXRhW3BvcyArIHdpZHRoKmsgKyAxXSAtIGltYWdlRGF0YVtwb3MgKyB3aWR0aCprIC0xXSk7XG4gICAgICAgIGR5ICs9IChpbWFnZURhdGFbcG9zICsgd2lkdGggKyBrXSAtIGltYWdlRGF0YVtwb3MgLSB3aWR0aCArIGtdKTtcbiAgICAgIH1cbiAgICAgIGR4IC89ICgzICogMjU2KTtcbiAgICAgIGR5IC89ICgzICogMjU2KTtcbiAgICAgIGRWYWx1ZVtwb3NdID0gTWF0aC5zcXJ0KCAoZHggKiBkeCArIGR5ICogZHkpIC8gMik7XG4gICAgfVxuICB9XG5cbiAgLy8gU3RlcCAxLjIgLSBzZWxlY3QgYWxsIHBpeGVsIHdoaWNoIGlzIGRWYWx1ZSBsYXJnZXN0IHRoYW4gYWxsIGl0cyBuZWlnaGJvdXIgYXMgXCJwb3RlbnRpYWxcIiBjYW5kaWRhdGVcbiAgLy8gIHRoZSBudW1iZXIgb2Ygc2VsZWN0ZWQgcG9pbnRzIGlzIHN0aWxsIHRvbyBtYW55LCBzbyB3ZSB1c2UgdGhlIHZhbHVlIHRvIGZ1cnRoZXIgZmlsdGVyIChlLmcuIGxhcmdlc3QgdGhlIGRWYWx1ZSwgdGhlIGJldHRlcilcbiAgY29uc3QgZFZhbHVlSGlzdCA9IG5ldyBVaW50MzJBcnJheSgxMDAwKTsgLy8gaGlzdG9ncmFtIG9mIGR2YWx1ZSBzY2FsZWQgdG8gWzAsIDEwMDApXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwMDsgaSsrKSBkVmFsdWVIaXN0W2ldID0gMDtcbiAgY29uc3QgbmVpZ2hib3VyT2Zmc2V0cyA9IFstMSwgMSwgLXdpZHRoLCB3aWR0aF07XG4gIGxldCBhbGxDb3VudCA9IDA7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgd2lkdGgtMTsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDE7IGogPCBoZWlnaHQtMTsgaisrKSB7XG4gICAgICBsZXQgcG9zID0gaSArIHdpZHRoICogajtcbiAgICAgIGxldCBpc01heCA9IHRydWU7XG4gICAgICBmb3IgKGxldCBkID0gMDsgZCA8IG5laWdoYm91ck9mZnNldHMubGVuZ3RoOyBkKyspIHtcbiAgICAgICAgaWYgKGRWYWx1ZVtwb3NdIDw9IGRWYWx1ZVtwb3MgKyBuZWlnaGJvdXJPZmZzZXRzW2RdXSkge1xuICAgICAgICAgIGlzTWF4ID0gZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChpc01heCkge1xuICAgICAgICBsZXQgayA9IE1hdGguZmxvb3IoZFZhbHVlW3Bvc10gKiAxMDAwKTtcbiAgICAgICAgaWYgKGsgPiA5OTkpIGsgPSA5OTk7IC8vIGs+OTk5IHNob3VsZCBub3QgaGFwcGVuIGlmIGNvbXB1dGFpdG9uIGlzIGNvcnJlY3Rpb25cbiAgICAgICAgaWYgKGsgPCAwKSBrID0gMDsgLy8gazwwIHNob3VsZCBub3QgaGFwcGVuIGlmIGNvbXB1dGFpdG9uIGlzIGNvcnJlY3Rpb25cbiAgICAgICAgZFZhbHVlSGlzdFtrXSArPSAxO1xuICAgICAgICBhbGxDb3VudCArPSAxO1xuICAgICAgICBpc1BpeGVsU2VsZWN0ZWRbcG9zXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gcmVkdWNlIG51bWJlciBvZiBwb2ludHMgYWNjb3JkaW5nIHRvIGRWYWx1ZS5cbiAgLy8gYWN0dWFsbHksIHRoZSB3aG9sZSBTdGVwIDEuIG1pZ2h0IGJlIGJldHRlciB0byBqdXN0IHNvcnQgdGhlIGR2YWx1ZXMgYW5kIHBpY2sgdGhlIHRvcCAoMC4wMiAqIHdpZHRoICogaGVpZ2h0KSBwb2ludHNcbiAgY29uc3QgbWF4UG9pbnRzID0gMC4wMiAqIHdpZHRoICogaGVpZ2h0O1xuICBsZXQgayA9IDk5OTtcbiAgbGV0IGZpbHRlcmVkQ291bnQgPSAwO1xuICB3aGlsZSAoayA+PSAwKSB7XG4gICAgZmlsdGVyZWRDb3VudCArPSBkVmFsdWVIaXN0W2tdO1xuICAgIGlmIChmaWx0ZXJlZENvdW50ID4gbWF4UG9pbnRzKSBicmVhaztcbiAgICBrLS07XG4gIH1cblxuICAvL2NvbnNvbGUubG9nKFwiaW1hZ2Ugc2l6ZTogXCIsIHdpZHRoICogaGVpZ2h0KTtcbiAgLy9jb25zb2xlLmxvZyhcImV4dHJhY3RlZCBmZWF0dWVzOiBcIiwgYWxsQ291bnQpO1xuICAvL2NvbnNvbGUubG9nKFwiZmlsdGVyZWQgZmVhdHVlczogXCIsIGZpbHRlcmVkQ291bnQpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaXNQaXhlbFNlbGVjdGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGlzUGl4ZWxTZWxlY3RlZFtpXSkge1xuICAgICAgaWYgKGRWYWx1ZVtpXSAqIDEwMDAgPCBrKSBpc1BpeGVsU2VsZWN0ZWRbaV0gPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvL2NvbnNvbGUubG9nKFwic2VsZWN0ZWQgY291bnQ6IFwiLCBpc1BpeGVsU2VsZWN0ZWQucmVkdWNlKChhLCBiKSA9PiB7cmV0dXJuIGEgKyAoYj8xOjApO30sIDApKTtcblxuICAvLyBTdGVwIDJcbiAgLy8gcHJlYnVpbGQgY3VtdWxhdGl2ZSBzdW0gbWF0cml4IGZvciBmYXN0IGNvbXB1dGF0aW9uXG4gIGNvbnN0IGltYWdlRGF0YVNxciA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGltYWdlRGF0YS5sZW5ndGg7IGkrKykge1xuICAgIGltYWdlRGF0YVNxcltpXSA9IGltYWdlRGF0YVtpXSAqIGltYWdlRGF0YVtpXTtcbiAgfVxuICBjb25zdCBpbWFnZURhdGFDdW1zdW0gPSBuZXcgQ3Vtc3VtKGltYWdlRGF0YSwgd2lkdGgsIGhlaWdodCk7XG4gIGNvbnN0IGltYWdlRGF0YVNxckN1bXN1bSA9IG5ldyBDdW1zdW0oaW1hZ2VEYXRhU3FyLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAvLyBob2xkcyB0aGUgbWF4IHNpbWlsYXJpbGl5IHZhbHVlIGNvbXB1dGVkIHdpdGhpbiBTRUFSQ0ggYXJlYSBvZiBlYWNoIHBpeGVsXG4gIC8vICAgaWRlYTogaWYgdGhlcmUgaXMgaGlnaCBzaW1saWFyaXR5IHdpdGggYW5vdGhlciBwaXhlbCBpbiBuZWFyYnkgYXJlYSwgdGhlbiBpdCdzIG5vdCBhIGdvb2QgZmVhdHVyZSBwb2ludFxuICAvLyAgICAgICAgIG5leHQgc3RlcCBpcyB0byBmaW5kIHBpeGVsIHdpdGggbG93IHNpbWlsYXJpdHlcbiAgY29uc3QgZmVhdHVyZU1hcCA9IG5ldyBGbG9hdDMyQXJyYXkoaW1hZ2VEYXRhLmxlbmd0aCk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB3aWR0aDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBoZWlnaHQ7IGorKykge1xuICAgICAgY29uc3QgcG9zID0gaiAqIHdpZHRoICsgaTtcbiAgICAgIGlmICghaXNQaXhlbFNlbGVjdGVkW3Bvc10pIHtcbiAgICAgICAgZmVhdHVyZU1hcFtwb3NdID0gMS4wO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdmxlbiA9IF90ZW1wbGF0ZVZhcih7aW1hZ2UsIGN4OiBpLCBjeTogaiwgc2RUaHJlc2g6IFRFTVBMQVRFX1NEX1RIUkVTSCwgaW1hZ2VEYXRhQ3Vtc3VtLCBpbWFnZURhdGFTcXJDdW1zdW19KTtcbiAgICAgIGlmICh2bGVuID09PSBudWxsKSB7XG4gICAgICAgIGZlYXR1cmVNYXBbcG9zXSA9IDEuMDtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGxldCBtYXggPSAtMS4wO1xuICAgICAgZm9yIChsZXQgamogPSAtU0VBUkNIX1NJWkUxOyBqaiA8PSBTRUFSQ0hfU0laRTE7IGpqKyspIHtcbiAgICAgICAgZm9yIChsZXQgaWkgPSAtU0VBUkNIX1NJWkUxOyBpaSA8PSBTRUFSQ0hfU0laRTE7IGlpKyspIHtcbiAgICAgICAgICBpZiAoaWkgKiBpaSArIGpqICogamogPD0gU0VBUkNIX1NJWkUyICogU0VBUkNIX1NJWkUyKSBjb250aW51ZTtcbiAgICAgICAgICBjb25zdCBzaW0gPSBfZ2V0U2ltaWxhcml0eSh7aW1hZ2UsIGN4OiBpK2lpLCBjeTogaitqaiwgdmxlbjogdmxlbiwgdHg6IGksIHR5OiBqLCBpbWFnZURhdGFDdW1zdW0sIGltYWdlRGF0YVNxckN1bXN1bX0pO1xuXG4gICAgICAgICAgaWYgKHNpbSA9PT0gbnVsbCkgY29udGludWU7XG5cbiAgICAgICAgICBpZiAoc2ltID4gbWF4KSB7XG4gICAgICAgICAgICBtYXggPSBzaW07XG4gICAgICAgICAgICBpZiAobWF4ID4gTUFYX1NJTV9USFJFU0gpIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAobWF4ID4gTUFYX1NJTV9USFJFU0gpIGJyZWFrO1xuICAgICAgfVxuICAgICAgZmVhdHVyZU1hcFtwb3NdID0gbWF4O1xuICAgIH1cbiAgfVxuXG4gIC8vIFN0ZXAgMi4yIHNlbGVjdCBmZWF0dXJlXG4gIGNvbnN0IGNvb3JkcyA9IF9zZWxlY3RGZWF0dXJlKHtpbWFnZSwgZmVhdHVyZU1hcCwgdGVtcGxhdGVTaXplOiBURU1QTEFURV9TSVpFLCBzZWFyY2hTaXplOiBTRUFSQ0hfU0laRTIsIG9jY1NpemU6IE9DQ1VQQU5DWV9TSVpFLCBtYXhTaW1UaHJlc2g6IE1BWF9USFJFU0gsIG1pblNpbVRocmVzaDogTUlOX1RIUkVTSCwgc2RUaHJlc2g6IFNEX1RIUkVTSCwgaW1hZ2VEYXRhQ3Vtc3VtLCBpbWFnZURhdGFTcXJDdW1zdW19KTtcblxuICByZXR1cm4gY29vcmRzO1xufVxuXG5jb25zdCBfc2VsZWN0RmVhdHVyZSA9IChvcHRpb25zKSA9PiB7XG4gIGxldCB7aW1hZ2UsIGZlYXR1cmVNYXAsIHRlbXBsYXRlU2l6ZSwgc2VhcmNoU2l6ZSwgb2NjU2l6ZSwgbWF4U2ltVGhyZXNoLCBtaW5TaW1UaHJlc2gsIHNkVGhyZXNoLCBpbWFnZURhdGFDdW1zdW0sIGltYWdlRGF0YVNxckN1bXN1bX0gPSBvcHRpb25zO1xuICBjb25zdCB7ZGF0YTogaW1hZ2VEYXRhLCB3aWR0aCwgaGVpZ2h0LCBkcGl9ID0gaW1hZ2U7XG5cbiAgLy9jb25zb2xlLmxvZyhcInBhcmFtczogXCIsIHRlbXBsYXRlU2l6ZSwgdGVtcGxhdGVTaXplLCBvY2NTaXplLCBtYXhTaW1UaHJlc2gsIG1pblNpbVRocmVzaCwgc2RUaHJlc2gpO1xuXG4gIC8vb2NjU2l6ZSAqPSAyO1xuICBvY2NTaXplID0gTWF0aC5mbG9vcihNYXRoLm1pbihpbWFnZS53aWR0aCwgaW1hZ2UuaGVpZ2h0KSAvIDEwKTtcblxuICBjb25zdCBkaXZTaXplID0gKHRlbXBsYXRlU2l6ZSAqIDIgKyAxKSAqIDM7XG4gIGNvbnN0IHhEaXYgPSBNYXRoLmZsb29yKHdpZHRoIC8gZGl2U2l6ZSk7XG4gIGNvbnN0IHlEaXYgPSBNYXRoLmZsb29yKGhlaWdodCAvIGRpdlNpemUpO1xuXG4gIGxldCBtYXhGZWF0dXJlTnVtID0gTWF0aC5mbG9vcih3aWR0aCAvIG9jY1NpemUpICogTWF0aC5mbG9vcihoZWlnaHQgLyBvY2NTaXplKSArIHhEaXYgKiB5RGl2O1xuICAvL2NvbnNvbGUubG9nKFwibWF4IGZlYXR1cmUgbnVtOiBcIiwgbWF4RmVhdHVyZU51bSk7XG5cbiAgY29uc3QgY29vcmRzID0gW107XG4gIGNvbnN0IGltYWdlMiA9IG5ldyBGbG9hdDMyQXJyYXkoaW1hZ2VEYXRhLmxlbmd0aCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaW1hZ2UyLmxlbmd0aDsgaSsrKSB7XG4gICAgaW1hZ2UyW2ldID0gZmVhdHVyZU1hcFtpXTtcbiAgfVxuXG4gIGxldCBudW0gPSAwO1xuICB3aGlsZSAobnVtIDwgbWF4RmVhdHVyZU51bSkge1xuICAgIGxldCBtaW5TaW0gPSBtYXhTaW1UaHJlc2g7XG4gICAgbGV0IGN4ID0gLTE7XG4gICAgbGV0IGN5ID0gLTE7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBoZWlnaHQ7IGorKykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3aWR0aDsgaSsrKSB7XG4gICAgICAgIGlmIChpbWFnZTJbaip3aWR0aCtpXSA8IG1pblNpbSkge1xuICAgICAgICAgIG1pblNpbSA9IGltYWdlMltqKndpZHRoK2ldO1xuICAgICAgICAgIGN4ID0gaTtcbiAgICAgICAgICBjeSA9IGo7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGN4ID09PSAtMSkgYnJlYWs7XG5cbiAgICBjb25zdCB2bGVuID0gX3RlbXBsYXRlVmFyKHtpbWFnZSwgY3g6IGN4LCBjeTogY3ksIHNkVGhyZXNoOiAwLCBpbWFnZURhdGFDdW1zdW0sIGltYWdlRGF0YVNxckN1bXN1bX0pO1xuICAgIGlmICh2bGVuID09PSBudWxsKSB7XG4gICAgICBpbWFnZTJbIGN5ICogd2lkdGggKyBjeCBdID0gMS4wO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmICh2bGVuIC8gKHRlbXBsYXRlU2l6ZSAqIDIgKyAxKSA8IHNkVGhyZXNoKSB7XG4gICAgICBpbWFnZTJbIGN5ICogd2lkdGggKyBjeCBdID0gMS4wO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgbGV0IG1pbiA9IDEuMDtcbiAgICBsZXQgbWF4ID0gLTEuMDtcblxuICAgIGZvciAobGV0IGogPSAtc2VhcmNoU2l6ZTsgaiA8PSBzZWFyY2hTaXplOyBqKyspIHtcbiAgICAgIGZvciAobGV0IGkgPSAtc2VhcmNoU2l6ZTsgaSA8PSBzZWFyY2hTaXplOyBpKyspIHtcbiAgICAgICAgaWYgKGkqaSArIGoqaiA+IHNlYXJjaFNpemUgKiBzZWFyY2hTaXplKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGkgPT09IDAgJiYgaiA9PT0gMCkgY29udGludWU7XG5cbiAgICAgICAgY29uc3Qgc2ltID0gX2dldFNpbWlsYXJpdHkoe2ltYWdlLCB2bGVuLCBjeDogY3graSwgY3k6IGN5K2osIHR4OiBjeCwgdHk6Y3ksIGltYWdlRGF0YUN1bXN1bSwgaW1hZ2VEYXRhU3FyQ3Vtc3VtfSk7XG4gICAgICAgIGlmIChzaW0gPT09IG51bGwpIGNvbnRpbnVlO1xuXG4gICAgICAgIGlmIChzaW0gPCBtaW4pIHtcbiAgICAgICAgICBtaW4gPSBzaW07XG4gICAgICAgICAgaWYgKG1pbiA8IG1pblNpbVRocmVzaCAmJiBtaW4gPCBtaW5TaW0pIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzaW0gPiBtYXgpIHtcbiAgICAgICAgICBtYXggPSBzaW07XG4gICAgICAgICAgaWYgKG1heCA+IDAuOTkpIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiggKG1pbiA8IG1pblNpbVRocmVzaCAmJiBtaW4gPCBtaW5TaW0pIHx8IG1heCA+IDAuOTkgKSBicmVhaztcbiAgICB9XG5cbiAgICBpZiggKG1pbiA8IG1pblNpbVRocmVzaCAmJiBtaW4gPCBtaW5TaW0pIHx8IG1heCA+IDAuOTkgKSB7XG4gICAgICAgIGltYWdlMlsgY3kgKiB3aWR0aCArIGN4IF0gPSAxLjA7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGNvb3Jkcy5wdXNoKHtcbiAgICAgIC8veDogY3gsXG4gICAgICAvL3k6IGN5LFxuICAgICAgLy9teDogMS4wICogY3ggLyBkcGkgKiAyNS40LFxuICAgICAgLy9teTogMS4wICogKGhlaWdodCAtIGN5KSAvIGRwaSAqIDI1LjQsXG4gICAgICBteDogMS4wICogY3ggLyBkcGksXG4gICAgICBteTogMS4wICogKGhlaWdodCAtIGN5KSAvIGRwaSxcbiAgICAgIC8vbWF4U2ltOiBtaW5TaW0sXG4gICAgfSlcblxuICAgIG51bSArPSAxO1xuICAgIC8vY29uc29sZS5sb2cobnVtLCAnKCcsIGN4LCAnLCcsIGN5LCAnKScsIG1pblNpbSwgJ21pbiA9ICcsIG1pbiwgJ21heCA9ICcsIG1heCwgJ3NkID0gJywgdmxlbi8odGVtcGxhdGVTaXplKjIrMSkpO1xuXG4gICAgLy8gbm8gb3RoZXIgZmVhdHVyZSBwb2ludHMgd2l0aGluIG9jY1NpemUgc3F1YXJlXG4gICAgZm9yIChsZXQgaiA9IC1vY2NTaXplOyBqIDw9IG9jY1NpemU7IGorKykge1xuICAgICAgZm9yIChsZXQgaSA9IC1vY2NTaXplOyBpIDw9IG9jY1NpemU7IGkrKykge1xuICAgICAgICBpZiAoY3kgKyBqIDwgMCB8fCBjeSArIGogPj0gaGVpZ2h0IHx8IGN4ICsgaSA8IDAgfHwgY3ggKyBpID49IHdpZHRoKSBjb250aW51ZTtcbiAgICAgICAgaW1hZ2UyWyAoY3kraikqd2lkdGggKyAoY3graSkgXSA9IDEuMDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvb3Jkcztcbn1cblxuLy8gY29tcHV0ZSB2YXJpYW5jZXMgb2YgdGhlIHBpeGVscywgY2VudGVyZWQgYXQgKGN4LCBjeSlcbmNvbnN0IF90ZW1wbGF0ZVZhciA9ICh7aW1hZ2UsIGN4LCBjeSwgc2RUaHJlc2gsIGltYWdlRGF0YUN1bXN1bSwgaW1hZ2VEYXRhU3FyQ3Vtc3VtfSkgPT4ge1xuICBpZiAoY3ggLSBURU1QTEFURV9TSVpFIDwgMCB8fCBjeCArIFRFTVBMQVRFX1NJWkUgPj0gaW1hZ2Uud2lkdGgpIHJldHVybiBudWxsO1xuICBpZiAoY3kgLSBURU1QTEFURV9TSVpFIDwgMCB8fCBjeSArIFRFTVBMQVRFX1NJWkUgPj0gaW1hZ2UuaGVpZ2h0KSByZXR1cm4gbnVsbDtcblxuICBjb25zdCB0ZW1wbGF0ZVdpZHRoID0gMiAqIFRFTVBMQVRFX1NJWkUgKyAxO1xuICBjb25zdCBuUGl4ZWxzID0gdGVtcGxhdGVXaWR0aCAqIHRlbXBsYXRlV2lkdGg7XG5cbiAgbGV0IGF2ZXJhZ2UgPSBpbWFnZURhdGFDdW1zdW0ucXVlcnkoY3ggLSBURU1QTEFURV9TSVpFLCBjeSAtIFRFTVBMQVRFX1NJWkUsIGN4ICsgVEVNUExBVEVfU0laRSwgY3krVEVNUExBVEVfU0laRSk7XG4gIGF2ZXJhZ2UgLz0gblBpeGVscztcblxuICAvL3YgPSBzdW0oKHBpeGVsX2kgLSBhdmcpXjIpIGZvciBhbGwgcGl4ZWwgaSB3aXRoaW4gdGhlIHRlbXBsYXRlXG4gIC8vICA9IHN1bShwaXhlbF9pXjIpIC0gc3VtKDIgKiBhdmcgKiBwaXhlbF9pKSArIHN1bShhdmdeYXZnKVxuXG4gIGxldCB2bGVuID0gaW1hZ2VEYXRhU3FyQ3Vtc3VtLnF1ZXJ5KGN4IC0gVEVNUExBVEVfU0laRSwgY3kgLSBURU1QTEFURV9TSVpFLCBjeCArIFRFTVBMQVRFX1NJWkUsIGN5K1RFTVBMQVRFX1NJWkUpO1xuICB2bGVuIC09IDIgKiBhdmVyYWdlICogaW1hZ2VEYXRhQ3Vtc3VtLnF1ZXJ5KGN4IC0gVEVNUExBVEVfU0laRSwgY3kgLSBURU1QTEFURV9TSVpFLCBjeCArIFRFTVBMQVRFX1NJWkUsIGN5K1RFTVBMQVRFX1NJWkUpO1xuICB2bGVuICs9IG5QaXhlbHMgKiBhdmVyYWdlICogYXZlcmFnZTtcblxuICBpZiAodmxlbiAvIG5QaXhlbHMgPCBzZFRocmVzaCAqIHNkVGhyZXNoKSByZXR1cm4gbnVsbDtcbiAgdmxlbiA9IE1hdGguc3FydCh2bGVuKTtcbiAgcmV0dXJuIHZsZW47XG59XG5cbmNvbnN0IF9nZXRTaW1pbGFyaXR5ID0gKG9wdGlvbnMpID0+IHtcbiAgY29uc3Qge2ltYWdlLCBjeCwgY3ksIHZsZW4sIHR4LCB0eSwgaW1hZ2VEYXRhQ3Vtc3VtLCBpbWFnZURhdGFTcXJDdW1zdW19ID0gb3B0aW9ucztcbiAgY29uc3Qge2RhdGE6IGltYWdlRGF0YSwgd2lkdGgsIGhlaWdodH0gPSBpbWFnZTtcbiAgY29uc3QgdGVtcGxhdGVTaXplID0gVEVNUExBVEVfU0laRTtcblxuICBpZiAoY3ggLSB0ZW1wbGF0ZVNpemUgPCAwIHx8IGN4ICsgdGVtcGxhdGVTaXplID49IHdpZHRoKSByZXR1cm4gbnVsbDtcbiAgaWYgKGN5IC0gdGVtcGxhdGVTaXplIDwgMCB8fCBjeSArIHRlbXBsYXRlU2l6ZSA+PSBoZWlnaHQpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IHRlbXBsYXRlV2lkdGggPSAyICogdGVtcGxhdGVTaXplICsgMTtcblxuICBsZXQgc3ggPSBpbWFnZURhdGFDdW1zdW0ucXVlcnkoY3gtdGVtcGxhdGVTaXplLCBjeS10ZW1wbGF0ZVNpemUsIGN4K3RlbXBsYXRlU2l6ZSwgY3krdGVtcGxhdGVTaXplKTtcbiAgbGV0IHN4eCA9IGltYWdlRGF0YVNxckN1bXN1bS5xdWVyeShjeC10ZW1wbGF0ZVNpemUsIGN5LXRlbXBsYXRlU2l6ZSwgY3grdGVtcGxhdGVTaXplLCBjeSt0ZW1wbGF0ZVNpemUpO1xuICBsZXQgc3h5ID0gMDtcblxuICAvLyAhISBUaGlzIGxvb3AgaXMgdGhlIHBlcmZvcm1hbmNlIGJvdHRsZW5lY2suIFVzZSBtb3ZpbmcgcG9pbnRlcnMgdG8gb3B0aW1pemVcbiAgLy9cbiAgLy8gICBmb3IgKGxldCBpID0gY3ggLSB0ZW1wbGF0ZVNpemUsIGkyID0gdHggLSB0ZW1wbGF0ZVNpemU7IGkgPD0gY3ggKyB0ZW1wbGF0ZVNpemU7IGkrKywgaTIrKykge1xuICAvLyAgICAgZm9yIChsZXQgaiA9IGN5IC0gdGVtcGxhdGVTaXplLCBqMiA9IHR5IC0gdGVtcGxhdGVTaXplOyBqIDw9IGN5ICsgdGVtcGxhdGVTaXplOyBqKyssIGoyKyspIHtcbiAgLy8gICAgICAgc3h5ICs9IGltYWdlRGF0YVtqKndpZHRoICsgaV0gKiBpbWFnZURhdGFbajIqd2lkdGggKyBpMl07XG4gIC8vICAgICB9XG4gIC8vICAgfVxuICAvL1xuICBsZXQgcDEgPSAoY3ktdGVtcGxhdGVTaXplKSAqIHdpZHRoICsgKGN4LXRlbXBsYXRlU2l6ZSk7XG4gIGxldCBwMiA9ICh0eS10ZW1wbGF0ZVNpemUpICogd2lkdGggKyAodHgtdGVtcGxhdGVTaXplKTtcbiAgbGV0IG5leHRSb3dPZmZzZXQgPSB3aWR0aCAtIHRlbXBsYXRlV2lkdGg7XG4gIGZvciAobGV0IGogPSAwOyBqIDwgdGVtcGxhdGVXaWR0aDsgaisrKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZW1wbGF0ZVdpZHRoOyBpKyspIHtcbiAgICAgIHN4eSArPSBpbWFnZURhdGFbcDFdICogaW1hZ2VEYXRhW3AyXTtcbiAgICAgIHAxICs9MTtcbiAgICAgIHAyICs9MTtcbiAgICB9XG4gICAgcDEgKz0gbmV4dFJvd09mZnNldDtcbiAgICBwMiArPSBuZXh0Um93T2Zmc2V0O1xuICB9XG5cbiAgbGV0IHRlbXBsYXRlQXZlcmFnZSA9IGltYWdlRGF0YUN1bXN1bS5xdWVyeSh0eC10ZW1wbGF0ZVNpemUsIHR5LXRlbXBsYXRlU2l6ZSwgdHgrdGVtcGxhdGVTaXplLCB0eSt0ZW1wbGF0ZVNpemUpO1xuICB0ZW1wbGF0ZUF2ZXJhZ2UgLz0gdGVtcGxhdGVXaWR0aCAqIHRlbXBsYXRlV2lkdGg7XG4gIHN4eSAtPSB0ZW1wbGF0ZUF2ZXJhZ2UgKiBzeDtcblxuICBsZXQgdmxlbjIgPSBzeHggLSBzeCpzeCAvICh0ZW1wbGF0ZVdpZHRoICogdGVtcGxhdGVXaWR0aCk7XG4gIGlmICh2bGVuMiA9PSAwKSByZXR1cm4gbnVsbDtcbiAgdmxlbjIgPSBNYXRoLnNxcnQodmxlbjIpO1xuXG4gIC8vIGNvdmFyaWFuY2UgYmV0d2VlbiB0ZW1wbGF0ZSBhbmQgY3VycmVudCBwaXhlbFxuICBjb25zdCBzaW0gPSAxLjAgKiBzeHkgLyAodmxlbiAqIHZsZW4yKTtcbiAgcmV0dXJuIHNpbTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGV4dHJhY3Rcbn07XG4iLCIvLyBmYXN0IDJEIHN1Ym1hdHJpeCBzdW0gdXNpbmcgY3VtdWxhdGl2ZSBzdW0gYWxnb3JpdGhtXG5jbGFzcyBDdW1zdW0ge1xuICBjb25zdHJ1Y3RvcihkYXRhLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy5jdW1zdW0gPSBbXTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGhlaWdodDsgaisrKSB7XG4gICAgICB0aGlzLmN1bXN1bS5wdXNoKFtdKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2lkdGg7IGkrKykge1xuICAgICAgICB0aGlzLmN1bXN1bVtqXS5wdXNoKDApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuY3Vtc3VtWzBdWzBdID0gZGF0YVswXTtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IHdpZHRoOyBpKyspIHtcbiAgICAgIHRoaXMuY3Vtc3VtWzBdW2ldID0gdGhpcy5jdW1zdW1bMF1baS0xXSArIGRhdGFbaV07XG4gICAgfVxuICAgIGZvciAobGV0IGogPSAxOyBqIDwgaGVpZ2h0OyBqKyspIHtcbiAgICAgIHRoaXMuY3Vtc3VtW2pdWzBdID0gdGhpcy5jdW1zdW1bai0xXVswXSArIGRhdGFbaip3aWR0aF07XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaiA9IDE7IGogPCBoZWlnaHQ7IGorKykge1xuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCB3aWR0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuY3Vtc3VtW2pdW2ldID0gZGF0YVtqKndpZHRoK2ldXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyB0aGlzLmN1bXN1bVtqLTFdW2ldXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyB0aGlzLmN1bXN1bVtqXVtpLTFdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLSB0aGlzLmN1bXN1bVtqLTFdW2ktMV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcXVlcnkoeDEsIHkxLCB4MiwgeTIpIHtcbiAgICBsZXQgcmV0ID0gdGhpcy5jdW1zdW1beTJdW3gyXTtcbiAgICBpZiAoeTEgPiAwKSByZXQgLT0gdGhpcy5jdW1zdW1beTEtMV1beDJdO1xuICAgIGlmICh4MSA+IDApIHJldCAtPSB0aGlzLmN1bXN1bVt5Ml1beDEtMV07XG4gICAgaWYgKHgxID4gMCAmJiB5MSA+IDApIHJldCArPSB0aGlzLmN1bXN1bVt5MS0xXVt4MS0xXTtcbiAgICByZXR1cm4gcmV0O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBDdW1zdW1cbn1cbiIsIi8vIHNpbXBsZXIgdmVyc2lvbiBvZiB1cHNhbXBsaW5nLiBiZXR0ZXIgcGVyZm9ybWFuY2VcbmNvbnN0IF91cHNhbXBsZUJpbGluZWFyID0gKHtpbWFnZSwgcGFkT25lV2lkdGgsIHBhZE9uZUhlaWdodH0pID0+IHtcbiAgY29uc3Qge3dpZHRoLCBoZWlnaHQsIGRhdGF9ID0gaW1hZ2U7XG4gIGNvbnN0IGRzdFdpZHRoID0gaW1hZ2Uud2lkdGggKiAyICsgKHBhZE9uZVdpZHRoPzE6MCk7XG4gIGNvbnN0IGRzdEhlaWdodCA9IGltYWdlLmhlaWdodCAqIDIgKyAocGFkT25lSGVpZ2h0PzE6MCk7XG4gIGNvbnN0IHRlbXAgPSBuZXcgRmxvYXQzMkFycmF5KGRzdFdpZHRoICogZHN0SGVpZ2h0KTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHdpZHRoOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGhlaWdodDsgaisrKSB7XG4gICAgICBjb25zdCB2ID0gMC4yNSAqIGRhdGFbaiAqIHdpZHRoICsgaV07XG4gICAgICBjb25zdCBpaSA9IE1hdGguZmxvb3IoaS8yKTtcbiAgICAgIGNvbnN0IGpqID0gTWF0aC5mbG9vcihqLzIpO1xuICAgICAgY29uc3QgcG9zID0gTWF0aC5mbG9vcihqLzIpICogZHN0V2lkdGggKyBNYXRoLmZsb29yKGkvMik7XG4gICAgICB0ZW1wW3Bvc10gKz0gdjtcbiAgICAgIHRlbXBbcG9zKzFdICs9IHY7XG4gICAgICB0ZW1wW3Bvcytkc3RXaWR0aF0gKz0gdjtcbiAgICAgIHRlbXBbcG9zK2RzdFdpZHRoKzFdICs9IHY7XG4gICAgfVxuICB9XG4gIHJldHVybiB7ZGF0YTogdGVtcCwgd2lkdGg6IGRzdFdpZHRoLCBoZWlnaHQ6IGRzdEhlaWdodH07XG59XG5cbi8vIGFydG9vbGtpdCB2ZXJzaW9uLiBzbG93ZXIuIGlzIGl0IG5lY2Vzc2FyeT9cbmNvbnN0IHVwc2FtcGxlQmlsaW5lYXIgPSAoe2ltYWdlLCBwYWRPbmVXaWR0aCwgcGFkT25lSGVpZ2h0fSkgPT4ge1xuICBjb25zdCB7d2lkdGgsIGhlaWdodCwgZGF0YX0gPSBpbWFnZTtcblxuICBjb25zdCBkc3RXaWR0aCA9IGltYWdlLndpZHRoICogMiArIChwYWRPbmVXaWR0aD8xOjApO1xuICBjb25zdCBkc3RIZWlnaHQgPSBpbWFnZS5oZWlnaHQgKiAyICsgKHBhZE9uZUhlaWdodD8xOjApO1xuXG4gIGNvbnN0IHRlbXAgPSBuZXcgRmxvYXQzMkFycmF5KGRzdFdpZHRoICogZHN0SGVpZ2h0KTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBkc3RXaWR0aDsgaSsrKSB7XG4gICAgY29uc3Qgc2kgPSAwLjUgKiBpIC0gMC4yNTtcbiAgICBsZXQgc2kwID0gTWF0aC5mbG9vcihzaSk7XG4gICAgbGV0IHNpMSA9IE1hdGguY2VpbChzaSk7XG4gICAgaWYgKHNpMCA8IDApIHNpMCA9IDA7IC8vIGJvcmRlclxuICAgIGlmIChzaTEgPj0gd2lkdGgpIHNpMSA9IHdpZHRoIC0gMTsgLy8gYm9yZGVyXG5cbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGRzdEhlaWdodDsgaisrKSB7XG4gICAgICBjb25zdCBzaiA9IDAuNSAqIGogLSAwLjI1O1xuICAgICAgbGV0IHNqMCA9IE1hdGguZmxvb3Ioc2opO1xuICAgICAgbGV0IHNqMSA9IE1hdGguY2VpbChzaik7XG4gICAgICBpZiAoc2owIDwgMCkgc2owID0gMDsgLy8gYm9yZGVyXG4gICAgICBpZiAoc2oxID49IGhlaWdodCkgc2oxID0gaGVpZ2h0IC0gMTsgLy9ib3JkZXJcblxuICAgICAgY29uc3QgdmFsdWUgPSAoc2kxIC0gc2kpICogKHNqMSAtIHNqKSAqIGRhdGFbIHNqMCAqIHdpZHRoICsgc2kwIF0gK1xuICAgICAgICAgICAgICAgICAgICAoc2kxIC0gc2kpICogKHNqIC0gc2owKSAqIGRhdGFbIHNqMSAqIHdpZHRoICsgc2kwIF0gK1xuICAgICAgICAgICAgICAgICAgICAoc2kgLSBzaTApICogKHNqMSAtIHNqKSAqIGRhdGFbIHNqMCAqIHdpZHRoICsgc2kxIF0gK1xuICAgICAgICAgICAgICAgICAgICAoc2kgLSBzaTApICogKHNqIC0gc2owKSAqIGRhdGFbIHNqMSAqIHdpZHRoICsgc2kxIF07XG5cbiAgICAgIHRlbXBbaiAqIGRzdFdpZHRoICsgaV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge2RhdGE6IHRlbXAsIHdpZHRoOiBkc3RXaWR0aCwgaGVpZ2h0OiBkc3RIZWlnaHR9O1xufVxuXG5jb25zdCBkb3duc2FtcGxlQmlsaW5lYXIgPSAoe2ltYWdlfSkgPT4ge1xuICBjb25zdCB7ZGF0YSwgd2lkdGgsIGhlaWdodH0gPSBpbWFnZTtcblxuICBjb25zdCBkc3RXaWR0aCA9IE1hdGguZmxvb3Iod2lkdGggLyAyKTtcbiAgY29uc3QgZHN0SGVpZ2h0ID0gTWF0aC5mbG9vcihoZWlnaHQgLyAyKTtcblxuICBjb25zdCB0ZW1wID0gbmV3IEZsb2F0MzJBcnJheShkc3RXaWR0aCAqIGRzdEhlaWdodCk7XG4gIGNvbnN0IG9mZnNldHMgPSBbMCwgMSwgd2lkdGgsIHdpZHRoKzFdO1xuXG4gIGZvciAobGV0IGogPSAwOyBqIDwgZHN0SGVpZ2h0OyBqKyspIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRzdFdpZHRoOyBpKyspIHtcbiAgICAgIGxldCBzcmNQb3MgPSBqKjIgKiB3aWR0aCArIGkqMjtcbiAgICAgIGxldCB2YWx1ZSA9IDAuMDtcbiAgICAgIGZvciAobGV0IGQgPSAwOyBkIDwgb2Zmc2V0cy5sZW5ndGg7IGQrKykge1xuICAgICAgICB2YWx1ZSArPSBkYXRhW3NyY1Bvcysgb2Zmc2V0c1tkXV07XG4gICAgICB9XG4gICAgICB2YWx1ZSAqPSAwLjI1O1xuICAgICAgdGVtcFtqKmRzdFdpZHRoK2ldID0gdmFsdWU7XG4gICAgfVxuICB9XG4gIHJldHVybiB7ZGF0YTogdGVtcCwgd2lkdGg6IGRzdFdpZHRoLCBoZWlnaHQ6IGRzdEhlaWdodH07XG59XG5cbmNvbnN0IHJlc2l6ZSA9ICh7aW1hZ2UsIHJhdGlvfSkgPT4ge1xuICBjb25zdCB3aWR0aCA9IE1hdGgucm91bmQoaW1hZ2Uud2lkdGggKiByYXRpbyk7XG4gIGNvbnN0IGhlaWdodCA9IE1hdGgucm91bmQoaW1hZ2UuaGVpZ2h0ICogcmF0aW8pO1xuXG4gIC8vY29uc3QgaW1hZ2VEYXRhID0gbmV3IEZsb2F0MzJBcnJheSh3aWR0aCAqIGhlaWdodCk7XG4gIGNvbnN0IGltYWdlRGF0YSA9IG5ldyBVaW50OEFycmF5KHdpZHRoICogaGVpZ2h0KTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB3aWR0aDsgaSsrKSB7XG4gICAgbGV0IHNpMSA9IE1hdGgucm91bmQoMS4wICogaSAvIHJhdGlvKTtcbiAgICBsZXQgc2kyID0gTWF0aC5yb3VuZCgxLjAgKiAoaSsxKSAvIHJhdGlvKSAtIDE7XG4gICAgaWYgKHNpMiA+PSBpbWFnZS53aWR0aCkgc2kyID0gaW1hZ2Uud2lkdGggLSAxO1xuXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBoZWlnaHQ7IGorKykge1xuICAgICAgbGV0IHNqMSA9IE1hdGgucm91bmQoMS4wICogaiAvIHJhdGlvKTtcbiAgICAgIGxldCBzajIgPSBNYXRoLnJvdW5kKDEuMCAqIChqKzEpIC8gcmF0aW8pIC0gMTtcbiAgICAgIGlmIChzajIgPj0gaW1hZ2UuaGVpZ2h0KSBzajIgPSBpbWFnZS5oZWlnaHQgLSAxO1xuXG4gICAgICBsZXQgc3VtID0gMDtcbiAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICBmb3IgKGxldCBpaSA9IHNpMTsgaWkgPD0gc2kyOyBpaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGpqID0gc2oxOyBqaiA8PSBzajI7IGpqKyspIHtcbiAgICAgICAgICBzdW0gKz0gKDEuMCAqIGltYWdlLmRhdGFbamogKiBpbWFnZS53aWR0aCArIGlpXSk7XG4gICAgICAgICAgY291bnQgKz0gMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaW1hZ2VEYXRhW2ogKiB3aWR0aCArIGldID0gTWF0aC5mbG9vcihzdW0gLyBjb3VudCk7XG4gICAgfVxuICB9XG4gIHJldHVybiB7ZGF0YTogaW1hZ2VEYXRhLCB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0fTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGRvd25zYW1wbGVCaWxpbmVhcixcbiAgdXBzYW1wbGVCaWxpbmVhcixcbiAgcmVzaXplLFxufVxuXG4iLCJjb25zdCBtUmFuZFNlZWQgPSAxMjM0O1xuXG5jb25zdCBjcmVhdGVSYW5kb21pemVyID0gKCkgPT4ge1xuICBjb25zdCByYW5kb21pemVyID0ge1xuICAgIHNlZWQ6IG1SYW5kU2VlZCxcblxuICAgIGFycmF5U2h1ZmZsZShvcHRpb25zKSB7XG4gICAgICBjb25zdCB7YXJyLCBzYW1wbGVTaXplfSA9IG9wdGlvbnM7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNhbXBsZVNpemU7IGkrKykge1xuXG4gICAgICAgIHRoaXMuc2VlZCA9ICgyMTQwMTMgKiB0aGlzLnNlZWQgKyAyNTMxMDExKSAlICgxIDw8IDMxKTtcbiAgICAgICAgbGV0IGsgPSAodGhpcy5zZWVkID4+IDE2KSAmIDB4N2ZmZjtcbiAgICAgICAgayA9IGsgJSBhcnIubGVuZ3RoO1xuXG4gICAgICAgIGxldCB0bXAgPSBhcnJbaV07XG4gICAgICAgIGFycltpXSA9IGFycltrXTtcbiAgICAgICAgYXJyW2tdID0gdG1wO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBuZXh0SW50KG1heFZhbHVlKSB7XG4gICAgICB0aGlzLnNlZWQgPSAoMjE0MDEzICogdGhpcy5zZWVkICsgMjUzMTAxMSkgJSAoMSA8PCAzMSk7XG4gICAgICBsZXQgayA9ICh0aGlzLnNlZWQgPj4gMTYpICYgMHg3ZmZmO1xuICAgICAgayA9IGsgJSBtYXhWYWx1ZTtcbiAgICAgIHJldHVybiBrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmFuZG9taXplcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNyZWF0ZVJhbmRvbWl6ZXJcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=