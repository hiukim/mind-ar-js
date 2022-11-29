const FakeShader = require('./fakeShader.js');

function GetKernels(image) {
  const imageWidth = image.shape[1];
  const key = 'w' + imageWidth;

  const imageHeight = image.shape[0];
  const kernel1 = {
    variableNames: ['p'],
    outputShape: [imageHeight, imageWidth],
    userCode: function () {
      const coords = this.getOutputCoords();

      let sum = this.getP(coords[0], coords[1] - 2);
      sum += this.getP(coords[0], coords[1] - 1) * 4.;
      sum += this.getP(coords[0], coords[1]) * 6.;
      sum += this.getP(coords[0], coords[1] + 1) * 4.;
      sum += this.getP(coords[0], coords[1] + 2);
      this.setOutput(sum);
    }

  };
  const kernel2 = {
    variableNames: ['p'],
    outputShape: [imageHeight, imageWidth],
    userCode: function () {
      const coords = this.getOutputCoords();

      let sum = this.getP(coords[0] - 2, coords[1]);
      sum += this.getP(coords[0] - 1, coords[1]) * 4.;
      sum += this.getP(coords[0], coords[1]) * 6.;
      sum += this.getP(coords[0] + 1, coords[1]) * 4.;
      sum += this.getP(coords[0] + 2, coords[1]);
      sum /= 256.;
      this.setOutput(sum);
    }

  };
  return [kernel1, kernel2];
  //}

}

/**
 * 
 * @param {TypedArray} vals 
 */
function binomialFilterImpl(vals, width, height) {

  const resultValues1 = new Float32Array(width * height);
  let p = vals;
  let result = resultValues1;
  function clamp(n, min, max) {
    return Math.min(Math.max(min, n), max);
  }
  function getP(y, x) {
    x = clamp(x, 0, width - 1);
    y = clamp(y, 0, height - 1);

    return p[y * width + x];
  }
  function setOutput(y, x, o) {
    result[y * width + x] = o;
  }
  //step1
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const coords = [y, x];
      let sum = getP(coords[0], coords[1] - 2);
      sum += getP(coords[0], coords[1] - 1) * 4.0;
      sum += getP(coords[0], coords[1]) * 6.0;
      sum += getP(coords[0], coords[1] + 1) * 4.0;
      sum += getP(coords[0], coords[1] + 2);
      setOutput(y, x, sum);
    }
  }

  const resultValues2 = new Float32Array(vals.length);
  p = resultValues1;
  result = resultValues2;
  //step2
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const coords = [y, x];
      let sum = getP(coords[0] - 2, coords[1]);
      sum += getP(coords[0] - 1, coords[1]) * 4.0;
      sum += getP(coords[0], coords[1]) * 6.0;
      sum += getP(coords[0] + 1, coords[1]) * 4.0;
      sum += getP(coords[0] + 2, coords[1]);
      sum /= 256.0;
      setOutput(y, x, sum);
    }
  }
  return result;
}



const binomialFilter = (args) => {//{inputs: UnaryInputs, backend: MathBackendCPU}
  /** @type {import('@tensorflow/tfjs').TensorInfo} */
  const image = args.inputs.image;
  /** @type {MathBackendCPU} */
  const backend = args.backend;

  /** @type {TypedArray} */
  /*   const values = backend.data.get(image.dataId).values;// as TypedArray;
    
    const resultValues = binomialFilterImpl(values,image.shape[1],image.shape[0]);
  
    return backend.makeOutput(resultValues, image.shape, image.dtype); */
  const [kernel1, kernel2] = GetKernels(image);

  const result1 = FakeShader.runCode(backend, kernel1, [image], image.dtype);
  return FakeShader.runCode(backend, kernel2, [result1], image.dtype);
}




const binomialFilterConfig = {//: KernelConfig
  kernelName: "BinomialFilter",
  backendName: 'cpu',
  kernelFunc: binomialFilter,// as {} as KernelFunc,
};



module.exports = {
  binomialFilterConfig,
  binomialFilter,
  binomialFilterImpl
}