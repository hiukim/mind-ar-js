const tf = require('@tensorflow/tfjs');
const Worker = require("./controller.worker.js");
const {Tracker} = require('./tracker/tracker.js');
const {CropDetector} = require('./detector/crop-detector.js');
const {Compiler} = require('./compiler.js');
const {InputLoader} = require('./input-loader.js');
const {OneEuroFilter} = require('../libs/one-euro-filter.js');

const DEFAULT_FILTER_CUTOFF = 0.001; // 1Hz. time period in milliseconds
const DEFAULT_FILTER_BETA = 1000;
const DEFAULT_WARMUP_TOLERANCE = 5;
const DEFAULT_MISS_TOLERANCE = 5;

class Controller {
  constructor({inputWidth, inputHeight, onUpdate=null, debugMode=false, maxTrack=1, 
    warmupTolerance=null, missTolerance=null, filterMinCF=null, filterBeta=null}) {

    this.inputWidth = inputWidth;
    this.inputHeight = inputHeight;
    this.maxTrack = maxTrack;
    this.filterMinCF = filterMinCF === null? DEFAULT_FILTER_CUTOFF: filterMinCF;
    this.filterBeta = filterBeta === null? DEFAULT_FILTER_BETA: filterBeta;
    this.warmupTolerance = warmupTolerance === null? DEFAULT_WARMUP_TOLERANCE: warmupTolerance;
    this.missTolerance = missTolerance === null? DEFAULT_MISS_TOLERANCE: missTolerance;
    this.cropDetector = new CropDetector(this.inputWidth, this.inputHeight, debugMode);
    this.inputLoader = new InputLoader(this.inputWidth, this.inputHeight);
    this.markerDimensions = null;
    this.onUpdate = onUpdate;
    this.debugMode = debugMode;
    this.processingVideo = false;
    this.interestedTargetIndex = -1;
    this.trackingStates = [];

    const near = 10;
    const far = 100000;
    const fovy = 45.0 * Math.PI / 180; // 45 in radian. field of view vertical
    const f = (this.inputHeight/2) / Math.tan(fovy/2);
    //     [fx  s cx]
    // K = [ 0 fx cy]
    //     [ 0  0  1]
    this.projectionTransform = [
      [f, 0, this.inputWidth / 2],
      [0, f, this.inputHeight / 2],
      [0, 0, 1]
    ];

    this.projectionMatrix = this._glProjectionMatrix({
      projectionTransform: this.projectionTransform,
      width: this.inputWidth,
      height: this.inputHeight,
      near: near,
      far: far,
    });

    this.worker = new Worker();
    this.workerMatchDone = null;
    this.workerTrackDone = null;
    this.worker.onmessage = (e) => {
      if (e.data.type === 'matchDone' && this.workerMatchDone !== null) {
        this.workerMatchDone(e.data);
      }
      if (e.data.type === 'trackUpdateDone' && this.workerTrackDone !== null) {
        this.workerTrackDone(e.data);
      }
    }
  }

  showTFStats() {
    console.log(tf.memory().numTensors);
    console.table(tf.memory());
  }

  addImageTargets(fileURL) {
    return new Promise(async (resolve, reject) => {
      const content = await fetch(fileURL);
      const buffer = await content.arrayBuffer();
      const result = this.addImageTargetsFromBuffer(buffer);
      resolve(result);
    });
  }

  addImageTargetsFromBuffer(buffer) {
    const compiler = new Compiler();
    const dataList = compiler.importData(buffer);

    const trackingDataList = [];
    const matchingDataList = [];
    const imageListList = [];
    const dimensions = [];
    for (let i = 0; i < dataList.length; i++) {
      matchingDataList.push(dataList[i].matchingData);
      trackingDataList.push(dataList[i].trackingData);
      dimensions.push([dataList[i].targetImage.width, dataList[i].targetImage.height]);
    }

    this.tracker = new Tracker(dimensions, trackingDataList, this.projectionTransform, this.inputWidth, this.inputHeight, this.debugMode);

    this.worker.postMessage({
      type: 'setup',
      inputWidth: this.inputWidth,
      inputHeight: this.inputHeight,
      projectionTransform: this.projectionTransform,
      debugMode: this.debugMode,
      matchingDataList,
    });

    this.markerDimensions = dimensions;

    return {dimensions: dimensions, matchingDataList, trackingDataList};
  }

  // warm up gpu - build kernels is slow
  dummyRun(input) {
    const inputT = this.inputLoader.loadInput(input);
    this.cropDetector.detect(inputT);
    this.tracker.dummyRun(inputT);
    inputT.dispose();
  }

  getProjectionMatrix() {
    return this.projectionMatrix;
  }

  getWorldMatrix(modelViewTransform, targetIndex) {
    return this._glModelViewMatrix(modelViewTransform, targetIndex);
  }

  async _detectAndMatch(inputT, targetIndexes) {
    const {featurePoints} = this.cropDetector.detectMoving(inputT);
    const {targetIndex: matchedTargetIndex, modelViewTransform} = await this._workerMatch(featurePoints, targetIndexes);
    return {targetIndex: matchedTargetIndex, modelViewTransform}
  }
  async _trackAndUpdate(inputT, lastModelViewTransform, targetIndex) {
    const {worldCoords, screenCoords} = this.tracker.track(inputT, lastModelViewTransform, targetIndex);
    if (worldCoords.length < 4) return null;
    const modelViewTransform = await this._workerTrackUpdate(lastModelViewTransform, {worldCoords, screenCoords});
    return modelViewTransform;
  }

  processVideo(input) {
    if (this.processingVideo) return;

    this.processingVideo = true;

    this.trackingStates = [];
    for (let i = 0; i < this.markerDimensions.length; i++) {
      this.trackingStates.push({
	showing: false,
	isTracking: false,
	currentModelViewTransform: null,
	trackCount: 0,
	trackMiss: 0,
	filter: new OneEuroFilter({minCutOff: this.filterMinCF, beta: this.filterBeta})
      });
      //console.log("filterMinCF", this.filterMinCF, this.filterBeta);
    }

    const startProcessing = async() => {
      while (true) {
	if (!this.processingVideo) break;

	const inputT = this.inputLoader.loadInput(input);

	const nTracking = this.trackingStates.reduce((acc, s) => {
	  return acc + (!!s.isTracking? 1: 0);
	}, 0);

	// detect and match only if less then maxTrack
	if (nTracking < this.maxTrack) {

	  const matchingIndexes = [];
	  for (let i = 0; i < this.trackingStates.length; i++) {
	    const trackingState = this.trackingStates[i];
	    if (trackingState.isTracking === true) continue;
	    if (this.interestedTargetIndex !== -1 && this.interestedTargetIndex !== i) continue;

	    matchingIndexes.push(i);
	  }

	  const {targetIndex: matchedTargetIndex, modelViewTransform} = await this._detectAndMatch(inputT, matchingIndexes);

	  if (matchedTargetIndex !== -1) {
	    this.trackingStates[matchedTargetIndex].isTracking = true;
	    this.trackingStates[matchedTargetIndex].currentModelViewTransform = modelViewTransform;
	  }
	}

	// tracking update
	for (let i = 0; i < this.trackingStates.length; i++) {
	  const trackingState = this.trackingStates[i];

	  if (trackingState.isTracking) {
	    let modelViewTransform = await this._trackAndUpdate(inputT, trackingState.currentModelViewTransform, i);
	    if (modelViewTransform === null) {
	      trackingState.isTracking = false;
	    } else {
	      trackingState.currentModelViewTransform = modelViewTransform;
	    }
	  }

	  // if not showing, then show it once it reaches warmup number of frames
	  if (!trackingState.showing) {
	    if (trackingState.isTracking) {
	      trackingState.trackMiss = 0;
	      trackingState.trackCount += 1;
	      if (trackingState.trackCount > this.warmupTolerance) {
		trackingState.showing = true;
		trackingState.trackingMatrix = null;
		trackingState.filter.reset();
	      }
	    }
	  }
	  
	  // if showing, then count miss, and hide it when reaches tolerance
	  if (trackingState.showing) {
	    if (!trackingState.isTracking) {
	      trackingState.trackCount = 0;
	      trackingState.trackMiss += 1;

	      if (trackingState.trackMiss > this.missTolerance) {
		trackingState.showing = false;
		trackingState.trackingMatrix = null;
		this.onUpdate && this.onUpdate({type: 'updateMatrix', targetIndex: i, worldMatrix: null});
	      }
	    } else {
	      trackingState.trackMiss = 0;
	    }
	  }
	  
	  // if showing, then call onUpdate, with world matrix
	  if (trackingState.showing) {
	    const worldMatrix = this._glModelViewMatrix(trackingState.currentModelViewTransform, i);
	    trackingState.trackingMatrix = trackingState.filter.filter(Date.now(), worldMatrix);

	    const clone = [];
	    for (let j = 0; j < trackingState.trackingMatrix.length; j++) {
	      clone[j] = trackingState.trackingMatrix[j];
	    }
	    this.onUpdate && this.onUpdate({type: 'updateMatrix', targetIndex: i, worldMatrix: clone});
	  }
	}

	inputT.dispose();
        this.onUpdate && this.onUpdate({type: 'processDone'});
	await tf.nextFrame();
      }
    }
    startProcessing();
  }

  stopProcessVideo() {
    this.processingVideo = false;
  }

  async detect(input) {
    const inputT = this.inputLoader.loadInput(input);
    const {featurePoints, debugExtra} = await this.cropDetector.detect(inputT);
    inputT.dispose();
    return {featurePoints, debugExtra};
  }

  async match(featurePoints, targetIndex) {
    const {modelViewTransform, debugExtra} = await this._workerMatch(featurePoints, [targetIndex]);
    return {modelViewTransform, debugExtra};
  }

  async track(input, modelViewTransform, targetIndex) {
    const inputT = this.inputLoader.loadInput(input);
    const result = this.tracker.track(inputT, modelViewTransform, targetIndex);
    inputT.dispose();
    return result;
  }

  async trackUpdate(modelViewTransform, trackFeatures) {
    if (trackFeatures.worldCoords.length < 4 ) return null;
    const modelViewTransform2 = await this._workerTrackUpdate(modelViewTransform, trackFeatures);
    return modelViewTransform2;
  }

  _workerMatch(featurePoints, targetIndexes) {
    return new Promise(async (resolve, reject) => {
      this.workerMatchDone = (data) => {
        resolve({targetIndex: data.targetIndex, modelViewTransform: data.modelViewTransform, debugExtra: data.debugExtra});
      }
      this.worker.postMessage({type: 'match', featurePoints: featurePoints, targetIndexes});
    });
  }

  _workerTrackUpdate(modelViewTransform, trackingFeatures) {
    return new Promise(async (resolve, reject) => {
      this.workerTrackDone = (data) => {
        resolve(data.modelViewTransform);
      }
      const {worldCoords, screenCoords} = trackingFeatures;
      this.worker.postMessage({type: 'trackUpdate', modelViewTransform, worldCoords, screenCoords});
    });
  }

  _glModelViewMatrix(modelViewTransform, targetIndex) {
    const height = this.markerDimensions[targetIndex][1];

    // Question: can someone verify this interpreation is correct? 
    // I'm not very convinced, but more like trial and error and works......
    //
    // First, opengl has y coordinate system go from bottom to top, while the marker corrdinate goes from top to bottom,
    //    since the modelViewTransform is estimated in marker coordinate, we need to apply this transform before modelViewTransform
    //    I can see why y = h - y*, but why z = z* ? should we intepret it as rotate 90 deg along x-axis and then translate y by h?
    //
    //    [1  0  0  0]
    //    [0 -1  0  h]
    //    [0  0 -1  0]
    //    [0  0  0  1]
    //    
    //    This is tested that if we reverse marker coordinate from bottom to top and estimate the modelViewTransform,
    //    then the above matrix is not necessary.
    //
    // Second, in opengl, positive z is away from camera, so we rotate 90 deg along x-axis after transform to fix the axis mismatch
    //    [1  1  0  0]
    //    [0 -1  0  0]
    //    [0  0 -1  0]
    //    [0  0  0  1]
    //
    // all together, the combined matrix is
    //
    //    [1  1  0  0]   [m00, m01, m02, m03]   [1  0  0  0]
    //    [0 -1  0  0]   [m10, m11, m12, m13]   [0 -1  0  h]
    //    [0  0 -1  0]   [m20, m21, m22, m23]   [0  0 -1  0]
    //    [0  0  0  1]   [  0    0    0    1]   [0  0  0  1]
    //
    //    [ m00,  -m01,  -m02,  (m01 * h + m03) ]
    //    [-m10,   m11,   m12, -(m11 * h + m13) ]
    //  = [-m20,   m21,   m22, -(m21 * h + m23) ]
    //    [   0,     0,     0,                1 ]
    //
    //
    // Finally, in threejs, matrix is represented in col by row, so we transpose it, and get below:
    const openGLWorldMatrix = [
      modelViewTransform[0][0], -modelViewTransform[1][0], -modelViewTransform[2][0], 0,
      -modelViewTransform[0][1], modelViewTransform[1][1], modelViewTransform[2][1], 0,
      -modelViewTransform[0][2], modelViewTransform[1][2], modelViewTransform[2][2], 0,
      modelViewTransform[0][1] * height + modelViewTransform[0][3], -(modelViewTransform[1][1] * height + modelViewTransform[1][3]), -(modelViewTransform[2][1] * height + modelViewTransform[2][3]), 1
    ];
    return openGLWorldMatrix;
  }

  // build openGL projection matrix
  // ref: https://strawlab.org/2011/11/05/augmented-reality-with-OpenGL/
  _glProjectionMatrix({projectionTransform, width, height, near, far}) {
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
}

module.exports = {
 Controller
}
