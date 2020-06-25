const {ImageTarget} = require('./image-target/index.js');

class Controller {
  constructor(inputWidth, inputHeight) {
    this._imageTargets = [];

    // TODO: non-hardcoded camera matrix?
    //     [fx  s cx]
    // K = [ 0 fx cy]
    //     [ 0  0  1]
    const cameraWidth = 640.0;
    const cameraHeight = 480.0;
    this._projectionTransform = [
      [609.3654091867005, 0, 323.4479064941406],
      [0, 606.5212236031074, 237.60653686523438],
      [0, 0, 1]
    ];

    for (let i = 0; i < 3; i++) {
      this._projectionTransform[0][i] *= cameraWidth / inputWidth;
      this._projectionTransform[1][i] *= cameraHeight / inputHeight;
    }

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
    const imageTarget = new ImageTarget(Object.assign({projectionTransform: this._projectionTransform}, options));
    this._imageTargets.push(imageTarget);
  }

  process(queryImage) {
    const result = [];
    this._imageTargets.forEach((imageTarget) => {
      const modelViewTransform = imageTarget.process(queryImage);
      const worldMatrix = modelViewTransform === null? null: _glModelViewMatrix({modelViewTransform});

      console.log("worldMatrix", worldMatrix);

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
