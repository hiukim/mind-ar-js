// non-worker version

const tf = require('@tensorflow/tfjs');

const {Compiler} = require('./compiler.js');
const {Matcher} = require('./image-target/matching/matcher.js');
const {Tracker} = require('./image-target/trackingTF/tracker.js');
const {Detector} = require('./image-target/detectorTF/detector.js');
const {refineHomography} = require('./image-target/icp/refine_homography.js');
const {estimateHomography} = require('./image-target/icp/estimate_homography.js');

const INTERPOLATION_FACTOR = 10;
const MISS_COUNT_TOLERANCE = 10;
const AR2_TRACKING_THRESH = 5.0; // default

class Controller {
  constructor(inputWidth, inputHeight, onUpdate) {
    this.inputWidth = inputWidth;
    this.inputHeight = inputHeight;
    this.onUpdate = onUpdate;

    this.trackingModelViewTransform = null;
    this.trackingIndex = -1;
    this.trackingMatrix = null;
    this.trackingMiss = 0;

    this.detector = new Detector(this.inputWidth, this.inputHeight);
    this.matcher = new Matcher(this.inputWidth, this.inputHeight);
    this.tracker = null;
    this.matchingDataList = null;

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

      this.matchingDataList = [];
      const trackingDataList = [];
      const imageListList = [];
      const dimensions = [];
      for (let i = 0; i < dataList.length; i++) {
        this.matchingDataList.push(dataList[i].matchingData);
        trackingDataList.push(dataList[i].trackingData);
        imageListList.push(dataList[i].imageList);
        dimensions.push([dataList[i].targetImage.width, dataList[i].targetImage.height]);
      }
      this.tracker = new Tracker(trackingDataList, imageListList, this.projectionTransform, this.inputWidth, this.inputHeight);

      resolve({dimensions: dimensions});
    });
  }

  dummyRun(input) {
    this.detector.detect(input);
    //this.tracker.track(input, [[0,0,0,0], [0,0,0,0], [0,0,0,0]], 0);
    this.tracker.track(input, [[1,1,1,1], [1,1,1,1], [1,1,1,1]], 0);
  }

  async processImage(input) {
    var _start = new Date();
    this.dummyRun(input);
    console.log("dummy run took", new Date() - _start);

    _start = new Date();
    let featurePoints = await this.detector.detect(input);
    console.log("featurePoints", featurePoints);
    console.log("tfjs detector took", new Date() - _start);

    _start = new Date();
    const {matchedTargetIndex, matchedModelViewTransform, matchedKeyframeIndex} = this.doMatching(featurePoints);
    console.log("matched result", matchedTargetIndex, matchedKeyframeIndex, matchedModelViewTransform);
    console.log("feature matching took", new Date() - _start);

    if (matchedTargetIndex === -1) return;

    _start = new Date();
    const trackFeatures = this.tracker.track(input, matchedModelViewTransform, matchedTargetIndex);
    console.log("trackFeatures", trackFeatures);
    console.log("tfjs tracker took", new Date() - _start);

    _start = new Date();
    const modelViewTransform2 = this.doTrackingUpdate(matchedModelViewTransform, trackFeatures);
    console.log("modelViewTransform2", modelViewTransform2);
    console.log("tracking update took", new Date() - _start);
  }

  async processVideo(input) {
    while(true) {
      if (this.trackingIndex === -1) {
        const featurePoints = await this.detector.detect(input);
        const {matchedTargetIndex, matchedModelViewTransform, matchedKeyframeIndex} = this.doMatching(featurePoints);
        if (matchedTargetIndex !== -1) {
          this.trackingIndex = matchedTargetIndex;
          this.trackingModelViewTransform = matchedModelViewTransform;
          this.trackingMiss = 0;
        }
      }

      if (this.trackingIndex !== -1) {
        const trackFeatures = this.tracker.track(input, this.trackingModelViewTransform, this.trackingIndex);
        let newModelViewTransform = null;
        if (trackFeatures.length >= 4) {
          newModelViewTransform = this.doTrackingUpdate(this.trackingModelViewTransform, trackFeatures);
        }

        if (newModelViewTransform === null) {
          this.trackingMiss += 1;
          if (this.trackingMiss > MISS_COUNT_TOLERANCE) {
            this.onUpdate({type: 'updateMatrix', targetIndex: this.trackingIndex, worldMatrix: null});
            this.trackingIndex = -1;
            this.trackingModelViewTransform = null;
          }
        } else {
          this.trackingMiss = 0;
          this.trackingModelViewTransform = newModelViewTransform;

          const worldMatrix = _glModelViewMatrix(this.trackingModelViewTransform);

          if (this.trackingMatrix === null) {
            this.trackingMatrix = worldMatrix;
          } else {
            for (let j = 0; j < worldMatrix.length; j++) {
              this.trackingMatrix[j] = this.trackingMatrix[j] + (worldMatrix[j] - this.trackingMatrix[j]) / INTERPOLATION_FACTOR;
            }
          }
          const clone = [];
          for (let j = 0; j < this.trackingMatrix.length; j++) {
            clone[j] = this.trackingMatrix[j];
          }
          this.onUpdate({type: 'updateMatrix', targetIndex: this.trackingIndex, worldMatrix: clone});
        }
      }

      await tf.nextFrame();
      this.onUpdate({type: 'processDone'});
    }
  }

  doTrackingUpdate(modelViewTransform, selectedFeatures) {
    const inlierProbs = [1.0, 0.8, 0.6, 0.4, 0.0];
    let err = null;
    let newModelViewTransform = modelViewTransform;
    let finalModelViewTransform = null;
    for (let i = 0; i < inlierProbs.length; i++) {
      let ret = _computeUpdatedTran({modelViewTransform: newModelViewTransform, selectedFeatures, projectionTransform: this.projectionTransform, inlierProb: inlierProbs[i]});
      err = ret.err;
      newModelViewTransform = ret.newModelViewTransform;
      //console.log("_computeUpdatedTran", err)

      if (err < AR2_TRACKING_THRESH) {
        finalModelViewTransform = newModelViewTransform;
        break;
      }
    }
    return finalModelViewTransform;
  }

  doMatching(featurePoints) {
    let matchedTargetIndex = -1;
    let matchedModelViewTransform = null;
    let matchedKeyframeIndex = -1;
    for (let i = 0; i < this.matchingDataList.length; i++) {
      const matchResult = this.matcher.matchDetection(this.matchingDataList[i], featurePoints);
      if (matchResult === null) continue;

      const {screenCoords, worldCoords, keyframeIndex} = matchResult;
      const modelViewTransform = estimateHomography({screenCoords, worldCoords, projectionTransform: this.projectionTransform});
      if (modelViewTransform === null) continue;

      matchedTargetIndex = i;
      matchedModelViewTransform = modelViewTransform;
      matchedKeyframeIndex = keyframeIndex;
    }
    return {matchedTargetIndex, matchedModelViewTransform, matchedKeyframeIndex};
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

module.exports = {
 Controller
}
