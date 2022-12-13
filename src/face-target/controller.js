import {FaceMeshHelper} from "./face-mesh-helper.js";
import {opencv, waitCV} from "../libs/opencv-helper.js";
import {Estimator} from "./face-geometry/estimator.js";
import {createThreeFaceGeometry as  _createThreeFaceGeometry} from "./face-geometry/face-geometry.js";
import {positions as canonicalMetricLandmarks} from "./face-geometry/face-data.js";
import {OneEuroFilter} from '../libs/one-euro-filter.js';

const DEFAULT_FILTER_CUTOFF = 0.001; // 1Hz. time period in milliseconds
const DEFAULT_FILTER_BETA = 1;

class Controller {
  constructor({onUpdate=null, filterMinCF=null, filterBeta=null}) {
    this.customFaceGeometries = [];
    this.estimator = null;
    this.lastEstimateResult = null;
    this.filterMinCF = filterMinCF === null? DEFAULT_FILTER_CUTOFF: filterMinCF;
    this.filterBeta = filterBeta === null? DEFAULT_FILTER_BETA: filterBeta;
    this.onUpdate = onUpdate;

    //console.log("filter", this.filterMinCF, this.filterBeta);

    this.landmarkFilters = [];
    for (let i = 0; i < canonicalMetricLandmarks.length; i++) {
      this.landmarkFilters[i] = new OneEuroFilter({minCutOff: this.filterMinCF, beta: this.filterBeta});
    }
    this.faceMatrixFilter = new OneEuroFilter({minCutOff: this.filterMinCF, beta: this.filterBeta});
    this.faceScaleFilter = new OneEuroFilter({minCutOff: this.filterMinCF, beta: this.filterBeta});
  }

  async setup(input) {
    await waitCV();

    this.faceMeshHelper = new FaceMeshHelper();
    this.estimator = new Estimator(input);
  }

  getCameraParams() {
    return {
      fov: this.estimator.fov * 180 / Math.PI,
      aspect: this.estimator.frameWidth / this.estimator.frameHeight,
      near: this.estimator.near,
      far: this.estimator.far
    }
  }
  
  async dummyRun(input) {
    await this.faceMeshHelper.detect(input);
  }

  processVideo(input) {
    if (this.processingVideo) return;

    this.processingVideo = true;

    const doProcess = async () => {
      const results = await this.faceMeshHelper.detect(input);
      if (results.multiFaceLandmarks.length === 0) {
	this.lastEstimateResult = null;
	this.onUpdate({hasFace: false});

	for (let i = 0; i < this.landmarkFilters.length; i++) {
	  this.landmarkFilters[i].reset();
	}
	this.faceMatrixFilter.reset();
	this.faceScaleFilter.reset();
      } else {
	const landmarks = results.multiFaceLandmarks[0].map((l) => {
	  return [l.x, l.y, l.z];
	});
	const estimateResult = this.estimator.estimate(landmarks);

	if (this.lastEstimateResult === null) {
	  this.lastEstimateResult = estimateResult;
	} else {
	  const lastMetricLandmarks = this.lastEstimateResult.metricLandmarks;
	  const lastFaceMatrix = this.lastEstimateResult.faceMatrix;
	  const lastFaceScale = this.lastEstimateResult.faceScale;

	  const newMetricLandmarks = [];
	  for (let i = 0; i < lastMetricLandmarks.length; i++) {
	    newMetricLandmarks[i] = this.landmarkFilters[i].filter(Date.now(), estimateResult.metricLandmarks[i]);
	  }

	  const newFaceMatrix = this.faceMatrixFilter.filter(Date.now(), estimateResult.faceMatrix);

	  const newFaceScale = this.faceScaleFilter.filter(Date.now(), [estimateResult.faceScale]);

	  this.lastEstimateResult = {
	    metricLandmarks: newMetricLandmarks,
	    faceMatrix: newFaceMatrix,
	    faceScale: newFaceScale[0],
	  }
	}

	//console.log("resuts", results);
	//console.log("estimateResult", estimateResult);
	if (this.onUpdate) {
	  this.onUpdate({hasFace: true, estimateResult: this.lastEstimateResult});
	}

	for (let i = 0; i < this.customFaceGeometries.length; i++) {
	  this.customFaceGeometries[i].updatePositions(estimateResult.metricLandmarks);
	}
      }
      if (this.processingVideo) {
	window.requestAnimationFrame(doProcess);
      }
    }
    window.requestAnimationFrame(doProcess);
  }

  stopProcessVideo() {
    this.processingVideo = false;
  }

  createThreeFaceGeometry(THREE) {
    const faceGeometry = _createThreeFaceGeometry(THREE);
    this.customFaceGeometries.push(faceGeometry);
    return faceGeometry;
  }

  getLandmarkMatrix(landmarkIndex) {
    const {metricLandmarks, faceMatrix, faceScale} = this.lastEstimateResult;

    // final matrix = faceMatrix x landmarkMatrix
    // landmarkMatrix = [
    //   faceScale, 0, 0, metricLandmarks[landmarkIndex][0],
    //   0, faceScale, 0, metricLandmarks[landmarkIndex][1],
    //   0, 0, faceScale, metricLandmarks[landmarkIndex][2],
    //   0, 0, 0, 1
    // ]
    const fm = faceMatrix;
    const s = faceScale;
    const t = [metricLandmarks[landmarkIndex][0], metricLandmarks[landmarkIndex][1], metricLandmarks[landmarkIndex][2]];
    const m = [
      fm[0] * s, fm[1] * s, fm[2] * s, fm[0] * t[0] + fm[1] * t[1] + fm[2] * t[2] + fm[3],
      fm[4] * s, fm[5] * s, fm[6] * s, fm[4] * t[0] + fm[5] * t[1] + fm[6] * t[2] + fm[7],
      fm[8] * s, fm[9] * s, fm[10] * s, fm[8] * t[0] + fm[9] * t[1] + fm[10] * t[2] + fm[11],
      fm[12] * s, fm[13] * s, fm[14] * s, fm[12] * t[0] + fm[13] * t[1] + fm[14] * t[2] + fm[15],
    ];
    return m;
  }
}

export {
 Controller
}
