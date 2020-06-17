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

/***/ "./src/controller.js":
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const {ImageTarget} = __webpack_require__(/*! ./image-target/index.js */ "./src/image-target/index.js");

class Controller {
  constructor(inputWidth, inputHeight) {
    this._imageTargets = [];

    // TODO: non-hardcoded camera matrix?
    //     [fx  s cx]
    // K = [ 0 fx cy]
    //     [ 0  0  1]
    this._projectionTransform = [
      [ 304.68270459335025, 0, 161.7239532470703],
      [ 0, 303.2606118015537, 118.80326843261719],
      [ 0, 0, 1.0]
    ];

    this._projectionMatrix = _glProjectionMatrix({
      projectionTransform: this._projectionTransform,
      width: inputWidth - 1, // -1 is not necessary?
      height: inputHeight - 1,
      near: 0.0001,
      far: 1000.0
    });
  }

  getProjectionMatrix() {
    return this._projectionMatrix;
  }

  addImageTarget(options) {
    const imageTarget = new ImageTarget(options);
    this._imageTargets.push(imageTarget);
  }

  process(queryImage) {
    const result = [];
    this._imageTargets.forEach((imageTarget) => {
      const modelViewTransform = imageTarget.process(queryImage);
      const worldMatrix = modelViewTransform === null? null: _glModelViewMatrix({modelViewTransform});

      result.push({
        worldMatrix: worldMatrix
      })
    });
    return result;
  }
}

// build openGL modelView matrix
const _glModelViewMatrix = ({modelViewTransform}) => {
  const openGLWorldMatrix = [
    modelViewTransform[0][0], -modelViewTransform[1][0], -modelViewTransform[2][0], 0,
    modelViewTransform[0][1], -modelViewTransform[1][1], -modelViewTransform[2][1], 0,
    modelViewTransform[0][2], -modelViewTransform[1][2], -modelViewTransform[2][2], 0,
    modelViewTransform[0][3], -modelViewTransform[1][3], -modelViewTransform[2][3], 1
  ];
  return openGLWorldMatrix;
}

// build openGL projection matrix
const _glProjectionMatrix = ({projectionTransform, width, height, near, far}) => {
  const proj = [
    [2 * projectionTransform[0][0] / width, 0, -(2 * projectionTransform[0][2] / width - 1), 0],
    [0, 2 * projectionTransform[1][1] / height, -(2 * projectionTransform[1][2] / height - 1), 0],
    [0, 0, -(far + near) / (far - near), -2 * far * near / (far - near)],
    [0, 0, -1, 0]
  ];

  const projMatrix = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      projMatrix.push(proj[j][i]);
    }
  }
  return projMatrix;
}

module.exports = {
  Controller,
}


/***/ }),

/***/ "./src/image-target/icp/estimate_homography.js":
/*!*****************************************************!*\
  !*** ./src/image-target/icp/estimate_homography.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const {Matrix, inverse} = __webpack_require__(/*! ml-matrix */ "./node_modules/ml-matrix/src/index.js");
const {refineHomography} = __webpack_require__(/*! ./refine_homography */ "./src/image-target/icp/refine_homography.js");
const {getProjectionTransform, applyModelViewProjectionTransform, buildModelViewProjectionTransform, computeScreenCoordiate} = __webpack_require__(/*! ./utils.js */ "./src/image-target/icp/utils.js");

const KData = getProjectionTransform();
// build world matrix with list of matching worldCoords|screenCoords
// Ref: https://www.uio.no/studier/emner/matnat/its/TEK5030/v19/lect/lecture_4_3-estimating-homographies-from-feature-correspondences.pdf  (Basic homography estimation from points)

const estimateHomography = ({screenCoords, worldCoords}) => {
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
  //console.log("homography: ", H.toString());
  //
  //console.log("matA:", A.toString(), '---vs---', debugContent.matA);
  //console.log("matC:", H.toString(), '---vs---', debugContent.matC);

  const K = new Matrix(KData);
  const KInv = inverse(K);

  const _KInvH = KInv.mmul(H);
  const KInvH = _KInvH.to1DArray();

  //console.log("KInvH", _KInvH, KInvH);

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

  // TODDO artoolkit has check_rotation() (in icpUtil.c file). not sure what that does....

  const tran = []
  tran[0] = KInvH[2] / tnorm;
  tran[1] = KInvH[5] / tnorm;
  tran[2] = KInvH[8] / tnorm;

  let initialModelViewTransform = [
    [rotate[0], rotate[1], rotate[2], tran[0]],
    [rotate[3], rotate[4], rotate[5], tran[1]],
    [rotate[6], rotate[7], rotate[8], tran[2]]
  ];

  // iterate points to improve the matrix
  //console.log("initialModelViewTransform", initialModelViewTransform, '---vs---', debugContent.icp_initMatXw2Xc);
  const {modelViewTransform, err} = refineHomography({initialModelViewTransform, projectionTransform: KData, worldCoords, screenCoords});

  //console.log("adjusted modelViewTransform", modelViewTransform, '---vs---', debugContent.camPose);

  return modelViewTransform;
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
const {getProjectionTransform, applyModelViewProjectionTransform, buildModelViewProjectionTransform, computeScreenCoordiate} = __webpack_require__(/*! ./utils.js */ "./src/image-target/icp/utils.js");

const K2_FACTOR = 4.0;
const ICP_MAX_LOOP = 10;
const ICP_BREAK_LOOP_ERROR_THRESH = 0.1;
const ICP_BREAK_LOOP_ERROR_RATIO_THRESH = 0.99;
const ICP_BREAK_LOOP_ERROR_THRESH2 = 4.0;
const ICP_INLIER_PROBABILITY = 0.50;

// modelviewTransform Rt 3x4
const refineHomography = ({initialModelViewTransform, projectionTransform, worldCoords, screenCoords, isRobustMode, inlierProb, debugContent}) => {
  let modelViewTransform = initialModelViewTransform;

  let err0 = 0.0;
  let err1 = 0.0;
  for (let l = 0; l <= ICP_MAX_LOOP; l++) {

    const modelViewProjectionTransform = buildModelViewProjectionTransform(projectionTransform, modelViewTransform);
    //console.log("mvp", modelViewProjectionTransform);
    //console.log("icp matXw2U", l, debugContent.icp_matXw2U[l]);
    //console.log("icp matXc2U", l, debugContent.icp_matXc2U[l]);
    //console.log("icp matXw2Xc", l, debugContent.icp_matXw2Xc[l]);

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
      E2.sort();
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
    err0 = err1;

    const dU = [];
    const allJ_U_S = [];
    for (let n = 0; n < worldCoords.length; n++) {
      if (isRobustMode && E[n] > K2) {
        continue;
      }

      const J_U_S = _getJ_U_S({modelViewProjectionTransform, modelViewTransform, projectionTransform, worldCoord: worldCoords[n], debugContent});

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

      //console.log("J_U_S", J_U_S, debugContent.icp_J_U_S[l][n]);
      for (let i = 0; i < J_U_S.length; i++) {
        allJ_U_S.push(J_U_S[i]);
      }
    }

    const dS = _getDeltaS({dU, J_U_S: allJ_U_S});
    if (dS === null) continue;
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

_getJ_U_S = ({modelViewProjectionTransform, modelViewTransform, projectionTransform, worldCoord, debugContent}) => {
  const T = modelViewTransform;
  const {x, y, z} = worldCoord;

  const u = applyModelViewProjectionTransform(modelViewProjectionTransform, x, y, z);
  //console.log("u", u);
  //if (Math.abs(u.z) < 0.000001) return null;

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

  //console.log("J_Xc_S", J_Xc_S, '--vs--', '0.', debugContent.icp_J_Xc_S[0], '1.', debugContent.icp_J_Xc_S[1]);
  //console.log("J_U_Xc", J_U_Xc, '--vs--', '0.', debugContent.icp_J_U_Xc[0], '1.', debugContent.icp_J_U_Xc[1]);

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

const getProjectionTransform = () => {
  // TODO: non-hardcoded camera matrix?
  //     [fx  s cx]
  // K = [ 0 fx cy]
  //     [ 0  0  1]
  const KData = [
    [ 304.68270459335025, 0, 161.7239532470703],
    [ 0, 303.2606118015537, 118.80326843261719],
    [ 0, 0, 1.0]
  ];
  return KData;
}

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
  //console.log("x, y, z", ux, uy, uz);
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
  getProjectionTransform,
  buildModelViewProjectionTransform,
  applyModelViewProjectionTransform,
  computeScreenCoordiate
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
const {Matcher, compileMatching} = __webpack_require__(/*! ./matching/matcher.js */ "./src/image-target/matching/matcher.js");
const {Tracker, compileTracking} = __webpack_require__(/*! ./tracking/tracker.js */ "./src/image-target/tracking/tracker.js");

class ImageTarget {
  constructor(options) {
    let imageList;
    let targetImage;
    let matchingData;
    let trackingData;

    if (options.type === 'compiled') {
      targetImage = options.input.targetImage;
      matchingData = options.input.matchingData;
      trackingData = options.input.trackingData;
      imageList = buildImageList(targetImage);
    } else {
      targetImage = options.input;
      imageList = buildImageList(targetImage);
      matchingData = compileMatching({imageList});
      trackingData = compileTracking({imageList});
    }
    console.log("image target consdtructor", imageList, matchingData, trackingData);
    this.matcher = new Matcher(matchingData);
    //this.tracker = new Tracker(imageList);
  }

  process(queryImage) {
    //const processImage = Object.assign(resize({image: queryImage, ratio: 0.5}), {dpi: 72});
    const processImage = Object.assign(resize({image: queryImage, ratio: 1}), {dpi: 72});
    const modelViewTransform = this.matcher.match(processImage);
    return modelViewTransform;
  }
}

const compile = (targetImage) => {
  const imageList = buildImageList(targetImage);
  const matchingData = compileMatching({imageList});
  const trackingData = compileTracking({imageList});
  return {targetImage, matchingData, trackingData};
}

module.exports = {
  ImageTarget,
  compile
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

/***/ "./src/image-target/matching/homography.js":
/*!*************************************************!*\
  !*** ./src/image-target/matching/homography.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const {createRandomizer} = __webpack_require__(/*! ../utils/randomizer.js */ "./src/image-target/utils/randomizer.js");
const {quadrilateralConvex, matrixInverse33, smallestTriangleArea, multiplyPointHomographyInhomogenous, checkThreePointsConsistent, checkFourPointsConsistent, determinant} = __webpack_require__(/*! ../utils/geometry.js */ "./src/image-target/utils/geometry.js");

const EPSILON = 0.000000001;
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
  console.log("final H Inv: ", HInv);
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
  const res1 = _condition4Points2d({x1: srcPoints[0], x2: srcPoints[1], x3: srcPoints[2], x4: srcPoints[3]});

  if (res1 === null) return null;

  const res2 = _condition4Points2d({x1: dstPoints[0], x2: dstPoints[1], x3: dstPoints[2], x4: dstPoints[3]});
  if (res2 === null) return null;

  const Hn = _solveHomography4PointsInhomogenous({
    x1: res1.xp1, x2: res1.xp2, x3: res1.xp3, x4: res1.xp4,
    xp1: res2.xp1, xp2: res2.xp2, xp3: res2.xp3, xp4: res2.xp4,
  });

  if (Hn === null) return null;

  if (Math.abs(determinant(Hn)) < EPSILON) return null;

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
    //console.log("ssmax: ", ss[maxRow]);
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

  // compute x from Q
  const w = [];
  const X = [];
  for (let row = 0; row < 8; row++) {
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

  let maxRow = -1;
  let maxValue = -1;
  for (let j = 0; j < 8; j++) {
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

  console.log("hough voted: ", {binX, binY, binAngle, binScale, maxVoteIndex});

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

const {build: buildGaussianPyramid} = __webpack_require__(/*! ./gaussian-pyramid */ "./src/image-target/matching/gaussian-pyramid.js");
const {build: buildDoGPyramid} = __webpack_require__(/*! ./dog-pyramid */ "./src/image-target/matching/dog-pyramid.js");
const {build: hierarchicalClusteringBuild} = __webpack_require__(/*! ./hierarchical-clustering.js */ "./src/image-target/matching/hierarchical-clustering.js");
const {detect} = __webpack_require__(/*! ./detector */ "./src/image-target/matching/detector.js");
const {extract} = __webpack_require__(/*! ./freak-extractor */ "./src/image-target/matching/freak-extractor.js");
const {match} = __webpack_require__(/*! ./matching */ "./src/image-target/matching/matching.js");
const {estimateHomography} = __webpack_require__(/*! ../icp/estimate_homography.js */ "./src/image-target/icp/estimate_homography.js");

const PYRAMID_NUM_SCALES_PER_OCTAVES = 3;
const PYRAMID_MIN_COARSE_SIZE = 8;
const FEATURE_DENSITY = 100;

class Matcher {
  constructor(matchingData) {
    this.keyframes = matchingData.keyframes;
  }

  match(targetImage) {
    const querypoints = _extractPoints({image: targetImage});
    console.log("querypoints", querypoints);
    console.log("keyframes", this.keyframes);
    const result = match({keyframes: this.keyframes, querypoints: querypoints, querywidth: targetImage.width, queryheight: targetImage.height});
    console.log("result", result);
    if (result === null) return null;
    //const match = ({keyframes, querypoints, querywidth, queryheight}) => {

    const screenCoords = [];
    const worldCoords = [];
    const keyframe = this.keyframes[result.keyframeIndex];
    for (let i = 0; i < result.matches.length; i++) {
      const querypointIndex = result.matches[i].querypointIndex;
      const keypointIndex = result.matches[i].keypointIndex;
      screenCoords.push({
        x: querypoints[querypointIndex].x2D,
        y: querypoints[querypointIndex].y2D,
      })
      worldCoords.push({
        x: keyframe.points[keypointIndex].x3D,
        y: keyframe.points[keypointIndex].y3D,
        z: 0,
      })
    }
    const modelViewTransform = estimateHomography({screenCoords, worldCoords});
    return modelViewTransform
  }
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

const compileMatching = ({imageList}) => {
  const keyframes = _buildKeyframes({imageList});
  return {keyframes};
}

module.exports = {
  Matcher,
  compileMatching
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

const kHomographyInlierThreshold = 3;
const kMinNumInliers = 8;
const mMaxNodesToPop = 8;
const mThreshold = 0.7;
const kHoughBinDelta = 1;

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
      if (bestIndex !== -1 && (bestD2 === Number.MAX_SAFE_INTEGER || (1.0 * bestD1 / bestD2) < mThreshold)) {
        matches.push({querypointIndex: j, keypointIndex: bestIndex});
      }
    }

    if (matches.length < kMinNumInliers) {
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
    console.log("hough matches1 length", houghMatches.length, houghMatches);

    const srcPoints = [];
    const dstPoints = [];
    for (let i = 0; i < houghMatches.length; i++) {
      const querypoint = querypoints[houghMatches[i].querypointIndex];
      const keypoint = keypoints[houghMatches[i].keypointIndex];
      srcPoints.push([ keypoint.x2D, keypoint.y2D ]);
      dstPoints.push([ querypoint.x2D, querypoint.y2D ]);
    }

    const H = computeHomography({
      srcPoints,
      dstPoints,
      keyframe,
    });

    console.log("final H", H);

    if (H === null) continue;

    const inlierMatches = _findInlierMatches({
      querypoints,
      keypoints: keyframe.points,
      H,
      matches: houghMatches,
      threshold: kHomographyInlierThreshold
    });


    if (inlierMatches.length < kMinNumInliers) {
      continue;
    }

    // do another loop of match using the homography
    const HInv = matrixInverse33(H, 0.00001);
    const dThreshold2 = 10 * 10;
    const matches2 = [];
    for (let j = 0; j < querypoints.length; j++) {
      const querypoint = querypoints[j];
      const mapquerypoint = multiplyPointHomographyInhomogenous([querypoint.x2D, querypoint.y2D], HInv);

      let bestIndex = -1;
      let bestD1 = Number.MAX_SAFE_INTEGER;
      let bestD2 = Number.MAX_SAFE_INTEGER;

      for (let k = 0; k < keypoints.length; k++) {
        const keypoint = keypoints[k];
        if (keypoint.maxima != querypoint.maxima) continue;

        // check distance threshold
        const d2 = (keypoint.x2D - mapquerypoint[0]) * (keypoint.x2D - mapquerypoint[0])
                  + (keypoint.y2D - mapquerypoint[1]) * (keypoint.y2D - mapquerypoint[1]);
        if (d2 > dThreshold2) continue;

        // TODO: optimize, hamming distance might have been computed before. can cache?
        const d = hammingCompute({v1: keypoint.descriptors, v2: querypoint.descriptors});
        if (d < bestD1) {
          bestD2 = bestD1;
          bestD1 = d;
          bestIndex = k;
        } else if (d < bestD2) {
          bestD2 = d;
        }
      }

      if (bestIndex !== -1 && (bestD2 === Number.MAX_SAFE_INTEGER || (1.0 * bestD1 / bestD2) < mThreshold)) {
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
    console.log("hough matches2 length", houghMatches2.length, houghMatches2);

    const srcPoints2 = [];
    const dstPoints2 = [];
    for (let i = 0; i < houghMatches2.length; i++) {
      const querypoint = querypoints[houghMatches2[i].querypointIndex];
      const keypoint = keypoints[houghMatches2[i].keypointIndex];
      srcPoints2.push([ keypoint.x2D, keypoint.y2D ]);
      dstPoints2.push([ querypoint.x2D, querypoint.y2D ]);
    }

    const H2 = computeHomography({
      srcPoints: srcPoints2,
      dstPoints: dstPoints2,
      keyframe
    });

    console.log("final H2", H2);

    if (H2 === null) continue;

    const inlierMatches2 = _findInlierMatches({
      querypoints,
      keypoints: keyframe.points,
      H: H2,
      matches: houghMatches2,
      threshold: kHomographyInlierThreshold
    });

    if (inlierMatches2.length < kMinNumInliers) {
      continue;
    }

    if (inlierMatches2.length < kMinNumInliers) {
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

  if (numPop < mMaxNodesToPop && queue.length > 0) {
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
    const mp = multiplyPointHomographyInhomogenous([keypoint.x2D, keypoint.y2D], H);
    const d2 = (mp[0] - querypoint.x2D) * (mp[0] - querypoint.x2D) + (mp[1] - querypoint.y2D) * (mp[1] - querypoint.y2D);
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

/***/ "./src/image-target/tracking/extractor.js":
/*!************************************************!*\
  !*** ./src/image-target/tracking/extractor.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

const SEARCH_SIZE1 = 10;
const SEARCH_SIZE2 = 2;
const TEMPLATE_SIZE = 22;
const MAP_SEARCH_SIZE1 = 10;
const MAP_SEARCH_SIZE2 = 2;
const MAX_SIM_THRESH = 0.95;
const TEMPLATE_SD_THRESH = 5.0;

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
const extract = (options) => {
  const {imageData, width, height, dpi} = options;

  // Step 1 - filter out interesting points. Interesting points have strong pixel value changed across neighbours
  const isPixelSelected = [width * height];
  for (let i = 0; i < isPixelSelected.length; i++) isPixelSelected[i] = false;

  // Step 1.1 consider a pixel at position (x, y). compute:
  //   dx = ((data[x+1, y-1] - data[x-1, y-1]) + (data[x+1, y] - data[x-1, y]) + (data[x+1, y+1] - data[x-1, y-1])) * 256 / 3
  //   dy = ((data[x+1, y+1] - data[x+1, y-1]) + (data[x, y+1] - data[x, y-1]) + (data[x-1, y+1] - data[x-1, y-1])) * 256 / 3
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
  const dValueHist = new Uint8Array(1000);
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
        if (k > 999) k = 999;
        if (k < 0) k = 0;
        dValueHist[k] += 1;
        allCount += 1;
        isPixelSelected[pos] = true;
      }
    }
  }

  const maxPoints = 0.02 * width * height;
  let k = 999;
  let filteredCount = 0;
  while (k >= 0) {
    filteredCount += dValueHist[k];
    if (filteredCount > maxPoints) break;
    k--;
  }

  console.log("image size: ", width * height);
  console.log("extracted featues: ", allCount);
  console.log("filtered featues: ", filteredCount);

  for (let i = 0; i < isPixelSelected.length; i++) {
    if (isPixelSelected[i]) {
      if (dValue[i] * 1000 < k) isPixelSelected[i] = false;
    }
  }

  console.log("selected count: ", isPixelSelected.reduce((a, b) => {return a + (b?1:0);}, 0));

  // Step 2
  const featureMap = new Float32Array(imageData.length);
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const pos = j * width + i;
      if (!isPixelSelected[pos]) {
        featureMap[pos] = 1.0;
        continue;
      }

      const ret = _makeTemplate({imageData: imageData, width: width, height: height, cx: i, cy: j, templateSize: TEMPLATE_SIZE, sdThresh: TEMPLATE_SD_THRESH});
      if (ret === null) {
        featureMap[pos] = 1.0;
        continue;
      }

      const {template, vlen} = ret;

      let max = -1.0;
      for (let ii = -SEARCH_SIZE1; ii <= SEARCH_SIZE1; ii++) {
        for (let jj = -SEARCH_SIZE1; jj <= SEARCH_SIZE1; jj++) {
          if (ii * ii + jj * jj <= SEARCH_SIZE2 * SEARCH_SIZE2) continue;
          const sim = _getSimilarity({imageData, width, height, cx: i+ii, cy: j+jj, templateSize: TEMPLATE_SIZE, vlen: vlen, template: template});
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
  // debugImageData({filename: "./featureMap_"+width+".png", data: featureMap, height: height, width: width});

  // Step 2.2 select feature
  const coords = _selectFeature({imageData, width, height, dpi, featureMap, templateSize: TEMPLATE_SIZE, searchSize: SEARCH_SIZE2, occSize: OCCUPANCY_SIZE, maxSimThresh: MAX_THRESH, minSimThresh: MIN_THRESH, sdThresh: SD_THRESH});

  return coords;
}

const _selectFeature = (options) => {
  let {imageData, width, height, dpi, featureMap, templateSize, searchSize, occSize, maxSimThresh, minSimThresh, sdThresh} = options;

  console.log("params: ", templateSize, templateSize, occSize, maxSimThresh, minSimThresh, sdThresh);

  occSize *= 2;

  const divSize = (templateSize * 2 + 1) * 3;
  const xDiv = Math.floor(width / divSize);
  const yDiv = Math.floor(height / divSize);

  const maxFeatureNum = Math.floor(width / occSize) * Math.floor(height / occSize) + xDiv * yDiv;
  console.log("max feature num: ", maxFeatureNum);

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

    const ret = _makeTemplate({imageData, width, height, cx, cy, templateSize, sdThresh: 0.0});
    if (ret === null) {
      image2[ cy * width + cx ] = 1.0;
      continue;
    }
    const {template, vlen} = ret;
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

        const sim = _getSimilarity({imageData, width, height, template, vlen, templateSize, cx: cx+i, cy: cy+j});
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
      x: cx,
      y: cy,
      mx: 1.0 * cx / dpi * 25.4,
      my: 1.0 * (height - cy) / dpi * 25.4,
      maxSim: minSim,
    })

    num += 1;
    console.log(num, '(', cx, ',', cy, ')', minSim, 'min = ', min, 'max = ', max, 'sd = ', vlen/(templateSize*2+1));

    for (let j = -occSize; j <= occSize; j++) {
      for (let i = -occSize; i <= occSize; i++) {
        if (cy + j < 0 || cy + j >= height || cx + i < 0 || cx + i >= width) continue;
        image2[ (cy+j)*width + (cx+i) ] = 1.0;
      }
    }
  }
  return coords;
}

const _makeTemplate = (options) => {
  const {imageData, width, height, cx, cy, templateSize, sdThresh} = options;

  if (cx - templateSize < 0 || cx + templateSize >= width) return null;
  if (cy - templateSize < 0 || cy + templateSize >= height) return null;

  const templateWidth = 2 * templateSize + 1;

  let average = 0.0;
  for (let i = cx - templateSize; i <= cx + templateSize; i++) {
    for (let j = cy - templateSize; j <= cy + templateSize; j++) {
      average += imageData[j*width+i];
    }
  }
  average /= (templateWidth * templateWidth);

  const template = [];
  let vlen = 0.0;
  for (let i = cx - templateSize; i <= cx + templateSize; i++) {
    for (let j = cy - templateSize; j <= cy + templateSize; j++) {
      const diff = imageData[j*width+i] - average;
      const templateX = i - (cx - templateSize);
      const templateY = j - (cy - templateSize);
      template[templateY * templateWidth + templateX] = diff;
      vlen += (diff*diff);
    }
  }

  if (vlen == 0) return null;
  if (vlen / (templateWidth * templateWidth) < sdThresh) return null;
  vlen = Math.sqrt(vlen);

  return {template: template, vlen: vlen};
}

const _getSimilarity = (options) => {
  const {imageData, width, height, cx, cy, template, vlen, templateSize} = options;

  if (cx - templateSize < 0 || cx + templateSize >= width) return null;
  if (cy - templateSize < 0 || cy + templateSize >= height) return null;

  const templateWidth = 2 * templateSize + 1;

  let sx = 0.0;
  let sxx = 0.0;
  let sxy = 0.0;

  for (let i = cx - templateSize; i <= cx + templateSize; i++) {
    for (let j = cy - templateSize; j <= cy + templateSize; j++) {
      const v = imageData[j*width+i];
      const templateX = i - (cx - templateSize);
      const templateY = j - (cy - templateSize);
      sx += v;
      sxx += v * v;
      sxy += v * template[templateY * templateWidth + templateX];
    }
  }

  let vlen2 = sxx - sx*sx / (templateWidth * templateWidth);
  if (vlen2 == 0) return null;
  vlen2 = Math.sqrt(vlen2);

  const sim = sxy / (vlen * vlen2);
  return sim;
}

module.exports = {
  extract
};



/***/ }),

/***/ "./src/image-target/tracking/tracker.js":
/*!**********************************************!*\
  !*** ./src/image-target/tracking/tracker.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const {extract} = __webpack_require__(/*! ./extractor */ "./src/image-target/tracking/extractor.js");

class Tracker {
  constructor(imageList, projectionTransform) {
    this.featureSets = _buildFeatureSets(imageList);
  }
}

const _buildFeatureSets = ({imageList}) => {
  const featureSets = [];
  for (let i = 0; i < imageList.length; i++) {
    const image = imageList[i];
    const coords = extract({imageData: image.data, width: image.width, height: image.height, dpi: image.dpi});

    const featureSet = {};
    featureSet.scale = i;
    featureSet.mindpi = (i === imageList.length-1)? imageList[i].dpi * 0.5: imageList[i+1].dpi;
    featureSet.maxdpi = (i === 0)? imageList[i].dpi * 2: (imageList[i].dpi * 0.8 + imageList[i-1].dpi * 0.2);
    featureSet.coords = [];
    for (let j = 0; j < coords.length; j++) {
      featureSet.coords.push({
        x: coords[j].x,
        y: coords[j].y,
        mx: coords[j].mx,
        my: coords[j].my,
        maxSim: coords[j].maxSim,
      });
    }
    featureSets.push(featureSet);
  }
  return featureSets;
}

const compileTracking = ({imageList}) => {
  const featureSets = _buildFeatureSets({imageList});
  return {featureSets};
}

module.exports = {
  Tracker,
  compileTracking
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
const quadrilateralConvex = (x1, x2, x3, x4) => {
  if (linePointSide(x1, x2, x3) <= 0) return false;
  if (linePointSide(x2, x3, x4) <= 0) return false;
  if (linePointSide(x3, x4, x1) <= 0) return false;
  if (linePointSide(x4, x1, x2) <= 0) return false;
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
const {Utils} = __webpack_require__(/*! ./utils */ "./src/utils.js");

module.exports = window.MINDAR = {
  Utils,
  Controller
}


/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const {compile} = __webpack_require__(/*! ./image-target/index.js */ "./src/image-target/index.js");

const Utils = {
  compileImageTarget: (targetImage) => {
    return compile(targetImage);
  }
}

module.exports = {
  Utils
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2lzLWFueS1hcnJheS9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21sLWFycmF5LW1heC9saWItZXM2L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tbC1hcnJheS1taW4vbGliLWVzNi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWwtYXJyYXktcmVzY2FsZS9saWItZXM2L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tbC1tYXRyaXgvc3JjL2NvcnJlbGF0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tbC1tYXRyaXgvc3JjL2NvdmFyaWFuY2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21sLW1hdHJpeC9zcmMvZGMvY2hvbGVza3kuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21sLW1hdHJpeC9zcmMvZGMvZXZkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tbC1tYXRyaXgvc3JjL2RjL2x1LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tbC1tYXRyaXgvc3JjL2RjL25pcGFscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWwtbWF0cml4L3NyYy9kYy9xci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWwtbWF0cml4L3NyYy9kYy9zdmQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21sLW1hdHJpeC9zcmMvZGMvdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWwtbWF0cml4L3NyYy9kZWNvbXBvc2l0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWwtbWF0cml4L3NyYy9kZXRlcm1pbmFudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWwtbWF0cml4L3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWwtbWF0cml4L3NyYy9pbnNwZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tbC1tYXRyaXgvc3JjL2xpbmVhckRlcGVuZGVuY2llcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWwtbWF0cml4L3NyYy9tYXRoT3BlcmF0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWwtbWF0cml4L3NyYy9tYXRyaXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21sLW1hdHJpeC9zcmMvcHNldWRvSW52ZXJzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWwtbWF0cml4L3NyYy9zdGF0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tbC1tYXRyaXgvc3JjL3V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21sLW1hdHJpeC9zcmMvdmlld3MvYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWwtbWF0cml4L3NyYy92aWV3cy9jb2x1bW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21sLW1hdHJpeC9zcmMvdmlld3MvY29sdW1uU2VsZWN0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tbC1tYXRyaXgvc3JjL3ZpZXdzL2ZsaXBDb2x1bW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21sLW1hdHJpeC9zcmMvdmlld3MvZmxpcFJvdy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWwtbWF0cml4L3NyYy92aWV3cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWwtbWF0cml4L3NyYy92aWV3cy9yb3cuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21sLW1hdHJpeC9zcmMvdmlld3Mvcm93U2VsZWN0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tbC1tYXRyaXgvc3JjL3ZpZXdzL3NlbGVjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWwtbWF0cml4L3NyYy92aWV3cy9zdWIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21sLW1hdHJpeC9zcmMvdmlld3MvdHJhbnNwb3NlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tbC1tYXRyaXgvc3JjL3dyYXAvV3JhcHBlck1hdHJpeDFELmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tbC1tYXRyaXgvc3JjL3dyYXAvV3JhcHBlck1hdHJpeDJELmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tbC1tYXRyaXgvc3JjL3dyYXAvd3JhcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueXF1ZXVlL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9pbWFnZS10YXJnZXQvaWNwL2VzdGltYXRlX2hvbW9ncmFwaHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltYWdlLXRhcmdldC9pY3AvcmVmaW5lX2hvbW9ncmFwaHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltYWdlLXRhcmdldC9pY3AvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltYWdlLXRhcmdldC9pbWFnZS1saXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9pbWFnZS10YXJnZXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltYWdlLXRhcmdldC9tYXRjaGluZy9kZXRlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2UtdGFyZ2V0L21hdGNoaW5nL2RvZy1weXJhbWlkLmpzIiwid2VicGFjazovLy8uL3NyYy9pbWFnZS10YXJnZXQvbWF0Y2hpbmcvZnJlYWstZXh0cmFjdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9pbWFnZS10YXJnZXQvbWF0Y2hpbmcvZ2F1c3NpYW4tcHlyYW1pZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2UtdGFyZ2V0L21hdGNoaW5nL2hhbW1pbmctZGlzdGFuY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltYWdlLXRhcmdldC9tYXRjaGluZy9oaWVyYXJjaGljYWwtY2x1c3RlcmluZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2UtdGFyZ2V0L21hdGNoaW5nL2hvbW9ncmFwaHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltYWdlLXRhcmdldC9tYXRjaGluZy9ob3VnaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2UtdGFyZ2V0L21hdGNoaW5nL21hdGNoZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltYWdlLXRhcmdldC9tYXRjaGluZy9tYXRjaGluZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2UtdGFyZ2V0L3RyYWNraW5nL2V4dHJhY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2UtdGFyZ2V0L3RyYWNraW5nL3RyYWNrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltYWdlLXRhcmdldC91dGlscy9nZW9tZXRyeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2UtdGFyZ2V0L3V0aWxzL2ltYWdlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2UtdGFyZ2V0L3V0aWxzL3JhbmRvbWl6ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZhOztBQUViOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7OztBQ1JBO0FBQUE7QUFBQTtBQUFtQzs7QUFFbkM7QUFDQTtBQUNBLFdBQVcsY0FBYztBQUN6QixZQUFZO0FBQ1o7O0FBRUE7QUFDQSxPQUFPLG1EQUFPO0FBQ2Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsaUJBQWlCLGtCQUFrQjtBQUNuQztBQUNBOztBQUVBO0FBQ0E7O0FBRWUsa0VBQUcsRUFBQzs7Ozs7Ozs7Ozs7OztBQzFCbkI7QUFBQTtBQUFBO0FBQW1DOztBQUVuQztBQUNBO0FBQ0EsV0FBVyxjQUFjO0FBQ3pCLFlBQVk7QUFDWjs7QUFFQTtBQUNBLE9BQU8sbURBQU87QUFDZDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxpQkFBaUIsa0JBQWtCO0FBQ25DO0FBQ0E7O0FBRUE7QUFDQTs7QUFFZSxrRUFBRyxFQUFDOzs7Ozs7Ozs7Ozs7O0FDMUJuQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQW1DO0FBQ0o7QUFDQTs7QUFFL0I7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQixXQUFXLE9BQU8sWUFBWTtBQUM5QixXQUFXLE1BQU07QUFDakI7O0FBRUE7QUFDQTs7QUFFQSxPQUFPLG1EQUFPO0FBQ2Q7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLFNBQVMsbURBQU87QUFDaEI7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBLG1CQUFtQiw0REFBRztBQUN0QixtQkFBbUIsNERBQUc7O0FBRXRCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsaUJBQWlCLGtCQUFrQjtBQUNuQztBQUNBOztBQUVBO0FBQ0E7O0FBRWUsc0VBQU8sRUFBQzs7Ozs7Ozs7Ozs7OztBQ3pEdkI7QUFBQTtBQUFBO0FBQThCOztBQUV2Qiw2REFBNkQ7QUFDcEUsZ0JBQWdCLCtDQUFNO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLEtBQUssK0NBQU07QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILGtCQUFrQiwrQ0FBTTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTLDhCQUE4QjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbURBQW1ELGlCQUFpQjtBQUNwRTtBQUNBO0FBQ0EsMkNBQTJDLGlCQUFpQjs7QUFFNUQ7QUFDQSxpQkFBaUIsZUFBZTtBQUNoQyxtQkFBbUIsa0JBQWtCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xEQTtBQUFBO0FBQUE7QUFBOEI7O0FBRXZCLDREQUE0RDtBQUNuRSxnQkFBZ0IsK0NBQU07QUFDdEI7QUFDQTtBQUNBO0FBQ0EsS0FBSywrQ0FBTTtBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsa0JBQWtCLCtDQUFNO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxnQkFBZ0I7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsY0FBYztBQUMvQixtQkFBbUIsaUJBQWlCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNqQ0E7QUFBQTtBQUFBO0FBQUE7QUFBK0I7QUFDdUI7O0FBRXZDO0FBQ2Y7QUFDQSxZQUFZLDZEQUFlO0FBQzNCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0JBQWdCLCtDQUFNO0FBQ3RCO0FBQ0E7O0FBRUEsZUFBZSxlQUFlO0FBQzlCO0FBQ0EsaUJBQWlCLE9BQU87QUFDeEI7QUFDQSxtQkFBbUIsT0FBTztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQixlQUFlO0FBQ3BDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBWSw2REFBZTs7QUFFM0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGVBQWUsZUFBZTtBQUM5QixpQkFBaUIsV0FBVztBQUM1QixtQkFBbUIsT0FBTztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDJCQUEyQixRQUFRO0FBQ25DLGlCQUFpQixXQUFXO0FBQzVCLHVCQUF1QixlQUFlO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3RGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQStCO0FBQ3VCOztBQUVsQjs7QUFFckI7QUFDZixrQ0FBa0M7QUFDbEMsV0FBVywwQkFBMEI7O0FBRXJDLGFBQWEsNkRBQWU7QUFDNUI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0JBQWdCLCtDQUFNO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLE9BQU87QUFDeEIsbUJBQW1CLE9BQU87QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxrQkFBa0IsK0NBQU07QUFDeEI7QUFDQSxpQkFBaUIsT0FBTztBQUN4QixtQkFBbUIsT0FBTztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQiwrQ0FBTTtBQUN0QjtBQUNBLGVBQWUsT0FBTztBQUN0QixpQkFBaUIsT0FBTztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGFBQWEsT0FBTztBQUNwQjtBQUNBOztBQUVBLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLE9BQU87QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsaUJBQWlCLE9BQU87QUFDeEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLE9BQU87QUFDeEI7QUFDQTs7QUFFQSxpQkFBaUIsT0FBTztBQUN4QjtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsWUFBWTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLE9BQU87QUFDeEI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLE9BQU87QUFDeEI7QUFDQTs7QUFFQSxpQkFBaUIsT0FBTztBQUN4QjtBQUNBO0FBQ0EsbUJBQW1CLFlBQVk7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhLFdBQVc7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsUUFBUTtBQUN6QjtBQUNBOztBQUVBLGlCQUFpQixRQUFRO0FBQ3pCO0FBQ0EsbUJBQW1CLFFBQVE7QUFDM0I7QUFDQTtBQUNBLG1CQUFtQixRQUFRO0FBQzNCO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7O0FBRUEsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxhQUFhLE9BQU87QUFDcEI7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVksd0RBQVU7QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLE9BQU87QUFDOUI7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixRQUFRO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLHdEQUFVO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLE9BQU87QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYSxXQUFXO0FBQ3hCO0FBQ0E7QUFDQSxtQkFBbUIsT0FBTztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLGVBQWU7QUFDbEM7QUFDQSxlQUFlLFdBQVc7QUFDMUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUJBQWlCLE9BQU87QUFDeEI7QUFDQSxzQkFBc0IsUUFBUTtBQUM5QjtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLFdBQVc7QUFDOUI7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixXQUFXO0FBQzVCO0FBQ0Esc0JBQXNCLFFBQVE7QUFDOUI7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixXQUFXO0FBQzlCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhLE9BQU87QUFDcEIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0IsY0FBYztBQUNsQztBQUNBLHFCQUFxQixXQUFXO0FBQ2hDO0FBQ0E7O0FBRUEsaUJBQWlCLFdBQVc7QUFDNUI7QUFDQSxtQkFBbUIsV0FBVztBQUM5QjtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLFdBQVc7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnQ0FBZ0MsUUFBUTtBQUN4QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUIsUUFBUTtBQUMvQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsUUFBUTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsV0FBVztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQixRQUFRO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsUUFBUTtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixRQUFRO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLFlBQVk7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLFFBQVE7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLHlCQUF5QjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUIsV0FBVztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsUUFBUTtBQUMxQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixRQUFRO0FBQzdCO0FBQ0E7QUFDQSxtQkFBbUIsUUFBUTtBQUMzQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxXQUFX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QUNsQyxxQkFBcUIsa0JBQWtCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixlQUFlO0FBQ2xDLHFCQUFxQixrQkFBa0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsZUFBZTtBQUNsQyxxQkFBcUIsa0JBQWtCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixlQUFlO0FBQ2xDLHFCQUFxQixrQkFBa0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsZUFBZTtBQUNsQyxxQkFBcUIsa0JBQWtCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsZUFBZTtBQUNsQyxxQkFBcUIsa0JBQWtCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixlQUFlO0FBQ2xDLHFCQUFxQixrQkFBa0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixlQUFlO0FBQ2xDLHFCQUFxQixrQkFBa0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsZUFBZTtBQUNsQyxxQkFBcUIsa0JBQWtCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsZUFBZTtBQUNsQyxxQkFBcUIsa0JBQWtCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixlQUFlO0FBQ2xDLHFCQUFxQixrQkFBa0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEMscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixHQUFHLEtBQUssR0FBRyxPQUFPLEdBQUcsS0FBSyxHQUFHO0FBQ3BEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0EsV0FBVyxtQkFBbUI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsZUFBZTtBQUNsQztBQUNBLE1BQU0sZ0VBQU8sT0FBTyx3QkFBd0I7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJB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O0FBQ25DLDBCQUEwQixXQUFXO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN6RkE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYSxnQkFBZ0I7QUFDN0IscUJBQXFCLGdCQUFnQjs7QUFFckM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNoQ0EsT0FBTyxXQUFXLEdBQUcsbUJBQU8sQ0FBQyx5Q0FBYztBQUMzQyxPQUFPLE1BQU0sR0FBRyxtQkFBTyxDQUFDLCtCQUFTOztBQUVqQztBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDTkEsT0FBTyxRQUFRLEdBQUcsbUJBQU8sQ0FBQyw0REFBeUI7O0FBRW5EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBIiwiZmlsZSI6Im1pbmRhci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbmZ1bmN0aW9uIGlzQW55QXJyYXkob2JqZWN0KSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKG9iamVjdCkuZW5kc1dpdGgoJ0FycmF5XScpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQW55QXJyYXk7XG4iLCJpbXBvcnQgaXNBcnJheSBmcm9tICdpcy1hbnktYXJyYXknO1xuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBtYXhpbXVtIG9mIHRoZSBnaXZlbiB2YWx1ZXNcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gaW5wdXRcbiAqIEByZXR1cm4ge251bWJlcn1cbiAqL1xuXG5mdW5jdGlvbiBtYXgoaW5wdXQpIHtcbiAgaWYgKCFpc0FycmF5KGlucHV0KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2lucHV0IG11c3QgYmUgYW4gYXJyYXknKTtcbiAgfVxuXG4gIGlmIChpbnB1dC5sZW5ndGggPT09IDApIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdpbnB1dCBtdXN0IG5vdCBiZSBlbXB0eScpO1xuICB9XG5cbiAgdmFyIG1heFZhbHVlID0gaW5wdXRbMF07XG5cbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBpbnB1dC5sZW5ndGg7IGkrKykge1xuICAgIGlmIChpbnB1dFtpXSA+IG1heFZhbHVlKSBtYXhWYWx1ZSA9IGlucHV0W2ldO1xuICB9XG5cbiAgcmV0dXJuIG1heFZhbHVlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBtYXg7XG4iLCJpbXBvcnQgaXNBcnJheSBmcm9tICdpcy1hbnktYXJyYXknO1xuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBtaW5pbXVtIG9mIHRoZSBnaXZlbiB2YWx1ZXNcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gaW5wdXRcbiAqIEByZXR1cm4ge251bWJlcn1cbiAqL1xuXG5mdW5jdGlvbiBtaW4oaW5wdXQpIHtcbiAgaWYgKCFpc0FycmF5KGlucHV0KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2lucHV0IG11c3QgYmUgYW4gYXJyYXknKTtcbiAgfVxuXG4gIGlmIChpbnB1dC5sZW5ndGggPT09IDApIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdpbnB1dCBtdXN0IG5vdCBiZSBlbXB0eScpO1xuICB9XG5cbiAgdmFyIG1pblZhbHVlID0gaW5wdXRbMF07XG5cbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBpbnB1dC5sZW5ndGg7IGkrKykge1xuICAgIGlmIChpbnB1dFtpXSA8IG1pblZhbHVlKSBtaW5WYWx1ZSA9IGlucHV0W2ldO1xuICB9XG5cbiAgcmV0dXJuIG1pblZhbHVlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBtaW47XG4iLCJpbXBvcnQgaXNBcnJheSBmcm9tICdpcy1hbnktYXJyYXknO1xuaW1wb3J0IG1heCBmcm9tICdtbC1hcnJheS1tYXgnO1xuaW1wb3J0IG1pbiBmcm9tICdtbC1hcnJheS1taW4nO1xuXG4vKipcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBpbnB1dFxuICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zPXt9XVxuICogQHBhcmFtIHtBcnJheX0gW29wdGlvbnMub3V0cHV0PVtdXSBzcGVjaWZ5IHRoZSBvdXRwdXQgYXJyYXksIGNhbiBiZSB0aGUgaW5wdXQgYXJyYXkgZm9yIGluIHBsYWNlIG1vZGlmaWNhdGlvblxuICovXG5cbmZ1bmN0aW9uIHJlc2NhbGUoaW5wdXQpIHtcbiAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuXG4gIGlmICghaXNBcnJheShpbnB1dCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdpbnB1dCBtdXN0IGJlIGFuIGFycmF5Jyk7XG4gIH0gZWxzZSBpZiAoaW5wdXQubGVuZ3RoID09PSAwKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignaW5wdXQgbXVzdCBub3QgYmUgZW1wdHknKTtcbiAgfVxuXG4gIHZhciBvdXRwdXQ7XG5cbiAgaWYgKG9wdGlvbnMub3V0cHV0ICE9PSB1bmRlZmluZWQpIHtcbiAgICBpZiAoIWlzQXJyYXkob3B0aW9ucy5vdXRwdXQpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdvdXRwdXQgb3B0aW9uIG11c3QgYmUgYW4gYXJyYXkgaWYgc3BlY2lmaWVkJyk7XG4gICAgfVxuXG4gICAgb3V0cHV0ID0gb3B0aW9ucy5vdXRwdXQ7XG4gIH0gZWxzZSB7XG4gICAgb3V0cHV0ID0gbmV3IEFycmF5KGlucHV0Lmxlbmd0aCk7XG4gIH1cblxuICB2YXIgY3VycmVudE1pbiA9IG1pbihpbnB1dCk7XG4gIHZhciBjdXJyZW50TWF4ID0gbWF4KGlucHV0KTtcblxuICBpZiAoY3VycmVudE1pbiA9PT0gY3VycmVudE1heCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdtaW5pbXVtIGFuZCBtYXhpbXVtIGlucHV0IHZhbHVlcyBhcmUgZXF1YWwuIENhbm5vdCByZXNjYWxlIGEgY29uc3RhbnQgYXJyYXknKTtcbiAgfVxuXG4gIHZhciBfb3B0aW9ucyRtaW4gPSBvcHRpb25zLm1pbixcbiAgICAgIG1pblZhbHVlID0gX29wdGlvbnMkbWluID09PSB2b2lkIDAgPyBvcHRpb25zLmF1dG9NaW5NYXggPyBjdXJyZW50TWluIDogMCA6IF9vcHRpb25zJG1pbixcbiAgICAgIF9vcHRpb25zJG1heCA9IG9wdGlvbnMubWF4LFxuICAgICAgbWF4VmFsdWUgPSBfb3B0aW9ucyRtYXggPT09IHZvaWQgMCA/IG9wdGlvbnMuYXV0b01pbk1heCA/IGN1cnJlbnRNYXggOiAxIDogX29wdGlvbnMkbWF4O1xuXG4gIGlmIChtaW5WYWx1ZSA+PSBtYXhWYWx1ZSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdtaW4gb3B0aW9uIG11c3QgYmUgc21hbGxlciB0aGFuIG1heCBvcHRpb24nKTtcbiAgfVxuXG4gIHZhciBmYWN0b3IgPSAobWF4VmFsdWUgLSBtaW5WYWx1ZSkgLyAoY3VycmVudE1heCAtIGN1cnJlbnRNaW4pO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgaW5wdXQubGVuZ3RoOyBpKyspIHtcbiAgICBvdXRwdXRbaV0gPSAoaW5wdXRbaV0gLSBjdXJyZW50TWluKSAqIGZhY3RvciArIG1pblZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG91dHB1dDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcmVzY2FsZTtcbiIsImltcG9ydCBNYXRyaXggZnJvbSAnLi9tYXRyaXgnO1xuXG5leHBvcnQgZnVuY3Rpb24gY29ycmVsYXRpb24oeE1hdHJpeCwgeU1hdHJpeCA9IHhNYXRyaXgsIG9wdGlvbnMgPSB7fSkge1xuICB4TWF0cml4ID0gbmV3IE1hdHJpeCh4TWF0cml4KTtcbiAgbGV0IHlJc1NhbWUgPSBmYWxzZTtcbiAgaWYgKFxuICAgIHR5cGVvZiB5TWF0cml4ID09PSAnb2JqZWN0JyAmJlxuICAgICFNYXRyaXguaXNNYXRyaXgoeU1hdHJpeCkgJiZcbiAgICAhQXJyYXkuaXNBcnJheSh5TWF0cml4KVxuICApIHtcbiAgICBvcHRpb25zID0geU1hdHJpeDtcbiAgICB5TWF0cml4ID0geE1hdHJpeDtcbiAgICB5SXNTYW1lID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICB5TWF0cml4ID0gbmV3IE1hdHJpeCh5TWF0cml4KTtcbiAgfVxuICBpZiAoeE1hdHJpeC5yb3dzICE9PSB5TWF0cml4LnJvd3MpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdCb3RoIG1hdHJpY2VzIG11c3QgaGF2ZSB0aGUgc2FtZSBudW1iZXIgb2Ygcm93cycpO1xuICB9XG5cbiAgY29uc3QgeyBjZW50ZXIgPSB0cnVlLCBzY2FsZSA9IHRydWUgfSA9IG9wdGlvbnM7XG4gIGlmIChjZW50ZXIpIHtcbiAgICB4TWF0cml4LmNlbnRlcignY29sdW1uJyk7XG4gICAgaWYgKCF5SXNTYW1lKSB7XG4gICAgICB5TWF0cml4LmNlbnRlcignY29sdW1uJyk7XG4gICAgfVxuICB9XG4gIGlmIChzY2FsZSkge1xuICAgIHhNYXRyaXguc2NhbGUoJ2NvbHVtbicpO1xuICAgIGlmICgheUlzU2FtZSkge1xuICAgICAgeU1hdHJpeC5zY2FsZSgnY29sdW1uJyk7XG4gICAgfVxuICB9XG5cbiAgY29uc3Qgc2R4ID0geE1hdHJpeC5zdGFuZGFyZERldmlhdGlvbignY29sdW1uJywgeyB1bmJpYXNlZDogdHJ1ZSB9KTtcbiAgY29uc3Qgc2R5ID0geUlzU2FtZVxuICAgID8gc2R4XG4gICAgOiB5TWF0cml4LnN0YW5kYXJkRGV2aWF0aW9uKCdjb2x1bW4nLCB7IHVuYmlhc2VkOiB0cnVlIH0pO1xuXG4gIGNvbnN0IGNvcnIgPSB4TWF0cml4LnRyYW5zcG9zZSgpLm1tdWwoeU1hdHJpeCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY29yci5yb3dzOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNvcnIuY29sdW1uczsgaisrKSB7XG4gICAgICBjb3JyLnNldChcbiAgICAgICAgaSxcbiAgICAgICAgaixcbiAgICAgICAgY29yci5nZXQoaSwgaikgKiAoMSAvIChzZHhbaV0gKiBzZHlbal0pKSAqICgxIC8gKHhNYXRyaXgucm93cyAtIDEpKSxcbiAgICAgICk7XG4gICAgfVxuICB9XG4gIHJldHVybiBjb3JyO1xufVxuIiwiaW1wb3J0IE1hdHJpeCBmcm9tICcuL21hdHJpeCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb3ZhcmlhbmNlKHhNYXRyaXgsIHlNYXRyaXggPSB4TWF0cml4LCBvcHRpb25zID0ge30pIHtcbiAgeE1hdHJpeCA9IG5ldyBNYXRyaXgoeE1hdHJpeCk7XG4gIGxldCB5SXNTYW1lID0gZmFsc2U7XG4gIGlmIChcbiAgICB0eXBlb2YgeU1hdHJpeCA9PT0gJ29iamVjdCcgJiZcbiAgICAhTWF0cml4LmlzTWF0cml4KHlNYXRyaXgpICYmXG4gICAgIUFycmF5LmlzQXJyYXkoeU1hdHJpeClcbiAgKSB7XG4gICAgb3B0aW9ucyA9IHlNYXRyaXg7XG4gICAgeU1hdHJpeCA9IHhNYXRyaXg7XG4gICAgeUlzU2FtZSA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgeU1hdHJpeCA9IG5ldyBNYXRyaXgoeU1hdHJpeCk7XG4gIH1cbiAgaWYgKHhNYXRyaXgucm93cyAhPT0geU1hdHJpeC5yb3dzKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQm90aCBtYXRyaWNlcyBtdXN0IGhhdmUgdGhlIHNhbWUgbnVtYmVyIG9mIHJvd3MnKTtcbiAgfVxuICBjb25zdCB7IGNlbnRlciA9IHRydWUgfSA9IG9wdGlvbnM7XG4gIGlmIChjZW50ZXIpIHtcbiAgICB4TWF0cml4ID0geE1hdHJpeC5jZW50ZXIoJ2NvbHVtbicpO1xuICAgIGlmICgheUlzU2FtZSkge1xuICAgICAgeU1hdHJpeCA9IHlNYXRyaXguY2VudGVyKCdjb2x1bW4nKTtcbiAgICB9XG4gIH1cbiAgY29uc3QgY292ID0geE1hdHJpeC50cmFuc3Bvc2UoKS5tbXVsKHlNYXRyaXgpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdi5yb3dzOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNvdi5jb2x1bW5zOyBqKyspIHtcbiAgICAgIGNvdi5zZXQoaSwgaiwgY292LmdldChpLCBqKSAqICgxIC8gKHhNYXRyaXgucm93cyAtIDEpKSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBjb3Y7XG59XG4iLCJpbXBvcnQgTWF0cml4IGZyb20gJy4uL21hdHJpeCc7XG5pbXBvcnQgV3JhcHBlck1hdHJpeDJEIGZyb20gJy4uL3dyYXAvV3JhcHBlck1hdHJpeDJEJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hvbGVza3lEZWNvbXBvc2l0aW9uIHtcbiAgY29uc3RydWN0b3IodmFsdWUpIHtcbiAgICB2YWx1ZSA9IFdyYXBwZXJNYXRyaXgyRC5jaGVja01hdHJpeCh2YWx1ZSk7XG4gICAgaWYgKCF2YWx1ZS5pc1N5bW1ldHJpYygpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hdHJpeCBpcyBub3Qgc3ltbWV0cmljJyk7XG4gICAgfVxuXG4gICAgbGV0IGEgPSB2YWx1ZTtcbiAgICBsZXQgZGltZW5zaW9uID0gYS5yb3dzO1xuICAgIGxldCBsID0gbmV3IE1hdHJpeChkaW1lbnNpb24sIGRpbWVuc2lvbik7XG4gICAgbGV0IHBvc2l0aXZlRGVmaW5pdGUgPSB0cnVlO1xuICAgIGxldCBpLCBqLCBrO1xuXG4gICAgZm9yIChqID0gMDsgaiA8IGRpbWVuc2lvbjsgaisrKSB7XG4gICAgICBsZXQgZCA9IDA7XG4gICAgICBmb3IgKGsgPSAwOyBrIDwgajsgaysrKSB7XG4gICAgICAgIGxldCBzID0gMDtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGs7IGkrKykge1xuICAgICAgICAgIHMgKz0gbC5nZXQoaywgaSkgKiBsLmdldChqLCBpKTtcbiAgICAgICAgfVxuICAgICAgICBzID0gKGEuZ2V0KGosIGspIC0gcykgLyBsLmdldChrLCBrKTtcbiAgICAgICAgbC5zZXQoaiwgaywgcyk7XG4gICAgICAgIGQgPSBkICsgcyAqIHM7XG4gICAgICB9XG5cbiAgICAgIGQgPSBhLmdldChqLCBqKSAtIGQ7XG5cbiAgICAgIHBvc2l0aXZlRGVmaW5pdGUgJj0gZCA+IDA7XG4gICAgICBsLnNldChqLCBqLCBNYXRoLnNxcnQoTWF0aC5tYXgoZCwgMCkpKTtcbiAgICAgIGZvciAoayA9IGogKyAxOyBrIDwgZGltZW5zaW9uOyBrKyspIHtcbiAgICAgICAgbC5zZXQoaiwgaywgMCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5MID0gbDtcbiAgICB0aGlzLnBvc2l0aXZlRGVmaW5pdGUgPSBCb29sZWFuKHBvc2l0aXZlRGVmaW5pdGUpO1xuICB9XG5cbiAgaXNQb3NpdGl2ZURlZmluaXRlKCkge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aXZlRGVmaW5pdGU7XG4gIH1cblxuICBzb2x2ZSh2YWx1ZSkge1xuICAgIHZhbHVlID0gV3JhcHBlck1hdHJpeDJELmNoZWNrTWF0cml4KHZhbHVlKTtcblxuICAgIGxldCBsID0gdGhpcy5MO1xuICAgIGxldCBkaW1lbnNpb24gPSBsLnJvd3M7XG5cbiAgICBpZiAodmFsdWUucm93cyAhPT0gZGltZW5zaW9uKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hdHJpeCBkaW1lbnNpb25zIGRvIG5vdCBtYXRjaCcpO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc1Bvc2l0aXZlRGVmaW5pdGUoKSA9PT0gZmFsc2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWF0cml4IGlzIG5vdCBwb3NpdGl2ZSBkZWZpbml0ZScpO1xuICAgIH1cblxuICAgIGxldCBjb3VudCA9IHZhbHVlLmNvbHVtbnM7XG4gICAgbGV0IEIgPSB2YWx1ZS5jbG9uZSgpO1xuICAgIGxldCBpLCBqLCBrO1xuXG4gICAgZm9yIChrID0gMDsgayA8IGRpbWVuc2lvbjsgaysrKSB7XG4gICAgICBmb3IgKGogPSAwOyBqIDwgY291bnQ7IGorKykge1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgazsgaSsrKSB7XG4gICAgICAgICAgQi5zZXQoaywgaiwgQi5nZXQoaywgaikgLSBCLmdldChpLCBqKSAqIGwuZ2V0KGssIGkpKTtcbiAgICAgICAgfVxuICAgICAgICBCLnNldChrLCBqLCBCLmdldChrLCBqKSAvIGwuZ2V0KGssIGspKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGsgPSBkaW1lbnNpb24gLSAxOyBrID49IDA7IGstLSkge1xuICAgICAgZm9yIChqID0gMDsgaiA8IGNvdW50OyBqKyspIHtcbiAgICAgICAgZm9yIChpID0gayArIDE7IGkgPCBkaW1lbnNpb247IGkrKykge1xuICAgICAgICAgIEIuc2V0KGssIGosIEIuZ2V0KGssIGopIC0gQi5nZXQoaSwgaikgKiBsLmdldChpLCBrKSk7XG4gICAgICAgIH1cbiAgICAgICAgQi5zZXQoaywgaiwgQi5nZXQoaywgaikgLyBsLmdldChrLCBrKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIEI7XG4gIH1cblxuICBnZXQgbG93ZXJUcmlhbmd1bGFyTWF0cml4KCkge1xuICAgIHJldHVybiB0aGlzLkw7XG4gIH1cbn1cbiIsImltcG9ydCBNYXRyaXggZnJvbSAnLi4vbWF0cml4JztcbmltcG9ydCBXcmFwcGVyTWF0cml4MkQgZnJvbSAnLi4vd3JhcC9XcmFwcGVyTWF0cml4MkQnO1xuXG5pbXBvcnQgeyBoeXBvdGVudXNlIH0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWlnZW52YWx1ZURlY29tcG9zaXRpb24ge1xuICBjb25zdHJ1Y3RvcihtYXRyaXgsIG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IHsgYXNzdW1lU3ltbWV0cmljID0gZmFsc2UgfSA9IG9wdGlvbnM7XG5cbiAgICBtYXRyaXggPSBXcmFwcGVyTWF0cml4MkQuY2hlY2tNYXRyaXgobWF0cml4KTtcbiAgICBpZiAoIW1hdHJpeC5pc1NxdWFyZSgpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hdHJpeCBpcyBub3QgYSBzcXVhcmUgbWF0cml4Jyk7XG4gICAgfVxuXG4gICAgbGV0IG4gPSBtYXRyaXguY29sdW1ucztcbiAgICBsZXQgViA9IG5ldyBNYXRyaXgobiwgbik7XG4gICAgbGV0IGQgPSBuZXcgRmxvYXQ2NEFycmF5KG4pO1xuICAgIGxldCBlID0gbmV3IEZsb2F0NjRBcnJheShuKTtcbiAgICBsZXQgdmFsdWUgPSBtYXRyaXg7XG4gICAgbGV0IGksIGo7XG5cbiAgICBsZXQgaXNTeW1tZXRyaWMgPSBmYWxzZTtcbiAgICBpZiAoYXNzdW1lU3ltbWV0cmljKSB7XG4gICAgICBpc1N5bW1ldHJpYyA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlzU3ltbWV0cmljID0gbWF0cml4LmlzU3ltbWV0cmljKCk7XG4gICAgfVxuXG4gICAgaWYgKGlzU3ltbWV0cmljKSB7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIGZvciAoaiA9IDA7IGogPCBuOyBqKyspIHtcbiAgICAgICAgICBWLnNldChpLCBqLCB2YWx1ZS5nZXQoaSwgaikpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0cmVkMihuLCBlLCBkLCBWKTtcbiAgICAgIHRxbDIobiwgZSwgZCwgVik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBIID0gbmV3IE1hdHJpeChuLCBuKTtcbiAgICAgIGxldCBvcnQgPSBuZXcgRmxvYXQ2NEFycmF5KG4pO1xuICAgICAgZm9yIChqID0gMDsgaiA8IG47IGorKykge1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgSC5zZXQoaSwgaiwgdmFsdWUuZ2V0KGksIGopKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgb3J0aGVzKG4sIEgsIG9ydCwgVik7XG4gICAgICBocXIyKG4sIGUsIGQsIFYsIEgpO1xuICAgIH1cblxuICAgIHRoaXMubiA9IG47XG4gICAgdGhpcy5lID0gZTtcbiAgICB0aGlzLmQgPSBkO1xuICAgIHRoaXMuViA9IFY7XG4gIH1cblxuICBnZXQgcmVhbEVpZ2VudmFsdWVzKCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuZCk7XG4gIH1cblxuICBnZXQgaW1hZ2luYXJ5RWlnZW52YWx1ZXMoKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5lKTtcbiAgfVxuXG4gIGdldCBlaWdlbnZlY3Rvck1hdHJpeCgpIHtcbiAgICByZXR1cm4gdGhpcy5WO1xuICB9XG5cbiAgZ2V0IGRpYWdvbmFsTWF0cml4KCkge1xuICAgIGxldCBuID0gdGhpcy5uO1xuICAgIGxldCBlID0gdGhpcy5lO1xuICAgIGxldCBkID0gdGhpcy5kO1xuICAgIGxldCBYID0gbmV3IE1hdHJpeChuLCBuKTtcbiAgICBsZXQgaSwgajtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICBmb3IgKGogPSAwOyBqIDwgbjsgaisrKSB7XG4gICAgICAgIFguc2V0KGksIGosIDApO1xuICAgICAgfVxuICAgICAgWC5zZXQoaSwgaSwgZFtpXSk7XG4gICAgICBpZiAoZVtpXSA+IDApIHtcbiAgICAgICAgWC5zZXQoaSwgaSArIDEsIGVbaV0pO1xuICAgICAgfSBlbHNlIGlmIChlW2ldIDwgMCkge1xuICAgICAgICBYLnNldChpLCBpIC0gMSwgZVtpXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBYO1xuICB9XG59XG5cbmZ1bmN0aW9uIHRyZWQyKG4sIGUsIGQsIFYpIHtcbiAgbGV0IGYsIGcsIGgsIGksIGosIGssIGhoLCBzY2FsZTtcblxuICBmb3IgKGogPSAwOyBqIDwgbjsgaisrKSB7XG4gICAgZFtqXSA9IFYuZ2V0KG4gLSAxLCBqKTtcbiAgfVxuXG4gIGZvciAoaSA9IG4gLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgc2NhbGUgPSAwO1xuICAgIGggPSAwO1xuICAgIGZvciAoayA9IDA7IGsgPCBpOyBrKyspIHtcbiAgICAgIHNjYWxlID0gc2NhbGUgKyBNYXRoLmFicyhkW2tdKTtcbiAgICB9XG5cbiAgICBpZiAoc2NhbGUgPT09IDApIHtcbiAgICAgIGVbaV0gPSBkW2kgLSAxXTtcbiAgICAgIGZvciAoaiA9IDA7IGogPCBpOyBqKyspIHtcbiAgICAgICAgZFtqXSA9IFYuZ2V0KGkgLSAxLCBqKTtcbiAgICAgICAgVi5zZXQoaSwgaiwgMCk7XG4gICAgICAgIFYuc2V0KGosIGksIDApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGsgPSAwOyBrIDwgaTsgaysrKSB7XG4gICAgICAgIGRba10gLz0gc2NhbGU7XG4gICAgICAgIGggKz0gZFtrXSAqIGRba107XG4gICAgICB9XG5cbiAgICAgIGYgPSBkW2kgLSAxXTtcbiAgICAgIGcgPSBNYXRoLnNxcnQoaCk7XG4gICAgICBpZiAoZiA+IDApIHtcbiAgICAgICAgZyA9IC1nO1xuICAgICAgfVxuXG4gICAgICBlW2ldID0gc2NhbGUgKiBnO1xuICAgICAgaCA9IGggLSBmICogZztcbiAgICAgIGRbaSAtIDFdID0gZiAtIGc7XG4gICAgICBmb3IgKGogPSAwOyBqIDwgaTsgaisrKSB7XG4gICAgICAgIGVbal0gPSAwO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGogPSAwOyBqIDwgaTsgaisrKSB7XG4gICAgICAgIGYgPSBkW2pdO1xuICAgICAgICBWLnNldChqLCBpLCBmKTtcbiAgICAgICAgZyA9IGVbal0gKyBWLmdldChqLCBqKSAqIGY7XG4gICAgICAgIGZvciAoayA9IGogKyAxOyBrIDw9IGkgLSAxOyBrKyspIHtcbiAgICAgICAgICBnICs9IFYuZ2V0KGssIGopICogZFtrXTtcbiAgICAgICAgICBlW2tdICs9IFYuZ2V0KGssIGopICogZjtcbiAgICAgICAgfVxuICAgICAgICBlW2pdID0gZztcbiAgICAgIH1cblxuICAgICAgZiA9IDA7XG4gICAgICBmb3IgKGogPSAwOyBqIDwgaTsgaisrKSB7XG4gICAgICAgIGVbal0gLz0gaDtcbiAgICAgICAgZiArPSBlW2pdICogZFtqXTtcbiAgICAgIH1cblxuICAgICAgaGggPSBmIC8gKGggKyBoKTtcbiAgICAgIGZvciAoaiA9IDA7IGogPCBpOyBqKyspIHtcbiAgICAgICAgZVtqXSAtPSBoaCAqIGRbal07XG4gICAgICB9XG5cbiAgICAgIGZvciAoaiA9IDA7IGogPCBpOyBqKyspIHtcbiAgICAgICAgZiA9IGRbal07XG4gICAgICAgIGcgPSBlW2pdO1xuICAgICAgICBmb3IgKGsgPSBqOyBrIDw9IGkgLSAxOyBrKyspIHtcbiAgICAgICAgICBWLnNldChrLCBqLCBWLmdldChrLCBqKSAtIChmICogZVtrXSArIGcgKiBkW2tdKSk7XG4gICAgICAgIH1cbiAgICAgICAgZFtqXSA9IFYuZ2V0KGkgLSAxLCBqKTtcbiAgICAgICAgVi5zZXQoaSwgaiwgMCk7XG4gICAgICB9XG4gICAgfVxuICAgIGRbaV0gPSBoO1xuICB9XG5cbiAgZm9yIChpID0gMDsgaSA8IG4gLSAxOyBpKyspIHtcbiAgICBWLnNldChuIC0gMSwgaSwgVi5nZXQoaSwgaSkpO1xuICAgIFYuc2V0KGksIGksIDEpO1xuICAgIGggPSBkW2kgKyAxXTtcbiAgICBpZiAoaCAhPT0gMCkge1xuICAgICAgZm9yIChrID0gMDsgayA8PSBpOyBrKyspIHtcbiAgICAgICAgZFtrXSA9IFYuZ2V0KGssIGkgKyAxKSAvIGg7XG4gICAgICB9XG5cbiAgICAgIGZvciAoaiA9IDA7IGogPD0gaTsgaisrKSB7XG4gICAgICAgIGcgPSAwO1xuICAgICAgICBmb3IgKGsgPSAwOyBrIDw9IGk7IGsrKykge1xuICAgICAgICAgIGcgKz0gVi5nZXQoaywgaSArIDEpICogVi5nZXQoaywgaik7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChrID0gMDsgayA8PSBpOyBrKyspIHtcbiAgICAgICAgICBWLnNldChrLCBqLCBWLmdldChrLCBqKSAtIGcgKiBkW2tdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoayA9IDA7IGsgPD0gaTsgaysrKSB7XG4gICAgICBWLnNldChrLCBpICsgMSwgMCk7XG4gICAgfVxuICB9XG5cbiAgZm9yIChqID0gMDsgaiA8IG47IGorKykge1xuICAgIGRbal0gPSBWLmdldChuIC0gMSwgaik7XG4gICAgVi5zZXQobiAtIDEsIGosIDApO1xuICB9XG5cbiAgVi5zZXQobiAtIDEsIG4gLSAxLCAxKTtcbiAgZVswXSA9IDA7XG59XG5cbmZ1bmN0aW9uIHRxbDIobiwgZSwgZCwgVikge1xuICBsZXQgZywgaCwgaSwgaiwgaywgbCwgbSwgcCwgciwgZGwxLCBjLCBjMiwgYzMsIGVsMSwgcywgczIsIGl0ZXI7XG5cbiAgZm9yIChpID0gMTsgaSA8IG47IGkrKykge1xuICAgIGVbaSAtIDFdID0gZVtpXTtcbiAgfVxuXG4gIGVbbiAtIDFdID0gMDtcblxuICBsZXQgZiA9IDA7XG4gIGxldCB0c3QxID0gMDtcbiAgbGV0IGVwcyA9IE51bWJlci5FUFNJTE9OO1xuXG4gIGZvciAobCA9IDA7IGwgPCBuOyBsKyspIHtcbiAgICB0c3QxID0gTWF0aC5tYXgodHN0MSwgTWF0aC5hYnMoZFtsXSkgKyBNYXRoLmFicyhlW2xdKSk7XG4gICAgbSA9IGw7XG4gICAgd2hpbGUgKG0gPCBuKSB7XG4gICAgICBpZiAoTWF0aC5hYnMoZVttXSkgPD0gZXBzICogdHN0MSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIG0rKztcbiAgICB9XG5cbiAgICBpZiAobSA+IGwpIHtcbiAgICAgIGl0ZXIgPSAwO1xuICAgICAgZG8ge1xuICAgICAgICBpdGVyID0gaXRlciArIDE7XG5cbiAgICAgICAgZyA9IGRbbF07XG4gICAgICAgIHAgPSAoZFtsICsgMV0gLSBnKSAvICgyICogZVtsXSk7XG4gICAgICAgIHIgPSBoeXBvdGVudXNlKHAsIDEpO1xuICAgICAgICBpZiAocCA8IDApIHtcbiAgICAgICAgICByID0gLXI7XG4gICAgICAgIH1cblxuICAgICAgICBkW2xdID0gZVtsXSAvIChwICsgcik7XG4gICAgICAgIGRbbCArIDFdID0gZVtsXSAqIChwICsgcik7XG4gICAgICAgIGRsMSA9IGRbbCArIDFdO1xuICAgICAgICBoID0gZyAtIGRbbF07XG4gICAgICAgIGZvciAoaSA9IGwgKyAyOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgZFtpXSAtPSBoO1xuICAgICAgICB9XG5cbiAgICAgICAgZiA9IGYgKyBoO1xuXG4gICAgICAgIHAgPSBkW21dO1xuICAgICAgICBjID0gMTtcbiAgICAgICAgYzIgPSBjO1xuICAgICAgICBjMyA9IGM7XG4gICAgICAgIGVsMSA9IGVbbCArIDFdO1xuICAgICAgICBzID0gMDtcbiAgICAgICAgczIgPSAwO1xuICAgICAgICBmb3IgKGkgPSBtIC0gMTsgaSA+PSBsOyBpLS0pIHtcbiAgICAgICAgICBjMyA9IGMyO1xuICAgICAgICAgIGMyID0gYztcbiAgICAgICAgICBzMiA9IHM7XG4gICAgICAgICAgZyA9IGMgKiBlW2ldO1xuICAgICAgICAgIGggPSBjICogcDtcbiAgICAgICAgICByID0gaHlwb3RlbnVzZShwLCBlW2ldKTtcbiAgICAgICAgICBlW2kgKyAxXSA9IHMgKiByO1xuICAgICAgICAgIHMgPSBlW2ldIC8gcjtcbiAgICAgICAgICBjID0gcCAvIHI7XG4gICAgICAgICAgcCA9IGMgKiBkW2ldIC0gcyAqIGc7XG4gICAgICAgICAgZFtpICsgMV0gPSBoICsgcyAqIChjICogZyArIHMgKiBkW2ldKTtcblxuICAgICAgICAgIGZvciAoayA9IDA7IGsgPCBuOyBrKyspIHtcbiAgICAgICAgICAgIGggPSBWLmdldChrLCBpICsgMSk7XG4gICAgICAgICAgICBWLnNldChrLCBpICsgMSwgcyAqIFYuZ2V0KGssIGkpICsgYyAqIGgpO1xuICAgICAgICAgICAgVi5zZXQoaywgaSwgYyAqIFYuZ2V0KGssIGkpIC0gcyAqIGgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHAgPSAoLXMgKiBzMiAqIGMzICogZWwxICogZVtsXSkgLyBkbDE7XG4gICAgICAgIGVbbF0gPSBzICogcDtcbiAgICAgICAgZFtsXSA9IGMgKiBwO1xuICAgICAgfSB3aGlsZSAoTWF0aC5hYnMoZVtsXSkgPiBlcHMgKiB0c3QxKTtcbiAgICB9XG4gICAgZFtsXSA9IGRbbF0gKyBmO1xuICAgIGVbbF0gPSAwO1xuICB9XG5cbiAgZm9yIChpID0gMDsgaSA8IG4gLSAxOyBpKyspIHtcbiAgICBrID0gaTtcbiAgICBwID0gZFtpXTtcbiAgICBmb3IgKGogPSBpICsgMTsgaiA8IG47IGorKykge1xuICAgICAgaWYgKGRbal0gPCBwKSB7XG4gICAgICAgIGsgPSBqO1xuICAgICAgICBwID0gZFtqXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoayAhPT0gaSkge1xuICAgICAgZFtrXSA9IGRbaV07XG4gICAgICBkW2ldID0gcDtcbiAgICAgIGZvciAoaiA9IDA7IGogPCBuOyBqKyspIHtcbiAgICAgICAgcCA9IFYuZ2V0KGosIGkpO1xuICAgICAgICBWLnNldChqLCBpLCBWLmdldChqLCBrKSk7XG4gICAgICAgIFYuc2V0KGosIGssIHApO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBvcnRoZXMobiwgSCwgb3J0LCBWKSB7XG4gIGxldCBsb3cgPSAwO1xuICBsZXQgaGlnaCA9IG4gLSAxO1xuICBsZXQgZiwgZywgaCwgaSwgaiwgbTtcbiAgbGV0IHNjYWxlO1xuXG4gIGZvciAobSA9IGxvdyArIDE7IG0gPD0gaGlnaCAtIDE7IG0rKykge1xuICAgIHNjYWxlID0gMDtcbiAgICBmb3IgKGkgPSBtOyBpIDw9IGhpZ2g7IGkrKykge1xuICAgICAgc2NhbGUgPSBzY2FsZSArIE1hdGguYWJzKEguZ2V0KGksIG0gLSAxKSk7XG4gICAgfVxuXG4gICAgaWYgKHNjYWxlICE9PSAwKSB7XG4gICAgICBoID0gMDtcbiAgICAgIGZvciAoaSA9IGhpZ2g7IGkgPj0gbTsgaS0tKSB7XG4gICAgICAgIG9ydFtpXSA9IEguZ2V0KGksIG0gLSAxKSAvIHNjYWxlO1xuICAgICAgICBoICs9IG9ydFtpXSAqIG9ydFtpXTtcbiAgICAgIH1cblxuICAgICAgZyA9IE1hdGguc3FydChoKTtcbiAgICAgIGlmIChvcnRbbV0gPiAwKSB7XG4gICAgICAgIGcgPSAtZztcbiAgICAgIH1cblxuICAgICAgaCA9IGggLSBvcnRbbV0gKiBnO1xuICAgICAgb3J0W21dID0gb3J0W21dIC0gZztcblxuICAgICAgZm9yIChqID0gbTsgaiA8IG47IGorKykge1xuICAgICAgICBmID0gMDtcbiAgICAgICAgZm9yIChpID0gaGlnaDsgaSA+PSBtOyBpLS0pIHtcbiAgICAgICAgICBmICs9IG9ydFtpXSAqIEguZ2V0KGksIGopO1xuICAgICAgICB9XG5cbiAgICAgICAgZiA9IGYgLyBoO1xuICAgICAgICBmb3IgKGkgPSBtOyBpIDw9IGhpZ2g7IGkrKykge1xuICAgICAgICAgIEguc2V0KGksIGosIEguZ2V0KGksIGopIC0gZiAqIG9ydFtpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZm9yIChpID0gMDsgaSA8PSBoaWdoOyBpKyspIHtcbiAgICAgICAgZiA9IDA7XG4gICAgICAgIGZvciAoaiA9IGhpZ2g7IGogPj0gbTsgai0tKSB7XG4gICAgICAgICAgZiArPSBvcnRbal0gKiBILmdldChpLCBqKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGYgPSBmIC8gaDtcbiAgICAgICAgZm9yIChqID0gbTsgaiA8PSBoaWdoOyBqKyspIHtcbiAgICAgICAgICBILnNldChpLCBqLCBILmdldChpLCBqKSAtIGYgKiBvcnRbal0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG9ydFttXSA9IHNjYWxlICogb3J0W21dO1xuICAgICAgSC5zZXQobSwgbSAtIDEsIHNjYWxlICogZyk7XG4gICAgfVxuICB9XG5cbiAgZm9yIChpID0gMDsgaSA8IG47IGkrKykge1xuICAgIGZvciAoaiA9IDA7IGogPCBuOyBqKyspIHtcbiAgICAgIFYuc2V0KGksIGosIGkgPT09IGogPyAxIDogMCk7XG4gICAgfVxuICB9XG5cbiAgZm9yIChtID0gaGlnaCAtIDE7IG0gPj0gbG93ICsgMTsgbS0tKSB7XG4gICAgaWYgKEguZ2V0KG0sIG0gLSAxKSAhPT0gMCkge1xuICAgICAgZm9yIChpID0gbSArIDE7IGkgPD0gaGlnaDsgaSsrKSB7XG4gICAgICAgIG9ydFtpXSA9IEguZ2V0KGksIG0gLSAxKTtcbiAgICAgIH1cblxuICAgICAgZm9yIChqID0gbTsgaiA8PSBoaWdoOyBqKyspIHtcbiAgICAgICAgZyA9IDA7XG4gICAgICAgIGZvciAoaSA9IG07IGkgPD0gaGlnaDsgaSsrKSB7XG4gICAgICAgICAgZyArPSBvcnRbaV0gKiBWLmdldChpLCBqKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGcgPSBnIC8gb3J0W21dIC8gSC5nZXQobSwgbSAtIDEpO1xuICAgICAgICBmb3IgKGkgPSBtOyBpIDw9IGhpZ2g7IGkrKykge1xuICAgICAgICAgIFYuc2V0KGksIGosIFYuZ2V0KGksIGopICsgZyAqIG9ydFtpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gaHFyMihubiwgZSwgZCwgViwgSCkge1xuICBsZXQgbiA9IG5uIC0gMTtcbiAgbGV0IGxvdyA9IDA7XG4gIGxldCBoaWdoID0gbm4gLSAxO1xuICBsZXQgZXBzID0gTnVtYmVyLkVQU0lMT047XG4gIGxldCBleHNoaWZ0ID0gMDtcbiAgbGV0IG5vcm0gPSAwO1xuICBsZXQgcCA9IDA7XG4gIGxldCBxID0gMDtcbiAgbGV0IHIgPSAwO1xuICBsZXQgcyA9IDA7XG4gIGxldCB6ID0gMDtcbiAgbGV0IGl0ZXIgPSAwO1xuICBsZXQgaSwgaiwgaywgbCwgbSwgdCwgdywgeCwgeTtcbiAgbGV0IHJhLCBzYSwgdnIsIHZpO1xuICBsZXQgbm90bGFzdCwgY2RpdnJlcztcblxuICBmb3IgKGkgPSAwOyBpIDwgbm47IGkrKykge1xuICAgIGlmIChpIDwgbG93IHx8IGkgPiBoaWdoKSB7XG4gICAgICBkW2ldID0gSC5nZXQoaSwgaSk7XG4gICAgICBlW2ldID0gMDtcbiAgICB9XG5cbiAgICBmb3IgKGogPSBNYXRoLm1heChpIC0gMSwgMCk7IGogPCBubjsgaisrKSB7XG4gICAgICBub3JtID0gbm9ybSArIE1hdGguYWJzKEguZ2V0KGksIGopKTtcbiAgICB9XG4gIH1cblxuICB3aGlsZSAobiA+PSBsb3cpIHtcbiAgICBsID0gbjtcbiAgICB3aGlsZSAobCA+IGxvdykge1xuICAgICAgcyA9IE1hdGguYWJzKEguZ2V0KGwgLSAxLCBsIC0gMSkpICsgTWF0aC5hYnMoSC5nZXQobCwgbCkpO1xuICAgICAgaWYgKHMgPT09IDApIHtcbiAgICAgICAgcyA9IG5vcm07XG4gICAgICB9XG4gICAgICBpZiAoTWF0aC5hYnMoSC5nZXQobCwgbCAtIDEpKSA8IGVwcyAqIHMpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBsLS07XG4gICAgfVxuXG4gICAgaWYgKGwgPT09IG4pIHtcbiAgICAgIEguc2V0KG4sIG4sIEguZ2V0KG4sIG4pICsgZXhzaGlmdCk7XG4gICAgICBkW25dID0gSC5nZXQobiwgbik7XG4gICAgICBlW25dID0gMDtcbiAgICAgIG4tLTtcbiAgICAgIGl0ZXIgPSAwO1xuICAgIH0gZWxzZSBpZiAobCA9PT0gbiAtIDEpIHtcbiAgICAgIHcgPSBILmdldChuLCBuIC0gMSkgKiBILmdldChuIC0gMSwgbik7XG4gICAgICBwID0gKEguZ2V0KG4gLSAxLCBuIC0gMSkgLSBILmdldChuLCBuKSkgLyAyO1xuICAgICAgcSA9IHAgKiBwICsgdztcbiAgICAgIHogPSBNYXRoLnNxcnQoTWF0aC5hYnMocSkpO1xuICAgICAgSC5zZXQobiwgbiwgSC5nZXQobiwgbikgKyBleHNoaWZ0KTtcbiAgICAgIEguc2V0KG4gLSAxLCBuIC0gMSwgSC5nZXQobiAtIDEsIG4gLSAxKSArIGV4c2hpZnQpO1xuICAgICAgeCA9IEguZ2V0KG4sIG4pO1xuXG4gICAgICBpZiAocSA+PSAwKSB7XG4gICAgICAgIHogPSBwID49IDAgPyBwICsgeiA6IHAgLSB6O1xuICAgICAgICBkW24gLSAxXSA9IHggKyB6O1xuICAgICAgICBkW25dID0gZFtuIC0gMV07XG4gICAgICAgIGlmICh6ICE9PSAwKSB7XG4gICAgICAgICAgZFtuXSA9IHggLSB3IC8gejtcbiAgICAgICAgfVxuICAgICAgICBlW24gLSAxXSA9IDA7XG4gICAgICAgIGVbbl0gPSAwO1xuICAgICAgICB4ID0gSC5nZXQobiwgbiAtIDEpO1xuICAgICAgICBzID0gTWF0aC5hYnMoeCkgKyBNYXRoLmFicyh6KTtcbiAgICAgICAgcCA9IHggLyBzO1xuICAgICAgICBxID0geiAvIHM7XG4gICAgICAgIHIgPSBNYXRoLnNxcnQocCAqIHAgKyBxICogcSk7XG4gICAgICAgIHAgPSBwIC8gcjtcbiAgICAgICAgcSA9IHEgLyByO1xuXG4gICAgICAgIGZvciAoaiA9IG4gLSAxOyBqIDwgbm47IGorKykge1xuICAgICAgICAgIHogPSBILmdldChuIC0gMSwgaik7XG4gICAgICAgICAgSC5zZXQobiAtIDEsIGosIHEgKiB6ICsgcCAqIEguZ2V0KG4sIGopKTtcbiAgICAgICAgICBILnNldChuLCBqLCBxICogSC5nZXQobiwgaikgLSBwICogeik7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDw9IG47IGkrKykge1xuICAgICAgICAgIHogPSBILmdldChpLCBuIC0gMSk7XG4gICAgICAgICAgSC5zZXQoaSwgbiAtIDEsIHEgKiB6ICsgcCAqIEguZ2V0KGksIG4pKTtcbiAgICAgICAgICBILnNldChpLCBuLCBxICogSC5nZXQoaSwgbikgLSBwICogeik7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGkgPSBsb3c7IGkgPD0gaGlnaDsgaSsrKSB7XG4gICAgICAgICAgeiA9IFYuZ2V0KGksIG4gLSAxKTtcbiAgICAgICAgICBWLnNldChpLCBuIC0gMSwgcSAqIHogKyBwICogVi5nZXQoaSwgbikpO1xuICAgICAgICAgIFYuc2V0KGksIG4sIHEgKiBWLmdldChpLCBuKSAtIHAgKiB6KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZFtuIC0gMV0gPSB4ICsgcDtcbiAgICAgICAgZFtuXSA9IHggKyBwO1xuICAgICAgICBlW24gLSAxXSA9IHo7XG4gICAgICAgIGVbbl0gPSAtejtcbiAgICAgIH1cblxuICAgICAgbiA9IG4gLSAyO1xuICAgICAgaXRlciA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHggPSBILmdldChuLCBuKTtcbiAgICAgIHkgPSAwO1xuICAgICAgdyA9IDA7XG4gICAgICBpZiAobCA8IG4pIHtcbiAgICAgICAgeSA9IEguZ2V0KG4gLSAxLCBuIC0gMSk7XG4gICAgICAgIHcgPSBILmdldChuLCBuIC0gMSkgKiBILmdldChuIC0gMSwgbik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVyID09PSAxMCkge1xuICAgICAgICBleHNoaWZ0ICs9IHg7XG4gICAgICAgIGZvciAoaSA9IGxvdzsgaSA8PSBuOyBpKyspIHtcbiAgICAgICAgICBILnNldChpLCBpLCBILmdldChpLCBpKSAtIHgpO1xuICAgICAgICB9XG4gICAgICAgIHMgPSBNYXRoLmFicyhILmdldChuLCBuIC0gMSkpICsgTWF0aC5hYnMoSC5nZXQobiAtIDEsIG4gLSAyKSk7XG4gICAgICAgIHggPSB5ID0gMC43NSAqIHM7XG4gICAgICAgIHcgPSAtMC40Mzc1ICogcyAqIHM7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVyID09PSAzMCkge1xuICAgICAgICBzID0gKHkgLSB4KSAvIDI7XG4gICAgICAgIHMgPSBzICogcyArIHc7XG4gICAgICAgIGlmIChzID4gMCkge1xuICAgICAgICAgIHMgPSBNYXRoLnNxcnQocyk7XG4gICAgICAgICAgaWYgKHkgPCB4KSB7XG4gICAgICAgICAgICBzID0gLXM7XG4gICAgICAgICAgfVxuICAgICAgICAgIHMgPSB4IC0gdyAvICgoeSAtIHgpIC8gMiArIHMpO1xuICAgICAgICAgIGZvciAoaSA9IGxvdzsgaSA8PSBuOyBpKyspIHtcbiAgICAgICAgICAgIEguc2V0KGksIGksIEguZ2V0KGksIGkpIC0gcyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGV4c2hpZnQgKz0gcztcbiAgICAgICAgICB4ID0geSA9IHcgPSAwLjk2NDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpdGVyID0gaXRlciArIDE7XG5cbiAgICAgIG0gPSBuIC0gMjtcbiAgICAgIHdoaWxlIChtID49IGwpIHtcbiAgICAgICAgeiA9IEguZ2V0KG0sIG0pO1xuICAgICAgICByID0geCAtIHo7XG4gICAgICAgIHMgPSB5IC0gejtcbiAgICAgICAgcCA9IChyICogcyAtIHcpIC8gSC5nZXQobSArIDEsIG0pICsgSC5nZXQobSwgbSArIDEpO1xuICAgICAgICBxID0gSC5nZXQobSArIDEsIG0gKyAxKSAtIHogLSByIC0gcztcbiAgICAgICAgciA9IEguZ2V0KG0gKyAyLCBtICsgMSk7XG4gICAgICAgIHMgPSBNYXRoLmFicyhwKSArIE1hdGguYWJzKHEpICsgTWF0aC5hYnMocik7XG4gICAgICAgIHAgPSBwIC8gcztcbiAgICAgICAgcSA9IHEgLyBzO1xuICAgICAgICByID0gciAvIHM7XG4gICAgICAgIGlmIChtID09PSBsKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgIE1hdGguYWJzKEguZ2V0KG0sIG0gLSAxKSkgKiAoTWF0aC5hYnMocSkgKyBNYXRoLmFicyhyKSkgPFxuICAgICAgICAgIGVwcyAqXG4gICAgICAgICAgICAoTWF0aC5hYnMocCkgKlxuICAgICAgICAgICAgICAoTWF0aC5hYnMoSC5nZXQobSAtIDEsIG0gLSAxKSkgK1xuICAgICAgICAgICAgICAgIE1hdGguYWJzKHopICtcbiAgICAgICAgICAgICAgICBNYXRoLmFicyhILmdldChtICsgMSwgbSArIDEpKSkpXG4gICAgICAgICkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIG0tLTtcbiAgICAgIH1cblxuICAgICAgZm9yIChpID0gbSArIDI7IGkgPD0gbjsgaSsrKSB7XG4gICAgICAgIEguc2V0KGksIGkgLSAyLCAwKTtcbiAgICAgICAgaWYgKGkgPiBtICsgMikge1xuICAgICAgICAgIEguc2V0KGksIGkgLSAzLCAwKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKGsgPSBtOyBrIDw9IG4gLSAxOyBrKyspIHtcbiAgICAgICAgbm90bGFzdCA9IGsgIT09IG4gLSAxO1xuICAgICAgICBpZiAoayAhPT0gbSkge1xuICAgICAgICAgIHAgPSBILmdldChrLCBrIC0gMSk7XG4gICAgICAgICAgcSA9IEguZ2V0KGsgKyAxLCBrIC0gMSk7XG4gICAgICAgICAgciA9IG5vdGxhc3QgPyBILmdldChrICsgMiwgayAtIDEpIDogMDtcbiAgICAgICAgICB4ID0gTWF0aC5hYnMocCkgKyBNYXRoLmFicyhxKSArIE1hdGguYWJzKHIpO1xuICAgICAgICAgIGlmICh4ICE9PSAwKSB7XG4gICAgICAgICAgICBwID0gcCAvIHg7XG4gICAgICAgICAgICBxID0gcSAvIHg7XG4gICAgICAgICAgICByID0gciAvIHg7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHggPT09IDApIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHMgPSBNYXRoLnNxcnQocCAqIHAgKyBxICogcSArIHIgKiByKTtcbiAgICAgICAgaWYgKHAgPCAwKSB7XG4gICAgICAgICAgcyA9IC1zO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHMgIT09IDApIHtcbiAgICAgICAgICBpZiAoayAhPT0gbSkge1xuICAgICAgICAgICAgSC5zZXQoaywgayAtIDEsIC1zICogeCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChsICE9PSBtKSB7XG4gICAgICAgICAgICBILnNldChrLCBrIC0gMSwgLUguZ2V0KGssIGsgLSAxKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcCA9IHAgKyBzO1xuICAgICAgICAgIHggPSBwIC8gcztcbiAgICAgICAgICB5ID0gcSAvIHM7XG4gICAgICAgICAgeiA9IHIgLyBzO1xuICAgICAgICAgIHEgPSBxIC8gcDtcbiAgICAgICAgICByID0gciAvIHA7XG5cbiAgICAgICAgICBmb3IgKGogPSBrOyBqIDwgbm47IGorKykge1xuICAgICAgICAgICAgcCA9IEguZ2V0KGssIGopICsgcSAqIEguZ2V0KGsgKyAxLCBqKTtcbiAgICAgICAgICAgIGlmIChub3RsYXN0KSB7XG4gICAgICAgICAgICAgIHAgPSBwICsgciAqIEguZ2V0KGsgKyAyLCBqKTtcbiAgICAgICAgICAgICAgSC5zZXQoayArIDIsIGosIEguZ2V0KGsgKyAyLCBqKSAtIHAgKiB6KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgSC5zZXQoaywgaiwgSC5nZXQoaywgaikgLSBwICogeCk7XG4gICAgICAgICAgICBILnNldChrICsgMSwgaiwgSC5nZXQoayArIDEsIGopIC0gcCAqIHkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZvciAoaSA9IDA7IGkgPD0gTWF0aC5taW4obiwgayArIDMpOyBpKyspIHtcbiAgICAgICAgICAgIHAgPSB4ICogSC5nZXQoaSwgaykgKyB5ICogSC5nZXQoaSwgayArIDEpO1xuICAgICAgICAgICAgaWYgKG5vdGxhc3QpIHtcbiAgICAgICAgICAgICAgcCA9IHAgKyB6ICogSC5nZXQoaSwgayArIDIpO1xuICAgICAgICAgICAgICBILnNldChpLCBrICsgMiwgSC5nZXQoaSwgayArIDIpIC0gcCAqIHIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBILnNldChpLCBrLCBILmdldChpLCBrKSAtIHApO1xuICAgICAgICAgICAgSC5zZXQoaSwgayArIDEsIEguZ2V0KGksIGsgKyAxKSAtIHAgKiBxKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmb3IgKGkgPSBsb3c7IGkgPD0gaGlnaDsgaSsrKSB7XG4gICAgICAgICAgICBwID0geCAqIFYuZ2V0KGksIGspICsgeSAqIFYuZ2V0KGksIGsgKyAxKTtcbiAgICAgICAgICAgIGlmIChub3RsYXN0KSB7XG4gICAgICAgICAgICAgIHAgPSBwICsgeiAqIFYuZ2V0KGksIGsgKyAyKTtcbiAgICAgICAgICAgICAgVi5zZXQoaSwgayArIDIsIFYuZ2V0KGksIGsgKyAyKSAtIHAgKiByKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgVi5zZXQoaSwgaywgVi5nZXQoaSwgaykgLSBwKTtcbiAgICAgICAgICAgIFYuc2V0KGksIGsgKyAxLCBWLmdldChpLCBrICsgMSkgLSBwICogcSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKG5vcm0gPT09IDApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBmb3IgKG4gPSBubiAtIDE7IG4gPj0gMDsgbi0tKSB7XG4gICAgcCA9IGRbbl07XG4gICAgcSA9IGVbbl07XG5cbiAgICBpZiAocSA9PT0gMCkge1xuICAgICAgbCA9IG47XG4gICAgICBILnNldChuLCBuLCAxKTtcbiAgICAgIGZvciAoaSA9IG4gLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICB3ID0gSC5nZXQoaSwgaSkgLSBwO1xuICAgICAgICByID0gMDtcbiAgICAgICAgZm9yIChqID0gbDsgaiA8PSBuOyBqKyspIHtcbiAgICAgICAgICByID0gciArIEguZ2V0KGksIGopICogSC5nZXQoaiwgbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZVtpXSA8IDApIHtcbiAgICAgICAgICB6ID0gdztcbiAgICAgICAgICBzID0gcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsID0gaTtcbiAgICAgICAgICBpZiAoZVtpXSA9PT0gMCkge1xuICAgICAgICAgICAgSC5zZXQoaSwgbiwgdyAhPT0gMCA/IC1yIC8gdyA6IC1yIC8gKGVwcyAqIG5vcm0pKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgeCA9IEguZ2V0KGksIGkgKyAxKTtcbiAgICAgICAgICAgIHkgPSBILmdldChpICsgMSwgaSk7XG4gICAgICAgICAgICBxID0gKGRbaV0gLSBwKSAqIChkW2ldIC0gcCkgKyBlW2ldICogZVtpXTtcbiAgICAgICAgICAgIHQgPSAoeCAqIHMgLSB6ICogcikgLyBxO1xuICAgICAgICAgICAgSC5zZXQoaSwgbiwgdCk7XG4gICAgICAgICAgICBILnNldChcbiAgICAgICAgICAgICAgaSArIDEsXG4gICAgICAgICAgICAgIG4sXG4gICAgICAgICAgICAgIE1hdGguYWJzKHgpID4gTWF0aC5hYnMoeikgPyAoLXIgLSB3ICogdCkgLyB4IDogKC1zIC0geSAqIHQpIC8geixcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdCA9IE1hdGguYWJzKEguZ2V0KGksIG4pKTtcbiAgICAgICAgICBpZiAoZXBzICogdCAqIHQgPiAxKSB7XG4gICAgICAgICAgICBmb3IgKGogPSBpOyBqIDw9IG47IGorKykge1xuICAgICAgICAgICAgICBILnNldChqLCBuLCBILmdldChqLCBuKSAvIHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocSA8IDApIHtcbiAgICAgIGwgPSBuIC0gMTtcblxuICAgICAgaWYgKE1hdGguYWJzKEguZ2V0KG4sIG4gLSAxKSkgPiBNYXRoLmFicyhILmdldChuIC0gMSwgbikpKSB7XG4gICAgICAgIEguc2V0KG4gLSAxLCBuIC0gMSwgcSAvIEguZ2V0KG4sIG4gLSAxKSk7XG4gICAgICAgIEguc2V0KG4gLSAxLCBuLCAtKEguZ2V0KG4sIG4pIC0gcCkgLyBILmdldChuLCBuIC0gMSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2RpdnJlcyA9IGNkaXYoMCwgLUguZ2V0KG4gLSAxLCBuKSwgSC5nZXQobiAtIDEsIG4gLSAxKSAtIHAsIHEpO1xuICAgICAgICBILnNldChuIC0gMSwgbiAtIDEsIGNkaXZyZXNbMF0pO1xuICAgICAgICBILnNldChuIC0gMSwgbiwgY2RpdnJlc1sxXSk7XG4gICAgICB9XG5cbiAgICAgIEguc2V0KG4sIG4gLSAxLCAwKTtcbiAgICAgIEguc2V0KG4sIG4sIDEpO1xuICAgICAgZm9yIChpID0gbiAtIDI7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIHJhID0gMDtcbiAgICAgICAgc2EgPSAwO1xuICAgICAgICBmb3IgKGogPSBsOyBqIDw9IG47IGorKykge1xuICAgICAgICAgIHJhID0gcmEgKyBILmdldChpLCBqKSAqIEguZ2V0KGosIG4gLSAxKTtcbiAgICAgICAgICBzYSA9IHNhICsgSC5nZXQoaSwgaikgKiBILmdldChqLCBuKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHcgPSBILmdldChpLCBpKSAtIHA7XG5cbiAgICAgICAgaWYgKGVbaV0gPCAwKSB7XG4gICAgICAgICAgeiA9IHc7XG4gICAgICAgICAgciA9IHJhO1xuICAgICAgICAgIHMgPSBzYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsID0gaTtcbiAgICAgICAgICBpZiAoZVtpXSA9PT0gMCkge1xuICAgICAgICAgICAgY2RpdnJlcyA9IGNkaXYoLXJhLCAtc2EsIHcsIHEpO1xuICAgICAgICAgICAgSC5zZXQoaSwgbiAtIDEsIGNkaXZyZXNbMF0pO1xuICAgICAgICAgICAgSC5zZXQoaSwgbiwgY2RpdnJlc1sxXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHggPSBILmdldChpLCBpICsgMSk7XG4gICAgICAgICAgICB5ID0gSC5nZXQoaSArIDEsIGkpO1xuICAgICAgICAgICAgdnIgPSAoZFtpXSAtIHApICogKGRbaV0gLSBwKSArIGVbaV0gKiBlW2ldIC0gcSAqIHE7XG4gICAgICAgICAgICB2aSA9IChkW2ldIC0gcCkgKiAyICogcTtcbiAgICAgICAgICAgIGlmICh2ciA9PT0gMCAmJiB2aSA9PT0gMCkge1xuICAgICAgICAgICAgICB2ciA9XG4gICAgICAgICAgICAgICAgZXBzICpcbiAgICAgICAgICAgICAgICBub3JtICpcbiAgICAgICAgICAgICAgICAoTWF0aC5hYnModykgK1xuICAgICAgICAgICAgICAgICAgTWF0aC5hYnMocSkgK1xuICAgICAgICAgICAgICAgICAgTWF0aC5hYnMoeCkgK1xuICAgICAgICAgICAgICAgICAgTWF0aC5hYnMoeSkgK1xuICAgICAgICAgICAgICAgICAgTWF0aC5hYnMoeikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2RpdnJlcyA9IGNkaXYoXG4gICAgICAgICAgICAgIHggKiByIC0geiAqIHJhICsgcSAqIHNhLFxuICAgICAgICAgICAgICB4ICogcyAtIHogKiBzYSAtIHEgKiByYSxcbiAgICAgICAgICAgICAgdnIsXG4gICAgICAgICAgICAgIHZpLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIEguc2V0KGksIG4gLSAxLCBjZGl2cmVzWzBdKTtcbiAgICAgICAgICAgIEguc2V0KGksIG4sIGNkaXZyZXNbMV0pO1xuICAgICAgICAgICAgaWYgKE1hdGguYWJzKHgpID4gTWF0aC5hYnMoeikgKyBNYXRoLmFicyhxKSkge1xuICAgICAgICAgICAgICBILnNldChcbiAgICAgICAgICAgICAgICBpICsgMSxcbiAgICAgICAgICAgICAgICBuIC0gMSxcbiAgICAgICAgICAgICAgICAoLXJhIC0gdyAqIEguZ2V0KGksIG4gLSAxKSArIHEgKiBILmdldChpLCBuKSkgLyB4LFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBILnNldChcbiAgICAgICAgICAgICAgICBpICsgMSxcbiAgICAgICAgICAgICAgICBuLFxuICAgICAgICAgICAgICAgICgtc2EgLSB3ICogSC5nZXQoaSwgbikgLSBxICogSC5nZXQoaSwgbiAtIDEpKSAvIHgsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjZGl2cmVzID0gY2RpdihcbiAgICAgICAgICAgICAgICAtciAtIHkgKiBILmdldChpLCBuIC0gMSksXG4gICAgICAgICAgICAgICAgLXMgLSB5ICogSC5nZXQoaSwgbiksXG4gICAgICAgICAgICAgICAgeixcbiAgICAgICAgICAgICAgICBxLFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBILnNldChpICsgMSwgbiAtIDEsIGNkaXZyZXNbMF0pO1xuICAgICAgICAgICAgICBILnNldChpICsgMSwgbiwgY2RpdnJlc1sxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdCA9IE1hdGgubWF4KE1hdGguYWJzKEguZ2V0KGksIG4gLSAxKSksIE1hdGguYWJzKEguZ2V0KGksIG4pKSk7XG4gICAgICAgICAgaWYgKGVwcyAqIHQgKiB0ID4gMSkge1xuICAgICAgICAgICAgZm9yIChqID0gaTsgaiA8PSBuOyBqKyspIHtcbiAgICAgICAgICAgICAgSC5zZXQoaiwgbiAtIDEsIEguZ2V0KGosIG4gLSAxKSAvIHQpO1xuICAgICAgICAgICAgICBILnNldChqLCBuLCBILmdldChqLCBuKSAvIHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZvciAoaSA9IDA7IGkgPCBubjsgaSsrKSB7XG4gICAgaWYgKGkgPCBsb3cgfHwgaSA+IGhpZ2gpIHtcbiAgICAgIGZvciAoaiA9IGk7IGogPCBubjsgaisrKSB7XG4gICAgICAgIFYuc2V0KGksIGosIEguZ2V0KGksIGopKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmb3IgKGogPSBubiAtIDE7IGogPj0gbG93OyBqLS0pIHtcbiAgICBmb3IgKGkgPSBsb3c7IGkgPD0gaGlnaDsgaSsrKSB7XG4gICAgICB6ID0gMDtcbiAgICAgIGZvciAoayA9IGxvdzsgayA8PSBNYXRoLm1pbihqLCBoaWdoKTsgaysrKSB7XG4gICAgICAgIHogPSB6ICsgVi5nZXQoaSwgaykgKiBILmdldChrLCBqKTtcbiAgICAgIH1cbiAgICAgIFYuc2V0KGksIGosIHopO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjZGl2KHhyLCB4aSwgeXIsIHlpKSB7XG4gIGxldCByLCBkO1xuICBpZiAoTWF0aC5hYnMoeXIpID4gTWF0aC5hYnMoeWkpKSB7XG4gICAgciA9IHlpIC8geXI7XG4gICAgZCA9IHlyICsgciAqIHlpO1xuICAgIHJldHVybiBbKHhyICsgciAqIHhpKSAvIGQsICh4aSAtIHIgKiB4cikgLyBkXTtcbiAgfSBlbHNlIHtcbiAgICByID0geXIgLyB5aTtcbiAgICBkID0geWkgKyByICogeXI7XG4gICAgcmV0dXJuIFsociAqIHhyICsgeGkpIC8gZCwgKHIgKiB4aSAtIHhyKSAvIGRdO1xuICB9XG59XG4iLCJpbXBvcnQgTWF0cml4IGZyb20gJy4uL21hdHJpeCc7XG5pbXBvcnQgV3JhcHBlck1hdHJpeDJEIGZyb20gJy4uL3dyYXAvV3JhcHBlck1hdHJpeDJEJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTHVEZWNvbXBvc2l0aW9uIHtcbiAgY29uc3RydWN0b3IobWF0cml4KSB7XG4gICAgbWF0cml4ID0gV3JhcHBlck1hdHJpeDJELmNoZWNrTWF0cml4KG1hdHJpeCk7XG5cbiAgICBsZXQgbHUgPSBtYXRyaXguY2xvbmUoKTtcbiAgICBsZXQgcm93cyA9IGx1LnJvd3M7XG4gICAgbGV0IGNvbHVtbnMgPSBsdS5jb2x1bW5zO1xuICAgIGxldCBwaXZvdFZlY3RvciA9IG5ldyBGbG9hdDY0QXJyYXkocm93cyk7XG4gICAgbGV0IHBpdm90U2lnbiA9IDE7XG4gICAgbGV0IGksIGosIGssIHAsIHMsIHQsIHY7XG4gICAgbGV0IExVY29saiwga21heDtcblxuICAgIGZvciAoaSA9IDA7IGkgPCByb3dzOyBpKyspIHtcbiAgICAgIHBpdm90VmVjdG9yW2ldID0gaTtcbiAgICB9XG5cbiAgICBMVWNvbGogPSBuZXcgRmxvYXQ2NEFycmF5KHJvd3MpO1xuXG4gICAgZm9yIChqID0gMDsgaiA8IGNvbHVtbnM7IGorKykge1xuICAgICAgZm9yIChpID0gMDsgaSA8IHJvd3M7IGkrKykge1xuICAgICAgICBMVWNvbGpbaV0gPSBsdS5nZXQoaSwgaik7XG4gICAgICB9XG5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCByb3dzOyBpKyspIHtcbiAgICAgICAga21heCA9IE1hdGgubWluKGksIGopO1xuICAgICAgICBzID0gMDtcbiAgICAgICAgZm9yIChrID0gMDsgayA8IGttYXg7IGsrKykge1xuICAgICAgICAgIHMgKz0gbHUuZ2V0KGksIGspICogTFVjb2xqW2tdO1xuICAgICAgICB9XG4gICAgICAgIExVY29saltpXSAtPSBzO1xuICAgICAgICBsdS5zZXQoaSwgaiwgTFVjb2xqW2ldKTtcbiAgICAgIH1cblxuICAgICAgcCA9IGo7XG4gICAgICBmb3IgKGkgPSBqICsgMTsgaSA8IHJvd3M7IGkrKykge1xuICAgICAgICBpZiAoTWF0aC5hYnMoTFVjb2xqW2ldKSA+IE1hdGguYWJzKExVY29saltwXSkpIHtcbiAgICAgICAgICBwID0gaTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAocCAhPT0gaikge1xuICAgICAgICBmb3IgKGsgPSAwOyBrIDwgY29sdW1uczsgaysrKSB7XG4gICAgICAgICAgdCA9IGx1LmdldChwLCBrKTtcbiAgICAgICAgICBsdS5zZXQocCwgaywgbHUuZ2V0KGosIGspKTtcbiAgICAgICAgICBsdS5zZXQoaiwgaywgdCk7XG4gICAgICAgIH1cblxuICAgICAgICB2ID0gcGl2b3RWZWN0b3JbcF07XG4gICAgICAgIHBpdm90VmVjdG9yW3BdID0gcGl2b3RWZWN0b3Jbal07XG4gICAgICAgIHBpdm90VmVjdG9yW2pdID0gdjtcblxuICAgICAgICBwaXZvdFNpZ24gPSAtcGl2b3RTaWduO1xuICAgICAgfVxuXG4gICAgICBpZiAoaiA8IHJvd3MgJiYgbHUuZ2V0KGosIGopICE9PSAwKSB7XG4gICAgICAgIGZvciAoaSA9IGogKyAxOyBpIDwgcm93czsgaSsrKSB7XG4gICAgICAgICAgbHUuc2V0KGksIGosIGx1LmdldChpLCBqKSAvIGx1LmdldChqLCBqKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLkxVID0gbHU7XG4gICAgdGhpcy5waXZvdFZlY3RvciA9IHBpdm90VmVjdG9yO1xuICAgIHRoaXMucGl2b3RTaWduID0gcGl2b3RTaWduO1xuICB9XG5cbiAgaXNTaW5ndWxhcigpIHtcbiAgICBsZXQgZGF0YSA9IHRoaXMuTFU7XG4gICAgbGV0IGNvbCA9IGRhdGEuY29sdW1ucztcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNvbDsgaisrKSB7XG4gICAgICBpZiAoZGF0YS5nZXQoaiwgaikgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHNvbHZlKHZhbHVlKSB7XG4gICAgdmFsdWUgPSBNYXRyaXguY2hlY2tNYXRyaXgodmFsdWUpO1xuXG4gICAgbGV0IGx1ID0gdGhpcy5MVTtcbiAgICBsZXQgcm93cyA9IGx1LnJvd3M7XG5cbiAgICBpZiAocm93cyAhPT0gdmFsdWUucm93cykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIG1hdHJpeCBkaW1lbnNpb25zJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLmlzU2luZ3VsYXIoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdMVSBtYXRyaXggaXMgc2luZ3VsYXInKTtcbiAgICB9XG5cbiAgICBsZXQgY291bnQgPSB2YWx1ZS5jb2x1bW5zO1xuICAgIGxldCBYID0gdmFsdWUuc3ViTWF0cml4Um93KHRoaXMucGl2b3RWZWN0b3IsIDAsIGNvdW50IC0gMSk7XG4gICAgbGV0IGNvbHVtbnMgPSBsdS5jb2x1bW5zO1xuICAgIGxldCBpLCBqLCBrO1xuXG4gICAgZm9yIChrID0gMDsgayA8IGNvbHVtbnM7IGsrKykge1xuICAgICAgZm9yIChpID0gayArIDE7IGkgPCBjb2x1bW5zOyBpKyspIHtcbiAgICAgICAgZm9yIChqID0gMDsgaiA8IGNvdW50OyBqKyspIHtcbiAgICAgICAgICBYLnNldChpLCBqLCBYLmdldChpLCBqKSAtIFguZ2V0KGssIGopICogbHUuZ2V0KGksIGspKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGsgPSBjb2x1bW5zIC0gMTsgayA+PSAwOyBrLS0pIHtcbiAgICAgIGZvciAoaiA9IDA7IGogPCBjb3VudDsgaisrKSB7XG4gICAgICAgIFguc2V0KGssIGosIFguZ2V0KGssIGopIC8gbHUuZ2V0KGssIGspKTtcbiAgICAgIH1cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBrOyBpKyspIHtcbiAgICAgICAgZm9yIChqID0gMDsgaiA8IGNvdW50OyBqKyspIHtcbiAgICAgICAgICBYLnNldChpLCBqLCBYLmdldChpLCBqKSAtIFguZ2V0KGssIGopICogbHUuZ2V0KGksIGspKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gWDtcbiAgfVxuXG4gIGdldCBkZXRlcm1pbmFudCgpIHtcbiAgICBsZXQgZGF0YSA9IHRoaXMuTFU7XG4gICAgaWYgKCFkYXRhLmlzU3F1YXJlKCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWF0cml4IG11c3QgYmUgc3F1YXJlJyk7XG4gICAgfVxuICAgIGxldCBkZXRlcm1pbmFudCA9IHRoaXMucGl2b3RTaWduO1xuICAgIGxldCBjb2wgPSBkYXRhLmNvbHVtbnM7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBjb2w7IGorKykge1xuICAgICAgZGV0ZXJtaW5hbnQgKj0gZGF0YS5nZXQoaiwgaik7XG4gICAgfVxuICAgIHJldHVybiBkZXRlcm1pbmFudDtcbiAgfVxuXG4gIGdldCBsb3dlclRyaWFuZ3VsYXJNYXRyaXgoKSB7XG4gICAgbGV0IGRhdGEgPSB0aGlzLkxVO1xuICAgIGxldCByb3dzID0gZGF0YS5yb3dzO1xuICAgIGxldCBjb2x1bW5zID0gZGF0YS5jb2x1bW5zO1xuICAgIGxldCBYID0gbmV3IE1hdHJpeChyb3dzLCBjb2x1bW5zKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjb2x1bW5zOyBqKyspIHtcbiAgICAgICAgaWYgKGkgPiBqKSB7XG4gICAgICAgICAgWC5zZXQoaSwgaiwgZGF0YS5nZXQoaSwgaikpO1xuICAgICAgICB9IGVsc2UgaWYgKGkgPT09IGopIHtcbiAgICAgICAgICBYLnNldChpLCBqLCAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBYLnNldChpLCBqLCAwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gWDtcbiAgfVxuXG4gIGdldCB1cHBlclRyaWFuZ3VsYXJNYXRyaXgoKSB7XG4gICAgbGV0IGRhdGEgPSB0aGlzLkxVO1xuICAgIGxldCByb3dzID0gZGF0YS5yb3dzO1xuICAgIGxldCBjb2x1bW5zID0gZGF0YS5jb2x1bW5zO1xuICAgIGxldCBYID0gbmV3IE1hdHJpeChyb3dzLCBjb2x1bW5zKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjb2x1bW5zOyBqKyspIHtcbiAgICAgICAgaWYgKGkgPD0gaikge1xuICAgICAgICAgIFguc2V0KGksIGosIGRhdGEuZ2V0KGksIGopKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBYLnNldChpLCBqLCAwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gWDtcbiAgfVxuXG4gIGdldCBwaXZvdFBlcm11dGF0aW9uVmVjdG9yKCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMucGl2b3RWZWN0b3IpO1xuICB9XG59XG4iLCJpbXBvcnQgTWF0cml4IGZyb20gJy4uL21hdHJpeCc7XG5pbXBvcnQgV3JhcHBlck1hdHJpeDJEIGZyb20gJy4uL3dyYXAvV3JhcHBlck1hdHJpeDJEJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgbmlwYWxzIHtcbiAgY29uc3RydWN0b3IoWCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgWCA9IFdyYXBwZXJNYXRyaXgyRC5jaGVja01hdHJpeChYKTtcbiAgICBsZXQgeyBZIH0gPSBvcHRpb25zO1xuICAgIGNvbnN0IHtcbiAgICAgIHNjYWxlU2NvcmVzID0gZmFsc2UsXG4gICAgICBtYXhJdGVyYXRpb25zID0gMTAwMCxcbiAgICAgIHRlcm1pbmF0aW9uQ3JpdGVyaWEgPSAxZS0xMCxcbiAgICB9ID0gb3B0aW9ucztcblxuICAgIGxldCB1O1xuICAgIGlmIChZKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShZKSAmJiB0eXBlb2YgWVswXSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgWSA9IE1hdHJpeC5jb2x1bW5WZWN0b3IoWSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBZID0gV3JhcHBlck1hdHJpeDJELmNoZWNrTWF0cml4KFkpO1xuICAgICAgfVxuICAgICAgaWYgKCFZLmlzQ29sdW1uVmVjdG9yKCkgfHwgWS5yb3dzICE9PSBYLnJvd3MpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZIG11c3QgYmUgYSBjb2x1bW4gdmVjdG9yIG9mIGxlbmd0aCBYLnJvd3MnKTtcbiAgICAgIH1cbiAgICAgIHUgPSBZO1xuICAgIH0gZWxzZSB7XG4gICAgICB1ID0gWC5nZXRDb2x1bW5WZWN0b3IoMCk7XG4gICAgfVxuXG4gICAgbGV0IGRpZmYgPSAxO1xuICAgIGxldCB0LCBxLCB3LCB0T2xkO1xuXG4gICAgZm9yIChcbiAgICAgIGxldCBjb3VudGVyID0gMDtcbiAgICAgIGNvdW50ZXIgPCBtYXhJdGVyYXRpb25zICYmIGRpZmYgPiB0ZXJtaW5hdGlvbkNyaXRlcmlhO1xuICAgICAgY291bnRlcisrXG4gICAgKSB7XG4gICAgICB3ID0gWC50cmFuc3Bvc2UoKS5tbXVsKHUpLmRpdih1LnRyYW5zcG9zZSgpLm1tdWwodSkuZ2V0KDAsIDApKTtcbiAgICAgIHcgPSB3LmRpdih3Lm5vcm0oKSk7XG5cbiAgICAgIHQgPSBYLm1tdWwodykuZGl2KHcudHJhbnNwb3NlKCkubW11bCh3KS5nZXQoMCwgMCkpO1xuXG4gICAgICBpZiAoY291bnRlciA+IDApIHtcbiAgICAgICAgZGlmZiA9IHQuY2xvbmUoKS5zdWIodE9sZCkucG93KDIpLnN1bSgpO1xuICAgICAgfVxuICAgICAgdE9sZCA9IHQuY2xvbmUoKTtcblxuICAgICAgaWYgKFkpIHtcbiAgICAgICAgcSA9IFkudHJhbnNwb3NlKCkubW11bCh0KS5kaXYodC50cmFuc3Bvc2UoKS5tbXVsKHQpLmdldCgwLCAwKSk7XG4gICAgICAgIHEgPSBxLmRpdihxLm5vcm0oKSk7XG5cbiAgICAgICAgdSA9IFkubW11bChxKS5kaXYocS50cmFuc3Bvc2UoKS5tbXVsKHEpLmdldCgwLCAwKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1ID0gdDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoWSkge1xuICAgICAgbGV0IHAgPSBYLnRyYW5zcG9zZSgpLm1tdWwodCkuZGl2KHQudHJhbnNwb3NlKCkubW11bCh0KS5nZXQoMCwgMCkpO1xuICAgICAgcCA9IHAuZGl2KHAubm9ybSgpKTtcbiAgICAgIGxldCB4UmVzaWR1YWwgPSBYLmNsb25lKCkuc3ViKHQuY2xvbmUoKS5tbXVsKHAudHJhbnNwb3NlKCkpKTtcbiAgICAgIGxldCByZXNpZHVhbCA9IHUudHJhbnNwb3NlKCkubW11bCh0KS5kaXYodC50cmFuc3Bvc2UoKS5tbXVsKHQpLmdldCgwLCAwKSk7XG4gICAgICBsZXQgeVJlc2lkdWFsID0gWS5jbG9uZSgpLnN1YihcbiAgICAgICAgdC5jbG9uZSgpLm11bFMocmVzaWR1YWwuZ2V0KDAsIDApKS5tbXVsKHEudHJhbnNwb3NlKCkpLFxuICAgICAgKTtcblxuICAgICAgdGhpcy50ID0gdDtcbiAgICAgIHRoaXMucCA9IHAudHJhbnNwb3NlKCk7XG4gICAgICB0aGlzLncgPSB3LnRyYW5zcG9zZSgpO1xuICAgICAgdGhpcy5xID0gcTtcbiAgICAgIHRoaXMudSA9IHU7XG4gICAgICB0aGlzLnMgPSB0LnRyYW5zcG9zZSgpLm1tdWwodCk7XG4gICAgICB0aGlzLnhSZXNpZHVhbCA9IHhSZXNpZHVhbDtcbiAgICAgIHRoaXMueVJlc2lkdWFsID0geVJlc2lkdWFsO1xuICAgICAgdGhpcy5iZXRhcyA9IHJlc2lkdWFsO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLncgPSB3LnRyYW5zcG9zZSgpO1xuICAgICAgdGhpcy5zID0gdC50cmFuc3Bvc2UoKS5tbXVsKHQpLnNxcnQoKTtcbiAgICAgIGlmIChzY2FsZVNjb3Jlcykge1xuICAgICAgICB0aGlzLnQgPSB0LmNsb25lKCkuZGl2KHRoaXMucy5nZXQoMCwgMCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy50ID0gdDtcbiAgICAgIH1cbiAgICAgIHRoaXMueFJlc2lkdWFsID0gWC5zdWIodC5tbXVsKHcudHJhbnNwb3NlKCkpKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBNYXRyaXggZnJvbSAnLi4vbWF0cml4JztcbmltcG9ydCBXcmFwcGVyTWF0cml4MkQgZnJvbSAnLi4vd3JhcC9XcmFwcGVyTWF0cml4MkQnO1xuXG5pbXBvcnQgeyBoeXBvdGVudXNlIH0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUXJEZWNvbXBvc2l0aW9uIHtcbiAgY29uc3RydWN0b3IodmFsdWUpIHtcbiAgICB2YWx1ZSA9IFdyYXBwZXJNYXRyaXgyRC5jaGVja01hdHJpeCh2YWx1ZSk7XG5cbiAgICBsZXQgcXIgPSB2YWx1ZS5jbG9uZSgpO1xuICAgIGxldCBtID0gdmFsdWUucm93cztcbiAgICBsZXQgbiA9IHZhbHVlLmNvbHVtbnM7XG4gICAgbGV0IHJkaWFnID0gbmV3IEZsb2F0NjRBcnJheShuKTtcbiAgICBsZXQgaSwgaiwgaywgcztcblxuICAgIGZvciAoayA9IDA7IGsgPCBuOyBrKyspIHtcbiAgICAgIGxldCBucm0gPSAwO1xuICAgICAgZm9yIChpID0gazsgaSA8IG07IGkrKykge1xuICAgICAgICBucm0gPSBoeXBvdGVudXNlKG5ybSwgcXIuZ2V0KGksIGspKTtcbiAgICAgIH1cbiAgICAgIGlmIChucm0gIT09IDApIHtcbiAgICAgICAgaWYgKHFyLmdldChrLCBrKSA8IDApIHtcbiAgICAgICAgICBucm0gPSAtbnJtO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IGs7IGkgPCBtOyBpKyspIHtcbiAgICAgICAgICBxci5zZXQoaSwgaywgcXIuZ2V0KGksIGspIC8gbnJtKTtcbiAgICAgICAgfVxuICAgICAgICBxci5zZXQoaywgaywgcXIuZ2V0KGssIGspICsgMSk7XG4gICAgICAgIGZvciAoaiA9IGsgKyAxOyBqIDwgbjsgaisrKSB7XG4gICAgICAgICAgcyA9IDA7XG4gICAgICAgICAgZm9yIChpID0gazsgaSA8IG07IGkrKykge1xuICAgICAgICAgICAgcyArPSBxci5nZXQoaSwgaykgKiBxci5nZXQoaSwgaik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHMgPSAtcyAvIHFyLmdldChrLCBrKTtcbiAgICAgICAgICBmb3IgKGkgPSBrOyBpIDwgbTsgaSsrKSB7XG4gICAgICAgICAgICBxci5zZXQoaSwgaiwgcXIuZ2V0KGksIGopICsgcyAqIHFyLmdldChpLCBrKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZGlhZ1trXSA9IC1ucm07XG4gICAgfVxuXG4gICAgdGhpcy5RUiA9IHFyO1xuICAgIHRoaXMuUmRpYWcgPSByZGlhZztcbiAgfVxuXG4gIHNvbHZlKHZhbHVlKSB7XG4gICAgdmFsdWUgPSBNYXRyaXguY2hlY2tNYXRyaXgodmFsdWUpO1xuXG4gICAgbGV0IHFyID0gdGhpcy5RUjtcbiAgICBsZXQgbSA9IHFyLnJvd3M7XG5cbiAgICBpZiAodmFsdWUucm93cyAhPT0gbSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNYXRyaXggcm93IGRpbWVuc2lvbnMgbXVzdCBhZ3JlZScpO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuaXNGdWxsUmFuaygpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hdHJpeCBpcyByYW5rIGRlZmljaWVudCcpO1xuICAgIH1cblxuICAgIGxldCBjb3VudCA9IHZhbHVlLmNvbHVtbnM7XG4gICAgbGV0IFggPSB2YWx1ZS5jbG9uZSgpO1xuICAgIGxldCBuID0gcXIuY29sdW1ucztcbiAgICBsZXQgaSwgaiwgaywgcztcblxuICAgIGZvciAoayA9IDA7IGsgPCBuOyBrKyspIHtcbiAgICAgIGZvciAoaiA9IDA7IGogPCBjb3VudDsgaisrKSB7XG4gICAgICAgIHMgPSAwO1xuICAgICAgICBmb3IgKGkgPSBrOyBpIDwgbTsgaSsrKSB7XG4gICAgICAgICAgcyArPSBxci5nZXQoaSwgaykgKiBYLmdldChpLCBqKTtcbiAgICAgICAgfVxuICAgICAgICBzID0gLXMgLyBxci5nZXQoaywgayk7XG4gICAgICAgIGZvciAoaSA9IGs7IGkgPCBtOyBpKyspIHtcbiAgICAgICAgICBYLnNldChpLCBqLCBYLmdldChpLCBqKSArIHMgKiBxci5nZXQoaSwgaykpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAoayA9IG4gLSAxOyBrID49IDA7IGstLSkge1xuICAgICAgZm9yIChqID0gMDsgaiA8IGNvdW50OyBqKyspIHtcbiAgICAgICAgWC5zZXQoaywgaiwgWC5nZXQoaywgaikgLyB0aGlzLlJkaWFnW2tdKTtcbiAgICAgIH1cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBrOyBpKyspIHtcbiAgICAgICAgZm9yIChqID0gMDsgaiA8IGNvdW50OyBqKyspIHtcbiAgICAgICAgICBYLnNldChpLCBqLCBYLmdldChpLCBqKSAtIFguZ2V0KGssIGopICogcXIuZ2V0KGksIGspKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBYLnN1Yk1hdHJpeCgwLCBuIC0gMSwgMCwgY291bnQgLSAxKTtcbiAgfVxuXG4gIGlzRnVsbFJhbmsoKSB7XG4gICAgbGV0IGNvbHVtbnMgPSB0aGlzLlFSLmNvbHVtbnM7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb2x1bW5zOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLlJkaWFnW2ldID09PSAwKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBnZXQgdXBwZXJUcmlhbmd1bGFyTWF0cml4KCkge1xuICAgIGxldCBxciA9IHRoaXMuUVI7XG4gICAgbGV0IG4gPSBxci5jb2x1bW5zO1xuICAgIGxldCBYID0gbmV3IE1hdHJpeChuLCBuKTtcbiAgICBsZXQgaSwgajtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICBmb3IgKGogPSAwOyBqIDwgbjsgaisrKSB7XG4gICAgICAgIGlmIChpIDwgaikge1xuICAgICAgICAgIFguc2V0KGksIGosIHFyLmdldChpLCBqKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaSA9PT0gaikge1xuICAgICAgICAgIFguc2V0KGksIGosIHRoaXMuUmRpYWdbaV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIFguc2V0KGksIGosIDApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBYO1xuICB9XG5cbiAgZ2V0IG9ydGhvZ29uYWxNYXRyaXgoKSB7XG4gICAgbGV0IHFyID0gdGhpcy5RUjtcbiAgICBsZXQgcm93cyA9IHFyLnJvd3M7XG4gICAgbGV0IGNvbHVtbnMgPSBxci5jb2x1bW5zO1xuICAgIGxldCBYID0gbmV3IE1hdHJpeChyb3dzLCBjb2x1bW5zKTtcbiAgICBsZXQgaSwgaiwgaywgcztcblxuICAgIGZvciAoayA9IGNvbHVtbnMgLSAxOyBrID49IDA7IGstLSkge1xuICAgICAgZm9yIChpID0gMDsgaSA8IHJvd3M7IGkrKykge1xuICAgICAgICBYLnNldChpLCBrLCAwKTtcbiAgICAgIH1cbiAgICAgIFguc2V0KGssIGssIDEpO1xuICAgICAgZm9yIChqID0gazsgaiA8IGNvbHVtbnM7IGorKykge1xuICAgICAgICBpZiAocXIuZ2V0KGssIGspICE9PSAwKSB7XG4gICAgICAgICAgcyA9IDA7XG4gICAgICAgICAgZm9yIChpID0gazsgaSA8IHJvd3M7IGkrKykge1xuICAgICAgICAgICAgcyArPSBxci5nZXQoaSwgaykgKiBYLmdldChpLCBqKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzID0gLXMgLyBxci5nZXQoaywgayk7XG5cbiAgICAgICAgICBmb3IgKGkgPSBrOyBpIDwgcm93czsgaSsrKSB7XG4gICAgICAgICAgICBYLnNldChpLCBqLCBYLmdldChpLCBqKSArIHMgKiBxci5nZXQoaSwgaykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gWDtcbiAgfVxufVxuIiwiaW1wb3J0IE1hdHJpeCBmcm9tICcuLi9tYXRyaXgnO1xuaW1wb3J0IFdyYXBwZXJNYXRyaXgyRCBmcm9tICcuLi93cmFwL1dyYXBwZXJNYXRyaXgyRCc7XG5cbmltcG9ydCB7IGh5cG90ZW51c2UgfSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaW5ndWxhclZhbHVlRGVjb21wb3NpdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHZhbHVlLCBvcHRpb25zID0ge30pIHtcbiAgICB2YWx1ZSA9IFdyYXBwZXJNYXRyaXgyRC5jaGVja01hdHJpeCh2YWx1ZSk7XG5cbiAgICBsZXQgbSA9IHZhbHVlLnJvd3M7XG4gICAgbGV0IG4gPSB2YWx1ZS5jb2x1bW5zO1xuXG4gICAgY29uc3Qge1xuICAgICAgY29tcHV0ZUxlZnRTaW5ndWxhclZlY3RvcnMgPSB0cnVlLFxuICAgICAgY29tcHV0ZVJpZ2h0U2luZ3VsYXJWZWN0b3JzID0gdHJ1ZSxcbiAgICAgIGF1dG9UcmFuc3Bvc2UgPSBmYWxzZSxcbiAgICB9ID0gb3B0aW9ucztcblxuICAgIGxldCB3YW50dSA9IEJvb2xlYW4oY29tcHV0ZUxlZnRTaW5ndWxhclZlY3RvcnMpO1xuICAgIGxldCB3YW50diA9IEJvb2xlYW4oY29tcHV0ZVJpZ2h0U2luZ3VsYXJWZWN0b3JzKTtcblxuICAgIGxldCBzd2FwcGVkID0gZmFsc2U7XG4gICAgbGV0IGE7XG4gICAgaWYgKG0gPCBuKSB7XG4gICAgICBpZiAoIWF1dG9UcmFuc3Bvc2UpIHtcbiAgICAgICAgYSA9IHZhbHVlLmNsb25lKCk7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAnQ29tcHV0aW5nIFNWRCBvbiBhIG1hdHJpeCB3aXRoIG1vcmUgY29sdW1ucyB0aGFuIHJvd3MuIENvbnNpZGVyIGVuYWJsaW5nIGF1dG9UcmFuc3Bvc2UnLFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYSA9IHZhbHVlLnRyYW5zcG9zZSgpO1xuICAgICAgICBtID0gYS5yb3dzO1xuICAgICAgICBuID0gYS5jb2x1bW5zO1xuICAgICAgICBzd2FwcGVkID0gdHJ1ZTtcbiAgICAgICAgbGV0IGF1eCA9IHdhbnR1O1xuICAgICAgICB3YW50dSA9IHdhbnR2O1xuICAgICAgICB3YW50diA9IGF1eDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgYSA9IHZhbHVlLmNsb25lKCk7XG4gICAgfVxuXG4gICAgbGV0IG51ID0gTWF0aC5taW4obSwgbik7XG4gICAgbGV0IG5pID0gTWF0aC5taW4obSArIDEsIG4pO1xuICAgIGxldCBzID0gbmV3IEZsb2F0NjRBcnJheShuaSk7XG4gICAgbGV0IFUgPSBuZXcgTWF0cml4KG0sIG51KTtcbiAgICBsZXQgViA9IG5ldyBNYXRyaXgobiwgbik7XG5cbiAgICBsZXQgZSA9IG5ldyBGbG9hdDY0QXJyYXkobik7XG4gICAgbGV0IHdvcmsgPSBuZXcgRmxvYXQ2NEFycmF5KG0pO1xuXG4gICAgbGV0IHNpID0gbmV3IEZsb2F0NjRBcnJheShuaSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuaTsgaSsrKSBzaVtpXSA9IGk7XG5cbiAgICBsZXQgbmN0ID0gTWF0aC5taW4obSAtIDEsIG4pO1xuICAgIGxldCBucnQgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihuIC0gMiwgbSkpO1xuICAgIGxldCBtcmMgPSBNYXRoLm1heChuY3QsIG5ydCk7XG5cbiAgICBmb3IgKGxldCBrID0gMDsgayA8IG1yYzsgaysrKSB7XG4gICAgICBpZiAoayA8IG5jdCkge1xuICAgICAgICBzW2tdID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IGs7IGkgPCBtOyBpKyspIHtcbiAgICAgICAgICBzW2tdID0gaHlwb3RlbnVzZShzW2tdLCBhLmdldChpLCBrKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNba10gIT09IDApIHtcbiAgICAgICAgICBpZiAoYS5nZXQoaywgaykgPCAwKSB7XG4gICAgICAgICAgICBzW2tdID0gLXNba107XG4gICAgICAgICAgfVxuICAgICAgICAgIGZvciAobGV0IGkgPSBrOyBpIDwgbTsgaSsrKSB7XG4gICAgICAgICAgICBhLnNldChpLCBrLCBhLmdldChpLCBrKSAvIHNba10pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBhLnNldChrLCBrLCBhLmdldChrLCBrKSArIDEpO1xuICAgICAgICB9XG4gICAgICAgIHNba10gPSAtc1trXTtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaiA9IGsgKyAxOyBqIDwgbjsgaisrKSB7XG4gICAgICAgIGlmIChrIDwgbmN0ICYmIHNba10gIT09IDApIHtcbiAgICAgICAgICBsZXQgdCA9IDA7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IGs7IGkgPCBtOyBpKyspIHtcbiAgICAgICAgICAgIHQgKz0gYS5nZXQoaSwgaykgKiBhLmdldChpLCBqKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdCA9IC10IC8gYS5nZXQoaywgayk7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IGs7IGkgPCBtOyBpKyspIHtcbiAgICAgICAgICAgIGEuc2V0KGksIGosIGEuZ2V0KGksIGopICsgdCAqIGEuZ2V0KGksIGspKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZVtqXSA9IGEuZ2V0KGssIGopO1xuICAgICAgfVxuXG4gICAgICBpZiAod2FudHUgJiYgayA8IG5jdCkge1xuICAgICAgICBmb3IgKGxldCBpID0gazsgaSA8IG07IGkrKykge1xuICAgICAgICAgIFUuc2V0KGksIGssIGEuZ2V0KGksIGspKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoayA8IG5ydCkge1xuICAgICAgICBlW2tdID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IGsgKyAxOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgZVtrXSA9IGh5cG90ZW51c2UoZVtrXSwgZVtpXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVba10gIT09IDApIHtcbiAgICAgICAgICBpZiAoZVtrICsgMV0gPCAwKSB7XG4gICAgICAgICAgICBlW2tdID0gMCAtIGVba107XG4gICAgICAgICAgfVxuICAgICAgICAgIGZvciAobGV0IGkgPSBrICsgMTsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgZVtpXSAvPSBlW2tdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlW2sgKyAxXSArPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVba10gPSAtZVtrXTtcbiAgICAgICAgaWYgKGsgKyAxIDwgbSAmJiBlW2tdICE9PSAwKSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IGsgKyAxOyBpIDwgbTsgaSsrKSB7XG4gICAgICAgICAgICB3b3JrW2ldID0gMDtcbiAgICAgICAgICB9XG4gICAgICAgICAgZm9yIChsZXQgaSA9IGsgKyAxOyBpIDwgbTsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gayArIDE7IGogPCBuOyBqKyspIHtcbiAgICAgICAgICAgICAgd29ya1tpXSArPSBlW2pdICogYS5nZXQoaSwgaik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGZvciAobGV0IGogPSBrICsgMTsgaiA8IG47IGorKykge1xuICAgICAgICAgICAgbGV0IHQgPSAtZVtqXSAvIGVbayArIDFdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IGsgKyAxOyBpIDwgbTsgaSsrKSB7XG4gICAgICAgICAgICAgIGEuc2V0KGksIGosIGEuZ2V0KGksIGopICsgdCAqIHdvcmtbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAod2FudHYpIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gayArIDE7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIFYuc2V0KGksIGssIGVbaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBwID0gTWF0aC5taW4obiwgbSArIDEpO1xuICAgIGlmIChuY3QgPCBuKSB7XG4gICAgICBzW25jdF0gPSBhLmdldChuY3QsIG5jdCk7XG4gICAgfVxuICAgIGlmIChtIDwgcCkge1xuICAgICAgc1twIC0gMV0gPSAwO1xuICAgIH1cbiAgICBpZiAobnJ0ICsgMSA8IHApIHtcbiAgICAgIGVbbnJ0XSA9IGEuZ2V0KG5ydCwgcCAtIDEpO1xuICAgIH1cbiAgICBlW3AgLSAxXSA9IDA7XG5cbiAgICBpZiAod2FudHUpIHtcbiAgICAgIGZvciAobGV0IGogPSBuY3Q7IGogPCBudTsgaisrKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbTsgaSsrKSB7XG4gICAgICAgICAgVS5zZXQoaSwgaiwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgVS5zZXQoaiwgaiwgMSk7XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBrID0gbmN0IC0gMTsgayA+PSAwOyBrLS0pIHtcbiAgICAgICAgaWYgKHNba10gIT09IDApIHtcbiAgICAgICAgICBmb3IgKGxldCBqID0gayArIDE7IGogPCBudTsgaisrKSB7XG4gICAgICAgICAgICBsZXQgdCA9IDA7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gazsgaSA8IG07IGkrKykge1xuICAgICAgICAgICAgICB0ICs9IFUuZ2V0KGksIGspICogVS5nZXQoaSwgaik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0ID0gLXQgLyBVLmdldChrLCBrKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBrOyBpIDwgbTsgaSsrKSB7XG4gICAgICAgICAgICAgIFUuc2V0KGksIGosIFUuZ2V0KGksIGopICsgdCAqIFUuZ2V0KGksIGspKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZm9yIChsZXQgaSA9IGs7IGkgPCBtOyBpKyspIHtcbiAgICAgICAgICAgIFUuc2V0KGksIGssIC1VLmdldChpLCBrKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIFUuc2V0KGssIGssIDEgKyBVLmdldChrLCBrKSk7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICBVLnNldChpLCBrLCAwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtOyBpKyspIHtcbiAgICAgICAgICAgIFUuc2V0KGksIGssIDApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBVLnNldChrLCBrLCAxKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh3YW50dikge1xuICAgICAgZm9yIChsZXQgayA9IG4gLSAxOyBrID49IDA7IGstLSkge1xuICAgICAgICBpZiAoayA8IG5ydCAmJiBlW2tdICE9PSAwKSB7XG4gICAgICAgICAgZm9yIChsZXQgaiA9IGsgKyAxOyBqIDwgbjsgaisrKSB7XG4gICAgICAgICAgICBsZXQgdCA9IDA7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gayArIDE7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgICAgdCArPSBWLmdldChpLCBrKSAqIFYuZ2V0KGksIGopO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdCA9IC10IC8gVi5nZXQoayArIDEsIGspO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IGsgKyAxOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICAgIFYuc2V0KGksIGosIFYuZ2V0KGksIGopICsgdCAqIFYuZ2V0KGksIGspKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICBWLnNldChpLCBrLCAwKTtcbiAgICAgICAgfVxuICAgICAgICBWLnNldChrLCBrLCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgcHAgPSBwIC0gMTtcbiAgICBsZXQgaXRlciA9IDA7XG4gICAgbGV0IGVwcyA9IE51bWJlci5FUFNJTE9OO1xuICAgIHdoaWxlIChwID4gMCkge1xuICAgICAgbGV0IGssIGthc2U7XG4gICAgICBmb3IgKGsgPSBwIC0gMjsgayA+PSAtMTsgay0tKSB7XG4gICAgICAgIGlmIChrID09PSAtMSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFscGhhID1cbiAgICAgICAgICBOdW1iZXIuTUlOX1ZBTFVFICsgZXBzICogTWF0aC5hYnMoc1trXSArIE1hdGguYWJzKHNbayArIDFdKSk7XG4gICAgICAgIGlmIChNYXRoLmFicyhlW2tdKSA8PSBhbHBoYSB8fCBOdW1iZXIuaXNOYU4oZVtrXSkpIHtcbiAgICAgICAgICBlW2tdID0gMDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGsgPT09IHAgLSAyKSB7XG4gICAgICAgIGthc2UgPSA0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGtzO1xuICAgICAgICBmb3IgKGtzID0gcCAtIDE7IGtzID49IGs7IGtzLS0pIHtcbiAgICAgICAgICBpZiAoa3MgPT09IGspIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsZXQgdCA9XG4gICAgICAgICAgICAoa3MgIT09IHAgPyBNYXRoLmFicyhlW2tzXSkgOiAwKSArXG4gICAgICAgICAgICAoa3MgIT09IGsgKyAxID8gTWF0aC5hYnMoZVtrcyAtIDFdKSA6IDApO1xuICAgICAgICAgIGlmIChNYXRoLmFicyhzW2tzXSkgPD0gZXBzICogdCkge1xuICAgICAgICAgICAgc1trc10gPSAwO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChrcyA9PT0gaykge1xuICAgICAgICAgIGthc2UgPSAzO1xuICAgICAgICB9IGVsc2UgaWYgKGtzID09PSBwIC0gMSkge1xuICAgICAgICAgIGthc2UgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGthc2UgPSAyO1xuICAgICAgICAgIGsgPSBrcztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBrKys7XG5cbiAgICAgIHN3aXRjaCAoa2FzZSkge1xuICAgICAgICBjYXNlIDE6IHtcbiAgICAgICAgICBsZXQgZiA9IGVbcCAtIDJdO1xuICAgICAgICAgIGVbcCAtIDJdID0gMDtcbiAgICAgICAgICBmb3IgKGxldCBqID0gcCAtIDI7IGogPj0gazsgai0tKSB7XG4gICAgICAgICAgICBsZXQgdCA9IGh5cG90ZW51c2Uoc1tqXSwgZik7XG4gICAgICAgICAgICBsZXQgY3MgPSBzW2pdIC8gdDtcbiAgICAgICAgICAgIGxldCBzbiA9IGYgLyB0O1xuICAgICAgICAgICAgc1tqXSA9IHQ7XG4gICAgICAgICAgICBpZiAoaiAhPT0gaykge1xuICAgICAgICAgICAgICBmID0gLXNuICogZVtqIC0gMV07XG4gICAgICAgICAgICAgIGVbaiAtIDFdID0gY3MgKiBlW2ogLSAxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh3YW50dikge1xuICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgICAgIHQgPSBjcyAqIFYuZ2V0KGksIGopICsgc24gKiBWLmdldChpLCBwIC0gMSk7XG4gICAgICAgICAgICAgICAgVi5zZXQoaSwgcCAtIDEsIC1zbiAqIFYuZ2V0KGksIGopICsgY3MgKiBWLmdldChpLCBwIC0gMSkpO1xuICAgICAgICAgICAgICAgIFYuc2V0KGksIGosIHQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgMjoge1xuICAgICAgICAgIGxldCBmID0gZVtrIC0gMV07XG4gICAgICAgICAgZVtrIC0gMV0gPSAwO1xuICAgICAgICAgIGZvciAobGV0IGogPSBrOyBqIDwgcDsgaisrKSB7XG4gICAgICAgICAgICBsZXQgdCA9IGh5cG90ZW51c2Uoc1tqXSwgZik7XG4gICAgICAgICAgICBsZXQgY3MgPSBzW2pdIC8gdDtcbiAgICAgICAgICAgIGxldCBzbiA9IGYgLyB0O1xuICAgICAgICAgICAgc1tqXSA9IHQ7XG4gICAgICAgICAgICBmID0gLXNuICogZVtqXTtcbiAgICAgICAgICAgIGVbal0gPSBjcyAqIGVbal07XG4gICAgICAgICAgICBpZiAod2FudHUpIHtcbiAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0ID0gY3MgKiBVLmdldChpLCBqKSArIHNuICogVS5nZXQoaSwgayAtIDEpO1xuICAgICAgICAgICAgICAgIFUuc2V0KGksIGsgLSAxLCAtc24gKiBVLmdldChpLCBqKSArIGNzICogVS5nZXQoaSwgayAtIDEpKTtcbiAgICAgICAgICAgICAgICBVLnNldChpLCBqLCB0KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIDM6IHtcbiAgICAgICAgICBjb25zdCBzY2FsZSA9IE1hdGgubWF4KFxuICAgICAgICAgICAgTWF0aC5hYnMoc1twIC0gMV0pLFxuICAgICAgICAgICAgTWF0aC5hYnMoc1twIC0gMl0pLFxuICAgICAgICAgICAgTWF0aC5hYnMoZVtwIC0gMl0pLFxuICAgICAgICAgICAgTWF0aC5hYnMoc1trXSksXG4gICAgICAgICAgICBNYXRoLmFicyhlW2tdKSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnN0IHNwID0gc1twIC0gMV0gLyBzY2FsZTtcbiAgICAgICAgICBjb25zdCBzcG0xID0gc1twIC0gMl0gLyBzY2FsZTtcbiAgICAgICAgICBjb25zdCBlcG0xID0gZVtwIC0gMl0gLyBzY2FsZTtcbiAgICAgICAgICBjb25zdCBzayA9IHNba10gLyBzY2FsZTtcbiAgICAgICAgICBjb25zdCBlayA9IGVba10gLyBzY2FsZTtcbiAgICAgICAgICBjb25zdCBiID0gKChzcG0xICsgc3ApICogKHNwbTEgLSBzcCkgKyBlcG0xICogZXBtMSkgLyAyO1xuICAgICAgICAgIGNvbnN0IGMgPSBzcCAqIGVwbTEgKiAoc3AgKiBlcG0xKTtcbiAgICAgICAgICBsZXQgc2hpZnQgPSAwO1xuICAgICAgICAgIGlmIChiICE9PSAwIHx8IGMgIT09IDApIHtcbiAgICAgICAgICAgIGlmIChiIDwgMCkge1xuICAgICAgICAgICAgICBzaGlmdCA9IDAgLSBNYXRoLnNxcnQoYiAqIGIgKyBjKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHNoaWZ0ID0gTWF0aC5zcXJ0KGIgKiBiICsgYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzaGlmdCA9IGMgLyAoYiArIHNoaWZ0KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbGV0IGYgPSAoc2sgKyBzcCkgKiAoc2sgLSBzcCkgKyBzaGlmdDtcbiAgICAgICAgICBsZXQgZyA9IHNrICogZWs7XG4gICAgICAgICAgZm9yIChsZXQgaiA9IGs7IGogPCBwIC0gMTsgaisrKSB7XG4gICAgICAgICAgICBsZXQgdCA9IGh5cG90ZW51c2UoZiwgZyk7XG4gICAgICAgICAgICBpZiAodCA9PT0gMCkgdCA9IE51bWJlci5NSU5fVkFMVUU7XG4gICAgICAgICAgICBsZXQgY3MgPSBmIC8gdDtcbiAgICAgICAgICAgIGxldCBzbiA9IGcgLyB0O1xuICAgICAgICAgICAgaWYgKGogIT09IGspIHtcbiAgICAgICAgICAgICAgZVtqIC0gMV0gPSB0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZiA9IGNzICogc1tqXSArIHNuICogZVtqXTtcbiAgICAgICAgICAgIGVbal0gPSBjcyAqIGVbal0gLSBzbiAqIHNbal07XG4gICAgICAgICAgICBnID0gc24gKiBzW2ogKyAxXTtcbiAgICAgICAgICAgIHNbaiArIDFdID0gY3MgKiBzW2ogKyAxXTtcbiAgICAgICAgICAgIGlmICh3YW50dikge1xuICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgICAgIHQgPSBjcyAqIFYuZ2V0KGksIGopICsgc24gKiBWLmdldChpLCBqICsgMSk7XG4gICAgICAgICAgICAgICAgVi5zZXQoaSwgaiArIDEsIC1zbiAqIFYuZ2V0KGksIGopICsgY3MgKiBWLmdldChpLCBqICsgMSkpO1xuICAgICAgICAgICAgICAgIFYuc2V0KGksIGosIHQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0ID0gaHlwb3RlbnVzZShmLCBnKTtcbiAgICAgICAgICAgIGlmICh0ID09PSAwKSB0ID0gTnVtYmVyLk1JTl9WQUxVRTtcbiAgICAgICAgICAgIGNzID0gZiAvIHQ7XG4gICAgICAgICAgICBzbiA9IGcgLyB0O1xuICAgICAgICAgICAgc1tqXSA9IHQ7XG4gICAgICAgICAgICBmID0gY3MgKiBlW2pdICsgc24gKiBzW2ogKyAxXTtcbiAgICAgICAgICAgIHNbaiArIDFdID0gLXNuICogZVtqXSArIGNzICogc1tqICsgMV07XG4gICAgICAgICAgICBnID0gc24gKiBlW2ogKyAxXTtcbiAgICAgICAgICAgIGVbaiArIDFdID0gY3MgKiBlW2ogKyAxXTtcbiAgICAgICAgICAgIGlmICh3YW50dSAmJiBqIDwgbSAtIDEpIHtcbiAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0ID0gY3MgKiBVLmdldChpLCBqKSArIHNuICogVS5nZXQoaSwgaiArIDEpO1xuICAgICAgICAgICAgICAgIFUuc2V0KGksIGogKyAxLCAtc24gKiBVLmdldChpLCBqKSArIGNzICogVS5nZXQoaSwgaiArIDEpKTtcbiAgICAgICAgICAgICAgICBVLnNldChpLCBqLCB0KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBlW3AgLSAyXSA9IGY7XG4gICAgICAgICAgaXRlciA9IGl0ZXIgKyAxO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgNDoge1xuICAgICAgICAgIGlmIChzW2tdIDw9IDApIHtcbiAgICAgICAgICAgIHNba10gPSBzW2tdIDwgMCA/IC1zW2tdIDogMDtcbiAgICAgICAgICAgIGlmICh3YW50dikge1xuICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBwcDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgVi5zZXQoaSwgaywgLVYuZ2V0KGksIGspKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB3aGlsZSAoayA8IHBwKSB7XG4gICAgICAgICAgICBpZiAoc1trXSA+PSBzW2sgKyAxXSkge1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCB0ID0gc1trXTtcbiAgICAgICAgICAgIHNba10gPSBzW2sgKyAxXTtcbiAgICAgICAgICAgIHNbayArIDFdID0gdDtcbiAgICAgICAgICAgIGlmICh3YW50diAmJiBrIDwgbiAtIDEpIHtcbiAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0ID0gVi5nZXQoaSwgayArIDEpO1xuICAgICAgICAgICAgICAgIFYuc2V0KGksIGsgKyAxLCBWLmdldChpLCBrKSk7XG4gICAgICAgICAgICAgICAgVi5zZXQoaSwgaywgdCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh3YW50dSAmJiBrIDwgbSAtIDEpIHtcbiAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0ID0gVS5nZXQoaSwgayArIDEpO1xuICAgICAgICAgICAgICAgIFUuc2V0KGksIGsgKyAxLCBVLmdldChpLCBrKSk7XG4gICAgICAgICAgICAgICAgVS5zZXQoaSwgaywgdCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGsrKztcbiAgICAgICAgICB9XG4gICAgICAgICAgaXRlciA9IDA7XG4gICAgICAgICAgcC0tO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIC8vIG5vIGRlZmF1bHRcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3dhcHBlZCkge1xuICAgICAgbGV0IHRtcCA9IFY7XG4gICAgICBWID0gVTtcbiAgICAgIFUgPSB0bXA7XG4gICAgfVxuXG4gICAgdGhpcy5tID0gbTtcbiAgICB0aGlzLm4gPSBuO1xuICAgIHRoaXMucyA9IHM7XG4gICAgdGhpcy5VID0gVTtcbiAgICB0aGlzLlYgPSBWO1xuICB9XG5cbiAgc29sdmUodmFsdWUpIHtcbiAgICBsZXQgWSA9IHZhbHVlO1xuICAgIGxldCBlID0gdGhpcy50aHJlc2hvbGQ7XG4gICAgbGV0IHNjb2xzID0gdGhpcy5zLmxlbmd0aDtcbiAgICBsZXQgTHMgPSBNYXRyaXguemVyb3Moc2NvbHMsIHNjb2xzKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2NvbHM7IGkrKykge1xuICAgICAgaWYgKE1hdGguYWJzKHRoaXMuc1tpXSkgPD0gZSkge1xuICAgICAgICBMcy5zZXQoaSwgaSwgMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBMcy5zZXQoaSwgaSwgMSAvIHRoaXMuc1tpXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IFUgPSB0aGlzLlU7XG4gICAgbGV0IFYgPSB0aGlzLnJpZ2h0U2luZ3VsYXJWZWN0b3JzO1xuXG4gICAgbGV0IFZMID0gVi5tbXVsKExzKTtcbiAgICBsZXQgdnJvd3MgPSBWLnJvd3M7XG4gICAgbGV0IHVyb3dzID0gVS5yb3dzO1xuICAgIGxldCBWTFUgPSBNYXRyaXguemVyb3ModnJvd3MsIHVyb3dzKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB1cm93czsgaisrKSB7XG4gICAgICAgIGxldCBzdW0gPSAwO1xuICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHNjb2xzOyBrKyspIHtcbiAgICAgICAgICBzdW0gKz0gVkwuZ2V0KGksIGspICogVS5nZXQoaiwgayk7XG4gICAgICAgIH1cbiAgICAgICAgVkxVLnNldChpLCBqLCBzdW0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBWTFUubW11bChZKTtcbiAgfVxuXG4gIHNvbHZlRm9yRGlhZ29uYWwodmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5zb2x2ZShNYXRyaXguZGlhZyh2YWx1ZSkpO1xuICB9XG5cbiAgaW52ZXJzZSgpIHtcbiAgICBsZXQgViA9IHRoaXMuVjtcbiAgICBsZXQgZSA9IHRoaXMudGhyZXNob2xkO1xuICAgIGxldCB2cm93cyA9IFYucm93cztcbiAgICBsZXQgdmNvbHMgPSBWLmNvbHVtbnM7XG4gICAgbGV0IFggPSBuZXcgTWF0cml4KHZyb3dzLCB0aGlzLnMubGVuZ3RoKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB2Y29sczsgaisrKSB7XG4gICAgICAgIGlmIChNYXRoLmFicyh0aGlzLnNbal0pID4gZSkge1xuICAgICAgICAgIFguc2V0KGksIGosIFYuZ2V0KGksIGopIC8gdGhpcy5zW2pdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBVID0gdGhpcy5VO1xuXG4gICAgbGV0IHVyb3dzID0gVS5yb3dzO1xuICAgIGxldCB1Y29scyA9IFUuY29sdW1ucztcbiAgICBsZXQgWSA9IG5ldyBNYXRyaXgodnJvd3MsIHVyb3dzKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB1cm93czsgaisrKSB7XG4gICAgICAgIGxldCBzdW0gPSAwO1xuICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHVjb2xzOyBrKyspIHtcbiAgICAgICAgICBzdW0gKz0gWC5nZXQoaSwgaykgKiBVLmdldChqLCBrKTtcbiAgICAgICAgfVxuICAgICAgICBZLnNldChpLCBqLCBzdW0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBZO1xuICB9XG5cbiAgZ2V0IGNvbmRpdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5zWzBdIC8gdGhpcy5zW01hdGgubWluKHRoaXMubSwgdGhpcy5uKSAtIDFdO1xuICB9XG5cbiAgZ2V0IG5vcm0yKCkge1xuICAgIHJldHVybiB0aGlzLnNbMF07XG4gIH1cblxuICBnZXQgcmFuaygpIHtcbiAgICBsZXQgdG9sID0gTWF0aC5tYXgodGhpcy5tLCB0aGlzLm4pICogdGhpcy5zWzBdICogTnVtYmVyLkVQU0lMT047XG4gICAgbGV0IHIgPSAwO1xuICAgIGxldCBzID0gdGhpcy5zO1xuICAgIGZvciAobGV0IGkgPSAwLCBpaSA9IHMubGVuZ3RoOyBpIDwgaWk7IGkrKykge1xuICAgICAgaWYgKHNbaV0gPiB0b2wpIHtcbiAgICAgICAgcisrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcjtcbiAgfVxuXG4gIGdldCBkaWFnb25hbCgpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLnMpO1xuICB9XG5cbiAgZ2V0IHRocmVzaG9sZCgpIHtcbiAgICByZXR1cm4gKE51bWJlci5FUFNJTE9OIC8gMikgKiBNYXRoLm1heCh0aGlzLm0sIHRoaXMubikgKiB0aGlzLnNbMF07XG4gIH1cblxuICBnZXQgbGVmdFNpbmd1bGFyVmVjdG9ycygpIHtcbiAgICByZXR1cm4gdGhpcy5VO1xuICB9XG5cbiAgZ2V0IHJpZ2h0U2luZ3VsYXJWZWN0b3JzKCkge1xuICAgIHJldHVybiB0aGlzLlY7XG4gIH1cblxuICBnZXQgZGlhZ29uYWxNYXRyaXgoKSB7XG4gICAgcmV0dXJuIE1hdHJpeC5kaWFnKHRoaXMucyk7XG4gIH1cbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBoeXBvdGVudXNlKGEsIGIpIHtcbiAgbGV0IHIgPSAwO1xuICBpZiAoTWF0aC5hYnMoYSkgPiBNYXRoLmFicyhiKSkge1xuICAgIHIgPSBiIC8gYTtcbiAgICByZXR1cm4gTWF0aC5hYnMoYSkgKiBNYXRoLnNxcnQoMSArIHIgKiByKTtcbiAgfVxuICBpZiAoYiAhPT0gMCkge1xuICAgIHIgPSBhIC8gYjtcbiAgICByZXR1cm4gTWF0aC5hYnMoYikgKiBNYXRoLnNxcnQoMSArIHIgKiByKTtcbiAgfVxuICByZXR1cm4gMDtcbn1cbiIsImltcG9ydCBMdURlY29tcG9zaXRpb24gZnJvbSAnLi9kYy9sdSc7XG5pbXBvcnQgUXJEZWNvbXBvc2l0aW9uIGZyb20gJy4vZGMvcXInO1xuaW1wb3J0IFNpbmd1bGFyVmFsdWVEZWNvbXBvc2l0aW9uIGZyb20gJy4vZGMvc3ZkJztcbmltcG9ydCBNYXRyaXggZnJvbSAnLi9tYXRyaXgnO1xuaW1wb3J0IFdyYXBwZXJNYXRyaXgyRCBmcm9tICcuL3dyYXAvV3JhcHBlck1hdHJpeDJEJztcblxuZXhwb3J0IGZ1bmN0aW9uIGludmVyc2UobWF0cml4LCB1c2VTVkQgPSBmYWxzZSkge1xuICBtYXRyaXggPSBXcmFwcGVyTWF0cml4MkQuY2hlY2tNYXRyaXgobWF0cml4KTtcbiAgaWYgKHVzZVNWRCkge1xuICAgIHJldHVybiBuZXcgU2luZ3VsYXJWYWx1ZURlY29tcG9zaXRpb24obWF0cml4KS5pbnZlcnNlKCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHNvbHZlKG1hdHJpeCwgTWF0cml4LmV5ZShtYXRyaXgucm93cykpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzb2x2ZShsZWZ0SGFuZFNpZGUsIHJpZ2h0SGFuZFNpZGUsIHVzZVNWRCA9IGZhbHNlKSB7XG4gIGxlZnRIYW5kU2lkZSA9IFdyYXBwZXJNYXRyaXgyRC5jaGVja01hdHJpeChsZWZ0SGFuZFNpZGUpO1xuICByaWdodEhhbmRTaWRlID0gV3JhcHBlck1hdHJpeDJELmNoZWNrTWF0cml4KHJpZ2h0SGFuZFNpZGUpO1xuICBpZiAodXNlU1ZEKSB7XG4gICAgcmV0dXJuIG5ldyBTaW5ndWxhclZhbHVlRGVjb21wb3NpdGlvbihsZWZ0SGFuZFNpZGUpLnNvbHZlKHJpZ2h0SGFuZFNpZGUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBsZWZ0SGFuZFNpZGUuaXNTcXVhcmUoKVxuICAgICAgPyBuZXcgTHVEZWNvbXBvc2l0aW9uKGxlZnRIYW5kU2lkZSkuc29sdmUocmlnaHRIYW5kU2lkZSlcbiAgICAgIDogbmV3IFFyRGVjb21wb3NpdGlvbihsZWZ0SGFuZFNpZGUpLnNvbHZlKHJpZ2h0SGFuZFNpZGUpO1xuICB9XG59XG4iLCJpbXBvcnQgTHVEZWNvbXBvc2l0aW9uIGZyb20gJy4vZGMvbHUnO1xuaW1wb3J0IE1hdHJpeCBmcm9tICcuL21hdHJpeCc7XG5pbXBvcnQgTWF0cml4U2VsZWN0aW9uVmlldyBmcm9tICcuL3ZpZXdzL3NlbGVjdGlvbic7XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXRlcm1pbmFudChtYXRyaXgpIHtcbiAgbWF0cml4ID0gTWF0cml4LmNoZWNrTWF0cml4KG1hdHJpeCk7XG4gIGlmIChtYXRyaXguaXNTcXVhcmUoKSkge1xuICAgIGxldCBhLCBiLCBjLCBkO1xuICAgIGlmIChtYXRyaXguY29sdW1ucyA9PT0gMikge1xuICAgICAgLy8gMiB4IDIgbWF0cml4XG4gICAgICBhID0gbWF0cml4LmdldCgwLCAwKTtcbiAgICAgIGIgPSBtYXRyaXguZ2V0KDAsIDEpO1xuICAgICAgYyA9IG1hdHJpeC5nZXQoMSwgMCk7XG4gICAgICBkID0gbWF0cml4LmdldCgxLCAxKTtcblxuICAgICAgcmV0dXJuIGEgKiBkIC0gYiAqIGM7XG4gICAgfSBlbHNlIGlmIChtYXRyaXguY29sdW1ucyA9PT0gMykge1xuICAgICAgLy8gMyB4IDMgbWF0cml4XG4gICAgICBsZXQgc3ViTWF0cml4MCwgc3ViTWF0cml4MSwgc3ViTWF0cml4MjtcbiAgICAgIHN1Yk1hdHJpeDAgPSBuZXcgTWF0cml4U2VsZWN0aW9uVmlldyhtYXRyaXgsIFsxLCAyXSwgWzEsIDJdKTtcbiAgICAgIHN1Yk1hdHJpeDEgPSBuZXcgTWF0cml4U2VsZWN0aW9uVmlldyhtYXRyaXgsIFsxLCAyXSwgWzAsIDJdKTtcbiAgICAgIHN1Yk1hdHJpeDIgPSBuZXcgTWF0cml4U2VsZWN0aW9uVmlldyhtYXRyaXgsIFsxLCAyXSwgWzAsIDFdKTtcbiAgICAgIGEgPSBtYXRyaXguZ2V0KDAsIDApO1xuICAgICAgYiA9IG1hdHJpeC5nZXQoMCwgMSk7XG4gICAgICBjID0gbWF0cml4LmdldCgwLCAyKTtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgYSAqIGRldGVybWluYW50KHN1Yk1hdHJpeDApIC1cbiAgICAgICAgYiAqIGRldGVybWluYW50KHN1Yk1hdHJpeDEpICtcbiAgICAgICAgYyAqIGRldGVybWluYW50KHN1Yk1hdHJpeDIpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBnZW5lcmFsIHB1cnBvc2UgZGV0ZXJtaW5hbnQgdXNpbmcgdGhlIExVIGRlY29tcG9zaXRpb25cbiAgICAgIHJldHVybiBuZXcgTHVEZWNvbXBvc2l0aW9uKG1hdHJpeCkuZGV0ZXJtaW5hbnQ7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93IEVycm9yKCdkZXRlcm1pbmFudCBjYW4gb25seSBiZSBjYWxjdWxhdGVkIGZvciBhIHNxdWFyZSBtYXRyaXgnKTtcbiAgfVxufVxuIiwiZXhwb3J0IHsgQWJzdHJhY3RNYXRyaXgsIGRlZmF1bHQsIGRlZmF1bHQgYXMgTWF0cml4IH0gZnJvbSAnLi9tYXRyaXgnO1xuZXhwb3J0ICogZnJvbSAnLi92aWV3cy9pbmRleCc7XG5cbmV4cG9ydCB7IHdyYXAgfSBmcm9tICcuL3dyYXAvd3JhcCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFdyYXBwZXJNYXRyaXgxRCB9IGZyb20gJy4vd3JhcC9XcmFwcGVyTWF0cml4MUQnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBXcmFwcGVyTWF0cml4MkQgfSBmcm9tICcuL3dyYXAvV3JhcHBlck1hdHJpeDJEJztcblxuZXhwb3J0IHsgc29sdmUsIGludmVyc2UgfSBmcm9tICcuL2RlY29tcG9zaXRpb25zJztcbmV4cG9ydCB7IGRldGVybWluYW50IH0gZnJvbSAnLi9kZXRlcm1pbmFudCc7XG5leHBvcnQgeyBsaW5lYXJEZXBlbmRlbmNpZXMgfSBmcm9tICcuL2xpbmVhckRlcGVuZGVuY2llcyc7XG5leHBvcnQgeyBwc2V1ZG9JbnZlcnNlIH0gZnJvbSAnLi9wc2V1ZG9JbnZlcnNlJztcbmV4cG9ydCB7IGNvdmFyaWFuY2UgfSBmcm9tICcuL2NvdmFyaWFuY2UnO1xuZXhwb3J0IHsgY29ycmVsYXRpb24gfSBmcm9tICcuL2NvcnJlbGF0aW9uJztcblxuZXhwb3J0IHtcbiAgZGVmYXVsdCBhcyBTaW5ndWxhclZhbHVlRGVjb21wb3NpdGlvbixcbiAgZGVmYXVsdCBhcyBTVkQsXG59IGZyb20gJy4vZGMvc3ZkLmpzJztcbmV4cG9ydCB7XG4gIGRlZmF1bHQgYXMgRWlnZW52YWx1ZURlY29tcG9zaXRpb24sXG4gIGRlZmF1bHQgYXMgRVZELFxufSBmcm9tICcuL2RjL2V2ZC5qcyc7XG5leHBvcnQge1xuICBkZWZhdWx0IGFzIENob2xlc2t5RGVjb21wb3NpdGlvbixcbiAgZGVmYXVsdCBhcyBDSE8sXG59IGZyb20gJy4vZGMvY2hvbGVza3kuanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBMdURlY29tcG9zaXRpb24sIGRlZmF1bHQgYXMgTFUgfSBmcm9tICcuL2RjL2x1LmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUXJEZWNvbXBvc2l0aW9uLCBkZWZhdWx0IGFzIFFSIH0gZnJvbSAnLi9kYy9xci5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE5pcGFscywgZGVmYXVsdCBhcyBOSVBBTFMgfSBmcm9tICcuL2RjL25pcGFscy5qcyc7XG4iLCJjb25zdCBpbmRlbnQgPSAnICcucmVwZWF0KDIpO1xuY29uc3QgaW5kZW50RGF0YSA9ICcgJy5yZXBlYXQoNCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnNwZWN0TWF0cml4KCkge1xuICByZXR1cm4gaW5zcGVjdE1hdHJpeFdpdGhPcHRpb25zKHRoaXMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5zcGVjdE1hdHJpeFdpdGhPcHRpb25zKG1hdHJpeCwgb3B0aW9ucyA9IHt9KSB7XG4gIGNvbnN0IHsgbWF4Um93cyA9IDE1LCBtYXhDb2x1bW5zID0gMTAsIG1heE51bVNpemUgPSA4IH0gPSBvcHRpb25zO1xuICByZXR1cm4gYCR7bWF0cml4LmNvbnN0cnVjdG9yLm5hbWV9IHtcbiR7aW5kZW50fVtcbiR7aW5kZW50RGF0YX0ke2luc3BlY3REYXRhKG1hdHJpeCwgbWF4Um93cywgbWF4Q29sdW1ucywgbWF4TnVtU2l6ZSl9XG4ke2luZGVudH1dXG4ke2luZGVudH1yb3dzOiAke21hdHJpeC5yb3dzfVxuJHtpbmRlbnR9Y29sdW1uczogJHttYXRyaXguY29sdW1uc31cbn1gO1xufVxuXG5mdW5jdGlvbiBpbnNwZWN0RGF0YShtYXRyaXgsIG1heFJvd3MsIG1heENvbHVtbnMsIG1heE51bVNpemUpIHtcbiAgY29uc3QgeyByb3dzLCBjb2x1bW5zIH0gPSBtYXRyaXg7XG4gIGNvbnN0IG1heEkgPSBNYXRoLm1pbihyb3dzLCBtYXhSb3dzKTtcbiAgY29uc3QgbWF4SiA9IE1hdGgubWluKGNvbHVtbnMsIG1heENvbHVtbnMpO1xuICBjb25zdCByZXN1bHQgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXhJOyBpKyspIHtcbiAgICBsZXQgbGluZSA9IFtdO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgbWF4SjsgaisrKSB7XG4gICAgICBsaW5lLnB1c2goZm9ybWF0TnVtYmVyKG1hdHJpeC5nZXQoaSwgaiksIG1heE51bVNpemUpKTtcbiAgICB9XG4gICAgcmVzdWx0LnB1c2goYCR7bGluZS5qb2luKCcgJyl9YCk7XG4gIH1cbiAgaWYgKG1heEogIT09IGNvbHVtbnMpIHtcbiAgICByZXN1bHRbcmVzdWx0Lmxlbmd0aCAtIDFdICs9IGAgLi4uICR7Y29sdW1ucyAtIG1heENvbHVtbnN9IG1vcmUgY29sdW1uc2A7XG4gIH1cbiAgaWYgKG1heEkgIT09IHJvd3MpIHtcbiAgICByZXN1bHQucHVzaChgLi4uICR7cm93cyAtIG1heFJvd3N9IG1vcmUgcm93c2ApO1xuICB9XG4gIHJldHVybiByZXN1bHQuam9pbihgXFxuJHtpbmRlbnREYXRhfWApO1xufVxuXG5mdW5jdGlvbiBmb3JtYXROdW1iZXIobnVtLCBtYXhOdW1TaXplKSB7XG4gIGNvbnN0IG51bVN0ciA9IFN0cmluZyhudW0pO1xuICBpZiAobnVtU3RyLmxlbmd0aCA8PSBtYXhOdW1TaXplKSB7XG4gICAgcmV0dXJuIG51bVN0ci5wYWRFbmQobWF4TnVtU2l6ZSwgJyAnKTtcbiAgfVxuICBjb25zdCBwcmVjaXNlID0gbnVtLnRvUHJlY2lzaW9uKG1heE51bVNpemUgLSAyKTtcbiAgaWYgKHByZWNpc2UubGVuZ3RoIDw9IG1heE51bVNpemUpIHtcbiAgICByZXR1cm4gcHJlY2lzZTtcbiAgfVxuICBjb25zdCBleHBvbmVudGlhbCA9IG51bS50b0V4cG9uZW50aWFsKG1heE51bVNpemUgLSAyKTtcbiAgY29uc3QgZUluZGV4ID0gZXhwb25lbnRpYWwuaW5kZXhPZignZScpO1xuICBjb25zdCBlID0gZXhwb25lbnRpYWwuc2xpY2UoZUluZGV4KTtcbiAgcmV0dXJuIGV4cG9uZW50aWFsLnNsaWNlKDAsIG1heE51bVNpemUgLSBlLmxlbmd0aCkgKyBlO1xufVxuIiwiaW1wb3J0IFNpbmd1bGFyVmFsdWVEZWNvbXBvc2l0aW9uIGZyb20gJy4vZGMvc3ZkJztcbmltcG9ydCBNYXRyaXggZnJvbSAnLi9tYXRyaXgnO1xuXG5mdW5jdGlvbiB4cmFuZ2UobiwgZXhjZXB0aW9uKSB7XG4gIGxldCByYW5nZSA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgIGlmIChpICE9PSBleGNlcHRpb24pIHtcbiAgICAgIHJhbmdlLnB1c2goaSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByYW5nZTtcbn1cblxuZnVuY3Rpb24gZGVwZW5kZW5jaWVzT25lUm93KFxuICBlcnJvcixcbiAgbWF0cml4LFxuICBpbmRleCxcbiAgdGhyZXNob2xkVmFsdWUgPSAxMGUtMTAsXG4gIHRocmVzaG9sZEVycm9yID0gMTBlLTEwLFxuKSB7XG4gIGlmIChlcnJvciA+IHRocmVzaG9sZEVycm9yKSB7XG4gICAgcmV0dXJuIG5ldyBBcnJheShtYXRyaXgucm93cyArIDEpLmZpbGwoMCk7XG4gIH0gZWxzZSB7XG4gICAgbGV0IHJldHVybkFycmF5ID0gbWF0cml4LmFkZFJvdyhpbmRleCwgWzBdKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJldHVybkFycmF5LnJvd3M7IGkrKykge1xuICAgICAgaWYgKE1hdGguYWJzKHJldHVybkFycmF5LmdldChpLCAwKSkgPCB0aHJlc2hvbGRWYWx1ZSkge1xuICAgICAgICByZXR1cm5BcnJheS5zZXQoaSwgMCwgMCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5BcnJheS50bzFEQXJyYXkoKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbGluZWFyRGVwZW5kZW5jaWVzKG1hdHJpeCwgb3B0aW9ucyA9IHt9KSB7XG4gIGNvbnN0IHsgdGhyZXNob2xkVmFsdWUgPSAxMGUtMTAsIHRocmVzaG9sZEVycm9yID0gMTBlLTEwIH0gPSBvcHRpb25zO1xuICBtYXRyaXggPSBNYXRyaXguY2hlY2tNYXRyaXgobWF0cml4KTtcblxuICBsZXQgbiA9IG1hdHJpeC5yb3dzO1xuICBsZXQgcmVzdWx0cyA9IG5ldyBNYXRyaXgobiwgbik7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICBsZXQgYiA9IE1hdHJpeC5jb2x1bW5WZWN0b3IobWF0cml4LmdldFJvdyhpKSk7XG4gICAgbGV0IEFiaXMgPSBtYXRyaXguc3ViTWF0cml4Um93KHhyYW5nZShuLCBpKSkudHJhbnNwb3NlKCk7XG4gICAgbGV0IHN2ZCA9IG5ldyBTaW5ndWxhclZhbHVlRGVjb21wb3NpdGlvbihBYmlzKTtcbiAgICBsZXQgeCA9IHN2ZC5zb2x2ZShiKTtcbiAgICBsZXQgZXJyb3IgPSBNYXRyaXguc3ViKGIsIEFiaXMubW11bCh4KSkuYWJzKCkubWF4KCk7XG4gICAgcmVzdWx0cy5zZXRSb3coXG4gICAgICBpLFxuICAgICAgZGVwZW5kZW5jaWVzT25lUm93KGVycm9yLCB4LCBpLCB0aHJlc2hvbGRWYWx1ZSwgdGhyZXNob2xkRXJyb3IpLFxuICAgICk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdHM7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gaW5zdGFsbE1hdGhPcGVyYXRpb25zKEFic3RyYWN0TWF0cml4LCBNYXRyaXgpIHtcbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIGFkZCh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSByZXR1cm4gdGhpcy5hZGRTKHZhbHVlKTtcbiAgICByZXR1cm4gdGhpcy5hZGRNKHZhbHVlKTtcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUuYWRkUyA9IGZ1bmN0aW9uIGFkZFModmFsdWUpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sdW1uczsgaisrKSB7XG4gICAgICAgIHRoaXMuc2V0KGksIGosIHRoaXMuZ2V0KGksIGopICsgdmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUuYWRkTSA9IGZ1bmN0aW9uIGFkZE0obWF0cml4KSB7XG4gICAgbWF0cml4ID0gTWF0cml4LmNoZWNrTWF0cml4KG1hdHJpeCk7XG4gICAgaWYgKHRoaXMucm93cyAhPT0gbWF0cml4LnJvd3MgfHxcbiAgICAgIHRoaXMuY29sdW1ucyAhPT0gbWF0cml4LmNvbHVtbnMpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdNYXRyaWNlcyBkaW1lbnNpb25zIG11c3QgYmUgZXF1YWwnKTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCB0aGlzLmdldChpLCBqKSArIG1hdHJpeC5nZXQoaSwgaikpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5hZGQgPSBmdW5jdGlvbiBhZGQobWF0cml4LCB2YWx1ZSkge1xuICAgIGNvbnN0IG5ld01hdHJpeCA9IG5ldyBNYXRyaXgobWF0cml4KTtcbiAgICByZXR1cm4gbmV3TWF0cml4LmFkZCh2YWx1ZSk7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLnN1YiA9IGZ1bmN0aW9uIHN1Yih2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSByZXR1cm4gdGhpcy5zdWJTKHZhbHVlKTtcbiAgICByZXR1cm4gdGhpcy5zdWJNKHZhbHVlKTtcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUuc3ViUyA9IGZ1bmN0aW9uIHN1YlModmFsdWUpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sdW1uczsgaisrKSB7XG4gICAgICAgIHRoaXMuc2V0KGksIGosIHRoaXMuZ2V0KGksIGopIC0gdmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUuc3ViTSA9IGZ1bmN0aW9uIHN1Yk0obWF0cml4KSB7XG4gICAgbWF0cml4ID0gTWF0cml4LmNoZWNrTWF0cml4KG1hdHJpeCk7XG4gICAgaWYgKHRoaXMucm93cyAhPT0gbWF0cml4LnJvd3MgfHxcbiAgICAgIHRoaXMuY29sdW1ucyAhPT0gbWF0cml4LmNvbHVtbnMpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdNYXRyaWNlcyBkaW1lbnNpb25zIG11c3QgYmUgZXF1YWwnKTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCB0aGlzLmdldChpLCBqKSAtIG1hdHJpeC5nZXQoaSwgaikpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5zdWIgPSBmdW5jdGlvbiBzdWIobWF0cml4LCB2YWx1ZSkge1xuICAgIGNvbnN0IG5ld01hdHJpeCA9IG5ldyBNYXRyaXgobWF0cml4KTtcbiAgICByZXR1cm4gbmV3TWF0cml4LnN1Yih2YWx1ZSk7XG4gIH07XG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5zdWJ0cmFjdCA9IEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5zdWI7XG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5zdWJ0cmFjdFMgPSBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUuc3ViUztcbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLnN1YnRyYWN0TSA9IEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5zdWJNO1xuICBBYnN0cmFjdE1hdHJpeC5zdWJ0cmFjdCA9IEFic3RyYWN0TWF0cml4LnN1YjtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUubXVsID0gZnVuY3Rpb24gbXVsKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHJldHVybiB0aGlzLm11bFModmFsdWUpO1xuICAgIHJldHVybiB0aGlzLm11bE0odmFsdWUpO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5tdWxTID0gZnVuY3Rpb24gbXVsUyh2YWx1ZSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgdGhpcy5zZXQoaSwgaiwgdGhpcy5nZXQoaSwgaikgKiB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5tdWxNID0gZnVuY3Rpb24gbXVsTShtYXRyaXgpIHtcbiAgICBtYXRyaXggPSBNYXRyaXguY2hlY2tNYXRyaXgobWF0cml4KTtcbiAgICBpZiAodGhpcy5yb3dzICE9PSBtYXRyaXgucm93cyB8fFxuICAgICAgdGhpcy5jb2x1bW5zICE9PSBtYXRyaXguY29sdW1ucykge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ01hdHJpY2VzIGRpbWVuc2lvbnMgbXVzdCBiZSBlcXVhbCcpO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sdW1uczsgaisrKSB7XG4gICAgICAgIHRoaXMuc2V0KGksIGosIHRoaXMuZ2V0KGksIGopICogbWF0cml4LmdldChpLCBqKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4Lm11bCA9IGZ1bmN0aW9uIG11bChtYXRyaXgsIHZhbHVlKSB7XG4gICAgY29uc3QgbmV3TWF0cml4ID0gbmV3IE1hdHJpeChtYXRyaXgpO1xuICAgIHJldHVybiBuZXdNYXRyaXgubXVsKHZhbHVlKTtcbiAgfTtcbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLm11bHRpcGx5ID0gQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLm11bDtcbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLm11bHRpcGx5UyA9IEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5tdWxTO1xuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUubXVsdGlwbHlNID0gQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLm11bE07XG4gIEFic3RyYWN0TWF0cml4Lm11bHRpcGx5ID0gQWJzdHJhY3RNYXRyaXgubXVsO1xuXG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5kaXYgPSBmdW5jdGlvbiBkaXYodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykgcmV0dXJuIHRoaXMuZGl2Uyh2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXMuZGl2TSh2YWx1ZSk7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLmRpdlMgPSBmdW5jdGlvbiBkaXZTKHZhbHVlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCB0aGlzLmdldChpLCBqKSAvIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLmRpdk0gPSBmdW5jdGlvbiBkaXZNKG1hdHJpeCkge1xuICAgIG1hdHJpeCA9IE1hdHJpeC5jaGVja01hdHJpeChtYXRyaXgpO1xuICAgIGlmICh0aGlzLnJvd3MgIT09IG1hdHJpeC5yb3dzIHx8XG4gICAgICB0aGlzLmNvbHVtbnMgIT09IG1hdHJpeC5jb2x1bW5zKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignTWF0cmljZXMgZGltZW5zaW9ucyBtdXN0IGJlIGVxdWFsJyk7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgdGhpcy5zZXQoaSwgaiwgdGhpcy5nZXQoaSwgaikgLyBtYXRyaXguZ2V0KGksIGopKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXguZGl2ID0gZnVuY3Rpb24gZGl2KG1hdHJpeCwgdmFsdWUpIHtcbiAgICBjb25zdCBuZXdNYXRyaXggPSBuZXcgTWF0cml4KG1hdHJpeCk7XG4gICAgcmV0dXJuIG5ld01hdHJpeC5kaXYodmFsdWUpO1xuICB9O1xuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUuZGl2aWRlID0gQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLmRpdjtcbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLmRpdmlkZVMgPSBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUuZGl2UztcbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLmRpdmlkZU0gPSBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUuZGl2TTtcbiAgQWJzdHJhY3RNYXRyaXguZGl2aWRlID0gQWJzdHJhY3RNYXRyaXguZGl2O1xuXG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5tb2QgPSBmdW5jdGlvbiBtb2QodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykgcmV0dXJuIHRoaXMubW9kUyh2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXMubW9kTSh2YWx1ZSk7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLm1vZFMgPSBmdW5jdGlvbiBtb2RTKHZhbHVlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCB0aGlzLmdldChpLCBqKSAlIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLm1vZE0gPSBmdW5jdGlvbiBtb2RNKG1hdHJpeCkge1xuICAgIG1hdHJpeCA9IE1hdHJpeC5jaGVja01hdHJpeChtYXRyaXgpO1xuICAgIGlmICh0aGlzLnJvd3MgIT09IG1hdHJpeC5yb3dzIHx8XG4gICAgICB0aGlzLmNvbHVtbnMgIT09IG1hdHJpeC5jb2x1bW5zKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignTWF0cmljZXMgZGltZW5zaW9ucyBtdXN0IGJlIGVxdWFsJyk7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgdGhpcy5zZXQoaSwgaiwgdGhpcy5nZXQoaSwgaikgJSBtYXRyaXguZ2V0KGksIGopKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgubW9kID0gZnVuY3Rpb24gbW9kKG1hdHJpeCwgdmFsdWUpIHtcbiAgICBjb25zdCBuZXdNYXRyaXggPSBuZXcgTWF0cml4KG1hdHJpeCk7XG4gICAgcmV0dXJuIG5ld01hdHJpeC5tb2QodmFsdWUpO1xuICB9O1xuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUubW9kdWx1cyA9IEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5tb2Q7XG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5tb2R1bHVzUyA9IEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5tb2RTO1xuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUubW9kdWx1c00gPSBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUubW9kTTtcbiAgQWJzdHJhY3RNYXRyaXgubW9kdWx1cyA9IEFic3RyYWN0TWF0cml4Lm1vZDtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUuYW5kID0gZnVuY3Rpb24gYW5kKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHJldHVybiB0aGlzLmFuZFModmFsdWUpO1xuICAgIHJldHVybiB0aGlzLmFuZE0odmFsdWUpO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5hbmRTID0gZnVuY3Rpb24gYW5kUyh2YWx1ZSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgdGhpcy5zZXQoaSwgaiwgdGhpcy5nZXQoaSwgaikgJiB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5hbmRNID0gZnVuY3Rpb24gYW5kTShtYXRyaXgpIHtcbiAgICBtYXRyaXggPSBNYXRyaXguY2hlY2tNYXRyaXgobWF0cml4KTtcbiAgICBpZiAodGhpcy5yb3dzICE9PSBtYXRyaXgucm93cyB8fFxuICAgICAgdGhpcy5jb2x1bW5zICE9PSBtYXRyaXguY29sdW1ucykge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ01hdHJpY2VzIGRpbWVuc2lvbnMgbXVzdCBiZSBlcXVhbCcpO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sdW1uczsgaisrKSB7XG4gICAgICAgIHRoaXMuc2V0KGksIGosIHRoaXMuZ2V0KGksIGopICYgbWF0cml4LmdldChpLCBqKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LmFuZCA9IGZ1bmN0aW9uIGFuZChtYXRyaXgsIHZhbHVlKSB7XG4gICAgY29uc3QgbmV3TWF0cml4ID0gbmV3IE1hdHJpeChtYXRyaXgpO1xuICAgIHJldHVybiBuZXdNYXRyaXguYW5kKHZhbHVlKTtcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUub3IgPSBmdW5jdGlvbiBvcih2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSByZXR1cm4gdGhpcy5vclModmFsdWUpO1xuICAgIHJldHVybiB0aGlzLm9yTSh2YWx1ZSk7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLm9yUyA9IGZ1bmN0aW9uIG9yUyh2YWx1ZSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgdGhpcy5zZXQoaSwgaiwgdGhpcy5nZXQoaSwgaikgfCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5vck0gPSBmdW5jdGlvbiBvck0obWF0cml4KSB7XG4gICAgbWF0cml4ID0gTWF0cml4LmNoZWNrTWF0cml4KG1hdHJpeCk7XG4gICAgaWYgKHRoaXMucm93cyAhPT0gbWF0cml4LnJvd3MgfHxcbiAgICAgIHRoaXMuY29sdW1ucyAhPT0gbWF0cml4LmNvbHVtbnMpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdNYXRyaWNlcyBkaW1lbnNpb25zIG11c3QgYmUgZXF1YWwnKTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCB0aGlzLmdldChpLCBqKSB8IG1hdHJpeC5nZXQoaSwgaikpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5vciA9IGZ1bmN0aW9uIG9yKG1hdHJpeCwgdmFsdWUpIHtcbiAgICBjb25zdCBuZXdNYXRyaXggPSBuZXcgTWF0cml4KG1hdHJpeCk7XG4gICAgcmV0dXJuIG5ld01hdHJpeC5vcih2YWx1ZSk7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLnhvciA9IGZ1bmN0aW9uIHhvcih2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSByZXR1cm4gdGhpcy54b3JTKHZhbHVlKTtcbiAgICByZXR1cm4gdGhpcy54b3JNKHZhbHVlKTtcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUueG9yUyA9IGZ1bmN0aW9uIHhvclModmFsdWUpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sdW1uczsgaisrKSB7XG4gICAgICAgIHRoaXMuc2V0KGksIGosIHRoaXMuZ2V0KGksIGopIF4gdmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUueG9yTSA9IGZ1bmN0aW9uIHhvck0obWF0cml4KSB7XG4gICAgbWF0cml4ID0gTWF0cml4LmNoZWNrTWF0cml4KG1hdHJpeCk7XG4gICAgaWYgKHRoaXMucm93cyAhPT0gbWF0cml4LnJvd3MgfHxcbiAgICAgIHRoaXMuY29sdW1ucyAhPT0gbWF0cml4LmNvbHVtbnMpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdNYXRyaWNlcyBkaW1lbnNpb25zIG11c3QgYmUgZXF1YWwnKTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCB0aGlzLmdldChpLCBqKSBeIG1hdHJpeC5nZXQoaSwgaikpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC54b3IgPSBmdW5jdGlvbiB4b3IobWF0cml4LCB2YWx1ZSkge1xuICAgIGNvbnN0IG5ld01hdHJpeCA9IG5ldyBNYXRyaXgobWF0cml4KTtcbiAgICByZXR1cm4gbmV3TWF0cml4Lnhvcih2YWx1ZSk7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLmxlZnRTaGlmdCA9IGZ1bmN0aW9uIGxlZnRTaGlmdCh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSByZXR1cm4gdGhpcy5sZWZ0U2hpZnRTKHZhbHVlKTtcbiAgICByZXR1cm4gdGhpcy5sZWZ0U2hpZnRNKHZhbHVlKTtcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUubGVmdFNoaWZ0UyA9IGZ1bmN0aW9uIGxlZnRTaGlmdFModmFsdWUpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sdW1uczsgaisrKSB7XG4gICAgICAgIHRoaXMuc2V0KGksIGosIHRoaXMuZ2V0KGksIGopIDw8IHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLmxlZnRTaGlmdE0gPSBmdW5jdGlvbiBsZWZ0U2hpZnRNKG1hdHJpeCkge1xuICAgIG1hdHJpeCA9IE1hdHJpeC5jaGVja01hdHJpeChtYXRyaXgpO1xuICAgIGlmICh0aGlzLnJvd3MgIT09IG1hdHJpeC5yb3dzIHx8XG4gICAgICB0aGlzLmNvbHVtbnMgIT09IG1hdHJpeC5jb2x1bW5zKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignTWF0cmljZXMgZGltZW5zaW9ucyBtdXN0IGJlIGVxdWFsJyk7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgdGhpcy5zZXQoaSwgaiwgdGhpcy5nZXQoaSwgaikgPDwgbWF0cml4LmdldChpLCBqKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LmxlZnRTaGlmdCA9IGZ1bmN0aW9uIGxlZnRTaGlmdChtYXRyaXgsIHZhbHVlKSB7XG4gICAgY29uc3QgbmV3TWF0cml4ID0gbmV3IE1hdHJpeChtYXRyaXgpO1xuICAgIHJldHVybiBuZXdNYXRyaXgubGVmdFNoaWZ0KHZhbHVlKTtcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUuc2lnblByb3BhZ2F0aW5nUmlnaHRTaGlmdCA9IGZ1bmN0aW9uIHNpZ25Qcm9wYWdhdGluZ1JpZ2h0U2hpZnQodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykgcmV0dXJuIHRoaXMuc2lnblByb3BhZ2F0aW5nUmlnaHRTaGlmdFModmFsdWUpO1xuICAgIHJldHVybiB0aGlzLnNpZ25Qcm9wYWdhdGluZ1JpZ2h0U2hpZnRNKHZhbHVlKTtcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUuc2lnblByb3BhZ2F0aW5nUmlnaHRTaGlmdFMgPSBmdW5jdGlvbiBzaWduUHJvcGFnYXRpbmdSaWdodFNoaWZ0Uyh2YWx1ZSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgdGhpcy5zZXQoaSwgaiwgdGhpcy5nZXQoaSwgaikgPj4gdmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUuc2lnblByb3BhZ2F0aW5nUmlnaHRTaGlmdE0gPSBmdW5jdGlvbiBzaWduUHJvcGFnYXRpbmdSaWdodFNoaWZ0TShtYXRyaXgpIHtcbiAgICBtYXRyaXggPSBNYXRyaXguY2hlY2tNYXRyaXgobWF0cml4KTtcbiAgICBpZiAodGhpcy5yb3dzICE9PSBtYXRyaXgucm93cyB8fFxuICAgICAgdGhpcy5jb2x1bW5zICE9PSBtYXRyaXguY29sdW1ucykge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ01hdHJpY2VzIGRpbWVuc2lvbnMgbXVzdCBiZSBlcXVhbCcpO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sdW1uczsgaisrKSB7XG4gICAgICAgIHRoaXMuc2V0KGksIGosIHRoaXMuZ2V0KGksIGopID4+IG1hdHJpeC5nZXQoaSwgaikpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5zaWduUHJvcGFnYXRpbmdSaWdodFNoaWZ0ID0gZnVuY3Rpb24gc2lnblByb3BhZ2F0aW5nUmlnaHRTaGlmdChtYXRyaXgsIHZhbHVlKSB7XG4gICAgY29uc3QgbmV3TWF0cml4ID0gbmV3IE1hdHJpeChtYXRyaXgpO1xuICAgIHJldHVybiBuZXdNYXRyaXguc2lnblByb3BhZ2F0aW5nUmlnaHRTaGlmdCh2YWx1ZSk7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLnJpZ2h0U2hpZnQgPSBmdW5jdGlvbiByaWdodFNoaWZ0KHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHJldHVybiB0aGlzLnJpZ2h0U2hpZnRTKHZhbHVlKTtcbiAgICByZXR1cm4gdGhpcy5yaWdodFNoaWZ0TSh2YWx1ZSk7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLnJpZ2h0U2hpZnRTID0gZnVuY3Rpb24gcmlnaHRTaGlmdFModmFsdWUpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sdW1uczsgaisrKSB7XG4gICAgICAgIHRoaXMuc2V0KGksIGosIHRoaXMuZ2V0KGksIGopID4+PiB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5yaWdodFNoaWZ0TSA9IGZ1bmN0aW9uIHJpZ2h0U2hpZnRNKG1hdHJpeCkge1xuICAgIG1hdHJpeCA9IE1hdHJpeC5jaGVja01hdHJpeChtYXRyaXgpO1xuICAgIGlmICh0aGlzLnJvd3MgIT09IG1hdHJpeC5yb3dzIHx8XG4gICAgICB0aGlzLmNvbHVtbnMgIT09IG1hdHJpeC5jb2x1bW5zKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignTWF0cmljZXMgZGltZW5zaW9ucyBtdXN0IGJlIGVxdWFsJyk7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgdGhpcy5zZXQoaSwgaiwgdGhpcy5nZXQoaSwgaikgPj4+IG1hdHJpeC5nZXQoaSwgaikpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5yaWdodFNoaWZ0ID0gZnVuY3Rpb24gcmlnaHRTaGlmdChtYXRyaXgsIHZhbHVlKSB7XG4gICAgY29uc3QgbmV3TWF0cml4ID0gbmV3IE1hdHJpeChtYXRyaXgpO1xuICAgIHJldHVybiBuZXdNYXRyaXgucmlnaHRTaGlmdCh2YWx1ZSk7XG4gIH07XG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS56ZXJvRmlsbFJpZ2h0U2hpZnQgPSBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUucmlnaHRTaGlmdDtcbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLnplcm9GaWxsUmlnaHRTaGlmdFMgPSBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUucmlnaHRTaGlmdFM7XG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS56ZXJvRmlsbFJpZ2h0U2hpZnRNID0gQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLnJpZ2h0U2hpZnRNO1xuICBBYnN0cmFjdE1hdHJpeC56ZXJvRmlsbFJpZ2h0U2hpZnQgPSBBYnN0cmFjdE1hdHJpeC5yaWdodFNoaWZ0O1xuXG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5ub3QgPSBmdW5jdGlvbiBub3QoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCB+KHRoaXMuZ2V0KGksIGopKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4Lm5vdCA9IGZ1bmN0aW9uIG5vdChtYXRyaXgpIHtcbiAgICBjb25zdCBuZXdNYXRyaXggPSBuZXcgTWF0cml4KG1hdHJpeCk7XG4gICAgcmV0dXJuIG5ld01hdHJpeC5ub3QoKTtcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUuYWJzID0gZnVuY3Rpb24gYWJzKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgdGhpcy5zZXQoaSwgaiwgTWF0aC5hYnModGhpcy5nZXQoaSwgaikpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXguYWJzID0gZnVuY3Rpb24gYWJzKG1hdHJpeCkge1xuICAgIGNvbnN0IG5ld01hdHJpeCA9IG5ldyBNYXRyaXgobWF0cml4KTtcbiAgICByZXR1cm4gbmV3TWF0cml4LmFicygpO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5hY29zID0gZnVuY3Rpb24gYWNvcygpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sdW1uczsgaisrKSB7XG4gICAgICAgIHRoaXMuc2V0KGksIGosIE1hdGguYWNvcyh0aGlzLmdldChpLCBqKSkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5hY29zID0gZnVuY3Rpb24gYWNvcyhtYXRyaXgpIHtcbiAgICBjb25zdCBuZXdNYXRyaXggPSBuZXcgTWF0cml4KG1hdHJpeCk7XG4gICAgcmV0dXJuIG5ld01hdHJpeC5hY29zKCk7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLmFjb3NoID0gZnVuY3Rpb24gYWNvc2goKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCBNYXRoLmFjb3NoKHRoaXMuZ2V0KGksIGopKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LmFjb3NoID0gZnVuY3Rpb24gYWNvc2gobWF0cml4KSB7XG4gICAgY29uc3QgbmV3TWF0cml4ID0gbmV3IE1hdHJpeChtYXRyaXgpO1xuICAgIHJldHVybiBuZXdNYXRyaXguYWNvc2goKTtcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUuYXNpbiA9IGZ1bmN0aW9uIGFzaW4oKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCBNYXRoLmFzaW4odGhpcy5nZXQoaSwgaikpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXguYXNpbiA9IGZ1bmN0aW9uIGFzaW4obWF0cml4KSB7XG4gICAgY29uc3QgbmV3TWF0cml4ID0gbmV3IE1hdHJpeChtYXRyaXgpO1xuICAgIHJldHVybiBuZXdNYXRyaXguYXNpbigpO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5hc2luaCA9IGZ1bmN0aW9uIGFzaW5oKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgdGhpcy5zZXQoaSwgaiwgTWF0aC5hc2luaCh0aGlzLmdldChpLCBqKSkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5hc2luaCA9IGZ1bmN0aW9uIGFzaW5oKG1hdHJpeCkge1xuICAgIGNvbnN0IG5ld01hdHJpeCA9IG5ldyBNYXRyaXgobWF0cml4KTtcbiAgICByZXR1cm4gbmV3TWF0cml4LmFzaW5oKCk7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLmF0YW4gPSBmdW5jdGlvbiBhdGFuKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgdGhpcy5zZXQoaSwgaiwgTWF0aC5hdGFuKHRoaXMuZ2V0KGksIGopKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LmF0YW4gPSBmdW5jdGlvbiBhdGFuKG1hdHJpeCkge1xuICAgIGNvbnN0IG5ld01hdHJpeCA9IG5ldyBNYXRyaXgobWF0cml4KTtcbiAgICByZXR1cm4gbmV3TWF0cml4LmF0YW4oKTtcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUuYXRhbmggPSBmdW5jdGlvbiBhdGFuaCgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sdW1uczsgaisrKSB7XG4gICAgICAgIHRoaXMuc2V0KGksIGosIE1hdGguYXRhbmgodGhpcy5nZXQoaSwgaikpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXguYXRhbmggPSBmdW5jdGlvbiBhdGFuaChtYXRyaXgpIHtcbiAgICBjb25zdCBuZXdNYXRyaXggPSBuZXcgTWF0cml4KG1hdHJpeCk7XG4gICAgcmV0dXJuIG5ld01hdHJpeC5hdGFuaCgpO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5jYnJ0ID0gZnVuY3Rpb24gY2JydCgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sdW1uczsgaisrKSB7XG4gICAgICAgIHRoaXMuc2V0KGksIGosIE1hdGguY2JydCh0aGlzLmdldChpLCBqKSkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5jYnJ0ID0gZnVuY3Rpb24gY2JydChtYXRyaXgpIHtcbiAgICBjb25zdCBuZXdNYXRyaXggPSBuZXcgTWF0cml4KG1hdHJpeCk7XG4gICAgcmV0dXJuIG5ld01hdHJpeC5jYnJ0KCk7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLmNlaWwgPSBmdW5jdGlvbiBjZWlsKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgdGhpcy5zZXQoaSwgaiwgTWF0aC5jZWlsKHRoaXMuZ2V0KGksIGopKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LmNlaWwgPSBmdW5jdGlvbiBjZWlsKG1hdHJpeCkge1xuICAgIGNvbnN0IG5ld01hdHJpeCA9IG5ldyBNYXRyaXgobWF0cml4KTtcbiAgICByZXR1cm4gbmV3TWF0cml4LmNlaWwoKTtcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUuY2x6MzIgPSBmdW5jdGlvbiBjbHozMigpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sdW1uczsgaisrKSB7XG4gICAgICAgIHRoaXMuc2V0KGksIGosIE1hdGguY2x6MzIodGhpcy5nZXQoaSwgaikpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXguY2x6MzIgPSBmdW5jdGlvbiBjbHozMihtYXRyaXgpIHtcbiAgICBjb25zdCBuZXdNYXRyaXggPSBuZXcgTWF0cml4KG1hdHJpeCk7XG4gICAgcmV0dXJuIG5ld01hdHJpeC5jbHozMigpO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5jb3MgPSBmdW5jdGlvbiBjb3MoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCBNYXRoLmNvcyh0aGlzLmdldChpLCBqKSkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5jb3MgPSBmdW5jdGlvbiBjb3MobWF0cml4KSB7XG4gICAgY29uc3QgbmV3TWF0cml4ID0gbmV3IE1hdHJpeChtYXRyaXgpO1xuICAgIHJldHVybiBuZXdNYXRyaXguY29zKCk7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLmNvc2ggPSBmdW5jdGlvbiBjb3NoKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgdGhpcy5zZXQoaSwgaiwgTWF0aC5jb3NoKHRoaXMuZ2V0KGksIGopKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LmNvc2ggPSBmdW5jdGlvbiBjb3NoKG1hdHJpeCkge1xuICAgIGNvbnN0IG5ld01hdHJpeCA9IG5ldyBNYXRyaXgobWF0cml4KTtcbiAgICByZXR1cm4gbmV3TWF0cml4LmNvc2goKTtcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUuZXhwID0gZnVuY3Rpb24gZXhwKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgdGhpcy5zZXQoaSwgaiwgTWF0aC5leHAodGhpcy5nZXQoaSwgaikpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXguZXhwID0gZnVuY3Rpb24gZXhwKG1hdHJpeCkge1xuICAgIGNvbnN0IG5ld01hdHJpeCA9IG5ldyBNYXRyaXgobWF0cml4KTtcbiAgICByZXR1cm4gbmV3TWF0cml4LmV4cCgpO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5leHBtMSA9IGZ1bmN0aW9uIGV4cG0xKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgdGhpcy5zZXQoaSwgaiwgTWF0aC5leHBtMSh0aGlzLmdldChpLCBqKSkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5leHBtMSA9IGZ1bmN0aW9uIGV4cG0xKG1hdHJpeCkge1xuICAgIGNvbnN0IG5ld01hdHJpeCA9IG5ldyBNYXRyaXgobWF0cml4KTtcbiAgICByZXR1cm4gbmV3TWF0cml4LmV4cG0xKCk7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLmZsb29yID0gZnVuY3Rpb24gZmxvb3IoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCBNYXRoLmZsb29yKHRoaXMuZ2V0KGksIGopKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LmZsb29yID0gZnVuY3Rpb24gZmxvb3IobWF0cml4KSB7XG4gICAgY29uc3QgbmV3TWF0cml4ID0gbmV3IE1hdHJpeChtYXRyaXgpO1xuICAgIHJldHVybiBuZXdNYXRyaXguZmxvb3IoKTtcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUuZnJvdW5kID0gZnVuY3Rpb24gZnJvdW5kKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgdGhpcy5zZXQoaSwgaiwgTWF0aC5mcm91bmQodGhpcy5nZXQoaSwgaikpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXguZnJvdW5kID0gZnVuY3Rpb24gZnJvdW5kKG1hdHJpeCkge1xuICAgIGNvbnN0IG5ld01hdHJpeCA9IG5ldyBNYXRyaXgobWF0cml4KTtcbiAgICByZXR1cm4gbmV3TWF0cml4LmZyb3VuZCgpO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5sb2cgPSBmdW5jdGlvbiBsb2coKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCBNYXRoLmxvZyh0aGlzLmdldChpLCBqKSkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5sb2cgPSBmdW5jdGlvbiBsb2cobWF0cml4KSB7XG4gICAgY29uc3QgbmV3TWF0cml4ID0gbmV3IE1hdHJpeChtYXRyaXgpO1xuICAgIHJldHVybiBuZXdNYXRyaXgubG9nKCk7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLmxvZzFwID0gZnVuY3Rpb24gbG9nMXAoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCBNYXRoLmxvZzFwKHRoaXMuZ2V0KGksIGopKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LmxvZzFwID0gZnVuY3Rpb24gbG9nMXAobWF0cml4KSB7XG4gICAgY29uc3QgbmV3TWF0cml4ID0gbmV3IE1hdHJpeChtYXRyaXgpO1xuICAgIHJldHVybiBuZXdNYXRyaXgubG9nMXAoKTtcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUubG9nMTAgPSBmdW5jdGlvbiBsb2cxMCgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sdW1uczsgaisrKSB7XG4gICAgICAgIHRoaXMuc2V0KGksIGosIE1hdGgubG9nMTAodGhpcy5nZXQoaSwgaikpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgubG9nMTAgPSBmdW5jdGlvbiBsb2cxMChtYXRyaXgpIHtcbiAgICBjb25zdCBuZXdNYXRyaXggPSBuZXcgTWF0cml4KG1hdHJpeCk7XG4gICAgcmV0dXJuIG5ld01hdHJpeC5sb2cxMCgpO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5sb2cyID0gZnVuY3Rpb24gbG9nMigpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sdW1uczsgaisrKSB7XG4gICAgICAgIHRoaXMuc2V0KGksIGosIE1hdGgubG9nMih0aGlzLmdldChpLCBqKSkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5sb2cyID0gZnVuY3Rpb24gbG9nMihtYXRyaXgpIHtcbiAgICBjb25zdCBuZXdNYXRyaXggPSBuZXcgTWF0cml4KG1hdHJpeCk7XG4gICAgcmV0dXJuIG5ld01hdHJpeC5sb2cyKCk7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLnJvdW5kID0gZnVuY3Rpb24gcm91bmQoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCBNYXRoLnJvdW5kKHRoaXMuZ2V0KGksIGopKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnJvdW5kID0gZnVuY3Rpb24gcm91bmQobWF0cml4KSB7XG4gICAgY29uc3QgbmV3TWF0cml4ID0gbmV3IE1hdHJpeChtYXRyaXgpO1xuICAgIHJldHVybiBuZXdNYXRyaXgucm91bmQoKTtcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUuc2lnbiA9IGZ1bmN0aW9uIHNpZ24oKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCBNYXRoLnNpZ24odGhpcy5nZXQoaSwgaikpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXguc2lnbiA9IGZ1bmN0aW9uIHNpZ24obWF0cml4KSB7XG4gICAgY29uc3QgbmV3TWF0cml4ID0gbmV3IE1hdHJpeChtYXRyaXgpO1xuICAgIHJldHVybiBuZXdNYXRyaXguc2lnbigpO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5zaW4gPSBmdW5jdGlvbiBzaW4oKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCBNYXRoLnNpbih0aGlzLmdldChpLCBqKSkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5zaW4gPSBmdW5jdGlvbiBzaW4obWF0cml4KSB7XG4gICAgY29uc3QgbmV3TWF0cml4ID0gbmV3IE1hdHJpeChtYXRyaXgpO1xuICAgIHJldHVybiBuZXdNYXRyaXguc2luKCk7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLnNpbmggPSBmdW5jdGlvbiBzaW5oKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgdGhpcy5zZXQoaSwgaiwgTWF0aC5zaW5oKHRoaXMuZ2V0KGksIGopKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnNpbmggPSBmdW5jdGlvbiBzaW5oKG1hdHJpeCkge1xuICAgIGNvbnN0IG5ld01hdHJpeCA9IG5ldyBNYXRyaXgobWF0cml4KTtcbiAgICByZXR1cm4gbmV3TWF0cml4LnNpbmgoKTtcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUuc3FydCA9IGZ1bmN0aW9uIHNxcnQoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCBNYXRoLnNxcnQodGhpcy5nZXQoaSwgaikpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXguc3FydCA9IGZ1bmN0aW9uIHNxcnQobWF0cml4KSB7XG4gICAgY29uc3QgbmV3TWF0cml4ID0gbmV3IE1hdHJpeChtYXRyaXgpO1xuICAgIHJldHVybiBuZXdNYXRyaXguc3FydCgpO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZS50YW4gPSBmdW5jdGlvbiB0YW4oKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCBNYXRoLnRhbih0aGlzLmdldChpLCBqKSkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC50YW4gPSBmdW5jdGlvbiB0YW4obWF0cml4KSB7XG4gICAgY29uc3QgbmV3TWF0cml4ID0gbmV3IE1hdHJpeChtYXRyaXgpO1xuICAgIHJldHVybiBuZXdNYXRyaXgudGFuKCk7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLnRhbmggPSBmdW5jdGlvbiB0YW5oKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgdGhpcy5zZXQoaSwgaiwgTWF0aC50YW5oKHRoaXMuZ2V0KGksIGopKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnRhbmggPSBmdW5jdGlvbiB0YW5oKG1hdHJpeCkge1xuICAgIGNvbnN0IG5ld01hdHJpeCA9IG5ldyBNYXRyaXgobWF0cml4KTtcbiAgICByZXR1cm4gbmV3TWF0cml4LnRhbmgoKTtcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUudHJ1bmMgPSBmdW5jdGlvbiB0cnVuYygpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sdW1uczsgaisrKSB7XG4gICAgICAgIHRoaXMuc2V0KGksIGosIE1hdGgudHJ1bmModGhpcy5nZXQoaSwgaikpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgudHJ1bmMgPSBmdW5jdGlvbiB0cnVuYyhtYXRyaXgpIHtcbiAgICBjb25zdCBuZXdNYXRyaXggPSBuZXcgTWF0cml4KG1hdHJpeCk7XG4gICAgcmV0dXJuIG5ld01hdHJpeC50cnVuYygpO1xuICB9O1xuXG4gIEFic3RyYWN0TWF0cml4LnBvdyA9IGZ1bmN0aW9uIHBvdyhtYXRyaXgsIGFyZzApIHtcbiAgICBjb25zdCBuZXdNYXRyaXggPSBuZXcgTWF0cml4KG1hdHJpeCk7XG4gICAgcmV0dXJuIG5ld01hdHJpeC5wb3coYXJnMCk7XG4gIH07XG5cbiAgQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLnBvdyA9IGZ1bmN0aW9uIHBvdyh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSByZXR1cm4gdGhpcy5wb3dTKHZhbHVlKTtcbiAgICByZXR1cm4gdGhpcy5wb3dNKHZhbHVlKTtcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUucG93UyA9IGZ1bmN0aW9uIHBvd1ModmFsdWUpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sdW1uczsgaisrKSB7XG4gICAgICAgIHRoaXMuc2V0KGksIGosIE1hdGgucG93KHRoaXMuZ2V0KGksIGopLCB2YWx1ZSkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUucG93TSA9IGZ1bmN0aW9uIHBvd00obWF0cml4KSB7XG4gICAgbWF0cml4ID0gTWF0cml4LmNoZWNrTWF0cml4KG1hdHJpeCk7XG4gICAgaWYgKHRoaXMucm93cyAhPT0gbWF0cml4LnJvd3MgfHxcbiAgICAgIHRoaXMuY29sdW1ucyAhPT0gbWF0cml4LmNvbHVtbnMpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdNYXRyaWNlcyBkaW1lbnNpb25zIG11c3QgYmUgZXF1YWwnKTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICB0aGlzLnNldChpLCBqLCBNYXRoLnBvdyh0aGlzLmdldChpLCBqKSwgbWF0cml4LmdldChpLCBqKSkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbn1cbiIsImltcG9ydCByZXNjYWxlIGZyb20gJ21sLWFycmF5LXJlc2NhbGUnO1xuXG5pbXBvcnQgeyBpbnNwZWN0TWF0cml4LCBpbnNwZWN0TWF0cml4V2l0aE9wdGlvbnMgfSBmcm9tICcuL2luc3BlY3QnO1xuaW1wb3J0IHsgaW5zdGFsbE1hdGhPcGVyYXRpb25zIH0gZnJvbSAnLi9tYXRoT3BlcmF0aW9ucyc7XG5pbXBvcnQge1xuICBzdW1CeVJvdyxcbiAgc3VtQnlDb2x1bW4sXG4gIHN1bUFsbCxcbiAgcHJvZHVjdEJ5Um93LFxuICBwcm9kdWN0QnlDb2x1bW4sXG4gIHByb2R1Y3RBbGwsXG4gIHZhcmlhbmNlQnlSb3csXG4gIHZhcmlhbmNlQnlDb2x1bW4sXG4gIHZhcmlhbmNlQWxsLFxuICBjZW50ZXJCeVJvdyxcbiAgY2VudGVyQnlDb2x1bW4sXG4gIGNlbnRlckFsbCxcbiAgc2NhbGVCeVJvdyxcbiAgc2NhbGVCeUNvbHVtbixcbiAgc2NhbGVBbGwsXG4gIGdldFNjYWxlQnlSb3csXG4gIGdldFNjYWxlQnlDb2x1bW4sXG4gIGdldFNjYWxlQWxsLFxufSBmcm9tICcuL3N0YXQnO1xuaW1wb3J0IHtcbiAgY2hlY2tSb3dWZWN0b3IsXG4gIGNoZWNrUm93SW5kZXgsXG4gIGNoZWNrQ29sdW1uSW5kZXgsXG4gIGNoZWNrQ29sdW1uVmVjdG9yLFxuICBjaGVja1JhbmdlLFxuICBjaGVja0luZGljZXMsXG59IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCBjbGFzcyBBYnN0cmFjdE1hdHJpeCB7XG4gIHN0YXRpYyBmcm9tMURBcnJheShuZXdSb3dzLCBuZXdDb2x1bW5zLCBuZXdEYXRhKSB7XG4gICAgbGV0IGxlbmd0aCA9IG5ld1Jvd3MgKiBuZXdDb2x1bW5zO1xuICAgIGlmIChsZW5ndGggIT09IG5ld0RhdGEubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignZGF0YSBsZW5ndGggZG9lcyBub3QgbWF0Y2ggZ2l2ZW4gZGltZW5zaW9ucycpO1xuICAgIH1cbiAgICBsZXQgbmV3TWF0cml4ID0gbmV3IE1hdHJpeChuZXdSb3dzLCBuZXdDb2x1bW5zKTtcbiAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCBuZXdSb3dzOyByb3crKykge1xuICAgICAgZm9yIChsZXQgY29sdW1uID0gMDsgY29sdW1uIDwgbmV3Q29sdW1uczsgY29sdW1uKyspIHtcbiAgICAgICAgbmV3TWF0cml4LnNldChyb3csIGNvbHVtbiwgbmV3RGF0YVtyb3cgKiBuZXdDb2x1bW5zICsgY29sdW1uXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXdNYXRyaXg7XG4gIH1cblxuICBzdGF0aWMgcm93VmVjdG9yKG5ld0RhdGEpIHtcbiAgICBsZXQgdmVjdG9yID0gbmV3IE1hdHJpeCgxLCBuZXdEYXRhLmxlbmd0aCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdEYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2ZWN0b3Iuc2V0KDAsIGksIG5ld0RhdGFbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gdmVjdG9yO1xuICB9XG5cbiAgc3RhdGljIGNvbHVtblZlY3RvcihuZXdEYXRhKSB7XG4gICAgbGV0IHZlY3RvciA9IG5ldyBNYXRyaXgobmV3RGF0YS5sZW5ndGgsIDEpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3RGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgdmVjdG9yLnNldChpLCAwLCBuZXdEYXRhW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIHZlY3RvcjtcbiAgfVxuXG4gIHN0YXRpYyB6ZXJvcyhyb3dzLCBjb2x1bW5zKSB7XG4gICAgcmV0dXJuIG5ldyBNYXRyaXgocm93cywgY29sdW1ucyk7XG4gIH1cblxuICBzdGF0aWMgb25lcyhyb3dzLCBjb2x1bW5zKSB7XG4gICAgcmV0dXJuIG5ldyBNYXRyaXgocm93cywgY29sdW1ucykuZmlsbCgxKTtcbiAgfVxuXG4gIHN0YXRpYyByYW5kKHJvd3MsIGNvbHVtbnMsIG9wdGlvbnMgPSB7fSkge1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ29wdGlvbnMgbXVzdCBiZSBhbiBvYmplY3QnKTtcbiAgICB9XG4gICAgY29uc3QgeyByYW5kb20gPSBNYXRoLnJhbmRvbSB9ID0gb3B0aW9ucztcbiAgICBsZXQgbWF0cml4ID0gbmV3IE1hdHJpeChyb3dzLCBjb2x1bW5zKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjb2x1bW5zOyBqKyspIHtcbiAgICAgICAgbWF0cml4LnNldChpLCBqLCByYW5kb20oKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtYXRyaXg7XG4gIH1cblxuICBzdGF0aWMgcmFuZEludChyb3dzLCBjb2x1bW5zLCBvcHRpb25zID0ge30pIHtcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdvcHRpb25zIG11c3QgYmUgYW4gb2JqZWN0Jyk7XG4gICAgfVxuICAgIGNvbnN0IHsgbWluID0gMCwgbWF4ID0gMTAwMCwgcmFuZG9tID0gTWF0aC5yYW5kb20gfSA9IG9wdGlvbnM7XG4gICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKG1pbikpIHRocm93IG5ldyBUeXBlRXJyb3IoJ21pbiBtdXN0IGJlIGFuIGludGVnZXInKTtcbiAgICBpZiAoIU51bWJlci5pc0ludGVnZXIobWF4KSkgdGhyb3cgbmV3IFR5cGVFcnJvcignbWF4IG11c3QgYmUgYW4gaW50ZWdlcicpO1xuICAgIGlmIChtaW4gPj0gbWF4KSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignbWluIG11c3QgYmUgc21hbGxlciB0aGFuIG1heCcpO1xuICAgIGxldCBpbnRlcnZhbCA9IG1heCAtIG1pbjtcbiAgICBsZXQgbWF0cml4ID0gbmV3IE1hdHJpeChyb3dzLCBjb2x1bW5zKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjb2x1bW5zOyBqKyspIHtcbiAgICAgICAgbGV0IHZhbHVlID0gbWluICsgTWF0aC5yb3VuZChyYW5kb20oKSAqIGludGVydmFsKTtcbiAgICAgICAgbWF0cml4LnNldChpLCBqLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtYXRyaXg7XG4gIH1cblxuICBzdGF0aWMgZXllKHJvd3MsIGNvbHVtbnMsIHZhbHVlKSB7XG4gICAgaWYgKGNvbHVtbnMgPT09IHVuZGVmaW5lZCkgY29sdW1ucyA9IHJvd3M7XG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHZhbHVlID0gMTtcbiAgICBsZXQgbWluID0gTWF0aC5taW4ocm93cywgY29sdW1ucyk7XG4gICAgbGV0IG1hdHJpeCA9IHRoaXMuemVyb3Mocm93cywgY29sdW1ucyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtaW47IGkrKykge1xuICAgICAgbWF0cml4LnNldChpLCBpLCB2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiBtYXRyaXg7XG4gIH1cblxuICBzdGF0aWMgZGlhZyhkYXRhLCByb3dzLCBjb2x1bW5zKSB7XG4gICAgbGV0IGwgPSBkYXRhLmxlbmd0aDtcbiAgICBpZiAocm93cyA9PT0gdW5kZWZpbmVkKSByb3dzID0gbDtcbiAgICBpZiAoY29sdW1ucyA9PT0gdW5kZWZpbmVkKSBjb2x1bW5zID0gcm93cztcbiAgICBsZXQgbWluID0gTWF0aC5taW4obCwgcm93cywgY29sdW1ucyk7XG4gICAgbGV0IG1hdHJpeCA9IHRoaXMuemVyb3Mocm93cywgY29sdW1ucyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtaW47IGkrKykge1xuICAgICAgbWF0cml4LnNldChpLCBpLCBkYXRhW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIG1hdHJpeDtcbiAgfVxuXG4gIHN0YXRpYyBtaW4obWF0cml4MSwgbWF0cml4Mikge1xuICAgIG1hdHJpeDEgPSB0aGlzLmNoZWNrTWF0cml4KG1hdHJpeDEpO1xuICAgIG1hdHJpeDIgPSB0aGlzLmNoZWNrTWF0cml4KG1hdHJpeDIpO1xuICAgIGxldCByb3dzID0gbWF0cml4MS5yb3dzO1xuICAgIGxldCBjb2x1bW5zID0gbWF0cml4MS5jb2x1bW5zO1xuICAgIGxldCByZXN1bHQgPSBuZXcgTWF0cml4KHJvd3MsIGNvbHVtbnMpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNvbHVtbnM7IGorKykge1xuICAgICAgICByZXN1bHQuc2V0KGksIGosIE1hdGgubWluKG1hdHJpeDEuZ2V0KGksIGopLCBtYXRyaXgyLmdldChpLCBqKSkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgc3RhdGljIG1heChtYXRyaXgxLCBtYXRyaXgyKSB7XG4gICAgbWF0cml4MSA9IHRoaXMuY2hlY2tNYXRyaXgobWF0cml4MSk7XG4gICAgbWF0cml4MiA9IHRoaXMuY2hlY2tNYXRyaXgobWF0cml4Mik7XG4gICAgbGV0IHJvd3MgPSBtYXRyaXgxLnJvd3M7XG4gICAgbGV0IGNvbHVtbnMgPSBtYXRyaXgxLmNvbHVtbnM7XG4gICAgbGV0IHJlc3VsdCA9IG5ldyB0aGlzKHJvd3MsIGNvbHVtbnMpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNvbHVtbnM7IGorKykge1xuICAgICAgICByZXN1bHQuc2V0KGksIGosIE1hdGgubWF4KG1hdHJpeDEuZ2V0KGksIGopLCBtYXRyaXgyLmdldChpLCBqKSkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgc3RhdGljIGNoZWNrTWF0cml4KHZhbHVlKSB7XG4gICAgcmV0dXJuIEFic3RyYWN0TWF0cml4LmlzTWF0cml4KHZhbHVlKSA/IHZhbHVlIDogbmV3IE1hdHJpeCh2YWx1ZSk7XG4gIH1cblxuICBzdGF0aWMgaXNNYXRyaXgodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiB2YWx1ZS5rbGFzcyA9PT0gJ01hdHJpeCc7XG4gIH1cblxuICBnZXQgc2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5yb3dzICogdGhpcy5jb2x1bW5zO1xuICB9XG5cbiAgYXBwbHkoY2FsbGJhY2spIHtcbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdjYWxsYmFjayBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXMsIGksIGopO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHRvMURBcnJheSgpIHtcbiAgICBsZXQgYXJyYXkgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sdW1uczsgaisrKSB7XG4gICAgICAgIGFycmF5LnB1c2godGhpcy5nZXQoaSwgaikpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXk7XG4gIH1cblxuICB0bzJEQXJyYXkoKSB7XG4gICAgbGV0IGNvcHkgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBjb3B5LnB1c2goW10pO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICBjb3B5W2ldLnB1c2godGhpcy5nZXQoaSwgaikpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29weTtcbiAgfVxuXG4gIHRvSlNPTigpIHtcbiAgICByZXR1cm4gdGhpcy50bzJEQXJyYXkoKTtcbiAgfVxuXG4gIGlzUm93VmVjdG9yKCkge1xuICAgIHJldHVybiB0aGlzLnJvd3MgPT09IDE7XG4gIH1cblxuICBpc0NvbHVtblZlY3RvcigpIHtcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5zID09PSAxO1xuICB9XG5cbiAgaXNWZWN0b3IoKSB7XG4gICAgcmV0dXJuIHRoaXMucm93cyA9PT0gMSB8fCB0aGlzLmNvbHVtbnMgPT09IDE7XG4gIH1cblxuICBpc1NxdWFyZSgpIHtcbiAgICByZXR1cm4gdGhpcy5yb3dzID09PSB0aGlzLmNvbHVtbnM7XG4gIH1cblxuICBpc1N5bW1ldHJpYygpIHtcbiAgICBpZiAodGhpcy5pc1NxdWFyZSgpKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDw9IGk7IGorKykge1xuICAgICAgICAgIGlmICh0aGlzLmdldChpLCBqKSAhPT0gdGhpcy5nZXQoaiwgaSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc0VjaGVsb25Gb3JtKCkge1xuICAgIGxldCBpID0gMDtcbiAgICBsZXQgaiA9IDA7XG4gICAgbGV0IHByZXZpb3VzQ29sdW1uID0gLTE7XG4gICAgbGV0IGlzRWNoZWxvbkZvcm0gPSB0cnVlO1xuICAgIGxldCBjaGVja2VkID0gZmFsc2U7XG4gICAgd2hpbGUgKGkgPCB0aGlzLnJvd3MgJiYgaXNFY2hlbG9uRm9ybSkge1xuICAgICAgaiA9IDA7XG4gICAgICBjaGVja2VkID0gZmFsc2U7XG4gICAgICB3aGlsZSAoaiA8IHRoaXMuY29sdW1ucyAmJiBjaGVja2VkID09PSBmYWxzZSkge1xuICAgICAgICBpZiAodGhpcy5nZXQoaSwgaikgPT09IDApIHtcbiAgICAgICAgICBqKys7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5nZXQoaSwgaikgPT09IDEgJiYgaiA+IHByZXZpb3VzQ29sdW1uKSB7XG4gICAgICAgICAgY2hlY2tlZCA9IHRydWU7XG4gICAgICAgICAgcHJldmlvdXNDb2x1bW4gPSBqO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlzRWNoZWxvbkZvcm0gPSBmYWxzZTtcbiAgICAgICAgICBjaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaSsrO1xuICAgIH1cbiAgICByZXR1cm4gaXNFY2hlbG9uRm9ybTtcbiAgfVxuXG4gIGlzUmVkdWNlZEVjaGVsb25Gb3JtKCkge1xuICAgIGxldCBpID0gMDtcbiAgICBsZXQgaiA9IDA7XG4gICAgbGV0IHByZXZpb3VzQ29sdW1uID0gLTE7XG4gICAgbGV0IGlzUmVkdWNlZEVjaGVsb25Gb3JtID0gdHJ1ZTtcbiAgICBsZXQgY2hlY2tlZCA9IGZhbHNlO1xuICAgIHdoaWxlIChpIDwgdGhpcy5yb3dzICYmIGlzUmVkdWNlZEVjaGVsb25Gb3JtKSB7XG4gICAgICBqID0gMDtcbiAgICAgIGNoZWNrZWQgPSBmYWxzZTtcbiAgICAgIHdoaWxlIChqIDwgdGhpcy5jb2x1bW5zICYmIGNoZWNrZWQgPT09IGZhbHNlKSB7XG4gICAgICAgIGlmICh0aGlzLmdldChpLCBqKSA9PT0gMCkge1xuICAgICAgICAgIGorKztcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmdldChpLCBqKSA9PT0gMSAmJiBqID4gcHJldmlvdXNDb2x1bW4pIHtcbiAgICAgICAgICBjaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgICBwcmV2aW91c0NvbHVtbiA9IGo7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXNSZWR1Y2VkRWNoZWxvbkZvcm0gPSBmYWxzZTtcbiAgICAgICAgICBjaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZm9yIChsZXQgayA9IGogKyAxOyBrIDwgdGhpcy5yb3dzOyBrKyspIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0KGksIGspICE9PSAwKSB7XG4gICAgICAgICAgaXNSZWR1Y2VkRWNoZWxvbkZvcm0gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaSsrO1xuICAgIH1cbiAgICByZXR1cm4gaXNSZWR1Y2VkRWNoZWxvbkZvcm07XG4gIH1cblxuICBlY2hlbG9uRm9ybSgpIHtcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5jbG9uZSgpO1xuICAgIGxldCBoID0gMDtcbiAgICBsZXQgayA9IDA7XG4gICAgd2hpbGUgKGggPCByZXN1bHQucm93cyAmJiBrIDwgcmVzdWx0LmNvbHVtbnMpIHtcbiAgICAgIGxldCBpTWF4ID0gaDtcbiAgICAgIGZvciAobGV0IGkgPSBoOyBpIDwgcmVzdWx0LnJvd3M7IGkrKykge1xuICAgICAgICBpZiAocmVzdWx0LmdldChpLCBrKSA+IHJlc3VsdC5nZXQoaU1heCwgaykpIHtcbiAgICAgICAgICBpTWF4ID0gaTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHJlc3VsdC5nZXQoaU1heCwgaykgPT09IDApIHtcbiAgICAgICAgaysrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0LnN3YXBSb3dzKGgsIGlNYXgpO1xuICAgICAgICBsZXQgdG1wID0gcmVzdWx0LmdldChoLCBrKTtcbiAgICAgICAgZm9yIChsZXQgaiA9IGs7IGogPCByZXN1bHQuY29sdW1uczsgaisrKSB7XG4gICAgICAgICAgcmVzdWx0LnNldChoLCBqLCByZXN1bHQuZ2V0KGgsIGopIC8gdG1wKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gaCArIDE7IGkgPCByZXN1bHQucm93czsgaSsrKSB7XG4gICAgICAgICAgbGV0IGZhY3RvciA9IHJlc3VsdC5nZXQoaSwgaykgLyByZXN1bHQuZ2V0KGgsIGspO1xuICAgICAgICAgIHJlc3VsdC5zZXQoaSwgaywgMCk7XG4gICAgICAgICAgZm9yIChsZXQgaiA9IGsgKyAxOyBqIDwgcmVzdWx0LmNvbHVtbnM7IGorKykge1xuICAgICAgICAgICAgcmVzdWx0LnNldChpLCBqLCByZXN1bHQuZ2V0KGksIGopIC0gcmVzdWx0LmdldChoLCBqKSAqIGZhY3Rvcik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGgrKztcbiAgICAgICAgaysrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcmVkdWNlZEVjaGVsb25Gb3JtKCkge1xuICAgIGxldCByZXN1bHQgPSB0aGlzLmVjaGVsb25Gb3JtKCk7XG4gICAgbGV0IG0gPSByZXN1bHQuY29sdW1ucztcbiAgICBsZXQgbiA9IHJlc3VsdC5yb3dzO1xuICAgIGxldCBoID0gbiAtIDE7XG4gICAgd2hpbGUgKGggPj0gMCkge1xuICAgICAgaWYgKHJlc3VsdC5tYXhSb3coaCkgPT09IDApIHtcbiAgICAgICAgaC0tO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHAgPSAwO1xuICAgICAgICBsZXQgcGl2b3QgPSBmYWxzZTtcbiAgICAgICAgd2hpbGUgKHAgPCBuICYmIHBpdm90ID09PSBmYWxzZSkge1xuICAgICAgICAgIGlmIChyZXN1bHQuZ2V0KGgsIHApID09PSAxKSB7XG4gICAgICAgICAgICBwaXZvdCA9IHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHArKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoOyBpKyspIHtcbiAgICAgICAgICBsZXQgZmFjdG9yID0gcmVzdWx0LmdldChpLCBwKTtcbiAgICAgICAgICBmb3IgKGxldCBqID0gcDsgaiA8IG07IGorKykge1xuICAgICAgICAgICAgbGV0IHRtcCA9IHJlc3VsdC5nZXQoaSwgaikgLSBmYWN0b3IgKiByZXN1bHQuZ2V0KGgsIGopO1xuICAgICAgICAgICAgcmVzdWx0LnNldChpLCBqLCB0bXApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBoLS07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBzZXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXQgbWV0aG9kIGlzIHVuaW1wbGVtZW50ZWQnKTtcbiAgfVxuXG4gIGdldCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2dldCBtZXRob2QgaXMgdW5pbXBsZW1lbnRlZCcpO1xuICB9XG5cbiAgcmVwZWF0KG9wdGlvbnMgPSB7fSkge1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ29wdGlvbnMgbXVzdCBiZSBhbiBvYmplY3QnKTtcbiAgICB9XG4gICAgY29uc3QgeyByb3dzID0gMSwgY29sdW1ucyA9IDEgfSA9IG9wdGlvbnM7XG4gICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKHJvd3MpIHx8IHJvd3MgPD0gMCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncm93cyBtdXN0IGJlIGEgcG9zaXRpdmUgaW50ZWdlcicpO1xuICAgIH1cbiAgICBpZiAoIU51bWJlci5pc0ludGVnZXIoY29sdW1ucykgfHwgY29sdW1ucyA8PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdjb2x1bW5zIG11c3QgYmUgYSBwb3NpdGl2ZSBpbnRlZ2VyJyk7XG4gICAgfVxuICAgIGxldCBtYXRyaXggPSBuZXcgTWF0cml4KHRoaXMucm93cyAqIHJvd3MsIHRoaXMuY29sdW1ucyAqIGNvbHVtbnMpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNvbHVtbnM7IGorKykge1xuICAgICAgICBtYXRyaXguc2V0U3ViTWF0cml4KHRoaXMsIHRoaXMucm93cyAqIGksIHRoaXMuY29sdW1ucyAqIGopO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWF0cml4O1xuICB9XG5cbiAgZmlsbCh2YWx1ZSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgdGhpcy5zZXQoaSwgaiwgdmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG5lZygpIHtcbiAgICByZXR1cm4gdGhpcy5tdWxTKC0xKTtcbiAgfVxuXG4gIGdldFJvdyhpbmRleCkge1xuICAgIGNoZWNrUm93SW5kZXgodGhpcywgaW5kZXgpO1xuICAgIGxldCByb3cgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29sdW1uczsgaSsrKSB7XG4gICAgICByb3cucHVzaCh0aGlzLmdldChpbmRleCwgaSkpO1xuICAgIH1cbiAgICByZXR1cm4gcm93O1xuICB9XG5cbiAgZ2V0Um93VmVjdG9yKGluZGV4KSB7XG4gICAgcmV0dXJuIE1hdHJpeC5yb3dWZWN0b3IodGhpcy5nZXRSb3coaW5kZXgpKTtcbiAgfVxuXG4gIHNldFJvdyhpbmRleCwgYXJyYXkpIHtcbiAgICBjaGVja1Jvd0luZGV4KHRoaXMsIGluZGV4KTtcbiAgICBhcnJheSA9IGNoZWNrUm93VmVjdG9yKHRoaXMsIGFycmF5KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29sdW1uczsgaSsrKSB7XG4gICAgICB0aGlzLnNldChpbmRleCwgaSwgYXJyYXlbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHN3YXBSb3dzKHJvdzEsIHJvdzIpIHtcbiAgICBjaGVja1Jvd0luZGV4KHRoaXMsIHJvdzEpO1xuICAgIGNoZWNrUm93SW5kZXgodGhpcywgcm93Mik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbHVtbnM7IGkrKykge1xuICAgICAgbGV0IHRlbXAgPSB0aGlzLmdldChyb3cxLCBpKTtcbiAgICAgIHRoaXMuc2V0KHJvdzEsIGksIHRoaXMuZ2V0KHJvdzIsIGkpKTtcbiAgICAgIHRoaXMuc2V0KHJvdzIsIGksIHRlbXApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldENvbHVtbihpbmRleCkge1xuICAgIGNoZWNrQ29sdW1uSW5kZXgodGhpcywgaW5kZXgpO1xuICAgIGxldCBjb2x1bW4gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBjb2x1bW4ucHVzaCh0aGlzLmdldChpLCBpbmRleCkpO1xuICAgIH1cbiAgICByZXR1cm4gY29sdW1uO1xuICB9XG5cbiAgZ2V0Q29sdW1uVmVjdG9yKGluZGV4KSB7XG4gICAgcmV0dXJuIE1hdHJpeC5jb2x1bW5WZWN0b3IodGhpcy5nZXRDb2x1bW4oaW5kZXgpKTtcbiAgfVxuXG4gIHNldENvbHVtbihpbmRleCwgYXJyYXkpIHtcbiAgICBjaGVja0NvbHVtbkluZGV4KHRoaXMsIGluZGV4KTtcbiAgICBhcnJheSA9IGNoZWNrQ29sdW1uVmVjdG9yKHRoaXMsIGFycmF5KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICB0aGlzLnNldChpLCBpbmRleCwgYXJyYXlbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHN3YXBDb2x1bW5zKGNvbHVtbjEsIGNvbHVtbjIpIHtcbiAgICBjaGVja0NvbHVtbkluZGV4KHRoaXMsIGNvbHVtbjEpO1xuICAgIGNoZWNrQ29sdW1uSW5kZXgodGhpcywgY29sdW1uMik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgbGV0IHRlbXAgPSB0aGlzLmdldChpLCBjb2x1bW4xKTtcbiAgICAgIHRoaXMuc2V0KGksIGNvbHVtbjEsIHRoaXMuZ2V0KGksIGNvbHVtbjIpKTtcbiAgICAgIHRoaXMuc2V0KGksIGNvbHVtbjIsIHRlbXApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGFkZFJvd1ZlY3Rvcih2ZWN0b3IpIHtcbiAgICB2ZWN0b3IgPSBjaGVja1Jvd1ZlY3Rvcih0aGlzLCB2ZWN0b3IpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgdGhpcy5zZXQoaSwgaiwgdGhpcy5nZXQoaSwgaikgKyB2ZWN0b3Jbal0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHN1YlJvd1ZlY3Rvcih2ZWN0b3IpIHtcbiAgICB2ZWN0b3IgPSBjaGVja1Jvd1ZlY3Rvcih0aGlzLCB2ZWN0b3IpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgdGhpcy5zZXQoaSwgaiwgdGhpcy5nZXQoaSwgaikgLSB2ZWN0b3Jbal0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG11bFJvd1ZlY3Rvcih2ZWN0b3IpIHtcbiAgICB2ZWN0b3IgPSBjaGVja1Jvd1ZlY3Rvcih0aGlzLCB2ZWN0b3IpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgdGhpcy5zZXQoaSwgaiwgdGhpcy5nZXQoaSwgaikgKiB2ZWN0b3Jbal0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGRpdlJvd1ZlY3Rvcih2ZWN0b3IpIHtcbiAgICB2ZWN0b3IgPSBjaGVja1Jvd1ZlY3Rvcih0aGlzLCB2ZWN0b3IpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgdGhpcy5zZXQoaSwgaiwgdGhpcy5nZXQoaSwgaikgLyB2ZWN0b3Jbal0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGFkZENvbHVtblZlY3Rvcih2ZWN0b3IpIHtcbiAgICB2ZWN0b3IgPSBjaGVja0NvbHVtblZlY3Rvcih0aGlzLCB2ZWN0b3IpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgdGhpcy5zZXQoaSwgaiwgdGhpcy5nZXQoaSwgaikgKyB2ZWN0b3JbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHN1YkNvbHVtblZlY3Rvcih2ZWN0b3IpIHtcbiAgICB2ZWN0b3IgPSBjaGVja0NvbHVtblZlY3Rvcih0aGlzLCB2ZWN0b3IpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgdGhpcy5zZXQoaSwgaiwgdGhpcy5nZXQoaSwgaikgLSB2ZWN0b3JbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG11bENvbHVtblZlY3Rvcih2ZWN0b3IpIHtcbiAgICB2ZWN0b3IgPSBjaGVja0NvbHVtblZlY3Rvcih0aGlzLCB2ZWN0b3IpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgdGhpcy5zZXQoaSwgaiwgdGhpcy5nZXQoaSwgaikgKiB2ZWN0b3JbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGRpdkNvbHVtblZlY3Rvcih2ZWN0b3IpIHtcbiAgICB2ZWN0b3IgPSBjaGVja0NvbHVtblZlY3Rvcih0aGlzLCB2ZWN0b3IpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgdGhpcy5zZXQoaSwgaiwgdGhpcy5nZXQoaSwgaikgLyB2ZWN0b3JbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG11bFJvdyhpbmRleCwgdmFsdWUpIHtcbiAgICBjaGVja1Jvd0luZGV4KHRoaXMsIGluZGV4KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29sdW1uczsgaSsrKSB7XG4gICAgICB0aGlzLnNldChpbmRleCwgaSwgdGhpcy5nZXQoaW5kZXgsIGkpICogdmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG11bENvbHVtbihpbmRleCwgdmFsdWUpIHtcbiAgICBjaGVja0NvbHVtbkluZGV4KHRoaXMsIGluZGV4KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICB0aGlzLnNldChpLCBpbmRleCwgdGhpcy5nZXQoaSwgaW5kZXgpICogdmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG1heCgpIHtcbiAgICBsZXQgdiA9IHRoaXMuZ2V0KDAsIDApO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0KGksIGopID4gdikge1xuICAgICAgICAgIHYgPSB0aGlzLmdldChpLCBqKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdjtcbiAgfVxuXG4gIG1heEluZGV4KCkge1xuICAgIGxldCB2ID0gdGhpcy5nZXQoMCwgMCk7XG4gICAgbGV0IGlkeCA9IFswLCAwXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sdW1uczsgaisrKSB7XG4gICAgICAgIGlmICh0aGlzLmdldChpLCBqKSA+IHYpIHtcbiAgICAgICAgICB2ID0gdGhpcy5nZXQoaSwgaik7XG4gICAgICAgICAgaWR4WzBdID0gaTtcbiAgICAgICAgICBpZHhbMV0gPSBqO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpZHg7XG4gIH1cblxuICBtaW4oKSB7XG4gICAgbGV0IHYgPSB0aGlzLmdldCgwLCAwKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sdW1uczsgaisrKSB7XG4gICAgICAgIGlmICh0aGlzLmdldChpLCBqKSA8IHYpIHtcbiAgICAgICAgICB2ID0gdGhpcy5nZXQoaSwgaik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHY7XG4gIH1cblxuICBtaW5JbmRleCgpIHtcbiAgICBsZXQgdiA9IHRoaXMuZ2V0KDAsIDApO1xuICAgIGxldCBpZHggPSBbMCwgMF07XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICBpZiAodGhpcy5nZXQoaSwgaikgPCB2KSB7XG4gICAgICAgICAgdiA9IHRoaXMuZ2V0KGksIGopO1xuICAgICAgICAgIGlkeFswXSA9IGk7XG4gICAgICAgICAgaWR4WzFdID0gajtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaWR4O1xuICB9XG5cbiAgbWF4Um93KHJvdykge1xuICAgIGNoZWNrUm93SW5kZXgodGhpcywgcm93KTtcbiAgICBsZXQgdiA9IHRoaXMuZ2V0KHJvdywgMCk7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCB0aGlzLmNvbHVtbnM7IGkrKykge1xuICAgICAgaWYgKHRoaXMuZ2V0KHJvdywgaSkgPiB2KSB7XG4gICAgICAgIHYgPSB0aGlzLmdldChyb3csIGkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdjtcbiAgfVxuXG4gIG1heFJvd0luZGV4KHJvdykge1xuICAgIGNoZWNrUm93SW5kZXgodGhpcywgcm93KTtcbiAgICBsZXQgdiA9IHRoaXMuZ2V0KHJvdywgMCk7XG4gICAgbGV0IGlkeCA9IFtyb3csIDBdO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgdGhpcy5jb2x1bW5zOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLmdldChyb3csIGkpID4gdikge1xuICAgICAgICB2ID0gdGhpcy5nZXQocm93LCBpKTtcbiAgICAgICAgaWR4WzFdID0gaTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGlkeDtcbiAgfVxuXG4gIG1pblJvdyhyb3cpIHtcbiAgICBjaGVja1Jvd0luZGV4KHRoaXMsIHJvdyk7XG4gICAgbGV0IHYgPSB0aGlzLmdldChyb3csIDApO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgdGhpcy5jb2x1bW5zOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLmdldChyb3csIGkpIDwgdikge1xuICAgICAgICB2ID0gdGhpcy5nZXQocm93LCBpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHY7XG4gIH1cblxuICBtaW5Sb3dJbmRleChyb3cpIHtcbiAgICBjaGVja1Jvd0luZGV4KHRoaXMsIHJvdyk7XG4gICAgbGV0IHYgPSB0aGlzLmdldChyb3csIDApO1xuICAgIGxldCBpZHggPSBbcm93LCAwXTtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IHRoaXMuY29sdW1uczsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5nZXQocm93LCBpKSA8IHYpIHtcbiAgICAgICAgdiA9IHRoaXMuZ2V0KHJvdywgaSk7XG4gICAgICAgIGlkeFsxXSA9IGk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpZHg7XG4gIH1cblxuICBtYXhDb2x1bW4oY29sdW1uKSB7XG4gICAgY2hlY2tDb2x1bW5JbmRleCh0aGlzLCBjb2x1bW4pO1xuICAgIGxldCB2ID0gdGhpcy5nZXQoMCwgY29sdW1uKTtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5nZXQoaSwgY29sdW1uKSA+IHYpIHtcbiAgICAgICAgdiA9IHRoaXMuZ2V0KGksIGNvbHVtbik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2O1xuICB9XG5cbiAgbWF4Q29sdW1uSW5kZXgoY29sdW1uKSB7XG4gICAgY2hlY2tDb2x1bW5JbmRleCh0aGlzLCBjb2x1bW4pO1xuICAgIGxldCB2ID0gdGhpcy5nZXQoMCwgY29sdW1uKTtcbiAgICBsZXQgaWR4ID0gWzAsIGNvbHVtbl07XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgaWYgKHRoaXMuZ2V0KGksIGNvbHVtbikgPiB2KSB7XG4gICAgICAgIHYgPSB0aGlzLmdldChpLCBjb2x1bW4pO1xuICAgICAgICBpZHhbMF0gPSBpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaWR4O1xuICB9XG5cbiAgbWluQ29sdW1uKGNvbHVtbikge1xuICAgIGNoZWNrQ29sdW1uSW5kZXgodGhpcywgY29sdW1uKTtcbiAgICBsZXQgdiA9IHRoaXMuZ2V0KDAsIGNvbHVtbik7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgaWYgKHRoaXMuZ2V0KGksIGNvbHVtbikgPCB2KSB7XG4gICAgICAgIHYgPSB0aGlzLmdldChpLCBjb2x1bW4pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdjtcbiAgfVxuXG4gIG1pbkNvbHVtbkluZGV4KGNvbHVtbikge1xuICAgIGNoZWNrQ29sdW1uSW5kZXgodGhpcywgY29sdW1uKTtcbiAgICBsZXQgdiA9IHRoaXMuZ2V0KDAsIGNvbHVtbik7XG4gICAgbGV0IGlkeCA9IFswLCBjb2x1bW5dO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLmdldChpLCBjb2x1bW4pIDwgdikge1xuICAgICAgICB2ID0gdGhpcy5nZXQoaSwgY29sdW1uKTtcbiAgICAgICAgaWR4WzBdID0gaTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGlkeDtcbiAgfVxuXG4gIGRpYWcoKSB7XG4gICAgbGV0IG1pbiA9IE1hdGgubWluKHRoaXMucm93cywgdGhpcy5jb2x1bW5zKTtcbiAgICBsZXQgZGlhZyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWluOyBpKyspIHtcbiAgICAgIGRpYWcucHVzaCh0aGlzLmdldChpLCBpKSk7XG4gICAgfVxuICAgIHJldHVybiBkaWFnO1xuICB9XG5cbiAgbm9ybSh0eXBlID0gJ2Zyb2Jlbml1cycpIHtcbiAgICBsZXQgcmVzdWx0ID0gMDtcbiAgICBpZiAodHlwZSA9PT0gJ21heCcpIHtcbiAgICAgIHJldHVybiB0aGlzLm1heCgpO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2Zyb2Jlbml1cycpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdCArIHRoaXMuZ2V0KGksIGopICogdGhpcy5nZXQoaSwgaik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBNYXRoLnNxcnQocmVzdWx0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoYHVua25vd24gbm9ybSB0eXBlOiAke3R5cGV9YCk7XG4gICAgfVxuICB9XG5cbiAgY3VtdWxhdGl2ZVN1bSgpIHtcbiAgICBsZXQgc3VtID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sdW1uczsgaisrKSB7XG4gICAgICAgIHN1bSArPSB0aGlzLmdldChpLCBqKTtcbiAgICAgICAgdGhpcy5zZXQoaSwgaiwgc3VtKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBkb3QodmVjdG9yMikge1xuICAgIGlmIChBYnN0cmFjdE1hdHJpeC5pc01hdHJpeCh2ZWN0b3IyKSkgdmVjdG9yMiA9IHZlY3RvcjIudG8xREFycmF5KCk7XG4gICAgbGV0IHZlY3RvcjEgPSB0aGlzLnRvMURBcnJheSgpO1xuICAgIGlmICh2ZWN0b3IxLmxlbmd0aCAhPT0gdmVjdG9yMi5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCd2ZWN0b3JzIGRvIG5vdCBoYXZlIHRoZSBzYW1lIHNpemUnKTtcbiAgICB9XG4gICAgbGV0IGRvdCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2ZWN0b3IxLmxlbmd0aDsgaSsrKSB7XG4gICAgICBkb3QgKz0gdmVjdG9yMVtpXSAqIHZlY3RvcjJbaV07XG4gICAgfVxuICAgIHJldHVybiBkb3Q7XG4gIH1cblxuICBtbXVsKG90aGVyKSB7XG4gICAgb3RoZXIgPSBNYXRyaXguY2hlY2tNYXRyaXgob3RoZXIpO1xuXG4gICAgbGV0IG0gPSB0aGlzLnJvd3M7XG4gICAgbGV0IG4gPSB0aGlzLmNvbHVtbnM7XG4gICAgbGV0IHAgPSBvdGhlci5jb2x1bW5zO1xuXG4gICAgbGV0IHJlc3VsdCA9IG5ldyBNYXRyaXgobSwgcCk7XG5cbiAgICBsZXQgQmNvbGogPSBuZXcgRmxvYXQ2NEFycmF5KG4pO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgcDsgaisrKSB7XG4gICAgICBmb3IgKGxldCBrID0gMDsgayA8IG47IGsrKykge1xuICAgICAgICBCY29saltrXSA9IG90aGVyLmdldChrLCBqKTtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtOyBpKyspIHtcbiAgICAgICAgbGV0IHMgPSAwO1xuICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IG47IGsrKykge1xuICAgICAgICAgIHMgKz0gdGhpcy5nZXQoaSwgaykgKiBCY29saltrXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdC5zZXQoaSwgaiwgcyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBzdHJhc3NlbjJ4MihvdGhlcikge1xuICAgIG90aGVyID0gTWF0cml4LmNoZWNrTWF0cml4KG90aGVyKTtcbiAgICBsZXQgcmVzdWx0ID0gbmV3IE1hdHJpeCgyLCAyKTtcbiAgICBjb25zdCBhMTEgPSB0aGlzLmdldCgwLCAwKTtcbiAgICBjb25zdCBiMTEgPSBvdGhlci5nZXQoMCwgMCk7XG4gICAgY29uc3QgYTEyID0gdGhpcy5nZXQoMCwgMSk7XG4gICAgY29uc3QgYjEyID0gb3RoZXIuZ2V0KDAsIDEpO1xuICAgIGNvbnN0IGEyMSA9IHRoaXMuZ2V0KDEsIDApO1xuICAgIGNvbnN0IGIyMSA9IG90aGVyLmdldCgxLCAwKTtcbiAgICBjb25zdCBhMjIgPSB0aGlzLmdldCgxLCAxKTtcbiAgICBjb25zdCBiMjIgPSBvdGhlci5nZXQoMSwgMSk7XG5cbiAgICAvLyBDb21wdXRlIGludGVybWVkaWF0ZSB2YWx1ZXMuXG4gICAgY29uc3QgbTEgPSAoYTExICsgYTIyKSAqIChiMTEgKyBiMjIpO1xuICAgIGNvbnN0IG0yID0gKGEyMSArIGEyMikgKiBiMTE7XG4gICAgY29uc3QgbTMgPSBhMTEgKiAoYjEyIC0gYjIyKTtcbiAgICBjb25zdCBtNCA9IGEyMiAqIChiMjEgLSBiMTEpO1xuICAgIGNvbnN0IG01ID0gKGExMSArIGExMikgKiBiMjI7XG4gICAgY29uc3QgbTYgPSAoYTIxIC0gYTExKSAqIChiMTEgKyBiMTIpO1xuICAgIGNvbnN0IG03ID0gKGExMiAtIGEyMikgKiAoYjIxICsgYjIyKTtcblxuICAgIC8vIENvbWJpbmUgaW50ZXJtZWRpYXRlIHZhbHVlcyBpbnRvIHRoZSBvdXRwdXQuXG4gICAgY29uc3QgYzAwID0gbTEgKyBtNCAtIG01ICsgbTc7XG4gICAgY29uc3QgYzAxID0gbTMgKyBtNTtcbiAgICBjb25zdCBjMTAgPSBtMiArIG00O1xuICAgIGNvbnN0IGMxMSA9IG0xIC0gbTIgKyBtMyArIG02O1xuXG4gICAgcmVzdWx0LnNldCgwLCAwLCBjMDApO1xuICAgIHJlc3VsdC5zZXQoMCwgMSwgYzAxKTtcbiAgICByZXN1bHQuc2V0KDEsIDAsIGMxMCk7XG4gICAgcmVzdWx0LnNldCgxLCAxLCBjMTEpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBzdHJhc3NlbjN4MyhvdGhlcikge1xuICAgIG90aGVyID0gTWF0cml4LmNoZWNrTWF0cml4KG90aGVyKTtcbiAgICBsZXQgcmVzdWx0ID0gbmV3IE1hdHJpeCgzLCAzKTtcblxuICAgIGNvbnN0IGEwMCA9IHRoaXMuZ2V0KDAsIDApO1xuICAgIGNvbnN0IGEwMSA9IHRoaXMuZ2V0KDAsIDEpO1xuICAgIGNvbnN0IGEwMiA9IHRoaXMuZ2V0KDAsIDIpO1xuICAgIGNvbnN0IGExMCA9IHRoaXMuZ2V0KDEsIDApO1xuICAgIGNvbnN0IGExMSA9IHRoaXMuZ2V0KDEsIDEpO1xuICAgIGNvbnN0IGExMiA9IHRoaXMuZ2V0KDEsIDIpO1xuICAgIGNvbnN0IGEyMCA9IHRoaXMuZ2V0KDIsIDApO1xuICAgIGNvbnN0IGEyMSA9IHRoaXMuZ2V0KDIsIDEpO1xuICAgIGNvbnN0IGEyMiA9IHRoaXMuZ2V0KDIsIDIpO1xuXG4gICAgY29uc3QgYjAwID0gb3RoZXIuZ2V0KDAsIDApO1xuICAgIGNvbnN0IGIwMSA9IG90aGVyLmdldCgwLCAxKTtcbiAgICBjb25zdCBiMDIgPSBvdGhlci5nZXQoMCwgMik7XG4gICAgY29uc3QgYjEwID0gb3RoZXIuZ2V0KDEsIDApO1xuICAgIGNvbnN0IGIxMSA9IG90aGVyLmdldCgxLCAxKTtcbiAgICBjb25zdCBiMTIgPSBvdGhlci5nZXQoMSwgMik7XG4gICAgY29uc3QgYjIwID0gb3RoZXIuZ2V0KDIsIDApO1xuICAgIGNvbnN0IGIyMSA9IG90aGVyLmdldCgyLCAxKTtcbiAgICBjb25zdCBiMjIgPSBvdGhlci5nZXQoMiwgMik7XG5cbiAgICBjb25zdCBtMSA9IChhMDAgKyBhMDEgKyBhMDIgLSBhMTAgLSBhMTEgLSBhMjEgLSBhMjIpICogYjExO1xuICAgIGNvbnN0IG0yID0gKGEwMCAtIGExMCkgKiAoLWIwMSArIGIxMSk7XG4gICAgY29uc3QgbTMgPSBhMTEgKiAoLWIwMCArIGIwMSArIGIxMCAtIGIxMSAtIGIxMiAtIGIyMCArIGIyMik7XG4gICAgY29uc3QgbTQgPSAoLWEwMCArIGExMCArIGExMSkgKiAoYjAwIC0gYjAxICsgYjExKTtcbiAgICBjb25zdCBtNSA9IChhMTAgKyBhMTEpICogKC1iMDAgKyBiMDEpO1xuICAgIGNvbnN0IG02ID0gYTAwICogYjAwO1xuICAgIGNvbnN0IG03ID0gKC1hMDAgKyBhMjAgKyBhMjEpICogKGIwMCAtIGIwMiArIGIxMik7XG4gICAgY29uc3QgbTggPSAoLWEwMCArIGEyMCkgKiAoYjAyIC0gYjEyKTtcbiAgICBjb25zdCBtOSA9IChhMjAgKyBhMjEpICogKC1iMDAgKyBiMDIpO1xuICAgIGNvbnN0IG0xMCA9IChhMDAgKyBhMDEgKyBhMDIgLSBhMTEgLSBhMTIgLSBhMjAgLSBhMjEpICogYjEyO1xuICAgIGNvbnN0IG0xMSA9IGEyMSAqICgtYjAwICsgYjAyICsgYjEwIC0gYjExIC0gYjEyIC0gYjIwICsgYjIxKTtcbiAgICBjb25zdCBtMTIgPSAoLWEwMiArIGEyMSArIGEyMikgKiAoYjExICsgYjIwIC0gYjIxKTtcbiAgICBjb25zdCBtMTMgPSAoYTAyIC0gYTIyKSAqIChiMTEgLSBiMjEpO1xuICAgIGNvbnN0IG0xNCA9IGEwMiAqIGIyMDtcbiAgICBjb25zdCBtMTUgPSAoYTIxICsgYTIyKSAqICgtYjIwICsgYjIxKTtcbiAgICBjb25zdCBtMTYgPSAoLWEwMiArIGExMSArIGExMikgKiAoYjEyICsgYjIwIC0gYjIyKTtcbiAgICBjb25zdCBtMTcgPSAoYTAyIC0gYTEyKSAqIChiMTIgLSBiMjIpO1xuICAgIGNvbnN0IG0xOCA9IChhMTEgKyBhMTIpICogKC1iMjAgKyBiMjIpO1xuICAgIGNvbnN0IG0xOSA9IGEwMSAqIGIxMDtcbiAgICBjb25zdCBtMjAgPSBhMTIgKiBiMjE7XG4gICAgY29uc3QgbTIxID0gYTEwICogYjAyO1xuICAgIGNvbnN0IG0yMiA9IGEyMCAqIGIwMTtcbiAgICBjb25zdCBtMjMgPSBhMjIgKiBiMjI7XG5cbiAgICBjb25zdCBjMDAgPSBtNiArIG0xNCArIG0xOTtcbiAgICBjb25zdCBjMDEgPSBtMSArIG00ICsgbTUgKyBtNiArIG0xMiArIG0xNCArIG0xNTtcbiAgICBjb25zdCBjMDIgPSBtNiArIG03ICsgbTkgKyBtMTAgKyBtMTQgKyBtMTYgKyBtMTg7XG4gICAgY29uc3QgYzEwID0gbTIgKyBtMyArIG00ICsgbTYgKyBtMTQgKyBtMTYgKyBtMTc7XG4gICAgY29uc3QgYzExID0gbTIgKyBtNCArIG01ICsgbTYgKyBtMjA7XG4gICAgY29uc3QgYzEyID0gbTE0ICsgbTE2ICsgbTE3ICsgbTE4ICsgbTIxO1xuICAgIGNvbnN0IGMyMCA9IG02ICsgbTcgKyBtOCArIG0xMSArIG0xMiArIG0xMyArIG0xNDtcbiAgICBjb25zdCBjMjEgPSBtMTIgKyBtMTMgKyBtMTQgKyBtMTUgKyBtMjI7XG4gICAgY29uc3QgYzIyID0gbTYgKyBtNyArIG04ICsgbTkgKyBtMjM7XG5cbiAgICByZXN1bHQuc2V0KDAsIDAsIGMwMCk7XG4gICAgcmVzdWx0LnNldCgwLCAxLCBjMDEpO1xuICAgIHJlc3VsdC5zZXQoMCwgMiwgYzAyKTtcbiAgICByZXN1bHQuc2V0KDEsIDAsIGMxMCk7XG4gICAgcmVzdWx0LnNldCgxLCAxLCBjMTEpO1xuICAgIHJlc3VsdC5zZXQoMSwgMiwgYzEyKTtcbiAgICByZXN1bHQuc2V0KDIsIDAsIGMyMCk7XG4gICAgcmVzdWx0LnNldCgyLCAxLCBjMjEpO1xuICAgIHJlc3VsdC5zZXQoMiwgMiwgYzIyKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgbW11bFN0cmFzc2VuKHkpIHtcbiAgICB5ID0gTWF0cml4LmNoZWNrTWF0cml4KHkpO1xuICAgIGxldCB4ID0gdGhpcy5jbG9uZSgpO1xuICAgIGxldCByMSA9IHgucm93cztcbiAgICBsZXQgYzEgPSB4LmNvbHVtbnM7XG4gICAgbGV0IHIyID0geS5yb3dzO1xuICAgIGxldCBjMiA9IHkuY29sdW1ucztcbiAgICBpZiAoYzEgIT09IHIyKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBgTXVsdGlwbHlpbmcgJHtyMX0geCAke2MxfSBhbmQgJHtyMn0geCAke2MyfSBtYXRyaXg6IGRpbWVuc2lvbnMgZG8gbm90IG1hdGNoLmAsXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIFB1dCBhIG1hdHJpeCBpbnRvIHRoZSB0b3AgbGVmdCBvZiBhIG1hdHJpeCBvZiB6ZXJvcy5cbiAgICAvLyBgcm93c2AgYW5kIGBjb2xzYCBhcmUgdGhlIGRpbWVuc2lvbnMgb2YgdGhlIG91dHB1dCBtYXRyaXguXG4gICAgZnVuY3Rpb24gZW1iZWQobWF0LCByb3dzLCBjb2xzKSB7XG4gICAgICBsZXQgciA9IG1hdC5yb3dzO1xuICAgICAgbGV0IGMgPSBtYXQuY29sdW1ucztcbiAgICAgIGlmIChyID09PSByb3dzICYmIGMgPT09IGNvbHMpIHtcbiAgICAgICAgcmV0dXJuIG1hdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCByZXN1bHRhdCA9IEFic3RyYWN0TWF0cml4Lnplcm9zKHJvd3MsIGNvbHMpO1xuICAgICAgICByZXN1bHRhdCA9IHJlc3VsdGF0LnNldFN1Yk1hdHJpeChtYXQsIDAsIDApO1xuICAgICAgICByZXR1cm4gcmVzdWx0YXQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gTWFrZSBzdXJlIGJvdGggbWF0cmljZXMgYXJlIHRoZSBzYW1lIHNpemUuXG4gICAgLy8gVGhpcyBpcyBleGNsdXNpdmVseSBmb3Igc2ltcGxpY2l0eTpcbiAgICAvLyB0aGlzIGFsZ29yaXRobSBjYW4gYmUgaW1wbGVtZW50ZWQgd2l0aCBtYXRyaWNlcyBvZiBkaWZmZXJlbnQgc2l6ZXMuXG5cbiAgICBsZXQgciA9IE1hdGgubWF4KHIxLCByMik7XG4gICAgbGV0IGMgPSBNYXRoLm1heChjMSwgYzIpO1xuICAgIHggPSBlbWJlZCh4LCByLCBjKTtcbiAgICB5ID0gZW1iZWQoeSwgciwgYyk7XG5cbiAgICAvLyBPdXIgcmVjdXJzaXZlIG11bHRpcGxpY2F0aW9uIGZ1bmN0aW9uLlxuICAgIGZ1bmN0aW9uIGJsb2NrTXVsdChhLCBiLCByb3dzLCBjb2xzKSB7XG4gICAgICAvLyBGb3Igc21hbGwgbWF0cmljZXMsIHJlc29ydCB0byBuYWl2ZSBtdWx0aXBsaWNhdGlvbi5cbiAgICAgIGlmIChyb3dzIDw9IDUxMiB8fCBjb2xzIDw9IDUxMikge1xuICAgICAgICByZXR1cm4gYS5tbXVsKGIpOyAvLyBhIGlzIGVxdWl2YWxlbnQgdG8gdGhpc1xuICAgICAgfVxuXG4gICAgICAvLyBBcHBseSBkeW5hbWljIHBhZGRpbmcuXG4gICAgICBpZiAocm93cyAlIDIgPT09IDEgJiYgY29scyAlIDIgPT09IDEpIHtcbiAgICAgICAgYSA9IGVtYmVkKGEsIHJvd3MgKyAxLCBjb2xzICsgMSk7XG4gICAgICAgIGIgPSBlbWJlZChiLCByb3dzICsgMSwgY29scyArIDEpO1xuICAgICAgfSBlbHNlIGlmIChyb3dzICUgMiA9PT0gMSkge1xuICAgICAgICBhID0gZW1iZWQoYSwgcm93cyArIDEsIGNvbHMpO1xuICAgICAgICBiID0gZW1iZWQoYiwgcm93cyArIDEsIGNvbHMpO1xuICAgICAgfSBlbHNlIGlmIChjb2xzICUgMiA9PT0gMSkge1xuICAgICAgICBhID0gZW1iZWQoYSwgcm93cywgY29scyArIDEpO1xuICAgICAgICBiID0gZW1iZWQoYiwgcm93cywgY29scyArIDEpO1xuICAgICAgfVxuXG4gICAgICBsZXQgaGFsZlJvd3MgPSBwYXJzZUludChhLnJvd3MgLyAyLCAxMCk7XG4gICAgICBsZXQgaGFsZkNvbHMgPSBwYXJzZUludChhLmNvbHVtbnMgLyAyLCAxMCk7XG4gICAgICAvLyBTdWJkaXZpZGUgaW5wdXQgbWF0cmljZXMuXG4gICAgICBsZXQgYTExID0gYS5zdWJNYXRyaXgoMCwgaGFsZlJvd3MgLSAxLCAwLCBoYWxmQ29scyAtIDEpO1xuICAgICAgbGV0IGIxMSA9IGIuc3ViTWF0cml4KDAsIGhhbGZSb3dzIC0gMSwgMCwgaGFsZkNvbHMgLSAxKTtcblxuICAgICAgbGV0IGExMiA9IGEuc3ViTWF0cml4KDAsIGhhbGZSb3dzIC0gMSwgaGFsZkNvbHMsIGEuY29sdW1ucyAtIDEpO1xuICAgICAgbGV0IGIxMiA9IGIuc3ViTWF0cml4KDAsIGhhbGZSb3dzIC0gMSwgaGFsZkNvbHMsIGIuY29sdW1ucyAtIDEpO1xuXG4gICAgICBsZXQgYTIxID0gYS5zdWJNYXRyaXgoaGFsZlJvd3MsIGEucm93cyAtIDEsIDAsIGhhbGZDb2xzIC0gMSk7XG4gICAgICBsZXQgYjIxID0gYi5zdWJNYXRyaXgoaGFsZlJvd3MsIGIucm93cyAtIDEsIDAsIGhhbGZDb2xzIC0gMSk7XG5cbiAgICAgIGxldCBhMjIgPSBhLnN1Yk1hdHJpeChoYWxmUm93cywgYS5yb3dzIC0gMSwgaGFsZkNvbHMsIGEuY29sdW1ucyAtIDEpO1xuICAgICAgbGV0IGIyMiA9IGIuc3ViTWF0cml4KGhhbGZSb3dzLCBiLnJvd3MgLSAxLCBoYWxmQ29scywgYi5jb2x1bW5zIC0gMSk7XG5cbiAgICAgIC8vIENvbXB1dGUgaW50ZXJtZWRpYXRlIHZhbHVlcy5cbiAgICAgIGxldCBtMSA9IGJsb2NrTXVsdChcbiAgICAgICAgQWJzdHJhY3RNYXRyaXguYWRkKGExMSwgYTIyKSxcbiAgICAgICAgQWJzdHJhY3RNYXRyaXguYWRkKGIxMSwgYjIyKSxcbiAgICAgICAgaGFsZlJvd3MsXG4gICAgICAgIGhhbGZDb2xzLFxuICAgICAgKTtcbiAgICAgIGxldCBtMiA9IGJsb2NrTXVsdChBYnN0cmFjdE1hdHJpeC5hZGQoYTIxLCBhMjIpLCBiMTEsIGhhbGZSb3dzLCBoYWxmQ29scyk7XG4gICAgICBsZXQgbTMgPSBibG9ja011bHQoYTExLCBBYnN0cmFjdE1hdHJpeC5zdWIoYjEyLCBiMjIpLCBoYWxmUm93cywgaGFsZkNvbHMpO1xuICAgICAgbGV0IG00ID0gYmxvY2tNdWx0KGEyMiwgQWJzdHJhY3RNYXRyaXguc3ViKGIyMSwgYjExKSwgaGFsZlJvd3MsIGhhbGZDb2xzKTtcbiAgICAgIGxldCBtNSA9IGJsb2NrTXVsdChBYnN0cmFjdE1hdHJpeC5hZGQoYTExLCBhMTIpLCBiMjIsIGhhbGZSb3dzLCBoYWxmQ29scyk7XG4gICAgICBsZXQgbTYgPSBibG9ja011bHQoXG4gICAgICAgIEFic3RyYWN0TWF0cml4LnN1YihhMjEsIGExMSksXG4gICAgICAgIEFic3RyYWN0TWF0cml4LmFkZChiMTEsIGIxMiksXG4gICAgICAgIGhhbGZSb3dzLFxuICAgICAgICBoYWxmQ29scyxcbiAgICAgICk7XG4gICAgICBsZXQgbTcgPSBibG9ja011bHQoXG4gICAgICAgIEFic3RyYWN0TWF0cml4LnN1YihhMTIsIGEyMiksXG4gICAgICAgIEFic3RyYWN0TWF0cml4LmFkZChiMjEsIGIyMiksXG4gICAgICAgIGhhbGZSb3dzLFxuICAgICAgICBoYWxmQ29scyxcbiAgICAgICk7XG5cbiAgICAgIC8vIENvbWJpbmUgaW50ZXJtZWRpYXRlIHZhbHVlcyBpbnRvIHRoZSBvdXRwdXQuXG4gICAgICBsZXQgYzExID0gQWJzdHJhY3RNYXRyaXguYWRkKG0xLCBtNCk7XG4gICAgICBjMTEuc3ViKG01KTtcbiAgICAgIGMxMS5hZGQobTcpO1xuICAgICAgbGV0IGMxMiA9IEFic3RyYWN0TWF0cml4LmFkZChtMywgbTUpO1xuICAgICAgbGV0IGMyMSA9IEFic3RyYWN0TWF0cml4LmFkZChtMiwgbTQpO1xuICAgICAgbGV0IGMyMiA9IEFic3RyYWN0TWF0cml4LnN1YihtMSwgbTIpO1xuICAgICAgYzIyLmFkZChtMyk7XG4gICAgICBjMjIuYWRkKG02KTtcblxuICAgICAgLy8gQ3JvcCBvdXRwdXQgdG8gdGhlIGRlc2lyZWQgc2l6ZSAodW5kbyBkeW5hbWljIHBhZGRpbmcpLlxuICAgICAgbGV0IHJlc3VsdGF0ID0gQWJzdHJhY3RNYXRyaXguemVyb3MoMiAqIGMxMS5yb3dzLCAyICogYzExLmNvbHVtbnMpO1xuICAgICAgcmVzdWx0YXQgPSByZXN1bHRhdC5zZXRTdWJNYXRyaXgoYzExLCAwLCAwKTtcbiAgICAgIHJlc3VsdGF0ID0gcmVzdWx0YXQuc2V0U3ViTWF0cml4KGMxMiwgYzExLnJvd3MsIDApO1xuICAgICAgcmVzdWx0YXQgPSByZXN1bHRhdC5zZXRTdWJNYXRyaXgoYzIxLCAwLCBjMTEuY29sdW1ucyk7XG4gICAgICByZXN1bHRhdCA9IHJlc3VsdGF0LnNldFN1Yk1hdHJpeChjMjIsIGMxMS5yb3dzLCBjMTEuY29sdW1ucyk7XG4gICAgICByZXR1cm4gcmVzdWx0YXQuc3ViTWF0cml4KDAsIHJvd3MgLSAxLCAwLCBjb2xzIC0gMSk7XG4gICAgfVxuICAgIHJldHVybiBibG9ja011bHQoeCwgeSwgciwgYyk7XG4gIH1cblxuICBzY2FsZVJvd3Mob3B0aW9ucyA9IHt9KSB7XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignb3B0aW9ucyBtdXN0IGJlIGFuIG9iamVjdCcpO1xuICAgIH1cbiAgICBjb25zdCB7IG1pbiA9IDAsIG1heCA9IDEgfSA9IG9wdGlvbnM7XG4gICAgaWYgKCFOdW1iZXIuaXNGaW5pdGUobWluKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignbWluIG11c3QgYmUgYSBudW1iZXInKTtcbiAgICBpZiAoIU51bWJlci5pc0Zpbml0ZShtYXgpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdtYXggbXVzdCBiZSBhIG51bWJlcicpO1xuICAgIGlmIChtaW4gPj0gbWF4KSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignbWluIG11c3QgYmUgc21hbGxlciB0aGFuIG1heCcpO1xuICAgIGxldCBuZXdNYXRyaXggPSBuZXcgTWF0cml4KHRoaXMucm93cywgdGhpcy5jb2x1bW5zKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBjb25zdCByb3cgPSB0aGlzLmdldFJvdyhpKTtcbiAgICAgIHJlc2NhbGUocm93LCB7IG1pbiwgbWF4LCBvdXRwdXQ6IHJvdyB9KTtcbiAgICAgIG5ld01hdHJpeC5zZXRSb3coaSwgcm93KTtcbiAgICB9XG4gICAgcmV0dXJuIG5ld01hdHJpeDtcbiAgfVxuXG4gIHNjYWxlQ29sdW1ucyhvcHRpb25zID0ge30pIHtcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdvcHRpb25zIG11c3QgYmUgYW4gb2JqZWN0Jyk7XG4gICAgfVxuICAgIGNvbnN0IHsgbWluID0gMCwgbWF4ID0gMSB9ID0gb3B0aW9ucztcbiAgICBpZiAoIU51bWJlci5pc0Zpbml0ZShtaW4pKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdtaW4gbXVzdCBiZSBhIG51bWJlcicpO1xuICAgIGlmICghTnVtYmVyLmlzRmluaXRlKG1heCkpIHRocm93IG5ldyBUeXBlRXJyb3IoJ21heCBtdXN0IGJlIGEgbnVtYmVyJyk7XG4gICAgaWYgKG1pbiA+PSBtYXgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdtaW4gbXVzdCBiZSBzbWFsbGVyIHRoYW4gbWF4Jyk7XG4gICAgbGV0IG5ld01hdHJpeCA9IG5ldyBNYXRyaXgodGhpcy5yb3dzLCB0aGlzLmNvbHVtbnMpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb2x1bW5zOyBpKyspIHtcbiAgICAgIGNvbnN0IGNvbHVtbiA9IHRoaXMuZ2V0Q29sdW1uKGkpO1xuICAgICAgcmVzY2FsZShjb2x1bW4sIHtcbiAgICAgICAgbWluOiBtaW4sXG4gICAgICAgIG1heDogbWF4LFxuICAgICAgICBvdXRwdXQ6IGNvbHVtbixcbiAgICAgIH0pO1xuICAgICAgbmV3TWF0cml4LnNldENvbHVtbihpLCBjb2x1bW4pO1xuICAgIH1cbiAgICByZXR1cm4gbmV3TWF0cml4O1xuICB9XG5cbiAgZmxpcFJvd3MoKSB7XG4gICAgY29uc3QgbWlkZGxlID0gTWF0aC5jZWlsKHRoaXMuY29sdW1ucyAvIDIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbWlkZGxlOyBqKyspIHtcbiAgICAgICAgbGV0IGZpcnN0ID0gdGhpcy5nZXQoaSwgaik7XG4gICAgICAgIGxldCBsYXN0ID0gdGhpcy5nZXQoaSwgdGhpcy5jb2x1bW5zIC0gMSAtIGopO1xuICAgICAgICB0aGlzLnNldChpLCBqLCBsYXN0KTtcbiAgICAgICAgdGhpcy5zZXQoaSwgdGhpcy5jb2x1bW5zIC0gMSAtIGosIGZpcnN0KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBmbGlwQ29sdW1ucygpIHtcbiAgICBjb25zdCBtaWRkbGUgPSBNYXRoLmNlaWwodGhpcy5yb3dzIC8gMik7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtaWRkbGU7IGkrKykge1xuICAgICAgICBsZXQgZmlyc3QgPSB0aGlzLmdldChpLCBqKTtcbiAgICAgICAgbGV0IGxhc3QgPSB0aGlzLmdldCh0aGlzLnJvd3MgLSAxIC0gaSwgaik7XG4gICAgICAgIHRoaXMuc2V0KGksIGosIGxhc3QpO1xuICAgICAgICB0aGlzLnNldCh0aGlzLnJvd3MgLSAxIC0gaSwgaiwgZmlyc3QpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGtyb25lY2tlclByb2R1Y3Qob3RoZXIpIHtcbiAgICBvdGhlciA9IE1hdHJpeC5jaGVja01hdHJpeChvdGhlcik7XG5cbiAgICBsZXQgbSA9IHRoaXMucm93cztcbiAgICBsZXQgbiA9IHRoaXMuY29sdW1ucztcbiAgICBsZXQgcCA9IG90aGVyLnJvd3M7XG4gICAgbGV0IHEgPSBvdGhlci5jb2x1bW5zO1xuXG4gICAgbGV0IHJlc3VsdCA9IG5ldyBNYXRyaXgobSAqIHAsIG4gKiBxKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG07IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBuOyBqKyspIHtcbiAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBwOyBrKyspIHtcbiAgICAgICAgICBmb3IgKGxldCBsID0gMDsgbCA8IHE7IGwrKykge1xuICAgICAgICAgICAgcmVzdWx0LnNldChwICogaSArIGssIHEgKiBqICsgbCwgdGhpcy5nZXQoaSwgaikgKiBvdGhlci5nZXQoaywgbCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgdHJhbnNwb3NlKCkge1xuICAgIGxldCByZXN1bHQgPSBuZXcgTWF0cml4KHRoaXMuY29sdW1ucywgdGhpcy5yb3dzKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sdW1uczsgaisrKSB7XG4gICAgICAgIHJlc3VsdC5zZXQoaiwgaSwgdGhpcy5nZXQoaSwgaikpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgc29ydFJvd3MoY29tcGFyZUZ1bmN0aW9uID0gY29tcGFyZU51bWJlcnMpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICB0aGlzLnNldFJvdyhpLCB0aGlzLmdldFJvdyhpKS5zb3J0KGNvbXBhcmVGdW5jdGlvbikpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNvcnRDb2x1bW5zKGNvbXBhcmVGdW5jdGlvbiA9IGNvbXBhcmVOdW1iZXJzKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbHVtbnM7IGkrKykge1xuICAgICAgdGhpcy5zZXRDb2x1bW4oaSwgdGhpcy5nZXRDb2x1bW4oaSkuc29ydChjb21wYXJlRnVuY3Rpb24pKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzdWJNYXRyaXgoc3RhcnRSb3csIGVuZFJvdywgc3RhcnRDb2x1bW4sIGVuZENvbHVtbikge1xuICAgIGNoZWNrUmFuZ2UodGhpcywgc3RhcnRSb3csIGVuZFJvdywgc3RhcnRDb2x1bW4sIGVuZENvbHVtbik7XG4gICAgbGV0IG5ld01hdHJpeCA9IG5ldyBNYXRyaXgoXG4gICAgICBlbmRSb3cgLSBzdGFydFJvdyArIDEsXG4gICAgICBlbmRDb2x1bW4gLSBzdGFydENvbHVtbiArIDEsXG4gICAgKTtcbiAgICBmb3IgKGxldCBpID0gc3RhcnRSb3c7IGkgPD0gZW5kUm93OyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSBzdGFydENvbHVtbjsgaiA8PSBlbmRDb2x1bW47IGorKykge1xuICAgICAgICBuZXdNYXRyaXguc2V0KGkgLSBzdGFydFJvdywgaiAtIHN0YXJ0Q29sdW1uLCB0aGlzLmdldChpLCBqKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXdNYXRyaXg7XG4gIH1cblxuICBzdWJNYXRyaXhSb3coaW5kaWNlcywgc3RhcnRDb2x1bW4sIGVuZENvbHVtbikge1xuICAgIGlmIChzdGFydENvbHVtbiA9PT0gdW5kZWZpbmVkKSBzdGFydENvbHVtbiA9IDA7XG4gICAgaWYgKGVuZENvbHVtbiA9PT0gdW5kZWZpbmVkKSBlbmRDb2x1bW4gPSB0aGlzLmNvbHVtbnMgLSAxO1xuICAgIGlmIChcbiAgICAgIHN0YXJ0Q29sdW1uID4gZW5kQ29sdW1uIHx8XG4gICAgICBzdGFydENvbHVtbiA8IDAgfHxcbiAgICAgIHN0YXJ0Q29sdW1uID49IHRoaXMuY29sdW1ucyB8fFxuICAgICAgZW5kQ29sdW1uIDwgMCB8fFxuICAgICAgZW5kQ29sdW1uID49IHRoaXMuY29sdW1uc1xuICAgICkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0FyZ3VtZW50IG91dCBvZiByYW5nZScpO1xuICAgIH1cblxuICAgIGxldCBuZXdNYXRyaXggPSBuZXcgTWF0cml4KGluZGljZXMubGVuZ3RoLCBlbmRDb2x1bW4gLSBzdGFydENvbHVtbiArIDEpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5kaWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IHN0YXJ0Q29sdW1uOyBqIDw9IGVuZENvbHVtbjsgaisrKSB7XG4gICAgICAgIGlmIChpbmRpY2VzW2ldIDwgMCB8fCBpbmRpY2VzW2ldID49IHRoaXMucm93cykge1xuICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKGBSb3cgaW5kZXggb3V0IG9mIHJhbmdlOiAke2luZGljZXNbaV19YCk7XG4gICAgICAgIH1cbiAgICAgICAgbmV3TWF0cml4LnNldChpLCBqIC0gc3RhcnRDb2x1bW4sIHRoaXMuZ2V0KGluZGljZXNbaV0sIGopKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5ld01hdHJpeDtcbiAgfVxuXG4gIHN1Yk1hdHJpeENvbHVtbihpbmRpY2VzLCBzdGFydFJvdywgZW5kUm93KSB7XG4gICAgaWYgKHN0YXJ0Um93ID09PSB1bmRlZmluZWQpIHN0YXJ0Um93ID0gMDtcbiAgICBpZiAoZW5kUm93ID09PSB1bmRlZmluZWQpIGVuZFJvdyA9IHRoaXMucm93cyAtIDE7XG4gICAgaWYgKFxuICAgICAgc3RhcnRSb3cgPiBlbmRSb3cgfHxcbiAgICAgIHN0YXJ0Um93IDwgMCB8fFxuICAgICAgc3RhcnRSb3cgPj0gdGhpcy5yb3dzIHx8XG4gICAgICBlbmRSb3cgPCAwIHx8XG4gICAgICBlbmRSb3cgPj0gdGhpcy5yb3dzXG4gICAgKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQXJndW1lbnQgb3V0IG9mIHJhbmdlJyk7XG4gICAgfVxuXG4gICAgbGV0IG5ld01hdHJpeCA9IG5ldyBNYXRyaXgoZW5kUm93IC0gc3RhcnRSb3cgKyAxLCBpbmRpY2VzLmxlbmd0aCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmRpY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gc3RhcnRSb3c7IGogPD0gZW5kUm93OyBqKyspIHtcbiAgICAgICAgaWYgKGluZGljZXNbaV0gPCAwIHx8IGluZGljZXNbaV0gPj0gdGhpcy5jb2x1bW5zKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoYENvbHVtbiBpbmRleCBvdXQgb2YgcmFuZ2U6ICR7aW5kaWNlc1tpXX1gKTtcbiAgICAgICAgfVxuICAgICAgICBuZXdNYXRyaXguc2V0KGogLSBzdGFydFJvdywgaSwgdGhpcy5nZXQoaiwgaW5kaWNlc1tpXSkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV3TWF0cml4O1xuICB9XG5cbiAgc2V0U3ViTWF0cml4KG1hdHJpeCwgc3RhcnRSb3csIHN0YXJ0Q29sdW1uKSB7XG4gICAgbWF0cml4ID0gTWF0cml4LmNoZWNrTWF0cml4KG1hdHJpeCk7XG4gICAgbGV0IGVuZFJvdyA9IHN0YXJ0Um93ICsgbWF0cml4LnJvd3MgLSAxO1xuICAgIGxldCBlbmRDb2x1bW4gPSBzdGFydENvbHVtbiArIG1hdHJpeC5jb2x1bW5zIC0gMTtcbiAgICBjaGVja1JhbmdlKHRoaXMsIHN0YXJ0Um93LCBlbmRSb3csIHN0YXJ0Q29sdW1uLCBlbmRDb2x1bW4pO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWF0cml4LnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBtYXRyaXguY29sdW1uczsgaisrKSB7XG4gICAgICAgIHRoaXMuc2V0KHN0YXJ0Um93ICsgaSwgc3RhcnRDb2x1bW4gKyBqLCBtYXRyaXguZ2V0KGksIGopKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzZWxlY3Rpb24ocm93SW5kaWNlcywgY29sdW1uSW5kaWNlcykge1xuICAgIGxldCBpbmRpY2VzID0gY2hlY2tJbmRpY2VzKHRoaXMsIHJvd0luZGljZXMsIGNvbHVtbkluZGljZXMpO1xuICAgIGxldCBuZXdNYXRyaXggPSBuZXcgTWF0cml4KHJvd0luZGljZXMubGVuZ3RoLCBjb2x1bW5JbmRpY2VzLmxlbmd0aCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmRpY2VzLnJvdy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IHJvd0luZGV4ID0gaW5kaWNlcy5yb3dbaV07XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGluZGljZXMuY29sdW1uLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGxldCBjb2x1bW5JbmRleCA9IGluZGljZXMuY29sdW1uW2pdO1xuICAgICAgICBuZXdNYXRyaXguc2V0KGksIGosIHRoaXMuZ2V0KHJvd0luZGV4LCBjb2x1bW5JbmRleCkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV3TWF0cml4O1xuICB9XG5cbiAgdHJhY2UoKSB7XG4gICAgbGV0IG1pbiA9IE1hdGgubWluKHRoaXMucm93cywgdGhpcy5jb2x1bW5zKTtcbiAgICBsZXQgdHJhY2UgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWluOyBpKyspIHtcbiAgICAgIHRyYWNlICs9IHRoaXMuZ2V0KGksIGkpO1xuICAgIH1cbiAgICByZXR1cm4gdHJhY2U7XG4gIH1cblxuICBjbG9uZSgpIHtcbiAgICBsZXQgbmV3TWF0cml4ID0gbmV3IE1hdHJpeCh0aGlzLnJvd3MsIHRoaXMuY29sdW1ucyk7XG4gICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgdGhpcy5yb3dzOyByb3crKykge1xuICAgICAgZm9yIChsZXQgY29sdW1uID0gMDsgY29sdW1uIDwgdGhpcy5jb2x1bW5zOyBjb2x1bW4rKykge1xuICAgICAgICBuZXdNYXRyaXguc2V0KHJvdywgY29sdW1uLCB0aGlzLmdldChyb3csIGNvbHVtbikpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV3TWF0cml4O1xuICB9XG5cbiAgc3VtKGJ5KSB7XG4gICAgc3dpdGNoIChieSkge1xuICAgICAgY2FzZSAncm93JzpcbiAgICAgICAgcmV0dXJuIHN1bUJ5Um93KHRoaXMpO1xuICAgICAgY2FzZSAnY29sdW1uJzpcbiAgICAgICAgcmV0dXJuIHN1bUJ5Q29sdW1uKHRoaXMpO1xuICAgICAgY2FzZSB1bmRlZmluZWQ6XG4gICAgICAgIHJldHVybiBzdW1BbGwodGhpcyk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgb3B0aW9uOiAke2J5fWApO1xuICAgIH1cbiAgfVxuXG4gIHByb2R1Y3QoYnkpIHtcbiAgICBzd2l0Y2ggKGJ5KSB7XG4gICAgICBjYXNlICdyb3cnOlxuICAgICAgICByZXR1cm4gcHJvZHVjdEJ5Um93KHRoaXMpO1xuICAgICAgY2FzZSAnY29sdW1uJzpcbiAgICAgICAgcmV0dXJuIHByb2R1Y3RCeUNvbHVtbih0aGlzKTtcbiAgICAgIGNhc2UgdW5kZWZpbmVkOlxuICAgICAgICByZXR1cm4gcHJvZHVjdEFsbCh0aGlzKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCBvcHRpb246ICR7Ynl9YCk7XG4gICAgfVxuICB9XG5cbiAgbWVhbihieSkge1xuICAgIGNvbnN0IHN1bSA9IHRoaXMuc3VtKGJ5KTtcbiAgICBzd2l0Y2ggKGJ5KSB7XG4gICAgICBjYXNlICdyb3cnOiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgICAgICBzdW1baV0gLz0gdGhpcy5jb2x1bW5zO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdW07XG4gICAgICB9XG4gICAgICBjYXNlICdjb2x1bW4nOiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb2x1bW5zOyBpKyspIHtcbiAgICAgICAgICBzdW1baV0gLz0gdGhpcy5yb3dzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdW07XG4gICAgICB9XG4gICAgICBjYXNlIHVuZGVmaW5lZDpcbiAgICAgICAgcmV0dXJuIHN1bSAvIHRoaXMuc2l6ZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCBvcHRpb246ICR7Ynl9YCk7XG4gICAgfVxuICB9XG5cbiAgdmFyaWFuY2UoYnksIG9wdGlvbnMgPSB7fSkge1xuICAgIGlmICh0eXBlb2YgYnkgPT09ICdvYmplY3QnKSB7XG4gICAgICBvcHRpb25zID0gYnk7XG4gICAgICBieSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignb3B0aW9ucyBtdXN0IGJlIGFuIG9iamVjdCcpO1xuICAgIH1cbiAgICBjb25zdCB7IHVuYmlhc2VkID0gdHJ1ZSwgbWVhbiA9IHRoaXMubWVhbihieSkgfSA9IG9wdGlvbnM7XG4gICAgaWYgKHR5cGVvZiB1bmJpYXNlZCAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd1bmJpYXNlZCBtdXN0IGJlIGEgYm9vbGVhbicpO1xuICAgIH1cbiAgICBzd2l0Y2ggKGJ5KSB7XG4gICAgICBjYXNlICdyb3cnOiB7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShtZWFuKSkge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ21lYW4gbXVzdCBiZSBhbiBhcnJheScpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YXJpYW5jZUJ5Um93KHRoaXMsIHVuYmlhc2VkLCBtZWFuKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgJ2NvbHVtbic6IHtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KG1lYW4pKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignbWVhbiBtdXN0IGJlIGFuIGFycmF5Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhcmlhbmNlQnlDb2x1bW4odGhpcywgdW5iaWFzZWQsIG1lYW4pO1xuICAgICAgfVxuICAgICAgY2FzZSB1bmRlZmluZWQ6IHtcbiAgICAgICAgaWYgKHR5cGVvZiBtZWFuICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ21lYW4gbXVzdCBiZSBhIG51bWJlcicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YXJpYW5jZUFsbCh0aGlzLCB1bmJpYXNlZCwgbWVhbik7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgb3B0aW9uOiAke2J5fWApO1xuICAgIH1cbiAgfVxuXG4gIHN0YW5kYXJkRGV2aWF0aW9uKGJ5LCBvcHRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiBieSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIG9wdGlvbnMgPSBieTtcbiAgICAgIGJ5ID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBjb25zdCB2YXJpYW5jZSA9IHRoaXMudmFyaWFuY2UoYnksIG9wdGlvbnMpO1xuICAgIGlmIChieSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gTWF0aC5zcXJ0KHZhcmlhbmNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YXJpYW5jZS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXJpYW5jZVtpXSA9IE1hdGguc3FydCh2YXJpYW5jZVtpXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFyaWFuY2U7XG4gICAgfVxuICB9XG5cbiAgY2VudGVyKGJ5LCBvcHRpb25zID0ge30pIHtcbiAgICBpZiAodHlwZW9mIGJ5ID09PSAnb2JqZWN0Jykge1xuICAgICAgb3B0aW9ucyA9IGJ5O1xuICAgICAgYnkgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ29wdGlvbnMgbXVzdCBiZSBhbiBvYmplY3QnKTtcbiAgICB9XG4gICAgY29uc3QgeyBjZW50ZXIgPSB0aGlzLm1lYW4oYnkpIH0gPSBvcHRpb25zO1xuICAgIHN3aXRjaCAoYnkpIHtcbiAgICAgIGNhc2UgJ3Jvdyc6IHtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGNlbnRlcikpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdjZW50ZXIgbXVzdCBiZSBhbiBhcnJheScpO1xuICAgICAgICB9XG4gICAgICAgIGNlbnRlckJ5Um93KHRoaXMsIGNlbnRlcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgICAgY2FzZSAnY29sdW1uJzoge1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoY2VudGVyKSkge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2NlbnRlciBtdXN0IGJlIGFuIGFycmF5Jyk7XG4gICAgICAgIH1cbiAgICAgICAgY2VudGVyQnlDb2x1bW4odGhpcywgY2VudGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgICBjYXNlIHVuZGVmaW5lZDoge1xuICAgICAgICBpZiAodHlwZW9mIGNlbnRlciAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdjZW50ZXIgbXVzdCBiZSBhIG51bWJlcicpO1xuICAgICAgICB9XG4gICAgICAgIGNlbnRlckFsbCh0aGlzLCBjZW50ZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCBvcHRpb246ICR7Ynl9YCk7XG4gICAgfVxuICB9XG5cbiAgc2NhbGUoYnksIG9wdGlvbnMgPSB7fSkge1xuICAgIGlmICh0eXBlb2YgYnkgPT09ICdvYmplY3QnKSB7XG4gICAgICBvcHRpb25zID0gYnk7XG4gICAgICBieSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignb3B0aW9ucyBtdXN0IGJlIGFuIG9iamVjdCcpO1xuICAgIH1cbiAgICBsZXQgc2NhbGUgPSBvcHRpb25zLnNjYWxlO1xuICAgIHN3aXRjaCAoYnkpIHtcbiAgICAgIGNhc2UgJ3Jvdyc6IHtcbiAgICAgICAgaWYgKHNjYWxlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBzY2FsZSA9IGdldFNjYWxlQnlSb3codGhpcyk7XG4gICAgICAgIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkoc2NhbGUpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignc2NhbGUgbXVzdCBiZSBhbiBhcnJheScpO1xuICAgICAgICB9XG4gICAgICAgIHNjYWxlQnlSb3codGhpcywgc2NhbGUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICAgIGNhc2UgJ2NvbHVtbic6IHtcbiAgICAgICAgaWYgKHNjYWxlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBzY2FsZSA9IGdldFNjYWxlQnlDb2x1bW4odGhpcyk7XG4gICAgICAgIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkoc2NhbGUpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignc2NhbGUgbXVzdCBiZSBhbiBhcnJheScpO1xuICAgICAgICB9XG4gICAgICAgIHNjYWxlQnlDb2x1bW4odGhpcywgc2NhbGUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICAgIGNhc2UgdW5kZWZpbmVkOiB7XG4gICAgICAgIGlmIChzY2FsZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgc2NhbGUgPSBnZXRTY2FsZUFsbCh0aGlzKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygc2NhbGUgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignc2NhbGUgbXVzdCBiZSBhIG51bWJlcicpO1xuICAgICAgICB9XG4gICAgICAgIHNjYWxlQWxsKHRoaXMsIHNjYWxlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgb3B0aW9uOiAke2J5fWApO1xuICAgIH1cbiAgfVxuXG4gIHRvU3RyaW5nKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gaW5zcGVjdE1hdHJpeFdpdGhPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuICB9XG59XG5cbkFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5rbGFzcyA9ICdNYXRyaXgnO1xuaWYgKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnKSB7XG4gIEFic3RyYWN0TWF0cml4LnByb3RvdHlwZVtcbiAgICBTeW1ib2wuZm9yKCdub2RlanMudXRpbC5pbnNwZWN0LmN1c3RvbScpXG4gIF0gPSBpbnNwZWN0TWF0cml4O1xufVxuXG5mdW5jdGlvbiBjb21wYXJlTnVtYmVycyhhLCBiKSB7XG4gIHJldHVybiBhIC0gYjtcbn1cblxuLy8gU3lub255bXNcbkFic3RyYWN0TWF0cml4LnJhbmRvbSA9IEFic3RyYWN0TWF0cml4LnJhbmQ7XG5BYnN0cmFjdE1hdHJpeC5yYW5kb21JbnQgPSBBYnN0cmFjdE1hdHJpeC5yYW5kSW50O1xuQWJzdHJhY3RNYXRyaXguZGlhZ29uYWwgPSBBYnN0cmFjdE1hdHJpeC5kaWFnO1xuQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLmRpYWdvbmFsID0gQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLmRpYWc7XG5BYnN0cmFjdE1hdHJpeC5pZGVudGl0eSA9IEFic3RyYWN0TWF0cml4LmV5ZTtcbkFic3RyYWN0TWF0cml4LnByb3RvdHlwZS5uZWdhdGUgPSBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUubmVnO1xuQWJzdHJhY3RNYXRyaXgucHJvdG90eXBlLnRlbnNvclByb2R1Y3QgPVxuICBBYnN0cmFjdE1hdHJpeC5wcm90b3R5cGUua3JvbmVja2VyUHJvZHVjdDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWF0cml4IGV4dGVuZHMgQWJzdHJhY3RNYXRyaXgge1xuICBjb25zdHJ1Y3RvcihuUm93cywgbkNvbHVtbnMpIHtcbiAgICBzdXBlcigpO1xuICAgIGlmIChNYXRyaXguaXNNYXRyaXgoblJvd3MpKSB7XG4gICAgICByZXR1cm4gblJvd3MuY2xvbmUoKTtcbiAgICB9IGVsc2UgaWYgKE51bWJlci5pc0ludGVnZXIoblJvd3MpICYmIG5Sb3dzID4gMCkge1xuICAgICAgLy8gQ3JlYXRlIGFuIGVtcHR5IG1hdHJpeFxuICAgICAgdGhpcy5kYXRhID0gW107XG4gICAgICBpZiAoTnVtYmVyLmlzSW50ZWdlcihuQ29sdW1ucykgJiYgbkNvbHVtbnMgPiAwKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgblJvd3M7IGkrKykge1xuICAgICAgICAgIHRoaXMuZGF0YS5wdXNoKG5ldyBGbG9hdDY0QXJyYXkobkNvbHVtbnMpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignbkNvbHVtbnMgbXVzdCBiZSBhIHBvc2l0aXZlIGludGVnZXInKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoblJvd3MpKSB7XG4gICAgICAvLyBDb3B5IHRoZSB2YWx1ZXMgZnJvbSB0aGUgMkQgYXJyYXlcbiAgICAgIGNvbnN0IGFycmF5RGF0YSA9IG5Sb3dzO1xuICAgICAgblJvd3MgPSBhcnJheURhdGEubGVuZ3RoO1xuICAgICAgbkNvbHVtbnMgPSBhcnJheURhdGFbMF0ubGVuZ3RoO1xuICAgICAgaWYgKHR5cGVvZiBuQ29sdW1ucyAhPT0gJ251bWJlcicgfHwgbkNvbHVtbnMgPT09IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICAnRGF0YSBtdXN0IGJlIGEgMkQgYXJyYXkgd2l0aCBhdCBsZWFzdCBvbmUgZWxlbWVudCcsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICB0aGlzLmRhdGEgPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgblJvd3M7IGkrKykge1xuICAgICAgICBpZiAoYXJyYXlEYXRhW2ldLmxlbmd0aCAhPT0gbkNvbHVtbnMpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5jb25zaXN0ZW50IGFycmF5IGRpbWVuc2lvbnMnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRhdGEucHVzaChGbG9hdDY0QXJyYXkuZnJvbShhcnJheURhdGFbaV0pKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgJ0ZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXIgb3IgYW4gYXJyYXknLFxuICAgICAgKTtcbiAgICB9XG4gICAgdGhpcy5yb3dzID0gblJvd3M7XG4gICAgdGhpcy5jb2x1bW5zID0gbkNvbHVtbnM7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzZXQocm93SW5kZXgsIGNvbHVtbkluZGV4LCB2YWx1ZSkge1xuICAgIHRoaXMuZGF0YVtyb3dJbmRleF1bY29sdW1uSW5kZXhdID0gdmFsdWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXQocm93SW5kZXgsIGNvbHVtbkluZGV4KSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YVtyb3dJbmRleF1bY29sdW1uSW5kZXhdO1xuICB9XG5cbiAgcmVtb3ZlUm93KGluZGV4KSB7XG4gICAgY2hlY2tSb3dJbmRleCh0aGlzLCBpbmRleCk7XG4gICAgaWYgKHRoaXMucm93cyA9PT0gMSkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0EgbWF0cml4IGNhbm5vdCBoYXZlIGxlc3MgdGhhbiBvbmUgcm93Jyk7XG4gICAgfVxuICAgIHRoaXMuZGF0YS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHRoaXMucm93cyAtPSAxO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgYWRkUm93KGluZGV4LCBhcnJheSkge1xuICAgIGlmIChhcnJheSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBhcnJheSA9IGluZGV4O1xuICAgICAgaW5kZXggPSB0aGlzLnJvd3M7XG4gICAgfVxuICAgIGNoZWNrUm93SW5kZXgodGhpcywgaW5kZXgsIHRydWUpO1xuICAgIGFycmF5ID0gRmxvYXQ2NEFycmF5LmZyb20oY2hlY2tSb3dWZWN0b3IodGhpcywgYXJyYXksIHRydWUpKTtcbiAgICB0aGlzLmRhdGEuc3BsaWNlKGluZGV4LCAwLCBhcnJheSk7XG4gICAgdGhpcy5yb3dzICs9IDE7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICByZW1vdmVDb2x1bW4oaW5kZXgpIHtcbiAgICBjaGVja0NvbHVtbkluZGV4KHRoaXMsIGluZGV4KTtcbiAgICBpZiAodGhpcy5jb2x1bW5zID09PSAxKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQSBtYXRyaXggY2Fubm90IGhhdmUgbGVzcyB0aGFuIG9uZSBjb2x1bW4nKTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgY29uc3QgbmV3Um93ID0gbmV3IEZsb2F0NjRBcnJheSh0aGlzLmNvbHVtbnMgLSAxKTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgaW5kZXg7IGorKykge1xuICAgICAgICBuZXdSb3dbal0gPSB0aGlzLmRhdGFbaV1bal07XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBqID0gaW5kZXggKyAxOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgbmV3Um93W2ogLSAxXSA9IHRoaXMuZGF0YVtpXVtqXTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZGF0YVtpXSA9IG5ld1JvdztcbiAgICB9XG4gICAgdGhpcy5jb2x1bW5zIC09IDE7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBhZGRDb2x1bW4oaW5kZXgsIGFycmF5KSB7XG4gICAgaWYgKHR5cGVvZiBhcnJheSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGFycmF5ID0gaW5kZXg7XG4gICAgICBpbmRleCA9IHRoaXMuY29sdW1ucztcbiAgICB9XG4gICAgY2hlY2tDb2x1bW5JbmRleCh0aGlzLCBpbmRleCwgdHJ1ZSk7XG4gICAgYXJyYXkgPSBjaGVja0NvbHVtblZlY3Rvcih0aGlzLCBhcnJheSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgY29uc3QgbmV3Um93ID0gbmV3IEZsb2F0NjRBcnJheSh0aGlzLmNvbHVtbnMgKyAxKTtcbiAgICAgIGxldCBqID0gMDtcbiAgICAgIGZvciAoOyBqIDwgaW5kZXg7IGorKykge1xuICAgICAgICBuZXdSb3dbal0gPSB0aGlzLmRhdGFbaV1bal07XG4gICAgICB9XG4gICAgICBuZXdSb3dbaisrXSA9IGFycmF5W2ldO1xuICAgICAgZm9yICg7IGogPCB0aGlzLmNvbHVtbnMgKyAxOyBqKyspIHtcbiAgICAgICAgbmV3Um93W2pdID0gdGhpcy5kYXRhW2ldW2ogLSAxXTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZGF0YVtpXSA9IG5ld1JvdztcbiAgICB9XG4gICAgdGhpcy5jb2x1bW5zICs9IDE7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuaW5zdGFsbE1hdGhPcGVyYXRpb25zKEFic3RyYWN0TWF0cml4LCBNYXRyaXgpO1xuIiwiaW1wb3J0IFNWRCBmcm9tICcuL2RjL3N2ZCc7XG5pbXBvcnQgTWF0cml4IGZyb20gJy4vbWF0cml4JztcblxuZXhwb3J0IGZ1bmN0aW9uIHBzZXVkb0ludmVyc2UobWF0cml4LCB0aHJlc2hvbGQgPSBOdW1iZXIuRVBTSUxPTikge1xuICBtYXRyaXggPSBNYXRyaXguY2hlY2tNYXRyaXgobWF0cml4KTtcbiAgbGV0IHN2ZFNvbHV0aW9uID0gbmV3IFNWRChtYXRyaXgsIHsgYXV0b1RyYW5zcG9zZTogdHJ1ZSB9KTtcblxuICBsZXQgVSA9IHN2ZFNvbHV0aW9uLmxlZnRTaW5ndWxhclZlY3RvcnM7XG4gIGxldCBWID0gc3ZkU29sdXRpb24ucmlnaHRTaW5ndWxhclZlY3RvcnM7XG4gIGxldCBzID0gc3ZkU29sdXRpb24uZGlhZ29uYWw7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKE1hdGguYWJzKHNbaV0pID4gdGhyZXNob2xkKSB7XG4gICAgICBzW2ldID0gMS4wIC8gc1tpXTtcbiAgICB9IGVsc2Uge1xuICAgICAgc1tpXSA9IDAuMDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gVi5tbXVsKE1hdHJpeC5kaWFnKHMpLm1tdWwoVS50cmFuc3Bvc2UoKSkpO1xufVxuIiwiaW1wb3J0IHsgbmV3QXJyYXkgfSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgZnVuY3Rpb24gc3VtQnlSb3cobWF0cml4KSB7XG4gIGxldCBzdW0gPSBuZXdBcnJheShtYXRyaXgucm93cyk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbWF0cml4LnJvd3M7ICsraSkge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgbWF0cml4LmNvbHVtbnM7ICsraikge1xuICAgICAgc3VtW2ldICs9IG1hdHJpeC5nZXQoaSwgaik7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdW07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdW1CeUNvbHVtbihtYXRyaXgpIHtcbiAgbGV0IHN1bSA9IG5ld0FycmF5KG1hdHJpeC5jb2x1bW5zKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXRyaXgucm93czsgKytpKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBtYXRyaXguY29sdW1uczsgKytqKSB7XG4gICAgICBzdW1bal0gKz0gbWF0cml4LmdldChpLCBqKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN1bTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN1bUFsbChtYXRyaXgpIHtcbiAgbGV0IHYgPSAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG1hdHJpeC5yb3dzOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IG1hdHJpeC5jb2x1bW5zOyBqKyspIHtcbiAgICAgIHYgKz0gbWF0cml4LmdldChpLCBqKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHY7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9kdWN0QnlSb3cobWF0cml4KSB7XG4gIGxldCBzdW0gPSBuZXdBcnJheShtYXRyaXgucm93cywgMSk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbWF0cml4LnJvd3M7ICsraSkge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgbWF0cml4LmNvbHVtbnM7ICsraikge1xuICAgICAgc3VtW2ldICo9IG1hdHJpeC5nZXQoaSwgaik7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdW07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9kdWN0QnlDb2x1bW4obWF0cml4KSB7XG4gIGxldCBzdW0gPSBuZXdBcnJheShtYXRyaXguY29sdW1ucywgMSk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbWF0cml4LnJvd3M7ICsraSkge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgbWF0cml4LmNvbHVtbnM7ICsraikge1xuICAgICAgc3VtW2pdICo9IG1hdHJpeC5nZXQoaSwgaik7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdW07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9kdWN0QWxsKG1hdHJpeCkge1xuICBsZXQgdiA9IDE7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbWF0cml4LnJvd3M7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgbWF0cml4LmNvbHVtbnM7IGorKykge1xuICAgICAgdiAqPSBtYXRyaXguZ2V0KGksIGopO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZhcmlhbmNlQnlSb3cobWF0cml4LCB1bmJpYXNlZCwgbWVhbikge1xuICBjb25zdCByb3dzID0gbWF0cml4LnJvd3M7XG4gIGNvbnN0IGNvbHMgPSBtYXRyaXguY29sdW1ucztcbiAgY29uc3QgdmFyaWFuY2UgPSBbXTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHJvd3M7IGkrKykge1xuICAgIGxldCBzdW0xID0gMDtcbiAgICBsZXQgc3VtMiA9IDA7XG4gICAgbGV0IHggPSAwO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sczsgaisrKSB7XG4gICAgICB4ID0gbWF0cml4LmdldChpLCBqKSAtIG1lYW5baV07XG4gICAgICBzdW0xICs9IHg7XG4gICAgICBzdW0yICs9IHggKiB4O1xuICAgIH1cbiAgICBpZiAodW5iaWFzZWQpIHtcbiAgICAgIHZhcmlhbmNlLnB1c2goKHN1bTIgLSAoc3VtMSAqIHN1bTEpIC8gY29scykgLyAoY29scyAtIDEpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyaWFuY2UucHVzaCgoc3VtMiAtIChzdW0xICogc3VtMSkgLyBjb2xzKSAvIGNvbHMpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdmFyaWFuY2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2YXJpYW5jZUJ5Q29sdW1uKG1hdHJpeCwgdW5iaWFzZWQsIG1lYW4pIHtcbiAgY29uc3Qgcm93cyA9IG1hdHJpeC5yb3dzO1xuICBjb25zdCBjb2xzID0gbWF0cml4LmNvbHVtbnM7XG4gIGNvbnN0IHZhcmlhbmNlID0gW107XG5cbiAgZm9yIChsZXQgaiA9IDA7IGogPCBjb2xzOyBqKyspIHtcbiAgICBsZXQgc3VtMSA9IDA7XG4gICAgbGV0IHN1bTIgPSAwO1xuICAgIGxldCB4ID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvd3M7IGkrKykge1xuICAgICAgeCA9IG1hdHJpeC5nZXQoaSwgaikgLSBtZWFuW2pdO1xuICAgICAgc3VtMSArPSB4O1xuICAgICAgc3VtMiArPSB4ICogeDtcbiAgICB9XG4gICAgaWYgKHVuYmlhc2VkKSB7XG4gICAgICB2YXJpYW5jZS5wdXNoKChzdW0yIC0gKHN1bTEgKiBzdW0xKSAvIHJvd3MpIC8gKHJvd3MgLSAxKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhcmlhbmNlLnB1c2goKHN1bTIgLSAoc3VtMSAqIHN1bTEpIC8gcm93cykgLyByb3dzKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHZhcmlhbmNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdmFyaWFuY2VBbGwobWF0cml4LCB1bmJpYXNlZCwgbWVhbikge1xuICBjb25zdCByb3dzID0gbWF0cml4LnJvd3M7XG4gIGNvbnN0IGNvbHMgPSBtYXRyaXguY29sdW1ucztcbiAgY29uc3Qgc2l6ZSA9IHJvd3MgKiBjb2xzO1xuXG4gIGxldCBzdW0xID0gMDtcbiAgbGV0IHN1bTIgPSAwO1xuICBsZXQgeCA9IDA7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcm93czsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBjb2xzOyBqKyspIHtcbiAgICAgIHggPSBtYXRyaXguZ2V0KGksIGopIC0gbWVhbjtcbiAgICAgIHN1bTEgKz0geDtcbiAgICAgIHN1bTIgKz0geCAqIHg7XG4gICAgfVxuICB9XG4gIGlmICh1bmJpYXNlZCkge1xuICAgIHJldHVybiAoc3VtMiAtIChzdW0xICogc3VtMSkgLyBzaXplKSAvIChzaXplIC0gMSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIChzdW0yIC0gKHN1bTEgKiBzdW0xKSAvIHNpemUpIC8gc2l6ZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2VudGVyQnlSb3cobWF0cml4LCBtZWFuKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbWF0cml4LnJvd3M7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgbWF0cml4LmNvbHVtbnM7IGorKykge1xuICAgICAgbWF0cml4LnNldChpLCBqLCBtYXRyaXguZ2V0KGksIGopIC0gbWVhbltpXSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjZW50ZXJCeUNvbHVtbihtYXRyaXgsIG1lYW4pIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXRyaXgucm93czsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBtYXRyaXguY29sdW1uczsgaisrKSB7XG4gICAgICBtYXRyaXguc2V0KGksIGosIG1hdHJpeC5nZXQoaSwgaikgLSBtZWFuW2pdKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNlbnRlckFsbChtYXRyaXgsIG1lYW4pIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXRyaXgucm93czsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBtYXRyaXguY29sdW1uczsgaisrKSB7XG4gICAgICBtYXRyaXguc2V0KGksIGosIG1hdHJpeC5nZXQoaSwgaikgLSBtZWFuKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjYWxlQnlSb3cobWF0cml4KSB7XG4gIGNvbnN0IHNjYWxlID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbWF0cml4LnJvd3M7IGkrKykge1xuICAgIGxldCBzdW0gPSAwO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgbWF0cml4LmNvbHVtbnM7IGorKykge1xuICAgICAgc3VtICs9IE1hdGgucG93KG1hdHJpeC5nZXQoaSwgaiksIDIpIC8gKG1hdHJpeC5jb2x1bW5zIC0gMSk7XG4gICAgfVxuICAgIHNjYWxlLnB1c2goTWF0aC5zcXJ0KHN1bSkpO1xuICB9XG4gIHJldHVybiBzY2FsZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNjYWxlQnlSb3cobWF0cml4LCBzY2FsZSkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG1hdHJpeC5yb3dzOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IG1hdHJpeC5jb2x1bW5zOyBqKyspIHtcbiAgICAgIG1hdHJpeC5zZXQoaSwgaiwgbWF0cml4LmdldChpLCBqKSAvIHNjYWxlW2ldKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjYWxlQnlDb2x1bW4obWF0cml4KSB7XG4gIGNvbnN0IHNjYWxlID0gW107XG4gIGZvciAobGV0IGogPSAwOyBqIDwgbWF0cml4LmNvbHVtbnM7IGorKykge1xuICAgIGxldCBzdW0gPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWF0cml4LnJvd3M7IGkrKykge1xuICAgICAgc3VtICs9IE1hdGgucG93KG1hdHJpeC5nZXQoaSwgaiksIDIpIC8gKG1hdHJpeC5yb3dzIC0gMSk7XG4gICAgfVxuICAgIHNjYWxlLnB1c2goTWF0aC5zcXJ0KHN1bSkpO1xuICB9XG4gIHJldHVybiBzY2FsZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNjYWxlQnlDb2x1bW4obWF0cml4LCBzY2FsZSkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG1hdHJpeC5yb3dzOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IG1hdHJpeC5jb2x1bW5zOyBqKyspIHtcbiAgICAgIG1hdHJpeC5zZXQoaSwgaiwgbWF0cml4LmdldChpLCBqKSAvIHNjYWxlW2pdKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjYWxlQWxsKG1hdHJpeCkge1xuICBjb25zdCBkaXZpZGVyID0gbWF0cml4LnNpemUgLSAxO1xuICBsZXQgc3VtID0gMDtcbiAgZm9yIChsZXQgaiA9IDA7IGogPCBtYXRyaXguY29sdW1uczsgaisrKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXRyaXgucm93czsgaSsrKSB7XG4gICAgICBzdW0gKz0gTWF0aC5wb3cobWF0cml4LmdldChpLCBqKSwgMikgLyBkaXZpZGVyO1xuICAgIH1cbiAgfVxuICByZXR1cm4gTWF0aC5zcXJ0KHN1bSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzY2FsZUFsbChtYXRyaXgsIHNjYWxlKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbWF0cml4LnJvd3M7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgbWF0cml4LmNvbHVtbnM7IGorKykge1xuICAgICAgbWF0cml4LnNldChpLCBqLCBtYXRyaXguZ2V0KGksIGopIC8gc2NhbGUpO1xuICAgIH1cbiAgfVxufVxuIiwiLyoqXG4gKiBAcHJpdmF0ZVxuICogQ2hlY2sgdGhhdCBhIHJvdyBpbmRleCBpcyBub3Qgb3V0IG9mIGJvdW5kc1xuICogQHBhcmFtIHtNYXRyaXh9IG1hdHJpeFxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvdXRlcl1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrUm93SW5kZXgobWF0cml4LCBpbmRleCwgb3V0ZXIpIHtcbiAgbGV0IG1heCA9IG91dGVyID8gbWF0cml4LnJvd3MgOiBtYXRyaXgucm93cyAtIDE7XG4gIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPiBtYXgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignUm93IGluZGV4IG91dCBvZiByYW5nZScpO1xuICB9XG59XG5cbi8qKlxuICogQHByaXZhdGVcbiAqIENoZWNrIHRoYXQgYSBjb2x1bW4gaW5kZXggaXMgbm90IG91dCBvZiBib3VuZHNcbiAqIEBwYXJhbSB7TWF0cml4fSBtYXRyaXhcbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICogQHBhcmFtIHtib29sZWFufSBbb3V0ZXJdXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjaGVja0NvbHVtbkluZGV4KG1hdHJpeCwgaW5kZXgsIG91dGVyKSB7XG4gIGxldCBtYXggPSBvdXRlciA/IG1hdHJpeC5jb2x1bW5zIDogbWF0cml4LmNvbHVtbnMgLSAxO1xuICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID4gbWF4KSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0NvbHVtbiBpbmRleCBvdXQgb2YgcmFuZ2UnKTtcbiAgfVxufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKiBDaGVjayB0aGF0IHRoZSBwcm92aWRlZCB2ZWN0b3IgaXMgYW4gYXJyYXkgd2l0aCB0aGUgcmlnaHQgbGVuZ3RoXG4gKiBAcGFyYW0ge01hdHJpeH0gbWF0cml4XG4gKiBAcGFyYW0ge0FycmF5fE1hdHJpeH0gdmVjdG9yXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEB0aHJvd3Mge1JhbmdlRXJyb3J9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjaGVja1Jvd1ZlY3RvcihtYXRyaXgsIHZlY3Rvcikge1xuICBpZiAodmVjdG9yLnRvMURBcnJheSkge1xuICAgIHZlY3RvciA9IHZlY3Rvci50bzFEQXJyYXkoKTtcbiAgfVxuICBpZiAodmVjdG9yLmxlbmd0aCAhPT0gbWF0cml4LmNvbHVtbnMpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcbiAgICAgICd2ZWN0b3Igc2l6ZSBtdXN0IGJlIHRoZSBzYW1lIGFzIHRoZSBudW1iZXIgb2YgY29sdW1ucycsXG4gICAgKTtcbiAgfVxuICByZXR1cm4gdmVjdG9yO1xufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKiBDaGVjayB0aGF0IHRoZSBwcm92aWRlZCB2ZWN0b3IgaXMgYW4gYXJyYXkgd2l0aCB0aGUgcmlnaHQgbGVuZ3RoXG4gKiBAcGFyYW0ge01hdHJpeH0gbWF0cml4XG4gKiBAcGFyYW0ge0FycmF5fE1hdHJpeH0gdmVjdG9yXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEB0aHJvd3Mge1JhbmdlRXJyb3J9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjaGVja0NvbHVtblZlY3RvcihtYXRyaXgsIHZlY3Rvcikge1xuICBpZiAodmVjdG9yLnRvMURBcnJheSkge1xuICAgIHZlY3RvciA9IHZlY3Rvci50bzFEQXJyYXkoKTtcbiAgfVxuICBpZiAodmVjdG9yLmxlbmd0aCAhPT0gbWF0cml4LnJvd3MpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcigndmVjdG9yIHNpemUgbXVzdCBiZSB0aGUgc2FtZSBhcyB0aGUgbnVtYmVyIG9mIHJvd3MnKTtcbiAgfVxuICByZXR1cm4gdmVjdG9yO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tJbmRpY2VzKG1hdHJpeCwgcm93SW5kaWNlcywgY29sdW1uSW5kaWNlcykge1xuICByZXR1cm4ge1xuICAgIHJvdzogY2hlY2tSb3dJbmRpY2VzKG1hdHJpeCwgcm93SW5kaWNlcyksXG4gICAgY29sdW1uOiBjaGVja0NvbHVtbkluZGljZXMobWF0cml4LCBjb2x1bW5JbmRpY2VzKSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrUm93SW5kaWNlcyhtYXRyaXgsIHJvd0luZGljZXMpIHtcbiAgaWYgKHR5cGVvZiByb3dJbmRpY2VzICE9PSAnb2JqZWN0Jykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3VuZXhwZWN0ZWQgdHlwZSBmb3Igcm93IGluZGljZXMnKTtcbiAgfVxuXG4gIGxldCByb3dPdXQgPSByb3dJbmRpY2VzLnNvbWUoKHIpID0+IHtcbiAgICByZXR1cm4gciA8IDAgfHwgciA+PSBtYXRyaXgucm93cztcbiAgfSk7XG5cbiAgaWYgKHJvd091dCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdyb3cgaW5kaWNlcyBhcmUgb3V0IG9mIHJhbmdlJyk7XG4gIH1cblxuICBpZiAoIUFycmF5LmlzQXJyYXkocm93SW5kaWNlcykpIHJvd0luZGljZXMgPSBBcnJheS5mcm9tKHJvd0luZGljZXMpO1xuXG4gIHJldHVybiByb3dJbmRpY2VzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tDb2x1bW5JbmRpY2VzKG1hdHJpeCwgY29sdW1uSW5kaWNlcykge1xuICBpZiAodHlwZW9mIGNvbHVtbkluZGljZXMgIT09ICdvYmplY3QnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigndW5leHBlY3RlZCB0eXBlIGZvciBjb2x1bW4gaW5kaWNlcycpO1xuICB9XG5cbiAgbGV0IGNvbHVtbk91dCA9IGNvbHVtbkluZGljZXMuc29tZSgoYykgPT4ge1xuICAgIHJldHVybiBjIDwgMCB8fCBjID49IG1hdHJpeC5jb2x1bW5zO1xuICB9KTtcblxuICBpZiAoY29sdW1uT3V0KSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ2NvbHVtbiBpbmRpY2VzIGFyZSBvdXQgb2YgcmFuZ2UnKTtcbiAgfVxuICBpZiAoIUFycmF5LmlzQXJyYXkoY29sdW1uSW5kaWNlcykpIGNvbHVtbkluZGljZXMgPSBBcnJheS5mcm9tKGNvbHVtbkluZGljZXMpO1xuXG4gIHJldHVybiBjb2x1bW5JbmRpY2VzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tSYW5nZShtYXRyaXgsIHN0YXJ0Um93LCBlbmRSb3csIHN0YXJ0Q29sdW1uLCBlbmRDb2x1bW4pIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggIT09IDUpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignZXhwZWN0ZWQgNCBhcmd1bWVudHMnKTtcbiAgfVxuICBjaGVja051bWJlcignc3RhcnRSb3cnLCBzdGFydFJvdyk7XG4gIGNoZWNrTnVtYmVyKCdlbmRSb3cnLCBlbmRSb3cpO1xuICBjaGVja051bWJlcignc3RhcnRDb2x1bW4nLCBzdGFydENvbHVtbik7XG4gIGNoZWNrTnVtYmVyKCdlbmRDb2x1bW4nLCBlbmRDb2x1bW4pO1xuICBpZiAoXG4gICAgc3RhcnRSb3cgPiBlbmRSb3cgfHxcbiAgICBzdGFydENvbHVtbiA+IGVuZENvbHVtbiB8fFxuICAgIHN0YXJ0Um93IDwgMCB8fFxuICAgIHN0YXJ0Um93ID49IG1hdHJpeC5yb3dzIHx8XG4gICAgZW5kUm93IDwgMCB8fFxuICAgIGVuZFJvdyA+PSBtYXRyaXgucm93cyB8fFxuICAgIHN0YXJ0Q29sdW1uIDwgMCB8fFxuICAgIHN0YXJ0Q29sdW1uID49IG1hdHJpeC5jb2x1bW5zIHx8XG4gICAgZW5kQ29sdW1uIDwgMCB8fFxuICAgIGVuZENvbHVtbiA+PSBtYXRyaXguY29sdW1uc1xuICApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignU3VibWF0cml4IGluZGljZXMgYXJlIG91dCBvZiByYW5nZScpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBuZXdBcnJheShsZW5ndGgsIHZhbHVlID0gMCkge1xuICBsZXQgYXJyYXkgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGFycmF5LnB1c2godmFsdWUpO1xuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxuZnVuY3Rpb24gY2hlY2tOdW1iZXIobmFtZSwgdmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke25hbWV9IG11c3QgYmUgYSBudW1iZXJgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQWJzdHJhY3RNYXRyaXggfSBmcm9tICcuLi9tYXRyaXgnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlVmlldyBleHRlbmRzIEFic3RyYWN0TWF0cml4IHtcbiAgY29uc3RydWN0b3IobWF0cml4LCByb3dzLCBjb2x1bW5zKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLm1hdHJpeCA9IG1hdHJpeDtcbiAgICB0aGlzLnJvd3MgPSByb3dzO1xuICAgIHRoaXMuY29sdW1ucyA9IGNvbHVtbnM7XG4gIH1cbn1cbiIsImltcG9ydCB7IGNoZWNrQ29sdW1uSW5kZXggfSBmcm9tICcuLi91dGlsJztcblxuaW1wb3J0IEJhc2VWaWV3IGZyb20gJy4vYmFzZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hdHJpeENvbHVtblZpZXcgZXh0ZW5kcyBCYXNlVmlldyB7XG4gIGNvbnN0cnVjdG9yKG1hdHJpeCwgY29sdW1uKSB7XG4gICAgY2hlY2tDb2x1bW5JbmRleChtYXRyaXgsIGNvbHVtbik7XG4gICAgc3VwZXIobWF0cml4LCBtYXRyaXgucm93cywgMSk7XG4gICAgdGhpcy5jb2x1bW4gPSBjb2x1bW47XG4gIH1cblxuICBzZXQocm93SW5kZXgsIGNvbHVtbkluZGV4LCB2YWx1ZSkge1xuICAgIHRoaXMubWF0cml4LnNldChyb3dJbmRleCwgdGhpcy5jb2x1bW4sIHZhbHVlKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldChyb3dJbmRleCkge1xuICAgIHJldHVybiB0aGlzLm1hdHJpeC5nZXQocm93SW5kZXgsIHRoaXMuY29sdW1uKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgY2hlY2tDb2x1bW5JbmRpY2VzIH0gZnJvbSAnLi4vdXRpbCc7XG5cbmltcG9ydCBCYXNlVmlldyBmcm9tICcuL2Jhc2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXRyaXhDb2x1bW5TZWxlY3Rpb25WaWV3IGV4dGVuZHMgQmFzZVZpZXcge1xuICBjb25zdHJ1Y3RvcihtYXRyaXgsIGNvbHVtbkluZGljZXMpIHtcbiAgICBjb2x1bW5JbmRpY2VzID0gY2hlY2tDb2x1bW5JbmRpY2VzKG1hdHJpeCwgY29sdW1uSW5kaWNlcyk7XG4gICAgc3VwZXIobWF0cml4LCBtYXRyaXgucm93cywgY29sdW1uSW5kaWNlcy5sZW5ndGgpO1xuICAgIHRoaXMuY29sdW1uSW5kaWNlcyA9IGNvbHVtbkluZGljZXM7XG4gIH1cblxuICBzZXQocm93SW5kZXgsIGNvbHVtbkluZGV4LCB2YWx1ZSkge1xuICAgIHRoaXMubWF0cml4LnNldChyb3dJbmRleCwgdGhpcy5jb2x1bW5JbmRpY2VzW2NvbHVtbkluZGV4XSwgdmFsdWUpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0KHJvd0luZGV4LCBjb2x1bW5JbmRleCkge1xuICAgIHJldHVybiB0aGlzLm1hdHJpeC5nZXQocm93SW5kZXgsIHRoaXMuY29sdW1uSW5kaWNlc1tjb2x1bW5JbmRleF0pO1xuICB9XG59XG4iLCJpbXBvcnQgQmFzZVZpZXcgZnJvbSAnLi9iYXNlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWF0cml4RmxpcENvbHVtblZpZXcgZXh0ZW5kcyBCYXNlVmlldyB7XG4gIGNvbnN0cnVjdG9yKG1hdHJpeCkge1xuICAgIHN1cGVyKG1hdHJpeCwgbWF0cml4LnJvd3MsIG1hdHJpeC5jb2x1bW5zKTtcbiAgfVxuXG4gIHNldChyb3dJbmRleCwgY29sdW1uSW5kZXgsIHZhbHVlKSB7XG4gICAgdGhpcy5tYXRyaXguc2V0KHJvd0luZGV4LCB0aGlzLmNvbHVtbnMgLSBjb2x1bW5JbmRleCAtIDEsIHZhbHVlKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldChyb3dJbmRleCwgY29sdW1uSW5kZXgpIHtcbiAgICByZXR1cm4gdGhpcy5tYXRyaXguZ2V0KHJvd0luZGV4LCB0aGlzLmNvbHVtbnMgLSBjb2x1bW5JbmRleCAtIDEpO1xuICB9XG59XG4iLCJpbXBvcnQgQmFzZVZpZXcgZnJvbSAnLi9iYXNlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWF0cml4RmxpcFJvd1ZpZXcgZXh0ZW5kcyBCYXNlVmlldyB7XG4gIGNvbnN0cnVjdG9yKG1hdHJpeCkge1xuICAgIHN1cGVyKG1hdHJpeCwgbWF0cml4LnJvd3MsIG1hdHJpeC5jb2x1bW5zKTtcbiAgfVxuXG4gIHNldChyb3dJbmRleCwgY29sdW1uSW5kZXgsIHZhbHVlKSB7XG4gICAgdGhpcy5tYXRyaXguc2V0KHRoaXMucm93cyAtIHJvd0luZGV4IC0gMSwgY29sdW1uSW5kZXgsIHZhbHVlKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldChyb3dJbmRleCwgY29sdW1uSW5kZXgpIHtcbiAgICByZXR1cm4gdGhpcy5tYXRyaXguZ2V0KHRoaXMucm93cyAtIHJvd0luZGV4IC0gMSwgY29sdW1uSW5kZXgpO1xuICB9XG59XG4iLCJleHBvcnQgeyBkZWZhdWx0IGFzIE1hdHJpeENvbHVtblZpZXcgfSBmcm9tICcuL2NvbHVtbic7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE1hdHJpeENvbHVtblNlbGVjdGlvblZpZXcgfSBmcm9tICcuL2NvbHVtblNlbGVjdGlvbic7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE1hdHJpeEZsaXBDb2x1bW5WaWV3IH0gZnJvbSAnLi9mbGlwQ29sdW1uJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTWF0cml4RmxpcFJvd1ZpZXcgfSBmcm9tICcuL2ZsaXBSb3cnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBNYXRyaXhSb3dWaWV3IH0gZnJvbSAnLi9yb3cnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBNYXRyaXhSb3dTZWxlY3Rpb25WaWV3IH0gZnJvbSAnLi9yb3dTZWxlY3Rpb24nO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBNYXRyaXhTZWxlY3Rpb25WaWV3IH0gZnJvbSAnLi9zZWxlY3Rpb24nO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBNYXRyaXhTdWJWaWV3IH0gZnJvbSAnLi9zdWInO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBNYXRyaXhUcmFuc3Bvc2VWaWV3IH0gZnJvbSAnLi90cmFuc3Bvc2UnO1xuIiwiaW1wb3J0IHsgY2hlY2tSb3dJbmRleCB9IGZyb20gJy4uL3V0aWwnO1xuXG5pbXBvcnQgQmFzZVZpZXcgZnJvbSAnLi9iYXNlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWF0cml4Um93VmlldyBleHRlbmRzIEJhc2VWaWV3IHtcbiAgY29uc3RydWN0b3IobWF0cml4LCByb3cpIHtcbiAgICBjaGVja1Jvd0luZGV4KG1hdHJpeCwgcm93KTtcbiAgICBzdXBlcihtYXRyaXgsIDEsIG1hdHJpeC5jb2x1bW5zKTtcbiAgICB0aGlzLnJvdyA9IHJvdztcbiAgfVxuXG4gIHNldChyb3dJbmRleCwgY29sdW1uSW5kZXgsIHZhbHVlKSB7XG4gICAgdGhpcy5tYXRyaXguc2V0KHRoaXMucm93LCBjb2x1bW5JbmRleCwgdmFsdWUpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0KHJvd0luZGV4LCBjb2x1bW5JbmRleCkge1xuICAgIHJldHVybiB0aGlzLm1hdHJpeC5nZXQodGhpcy5yb3csIGNvbHVtbkluZGV4KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgY2hlY2tSb3dJbmRpY2VzIH0gZnJvbSAnLi4vdXRpbCc7XG5cbmltcG9ydCBCYXNlVmlldyBmcm9tICcuL2Jhc2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXRyaXhSb3dTZWxlY3Rpb25WaWV3IGV4dGVuZHMgQmFzZVZpZXcge1xuICBjb25zdHJ1Y3RvcihtYXRyaXgsIHJvd0luZGljZXMpIHtcbiAgICByb3dJbmRpY2VzID0gY2hlY2tSb3dJbmRpY2VzKG1hdHJpeCwgcm93SW5kaWNlcyk7XG4gICAgc3VwZXIobWF0cml4LCByb3dJbmRpY2VzLmxlbmd0aCwgbWF0cml4LmNvbHVtbnMpO1xuICAgIHRoaXMucm93SW5kaWNlcyA9IHJvd0luZGljZXM7XG4gIH1cblxuICBzZXQocm93SW5kZXgsIGNvbHVtbkluZGV4LCB2YWx1ZSkge1xuICAgIHRoaXMubWF0cml4LnNldCh0aGlzLnJvd0luZGljZXNbcm93SW5kZXhdLCBjb2x1bW5JbmRleCwgdmFsdWUpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0KHJvd0luZGV4LCBjb2x1bW5JbmRleCkge1xuICAgIHJldHVybiB0aGlzLm1hdHJpeC5nZXQodGhpcy5yb3dJbmRpY2VzW3Jvd0luZGV4XSwgY29sdW1uSW5kZXgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBjaGVja0luZGljZXMgfSBmcm9tICcuLi91dGlsJztcblxuaW1wb3J0IEJhc2VWaWV3IGZyb20gJy4vYmFzZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hdHJpeFNlbGVjdGlvblZpZXcgZXh0ZW5kcyBCYXNlVmlldyB7XG4gIGNvbnN0cnVjdG9yKG1hdHJpeCwgcm93SW5kaWNlcywgY29sdW1uSW5kaWNlcykge1xuICAgIGxldCBpbmRpY2VzID0gY2hlY2tJbmRpY2VzKG1hdHJpeCwgcm93SW5kaWNlcywgY29sdW1uSW5kaWNlcyk7XG4gICAgc3VwZXIobWF0cml4LCBpbmRpY2VzLnJvdy5sZW5ndGgsIGluZGljZXMuY29sdW1uLmxlbmd0aCk7XG4gICAgdGhpcy5yb3dJbmRpY2VzID0gaW5kaWNlcy5yb3c7XG4gICAgdGhpcy5jb2x1bW5JbmRpY2VzID0gaW5kaWNlcy5jb2x1bW47XG4gIH1cblxuICBzZXQocm93SW5kZXgsIGNvbHVtbkluZGV4LCB2YWx1ZSkge1xuICAgIHRoaXMubWF0cml4LnNldChcbiAgICAgIHRoaXMucm93SW5kaWNlc1tyb3dJbmRleF0sXG4gICAgICB0aGlzLmNvbHVtbkluZGljZXNbY29sdW1uSW5kZXhdLFxuICAgICAgdmFsdWUsXG4gICAgKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldChyb3dJbmRleCwgY29sdW1uSW5kZXgpIHtcbiAgICByZXR1cm4gdGhpcy5tYXRyaXguZ2V0KFxuICAgICAgdGhpcy5yb3dJbmRpY2VzW3Jvd0luZGV4XSxcbiAgICAgIHRoaXMuY29sdW1uSW5kaWNlc1tjb2x1bW5JbmRleF0sXG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgY2hlY2tSYW5nZSB9IGZyb20gJy4uL3V0aWwnO1xuXG5pbXBvcnQgQmFzZVZpZXcgZnJvbSAnLi9iYXNlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWF0cml4U3ViVmlldyBleHRlbmRzIEJhc2VWaWV3IHtcbiAgY29uc3RydWN0b3IobWF0cml4LCBzdGFydFJvdywgZW5kUm93LCBzdGFydENvbHVtbiwgZW5kQ29sdW1uKSB7XG4gICAgY2hlY2tSYW5nZShtYXRyaXgsIHN0YXJ0Um93LCBlbmRSb3csIHN0YXJ0Q29sdW1uLCBlbmRDb2x1bW4pO1xuICAgIHN1cGVyKG1hdHJpeCwgZW5kUm93IC0gc3RhcnRSb3cgKyAxLCBlbmRDb2x1bW4gLSBzdGFydENvbHVtbiArIDEpO1xuICAgIHRoaXMuc3RhcnRSb3cgPSBzdGFydFJvdztcbiAgICB0aGlzLnN0YXJ0Q29sdW1uID0gc3RhcnRDb2x1bW47XG4gIH1cblxuICBzZXQocm93SW5kZXgsIGNvbHVtbkluZGV4LCB2YWx1ZSkge1xuICAgIHRoaXMubWF0cml4LnNldChcbiAgICAgIHRoaXMuc3RhcnRSb3cgKyByb3dJbmRleCxcbiAgICAgIHRoaXMuc3RhcnRDb2x1bW4gKyBjb2x1bW5JbmRleCxcbiAgICAgIHZhbHVlLFxuICAgICk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXQocm93SW5kZXgsIGNvbHVtbkluZGV4KSB7XG4gICAgcmV0dXJuIHRoaXMubWF0cml4LmdldChcbiAgICAgIHRoaXMuc3RhcnRSb3cgKyByb3dJbmRleCxcbiAgICAgIHRoaXMuc3RhcnRDb2x1bW4gKyBjb2x1bW5JbmRleCxcbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgQmFzZVZpZXcgZnJvbSAnLi9iYXNlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWF0cml4VHJhbnNwb3NlVmlldyBleHRlbmRzIEJhc2VWaWV3IHtcbiAgY29uc3RydWN0b3IobWF0cml4KSB7XG4gICAgc3VwZXIobWF0cml4LCBtYXRyaXguY29sdW1ucywgbWF0cml4LnJvd3MpO1xuICB9XG5cbiAgc2V0KHJvd0luZGV4LCBjb2x1bW5JbmRleCwgdmFsdWUpIHtcbiAgICB0aGlzLm1hdHJpeC5zZXQoY29sdW1uSW5kZXgsIHJvd0luZGV4LCB2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXQocm93SW5kZXgsIGNvbHVtbkluZGV4KSB7XG4gICAgcmV0dXJuIHRoaXMubWF0cml4LmdldChjb2x1bW5JbmRleCwgcm93SW5kZXgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBBYnN0cmFjdE1hdHJpeCB9IGZyb20gJy4uL21hdHJpeCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdyYXBwZXJNYXRyaXgxRCBleHRlbmRzIEFic3RyYWN0TWF0cml4IHtcbiAgY29uc3RydWN0b3IoZGF0YSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgeyByb3dzID0gMSB9ID0gb3B0aW9ucztcblxuICAgIGlmIChkYXRhLmxlbmd0aCAlIHJvd3MgIT09IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigndGhlIGRhdGEgbGVuZ3RoIGlzIG5vdCBkaXZpc2libGUgYnkgdGhlIG51bWJlciBvZiByb3dzJyk7XG4gICAgfVxuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5yb3dzID0gcm93cztcbiAgICB0aGlzLmNvbHVtbnMgPSBkYXRhLmxlbmd0aCAvIHJvd3M7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgfVxuXG4gIHNldChyb3dJbmRleCwgY29sdW1uSW5kZXgsIHZhbHVlKSB7XG4gICAgbGV0IGluZGV4ID0gdGhpcy5fY2FsY3VsYXRlSW5kZXgocm93SW5kZXgsIGNvbHVtbkluZGV4KTtcbiAgICB0aGlzLmRhdGFbaW5kZXhdID0gdmFsdWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXQocm93SW5kZXgsIGNvbHVtbkluZGV4KSB7XG4gICAgbGV0IGluZGV4ID0gdGhpcy5fY2FsY3VsYXRlSW5kZXgocm93SW5kZXgsIGNvbHVtbkluZGV4KTtcbiAgICByZXR1cm4gdGhpcy5kYXRhW2luZGV4XTtcbiAgfVxuXG4gIF9jYWxjdWxhdGVJbmRleChyb3csIGNvbHVtbikge1xuICAgIHJldHVybiByb3cgKiB0aGlzLmNvbHVtbnMgKyBjb2x1bW47XG4gIH1cbn1cbiIsImltcG9ydCB7IEFic3RyYWN0TWF0cml4IH0gZnJvbSAnLi4vbWF0cml4JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV3JhcHBlck1hdHJpeDJEIGV4dGVuZHMgQWJzdHJhY3RNYXRyaXgge1xuICBjb25zdHJ1Y3RvcihkYXRhKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIHRoaXMucm93cyA9IGRhdGEubGVuZ3RoO1xuICAgIHRoaXMuY29sdW1ucyA9IGRhdGFbMF0ubGVuZ3RoO1xuICB9XG5cbiAgc2V0KHJvd0luZGV4LCBjb2x1bW5JbmRleCwgdmFsdWUpIHtcbiAgICB0aGlzLmRhdGFbcm93SW5kZXhdW2NvbHVtbkluZGV4XSA9IHZhbHVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0KHJvd0luZGV4LCBjb2x1bW5JbmRleCkge1xuICAgIHJldHVybiB0aGlzLmRhdGFbcm93SW5kZXhdW2NvbHVtbkluZGV4XTtcbiAgfVxufVxuIiwiaW1wb3J0IFdyYXBwZXJNYXRyaXgxRCBmcm9tICcuL1dyYXBwZXJNYXRyaXgxRCc7XG5pbXBvcnQgV3JhcHBlck1hdHJpeDJEIGZyb20gJy4vV3JhcHBlck1hdHJpeDJEJztcblxuZXhwb3J0IGZ1bmN0aW9uIHdyYXAoYXJyYXksIG9wdGlvbnMpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyYXkpKSB7XG4gICAgaWYgKGFycmF5WzBdICYmIEFycmF5LmlzQXJyYXkoYXJyYXlbMF0pKSB7XG4gICAgICByZXR1cm4gbmV3IFdyYXBwZXJNYXRyaXgyRChhcnJheSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgV3JhcHBlck1hdHJpeDFEKGFycmF5LCBvcHRpb25zKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd0aGUgYXJndW1lbnQgaXMgbm90IGFuIGFycmF5Jyk7XG4gIH1cbn1cbiIsIlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGlueVF1ZXVlIHtcbiAgICBjb25zdHJ1Y3RvcihkYXRhID0gW10sIGNvbXBhcmUgPSBkZWZhdWx0Q29tcGFyZSkge1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLmxlbmd0aCA9IHRoaXMuZGF0YS5sZW5ndGg7XG4gICAgICAgIHRoaXMuY29tcGFyZSA9IGNvbXBhcmU7XG5cbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9ICh0aGlzLmxlbmd0aCA+PiAxKSAtIDE7IGkgPj0gMDsgaS0tKSB0aGlzLl9kb3duKGkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVzaChpdGVtKSB7XG4gICAgICAgIHRoaXMuZGF0YS5wdXNoKGl0ZW0pO1xuICAgICAgICB0aGlzLmxlbmd0aCsrO1xuICAgICAgICB0aGlzLl91cCh0aGlzLmxlbmd0aCAtIDEpO1xuICAgIH1cblxuICAgIHBvcCgpIHtcbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoID09PSAwKSByZXR1cm4gdW5kZWZpbmVkO1xuXG4gICAgICAgIGNvbnN0IHRvcCA9IHRoaXMuZGF0YVswXTtcbiAgICAgICAgY29uc3QgYm90dG9tID0gdGhpcy5kYXRhLnBvcCgpO1xuICAgICAgICB0aGlzLmxlbmd0aC0tO1xuXG4gICAgICAgIGlmICh0aGlzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YVswXSA9IGJvdHRvbTtcbiAgICAgICAgICAgIHRoaXMuX2Rvd24oMCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdG9wO1xuICAgIH1cblxuICAgIHBlZWsoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFbMF07XG4gICAgfVxuXG4gICAgX3VwKHBvcykge1xuICAgICAgICBjb25zdCB7ZGF0YSwgY29tcGFyZX0gPSB0aGlzO1xuICAgICAgICBjb25zdCBpdGVtID0gZGF0YVtwb3NdO1xuXG4gICAgICAgIHdoaWxlIChwb3MgPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBwYXJlbnQgPSAocG9zIC0gMSkgPj4gMTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSBkYXRhW3BhcmVudF07XG4gICAgICAgICAgICBpZiAoY29tcGFyZShpdGVtLCBjdXJyZW50KSA+PSAwKSBicmVhaztcbiAgICAgICAgICAgIGRhdGFbcG9zXSA9IGN1cnJlbnQ7XG4gICAgICAgICAgICBwb3MgPSBwYXJlbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBkYXRhW3Bvc10gPSBpdGVtO1xuICAgIH1cblxuICAgIF9kb3duKHBvcykge1xuICAgICAgICBjb25zdCB7ZGF0YSwgY29tcGFyZX0gPSB0aGlzO1xuICAgICAgICBjb25zdCBoYWxmTGVuZ3RoID0gdGhpcy5sZW5ndGggPj4gMTtcbiAgICAgICAgY29uc3QgaXRlbSA9IGRhdGFbcG9zXTtcblxuICAgICAgICB3aGlsZSAocG9zIDwgaGFsZkxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IGxlZnQgPSAocG9zIDw8IDEpICsgMTtcbiAgICAgICAgICAgIGxldCBiZXN0ID0gZGF0YVtsZWZ0XTtcbiAgICAgICAgICAgIGNvbnN0IHJpZ2h0ID0gbGVmdCArIDE7XG5cbiAgICAgICAgICAgIGlmIChyaWdodCA8IHRoaXMubGVuZ3RoICYmIGNvbXBhcmUoZGF0YVtyaWdodF0sIGJlc3QpIDwgMCkge1xuICAgICAgICAgICAgICAgIGxlZnQgPSByaWdodDtcbiAgICAgICAgICAgICAgICBiZXN0ID0gZGF0YVtyaWdodF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY29tcGFyZShiZXN0LCBpdGVtKSA+PSAwKSBicmVhaztcblxuICAgICAgICAgICAgZGF0YVtwb3NdID0gYmVzdDtcbiAgICAgICAgICAgIHBvcyA9IGxlZnQ7XG4gICAgICAgIH1cblxuICAgICAgICBkYXRhW3Bvc10gPSBpdGVtO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZGVmYXVsdENvbXBhcmUoYSwgYikge1xuICAgIHJldHVybiBhIDwgYiA/IC0xIDogYSA+IGIgPyAxIDogMDtcbn1cbiIsImNvbnN0IHtJbWFnZVRhcmdldH0gPSByZXF1aXJlKCcuL2ltYWdlLXRhcmdldC9pbmRleC5qcycpO1xuXG5jbGFzcyBDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoaW5wdXRXaWR0aCwgaW5wdXRIZWlnaHQpIHtcbiAgICB0aGlzLl9pbWFnZVRhcmdldHMgPSBbXTtcblxuICAgIC8vIFRPRE86IG5vbi1oYXJkY29kZWQgY2FtZXJhIG1hdHJpeD9cbiAgICAvLyAgICAgW2Z4ICBzIGN4XVxuICAgIC8vIEsgPSBbIDAgZnggY3ldXG4gICAgLy8gICAgIFsgMCAgMCAgMV1cbiAgICB0aGlzLl9wcm9qZWN0aW9uVHJhbnNmb3JtID0gW1xuICAgICAgWyAzMDQuNjgyNzA0NTkzMzUwMjUsIDAsIDE2MS43MjM5NTMyNDcwNzAzXSxcbiAgICAgIFsgMCwgMzAzLjI2MDYxMTgwMTU1MzcsIDExOC44MDMyNjg0MzI2MTcxOV0sXG4gICAgICBbIDAsIDAsIDEuMF1cbiAgICBdO1xuXG4gICAgdGhpcy5fcHJvamVjdGlvbk1hdHJpeCA9IF9nbFByb2plY3Rpb25NYXRyaXgoe1xuICAgICAgcHJvamVjdGlvblRyYW5zZm9ybTogdGhpcy5fcHJvamVjdGlvblRyYW5zZm9ybSxcbiAgICAgIHdpZHRoOiBpbnB1dFdpZHRoIC0gMSwgLy8gLTEgaXMgbm90IG5lY2Vzc2FyeT9cbiAgICAgIGhlaWdodDogaW5wdXRIZWlnaHQgLSAxLFxuICAgICAgbmVhcjogMC4wMDAxLFxuICAgICAgZmFyOiAxMDAwLjBcbiAgICB9KTtcbiAgfVxuXG4gIGdldFByb2plY3Rpb25NYXRyaXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Byb2plY3Rpb25NYXRyaXg7XG4gIH1cblxuICBhZGRJbWFnZVRhcmdldChvcHRpb25zKSB7XG4gICAgY29uc3QgaW1hZ2VUYXJnZXQgPSBuZXcgSW1hZ2VUYXJnZXQob3B0aW9ucyk7XG4gICAgdGhpcy5faW1hZ2VUYXJnZXRzLnB1c2goaW1hZ2VUYXJnZXQpO1xuICB9XG5cbiAgcHJvY2VzcyhxdWVyeUltYWdlKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgdGhpcy5faW1hZ2VUYXJnZXRzLmZvckVhY2goKGltYWdlVGFyZ2V0KSA9PiB7XG4gICAgICBjb25zdCBtb2RlbFZpZXdUcmFuc2Zvcm0gPSBpbWFnZVRhcmdldC5wcm9jZXNzKHF1ZXJ5SW1hZ2UpO1xuICAgICAgY29uc3Qgd29ybGRNYXRyaXggPSBtb2RlbFZpZXdUcmFuc2Zvcm0gPT09IG51bGw/IG51bGw6IF9nbE1vZGVsVmlld01hdHJpeCh7bW9kZWxWaWV3VHJhbnNmb3JtfSk7XG5cbiAgICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgICAgd29ybGRNYXRyaXg6IHdvcmxkTWF0cml4XG4gICAgICB9KVxuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cblxuLy8gYnVpbGQgb3BlbkdMIG1vZGVsVmlldyBtYXRyaXhcbmNvbnN0IF9nbE1vZGVsVmlld01hdHJpeCA9ICh7bW9kZWxWaWV3VHJhbnNmb3JtfSkgPT4ge1xuICBjb25zdCBvcGVuR0xXb3JsZE1hdHJpeCA9IFtcbiAgICBtb2RlbFZpZXdUcmFuc2Zvcm1bMF1bMF0sIC1tb2RlbFZpZXdUcmFuc2Zvcm1bMV1bMF0sIC1tb2RlbFZpZXdUcmFuc2Zvcm1bMl1bMF0sIDAsXG4gICAgbW9kZWxWaWV3VHJhbnNmb3JtWzBdWzFdLCAtbW9kZWxWaWV3VHJhbnNmb3JtWzFdWzFdLCAtbW9kZWxWaWV3VHJhbnNmb3JtWzJdWzFdLCAwLFxuICAgIG1vZGVsVmlld1RyYW5zZm9ybVswXVsyXSwgLW1vZGVsVmlld1RyYW5zZm9ybVsxXVsyXSwgLW1vZGVsVmlld1RyYW5zZm9ybVsyXVsyXSwgMCxcbiAgICBtb2RlbFZpZXdUcmFuc2Zvcm1bMF1bM10sIC1tb2RlbFZpZXdUcmFuc2Zvcm1bMV1bM10sIC1tb2RlbFZpZXdUcmFuc2Zvcm1bMl1bM10sIDFcbiAgXTtcbiAgcmV0dXJuIG9wZW5HTFdvcmxkTWF0cml4O1xufVxuXG4vLyBidWlsZCBvcGVuR0wgcHJvamVjdGlvbiBtYXRyaXhcbmNvbnN0IF9nbFByb2plY3Rpb25NYXRyaXggPSAoe3Byb2plY3Rpb25UcmFuc2Zvcm0sIHdpZHRoLCBoZWlnaHQsIG5lYXIsIGZhcn0pID0+IHtcbiAgY29uc3QgcHJvaiA9IFtcbiAgICBbMiAqIHByb2plY3Rpb25UcmFuc2Zvcm1bMF1bMF0gLyB3aWR0aCwgMCwgLSgyICogcHJvamVjdGlvblRyYW5zZm9ybVswXVsyXSAvIHdpZHRoIC0gMSksIDBdLFxuICAgIFswLCAyICogcHJvamVjdGlvblRyYW5zZm9ybVsxXVsxXSAvIGhlaWdodCwgLSgyICogcHJvamVjdGlvblRyYW5zZm9ybVsxXVsyXSAvIGhlaWdodCAtIDEpLCAwXSxcbiAgICBbMCwgMCwgLShmYXIgKyBuZWFyKSAvIChmYXIgLSBuZWFyKSwgLTIgKiBmYXIgKiBuZWFyIC8gKGZhciAtIG5lYXIpXSxcbiAgICBbMCwgMCwgLTEsIDBdXG4gIF07XG5cbiAgY29uc3QgcHJvak1hdHJpeCA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgNDsgaisrKSB7XG4gICAgICBwcm9qTWF0cml4LnB1c2gocHJvaltqXVtpXSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBwcm9qTWF0cml4O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgQ29udHJvbGxlcixcbn1cbiIsImNvbnN0IHtNYXRyaXgsIGludmVyc2V9ID0gcmVxdWlyZSgnbWwtbWF0cml4Jyk7XG5jb25zdCB7cmVmaW5lSG9tb2dyYXBoeX0gPSByZXF1aXJlKCcuL3JlZmluZV9ob21vZ3JhcGh5Jyk7XG5jb25zdCB7Z2V0UHJvamVjdGlvblRyYW5zZm9ybSwgYXBwbHlNb2RlbFZpZXdQcm9qZWN0aW9uVHJhbnNmb3JtLCBidWlsZE1vZGVsVmlld1Byb2plY3Rpb25UcmFuc2Zvcm0sIGNvbXB1dGVTY3JlZW5Db29yZGlhdGV9ID0gcmVxdWlyZSgnLi91dGlscy5qcycpO1xuXG5jb25zdCBLRGF0YSA9IGdldFByb2plY3Rpb25UcmFuc2Zvcm0oKTtcbi8vIGJ1aWxkIHdvcmxkIG1hdHJpeCB3aXRoIGxpc3Qgb2YgbWF0Y2hpbmcgd29ybGRDb29yZHN8c2NyZWVuQ29vcmRzXG4vLyBSZWY6IGh0dHBzOi8vd3d3LnVpby5uby9zdHVkaWVyL2VtbmVyL21hdG5hdC9pdHMvVEVLNTAzMC92MTkvbGVjdC9sZWN0dXJlXzRfMy1lc3RpbWF0aW5nLWhvbW9ncmFwaGllcy1mcm9tLWZlYXR1cmUtY29ycmVzcG9uZGVuY2VzLnBkZiAgKEJhc2ljIGhvbW9ncmFwaHkgZXN0aW1hdGlvbiBmcm9tIHBvaW50cylcblxuY29uc3QgZXN0aW1hdGVIb21vZ3JhcGh5ID0gKHtzY3JlZW5Db29yZHMsIHdvcmxkQ29vcmRzfSkgPT4ge1xuICBjb25zdCBudW0gPSBzY3JlZW5Db29yZHMubGVuZ3RoO1xuICBjb25zdCBBRGF0YSA9IFtdO1xuICBjb25zdCBCRGF0YSA9IFtdO1xuICBmb3IgKGxldCBqID0gMDsgaiA8IG51bTsgaisrKSB7XG4gICAgY29uc3Qgcm93MSA9IFtcbiAgICAgIHdvcmxkQ29vcmRzW2pdLngsXG4gICAgICB3b3JsZENvb3Jkc1tqXS55LFxuICAgICAgMSxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIC0od29ybGRDb29yZHNbal0ueCAqIHNjcmVlbkNvb3Jkc1tqXS54KSxcbiAgICAgIC0od29ybGRDb29yZHNbal0ueSAqIHNjcmVlbkNvb3Jkc1tqXS54KSxcbiAgICBdO1xuICAgIGNvbnN0IHJvdzIgPSBbXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICB3b3JsZENvb3Jkc1tqXS54LFxuICAgICAgd29ybGRDb29yZHNbal0ueSxcbiAgICAgIDEsXG4gICAgICAtKHdvcmxkQ29vcmRzW2pdLnggKiBzY3JlZW5Db29yZHNbal0ueSksXG4gICAgICAtKHdvcmxkQ29vcmRzW2pdLnkgKiBzY3JlZW5Db29yZHNbal0ueSksXG4gICAgXTtcbiAgICBBRGF0YS5wdXNoKHJvdzEpO1xuICAgIEFEYXRhLnB1c2gocm93Mik7XG5cbiAgICBCRGF0YS5wdXNoKFtzY3JlZW5Db29yZHNbal0ueF0pO1xuICAgIEJEYXRhLnB1c2goW3NjcmVlbkNvb3Jkc1tqXS55XSk7XG4gIH1cblxuICBjb25zdCBBID0gbmV3IE1hdHJpeChBRGF0YSk7XG4gIGNvbnN0IEIgPSBuZXcgTWF0cml4KEJEYXRhKTtcbiAgY29uc3QgQVQgPSBBLnRyYW5zcG9zZSgpO1xuICBjb25zdCBBVEEgPSBBVC5tbXVsKEEpO1xuICBjb25zdCBBVEIgPSBBVC5tbXVsKEIpO1xuICBjb25zdCBBVEFJbnYgPSBpbnZlcnNlKEFUQSk7XG4gIGNvbnN0IEMgPSBBVEFJbnYubW11bChBVEIpLnRvMURBcnJheSgpO1xuXG4gIGNvbnN0IEggPSBuZXcgTWF0cml4KFtcbiAgICBbQ1swXSwgQ1sxXSwgQ1syXV0sXG4gICAgW0NbM10sIENbNF0sIENbNV1dLFxuICAgIFtDWzZdLCBDWzddLCAxXVxuICBdKTtcbiAgLy9jb25zb2xlLmxvZyhcImhvbW9ncmFwaHk6IFwiLCBILnRvU3RyaW5nKCkpO1xuICAvL1xuICAvL2NvbnNvbGUubG9nKFwibWF0QTpcIiwgQS50b1N0cmluZygpLCAnLS0tdnMtLS0nLCBkZWJ1Z0NvbnRlbnQubWF0QSk7XG4gIC8vY29uc29sZS5sb2coXCJtYXRDOlwiLCBILnRvU3RyaW5nKCksICctLS12cy0tLScsIGRlYnVnQ29udGVudC5tYXRDKTtcblxuICBjb25zdCBLID0gbmV3IE1hdHJpeChLRGF0YSk7XG4gIGNvbnN0IEtJbnYgPSBpbnZlcnNlKEspO1xuXG4gIGNvbnN0IF9LSW52SCA9IEtJbnYubW11bChIKTtcbiAgY29uc3QgS0ludkggPSBfS0ludkgudG8xREFycmF5KCk7XG5cbiAgLy9jb25zb2xlLmxvZyhcIktJbnZIXCIsIF9LSW52SCwgS0ludkgpO1xuXG4gIGNvbnN0IG5vcm0xID0gTWF0aC5zcXJ0KCBLSW52SFswXSAqIEtJbnZIWzBdICsgS0ludkhbM10gKiBLSW52SFszXSArIEtJbnZIWzZdICogS0ludkhbNl0pO1xuICBjb25zdCBub3JtMiA9IE1hdGguc3FydCggS0ludkhbMV0gKiBLSW52SFsxXSArIEtJbnZIWzRdICogS0ludkhbNF0gKyBLSW52SFs3XSAqIEtJbnZIWzddKTtcbiAgY29uc3QgdG5vcm0gPSAobm9ybTEgKyBub3JtMikgLyAyO1xuXG4gIGNvbnN0IHJvdGF0ZSA9IFtdO1xuICByb3RhdGVbMF0gPSBLSW52SFswXSAvIG5vcm0xO1xuICByb3RhdGVbM10gPSBLSW52SFszXSAvIG5vcm0xO1xuICByb3RhdGVbNl0gPSBLSW52SFs2XSAvIG5vcm0xO1xuXG4gIHJvdGF0ZVsxXSA9IEtJbnZIWzFdIC8gbm9ybTI7XG4gIHJvdGF0ZVs0XSA9IEtJbnZIWzRdIC8gbm9ybTI7XG4gIHJvdGF0ZVs3XSA9IEtJbnZIWzddIC8gbm9ybTI7XG5cbiAgcm90YXRlWzJdID0gcm90YXRlWzNdICogcm90YXRlWzddIC0gcm90YXRlWzZdICogcm90YXRlWzRdO1xuICByb3RhdGVbNV0gPSByb3RhdGVbNl0gKiByb3RhdGVbMV0gLSByb3RhdGVbMF0gKiByb3RhdGVbN107XG4gIHJvdGF0ZVs4XSA9IHJvdGF0ZVswXSAqIHJvdGF0ZVs0XSAtIHJvdGF0ZVsxXSAqIHJvdGF0ZVszXTtcblxuICAvLyBUT0RETyBhcnRvb2xraXQgaGFzIGNoZWNrX3JvdGF0aW9uKCkgKGluIGljcFV0aWwuYyBmaWxlKS4gbm90IHN1cmUgd2hhdCB0aGF0IGRvZXMuLi4uXG5cbiAgY29uc3QgdHJhbiA9IFtdXG4gIHRyYW5bMF0gPSBLSW52SFsyXSAvIHRub3JtO1xuICB0cmFuWzFdID0gS0ludkhbNV0gLyB0bm9ybTtcbiAgdHJhblsyXSA9IEtJbnZIWzhdIC8gdG5vcm07XG5cbiAgbGV0IGluaXRpYWxNb2RlbFZpZXdUcmFuc2Zvcm0gPSBbXG4gICAgW3JvdGF0ZVswXSwgcm90YXRlWzFdLCByb3RhdGVbMl0sIHRyYW5bMF1dLFxuICAgIFtyb3RhdGVbM10sIHJvdGF0ZVs0XSwgcm90YXRlWzVdLCB0cmFuWzFdXSxcbiAgICBbcm90YXRlWzZdLCByb3RhdGVbN10sIHJvdGF0ZVs4XSwgdHJhblsyXV1cbiAgXTtcblxuICAvLyBpdGVyYXRlIHBvaW50cyB0byBpbXByb3ZlIHRoZSBtYXRyaXhcbiAgLy9jb25zb2xlLmxvZyhcImluaXRpYWxNb2RlbFZpZXdUcmFuc2Zvcm1cIiwgaW5pdGlhbE1vZGVsVmlld1RyYW5zZm9ybSwgJy0tLXZzLS0tJywgZGVidWdDb250ZW50LmljcF9pbml0TWF0WHcyWGMpO1xuICBjb25zdCB7bW9kZWxWaWV3VHJhbnNmb3JtLCBlcnJ9ID0gcmVmaW5lSG9tb2dyYXBoeSh7aW5pdGlhbE1vZGVsVmlld1RyYW5zZm9ybSwgcHJvamVjdGlvblRyYW5zZm9ybTogS0RhdGEsIHdvcmxkQ29vcmRzLCBzY3JlZW5Db29yZHN9KTtcblxuICAvL2NvbnNvbGUubG9nKFwiYWRqdXN0ZWQgbW9kZWxWaWV3VHJhbnNmb3JtXCIsIG1vZGVsVmlld1RyYW5zZm9ybSwgJy0tLXZzLS0tJywgZGVidWdDb250ZW50LmNhbVBvc2UpO1xuXG4gIHJldHVybiBtb2RlbFZpZXdUcmFuc2Zvcm07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZXN0aW1hdGVIb21vZ3JhcGh5XG59XG4iLCJjb25zdCB7TWF0cml4LCBpbnZlcnNlfSA9IHJlcXVpcmUoJ21sLW1hdHJpeCcpO1xuY29uc3Qge2dldFByb2plY3Rpb25UcmFuc2Zvcm0sIGFwcGx5TW9kZWxWaWV3UHJvamVjdGlvblRyYW5zZm9ybSwgYnVpbGRNb2RlbFZpZXdQcm9qZWN0aW9uVHJhbnNmb3JtLCBjb21wdXRlU2NyZWVuQ29vcmRpYXRlfSA9IHJlcXVpcmUoJy4vdXRpbHMuanMnKTtcblxuY29uc3QgSzJfRkFDVE9SID0gNC4wO1xuY29uc3QgSUNQX01BWF9MT09QID0gMTA7XG5jb25zdCBJQ1BfQlJFQUtfTE9PUF9FUlJPUl9USFJFU0ggPSAwLjE7XG5jb25zdCBJQ1BfQlJFQUtfTE9PUF9FUlJPUl9SQVRJT19USFJFU0ggPSAwLjk5O1xuY29uc3QgSUNQX0JSRUFLX0xPT1BfRVJST1JfVEhSRVNIMiA9IDQuMDtcbmNvbnN0IElDUF9JTkxJRVJfUFJPQkFCSUxJVFkgPSAwLjUwO1xuXG4vLyBtb2RlbHZpZXdUcmFuc2Zvcm0gUnQgM3g0XG5jb25zdCByZWZpbmVIb21vZ3JhcGh5ID0gKHtpbml0aWFsTW9kZWxWaWV3VHJhbnNmb3JtLCBwcm9qZWN0aW9uVHJhbnNmb3JtLCB3b3JsZENvb3Jkcywgc2NyZWVuQ29vcmRzLCBpc1JvYnVzdE1vZGUsIGlubGllclByb2IsIGRlYnVnQ29udGVudH0pID0+IHtcbiAgbGV0IG1vZGVsVmlld1RyYW5zZm9ybSA9IGluaXRpYWxNb2RlbFZpZXdUcmFuc2Zvcm07XG5cbiAgbGV0IGVycjAgPSAwLjA7XG4gIGxldCBlcnIxID0gMC4wO1xuICBmb3IgKGxldCBsID0gMDsgbCA8PSBJQ1BfTUFYX0xPT1A7IGwrKykge1xuXG4gICAgY29uc3QgbW9kZWxWaWV3UHJvamVjdGlvblRyYW5zZm9ybSA9IGJ1aWxkTW9kZWxWaWV3UHJvamVjdGlvblRyYW5zZm9ybShwcm9qZWN0aW9uVHJhbnNmb3JtLCBtb2RlbFZpZXdUcmFuc2Zvcm0pO1xuICAgIC8vY29uc29sZS5sb2coXCJtdnBcIiwgbW9kZWxWaWV3UHJvamVjdGlvblRyYW5zZm9ybSk7XG4gICAgLy9jb25zb2xlLmxvZyhcImljcCBtYXRYdzJVXCIsIGwsIGRlYnVnQ29udGVudC5pY3BfbWF0WHcyVVtsXSk7XG4gICAgLy9jb25zb2xlLmxvZyhcImljcCBtYXRYYzJVXCIsIGwsIGRlYnVnQ29udGVudC5pY3BfbWF0WGMyVVtsXSk7XG4gICAgLy9jb25zb2xlLmxvZyhcImljcCBtYXRYdzJYY1wiLCBsLCBkZWJ1Z0NvbnRlbnQuaWNwX21hdFh3MlhjW2xdKTtcblxuICAgIGNvbnN0IEUgPSBbXTtcbiAgICBjb25zdCBkeHMgPSBbXTtcbiAgICBjb25zdCBkeXMgPSBbXTtcbiAgICBmb3IgKGxldCBuID0gMDsgbiA8IHdvcmxkQ29vcmRzLmxlbmd0aDsgbisrKSB7XG4gICAgICBjb25zdCB1ID0gY29tcHV0ZVNjcmVlbkNvb3JkaWF0ZShtb2RlbFZpZXdQcm9qZWN0aW9uVHJhbnNmb3JtLCB3b3JsZENvb3Jkc1tuXS54LCB3b3JsZENvb3Jkc1tuXS55LCB3b3JsZENvb3Jkc1tuXS56KTtcbiAgICAgIGNvbnN0IGR4ID0gc2NyZWVuQ29vcmRzW25dLnggLSB1Lng7XG4gICAgICBjb25zdCBkeSA9IHNjcmVlbkNvb3Jkc1tuXS55IC0gdS55O1xuICAgICAgZHhzLnB1c2goZHgpO1xuICAgICAgZHlzLnB1c2goZHkpO1xuICAgICAgRS5wdXNoKGR4ICogZHggKyBkeSAqIGR5KTtcbiAgICB9XG5cbiAgICBsZXQgSzI7IC8vIHJvYnVzdCBtb2RlIG9ubHlcbiAgICBlcnIxID0gMC4wO1xuICAgIGlmIChpc1JvYnVzdE1vZGUpIHtcbiAgICAgIGNvbnN0IGlubGllck51bSA9IE1hdGgubWF4KDMsIE1hdGguZmxvb3Iod29ybGRDb29yZHMubGVuZ3RoICogaW5saWVyUHJvYikgLSAxKTtcbiAgICAgIGNvbnN0IEUyID0gW107IC8vIGZvciByb2J1c3QgbW9kZSBvbmx5XG4gICAgICBmb3IgKGxldCBuID0gMDsgbiA8IHdvcmxkQ29vcmRzLmxlbmd0aDsgbisrKSB7XG4gICAgICAgIEUyLnB1c2goRVtuXSk7XG4gICAgICB9XG4gICAgICBFMi5zb3J0KCk7XG4gICAgICBLMiA9IE1hdGgubWF4KEUyW2lubGllck51bV0gKiBLMl9GQUNUT1IsIDE2LjApO1xuICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCB3b3JsZENvb3Jkcy5sZW5ndGg7IG4rKykge1xuICAgICAgICBpZiAoRTJbbl0gPiBLMikgZXJyMSArPSBLMi8gNjtcbiAgICAgICAgZWxzZSBlcnIxICs9ICBLMi82LjAgKiAoMS4wIC0gKDEuMC1FMltuXS9LMikqKDEuMC1FMltuXS9LMikqKDEuMC1FMltuXS9LMikpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBuID0gMDsgbiA8IHdvcmxkQ29vcmRzLmxlbmd0aDsgbisrKSB7XG4gICAgICAgIGVycjEgKz0gRVtuXTtcbiAgICAgIH1cbiAgICB9XG4gICAgZXJyMSAvPSB3b3JsZENvb3Jkcy5sZW5ndGg7XG5cbiAgICBpZiAoZXJyMSA8IElDUF9CUkVBS19MT09QX0VSUk9SX1RIUkVTSCkgYnJlYWs7XG4gICAgaWYgKGwgPiAwICYmIGVycjEgPCBJQ1BfQlJFQUtfTE9PUF9FUlJPUl9USFJFU0gyICYmIGVycjEvZXJyMCA+IElDUF9CUkVBS19MT09QX0VSUk9SX1JBVElPX1RIUkVTSCkgYnJlYWs7XG4gICAgZXJyMCA9IGVycjE7XG5cbiAgICBjb25zdCBkVSA9IFtdO1xuICAgIGNvbnN0IGFsbEpfVV9TID0gW107XG4gICAgZm9yIChsZXQgbiA9IDA7IG4gPCB3b3JsZENvb3Jkcy5sZW5ndGg7IG4rKykge1xuICAgICAgaWYgKGlzUm9idXN0TW9kZSAmJiBFW25dID4gSzIpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IEpfVV9TID0gX2dldEpfVV9TKHttb2RlbFZpZXdQcm9qZWN0aW9uVHJhbnNmb3JtLCBtb2RlbFZpZXdUcmFuc2Zvcm0sIHByb2plY3Rpb25UcmFuc2Zvcm0sIHdvcmxkQ29vcmQ6IHdvcmxkQ29vcmRzW25dLCBkZWJ1Z0NvbnRlbnR9KTtcblxuICAgICAgaWYgKGlzUm9idXN0TW9kZSkge1xuICAgICAgICBjb25zdCBXID0gKDEuMCAtIEVbbl0vSzIpKigxLjAgLSBFW25dL0syKTtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAyOyBqKyspIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xuICAgICAgICAgICAgSl9VX1Nbal1baV0gKj0gVztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZFUucHVzaChbZHhzW25dICogV10pO1xuICAgICAgICBkVS5wdXNoKFtkeXNbbl0gKiBXXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkVS5wdXNoKFtkeHNbbl1dKTtcbiAgICAgICAgZFUucHVzaChbZHlzW25dXSk7XG4gICAgICB9XG5cbiAgICAgIC8vY29uc29sZS5sb2coXCJKX1VfU1wiLCBKX1VfUywgZGVidWdDb250ZW50LmljcF9KX1VfU1tsXVtuXSk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEpfVV9TLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGFsbEpfVV9TLnB1c2goSl9VX1NbaV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGRTID0gX2dldERlbHRhUyh7ZFUsIEpfVV9TOiBhbGxKX1VfU30pO1xuICAgIGlmIChkUyA9PT0gbnVsbCkgY29udGludWU7XG4gICAgbW9kZWxWaWV3VHJhbnNmb3JtID0gX3VwZGF0ZU1vZGVsVmlld1RyYW5zZm9ybSh7bW9kZWxWaWV3VHJhbnNmb3JtLCBkU30pO1xuICB9XG4gIHJldHVybiB7bW9kZWxWaWV3VHJhbnNmb3JtLCBlcnI6IGVycjF9O1xufVxuXG5fdXBkYXRlTW9kZWxWaWV3VHJhbnNmb3JtID0gKHttb2RlbFZpZXdUcmFuc2Zvcm0sIGRTfSkgPT4ge1xuICBjb25zdCBxID0gW107XG4gIGxldCByYSA9IGRTWzBdICogZFNbMF0gKyBkU1sxXSAqIGRTWzFdICsgZFNbMl0gKiBkU1syXTtcbiAgaWYoIHJhIDwgMC4wMDAwMDEgKSB7XG4gICAgcVswXSA9IDEuMDtcbiAgICBxWzFdID0gMC4wO1xuICAgIHFbMl0gPSAwLjA7XG4gICAgcVszXSA9IDAuMDtcbiAgfSBlbHNlIHtcbiAgICByYSA9IE1hdGguc3FydChyYSk7XG4gICAgcVswXSA9IGRTWzBdIC8gcmE7XG4gICAgcVsxXSA9IGRTWzFdIC8gcmE7XG4gICAgcVsyXSA9IGRTWzJdIC8gcmE7XG4gICAgcVszXSA9IHJhO1xuICB9XG4gIHFbNF0gPSBkU1szXTtcbiAgcVs1XSA9IGRTWzRdO1xuICBxWzZdID0gZFNbNV07XG5cblxuICBjb25zdCBjcmEgPSBNYXRoLmNvcyhxWzNdKTtcbiAgY29uc3Qgb25lX2NyYSA9IDEuMCAtIGNyYTtcbiAgY29uc3Qgc3JhID0gTWF0aC5zaW4ocVszXSk7XG4gIGNvbnN0IG1hdCA9IFtbXSxbXSxbXV07XG5cbiAgbWF0WzBdWzBdID0gcVswXSpxWzBdKm9uZV9jcmEgKyBjcmE7XG4gIG1hdFswXVsxXSA9IHFbMF0qcVsxXSpvbmVfY3JhIC0gcVsyXSpzcmE7XG4gIG1hdFswXVsyXSA9IHFbMF0qcVsyXSpvbmVfY3JhICsgcVsxXSpzcmE7XG4gIG1hdFswXVszXSA9IHFbNF07XG4gIG1hdFsxXVswXSA9IHFbMV0qcVswXSpvbmVfY3JhICsgcVsyXSpzcmE7XG4gIG1hdFsxXVsxXSA9IHFbMV0qcVsxXSpvbmVfY3JhICsgY3JhO1xuICBtYXRbMV1bMl0gPSBxWzFdKnFbMl0qb25lX2NyYSAtIHFbMF0qc3JhO1xuICBtYXRbMV1bM10gPSBxWzVdO1xuICBtYXRbMl1bMF0gPSBxWzJdKnFbMF0qb25lX2NyYSAtIHFbMV0qc3JhO1xuICBtYXRbMl1bMV0gPSBxWzJdKnFbMV0qb25lX2NyYSArIHFbMF0qc3JhO1xuICBtYXRbMl1bMl0gPSBxWzJdKnFbMl0qb25lX2NyYSArIGNyYTtcbiAgbWF0WzJdWzNdID0gcVs2XTtcblxuICBjb25zdCBtYXQyID0gW1tdLFtdLFtdXTtcbiAgZm9yIChsZXQgaiA9IDA7IGogPCAzOyBqKysgKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKysgKSB7XG4gICAgICBtYXQyW2pdW2ldID0gbW9kZWxWaWV3VHJhbnNmb3JtW2pdWzBdICogbWF0WzBdW2ldXG4gICAgICAgICAgICAgICAgICAgKyBtb2RlbFZpZXdUcmFuc2Zvcm1bal1bMV0gKiBtYXRbMV1baV1cbiAgICAgICAgICAgICAgICAgICArIG1vZGVsVmlld1RyYW5zZm9ybVtqXVsyXSAqIG1hdFsyXVtpXTtcbiAgICB9XG4gICAgbWF0MltqXVszXSArPSBtb2RlbFZpZXdUcmFuc2Zvcm1bal1bM107XG4gIH1cbiAgcmV0dXJuIG1hdDI7XG59XG5cbl9nZXREZWx0YVMgPSAoe2RVLCBKX1VfU30pID0+IHtcbiAgY29uc3QgSiA9IG5ldyBNYXRyaXgoSl9VX1MpO1xuICBjb25zdCBVID0gbmV3IE1hdHJpeChkVSk7XG5cbiAgY29uc3QgSlQgPSBKLnRyYW5zcG9zZSgpO1xuICBjb25zdCBKVEogPSBKVC5tbXVsKEopO1xuICBjb25zdCBKVFUgPSBKVC5tbXVsKFUpO1xuXG4gIGxldCBKVEpJbnY7XG4gIHRyeSB7XG4gICAgSlRKSW52ID0gaW52ZXJzZShKVEopO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCBTID0gSlRKSW52Lm1tdWwoSlRVKTtcbiAgcmV0dXJuIFMudG8xREFycmF5KCk7XG59XG5cbl9nZXRKX1VfUyA9ICh7bW9kZWxWaWV3UHJvamVjdGlvblRyYW5zZm9ybSwgbW9kZWxWaWV3VHJhbnNmb3JtLCBwcm9qZWN0aW9uVHJhbnNmb3JtLCB3b3JsZENvb3JkLCBkZWJ1Z0NvbnRlbnR9KSA9PiB7XG4gIGNvbnN0IFQgPSBtb2RlbFZpZXdUcmFuc2Zvcm07XG4gIGNvbnN0IHt4LCB5LCB6fSA9IHdvcmxkQ29vcmQ7XG5cbiAgY29uc3QgdSA9IGFwcGx5TW9kZWxWaWV3UHJvamVjdGlvblRyYW5zZm9ybShtb2RlbFZpZXdQcm9qZWN0aW9uVHJhbnNmb3JtLCB4LCB5LCB6KTtcbiAgLy9jb25zb2xlLmxvZyhcInVcIiwgdSk7XG4gIC8vaWYgKE1hdGguYWJzKHUueikgPCAwLjAwMDAwMSkgcmV0dXJuIG51bGw7XG5cbiAgY29uc3QgejIgPSB1LnogKiB1Lno7XG4gIGNvbnN0IEpfVV9YYyA9IFtbXSxbXV07XG4gIEpfVV9YY1swXVswXSA9IChwcm9qZWN0aW9uVHJhbnNmb3JtWzBdWzBdICogdS56IC0gcHJvamVjdGlvblRyYW5zZm9ybVsyXVswXSAqIHUueCkgLyB6MjtcbiAgSl9VX1hjWzBdWzFdID0gKHByb2plY3Rpb25UcmFuc2Zvcm1bMF1bMV0gKiB1LnogLSBwcm9qZWN0aW9uVHJhbnNmb3JtWzJdWzFdICogdS54KSAvIHoyO1xuICBKX1VfWGNbMF1bMl0gPSAocHJvamVjdGlvblRyYW5zZm9ybVswXVsyXSAqIHUueiAtIHByb2plY3Rpb25UcmFuc2Zvcm1bMl1bMl0gKiB1LngpIC8gejI7XG4gIEpfVV9YY1sxXVswXSA9IChwcm9qZWN0aW9uVHJhbnNmb3JtWzFdWzBdICogdS56IC0gcHJvamVjdGlvblRyYW5zZm9ybVsyXVswXSAqIHUueSkgLyB6MjtcbiAgSl9VX1hjWzFdWzFdID0gKHByb2plY3Rpb25UcmFuc2Zvcm1bMV1bMV0gKiB1LnogLSBwcm9qZWN0aW9uVHJhbnNmb3JtWzJdWzFdICogdS55KSAvIHoyO1xuICBKX1VfWGNbMV1bMl0gPSAocHJvamVjdGlvblRyYW5zZm9ybVsxXVsyXSAqIHUueiAtIHByb2plY3Rpb25UcmFuc2Zvcm1bMl1bMl0gKiB1LnkpIC8gejI7XG5cbiAgY29uc3QgSl9YY19TID0gW1xuICAgIFtUWzBdWzJdICogeSAtIFRbMF1bMV0gKiB6LCBUWzBdWzBdICogeiAtIFRbMF1bMl0gKiB4LCBUWzBdWzFdICogeCAtIFRbMF1bMF0gKiB5LCBUWzBdWzBdLCBUWzBdWzFdLCBUWzBdWzJdXSxcbiAgICBbVFsxXVsyXSAqIHkgLSBUWzFdWzFdICogeiwgVFsxXVswXSAqIHogLSBUWzFdWzJdICogeCwgVFsxXVsxXSAqIHggLSBUWzFdWzBdICogeSwgVFsxXVswXSwgVFsxXVsxXSwgVFsxXVsyXV0sXG4gICAgW1RbMl1bMl0gKiB5IC0gVFsyXVsxXSAqIHosIFRbMl1bMF0gKiB6IC0gVFsyXVsyXSAqIHgsIFRbMl1bMV0gKiB4IC0gVFsyXVswXSAqIHksIFRbMl1bMF0sIFRbMl1bMV0sIFRbMl1bMl1dLFxuICBdO1xuXG4gIC8vY29uc29sZS5sb2coXCJKX1hjX1NcIiwgSl9YY19TLCAnLS12cy0tJywgJzAuJywgZGVidWdDb250ZW50LmljcF9KX1hjX1NbMF0sICcxLicsIGRlYnVnQ29udGVudC5pY3BfSl9YY19TWzFdKTtcbiAgLy9jb25zb2xlLmxvZyhcIkpfVV9YY1wiLCBKX1VfWGMsICctLXZzLS0nLCAnMC4nLCBkZWJ1Z0NvbnRlbnQuaWNwX0pfVV9YY1swXSwgJzEuJywgZGVidWdDb250ZW50LmljcF9KX1VfWGNbMV0pO1xuXG4gIGNvbnN0IEpfVV9TID0gW1tdLCBbXV07XG4gIGZvciAobGV0IGogPSAwOyBqIDwgMjsgaisrKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2OyBpKyspIHtcbiAgICAgIEpfVV9TW2pdW2ldID0gMC4wO1xuICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCAzOyBrKysgKSB7XG4gICAgICAgIEpfVV9TW2pdW2ldICs9IEpfVV9YY1tqXVtrXSAqIEpfWGNfU1trXVtpXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIEpfVV9TO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcmVmaW5lSG9tb2dyYXBoeVxufVxuIiwiY29uc3QgZ2V0UHJvamVjdGlvblRyYW5zZm9ybSA9ICgpID0+IHtcbiAgLy8gVE9ETzogbm9uLWhhcmRjb2RlZCBjYW1lcmEgbWF0cml4P1xuICAvLyAgICAgW2Z4ICBzIGN4XVxuICAvLyBLID0gWyAwIGZ4IGN5XVxuICAvLyAgICAgWyAwICAwICAxXVxuICBjb25zdCBLRGF0YSA9IFtcbiAgICBbIDMwNC42ODI3MDQ1OTMzNTAyNSwgMCwgMTYxLjcyMzk1MzI0NzA3MDNdLFxuICAgIFsgMCwgMzAzLjI2MDYxMTgwMTU1MzcsIDExOC44MDMyNjg0MzI2MTcxOV0sXG4gICAgWyAwLCAwLCAxLjBdXG4gIF07XG4gIHJldHVybiBLRGF0YTtcbn1cblxuY29uc3QgYnVpbGRNb2RlbFZpZXdQcm9qZWN0aW9uVHJhbnNmb3JtID0gKHByb2plY3Rpb25UcmFuc2Zvcm0sIG1vZGVsVmlld1RyYW5zZm9ybSkgPT4ge1xuICBjb25zdCBtb2RlbFZpZXdQcm9qZWN0aW9uVHJhbnNmb3JtID0gW1tdLFtdLFtdXTtcbiAgZm9yIChsZXQgaiA9IDA7IGogPCAzOyBqKysgKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgIG1vZGVsVmlld1Byb2plY3Rpb25UcmFuc2Zvcm1bal1baV0gPSBwcm9qZWN0aW9uVHJhbnNmb3JtW2pdWzBdICogbW9kZWxWaWV3VHJhbnNmb3JtWzBdW2ldXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgcHJvamVjdGlvblRyYW5zZm9ybVtqXVsxXSAqIG1vZGVsVmlld1RyYW5zZm9ybVsxXVtpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIHByb2plY3Rpb25UcmFuc2Zvcm1bal1bMl0gKiBtb2RlbFZpZXdUcmFuc2Zvcm1bMl1baV07XG4gICAgfVxuICB9XG4gIHJldHVybiBtb2RlbFZpZXdQcm9qZWN0aW9uVHJhbnNmb3JtO1xufVxuXG5jb25zdCBhcHBseU1vZGVsVmlld1Byb2plY3Rpb25UcmFuc2Zvcm0gPSAobW9kZWxWaWV3UHJvamVjdGlvblRyYW5zZm9ybSwgeCwgeSwgeikgPT4ge1xuICBjb25zdCB1eCA9IG1vZGVsVmlld1Byb2plY3Rpb25UcmFuc2Zvcm1bMF1bMF0gKiB4ICsgbW9kZWxWaWV3UHJvamVjdGlvblRyYW5zZm9ybVswXVsxXSAqIHlcbiAgICAgKyBtb2RlbFZpZXdQcm9qZWN0aW9uVHJhbnNmb3JtWzBdWzJdICogeiArIG1vZGVsVmlld1Byb2plY3Rpb25UcmFuc2Zvcm1bMF1bM107XG4gIGNvbnN0IHV5ID0gbW9kZWxWaWV3UHJvamVjdGlvblRyYW5zZm9ybVsxXVswXSAqIHggKyBtb2RlbFZpZXdQcm9qZWN0aW9uVHJhbnNmb3JtWzFdWzFdICogeVxuICAgICArIG1vZGVsVmlld1Byb2plY3Rpb25UcmFuc2Zvcm1bMV1bMl0gKiB6ICsgbW9kZWxWaWV3UHJvamVjdGlvblRyYW5zZm9ybVsxXVszXTtcbiAgY29uc3QgdXogID0gbW9kZWxWaWV3UHJvamVjdGlvblRyYW5zZm9ybVsyXVswXSAqIHggKyBtb2RlbFZpZXdQcm9qZWN0aW9uVHJhbnNmb3JtWzJdWzFdICogeVxuICAgICArIG1vZGVsVmlld1Byb2plY3Rpb25UcmFuc2Zvcm1bMl1bMl0gKiB6ICsgbW9kZWxWaWV3UHJvamVjdGlvblRyYW5zZm9ybVsyXVszXTtcbiAgcmV0dXJuIHt4OiB1eCwgeTogdXksIHo6IHV6fTtcbn1cblxuY29uc3QgY29tcHV0ZVNjcmVlbkNvb3JkaWF0ZSA9IChtb2RlbFZpZXdQcm9qZWN0aW9uVHJhbnNmb3JtLCB4LCB5LCB6KSA9PiB7XG4gIGNvbnN0IHt4OiB1eCwgeTogdXksIHo6IHV6fSA9IGFwcGx5TW9kZWxWaWV3UHJvamVjdGlvblRyYW5zZm9ybShtb2RlbFZpZXdQcm9qZWN0aW9uVHJhbnNmb3JtLCB4LCB5LCB6KTtcbiAgLy9jb25zb2xlLmxvZyhcIngsIHksIHpcIiwgdXgsIHV5LCB1eik7XG4gIGlmKCBNYXRoLmFicyh1eikgPCAwLjAwMDAwMSApIHJldHVybiBudWxsO1xuICByZXR1cm4ge3g6IHV4L3V6LCB5OiB1eS91en07XG59XG5cbmNvbnN0IHNjcmVlblRvTWFya2VyQ29vcmRpbmF0ZSA9IChtb2RlbFZpZXdQcm9qZWN0aW9uVHJhbnNmb3JtLCBzeCwgc3kpID0+IHtcbiAgY29uc3QgYzExID0gbW9kZWxWaWV3UHJvamVjdGlvblRyYW5zZm9ybVsyXVswXSAqIHN4IC0gbW9kZWxWaWV3UHJvamVjdGlvblRyYW5zZm9ybVswXVswXTtcbiAgY29uc3QgYzEyID0gbW9kZWxWaWV3UHJvamVjdGlvblRyYW5zZm9ybVsyXVsxXSAqIHN4IC0gbW9kZWxWaWV3UHJvamVjdGlvblRyYW5zZm9ybVswXVsxXTtcbiAgY29uc3QgYzIxID0gbW9kZWxWaWV3UHJvamVjdGlvblRyYW5zZm9ybVsyXVswXSAqIHN5IC0gbW9kZWxWaWV3UHJvamVjdGlvblRyYW5zZm9ybVsxXVswXTtcbiAgY29uc3QgYzIyID0gbW9kZWxWaWV3UHJvamVjdGlvblRyYW5zZm9ybVsyXVsxXSAqIHN5IC0gbW9kZWxWaWV3UHJvamVjdGlvblRyYW5zZm9ybVsxXVsxXTtcbiAgY29uc3QgYjEgID0gbW9kZWxWaWV3UHJvamVjdGlvblRyYW5zZm9ybVswXVszXSAtIG1vZGVsVmlld1Byb2plY3Rpb25UcmFuc2Zvcm1bMl1bM10gKiBzeDtcbiAgY29uc3QgYjIgID0gbW9kZWxWaWV3UHJvamVjdGlvblRyYW5zZm9ybVsxXVszXSAtIG1vZGVsVmlld1Byb2plY3Rpb25UcmFuc2Zvcm1bMl1bM10gKiBzeTtcblxuICBjb25zdCBtID0gYzExICogYzIyIC0gYzEyICogYzIxO1xuICByZXR1cm4ge1xuICAgIHg6IChjMjIgKiBiMSAtIGMxMiAqIGIyKSAvIG0sXG4gICAgeTogKGMxMSAqIGIyIC0gYzIxICogYjEpIC8gbVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzY3JlZW5Ub01hcmtlckNvb3JkaW5hdGUsXG4gIGdldFByb2plY3Rpb25UcmFuc2Zvcm0sXG4gIGJ1aWxkTW9kZWxWaWV3UHJvamVjdGlvblRyYW5zZm9ybSxcbiAgYXBwbHlNb2RlbFZpZXdQcm9qZWN0aW9uVHJhbnNmb3JtLFxuICBjb21wdXRlU2NyZWVuQ29vcmRpYXRlXG59XG4iLCJjb25zdCB7cmVzaXplfSA9IHJlcXVpcmUoXCIuL3V0aWxzL2ltYWdlcy5qc1wiKTtcblxuY29uc3QgREVGQVVMVF9EUEkgPSA3MjtcbmNvbnN0IE1JTl9JTUFHRV9QSVhFTF9TSVpFID0gMjg7XG5cbi8vIHJldHVybiBsaXN0IG9mIHtkYXRhLCB3aWR0aCwgaGVpZ2h0LCBkcGl9XG5jb25zdCBidWlsZEltYWdlTGlzdCA9IChpbnB1dEltYWdlKSA9PiB7XG4gIGNvbnN0IGRwaSA9IERFRkFVTFRfRFBJO1xuICBjb25zdCBtaW5EcGkgPSBNYXRoLmZsb29yKDEuMCAqIE1JTl9JTUFHRV9QSVhFTF9TSVpFIC8gTWF0aC5taW4oaW5wdXRJbWFnZS53aWR0aCwgaW5wdXRJbWFnZS5oZWlnaHQpICogZHBpICogMTAwMCkgLyAxMDAwO1xuICBjb25zdCBkcGlMaXN0ID0gW107XG5cbiAgbGV0IGMgPSBtaW5EcGk7XG4gIHdoaWxlICh0cnVlKSB7XG4gICAgZHBpTGlzdC5wdXNoKGMpO1xuICAgIGMgKj0gTWF0aC5wb3coMi4wLCAxLjAvMy4wKTtcbiAgICBjID0gTWF0aC5mcm91bmQoYyk7IC8vIGNhbiByZW1vdmUgdGhpcyBsaW5lIGluIHByb2R1Y3Rpb24uIHRyeWluZyB0byByZXByb2R1Y2UgdGhlIHNhbWUgcmVzdWx0IGFzIGFydG9vbGtpdCwgd2hpY2ggdXNlIGZsb2F0LlxuICAgIGlmIChjID49IGRwaSAqIDAuOTUpIHtcbiAgICAgIGMgPSBkcGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgZHBpTGlzdC5wdXNoKGMpO1xuICBkcGlMaXN0LnJldmVyc2UoKTtcblxuICBjb25zdCBpbWFnZUxpc3QgPSBbXTsgLy8gbGlzdCBvZiB7ZGF0YTogW3dpZHRoIHggaGVpZ2h0XSwgd2lkdGgsIGhlaWdodH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBkcGlMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgdyA9IGlucHV0SW1hZ2Uud2lkdGggKiBkcGlMaXN0W2ldIC8gZHBpO1xuICAgIGNvbnN0IGggPSBpbnB1dEltYWdlLmhlaWdodCAqIGRwaUxpc3RbaV0gLyBkcGk7XG4gICAgaW1hZ2VMaXN0LnB1c2goT2JqZWN0LmFzc2lnbihyZXNpemUoe2ltYWdlOiBpbnB1dEltYWdlLCByYXRpbzogZHBpTGlzdFtpXS9kcGl9KSwge2RwaTogZHBpTGlzdFtpXX0pKTtcbiAgfVxuXG4gIHJldHVybiBpbWFnZUxpc3Q7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBidWlsZEltYWdlTGlzdFxufVxuIiwiY29uc3Qge3Jlc2l6ZX0gPSByZXF1aXJlKFwiLi91dGlscy9pbWFnZXMuanNcIik7XG5jb25zdCB7YnVpbGRJbWFnZUxpc3R9ID0gcmVxdWlyZSgnLi9pbWFnZS1saXN0LmpzJyk7XG5jb25zdCB7TWF0Y2hlciwgY29tcGlsZU1hdGNoaW5nfSA9IHJlcXVpcmUoJy4vbWF0Y2hpbmcvbWF0Y2hlci5qcycpO1xuY29uc3Qge1RyYWNrZXIsIGNvbXBpbGVUcmFja2luZ30gPSByZXF1aXJlKCcuL3RyYWNraW5nL3RyYWNrZXIuanMnKTtcblxuY2xhc3MgSW1hZ2VUYXJnZXQge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgbGV0IGltYWdlTGlzdDtcbiAgICBsZXQgdGFyZ2V0SW1hZ2U7XG4gICAgbGV0IG1hdGNoaW5nRGF0YTtcbiAgICBsZXQgdHJhY2tpbmdEYXRhO1xuXG4gICAgaWYgKG9wdGlvbnMudHlwZSA9PT0gJ2NvbXBpbGVkJykge1xuICAgICAgdGFyZ2V0SW1hZ2UgPSBvcHRpb25zLmlucHV0LnRhcmdldEltYWdlO1xuICAgICAgbWF0Y2hpbmdEYXRhID0gb3B0aW9ucy5pbnB1dC5tYXRjaGluZ0RhdGE7XG4gICAgICB0cmFja2luZ0RhdGEgPSBvcHRpb25zLmlucHV0LnRyYWNraW5nRGF0YTtcbiAgICAgIGltYWdlTGlzdCA9IGJ1aWxkSW1hZ2VMaXN0KHRhcmdldEltYWdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGFyZ2V0SW1hZ2UgPSBvcHRpb25zLmlucHV0O1xuICAgICAgaW1hZ2VMaXN0ID0gYnVpbGRJbWFnZUxpc3QodGFyZ2V0SW1hZ2UpO1xuICAgICAgbWF0Y2hpbmdEYXRhID0gY29tcGlsZU1hdGNoaW5nKHtpbWFnZUxpc3R9KTtcbiAgICAgIHRyYWNraW5nRGF0YSA9IGNvbXBpbGVUcmFja2luZyh7aW1hZ2VMaXN0fSk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKFwiaW1hZ2UgdGFyZ2V0IGNvbnNkdHJ1Y3RvclwiLCBpbWFnZUxpc3QsIG1hdGNoaW5nRGF0YSwgdHJhY2tpbmdEYXRhKTtcbiAgICB0aGlzLm1hdGNoZXIgPSBuZXcgTWF0Y2hlcihtYXRjaGluZ0RhdGEpO1xuICAgIC8vdGhpcy50cmFja2VyID0gbmV3IFRyYWNrZXIoaW1hZ2VMaXN0KTtcbiAgfVxuXG4gIHByb2Nlc3MocXVlcnlJbWFnZSkge1xuICAgIC8vY29uc3QgcHJvY2Vzc0ltYWdlID0gT2JqZWN0LmFzc2lnbihyZXNpemUoe2ltYWdlOiBxdWVyeUltYWdlLCByYXRpbzogMC41fSksIHtkcGk6IDcyfSk7XG4gICAgY29uc3QgcHJvY2Vzc0ltYWdlID0gT2JqZWN0LmFzc2lnbihyZXNpemUoe2ltYWdlOiBxdWVyeUltYWdlLCByYXRpbzogMX0pLCB7ZHBpOiA3Mn0pO1xuICAgIGNvbnN0IG1vZGVsVmlld1RyYW5zZm9ybSA9IHRoaXMubWF0Y2hlci5tYXRjaChwcm9jZXNzSW1hZ2UpO1xuICAgIHJldHVybiBtb2RlbFZpZXdUcmFuc2Zvcm07XG4gIH1cbn1cblxuY29uc3QgY29tcGlsZSA9ICh0YXJnZXRJbWFnZSkgPT4ge1xuICBjb25zdCBpbWFnZUxpc3QgPSBidWlsZEltYWdlTGlzdCh0YXJnZXRJbWFnZSk7XG4gIGNvbnN0IG1hdGNoaW5nRGF0YSA9IGNvbXBpbGVNYXRjaGluZyh7aW1hZ2VMaXN0fSk7XG4gIGNvbnN0IHRyYWNraW5nRGF0YSA9IGNvbXBpbGVUcmFja2luZyh7aW1hZ2VMaXN0fSk7XG4gIHJldHVybiB7dGFyZ2V0SW1hZ2UsIG1hdGNoaW5nRGF0YSwgdHJhY2tpbmdEYXRhfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIEltYWdlVGFyZ2V0LFxuICBjb21waWxlXG59XG4iLCJjb25zdCB7dXBzYW1wbGVCaWxpbmVhciwgZG93bnNhbXBsZUJpbGluZWFyfSA9IHJlcXVpcmUoJy4uL3V0aWxzL2ltYWdlcy5qcycpO1xuXG5jb25zdCBtTGFwbGFjaWFuVGhyZXNob2xkID0gMztcbmNvbnN0IG1NYXhTdWJwaXhlbERpc3RhbmNlU3FyID0gMyAqIDM7XG5jb25zdCBsYXBsYWNpYW5TcXJUaHJlc2hvbGQgPSBtTGFwbGFjaWFuVGhyZXNob2xkICogbUxhcGxhY2lhblRocmVzaG9sZDtcbmNvbnN0IG1FZGdlVGhyZXNob2xkID0gNC4wO1xuY29uc3QgaGVzc2lhblRocmVzaG9sZCA9ICgobUVkZ2VUaHJlc2hvbGQrMSkgKiAobUVkZ2VUaHJlc2hvbGQrMSkgLyBtRWRnZVRocmVzaG9sZCk7XG5jb25zdCBtTWF4TnVtRmVhdHVyZVBvaW50cyA9IDUwMDtcbmNvbnN0IG1OdW1CdWNrZXRzID0gMTA7IC8vIHBlciBkaW1lbnNpb25cblxuY29uc3QgbU51bUJpbnMgPSAzNjsgLy8gPSBtT3JpZW50YXRpb25Bc3NpZ25tZW50XG5jb25zdCBtR2F1c3NpYW5FeHBhbnNpb25GYWN0b3IgPSAzLjA7XG5jb25zdCBtU3VwcG9ydFJlZ2lvbkV4cGFuc2lvbkZhY3RvciA9IDEuNTtcbmNvbnN0IG1OdW1TbW9vdGhpbmdJdGVyYXRpb25zID0gNTtcbmNvbnN0IG1QZWFrVGhyZXNob2xkID0gMC44O1xuXG5jb25zdCBPTkVfT1ZFUl8yUEkgPSAwLjE1OTE1NDk0MzA5MTg5NTtcblxuLy8gRGV0ZWN0IG1pbmltYSBhbmQgbWF4aW11bSBpbiBMYXBsYWNpYW4gaW1hZ2VzXG5jb25zdCBkZXRlY3QgPSAoe2dhdXNzaWFuUHlyYW1pZCwgZG9nUHlyYW1pZH0pID0+IHtcbiAgY29uc3Qgb3JpZ2luYWxXaWR0aCA9IGRvZ1B5cmFtaWQuaW1hZ2VzWzBdLndpZHRoO1xuICBjb25zdCBvcmlnaW5hbEhlaWdodCA9IGRvZ1B5cmFtaWQuaW1hZ2VzWzBdLmhlaWdodDtcblxuICBjb25zdCBtSyA9IE1hdGgucG93KDIsIDEuMCAvIChnYXVzc2lhblB5cmFtaWQubnVtU2NhbGVzUGVyT2N0YXZlcy0xKSk7XG5cbiAgY29uc3QgZmVhdHVyZVBvaW50cyA9IFtdO1xuICBjb25zdCBzdWJQaXhlbEZlYXR1cmVQb2ludHMgPSBbXTtcblxuICBmb3IgKGxldCBrID0gMTsgayA8IGRvZ1B5cmFtaWQuaW1hZ2VzLmxlbmd0aCAtIDE7IGsrKykge1xuICAgIGxldCBpbWFnZTAgPSBkb2dQeXJhbWlkLmltYWdlc1trLTFdO1xuICAgIGxldCBpbWFnZTEgPSBkb2dQeXJhbWlkLmltYWdlc1trXTtcbiAgICBsZXQgaW1hZ2UyID0gZG9nUHlyYW1pZC5pbWFnZXNbaysxXTtcblxuICAgIGNvbnN0IG9jdGF2ZSA9IE1hdGguZmxvb3IoayAvIGRvZ1B5cmFtaWQubnVtU2NhbGVzUGVyT2N0YXZlcyk7XG4gICAgY29uc3Qgc2NhbGUgPSBrICUgZG9nUHlyYW1pZC5udW1TY2FsZXNQZXJPY3RhdmVzO1xuXG4gICAgbGV0IGhhc1Vwc2FtcGxlID0gZmFsc2U7XG4gICAgbGV0IGhhc1BhZE9uZVdpZHRoID0gZmFsc2U7XG4gICAgbGV0IGhhc1BhZE9uZUhlaWdodCA9IGZhbHNlO1xuXG4gICAgaWYgKCBNYXRoLmZsb29yKGltYWdlMC53aWR0aC8yKSA9PSBpbWFnZTEud2lkdGgpIHtcbiAgICAgIGltYWdlMCA9IGRvd25zYW1wbGVCaWxpbmVhcih7aW1hZ2U6IGltYWdlMH0pO1xuICAgIH1cblxuICAgIGlmICggTWF0aC5mbG9vcihpbWFnZTEud2lkdGgvMikgPT0gaW1hZ2UyLndpZHRoKSB7XG4gICAgICBoYXNVcHNhbXBsZSA9IHRydWU7XG4gICAgICBoYXNQYWRPbmVXaWR0aCA9IGltYWdlMS53aWR0aCAlIDIgPT09IDE7XG4gICAgICBoYXNQYWRPbmVIZWlnaHQgPSBpbWFnZTEuaGVpZ2h0ICUgMiA9PT0gMTtcbiAgICAgIGltYWdlMiA9IHVwc2FtcGxlQmlsaW5lYXIoe2ltYWdlOiBpbWFnZTIsIHBhZE9uZVdpZHRoOiBoYXNQYWRPbmVXaWR0aCwgcGFkT25lSGVpZ2h0OiBoYXNQYWRPbmVIZWlnaHR9KTtcbiAgICB9XG5cbiAgICBjb25zdCB3aWR0aCA9IGltYWdlMS53aWR0aDtcbiAgICBjb25zdCBoZWlnaHQgPSBpbWFnZTEuaGVpZ2h0O1xuXG4gICAgY29uc3QgbmVpZ2hib3VycyA9IFtcbiAgICAgIDAsIC0xLCAxLFxuICAgICAgLWltYWdlMS53aWR0aCwgLWltYWdlMS53aWR0aC0xLCAtaW1hZ2UxLndpZHRoKzEsXG4gICAgICBpbWFnZTEud2lkdGgsIGltYWdlMS53aWR0aC0xLCBpbWFnZTEud2lkdGgrMVxuICAgIF07XG5cbiAgICAvLyBJbiB1cHNhbXBsZSBpbWFnZSwgaWdub3JlIHRoZSBib3JkZXJcbiAgICAvLyBpdCdzIHBvc3NpYmxlIHRvIGZ1cnRoZXIgcGFkIG9uZSBtb3JlIGxpbmUgKGkuZS4gdXBzYWNhbGUgMngyIC0+IDV4NSkgYXQgdGhlIGVuZCwgc28gaWdub3JlIG9uZSBtb3JlIGxpbmVcbiAgICBsZXQgc3RhcnRJID0gaGFzVXBzYW1wbGU/IDI6IDE7XG4gICAgbGV0IHN0YXJ0SiA9IHN0YXJ0STtcblxuICAgIC8vIHNob3VsZCBpdCBiZSBcImltYWdlMS53aWR0aCAtMlwiID8gYnV0IHRoaXMgeWllbGQgY29uc2lzdGVudCByZXN1bHQgd2l0aCBhcnRvb2xraXRcbiAgICBsZXQgZW5kSSA9IGhhc1Vwc2FtcGxlPyBpbWFnZTEud2lkdGggLSAzOiBpbWFnZTEud2lkdGggLSAxO1xuICAgIGxldCBlbmRKID0gaGFzVXBzYW1wbGU/IGltYWdlMS5oZWlnaHQgLSAzOiBpbWFnZTEuaGVpZ2h0IC0gMTtcbiAgICBpZiAoaGFzUGFkT25lV2lkdGgpIGVuZEkgLT0gMTtcbiAgICBpZiAoaGFzUGFkT25lSGVpZ2h0KSBlbmRKIC09IDE7XG5cbiAgICBmb3IgKGxldCBqID0gc3RhcnRKOyBqIDwgZW5kSjsgaisrKSB7XG4gICAgICBmb3IgKGxldCBpID0gc3RhcnRJOyBpIDwgZW5kSTsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHBvcyA9IGoqaW1hZ2UxLndpZHRoICsgaTtcbiAgICAgICAgY29uc3QgdiA9IGltYWdlMS5kYXRhW3Bvc107XG5cbiAgICAgICAgaWYgKHYqdiA8IGxhcGxhY2lhblNxclRocmVzaG9sZCkgY29udGludWU7XG5cbiAgICAgICAgbGV0IGlzTWF4ID0gdHJ1ZTtcbiAgICAgICAgZm9yIChsZXQgZCA9IDA7IGQgPCBuZWlnaGJvdXJzLmxlbmd0aDsgZCsrKSB7XG4gICAgICAgICAgaWYgKHYgPD0gaW1hZ2UwLmRhdGFbcG9zK25laWdoYm91cnNbZF1dKSB7aXNNYXggPSBmYWxzZTsgYnJlYWt9O1xuICAgICAgICAgIGlmICh2IDw9IGltYWdlMi5kYXRhW3BvcytuZWlnaGJvdXJzW2RdXSkge2lzTWF4ID0gZmFsc2U7IGJyZWFrfTtcbiAgICAgICAgICBpZiAoZCAhPT0gMCAmJiB2IDw9IGltYWdlMS5kYXRhW3BvcytuZWlnaGJvdXJzW2RdXSkge2lzTWF4ID0gZmFsc2U7IGJyZWFrfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpc01pbiA9IHRydWU7XG4gICAgICAgIGZvciAobGV0IGQgPSAwOyBkIDwgbmVpZ2hib3Vycy5sZW5ndGg7IGQrKykge1xuICAgICAgICAgIGlmICh2ID49IGltYWdlMC5kYXRhW3BvcytuZWlnaGJvdXJzW2RdXSkge2lzTWluID0gZmFsc2U7IGJyZWFrfTtcbiAgICAgICAgICBpZiAodiA+PSBpbWFnZTIuZGF0YVtwb3MrbmVpZ2hib3Vyc1tkXV0pIHtpc01pbiA9IGZhbHNlOyBicmVha307XG4gICAgICAgICAgaWYgKGQgIT09IDAgJiYgdiA+PSBpbWFnZTEuZGF0YVtwb3MrbmVpZ2hib3Vyc1tkXV0pIHtpc01pbiA9IGZhbHNlOyBicmVha307XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWlzTWF4ICYmICFpc01pbikgY29udGludWU7IC8vIGV4dHJlbWEgLT4gZmVhdHVyZSBwb2ludFxuXG4gICAgICAgIC8vIG9yaWdpbmFsIHggPSB4KjJebiArIDJeKG4tMSkgLSAwLjVcbiAgICAgICAgLy8gb3JpZ2luYWwgeSA9IHkqMl5uICsgMl4obi0xKSAtIDAuNVxuICAgICAgICBjb25zdCBvcmlnaW5hbFggPSBpICogTWF0aC5wb3coMiwgb2N0YXZlKSArIE1hdGgucG93KDIsIG9jdGF2ZS0xKSAtIDAuNTtcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxZID0gaiAqIE1hdGgucG93KDIsIG9jdGF2ZSkgKyBNYXRoLnBvdygyLCBvY3RhdmUtMSkgLSAwLjU7XG4gICAgICAgIGNvbnN0IHNpZ21hID0gX2VmZmVjdGl2ZVNpZ21hKHttSywgc2NhbGUsIG9jdGF2ZX0pO1xuXG4gICAgICAgIGZlYXR1cmVQb2ludHMucHVzaCh7XG4gICAgICAgICAgb2N0YXZlOiBvY3RhdmUsXG4gICAgICAgICAgc2NhbGU6IHNjYWxlLFxuICAgICAgICAgIHNjb3JlOiB2LFxuICAgICAgICAgIHg6IG9yaWdpbmFsWCxcbiAgICAgICAgICB5OiBvcmlnaW5hbFksXG4gICAgICAgICAgc2lnbWE6IHNpZ21hLFxuICAgICAgICB9KVxuXG4gICAgICAgIC8vIENvbXB1dGUgc3BhdGlhbCBkZXJpdmF0aXZlc1xuICAgICAgICBjb25zdCBkeCA9IDAuNSAqIChpbWFnZTEuZGF0YVtwb3MgKyAxXSAtIGltYWdlMS5kYXRhW3BvcyAtIDFdKTtcbiAgICAgICAgY29uc3QgZHkgPSAwLjUgKiAoaW1hZ2UxLmRhdGFbcG9zICsgd2lkdGhdIC0gaW1hZ2UxLmRhdGFbcG9zIC0gd2lkdGhdKTtcbiAgICAgICAgY29uc3QgZHh4ID0gaW1hZ2UxLmRhdGFbcG9zICsgMV0gKyBpbWFnZTEuZGF0YVtwb3MgLSAxXSAtIDIgKiBpbWFnZTEuZGF0YVtwb3NdO1xuICAgICAgICBjb25zdCBkeXkgPSBpbWFnZTEuZGF0YVtwb3MgKyB3aWR0aF0gKyBpbWFnZTEuZGF0YVtwb3MgLSB3aWR0aF0gLSAyICogaW1hZ2UxLmRhdGFbcG9zXTtcbiAgICAgICAgY29uc3QgZHh5ID0gMC4yNSAqIChpbWFnZTEuZGF0YVtwb3MgLSB3aWR0aCAtMV0gKyBpbWFnZTEuZGF0YVtwb3MgKyB3aWR0aCArIDFdIC0gaW1hZ2UxLmRhdGFbcG9zIC0gd2lkdGggKzFdIC0gaW1hZ2UxLmRhdGFbcG9zICsgd2lkdGggLSAxXSk7XG5cbiAgICAgICAgLy8gQ29tcHV0ZSBzY2FsZSBkZXJpdmF0ZXNcbiAgICAgICAgY29uc3QgZHMgPSAwLjUgKiAoaW1hZ2UyLmRhdGFbcG9zXSAtIGltYWdlMC5kYXRhW3Bvc10pO1xuICAgICAgICBjb25zdCBkc3MgPSBpbWFnZTIuZGF0YVtwb3NdICsgaW1hZ2UwLmRhdGFbcG9zXSAtIDIgKiBpbWFnZTEuZGF0YVtwb3NdO1xuICAgICAgICBjb25zdCBkeHMgPSAwLjI1ICogKChpbWFnZTAuZGF0YVtwb3MtMV0gLSBpbWFnZTAuZGF0YVtwb3MrMV0pICsgKC1pbWFnZTIuZGF0YVtwb3MtMV0gKyBpbWFnZTIuZGF0YVtwb3MrMV0pKTtcbiAgICAgICAgY29uc3QgZHlzID0gMC4yNSAqICgoaW1hZ2UwLmRhdGFbcG9zLXdpZHRoXSAtIGltYWdlMC5kYXRhW3Bvcyt3aWR0aF0pICsgKC1pbWFnZTIuZGF0YVtwb3Mtd2lkdGhdICsgaW1hZ2UyLmRhdGFbcG9zK3dpZHRoXSkpO1xuXG4gICAgICAgIC8vIEhlc3NpYW4gbWF0cml4XG4gICAgICAgIGNvbnN0IGhlc3NpYW4gPSBbXG4gICAgICAgICAgZHh4LCBkeHksIGR4cyxcbiAgICAgICAgICBkeHksIGR5eSwgZHlzLFxuICAgICAgICAgIGR4cywgZHlzLCBkc3NcbiAgICAgICAgXTtcblxuICAgICAgICAvLyBiXG4gICAgICAgIGNvbnN0IGIgPSBbXG4gICAgICAgICAgLWR4LFxuICAgICAgICAgIC1keSxcbiAgICAgICAgICAtZHNcbiAgICAgICAgXTtcblxuICAgICAgICAvLyBTb2x2ZSBIICogdSA9IGI7XG4gICAgICAgIGNvbnN0IHUgPSBfc29sdmVTeW1tZXRyaWMzMyh7QTogaGVzc2lhbiwgYjogYn0pO1xuICAgICAgICBpZiAodSA9PT0gbnVsbCkgY29udGludWU7IC8vIG5vIHNvbHV0aW9uXG5cbiAgICAgICAgLy8gSWYgcG9pbnRzIG1vdmUgdG9vIG11Y2ggaW4gdGhlIHN1Yi1waXhlbCB1cGRhdGUsIHRoZW4gdGhlIHBvaW50IHByb2JhYmx5IHVuc3RhYmxlLlxuICAgICAgICBpZiAodVswXSAqIHVbMF0gKyB1WzFdICogdVsxXSA+IG1NYXhTdWJwaXhlbERpc3RhbmNlU3FyKSBjb250aW51ZTtcblxuICAgICAgICAvLyBjb21wdXRlIGVkZ2Ugc2NvcmVcbiAgICAgICAgY29uc3QgZGV0ID0gKGR4eCAqIGR5eSkgLSAoZHh5ICogZHh5KTtcbiAgICAgICAgaWYgKGRldCA9PT0gMCkgY29udGludWU7XG5cbiAgICAgICAgY29uc3QgZWRnZVNjb3JlID0gKGR4eCArIGR5eSkgKiAoZHh4ICsgZHl5KSAvIGRldDtcbiAgICAgICAgaWYgKE1hdGguYWJzKGVkZ2VTY29yZSkgPj0gaGVzc2lhblRocmVzaG9sZCApIGNvbnRpbnVlO1xuXG4gICAgICAgIGNvbnN0IHNjb3JlID0gdiAtIChiWzBdICogdVswXSArIGJbMV0gKiB1WzFdICsgYlsyXSAqIHVbMl0pO1xuICAgICAgICBpZiAoc2NvcmUgKiBzY29yZSA8IGxhcGxhY2lhblNxclRocmVzaG9sZCkgY29udGludWU7XG5cbiAgICAgICAgY29uc3QgbmV3WCA9IG9yaWdpbmFsWCArIHVbMF0gKiBNYXRoLnBvdygyLCBvY3RhdmUpO1xuICAgICAgICBjb25zdCBuZXdZID0gb3JpZ2luYWxZICsgdVsxXSAqIE1hdGgucG93KDIsIG9jdGF2ZSk7XG4gICAgICAgIGlmIChuZXdYIDwgMCB8fCBuZXdYID49IG9yaWdpbmFsV2lkdGggfHwgbmV3WSA8IDAgfHwgbmV3WSA+PSBvcmlnaW5hbEhlaWdodCkgY29udGludWU7XG5cbiAgICAgICAgY29uc3Qgc3BTY2FsZSA9IE1hdGgubWluKE1hdGgubWF4KDAsIHNjYWxlICsgdVsyXSksIGRvZ1B5cmFtaWQubnVtU2NhbGVzUGVyT2N0YXZlcyk7XG4gICAgICAgIGNvbnN0IG5ld1NpZ21hID0gX2VmZmVjdGl2ZVNpZ21hKHtzY2FsZTogc3BTY2FsZSwgb2N0YXZlOiBvY3RhdmUsIG1LOiBtS30pO1xuXG4gICAgICAgIGxldCBuZXdPY3RhdmVYID0gbmV3WCAqICgxLjAgLyBNYXRoLnBvdygyLCBvY3RhdmUpKSArIDAuNSAqICgxLjAgLyBNYXRoLnBvdygyLCBvY3RhdmUpKSAtIDAuNTtcbiAgICAgICAgbGV0IG5ld09jdGF2ZVkgPSBuZXdZICogKDEuMCAvIE1hdGgucG93KDIsIG9jdGF2ZSkpICsgMC41ICogKDEuMCAvIE1hdGgucG93KDIsIG9jdGF2ZSkpIC0gMC41O1xuICAgICAgICBuZXdPY3RhdmVYID0gTWF0aC5mbG9vcihuZXdPY3RhdmVYICsgMC41KTtcbiAgICAgICAgbmV3T2N0YXZlWSA9IE1hdGguZmxvb3IobmV3T2N0YXZlWSArIDAuNSk7XG5cbiAgICAgICAgc3ViUGl4ZWxGZWF0dXJlUG9pbnRzLnB1c2goe1xuICAgICAgICAgIG9jdGF2ZTogb2N0YXZlLFxuICAgICAgICAgIHNjYWxlOiBzY2FsZSxcbiAgICAgICAgICBzcFNjYWxlOiBzcFNjYWxlLFxuICAgICAgICAgIHNjb3JlOiBzY29yZSxcbiAgICAgICAgICBlZGdlU2NvcmU6IGVkZ2VTY29yZSxcbiAgICAgICAgICB4OiBuZXdYLFxuICAgICAgICAgIHk6IG5ld1ksXG4gICAgICAgICAgc2lnbWE6IG5ld1NpZ21hLFxuICAgICAgICAgIG9jdGF2ZVg6IG5ld09jdGF2ZVgsXG4gICAgICAgICAgb2N0YXZlWTogbmV3T2N0YXZlWVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBjb25zdCBwcnVuZWRGZWF0dXJlUG9pbnRzID0gX3BydW5lRmVhdHVyZXMoe2ZlYXR1cmVQb2ludHM6IHN1YlBpeGVsRmVhdHVyZVBvaW50cywgd2lkdGg6IG9yaWdpbmFsV2lkdGgsIGhlaWdodDogb3JpZ2luYWxIZWlnaHR9KTtcblxuICAvLyBjb21wdXRlIGZlYXR1cmUgb3JpZW50YXRpb25zXG4gIGNvbnN0IGdyYWRpZW50cyA9IF9jb21wdXRlR3JhZGllbnRzKHtweXJhbWlkOiBnYXVzc2lhblB5cmFtaWR9KTtcblxuXG4gIGNvbnN0IG9yaWVudGVkRmVhdHVyZVBvaW50cyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHBydW5lZEZlYXR1cmVQb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBmcCA9IHBydW5lZEZlYXR1cmVQb2ludHNbaV07XG4gICAgY29uc3Qgb2N0YXZlU2lnbWEgPSBmcC5zaWdtYSAqICgxLjAgLyBNYXRoLnBvdygyLCBmcC5vY3RhdmUpKTtcblxuICAgIGNvbnN0IGdyYWRpZW50ID0gZ3JhZGllbnRzW2ZwLm9jdGF2ZSAqIGdhdXNzaWFuUHlyYW1pZC5udW1TY2FsZXNQZXJPY3RhdmVzICsgZnAuc2NhbGVdO1xuICAgIGNvbnN0IGFuZ2xlcyA9IF9jb21wdXRlT3JpZW50YXRpb24oe3g6IGZwLm9jdGF2ZVgsIHk6IGZwLm9jdGF2ZVksIHNpZ21hOiBvY3RhdmVTaWdtYSwgb2N0YXZlOiBmcC5vY3RhdmUsIHNjYWxlOiBmcC5zY2FsZSwgZ3JhZGllbnQ6IGdyYWRpZW50fSk7XG5cbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGFuZ2xlcy5sZW5ndGg7IGorKykge1xuICAgICAgb3JpZW50ZWRGZWF0dXJlUG9pbnRzLnB1c2goT2JqZWN0LmFzc2lnbih7XG4gICAgICAgIGFuZ2xlOiBhbmdsZXNbal1cbiAgICAgIH0sIHBydW5lZEZlYXR1cmVQb2ludHNbaV0pKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG9yaWVudGVkRmVhdHVyZVBvaW50cztcbiAgLy9yZXR1cm4ge2ZlYXR1cmVQb2ludHMsIHN1YlBpeGVsRmVhdHVyZVBvaW50cywgcHJ1bmVkRmVhdHVyZVBvaW50cywgb3JpZW50ZWRGZWF0dXJlUG9pbnRzfTtcbn1cblxuY29uc3QgX2NvbXB1dGVPcmllbnRhdGlvbiA9IChvcHRpb25zKSA9PiB7XG4gIGNvbnN0IHt4LCB5LCBzaWdtYSwgb2N0YXZlLCBzY2FsZSwgZ3JhZGllbnR9ID0gb3B0aW9ucztcblxuICBjb25zdCBnd1NpZ21hID0gTWF0aC5tYXgoMS4wLCBtR2F1c3NpYW5FeHBhbnNpb25GYWN0b3IgKiBzaWdtYSk7XG4gIGNvbnN0IGd3U2NhbGUgPSAtMS4wIC8gKDIgKiBnd1NpZ21hICogZ3dTaWdtYSk7XG5cbiAgY29uc3QgcmFkaXVzID0gbVN1cHBvcnRSZWdpb25FeHBhbnNpb25GYWN0b3IgKiBnd1NpZ21hO1xuICBjb25zdCByYWRpdXMyID0gTWF0aC5jZWlsKCByYWRpdXMgKiByYWRpdXMgKTtcblxuXG4gIGNvbnN0IHgwID0gTWF0aC5tYXgoMCwgeCAtIE1hdGguZmxvb3IocmFkaXVzICsgMC41KSk7XG4gIGNvbnN0IHgxID0gTWF0aC5taW4oZ3JhZGllbnQud2lkdGgtMSwgeCArIE1hdGguZmxvb3IocmFkaXVzICsgMC41KSk7XG4gIGNvbnN0IHkwID0gTWF0aC5tYXgoMCwgeSAtIE1hdGguZmxvb3IocmFkaXVzICsgMC41KSk7XG4gIGNvbnN0IHkxID0gTWF0aC5taW4oZ3JhZGllbnQuaGVpZ2h0LTEsIHkgKyBNYXRoLmZsb29yKHJhZGl1cyArIDAuNSkpO1xuXG4gIGNvbnN0IGhpc3RvZ3JhbSA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG1OdW1CaW5zOyBpKyspIHtcbiAgICBoaXN0b2dyYW0ucHVzaCgwKTtcbiAgfVxuXG4gIGZvciAobGV0IHlwID0geTA7IHlwIDw9IHkxOyB5cCsrKSB7XG4gICAgY29uc3QgZHkgPSB5cCAtIHk7XG4gICAgY29uc3QgZHkyID0gZHkgKiBkeTtcblxuICAgIGZvciAobGV0IHhwID0geDA7IHhwIDw9IHgxOyB4cCsrKSB7XG4gICAgICBjb25zdCBkeCA9IHhwIC0geDtcbiAgICAgIGNvbnN0IGR4MiA9IGR4ICogZHg7XG5cbiAgICAgIGNvbnN0IHIyID0gZHgyICsgZHkyO1xuICAgICAgaWYocjIgPiByYWRpdXMyKSBjb250aW51ZTsgLy8gb25seSB1c2UgdGhlIGdyYWRpZW50cyB3aXRoaW4gdGhlIGNpcmN1bGFyIHdpbmRvd1xuXG4gICAgICBjb25zdCBncmFkaWVudFZhbHVlID0gZ3JhZGllbnQudmFsdWVzWyB5cCAqIGdyYWRpZW50LndpZHRoICsgeHAgXTtcbiAgICAgIGNvbnN0IGFuZ2xlID0gZ3JhZGllbnRWYWx1ZS5hbmdsZTtcbiAgICAgIGNvbnN0IG1hZyA9IGdyYWRpZW50VmFsdWUubWFnO1xuXG4gICAgICBjb25zdCB3ID0gX2Zhc3RFeHA2KHt4OiByMiAqIGd3U2NhbGV9KTsgLy8gQ29tcHV0ZSB0aGUgZ2F1c3NpYW4gd2VpZ2h0IGJhc2VkIG9uIGRpc3RhbmNlIGZyb20gY2VudGVyIG9mIGtleXBvaW50XG5cbiAgICAgIGNvbnN0IGZiaW4gID0gbU51bUJpbnMgKiBhbmdsZSAqIE9ORV9PVkVSXzJQSTtcblxuICAgICAgY29uc3QgYmluID0gTWF0aC5mbG9vcihmYmluIC0gMC41KTtcbiAgICAgIGNvbnN0IHcyID0gZmJpbiAtIGJpbiAtIDAuNTtcbiAgICAgIGNvbnN0IHcxID0gKDEuMCAtIHcyKTtcbiAgICAgIGNvbnN0IGIxID0gKGJpbiArIG1OdW1CaW5zKSAlIG1OdW1CaW5zO1xuICAgICAgY29uc3QgYjIgPSAoYmluICsgMSkgJSBtTnVtQmlucztcblxuICAgICAgaGlzdG9ncmFtW2IxXSArPSB3MSAqIHcgKiBtYWc7XG4gICAgICBoaXN0b2dyYW1bYjJdICs9IHcyICogdyAqIG1hZztcbiAgICB9XG4gIH1cbiAgLy9jb25zb2xlLmxvZyhcIm9yaTogXCIsIHgsIHksIG9jdGF2ZSwgc2NhbGUsIGd3U2lnbWEsIGd3U2NhbGUsIHJhZGl1cywgcmFkaXVzMiwgSlNPTi5zdHJpbmdpZnkoaGlzdG9ncmFtKSk7XG5cbiAgLy8gVGhlIG9yaWVudGF0aW9uIGhpc3RvZ3JhbSBpcyBzbW9vdGhlZCB3aXRoIGEgR2F1c3NpYW5cbiAgLy8gc2lnbWE9MVxuICBjb25zdCBrZXJuZWwgPSBbMC4yNzQwNjg2MTkwNjExOTcsIDAuNDUxODYyNzYxODc3NjA2LCAwLjI3NDA2ODYxOTA2MTE5N107XG4gIGZvcihsZXQgaSA9IDA7IGkgPCBtTnVtU21vb3RoaW5nSXRlcmF0aW9uczsgaSsrKSB7XG4gICAgY29uc3Qgb2xkID0gW107XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBoaXN0b2dyYW0ubGVuZ3RoOyBqKyspIHtcbiAgICAgIG9sZFtqXSA9IGhpc3RvZ3JhbVtqXTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGhpc3RvZ3JhbS5sZW5ndGg7IGorKykge1xuICAgICAgaGlzdG9ncmFtW2pdID0ga2VybmVsWzBdICogb2xkWyhqIC0gMSArIGhpc3RvZ3JhbS5sZW5ndGgpICUgaGlzdG9ncmFtLmxlbmd0aF1cbiAgICAgICAgICAgICAgICAgICAgKyBrZXJuZWxbMV0gKiBvbGRbal1cbiAgICAgICAgICAgICAgICAgICAgKyBrZXJuZWxbMl0gKiBvbGRbKGorMSkgJSBoaXN0b2dyYW0ubGVuZ3RoXTtcbiAgICB9XG4gIH1cblxuICAvLyBGaW5kIHRoZSBwZWFrIG9mIHRoZSBoaXN0b2dyYW0uXG4gIGxldCBtYXhIZWlnaHQgPSAwO1xuICBmb3IobGV0IGkgPSAwOyBpIDwgbU51bUJpbnM7IGkrKykge1xuICAgIGlmKGhpc3RvZ3JhbVtpXSA+IG1heEhlaWdodCkge1xuICAgICAgbWF4SGVpZ2h0ID0gaGlzdG9ncmFtW2ldO1xuICAgIH1cbiAgfVxuXG4gIGlmIChtYXhIZWlnaHQgPT09IDApIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICAvLyBGaW5kIGFsbCB0aGUgcGVha3MuXG4gIGNvbnN0IGFuZ2xlcyA9IFtdO1xuICBmb3IobGV0IGkgPSAwOyBpIDwgbU51bUJpbnM7IGkrKykge1xuICAgIGNvbnN0IHByZXYgPSAoaSAtIDEgKyBoaXN0b2dyYW0ubGVuZ3RoKSAlIGhpc3RvZ3JhbS5sZW5ndGg7XG4gICAgY29uc3QgbmV4dCA9IChpICsgMSkgJSBoaXN0b2dyYW0ubGVuZ3RoO1xuXG4gICAgaWYgKGhpc3RvZ3JhbVtpXSA+IG1QZWFrVGhyZXNob2xkICogbWF4SGVpZ2h0ICYmIGhpc3RvZ3JhbVtpXSA+IGhpc3RvZ3JhbVtwcmV2XSAmJiBoaXN0b2dyYW1baV0gPiBoaXN0b2dyYW1bbmV4dF0pIHtcbiAgICAgIC8vIFRoZSBkZWZhdWx0IHN1Yi1waXhlbCBiaW4gbG9jYXRpb24gaXMgdGhlIGRpc2NyZXRlIGxvY2F0aW9uIGlmIHRoZSBxdWFkcmF0aWMgZml0dGluZyBmYWlscy5cbiAgICAgIGxldCBmYmluID0gaTtcblxuICAgICAgY29uc3QgcmV0ID0gX3F1YWRyYXRpYzNQb2ludHMoe1xuICAgICAgICBwMTogW2ktMSwgaGlzdG9ncmFtW3ByZXZdXSxcbiAgICAgICAgcDI6IFtpLCBoaXN0b2dyYW1baV1dLFxuICAgICAgICBwMzogW2krMSwgaGlzdG9ncmFtW25leHRdXVxuICAgICAgfSk7XG5cbiAgICAgIGlmIChyZXQgIT09IG51bGwpIHtcbiAgICAgICAgY29uc3Qge0EsIEIsIEN9ID0gcmV0O1xuXG4gICAgICAgIC8vIEZpbmQgdGhlIGNyaXRpY2FsIHBvaW50IG9mIGEgcXVhZHJhdGljLiB5ID0gQSp4XjIgKyBCKnggKyBDXG4gICAgICAgIGlmIChBICE9IDApIHtcbiAgICAgICAgICBmYmluID0gLUIgLyAoMiAqIEEpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxldCBhbiA9ICAyLjAgKiBNYXRoLlBJICogKChmYmluICsgMC41ICsgbU51bUJpbnMpIC8gbU51bUJpbnMpO1xuICAgICAgd2hpbGUgKGFuID4gMi4wICogTWF0aC5QSSkgeyAvLyBtb2R1bGFcbiAgICAgICAgYW4gLT0gMi4wICogTWF0aC5QSTtcbiAgICAgIH1cbiAgICAgIGFuZ2xlcy5wdXNoKGFuKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFuZ2xlcztcbn1cblxuXG5cbi8qKlxuICogRml0IGEgcXVhdHJhdGljIHRvIDMgcG9pbnRzLiBUaGUgc3lzdGVtIG9mIGVxdWF0aW9ucyBpczpcbiAqXG4gKiB5MCA9IEEqeDBeMiArIEIqeDAgKyBDXG4gKiB5MSA9IEEqeDFeMiArIEIqeDEgKyBDXG4gKiB5MiA9IEEqeDJeMiArIEIqeDIgKyBDXG4gKlxuICogVGhpcyBzeXN0ZW0gb2YgZXF1YXRpb25zIGlzIHNvbHZlZCBmb3IgQSxCLEMuXG4gKi9cbmNvbnN0IF9xdWFkcmF0aWMzUG9pbnRzID0gKG9wdGlvbnMpID0+IHtcbiAgY29uc3Qge3AxLCBwMiwgcDN9ID0gb3B0aW9ucztcbiAgY29uc3QgZDEgPSAocDNbMF0tcDJbMF0pKihwM1swXS1wMVswXSk7XG4gIGNvbnN0IGQyID0gKHAxWzBdLXAyWzBdKSoocDNbMF0tcDFbMF0pO1xuICBjb25zdCBkMyA9IHAxWzBdLXAyWzBdO1xuXG4gIC8vIElmIGFueSBvZiB0aGUgZGVub21pbmF0b3JzIGFyZSB6ZXJvIHRoZW4gcmV0dXJuIEZBTFNFLlxuICBpZiAoZDEgPT0gMCB8fCBkMiA9PSAwIHx8IGQzID09IDApIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IGEgPSBwMVswXSpwMVswXTtcbiAgY29uc3QgYiA9IHAyWzBdKnAyWzBdO1xuXG4gIC8vIFNvbHZlIGZvciB0aGUgY29lZmZpY2llbnRzIEEsQixDXG4gIGNvbnN0IEEgPSAoKHAzWzFdLXAyWzFdKS9kMSktKChwMVsxXS1wMlsxXSkvZDIpO1xuICBjb25zdCBCID0gKChwMVsxXS1wMlsxXSkrKEEqKGItYSkpKS9kMztcbiAgY29uc3QgQyA9IHAxWzFdLShBKmEpLShCKnAxWzBdKTtcblxuICByZXR1cm4ge0EsIEIsIEN9O1xufVxuXG4vKipcbiAqIDAuMDElIGVycm9yIGF0IDEuMDMwXG4gKiAwLjEwJSBlcnJvciBhdCAxLjUyMFxuICogMS4wMCUgZXJyb3IgYXQgMi4zMzBcbiAqIDUuMDAlIGVycm9yIGF0IDMuMjg1XG4gKi9cbmNvbnN0IF9mYXN0RXhwNiA9IChvcHRpb25zKSA9PiB7XG4gIGNvbnN0IHt4fSA9IG9wdGlvbnM7XG4gIHJldHVybiAoNzIwK3gqKDcyMCt4KigzNjAreCooMTIwK3gqKDMwK3gqKDYreCkpKSkpKSowLjAwMTM4ODg4ODg7XG59XG5cbmNvbnN0IF9jb21wdXRlR3JhZGllbnRzID0gKG9wdGlvbnMpID0+IHtcbiAgY29uc3Qge3B5cmFtaWR9ID0gb3B0aW9ucztcbiAgY29uc3QgZ3JhZGllbnRzID0gW107XG5cbiAgZm9yIChsZXQgayA9IDA7IGsgPCBweXJhbWlkLmltYWdlcy5sZW5ndGg7IGsrKykge1xuICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xuICAgIGNvbnN0IGltYWdlID0gcHlyYW1pZC5pbWFnZXNba107XG5cbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGltYWdlLmhlaWdodDsgaisrKSB7XG4gICAgICBjb25zdCBwcmV2SiA9IGogPiAwPyBqIC0gMTogajtcbiAgICAgIGNvbnN0IG5leHRKID0gaiA8IGltYWdlLmhlaWdodCAtIDE/IGogKyAxOiBqO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGltYWdlLndpZHRoOyBpKyspIHtcbiAgICAgICAgY29uc3QgcHJldkkgPSBpID4gMD8gaSAtIDE6IGk7XG4gICAgICAgIGNvbnN0IG5leHRJID0gaSA8IGltYWdlLndpZHRoIC0gMT8gaSArIDE6IGk7XG4gICAgICAgIGNvbnN0IGR4ID0gaW1hZ2UuZGF0YVtqICogaW1hZ2Uud2lkdGggKyBuZXh0SV0gLSBpbWFnZS5kYXRhW2ogKiBpbWFnZS53aWR0aCArIHByZXZJXTtcbiAgICAgICAgY29uc3QgZHkgPSBpbWFnZS5kYXRhW25leHRKICogaW1hZ2Uud2lkdGggKyBpXSAtIGltYWdlLmRhdGFbcHJldkogKiBpbWFnZS53aWR0aCArIGldO1xuXG4gICAgICAgIHZhbHVlcy5wdXNoKHtcbiAgICAgICAgICBhbmdsZTogTWF0aC5hdGFuMihkeSwgZHgpICsgTWF0aC5QSSxcbiAgICAgICAgICBtYWc6IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSlcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIGdyYWRpZW50cy5wdXNoKHtcbiAgICAgIHdpZHRoOiBpbWFnZS53aWR0aCxcbiAgICAgIGhlaWdodDogaW1hZ2UuaGVpZ2h0LFxuICAgICAgdmFsdWVzOiB2YWx1ZXNcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gZ3JhZGllbnRzO1xufVxuXG5jb25zdCBfcHJ1bmVGZWF0dXJlcyA9IChvcHRpb25zKSA9PiB7XG4gIGNvbnN0IHtmZWF0dXJlUG9pbnRzLCB3aWR0aCwgaGVpZ2h0fSA9IG9wdGlvbnM7XG5cbiAgLy8gTm90ZTogc2VlbXMgbm90IHRvIGJlIGEgY29uc2lzdGVudCBpbXBsZW1lbnRhdGlvbi4gTWlnaHQgbmVlZCB0byByZW1vdmUgdGhpcyBsaW5lXG4gIC8vICAgVGhlIGZlYXR1cmUgcG9pbnRzIGFyZSBwcnVuZSBwZXIgYnVja2V0LCBlLmcuIGlmIDUwMSBwb2ludHMgaW4gYnVja2V0IDEsIHR1cm5zIG91dCBvbmx5IDUgdmFsaWRcbiAgLy8gICBTaW1pbGFybHksIGlmIDUwMCBwb2ludHMgYWxsIGluIGJ1Y2tldCAxLCB0aGV5IGFsbCBwYXNzZWQgYmVjYXVzZSBnbG9iYWxseSA8PSBtYXhOdW1GZWF0dXJlUG9pbnRzXG4gIGlmIChmZWF0dXJlUG9pbnRzLmxlbmd0aCA8PSBtTWF4TnVtRmVhdHVyZVBvaW50cykgcmV0dXJuIGZlYXR1cmVQb2ludHM7XG5cbiAgY29uc3QgcmVzdWx0RmVhdHVyZVBvaW50cyA9IFtdO1xuXG4gIGNvbnN0IG5CdWNrZXRzID0gbU51bUJ1Y2tldHMgKiBtTnVtQnVja2V0cztcbiAgY29uc3QgblBvaW50c1BlckJ1Y2tldHMgPSBtTWF4TnVtRmVhdHVyZVBvaW50cyAvIG5CdWNrZXRzO1xuXG4gIGNvbnN0IGJ1Y2tldHMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBuQnVja2V0czsgaSsrKSB7XG4gICAgYnVja2V0cy5wdXNoKFtdKTtcbiAgfVxuXG4gIGNvbnN0IGR4ID0gTWF0aC5jZWlsKDEuMCAqIHdpZHRoIC8gbU51bUJ1Y2tldHMpO1xuICBjb25zdCBkeSA9IE1hdGguY2VpbCgxLjAgKiBoZWlnaHQgLyBtTnVtQnVja2V0cyk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmZWF0dXJlUG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgYnVja2V0WCA9IE1hdGguZmxvb3IoZmVhdHVyZVBvaW50c1tpXS54IC8gZHgpO1xuICAgIGNvbnN0IGJ1Y2tldFkgPSBNYXRoLmZsb29yKGZlYXR1cmVQb2ludHNbaV0ueSAvIGR5KTtcblxuICAgIGNvbnN0IGJ1Y2tldEluZGV4ID0gYnVja2V0WSAqIG1OdW1CdWNrZXRzICsgYnVja2V0WDtcbiAgICBidWNrZXRzW2J1Y2tldEluZGV4XS5wdXNoKGZlYXR1cmVQb2ludHNbaV0pO1xuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBtTnVtQnVja2V0czsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBtTnVtQnVja2V0czsgaisrKSB7XG4gICAgICBjb25zdCBidWNrZXRJbmRleCA9IGogKiBtTnVtQnVja2V0cyArIGk7XG4gICAgICBjb25zdCBidWNrZXQgPSBidWNrZXRzW2J1Y2tldEluZGV4XTtcbiAgICAgIGNvbnN0IG5TZWxlY3RlZCA9IE1hdGgubWluKGJ1Y2tldC5sZW5ndGgsIG5Qb2ludHNQZXJCdWNrZXRzKTtcblxuICAgICAgaWYgKGJ1Y2tldC5sZW5ndGggPiBuU2VsZWN0ZWQpIHtcbiAgICAgICAgYnVja2V0LnNvcnQoKGYxLCBmMikgPT4ge1xuICAgICAgICAgIHJldHVybiBNYXRoLmFicyhmMS5zY29yZSkgPiBNYXRoLmFicyhmMi5zY29yZSk/IC0xOiAxO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgblNlbGVjdGVkOyBrKyspIHtcbiAgICAgICAgcmVzdWx0RmVhdHVyZVBvaW50cy5wdXNoKGJ1Y2tldFtrXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHRGZWF0dXJlUG9pbnRzO1xufVxuXG5jb25zdCBfZWZmZWN0aXZlU2lnbWEgPSAob3B0aW9ucykgPT4ge1xuICBjb25zdCB7bUssIHNjYWxlLCBvY3RhdmV9ID0gb3B0aW9ucztcbiAgY29uc3Qgc2lnbWEgPSBNYXRoLnBvdyhtSywgc2NhbGUpICogKDEgPDwgb2N0YXZlKTtcbiAgcmV0dXJuIHNpZ21hO1xufVxuXG4vLyBzb2x2ZSB4ID0gQWIsIHdoZXJlIEEgaXMgc3ltbWV0cmljXG4vLyBbeDBdICAgW0EwIEExIEEyXSBbYjBdXG4vLyBbeDFdID0gW0EzIEE0IEE1XSBbYjFdXG4vLyBbeDJdICAgW0E2IEE3IEE4XSBbYjJdXG5jb25zdCBfc29sdmVTeW1tZXRyaWMzMyA9IChvcHRpb25zKSA9PiB7XG4gIGNvbnN0IHtBLCBifSA9IG9wdGlvbnM7XG5cbiAgY29uc3QgZGV0ID0gQVswXSAqIEFbNF0gKiBBWzhdXG4gICAgICAgICAgICAtIEFbMF0gKiBBWzVdICogQVs1XVxuICAgICAgICAgICAgLSBBWzRdICogQVsyXSAqIEFbMl1cbiAgICAgICAgICAgIC0gQVs4XSAqIEFbMV0gKiBBWzFdXG4gICAgICAgICAgICArIDIgKiBBWzFdICogQVsyXSAqIEFbNV07XG5cbiAgaWYgKCBNYXRoLmFicyhkZXQpIDwgMC4wMDAwMDAxKSByZXR1cm4gbnVsbDsgLy8gZGV0ZXJtaW5hbnQgdW5kZWZpbmVkLiBubyBzb2x1dGlvblxuXG4gIGNvbnN0IEIgPSBbXTsgLy8gaW52ZXJzZSBvZiBBXG4gIEJbMF0gPSBBWzRdICogQVs4XSAtIEFbNV0gKiBBWzddO1xuICBCWzFdID0gQVsyXSAqIEFbN10gLSBBWzFdICogQVs4XTtcbiAgQlsyXSA9IEFbMV0gKiBBWzVdIC0gQVsyXSAqIEFbNF07XG4gIEJbM10gPSBBWzVdICogQVs2XSAtIEFbM10gKiBBWzhdO1xuICBCWzRdID0gQVswXSAqIEFbOF0gLSBBWzJdICogQVs2XTtcbiAgQls1XSA9IEFbMl0gKiBBWzNdIC0gQVswXSAqIEFbNV07XG4gIEJbNl0gPSBBWzNdICogQVs3XSAtIEFbNF0gKiBBWzZdO1xuICBCWzddID0gQVsxXSAqIEFbNl0gLSBBWzBdICogQVs3XTtcbiAgQls4XSA9IEFbMF0gKiBBWzRdIC0gQVsxXSAqIEFbM107XG5cbiAgY29uc3QgeCA9IFtdO1xuICB4WzBdID0gQlswXSAqIGJbMF0gKyBCWzFdICogYlsxXSArIEJbMl0gKiBiWzJdO1xuICB4WzFdID0gQlszXSAqIGJbMF0gKyBCWzRdICogYlsxXSArIEJbNV0gKiBiWzJdO1xuICB4WzJdID0gQls2XSAqIGJbMF0gKyBCWzddICogYlsxXSArIEJbOF0gKiBiWzJdO1xuXG4gIHhbMF0gPSAxLjAgKiB4WzBdIC8gZGV0O1xuICB4WzFdID0gMS4wICogeFsxXSAvIGRldDtcbiAgeFsyXSA9IDEuMCAqIHhbMl0gLyBkZXQ7XG5cbiAgcmV0dXJuIHg7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBkZXRlY3Rcbn1cblxuIiwiLy8gY29tcHV0ZSBEaWZmZXJlbmNlLW9mLUdhdXNzaWFuIHB5cmFtaWRzIGZyb20gZ2F1c3NpYW4gcHlyYW1pZHNcbi8vXG4vLyBweXJhbWlkID0ge1xuLy8gICBudW1PY3RhdmVzLFxuLy8gICBudW1TY2FsZXNQZXJPY3RhdmVzLFxuLy8gICBpbWFnZXM6IFt7ZGF0YSwgd2lkdGgsIGhlaWdodH0sIHt9LCB7fV0gLy8gaW1hZ2UgYXQgb2N0YXZlIGkgYW5kIHNjYWxlIGogPSBpbWFnZXNbaSAqIG51bVNjYWxlc1Blck9jdGF2ZXMgKyBqXVxuLy8gfVxuXG5jb25zdCBidWlsZCA9ICh7Z2F1c3NpYW5QeXJhbWlkfSkgPT4ge1xuICBjb25zdCBudW1PY3RhdmVzID0gZ2F1c3NpYW5QeXJhbWlkLm51bU9jdGF2ZXM7XG4gIGNvbnN0IG51bVNjYWxlc1Blck9jdGF2ZXMgPSBnYXVzc2lhblB5cmFtaWQubnVtU2NhbGVzUGVyT2N0YXZlcyAtIDE7XG5cbiAgY29uc3QgcHlyYW1pZEltYWdlcyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG51bU9jdGF2ZXM7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgbnVtU2NhbGVzUGVyT2N0YXZlczsgaisrKSB7XG4gICAgICBjb25zdCBpbWFnZTEgPSBnYXVzc2lhblB5cmFtaWQuaW1hZ2VzW2kgKiBnYXVzc2lhblB5cmFtaWQubnVtU2NhbGVzUGVyT2N0YXZlcyArIGpdO1xuICAgICAgY29uc3QgaW1hZ2UyID0gZ2F1c3NpYW5QeXJhbWlkLmltYWdlc1tpICogZ2F1c3NpYW5QeXJhbWlkLm51bVNjYWxlc1Blck9jdGF2ZXMgKyBqICsgMV07XG4gICAgICBweXJhbWlkSW1hZ2VzLnB1c2goICBfZGlmZmVyZW5jZUltYWdlQmlub21pYWwoe2ltYWdlMSwgaW1hZ2UyfSkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4ge1xuICAgIG51bU9jdGF2ZXMsXG4gICAgbnVtU2NhbGVzUGVyT2N0YXZlcyxcbiAgICBpbWFnZXM6IHB5cmFtaWRJbWFnZXNcbiAgfVxufVxuXG5jb25zdCBfZGlmZmVyZW5jZUltYWdlQmlub21pYWwgPSAoe2ltYWdlMSwgaW1hZ2UyfSkgPT4ge1xuICBpZiAoaW1hZ2UxLmRhdGEubGVuZ3RoICE9PSBpbWFnZTIuZGF0YS5sZW5ndGgpIHtcbiAgICB0aHJvdyBcImltYWdlIGxlbmd0aCBkb2Vzbid0IG1hdGNoXCI7XG4gIH1cblxuICBjb25zdCBkYXRhID0gbmV3IEZsb2F0MzJBcnJheShpbWFnZTEuZGF0YS5sZW5ndGgpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGltYWdlMS5kYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgZGF0YVtpXSA9IGltYWdlMS5kYXRhW2ldIC0gaW1hZ2UyLmRhdGFbaV07XG4gIH1cbiAgcmV0dXJuIHtkYXRhOiBkYXRhLCB3aWR0aDogaW1hZ2UxLndpZHRoLCBoZWlnaHQ6IGltYWdlMS5oZWlnaHR9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYnVpbGRcbn07XG4iLCJjb25zdCBudW1CeXRlc1BlckZlYXR1cmUgPSA5NjtcbmNvbnN0IG1FeHBhbnNpb25GYWN0b3IgPSA3O1xuXG4vLyAzNyBwb2ludHMgPSA2IHJpbmdzIHggNiBwb2ludHMgcGVyIHJpbmcgKyAxIGNlbnRlclxuY29uc3QgRlJFQUtfUklOR1MgPSBbXG4gIC8vIHJpbmcgNVxuICB7XG4gICAgc2lnbWE6IDAuNTUwMDAwLFxuICAgIHBvaW50czogW1xuICAgICAgWy0xLjAwMDAwMCwgMC4wMDAwMDBdLFxuICAgICAgWy0wLjUwMDAwMCwgLTAuODY2MDI1XSxcbiAgICAgIFswLjUwMDAwMCwgLTAuODY2MDI1XSxcbiAgICAgIFsxLjAwMDAwMCwgLTAuMDAwMDAwXSxcbiAgICAgIFswLjUwMDAwMCwgMC44NjYwMjVdLFxuICAgICAgWy0wLjUwMDAwMCwgMC44NjYwMjVdXG4gICAgXVxuICB9LFxuICAvLyByaW5nIDRcbiAge1xuICAgIHNpZ21hOiAwLjQ3NTAwMCxcbiAgICBwb2ludHM6IFtcbiAgICAgIFswLjAwMDAwMCwgMC45MzA5NjldLFxuICAgICAgWy0wLjgwNjI0MywgMC40NjU0ODVdLFxuICAgICAgWy0wLjgwNjI0MywgLTAuNDY1NDg1XSxcbiAgICAgIFstMC4wMDAwMDAsIC0wLjkzMDk2OV0sXG4gICAgICBbMC44MDYyNDMsIC0wLjQ2NTQ4NV0sXG4gICAgICBbMC44MDYyNDMsIDAuNDY1NDg1XVxuICAgIF1cbiAgfSxcbiAgLy8gcmluZyAzXG4gIHtcbiAgICBzaWdtYTogMC40MDAwMDAsXG4gICAgcG9pbnRzOiBbXG4gICAgICBbMC44NDczMDYsIC0wLjAwMDAwMF0sXG4gICAgICBbMC40MjM2NTMsIDAuNzMzNzg5XSxcbiAgICAgIFstMC40MjM2NTMsIDAuNzMzNzg5XSxcbiAgICAgIFstMC44NDczMDYsIDAuMDAwMDAwXSxcbiAgICAgIFstMC40MjM2NTMsIC0wLjczMzc4OV0sXG4gICAgICBbMC40MjM2NTMsIC0wLjczMzc4OV1cbiAgICBdXG4gIH0sXG4gIC8vIHJpbmcgMlxuICB7XG4gICAgc2lnbWE6IDAuMzI1MDAwLFxuICAgIHBvaW50czogW1xuICAgICAgWy0wLjAwMDAwMCwgLTAuNzQxMDk0XSxcbiAgICAgIFswLjY0MTgwNiwgLTAuMzcwNTQ3XSxcbiAgICAgIFswLjY0MTgwNiwgMC4zNzA1NDddLFxuICAgICAgWzAuMDAwMDAwLCAwLjc0MTA5NF0sXG4gICAgICBbLTAuNjQxODA2LCAwLjM3MDU0N10sXG4gICAgICBbLTAuNjQxODA2LCAtMC4zNzA1NDddXG4gICAgXVxuICB9LFxuICAvLyByaW5nIDFcbiAge1xuICAgIHNpZ21hOiAwLjI1MDAwMCxcbiAgICBwb2ludHM6IFtcbiAgICAgIFstMC41OTU1MDIsIDAuMDAwMDAwXSxcbiAgICAgIFstMC4yOTc3NTEsIC0wLjUxNTcyMF0sXG4gICAgICBbMC4yOTc3NTEsIC0wLjUxNTcyMF0sXG4gICAgICBbMC41OTU1MDIsIC0wLjAwMDAwMF0sXG4gICAgICBbMC4yOTc3NTEsIDAuNTE1NzIwXSxcbiAgICAgIFstMC4yOTc3NTEsIDAuNTE1NzIwXVxuICAgIF1cbiAgfSxcbiAgLy8gcmluZyAwXG4gIHtcbiAgICBzaWdtYTogMC4xNzUwMDAsXG4gICAgcG9pbnRzOiBbXG4gICAgICBbMC4wMDAwMDAsIDAuMzYyNzgzXSxcbiAgICAgIFstMC4zMTQxNzksIDAuMTgxMzkxXSxcbiAgICAgIFstMC4zMTQxNzksIC0wLjE4MTM5MV0sXG4gICAgICBbLTAuMDAwMDAwLCAtMC4zNjI3ODNdLFxuICAgICAgWzAuMzE0MTc5LCAtMC4xODEzOTFdLFxuICAgICAgWzAuMzE0MTc5LCAwLjE4MTM5MV1cbiAgICBdXG4gIH0sXG4gIC8vIGNlbnRlclxuICB7XG4gICAgc2lnbWE6IDAuMTAwMDAwLFxuICAgIHBvaW50czogW1xuICAgICAgWzAsIDBdXG4gICAgXVxuICB9XG5dXG5cbi8vIHB5cmFtaWQ6IGdhdXNzaWFuIHB5cmFtaWRcbmNvbnN0IGV4dHJhY3QgPSAob3B0aW9ucykgPT4ge1xuICBjb25zdCB7cHlyYW1pZCwgcG9pbnRzfSA9IG9wdGlvbnM7XG5cbiAgY29uc3QgbUsgPSBNYXRoLnBvdygyLCAxLjAgLyAocHlyYW1pZC5udW1TY2FsZXNQZXJPY3RhdmVzLTEpKTtcbiAgY29uc3Qgb25lT3ZlckxvZ0sgPSAxLjAgLyBNYXRoLmxvZyhtSyk7XG5cbiAgY29uc3QgZGVzY3JpcHRvcnMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBwb2ludCA9IHBvaW50c1tpXTtcblxuICAgIC8vIEVuc3VyZSB0aGUgc2NhbGUgb2YgdGhlIHNpbWlsYXJpdHkgdHJhbnNmb3JtIGlzIGF0IGxlYXN0IFwiMVwiLlxuICAgIGNvbnN0IHRyYW5zZm9ybVNjYWxlID0gTWF0aC5tYXgoMSwgcG9pbnQuc2lnbWEgKiBtRXhwYW5zaW9uRmFjdG9yKTtcblxuICAgIC8vIFRyYW5zZm9ybWF0aW9uIGZyb20gY2Fub25pY2FsIHRlc3QgbG9jYXRpb25zIHRvIGltYWdlXG4gICAgY29uc3QgUyA9IF9zaW1pbGFyaXR5TWF0cml4KHtzY2FsZTogdHJhbnNmb3JtU2NhbGUsIGFuZ2xlOiBwb2ludC5hbmdsZSwgeDogcG9pbnQueCwgeTogcG9pbnQueX0pO1xuXG4gICAgLy9jb25zb2xlLmxvZyhcIlM6IFwiLCBwb2ludC5zY2FsZSwgcG9pbnQuYW5nbGUsIFMpO1xuXG4gICAgY29uc3Qgc2FtcGxlcyA9IFtdO1xuICAgIGZvciAobGV0IHIgPSAwOyByIDwgRlJFQUtfUklOR1MubGVuZ3RoOyByKyspIHtcbiAgICAgIGNvbnN0IHNpZ21hID0gdHJhbnNmb3JtU2NhbGUgKiBGUkVBS19SSU5HU1tyXS5zaWdtYTtcblxuICAgICAgbGV0IG9jdGF2ZSA9IE1hdGguZmxvb3IoTWF0aC5sb2cyKHNpZ21hKSk7XG4gICAgICBjb25zdCBmc2NhbGUgPSBNYXRoLmxvZyhzaWdtYSAvIE1hdGgucG93KDIsIG9jdGF2ZSkpICogb25lT3ZlckxvZ0s7XG4gICAgICBsZXQgc2NhbGUgPSBNYXRoLnJvdW5kKGZzY2FsZSk7XG5cbiAgICAgIC8vIHNnaW1hIG9mIGxhc3Qgc2NhbGUgPSAgc2lnbWEgb2YgdGhlIGZpcnN0IHNjYWxlIGluIG5leHQgb2N0YXZlXG4gICAgICAvLyBwcmVmZXIgY29hcnNlciBvY3RhdmVzIGZvciBlZmZpY2llbmN5XG4gICAgICBpZiAoc2NhbGUgPT09IHB5cmFtaWQubnVtU2NhbGVzUGVyT2N0YXZlcyAtIDEpIHtcbiAgICAgICAgb2N0YXZlID0gb2N0YXZlICsgMTtcbiAgICAgICAgc2NhbGUgPSAwO1xuICAgICAgfVxuICAgICAgLy8gY2xpcCBvY3RhdmUgYW5kIHNjYWxlXG4gICAgICBpZiAob2N0YXZlIDwgMCkge1xuICAgICAgICBvY3RhdmUgPSAwO1xuICAgICAgICBzY2FsZSA9IDA7XG4gICAgICB9XG4gICAgICBpZiAob2N0YXZlID49IHB5cmFtaWQubnVtT2N0YXZlcykge1xuICAgICAgICBvY3RhdmUgPSBweXJhbWlkLm51bU9jdGF2ZXMgLSAxO1xuICAgICAgICBzY2FsZSA9IHB5cmFtaWQubnVtU2NhbGVzUGVyT2N0YXZlcyAtIDE7XG4gICAgICB9XG5cbiAgICAgIC8vIGZvciBkb3duc2FtcGxlIHBvaW50XG4gICAgICBjb25zdCBpbWFnZSA9IHB5cmFtaWQuaW1hZ2VzW29jdGF2ZSAqIHB5cmFtaWQubnVtU2NhbGVzUGVyT2N0YXZlcyArIHNjYWxlXTtcbiAgICAgIGNvbnN0IGEgPSAxLjAgLyAoTWF0aC5wb3coMiwgb2N0YXZlKSk7XG4gICAgICBjb25zdCBiID0gMC41ICogYSAtIDAuNTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBGUkVBS19SSU5HU1tyXS5wb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgcG9pbnQgPSBGUkVBS19SSU5HU1tyXS5wb2ludHNbaV07XG4gICAgICAgIGNvbnN0IHggPSBTWzBdICogcG9pbnRbMF0gKyBTWzFdICogcG9pbnRbMV0gKyBTWzJdO1xuICAgICAgICBjb25zdCB5ID0gU1szXSAqIHBvaW50WzBdICsgU1s0XSAqIHBvaW50WzFdICsgU1s1XTtcblxuICAgICAgICBsZXQgeHAgPSB4ICogYSArIGI7IC8vIHggaW4gb2N0YXZlXG4gICAgICAgIGxldCB5cCA9IHkgKiBhICsgYjsgLy8geSBpbiBvY3RhdmVcbiAgICAgICAgLy8gYmlsaW5lYXIgaW50ZXJwb2xhdGlvblxuICAgICAgICB4cCA9IE1hdGgubWF4KDAsIE1hdGgubWluKHhwLCBpbWFnZS53aWR0aCAtIDIpKTtcbiAgICAgICAgeXAgPSBNYXRoLm1heCgwLCBNYXRoLm1pbih5cCwgaW1hZ2UuaGVpZ2h0IC0gMikpO1xuXG4gICAgICAgIGNvbnN0IHgwID0gTWF0aC5mbG9vcih4cCk7XG4gICAgICAgIGNvbnN0IHgxID0geDAgKyAxO1xuICAgICAgICBjb25zdCB5MCA9IE1hdGguZmxvb3IoeXApO1xuICAgICAgICBjb25zdCB5MSA9IHkwICsgMTtcblxuICAgICAgICBjb25zdCB2YWx1ZSA9ICh4MS14cCkgKiAoeTEteXApICogaW1hZ2UuZGF0YVt5MCAqIGltYWdlLndpZHRoICsgeDBdXG4gICAgICAgICAgICAgICAgICAgICsgKHhwLXgwKSAqICh5MS15cCkgKiBpbWFnZS5kYXRhW3kwICogaW1hZ2Uud2lkdGggKyB4MV1cbiAgICAgICAgICAgICAgICAgICAgKyAoeDEteHApICogKHlwLXkwKSAqIGltYWdlLmRhdGFbeTEgKiBpbWFnZS53aWR0aCArIHgwXVxuICAgICAgICAgICAgICAgICAgICArICh4cC14MCkgKiAoeXAteTApICogaW1hZ2UuZGF0YVt5MSAqIGltYWdlLndpZHRoICsgeDFdO1xuXG4gICAgICAgIHNhbXBsZXMucHVzaCh2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZGVzYyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2FtcGxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IGkrMTsgaiA8IHNhbXBsZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgZGVzYy5wdXNoKHNhbXBsZXNbaV0gPCBzYW1wbGVzW2pdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBlbmNvZGUgZGVzY3JpcHRvcnMgaW4gYmluYXJ5IGZvcm1hdFxuICAgIC8vIDM3IHNhbXBsZXMgPSAxKzIrMysuLi4rMzYgPSA2NjYgY29tcGFyaXNvbnMgPSA2NjYgYml0c1xuICAgIC8vIGNlaWwoNjY2LzMyKSA9IDg0IG51bWJlcnMgKDMyYml0IG51bWJlcilcbiAgICBjb25zdCBkZXNjQml0ID0gW107XG4gICAgbGV0IHRlbXAgPSAwO1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZXNjLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoZGVzY1tpXSkgdGVtcCArPSAxO1xuICAgICAgY291bnQgKz0gMTtcbiAgICAgIGlmIChjb3VudCA9PT0gMzIpIHtcbiAgICAgICAgZGVzY0JpdC5wdXNoKHRlbXApO1xuICAgICAgICB0ZW1wID0gMDtcbiAgICAgICAgY291bnQgPSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGVtcCA9ICh0ZW1wIDw8IDEpID4+PiAwOyAvLyA+Pj4gMCB0byBtYWtlIGl0IHVuc2lnbmVkXG4gICAgICB9XG4gICAgfVxuICAgIGRlc2NCaXQucHVzaCh0ZW1wKTtcblxuICAgIC8vZGVzY3JpcHRvcnMucHVzaChkZXNjKTtcbiAgICBkZXNjcmlwdG9ycy5wdXNoKGRlc2NCaXQpO1xuICB9XG4gIHJldHVybiBkZXNjcmlwdG9ycztcbn1cblxuY29uc3QgX3NpbWlsYXJpdHlNYXRyaXggPSAob3B0aW9ucykgPT4ge1xuICBjb25zdCB7c2NhbGUsIGFuZ2xlLCB4LCB5fSA9IG9wdGlvbnM7XG4gIGNvbnN0IGMgPSBzY2FsZSAqIE1hdGguY29zKGFuZ2xlKTtcbiAgY29uc3QgcyA9IHNjYWxlICogTWF0aC5zaW4oYW5nbGUpO1xuXG4gIGNvbnN0IFMgPSBbXG4gICAgYywgLXMsIHgsXG4gICAgcywgYywgeSxcbiAgICAwLCAwLCAxXG4gIF1cbiAgcmV0dXJuIFM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBleHRyYWN0XG59XG4iLCJjb25zdCB7ZG93bnNhbXBsZUJpbGluZWFyfSA9IHJlcXVpcmUoJy4uL3V0aWxzL2ltYWdlcy5qcycpO1xuXG4vLyBCdWlsZCBhIGd1c3NpYW4gcHlyYW1pZCwgd2l0aCB0aGUgZm9sbG93aW5nIHN0cnVjdHVyZTpcbi8vXG4vLyBweXJhbWlkID0ge1xuLy8gICBudW1PY3RhdmVzLFxuLy8gICBudW1TY2FsZXNQZXJPY3RhdmVzLFxuLy8gICBpbWFnZXM6IFt7ZGF0YSwgd2lkdGgsIGhlaWdodH0sIHt9LCB7fV0gLy8gaW1hZ2UgYXQgb2N0YXZlIGkgYW5kIHNjYWxlIGogPSBpbWFnZXNbaSAqIG51bVNjYWxlc1Blck9jdGF2ZXMgKyBqXVxuLy8gfVxuXG5jb25zdCBidWlsZCA9ICh7aW1hZ2UsIG51bVNjYWxlc1Blck9jdGF2ZXMsIG1pbkNvYXJzZVNpemV9KSA9PiB7XG4gIGNvbnN0IHtkYXRhLCB3aWR0aCwgaGVpZ2h0fSA9IGltYWdlO1xuXG4gIGNvbnN0IG51bU9jdGF2ZXMgPSBfbnVtT2N0YXZlcyh7d2lkdGgsIGhlaWdodCwgbWluU2l6ZTogbWluQ29hcnNlU2l6ZX0pO1xuXG4gIGNvbnN0IHB5cmFtaWRJbWFnZXMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1PY3RhdmVzOyBpKyspIHtcbiAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgcHlyYW1pZEltYWdlcy5wdXNoKF9hcHBseUZpbHRlcih7aW1hZ2V9KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGZpcnN0IGltYWdlIG9mIGVhY2ggb2N0YXZlLCBkb3duc2FtcGxlIGZyb20gcHJldmlvdXNcbiAgICAgIHB5cmFtaWRJbWFnZXMucHVzaChkb3duc2FtcGxlQmlsaW5lYXIoe2ltYWdlOiBweXJhbWlkSW1hZ2VzW3B5cmFtaWRJbWFnZXMubGVuZ3RoLTFdfSkpO1xuICAgIH1cblxuICAgIC8vIHJlbWFpbmluZyBpbWFnZXMgb2Ygb2N0YXZlLCA0dGggb3JkZXIgYmlub21haWwgZnJvbSBwcmV2aW91c1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgbnVtU2NhbGVzUGVyT2N0YXZlcyAtIDE7IGorKykge1xuICAgICAgaWYgKGogPT09IDApIHtcbiAgICAgICAgcHlyYW1pZEltYWdlcy5wdXNoKF9hcHBseUZpbHRlcih7aW1hZ2U6IHB5cmFtaWRJbWFnZXNbcHlyYW1pZEltYWdlcy5sZW5ndGgtMV19KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGSVggTUU/XG4gICAgICAgIC8vIGluIGFydG9vbGtpdCwgaXQgYXBwbHkgZmlsdGVyIHR3aWNlLi4uLiAgaXMgaXQgYSBidWc/XG4gICAgICAgIHB5cmFtaWRJbWFnZXMucHVzaChfYXBwbHlGaWx0ZXIoe2ltYWdlOiBfYXBwbHlGaWx0ZXIoe2ltYWdlOiBweXJhbWlkSW1hZ2VzW3B5cmFtaWRJbWFnZXMubGVuZ3RoLTFdfSl9KSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29uc3QgcHlyYW1pZCA9IHtcbiAgICBudW1PY3RhdmVzOiBudW1PY3RhdmVzLFxuICAgIG51bVNjYWxlc1Blck9jdGF2ZXM6IG51bVNjYWxlc1Blck9jdGF2ZXMsXG4gICAgaW1hZ2VzOiBweXJhbWlkSW1hZ2VzXG4gIH1cbiAgcmV0dXJuIHB5cmFtaWQ7XG59XG5cbmNvbnN0IF9udW1PY3RhdmVzID0gKG9wdGlvbnMpID0+IHtcbiAgbGV0IHt3aWR0aCwgaGVpZ2h0LCBtaW5TaXplfSA9IG9wdGlvbnM7XG4gIGxldCBudW1PY3RhdmVzID0gMDtcbiAgd2hpbGUgKHdpZHRoID49IG1pblNpemUgJiYgaGVpZ2h0ID49IG1pblNpemUpIHtcbiAgICB3aWR0aCAvPSAyO1xuICAgIGhlaWdodCAvPSAyO1xuICAgIG51bU9jdGF2ZXMrKztcbiAgfVxuICByZXR1cm4gbnVtT2N0YXZlcztcbn1cblxuLy80dGggb3JkZXIgYmlub21pYWxcbmNvbnN0IF9hcHBseUZpbHRlciA9ICh7aW1hZ2V9KSA9PiB7XG4gIGNvbnN0IHtkYXRhLCB3aWR0aCwgaGVpZ2h0fSA9IGltYWdlO1xuICBpZiAod2lkdGggPCA1KSB7Y29uc29sZS5sb2coXCJpbWFnZSB0b28gc21hbGxcIik7IHJldHVybjt9XG4gIGlmIChoZWlnaHQgPCA1KSB7Y29uc29sZS5sb2coXCJpbWFnZSB0b28gc21hbGxcIik7IHJldHVybjt9XG5cbiAgY29uc3QgdGVtcCA9IG5ldyBGbG9hdDMyQXJyYXkoZGF0YS5sZW5ndGgpO1xuXG4gIC8vIGFwcGx5IGhvcml6b250YWwgZmlsdGVyLiBib3JkZXIgaXMgY29tcHV0ZWQgYnkgZXh0ZW5kaW5nIGJvcmRlciBwaXhlbFxuICBmb3IgKGxldCBqID0gMDsgaiA8IGhlaWdodDsgaisrKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3aWR0aDsgaSsrKSB7XG4gICAgICBjb25zdCBwb3MgPSBqICogd2lkdGggKyBpO1xuXG4gICAgICB0ZW1wW3Bvc10gPSBkYXRhW2oqd2lkdGggKyBNYXRoLm1heChpLTIsMCldICtcbiAgICAgICAgICAgICAgICAgIGRhdGFbaip3aWR0aCArIE1hdGgubWF4KGktMSwwKV0gKiA0ICtcbiAgICAgICAgICAgICAgICAgIGRhdGFbaip3aWR0aCArIGldICogNiArXG4gICAgICAgICAgICAgICAgICBkYXRhW2oqd2lkdGggKyBNYXRoLm1pbihpKzEsd2lkdGgtMSldICogNCArXG4gICAgICAgICAgICAgICAgICBkYXRhW2oqd2lkdGggKyBNYXRoLm1pbihpKzIsd2lkdGgtMSldO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGRzdCA9IG5ldyBGbG9hdDMyQXJyYXkoZGF0YS5sZW5ndGgpO1xuICAvLyBhcHBseSB2ZXJ0aWNhbCBmaWx0ZXIuIGJvcmRlciBpcyBjb21wdXRlZCBieSBleHRlbmRpbmcgYm9yZGVyIHBpeGVsXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgd2lkdGg7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgaGVpZ2h0OyBqKyspIHtcbiAgICAgIGNvbnN0IHBvcyA9IGogKiB3aWR0aCArIGk7XG5cbiAgICAgIGRzdFtwb3NdID0gdGVtcFtNYXRoLm1heChqLTIsMCkgKiB3aWR0aCArIGldICtcbiAgICAgICAgICAgICAgICAgdGVtcFtNYXRoLm1heChqLTEsMCkgKiB3aWR0aCArIGldICogNCArXG4gICAgICAgICAgICAgICAgIHRlbXBbaiAqIHdpZHRoICsgaV0gKiA2ICtcbiAgICAgICAgICAgICAgICAgdGVtcFtNYXRoLm1pbihqKzEsaGVpZ2h0LTEpICogd2lkdGggKyBpXSAqIDQgK1xuICAgICAgICAgICAgICAgICB0ZW1wW01hdGgubWluKGorMixoZWlnaHQtMSkgKiB3aWR0aCArIGldO1xuXG4gICAgICAvLyBhdmVyYWdlIG9mICgxKzQrNis0KzEpICogKDErNCs2KzQrMSkgPSAyNTYgbnVtYmVyc1xuICAgICAgZHN0W3Bvc10gPSBkc3RbcG9zXSAvIDI1Ni4wO1xuICAgIH1cbiAgfVxuICByZXR1cm4ge2RhdGE6IGRzdCwgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYnVpbGRcbn07XG4iLCIvLyBGYXN0IGNvbXB1dGF0aW9uIG9uIG51bWJlciBvZiBiaXQgc2V0c1xuLy8gUmVmOiBodHRwczovL2dyYXBoaWNzLnN0YW5mb3JkLmVkdS9+c2VhbmRlci9iaXRoYWNrcy5odG1sI0NvdW50Qml0c1NldFBhcmFsbGVsXG5jb25zdCBjb21wdXRlID0gKG9wdGlvbnMpID0+IHtcbiAgY29uc3Qge3YxLCB2Mn0gPSBvcHRpb25zO1xuICBsZXQgZCA9IDA7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdjEubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgeCA9ICh2MVtpXSBeIHYyW2ldKSA+Pj4gMDtcbiAgICBkICs9IGJpdENvdW50KHgpO1xuICB9XG4gIHJldHVybiBkO1xufVxuXG5jb25zdCBiaXRDb3VudCA9ICh2KSA9PiB7XG4gIHZhciBjID0gdiAtICgodiA+PiAxKSAmIDB4NTU1NTU1NTUpO1xuICBjID0gKChjID4+IDIpICYgMHgzMzMzMzMzMykgKyAoYyAmIDB4MzMzMzMzMzMpO1xuICBjID0gKChjID4+IDQpICsgYykgJiAweDBGMEYwRjBGO1xuICBjID0gKChjID4+IDgpICsgYykgJiAweDAwRkYwMEZGO1xuICBjID0gKChjID4+IDE2KSArIGMpICYgMHgwMDAwRkZGRjtcbiAgcmV0dXJuIGM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjb21wdXRlXG59O1xuIiwiY29uc3Qge2NvbXB1dGU6IGhhbW1pbmdDb21wdXRlfSA9IHJlcXVpcmUoJy4vaGFtbWluZy1kaXN0YW5jZS5qcycpO1xuY29uc3Qge2NyZWF0ZVJhbmRvbWl6ZXJ9ID0gcmVxdWlyZSgnLi4vdXRpbHMvcmFuZG9taXplci5qcycpO1xuXG5jb25zdCBtTWluRmVhdHVyZVBlck5vZGUgPSAxNjtcbmNvbnN0IG1OdW1IeXBvdGhlc2VzID0gIDEyODtcbmNvbnN0IG1DZW50ZXJzID0gODtcblxuLy8ga21lZG9pZHMgY2x1c3RlcmluZyBvZiBwb2ludHMsIHdpdGggaGFtbWluZyBkaXN0YW5jZSBvZiBGUkVBSyBkZXNjcmlwdG9yXG4vL1xuLy8gbm9kZSA9IHtcbi8vICAgaXNMZWFmOiBib29sLFxuLy8gICBjaGlsZHJlbjogW10sIGxpc3Qgb2YgY2hpbGRyZW4gbm9kZVxuLy8gICBwb2ludEluZGV4ZXM6IFtdLCBsaXN0IG9mIGludCwgcG9pbnQgaW5kZXhlc1xuLy8gICBjZW50ZXJQb2ludEluZGV4OiBpbnRcbi8vIH1cbmNvbnN0IGJ1aWxkID0gKHtwb2ludHN9KSA9PiB7XG4gIGNvbnN0IHBvaW50SW5kZXhlcyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHBvaW50cy5sZW5ndGg7IGkrKykge1xuICAgIHBvaW50SW5kZXhlcy5wdXNoKGkpO1xuICB9XG5cbiAgY29uc3QgcmFuZG9taXplciA9IGNyZWF0ZVJhbmRvbWl6ZXIoKTtcblxuICBjb25zdCByb290Tm9kZSA9IF9idWlsZCh7cG9pbnRzOiBwb2ludHMsIHBvaW50SW5kZXhlczogcG9pbnRJbmRleGVzLCBjZW50ZXJQb2ludEluZGV4OiBudWxsLCByYW5kb21pemVyfSk7XG4gIHJldHVybiB7cm9vdE5vZGV9O1xufVxuXG4vLyByZWN1cnNpdmUgYnVpbGQgaGllcmFyY2h5IGNsdXN0ZXJzXG5jb25zdCBfYnVpbGQgPSAob3B0aW9ucykgPT4ge1xuICBjb25zdCB7cG9pbnRzLCBwb2ludEluZGV4ZXMsIGNlbnRlclBvaW50SW5kZXgsIHJhbmRvbWl6ZXJ9ID0gb3B0aW9ucztcblxuICBsZXQgaXNMZWFmID0gZmFsc2U7XG5cbiAgaWYgKHBvaW50SW5kZXhlcy5sZW5ndGggPD0gbUNlbnRlcnMgfHwgcG9pbnRJbmRleGVzLmxlbmd0aCA8PSBtTWluRmVhdHVyZVBlck5vZGUpIHtcbiAgICBpc0xlYWYgPSB0cnVlO1xuICB9XG5cbiAgY29uc3QgY2x1c3RlcnMgPSB7fTtcbiAgaWYgKCFpc0xlYWYpIHtcbiAgICAvLyBjb21wdXRlIGNsdXN0ZXJzXG4gICAgY29uc3QgYXNzaWdubWVudCA9IF9jb21wdXRlS01lZG9pZHMoe3BvaW50cywgcG9pbnRJbmRleGVzLCByYW5kb21pemVyfSk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFzc2lnbm1lbnQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChjbHVzdGVyc1twb2ludEluZGV4ZXNbYXNzaWdubWVudFtpXV1dID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY2x1c3RlcnNbcG9pbnRJbmRleGVzW2Fzc2lnbm1lbnRbaV1dXSA9IFtdO1xuICAgICAgfVxuICAgICAgY2x1c3RlcnNbcG9pbnRJbmRleGVzW2Fzc2lnbm1lbnRbaV1dXS5wdXNoKHBvaW50SW5kZXhlc1tpXSk7XG4gICAgfVxuICB9XG4gIGlmIChPYmplY3Qua2V5cyhjbHVzdGVycykubGVuZ3RoID09PSAxKSB7XG4gICAgaXNMZWFmID0gdHJ1ZTtcbiAgfVxuXG4gIGNvbnN0IG5vZGUgPSB7XG4gICAgY2VudGVyUG9pbnRJbmRleDogY2VudGVyUG9pbnRJbmRleFxuICB9XG5cbiAgaWYgKGlzTGVhZikge1xuICAgIG5vZGUubGVhZiA9IHRydWU7XG4gICAgbm9kZS5wb2ludEluZGV4ZXMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBvaW50SW5kZXhlcy5sZW5ndGg7IGkrKykge1xuICAgICAgbm9kZS5wb2ludEluZGV4ZXMucHVzaChwb2ludEluZGV4ZXNbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIC8vIHJlY3Vyc2l2ZSBidWlsZCBjaGlsZHJlblxuICBub2RlLmxlYWYgPSBmYWxzZTtcbiAgbm9kZS5jaGlsZHJlbiA9IFtdO1xuXG4gIE9iamVjdC5rZXlzKGNsdXN0ZXJzKS5mb3JFYWNoKChjZW50ZXJJbmRleCkgPT4ge1xuICAgIG5vZGUuY2hpbGRyZW4ucHVzaChfYnVpbGQoe3BvaW50czogcG9pbnRzLCBwb2ludEluZGV4ZXM6IGNsdXN0ZXJzW2NlbnRlckluZGV4XSwgY2VudGVyUG9pbnRJbmRleDogY2VudGVySW5kZXgsIHJhbmRvbWl6ZXJ9KSk7XG4gIH0pO1xuICByZXR1cm4gbm9kZTtcbn1cblxuX2NvbXB1dGVLTWVkb2lkcyA9IChvcHRpb25zKSA9PiB7XG4gIGNvbnN0IHtwb2ludHMsIHBvaW50SW5kZXhlcywgcmFuZG9taXplcn0gPSBvcHRpb25zO1xuXG4gIGNvbnN0IHJhbmRvbVBvaW50SW5kZXhlcyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHBvaW50SW5kZXhlcy5sZW5ndGg7IGkrKykge1xuICAgIHJhbmRvbVBvaW50SW5kZXhlcy5wdXNoKGkpO1xuICB9XG5cbiAgbGV0IGJlc3RTdW1EID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XG4gIGxldCBiZXN0QXNzaWdubWVudEluZGV4ID0gLTE7XG5cbiAgY29uc3QgYXNzaWdubWVudHMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBtTnVtSHlwb3RoZXNlczsgaSsrKSB7XG4gICAgcmFuZG9taXplci5hcnJheVNodWZmbGUoe2FycjogcmFuZG9tUG9pbnRJbmRleGVzLCBzYW1wbGVTaXplOiBtQ2VudGVyc30pO1xuXG4gICAgbGV0IHN1bUQgPSAwO1xuICAgIGNvbnN0IGFzc2lnbm1lbnQgPSBbXTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHBvaW50SW5kZXhlcy5sZW5ndGg7IGorKykge1xuICAgICAgbGV0IGJlc3REID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XG4gICAgICBmb3IgKGxldCBrID0gMDsgayA8IG1DZW50ZXJzOyBrKyspIHtcbiAgICAgICAgY29uc3QgY2VudGVySW5kZXggPSBwb2ludEluZGV4ZXNbcmFuZG9tUG9pbnRJbmRleGVzW2tdXTtcbiAgICAgICAgY29uc3QgZCA9IGhhbW1pbmdDb21wdXRlKHt2MTogcG9pbnRzW3BvaW50SW5kZXhlc1tqXV0uZGVzY3JpcHRvcnMsIHYyOiBwb2ludHNbY2VudGVySW5kZXhdLmRlc2NyaXB0b3JzfSk7XG4gICAgICAgIGlmIChkIDwgYmVzdEQpIHtcbiAgICAgICAgICBhc3NpZ25tZW50W2pdID0gcmFuZG9tUG9pbnRJbmRleGVzW2tdO1xuICAgICAgICAgIGJlc3REID0gZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgc3VtRCArPSBiZXN0RDtcbiAgICB9XG4gICAgYXNzaWdubWVudHMucHVzaChhc3NpZ25tZW50KTtcblxuICAgIGlmIChzdW1EIDwgYmVzdFN1bUQpIHtcbiAgICAgIGJlc3RTdW1EID0gc3VtRDtcbiAgICAgIGJlc3RBc3NpZ25tZW50SW5kZXggPSBpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYXNzaWdubWVudHNbYmVzdEFzc2lnbm1lbnRJbmRleF07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBidWlsZCxcbn07XG5cbiIsImNvbnN0IHtjcmVhdGVSYW5kb21pemVyfSA9IHJlcXVpcmUoJy4uL3V0aWxzL3JhbmRvbWl6ZXIuanMnKTtcbmNvbnN0IHtxdWFkcmlsYXRlcmFsQ29udmV4LCBtYXRyaXhJbnZlcnNlMzMsIHNtYWxsZXN0VHJpYW5nbGVBcmVhLCBtdWx0aXBseVBvaW50SG9tb2dyYXBoeUluaG9tb2dlbm91cywgY2hlY2tUaHJlZVBvaW50c0NvbnNpc3RlbnQsIGNoZWNrRm91clBvaW50c0NvbnNpc3RlbnQsIGRldGVybWluYW50fSA9IHJlcXVpcmUoJy4uL3V0aWxzL2dlb21ldHJ5LmpzJyk7XG5cbmNvbnN0IEVQU0lMT04gPSAwLjAwMDAwMDAwMTtcbmNvbnN0IFNRUlQyID0gMS40MTQyMTM1NjIzNzMwOTUwNDg4MDtcbmNvbnN0IEhPTU9HUkFQSFlfREVGQVVMVF9DQVVDSFlfU0NBTEUgPSAwLjAxO1xuY29uc3QgSE9NT0dSQVBIWV9ERUZBVUxUX05VTV9IWVBPVEhFU0VTID0gMTAyNDtcbmNvbnN0IEhPTU9HUkFQSFlfREVGQVVMVF9NQVhfVFJJQUxTID0gMTA2NDtcbmNvbnN0IEhPTU9HUkFQSFlfREVGQVVMVF9DSFVOS19TSVpFID0gNTA7XG5cbi8vIHRlc3RQb2ludHMgaXMgZm91ciBjb3JuZXJzIG9mIGtleWZyYW1lXG5jb25zdCBjb21wdXRlSG9tb2dyYXBoeSA9IChvcHRpb25zKSA9PiB7XG4gIGNvbnN0IHtzcmNQb2ludHMsIGRzdFBvaW50cywga2V5ZnJhbWV9ID0gb3B0aW9ucztcblxuICBjb25zdCB0ZXN0UG9pbnRzID0gW1xuICAgIFswLCAwXSxcbiAgICBba2V5ZnJhbWUud2lkdGgsIDBdLFxuICAgIFtrZXlmcmFtZS53aWR0aCwga2V5ZnJhbWUuaGVpZ2h0XSxcbiAgICBbMCwga2V5ZnJhbWUuaGVpZ2h0XVxuICBdXG5cbiAgY29uc3Qgc2FtcGxlU2l6ZSA9IDQ7IC8vIHVzZSBmb3VyIHBvaW50cyB0byBjb21wdXRlIGhvbW9ncmFwaHlcbiAgaWYgKHNyY1BvaW50cy5sZW5ndGggPCBzYW1wbGVTaXplKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBzY2FsZSA9IEhPTU9HUkFQSFlfREVGQVVMVF9DQVVDSFlfU0NBTEU7XG4gIGNvbnN0IG9uZU92ZXJTY2FsZTIgPSAxLjAgLyAoc2NhbGUgKiBzY2FsZSk7XG4gIGNvbnN0IGNodWNrU2l6ZSA9IE1hdGgubWluKEhPTU9HUkFQSFlfREVGQVVMVF9DSFVOS19TSVpFLCBzcmNQb2ludHMubGVuZ3RoKTtcblxuICBjb25zdCByYW5kb21pemVyID0gY3JlYXRlUmFuZG9taXplcigpO1xuXG4gIGNvbnN0IHBlcm0gPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcmNQb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICBwZXJtW2ldID0gaTtcbiAgfVxuXG4gIHJhbmRvbWl6ZXIuYXJyYXlTaHVmZmxlKHthcnI6IHBlcm0sIHNhbXBsZVNpemU6IHBlcm0ubGVuZ3RofSk7XG5cbiAgLy8gYnVpbGQgbnVtZXJvdXMgaHlwb3RoZXNlcyBieSByYW5kb21pbmcgZHJhdyBmb3VyIHBvaW50c1xuICAvLyBUT0RPOiBvcHRpbWl6ZTogaWYgbnVtYmVyIG9mIHBvaW50cyBpcyBsZXNzIHRoYW4gY2VydGFpbiBudW1iZXIsIGNhbiBicnV0ZSBmb3JjZSBhbGwgY29tYmluYXRpb25zXG4gIGxldCB0cmlhbCA9IDA7XG4gIGNvbnN0IEhzID0gW107XG4gIHdoaWxlICh0cmlhbCA8IEhPTU9HUkFQSFlfREVGQVVMVF9NQVhfVFJJQUxTICYmIEhzLmxlbmd0aCA8IEhPTU9HUkFQSFlfREVGQVVMVF9OVU1fSFlQT1RIRVNFUykge1xuXG4gICAgcmFuZG9taXplci5hcnJheVNodWZmbGUoe2FycjogcGVybSwgc2FtcGxlU2l6ZTogc2FtcGxlU2l6ZX0pO1xuXG4gICAgdHJpYWwgKz0xO1xuXG4gICAgaWYgKCFjaGVja0ZvdXJQb2ludHNDb25zaXN0ZW50KFxuICAgICAgc3JjUG9pbnRzW3Blcm1bMF1dLCBzcmNQb2ludHNbcGVybVsxXV0sIHNyY1BvaW50c1twZXJtWzJdXSwgc3JjUG9pbnRzW3Blcm1bM11dLFxuICAgICAgZHN0UG9pbnRzW3Blcm1bMF1dLCBkc3RQb2ludHNbcGVybVsxXV0sIGRzdFBvaW50c1twZXJtWzJdXSwgZHN0UG9pbnRzW3Blcm1bM11dKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgY29uc3QgSCA9IF9zb2x2ZUhvbW9ncmFwaHlGb3VyUG9pbnRzKHtcbiAgICAgIHNyY1BvaW50czogW3NyY1BvaW50c1twZXJtWzBdXSwgc3JjUG9pbnRzW3Blcm1bMV1dLCBzcmNQb2ludHNbcGVybVsyXV0sIHNyY1BvaW50c1twZXJtWzNdXV0sXG4gICAgICBkc3RQb2ludHM6IFtkc3RQb2ludHNbcGVybVswXV0sIGRzdFBvaW50c1twZXJtWzFdXSwgZHN0UG9pbnRzW3Blcm1bMl1dLCBkc3RQb2ludHNbcGVybVszXV1dLFxuICAgIH0pO1xuXG4gICAgaWYgKEggPT09IG51bGwpIGNvbnRpbnVlO1xuXG4gICAgaWYoIV9jaGVja0hvbW9ncmFwaHlQb2ludHNHZW9tZXRyaWNhbGx5Q29uc2lzdGVudCh7SCwgdGVzdFBvaW50c30pKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBIcy5wdXNoKEgpO1xuICB9XG5cbiAgaWYgKEhzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG51bGw7XG5cbiAgLy8gcGljayB0aGUgYmVzdCBoeXBvdGhlc2lzXG4gIGNvbnN0IGh5cG90aGVzZXMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBIcy5sZW5ndGg7IGkrKykge1xuICAgIGh5cG90aGVzZXMucHVzaCh7XG4gICAgICBIOiBIc1tpXSxcbiAgICAgIGNvc3Q6IDBcbiAgICB9KVxuICB9XG5cbiAgbGV0IGN1ckNodWNrU2l6ZSA9IGNodWNrU2l6ZTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcmNQb2ludHMubGVuZ3RoICYmIGh5cG90aGVzZXMubGVuZ3RoID4gMjsgaSArPSBjdXJDaHVja1NpemUpIHtcbiAgICBjdXJDaHVja1NpemUgPSBNYXRoLm1pbihjaHVja1NpemUsIHNyY1BvaW50cy5sZW5ndGggLSBpKTtcbiAgICBsZXQgY2h1Y2tFbmQgPSBpICsgY3VyQ2h1Y2tTaXplO1xuXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBoeXBvdGhlc2VzLmxlbmd0aDsgaisrKSB7XG4gICAgICBmb3IgKGxldCBrID0gaTsgayA8IGNodWNrRW5kOyBrKyspIHtcbiAgICAgICAgY29uc3QgY29zdCA9IF9jYXVjaHlQcm9qZWN0aXZlUmVwcm9qZWN0aW9uQ29zdCh7SDogaHlwb3RoZXNlc1tqXS5ILCBzcmNQb2ludDogc3JjUG9pbnRzW2tdLCBkc3RQb2ludDogZHN0UG9pbnRzW2tdLCBvbmVPdmVyU2NhbGUyfSk7XG4gICAgICAgIGh5cG90aGVzZXNbal0uY29zdCArPSBjb3N0O1xuICAgICAgfVxuICAgIH1cblxuICAgIGh5cG90aGVzZXMuc29ydCgoaDEsIGgyKSA9PiB7cmV0dXJuIGgxLmNvc3QgLSBoMi5jb3N0fSk7XG4gICAgaHlwb3RoZXNlcy5zcGxpY2UoLU1hdGguZmxvb3IoKGh5cG90aGVzZXMubGVuZ3RoKzEpLzIpKTsgLy8ga2VlcCB0aGUgYmVzdCBoYWxmXG4gIH1cblxuICBsZXQgYmVzdEluZGV4ID0gMDtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBoeXBvdGhlc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGh5cG90aGVzZXNbaV0uY29zdCA8IGh5cG90aGVzZXNbYmVzdEluZGV4XS5jb3N0KSBiZXN0SW5kZXggPSBpO1xuICB9XG5cbiAgY29uc3QgZmluYWxIID0gX25vcm1hbGl6ZUhvbW9ncmFwaHkoe2luSDogaHlwb3RoZXNlc1tiZXN0SW5kZXhdLkh9KTtcblxuICBpZiAoIV9jaGVja0hldXJpc3RpY3Moe0g6IGZpbmFsSCwgdGVzdFBvaW50cywga2V5ZnJhbWV9KSkgcmV0dXJuIG51bGw7XG4gIHJldHVybiBmaW5hbEg7XG59XG5cbmNvbnN0IF9jaGVja0hldXJpc3RpY3MgPSAoe0gsIHRlc3RQb2ludHMsIGtleWZyYW1lfSkgPT4ge1xuICBjb25zdCBISW52ID0gbWF0cml4SW52ZXJzZTMzKEgsIDAuMDAwMDEpO1xuICBjb25zb2xlLmxvZyhcImZpbmFsIEggSW52OiBcIiwgSEludik7XG4gIGlmIChISW52ID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgY29uc3QgbXAgPSBbXVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHRlc3RQb2ludHMubGVuZ3RoOyBpKyspIHsgLy8gNCB0ZXN0IHBvaW50cywgY29ybmVyIG9mIGtleWZyYW1lXG4gICAgbXAucHVzaChtdWx0aXBseVBvaW50SG9tb2dyYXBoeUluaG9tb2dlbm91cyh0ZXN0UG9pbnRzW2ldLCBISW52KSk7XG4gIH1cbiAgY29uc3Qgc21hbGxBcmVhID0gc21hbGxlc3RUcmlhbmdsZUFyZWEobXBbMF0sIG1wWzFdLCBtcFsyXSwgbXBbM10pO1xuICBpZiAoc21hbGxBcmVhIDwga2V5ZnJhbWUud2lkdGggKiBrZXlmcmFtZS5oZWlnaHQgKiAwLjAwMDEpIHJldHVybiBmYWxzZTtcblxuICBpZiAoIXF1YWRyaWxhdGVyYWxDb252ZXgobXBbMF0sIG1wWzFdLCBtcFsyXSwgbXBbM10pKSByZXR1cm4gZmFsc2U7XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmNvbnN0IF9ub3JtYWxpemVIb21vZ3JhcGh5ID0gKHtpbkh9KSA9PiB7XG4gIGNvbnN0IG9uZU92ZXIgPSAxLjAgLyBpbkhbOF07XG5cbiAgY29uc3QgSCA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgIEhbaV0gPSBpbkhbaV0gKiBvbmVPdmVyO1xuICB9XG4gIEhbOF0gPSAxLjA7XG4gIHJldHVybiBIO1xufVxuXG5jb25zdCBfY2F1Y2h5UHJvamVjdGl2ZVJlcHJvamVjdGlvbkNvc3QgPSAoe0gsIHNyY1BvaW50LCBkc3RQb2ludCwgb25lT3ZlclNjYWxlMn0pID0+IHtcbiAgY29uc3QgeCA9IG11bHRpcGx5UG9pbnRIb21vZ3JhcGh5SW5ob21vZ2Vub3VzKHNyY1BvaW50LCBIKTtcbiAgY29uc3QgZiA9W1xuICAgIHhbMF0gLSBkc3RQb2ludFswXSxcbiAgICB4WzFdIC0gZHN0UG9pbnRbMV1cbiAgXTtcbiAgcmV0dXJuIE1hdGgubG9nKDEgKyAoZlswXSpmWzBdK2ZbMV0qZlsxXSkgKiBvbmVPdmVyU2NhbGUyKTtcbn1cblxuY29uc3QgX2NoZWNrSG9tb2dyYXBoeVBvaW50c0dlb21ldHJpY2FsbHlDb25zaXN0ZW50ID0gKHtILCB0ZXN0UG9pbnRzfSkgPT4ge1xuICBjb25zdCBtYXBwZWRQb2ludHMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXN0UG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgbWFwcGVkUG9pbnRzW2ldID0gbXVsdGlwbHlQb2ludEhvbW9ncmFwaHlJbmhvbW9nZW5vdXModGVzdFBvaW50c1tpXSwgSCk7XG4gICAgLy9jb25zb2xlLmxvZyhcIm1hcFwiLCB0ZXN0UG9pbnRzW2ldLCBtYXBwZWRQb2ludHNbaV0sIEgpO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGVzdFBvaW50cy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGkxID0gaTtcbiAgICBjb25zdCBpMiA9IChpKzEpICUgdGVzdFBvaW50cy5sZW5ndGg7XG4gICAgY29uc3QgaTMgPSAoaSsyKSAlIHRlc3RQb2ludHMubGVuZ3RoO1xuICAgIGlmICghY2hlY2tUaHJlZVBvaW50c0NvbnNpc3RlbnQoXG4gICAgICB0ZXN0UG9pbnRzW2kxXSwgdGVzdFBvaW50c1tpMl0sIHRlc3RQb2ludHNbaTNdLFxuICAgICAgbWFwcGVkUG9pbnRzW2kxXSwgbWFwcGVkUG9pbnRzW2kyXSwgbWFwcGVkUG9pbnRzW2kzXSkpIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLy8gQ29uZGl0aW9uIGZvdXIgMkQgcG9pbnRzIHN1Y2ggdGhhdCB0aGUgbWVhbiBpcyB6ZXJvIGFuZCB0aGUgc3RhbmRhcmQgZGV2aWF0aW9uIGlzIHNxcnQoMikuXG5jb25zdCBfY29uZGl0aW9uNFBvaW50czJkID0gKHt4MSwgeDIsIHgzLCB4NH0pID0+IHtcbiAgY29uc3QgbXUgPSBbXTtcbiAgY29uc3QgZDEgPSBbXTtcbiAgY29uc3QgZDIgPSBbXTtcbiAgY29uc3QgZDMgPSBbXTtcbiAgY29uc3QgZDQgPSBbXTtcblxuICBtdVswXSA9ICh4MVswXSt4MlswXSt4M1swXSt4NFswXSkvNDtcbiAgbXVbMV0gPSAoeDFbMV0reDJbMV0reDNbMV0reDRbMV0pLzQ7XG5cbiAgZDFbMF0gPSB4MVswXS1tdVswXTtcbiAgZDFbMV0gPSB4MVsxXS1tdVsxXTtcbiAgZDJbMF0gPSB4MlswXS1tdVswXTtcbiAgZDJbMV0gPSB4MlsxXS1tdVsxXTtcbiAgZDNbMF0gPSB4M1swXS1tdVswXTtcbiAgZDNbMV0gPSB4M1sxXS1tdVsxXTtcbiAgZDRbMF0gPSB4NFswXS1tdVswXTtcbiAgZDRbMV0gPSB4NFsxXS1tdVsxXTtcblxuICBjb25zdCBkczEgPSBNYXRoLnNxcnQoZDFbMF0qZDFbMF0rZDFbMV0qZDFbMV0pO1xuICBjb25zdCBkczIgPSBNYXRoLnNxcnQoZDJbMF0qZDJbMF0rZDJbMV0qZDJbMV0pO1xuICBjb25zdCBkczMgPSBNYXRoLnNxcnQoZDNbMF0qZDNbMF0rZDNbMV0qZDNbMV0pO1xuICBjb25zdCBkczQgPSBNYXRoLnNxcnQoZDRbMF0qZDRbMF0rZDRbMV0qZDRbMV0pO1xuICBjb25zdCBkID0gKGRzMStkczIrZHMzK2RzNCkvNDtcblxuICBpZiAoZCA9PSAwKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBzID0gKDEuMC9kKSpTUVJUMjtcblxuICBjb25zdCB4cDEgPSBbXTtcbiAgY29uc3QgeHAyID0gW107XG4gIGNvbnN0IHhwMyA9IFtdO1xuICBjb25zdCB4cDQgPSBbXTtcblxuICB4cDFbMF0gPSBkMVswXSpzO1xuICB4cDFbMV0gPSBkMVsxXSpzO1xuICB4cDJbMF0gPSBkMlswXSpzO1xuICB4cDJbMV0gPSBkMlsxXSpzO1xuICB4cDNbMF0gPSBkM1swXSpzO1xuICB4cDNbMV0gPSBkM1sxXSpzO1xuICB4cDRbMF0gPSBkNFswXSpzO1xuICB4cDRbMV0gPSBkNFsxXSpzO1xuXG4gIHJldHVybiB7eHAxLCB4cDIsIHhwMywgeHA0LCBzLCB0OiBtdX07XG59XG5cbmNvbnN0IF9zb2x2ZUhvbW9ncmFwaHlGb3VyUG9pbnRzID0gKHtzcmNQb2ludHMsIGRzdFBvaW50c30pID0+IHtcbiAgY29uc3QgcmVzMSA9IF9jb25kaXRpb240UG9pbnRzMmQoe3gxOiBzcmNQb2ludHNbMF0sIHgyOiBzcmNQb2ludHNbMV0sIHgzOiBzcmNQb2ludHNbMl0sIHg0OiBzcmNQb2ludHNbM119KTtcblxuICBpZiAocmVzMSA9PT0gbnVsbCkgcmV0dXJuIG51bGw7XG5cbiAgY29uc3QgcmVzMiA9IF9jb25kaXRpb240UG9pbnRzMmQoe3gxOiBkc3RQb2ludHNbMF0sIHgyOiBkc3RQb2ludHNbMV0sIHgzOiBkc3RQb2ludHNbMl0sIHg0OiBkc3RQb2ludHNbM119KTtcbiAgaWYgKHJlczIgPT09IG51bGwpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IEhuID0gX3NvbHZlSG9tb2dyYXBoeTRQb2ludHNJbmhvbW9nZW5vdXMoe1xuICAgIHgxOiByZXMxLnhwMSwgeDI6IHJlczEueHAyLCB4MzogcmVzMS54cDMsIHg0OiByZXMxLnhwNCxcbiAgICB4cDE6IHJlczIueHAxLCB4cDI6IHJlczIueHAyLCB4cDM6IHJlczIueHAzLCB4cDQ6IHJlczIueHA0LFxuICB9KTtcblxuICBpZiAoSG4gPT09IG51bGwpIHJldHVybiBudWxsO1xuXG4gIGlmIChNYXRoLmFicyhkZXRlcm1pbmFudChIbikpIDwgRVBTSUxPTikgcmV0dXJuIG51bGw7XG5cbiAgY29uc3QgSCA9IF9kZW5vbWFsaXplSG9tb2dyYXBoeSh7SDogSG4sIHM6IHJlczEucywgdDogcmVzMS50LCBzcDogcmVzMi5zLCB0cDogcmVzMi50fSk7XG5cbiAgcmV0dXJuIEg7XG59XG5cbi8vIGRlbm9ybWFsaXplIGhvbW9ncmFwaHlcbi8vIEhwID0gaW52KFRwKSpIKlRcbmNvbnN0IF9kZW5vbWFsaXplSG9tb2dyYXBoeSA9ICh7SCwgcywgdCwgc3AsIHRwfSkgPT4ge1xuICBjb25zdCBhID0gSFs2XSp0cFswXTtcbiAgY29uc3QgYiA9IEhbN10qdHBbMF07XG4gIGNvbnN0IGMgPSBIWzBdL3NwO1xuICBjb25zdCBkID0gSFsxXS9zcDtcbiAgY29uc3QgYXBjID0gYStjO1xuICBjb25zdCBicGQgPSBiK2Q7XG5cbiAgY29uc3QgZSA9IEhbNl0qdHBbMV07XG4gIGNvbnN0IGYgPSBIWzddKnRwWzFdO1xuICBjb25zdCBnID0gSFszXS9zcDtcbiAgY29uc3QgaCA9IEhbNF0vc3A7XG4gIGNvbnN0IGVwZyA9IGUrZztcbiAgY29uc3QgZnBoID0gZitoO1xuXG4gIGNvbnN0IHN0eCA9IHMqdFswXTtcbiAgY29uc3Qgc3R5ID0gcyp0WzFdO1xuXG4gIGNvbnN0IEhwID0gW107XG4gIEhwWzBdID0gcyphcGM7XG4gIEhwWzFdID0gcypicGQ7XG4gIEhwWzJdID0gSFs4XSp0cFswXSArIEhbMl0vc3AgLSBzdHgqYXBjIC0gc3R5KmJwZDtcblxuICBIcFszXSA9IHMqZXBnO1xuICBIcFs0XSA9IHMqZnBoO1xuICBIcFs1XSA9IEhbOF0qdHBbMV0gKyBIWzVdL3NwIC0gc3R4KmVwZyAtIHN0eSpmcGg7XG5cbiAgSHBbNl0gPSBIWzZdKnM7XG4gIEhwWzddID0gSFs3XSpzO1xuICBIcFs4XSA9IEhbOF0gLSBIcFs2XSp0WzBdIC0gSHBbN10qdFsxXTtcblxuICByZXR1cm4gSHA7XG59O1xuXG5jb25zdCBfc29sdmVIb21vZ3JhcGh5NFBvaW50c0luaG9tb2dlbm91cyA9ICh7eDEsIHgyLCB4MywgeDQsIHhwMSwgeHAyLCB4cDMsIHhwNH0pID0+IHtcbiAgY29uc3QgeExpc3QgPSBbeDEsIHgyLCB4MywgeDRdO1xuICBjb25zdCB4cExpc3QgPSBbeHAxLCB4cDIsIHhwMywgeHA0XTtcblxuICBjb25zdCBBID0gW107IC8vIDggeCA5XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgY29uc3Qgb2Zmc2V0ID0gaSAqIDE4O1xuICAgIGNvbnN0IHggPSB4TGlzdFtpXTtcbiAgICBjb25zdCB4cCA9IHhwTGlzdFtpXTtcbiAgICBBW29mZnNldCswXSA9IC14WzBdO1xuICAgIEFbb2Zmc2V0KzFdID0gLXhbMV07XG4gICAgQVtvZmZzZXQrMl0gPSAtMTtcbiAgICBBW29mZnNldCszXSA9IDA7XG4gICAgQVtvZmZzZXQrNF0gPSAwO1xuICAgIEFbb2Zmc2V0KzVdID0gMDtcbiAgICBBW29mZnNldCs2XSA9IHhwWzBdKnhbMF07XG4gICAgQVtvZmZzZXQrN10gPSB4cFswXSp4WzFdO1xuICAgIEFbb2Zmc2V0KzhdID0geHBbMF07XG4gICAgQVtvZmZzZXQrOV0gPSAwO1xuICAgIEFbb2Zmc2V0KzEwXSA9IDA7XG4gICAgQVtvZmZzZXQrMTFdID0gMDtcbiAgICBBW29mZnNldCsxMl0gPSAteFswXTtcbiAgICBBW29mZnNldCsxM10gPSAteFsxXTtcbiAgICBBW29mZnNldCsxNF0gPSAtMTtcbiAgICBBW29mZnNldCsxNV0gPSB4cFsxXSp4WzBdO1xuICAgIEFbb2Zmc2V0KzE2XSA9IHhwWzFdKnhbMV07XG4gICAgQVtvZmZzZXQrMTddID0geHBbMV07XG4gIH1cblxuICBjb25zdCBRID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNzI7IGkrKykge1xuICAgIFFbaV0gPSBBW2ldO1xuICB9XG5cbiAgLy8gc29sdmUgeCBmb3IgQXg9MCB3aXRoIFFSIGRlY29tcG9zaXRpb24gd2l0aCBHcmFtLVNjaG1pZHRcbiAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgODsgcm93KyspIHtcbiAgICBpZiAocm93ID4gMCkge1xuICAgICAgZm9yIChsZXQgaiA9IHJvdzsgaiA8IDg7IGorKykge1xuICAgICAgICAvLyBwcm9qZWN0IGEgdmVjdG9yIFwiYVwiIG9udG8gYSBub3JtYWxpemVkIGJhc2lzIHZlY3RvciBcImVcIi5cbiAgICAgICAgLy8geCA9IHggLSBkb3QoYSxlKSplXG5cbiAgICAgICAgbGV0IGQgPSAwOyAvLyBkb3QoYSwgZSk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgOTsgaSsrKSB7XG4gICAgICAgICAgZCArPSBRWyhyb3ctMSkgKiA5ICsgaV0gKiBBW2ogKiA5ICsgaV07XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDk7IGkrKykge1xuICAgICAgICAgIFFbaiAqIDkgKyBpXSAtPSBkICogUVsgKHJvdy0xKSAqIDkgKyBpXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBtYXhWYWx1ZSA9IC0xO1xuICAgIGxldCBtYXhSb3cgPSAtMTtcbiAgICBjb25zdCBzcyA9IFtdO1xuICAgIGZvciAobGV0IGogPSByb3c7IGogPCA4OyBqKyspIHtcbiAgICAgIHNzW2pdID0gMDtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgOTsgaSsrKSB7XG4gICAgICAgIHNzW2pdICs9IChRW2oqOStpXSAqIFFbaio5K2ldKTtcbiAgICAgIH1cbiAgICAgIGlmIChzc1tqXSA+IG1heFZhbHVlKSB7XG4gICAgICAgIG1heFZhbHVlID0gc3Nbal07XG4gICAgICAgIG1heFJvdyA9IGo7XG4gICAgICB9XG4gICAgfVxuICAgIC8vY29uc29sZS5sb2coXCJzc21heDogXCIsIHNzW21heFJvd10pO1xuICAgIGlmICggTWF0aC5hYnMoc3NbbWF4Um93XSkgPCBFUFNJTE9OKSB7XG4gICAgICByZXR1cm4gbnVsbDsgLy8gbm8gc29sdXRpb25cbiAgICB9XG5cbiAgICAvLyBzd2FwIGN1cnJlbnQgcm93IHdpdGggbWF4aW5kZXggcm93XG4gICAgaWYgKHJvdyAhPT0gbWF4Um93KSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDk7IGkrKykge1xuICAgICAgICBsZXQgdG1wID0gQVtyb3cgKiA5ICsgaV07XG4gICAgICAgIEFbcm93ICogOSArIGldID0gQVttYXhSb3cgKiA5ICsgaV07XG4gICAgICAgIEFbbWF4Um93ICogOSArIGldID0gdG1wO1xuXG4gICAgICAgIGxldCB0bXAyID0gUVtyb3cgKiA5ICsgaV07XG4gICAgICAgIFFbcm93ICogOSArIGldID0gUVttYXhSb3cgKiA5ICsgaV07XG4gICAgICAgIFFbbWF4Um93ICogOSArIGldID0gdG1wMjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDk7IGkrKykge1xuICAgICAgUVtyb3cgKiA5ICsgaV0gPSAxLjAgKiBRW3JvdyAqIDkgKyBpXSAvIE1hdGguc3FydChzc1ttYXhSb3ddKTtcbiAgICB9XG4gIH1cblxuICAvLyBjb21wdXRlIHggZnJvbSBRXG4gIGNvbnN0IHcgPSBbXTtcbiAgY29uc3QgWCA9IFtdO1xuICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCA4OyByb3crKykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgOTsgaSsrKSB7XG4gICAgICBYW3JvdyAqIDkgKyBpXSA9IChRW2ldICogLVFbcm93XSk7XG4gICAgfVxuICAgIFhbcm93ICogOSArIHJvd10gPSAxICsgWFtyb3cgKiA5ICsgcm93XTtcblxuICAgIGZvciAobGV0IGogPSAxOyBqIDwgODsgaisrKSB7XG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgOTsgaSsrKSB7XG4gICAgICAgIFhbcm93ICogOSArIGldICs9IChRW2ogKiA5ICsgaV0gKiAtUVtqICogOSArIHJvd10pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBzcyA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA5OyBpKyspIHtcbiAgICAgIHNzICs9IChYW3JvdyAqIDkgKyBpXSAqIFhbcm93ICogOSArIGldKTtcbiAgICB9XG4gICAgaWYgKE1hdGguYWJzKHNzKSA8IEVQU0lMT04pIHtcbiAgICAgIHdbcm93XSA9IDA7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICB3W3Jvd10gPSBNYXRoLnNxcnQoc3MpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgOTsgaSsrKSB7XG4gICAgICBYW3JvdyAqIDkgKyBpXSA9IFhbcm93ICogOSArIGldIC8gd1tyb3ddO1xuICAgIH1cbiAgfVxuXG4gIGxldCBtYXhSb3cgPSAtMTtcbiAgbGV0IG1heFZhbHVlID0gLTE7XG4gIGZvciAobGV0IGogPSAwOyBqIDwgODsgaisrKSB7XG4gICAgaWYgKHdbal0gPiBtYXhWYWx1ZSkge1xuICAgICAgbWF4Um93ID0gajtcbiAgICAgIG1heFZhbHVlID0gd1tqXTtcbiAgICB9XG4gIH1cblxuICBpZiAobWF4VmFsdWUgPT0gMCkgcmV0dXJuIG51bGw7IC8vIG5vIHNvbHV0aW9uXG5cbiAgY29uc3QgeCA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDk7IGkrKykge1xuICAgIHhbaV0gPSBYW21heFJvdyAqIDkgKyBpXTtcbiAgfVxuXG4gIHJldHVybiB4O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY29tcHV0ZUhvbW9ncmFwaHksXG59XG5cbiIsImNvbnN0IGtIb3VnaEJpbkRlbHRhID0gMTtcblxuLy8gbWF0aGNlcyBbcXVlcnlwb2ludEluZGV4OngsIGtleXBvaW50SW5kZXg6IHhdXG5jb25zdCBjb21wdXRlSG91Z2hNYXRjaGVzID0gKG9wdGlvbnMpID0+IHtcbiAgY29uc3Qge2tleXBvaW50cywgcXVlcnlwb2ludHMsIGtleXdpZHRoLCBrZXloZWlnaHQsIHF1ZXJ5d2lkdGgsIHF1ZXJ5aGVpZ2h0LCBtYXRjaGVzfSA9IG9wdGlvbnM7XG5cbiAgY29uc3QgbWF4WCA9IHF1ZXJ5d2lkdGggKiAxLjI7XG4gIGNvbnN0IG1pblggPSAtbWF4WDtcbiAgY29uc3QgbWF4WSA9IHF1ZXJ5aGVpZ2h0ICogMS4yO1xuICBjb25zdCBtaW5ZID0gLW1heFk7XG4gIGNvbnN0IG51bUFuZ2xlQmlucyA9IDEyO1xuICBjb25zdCBudW1TY2FsZUJpbnMgPSAxMDtcbiAgY29uc3QgbWluU2NhbGUgPSAtMTtcbiAgY29uc3QgbWF4U2NhbGUgPSAxO1xuICBjb25zdCBzY2FsZUsgPSAxMC4wO1xuICBjb25zdCBzY2FsZU9uZU92ZXJMb2dLID0gMS4wIC8gTWF0aC5sb2coc2NhbGVLKTtcbiAgY29uc3QgbWF4RGltID0gTWF0aC5tYXgoa2V5d2lkdGgsIGtleWhlaWdodCk7XG4gIGNvbnN0IGtleWNlbnRlclggPSBNYXRoLmZsb29yKGtleXdpZHRoIC8gMik7XG4gIGNvbnN0IGtleWNlbnRlclkgPSBNYXRoLmZsb29yKGtleWhlaWdodCAvIDIpO1xuXG4gIC8vIGNvbXB1dGUgbnVtWEJpbnMgYW5kIG51bVlCaW5zIGJhc2VkIG9uIG1hdGNoZXNcbiAgY29uc3QgcHJvamVjdGVkRGltcyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG1hdGNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBxdWVyeXNjYWxlID0gcXVlcnlwb2ludHNbbWF0Y2hlc1tpXS5xdWVyeXBvaW50SW5kZXhdLnNjYWxlO1xuICAgIGNvbnN0IGtleXNjYWxlID0ga2V5cG9pbnRzW21hdGNoZXNbaV0ua2V5cG9pbnRJbmRleF0uc2NhbGU7XG4gICAgaWYgKGtleXNjYWxlID09IDApIGNvbnNvbGUubG9nKFwiRVJST1IgZGl2aWRlIHplcm9cIik7XG4gICAgY29uc3Qgc2NhbGUgPSBxdWVyeXNjYWxlIC8ga2V5c2NhbGU7XG4gICAgcHJvamVjdGVkRGltcy5wdXNoKCBzY2FsZSAqIG1heERpbSApO1xuICB9XG5cbiAgLy8gVE9ETyBvcHRpbWl6ZSBtZWRpYW5cbiAgLy8gICB3ZWlyZC4gbWVkaWFuIHNob3VsZCBiZSBbTWF0aC5mbG9vcihwcm9qZWN0ZWREaW1zLmxlbmd0aC8yKSAtIDFdID9cbiAgcHJvamVjdGVkRGltcy5zb3J0KChhMSwgYTIpID0+IHtyZXR1cm4gYTEgLSBhMn0pO1xuICBjb25zdCBtZWRpYW5Qcm9qZWN0ZWREaW0gPSBwcm9qZWN0ZWREaW1zWyBNYXRoLmZsb29yKHByb2plY3RlZERpbXMubGVuZ3RoLzIpIC0gKHByb2plY3RlZERpbXMubGVuZ3RoJTI9PTA/MTowKSAtMSBdO1xuXG4gIGNvbnN0IGJpblNpemUgPSAwLjI1ICogbWVkaWFuUHJvamVjdGVkRGltO1xuICBjb25zdCBudW1YQmlucyA9IE1hdGgubWF4KDUsIE1hdGguY2VpbCgobWF4WCAtIG1pblgpIC8gYmluU2l6ZSkpO1xuICBjb25zdCBudW1ZQmlucyA9IE1hdGgubWF4KDUsIE1hdGguY2VpbCgobWF4WSAtIG1pblkpIC8gYmluU2l6ZSkpO1xuXG4gIGNvbnN0IG51bVhZQmlucyA9IG51bVhCaW5zICogbnVtWUJpbnM7XG4gIGNvbnN0IG51bVhZQW5nbGVCaW5zID0gbnVtWFlCaW5zICogbnVtQW5nbGVCaW5zO1xuXG4gIC8vIGRvIHZvdGluZ1xuICBjb25zdCBxdWVyeXBvaW50VmFsaWRzID0gW107XG4gIGNvbnN0IHF1ZXJ5cG9pbnRCaW5Mb2NhdGlvbnMgPSBbXTtcbiAgY29uc3Qgdm90ZXMgPSB7fTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXRjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgcXVlcnlwb2ludCA9IHF1ZXJ5cG9pbnRzW21hdGNoZXNbaV0ucXVlcnlwb2ludEluZGV4XTtcbiAgICBjb25zdCBrZXlwb2ludCA9IGtleXBvaW50c1ttYXRjaGVzW2ldLmtleXBvaW50SW5kZXhdO1xuXG4gICAgY29uc3Qge3gsIHksIHNjYWxlLCBhbmdsZX0gPSBfbWFwQ29ycmVzcG9uZGVuY2Uoe3F1ZXJ5cG9pbnQsIGtleXBvaW50LCBrZXljZW50ZXJYLCBrZXljZW50ZXJZLCBzY2FsZU9uZU92ZXJMb2dLfSk7XG5cbiAgICAvLyBDaGVjayB0aGF0IHRoZSB2b3RlIGlzIHdpdGhpbiByYW5nZVxuICAgIGlmICh4IDwgbWluWCB8fCB4ID49IG1heFggfHwgeSA8IG1pblkgfHwgeSA+PSBtYXhZIHx8IGFuZ2xlIDw9IC1NYXRoLlBJIHx8IGFuZ2xlID4gTWF0aC5QSSB8fCBzY2FsZSA8IG1pblNjYWxlIHx8IHNjYWxlID49IG1heFNjYWxlKSB7XG4gICAgICBxdWVyeXBvaW50VmFsaWRzW2ldID0gZmFsc2U7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBtYXAgcHJvcGVydGllcyB0byBiaW5zXG4gICAgbGV0IGZiaW5YID0gbnVtWEJpbnMgKiAoeCAtIG1pblgpIC8gKG1heFggLSBtaW5YKTtcbiAgICBsZXQgZmJpblkgPSBudW1ZQmlucyAqICh5IC0gbWluWSkgLyAobWF4WSAtIG1pblkpO1xuICAgIGxldCBmYmluQW5nbGUgPSBudW1BbmdsZUJpbnMgKiAoYW5nbGUgKyBNYXRoLlBJKSAvICgyLjAgKiBNYXRoLlBJKTtcbiAgICBsZXQgZmJpblNjYWxlID0gbnVtU2NhbGVCaW5zICogKHNjYWxlIC0gbWluU2NhbGUpIC8gKG1heFNjYWxlIC0gbWluU2NhbGUpO1xuXG4gICAgcXVlcnlwb2ludEJpbkxvY2F0aW9uc1tpXSA9IHtiaW5YOiBmYmluWCwgYmluWTogZmJpblksIGJpbkFuZ2xlOiBmYmluQW5nbGUsIGJpblNjYWxlOiBmYmluU2NhbGV9O1xuXG4gICAgbGV0IGJpblggPSBNYXRoLmZsb29yKGZiaW5YIC0gMC41KTtcbiAgICBsZXQgYmluWSA9IE1hdGguZmxvb3IoZmJpblkgLSAwLjUpO1xuICAgIGxldCBiaW5TY2FsZSA9IE1hdGguZmxvb3IoZmJpblNjYWxlIC0gMC41KTtcbiAgICBsZXQgYmluQW5nbGUgPSAoTWF0aC5mbG9vcihmYmluQW5nbGUgLSAwLjUpICsgbnVtQW5nbGVCaW5zKSAlIG51bUFuZ2xlQmlucztcblxuICAgIC8vIGNoZWNrIGNhbiB2b3RlIGFsbCAxNiBiaW5zXG4gICAgaWYgKGJpblggPCAwIHx8IGJpblggKyAxID49IG51bVhCaW5zIHx8IGJpblkgPCAwIHx8IGJpblkgKyAxID49IG51bVlCaW5zIHx8IGJpblNjYWxlIDwgMCB8fCBiaW5TY2FsZSArMSA+PSBudW1TY2FsZUJpbnMpIHtcbiAgICAgIHF1ZXJ5cG9pbnRWYWxpZHNbaV0gPSBmYWxzZTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGZvciAobGV0IGR4ID0gMDsgZHggPCAyOyBkeCsrKSB7XG4gICAgICBsZXQgYmluWDIgPSBiaW5YICsgZHg7XG5cbiAgICAgIGZvciAobGV0IGR5ID0gMDsgZHkgPCAyOyBkeSsrKSB7XG4gICAgICAgIGxldCBiaW5ZMiA9IGJpblkgKyBkeTtcblxuICAgICAgICBmb3IgKGxldCBkYW5nbGUgPSAwOyBkYW5nbGUgPCAyOyBkYW5nbGUrKykge1xuICAgICAgICAgIGxldCBiaW5BbmdsZTIgPSAoYmluQW5nbGUgKyBkYW5nbGUpICUgbnVtQW5nbGVCaW5zO1xuXG4gICAgICAgICAgZm9yIChsZXQgZHNjYWxlID0gMDsgZHNjYWxlIDwgMjsgZHNjYWxlKyspIHtcbiAgICAgICAgICAgIGxldCBiaW5TY2FsZTIgPSBiaW5TY2FsZSArIGRzY2FsZTtcblxuICAgICAgICAgICAgY29uc3QgYmluSW5kZXggPSBiaW5YMiArIGJpblkyICogbnVtWEJpbnMgKyBiaW5BbmdsZTIgKiBudW1YWUJpbnMgKyBiaW5TY2FsZTIgKiBudW1YWUFuZ2xlQmlucztcblxuICAgICAgICAgICAgaWYgKHZvdGVzW2JpbkluZGV4XSA9PT0gdW5kZWZpbmVkKSB2b3Rlc1tiaW5JbmRleF0gPSAwO1xuICAgICAgICAgICAgdm90ZXNbYmluSW5kZXhdICs9IDE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHF1ZXJ5cG9pbnRWYWxpZHNbaV0gPSB0cnVlO1xuICB9XG5cbiAgbGV0IG1heFZvdGVzID0gMDtcbiAgbGV0IG1heFZvdGVJbmRleCA9IC0xO1xuICBPYmplY3Qua2V5cyh2b3RlcykuZm9yRWFjaCgoaW5kZXgpID0+IHtcbiAgICBpZiAodm90ZXNbaW5kZXhdID4gbWF4Vm90ZXMpIHtcbiAgICAgIG1heFZvdGVzID0gdm90ZXNbaW5kZXhdO1xuICAgICAgbWF4Vm90ZUluZGV4ID0gaW5kZXg7XG4gICAgfVxuICB9KTtcblxuICBpZiAobWF4Vm90ZXMgPCAzKSByZXR1cm4gW107XG5cbiAgLy8gZ2V0IGJhY2sgYmlucyBmcm9tIHZvdGUgaW5kZXhcbiAgY29uc3QgYmluWCA9IE1hdGguZmxvb3IoKChtYXhWb3RlSW5kZXggJSBudW1YWUFuZ2xlQmlucykgJSBudW1YWUJpbnMpICUgbnVtWEJpbnMpO1xuICBjb25zdCBiaW5ZID0gTWF0aC5mbG9vcigoKChtYXhWb3RlSW5kZXggLSBiaW5YKSAlIG51bVhZQW5nbGVCaW5zKSAlIG51bVhZQmlucykgLyBudW1YQmlucyk7XG4gIGNvbnN0IGJpbkFuZ2xlID0gTWF0aC5mbG9vcigoKG1heFZvdGVJbmRleCAtIGJpblggLSAoYmluWSAqIG51bVhCaW5zKSkgJSBudW1YWUFuZ2xlQmlucykgLyBudW1YWUJpbnMpO1xuICBjb25zdCBiaW5TY2FsZSA9IE1hdGguZmxvb3IoKG1heFZvdGVJbmRleCAtIGJpblggLSAoYmluWSAqIG51bVhCaW5zKSAtIChiaW5BbmdsZSAqIG51bVhZQmlucykpIC8gbnVtWFlBbmdsZUJpbnMpO1xuXG4gIGNvbnNvbGUubG9nKFwiaG91Z2ggdm90ZWQ6IFwiLCB7YmluWCwgYmluWSwgYmluQW5nbGUsIGJpblNjYWxlLCBtYXhWb3RlSW5kZXh9KTtcblxuICBjb25zdCBob3VnaE1hdGNoZXMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXRjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKCFxdWVyeXBvaW50VmFsaWRzW2ldKSBjb250aW51ZTtcblxuICAgIGNvbnN0IHF1ZXJ5QmlucyA9IHF1ZXJ5cG9pbnRCaW5Mb2NhdGlvbnNbaV07XG4gICAgLy8gY29tcHV0ZSBiaW4gZGlmZmVyZW5jZVxuICAgIGNvbnN0IGRpc3RCaW5YID0gTWF0aC5hYnMocXVlcnlCaW5zLmJpblggLSAoYmluWCswLjUpKTtcbiAgICBpZiAoZGlzdEJpblggPj0ga0hvdWdoQmluRGVsdGEpIGNvbnRpbnVlO1xuXG4gICAgY29uc3QgZGlzdEJpblkgPSBNYXRoLmFicyhxdWVyeUJpbnMuYmluWSAtIChiaW5ZKzAuNSkpO1xuICAgIGlmIChkaXN0QmluWSA+PSBrSG91Z2hCaW5EZWx0YSkgY29udGludWU7XG5cbiAgICBjb25zdCBkaXN0QmluU2NhbGUgPSBNYXRoLmFicyhxdWVyeUJpbnMuYmluU2NhbGUgLSAoYmluU2NhbGUrMC41KSk7XG4gICAgaWYgKGRpc3RCaW5TY2FsZSA+PSBrSG91Z2hCaW5EZWx0YSkgY29udGludWU7XG5cbiAgICBjb25zdCB0ZW1wID0gTWF0aC5hYnMocXVlcnlCaW5zLmJpbkFuZ2xlIC0gKGJpbkFuZ2xlKzAuNSkpO1xuICAgIGNvbnN0IGRpc3RCaW5BbmdsZSA9IE1hdGgubWluKHRlbXAsIG51bUFuZ2xlQmlucyAtIHRlbXApO1xuICAgIGlmIChkaXN0QmluQW5nbGUgPj0ga0hvdWdoQmluRGVsdGEpIGNvbnRpbnVlO1xuXG4gICAgaG91Z2hNYXRjaGVzLnB1c2gobWF0Y2hlc1tpXSk7XG4gIH1cbiAgcmV0dXJuIGhvdWdoTWF0Y2hlcztcbn1cblxuY29uc3QgX21hcENvcnJlc3BvbmRlbmNlID0gKHtxdWVyeXBvaW50LCBrZXlwb2ludCwga2V5Y2VudGVyWCwga2V5Y2VudGVyWSwgc2NhbGVPbmVPdmVyTG9nS30pID0+IHtcbiAgLy8gbWFwIGFuZ2xlIHRvICgtcGksIHBpXVxuICBsZXQgYW5nbGUgPSBxdWVyeXBvaW50LmFuZ2xlIC0ga2V5cG9pbnQuYW5nbGU7XG4gIGlmIChhbmdsZSA8PSAtTWF0aC5QSSkgYW5nbGUgKz0gMipNYXRoLlBJO1xuICBlbHNlIGlmIChhbmdsZSA+IE1hdGguUEkpIGFuZ2xlIC09IDIqTWF0aC5QSTtcblxuICBjb25zdCBzY2FsZSA9IHF1ZXJ5cG9pbnQuc2NhbGUgLyBrZXlwb2ludC5zY2FsZTtcblxuICAvLyAyeDIgc2ltaWxhcml0eVxuICBjb25zdCBjb3MgPSBzY2FsZSAqIE1hdGguY29zKGFuZ2xlKTtcbiAgY29uc3Qgc2luID0gc2NhbGUgKiBNYXRoLnNpbihhbmdsZSk7XG4gIGNvbnN0IFMgPSBbY29zLCAtc2luLCBzaW4sIGNvc107XG5cbiAgY29uc3QgdHAgPSBbXG4gICAgU1swXSAqIGtleXBvaW50LngyRCArIFNbMV0gKiBrZXlwb2ludC55MkQsXG4gICAgU1syXSAqIGtleXBvaW50LngyRCArIFNbM10gKiBrZXlwb2ludC55MkRcbiAgXTtcbiAgY29uc3QgdHggPSBxdWVyeXBvaW50LngyRCAtIHRwWzBdO1xuICBjb25zdCB0eSA9IHF1ZXJ5cG9pbnQueTJEIC0gdHBbMV07XG5cbiAgcmV0dXJuIHtcbiAgICB4OiBTWzBdICoga2V5Y2VudGVyWCArIFNbMV0gKiBrZXljZW50ZXJZICsgdHgsXG4gICAgeTogU1syXSAqIGtleWNlbnRlclggKyBTWzNdICoga2V5Y2VudGVyWSArIHR5LFxuICAgIGFuZ2xlOiBhbmdsZSxcbiAgICBzY2FsZTogTWF0aC5sb2coc2NhbGUpICogc2NhbGVPbmVPdmVyTG9nS1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjb21wdXRlSG91Z2hNYXRjaGVzXG59XG5cbiIsImNvbnN0IHtidWlsZDogYnVpbGRHYXVzc2lhblB5cmFtaWR9ID0gcmVxdWlyZSgnLi9nYXVzc2lhbi1weXJhbWlkJyk7XG5jb25zdCB7YnVpbGQ6IGJ1aWxkRG9HUHlyYW1pZH0gPSByZXF1aXJlKCcuL2RvZy1weXJhbWlkJyk7XG5jb25zdCB7YnVpbGQ6IGhpZXJhcmNoaWNhbENsdXN0ZXJpbmdCdWlsZH0gPSByZXF1aXJlKCcuL2hpZXJhcmNoaWNhbC1jbHVzdGVyaW5nLmpzJyk7XG5jb25zdCB7ZGV0ZWN0fSA9IHJlcXVpcmUoJy4vZGV0ZWN0b3InKTtcbmNvbnN0IHtleHRyYWN0fSA9IHJlcXVpcmUoJy4vZnJlYWstZXh0cmFjdG9yJyk7XG5jb25zdCB7bWF0Y2h9ID0gcmVxdWlyZSgnLi9tYXRjaGluZycpO1xuY29uc3Qge2VzdGltYXRlSG9tb2dyYXBoeX0gPSByZXF1aXJlKCcuLi9pY3AvZXN0aW1hdGVfaG9tb2dyYXBoeS5qcycpO1xuXG5jb25zdCBQWVJBTUlEX05VTV9TQ0FMRVNfUEVSX09DVEFWRVMgPSAzO1xuY29uc3QgUFlSQU1JRF9NSU5fQ09BUlNFX1NJWkUgPSA4O1xuY29uc3QgRkVBVFVSRV9ERU5TSVRZID0gMTAwO1xuXG5jbGFzcyBNYXRjaGVyIHtcbiAgY29uc3RydWN0b3IobWF0Y2hpbmdEYXRhKSB7XG4gICAgdGhpcy5rZXlmcmFtZXMgPSBtYXRjaGluZ0RhdGEua2V5ZnJhbWVzO1xuICB9XG5cbiAgbWF0Y2godGFyZ2V0SW1hZ2UpIHtcbiAgICBjb25zdCBxdWVyeXBvaW50cyA9IF9leHRyYWN0UG9pbnRzKHtpbWFnZTogdGFyZ2V0SW1hZ2V9KTtcbiAgICBjb25zb2xlLmxvZyhcInF1ZXJ5cG9pbnRzXCIsIHF1ZXJ5cG9pbnRzKTtcbiAgICBjb25zb2xlLmxvZyhcImtleWZyYW1lc1wiLCB0aGlzLmtleWZyYW1lcyk7XG4gICAgY29uc3QgcmVzdWx0ID0gbWF0Y2goe2tleWZyYW1lczogdGhpcy5rZXlmcmFtZXMsIHF1ZXJ5cG9pbnRzOiBxdWVyeXBvaW50cywgcXVlcnl3aWR0aDogdGFyZ2V0SW1hZ2Uud2lkdGgsIHF1ZXJ5aGVpZ2h0OiB0YXJnZXRJbWFnZS5oZWlnaHR9KTtcbiAgICBjb25zb2xlLmxvZyhcInJlc3VsdFwiLCByZXN1bHQpO1xuICAgIGlmIChyZXN1bHQgPT09IG51bGwpIHJldHVybiBudWxsO1xuICAgIC8vY29uc3QgbWF0Y2ggPSAoe2tleWZyYW1lcywgcXVlcnlwb2ludHMsIHF1ZXJ5d2lkdGgsIHF1ZXJ5aGVpZ2h0fSkgPT4ge1xuXG4gICAgY29uc3Qgc2NyZWVuQ29vcmRzID0gW107XG4gICAgY29uc3Qgd29ybGRDb29yZHMgPSBbXTtcbiAgICBjb25zdCBrZXlmcmFtZSA9IHRoaXMua2V5ZnJhbWVzW3Jlc3VsdC5rZXlmcmFtZUluZGV4XTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdC5tYXRjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBxdWVyeXBvaW50SW5kZXggPSByZXN1bHQubWF0Y2hlc1tpXS5xdWVyeXBvaW50SW5kZXg7XG4gICAgICBjb25zdCBrZXlwb2ludEluZGV4ID0gcmVzdWx0Lm1hdGNoZXNbaV0ua2V5cG9pbnRJbmRleDtcbiAgICAgIHNjcmVlbkNvb3Jkcy5wdXNoKHtcbiAgICAgICAgeDogcXVlcnlwb2ludHNbcXVlcnlwb2ludEluZGV4XS54MkQsXG4gICAgICAgIHk6IHF1ZXJ5cG9pbnRzW3F1ZXJ5cG9pbnRJbmRleF0ueTJELFxuICAgICAgfSlcbiAgICAgIHdvcmxkQ29vcmRzLnB1c2goe1xuICAgICAgICB4OiBrZXlmcmFtZS5wb2ludHNba2V5cG9pbnRJbmRleF0ueDNELFxuICAgICAgICB5OiBrZXlmcmFtZS5wb2ludHNba2V5cG9pbnRJbmRleF0ueTNELFxuICAgICAgICB6OiAwLFxuICAgICAgfSlcbiAgICB9XG4gICAgY29uc3QgbW9kZWxWaWV3VHJhbnNmb3JtID0gZXN0aW1hdGVIb21vZ3JhcGh5KHtzY3JlZW5Db29yZHMsIHdvcmxkQ29vcmRzfSk7XG4gICAgcmV0dXJuIG1vZGVsVmlld1RyYW5zZm9ybVxuICB9XG59XG5cbmNvbnN0IF9leHRyYWN0UG9pbnRzID0gKHtpbWFnZX0pID0+IHtcbiAgY29uc3QgbWF4RmVhdHVyZU51bSA9IEZFQVRVUkVfREVOU0lUWSAqIGltYWdlLndpZHRoICogaW1hZ2UuaGVpZ2h0IC8gKDQ4MC4wKjM2MCk7XG4gIGNvbnN0IGdhdXNzaWFuUHlyYW1pZCA9IGJ1aWxkR2F1c3NpYW5QeXJhbWlkKHtpbWFnZSwgbWluQ29hcnNlU2l6ZTogUFlSQU1JRF9NSU5fQ09BUlNFX1NJWkUsIG51bVNjYWxlc1Blck9jdGF2ZXM6IFBZUkFNSURfTlVNX1NDQUxFU19QRVJfT0NUQVZFU30pO1xuXG4gIGNvbnN0IGRvZ1B5cmFtaWQgPSBidWlsZERvR1B5cmFtaWQoe2dhdXNzaWFuUHlyYW1pZDogZ2F1c3NpYW5QeXJhbWlkfSk7XG5cbiAgY29uc3QgZmVhdHVyZVBvaW50cyA9IGRldGVjdCh7Z2F1c3NpYW5QeXJhbWlkLCBkb2dQeXJhbWlkfSk7XG5cbiAgY29uc3QgZGVzY3JpcHRvcnMgPSBleHRyYWN0KHtweXJhbWlkOiBnYXVzc2lhblB5cmFtaWQsIHBvaW50czogZmVhdHVyZVBvaW50c30pO1xuXG4gIGNvbnN0IGtleXBvaW50cyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGZlYXR1cmVQb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICBrZXlwb2ludHMucHVzaCh7XG4gICAgICB4MkQ6IGZlYXR1cmVQb2ludHNbaV0ueCxcbiAgICAgIHkyRDogZmVhdHVyZVBvaW50c1tpXS55LFxuICAgICAgeDNEOiAoZmVhdHVyZVBvaW50c1tpXS54ICsgMC41KSAvIGltYWdlLmRwaSAqIDI1LjQsIC8vIGluY2ggdG8gbWlsbGltZXRlclxuICAgICAgeTNEOiAoKGltYWdlLmhlaWdodC0wLjUpIC0gZmVhdHVyZVBvaW50c1tpXS55KSAvIGltYWdlLmRwaSAqIDI1LjQsIC8vIGluY2ggdG8gbWlsbGltZXRlclxuICAgICAgYW5nbGU6IGZlYXR1cmVQb2ludHNbaV0uYW5nbGUsXG4gICAgICBzY2FsZTogZmVhdHVyZVBvaW50c1tpXS5zaWdtYSxcbiAgICAgIG1heGltYTogZmVhdHVyZVBvaW50c1tpXS5zY29yZSA+IDAsXG4gICAgICBkZXNjcmlwdG9yczogZGVzY3JpcHRvcnNbaV1cbiAgICB9KVxuICB9XG4gIHJldHVybiBrZXlwb2ludHM7XG59XG5cbmNvbnN0IF9idWlsZEtleWZyYW1lcyA9ICh7aW1hZ2VMaXN0fSkgPT4ge1xuICBjb25zdCBrZXlmcmFtZXMgPSBbXTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGltYWdlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGltYWdlID0gaW1hZ2VMaXN0W2ldO1xuICAgIGNvbnN0IGtleXBvaW50cyA9IF9leHRyYWN0UG9pbnRzKHtpbWFnZX0pO1xuICAgIGNvbnN0IHBvaW50c0NsdXN0ZXIgPSBoaWVyYXJjaGljYWxDbHVzdGVyaW5nQnVpbGQoe3BvaW50czoga2V5cG9pbnRzfSk7XG4gICAga2V5ZnJhbWVzLnB1c2goe3BvaW50czoga2V5cG9pbnRzLCBwb2ludHNDbHVzdGVyLCB3aWR0aDogaW1hZ2Uud2lkdGgsIGhlaWdodDogaW1hZ2UuaGVpZ2h0fSk7XG4gIH1cbiAgcmV0dXJuIGtleWZyYW1lcztcbn1cblxuY29uc3QgY29tcGlsZU1hdGNoaW5nID0gKHtpbWFnZUxpc3R9KSA9PiB7XG4gIGNvbnN0IGtleWZyYW1lcyA9IF9idWlsZEtleWZyYW1lcyh7aW1hZ2VMaXN0fSk7XG4gIHJldHVybiB7a2V5ZnJhbWVzfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIE1hdGNoZXIsXG4gIGNvbXBpbGVNYXRjaGluZ1xufVxuIiwiY29uc3QgVGlueVF1ZXVlID0gcmVxdWlyZSgndGlueXF1ZXVlJykuZGVmYXVsdDtcbmNvbnN0IHtjb21wdXRlOiBoYW1taW5nQ29tcHV0ZX0gPSByZXF1aXJlKCcuL2hhbW1pbmctZGlzdGFuY2UuanMnKTtcbmNvbnN0IHtjb21wdXRlSG91Z2hNYXRjaGVzfSA9IHJlcXVpcmUoJy4vaG91Z2guanMnKTtcbmNvbnN0IHtjb21wdXRlSG9tb2dyYXBoeX0gPSByZXF1aXJlKCcuL2hvbW9ncmFwaHkuanMnKTtcbmNvbnN0IHttdWx0aXBseVBvaW50SG9tb2dyYXBoeUluaG9tb2dlbm91cywgbWF0cml4SW52ZXJzZTMzfSA9IHJlcXVpcmUoJy4uL3V0aWxzL2dlb21ldHJ5LmpzJyk7XG5cbmNvbnN0IGtIb21vZ3JhcGh5SW5saWVyVGhyZXNob2xkID0gMztcbmNvbnN0IGtNaW5OdW1JbmxpZXJzID0gODtcbmNvbnN0IG1NYXhOb2Rlc1RvUG9wID0gODtcbmNvbnN0IG1UaHJlc2hvbGQgPSAwLjc7XG5jb25zdCBrSG91Z2hCaW5EZWx0YSA9IDE7XG5cbi8vIG1hdGNoIGxpc3Qgb2YgcXVlcnBvaW50cyBhZ2FpbnN0IHByZS1idWlsdCBsaXN0IG9mIGtleWZyYW1lc1xuY29uc3QgbWF0Y2ggPSAoe2tleWZyYW1lcywgcXVlcnlwb2ludHMsIHF1ZXJ5d2lkdGgsIHF1ZXJ5aGVpZ2h0fSkgPT4ge1xuICBsZXQgcmVzdWx0ID0gbnVsbDtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGtleWZyYW1lcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGtleWZyYW1lID0ga2V5ZnJhbWVzW2ldO1xuICAgIGNvbnN0IGtleXBvaW50cyA9IGtleWZyYW1lLnBvaW50cztcblxuICAgIGNvbnN0IG1hdGNoZXMgPSBbXTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHF1ZXJ5cG9pbnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICBjb25zdCByb290Tm9kZSA9IGtleWZyYW1lLnBvaW50c0NsdXN0ZXIucm9vdE5vZGU7XG4gICAgICBjb25zdCBxdWVyeXBvaW50ID0gcXVlcnlwb2ludHNbal07XG4gICAgICBjb25zdCBrZXlwb2ludEluZGV4ZXMgPSBbXTtcbiAgICAgIGNvbnN0IHF1ZXVlID0gbmV3IFRpbnlRdWV1ZShbXSwgKGExLCBhMikgPT4ge3JldHVybiBhMS5kIC0gYTIuZH0pO1xuXG4gICAgICBfcXVlcnkoe25vZGU6IHJvb3ROb2RlLCBrZXlwb2ludHMsIHF1ZXJ5cG9pbnQsIHF1ZXVlLCBrZXlwb2ludEluZGV4ZXMsIG51bVBvcDogMH0pO1xuXG4gICAgICBsZXQgYmVzdEluZGV4ID0gLTE7XG4gICAgICBsZXQgYmVzdEQxID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XG4gICAgICBsZXQgYmVzdEQyID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XG5cbiAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwga2V5cG9pbnRJbmRleGVzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIGNvbnN0IGtleXBvaW50ID0ga2V5cG9pbnRzW2tleXBvaW50SW5kZXhlc1trXV07XG4gICAgICAgIGlmIChrZXlwb2ludC5tYXhpbWEgIT0gcXVlcnlwb2ludC5tYXhpbWEpIGNvbnRpbnVlO1xuXG4gICAgICAgIGNvbnN0IGQgPSBoYW1taW5nQ29tcHV0ZSh7djE6IGtleXBvaW50LmRlc2NyaXB0b3JzLCB2MjogcXVlcnlwb2ludC5kZXNjcmlwdG9yc30pO1xuICAgICAgICBpZiAoZCA8IGJlc3REMSkge1xuICAgICAgICAgIGJlc3REMiA9IGJlc3REMTtcbiAgICAgICAgICBiZXN0RDEgPSBkO1xuICAgICAgICAgIGJlc3RJbmRleCA9IGtleXBvaW50SW5kZXhlc1trXTtcbiAgICAgICAgfSBlbHNlIGlmIChkIDwgYmVzdEQyKSB7XG4gICAgICAgICAgYmVzdEQyID0gZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGJlc3RJbmRleCAhPT0gLTEgJiYgKGJlc3REMiA9PT0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIgfHwgKDEuMCAqIGJlc3REMSAvIGJlc3REMikgPCBtVGhyZXNob2xkKSkge1xuICAgICAgICBtYXRjaGVzLnB1c2goe3F1ZXJ5cG9pbnRJbmRleDogaiwga2V5cG9pbnRJbmRleDogYmVzdEluZGV4fSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG1hdGNoZXMubGVuZ3RoIDwga01pbk51bUlubGllcnMpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGNvbnN0IGhvdWdoTWF0Y2hlcyA9IGNvbXB1dGVIb3VnaE1hdGNoZXMoe1xuICAgICAga2V5cG9pbnRzOiBrZXlmcmFtZS5wb2ludHMsXG4gICAgICBxdWVyeXBvaW50cyxcbiAgICAgIGtleXdpZHRoOiBrZXlmcmFtZS53aWR0aCxcbiAgICAgIGtleWhlaWdodDoga2V5ZnJhbWUuaGVpZ2h0LFxuICAgICAgcXVlcnl3aWR0aCxcbiAgICAgIHF1ZXJ5aGVpZ2h0LFxuICAgICAgbWF0Y2hlcyxcbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZyhcImhvdWdoIG1hdGNoZXMxIGxlbmd0aFwiLCBob3VnaE1hdGNoZXMubGVuZ3RoLCBob3VnaE1hdGNoZXMpO1xuXG4gICAgY29uc3Qgc3JjUG9pbnRzID0gW107XG4gICAgY29uc3QgZHN0UG9pbnRzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBob3VnaE1hdGNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHF1ZXJ5cG9pbnQgPSBxdWVyeXBvaW50c1tob3VnaE1hdGNoZXNbaV0ucXVlcnlwb2ludEluZGV4XTtcbiAgICAgIGNvbnN0IGtleXBvaW50ID0ga2V5cG9pbnRzW2hvdWdoTWF0Y2hlc1tpXS5rZXlwb2ludEluZGV4XTtcbiAgICAgIHNyY1BvaW50cy5wdXNoKFsga2V5cG9pbnQueDJELCBrZXlwb2ludC55MkQgXSk7XG4gICAgICBkc3RQb2ludHMucHVzaChbIHF1ZXJ5cG9pbnQueDJELCBxdWVyeXBvaW50LnkyRCBdKTtcbiAgICB9XG5cbiAgICBjb25zdCBIID0gY29tcHV0ZUhvbW9ncmFwaHkoe1xuICAgICAgc3JjUG9pbnRzLFxuICAgICAgZHN0UG9pbnRzLFxuICAgICAga2V5ZnJhbWUsXG4gICAgfSk7XG5cbiAgICBjb25zb2xlLmxvZyhcImZpbmFsIEhcIiwgSCk7XG5cbiAgICBpZiAoSCA9PT0gbnVsbCkgY29udGludWU7XG5cbiAgICBjb25zdCBpbmxpZXJNYXRjaGVzID0gX2ZpbmRJbmxpZXJNYXRjaGVzKHtcbiAgICAgIHF1ZXJ5cG9pbnRzLFxuICAgICAga2V5cG9pbnRzOiBrZXlmcmFtZS5wb2ludHMsXG4gICAgICBILFxuICAgICAgbWF0Y2hlczogaG91Z2hNYXRjaGVzLFxuICAgICAgdGhyZXNob2xkOiBrSG9tb2dyYXBoeUlubGllclRocmVzaG9sZFxuICAgIH0pO1xuXG5cbiAgICBpZiAoaW5saWVyTWF0Y2hlcy5sZW5ndGggPCBrTWluTnVtSW5saWVycykge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gZG8gYW5vdGhlciBsb29wIG9mIG1hdGNoIHVzaW5nIHRoZSBob21vZ3JhcGh5XG4gICAgY29uc3QgSEludiA9IG1hdHJpeEludmVyc2UzMyhILCAwLjAwMDAxKTtcbiAgICBjb25zdCBkVGhyZXNob2xkMiA9IDEwICogMTA7XG4gICAgY29uc3QgbWF0Y2hlczIgPSBbXTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHF1ZXJ5cG9pbnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICBjb25zdCBxdWVyeXBvaW50ID0gcXVlcnlwb2ludHNbal07XG4gICAgICBjb25zdCBtYXBxdWVyeXBvaW50ID0gbXVsdGlwbHlQb2ludEhvbW9ncmFwaHlJbmhvbW9nZW5vdXMoW3F1ZXJ5cG9pbnQueDJELCBxdWVyeXBvaW50LnkyRF0sIEhJbnYpO1xuXG4gICAgICBsZXQgYmVzdEluZGV4ID0gLTE7XG4gICAgICBsZXQgYmVzdEQxID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XG4gICAgICBsZXQgYmVzdEQyID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XG5cbiAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwga2V5cG9pbnRzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIGNvbnN0IGtleXBvaW50ID0ga2V5cG9pbnRzW2tdO1xuICAgICAgICBpZiAoa2V5cG9pbnQubWF4aW1hICE9IHF1ZXJ5cG9pbnQubWF4aW1hKSBjb250aW51ZTtcblxuICAgICAgICAvLyBjaGVjayBkaXN0YW5jZSB0aHJlc2hvbGRcbiAgICAgICAgY29uc3QgZDIgPSAoa2V5cG9pbnQueDJEIC0gbWFwcXVlcnlwb2ludFswXSkgKiAoa2V5cG9pbnQueDJEIC0gbWFwcXVlcnlwb2ludFswXSlcbiAgICAgICAgICAgICAgICAgICsgKGtleXBvaW50LnkyRCAtIG1hcHF1ZXJ5cG9pbnRbMV0pICogKGtleXBvaW50LnkyRCAtIG1hcHF1ZXJ5cG9pbnRbMV0pO1xuICAgICAgICBpZiAoZDIgPiBkVGhyZXNob2xkMikgY29udGludWU7XG5cbiAgICAgICAgLy8gVE9ETzogb3B0aW1pemUsIGhhbW1pbmcgZGlzdGFuY2UgbWlnaHQgaGF2ZSBiZWVuIGNvbXB1dGVkIGJlZm9yZS4gY2FuIGNhY2hlP1xuICAgICAgICBjb25zdCBkID0gaGFtbWluZ0NvbXB1dGUoe3YxOiBrZXlwb2ludC5kZXNjcmlwdG9ycywgdjI6IHF1ZXJ5cG9pbnQuZGVzY3JpcHRvcnN9KTtcbiAgICAgICAgaWYgKGQgPCBiZXN0RDEpIHtcbiAgICAgICAgICBiZXN0RDIgPSBiZXN0RDE7XG4gICAgICAgICAgYmVzdEQxID0gZDtcbiAgICAgICAgICBiZXN0SW5kZXggPSBrO1xuICAgICAgICB9IGVsc2UgaWYgKGQgPCBiZXN0RDIpIHtcbiAgICAgICAgICBiZXN0RDIgPSBkO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChiZXN0SW5kZXggIT09IC0xICYmIChiZXN0RDIgPT09IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSIHx8ICgxLjAgKiBiZXN0RDEgLyBiZXN0RDIpIDwgbVRocmVzaG9sZCkpIHtcbiAgICAgICAgbWF0Y2hlczIucHVzaCh7cXVlcnlwb2ludEluZGV4OiBqLCBrZXlwb2ludEluZGV4OiBiZXN0SW5kZXh9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBob3VnaE1hdGNoZXMyID0gY29tcHV0ZUhvdWdoTWF0Y2hlcyh7XG4gICAgICBrZXlwb2ludHM6IGtleWZyYW1lLnBvaW50cyxcbiAgICAgIHF1ZXJ5cG9pbnRzLFxuICAgICAga2V5d2lkdGg6IGtleWZyYW1lLndpZHRoLFxuICAgICAga2V5aGVpZ2h0OiBrZXlmcmFtZS5oZWlnaHQsXG4gICAgICBxdWVyeXdpZHRoLFxuICAgICAgcXVlcnloZWlnaHQsXG4gICAgICBtYXRjaGVzOiBtYXRjaGVzMixcbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZyhcImhvdWdoIG1hdGNoZXMyIGxlbmd0aFwiLCBob3VnaE1hdGNoZXMyLmxlbmd0aCwgaG91Z2hNYXRjaGVzMik7XG5cbiAgICBjb25zdCBzcmNQb2ludHMyID0gW107XG4gICAgY29uc3QgZHN0UG9pbnRzMiA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaG91Z2hNYXRjaGVzMi5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgcXVlcnlwb2ludCA9IHF1ZXJ5cG9pbnRzW2hvdWdoTWF0Y2hlczJbaV0ucXVlcnlwb2ludEluZGV4XTtcbiAgICAgIGNvbnN0IGtleXBvaW50ID0ga2V5cG9pbnRzW2hvdWdoTWF0Y2hlczJbaV0ua2V5cG9pbnRJbmRleF07XG4gICAgICBzcmNQb2ludHMyLnB1c2goWyBrZXlwb2ludC54MkQsIGtleXBvaW50LnkyRCBdKTtcbiAgICAgIGRzdFBvaW50czIucHVzaChbIHF1ZXJ5cG9pbnQueDJELCBxdWVyeXBvaW50LnkyRCBdKTtcbiAgICB9XG5cbiAgICBjb25zdCBIMiA9IGNvbXB1dGVIb21vZ3JhcGh5KHtcbiAgICAgIHNyY1BvaW50czogc3JjUG9pbnRzMixcbiAgICAgIGRzdFBvaW50czogZHN0UG9pbnRzMixcbiAgICAgIGtleWZyYW1lXG4gICAgfSk7XG5cbiAgICBjb25zb2xlLmxvZyhcImZpbmFsIEgyXCIsIEgyKTtcblxuICAgIGlmIChIMiA9PT0gbnVsbCkgY29udGludWU7XG5cbiAgICBjb25zdCBpbmxpZXJNYXRjaGVzMiA9IF9maW5kSW5saWVyTWF0Y2hlcyh7XG4gICAgICBxdWVyeXBvaW50cyxcbiAgICAgIGtleXBvaW50czoga2V5ZnJhbWUucG9pbnRzLFxuICAgICAgSDogSDIsXG4gICAgICBtYXRjaGVzOiBob3VnaE1hdGNoZXMyLFxuICAgICAgdGhyZXNob2xkOiBrSG9tb2dyYXBoeUlubGllclRocmVzaG9sZFxuICAgIH0pO1xuXG4gICAgaWYgKGlubGllck1hdGNoZXMyLmxlbmd0aCA8IGtNaW5OdW1JbmxpZXJzKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoaW5saWVyTWF0Y2hlczIubGVuZ3RoIDwga01pbk51bUlubGllcnMpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChyZXN1bHQgPT09IG51bGwgfHwgcmVzdWx0Lm1hdGNoZXMubGVuZ3RoIDwgaW5saWVyTWF0Y2hlczIubGVuZ3RoKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIGtleWZyYW1lSW5kZXg6IGksXG4gICAgICAgIG1hdGNoZXM6IGlubGllck1hdGNoZXMyLFxuICAgICAgICBIOiBIMixcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuY29uc3QgX3F1ZXJ5ID0gKHtub2RlLCBrZXlwb2ludHMsIHF1ZXJ5cG9pbnQsIHF1ZXVlLCBrZXlwb2ludEluZGV4ZXMsIG51bVBvcH0pID0+IHtcbiAgaWYgKG5vZGUubGVhZikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZS5wb2ludEluZGV4ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGtleXBvaW50SW5kZXhlcy5wdXNoKG5vZGUucG9pbnRJbmRleGVzW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgZGlzdGFuY2VzID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGNoaWxkTm9kZSA9IG5vZGUuY2hpbGRyZW5baV07XG4gICAgY29uc3QgY2VudGVyUG9pbnRJbmRleCA9IGNoaWxkTm9kZS5jZW50ZXJQb2ludEluZGV4O1xuICAgIGNvbnN0IGQgPSBoYW1taW5nQ29tcHV0ZSh7djE6IGtleXBvaW50c1tjZW50ZXJQb2ludEluZGV4XS5kZXNjcmlwdG9ycywgdjI6IHF1ZXJ5cG9pbnQuZGVzY3JpcHRvcnN9KTtcbiAgICBkaXN0YW5jZXMucHVzaChkKTtcbiAgfVxuXG4gIGxldCBtaW5EID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgIG1pbkQgPSBNYXRoLm1pbihtaW5ELCBkaXN0YW5jZXNbaV0pO1xuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGRpc3RhbmNlc1tpXSAhPT0gbWluRCkge1xuICAgICAgcXVldWUucHVzaCh7bm9kZTogbm9kZS5jaGlsZHJlbltpXSwgZDogZGlzdGFuY2VzW2ldfSk7XG4gICAgfVxuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgIGlmIChkaXN0YW5jZXNbaV0gPT09IG1pbkQpIHtcbiAgICAgIF9xdWVyeSh7bm9kZTogbm9kZS5jaGlsZHJlbltpXSwga2V5cG9pbnRzLCBxdWVyeXBvaW50LCBxdWV1ZSwga2V5cG9pbnRJbmRleGVzLCBudW1Qb3B9KTtcbiAgICB9XG4gIH1cblxuICBpZiAobnVtUG9wIDwgbU1heE5vZGVzVG9Qb3AgJiYgcXVldWUubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IHtub2RlLCBkfSA9IHF1ZXVlLnBvcCgpO1xuICAgIG51bVBvcCArPSAxO1xuICAgIF9xdWVyeSh7bm9kZSwga2V5cG9pbnRzLCBxdWVyeXBvaW50LCBxdWV1ZSwga2V5cG9pbnRJbmRleGVzLCBudW1Qb3B9KTtcbiAgfVxufTtcblxuY29uc3QgX2ZpbmRJbmxpZXJNYXRjaGVzID0gKG9wdGlvbnMpID0+IHtcbiAgY29uc3Qge2tleXBvaW50cywgcXVlcnlwb2ludHMsIEgsIG1hdGNoZXMsIHRocmVzaG9sZH0gPSBvcHRpb25zO1xuXG4gIGNvbnN0IHRocmVzaG9sZDIgPSB0aHJlc2hvbGQgKiB0aHJlc2hvbGQ7XG5cbiAgY29uc3QgZ29vZE1hdGNoZXMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXRjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgcXVlcnlwb2ludCA9IHF1ZXJ5cG9pbnRzW21hdGNoZXNbaV0ucXVlcnlwb2ludEluZGV4XTtcbiAgICBjb25zdCBrZXlwb2ludCA9IGtleXBvaW50c1ttYXRjaGVzW2ldLmtleXBvaW50SW5kZXhdO1xuICAgIGNvbnN0IG1wID0gbXVsdGlwbHlQb2ludEhvbW9ncmFwaHlJbmhvbW9nZW5vdXMoW2tleXBvaW50LngyRCwga2V5cG9pbnQueTJEXSwgSCk7XG4gICAgY29uc3QgZDIgPSAobXBbMF0gLSBxdWVyeXBvaW50LngyRCkgKiAobXBbMF0gLSBxdWVyeXBvaW50LngyRCkgKyAobXBbMV0gLSBxdWVyeXBvaW50LnkyRCkgKiAobXBbMV0gLSBxdWVyeXBvaW50LnkyRCk7XG4gICAgaWYgKGQyIDw9IHRocmVzaG9sZDIpIHtcbiAgICAgIGdvb2RNYXRjaGVzLnB1c2goIG1hdGNoZXNbaV0gKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGdvb2RNYXRjaGVzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbWF0Y2hcbn1cbiIsImNvbnN0IFNFQVJDSF9TSVpFMSA9IDEwO1xuY29uc3QgU0VBUkNIX1NJWkUyID0gMjtcbmNvbnN0IFRFTVBMQVRFX1NJWkUgPSAyMjtcbmNvbnN0IE1BUF9TRUFSQ0hfU0laRTEgPSAxMDtcbmNvbnN0IE1BUF9TRUFSQ0hfU0laRTIgPSAyO1xuY29uc3QgTUFYX1NJTV9USFJFU0ggPSAwLjk1O1xuY29uc3QgVEVNUExBVEVfU0RfVEhSRVNIID0gNS4wO1xuXG5jb25zdCBNQVhfVEhSRVNIID0gMC45O1xuY29uc3QgTUlOX1RIUkVTSCA9IDAuNTU7XG5jb25zdCBTRF9USFJFU0ggPSA4LjA7XG5jb25zdCBPQ0NVUEFOQ1lfU0laRSA9IDI0ICogMiAvIDM7XG5cbi8qXG4gKiBJbnB1dCBpbWFnZSBpcyBpbiBncmV5IGZvcm1hdC4gdGhlIGltYWdlRGF0YSBhcnJheSBzaXplIGlzIHdpZHRoICogaGVpZ2h0LiB2YWx1ZSByYW5nZSBmcm9tIDAtMjU1XG4gKiBwaXhlbCB2YWx1ZSBhdCByb3cgciBhbmQgYyA9IGltYWdlRGF0YVtyICogd2lkdGggKyBjXVxuICpcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gb3B0aW9ucy5pbWFnZURhdGFcbiAqIEBwYXJhbSB7aW50fSBvcHRpb25zLndpZHRoIGltYWdlIHdpZHRoXG4gKiBAcGFyYW0ge2ludH0gb3B0aW9ucy5oZWlnaHQgaW1hZ2UgaGVpZ2h0XG4gKi9cbmNvbnN0IGV4dHJhY3QgPSAob3B0aW9ucykgPT4ge1xuICBjb25zdCB7aW1hZ2VEYXRhLCB3aWR0aCwgaGVpZ2h0LCBkcGl9ID0gb3B0aW9ucztcblxuICAvLyBTdGVwIDEgLSBmaWx0ZXIgb3V0IGludGVyZXN0aW5nIHBvaW50cy4gSW50ZXJlc3RpbmcgcG9pbnRzIGhhdmUgc3Ryb25nIHBpeGVsIHZhbHVlIGNoYW5nZWQgYWNyb3NzIG5laWdoYm91cnNcbiAgY29uc3QgaXNQaXhlbFNlbGVjdGVkID0gW3dpZHRoICogaGVpZ2h0XTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpc1BpeGVsU2VsZWN0ZWQubGVuZ3RoOyBpKyspIGlzUGl4ZWxTZWxlY3RlZFtpXSA9IGZhbHNlO1xuXG4gIC8vIFN0ZXAgMS4xIGNvbnNpZGVyIGEgcGl4ZWwgYXQgcG9zaXRpb24gKHgsIHkpLiBjb21wdXRlOlxuICAvLyAgIGR4ID0gKChkYXRhW3grMSwgeS0xXSAtIGRhdGFbeC0xLCB5LTFdKSArIChkYXRhW3grMSwgeV0gLSBkYXRhW3gtMSwgeV0pICsgKGRhdGFbeCsxLCB5KzFdIC0gZGF0YVt4LTEsIHktMV0pKSAqIDI1NiAvIDNcbiAgLy8gICBkeSA9ICgoZGF0YVt4KzEsIHkrMV0gLSBkYXRhW3grMSwgeS0xXSkgKyAoZGF0YVt4LCB5KzFdIC0gZGF0YVt4LCB5LTFdKSArIChkYXRhW3gtMSwgeSsxXSAtIGRhdGFbeC0xLCB5LTFdKSkgKiAyNTYgLyAzXG4gIC8vICAgZFZhbHVlID0gIHNxcnQoZHheMiArIGR5XjIpIC8gMjtcbiAgY29uc3QgZFZhbHVlID0gbmV3IEZsb2F0MzJBcnJheShpbWFnZURhdGEubGVuZ3RoKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB3aWR0aDsgaSsrKSB7XG4gICAgZFZhbHVlW2ldID0gLTE7XG4gICAgZFZhbHVlW3dpZHRoICogKGhlaWdodC0xKSArIGldID0gLTE7XG4gIH1cbiAgZm9yIChsZXQgaiA9IDA7IGogPCBoZWlnaHQ7IGorKykge1xuICAgIGRWYWx1ZVtqKndpZHRoXSA9IC0xO1xuICAgIGRWYWx1ZVtqKndpZHRoICsgd2lkdGgtMV0gPSAtMTtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAxOyBpIDwgd2lkdGgtMTsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDE7IGogPCBoZWlnaHQtMTsgaisrKSB7XG4gICAgICBsZXQgcG9zID0gaSArIHdpZHRoICogajtcblxuICAgICAgbGV0IGR4ID0gMC4wO1xuICAgICAgbGV0IGR5ID0gMC4wO1xuICAgICAgZm9yIChsZXQgayA9IC0xOyBrIDw9IDE7IGsrKykge1xuICAgICAgICBkeCArPSAoaW1hZ2VEYXRhW3BvcyArIHdpZHRoKmsgKyAxXSAtIGltYWdlRGF0YVtwb3MgKyB3aWR0aCprIC0xXSk7XG4gICAgICAgIGR5ICs9IChpbWFnZURhdGFbcG9zICsgd2lkdGggKyBrXSAtIGltYWdlRGF0YVtwb3MgLSB3aWR0aCArIGtdKTtcbiAgICAgIH1cbiAgICAgIGR4IC89ICgzICogMjU2KTtcbiAgICAgIGR5IC89ICgzICogMjU2KTtcbiAgICAgIGRWYWx1ZVtwb3NdID0gTWF0aC5zcXJ0KCAoZHggKiBkeCArIGR5ICogZHkpIC8gMik7XG4gICAgfVxuICB9XG5cbiAgLy8gU3RlcCAxLjIgLSBzZWxlY3QgYWxsIHBpeGVsIHdoaWNoIGlzIGRWYWx1ZSBsYXJnZXN0IHRoYW4gYWxsIGl0cyBuZWlnaGJvdXIgYXMgXCJwb3RlbnRpYWxcIiBjYW5kaWRhdGVcbiAgLy8gIHRoZSBudW1iZXIgb2Ygc2VsZWN0ZWQgcG9pbnRzIGlzIHN0aWxsIHRvbyBtYW55LCBzbyB3ZSB1c2UgdGhlIHZhbHVlIHRvIGZ1cnRoZXIgZmlsdGVyIChlLmcuIGxhcmdlc3QgdGhlIGRWYWx1ZSwgdGhlIGJldHRlcilcbiAgY29uc3QgZFZhbHVlSGlzdCA9IG5ldyBVaW50OEFycmF5KDEwMDApO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDA7IGkrKykgZFZhbHVlSGlzdFtpXSA9IDA7XG4gIGNvbnN0IG5laWdoYm91ck9mZnNldHMgPSBbLTEsIDEsIC13aWR0aCwgd2lkdGhdO1xuICBsZXQgYWxsQ291bnQgPSAwO1xuICBmb3IgKGxldCBpID0gMTsgaSA8IHdpZHRoLTE7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAxOyBqIDwgaGVpZ2h0LTE7IGorKykge1xuICAgICAgbGV0IHBvcyA9IGkgKyB3aWR0aCAqIGo7XG4gICAgICBsZXQgaXNNYXggPSB0cnVlO1xuICAgICAgZm9yIChsZXQgZCA9IDA7IGQgPCBuZWlnaGJvdXJPZmZzZXRzLmxlbmd0aDsgZCsrKSB7XG4gICAgICAgIGlmIChkVmFsdWVbcG9zXSA8PSBkVmFsdWVbcG9zICsgbmVpZ2hib3VyT2Zmc2V0c1tkXV0pIHtcbiAgICAgICAgICBpc01heCA9IGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoaXNNYXgpIHtcbiAgICAgICAgbGV0IGsgPSBNYXRoLmZsb29yKGRWYWx1ZVtwb3NdICogMTAwMCk7XG4gICAgICAgIGlmIChrID4gOTk5KSBrID0gOTk5O1xuICAgICAgICBpZiAoayA8IDApIGsgPSAwO1xuICAgICAgICBkVmFsdWVIaXN0W2tdICs9IDE7XG4gICAgICAgIGFsbENvdW50ICs9IDE7XG4gICAgICAgIGlzUGl4ZWxTZWxlY3RlZFtwb3NdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdCBtYXhQb2ludHMgPSAwLjAyICogd2lkdGggKiBoZWlnaHQ7XG4gIGxldCBrID0gOTk5O1xuICBsZXQgZmlsdGVyZWRDb3VudCA9IDA7XG4gIHdoaWxlIChrID49IDApIHtcbiAgICBmaWx0ZXJlZENvdW50ICs9IGRWYWx1ZUhpc3Rba107XG4gICAgaWYgKGZpbHRlcmVkQ291bnQgPiBtYXhQb2ludHMpIGJyZWFrO1xuICAgIGstLTtcbiAgfVxuXG4gIGNvbnNvbGUubG9nKFwiaW1hZ2Ugc2l6ZTogXCIsIHdpZHRoICogaGVpZ2h0KTtcbiAgY29uc29sZS5sb2coXCJleHRyYWN0ZWQgZmVhdHVlczogXCIsIGFsbENvdW50KTtcbiAgY29uc29sZS5sb2coXCJmaWx0ZXJlZCBmZWF0dWVzOiBcIiwgZmlsdGVyZWRDb3VudCk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpc1BpeGVsU2VsZWN0ZWQubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoaXNQaXhlbFNlbGVjdGVkW2ldKSB7XG4gICAgICBpZiAoZFZhbHVlW2ldICogMTAwMCA8IGspIGlzUGl4ZWxTZWxlY3RlZFtpXSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGNvbnNvbGUubG9nKFwic2VsZWN0ZWQgY291bnQ6IFwiLCBpc1BpeGVsU2VsZWN0ZWQucmVkdWNlKChhLCBiKSA9PiB7cmV0dXJuIGEgKyAoYj8xOjApO30sIDApKTtcblxuICAvLyBTdGVwIDJcbiAgY29uc3QgZmVhdHVyZU1hcCA9IG5ldyBGbG9hdDMyQXJyYXkoaW1hZ2VEYXRhLmxlbmd0aCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgd2lkdGg7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgaGVpZ2h0OyBqKyspIHtcbiAgICAgIGNvbnN0IHBvcyA9IGogKiB3aWR0aCArIGk7XG4gICAgICBpZiAoIWlzUGl4ZWxTZWxlY3RlZFtwb3NdKSB7XG4gICAgICAgIGZlYXR1cmVNYXBbcG9zXSA9IDEuMDtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJldCA9IF9tYWtlVGVtcGxhdGUoe2ltYWdlRGF0YTogaW1hZ2VEYXRhLCB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0LCBjeDogaSwgY3k6IGosIHRlbXBsYXRlU2l6ZTogVEVNUExBVEVfU0laRSwgc2RUaHJlc2g6IFRFTVBMQVRFX1NEX1RIUkVTSH0pO1xuICAgICAgaWYgKHJldCA9PT0gbnVsbCkge1xuICAgICAgICBmZWF0dXJlTWFwW3Bvc10gPSAxLjA7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB7dGVtcGxhdGUsIHZsZW59ID0gcmV0O1xuXG4gICAgICBsZXQgbWF4ID0gLTEuMDtcbiAgICAgIGZvciAobGV0IGlpID0gLVNFQVJDSF9TSVpFMTsgaWkgPD0gU0VBUkNIX1NJWkUxOyBpaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGpqID0gLVNFQVJDSF9TSVpFMTsgamogPD0gU0VBUkNIX1NJWkUxOyBqaisrKSB7XG4gICAgICAgICAgaWYgKGlpICogaWkgKyBqaiAqIGpqIDw9IFNFQVJDSF9TSVpFMiAqIFNFQVJDSF9TSVpFMikgY29udGludWU7XG4gICAgICAgICAgY29uc3Qgc2ltID0gX2dldFNpbWlsYXJpdHkoe2ltYWdlRGF0YSwgd2lkdGgsIGhlaWdodCwgY3g6IGkraWksIGN5OiBqK2pqLCB0ZW1wbGF0ZVNpemU6IFRFTVBMQVRFX1NJWkUsIHZsZW46IHZsZW4sIHRlbXBsYXRlOiB0ZW1wbGF0ZX0pO1xuICAgICAgICAgIGlmIChzaW0gPT09IG51bGwpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgaWYgKHNpbSA+IG1heCkge1xuICAgICAgICAgICAgbWF4ID0gc2ltO1xuICAgICAgICAgICAgaWYgKG1heCA+IE1BWF9TSU1fVEhSRVNIKSBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1heCA+IE1BWF9TSU1fVEhSRVNIKSBicmVhaztcbiAgICAgIH1cbiAgICAgIGZlYXR1cmVNYXBbcG9zXSA9IG1heDtcbiAgICB9XG4gIH1cbiAgLy8gZGVidWdJbWFnZURhdGEoe2ZpbGVuYW1lOiBcIi4vZmVhdHVyZU1hcF9cIit3aWR0aCtcIi5wbmdcIiwgZGF0YTogZmVhdHVyZU1hcCwgaGVpZ2h0OiBoZWlnaHQsIHdpZHRoOiB3aWR0aH0pO1xuXG4gIC8vIFN0ZXAgMi4yIHNlbGVjdCBmZWF0dXJlXG4gIGNvbnN0IGNvb3JkcyA9IF9zZWxlY3RGZWF0dXJlKHtpbWFnZURhdGEsIHdpZHRoLCBoZWlnaHQsIGRwaSwgZmVhdHVyZU1hcCwgdGVtcGxhdGVTaXplOiBURU1QTEFURV9TSVpFLCBzZWFyY2hTaXplOiBTRUFSQ0hfU0laRTIsIG9jY1NpemU6IE9DQ1VQQU5DWV9TSVpFLCBtYXhTaW1UaHJlc2g6IE1BWF9USFJFU0gsIG1pblNpbVRocmVzaDogTUlOX1RIUkVTSCwgc2RUaHJlc2g6IFNEX1RIUkVTSH0pO1xuXG4gIHJldHVybiBjb29yZHM7XG59XG5cbmNvbnN0IF9zZWxlY3RGZWF0dXJlID0gKG9wdGlvbnMpID0+IHtcbiAgbGV0IHtpbWFnZURhdGEsIHdpZHRoLCBoZWlnaHQsIGRwaSwgZmVhdHVyZU1hcCwgdGVtcGxhdGVTaXplLCBzZWFyY2hTaXplLCBvY2NTaXplLCBtYXhTaW1UaHJlc2gsIG1pblNpbVRocmVzaCwgc2RUaHJlc2h9ID0gb3B0aW9ucztcblxuICBjb25zb2xlLmxvZyhcInBhcmFtczogXCIsIHRlbXBsYXRlU2l6ZSwgdGVtcGxhdGVTaXplLCBvY2NTaXplLCBtYXhTaW1UaHJlc2gsIG1pblNpbVRocmVzaCwgc2RUaHJlc2gpO1xuXG4gIG9jY1NpemUgKj0gMjtcblxuICBjb25zdCBkaXZTaXplID0gKHRlbXBsYXRlU2l6ZSAqIDIgKyAxKSAqIDM7XG4gIGNvbnN0IHhEaXYgPSBNYXRoLmZsb29yKHdpZHRoIC8gZGl2U2l6ZSk7XG4gIGNvbnN0IHlEaXYgPSBNYXRoLmZsb29yKGhlaWdodCAvIGRpdlNpemUpO1xuXG4gIGNvbnN0IG1heEZlYXR1cmVOdW0gPSBNYXRoLmZsb29yKHdpZHRoIC8gb2NjU2l6ZSkgKiBNYXRoLmZsb29yKGhlaWdodCAvIG9jY1NpemUpICsgeERpdiAqIHlEaXY7XG4gIGNvbnNvbGUubG9nKFwibWF4IGZlYXR1cmUgbnVtOiBcIiwgbWF4RmVhdHVyZU51bSk7XG5cbiAgY29uc3QgY29vcmRzID0gW107XG4gIGNvbnN0IGltYWdlMiA9IG5ldyBGbG9hdDMyQXJyYXkoaW1hZ2VEYXRhLmxlbmd0aCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaW1hZ2UyLmxlbmd0aDsgaSsrKSB7XG4gICAgaW1hZ2UyW2ldID0gZmVhdHVyZU1hcFtpXTtcbiAgfVxuXG4gIGxldCBudW0gPSAwO1xuICB3aGlsZSAobnVtIDwgbWF4RmVhdHVyZU51bSkge1xuICAgIGxldCBtaW5TaW0gPSBtYXhTaW1UaHJlc2g7XG4gICAgbGV0IGN4ID0gLTE7XG4gICAgbGV0IGN5ID0gLTE7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBoZWlnaHQ7IGorKykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3aWR0aDsgaSsrKSB7XG4gICAgICAgIGlmIChpbWFnZTJbaip3aWR0aCtpXSA8IG1pblNpbSkge1xuICAgICAgICAgIG1pblNpbSA9IGltYWdlMltqKndpZHRoK2ldO1xuICAgICAgICAgIGN4ID0gaTtcbiAgICAgICAgICBjeSA9IGo7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGN4ID09PSAtMSkgYnJlYWs7XG5cbiAgICBjb25zdCByZXQgPSBfbWFrZVRlbXBsYXRlKHtpbWFnZURhdGEsIHdpZHRoLCBoZWlnaHQsIGN4LCBjeSwgdGVtcGxhdGVTaXplLCBzZFRocmVzaDogMC4wfSk7XG4gICAgaWYgKHJldCA9PT0gbnVsbCkge1xuICAgICAgaW1hZ2UyWyBjeSAqIHdpZHRoICsgY3ggXSA9IDEuMDtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBjb25zdCB7dGVtcGxhdGUsIHZsZW59ID0gcmV0O1xuICAgIGlmICh2bGVuIC8gKHRlbXBsYXRlU2l6ZSAqIDIgKyAxKSA8IHNkVGhyZXNoKSB7XG4gICAgICBpbWFnZTJbIGN5ICogd2lkdGggKyBjeCBdID0gMS4wO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgbGV0IG1pbiA9IDEuMDtcbiAgICBsZXQgbWF4ID0gLTEuMDtcblxuICAgIGZvciAobGV0IGogPSAtc2VhcmNoU2l6ZTsgaiA8PSBzZWFyY2hTaXplOyBqKyspIHtcbiAgICAgIGZvciAobGV0IGkgPSAtc2VhcmNoU2l6ZTsgaSA8PSBzZWFyY2hTaXplOyBpKyspIHtcbiAgICAgICAgaWYgKGkqaSArIGoqaiA+IHNlYXJjaFNpemUgKiBzZWFyY2hTaXplKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGkgPT09IDAgJiYgaiA9PT0gMCkgY29udGludWU7XG5cbiAgICAgICAgY29uc3Qgc2ltID0gX2dldFNpbWlsYXJpdHkoe2ltYWdlRGF0YSwgd2lkdGgsIGhlaWdodCwgdGVtcGxhdGUsIHZsZW4sIHRlbXBsYXRlU2l6ZSwgY3g6IGN4K2ksIGN5OiBjeStqfSk7XG4gICAgICAgIGlmIChzaW0gPT09IG51bGwpIGNvbnRpbnVlO1xuXG4gICAgICAgIGlmIChzaW0gPCBtaW4pIHtcbiAgICAgICAgICBtaW4gPSBzaW07XG4gICAgICAgICAgaWYgKG1pbiA8IG1pblNpbVRocmVzaCAmJiBtaW4gPCBtaW5TaW0pIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzaW0gPiBtYXgpIHtcbiAgICAgICAgICBtYXggPSBzaW07XG4gICAgICAgICAgaWYgKG1heCA+IDAuOTkpIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiggKG1pbiA8IG1pblNpbVRocmVzaCAmJiBtaW4gPCBtaW5TaW0pIHx8IG1heCA+IDAuOTkgKSBicmVhaztcbiAgICB9XG5cbiAgICBpZiggKG1pbiA8IG1pblNpbVRocmVzaCAmJiBtaW4gPCBtaW5TaW0pIHx8IG1heCA+IDAuOTkgKSB7XG4gICAgICAgIGltYWdlMlsgY3kgKiB3aWR0aCArIGN4IF0gPSAxLjA7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGNvb3Jkcy5wdXNoKHtcbiAgICAgIHg6IGN4LFxuICAgICAgeTogY3ksXG4gICAgICBteDogMS4wICogY3ggLyBkcGkgKiAyNS40LFxuICAgICAgbXk6IDEuMCAqIChoZWlnaHQgLSBjeSkgLyBkcGkgKiAyNS40LFxuICAgICAgbWF4U2ltOiBtaW5TaW0sXG4gICAgfSlcblxuICAgIG51bSArPSAxO1xuICAgIGNvbnNvbGUubG9nKG51bSwgJygnLCBjeCwgJywnLCBjeSwgJyknLCBtaW5TaW0sICdtaW4gPSAnLCBtaW4sICdtYXggPSAnLCBtYXgsICdzZCA9ICcsIHZsZW4vKHRlbXBsYXRlU2l6ZSoyKzEpKTtcblxuICAgIGZvciAobGV0IGogPSAtb2NjU2l6ZTsgaiA8PSBvY2NTaXplOyBqKyspIHtcbiAgICAgIGZvciAobGV0IGkgPSAtb2NjU2l6ZTsgaSA8PSBvY2NTaXplOyBpKyspIHtcbiAgICAgICAgaWYgKGN5ICsgaiA8IDAgfHwgY3kgKyBqID49IGhlaWdodCB8fCBjeCArIGkgPCAwIHx8IGN4ICsgaSA+PSB3aWR0aCkgY29udGludWU7XG4gICAgICAgIGltYWdlMlsgKGN5K2opKndpZHRoICsgKGN4K2kpIF0gPSAxLjA7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBjb29yZHM7XG59XG5cbmNvbnN0IF9tYWtlVGVtcGxhdGUgPSAob3B0aW9ucykgPT4ge1xuICBjb25zdCB7aW1hZ2VEYXRhLCB3aWR0aCwgaGVpZ2h0LCBjeCwgY3ksIHRlbXBsYXRlU2l6ZSwgc2RUaHJlc2h9ID0gb3B0aW9ucztcblxuICBpZiAoY3ggLSB0ZW1wbGF0ZVNpemUgPCAwIHx8IGN4ICsgdGVtcGxhdGVTaXplID49IHdpZHRoKSByZXR1cm4gbnVsbDtcbiAgaWYgKGN5IC0gdGVtcGxhdGVTaXplIDwgMCB8fCBjeSArIHRlbXBsYXRlU2l6ZSA+PSBoZWlnaHQpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IHRlbXBsYXRlV2lkdGggPSAyICogdGVtcGxhdGVTaXplICsgMTtcblxuICBsZXQgYXZlcmFnZSA9IDAuMDtcbiAgZm9yIChsZXQgaSA9IGN4IC0gdGVtcGxhdGVTaXplOyBpIDw9IGN4ICsgdGVtcGxhdGVTaXplOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gY3kgLSB0ZW1wbGF0ZVNpemU7IGogPD0gY3kgKyB0ZW1wbGF0ZVNpemU7IGorKykge1xuICAgICAgYXZlcmFnZSArPSBpbWFnZURhdGFbaip3aWR0aCtpXTtcbiAgICB9XG4gIH1cbiAgYXZlcmFnZSAvPSAodGVtcGxhdGVXaWR0aCAqIHRlbXBsYXRlV2lkdGgpO1xuXG4gIGNvbnN0IHRlbXBsYXRlID0gW107XG4gIGxldCB2bGVuID0gMC4wO1xuICBmb3IgKGxldCBpID0gY3ggLSB0ZW1wbGF0ZVNpemU7IGkgPD0gY3ggKyB0ZW1wbGF0ZVNpemU7IGkrKykge1xuICAgIGZvciAobGV0IGogPSBjeSAtIHRlbXBsYXRlU2l6ZTsgaiA8PSBjeSArIHRlbXBsYXRlU2l6ZTsgaisrKSB7XG4gICAgICBjb25zdCBkaWZmID0gaW1hZ2VEYXRhW2oqd2lkdGgraV0gLSBhdmVyYWdlO1xuICAgICAgY29uc3QgdGVtcGxhdGVYID0gaSAtIChjeCAtIHRlbXBsYXRlU2l6ZSk7XG4gICAgICBjb25zdCB0ZW1wbGF0ZVkgPSBqIC0gKGN5IC0gdGVtcGxhdGVTaXplKTtcbiAgICAgIHRlbXBsYXRlW3RlbXBsYXRlWSAqIHRlbXBsYXRlV2lkdGggKyB0ZW1wbGF0ZVhdID0gZGlmZjtcbiAgICAgIHZsZW4gKz0gKGRpZmYqZGlmZik7XG4gICAgfVxuICB9XG5cbiAgaWYgKHZsZW4gPT0gMCkgcmV0dXJuIG51bGw7XG4gIGlmICh2bGVuIC8gKHRlbXBsYXRlV2lkdGggKiB0ZW1wbGF0ZVdpZHRoKSA8IHNkVGhyZXNoKSByZXR1cm4gbnVsbDtcbiAgdmxlbiA9IE1hdGguc3FydCh2bGVuKTtcblxuICByZXR1cm4ge3RlbXBsYXRlOiB0ZW1wbGF0ZSwgdmxlbjogdmxlbn07XG59XG5cbmNvbnN0IF9nZXRTaW1pbGFyaXR5ID0gKG9wdGlvbnMpID0+IHtcbiAgY29uc3Qge2ltYWdlRGF0YSwgd2lkdGgsIGhlaWdodCwgY3gsIGN5LCB0ZW1wbGF0ZSwgdmxlbiwgdGVtcGxhdGVTaXplfSA9IG9wdGlvbnM7XG5cbiAgaWYgKGN4IC0gdGVtcGxhdGVTaXplIDwgMCB8fCBjeCArIHRlbXBsYXRlU2l6ZSA+PSB3aWR0aCkgcmV0dXJuIG51bGw7XG4gIGlmIChjeSAtIHRlbXBsYXRlU2l6ZSA8IDAgfHwgY3kgKyB0ZW1wbGF0ZVNpemUgPj0gaGVpZ2h0KSByZXR1cm4gbnVsbDtcblxuICBjb25zdCB0ZW1wbGF0ZVdpZHRoID0gMiAqIHRlbXBsYXRlU2l6ZSArIDE7XG5cbiAgbGV0IHN4ID0gMC4wO1xuICBsZXQgc3h4ID0gMC4wO1xuICBsZXQgc3h5ID0gMC4wO1xuXG4gIGZvciAobGV0IGkgPSBjeCAtIHRlbXBsYXRlU2l6ZTsgaSA8PSBjeCArIHRlbXBsYXRlU2l6ZTsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IGN5IC0gdGVtcGxhdGVTaXplOyBqIDw9IGN5ICsgdGVtcGxhdGVTaXplOyBqKyspIHtcbiAgICAgIGNvbnN0IHYgPSBpbWFnZURhdGFbaip3aWR0aCtpXTtcbiAgICAgIGNvbnN0IHRlbXBsYXRlWCA9IGkgLSAoY3ggLSB0ZW1wbGF0ZVNpemUpO1xuICAgICAgY29uc3QgdGVtcGxhdGVZID0gaiAtIChjeSAtIHRlbXBsYXRlU2l6ZSk7XG4gICAgICBzeCArPSB2O1xuICAgICAgc3h4ICs9IHYgKiB2O1xuICAgICAgc3h5ICs9IHYgKiB0ZW1wbGF0ZVt0ZW1wbGF0ZVkgKiB0ZW1wbGF0ZVdpZHRoICsgdGVtcGxhdGVYXTtcbiAgICB9XG4gIH1cblxuICBsZXQgdmxlbjIgPSBzeHggLSBzeCpzeCAvICh0ZW1wbGF0ZVdpZHRoICogdGVtcGxhdGVXaWR0aCk7XG4gIGlmICh2bGVuMiA9PSAwKSByZXR1cm4gbnVsbDtcbiAgdmxlbjIgPSBNYXRoLnNxcnQodmxlbjIpO1xuXG4gIGNvbnN0IHNpbSA9IHN4eSAvICh2bGVuICogdmxlbjIpO1xuICByZXR1cm4gc2ltO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZXh0cmFjdFxufTtcblxuIiwiY29uc3Qge2V4dHJhY3R9ID0gcmVxdWlyZSgnLi9leHRyYWN0b3InKTtcblxuY2xhc3MgVHJhY2tlciB7XG4gIGNvbnN0cnVjdG9yKGltYWdlTGlzdCwgcHJvamVjdGlvblRyYW5zZm9ybSkge1xuICAgIHRoaXMuZmVhdHVyZVNldHMgPSBfYnVpbGRGZWF0dXJlU2V0cyhpbWFnZUxpc3QpO1xuICB9XG59XG5cbmNvbnN0IF9idWlsZEZlYXR1cmVTZXRzID0gKHtpbWFnZUxpc3R9KSA9PiB7XG4gIGNvbnN0IGZlYXR1cmVTZXRzID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaW1hZ2VMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgaW1hZ2UgPSBpbWFnZUxpc3RbaV07XG4gICAgY29uc3QgY29vcmRzID0gZXh0cmFjdCh7aW1hZ2VEYXRhOiBpbWFnZS5kYXRhLCB3aWR0aDogaW1hZ2Uud2lkdGgsIGhlaWdodDogaW1hZ2UuaGVpZ2h0LCBkcGk6IGltYWdlLmRwaX0pO1xuXG4gICAgY29uc3QgZmVhdHVyZVNldCA9IHt9O1xuICAgIGZlYXR1cmVTZXQuc2NhbGUgPSBpO1xuICAgIGZlYXR1cmVTZXQubWluZHBpID0gKGkgPT09IGltYWdlTGlzdC5sZW5ndGgtMSk/IGltYWdlTGlzdFtpXS5kcGkgKiAwLjU6IGltYWdlTGlzdFtpKzFdLmRwaTtcbiAgICBmZWF0dXJlU2V0Lm1heGRwaSA9IChpID09PSAwKT8gaW1hZ2VMaXN0W2ldLmRwaSAqIDI6IChpbWFnZUxpc3RbaV0uZHBpICogMC44ICsgaW1hZ2VMaXN0W2ktMV0uZHBpICogMC4yKTtcbiAgICBmZWF0dXJlU2V0LmNvb3JkcyA9IFtdO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29vcmRzLmxlbmd0aDsgaisrKSB7XG4gICAgICBmZWF0dXJlU2V0LmNvb3Jkcy5wdXNoKHtcbiAgICAgICAgeDogY29vcmRzW2pdLngsXG4gICAgICAgIHk6IGNvb3Jkc1tqXS55LFxuICAgICAgICBteDogY29vcmRzW2pdLm14LFxuICAgICAgICBteTogY29vcmRzW2pdLm15LFxuICAgICAgICBtYXhTaW06IGNvb3Jkc1tqXS5tYXhTaW0sXG4gICAgICB9KTtcbiAgICB9XG4gICAgZmVhdHVyZVNldHMucHVzaChmZWF0dXJlU2V0KTtcbiAgfVxuICByZXR1cm4gZmVhdHVyZVNldHM7XG59XG5cbmNvbnN0IGNvbXBpbGVUcmFja2luZyA9ICh7aW1hZ2VMaXN0fSkgPT4ge1xuICBjb25zdCBmZWF0dXJlU2V0cyA9IF9idWlsZEZlYXR1cmVTZXRzKHtpbWFnZUxpc3R9KTtcbiAgcmV0dXJuIHtmZWF0dXJlU2V0c307XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBUcmFja2VyLFxuICBjb21waWxlVHJhY2tpbmdcbn1cbiIsIi8vIGNoZWNrIHdoaWNoIHNpZGUgcG9pbnQgQyBvbiB0aGUgbGluZSBmcm9tIEEgdG8gQlxuY29uc3QgbGluZVBvaW50U2lkZSA9IChBLCBCLCBDKSA9PiB7XG4gIHJldHVybiAoKEJbMF0tQVswXSkqKENbMV0tQVsxXSktKEJbMV0tQVsxXSkqKENbMF0tQVswXSkpO1xufVxuXG4vLyBzcmNQb2ludHMsIGRzdFBvaW50czogYXJyYXkgb2YgZm91ciBlbGVtZW50cyBbeCwgeV1cbmNvbnN0IGNoZWNrRm91clBvaW50c0NvbnNpc3RlbnQgPSAoeDEsIHgyLCB4MywgeDQsIHgxcCwgeDJwLCB4M3AsIHg0cCkgPT4ge1xuICBpZiAoKGxpbmVQb2ludFNpZGUoeDEsIHgyLCB4MykgPiAwKSAhPT0gKGxpbmVQb2ludFNpZGUoeDFwLCB4MnAsIHgzcCkgPiAwKSkgcmV0dXJuIGZhbHNlO1xuICBpZiAoKGxpbmVQb2ludFNpZGUoeDIsIHgzLCB4NCkgPiAwKSAhPT0gKGxpbmVQb2ludFNpZGUoeDJwLCB4M3AsIHg0cCkgPiAwKSkgcmV0dXJuIGZhbHNlO1xuICBpZiAoKGxpbmVQb2ludFNpZGUoeDMsIHg0LCB4MSkgPiAwKSAhPT0gKGxpbmVQb2ludFNpZGUoeDNwLCB4NHAsIHgxcCkgPiAwKSkgcmV0dXJuIGZhbHNlO1xuICBpZiAoKGxpbmVQb2ludFNpZGUoeDQsIHgxLCB4MikgPiAwKSAhPT0gKGxpbmVQb2ludFNpZGUoeDRwLCB4MXAsIHgycCkgPiAwKSkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuY29uc3QgY2hlY2tUaHJlZVBvaW50c0NvbnNpc3RlbnQgPSAoeDEsIHgyLCB4MywgeDFwLCB4MnAsIHgzcCkgPT4ge1xuICBpZiAoKGxpbmVQb2ludFNpZGUoeDEsIHgyLCB4MykgPiAwKSAhPT0gKGxpbmVQb2ludFNpZGUoeDFwLCB4MnAsIHgzcCkgPiAwKSkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuY29uc3QgZGV0ZXJtaW5hbnQgPSAoQSkgPT4ge1xuICBjb25zdCBDMSA9ICBBWzRdICogQVs4XSAtIEFbNV0gKiBBWzddO1xuICBjb25zdCBDMiA9ICBBWzNdICogQVs4XSAtIEFbNV0gKiBBWzZdO1xuICBjb25zdCBDMyA9ICBBWzNdICogQVs3XSAtIEFbNF0gKiBBWzZdO1xuICByZXR1cm4gQVswXSAqIEMxIC0gQVsxXSAqIEMyICsgQVsyXSAqIEMzO1xufVxuXG5jb25zdCBtYXRyaXhJbnZlcnNlMzMgPSAoQSwgdGhyZXNob2xkKSA9PiB7XG4gIGNvbnN0IGRldCA9IGRldGVybWluYW50KEEpO1xuICBpZiAoTWF0aC5hYnMoZGV0KSA8PSB0aHJlc2hvbGQpIHJldHVybiBudWxsO1xuICBjb25zdCBvbmVPdmVyID0gMS4wIC8gZGV0O1xuXG4gIGNvbnN0IEIgPSBbXG4gICAgKEFbNF0gKiBBWzhdIC0gQVs1XSAqIEFbN10pICogb25lT3ZlcixcbiAgICAoQVsyXSAqIEFbN10gLSBBWzFdICogQVs4XSkgKiBvbmVPdmVyLFxuICAgIChBWzFdICogQVs1XSAtIEFbMl0gKiBBWzRdKSAqIG9uZU92ZXIsXG4gICAgKEFbNV0gKiBBWzZdIC0gQVszXSAqIEFbOF0pICogb25lT3ZlcixcbiAgICAoQVswXSAqIEFbOF0gLSBBWzJdICogQVs2XSkgKiBvbmVPdmVyLFxuICAgIChBWzJdICogQVszXSAtIEFbMF0gKiBBWzVdKSAqIG9uZU92ZXIsXG4gICAgKEFbM10gKiBBWzddIC0gQVs0XSAqIEFbNl0pICogb25lT3ZlcixcbiAgICAoQVsxXSAqIEFbNl0gLSBBWzBdICogQVs3XSkgKiBvbmVPdmVyLFxuICAgIChBWzBdICogQVs0XSAtIEFbMV0gKiBBWzNdKSAqIG9uZU92ZXIsXG4gIF07XG4gIHJldHVybiBCO1xufVxuXG5jb25zdCBtYXRyaXhNdWwzMyA9IChBLCBCKSA9PiB7XG4gIGNvbnN0IEMgPSBbXTtcbiAgQ1swXSA9IEFbMF0qQlswXSArIEFbMV0qQlszXSArIEFbMl0qQls2XTtcbiAgQ1sxXSA9IEFbMF0qQlsxXSArIEFbMV0qQls0XSArIEFbMl0qQls3XTtcbiAgQ1syXSA9IEFbMF0qQlsyXSArIEFbMV0qQls1XSArIEFbMl0qQls4XTtcbiAgQ1szXSA9IEFbM10qQlswXSArIEFbNF0qQlszXSArIEFbNV0qQls2XTtcbiAgQ1s0XSA9IEFbM10qQlsxXSArIEFbNF0qQls0XSArIEFbNV0qQls3XTtcbiAgQ1s1XSA9IEFbM10qQlsyXSArIEFbNF0qQls1XSArIEFbNV0qQls4XTtcbiAgQ1s2XSA9IEFbNl0qQlswXSArIEFbN10qQlszXSArIEFbOF0qQls2XTtcbiAgQ1s3XSA9IEFbNl0qQlsxXSArIEFbN10qQls0XSArIEFbOF0qQls3XTtcbiAgQ1s4XSA9IEFbNl0qQlsyXSArIEFbN10qQls1XSArIEFbOF0qQls4XTtcbiAgcmV0dXJuIEM7XG59XG5cbmNvbnN0IG11bHRpcGx5UG9pbnRIb21vZ3JhcGh5SW5ob21vZ2Vub3VzID0gKHgsIEgpID0+IHtcbiAgY29uc3QgdyA9IEhbNl0qeFswXSArIEhbN10qeFsxXSArIEhbOF07XG4gIGNvbnN0IHhwID0gW107XG4gIHhwWzBdID0gKEhbMF0qeFswXSArIEhbMV0qeFsxXSArIEhbMl0pL3c7XG4gIHhwWzFdID0gKEhbM10qeFswXSArIEhbNF0qeFsxXSArIEhbNV0pL3c7XG4gIHJldHVybiB4cDtcbn1cblxuY29uc3Qgc21hbGxlc3RUcmlhbmdsZUFyZWEgPSAoeDEsIHgyLCB4MywgeDQpID0+IHtcbiAgY29uc3QgdjEyID0gX3ZlY3Rvcih4MiwgeDEpO1xuICBjb25zdCB2MTMgPSBfdmVjdG9yKHgzLCB4MSk7XG4gIGNvbnN0IHYxNCA9IF92ZWN0b3IoeDQsIHgxKTtcbiAgY29uc3QgdjMyID0gX3ZlY3Rvcih4MiwgeDMpO1xuICBjb25zdCB2MzQgPSBfdmVjdG9yKHg0LCB4Myk7XG4gIGNvbnN0IGExID0gX2FyZWFPZlRyaWFuZ2xlKHYxMiwgdjEzKTtcbiAgY29uc3QgYTIgPSBfYXJlYU9mVHJpYW5nbGUodjEzLCB2MTQpO1xuICBjb25zdCBhMyA9IF9hcmVhT2ZUcmlhbmdsZSh2MTIsIHYxNCk7XG4gIGNvbnN0IGE0ID0gX2FyZWFPZlRyaWFuZ2xlKHYzMiwgdjM0KTtcbiAgcmV0dXJuIE1hdGgubWluKE1hdGgubWluKE1hdGgubWluKGExLCBhMiksIGEzKSwgYTQpO1xufVxuXG4vLyBjaGVjayBpZiBmb3VyIHBvaW50cyBmb3JtIGEgY29udmV4IHF1YWRyaWxhdGVybmFsLlxuY29uc3QgcXVhZHJpbGF0ZXJhbENvbnZleCA9ICh4MSwgeDIsIHgzLCB4NCkgPT4ge1xuICBpZiAobGluZVBvaW50U2lkZSh4MSwgeDIsIHgzKSA8PSAwKSByZXR1cm4gZmFsc2U7XG4gIGlmIChsaW5lUG9pbnRTaWRlKHgyLCB4MywgeDQpIDw9IDApIHJldHVybiBmYWxzZTtcbiAgaWYgKGxpbmVQb2ludFNpZGUoeDMsIHg0LCB4MSkgPD0gMCkgcmV0dXJuIGZhbHNlO1xuICBpZiAobGluZVBvaW50U2lkZSh4NCwgeDEsIHgyKSA8PSAwKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiB0cnVlO1xufVxuXG5jb25zdCBfdmVjdG9yID0gKGEsIGIpID0+IHtcbiAgcmV0dXJuIFtcbiAgICBhWzBdIC0gYlswXSxcbiAgICBhWzFdIC0gYlsxXVxuICBdXG59XG5cbmNvbnN0IF9hcmVhT2ZUcmlhbmdsZSA9ICh1LCB2KSA9PiB7XG4gIGNvbnN0IGEgPSB1WzBdKnZbMV0gLSB1WzFdKnZbMF07XG4gIHJldHVybiBNYXRoLmFicyhhKSAqIDAuNTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG1hdHJpeEludmVyc2UzMyxcbiAgbWF0cml4TXVsMzMsXG4gIHF1YWRyaWxhdGVyYWxDb252ZXgsXG4gIHNtYWxsZXN0VHJpYW5nbGVBcmVhLFxuICBtdWx0aXBseVBvaW50SG9tb2dyYXBoeUluaG9tb2dlbm91cyxcbiAgY2hlY2tUaHJlZVBvaW50c0NvbnNpc3RlbnQsXG4gIGNoZWNrRm91clBvaW50c0NvbnNpc3RlbnQsXG4gIGRldGVybWluYW50XG59XG5cbiIsImNvbnN0IHVwc2FtcGxlQmlsaW5lYXIgPSAoe2ltYWdlLCBwYWRPbmVXaWR0aCwgcGFkT25lSGVpZ2h0fSkgPT4ge1xuICBjb25zdCB7d2lkdGgsIGhlaWdodCwgZGF0YX0gPSBpbWFnZTtcblxuICBjb25zdCBkc3RXaWR0aCA9IGltYWdlLndpZHRoICogMiArIChwYWRPbmVXaWR0aD8xOjApO1xuICBjb25zdCBkc3RIZWlnaHQgPSBpbWFnZS5oZWlnaHQgKiAyICsgKHBhZE9uZUhlaWdodD8xOjApO1xuXG4gIGNvbnN0IHRlbXAgPSBuZXcgRmxvYXQzMkFycmF5KGRzdFdpZHRoICogZHN0SGVpZ2h0KTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBkc3RXaWR0aDsgaSsrKSB7XG4gICAgY29uc3Qgc2kgPSAwLjUgKiBpIC0gMC4yNTtcbiAgICBsZXQgc2kwID0gTWF0aC5mbG9vcihzaSk7XG4gICAgbGV0IHNpMSA9IE1hdGguY2VpbChzaSk7XG4gICAgaWYgKHNpMCA8IDApIHNpMCA9IDA7IC8vIGJvcmRlclxuICAgIGlmIChzaTEgPj0gd2lkdGgpIHNpMSA9IHdpZHRoIC0gMTsgLy8gYm9yZGVyXG5cbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGRzdEhlaWdodDsgaisrKSB7XG4gICAgICBjb25zdCBzaiA9IDAuNSAqIGogLSAwLjI1O1xuICAgICAgbGV0IHNqMCA9IE1hdGguZmxvb3Ioc2opO1xuICAgICAgbGV0IHNqMSA9IE1hdGguY2VpbChzaik7XG4gICAgICBpZiAoc2owIDwgMCkgc2owID0gMDsgLy8gYm9yZGVyXG4gICAgICBpZiAoc2oxID49IGhlaWdodCkgc2oxID0gaGVpZ2h0IC0gMTsgLy9ib3JkZXJcblxuICAgICAgY29uc3QgdmFsdWUgPSAoc2kxIC0gc2kpICogKHNqMSAtIHNqKSAqIGRhdGFbIHNqMCAqIHdpZHRoICsgc2kwIF0gK1xuICAgICAgICAgICAgICAgICAgICAoc2kxIC0gc2kpICogKHNqIC0gc2owKSAqIGRhdGFbIHNqMSAqIHdpZHRoICsgc2kwIF0gK1xuICAgICAgICAgICAgICAgICAgICAoc2kgLSBzaTApICogKHNqMSAtIHNqKSAqIGRhdGFbIHNqMCAqIHdpZHRoICsgc2kxIF0gK1xuICAgICAgICAgICAgICAgICAgICAoc2kgLSBzaTApICogKHNqIC0gc2owKSAqIGRhdGFbIHNqMSAqIHdpZHRoICsgc2kxIF07XG5cbiAgICAgIHRlbXBbaiAqIGRzdFdpZHRoICsgaV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge2RhdGE6IHRlbXAsIHdpZHRoOiBkc3RXaWR0aCwgaGVpZ2h0OiBkc3RIZWlnaHR9O1xufVxuXG5jb25zdCBkb3duc2FtcGxlQmlsaW5lYXIgPSAoe2ltYWdlfSkgPT4ge1xuICBjb25zdCB7ZGF0YSwgd2lkdGgsIGhlaWdodH0gPSBpbWFnZTtcblxuICBjb25zdCBkc3RXaWR0aCA9IE1hdGguZmxvb3Iod2lkdGggLyAyKTtcbiAgY29uc3QgZHN0SGVpZ2h0ID0gTWF0aC5mbG9vcihoZWlnaHQgLyAyKTtcblxuICBjb25zdCB0ZW1wID0gbmV3IEZsb2F0MzJBcnJheShkc3RXaWR0aCAqIGRzdEhlaWdodCk7XG4gIGNvbnN0IG9mZnNldHMgPSBbMCwgMSwgd2lkdGgsIHdpZHRoKzFdO1xuICBmb3IgKGxldCBqID0gMDsgaiA8IGRzdEhlaWdodDsgaisrKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkc3RXaWR0aDsgaSsrKSB7XG4gICAgICBsZXQgc3JjUG9zID0gaioyICogd2lkdGggKyBpKjI7XG5cbiAgICAgIGxldCB2YWx1ZSA9IDAuMDtcbiAgICAgIGZvciAobGV0IGQgPSAwOyBkIDwgb2Zmc2V0cy5sZW5ndGg7IGQrKykge1xuICAgICAgICB2YWx1ZSArPSBkYXRhW3NyY1Bvcysgb2Zmc2V0c1tkXV07XG4gICAgICB9XG4gICAgICB2YWx1ZSAqPSAwLjI1O1xuICAgICAgdGVtcFtqKmRzdFdpZHRoK2ldID0gdmFsdWU7XG4gICAgfVxuICB9XG4gIHJldHVybiB7ZGF0YTogdGVtcCwgd2lkdGg6IGRzdFdpZHRoLCBoZWlnaHQ6IGRzdEhlaWdodH07XG59XG5cbmNvbnN0IHJlc2l6ZSA9ICh7aW1hZ2UsIHJhdGlvfSkgPT4ge1xuICBjb25zdCB3aWR0aCA9IE1hdGgucm91bmQoaW1hZ2Uud2lkdGggKiByYXRpbyk7XG4gIGNvbnN0IGhlaWdodCA9IE1hdGgucm91bmQoaW1hZ2UuaGVpZ2h0ICogcmF0aW8pO1xuXG4gIGNvbnN0IGltYWdlRGF0YSA9IG5ldyBGbG9hdDMyQXJyYXkod2lkdGggKiBoZWlnaHQpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHdpZHRoOyBpKyspIHtcbiAgICBsZXQgc2kxID0gTWF0aC5yb3VuZCgxLjAgKiBpIC8gcmF0aW8pO1xuICAgIGxldCBzaTIgPSBNYXRoLnJvdW5kKDEuMCAqIChpKzEpIC8gcmF0aW8pIC0gMTtcbiAgICBpZiAoc2kyID49IGltYWdlLndpZHRoKSBzaTIgPSBpbWFnZS53aWR0aCAtIDE7XG5cbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGhlaWdodDsgaisrKSB7XG4gICAgICBsZXQgc2oxID0gTWF0aC5yb3VuZCgxLjAgKiBqIC8gcmF0aW8pO1xuICAgICAgbGV0IHNqMiA9IE1hdGgucm91bmQoMS4wICogKGorMSkgLyByYXRpbykgLSAxO1xuICAgICAgaWYgKHNqMiA+PSBpbWFnZS5oZWlnaHQpIHNqMiA9IGltYWdlLmhlaWdodCAtIDE7XG5cbiAgICAgIGxldCBzdW0gPSAwO1xuICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgIGZvciAobGV0IGlpID0gc2kxOyBpaSA8PSBzaTI7IGlpKyspIHtcbiAgICAgICAgZm9yIChsZXQgamogPSBzajE7IGpqIDw9IHNqMjsgamorKykge1xuICAgICAgICAgIHN1bSArPSAoMS4wICogaW1hZ2UuZGF0YVtqaiAqIGltYWdlLndpZHRoICsgaWldKTtcbiAgICAgICAgICBjb3VudCArPSAxO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpbWFnZURhdGFbaiAqIHdpZHRoICsgaV0gPSBNYXRoLmZsb29yKHN1bSAvIGNvdW50KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHtkYXRhOiBpbWFnZURhdGEsIHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHR9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZG93bnNhbXBsZUJpbGluZWFyLFxuICB1cHNhbXBsZUJpbGluZWFyLFxuICByZXNpemUsXG59XG5cbiIsImNvbnN0IG1SYW5kU2VlZCA9IDEyMzQ7XG5cbmNvbnN0IGNyZWF0ZVJhbmRvbWl6ZXIgPSAoKSA9PiB7XG4gIGNvbnN0IHJhbmRvbWl6ZXIgPSB7XG4gICAgc2VlZDogbVJhbmRTZWVkLFxuXG4gICAgYXJyYXlTaHVmZmxlKG9wdGlvbnMpIHtcbiAgICAgIGNvbnN0IHthcnIsIHNhbXBsZVNpemV9ID0gb3B0aW9ucztcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2FtcGxlU2l6ZTsgaSsrKSB7XG5cbiAgICAgICAgdGhpcy5zZWVkID0gKDIxNDAxMyAqIHRoaXMuc2VlZCArIDI1MzEwMTEpICUgKDEgPDwgMzEpO1xuICAgICAgICBsZXQgayA9ICh0aGlzLnNlZWQgPj4gMTYpICYgMHg3ZmZmO1xuICAgICAgICBrID0gayAlIGFyci5sZW5ndGg7XG5cbiAgICAgICAgbGV0IHRtcCA9IGFycltpXTtcbiAgICAgICAgYXJyW2ldID0gYXJyW2tdO1xuICAgICAgICBhcnJba10gPSB0bXA7XG4gICAgICB9XG4gICAgfSxcblxuICAgIG5leHRJbnQobWF4VmFsdWUpIHtcbiAgICAgIHRoaXMuc2VlZCA9ICgyMTQwMTMgKiB0aGlzLnNlZWQgKyAyNTMxMDExKSAlICgxIDw8IDMxKTtcbiAgICAgIGxldCBrID0gKHRoaXMuc2VlZCA+PiAxNikgJiAweDdmZmY7XG4gICAgICBrID0gayAlIG1heFZhbHVlO1xuICAgICAgcmV0dXJuIGs7XG4gICAgfVxuICB9XG4gIHJldHVybiByYW5kb21pemVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY3JlYXRlUmFuZG9taXplclxufVxuIiwiY29uc3Qge0NvbnRyb2xsZXJ9ID0gcmVxdWlyZSgnLi9jb250cm9sbGVyJyk7XG5jb25zdCB7VXRpbHN9ID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHdpbmRvdy5NSU5EQVIgPSB7XG4gIFV0aWxzLFxuICBDb250cm9sbGVyXG59XG4iLCJjb25zdCB7Y29tcGlsZX0gPSByZXF1aXJlKCcuL2ltYWdlLXRhcmdldC9pbmRleC5qcycpO1xuXG5jb25zdCBVdGlscyA9IHtcbiAgY29tcGlsZUltYWdlVGFyZ2V0OiAodGFyZ2V0SW1hZ2UpID0+IHtcbiAgICByZXR1cm4gY29tcGlsZSh0YXJnZXRJbWFnZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFV0aWxzXG59XG4iXSwic291cmNlUm9vdCI6IiJ9