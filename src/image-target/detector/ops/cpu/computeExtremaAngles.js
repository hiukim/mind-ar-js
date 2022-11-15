const ORIENTATION_NUM_BINS = 36;


function computeExtremaAnglesImpl(histogram, length) {
    const resultValues = new Float32Array(length);

    function getHistogram(featureIndex, prev) { return histogram[featureIndex * length + prev] };
    function setOutput(featureIndex, an) { resultValues[featureIndex] = an; }

    function imod(x, y) {
        return x - y * Math.floor(x / y)
    }

    for (let featureIndex = 0; featureIndex < histogram.length; featureIndex++) {
        let maxIndex = 0;
        for (let i = 1; i < ORIENTATION_NUM_BINS; i++) {
            if (getHistogram(featureIndex, i) > getHistogram(featureIndex, maxIndex)) {
                maxIndex = i;
            }
        }
        let prev = imod(maxIndex - 1 + ORIENTATION_NUM_BINS, ORIENTATION_NUM_BINS);
        let next = imod(maxIndex + 1, ORIENTATION_NUM_BINS);
        /**
         * Fit a quatratic to 3 points. The system of equations is:
         *
         * y0 = A*x0^2 + B*x0 + C
         * y1 = A*x1^2 + B*x1 + C
         * y2 = A*x2^2 + B*x2 + C
         *
         * This system of equations is solved for A,B,C.
         */
        const p10 = (maxIndex - 1);
        const p11 = getHistogram(featureIndex, prev);
        const p20 = (maxIndex);
        const p21 = getHistogram(featureIndex, maxIndex);
        const p30 = (maxIndex + 1);
        const p31 = getHistogram(featureIndex, next);

        const d1 = (p30 - p20) * (p30 - p10);
        const d2 = (p10 - p20) * (p30 - p10);
        const d3 = p10 - p20;

        // If any of the denominators are zero then, just use maxIndex.
        let fbin = (maxIndex);
        if (Math.abs(d1) > 0.00001 && Math.abs(d2) > 0.00001 && Math.abs(d3) > 0.00001) {
            const a = p10 * p10;
            const b = p20 * p20;

            // Solve for the coefficients A,B,C
            const A = ((p31 - p21) / d1) - ((p11 - p21) / d2);
            const B = ((p11 - p21) + (A * (b - a))) / d3;
            //const C = p11 - (A * a) - (B * p10);
            fbin = -B / (2.0 * A);
        }

        const an = 2.0 * Math.PI * (fbin + 0.5) / ORIENTATION_NUM_BINS - Math.PI;
        setOutput(an);
    }
    return resultValues;
}

const computeExtremaAngles = (args) => {
    /** @type {import('@tensorflow/tfjs').TensorInfo} */
    const { histograms } = args.inputs;
    /** @type {import('@tensorflow/tfjs-backend-cpu').MathBackendCPU} */
    const backend = args.backend;

    /** @type {TypedArray} */
    const vals0 = backend.data.get(histograms.dataId).values;

    const resultValues = computeExtremaAnglesImpl(vals0, histograms.shape[0]);

    return backend.makeOutput(resultValues, [histograms.shape[0]], histograms.dtype);
}


const computeExtremaAnglesConfig = {//: KernelConfig
    kernelName: "ComputeExtremaAngles",
    backendName: 'cpu',
    kernelFunc: computeExtremaAngles,// as {} as KernelFunc,
};

module.exports = {
    computeExtremaAnglesConfig,
    computeExtremaAngles,
    computeExtremaAnglesImpl
}