const { FREAKPOINTS } = require('../../freak.js')


const FREAK_EXPANSION_FACTOR = 7.0;

function computeExtremaFreakImpl(gaussianImagesT, prunedExtremas, prunedExtremasAngles, freakPointsT) {
    const resultValues = new Float32Array(prunedExtremas.height * FREAKPOINTS.length);
    function getPixel(octave, y, x) {
        const temp = gaussianImagesT[octave - 1];
        return temp.values[y * temp.width + x];
    }
    function getExtrema(featureIndex, num) {
        return prunedExtremas.values[featureIndex * prunedExtremas.width + num];
    }
    function getAngles(featureIndex) {
        return prunedExtremasAngles.values[featureIndex];
    }
    function getFreakPoints(freakIndex, num) {
        return freakPointsT.values[freakIndex * freakPointsT.width + num];
    }

    function setOutput(y, x, o) {
        resultValues[y * FREAKPOINTS.length + x] = o;
    }

    for (let featureIndex = 0; featureIndex < prunedExtremas.height; featureIndex++) {
        for (let freakIndex = 0; freakIndex < FREAKPOINTS.length; freakIndex++) {
            //const freakSigma = getFreakPoints(freakIndex, 0);
            const freakX = getFreakPoints(freakIndex, 1);
            const freakY = getFreakPoints(freakIndex, 2);

            const octave = Math.trunc(getExtrema(featureIndex, 1));
            const inputY = getExtrema(featureIndex, 2);
            const inputX = getExtrema(featureIndex, 3);
            const inputAngle = getAngles(featureIndex);
            const cos = FREAK_EXPANSION_FACTOR * cos(inputAngle);
            const sin = FREAK_EXPANSION_FACTOR * sin(inputAngle);

            const yp = inputY + freakX * sin + freakY * cos;
            const xp = inputX + freakX * cos + freakY * -sin;

            const x0 = Math.trunc(Math.floor(xp));
            const x1 = x0 + 1;
            const y0 = Math.trunc(Math.floor(yp));
            const y1 = y0 + 1;

            const f1 = getPixel(octave, y0, x0);
            const f2 = getPixel(octave, y0, x1);
            const f3 = getPixel(octave, y1, x0);
            const f4 = getPixel(octave, y1, x1);

            /* const x1f = x1;
            const y1f = y1;
            const x0f = x0;
            const y0f = y0; */

            // ratio for interpolation between four neighbouring points
            const value = (x1 - xp) * (y1 - yp) * f1
                + (xp - x0) * (y1 - yp) * f2
                + (x1 - xp) * (yp - y0) * f3
                + (xp - x0) * (yp - y0) * f4;

            setOutput(featureIndex, freakIndex, value);
        }
    }
    return resultValues;
}

const computeExtremaFreak = (args) => {
    /** @type {import('@tensorflow/tfjs').TensorInfo} */
    const { gaussianImagesT, prunedExtremas, prunedExtremasAngles, freakPointsT } = args.inputs;
    /** @type {MathBackendCPU} */
    const backend = args.backend;
    
    /** @type {Array<number[]>} */
    const gaussianImagesTData = gaussianImagesT.map((tensorInfo) => { return { height: tensorInfo.shape[0], width: tensorInfo.shape[1], values: backend.data.get(tensorInfo.dataId).values, } });
    const prunedExtremasData = { values: backend.data.get(prunedExtremas.dataId).values, height: prunedExtremas.shape[0], width: prunedExtremas.shape[1] };
    const prunedExtremasAnglesData = { values: backend.data.get(prunedExtremasAngles.dataId).values };
    const freakPointsTData = { values: backend.data.get(freakPointsT.dataId).values, height: freakPointsT.shape[0], width: freakPointsT.shape[1] };
    
    const resultValues = computeExtremaFreakImpl(gaussianImagesTData, prunedExtremasData, prunedExtremasAnglesData, freakPointsTData);
    return backend.makeOutput(resultValues, [prunedExtremas.shape[0], FREAKPOINTS.length], 'float32');
}



const computeExtremaFreakConfig = {//: KernelConfig
    kernelName: "ComputeExtremaFreak",
    backendName: 'cpu',
    kernelFunc: computeExtremaFreak,// as {} as KernelFunc,
};

module.exports = {
    computeExtremaFreakConfig,
    computeExtremaFreak,
    computeExtremaFreakImpl
}