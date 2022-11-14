


const extremaReduction = (args) => {
    const { extremasResultT } = args.inputs;
    /** @type {MathBackendCPU} */
    const backend = args.backend;
    const extremaHeight = extremasResultT.shape[0];
    const extremaWidth = extremasResultT.shape[1];
    const extrema = backend.data.get(extremasResultT.dataId).values;
    const resultValues = new Float32Array(Math.floor(extremaHeight / 2) * Math.floor(extremaWidth / 2));
    function getExtrema(y, x) {
        return extrema[y * extremaWidth + x];
    }
    function setOutput(y, x, o) {
        resultValues[y * Math.floor(extremaWidth / 2) + x] = o;
    }
    for (let _y = 0; _y < Math.floor(extremaHeight / 2); _y++) {
        for (let _x = 0; _x < Math.floor(extremaWidth / 2); _x++) {
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
    return backend.makeOutput(resultValues,  [Math.floor(extremaHeight / 2), Math.floor(extremaWidth / 2)], extremasResultT.dtype);
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