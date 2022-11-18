
/*
const kernel = {
    variableNames: ['p'],
    outputShape: [Math.floor(imageHeight/2), Math.floor(imageWidth/2)],
    userCode: `
      void main() {
        ivec2 coords = getOutputCoords();
        int y = coords[0] * 2;
        int x = coords[1] * 2;

        float sum = getP(y, x) * 0.25;
        sum += getP(y+1,x) * 0.25; 
        sum += getP(y, x+1) * 0.25; 
        sum += getP(y+1,x+1) * 0.25;
        setOutput(sum);
      }
    `
*/
function clamp(n, min, max) {
    return Math.min(Math.max(min, n), max);
}


const downsampleBilinearImpl = (vals, width, height) => {
    const w = Math.floor(width / 2.0);
    const h = Math.floor(height / 2.0);
    const resultValues = new Float32Array(w * h);

    function getP(y, x) {
        x = clamp(x, 0, width - 1);
        y = clamp(y, 0, height - 1);
        return vals[y * width + x];
    }
    function setOutput(y, x, o) {
        resultValues[y * width + x] = o;
    }
    for (let _y = 0; _y < h; _y++) {
        for (let _x = 0; _x < w; _x++) {
            const coords = [_y, _x];
            const y = coords[0] * 2;
            const x = coords[1] * 2;

            let sum = getP(y, x) * 0.25;
            sum += getP(y + 1, x) * 0.25;
            sum += getP(y, x + 1) * 0.25;
            sum += getP(y + 1, x + 1) * 0.25;
            setOutput(_y, _x, sum);
        }
    }
    return resultValues;
}

const downsampleBilinear = (args) => {
    /** @type {import('@tensorflow/tfjs').TensorInfo} */
    const x = args.inputs.image;
    /** @type {MathBackendCPU} */
    const cpuBackend = args.backend;
    const imageHeight = x.shape[0];
    const imageWidth = x.shape[1];
    /** @type {TypedArray} */
    const values = cpuBackend.data.get(x.dataId).values;

    const resultValues = downsampleBilinearImpl(values, imageWidth, imageHeight);

    return cpuBackend.makeOutput(resultValues, [Math.floor(imageHeight / 2), Math.floor(imageWidth / 2)], 'float32');
}

const downsampleBilinearConfig = {//: KernelConfig
    kernelName: "DownsampleBilinear",
    backendName: 'cpu',
    kernelFunc: downsampleBilinear,// as {} as KernelFunc,
};

module.exports = {
    downsampleBilinearConfig,
    downsampleBilinear,
    downsampleBilinearImpl
}