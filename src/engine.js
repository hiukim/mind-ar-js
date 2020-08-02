const {ImageTarget} = require('./image-target/index.js');
const {Detector} = require('./image-target/detector.js');

class Engine {
  constructor(options) {
    this.inputWidth = options.inputWidth;
    this.inputHeight = options.inputHeight;
    this.detector = new Detector(this.inputWidth, this.inputHeight);
    this.smartMatching = options.smartMatching;
    this._imageTargets = [];

    const near = 10;
    const far = 1000;
    const fovy = 45.0 * Math.PI / 180; // 45 in radian. field of view vertical
    const f = (this.inputHeight/2) / Math.tan(fovy/2);
    //     [fx  s cx]
    // K = [ 0 fx cy]
    //     [ 0  0  1]
    this._projectionTransform = [
      [f, 0, this.inputWidth / 2],
      [0, f, this.inputHeight / 2],
      [0, 0, 1]
    ];
    console.log("project transform", JSON.stringify(this._projectionTransform));

    this._projectionMatrix = _glProjectionMatrix({
      projectionTransform: this._projectionTransform,
      width: this.inputWidth - 1, // -1 is not necessary?
      height: this.inputHeight - 1,
      near: near,
      far: far,
    });
  }

  getProjectionMatrix() {
    return this._projectionMatrix;
  }

  addImageTarget(options) {
    const imageTarget = new ImageTarget(Object.assign({projectionTransform: this._projectionTransform, smartMatching: this.smartMatching}, options));
    this._imageTargets.push(imageTarget);
  }

  process(queryImageData) {
    let featurePoints = null;

    let needFeaturePoints = false;
    this._imageTargets.forEach((imageTarget) => {
      if (!imageTarget.isTracking) needFeaturePoints = true;
    });
    if (needFeaturePoints) {
      featurePoints = this.detector.detect(queryImageData);
    }

    const queryImage = {data: queryImageData, width: this.inputWidth, height: this.inputHeight};

    const result = [];
    this._imageTargets.forEach((imageTarget) => {
      const modelViewTransform = imageTarget.process(queryImage, featurePoints);
      const worldMatrix = modelViewTransform === null? null: _glModelViewMatrix({modelViewTransform});

      //console.log("worldMatrix", worldMatrix);

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
  Engine,
}

