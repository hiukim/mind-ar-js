
const FakeShader= require('./fakeShader.js');
const tf = require('@tensorflow/tfjs');
const FREAK_EXPANSION_FACTOR = 7.0;

const LAPLACIAN_THRESHOLD = 3.0;
const LAPLACIAN_SQR_THRESHOLD = LAPLACIAN_THRESHOLD * LAPLACIAN_THRESHOLD;

const EDGE_THRESHOLD = 4.0;
const EDGE_HESSIAN_THRESHOLD = ((EDGE_THRESHOLD + 1) * (EDGE_THRESHOLD + 1) / EDGE_THRESHOLD);

function GetProgram(image) {
  const imageWidth = image.shape[1];
  const imageHeight = image.shape[0];
  const kernel = {
    variableNames: ['image0', 'image1', 'image2'],
    outputShape: [imageHeight, imageWidth],
    userCode:
      function () {
        const coords = this.getOutputCoords();

        const y = coords[0];
        const x = coords[1];

        const value = this.getImage1(y, x);

        // Step 1: find local maxima/minima
        if (value * value < LAPLACIAN_SQR_THRESHOLD) {
          this.setOutput(0.0);
          return;
        }
        if (y < FREAK_EXPANSION_FACTOR || y > imageHeight - 1 - FREAK_EXPANSION_FACTOR) {
          this.setOutput(0.0);
          return;
        }
        if (x < FREAK_EXPANSION_FACTOR || x > imageWidth - 1 - FREAK_EXPANSION_FACTOR) {
          this.setOutput(0.0);
          return;
        }

        let isMax = true;
        let isMin = true;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const value0 = this.getImage0(y + dy, x + dx);
            const value1 = this.getImage1(y + dy, x + dx);
            const value2 = this.getImage2(y + dy, x + dx);

            if (value < value0 || value < value1 || value < value2) {
              isMax = false;
            }
            if (value > value0 || value > value1 || value > value2) {
              isMin = false;
            }
          }
        }

        if (!isMax && !isMin) {
          this.setOutput(0.0);
          return;
        }

        // compute edge score and reject based on threshold
        const dxx = this.getImage1(y, x + 1) + this.getImage1(y, x - 1) - 2. * this.getImage1(y, x);
        const dyy = this.getImage1(y + 1, x) + this.getImage1(y - 1, x) - 2. * this.getImage1(y, x);
        const dxy = 0.25 * (this.getImage1(y - 1, x - 1) + this.getImage1(y + 1, x + 1) - this.getImage1(y - 1, x + 1) - this.getImage1(y + 1, x - 1));

        const det = (dxx * dyy) - (dxy * dxy);

        if (Math.abs(det) < 0.0001) { // determinant undefined. no solution
          this.setOutput(0.0);
          return;
        }

        const edgeScore = (dxx + dyy) * (dxx + dyy) / det;

        if (Math.abs(edgeScore) >= EDGE_HESSIAN_THRESHOLD) {
          this.setOutput(0.0);
          return;
        }
        this.setOutput(this.getImage1(y, x));
      }

  };
  

  return kernel;
}

function clamp(n, min, max) {
  return Math.min(Math.max(min, n), max);
}

const buildExtremasImpl = (image0, image1, image2, width, height) => {
  const resultValues = new Float32Array(width * height);
  function getImage0(y, x) {
    y = clamp(y, 0, height);
    x = clamp(x, 0, width);
    return image0[y * width + x];
  }
  function getImage1(y, x) {
    y = clamp(y, 0, height);
    x = clamp(x, 0, width);
    return image1[y * width + x];
  }
  function getImage2(y, x) {
    y = clamp(y, 0, height);
    x = clamp(x, 0, width);
    return image2[y * width + x];
  }

  function setOutput(y, x, o) {
    resultValues[y * width + x] = o;
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const value = getImage1(y, x);

      // Step 1: find local maxima/minima
      if (value * value < LAPLACIAN_SQR_THRESHOLD) {
        setOutput(y, x, 0.);
        continue;
      }
      if (y < FREAK_EXPANSION_FACTOR || y > (height - 1 - FREAK_EXPANSION_FACTOR)) {
        setOutput(y, x, 0.0);
        continue;
      }
      if (x < FREAK_EXPANSION_FACTOR || x > (width - 1 - FREAK_EXPANSION_FACTOR)) {
        setOutput(y, x, 0.0);
        continue;
      }

      let isMax = true;
      let isMin = true;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const value0 = getImage0(y + dy, x + dx);
          const value1 = getImage1(y + dy, x + dx);
          const value2 = getImage2(y + dy, x + dx);

          if (value < value0 || value < value1 || value < value2) {
            isMax = false;
          }
          if (value > value0 || value > value1 || value > value2) {
            isMin = false;
          }
        }
      }

      if (!isMax && !isMin) {
        setOutput(y, x, 0.0);
        continue;
      }

      // compute edge score and reject based on threshold
      const dxx = getImage1(y, x + 1) + getImage1(y, x - 1) - 2.0 * getImage1(y, x);
      const dyy = getImage1(y + 1, x) + getImage1(y - 1, x) - 2.0 * getImage1(y, x);
      const dxy = 0.25 * (getImage1(y - 1, x - 1) + getImage1(y + 1, x + 1) - getImage1(y - 1, x + 1) - getImage1(y + 1, x - 1));

      const det = (dxx * dyy) - (dxy * dxy);

      if (Math.abs(det) < 0.0001) { // determinant undefined. no solution
        setOutput(y, x, 0.0);
        continue;
      }

      const edgeScore = (dxx + dyy) * (dxx + dyy) / det;

      if (Math.abs(edgeScore) >= EDGE_HESSIAN_THRESHOLD) {
        setOutput(y, x, 0.0);
        continue;
      }
      setOutput(y, x, getImage1(y, x));
    }
  }
  return resultValues;
}

const buildExtremas = (args) => {
  let { image0, image1, image2 } = args.inputs;
  /** @type {MathBackendCPU} */
  const backend = args.backend;

  const imageHeight = image1.shape[0];
  const imageWidth = image1.shape[1];

  image0 = tf.engine().runKernel('DownsampleBilinear', { image: image0 });
  image2 = tf.engine().runKernel('UpsampleBilinear', { image: image2, targetImage: image1 });
  const program=GetProgram(image1);
  return FakeShader.runCode(backend,program,[image0,image1,image2],image1.dtype);
  /** @type {TypedArray} */
  /* const vals0 = backend.data.get(image0.dataId).values;
  const vals1 = backend.data.get(image1.dataId).values;
  const vals2 = backend.data.get(image2.dataId).values;

  const resultValues = buildExtremasImpl(vals0, vals1, vals2, imageWidth, imageHeight);

  return backend.makeOutput(resultValues, [imageHeight, imageWidth], image1.dtype); */
}

const buildExtremasConfig = {//: KernelConfig
  kernelName: "BuildExtremas",
  backendName: 'cpu',
  kernelFunc: buildExtremas,// as {} as KernelFunc,
};

module.exports = {
  buildExtremasConfig,
  buildExtremas,
  buildExtremasImpl
}