const tf = require('@tensorflow/tfjs');
const Worker = require("./controller.worker.js");
const {Tracker} = require('./image-target/tracker/tracker.js');
const {CropDetector} = require('./image-target/detector/crop-detector.js');
const {Compiler} = require('./compiler.js');
const {InputLoader} = require('./image-target/input-loader.js');

const INTERPOLATION_FACTOR = 5;
const WARMUP_COUNT_TOLERANCE = 10;
const MISS_COUNT_TOLERANCE = 30;

class Controller {
  constructor({inputWidth, inputHeight, onUpdate=null, debugMode=false}) {
    this.inputWidth = inputWidth;
    this.inputHeight = inputHeight;
    this.cropDetector = new CropDetector(this.inputWidth, this.inputHeight, debugMode);
    this.inputLoader = new InputLoader(this.inputWidth, this.inputHeight);
    this.markerDimensions = null;
    this.onUpdate = onUpdate;
    this.debugMode = debugMode;
    this.processingVideo = false;
    this.interestedTargetIndex = -1;
    this.trackingState = {};

    const near = 10;
    const far = 10000;
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

  async _detectAndMatch(inputT, targetIndex) {
    const {featurePoints} = this.cropDetector.detectMoving(inputT);
    const {targetIndex: matchedTargetIndex, modelViewTransform} = await this._workerMatch(featurePoints, targetIndex);
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

    this.trackingState = {
      showing: false,
      trackCount: 0,
      trackMiss: 0,
      targetIndex: null,
    }

    const startProcessing = async() => {
      while (true) {
	if (!this.processingVideo) break;

	const inputT = this.inputLoader.loadInput(input);

	// detect, if not tracking
	if (!this.trackingState.isTracking) {
	  const matchingIndex = this.trackingState.targetIndex !== null? this.trackingState.targetIndex: this.interestedTargetIndex;
	  const {targetIndex: matchedTargetIndex, modelViewTransform} = await this._detectAndMatch(inputT, matchingIndex);

	  if (matchedTargetIndex !== -1) {
	    this.trackingState.targetIndex = matchedTargetIndex;
	    this.trackingState.isTracking = true;
	    this.trackingState.currentModelViewTransform = modelViewTransform;
	  }
	}

	// tracking update
	if (this.trackingState.isTracking) {
	  let modelViewTransform = await this._trackAndUpdate(inputT, this.trackingState.currentModelViewTransform, this.trackingState.targetIndex)
	  if (modelViewTransform === null) {
	    this.trackingState.isTracking = false;
	  } else {
	    this.trackingState.currentModelViewTransform = modelViewTransform;
	  }
	}

	// if not showing, then show it once it reaches warmup number of frames
	if (!this.trackingState.showing) {
	  if (this.trackingState.isTracking) {
	    this.trackingState.trackMiss = 0;
	    this.trackingState.trackCount += 1;
	    if (this.trackingState.trackCount > WARMUP_COUNT_TOLERANCE) {
	      this.trackingState.showing = true;
	      this.trackingState.trackingMatrix = null;
	    }
	  }
	}
	
	// if showing, then count miss, and hide it when reaches tolerance
	if (this.trackingState.showing) {
	  if (!this.trackingState.isTracking) {
	    this.trackingState.trackCount = 0;
	    this.trackingState.trackMiss += 1;

	    if (this.trackingState.trackMiss > MISS_COUNT_TOLERANCE) {
	      this.trackingState.showing = false;
	      this.trackingState.trackingMatrix = null;
	      this.onUpdate && this.onUpdate({type: 'updateMatrix', targetIndex: this.trackingState.targetIndex, worldMatrix: null});
	      this.trackingState.targetIndex = null;
	    }
	  } else {
	    this.trackingState.trackMiss = 0;
	  }
	}
	
	// if showing, then call onUpdate, with world matrix
	if (this.trackingState.showing) {
	  const worldMatrix = this._glModelViewMatrix(this.trackingState.currentModelViewTransform, this.trackingState.targetIndex);

	  if (this.trackingState.trackingMatrix === null) {
	    this.trackingState.trackingMatrix = worldMatrix;
	  } else {
	    for (let j = 0; j < worldMatrix.length; j++) {
	      this.trackingState.trackingMatrix[j] = this.trackingState.trackingMatrix[j] + (worldMatrix[j] - this.trackingState.trackingMatrix[j]) / INTERPOLATION_FACTOR;
	    }
	  }
	  const clone = [];
	  for (let j = 0; j < worldMatrix.length; j++) {
	    clone[j] = this.trackingState.trackingMatrix[j];
	  }
	  this.onUpdate && this.onUpdate({type: 'updateMatrix', targetIndex: this.trackingState.targetIndex, worldMatrix: clone});
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
    const {modelViewTransform, debugExtra} = await this._workerMatch(featurePoints, targetIndex);
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

  _workerMatch(featurePoints, targetIndex) {
    return new Promise(async (resolve, reject) => {
      this.workerMatchDone = (data) => {
        resolve({targetIndex: data.targetIndex, modelViewTransform: data.modelViewTransform, debugExtra: data.debugExtra});
      }
      this.worker.postMessage({type: 'match', featurePoints: featurePoints, targetIndex});
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
