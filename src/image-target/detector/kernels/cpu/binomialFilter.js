import * as FakeShader from './fakeShader.js';


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




export const binomialFilter = (args) => {//{inputs: UnaryInputs, backend: MathBackendCPU}
  /** @type {import('@tensorflow/tfjs').TensorInfo} */
  const image = args.inputs.image;
  /** @type {MathBackendCPU} */
  const backend = args.backend;

  const [kernel1, kernel2] = GetKernels(image);

  const result1 = FakeShader.runCode(backend, kernel1, [image], image.dtype);
  return FakeShader.runCode(backend, kernel2, [result1], image.dtype);
}




export const binomialFilterConfig = {//: KernelConfig
  kernelName: "BinomialFilter",
  backendName: 'cpu',
  kernelFunc: binomialFilter,// as {} as KernelFunc,
};



