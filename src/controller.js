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
  constructor(inputWidth, inputHeight, onUpdate, debugMode=false) {
    this.inputWidth = inputWidth;
    this.inputHeight = inputHeight;
    this.detector = new Detector(this.inputWidth, this.inputHeight);
    this.inputLoader = new InputLoader(this.inputWidth, this.inputHeight);
    this.markerDimensions = null;
    this.trackingIndex = -1;
    this.trackingMatrix = null;
    this.trackingMissCount = 0;
    this.onUpdate = onUpdate;
    this.debugMode = debugMode;

    this.maxTrack = 1; // technically can tracking multiple. but too slow in practice
    this.imageTargetStates = [];

    this.processLoopHandler = null;
    this.workerLoopHandler = null;

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

    this.projectionMatrix = _glProjectionMatrix({
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
      if (e.data.type === 'trackDone' && this.workerTrackDone !== null) {
        this.workerTrackDone(e.data);
      }
    }
  }

  showTFStats() {
    console.log(tf.memory().numTensors);
    console.table(tf.memory());
  }

  getProjectionMatrix() {
    return this.projectionMatrix;
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

  getWorldMatrix(modelViewTransform, targetIndex) {
    return this._glModelViewMatrix(modelViewTransform, targetIndex);
  }

  /**
   * continue process the video
   * There currently two separate threads:
   *
   * 1. main thread
   *   this thread mainly call the gpu and do the first part of the computation
   * 2. worker thread
   *   this thread run in CPU and use the computation from the first part
   *
   * Other than two separate threads, there are also two, somehow, indepedent jobs
   *
   * 1. detection and match (slow)
   *   This extract FREAK features and try to find a match among the targets
   * 2. track (fast)
   *   Once a target is initialized matched, we can try to keep track of it
   *
   */
  processVideo(input) {
    let featurePoints = null;
    let trackingFeatures = [];
    for (let i = 0; i < this.imageTargetStates.length; i++) {
      trackingFeatures[i] = null;
    }

    let processing = false;
    this.processLoopHandler = setInterval(() => {
      if (!processing) {
        processing = true;

	const inputT = this.inputLoader.loadInput(input);

        let trackingCount = 0;
        for (let i = 0; i < this.imageTargetStates.length; i++) {
          if (this.imageTargetStates[i].isTracking) {
	    const {worldCoords, screenCoords} = this.tracker.track(inputT, this.imageTargetStates[i].lastModelViewTransforms, i);
	    trackingFeatures[i] = {worldCoords, screenCoords};

            trackingCount += 1;
          }
        }
        if (trackingCount < this.maxTrack) { // only run detector when matching is required
          featurePoints = this.detector.detect(inputT);
        }

	inputT.dispose();

        this.onUpdate({type: 'processDone'});
        processing = false;
      }
    }, 10);

    let workerRunning = false;
    this.workerLoopHandler = setInterval(async () => {
      if (!workerRunning) {
        workerRunning = true;

        let trackingCount = 0;
        for (let i = 0; i < this.imageTargetStates.length; i++) {
          if (this.imageTargetStates[i].isTracking) {
            trackingCount += 1;
          }
        }

        if (trackingCount < this.maxTrack && featurePoints !== null) {
          const skipTargetIndexes = [];
          for (let i = 0; i < this.imageTargetStates.length; i++) {
            if (this.imageTargetStates[i].isTracking) {
              skipTargetIndexes.push(i);
            }
          }

          const {targetIndex, modelViewTransform} = await this.workerMatch(featurePoints, skipTargetIndexes);
          if (targetIndex !== -1) {
            this.imageTargetStates[targetIndex].isTracking = true;
            this.imageTargetStates[targetIndex].missCount = 0;
            this.imageTargetStates[targetIndex].lastModelViewTransform = modelViewTransform;
            this.imageTargetStates[targetIndex].lastModelViewTransforms = [modelViewTransform, modelViewTransform, modelViewTransform];
            this.imageTargetStates[targetIndex].trackingMatrix = null;
          }
        }

        for (let i = 0; i < this.imageTargetStates.length; i++) {
          if (this.imageTargetStates[i].isTracking && trackingFeatures[i] !== null) {
            let modelViewTransform = null;
            if (trackingFeatures[i].worldCoords.length >= 4) {
              modelViewTransform = await this.workerTrack(this.imageTargetStates[i].lastModelViewTransform, trackingFeatures[i]);
	    }
            // remove this
            //modelViewTransform = this.imageTargetStates[i].lastModelViewTransform;

            if (modelViewTransform === null) {
              this.imageTargetStates[i].missCount += 1;
              if (this.imageTargetStates[i].missCount > MISS_COUNT_TOLERANCE) {
                this.imageTargetStates[i].isTracking = false;
		this.imageTargetStates[i].lastModelViewTransforms = null;
                trackingFeatures[i] = null;
                this.onUpdate({type: 'updateMatrix', targetIndex: i, worldMatrix: null});
              }
            } else {
              this.imageTargetStates[i].missCount = 0;
              this.imageTargetStates[i].lastModelViewTransform = modelViewTransform;

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
              this.onUpdate({type: 'updateMatrix', targetIndex: i, worldMatrix: clone});
            }
          }
        }

        this.onUpdate({type: 'workerDone'});

        workerRunning = false;
      }
    }, 10);
  }

  stopProcessVideo() {
    clearInterval(this.processLoopHandler);
    clearInterval(this.workerLoopHandler);
  }

  workerMatch(featurePoints, skipTargetIndexes) {
    return new Promise(async (resolve, reject) => {
      this.workerMatchDone = (data) => {
        resolve({targetIndex: data.targetIndex, modelViewTransform: data.modelViewTransform, debugExtras: data.debugExtras});
      }
      this.worker.postMessage({type: 'match', featurePoints: featurePoints, skipTargetIndexes});
    });
  }

  workerTrack(modelViewTransform, trackingFeatures) {
    return new Promise(async (resolve, reject) => {
      this.workerTrackDone = (data) => {
        resolve(data.modelViewTransform);
      }
      const {worldCoords, screenCoords} = trackingFeatures;
      this.worker.postMessage({type: 'track', modelViewTransform, worldCoords, screenCoords});
    });
  }

  // html image. this function is mostly for debugging purpose
  // but it demonstrates the whole process. good for development
  async processImage(input) {
    const inputT = this.inputLoader.loadInput(input);

    let detectedWorldMatrix = null;
    let trackedWorldMatrix = null;

    var _start = new Date();
    let featurePoints = await this.detector.detect(inputT);
    console.log("featurePoints", featurePoints);
    console.log("tfjs detector took", new Date() - _start);

    const {targetIndex, modelViewTransform, debugExtras} = await this.workerMatch(featurePoints, []);
    console.log("match", targetIndex, modelViewTransform);
    if (targetIndex !== -1) {
      detectedWorldMatrix = this._glModelViewMatrix(modelViewTransform, targetIndex);
    }

    if (targetIndex !== -1) {
      _start = new Date();
      const {worldCoords, screenCoords} = this.tracker.track(inputT, [modelViewTransform, modelViewTransform, modelViewTransform], targetIndex);
      const trackFeatures = {worldCoords, screenCoords};

      let modelViewTransform2 = null; 
      console.log("track features", trackFeatures);
      if (trackFeatures.worldCoords.length >= 4) {
	modelViewTransform2 = await this.workerTrack(modelViewTransform, trackFeatures);
	console.log("track", modelViewTransform2);
      }
      console.log("tracker took", new Date() - _start);

      if (modelViewTransform2 !== null) {
	trackedWorldMatrix = _glModelViewMatrix(modelViewTransform);
	console.log("world matrix", trackedWorldMatrix);
      }
    }

    inputT.dispose();

    return {featurePoints, detectedWorldMatrix, trackedWorldMatrix}
  }

  async detect(input) {
    const inputT = this.inputLoader.loadInput(input);
    const featurePoints = await this.detector.detect(inputT);
    inputT.dispose();
    return featurePoints;
  }
  async match(featurePoints) {
    const {targetIndex, modelViewTransform, debugExtras} = await this.workerMatch(featurePoints, []);
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
    const modelViewTransform2 = await this.workerTrack(modelViewTransform, trackFeatures);
    return modelViewTransform2;
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
}

// build openGL projection matrix
// ref: https://strawlab.org/2011/11/05/augmented-reality-with-OpenGL/
const _glProjectionMatrix = ({projectionTransform, width, height, near, far}) => {
  //const proj = [
  //  [2 * projectionTransform[0][0] / width, 0, -(2 * projectionTransform[0][2] / width - 1), 0],
  //  [0, 2 * projectionTransform[1][1] / height, -(2 * projectionTransform[1][2] / height - 1), 0],
  //  [0, 0, -(far + near) / (far - near), -2 * far * near / (far - near)],
  //  [0, 0, -1, 0]
  //];
  const proj = [
    [
      2 * projectionTransform[0][0] / width,
      0,
      -(2 * projectionTransform[0][2] / width - 1),
      0
    ],
    [
      0,
      2 * projectionTransform[1][1] / height,
      -(2 * projectionTransform[1][2] / height - 1),
      0
    ],
    [
      0,
      0,
      -(far + near) / (far - near),
      -2 * far * near / (far - near)
    ],
    [
      0, 0, -1, 0
    ]
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
 Controller
}
