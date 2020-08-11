const {ImageTarget} = require('./image-target/index.js');
const {Detector} = require('./image-target/detectorGPU/detector.js');
//const {Detector} = require('./image-target/detectorCPU/detector.js');
const {Compiler} = require('./compiler.js');

class Controller {
  constructor(inputWidth, inputHeight) {
    this.inputWidth = inputWidth;
    this.inputHeight = inputHeight;
    this.detector = new Detector(this.inputWidth, this.inputHeight);
    this.imageTargets = [];
    this.trackingIndex = -1;

    const near = 10;
    const far = 1000;
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
      width: this.inputWidth - 1, // -1 is not necessary?
      height: this.inputHeight - 1,
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

      for (let i = 0; i < dataList.length; i++) {
        const imageTarget = new ImageTarget({
          projectionTransform: this.projectionTransform,
          imageList: dataList[i].imageList,
          targetImage: dataList[i].targetImage,
          matchingData: dataList[i].matchingData,
          trackingData: dataList[i].trackingData,
        });
        imageTarget.setupQuery(this.inputWidth, this.inputHeight);
        this.imageTargets.push(imageTarget);
      }
      resolve(true);
    });
  }

  // input is either HTML video or HTML image
  process(input) {
    logTime("engine process");

    if (this.trackingIndex === -1) {
      let featurePoints = this.detector.detect(input);
      for (let i = 0; i < this.imageTargets.length; i++) {
        const imageTarget = this.imageTargets[i];
        imageTarget.match(featurePoints);
        if (imageTarget.isTracking) {
          this.trackingIndex = i;
          break;
        }
      }
    }

    const result = [];
    for (let i = 0; i < this.imageTargets.length; i++) {
      const imageTarget = this.imageTargets[i];
      let worldMatrix = null;
      if (imageTarget.isTracking) {
        const modelViewTransform = imageTarget.track(input);
        worldMatrix = modelViewTransform === null? null: _glModelViewMatrix({modelViewTransform});
        if (worldMatrix === null) this.trackingIndex = -1;
      }
      result.push({
        worldMatrix: worldMatrix
      })
    }

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
 Controller
}
