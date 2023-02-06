import { FREAKPOINTS } from '../../freak.js';
import * as FakeShader from './fakeShader.js';
const FREAK_EXPANSION_FACTOR = 7.0;

function GetProgram(prunedExtremasHeight, pyramidImagesLength) {

    const imageVariableNames = [];
    for (let i = 1; i < pyramidImagesLength; i++) {
        imageVariableNames.push('image' + i);
    }


    const kernel = {
        variableNames: [...imageVariableNames, 'extrema', 'angles', 'freakPoints'],
        outputShape: [prunedExtremasHeight, FREAKPOINTS.length],
        userCode: function () {
            const getPixel=(octave, y, x)=> {
                const key = 'getImage' + octave;
                if (octave < 1 || octave >= pyramidImagesLength)
                    return 0.0;
                return this[key](y, x);
            }
            const coords = this.getOutputCoords();
            const featureIndex = coords[0];
            const freakIndex = coords[1];

            //const freakSigma = this.getFreakPoints(freakIndex, 0);
            const freakX = this.getFreakPoints(freakIndex, 1);
            const freakY = this.getFreakPoints(freakIndex, 2);

            const octave = this.int(this.getExtrema(featureIndex, 1));
            const inputY = this.getExtrema(featureIndex, 2);
            const inputX = this.getExtrema(featureIndex, 3);
            const inputAngle = this.getAngles(featureIndex);
            const cos = FREAK_EXPANSION_FACTOR * Math.cos(inputAngle);
            const sin = FREAK_EXPANSION_FACTOR * Math.sin(inputAngle);

            const yp = inputY + freakX * sin + freakY * cos;
            const xp = inputX + freakX * cos + freakY * -sin;

            const x0 = this.int(Math.floor(xp));
            const x1 = x0 + 1;
            const y0 = this.int(Math.floor(yp));
            const y1 = y0 + 1;

            const f1 = getPixel(octave, y0, x0);
            const f2 = getPixel(octave, y0, x1);
            const f3 = getPixel(octave, y1, x0);
            const f4 = getPixel(octave, y1, x1);

            /* const x1f = float(x1);
            const y1f = float(y1);
            const x0f = float(x0);
            const y0f = float(y0); */

            // ratio for interpolation between four neighbouring points
            const value = (x1 - xp) * (y1 - yp) * f1
                + (xp - x0) * (y1 - yp) * f2
                + (x1 - xp) * (yp - y0) * f3
                + (xp - x0) * (yp - y0) * f4;

            this.setOutput(value);
        }

    }

    return kernel;

}



export const computeExtremaFreak = (args) => {
    /** @type {import('@tensorflow/tfjs').TensorInfo} */
    const { gaussianImagesT, prunedExtremas, prunedExtremasAngles, freakPointsT, pyramidImagesLength } = args.inputs;
    /** @type {MathBackendCPU} */
    const backend = args.backend;
    const prog = GetProgram(prunedExtremas.shape[0], pyramidImagesLength);
    return FakeShader.runCode(backend, prog, [...gaussianImagesT, prunedExtremas, prunedExtremasAngles, freakPointsT], 'float32');
}



export const computeExtremaFreakConfig = {//: KernelConfig
    kernelName: "ComputeExtremaFreak",
    backendName: 'cpu',
    kernelFunc: computeExtremaFreak,// as {} as KernelFunc,
};

