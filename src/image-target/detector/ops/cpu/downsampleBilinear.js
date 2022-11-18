
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


const downsampleBilinearImpl = (imageData,outputSize) => {
    const resultValues = new Float32Array(outputSize[0] * outputSize[1]);

    function getP(y, x) {
        x = clamp(x, 0, imageData.width - 1);
        y = clamp(y, 0, imageData.height - 1);
        return imageData.values[y * imageData.width + x];
    }
    function setOutput(y, x, o) {
        resultValues[y * outputSize[1] + x] = o;
    }
    for (let _y = 0; _y < outputSize[0]; _y++) {
        for (let _x = 0; _x < outputSize[1]; _x++) {
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
    const backend = args.backend;
    
    const imageData = {values:backend.data.get(x.dataId).values,height:x.shape[0],width:x.shape[1]}
    const outputSize=[Math.floor(imageData.height/2.0),Math.floor(imageData.width/2.0)];
    const resultValues = downsampleBilinearImpl(imageData,outputSize);
    
    return backend.makeOutput(resultValues, outputSize, x.dtype);
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