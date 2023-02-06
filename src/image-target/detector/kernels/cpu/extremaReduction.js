import * as FakeShader from './fakeShader.js';
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


export const extremaReduction = (args) => {
  const { extremasResultT } = args.inputs;
  /** @type {MathBackendCPU} */
  const backend = args.backend;
  const extremaHeight = extremasResultT.shape[0];
  const extremaWidth = extremasResultT.shape[1];
  const outHeight = Math.floor(extremaHeight / 2.0);
  const outWidth = Math.floor(extremaWidth / 2.0);
  const program=GetProgram(outHeight,outWidth);

 return FakeShader.runCode(backend,program,[extremasResultT],extremasResultT.dtype);
}

export const extremaReductionConfig = {//: KernelConfig
  kernelName: "ExtremaReduction",
  backendName: 'cpu',
  kernelFunc: extremaReduction,// as {} as KernelFunc,
};
