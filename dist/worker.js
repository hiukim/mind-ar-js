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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/controller.worker.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/is-any-array/src/index.js":
/*!************************************************!*\
  !*** ./node_modules/is-any-array/src/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const toString = Object.prototype.toString;

function isAnyArray(object) {
  return toString.call(object).endsWith('Array]');
}

module.exports = isAnyArray;


/***/ }),

/***/ "./node_modules/ml-array-max/lib-es6/index.js":
/*!****************************************************!*\
  !*** ./node_modules/ml-array-max/lib-es6/index.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var is_any_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! is-any-array */ "./node_modules/is-any-array/src/index.js");
/* harmony import */ var is_any_array__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(is_any_array__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Computes the maximum of the given values
 * @param {Array<number>} input
 * @return {number}
 */

function max(input) {
  if (!is_any_array__WEBPACK_IMPORTED_MODULE_0___default()(input)) {
    throw new TypeError('input must be an array');
  }

  if (input.length === 0) {
    throw new TypeError('input must not be empty');
  }

  var maxValue = input[0];

  for (var i = 1; i < input.length; i++) {
    if (input[i] > maxValue) maxValue = input[i];
  }

  return maxValue;
}

/* harmony default export */ __webpack_exports__["default"] = (max);


/***/ }),

/***/ "./node_modules/ml-array-min/lib-es6/index.js":
/*!****************************************************!*\
  !*** ./node_modules/ml-array-min/lib-es6/index.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var is_any_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! is-any-array */ "./node_modules/is-any-array/src/index.js");
/* harmony import */ var is_any_array__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(is_any_array__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Computes the minimum of the given values
 * @param {Array<number>} input
 * @return {number}
 */

function min(input) {
  if (!is_any_array__WEBPACK_IMPORTED_MODULE_0___default()(input)) {
    throw new TypeError('input must be an array');
  }

  if (input.length === 0) {
    throw new TypeError('input must not be empty');
  }

  var minValue = input[0];

  for (var i = 1; i < input.length; i++) {
    if (input[i] < minValue) minValue = input[i];
  }

  return minValue;
}

/* harmony default export */ __webpack_exports__["default"] = (min);


/***/ }),

/***/ "./node_modules/ml-array-rescale/lib-es6/index.js":
/*!********************************************************!*\
  !*** ./node_modules/ml-array-rescale/lib-es6/index.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var is_any_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! is-any-array */ "./node_modules/is-any-array/src/index.js");
/* harmony import */ var is_any_array__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(is_any_array__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ml_array_max__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ml-array-max */ "./node_modules/ml-array-max/lib-es6/index.js");
/* harmony import */ var ml_array_min__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ml-array-min */ "./node_modules/ml-array-min/lib-es6/index.js");




/**
 *
 * @param {Array} input
 * @param {object} [options={}]
 * @param {Array} [options.output=[]] specify the output array, can be the input array for in place modification
 */

function rescale(input) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!is_any_array__WEBPACK_IMPORTED_MODULE_0___default()(input)) {
    throw new TypeError('input must be an array');
  } else if (input.length === 0) {
    throw new TypeError('input must not be empty');
  }

  var output;

  if (options.output !== undefined) {
    if (!is_any_array__WEBPACK_IMPORTED_MODULE_0___default()(options.output)) {
      throw new TypeError('output option must be an array if specified');
    }

    output = options.output;
  } else {
    output = new Array(input.length);
  }

  var currentMin = Object(ml_array_min__WEBPACK_IMPORTED_MODULE_2__["default"])(input);
  var currentMax = Object(ml_array_max__WEBPACK_IMPORTED_MODULE_1__["default"])(input);

  if (currentMin === currentMax) {
    throw new RangeError('minimum and maximum input values are equal. Cannot rescale a constant array');
  }

  var _options$min = options.min,
      minValue = _options$min === void 0 ? options.autoMinMax ? currentMin : 0 : _options$min,
      _options$max = options.max,
      maxValue = _options$max === void 0 ? options.autoMinMax ? currentMax : 1 : _options$max;

  if (minValue >= maxValue) {
    throw new RangeError('min option must be smaller than max option');
  }

  var factor = (maxValue - minValue) / (currentMax - currentMin);

  for (var i = 0; i < input.length; i++) {
    output[i] = (input[i] - currentMin) * factor + minValue;
  }

  return output;
}

/* harmony default export */ __webpack_exports__["default"] = (rescale);


/***/ }),

/***/ "./node_modules/ml-matrix/src/correlation.js":
/*!***************************************************!*\
  !*** ./node_modules/ml-matrix/src/correlation.js ***!
  \***************************************************/
/*! exports provided: correlation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "correlation", function() { return correlation; });
/* harmony import */ var _matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./matrix */ "./node_modules/ml-matrix/src/matrix.js");


function correlation(xMatrix, yMatrix = xMatrix, options = {}) {
  xMatrix = new _matrix__WEBPACK_IMPORTED_MODULE_0__["default"](xMatrix);
  let yIsSame = false;
  if (
    typeof yMatrix === 'object' &&
    !_matrix__WEBPACK_IMPORTED_MODULE_0__["default"].isMatrix(yMatrix) &&
    !Array.isArray(yMatrix)
  ) {
    options = yMatrix;
    yMatrix = xMatrix;
    yIsSame = true;
  } else {
    yMatrix = new _matrix__WEBPACK_IMPORTED_MODULE_0__["default"](yMatrix);
  }
  if (xMatrix.rows !== yMatrix.rows) {
    throw new TypeError('Both matrices must have the same number of rows');
  }

  const { center = true, scale = true } = options;
  if (center) {
    xMatrix.center('column');
    if (!yIsSame) {
      yMatrix.center('column');
    }
  }
  if (scale) {
    xMatrix.scale('column');
    if (!yIsSame) {
      yMatrix.scale('column');
    }
  }

  const sdx = xMatrix.standardDeviation('column', { unbiased: true });
  const sdy = yIsSame
    ? sdx
    : yMatrix.standardDeviation('column', { unbiased: true });

  const corr = xMatrix.transpose().mmul(yMatrix);
  for (let i = 0; i < corr.rows; i++) {
    for (let j = 0; j < corr.columns; j++) {
      corr.set(
        i,
        j,
        corr.get(i, j) * (1 / (sdx[i] * sdy[j])) * (1 / (xMatrix.rows - 1)),
      );
    }
  }
  return corr;
}


/***/ }),

/***/ "./node_modules/ml-matrix/src/covariance.js":
/*!**************************************************!*\
  !*** ./node_modules/ml-matrix/src/covariance.js ***!
  \**************************************************/
/*! exports provided: covariance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "covariance", function() { return covariance; });
/* harmony import */ var _matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./matrix */ "./node_modules/ml-matrix/src/matrix.js");


function covariance(xMatrix, yMatrix = xMatrix, options = {}) {
  xMatrix = new _matrix__WEBPACK_IMPORTED_MODULE_0__["default"](xMatrix);
  let yIsSame = false;
  if (
    typeof yMatrix === 'object' &&
    !_matrix__WEBPACK_IMPORTED_MODULE_0__["default"].isMatrix(yMatrix) &&
    !Array.isArray(yMatrix)
  ) {
    options = yMatrix;
    yMatrix = xMatrix;
    yIsSame = true;
  } else {
    yMatrix = new _matrix__WEBPACK_IMPORTED_MODULE_0__["default"](yMatrix);
  }
  if (xMatrix.rows !== yMatrix.rows) {
    throw new TypeError('Both matrices must have the same number of rows');
  }
  const { center = true } = options;
  if (center) {
    xMatrix = xMatrix.center('column');
    if (!yIsSame) {
      yMatrix = yMatrix.center('column');
    }
  }
  const cov = xMatrix.transpose().mmul(yMatrix);
  for (let i = 0; i < cov.rows; i++) {
    for (let j = 0; j < cov.columns; j++) {
      cov.set(i, j, cov.get(i, j) * (1 / (xMatrix.rows - 1)));
    }
  }
  return cov;
}


/***/ }),

/***/ "./node_modules/ml-matrix/src/dc/cholesky.js":
/*!***************************************************!*\
  !*** ./node_modules/ml-matrix/src/dc/cholesky.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CholeskyDecomposition; });
/* harmony import */ var _matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../matrix */ "./node_modules/ml-matrix/src/matrix.js");
/* harmony import */ var _wrap_WrapperMatrix2D__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../wrap/WrapperMatrix2D */ "./node_modules/ml-matrix/src/wrap/WrapperMatrix2D.js");



class CholeskyDecomposition {
  constructor(value) {
    value = _wrap_WrapperMatrix2D__WEBPACK_IMPORTED_MODULE_1__["default"].checkMatrix(value);
    if (!value.isSymmetric()) {
      throw new Error('Matrix is not symmetric');
    }

    let a = value;
    let dimension = a.rows;
    let l = new _matrix__WEBPACK_IMPORTED_MODULE_0__["default"](dimension, dimension);
    let positiveDefinite = true;
    let i, j, k;

    for (j = 0; j < dimension; j++) {
      let d = 0;
      for (k = 0; k < j; k++) {
        let s = 0;
        for (i = 0; i < k; i++) {
          s += l.get(k, i) * l.get(j, i);
        }
        s = (a.get(j, k) - s) / l.get(k, k);
        l.set(j, k, s);
        d = d + s * s;
      }

      d = a.get(j, j) - d;

      positiveDefinite &= d > 0;
      l.set(j, j, Math.sqrt(Math.max(d, 0)));
      for (k = j + 1; k < dimension; k++) {
        l.set(j, k, 0);
      }
    }

    this.L = l;
    this.positiveDefinite = Boolean(positiveDefinite);
  }

  isPositiveDefinite() {
    return this.positiveDefinite;
  }

  solve(value) {
    value = _wrap_WrapperMatrix2D__WEBPACK_IMPORTED_MODULE_1__["default"].checkMatrix(value);

    let l = this.L;
    let dimension = l.rows;

    if (value.rows !== dimension) {
      throw new Error('Matrix dimensions do not match');
    }
    if (this.isPositiveDefinite() === false) {
      throw new Error('Matrix is not positive definite');
    }

    let count = value.columns;
    let B = value.clone();
    let i, j, k;

    for (k = 0; k < dimension; k++) {
      for (j = 0; j < count; j++) {
        for (i = 0; i < k; i++) {
          B.set(k, j, B.get(k, j) - B.get(i, j) * l.get(k, i));
        }
        B.set(k, j, B.get(k, j) / l.get(k, k));
      }
    }

    for (k = dimension - 1; k >= 0; k--) {
      for (j = 0; j < count; j++) {
        for (i = k + 1; i < dimension; i++) {
          B.set(k, j, B.get(k, j) - B.get(i, j) * l.get(i, k));
        }
        B.set(k, j, B.get(k, j) / l.get(k, k));
      }
    }

    return B;
  }

  get lowerTriangularMatrix() {
    return this.L;
  }
}


/***/ }),

/***/ "./node_modules/ml-matrix/src/dc/evd.js":
/*!**********************************************!*\
  !*** ./node_modules/ml-matrix/src/dc/evd.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EigenvalueDecomposition; });
/* harmony import */ var _matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../matrix */ "./node_modules/ml-matrix/src/matrix.js");
/* harmony import */ var _wrap_WrapperMatrix2D__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../wrap/WrapperMatrix2D */ "./node_modules/ml-matrix/src/wrap/WrapperMatrix2D.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ "./node_modules/ml-matrix/src/dc/util.js");





class EigenvalueDecomposition {
  constructor(matrix, options = {}) {
    const { assumeSymmetric = false } = options;

    matrix = _wrap_WrapperMatrix2D__WEBPACK_IMPORTED_MODULE_1__["default"].checkMatrix(matrix);
    if (!matrix.isSquare()) {
      throw new Error('Matrix is not a square matrix');
    }

    let n = matrix.columns;
    let V = new _matrix__WEBPACK_IMPORTED_MODULE_0__["default"](n, n);
    let d = new Float64Array(n);
    let e = new Float64Array(n);
    let value = matrix;
    let i, j;

    let isSymmetric = false;
    if (assumeSymmetric) {
      isSymmetric = true;
    } else {
      isSymmetric = matrix.isSymmetric();
    }

    if (isSymmetric) {
      for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
          V.set(i, j, value.get(i, j));
        }
      }
      tred2(n, e, d, V);
      tql2(n, e, d, V);
    } else {
      let H = new _matrix__WEBPACK_IMPORTED_MODULE_0__["default"](n, n);
      let ort = new Float64Array(n);
      for (j = 0; j < n; j++) {
        for (i = 0; i < n; i++) {
          H.set(i, j, value.get(i, j));
        }
      }
      orthes(n, H, ort, V);
      hqr2(n, e, d, V, H);
    }

    this.n = n;
    this.e = e;
    this.d = d;
    this.V = V;
  }

  get realEigenvalues() {
    return Array.from(this.d);
  }

  get imaginaryEigenvalues() {
    return Array.from(this.e);
  }

  get eigenvectorMatrix() {
    return this.V;
  }

  get diagonalMatrix() {
    let n = this.n;
    let e = this.e;
    let d = this.d;
    let X = new _matrix__WEBPACK_IMPORTED_MODULE_0__["default"](n, n);
    let i, j;
    for (i = 0; i < n; i++) {
      for (j = 0; j < n; j++) {
        X.set(i, j, 0);
      }
      X.set(i, i, d[i]);
      if (e[i] > 0) {
        X.set(i, i + 1, e[i]);
      } else if (e[i] < 0) {
        X.set(i, i - 1, e[i]);
      }
    }
    return X;
  }
}

function tred2(n, e, d, V) {
  let f, g, h, i, j, k, hh, scale;

  for (j = 0; j < n; j++) {
    d[j] = V.get(n - 1, j);
  }

  for (i = n - 1; i > 0; i--) {
    scale = 0;
    h = 0;
    for (k = 0; k < i; k++) {
      scale = scale + Math.abs(d[k]);
    }

    if (scale === 0) {
      e[i] = d[i - 1];
      for (j = 0; j < i; j++) {
        d[j] = V.get(i - 1, j);
        V.set(i, j, 0);
        V.set(j, i, 0);
      }
    } else {
      for (k = 0; k < i; k++) {
        d[k] /= scale;
        h += d[k] * d[k];
      }

      f = d[i - 1];
      g = Math.sqrt(h);
      if (f > 0) {
        g = -g;
      }

      e[i] = scale * g;
      h = h - f * g;
      d[i - 1] = f - g;
      for (j = 0; j < i; j++) {
        e[j] = 0;
      }

      for (j = 0; j < i; j++) {
        f = d[j];
        V.set(j, i, f);
        g = e[j] + V.get(j, j) * f;
        for (k = j + 1; k <= i - 1; k++) {
          g += V.get(k, j) * d[k];
          e[k] += V.get(k, j) * f;
        }
        e[j] = g;
      }

      f = 0;
      for (j = 0; j < i; j++) {
        e[j] /= h;
        f += e[j] * d[j];
      }

      hh = f / (h + h);
      for (j = 0; j < i; j++) {
        e[j] -= hh * d[j];
      }

      for (j = 0; j < i; j++) {
        f = d[j];
        g = e[j];
        for (k = j; k <= i - 1; k++) {
          V.set(k, j, V.get(k, j) - (f * e[k] + g * d[k]));
        }
        d[j] = V.get(i - 1, j);
        V.set(i, j, 0);
      }
    }
    d[i] = h;
  }

  for (i = 0; i < n - 1; i++) {
    V.set(n - 1, i, V.get(i, i));
    V.set(i, i, 1);
    h = d[i + 1];
    if (h !== 0) {
      for (k = 0; k <= i; k++) {
        d[k] = V.get(k, i + 1) / h;
      }

      for (j = 0; j <= i; j++) {
        g = 0;
        for (k = 0; k <= i; k++) {
          g += V.get(k, i + 1) * V.get(k, j);
        }
        for (k = 0; k <= i; k++) {
          V.set(k, j, V.get(k, j) - g * d[k]);
        }
      }
    }

    for (k = 0; k <= i; k++) {
      V.set(k, i + 1, 0);
    }
  }

  for (j = 0; j < n; j++) {
    d[j] = V.get(n - 1, j);
    V.set(n - 1, j, 0);
  }

  V.set(n - 1, n - 1, 1);
  e[0] = 0;
}

function tql2(n, e, d, V) {
  let g, h, i, j, k, l, m, p, r, dl1, c, c2, c3, el1, s, s2, iter;

  for (i = 1; i < n; i++) {
    e[i - 1] = e[i];
  }

  e[n - 1] = 0;

  let f = 0;
  let tst1 = 0;
  let eps = Number.EPSILON;

  for (l = 0; l < n; l++) {
    tst1 = Math.max(tst1, Math.abs(d[l]) + Math.abs(e[l]));
    m = l;
    while (m < n) {
      if (Math.abs(e[m]) <= eps * tst1) {
        break;
      }
      m++;
    }

    if (m > l) {
      iter = 0;
      do {
        iter = iter + 1;

        g = d[l];
        p = (d[l + 1] - g) / (2 * e[l]);
        r = Object(_util__WEBPACK_IMPORTED_MODULE_2__["hypotenuse"])(p, 1);
        if (p < 0) {
          r = -r;
        }

        d[l] = e[l] / (p + r);
        d[l + 1] = e[l] * (p + r);
        dl1 = d[l + 1];
        h = g - d[l];
        for (i = l + 2; i < n; i++) {
          d[i] -= h;
        }

        f = f + h;

        p = d[m];
        c = 1;
        c2 = c;
        c3 = c;
        el1 = e[l + 1];
        s = 0;
        s2 = 0;
        for (i = m - 1; i >= l; i--) {
          c3 = c2;
          c2 = c;
          s2 = s;
          g = c * e[i];
          h = c * p;
          r = Object(_util__WEBPACK_IMPORTED_MODULE_2__["hypotenuse"])(p, e[i]);
          e[i + 1] = s * r;
          s = e[i] / r;
          c = p / r;
          p = c * d[i] - s * g;
          d[i + 1] = h + s * (c * g + s * d[i]);

          for (k = 0; k < n; k++) {
            h = V.get(k, i + 1);
            V.set(k, i + 1, s * V.get(k, i) + c * h);
            V.set(k, i, c * V.get(k, i) - s * h);
          }
        }

        p = (-s * s2 * c3 * el1 * e[l]) / dl1;
        e[l] = s * p;
        d[l] = c * p;
      } while (Math.abs(e[l]) > eps * tst1);
    }
    d[l] = d[l] + f;
    e[l] = 0;
  }

  for (i = 0; i < n - 1; i++) {
    k = i;
    p = d[i];
    for (j = i + 1; j < n; j++) {
      if (d[j] < p) {
        k = j;
        p = d[j];
      }
    }

    if (k !== i) {
      d[k] = d[i];
      d[i] = p;
      for (j = 0; j < n; j++) {
        p = V.get(j, i);
        V.set(j, i, V.get(j, k));
        V.set(j, k, p);
      }
    }
  }
}

function orthes(n, H, ort, V) {
  let low = 0;
  let high = n - 1;
  let f, g, h, i, j, m;
  let scale;

  for (m = low + 1; m <= high - 1; m++) {
    scale = 0;
    for (i = m; i <= high; i++) {
      scale = scale + Math.abs(H.get(i, m - 1));
    }

    if (scale !== 0) {
      h = 0;
      for (i = high; i >= m; i--) {
        ort[i] = H.get(i, m - 1) / scale;
        h += ort[i] * ort[i];
      }

      g = Math.sqrt(h);
      if (ort[m] > 0) {
        g = -g;
      }

      h = h - ort[m] * g;
      ort[m] = ort[m] - g;

      for (j = m; j < n; j++) {
        f = 0;
        for (i = high; i >= m; i--) {
          f += ort[i] * H.get(i, j);
        }

        f = f / h;
        for (i = m; i <= high; i++) {
          H.set(i, j, H.get(i, j) - f * ort[i]);
        }
      }

      for (i = 0; i <= high; i++) {
        f = 0;
        for (j = high; j >= m; j--) {
          f += ort[j] * H.get(i, j);
        }

        f = f / h;
        for (j = m; j <= high; j++) {
          H.set(i, j, H.get(i, j) - f * ort[j]);
        }
      }

      ort[m] = scale * ort[m];
      H.set(m, m - 1, scale * g);
    }
  }

  for (i = 0; i < n; i++) {
    for (j = 0; j < n; j++) {
      V.set(i, j, i === j ? 1 : 0);
    }
  }

  for (m = high - 1; m >= low + 1; m--) {
    if (H.get(m, m - 1) !== 0) {
      for (i = m + 1; i <= high; i++) {
        ort[i] = H.get(i, m - 1);
      }

      for (j = m; j <= high; j++) {
        g = 0;
        for (i = m; i <= high; i++) {
          g += ort[i] * V.get(i, j);
        }

        g = g / ort[m] / H.get(m, m - 1);
        for (i = m; i <= high; i++) {
          V.set(i, j, V.get(i, j) + g * ort[i]);
        }
      }
    }
  }
}

function hqr2(nn, e, d, V, H) {
  let n = nn - 1;
  let low = 0;
  let high = nn - 1;
  let eps = Number.EPSILON;
  let exshift = 0;
  let norm = 0;
  let p = 0;
  let q = 0;
  let r = 0;
  let s = 0;
  let z = 0;
  let iter = 0;
  let i, j, k, l, m, t, w, x, y;
  let ra, sa, vr, vi;
  let notlast, cdivres;

  for (i = 0; i < nn; i++) {
    if (i < low || i > high) {
      d[i] = H.get(i, i);
      e[i] = 0;
    }

    for (j = Math.max(i - 1, 0); j < nn; j++) {
      norm = norm + Math.abs(H.get(i, j));
    }
  }

  while (n >= low) {
    l = n;
    while (l > low) {
      s = Math.abs(H.get(l - 1, l - 1)) + Math.abs(H.get(l, l));
      if (s === 0) {
        s = norm;
      }
      if (Math.abs(H.get(l, l - 1)) < eps * s) {
        break;
      }
      l--;
    }

    if (l === n) {
      H.set(n, n, H.get(n, n) + exshift);
      d[n] = H.get(n, n);
      e[n] = 0;
      n--;
      iter = 0;
    } else if (l === n - 1) {
      w = H.get(n, n - 1) * H.get(n - 1, n);
      p = (H.get(n - 1, n - 1) - H.get(n, n)) / 2;
      q = p * p + w;
      z = Math.sqrt(Math.abs(q));
      H.set(n, n, H.get(n, n) + exshift);
      H.set(n - 1, n - 1, H.get(n - 1, n - 1) + exshift);
      x = H.get(n, n);

      if (q >= 0) {
        z = p >= 0 ? p + z : p - z;
        d[n - 1] = x + z;
        d[n] = d[n - 1];
        if (z !== 0) {
          d[n] = x - w / z;
        }
        e[n - 1] = 0;
        e[n] = 0;
        x = H.get(n, n - 1);
        s = Math.abs(x) + Math.abs(z);
        p = x / s;
        q = z / s;
        r = Math.sqrt(p * p + q * q);
        p = p / r;
        q = q / r;

        for (j = n - 1; j < nn; j++) {
          z = H.get(n - 1, j);
          H.set(n - 1, j, q * z + p * H.get(n, j));
          H.set(n, j, q * H.get(n, j) - p * z);
        }

        for (i = 0; i <= n; i++) {
          z = H.get(i, n - 1);
          H.set(i, n - 1, q * z + p * H.get(i, n));
          H.set(i, n, q * H.get(i, n) - p * z);
        }

        for (i = low; i <= high; i++) {
          z = V.get(i, n - 1);
          V.set(i, n - 1, q * z + p * V.get(i, n));
          V.set(i, n, q * V.get(i, n) - p * z);
        }
      } else {
        d[n - 1] = x + p;
        d[n] = x + p;
        e[n - 1] = z;
        e[n] = -z;
      }

      n = n - 2;
      iter = 0;
    } else {
      x = H.get(n, n);
      y = 0;
      w = 0;
      if (l < n) {
        y = H.get(n - 1, n - 1);
        w = H.get(n, n - 1) * H.get(n - 1, n);
      }

      if (iter === 10) {
        exshift += x;
        for (i = low; i <= n; i++) {
          H.set(i, i, H.get(i, i) - x);
        }
        s = Math.abs(H.get(n, n - 1)) + Math.abs(H.get(n - 1, n - 2));
        x = y = 0.75 * s;
        w = -0.4375 * s * s;
      }

      if (iter === 30) {
        s = (y - x) / 2;
        s = s * s + w;
        if (s > 0) {
          s = Math.sqrt(s);
          if (y < x) {
            s = -s;
          }
          s = x - w / ((y - x) / 2 + s);
          for (i = low; i <= n; i++) {
            H.set(i, i, H.get(i, i) - s);
          }
          exshift += s;
          x = y = w = 0.964;
        }
      }

      iter = iter + 1;

      m = n - 2;
      while (m >= l) {
        z = H.get(m, m);
        r = x - z;
        s = y - z;
        p = (r * s - w) / H.get(m + 1, m) + H.get(m, m + 1);
        q = H.get(m + 1, m + 1) - z - r - s;
        r = H.get(m + 2, m + 1);
        s = Math.abs(p) + Math.abs(q) + Math.abs(r);
        p = p / s;
        q = q / s;
        r = r / s;
        if (m === l) {
          break;
        }
        if (
          Math.abs(H.get(m, m - 1)) * (Math.abs(q) + Math.abs(r)) <
          eps *
            (Math.abs(p) *
              (Math.abs(H.get(m - 1, m - 1)) +
                Math.abs(z) +
                Math.abs(H.get(m + 1, m + 1))))
        ) {
          break;
        }
        m--;
      }

      for (i = m + 2; i <= n; i++) {
        H.set(i, i - 2, 0);
        if (i > m + 2) {
          H.set(i, i - 3, 0);
        }
      }

      for (k = m; k <= n - 1; k++) {
        notlast = k !== n - 1;
        if (k !== m) {
          p = H.get(k, k - 1);
          q = H.get(k + 1, k - 1);
          r = notlast ? H.get(k + 2, k - 1) : 0;
          x = Math.abs(p) + Math.abs(q) + Math.abs(r);
          if (x !== 0) {
            p = p / x;
            q = q / x;
            r = r / x;
          }
        }

        if (x === 0) {
          break;
        }

        s = Math.sqrt(p * p + q * q + r * r);
        if (p < 0) {
          s = -s;
        }

        if (s !== 0) {
          if (k !== m) {
            H.set(k, k - 1, -s * x);
          } else if (l !== m) {
            H.set(k, k - 1, -H.get(k, k - 1));
          }

          p = p + s;
          x = p / s;
          y = q / s;
          z = r / s;
          q = q / p;
          r = r / p;

          for (j = k; j < nn; j++) {
            p = H.get(k, j) + q * H.get(k + 1, j);
            if (notlast) {
              p = p + r * H.get(k + 2, j);
              H.set(k + 2, j, H.get(k + 2, j) - p * z);
            }

            H.set(k, j, H.get(k, j) - p * x);
            H.set(k + 1, j, H.get(k + 1, j) - p * y);
          }

          for (i = 0; i <= Math.min(n, k + 3); i++) {
            p = x * H.get(i, k) + y * H.get(i, k + 1);
            if (notlast) {
              p = p + z * H.get(i, k + 2);
              H.set(i, k + 2, H.get(i, k + 2) - p * r);
            }

            H.set(i, k, H.get(i, k) - p);
            H.set(i, k + 1, H.get(i, k + 1) - p * q);
          }

          for (i = low; i <= high; i++) {
            p = x * V.get(i, k) + y * V.get(i, k + 1);
            if (notlast) {
              p = p + z * V.get(i, k + 2);
              V.set(i, k + 2, V.get(i, k + 2) - p * r);
            }

            V.set(i, k, V.get(i, k) - p);
            V.set(i, k + 1, V.get(i, k + 1) - p * q);
          }
        }
      }
    }
  }

  if (norm === 0) {
    return;
  }

  for (n = nn - 1; n >= 0; n--) {
    p = d[n];
    q = e[n];

    if (q === 0) {
      l = n;
      H.set(n, n, 1);
      for (i = n - 1; i >= 0; i--) {
        w = H.get(i, i) - p;
        r = 0;
        for (j = l; j <= n; j++) {
          r = r + H.get(i, j) * H.get(j, n);
        }

        if (e[i] < 0) {
          z = w;
          s = r;
        } else {
          l = i;
          if (e[i] === 0) {
            H.set(i, n, w !== 0 ? -r / w : -r / (eps * norm));
          } else {
            x = H.get(i, i + 1);
            y = H.get(i + 1, i);
            q = (d[i] - p) * (d[i] - p) + e[i] * e[i];
            t = (x * s - z * r) / q;
            H.set(i, n, t);
            H.set(
              i + 1,
              n,
              Math.abs(x) > Math.abs(z) ? (-r - w * t) / x : (-s - y * t) / z,
            );
          }

          t = Math.abs(H.get(i, n));
          if (eps * t * t > 1) {
            for (j = i; j <= n; j++) {
              H.set(j, n, H.get(j, n) / t);
            }
          }
        }
      }
    } else if (q < 0) {
      l = n - 1;

      if (Math.abs(H.get(n, n - 1)) > Math.abs(H.get(n - 1, n))) {
        H.set(n - 1, n - 1, q / H.get(n, n - 1));
        H.set(n - 1, n, -(H.get(n, n) - p) / H.get(n, n - 1));
      } else {
        cdivres = cdiv(0, -H.get(n - 1, n), H.get(n - 1, n - 1) - p, q);
        H.set(n - 1, n - 1, cdivres[0]);
        H.set(n - 1, n, cdivres[1]);
      }

      H.set(n, n - 1, 0);
      H.set(n, n, 1);
      for (i = n - 2; i >= 0; i--) {
        ra = 0;
        sa = 0;
        for (j = l; j <= n; j++) {
          ra = ra + H.get(i, j) * H.get(j, n - 1);
          sa = sa + H.get(i, j) * H.get(j, n);
        }

        w = H.get(i, i) - p;

        if (e[i] < 0) {
          z = w;
          r = ra;
          s = sa;
        } else {
          l = i;
          if (e[i] === 0) {
            cdivres = cdiv(-ra, -sa, w, q);
            H.set(i, n - 1, cdivres[0]);
            H.set(i, n, cdivres[1]);
          } else {
            x = H.get(i, i + 1);
            y = H.get(i + 1, i);
            vr = (d[i] - p) * (d[i] - p) + e[i] * e[i] - q * q;
            vi = (d[i] - p) * 2 * q;
            if (vr === 0 && vi === 0) {
              vr =
                eps *
                norm *
                (Math.abs(w) +
                  Math.abs(q) +
                  Math.abs(x) +
                  Math.abs(y) +
                  Math.abs(z));
            }
            cdivres = cdiv(
              x * r - z * ra + q * sa,
              x * s - z * sa - q * ra,
              vr,
              vi,
            );
            H.set(i, n - 1, cdivres[0]);
            H.set(i, n, cdivres[1]);
            if (Math.abs(x) > Math.abs(z) + Math.abs(q)) {
              H.set(
                i + 1,
                n - 1,
                (-ra - w * H.get(i, n - 1) + q * H.get(i, n)) / x,
              );
              H.set(
                i + 1,
                n,
                (-sa - w * H.get(i, n) - q * H.get(i, n - 1)) / x,
              );
            } else {
              cdivres = cdiv(
                -r - y * H.get(i, n - 1),
                -s - y * H.get(i, n),
                z,
                q,
              );
              H.set(i + 1, n - 1, cdivres[0]);
              H.set(i + 1, n, cdivres[1]);
            }
          }

          t = Math.max(Math.abs(H.get(i, n - 1)), Math.abs(H.get(i, n)));
          if (eps * t * t > 1) {
            for (j = i; j <= n; j++) {
              H.set(j, n - 1, H.get(j, n - 1) / t);
              H.set(j, n, H.get(j, n) / t);
            }
          }
        }
      }
    }
  }

  for (i = 0; i < nn; i++) {
    if (i < low || i > high) {
      for (j = i; j < nn; j++) {
        V.set(i, j, H.get(i, j));
      }
    }
  }

  for (j = nn - 1; j >= low; j--) {
    for (i = low; i <= high; i++) {
      z = 0;
      for (k = low; k <= Math.min(j, high); k++) {
        z = z + V.get(i, k) * H.get(k, j);
      }
      V.set(i, j, z);
    }
  }
}

function cdiv(xr, xi, yr, yi) {
  let r, d;
  if (Math.abs(yr) > Math.abs(yi)) {
    r = yi / yr;
    d = yr + r * yi;
    return [(xr + r * xi) / d, (xi - r * xr) / d];
  } else {
    r = yr / yi;
    d = yi + r * yr;
    return [(r * xr + xi) / d, (r * xi - xr) / d];
  }
}


/***/ }),

/***/ "./node_modules/ml-matrix/src/dc/lu.js":
/*!*********************************************!*\
  !*** ./node_modules/ml-matrix/src/dc/lu.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LuDecomposition; });
/* harmony import */ var _matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../matrix */ "./node_modules/ml-matrix/src/matrix.js");
/* harmony import */ var _wrap_WrapperMatrix2D__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../wrap/WrapperMatrix2D */ "./node_modules/ml-matrix/src/wrap/WrapperMatrix2D.js");



class LuDecomposition {
  constructor(matrix) {
    matrix = _wrap_WrapperMatrix2D__WEBPACK_IMPORTED_MODULE_1__["default"].checkMatrix(matrix);

    let lu = matrix.clone();
    let rows = lu.rows;
    let columns = lu.columns;
    let pivotVector = new Float64Array(rows);
    let pivotSign = 1;
    let i, j, k, p, s, t, v;
    let LUcolj, kmax;

    for (i = 0; i < rows; i++) {
      pivotVector[i] = i;
    }

    LUcolj = new Float64Array(rows);

    for (j = 0; j < columns; j++) {
      for (i = 0; i < rows; i++) {
        LUcolj[i] = lu.get(i, j);
      }

      for (i = 0; i < rows; i++) {
        kmax = Math.min(i, j);
        s = 0;
        for (k = 0; k < kmax; k++) {
          s += lu.get(i, k) * LUcolj[k];
        }
        LUcolj[i] -= s;
        lu.set(i, j, LUcolj[i]);
      }

      p = j;
      for (i = j + 1; i < rows; i++) {
        if (Math.abs(LUcolj[i]) > Math.abs(LUcolj[p])) {
          p = i;
        }
      }

      if (p !== j) {
        for (k = 0; k < columns; k++) {
          t = lu.get(p, k);
          lu.set(p, k, lu.get(j, k));
          lu.set(j, k, t);
        }

        v = pivotVector[p];
        pivotVector[p] = pivotVector[j];
        pivotVector[j] = v;

        pivotSign = -pivotSign;
      }

      if (j < rows && lu.get(j, j) !== 0) {
        for (i = j + 1; i < rows; i++) {
          lu.set(i, j, lu.get(i, j) / lu.get(j, j));
        }
      }
    }

    this.LU = lu;
    this.pivotVector = pivotVector;
    this.pivotSign = pivotSign;
  }

  isSingular() {
    let data = this.LU;
    let col = data.columns;
    for (let j = 0; j < col; j++) {
      if (data.get(j, j) === 0) {
        return true;
      }
    }
    return false;
  }

  solve(value) {
    value = _matrix__WEBPACK_IMPORTED_MODULE_0__["default"].checkMatrix(value);

    let lu = this.LU;
    let rows = lu.rows;

    if (rows !== value.rows) {
      throw new Error('Invalid matrix dimensions');
    }
    if (this.isSingular()) {
      throw new Error('LU matrix is singular');
    }

    let count = value.columns;
    let X = value.subMatrixRow(this.pivotVector, 0, count - 1);
    let columns = lu.columns;
    let i, j, k;

    for (k = 0; k < columns; k++) {
      for (i = k + 1; i < columns; i++) {
        for (j = 0; j < count; j++) {
          X.set(i, j, X.get(i, j) - X.get(k, j) * lu.get(i, k));
        }
      }
    }
    for (k = columns - 1; k >= 0; k--) {
      for (j = 0; j < count; j++) {
        X.set(k, j, X.get(k, j) / lu.get(k, k));
      }
      for (i = 0; i < k; i++) {
        for (j = 0; j < count; j++) {
          X.set(i, j, X.get(i, j) - X.get(k, j) * lu.get(i, k));
        }
      }
    }
    return X;
  }

  get determinant() {
    let data = this.LU;
    if (!data.isSquare()) {
      throw new Error('Matrix must be square');
    }
    let determinant = this.pivotSign;
    let col = data.columns;
    for (let j = 0; j < col; j++) {
      determinant *= data.get(j, j);
    }
    return determinant;
  }

  get lowerTriangularMatrix() {
    let data = this.LU;
    let rows = data.rows;
    let columns = data.columns;
    let X = new _matrix__WEBPACK_IMPORTED_MODULE_0__["default"](rows, columns);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        if (i > j) {
          X.set(i, j, data.get(i, j));
        } else if (i === j) {
          X.set(i, j, 1);
        } else {
          X.set(i, j, 0);
        }
      }
    }
    return X;
  }

  get upperTriangularMatrix() {
    let data = this.LU;
    let rows = data.rows;
    let columns = data.columns;
    let X = new _matrix__WEBPACK_IMPORTED_MODULE_0__["default"](rows, columns);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        if (i <= j) {
          X.set(i, j, data.get(i, j));
        } else {
          X.set(i, j, 0);
        }
      }
    }
    return X;
  }

  get pivotPermutationVector() {
    return Array.from(this.pivotVector);
  }
}


/***/ }),

/***/ "./node_modules/ml-matrix/src/dc/nipals.js":
/*!*************************************************!*\
  !*** ./node_modules/ml-matrix/src/dc/nipals.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return nipals; });
/* harmony import */ var _matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../matrix */ "./node_modules/ml-matrix/src/matrix.js");
/* harmony import */ var _wrap_WrapperMatrix2D__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../wrap/WrapperMatrix2D */ "./node_modules/ml-matrix/src/wrap/WrapperMatrix2D.js");



class nipals {
  constructor(X, options = {}) {
    X = _wrap_WrapperMatrix2D__WEBPACK_IMPORTED_MODULE_1__["default"].checkMatrix(X);
    let { Y } = options;
    const {
      scaleScores = false,
      maxIterations = 1000,
      terminationCriteria = 1e-10,
    } = options;

    let u;
    if (Y) {
      if (Array.isArray(Y) && typeof Y[0] === 'number') {
        Y = _matrix__WEBPACK_IMPORTED_MODULE_0__["default"].columnVector(Y);
      } else {
        Y = _wrap_WrapperMatrix2D__WEBPACK_IMPORTED_MODULE_1__["default"].checkMatrix(Y);
      }
      if (!Y.isColumnVector() || Y.rows !== X.rows) {
        throw new Error('Y must be a column vector of length X.rows');
      }
      u = Y;
    } else {
      u = X.getColumnVector(0);
    }

    let diff = 1;
    let t, q, w, tOld;

    for (
      let counter = 0;
      counter < maxIterations && diff > terminationCriteria;
      counter++
    ) {
      w = X.transpose().mmul(u).div(u.transpose().mmul(u).get(0, 0));
      w = w.div(w.norm());

      t = X.mmul(w).div(w.transpose().mmul(w).get(0, 0));

      if (counter > 0) {
        diff = t.clone().sub(tOld).pow(2).sum();
      }
      tOld = t.clone();

      if (Y) {
        q = Y.transpose().mmul(t).div(t.transpose().mmul(t).get(0, 0));
        q = q.div(q.norm());

        u = Y.mmul(q).div(q.transpose().mmul(q).get(0, 0));
      } else {
        u = t;
      }
    }

    if (Y) {
      let p = X.transpose().mmul(t).div(t.transpose().mmul(t).get(0, 0));
      p = p.div(p.norm());
      let xResidual = X.clone().sub(t.clone().mmul(p.transpose()));
      let residual = u.transpose().mmul(t).div(t.transpose().mmul(t).get(0, 0));
      let yResidual = Y.clone().sub(
        t.clone().mulS(residual.get(0, 0)).mmul(q.transpose()),
      );

      this.t = t;
      this.p = p.transpose();
      this.w = w.transpose();
      this.q = q;
      this.u = u;
      this.s = t.transpose().mmul(t);
      this.xResidual = xResidual;
      this.yResidual = yResidual;
      this.betas = residual;
    } else {
      this.w = w.transpose();
      this.s = t.transpose().mmul(t).sqrt();
      if (scaleScores) {
        this.t = t.clone().div(this.s.get(0, 0));
      } else {
        this.t = t;
      }
      this.xResidual = X.sub(t.mmul(w.transpose()));
    }
  }
}


/***/ }),

/***/ "./node_modules/ml-matrix/src/dc/qr.js":
/*!*********************************************!*\
  !*** ./node_modules/ml-matrix/src/dc/qr.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return QrDecomposition; });
/* harmony import */ var _matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../matrix */ "./node_modules/ml-matrix/src/matrix.js");
/* harmony import */ var _wrap_WrapperMatrix2D__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../wrap/WrapperMatrix2D */ "./node_modules/ml-matrix/src/wrap/WrapperMatrix2D.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ "./node_modules/ml-matrix/src/dc/util.js");





class QrDecomposition {
  constructor(value) {
    value = _wrap_WrapperMatrix2D__WEBPACK_IMPORTED_MODULE_1__["default"].checkMatrix(value);

    let qr = value.clone();
    let m = value.rows;
    let n = value.columns;
    let rdiag = new Float64Array(n);
    let i, j, k, s;

    for (k = 0; k < n; k++) {
      let nrm = 0;
      for (i = k; i < m; i++) {
        nrm = Object(_util__WEBPACK_IMPORTED_MODULE_2__["hypotenuse"])(nrm, qr.get(i, k));
      }
      if (nrm !== 0) {
        if (qr.get(k, k) < 0) {
          nrm = -nrm;
        }
        for (i = k; i < m; i++) {
          qr.set(i, k, qr.get(i, k) / nrm);
        }
        qr.set(k, k, qr.get(k, k) + 1);
        for (j = k + 1; j < n; j++) {
          s = 0;
          for (i = k; i < m; i++) {
            s += qr.get(i, k) * qr.get(i, j);
          }
          s = -s / qr.get(k, k);
          for (i = k; i < m; i++) {
            qr.set(i, j, qr.get(i, j) + s * qr.get(i, k));
          }
        }
      }
      rdiag[k] = -nrm;
    }

    this.QR = qr;
    this.Rdiag = rdiag;
  }

  solve(value) {
    value = _matrix__WEBPACK_IMPORTED_MODULE_0__["default"].checkMatrix(value);

    let qr = this.QR;
    let m = qr.rows;

    if (value.rows !== m) {
      throw new Error('Matrix row dimensions must agree');
    }
    if (!this.isFullRank()) {
      throw new Error('Matrix is rank deficient');
    }

    let count = value.columns;
    let X = value.clone();
    let n = qr.columns;
    let i, j, k, s;

    for (k = 0; k < n; k++) {
      for (j = 0; j < count; j++) {
        s = 0;
        for (i = k; i < m; i++) {
          s += qr.get(i, k) * X.get(i, j);
        }
        s = -s / qr.get(k, k);
        for (i = k; i < m; i++) {
          X.set(i, j, X.get(i, j) + s * qr.get(i, k));
        }
      }
    }
    for (k = n - 1; k >= 0; k--) {
      for (j = 0; j < count; j++) {
        X.set(k, j, X.get(k, j) / this.Rdiag[k]);
      }
      for (i = 0; i < k; i++) {
        for (j = 0; j < count; j++) {
          X.set(i, j, X.get(i, j) - X.get(k, j) * qr.get(i, k));
        }
      }
    }

    return X.subMatrix(0, n - 1, 0, count - 1);
  }

  isFullRank() {
    let columns = this.QR.columns;
    for (let i = 0; i < columns; i++) {
      if (this.Rdiag[i] === 0) {
        return false;
      }
    }
    return true;
  }

  get upperTriangularMatrix() {
    let qr = this.QR;
    let n = qr.columns;
    let X = new _matrix__WEBPACK_IMPORTED_MODULE_0__["default"](n, n);
    let i, j;
    for (i = 0; i < n; i++) {
      for (j = 0; j < n; j++) {
        if (i < j) {
          X.set(i, j, qr.get(i, j));
        } else if (i === j) {
          X.set(i, j, this.Rdiag[i]);
        } else {
          X.set(i, j, 0);
        }
      }
    }
    return X;
  }

  get orthogonalMatrix() {
    let qr = this.QR;
    let rows = qr.rows;
    let columns = qr.columns;
    let X = new _matrix__WEBPACK_IMPORTED_MODULE_0__["default"](rows, columns);
    let i, j, k, s;

    for (k = columns - 1; k >= 0; k--) {
      for (i = 0; i < rows; i++) {
        X.set(i, k, 0);
      }
      X.set(k, k, 1);
      for (j = k; j < columns; j++) {
        if (qr.get(k, k) !== 0) {
          s = 0;
          for (i = k; i < rows; i++) {
            s += qr.get(i, k) * X.get(i, j);
          }

          s = -s / qr.get(k, k);

          for (i = k; i < rows; i++) {
            X.set(i, j, X.get(i, j) + s * qr.get(i, k));
          }
        }
      }
    }
    return X;
  }
}


/***/ }),

/***/ "./node_modules/ml-matrix/src/dc/svd.js":
/*!**********************************************!*\
  !*** ./node_modules/ml-matrix/src/dc/svd.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SingularValueDecomposition; });
/* harmony import */ var _matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../matrix */ "./node_modules/ml-matrix/src/matrix.js");
/* harmony import */ var _wrap_WrapperMatrix2D__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../wrap/WrapperMatrix2D */ "./node_modules/ml-matrix/src/wrap/WrapperMatrix2D.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ "./node_modules/ml-matrix/src/dc/util.js");





class SingularValueDecomposition {
  constructor(value, options = {}) {
    value = _wrap_WrapperMatrix2D__WEBPACK_IMPORTED_MODULE_1__["default"].checkMatrix(value);

    let m = value.rows;
    let n = value.columns;

    const {
      computeLeftSingularVectors = true,
      computeRightSingularVectors = true,
      autoTranspose = false,
    } = options;

    let wantu = Boolean(computeLeftSingularVectors);
    let wantv = Boolean(computeRightSingularVectors);

    let swapped = false;
    let a;
    if (m < n) {
      if (!autoTranspose) {
        a = value.clone();
        // eslint-disable-next-line no-console
        console.warn(
          'Computing SVD on a matrix with more columns than rows. Consider enabling autoTranspose',
        );
      } else {
        a = value.transpose();
        m = a.rows;
        n = a.columns;
        swapped = true;
        let aux = wantu;
        wantu = wantv;
        wantv = aux;
      }
    } else {
      a = value.clone();
    }

    let nu = Math.min(m, n);
    let ni = Math.min(m + 1, n);
    let s = new Float64Array(ni);
    let U = new _matrix__WEBPACK_IMPORTED_MODULE_0__["default"](m, nu);
    let V = new _matrix__WEBPACK_IMPORTED_MODULE_0__["default"](n, n);

    let e = new Float64Array(n);
    let work = new Float64Array(m);

    let si = new Float64Array(ni);
    for (let i = 0; i < ni; i++) si[i] = i;

    let nct = Math.min(m - 1, n);
    let nrt = Math.max(0, Math.min(n - 2, m));
    let mrc = Math.max(nct, nrt);

    for (let k = 0; k < mrc; k++) {
      if (k < nct) {
        s[k] = 0;
        for (let i = k; i < m; i++) {
          s[k] = Object(_util__WEBPACK_IMPORTED_MODULE_2__["hypotenuse"])(s[k], a.get(i, k));
        }
        if (s[k] !== 0) {
          if (a.get(k, k) < 0) {
            s[k] = -s[k];
          }
          for (let i = k; i < m; i++) {
            a.set(i, k, a.get(i, k) / s[k]);
          }
          a.set(k, k, a.get(k, k) + 1);
        }
        s[k] = -s[k];
      }

      for (let j = k + 1; j < n; j++) {
        if (k < nct && s[k] !== 0) {
          let t = 0;
          for (let i = k; i < m; i++) {
            t += a.get(i, k) * a.get(i, j);
          }
          t = -t / a.get(k, k);
          for (let i = k; i < m; i++) {
            a.set(i, j, a.get(i, j) + t * a.get(i, k));
          }
        }
        e[j] = a.get(k, j);
      }

      if (wantu && k < nct) {
        for (let i = k; i < m; i++) {
          U.set(i, k, a.get(i, k));
        }
      }

      if (k < nrt) {
        e[k] = 0;
        for (let i = k + 1; i < n; i++) {
          e[k] = Object(_util__WEBPACK_IMPORTED_MODULE_2__["hypotenuse"])(e[k], e[i]);
        }
        if (e[k] !== 0) {
          if (e[k + 1] < 0) {
            e[k] = 0 - e[k];
          }
          for (let i = k + 1; i < n; i++) {
            e[i] /= e[k];
          }
          e[k + 1] += 1;
        }
        e[k] = -e[k];
        if (k + 1 < m && e[k] !== 0) {
          for (let i = k + 1; i < m; i++) {
            work[i] = 0;
          }
          for (let i = k + 1; i < m; i++) {
            for (let j = k + 1; j < n; j++) {
              work[i] += e[j] * a.get(i, j);
            }
          }
          for (let j = k + 1; j < n; j++) {
            let t = -e[j] / e[k + 1];
            for (let i = k + 1; i < m; i++) {
              a.set(i, j, a.get(i, j) + t * work[i]);
            }
          }
        }
        if (wantv) {
          for (let i = k + 1; i < n; i++) {
            V.set(i, k, e[i]);
          }
        }
      }
    }

    let p = Math.min(n, m + 1);
    if (nct < n) {
      s[nct] = a.get(nct, nct);
    }
    if (m < p) {
      s[p - 1] = 0;
    }
    if (nrt + 1 < p) {
      e[nrt] = a.get(nrt, p - 1);
    }
    e[p - 1] = 0;

    if (wantu) {
      for (let j = nct; j < nu; j++) {
        for (let i = 0; i < m; i++) {
          U.set(i, j, 0);
        }
        U.set(j, j, 1);
      }
      for (let k = nct - 1; k >= 0; k--) {
        if (s[k] !== 0) {
          for (let j = k + 1; j < nu; j++) {
            let t = 0;
            for (let i = k; i < m; i++) {
              t += U.get(i, k) * U.get(i, j);
            }
            t = -t / U.get(k, k);
            for (let i = k; i < m; i++) {
              U.set(i, j, U.get(i, j) + t * U.get(i, k));
            }
          }
          for (let i = k; i < m; i++) {
            U.set(i, k, -U.get(i, k));
          }
          U.set(k, k, 1 + U.get(k, k));
          for (let i = 0; i < k - 1; i++) {
            U.set(i, k, 0);
          }
        } else {
          for (let i = 0; i < m; i++) {
            U.set(i, k, 0);
          }
          U.set(k, k, 1);
        }
      }
    }

    if (wantv) {
      for (let k = n - 1; k >= 0; k--) {
        if (k < nrt && e[k] !== 0) {
          for (let j = k + 1; j < n; j++) {
            let t = 0;
            for (let i = k + 1; i < n; i++) {
              t += V.get(i, k) * V.get(i, j);
            }
            t = -t / V.get(k + 1, k);
            for (let i = k + 1; i < n; i++) {
              V.set(i, j, V.get(i, j) + t * V.get(i, k));
            }
          }
        }
        for (let i = 0; i < n; i++) {
          V.set(i, k, 0);
        }
        V.set(k, k, 1);
      }
    }

    let pp = p - 1;
    let iter = 0;
    let eps = Number.EPSILON;
    while (p > 0) {
      let k, kase;
      for (k = p - 2; k >= -1; k--) {
        if (k === -1) {
          break;
        }
        const alpha =
          Number.MIN_VALUE + eps * Math.abs(s[k] + Math.abs(s[k + 1]));
        if (Math.abs(e[k]) <= alpha || Number.isNaN(e[k])) {
          e[k] = 0;
          break;
        }
      }
      if (k === p - 2) {
        kase = 4;
      } else {
        let ks;
        for (ks = p - 1; ks >= k; ks--) {
          if (ks === k) {
            break;
          }
          let t =
            (ks !== p ? Math.abs(e[ks]) : 0) +
            (ks !== k + 1 ? Math.abs(e[ks - 1]) : 0);
          if (Math.abs(s[ks]) <= eps * t) {
            s[ks] = 0;
            break;
          }
        }
        if (ks === k) {
          kase = 3;
        } else if (ks === p - 1) {
          kase = 1;
        } else {
          kase = 2;
          k = ks;
        }
      }

      k++;

      switch (kase) {
        case 1: {
          let f = e[p - 2];
          e[p - 2] = 0;
          for (let j = p - 2; j >= k; j--) {
            let t = Object(_util__WEBPACK_IMPORTED_MODULE_2__["hypotenuse"])(s[j], f);
            let cs = s[j] / t;
            let sn = f / t;
            s[j] = t;
            if (j !== k) {
              f = -sn * e[j - 1];
              e[j - 1] = cs * e[j - 1];
            }
            if (wantv) {
              for (let i = 0; i < n; i++) {
                t = cs * V.get(i, j) + sn * V.get(i, p - 1);
                V.set(i, p - 1, -sn * V.get(i, j) + cs * V.get(i, p - 1));
                V.set(i, j, t);
              }
            }
          }
          break;
        }
        case 2: {
          let f = e[k - 1];
          e[k - 1] = 0;
          for (let j = k; j < p; j++) {
            let t = Object(_util__WEBPACK_IMPORTED_MODULE_2__["hypotenuse"])(s[j], f);
            let cs = s[j] / t;
            let sn = f / t;
            s[j] = t;
            f = -sn * e[j];
            e[j] = cs * e[j];
            if (wantu) {
              for (let i = 0; i < m; i++) {
                t = cs * U.get(i, j) + sn * U.get(i, k - 1);
                U.set(i, k - 1, -sn * U.get(i, j) + cs * U.get(i, k - 1));
                U.set(i, j, t);
              }
            }
          }
          break;
        }
        case 3: {
          const scale = Math.max(
            Math.abs(s[p - 1]),
            Math.abs(s[p - 2]),
            Math.abs(e[p - 2]),
            Math.abs(s[k]),
            Math.abs(e[k]),
          );
          const sp = s[p - 1] / scale;
          const spm1 = s[p - 2] / scale;
          const epm1 = e[p - 2] / scale;
          const sk = s[k] / scale;
          const ek = e[k] / scale;
          const b = ((spm1 + sp) * (spm1 - sp) + epm1 * epm1) / 2;
          const c = sp * epm1 * (sp * epm1);
          let shift = 0;
          if (b !== 0 || c !== 0) {
            if (b < 0) {
              shift = 0 - Math.sqrt(b * b + c);
            } else {
              shift = Math.sqrt(b * b + c);
            }
            shift = c / (b + shift);
          }
          let f = (sk + sp) * (sk - sp) + shift;
          let g = sk * ek;
          for (let j = k; j < p - 1; j++) {
            let t = Object(_util__WEBPACK_IMPORTED_MODULE_2__["hypotenuse"])(f, g);
            if (t === 0) t = Number.MIN_VALUE;
            let cs = f / t;
            let sn = g / t;
            if (j !== k) {
              e[j - 1] = t;
            }
            f = cs * s[j] + sn * e[j];
            e[j] = cs * e[j] - sn * s[j];
            g = sn * s[j + 1];
            s[j + 1] = cs * s[j + 1];
            if (wantv) {
              for (let i = 0; i < n; i++) {
                t = cs * V.get(i, j) + sn * V.get(i, j + 1);
                V.set(i, j + 1, -sn * V.get(i, j) + cs * V.get(i, j + 1));
                V.set(i, j, t);
              }
            }
            t = Object(_util__WEBPACK_IMPORTED_MODULE_2__["hypotenuse"])(f, g);
            if (t === 0) t = Number.MIN_VALUE;
            cs = f / t;
            sn = g / t;
            s[j] = t;
            f = cs * e[j] + sn * s[j + 1];
            s[j + 1] = -sn * e[j] + cs * s[j + 1];
            g = sn * e[j + 1];
            e[j + 1] = cs * e[j + 1];
            if (wantu && j < m - 1) {
              for (let i = 0; i < m; i++) {
                t = cs * U.get(i, j) + sn * U.get(i, j + 1);
                U.set(i, j + 1, -sn * U.get(i, j) + cs * U.get(i, j + 1));
                U.set(i, j, t);
              }
            }
          }
          e[p - 2] = f;
          iter = iter + 1;
          break;
        }
        case 4: {
          if (s[k] <= 0) {
            s[k] = s[k] < 0 ? -s[k] : 0;
            if (wantv) {
              for (let i = 0; i <= pp; i++) {
                V.set(i, k, -V.get(i, k));
              }
            }
          }
          while (k < pp) {
            if (s[k] >= s[k + 1]) {
              break;
            }
            let t = s[k];
            s[k] = s[k + 1];
            s[k + 1] = t;
            if (wantv && k < n - 1) {
              for (let i = 0; i < n; i++) {
                t = V.get(i, k + 1);
                V.set(i, k + 1, V.get(i, k));
                V.set(i, k, t);
              }
            }
            if (wantu && k < m - 1) {
              for (let i = 0; i < m; i++) {
                t = U.get(i, k + 1);
                U.set(i, k + 1, U.get(i, k));
                U.set(i, k, t);
              }
            }
            k++;
          }
          iter = 0;
          p--;
          break;
        }
        // no default
      }
    }

    if (swapped) {
      let tmp = V;
      V = U;
      U = tmp;
    }

    this.m = m;
    this.n = n;
    this.s = s;
    this.U = U;
    this.V = V;
  }

  solve(value) {
    let Y = value;
    let e = this.threshold;
    let scols = this.s.length;
    let Ls = _matrix__WEBPACK_IMPORTED_MODULE_0__["default"].zeros(scols, scols);

    for (let i = 0; i < scols; i++) {
      if (Math.abs(this.s[i]) <= e) {
        Ls.set(i, i, 0);
      } else {
        Ls.set(i, i, 1 / this.s[i]);
      }
    }

    let U = this.U;
    let V = this.rightSingularVectors;

    let VL = V.mmul(Ls);
    let vrows = V.rows;
    let urows = U.rows;
    let VLU = _matrix__WEBPACK_IMPORTED_MODULE_0__["default"].zeros(vrows, urows);

    for (let i = 0; i < vrows; i++) {
      for (let j = 0; j < urows; j++) {
        let sum = 0;
        for (let k = 0; k < scols; k++) {
          sum += VL.get(i, k) * U.get(j, k);
        }
        VLU.set(i, j, sum);
      }
    }

    return VLU.mmul(Y);
  }

  solveForDiagonal(value) {
    return this.solve(_matrix__WEBPACK_IMPORTED_MODULE_0__["default"].diag(value));
  }

  inverse() {
    let V = this.V;
    let e = this.threshold;
    let vrows = V.rows;
    let vcols = V.columns;
    let X = new _matrix__WEBPACK_IMPORTED_MODULE_0__["default"](vrows, this.s.length);

    for (let i = 0; i < vrows; i++) {
      for (let j = 0; j < vcols; j++) {
        if (Math.abs(this.s[j]) > e) {
          X.set(i, j, V.get(i, j) / this.s[j]);
        }
      }
    }

    let U = this.U;

    let urows = U.rows;
    let ucols = U.columns;
    let Y = new _matrix__WEBPACK_IMPORTED_MODULE_0__["default"](vrows, urows);

    for (let i = 0; i < vrows; i++) {
      for (let j = 0; j < urows; j++) {
        let sum = 0;
        for (let k = 0; k < ucols; k++) {
          sum += X.get(i, k) * U.get(j, k);
        }
        Y.set(i, j, sum);
      }
    }

    return Y;
  }

  get condition() {
    return this.s[0] / this.s[Math.min(this.m, this.n) - 1];
  }

  get norm2() {
    return this.s[0];
  }

  get rank() {
    let tol = Math.max(this.m, this.n) * this.s[0] * Number.EPSILON;
    let r = 0;
    let s = this.s;
    for (let i = 0, ii = s.length; i < ii; i++) {
      if (s[i] > tol) {
        r++;
      }
    }
    return r;
  }

  get diagonal() {
    return Array.from(this.s);
  }

  get threshold() {
    return (Number.EPSILON / 2) * Math.max(this.m, this.n) * this.s[0];
  }

  get leftSingularVectors() {
    return this.U;
  }

  get rightSingularVectors() {
    return this.V;
  }

  get diagonalMatrix() {
    return _matrix__WEBPACK_IMPORTED_MODULE_0__["default"].diag(this.s);
  }
}


/***/ }),

/***/ "./node_modules/ml-matrix/src/dc/util.js":
/*!***********************************************!*\
  !*** ./node_modules/ml-matrix/src/dc/util.js ***!
  \***********************************************/
/*! exports provided: hypotenuse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hypotenuse", function() { return hypotenuse; });
function hypotenuse(a, b) {
  let r = 0;
  if (Math.abs(a) > Math.abs(b)) {
    r = b / a;
    return Math.abs(a) * Math.sqrt(1 + r * r);
  }
  if (b !== 0) {
    r = a / b;
    return Math.abs(b) * Math.sqrt(1 + r * r);
  }
  return 0;
}


/***/ }),

/***/ "./node_modules/ml-matrix/src/decompositions.js":
/*!******************************************************!*\
  !*** ./node_modules/ml-matrix/src/decompositions.js ***!
  \******************************************************/
/*! exports provided: inverse, solve */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inverse", function() { return inverse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "solve", function() { return solve; });
/* harmony import */ var _dc_lu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dc/lu */ "./node_modules/ml-matrix/src/dc/lu.js");
/* harmony import */ var _dc_qr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dc/qr */ "./node_modules/ml-matrix/src/dc/qr.js");
/* harmony import */ var _dc_svd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dc/svd */ "./node_modules/ml-matrix/src/dc/svd.js");
/* harmony import */ var _matrix__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./matrix */ "./node_modules/ml-matrix/src/matrix.js");
/* harmony import */ var _wrap_WrapperMatrix2D__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./wrap/WrapperMatrix2D */ "./node_modules/ml-matrix/src/wrap/WrapperMatrix2D.js");






function inverse(matrix, useSVD = false) {
  matrix = _wrap_WrapperMatrix2D__WEBPACK_IMPORTED_MODULE_4__["default"].checkMatrix(matrix);
  if (useSVD) {
    return new _dc_svd__WEBPACK_IMPORTED_MODULE_2__["default"](matrix).inverse();
  } else {
    return solve(matrix, _matrix__WEBPACK_IMPORTED_MODULE_3__["default"].eye(matrix.rows));
  }
}

function solve(leftHandSide, rightHandSide, useSVD = false) {
  leftHandSide = _wrap_WrapperMatrix2D__WEBPACK_IMPORTED_MODULE_4__["default"].checkMatrix(leftHandSide);
  rightHandSide = _wrap_WrapperMatrix2D__WEBPACK_IMPORTED_MODULE_4__["default"].checkMatrix(rightHandSide);
  if (useSVD) {
    return new _dc_svd__WEBPACK_IMPORTED_MODULE_2__["default"](leftHandSide).solve(rightHandSide);
  } else {
    return leftHandSide.isSquare()
      ? new _dc_lu__WEBPACK_IMPORTED_MODULE_0__["default"](leftHandSide).solve(rightHandSide)
      : new _dc_qr__WEBPACK_IMPORTED_MODULE_1__["default"](leftHandSide).solve(rightHandSide);
  }
}


/***/ }),

/***/ "./node_modules/ml-matrix/src/determinant.js":
/*!***************************************************!*\
  !*** ./node_modules/ml-matrix/src/determinant.js ***!
  \***************************************************/
/*! exports provided: determinant */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "determinant", function() { return determinant; });
/* harmony import */ var _dc_lu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dc/lu */ "./node_modules/ml-matrix/src/dc/lu.js");
/* harmony import */ var _matrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./matrix */ "./node_modules/ml-matrix/src/matrix.js");
/* harmony import */ var _views_selection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./views/selection */ "./node_modules/ml-matrix/src/views/selection.js");




function determinant(matrix) {
  matrix = _matrix__WEBPACK_IMPORTED_MODULE_1__["default"].checkMatrix(matrix);
  if (matrix.isSquare()) {
    let a, b, c, d;
    if (matrix.columns === 2) {
      // 2 x 2 matrix
      a = matrix.get(0, 0);
      b = matrix.get(0, 1);
      c = matrix.get(1, 0);
      d = matrix.get(1, 1);

      return a * d - b * c;
    } else if (matrix.columns === 3) {
      // 3 x 3 matrix
      let subMatrix0, subMatrix1, subMatrix2;
      subMatrix0 = new _views_selection__WEBPACK_IMPORTED_MODULE_2__["default"](matrix, [1, 2], [1, 2]);
      subMatrix1 = new _views_selection__WEBPACK_IMPORTED_MODULE_2__["default"](matrix, [1, 2], [0, 2]);
      subMatrix2 = new _views_selection__WEBPACK_IMPORTED_MODULE_2__["default"](matrix, [1, 2], [0, 1]);
      a = matrix.get(0, 0);
      b = matrix.get(0, 1);
      c = matrix.get(0, 2);

      return (
        a * determinant(subMatrix0) -
        b * determinant(subMatrix1) +
        c * determinant(subMatrix2)
      );
    } else {
      // general purpose determinant using the LU decomposition
      return new _dc_lu__WEBPACK_IMPORTED_MODULE_0__["default"](matrix).determinant;
    }
  } else {
    throw Error('determinant can only be calculated for a square matrix');
  }
}


/***/ }),

/***/ "./node_modules/ml-matrix/src/index.js":
/*!*********************************************!*\
  !*** ./node_modules/ml-matrix/src/index.js ***!
  \*********************************************/
/*! exports provided: AbstractMatrix, default, Matrix, MatrixColumnView, MatrixColumnSelectionView, MatrixFlipColumnView, MatrixFlipRowView, MatrixRowView, MatrixRowSelectionView, MatrixSelectionView, MatrixSubView, MatrixTransposeView, wrap, WrapperMatrix1D, WrapperMatrix2D, solve, inverse, determinant, linearDependencies, pseudoInverse, covariance, correlation, SingularValueDecomposition, SVD, EigenvalueDecomposition, EVD, CholeskyDecomposition, CHO, LuDecomposition, LU, QrDecomposition, QR, Nipals, NIPALS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./matrix */ "./node_modules/ml-matrix/src/matrix.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AbstractMatrix", function() { return _matrix__WEBPACK_IMPORTED_MODULE_0__["AbstractMatrix"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _matrix__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Matrix", function() { return _matrix__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _views_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./views/index */ "./node_modules/ml-matrix/src/views/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MatrixColumnView", function() { return _views_index__WEBPACK_IMPORTED_MODULE_1__["MatrixColumnView"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MatrixColumnSelectionView", function() { return _views_index__WEBPACK_IMPORTED_MODULE_1__["MatrixColumnSelectionView"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MatrixFlipColumnView", function() { return _views_index__WEBPACK_IMPORTED_MODULE_1__["MatrixFlipColumnView"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MatrixFlipRowView", function() { return _views_index__WEBPACK_IMPORTED_MODULE_1__["MatrixFlipRowView"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MatrixRowView", function() { return _views_index__WEBPACK_IMPORTED_MODULE_1__["MatrixRowView"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MatrixRowSelectionView", function() { return _views_index__WEBPACK_IMPORTED_MODULE_1__["MatrixRowSelectionView"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MatrixSelectionView", function() { return _views_index__WEBPACK_IMPORTED_MODULE_1__["MatrixSelectionView"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MatrixSubView", function() { return _views_index__WEBPACK_IMPORTED_MODULE_1__["MatrixSubView"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MatrixTransposeView", function() { return _views_index__WEBPACK_IMPORTED_MODULE_1__["MatrixTransposeView"]; });

/* harmony import */ var _wrap_wrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./wrap/wrap */ "./node_modules/ml-matrix/src/wrap/wrap.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "wrap", function() { return _wrap_wrap__WEBPACK_IMPORTED_MODULE_2__["wrap"]; });

/* harmony import */ var _wrap_WrapperMatrix1D__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./wrap/WrapperMatrix1D */ "./node_modules/ml-matrix/src/wrap/WrapperMatrix1D.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WrapperMatrix1D", function() { return _wrap_WrapperMatrix1D__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _wrap_WrapperMatrix2D__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./wrap/WrapperMatrix2D */ "./node_modules/ml-matrix/src/wrap/WrapperMatrix2D.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WrapperMatrix2D", function() { return _wrap_WrapperMatrix2D__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _decompositions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./decompositions */ "./node_modules/ml-matrix/src/decompositions.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "solve", function() { return _decompositions__WEBPACK_IMPORTED_MODULE_5__["solve"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "inverse", function() { return _decompositions__WEBPACK_IMPORTED_MODULE_5__["inverse"]; });

/* harmony import */ var _determinant__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./determinant */ "./node_modules/ml-matrix/src/determinant.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "determinant", function() { return _determinant__WEBPACK_IMPORTED_MODULE_6__["determinant"]; });

/* harmony import */ var _linearDependencies__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./linearDependencies */ "./node_modules/ml-matrix/src/linearDependencies.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "linearDependencies", function() { return _linearDependencies__WEBPACK_IMPORTED_MODULE_7__["linearDependencies"]; });

/* harmony import */ var _pseudoInverse__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pseudoInverse */ "./node_modules/ml-matrix/src/pseudoInverse.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pseudoInverse", function() { return _pseudoInverse__WEBPACK_IMPORTED_MODULE_8__["pseudoInverse"]; });

/* harmony import */ var _covariance__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./covariance */ "./node_modules/ml-matrix/src/covariance.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "covariance", function() { return _covariance__WEBPACK_IMPORTED_MODULE_9__["covariance"]; });

/* harmony import */ var _correlation__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./correlation */ "./node_modules/ml-matrix/src/correlation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "correlation", function() { return _correlation__WEBPACK_IMPORTED_MODULE_10__["correlation"]; });

/* harmony import */ var _dc_svd_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./dc/svd.js */ "./node_modules/ml-matrix/src/dc/svd.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SingularValueDecomposition", function() { return _dc_svd_js__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SVD", function() { return _dc_svd_js__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony import */ var _dc_evd_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./dc/evd.js */ "./node_modules/ml-matrix/src/dc/evd.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EigenvalueDecomposition", function() { return _dc_evd_js__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EVD", function() { return _dc_evd_js__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony import */ var _dc_cholesky_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./dc/cholesky.js */ "./node_modules/ml-matrix/src/dc/cholesky.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CholeskyDecomposition", function() { return _dc_cholesky_js__WEBPACK_IMPORTED_MODULE_13__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CHO", function() { return _dc_cholesky_js__WEBPACK_IMPORTED_MODULE_13__["default"]; });

/* harmony import */ var _dc_lu_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./dc/lu.js */ "./node_modules/ml-matrix/src/dc/lu.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LuDecomposition", function() { return _dc_lu_js__WEBPACK_IMPORTED_MODULE_14__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LU", function() { return _dc_lu_js__WEBPACK_IMPORTED_MODULE_14__["default"]; });

/* harmony import */ var _dc_qr_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./dc/qr.js */ "./node_modules/ml-matrix/src/dc/qr.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QrDecomposition", function() { return _dc_qr_js__WEBPACK_IMPORTED_MODULE_15__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QR", function() { return _dc_qr_js__WEBPACK_IMPORTED_MODULE_15__["default"]; });

/* harmony import */ var _dc_nipals_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./dc/nipals.js */ "./node_modules/ml-matrix/src/dc/nipals.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Nipals", function() { return _dc_nipals_js__WEBPACK_IMPORTED_MODULE_16__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NIPALS", function() { return _dc_nipals_js__WEBPACK_IMPORTED_MODULE_16__["default"]; });























/***/ }),

/***/ "./node_modules/ml-matrix/src/inspect.js":
/*!***********************************************!*\
  !*** ./node_modules/ml-matrix/src/inspect.js ***!
  \***********************************************/
/*! exports provided: inspectMatrix, inspectMatrixWithOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inspectMatrix", function() { return inspectMatrix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inspectMatrixWithOptions", function() { return inspectMatrixWithOptions; });
const indent = ' '.repeat(2);
const indentData = ' '.repeat(4);

function inspectMatrix() {
  return inspectMatrixWithOptions(this);
}

function inspectMatrixWithOptions(matrix, options = {}) {
  const { maxRows = 15, maxColumns = 10, maxNumSize = 8 } = options;
  return `${matrix.constructor.name} {
${indent}[
${indentData}${inspectData(matrix, maxRows, maxColumns, maxNumSize)}
${indent}]
${indent}rows: ${matrix.rows}
${indent}columns: ${matrix.columns}
}`;
}

function inspectData(matrix, maxRows, maxColumns, maxNumSize) {
  const { rows, columns } = matrix;
  const maxI = Math.min(rows, maxRows);
  const maxJ = Math.min(columns, maxColumns);
  const result = [];
  for (let i = 0; i < maxI; i++) {
    let line = [];
    for (let j = 0; j < maxJ; j++) {
      line.push(formatNumber(matrix.get(i, j), maxNumSize));
    }
    result.push(`${line.join(' ')}`);
  }
  if (maxJ !== columns) {
    result[result.length - 1] += ` ... ${columns - maxColumns} more columns`;
  }
  if (maxI !== rows) {
    result.push(`... ${rows - maxRows} more rows`);
  }
  return result.join(`\n${indentData}`);
}

function formatNumber(num, maxNumSize) {
  const numStr = String(num);
  if (numStr.length <= maxNumSize) {
    return numStr.padEnd(maxNumSize, ' ');
  }
  const precise = num.toPrecision(maxNumSize - 2);
  if (precise.length <= maxNumSize) {
    return precise;
  }
  const exponential = num.toExponential(maxNumSize - 2);
  const eIndex = exponential.indexOf('e');
  const e = exponential.slice(eIndex);
  return exponential.slice(0, maxNumSize - e.length) + e;
}


/***/ }),

/***/ "./node_modules/ml-matrix/src/linearDependencies.js":
/*!**********************************************************!*\
  !*** ./node_modules/ml-matrix/src/linearDependencies.js ***!
  \**********************************************************/
/*! exports provided: linearDependencies */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "linearDependencies", function() { return linearDependencies; });
/* harmony import */ var _dc_svd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dc/svd */ "./node_modules/ml-matrix/src/dc/svd.js");
/* harmony import */ var _matrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./matrix */ "./node_modules/ml-matrix/src/matrix.js");



function xrange(n, exception) {
  let range = [];
  for (let i = 0; i < n; i++) {
    if (i !== exception) {
      range.push(i);
    }
  }
  return range;
}

function dependenciesOneRow(
  error,
  matrix,
  index,
  thresholdValue = 10e-10,
  thresholdError = 10e-10,
) {
  if (error > thresholdError) {
    return new Array(matrix.rows + 1).fill(0);
  } else {
    let returnArray = matrix.addRow(index, [0]);
    for (let i = 0; i < returnArray.rows; i++) {
      if (Math.abs(returnArray.get(i, 0)) < thresholdValue) {
        returnArray.set(i, 0, 0);
      }
    }
    return returnArray.to1DArray();
  }
}

function linearDependencies(matrix, options = {}) {
  const { thresholdValue = 10e-10, thresholdError = 10e-10 } = options;
  matrix = _matrix__WEBPACK_IMPORTED_MODULE_1__["default"].checkMatrix(matrix);

  let n = matrix.rows;
  let results = new _matrix__WEBPACK_IMPORTED_MODULE_1__["default"](n, n);

  for (let i = 0; i < n; i++) {
    let b = _matrix__WEBPACK_IMPORTED_MODULE_1__["default"].columnVector(matrix.getRow(i));
    let Abis = matrix.subMatrixRow(xrange(n, i)).transpose();
    let svd = new _dc_svd__WEBPACK_IMPORTED_MODULE_0__["default"](Abis);
    let x = svd.solve(b);
    let error = _matrix__WEBPACK_IMPORTED_MODULE_1__["default"].sub(b, Abis.mmul(x)).abs().max();
    results.setRow(
      i,
      dependenciesOneRow(error, x, i, thresholdValue, thresholdError),
    );
  }
  return results;
}


/***/ }),

/***/ "./node_modules/ml-matrix/src/mathOperations.js":
/*!******************************************************!*\
  !*** ./node_modules/ml-matrix/src/mathOperations.js ***!
  \******************************************************/
/*! exports provided: installMathOperations */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "installMathOperations", function() { return installMathOperations; });
function installMathOperations(AbstractMatrix, Matrix) {
  AbstractMatrix.prototype.add = function add(value) {
    if (typeof value === 'number') return this.addS(value);
    return this.addM(value);
  };

  AbstractMatrix.prototype.addS = function addS(value) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, this.get(i, j) + value);
      }
    }
    return this;
  };

  AbstractMatrix.prototype.addM = function addM(matrix) {
    matrix = Matrix.checkMatrix(matrix);
    if (this.rows !== matrix.rows ||
      this.columns !== matrix.columns) {
      throw new RangeError('Matrices dimensions must be equal');
    }
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, this.get(i, j) + matrix.get(i, j));
      }
    }
    return this;
  };

  AbstractMatrix.add = function add(matrix, value) {
    const newMatrix = new Matrix(matrix);
    return newMatrix.add(value);
  };

  AbstractMatrix.prototype.sub = function sub(value) {
    if (typeof value === 'number') return this.subS(value);
    return this.subM(value);
  };

  AbstractMatrix.prototype.subS = function subS(value) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, this.get(i, j) - value);
      }
    }
    return this;
  };

  AbstractMatrix.prototype.subM = function subM(matrix) {
    matrix = Matrix.checkMatrix(matrix);
    if (this.rows !== matrix.rows ||
      this.columns !== matrix.columns) {
      throw new RangeError('Matrices dimensions must be equal');
    }
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, this.get(i, j) - matrix.get(i, j));
      }
    }
    return this;
  };

  AbstractMatrix.sub = function sub(matrix, value) {
    const newMatrix = new Matrix(matrix);
    return newMatrix.sub(value);
  };
  AbstractMatrix.prototype.subtract = AbstractMatrix.prototype.sub;
  AbstractMatrix.prototype.subtractS = AbstractMatrix.prototype.subS;
  AbstractMatrix.prototype.subtractM = AbstractMatrix.prototype.subM;
  AbstractMatrix.subtract = AbstractMatrix.sub;

  AbstractMatrix.prototype.mul = function mul(value) {
    if (typeof value === 'number') return this.mulS(value);
    return this.mulM(value);
  };

  AbstractMatrix.prototype.mulS = function mulS(value) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, this.get(i, j) * value);
      }
    }
    return this;
  };

  AbstractMatrix.prototype.mulM = function mulM(matrix) {
    matrix = Matrix.checkMatrix(matrix);
    if (this.rows !== matrix.rows ||
      this.columns !== matrix.columns) {
      throw new RangeError('Matrices dimensions must be equal');
    }
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, this.get(i, j) * matrix.get(i, j));
      }
    }
    return this;
  };

  AbstractMatrix.mul = function mul(matrix, value) {
    const newMatrix = new Matrix(matrix);
    return newMatrix.mul(value);
  };
  AbstractMatrix.prototype.multiply = AbstractMatrix.prototype.mul;
  AbstractMatrix.prototype.multiplyS = AbstractMatrix.prototype.mulS;
  AbstractMatrix.prototype.multiplyM = AbstractMatrix.prototype.mulM;
  AbstractMatrix.multiply = AbstractMatrix.mul;

  AbstractMatrix.prototype.div = function div(value) {
    if (typeof value === 'number') return this.divS(value);
    return this.divM(value);
  };

  AbstractMatrix.prototype.divS = function divS(value) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, this.get(i, j) / value);
      }
    }
    return this;
  };

  AbstractMatrix.prototype.divM = function divM(matrix) {
    matrix = Matrix.checkMatrix(matrix);
    if (this.rows !== matrix.rows ||
      this.columns !== matrix.columns) {
      throw new RangeError('Matrices dimensions must be equal');
    }
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, this.get(i, j) / matrix.get(i, j));
      }
    }
    return this;
  };

  AbstractMatrix.div = function div(matrix, value) {
    const newMatrix = new Matrix(matrix);
    return newMatrix.div(value);
  };
  AbstractMatrix.prototype.divide = AbstractMatrix.prototype.div;
  AbstractMatrix.prototype.divideS = AbstractMatrix.prototype.divS;
  AbstractMatrix.prototype.divideM = AbstractMatrix.prototype.divM;
  AbstractMatrix.divide = AbstractMatrix.div;

  AbstractMatrix.prototype.mod = function mod(value) {
    if (typeof value === 'number') return this.modS(value);
    return this.modM(value);
  };

  AbstractMatrix.prototype.modS = function modS(value) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, this.get(i, j) % value);
      }
    }
    return this;
  };

  AbstractMatrix.prototype.modM = function modM(matrix) {
    matrix = Matrix.checkMatrix(matrix);
    if (this.rows !== matrix.rows ||
      this.columns !== matrix.columns) {
      throw new RangeError('Matrices dimensions must be equal');
    }
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, this.get(i, j) % matrix.get(i, j));
      }
    }
    return this;
  };

  AbstractMatrix.mod = function mod(matrix, value) {
    const newMatrix = new Matrix(matrix);
    return newMatrix.mod(value);
  };
  AbstractMatrix.prototype.modulus = AbstractMatrix.prototype.mod;
  AbstractMatrix.prototype.modulusS = AbstractMatrix.prototype.modS;
  AbstractMatrix.prototype.modulusM = AbstractMatrix.prototype.modM;
  AbstractMatrix.modulus = AbstractMatrix.mod;

  AbstractMatrix.prototype.and = function and(value) {
    if (typeof value === 'number') return this.andS(value);
    return this.andM(value);
  };

  AbstractMatrix.prototype.andS = function andS(value) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, this.get(i, j) & value);
      }
    }
    return this;
  };

  AbstractMatrix.prototype.andM = function andM(matrix) {
    matrix = Matrix.checkMatrix(matrix);
    if (this.rows !== matrix.rows ||
      this.columns !== matrix.columns) {
      throw new RangeError('Matrices dimensions must be equal');
    }
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, this.get(i, j) & matrix.get(i, j));
      }
    }
    return this;
  };

  AbstractMatrix.and = function and(matrix, value) {
    const newMatrix = new Matrix(matrix);
    return newMatrix.and(value);
  };

  AbstractMatrix.prototype.or = function or(value) {
    if (typeof value === 'number') return this.orS(value);
    return this.orM(value);
  };

  AbstractMatrix.prototype.orS = function orS(value) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, this.get(i, j) | value);
      }
    }
    return this;
  };

  AbstractMatrix.prototype.orM = function orM(matrix) {
    matrix = Matrix.checkMatrix(matrix);
    if (this.rows !== matrix.rows ||
      this.columns !== matrix.columns) {
      throw new RangeError('Matrices dimensions must be equal');
    }
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, this.get(i, j) | matrix.get(i, j));
      }
    }
    return this;
  };

  AbstractMatrix.or = function or(matrix, value) {
    const newMatrix = new Matrix(matrix);
    return newMatrix.or(value);
  };

  AbstractMatrix.prototype.xor = function xor(value) {
    if (typeof value === 'number') return this.xorS(value);
    return this.xorM(value);
  };

  AbstractMatrix.prototype.xorS = function xorS(value) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, this.get(i, j) ^ value);
      }
    }
    return this;
  };

  AbstractMatrix.prototype.xorM = function xorM(matrix) {
    matrix = Matrix.checkMatrix(matrix);
    if (this.rows !== matrix.rows ||
      this.columns !== matrix.columns) {
      throw new RangeError('Matrices dimensions must be equal');
    }
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, this.get(i, j) ^ matrix.get(i, j));
      }
    }
    return this;
  };

  AbstractMatrix.xor = function xor(matrix, value) {
    const newMatrix = new Matrix(matrix);
    return newMatrix.xor(value);
  };

  AbstractMatrix.prototype.leftShift = function leftShift(value) {
    if (typeof value === 'number') return this.leftShiftS(value);
    return this.leftShiftM(value);
  };

  AbstractMatrix.prototype.leftShiftS = function leftShiftS(value) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, this.get(i, j) << value);
      }
    }
    return this;
  };

  AbstractMatrix.prototype.leftShiftM = function leftShiftM(matrix) {
    matrix = Matrix.checkMatrix(matrix);
    if (this.rows !== matrix.rows ||
      this.columns !== matrix.columns) {
      throw new RangeError('Matrices dimensions must be equal');
    }
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, this.get(i, j) << matrix.get(i, j));
      }
    }
    return this;
  };

  AbstractMatrix.leftShift = function leftShift(matrix, value) {
    const newMatrix = new Matrix(matrix);
    return newMatrix.leftShift(value);
  };

  AbstractMatrix.prototype.signPropagatingRightShift = function signPropagatingRightShift(value) {
    if (typeof value === 'number') return this.signPropagatingRightShiftS(value);
    return this.signPropagatingRightShiftM(value);
  };

  AbstractMatrix.prototype.signPropagatingRightShiftS = function signPropagatingRightShiftS(value) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, this.get(i, j) >> value);
      }
    }
    return this;
  };

  AbstractMatrix.prototype.signPropagatingRightShiftM = function signPropagatingRightShiftM(matrix) {
    matrix = Matrix.checkMatrix(matrix);
    if (this.rows !== matrix.rows ||
      this.columns !== matrix.columns) {
      throw new RangeError('Matrices dimensions must be equal');
    }
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, this.get(i, j) >> matrix.get(i, j));
      }
    }
    return this;
  };

  AbstractMatrix.signPropagatingRightShift = function signPropagatingRightShift(matrix, value) {
    const newMatrix = new Matrix(matrix);
    return newMatrix.signPropagatingRightShift(value);
  };

  AbstractMatrix.prototype.rightShift = function rightShift(value) {
    if (typeof value === 'number') return this.rightShiftS(value);
    return this.rightShiftM(value);
  };

  AbstractMatrix.prototype.rightShiftS = function rightShiftS(value) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, this.get(i, j) >>> value);
      }
    }
    return this;
  };

  AbstractMatrix.prototype.rightShiftM = function rightShiftM(matrix) {
    matrix = Matrix.checkMatrix(matrix);
    if (this.rows !== matrix.rows ||
      this.columns !== matrix.columns) {
      throw new RangeError('Matrices dimensions must be equal');
    }
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, this.get(i, j) >>> matrix.get(i, j));
      }
    }
    return this;
  };

  AbstractMatrix.rightShift = function rightShift(matrix, value) {
    const newMatrix = new Matrix(matrix);
    return newMatrix.rightShift(value);
  };
  AbstractMatrix.prototype.zeroFillRightShift = AbstractMatrix.prototype.rightShift;
  AbstractMatrix.prototype.zeroFillRightShiftS = AbstractMatrix.prototype.rightShiftS;
  AbstractMatrix.prototype.zeroFillRightShiftM = AbstractMatrix.prototype.rightShiftM;
  AbstractMatrix.zeroFillRightShift = AbstractMatrix.rightShift;

  AbstractMatrix.prototype.not = function not() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, ~(this.get(i, j)));
      }
    }
    return this;
  };

  AbstractMatrix.not = function not(matrix) {
    const newMatrix = new Matrix(matrix);
    return newMatrix.not();
  };

  AbstractMatrix.prototype.abs = function abs() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, Math.abs(this.get(i, j)));
      }
    }
    return this;
  };

  AbstractMatrix.abs = function abs(matrix) {
    const newMatrix = new Matrix(matrix);
    return newMatrix.abs();
  };

  AbstractMatrix.prototype.acos = function acos() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, Math.acos(this.get(i, j)));
      }
    }
    return this;
  };

  AbstractMatrix.acos = function acos(matrix) {
    const newMatrix = new Matrix(matrix);
    return newMatrix.acos();
  };

  AbstractMatrix.prototype.acosh = function acosh() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, Math.acosh(this.get(i, j)));
      }
    }
    return this;
  };

  AbstractMatrix.acosh = function acosh(matrix) {
    const newMatrix = new Matrix(matrix);
    return newMatrix.acosh();
  };

  AbstractMatrix.prototype.asin = function asin() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, Math.asin(this.get(i, j)));
      }
    }
    return this;
  };

  AbstractMatrix.asin = function asin(matrix) {
    const newMatrix = new Matrix(matrix);
    return newMatrix.asin();
  };

  AbstractMatrix.prototype.asinh = function asinh() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, Math.asinh(this.get(i, j)));
      }
    }
    return this;
  };

  AbstractMatrix.asinh = function asinh(matrix) {
    const newMatrix = new Matrix(matrix);
    return newMatrix.asinh();
  };

  AbstractMatrix.prototype.atan = function atan() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, Math.atan(this.get(i, j)));
      }
    }
    return this;
  };

  AbstractMatrix.atan = function atan(matrix) {
    const newMatrix = new Matrix(matrix);
    return newMatrix.atan();
  };

  AbstractMatrix.prototype.atanh = function atanh() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, Math.atanh(this.get(i, j)));
      }
    }
    return this;
  };

  AbstractMatrix.atanh = function atanh(matrix) {
    const newMatrix = new Matrix(matrix);
    return newMatrix.atanh();
  };

  AbstractMatrix.prototype.cbrt = function cbrt() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, Math.cbrt(this.get(i, j)));
      }
    }
    return this;
  };

  AbstractMatrix.cbrt = function cbrt(matrix) {
    const newMatrix = new Matrix(matrix);
    return newMatrix.cbrt();
  };

  AbstractMatrix.prototype.ceil = function ceil() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, Math.ceil(this.get(i, j)));
      }
    }
    return this;
  };

  AbstractMatrix.ceil = function ceil(matrix) {
    const newMatrix = new Matrix(matrix);
    return newMatrix.ceil();
  };

  AbstractMatrix.prototype.clz32 = function clz32() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, Math.clz32(this.get(i, j)));
      }
    }
    return this;
  };

  AbstractMatrix.clz32 = function clz32(matrix) {
    const newMatrix = new Matrix(matrix);
    return newMatrix.clz32();
  };

  AbstractMatrix.prototype.cos = function cos() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, Math.cos(this.get(i, j)));
      }
    }
    return this;
  };

  AbstractMatrix.cos = function cos(matrix) {
    const newMatrix = new Matrix(matrix);
    return newMatrix.cos();
  };

  AbstractMatrix.prototype.cosh = function cosh() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, Math.cosh(this.get(i, j)));
      }
    }
    return this;
  };

  AbstractMatrix.cosh = function cosh(matrix) {
    const newMatrix = new Matrix(matrix);
    return newMatrix.cosh();
  };

  AbstractMatrix.prototype.exp = function exp() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, Math.exp(this.get(i, j)));
      }
    }
    return this;
  };

  AbstractMatrix.exp = function exp(matrix) {
    const newMatrix = new Matrix(matrix);
    return newMatrix.exp();
  };

  AbstractMatrix.prototype.expm1 = function expm1() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, Math.expm1(this.get(i, j)));
      }
    }
    return this;
  };

  AbstractMatrix.expm1 = function expm1(matrix) {
    const newMatrix = new Matrix(matrix);
    return newMatrix.expm1();
  };

  AbstractMatrix.prototype.floor = function floor() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, Math.floor(this.get(i, j)));
      }
    }
    return this;
  };

  AbstractMatrix.floor = function floor(matrix) {
    const newMatrix = new Matrix(matrix);
    return newMatrix.floor();
  };

  AbstractMatrix.prototype.fround = function fround() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, Math.fround(this.get(i, j)));
      }
    }
    return this;
  };

  AbstractMatrix.fround = function fround(matrix) {
    const newMatrix = new Matrix(matrix);
    return newMatrix.fround();
  };

  AbstractMatrix.prototype.log = function log() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, Math.log(this.get(i, j)));
      }
    }
    return this;
  };

  AbstractMatrix.log = function log(matrix) {
    const newMatrix = new Matrix(matrix);
    return newMatrix.log();
  };

  AbstractMatrix.prototype.log1p = function log1p() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, Math.log1p(this.get(i, j)));
      }
    }
    return this;
  };

  AbstractMatrix.log1p = function log1p(matrix) {
    const newMatrix = new Matrix(matrix);
    return newMatrix.log1p();
  };

  AbstractMatrix.prototype.log10 = function log10() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, Math.log10(this.get(i, j)));
      }
    }
    return this;
  };

  AbstractMatrix.log10 = function log10(matrix) {
    const newMatrix = new Matrix(matrix);
    return newMatrix.log10();
  };

  AbstractMatrix.prototype.log2 = function log2() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, Math.log2(this.get(i, j)));
      }
    }
    return this;
  };

  AbstractMatrix.log2 = function log2(matrix) {
    const newMatrix = new Matrix(matrix);
    return newMatrix.log2();
  };

  AbstractMatrix.prototype.round = function round() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, Math.round(this.get(i, j)));
      }
    }
    return this;
  };

  AbstractMatrix.round = function round(matrix) {
    const newMatrix = new Matrix(matrix);
    return newMatrix.round();
  };

  AbstractMatrix.prototype.sign = function sign() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, Math.sign(this.get(i, j)));
      }
    }
    return this;
  };

  AbstractMatrix.sign = function sign(matrix) {
    const newMatrix = new Matrix(matrix);
    return newMatrix.sign();
  };

  AbstractMatrix.prototype.sin = function sin() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, Math.sin(this.get(i, j)));
      }
    }
    return this;
  };

  AbstractMatrix.sin = function sin(matrix) {
    const newMatrix = new Matrix(matrix);
    return newMatrix.sin();
  };

  AbstractMatrix.prototype.sinh = function sinh() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, Math.sinh(this.get(i, j)));
      }
    }
    return this;
  };

  AbstractMatrix.sinh = function sinh(matrix) {
    const newMatrix = new Matrix(matrix);
    return newMatrix.sinh();
  };

  AbstractMatrix.prototype.sqrt = function sqrt() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, Math.sqrt(this.get(i, j)));
      }
    }
    return this;
  };

  AbstractMatrix.sqrt = function sqrt(matrix) {
    const newMatrix = new Matrix(matrix);
    return newMatrix.sqrt();
  };

  AbstractMatrix.prototype.tan = function tan() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, Math.tan(this.get(i, j)));
      }
    }
    return this;
  };

  AbstractMatrix.tan = function tan(matrix) {
    const newMatrix = new Matrix(matrix);
    return newMatrix.tan();
  };

  AbstractMatrix.prototype.tanh = function tanh() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, Math.tanh(this.get(i, j)));
      }
    }
    return this;
  };

  AbstractMatrix.tanh = function tanh(matrix) {
    const newMatrix = new Matrix(matrix);
    return newMatrix.tanh();
  };

  AbstractMatrix.prototype.trunc = function trunc() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, Math.trunc(this.get(i, j)));
      }
    }
    return this;
  };

  AbstractMatrix.trunc = function trunc(matrix) {
    const newMatrix = new Matrix(matrix);
    return newMatrix.trunc();
  };

  AbstractMatrix.pow = function pow(matrix, arg0) {
    const newMatrix = new Matrix(matrix);
    return newMatrix.pow(arg0);
  };

  AbstractMatrix.prototype.pow = function pow(value) {
    if (typeof value === 'number') return this.powS(value);
    return this.powM(value);
  };

  AbstractMatrix.prototype.powS = function powS(value) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, Math.pow(this.get(i, j), value));
      }
    }
    return this;
  };

  AbstractMatrix.prototype.powM = function powM(matrix) {
    matrix = Matrix.checkMatrix(matrix);
    if (this.rows !== matrix.rows ||
      this.columns !== matrix.columns) {
      throw new RangeError('Matrices dimensions must be equal');
    }
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, Math.pow(this.get(i, j), matrix.get(i, j)));
      }
    }
    return this;
  };
}


/***/ }),

/***/ "./node_modules/ml-matrix/src/matrix.js":
/*!**********************************************!*\
  !*** ./node_modules/ml-matrix/src/matrix.js ***!
  \**********************************************/
/*! exports provided: AbstractMatrix, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbstractMatrix", function() { return AbstractMatrix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Matrix; });
/* harmony import */ var ml_array_rescale__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ml-array-rescale */ "./node_modules/ml-array-rescale/lib-es6/index.js");
/* harmony import */ var _inspect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./inspect */ "./node_modules/ml-matrix/src/inspect.js");
/* harmony import */ var _mathOperations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mathOperations */ "./node_modules/ml-matrix/src/mathOperations.js");
/* harmony import */ var _stat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./stat */ "./node_modules/ml-matrix/src/stat.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util */ "./node_modules/ml-matrix/src/util.js");







class AbstractMatrix {
  static from1DArray(newRows, newColumns, newData) {
    let length = newRows * newColumns;
    if (length !== newData.length) {
      throw new RangeError('data length does not match given dimensions');
    }
    let newMatrix = new Matrix(newRows, newColumns);
    for (let row = 0; row < newRows; row++) {
      for (let column = 0; column < newColumns; column++) {
        newMatrix.set(row, column, newData[row * newColumns + column]);
      }
    }
    return newMatrix;
  }

  static rowVector(newData) {
    let vector = new Matrix(1, newData.length);
    for (let i = 0; i < newData.length; i++) {
      vector.set(0, i, newData[i]);
    }
    return vector;
  }

  static columnVector(newData) {
    let vector = new Matrix(newData.length, 1);
    for (let i = 0; i < newData.length; i++) {
      vector.set(i, 0, newData[i]);
    }
    return vector;
  }

  static zeros(rows, columns) {
    return new Matrix(rows, columns);
  }

  static ones(rows, columns) {
    return new Matrix(rows, columns).fill(1);
  }

  static rand(rows, columns, options = {}) {
    if (typeof options !== 'object') {
      throw new TypeError('options must be an object');
    }
    const { random = Math.random } = options;
    let matrix = new Matrix(rows, columns);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        matrix.set(i, j, random());
      }
    }
    return matrix;
  }

  static randInt(rows, columns, options = {}) {
    if (typeof options !== 'object') {
      throw new TypeError('options must be an object');
    }
    const { min = 0, max = 1000, random = Math.random } = options;
    if (!Number.isInteger(min)) throw new TypeError('min must be an integer');
    if (!Number.isInteger(max)) throw new TypeError('max must be an integer');
    if (min >= max) throw new RangeError('min must be smaller than max');
    let interval = max - min;
    let matrix = new Matrix(rows, columns);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        let value = min + Math.round(random() * interval);
        matrix.set(i, j, value);
      }
    }
    return matrix;
  }

  static eye(rows, columns, value) {
    if (columns === undefined) columns = rows;
    if (value === undefined) value = 1;
    let min = Math.min(rows, columns);
    let matrix = this.zeros(rows, columns);
    for (let i = 0; i < min; i++) {
      matrix.set(i, i, value);
    }
    return matrix;
  }

  static diag(data, rows, columns) {
    let l = data.length;
    if (rows === undefined) rows = l;
    if (columns === undefined) columns = rows;
    let min = Math.min(l, rows, columns);
    let matrix = this.zeros(rows, columns);
    for (let i = 0; i < min; i++) {
      matrix.set(i, i, data[i]);
    }
    return matrix;
  }

  static min(matrix1, matrix2) {
    matrix1 = this.checkMatrix(matrix1);
    matrix2 = this.checkMatrix(matrix2);
    let rows = matrix1.rows;
    let columns = matrix1.columns;
    let result = new Matrix(rows, columns);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        result.set(i, j, Math.min(matrix1.get(i, j), matrix2.get(i, j)));
      }
    }
    return result;
  }

  static max(matrix1, matrix2) {
    matrix1 = this.checkMatrix(matrix1);
    matrix2 = this.checkMatrix(matrix2);
    let rows = matrix1.rows;
    let columns = matrix1.columns;
    let result = new this(rows, columns);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        result.set(i, j, Math.max(matrix1.get(i, j), matrix2.get(i, j)));
      }
    }
    return result;
  }

  static checkMatrix(value) {
    return AbstractMatrix.isMatrix(value) ? value : new Matrix(value);
  }

  static isMatrix(value) {
    return value != null && value.klass === 'Matrix';
  }

  get size() {
    return this.rows * this.columns;
  }

  apply(callback) {
    if (typeof callback !== 'function') {
      throw new TypeError('callback must be a function');
    }
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        callback.call(this, i, j);
      }
    }
    return this;
  }

  to1DArray() {
    let array = [];
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        array.push(this.get(i, j));
      }
    }
    return array;
  }

  to2DArray() {
    let copy = [];
    for (let i = 0; i < this.rows; i++) {
      copy.push([]);
      for (let j = 0; j < this.columns; j++) {
        copy[i].push(this.get(i, j));
      }
    }
    return copy;
  }

  toJSON() {
    return this.to2DArray();
  }

  isRowVector() {
    return this.rows === 1;
  }

  isColumnVector() {
    return this.columns === 1;
  }

  isVector() {
    return this.rows === 1 || this.columns === 1;
  }

  isSquare() {
    return this.rows === this.columns;
  }

  isSymmetric() {
    if (this.isSquare()) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j <= i; j++) {
          if (this.get(i, j) !== this.get(j, i)) {
            return false;
          }
        }
      }
      return true;
    }
    return false;
  }

  isEchelonForm() {
    let i = 0;
    let j = 0;
    let previousColumn = -1;
    let isEchelonForm = true;
    let checked = false;
    while (i < this.rows && isEchelonForm) {
      j = 0;
      checked = false;
      while (j < this.columns && checked === false) {
        if (this.get(i, j) === 0) {
          j++;
        } else if (this.get(i, j) === 1 && j > previousColumn) {
          checked = true;
          previousColumn = j;
        } else {
          isEchelonForm = false;
          checked = true;
        }
      }
      i++;
    }
    return isEchelonForm;
  }

  isReducedEchelonForm() {
    let i = 0;
    let j = 0;
    let previousColumn = -1;
    let isReducedEchelonForm = true;
    let checked = false;
    while (i < this.rows && isReducedEchelonForm) {
      j = 0;
      checked = false;
      while (j < this.columns && checked === false) {
        if (this.get(i, j) === 0) {
          j++;
        } else if (this.get(i, j) === 1 && j > previousColumn) {
          checked = true;
          previousColumn = j;
        } else {
          isReducedEchelonForm = false;
          checked = true;
        }
      }
      for (let k = j + 1; k < this.rows; k++) {
        if (this.get(i, k) !== 0) {
          isReducedEchelonForm = false;
        }
      }
      i++;
    }
    return isReducedEchelonForm;
  }

  echelonForm() {
    let result = this.clone();
    let h = 0;
    let k = 0;
    while (h < result.rows && k < result.columns) {
      let iMax = h;
      for (let i = h; i < result.rows; i++) {
        if (result.get(i, k) > result.get(iMax, k)) {
          iMax = i;
        }
      }
      if (result.get(iMax, k) === 0) {
        k++;
      } else {
        result.swapRows(h, iMax);
        let tmp = result.get(h, k);
        for (let j = k; j < result.columns; j++) {
          result.set(h, j, result.get(h, j) / tmp);
        }
        for (let i = h + 1; i < result.rows; i++) {
          let factor = result.get(i, k) / result.get(h, k);
          result.set(i, k, 0);
          for (let j = k + 1; j < result.columns; j++) {
            result.set(i, j, result.get(i, j) - result.get(h, j) * factor);
          }
        }
        h++;
        k++;
      }
    }
    return result;
  }

  reducedEchelonForm() {
    let result = this.echelonForm();
    let m = result.columns;
    let n = result.rows;
    let h = n - 1;
    while (h >= 0) {
      if (result.maxRow(h) === 0) {
        h--;
      } else {
        let p = 0;
        let pivot = false;
        while (p < n && pivot === false) {
          if (result.get(h, p) === 1) {
            pivot = true;
          } else {
            p++;
          }
        }
        for (let i = 0; i < h; i++) {
          let factor = result.get(i, p);
          for (let j = p; j < m; j++) {
            let tmp = result.get(i, j) - factor * result.get(h, j);
            result.set(i, j, tmp);
          }
        }
        h--;
      }
    }
    return result;
  }

  set() {
    throw new Error('set method is unimplemented');
  }

  get() {
    throw new Error('get method is unimplemented');
  }

  repeat(options = {}) {
    if (typeof options !== 'object') {
      throw new TypeError('options must be an object');
    }
    const { rows = 1, columns = 1 } = options;
    if (!Number.isInteger(rows) || rows <= 0) {
      throw new TypeError('rows must be a positive integer');
    }
    if (!Number.isInteger(columns) || columns <= 0) {
      throw new TypeError('columns must be a positive integer');
    }
    let matrix = new Matrix(this.rows * rows, this.columns * columns);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        matrix.setSubMatrix(this, this.rows * i, this.columns * j);
      }
    }
    return matrix;
  }

  fill(value) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, value);
      }
    }
    return this;
  }

  neg() {
    return this.mulS(-1);
  }

  getRow(index) {
    Object(_util__WEBPACK_IMPORTED_MODULE_4__["checkRowIndex"])(this, index);
    let row = [];
    for (let i = 0; i < this.columns; i++) {
      row.push(this.get(index, i));
    }
    return row;
  }

  getRowVector(index) {
    return Matrix.rowVector(this.getRow(index));
  }

  setRow(index, array) {
    Object(_util__WEBPACK_IMPORTED_MODULE_4__["checkRowIndex"])(this, index);
    array = Object(_util__WEBPACK_IMPORTED_MODULE_4__["checkRowVector"])(this, array);
    for (let i = 0; i < this.columns; i++) {
      this.set(index, i, array[i]);
    }
    return this;
  }

  swapRows(row1, row2) {
    Object(_util__WEBPACK_IMPORTED_MODULE_4__["checkRowIndex"])(this, row1);
    Object(_util__WEBPACK_IMPORTED_MODULE_4__["checkRowIndex"])(this, row2);
    for (let i = 0; i < this.columns; i++) {
      let temp = this.get(row1, i);
      this.set(row1, i, this.get(row2, i));
      this.set(row2, i, temp);
    }
    return this;
  }

  getColumn(index) {
    Object(_util__WEBPACK_IMPORTED_MODULE_4__["checkColumnIndex"])(this, index);
    let column = [];
    for (let i = 0; i < this.rows; i++) {
      column.push(this.get(i, index));
    }
    return column;
  }

  getColumnVector(index) {
    return Matrix.columnVector(this.getColumn(index));
  }

  setColumn(index, array) {
    Object(_util__WEBPACK_IMPORTED_MODULE_4__["checkColumnIndex"])(this, index);
    array = Object(_util__WEBPACK_IMPORTED_MODULE_4__["checkColumnVector"])(this, array);
    for (let i = 0; i < this.rows; i++) {
      this.set(i, index, array[i]);
    }
    return this;
  }

  swapColumns(column1, column2) {
    Object(_util__WEBPACK_IMPORTED_MODULE_4__["checkColumnIndex"])(this, column1);
    Object(_util__WEBPACK_IMPORTED_MODULE_4__["checkColumnIndex"])(this, column2);
    for (let i = 0; i < this.rows; i++) {
      let temp = this.get(i, column1);
      this.set(i, column1, this.get(i, column2));
      this.set(i, column2, temp);
    }
    return this;
  }

  addRowVector(vector) {
    vector = Object(_util__WEBPACK_IMPORTED_MODULE_4__["checkRowVector"])(this, vector);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, this.get(i, j) + vector[j]);
      }
    }
    return this;
  }

  subRowVector(vector) {
    vector = Object(_util__WEBPACK_IMPORTED_MODULE_4__["checkRowVector"])(this, vector);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, this.get(i, j) - vector[j]);
      }
    }
    return this;
  }

  mulRowVector(vector) {
    vector = Object(_util__WEBPACK_IMPORTED_MODULE_4__["checkRowVector"])(this, vector);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, this.get(i, j) * vector[j]);
      }
    }
    return this;
  }

  divRowVector(vector) {
    vector = Object(_util__WEBPACK_IMPORTED_MODULE_4__["checkRowVector"])(this, vector);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, this.get(i, j) / vector[j]);
      }
    }
    return this;
  }

  addColumnVector(vector) {
    vector = Object(_util__WEBPACK_IMPORTED_MODULE_4__["checkColumnVector"])(this, vector);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, this.get(i, j) + vector[i]);
      }
    }
    return this;
  }

  subColumnVector(vector) {
    vector = Object(_util__WEBPACK_IMPORTED_MODULE_4__["checkColumnVector"])(this, vector);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, this.get(i, j) - vector[i]);
      }
    }
    return this;
  }

  mulColumnVector(vector) {
    vector = Object(_util__WEBPACK_IMPORTED_MODULE_4__["checkColumnVector"])(this, vector);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, this.get(i, j) * vector[i]);
      }
    }
    return this;
  }

  divColumnVector(vector) {
    vector = Object(_util__WEBPACK_IMPORTED_MODULE_4__["checkColumnVector"])(this, vector);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, this.get(i, j) / vector[i]);
      }
    }
    return this;
  }

  mulRow(index, value) {
    Object(_util__WEBPACK_IMPORTED_MODULE_4__["checkRowIndex"])(this, index);
    for (let i = 0; i < this.columns; i++) {
      this.set(index, i, this.get(index, i) * value);
    }
    return this;
  }

  mulColumn(index, value) {
    Object(_util__WEBPACK_IMPORTED_MODULE_4__["checkColumnIndex"])(this, index);
    for (let i = 0; i < this.rows; i++) {
      this.set(i, index, this.get(i, index) * value);
    }
    return this;
  }

  max() {
    let v = this.get(0, 0);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        if (this.get(i, j) > v) {
          v = this.get(i, j);
        }
      }
    }
    return v;
  }

  maxIndex() {
    let v = this.get(0, 0);
    let idx = [0, 0];
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        if (this.get(i, j) > v) {
          v = this.get(i, j);
          idx[0] = i;
          idx[1] = j;
        }
      }
    }
    return idx;
  }

  min() {
    let v = this.get(0, 0);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        if (this.get(i, j) < v) {
          v = this.get(i, j);
        }
      }
    }
    return v;
  }

  minIndex() {
    let v = this.get(0, 0);
    let idx = [0, 0];
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        if (this.get(i, j) < v) {
          v = this.get(i, j);
          idx[0] = i;
          idx[1] = j;
        }
      }
    }
    return idx;
  }

  maxRow(row) {
    Object(_util__WEBPACK_IMPORTED_MODULE_4__["checkRowIndex"])(this, row);
    let v = this.get(row, 0);
    for (let i = 1; i < this.columns; i++) {
      if (this.get(row, i) > v) {
        v = this.get(row, i);
      }
    }
    return v;
  }

  maxRowIndex(row) {
    Object(_util__WEBPACK_IMPORTED_MODULE_4__["checkRowIndex"])(this, row);
    let v = this.get(row, 0);
    let idx = [row, 0];
    for (let i = 1; i < this.columns; i++) {
      if (this.get(row, i) > v) {
        v = this.get(row, i);
        idx[1] = i;
      }
    }
    return idx;
  }

  minRow(row) {
    Object(_util__WEBPACK_IMPORTED_MODULE_4__["checkRowIndex"])(this, row);
    let v = this.get(row, 0);
    for (let i = 1; i < this.columns; i++) {
      if (this.get(row, i) < v) {
        v = this.get(row, i);
      }
    }
    return v;
  }

  minRowIndex(row) {
    Object(_util__WEBPACK_IMPORTED_MODULE_4__["checkRowIndex"])(this, row);
    let v = this.get(row, 0);
    let idx = [row, 0];
    for (let i = 1; i < this.columns; i++) {
      if (this.get(row, i) < v) {
        v = this.get(row, i);
        idx[1] = i;
      }
    }
    return idx;
  }

  maxColumn(column) {
    Object(_util__WEBPACK_IMPORTED_MODULE_4__["checkColumnIndex"])(this, column);
    let v = this.get(0, column);
    for (let i = 1; i < this.rows; i++) {
      if (this.get(i, column) > v) {
        v = this.get(i, column);
      }
    }
    return v;
  }

  maxColumnIndex(column) {
    Object(_util__WEBPACK_IMPORTED_MODULE_4__["checkColumnIndex"])(this, column);
    let v = this.get(0, column);
    let idx = [0, column];
    for (let i = 1; i < this.rows; i++) {
      if (this.get(i, column) > v) {
        v = this.get(i, column);
        idx[0] = i;
      }
    }
    return idx;
  }

  minColumn(column) {
    Object(_util__WEBPACK_IMPORTED_MODULE_4__["checkColumnIndex"])(this, column);
    let v = this.get(0, column);
    for (let i = 1; i < this.rows; i++) {
      if (this.get(i, column) < v) {
        v = this.get(i, column);
      }
    }
    return v;
  }

  minColumnIndex(column) {
    Object(_util__WEBPACK_IMPORTED_MODULE_4__["checkColumnIndex"])(this, column);
    let v = this.get(0, column);
    let idx = [0, column];
    for (let i = 1; i < this.rows; i++) {
      if (this.get(i, column) < v) {
        v = this.get(i, column);
        idx[0] = i;
      }
    }
    return idx;
  }

  diag() {
    let min = Math.min(this.rows, this.columns);
    let diag = [];
    for (let i = 0; i < min; i++) {
      diag.push(this.get(i, i));
    }
    return diag;
  }

  norm(type = 'frobenius') {
    let result = 0;
    if (type === 'max') {
      return this.max();
    } else if (type === 'frobenius') {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          result = result + this.get(i, j) * this.get(i, j);
        }
      }
      return Math.sqrt(result);
    } else {
      throw new RangeError(`unknown norm type: ${type}`);
    }
  }

  cumulativeSum() {
    let sum = 0;
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        sum += this.get(i, j);
        this.set(i, j, sum);
      }
    }
    return this;
  }

  dot(vector2) {
    if (AbstractMatrix.isMatrix(vector2)) vector2 = vector2.to1DArray();
    let vector1 = this.to1DArray();
    if (vector1.length !== vector2.length) {
      throw new RangeError('vectors do not have the same size');
    }
    let dot = 0;
    for (let i = 0; i < vector1.length; i++) {
      dot += vector1[i] * vector2[i];
    }
    return dot;
  }

  mmul(other) {
    other = Matrix.checkMatrix(other);

    let m = this.rows;
    let n = this.columns;
    let p = other.columns;

    let result = new Matrix(m, p);

    let Bcolj = new Float64Array(n);
    for (let j = 0; j < p; j++) {
      for (let k = 0; k < n; k++) {
        Bcolj[k] = other.get(k, j);
      }

      for (let i = 0; i < m; i++) {
        let s = 0;
        for (let k = 0; k < n; k++) {
          s += this.get(i, k) * Bcolj[k];
        }

        result.set(i, j, s);
      }
    }
    return result;
  }

  strassen2x2(other) {
    other = Matrix.checkMatrix(other);
    let result = new Matrix(2, 2);
    const a11 = this.get(0, 0);
    const b11 = other.get(0, 0);
    const a12 = this.get(0, 1);
    const b12 = other.get(0, 1);
    const a21 = this.get(1, 0);
    const b21 = other.get(1, 0);
    const a22 = this.get(1, 1);
    const b22 = other.get(1, 1);

    // Compute intermediate values.
    const m1 = (a11 + a22) * (b11 + b22);
    const m2 = (a21 + a22) * b11;
    const m3 = a11 * (b12 - b22);
    const m4 = a22 * (b21 - b11);
    const m5 = (a11 + a12) * b22;
    const m6 = (a21 - a11) * (b11 + b12);
    const m7 = (a12 - a22) * (b21 + b22);

    // Combine intermediate values into the output.
    const c00 = m1 + m4 - m5 + m7;
    const c01 = m3 + m5;
    const c10 = m2 + m4;
    const c11 = m1 - m2 + m3 + m6;

    result.set(0, 0, c00);
    result.set(0, 1, c01);
    result.set(1, 0, c10);
    result.set(1, 1, c11);
    return result;
  }

  strassen3x3(other) {
    other = Matrix.checkMatrix(other);
    let result = new Matrix(3, 3);

    const a00 = this.get(0, 0);
    const a01 = this.get(0, 1);
    const a02 = this.get(0, 2);
    const a10 = this.get(1, 0);
    const a11 = this.get(1, 1);
    const a12 = this.get(1, 2);
    const a20 = this.get(2, 0);
    const a21 = this.get(2, 1);
    const a22 = this.get(2, 2);

    const b00 = other.get(0, 0);
    const b01 = other.get(0, 1);
    const b02 = other.get(0, 2);
    const b10 = other.get(1, 0);
    const b11 = other.get(1, 1);
    const b12 = other.get(1, 2);
    const b20 = other.get(2, 0);
    const b21 = other.get(2, 1);
    const b22 = other.get(2, 2);

    const m1 = (a00 + a01 + a02 - a10 - a11 - a21 - a22) * b11;
    const m2 = (a00 - a10) * (-b01 + b11);
    const m3 = a11 * (-b00 + b01 + b10 - b11 - b12 - b20 + b22);
    const m4 = (-a00 + a10 + a11) * (b00 - b01 + b11);
    const m5 = (a10 + a11) * (-b00 + b01);
    const m6 = a00 * b00;
    const m7 = (-a00 + a20 + a21) * (b00 - b02 + b12);
    const m8 = (-a00 + a20) * (b02 - b12);
    const m9 = (a20 + a21) * (-b00 + b02);
    const m10 = (a00 + a01 + a02 - a11 - a12 - a20 - a21) * b12;
    const m11 = a21 * (-b00 + b02 + b10 - b11 - b12 - b20 + b21);
    const m12 = (-a02 + a21 + a22) * (b11 + b20 - b21);
    const m13 = (a02 - a22) * (b11 - b21);
    const m14 = a02 * b20;
    const m15 = (a21 + a22) * (-b20 + b21);
    const m16 = (-a02 + a11 + a12) * (b12 + b20 - b22);
    const m17 = (a02 - a12) * (b12 - b22);
    const m18 = (a11 + a12) * (-b20 + b22);
    const m19 = a01 * b10;
    const m20 = a12 * b21;
    const m21 = a10 * b02;
    const m22 = a20 * b01;
    const m23 = a22 * b22;

    const c00 = m6 + m14 + m19;
    const c01 = m1 + m4 + m5 + m6 + m12 + m14 + m15;
    const c02 = m6 + m7 + m9 + m10 + m14 + m16 + m18;
    const c10 = m2 + m3 + m4 + m6 + m14 + m16 + m17;
    const c11 = m2 + m4 + m5 + m6 + m20;
    const c12 = m14 + m16 + m17 + m18 + m21;
    const c20 = m6 + m7 + m8 + m11 + m12 + m13 + m14;
    const c21 = m12 + m13 + m14 + m15 + m22;
    const c22 = m6 + m7 + m8 + m9 + m23;

    result.set(0, 0, c00);
    result.set(0, 1, c01);
    result.set(0, 2, c02);
    result.set(1, 0, c10);
    result.set(1, 1, c11);
    result.set(1, 2, c12);
    result.set(2, 0, c20);
    result.set(2, 1, c21);
    result.set(2, 2, c22);
    return result;
  }

  mmulStrassen(y) {
    y = Matrix.checkMatrix(y);
    let x = this.clone();
    let r1 = x.rows;
    let c1 = x.columns;
    let r2 = y.rows;
    let c2 = y.columns;
    if (c1 !== r2) {
      // eslint-disable-next-line no-console
      console.warn(
        `Multiplying ${r1} x ${c1} and ${r2} x ${c2} matrix: dimensions do not match.`,
      );
    }

    // Put a matrix into the top left of a matrix of zeros.
    // `rows` and `cols` are the dimensions of the output matrix.
    function embed(mat, rows, cols) {
      let r = mat.rows;
      let c = mat.columns;
      if (r === rows && c === cols) {
        return mat;
      } else {
        let resultat = AbstractMatrix.zeros(rows, cols);
        resultat = resultat.setSubMatrix(mat, 0, 0);
        return resultat;
      }
    }

    // Make sure both matrices are the same size.
    // This is exclusively for simplicity:
    // this algorithm can be implemented with matrices of different sizes.

    let r = Math.max(r1, r2);
    let c = Math.max(c1, c2);
    x = embed(x, r, c);
    y = embed(y, r, c);

    // Our recursive multiplication function.
    function blockMult(a, b, rows, cols) {
      // For small matrices, resort to naive multiplication.
      if (rows <= 512 || cols <= 512) {
        return a.mmul(b); // a is equivalent to this
      }

      // Apply dynamic padding.
      if (rows % 2 === 1 && cols % 2 === 1) {
        a = embed(a, rows + 1, cols + 1);
        b = embed(b, rows + 1, cols + 1);
      } else if (rows % 2 === 1) {
        a = embed(a, rows + 1, cols);
        b = embed(b, rows + 1, cols);
      } else if (cols % 2 === 1) {
        a = embed(a, rows, cols + 1);
        b = embed(b, rows, cols + 1);
      }

      let halfRows = parseInt(a.rows / 2, 10);
      let halfCols = parseInt(a.columns / 2, 10);
      // Subdivide input matrices.
      let a11 = a.subMatrix(0, halfRows - 1, 0, halfCols - 1);
      let b11 = b.subMatrix(0, halfRows - 1, 0, halfCols - 1);

      let a12 = a.subMatrix(0, halfRows - 1, halfCols, a.columns - 1);
      let b12 = b.subMatrix(0, halfRows - 1, halfCols, b.columns - 1);

      let a21 = a.subMatrix(halfRows, a.rows - 1, 0, halfCols - 1);
      let b21 = b.subMatrix(halfRows, b.rows - 1, 0, halfCols - 1);

      let a22 = a.subMatrix(halfRows, a.rows - 1, halfCols, a.columns - 1);
      let b22 = b.subMatrix(halfRows, b.rows - 1, halfCols, b.columns - 1);

      // Compute intermediate values.
      let m1 = blockMult(
        AbstractMatrix.add(a11, a22),
        AbstractMatrix.add(b11, b22),
        halfRows,
        halfCols,
      );
      let m2 = blockMult(AbstractMatrix.add(a21, a22), b11, halfRows, halfCols);
      let m3 = blockMult(a11, AbstractMatrix.sub(b12, b22), halfRows, halfCols);
      let m4 = blockMult(a22, AbstractMatrix.sub(b21, b11), halfRows, halfCols);
      let m5 = blockMult(AbstractMatrix.add(a11, a12), b22, halfRows, halfCols);
      let m6 = blockMult(
        AbstractMatrix.sub(a21, a11),
        AbstractMatrix.add(b11, b12),
        halfRows,
        halfCols,
      );
      let m7 = blockMult(
        AbstractMatrix.sub(a12, a22),
        AbstractMatrix.add(b21, b22),
        halfRows,
        halfCols,
      );

      // Combine intermediate values into the output.
      let c11 = AbstractMatrix.add(m1, m4);
      c11.sub(m5);
      c11.add(m7);
      let c12 = AbstractMatrix.add(m3, m5);
      let c21 = AbstractMatrix.add(m2, m4);
      let c22 = AbstractMatrix.sub(m1, m2);
      c22.add(m3);
      c22.add(m6);

      // Crop output to the desired size (undo dynamic padding).
      let resultat = AbstractMatrix.zeros(2 * c11.rows, 2 * c11.columns);
      resultat = resultat.setSubMatrix(c11, 0, 0);
      resultat = resultat.setSubMatrix(c12, c11.rows, 0);
      resultat = resultat.setSubMatrix(c21, 0, c11.columns);
      resultat = resultat.setSubMatrix(c22, c11.rows, c11.columns);
      return resultat.subMatrix(0, rows - 1, 0, cols - 1);
    }
    return blockMult(x, y, r, c);
  }

  scaleRows(options = {}) {
    if (typeof options !== 'object') {
      throw new TypeError('options must be an object');
    }
    const { min = 0, max = 1 } = options;
    if (!Number.isFinite(min)) throw new TypeError('min must be a number');
    if (!Number.isFinite(max)) throw new TypeError('max must be a number');
    if (min >= max) throw new RangeError('min must be smaller than max');
    let newMatrix = new Matrix(this.rows, this.columns);
    for (let i = 0; i < this.rows; i++) {
      const row = this.getRow(i);
      Object(ml_array_rescale__WEBPACK_IMPORTED_MODULE_0__["default"])(row, { min, max, output: row });
      newMatrix.setRow(i, row);
    }
    return newMatrix;
  }

  scaleColumns(options = {}) {
    if (typeof options !== 'object') {
      throw new TypeError('options must be an object');
    }
    const { min = 0, max = 1 } = options;
    if (!Number.isFinite(min)) throw new TypeError('min must be a number');
    if (!Number.isFinite(max)) throw new TypeError('max must be a number');
    if (min >= max) throw new RangeError('min must be smaller than max');
    let newMatrix = new Matrix(this.rows, this.columns);
    for (let i = 0; i < this.columns; i++) {
      const column = this.getColumn(i);
      Object(ml_array_rescale__WEBPACK_IMPORTED_MODULE_0__["default"])(column, {
        min: min,
        max: max,
        output: column,
      });
      newMatrix.setColumn(i, column);
    }
    return newMatrix;
  }

  flipRows() {
    const middle = Math.ceil(this.columns / 2);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < middle; j++) {
        let first = this.get(i, j);
        let last = this.get(i, this.columns - 1 - j);
        this.set(i, j, last);
        this.set(i, this.columns - 1 - j, first);
      }
    }
    return this;
  }

  flipColumns() {
    const middle = Math.ceil(this.rows / 2);
    for (let j = 0; j < this.columns; j++) {
      for (let i = 0; i < middle; i++) {
        let first = this.get(i, j);
        let last = this.get(this.rows - 1 - i, j);
        this.set(i, j, last);
        this.set(this.rows - 1 - i, j, first);
      }
    }
    return this;
  }

  kroneckerProduct(other) {
    other = Matrix.checkMatrix(other);

    let m = this.rows;
    let n = this.columns;
    let p = other.rows;
    let q = other.columns;

    let result = new Matrix(m * p, n * q);
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        for (let k = 0; k < p; k++) {
          for (let l = 0; l < q; l++) {
            result.set(p * i + k, q * j + l, this.get(i, j) * other.get(k, l));
          }
        }
      }
    }
    return result;
  }

  transpose() {
    let result = new Matrix(this.columns, this.rows);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        result.set(j, i, this.get(i, j));
      }
    }
    return result;
  }

  sortRows(compareFunction = compareNumbers) {
    for (let i = 0; i < this.rows; i++) {
      this.setRow(i, this.getRow(i).sort(compareFunction));
    }
    return this;
  }

  sortColumns(compareFunction = compareNumbers) {
    for (let i = 0; i < this.columns; i++) {
      this.setColumn(i, this.getColumn(i).sort(compareFunction));
    }
    return this;
  }

  subMatrix(startRow, endRow, startColumn, endColumn) {
    Object(_util__WEBPACK_IMPORTED_MODULE_4__["checkRange"])(this, startRow, endRow, startColumn, endColumn);
    let newMatrix = new Matrix(
      endRow - startRow + 1,
      endColumn - startColumn + 1,
    );
    for (let i = startRow; i <= endRow; i++) {
      for (let j = startColumn; j <= endColumn; j++) {
        newMatrix.set(i - startRow, j - startColumn, this.get(i, j));
      }
    }
    return newMatrix;
  }

  subMatrixRow(indices, startColumn, endColumn) {
    if (startColumn === undefined) startColumn = 0;
    if (endColumn === undefined) endColumn = this.columns - 1;
    if (
      startColumn > endColumn ||
      startColumn < 0 ||
      startColumn >= this.columns ||
      endColumn < 0 ||
      endColumn >= this.columns
    ) {
      throw new RangeError('Argument out of range');
    }

    let newMatrix = new Matrix(indices.length, endColumn - startColumn + 1);
    for (let i = 0; i < indices.length; i++) {
      for (let j = startColumn; j <= endColumn; j++) {
        if (indices[i] < 0 || indices[i] >= this.rows) {
          throw new RangeError(`Row index out of range: ${indices[i]}`);
        }
        newMatrix.set(i, j - startColumn, this.get(indices[i], j));
      }
    }
    return newMatrix;
  }

  subMatrixColumn(indices, startRow, endRow) {
    if (startRow === undefined) startRow = 0;
    if (endRow === undefined) endRow = this.rows - 1;
    if (
      startRow > endRow ||
      startRow < 0 ||
      startRow >= this.rows ||
      endRow < 0 ||
      endRow >= this.rows
    ) {
      throw new RangeError('Argument out of range');
    }

    let newMatrix = new Matrix(endRow - startRow + 1, indices.length);
    for (let i = 0; i < indices.length; i++) {
      for (let j = startRow; j <= endRow; j++) {
        if (indices[i] < 0 || indices[i] >= this.columns) {
          throw new RangeError(`Column index out of range: ${indices[i]}`);
        }
        newMatrix.set(j - startRow, i, this.get(j, indices[i]));
      }
    }
    return newMatrix;
  }

  setSubMatrix(matrix, startRow, startColumn) {
    matrix = Matrix.checkMatrix(matrix);
    let endRow = startRow + matrix.rows - 1;
    let endColumn = startColumn + matrix.columns - 1;
    Object(_util__WEBPACK_IMPORTED_MODULE_4__["checkRange"])(this, startRow, endRow, startColumn, endColumn);
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.columns; j++) {
        this.set(startRow + i, startColumn + j, matrix.get(i, j));
      }
    }
    return this;
  }

  selection(rowIndices, columnIndices) {
    let indices = Object(_util__WEBPACK_IMPORTED_MODULE_4__["checkIndices"])(this, rowIndices, columnIndices);
    let newMatrix = new Matrix(rowIndices.length, columnIndices.length);
    for (let i = 0; i < indices.row.length; i++) {
      let rowIndex = indices.row[i];
      for (let j = 0; j < indices.column.length; j++) {
        let columnIndex = indices.column[j];
        newMatrix.set(i, j, this.get(rowIndex, columnIndex));
      }
    }
    return newMatrix;
  }

  trace() {
    let min = Math.min(this.rows, this.columns);
    let trace = 0;
    for (let i = 0; i < min; i++) {
      trace += this.get(i, i);
    }
    return trace;
  }

  clone() {
    let newMatrix = new Matrix(this.rows, this.columns);
    for (let row = 0; row < this.rows; row++) {
      for (let column = 0; column < this.columns; column++) {
        newMatrix.set(row, column, this.get(row, column));
      }
    }
    return newMatrix;
  }

  sum(by) {
    switch (by) {
      case 'row':
        return Object(_stat__WEBPACK_IMPORTED_MODULE_3__["sumByRow"])(this);
      case 'column':
        return Object(_stat__WEBPACK_IMPORTED_MODULE_3__["sumByColumn"])(this);
      case undefined:
        return Object(_stat__WEBPACK_IMPORTED_MODULE_3__["sumAll"])(this);
      default:
        throw new Error(`invalid option: ${by}`);
    }
  }

  product(by) {
    switch (by) {
      case 'row':
        return Object(_stat__WEBPACK_IMPORTED_MODULE_3__["productByRow"])(this);
      case 'column':
        return Object(_stat__WEBPACK_IMPORTED_MODULE_3__["productByColumn"])(this);
      case undefined:
        return Object(_stat__WEBPACK_IMPORTED_MODULE_3__["productAll"])(this);
      default:
        throw new Error(`invalid option: ${by}`);
    }
  }

  mean(by) {
    const sum = this.sum(by);
    switch (by) {
      case 'row': {
        for (let i = 0; i < this.rows; i++) {
          sum[i] /= this.columns;
        }
        return sum;
      }
      case 'column': {
        for (let i = 0; i < this.columns; i++) {
          sum[i] /= this.rows;
        }
        return sum;
      }
      case undefined:
        return sum / this.size;
      default:
        throw new Error(`invalid option: ${by}`);
    }
  }

  variance(by, options = {}) {
    if (typeof by === 'object') {
      options = by;
      by = undefined;
    }
    if (typeof options !== 'object') {
      throw new TypeError('options must be an object');
    }
    const { unbiased = true, mean = this.mean(by) } = options;
    if (typeof unbiased !== 'boolean') {
      throw new TypeError('unbiased must be a boolean');
    }
    switch (by) {
      case 'row': {
        if (!Array.isArray(mean)) {
          throw new TypeError('mean must be an array');
        }
        return Object(_stat__WEBPACK_IMPORTED_MODULE_3__["varianceByRow"])(this, unbiased, mean);
      }
      case 'column': {
        if (!Array.isArray(mean)) {
          throw new TypeError('mean must be an array');
        }
        return Object(_stat__WEBPACK_IMPORTED_MODULE_3__["varianceByColumn"])(this, unbiased, mean);
      }
      case undefined: {
        if (typeof mean !== 'number') {
          throw new TypeError('mean must be a number');
        }
        return Object(_stat__WEBPACK_IMPORTED_MODULE_3__["varianceAll"])(this, unbiased, mean);
      }
      default:
        throw new Error(`invalid option: ${by}`);
    }
  }

  standardDeviation(by, options) {
    if (typeof by === 'object') {
      options = by;
      by = undefined;
    }
    const variance = this.variance(by, options);
    if (by === undefined) {
      return Math.sqrt(variance);
    } else {
      for (let i = 0; i < variance.length; i++) {
        variance[i] = Math.sqrt(variance[i]);
      }
      return variance;
    }
  }

  center(by, options = {}) {
    if (typeof by === 'object') {
      options = by;
      by = undefined;
    }
    if (typeof options !== 'object') {
      throw new TypeError('options must be an object');
    }
    const { center = this.mean(by) } = options;
    switch (by) {
      case 'row': {
        if (!Array.isArray(center)) {
          throw new TypeError('center must be an array');
        }
        Object(_stat__WEBPACK_IMPORTED_MODULE_3__["centerByRow"])(this, center);
        return this;
      }
      case 'column': {
        if (!Array.isArray(center)) {
          throw new TypeError('center must be an array');
        }
        Object(_stat__WEBPACK_IMPORTED_MODULE_3__["centerByColumn"])(this, center);
        return this;
      }
      case undefined: {
        if (typeof center !== 'number') {
          throw new TypeError('center must be a number');
        }
        Object(_stat__WEBPACK_IMPORTED_MODULE_3__["centerAll"])(this, center);
        return this;
      }
      default:
        throw new Error(`invalid option: ${by}`);
    }
  }

  scale(by, options = {}) {
    if (typeof by === 'object') {
      options = by;
      by = undefined;
    }
    if (typeof options !== 'object') {
      throw new TypeError('options must be an object');
    }
    let scale = options.scale;
    switch (by) {
      case 'row': {
        if (scale === undefined) {
          scale = Object(_stat__WEBPACK_IMPORTED_MODULE_3__["getScaleByRow"])(this);
        } else if (!Array.isArray(scale)) {
          throw new TypeError('scale must be an array');
        }
        Object(_stat__WEBPACK_IMPORTED_MODULE_3__["scaleByRow"])(this, scale);
        return this;
      }
      case 'column': {
        if (scale === undefined) {
          scale = Object(_stat__WEBPACK_IMPORTED_MODULE_3__["getScaleByColumn"])(this);
        } else if (!Array.isArray(scale)) {
          throw new TypeError('scale must be an array');
        }
        Object(_stat__WEBPACK_IMPORTED_MODULE_3__["scaleByColumn"])(this, scale);
        return this;
      }
      case undefined: {
        if (scale === undefined) {
          scale = Object(_stat__WEBPACK_IMPORTED_MODULE_3__["getScaleAll"])(this);
        } else if (typeof scale !== 'number') {
          throw new TypeError('scale must be a number');
        }
        Object(_stat__WEBPACK_IMPORTED_MODULE_3__["scaleAll"])(this, scale);
        return this;
      }
      default:
        throw new Error(`invalid option: ${by}`);
    }
  }

  toString(options) {
    return Object(_inspect__WEBPACK_IMPORTED_MODULE_1__["inspectMatrixWithOptions"])(this, options);
  }
}

AbstractMatrix.prototype.klass = 'Matrix';
if (typeof Symbol !== 'undefined') {
  AbstractMatrix.prototype[
    Symbol.for('nodejs.util.inspect.custom')
  ] = _inspect__WEBPACK_IMPORTED_MODULE_1__["inspectMatrix"];
}

function compareNumbers(a, b) {
  return a - b;
}

// Synonyms
AbstractMatrix.random = AbstractMatrix.rand;
AbstractMatrix.randomInt = AbstractMatrix.randInt;
AbstractMatrix.diagonal = AbstractMatrix.diag;
AbstractMatrix.prototype.diagonal = AbstractMatrix.prototype.diag;
AbstractMatrix.identity = AbstractMatrix.eye;
AbstractMatrix.prototype.negate = AbstractMatrix.prototype.neg;
AbstractMatrix.prototype.tensorProduct =
  AbstractMatrix.prototype.kroneckerProduct;

class Matrix extends AbstractMatrix {
  constructor(nRows, nColumns) {
    super();
    if (Matrix.isMatrix(nRows)) {
      return nRows.clone();
    } else if (Number.isInteger(nRows) && nRows > 0) {
      // Create an empty matrix
      this.data = [];
      if (Number.isInteger(nColumns) && nColumns > 0) {
        for (let i = 0; i < nRows; i++) {
          this.data.push(new Float64Array(nColumns));
        }
      } else {
        throw new TypeError('nColumns must be a positive integer');
      }
    } else if (Array.isArray(nRows)) {
      // Copy the values from the 2D array
      const arrayData = nRows;
      nRows = arrayData.length;
      nColumns = arrayData[0].length;
      if (typeof nColumns !== 'number' || nColumns === 0) {
        throw new TypeError(
          'Data must be a 2D array with at least one element',
        );
      }
      this.data = [];
      for (let i = 0; i < nRows; i++) {
        if (arrayData[i].length !== nColumns) {
          throw new RangeError('Inconsistent array dimensions');
        }
        this.data.push(Float64Array.from(arrayData[i]));
      }
    } else {
      throw new TypeError(
        'First argument must be a positive number or an array',
      );
    }
    this.rows = nRows;
    this.columns = nColumns;
    return this;
  }

  set(rowIndex, columnIndex, value) {
    this.data[rowIndex][columnIndex] = value;
    return this;
  }

  get(rowIndex, columnIndex) {
    return this.data[rowIndex][columnIndex];
  }

  removeRow(index) {
    Object(_util__WEBPACK_IMPORTED_MODULE_4__["checkRowIndex"])(this, index);
    if (this.rows === 1) {
      throw new RangeError('A matrix cannot have less than one row');
    }
    this.data.splice(index, 1);
    this.rows -= 1;
    return this;
  }

  addRow(index, array) {
    if (array === undefined) {
      array = index;
      index = this.rows;
    }
    Object(_util__WEBPACK_IMPORTED_MODULE_4__["checkRowIndex"])(this, index, true);
    array = Float64Array.from(Object(_util__WEBPACK_IMPORTED_MODULE_4__["checkRowVector"])(this, array, true));
    this.data.splice(index, 0, array);
    this.rows += 1;
    return this;
  }

  removeColumn(index) {
    Object(_util__WEBPACK_IMPORTED_MODULE_4__["checkColumnIndex"])(this, index);
    if (this.columns === 1) {
      throw new RangeError('A matrix cannot have less than one column');
    }
    for (let i = 0; i < this.rows; i++) {
      const newRow = new Float64Array(this.columns - 1);
      for (let j = 0; j < index; j++) {
        newRow[j] = this.data[i][j];
      }
      for (let j = index + 1; j < this.columns; j++) {
        newRow[j - 1] = this.data[i][j];
      }
      this.data[i] = newRow;
    }
    this.columns -= 1;
    return this;
  }

  addColumn(index, array) {
    if (typeof array === 'undefined') {
      array = index;
      index = this.columns;
    }
    Object(_util__WEBPACK_IMPORTED_MODULE_4__["checkColumnIndex"])(this, index, true);
    array = Object(_util__WEBPACK_IMPORTED_MODULE_4__["checkColumnVector"])(this, array);
    for (let i = 0; i < this.rows; i++) {
      const newRow = new Float64Array(this.columns + 1);
      let j = 0;
      for (; j < index; j++) {
        newRow[j] = this.data[i][j];
      }
      newRow[j++] = array[i];
      for (; j < this.columns + 1; j++) {
        newRow[j] = this.data[i][j - 1];
      }
      this.data[i] = newRow;
    }
    this.columns += 1;
    return this;
  }
}

Object(_mathOperations__WEBPACK_IMPORTED_MODULE_2__["installMathOperations"])(AbstractMatrix, Matrix);


/***/ }),

/***/ "./node_modules/ml-matrix/src/pseudoInverse.js":
/*!*****************************************************!*\
  !*** ./node_modules/ml-matrix/src/pseudoInverse.js ***!
  \*****************************************************/
/*! exports provided: pseudoInverse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pseudoInverse", function() { return pseudoInverse; });
/* harmony import */ var _dc_svd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dc/svd */ "./node_modules/ml-matrix/src/dc/svd.js");
/* harmony import */ var _matrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./matrix */ "./node_modules/ml-matrix/src/matrix.js");



function pseudoInverse(matrix, threshold = Number.EPSILON) {
  matrix = _matrix__WEBPACK_IMPORTED_MODULE_1__["default"].checkMatrix(matrix);
  let svdSolution = new _dc_svd__WEBPACK_IMPORTED_MODULE_0__["default"](matrix, { autoTranspose: true });

  let U = svdSolution.leftSingularVectors;
  let V = svdSolution.rightSingularVectors;
  let s = svdSolution.diagonal;

  for (let i = 0; i < s.length; i++) {
    if (Math.abs(s[i]) > threshold) {
      s[i] = 1.0 / s[i];
    } else {
      s[i] = 0.0;
    }
  }

  return V.mmul(_matrix__WEBPACK_IMPORTED_MODULE_1__["default"].diag(s).mmul(U.transpose()));
}


/***/ }),

/***/ "./node_modules/ml-matrix/src/stat.js":
/*!********************************************!*\
  !*** ./node_modules/ml-matrix/src/stat.js ***!
  \********************************************/
/*! exports provided: sumByRow, sumByColumn, sumAll, productByRow, productByColumn, productAll, varianceByRow, varianceByColumn, varianceAll, centerByRow, centerByColumn, centerAll, getScaleByRow, scaleByRow, getScaleByColumn, scaleByColumn, getScaleAll, scaleAll */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sumByRow", function() { return sumByRow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sumByColumn", function() { return sumByColumn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sumAll", function() { return sumAll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "productByRow", function() { return productByRow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "productByColumn", function() { return productByColumn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "productAll", function() { return productAll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "varianceByRow", function() { return varianceByRow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "varianceByColumn", function() { return varianceByColumn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "varianceAll", function() { return varianceAll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "centerByRow", function() { return centerByRow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "centerByColumn", function() { return centerByColumn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "centerAll", function() { return centerAll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getScaleByRow", function() { return getScaleByRow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scaleByRow", function() { return scaleByRow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getScaleByColumn", function() { return getScaleByColumn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scaleByColumn", function() { return scaleByColumn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getScaleAll", function() { return getScaleAll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scaleAll", function() { return scaleAll; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./node_modules/ml-matrix/src/util.js");


function sumByRow(matrix) {
  let sum = Object(_util__WEBPACK_IMPORTED_MODULE_0__["newArray"])(matrix.rows);
  for (let i = 0; i < matrix.rows; ++i) {
    for (let j = 0; j < matrix.columns; ++j) {
      sum[i] += matrix.get(i, j);
    }
  }
  return sum;
}

function sumByColumn(matrix) {
  let sum = Object(_util__WEBPACK_IMPORTED_MODULE_0__["newArray"])(matrix.columns);
  for (let i = 0; i < matrix.rows; ++i) {
    for (let j = 0; j < matrix.columns; ++j) {
      sum[j] += matrix.get(i, j);
    }
  }
  return sum;
}

function sumAll(matrix) {
  let v = 0;
  for (let i = 0; i < matrix.rows; i++) {
    for (let j = 0; j < matrix.columns; j++) {
      v += matrix.get(i, j);
    }
  }
  return v;
}

function productByRow(matrix) {
  let sum = Object(_util__WEBPACK_IMPORTED_MODULE_0__["newArray"])(matrix.rows, 1);
  for (let i = 0; i < matrix.rows; ++i) {
    for (let j = 0; j < matrix.columns; ++j) {
      sum[i] *= matrix.get(i, j);
    }
  }
  return sum;
}

function productByColumn(matrix) {
  let sum = Object(_util__WEBPACK_IMPORTED_MODULE_0__["newArray"])(matrix.columns, 1);
  for (let i = 0; i < matrix.rows; ++i) {
    for (let j = 0; j < matrix.columns; ++j) {
      sum[j] *= matrix.get(i, j);
    }
  }
  return sum;
}

function productAll(matrix) {
  let v = 1;
  for (let i = 0; i < matrix.rows; i++) {
    for (let j = 0; j < matrix.columns; j++) {
      v *= matrix.get(i, j);
    }
  }
  return v;
}

function varianceByRow(matrix, unbiased, mean) {
  const rows = matrix.rows;
  const cols = matrix.columns;
  const variance = [];

  for (let i = 0; i < rows; i++) {
    let sum1 = 0;
    let sum2 = 0;
    let x = 0;
    for (let j = 0; j < cols; j++) {
      x = matrix.get(i, j) - mean[i];
      sum1 += x;
      sum2 += x * x;
    }
    if (unbiased) {
      variance.push((sum2 - (sum1 * sum1) / cols) / (cols - 1));
    } else {
      variance.push((sum2 - (sum1 * sum1) / cols) / cols);
    }
  }
  return variance;
}

function varianceByColumn(matrix, unbiased, mean) {
  const rows = matrix.rows;
  const cols = matrix.columns;
  const variance = [];

  for (let j = 0; j < cols; j++) {
    let sum1 = 0;
    let sum2 = 0;
    let x = 0;
    for (let i = 0; i < rows; i++) {
      x = matrix.get(i, j) - mean[j];
      sum1 += x;
      sum2 += x * x;
    }
    if (unbiased) {
      variance.push((sum2 - (sum1 * sum1) / rows) / (rows - 1));
    } else {
      variance.push((sum2 - (sum1 * sum1) / rows) / rows);
    }
  }
  return variance;
}

function varianceAll(matrix, unbiased, mean) {
  const rows = matrix.rows;
  const cols = matrix.columns;
  const size = rows * cols;

  let sum1 = 0;
  let sum2 = 0;
  let x = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      x = matrix.get(i, j) - mean;
      sum1 += x;
      sum2 += x * x;
    }
  }
  if (unbiased) {
    return (sum2 - (sum1 * sum1) / size) / (size - 1);
  } else {
    return (sum2 - (sum1 * sum1) / size) / size;
  }
}

function centerByRow(matrix, mean) {
  for (let i = 0; i < matrix.rows; i++) {
    for (let j = 0; j < matrix.columns; j++) {
      matrix.set(i, j, matrix.get(i, j) - mean[i]);
    }
  }
}

function centerByColumn(matrix, mean) {
  for (let i = 0; i < matrix.rows; i++) {
    for (let j = 0; j < matrix.columns; j++) {
      matrix.set(i, j, matrix.get(i, j) - mean[j]);
    }
  }
}

function centerAll(matrix, mean) {
  for (let i = 0; i < matrix.rows; i++) {
    for (let j = 0; j < matrix.columns; j++) {
      matrix.set(i, j, matrix.get(i, j) - mean);
    }
  }
}

function getScaleByRow(matrix) {
  const scale = [];
  for (let i = 0; i < matrix.rows; i++) {
    let sum = 0;
    for (let j = 0; j < matrix.columns; j++) {
      sum += Math.pow(matrix.get(i, j), 2) / (matrix.columns - 1);
    }
    scale.push(Math.sqrt(sum));
  }
  return scale;
}

function scaleByRow(matrix, scale) {
  for (let i = 0; i < matrix.rows; i++) {
    for (let j = 0; j < matrix.columns; j++) {
      matrix.set(i, j, matrix.get(i, j) / scale[i]);
    }
  }
}

function getScaleByColumn(matrix) {
  const scale = [];
  for (let j = 0; j < matrix.columns; j++) {
    let sum = 0;
    for (let i = 0; i < matrix.rows; i++) {
      sum += Math.pow(matrix.get(i, j), 2) / (matrix.rows - 1);
    }
    scale.push(Math.sqrt(sum));
  }
  return scale;
}

function scaleByColumn(matrix, scale) {
  for (let i = 0; i < matrix.rows; i++) {
    for (let j = 0; j < matrix.columns; j++) {
      matrix.set(i, j, matrix.get(i, j) / scale[j]);
    }
  }
}

function getScaleAll(matrix) {
  const divider = matrix.size - 1;
  let sum = 0;
  for (let j = 0; j < matrix.columns; j++) {
    for (let i = 0; i < matrix.rows; i++) {
      sum += Math.pow(matrix.get(i, j), 2) / divider;
    }
  }
  return Math.sqrt(sum);
}

function scaleAll(matrix, scale) {
  for (let i = 0; i < matrix.rows; i++) {
    for (let j = 0; j < matrix.columns; j++) {
      matrix.set(i, j, matrix.get(i, j) / scale);
    }
  }
}


/***/ }),

/***/ "./node_modules/ml-matrix/src/util.js":
/*!********************************************!*\
  !*** ./node_modules/ml-matrix/src/util.js ***!
  \********************************************/
/*! exports provided: checkRowIndex, checkColumnIndex, checkRowVector, checkColumnVector, checkIndices, checkRowIndices, checkColumnIndices, checkRange, newArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkRowIndex", function() { return checkRowIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkColumnIndex", function() { return checkColumnIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkRowVector", function() { return checkRowVector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkColumnVector", function() { return checkColumnVector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkIndices", function() { return checkIndices; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkRowIndices", function() { return checkRowIndices; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkColumnIndices", function() { return checkColumnIndices; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkRange", function() { return checkRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "newArray", function() { return newArray; });
/**
 * @private
 * Check that a row index is not out of bounds
 * @param {Matrix} matrix
 * @param {number} index
 * @param {boolean} [outer]
 */
function checkRowIndex(matrix, index, outer) {
  let max = outer ? matrix.rows : matrix.rows - 1;
  if (index < 0 || index > max) {
    throw new RangeError('Row index out of range');
  }
}

/**
 * @private
 * Check that a column index is not out of bounds
 * @param {Matrix} matrix
 * @param {number} index
 * @param {boolean} [outer]
 */
function checkColumnIndex(matrix, index, outer) {
  let max = outer ? matrix.columns : matrix.columns - 1;
  if (index < 0 || index > max) {
    throw new RangeError('Column index out of range');
  }
}

/**
 * @private
 * Check that the provided vector is an array with the right length
 * @param {Matrix} matrix
 * @param {Array|Matrix} vector
 * @return {Array}
 * @throws {RangeError}
 */
function checkRowVector(matrix, vector) {
  if (vector.to1DArray) {
    vector = vector.to1DArray();
  }
  if (vector.length !== matrix.columns) {
    throw new RangeError(
      'vector size must be the same as the number of columns',
    );
  }
  return vector;
}

/**
 * @private
 * Check that the provided vector is an array with the right length
 * @param {Matrix} matrix
 * @param {Array|Matrix} vector
 * @return {Array}
 * @throws {RangeError}
 */
function checkColumnVector(matrix, vector) {
  if (vector.to1DArray) {
    vector = vector.to1DArray();
  }
  if (vector.length !== matrix.rows) {
    throw new RangeError('vector size must be the same as the number of rows');
  }
  return vector;
}

function checkIndices(matrix, rowIndices, columnIndices) {
  return {
    row: checkRowIndices(matrix, rowIndices),
    column: checkColumnIndices(matrix, columnIndices),
  };
}

function checkRowIndices(matrix, rowIndices) {
  if (typeof rowIndices !== 'object') {
    throw new TypeError('unexpected type for row indices');
  }

  let rowOut = rowIndices.some((r) => {
    return r < 0 || r >= matrix.rows;
  });

  if (rowOut) {
    throw new RangeError('row indices are out of range');
  }

  if (!Array.isArray(rowIndices)) rowIndices = Array.from(rowIndices);

  return rowIndices;
}

function checkColumnIndices(matrix, columnIndices) {
  if (typeof columnIndices !== 'object') {
    throw new TypeError('unexpected type for column indices');
  }

  let columnOut = columnIndices.some((c) => {
    return c < 0 || c >= matrix.columns;
  });

  if (columnOut) {
    throw new RangeError('column indices are out of range');
  }
  if (!Array.isArray(columnIndices)) columnIndices = Array.from(columnIndices);

  return columnIndices;
}

function checkRange(matrix, startRow, endRow, startColumn, endColumn) {
  if (arguments.length !== 5) {
    throw new RangeError('expected 4 arguments');
  }
  checkNumber('startRow', startRow);
  checkNumber('endRow', endRow);
  checkNumber('startColumn', startColumn);
  checkNumber('endColumn', endColumn);
  if (
    startRow > endRow ||
    startColumn > endColumn ||
    startRow < 0 ||
    startRow >= matrix.rows ||
    endRow < 0 ||
    endRow >= matrix.rows ||
    startColumn < 0 ||
    startColumn >= matrix.columns ||
    endColumn < 0 ||
    endColumn >= matrix.columns
  ) {
    throw new RangeError('Submatrix indices are out of range');
  }
}

function newArray(length, value = 0) {
  let array = [];
  for (let i = 0; i < length; i++) {
    array.push(value);
  }
  return array;
}

function checkNumber(name, value) {
  if (typeof value !== 'number') {
    throw new TypeError(`${name} must be a number`);
  }
}


/***/ }),

/***/ "./node_modules/ml-matrix/src/views/base.js":
/*!**************************************************!*\
  !*** ./node_modules/ml-matrix/src/views/base.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BaseView; });
/* harmony import */ var _matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../matrix */ "./node_modules/ml-matrix/src/matrix.js");


class BaseView extends _matrix__WEBPACK_IMPORTED_MODULE_0__["AbstractMatrix"] {
  constructor(matrix, rows, columns) {
    super();
    this.matrix = matrix;
    this.rows = rows;
    this.columns = columns;
  }
}


/***/ }),

/***/ "./node_modules/ml-matrix/src/views/column.js":
/*!****************************************************!*\
  !*** ./node_modules/ml-matrix/src/views/column.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MatrixColumnView; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./node_modules/ml-matrix/src/util.js");
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ "./node_modules/ml-matrix/src/views/base.js");




class MatrixColumnView extends _base__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(matrix, column) {
    Object(_util__WEBPACK_IMPORTED_MODULE_0__["checkColumnIndex"])(matrix, column);
    super(matrix, matrix.rows, 1);
    this.column = column;
  }

  set(rowIndex, columnIndex, value) {
    this.matrix.set(rowIndex, this.column, value);
    return this;
  }

  get(rowIndex) {
    return this.matrix.get(rowIndex, this.column);
  }
}


/***/ }),

/***/ "./node_modules/ml-matrix/src/views/columnSelection.js":
/*!*************************************************************!*\
  !*** ./node_modules/ml-matrix/src/views/columnSelection.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MatrixColumnSelectionView; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./node_modules/ml-matrix/src/util.js");
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ "./node_modules/ml-matrix/src/views/base.js");




class MatrixColumnSelectionView extends _base__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(matrix, columnIndices) {
    columnIndices = Object(_util__WEBPACK_IMPORTED_MODULE_0__["checkColumnIndices"])(matrix, columnIndices);
    super(matrix, matrix.rows, columnIndices.length);
    this.columnIndices = columnIndices;
  }

  set(rowIndex, columnIndex, value) {
    this.matrix.set(rowIndex, this.columnIndices[columnIndex], value);
    return this;
  }

  get(rowIndex, columnIndex) {
    return this.matrix.get(rowIndex, this.columnIndices[columnIndex]);
  }
}


/***/ }),

/***/ "./node_modules/ml-matrix/src/views/flipColumn.js":
/*!********************************************************!*\
  !*** ./node_modules/ml-matrix/src/views/flipColumn.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MatrixFlipColumnView; });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ "./node_modules/ml-matrix/src/views/base.js");


class MatrixFlipColumnView extends _base__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(matrix) {
    super(matrix, matrix.rows, matrix.columns);
  }

  set(rowIndex, columnIndex, value) {
    this.matrix.set(rowIndex, this.columns - columnIndex - 1, value);
    return this;
  }

  get(rowIndex, columnIndex) {
    return this.matrix.get(rowIndex, this.columns - columnIndex - 1);
  }
}


/***/ }),

/***/ "./node_modules/ml-matrix/src/views/flipRow.js":
/*!*****************************************************!*\
  !*** ./node_modules/ml-matrix/src/views/flipRow.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MatrixFlipRowView; });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ "./node_modules/ml-matrix/src/views/base.js");


class MatrixFlipRowView extends _base__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(matrix) {
    super(matrix, matrix.rows, matrix.columns);
  }

  set(rowIndex, columnIndex, value) {
    this.matrix.set(this.rows - rowIndex - 1, columnIndex, value);
    return this;
  }

  get(rowIndex, columnIndex) {
    return this.matrix.get(this.rows - rowIndex - 1, columnIndex);
  }
}


/***/ }),

/***/ "./node_modules/ml-matrix/src/views/index.js":
/*!***************************************************!*\
  !*** ./node_modules/ml-matrix/src/views/index.js ***!
  \***************************************************/
/*! exports provided: MatrixColumnView, MatrixColumnSelectionView, MatrixFlipColumnView, MatrixFlipRowView, MatrixRowView, MatrixRowSelectionView, MatrixSelectionView, MatrixSubView, MatrixTransposeView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _column__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./column */ "./node_modules/ml-matrix/src/views/column.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MatrixColumnView", function() { return _column__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _columnSelection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./columnSelection */ "./node_modules/ml-matrix/src/views/columnSelection.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MatrixColumnSelectionView", function() { return _columnSelection__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _flipColumn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./flipColumn */ "./node_modules/ml-matrix/src/views/flipColumn.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MatrixFlipColumnView", function() { return _flipColumn__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _flipRow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./flipRow */ "./node_modules/ml-matrix/src/views/flipRow.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MatrixFlipRowView", function() { return _flipRow__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _row__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./row */ "./node_modules/ml-matrix/src/views/row.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MatrixRowView", function() { return _row__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _rowSelection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./rowSelection */ "./node_modules/ml-matrix/src/views/rowSelection.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MatrixRowSelectionView", function() { return _rowSelection__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _selection__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./selection */ "./node_modules/ml-matrix/src/views/selection.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MatrixSelectionView", function() { return _selection__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _sub__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./sub */ "./node_modules/ml-matrix/src/views/sub.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MatrixSubView", function() { return _sub__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _transpose__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./transpose */ "./node_modules/ml-matrix/src/views/transpose.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MatrixTransposeView", function() { return _transpose__WEBPACK_IMPORTED_MODULE_8__["default"]; });












/***/ }),

/***/ "./node_modules/ml-matrix/src/views/row.js":
/*!*************************************************!*\
  !*** ./node_modules/ml-matrix/src/views/row.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MatrixRowView; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./node_modules/ml-matrix/src/util.js");
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ "./node_modules/ml-matrix/src/views/base.js");




class MatrixRowView extends _base__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(matrix, row) {
    Object(_util__WEBPACK_IMPORTED_MODULE_0__["checkRowIndex"])(matrix, row);
    super(matrix, 1, matrix.columns);
    this.row = row;
  }

  set(rowIndex, columnIndex, value) {
    this.matrix.set(this.row, columnIndex, value);
    return this;
  }

  get(rowIndex, columnIndex) {
    return this.matrix.get(this.row, columnIndex);
  }
}


/***/ }),

/***/ "./node_modules/ml-matrix/src/views/rowSelection.js":
/*!**********************************************************!*\
  !*** ./node_modules/ml-matrix/src/views/rowSelection.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MatrixRowSelectionView; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./node_modules/ml-matrix/src/util.js");
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ "./node_modules/ml-matrix/src/views/base.js");




class MatrixRowSelectionView extends _base__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(matrix, rowIndices) {
    rowIndices = Object(_util__WEBPACK_IMPORTED_MODULE_0__["checkRowIndices"])(matrix, rowIndices);
    super(matrix, rowIndices.length, matrix.columns);
    this.rowIndices = rowIndices;
  }

  set(rowIndex, columnIndex, value) {
    this.matrix.set(this.rowIndices[rowIndex], columnIndex, value);
    return this;
  }

  get(rowIndex, columnIndex) {
    return this.matrix.get(this.rowIndices[rowIndex], columnIndex);
  }
}


/***/ }),

/***/ "./node_modules/ml-matrix/src/views/selection.js":
/*!*******************************************************!*\
  !*** ./node_modules/ml-matrix/src/views/selection.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MatrixSelectionView; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./node_modules/ml-matrix/src/util.js");
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ "./node_modules/ml-matrix/src/views/base.js");




class MatrixSelectionView extends _base__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(matrix, rowIndices, columnIndices) {
    let indices = Object(_util__WEBPACK_IMPORTED_MODULE_0__["checkIndices"])(matrix, rowIndices, columnIndices);
    super(matrix, indices.row.length, indices.column.length);
    this.rowIndices = indices.row;
    this.columnIndices = indices.column;
  }

  set(rowIndex, columnIndex, value) {
    this.matrix.set(
      this.rowIndices[rowIndex],
      this.columnIndices[columnIndex],
      value,
    );
    return this;
  }

  get(rowIndex, columnIndex) {
    return this.matrix.get(
      this.rowIndices[rowIndex],
      this.columnIndices[columnIndex],
    );
  }
}


/***/ }),

/***/ "./node_modules/ml-matrix/src/views/sub.js":
/*!*************************************************!*\
  !*** ./node_modules/ml-matrix/src/views/sub.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MatrixSubView; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./node_modules/ml-matrix/src/util.js");
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ "./node_modules/ml-matrix/src/views/base.js");




class MatrixSubView extends _base__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(matrix, startRow, endRow, startColumn, endColumn) {
    Object(_util__WEBPACK_IMPORTED_MODULE_0__["checkRange"])(matrix, startRow, endRow, startColumn, endColumn);
    super(matrix, endRow - startRow + 1, endColumn - startColumn + 1);
    this.startRow = startRow;
    this.startColumn = startColumn;
  }

  set(rowIndex, columnIndex, value) {
    this.matrix.set(
      this.startRow + rowIndex,
      this.startColumn + columnIndex,
      value,
    );
    return this;
  }

  get(rowIndex, columnIndex) {
    return this.matrix.get(
      this.startRow + rowIndex,
      this.startColumn + columnIndex,
    );
  }
}


/***/ }),

/***/ "./node_modules/ml-matrix/src/views/transpose.js":
/*!*******************************************************!*\
  !*** ./node_modules/ml-matrix/src/views/transpose.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MatrixTransposeView; });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ "./node_modules/ml-matrix/src/views/base.js");


class MatrixTransposeView extends _base__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(matrix) {
    super(matrix, matrix.columns, matrix.rows);
  }

  set(rowIndex, columnIndex, value) {
    this.matrix.set(columnIndex, rowIndex, value);
    return this;
  }

  get(rowIndex, columnIndex) {
    return this.matrix.get(columnIndex, rowIndex);
  }
}


/***/ }),

/***/ "./node_modules/ml-matrix/src/wrap/WrapperMatrix1D.js":
/*!************************************************************!*\
  !*** ./node_modules/ml-matrix/src/wrap/WrapperMatrix1D.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WrapperMatrix1D; });
/* harmony import */ var _matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../matrix */ "./node_modules/ml-matrix/src/matrix.js");


class WrapperMatrix1D extends _matrix__WEBPACK_IMPORTED_MODULE_0__["AbstractMatrix"] {
  constructor(data, options = {}) {
    const { rows = 1 } = options;

    if (data.length % rows !== 0) {
      throw new Error('the data length is not divisible by the number of rows');
    }
    super();
    this.rows = rows;
    this.columns = data.length / rows;
    this.data = data;
  }

  set(rowIndex, columnIndex, value) {
    let index = this._calculateIndex(rowIndex, columnIndex);
    this.data[index] = value;
    return this;
  }

  get(rowIndex, columnIndex) {
    let index = this._calculateIndex(rowIndex, columnIndex);
    return this.data[index];
  }

  _calculateIndex(row, column) {
    return row * this.columns + column;
  }
}


/***/ }),

/***/ "./node_modules/ml-matrix/src/wrap/WrapperMatrix2D.js":
/*!************************************************************!*\
  !*** ./node_modules/ml-matrix/src/wrap/WrapperMatrix2D.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WrapperMatrix2D; });
/* harmony import */ var _matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../matrix */ "./node_modules/ml-matrix/src/matrix.js");


class WrapperMatrix2D extends _matrix__WEBPACK_IMPORTED_MODULE_0__["AbstractMatrix"] {
  constructor(data) {
    super();
    this.data = data;
    this.rows = data.length;
    this.columns = data[0].length;
  }

  set(rowIndex, columnIndex, value) {
    this.data[rowIndex][columnIndex] = value;
    return this;
  }

  get(rowIndex, columnIndex) {
    return this.data[rowIndex][columnIndex];
  }
}


/***/ }),

/***/ "./node_modules/ml-matrix/src/wrap/wrap.js":
/*!*************************************************!*\
  !*** ./node_modules/ml-matrix/src/wrap/wrap.js ***!
  \*************************************************/
/*! exports provided: wrap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrap", function() { return wrap; });
/* harmony import */ var _WrapperMatrix1D__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WrapperMatrix1D */ "./node_modules/ml-matrix/src/wrap/WrapperMatrix1D.js");
/* harmony import */ var _WrapperMatrix2D__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WrapperMatrix2D */ "./node_modules/ml-matrix/src/wrap/WrapperMatrix2D.js");



function wrap(array, options) {
  if (Array.isArray(array)) {
    if (array[0] && Array.isArray(array[0])) {
      return new _WrapperMatrix2D__WEBPACK_IMPORTED_MODULE_1__["default"](array);
    } else {
      return new _WrapperMatrix1D__WEBPACK_IMPORTED_MODULE_0__["default"](array, options);
    }
  } else {
    throw new Error('the argument is not an array');
  }
}


/***/ }),

/***/ "./node_modules/tinyqueue/index.js":
/*!*****************************************!*\
  !*** ./node_modules/tinyqueue/index.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TinyQueue; });

class TinyQueue {
    constructor(data = [], compare = defaultCompare) {
        this.data = data;
        this.length = this.data.length;
        this.compare = compare;

        if (this.length > 0) {
            for (let i = (this.length >> 1) - 1; i >= 0; i--) this._down(i);
        }
    }

    push(item) {
        this.data.push(item);
        this.length++;
        this._up(this.length - 1);
    }

    pop() {
        if (this.length === 0) return undefined;

        const top = this.data[0];
        const bottom = this.data.pop();
        this.length--;

        if (this.length > 0) {
            this.data[0] = bottom;
            this._down(0);
        }

        return top;
    }

    peek() {
        return this.data[0];
    }

    _up(pos) {
        const {data, compare} = this;
        const item = data[pos];

        while (pos > 0) {
            const parent = (pos - 1) >> 1;
            const current = data[parent];
            if (compare(item, current) >= 0) break;
            data[pos] = current;
            pos = parent;
        }

        data[pos] = item;
    }

    _down(pos) {
        const {data, compare} = this;
        const halfLength = this.length >> 1;
        const item = data[pos];

        while (pos < halfLength) {
            let left = (pos << 1) + 1;
            let best = data[left];
            const right = left + 1;

            if (right < this.length && compare(data[right], best) < 0) {
                left = right;
                best = data[right];
            }
            if (compare(best, item) >= 0) break;

            data[pos] = best;
            pos = left;
        }

        data[pos] = item;
    }
}

function defaultCompare(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
}


/***/ }),

/***/ "./src/controller.worker.js":
/*!**********************************!*\
  !*** ./src/controller.worker.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const {Matcher} = __webpack_require__(/*! ./image-target/matching/matcher.js */ "./src/image-target/matching/matcher.js");
const {refineHomography} = __webpack_require__(/*! ./image-target/icp/refine_homography.js */ "./src/image-target/icp/refine_homography.js");
const {estimateHomography} = __webpack_require__(/*! ./image-target/icp/estimate_homography.js */ "./src/image-target/icp/estimate_homography.js");

const AR2_TRACKING_THRESH = 5.0; // default


let projectionTransform = null;
let matchingDataList = null;
let matcher = null;

onmessage = (msg) => {
  const {data} = msg;

  if (data.type === 'setup') {
    projectionTransform = data.projectionTransform;
    matchingDataList = data.matchingDataList;
    matcher = new Matcher(data.inputWidth, data.inputHeight);
  }

  else if (data.type === 'match') {
    const skipTargetIndexes = data.skipTargetIndexes;

    let matchedTargetIndex = -1;
    let matchedModelViewTransform = null;

    for (let i = 0; i < matchingDataList.length; i++) {
      if (skipTargetIndexes.includes(i)) continue;

      const matchResult = matcher.matchDetection(matchingDataList[i], data.featurePoints);
      if (matchResult === null) continue;

      const {screenCoords, worldCoords} = matchResult;
      const modelViewTransform = estimateHomography({screenCoords, worldCoords, projectionTransform});
      if (modelViewTransform === null) continue;

      matchedTargetIndex = i;
      matchedModelViewTransform = modelViewTransform;
      break;
    }

    postMessage({
      type: 'matchDone',
      targetIndex: matchedTargetIndex,
      modelViewTransform: matchedModelViewTransform,
    });
  }
  else if (data.type === 'track') {
    const {modelViewTransform, selectedFeatures} = data;

    const inlierProbs = [1.0, 0.8, 0.6, 0.4, 0.0];
    let err = null;
    let newModelViewTransform = modelViewTransform;
    let finalModelViewTransform = null;
    for (let i = 0; i < inlierProbs.length; i++) {
      let ret = _computeUpdatedTran({modelViewTransform: newModelViewTransform, selectedFeatures, projectionTransform, inlierProb: inlierProbs[i]});
      err = ret.err;
      newModelViewTransform = ret.newModelViewTransform;
      //console.log("_computeUpdatedTran", err)

      if (err < AR2_TRACKING_THRESH) {
        finalModelViewTransform = newModelViewTransform;
        break;
      }
    }

    postMessage({
      type: 'trackDone',
      modelViewTransform: finalModelViewTransform,
    });
  }
};

const _computeUpdatedTran = ({modelViewTransform, projectionTransform, selectedFeatures, inlierProb}) => {
  let dx = 0;
  let dy = 0;
  let dz = 0;
  for (let i = 0; i < selectedFeatures.length; i++) {
    dx += selectedFeatures[i].pos3D.x;
    dy += selectedFeatures[i].pos3D.y;
    dz += selectedFeatures[i].pos3D.z;
  }
  dx /= selectedFeatures.length;
  dy /= selectedFeatures.length;
  dz /= selectedFeatures.length;

  const worldCoords = [];
  const screenCoords = [];
  for (let i = 0; i < selectedFeatures.length; i++) {
    screenCoords.push({x: selectedFeatures[i].pos2D.x, y: selectedFeatures[i].pos2D.y});
    worldCoords.push({x: selectedFeatures[i].pos3D.x - dx, y: selectedFeatures[i].pos3D.y - dy, z: selectedFeatures[i].pos3D.z - dz});
  }

  const diffModelViewTransform = [[],[],[]];
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      diffModelViewTransform[j][i] = modelViewTransform[j][i];
    }
  }
  diffModelViewTransform[0][3] = modelViewTransform[0][0] * dx + modelViewTransform[0][1] * dy + modelViewTransform[0][2] * dz + modelViewTransform[0][3];
  diffModelViewTransform[1][3] = modelViewTransform[1][0] * dx + modelViewTransform[1][1] * dy + modelViewTransform[1][2] * dz + modelViewTransform[1][3];
  diffModelViewTransform[2][3] = modelViewTransform[2][0] * dx + modelViewTransform[2][1] * dy + modelViewTransform[2][2] * dz + modelViewTransform[2][3];

  let ret;
  if (inlierProb < 1) {
     ret = refineHomography({initialModelViewTransform: diffModelViewTransform, projectionTransform, worldCoords, screenCoords, isRobustMode: true, inlierProb});
  } else {
     ret = refineHomography({initialModelViewTransform: diffModelViewTransform, projectionTransform, worldCoords, screenCoords, isRobustMode: false});
  }

  const newModelViewTransform = [[],[],[]];
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      newModelViewTransform[j][i] = ret.modelViewTransform[j][i];
    }
  }
  newModelViewTransform[0][3] = ret.modelViewTransform[0][3] - ret.modelViewTransform[0][0] * dx - ret.modelViewTransform[0][1] * dy - ret.modelViewTransform[0][2] * dz;
  newModelViewTransform[1][3] = ret.modelViewTransform[1][3] - ret.modelViewTransform[1][0] * dx - ret.modelViewTransform[1][1] * dy - ret.modelViewTransform[1][2] * dz;
  newModelViewTransform[2][3] = ret.modelViewTransform[2][3] - ret.modelViewTransform[2][0] * dx - ret.modelViewTransform[2][1] * dy - ret.modelViewTransform[2][2] * dz;


  return {err: ret.err, newModelViewTransform};
};


/***/ }),

/***/ "./src/image-target/icp/estimate_homography.js":
/*!*****************************************************!*\
  !*** ./src/image-target/icp/estimate_homography.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const {Matrix, inverse} = __webpack_require__(/*! ml-matrix */ "./node_modules/ml-matrix/src/index.js");

// build world matrix with list of matching worldCoords|screenCoords
//
// Step 1. estimate homography with list of pairs
// Ref: https://www.uio.no/studier/emner/matnat/its/TEK5030/v19/lect/lecture_4_3-estimating-homographies-from-feature-correspondences.pdf  (Basic homography estimation from points)
//
// Step 2. decompose homography into rotation and translation matrixes (i.e. world matrix)
// Ref: can anyone provide reference?
const estimateHomography = ({screenCoords, worldCoords, projectionTransform}) => {
  const num = screenCoords.length;
  const AData = [];
  const BData = [];
  for (let j = 0; j < num; j++) {
    const row1 = [
      worldCoords[j].x,
      worldCoords[j].y,
      1,
      0,
      0,
      0,
      -(worldCoords[j].x * screenCoords[j].x),
      -(worldCoords[j].y * screenCoords[j].x),
    ];
    const row2 = [
      0,
      0,
      0,
      worldCoords[j].x,
      worldCoords[j].y,
      1,
      -(worldCoords[j].x * screenCoords[j].y),
      -(worldCoords[j].y * screenCoords[j].y),
    ];
    AData.push(row1);
    AData.push(row2);

    BData.push([screenCoords[j].x]);
    BData.push([screenCoords[j].y]);
  }

  const A = new Matrix(AData);
  const B = new Matrix(BData);
  const AT = A.transpose();
  const ATA = AT.mmul(A);
  const ATB = AT.mmul(B);
  const ATAInv = inverse(ATA);
  const C = ATAInv.mmul(ATB).to1DArray();

  const H = new Matrix([
    [C[0], C[1], C[2]],
    [C[3], C[4], C[5]],
    [C[6], C[7], 1]
  ]);

  const K = new Matrix(projectionTransform);
  const KInv = inverse(K);

  const _KInvH = KInv.mmul(H);
  const KInvH = _KInvH.to1DArray();

  const norm1 = Math.sqrt( KInvH[0] * KInvH[0] + KInvH[3] * KInvH[3] + KInvH[6] * KInvH[6]);
  const norm2 = Math.sqrt( KInvH[1] * KInvH[1] + KInvH[4] * KInvH[4] + KInvH[7] * KInvH[7]);
  const tnorm = (norm1 + norm2) / 2;

  const rotate = [];
  rotate[0] = KInvH[0] / norm1;
  rotate[3] = KInvH[3] / norm1;
  rotate[6] = KInvH[6] / norm1;

  rotate[1] = KInvH[1] / norm2;
  rotate[4] = KInvH[4] / norm2;
  rotate[7] = KInvH[7] / norm2;

  rotate[2] = rotate[3] * rotate[7] - rotate[6] * rotate[4];
  rotate[5] = rotate[6] * rotate[1] - rotate[0] * rotate[7];
  rotate[8] = rotate[0] * rotate[4] - rotate[1] * rotate[3];

  const norm3 = Math.sqrt(rotate[2] * rotate[2] + rotate[5] * rotate[5] + rotate[8] * rotate[8]);
  rotate[2] /= norm3;
  rotate[5] /= norm3;
  rotate[8] /= norm3;

  // TODO: artoolkit has check_rotation() that somehow switch the rotate vector. not sure what that does. Can anyone advice?
  // https://github.com/artoolkitx/artoolkit5/blob/5bf0b671ff16ead527b9b892e6aeb1a2771f97be/lib/SRC/ARICP/icpUtil.c#L215

  const tran = []
  tran[0] = KInvH[2] / tnorm;
  tran[1] = KInvH[5] / tnorm;
  tran[2] = KInvH[8] / tnorm;

  let initialModelViewTransform = [
    [rotate[0], rotate[1], rotate[2], tran[0]],
    [rotate[3], rotate[4], rotate[5], tran[1]],
    [rotate[6], rotate[7], rotate[8], tran[2]]
  ];

  return initialModelViewTransform;
};

module.exports = {
  estimateHomography
}


/***/ }),

/***/ "./src/image-target/icp/refine_homography.js":
/*!***************************************************!*\
  !*** ./src/image-target/icp/refine_homography.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const {Matrix, inverse} = __webpack_require__(/*! ml-matrix */ "./node_modules/ml-matrix/src/index.js");
const {applyModelViewProjectionTransform, buildModelViewProjectionTransform, computeScreenCoordiate} = __webpack_require__(/*! ./utils.js */ "./src/image-target/icp/utils.js");

// TODO: the error computation seems problematic. should it be relative to the size of detection?
//       now the values are hardcoded, e.g. K2_Factor = 4
const K2_FACTOR = 4.0;
const ICP_MAX_LOOP = 10;
const ICP_BREAK_LOOP_ERROR_THRESH = 0.1;
const ICP_BREAK_LOOP_ERROR_RATIO_THRESH = 0.99;
const ICP_BREAK_LOOP_ERROR_THRESH2 = 4.0;

// ICP iteration with points
// Can someone provide theoretical reference?
const refineHomography = ({initialModelViewTransform, projectionTransform, worldCoords, screenCoords, isRobustMode, inlierProb}) => {
  let modelViewTransform = initialModelViewTransform;

  let err0 = 0.0;
  let err1 = 0.0;
  for (let l = 0; l <= ICP_MAX_LOOP; l++) {

    const modelViewProjectionTransform = buildModelViewProjectionTransform(projectionTransform, modelViewTransform);

    const E = [];
    const dxs = [];
    const dys = [];
    for (let n = 0; n < worldCoords.length; n++) {
      const u = computeScreenCoordiate(modelViewProjectionTransform, worldCoords[n].x, worldCoords[n].y, worldCoords[n].z);
      const dx = screenCoords[n].x - u.x;
      const dy = screenCoords[n].y - u.y;
      dxs.push(dx);
      dys.push(dy);
      E.push(dx * dx + dy * dy);
    }

    let K2; // robust mode only
    err1 = 0.0;
    if (isRobustMode) {
      const inlierNum = Math.max(3, Math.floor(worldCoords.length * inlierProb) - 1);
      const E2 = []; // for robust mode only
      for (let n = 0; n < worldCoords.length; n++) {
        E2.push(E[n]);
      }
      E2.sort((a, b) => {return a-b;});


      K2 = Math.max(E2[inlierNum] * K2_FACTOR, 16.0);
      for (let n = 0; n < worldCoords.length; n++) {
        if (E2[n] > K2) err1 += K2/ 6;
        else err1 +=  K2/6.0 * (1.0 - (1.0-E2[n]/K2)*(1.0-E2[n]/K2)*(1.0-E2[n]/K2));
      }
    } else {
      for (let n = 0; n < worldCoords.length; n++) {
        err1 += E[n];
      }
    }
    err1 /= worldCoords.length;

    if (err1 < ICP_BREAK_LOOP_ERROR_THRESH) break;
    if (l > 0 && err1 < ICP_BREAK_LOOP_ERROR_THRESH2 && err1/err0 > ICP_BREAK_LOOP_ERROR_RATIO_THRESH) break;
    if (l === ICP_MAX_LOOP) break;

    err0 = err1;

    const dU = [];
    const allJ_U_S = [];
    for (let n = 0; n < worldCoords.length; n++) {
      if (isRobustMode && E[n] > K2) {
        continue;
      }

      const J_U_S = _getJ_U_S({modelViewProjectionTransform, modelViewTransform, projectionTransform, worldCoord: worldCoords[n]});

      if (isRobustMode) {
        const W = (1.0 - E[n]/K2)*(1.0 - E[n]/K2);

        for (let j = 0; j < 2; j++) {
          for (let i = 0; i < 6; i++) {
            J_U_S[j][i] *= W;
          }
        }
        dU.push([dxs[n] * W]);
        dU.push([dys[n] * W]);
      } else {
        dU.push([dxs[n]]);
        dU.push([dys[n]]);
      }

      for (let i = 0; i < J_U_S.length; i++) {
        allJ_U_S.push(J_U_S[i]);
      }
    }

    const dS = _getDeltaS({dU, J_U_S: allJ_U_S});
    if (dS === null) break;

    modelViewTransform = _updateModelViewTransform({modelViewTransform, dS});
  }
  return {modelViewTransform, err: err1};
}

_updateModelViewTransform = ({modelViewTransform, dS}) => {
  const q = [];
  let ra = dS[0] * dS[0] + dS[1] * dS[1] + dS[2] * dS[2];
  if( ra < 0.000001 ) {
    q[0] = 1.0;
    q[1] = 0.0;
    q[2] = 0.0;
    q[3] = 0.0;
  } else {
    ra = Math.sqrt(ra);
    q[0] = dS[0] / ra;
    q[1] = dS[1] / ra;
    q[2] = dS[2] / ra;
    q[3] = ra;
  }
  q[4] = dS[3];
  q[5] = dS[4];
  q[6] = dS[5];

  const cra = Math.cos(q[3]);
  const one_cra = 1.0 - cra;
  const sra = Math.sin(q[3]);
  const mat = [[],[],[]];

  mat[0][0] = q[0]*q[0]*one_cra + cra;
  mat[0][1] = q[0]*q[1]*one_cra - q[2]*sra;
  mat[0][2] = q[0]*q[2]*one_cra + q[1]*sra;
  mat[0][3] = q[4];
  mat[1][0] = q[1]*q[0]*one_cra + q[2]*sra;
  mat[1][1] = q[1]*q[1]*one_cra + cra;
  mat[1][2] = q[1]*q[2]*one_cra - q[0]*sra;
  mat[1][3] = q[5];
  mat[2][0] = q[2]*q[0]*one_cra - q[1]*sra;
  mat[2][1] = q[2]*q[1]*one_cra + q[0]*sra;
  mat[2][2] = q[2]*q[2]*one_cra + cra;
  mat[2][3] = q[6];

  const mat2 = [[],[],[]];
  for (let j = 0; j < 3; j++ ) {
    for (let i = 0; i < 4; i++ ) {
      mat2[j][i] = modelViewTransform[j][0] * mat[0][i]
                   + modelViewTransform[j][1] * mat[1][i]
                   + modelViewTransform[j][2] * mat[2][i];
    }
    mat2[j][3] += modelViewTransform[j][3];
  }
  return mat2;
}

_getDeltaS = ({dU, J_U_S}) => {
  const J = new Matrix(J_U_S);
  const U = new Matrix(dU);

  const JT = J.transpose();
  const JTJ = JT.mmul(J);
  const JTU = JT.mmul(U);

  let JTJInv;
  try {
    JTJInv = inverse(JTJ);
  } catch (e) {
    return null;
  }

  const S = JTJInv.mmul(JTU);
  return S.to1DArray();
}

_getJ_U_S = ({modelViewProjectionTransform, modelViewTransform, projectionTransform, worldCoord}) => {
  const T = modelViewTransform;
  const {x, y, z} = worldCoord;

  const u = applyModelViewProjectionTransform(modelViewProjectionTransform, x, y, z);

  const z2 = u.z * u.z;
  const J_U_Xc = [[],[]];
  J_U_Xc[0][0] = (projectionTransform[0][0] * u.z - projectionTransform[2][0] * u.x) / z2;
  J_U_Xc[0][1] = (projectionTransform[0][1] * u.z - projectionTransform[2][1] * u.x) / z2;
  J_U_Xc[0][2] = (projectionTransform[0][2] * u.z - projectionTransform[2][2] * u.x) / z2;
  J_U_Xc[1][0] = (projectionTransform[1][0] * u.z - projectionTransform[2][0] * u.y) / z2;
  J_U_Xc[1][1] = (projectionTransform[1][1] * u.z - projectionTransform[2][1] * u.y) / z2;
  J_U_Xc[1][2] = (projectionTransform[1][2] * u.z - projectionTransform[2][2] * u.y) / z2;

  const J_Xc_S = [
    [T[0][2] * y - T[0][1] * z, T[0][0] * z - T[0][2] * x, T[0][1] * x - T[0][0] * y, T[0][0], T[0][1], T[0][2]],
    [T[1][2] * y - T[1][1] * z, T[1][0] * z - T[1][2] * x, T[1][1] * x - T[1][0] * y, T[1][0], T[1][1], T[1][2]],
    [T[2][2] * y - T[2][1] * z, T[2][0] * z - T[2][2] * x, T[2][1] * x - T[2][0] * y, T[2][0], T[2][1], T[2][2]],
  ];

  const J_U_S = [[], []];
  for (let j = 0; j < 2; j++) {
    for (let i = 0; i < 6; i++) {
      J_U_S[j][i] = 0.0;
      for (let k = 0; k < 3; k++ ) {
        J_U_S[j][i] += J_U_Xc[j][k] * J_Xc_S[k][i];
      }
    }
  }
  return J_U_S;
}

module.exports = {
  refineHomography
}


/***/ }),

/***/ "./src/image-target/icp/utils.js":
/*!***************************************!*\
  !*** ./src/image-target/icp/utils.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

const buildModelViewProjectionTransform = (projectionTransform, modelViewTransform) => {
  const modelViewProjectionTransform = [[],[],[]];
  for (let j = 0; j < 3; j++ ) {
    for (let i = 0; i < 4; i++) {
      modelViewProjectionTransform[j][i] = projectionTransform[j][0] * modelViewTransform[0][i]
                                         + projectionTransform[j][1] * modelViewTransform[1][i]
                                         + projectionTransform[j][2] * modelViewTransform[2][i];
    }
  }
  return modelViewProjectionTransform;
}

const applyModelViewProjectionTransform = (modelViewProjectionTransform, x, y, z) => {
  const ux = modelViewProjectionTransform[0][0] * x + modelViewProjectionTransform[0][1] * y
     + modelViewProjectionTransform[0][2] * z + modelViewProjectionTransform[0][3];
  const uy = modelViewProjectionTransform[1][0] * x + modelViewProjectionTransform[1][1] * y
     + modelViewProjectionTransform[1][2] * z + modelViewProjectionTransform[1][3];
  const uz  = modelViewProjectionTransform[2][0] * x + modelViewProjectionTransform[2][1] * y
     + modelViewProjectionTransform[2][2] * z + modelViewProjectionTransform[2][3];
  return {x: ux, y: uy, z: uz};
}

const computeScreenCoordiate = (modelViewProjectionTransform, x, y, z) => {
  const {x: ux, y: uy, z: uz} = applyModelViewProjectionTransform(modelViewProjectionTransform, x, y, z);
  if( Math.abs(uz) < 0.000001 ) return null;
  return {x: ux/uz, y: uy/uz};
}

const screenToMarkerCoordinate = (modelViewProjectionTransform, sx, sy) => {
  const c11 = modelViewProjectionTransform[2][0] * sx - modelViewProjectionTransform[0][0];
  const c12 = modelViewProjectionTransform[2][1] * sx - modelViewProjectionTransform[0][1];
  const c21 = modelViewProjectionTransform[2][0] * sy - modelViewProjectionTransform[1][0];
  const c22 = modelViewProjectionTransform[2][1] * sy - modelViewProjectionTransform[1][1];
  const b1  = modelViewProjectionTransform[0][3] - modelViewProjectionTransform[2][3] * sx;
  const b2  = modelViewProjectionTransform[1][3] - modelViewProjectionTransform[2][3] * sy;

  const m = c11 * c22 - c12 * c21;
  return {
    x: (c22 * b1 - c12 * b2) / m,
    y: (c11 * b2 - c21 * b1) / m
  }
}

module.exports = {
  screenToMarkerCoordinate,
  buildModelViewProjectionTransform,
  applyModelViewProjectionTransform,
  computeScreenCoordiate
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

/***/ "./src/image-target/matching/homography.js":
/*!*************************************************!*\
  !*** ./src/image-target/matching/homography.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const {createRandomizer} = __webpack_require__(/*! ../utils/randomizer.js */ "./src/image-target/utils/randomizer.js");
const {quadrilateralConvex, matrixInverse33, smallestTriangleArea, multiplyPointHomographyInhomogenous, checkThreePointsConsistent, checkFourPointsConsistent, determinant} = __webpack_require__(/*! ../utils/geometry.js */ "./src/image-target/utils/geometry.js");

const EPSILON = 0.0000000000001;
const SQRT2 = 1.41421356237309504880;
const HOMOGRAPHY_DEFAULT_CAUCHY_SCALE = 0.01;
const HOMOGRAPHY_DEFAULT_NUM_HYPOTHESES = 1024;
const HOMOGRAPHY_DEFAULT_MAX_TRIALS = 1064;
const HOMOGRAPHY_DEFAULT_CHUNK_SIZE = 50;

// testPoints is four corners of keyframe
const computeHomography = (options) => {
  const {srcPoints, dstPoints, keyframe} = options;

  const testPoints = [
    [0, 0],
    [keyframe.width, 0],
    [keyframe.width, keyframe.height],
    [0, keyframe.height]
  ]

  const sampleSize = 4; // use four points to compute homography
  if (srcPoints.length < sampleSize) return null;

  const scale = HOMOGRAPHY_DEFAULT_CAUCHY_SCALE;
  const oneOverScale2 = 1.0 / (scale * scale);
  const chuckSize = Math.min(HOMOGRAPHY_DEFAULT_CHUNK_SIZE, srcPoints.length);

  const randomizer = createRandomizer();

  const perm = [];
  for (let i = 0; i < srcPoints.length; i++) {
    perm[i] = i;
  }

  randomizer.arrayShuffle({arr: perm, sampleSize: perm.length});

  // build numerous hypotheses by randoming draw four points
  // TODO: optimize: if number of points is less than certain number, can brute force all combinations
  let trial = 0;
  const Hs = [];
  while (trial < HOMOGRAPHY_DEFAULT_MAX_TRIALS && Hs.length < HOMOGRAPHY_DEFAULT_NUM_HYPOTHESES) {

    randomizer.arrayShuffle({arr: perm, sampleSize: sampleSize});

    trial +=1;

    if (!checkFourPointsConsistent(
      srcPoints[perm[0]], srcPoints[perm[1]], srcPoints[perm[2]], srcPoints[perm[3]],
      dstPoints[perm[0]], dstPoints[perm[1]], dstPoints[perm[2]], dstPoints[perm[3]])) {
      continue;
    }

    const H = _solveHomographyFourPoints({
      srcPoints: [srcPoints[perm[0]], srcPoints[perm[1]], srcPoints[perm[2]], srcPoints[perm[3]]],
      dstPoints: [dstPoints[perm[0]], dstPoints[perm[1]], dstPoints[perm[2]], dstPoints[perm[3]]],
    });

    if (H === null) continue;

    if(!_checkHomographyPointsGeometricallyConsistent({H, testPoints})) {
      continue;
    }

    Hs.push(H);
  }

  if (Hs.length === 0) return null;

  // pick the best hypothesis
  const hypotheses = [];
  for (let i = 0; i < Hs.length; i++) {
    hypotheses.push({
      H: Hs[i],
      cost: 0
    })
  }

  let curChuckSize = chuckSize;
  for (let i = 0; i < srcPoints.length && hypotheses.length > 2; i += curChuckSize) {
    curChuckSize = Math.min(chuckSize, srcPoints.length - i);
    let chuckEnd = i + curChuckSize;

    for (let j = 0; j < hypotheses.length; j++) {
      for (let k = i; k < chuckEnd; k++) {
        const cost = _cauchyProjectiveReprojectionCost({H: hypotheses[j].H, srcPoint: srcPoints[k], dstPoint: dstPoints[k], oneOverScale2});
        hypotheses[j].cost += cost;
      }
    }

    hypotheses.sort((h1, h2) => {return h1.cost - h2.cost});
    hypotheses.splice(-Math.floor((hypotheses.length+1)/2)); // keep the best half
  }

  let bestIndex = 0;
  for (let i = 1; i < hypotheses.length; i++) {
    if (hypotheses[i].cost < hypotheses[bestIndex].cost) bestIndex = i;
  }

  const finalH = _normalizeHomography({inH: hypotheses[bestIndex].H});

  if (!_checkHeuristics({H: finalH, testPoints, keyframe})) return null;
  return finalH;
}

const _checkHeuristics = ({H, testPoints, keyframe}) => {
  const HInv = matrixInverse33(H, 0.00001);
  // console.log("final H Inv: ", HInv);
  if (HInv === null) return false;

  const mp = []
  for (let i = 0; i < testPoints.length; i++) { // 4 test points, corner of keyframe
    mp.push(multiplyPointHomographyInhomogenous(testPoints[i], HInv));
  }
  const smallArea = smallestTriangleArea(mp[0], mp[1], mp[2], mp[3]);

  if (smallArea < keyframe.width * keyframe.height * 0.0001) return false;

  if (!quadrilateralConvex(mp[0], mp[1], mp[2], mp[3])) return false;

  return true;
}

const _normalizeHomography = ({inH}) => {
  const oneOver = 1.0 / inH[8];

  const H = [];
  for (let i = 0; i < 8; i++) {
    H[i] = inH[i] * oneOver;
  }
  H[8] = 1.0;
  return H;
}

const _cauchyProjectiveReprojectionCost = ({H, srcPoint, dstPoint, oneOverScale2}) => {
  const x = multiplyPointHomographyInhomogenous(srcPoint, H);
  const f =[
    x[0] - dstPoint[0],
    x[1] - dstPoint[1]
  ];
  return Math.log(1 + (f[0]*f[0]+f[1]*f[1]) * oneOverScale2);
}

const _checkHomographyPointsGeometricallyConsistent = ({H, testPoints}) => {
  const mappedPoints = [];
  for (let i = 0; i < testPoints.length; i++) {
    mappedPoints[i] = multiplyPointHomographyInhomogenous(testPoints[i], H);
    //console.log("map", testPoints[i], mappedPoints[i], H);
  }
  for (let i = 0; i < testPoints.length; i++) {
    const i1 = i;
    const i2 = (i+1) % testPoints.length;
    const i3 = (i+2) % testPoints.length;
    if (!checkThreePointsConsistent(
      testPoints[i1], testPoints[i2], testPoints[i3],
      mappedPoints[i1], mappedPoints[i2], mappedPoints[i3])) return false;
  }
  return true;
}

// Condition four 2D points such that the mean is zero and the standard deviation is sqrt(2).
const _condition4Points2d = ({x1, x2, x3, x4}) => {
  const mu = [];
  const d1 = [];
  const d2 = [];
  const d3 = [];
  const d4 = [];

  mu[0] = (x1[0]+x2[0]+x3[0]+x4[0])/4;
  mu[1] = (x1[1]+x2[1]+x3[1]+x4[1])/4;

  d1[0] = x1[0]-mu[0];
  d1[1] = x1[1]-mu[1];
  d2[0] = x2[0]-mu[0];
  d2[1] = x2[1]-mu[1];
  d3[0] = x3[0]-mu[0];
  d3[1] = x3[1]-mu[1];
  d4[0] = x4[0]-mu[0];
  d4[1] = x4[1]-mu[1];

  const ds1 = Math.sqrt(d1[0]*d1[0]+d1[1]*d1[1]);
  const ds2 = Math.sqrt(d2[0]*d2[0]+d2[1]*d2[1]);
  const ds3 = Math.sqrt(d3[0]*d3[0]+d3[1]*d3[1]);
  const ds4 = Math.sqrt(d4[0]*d4[0]+d4[1]*d4[1]);
  const d = (ds1+ds2+ds3+ds4)/4;

  if (d == 0) return null;

  const s = (1.0/d)*SQRT2;

  const xp1 = [];
  const xp2 = [];
  const xp3 = [];
  const xp4 = [];

  xp1[0] = d1[0]*s;
  xp1[1] = d1[1]*s;
  xp2[0] = d2[0]*s;
  xp2[1] = d2[1]*s;
  xp3[0] = d3[0]*s;
  xp3[1] = d3[1]*s;
  xp4[0] = d4[0]*s;
  xp4[1] = d4[1]*s;

  return {xp1, xp2, xp3, xp4, s, t: mu};
}

const _solveHomographyFourPoints = ({srcPoints, dstPoints}) => {
  if (typeof window !== 'undefined' && window.DEBUG_MATCH) {
    window.debug.homographyIndex += 1;
    const dHomography = window.debugMatch.querykeyframes[window.debug.querykeyframeIndex].homography[window.debug.homographyIndex];
    const {x1, x2, x3, x4, xp1, xp2, xp3, xp4} = dHomography;
    const l1 = [srcPoints[0],srcPoints[1],srcPoints[2],srcPoints[3],dstPoints[0],dstPoints[1],dstPoints[2],dstPoints[3]];
    const l2 = [x1, x2, x3, x4, xp1, xp2, xp3, xp4];
    for (let i = 0; i < l1.length; i++) {
      if (!window.cmp(l1[i][0], l2[i][0]) || !window.cmp(l1[i][1], l2[i][1])) {
        console.log('INCORRECT homography points', window.debug.homographyIndex, i, l1[i], l2[i]);
      }
    }
  }

  const res1 = _condition4Points2d({x1: srcPoints[0], x2: srcPoints[1], x3: srcPoints[2], x4: srcPoints[3]});

  if (res1 === null) return null;

  if (typeof window !== 'undefined' && window.DEBUG_MATCH) {
    const dHomography = window.debugMatch.querykeyframes[window.debug.querykeyframeIndex].homography[window.debug.homographyIndex];
    const {x1p, x2p, x3p, x4p, t, s} = dHomography;
    const l1 = [res1.xp1, res1.xp2, res1.xp3, res1.xp4, res1.t];
    const l2 = [x1p, x2p, x3p, x4p, t];
    for (let i = 0; i < l1.length; i++) {
      if (!window.cmp(l1[i][0], l2[i][0]) || !window.cmp(l1[i][1], l2[i][1])) {
        console.log('INCORRECT homography res1', window.debug.homographyIndex, i, l1[i], l2[i]);
      }
    }
    if (!window.cmp(res1.s, s)) {
      console.log('INCORRECT homography res1 S', window.debug.homographyIndex, res1.s, s);
    }
  }

  const res2 = _condition4Points2d({x1: dstPoints[0], x2: dstPoints[1], x3: dstPoints[2], x4: dstPoints[3]});
  if (res2 === null) return null;

  if (typeof window !== 'undefined' && window.DEBUG_MATCH) {
    const dHomography = window.debugMatch.querykeyframes[window.debug.querykeyframeIndex].homography[window.debug.homographyIndex];
    const {xp1p, xp2p, xp3p, xp4p, tp, sp} = dHomography;
    const l1 = [res2.xp1, res2.xp2, res2.xp3, res2.xp4, res2.t];
    const l2 = [xp1p, xp2p, xp3p, xp4p, tp];
    for (let i = 0; i < l1.length; i++) {
      if (!window.cmp(l1[i][0], l2[i][0]) || !window.cmp(l1[i][1], l2[i][1])) {
        console.log('INCORRECT homography res1', window.debug.homographyIndex, i, l1[i], l2[i]);
      }
    }
    if (!window.cmp(res2.s, sp)) {
      console.log('INCORRECT homography res1 S', window.debug.homographyIndex, i, res2.s, sp);
    }
  }

  const Hn = _solveHomography4PointsInhomogenous({
    x1: res1.xp1, x2: res1.xp2, x3: res1.xp3, x4: res1.xp4,
    xp1: res2.xp1, xp2: res2.xp2, xp3: res2.xp3, xp4: res2.xp4,
  });

  if (Hn === null) return null;

  if (Math.abs(determinant(Hn)) < 0.00001) return null;

  if (typeof window !== 'undefined' && window.DEBUG_MATCH) {
    const dHomography = window.debugMatch.querykeyframes[window.debug.querykeyframeIndex].homography[window.debug.homographyIndex];
    const dHn = dHomography.Hn;
    if (!window.cmpArray(Hn, dHn, 0.001)) {
      console.log("INCORRECT Hn", window.debug.querykeyframeIndex, window.debug.homographyIndex, Hn, dHn);
    }
    const dDetH = window.debugMatch.querykeyframes[window.debug.querykeyframeIndex].homography[window.debug.homographyIndex].detH;
    if (!window.cmp(determinant(Hn), dDetH)) {
      console.log("INCORRECT determinant", determinant(Hn), dDetH);
    }
  }

  const H = _denomalizeHomography({H: Hn, s: res1.s, t: res1.t, sp: res2.s, tp: res2.t});

  return H;
}

// denormalize homography
// Hp = inv(Tp)*H*T
const _denomalizeHomography = ({H, s, t, sp, tp}) => {
  const a = H[6]*tp[0];
  const b = H[7]*tp[0];
  const c = H[0]/sp;
  const d = H[1]/sp;
  const apc = a+c;
  const bpd = b+d;

  const e = H[6]*tp[1];
  const f = H[7]*tp[1];
  const g = H[3]/sp;
  const h = H[4]/sp;
  const epg = e+g;
  const fph = f+h;

  const stx = s*t[0];
  const sty = s*t[1];

  const Hp = [];
  Hp[0] = s*apc;
  Hp[1] = s*bpd;
  Hp[2] = H[8]*tp[0] + H[2]/sp - stx*apc - sty*bpd;

  Hp[3] = s*epg;
  Hp[4] = s*fph;
  Hp[5] = H[8]*tp[1] + H[5]/sp - stx*epg - sty*fph;

  Hp[6] = H[6]*s;
  Hp[7] = H[7]*s;
  Hp[8] = H[8] - Hp[6]*t[0] - Hp[7]*t[1];

  return Hp;
};

// can someone verify the implementation of this QR decomposition?
const _solveHomography4PointsInhomogenous = ({x1, x2, x3, x4, xp1, xp2, xp3, xp4}) => {
  const xList = [x1, x2, x3, x4];
  const xpList = [xp1, xp2, xp3, xp4];

  const A = []; // 8 x 9
  for (let i = 0; i < 4; i++) {
    const offset = i * 18;
    const x = xList[i];
    const xp = xpList[i];
    A[offset+0] = -x[0];
    A[offset+1] = -x[1];
    A[offset+2] = -1;
    A[offset+3] = 0;
    A[offset+4] = 0;
    A[offset+5] = 0;
    A[offset+6] = xp[0]*x[0];
    A[offset+7] = xp[0]*x[1];
    A[offset+8] = xp[0];
    A[offset+9] = 0;
    A[offset+10] = 0;
    A[offset+11] = 0;
    A[offset+12] = -x[0];
    A[offset+13] = -x[1];
    A[offset+14] = -1;
    A[offset+15] = xp[1]*x[0];
    A[offset+16] = xp[1]*x[1];
    A[offset+17] = xp[1];
  }

  if (typeof window !== 'undefined' && window.DEBUG_MATCH) {
    const dA = window.debugMatch.querykeyframes[window.debug.querykeyframeIndex].homography[window.debug.homographyIndex].A;
    if (!window.cmpArray(A, dA)) {
      console.log("INCORRECT A", window.debug.querykeyframeIndex, window.debug.homographyIndex, A, dA);
    }
  }

  const Q = [];
  for (let i = 0; i < 72; i++) {
    Q[i] = A[i];
  }

  // solve x for Ax=0 with QR decomposition with Gram-Schmidt
  for (let row = 0; row < 8; row++) {
    if (row > 0) {
      for (let j = row; j < 8; j++) {
        // project a vector "a" onto a normalized basis vector "e".
        // x = x - dot(a,e)*e

        let d = 0; // dot(a, e);
        for (let i = 0; i < 9; i++) {
          d += Q[(row-1) * 9 + i] * A[j * 9 + i];
        }

        for (let i = 0; i < 9; i++) {
          Q[j * 9 + i] -= d * Q[ (row-1) * 9 + i];
        }
      }
    }

    let maxValue = -1;
    let maxRow = -1;
    const ss = [];
    for (let j = row; j < 8; j++) {
      ss[j] = 0;
      for (let i = 0; i < 9; i++) {
        ss[j] += (Q[j*9+i] * Q[j*9+i]);
      }
      if (ss[j] > maxValue) {
        maxValue = ss[j];
        maxRow = j;
      }
    }
    if ( Math.abs(ss[maxRow]) < EPSILON) {
      return null; // no solution
    }

    // swap current row with maxindex row
    if (row !== maxRow) {
      for (let i = 0; i < 9; i++) {
        let tmp = A[row * 9 + i];
        A[row * 9 + i] = A[maxRow * 9 + i];
        A[maxRow * 9 + i] = tmp;

        let tmp2 = Q[row * 9 + i];
        Q[row * 9 + i] = Q[maxRow * 9 + i];
        Q[maxRow * 9 + i] = tmp2;
      }
    }

    for (let i = 0; i < 9; i++) {
      Q[row * 9 + i] = 1.0 * Q[row * 9 + i] / Math.sqrt(ss[maxRow]);
    }
  }

  if (typeof window !== 'undefined' && window.DEBUG_MATCH) {
    const dQ = window.debugMatch.querykeyframes[window.debug.querykeyframeIndex].homography[window.debug.homographyIndex].Q8;
    if (!window.cmpArray(Q, dQ, 0.001)) {
      console.log("INCORRECT Q8", window.debug.querykeyframeIndex, window.debug.homographyIndex, Q, dQ);
    }
  }

  // compute x from Q
  const w = [];
  const X = [];
  for (let row = 0; row < 9; row++) {
    for (let i = 0; i < 9; i++) {
      X[row * 9 + i] = (Q[i] * -Q[row]);
    }
    X[row * 9 + row] = 1 + X[row * 9 + row];

    for (let j = 1; j < 8; j++) {
      for(let i = 0; i < 9; i++) {
        X[row * 9 + i] += (Q[j * 9 + i] * -Q[j * 9 + row]);
      }
    }

    let ss = 0;
    for (let i = 0; i < 9; i++) {
      ss += (X[row * 9 + i] * X[row * 9 + i]);
    }
    if (Math.abs(ss) < EPSILON) {
      w[row] = 0;
      continue;
    }

    w[row] = Math.sqrt(ss);
    for (let i = 0; i < 9; i++) {
      X[row * 9 + i] = X[row * 9 + i] / w[row];
    }
  }

  if (typeof window !== 'undefined' && window.DEBUG_MATCH) {
    const dX = window.debugMatch.querykeyframes[window.debug.querykeyframeIndex].homography[window.debug.homographyIndex].X;
    const dw = window.debugMatch.querykeyframes[window.debug.querykeyframeIndex].homography[window.debug.homographyIndex].w;
    if (!window.cmpArray(X, dX, 0.01)) {
      console.log("INCORRECT X", window.debug.querykeyframeIndex, window.debug.homographyIndex, JSON.parse(JSON.stringify(X)), dX);
    }
    if (!window.cmpArray(w, dw, 0.01)) {
      console.log("INCORRECT w", window.debug.querykeyframeIndex, window.debug.homographyIndex, JSON.parse(JSON.stringify(w)), dw);
    }
  }

  let maxRow = -1;
  let maxValue = -1;
  for (let j = 0; j < 9; j++) {
    if (w[j] > maxValue) {
      maxRow = j;
      maxValue = w[j];
    }
  }


  if (maxValue == 0) return null; // no solution

  const x = [];
  for (let i = 0; i < 9; i++) {
    x[i] = X[maxRow * 9 + i];
  }

  return x;
}

module.exports = {
  computeHomography,
}



/***/ }),

/***/ "./src/image-target/matching/hough.js":
/*!********************************************!*\
  !*** ./src/image-target/matching/hough.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

const kHoughBinDelta = 1;

// mathces [querypointIndex:x, keypointIndex: x]
const computeHoughMatches = (options) => {
  const {keypoints, querypoints, keywidth, keyheight, querywidth, queryheight, matches} = options;

  const maxX = querywidth * 1.2;
  const minX = -maxX;
  const maxY = queryheight * 1.2;
  const minY = -maxY;
  const numAngleBins = 12;
  const numScaleBins = 10;
  const minScale = -1;
  const maxScale = 1;
  const scaleK = 10.0;
  const scaleOneOverLogK = 1.0 / Math.log(scaleK);
  const maxDim = Math.max(keywidth, keyheight);
  const keycenterX = Math.floor(keywidth / 2);
  const keycenterY = Math.floor(keyheight / 2);

  // compute numXBins and numYBins based on matches
  const projectedDims = [];
  for (let i = 0; i < matches.length; i++) {
    const queryscale = querypoints[matches[i].querypointIndex].scale;
    const keyscale = keypoints[matches[i].keypointIndex].scale;
    if (keyscale == 0) console.log("ERROR divide zero");
    const scale = queryscale / keyscale;
    projectedDims.push( scale * maxDim );
  }

  // TODO optimize median
  //   weird. median should be [Math.floor(projectedDims.length/2) - 1] ?
  projectedDims.sort((a1, a2) => {return a1 - a2});
  const medianProjectedDim = projectedDims[ Math.floor(projectedDims.length/2) - (projectedDims.length%2==0?1:0) -1 ];

  const binSize = 0.25 * medianProjectedDim;
  const numXBins = Math.max(5, Math.ceil((maxX - minX) / binSize));
  const numYBins = Math.max(5, Math.ceil((maxY - minY) / binSize));

  const numXYBins = numXBins * numYBins;
  const numXYAngleBins = numXYBins * numAngleBins;

  // do voting
  const querypointValids = [];
  const querypointBinLocations = [];
  const votes = {};
  for (let i = 0; i < matches.length; i++) {
    const querypoint = querypoints[matches[i].querypointIndex];
    const keypoint = keypoints[matches[i].keypointIndex];

    const {x, y, scale, angle} = _mapCorrespondence({querypoint, keypoint, keycenterX, keycenterY, scaleOneOverLogK});

    // Check that the vote is within range
    if (x < minX || x >= maxX || y < minY || y >= maxY || angle <= -Math.PI || angle > Math.PI || scale < minScale || scale >= maxScale) {
      querypointValids[i] = false;
      continue;
    }

    // map properties to bins
    let fbinX = numXBins * (x - minX) / (maxX - minX);
    let fbinY = numYBins * (y - minY) / (maxY - minY);
    let fbinAngle = numAngleBins * (angle + Math.PI) / (2.0 * Math.PI);
    let fbinScale = numScaleBins * (scale - minScale) / (maxScale - minScale);

    querypointBinLocations[i] = {binX: fbinX, binY: fbinY, binAngle: fbinAngle, binScale: fbinScale};

    let binX = Math.floor(fbinX - 0.5);
    let binY = Math.floor(fbinY - 0.5);
    let binScale = Math.floor(fbinScale - 0.5);
    let binAngle = (Math.floor(fbinAngle - 0.5) + numAngleBins) % numAngleBins;

    // check can vote all 16 bins
    if (binX < 0 || binX + 1 >= numXBins || binY < 0 || binY + 1 >= numYBins || binScale < 0 || binScale +1 >= numScaleBins) {
      querypointValids[i] = false;
      continue;
    }

    for (let dx = 0; dx < 2; dx++) {
      let binX2 = binX + dx;

      for (let dy = 0; dy < 2; dy++) {
        let binY2 = binY + dy;

        for (let dangle = 0; dangle < 2; dangle++) {
          let binAngle2 = (binAngle + dangle) % numAngleBins;

          for (let dscale = 0; dscale < 2; dscale++) {
            let binScale2 = binScale + dscale;

            const binIndex = binX2 + binY2 * numXBins + binAngle2 * numXYBins + binScale2 * numXYAngleBins;

            if (votes[binIndex] === undefined) votes[binIndex] = 0;
            votes[binIndex] += 1;
          }
        }
      }
    }
    querypointValids[i] = true;
  }

  let maxVotes = 0;
  let maxVoteIndex = -1;
  Object.keys(votes).forEach((index) => {
    if (votes[index] > maxVotes) {
      maxVotes = votes[index];
      maxVoteIndex = index;
    }
  });

  if (maxVotes < 3) return [];

  // get back bins from vote index
  const binX = Math.floor(((maxVoteIndex % numXYAngleBins) % numXYBins) % numXBins);
  const binY = Math.floor((((maxVoteIndex - binX) % numXYAngleBins) % numXYBins) / numXBins);
  const binAngle = Math.floor(((maxVoteIndex - binX - (binY * numXBins)) % numXYAngleBins) / numXYBins);
  const binScale = Math.floor((maxVoteIndex - binX - (binY * numXBins) - (binAngle * numXYBins)) / numXYAngleBins);

  //console.log("hough voted: ", {binX, binY, binAngle, binScale, maxVoteIndex});

  const houghMatches = [];
  for (let i = 0; i < matches.length; i++) {
    if (!querypointValids[i]) continue;

    const queryBins = querypointBinLocations[i];
    // compute bin difference
    const distBinX = Math.abs(queryBins.binX - (binX+0.5));
    if (distBinX >= kHoughBinDelta) continue;

    const distBinY = Math.abs(queryBins.binY - (binY+0.5));
    if (distBinY >= kHoughBinDelta) continue;

    const distBinScale = Math.abs(queryBins.binScale - (binScale+0.5));
    if (distBinScale >= kHoughBinDelta) continue;

    const temp = Math.abs(queryBins.binAngle - (binAngle+0.5));
    const distBinAngle = Math.min(temp, numAngleBins - temp);
    if (distBinAngle >= kHoughBinDelta) continue;

    houghMatches.push(matches[i]);
  }
  return houghMatches;
}

const _mapCorrespondence = ({querypoint, keypoint, keycenterX, keycenterY, scaleOneOverLogK}) => {
  // map angle to (-pi, pi]
  let angle = querypoint.angle - keypoint.angle;
  if (angle <= -Math.PI) angle += 2*Math.PI;
  else if (angle > Math.PI) angle -= 2*Math.PI;

  const scale = querypoint.scale / keypoint.scale;

  // 2x2 similarity
  const cos = scale * Math.cos(angle);
  const sin = scale * Math.sin(angle);
  const S = [cos, -sin, sin, cos];

  const tp = [
    S[0] * keypoint.x2D + S[1] * keypoint.y2D,
    S[2] * keypoint.x2D + S[3] * keypoint.y2D
  ];
  const tx = querypoint.x2D - tp[0];
  const ty = querypoint.y2D - tp[1];

  return {
    x: S[0] * keycenterX + S[1] * keycenterY + tx,
    y: S[2] * keycenterX + S[3] * keycenterY + ty,
    angle: angle,
    scale: Math.log(scale) * scaleOneOverLogK
  }
}

module.exports = {
  computeHoughMatches
}



/***/ }),

/***/ "./src/image-target/matching/matcher.js":
/*!**********************************************!*\
  !*** ./src/image-target/matching/matcher.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const {match} = __webpack_require__(/*! ./matching */ "./src/image-target/matching/matching.js");

class Matcher {
  constructor(queryWidth, queryHeight) {
    this.queryWidth = queryWidth;
    this.queryHeight = queryHeight;
  }

  matchDetection(keyframes, featurePoints) {
    const result = match({keyframes: keyframes, querypoints: featurePoints, querywidth: this.queryWidth, queryheight: this.queryHeight});
    if (result === null) return null;

    const screenCoords = [];
    const worldCoords = [];
    const keyframe = keyframes[result.keyframeIndex];

    for (let i = 0; i < result.matches.length; i++) {
      const querypointIndex = result.matches[i].querypointIndex;
      const keypointIndex = result.matches[i].keypointIndex;
      screenCoords.push({
        x: featurePoints[querypointIndex].x,
        y: featurePoints[querypointIndex].y,
      })
      worldCoords.push({
        x: (keyframe.points[keypointIndex].x + 0.5) / keyframe.scale,
        y: ((keyframe.height-0.5) -keyframe.points[keypointIndex].y) / keyframe.scale,
        z: 0,
      })
    }

    return {screenCoords, worldCoords, keyframeIndex: result.keyframeIndex};
  }
}

module.exports = {
  Matcher
}


/***/ }),

/***/ "./src/image-target/matching/matching.js":
/*!***********************************************!*\
  !*** ./src/image-target/matching/matching.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const TinyQueue = __webpack_require__(/*! tinyqueue */ "./node_modules/tinyqueue/index.js").default;
const {compute: hammingCompute} = __webpack_require__(/*! ./hamming-distance.js */ "./src/image-target/matching/hamming-distance.js");
const {computeHoughMatches} = __webpack_require__(/*! ./hough.js */ "./src/image-target/matching/hough.js");
const {computeHomography} = __webpack_require__(/*! ./homography.js */ "./src/image-target/matching/homography.js");
const {multiplyPointHomographyInhomogenous, matrixInverse33} = __webpack_require__(/*! ../utils/geometry.js */ "./src/image-target/utils/geometry.js");

const INLIER_THRESHOLD = 3;
//const MIN_NUM_INLIERS = 8;  //default
const MIN_NUM_INLIERS = 6;
const CLUSTER_MAX_POP = 8;
const HAMMING_THRESHOLD = 0.7;

// match list of querpoints against pre-built list of keyframes
const match = ({keyframes, querypoints, querywidth, queryheight}) => {
  let result = null;

  for (let i = 0; i < keyframes.length; i++) {
    const keyframe = keyframes[i];
    const keypoints = keyframe.points;

    const matches = [];
    for (let j = 0; j < querypoints.length; j++) {
      const rootNode = keyframe.pointsCluster.rootNode;
      const querypoint = querypoints[j];
      const keypointIndexes = [];
      const queue = new TinyQueue([], (a1, a2) => {return a1.d - a2.d});

      _query({node: rootNode, keypoints, querypoint, queue, keypointIndexes, numPop: 0});

      let bestIndex = -1;
      let bestD1 = Number.MAX_SAFE_INTEGER;
      let bestD2 = Number.MAX_SAFE_INTEGER;

      for (let k = 0; k < keypointIndexes.length; k++) {
        const keypoint = keypoints[keypointIndexes[k]];
        if (keypoint.maxima != querypoint.maxima) continue;

        const d = hammingCompute({v1: keypoint.descriptors, v2: querypoint.descriptors});
        if (d < bestD1) {
          bestD2 = bestD1;
          bestD1 = d;
          bestIndex = keypointIndexes[k];
        } else if (d < bestD2) {
          bestD2 = d;
        }
      }
      if (bestIndex !== -1 && (bestD2 === Number.MAX_SAFE_INTEGER || (1.0 * bestD1 / bestD2) < HAMMING_THRESHOLD)) {
        matches.push({querypointIndex: j, keypointIndex: bestIndex});
      }
    }

    if (matches.length < MIN_NUM_INLIERS) {
      continue;
    }

    const houghMatches = computeHoughMatches({
      keypoints: keyframe.points,
      querypoints,
      keywidth: keyframe.width,
      keyheight: keyframe.height,
      querywidth,
      queryheight,
      matches,
    });

    const srcPoints = [];
    const dstPoints = [];
    for (let i = 0; i < houghMatches.length; i++) {
      const querypoint = querypoints[houghMatches[i].querypointIndex];
      const keypoint = keypoints[houghMatches[i].keypointIndex];
      srcPoints.push([ keypoint.x, keypoint.y ]);
      dstPoints.push([ querypoint.x, querypoint.y ]);
    }

    const H = computeHomography({
      srcPoints,
      dstPoints,
      keyframe,
    });

    if (H === null) continue;

    const inlierMatches = _findInlierMatches({
      querypoints,
      keypoints: keyframe.points,
      H,
      matches: houghMatches,
      threshold: INLIER_THRESHOLD
    });


    if (inlierMatches.length < MIN_NUM_INLIERS) {
      continue;
    }

    // do another loop of match using the homography
    const HInv = matrixInverse33(H, 0.00001);
    const dThreshold2 = 10 * 10;
    const matches2 = [];
    for (let j = 0; j < querypoints.length; j++) {
      const querypoint = querypoints[j];
      const mapquerypoint = multiplyPointHomographyInhomogenous([querypoint.x, querypoint.y], HInv);

      let bestIndex = -1;
      let bestD1 = Number.MAX_SAFE_INTEGER;
      let bestD2 = Number.MAX_SAFE_INTEGER;

      for (let k = 0; k < keypoints.length; k++) {
        const keypoint = keypoints[k];
        if (keypoint.maxima != querypoint.maxima) continue;

        // check distance threshold
        const d2 = (keypoint.x - mapquerypoint[0]) * (keypoint.x - mapquerypoint[0])
                  + (keypoint.y - mapquerypoint[1]) * (keypoint.y - mapquerypoint[1]);
        if (d2 > dThreshold2) continue;

        const d = hammingCompute({v1: keypoint.descriptors, v2: querypoint.descriptors});
        if (d < bestD1) {
          bestD2 = bestD1;
          bestD1 = d;
          bestIndex = k;
        } else if (d < bestD2) {
          bestD2 = d;
        }
      }

      if (bestIndex !== -1 && (bestD2 === Number.MAX_SAFE_INTEGER || (1.0 * bestD1 / bestD2) < HAMMING_THRESHOLD)) {
        matches2.push({querypointIndex: j, keypointIndex: bestIndex});
      }
    }

    const houghMatches2 = computeHoughMatches({
      keypoints: keyframe.points,
      querypoints,
      keywidth: keyframe.width,
      keyheight: keyframe.height,
      querywidth,
      queryheight,
      matches: matches2,
    });

    const srcPoints2 = [];
    const dstPoints2 = [];
    for (let i = 0; i < houghMatches2.length; i++) {
      const querypoint = querypoints[houghMatches2[i].querypointIndex];
      const keypoint = keypoints[houghMatches2[i].keypointIndex];
      srcPoints2.push([ keypoint.x, keypoint.y ]);
      dstPoints2.push([ querypoint.x, querypoint.y ]);
    }

    const H2 = computeHomography({
      srcPoints: srcPoints2,
      dstPoints: dstPoints2,
      keyframe
    });

    if (H2 === null) continue;

    const inlierMatches2 = _findInlierMatches({
      querypoints,
      keypoints: keyframe.points,
      H: H2,
      matches: houghMatches2,
      threshold: INLIER_THRESHOLD
    });

    if (inlierMatches2.length < MIN_NUM_INLIERS) {
      continue;
    }

    if (result === null || result.matches.length < inlierMatches2.length) {
      result = {
        keyframeIndex: i,
        matches: inlierMatches2,
        H: H2,
      }
    }
  }

  return result;
};

const _query = ({node, keypoints, querypoint, queue, keypointIndexes, numPop}) => {
  if (node.leaf) {
    for (let i = 0; i < node.pointIndexes.length; i++) {
      keypointIndexes.push(node.pointIndexes[i]);
    }
    return;
  }

  const distances = [];
  for (let i = 0; i < node.children.length; i++) {
    const childNode = node.children[i];
    const centerPointIndex = childNode.centerPointIndex;
    const d = hammingCompute({v1: keypoints[centerPointIndex].descriptors, v2: querypoint.descriptors});
    distances.push(d);
  }

  let minD = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < node.children.length; i++) {
    minD = Math.min(minD, distances[i]);
  }

  for (let i = 0; i < node.children.length; i++) {
    if (distances[i] !== minD) {
      queue.push({node: node.children[i], d: distances[i]});
    }
  }
  for (let i = 0; i < node.children.length; i++) {
    if (distances[i] === minD) {
      _query({node: node.children[i], keypoints, querypoint, queue, keypointIndexes, numPop});
    }
  }

  if (numPop < CLUSTER_MAX_POP && queue.length > 0) {
    const {node, d} = queue.pop();
    numPop += 1;
    _query({node, keypoints, querypoint, queue, keypointIndexes, numPop});
  }
};

const _findInlierMatches = (options) => {
  const {keypoints, querypoints, H, matches, threshold} = options;

  const threshold2 = threshold * threshold;

  const goodMatches = [];
  for (let i = 0; i < matches.length; i++) {
    const querypoint = querypoints[matches[i].querypointIndex];
    const keypoint = keypoints[matches[i].keypointIndex];
    const mp = multiplyPointHomographyInhomogenous([keypoint.x, keypoint.y], H);
    const d2 = (mp[0] - querypoint.x) * (mp[0] - querypoint.x) + (mp[1] - querypoint.y) * (mp[1] - querypoint.y);
    if (d2 <= threshold2) {
      goodMatches.push( matches[i] );
    }
  }
  return goodMatches;
}

module.exports = {
  match
}


/***/ }),

/***/ "./src/image-target/utils/geometry.js":
/*!********************************************!*\
  !*** ./src/image-target/utils/geometry.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// check which side point C on the line from A to B
const linePointSide = (A, B, C) => {
  return ((B[0]-A[0])*(C[1]-A[1])-(B[1]-A[1])*(C[0]-A[0]));
}

// srcPoints, dstPoints: array of four elements [x, y]
const checkFourPointsConsistent = (x1, x2, x3, x4, x1p, x2p, x3p, x4p) => {
  if ((linePointSide(x1, x2, x3) > 0) !== (linePointSide(x1p, x2p, x3p) > 0)) return false;
  if ((linePointSide(x2, x3, x4) > 0) !== (linePointSide(x2p, x3p, x4p) > 0)) return false;
  if ((linePointSide(x3, x4, x1) > 0) !== (linePointSide(x3p, x4p, x1p) > 0)) return false;
  if ((linePointSide(x4, x1, x2) > 0) !== (linePointSide(x4p, x1p, x2p) > 0)) return false;
  return true;
}

const checkThreePointsConsistent = (x1, x2, x3, x1p, x2p, x3p) => {
  if ((linePointSide(x1, x2, x3) > 0) !== (linePointSide(x1p, x2p, x3p) > 0)) return false;
  return true;
}

const determinant = (A) => {
  const C1 =  A[4] * A[8] - A[5] * A[7];
  const C2 =  A[3] * A[8] - A[5] * A[6];
  const C3 =  A[3] * A[7] - A[4] * A[6];
  return A[0] * C1 - A[1] * C2 + A[2] * C3;
}

const matrixInverse33 = (A, threshold) => {
  const det = determinant(A);
  if (Math.abs(det) <= threshold) return null;
  const oneOver = 1.0 / det;

  const B = [
    (A[4] * A[8] - A[5] * A[7]) * oneOver,
    (A[2] * A[7] - A[1] * A[8]) * oneOver,
    (A[1] * A[5] - A[2] * A[4]) * oneOver,
    (A[5] * A[6] - A[3] * A[8]) * oneOver,
    (A[0] * A[8] - A[2] * A[6]) * oneOver,
    (A[2] * A[3] - A[0] * A[5]) * oneOver,
    (A[3] * A[7] - A[4] * A[6]) * oneOver,
    (A[1] * A[6] - A[0] * A[7]) * oneOver,
    (A[0] * A[4] - A[1] * A[3]) * oneOver,
  ];
  return B;
}

const matrixMul33 = (A, B) => {
  const C = [];
  C[0] = A[0]*B[0] + A[1]*B[3] + A[2]*B[6];
  C[1] = A[0]*B[1] + A[1]*B[4] + A[2]*B[7];
  C[2] = A[0]*B[2] + A[1]*B[5] + A[2]*B[8];
  C[3] = A[3]*B[0] + A[4]*B[3] + A[5]*B[6];
  C[4] = A[3]*B[1] + A[4]*B[4] + A[5]*B[7];
  C[5] = A[3]*B[2] + A[4]*B[5] + A[5]*B[8];
  C[6] = A[6]*B[0] + A[7]*B[3] + A[8]*B[6];
  C[7] = A[6]*B[1] + A[7]*B[4] + A[8]*B[7];
  C[8] = A[6]*B[2] + A[7]*B[5] + A[8]*B[8];
  return C;
}

const multiplyPointHomographyInhomogenous = (x, H) => {
  const w = H[6]*x[0] + H[7]*x[1] + H[8];
  const xp = [];
  xp[0] = (H[0]*x[0] + H[1]*x[1] + H[2])/w;
  xp[1] = (H[3]*x[0] + H[4]*x[1] + H[5])/w;
  return xp;
}

const smallestTriangleArea = (x1, x2, x3, x4) => {
  const v12 = _vector(x2, x1);
  const v13 = _vector(x3, x1);
  const v14 = _vector(x4, x1);
  const v32 = _vector(x2, x3);
  const v34 = _vector(x4, x3);
  const a1 = _areaOfTriangle(v12, v13);
  const a2 = _areaOfTriangle(v13, v14);
  const a3 = _areaOfTriangle(v12, v14);
  const a4 = _areaOfTriangle(v32, v34);
  return Math.min(Math.min(Math.min(a1, a2), a3), a4);
}

// check if four points form a convex quadrilaternal.
// all four combinations should have same sign
const quadrilateralConvex = (x1, x2, x3, x4) => {
  const first = linePointSide(x1, x2, x3) <= 0;
  if ( (linePointSide(x2, x3, x4) <= 0) !== first) return false;
  if ( (linePointSide(x3, x4, x1) <= 0) !== first) return false;
  if ( (linePointSide(x4, x1, x2) <= 0) !== first) return false;

  //if (linePointSide(x1, x2, x3) <= 0) return false;
  //if (linePointSide(x2, x3, x4) <= 0) return false;
  //if (linePointSide(x3, x4, x1) <= 0) return false;
  //if (linePointSide(x4, x1, x2) <= 0) return false;
  return true;
}

const _vector = (a, b) => {
  return [
    a[0] - b[0],
    a[1] - b[1]
  ]
}

const _areaOfTriangle = (u, v) => {
  const a = u[0]*v[1] - u[1]*v[0];
  return Math.abs(a) * 0.5;
}

module.exports = {
  matrixInverse33,
  matrixMul33,
  quadrilateralConvex,
  smallestTriangleArea,
  multiplyPointHomographyInhomogenous,
  checkThreePointsConsistent,
  checkFourPointsConsistent,
  determinant
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2lzLWFueS1hcnJheS9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21sLWFycmF5LW1heC9saWItZXM2L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tbC1hcnJheS1taW4vbGliLWVzNi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWwtYXJyYXktcmVzY2FsZS9saWItZXM2L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tbC1tYXRyaXgvc3JjL2NvcnJlbGF0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tbC1tYXRyaXgvc3JjL2NvdmFyaWFuY2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21sLW1hdHJpeC9zcmMvZGMvY2hvbGVza3kuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21sLW1hdHJpeC9zcmMvZGMvZXZkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tbC1tYXRyaXgvc3JjL2RjL2x1LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tbC1tYXRyaXgvc3JjL2RjL25pcGFscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWwtbWF0cml4L3NyYy9kYy9xci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWwtbWF0cml4L3NyYy9kYy9zdmQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21sLW1hdHJpeC9zcmMvZGMvdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWwtbWF0cml4L3NyYy9kZWNvbXBvc2l0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWwtbWF0cml4L3NyYy9kZXRlcm1pbmFudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWwtbWF0cml4L3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWwtbWF0cml4L3NyYy9pbnNwZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tbC1tYXRyaXgvc3JjL2xpbmVhckRlcGVuZGVuY2llcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWwtbWF0cml4L3NyYy9tYXRoT3BlcmF0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWwtbWF0cml4L3NyYy9tYXRyaXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21sLW1hdHJpeC9zcmMvcHNldWRvSW52ZXJzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWwtbWF0cml4L3NyYy9zdGF0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tbC1tYXRyaXgvc3JjL3V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21sLW1hdHJpeC9zcmMvdmlld3MvYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWwtbWF0cml4L3NyYy92aWV3cy9jb2x1bW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21sLW1hdHJpeC9zcmMvdmlld3MvY29sdW1uU2VsZWN0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tbC1tYXRyaXgvc3JjL3ZpZXdzL2ZsaXBDb2x1bW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21sLW1hdHJpeC9zcmMvdmlld3MvZmxpcFJvdy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWwtbWF0cml4L3NyYy92aWV3cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWwtbWF0cml4L3NyYy92aWV3cy9yb3cuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21sLW1hdHJpeC9zcmMvdmlld3Mvcm93U2VsZWN0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tbC1tYXRyaXgvc3JjL3ZpZXdzL3NlbGVjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWwtbWF0cml4L3NyYy92aWV3cy9zdWIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21sLW1hdHJpeC9zcmMvdmlld3MvdHJhbnNwb3NlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tbC1tYXRyaXgvc3JjL3dyYXAvV3JhcHBlck1hdHJpeDFELmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tbC1tYXRyaXgvc3JjL3dyYXAvV3JhcHBlck1hdHJpeDJELmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tbC1tYXRyaXgvc3JjL3dyYXAvd3JhcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueXF1ZXVlL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb250cm9sbGVyLndvcmtlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2UtdGFyZ2V0L2ljcC9lc3RpbWF0ZV9ob21vZ3JhcGh5LmpzIiwid2VicGFjazovLy8uL3NyYy9pbWFnZS10YXJnZXQvaWNwL3JlZmluZV9ob21vZ3JhcGh5LmpzIiwid2VicGFjazovLy8uL3NyYy9pbWFnZS10YXJnZXQvaWNwL3V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9pbWFnZS10YXJnZXQvbWF0Y2hpbmcvaGFtbWluZy1kaXN0YW5jZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2UtdGFyZ2V0L21hdGNoaW5nL2hvbW9ncmFwaHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltYWdlLXRhcmdldC9tYXRjaGluZy9ob3VnaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2UtdGFyZ2V0L21hdGNoaW5nL21hdGNoZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltYWdlLXRhcmdldC9tYXRjaGluZy9tYXRjaGluZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2UtdGFyZ2V0L3V0aWxzL2dlb21ldHJ5LmpzIiwid2VicGFjazovLy8uL3NyYy9pbWFnZS10YXJnZXQvdXRpbHMvcmFuZG9taXplci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZhOztBQUViOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7OztBQ1JBO0FBQUE7QUFBQTtBQUFtQzs7QUFFbkM7QUFDQTtBQUNBLFdBQVcsY0FBYztBQUN6QixZQUFZO0FBQ1o7O0FBRUE7QUFDQSxPQUFPLG1EQUFPO0FBQ2Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsaUJBQWlCLGtCQUFrQjtBQUNuQztBQUNBOztBQUVBO0FBQ0E7O0FBRWUsa0VBQUcsRUFBQzs7Ozs7Ozs7Ozs7OztBQzFCbkI7QUFBQTtBQUFBO0FBQW1DOztBQUVuQztBQUNBO0FBQ0EsV0FBVyxjQUFjO0FBQ3pCLFlBQVk7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QUFxQixrQkFBa0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsZUFBZTtBQUNsQyxxQkFBcUIsa0JBQWtCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixlQUFlO0FBQ2xDLHFCQUFxQixrQkFBa0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsZUFBZTtBQUNsQyxxQkFBcUIsa0JBQWtCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixlQUFlO0FBQ2xDLHFCQUFxQixrQkFBa0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsZUFBZTtBQUNsQyxxQkFBcUIsa0JBQWtCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixlQUFlO0FBQ2xDLHFCQUFxQixrQkFBa0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsZUFBZTtBQUNsQyxxQkFBcUIsa0JBQWtCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsZUFBZTtBQUNsQyxxQkFBcUIsa0JBQWtCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixlQUFlO0FBQ2xDLHFCQUFxQixrQkFBa0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixlQUFlO0FBQ2xDLHFCQUFxQixrQkFBa0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsZUFBZTtBQUNsQyxxQkFBcUIsa0JBQWtCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsZUFBZTtBQUNsQyxxQkFBcUIsa0JBQWtCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixlQUFlO0FBQ2xDLHFCQUFxQixrQkFBa0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtB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Q0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixHQUFHLEtBQUssR0FBRyxPQUFPLEdBQUcsS0FBSyxHQUFHO0FBQ3BEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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O0FBQ0EsaUJBQWlCLG9CQUFvQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2pQQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3BIQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhLGdCQUFnQjtBQUM3QixxQkFBcUIsZ0JBQWdCOztBQUVyQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EiLCJmaWxlIjoid29ya2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvY29udHJvbGxlci53b3JrZXIuanNcIik7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuZnVuY3Rpb24gaXNBbnlBcnJheShvYmplY3QpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwob2JqZWN0KS5lbmRzV2l0aCgnQXJyYXldJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBbnlBcnJheTtcbiIsImltcG9ydCBpc0FycmF5IGZyb20gJ2lzLWFueS1hcnJheSc7XG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIG1heGltdW0gb2YgdGhlIGdpdmVuIHZhbHVlc1xuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBpbnB1dFxuICogQHJldHVybiB7bnVtYmVyfVxuICovXG5cbmZ1bmN0aW9uIG1heChpbnB1dCkge1xuICBpZiAoIWlzQXJyYXkoaW5wdXQpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignaW5wdXQgbXVzdCBiZSBhbiBhcnJheScpO1xuICB9XG5cbiAgaWYgKGlucHV0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2lucHV0IG11c3Qgbm90IGJlIGVtcHR5Jyk7XG4gIH1cblxuICB2YXIgbWF4VmFsdWUgPSBpbnB1dFswXTtcblxuICBmb3IgKHZhciBpID0gMTsgaSA8IGlucHV0Lmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGlucHV0W2ldID4gbWF4VmFsdWUpIG1heFZhbHVlID0gaW5wdXRbaV07XG4gIH1cblxuICByZXR1cm4gbWF4VmFsdWU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1heDtcbiIsImltcG9ydCBpc0FycmF5IGZyb20gJ2lzLWFueS1hcnJheSc7XG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIG1pbmltdW0gb2YgdGhlIGdpdmVuIHZhbHVlc1xuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBpbnB1dFxuICogQHJldHVybiB7bnVtYmVyfVxuICovXG5cbmZ1bmN0aW9uIG1pbihpbnB1dCkge1xuICBpZiAoIWlzQXJyYXkoaW5wdXQpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignaW5wdXQgbXVzdCBiZSBhbiBhcnJheScpO1xuICB9XG5cbiAgaWYgKGlucHV0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2lucHV0IG11c3Qgbm90IGJlIGVtcHR5Jyk7XG4gIH1cblxuICB2YXIgbWluVmFsdWUgPSBpbnB1dFswXTtcblxuICBmb3IgKHZhciBpID0gMTsgaSA8IGlucHV0Lmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGlucHV0W2ldIDwgbWluVmFsdWUpIG1pblZhbHVlID0gaW5wdXRbaV07XG4gIH1cblxuICByZXR1cm4gbWluVmFsdWU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1pbjtcbiIsImltcG9ydCBpc0FycmF5IGZyb20gJ2lzLWFueS1hcnJheSc7XG5pbXBvcnQgbWF4IGZyb20gJ21sLWFycmF5LW1heCc7XG5pbXBvcnQgbWluIGZyb20gJ21sLWFycmF5LW1pbic7XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGlucHV0XG4gKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnM9e31dXG4gKiBAcGFyYW0ge0FycmF5fSBbb3B0aW9ucy5vdXRwdXQ9W11dIHNwZWNpZnkgdGhlIG91dHB1dCBhcnJheSwgY2FuIGJlIHRoZSBpbnB1dCBhcnJheSBmb3IgaW4gcGxhY2UgbW9kaWZpY2F0aW9uXG4gKi9cblxuZnVuY3Rpb24gcmVzY2FsZShpbnB1dCkge1xuICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cbiAgaWYgKCFpc0FycmF5KGlucHV0KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2lucHV0IG11c3QgYmUgYW4gYXJyYXknKTtcbiAgfSBlbHNlIGlmIChpbnB1dC5sZW5ndGggPT09IDApIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdpbnB1dCBtdXN0IG5vdCBiZSBlbXB0eScpO1xuICB9XG5cbiAgdmFyIG91dHB1dDtcblxuICBpZiAob3B0aW9ucy5vdXRwdXQgIT09IHVuZGVmaW5lZCkge1xuICAgIGlmICghaXNBcnJheShvcHRpb25zLm91dHB1dCkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ291dHB1dCBvcHRpb24gbXVzdCBiZSBhbiBhcnJheSBpZiBzcGVjaWZpZWQnKTtcbiAgICB9XG5cbiAgICBvdXRwdXQgPSBvcHRpb25zLm91dHB1dDtcbiAgfSBlbHNlIHtcbiAgICBvdXRwdXQgPSBuZXcgQXJyYXkoaW5wdXQubGVuZ3RoKTtcbiAgfVxuXG4gIHZhciBjdXJyZW50TWluID0gbWluKGlucHV0KTtcbiAgdmFyIGN1cnJlbnRNYXggPSBtYXgoaW5wdXQpO1xuXG4gIGlmIChjdXJyZW50TWluID09PSBjdXJyZW50TWF4KSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ21pbmltdW0gYW5kIG1heGltdW0gaW5wdXQgdmFsdWVzIGFyZSBlcXVhbC4gQ2Fubm90IHJlc2NhbGUgYSBjb25zdGFudCBhcnJheScpO1xuICB9XG5cbiAgdmFyIF9vcHRpb25zJG1pbiA9IG9wdGlvbnMubWluLFxuICAgICAgbWluVmFsdWUgPSBfb3B0aW9ucyRtaW4gPT09IHZvaWQgMCA/IG9wdGlvbnMuYXV0b01pbk1heCA/IGN1cnJlbnRNaW4gOiAwIDogX29wdGlvbnMkbWluLFxuICAgICAgX29wdGlvbnMkbWF4ID0gb3B0aW9ucy5tYXgsXG4gICAgICBtYXhWYWx1ZSA9IF9vcHRpb25zJG1heCA9PT0gdm9pZCAwID8gb3B0aW9ucy5hdXRvTWluTWF4ID8gY3VycmVudE1heCA6IDEgOiBfb3B0aW9ucyRtYXg7XG5cbiAgaWYgKG1pblZhbHVlID49IG1heFZhbHVlKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ21pbiBvcHRpb24gbXVzdCBiZSBzbWFsbGVyIHRoYW4gbWF4IG9wdGlvbicpO1xuICB9XG5cbiAgdmFyIGZhY3RvciA9IChtYXhWYWx1ZSAtIG1pblZhbHVlKSAvIChjdXJyZW50TWF4IC0gY3VycmVudE1pbik7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbnB1dC5sZW5ndGg7IGkrKykge1xuICAgIG91dHB1dFtpXSA9IChpbnB1dFtpXSAtIGN1cnJlbnRNaW4pICogZmFjdG9yICsgbWluVmFsdWU7XG4gIH1cblxuICByZXR1cm4gb3V0cHV0O1xufVxuXG5leHBvcnQgZGVmYXVsdCByZXNjYWxlO1xuIiwiaW1wb3J0IE1hdHJpeCBmcm9tICcuL21hdHJpeCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb3JyZWxhdGlvbih4TWF0cml4LCB5TWF0cml4ID0geE1hdHJpeCwgb3B0aW9ucyA9IHt9KSB7XG4gIHhNYXRyaXggPSBuZXcgTWF0cml4KHhNYXRyaXgpO1xuICBsZXQgeUlzU2FtZSA9IGZhbHNlO1xuICBpZiAoXG4gICAgdHlwZW9mIHlNYXRyaXggPT09ICdvYmplY3QnICYmXG4gICAgIU1hdHJpeC5pc01hdHJpeCh5TWF0cml4KSAmJlxuICAgICFBcnJheS5pc0FycmF5KHlNYXRyaXgpXG4gICkge1xuICAgIG9wdGlvbnMgPSB5TWF0cml4O1xuICAgIHlNYXRyaXggPSB4TWF0cml4O1xuICAgIHlJc1NhbWUgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHlNYXRyaXggPSBuZXcgTWF0cml4KHlNYXRyaXgpO1xuICB9XG4gIGlmICh4TWF0cml4LnJvd3MgIT09IHlNYXRyaXgucm93cykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0JvdGggbWF0cmljZXMgbXVzdCBoYXZlIHRoZSBzYW1lIG51bWJlciBvZiByb3dzJyk7XG4gIH1cblxuICBjb25zdCB7IGNlbnRlciA9IHRydWUsIHNjYWxlID0gdHJ1ZSB9ID0gb3B0aW9ucztcbiAgaWYgKGNlbnRlcikge1xuICAgIHhNYXRyaXguY2VudGVyKCdjb2x1bW4nKTtcbiAgICBpZiAoIXlJc1NhbWUpIHtcbiAgICAgIHlNYXRyaXguY2VudGVyKCdjb2x1bW4nKTtcbiAgICB9XG4gIH1cbiAgaWYgKHNjYWxlKSB7XG4gICAgeE1hdHJpeC5zY2FsZSgnY29sdW1uJyk7XG4gICAgaWYgKCF5SXNTYW1lKSB7XG4gICAgICB5TWF0cml4LnNjYWxlKCdjb2x1bW4nKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBzZHggPSB4TWF0cml4LnN0YW5kYXJkRGV2aWF0aW9uKCdjb2x1bW4nLCB7IHVuYmlhc2VkOiB0cnVlIH0pO1xuICBjb25zdCBzZHkgPSB5SXNTYW1lXG4gICAgPyBzZHhcbiAgICA6IHlNYXRyaXguc3RhbmRhcmREZXZpYXRpb24oJ2NvbHVtbicsIHsgdW5iaWFzZWQ6IHRydWUgfSk7XG5cbiAgY29uc3QgY29yciA9IHhNYXRyaXgudHJhbnNwb3NlKCkubW11bCh5TWF0cml4KTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3JyLnJvd3M7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29yci5jb2x1bW5zOyBqKyspIHtcbiAgICAgIGNvcnIuc2V0KFxuICAgICAgICBpLFxuICAgICAgICBqLFxuICAgICAgICBjb3JyLmdldChpLCBqKSAqICgxIC8gKHNkeFtpXSAqIHNkeVtqXSkpICogKDEgLyAoeE1hdHJpeC5yb3dzIC0gMSkpLFxuICAgICAgKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvcnI7XG59XG4iLCJpbXBvcnQgTWF0cml4IGZyb20gJy4vbWF0cml4JztcblxuZXhwb3J0IGZ1bmN0aW9uIGNvdmFyaWFuY2UoeE1hdHJpeCwgeU1hdHJpeCA9IHhNYXRyaXgsIG9wdGlvbnMgPSB7fSkge1xuICB4TWF0cml4ID0gbmV3IE1hdHJpeCh4TWF0cml4KTtcbiAgbGV0IHlJc1NhbWUgPSBmYWxzZTtcbiAgaWYgKFxuICAgIHR5cGVvZiB5TWF0cml4ID09PSAnb2JqZWN0JyAmJlxuICAgICFNYXRyaXguaXNNYXRyaXgoeU1hdHJpeCkgJiZcbiAgICAhQXJyYXkuaXNBcnJheSh5TWF0cml4KVxuICApIHtcbiAgICBvcHRpb25zID0geU1hdHJpeDtcbiAgICB5TWF0cml4ID0geE1hdHJpeDtcbiAgICB5SXNTYW1lID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICB5TWF0cml4ID0gbmV3IE1hdHJpeCh5TWF0cml4KTtcbiAgfVxuICBpZiAoeE1hdHJpeC5yb3dzICE9PSB5TWF0cml4LnJvd3MpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdCb3RoIG1hdHJpY2VzIG11c3QgaGF2ZSB0aGUgc2FtZSBudW1iZXIgb2Ygcm93cycpO1xuICB9XG4gIGNvbnN0IHsgY2VudGVyID0gdHJ1ZSB9ID0gb3B0aW9ucztcbiAgaWYgKGNlbnRlcikge1xuICAgIHhNYXRyaXggPSB4TWF0cml4LmNlbnRlcignY29sdW1uJyk7XG4gICAgaWYgKCF5SXNTYW1lKSB7XG4gICAgICB5TWF0cml4ID0geU1hdHJpeC5jZW50ZXIoJ2NvbHVtbicpO1xuICAgIH1cbiAgfVxuICBjb25zdCBjb3YgPSB4TWF0cml4LnRyYW5zcG9zZSgpLm1tdWwoeU1hdHJpeCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY292LnJvd3M7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgY292LmNvbHVtbnM7IGorKykge1xuICAgICAgY292LnNldChpLCBqLCBjb3YuZ2V0KGksIGopICogKDEgLyAoeE1hdHJpeC5yb3dzIC0gMSkpKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvdjtcbn1cbiIsImltcG9ydCBNYXRyaXggZnJvbSAnLi4vbWF0cml4JztcbmltcG9ydCBXcmFwcGVyTWF0cml4MkQgZnJvbSAnLi4vd3JhcC9XcmFwcGVyTWF0cml4MkQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaG9sZXNreURlY29tcG9zaXRpb24ge1xuICBjb25zdHJ1Y3Rvcih2YWx1ZSkge1xuICAgIHZhbHVlID0gV3JhcHBlck1hdHJpeDJELmNoZWNrTWF0cml4KHZhbHVlKTtcbiAgICBpZiAoIXZhbHVlLmlzU3ltbWV0cmljKCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWF0cml4IGlzIG5vdCBzeW1tZXRyaWMnKTtcbiAgICB9XG5cbiAgICBsZXQgYSA9IHZhbHVlO1xuICAgIGxldCBkaW1lbnNpb24gPSBhLnJvd3M7XG4gICAgbGV0IGwgPSBuZXcgTWF0cml4KGRpbWVuc2lvbiwgZGltZW5zaW9uKTtcbiAgICBsZXQgcG9zaXRpdmVEZWZpbml0ZSA9IHRydWU7XG4gICAgbGV0IGksIGosIGs7XG5cbiAgICBmb3IgKGogPSAwOyBqIDwgZGltZW5zaW9uOyBqKyspIHtcbiAgICAgIGxldCBkID0gMDtcbiAgICAgIGZvciAoayA9IDA7IGsgPCBqOyBrKyspIHtcbiAgICAgICAgbGV0IHMgPSAwO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgazsgaSsrKSB7XG4gICAgICAgICAgcyArPSBsLmdldChrLCBpKSAqIGwuZ2V0KGosIGkpO1xuICAgICAgICB9XG4gICAgICAgIHMgPSAoYS5nZXQoaiwgaykgLSBzKSAvIGwuZ2V0KGssIGspO1xuICAgICAgICBsLnNldChqLCBrLCBzKTtcbiAgICAgICAgZCA9IGQgKyBzICogcztcbiAgICAgIH1cblxuICAgICAgZCA9IGEuZ2V0KGosIGopIC0gZDtcblxuICAgICAgcG9zaXRpdmVEZWZpbml0ZSAmPSBkID4gMDtcbiAgICAgIGwuc2V0KGosIGosIE1hdGguc3FydChNYXRoLm1heChkLCAwKSkpO1xuICAgICAgZm9yIChrID0gaiArIDE7IGsgPCBkaW1lbnNpb247IGsrKykge1xuICAgICAgICBsLnNldChqLCBrLCAwKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLkwgPSBsO1xuICAgIHRoaXMucG9zaXRpdmVEZWZpbml0ZSA9IEJvb2xlYW4ocG9zaXRpdmVEZWZpbml0ZSk7XG4gIH1cblxuICBpc1Bvc2l0aXZlRGVmaW5pdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpdmVEZWZpbml0ZTtcbiAgfVxuXG4gIHNvbHZlKHZhbHVlKSB7XG4gICAgdmFsdWUgPSBXcmFwcGVyTWF0cml4MkQuY2hlY2tNYXRyaXgodmFsdWUpO1xuXG4gICAgbGV0IGwgPSB0aGlzLkw7XG4gICAgbGV0IGRpbWVuc2lvbiA9IGwucm93cztcblxuICAgIGlmICh2YWx1ZS5yb3dzICE9PSBkaW1lbnNpb24pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWF0cml4IGRpbWVuc2lvbnMgZG8gbm90IG1hdGNoJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLmlzUG9zaXRpdmVEZWZpbml0ZSgpID09PSBmYWxzZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNYXRyaXggaXMgbm90IHBvc2l0aXZlIGRlZmluaXRlJyk7XG4gICAgfVxuXG4gICAgbGV0IGNvdW50ID0gdmFsdWUuY29sdW1ucztcbiAgICBsZXQgQiA9IHZhbHVlLmNsb25lKCk7XG4gICAgbGV0IGksIGosIGs7XG5cbiAgICBmb3IgKGsgPSAwOyBrIDwgZGltZW5zaW9uOyBrKyspIHtcbiAgICAgIGZvciAoaiA9IDA7IGogPCBjb3VudDsgaisrKSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBrOyBpKyspIHtcbiAgICAgICAgICBCLnNldChrLCBqLCBCLmdldChrLCBqKSAtIEIuZ2V0KGksIGopICogbC5nZXQoaywgaSkpO1xuICAgICAgICB9XG4gICAgICAgIEIuc2V0KGssIGosIEIuZ2V0KGssIGopIC8gbC5nZXQoaywgaykpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoayA9IGRpbWVuc2lvbiAtIDE7IGsgPj0gMDsgay0tKSB7XG4gICAgICBmb3IgKGogPSAwOyBqIDwgY291bnQ7IGorKykge1xuICAgICAgICBmb3IgKGkgPSBrICsgMTsgaSA8IGRpbWVuc2lvbjsgaSsrKSB7XG4gICAgICAgICAgQi5zZXQoaywgaiwgQi5nZXQoaywgaikgLSBCLmdldChpLCBqKSAqIGwuZ2V0KGksIGspKTtcbiAgICAgICAgfVxuICAgICAgICBCLnNldChrLCBqLCBCLmdldChrLCBqKSAvIGwuZ2V0KGssIGspKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gQjtcbiAgfVxuXG4gIGdldCBsb3dlclRyaWFuZ3VsYXJNYXRyaXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuTDtcbiAgfVxufVxuIiwiaW1wb3J0IE1hdHJpeCBmcm9tICcuLi9tYXRyaXgnO1xuaW1wb3J0IFdyYXBwZXJNYXRyaXgyRCBmcm9tICcuLi93cmFwL1dyYXBwZXJNYXRyaXgyRCc7XG5cbmltcG9ydCB7IGh5cG90ZW51c2UgfSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFaWdlbnZhbHVlRGVjb21wb3NpdGlvbiB7XG4gIGNvbnN0cnVjdG9yKG1hdHJpeCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgeyBhc3N1bWVTeW1tZXRyaWMgPSBmYWxzZSB9ID0gb3B0aW9ucztcblxuICAgIG1hdHJpeCA9IFdyYXBwZXJNYXRyaXgyRC5jaGVja01hdHJpeChtYXRyaXgpO1xuICAgIGlmICghbWF0cml4LmlzU3F1YXJlKCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWF0cml4IGlzIG5vdCBhIHNxdWFyZSBtYXRyaXgnKTtcbiAgICB9XG5cbiAgICBsZXQgbiA9IG1hdHJpeC5jb2x1bW5zO1xuICAgIGxldCBWID0gbmV3IE1hdHJpeChuLCBuKTtcbiAgICBsZXQgZCA9IG5ldyBGbG9hdDY0QXJyYXkobik7XG4gICAgbGV0IGUgPSBuZXcgRmxvYXQ2NEFycmF5KG4pO1xuICAgIGxldCB2YWx1ZSA9IG1hdHJpeDtcbiAgICBsZXQgaSwgajtcblxuICAgIGxldCBpc1N5bW1ldHJpYyA9IGZhbHNlO1xuICAgIGlmIChhc3N1bWVTeW1tZXRyaWMpIHtcbiAgICAgIGlzU3ltbWV0cmljID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaXNTeW1tZXRyaWMgPSBtYXRyaXguaXNTeW1tZXRyaWMoKTtcbiAgICB9XG5cbiAgICBpZiAoaXNTeW1tZXRyaWMpIHtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgZm9yIChqID0gMDsgaiA8IG47IGorKykge1xuICAgICAgICAgIFYuc2V0KGksIGosIHZhbHVlLmdldChpLCBqKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRyZWQyKG4sIGUsIGQsIFYpO1xuICAgICAgdHFsMihuLCBlLCBkLCBWKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IEggPSBuZXcgTWF0cml4KG4sIG4pO1xuICAgICAgbGV0IG9ydCA9IG5ldyBGbG9hdDY0QXJyYXkobik7XG4gICAgICBmb3IgKGogPSAwOyBqIDwgbjsgaisrKSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICBILnNldChpLCBqLCB2YWx1ZS5nZXQoaSwgaikpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBvcnRoZXMobiwgSCwgb3J0LCBWKTtcbiAgICAgIGhxcjIobiwgZSwgZCwgViwgSCk7XG4gICAgfVxuXG4gICAgdGhpcy5uID0gbjtcbiAgICB0aGlzLmUgPSBlO1xuICAgIHRoaXMuZCA9IGQ7XG4gICAgdGhpcy5WID0gVjtcbiAgfVxuXG4gIGdldCByZWFsRWlnZW52YWx1ZXMoKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5kKTtcbiAgfVxuXG4gIGdldCBpbWFnaW5hcnlFaWdlbnZhbHVlcygpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLmUpO1xuICB9XG5cbiAgZ2V0IGVpZ2VudmVjdG9yTWF0cml4KCkge1xuICAgIHJldHVybiB0aGlzLlY7XG4gIH1cblxuICBnZXQgZGlhZ29uYWxNYXRyaXgoKSB7XG4gICAgbGV0IG4gPSB0aGlzLm47XG4gICAgbGV0IGUgPSB0aGlzLmU7XG4gICAgbGV0IGQgPSB0aGlzLmQ7XG4gICAgbGV0IFggPSBuZXcgTWF0cml4KG4sIG4pO1xuICAgIGxldCBpLCBqO1xuICAgIGZvciAoaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgIGZvciAoaiA9IDA7IGogPCBuOyBqKyspIHtcbiAgICAgICAgWC5zZXQoaSwgaiwgMCk7XG4gICAgICB9XG4gICAgICBYLnNldChpLCBpLCBkW2ldKTtcbiAgICAgIGlmIChlW2ldID4gMCkge1xuICAgICAgICBYLnNldChpLCBpICsgMSwgZVtpXSk7XG4gICAgICB9IGVsc2UgaWYgKGVbaV0gPCAwKSB7XG4gICAgICAgIFguc2V0KGksIGkgLSAxLCBlW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFg7XG4gIH1cbn1cblxuZnVuY3Rpb24gdHJlZDIobiwgZSwgZCwgVikge1xuICBsZXQgZiwgZywgaCwgaSwgaiwgaywgaGgsIHNjYWxlO1xuXG4gIGZvciAoaiA9IDA7IGogPCBuOyBqKyspIHtcbiAgICBkW2pdID0gVi5nZXQobiAtIDEsIGopO1xuICB9XG5cbiAgZm9yIChpID0gbiAtIDE7IGkgPiAwOyBpLS0pIHtcbiAgICBzY2FsZSA9IDA7XG4gICAgaCA9IDA7XG4gICAgZm9yIChrID0gMDsgayA8IGk7IGsrKykge1xuICAgICAgc2NhbGUgPSBzY2FsZSArIE1hdGguYWJzKGRba10pO1xuICAgIH1cblxuICAgIGlmIChzY2FsZSA9PT0gMCkge1xuICAgICAgZVtpXSA9IGRbaSAtIDFdO1xuICAgICAgZm9yIChqID0gMDsgaiA8IGk7IGorKykge1xuICAgICAgICBkW2pdID0gVi5nZXQoaSAtIDEsIGopO1xuICAgICAgICBWLnNldChpLCBqLCAwKTtcbiAgICAgICAgVi5zZXQoaiwgaSwgMCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAoayA9IDA7IGsgPCBpOyBrKyspIHtcbiAgICAgICAgZFtrXSAvPSBzY2FsZTtcbiAgICAgICAgaCArPSBkW2tdICogZFtrXTtcbiAgICAgIH1cblxuICAgICAgZiA9IGRbaSAtIDFdO1xuICAgICAgZyA9IE1hdGguc3FydChoKTtcbiAgICAgIGlmIChmID4gMCkge1xuICAgICAgICBnID0gLWc7XG4gICAgICB9XG5cbiAgICAgIGVbaV0gPSBzY2FsZSAqIGc7XG4gICAgICBoID0gaCAtIGYgKiBnO1xuICAgICAgZFtpIC0gMV0gPSBmIC0gZztcbiAgICAgIGZvciAoaiA9IDA7IGogPCBpOyBqKyspIHtcbiAgICAgICAgZVtqXSA9IDA7XG4gICAgICB9XG5cbiAgICAgIGZvciAoaiA9IDA7IGogPCBpOyBqKyspIHtcbiAgICAgICAgZiA9IGRbal07XG4gICAgICAgIFYuc2V0KGosIGksIGYpO1xuICAgICAgICBnID0gZVtqXSArIFYuZ2V0KGosIGopICogZjtcbiAgICAgICAgZm9yIChrID0gaiArIDE7IGsgPD0gaSAtIDE7IGsrKykge1xuICAgICAgICAgIGcgKz0gVi5nZXQoaywgaikgKiBkW2tdO1xuICAgICAgICAgIGVba10gKz0gVi5nZXQoaywgaikgKiBmO1xuICAgICAgICB9XG4gICAgICAgIGVbal0gPSBnO1xuICAgICAgfVxuXG4gICAgICBmID0gMDtcbiAgICAgIGZvciAoaiA9IDA7IGogPCBpOyBqKyspIHtcbiAgICAgICAgZVtqXSAvPSBoO1xuICAgICAgICBmICs9IGVbal0gKiBkW2pdO1xuICAgICAgfVxuXG4gICAgICBoaCA9IGYgLyAoaCArIGgpO1xuICAgICAgZm9yIChqID0gMDsgaiA8IGk7IGorKykge1xuICAgICAgICBlW2pdIC09IGhoICogZFtqXTtcbiAgICAgIH1cblxuICAgICAgZm9yIChqID0gMDsgaiA8IGk7IGorKykge1xuICAgICAgICBmID0gZFtqXTtcbiAgICAgICAgZyA9IGVbal07XG4gICAgICAgIGZvciAoayA9IGo7IGsgPD0gaSAtIDE7IGsrKykge1xuICAgICAgICAgIFYuc2V0KGssIGosIFYuZ2V0KGssIGopIC0gKGYgKiBlW2tdICsgZyAqIGRba10pKTtcbiAgICAgICAgfVxuICAgICAgICBkW2pdID0gVi5nZXQoaSAtIDEsIGopO1xuICAgICAgICBWLnNldChpLCBqLCAwKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZFtpXSA9IGg7XG4gIH1cblxuICBmb3IgKGkgPSAwOyBpIDwgbiAtIDE7IGkrKykge1xuICAgIFYuc2V0KG4gLSAxLCBpLCBWLmdldChpLCBpKSk7XG4gICAgVi5zZXQoaSwgaSwgMSk7XG4gICAgaCA9IGRbaSArIDFdO1xuICAgIGlmIChoICE9PSAwKSB7XG4gICAgICBmb3IgKGsgPSAwOyBrIDw9IGk7IGsrKykge1xuICAgICAgICBkW2tdID0gVi5nZXQoaywgaSArIDEpIC8gaDtcbiAgICAgIH1cblxuICAgICAgZm9yIChqID0gMDsgaiA8PSBpOyBqKyspIHtcbiAgICAgICAgZyA9IDA7XG4gICAgICAgIGZvciAoayA9IDA7IGsgPD0gaTsgaysrKSB7XG4gICAgICAgICAgZyArPSBWLmdldChrLCBpICsgMSkgKiBWLmdldChrLCBqKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGsgPSAwOyBrIDw9IGk7IGsrKykge1xuICAgICAgICAgIFYuc2V0KGssIGosIFYuZ2V0KGssIGopIC0gZyAqIGRba10pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChrID0gMDsgayA8PSBpOyBrKyspIHtcbiAgICAgIFYuc2V0KGssIGkgKyAxLCAwKTtcbiAgICB9XG4gIH1cblxuICBmb3IgKGogPSAwOyBqIDwgbjsgaisrKSB7XG4gICAgZFtqXSA9IFYuZ2V0KG4gLSAxLCBqKTtcbiAgICBWLnNldChuIC0gMSwgaiwgMCk7XG4gIH1cblxuICBWLnNldChuIC0gMSwgbiAtIDEsIDEpO1xuICBlWzBdID0gMDtcbn1cblxuZnVuY3Rpb24gdHFsMihuLCBlLCBkLCBWKSB7XG4gIGxldCBnLCBoLCBpLCBqLCBrLCBsLCBtLCBwLCByLCBkbDEsIGMsIGMyLCBjMywgZWwxLCBzLCBzMiwgaXRlcjtcblxuICBmb3IgKGkgPSAxOyBpIDwgbjsgaSsrKSB7XG4gICAgZVtpIC0gMV0gPSBlW2ldO1xuICB9XG5cbiAgZVtuIC0gMV0gPSAwO1xuXG4gIGxldCBmID0gMDtcbiAgbGV0IHRzdDEgPSAwO1xuICBsZXQgZXBzID0gTnVtYmVyLkVQU0lMT047XG5cbiAgZm9yIChsID0gMDsgbCA8IG47IGwrKykge1xuICAgIHRzdDEgPSBNYXRoLm1heCh0c3QxLCBNYXRoLmFicyhkW2xdKSArIE1hdGguYWJzKGVbbF0pKTtcbiAgICBtID0gbDtcbiAgICB3aGlsZSAobSA8IG4pIHtcbiAgICAgIGlmIChNYXRoLmFicyhlW21dKSA8PSBlcHMgKiB0c3QxKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgbSsrO1xuICAgIH1cblxuICAgIGlmIChtID4gbCkge1xuICAgICAgaXRlciA9IDA7XG4gICAgICBkbyB7XG4gICAgICAgIGl0ZXIgPSBpdGVyICsgMTtcblxuICAgICAgICBnID0gZFtsXTtcbiAgICAgICAgcCA9IChkW2wgKyAxXSAtIGcpIC8gKDIgKiBlW2xdKTtcbiAgICAgICAgciA9IGh5cG90ZW51c2UocCwgMSk7XG4gICAgICAgIGlmIChwIDwgMCkge1xuICAgICAgICAgIHIgPSAtcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGRbbF0gPSBlW2xdIC8gKHAgKyByKTtcbiAgICAgICAgZFtsICsgMV0gPSBlW2xdICogKHAgKyByKTtcbiAgICAgICAgZGwxID0gZFtsICsgMV07XG4gICAgICAgIGggPSBnIC0gZFtsXTtcbiAgICAgICAgZm9yIChpID0gbCArIDI7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICBkW2ldIC09IGg7XG4gICAgICAgIH1cblxuICAgICAgICBmID0gZiArIGg7XG5cbiAgICAgICAgcCA9IGRbbV07XG4gICAgICAgIGMgPSAxO1xuICAgICAgICBjMiA9IGM7XG4gICAgICAgIGMzID0gYztcbiAgICAgICAgZWwxID0gZVtsICsgMV07XG4gICAgICAgIHMgPSAwO1xuICAgICAgICBzMiA9IDA7XG4gICAgICAgIGZvciAoaSA9IG0gLSAxOyBpID49IGw7IGktLSkge1xuICAgICAgICAgIGMzID0gYzI7XG4gICAgICAgICAgYzIgPSBjO1xuICAgICAgICAgIHMyID0gcztcbiAgICAgICAgICBnID0gYyAqIGVbaV07XG4gICAgICAgICAgaCA9IGMgKiBwO1xuICAgICAgICAgIHIgPSBoeXBvdGVudXNlKHAsIGVbaV0pO1xuICAgICAgICAgIGVbaSArIDFdID0gcyAqIHI7XG4gICAgICAgICAgcyA9IGVbaV0gLyByO1xuICAgICAgICAgIGMgPSBwIC8gcjtcbiAgICAgICAgICBwID0gYyAqIGRbaV0gLSBzICogZztcbiAgICAgICAgICBkW2kgKyAxXSA9IGggKyBzICogKGMgKiBnICsgcyAqIGRbaV0pO1xuXG4gICAgICAgICAgZm9yIChrID0gMDsgayA8IG47IGsrKykge1xuICAgICAgICAgICAgaCA9IFYuZ2V0KGssIGkgKyAxKTtcbiAgICAgICAgICAgIFYuc2V0KGssIGkgKyAxLCBzICogVi5nZXQoaywgaSkgKyBjICogaCk7XG4gICAgICAgICAgICBWLnNldChrLCBpLCBjICogVi5nZXQoaywgaSkgLSBzICogaCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcCA9ICgtcyAqIHMyICogYzMgKiBlbDEgKiBlW2xdKSAvIGRsMTtcbiAgICAgICAgZVtsXSA9IHMgKiBwO1xuICAgICAgICBkW2xdID0gYyAqIHA7XG4gICAgICB9IHdoaWxlIChNYXRoLmFicyhlW2xdKSA+IGVwcyAqIHRzdDEpO1xuICAgIH1cbiAgICBkW2xdID0gZFtsXSArIGY7XG4gICAgZVtsXSA9IDA7XG4gIH1cblxuICBmb3IgKGkgPSAwOyBpIDwgbiAtIDE7IGkrKykge1xuICAgIGsgPSBpO1xuICAgIHAgPSBkW2ldO1xuICAgIGZvciAoaiA9IGkgKyAxOyBqIDwgbjsgaisrKSB7XG4gICAgICBpZiAoZFtqXSA8IHApIHtcbiAgICAgICAgayA9IGo7XG4gICAgICAgIHAgPSBkW2pdO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChrICE9PSBpKSB7XG4gICAgICBkW2tdID0gZFtpXTtcbiAgICAgIGRbaV0gPSBwO1xuICAgICAgZm9yIChqID0gMDsgaiA8IG47IGorKykge1xuICAgICAgICBwID0gVi5nZXQoaiwgaSk7XG4gICAgICAgIFYuc2V0KGosIGksIFYuZ2V0KGosIGspKTtcbiAgICAgICAgVi5zZXQoaiwgaywgcCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIG9ydGhlcyhuLCBILCBvcnQsIFYpIHtcbiAgbGV0IGxvdyA9IDA7XG4gIGxldCBoaWdoID0gbiAtIDE7XG4gIGxldCBmLCBnLCBoLCBpLCBqLCBtO1xuICBsZXQgc2NhbGU7XG5cbiAgZm9yIChtID0gbG93ICsgMTsgbSA8PSBoaWdoIC0gMTsgbSsrKSB7XG4gICAgc2NhbGUgPSAwO1xuICAgIGZvciAoaSA9IG07IGkgPD0gaGlnaDsgaSsrKSB7XG4gICAgICBzY2FsZSA9IHNjYWxlICsgTWF0aC5hYnMoSC5nZXQoaSwgbSAtIDEpKTtcbiAgICB9XG5cbiAgICBpZiAoc2NhbGUgIT09IDApIHtcbiAgICAgIGggPSAwO1xuICAgICAgZm9yIChpID0gaGlnaDsgaSA+PSBtOyBpLS0pIHtcbiAgICAgICAgb3J0W2ldID0gSC5nZXQoaSwgbSAtIDEpIC8gc2NhbGU7XG4gICAgICAgIGggKz0gb3J0W2ldICogb3J0W2ldO1xuICAgICAgfVxuXG4gICAgICBnID0gTWF0aC5zcXJ0KGgpO1xuICAgICAgaWYgKG9ydFttXSA+IDApIHtcbiAgICAgICAgZyA9IC1nO1xuICAgICAgfVxuXG4gICAgICBoID0gaCAtIG9ydFttXSAqIGc7XG4gICAgICBvcnRbbV0gPSBvcnRbbV0gLSBnO1xuXG4gICAgICBmb3IgKGogPSBtOyBqIDwgbjsgaisrKSB7XG4gICAgICAgIGYgPSAwO1xuICAgICAgICBmb3IgKGkgPSBoaWdoOyBpID49IG07IGktLSkge1xuICAgICAgICAgIGYgKz0gb3J0W2ldICogSC5nZXQoaSwgaik7XG4gICAgICAgIH1cblxuICAgICAgICBmID0gZiAvIGg7XG4gICAgICAgIGZvciAoaSA9IG07IGkgPD0gaGlnaDsgaSsrKSB7XG4gICAgICAgICAgSC5zZXQoaSwgaiwgSC5nZXQoaSwgaikgLSBmICogb3J0W2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKGkgPSAwOyBpIDw9IGhpZ2g7IGkrKykge1xuICAgICAgICBmID0gMDtcbiAgICAgICAgZm9yIChqID0gaGlnaDsgaiA+PSBtOyBqLS0pIHtcbiAgICAgICAgICBmICs9IG9ydFtqXSAqIEguZ2V0KGksIGopO1xuICAgICAgICB9XG5cbiAgICAgICAgZiA9IGYgLyBoO1xuICAgICAgICBmb3IgKGogPSBtOyBqIDw9IGhpZ2g7IGorKykge1xuICAgICAgICAgIEguc2V0KGksIGosIEguZ2V0KGksIGopIC0gZiAqIG9ydFtqXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgb3J0W21dID0gc2NhbGUgKiBvcnRbbV07XG4gICAgICBILnNldChtLCBtIC0gMSwgc2NhbGUgKiBnKTtcbiAgICB9XG4gIH1cblxuICBmb3IgKGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgZm9yIChqID0gMDsgaiA8IG47IGorKykge1xuICAgICAgVi5zZXQoaSwgaiwgaSA9PT0gaiA/IDEgOiAwKTtcbiAgICB9XG4gIH1cblxuICBmb3IgKG0gPSBoaWdoIC0gMTsgbSA+PSBsb3cgKyAxOyBtLS0pIHtcbiAgICBpZiAoSC5nZXQobSwgbSAtIDEpICE9PSAwKSB7XG4gICAgICBmb3IgKGkgPSBtICsgMTsgaSA8PSBoaWdoOyBpKyspIHtcbiAgICAgICAgb3J0W2ldID0gSC5nZXQoaSwgbSAtIDEpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGogPSBtOyBqIDw9IGhpZ2g7IGorKykge1xuICAgICAgICBnID0gMDtcbiAgICAgICAgZm9yIChpID0gbTsgaSA8PSBoaWdoOyBpKyspIHtcbiAgICAgICAgICBnICs9IG9ydFtpXSAqIFYuZ2V0KGksIGopO1xuICAgICAgICB9XG5cbiAgICAgICAgZyA9IGcgLyBvcnRbbV0gLyBILmdldChtLCBtIC0gMSk7XG4gICAgICAgIGZvciAoaSA9IG07IGkgPD0gaGlnaDsgaSsrKSB7XG4gICAgICAgICAgVi5zZXQoaSwgaiwgVi5nZXQoaSwgaikgKyBnICogb3J0W2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBocXIyKG5uLCBlLCBkLCBWLCBIKSB7XG4gIGxldCBuID0gbm4gLSAxO1xuICBsZXQgbG93ID0gMDtcbiAgbGV0IGhpZ2ggPSBubiAtIDE7XG4gIGxldCBlcHMgPSBOdW1iZXIuRVBTSUxPTjtcbiAgbGV0IGV4c2hpZnQgPSAwO1xuICBsZXQgbm9ybSA9IDA7XG4gIGxldCBwID0gMDtcbiAgbGV0IHEgPSAwO1xuICBsZXQgciA9IDA7XG4gIGxldCBzID0gMDtcbiAgbGV0IHogPSAwO1xuICBsZXQgaXRlciA9IDA7XG4gIGxldCBpLCBqLCBrLCBsLCBtLCB0LCB3LCB4LCB5O1xuICBsZXQgcmEsIHNhLCB2ciwgdmk7XG4gIGxldCBub3RsYXN0LCBjZGl2cmVzO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBubjsgaSsrKSB7XG4gICAgaWYgKGkgPCBsb3cgfHwgaSA+IGhpZ2gpIHtcbiAgICAgIGRbaV0gPSBILmdldChpLCBpKTtcbiAgICAgIGVbaV0gPSAwO1xuICAgIH1cblxuICAgIGZvciAoaiA9IE1hdGgubWF4KGkgLSAxLCAwKTsgaiA8IG5uOyBqKyspIHtcbiAgICAgIG5vcm0gPSBub3JtICsgTWF0aC5hYnMoSC5nZXQoaSwgaikpO1xuICAgIH1cbiAgfVxuXG4gIHdoaWxlIChuID49IGxvdykge1xuICAgIGwgPSBuO1xuICAgIHdoaWxlIChsID4gbG93KSB7XG4gICAgICBzID0gTWF0aC5hYnMoSC5nZXQobCAtIDEsIGwgLSAxKSkgKyBNYXRoLmFicyhILmdldChsLCBsKSk7XG4gICAgICBpZiAocyA9PT0gMCkge1xuICAgICAgICBzID0gbm9ybTtcbiAgICAgIH1cbiAgICAgIGlmIChNYXRoLmFicyhILmdldChsLCBsIC0gMSkpIDwgZXBzICogcykge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGwtLTtcbiAgICB9XG5cbiAgICBpZiAobCA9PT0gbikge1xuICAgICAgSC5zZXQobiwgbiwgSC5nZXQobiwgbikgKyBleHNoaWZ0KTtcbiAgICAgIGRbbl0gPSBILmdldChuLCBuKTtcbiAgICAgIGVbbl0gPSAwO1xuICAgICAgbi0tO1xuICAgICAgaXRlciA9IDA7XG4gICAgfSBlbHNlIGlmIChsID09PSBuIC0gMSkge1xuICAgICAgdyA9IEguZ2V0KG4sIG4gLSAxKSAqIEguZ2V0KG4gLSAxLCBuKTtcbiAgICAgIHAgPSAoSC5nZXQobiAtIDEsIG4gLSAxKSAtIEguZ2V0KG4sIG4pKSAvIDI7XG4gICAgICBxID0gcCAqIHAgKyB3O1xuICAgICAgeiA9IE1hdGguc3FydChNYXRoLmFicyhxKSk7XG4gICAgICBILnNldChuLCBuLCBILmdldChuLCBuKSArIGV4c2hpZnQpO1xuICAgICAgSC5zZXQobiAtIDEsIG4gLSAxLCBILmdldChuIC0gMSwgbiAtIDEpICsgZXhzaGlmdCk7XG4gICAgICB4ID0gSC5nZXQobiwgbik7XG5cbiAgICAgIGlmIChxID49IDApIHtcbiAgICAgICAgeiA9IHAgPj0gMCA/IHAgKyB6IDogcCAtIHo7XG4gICAgICAgIGRbbiAtIDFdID0geCArIHo7XG4gICAgICAgIGRbbl0gPSBkW24gLSAxXTtcbiAgICAgICAgaWYgKHogIT09IDApIHtcbiAgICAgICAgICBkW25dID0geCAtIHcgLyB6O1xuICAgICAgICB9XG4gICAgICAgIGVbbiAtIDFdID0gMDtcbiAgICAgICAgZVtuXSA9IDA7XG4gICAgICAgIHggPSBILmdldChuLCBuIC0gMSk7XG4gICAgICAgIHMgPSBNYXRoLmFicyh4KSArIE1hdGguYWJzKHopO1xuICAgICAgICBwID0geCAvIHM7XG4gICAgICAgIHEgPSB6IC8gcztcbiAgICAgICAgciA9IE1hdGguc3FydChwICogcCArIHEgKiBxKTtcbiAgICAgICAgcCA9IHAgLyByO1xuICAgICAgICBxID0gcSAvIHI7XG5cbiAgICAgICAgZm9yIChqID0gbiAtIDE7IGogPCBubjsgaisrKSB7XG4gICAgICAgICAgeiA9IEguZ2V0KG4gLSAxLCBqKTtcbiAgICAgICAgICBILnNldChuIC0gMSwgaiwgcSAqIHogKyBwICogSC5nZXQobiwgaikpO1xuICAgICAgICAgIEguc2V0KG4sIGosIHEgKiBILmdldChuLCBqKSAtIHAgKiB6KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPD0gbjsgaSsrKSB7XG4gICAgICAgICAgeiA9IEguZ2V0KGksIG4gLSAxKTtcbiAgICAgICAgICBILnNldChpLCBuIC0gMSwgcSAqIHogKyBwICogSC5nZXQoaSwgbikpO1xuICAgICAgICAgIEguc2V0KGksIG4sIHEgKiBILmdldChpLCBuKSAtIHAgKiB6KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoaSA9IGxvdzsgaSA8PSBoaWdoOyBpKyspIHtcbiAgICAgICAgICB6ID0gVi5nZXQoaSwgbiAtIDEpO1xuICAgICAgICAgIFYuc2V0KGksIG4gLSAxLCBxICogeiArIHAgKiBWLmdldChpLCBuKSk7XG4gICAgICAgICAgVi5zZXQoaSwgbiwgcSAqIFYuZ2V0KGksIG4pIC0gcCAqIHopO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkW24gLSAxXSA9IHggKyBwO1xuICAgICAgICBkW25dID0geCArIHA7XG4gICAgICAgIGVbbiAtIDFdID0gejtcbiAgICAgICAgZVtuXSA9IC16O1xuICAgICAgfVxuXG4gICAgICBuID0gbiAtIDI7XG4gICAgICBpdGVyID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgeCA9IEguZ2V0KG4sIG4pO1xuICAgICAgeSA9IDA7XG4gICAgICB3ID0gMDtcbiAgICAgIGlmIChsIDwgbikge1xuICAgICAgICB5ID0gSC5nZXQobiAtIDEsIG4gLSAxKTtcbiAgICAgICAgdyA9IEguZ2V0KG4sIG4gLSAxKSAqIEguZ2V0KG4gLSAxLCBuKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZXIgPT09IDEwKSB7XG4gICAgICAgIGV4c2hpZnQgKz0geDtcbiAgICAgICAgZm9yIChpID0gbG93OyBpIDw9IG47IGkrKykge1xuICAgICAgICAgIEguc2V0KGksIGksIEguZ2V0KGksIGkpIC0geCk7XG4gICAgICAgIH1cbiAgICAgICAgcyA9IE1hdGguYWJzKEguZ2V0KG4sIG4gLSAxKSkgKyBNYXRoLmFicyhILmdldChuIC0gMSwgbiAtIDIpKTtcbiAgICAgICAgeCA9IHkgPSAwLjc1ICogcztcbiAgICAgICAgdyA9IC0wLjQzNzUgKiBzICogcztcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZXIgPT09IDMwKSB7XG4gICAgICAgIHMgPSAoeSAtIHgpIC8gMjtcbiAgICAgICAgcyA9IHMgKiBzICsgdztcbiAgICAgICAgaWYgKHMgPiAwKSB7XG4gICAgICAgICAgcyA9IE1hdGguc3FydChzKTtcbiAgICAgICAgICBpZiAoeSA8IHgpIHtcbiAgICAgICAgICAgIHMgPSAtcztcbiAgICAgICAgICB9XG4gICAgICAgICAgcyA9IHggLSB3IC8gKCh5IC0geCkgLyAyICsgcyk7XG4gICAgICAgICAgZm9yIChpID0gbG93OyBpIDw9IG47IGkrKykge1xuICAgICAgICAgICAgSC5zZXQoaSwgaSwgSC5nZXQoaSwgaSkgLSBzKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZXhzaGlmdCArPSBzO1xuICAgICAgICAgIHggPSB5ID0gdyA9IDAuOTY0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGl0ZXIgPSBpdGVyICsgMTtcblxuICAgICAgbSA9IG4gLSAyO1xuICAgICAgd2hpbGUgKG0gPj0gbCkge1xuICAgICAgICB6ID0gSC5nZXQobSwgbSk7XG4gICAgICAgIHIgPSB4IC0gejtcbiAgICAgICAgcyA9IHkgLSB6O1xuICAgICAgICBwID0gKHIgKiBzIC0gdykgLyBILmdldChtICsgMSwgbSkgKyBILmdldChtLCBtICsgMSk7XG4gICAgICAgIHEgPSBILmdldChtICsgMSwgbSArIDEpIC0geiAtIHIgLSBzO1xuICAgICAgICByID0gSC5nZXQobSArIDIsIG0gKyAxKTtcbiAgICAgICAgcyA9IE1hdGguYWJzKHApICsgTWF0aC5hYnMocSkgKyBNYXRoLmFicyhyKTtcbiAgICAgICAgcCA9IHAgLyBzO1xuICAgICAgICBxID0gcSAvIHM7XG4gICAgICAgIHIgPSByIC8gcztcbiAgICAgICAgaWYgKG0gPT09IGwpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoXG4gICAgICAgICAgTWF0aC5hYnMoSC5nZXQobSwgbSAtIDEpKSAqIChNYXRoLmFicyhxKSArIE1hdGguYWJzKHIpKSA8XG4gICAgICAgICAgZXBzICpcbiAgICAgICAgICAgIChNYXRoLmFicyhwKSAqXG4gICAgICAgICAgICAgIChNYXRoLmFicyhILmdldChtIC0gMSwgbSAtIDEpKSArXG4gICAgICAgICAgICAgICAgTWF0aC5hYnMoeikgK1xuICAgICAgICAgICAgICAgIE1hdGguYWJzKEguZ2V0KG0gKyAxLCBtICsgMSkpKSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgbS0tO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGkgPSBtICsgMjsgaSA8PSBuOyBpKyspIHtcbiAgICAgICAgSC5zZXQoaSwgaSAtIDIsIDApO1xuICAgICAgICBpZiAoaSA+IG0gKyAyKSB7XG4gICAgICAgICAgSC5zZXQoaSwgaSAtIDMsIDApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZvciAoayA9IG07IGsgPD0gbiAtIDE7IGsrKykge1xuICAgICAgICBub3RsYXN0ID0gayAhPT0gbiAtIDE7XG4gICAgICAgIGlmIChrICE9PSBtKSB7XG4gICAgICAgICAgcCA9IEguZ2V0KGssIGsgLSAxKTtcbiAgICAgICAgICBxID0gSC5nZXQoayArIDEsIGsgLSAxKTtcbiAgICAgICAgICByID0gbm90bGFzdCA/IEguZ2V0KGsgKyAyLCBrIC0gMSkgOiAwO1xuICAgICAgICAgIHggPSBNYXRoLmFicyhwKSArIE1hdGguYWJzKHEpICsgTWF0aC5hYnMocik7XG4gICAgICAgICAgaWYgKHggIT09IDApIHtcbiAgICAgICAgICAgIHAgPSBwIC8geDtcbiAgICAgICAgICAgIHEgPSBxIC8geDtcbiAgICAgICAgICAgIHIgPSByIC8geDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoeCA9PT0gMCkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcyA9IE1hdGguc3FydChwICogcCArIHEgKiBxICsgciAqIHIpO1xuICAgICAgICBpZiAocCA8IDApIHtcbiAgICAgICAgICBzID0gLXM7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocyAhPT0gMCkge1xuICAgICAgICAgIGlmIChrICE9PSBtKSB7XG4gICAgICAgICAgICBILnNldChrLCBrIC0gMSwgLXMgKiB4KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGwgIT09IG0pIHtcbiAgICAgICAgICAgIEguc2V0KGssIGsgLSAxLCAtSC5nZXQoaywgayAtIDEpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBwID0gcCArIHM7XG4gICAgICAgICAgeCA9IHAgLyBzO1xuICAgICAgICAgIHkgPSBxIC8gcztcbiAgICAgICAgICB6ID0gciAvIHM7XG4gICAgICAgICAgcSA9IHEgLyBwO1xuICAgICAgICAgIHIgPSByIC8gcDtcblxuICAgICAgICAgIGZvciAoaiA9IGs7IGogPCBubjsgaisrKSB7XG4gICAgICAgICAgICBwID0gSC5nZXQoaywgaikgKyBxICogSC5nZXQoayArIDEsIGopO1xuICAgICAgICAgICAgaWYgKG5vdGxhc3QpIHtcbiAgICAgICAgICAgICAgcCA9IHAgKyByICogSC5nZXQoayArIDIsIGopO1xuICAgICAgICAgICAgICBILnNldChrICsgMiwgaiwgSC5nZXQoayArIDIsIGopIC0gcCAqIHopO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBILnNldChrLCBqLCBILmdldChrLCBqKSAtIHAgKiB4KTtcbiAgICAgICAgICAgIEguc2V0KGsgKyAxLCBqLCBILmdldChrICsgMSwgaikgLSBwICogeSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZm9yIChpID0gMDsgaSA8PSBNYXRoLm1pbihuLCBrICsgMyk7IGkrKykge1xuICAgICAgICAgICAgcCA9IHggKiBILmdldChpLCBrKSArIHkgKiBILmdldChpLCBrICsgMSk7XG4gICAgICAgICAgICBpZiAobm90bGFzdCkge1xuICAgICAgICAgICAgICBwID0gcCArIHogKiBILmdldChpLCBrICsgMik7XG4gICAgICAgICAgICAgIEguc2V0KGksIGsgKyAyLCBILmdldChpLCBrICsgMikgLSBwICogcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIEguc2V0KGksIGssIEguZ2V0KGksIGspIC0gcCk7XG4gICAgICAgICAgICBILnNldChpLCBrICsgMSwgSC5nZXQoaSwgayArIDEpIC0gcCAqIHEpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZvciAoaSA9IGxvdzsgaSA8PSBoaWdoOyBpKyspIHtcbiAgICAgICAgICAgIHAgPSB4ICogVi5nZXQoaSwgaykgKyB5ICogVi5nZXQoaSwgayArIDEpO1xuICAgICAgICAgICAgaWYgKG5vdGxhc3QpIHtcbiAgICAgICAgICAgICAgcCA9IHAgKyB6ICogVi5nZXQoaSwgayArIDIpO1xuICAgICAgICAgICAgICBWLnNldChpLCBrICsgMiwgVi5nZXQoaSwgayArIDIpIC0gcCAqIHIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBWLnNldChpLCBrLCBWLmdldChpLCBrKSAtIHApO1xuICAgICAgICAgICAgVi5zZXQoaSwgayArIDEsIFYuZ2V0KGksIGsgKyAxKSAtIHAgKiBxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAobm9ybSA9PT0gMCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGZvciAobiA9IG5uIC0gMTsgbiA+PSAwOyBuLS0pIHtcbiAgICBwID0gZFtuXTtcbiAgICBxID0gZVtuXTtcblxuICAgIGlmIChxID09PSAwKSB7XG4gICAgICBsID0gbjtcbiAgICAgIEguc2V0KG4sIG4sIDEpO1xuICAgICAgZm9yIChpID0gbiAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIHcgPSBILmdldChpLCBpKSAtIHA7XG4gICAgICAgIHIgPSAwO1xuICAgICAgICBmb3IgKGogPSBsOyBqIDw9IG47IGorKykge1xuICAgICAgICAgIHIgPSByICsgSC5nZXQoaSwgaikgKiBILmdldChqLCBuKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlW2ldIDwgMCkge1xuICAgICAgICAgIHogPSB3O1xuICAgICAgICAgIHMgPSByO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGwgPSBpO1xuICAgICAgICAgIGlmIChlW2ldID09PSAwKSB7XG4gICAgICAgICAgICBILnNldChpLCBuLCB3ICE9PSAwID8gLXIgLyB3IDogLXIgLyAoZXBzICogbm9ybSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB4ID0gSC5nZXQoaSwgaSArIDEpO1xuICAgICAgICAgICAgeSA9IEguZ2V0KGkgKyAxLCBpKTtcbiAgICAgICAgICAgIHEgPSAoZFtpXSAtIHApICogKGRbaV0gLSBwKSArIGVbaV0gKiBlW2ldO1xuICAgICAgICAgICAgdCA9ICh4ICogcyAtIHogKiByKSAvIHE7XG4gICAgICAgICAgICBILnNldChpLCBuLCB0KTtcbiAgICAgICAgICAgIEguc2V0KFxuICAgICAgICAgICAgICBpICsgMSxcbiAgICAgICAgICAgICAgbixcbiAgICAgICAgICAgICAgTWF0aC5hYnMoeCkgPiBNYXRoLmFicyh6KSA/ICgtciAtIHcgKiB0KSAvIHggOiAoLXMgLSB5ICogdCkgLyB6LFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0ID0gTWF0aC5hYnMoSC5nZXQoaSwgbikpO1xuICAgICAgICAgIGlmIChlcHMgKiB0ICogdCA+IDEpIHtcbiAgICAgICAgICAgIGZvciAoaiA9IGk7IGogPD0gbjsgaisrKSB7XG4gICAgICAgICAgICAgIEguc2V0KGosIG4sIEguZ2V0KGosIG4pIC8gdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChxIDwgMCkge1xuICAgICAgbCA9IG4gLSAxO1xuXG4gICAgICBpZiAoTWF0aC5hYnMoSC5nZXQobiwgbiAtIDEpKSA+IE1hdGguYWJzKEguZ2V0KG4gLSAxLCBuKSkpIHtcbiAgICAgICAgSC5zZXQobiAtIDEsIG4gLSAxLCBxIC8gSC5nZXQobiwgbiAtIDEpKTtcbiAgICAgICAgSC5zZXQobiAtIDEsIG4sIC0oSC5nZXQobiwgbikgLSBwKSAvIEguZ2V0KG4sIG4gLSAxKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjZGl2cmVzID0gY2RpdigwLCAtSC5nZXQobiAtIDEsIG4pLCBILmdldChuIC0gMSwgbiAtIDEpIC0gcCwgcSk7XG4gICAgICAgIEguc2V0KG4gLSAxLCBuIC0gMSwgY2RpdnJlc1swXSk7XG4gICAgICAgIEguc2V0KG4gLSAxLCBuLCBjZGl2cmVzWzFdKTtcbiAgICAgIH1cblxuICAgICAgSC5zZXQobiwgbiAtIDEsIDApO1xuICAgICAgSC5zZXQobiwgbiwgMSk7XG4gICAgICBmb3IgKGkgPSBuIC0gMjsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgcmEgPSAwO1xuICAgICAgICBzYSA9IDA7XG4gICAgICAgIGZvciAoaiA9IGw7IGogPD0gbjsgaisrKSB7XG4gICAgICAgICAgcmEgPSByYSArIEguZ2V0KGksIGopICogSC5nZXQoaiwgbiAtIDEpO1xuICAgICAgICAgIHNhID0gc2EgKyBILmdldChpLCBqKSAqIEguZ2V0KGosIG4pO1xuICAgICAgICB9XG5cbiAgICAgICAgdyA9IEguZ2V0KGksIGkpIC0gcDtcblxuICAgICAgICBpZiAoZVtpXSA8IDApIHtcbiAgICAgICAgICB6ID0gdztcbiAgICAgICAgICByID0gcmE7XG4gICAgICAgICAgcyA9IHNhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGwgPSBpO1xuICAgICAgICAgIGlmIChlW2ldID09PSAwKSB7XG4gICAgICAgICAgICBjZGl2cmVzID0gY2RpdigtcmEsIC1zYSwgdywgcSk7XG4gICAgICAgICAgICBILnNldChpLCBuIC0gMSwgY2RpdnJlc1swXSk7XG4gICAgICAgICAgICBILnNldChpLCBuLCBjZGl2cmVzWzFdKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgeCA9IEguZ2V0KGksIGkgKyAxKTtcbiAgICAgICAgICAgIHkgPSBILmdldChpICsgMSwgaSk7XG4gICAgICAgICAgICB2ciA9IChkW2ldIC0gcCkgKiAoZFtpXSAtIHApICsgZVtpXSAqIGVbaV0gLSBxICogcTtcbiAgICAgICAgICAgIHZpID0gKGRbaV0gLSBwKSAqIDIgKiBxO1xuICAgICAgICAgICAgaWYgKHZyID09PSAwICYmIHZpID09PSAwKSB7XG4gICAgICAgICAgICAgIHZyID1cbiAgICAgICAgICAgICAgICBlcHMgKlxuICAgICAgICAgICAgICAgIG5vcm0gKlxuICAgICAgICAgICAgICAgIChNYXRoLmFicyh3KSArXG4gICAgICAgICAgICAgICAgICBNYXRoLmFicyhxKSArXG4gICAgICAgICAgICAgICAgICBNYXRoLmFicyh4KSArXG4gICAgICAgICAgICAgICAgICBNYXRoLmFicyh5KSArXG4gICAgICAgICAgICAgICAgICBNYXRoLmFicyh6KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjZGl2cmVzID0gY2RpdihcbiAgICAgICAgICAgICAgeCAqIHIgLSB6ICogcmEgKyBxICogc2EsXG4gICAgICAgICAgICAgIHggKiBzIC0geiAqIHNhIC0gcSAqIHJhLFxuICAgICAgICAgICAgICB2cixcbiAgICAgICAgICAgICAgdmksXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgSC5zZXQoaSwgbiAtIDEsIGNkaXZyZXNbMF0pO1xuICAgICAgICAgICAgSC5zZXQoaSwgbiwgY2RpdnJlc1sxXSk7XG4gICAgICAgICAgICBpZiAoTWF0aC5hYnMoeCkgPiBNYXRoLmFicyh6KSArIE1hdGguYWJzKHEpKSB7XG4gICAgICAgICAgICAgIEguc2V0KFxuICAgICAgICAgICAgICAgIGkgKyAxLFxuICAgICAgICAgICAgICAgIG4gLSAxLFxuICAgICAgICAgICAgICAgICgtcmEgLSB3ICogSC5nZXQoaSwgbiAtIDEpICsgcSAqIEguZ2V0KGksIG4pKSAvIHgsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIEguc2V0KFxuICAgICAgICAgICAgICAgIGkgKyAxLFxuICAgICAgICAgICAgICAgIG4sXG4gICAgICAgICAgICAgICAgKC1zYSAtIHcgKiBILmdldChpLCBuKSAtIHEgKiBILmdldChpLCBuIC0gMSkpIC8geCxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNkaXZyZXMgPSBjZGl2KFxuICAgICAgICAgICAgICAgIC1yIC0geSAqIEguZ2V0KGksIG4gLSAxKSxcbiAgICAgICAgICAgICAgICAtcyAtIHkgKiBILmdldChpLCBuKSxcbiAgICAgICAgICAgICAgICB6LFxuICAgICAgICAgICAgICAgIHEsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIEguc2V0KGkgKyAxLCBuIC0gMSwgY2RpdnJlc1swXSk7XG4gICAgICAgICAgICAgIEguc2V0KGkgKyAxLCBuLCBjZGl2cmVzWzFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0ID0gTWF0aC5tYXgoTWF0aC5hYnMoSC5nZXQoaSwgbiAtIDEpKSwgTWF0aC5hYnMoSC5nZXQoaSwgbikpKTtcbiAgICAgICAgICBpZiAoZXBzICogdCAqIHQgPiAxKSB7XG4gICAgICAgICAgICBmb3IgKGogPSBpOyBqIDw9IG47IGorKykge1xuICAgICAgICAgICAgICBILnNldChqLCBuIC0gMSwgSC5nZXQoaiwgbiAtIDEpIC8gdCk7XG4gICAgICAgICAgICAgIEguc2V0KGosIG4sIEguZ2V0KGosIG4pIC8gdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZm9yIChpID0gMDsgaSA8IG5uOyBpKyspIHtcbiAgICBpZiAoaSA8IGxvdyB8fCBpID4gaGlnaCkge1xuICAgICAgZm9yIChqID0gaTsgaiA8IG5uOyBqKyspIHtcbiAgICAgICAgVi5zZXQoaSwgaiwgSC5nZXQoaSwgaikpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZvciAoaiA9IG5uIC0gMTsgaiA+PSBsb3c7IGotLSkge1xuICAgIGZvciAoaSA9IGxvdzsgaSA8PSBoaWdoOyBpKyspIHtcbiAgICAgIHogPSAwO1xuICAgICAgZm9yIChrID0gbG93OyBrIDw9IE1hdGgubWluKGosIGhpZ2gpOyBrKyspIHtcbiAgICAgICAgeiA9IHogKyBWLmdldChpLCBrKSAqIEguZ2V0KGssIGopO1xuICAgICAgfVxuICAgICAgVi5zZXQoaSwgaiwgeik7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNkaXYoeHIsIHhpLCB5ciwgeWkpIHtcbiAgbGV0IHIsIGQ7XG4gIGlmIChNYXRoLmFicyh5cikgPiBNYXRoLmFicyh5aSkpIHtcbiAgICByID0geWkgLyB5cjtcbiAgICBkID0geXIgKyByICogeWk7XG4gICAgcmV0dXJuIFsoeHIgKyByICogeGkpIC8gZCwgKHhpIC0gciAqIHhyKSAvIGRdO1xuICB9IGVsc2Uge1xuICAgIHIgPSB5ciAvIHlpO1xuICAgIGQgPSB5aSArIHIgKiB5cjtcbiAgICByZXR1cm4gWyhyICogeHIgKyB4aSkgLyBkLCAociAqIHhpIC0geHIpIC8gZF07XG4gIH1cbn1cbiIsImltcG9ydCBNYXRyaXggZnJvbSAnLi4vbWF0cml4JztcbmltcG9ydCBXcmFwcGVyTWF0cml4MkQgZnJvbSAnLi4vd3JhcC9XcmFwcGVyTWF0cml4MkQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMdURlY29tcG9zaXRpb24ge1xuICBjb25zdHJ1Y3RvcihtYXRyaXgpIHtcbiAgICBtYXRyaXggPSBXcmFwcGVyTWF0cml4MkQuY2hlY2tNYXRyaXgobWF0cml4KTtcblxuICAgIGxldCBsdSA9IG1hdHJpeC5jbG9uZSgpO1xuICAgIGxldCByb3dzID0gbHUucm93cztcbiAgICBsZXQgY29sdW1ucyA9IGx1LmNvbHVtbnM7XG4gICAgbGV0IHBpdm90VmVjdG9yID0gbmV3IEZsb2F0NjRBcnJheShyb3dzKTtcbiAgICBsZXQgcGl2b3RTaWduID0gMTtcbiAgICBsZXQgaSwgaiwgaywgcCwgcywgdCwgdjtcbiAgICBsZXQgTFVjb2xqLCBrbWF4O1xuXG4gICAgZm9yIChpID0gMDsgaSA8IHJvd3M7IGkrKykge1xuICAgICAgcGl2b3RWZWN0b3JbaV0gPSBpO1xuICAgIH1cblxuICAgIExVY29saiA9IG5ldyBGbG9hdDY0QXJyYXkocm93cyk7XG5cbiAgICBmb3IgKGogPSAwOyBqIDwgY29sdW1uczsgaisrKSB7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgcm93czsgaSsrKSB7XG4gICAgICAgIExVY29saltpXSA9IGx1LmdldChpLCBqKTtcbiAgICAgIH1cblxuICAgICAgZm9yIChpID0gMDsgaSA8IHJvd3M7IGkrKykge1xuICAgICAgICBrbWF4ID0gTWF0aC5taW4oaSwgaik7XG4gICAgICAgIHMgPSAwO1xuICAgICAgICBmb3IgKGsgPSAwOyBrIDwga21heDsgaysrKSB7XG4gICAgICAgICAgcyArPSBsdS5nZXQoaSwgaykgKiBMVWNvbGpba107XG4gICAgICAgIH1cbiAgICAgICAgTFVjb2xqW2ldIC09IHM7XG4gICAgICAgIGx1LnNldChpLCBqLCBMVWNvbGpbaV0pO1xuICAgICAgfVxuXG4gICAgICBwID0gajtcbiAgICAgIGZvciAoaSA9IGogKyAxOyBpIDwgcm93czsgaSsrKSB7XG4gICAgICAgIGlmIChNYXRoLmFicyhMVWNvbGpbaV0pID4gTWF0aC5hYnMoTFVjb2xqW3BdKSkge1xuICAgICAgICAgIHAgPSBpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChwICE9PSBqKSB7XG4gICAgICAgIGZvciAoayA9IDA7IGsgPCBjb2x1bW5zOyBrKyspIHtcbiAgICAgICAgICB0ID0gbHUuZ2V0KHAsIGspO1xuICAgICAgICAgIGx1LnNldChwLCBrLCBsdS5nZXQoaiwgaykpO1xuICAgICAgICAgIGx1LnNldChqLCBrLCB0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHYgPSBwaXZvdFZlY3RvcltwXTtcbiAgICAgICAgcGl2b3RWZWN0b3JbcF0gPSBwaXZvdFZlY3RvcltqXTtcbiAgICAgICAgcGl2b3RWZWN0b3Jbal0gPSB2O1xuXG4gICAgICAgIHBpdm90U2lnbiA9IC1waXZvdFNpZ247XG4gICAgICB9XG5cbiAgICAgIGlmIChqIDwgcm93cyAmJiBsdS5nZXQoaiwgaikgIT09IDApIHtcbiAgICAgICAgZm9yIChpID0gaiArIDE7IGkgPCByb3dzOyBpKyspIHtcbiAgICAgICAgICBsdS5zZXQoaSwgaiwgbHUuZ2V0KGksIGopIC8gbHUuZ2V0KGosIGopKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuTFUgPSBsdTtcbiAgICB0aGlzLnBpdm90VmVjdG9yID0gcGl2b3RWZWN0b3I7XG4gICAgdGhpcy5waXZvdFNpZ24gPSBwaXZvdFNpZ247XG4gIH1cblxuICBpc1Npbmd1bGFyKCkge1xuICAgIGxldCBkYXRhID0gdGhpcy5MVTtcbiAgICBsZXQgY29sID0gZGF0YS5jb2x1bW5zO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sOyBqKyspIHtcbiAgICAgIGlmIChkYXRhLmdldChqLCBqKSA9PT0gMCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc29sdmUodmFsdWUpIHtcbiAgICB2YWx1ZSA9IE1hdHJpeC5jaGVja01hdHJpeCh2YWx1ZSk7XG5cbiAgICBsZXQgbHUgPSB0aGlzLkxVO1xuICAgIGxldCByb3dzID0gbHUucm93cztcblxuICAgIGlmIChyb3dzICE9PSB2YWx1ZS5yb3dzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbWF0cml4IGRpbWVuc2lvbnMnKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNTaW5ndWxhcigpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0xVIG1hdHJpeCBpcyBzaW5ndWxhcicpO1xuICAgIH1cblxuICAgIGxldCBjb3VudCA9IHZhbHVlLmNvbHVtbnM7XG4gICAgbGV0IFggPSB2YWx1ZS5zdWJNYXRyaXhSb3codGhpcy5waXZvdFZlY3RvciwgMCwgY291bnQgLSAxKTtcbiAgICBsZXQgY29sdW1ucyA9IGx1LmNvbHVtbnM7XG4gICAgbGV0IGksIGosIGs7XG5cbiAgICBmb3IgKGsgPSAwOyBrIDwgY29sdW1uczsgaysrKSB7XG4gICAgICBmb3IgKGkgPSBrICsgMTsgaSA8IGNvbHVtbnM7IGkrKykge1xuICAgICAgICBmb3IgKGogPSAwOyBqIDwgY291bnQ7IGorKykge1xuICAgICAgICAgIFguc2V0KGksIGosIFguZ2V0KGksIGopIC0gWC5nZXQoaywgaikgKiBsdS5nZXQoaSwgaykpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAoayA9IGNvbHVtbnMgLSAxOyBrID49IDA7IGstLSkge1xuICAgICAgZm9yIChqID0gMDsgaiA8IGNvdW50OyBqKyspIHtcbiAgICAgICAgWC5zZXQoaywgaiwgWC5nZXQoaywgaikgLyBsdS5nZXQoaywgaykpO1xuICAgICAgfVxuICAgICAgZm9yIChpID0gMDsgaSA8IGs7IGkrKykge1xuICAgICAgICBmb3IgKGogPSAwOyBqIDwgY291bnQ7IGorKykge1xuICAgICAgICAgIFguc2V0KGksIGosIFguZ2V0KGksIGopIC0gWC5nZXQoaywgaikgKiBsdS5nZXQoaSwgaykpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBYO1xuICB9XG5cbiAgZ2V0IGRldGVybWluYW50KCkge1xuICAgIGxldCBkYXRhID0gdGhpcy5MVTtcbiAgICBpZiAoIWRhdGEuaXNTcXVhcmUoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNYXRyaXggbXVzdCBiZSBzcXVhcmUnKTtcbiAgICB9XG4gICAgbGV0IGRldGVybWluYW50ID0gdGhpcy5waXZvdFNpZ247XG4gICAgbGV0IGNvbCA9IGRhdGEuY29sdW1ucztcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNvbDsgaisrKSB7XG4gICAgICBkZXRlcm1pbmFudCAqPSBkYXRhLmdldChqLCBqKTtcbiAgICB9XG4gICAgcmV0dXJuIGRldGVybWluYW50O1xuICB9XG5cbiAgZ2V0IGxvd2VyVHJpYW5ndWxhck1hdHJpeCgpIHtcbiAgICBsZXQgZGF0YSA9IHRoaXMuTFU7XG4gICAgbGV0IHJvd3MgPSBkYXRhLnJvd3M7XG4gICAgbGV0IGNvbHVtbnMgPSBkYXRhLmNvbHVtbnM7XG4gICAgbGV0IFggPSBuZXcgTWF0cml4KHJvd3MsIGNvbHVtbnMpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNvbHVtbnM7IGorKykge1xuICAgICAgICBpZiAoaSA+IGopIHtcbiAgICAgICAgICBYLnNldChpLCBqLCBkYXRhLmdldChpLCBqKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaSA9PT0gaikge1xuICAgICAgICAgIFguc2V0KGksIGosIDEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIFguc2V0KGksIGosIDApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBYO1xuICB9XG5cbiAgZ2V0IHVwcGVyVHJpYW5ndWxhck1hdHJpeCgpIHtcbiAgICBsZXQgZGF0YSA9IHRoaXMuTFU7XG4gICAgbGV0IHJvd3MgPSBkYXRhLnJvd3M7XG4gICAgbGV0IGNvbHVtbnMgPSBkYXRhLmNvbHVtbnM7XG4gICAgbGV0IFggPSBuZXcgTWF0cml4KHJvd3MsIGNvbHVtbnMpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNvbHVtbnM7IGorKykge1xuICAgICAgICBpZiAoaSA8PSBqKSB7XG4gICAgICAgICAgWC5zZXQoaSwgaiwgZGF0YS5nZXQoaSwgaikpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIFguc2V0KGksIGosIDApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBYO1xuICB9XG5cbiAgZ2V0IHBpdm90UGVybXV0YXRpb25WZWN0b3IoKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5waXZvdFZlY3Rvcik7XG4gIH1cbn1cbiIsImltcG9ydCBNYXRyaXggZnJvbSAnLi4vbWF0cml4JztcbmltcG9ydCBXcmFwcGVyTWF0cml4MkQgZnJvbSAnLi4vd3JhcC9XcmFwcGVyTWF0cml4MkQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBuaXBhbHMge1xuICBjb25zdHJ1Y3RvcihYLCBvcHRpb25zID0ge30pIHtcbiAgICBYID0gV3JhcHBlck1hdHJpeDJELmNoZWNrTWF0cml4KFgpO1xuICAgIGxldCB7IFkgfSA9IG9wdGlvbnM7XG4gICAgY29uc3Qge1xuICAgICAgc2NhbGVTY29yZXMgPSBmYWxzZSxcbiAgICAgIG1heEl0ZXJhdGlvbnMgPSAxMDAwLFxuICAgICAgdGVybWluYXRpb25Dcml0ZXJpYSA9IDFlLTEwLFxuICAgIH0gPSBvcHRpb25zO1xuXG4gICAgbGV0IHU7XG4gICAgaWYgKFkpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KFkpICYmIHR5cGVvZiBZWzBdID09PSAnbnVtYmVyJykge1xuICAgICAgICBZID0gTWF0cml4LmNvbHVtblZlY3RvcihZKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFkgPSBXcmFwcGVyTWF0cml4MkQuY2hlY2tNYXRyaXgoWSk7XG4gICAgICB9XG4gICAgICBpZiAoIVkuaXNDb2x1bW5WZWN0b3IoKSB8fCBZLnJvd3MgIT09IFgucm93cykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1kgbXVzdCBiZSBhIGNvbHVtbiB2ZWN0b3Igb2YgbGVuZ3RoIFgucm93cycpO1xuICAgICAgfVxuICAgICAgdSA9IFk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHUgPSBYLmdldENvbHVtblZlY3RvcigwKTtcbiAgICB9XG5cbiAgICBsZXQgZGlmZiA9IDE7XG4gICAgbGV0IHQsIHEsIHcsIHRPbGQ7XG5cbiAgICBmb3IgKFxuICAgICAgbGV0IGNvdW50ZXIgPSAwO1xuICAgICAgY291bnRlciA8IG1heEl0ZXJhdGlvbnMgJiYgZGlmZiA+IHRlcm1pbmF0aW9uQ3JpdGVyaWE7XG4gICAgICBjb3VudGVyKytcbiAgICApIHtcbiAgICAgIHcgPSBYLnRyYW5zcG9zZSgpLm1tdWwodSkuZGl2KHUudHJhbnNwb3NlKCkubW11bCh1KS5nZXQoMCwgMCkpO1xuICAgICAgdyA9IHcuZGl2KHcubm9ybSgpKTtcblxuICAgICAgdCA9IFgubW11bCh3KS5kaXYody50cmFuc3Bvc2UoKS5tbXVsKHcpLmdldCgwLCAwKSk7XG5cbiAgICAgIGlmIChjb3VudGVyID4gMCkge1xuICAgICAgICBkaWZmID0gdC5jbG9uZSgpLnN1Yih0T2xkKS5wb3coMikuc3VtKCk7XG4gICAgICB9XG4gICAgICB0T2xkID0gdC5jbG9uZSgpO1xuXG4gICAgICBpZiAoWSkge1xuICAgICAgICBxID0gWS50cmFuc3Bvc2UoKS5tbXVsKHQpLmRpdih0LnRyYW5zcG9zZSgpLm1tdWwodCkuZ2V0KDAsIDApKTtcbiAgICAgICAgcSA9IHEuZGl2KHEubm9ybSgpKTtcblxuICAgICAgICB1ID0gWS5tbXVsKHEpLmRpdihxLnRyYW5zcG9zZSgpLm1tdWwocSkuZ2V0KDAsIDApKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHUgPSB0O1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChZKSB7XG4gICAgICBsZXQgcCA9IFgudHJhbnNwb3NlKCkubW11bCh0KS5kaXYodC50cmFuc3Bvc2UoKS5tbXVsKHQpLmdldCgwLCAwKSk7XG4gICAgICBwID0gcC5kaXYocC5ub3JtKCkpO1xuICAgICAgbGV0IHhSZXNpZHVhbCA9IFguY2xvbmUoKS5zdWIodC5jbG9uZSgpLm1tdWwocC50cmFuc3Bvc2UoKSkpO1xuICAgICAgbGV0IHJlc2lkdWFsID0gdS50cmFuc3Bvc2UoKS5tbXVsKHQpLmRpdih0LnRyYW5zcG9zZSgpLm1tdWwodCkuZ2V0KDAsIDApKTtcbiAgICAgIGxldCB5UmVzaWR1YWwgPSBZLmNsb25lKCkuc3ViKFxuICAgICAgICB0LmNsb25lKCkubXVsUyhyZXNpZHVhbC5nZXQoMCwgMCkpLm1tdWwocS50cmFuc3Bvc2UoKSksXG4gICAgICApO1xuXG4gICAgICB0aGlzLnQgPSB0O1xuICAgICAgdGhpcy5wID0gcC50cmFuc3Bvc2UoKTtcbiAgICAgIHRoaXMudyA9IHcudHJhbnNwb3NlKCk7XG4gICAgICB0aGlzLnEgPSBxO1xuICAgICAgdGhpcy51ID0gdTtcbiAgICAgIHRoaXMucyA9IHQudHJhbnNwb3NlKCkubW11bCh0KTtcbiAgICAgIHRoaXMueFJlc2lkdWFsID0geFJlc2lkdWFsO1xuICAgICAgdGhpcy55UmVzaWR1YWwgPSB5UmVzaWR1YWw7XG4gICAgICB0aGlzLmJldGFzID0gcmVzaWR1YWw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudyA9IHcudHJhbnNwb3NlKCk7XG4gICAgICB0aGlzLnMgPSB0LnRyYW5zcG9zZSgpLm1tdWwodCkuc3FydCgpO1xuICAgICAgaWYgKHNjYWxlU2NvcmVzKSB7XG4gICAgICAgIHRoaXMudCA9IHQuY2xvbmUoKS5kaXYodGhpcy5zLmdldCgwLCAwKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnQgPSB0O1xuICAgICAgfVxuICAgICAgdGhpcy54UmVzaWR1YWwgPSBYLnN1Yih0Lm1tdWwody50cmFuc3Bvc2UoKSkpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IE1hdHJpeCBmcm9tICcuLi9tYXRyaXgnO1xuaW1wb3J0IFdyYXBwZXJNYXRyaXgyRCBmcm9tICcuLi93cmFwL1dyYXBwZXJNYXRyaXgyRCc7XG5cbmltcG9ydCB7IGh5cG90ZW51c2UgfSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBRckRlY29tcG9zaXRpb24ge1xuICBjb25zdHJ1Y3Rvcih2YWx1ZSkge1xuICAgIHZhbHVlID0gV3JhcHBlck1hdHJpeDJELmNoZWNrTWF0cml4KHZhbHVlKTtcblxuICAgIGxldCBxciA9IHZhbHVlLmNsb25lKCk7XG4gICAgbGV0IG0gPSB2YWx1ZS5yb3dzO1xuICAgIGxldCBuID0gdmFsdWUuY29sdW1ucztcbiAgICBsZXQgcmRpYWcgPSBuZXcgRmxvYXQ2NEFycmF5KG4pO1xuICAgIGxldCBpLCBqLCBrLCBzO1xuXG4gICAgZm9yIChrID0gMDsgayA8IG47IGsrKykge1xuICAgICAgbGV0IG5ybSA9IDA7XG4gICAgICBmb3IgKGkgPSBrOyBpIDwgbTsgaSsrKSB7XG4gICAgICAgIG5ybSA9IGh5cG90ZW51c2UobnJtLCBxci5nZXQoaSwgaykpO1xuICAgICAgfVxuICAgICAgaWYgKG5ybSAhPT0gMCkge1xuICAgICAgICBpZiAocXIuZ2V0KGssIGspIDwgMCkge1xuICAgICAgICAgIG5ybSA9IC1ucm07XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gazsgaSA8IG07IGkrKykge1xuICAgICAgICAgIHFyLnNldChpLCBrLCBxci5nZXQoaSwgaykgLyBucm0pO1xuICAgICAgICB9XG4gICAgICAgIHFyLnNldChrLCBrLCBxci5nZXQoaywgaykgKyAxKTtcbiAgICAgICAgZm9yIChqID0gayArIDE7IGogPCBuOyBqKyspIHtcbiAgICAgICAgICBzID0gMDtcbiAgICAgICAgICBmb3IgKGkgPSBrOyBpIDwgbTsgaSsrKSB7XG4gICAgICAgICAgICBzICs9IHFyLmdldChpLCBrKSAqIHFyLmdldChpLCBqKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcyA9IC1zIC8gcXIuZ2V0KGssIGspO1xuICAgICAgICAgIGZvciAoaSA9IGs7IGkgPCBtOyBpKyspIHtcbiAgICAgICAgICAgIHFyLnNldChpLCBqLCBxci5nZXQoaSwgaikgKyBzICogcXIuZ2V0KGksIGspKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJkaWFnW2tdID0gLW5ybTtcbiAgICB9XG5cbiAgICB0aGlzLlFSID0gcXI7XG4gICAgdGhpcy5SZGlhZyA9IHJkaWFnO1xuICB9XG5cbiAgc29sdmUodmFsdWUpIHtcbiAgICB2YWx1ZSA9IE1hdHJpeC5jaGVja01hdHJpeCh2YWx1ZSk7XG5cbiAgICBsZXQgcXIgPSB0aGlzLlFSO1xuICAgIGxldCBtID0gcXIucm93cztcblxuICAgIGlmICh2YWx1ZS5yb3dzICE9PSBtKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hdHJpeCByb3cgZGltZW5zaW9ucyBtdXN0IGFncmVlJyk7XG4gICAgfVxuICAgIGlmICghdGhpcy5pc0Z1bGxSYW5rKCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWF0cml4IGlzIHJhbmsgZGVmaWNpZW50Jyk7XG4gICAgfVxuXG4gICAgbGV0IGNvdW50ID0gdmFsdWUuY29sdW1ucztcbiAgICBsZXQgWCA9IHZhbHVlLmNsb25lKCk7XG4gICAgbGV0IG4gPSBxci5jb2x1bW5zO1xuICAgIGxldCBpLCBqLCBrLCBzO1xuXG4gICAgZm9yIChrID0gMDsgayA8IG47IGsrKykge1xuICAgICAgZm9yIChqID0gMDsgaiA8IGNvdW50OyBqKyspIHtcbiAgICAgICAgcyA9IDA7XG4gICAgICAgIGZvciAoaSA9IGs7IGkgPCBtOyBpKyspIHtcbiAgICAgICAgICBzICs9IHFyLmdldChpLCBrKSAqIFguZ2V0KGksIGopO1xuICAgICAgICB9XG4gICAgICAgIHMgPSAtcyAvIHFyLmdldChrLCBrKTtcbiAgICAgICAgZm9yIChpID0gazsgaSA8IG07IGkrKykge1xuICAgICAgICAgIFguc2V0KGksIGosIFguZ2V0KGksIGopICsgcyAqIHFyLmdldChpLCBrKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChrID0gbiAtIDE7IGsgPj0gMDsgay0tKSB7XG4gICAgICBmb3IgKGogPSAwOyBqIDwgY291bnQ7IGorKykge1xuICAgICAgICBYLnNldChrLCBqLCBYLmdldChrLCBqKSAvIHRoaXMuUmRpYWdba10pO1xuICAgICAgfVxuICAgICAgZm9yIChpID0gMDsgaSA8IGs7IGkrKykge1xuICAgICAgICBmb3IgKGogPSAwOyBqIDwgY291bnQ7IGorKykge1xuICAgICAgICAgIFguc2V0KGksIGosIFguZ2V0KGksIGopIC0gWC5nZXQoaywgaikgKiBxci5nZXQoaSwgaykpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFguc3ViTWF0cml4KDAsIG4gLSAxLCAwLCBjb3VudCAtIDEpO1xuICB9XG5cbiAgaXNGdWxsUmFuaygpIHtcbiAgICBsZXQgY29sdW1ucyA9IHRoaXMuUVIuY29sdW1ucztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbHVtbnM7IGkrKykge1xuICAgICAgaWYgKHRoaXMuUmRpYWdbaV0gPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGdldCB1cHBlclRyaWFuZ3VsYXJNYXRyaXgoKSB7XG4gICAgbGV0IHFyID0gdGhpcy5RUjtcbiAgICBsZXQgbiA9IHFyLmNvbHVtbnM7XG4gICAgbGV0IFggPSBuZXcgTWF0cml4KG4sIG4pO1xuICAgIGxldCBpLCBqO1xuICAgIGZvciAoaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgIGZvciAoaiA9IDA7IGogPCBuOyBqKyspIHtcbiAgICAgICAgaWYgKGkgPCBqKSB7XG4gICAgICAgICAgWC5zZXQoaSwgaiwgcXIuZ2V0KGksIGopKTtcbiAgICAgICAgfSBlbHNlIGlmIChpID09PSBqKSB7XG4gICAgICAgICAgWC5zZXQoaSwgaiwgdGhpcy5SZGlhZ1tpXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgWC5zZXQoaSwgaiwgMCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFg7XG4gIH1cblxuICBnZXQgb3J0aG9nb25hbE1hdHJpeCgpIHtcbiAgICBsZXQgcXIgPSB0aGlzLlFSO1xuICAgIGxldCByb3dzID0gcXIucm93cztcbiAgICBsZXQgY29sdW1ucyA9IHFyLmNvbHVtbnM7XG4gICAgbGV0IFggPSBuZXcgTWF0cml4KHJvd3MsIGNvbHVtbnMpO1xuICAgIGxldCBpLCBqLCBrLCBzO1xuXG4gICAgZm9yIChrID0gY29sdW1ucyAtIDE7IGsgPj0gMDsgay0tKSB7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgcm93czsgaSsrKSB7XG4gICAgICAgIFguc2V0KGksIGssIDApO1xuICAgICAgfVxuICAgICAgWC5zZXQoaywgaywgMSk7XG4gICAgICBmb3IgKGogPSBrOyBqIDwgY29sdW1uczsgaisrKSB7XG4gICAgICAgIGlmIChxci5nZXQoaywgaykgIT09IDApIHtcbiAgICAgICAgICBzID0gMDtcbiAgICAgICAgICBmb3IgKGkgPSBrOyBpIDwgcm93czsgaSsrKSB7XG4gICAgICAgICAgICBzICs9IHFyLmdldChpLCBrKSAqIFguZ2V0KGksIGopO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHMgPSAtcyAvIHFyLmdldChrLCBrKTtcblxuICAgICAgICAgIGZvciAoaSA9IGs7IGkgPCByb3dzOyBpKyspIHtcbiAgICAgICAgICAgIFguc2V0KGksIGosIFguZ2V0KGksIGopICsgcyAqIHFyLmdldChpLCBrKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBYO1xuICB9XG59XG4iLCJpbXBvcnQgTWF0cml4IGZyb20gJy4uL21hdHJpeCc7XG5pbXBvcnQgV3JhcHBlck1hdHJpeDJEIGZyb20gJy4uL3dyYXAvV3JhcHBlck1hdHJpeDJEJztcblxuaW1wb3J0IHsgaHlwb3RlbnVzZSB9IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNpbmd1bGFyVmFsdWVEZWNvbXBvc2l0aW9uIHtcbiAgY29uc3RydWN0b3IodmFsdWUsIG9wdGlvbnMgPSB7fSkge1xuICAgIHZhbHVlID0gV3JhcHBlck1hdHJpeDJELmNoZWNrTWF0cml4KHZhbHVlKTtcblxuICAgIGxldCBtID0gdmFsdWUucm93cztcbiAgICBsZXQgbiA9IHZhbHVlLmNvbHVtbnM7XG5cbiAgICBjb25zdCB7XG4gICAgICBjb21wdXRlTGVmdFNpbmd1bGFyVmVjdG9ycyA9IHRydWUsXG4gICAgICBjb21wdXRlUmlnaHRTaW5ndWxhclZlY3RvcnMgPSB0cnVlLFxuICAgICAgYXV0b1RyYW5zcG9zZSA9IGZhbHNlLFxuICAgIH0gPSBvcHRpb25zO1xuXG4gICAgbGV0IHdhbnR1ID0gQm9vbGVhbihjb21wdXRlTGVmdFNpbmd1bGFyVmVjdG9ycyk7XG4gICAgbGV0IHdhbnR2ID0gQm9vbGVhbihjb21wdXRlUmlnaHRTaW5ndWxhclZlY3RvcnMpO1xuXG4gICAgbGV0IHN3YXBwZWQgPSBmYWxzZTtcbiAgICBsZXQgYTtcbiAgICBpZiAobSA8IG4pIHtcbiAgICAgIGlmICghYXV0b1RyYW5zcG9zZSkge1xuICAgICAgICBhID0gdmFsdWUuY2xvbmUoKTtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICdDb21wdXRpbmcgU1ZEIG9uIGEgbWF0cml4IHdpdGggbW9yZSBjb2x1bW5zIHRoYW4gcm93cy4gQ29uc2lkZXIgZW5hYmxpbmcgYXV0b1RyYW5zcG9zZScsXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhID0gdmFsdWUudHJhbnNwb3NlKCk7XG4gICAgICAgIG0gPSBhLnJvd3M7XG4gICAgICAgIG4gPSBhLmNvbHVtbnM7XG4gICAgICAgIHN3YXBwZWQgPSB0cnVlO1xuICAgICAgICBsZXQgYXV4ID0gd2FudHU7XG4gICAgICAgIHdhbnR1ID0gd2FudHY7XG4gICAgICAgIHdhbnR2ID0gYXV4O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBhID0gdmFsdWUuY2xvbmUoKTtcbiAgICB9XG5cbiAgICBsZXQgbnUgPSBNYXRoLm1pbihtLCBuKTtcbiAgICBsZXQgbmkgPSBNYXRoLm1pbihtICsgMSwgbik7XG4gICAgbGV0IHMgPSBuZXcgRmxvYXQ2NEFycmF5KG5pKTtcbiAgICBsZXQgVSA9IG5ldyBNYXRyaXgobSwgbnUpO1xuICAgIGxldCBWID0gbmV3IE1hdHJpeChuLCBuKTtcblxuICAgIGxldCBlID0gbmV3IEZsb2F0NjRBcnJheShuKTtcbiAgICBsZXQgd29yayA9IG5ldyBGbG9hdDY0QXJyYXkobSk7XG5cbiAgICBsZXQgc2kgPSBuZXcgRmxvYXQ2NEFycmF5KG5pKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5pOyBpKyspIHNpW2ldID0gaTtcblxuICAgIGxldCBuY3QgPSBNYXRoLm1pbihtIC0gMSwgbik7XG4gICAgbGV0IG5ydCA9IE1hdGgubWF4KDAsIE1hdGgubWluKG4gLSAyLCBtKSk7XG4gICAgbGV0IG1yYyA9IE1hdGgubWF4KG5jdCwgbnJ0KTtcblxuICAgIGZvciAobGV0IGsgPSAwOyBrIDwgbXJjOyBrKyspIHtcbiAgICAgIGlmIChrIDwgbmN0KSB7XG4gICAgICAgIHNba10gPSAwO1xuICAgICAgICBmb3IgKGxldCBpID0gazsgaSA8IG07IGkrKykge1xuICAgICAgICAgIHNba10gPSBoeXBvdGVudXNlKHNba10sIGEuZ2V0KGksIGspKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc1trXSAhPT0gMCkge1xuICAgICAgICAgIGlmIChhLmdldChrLCBrKSA8IDApIHtcbiAgICAgICAgICAgIHNba10gPSAtc1trXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZm9yIChsZXQgaSA9IGs7IGkgPCBtOyBpKyspIHtcbiAgICAgICAgICAgIGEuc2V0KGksIGssIGEuZ2V0KGksIGspIC8gc1trXSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGEuc2V0KGssIGssIGEuZ2V0KGssIGspICsgMSk7XG4gICAgICAgIH1cbiAgICAgICAgc1trXSA9IC1zW2tdO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBqID0gayArIDE7IGogPCBuOyBqKyspIHtcbiAgICAgICAgaWYgKGsgPCBuY3QgJiYgc1trXSAhPT0gMCkge1xuICAgICAgICAgIGxldCB0ID0gMDtcbiAgICAgICAgICBmb3IgKGxldCBpID0gazsgaSA8IG07IGkrKykge1xuICAgICAgICAgICAgdCArPSBhLmdldChpLCBrKSAqIGEuZ2V0KGksIGopO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0ID0gLXQgLyBhLmdldChrLCBrKTtcbiAgICAgICAgICBmb3IgKGxldCBpID0gazsgaSA8IG07IGkrKykge1xuICAgICAgICAgICAgYS5zZXQoaSwgaiwgYS5nZXQoaSwgaikgKyB0ICogYS5nZXQoaSwgaykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlW2pdID0gYS5nZXQoaywgaik7XG4gICAgICB9XG5cbiAgICAgIGlmICh3YW50dSAmJiBrIDwgbmN0KSB7XG4gICAgICAgIGZvciAobGV0IGkgPSBrOyBpIDwgbTsgaSsrKSB7XG4gICAgICAgICAgVS5zZXQoaSwgaywgYS5nZXQoaSwgaykpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChrIDwgbnJ0KSB7XG4gICAgICAgIGVba10gPSAwO1xuICAgICAgICBmb3IgKGxldCBpID0gayArIDE7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICBlW2tdID0gaHlwb3RlbnVzZShlW2tdLCBlW2ldKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZVtrXSAhPT0gMCkge1xuICAgICAgICAgIGlmIChlW2sgKyAxXSA8IDApIHtcbiAgICAgICAgICAgIGVba10gPSAwIC0gZVtrXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZm9yIChsZXQgaSA9IGsgKyAxOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBlW2ldIC89IGVba107XG4gICAgICAgICAgfVxuICAgICAgICAgIGVbayArIDFdICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgZVtrXSA9IC1lW2tdO1xuICAgICAgICBpZiAoayArIDEgPCBtICYmIGVba10gIT09IDApIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gayArIDE7IGkgPCBtOyBpKyspIHtcbiAgICAgICAgICAgIHdvcmtbaV0gPSAwO1xuICAgICAgICAgIH1cbiAgICAgICAgICBmb3IgKGxldCBpID0gayArIDE7IGkgPCBtOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSBrICsgMTsgaiA8IG47IGorKykge1xuICAgICAgICAgICAgICB3b3JrW2ldICs9IGVbal0gKiBhLmdldChpLCBqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZm9yIChsZXQgaiA9IGsgKyAxOyBqIDwgbjsgaisrKSB7XG4gICAgICAgICAgICBsZXQgdCA9IC1lW2pdIC8gZVtrICsgMV07XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gayArIDE7IGkgPCBtOyBpKyspIHtcbiAgICAgICAgICAgICAgYS5zZXQoaSwgaiwgYS5nZXQoaSwgaikgKyB0ICogd29ya1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh3YW50dikge1xuICAgICAgICAgIGZvciAobGV0IGkgPSBrICsgMTsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgVi5zZXQoaSwgaywgZVtpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHAgPSBNYXRoLm1pbihuLCBtICsgMSk7XG4gICAgaWYgKG5jdCA8IG4pIHtcbiAgICAgIHNbbmN0XSA9IGEuZ2V0KG5jdCwgbmN0KTtcbiAgICB9XG4gICAgaWYgKG0gPCBwKSB7XG4gICAgICBzW3AgLSAxXSA9IDA7XG4gICAgfVxuICAgIGlmIChucnQgKyAxIDwgcCkge1xuICAgICAgZVtucnRdID0gYS5nZXQobnJ0LCBwIC0gMSk7XG4gICAgfVxuICAgIGVbcCAtIDFdID0gMDtcblxuICAgIGlmICh3YW50dSkge1xuICAgICAgZm9yIChsZXQgaiA9IG5jdDsgaiA8IG51OyBqKyspIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtOyBpKyspIHtcbiAgICAgICAgICBVLnNldChpLCBqLCAwKTtcbiAgICAgICAgfVxuICAgICAgICBVLnNldChqLCBqLCAxKTtcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGsgPSBuY3QgLSAxOyBrID49IDA7IGstLSkge1xuICAgICAgICBpZiAoc1trXSAhPT0gMCkge1xuICAgICAgICAgIGZvciAobGV0IGogPSBrICsgMTsgaiA8IG51OyBqKyspIHtcbiAgICAgICAgICAgIGxldCB0ID0gMDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBrOyBpIDwgbTsgaSsrKSB7XG4gICAgICAgICAgICAgIHQgKz0gVS5nZXQoaSwgaykgKiBVLmdldChpLCBqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHQgPSAtdCAvIFUuZ2V0KGssIGspO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IGs7IGkgPCBtOyBpKyspIHtcbiAgICAgICAgICAgICAgVS5zZXQoaSwgaiwgVS5nZXQoaSwgaikgKyB0ICogVS5nZXQoaSwgaykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBmb3IgKGxldCBpID0gazsgaSA8IG07IGkrKykge1xuICAgICAgICAgICAgVS5zZXQoaSwgaywgLVUuZ2V0KGksIGspKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgVS5zZXQoaywgaywgMSArIFUuZ2V0KGssIGspKTtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGsgLSAxOyBpKyspIHtcbiAgICAgICAgICAgIFUuc2V0KGksIGssIDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG07IGkrKykge1xuICAgICAgICAgICAgVS5zZXQoaSwgaywgMCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIFUuc2V0KGssIGssIDEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHdhbnR2KSB7XG4gICAgICBmb3IgKGxldCBrID0gbiAtIDE7IGsgPj0gMDsgay0tKSB7XG4gICAgICAgIGlmIChrIDwgbnJ0ICYmIGVba10gIT09IDApIHtcbiAgICAgICAgICBmb3IgKGxldCBqID0gayArIDE7IGogPCBuOyBqKyspIHtcbiAgICAgICAgICAgIGxldCB0ID0gMDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBrICsgMTsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgICB0ICs9IFYuZ2V0KGksIGspICogVi5nZXQoaSwgaik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0ID0gLXQgLyBWLmdldChrICsgMSwgayk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gayArIDE7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgICAgVi5zZXQoaSwgaiwgVi5nZXQoaSwgaikgKyB0ICogVi5nZXQoaSwgaykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgICAgIFYuc2V0KGksIGssIDApO1xuICAgICAgICB9XG4gICAgICAgIFYuc2V0KGssIGssIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBwcCA9IHAgLSAxO1xuICAgIGxldCBpdGVyID0gMDtcbiAgICBsZXQgZXBzID0gTnVtYmVyLkVQU0lMT047XG4gICAgd2hpbGUgKHAgPiAwKSB7XG4gICAgICBsZXQgaywga2FzZTtcbiAgICAgIGZvciAoayA9IHAgLSAyOyBrID49IC0xOyBrLS0pIHtcbiAgICAgICAgaWYgKGsgPT09IC0xKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYWxwaGEgPVxuICAgICAgICAgIE51bWJlci5NSU5fVkFMVUUgKyBlcHMgKiBNYXRoLmFicyhzW2tdICsgTWF0aC5hYnMoc1trICsgMV0pKTtcbiAgICAgICAgaWYgKE1hdGguYWJzKGVba10pIDw9IGFscGhhIHx8IE51bWJlci5pc05hTihlW2tdKSkge1xuICAgICAgICAgIGVba10gPSAwO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoayA9PT0gcCAtIDIpIHtcbiAgICAgICAga2FzZSA9IDQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQga3M7XG4gICAgICAgIGZvciAoa3MgPSBwIC0gMTsga3MgPj0gazsga3MtLSkge1xuICAgICAgICAgIGlmIChrcyA9PT0gaykge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxldCB0ID1cbiAgICAgICAgICAgIChrcyAhPT0gcCA/IE1hdGguYWJzKGVba3NdKSA6IDApICtcbiAgICAgICAgICAgIChrcyAhPT0gayArIDEgPyBNYXRoLmFicyhlW2tzIC0gMV0pIDogMCk7XG4gICAgICAgICAgaWYgKE1hdGguYWJzKHNba3NdKSA8PSBlcHMgKiB0KSB7XG4gICAgICAgICAgICBzW2tzXSA9IDA7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGtzID09PSBrKSB7XG4gICAgICAgICAga2FzZSA9IDM7XG4gICAgICAgIH0gZWxzZSBpZiAoa3MgPT09IHAgLSAxKSB7XG4gICAgICAgICAga2FzZSA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAga2FzZSA9IDI7XG4gICAgICAgICAgayA9IGtzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGsrKztcblxuICAgICAgc3dpdGNoIChrYXNlKSB7XG4gICAgICAgIGNhc2UgMToge1xuICAgICAgICAgIGxldCBmID0gZVtwIC0gMl07XG4gICAgICAgICAgZVtwIC0gMl0gPSAwO1xuICAgICAgICAgIGZvciAobGV0IGogPSBwIC0gMjsgaiA+PSBrOyBqLS0pIHtcbiAgICAgICAgICAgIGxldCB0ID0gaHlwb3RlbnVzZShzW2pdLCBmKTtcbiAgICAgICAgICAgIGxldCBjcyA9IHNbal0gLyB0O1xuICAgICAgICAgICAgbGV0IHNuID0gZiAvIHQ7XG4gICAgICAgICAgICBzW2pdID0gdDtcbiAgICAgICAgICAgIGlmIChqICE9PSBrKSB7XG4gICAgICAgICAgICAgIGYgPSAtc24gKiBlW2ogLSAxXTtcbiAgICAgICAgICAgICAgZVtqIC0gMV0gPSBjcyAqIGVbaiAtIDFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHdhbnR2KSB7XG4gICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdCA9IGNzICogVi5nZXQoaSwgaikgKyBzbiAqIFYuZ2V0KGksIHAgLSAxKTtcbiAgICAgICAgICAgICAgICBWLnNldChpLCBwIC0gMSwgLXNuICogVi5nZXQoaSwgaikgKyBjcyAqIFYuZ2V0KGksIHAgLSAxKSk7XG4gICAgICAgICAgICAgICAgVi5zZXQoaSwgaiwgdCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAyOiB7XG4gICAgICAgICAgbGV0IGYgPSBlW2sgLSAxXTtcbiAgICAgICAgICBlW2sgLSAxXSA9IDA7XG4gICAgICAgICAgZm9yIChsZXQgaiA9IGs7IGogPCBwOyBqKyspIHtcbiAgICAgICAgICAgIGxldCB0ID0gaHlwb3RlbnVzZShzW2pdLCBmKTtcbiAgICAgICAgICAgIGxldCBjcyA9IHNbal0gLyB0O1xuICAgICAgICAgICAgbGV0IHNuID0gZiAvIHQ7XG4gICAgICAgICAgICBzW2pdID0gdDtcbiAgICAgICAgICAgIGYgPSAtc24gKiBlW2pdO1xuICAgICAgICAgICAgZVtqXSA9IGNzICogZVtqXTtcbiAgICAgICAgICAgIGlmICh3YW50dSkge1xuICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG07IGkrKykge1xuICAgICAgICAgICAgICAgIHQgPSBjcyAqIFUuZ2V0KGksIGopICsgc24gKiBVLmdldChpLCBrIC0gMSk7XG4gICAgICAgICAgICAgICAgVS5zZXQoaSwgayAtIDEsIC1zbiAqIFUuZ2V0KGksIGopICsgY3MgKiBVLmdldChpLCBrIC0gMSkpO1xuICAgICAgICAgICAgICAgIFUuc2V0KGksIGosIHQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgMzoge1xuICAgICAgICAgIGNvbnN0IHNjYWxlID0gTWF0aC5tYXgoXG4gICAgICAgICAgICBNYXRoLmFicyhzW3AgLSAxXSksXG4gICAgICAgICAgICBNYXRoLmFicyhzW3AgLSAyXSksXG4gICAgICAgICAgICBNYXRoLmFicyhlW3AgLSAyXSksXG4gICAgICAgICAgICBNYXRoLmFicyhzW2tdKSxcbiAgICAgICAgICAgIE1hdGguYWJzKGVba10pLFxuICAgICAgICAgICk7XG4gICAgICAgICAgY29uc3Qgc3AgPSBzW3AgLSAxXSAvIHNjYWxlO1xuICAgICAgICAgIGNvbnN0IHNwbTEgPSBzW3AgLSAyXSAvIHNjYWxlO1xuICAgICAgICAgIGNvbnN0IGVwbTEgPSBlW3AgLSAyXSAvIHNjYWxlO1xuICAgICAgICAgIGNvbnN0IHNrID0gc1trXSAvIHNjYWxlO1xuICAgICAgICAgIGNvbnN0IGVrID0gZVtrXSAvIHNjYWxlO1xuICAgICAgICAgIGNvbnN0IGIgPSAoKHNwbTEgKyBzcCkgKiAoc3BtMSAtIHNwKSArIGVwbTEgKiBlcG0xKSAvIDI7XG4gICAgICAgICAgY29uc3QgYyA9IHNwICogZXBtMSAqIChzcCAqIGVwbTEpO1xuICAgICAgICAgIGxldCBzaGlmdCA9IDA7XG4gICAgICAgICAgaWYgKGIgIT09IDAgfHwgYyAhPT0gMCkge1xuICAgICAgICAgICAgaWYgKGIgPCAwKSB7XG4gICAgICAgICAgICAgIHNoaWZ0ID0gMCAtIE1hdGguc3FydChiICogYiArIGMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc2hpZnQgPSBNYXRoLnNxcnQoYiAqIGIgKyBjKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNoaWZ0ID0gYyAvIChiICsgc2hpZnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsZXQgZiA9IChzayArIHNwKSAqIChzayAtIHNwKSArIHNoaWZ0O1xuICAgICAgICAgIGxldCBnID0gc2sgKiBlaztcbiAgICAgICAgICBmb3IgKGxldCBqID0gazsgaiA8IHAgLSAxOyBqKyspIHtcbiAgICAgICAgICAgIGxldCB0ID0gaHlwb3RlbnVzZShmLCBnKTtcbiAgICAgICAgICAgIGlmICh0ID09PSAwKSB0ID0gTnVtYmVyLk1JTl9WQUxVRTtcbiAgICAgICAgICAgIGxldCBjcyA9IGYgLyB0O1xuICAgICAgICAgICAgbGV0IHNuID0gZyAvIHQ7XG4gICAgICAgICAgICBpZiAoaiAhPT0gaykge1xuICAgICAgICAgICAgICBlW2ogLSAxXSA9IHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmID0gY3MgKiBzW2pdICsgc24gKiBlW2pdO1xuICAgICAgICAgICAgZVtqXSA9IGNzICogZVtqXSAtIHNuICogc1tqXTtcbiAgICAgICAgICAgIGcgPSBzbiAqIHNbaiArIDFdO1xuICAgICAgICAgICAgc1tqICsgMV0gPSBjcyAqIHNbaiArIDFdO1xuICAgICAgICAgICAgaWYgKHdhbnR2KSB7XG4gICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdCA9IGNzICogVi5nZXQoaSwgaikgKyBzbiAqIFYuZ2V0KGksIGogKyAxKTtcbiAgICAgICAgICAgICAgICBWLnNldChpLCBqICsgMSwgLXNuICogVi5nZXQoaSwgaikgKyBjcyAqIFYuZ2V0KGksIGogKyAxKSk7XG4gICAgICAgICAgICAgICAgVi5zZXQoaSwgaiwgdCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHQgPSBoeXBvdGVudXNlKGYsIGcpO1xuICAgICAgICAgICAgaWYgKHQgPT09IDApIHQgPSBOdW1iZXIuTUlOX1ZBTFVFO1xuICAgICAgICAgICAgY3MgPSBmIC8gdDtcbiAgICAgICAgICAgIHNuID0gZyAvIHQ7XG4gICAgICAgICAgICBzW2pdID0gdDtcbiAgICAgICAgICAgIGYgPSBjcyAqIGVbal0gKyBzbiAqIHNbaiArIDFdO1xuICAgICAgICAgICAgc1tqICsgMV0gPSAtc24gKiBlW2pdICsgY3MgKiBzW2ogKyAxXTtcbiAgICAgICAgICAgIGcgPSBzbiAqIGVbaiArIDFdO1xuICAgICAgICAgICAgZVtqICsgMV0gPSBjcyAqIGVbaiArIDFdO1xuICAgICAgICAgICAgaWYgKHdhbnR1ICYmIGogPCBtIC0gMSkge1xuICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG07IGkrKykge1xuICAgICAgICAgICAgICAgIHQgPSBjcyAqIFUuZ2V0KGksIGopICsgc24gKiBVLmdldChpLCBqICsgMSk7XG4gICAgICAgICAgICAgICAgVS5zZXQoaSwgaiArIDEsIC1zbiAqIFUuZ2V0KGksIGopICsgY3MgKiBVLmdldChpLCBqICsgMSkpO1xuICAgICAgICAgICAgICAgIFUuc2V0KGksIGosIHQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGVbcCAtIDJdID0gZjtcbiAgICAgICAgICBpdGVyID0gaXRlciArIDE7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSA0OiB7XG4gICAgICAgICAgaWYgKHNba10gPD0gMCkge1xuICAgICAgICAgICAgc1trXSA9IHNba10gPCAwID8gLXNba10gOiAwO1xuICAgICAgICAgICAgaWYgKHdhbnR2KSB7XG4gICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IHBwOyBpKyspIHtcbiAgICAgICAgICAgICAgICBWLnNldChpLCBrLCAtVi5nZXQoaSwgaykpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHdoaWxlIChrIDwgcHApIHtcbiAgICAgICAgICAgIGlmIChzW2tdID49IHNbayArIDFdKSB7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHQgPSBzW2tdO1xuICAgICAgICAgICAgc1trXSA9IHNbayArIDFdO1xuICAgICAgICAgICAgc1trICsgMV0gPSB0O1xuICAgICAgICAgICAgaWYgKHdhbnR2ICYmIGsgPCBuIC0gMSkge1xuICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgICAgIHQgPSBWLmdldChpLCBrICsgMSk7XG4gICAgICAgICAgICAgICAgVi5zZXQoaSwgayArIDEsIFYuZ2V0KGksIGspKTtcbiAgICAgICAgICAgICAgICBWLnNldChpLCBrLCB0KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHdhbnR1ICYmIGsgPCBtIC0gMSkge1xuICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG07IGkrKykge1xuICAgICAgICAgICAgICAgIHQgPSBVLmdldChpLCBrICsgMSk7XG4gICAgICAgICAgICAgICAgVS5zZXQoaSwgayArIDEsIFUuZ2V0KGksIGspKTtcbiAgICAgICAgICAgICAgICBVLnNldChpLCBrLCB0KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaysrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpdGVyID0gMDtcbiAgICAgICAgICBwLS07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgLy8gbm8gZGVmYXVsdFxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzd2FwcGVkKSB7XG4gICAgICBsZXQgdG1wID0gVjtcbiAgICAgIFYgPSBVO1xuICAgICAgVSA9IHRtcDtcbiAgICB9XG5cbiAgICB0aGlzLm0gPSBtO1xuICAgIHRoaXMubiA9IG47XG4gICAgdGhpcy5zID0gcztcbiAgICB0aGlzLlUgPSBVO1xuICAgIHRoaXMuViA9IFY7XG4gIH1cblxuICBzb2x2ZSh2YWx1ZSkge1xuICAgIGxldCBZID0gdmFsdWU7XG4gICAgbGV0IGUgPSB0aGlzLnRocmVzaG9sZDtcbiAgICBsZXQgc2NvbHMgPSB0aGlzLnMubGVuZ3RoO1xuICAgIGxldCBMcyA9IE1hdHJpeC56ZXJvcyhzY29scywgc2NvbHMpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY29sczsgaSsrKSB7XG4gICAgICBpZiAoTWF0aC5hYnModGhpcy5zW2ldKSA8PSBlKSB7XG4gICAgICAgIExzLnNldChpLCBpLCAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIExzLnNldChpLCBpLCAxIC8gdGhpcy5zW2ldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgVSA9IHRoaXMuVTtcbiAgICBsZXQgViA9IHRoaXMucmlnaHRTaW5ndWxhclZlY3RvcnM7XG5cbiAgICBsZXQgVkwgPSBWLm1tdWwoTHMpO1xuICAgIGxldCB2cm93cyA9IFYucm93cztcbiAgICBsZXQgdXJvd3MgPSBVLnJvd3M7XG4gICAgbGV0IFZMVSA9IE1hdHJpeC56ZXJvcyh2cm93cywgdXJvd3MpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2cm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHVyb3dzOyBqKyspIHtcbiAgICAgICAgbGV0IHN1bSA9IDA7XG4gICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgc2NvbHM7IGsrKykge1xuICAgICAgICAgIHN1bSArPSBWTC5nZXQoaSwgaykgKiBVLmdldChqLCBrKTtcbiAgICAgICAgfVxuICAgICAgICBWTFUuc2V0KGksIGosIHN1bSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFZMVS5tbXVsKFkpO1xuICB9XG5cbiAgc29sdmVGb3JEaWFnb25hbCh2YWx1ZSkge1xuICAgIHJldHVybiB0aGlzLnNvbHZlKE1hdHJpeC5kaWFnKHZhbHVlKSk7XG4gIH1cblxuICBpbnZlcnNlKCkge1xuICAgIGxldCBWID0gdGhpcy5WO1xuICAgIGxldCBlID0gdGhpcy50aHJlc2hvbGQ7XG4gICAgbGV0IHZyb3dzID0gVi5yb3dzO1xuICAgIGxldCB2Y29scyA9IFYuY29sdW1ucztcbiAgICBsZXQgWCA9IG5ldyBNYXRyaXgodnJvd3MsIHRoaXMucy5sZW5ndGgpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2cm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHZjb2xzOyBqKyspIHtcbiAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMuc1tqXSkgPiBlKSB7XG4gICAgICAgICAgWC5zZXQoaSwgaiwgVi5nZXQoaSwgaikgLyB0aGlzLnNbal0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IFUgPSB0aGlzLlU7XG5cbiAgICBsZXQgdXJvd3MgPSBVLnJvd3M7XG4gICAgbGV0IHVjb2xzID0gVS5jb2x1bW5zO1xuICAgIGxldCBZID0gbmV3IE1hdHJpeCh2cm93cywgdXJvd3MpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2cm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHVyb3dzOyBqKyspIHtcbiAgICAgICAgbGV0IHN1bSA9IDA7XG4gICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgdWNvbHM7IGsrKykge1xuICAgICAgICAgIHN1bSArPSBYLmdldChpLCBrKSAqIFUuZ2V0KGosIGspO1xuICAgICAgICB9XG4gICAgICAgIFkuc2V0KGksIGosIHN1bSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFk7XG4gIH1cblxuICBnZXQgY29uZGl0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnNbMF0gLyB0aGlzLnNbTWF0aC5taW4odGhpcy5tLCB0aGlzLm4pIC0gMV07XG4gIH1cblxuICBnZXQgbm9ybTIoKSB7XG4gICAgcmV0dXJuIHRoaXMuc1swXTtcbiAgfVxuXG4gIGdldCByYW5rKCkge1xuICAgIGxldCB0b2wgPSBNYXRoLm1heCh0aGlzLm0sIHRoaXMubikgKiB0aGlzLnNbMF0gKiBOdW1iZXIuRVBTSUxPTjtcbiAgICBsZXQgciA9IDA7XG4gICAgbGV0IHMgPSB0aGlzLnM7XG4gICAgZm9yIChsZXQgaSA9IDAsIGlpID0gcy5sZW5ndGg7IGkgPCBpaTsgaSsrKSB7XG4gICAgICBpZiAoc1tpXSA+IHRvbCkge1xuICAgICAgICByKys7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByO1xuICB9XG5cbiAgZ2V0IGRpYWdvbmFsKCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMucyk7XG4gIH1cblxuICBnZXQgdGhyZXNob2xkKCkge1xuICAgIHJldHVybiAoTnVtYmVyLkVQU0lMT04gLyAyKSAqIE1hdGgubWF4KHRoaXMubSwgdGhpcy5uKSAqIHRoaXMuc1swXTtcbiAgfVxuXG4gIGdldCBsZWZ0U2luZ3VsYXJWZWN0b3JzKCkge1xuICAgIHJldHVybiB0aGlzLlU7XG4gIH1cblxuICBnZXQgcmlnaHRTaW5ndWxhclZlY3RvcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuVjtcbiAgfVxuXG4gIGdldCBkaWFnb25hbE1hdHJpeCgpIHtcbiAgICByZXR1cm4gTWF0cml4LmRpYWcodGhpcy5zKTtcbiAgfVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGh5cG90ZW51c2UoYSwgYikge1xuICBsZXQgciA9IDA7XG4gIGlmIChNYXRoLmFicyhhKSA+IE1hdGguYWJzKGIpKSB7XG4gICAgciA9IGIgLyBhO1xuICAgIHJldHVybiBNYXRoLmFicyhhKSAqIE1hdGguc3FydCgxICsgciAqIHIpO1xuICB9XG4gIGlmIChiICE9PSAwKSB7XG4gICAgciA9IGEgLyBiO1xuICAgIHJldHVybiBNYXRoLmFicyhiKSAqIE1hdGguc3FydCgxICsgciAqIHIpO1xuICB9XG4gIHJldHVybiAwO1xufVxuIiwiaW1wb3J0IEx1RGVjb21wb3NpdGlvbiBmcm9tICcuL2RjL2x1JztcbmltcG9ydCBRckRlY29tcG9zaXRpb24gZnJvbSAnLi9kYy9xcic7XG5pbXBvcnQgU2luZ3VsYXJWYWx1ZURlY29tcG9zaXRpb24gZnJvbSAnLi9kYy9zdmQnO1xuaW1wb3J0IE1hdHJpeCBmcm9tICcuL21hdHJpeCc7XG5pbXBvcnQgV3JhcHBlck1hdHJpeDJEIGZyb20gJy4vd3JhcC9XcmFwcGVyTWF0cml4MkQnO1xuXG5leHBvcnQgZnVuY3Rpb24gaW52ZXJzZShtYXRyaXgsIHVzZVNWRCA9IGZhbHNlKSB7XG4gIG1hdHJpeCA9IFdyYXBwZXJNYXRyaXgyRC5jaGVja01hdHJpeChtYXRyaXgpO1xuICBpZiAodXNlU1ZEKSB7XG4gICAgcmV0dXJuIG5ldyBTaW5ndWxhclZhbHVlRGVjb21wb3NpdGlvbihtYXRyaXgpLmludmVyc2UoKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gc29sdmUobWF0cml4LCBNYXRyaXguZXllKG1hdHJpeC5yb3dzKSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNvbHZlKGxlZnRIYW5kU2lkZSwgcmlnaHRIYW5kU2lkZSwgdXNlU1ZEID0gZmFsc2UpIHtcbiAgbGVmdEhhbmRTaWRlID0gV3JhcHBlck1hdHJpeDJELmNoZWNrTWF0cml4KGxlZnRIYW5kU2lkZSk7XG4gIHJpZ2h0SGFuZFNpZGUgPSBXcmFwcGVyTWF0cml4MkQuY2hlY2tNYXRyaXgocmlnaHRIYW5kU2lkZSk7XG4gIGlmICh1c2VTVkQpIHtcbiAgICByZXR1cm4gbmV3IFNpbmd1bGFyVmFsdWVEZWNvbXBvc2l0aW9uKGxlZnRIYW5kU2lkZSkuc29sdmUocmlnaHRIYW5kU2lkZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGxlZnRIYW5kU2lkZS5pc1NxdWFyZSgpXG4gICAgICA/IG5ldyBMdURlY29tcG9zaXRpb24obGVmdEhhbmRTaWRlKS5zb2x2ZShyaWdodEhhbmRTaWRlKVxuICAgICAgOiBuZXcgUXJEZWNvbXBvc2l0aW9uKGxlZnRIYW5kU2lkZSkuc29sdmUocmlnaHRIYW5kU2lkZSk7XG4gIH1cbn1cbiIsImltcG9ydCBMdURlY29tcG9zaXRpb24gZnJvbSAnLi9kYy9sdSc7XG5pbXBvcnQgTWF0cml4IGZyb20gJy4vbWF0cml4JztcbmltcG9ydCBNYXRyaXhTZWxlY3Rpb25WaWV3IGZyb20gJy4vdmlld3Mvc2VsZWN0aW9uJztcblxuZXhwb3J0IGZ1bmN0aW9uIGRldGVybWluYW50KG1hdHJpeCkge1xuICBtYXRyaXggPSBNYXRyaXguY2hlY2tNYXRyaXgobWF0cml4KTtcbiAgaWYgKG1hdHJpeC5pc1NxdWFyZSgpKSB7XG4gICAgbGV0IGEsIGIsIGMsIGQ7XG4gICAgaWYgKG1hdHJpeC5jb2x1bW5zID09PSAyKSB7XG4gICAgICAvLyAyIHggMiBtYXRyaXhcbiAgICAgIGEgPSBtYXRyaXguZ2V0KDAsIDApO1xuICAgICAgYiA9IG1hdHJpeC5nZXQoMCwgMSk7XG4gICAgICBjID0gbWF0cml4LmdldCgxLCAwKTtcbiAgICAgIGQgPSBtYXRyaXguZ2V0KDEsIDEpO1xuXG4gICAgICByZXR1cm4gYSAqIGQgLSBiICogYztcbiAgICB9IGVsc2UgaWYgKG1hdHJpeC5jb2x1bW5zID09PSAzKSB7XG4gICAgICAvLyAzIHggMyBtYXRyaXhcbiAgICAgIGxldCBzdWJNYXRyaXgwLCBzdWJNYXRyaXgxLCBzdWJNYXRyaXgyO1xuICAgICAgc3ViTWF0cml4MCA9IG5ldyBNYXRyaXhTZWxlY3Rpb25WaWV3KG1hdHJpeCwgWzEsIDJdLCBbMSwgMl0pO1xuICAgICAgc3ViTWF0cml4MSA9IG5ldyBNYXRyaXhTZWxlY3Rpb25WaWV3KG1hdHJpeCwgWzEsIDJdLCBbMCwgMl0pO1xuICAgICAgc3ViTWF0cml4MiA9IG5ldyBNYXRyaXhTZWxlY3Rpb25WaWV3KG1hdHJpeCwgWzEsIDJdLCBbMCwgMV0pO1xuICAgICAgYSA9IG1hdHJpeC5nZXQoMCwgMCk7XG4gICAgICBiID0gbWF0cml4LmdldCgwLCAxKTtcbiAgICAgIGMgPSBtYXRyaXguZ2V0KDAsIDIpO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICBhICogZGV0ZXJtaW5hbnQoc3ViTWF0cml4MCkgLVxuICAgICAgICBiICogZGV0ZXJtaW5hbnQoc3ViTWF0cml4MSkgK1xuICAgICAgICBjICogZGV0ZXJtaW5hbnQoc3ViTWF0cml4MilcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGdlbmVyYWwgcHVycG9zZSBkZXRlcm1pbmFudCB1c2luZyB0aGUgTFUgZGVjb21wb3NpdGlvblxuICAgICAgcmV0dXJuIG5ldyBMdURlY29tcG9zaXRpb24obWF0cml4KS5kZXRlcm1pbmFudDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgRXJyb3IoJ2RldGVybWluYW50IGNhbiBvbmx5IGJlIGNhbGN1bGF0ZWQgZm9yIGEgc3F1YXJlIG1hdHJpeCcpO1xuICB9XG59XG4iLCJleHBvcnQgeyBBYnN0cmFjdE1hdHJpeCwgZGVmYXVsdCwgZGVmYXVsdCBhcyBNYXRyaXggfSBmcm9tICcuL21hdHJpeCc7XG5leHBvcnQgKiBmcm9tICcuL3ZpZXdzL2luZGV4JztcblxuZXhwb3J0IHsgd3JhcCB9IGZyb20gJy4vd3JhcC93cmFwJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgV3JhcHBlck1hdHJpeDFEIH0gZnJvbSAnLi93cmFwL1dyYXBwZXJNYXRyaXgxRCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFdyYXBwZXJNYXRyaXgyRCB9IGZyb20gJy4vd3JhcC9XcmFwcGVyTWF0cml4MkQnO1xuXG5leHBvcnQgeyBzb2x2ZSwgaW52ZXJzZSB9IGZyb20gJy4vZGVjb21wb3NpdGlvbnMnO1xuZXhwb3J0IHsgZGV0ZXJtaW5hbnQgfSBmcm9tICcuL2RldGVybWluYW50JztcbmV4cG9ydCB7IGxpbmVhckRlcGVuZGVuY2llcyB9IGZyb20gJy4vbGluZWFyRGVwZW5kZW5jaWVzJztcbmV4cG9ydCB7IHBzZXVkb0ludmVyc2UgfSBmcm9tICcuL3BzZXVkb0ludmVyc2UnO1xuZXhwb3J0IHsgY292YXJpYW5jZSB9IGZyb20gJy4vY292YXJpYW5jZSc7XG5leHBvcnQgeyBjb3JyZWxhdGlvbiB9IGZyb20gJy4vY29ycmVsYXRpb24nO1xuXG5leHBvcnQge1xuICBkZWZhdWx0IGFzIFNpbmd1bGFyVmFsdWVEZWNvbXBvc2l0aW9uLFxuICBkZWZhdWx0IGFzIFNWRCxcbn0gZnJvbSAnLi9kYy9zdmQuanMnO1xuZXhwb3J0IHtcbiAgZGVmYXVsdCBhcyBFaWdlbnZhbHVlRGVjb21wb3NpdGlvbixcbiAgZGVmYXVsdCBhcyBFVkQsXG59IGZyb20gJy4vZGMvZXZkLmpzJztcbmV4cG9ydCB7XG4gIGRlZmF1bHQgYXMgQ2hvbGVza3lEZWNvbXBvc2l0aW9uLFxuICBkZWZhdWx0IGFzIENITyxcbn0gZnJvbSAnLi9kYy9jaG9sZXNreS5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIEx1RGVjb21wb3NpdGlvbiwgZGVmYXVsdCBhcyBMVSB9IGZyb20gJy4vZGMvbHUuanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBRckRlY29tcG9zaXRpb24sIGRlZmF1bHQgYXMgUVIgfSBmcm9tICcuL2RjL3FyLmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTmlwYWxzLCBkZWZhdWx0IGFzIE5JUEFMUyB9IGZyb20gJy4vZGMvbmlwYWxzLmpzJztcbiIsImNvbnN0IGluZGVudCA9ICcgJy5yZXBlYXQoMik7XG5jb25zdCBpbmRlbnREYXRhID0gJyAnLnJlcGVhdCg0KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGluc3BlY3RNYXRyaXgoKSB7XG4gIHJldHVybiBpbnNwZWN0TWF0cml4V2l0aE9wdGlvbnModGhpcyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnNwZWN0TWF0cml4V2l0aE9wdGlvbnMobWF0cml4LCBvcHRpb25zID0ge30pIHtcbiAgY29uc3QgeyBtYXhSb3dzID0gMTUsIG1heENvbHVtbnMgPSAxMCwgbWF4TnVtU2l6ZSA9IDggfSA9IG9wdGlvbnM7XG4gIHJldHVybiBgJHttYXRyaXguY29uc3RydWN0b3IubmFtZX0ge1xuJHtpbmRlbnR9W1xuJHtpbmRlbnREYXRhfSR7aW5zcGVjdERhdGEobWF0cml4LCBtYXhSb3dzLCBtYXhDb2x1bW5zLCBtYXhOdW1TaXplKX1cbiR7aW5kZW50fV1cbiR7aW5kZW50fXJvd3M6ICR7bWF0cml4LnJvd3N9XG4ke2luZGVudH1jb2x1bW5zOiAke21hdHJpeC5jb2x1bW5zfVxufWA7XG59XG5cbmZ1bmN0aW9uIGluc3BlY3REYXRhKG1hdHJpeCwgbWF4Um93cywgbWF4Q29sdW1ucywgbWF4TnVtU2l6ZSkge1xuICBjb25zdCB7IHJvd3MsIGNvbHVtbnMgfSA9IG1hdHJpeDtcbiAgY29uc3QgbWF4SSA9IE1hdGgubWluKHJvd3MsIG1heFJvd3MpO1xuICBjb25zdCBtYXhKID0gTWF0aC5taW4oY29sdW1ucywgbWF4Q29sdW1ucyk7XG4gIGNvbnN0IHJlc3VsdCA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG1heEk7IGkrKykge1xuICAgIGxldCBsaW5lID0gW107XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBtYXhKOyBqKyspIHtcbiAgICAgIGxpbmUucHVzaChmb3JtYXROdW1iZXIobWF0cml4LmdldChpLCBqKSwgbWF4TnVtU2l6ZSkpO1xuICAgIH1cbiAgICByZXN1bHQucHVzaChgJHtsaW5lLmpvaW4oJyAnKX1gKTtcbiAgfVxuICBpZiAobWF4SiAhPT0gY29sdW1ucykge1xuICAgIHJlc3VsdFtyZXN1bHQubGVuZ3RoIC0gMV0gKz0gYCAuLi4gJHtjb2x1bW5zIC0gbWF4Q29sdW1uc30gbW9yZSBjb2x1bW5zYDtcbiAgfVxuICBpZiAobWF4SSAhPT0gcm93cykge1xuICAgIHJlc3VsdC5wdXNoKGAuLi4gJHtyb3dzIC0gbWF4Um93c30gbW9yZSByb3dzYCk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdC5qb2luKGBcXG4ke2luZGVudERhdGF9YCk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdE51bWJlcihudW0sIG1heE51bVNpemUpIHtcbiAgY29uc3QgbnVtU3RyID0gU3RyaW5nKG51bSk7XG4gIGlmIChudW1TdHIubGVuZ3RoIDw9IG1heE51bVNpemUpIHtcbiAgICByZXR1cm4gbnVtU3RyLnBhZEVuZChtYXhOdW1TaXplLCAnICcpO1xuICB9XG4gIGNvbnN0IHByZWNpc2UgPSBudW0udG9QcmVjaXNpb24obWF4TnVtU2l6ZSAtIDIpO1xuICBpZiAocHJlY2lzZS5sZW5ndGggPD0gbWF4TnVtU2l6ZSkge1xuICAgIHJldHVybiBwcmVjaXNlO1xuICB9XG4gIGNvbnN0IGV4cG9uZW50aWFsID0gbnVtLnRvRXhwb25lbnRpYWwobWF4TnVtU2l6ZSAtIDIpO1xuICBjb25zdCBlSW5kZXggPSBleHBvbmVudGlhbC5pbmRleE9mKCdlJyk7XG4gIGNvbnN0IGUgPSBleHBvbmVudGlhbC5zbGljZShlSW5kZXgpO1xuICByZXR1cm4gZXhwb25lbnRpYWwuc2xpY2UoMCwgbWF4TnVtU2l6ZSAtIGUubGVuZ3RoKSArIGU7XG59XG4iLCJpbXBvcnQgU2luZ3VsYXJWYWx1ZURlY29tcG9zaXRpb24gZnJvbSAnLi9kYy9zdmQnO1xuaW1wb3J0IE1hdHJpeCBmcm9tICcuL21hdHJpeCc7XG5cbmZ1bmN0aW9uIHhyYW5nZShuLCBleGNlcHRpb24pIHtcbiAgbGV0IHJhbmdlID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgaWYgKGkgIT09IGV4Y2VwdGlvbikge1xuICAgICAgcmFuZ2UucHVzaChpKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJhbmdlO1xufVxuXG5mdW5jdGlvbiBkZXBlbmRlbmNpZXNPbmVSb3coXG4gIGVycm9yLFxuICBtYXRyaXgsXG4gIGluZGV4LFxuICB0aHJlc2hvbGRWYWx1ZSA9IDEwZS0xMCxcbiAgdGhyZXNob2xkRXJyb3IgPSAxMGUtMTAsXG4pIHtcbiAgaWYgKGVycm9yID4gdGhyZXNob2xkRXJyb3IpIHtcbiAgICByZXR1cm4gbmV3IEFycmF5KG1hdHJpeC5yb3dzICsgMSkuZmlsbCgwKTtcbiAgfSBlbHNlIHtcbiAgICBsZXQgcmV0dXJuQXJyYXkgPSBtYXRyaXguYWRkUm93KGluZGV4LCBbMF0pO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmV0dXJuQXJyYXkucm93czsgaSsrKSB7XG4gICAgICBpZiAoTWF0aC5hYnMocmV0dXJuQXJyYXkuZ2V0KGksIDApKSA8IHRocmVzaG9sZFZhbHVlKSB7XG4gICAgICAgIHJldHVybkFycmF5LnNldChpLCAwLCAwKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJldHVybkFycmF5LnRvMURBcnJheSgpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaW5lYXJEZXBlbmRlbmNpZXMobWF0cml4LCBvcHRpb25zID0ge30pIHtcbiAgY29uc3QgeyB0aHJlc2hvbGRWYWx1ZSA9IDEwZS0xMCwgdGhyZXNob2xkRXJyb3IgPSAxMGUtMTAgfSA9IG9wdGlvbnM7XG4gIG1hdHJpeCA9IE1hdHJpeC5jaGVja01hdHJpeChtYXRyaXgpO1xuXG4gIGxldCBuID0gbWF0cml4LnJvd3M7XG4gIGxldCByZXN1bHRzID0gbmV3IE1hdHJpeChuLCBuKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgIGxldCBiID0gTWF0cml4LmNvbHVtblZlY3RvcihtYXRyaXguZ2V0Um93KGkpKTtcbiAgICBsZXQgQWJpcyA9IG1hdHJpeC5zdWJNYXRyaXhSb3coeHJhbmdlKG4sIGkpKS50cmFuc3Bvc2UoKTtcbiAgICBsZXQgc3ZkID0gbmV3IFNpbmd1bGFyVmFsdWVEZWNvbXBvc2l0aW9uKEFiaXMpO1xuICAgIGxldCB4ID0gc3ZkLnNvbHZlKGIpO1xuICAgIGxldCBlcnJvciA9IE1hdHJpeC5zdWIoYiwgQWJpcy5tbXVsKHgpKS5hYnMoKS5tYXgoKTtcbiAgICByZXN1bHRzLnNldFJvdyhcbiAgICAgIGksXG4gICAgICBkZXBlbmRlbmNpZXNPbmVSb3coZXJyb3IsIHgsIGksIHRocmVzaG9sZFZhbHVlLCB0aHJlc2hvbGRFcnJvciksXG4gICAgKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0cztcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBpbnN0YWxsTWF0aE9wZXJhdGlvbnMoQWJzdHJhY3RNYXRyaXgsIE1hdHJpeCkge1xuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gYWRkKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHJldHVybiB0aGlzLmFkZFModmFsdWUpO1xuICAgIHJldHVybiB0aGlzLmFkZE0odmFsdWUpO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5hZGRTID0gZnVuY3Rpb24gYWRkUyh2YWx1ZSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgdGhpcy5zZXQoaSwgaiwgdGhpcy5nZXQoaSwgaikgKyB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5hZGRNID0gZnVuY3Rpb24gYWRkTShtYXRyaXgpIHtcbiAgICBtYXRyaXggPSBNYXRyaXguY2hlY2tNYXRyaXgobWF0cml4KTtcbiAgICBpZiAodGhpcy5yb3dzICE9PSBtYXRyaXgucm93cyB8fFxuICAgICAgdGhpcy5jb2x1bW5zICE9PSBtYXRyaXguY29sdW1ucykge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ01hdHJpY2VzIGRpbWVuc2lvbnMgbXVzdCBiZSBlcXVhbCcpO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sdW1uczsgaisrKSB7XG4gICAgICAgIHRoaXMuc2V0KGksIGosIHRoaXMuZ2V0KGksIGopICsgbWF0cml4LmdldChpLCBqKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LmFkZCA9IGZ1bmN0aW9uIGFkZChtYXRyaXgsIHZhbHVlKSB7XG4gICAgY29uc3QgbmV3TWF0cml4ID0gbmV3IE1hdHJpeChtYXRyaXgpO1xuICAgIHJldHVybiBuZXdNYXRyaXguYWRkKHZhbHVlKTtcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUuc3ViID0gZnVuY3Rpb24gc3ViKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHJldHVybiB0aGlzLnN1YlModmFsdWUpO1xuICAgIHJldHVybiB0aGlzLnN1Yk0odmFsdWUpO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5zdWJTID0gZnVuY3Rpb24gc3ViUyh2YWx1ZSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgdGhpcy5zZXQoaSwgaiwgdGhpcy5nZXQoaSwgaikgLSB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5zdWJNID0gZnVuY3Rpb24gc3ViTShtYXRyaXgpIHtcbiAgICBtYXRyaXggPSBNYXRyaXguY2hlY2tNYXRyaXgobWF0cml4KTtcbiAgICBpZiAodGhpcy5yb3dzICE9PSBtYXRyaXgucm93cyB8fFxuICAgICAgdGhpcy5jb2x1bW5zICE9PSBtYXRyaXguY29sdW1ucykge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ01hdHJpY2VzIGRpbWVuc2lvbnMgbXVzdCBiZSBlcXVhbCcpO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sdW1uczsgaisrKSB7XG4gICAgICAgIHRoaXMuc2V0KGksIGosIHRoaXMuZ2V0KGksIGopIC0gbWF0cml4LmdldChpLCBqKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnN1YiA9IGZ1bmN0aW9uIHN1YihtYXRyaXgsIHZhbHVlKSB7XG4gICAgY29uc3QgbmV3TWF0cml4ID0gbmV3IE1hdHJpeChtYXRyaXgpO1xuICAgIHJldHVybiBuZXdNYXRyaXguc3ViKHZhbHVlKTtcbiAgfTtcbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLnN1YnRyYWN0ID0gQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLnN1YjtcbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLnN1YnRyYWN0UyA9IEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5zdWJTO1xuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUuc3VidHJhY3RNID0gQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLnN1Yk07XG4gIEFic3RyYWN0TWF0cml4LnN1YnRyYWN0ID0gQWJzdHJhY3RNYXRyaXguc3ViO1xuXG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5tdWwgPSBmdW5jdGlvbiBtdWwodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykgcmV0dXJuIHRoaXMubXVsUyh2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXMubXVsTSh2YWx1ZSk7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLm11bFMgPSBmdW5jdGlvbiBtdWxTKHZhbHVlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCB0aGlzLmdldChpLCBqKSAqIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLm11bE0gPSBmdW5jdGlvbiBtdWxNKG1hdHJpeCkge1xuICAgIG1hdHJpeCA9IE1hdHJpeC5jaGVja01hdHJpeChtYXRyaXgpO1xuICAgIGlmICh0aGlzLnJvd3MgIT09IG1hdHJpeC5yb3dzIHx8XG4gICAgICB0aGlzLmNvbHVtbnMgIT09IG1hdHJpeC5jb2x1bW5zKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignTWF0cmljZXMgZGltZW5zaW9ucyBtdXN0IGJlIGVxdWFsJyk7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgdGhpcy5zZXQoaSwgaiwgdGhpcy5nZXQoaSwgaikgKiBtYXRyaXguZ2V0KGksIGopKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgubXVsID0gZnVuY3Rpb24gbXVsKG1hdHJpeCwgdmFsdWUpIHtcbiAgICBjb25zdCBuZXdNYXRyaXggPSBuZXcgTWF0cml4KG1hdHJpeCk7XG4gICAgcmV0dXJuIG5ld01hdHJpeC5tdWwodmFsdWUpO1xuICB9O1xuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUubXVsdGlwbHkgPSBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUubXVsO1xuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUubXVsdGlwbHlTID0gQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLm11bFM7XG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5tdWx0aXBseU0gPSBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUubXVsTTtcbiAgQWJzdHJhY3RNYXRyaXgubXVsdGlwbHkgPSBBYnN0cmFjdE1hdHJpeC5tdWw7XG5cbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLmRpdiA9IGZ1bmN0aW9uIGRpdih2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSByZXR1cm4gdGhpcy5kaXZTKHZhbHVlKTtcbiAgICByZXR1cm4gdGhpcy5kaXZNKHZhbHVlKTtcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUuZGl2UyA9IGZ1bmN0aW9uIGRpdlModmFsdWUpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sdW1uczsgaisrKSB7XG4gICAgICAgIHRoaXMuc2V0KGksIGosIHRoaXMuZ2V0KGksIGopIC8gdmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUuZGl2TSA9IGZ1bmN0aW9uIGRpdk0obWF0cml4KSB7XG4gICAgbWF0cml4ID0gTWF0cml4LmNoZWNrTWF0cml4KG1hdHJpeCk7XG4gICAgaWYgKHRoaXMucm93cyAhPT0gbWF0cml4LnJvd3MgfHxcbiAgICAgIHRoaXMuY29sdW1ucyAhPT0gbWF0cml4LmNvbHVtbnMpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdNYXRyaWNlcyBkaW1lbnNpb25zIG11c3QgYmUgZXF1YWwnKTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCB0aGlzLmdldChpLCBqKSAvIG1hdHJpeC5nZXQoaSwgaikpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5kaXYgPSBmdW5jdGlvbiBkaXYobWF0cml4LCB2YWx1ZSkge1xuICAgIGNvbnN0IG5ld01hdHJpeCA9IG5ldyBNYXRyaXgobWF0cml4KTtcbiAgICByZXR1cm4gbmV3TWF0cml4LmRpdih2YWx1ZSk7XG4gIH07XG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5kaXZpZGUgPSBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUuZGl2O1xuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUuZGl2aWRlUyA9IEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5kaXZTO1xuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUuZGl2aWRlTSA9IEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5kaXZNO1xuICBBYnN0cmFjdE1hdHJpeC5kaXZpZGUgPSBBYnN0cmFjdE1hdHJpeC5kaXY7XG5cbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLm1vZCA9IGZ1bmN0aW9uIG1vZCh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSByZXR1cm4gdGhpcy5tb2RTKHZhbHVlKTtcbiAgICByZXR1cm4gdGhpcy5tb2RNKHZhbHVlKTtcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUubW9kUyA9IGZ1bmN0aW9uIG1vZFModmFsdWUpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sdW1uczsgaisrKSB7XG4gICAgICAgIHRoaXMuc2V0KGksIGosIHRoaXMuZ2V0KGksIGopICUgdmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUubW9kTSA9IGZ1bmN0aW9uIG1vZE0obWF0cml4KSB7XG4gICAgbWF0cml4ID0gTWF0cml4LmNoZWNrTWF0cml4KG1hdHJpeCk7XG4gICAgaWYgKHRoaXMucm93cyAhPT0gbWF0cml4LnJvd3MgfHxcbiAgICAgIHRoaXMuY29sdW1ucyAhPT0gbWF0cml4LmNvbHVtbnMpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdNYXRyaWNlcyBkaW1lbnNpb25zIG11c3QgYmUgZXF1YWwnKTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCB0aGlzLmdldChpLCBqKSAlIG1hdHJpeC5nZXQoaSwgaikpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5tb2QgPSBmdW5jdGlvbiBtb2QobWF0cml4LCB2YWx1ZSkge1xuICAgIGNvbnN0IG5ld01hdHJpeCA9IG5ldyBNYXRyaXgobWF0cml4KTtcbiAgICByZXR1cm4gbmV3TWF0cml4Lm1vZCh2YWx1ZSk7XG4gIH07XG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5tb2R1bHVzID0gQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLm1vZDtcbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLm1vZHVsdXNTID0gQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLm1vZFM7XG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5tb2R1bHVzTSA9IEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5tb2RNO1xuICBBYnN0cmFjdE1hdHJpeC5tb2R1bHVzID0gQWJzdHJhY3RNYXRyaXgubW9kO1xuXG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5hbmQgPSBmdW5jdGlvbiBhbmQodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykgcmV0dXJuIHRoaXMuYW5kUyh2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXMuYW5kTSh2YWx1ZSk7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLmFuZFMgPSBmdW5jdGlvbiBhbmRTKHZhbHVlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCB0aGlzLmdldChpLCBqKSAmIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLmFuZE0gPSBmdW5jdGlvbiBhbmRNKG1hdHJpeCkge1xuICAgIG1hdHJpeCA9IE1hdHJpeC5jaGVja01hdHJpeChtYXRyaXgpO1xuICAgIGlmICh0aGlzLnJvd3MgIT09IG1hdHJpeC5yb3dzIHx8XG4gICAgICB0aGlzLmNvbHVtbnMgIT09IG1hdHJpeC5jb2x1bW5zKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignTWF0cmljZXMgZGltZW5zaW9ucyBtdXN0IGJlIGVxdWFsJyk7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgdGhpcy5zZXQoaSwgaiwgdGhpcy5nZXQoaSwgaikgJiBtYXRyaXguZ2V0KGksIGopKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXguYW5kID0gZnVuY3Rpb24gYW5kKG1hdHJpeCwgdmFsdWUpIHtcbiAgICBjb25zdCBuZXdNYXRyaXggPSBuZXcgTWF0cml4KG1hdHJpeCk7XG4gICAgcmV0dXJuIG5ld01hdHJpeC5hbmQodmFsdWUpO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5vciA9IGZ1bmN0aW9uIG9yKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHJldHVybiB0aGlzLm9yUyh2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXMub3JNKHZhbHVlKTtcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUub3JTID0gZnVuY3Rpb24gb3JTKHZhbHVlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCB0aGlzLmdldChpLCBqKSB8IHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLm9yTSA9IGZ1bmN0aW9uIG9yTShtYXRyaXgpIHtcbiAgICBtYXRyaXggPSBNYXRyaXguY2hlY2tNYXRyaXgobWF0cml4KTtcbiAgICBpZiAodGhpcy5yb3dzICE9PSBtYXRyaXgucm93cyB8fFxuICAgICAgdGhpcy5jb2x1bW5zICE9PSBtYXRyaXguY29sdW1ucykge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ01hdHJpY2VzIGRpbWVuc2lvbnMgbXVzdCBiZSBlcXVhbCcpO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sdW1uczsgaisrKSB7XG4gICAgICAgIHRoaXMuc2V0KGksIGosIHRoaXMuZ2V0KGksIGopIHwgbWF0cml4LmdldChpLCBqKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4Lm9yID0gZnVuY3Rpb24gb3IobWF0cml4LCB2YWx1ZSkge1xuICAgIGNvbnN0IG5ld01hdHJpeCA9IG5ldyBNYXRyaXgobWF0cml4KTtcbiAgICByZXR1cm4gbmV3TWF0cml4Lm9yKHZhbHVlKTtcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUueG9yID0gZnVuY3Rpb24geG9yKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHJldHVybiB0aGlzLnhvclModmFsdWUpO1xuICAgIHJldHVybiB0aGlzLnhvck0odmFsdWUpO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS54b3JTID0gZnVuY3Rpb24geG9yUyh2YWx1ZSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgdGhpcy5zZXQoaSwgaiwgdGhpcy5nZXQoaSwgaikgXiB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS54b3JNID0gZnVuY3Rpb24geG9yTShtYXRyaXgpIHtcbiAgICBtYXRyaXggPSBNYXRyaXguY2hlY2tNYXRyaXgobWF0cml4KTtcbiAgICBpZiAodGhpcy5yb3dzICE9PSBtYXRyaXgucm93cyB8fFxuICAgICAgdGhpcy5jb2x1bW5zICE9PSBtYXRyaXguY29sdW1ucykge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ01hdHJpY2VzIGRpbWVuc2lvbnMgbXVzdCBiZSBlcXVhbCcpO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sdW1uczsgaisrKSB7XG4gICAgICAgIHRoaXMuc2V0KGksIGosIHRoaXMuZ2V0KGksIGopIF4gbWF0cml4LmdldChpLCBqKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnhvciA9IGZ1bmN0aW9uIHhvcihtYXRyaXgsIHZhbHVlKSB7XG4gICAgY29uc3QgbmV3TWF0cml4ID0gbmV3IE1hdHJpeChtYXRyaXgpO1xuICAgIHJldHVybiBuZXdNYXRyaXgueG9yKHZhbHVlKTtcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUubGVmdFNoaWZ0ID0gZnVuY3Rpb24gbGVmdFNoaWZ0KHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHJldHVybiB0aGlzLmxlZnRTaGlmdFModmFsdWUpO1xuICAgIHJldHVybiB0aGlzLmxlZnRTaGlmdE0odmFsdWUpO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5sZWZ0U2hpZnRTID0gZnVuY3Rpb24gbGVmdFNoaWZ0Uyh2YWx1ZSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgdGhpcy5zZXQoaSwgaiwgdGhpcy5nZXQoaSwgaikgPDwgdmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUubGVmdFNoaWZ0TSA9IGZ1bmN0aW9uIGxlZnRTaGlmdE0obWF0cml4KSB7XG4gICAgbWF0cml4ID0gTWF0cml4LmNoZWNrTWF0cml4KG1hdHJpeCk7XG4gICAgaWYgKHRoaXMucm93cyAhPT0gbWF0cml4LnJvd3MgfHxcbiAgICAgIHRoaXMuY29sdW1ucyAhPT0gbWF0cml4LmNvbHVtbnMpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdNYXRyaWNlcyBkaW1lbnNpb25zIG11c3QgYmUgZXF1YWwnKTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCB0aGlzLmdldChpLCBqKSA8PCBtYXRyaXguZ2V0KGksIGopKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgubGVmdFNoaWZ0ID0gZnVuY3Rpb24gbGVmdFNoaWZ0KG1hdHJpeCwgdmFsdWUpIHtcbiAgICBjb25zdCBuZXdNYXRyaXggPSBuZXcgTWF0cml4KG1hdHJpeCk7XG4gICAgcmV0dXJuIG5ld01hdHJpeC5sZWZ0U2hpZnQodmFsdWUpO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5zaWduUHJvcGFnYXRpbmdSaWdodFNoaWZ0ID0gZnVuY3Rpb24gc2lnblByb3BhZ2F0aW5nUmlnaHRTaGlmdCh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSByZXR1cm4gdGhpcy5zaWduUHJvcGFnYXRpbmdSaWdodFNoaWZ0Uyh2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXMuc2lnblByb3BhZ2F0aW5nUmlnaHRTaGlmdE0odmFsdWUpO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5zaWduUHJvcGFnYXRpbmdSaWdodFNoaWZ0UyA9IGZ1bmN0aW9uIHNpZ25Qcm9wYWdhdGluZ1JpZ2h0U2hpZnRTKHZhbHVlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCB0aGlzLmdldChpLCBqKSA+PiB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5zaWduUHJvcGFnYXRpbmdSaWdodFNoaWZ0TSA9IGZ1bmN0aW9uIHNpZ25Qcm9wYWdhdGluZ1JpZ2h0U2hpZnRNKG1hdHJpeCkge1xuICAgIG1hdHJpeCA9IE1hdHJpeC5jaGVja01hdHJpeChtYXRyaXgpO1xuICAgIGlmICh0aGlzLnJvd3MgIT09IG1hdHJpeC5yb3dzIHx8XG4gICAgICB0aGlzLmNvbHVtbnMgIT09IG1hdHJpeC5jb2x1bW5zKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignTWF0cmljZXMgZGltZW5zaW9ucyBtdXN0IGJlIGVxdWFsJyk7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgdGhpcy5zZXQoaSwgaiwgdGhpcy5nZXQoaSwgaikgPj4gbWF0cml4LmdldChpLCBqKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnNpZ25Qcm9wYWdhdGluZ1JpZ2h0U2hpZnQgPSBmdW5jdGlvbiBzaWduUHJvcGFnYXRpbmdSaWdodFNoaWZ0KG1hdHJpeCwgdmFsdWUpIHtcbiAgICBjb25zdCBuZXdNYXRyaXggPSBuZXcgTWF0cml4KG1hdHJpeCk7XG4gICAgcmV0dXJuIG5ld01hdHJpeC5zaWduUHJvcGFnYXRpbmdSaWdodFNoaWZ0KHZhbHVlKTtcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUucmlnaHRTaGlmdCA9IGZ1bmN0aW9uIHJpZ2h0U2hpZnQodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykgcmV0dXJuIHRoaXMucmlnaHRTaGlmdFModmFsdWUpO1xuICAgIHJldHVybiB0aGlzLnJpZ2h0U2hpZnRNKHZhbHVlKTtcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUucmlnaHRTaGlmdFMgPSBmdW5jdGlvbiByaWdodFNoaWZ0Uyh2YWx1ZSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgdGhpcy5zZXQoaSwgaiwgdGhpcy5nZXQoaSwgaikgPj4+IHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLnJpZ2h0U2hpZnRNID0gZnVuY3Rpb24gcmlnaHRTaGlmdE0obWF0cml4KSB7XG4gICAgbWF0cml4ID0gTWF0cml4LmNoZWNrTWF0cml4KG1hdHJpeCk7XG4gICAgaWYgKHRoaXMucm93cyAhPT0gbWF0cml4LnJvd3MgfHxcbiAgICAgIHRoaXMuY29sdW1ucyAhPT0gbWF0cml4LmNvbHVtbnMpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdNYXRyaWNlcyBkaW1lbnNpb25zIG11c3QgYmUgZXF1YWwnKTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCB0aGlzLmdldChpLCBqKSA+Pj4gbWF0cml4LmdldChpLCBqKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnJpZ2h0U2hpZnQgPSBmdW5jdGlvbiByaWdodFNoaWZ0KG1hdHJpeCwgdmFsdWUpIHtcbiAgICBjb25zdCBuZXdNYXRyaXggPSBuZXcgTWF0cml4KG1hdHJpeCk7XG4gICAgcmV0dXJuIG5ld01hdHJpeC5yaWdodFNoaWZ0KHZhbHVlKTtcbiAgfTtcbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLnplcm9GaWxsUmlnaHRTaGlmdCA9IEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5yaWdodFNoaWZ0O1xuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUuemVyb0ZpbGxSaWdodFNoaWZ0UyA9IEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5yaWdodFNoaWZ0UztcbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLnplcm9GaWxsUmlnaHRTaGlmdE0gPSBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUucmlnaHRTaGlmdE07XG4gIEFic3RyYWN0TWF0cml4Lnplcm9GaWxsUmlnaHRTaGlmdCA9IEFic3RyYWN0TWF0cml4LnJpZ2h0U2hpZnQ7XG5cbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLm5vdCA9IGZ1bmN0aW9uIG5vdCgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sdW1uczsgaisrKSB7XG4gICAgICAgIHRoaXMuc2V0KGksIGosIH4odGhpcy5nZXQoaSwgaikpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgubm90ID0gZnVuY3Rpb24gbm90KG1hdHJpeCkge1xuICAgIGNvbnN0IG5ld01hdHJpeCA9IG5ldyBNYXRyaXgobWF0cml4KTtcbiAgICByZXR1cm4gbmV3TWF0cml4Lm5vdCgpO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5hYnMgPSBmdW5jdGlvbiBhYnMoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCBNYXRoLmFicyh0aGlzLmdldChpLCBqKSkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5hYnMgPSBmdW5jdGlvbiBhYnMobWF0cml4KSB7XG4gICAgY29uc3QgbmV3TWF0cml4ID0gbmV3IE1hdHJpeChtYXRyaXgpO1xuICAgIHJldHVybiBuZXdNYXRyaXguYWJzKCk7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLmFjb3MgPSBmdW5jdGlvbiBhY29zKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgdGhpcy5zZXQoaSwgaiwgTWF0aC5hY29zKHRoaXMuZ2V0KGksIGopKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LmFjb3MgPSBmdW5jdGlvbiBhY29zKG1hdHJpeCkge1xuICAgIGNvbnN0IG5ld01hdHJpeCA9IG5ldyBNYXRyaXgobWF0cml4KTtcbiAgICByZXR1cm4gbmV3TWF0cml4LmFjb3MoKTtcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUuYWNvc2ggPSBmdW5jdGlvbiBhY29zaCgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sdW1uczsgaisrKSB7XG4gICAgICAgIHRoaXMuc2V0KGksIGosIE1hdGguYWNvc2godGhpcy5nZXQoaSwgaikpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXguYWNvc2ggPSBmdW5jdGlvbiBhY29zaChtYXRyaXgpIHtcbiAgICBjb25zdCBuZXdNYXRyaXggPSBuZXcgTWF0cml4KG1hdHJpeCk7XG4gICAgcmV0dXJuIG5ld01hdHJpeC5hY29zaCgpO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5hc2luID0gZnVuY3Rpb24gYXNpbigpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sdW1uczsgaisrKSB7XG4gICAgICAgIHRoaXMuc2V0KGksIGosIE1hdGguYXNpbih0aGlzLmdldChpLCBqKSkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5hc2luID0gZnVuY3Rpb24gYXNpbihtYXRyaXgpIHtcbiAgICBjb25zdCBuZXdNYXRyaXggPSBuZXcgTWF0cml4KG1hdHJpeCk7XG4gICAgcmV0dXJuIG5ld01hdHJpeC5hc2luKCk7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLmFzaW5oID0gZnVuY3Rpb24gYXNpbmgoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCBNYXRoLmFzaW5oKHRoaXMuZ2V0KGksIGopKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LmFzaW5oID0gZnVuY3Rpb24gYXNpbmgobWF0cml4KSB7XG4gICAgY29uc3QgbmV3TWF0cml4ID0gbmV3IE1hdHJpeChtYXRyaXgpO1xuICAgIHJldHVybiBuZXdNYXRyaXguYXNpbmgoKTtcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUuYXRhbiA9IGZ1bmN0aW9uIGF0YW4oKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCBNYXRoLmF0YW4odGhpcy5nZXQoaSwgaikpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXguYXRhbiA9IGZ1bmN0aW9uIGF0YW4obWF0cml4KSB7XG4gICAgY29uc3QgbmV3TWF0cml4ID0gbmV3IE1hdHJpeChtYXRyaXgpO1xuICAgIHJldHVybiBuZXdNYXRyaXguYXRhbigpO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5hdGFuaCA9IGZ1bmN0aW9uIGF0YW5oKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgdGhpcy5zZXQoaSwgaiwgTWF0aC5hdGFuaCh0aGlzLmdldChpLCBqKSkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5hdGFuaCA9IGZ1bmN0aW9uIGF0YW5oKG1hdHJpeCkge1xuICAgIGNvbnN0IG5ld01hdHJpeCA9IG5ldyBNYXRyaXgobWF0cml4KTtcbiAgICByZXR1cm4gbmV3TWF0cml4LmF0YW5oKCk7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLmNicnQgPSBmdW5jdGlvbiBjYnJ0KCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgdGhpcy5zZXQoaSwgaiwgTWF0aC5jYnJ0KHRoaXMuZ2V0KGksIGopKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LmNicnQgPSBmdW5jdGlvbiBjYnJ0KG1hdHJpeCkge1xuICAgIGNvbnN0IG5ld01hdHJpeCA9IG5ldyBNYXRyaXgobWF0cml4KTtcbiAgICByZXR1cm4gbmV3TWF0cml4LmNicnQoKTtcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUuY2VpbCA9IGZ1bmN0aW9uIGNlaWwoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCBNYXRoLmNlaWwodGhpcy5nZXQoaSwgaikpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXguY2VpbCA9IGZ1bmN0aW9uIGNlaWwobWF0cml4KSB7XG4gICAgY29uc3QgbmV3TWF0cml4ID0gbmV3IE1hdHJpeChtYXRyaXgpO1xuICAgIHJldHVybiBuZXdNYXRyaXguY2VpbCgpO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5jbHozMiA9IGZ1bmN0aW9uIGNsejMyKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgdGhpcy5zZXQoaSwgaiwgTWF0aC5jbHozMih0aGlzLmdldChpLCBqKSkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5jbHozMiA9IGZ1bmN0aW9uIGNsejMyKG1hdHJpeCkge1xuICAgIGNvbnN0IG5ld01hdHJpeCA9IG5ldyBNYXRyaXgobWF0cml4KTtcbiAgICByZXR1cm4gbmV3TWF0cml4LmNsejMyKCk7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLmNvcyA9IGZ1bmN0aW9uIGNvcygpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sdW1uczsgaisrKSB7XG4gICAgICAgIHRoaXMuc2V0KGksIGosIE1hdGguY29zKHRoaXMuZ2V0KGksIGopKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LmNvcyA9IGZ1bmN0aW9uIGNvcyhtYXRyaXgpIHtcbiAgICBjb25zdCBuZXdNYXRyaXggPSBuZXcgTWF0cml4KG1hdHJpeCk7XG4gICAgcmV0dXJuIG5ld01hdHJpeC5jb3MoKTtcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUuY29zaCA9IGZ1bmN0aW9uIGNvc2goKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCBNYXRoLmNvc2godGhpcy5nZXQoaSwgaikpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXguY29zaCA9IGZ1bmN0aW9uIGNvc2gobWF0cml4KSB7XG4gICAgY29uc3QgbmV3TWF0cml4ID0gbmV3IE1hdHJpeChtYXRyaXgpO1xuICAgIHJldHVybiBuZXdNYXRyaXguY29zaCgpO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5leHAgPSBmdW5jdGlvbiBleHAoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCBNYXRoLmV4cCh0aGlzLmdldChpLCBqKSkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5leHAgPSBmdW5jdGlvbiBleHAobWF0cml4KSB7XG4gICAgY29uc3QgbmV3TWF0cml4ID0gbmV3IE1hdHJpeChtYXRyaXgpO1xuICAgIHJldHVybiBuZXdNYXRyaXguZXhwKCk7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLmV4cG0xID0gZnVuY3Rpb24gZXhwbTEoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCBNYXRoLmV4cG0xKHRoaXMuZ2V0KGksIGopKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LmV4cG0xID0gZnVuY3Rpb24gZXhwbTEobWF0cml4KSB7XG4gICAgY29uc3QgbmV3TWF0cml4ID0gbmV3IE1hdHJpeChtYXRyaXgpO1xuICAgIHJldHVybiBuZXdNYXRyaXguZXhwbTEoKTtcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUuZmxvb3IgPSBmdW5jdGlvbiBmbG9vcigpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sdW1uczsgaisrKSB7XG4gICAgICAgIHRoaXMuc2V0KGksIGosIE1hdGguZmxvb3IodGhpcy5nZXQoaSwgaikpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXguZmxvb3IgPSBmdW5jdGlvbiBmbG9vcihtYXRyaXgpIHtcbiAgICBjb25zdCBuZXdNYXRyaXggPSBuZXcgTWF0cml4KG1hdHJpeCk7XG4gICAgcmV0dXJuIG5ld01hdHJpeC5mbG9vcigpO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5mcm91bmQgPSBmdW5jdGlvbiBmcm91bmQoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCBNYXRoLmZyb3VuZCh0aGlzLmdldChpLCBqKSkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5mcm91bmQgPSBmdW5jdGlvbiBmcm91bmQobWF0cml4KSB7XG4gICAgY29uc3QgbmV3TWF0cml4ID0gbmV3IE1hdHJpeChtYXRyaXgpO1xuICAgIHJldHVybiBuZXdNYXRyaXguZnJvdW5kKCk7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLmxvZyA9IGZ1bmN0aW9uIGxvZygpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sdW1uczsgaisrKSB7XG4gICAgICAgIHRoaXMuc2V0KGksIGosIE1hdGgubG9nKHRoaXMuZ2V0KGksIGopKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LmxvZyA9IGZ1bmN0aW9uIGxvZyhtYXRyaXgpIHtcbiAgICBjb25zdCBuZXdNYXRyaXggPSBuZXcgTWF0cml4KG1hdHJpeCk7XG4gICAgcmV0dXJuIG5ld01hdHJpeC5sb2coKTtcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUubG9nMXAgPSBmdW5jdGlvbiBsb2cxcCgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sdW1uczsgaisrKSB7XG4gICAgICAgIHRoaXMuc2V0KGksIGosIE1hdGgubG9nMXAodGhpcy5nZXQoaSwgaikpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgubG9nMXAgPSBmdW5jdGlvbiBsb2cxcChtYXRyaXgpIHtcbiAgICBjb25zdCBuZXdNYXRyaXggPSBuZXcgTWF0cml4KG1hdHJpeCk7XG4gICAgcmV0dXJuIG5ld01hdHJpeC5sb2cxcCgpO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5sb2cxMCA9IGZ1bmN0aW9uIGxvZzEwKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgdGhpcy5zZXQoaSwgaiwgTWF0aC5sb2cxMCh0aGlzLmdldChpLCBqKSkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5sb2cxMCA9IGZ1bmN0aW9uIGxvZzEwKG1hdHJpeCkge1xuICAgIGNvbnN0IG5ld01hdHJpeCA9IG5ldyBNYXRyaXgobWF0cml4KTtcbiAgICByZXR1cm4gbmV3TWF0cml4LmxvZzEwKCk7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLmxvZzIgPSBmdW5jdGlvbiBsb2cyKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgdGhpcy5zZXQoaSwgaiwgTWF0aC5sb2cyKHRoaXMuZ2V0KGksIGopKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LmxvZzIgPSBmdW5jdGlvbiBsb2cyKG1hdHJpeCkge1xuICAgIGNvbnN0IG5ld01hdHJpeCA9IG5ldyBNYXRyaXgobWF0cml4KTtcbiAgICByZXR1cm4gbmV3TWF0cml4LmxvZzIoKTtcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUucm91bmQgPSBmdW5jdGlvbiByb3VuZCgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sdW1uczsgaisrKSB7XG4gICAgICAgIHRoaXMuc2V0KGksIGosIE1hdGgucm91bmQodGhpcy5nZXQoaSwgaikpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgucm91bmQgPSBmdW5jdGlvbiByb3VuZChtYXRyaXgpIHtcbiAgICBjb25zdCBuZXdNYXRyaXggPSBuZXcgTWF0cml4KG1hdHJpeCk7XG4gICAgcmV0dXJuIG5ld01hdHJpeC5yb3VuZCgpO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5zaWduID0gZnVuY3Rpb24gc2lnbigpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sdW1uczsgaisrKSB7XG4gICAgICAgIHRoaXMuc2V0KGksIGosIE1hdGguc2lnbih0aGlzLmdldChpLCBqKSkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5zaWduID0gZnVuY3Rpb24gc2lnbihtYXRyaXgpIHtcbiAgICBjb25zdCBuZXdNYXRyaXggPSBuZXcgTWF0cml4KG1hdHJpeCk7XG4gICAgcmV0dXJuIG5ld01hdHJpeC5zaWduKCk7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLnNpbiA9IGZ1bmN0aW9uIHNpbigpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sdW1uczsgaisrKSB7XG4gICAgICAgIHRoaXMuc2V0KGksIGosIE1hdGguc2luKHRoaXMuZ2V0KGksIGopKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnNpbiA9IGZ1bmN0aW9uIHNpbihtYXRyaXgpIHtcbiAgICBjb25zdCBuZXdNYXRyaXggPSBuZXcgTWF0cml4KG1hdHJpeCk7XG4gICAgcmV0dXJuIG5ld01hdHJpeC5zaW4oKTtcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUuc2luaCA9IGZ1bmN0aW9uIHNpbmgoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCBNYXRoLnNpbmgodGhpcy5nZXQoaSwgaikpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXguc2luaCA9IGZ1bmN0aW9uIHNpbmgobWF0cml4KSB7XG4gICAgY29uc3QgbmV3TWF0cml4ID0gbmV3IE1hdHJpeChtYXRyaXgpO1xuICAgIHJldHVybiBuZXdNYXRyaXguc2luaCgpO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5zcXJ0ID0gZnVuY3Rpb24gc3FydCgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sdW1uczsgaisrKSB7XG4gICAgICAgIHRoaXMuc2V0KGksIGosIE1hdGguc3FydCh0aGlzLmdldChpLCBqKSkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5zcXJ0ID0gZnVuY3Rpb24gc3FydChtYXRyaXgpIHtcbiAgICBjb25zdCBuZXdNYXRyaXggPSBuZXcgTWF0cml4KG1hdHJpeCk7XG4gICAgcmV0dXJuIG5ld01hdHJpeC5zcXJ0KCk7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLnRhbiA9IGZ1bmN0aW9uIHRhbigpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sdW1uczsgaisrKSB7XG4gICAgICAgIHRoaXMuc2V0KGksIGosIE1hdGgudGFuKHRoaXMuZ2V0KGksIGopKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnRhbiA9IGZ1bmN0aW9uIHRhbihtYXRyaXgpIHtcbiAgICBjb25zdCBuZXdNYXRyaXggPSBuZXcgTWF0cml4KG1hdHJpeCk7XG4gICAgcmV0dXJuIG5ld01hdHJpeC50YW4oKTtcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUudGFuaCA9IGZ1bmN0aW9uIHRhbmgoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCBNYXRoLnRhbmgodGhpcy5nZXQoaSwgaikpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgudGFuaCA9IGZ1bmN0aW9uIHRhbmgobWF0cml4KSB7XG4gICAgY29uc3QgbmV3TWF0cml4ID0gbmV3IE1hdHJpeChtYXRyaXgpO1xuICAgIHJldHVybiBuZXdNYXRyaXgudGFuaCgpO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS50cnVuYyA9IGZ1bmN0aW9uIHRydW5jKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgdGhpcy5zZXQoaSwgaiwgTWF0aC50cnVuYyh0aGlzLmdldChpLCBqKSkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC50cnVuYyA9IGZ1bmN0aW9uIHRydW5jKG1hdHJpeCkge1xuICAgIGNvbnN0IG5ld01hdHJpeCA9IG5ldyBNYXRyaXgobWF0cml4KTtcbiAgICByZXR1cm4gbmV3TWF0cml4LnRydW5jKCk7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgucG93ID0gZnVuY3Rpb24gcG93KG1hdHJpeCwgYXJnMCkge1xuICAgIGNvbnN0IG5ld01hdHJpeCA9IG5ldyBNYXRyaXgobWF0cml4KTtcbiAgICByZXR1cm4gbmV3TWF0cml4LnBvdyhhcmcwKTtcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUucG93ID0gZnVuY3Rpb24gcG93KHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHJldHVybiB0aGlzLnBvd1ModmFsdWUpO1xuICAgIHJldHVybiB0aGlzLnBvd00odmFsdWUpO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5wb3dTID0gZnVuY3Rpb24gcG93Uyh2YWx1ZSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgdGhpcy5zZXQoaSwgaiwgTWF0aC5wb3codGhpcy5nZXQoaSwgaiksIHZhbHVlKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5wb3dNID0gZnVuY3Rpb24gcG93TShtYXRyaXgpIHtcbiAgICBtYXRyaXggPSBNYXRyaXguY2hlY2tNYXRyaXgobWF0cml4KTtcbiAgICBpZiAodGhpcy5yb3dzICE9PSBtYXRyaXgucm93cyB8fFxuICAgICAgdGhpcy5jb2x1bW5zICE9PSBtYXRyaXguY29sdW1ucykge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ01hdHJpY2VzIGRpbWVuc2lvbnMgbXVzdCBiZSBlcXVhbCcpO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sdW1uczsgaisrKSB7XG4gICAgICAgIHRoaXMuc2V0KGksIGosIE1hdGgucG93KHRoaXMuZ2V0KGksIGopLCBtYXRyaXguZ2V0KGksIGopKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xufVxuIiwiaW1wb3J0IHJlc2NhbGUgZnJvbSAnbWwtYXJyYXktcmVzY2FsZSc7XG5cbmltcG9ydCB7IGluc3BlY3RNYXRyaXgsIGluc3BlY3RNYXRyaXhXaXRoT3B0aW9ucyB9IGZyb20gJy4vaW5zcGVjdCc7XG5pbXBvcnQgeyBpbnN0YWxsTWF0aE9wZXJhdGlvbnMgfSBmcm9tICcuL21hdGhPcGVyYXRpb25zJztcbmltcG9ydCB7XG4gIHN1bUJ5Um93LFxuICBzdW1CeUNvbHVtbixcbiAgc3VtQWxsLFxuICBwcm9kdWN0QnlSb3csXG4gIHByb2R1Y3RCeUNvbHVtbixcbiAgcHJvZHVjdEFsbCxcbiAgdmFyaWFuY2VCeVJvdyxcbiAgdmFyaWFuY2VCeUNvbHVtbixcbiAgdmFyaWFuY2VBbGwsXG4gIGNlbnRlckJ5Um93LFxuICBjZW50ZXJCeUNvbHVtbixcbiAgY2VudGVyQWxsLFxuICBzY2FsZUJ5Um93LFxuICBzY2FsZUJ5Q29sdW1uLFxuICBzY2FsZUFsbCxcbiAgZ2V0U2NhbGVCeVJvdyxcbiAgZ2V0U2NhbGVCeUNvbHVtbixcbiAgZ2V0U2NhbGVBbGwsXG59IGZyb20gJy4vc3RhdCc7XG5pbXBvcnQge1xuICBjaGVja1Jvd1ZlY3RvcixcbiAgY2hlY2tSb3dJbmRleCxcbiAgY2hlY2tDb2x1bW5JbmRleCxcbiAgY2hlY2tDb2x1bW5WZWN0b3IsXG4gIGNoZWNrUmFuZ2UsXG4gIGNoZWNrSW5kaWNlcyxcbn0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IGNsYXNzIEFic3RyYWN0TWF0cml4IHtcbiAgc3RhdGljIGZyb20xREFycmF5KG5ld1Jvd3MsIG5ld0NvbHVtbnMsIG5ld0RhdGEpIHtcbiAgICBsZXQgbGVuZ3RoID0gbmV3Um93cyAqIG5ld0NvbHVtbnM7XG4gICAgaWYgKGxlbmd0aCAhPT0gbmV3RGF0YS5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdkYXRhIGxlbmd0aCBkb2VzIG5vdCBtYXRjaCBnaXZlbiBkaW1lbnNpb25zJyk7XG4gICAgfVxuICAgIGxldCBuZXdNYXRyaXggPSBuZXcgTWF0cml4KG5ld1Jvd3MsIG5ld0NvbHVtbnMpO1xuICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IG5ld1Jvd3M7IHJvdysrKSB7XG4gICAgICBmb3IgKGxldCBjb2x1bW4gPSAwOyBjb2x1bW4gPCBuZXdDb2x1bW5zOyBjb2x1bW4rKykge1xuICAgICAgICBuZXdNYXRyaXguc2V0KHJvdywgY29sdW1uLCBuZXdEYXRhW3JvdyAqIG5ld0NvbHVtbnMgKyBjb2x1bW5dKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5ld01hdHJpeDtcbiAgfVxuXG4gIHN0YXRpYyByb3dWZWN0b3IobmV3RGF0YSkge1xuICAgIGxldCB2ZWN0b3IgPSBuZXcgTWF0cml4KDEsIG5ld0RhdGEubGVuZ3RoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld0RhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZlY3Rvci5zZXQoMCwgaSwgbmV3RGF0YVtpXSk7XG4gICAgfVxuICAgIHJldHVybiB2ZWN0b3I7XG4gIH1cblxuICBzdGF0aWMgY29sdW1uVmVjdG9yKG5ld0RhdGEpIHtcbiAgICBsZXQgdmVjdG9yID0gbmV3IE1hdHJpeChuZXdEYXRhLmxlbmd0aCwgMSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdEYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2ZWN0b3Iuc2V0KGksIDAsIG5ld0RhdGFbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gdmVjdG9yO1xuICB9XG5cbiAgc3RhdGljIHplcm9zKHJvd3MsIGNvbHVtbnMpIHtcbiAgICByZXR1cm4gbmV3IE1hdHJpeChyb3dzLCBjb2x1bW5zKTtcbiAgfVxuXG4gIHN0YXRpYyBvbmVzKHJvd3MsIGNvbHVtbnMpIHtcbiAgICByZXR1cm4gbmV3IE1hdHJpeChyb3dzLCBjb2x1bW5zKS5maWxsKDEpO1xuICB9XG5cbiAgc3RhdGljIHJhbmQocm93cywgY29sdW1ucywgb3B0aW9ucyA9IHt9KSB7XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignb3B0aW9ucyBtdXN0IGJlIGFuIG9iamVjdCcpO1xuICAgIH1cbiAgICBjb25zdCB7IHJhbmRvbSA9IE1hdGgucmFuZG9tIH0gPSBvcHRpb25zO1xuICAgIGxldCBtYXRyaXggPSBuZXcgTWF0cml4KHJvd3MsIGNvbHVtbnMpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNvbHVtbnM7IGorKykge1xuICAgICAgICBtYXRyaXguc2V0KGksIGosIHJhbmRvbSgpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1hdHJpeDtcbiAgfVxuXG4gIHN0YXRpYyByYW5kSW50KHJvd3MsIGNvbHVtbnMsIG9wdGlvbnMgPSB7fSkge1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ29wdGlvbnMgbXVzdCBiZSBhbiBvYmplY3QnKTtcbiAgICB9XG4gICAgY29uc3QgeyBtaW4gPSAwLCBtYXggPSAxMDAwLCByYW5kb20gPSBNYXRoLnJhbmRvbSB9ID0gb3B0aW9ucztcbiAgICBpZiAoIU51bWJlci5pc0ludGVnZXIobWluKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignbWluIG11c3QgYmUgYW4gaW50ZWdlcicpO1xuICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihtYXgpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdtYXggbXVzdCBiZSBhbiBpbnRlZ2VyJyk7XG4gICAgaWYgKG1pbiA+PSBtYXgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdtaW4gbXVzdCBiZSBzbWFsbGVyIHRoYW4gbWF4Jyk7XG4gICAgbGV0IGludGVydmFsID0gbWF4IC0gbWluO1xuICAgIGxldCBtYXRyaXggPSBuZXcgTWF0cml4KHJvd3MsIGNvbHVtbnMpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNvbHVtbnM7IGorKykge1xuICAgICAgICBsZXQgdmFsdWUgPSBtaW4gKyBNYXRoLnJvdW5kKHJhbmRvbSgpICogaW50ZXJ2YWwpO1xuICAgICAgICBtYXRyaXguc2V0KGksIGosIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1hdHJpeDtcbiAgfVxuXG4gIHN0YXRpYyBleWUocm93cywgY29sdW1ucywgdmFsdWUpIHtcbiAgICBpZiAoY29sdW1ucyA9PT0gdW5kZWZpbmVkKSBjb2x1bW5zID0gcm93cztcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgdmFsdWUgPSAxO1xuICAgIGxldCBtaW4gPSBNYXRoLm1pbihyb3dzLCBjb2x1bW5zKTtcbiAgICBsZXQgbWF0cml4ID0gdGhpcy56ZXJvcyhyb3dzLCBjb2x1bW5zKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1pbjsgaSsrKSB7XG4gICAgICBtYXRyaXguc2V0KGksIGksIHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIG1hdHJpeDtcbiAgfVxuXG4gIHN0YXRpYyBkaWFnKGRhdGEsIHJvd3MsIGNvbHVtbnMpIHtcbiAgICBsZXQgbCA9IGRhdGEubGVuZ3RoO1xuICAgIGlmIChyb3dzID09PSB1bmRlZmluZWQpIHJvd3MgPSBsO1xuICAgIGlmIChjb2x1bW5zID09PSB1bmRlZmluZWQpIGNvbHVtbnMgPSByb3dzO1xuICAgIGxldCBtaW4gPSBNYXRoLm1pbihsLCByb3dzLCBjb2x1bW5zKTtcbiAgICBsZXQgbWF0cml4ID0gdGhpcy56ZXJvcyhyb3dzLCBjb2x1bW5zKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1pbjsgaSsrKSB7XG4gICAgICBtYXRyaXguc2V0KGksIGksIGRhdGFbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gbWF0cml4O1xuICB9XG5cbiAgc3RhdGljIG1pbihtYXRyaXgxLCBtYXRyaXgyKSB7XG4gICAgbWF0cml4MSA9IHRoaXMuY2hlY2tNYXRyaXgobWF0cml4MSk7XG4gICAgbWF0cml4MiA9IHRoaXMuY2hlY2tNYXRyaXgobWF0cml4Mik7XG4gICAgbGV0IHJvd3MgPSBtYXRyaXgxLnJvd3M7XG4gICAgbGV0IGNvbHVtbnMgPSBtYXRyaXgxLmNvbHVtbnM7XG4gICAgbGV0IHJlc3VsdCA9IG5ldyBNYXRyaXgocm93cywgY29sdW1ucyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sdW1uczsgaisrKSB7XG4gICAgICAgIHJlc3VsdC5zZXQoaSwgaiwgTWF0aC5taW4obWF0cml4MS5nZXQoaSwgaiksIG1hdHJpeDIuZ2V0KGksIGopKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBzdGF0aWMgbWF4KG1hdHJpeDEsIG1hdHJpeDIpIHtcbiAgICBtYXRyaXgxID0gdGhpcy5jaGVja01hdHJpeChtYXRyaXgxKTtcbiAgICBtYXRyaXgyID0gdGhpcy5jaGVja01hdHJpeChtYXRyaXgyKTtcbiAgICBsZXQgcm93cyA9IG1hdHJpeDEucm93cztcbiAgICBsZXQgY29sdW1ucyA9IG1hdHJpeDEuY29sdW1ucztcbiAgICBsZXQgcmVzdWx0ID0gbmV3IHRoaXMocm93cywgY29sdW1ucyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sdW1uczsgaisrKSB7XG4gICAgICAgIHJlc3VsdC5zZXQoaSwgaiwgTWF0aC5tYXgobWF0cml4MS5nZXQoaSwgaiksIG1hdHJpeDIuZ2V0KGksIGopKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBzdGF0aWMgY2hlY2tNYXRyaXgodmFsdWUpIHtcbiAgICByZXR1cm4gQWJzdHJhY3RNYXRyaXguaXNNYXRyaXgodmFsdWUpID8gdmFsdWUgOiBuZXcgTWF0cml4KHZhbHVlKTtcbiAgfVxuXG4gIHN0YXRpYyBpc01hdHJpeCh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIHZhbHVlLmtsYXNzID09PSAnTWF0cml4JztcbiAgfVxuXG4gIGdldCBzaXplKCkge1xuICAgIHJldHVybiB0aGlzLnJvd3MgKiB0aGlzLmNvbHVtbnM7XG4gIH1cblxuICBhcHBseShjYWxsYmFjaykge1xuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2NhbGxiYWNrIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sdW1uczsgaisrKSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwodGhpcywgaSwgaik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdG8xREFycmF5KCkge1xuICAgIGxldCBhcnJheSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgYXJyYXkucHVzaCh0aGlzLmdldChpLCBqKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcnJheTtcbiAgfVxuXG4gIHRvMkRBcnJheSgpIHtcbiAgICBsZXQgY29weSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGNvcHkucHVzaChbXSk7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sdW1uczsgaisrKSB7XG4gICAgICAgIGNvcHlbaV0ucHVzaCh0aGlzLmdldChpLCBqKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb3B5O1xuICB9XG5cbiAgdG9KU09OKCkge1xuICAgIHJldHVybiB0aGlzLnRvMkRBcnJheSgpO1xuICB9XG5cbiAgaXNSb3dWZWN0b3IoKSB7XG4gICAgcmV0dXJuIHRoaXMucm93cyA9PT0gMTtcbiAgfVxuXG4gIGlzQ29sdW1uVmVjdG9yKCkge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbnMgPT09IDE7XG4gIH1cblxuICBpc1ZlY3RvcigpIHtcbiAgICByZXR1cm4gdGhpcy5yb3dzID09PSAxIHx8IHRoaXMuY29sdW1ucyA9PT0gMTtcbiAgfVxuXG4gIGlzU3F1YXJlKCkge1xuICAgIHJldHVybiB0aGlzLnJvd3MgPT09IHRoaXMuY29sdW1ucztcbiAgfVxuXG4gIGlzU3ltbWV0cmljKCkge1xuICAgIGlmICh0aGlzLmlzU3F1YXJlKCkpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPD0gaTsgaisrKSB7XG4gICAgICAgICAgaWYgKHRoaXMuZ2V0KGksIGopICE9PSB0aGlzLmdldChqLCBpKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzRWNoZWxvbkZvcm0oKSB7XG4gICAgbGV0IGkgPSAwO1xuICAgIGxldCBqID0gMDtcbiAgICBsZXQgcHJldmlvdXNDb2x1bW4gPSAtMTtcbiAgICBsZXQgaXNFY2hlbG9uRm9ybSA9IHRydWU7XG4gICAgbGV0IGNoZWNrZWQgPSBmYWxzZTtcbiAgICB3aGlsZSAoaSA8IHRoaXMucm93cyAmJiBpc0VjaGVsb25Gb3JtKSB7XG4gICAgICBqID0gMDtcbiAgICAgIGNoZWNrZWQgPSBmYWxzZTtcbiAgICAgIHdoaWxlIChqIDwgdGhpcy5jb2x1bW5zICYmIGNoZWNrZWQgPT09IGZhbHNlKSB7XG4gICAgICAgIGlmICh0aGlzLmdldChpLCBqKSA9PT0gMCkge1xuICAgICAgICAgIGorKztcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmdldChpLCBqKSA9PT0gMSAmJiBqID4gcHJldmlvdXNDb2x1bW4pIHtcbiAgICAgICAgICBjaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgICBwcmV2aW91c0NvbHVtbiA9IGo7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXNFY2hlbG9uRm9ybSA9IGZhbHNlO1xuICAgICAgICAgIGNoZWNrZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpKys7XG4gICAgfVxuICAgIHJldHVybiBpc0VjaGVsb25Gb3JtO1xuICB9XG5cbiAgaXNSZWR1Y2VkRWNoZWxvbkZvcm0oKSB7XG4gICAgbGV0IGkgPSAwO1xuICAgIGxldCBqID0gMDtcbiAgICBsZXQgcHJldmlvdXNDb2x1bW4gPSAtMTtcbiAgICBsZXQgaXNSZWR1Y2VkRWNoZWxvbkZvcm0gPSB0cnVlO1xuICAgIGxldCBjaGVja2VkID0gZmFsc2U7XG4gICAgd2hpbGUgKGkgPCB0aGlzLnJvd3MgJiYgaXNSZWR1Y2VkRWNoZWxvbkZvcm0pIHtcbiAgICAgIGogPSAwO1xuICAgICAgY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgd2hpbGUgKGogPCB0aGlzLmNvbHVtbnMgJiYgY2hlY2tlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0KGksIGopID09PSAwKSB7XG4gICAgICAgICAgaisrO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZ2V0KGksIGopID09PSAxICYmIGogPiBwcmV2aW91c0NvbHVtbikge1xuICAgICAgICAgIGNoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgIHByZXZpb3VzQ29sdW1uID0gajtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpc1JlZHVjZWRFY2hlbG9uRm9ybSA9IGZhbHNlO1xuICAgICAgICAgIGNoZWNrZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBrID0gaiArIDE7IGsgPCB0aGlzLnJvd3M7IGsrKykge1xuICAgICAgICBpZiAodGhpcy5nZXQoaSwgaykgIT09IDApIHtcbiAgICAgICAgICBpc1JlZHVjZWRFY2hlbG9uRm9ybSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpKys7XG4gICAgfVxuICAgIHJldHVybiBpc1JlZHVjZWRFY2hlbG9uRm9ybTtcbiAgfVxuXG4gIGVjaGVsb25Gb3JtKCkge1xuICAgIGxldCByZXN1bHQgPSB0aGlzLmNsb25lKCk7XG4gICAgbGV0IGggPSAwO1xuICAgIGxldCBrID0gMDtcbiAgICB3aGlsZSAoaCA8IHJlc3VsdC5yb3dzICYmIGsgPCByZXN1bHQuY29sdW1ucykge1xuICAgICAgbGV0IGlNYXggPSBoO1xuICAgICAgZm9yIChsZXQgaSA9IGg7IGkgPCByZXN1bHQucm93czsgaSsrKSB7XG4gICAgICAgIGlmIChyZXN1bHQuZ2V0KGksIGspID4gcmVzdWx0LmdldChpTWF4LCBrKSkge1xuICAgICAgICAgIGlNYXggPSBpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAocmVzdWx0LmdldChpTWF4LCBrKSA9PT0gMCkge1xuICAgICAgICBrKys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQuc3dhcFJvd3MoaCwgaU1heCk7XG4gICAgICAgIGxldCB0bXAgPSByZXN1bHQuZ2V0KGgsIGspO1xuICAgICAgICBmb3IgKGxldCBqID0gazsgaiA8IHJlc3VsdC5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgICByZXN1bHQuc2V0KGgsIGosIHJlc3VsdC5nZXQoaCwgaikgLyB0bXApO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSBoICsgMTsgaSA8IHJlc3VsdC5yb3dzOyBpKyspIHtcbiAgICAgICAgICBsZXQgZmFjdG9yID0gcmVzdWx0LmdldChpLCBrKSAvIHJlc3VsdC5nZXQoaCwgayk7XG4gICAgICAgICAgcmVzdWx0LnNldChpLCBrLCAwKTtcbiAgICAgICAgICBmb3IgKGxldCBqID0gayArIDE7IGogPCByZXN1bHQuY29sdW1uczsgaisrKSB7XG4gICAgICAgICAgICByZXN1bHQuc2V0KGksIGosIHJlc3VsdC5nZXQoaSwgaikgLSByZXN1bHQuZ2V0KGgsIGopICogZmFjdG9yKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaCsrO1xuICAgICAgICBrKys7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICByZWR1Y2VkRWNoZWxvbkZvcm0oKSB7XG4gICAgbGV0IHJlc3VsdCA9IHRoaXMuZWNoZWxvbkZvcm0oKTtcbiAgICBsZXQgbSA9IHJlc3VsdC5jb2x1bW5zO1xuICAgIGxldCBuID0gcmVzdWx0LnJvd3M7XG4gICAgbGV0IGggPSBuIC0gMTtcbiAgICB3aGlsZSAoaCA+PSAwKSB7XG4gICAgICBpZiAocmVzdWx0Lm1heFJvdyhoKSA9PT0gMCkge1xuICAgICAgICBoLS07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgcCA9IDA7XG4gICAgICAgIGxldCBwaXZvdCA9IGZhbHNlO1xuICAgICAgICB3aGlsZSAocCA8IG4gJiYgcGl2b3QgPT09IGZhbHNlKSB7XG4gICAgICAgICAgaWYgKHJlc3VsdC5nZXQoaCwgcCkgPT09IDEpIHtcbiAgICAgICAgICAgIHBpdm90ID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcCsrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGg7IGkrKykge1xuICAgICAgICAgIGxldCBmYWN0b3IgPSByZXN1bHQuZ2V0KGksIHApO1xuICAgICAgICAgIGZvciAobGV0IGogPSBwOyBqIDwgbTsgaisrKSB7XG4gICAgICAgICAgICBsZXQgdG1wID0gcmVzdWx0LmdldChpLCBqKSAtIGZhY3RvciAqIHJlc3VsdC5nZXQoaCwgaik7XG4gICAgICAgICAgICByZXN1bHQuc2V0KGksIGosIHRtcCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGgtLTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHNldCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldCBtZXRob2QgaXMgdW5pbXBsZW1lbnRlZCcpO1xuICB9XG5cbiAgZ2V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignZ2V0IG1ldGhvZCBpcyB1bmltcGxlbWVudGVkJyk7XG4gIH1cblxuICByZXBlYXQob3B0aW9ucyA9IHt9KSB7XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignb3B0aW9ucyBtdXN0IGJlIGFuIG9iamVjdCcpO1xuICAgIH1cbiAgICBjb25zdCB7IHJvd3MgPSAxLCBjb2x1bW5zID0gMSB9ID0gb3B0aW9ucztcbiAgICBpZiAoIU51bWJlci5pc0ludGVnZXIocm93cykgfHwgcm93cyA8PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdyb3dzIG11c3QgYmUgYSBwb3NpdGl2ZSBpbnRlZ2VyJyk7XG4gICAgfVxuICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihjb2x1bW5zKSB8fCBjb2x1bW5zIDw9IDApIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2NvbHVtbnMgbXVzdCBiZSBhIHBvc2l0aXZlIGludGVnZXInKTtcbiAgICB9XG4gICAgbGV0IG1hdHJpeCA9IG5ldyBNYXRyaXgodGhpcy5yb3dzICogcm93cywgdGhpcy5jb2x1bW5zICogY29sdW1ucyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sdW1uczsgaisrKSB7XG4gICAgICAgIG1hdHJpeC5zZXRTdWJNYXRyaXgodGhpcywgdGhpcy5yb3dzICogaSwgdGhpcy5jb2x1bW5zICogaik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtYXRyaXg7XG4gIH1cblxuICBmaWxsKHZhbHVlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbmVnKCkge1xuICAgIHJldHVybiB0aGlzLm11bFMoLTEpO1xuICB9XG5cbiAgZ2V0Um93KGluZGV4KSB7XG4gICAgY2hlY2tSb3dJbmRleCh0aGlzLCBpbmRleCk7XG4gICAgbGV0IHJvdyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb2x1bW5zOyBpKyspIHtcbiAgICAgIHJvdy5wdXNoKHRoaXMuZ2V0KGluZGV4LCBpKSk7XG4gICAgfVxuICAgIHJldHVybiByb3c7XG4gIH1cblxuICBnZXRSb3dWZWN0b3IoaW5kZXgpIHtcbiAgICByZXR1cm4gTWF0cml4LnJvd1ZlY3Rvcih0aGlzLmdldFJvdyhpbmRleCkpO1xuICB9XG5cbiAgc2V0Um93KGluZGV4LCBhcnJheSkge1xuICAgIGNoZWNrUm93SW5kZXgodGhpcywgaW5kZXgpO1xuICAgIGFycmF5ID0gY2hlY2tSb3dWZWN0b3IodGhpcywgYXJyYXkpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb2x1bW5zOyBpKyspIHtcbiAgICAgIHRoaXMuc2V0KGluZGV4LCBpLCBhcnJheVtpXSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc3dhcFJvd3Mocm93MSwgcm93Mikge1xuICAgIGNoZWNrUm93SW5kZXgodGhpcywgcm93MSk7XG4gICAgY2hlY2tSb3dJbmRleCh0aGlzLCByb3cyKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29sdW1uczsgaSsrKSB7XG4gICAgICBsZXQgdGVtcCA9IHRoaXMuZ2V0KHJvdzEsIGkpO1xuICAgICAgdGhpcy5zZXQocm93MSwgaSwgdGhpcy5nZXQocm93MiwgaSkpO1xuICAgICAgdGhpcy5zZXQocm93MiwgaSwgdGVtcCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0Q29sdW1uKGluZGV4KSB7XG4gICAgY2hlY2tDb2x1bW5JbmRleCh0aGlzLCBpbmRleCk7XG4gICAgbGV0IGNvbHVtbiA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGNvbHVtbi5wdXNoKHRoaXMuZ2V0KGksIGluZGV4KSk7XG4gICAgfVxuICAgIHJldHVybiBjb2x1bW47XG4gIH1cblxuICBnZXRDb2x1bW5WZWN0b3IoaW5kZXgpIHtcbiAgICByZXR1cm4gTWF0cml4LmNvbHVtblZlY3Rvcih0aGlzLmdldENvbHVtbihpbmRleCkpO1xuICB9XG5cbiAgc2V0Q29sdW1uKGluZGV4LCBhcnJheSkge1xuICAgIGNoZWNrQ29sdW1uSW5kZXgodGhpcywgaW5kZXgpO1xuICAgIGFycmF5ID0gY2hlY2tDb2x1bW5WZWN0b3IodGhpcywgYXJyYXkpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIHRoaXMuc2V0KGksIGluZGV4LCBhcnJheVtpXSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc3dhcENvbHVtbnMoY29sdW1uMSwgY29sdW1uMikge1xuICAgIGNoZWNrQ29sdW1uSW5kZXgodGhpcywgY29sdW1uMSk7XG4gICAgY2hlY2tDb2x1bW5JbmRleCh0aGlzLCBjb2x1bW4yKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBsZXQgdGVtcCA9IHRoaXMuZ2V0KGksIGNvbHVtbjEpO1xuICAgICAgdGhpcy5zZXQoaSwgY29sdW1uMSwgdGhpcy5nZXQoaSwgY29sdW1uMikpO1xuICAgICAgdGhpcy5zZXQoaSwgY29sdW1uMiwgdGVtcCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgYWRkUm93VmVjdG9yKHZlY3Rvcikge1xuICAgIHZlY3RvciA9IGNoZWNrUm93VmVjdG9yKHRoaXMsIHZlY3Rvcik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCB0aGlzLmdldChpLCBqKSArIHZlY3RvcltqXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc3ViUm93VmVjdG9yKHZlY3Rvcikge1xuICAgIHZlY3RvciA9IGNoZWNrUm93VmVjdG9yKHRoaXMsIHZlY3Rvcik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCB0aGlzLmdldChpLCBqKSAtIHZlY3RvcltqXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbXVsUm93VmVjdG9yKHZlY3Rvcikge1xuICAgIHZlY3RvciA9IGNoZWNrUm93VmVjdG9yKHRoaXMsIHZlY3Rvcik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCB0aGlzLmdldChpLCBqKSAqIHZlY3RvcltqXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZGl2Um93VmVjdG9yKHZlY3Rvcikge1xuICAgIHZlY3RvciA9IGNoZWNrUm93VmVjdG9yKHRoaXMsIHZlY3Rvcik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCB0aGlzLmdldChpLCBqKSAvIHZlY3RvcltqXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgYWRkQ29sdW1uVmVjdG9yKHZlY3Rvcikge1xuICAgIHZlY3RvciA9IGNoZWNrQ29sdW1uVmVjdG9yKHRoaXMsIHZlY3Rvcik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCB0aGlzLmdldChpLCBqKSArIHZlY3RvcltpXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc3ViQ29sdW1uVmVjdG9yKHZlY3Rvcikge1xuICAgIHZlY3RvciA9IGNoZWNrQ29sdW1uVmVjdG9yKHRoaXMsIHZlY3Rvcik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCB0aGlzLmdldChpLCBqKSAtIHZlY3RvcltpXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbXVsQ29sdW1uVmVjdG9yKHZlY3Rvcikge1xuICAgIHZlY3RvciA9IGNoZWNrQ29sdW1uVmVjdG9yKHRoaXMsIHZlY3Rvcik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCB0aGlzLmdldChpLCBqKSAqIHZlY3RvcltpXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZGl2Q29sdW1uVmVjdG9yKHZlY3Rvcikge1xuICAgIHZlY3RvciA9IGNoZWNrQ29sdW1uVmVjdG9yKHRoaXMsIHZlY3Rvcik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCB0aGlzLmdldChpLCBqKSAvIHZlY3RvcltpXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbXVsUm93KGluZGV4LCB2YWx1ZSkge1xuICAgIGNoZWNrUm93SW5kZXgodGhpcywgaW5kZXgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb2x1bW5zOyBpKyspIHtcbiAgICAgIHRoaXMuc2V0KGluZGV4LCBpLCB0aGlzLmdldChpbmRleCwgaSkgKiB2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbXVsQ29sdW1uKGluZGV4LCB2YWx1ZSkge1xuICAgIGNoZWNrQ29sdW1uSW5kZXgodGhpcywgaW5kZXgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIHRoaXMuc2V0KGksIGluZGV4LCB0aGlzLmdldChpLCBpbmRleCkgKiB2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbWF4KCkge1xuICAgIGxldCB2ID0gdGhpcy5nZXQoMCwgMCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICBpZiAodGhpcy5nZXQoaSwgaikgPiB2KSB7XG4gICAgICAgICAgdiA9IHRoaXMuZ2V0KGksIGopO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2O1xuICB9XG5cbiAgbWF4SW5kZXgoKSB7XG4gICAgbGV0IHYgPSB0aGlzLmdldCgwLCAwKTtcbiAgICBsZXQgaWR4ID0gWzAsIDBdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0KGksIGopID4gdikge1xuICAgICAgICAgIHYgPSB0aGlzLmdldChpLCBqKTtcbiAgICAgICAgICBpZHhbMF0gPSBpO1xuICAgICAgICAgIGlkeFsxXSA9IGo7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGlkeDtcbiAgfVxuXG4gIG1pbigpIHtcbiAgICBsZXQgdiA9IHRoaXMuZ2V0KDAsIDApO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0KGksIGopIDwgdikge1xuICAgICAgICAgIHYgPSB0aGlzLmdldChpLCBqKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdjtcbiAgfVxuXG4gIG1pbkluZGV4KCkge1xuICAgIGxldCB2ID0gdGhpcy5nZXQoMCwgMCk7XG4gICAgbGV0IGlkeCA9IFswLCAwXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sdW1uczsgaisrKSB7XG4gICAgICAgIGlmICh0aGlzLmdldChpLCBqKSA8IHYpIHtcbiAgICAgICAgICB2ID0gdGhpcy5nZXQoaSwgaik7XG4gICAgICAgICAgaWR4WzBdID0gaTtcbiAgICAgICAgICBpZHhbMV0gPSBqO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpZHg7XG4gIH1cblxuICBtYXhSb3cocm93KSB7XG4gICAgY2hlY2tSb3dJbmRleCh0aGlzLCByb3cpO1xuICAgIGxldCB2ID0gdGhpcy5nZXQocm93LCAwKTtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IHRoaXMuY29sdW1uczsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5nZXQocm93LCBpKSA+IHYpIHtcbiAgICAgICAgdiA9IHRoaXMuZ2V0KHJvdywgaSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2O1xuICB9XG5cbiAgbWF4Um93SW5kZXgocm93KSB7XG4gICAgY2hlY2tSb3dJbmRleCh0aGlzLCByb3cpO1xuICAgIGxldCB2ID0gdGhpcy5nZXQocm93LCAwKTtcbiAgICBsZXQgaWR4ID0gW3JvdywgMF07XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCB0aGlzLmNvbHVtbnM7IGkrKykge1xuICAgICAgaWYgKHRoaXMuZ2V0KHJvdywgaSkgPiB2KSB7XG4gICAgICAgIHYgPSB0aGlzLmdldChyb3csIGkpO1xuICAgICAgICBpZHhbMV0gPSBpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaWR4O1xuICB9XG5cbiAgbWluUm93KHJvdykge1xuICAgIGNoZWNrUm93SW5kZXgodGhpcywgcm93KTtcbiAgICBsZXQgdiA9IHRoaXMuZ2V0KHJvdywgMCk7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCB0aGlzLmNvbHVtbnM7IGkrKykge1xuICAgICAgaWYgKHRoaXMuZ2V0KHJvdywgaSkgPCB2KSB7XG4gICAgICAgIHYgPSB0aGlzLmdldChyb3csIGkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdjtcbiAgfVxuXG4gIG1pblJvd0luZGV4KHJvdykge1xuICAgIGNoZWNrUm93SW5kZXgodGhpcywgcm93KTtcbiAgICBsZXQgdiA9IHRoaXMuZ2V0KHJvdywgMCk7XG4gICAgbGV0IGlkeCA9IFtyb3csIDBdO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgdGhpcy5jb2x1bW5zOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLmdldChyb3csIGkpIDwgdikge1xuICAgICAgICB2ID0gdGhpcy5nZXQocm93LCBpKTtcbiAgICAgICAgaWR4WzFdID0gaTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGlkeDtcbiAgfVxuXG4gIG1heENvbHVtbihjb2x1bW4pIHtcbiAgICBjaGVja0NvbHVtbkluZGV4KHRoaXMsIGNvbHVtbik7XG4gICAgbGV0IHYgPSB0aGlzLmdldCgwLCBjb2x1bW4pO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLmdldChpLCBjb2x1bW4pID4gdikge1xuICAgICAgICB2ID0gdGhpcy5nZXQoaSwgY29sdW1uKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHY7XG4gIH1cblxuICBtYXhDb2x1bW5JbmRleChjb2x1bW4pIHtcbiAgICBjaGVja0NvbHVtbkluZGV4KHRoaXMsIGNvbHVtbik7XG4gICAgbGV0IHYgPSB0aGlzLmdldCgwLCBjb2x1bW4pO1xuICAgIGxldCBpZHggPSBbMCwgY29sdW1uXTtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5nZXQoaSwgY29sdW1uKSA+IHYpIHtcbiAgICAgICAgdiA9IHRoaXMuZ2V0KGksIGNvbHVtbik7XG4gICAgICAgIGlkeFswXSA9IGk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpZHg7XG4gIH1cblxuICBtaW5Db2x1bW4oY29sdW1uKSB7XG4gICAgY2hlY2tDb2x1bW5JbmRleCh0aGlzLCBjb2x1bW4pO1xuICAgIGxldCB2ID0gdGhpcy5nZXQoMCwgY29sdW1uKTtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5nZXQoaSwgY29sdW1uKSA8IHYpIHtcbiAgICAgICAgdiA9IHRoaXMuZ2V0KGksIGNvbHVtbik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2O1xuICB9XG5cbiAgbWluQ29sdW1uSW5kZXgoY29sdW1uKSB7XG4gICAgY2hlY2tDb2x1bW5JbmRleCh0aGlzLCBjb2x1bW4pO1xuICAgIGxldCB2ID0gdGhpcy5nZXQoMCwgY29sdW1uKTtcbiAgICBsZXQgaWR4ID0gWzAsIGNvbHVtbl07XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgaWYgKHRoaXMuZ2V0KGksIGNvbHVtbikgPCB2KSB7XG4gICAgICAgIHYgPSB0aGlzLmdldChpLCBjb2x1bW4pO1xuICAgICAgICBpZHhbMF0gPSBpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaWR4O1xuICB9XG5cbiAgZGlhZygpIHtcbiAgICBsZXQgbWluID0gTWF0aC5taW4odGhpcy5yb3dzLCB0aGlzLmNvbHVtbnMpO1xuICAgIGxldCBkaWFnID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtaW47IGkrKykge1xuICAgICAgZGlhZy5wdXNoKHRoaXMuZ2V0KGksIGkpKTtcbiAgICB9XG4gICAgcmV0dXJuIGRpYWc7XG4gIH1cblxuICBub3JtKHR5cGUgPSAnZnJvYmVuaXVzJykge1xuICAgIGxldCByZXN1bHQgPSAwO1xuICAgIGlmICh0eXBlID09PSAnbWF4Jykge1xuICAgICAgcmV0dXJuIHRoaXMubWF4KCk7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnZnJvYmVuaXVzJykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sdW1uczsgaisrKSB7XG4gICAgICAgICAgcmVzdWx0ID0gcmVzdWx0ICsgdGhpcy5nZXQoaSwgaikgKiB0aGlzLmdldChpLCBqKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIE1hdGguc3FydChyZXN1bHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihgdW5rbm93biBub3JtIHR5cGU6ICR7dHlwZX1gKTtcbiAgICB9XG4gIH1cblxuICBjdW11bGF0aXZlU3VtKCkge1xuICAgIGxldCBzdW0gPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgc3VtICs9IHRoaXMuZ2V0KGksIGopO1xuICAgICAgICB0aGlzLnNldChpLCBqLCBzdW0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGRvdCh2ZWN0b3IyKSB7XG4gICAgaWYgKEFic3RyYWN0TWF0cml4LmlzTWF0cml4KHZlY3RvcjIpKSB2ZWN0b3IyID0gdmVjdG9yMi50bzFEQXJyYXkoKTtcbiAgICBsZXQgdmVjdG9yMSA9IHRoaXMudG8xREFycmF5KCk7XG4gICAgaWYgKHZlY3RvcjEubGVuZ3RoICE9PSB2ZWN0b3IyLmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3ZlY3RvcnMgZG8gbm90IGhhdmUgdGhlIHNhbWUgc2l6ZScpO1xuICAgIH1cbiAgICBsZXQgZG90ID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZlY3RvcjEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGRvdCArPSB2ZWN0b3IxW2ldICogdmVjdG9yMltpXTtcbiAgICB9XG4gICAgcmV0dXJuIGRvdDtcbiAgfVxuXG4gIG1tdWwob3RoZXIpIHtcbiAgICBvdGhlciA9IE1hdHJpeC5jaGVja01hdHJpeChvdGhlcik7XG5cbiAgICBsZXQgbSA9IHRoaXMucm93cztcbiAgICBsZXQgbiA9IHRoaXMuY29sdW1ucztcbiAgICBsZXQgcCA9IG90aGVyLmNvbHVtbnM7XG5cbiAgICBsZXQgcmVzdWx0ID0gbmV3IE1hdHJpeChtLCBwKTtcblxuICAgIGxldCBCY29saiA9IG5ldyBGbG9hdDY0QXJyYXkobik7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBwOyBqKyspIHtcbiAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgbjsgaysrKSB7XG4gICAgICAgIEJjb2xqW2tdID0gb3RoZXIuZ2V0KGssIGopO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG07IGkrKykge1xuICAgICAgICBsZXQgcyA9IDA7XG4gICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgbjsgaysrKSB7XG4gICAgICAgICAgcyArPSB0aGlzLmdldChpLCBrKSAqIEJjb2xqW2tdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0LnNldChpLCBqLCBzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHN0cmFzc2VuMngyKG90aGVyKSB7XG4gICAgb3RoZXIgPSBNYXRyaXguY2hlY2tNYXRyaXgob3RoZXIpO1xuICAgIGxldCByZXN1bHQgPSBuZXcgTWF0cml4KDIsIDIpO1xuICAgIGNvbnN0IGExMSA9IHRoaXMuZ2V0KDAsIDApO1xuICAgIGNvbnN0IGIxMSA9IG90aGVyLmdldCgwLCAwKTtcbiAgICBjb25zdCBhMTIgPSB0aGlzLmdldCgwLCAxKTtcbiAgICBjb25zdCBiMTIgPSBvdGhlci5nZXQoMCwgMSk7XG4gICAgY29uc3QgYTIxID0gdGhpcy5nZXQoMSwgMCk7XG4gICAgY29uc3QgYjIxID0gb3RoZXIuZ2V0KDEsIDApO1xuICAgIGNvbnN0IGEyMiA9IHRoaXMuZ2V0KDEsIDEpO1xuICAgIGNvbnN0IGIyMiA9IG90aGVyLmdldCgxLCAxKTtcblxuICAgIC8vIENvbXB1dGUgaW50ZXJtZWRpYXRlIHZhbHVlcy5cbiAgICBjb25zdCBtMSA9IChhMTEgKyBhMjIpICogKGIxMSArIGIyMik7XG4gICAgY29uc3QgbTIgPSAoYTIxICsgYTIyKSAqIGIxMTtcbiAgICBjb25zdCBtMyA9IGExMSAqIChiMTIgLSBiMjIpO1xuICAgIGNvbnN0IG00ID0gYTIyICogKGIyMSAtIGIxMSk7XG4gICAgY29uc3QgbTUgPSAoYTExICsgYTEyKSAqIGIyMjtcbiAgICBjb25zdCBtNiA9IChhMjEgLSBhMTEpICogKGIxMSArIGIxMik7XG4gICAgY29uc3QgbTcgPSAoYTEyIC0gYTIyKSAqIChiMjEgKyBiMjIpO1xuXG4gICAgLy8gQ29tYmluZSBpbnRlcm1lZGlhdGUgdmFsdWVzIGludG8gdGhlIG91dHB1dC5cbiAgICBjb25zdCBjMDAgPSBtMSArIG00IC0gbTUgKyBtNztcbiAgICBjb25zdCBjMDEgPSBtMyArIG01O1xuICAgIGNvbnN0IGMxMCA9IG0yICsgbTQ7XG4gICAgY29uc3QgYzExID0gbTEgLSBtMiArIG0zICsgbTY7XG5cbiAgICByZXN1bHQuc2V0KDAsIDAsIGMwMCk7XG4gICAgcmVzdWx0LnNldCgwLCAxLCBjMDEpO1xuICAgIHJlc3VsdC5zZXQoMSwgMCwgYzEwKTtcbiAgICByZXN1bHQuc2V0KDEsIDEsIGMxMSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHN0cmFzc2VuM3gzKG90aGVyKSB7XG4gICAgb3RoZXIgPSBNYXRyaXguY2hlY2tNYXRyaXgob3RoZXIpO1xuICAgIGxldCByZXN1bHQgPSBuZXcgTWF0cml4KDMsIDMpO1xuXG4gICAgY29uc3QgYTAwID0gdGhpcy5nZXQoMCwgMCk7XG4gICAgY29uc3QgYTAxID0gdGhpcy5nZXQoMCwgMSk7XG4gICAgY29uc3QgYTAyID0gdGhpcy5nZXQoMCwgMik7XG4gICAgY29uc3QgYTEwID0gdGhpcy5nZXQoMSwgMCk7XG4gICAgY29uc3QgYTExID0gdGhpcy5nZXQoMSwgMSk7XG4gICAgY29uc3QgYTEyID0gdGhpcy5nZXQoMSwgMik7XG4gICAgY29uc3QgYTIwID0gdGhpcy5nZXQoMiwgMCk7XG4gICAgY29uc3QgYTIxID0gdGhpcy5nZXQoMiwgMSk7XG4gICAgY29uc3QgYTIyID0gdGhpcy5nZXQoMiwgMik7XG5cbiAgICBjb25zdCBiMDAgPSBvdGhlci5nZXQoMCwgMCk7XG4gICAgY29uc3QgYjAxID0gb3RoZXIuZ2V0KDAsIDEpO1xuICAgIGNvbnN0IGIwMiA9IG90aGVyLmdldCgwLCAyKTtcbiAgICBjb25zdCBiMTAgPSBvdGhlci5nZXQoMSwgMCk7XG4gICAgY29uc3QgYjExID0gb3RoZXIuZ2V0KDEsIDEpO1xuICAgIGNvbnN0IGIxMiA9IG90aGVyLmdldCgxLCAyKTtcbiAgICBjb25zdCBiMjAgPSBvdGhlci5nZXQoMiwgMCk7XG4gICAgY29uc3QgYjIxID0gb3RoZXIuZ2V0KDIsIDEpO1xuICAgIGNvbnN0IGIyMiA9IG90aGVyLmdldCgyLCAyKTtcblxuICAgIGNvbnN0IG0xID0gKGEwMCArIGEwMSArIGEwMiAtIGExMCAtIGExMSAtIGEyMSAtIGEyMikgKiBiMTE7XG4gICAgY29uc3QgbTIgPSAoYTAwIC0gYTEwKSAqICgtYjAxICsgYjExKTtcbiAgICBjb25zdCBtMyA9IGExMSAqICgtYjAwICsgYjAxICsgYjEwIC0gYjExIC0gYjEyIC0gYjIwICsgYjIyKTtcbiAgICBjb25zdCBtNCA9ICgtYTAwICsgYTEwICsgYTExKSAqIChiMDAgLSBiMDEgKyBiMTEpO1xuICAgIGNvbnN0IG01ID0gKGExMCArIGExMSkgKiAoLWIwMCArIGIwMSk7XG4gICAgY29uc3QgbTYgPSBhMDAgKiBiMDA7XG4gICAgY29uc3QgbTcgPSAoLWEwMCArIGEyMCArIGEyMSkgKiAoYjAwIC0gYjAyICsgYjEyKTtcbiAgICBjb25zdCBtOCA9ICgtYTAwICsgYTIwKSAqIChiMDIgLSBiMTIpO1xuICAgIGNvbnN0IG05ID0gKGEyMCArIGEyMSkgKiAoLWIwMCArIGIwMik7XG4gICAgY29uc3QgbTEwID0gKGEwMCArIGEwMSArIGEwMiAtIGExMSAtIGExMiAtIGEyMCAtIGEyMSkgKiBiMTI7XG4gICAgY29uc3QgbTExID0gYTIxICogKC1iMDAgKyBiMDIgKyBiMTAgLSBiMTEgLSBiMTIgLSBiMjAgKyBiMjEpO1xuICAgIGNvbnN0IG0xMiA9ICgtYTAyICsgYTIxICsgYTIyKSAqIChiMTEgKyBiMjAgLSBiMjEpO1xuICAgIGNvbnN0IG0xMyA9IChhMDIgLSBhMjIpICogKGIxMSAtIGIyMSk7XG4gICAgY29uc3QgbTE0ID0gYTAyICogYjIwO1xuICAgIGNvbnN0IG0xNSA9IChhMjEgKyBhMjIpICogKC1iMjAgKyBiMjEpO1xuICAgIGNvbnN0IG0xNiA9ICgtYTAyICsgYTExICsgYTEyKSAqIChiMTIgKyBiMjAgLSBiMjIpO1xuICAgIGNvbnN0IG0xNyA9IChhMDIgLSBhMTIpICogKGIxMiAtIGIyMik7XG4gICAgY29uc3QgbTE4ID0gKGExMSArIGExMikgKiAoLWIyMCArIGIyMik7XG4gICAgY29uc3QgbTE5ID0gYTAxICogYjEwO1xuICAgIGNvbnN0IG0yMCA9IGExMiAqIGIyMTtcbiAgICBjb25zdCBtMjEgPSBhMTAgKiBiMDI7XG4gICAgY29uc3QgbTIyID0gYTIwICogYjAxO1xuICAgIGNvbnN0IG0yMyA9IGEyMiAqIGIyMjtcblxuICAgIGNvbnN0IGMwMCA9IG02ICsgbTE0ICsgbTE5O1xuICAgIGNvbnN0IGMwMSA9IG0xICsgbTQgKyBtNSArIG02ICsgbTEyICsgbTE0ICsgbTE1O1xuICAgIGNvbnN0IGMwMiA9IG02ICsgbTcgKyBtOSArIG0xMCArIG0xNCArIG0xNiArIG0xODtcbiAgICBjb25zdCBjMTAgPSBtMiArIG0zICsgbTQgKyBtNiArIG0xNCArIG0xNiArIG0xNztcbiAgICBjb25zdCBjMTEgPSBtMiArIG00ICsgbTUgKyBtNiArIG0yMDtcbiAgICBjb25zdCBjMTIgPSBtMTQgKyBtMTYgKyBtMTcgKyBtMTggKyBtMjE7XG4gICAgY29uc3QgYzIwID0gbTYgKyBtNyArIG04ICsgbTExICsgbTEyICsgbTEzICsgbTE0O1xuICAgIGNvbnN0IGMyMSA9IG0xMiArIG0xMyArIG0xNCArIG0xNSArIG0yMjtcbiAgICBjb25zdCBjMjIgPSBtNiArIG03ICsgbTggKyBtOSArIG0yMztcblxuICAgIHJlc3VsdC5zZXQoMCwgMCwgYzAwKTtcbiAgICByZXN1bHQuc2V0KDAsIDEsIGMwMSk7XG4gICAgcmVzdWx0LnNldCgwLCAyLCBjMDIpO1xuICAgIHJlc3VsdC5zZXQoMSwgMCwgYzEwKTtcbiAgICByZXN1bHQuc2V0KDEsIDEsIGMxMSk7XG4gICAgcmVzdWx0LnNldCgxLCAyLCBjMTIpO1xuICAgIHJlc3VsdC5zZXQoMiwgMCwgYzIwKTtcbiAgICByZXN1bHQuc2V0KDIsIDEsIGMyMSk7XG4gICAgcmVzdWx0LnNldCgyLCAyLCBjMjIpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBtbXVsU3RyYXNzZW4oeSkge1xuICAgIHkgPSBNYXRyaXguY2hlY2tNYXRyaXgoeSk7XG4gICAgbGV0IHggPSB0aGlzLmNsb25lKCk7XG4gICAgbGV0IHIxID0geC5yb3dzO1xuICAgIGxldCBjMSA9IHguY29sdW1ucztcbiAgICBsZXQgcjIgPSB5LnJvd3M7XG4gICAgbGV0IGMyID0geS5jb2x1bW5zO1xuICAgIGlmIChjMSAhPT0gcjIpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGBNdWx0aXBseWluZyAke3IxfSB4ICR7YzF9IGFuZCAke3IyfSB4ICR7YzJ9IG1hdHJpeDogZGltZW5zaW9ucyBkbyBub3QgbWF0Y2guYCxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gUHV0IGEgbWF0cml4IGludG8gdGhlIHRvcCBsZWZ0IG9mIGEgbWF0cml4IG9mIHplcm9zLlxuICAgIC8vIGByb3dzYCBhbmQgYGNvbHNgIGFyZSB0aGUgZGltZW5zaW9ucyBvZiB0aGUgb3V0cHV0IG1hdHJpeC5cbiAgICBmdW5jdGlvbiBlbWJlZChtYXQsIHJvd3MsIGNvbHMpIHtcbiAgICAgIGxldCByID0gbWF0LnJvd3M7XG4gICAgICBsZXQgYyA9IG1hdC5jb2x1bW5zO1xuICAgICAgaWYgKHIgPT09IHJvd3MgJiYgYyA9PT0gY29scykge1xuICAgICAgICByZXR1cm4gbWF0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHJlc3VsdGF0ID0gQWJzdHJhY3RNYXRyaXguemVyb3Mocm93cywgY29scyk7XG4gICAgICAgIHJlc3VsdGF0ID0gcmVzdWx0YXQuc2V0U3ViTWF0cml4KG1hdCwgMCwgMCk7XG4gICAgICAgIHJldHVybiByZXN1bHRhdDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBNYWtlIHN1cmUgYm90aCBtYXRyaWNlcyBhcmUgdGhlIHNhbWUgc2l6ZS5cbiAgICAvLyBUaGlzIGlzIGV4Y2x1c2l2ZWx5IGZvciBzaW1wbGljaXR5OlxuICAgIC8vIHRoaXMgYWxnb3JpdGhtIGNhbiBiZSBpbXBsZW1lbnRlZCB3aXRoIG1hdHJpY2VzIG9mIGRpZmZlcmVudCBzaXplcy5cblxuICAgIGxldCByID0gTWF0aC5tYXgocjEsIHIyKTtcbiAgICBsZXQgYyA9IE1hdGgubWF4KGMxLCBjMik7XG4gICAgeCA9IGVtYmVkKHgsIHIsIGMpO1xuICAgIHkgPSBlbWJlZCh5LCByLCBjKTtcblxuICAgIC8vIE91ciByZWN1cnNpdmUgbXVsdGlwbGljYXRpb24gZnVuY3Rpb24uXG4gICAgZnVuY3Rpb24gYmxvY2tNdWx0KGEsIGIsIHJvd3MsIGNvbHMpIHtcbiAgICAgIC8vIEZvciBzbWFsbCBtYXRyaWNlcywgcmVzb3J0IHRvIG5haXZlIG11bHRpcGxpY2F0aW9uLlxuICAgICAgaWYgKHJvd3MgPD0gNTEyIHx8IGNvbHMgPD0gNTEyKSB7XG4gICAgICAgIHJldHVybiBhLm1tdWwoYik7IC8vIGEgaXMgZXF1aXZhbGVudCB0byB0aGlzXG4gICAgICB9XG5cbiAgICAgIC8vIEFwcGx5IGR5bmFtaWMgcGFkZGluZy5cbiAgICAgIGlmIChyb3dzICUgMiA9PT0gMSAmJiBjb2xzICUgMiA9PT0gMSkge1xuICAgICAgICBhID0gZW1iZWQoYSwgcm93cyArIDEsIGNvbHMgKyAxKTtcbiAgICAgICAgYiA9IGVtYmVkKGIsIHJvd3MgKyAxLCBjb2xzICsgMSk7XG4gICAgICB9IGVsc2UgaWYgKHJvd3MgJSAyID09PSAxKSB7XG4gICAgICAgIGEgPSBlbWJlZChhLCByb3dzICsgMSwgY29scyk7XG4gICAgICAgIGIgPSBlbWJlZChiLCByb3dzICsgMSwgY29scyk7XG4gICAgICB9IGVsc2UgaWYgKGNvbHMgJSAyID09PSAxKSB7XG4gICAgICAgIGEgPSBlbWJlZChhLCByb3dzLCBjb2xzICsgMSk7XG4gICAgICAgIGIgPSBlbWJlZChiLCByb3dzLCBjb2xzICsgMSk7XG4gICAgICB9XG5cbiAgICAgIGxldCBoYWxmUm93cyA9IHBhcnNlSW50KGEucm93cyAvIDIsIDEwKTtcbiAgICAgIGxldCBoYWxmQ29scyA9IHBhcnNlSW50KGEuY29sdW1ucyAvIDIsIDEwKTtcbiAgICAgIC8vIFN1YmRpdmlkZSBpbnB1dCBtYXRyaWNlcy5cbiAgICAgIGxldCBhMTEgPSBhLnN1Yk1hdHJpeCgwLCBoYWxmUm93cyAtIDEsIDAsIGhhbGZDb2xzIC0gMSk7XG4gICAgICBsZXQgYjExID0gYi5zdWJNYXRyaXgoMCwgaGFsZlJvd3MgLSAxLCAwLCBoYWxmQ29scyAtIDEpO1xuXG4gICAgICBsZXQgYTEyID0gYS5zdWJNYXRyaXgoMCwgaGFsZlJvd3MgLSAxLCBoYWxmQ29scywgYS5jb2x1bW5zIC0gMSk7XG4gICAgICBsZXQgYjEyID0gYi5zdWJNYXRyaXgoMCwgaGFsZlJvd3MgLSAxLCBoYWxmQ29scywgYi5jb2x1bW5zIC0gMSk7XG5cbiAgICAgIGxldCBhMjEgPSBhLnN1Yk1hdHJpeChoYWxmUm93cywgYS5yb3dzIC0gMSwgMCwgaGFsZkNvbHMgLSAxKTtcbiAgICAgIGxldCBiMjEgPSBiLnN1Yk1hdHJpeChoYWxmUm93cywgYi5yb3dzIC0gMSwgMCwgaGFsZkNvbHMgLSAxKTtcblxuICAgICAgbGV0IGEyMiA9IGEuc3ViTWF0cml4KGhhbGZSb3dzLCBhLnJvd3MgLSAxLCBoYWxmQ29scywgYS5jb2x1bW5zIC0gMSk7XG4gICAgICBsZXQgYjIyID0gYi5zdWJNYXRyaXgoaGFsZlJvd3MsIGIucm93cyAtIDEsIGhhbGZDb2xzLCBiLmNvbHVtbnMgLSAxKTtcblxuICAgICAgLy8gQ29tcHV0ZSBpbnRlcm1lZGlhdGUgdmFsdWVzLlxuICAgICAgbGV0IG0xID0gYmxvY2tNdWx0KFxuICAgICAgICBBYnN0cmFjdE1hdHJpeC5hZGQoYTExLCBhMjIpLFxuICAgICAgICBBYnN0cmFjdE1hdHJpeC5hZGQoYjExLCBiMjIpLFxuICAgICAgICBoYWxmUm93cyxcbiAgICAgICAgaGFsZkNvbHMsXG4gICAgICApO1xuICAgICAgbGV0IG0yID0gYmxvY2tNdWx0KEFic3RyYWN0TWF0cml4LmFkZChhMjEsIGEyMiksIGIxMSwgaGFsZlJvd3MsIGhhbGZDb2xzKTtcbiAgICAgIGxldCBtMyA9IGJsb2NrTXVsdChhMTEsIEFic3RyYWN0TWF0cml4LnN1YihiMTIsIGIyMiksIGhhbGZSb3dzLCBoYWxmQ29scyk7XG4gICAgICBsZXQgbTQgPSBibG9ja011bHQoYTIyLCBBYnN0cmFjdE1hdHJpeC5zdWIoYjIxLCBiMTEpLCBoYWxmUm93cywgaGFsZkNvbHMpO1xuICAgICAgbGV0IG01ID0gYmxvY2tNdWx0KEFic3RyYWN0TWF0cml4LmFkZChhMTEsIGExMiksIGIyMiwgaGFsZlJvd3MsIGhhbGZDb2xzKTtcbiAgICAgIGxldCBtNiA9IGJsb2NrTXVsdChcbiAgICAgICAgQWJzdHJhY3RNYXRyaXguc3ViKGEyMSwgYTExKSxcbiAgICAgICAgQWJzdHJhY3RNYXRyaXguYWRkKGIxMSwgYjEyKSxcbiAgICAgICAgaGFsZlJvd3MsXG4gICAgICAgIGhhbGZDb2xzLFxuICAgICAgKTtcbiAgICAgIGxldCBtNyA9IGJsb2NrTXVsdChcbiAgICAgICAgQWJzdHJhY3RNYXRyaXguc3ViKGExMiwgYTIyKSxcbiAgICAgICAgQWJzdHJhY3RNYXRyaXguYWRkKGIyMSwgYjIyKSxcbiAgICAgICAgaGFsZlJvd3MsXG4gICAgICAgIGhhbGZDb2xzLFxuICAgICAgKTtcblxuICAgICAgLy8gQ29tYmluZSBpbnRlcm1lZGlhdGUgdmFsdWVzIGludG8gdGhlIG91dHB1dC5cbiAgICAgIGxldCBjMTEgPSBBYnN0cmFjdE1hdHJpeC5hZGQobTEsIG00KTtcbiAgICAgIGMxMS5zdWIobTUpO1xuICAgICAgYzExLmFkZChtNyk7XG4gICAgICBsZXQgYzEyID0gQWJzdHJhY3RNYXRyaXguYWRkKG0zLCBtNSk7XG4gICAgICBsZXQgYzIxID0gQWJzdHJhY3RNYXRyaXguYWRkKG0yLCBtNCk7XG4gICAgICBsZXQgYzIyID0gQWJzdHJhY3RNYXRyaXguc3ViKG0xLCBtMik7XG4gICAgICBjMjIuYWRkKG0zKTtcbiAgICAgIGMyMi5hZGQobTYpO1xuXG4gICAgICAvLyBDcm9wIG91dHB1dCB0byB0aGUgZGVzaXJlZCBzaXplICh1bmRvIGR5bmFtaWMgcGFkZGluZykuXG4gICAgICBsZXQgcmVzdWx0YXQgPSBBYnN0cmFjdE1hdHJpeC56ZXJvcygyICogYzExLnJvd3MsIDIgKiBjMTEuY29sdW1ucyk7XG4gICAgICByZXN1bHRhdCA9IHJlc3VsdGF0LnNldFN1Yk1hdHJpeChjMTEsIDAsIDApO1xuICAgICAgcmVzdWx0YXQgPSByZXN1bHRhdC5zZXRTdWJNYXRyaXgoYzEyLCBjMTEucm93cywgMCk7XG4gICAgICByZXN1bHRhdCA9IHJlc3VsdGF0LnNldFN1Yk1hdHJpeChjMjEsIDAsIGMxMS5jb2x1bW5zKTtcbiAgICAgIHJlc3VsdGF0ID0gcmVzdWx0YXQuc2V0U3ViTWF0cml4KGMyMiwgYzExLnJvd3MsIGMxMS5jb2x1bW5zKTtcbiAgICAgIHJldHVybiByZXN1bHRhdC5zdWJNYXRyaXgoMCwgcm93cyAtIDEsIDAsIGNvbHMgLSAxKTtcbiAgICB9XG4gICAgcmV0dXJuIGJsb2NrTXVsdCh4LCB5LCByLCBjKTtcbiAgfVxuXG4gIHNjYWxlUm93cyhvcHRpb25zID0ge30pIHtcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdvcHRpb25zIG11c3QgYmUgYW4gb2JqZWN0Jyk7XG4gICAgfVxuICAgIGNvbnN0IHsgbWluID0gMCwgbWF4ID0gMSB9ID0gb3B0aW9ucztcbiAgICBpZiAoIU51bWJlci5pc0Zpbml0ZShtaW4pKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdtaW4gbXVzdCBiZSBhIG51bWJlcicpO1xuICAgIGlmICghTnVtYmVyLmlzRmluaXRlKG1heCkpIHRocm93IG5ldyBUeXBlRXJyb3IoJ21heCBtdXN0IGJlIGEgbnVtYmVyJyk7XG4gICAgaWYgKG1pbiA+PSBtYXgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdtaW4gbXVzdCBiZSBzbWFsbGVyIHRoYW4gbWF4Jyk7XG4gICAgbGV0IG5ld01hdHJpeCA9IG5ldyBNYXRyaXgodGhpcy5yb3dzLCB0aGlzLmNvbHVtbnMpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGNvbnN0IHJvdyA9IHRoaXMuZ2V0Um93KGkpO1xuICAgICAgcmVzY2FsZShyb3csIHsgbWluLCBtYXgsIG91dHB1dDogcm93IH0pO1xuICAgICAgbmV3TWF0cml4LnNldFJvdyhpLCByb3cpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3TWF0cml4O1xuICB9XG5cbiAgc2NhbGVDb2x1bW5zKG9wdGlvbnMgPSB7fSkge1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ29wdGlvbnMgbXVzdCBiZSBhbiBvYmplY3QnKTtcbiAgICB9XG4gICAgY29uc3QgeyBtaW4gPSAwLCBtYXggPSAxIH0gPSBvcHRpb25zO1xuICAgIGlmICghTnVtYmVyLmlzRmluaXRlKG1pbikpIHRocm93IG5ldyBUeXBlRXJyb3IoJ21pbiBtdXN0IGJlIGEgbnVtYmVyJyk7XG4gICAgaWYgKCFOdW1iZXIuaXNGaW5pdGUobWF4KSkgdGhyb3cgbmV3IFR5cGVFcnJvcignbWF4IG11c3QgYmUgYSBudW1iZXInKTtcbiAgICBpZiAobWluID49IG1heCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ21pbiBtdXN0IGJlIHNtYWxsZXIgdGhhbiBtYXgnKTtcbiAgICBsZXQgbmV3TWF0cml4ID0gbmV3IE1hdHJpeCh0aGlzLnJvd3MsIHRoaXMuY29sdW1ucyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbHVtbnM7IGkrKykge1xuICAgICAgY29uc3QgY29sdW1uID0gdGhpcy5nZXRDb2x1bW4oaSk7XG4gICAgICByZXNjYWxlKGNvbHVtbiwge1xuICAgICAgICBtaW46IG1pbixcbiAgICAgICAgbWF4OiBtYXgsXG4gICAgICAgIG91dHB1dDogY29sdW1uLFxuICAgICAgfSk7XG4gICAgICBuZXdNYXRyaXguc2V0Q29sdW1uKGksIGNvbHVtbik7XG4gICAgfVxuICAgIHJldHVybiBuZXdNYXRyaXg7XG4gIH1cblxuICBmbGlwUm93cygpIHtcbiAgICBjb25zdCBtaWRkbGUgPSBNYXRoLmNlaWwodGhpcy5jb2x1bW5zIC8gMik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBtaWRkbGU7IGorKykge1xuICAgICAgICBsZXQgZmlyc3QgPSB0aGlzLmdldChpLCBqKTtcbiAgICAgICAgbGV0IGxhc3QgPSB0aGlzLmdldChpLCB0aGlzLmNvbHVtbnMgLSAxIC0gaik7XG4gICAgICAgIHRoaXMuc2V0KGksIGosIGxhc3QpO1xuICAgICAgICB0aGlzLnNldChpLCB0aGlzLmNvbHVtbnMgLSAxIC0gaiwgZmlyc3QpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGZsaXBDb2x1bW5zKCkge1xuICAgIGNvbnN0IG1pZGRsZSA9IE1hdGguY2VpbCh0aGlzLnJvd3MgLyAyKTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sdW1uczsgaisrKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1pZGRsZTsgaSsrKSB7XG4gICAgICAgIGxldCBmaXJzdCA9IHRoaXMuZ2V0KGksIGopO1xuICAgICAgICBsZXQgbGFzdCA9IHRoaXMuZ2V0KHRoaXMucm93cyAtIDEgLSBpLCBqKTtcbiAgICAgICAgdGhpcy5zZXQoaSwgaiwgbGFzdCk7XG4gICAgICAgIHRoaXMuc2V0KHRoaXMucm93cyAtIDEgLSBpLCBqLCBmaXJzdCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAga3JvbmVja2VyUHJvZHVjdChvdGhlcikge1xuICAgIG90aGVyID0gTWF0cml4LmNoZWNrTWF0cml4KG90aGVyKTtcblxuICAgIGxldCBtID0gdGhpcy5yb3dzO1xuICAgIGxldCBuID0gdGhpcy5jb2x1bW5zO1xuICAgIGxldCBwID0gb3RoZXIucm93cztcbiAgICBsZXQgcSA9IG90aGVyLmNvbHVtbnM7XG5cbiAgICBsZXQgcmVzdWx0ID0gbmV3IE1hdHJpeChtICogcCwgbiAqIHEpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbTsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG47IGorKykge1xuICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHA7IGsrKykge1xuICAgICAgICAgIGZvciAobGV0IGwgPSAwOyBsIDwgcTsgbCsrKSB7XG4gICAgICAgICAgICByZXN1bHQuc2V0KHAgKiBpICsgaywgcSAqIGogKyBsLCB0aGlzLmdldChpLCBqKSAqIG90aGVyLmdldChrLCBsKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICB0cmFuc3Bvc2UoKSB7XG4gICAgbGV0IHJlc3VsdCA9IG5ldyBNYXRyaXgodGhpcy5jb2x1bW5zLCB0aGlzLnJvd3MpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgcmVzdWx0LnNldChqLCBpLCB0aGlzLmdldChpLCBqKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBzb3J0Um93cyhjb21wYXJlRnVuY3Rpb24gPSBjb21wYXJlTnVtYmVycykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIHRoaXMuc2V0Um93KGksIHRoaXMuZ2V0Um93KGkpLnNvcnQoY29tcGFyZUZ1bmN0aW9uKSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc29ydENvbHVtbnMoY29tcGFyZUZ1bmN0aW9uID0gY29tcGFyZU51bWJlcnMpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29sdW1uczsgaSsrKSB7XG4gICAgICB0aGlzLnNldENvbHVtbihpLCB0aGlzLmdldENvbHVtbihpKS5zb3J0KGNvbXBhcmVGdW5jdGlvbikpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHN1Yk1hdHJpeChzdGFydFJvdywgZW5kUm93LCBzdGFydENvbHVtbiwgZW5kQ29sdW1uKSB7XG4gICAgY2hlY2tSYW5nZSh0aGlzLCBzdGFydFJvdywgZW5kUm93LCBzdGFydENvbHVtbiwgZW5kQ29sdW1uKTtcbiAgICBsZXQgbmV3TWF0cml4ID0gbmV3IE1hdHJpeChcbiAgICAgIGVuZFJvdyAtIHN0YXJ0Um93ICsgMSxcbiAgICAgIGVuZENvbHVtbiAtIHN0YXJ0Q29sdW1uICsgMSxcbiAgICApO1xuICAgIGZvciAobGV0IGkgPSBzdGFydFJvdzsgaSA8PSBlbmRSb3c7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IHN0YXJ0Q29sdW1uOyBqIDw9IGVuZENvbHVtbjsgaisrKSB7XG4gICAgICAgIG5ld01hdHJpeC5zZXQoaSAtIHN0YXJ0Um93LCBqIC0gc3RhcnRDb2x1bW4sIHRoaXMuZ2V0KGksIGopKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5ld01hdHJpeDtcbiAgfVxuXG4gIHN1Yk1hdHJpeFJvdyhpbmRpY2VzLCBzdGFydENvbHVtbiwgZW5kQ29sdW1uKSB7XG4gICAgaWYgKHN0YXJ0Q29sdW1uID09PSB1bmRlZmluZWQpIHN0YXJ0Q29sdW1uID0gMDtcbiAgICBpZiAoZW5kQ29sdW1uID09PSB1bmRlZmluZWQpIGVuZENvbHVtbiA9IHRoaXMuY29sdW1ucyAtIDE7XG4gICAgaWYgKFxuICAgICAgc3RhcnRDb2x1bW4gPiBlbmRDb2x1bW4gfHxcbiAgICAgIHN0YXJ0Q29sdW1uIDwgMCB8fFxuICAgICAgc3RhcnRDb2x1bW4gPj0gdGhpcy5jb2x1bW5zIHx8XG4gICAgICBlbmRDb2x1bW4gPCAwIHx8XG4gICAgICBlbmRDb2x1bW4gPj0gdGhpcy5jb2x1bW5zXG4gICAgKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQXJndW1lbnQgb3V0IG9mIHJhbmdlJyk7XG4gICAgfVxuXG4gICAgbGV0IG5ld01hdHJpeCA9IG5ldyBNYXRyaXgoaW5kaWNlcy5sZW5ndGgsIGVuZENvbHVtbiAtIHN0YXJ0Q29sdW1uICsgMSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmRpY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gc3RhcnRDb2x1bW47IGogPD0gZW5kQ29sdW1uOyBqKyspIHtcbiAgICAgICAgaWYgKGluZGljZXNbaV0gPCAwIHx8IGluZGljZXNbaV0gPj0gdGhpcy5yb3dzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoYFJvdyBpbmRleCBvdXQgb2YgcmFuZ2U6ICR7aW5kaWNlc1tpXX1gKTtcbiAgICAgICAgfVxuICAgICAgICBuZXdNYXRyaXguc2V0KGksIGogLSBzdGFydENvbHVtbiwgdGhpcy5nZXQoaW5kaWNlc1tpXSwgaikpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV3TWF0cml4O1xuICB9XG5cbiAgc3ViTWF0cml4Q29sdW1uKGluZGljZXMsIHN0YXJ0Um93LCBlbmRSb3cpIHtcbiAgICBpZiAoc3RhcnRSb3cgPT09IHVuZGVmaW5lZCkgc3RhcnRSb3cgPSAwO1xuICAgIGlmIChlbmRSb3cgPT09IHVuZGVmaW5lZCkgZW5kUm93ID0gdGhpcy5yb3dzIC0gMTtcbiAgICBpZiAoXG4gICAgICBzdGFydFJvdyA+IGVuZFJvdyB8fFxuICAgICAgc3RhcnRSb3cgPCAwIHx8XG4gICAgICBzdGFydFJvdyA+PSB0aGlzLnJvd3MgfHxcbiAgICAgIGVuZFJvdyA8IDAgfHxcbiAgICAgIGVuZFJvdyA+PSB0aGlzLnJvd3NcbiAgICApIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdBcmd1bWVudCBvdXQgb2YgcmFuZ2UnKTtcbiAgICB9XG5cbiAgICBsZXQgbmV3TWF0cml4ID0gbmV3IE1hdHJpeChlbmRSb3cgLSBzdGFydFJvdyArIDEsIGluZGljZXMubGVuZ3RoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluZGljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSBzdGFydFJvdzsgaiA8PSBlbmRSb3c7IGorKykge1xuICAgICAgICBpZiAoaW5kaWNlc1tpXSA8IDAgfHwgaW5kaWNlc1tpXSA+PSB0aGlzLmNvbHVtbnMpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihgQ29sdW1uIGluZGV4IG91dCBvZiByYW5nZTogJHtpbmRpY2VzW2ldfWApO1xuICAgICAgICB9XG4gICAgICAgIG5ld01hdHJpeC5zZXQoaiAtIHN0YXJ0Um93LCBpLCB0aGlzLmdldChqLCBpbmRpY2VzW2ldKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXdNYXRyaXg7XG4gIH1cblxuICBzZXRTdWJNYXRyaXgobWF0cml4LCBzdGFydFJvdywgc3RhcnRDb2x1bW4pIHtcbiAgICBtYXRyaXggPSBNYXRyaXguY2hlY2tNYXRyaXgobWF0cml4KTtcbiAgICBsZXQgZW5kUm93ID0gc3RhcnRSb3cgKyBtYXRyaXgucm93cyAtIDE7XG4gICAgbGV0IGVuZENvbHVtbiA9IHN0YXJ0Q29sdW1uICsgbWF0cml4LmNvbHVtbnMgLSAxO1xuICAgIGNoZWNrUmFuZ2UodGhpcywgc3RhcnRSb3csIGVuZFJvdywgc3RhcnRDb2x1bW4sIGVuZENvbHVtbik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXRyaXgucm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG1hdHJpeC5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgdGhpcy5zZXQoc3RhcnRSb3cgKyBpLCBzdGFydENvbHVtbiArIGosIG1hdHJpeC5nZXQoaSwgaikpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNlbGVjdGlvbihyb3dJbmRpY2VzLCBjb2x1bW5JbmRpY2VzKSB7XG4gICAgbGV0IGluZGljZXMgPSBjaGVja0luZGljZXModGhpcywgcm93SW5kaWNlcywgY29sdW1uSW5kaWNlcyk7XG4gICAgbGV0IG5ld01hdHJpeCA9IG5ldyBNYXRyaXgocm93SW5kaWNlcy5sZW5ndGgsIGNvbHVtbkluZGljZXMubGVuZ3RoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluZGljZXMucm93Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgcm93SW5kZXggPSBpbmRpY2VzLnJvd1tpXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgaW5kaWNlcy5jb2x1bW4ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgbGV0IGNvbHVtbkluZGV4ID0gaW5kaWNlcy5jb2x1bW5bal07XG4gICAgICAgIG5ld01hdHJpeC5zZXQoaSwgaiwgdGhpcy5nZXQocm93SW5kZXgsIGNvbHVtbkluZGV4KSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXdNYXRyaXg7XG4gIH1cblxuICB0cmFjZSgpIHtcbiAgICBsZXQgbWluID0gTWF0aC5taW4odGhpcy5yb3dzLCB0aGlzLmNvbHVtbnMpO1xuICAgIGxldCB0cmFjZSA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtaW47IGkrKykge1xuICAgICAgdHJhY2UgKz0gdGhpcy5nZXQoaSwgaSk7XG4gICAgfVxuICAgIHJldHVybiB0cmFjZTtcbiAgfVxuXG4gIGNsb25lKCkge1xuICAgIGxldCBuZXdNYXRyaXggPSBuZXcgTWF0cml4KHRoaXMucm93cywgdGhpcy5jb2x1bW5zKTtcbiAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCB0aGlzLnJvd3M7IHJvdysrKSB7XG4gICAgICBmb3IgKGxldCBjb2x1bW4gPSAwOyBjb2x1bW4gPCB0aGlzLmNvbHVtbnM7IGNvbHVtbisrKSB7XG4gICAgICAgIG5ld01hdHJpeC5zZXQocm93LCBjb2x1bW4sIHRoaXMuZ2V0KHJvdywgY29sdW1uKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXdNYXRyaXg7XG4gIH1cblxuICBzdW0oYnkpIHtcbiAgICBzd2l0Y2ggKGJ5KSB7XG4gICAgICBjYXNlICdyb3cnOlxuICAgICAgICByZXR1cm4gc3VtQnlSb3codGhpcyk7XG4gICAgICBjYXNlICdjb2x1bW4nOlxuICAgICAgICByZXR1cm4gc3VtQnlDb2x1bW4odGhpcyk7XG4gICAgICBjYXNlIHVuZGVmaW5lZDpcbiAgICAgICAgcmV0dXJuIHN1bUFsbCh0aGlzKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCBvcHRpb246ICR7Ynl9YCk7XG4gICAgfVxuICB9XG5cbiAgcHJvZHVjdChieSkge1xuICAgIHN3aXRjaCAoYnkpIHtcbiAgICAgIGNhc2UgJ3Jvdyc6XG4gICAgICAgIHJldHVybiBwcm9kdWN0QnlSb3codGhpcyk7XG4gICAgICBjYXNlICdjb2x1bW4nOlxuICAgICAgICByZXR1cm4gcHJvZHVjdEJ5Q29sdW1uKHRoaXMpO1xuICAgICAgY2FzZSB1bmRlZmluZWQ6XG4gICAgICAgIHJldHVybiBwcm9kdWN0QWxsKHRoaXMpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIG9wdGlvbjogJHtieX1gKTtcbiAgICB9XG4gIH1cblxuICBtZWFuKGJ5KSB7XG4gICAgY29uc3Qgc3VtID0gdGhpcy5zdW0oYnkpO1xuICAgIHN3aXRjaCAoYnkpIHtcbiAgICAgIGNhc2UgJ3Jvdyc6IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgICAgIHN1bVtpXSAvPSB0aGlzLmNvbHVtbnM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1bTtcbiAgICAgIH1cbiAgICAgIGNhc2UgJ2NvbHVtbic6IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbHVtbnM7IGkrKykge1xuICAgICAgICAgIHN1bVtpXSAvPSB0aGlzLnJvd3M7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1bTtcbiAgICAgIH1cbiAgICAgIGNhc2UgdW5kZWZpbmVkOlxuICAgICAgICByZXR1cm4gc3VtIC8gdGhpcy5zaXplO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIG9wdGlvbjogJHtieX1gKTtcbiAgICB9XG4gIH1cblxuICB2YXJpYW5jZShieSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgaWYgKHR5cGVvZiBieSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIG9wdGlvbnMgPSBieTtcbiAgICAgIGJ5ID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdvcHRpb25zIG11c3QgYmUgYW4gb2JqZWN0Jyk7XG4gICAgfVxuICAgIGNvbnN0IHsgdW5iaWFzZWQgPSB0cnVlLCBtZWFuID0gdGhpcy5tZWFuKGJ5KSB9ID0gb3B0aW9ucztcbiAgICBpZiAodHlwZW9mIHVuYmlhc2VkICE9PSAnYm9vbGVhbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3VuYmlhc2VkIG11c3QgYmUgYSBib29sZWFuJyk7XG4gICAgfVxuICAgIHN3aXRjaCAoYnkpIHtcbiAgICAgIGNhc2UgJ3Jvdyc6IHtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KG1lYW4pKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignbWVhbiBtdXN0IGJlIGFuIGFycmF5Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhcmlhbmNlQnlSb3codGhpcywgdW5iaWFzZWQsIG1lYW4pO1xuICAgICAgfVxuICAgICAgY2FzZSAnY29sdW1uJzoge1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkobWVhbikpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdtZWFuIG11c3QgYmUgYW4gYXJyYXknKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFyaWFuY2VCeUNvbHVtbih0aGlzLCB1bmJpYXNlZCwgbWVhbik7XG4gICAgICB9XG4gICAgICBjYXNlIHVuZGVmaW5lZDoge1xuICAgICAgICBpZiAodHlwZW9mIG1lYW4gIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignbWVhbiBtdXN0IGJlIGEgbnVtYmVyJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhcmlhbmNlQWxsKHRoaXMsIHVuYmlhc2VkLCBtZWFuKTtcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCBvcHRpb246ICR7Ynl9YCk7XG4gICAgfVxuICB9XG5cbiAgc3RhbmRhcmREZXZpYXRpb24oYnksIG9wdGlvbnMpIHtcbiAgICBpZiAodHlwZW9mIGJ5ID09PSAnb2JqZWN0Jykge1xuICAgICAgb3B0aW9ucyA9IGJ5O1xuICAgICAgYnkgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGNvbnN0IHZhcmlhbmNlID0gdGhpcy52YXJpYW5jZShieSwgb3B0aW9ucyk7XG4gICAgaWYgKGJ5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBNYXRoLnNxcnQodmFyaWFuY2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhcmlhbmNlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhcmlhbmNlW2ldID0gTWF0aC5zcXJ0KHZhcmlhbmNlW2ldKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YXJpYW5jZTtcbiAgICB9XG4gIH1cblxuICBjZW50ZXIoYnksIG9wdGlvbnMgPSB7fSkge1xuICAgIGlmICh0eXBlb2YgYnkgPT09ICdvYmplY3QnKSB7XG4gICAgICBvcHRpb25zID0gYnk7XG4gICAgICBieSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignb3B0aW9ucyBtdXN0IGJlIGFuIG9iamVjdCcpO1xuICAgIH1cbiAgICBjb25zdCB7IGNlbnRlciA9IHRoaXMubWVhbihieSkgfSA9IG9wdGlvbnM7XG4gICAgc3dpdGNoIChieSkge1xuICAgICAgY2FzZSAncm93Jzoge1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoY2VudGVyKSkge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2NlbnRlciBtdXN0IGJlIGFuIGFycmF5Jyk7XG4gICAgICAgIH1cbiAgICAgICAgY2VudGVyQnlSb3codGhpcywgY2VudGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgICBjYXNlICdjb2x1bW4nOiB7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShjZW50ZXIpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignY2VudGVyIG11c3QgYmUgYW4gYXJyYXknKTtcbiAgICAgICAgfVxuICAgICAgICBjZW50ZXJCeUNvbHVtbih0aGlzLCBjZW50ZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICAgIGNhc2UgdW5kZWZpbmVkOiB7XG4gICAgICAgIGlmICh0eXBlb2YgY2VudGVyICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2NlbnRlciBtdXN0IGJlIGEgbnVtYmVyJyk7XG4gICAgICAgIH1cbiAgICAgICAgY2VudGVyQWxsKHRoaXMsIGNlbnRlcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIG9wdGlvbjogJHtieX1gKTtcbiAgICB9XG4gIH1cblxuICBzY2FsZShieSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgaWYgKHR5cGVvZiBieSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIG9wdGlvbnMgPSBieTtcbiAgICAgIGJ5ID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdvcHRpb25zIG11c3QgYmUgYW4gb2JqZWN0Jyk7XG4gICAgfVxuICAgIGxldCBzY2FsZSA9IG9wdGlvbnMuc2NhbGU7XG4gICAgc3dpdGNoIChieSkge1xuICAgICAgY2FzZSAncm93Jzoge1xuICAgICAgICBpZiAoc2NhbGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHNjYWxlID0gZ2V0U2NhbGVCeVJvdyh0aGlzKTtcbiAgICAgICAgfSBlbHNlIGlmICghQXJyYXkuaXNBcnJheShzY2FsZSkpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdzY2FsZSBtdXN0IGJlIGFuIGFycmF5Jyk7XG4gICAgICAgIH1cbiAgICAgICAgc2NhbGVCeVJvdyh0aGlzLCBzY2FsZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgICAgY2FzZSAnY29sdW1uJzoge1xuICAgICAgICBpZiAoc2NhbGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHNjYWxlID0gZ2V0U2NhbGVCeUNvbHVtbih0aGlzKTtcbiAgICAgICAgfSBlbHNlIGlmICghQXJyYXkuaXNBcnJheShzY2FsZSkpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdzY2FsZSBtdXN0IGJlIGFuIGFycmF5Jyk7XG4gICAgICAgIH1cbiAgICAgICAgc2NhbGVCeUNvbHVtbih0aGlzLCBzY2FsZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgICAgY2FzZSB1bmRlZmluZWQ6IHtcbiAgICAgICAgaWYgKHNjYWxlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBzY2FsZSA9IGdldFNjYWxlQWxsKHRoaXMpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBzY2FsZSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdzY2FsZSBtdXN0IGJlIGEgbnVtYmVyJyk7XG4gICAgICAgIH1cbiAgICAgICAgc2NhbGVBbGwodGhpcywgc2NhbGUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCBvcHRpb246ICR7Ynl9YCk7XG4gICAgfVxuICB9XG5cbiAgdG9TdHJpbmcob3B0aW9ucykge1xuICAgIHJldHVybiBpbnNwZWN0TWF0cml4V2l0aE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG4gIH1cbn1cblxuQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLmtsYXNzID0gJ01hdHJpeCc7XG5pZiAodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlW1xuICAgIFN5bWJvbC5mb3IoJ25vZGVqcy51dGlsLmluc3BlY3QuY3VzdG9tJylcbiAgXSA9IGluc3BlY3RNYXRyaXg7XG59XG5cbmZ1bmN0aW9uIGNvbXBhcmVOdW1iZXJzKGEsIGIpIHtcbiAgcmV0dXJuIGEgLSBiO1xufVxuXG4vLyBTeW5vbnltc1xuQWJzdHJhY3RNYXRyaXgucmFuZG9tID0gQWJzdHJhY3RNYXRyaXgucmFuZDtcbkFic3RyYWN0TWF0cml4LnJhbmRvbUludCA9IEFic3RyYWN0TWF0cml4LnJhbmRJbnQ7XG5BYnN0cmFjdE1hdHJpeC5kaWFnb25hbCA9IEFic3RyYWN0TWF0cml4LmRpYWc7XG5BYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUuZGlhZ29uYWwgPSBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUuZGlhZztcbkFic3RyYWN0TWF0cml4LmlkZW50aXR5ID0gQWJzdHJhY3RNYXRyaXguZXllO1xuQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLm5lZ2F0ZSA9IEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5uZWc7XG5BYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUudGVuc29yUHJvZHVjdCA9XG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5rcm9uZWNrZXJQcm9kdWN0O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXRyaXggZXh0ZW5kcyBBYnN0cmFjdE1hdHJpeCB7XG4gIGNvbnN0cnVjdG9yKG5Sb3dzLCBuQ29sdW1ucykge1xuICAgIHN1cGVyKCk7XG4gICAgaWYgKE1hdHJpeC5pc01hdHJpeChuUm93cykpIHtcbiAgICAgIHJldHVybiBuUm93cy5jbG9uZSgpO1xuICAgIH0gZWxzZSBpZiAoTnVtYmVyLmlzSW50ZWdlcihuUm93cykgJiYgblJvd3MgPiAwKSB7XG4gICAgICAvLyBDcmVhdGUgYW4gZW1wdHkgbWF0cml4XG4gICAgICB0aGlzLmRhdGEgPSBbXTtcbiAgICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKG5Db2x1bW5zKSAmJiBuQ29sdW1ucyA+IDApIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuUm93czsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5kYXRhLnB1c2gobmV3IEZsb2F0NjRBcnJheShuQ29sdW1ucykpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCduQ29sdW1ucyBtdXN0IGJlIGEgcG9zaXRpdmUgaW50ZWdlcicpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShuUm93cykpIHtcbiAgICAgIC8vIENvcHkgdGhlIHZhbHVlcyBmcm9tIHRoZSAyRCBhcnJheVxuICAgICAgY29uc3QgYXJyYXlEYXRhID0gblJvd3M7XG4gICAgICBuUm93cyA9IGFycmF5RGF0YS5sZW5ndGg7XG4gICAgICBuQ29sdW1ucyA9IGFycmF5RGF0YVswXS5sZW5ndGg7XG4gICAgICBpZiAodHlwZW9mIG5Db2x1bW5zICE9PSAnbnVtYmVyJyB8fCBuQ29sdW1ucyA9PT0gMCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgICdEYXRhIG11c3QgYmUgYSAyRCBhcnJheSB3aXRoIGF0IGxlYXN0IG9uZSBlbGVtZW50JyxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZGF0YSA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuUm93czsgaSsrKSB7XG4gICAgICAgIGlmIChhcnJheURhdGFbaV0ubGVuZ3RoICE9PSBuQ29sdW1ucykge1xuICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmNvbnNpc3RlbnQgYXJyYXkgZGltZW5zaW9ucycpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGF0YS5wdXNoKEZsb2F0NjRBcnJheS5mcm9tKGFycmF5RGF0YVtpXSkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAnRmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlciBvciBhbiBhcnJheScsXG4gICAgICApO1xuICAgIH1cbiAgICB0aGlzLnJvd3MgPSBuUm93cztcbiAgICB0aGlzLmNvbHVtbnMgPSBuQ29sdW1ucztcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNldChyb3dJbmRleCwgY29sdW1uSW5kZXgsIHZhbHVlKSB7XG4gICAgdGhpcy5kYXRhW3Jvd0luZGV4XVtjb2x1bW5JbmRleF0gPSB2YWx1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldChyb3dJbmRleCwgY29sdW1uSW5kZXgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhW3Jvd0luZGV4XVtjb2x1bW5JbmRleF07XG4gIH1cblxuICByZW1vdmVSb3coaW5kZXgpIHtcbiAgICBjaGVja1Jvd0luZGV4KHRoaXMsIGluZGV4KTtcbiAgICBpZiAodGhpcy5yb3dzID09PSAxKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQSBtYXRyaXggY2Fubm90IGhhdmUgbGVzcyB0aGFuIG9uZSByb3cnKTtcbiAgICB9XG4gICAgdGhpcy5kYXRhLnNwbGljZShpbmRleCwgMSk7XG4gICAgdGhpcy5yb3dzIC09IDE7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBhZGRSb3coaW5kZXgsIGFycmF5KSB7XG4gICAgaWYgKGFycmF5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGFycmF5ID0gaW5kZXg7XG4gICAgICBpbmRleCA9IHRoaXMucm93cztcbiAgICB9XG4gICAgY2hlY2tSb3dJbmRleCh0aGlzLCBpbmRleCwgdHJ1ZSk7XG4gICAgYXJyYXkgPSBGbG9hdDY0QXJyYXkuZnJvbShjaGVja1Jvd1ZlY3Rvcih0aGlzLCBhcnJheSwgdHJ1ZSkpO1xuICAgIHRoaXMuZGF0YS5zcGxpY2UoaW5kZXgsIDAsIGFycmF5KTtcbiAgICB0aGlzLnJvd3MgKz0gMTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHJlbW92ZUNvbHVtbihpbmRleCkge1xuICAgIGNoZWNrQ29sdW1uSW5kZXgodGhpcywgaW5kZXgpO1xuICAgIGlmICh0aGlzLmNvbHVtbnMgPT09IDEpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdBIG1hdHJpeCBjYW5ub3QgaGF2ZSBsZXNzIHRoYW4gb25lIGNvbHVtbicpO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBjb25zdCBuZXdSb3cgPSBuZXcgRmxvYXQ2NEFycmF5KHRoaXMuY29sdW1ucyAtIDEpO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBpbmRleDsgaisrKSB7XG4gICAgICAgIG5ld1Jvd1tqXSA9IHRoaXMuZGF0YVtpXVtqXTtcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGogPSBpbmRleCArIDE7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICBuZXdSb3dbaiAtIDFdID0gdGhpcy5kYXRhW2ldW2pdO1xuICAgICAgfVxuICAgICAgdGhpcy5kYXRhW2ldID0gbmV3Um93O1xuICAgIH1cbiAgICB0aGlzLmNvbHVtbnMgLT0gMTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGFkZENvbHVtbihpbmRleCwgYXJyYXkpIHtcbiAgICBpZiAodHlwZW9mIGFycmF5ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgYXJyYXkgPSBpbmRleDtcbiAgICAgIGluZGV4ID0gdGhpcy5jb2x1bW5zO1xuICAgIH1cbiAgICBjaGVja0NvbHVtbkluZGV4KHRoaXMsIGluZGV4LCB0cnVlKTtcbiAgICBhcnJheSA9IGNoZWNrQ29sdW1uVmVjdG9yKHRoaXMsIGFycmF5KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBjb25zdCBuZXdSb3cgPSBuZXcgRmxvYXQ2NEFycmF5KHRoaXMuY29sdW1ucyArIDEpO1xuICAgICAgbGV0IGogPSAwO1xuICAgICAgZm9yICg7IGogPCBpbmRleDsgaisrKSB7XG4gICAgICAgIG5ld1Jvd1tqXSA9IHRoaXMuZGF0YVtpXVtqXTtcbiAgICAgIH1cbiAgICAgIG5ld1Jvd1tqKytdID0gYXJyYXlbaV07XG4gICAgICBmb3IgKDsgaiA8IHRoaXMuY29sdW1ucyArIDE7IGorKykge1xuICAgICAgICBuZXdSb3dbal0gPSB0aGlzLmRhdGFbaV1baiAtIDFdO1xuICAgICAgfVxuICAgICAgdGhpcy5kYXRhW2ldID0gbmV3Um93O1xuICAgIH1cbiAgICB0aGlzLmNvbHVtbnMgKz0gMTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5pbnN0YWxsTWF0aE9wZXJhdGlvbnMoQWJzdHJhY3RNYXRyaXgsIE1hdHJpeCk7XG4iLCJpbXBvcnQgU1ZEIGZyb20gJy4vZGMvc3ZkJztcbmltcG9ydCBNYXRyaXggZnJvbSAnLi9tYXRyaXgnO1xuXG5leHBvcnQgZnVuY3Rpb24gcHNldWRvSW52ZXJzZShtYXRyaXgsIHRocmVzaG9sZCA9IE51bWJlci5FUFNJTE9OKSB7XG4gIG1hdHJpeCA9IE1hdHJpeC5jaGVja01hdHJpeChtYXRyaXgpO1xuICBsZXQgc3ZkU29sdXRpb24gPSBuZXcgU1ZEKG1hdHJpeCwgeyBhdXRvVHJhbnNwb3NlOiB0cnVlIH0pO1xuXG4gIGxldCBVID0gc3ZkU29sdXRpb24ubGVmdFNpbmd1bGFyVmVjdG9ycztcbiAgbGV0IFYgPSBzdmRTb2x1dGlvbi5yaWdodFNpbmd1bGFyVmVjdG9ycztcbiAgbGV0IHMgPSBzdmRTb2x1dGlvbi5kaWFnb25hbDtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoTWF0aC5hYnMoc1tpXSkgPiB0aHJlc2hvbGQpIHtcbiAgICAgIHNbaV0gPSAxLjAgLyBzW2ldO1xuICAgIH0gZWxzZSB7XG4gICAgICBzW2ldID0gMC4wO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBWLm1tdWwoTWF0cml4LmRpYWcocykubW11bChVLnRyYW5zcG9zZSgpKSk7XG59XG4iLCJpbXBvcnQgeyBuZXdBcnJheSB9IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzdW1CeVJvdyhtYXRyaXgpIHtcbiAgbGV0IHN1bSA9IG5ld0FycmF5KG1hdHJpeC5yb3dzKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXRyaXgucm93czsgKytpKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBtYXRyaXguY29sdW1uczsgKytqKSB7XG4gICAgICBzdW1baV0gKz0gbWF0cml4LmdldChpLCBqKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN1bTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN1bUJ5Q29sdW1uKG1hdHJpeCkge1xuICBsZXQgc3VtID0gbmV3QXJyYXkobWF0cml4LmNvbHVtbnMpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG1hdHJpeC5yb3dzOyArK2kpIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IG1hdHJpeC5jb2x1bW5zOyArK2opIHtcbiAgICAgIHN1bVtqXSArPSBtYXRyaXguZ2V0KGksIGopO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc3VtO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3VtQWxsKG1hdHJpeCkge1xuICBsZXQgdiA9IDA7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbWF0cml4LnJvd3M7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgbWF0cml4LmNvbHVtbnM7IGorKykge1xuICAgICAgdiArPSBtYXRyaXguZ2V0KGksIGopO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb2R1Y3RCeVJvdyhtYXRyaXgpIHtcbiAgbGV0IHN1bSA9IG5ld0FycmF5KG1hdHJpeC5yb3dzLCAxKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXRyaXgucm93czsgKytpKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBtYXRyaXguY29sdW1uczsgKytqKSB7XG4gICAgICBzdW1baV0gKj0gbWF0cml4LmdldChpLCBqKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN1bTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb2R1Y3RCeUNvbHVtbihtYXRyaXgpIHtcbiAgbGV0IHN1bSA9IG5ld0FycmF5KG1hdHJpeC5jb2x1bW5zLCAxKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXRyaXgucm93czsgKytpKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBtYXRyaXguY29sdW1uczsgKytqKSB7XG4gICAgICBzdW1bal0gKj0gbWF0cml4LmdldChpLCBqKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN1bTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb2R1Y3RBbGwobWF0cml4KSB7XG4gIGxldCB2ID0gMTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXRyaXgucm93czsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBtYXRyaXguY29sdW1uczsgaisrKSB7XG4gICAgICB2ICo9IG1hdHJpeC5nZXQoaSwgaik7XG4gICAgfVxuICB9XG4gIHJldHVybiB2O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdmFyaWFuY2VCeVJvdyhtYXRyaXgsIHVuYmlhc2VkLCBtZWFuKSB7XG4gIGNvbnN0IHJvd3MgPSBtYXRyaXgucm93cztcbiAgY29uc3QgY29scyA9IG1hdHJpeC5jb2x1bW5zO1xuICBjb25zdCB2YXJpYW5jZSA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcm93czsgaSsrKSB7XG4gICAgbGV0IHN1bTEgPSAwO1xuICAgIGxldCBzdW0yID0gMDtcbiAgICBsZXQgeCA9IDA7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBjb2xzOyBqKyspIHtcbiAgICAgIHggPSBtYXRyaXguZ2V0KGksIGopIC0gbWVhbltpXTtcbiAgICAgIHN1bTEgKz0geDtcbiAgICAgIHN1bTIgKz0geCAqIHg7XG4gICAgfVxuICAgIGlmICh1bmJpYXNlZCkge1xuICAgICAgdmFyaWFuY2UucHVzaCgoc3VtMiAtIChzdW0xICogc3VtMSkgLyBjb2xzKSAvIChjb2xzIC0gMSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXJpYW5jZS5wdXNoKChzdW0yIC0gKHN1bTEgKiBzdW0xKSAvIGNvbHMpIC8gY29scyk7XG4gICAgfVxuICB9XG4gIHJldHVybiB2YXJpYW5jZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZhcmlhbmNlQnlDb2x1bW4obWF0cml4LCB1bmJpYXNlZCwgbWVhbikge1xuICBjb25zdCByb3dzID0gbWF0cml4LnJvd3M7XG4gIGNvbnN0IGNvbHMgPSBtYXRyaXguY29sdW1ucztcbiAgY29uc3QgdmFyaWFuY2UgPSBbXTtcblxuICBmb3IgKGxldCBqID0gMDsgaiA8IGNvbHM7IGorKykge1xuICAgIGxldCBzdW0xID0gMDtcbiAgICBsZXQgc3VtMiA9IDA7XG4gICAgbGV0IHggPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93czsgaSsrKSB7XG4gICAgICB4ID0gbWF0cml4LmdldChpLCBqKSAtIG1lYW5bal07XG4gICAgICBzdW0xICs9IHg7XG4gICAgICBzdW0yICs9IHggKiB4O1xuICAgIH1cbiAgICBpZiAodW5iaWFzZWQpIHtcbiAgICAgIHZhcmlhbmNlLnB1c2goKHN1bTIgLSAoc3VtMSAqIHN1bTEpIC8gcm93cykgLyAocm93cyAtIDEpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyaWFuY2UucHVzaCgoc3VtMiAtIChzdW0xICogc3VtMSkgLyByb3dzKSAvIHJvd3MpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdmFyaWFuY2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2YXJpYW5jZUFsbChtYXRyaXgsIHVuYmlhc2VkLCBtZWFuKSB7XG4gIGNvbnN0IHJvd3MgPSBtYXRyaXgucm93cztcbiAgY29uc3QgY29scyA9IG1hdHJpeC5jb2x1bW5zO1xuICBjb25zdCBzaXplID0gcm93cyAqIGNvbHM7XG5cbiAgbGV0IHN1bTEgPSAwO1xuICBsZXQgc3VtMiA9IDA7XG4gIGxldCB4ID0gMDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNvbHM7IGorKykge1xuICAgICAgeCA9IG1hdHJpeC5nZXQoaSwgaikgLSBtZWFuO1xuICAgICAgc3VtMSArPSB4O1xuICAgICAgc3VtMiArPSB4ICogeDtcbiAgICB9XG4gIH1cbiAgaWYgKHVuYmlhc2VkKSB7XG4gICAgcmV0dXJuIChzdW0yIC0gKHN1bTEgKiBzdW0xKSAvIHNpemUpIC8gKHNpemUgLSAxKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gKHN1bTIgLSAoc3VtMSAqIHN1bTEpIC8gc2l6ZSkgLyBzaXplO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjZW50ZXJCeVJvdyhtYXRyaXgsIG1lYW4pIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXRyaXgucm93czsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBtYXRyaXguY29sdW1uczsgaisrKSB7XG4gICAgICBtYXRyaXguc2V0KGksIGosIG1hdHJpeC5nZXQoaSwgaikgLSBtZWFuW2ldKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNlbnRlckJ5Q29sdW1uKG1hdHJpeCwgbWVhbikge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG1hdHJpeC5yb3dzOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IG1hdHJpeC5jb2x1bW5zOyBqKyspIHtcbiAgICAgIG1hdHJpeC5zZXQoaSwgaiwgbWF0cml4LmdldChpLCBqKSAtIG1lYW5bal0pO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2VudGVyQWxsKG1hdHJpeCwgbWVhbikge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG1hdHJpeC5yb3dzOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IG1hdHJpeC5jb2x1bW5zOyBqKyspIHtcbiAgICAgIG1hdHJpeC5zZXQoaSwgaiwgbWF0cml4LmdldChpLCBqKSAtIG1lYW4pO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2NhbGVCeVJvdyhtYXRyaXgpIHtcbiAgY29uc3Qgc2NhbGUgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXRyaXgucm93czsgaSsrKSB7XG4gICAgbGV0IHN1bSA9IDA7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBtYXRyaXguY29sdW1uczsgaisrKSB7XG4gICAgICBzdW0gKz0gTWF0aC5wb3cobWF0cml4LmdldChpLCBqKSwgMikgLyAobWF0cml4LmNvbHVtbnMgLSAxKTtcbiAgICB9XG4gICAgc2NhbGUucHVzaChNYXRoLnNxcnQoc3VtKSk7XG4gIH1cbiAgcmV0dXJuIHNjYWxlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2NhbGVCeVJvdyhtYXRyaXgsIHNjYWxlKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbWF0cml4LnJvd3M7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgbWF0cml4LmNvbHVtbnM7IGorKykge1xuICAgICAgbWF0cml4LnNldChpLCBqLCBtYXRyaXguZ2V0KGksIGopIC8gc2NhbGVbaV0pO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2NhbGVCeUNvbHVtbihtYXRyaXgpIHtcbiAgY29uc3Qgc2NhbGUgPSBbXTtcbiAgZm9yIChsZXQgaiA9IDA7IGogPCBtYXRyaXguY29sdW1uczsgaisrKSB7XG4gICAgbGV0IHN1bSA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXRyaXgucm93czsgaSsrKSB7XG4gICAgICBzdW0gKz0gTWF0aC5wb3cobWF0cml4LmdldChpLCBqKSwgMikgLyAobWF0cml4LnJvd3MgLSAxKTtcbiAgICB9XG4gICAgc2NhbGUucHVzaChNYXRoLnNxcnQoc3VtKSk7XG4gIH1cbiAgcmV0dXJuIHNjYWxlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2NhbGVCeUNvbHVtbihtYXRyaXgsIHNjYWxlKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbWF0cml4LnJvd3M7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgbWF0cml4LmNvbHVtbnM7IGorKykge1xuICAgICAgbWF0cml4LnNldChpLCBqLCBtYXRyaXguZ2V0KGksIGopIC8gc2NhbGVbal0pO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2NhbGVBbGwobWF0cml4KSB7XG4gIGNvbnN0IGRpdmlkZXIgPSBtYXRyaXguc2l6ZSAtIDE7XG4gIGxldCBzdW0gPSAwO1xuICBmb3IgKGxldCBqID0gMDsgaiA8IG1hdHJpeC5jb2x1bW5zOyBqKyspIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hdHJpeC5yb3dzOyBpKyspIHtcbiAgICAgIHN1bSArPSBNYXRoLnBvdyhtYXRyaXguZ2V0KGksIGopLCAyKSAvIGRpdmlkZXI7XG4gICAgfVxuICB9XG4gIHJldHVybiBNYXRoLnNxcnQoc3VtKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNjYWxlQWxsKG1hdHJpeCwgc2NhbGUpIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXRyaXgucm93czsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBtYXRyaXguY29sdW1uczsgaisrKSB7XG4gICAgICBtYXRyaXguc2V0KGksIGosIG1hdHJpeC5nZXQoaSwgaikgLyBzY2FsZSk7XG4gICAgfVxuICB9XG59XG4iLCIvKipcbiAqIEBwcml2YXRlXG4gKiBDaGVjayB0aGF0IGEgcm93IGluZGV4IGlzIG5vdCBvdXQgb2YgYm91bmRzXG4gKiBAcGFyYW0ge01hdHJpeH0gbWF0cml4XG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW291dGVyXVxuICovXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tSb3dJbmRleChtYXRyaXgsIGluZGV4LCBvdXRlcikge1xuICBsZXQgbWF4ID0gb3V0ZXIgPyBtYXRyaXgucm93cyA6IG1hdHJpeC5yb3dzIC0gMTtcbiAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+IG1heCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdSb3cgaW5kZXggb3V0IG9mIHJhbmdlJyk7XG4gIH1cbn1cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICogQ2hlY2sgdGhhdCBhIGNvbHVtbiBpbmRleCBpcyBub3Qgb3V0IG9mIGJvdW5kc1xuICogQHBhcmFtIHtNYXRyaXh9IG1hdHJpeFxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvdXRlcl1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrQ29sdW1uSW5kZXgobWF0cml4LCBpbmRleCwgb3V0ZXIpIHtcbiAgbGV0IG1heCA9IG91dGVyID8gbWF0cml4LmNvbHVtbnMgOiBtYXRyaXguY29sdW1ucyAtIDE7XG4gIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPiBtYXgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQ29sdW1uIGluZGV4IG91dCBvZiByYW5nZScpO1xuICB9XG59XG5cbi8qKlxuICogQHByaXZhdGVcbiAqIENoZWNrIHRoYXQgdGhlIHByb3ZpZGVkIHZlY3RvciBpcyBhbiBhcnJheSB3aXRoIHRoZSByaWdodCBsZW5ndGhcbiAqIEBwYXJhbSB7TWF0cml4fSBtYXRyaXhcbiAqIEBwYXJhbSB7QXJyYXl8TWF0cml4fSB2ZWN0b3JcbiAqIEByZXR1cm4ge0FycmF5fVxuICogQHRocm93cyB7UmFuZ2VFcnJvcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrUm93VmVjdG9yKG1hdHJpeCwgdmVjdG9yKSB7XG4gIGlmICh2ZWN0b3IudG8xREFycmF5KSB7XG4gICAgdmVjdG9yID0gdmVjdG9yLnRvMURBcnJheSgpO1xuICB9XG4gIGlmICh2ZWN0b3IubGVuZ3RoICE9PSBtYXRyaXguY29sdW1ucykge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFxuICAgICAgJ3ZlY3RvciBzaXplIG11c3QgYmUgdGhlIHNhbWUgYXMgdGhlIG51bWJlciBvZiBjb2x1bW5zJyxcbiAgICApO1xuICB9XG4gIHJldHVybiB2ZWN0b3I7XG59XG5cbi8qKlxuICogQHByaXZhdGVcbiAqIENoZWNrIHRoYXQgdGhlIHByb3ZpZGVkIHZlY3RvciBpcyBhbiBhcnJheSB3aXRoIHRoZSByaWdodCBsZW5ndGhcbiAqIEBwYXJhbSB7TWF0cml4fSBtYXRyaXhcbiAqIEBwYXJhbSB7QXJyYXl8TWF0cml4fSB2ZWN0b3JcbiAqIEByZXR1cm4ge0FycmF5fVxuICogQHRocm93cyB7UmFuZ2VFcnJvcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrQ29sdW1uVmVjdG9yKG1hdHJpeCwgdmVjdG9yKSB7XG4gIGlmICh2ZWN0b3IudG8xREFycmF5KSB7XG4gICAgdmVjdG9yID0gdmVjdG9yLnRvMURBcnJheSgpO1xuICB9XG4gIGlmICh2ZWN0b3IubGVuZ3RoICE9PSBtYXRyaXgucm93cykge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCd2ZWN0b3Igc2l6ZSBtdXN0IGJlIHRoZSBzYW1lIGFzIHRoZSBudW1iZXIgb2Ygcm93cycpO1xuICB9XG4gIHJldHVybiB2ZWN0b3I7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja0luZGljZXMobWF0cml4LCByb3dJbmRpY2VzLCBjb2x1bW5JbmRpY2VzKSB7XG4gIHJldHVybiB7XG4gICAgcm93OiBjaGVja1Jvd0luZGljZXMobWF0cml4LCByb3dJbmRpY2VzKSxcbiAgICBjb2x1bW46IGNoZWNrQ29sdW1uSW5kaWNlcyhtYXRyaXgsIGNvbHVtbkluZGljZXMpLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tSb3dJbmRpY2VzKG1hdHJpeCwgcm93SW5kaWNlcykge1xuICBpZiAodHlwZW9mIHJvd0luZGljZXMgIT09ICdvYmplY3QnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigndW5leHBlY3RlZCB0eXBlIGZvciByb3cgaW5kaWNlcycpO1xuICB9XG5cbiAgbGV0IHJvd091dCA9IHJvd0luZGljZXMuc29tZSgocikgPT4ge1xuICAgIHJldHVybiByIDwgMCB8fCByID49IG1hdHJpeC5yb3dzO1xuICB9KTtcblxuICBpZiAocm93T3V0KSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3JvdyBpbmRpY2VzIGFyZSBvdXQgb2YgcmFuZ2UnKTtcbiAgfVxuXG4gIGlmICghQXJyYXkuaXNBcnJheShyb3dJbmRpY2VzKSkgcm93SW5kaWNlcyA9IEFycmF5LmZyb20ocm93SW5kaWNlcyk7XG5cbiAgcmV0dXJuIHJvd0luZGljZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja0NvbHVtbkluZGljZXMobWF0cml4LCBjb2x1bW5JbmRpY2VzKSB7XG4gIGlmICh0eXBlb2YgY29sdW1uSW5kaWNlcyAhPT0gJ29iamVjdCcpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd1bmV4cGVjdGVkIHR5cGUgZm9yIGNvbHVtbiBpbmRpY2VzJyk7XG4gIH1cblxuICBsZXQgY29sdW1uT3V0ID0gY29sdW1uSW5kaWNlcy5zb21lKChjKSA9PiB7XG4gICAgcmV0dXJuIGMgPCAwIHx8IGMgPj0gbWF0cml4LmNvbHVtbnM7XG4gIH0pO1xuXG4gIGlmIChjb2x1bW5PdXQpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignY29sdW1uIGluZGljZXMgYXJlIG91dCBvZiByYW5nZScpO1xuICB9XG4gIGlmICghQXJyYXkuaXNBcnJheShjb2x1bW5JbmRpY2VzKSkgY29sdW1uSW5kaWNlcyA9IEFycmF5LmZyb20oY29sdW1uSW5kaWNlcyk7XG5cbiAgcmV0dXJuIGNvbHVtbkluZGljZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja1JhbmdlKG1hdHJpeCwgc3RhcnRSb3csIGVuZFJvdywgc3RhcnRDb2x1bW4sIGVuZENvbHVtbikge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCAhPT0gNSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdleHBlY3RlZCA0IGFyZ3VtZW50cycpO1xuICB9XG4gIGNoZWNrTnVtYmVyKCdzdGFydFJvdycsIHN0YXJ0Um93KTtcbiAgY2hlY2tOdW1iZXIoJ2VuZFJvdycsIGVuZFJvdyk7XG4gIGNoZWNrTnVtYmVyKCdzdGFydENvbHVtbicsIHN0YXJ0Q29sdW1uKTtcbiAgY2hlY2tOdW1iZXIoJ2VuZENvbHVtbicsIGVuZENvbHVtbik7XG4gIGlmIChcbiAgICBzdGFydFJvdyA+IGVuZFJvdyB8fFxuICAgIHN0YXJ0Q29sdW1uID4gZW5kQ29sdW1uIHx8XG4gICAgc3RhcnRSb3cgPCAwIHx8XG4gICAgc3RhcnRSb3cgPj0gbWF0cml4LnJvd3MgfHxcbiAgICBlbmRSb3cgPCAwIHx8XG4gICAgZW5kUm93ID49IG1hdHJpeC5yb3dzIHx8XG4gICAgc3RhcnRDb2x1bW4gPCAwIHx8XG4gICAgc3RhcnRDb2x1bW4gPj0gbWF0cml4LmNvbHVtbnMgfHxcbiAgICBlbmRDb2x1bW4gPCAwIHx8XG4gICAgZW5kQ29sdW1uID49IG1hdHJpeC5jb2x1bW5zXG4gICkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdTdWJtYXRyaXggaW5kaWNlcyBhcmUgb3V0IG9mIHJhbmdlJyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5ld0FycmF5KGxlbmd0aCwgdmFsdWUgPSAwKSB7XG4gIGxldCBhcnJheSA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgYXJyYXkucHVzaCh2YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5mdW5jdGlvbiBjaGVja051bWJlcihuYW1lLCB2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYCR7bmFtZX0gbXVzdCBiZSBhIG51bWJlcmApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBBYnN0cmFjdE1hdHJpeCB9IGZyb20gJy4uL21hdHJpeCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2VWaWV3IGV4dGVuZHMgQWJzdHJhY3RNYXRyaXgge1xuICBjb25zdHJ1Y3RvcihtYXRyaXgsIHJvd3MsIGNvbHVtbnMpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMubWF0cml4ID0gbWF0cml4O1xuICAgIHRoaXMucm93cyA9IHJvd3M7XG4gICAgdGhpcy5jb2x1bW5zID0gY29sdW1ucztcbiAgfVxufVxuIiwiaW1wb3J0IHsgY2hlY2tDb2x1bW5JbmRleCB9IGZyb20gJy4uL3V0aWwnO1xuXG5pbXBvcnQgQmFzZVZpZXcgZnJvbSAnLi9iYXNlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWF0cml4Q29sdW1uVmlldyBleHRlbmRzIEJhc2VWaWV3IHtcbiAgY29uc3RydWN0b3IobWF0cml4LCBjb2x1bW4pIHtcbiAgICBjaGVja0NvbHVtbkluZGV4KG1hdHJpeCwgY29sdW1uKTtcbiAgICBzdXBlcihtYXRyaXgsIG1hdHJpeC5yb3dzLCAxKTtcbiAgICB0aGlzLmNvbHVtbiA9IGNvbHVtbjtcbiAgfVxuXG4gIHNldChyb3dJbmRleCwgY29sdW1uSW5kZXgsIHZhbHVlKSB7XG4gICAgdGhpcy5tYXRyaXguc2V0KHJvd0luZGV4LCB0aGlzLmNvbHVtbiwgdmFsdWUpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0KHJvd0luZGV4KSB7XG4gICAgcmV0dXJuIHRoaXMubWF0cml4LmdldChyb3dJbmRleCwgdGhpcy5jb2x1bW4pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBjaGVja0NvbHVtbkluZGljZXMgfSBmcm9tICcuLi91dGlsJztcblxuaW1wb3J0IEJhc2VWaWV3IGZyb20gJy4vYmFzZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hdHJpeENvbHVtblNlbGVjdGlvblZpZXcgZXh0ZW5kcyBCYXNlVmlldyB7XG4gIGNvbnN0cnVjdG9yKG1hdHJpeCwgY29sdW1uSW5kaWNlcykge1xuICAgIGNvbHVtbkluZGljZXMgPSBjaGVja0NvbHVtbkluZGljZXMobWF0cml4LCBjb2x1bW5JbmRpY2VzKTtcbiAgICBzdXBlcihtYXRyaXgsIG1hdHJpeC5yb3dzLCBjb2x1bW5JbmRpY2VzLmxlbmd0aCk7XG4gICAgdGhpcy5jb2x1bW5JbmRpY2VzID0gY29sdW1uSW5kaWNlcztcbiAgfVxuXG4gIHNldChyb3dJbmRleCwgY29sdW1uSW5kZXgsIHZhbHVlKSB7XG4gICAgdGhpcy5tYXRyaXguc2V0KHJvd0luZGV4LCB0aGlzLmNvbHVtbkluZGljZXNbY29sdW1uSW5kZXhdLCB2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXQocm93SW5kZXgsIGNvbHVtbkluZGV4KSB7XG4gICAgcmV0dXJuIHRoaXMubWF0cml4LmdldChyb3dJbmRleCwgdGhpcy5jb2x1bW5JbmRpY2VzW2NvbHVtbkluZGV4XSk7XG4gIH1cbn1cbiIsImltcG9ydCBCYXNlVmlldyBmcm9tICcuL2Jhc2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXRyaXhGbGlwQ29sdW1uVmlldyBleHRlbmRzIEJhc2VWaWV3IHtcbiAgY29uc3RydWN0b3IobWF0cml4KSB7XG4gICAgc3VwZXIobWF0cml4LCBtYXRyaXgucm93cywgbWF0cml4LmNvbHVtbnMpO1xuICB9XG5cbiAgc2V0KHJvd0luZGV4LCBjb2x1bW5JbmRleCwgdmFsdWUpIHtcbiAgICB0aGlzLm1hdHJpeC5zZXQocm93SW5kZXgsIHRoaXMuY29sdW1ucyAtIGNvbHVtbkluZGV4IC0gMSwgdmFsdWUpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0KHJvd0luZGV4LCBjb2x1bW5JbmRleCkge1xuICAgIHJldHVybiB0aGlzLm1hdHJpeC5nZXQocm93SW5kZXgsIHRoaXMuY29sdW1ucyAtIGNvbHVtbkluZGV4IC0gMSk7XG4gIH1cbn1cbiIsImltcG9ydCBCYXNlVmlldyBmcm9tICcuL2Jhc2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXRyaXhGbGlwUm93VmlldyBleHRlbmRzIEJhc2VWaWV3IHtcbiAgY29uc3RydWN0b3IobWF0cml4KSB7XG4gICAgc3VwZXIobWF0cml4LCBtYXRyaXgucm93cywgbWF0cml4LmNvbHVtbnMpO1xuICB9XG5cbiAgc2V0KHJvd0luZGV4LCBjb2x1bW5JbmRleCwgdmFsdWUpIHtcbiAgICB0aGlzLm1hdHJpeC5zZXQodGhpcy5yb3dzIC0gcm93SW5kZXggLSAxLCBjb2x1bW5JbmRleCwgdmFsdWUpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0KHJvd0luZGV4LCBjb2x1bW5JbmRleCkge1xuICAgIHJldHVybiB0aGlzLm1hdHJpeC5nZXQodGhpcy5yb3dzIC0gcm93SW5kZXggLSAxLCBjb2x1bW5JbmRleCk7XG4gIH1cbn1cbiIsImV4cG9ydCB7IGRlZmF1bHQgYXMgTWF0cml4Q29sdW1uVmlldyB9IGZyb20gJy4vY29sdW1uJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTWF0cml4Q29sdW1uU2VsZWN0aW9uVmlldyB9IGZyb20gJy4vY29sdW1uU2VsZWN0aW9uJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTWF0cml4RmxpcENvbHVtblZpZXcgfSBmcm9tICcuL2ZsaXBDb2x1bW4nO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBNYXRyaXhGbGlwUm93VmlldyB9IGZyb20gJy4vZmxpcFJvdyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE1hdHJpeFJvd1ZpZXcgfSBmcm9tICcuL3Jvdyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE1hdHJpeFJvd1NlbGVjdGlvblZpZXcgfSBmcm9tICcuL3Jvd1NlbGVjdGlvbic7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE1hdHJpeFNlbGVjdGlvblZpZXcgfSBmcm9tICcuL3NlbGVjdGlvbic7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE1hdHJpeFN1YlZpZXcgfSBmcm9tICcuL3N1Yic7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE1hdHJpeFRyYW5zcG9zZVZpZXcgfSBmcm9tICcuL3RyYW5zcG9zZSc7XG4iLCJpbXBvcnQgeyBjaGVja1Jvd0luZGV4IH0gZnJvbSAnLi4vdXRpbCc7XG5cbmltcG9ydCBCYXNlVmlldyBmcm9tICcuL2Jhc2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXRyaXhSb3dWaWV3IGV4dGVuZHMgQmFzZVZpZXcge1xuICBjb25zdHJ1Y3RvcihtYXRyaXgsIHJvdykge1xuICAgIGNoZWNrUm93SW5kZXgobWF0cml4LCByb3cpO1xuICAgIHN1cGVyKG1hdHJpeCwgMSwgbWF0cml4LmNvbHVtbnMpO1xuICAgIHRoaXMucm93ID0gcm93O1xuICB9XG5cbiAgc2V0KHJvd0luZGV4LCBjb2x1bW5JbmRleCwgdmFsdWUpIHtcbiAgICB0aGlzLm1hdHJpeC5zZXQodGhpcy5yb3csIGNvbHVtbkluZGV4LCB2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXQocm93SW5kZXgsIGNvbHVtbkluZGV4KSB7XG4gICAgcmV0dXJuIHRoaXMubWF0cml4LmdldCh0aGlzLnJvdywgY29sdW1uSW5kZXgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBjaGVja1Jvd0luZGljZXMgfSBmcm9tICcuLi91dGlsJztcblxuaW1wb3J0IEJhc2VWaWV3IGZyb20gJy4vYmFzZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hdHJpeFJvd1NlbGVjdGlvblZpZXcgZXh0ZW5kcyBCYXNlVmlldyB7XG4gIGNvbnN0cnVjdG9yKG1hdHJpeCwgcm93SW5kaWNlcykge1xuICAgIHJvd0luZGljZXMgPSBjaGVja1Jvd0luZGljZXMobWF0cml4LCByb3dJbmRpY2VzKTtcbiAgICBzdXBlcihtYXRyaXgsIHJvd0luZGljZXMubGVuZ3RoLCBtYXRyaXguY29sdW1ucyk7XG4gICAgdGhpcy5yb3dJbmRpY2VzID0gcm93SW5kaWNlcztcbiAgfVxuXG4gIHNldChyb3dJbmRleCwgY29sdW1uSW5kZXgsIHZhbHVlKSB7XG4gICAgdGhpcy5tYXRyaXguc2V0KHRoaXMucm93SW5kaWNlc1tyb3dJbmRleF0sIGNvbHVtbkluZGV4LCB2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXQocm93SW5kZXgsIGNvbHVtbkluZGV4KSB7XG4gICAgcmV0dXJuIHRoaXMubWF0cml4LmdldCh0aGlzLnJvd0luZGljZXNbcm93SW5kZXhdLCBjb2x1bW5JbmRleCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IGNoZWNrSW5kaWNlcyB9IGZyb20gJy4uL3V0aWwnO1xuXG5pbXBvcnQgQmFzZVZpZXcgZnJvbSAnLi9iYXNlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWF0cml4U2VsZWN0aW9uVmlldyBleHRlbmRzIEJhc2VWaWV3IHtcbiAgY29uc3RydWN0b3IobWF0cml4LCByb3dJbmRpY2VzLCBjb2x1bW5JbmRpY2VzKSB7XG4gICAgbGV0IGluZGljZXMgPSBjaGVja0luZGljZXMobWF0cml4LCByb3dJbmRpY2VzLCBjb2x1bW5JbmRpY2VzKTtcbiAgICBzdXBlcihtYXRyaXgsIGluZGljZXMucm93Lmxlbmd0aCwgaW5kaWNlcy5jb2x1bW4ubGVuZ3RoKTtcbiAgICB0aGlzLnJvd0luZGljZXMgPSBpbmRpY2VzLnJvdztcbiAgICB0aGlzLmNvbHVtbkluZGljZXMgPSBpbmRpY2VzLmNvbHVtbjtcbiAgfVxuXG4gIHNldChyb3dJbmRleCwgY29sdW1uSW5kZXgsIHZhbHVlKSB7XG4gICAgdGhpcy5tYXRyaXguc2V0KFxuICAgICAgdGhpcy5yb3dJbmRpY2VzW3Jvd0luZGV4XSxcbiAgICAgIHRoaXMuY29sdW1uSW5kaWNlc1tjb2x1bW5JbmRleF0sXG4gICAgICB2YWx1ZSxcbiAgICApO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0KHJvd0luZGV4LCBjb2x1bW5JbmRleCkge1xuICAgIHJldHVybiB0aGlzLm1hdHJpeC5nZXQoXG4gICAgICB0aGlzLnJvd0luZGljZXNbcm93SW5kZXhdLFxuICAgICAgdGhpcy5jb2x1bW5JbmRpY2VzW2NvbHVtbkluZGV4XSxcbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBjaGVja1JhbmdlIH0gZnJvbSAnLi4vdXRpbCc7XG5cbmltcG9ydCBCYXNlVmlldyBmcm9tICcuL2Jhc2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXRyaXhTdWJWaWV3IGV4dGVuZHMgQmFzZVZpZXcge1xuICBjb25zdHJ1Y3RvcihtYXRyaXgsIHN0YXJ0Um93LCBlbmRSb3csIHN0YXJ0Q29sdW1uLCBlbmRDb2x1bW4pIHtcbiAgICBjaGVja1JhbmdlKG1hdHJpeCwgc3RhcnRSb3csIGVuZFJvdywgc3RhcnRDb2x1bW4sIGVuZENvbHVtbik7XG4gICAgc3VwZXIobWF0cml4LCBlbmRSb3cgLSBzdGFydFJvdyArIDEsIGVuZENvbHVtbiAtIHN0YXJ0Q29sdW1uICsgMSk7XG4gICAgdGhpcy5zdGFydFJvdyA9IHN0YXJ0Um93O1xuICAgIHRoaXMuc3RhcnRDb2x1bW4gPSBzdGFydENvbHVtbjtcbiAgfVxuXG4gIHNldChyb3dJbmRleCwgY29sdW1uSW5kZXgsIHZhbHVlKSB7XG4gICAgdGhpcy5tYXRyaXguc2V0KFxuICAgICAgdGhpcy5zdGFydFJvdyArIHJvd0luZGV4LFxuICAgICAgdGhpcy5zdGFydENvbHVtbiArIGNvbHVtbkluZGV4LFxuICAgICAgdmFsdWUsXG4gICAgKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldChyb3dJbmRleCwgY29sdW1uSW5kZXgpIHtcbiAgICByZXR1cm4gdGhpcy5tYXRyaXguZ2V0KFxuICAgICAgdGhpcy5zdGFydFJvdyArIHJvd0luZGV4LFxuICAgICAgdGhpcy5zdGFydENvbHVtbiArIGNvbHVtbkluZGV4LFxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBCYXNlVmlldyBmcm9tICcuL2Jhc2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXRyaXhUcmFuc3Bvc2VWaWV3IGV4dGVuZHMgQmFzZVZpZXcge1xuICBjb25zdHJ1Y3RvcihtYXRyaXgpIHtcbiAgICBzdXBlcihtYXRyaXgsIG1hdHJpeC5jb2x1bW5zLCBtYXRyaXgucm93cyk7XG4gIH1cblxuICBzZXQocm93SW5kZXgsIGNvbHVtbkluZGV4LCB2YWx1ZSkge1xuICAgIHRoaXMubWF0cml4LnNldChjb2x1bW5JbmRleCwgcm93SW5kZXgsIHZhbHVlKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldChyb3dJbmRleCwgY29sdW1uSW5kZXgpIHtcbiAgICByZXR1cm4gdGhpcy5tYXRyaXguZ2V0KGNvbHVtbkluZGV4LCByb3dJbmRleCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEFic3RyYWN0TWF0cml4IH0gZnJvbSAnLi4vbWF0cml4JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV3JhcHBlck1hdHJpeDFEIGV4dGVuZHMgQWJzdHJhY3RNYXRyaXgge1xuICBjb25zdHJ1Y3RvcihkYXRhLCBvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCB7IHJvd3MgPSAxIH0gPSBvcHRpb25zO1xuXG4gICAgaWYgKGRhdGEubGVuZ3RoICUgcm93cyAhPT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aGUgZGF0YSBsZW5ndGggaXMgbm90IGRpdmlzaWJsZSBieSB0aGUgbnVtYmVyIG9mIHJvd3MnKTtcbiAgICB9XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnJvd3MgPSByb3dzO1xuICAgIHRoaXMuY29sdW1ucyA9IGRhdGEubGVuZ3RoIC8gcm93cztcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICB9XG5cbiAgc2V0KHJvd0luZGV4LCBjb2x1bW5JbmRleCwgdmFsdWUpIHtcbiAgICBsZXQgaW5kZXggPSB0aGlzLl9jYWxjdWxhdGVJbmRleChyb3dJbmRleCwgY29sdW1uSW5kZXgpO1xuICAgIHRoaXMuZGF0YVtpbmRleF0gPSB2YWx1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldChyb3dJbmRleCwgY29sdW1uSW5kZXgpIHtcbiAgICBsZXQgaW5kZXggPSB0aGlzLl9jYWxjdWxhdGVJbmRleChyb3dJbmRleCwgY29sdW1uSW5kZXgpO1xuICAgIHJldHVybiB0aGlzLmRhdGFbaW5kZXhdO1xuICB9XG5cbiAgX2NhbGN1bGF0ZUluZGV4KHJvdywgY29sdW1uKSB7XG4gICAgcmV0dXJuIHJvdyAqIHRoaXMuY29sdW1ucyArIGNvbHVtbjtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQWJzdHJhY3RNYXRyaXggfSBmcm9tICcuLi9tYXRyaXgnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXcmFwcGVyTWF0cml4MkQgZXh0ZW5kcyBBYnN0cmFjdE1hdHJpeCB7XG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgdGhpcy5yb3dzID0gZGF0YS5sZW5ndGg7XG4gICAgdGhpcy5jb2x1bW5zID0gZGF0YVswXS5sZW5ndGg7XG4gIH1cblxuICBzZXQocm93SW5kZXgsIGNvbHVtbkluZGV4LCB2YWx1ZSkge1xuICAgIHRoaXMuZGF0YVtyb3dJbmRleF1bY29sdW1uSW5kZXhdID0gdmFsdWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXQocm93SW5kZXgsIGNvbHVtbkluZGV4KSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YVtyb3dJbmRleF1bY29sdW1uSW5kZXhdO1xuICB9XG59XG4iLCJpbXBvcnQgV3JhcHBlck1hdHJpeDFEIGZyb20gJy4vV3JhcHBlck1hdHJpeDFEJztcbmltcG9ydCBXcmFwcGVyTWF0cml4MkQgZnJvbSAnLi9XcmFwcGVyTWF0cml4MkQnO1xuXG5leHBvcnQgZnVuY3Rpb24gd3JhcChhcnJheSwgb3B0aW9ucykge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnJheSkpIHtcbiAgICBpZiAoYXJyYXlbMF0gJiYgQXJyYXkuaXNBcnJheShhcnJheVswXSkpIHtcbiAgICAgIHJldHVybiBuZXcgV3JhcHBlck1hdHJpeDJEKGFycmF5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBXcmFwcGVyTWF0cml4MUQoYXJyYXksIG9wdGlvbnMpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3RoZSBhcmd1bWVudCBpcyBub3QgYW4gYXJyYXknKTtcbiAgfVxufVxuIiwiXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaW55UXVldWUge1xuICAgIGNvbnN0cnVjdG9yKGRhdGEgPSBbXSwgY29tcGFyZSA9IGRlZmF1bHRDb21wYXJlKSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gdGhpcy5kYXRhLmxlbmd0aDtcbiAgICAgICAgdGhpcy5jb21wYXJlID0gY29tcGFyZTtcblxuICAgICAgICBpZiAodGhpcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gKHRoaXMubGVuZ3RoID4+IDEpIC0gMTsgaSA+PSAwOyBpLS0pIHRoaXMuX2Rvd24oaSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdXNoKGl0ZW0pIHtcbiAgICAgICAgdGhpcy5kYXRhLnB1c2goaXRlbSk7XG4gICAgICAgIHRoaXMubGVuZ3RoKys7XG4gICAgICAgIHRoaXMuX3VwKHRoaXMubGVuZ3RoIC0gMSk7XG4gICAgfVxuXG4gICAgcG9wKCkge1xuICAgICAgICBpZiAodGhpcy5sZW5ndGggPT09IDApIHJldHVybiB1bmRlZmluZWQ7XG5cbiAgICAgICAgY29uc3QgdG9wID0gdGhpcy5kYXRhWzBdO1xuICAgICAgICBjb25zdCBib3R0b20gPSB0aGlzLmRhdGEucG9wKCk7XG4gICAgICAgIHRoaXMubGVuZ3RoLS07XG5cbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5kYXRhWzBdID0gYm90dG9tO1xuICAgICAgICAgICAgdGhpcy5fZG93bigwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0b3A7XG4gICAgfVxuXG4gICAgcGVlaygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVswXTtcbiAgICB9XG5cbiAgICBfdXAocG9zKSB7XG4gICAgICAgIGNvbnN0IHtkYXRhLCBjb21wYXJlfSA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBkYXRhW3Bvc107XG5cbiAgICAgICAgd2hpbGUgKHBvcyA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudCA9IChwb3MgLSAxKSA+PiAxO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IGRhdGFbcGFyZW50XTtcbiAgICAgICAgICAgIGlmIChjb21wYXJlKGl0ZW0sIGN1cnJlbnQpID49IDApIGJyZWFrO1xuICAgICAgICAgICAgZGF0YVtwb3NdID0gY3VycmVudDtcbiAgICAgICAgICAgIHBvcyA9IHBhcmVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGFbcG9zXSA9IGl0ZW07XG4gICAgfVxuXG4gICAgX2Rvd24ocG9zKSB7XG4gICAgICAgIGNvbnN0IHtkYXRhLCBjb21wYXJlfSA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGhhbGZMZW5ndGggPSB0aGlzLmxlbmd0aCA+PiAxO1xuICAgICAgICBjb25zdCBpdGVtID0gZGF0YVtwb3NdO1xuXG4gICAgICAgIHdoaWxlIChwb3MgPCBoYWxmTGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgbGVmdCA9IChwb3MgPDwgMSkgKyAxO1xuICAgICAgICAgICAgbGV0IGJlc3QgPSBkYXRhW2xlZnRdO1xuICAgICAgICAgICAgY29uc3QgcmlnaHQgPSBsZWZ0ICsgMTtcblxuICAgICAgICAgICAgaWYgKHJpZ2h0IDwgdGhpcy5sZW5ndGggJiYgY29tcGFyZShkYXRhW3JpZ2h0XSwgYmVzdCkgPCAwKSB7XG4gICAgICAgICAgICAgICAgbGVmdCA9IHJpZ2h0O1xuICAgICAgICAgICAgICAgIGJlc3QgPSBkYXRhW3JpZ2h0XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb21wYXJlKGJlc3QsIGl0ZW0pID49IDApIGJyZWFrO1xuXG4gICAgICAgICAgICBkYXRhW3Bvc10gPSBiZXN0O1xuICAgICAgICAgICAgcG9zID0gbGVmdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGFbcG9zXSA9IGl0ZW07XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkZWZhdWx0Q29tcGFyZShhLCBiKSB7XG4gICAgcmV0dXJuIGEgPCBiID8gLTEgOiBhID4gYiA/IDEgOiAwO1xufVxuIiwiY29uc3Qge01hdGNoZXJ9ID0gcmVxdWlyZSgnLi9pbWFnZS10YXJnZXQvbWF0Y2hpbmcvbWF0Y2hlci5qcycpO1xuY29uc3Qge3JlZmluZUhvbW9ncmFwaHl9ID0gcmVxdWlyZSgnLi9pbWFnZS10YXJnZXQvaWNwL3JlZmluZV9ob21vZ3JhcGh5LmpzJyk7XG5jb25zdCB7ZXN0aW1hdGVIb21vZ3JhcGh5fSA9IHJlcXVpcmUoJy4vaW1hZ2UtdGFyZ2V0L2ljcC9lc3RpbWF0ZV9ob21vZ3JhcGh5LmpzJyk7XG5cbmNvbnN0IEFSMl9UUkFDS0lOR19USFJFU0ggPSA1LjA7IC8vIGRlZmF1bHRcblxuXG5sZXQgcHJvamVjdGlvblRyYW5zZm9ybSA9IG51bGw7XG5sZXQgbWF0Y2hpbmdEYXRhTGlzdCA9IG51bGw7XG5sZXQgbWF0Y2hlciA9IG51bGw7XG5cbm9ubWVzc2FnZSA9IChtc2cpID0+IHtcbiAgY29uc3Qge2RhdGF9ID0gbXNnO1xuXG4gIGlmIChkYXRhLnR5cGUgPT09ICdzZXR1cCcpIHtcbiAgICBwcm9qZWN0aW9uVHJhbnNmb3JtID0gZGF0YS5wcm9qZWN0aW9uVHJhbnNmb3JtO1xuICAgIG1hdGNoaW5nRGF0YUxpc3QgPSBkYXRhLm1hdGNoaW5nRGF0YUxpc3Q7XG4gICAgbWF0Y2hlciA9IG5ldyBNYXRjaGVyKGRhdGEuaW5wdXRXaWR0aCwgZGF0YS5pbnB1dEhlaWdodCk7XG4gIH1cblxuICBlbHNlIGlmIChkYXRhLnR5cGUgPT09ICdtYXRjaCcpIHtcbiAgICBjb25zdCBza2lwVGFyZ2V0SW5kZXhlcyA9IGRhdGEuc2tpcFRhcmdldEluZGV4ZXM7XG5cbiAgICBsZXQgbWF0Y2hlZFRhcmdldEluZGV4ID0gLTE7XG4gICAgbGV0IG1hdGNoZWRNb2RlbFZpZXdUcmFuc2Zvcm0gPSBudWxsO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXRjaGluZ0RhdGFMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoc2tpcFRhcmdldEluZGV4ZXMuaW5jbHVkZXMoaSkpIGNvbnRpbnVlO1xuXG4gICAgICBjb25zdCBtYXRjaFJlc3VsdCA9IG1hdGNoZXIubWF0Y2hEZXRlY3Rpb24obWF0Y2hpbmdEYXRhTGlzdFtpXSwgZGF0YS5mZWF0dXJlUG9pbnRzKTtcbiAgICAgIGlmIChtYXRjaFJlc3VsdCA9PT0gbnVsbCkgY29udGludWU7XG5cbiAgICAgIGNvbnN0IHtzY3JlZW5Db29yZHMsIHdvcmxkQ29vcmRzfSA9IG1hdGNoUmVzdWx0O1xuICAgICAgY29uc3QgbW9kZWxWaWV3VHJhbnNmb3JtID0gZXN0aW1hdGVIb21vZ3JhcGh5KHtzY3JlZW5Db29yZHMsIHdvcmxkQ29vcmRzLCBwcm9qZWN0aW9uVHJhbnNmb3JtfSk7XG4gICAgICBpZiAobW9kZWxWaWV3VHJhbnNmb3JtID09PSBudWxsKSBjb250aW51ZTtcblxuICAgICAgbWF0Y2hlZFRhcmdldEluZGV4ID0gaTtcbiAgICAgIG1hdGNoZWRNb2RlbFZpZXdUcmFuc2Zvcm0gPSBtb2RlbFZpZXdUcmFuc2Zvcm07XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBwb3N0TWVzc2FnZSh7XG4gICAgICB0eXBlOiAnbWF0Y2hEb25lJyxcbiAgICAgIHRhcmdldEluZGV4OiBtYXRjaGVkVGFyZ2V0SW5kZXgsXG4gICAgICBtb2RlbFZpZXdUcmFuc2Zvcm06IG1hdGNoZWRNb2RlbFZpZXdUcmFuc2Zvcm0sXG4gICAgfSk7XG4gIH1cbiAgZWxzZSBpZiAoZGF0YS50eXBlID09PSAndHJhY2snKSB7XG4gICAgY29uc3Qge21vZGVsVmlld1RyYW5zZm9ybSwgc2VsZWN0ZWRGZWF0dXJlc30gPSBkYXRhO1xuXG4gICAgY29uc3QgaW5saWVyUHJvYnMgPSBbMS4wLCAwLjgsIDAuNiwgMC40LCAwLjBdO1xuICAgIGxldCBlcnIgPSBudWxsO1xuICAgIGxldCBuZXdNb2RlbFZpZXdUcmFuc2Zvcm0gPSBtb2RlbFZpZXdUcmFuc2Zvcm07XG4gICAgbGV0IGZpbmFsTW9kZWxWaWV3VHJhbnNmb3JtID0gbnVsbDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlubGllclByb2JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgcmV0ID0gX2NvbXB1dGVVcGRhdGVkVHJhbih7bW9kZWxWaWV3VHJhbnNmb3JtOiBuZXdNb2RlbFZpZXdUcmFuc2Zvcm0sIHNlbGVjdGVkRmVhdHVyZXMsIHByb2plY3Rpb25UcmFuc2Zvcm0sIGlubGllclByb2I6IGlubGllclByb2JzW2ldfSk7XG4gICAgICBlcnIgPSByZXQuZXJyO1xuICAgICAgbmV3TW9kZWxWaWV3VHJhbnNmb3JtID0gcmV0Lm5ld01vZGVsVmlld1RyYW5zZm9ybTtcbiAgICAgIC8vY29uc29sZS5sb2coXCJfY29tcHV0ZVVwZGF0ZWRUcmFuXCIsIGVycilcblxuICAgICAgaWYgKGVyciA8IEFSMl9UUkFDS0lOR19USFJFU0gpIHtcbiAgICAgICAgZmluYWxNb2RlbFZpZXdUcmFuc2Zvcm0gPSBuZXdNb2RlbFZpZXdUcmFuc2Zvcm07XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHBvc3RNZXNzYWdlKHtcbiAgICAgIHR5cGU6ICd0cmFja0RvbmUnLFxuICAgICAgbW9kZWxWaWV3VHJhbnNmb3JtOiBmaW5hbE1vZGVsVmlld1RyYW5zZm9ybSxcbiAgICB9KTtcbiAgfVxufTtcblxuY29uc3QgX2NvbXB1dGVVcGRhdGVkVHJhbiA9ICh7bW9kZWxWaWV3VHJhbnNmb3JtLCBwcm9qZWN0aW9uVHJhbnNmb3JtLCBzZWxlY3RlZEZlYXR1cmVzLCBpbmxpZXJQcm9ifSkgPT4ge1xuICBsZXQgZHggPSAwO1xuICBsZXQgZHkgPSAwO1xuICBsZXQgZHogPSAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdGVkRmVhdHVyZXMubGVuZ3RoOyBpKyspIHtcbiAgICBkeCArPSBzZWxlY3RlZEZlYXR1cmVzW2ldLnBvczNELng7XG4gICAgZHkgKz0gc2VsZWN0ZWRGZWF0dXJlc1tpXS5wb3MzRC55O1xuICAgIGR6ICs9IHNlbGVjdGVkRmVhdHVyZXNbaV0ucG9zM0QuejtcbiAgfVxuICBkeCAvPSBzZWxlY3RlZEZlYXR1cmVzLmxlbmd0aDtcbiAgZHkgLz0gc2VsZWN0ZWRGZWF0dXJlcy5sZW5ndGg7XG4gIGR6IC89IHNlbGVjdGVkRmVhdHVyZXMubGVuZ3RoO1xuXG4gIGNvbnN0IHdvcmxkQ29vcmRzID0gW107XG4gIGNvbnN0IHNjcmVlbkNvb3JkcyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdGVkRmVhdHVyZXMubGVuZ3RoOyBpKyspIHtcbiAgICBzY3JlZW5Db29yZHMucHVzaCh7eDogc2VsZWN0ZWRGZWF0dXJlc1tpXS5wb3MyRC54LCB5OiBzZWxlY3RlZEZlYXR1cmVzW2ldLnBvczJELnl9KTtcbiAgICB3b3JsZENvb3Jkcy5wdXNoKHt4OiBzZWxlY3RlZEZlYXR1cmVzW2ldLnBvczNELnggLSBkeCwgeTogc2VsZWN0ZWRGZWF0dXJlc1tpXS5wb3MzRC55IC0gZHksIHo6IHNlbGVjdGVkRmVhdHVyZXNbaV0ucG9zM0QueiAtIGR6fSk7XG4gIH1cblxuICBjb25zdCBkaWZmTW9kZWxWaWV3VHJhbnNmb3JtID0gW1tdLFtdLFtdXTtcbiAgZm9yIChsZXQgaiA9IDA7IGogPCAzOyBqKyspIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgZGlmZk1vZGVsVmlld1RyYW5zZm9ybVtqXVtpXSA9IG1vZGVsVmlld1RyYW5zZm9ybVtqXVtpXTtcbiAgICB9XG4gIH1cbiAgZGlmZk1vZGVsVmlld1RyYW5zZm9ybVswXVszXSA9IG1vZGVsVmlld1RyYW5zZm9ybVswXVswXSAqIGR4ICsgbW9kZWxWaWV3VHJhbnNmb3JtWzBdWzFdICogZHkgKyBtb2RlbFZpZXdUcmFuc2Zvcm1bMF1bMl0gKiBkeiArIG1vZGVsVmlld1RyYW5zZm9ybVswXVszXTtcbiAgZGlmZk1vZGVsVmlld1RyYW5zZm9ybVsxXVszXSA9IG1vZGVsVmlld1RyYW5zZm9ybVsxXVswXSAqIGR4ICsgbW9kZWxWaWV3VHJhbnNmb3JtWzFdWzFdICogZHkgKyBtb2RlbFZpZXdUcmFuc2Zvcm1bMV1bMl0gKiBkeiArIG1vZGVsVmlld1RyYW5zZm9ybVsxXVszXTtcbiAgZGlmZk1vZGVsVmlld1RyYW5zZm9ybVsyXVszXSA9IG1vZGVsVmlld1RyYW5zZm9ybVsyXVswXSAqIGR4ICsgbW9kZWxWaWV3VHJhbnNmb3JtWzJdWzFdICogZHkgKyBtb2RlbFZpZXdUcmFuc2Zvcm1bMl1bMl0gKiBkeiArIG1vZGVsVmlld1RyYW5zZm9ybVsyXVszXTtcblxuICBsZXQgcmV0O1xuICBpZiAoaW5saWVyUHJvYiA8IDEpIHtcbiAgICAgcmV0ID0gcmVmaW5lSG9tb2dyYXBoeSh7aW5pdGlhbE1vZGVsVmlld1RyYW5zZm9ybTogZGlmZk1vZGVsVmlld1RyYW5zZm9ybSwgcHJvamVjdGlvblRyYW5zZm9ybSwgd29ybGRDb29yZHMsIHNjcmVlbkNvb3JkcywgaXNSb2J1c3RNb2RlOiB0cnVlLCBpbmxpZXJQcm9ifSk7XG4gIH0gZWxzZSB7XG4gICAgIHJldCA9IHJlZmluZUhvbW9ncmFwaHkoe2luaXRpYWxNb2RlbFZpZXdUcmFuc2Zvcm06IGRpZmZNb2RlbFZpZXdUcmFuc2Zvcm0sIHByb2plY3Rpb25UcmFuc2Zvcm0sIHdvcmxkQ29vcmRzLCBzY3JlZW5Db29yZHMsIGlzUm9idXN0TW9kZTogZmFsc2V9KTtcbiAgfVxuXG4gIGNvbnN0IG5ld01vZGVsVmlld1RyYW5zZm9ybSA9IFtbXSxbXSxbXV07XG4gIGZvciAobGV0IGogPSAwOyBqIDwgMzsgaisrKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgIG5ld01vZGVsVmlld1RyYW5zZm9ybVtqXVtpXSA9IHJldC5tb2RlbFZpZXdUcmFuc2Zvcm1bal1baV07XG4gICAgfVxuICB9XG4gIG5ld01vZGVsVmlld1RyYW5zZm9ybVswXVszXSA9IHJldC5tb2RlbFZpZXdUcmFuc2Zvcm1bMF1bM10gLSByZXQubW9kZWxWaWV3VHJhbnNmb3JtWzBdWzBdICogZHggLSByZXQubW9kZWxWaWV3VHJhbnNmb3JtWzBdWzFdICogZHkgLSByZXQubW9kZWxWaWV3VHJhbnNmb3JtWzBdWzJdICogZHo7XG4gIG5ld01vZGVsVmlld1RyYW5zZm9ybVsxXVszXSA9IHJldC5tb2RlbFZpZXdUcmFuc2Zvcm1bMV1bM10gLSByZXQubW9kZWxWaWV3VHJhbnNmb3JtWzFdWzBdICogZHggLSByZXQubW9kZWxWaWV3VHJhbnNmb3JtWzFdWzFdICogZHkgLSByZXQubW9kZWxWaWV3VHJhbnNmb3JtWzFdWzJdICogZHo7XG4gIG5ld01vZGVsVmlld1RyYW5zZm9ybVsyXVszXSA9IHJldC5tb2RlbFZpZXdUcmFuc2Zvcm1bMl1bM10gLSByZXQubW9kZWxWaWV3VHJhbnNmb3JtWzJdWzBdICogZHggLSByZXQubW9kZWxWaWV3VHJhbnNmb3JtWzJdWzFdICogZHkgLSByZXQubW9kZWxWaWV3VHJhbnNmb3JtWzJdWzJdICogZHo7XG5cblxuICByZXR1cm4ge2VycjogcmV0LmVyciwgbmV3TW9kZWxWaWV3VHJhbnNmb3JtfTtcbn07XG4iLCJjb25zdCB7TWF0cml4LCBpbnZlcnNlfSA9IHJlcXVpcmUoJ21sLW1hdHJpeCcpO1xuXG4vLyBidWlsZCB3b3JsZCBtYXRyaXggd2l0aCBsaXN0IG9mIG1hdGNoaW5nIHdvcmxkQ29vcmRzfHNjcmVlbkNvb3Jkc1xuLy9cbi8vIFN0ZXAgMS4gZXN0aW1hdGUgaG9tb2dyYXBoeSB3aXRoIGxpc3Qgb2YgcGFpcnNcbi8vIFJlZjogaHR0cHM6Ly93d3cudWlvLm5vL3N0dWRpZXIvZW1uZXIvbWF0bmF0L2l0cy9URUs1MDMwL3YxOS9sZWN0L2xlY3R1cmVfNF8zLWVzdGltYXRpbmctaG9tb2dyYXBoaWVzLWZyb20tZmVhdHVyZS1jb3JyZXNwb25kZW5jZXMucGRmICAoQmFzaWMgaG9tb2dyYXBoeSBlc3RpbWF0aW9uIGZyb20gcG9pbnRzKVxuLy9cbi8vIFN0ZXAgMi4gZGVjb21wb3NlIGhvbW9ncmFwaHkgaW50byByb3RhdGlvbiBhbmQgdHJhbnNsYXRpb24gbWF0cml4ZXMgKGkuZS4gd29ybGQgbWF0cml4KVxuLy8gUmVmOiBjYW4gYW55b25lIHByb3ZpZGUgcmVmZXJlbmNlP1xuY29uc3QgZXN0aW1hdGVIb21vZ3JhcGh5ID0gKHtzY3JlZW5Db29yZHMsIHdvcmxkQ29vcmRzLCBwcm9qZWN0aW9uVHJhbnNmb3JtfSkgPT4ge1xuICBjb25zdCBudW0gPSBzY3JlZW5Db29yZHMubGVuZ3RoO1xuICBjb25zdCBBRGF0YSA9IFtdO1xuICBjb25zdCBCRGF0YSA9IFtdO1xuICBmb3IgKGxldCBqID0gMDsgaiA8IG51bTsgaisrKSB7XG4gICAgY29uc3Qgcm93MSA9IFtcbiAgICAgIHdvcmxkQ29vcmRzW2pdLngsXG4gICAgICB3b3JsZENvb3Jkc1tqXS55LFxuICAgICAgMSxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIC0od29ybGRDb29yZHNbal0ueCAqIHNjcmVlbkNvb3Jkc1tqXS54KSxcbiAgICAgIC0od29ybGRDb29yZHNbal0ueSAqIHNjcmVlbkNvb3Jkc1tqXS54KSxcbiAgICBdO1xuICAgIGNvbnN0IHJvdzIgPSBbXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICB3b3JsZENvb3Jkc1tqXS54LFxuICAgICAgd29ybGRDb29yZHNbal0ueSxcbiAgICAgIDEsXG4gICAgICAtKHdvcmxkQ29vcmRzW2pdLnggKiBzY3JlZW5Db29yZHNbal0ueSksXG4gICAgICAtKHdvcmxkQ29vcmRzW2pdLnkgKiBzY3JlZW5Db29yZHNbal0ueSksXG4gICAgXTtcbiAgICBBRGF0YS5wdXNoKHJvdzEpO1xuICAgIEFEYXRhLnB1c2gocm93Mik7XG5cbiAgICBCRGF0YS5wdXNoKFtzY3JlZW5Db29yZHNbal0ueF0pO1xuICAgIEJEYXRhLnB1c2goW3NjcmVlbkNvb3Jkc1tqXS55XSk7XG4gIH1cblxuICBjb25zdCBBID0gbmV3IE1hdHJpeChBRGF0YSk7XG4gIGNvbnN0IEIgPSBuZXcgTWF0cml4KEJEYXRhKTtcbiAgY29uc3QgQVQgPSBBLnRyYW5zcG9zZSgpO1xuICBjb25zdCBBVEEgPSBBVC5tbXVsKEEpO1xuICBjb25zdCBBVEIgPSBBVC5tbXVsKEIpO1xuICBjb25zdCBBVEFJbnYgPSBpbnZlcnNlKEFUQSk7XG4gIGNvbnN0IEMgPSBBVEFJbnYubW11bChBVEIpLnRvMURBcnJheSgpO1xuXG4gIGNvbnN0IEggPSBuZXcgTWF0cml4KFtcbiAgICBbQ1swXSwgQ1sxXSwgQ1syXV0sXG4gICAgW0NbM10sIENbNF0sIENbNV1dLFxuICAgIFtDWzZdLCBDWzddLCAxXVxuICBdKTtcblxuICBjb25zdCBLID0gbmV3IE1hdHJpeChwcm9qZWN0aW9uVHJhbnNmb3JtKTtcbiAgY29uc3QgS0ludiA9IGludmVyc2UoSyk7XG5cbiAgY29uc3QgX0tJbnZIID0gS0ludi5tbXVsKEgpO1xuICBjb25zdCBLSW52SCA9IF9LSW52SC50bzFEQXJyYXkoKTtcblxuICBjb25zdCBub3JtMSA9IE1hdGguc3FydCggS0ludkhbMF0gKiBLSW52SFswXSArIEtJbnZIWzNdICogS0ludkhbM10gKyBLSW52SFs2XSAqIEtJbnZIWzZdKTtcbiAgY29uc3Qgbm9ybTIgPSBNYXRoLnNxcnQoIEtJbnZIWzFdICogS0ludkhbMV0gKyBLSW52SFs0XSAqIEtJbnZIWzRdICsgS0ludkhbN10gKiBLSW52SFs3XSk7XG4gIGNvbnN0IHRub3JtID0gKG5vcm0xICsgbm9ybTIpIC8gMjtcblxuICBjb25zdCByb3RhdGUgPSBbXTtcbiAgcm90YXRlWzBdID0gS0ludkhbMF0gLyBub3JtMTtcbiAgcm90YXRlWzNdID0gS0ludkhbM10gLyBub3JtMTtcbiAgcm90YXRlWzZdID0gS0ludkhbNl0gLyBub3JtMTtcblxuICByb3RhdGVbMV0gPSBLSW52SFsxXSAvIG5vcm0yO1xuICByb3RhdGVbNF0gPSBLSW52SFs0XSAvIG5vcm0yO1xuICByb3RhdGVbN10gPSBLSW52SFs3XSAvIG5vcm0yO1xuXG4gIHJvdGF0ZVsyXSA9IHJvdGF0ZVszXSAqIHJvdGF0ZVs3XSAtIHJvdGF0ZVs2XSAqIHJvdGF0ZVs0XTtcbiAgcm90YXRlWzVdID0gcm90YXRlWzZdICogcm90YXRlWzFdIC0gcm90YXRlWzBdICogcm90YXRlWzddO1xuICByb3RhdGVbOF0gPSByb3RhdGVbMF0gKiByb3RhdGVbNF0gLSByb3RhdGVbMV0gKiByb3RhdGVbM107XG5cbiAgY29uc3Qgbm9ybTMgPSBNYXRoLnNxcnQocm90YXRlWzJdICogcm90YXRlWzJdICsgcm90YXRlWzVdICogcm90YXRlWzVdICsgcm90YXRlWzhdICogcm90YXRlWzhdKTtcbiAgcm90YXRlWzJdIC89IG5vcm0zO1xuICByb3RhdGVbNV0gLz0gbm9ybTM7XG4gIHJvdGF0ZVs4XSAvPSBub3JtMztcblxuICAvLyBUT0RPOiBhcnRvb2xraXQgaGFzIGNoZWNrX3JvdGF0aW9uKCkgdGhhdCBzb21laG93IHN3aXRjaCB0aGUgcm90YXRlIHZlY3Rvci4gbm90IHN1cmUgd2hhdCB0aGF0IGRvZXMuIENhbiBhbnlvbmUgYWR2aWNlP1xuICAvLyBodHRwczovL2dpdGh1Yi5jb20vYXJ0b29sa2l0eC9hcnRvb2xraXQ1L2Jsb2IvNWJmMGI2NzFmZjE2ZWFkNTI3YjliODkyZTZhZWIxYTI3NzFmOTdiZS9saWIvU1JDL0FSSUNQL2ljcFV0aWwuYyNMMjE1XG5cbiAgY29uc3QgdHJhbiA9IFtdXG4gIHRyYW5bMF0gPSBLSW52SFsyXSAvIHRub3JtO1xuICB0cmFuWzFdID0gS0ludkhbNV0gLyB0bm9ybTtcbiAgdHJhblsyXSA9IEtJbnZIWzhdIC8gdG5vcm07XG5cbiAgbGV0IGluaXRpYWxNb2RlbFZpZXdUcmFuc2Zvcm0gPSBbXG4gICAgW3JvdGF0ZVswXSwgcm90YXRlWzFdLCByb3RhdGVbMl0sIHRyYW5bMF1dLFxuICAgIFtyb3RhdGVbM10sIHJvdGF0ZVs0XSwgcm90YXRlWzVdLCB0cmFuWzFdXSxcbiAgICBbcm90YXRlWzZdLCByb3RhdGVbN10sIHJvdGF0ZVs4XSwgdHJhblsyXV1cbiAgXTtcblxuICByZXR1cm4gaW5pdGlhbE1vZGVsVmlld1RyYW5zZm9ybTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBlc3RpbWF0ZUhvbW9ncmFwaHlcbn1cbiIsImNvbnN0IHtNYXRyaXgsIGludmVyc2V9ID0gcmVxdWlyZSgnbWwtbWF0cml4Jyk7XG5jb25zdCB7YXBwbHlNb2RlbFZpZXdQcm9qZWN0aW9uVHJhbnNmb3JtLCBidWlsZE1vZGVsVmlld1Byb2plY3Rpb25UcmFuc2Zvcm0sIGNvbXB1dGVTY3JlZW5Db29yZGlhdGV9ID0gcmVxdWlyZSgnLi91dGlscy5qcycpO1xuXG4vLyBUT0RPOiB0aGUgZXJyb3IgY29tcHV0YXRpb24gc2VlbXMgcHJvYmxlbWF0aWMuIHNob3VsZCBpdCBiZSByZWxhdGl2ZSB0byB0aGUgc2l6ZSBvZiBkZXRlY3Rpb24/XG4vLyAgICAgICBub3cgdGhlIHZhbHVlcyBhcmUgaGFyZGNvZGVkLCBlLmcuIEsyX0ZhY3RvciA9IDRcbmNvbnN0IEsyX0ZBQ1RPUiA9IDQuMDtcbmNvbnN0IElDUF9NQVhfTE9PUCA9IDEwO1xuY29uc3QgSUNQX0JSRUFLX0xPT1BfRVJST1JfVEhSRVNIID0gMC4xO1xuY29uc3QgSUNQX0JSRUFLX0xPT1BfRVJST1JfUkFUSU9fVEhSRVNIID0gMC45OTtcbmNvbnN0IElDUF9CUkVBS19MT09QX0VSUk9SX1RIUkVTSDIgPSA0LjA7XG5cbi8vIElDUCBpdGVyYXRpb24gd2l0aCBwb2ludHNcbi8vIENhbiBzb21lb25lIHByb3ZpZGUgdGhlb3JldGljYWwgcmVmZXJlbmNlP1xuY29uc3QgcmVmaW5lSG9tb2dyYXBoeSA9ICh7aW5pdGlhbE1vZGVsVmlld1RyYW5zZm9ybSwgcHJvamVjdGlvblRyYW5zZm9ybSwgd29ybGRDb29yZHMsIHNjcmVlbkNvb3JkcywgaXNSb2J1c3RNb2RlLCBpbmxpZXJQcm9ifSkgPT4ge1xuICBsZXQgbW9kZWxWaWV3VHJhbnNmb3JtID0gaW5pdGlhbE1vZGVsVmlld1RyYW5zZm9ybTtcblxuICBsZXQgZXJyMCA9IDAuMDtcbiAgbGV0IGVycjEgPSAwLjA7XG4gIGZvciAobGV0IGwgPSAwOyBsIDw9IElDUF9NQVhfTE9PUDsgbCsrKSB7XG5cbiAgICBjb25zdCBtb2RlbFZpZXdQcm9qZWN0aW9uVHJhbnNmb3JtID0gYnVpbGRNb2RlbFZpZXdQcm9qZWN0aW9uVHJhbnNmb3JtKHByb2plY3Rpb25UcmFuc2Zvcm0sIG1vZGVsVmlld1RyYW5zZm9ybSk7XG5cbiAgICBjb25zdCBFID0gW107XG4gICAgY29uc3QgZHhzID0gW107XG4gICAgY29uc3QgZHlzID0gW107XG4gICAgZm9yIChsZXQgbiA9IDA7IG4gPCB3b3JsZENvb3Jkcy5sZW5ndGg7IG4rKykge1xuICAgICAgY29uc3QgdSA9IGNvbXB1dGVTY3JlZW5Db29yZGlhdGUobW9kZWxWaWV3UHJvamVjdGlvblRyYW5zZm9ybSwgd29ybGRDb29yZHNbbl0ueCwgd29ybGRDb29yZHNbbl0ueSwgd29ybGRDb29yZHNbbl0ueik7XG4gICAgICBjb25zdCBkeCA9IHNjcmVlbkNvb3Jkc1tuXS54IC0gdS54O1xuICAgICAgY29uc3QgZHkgPSBzY3JlZW5Db29yZHNbbl0ueSAtIHUueTtcbiAgICAgIGR4cy5wdXNoKGR4KTtcbiAgICAgIGR5cy5wdXNoKGR5KTtcbiAgICAgIEUucHVzaChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgfVxuXG4gICAgbGV0IEsyOyAvLyByb2J1c3QgbW9kZSBvbmx5XG4gICAgZXJyMSA9IDAuMDtcbiAgICBpZiAoaXNSb2J1c3RNb2RlKSB7XG4gICAgICBjb25zdCBpbmxpZXJOdW0gPSBNYXRoLm1heCgzLCBNYXRoLmZsb29yKHdvcmxkQ29vcmRzLmxlbmd0aCAqIGlubGllclByb2IpIC0gMSk7XG4gICAgICBjb25zdCBFMiA9IFtdOyAvLyBmb3Igcm9idXN0IG1vZGUgb25seVxuICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCB3b3JsZENvb3Jkcy5sZW5ndGg7IG4rKykge1xuICAgICAgICBFMi5wdXNoKEVbbl0pO1xuICAgICAgfVxuICAgICAgRTIuc29ydCgoYSwgYikgPT4ge3JldHVybiBhLWI7fSk7XG5cblxuICAgICAgSzIgPSBNYXRoLm1heChFMltpbmxpZXJOdW1dICogSzJfRkFDVE9SLCAxNi4wKTtcbiAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgd29ybGRDb29yZHMubGVuZ3RoOyBuKyspIHtcbiAgICAgICAgaWYgKEUyW25dID4gSzIpIGVycjEgKz0gSzIvIDY7XG4gICAgICAgIGVsc2UgZXJyMSArPSAgSzIvNi4wICogKDEuMCAtICgxLjAtRTJbbl0vSzIpKigxLjAtRTJbbl0vSzIpKigxLjAtRTJbbl0vSzIpKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCB3b3JsZENvb3Jkcy5sZW5ndGg7IG4rKykge1xuICAgICAgICBlcnIxICs9IEVbbl07XG4gICAgICB9XG4gICAgfVxuICAgIGVycjEgLz0gd29ybGRDb29yZHMubGVuZ3RoO1xuXG4gICAgaWYgKGVycjEgPCBJQ1BfQlJFQUtfTE9PUF9FUlJPUl9USFJFU0gpIGJyZWFrO1xuICAgIGlmIChsID4gMCAmJiBlcnIxIDwgSUNQX0JSRUFLX0xPT1BfRVJST1JfVEhSRVNIMiAmJiBlcnIxL2VycjAgPiBJQ1BfQlJFQUtfTE9PUF9FUlJPUl9SQVRJT19USFJFU0gpIGJyZWFrO1xuICAgIGlmIChsID09PSBJQ1BfTUFYX0xPT1ApIGJyZWFrO1xuXG4gICAgZXJyMCA9IGVycjE7XG5cbiAgICBjb25zdCBkVSA9IFtdO1xuICAgIGNvbnN0IGFsbEpfVV9TID0gW107XG4gICAgZm9yIChsZXQgbiA9IDA7IG4gPCB3b3JsZENvb3Jkcy5sZW5ndGg7IG4rKykge1xuICAgICAgaWYgKGlzUm9idXN0TW9kZSAmJiBFW25dID4gSzIpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IEpfVV9TID0gX2dldEpfVV9TKHttb2RlbFZpZXdQcm9qZWN0aW9uVHJhbnNmb3JtLCBtb2RlbFZpZXdUcmFuc2Zvcm0sIHByb2plY3Rpb25UcmFuc2Zvcm0sIHdvcmxkQ29vcmQ6IHdvcmxkQ29vcmRzW25dfSk7XG5cbiAgICAgIGlmIChpc1JvYnVzdE1vZGUpIHtcbiAgICAgICAgY29uc3QgVyA9ICgxLjAgLSBFW25dL0syKSooMS4wIC0gRVtuXS9LMik7XG5cbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAyOyBqKyspIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xuICAgICAgICAgICAgSl9VX1Nbal1baV0gKj0gVztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZFUucHVzaChbZHhzW25dICogV10pO1xuICAgICAgICBkVS5wdXNoKFtkeXNbbl0gKiBXXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkVS5wdXNoKFtkeHNbbl1dKTtcbiAgICAgICAgZFUucHVzaChbZHlzW25dXSk7XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgSl9VX1MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYWxsSl9VX1MucHVzaChKX1VfU1tpXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZFMgPSBfZ2V0RGVsdGFTKHtkVSwgSl9VX1M6IGFsbEpfVV9TfSk7XG4gICAgaWYgKGRTID09PSBudWxsKSBicmVhaztcblxuICAgIG1vZGVsVmlld1RyYW5zZm9ybSA9IF91cGRhdGVNb2RlbFZpZXdUcmFuc2Zvcm0oe21vZGVsVmlld1RyYW5zZm9ybSwgZFN9KTtcbiAgfVxuICByZXR1cm4ge21vZGVsVmlld1RyYW5zZm9ybSwgZXJyOiBlcnIxfTtcbn1cblxuX3VwZGF0ZU1vZGVsVmlld1RyYW5zZm9ybSA9ICh7bW9kZWxWaWV3VHJhbnNmb3JtLCBkU30pID0+IHtcbiAgY29uc3QgcSA9IFtdO1xuICBsZXQgcmEgPSBkU1swXSAqIGRTWzBdICsgZFNbMV0gKiBkU1sxXSArIGRTWzJdICogZFNbMl07XG4gIGlmKCByYSA8IDAuMDAwMDAxICkge1xuICAgIHFbMF0gPSAxLjA7XG4gICAgcVsxXSA9IDAuMDtcbiAgICBxWzJdID0gMC4wO1xuICAgIHFbM10gPSAwLjA7XG4gIH0gZWxzZSB7XG4gICAgcmEgPSBNYXRoLnNxcnQocmEpO1xuICAgIHFbMF0gPSBkU1swXSAvIHJhO1xuICAgIHFbMV0gPSBkU1sxXSAvIHJhO1xuICAgIHFbMl0gPSBkU1syXSAvIHJhO1xuICAgIHFbM10gPSByYTtcbiAgfVxuICBxWzRdID0gZFNbM107XG4gIHFbNV0gPSBkU1s0XTtcbiAgcVs2XSA9IGRTWzVdO1xuXG4gIGNvbnN0IGNyYSA9IE1hdGguY29zKHFbM10pO1xuICBjb25zdCBvbmVfY3JhID0gMS4wIC0gY3JhO1xuICBjb25zdCBzcmEgPSBNYXRoLnNpbihxWzNdKTtcbiAgY29uc3QgbWF0ID0gW1tdLFtdLFtdXTtcblxuICBtYXRbMF1bMF0gPSBxWzBdKnFbMF0qb25lX2NyYSArIGNyYTtcbiAgbWF0WzBdWzFdID0gcVswXSpxWzFdKm9uZV9jcmEgLSBxWzJdKnNyYTtcbiAgbWF0WzBdWzJdID0gcVswXSpxWzJdKm9uZV9jcmEgKyBxWzFdKnNyYTtcbiAgbWF0WzBdWzNdID0gcVs0XTtcbiAgbWF0WzFdWzBdID0gcVsxXSpxWzBdKm9uZV9jcmEgKyBxWzJdKnNyYTtcbiAgbWF0WzFdWzFdID0gcVsxXSpxWzFdKm9uZV9jcmEgKyBjcmE7XG4gIG1hdFsxXVsyXSA9IHFbMV0qcVsyXSpvbmVfY3JhIC0gcVswXSpzcmE7XG4gIG1hdFsxXVszXSA9IHFbNV07XG4gIG1hdFsyXVswXSA9IHFbMl0qcVswXSpvbmVfY3JhIC0gcVsxXSpzcmE7XG4gIG1hdFsyXVsxXSA9IHFbMl0qcVsxXSpvbmVfY3JhICsgcVswXSpzcmE7XG4gIG1hdFsyXVsyXSA9IHFbMl0qcVsyXSpvbmVfY3JhICsgY3JhO1xuICBtYXRbMl1bM10gPSBxWzZdO1xuXG4gIGNvbnN0IG1hdDIgPSBbW10sW10sW11dO1xuICBmb3IgKGxldCBqID0gMDsgaiA8IDM7IGorKyApIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKyApIHtcbiAgICAgIG1hdDJbal1baV0gPSBtb2RlbFZpZXdUcmFuc2Zvcm1bal1bMF0gKiBtYXRbMF1baV1cbiAgICAgICAgICAgICAgICAgICArIG1vZGVsVmlld1RyYW5zZm9ybVtqXVsxXSAqIG1hdFsxXVtpXVxuICAgICAgICAgICAgICAgICAgICsgbW9kZWxWaWV3VHJhbnNmb3JtW2pdWzJdICogbWF0WzJdW2ldO1xuICAgIH1cbiAgICBtYXQyW2pdWzNdICs9IG1vZGVsVmlld1RyYW5zZm9ybVtqXVszXTtcbiAgfVxuICByZXR1cm4gbWF0Mjtcbn1cblxuX2dldERlbHRhUyA9ICh7ZFUsIEpfVV9TfSkgPT4ge1xuICBjb25zdCBKID0gbmV3IE1hdHJpeChKX1VfUyk7XG4gIGNvbnN0IFUgPSBuZXcgTWF0cml4KGRVKTtcblxuICBjb25zdCBKVCA9IEoudHJhbnNwb3NlKCk7XG4gIGNvbnN0IEpUSiA9IEpULm1tdWwoSik7XG4gIGNvbnN0IEpUVSA9IEpULm1tdWwoVSk7XG5cbiAgbGV0IEpUSkludjtcbiAgdHJ5IHtcbiAgICBKVEpJbnYgPSBpbnZlcnNlKEpUSik7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IFMgPSBKVEpJbnYubW11bChKVFUpO1xuICByZXR1cm4gUy50bzFEQXJyYXkoKTtcbn1cblxuX2dldEpfVV9TID0gKHttb2RlbFZpZXdQcm9qZWN0aW9uVHJhbnNmb3JtLCBtb2RlbFZpZXdUcmFuc2Zvcm0sIHByb2plY3Rpb25UcmFuc2Zvcm0sIHdvcmxkQ29vcmR9KSA9PiB7XG4gIGNvbnN0IFQgPSBtb2RlbFZpZXdUcmFuc2Zvcm07XG4gIGNvbnN0IHt4LCB5LCB6fSA9IHdvcmxkQ29vcmQ7XG5cbiAgY29uc3QgdSA9IGFwcGx5TW9kZWxWaWV3UHJvamVjdGlvblRyYW5zZm9ybShtb2RlbFZpZXdQcm9qZWN0aW9uVHJhbnNmb3JtLCB4LCB5LCB6KTtcblxuICBjb25zdCB6MiA9IHUueiAqIHUuejtcbiAgY29uc3QgSl9VX1hjID0gW1tdLFtdXTtcbiAgSl9VX1hjWzBdWzBdID0gKHByb2plY3Rpb25UcmFuc2Zvcm1bMF1bMF0gKiB1LnogLSBwcm9qZWN0aW9uVHJhbnNmb3JtWzJdWzBdICogdS54KSAvIHoyO1xuICBKX1VfWGNbMF1bMV0gPSAocHJvamVjdGlvblRyYW5zZm9ybVswXVsxXSAqIHUueiAtIHByb2plY3Rpb25UcmFuc2Zvcm1bMl1bMV0gKiB1LngpIC8gejI7XG4gIEpfVV9YY1swXVsyXSA9IChwcm9qZWN0aW9uVHJhbnNmb3JtWzBdWzJdICogdS56IC0gcHJvamVjdGlvblRyYW5zZm9ybVsyXVsyXSAqIHUueCkgLyB6MjtcbiAgSl9VX1hjWzFdWzBdID0gKHByb2plY3Rpb25UcmFuc2Zvcm1bMV1bMF0gKiB1LnogLSBwcm9qZWN0aW9uVHJhbnNmb3JtWzJdWzBdICogdS55KSAvIHoyO1xuICBKX1VfWGNbMV1bMV0gPSAocHJvamVjdGlvblRyYW5zZm9ybVsxXVsxXSAqIHUueiAtIHByb2plY3Rpb25UcmFuc2Zvcm1bMl1bMV0gKiB1LnkpIC8gejI7XG4gIEpfVV9YY1sxXVsyXSA9IChwcm9qZWN0aW9uVHJhbnNmb3JtWzFdWzJdICogdS56IC0gcHJvamVjdGlvblRyYW5zZm9ybVsyXVsyXSAqIHUueSkgLyB6MjtcblxuICBjb25zdCBKX1hjX1MgPSBbXG4gICAgW1RbMF1bMl0gKiB5IC0gVFswXVsxXSAqIHosIFRbMF1bMF0gKiB6IC0gVFswXVsyXSAqIHgsIFRbMF1bMV0gKiB4IC0gVFswXVswXSAqIHksIFRbMF1bMF0sIFRbMF1bMV0sIFRbMF1bMl1dLFxuICAgIFtUWzFdWzJdICogeSAtIFRbMV1bMV0gKiB6LCBUWzFdWzBdICogeiAtIFRbMV1bMl0gKiB4LCBUWzFdWzFdICogeCAtIFRbMV1bMF0gKiB5LCBUWzFdWzBdLCBUWzFdWzFdLCBUWzFdWzJdXSxcbiAgICBbVFsyXVsyXSAqIHkgLSBUWzJdWzFdICogeiwgVFsyXVswXSAqIHogLSBUWzJdWzJdICogeCwgVFsyXVsxXSAqIHggLSBUWzJdWzBdICogeSwgVFsyXVswXSwgVFsyXVsxXSwgVFsyXVsyXV0sXG4gIF07XG5cbiAgY29uc3QgSl9VX1MgPSBbW10sIFtdXTtcbiAgZm9yIChsZXQgaiA9IDA7IGogPCAyOyBqKyspIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xuICAgICAgSl9VX1Nbal1baV0gPSAwLjA7XG4gICAgICBmb3IgKGxldCBrID0gMDsgayA8IDM7IGsrKyApIHtcbiAgICAgICAgSl9VX1Nbal1baV0gKz0gSl9VX1hjW2pdW2tdICogSl9YY19TW2tdW2ldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gSl9VX1M7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICByZWZpbmVIb21vZ3JhcGh5XG59XG4iLCJjb25zdCBidWlsZE1vZGVsVmlld1Byb2plY3Rpb25UcmFuc2Zvcm0gPSAocHJvamVjdGlvblRyYW5zZm9ybSwgbW9kZWxWaWV3VHJhbnNmb3JtKSA9PiB7XG4gIGNvbnN0IG1vZGVsVmlld1Byb2plY3Rpb25UcmFuc2Zvcm0gPSBbW10sW10sW11dO1xuICBmb3IgKGxldCBqID0gMDsgaiA8IDM7IGorKyApIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgbW9kZWxWaWV3UHJvamVjdGlvblRyYW5zZm9ybVtqXVtpXSA9IHByb2plY3Rpb25UcmFuc2Zvcm1bal1bMF0gKiBtb2RlbFZpZXdUcmFuc2Zvcm1bMF1baV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBwcm9qZWN0aW9uVHJhbnNmb3JtW2pdWzFdICogbW9kZWxWaWV3VHJhbnNmb3JtWzFdW2ldXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgcHJvamVjdGlvblRyYW5zZm9ybVtqXVsyXSAqIG1vZGVsVmlld1RyYW5zZm9ybVsyXVtpXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG1vZGVsVmlld1Byb2plY3Rpb25UcmFuc2Zvcm07XG59XG5cbmNvbnN0IGFwcGx5TW9kZWxWaWV3UHJvamVjdGlvblRyYW5zZm9ybSA9IChtb2RlbFZpZXdQcm9qZWN0aW9uVHJhbnNmb3JtLCB4LCB5LCB6KSA9PiB7XG4gIGNvbnN0IHV4ID0gbW9kZWxWaWV3UHJvamVjdGlvblRyYW5zZm9ybVswXVswXSAqIHggKyBtb2RlbFZpZXdQcm9qZWN0aW9uVHJhbnNmb3JtWzBdWzFdICogeVxuICAgICArIG1vZGVsVmlld1Byb2plY3Rpb25UcmFuc2Zvcm1bMF1bMl0gKiB6ICsgbW9kZWxWaWV3UHJvamVjdGlvblRyYW5zZm9ybVswXVszXTtcbiAgY29uc3QgdXkgPSBtb2RlbFZpZXdQcm9qZWN0aW9uVHJhbnNmb3JtWzFdWzBdICogeCArIG1vZGVsVmlld1Byb2plY3Rpb25UcmFuc2Zvcm1bMV1bMV0gKiB5XG4gICAgICsgbW9kZWxWaWV3UHJvamVjdGlvblRyYW5zZm9ybVsxXVsyXSAqIHogKyBtb2RlbFZpZXdQcm9qZWN0aW9uVHJhbnNmb3JtWzFdWzNdO1xuICBjb25zdCB1eiAgPSBtb2RlbFZpZXdQcm9qZWN0aW9uVHJhbnNmb3JtWzJdWzBdICogeCArIG1vZGVsVmlld1Byb2plY3Rpb25UcmFuc2Zvcm1bMl1bMV0gKiB5XG4gICAgICsgbW9kZWxWaWV3UHJvamVjdGlvblRyYW5zZm9ybVsyXVsyXSAqIHogKyBtb2RlbFZpZXdQcm9qZWN0aW9uVHJhbnNmb3JtWzJdWzNdO1xuICByZXR1cm4ge3g6IHV4LCB5OiB1eSwgejogdXp9O1xufVxuXG5jb25zdCBjb21wdXRlU2NyZWVuQ29vcmRpYXRlID0gKG1vZGVsVmlld1Byb2plY3Rpb25UcmFuc2Zvcm0sIHgsIHksIHopID0+IHtcbiAgY29uc3Qge3g6IHV4LCB5OiB1eSwgejogdXp9ID0gYXBwbHlNb2RlbFZpZXdQcm9qZWN0aW9uVHJhbnNmb3JtKG1vZGVsVmlld1Byb2plY3Rpb25UcmFuc2Zvcm0sIHgsIHksIHopO1xuICBpZiggTWF0aC5hYnModXopIDwgMC4wMDAwMDEgKSByZXR1cm4gbnVsbDtcbiAgcmV0dXJuIHt4OiB1eC91eiwgeTogdXkvdXp9O1xufVxuXG5jb25zdCBzY3JlZW5Ub01hcmtlckNvb3JkaW5hdGUgPSAobW9kZWxWaWV3UHJvamVjdGlvblRyYW5zZm9ybSwgc3gsIHN5KSA9PiB7XG4gIGNvbnN0IGMxMSA9IG1vZGVsVmlld1Byb2plY3Rpb25UcmFuc2Zvcm1bMl1bMF0gKiBzeCAtIG1vZGVsVmlld1Byb2plY3Rpb25UcmFuc2Zvcm1bMF1bMF07XG4gIGNvbnN0IGMxMiA9IG1vZGVsVmlld1Byb2plY3Rpb25UcmFuc2Zvcm1bMl1bMV0gKiBzeCAtIG1vZGVsVmlld1Byb2plY3Rpb25UcmFuc2Zvcm1bMF1bMV07XG4gIGNvbnN0IGMyMSA9IG1vZGVsVmlld1Byb2plY3Rpb25UcmFuc2Zvcm1bMl1bMF0gKiBzeSAtIG1vZGVsVmlld1Byb2plY3Rpb25UcmFuc2Zvcm1bMV1bMF07XG4gIGNvbnN0IGMyMiA9IG1vZGVsVmlld1Byb2plY3Rpb25UcmFuc2Zvcm1bMl1bMV0gKiBzeSAtIG1vZGVsVmlld1Byb2plY3Rpb25UcmFuc2Zvcm1bMV1bMV07XG4gIGNvbnN0IGIxICA9IG1vZGVsVmlld1Byb2plY3Rpb25UcmFuc2Zvcm1bMF1bM10gLSBtb2RlbFZpZXdQcm9qZWN0aW9uVHJhbnNmb3JtWzJdWzNdICogc3g7XG4gIGNvbnN0IGIyICA9IG1vZGVsVmlld1Byb2plY3Rpb25UcmFuc2Zvcm1bMV1bM10gLSBtb2RlbFZpZXdQcm9qZWN0aW9uVHJhbnNmb3JtWzJdWzNdICogc3k7XG5cbiAgY29uc3QgbSA9IGMxMSAqIGMyMiAtIGMxMiAqIGMyMTtcbiAgcmV0dXJuIHtcbiAgICB4OiAoYzIyICogYjEgLSBjMTIgKiBiMikgLyBtLFxuICAgIHk6IChjMTEgKiBiMiAtIGMyMSAqIGIxKSAvIG1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2NyZWVuVG9NYXJrZXJDb29yZGluYXRlLFxuICBidWlsZE1vZGVsVmlld1Byb2plY3Rpb25UcmFuc2Zvcm0sXG4gIGFwcGx5TW9kZWxWaWV3UHJvamVjdGlvblRyYW5zZm9ybSxcbiAgY29tcHV0ZVNjcmVlbkNvb3JkaWF0ZVxufVxuIiwiLy8gRmFzdCBjb21wdXRhdGlvbiBvbiBudW1iZXIgb2YgYml0IHNldHNcbi8vIFJlZjogaHR0cHM6Ly9ncmFwaGljcy5zdGFuZm9yZC5lZHUvfnNlYW5kZXIvYml0aGFja3MuaHRtbCNDb3VudEJpdHNTZXRQYXJhbGxlbFxuY29uc3QgY29tcHV0ZSA9IChvcHRpb25zKSA9PiB7XG4gIGNvbnN0IHt2MSwgdjJ9ID0gb3B0aW9ucztcbiAgbGV0IGQgPSAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHYxLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IHggPSAodjFbaV0gXiB2MltpXSkgPj4+IDA7XG4gICAgZCArPSBiaXRDb3VudCh4KTtcbiAgfVxuICByZXR1cm4gZDtcbn1cblxuY29uc3QgYml0Q291bnQgPSAodikgPT4ge1xuICB2YXIgYyA9IHYgLSAoKHYgPj4gMSkgJiAweDU1NTU1NTU1KTtcbiAgYyA9ICgoYyA+PiAyKSAmIDB4MzMzMzMzMzMpICsgKGMgJiAweDMzMzMzMzMzKTtcbiAgYyA9ICgoYyA+PiA0KSArIGMpICYgMHgwRjBGMEYwRjtcbiAgYyA9ICgoYyA+PiA4KSArIGMpICYgMHgwMEZGMDBGRjtcbiAgYyA9ICgoYyA+PiAxNikgKyBjKSAmIDB4MDAwMEZGRkY7XG4gIHJldHVybiBjO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY29tcHV0ZVxufTtcbiIsImNvbnN0IHtjcmVhdGVSYW5kb21pemVyfSA9IHJlcXVpcmUoJy4uL3V0aWxzL3JhbmRvbWl6ZXIuanMnKTtcbmNvbnN0IHtxdWFkcmlsYXRlcmFsQ29udmV4LCBtYXRyaXhJbnZlcnNlMzMsIHNtYWxsZXN0VHJpYW5nbGVBcmVhLCBtdWx0aXBseVBvaW50SG9tb2dyYXBoeUluaG9tb2dlbm91cywgY2hlY2tUaHJlZVBvaW50c0NvbnNpc3RlbnQsIGNoZWNrRm91clBvaW50c0NvbnNpc3RlbnQsIGRldGVybWluYW50fSA9IHJlcXVpcmUoJy4uL3V0aWxzL2dlb21ldHJ5LmpzJyk7XG5cbmNvbnN0IEVQU0lMT04gPSAwLjAwMDAwMDAwMDAwMDE7XG5jb25zdCBTUVJUMiA9IDEuNDE0MjEzNTYyMzczMDk1MDQ4ODA7XG5jb25zdCBIT01PR1JBUEhZX0RFRkFVTFRfQ0FVQ0hZX1NDQUxFID0gMC4wMTtcbmNvbnN0IEhPTU9HUkFQSFlfREVGQVVMVF9OVU1fSFlQT1RIRVNFUyA9IDEwMjQ7XG5jb25zdCBIT01PR1JBUEhZX0RFRkFVTFRfTUFYX1RSSUFMUyA9IDEwNjQ7XG5jb25zdCBIT01PR1JBUEhZX0RFRkFVTFRfQ0hVTktfU0laRSA9IDUwO1xuXG4vLyB0ZXN0UG9pbnRzIGlzIGZvdXIgY29ybmVycyBvZiBrZXlmcmFtZVxuY29uc3QgY29tcHV0ZUhvbW9ncmFwaHkgPSAob3B0aW9ucykgPT4ge1xuICBjb25zdCB7c3JjUG9pbnRzLCBkc3RQb2ludHMsIGtleWZyYW1lfSA9IG9wdGlvbnM7XG5cbiAgY29uc3QgdGVzdFBvaW50cyA9IFtcbiAgICBbMCwgMF0sXG4gICAgW2tleWZyYW1lLndpZHRoLCAwXSxcbiAgICBba2V5ZnJhbWUud2lkdGgsIGtleWZyYW1lLmhlaWdodF0sXG4gICAgWzAsIGtleWZyYW1lLmhlaWdodF1cbiAgXVxuXG4gIGNvbnN0IHNhbXBsZVNpemUgPSA0OyAvLyB1c2UgZm91ciBwb2ludHMgdG8gY29tcHV0ZSBob21vZ3JhcGh5XG4gIGlmIChzcmNQb2ludHMubGVuZ3RoIDwgc2FtcGxlU2l6ZSkgcmV0dXJuIG51bGw7XG5cbiAgY29uc3Qgc2NhbGUgPSBIT01PR1JBUEhZX0RFRkFVTFRfQ0FVQ0hZX1NDQUxFO1xuICBjb25zdCBvbmVPdmVyU2NhbGUyID0gMS4wIC8gKHNjYWxlICogc2NhbGUpO1xuICBjb25zdCBjaHVja1NpemUgPSBNYXRoLm1pbihIT01PR1JBUEhZX0RFRkFVTFRfQ0hVTktfU0laRSwgc3JjUG9pbnRzLmxlbmd0aCk7XG5cbiAgY29uc3QgcmFuZG9taXplciA9IGNyZWF0ZVJhbmRvbWl6ZXIoKTtcblxuICBjb25zdCBwZXJtID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3JjUG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgcGVybVtpXSA9IGk7XG4gIH1cblxuICByYW5kb21pemVyLmFycmF5U2h1ZmZsZSh7YXJyOiBwZXJtLCBzYW1wbGVTaXplOiBwZXJtLmxlbmd0aH0pO1xuXG4gIC8vIGJ1aWxkIG51bWVyb3VzIGh5cG90aGVzZXMgYnkgcmFuZG9taW5nIGRyYXcgZm91ciBwb2ludHNcbiAgLy8gVE9ETzogb3B0aW1pemU6IGlmIG51bWJlciBvZiBwb2ludHMgaXMgbGVzcyB0aGFuIGNlcnRhaW4gbnVtYmVyLCBjYW4gYnJ1dGUgZm9yY2UgYWxsIGNvbWJpbmF0aW9uc1xuICBsZXQgdHJpYWwgPSAwO1xuICBjb25zdCBIcyA9IFtdO1xuICB3aGlsZSAodHJpYWwgPCBIT01PR1JBUEhZX0RFRkFVTFRfTUFYX1RSSUFMUyAmJiBIcy5sZW5ndGggPCBIT01PR1JBUEhZX0RFRkFVTFRfTlVNX0hZUE9USEVTRVMpIHtcblxuICAgIHJhbmRvbWl6ZXIuYXJyYXlTaHVmZmxlKHthcnI6IHBlcm0sIHNhbXBsZVNpemU6IHNhbXBsZVNpemV9KTtcblxuICAgIHRyaWFsICs9MTtcblxuICAgIGlmICghY2hlY2tGb3VyUG9pbnRzQ29uc2lzdGVudChcbiAgICAgIHNyY1BvaW50c1twZXJtWzBdXSwgc3JjUG9pbnRzW3Blcm1bMV1dLCBzcmNQb2ludHNbcGVybVsyXV0sIHNyY1BvaW50c1twZXJtWzNdXSxcbiAgICAgIGRzdFBvaW50c1twZXJtWzBdXSwgZHN0UG9pbnRzW3Blcm1bMV1dLCBkc3RQb2ludHNbcGVybVsyXV0sIGRzdFBvaW50c1twZXJtWzNdXSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGNvbnN0IEggPSBfc29sdmVIb21vZ3JhcGh5Rm91clBvaW50cyh7XG4gICAgICBzcmNQb2ludHM6IFtzcmNQb2ludHNbcGVybVswXV0sIHNyY1BvaW50c1twZXJtWzFdXSwgc3JjUG9pbnRzW3Blcm1bMl1dLCBzcmNQb2ludHNbcGVybVszXV1dLFxuICAgICAgZHN0UG9pbnRzOiBbZHN0UG9pbnRzW3Blcm1bMF1dLCBkc3RQb2ludHNbcGVybVsxXV0sIGRzdFBvaW50c1twZXJtWzJdXSwgZHN0UG9pbnRzW3Blcm1bM11dXSxcbiAgICB9KTtcblxuICAgIGlmIChIID09PSBudWxsKSBjb250aW51ZTtcblxuICAgIGlmKCFfY2hlY2tIb21vZ3JhcGh5UG9pbnRzR2VvbWV0cmljYWxseUNvbnNpc3RlbnQoe0gsIHRlc3RQb2ludHN9KSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgSHMucHVzaChIKTtcbiAgfVxuXG4gIGlmIChIcy5sZW5ndGggPT09IDApIHJldHVybiBudWxsO1xuXG4gIC8vIHBpY2sgdGhlIGJlc3QgaHlwb3RoZXNpc1xuICBjb25zdCBoeXBvdGhlc2VzID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgSHMubGVuZ3RoOyBpKyspIHtcbiAgICBoeXBvdGhlc2VzLnB1c2goe1xuICAgICAgSDogSHNbaV0sXG4gICAgICBjb3N0OiAwXG4gICAgfSlcbiAgfVxuXG4gIGxldCBjdXJDaHVja1NpemUgPSBjaHVja1NpemU7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3JjUG9pbnRzLmxlbmd0aCAmJiBoeXBvdGhlc2VzLmxlbmd0aCA+IDI7IGkgKz0gY3VyQ2h1Y2tTaXplKSB7XG4gICAgY3VyQ2h1Y2tTaXplID0gTWF0aC5taW4oY2h1Y2tTaXplLCBzcmNQb2ludHMubGVuZ3RoIC0gaSk7XG4gICAgbGV0IGNodWNrRW5kID0gaSArIGN1ckNodWNrU2l6ZTtcblxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgaHlwb3RoZXNlcy5sZW5ndGg7IGorKykge1xuICAgICAgZm9yIChsZXQgayA9IGk7IGsgPCBjaHVja0VuZDsgaysrKSB7XG4gICAgICAgIGNvbnN0IGNvc3QgPSBfY2F1Y2h5UHJvamVjdGl2ZVJlcHJvamVjdGlvbkNvc3Qoe0g6IGh5cG90aGVzZXNbal0uSCwgc3JjUG9pbnQ6IHNyY1BvaW50c1trXSwgZHN0UG9pbnQ6IGRzdFBvaW50c1trXSwgb25lT3ZlclNjYWxlMn0pO1xuICAgICAgICBoeXBvdGhlc2VzW2pdLmNvc3QgKz0gY29zdDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBoeXBvdGhlc2VzLnNvcnQoKGgxLCBoMikgPT4ge3JldHVybiBoMS5jb3N0IC0gaDIuY29zdH0pO1xuICAgIGh5cG90aGVzZXMuc3BsaWNlKC1NYXRoLmZsb29yKChoeXBvdGhlc2VzLmxlbmd0aCsxKS8yKSk7IC8vIGtlZXAgdGhlIGJlc3QgaGFsZlxuICB9XG5cbiAgbGV0IGJlc3RJbmRleCA9IDA7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgaHlwb3RoZXNlcy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChoeXBvdGhlc2VzW2ldLmNvc3QgPCBoeXBvdGhlc2VzW2Jlc3RJbmRleF0uY29zdCkgYmVzdEluZGV4ID0gaTtcbiAgfVxuXG4gIGNvbnN0IGZpbmFsSCA9IF9ub3JtYWxpemVIb21vZ3JhcGh5KHtpbkg6IGh5cG90aGVzZXNbYmVzdEluZGV4XS5IfSk7XG5cbiAgaWYgKCFfY2hlY2tIZXVyaXN0aWNzKHtIOiBmaW5hbEgsIHRlc3RQb2ludHMsIGtleWZyYW1lfSkpIHJldHVybiBudWxsO1xuICByZXR1cm4gZmluYWxIO1xufVxuXG5jb25zdCBfY2hlY2tIZXVyaXN0aWNzID0gKHtILCB0ZXN0UG9pbnRzLCBrZXlmcmFtZX0pID0+IHtcbiAgY29uc3QgSEludiA9IG1hdHJpeEludmVyc2UzMyhILCAwLjAwMDAxKTtcbiAgLy8gY29uc29sZS5sb2coXCJmaW5hbCBIIEludjogXCIsIEhJbnYpO1xuICBpZiAoSEludiA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gIGNvbnN0IG1wID0gW11cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXN0UG9pbnRzLmxlbmd0aDsgaSsrKSB7IC8vIDQgdGVzdCBwb2ludHMsIGNvcm5lciBvZiBrZXlmcmFtZVxuICAgIG1wLnB1c2gobXVsdGlwbHlQb2ludEhvbW9ncmFwaHlJbmhvbW9nZW5vdXModGVzdFBvaW50c1tpXSwgSEludikpO1xuICB9XG4gIGNvbnN0IHNtYWxsQXJlYSA9IHNtYWxsZXN0VHJpYW5nbGVBcmVhKG1wWzBdLCBtcFsxXSwgbXBbMl0sIG1wWzNdKTtcblxuICBpZiAoc21hbGxBcmVhIDwga2V5ZnJhbWUud2lkdGggKiBrZXlmcmFtZS5oZWlnaHQgKiAwLjAwMDEpIHJldHVybiBmYWxzZTtcblxuICBpZiAoIXF1YWRyaWxhdGVyYWxDb252ZXgobXBbMF0sIG1wWzFdLCBtcFsyXSwgbXBbM10pKSByZXR1cm4gZmFsc2U7XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmNvbnN0IF9ub3JtYWxpemVIb21vZ3JhcGh5ID0gKHtpbkh9KSA9PiB7XG4gIGNvbnN0IG9uZU92ZXIgPSAxLjAgLyBpbkhbOF07XG5cbiAgY29uc3QgSCA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgIEhbaV0gPSBpbkhbaV0gKiBvbmVPdmVyO1xuICB9XG4gIEhbOF0gPSAxLjA7XG4gIHJldHVybiBIO1xufVxuXG5jb25zdCBfY2F1Y2h5UHJvamVjdGl2ZVJlcHJvamVjdGlvbkNvc3QgPSAoe0gsIHNyY1BvaW50LCBkc3RQb2ludCwgb25lT3ZlclNjYWxlMn0pID0+IHtcbiAgY29uc3QgeCA9IG11bHRpcGx5UG9pbnRIb21vZ3JhcGh5SW5ob21vZ2Vub3VzKHNyY1BvaW50LCBIKTtcbiAgY29uc3QgZiA9W1xuICAgIHhbMF0gLSBkc3RQb2ludFswXSxcbiAgICB4WzFdIC0gZHN0UG9pbnRbMV1cbiAgXTtcbiAgcmV0dXJuIE1hdGgubG9nKDEgKyAoZlswXSpmWzBdK2ZbMV0qZlsxXSkgKiBvbmVPdmVyU2NhbGUyKTtcbn1cblxuY29uc3QgX2NoZWNrSG9tb2dyYXBoeVBvaW50c0dlb21ldHJpY2FsbHlDb25zaXN0ZW50ID0gKHtILCB0ZXN0UG9pbnRzfSkgPT4ge1xuICBjb25zdCBtYXBwZWRQb2ludHMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXN0UG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgbWFwcGVkUG9pbnRzW2ldID0gbXVsdGlwbHlQb2ludEhvbW9ncmFwaHlJbmhvbW9nZW5vdXModGVzdFBvaW50c1tpXSwgSCk7XG4gICAgLy9jb25zb2xlLmxvZyhcIm1hcFwiLCB0ZXN0UG9pbnRzW2ldLCBtYXBwZWRQb2ludHNbaV0sIEgpO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGVzdFBvaW50cy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGkxID0gaTtcbiAgICBjb25zdCBpMiA9IChpKzEpICUgdGVzdFBvaW50cy5sZW5ndGg7XG4gICAgY29uc3QgaTMgPSAoaSsyKSAlIHRlc3RQb2ludHMubGVuZ3RoO1xuICAgIGlmICghY2hlY2tUaHJlZVBvaW50c0NvbnNpc3RlbnQoXG4gICAgICB0ZXN0UG9pbnRzW2kxXSwgdGVzdFBvaW50c1tpMl0sIHRlc3RQb2ludHNbaTNdLFxuICAgICAgbWFwcGVkUG9pbnRzW2kxXSwgbWFwcGVkUG9pbnRzW2kyXSwgbWFwcGVkUG9pbnRzW2kzXSkpIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLy8gQ29uZGl0aW9uIGZvdXIgMkQgcG9pbnRzIHN1Y2ggdGhhdCB0aGUgbWVhbiBpcyB6ZXJvIGFuZCB0aGUgc3RhbmRhcmQgZGV2aWF0aW9uIGlzIHNxcnQoMikuXG5jb25zdCBfY29uZGl0aW9uNFBvaW50czJkID0gKHt4MSwgeDIsIHgzLCB4NH0pID0+IHtcbiAgY29uc3QgbXUgPSBbXTtcbiAgY29uc3QgZDEgPSBbXTtcbiAgY29uc3QgZDIgPSBbXTtcbiAgY29uc3QgZDMgPSBbXTtcbiAgY29uc3QgZDQgPSBbXTtcblxuICBtdVswXSA9ICh4MVswXSt4MlswXSt4M1swXSt4NFswXSkvNDtcbiAgbXVbMV0gPSAoeDFbMV0reDJbMV0reDNbMV0reDRbMV0pLzQ7XG5cbiAgZDFbMF0gPSB4MVswXS1tdVswXTtcbiAgZDFbMV0gPSB4MVsxXS1tdVsxXTtcbiAgZDJbMF0gPSB4MlswXS1tdVswXTtcbiAgZDJbMV0gPSB4MlsxXS1tdVsxXTtcbiAgZDNbMF0gPSB4M1swXS1tdVswXTtcbiAgZDNbMV0gPSB4M1sxXS1tdVsxXTtcbiAgZDRbMF0gPSB4NFswXS1tdVswXTtcbiAgZDRbMV0gPSB4NFsxXS1tdVsxXTtcblxuICBjb25zdCBkczEgPSBNYXRoLnNxcnQoZDFbMF0qZDFbMF0rZDFbMV0qZDFbMV0pO1xuICBjb25zdCBkczIgPSBNYXRoLnNxcnQoZDJbMF0qZDJbMF0rZDJbMV0qZDJbMV0pO1xuICBjb25zdCBkczMgPSBNYXRoLnNxcnQoZDNbMF0qZDNbMF0rZDNbMV0qZDNbMV0pO1xuICBjb25zdCBkczQgPSBNYXRoLnNxcnQoZDRbMF0qZDRbMF0rZDRbMV0qZDRbMV0pO1xuICBjb25zdCBkID0gKGRzMStkczIrZHMzK2RzNCkvNDtcblxuICBpZiAoZCA9PSAwKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBzID0gKDEuMC9kKSpTUVJUMjtcblxuICBjb25zdCB4cDEgPSBbXTtcbiAgY29uc3QgeHAyID0gW107XG4gIGNvbnN0IHhwMyA9IFtdO1xuICBjb25zdCB4cDQgPSBbXTtcblxuICB4cDFbMF0gPSBkMVswXSpzO1xuICB4cDFbMV0gPSBkMVsxXSpzO1xuICB4cDJbMF0gPSBkMlswXSpzO1xuICB4cDJbMV0gPSBkMlsxXSpzO1xuICB4cDNbMF0gPSBkM1swXSpzO1xuICB4cDNbMV0gPSBkM1sxXSpzO1xuICB4cDRbMF0gPSBkNFswXSpzO1xuICB4cDRbMV0gPSBkNFsxXSpzO1xuXG4gIHJldHVybiB7eHAxLCB4cDIsIHhwMywgeHA0LCBzLCB0OiBtdX07XG59XG5cbmNvbnN0IF9zb2x2ZUhvbW9ncmFwaHlGb3VyUG9pbnRzID0gKHtzcmNQb2ludHMsIGRzdFBvaW50c30pID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5ERUJVR19NQVRDSCkge1xuICAgIHdpbmRvdy5kZWJ1Zy5ob21vZ3JhcGh5SW5kZXggKz0gMTtcbiAgICBjb25zdCBkSG9tb2dyYXBoeSA9IHdpbmRvdy5kZWJ1Z01hdGNoLnF1ZXJ5a2V5ZnJhbWVzW3dpbmRvdy5kZWJ1Zy5xdWVyeWtleWZyYW1lSW5kZXhdLmhvbW9ncmFwaHlbd2luZG93LmRlYnVnLmhvbW9ncmFwaHlJbmRleF07XG4gICAgY29uc3Qge3gxLCB4MiwgeDMsIHg0LCB4cDEsIHhwMiwgeHAzLCB4cDR9ID0gZEhvbW9ncmFwaHk7XG4gICAgY29uc3QgbDEgPSBbc3JjUG9pbnRzWzBdLHNyY1BvaW50c1sxXSxzcmNQb2ludHNbMl0sc3JjUG9pbnRzWzNdLGRzdFBvaW50c1swXSxkc3RQb2ludHNbMV0sZHN0UG9pbnRzWzJdLGRzdFBvaW50c1szXV07XG4gICAgY29uc3QgbDIgPSBbeDEsIHgyLCB4MywgeDQsIHhwMSwgeHAyLCB4cDMsIHhwNF07XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsMS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKCF3aW5kb3cuY21wKGwxW2ldWzBdLCBsMltpXVswXSkgfHwgIXdpbmRvdy5jbXAobDFbaV1bMV0sIGwyW2ldWzFdKSkge1xuICAgICAgICBjb25zb2xlLmxvZygnSU5DT1JSRUNUIGhvbW9ncmFwaHkgcG9pbnRzJywgd2luZG93LmRlYnVnLmhvbW9ncmFwaHlJbmRleCwgaSwgbDFbaV0sIGwyW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdCByZXMxID0gX2NvbmRpdGlvbjRQb2ludHMyZCh7eDE6IHNyY1BvaW50c1swXSwgeDI6IHNyY1BvaW50c1sxXSwgeDM6IHNyY1BvaW50c1syXSwgeDQ6IHNyY1BvaW50c1szXX0pO1xuXG4gIGlmIChyZXMxID09PSBudWxsKSByZXR1cm4gbnVsbDtcblxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LkRFQlVHX01BVENIKSB7XG4gICAgY29uc3QgZEhvbW9ncmFwaHkgPSB3aW5kb3cuZGVidWdNYXRjaC5xdWVyeWtleWZyYW1lc1t3aW5kb3cuZGVidWcucXVlcnlrZXlmcmFtZUluZGV4XS5ob21vZ3JhcGh5W3dpbmRvdy5kZWJ1Zy5ob21vZ3JhcGh5SW5kZXhdO1xuICAgIGNvbnN0IHt4MXAsIHgycCwgeDNwLCB4NHAsIHQsIHN9ID0gZEhvbW9ncmFwaHk7XG4gICAgY29uc3QgbDEgPSBbcmVzMS54cDEsIHJlczEueHAyLCByZXMxLnhwMywgcmVzMS54cDQsIHJlczEudF07XG4gICAgY29uc3QgbDIgPSBbeDFwLCB4MnAsIHgzcCwgeDRwLCB0XTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGwxLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoIXdpbmRvdy5jbXAobDFbaV1bMF0sIGwyW2ldWzBdKSB8fCAhd2luZG93LmNtcChsMVtpXVsxXSwgbDJbaV1bMV0pKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdJTkNPUlJFQ1QgaG9tb2dyYXBoeSByZXMxJywgd2luZG93LmRlYnVnLmhvbW9ncmFwaHlJbmRleCwgaSwgbDFbaV0sIGwyW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCF3aW5kb3cuY21wKHJlczEucywgcykpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdJTkNPUlJFQ1QgaG9tb2dyYXBoeSByZXMxIFMnLCB3aW5kb3cuZGVidWcuaG9tb2dyYXBoeUluZGV4LCByZXMxLnMsIHMpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHJlczIgPSBfY29uZGl0aW9uNFBvaW50czJkKHt4MTogZHN0UG9pbnRzWzBdLCB4MjogZHN0UG9pbnRzWzFdLCB4MzogZHN0UG9pbnRzWzJdLCB4NDogZHN0UG9pbnRzWzNdfSk7XG4gIGlmIChyZXMyID09PSBudWxsKSByZXR1cm4gbnVsbDtcblxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LkRFQlVHX01BVENIKSB7XG4gICAgY29uc3QgZEhvbW9ncmFwaHkgPSB3aW5kb3cuZGVidWdNYXRjaC5xdWVyeWtleWZyYW1lc1t3aW5kb3cuZGVidWcucXVlcnlrZXlmcmFtZUluZGV4XS5ob21vZ3JhcGh5W3dpbmRvdy5kZWJ1Zy5ob21vZ3JhcGh5SW5kZXhdO1xuICAgIGNvbnN0IHt4cDFwLCB4cDJwLCB4cDNwLCB4cDRwLCB0cCwgc3B9ID0gZEhvbW9ncmFwaHk7XG4gICAgY29uc3QgbDEgPSBbcmVzMi54cDEsIHJlczIueHAyLCByZXMyLnhwMywgcmVzMi54cDQsIHJlczIudF07XG4gICAgY29uc3QgbDIgPSBbeHAxcCwgeHAycCwgeHAzcCwgeHA0cCwgdHBdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbDEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICghd2luZG93LmNtcChsMVtpXVswXSwgbDJbaV1bMF0pIHx8ICF3aW5kb3cuY21wKGwxW2ldWzFdLCBsMltpXVsxXSkpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0lOQ09SUkVDVCBob21vZ3JhcGh5IHJlczEnLCB3aW5kb3cuZGVidWcuaG9tb2dyYXBoeUluZGV4LCBpLCBsMVtpXSwgbDJbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXdpbmRvdy5jbXAocmVzMi5zLCBzcCkpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdJTkNPUlJFQ1QgaG9tb2dyYXBoeSByZXMxIFMnLCB3aW5kb3cuZGVidWcuaG9tb2dyYXBoeUluZGV4LCBpLCByZXMyLnMsIHNwKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBIbiA9IF9zb2x2ZUhvbW9ncmFwaHk0UG9pbnRzSW5ob21vZ2Vub3VzKHtcbiAgICB4MTogcmVzMS54cDEsIHgyOiByZXMxLnhwMiwgeDM6IHJlczEueHAzLCB4NDogcmVzMS54cDQsXG4gICAgeHAxOiByZXMyLnhwMSwgeHAyOiByZXMyLnhwMiwgeHAzOiByZXMyLnhwMywgeHA0OiByZXMyLnhwNCxcbiAgfSk7XG5cbiAgaWYgKEhuID09PSBudWxsKSByZXR1cm4gbnVsbDtcblxuICBpZiAoTWF0aC5hYnMoZGV0ZXJtaW5hbnQoSG4pKSA8IDAuMDAwMDEpIHJldHVybiBudWxsO1xuXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuREVCVUdfTUFUQ0gpIHtcbiAgICBjb25zdCBkSG9tb2dyYXBoeSA9IHdpbmRvdy5kZWJ1Z01hdGNoLnF1ZXJ5a2V5ZnJhbWVzW3dpbmRvdy5kZWJ1Zy5xdWVyeWtleWZyYW1lSW5kZXhdLmhvbW9ncmFwaHlbd2luZG93LmRlYnVnLmhvbW9ncmFwaHlJbmRleF07XG4gICAgY29uc3QgZEhuID0gZEhvbW9ncmFwaHkuSG47XG4gICAgaWYgKCF3aW5kb3cuY21wQXJyYXkoSG4sIGRIbiwgMC4wMDEpKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIklOQ09SUkVDVCBIblwiLCB3aW5kb3cuZGVidWcucXVlcnlrZXlmcmFtZUluZGV4LCB3aW5kb3cuZGVidWcuaG9tb2dyYXBoeUluZGV4LCBIbiwgZEhuKTtcbiAgICB9XG4gICAgY29uc3QgZERldEggPSB3aW5kb3cuZGVidWdNYXRjaC5xdWVyeWtleWZyYW1lc1t3aW5kb3cuZGVidWcucXVlcnlrZXlmcmFtZUluZGV4XS5ob21vZ3JhcGh5W3dpbmRvdy5kZWJ1Zy5ob21vZ3JhcGh5SW5kZXhdLmRldEg7XG4gICAgaWYgKCF3aW5kb3cuY21wKGRldGVybWluYW50KEhuKSwgZERldEgpKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIklOQ09SUkVDVCBkZXRlcm1pbmFudFwiLCBkZXRlcm1pbmFudChIbiksIGREZXRIKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBIID0gX2Rlbm9tYWxpemVIb21vZ3JhcGh5KHtIOiBIbiwgczogcmVzMS5zLCB0OiByZXMxLnQsIHNwOiByZXMyLnMsIHRwOiByZXMyLnR9KTtcblxuICByZXR1cm4gSDtcbn1cblxuLy8gZGVub3JtYWxpemUgaG9tb2dyYXBoeVxuLy8gSHAgPSBpbnYoVHApKkgqVFxuY29uc3QgX2Rlbm9tYWxpemVIb21vZ3JhcGh5ID0gKHtILCBzLCB0LCBzcCwgdHB9KSA9PiB7XG4gIGNvbnN0IGEgPSBIWzZdKnRwWzBdO1xuICBjb25zdCBiID0gSFs3XSp0cFswXTtcbiAgY29uc3QgYyA9IEhbMF0vc3A7XG4gIGNvbnN0IGQgPSBIWzFdL3NwO1xuICBjb25zdCBhcGMgPSBhK2M7XG4gIGNvbnN0IGJwZCA9IGIrZDtcblxuICBjb25zdCBlID0gSFs2XSp0cFsxXTtcbiAgY29uc3QgZiA9IEhbN10qdHBbMV07XG4gIGNvbnN0IGcgPSBIWzNdL3NwO1xuICBjb25zdCBoID0gSFs0XS9zcDtcbiAgY29uc3QgZXBnID0gZStnO1xuICBjb25zdCBmcGggPSBmK2g7XG5cbiAgY29uc3Qgc3R4ID0gcyp0WzBdO1xuICBjb25zdCBzdHkgPSBzKnRbMV07XG5cbiAgY29uc3QgSHAgPSBbXTtcbiAgSHBbMF0gPSBzKmFwYztcbiAgSHBbMV0gPSBzKmJwZDtcbiAgSHBbMl0gPSBIWzhdKnRwWzBdICsgSFsyXS9zcCAtIHN0eCphcGMgLSBzdHkqYnBkO1xuXG4gIEhwWzNdID0gcyplcGc7XG4gIEhwWzRdID0gcypmcGg7XG4gIEhwWzVdID0gSFs4XSp0cFsxXSArIEhbNV0vc3AgLSBzdHgqZXBnIC0gc3R5KmZwaDtcblxuICBIcFs2XSA9IEhbNl0qcztcbiAgSHBbN10gPSBIWzddKnM7XG4gIEhwWzhdID0gSFs4XSAtIEhwWzZdKnRbMF0gLSBIcFs3XSp0WzFdO1xuXG4gIHJldHVybiBIcDtcbn07XG5cbi8vIGNhbiBzb21lb25lIHZlcmlmeSB0aGUgaW1wbGVtZW50YXRpb24gb2YgdGhpcyBRUiBkZWNvbXBvc2l0aW9uP1xuY29uc3QgX3NvbHZlSG9tb2dyYXBoeTRQb2ludHNJbmhvbW9nZW5vdXMgPSAoe3gxLCB4MiwgeDMsIHg0LCB4cDEsIHhwMiwgeHAzLCB4cDR9KSA9PiB7XG4gIGNvbnN0IHhMaXN0ID0gW3gxLCB4MiwgeDMsIHg0XTtcbiAgY29uc3QgeHBMaXN0ID0gW3hwMSwgeHAyLCB4cDMsIHhwNF07XG5cbiAgY29uc3QgQSA9IFtdOyAvLyA4IHggOVxuICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgIGNvbnN0IG9mZnNldCA9IGkgKiAxODtcbiAgICBjb25zdCB4ID0geExpc3RbaV07XG4gICAgY29uc3QgeHAgPSB4cExpc3RbaV07XG4gICAgQVtvZmZzZXQrMF0gPSAteFswXTtcbiAgICBBW29mZnNldCsxXSA9IC14WzFdO1xuICAgIEFbb2Zmc2V0KzJdID0gLTE7XG4gICAgQVtvZmZzZXQrM10gPSAwO1xuICAgIEFbb2Zmc2V0KzRdID0gMDtcbiAgICBBW29mZnNldCs1XSA9IDA7XG4gICAgQVtvZmZzZXQrNl0gPSB4cFswXSp4WzBdO1xuICAgIEFbb2Zmc2V0KzddID0geHBbMF0qeFsxXTtcbiAgICBBW29mZnNldCs4XSA9IHhwWzBdO1xuICAgIEFbb2Zmc2V0KzldID0gMDtcbiAgICBBW29mZnNldCsxMF0gPSAwO1xuICAgIEFbb2Zmc2V0KzExXSA9IDA7XG4gICAgQVtvZmZzZXQrMTJdID0gLXhbMF07XG4gICAgQVtvZmZzZXQrMTNdID0gLXhbMV07XG4gICAgQVtvZmZzZXQrMTRdID0gLTE7XG4gICAgQVtvZmZzZXQrMTVdID0geHBbMV0qeFswXTtcbiAgICBBW29mZnNldCsxNl0gPSB4cFsxXSp4WzFdO1xuICAgIEFbb2Zmc2V0KzE3XSA9IHhwWzFdO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5ERUJVR19NQVRDSCkge1xuICAgIGNvbnN0IGRBID0gd2luZG93LmRlYnVnTWF0Y2gucXVlcnlrZXlmcmFtZXNbd2luZG93LmRlYnVnLnF1ZXJ5a2V5ZnJhbWVJbmRleF0uaG9tb2dyYXBoeVt3aW5kb3cuZGVidWcuaG9tb2dyYXBoeUluZGV4XS5BO1xuICAgIGlmICghd2luZG93LmNtcEFycmF5KEEsIGRBKSkge1xuICAgICAgY29uc29sZS5sb2coXCJJTkNPUlJFQ1QgQVwiLCB3aW5kb3cuZGVidWcucXVlcnlrZXlmcmFtZUluZGV4LCB3aW5kb3cuZGVidWcuaG9tb2dyYXBoeUluZGV4LCBBLCBkQSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgUSA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDcyOyBpKyspIHtcbiAgICBRW2ldID0gQVtpXTtcbiAgfVxuXG4gIC8vIHNvbHZlIHggZm9yIEF4PTAgd2l0aCBRUiBkZWNvbXBvc2l0aW9uIHdpdGggR3JhbS1TY2htaWR0XG4gIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IDg7IHJvdysrKSB7XG4gICAgaWYgKHJvdyA+IDApIHtcbiAgICAgIGZvciAobGV0IGogPSByb3c7IGogPCA4OyBqKyspIHtcbiAgICAgICAgLy8gcHJvamVjdCBhIHZlY3RvciBcImFcIiBvbnRvIGEgbm9ybWFsaXplZCBiYXNpcyB2ZWN0b3IgXCJlXCIuXG4gICAgICAgIC8vIHggPSB4IC0gZG90KGEsZSkqZVxuXG4gICAgICAgIGxldCBkID0gMDsgLy8gZG90KGEsIGUpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDk7IGkrKykge1xuICAgICAgICAgIGQgKz0gUVsocm93LTEpICogOSArIGldICogQVtqICogOSArIGldO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA5OyBpKyspIHtcbiAgICAgICAgICBRW2ogKiA5ICsgaV0gLT0gZCAqIFFbIChyb3ctMSkgKiA5ICsgaV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgbWF4VmFsdWUgPSAtMTtcbiAgICBsZXQgbWF4Um93ID0gLTE7XG4gICAgY29uc3Qgc3MgPSBbXTtcbiAgICBmb3IgKGxldCBqID0gcm93OyBqIDwgODsgaisrKSB7XG4gICAgICBzc1tqXSA9IDA7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDk7IGkrKykge1xuICAgICAgICBzc1tqXSArPSAoUVtqKjkraV0gKiBRW2oqOStpXSk7XG4gICAgICB9XG4gICAgICBpZiAoc3Nbal0gPiBtYXhWYWx1ZSkge1xuICAgICAgICBtYXhWYWx1ZSA9IHNzW2pdO1xuICAgICAgICBtYXhSb3cgPSBqO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIE1hdGguYWJzKHNzW21heFJvd10pIDwgRVBTSUxPTikge1xuICAgICAgcmV0dXJuIG51bGw7IC8vIG5vIHNvbHV0aW9uXG4gICAgfVxuXG4gICAgLy8gc3dhcCBjdXJyZW50IHJvdyB3aXRoIG1heGluZGV4IHJvd1xuICAgIGlmIChyb3cgIT09IG1heFJvdykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA5OyBpKyspIHtcbiAgICAgICAgbGV0IHRtcCA9IEFbcm93ICogOSArIGldO1xuICAgICAgICBBW3JvdyAqIDkgKyBpXSA9IEFbbWF4Um93ICogOSArIGldO1xuICAgICAgICBBW21heFJvdyAqIDkgKyBpXSA9IHRtcDtcblxuICAgICAgICBsZXQgdG1wMiA9IFFbcm93ICogOSArIGldO1xuICAgICAgICBRW3JvdyAqIDkgKyBpXSA9IFFbbWF4Um93ICogOSArIGldO1xuICAgICAgICBRW21heFJvdyAqIDkgKyBpXSA9IHRtcDI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA5OyBpKyspIHtcbiAgICAgIFFbcm93ICogOSArIGldID0gMS4wICogUVtyb3cgKiA5ICsgaV0gLyBNYXRoLnNxcnQoc3NbbWF4Um93XSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5ERUJVR19NQVRDSCkge1xuICAgIGNvbnN0IGRRID0gd2luZG93LmRlYnVnTWF0Y2gucXVlcnlrZXlmcmFtZXNbd2luZG93LmRlYnVnLnF1ZXJ5a2V5ZnJhbWVJbmRleF0uaG9tb2dyYXBoeVt3aW5kb3cuZGVidWcuaG9tb2dyYXBoeUluZGV4XS5RODtcbiAgICBpZiAoIXdpbmRvdy5jbXBBcnJheShRLCBkUSwgMC4wMDEpKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIklOQ09SUkVDVCBROFwiLCB3aW5kb3cuZGVidWcucXVlcnlrZXlmcmFtZUluZGV4LCB3aW5kb3cuZGVidWcuaG9tb2dyYXBoeUluZGV4LCBRLCBkUSk7XG4gICAgfVxuICB9XG5cbiAgLy8gY29tcHV0ZSB4IGZyb20gUVxuICBjb25zdCB3ID0gW107XG4gIGNvbnN0IFggPSBbXTtcbiAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgOTsgcm93KyspIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDk7IGkrKykge1xuICAgICAgWFtyb3cgKiA5ICsgaV0gPSAoUVtpXSAqIC1RW3Jvd10pO1xuICAgIH1cbiAgICBYW3JvdyAqIDkgKyByb3ddID0gMSArIFhbcm93ICogOSArIHJvd107XG5cbiAgICBmb3IgKGxldCBqID0gMTsgaiA8IDg7IGorKykge1xuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDk7IGkrKykge1xuICAgICAgICBYW3JvdyAqIDkgKyBpXSArPSAoUVtqICogOSArIGldICogLVFbaiAqIDkgKyByb3ddKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgc3MgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgOTsgaSsrKSB7XG4gICAgICBzcyArPSAoWFtyb3cgKiA5ICsgaV0gKiBYW3JvdyAqIDkgKyBpXSk7XG4gICAgfVxuICAgIGlmIChNYXRoLmFicyhzcykgPCBFUFNJTE9OKSB7XG4gICAgICB3W3Jvd10gPSAwO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgd1tyb3ddID0gTWF0aC5zcXJ0KHNzKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDk7IGkrKykge1xuICAgICAgWFtyb3cgKiA5ICsgaV0gPSBYW3JvdyAqIDkgKyBpXSAvIHdbcm93XTtcbiAgICB9XG4gIH1cblxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LkRFQlVHX01BVENIKSB7XG4gICAgY29uc3QgZFggPSB3aW5kb3cuZGVidWdNYXRjaC5xdWVyeWtleWZyYW1lc1t3aW5kb3cuZGVidWcucXVlcnlrZXlmcmFtZUluZGV4XS5ob21vZ3JhcGh5W3dpbmRvdy5kZWJ1Zy5ob21vZ3JhcGh5SW5kZXhdLlg7XG4gICAgY29uc3QgZHcgPSB3aW5kb3cuZGVidWdNYXRjaC5xdWVyeWtleWZyYW1lc1t3aW5kb3cuZGVidWcucXVlcnlrZXlmcmFtZUluZGV4XS5ob21vZ3JhcGh5W3dpbmRvdy5kZWJ1Zy5ob21vZ3JhcGh5SW5kZXhdLnc7XG4gICAgaWYgKCF3aW5kb3cuY21wQXJyYXkoWCwgZFgsIDAuMDEpKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIklOQ09SUkVDVCBYXCIsIHdpbmRvdy5kZWJ1Zy5xdWVyeWtleWZyYW1lSW5kZXgsIHdpbmRvdy5kZWJ1Zy5ob21vZ3JhcGh5SW5kZXgsIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoWCkpLCBkWCk7XG4gICAgfVxuICAgIGlmICghd2luZG93LmNtcEFycmF5KHcsIGR3LCAwLjAxKSkge1xuICAgICAgY29uc29sZS5sb2coXCJJTkNPUlJFQ1Qgd1wiLCB3aW5kb3cuZGVidWcucXVlcnlrZXlmcmFtZUluZGV4LCB3aW5kb3cuZGVidWcuaG9tb2dyYXBoeUluZGV4LCBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHcpKSwgZHcpO1xuICAgIH1cbiAgfVxuXG4gIGxldCBtYXhSb3cgPSAtMTtcbiAgbGV0IG1heFZhbHVlID0gLTE7XG4gIGZvciAobGV0IGogPSAwOyBqIDwgOTsgaisrKSB7XG4gICAgaWYgKHdbal0gPiBtYXhWYWx1ZSkge1xuICAgICAgbWF4Um93ID0gajtcbiAgICAgIG1heFZhbHVlID0gd1tqXTtcbiAgICB9XG4gIH1cblxuXG4gIGlmIChtYXhWYWx1ZSA9PSAwKSByZXR1cm4gbnVsbDsgLy8gbm8gc29sdXRpb25cblxuICBjb25zdCB4ID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgOTsgaSsrKSB7XG4gICAgeFtpXSA9IFhbbWF4Um93ICogOSArIGldO1xuICB9XG5cbiAgcmV0dXJuIHg7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjb21wdXRlSG9tb2dyYXBoeSxcbn1cblxuIiwiY29uc3Qga0hvdWdoQmluRGVsdGEgPSAxO1xuXG4vLyBtYXRoY2VzIFtxdWVyeXBvaW50SW5kZXg6eCwga2V5cG9pbnRJbmRleDogeF1cbmNvbnN0IGNvbXB1dGVIb3VnaE1hdGNoZXMgPSAob3B0aW9ucykgPT4ge1xuICBjb25zdCB7a2V5cG9pbnRzLCBxdWVyeXBvaW50cywga2V5d2lkdGgsIGtleWhlaWdodCwgcXVlcnl3aWR0aCwgcXVlcnloZWlnaHQsIG1hdGNoZXN9ID0gb3B0aW9ucztcblxuICBjb25zdCBtYXhYID0gcXVlcnl3aWR0aCAqIDEuMjtcbiAgY29uc3QgbWluWCA9IC1tYXhYO1xuICBjb25zdCBtYXhZID0gcXVlcnloZWlnaHQgKiAxLjI7XG4gIGNvbnN0IG1pblkgPSAtbWF4WTtcbiAgY29uc3QgbnVtQW5nbGVCaW5zID0gMTI7XG4gIGNvbnN0IG51bVNjYWxlQmlucyA9IDEwO1xuICBjb25zdCBtaW5TY2FsZSA9IC0xO1xuICBjb25zdCBtYXhTY2FsZSA9IDE7XG4gIGNvbnN0IHNjYWxlSyA9IDEwLjA7XG4gIGNvbnN0IHNjYWxlT25lT3ZlckxvZ0sgPSAxLjAgLyBNYXRoLmxvZyhzY2FsZUspO1xuICBjb25zdCBtYXhEaW0gPSBNYXRoLm1heChrZXl3aWR0aCwga2V5aGVpZ2h0KTtcbiAgY29uc3Qga2V5Y2VudGVyWCA9IE1hdGguZmxvb3Ioa2V5d2lkdGggLyAyKTtcbiAgY29uc3Qga2V5Y2VudGVyWSA9IE1hdGguZmxvb3Ioa2V5aGVpZ2h0IC8gMik7XG5cbiAgLy8gY29tcHV0ZSBudW1YQmlucyBhbmQgbnVtWUJpbnMgYmFzZWQgb24gbWF0Y2hlc1xuICBjb25zdCBwcm9qZWN0ZWREaW1zID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbWF0Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHF1ZXJ5c2NhbGUgPSBxdWVyeXBvaW50c1ttYXRjaGVzW2ldLnF1ZXJ5cG9pbnRJbmRleF0uc2NhbGU7XG4gICAgY29uc3Qga2V5c2NhbGUgPSBrZXlwb2ludHNbbWF0Y2hlc1tpXS5rZXlwb2ludEluZGV4XS5zY2FsZTtcbiAgICBpZiAoa2V5c2NhbGUgPT0gMCkgY29uc29sZS5sb2coXCJFUlJPUiBkaXZpZGUgemVyb1wiKTtcbiAgICBjb25zdCBzY2FsZSA9IHF1ZXJ5c2NhbGUgLyBrZXlzY2FsZTtcbiAgICBwcm9qZWN0ZWREaW1zLnB1c2goIHNjYWxlICogbWF4RGltICk7XG4gIH1cblxuICAvLyBUT0RPIG9wdGltaXplIG1lZGlhblxuICAvLyAgIHdlaXJkLiBtZWRpYW4gc2hvdWxkIGJlIFtNYXRoLmZsb29yKHByb2plY3RlZERpbXMubGVuZ3RoLzIpIC0gMV0gP1xuICBwcm9qZWN0ZWREaW1zLnNvcnQoKGExLCBhMikgPT4ge3JldHVybiBhMSAtIGEyfSk7XG4gIGNvbnN0IG1lZGlhblByb2plY3RlZERpbSA9IHByb2plY3RlZERpbXNbIE1hdGguZmxvb3IocHJvamVjdGVkRGltcy5sZW5ndGgvMikgLSAocHJvamVjdGVkRGltcy5sZW5ndGglMj09MD8xOjApIC0xIF07XG5cbiAgY29uc3QgYmluU2l6ZSA9IDAuMjUgKiBtZWRpYW5Qcm9qZWN0ZWREaW07XG4gIGNvbnN0IG51bVhCaW5zID0gTWF0aC5tYXgoNSwgTWF0aC5jZWlsKChtYXhYIC0gbWluWCkgLyBiaW5TaXplKSk7XG4gIGNvbnN0IG51bVlCaW5zID0gTWF0aC5tYXgoNSwgTWF0aC5jZWlsKChtYXhZIC0gbWluWSkgLyBiaW5TaXplKSk7XG5cbiAgY29uc3QgbnVtWFlCaW5zID0gbnVtWEJpbnMgKiBudW1ZQmlucztcbiAgY29uc3QgbnVtWFlBbmdsZUJpbnMgPSBudW1YWUJpbnMgKiBudW1BbmdsZUJpbnM7XG5cbiAgLy8gZG8gdm90aW5nXG4gIGNvbnN0IHF1ZXJ5cG9pbnRWYWxpZHMgPSBbXTtcbiAgY29uc3QgcXVlcnlwb2ludEJpbkxvY2F0aW9ucyA9IFtdO1xuICBjb25zdCB2b3RlcyA9IHt9O1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG1hdGNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBxdWVyeXBvaW50ID0gcXVlcnlwb2ludHNbbWF0Y2hlc1tpXS5xdWVyeXBvaW50SW5kZXhdO1xuICAgIGNvbnN0IGtleXBvaW50ID0ga2V5cG9pbnRzW21hdGNoZXNbaV0ua2V5cG9pbnRJbmRleF07XG5cbiAgICBjb25zdCB7eCwgeSwgc2NhbGUsIGFuZ2xlfSA9IF9tYXBDb3JyZXNwb25kZW5jZSh7cXVlcnlwb2ludCwga2V5cG9pbnQsIGtleWNlbnRlclgsIGtleWNlbnRlclksIHNjYWxlT25lT3ZlckxvZ0t9KTtcblxuICAgIC8vIENoZWNrIHRoYXQgdGhlIHZvdGUgaXMgd2l0aGluIHJhbmdlXG4gICAgaWYgKHggPCBtaW5YIHx8IHggPj0gbWF4WCB8fCB5IDwgbWluWSB8fCB5ID49IG1heFkgfHwgYW5nbGUgPD0gLU1hdGguUEkgfHwgYW5nbGUgPiBNYXRoLlBJIHx8IHNjYWxlIDwgbWluU2NhbGUgfHwgc2NhbGUgPj0gbWF4U2NhbGUpIHtcbiAgICAgIHF1ZXJ5cG9pbnRWYWxpZHNbaV0gPSBmYWxzZTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIG1hcCBwcm9wZXJ0aWVzIHRvIGJpbnNcbiAgICBsZXQgZmJpblggPSBudW1YQmlucyAqICh4IC0gbWluWCkgLyAobWF4WCAtIG1pblgpO1xuICAgIGxldCBmYmluWSA9IG51bVlCaW5zICogKHkgLSBtaW5ZKSAvIChtYXhZIC0gbWluWSk7XG4gICAgbGV0IGZiaW5BbmdsZSA9IG51bUFuZ2xlQmlucyAqIChhbmdsZSArIE1hdGguUEkpIC8gKDIuMCAqIE1hdGguUEkpO1xuICAgIGxldCBmYmluU2NhbGUgPSBudW1TY2FsZUJpbnMgKiAoc2NhbGUgLSBtaW5TY2FsZSkgLyAobWF4U2NhbGUgLSBtaW5TY2FsZSk7XG5cbiAgICBxdWVyeXBvaW50QmluTG9jYXRpb25zW2ldID0ge2Jpblg6IGZiaW5YLCBiaW5ZOiBmYmluWSwgYmluQW5nbGU6IGZiaW5BbmdsZSwgYmluU2NhbGU6IGZiaW5TY2FsZX07XG5cbiAgICBsZXQgYmluWCA9IE1hdGguZmxvb3IoZmJpblggLSAwLjUpO1xuICAgIGxldCBiaW5ZID0gTWF0aC5mbG9vcihmYmluWSAtIDAuNSk7XG4gICAgbGV0IGJpblNjYWxlID0gTWF0aC5mbG9vcihmYmluU2NhbGUgLSAwLjUpO1xuICAgIGxldCBiaW5BbmdsZSA9IChNYXRoLmZsb29yKGZiaW5BbmdsZSAtIDAuNSkgKyBudW1BbmdsZUJpbnMpICUgbnVtQW5nbGVCaW5zO1xuXG4gICAgLy8gY2hlY2sgY2FuIHZvdGUgYWxsIDE2IGJpbnNcbiAgICBpZiAoYmluWCA8IDAgfHwgYmluWCArIDEgPj0gbnVtWEJpbnMgfHwgYmluWSA8IDAgfHwgYmluWSArIDEgPj0gbnVtWUJpbnMgfHwgYmluU2NhbGUgPCAwIHx8IGJpblNjYWxlICsxID49IG51bVNjYWxlQmlucykge1xuICAgICAgcXVlcnlwb2ludFZhbGlkc1tpXSA9IGZhbHNlO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgZHggPSAwOyBkeCA8IDI7IGR4KyspIHtcbiAgICAgIGxldCBiaW5YMiA9IGJpblggKyBkeDtcblxuICAgICAgZm9yIChsZXQgZHkgPSAwOyBkeSA8IDI7IGR5KyspIHtcbiAgICAgICAgbGV0IGJpblkyID0gYmluWSArIGR5O1xuXG4gICAgICAgIGZvciAobGV0IGRhbmdsZSA9IDA7IGRhbmdsZSA8IDI7IGRhbmdsZSsrKSB7XG4gICAgICAgICAgbGV0IGJpbkFuZ2xlMiA9IChiaW5BbmdsZSArIGRhbmdsZSkgJSBudW1BbmdsZUJpbnM7XG5cbiAgICAgICAgICBmb3IgKGxldCBkc2NhbGUgPSAwOyBkc2NhbGUgPCAyOyBkc2NhbGUrKykge1xuICAgICAgICAgICAgbGV0IGJpblNjYWxlMiA9IGJpblNjYWxlICsgZHNjYWxlO1xuXG4gICAgICAgICAgICBjb25zdCBiaW5JbmRleCA9IGJpblgyICsgYmluWTIgKiBudW1YQmlucyArIGJpbkFuZ2xlMiAqIG51bVhZQmlucyArIGJpblNjYWxlMiAqIG51bVhZQW5nbGVCaW5zO1xuXG4gICAgICAgICAgICBpZiAodm90ZXNbYmluSW5kZXhdID09PSB1bmRlZmluZWQpIHZvdGVzW2JpbkluZGV4XSA9IDA7XG4gICAgICAgICAgICB2b3Rlc1tiaW5JbmRleF0gKz0gMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcXVlcnlwb2ludFZhbGlkc1tpXSA9IHRydWU7XG4gIH1cblxuICBsZXQgbWF4Vm90ZXMgPSAwO1xuICBsZXQgbWF4Vm90ZUluZGV4ID0gLTE7XG4gIE9iamVjdC5rZXlzKHZvdGVzKS5mb3JFYWNoKChpbmRleCkgPT4ge1xuICAgIGlmICh2b3Rlc1tpbmRleF0gPiBtYXhWb3Rlcykge1xuICAgICAgbWF4Vm90ZXMgPSB2b3Rlc1tpbmRleF07XG4gICAgICBtYXhWb3RlSW5kZXggPSBpbmRleDtcbiAgICB9XG4gIH0pO1xuXG4gIGlmIChtYXhWb3RlcyA8IDMpIHJldHVybiBbXTtcblxuICAvLyBnZXQgYmFjayBiaW5zIGZyb20gdm90ZSBpbmRleFxuICBjb25zdCBiaW5YID0gTWF0aC5mbG9vcigoKG1heFZvdGVJbmRleCAlIG51bVhZQW5nbGVCaW5zKSAlIG51bVhZQmlucykgJSBudW1YQmlucyk7XG4gIGNvbnN0IGJpblkgPSBNYXRoLmZsb29yKCgoKG1heFZvdGVJbmRleCAtIGJpblgpICUgbnVtWFlBbmdsZUJpbnMpICUgbnVtWFlCaW5zKSAvIG51bVhCaW5zKTtcbiAgY29uc3QgYmluQW5nbGUgPSBNYXRoLmZsb29yKCgobWF4Vm90ZUluZGV4IC0gYmluWCAtIChiaW5ZICogbnVtWEJpbnMpKSAlIG51bVhZQW5nbGVCaW5zKSAvIG51bVhZQmlucyk7XG4gIGNvbnN0IGJpblNjYWxlID0gTWF0aC5mbG9vcigobWF4Vm90ZUluZGV4IC0gYmluWCAtIChiaW5ZICogbnVtWEJpbnMpIC0gKGJpbkFuZ2xlICogbnVtWFlCaW5zKSkgLyBudW1YWUFuZ2xlQmlucyk7XG5cbiAgLy9jb25zb2xlLmxvZyhcImhvdWdoIHZvdGVkOiBcIiwge2JpblgsIGJpblksIGJpbkFuZ2xlLCBiaW5TY2FsZSwgbWF4Vm90ZUluZGV4fSk7XG5cbiAgY29uc3QgaG91Z2hNYXRjaGVzID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbWF0Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgIGlmICghcXVlcnlwb2ludFZhbGlkc1tpXSkgY29udGludWU7XG5cbiAgICBjb25zdCBxdWVyeUJpbnMgPSBxdWVyeXBvaW50QmluTG9jYXRpb25zW2ldO1xuICAgIC8vIGNvbXB1dGUgYmluIGRpZmZlcmVuY2VcbiAgICBjb25zdCBkaXN0QmluWCA9IE1hdGguYWJzKHF1ZXJ5Qmlucy5iaW5YIC0gKGJpblgrMC41KSk7XG4gICAgaWYgKGRpc3RCaW5YID49IGtIb3VnaEJpbkRlbHRhKSBjb250aW51ZTtcblxuICAgIGNvbnN0IGRpc3RCaW5ZID0gTWF0aC5hYnMocXVlcnlCaW5zLmJpblkgLSAoYmluWSswLjUpKTtcbiAgICBpZiAoZGlzdEJpblkgPj0ga0hvdWdoQmluRGVsdGEpIGNvbnRpbnVlO1xuXG4gICAgY29uc3QgZGlzdEJpblNjYWxlID0gTWF0aC5hYnMocXVlcnlCaW5zLmJpblNjYWxlIC0gKGJpblNjYWxlKzAuNSkpO1xuICAgIGlmIChkaXN0QmluU2NhbGUgPj0ga0hvdWdoQmluRGVsdGEpIGNvbnRpbnVlO1xuXG4gICAgY29uc3QgdGVtcCA9IE1hdGguYWJzKHF1ZXJ5Qmlucy5iaW5BbmdsZSAtIChiaW5BbmdsZSswLjUpKTtcbiAgICBjb25zdCBkaXN0QmluQW5nbGUgPSBNYXRoLm1pbih0ZW1wLCBudW1BbmdsZUJpbnMgLSB0ZW1wKTtcbiAgICBpZiAoZGlzdEJpbkFuZ2xlID49IGtIb3VnaEJpbkRlbHRhKSBjb250aW51ZTtcblxuICAgIGhvdWdoTWF0Y2hlcy5wdXNoKG1hdGNoZXNbaV0pO1xuICB9XG4gIHJldHVybiBob3VnaE1hdGNoZXM7XG59XG5cbmNvbnN0IF9tYXBDb3JyZXNwb25kZW5jZSA9ICh7cXVlcnlwb2ludCwga2V5cG9pbnQsIGtleWNlbnRlclgsIGtleWNlbnRlclksIHNjYWxlT25lT3ZlckxvZ0t9KSA9PiB7XG4gIC8vIG1hcCBhbmdsZSB0byAoLXBpLCBwaV1cbiAgbGV0IGFuZ2xlID0gcXVlcnlwb2ludC5hbmdsZSAtIGtleXBvaW50LmFuZ2xlO1xuICBpZiAoYW5nbGUgPD0gLU1hdGguUEkpIGFuZ2xlICs9IDIqTWF0aC5QSTtcbiAgZWxzZSBpZiAoYW5nbGUgPiBNYXRoLlBJKSBhbmdsZSAtPSAyKk1hdGguUEk7XG5cbiAgY29uc3Qgc2NhbGUgPSBxdWVyeXBvaW50LnNjYWxlIC8ga2V5cG9pbnQuc2NhbGU7XG5cbiAgLy8gMngyIHNpbWlsYXJpdHlcbiAgY29uc3QgY29zID0gc2NhbGUgKiBNYXRoLmNvcyhhbmdsZSk7XG4gIGNvbnN0IHNpbiA9IHNjYWxlICogTWF0aC5zaW4oYW5nbGUpO1xuICBjb25zdCBTID0gW2NvcywgLXNpbiwgc2luLCBjb3NdO1xuXG4gIGNvbnN0IHRwID0gW1xuICAgIFNbMF0gKiBrZXlwb2ludC54MkQgKyBTWzFdICoga2V5cG9pbnQueTJELFxuICAgIFNbMl0gKiBrZXlwb2ludC54MkQgKyBTWzNdICoga2V5cG9pbnQueTJEXG4gIF07XG4gIGNvbnN0IHR4ID0gcXVlcnlwb2ludC54MkQgLSB0cFswXTtcbiAgY29uc3QgdHkgPSBxdWVyeXBvaW50LnkyRCAtIHRwWzFdO1xuXG4gIHJldHVybiB7XG4gICAgeDogU1swXSAqIGtleWNlbnRlclggKyBTWzFdICoga2V5Y2VudGVyWSArIHR4LFxuICAgIHk6IFNbMl0gKiBrZXljZW50ZXJYICsgU1szXSAqIGtleWNlbnRlclkgKyB0eSxcbiAgICBhbmdsZTogYW5nbGUsXG4gICAgc2NhbGU6IE1hdGgubG9nKHNjYWxlKSAqIHNjYWxlT25lT3ZlckxvZ0tcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY29tcHV0ZUhvdWdoTWF0Y2hlc1xufVxuXG4iLCJjb25zdCB7bWF0Y2h9ID0gcmVxdWlyZSgnLi9tYXRjaGluZycpO1xuXG5jbGFzcyBNYXRjaGVyIHtcbiAgY29uc3RydWN0b3IocXVlcnlXaWR0aCwgcXVlcnlIZWlnaHQpIHtcbiAgICB0aGlzLnF1ZXJ5V2lkdGggPSBxdWVyeVdpZHRoO1xuICAgIHRoaXMucXVlcnlIZWlnaHQgPSBxdWVyeUhlaWdodDtcbiAgfVxuXG4gIG1hdGNoRGV0ZWN0aW9uKGtleWZyYW1lcywgZmVhdHVyZVBvaW50cykge1xuICAgIGNvbnN0IHJlc3VsdCA9IG1hdGNoKHtrZXlmcmFtZXM6IGtleWZyYW1lcywgcXVlcnlwb2ludHM6IGZlYXR1cmVQb2ludHMsIHF1ZXJ5d2lkdGg6IHRoaXMucXVlcnlXaWR0aCwgcXVlcnloZWlnaHQ6IHRoaXMucXVlcnlIZWlnaHR9KTtcbiAgICBpZiAocmVzdWx0ID09PSBudWxsKSByZXR1cm4gbnVsbDtcblxuICAgIGNvbnN0IHNjcmVlbkNvb3JkcyA9IFtdO1xuICAgIGNvbnN0IHdvcmxkQ29vcmRzID0gW107XG4gICAgY29uc3Qga2V5ZnJhbWUgPSBrZXlmcmFtZXNbcmVzdWx0LmtleWZyYW1lSW5kZXhdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHQubWF0Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgcXVlcnlwb2ludEluZGV4ID0gcmVzdWx0Lm1hdGNoZXNbaV0ucXVlcnlwb2ludEluZGV4O1xuICAgICAgY29uc3Qga2V5cG9pbnRJbmRleCA9IHJlc3VsdC5tYXRjaGVzW2ldLmtleXBvaW50SW5kZXg7XG4gICAgICBzY3JlZW5Db29yZHMucHVzaCh7XG4gICAgICAgIHg6IGZlYXR1cmVQb2ludHNbcXVlcnlwb2ludEluZGV4XS54LFxuICAgICAgICB5OiBmZWF0dXJlUG9pbnRzW3F1ZXJ5cG9pbnRJbmRleF0ueSxcbiAgICAgIH0pXG4gICAgICB3b3JsZENvb3Jkcy5wdXNoKHtcbiAgICAgICAgeDogKGtleWZyYW1lLnBvaW50c1trZXlwb2ludEluZGV4XS54ICsgMC41KSAvIGtleWZyYW1lLnNjYWxlLFxuICAgICAgICB5OiAoKGtleWZyYW1lLmhlaWdodC0wLjUpIC1rZXlmcmFtZS5wb2ludHNba2V5cG9pbnRJbmRleF0ueSkgLyBrZXlmcmFtZS5zY2FsZSxcbiAgICAgICAgejogMCxcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIHtzY3JlZW5Db29yZHMsIHdvcmxkQ29vcmRzLCBrZXlmcmFtZUluZGV4OiByZXN1bHQua2V5ZnJhbWVJbmRleH07XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIE1hdGNoZXJcbn1cbiIsImNvbnN0IFRpbnlRdWV1ZSA9IHJlcXVpcmUoJ3RpbnlxdWV1ZScpLmRlZmF1bHQ7XG5jb25zdCB7Y29tcHV0ZTogaGFtbWluZ0NvbXB1dGV9ID0gcmVxdWlyZSgnLi9oYW1taW5nLWRpc3RhbmNlLmpzJyk7XG5jb25zdCB7Y29tcHV0ZUhvdWdoTWF0Y2hlc30gPSByZXF1aXJlKCcuL2hvdWdoLmpzJyk7XG5jb25zdCB7Y29tcHV0ZUhvbW9ncmFwaHl9ID0gcmVxdWlyZSgnLi9ob21vZ3JhcGh5LmpzJyk7XG5jb25zdCB7bXVsdGlwbHlQb2ludEhvbW9ncmFwaHlJbmhvbW9nZW5vdXMsIG1hdHJpeEludmVyc2UzM30gPSByZXF1aXJlKCcuLi91dGlscy9nZW9tZXRyeS5qcycpO1xuXG5jb25zdCBJTkxJRVJfVEhSRVNIT0xEID0gMztcbi8vY29uc3QgTUlOX05VTV9JTkxJRVJTID0gODsgIC8vZGVmYXVsdFxuY29uc3QgTUlOX05VTV9JTkxJRVJTID0gNjtcbmNvbnN0IENMVVNURVJfTUFYX1BPUCA9IDg7XG5jb25zdCBIQU1NSU5HX1RIUkVTSE9MRCA9IDAuNztcblxuLy8gbWF0Y2ggbGlzdCBvZiBxdWVycG9pbnRzIGFnYWluc3QgcHJlLWJ1aWx0IGxpc3Qgb2Yga2V5ZnJhbWVzXG5jb25zdCBtYXRjaCA9ICh7a2V5ZnJhbWVzLCBxdWVyeXBvaW50cywgcXVlcnl3aWR0aCwgcXVlcnloZWlnaHR9KSA9PiB7XG4gIGxldCByZXN1bHQgPSBudWxsO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwga2V5ZnJhbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qga2V5ZnJhbWUgPSBrZXlmcmFtZXNbaV07XG4gICAgY29uc3Qga2V5cG9pbnRzID0ga2V5ZnJhbWUucG9pbnRzO1xuXG4gICAgY29uc3QgbWF0Y2hlcyA9IFtdO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgcXVlcnlwb2ludHMubGVuZ3RoOyBqKyspIHtcbiAgICAgIGNvbnN0IHJvb3ROb2RlID0ga2V5ZnJhbWUucG9pbnRzQ2x1c3Rlci5yb290Tm9kZTtcbiAgICAgIGNvbnN0IHF1ZXJ5cG9pbnQgPSBxdWVyeXBvaW50c1tqXTtcbiAgICAgIGNvbnN0IGtleXBvaW50SW5kZXhlcyA9IFtdO1xuICAgICAgY29uc3QgcXVldWUgPSBuZXcgVGlueVF1ZXVlKFtdLCAoYTEsIGEyKSA9PiB7cmV0dXJuIGExLmQgLSBhMi5kfSk7XG5cbiAgICAgIF9xdWVyeSh7bm9kZTogcm9vdE5vZGUsIGtleXBvaW50cywgcXVlcnlwb2ludCwgcXVldWUsIGtleXBvaW50SW5kZXhlcywgbnVtUG9wOiAwfSk7XG5cbiAgICAgIGxldCBiZXN0SW5kZXggPSAtMTtcbiAgICAgIGxldCBiZXN0RDEgPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUjtcbiAgICAgIGxldCBiZXN0RDIgPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUjtcblxuICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBrZXlwb2ludEluZGV4ZXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgY29uc3Qga2V5cG9pbnQgPSBrZXlwb2ludHNba2V5cG9pbnRJbmRleGVzW2tdXTtcbiAgICAgICAgaWYgKGtleXBvaW50Lm1heGltYSAhPSBxdWVyeXBvaW50Lm1heGltYSkgY29udGludWU7XG5cbiAgICAgICAgY29uc3QgZCA9IGhhbW1pbmdDb21wdXRlKHt2MToga2V5cG9pbnQuZGVzY3JpcHRvcnMsIHYyOiBxdWVyeXBvaW50LmRlc2NyaXB0b3JzfSk7XG4gICAgICAgIGlmIChkIDwgYmVzdEQxKSB7XG4gICAgICAgICAgYmVzdEQyID0gYmVzdEQxO1xuICAgICAgICAgIGJlc3REMSA9IGQ7XG4gICAgICAgICAgYmVzdEluZGV4ID0ga2V5cG9pbnRJbmRleGVzW2tdO1xuICAgICAgICB9IGVsc2UgaWYgKGQgPCBiZXN0RDIpIHtcbiAgICAgICAgICBiZXN0RDIgPSBkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoYmVzdEluZGV4ICE9PSAtMSAmJiAoYmVzdEQyID09PSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUiB8fCAoMS4wICogYmVzdEQxIC8gYmVzdEQyKSA8IEhBTU1JTkdfVEhSRVNIT0xEKSkge1xuICAgICAgICBtYXRjaGVzLnB1c2goe3F1ZXJ5cG9pbnRJbmRleDogaiwga2V5cG9pbnRJbmRleDogYmVzdEluZGV4fSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG1hdGNoZXMubGVuZ3RoIDwgTUlOX05VTV9JTkxJRVJTKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBjb25zdCBob3VnaE1hdGNoZXMgPSBjb21wdXRlSG91Z2hNYXRjaGVzKHtcbiAgICAgIGtleXBvaW50czoga2V5ZnJhbWUucG9pbnRzLFxuICAgICAgcXVlcnlwb2ludHMsXG4gICAgICBrZXl3aWR0aDoga2V5ZnJhbWUud2lkdGgsXG4gICAgICBrZXloZWlnaHQ6IGtleWZyYW1lLmhlaWdodCxcbiAgICAgIHF1ZXJ5d2lkdGgsXG4gICAgICBxdWVyeWhlaWdodCxcbiAgICAgIG1hdGNoZXMsXG4gICAgfSk7XG5cbiAgICBjb25zdCBzcmNQb2ludHMgPSBbXTtcbiAgICBjb25zdCBkc3RQb2ludHMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhvdWdoTWF0Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgcXVlcnlwb2ludCA9IHF1ZXJ5cG9pbnRzW2hvdWdoTWF0Y2hlc1tpXS5xdWVyeXBvaW50SW5kZXhdO1xuICAgICAgY29uc3Qga2V5cG9pbnQgPSBrZXlwb2ludHNbaG91Z2hNYXRjaGVzW2ldLmtleXBvaW50SW5kZXhdO1xuICAgICAgc3JjUG9pbnRzLnB1c2goWyBrZXlwb2ludC54LCBrZXlwb2ludC55IF0pO1xuICAgICAgZHN0UG9pbnRzLnB1c2goWyBxdWVyeXBvaW50LngsIHF1ZXJ5cG9pbnQueSBdKTtcbiAgICB9XG5cbiAgICBjb25zdCBIID0gY29tcHV0ZUhvbW9ncmFwaHkoe1xuICAgICAgc3JjUG9pbnRzLFxuICAgICAgZHN0UG9pbnRzLFxuICAgICAga2V5ZnJhbWUsXG4gICAgfSk7XG5cbiAgICBpZiAoSCA9PT0gbnVsbCkgY29udGludWU7XG5cbiAgICBjb25zdCBpbmxpZXJNYXRjaGVzID0gX2ZpbmRJbmxpZXJNYXRjaGVzKHtcbiAgICAgIHF1ZXJ5cG9pbnRzLFxuICAgICAga2V5cG9pbnRzOiBrZXlmcmFtZS5wb2ludHMsXG4gICAgICBILFxuICAgICAgbWF0Y2hlczogaG91Z2hNYXRjaGVzLFxuICAgICAgdGhyZXNob2xkOiBJTkxJRVJfVEhSRVNIT0xEXG4gICAgfSk7XG5cblxuICAgIGlmIChpbmxpZXJNYXRjaGVzLmxlbmd0aCA8IE1JTl9OVU1fSU5MSUVSUykge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gZG8gYW5vdGhlciBsb29wIG9mIG1hdGNoIHVzaW5nIHRoZSBob21vZ3JhcGh5XG4gICAgY29uc3QgSEludiA9IG1hdHJpeEludmVyc2UzMyhILCAwLjAwMDAxKTtcbiAgICBjb25zdCBkVGhyZXNob2xkMiA9IDEwICogMTA7XG4gICAgY29uc3QgbWF0Y2hlczIgPSBbXTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHF1ZXJ5cG9pbnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICBjb25zdCBxdWVyeXBvaW50ID0gcXVlcnlwb2ludHNbal07XG4gICAgICBjb25zdCBtYXBxdWVyeXBvaW50ID0gbXVsdGlwbHlQb2ludEhvbW9ncmFwaHlJbmhvbW9nZW5vdXMoW3F1ZXJ5cG9pbnQueCwgcXVlcnlwb2ludC55XSwgSEludik7XG5cbiAgICAgIGxldCBiZXN0SW5kZXggPSAtMTtcbiAgICAgIGxldCBiZXN0RDEgPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUjtcbiAgICAgIGxldCBiZXN0RDIgPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUjtcblxuICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBrZXlwb2ludHMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgY29uc3Qga2V5cG9pbnQgPSBrZXlwb2ludHNba107XG4gICAgICAgIGlmIChrZXlwb2ludC5tYXhpbWEgIT0gcXVlcnlwb2ludC5tYXhpbWEpIGNvbnRpbnVlO1xuXG4gICAgICAgIC8vIGNoZWNrIGRpc3RhbmNlIHRocmVzaG9sZFxuICAgICAgICBjb25zdCBkMiA9IChrZXlwb2ludC54IC0gbWFwcXVlcnlwb2ludFswXSkgKiAoa2V5cG9pbnQueCAtIG1hcHF1ZXJ5cG9pbnRbMF0pXG4gICAgICAgICAgICAgICAgICArIChrZXlwb2ludC55IC0gbWFwcXVlcnlwb2ludFsxXSkgKiAoa2V5cG9pbnQueSAtIG1hcHF1ZXJ5cG9pbnRbMV0pO1xuICAgICAgICBpZiAoZDIgPiBkVGhyZXNob2xkMikgY29udGludWU7XG5cbiAgICAgICAgY29uc3QgZCA9IGhhbW1pbmdDb21wdXRlKHt2MToga2V5cG9pbnQuZGVzY3JpcHRvcnMsIHYyOiBxdWVyeXBvaW50LmRlc2NyaXB0b3JzfSk7XG4gICAgICAgIGlmIChkIDwgYmVzdEQxKSB7XG4gICAgICAgICAgYmVzdEQyID0gYmVzdEQxO1xuICAgICAgICAgIGJlc3REMSA9IGQ7XG4gICAgICAgICAgYmVzdEluZGV4ID0gaztcbiAgICAgICAgfSBlbHNlIGlmIChkIDwgYmVzdEQyKSB7XG4gICAgICAgICAgYmVzdEQyID0gZDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoYmVzdEluZGV4ICE9PSAtMSAmJiAoYmVzdEQyID09PSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUiB8fCAoMS4wICogYmVzdEQxIC8gYmVzdEQyKSA8IEhBTU1JTkdfVEhSRVNIT0xEKSkge1xuICAgICAgICBtYXRjaGVzMi5wdXNoKHtxdWVyeXBvaW50SW5kZXg6IGosIGtleXBvaW50SW5kZXg6IGJlc3RJbmRleH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGhvdWdoTWF0Y2hlczIgPSBjb21wdXRlSG91Z2hNYXRjaGVzKHtcbiAgICAgIGtleXBvaW50czoga2V5ZnJhbWUucG9pbnRzLFxuICAgICAgcXVlcnlwb2ludHMsXG4gICAgICBrZXl3aWR0aDoga2V5ZnJhbWUud2lkdGgsXG4gICAgICBrZXloZWlnaHQ6IGtleWZyYW1lLmhlaWdodCxcbiAgICAgIHF1ZXJ5d2lkdGgsXG4gICAgICBxdWVyeWhlaWdodCxcbiAgICAgIG1hdGNoZXM6IG1hdGNoZXMyLFxuICAgIH0pO1xuXG4gICAgY29uc3Qgc3JjUG9pbnRzMiA9IFtdO1xuICAgIGNvbnN0IGRzdFBvaW50czIgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhvdWdoTWF0Y2hlczIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHF1ZXJ5cG9pbnQgPSBxdWVyeXBvaW50c1tob3VnaE1hdGNoZXMyW2ldLnF1ZXJ5cG9pbnRJbmRleF07XG4gICAgICBjb25zdCBrZXlwb2ludCA9IGtleXBvaW50c1tob3VnaE1hdGNoZXMyW2ldLmtleXBvaW50SW5kZXhdO1xuICAgICAgc3JjUG9pbnRzMi5wdXNoKFsga2V5cG9pbnQueCwga2V5cG9pbnQueSBdKTtcbiAgICAgIGRzdFBvaW50czIucHVzaChbIHF1ZXJ5cG9pbnQueCwgcXVlcnlwb2ludC55IF0pO1xuICAgIH1cblxuICAgIGNvbnN0IEgyID0gY29tcHV0ZUhvbW9ncmFwaHkoe1xuICAgICAgc3JjUG9pbnRzOiBzcmNQb2ludHMyLFxuICAgICAgZHN0UG9pbnRzOiBkc3RQb2ludHMyLFxuICAgICAga2V5ZnJhbWVcbiAgICB9KTtcblxuICAgIGlmIChIMiA9PT0gbnVsbCkgY29udGludWU7XG5cbiAgICBjb25zdCBpbmxpZXJNYXRjaGVzMiA9IF9maW5kSW5saWVyTWF0Y2hlcyh7XG4gICAgICBxdWVyeXBvaW50cyxcbiAgICAgIGtleXBvaW50czoga2V5ZnJhbWUucG9pbnRzLFxuICAgICAgSDogSDIsXG4gICAgICBtYXRjaGVzOiBob3VnaE1hdGNoZXMyLFxuICAgICAgdGhyZXNob2xkOiBJTkxJRVJfVEhSRVNIT0xEXG4gICAgfSk7XG5cbiAgICBpZiAoaW5saWVyTWF0Y2hlczIubGVuZ3RoIDwgTUlOX05VTV9JTkxJRVJTKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAocmVzdWx0ID09PSBudWxsIHx8IHJlc3VsdC5tYXRjaGVzLmxlbmd0aCA8IGlubGllck1hdGNoZXMyLmxlbmd0aCkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBrZXlmcmFtZUluZGV4OiBpLFxuICAgICAgICBtYXRjaGVzOiBpbmxpZXJNYXRjaGVzMixcbiAgICAgICAgSDogSDIsXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbmNvbnN0IF9xdWVyeSA9ICh7bm9kZSwga2V5cG9pbnRzLCBxdWVyeXBvaW50LCBxdWV1ZSwga2V5cG9pbnRJbmRleGVzLCBudW1Qb3B9KSA9PiB7XG4gIGlmIChub2RlLmxlYWYpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGUucG9pbnRJbmRleGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBrZXlwb2ludEluZGV4ZXMucHVzaChub2RlLnBvaW50SW5kZXhlc1tpXSk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGRpc3RhbmNlcyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBjaGlsZE5vZGUgPSBub2RlLmNoaWxkcmVuW2ldO1xuICAgIGNvbnN0IGNlbnRlclBvaW50SW5kZXggPSBjaGlsZE5vZGUuY2VudGVyUG9pbnRJbmRleDtcbiAgICBjb25zdCBkID0gaGFtbWluZ0NvbXB1dGUoe3YxOiBrZXlwb2ludHNbY2VudGVyUG9pbnRJbmRleF0uZGVzY3JpcHRvcnMsIHYyOiBxdWVyeXBvaW50LmRlc2NyaXB0b3JzfSk7XG4gICAgZGlzdGFuY2VzLnB1c2goZCk7XG4gIH1cblxuICBsZXQgbWluRCA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICBtaW5EID0gTWF0aC5taW4obWluRCwgZGlzdGFuY2VzW2ldKTtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgIGlmIChkaXN0YW5jZXNbaV0gIT09IG1pbkQpIHtcbiAgICAgIHF1ZXVlLnB1c2goe25vZGU6IG5vZGUuY2hpbGRyZW5baV0sIGQ6IGRpc3RhbmNlc1tpXX0pO1xuICAgIH1cbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoZGlzdGFuY2VzW2ldID09PSBtaW5EKSB7XG4gICAgICBfcXVlcnkoe25vZGU6IG5vZGUuY2hpbGRyZW5baV0sIGtleXBvaW50cywgcXVlcnlwb2ludCwgcXVldWUsIGtleXBvaW50SW5kZXhlcywgbnVtUG9wfSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKG51bVBvcCA8IENMVVNURVJfTUFYX1BPUCAmJiBxdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgY29uc3Qge25vZGUsIGR9ID0gcXVldWUucG9wKCk7XG4gICAgbnVtUG9wICs9IDE7XG4gICAgX3F1ZXJ5KHtub2RlLCBrZXlwb2ludHMsIHF1ZXJ5cG9pbnQsIHF1ZXVlLCBrZXlwb2ludEluZGV4ZXMsIG51bVBvcH0pO1xuICB9XG59O1xuXG5jb25zdCBfZmluZElubGllck1hdGNoZXMgPSAob3B0aW9ucykgPT4ge1xuICBjb25zdCB7a2V5cG9pbnRzLCBxdWVyeXBvaW50cywgSCwgbWF0Y2hlcywgdGhyZXNob2xkfSA9IG9wdGlvbnM7XG5cbiAgY29uc3QgdGhyZXNob2xkMiA9IHRocmVzaG9sZCAqIHRocmVzaG9sZDtcblxuICBjb25zdCBnb29kTWF0Y2hlcyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG1hdGNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBxdWVyeXBvaW50ID0gcXVlcnlwb2ludHNbbWF0Y2hlc1tpXS5xdWVyeXBvaW50SW5kZXhdO1xuICAgIGNvbnN0IGtleXBvaW50ID0ga2V5cG9pbnRzW21hdGNoZXNbaV0ua2V5cG9pbnRJbmRleF07XG4gICAgY29uc3QgbXAgPSBtdWx0aXBseVBvaW50SG9tb2dyYXBoeUluaG9tb2dlbm91cyhba2V5cG9pbnQueCwga2V5cG9pbnQueV0sIEgpO1xuICAgIGNvbnN0IGQyID0gKG1wWzBdIC0gcXVlcnlwb2ludC54KSAqIChtcFswXSAtIHF1ZXJ5cG9pbnQueCkgKyAobXBbMV0gLSBxdWVyeXBvaW50LnkpICogKG1wWzFdIC0gcXVlcnlwb2ludC55KTtcbiAgICBpZiAoZDIgPD0gdGhyZXNob2xkMikge1xuICAgICAgZ29vZE1hdGNoZXMucHVzaCggbWF0Y2hlc1tpXSApO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZ29vZE1hdGNoZXM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBtYXRjaFxufVxuIiwiLy8gY2hlY2sgd2hpY2ggc2lkZSBwb2ludCBDIG9uIHRoZSBsaW5lIGZyb20gQSB0byBCXG5jb25zdCBsaW5lUG9pbnRTaWRlID0gKEEsIEIsIEMpID0+IHtcbiAgcmV0dXJuICgoQlswXS1BWzBdKSooQ1sxXS1BWzFdKS0oQlsxXS1BWzFdKSooQ1swXS1BWzBdKSk7XG59XG5cbi8vIHNyY1BvaW50cywgZHN0UG9pbnRzOiBhcnJheSBvZiBmb3VyIGVsZW1lbnRzIFt4LCB5XVxuY29uc3QgY2hlY2tGb3VyUG9pbnRzQ29uc2lzdGVudCA9ICh4MSwgeDIsIHgzLCB4NCwgeDFwLCB4MnAsIHgzcCwgeDRwKSA9PiB7XG4gIGlmICgobGluZVBvaW50U2lkZSh4MSwgeDIsIHgzKSA+IDApICE9PSAobGluZVBvaW50U2lkZSh4MXAsIHgycCwgeDNwKSA+IDApKSByZXR1cm4gZmFsc2U7XG4gIGlmICgobGluZVBvaW50U2lkZSh4MiwgeDMsIHg0KSA+IDApICE9PSAobGluZVBvaW50U2lkZSh4MnAsIHgzcCwgeDRwKSA+IDApKSByZXR1cm4gZmFsc2U7XG4gIGlmICgobGluZVBvaW50U2lkZSh4MywgeDQsIHgxKSA+IDApICE9PSAobGluZVBvaW50U2lkZSh4M3AsIHg0cCwgeDFwKSA+IDApKSByZXR1cm4gZmFsc2U7XG4gIGlmICgobGluZVBvaW50U2lkZSh4NCwgeDEsIHgyKSA+IDApICE9PSAobGluZVBvaW50U2lkZSh4NHAsIHgxcCwgeDJwKSA+IDApKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiB0cnVlO1xufVxuXG5jb25zdCBjaGVja1RocmVlUG9pbnRzQ29uc2lzdGVudCA9ICh4MSwgeDIsIHgzLCB4MXAsIHgycCwgeDNwKSA9PiB7XG4gIGlmICgobGluZVBvaW50U2lkZSh4MSwgeDIsIHgzKSA+IDApICE9PSAobGluZVBvaW50U2lkZSh4MXAsIHgycCwgeDNwKSA+IDApKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiB0cnVlO1xufVxuXG5jb25zdCBkZXRlcm1pbmFudCA9IChBKSA9PiB7XG4gIGNvbnN0IEMxID0gIEFbNF0gKiBBWzhdIC0gQVs1XSAqIEFbN107XG4gIGNvbnN0IEMyID0gIEFbM10gKiBBWzhdIC0gQVs1XSAqIEFbNl07XG4gIGNvbnN0IEMzID0gIEFbM10gKiBBWzddIC0gQVs0XSAqIEFbNl07XG4gIHJldHVybiBBWzBdICogQzEgLSBBWzFdICogQzIgKyBBWzJdICogQzM7XG59XG5cbmNvbnN0IG1hdHJpeEludmVyc2UzMyA9IChBLCB0aHJlc2hvbGQpID0+IHtcbiAgY29uc3QgZGV0ID0gZGV0ZXJtaW5hbnQoQSk7XG4gIGlmIChNYXRoLmFicyhkZXQpIDw9IHRocmVzaG9sZCkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IG9uZU92ZXIgPSAxLjAgLyBkZXQ7XG5cbiAgY29uc3QgQiA9IFtcbiAgICAoQVs0XSAqIEFbOF0gLSBBWzVdICogQVs3XSkgKiBvbmVPdmVyLFxuICAgIChBWzJdICogQVs3XSAtIEFbMV0gKiBBWzhdKSAqIG9uZU92ZXIsXG4gICAgKEFbMV0gKiBBWzVdIC0gQVsyXSAqIEFbNF0pICogb25lT3ZlcixcbiAgICAoQVs1XSAqIEFbNl0gLSBBWzNdICogQVs4XSkgKiBvbmVPdmVyLFxuICAgIChBWzBdICogQVs4XSAtIEFbMl0gKiBBWzZdKSAqIG9uZU92ZXIsXG4gICAgKEFbMl0gKiBBWzNdIC0gQVswXSAqIEFbNV0pICogb25lT3ZlcixcbiAgICAoQVszXSAqIEFbN10gLSBBWzRdICogQVs2XSkgKiBvbmVPdmVyLFxuICAgIChBWzFdICogQVs2XSAtIEFbMF0gKiBBWzddKSAqIG9uZU92ZXIsXG4gICAgKEFbMF0gKiBBWzRdIC0gQVsxXSAqIEFbM10pICogb25lT3ZlcixcbiAgXTtcbiAgcmV0dXJuIEI7XG59XG5cbmNvbnN0IG1hdHJpeE11bDMzID0gKEEsIEIpID0+IHtcbiAgY29uc3QgQyA9IFtdO1xuICBDWzBdID0gQVswXSpCWzBdICsgQVsxXSpCWzNdICsgQVsyXSpCWzZdO1xuICBDWzFdID0gQVswXSpCWzFdICsgQVsxXSpCWzRdICsgQVsyXSpCWzddO1xuICBDWzJdID0gQVswXSpCWzJdICsgQVsxXSpCWzVdICsgQVsyXSpCWzhdO1xuICBDWzNdID0gQVszXSpCWzBdICsgQVs0XSpCWzNdICsgQVs1XSpCWzZdO1xuICBDWzRdID0gQVszXSpCWzFdICsgQVs0XSpCWzRdICsgQVs1XSpCWzddO1xuICBDWzVdID0gQVszXSpCWzJdICsgQVs0XSpCWzVdICsgQVs1XSpCWzhdO1xuICBDWzZdID0gQVs2XSpCWzBdICsgQVs3XSpCWzNdICsgQVs4XSpCWzZdO1xuICBDWzddID0gQVs2XSpCWzFdICsgQVs3XSpCWzRdICsgQVs4XSpCWzddO1xuICBDWzhdID0gQVs2XSpCWzJdICsgQVs3XSpCWzVdICsgQVs4XSpCWzhdO1xuICByZXR1cm4gQztcbn1cblxuY29uc3QgbXVsdGlwbHlQb2ludEhvbW9ncmFwaHlJbmhvbW9nZW5vdXMgPSAoeCwgSCkgPT4ge1xuICBjb25zdCB3ID0gSFs2XSp4WzBdICsgSFs3XSp4WzFdICsgSFs4XTtcbiAgY29uc3QgeHAgPSBbXTtcbiAgeHBbMF0gPSAoSFswXSp4WzBdICsgSFsxXSp4WzFdICsgSFsyXSkvdztcbiAgeHBbMV0gPSAoSFszXSp4WzBdICsgSFs0XSp4WzFdICsgSFs1XSkvdztcbiAgcmV0dXJuIHhwO1xufVxuXG5jb25zdCBzbWFsbGVzdFRyaWFuZ2xlQXJlYSA9ICh4MSwgeDIsIHgzLCB4NCkgPT4ge1xuICBjb25zdCB2MTIgPSBfdmVjdG9yKHgyLCB4MSk7XG4gIGNvbnN0IHYxMyA9IF92ZWN0b3IoeDMsIHgxKTtcbiAgY29uc3QgdjE0ID0gX3ZlY3Rvcih4NCwgeDEpO1xuICBjb25zdCB2MzIgPSBfdmVjdG9yKHgyLCB4Myk7XG4gIGNvbnN0IHYzNCA9IF92ZWN0b3IoeDQsIHgzKTtcbiAgY29uc3QgYTEgPSBfYXJlYU9mVHJpYW5nbGUodjEyLCB2MTMpO1xuICBjb25zdCBhMiA9IF9hcmVhT2ZUcmlhbmdsZSh2MTMsIHYxNCk7XG4gIGNvbnN0IGEzID0gX2FyZWFPZlRyaWFuZ2xlKHYxMiwgdjE0KTtcbiAgY29uc3QgYTQgPSBfYXJlYU9mVHJpYW5nbGUodjMyLCB2MzQpO1xuICByZXR1cm4gTWF0aC5taW4oTWF0aC5taW4oTWF0aC5taW4oYTEsIGEyKSwgYTMpLCBhNCk7XG59XG5cbi8vIGNoZWNrIGlmIGZvdXIgcG9pbnRzIGZvcm0gYSBjb252ZXggcXVhZHJpbGF0ZXJuYWwuXG4vLyBhbGwgZm91ciBjb21iaW5hdGlvbnMgc2hvdWxkIGhhdmUgc2FtZSBzaWduXG5jb25zdCBxdWFkcmlsYXRlcmFsQ29udmV4ID0gKHgxLCB4MiwgeDMsIHg0KSA9PiB7XG4gIGNvbnN0IGZpcnN0ID0gbGluZVBvaW50U2lkZSh4MSwgeDIsIHgzKSA8PSAwO1xuICBpZiAoIChsaW5lUG9pbnRTaWRlKHgyLCB4MywgeDQpIDw9IDApICE9PSBmaXJzdCkgcmV0dXJuIGZhbHNlO1xuICBpZiAoIChsaW5lUG9pbnRTaWRlKHgzLCB4NCwgeDEpIDw9IDApICE9PSBmaXJzdCkgcmV0dXJuIGZhbHNlO1xuICBpZiAoIChsaW5lUG9pbnRTaWRlKHg0LCB4MSwgeDIpIDw9IDApICE9PSBmaXJzdCkgcmV0dXJuIGZhbHNlO1xuXG4gIC8vaWYgKGxpbmVQb2ludFNpZGUoeDEsIHgyLCB4MykgPD0gMCkgcmV0dXJuIGZhbHNlO1xuICAvL2lmIChsaW5lUG9pbnRTaWRlKHgyLCB4MywgeDQpIDw9IDApIHJldHVybiBmYWxzZTtcbiAgLy9pZiAobGluZVBvaW50U2lkZSh4MywgeDQsIHgxKSA8PSAwKSByZXR1cm4gZmFsc2U7XG4gIC8vaWYgKGxpbmVQb2ludFNpZGUoeDQsIHgxLCB4MikgPD0gMCkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuY29uc3QgX3ZlY3RvciA9IChhLCBiKSA9PiB7XG4gIHJldHVybiBbXG4gICAgYVswXSAtIGJbMF0sXG4gICAgYVsxXSAtIGJbMV1cbiAgXVxufVxuXG5jb25zdCBfYXJlYU9mVHJpYW5nbGUgPSAodSwgdikgPT4ge1xuICBjb25zdCBhID0gdVswXSp2WzFdIC0gdVsxXSp2WzBdO1xuICByZXR1cm4gTWF0aC5hYnMoYSkgKiAwLjU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBtYXRyaXhJbnZlcnNlMzMsXG4gIG1hdHJpeE11bDMzLFxuICBxdWFkcmlsYXRlcmFsQ29udmV4LFxuICBzbWFsbGVzdFRyaWFuZ2xlQXJlYSxcbiAgbXVsdGlwbHlQb2ludEhvbW9ncmFwaHlJbmhvbW9nZW5vdXMsXG4gIGNoZWNrVGhyZWVQb2ludHNDb25zaXN0ZW50LFxuICBjaGVja0ZvdXJQb2ludHNDb25zaXN0ZW50LFxuICBkZXRlcm1pbmFudFxufVxuXG4iLCJjb25zdCBtUmFuZFNlZWQgPSAxMjM0O1xuXG5jb25zdCBjcmVhdGVSYW5kb21pemVyID0gKCkgPT4ge1xuICBjb25zdCByYW5kb21pemVyID0ge1xuICAgIHNlZWQ6IG1SYW5kU2VlZCxcblxuICAgIGFycmF5U2h1ZmZsZShvcHRpb25zKSB7XG4gICAgICBjb25zdCB7YXJyLCBzYW1wbGVTaXplfSA9IG9wdGlvbnM7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNhbXBsZVNpemU7IGkrKykge1xuXG4gICAgICAgIHRoaXMuc2VlZCA9ICgyMTQwMTMgKiB0aGlzLnNlZWQgKyAyNTMxMDExKSAlICgxIDw8IDMxKTtcbiAgICAgICAgbGV0IGsgPSAodGhpcy5zZWVkID4+IDE2KSAmIDB4N2ZmZjtcbiAgICAgICAgayA9IGsgJSBhcnIubGVuZ3RoO1xuXG4gICAgICAgIGxldCB0bXAgPSBhcnJbaV07XG4gICAgICAgIGFycltpXSA9IGFycltrXTtcbiAgICAgICAgYXJyW2tdID0gdG1wO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBuZXh0SW50KG1heFZhbHVlKSB7XG4gICAgICB0aGlzLnNlZWQgPSAoMjE0MDEzICogdGhpcy5zZWVkICsgMjUzMTAxMSkgJSAoMSA8PCAzMSk7XG4gICAgICBsZXQgayA9ICh0aGlzLnNlZWQgPj4gMTYpICYgMHg3ZmZmO1xuICAgICAgayA9IGsgJSBtYXhWYWx1ZTtcbiAgICAgIHJldHVybiBrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmFuZG9taXplcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNyZWF0ZVJhbmRvbWl6ZXJcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=