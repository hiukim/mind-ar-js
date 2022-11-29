const FakeShader = require('./fakeShader.js')
function GetProgram(outHeight,outWidth) {
  const kernel = {
    variableNames: ['extrema'],
    outputShape: [outHeight, outWidth],
    userCode: function () {
      const coords = this.getOutputCoords();
      const y = coords[0] * 2;
      const x = coords[1] * 2;

      let location = 0.0;
      let values = this.getExtrema(y, x);

      if (this.getExtrema(y + 1, x) != 0.0) {
        location = 1.0;
        values = this.getExtrema(y + 1, x);
      }
      else if (this.getExtrema(y, x + 1) != 0.0) {
        location = 2.0;
        values = this.getExtrema(y, x + 1);
      }
      else if (this.getExtrema(y + 1, x + 1) != 0.0) {
        location = 3.0;
        values = this.getExtrema(y + 1, x + 1);
      }

      if (values < 0.0) {
        this.setOutput(location * -1000.0 + values);
      } else {
        this.setOutput(location * 1000.0 + values);
      }
    }

  }
  return kernel;
}

function clamp(n, min, max) {
  return Math.min(Math.max(min, n), max - 1);
}

const extremaReduction = (args) => {
  const { extremasResultT } = args.inputs;
  /** @type {MathBackendCPU} */
  const backend = args.backend;
  const extremaHeight = extremasResultT.shape[0];
  const extremaWidth = extremasResultT.shape[1];
  const outHeight = Math.floor(extremaHeight / 2.0);
  const outWidth = Math.floor(extremaWidth / 2.0);
  const program=GetProgram(outHeight,outWidth);

  /* const extrema = backend.data.get(extremasResultT.dataId).values;
  const resultValues = new Float32Array(outHeight * outWidth);
  function getExtrema(y, x) {
    y = clamp(y, 0, extremaHeight);
    x = clamp(x, 0, extremaWidth);
    return extrema[y * extremaWidth + x];
  }
  function setOutput(y, x, o) {
    resultValues[y * outWidth + x] = o;
  }
  for (let _y = 0; _y < outHeight; _y++) {
    for (let _x = 0; _x < outWidth; _x++) {
      const y = _y * 2;
      const x = _x * 2;

      let location = 0.0;
      let values = getExtrema(y, x);

      if (getExtrema(y + 1, x) != 0.0) {
        location = 1.0;
        values = getExtrema(y + 1, x);
      }
      else if (getExtrema(y, x + 1) != 0.0) {
        location = 2.0;
        values = getExtrema(y, x + 1);
      }
      else if (getExtrema(y + 1, x + 1) != 0.0) {
        location = 3.0;
        values = getExtrema(y + 1, x + 1);
      }

      if (values < 0.0) {
        setOutput(_y, _x, location * -1000.0 + values);
      } else {
        setOutput(_y, _x, location * 1000.0 + values);
      }
    }
  } 
  return backend.makeOutput(resultValues, [outHeight, outWidth], extremasResultT.dtype);
  */
 return FakeShader.runCode(backend,program,[extremasResultT],extremasResultT.dtype);
}

const extremaReductionConfig = {//: KernelConfig
  kernelName: "ExtremaReduction",
  backendName: 'cpu',
  kernelFunc: extremaReduction,// as {} as KernelFunc,
};

module.exports = {
  extremaReductionConfig,
  extremaReduction
}