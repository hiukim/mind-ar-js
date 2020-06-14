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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/controller.js":
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const {ImageTarget} = __webpack_require__(/*! ./image-target/index.js */ "./src/image-target/index.js");

class Controller {
  constructor() {
    this._imageTargets = [];
  }

  addImageTarget(inputImage) {
    const imageTarget = new ImageTarget(inputImage);
    this._imageTargets.push(imageTarget);
  }

  process(queryImage) {
    this._imageTargets.forEach((imageTarget) => {
      imageTarget.process(queryImage);
    });
  }
}

module.exports = {
  Controller,
}


/***/ }),

/***/ "./src/image-target/image-list.js":
/*!****************************************!*\
  !*** ./src/image-target/image-list.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const {resize} = __webpack_require__(/*! ./utils/images.js */ "./src/image-target/utils/images.js");

const DEFAULT_DPI = 72;
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

  return imageList;
}

module.exports = {
  buildImageList
}


/***/ }),

/***/ "./src/image-target/index.js":
/*!***********************************!*\
  !*** ./src/image-target/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const {resize} = __webpack_require__(/*! ./utils/images.js */ "./src/image-target/utils/images.js");
const {buildImageList} = __webpack_require__(/*! ./image-list.js */ "./src/image-target/image-list.js");
const {createMatcher} = __webpack_require__(/*! ./matching/matcher.js */ "./src/image-target/matching/matcher.js");

class ImageTarget {
  constructor(targetImage) {
    const imageList = buildImageList(targetImage);
    this.matcher = createMatcher(imageList);
  }

  process(queryImage) {
    const processImage = Object.assign(resize({image: queryImage, ratio: 0.5}), {dpi: 72});
    console.log("process", processImage);
    this.matcher.match(processImage);
  }
}

module.exports = {
  ImageTarget
}


/***/ }),

/***/ "./src/image-target/matching/detector.js":
/*!***********************************************!*\
  !*** ./src/image-target/matching/detector.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const {upsampleBilinear, downsampleBilinear} = __webpack_require__(/*! ../utils/images.js */ "./src/image-target/utils/images.js");

const mLaplacianThreshold = 3;
const mMaxSubpixelDistanceSqr = 3 * 3;
const laplacianSqrThreshold = mLaplacianThreshold * mLaplacianThreshold;
const mEdgeThreshold = 4.0;
const hessianThreshold = ((mEdgeThreshold+1) * (mEdgeThreshold+1) / mEdgeThreshold);
const mMaxNumFeaturePoints = 500;
const mNumBuckets = 10; // per dimension

const mNumBins = 36; // = mOrientationAssignment
const mGaussianExpansionFactor = 3.0;
const mSupportRegionExpansionFactor = 1.5;
const mNumSmoothingIterations = 5;
const mPeakThreshold = 0.8;

const ONE_OVER_2PI = 0.159154943091895;

// Detect minima and maximum in Laplacian images
const detect = ({gaussianPyramid, dogPyramid}) => {
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
      image0 = downsampleBilinear({image: image0});
    }

    if ( Math.floor(image1.width/2) == image2.width) {
      hasUpsample = true;
      hasPadOneWidth = image1.width % 2 === 1;
      hasPadOneHeight = image1.height % 2 === 1;
      image2 = upsampleBilinear({image: image2, padOneWidth: hasPadOneWidth, padOneHeight: hasPadOneHeight});
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

        if (v*v < laplacianSqrThreshold) continue;

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
        const newSigma = _effectiveSigma({scale: spScale, octave: octave, mK: mK});

        let newOctaveX = newX * (1.0 / Math.pow(2, octave)) + 0.5 * (1.0 / Math.pow(2, octave)) - 0.5;
        let newOctaveY = newY * (1.0 / Math.pow(2, octave)) + 0.5 * (1.0 / Math.pow(2, octave)) - 0.5;
        newOctaveX = Math.floor(newOctaveX + 0.5);
        newOctaveY = Math.floor(newOctaveY + 0.5);

        subPixelFeaturePoints.push({
          octave: octave,
          scale: scale,
          spScale: spScale,
          score: score,
          edgeScore: edgeScore,
          x: newX,
          y: newY,
          sigma: newSigma,
          octaveX: newOctaveX,
          octaveY: newOctaveY
        })
      }
    }
  }
  const prunedFeaturePoints = _pruneFeatures({featurePoints: subPixelFeaturePoints, width: originalWidth, height: originalHeight});

  // compute feature orientations
  const gradients = _computeGradients({pyramid: gaussianPyramid});


  const orientedFeaturePoints = [];
  for (let i = 0; i < prunedFeaturePoints.length; i++) {
    const fp = prunedFeaturePoints[i];
    const octaveSigma = fp.sigma * (1.0 / Math.pow(2, fp.octave));

    const gradient = gradients[fp.octave * gaussianPyramid.numScalesPerOctaves + fp.scale];
    const angles = _computeOrientation({x: fp.octaveX, y: fp.octaveY, sigma: octaveSigma, octave: fp.octave, scale: fp.scale, gradient: gradient});

    for (let j = 0; j < angles.length; j++) {
      orientedFeaturePoints.push(Object.assign({
        angle: angles[j]
      }, prunedFeaturePoints[i]));
    }
  }
  return orientedFeaturePoints;
  //return {featurePoints, subPixelFeaturePoints, prunedFeaturePoints, orientedFeaturePoints};
}

const _computeOrientation = (options) => {
  const {x, y, sigma, octave, scale, gradient} = options;

  const gwSigma = Math.max(1.0, mGaussianExpansionFactor * sigma);
  const gwScale = -1.0 / (2 * gwSigma * gwSigma);

  const radius = mSupportRegionExpansionFactor * gwSigma;
  const radius2 = Math.ceil( radius * radius );


  const x0 = Math.max(0, x - Math.floor(radius + 0.5));
  const x1 = Math.min(gradient.width-1, x + Math.floor(radius + 0.5));
  const y0 = Math.max(0, y - Math.floor(radius + 0.5));
  const y1 = Math.min(gradient.height-1, y + Math.floor(radius + 0.5));

  const histogram = [];
  for (let i = 0; i < mNumBins; i++) {
    histogram.push(0);
  }

  for (let yp = y0; yp <= y1; yp++) {
    const dy = yp - y;
    const dy2 = dy * dy;

    for (let xp = x0; xp <= x1; xp++) {
      const dx = xp - x;
      const dx2 = dx * dx;

      const r2 = dx2 + dy2;
      if(r2 > radius2) continue; // only use the gradients within the circular window

      const gradientValue = gradient.values[ yp * gradient.width + xp ];
      const angle = gradientValue.angle;
      const mag = gradientValue.mag;

      const w = _fastExp6({x: r2 * gwScale}); // Compute the gaussian weight based on distance from center of keypoint

      const fbin  = mNumBins * angle * ONE_OVER_2PI;

      const bin = Math.floor(fbin - 0.5);
      const w2 = fbin - bin - 0.5;
      const w1 = (1.0 - w2);
      const b1 = (bin + mNumBins) % mNumBins;
      const b2 = (bin + 1) % mNumBins;

      histogram[b1] += w1 * w * mag;
      histogram[b2] += w2 * w * mag;
    }
  }
  //console.log("ori: ", x, y, octave, scale, gwSigma, gwScale, radius, radius2, JSON.stringify(histogram));

  // The orientation histogram is smoothed with a Gaussian
  // sigma=1
  const kernel = [0.274068619061197, 0.451862761877606, 0.274068619061197];
  for(let i = 0; i < mNumSmoothingIterations; i++) {
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

  // Find the peak of the histogram.
  let maxHeight = 0;
  for(let i = 0; i < mNumBins; i++) {
    if(histogram[i] > maxHeight) {
      maxHeight = histogram[i];
    }
  }

  if (maxHeight === 0) {
    return [];
  }

  // Find all the peaks.
  const angles = [];
  for(let i = 0; i < mNumBins; i++) {
    const prev = (i - 1 + histogram.length) % histogram.length;
    const next = (i + 1) % histogram.length;

    if (histogram[i] > mPeakThreshold * maxHeight && histogram[i] > histogram[prev] && histogram[i] > histogram[next]) {
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

      let an =  2.0 * Math.PI * ((fbin + 0.5 + mNumBins) / mNumBins);
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

const _computeGradients = (options) => {
  const {pyramid} = options;
  const gradients = [];

  for (let k = 0; k < pyramid.images.length; k++) {
    const values = [];
    const image = pyramid.images[k];

    for (let j = 0; j < image.height; j++) {
      const prevJ = j > 0? j - 1: j;
      const nextJ = j < image.height - 1? j + 1: j;

      for (let i = 0; i < image.width; i++) {
        const prevI = i > 0? i - 1: i;
        const nextI = i < image.width - 1? i + 1: i;
        const dx = image.data[j * image.width + nextI] - image.data[j * image.width + prevI];
        const dy = image.data[nextJ * image.width + i] - image.data[prevJ * image.width + i];

        values.push({
          angle: Math.atan2(dy, dx) + Math.PI,
          mag: Math.sqrt(dx * dx + dy * dy)
        });
      }
    }
    gradients.push({
      width: image.width,
      height: image.height,
      values: values
    });
  }
  return gradients;
}

const _pruneFeatures = (options) => {
  const {featurePoints, width, height} = options;

  // Note: seems not to be a consistent implementation. Might need to remove this line
  //   The feature points are prune per bucket, e.g. if 501 points in bucket 1, turns out only 5 valid
  //   Similarly, if 500 points all in bucket 1, they all passed because globally <= maxNumFeaturePoints
  if (featurePoints.length <= mMaxNumFeaturePoints) return featurePoints;

  const resultFeaturePoints = [];

  const nBuckets = mNumBuckets * mNumBuckets;
  const nPointsPerBuckets = mMaxNumFeaturePoints / nBuckets;

  const buckets = [];
  for (let i = 0; i < nBuckets; i++) {
    buckets.push([]);
  }

  const dx = Math.ceil(1.0 * width / mNumBuckets);
  const dy = Math.ceil(1.0 * height / mNumBuckets);

  for (let i = 0; i < featurePoints.length; i++) {
    const bucketX = Math.floor(featurePoints[i].x / dx);
    const bucketY = Math.floor(featurePoints[i].y / dy);

    const bucketIndex = bucketY * mNumBuckets + bucketX;
    buckets[bucketIndex].push(featurePoints[i]);
  }

  for (let i = 0; i < mNumBuckets; i++) {
    for (let j = 0; j < mNumBuckets; j++) {
      const bucketIndex = j * mNumBuckets + i;
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
  detect
}



/***/ }),

/***/ "./src/image-target/matching/dog-pyramid.js":
/*!**************************************************!*\
  !*** ./src/image-target/matching/dog-pyramid.js ***!
  \**************************************************/
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

/***/ "./src/image-target/matching/freak-extractor.js":
/*!******************************************************!*\
  !*** ./src/image-target/matching/freak-extractor.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

const numBytesPerFeature = 96;
const mExpansionFactor = 7;

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
  for (let i = 0; i < points.length; i++) {
    const point = points[i];

    // Ensure the scale of the similarity transform is at least "1".
    const transformScale = Math.max(1, point.sigma * mExpansionFactor);

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
      }
    }

    const desc = [];
    for (let i = 0; i < samples.length; i++) {
      for (let j = i+1; j < samples.length; j++) {
        desc.push(samples[i] < samples[j]);
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
        temp = (temp << 1) >>> 0; // >>> 0 to make it unsigned
      }
    }
    descBit.push(temp);

    //descriptors.push(desc);
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

/***/ "./src/image-target/matching/gaussian-pyramid.js":
/*!*******************************************************!*\
  !*** ./src/image-target/matching/gaussian-pyramid.js ***!
  \*******************************************************/
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

const build = ({image, numScalesPerOctaves, minCoarseSize}) => {
  const {data, width, height} = image;

  const numOctaves = _numOctaves({width, height, minSize: minCoarseSize});

  const pyramidImages = [];
  for (let i = 0; i < numOctaves; i++) {
    if (i === 0) {
      pyramidImages.push(_applyFilter({image}));
    } else {
      // first image of each octave, downsample from previous
      pyramidImages.push(downsampleBilinear({image: pyramidImages[pyramidImages.length-1]}));
    }

    // remaining images of octave, 4th order binomail from previous
    for (let j = 0; j < numScalesPerOctaves - 1; j++) {
      if (j === 0) {
        pyramidImages.push(_applyFilter({image: pyramidImages[pyramidImages.length-1]}));
      } else {
        // FIX ME?
        // in artoolkit, it apply filter twice....  is it a bug?
        pyramidImages.push(_applyFilter({image: _applyFilter({image: pyramidImages[pyramidImages.length-1]})}));
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
const _applyFilter = ({image}) => {
  const {data, width, height} = image;
  if (width < 5) {console.log("image too small"); return;}
  if (height < 5) {console.log("image too small"); return;}

  const temp = new Float32Array(data.length);

  // apply horizontal filter. border is computed by extending border pixel
  for (let j = 0; j < height; j++) {
    for (let i = 0; i < width; i++) {
      const pos = j * width + i;

      temp[pos] = data[j*width + Math.max(i-2,0)] +
                  data[j*width + Math.max(i-1,0)] * 4 +
                  data[j*width + i] * 6 +
                  data[j*width + Math.min(i+1,width-1)] * 4 +
                  data[j*width + Math.min(i+2,width-1)];
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

const mMinFeaturePerNode = 16;
const mNumHypotheses =  128;
const mCenters = 8;

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

  if (pointIndexes.length <= mCenters || pointIndexes.length <= mMinFeaturePerNode) {
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
  for (let i = 0; i < mNumHypotheses; i++) {
    randomizer.arrayShuffle({arr: randomPointIndexes, sampleSize: mCenters});

    let sumD = 0;
    const assignment = [];
    for (let j = 0; j < pointIndexes.length; j++) {
      let bestD = Number.MAX_SAFE_INTEGER;
      for (let k = 0; k < mCenters; k++) {
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

/***/ "./src/image-target/matching/matcher.js":
/*!**********************************************!*\
  !*** ./src/image-target/matching/matcher.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const {build: buildGaussianPyramid} = __webpack_require__(/*! ./gaussian-pyramid */ "./src/image-target/matching/gaussian-pyramid.js");
const {build: buildDoGPyramid} = __webpack_require__(/*! ./dog-pyramid */ "./src/image-target/matching/dog-pyramid.js");
const {build: hierarchicalClusteringBuild} = __webpack_require__(/*! ./hierarchical-clustering.js */ "./src/image-target/matching/hierarchical-clustering.js");
const {detect} = __webpack_require__(/*! ./detector */ "./src/image-target/matching/detector.js");
const {extract} = __webpack_require__(/*! ./freak-extractor */ "./src/image-target/matching/freak-extractor.js");

const PYRAMID_NUM_SCALES_PER_OCTAVES = 3;
const PYRAMID_MIN_COARSE_SIZE = 8;
const FEATURE_DENSITY = 100;

const createMatcher = (imageList) => {
  const keyframes = _buildKeyframes({imageList});
  console.log("keyframes", keyframes);

  const matcher = {
    keyframes: keyframes,

    match: (targetImage) => {
      const querypoints = _extractPoints({image: targetImage});
      console.log("querypoints", querypoints);
    }
  }
  return matcher;
}

const _extractPoints = ({image}) => {
  const maxFeatureNum = FEATURE_DENSITY * image.width * image.height / (480.0*360);
  const gaussianPyramid = buildGaussianPyramid({image, minCoarseSize: PYRAMID_MIN_COARSE_SIZE, numScalesPerOctaves: PYRAMID_NUM_SCALES_PER_OCTAVES});

  const dogPyramid = buildDoGPyramid({gaussianPyramid: gaussianPyramid});

  const featurePoints = detect({gaussianPyramid, dogPyramid});

  const descriptors = extract({pyramid: gaussianPyramid, points: featurePoints});

  const keypoints = [];
  for (let i = 0; i < featurePoints.length; i++) {
    keypoints.push({
      x2D: featurePoints[i].x,
      y2D: featurePoints[i].y,
      x3D: (featurePoints[i].x + 0.5) / image.dpi * 25.4, // inch to millimeter
      y3D: ((image.height-0.5) - featurePoints[i].y) / image.dpi * 25.4, // inch to millimeter
      angle: featurePoints[i].angle,
      scale: featurePoints[i].sigma,
      maxima: featurePoints[i].score > 0,
      descriptors: descriptors[i]
    })
  }
  return keypoints;
}

const _buildKeyframes = ({imageList}) => {
  const keyframes = [];

  for (let i = 0; i < imageList.length; i++) {
    const image = imageList[i];
    const keypoints = _extractPoints({image});
    const pointsCluster = hierarchicalClusteringBuild({points: keypoints});
    keyframes.push({points: keypoints, pointsCluster, width: image.width, height: image.height});
  }
  return keyframes;
}

module.exports = {
  createMatcher
}


/***/ }),

/***/ "./src/image-target/utils/images.js":
/*!******************************************!*\
  !*** ./src/image-target/utils/images.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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

  const imageData = new Float32Array(width * height);
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


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const {Controller} = __webpack_require__(/*! ./controller */ "./src/controller.js");

module.exports = window.MINDAR = {
  Controller
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltYWdlLXRhcmdldC9pbWFnZS1saXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9pbWFnZS10YXJnZXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltYWdlLXRhcmdldC9tYXRjaGluZy9kZXRlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2UtdGFyZ2V0L21hdGNoaW5nL2RvZy1weXJhbWlkLmpzIiwid2VicGFjazovLy8uL3NyYy9pbWFnZS10YXJnZXQvbWF0Y2hpbmcvZnJlYWstZXh0cmFjdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9pbWFnZS10YXJnZXQvbWF0Y2hpbmcvZ2F1c3NpYW4tcHlyYW1pZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2UtdGFyZ2V0L21hdGNoaW5nL2hhbW1pbmctZGlzdGFuY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltYWdlLXRhcmdldC9tYXRjaGluZy9oaWVyYXJjaGljYWwtY2x1c3RlcmluZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2UtdGFyZ2V0L21hdGNoaW5nL21hdGNoZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltYWdlLXRhcmdldC91dGlscy9pbWFnZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltYWdlLXRhcmdldC91dGlscy9yYW5kb21pemVyLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMs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QTtBQUNBO0FBQ0EsVUFBVTtBQUNWOztBQUVBLGlCQUFpQixhQUFhO0FBQzlCO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsV0FBVztBQUM1QjtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLFlBQVk7QUFDL0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0IsV0FBVztBQUNuQywwQkFBMEIsV0FBVztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDekZBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWEsZ0JBQWdCO0FBQzdCLHFCQUFxQixnQkFBZ0I7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDaENBLE9BQU8sV0FBVyxHQUFHLG1CQUFPLENBQUMseUNBQWM7O0FBRTNDO0FBQ0E7QUFDQSIsImZpbGUiOiJtaW5kYXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImNvbnN0IHtJbWFnZVRhcmdldH0gPSByZXF1aXJlKCcuL2ltYWdlLXRhcmdldC9pbmRleC5qcycpO1xuXG5jbGFzcyBDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5faW1hZ2VUYXJnZXRzID0gW107XG4gIH1cblxuICBhZGRJbWFnZVRhcmdldChpbnB1dEltYWdlKSB7XG4gICAgY29uc3QgaW1hZ2VUYXJnZXQgPSBuZXcgSW1hZ2VUYXJnZXQoaW5wdXRJbWFnZSk7XG4gICAgdGhpcy5faW1hZ2VUYXJnZXRzLnB1c2goaW1hZ2VUYXJnZXQpO1xuICB9XG5cbiAgcHJvY2VzcyhxdWVyeUltYWdlKSB7XG4gICAgdGhpcy5faW1hZ2VUYXJnZXRzLmZvckVhY2goKGltYWdlVGFyZ2V0KSA9PiB7XG4gICAgICBpbWFnZVRhcmdldC5wcm9jZXNzKHF1ZXJ5SW1hZ2UpO1xuICAgIH0pO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBDb250cm9sbGVyLFxufVxuIiwiY29uc3Qge3Jlc2l6ZX0gPSByZXF1aXJlKFwiLi91dGlscy9pbWFnZXMuanNcIik7XG5cbmNvbnN0IERFRkFVTFRfRFBJID0gNzI7XG5jb25zdCBNSU5fSU1BR0VfUElYRUxfU0laRSA9IDI4O1xuXG4vLyByZXR1cm4gbGlzdCBvZiB7ZGF0YSwgd2lkdGgsIGhlaWdodCwgZHBpfVxuY29uc3QgYnVpbGRJbWFnZUxpc3QgPSAoaW5wdXRJbWFnZSkgPT4ge1xuICBjb25zdCBkcGkgPSBERUZBVUxUX0RQSTtcbiAgY29uc3QgbWluRHBpID0gTWF0aC5mbG9vcigxLjAgKiBNSU5fSU1BR0VfUElYRUxfU0laRSAvIE1hdGgubWluKGlucHV0SW1hZ2Uud2lkdGgsIGlucHV0SW1hZ2UuaGVpZ2h0KSAqIGRwaSAqIDEwMDApIC8gMTAwMDtcbiAgY29uc3QgZHBpTGlzdCA9IFtdO1xuXG4gIGxldCBjID0gbWluRHBpO1xuICB3aGlsZSAodHJ1ZSkge1xuICAgIGRwaUxpc3QucHVzaChjKTtcbiAgICBjICo9IE1hdGgucG93KDIuMCwgMS4wLzMuMCk7XG4gICAgYyA9IE1hdGguZnJvdW5kKGMpOyAvLyBjYW4gcmVtb3ZlIHRoaXMgbGluZSBpbiBwcm9kdWN0aW9uLiB0cnlpbmcgdG8gcmVwcm9kdWNlIHRoZSBzYW1lIHJlc3VsdCBhcyBhcnRvb2xraXQsIHdoaWNoIHVzZSBmbG9hdC5cbiAgICBpZiAoYyA+PSBkcGkgKiAwLjk1KSB7XG4gICAgICBjID0gZHBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIGRwaUxpc3QucHVzaChjKTtcbiAgZHBpTGlzdC5yZXZlcnNlKCk7XG5cbiAgY29uc3QgaW1hZ2VMaXN0ID0gW107IC8vIGxpc3Qgb2Yge2RhdGE6IFt3aWR0aCB4IGhlaWdodF0sIHdpZHRoLCBoZWlnaHR9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZHBpTGlzdC5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHcgPSBpbnB1dEltYWdlLndpZHRoICogZHBpTGlzdFtpXSAvIGRwaTtcbiAgICBjb25zdCBoID0gaW5wdXRJbWFnZS5oZWlnaHQgKiBkcGlMaXN0W2ldIC8gZHBpO1xuICAgIGltYWdlTGlzdC5wdXNoKE9iamVjdC5hc3NpZ24ocmVzaXplKHtpbWFnZTogaW5wdXRJbWFnZSwgcmF0aW86IGRwaUxpc3RbaV0vZHBpfSksIHtkcGk6IGRwaUxpc3RbaV19KSk7XG4gIH1cblxuICByZXR1cm4gaW1hZ2VMaXN0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYnVpbGRJbWFnZUxpc3Rcbn1cbiIsImNvbnN0IHtyZXNpemV9ID0gcmVxdWlyZShcIi4vdXRpbHMvaW1hZ2VzLmpzXCIpO1xuY29uc3Qge2J1aWxkSW1hZ2VMaXN0fSA9IHJlcXVpcmUoJy4vaW1hZ2UtbGlzdC5qcycpO1xuY29uc3Qge2NyZWF0ZU1hdGNoZXJ9ID0gcmVxdWlyZSgnLi9tYXRjaGluZy9tYXRjaGVyLmpzJyk7XG5cbmNsYXNzIEltYWdlVGFyZ2V0IHtcbiAgY29uc3RydWN0b3IodGFyZ2V0SW1hZ2UpIHtcbiAgICBjb25zdCBpbWFnZUxpc3QgPSBidWlsZEltYWdlTGlzdCh0YXJnZXRJbWFnZSk7XG4gICAgdGhpcy5tYXRjaGVyID0gY3JlYXRlTWF0Y2hlcihpbWFnZUxpc3QpO1xuICB9XG5cbiAgcHJvY2VzcyhxdWVyeUltYWdlKSB7XG4gICAgY29uc3QgcHJvY2Vzc0ltYWdlID0gT2JqZWN0LmFzc2lnbihyZXNpemUoe2ltYWdlOiBxdWVyeUltYWdlLCByYXRpbzogMC41fSksIHtkcGk6IDcyfSk7XG4gICAgY29uc29sZS5sb2coXCJwcm9jZXNzXCIsIHByb2Nlc3NJbWFnZSk7XG4gICAgdGhpcy5tYXRjaGVyLm1hdGNoKHByb2Nlc3NJbWFnZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIEltYWdlVGFyZ2V0XG59XG4iLCJjb25zdCB7dXBzYW1wbGVCaWxpbmVhciwgZG93bnNhbXBsZUJpbGluZWFyfSA9IHJlcXVpcmUoJy4uL3V0aWxzL2ltYWdlcy5qcycpO1xuXG5jb25zdCBtTGFwbGFjaWFuVGhyZXNob2xkID0gMztcbmNvbnN0IG1NYXhTdWJwaXhlbERpc3RhbmNlU3FyID0gMyAqIDM7XG5jb25zdCBsYXBsYWNpYW5TcXJUaHJlc2hvbGQgPSBtTGFwbGFjaWFuVGhyZXNob2xkICogbUxhcGxhY2lhblRocmVzaG9sZDtcbmNvbnN0IG1FZGdlVGhyZXNob2xkID0gNC4wO1xuY29uc3QgaGVzc2lhblRocmVzaG9sZCA9ICgobUVkZ2VUaHJlc2hvbGQrMSkgKiAobUVkZ2VUaHJlc2hvbGQrMSkgLyBtRWRnZVRocmVzaG9sZCk7XG5jb25zdCBtTWF4TnVtRmVhdHVyZVBvaW50cyA9IDUwMDtcbmNvbnN0IG1OdW1CdWNrZXRzID0gMTA7IC8vIHBlciBkaW1lbnNpb25cblxuY29uc3QgbU51bUJpbnMgPSAzNjsgLy8gPSBtT3JpZW50YXRpb25Bc3NpZ25tZW50XG5jb25zdCBtR2F1c3NpYW5FeHBhbnNpb25GYWN0b3IgPSAzLjA7XG5jb25zdCBtU3VwcG9ydFJlZ2lvbkV4cGFuc2lvbkZhY3RvciA9IDEuNTtcbmNvbnN0IG1OdW1TbW9vdGhpbmdJdGVyYXRpb25zID0gNTtcbmNvbnN0IG1QZWFrVGhyZXNob2xkID0gMC44O1xuXG5jb25zdCBPTkVfT1ZFUl8yUEkgPSAwLjE1OTE1NDk0MzA5MTg5NTtcblxuLy8gRGV0ZWN0IG1pbmltYSBhbmQgbWF4aW11bSBpbiBMYXBsYWNpYW4gaW1hZ2VzXG5jb25zdCBkZXRlY3QgPSAoe2dhdXNzaWFuUHlyYW1pZCwgZG9nUHlyYW1pZH0pID0+IHtcbiAgY29uc3Qgb3JpZ2luYWxXaWR0aCA9IGRvZ1B5cmFtaWQuaW1hZ2VzWzBdLndpZHRoO1xuICBjb25zdCBvcmlnaW5hbEhlaWdodCA9IGRvZ1B5cmFtaWQuaW1hZ2VzWzBdLmhlaWdodDtcblxuICBjb25zdCBtSyA9IE1hdGgucG93KDIsIDEuMCAvIChnYXVzc2lhblB5cmFtaWQubnVtU2NhbGVzUGVyT2N0YXZlcy0xKSk7XG5cbiAgY29uc3QgZmVhdHVyZVBvaW50cyA9IFtdO1xuICBjb25zdCBzdWJQaXhlbEZlYXR1cmVQb2ludHMgPSBbXTtcblxuICBmb3IgKGxldCBrID0gMTsgayA8IGRvZ1B5cmFtaWQuaW1hZ2VzLmxlbmd0aCAtIDE7IGsrKykge1xuICAgIGxldCBpbWFnZTAgPSBkb2dQeXJhbWlkLmltYWdlc1trLTFdO1xuICAgIGxldCBpbWFnZTEgPSBkb2dQeXJhbWlkLmltYWdlc1trXTtcbiAgICBsZXQgaW1hZ2UyID0gZG9nUHlyYW1pZC5pbWFnZXNbaysxXTtcblxuICAgIGNvbnN0IG9jdGF2ZSA9IE1hdGguZmxvb3IoayAvIGRvZ1B5cmFtaWQubnVtU2NhbGVzUGVyT2N0YXZlcyk7XG4gICAgY29uc3Qgc2NhbGUgPSBrICUgZG9nUHlyYW1pZC5udW1TY2FsZXNQZXJPY3RhdmVzO1xuXG4gICAgbGV0IGhhc1Vwc2FtcGxlID0gZmFsc2U7XG4gICAgbGV0IGhhc1BhZE9uZVdpZHRoID0gZmFsc2U7XG4gICAgbGV0IGhhc1BhZE9uZUhlaWdodCA9IGZhbHNlO1xuXG4gICAgaWYgKCBNYXRoLmZsb29yKGltYWdlMC53aWR0aC8yKSA9PSBpbWFnZTEud2lkdGgpIHtcbiAgICAgIGltYWdlMCA9IGRvd25zYW1wbGVCaWxpbmVhcih7aW1hZ2U6IGltYWdlMH0pO1xuICAgIH1cblxuICAgIGlmICggTWF0aC5mbG9vcihpbWFnZTEud2lkdGgvMikgPT0gaW1hZ2UyLndpZHRoKSB7XG4gICAgICBoYXNVcHNhbXBsZSA9IHRydWU7XG4gICAgICBoYXNQYWRPbmVXaWR0aCA9IGltYWdlMS53aWR0aCAlIDIgPT09IDE7XG4gICAgICBoYXNQYWRPbmVIZWlnaHQgPSBpbWFnZTEuaGVpZ2h0ICUgMiA9PT0gMTtcbiAgICAgIGltYWdlMiA9IHVwc2FtcGxlQmlsaW5lYXIoe2ltYWdlOiBpbWFnZTIsIHBhZE9uZVdpZHRoOiBoYXNQYWRPbmVXaWR0aCwgcGFkT25lSGVpZ2h0OiBoYXNQYWRPbmVIZWlnaHR9KTtcbiAgICB9XG5cbiAgICBjb25zdCB3aWR0aCA9IGltYWdlMS53aWR0aDtcbiAgICBjb25zdCBoZWlnaHQgPSBpbWFnZTEuaGVpZ2h0O1xuXG4gICAgY29uc3QgbmVpZ2hib3VycyA9IFtcbiAgICAgIDAsIC0xLCAxLFxuICAgICAgLWltYWdlMS53aWR0aCwgLWltYWdlMS53aWR0aC0xLCAtaW1hZ2UxLndpZHRoKzEsXG4gICAgICBpbWFnZTEud2lkdGgsIGltYWdlMS53aWR0aC0xLCBpbWFnZTEud2lkdGgrMVxuICAgIF07XG5cbiAgICAvLyBJbiB1cHNhbXBsZSBpbWFnZSwgaWdub3JlIHRoZSBib3JkZXJcbiAgICAvLyBpdCdzIHBvc3NpYmxlIHRvIGZ1cnRoZXIgcGFkIG9uZSBtb3JlIGxpbmUgKGkuZS4gdXBzYWNhbGUgMngyIC0+IDV4NSkgYXQgdGhlIGVuZCwgc28gaWdub3JlIG9uZSBtb3JlIGxpbmVcbiAgICBsZXQgc3RhcnRJID0gaGFzVXBzYW1wbGU/IDI6IDE7XG4gICAgbGV0IHN0YXJ0SiA9IHN0YXJ0STtcblxuICAgIC8vIHNob3VsZCBpdCBiZSBcImltYWdlMS53aWR0aCAtMlwiID8gYnV0IHRoaXMgeWllbGQgY29uc2lzdGVudCByZXN1bHQgd2l0aCBhcnRvb2xraXRcbiAgICBsZXQgZW5kSSA9IGhhc1Vwc2FtcGxlPyBpbWFnZTEud2lkdGggLSAzOiBpbWFnZTEud2lkdGggLSAxO1xuICAgIGxldCBlbmRKID0gaGFzVXBzYW1wbGU/IGltYWdlMS5oZWlnaHQgLSAzOiBpbWFnZTEuaGVpZ2h0IC0gMTtcbiAgICBpZiAoaGFzUGFkT25lV2lkdGgpIGVuZEkgLT0gMTtcbiAgICBpZiAoaGFzUGFkT25lSGVpZ2h0KSBlbmRKIC09IDE7XG5cbiAgICBmb3IgKGxldCBqID0gc3RhcnRKOyBqIDwgZW5kSjsgaisrKSB7XG4gICAgICBmb3IgKGxldCBpID0gc3RhcnRJOyBpIDwgZW5kSTsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHBvcyA9IGoqaW1hZ2UxLndpZHRoICsgaTtcbiAgICAgICAgY29uc3QgdiA9IGltYWdlMS5kYXRhW3Bvc107XG5cbiAgICAgICAgaWYgKHYqdiA8IGxhcGxhY2lhblNxclRocmVzaG9sZCkgY29udGludWU7XG5cbiAgICAgICAgbGV0IGlzTWF4ID0gdHJ1ZTtcbiAgICAgICAgZm9yIChsZXQgZCA9IDA7IGQgPCBuZWlnaGJvdXJzLmxlbmd0aDsgZCsrKSB7XG4gICAgICAgICAgaWYgKHYgPD0gaW1hZ2UwLmRhdGFbcG9zK25laWdoYm91cnNbZF1dKSB7aXNNYXggPSBmYWxzZTsgYnJlYWt9O1xuICAgICAgICAgIGlmICh2IDw9IGltYWdlMi5kYXRhW3BvcytuZWlnaGJvdXJzW2RdXSkge2lzTWF4ID0gZmFsc2U7IGJyZWFrfTtcbiAgICAgICAgICBpZiAoZCAhPT0gMCAmJiB2IDw9IGltYWdlMS5kYXRhW3BvcytuZWlnaGJvdXJzW2RdXSkge2lzTWF4ID0gZmFsc2U7IGJyZWFrfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpc01pbiA9IHRydWU7XG4gICAgICAgIGZvciAobGV0IGQgPSAwOyBkIDwgbmVpZ2hib3Vycy5sZW5ndGg7IGQrKykge1xuICAgICAgICAgIGlmICh2ID49IGltYWdlMC5kYXRhW3BvcytuZWlnaGJvdXJzW2RdXSkge2lzTWluID0gZmFsc2U7IGJyZWFrfTtcbiAgICAgICAgICBpZiAodiA+PSBpbWFnZTIuZGF0YVtwb3MrbmVpZ2hib3Vyc1tkXV0pIHtpc01pbiA9IGZhbHNlOyBicmVha307XG4gICAgICAgICAgaWYgKGQgIT09IDAgJiYgdiA+PSBpbWFnZTEuZGF0YVtwb3MrbmVpZ2hib3Vyc1tkXV0pIHtpc01pbiA9IGZhbHNlOyBicmVha307XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWlzTWF4ICYmICFpc01pbikgY29udGludWU7IC8vIGV4dHJlbWEgLT4gZmVhdHVyZSBwb2ludFxuXG4gICAgICAgIC8vIG9yaWdpbmFsIHggPSB4KjJebiArIDJeKG4tMSkgLSAwLjVcbiAgICAgICAgLy8gb3JpZ2luYWwgeSA9IHkqMl5uICsgMl4obi0xKSAtIDAuNVxuICAgICAgICBjb25zdCBvcmlnaW5hbFggPSBpICogTWF0aC5wb3coMiwgb2N0YXZlKSArIE1hdGgucG93KDIsIG9jdGF2ZS0xKSAtIDAuNTtcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxZID0gaiAqIE1hdGgucG93KDIsIG9jdGF2ZSkgKyBNYXRoLnBvdygyLCBvY3RhdmUtMSkgLSAwLjU7XG4gICAgICAgIGNvbnN0IHNpZ21hID0gX2VmZmVjdGl2ZVNpZ21hKHttSywgc2NhbGUsIG9jdGF2ZX0pO1xuXG4gICAgICAgIGZlYXR1cmVQb2ludHMucHVzaCh7XG4gICAgICAgICAgb2N0YXZlOiBvY3RhdmUsXG4gICAgICAgICAgc2NhbGU6IHNjYWxlLFxuICAgICAgICAgIHNjb3JlOiB2LFxuICAgICAgICAgIHg6IG9yaWdpbmFsWCxcbiAgICAgICAgICB5OiBvcmlnaW5hbFksXG4gICAgICAgICAgc2lnbWE6IHNpZ21hLFxuICAgICAgICB9KVxuXG4gICAgICAgIC8vIENvbXB1dGUgc3BhdGlhbCBkZXJpdmF0aXZlc1xuICAgICAgICBjb25zdCBkeCA9IDAuNSAqIChpbWFnZTEuZGF0YVtwb3MgKyAxXSAtIGltYWdlMS5kYXRhW3BvcyAtIDFdKTtcbiAgICAgICAgY29uc3QgZHkgPSAwLjUgKiAoaW1hZ2UxLmRhdGFbcG9zICsgd2lkdGhdIC0gaW1hZ2UxLmRhdGFbcG9zIC0gd2lkdGhdKTtcbiAgICAgICAgY29uc3QgZHh4ID0gaW1hZ2UxLmRhdGFbcG9zICsgMV0gKyBpbWFnZTEuZGF0YVtwb3MgLSAxXSAtIDIgKiBpbWFnZTEuZGF0YVtwb3NdO1xuICAgICAgICBjb25zdCBkeXkgPSBpbWFnZTEuZGF0YVtwb3MgKyB3aWR0aF0gKyBpbWFnZTEuZGF0YVtwb3MgLSB3aWR0aF0gLSAyICogaW1hZ2UxLmRhdGFbcG9zXTtcbiAgICAgICAgY29uc3QgZHh5ID0gMC4yNSAqIChpbWFnZTEuZGF0YVtwb3MgLSB3aWR0aCAtMV0gKyBpbWFnZTEuZGF0YVtwb3MgKyB3aWR0aCArIDFdIC0gaW1hZ2UxLmRhdGFbcG9zIC0gd2lkdGggKzFdIC0gaW1hZ2UxLmRhdGFbcG9zICsgd2lkdGggLSAxXSk7XG5cbiAgICAgICAgLy8gQ29tcHV0ZSBzY2FsZSBkZXJpdmF0ZXNcbiAgICAgICAgY29uc3QgZHMgPSAwLjUgKiAoaW1hZ2UyLmRhdGFbcG9zXSAtIGltYWdlMC5kYXRhW3Bvc10pO1xuICAgICAgICBjb25zdCBkc3MgPSBpbWFnZTIuZGF0YVtwb3NdICsgaW1hZ2UwLmRhdGFbcG9zXSAtIDIgKiBpbWFnZTEuZGF0YVtwb3NdO1xuICAgICAgICBjb25zdCBkeHMgPSAwLjI1ICogKChpbWFnZTAuZGF0YVtwb3MtMV0gLSBpbWFnZTAuZGF0YVtwb3MrMV0pICsgKC1pbWFnZTIuZGF0YVtwb3MtMV0gKyBpbWFnZTIuZGF0YVtwb3MrMV0pKTtcbiAgICAgICAgY29uc3QgZHlzID0gMC4yNSAqICgoaW1hZ2UwLmRhdGFbcG9zLXdpZHRoXSAtIGltYWdlMC5kYXRhW3Bvcyt3aWR0aF0pICsgKC1pbWFnZTIuZGF0YVtwb3Mtd2lkdGhdICsgaW1hZ2UyLmRhdGFbcG9zK3dpZHRoXSkpO1xuXG4gICAgICAgIC8vIEhlc3NpYW4gbWF0cml4XG4gICAgICAgIGNvbnN0IGhlc3NpYW4gPSBbXG4gICAgICAgICAgZHh4LCBkeHksIGR4cyxcbiAgICAgICAgICBkeHksIGR5eSwgZHlzLFxuICAgICAgICAgIGR4cywgZHlzLCBkc3NcbiAgICAgICAgXTtcblxuICAgICAgICAvLyBiXG4gICAgICAgIGNvbnN0IGIgPSBbXG4gICAgICAgICAgLWR4LFxuICAgICAgICAgIC1keSxcbiAgICAgICAgICAtZHNcbiAgICAgICAgXTtcblxuICAgICAgICAvLyBTb2x2ZSBIICogdSA9IGI7XG4gICAgICAgIGNvbnN0IHUgPSBfc29sdmVTeW1tZXRyaWMzMyh7QTogaGVzc2lhbiwgYjogYn0pO1xuICAgICAgICBpZiAodSA9PT0gbnVsbCkgY29udGludWU7IC8vIG5vIHNvbHV0aW9uXG5cbiAgICAgICAgLy8gSWYgcG9pbnRzIG1vdmUgdG9vIG11Y2ggaW4gdGhlIHN1Yi1waXhlbCB1cGRhdGUsIHRoZW4gdGhlIHBvaW50IHByb2JhYmx5IHVuc3RhYmxlLlxuICAgICAgICBpZiAodVswXSAqIHVbMF0gKyB1WzFdICogdVsxXSA+IG1NYXhTdWJwaXhlbERpc3RhbmNlU3FyKSBjb250aW51ZTtcblxuICAgICAgICAvLyBjb21wdXRlIGVkZ2Ugc2NvcmVcbiAgICAgICAgY29uc3QgZGV0ID0gKGR4eCAqIGR5eSkgLSAoZHh5ICogZHh5KTtcbiAgICAgICAgaWYgKGRldCA9PT0gMCkgY29udGludWU7XG5cbiAgICAgICAgY29uc3QgZWRnZVNjb3JlID0gKGR4eCArIGR5eSkgKiAoZHh4ICsgZHl5KSAvIGRldDtcbiAgICAgICAgaWYgKE1hdGguYWJzKGVkZ2VTY29yZSkgPj0gaGVzc2lhblRocmVzaG9sZCApIGNvbnRpbnVlO1xuXG4gICAgICAgIGNvbnN0IHNjb3JlID0gdiAtIChiWzBdICogdVswXSArIGJbMV0gKiB1WzFdICsgYlsyXSAqIHVbMl0pO1xuICAgICAgICBpZiAoc2NvcmUgKiBzY29yZSA8IGxhcGxhY2lhblNxclRocmVzaG9sZCkgY29udGludWU7XG5cbiAgICAgICAgY29uc3QgbmV3WCA9IG9yaWdpbmFsWCArIHVbMF0gKiBNYXRoLnBvdygyLCBvY3RhdmUpO1xuICAgICAgICBjb25zdCBuZXdZID0gb3JpZ2luYWxZICsgdVsxXSAqIE1hdGgucG93KDIsIG9jdGF2ZSk7XG4gICAgICAgIGlmIChuZXdYIDwgMCB8fCBuZXdYID49IG9yaWdpbmFsV2lkdGggfHwgbmV3WSA8IDAgfHwgbmV3WSA+PSBvcmlnaW5hbEhlaWdodCkgY29udGludWU7XG5cbiAgICAgICAgY29uc3Qgc3BTY2FsZSA9IE1hdGgubWluKE1hdGgubWF4KDAsIHNjYWxlICsgdVsyXSksIGRvZ1B5cmFtaWQubnVtU2NhbGVzUGVyT2N0YXZlcyk7XG4gICAgICAgIGNvbnN0IG5ld1NpZ21hID0gX2VmZmVjdGl2ZVNpZ21hKHtzY2FsZTogc3BTY2FsZSwgb2N0YXZlOiBvY3RhdmUsIG1LOiBtS30pO1xuXG4gICAgICAgIGxldCBuZXdPY3RhdmVYID0gbmV3WCAqICgxLjAgLyBNYXRoLnBvdygyLCBvY3RhdmUpKSArIDAuNSAqICgxLjAgLyBNYXRoLnBvdygyLCBvY3RhdmUpKSAtIDAuNTtcbiAgICAgICAgbGV0IG5ld09jdGF2ZVkgPSBuZXdZICogKDEuMCAvIE1hdGgucG93KDIsIG9jdGF2ZSkpICsgMC41ICogKDEuMCAvIE1hdGgucG93KDIsIG9jdGF2ZSkpIC0gMC41O1xuICAgICAgICBuZXdPY3RhdmVYID0gTWF0aC5mbG9vcihuZXdPY3RhdmVYICsgMC41KTtcbiAgICAgICAgbmV3T2N0YXZlWSA9IE1hdGguZmxvb3IobmV3T2N0YXZlWSArIDAuNSk7XG5cbiAgICAgICAgc3ViUGl4ZWxGZWF0dXJlUG9pbnRzLnB1c2goe1xuICAgICAgICAgIG9jdGF2ZTogb2N0YXZlLFxuICAgICAgICAgIHNjYWxlOiBzY2FsZSxcbiAgICAgICAgICBzcFNjYWxlOiBzcFNjYWxlLFxuICAgICAgICAgIHNjb3JlOiBzY29yZSxcbiAgICAgICAgICBlZGdlU2NvcmU6IGVkZ2VTY29yZSxcbiAgICAgICAgICB4OiBuZXdYLFxuICAgICAgICAgIHk6IG5ld1ksXG4gICAgICAgICAgc2lnbWE6IG5ld1NpZ21hLFxuICAgICAgICAgIG9jdGF2ZVg6IG5ld09jdGF2ZVgsXG4gICAgICAgICAgb2N0YXZlWTogbmV3T2N0YXZlWVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBjb25zdCBwcnVuZWRGZWF0dXJlUG9pbnRzID0gX3BydW5lRmVhdHVyZXMoe2ZlYXR1cmVQb2ludHM6IHN1YlBpeGVsRmVhdHVyZVBvaW50cywgd2lkdGg6IG9yaWdpbmFsV2lkdGgsIGhlaWdodDogb3JpZ2luYWxIZWlnaHR9KTtcblxuICAvLyBjb21wdXRlIGZlYXR1cmUgb3JpZW50YXRpb25zXG4gIGNvbnN0IGdyYWRpZW50cyA9IF9jb21wdXRlR3JhZGllbnRzKHtweXJhbWlkOiBnYXVzc2lhblB5cmFtaWR9KTtcblxuXG4gIGNvbnN0IG9yaWVudGVkRmVhdHVyZVBvaW50cyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHBydW5lZEZlYXR1cmVQb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBmcCA9IHBydW5lZEZlYXR1cmVQb2ludHNbaV07XG4gICAgY29uc3Qgb2N0YXZlU2lnbWEgPSBmcC5zaWdtYSAqICgxLjAgLyBNYXRoLnBvdygyLCBmcC5vY3RhdmUpKTtcblxuICAgIGNvbnN0IGdyYWRpZW50ID0gZ3JhZGllbnRzW2ZwLm9jdGF2ZSAqIGdhdXNzaWFuUHlyYW1pZC5udW1TY2FsZXNQZXJPY3RhdmVzICsgZnAuc2NhbGVdO1xuICAgIGNvbnN0IGFuZ2xlcyA9IF9jb21wdXRlT3JpZW50YXRpb24oe3g6IGZwLm9jdGF2ZVgsIHk6IGZwLm9jdGF2ZVksIHNpZ21hOiBvY3RhdmVTaWdtYSwgb2N0YXZlOiBmcC5vY3RhdmUsIHNjYWxlOiBmcC5zY2FsZSwgZ3JhZGllbnQ6IGdyYWRpZW50fSk7XG5cbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGFuZ2xlcy5sZW5ndGg7IGorKykge1xuICAgICAgb3JpZW50ZWRGZWF0dXJlUG9pbnRzLnB1c2goT2JqZWN0LmFzc2lnbih7XG4gICAgICAgIGFuZ2xlOiBhbmdsZXNbal1cbiAgICAgIH0sIHBydW5lZEZlYXR1cmVQb2ludHNbaV0pKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG9yaWVudGVkRmVhdHVyZVBvaW50cztcbiAgLy9yZXR1cm4ge2ZlYXR1cmVQb2ludHMsIHN1YlBpeGVsRmVhdHVyZVBvaW50cywgcHJ1bmVkRmVhdHVyZVBvaW50cywgb3JpZW50ZWRGZWF0dXJlUG9pbnRzfTtcbn1cblxuY29uc3QgX2NvbXB1dGVPcmllbnRhdGlvbiA9IChvcHRpb25zKSA9PiB7XG4gIGNvbnN0IHt4LCB5LCBzaWdtYSwgb2N0YXZlLCBzY2FsZSwgZ3JhZGllbnR9ID0gb3B0aW9ucztcblxuICBjb25zdCBnd1NpZ21hID0gTWF0aC5tYXgoMS4wLCBtR2F1c3NpYW5FeHBhbnNpb25GYWN0b3IgKiBzaWdtYSk7XG4gIGNvbnN0IGd3U2NhbGUgPSAtMS4wIC8gKDIgKiBnd1NpZ21hICogZ3dTaWdtYSk7XG5cbiAgY29uc3QgcmFkaXVzID0gbVN1cHBvcnRSZWdpb25FeHBhbnNpb25GYWN0b3IgKiBnd1NpZ21hO1xuICBjb25zdCByYWRpdXMyID0gTWF0aC5jZWlsKCByYWRpdXMgKiByYWRpdXMgKTtcblxuXG4gIGNvbnN0IHgwID0gTWF0aC5tYXgoMCwgeCAtIE1hdGguZmxvb3IocmFkaXVzICsgMC41KSk7XG4gIGNvbnN0IHgxID0gTWF0aC5taW4oZ3JhZGllbnQud2lkdGgtMSwgeCArIE1hdGguZmxvb3IocmFkaXVzICsgMC41KSk7XG4gIGNvbnN0IHkwID0gTWF0aC5tYXgoMCwgeSAtIE1hdGguZmxvb3IocmFkaXVzICsgMC41KSk7XG4gIGNvbnN0IHkxID0gTWF0aC5taW4oZ3JhZGllbnQuaGVpZ2h0LTEsIHkgKyBNYXRoLmZsb29yKHJhZGl1cyArIDAuNSkpO1xuXG4gIGNvbnN0IGhpc3RvZ3JhbSA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG1OdW1CaW5zOyBpKyspIHtcbiAgICBoaXN0b2dyYW0ucHVzaCgwKTtcbiAgfVxuXG4gIGZvciAobGV0IHlwID0geTA7IHlwIDw9IHkxOyB5cCsrKSB7XG4gICAgY29uc3QgZHkgPSB5cCAtIHk7XG4gICAgY29uc3QgZHkyID0gZHkgKiBkeTtcblxuICAgIGZvciAobGV0IHhwID0geDA7IHhwIDw9IHgxOyB4cCsrKSB7XG4gICAgICBjb25zdCBkeCA9IHhwIC0geDtcbiAgICAgIGNvbnN0IGR4MiA9IGR4ICogZHg7XG5cbiAgICAgIGNvbnN0IHIyID0gZHgyICsgZHkyO1xuICAgICAgaWYocjIgPiByYWRpdXMyKSBjb250aW51ZTsgLy8gb25seSB1c2UgdGhlIGdyYWRpZW50cyB3aXRoaW4gdGhlIGNpcmN1bGFyIHdpbmRvd1xuXG4gICAgICBjb25zdCBncmFkaWVudFZhbHVlID0gZ3JhZGllbnQudmFsdWVzWyB5cCAqIGdyYWRpZW50LndpZHRoICsgeHAgXTtcbiAgICAgIGNvbnN0IGFuZ2xlID0gZ3JhZGllbnRWYWx1ZS5hbmdsZTtcbiAgICAgIGNvbnN0IG1hZyA9IGdyYWRpZW50VmFsdWUubWFnO1xuXG4gICAgICBjb25zdCB3ID0gX2Zhc3RFeHA2KHt4OiByMiAqIGd3U2NhbGV9KTsgLy8gQ29tcHV0ZSB0aGUgZ2F1c3NpYW4gd2VpZ2h0IGJhc2VkIG9uIGRpc3RhbmNlIGZyb20gY2VudGVyIG9mIGtleXBvaW50XG5cbiAgICAgIGNvbnN0IGZiaW4gID0gbU51bUJpbnMgKiBhbmdsZSAqIE9ORV9PVkVSXzJQSTtcblxuICAgICAgY29uc3QgYmluID0gTWF0aC5mbG9vcihmYmluIC0gMC41KTtcbiAgICAgIGNvbnN0IHcyID0gZmJpbiAtIGJpbiAtIDAuNTtcbiAgICAgIGNvbnN0IHcxID0gKDEuMCAtIHcyKTtcbiAgICAgIGNvbnN0IGIxID0gKGJpbiArIG1OdW1CaW5zKSAlIG1OdW1CaW5zO1xuICAgICAgY29uc3QgYjIgPSAoYmluICsgMSkgJSBtTnVtQmlucztcblxuICAgICAgaGlzdG9ncmFtW2IxXSArPSB3MSAqIHcgKiBtYWc7XG4gICAgICBoaXN0b2dyYW1bYjJdICs9IHcyICogdyAqIG1hZztcbiAgICB9XG4gIH1cbiAgLy9jb25zb2xlLmxvZyhcIm9yaTogXCIsIHgsIHksIG9jdGF2ZSwgc2NhbGUsIGd3U2lnbWEsIGd3U2NhbGUsIHJhZGl1cywgcmFkaXVzMiwgSlNPTi5zdHJpbmdpZnkoaGlzdG9ncmFtKSk7XG5cbiAgLy8gVGhlIG9yaWVudGF0aW9uIGhpc3RvZ3JhbSBpcyBzbW9vdGhlZCB3aXRoIGEgR2F1c3NpYW5cbiAgLy8gc2lnbWE9MVxuICBjb25zdCBrZXJuZWwgPSBbMC4yNzQwNjg2MTkwNjExOTcsIDAuNDUxODYyNzYxODc3NjA2LCAwLjI3NDA2ODYxOTA2MTE5N107XG4gIGZvcihsZXQgaSA9IDA7IGkgPCBtTnVtU21vb3RoaW5nSXRlcmF0aW9uczsgaSsrKSB7XG4gICAgY29uc3Qgb2xkID0gW107XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBoaXN0b2dyYW0ubGVuZ3RoOyBqKyspIHtcbiAgICAgIG9sZFtqXSA9IGhpc3RvZ3JhbVtqXTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGhpc3RvZ3JhbS5sZW5ndGg7IGorKykge1xuICAgICAgaGlzdG9ncmFtW2pdID0ga2VybmVsWzBdICogb2xkWyhqIC0gMSArIGhpc3RvZ3JhbS5sZW5ndGgpICUgaGlzdG9ncmFtLmxlbmd0aF1cbiAgICAgICAgICAgICAgICAgICAgKyBrZXJuZWxbMV0gKiBvbGRbal1cbiAgICAgICAgICAgICAgICAgICAgKyBrZXJuZWxbMl0gKiBvbGRbKGorMSkgJSBoaXN0b2dyYW0ubGVuZ3RoXTtcbiAgICB9XG4gIH1cblxuICAvLyBGaW5kIHRoZSBwZWFrIG9mIHRoZSBoaXN0b2dyYW0uXG4gIGxldCBtYXhIZWlnaHQgPSAwO1xuICBmb3IobGV0IGkgPSAwOyBpIDwgbU51bUJpbnM7IGkrKykge1xuICAgIGlmKGhpc3RvZ3JhbVtpXSA+IG1heEhlaWdodCkge1xuICAgICAgbWF4SGVpZ2h0ID0gaGlzdG9ncmFtW2ldO1xuICAgIH1cbiAgfVxuXG4gIGlmIChtYXhIZWlnaHQgPT09IDApIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICAvLyBGaW5kIGFsbCB0aGUgcGVha3MuXG4gIGNvbnN0IGFuZ2xlcyA9IFtdO1xuICBmb3IobGV0IGkgPSAwOyBpIDwgbU51bUJpbnM7IGkrKykge1xuICAgIGNvbnN0IHByZXYgPSAoaSAtIDEgKyBoaXN0b2dyYW0ubGVuZ3RoKSAlIGhpc3RvZ3JhbS5sZW5ndGg7XG4gICAgY29uc3QgbmV4dCA9IChpICsgMSkgJSBoaXN0b2dyYW0ubGVuZ3RoO1xuXG4gICAgaWYgKGhpc3RvZ3JhbVtpXSA+IG1QZWFrVGhyZXNob2xkICogbWF4SGVpZ2h0ICYmIGhpc3RvZ3JhbVtpXSA+IGhpc3RvZ3JhbVtwcmV2XSAmJiBoaXN0b2dyYW1baV0gPiBoaXN0b2dyYW1bbmV4dF0pIHtcbiAgICAgIC8vIFRoZSBkZWZhdWx0IHN1Yi1waXhlbCBiaW4gbG9jYXRpb24gaXMgdGhlIGRpc2NyZXRlIGxvY2F0aW9uIGlmIHRoZSBxdWFkcmF0aWMgZml0dGluZyBmYWlscy5cbiAgICAgIGxldCBmYmluID0gaTtcblxuICAgICAgY29uc3QgcmV0ID0gX3F1YWRyYXRpYzNQb2ludHMoe1xuICAgICAgICBwMTogW2ktMSwgaGlzdG9ncmFtW3ByZXZdXSxcbiAgICAgICAgcDI6IFtpLCBoaXN0b2dyYW1baV1dLFxuICAgICAgICBwMzogW2krMSwgaGlzdG9ncmFtW25leHRdXVxuICAgICAgfSk7XG5cbiAgICAgIGlmIChyZXQgIT09IG51bGwpIHtcbiAgICAgICAgY29uc3Qge0EsIEIsIEN9ID0gcmV0O1xuXG4gICAgICAgIC8vIEZpbmQgdGhlIGNyaXRpY2FsIHBvaW50IG9mIGEgcXVhZHJhdGljLiB5ID0gQSp4XjIgKyBCKnggKyBDXG4gICAgICAgIGlmIChBICE9IDApIHtcbiAgICAgICAgICBmYmluID0gLUIgLyAoMiAqIEEpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxldCBhbiA9ICAyLjAgKiBNYXRoLlBJICogKChmYmluICsgMC41ICsgbU51bUJpbnMpIC8gbU51bUJpbnMpO1xuICAgICAgd2hpbGUgKGFuID4gMi4wICogTWF0aC5QSSkgeyAvLyBtb2R1bGFcbiAgICAgICAgYW4gLT0gMi4wICogTWF0aC5QSTtcbiAgICAgIH1cbiAgICAgIGFuZ2xlcy5wdXNoKGFuKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFuZ2xlcztcbn1cblxuXG5cbi8qKlxuICogRml0IGEgcXVhdHJhdGljIHRvIDMgcG9pbnRzLiBUaGUgc3lzdGVtIG9mIGVxdWF0aW9ucyBpczpcbiAqXG4gKiB5MCA9IEEqeDBeMiArIEIqeDAgKyBDXG4gKiB5MSA9IEEqeDFeMiArIEIqeDEgKyBDXG4gKiB5MiA9IEEqeDJeMiArIEIqeDIgKyBDXG4gKlxuICogVGhpcyBzeXN0ZW0gb2YgZXF1YXRpb25zIGlzIHNvbHZlZCBmb3IgQSxCLEMuXG4gKi9cbmNvbnN0IF9xdWFkcmF0aWMzUG9pbnRzID0gKG9wdGlvbnMpID0+IHtcbiAgY29uc3Qge3AxLCBwMiwgcDN9ID0gb3B0aW9ucztcbiAgY29uc3QgZDEgPSAocDNbMF0tcDJbMF0pKihwM1swXS1wMVswXSk7XG4gIGNvbnN0IGQyID0gKHAxWzBdLXAyWzBdKSoocDNbMF0tcDFbMF0pO1xuICBjb25zdCBkMyA9IHAxWzBdLXAyWzBdO1xuXG4gIC8vIElmIGFueSBvZiB0aGUgZGVub21pbmF0b3JzIGFyZSB6ZXJvIHRoZW4gcmV0dXJuIEZBTFNFLlxuICBpZiAoZDEgPT0gMCB8fCBkMiA9PSAwIHx8IGQzID09IDApIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IGEgPSBwMVswXSpwMVswXTtcbiAgY29uc3QgYiA9IHAyWzBdKnAyWzBdO1xuXG4gIC8vIFNvbHZlIGZvciB0aGUgY29lZmZpY2llbnRzIEEsQixDXG4gIGNvbnN0IEEgPSAoKHAzWzFdLXAyWzFdKS9kMSktKChwMVsxXS1wMlsxXSkvZDIpO1xuICBjb25zdCBCID0gKChwMVsxXS1wMlsxXSkrKEEqKGItYSkpKS9kMztcbiAgY29uc3QgQyA9IHAxWzFdLShBKmEpLShCKnAxWzBdKTtcblxuICByZXR1cm4ge0EsIEIsIEN9O1xufVxuXG4vKipcbiAqIDAuMDElIGVycm9yIGF0IDEuMDMwXG4gKiAwLjEwJSBlcnJvciBhdCAxLjUyMFxuICogMS4wMCUgZXJyb3IgYXQgMi4zMzBcbiAqIDUuMDAlIGVycm9yIGF0IDMuMjg1XG4gKi9cbmNvbnN0IF9mYXN0RXhwNiA9IChvcHRpb25zKSA9PiB7XG4gIGNvbnN0IHt4fSA9IG9wdGlvbnM7XG4gIHJldHVybiAoNzIwK3gqKDcyMCt4KigzNjAreCooMTIwK3gqKDMwK3gqKDYreCkpKSkpKSowLjAwMTM4ODg4ODg7XG59XG5cbmNvbnN0IF9jb21wdXRlR3JhZGllbnRzID0gKG9wdGlvbnMpID0+IHtcbiAgY29uc3Qge3B5cmFtaWR9ID0gb3B0aW9ucztcbiAgY29uc3QgZ3JhZGllbnRzID0gW107XG5cbiAgZm9yIChsZXQgayA9IDA7IGsgPCBweXJhbWlkLmltYWdlcy5sZW5ndGg7IGsrKykge1xuICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xuICAgIGNvbnN0IGltYWdlID0gcHlyYW1pZC5pbWFnZXNba107XG5cbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGltYWdlLmhlaWdodDsgaisrKSB7XG4gICAgICBjb25zdCBwcmV2SiA9IGogPiAwPyBqIC0gMTogajtcbiAgICAgIGNvbnN0IG5leHRKID0gaiA8IGltYWdlLmhlaWdodCAtIDE/IGogKyAxOiBqO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGltYWdlLndpZHRoOyBpKyspIHtcbiAgICAgICAgY29uc3QgcHJldkkgPSBpID4gMD8gaSAtIDE6IGk7XG4gICAgICAgIGNvbnN0IG5leHRJID0gaSA8IGltYWdlLndpZHRoIC0gMT8gaSArIDE6IGk7XG4gICAgICAgIGNvbnN0IGR4ID0gaW1hZ2UuZGF0YVtqICogaW1hZ2Uud2lkdGggKyBuZXh0SV0gLSBpbWFnZS5kYXRhW2ogKiBpbWFnZS53aWR0aCArIHByZXZJXTtcbiAgICAgICAgY29uc3QgZHkgPSBpbWFnZS5kYXRhW25leHRKICogaW1hZ2Uud2lkdGggKyBpXSAtIGltYWdlLmRhdGFbcHJldkogKiBpbWFnZS53aWR0aCArIGldO1xuXG4gICAgICAgIHZhbHVlcy5wdXNoKHtcbiAgICAgICAgICBhbmdsZTogTWF0aC5hdGFuMihkeSwgZHgpICsgTWF0aC5QSSxcbiAgICAgICAgICBtYWc6IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSlcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIGdyYWRpZW50cy5wdXNoKHtcbiAgICAgIHdpZHRoOiBpbWFnZS53aWR0aCxcbiAgICAgIGhlaWdodDogaW1hZ2UuaGVpZ2h0LFxuICAgICAgdmFsdWVzOiB2YWx1ZXNcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gZ3JhZGllbnRzO1xufVxuXG5jb25zdCBfcHJ1bmVGZWF0dXJlcyA9IChvcHRpb25zKSA9PiB7XG4gIGNvbnN0IHtmZWF0dXJlUG9pbnRzLCB3aWR0aCwgaGVpZ2h0fSA9IG9wdGlvbnM7XG5cbiAgLy8gTm90ZTogc2VlbXMgbm90IHRvIGJlIGEgY29uc2lzdGVudCBpbXBsZW1lbnRhdGlvbi4gTWlnaHQgbmVlZCB0byByZW1vdmUgdGhpcyBsaW5lXG4gIC8vICAgVGhlIGZlYXR1cmUgcG9pbnRzIGFyZSBwcnVuZSBwZXIgYnVja2V0LCBlLmcuIGlmIDUwMSBwb2ludHMgaW4gYnVja2V0IDEsIHR1cm5zIG91dCBvbmx5IDUgdmFsaWRcbiAgLy8gICBTaW1pbGFybHksIGlmIDUwMCBwb2ludHMgYWxsIGluIGJ1Y2tldCAxLCB0aGV5IGFsbCBwYXNzZWQgYmVjYXVzZSBnbG9iYWxseSA8PSBtYXhOdW1GZWF0dXJlUG9pbnRzXG4gIGlmIChmZWF0dXJlUG9pbnRzLmxlbmd0aCA8PSBtTWF4TnVtRmVhdHVyZVBvaW50cykgcmV0dXJuIGZlYXR1cmVQb2ludHM7XG5cbiAgY29uc3QgcmVzdWx0RmVhdHVyZVBvaW50cyA9IFtdO1xuXG4gIGNvbnN0IG5CdWNrZXRzID0gbU51bUJ1Y2tldHMgKiBtTnVtQnVja2V0cztcbiAgY29uc3QgblBvaW50c1BlckJ1Y2tldHMgPSBtTWF4TnVtRmVhdHVyZVBvaW50cyAvIG5CdWNrZXRzO1xuXG4gIGNvbnN0IGJ1Y2tldHMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBuQnVja2V0czsgaSsrKSB7XG4gICAgYnVja2V0cy5wdXNoKFtdKTtcbiAgfVxuXG4gIGNvbnN0IGR4ID0gTWF0aC5jZWlsKDEuMCAqIHdpZHRoIC8gbU51bUJ1Y2tldHMpO1xuICBjb25zdCBkeSA9IE1hdGguY2VpbCgxLjAgKiBoZWlnaHQgLyBtTnVtQnVja2V0cyk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmZWF0dXJlUG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgYnVja2V0WCA9IE1hdGguZmxvb3IoZmVhdHVyZVBvaW50c1tpXS54IC8gZHgpO1xuICAgIGNvbnN0IGJ1Y2tldFkgPSBNYXRoLmZsb29yKGZlYXR1cmVQb2ludHNbaV0ueSAvIGR5KTtcblxuICAgIGNvbnN0IGJ1Y2tldEluZGV4ID0gYnVja2V0WSAqIG1OdW1CdWNrZXRzICsgYnVja2V0WDtcbiAgICBidWNrZXRzW2J1Y2tldEluZGV4XS5wdXNoKGZlYXR1cmVQb2ludHNbaV0pO1xuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBtTnVtQnVja2V0czsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBtTnVtQnVja2V0czsgaisrKSB7XG4gICAgICBjb25zdCBidWNrZXRJbmRleCA9IGogKiBtTnVtQnVja2V0cyArIGk7XG4gICAgICBjb25zdCBidWNrZXQgPSBidWNrZXRzW2J1Y2tldEluZGV4XTtcbiAgICAgIGNvbnN0IG5TZWxlY3RlZCA9IE1hdGgubWluKGJ1Y2tldC5sZW5ndGgsIG5Qb2ludHNQZXJCdWNrZXRzKTtcblxuICAgICAgaWYgKGJ1Y2tldC5sZW5ndGggPiBuU2VsZWN0ZWQpIHtcbiAgICAgICAgYnVja2V0LnNvcnQoKGYxLCBmMikgPT4ge1xuICAgICAgICAgIHJldHVybiBNYXRoLmFicyhmMS5zY29yZSkgPiBNYXRoLmFicyhmMi5zY29yZSk/IC0xOiAxO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgblNlbGVjdGVkOyBrKyspIHtcbiAgICAgICAgcmVzdWx0RmVhdHVyZVBvaW50cy5wdXNoKGJ1Y2tldFtrXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHRGZWF0dXJlUG9pbnRzO1xufVxuXG5jb25zdCBfZWZmZWN0aXZlU2lnbWEgPSAob3B0aW9ucykgPT4ge1xuICBjb25zdCB7bUssIHNjYWxlLCBvY3RhdmV9ID0gb3B0aW9ucztcbiAgY29uc3Qgc2lnbWEgPSBNYXRoLnBvdyhtSywgc2NhbGUpICogKDEgPDwgb2N0YXZlKTtcbiAgcmV0dXJuIHNpZ21hO1xufVxuXG4vLyBzb2x2ZSB4ID0gQWIsIHdoZXJlIEEgaXMgc3ltbWV0cmljXG4vLyBbeDBdICAgW0EwIEExIEEyXSBbYjBdXG4vLyBbeDFdID0gW0EzIEE0IEE1XSBbYjFdXG4vLyBbeDJdICAgW0E2IEE3IEE4XSBbYjJdXG5jb25zdCBfc29sdmVTeW1tZXRyaWMzMyA9IChvcHRpb25zKSA9PiB7XG4gIGNvbnN0IHtBLCBifSA9IG9wdGlvbnM7XG5cbiAgY29uc3QgZGV0ID0gQVswXSAqIEFbNF0gKiBBWzhdXG4gICAgICAgICAgICAtIEFbMF0gKiBBWzVdICogQVs1XVxuICAgICAgICAgICAgLSBBWzRdICogQVsyXSAqIEFbMl1cbiAgICAgICAgICAgIC0gQVs4XSAqIEFbMV0gKiBBWzFdXG4gICAgICAgICAgICArIDIgKiBBWzFdICogQVsyXSAqIEFbNV07XG5cbiAgaWYgKCBNYXRoLmFicyhkZXQpIDwgMC4wMDAwMDAxKSByZXR1cm4gbnVsbDsgLy8gZGV0ZXJtaW5hbnQgdW5kZWZpbmVkLiBubyBzb2x1dGlvblxuXG4gIGNvbnN0IEIgPSBbXTsgLy8gaW52ZXJzZSBvZiBBXG4gIEJbMF0gPSBBWzRdICogQVs4XSAtIEFbNV0gKiBBWzddO1xuICBCWzFdID0gQVsyXSAqIEFbN10gLSBBWzFdICogQVs4XTtcbiAgQlsyXSA9IEFbMV0gKiBBWzVdIC0gQVsyXSAqIEFbNF07XG4gIEJbM10gPSBBWzVdICogQVs2XSAtIEFbM10gKiBBWzhdO1xuICBCWzRdID0gQVswXSAqIEFbOF0gLSBBWzJdICogQVs2XTtcbiAgQls1XSA9IEFbMl0gKiBBWzNdIC0gQVswXSAqIEFbNV07XG4gIEJbNl0gPSBBWzNdICogQVs3XSAtIEFbNF0gKiBBWzZdO1xuICBCWzddID0gQVsxXSAqIEFbNl0gLSBBWzBdICogQVs3XTtcbiAgQls4XSA9IEFbMF0gKiBBWzRdIC0gQVsxXSAqIEFbM107XG5cbiAgY29uc3QgeCA9IFtdO1xuICB4WzBdID0gQlswXSAqIGJbMF0gKyBCWzFdICogYlsxXSArIEJbMl0gKiBiWzJdO1xuICB4WzFdID0gQlszXSAqIGJbMF0gKyBCWzRdICogYlsxXSArIEJbNV0gKiBiWzJdO1xuICB4WzJdID0gQls2XSAqIGJbMF0gKyBCWzddICogYlsxXSArIEJbOF0gKiBiWzJdO1xuXG4gIHhbMF0gPSAxLjAgKiB4WzBdIC8gZGV0O1xuICB4WzFdID0gMS4wICogeFsxXSAvIGRldDtcbiAgeFsyXSA9IDEuMCAqIHhbMl0gLyBkZXQ7XG5cbiAgcmV0dXJuIHg7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBkZXRlY3Rcbn1cblxuIiwiLy8gY29tcHV0ZSBEaWZmZXJlbmNlLW9mLUdhdXNzaWFuIHB5cmFtaWRzIGZyb20gZ2F1c3NpYW4gcHlyYW1pZHNcbi8vXG4vLyBweXJhbWlkID0ge1xuLy8gICBudW1PY3RhdmVzLFxuLy8gICBudW1TY2FsZXNQZXJPY3RhdmVzLFxuLy8gICBpbWFnZXM6IFt7ZGF0YSwgd2lkdGgsIGhlaWdodH0sIHt9LCB7fV0gLy8gaW1hZ2UgYXQgb2N0YXZlIGkgYW5kIHNjYWxlIGogPSBpbWFnZXNbaSAqIG51bVNjYWxlc1Blck9jdGF2ZXMgKyBqXVxuLy8gfVxuXG5jb25zdCBidWlsZCA9ICh7Z2F1c3NpYW5QeXJhbWlkfSkgPT4ge1xuICBjb25zdCBudW1PY3RhdmVzID0gZ2F1c3NpYW5QeXJhbWlkLm51bU9jdGF2ZXM7XG4gIGNvbnN0IG51bVNjYWxlc1Blck9jdGF2ZXMgPSBnYXVzc2lhblB5cmFtaWQubnVtU2NhbGVzUGVyT2N0YXZlcyAtIDE7XG5cbiAgY29uc3QgcHlyYW1pZEltYWdlcyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG51bU9jdGF2ZXM7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgbnVtU2NhbGVzUGVyT2N0YXZlczsgaisrKSB7XG4gICAgICBjb25zdCBpbWFnZTEgPSBnYXVzc2lhblB5cmFtaWQuaW1hZ2VzW2kgKiBnYXVzc2lhblB5cmFtaWQubnVtU2NhbGVzUGVyT2N0YXZlcyArIGpdO1xuICAgICAgY29uc3QgaW1hZ2UyID0gZ2F1c3NpYW5QeXJhbWlkLmltYWdlc1tpICogZ2F1c3NpYW5QeXJhbWlkLm51bVNjYWxlc1Blck9jdGF2ZXMgKyBqICsgMV07XG4gICAgICBweXJhbWlkSW1hZ2VzLnB1c2goICBfZGlmZmVyZW5jZUltYWdlQmlub21pYWwoe2ltYWdlMSwgaW1hZ2UyfSkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4ge1xuICAgIG51bU9jdGF2ZXMsXG4gICAgbnVtU2NhbGVzUGVyT2N0YXZlcyxcbiAgICBpbWFnZXM6IHB5cmFtaWRJbWFnZXNcbiAgfVxufVxuXG5jb25zdCBfZGlmZmVyZW5jZUltYWdlQmlub21pYWwgPSAoe2ltYWdlMSwgaW1hZ2UyfSkgPT4ge1xuICBpZiAoaW1hZ2UxLmRhdGEubGVuZ3RoICE9PSBpbWFnZTIuZGF0YS5sZW5ndGgpIHtcbiAgICB0aHJvdyBcImltYWdlIGxlbmd0aCBkb2Vzbid0IG1hdGNoXCI7XG4gIH1cblxuICBjb25zdCBkYXRhID0gbmV3IEZsb2F0MzJBcnJheShpbWFnZTEuZGF0YS5sZW5ndGgpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGltYWdlMS5kYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgZGF0YVtpXSA9IGltYWdlMS5kYXRhW2ldIC0gaW1hZ2UyLmRhdGFbaV07XG4gIH1cbiAgcmV0dXJuIHtkYXRhOiBkYXRhLCB3aWR0aDogaW1hZ2UxLndpZHRoLCBoZWlnaHQ6IGltYWdlMS5oZWlnaHR9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYnVpbGRcbn07XG4iLCJjb25zdCBudW1CeXRlc1BlckZlYXR1cmUgPSA5NjtcbmNvbnN0IG1FeHBhbnNpb25GYWN0b3IgPSA3O1xuXG4vLyAzNyBwb2ludHMgPSA2IHJpbmdzIHggNiBwb2ludHMgcGVyIHJpbmcgKyAxIGNlbnRlclxuY29uc3QgRlJFQUtfUklOR1MgPSBbXG4gIC8vIHJpbmcgNVxuICB7XG4gICAgc2lnbWE6IDAuNTUwMDAwLFxuICAgIHBvaW50czogW1xuICAgICAgWy0xLjAwMDAwMCwgMC4wMDAwMDBdLFxuICAgICAgWy0wLjUwMDAwMCwgLTAuODY2MDI1XSxcbiAgICAgIFswLjUwMDAwMCwgLTAuODY2MDI1XSxcbiAgICAgIFsxLjAwMDAwMCwgLTAuMDAwMDAwXSxcbiAgICAgIFswLjUwMDAwMCwgMC44NjYwMjVdLFxuICAgICAgWy0wLjUwMDAwMCwgMC44NjYwMjVdXG4gICAgXVxuICB9LFxuICAvLyByaW5nIDRcbiAge1xuICAgIHNpZ21hOiAwLjQ3NTAwMCxcbiAgICBwb2ludHM6IFtcbiAgICAgIFswLjAwMDAwMCwgMC45MzA5NjldLFxuICAgICAgWy0wLjgwNjI0MywgMC40NjU0ODVdLFxuICAgICAgWy0wLjgwNjI0MywgLTAuNDY1NDg1XSxcbiAgICAgIFstMC4wMDAwMDAsIC0wLjkzMDk2OV0sXG4gICAgICBbMC44MDYyNDMsIC0wLjQ2NTQ4NV0sXG4gICAgICBbMC44MDYyNDMsIDAuNDY1NDg1XVxuICAgIF1cbiAgfSxcbiAgLy8gcmluZyAzXG4gIHtcbiAgICBzaWdtYTogMC40MDAwMDAsXG4gICAgcG9pbnRzOiBbXG4gICAgICBbMC44NDczMDYsIC0wLjAwMDAwMF0sXG4gICAgICBbMC40MjM2NTMsIDAuNzMzNzg5XSxcbiAgICAgIFstMC40MjM2NTMsIDAuNzMzNzg5XSxcbiAgICAgIFstMC44NDczMDYsIDAuMDAwMDAwXSxcbiAgICAgIFstMC40MjM2NTMsIC0wLjczMzc4OV0sXG4gICAgICBbMC40MjM2NTMsIC0wLjczMzc4OV1cbiAgICBdXG4gIH0sXG4gIC8vIHJpbmcgMlxuICB7XG4gICAgc2lnbWE6IDAuMzI1MDAwLFxuICAgIHBvaW50czogW1xuICAgICAgWy0wLjAwMDAwMCwgLTAuNzQxMDk0XSxcbiAgICAgIFswLjY0MTgwNiwgLTAuMzcwNTQ3XSxcbiAgICAgIFswLjY0MTgwNiwgMC4zNzA1NDddLFxuICAgICAgWzAuMDAwMDAwLCAwLjc0MTA5NF0sXG4gICAgICBbLTAuNjQxODA2LCAwLjM3MDU0N10sXG4gICAgICBbLTAuNjQxODA2LCAtMC4zNzA1NDddXG4gICAgXVxuICB9LFxuICAvLyByaW5nIDFcbiAge1xuICAgIHNpZ21hOiAwLjI1MDAwMCxcbiAgICBwb2ludHM6IFtcbiAgICAgIFstMC41OTU1MDIsIDAuMDAwMDAwXSxcbiAgICAgIFstMC4yOTc3NTEsIC0wLjUxNTcyMF0sXG4gICAgICBbMC4yOTc3NTEsIC0wLjUxNTcyMF0sXG4gICAgICBbMC41OTU1MDIsIC0wLjAwMDAwMF0sXG4gICAgICBbMC4yOTc3NTEsIDAuNTE1NzIwXSxcbiAgICAgIFstMC4yOTc3NTEsIDAuNTE1NzIwXVxuICAgIF1cbiAgfSxcbiAgLy8gcmluZyAwXG4gIHtcbiAgICBzaWdtYTogMC4xNzUwMDAsXG4gICAgcG9pbnRzOiBbXG4gICAgICBbMC4wMDAwMDAsIDAuMzYyNzgzXSxcbiAgICAgIFstMC4zMTQxNzksIDAuMTgxMzkxXSxcbiAgICAgIFstMC4zMTQxNzksIC0wLjE4MTM5MV0sXG4gICAgICBbLTAuMDAwMDAwLCAtMC4zNjI3ODNdLFxuICAgICAgWzAuMzE0MTc5LCAtMC4xODEzOTFdLFxuICAgICAgWzAuMzE0MTc5LCAwLjE4MTM5MV1cbiAgICBdXG4gIH0sXG4gIC8vIGNlbnRlclxuICB7XG4gICAgc2lnbWE6IDAuMTAwMDAwLFxuICAgIHBvaW50czogW1xuICAgICAgWzAsIDBdXG4gICAgXVxuICB9XG5dXG5cbi8vIHB5cmFtaWQ6IGdhdXNzaWFuIHB5cmFtaWRcbmNvbnN0IGV4dHJhY3QgPSAob3B0aW9ucykgPT4ge1xuICBjb25zdCB7cHlyYW1pZCwgcG9pbnRzfSA9IG9wdGlvbnM7XG5cbiAgY29uc3QgbUsgPSBNYXRoLnBvdygyLCAxLjAgLyAocHlyYW1pZC5udW1TY2FsZXNQZXJPY3RhdmVzLTEpKTtcbiAgY29uc3Qgb25lT3ZlckxvZ0sgPSAxLjAgLyBNYXRoLmxvZyhtSyk7XG5cbiAgY29uc3QgZGVzY3JpcHRvcnMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBwb2ludCA9IHBvaW50c1tpXTtcblxuICAgIC8vIEVuc3VyZSB0aGUgc2NhbGUgb2YgdGhlIHNpbWlsYXJpdHkgdHJhbnNmb3JtIGlzIGF0IGxlYXN0IFwiMVwiLlxuICAgIGNvbnN0IHRyYW5zZm9ybVNjYWxlID0gTWF0aC5tYXgoMSwgcG9pbnQuc2lnbWEgKiBtRXhwYW5zaW9uRmFjdG9yKTtcblxuICAgIC8vIFRyYW5zZm9ybWF0aW9uIGZyb20gY2Fub25pY2FsIHRlc3QgbG9jYXRpb25zIHRvIGltYWdlXG4gICAgY29uc3QgUyA9IF9zaW1pbGFyaXR5TWF0cml4KHtzY2FsZTogdHJhbnNmb3JtU2NhbGUsIGFuZ2xlOiBwb2ludC5hbmdsZSwgeDogcG9pbnQueCwgeTogcG9pbnQueX0pO1xuXG4gICAgLy9jb25zb2xlLmxvZyhcIlM6IFwiLCBwb2ludC5zY2FsZSwgcG9pbnQuYW5nbGUsIFMpO1xuXG4gICAgY29uc3Qgc2FtcGxlcyA9IFtdO1xuICAgIGZvciAobGV0IHIgPSAwOyByIDwgRlJFQUtfUklOR1MubGVuZ3RoOyByKyspIHtcbiAgICAgIGNvbnN0IHNpZ21hID0gdHJhbnNmb3JtU2NhbGUgKiBGUkVBS19SSU5HU1tyXS5zaWdtYTtcblxuICAgICAgbGV0IG9jdGF2ZSA9IE1hdGguZmxvb3IoTWF0aC5sb2cyKHNpZ21hKSk7XG4gICAgICBjb25zdCBmc2NhbGUgPSBNYXRoLmxvZyhzaWdtYSAvIE1hdGgucG93KDIsIG9jdGF2ZSkpICogb25lT3ZlckxvZ0s7XG4gICAgICBsZXQgc2NhbGUgPSBNYXRoLnJvdW5kKGZzY2FsZSk7XG5cbiAgICAgIC8vIHNnaW1hIG9mIGxhc3Qgc2NhbGUgPSAgc2lnbWEgb2YgdGhlIGZpcnN0IHNjYWxlIGluIG5leHQgb2N0YXZlXG4gICAgICAvLyBwcmVmZXIgY29hcnNlciBvY3RhdmVzIGZvciBlZmZpY2llbmN5XG4gICAgICBpZiAoc2NhbGUgPT09IHB5cmFtaWQubnVtU2NhbGVzUGVyT2N0YXZlcyAtIDEpIHtcbiAgICAgICAgb2N0YXZlID0gb2N0YXZlICsgMTtcbiAgICAgICAgc2NhbGUgPSAwO1xuICAgICAgfVxuICAgICAgLy8gY2xpcCBvY3RhdmUgYW5kIHNjYWxlXG4gICAgICBpZiAob2N0YXZlIDwgMCkge1xuICAgICAgICBvY3RhdmUgPSAwO1xuICAgICAgICBzY2FsZSA9IDA7XG4gICAgICB9XG4gICAgICBpZiAob2N0YXZlID49IHB5cmFtaWQubnVtT2N0YXZlcykge1xuICAgICAgICBvY3RhdmUgPSBweXJhbWlkLm51bU9jdGF2ZXMgLSAxO1xuICAgICAgICBzY2FsZSA9IHB5cmFtaWQubnVtU2NhbGVzUGVyT2N0YXZlcyAtIDE7XG4gICAgICB9XG5cbiAgICAgIC8vIGZvciBkb3duc2FtcGxlIHBvaW50XG4gICAgICBjb25zdCBpbWFnZSA9IHB5cmFtaWQuaW1hZ2VzW29jdGF2ZSAqIHB5cmFtaWQubnVtU2NhbGVzUGVyT2N0YXZlcyArIHNjYWxlXTtcbiAgICAgIGNvbnN0IGEgPSAxLjAgLyAoTWF0aC5wb3coMiwgb2N0YXZlKSk7XG4gICAgICBjb25zdCBiID0gMC41ICogYSAtIDAuNTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBGUkVBS19SSU5HU1tyXS5wb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgcG9pbnQgPSBGUkVBS19SSU5HU1tyXS5wb2ludHNbaV07XG4gICAgICAgIGNvbnN0IHggPSBTWzBdICogcG9pbnRbMF0gKyBTWzFdICogcG9pbnRbMV0gKyBTWzJdO1xuICAgICAgICBjb25zdCB5ID0gU1szXSAqIHBvaW50WzBdICsgU1s0XSAqIHBvaW50WzFdICsgU1s1XTtcblxuICAgICAgICBsZXQgeHAgPSB4ICogYSArIGI7IC8vIHggaW4gb2N0YXZlXG4gICAgICAgIGxldCB5cCA9IHkgKiBhICsgYjsgLy8geSBpbiBvY3RhdmVcbiAgICAgICAgLy8gYmlsaW5lYXIgaW50ZXJwb2xhdGlvblxuICAgICAgICB4cCA9IE1hdGgubWF4KDAsIE1hdGgubWluKHhwLCBpbWFnZS53aWR0aCAtIDIpKTtcbiAgICAgICAgeXAgPSBNYXRoLm1heCgwLCBNYXRoLm1pbih5cCwgaW1hZ2UuaGVpZ2h0IC0gMikpO1xuXG4gICAgICAgIGNvbnN0IHgwID0gTWF0aC5mbG9vcih4cCk7XG4gICAgICAgIGNvbnN0IHgxID0geDAgKyAxO1xuICAgICAgICBjb25zdCB5MCA9IE1hdGguZmxvb3IoeXApO1xuICAgICAgICBjb25zdCB5MSA9IHkwICsgMTtcblxuICAgICAgICBjb25zdCB2YWx1ZSA9ICh4MS14cCkgKiAoeTEteXApICogaW1hZ2UuZGF0YVt5MCAqIGltYWdlLndpZHRoICsgeDBdXG4gICAgICAgICAgICAgICAgICAgICsgKHhwLXgwKSAqICh5MS15cCkgKiBpbWFnZS5kYXRhW3kwICogaW1hZ2Uud2lkdGggKyB4MV1cbiAgICAgICAgICAgICAgICAgICAgKyAoeDEteHApICogKHlwLXkwKSAqIGltYWdlLmRhdGFbeTEgKiBpbWFnZS53aWR0aCArIHgwXVxuICAgICAgICAgICAgICAgICAgICArICh4cC14MCkgKiAoeXAteTApICogaW1hZ2UuZGF0YVt5MSAqIGltYWdlLndpZHRoICsgeDFdO1xuXG4gICAgICAgIHNhbXBsZXMucHVzaCh2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZGVzYyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2FtcGxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IGkrMTsgaiA8IHNhbXBsZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgZGVzYy5wdXNoKHNhbXBsZXNbaV0gPCBzYW1wbGVzW2pdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBlbmNvZGUgZGVzY3JpcHRvcnMgaW4gYmluYXJ5IGZvcm1hdFxuICAgIC8vIDM3IHNhbXBsZXMgPSAxKzIrMysuLi4rMzYgPSA2NjYgY29tcGFyaXNvbnMgPSA2NjYgYml0c1xuICAgIC8vIGNlaWwoNjY2LzMyKSA9IDg0IG51bWJlcnMgKDMyYml0IG51bWJlcilcbiAgICBjb25zdCBkZXNjQml0ID0gW107XG4gICAgbGV0IHRlbXAgPSAwO1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZXNjLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoZGVzY1tpXSkgdGVtcCArPSAxO1xuICAgICAgY291bnQgKz0gMTtcbiAgICAgIGlmIChjb3VudCA9PT0gMzIpIHtcbiAgICAgICAgZGVzY0JpdC5wdXNoKHRlbXApO1xuICAgICAgICB0ZW1wID0gMDtcbiAgICAgICAgY291bnQgPSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGVtcCA9ICh0ZW1wIDw8IDEpID4+PiAwOyAvLyA+Pj4gMCB0byBtYWtlIGl0IHVuc2lnbmVkXG4gICAgICB9XG4gICAgfVxuICAgIGRlc2NCaXQucHVzaCh0ZW1wKTtcblxuICAgIC8vZGVzY3JpcHRvcnMucHVzaChkZXNjKTtcbiAgICBkZXNjcmlwdG9ycy5wdXNoKGRlc2NCaXQpO1xuICB9XG4gIHJldHVybiBkZXNjcmlwdG9ycztcbn1cblxuY29uc3QgX3NpbWlsYXJpdHlNYXRyaXggPSAob3B0aW9ucykgPT4ge1xuICBjb25zdCB7c2NhbGUsIGFuZ2xlLCB4LCB5fSA9IG9wdGlvbnM7XG4gIGNvbnN0IGMgPSBzY2FsZSAqIE1hdGguY29zKGFuZ2xlKTtcbiAgY29uc3QgcyA9IHNjYWxlICogTWF0aC5zaW4oYW5nbGUpO1xuXG4gIGNvbnN0IFMgPSBbXG4gICAgYywgLXMsIHgsXG4gICAgcywgYywgeSxcbiAgICAwLCAwLCAxXG4gIF1cbiAgcmV0dXJuIFM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBleHRyYWN0XG59XG4iLCJjb25zdCB7ZG93bnNhbXBsZUJpbGluZWFyfSA9IHJlcXVpcmUoJy4uL3V0aWxzL2ltYWdlcy5qcycpO1xuXG4vLyBCdWlsZCBhIGd1c3NpYW4gcHlyYW1pZCwgd2l0aCB0aGUgZm9sbG93aW5nIHN0cnVjdHVyZTpcbi8vXG4vLyBweXJhbWlkID0ge1xuLy8gICBudW1PY3RhdmVzLFxuLy8gICBudW1TY2FsZXNQZXJPY3RhdmVzLFxuLy8gICBpbWFnZXM6IFt7ZGF0YSwgd2lkdGgsIGhlaWdodH0sIHt9LCB7fV0gLy8gaW1hZ2UgYXQgb2N0YXZlIGkgYW5kIHNjYWxlIGogPSBpbWFnZXNbaSAqIG51bVNjYWxlc1Blck9jdGF2ZXMgKyBqXVxuLy8gfVxuXG5jb25zdCBidWlsZCA9ICh7aW1hZ2UsIG51bVNjYWxlc1Blck9jdGF2ZXMsIG1pbkNvYXJzZVNpemV9KSA9PiB7XG4gIGNvbnN0IHtkYXRhLCB3aWR0aCwgaGVpZ2h0fSA9IGltYWdlO1xuXG4gIGNvbnN0IG51bU9jdGF2ZXMgPSBfbnVtT2N0YXZlcyh7d2lkdGgsIGhlaWdodCwgbWluU2l6ZTogbWluQ29hcnNlU2l6ZX0pO1xuXG4gIGNvbnN0IHB5cmFtaWRJbWFnZXMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1PY3RhdmVzOyBpKyspIHtcbiAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgcHlyYW1pZEltYWdlcy5wdXNoKF9hcHBseUZpbHRlcih7aW1hZ2V9KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGZpcnN0IGltYWdlIG9mIGVhY2ggb2N0YXZlLCBkb3duc2FtcGxlIGZyb20gcHJldmlvdXNcbiAgICAgIHB5cmFtaWRJbWFnZXMucHVzaChkb3duc2FtcGxlQmlsaW5lYXIoe2ltYWdlOiBweXJhbWlkSW1hZ2VzW3B5cmFtaWRJbWFnZXMubGVuZ3RoLTFdfSkpO1xuICAgIH1cblxuICAgIC8vIHJlbWFpbmluZyBpbWFnZXMgb2Ygb2N0YXZlLCA0dGggb3JkZXIgYmlub21haWwgZnJvbSBwcmV2aW91c1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgbnVtU2NhbGVzUGVyT2N0YXZlcyAtIDE7IGorKykge1xuICAgICAgaWYgKGogPT09IDApIHtcbiAgICAgICAgcHlyYW1pZEltYWdlcy5wdXNoKF9hcHBseUZpbHRlcih7aW1hZ2U6IHB5cmFtaWRJbWFnZXNbcHlyYW1pZEltYWdlcy5sZW5ndGgtMV19KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGSVggTUU/XG4gICAgICAgIC8vIGluIGFydG9vbGtpdCwgaXQgYXBwbHkgZmlsdGVyIHR3aWNlLi4uLiAgaXMgaXQgYSBidWc/XG4gICAgICAgIHB5cmFtaWRJbWFnZXMucHVzaChfYXBwbHlGaWx0ZXIoe2ltYWdlOiBfYXBwbHlGaWx0ZXIoe2ltYWdlOiBweXJhbWlkSW1hZ2VzW3B5cmFtaWRJbWFnZXMubGVuZ3RoLTFdfSl9KSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29uc3QgcHlyYW1pZCA9IHtcbiAgICBudW1PY3RhdmVzOiBudW1PY3RhdmVzLFxuICAgIG51bVNjYWxlc1Blck9jdGF2ZXM6IG51bVNjYWxlc1Blck9jdGF2ZXMsXG4gICAgaW1hZ2VzOiBweXJhbWlkSW1hZ2VzXG4gIH1cbiAgcmV0dXJuIHB5cmFtaWQ7XG59XG5cbmNvbnN0IF9udW1PY3RhdmVzID0gKG9wdGlvbnMpID0+IHtcbiAgbGV0IHt3aWR0aCwgaGVpZ2h0LCBtaW5TaXplfSA9IG9wdGlvbnM7XG4gIGxldCBudW1PY3RhdmVzID0gMDtcbiAgd2hpbGUgKHdpZHRoID49IG1pblNpemUgJiYgaGVpZ2h0ID49IG1pblNpemUpIHtcbiAgICB3aWR0aCAvPSAyO1xuICAgIGhlaWdodCAvPSAyO1xuICAgIG51bU9jdGF2ZXMrKztcbiAgfVxuICByZXR1cm4gbnVtT2N0YXZlcztcbn1cblxuLy80dGggb3JkZXIgYmlub21pYWxcbmNvbnN0IF9hcHBseUZpbHRlciA9ICh7aW1hZ2V9KSA9PiB7XG4gIGNvbnN0IHtkYXRhLCB3aWR0aCwgaGVpZ2h0fSA9IGltYWdlO1xuICBpZiAod2lkdGggPCA1KSB7Y29uc29sZS5sb2coXCJpbWFnZSB0b28gc21hbGxcIik7IHJldHVybjt9XG4gIGlmIChoZWlnaHQgPCA1KSB7Y29uc29sZS5sb2coXCJpbWFnZSB0b28gc21hbGxcIik7IHJldHVybjt9XG5cbiAgY29uc3QgdGVtcCA9IG5ldyBGbG9hdDMyQXJyYXkoZGF0YS5sZW5ndGgpO1xuXG4gIC8vIGFwcGx5IGhvcml6b250YWwgZmlsdGVyLiBib3JkZXIgaXMgY29tcHV0ZWQgYnkgZXh0ZW5kaW5nIGJvcmRlciBwaXhlbFxuICBmb3IgKGxldCBqID0gMDsgaiA8IGhlaWdodDsgaisrKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3aWR0aDsgaSsrKSB7XG4gICAgICBjb25zdCBwb3MgPSBqICogd2lkdGggKyBpO1xuXG4gICAgICB0ZW1wW3Bvc10gPSBkYXRhW2oqd2lkdGggKyBNYXRoLm1heChpLTIsMCldICtcbiAgICAgICAgICAgICAgICAgIGRhdGFbaip3aWR0aCArIE1hdGgubWF4KGktMSwwKV0gKiA0ICtcbiAgICAgICAgICAgICAgICAgIGRhdGFbaip3aWR0aCArIGldICogNiArXG4gICAgICAgICAgICAgICAgICBkYXRhW2oqd2lkdGggKyBNYXRoLm1pbihpKzEsd2lkdGgtMSldICogNCArXG4gICAgICAgICAgICAgICAgICBkYXRhW2oqd2lkdGggKyBNYXRoLm1pbihpKzIsd2lkdGgtMSldO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGRzdCA9IG5ldyBGbG9hdDMyQXJyYXkoZGF0YS5sZW5ndGgpO1xuICAvLyBhcHBseSB2ZXJ0aWNhbCBmaWx0ZXIuIGJvcmRlciBpcyBjb21wdXRlZCBieSBleHRlbmRpbmcgYm9yZGVyIHBpeGVsXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgd2lkdGg7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgaGVpZ2h0OyBqKyspIHtcbiAgICAgIGNvbnN0IHBvcyA9IGogKiB3aWR0aCArIGk7XG5cbiAgICAgIGRzdFtwb3NdID0gdGVtcFtNYXRoLm1heChqLTIsMCkgKiB3aWR0aCArIGldICtcbiAgICAgICAgICAgICAgICAgdGVtcFtNYXRoLm1heChqLTEsMCkgKiB3aWR0aCArIGldICogNCArXG4gICAgICAgICAgICAgICAgIHRlbXBbaiAqIHdpZHRoICsgaV0gKiA2ICtcbiAgICAgICAgICAgICAgICAgdGVtcFtNYXRoLm1pbihqKzEsaGVpZ2h0LTEpICogd2lkdGggKyBpXSAqIDQgK1xuICAgICAgICAgICAgICAgICB0ZW1wW01hdGgubWluKGorMixoZWlnaHQtMSkgKiB3aWR0aCArIGldO1xuXG4gICAgICAvLyBhdmVyYWdlIG9mICgxKzQrNis0KzEpICogKDErNCs2KzQrMSkgPSAyNTYgbnVtYmVyc1xuICAgICAgZHN0W3Bvc10gPSBkc3RbcG9zXSAvIDI1Ni4wO1xuICAgIH1cbiAgfVxuICByZXR1cm4ge2RhdGE6IGRzdCwgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYnVpbGRcbn07XG4iLCIvLyBGYXN0IGNvbXB1dGF0aW9uIG9uIG51bWJlciBvZiBiaXQgc2V0c1xuLy8gUmVmOiBodHRwczovL2dyYXBoaWNzLnN0YW5mb3JkLmVkdS9+c2VhbmRlci9iaXRoYWNrcy5odG1sI0NvdW50Qml0c1NldFBhcmFsbGVsXG5jb25zdCBjb21wdXRlID0gKG9wdGlvbnMpID0+IHtcbiAgY29uc3Qge3YxLCB2Mn0gPSBvcHRpb25zO1xuICBsZXQgZCA9IDA7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdjEubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgeCA9ICh2MVtpXSBeIHYyW2ldKSA+Pj4gMDtcbiAgICBkICs9IGJpdENvdW50KHgpO1xuICB9XG4gIHJldHVybiBkO1xufVxuXG5jb25zdCBiaXRDb3VudCA9ICh2KSA9PiB7XG4gIHZhciBjID0gdiAtICgodiA+PiAxKSAmIDB4NTU1NTU1NTUpO1xuICBjID0gKChjID4+IDIpICYgMHgzMzMzMzMzMykgKyAoYyAmIDB4MzMzMzMzMzMpO1xuICBjID0gKChjID4+IDQpICsgYykgJiAweDBGMEYwRjBGO1xuICBjID0gKChjID4+IDgpICsgYykgJiAweDAwRkYwMEZGO1xuICBjID0gKChjID4+IDE2KSArIGMpICYgMHgwMDAwRkZGRjtcbiAgcmV0dXJuIGM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjb21wdXRlXG59O1xuIiwiY29uc3Qge2NvbXB1dGU6IGhhbW1pbmdDb21wdXRlfSA9IHJlcXVpcmUoJy4vaGFtbWluZy1kaXN0YW5jZS5qcycpO1xuY29uc3Qge2NyZWF0ZVJhbmRvbWl6ZXJ9ID0gcmVxdWlyZSgnLi4vdXRpbHMvcmFuZG9taXplci5qcycpO1xuXG5jb25zdCBtTWluRmVhdHVyZVBlck5vZGUgPSAxNjtcbmNvbnN0IG1OdW1IeXBvdGhlc2VzID0gIDEyODtcbmNvbnN0IG1DZW50ZXJzID0gODtcblxuLy8ga21lZG9pZHMgY2x1c3RlcmluZyBvZiBwb2ludHMsIHdpdGggaGFtbWluZyBkaXN0YW5jZSBvZiBGUkVBSyBkZXNjcmlwdG9yXG4vL1xuLy8gbm9kZSA9IHtcbi8vICAgaXNMZWFmOiBib29sLFxuLy8gICBjaGlsZHJlbjogW10sIGxpc3Qgb2YgY2hpbGRyZW4gbm9kZVxuLy8gICBwb2ludEluZGV4ZXM6IFtdLCBsaXN0IG9mIGludCwgcG9pbnQgaW5kZXhlc1xuLy8gICBjZW50ZXJQb2ludEluZGV4OiBpbnRcbi8vIH1cbmNvbnN0IGJ1aWxkID0gKHtwb2ludHN9KSA9PiB7XG4gIGNvbnN0IHBvaW50SW5kZXhlcyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHBvaW50cy5sZW5ndGg7IGkrKykge1xuICAgIHBvaW50SW5kZXhlcy5wdXNoKGkpO1xuICB9XG5cbiAgY29uc3QgcmFuZG9taXplciA9IGNyZWF0ZVJhbmRvbWl6ZXIoKTtcblxuICBjb25zdCByb290Tm9kZSA9IF9idWlsZCh7cG9pbnRzOiBwb2ludHMsIHBvaW50SW5kZXhlczogcG9pbnRJbmRleGVzLCBjZW50ZXJQb2ludEluZGV4OiBudWxsLCByYW5kb21pemVyfSk7XG4gIHJldHVybiB7cm9vdE5vZGV9O1xufVxuXG4vLyByZWN1cnNpdmUgYnVpbGQgaGllcmFyY2h5IGNsdXN0ZXJzXG5jb25zdCBfYnVpbGQgPSAob3B0aW9ucykgPT4ge1xuICBjb25zdCB7cG9pbnRzLCBwb2ludEluZGV4ZXMsIGNlbnRlclBvaW50SW5kZXgsIHJhbmRvbWl6ZXJ9ID0gb3B0aW9ucztcblxuICBsZXQgaXNMZWFmID0gZmFsc2U7XG5cbiAgaWYgKHBvaW50SW5kZXhlcy5sZW5ndGggPD0gbUNlbnRlcnMgfHwgcG9pbnRJbmRleGVzLmxlbmd0aCA8PSBtTWluRmVhdHVyZVBlck5vZGUpIHtcbiAgICBpc0xlYWYgPSB0cnVlO1xuICB9XG5cbiAgY29uc3QgY2x1c3RlcnMgPSB7fTtcbiAgaWYgKCFpc0xlYWYpIHtcbiAgICAvLyBjb21wdXRlIGNsdXN0ZXJzXG4gICAgY29uc3QgYXNzaWdubWVudCA9IF9jb21wdXRlS01lZG9pZHMoe3BvaW50cywgcG9pbnRJbmRleGVzLCByYW5kb21pemVyfSk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFzc2lnbm1lbnQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChjbHVzdGVyc1twb2ludEluZGV4ZXNbYXNzaWdubWVudFtpXV1dID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY2x1c3RlcnNbcG9pbnRJbmRleGVzW2Fzc2lnbm1lbnRbaV1dXSA9IFtdO1xuICAgICAgfVxuICAgICAgY2x1c3RlcnNbcG9pbnRJbmRleGVzW2Fzc2lnbm1lbnRbaV1dXS5wdXNoKHBvaW50SW5kZXhlc1tpXSk7XG4gICAgfVxuICB9XG4gIGlmIChPYmplY3Qua2V5cyhjbHVzdGVycykubGVuZ3RoID09PSAxKSB7XG4gICAgaXNMZWFmID0gdHJ1ZTtcbiAgfVxuXG4gIGNvbnN0IG5vZGUgPSB7XG4gICAgY2VudGVyUG9pbnRJbmRleDogY2VudGVyUG9pbnRJbmRleFxuICB9XG5cbiAgaWYgKGlzTGVhZikge1xuICAgIG5vZGUubGVhZiA9IHRydWU7XG4gICAgbm9kZS5wb2ludEluZGV4ZXMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBvaW50SW5kZXhlcy5sZW5ndGg7IGkrKykge1xuICAgICAgbm9kZS5wb2ludEluZGV4ZXMucHVzaChwb2ludEluZGV4ZXNbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIC8vIHJlY3Vyc2l2ZSBidWlsZCBjaGlsZHJlblxuICBub2RlLmxlYWYgPSBmYWxzZTtcbiAgbm9kZS5jaGlsZHJlbiA9IFtdO1xuXG4gIE9iamVjdC5rZXlzKGNsdXN0ZXJzKS5mb3JFYWNoKChjZW50ZXJJbmRleCkgPT4ge1xuICAgIG5vZGUuY2hpbGRyZW4ucHVzaChfYnVpbGQoe3BvaW50czogcG9pbnRzLCBwb2ludEluZGV4ZXM6IGNsdXN0ZXJzW2NlbnRlckluZGV4XSwgY2VudGVyUG9pbnRJbmRleDogY2VudGVySW5kZXgsIHJhbmRvbWl6ZXJ9KSk7XG4gIH0pO1xuICByZXR1cm4gbm9kZTtcbn1cblxuX2NvbXB1dGVLTWVkb2lkcyA9IChvcHRpb25zKSA9PiB7XG4gIGNvbnN0IHtwb2ludHMsIHBvaW50SW5kZXhlcywgcmFuZG9taXplcn0gPSBvcHRpb25zO1xuXG4gIGNvbnN0IHJhbmRvbVBvaW50SW5kZXhlcyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHBvaW50SW5kZXhlcy5sZW5ndGg7IGkrKykge1xuICAgIHJhbmRvbVBvaW50SW5kZXhlcy5wdXNoKGkpO1xuICB9XG5cbiAgbGV0IGJlc3RTdW1EID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XG4gIGxldCBiZXN0QXNzaWdubWVudEluZGV4ID0gLTE7XG5cbiAgY29uc3QgYXNzaWdubWVudHMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBtTnVtSHlwb3RoZXNlczsgaSsrKSB7XG4gICAgcmFuZG9taXplci5hcnJheVNodWZmbGUoe2FycjogcmFuZG9tUG9pbnRJbmRleGVzLCBzYW1wbGVTaXplOiBtQ2VudGVyc30pO1xuXG4gICAgbGV0IHN1bUQgPSAwO1xuICAgIGNvbnN0IGFzc2lnbm1lbnQgPSBbXTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHBvaW50SW5kZXhlcy5sZW5ndGg7IGorKykge1xuICAgICAgbGV0IGJlc3REID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XG4gICAgICBmb3IgKGxldCBrID0gMDsgayA8IG1DZW50ZXJzOyBrKyspIHtcbiAgICAgICAgY29uc3QgY2VudGVySW5kZXggPSBwb2ludEluZGV4ZXNbcmFuZG9tUG9pbnRJbmRleGVzW2tdXTtcbiAgICAgICAgY29uc3QgZCA9IGhhbW1pbmdDb21wdXRlKHt2MTogcG9pbnRzW3BvaW50SW5kZXhlc1tqXV0uZGVzY3JpcHRvcnMsIHYyOiBwb2ludHNbY2VudGVySW5kZXhdLmRlc2NyaXB0b3JzfSk7XG4gICAgICAgIGlmIChkIDwgYmVzdEQpIHtcbiAgICAgICAgICBhc3NpZ25tZW50W2pdID0gcmFuZG9tUG9pbnRJbmRleGVzW2tdO1xuICAgICAgICAgIGJlc3REID0gZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgc3VtRCArPSBiZXN0RDtcbiAgICB9XG4gICAgYXNzaWdubWVudHMucHVzaChhc3NpZ25tZW50KTtcblxuICAgIGlmIChzdW1EIDwgYmVzdFN1bUQpIHtcbiAgICAgIGJlc3RTdW1EID0gc3VtRDtcbiAgICAgIGJlc3RBc3NpZ25tZW50SW5kZXggPSBpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYXNzaWdubWVudHNbYmVzdEFzc2lnbm1lbnRJbmRleF07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBidWlsZCxcbn07XG5cbiIsImNvbnN0IHtidWlsZDogYnVpbGRHYXVzc2lhblB5cmFtaWR9ID0gcmVxdWlyZSgnLi9nYXVzc2lhbi1weXJhbWlkJyk7XG5jb25zdCB7YnVpbGQ6IGJ1aWxkRG9HUHlyYW1pZH0gPSByZXF1aXJlKCcuL2RvZy1weXJhbWlkJyk7XG5jb25zdCB7YnVpbGQ6IGhpZXJhcmNoaWNhbENsdXN0ZXJpbmdCdWlsZH0gPSByZXF1aXJlKCcuL2hpZXJhcmNoaWNhbC1jbHVzdGVyaW5nLmpzJyk7XG5jb25zdCB7ZGV0ZWN0fSA9IHJlcXVpcmUoJy4vZGV0ZWN0b3InKTtcbmNvbnN0IHtleHRyYWN0fSA9IHJlcXVpcmUoJy4vZnJlYWstZXh0cmFjdG9yJyk7XG5cbmNvbnN0IFBZUkFNSURfTlVNX1NDQUxFU19QRVJfT0NUQVZFUyA9IDM7XG5jb25zdCBQWVJBTUlEX01JTl9DT0FSU0VfU0laRSA9IDg7XG5jb25zdCBGRUFUVVJFX0RFTlNJVFkgPSAxMDA7XG5cbmNvbnN0IGNyZWF0ZU1hdGNoZXIgPSAoaW1hZ2VMaXN0KSA9PiB7XG4gIGNvbnN0IGtleWZyYW1lcyA9IF9idWlsZEtleWZyYW1lcyh7aW1hZ2VMaXN0fSk7XG4gIGNvbnNvbGUubG9nKFwia2V5ZnJhbWVzXCIsIGtleWZyYW1lcyk7XG5cbiAgY29uc3QgbWF0Y2hlciA9IHtcbiAgICBrZXlmcmFtZXM6IGtleWZyYW1lcyxcblxuICAgIG1hdGNoOiAodGFyZ2V0SW1hZ2UpID0+IHtcbiAgICAgIGNvbnN0IHF1ZXJ5cG9pbnRzID0gX2V4dHJhY3RQb2ludHMoe2ltYWdlOiB0YXJnZXRJbWFnZX0pO1xuICAgICAgY29uc29sZS5sb2coXCJxdWVyeXBvaW50c1wiLCBxdWVyeXBvaW50cyk7XG4gICAgfVxuICB9XG4gIHJldHVybiBtYXRjaGVyO1xufVxuXG5jb25zdCBfZXh0cmFjdFBvaW50cyA9ICh7aW1hZ2V9KSA9PiB7XG4gIGNvbnN0IG1heEZlYXR1cmVOdW0gPSBGRUFUVVJFX0RFTlNJVFkgKiBpbWFnZS53aWR0aCAqIGltYWdlLmhlaWdodCAvICg0ODAuMCozNjApO1xuICBjb25zdCBnYXVzc2lhblB5cmFtaWQgPSBidWlsZEdhdXNzaWFuUHlyYW1pZCh7aW1hZ2UsIG1pbkNvYXJzZVNpemU6IFBZUkFNSURfTUlOX0NPQVJTRV9TSVpFLCBudW1TY2FsZXNQZXJPY3RhdmVzOiBQWVJBTUlEX05VTV9TQ0FMRVNfUEVSX09DVEFWRVN9KTtcblxuICBjb25zdCBkb2dQeXJhbWlkID0gYnVpbGREb0dQeXJhbWlkKHtnYXVzc2lhblB5cmFtaWQ6IGdhdXNzaWFuUHlyYW1pZH0pO1xuXG4gIGNvbnN0IGZlYXR1cmVQb2ludHMgPSBkZXRlY3Qoe2dhdXNzaWFuUHlyYW1pZCwgZG9nUHlyYW1pZH0pO1xuXG4gIGNvbnN0IGRlc2NyaXB0b3JzID0gZXh0cmFjdCh7cHlyYW1pZDogZ2F1c3NpYW5QeXJhbWlkLCBwb2ludHM6IGZlYXR1cmVQb2ludHN9KTtcblxuICBjb25zdCBrZXlwb2ludHMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmZWF0dXJlUG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAga2V5cG9pbnRzLnB1c2goe1xuICAgICAgeDJEOiBmZWF0dXJlUG9pbnRzW2ldLngsXG4gICAgICB5MkQ6IGZlYXR1cmVQb2ludHNbaV0ueSxcbiAgICAgIHgzRDogKGZlYXR1cmVQb2ludHNbaV0ueCArIDAuNSkgLyBpbWFnZS5kcGkgKiAyNS40LCAvLyBpbmNoIHRvIG1pbGxpbWV0ZXJcbiAgICAgIHkzRDogKChpbWFnZS5oZWlnaHQtMC41KSAtIGZlYXR1cmVQb2ludHNbaV0ueSkgLyBpbWFnZS5kcGkgKiAyNS40LCAvLyBpbmNoIHRvIG1pbGxpbWV0ZXJcbiAgICAgIGFuZ2xlOiBmZWF0dXJlUG9pbnRzW2ldLmFuZ2xlLFxuICAgICAgc2NhbGU6IGZlYXR1cmVQb2ludHNbaV0uc2lnbWEsXG4gICAgICBtYXhpbWE6IGZlYXR1cmVQb2ludHNbaV0uc2NvcmUgPiAwLFxuICAgICAgZGVzY3JpcHRvcnM6IGRlc2NyaXB0b3JzW2ldXG4gICAgfSlcbiAgfVxuICByZXR1cm4ga2V5cG9pbnRzO1xufVxuXG5jb25zdCBfYnVpbGRLZXlmcmFtZXMgPSAoe2ltYWdlTGlzdH0pID0+IHtcbiAgY29uc3Qga2V5ZnJhbWVzID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbWFnZUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBpbWFnZSA9IGltYWdlTGlzdFtpXTtcbiAgICBjb25zdCBrZXlwb2ludHMgPSBfZXh0cmFjdFBvaW50cyh7aW1hZ2V9KTtcbiAgICBjb25zdCBwb2ludHNDbHVzdGVyID0gaGllcmFyY2hpY2FsQ2x1c3RlcmluZ0J1aWxkKHtwb2ludHM6IGtleXBvaW50c30pO1xuICAgIGtleWZyYW1lcy5wdXNoKHtwb2ludHM6IGtleXBvaW50cywgcG9pbnRzQ2x1c3Rlciwgd2lkdGg6IGltYWdlLndpZHRoLCBoZWlnaHQ6IGltYWdlLmhlaWdodH0pO1xuICB9XG4gIHJldHVybiBrZXlmcmFtZXM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjcmVhdGVNYXRjaGVyXG59XG4iLCJjb25zdCB1cHNhbXBsZUJpbGluZWFyID0gKHtpbWFnZSwgcGFkT25lV2lkdGgsIHBhZE9uZUhlaWdodH0pID0+IHtcbiAgY29uc3Qge3dpZHRoLCBoZWlnaHQsIGRhdGF9ID0gaW1hZ2U7XG5cbiAgY29uc3QgZHN0V2lkdGggPSBpbWFnZS53aWR0aCAqIDIgKyAocGFkT25lV2lkdGg/MTowKTtcbiAgY29uc3QgZHN0SGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0ICogMiArIChwYWRPbmVIZWlnaHQ/MTowKTtcblxuICBjb25zdCB0ZW1wID0gbmV3IEZsb2F0MzJBcnJheShkc3RXaWR0aCAqIGRzdEhlaWdodCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZHN0V2lkdGg7IGkrKykge1xuICAgIGNvbnN0IHNpID0gMC41ICogaSAtIDAuMjU7XG4gICAgbGV0IHNpMCA9IE1hdGguZmxvb3Ioc2kpO1xuICAgIGxldCBzaTEgPSBNYXRoLmNlaWwoc2kpO1xuICAgIGlmIChzaTAgPCAwKSBzaTAgPSAwOyAvLyBib3JkZXJcbiAgICBpZiAoc2kxID49IHdpZHRoKSBzaTEgPSB3aWR0aCAtIDE7IC8vIGJvcmRlclxuXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBkc3RIZWlnaHQ7IGorKykge1xuICAgICAgY29uc3Qgc2ogPSAwLjUgKiBqIC0gMC4yNTtcbiAgICAgIGxldCBzajAgPSBNYXRoLmZsb29yKHNqKTtcbiAgICAgIGxldCBzajEgPSBNYXRoLmNlaWwoc2opO1xuICAgICAgaWYgKHNqMCA8IDApIHNqMCA9IDA7IC8vIGJvcmRlclxuICAgICAgaWYgKHNqMSA+PSBoZWlnaHQpIHNqMSA9IGhlaWdodCAtIDE7IC8vYm9yZGVyXG5cbiAgICAgIGNvbnN0IHZhbHVlID0gKHNpMSAtIHNpKSAqIChzajEgLSBzaikgKiBkYXRhWyBzajAgKiB3aWR0aCArIHNpMCBdICtcbiAgICAgICAgICAgICAgICAgICAgKHNpMSAtIHNpKSAqIChzaiAtIHNqMCkgKiBkYXRhWyBzajEgKiB3aWR0aCArIHNpMCBdICtcbiAgICAgICAgICAgICAgICAgICAgKHNpIC0gc2kwKSAqIChzajEgLSBzaikgKiBkYXRhWyBzajAgKiB3aWR0aCArIHNpMSBdICtcbiAgICAgICAgICAgICAgICAgICAgKHNpIC0gc2kwKSAqIChzaiAtIHNqMCkgKiBkYXRhWyBzajEgKiB3aWR0aCArIHNpMSBdO1xuXG4gICAgICB0ZW1wW2ogKiBkc3RXaWR0aCArIGldID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtkYXRhOiB0ZW1wLCB3aWR0aDogZHN0V2lkdGgsIGhlaWdodDogZHN0SGVpZ2h0fTtcbn1cblxuY29uc3QgZG93bnNhbXBsZUJpbGluZWFyID0gKHtpbWFnZX0pID0+IHtcbiAgY29uc3Qge2RhdGEsIHdpZHRoLCBoZWlnaHR9ID0gaW1hZ2U7XG5cbiAgY29uc3QgZHN0V2lkdGggPSBNYXRoLmZsb29yKHdpZHRoIC8gMik7XG4gIGNvbnN0IGRzdEhlaWdodCA9IE1hdGguZmxvb3IoaGVpZ2h0IC8gMik7XG5cbiAgY29uc3QgdGVtcCA9IG5ldyBGbG9hdDMyQXJyYXkoZHN0V2lkdGggKiBkc3RIZWlnaHQpO1xuICBjb25zdCBvZmZzZXRzID0gWzAsIDEsIHdpZHRoLCB3aWR0aCsxXTtcbiAgZm9yIChsZXQgaiA9IDA7IGogPCBkc3RIZWlnaHQ7IGorKykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZHN0V2lkdGg7IGkrKykge1xuICAgICAgbGV0IHNyY1BvcyA9IGoqMiAqIHdpZHRoICsgaSoyO1xuXG4gICAgICBsZXQgdmFsdWUgPSAwLjA7XG4gICAgICBmb3IgKGxldCBkID0gMDsgZCA8IG9mZnNldHMubGVuZ3RoOyBkKyspIHtcbiAgICAgICAgdmFsdWUgKz0gZGF0YVtzcmNQb3MrIG9mZnNldHNbZF1dO1xuICAgICAgfVxuICAgICAgdmFsdWUgKj0gMC4yNTtcbiAgICAgIHRlbXBbaipkc3RXaWR0aCtpXSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4ge2RhdGE6IHRlbXAsIHdpZHRoOiBkc3RXaWR0aCwgaGVpZ2h0OiBkc3RIZWlnaHR9O1xufVxuXG5jb25zdCByZXNpemUgPSAoe2ltYWdlLCByYXRpb30pID0+IHtcbiAgY29uc3Qgd2lkdGggPSBNYXRoLnJvdW5kKGltYWdlLndpZHRoICogcmF0aW8pO1xuICBjb25zdCBoZWlnaHQgPSBNYXRoLnJvdW5kKGltYWdlLmhlaWdodCAqIHJhdGlvKTtcblxuICBjb25zdCBpbWFnZURhdGEgPSBuZXcgRmxvYXQzMkFycmF5KHdpZHRoICogaGVpZ2h0KTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB3aWR0aDsgaSsrKSB7XG4gICAgbGV0IHNpMSA9IE1hdGgucm91bmQoMS4wICogaSAvIHJhdGlvKTtcbiAgICBsZXQgc2kyID0gTWF0aC5yb3VuZCgxLjAgKiAoaSsxKSAvIHJhdGlvKSAtIDE7XG4gICAgaWYgKHNpMiA+PSBpbWFnZS53aWR0aCkgc2kyID0gaW1hZ2Uud2lkdGggLSAxO1xuXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBoZWlnaHQ7IGorKykge1xuICAgICAgbGV0IHNqMSA9IE1hdGgucm91bmQoMS4wICogaiAvIHJhdGlvKTtcbiAgICAgIGxldCBzajIgPSBNYXRoLnJvdW5kKDEuMCAqIChqKzEpIC8gcmF0aW8pIC0gMTtcbiAgICAgIGlmIChzajIgPj0gaW1hZ2UuaGVpZ2h0KSBzajIgPSBpbWFnZS5oZWlnaHQgLSAxO1xuXG4gICAgICBsZXQgc3VtID0gMDtcbiAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICBmb3IgKGxldCBpaSA9IHNpMTsgaWkgPD0gc2kyOyBpaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGpqID0gc2oxOyBqaiA8PSBzajI7IGpqKyspIHtcbiAgICAgICAgICBzdW0gKz0gKDEuMCAqIGltYWdlLmRhdGFbamogKiBpbWFnZS53aWR0aCArIGlpXSk7XG4gICAgICAgICAgY291bnQgKz0gMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaW1hZ2VEYXRhW2ogKiB3aWR0aCArIGldID0gTWF0aC5mbG9vcihzdW0gLyBjb3VudCk7XG4gICAgfVxuICB9XG4gIHJldHVybiB7ZGF0YTogaW1hZ2VEYXRhLCB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0fTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGRvd25zYW1wbGVCaWxpbmVhcixcbiAgdXBzYW1wbGVCaWxpbmVhcixcbiAgcmVzaXplLFxufVxuXG4iLCJjb25zdCBtUmFuZFNlZWQgPSAxMjM0O1xuXG5jb25zdCBjcmVhdGVSYW5kb21pemVyID0gKCkgPT4ge1xuICBjb25zdCByYW5kb21pemVyID0ge1xuICAgIHNlZWQ6IG1SYW5kU2VlZCxcblxuICAgIGFycmF5U2h1ZmZsZShvcHRpb25zKSB7XG4gICAgICBjb25zdCB7YXJyLCBzYW1wbGVTaXplfSA9IG9wdGlvbnM7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNhbXBsZVNpemU7IGkrKykge1xuXG4gICAgICAgIHRoaXMuc2VlZCA9ICgyMTQwMTMgKiB0aGlzLnNlZWQgKyAyNTMxMDExKSAlICgxIDw8IDMxKTtcbiAgICAgICAgbGV0IGsgPSAodGhpcy5zZWVkID4+IDE2KSAmIDB4N2ZmZjtcbiAgICAgICAgayA9IGsgJSBhcnIubGVuZ3RoO1xuXG4gICAgICAgIGxldCB0bXAgPSBhcnJbaV07XG4gICAgICAgIGFycltpXSA9IGFycltrXTtcbiAgICAgICAgYXJyW2tdID0gdG1wO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBuZXh0SW50KG1heFZhbHVlKSB7XG4gICAgICB0aGlzLnNlZWQgPSAoMjE0MDEzICogdGhpcy5zZWVkICsgMjUzMTAxMSkgJSAoMSA8PCAzMSk7XG4gICAgICBsZXQgayA9ICh0aGlzLnNlZWQgPj4gMTYpICYgMHg3ZmZmO1xuICAgICAgayA9IGsgJSBtYXhWYWx1ZTtcbiAgICAgIHJldHVybiBrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmFuZG9taXplcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNyZWF0ZVJhbmRvbWl6ZXJcbn1cbiIsImNvbnN0IHtDb250cm9sbGVyfSA9IHJlcXVpcmUoJy4vY29udHJvbGxlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHdpbmRvdy5NSU5EQVIgPSB7XG4gIENvbnRyb2xsZXJcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=