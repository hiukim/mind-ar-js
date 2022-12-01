
const ORIENTATION_NUM_BINS = 36;
const ORIENTATION_SMOOTHING_ITERATIONS = 5;


function smoothHistogramsImpl(histograms) {
    const resultValues = new Float32Array(histograms.height * ORIENTATION_NUM_BINS);
    function getHistogram(y, x) {
        return histograms.values[y * histograms.width + x];
    }
    function setOutput(y, x, o) {
        resultValues[y * ORIENTATION_NUM_BINS + x] = o;
    }
    function imod(x,y){
        return Math.trunc(x - y * Math.floor(x/y));
    }
    for (let featureIndex = 0; featureIndex < histograms.height; featureIndex++) {
        for (let binIndex = 0; binIndex < ORIENTATION_NUM_BINS; binIndex++) {
            const prevBin = imod(binIndex - 1 + ORIENTATION_NUM_BINS, ORIENTATION_NUM_BINS);
            const nextBin = imod(binIndex + 1, ORIENTATION_NUM_BINS);
            const result = 0.274068619061197 * getHistogram(featureIndex, prevBin) + 0.451862761877606 * getHistogram(featureIndex, binIndex) + 0.274068619061197 * getHistogram(featureIndex, nextBin);

            setOutput(featureIndex, binIndex, result);
        }
    }

    return resultValues;
}

export const smoothHistograms = (args) => {
    /** @type {import('@tensorflow/tfjs').TensorInfo} */
    const { histograms } = args.inputs;
    /** @type {MathBackendCPU} */
    const backend = args.backend;
    const histogramsData = { values: backend.data.get(histograms.dataId).values, height: histograms.shape[0], width: histograms.shape[1] };
    //const program = GetProgram(histograms);
    for (let i = 0; i < ORIENTATION_SMOOTHING_ITERATIONS; i++) {
        histogramsData.values = smoothHistogramsImpl(histogramsData);//backend.runWebGLProgram(program, [histograms], histograms.dtype);//this._compileAndRun(program, [histograms]);
    }
    return backend.makeOutput(histogramsData.values,[histograms.shape[0],ORIENTATION_NUM_BINS],histograms.dtype);

}



export const smoothHistogramsConfig = {//: KernelConfig
    kernelName: "SmoothHistograms",
    backendName: 'cpu',
    kernelFunc: smoothHistograms,// as {} as KernelFunc,
};

