const tf = require('@tensorflow/tfjs');
const Worker = require("./controller.worker.js");
const {Tracker} = require('./image-target/tracker/tracker.js');
const {Detector} = require('./image-target/detector/detector.js');
const {Compiler} = require('./compiler.js');
const {InputLoader} = require('./image-target/input-loader.js');

const INTERPOLATION_FACTOR = 10;
const MISS_COUNT_TOLERANCE = 10;
const MIN_KEYFRAME_SIZE = 80;

class Controller {
  constructor({inputWidth, inputHeight, onUpdate=null, maxTrack=1, debugMode=false}) {
    this.inputWidth = inputWidth;
    this.inputHeight = inputHeight;
    this.detector = new Detector(this.inputWidth, this.inputHeight);
    this.inputLoader = new InputLoader(this.inputWidth, this.inputHeight);
    this.markerDimensions = null;
    this.onUpdate = onUpdate;
    this.debugMode = debugMode;
    this.processingVideo = false;
    this.maxTrack = maxTrack; // technically can tracking multiple. but too slow in practice
    this.imageTargetStates = [];

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
      const compiler = new Compiler();
      const content = await fetch(fileURL);
      const buffer = await content.arrayBuffer();
      const dataList = compiler.importData(buffer);

      const trackingDataList = [];
      const matchingDataList = [];
      const imageListList = [];
      const dimensions = [];
      for (let i = 0; i < dataList.length; i++) {
	const imageList = [];
	const matchingList = [];
	const trackingList = [];
	for (let j = 0; j < dataList[i].imageList.length; j++) {
	  // keyframe too small to be useful
	  if (dataList[i].imageList[j].width < MIN_KEYFRAME_SIZE || dataList[i].imageList[j].height < MIN_KEYFRAME_SIZE) break;

	  imageList.push(dataList[i].imageList[j]);
	  matchingList.push(dataList[i].matchingData[j]);
	  trackingList.push(dataList[i].trackingData[j]);
	}
        matchingDataList.push(matchingList);
        trackingDataList.push(trackingList);
        imageListList.push(imageList);
        dimensions.push([dataList[i].targetImage.width, dataList[i].targetImage.height]);
        this.imageTargetStates[i] = {isTracking: false};
      }

      this.tracker = new Tracker(trackingDataList, imageListList, this.projectionTransform, this.inputWidth, this.inputHeight, this.debugMode);

      this.worker.postMessage({
        type: 'setup',
        inputWidth: this.inputWidth,
        inputHeight: this.inputHeight,
        projectionTransform: this.projectionTransform,
	debugMode: this.debugMode,
        matchingDataList,
      });

      this.markerDimensions = dimensions;

      resolve({dimensions: dimensions, matchingDataList, trackingDataList, imageListList});
    });
  }

  // warm up gpu - build kernels is slow
  dummyRun(input) {
    const inputT = this.inputLoader.loadInput(input);
    this.detector.detect(inputT);
    this.tracker.dummyRun(inputT);
    inputT.dispose();
  }

  getProjectionMatrix() {
    return this.projectionMatrix;
  }

  getWorldMatrix(modelViewTransform, targetIndex) {
    return this._glModelViewMatrix(modelViewTransform, targetIndex);
  }

  processVideo(input) {
    if (this.processingVideo) return;

    this.processingVideo = true;

    const startProcessing = async() => {
      while (true) {
	if (!this.processingVideo) break;

	const inputT = this.inputLoader.loadInput(input);

	const trackingIndexes = [];
        for (let i = 0; i < this.imageTargetStates.length; i++) {
          if (this.imageTargetStates[i].isTracking) {
	    trackingIndexes.push(i);
	  }
	}

        if (trackingIndexes.length < this.maxTrack) { // only run detector when matching is required
          const featurePoints = this.detector.detect(inputT);
	  const {targetIndex, modelViewTransform} = await this._workerMatch(featurePoints, trackingIndexes);

          if (targetIndex !== -1) {
	    trackingIndexes.push(targetIndex);
            this.imageTargetStates[targetIndex].isTracking = true;
            this.imageTargetStates[targetIndex].missCount = 0;
            this.imageTargetStates[targetIndex].lastModelViewTransform = modelViewTransform;
            this.imageTargetStates[targetIndex].lastModelViewTransforms = [modelViewTransform, modelViewTransform, modelViewTransform];
            this.imageTargetStates[targetIndex].trackingMatrix = null;
          }
        }
	
        for (let i = 0; i < this.imageTargetStates.length; i++) {
          if (this.imageTargetStates[i].isTracking) {
	    const {worldCoords, screenCoords} = this.tracker.track(inputT, this.imageTargetStates[i].lastModelViewTransforms, i);

	    let modelViewTransform = null;
	    if (worldCoords.length >= 4) {
	      modelViewTransform = await this._workerTrackUpdate(this.imageTargetStates[i].lastModelViewTransform, {worldCoords, screenCoords});
	    }
            // remove this
            //modelViewTransform = this.imageTargetStates[i].lastModelViewTransform;

            if (modelViewTransform === null) {
              this.imageTargetStates[i].missCount += 1;
              if (this.imageTargetStates[i].missCount > MISS_COUNT_TOLERANCE) {
                this.imageTargetStates[i].isTracking = false;
		this.imageTargetStates[i].lastModelViewTransforms = null;
                this.onUpdate && this.onUpdate({type: 'updateMatrix', targetIndex: i, worldMatrix: null});
              }
            } else {
              this.imageTargetStates[i].missCount = 0;
              this.imageTargetStates[i].lastModelViewTransforms.unshift(modelViewTransform);
              this.imageTargetStates[i].lastModelViewTransforms.pop();

              const worldMatrix = this._glModelViewMatrix(modelViewTransform, i);

              if (this.imageTargetStates[i].trackingMatrix === null) {
                this.imageTargetStates[i].trackingMatrix = worldMatrix;
              } else {
                for (let j = 0; j < worldMatrix.length; j++) {
                  this.imageTargetStates[i].trackingMatrix[j] = this.imageTargetStates[i].trackingMatrix[j] + (worldMatrix[j] - this.imageTargetStates[i].trackingMatrix[j]) / INTERPOLATION_FACTOR;
                }
              }

              const clone = [];
              for (let j = 0; j < worldMatrix.length; j++) {
                clone[j] = this.imageTargetStates[i].trackingMatrix[j];
              }
              this.onUpdate && this.onUpdate({type: 'updateMatrix', targetIndex: i, worldMatrix: clone});
            }
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
    const featurePoints = await this.detector.detect(inputT);
    inputT.dispose();
    return featurePoints;
  }
  async match(featurePoints) {
    const {targetIndex, modelViewTransform, debugExtras} = await this._workerMatch(featurePoints, []);
    return {modelViewTransform, debugExtras};
  }
  async track(input, modelViewTransforms, targetIndex) {
    const inputT = this.inputLoader.loadInput(input);
    const result = this.tracker.track(inputT, modelViewTransforms, targetIndex);
    inputT.dispose();
    return result;
  }
  async trackAllFrames(input, modelViewTransforms, targetIndex, nKeyframes) {
    const inputT = this.inputLoader.loadInput(input);
    const trackResults = [];
    for (let i = 0; i < nKeyframes; i++) {
      const result = this.tracker.track(inputT, modelViewTransforms, targetIndex, i);
      trackResults.push(result);
    }
    inputT.dispose();
    return trackResults;
  }
  async trackUpdate(modelViewTransform, trackFeatures) {
    if (trackFeatures.worldCoords.length < 4 ) return null;
    const modelViewTransform2 = await this._workerTrackUpdate(modelViewTransform, trackFeatures);
    return modelViewTransform2;
  }

  _workerMatch(featurePoints, skipTargetIndexes) {
    return new Promise(async (resolve, reject) => {
      this.workerMatchDone = (data) => {
        resolve({targetIndex: data.targetIndex, modelViewTransform: data.modelViewTransform, debugExtras: data.debugExtras});
      }
      this.worker.postMessage({type: 'match', featurePoints: featurePoints, skipTargetIndexes});
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
