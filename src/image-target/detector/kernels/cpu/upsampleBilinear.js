import * as FakeShader from './fakeShader.js';
function getProgram(targetImage) {
    const kernel = {
        variableNames: ['p'],
        outputShape: [targetImage.shape[0], targetImage.shape[1]],
        userCode: function () {
            const coords = this.getOutputCoords();
            const j = coords[0];
            const i = coords[1];

            const sj = Math.fround(0.5 * j) - 0.25;
            const si = Math.fround(0.5 * i) - 0.25;

            const sj0 = Math.floor(sj);
            const sj1 = Math.ceil(sj);
            const si0 = Math.floor(si);
            const si1 = Math.ceil(si);

            const sj0I = this.int(sj0);
            const sj1I = this.int(sj1);
            const si0I = this.int(si0);
            const si1I = this.int(si1);

            let sum = 0.0;
            sum += this.getP(sj0I, si0I) * Math.fround((si1 - si) * (sj1 - sj));
            sum += this.getP(sj1I, si0I) * Math.fround((si1 - si) * (sj - sj0));
            sum += this.getP(sj0I, si1I) * Math.fround((si - si0) * (sj1 - sj));
            sum += this.getP(sj1I, si1I) * Math.fround((si - si0) * (sj - sj0));
            this.setOutput(sum);
        }

    };
    return kernel;
}

export const upsampleBilinear = (args) => {
    /** @type {import('@tensorflow/tfjs').TensorInfo} */
    const { image, targetImage } = args.inputs;
 
    /** @type {MathBackendCPU} */
    const cpuBackend = args.backend;
    
    const program = getProgram(targetImage);
    return FakeShader.runCode(cpuBackend,program,[image],image.dtype);

}

export const upsampleBilinearConfig = {//: KernelConfig
    kernelName: "UpsampleBilinear",
    backendName: 'cpu',
    kernelFunc: upsampleBilinear,// as {} as KernelFunc,
};

