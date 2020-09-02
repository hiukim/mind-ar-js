const Worker = require("./controller.worker.js");
const {Tracker} = require('./image-target/trackingGPU/tracker2.js');
const {Detector} = require('./image-target/detectorGPU/detector.js');
const {Matcher} = require('./image-target/matching/matcher.js');
const {estimateHomography} = require('./image-target/icp/estimate_homography.js');
const {refineHomography} = require('./image-target/icp/refine_homography');
const {Compiler} = require('./compiler.js');

const INTERPOLATION_FACTOR = 10;
const MISS_COUNT_TOLERANCE = 10;

class Controller {
  constructor(inputWidth, inputHeight, onUpdate) {
    this.inputWidth = inputWidth;
    this.inputHeight = inputHeight;
    this.detector = new Detector(this.inputWidth, this.inputHeight);
    this.imageTargets = [];
    this.trackingIndex = -1;
    this.trackingMatrix = null;
    this.trackingMissCount = 0;
    this.onUpdate = onUpdate;

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

  getProjectionMatrix() {
    return this.projectionMatrix;
  }

  addImageTargets(fileURL) {
    return new Promise(async (resolve, reject) => {
      const compiler = new Compiler();
      const content = await fetch(fileURL);
      const buffer = await content.arrayBuffer();
      const dataList = compiler.importData(buffer);

      for (let i = 0; i < dataList.length; i++) {
        this.imageTargets.push({
          targetImage: dataList[i].targetImage,
          matcher: new Matcher(dataList[i].matchingData),
          tracker: new Tracker(dataList[i].trackingData, dataList[i].imageList, this.projectionTransform),
        });
        this.imageTargets[i].tracker.setupQuery(this.inputWidth, this.inputHeight);
      }

      this.worker.postMessage({type: 'setup', projectionTransform: this.projectionTransform, matchingData: dataList[0].matchingData});

      resolve(true);
    });
  }

  // warm up gpu - build kernels is slow
  dummyRun(input) {
    this.detector.detect(input);
    for (let i = 0; i < this.imageTargets.length; i++) {
      this.imageTargets[i].tracker.detected([[0,0,0,0], [0,0,0,0], [0,0,0,0]]);
      this.imageTargets[i].tracker.track(input, [[0,0,0,0], [0,0,0,0], [0,0,0,0]]);
    }
  }

  getImageTargetDimensions() {
    const dimensions = [];
    for (let i = 0; i < this.imageTargets.length; i++) {
      const targetImage = this.imageTargets[i].targetImage;
      dimensions.push([targetImage.width, targetImage.height]);
    }
    return dimensions;
  }

  processVideo(input) {
    let featurePoints = null;
    let selectedFeatures = null;

    let processing = false;
    setInterval(() => {
      if (!processing) {
        processing = true;

        if (this.trackingIndex === -1) {
          featurePoints = this.detector.detect(input);
        } else {
          selectedFeatures = this.imageTargets[this.trackingIndex].tracker.track(input, this.lastModelViewTransform);
        }
        this.onUpdate({type: 'processDone'});
        processing = false;
      }
    }, 10);

    let workerRunning = false;
    setInterval(async () => {
      if (!workerRunning) {
        workerRunning = true;

        if (this.trackingIndex === -1) {
          if (featurePoints !== null) {

          const modelViewTransform = await this.match(featurePoints);
            if (modelViewTransform !== null) {
              this.trackingIndex = 0;
              this.lastModelViewTransform = modelViewTransform;
              //this.imageTargets[0].tracker.detected(modelViewTransform);
            }
          }
        } else {
          let modelViewTransform = null;
          if (selectedFeatures !== null) {
            modelViewTransform = await this.track(this.lastModelViewTransform, selectedFeatures);
          }
          this.lastModelViewTransform = modelViewTransform;

          const worldMatrix = modelViewTransform === null? null: _glModelViewMatrix(modelViewTransform);
          this.trackingMatrix = worldMatrix;
          if (worldMatrix === null) {
            this.trackingIndex = -1;
          }
          this.onUpdate({type: 'updateMatrix', targetIndex: 0, worldMatrix: worldMatrix});
        }

        this.onUpdate({type: 'workerDone'});

        workerRunning = false;
      }
    }, 10);
  }

  match(featurePoints) {
    return new Promise(async (resolve, reject) => {
      this.worker.postMessage({type: 'match', featurePoints: featurePoints});
      this.workerMatchDone = (data) => {
        resolve(data.modelViewTransform);
      }
    });
  }

  track(modelViewTransform, selectedFeatures) {
    return new Promise(async (resolve, reject) => {
      this.worker.postMessage({type: 'track', modelViewTransform, selectedFeatures: selectedFeatures});
      this.workerTrackDone = (data) => {
        resolve(data.modelViewTransform);
      }
    });
  }


  // input is either HTML video or HTML image
  process(input) {
    if (this.trackingIndex === -1) {
      let featurePoints = this.detector.detect(input);
      for (let i = 0; i < this.imageTargets.length; i++) {
        const imageTarget = this.imageTargets[i];
        const matchResult = imageTarget.matcher.matchDetection(this.inputWidth, this.inputHeight, featurePoints);
        if (matchResult === null) continue;

        const {screenCoords, worldCoords, keyframeIndex} = matchResult;
        this.worker.postMessage({type: 'estimate', featurePoints: featurePoints});

        const initialModelViewTransform = estimateHomography({screenCoords, worldCoords, projectionTransform: this.projectionTransform});
        if (initialModelViewTransform === null) continue;

        imageTarget.tracker.detected(initialModelViewTransform, keyframeIndex);

        this.trackingIndex = i;
        this.trackingMissCount = 0;
        this.trackingMatrix = _glModelViewMatrix(initialModelViewTransform);
        break;
      }
    }

    if (this.trackingIndex !== -1) {
      const imageTarget = this.imageTargets[this.trackingIndex];
      const modelViewTransform = imageTarget.tracker.track(input);
      const worldMatrix = modelViewTransform === null? null: _glModelViewMatrix(modelViewTransform);

      if (worldMatrix === null) {
        this.trackingMissCount += 1;
        if (this.trackingMissCount > MISS_COUNT_TOLERANCE) {
          this.trackingIndex = -1;
          this.trackingMatrix = null;
        }
      } else {
        // interpolate matrix
        for (let i = 0; i < this.trackingMatrix.length; i++) {
          this.trackingMatrix[i] = this.trackingMatrix[i] + (worldMatrix[i] - this.trackingMatrix[i]) / INTERPOLATION_FACTOR;
        }
      }
    }

    const result = [];
    for (let i = 0; i < this.imageTargets.length; i++) {
      if (this.trackingIndex === i) {
        const finalWorldMatrix = [];
        for (let i = 0; i < this.trackingMatrix.length; i++) {
          finalWorldMatrix[i] = this.trackingMatrix[i];
        }
        result[i] = {worldMatrix: finalWorldMatrix};
      } else {
        result[i] = {worldMatrix: null};
      }
    }
    return result;
  }
}

// build openGL modelView matrix
const _glModelViewMatrix = (modelViewTransform) => {
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
 Controller
}

