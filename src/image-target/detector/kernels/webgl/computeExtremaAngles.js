
const ORIENTATION_NUM_BINS = 36;

const cache={};
function GetProgram(histograms){
    const key=histograms.shape[0];
    if(!cache.hasOwnProperty(key)){
        const kernel = {
            variableNames: ['histogram'],
            outputShape: [histograms.shape[0]],
            userCode: `
            void main() {
                int featureIndex = getOutputCoords();

                int maxIndex = 0;
                for (int i = 1; i < ${ORIENTATION_NUM_BINS}; i++) {
                    if (getHistogram(featureIndex, i) > getHistogram(featureIndex, maxIndex)) {
                        maxIndex = i;
                    }
                }

                int prev = imod(maxIndex - 1 + ${ORIENTATION_NUM_BINS}, ${ORIENTATION_NUM_BINS});
                int next = imod(maxIndex + 1, ${ORIENTATION_NUM_BINS});

                /**
                 * Fit a quatratic to 3 points. The system of equations is:
                 *
                 * y0 = A*x0^2 + B*x0 + C
                 * y1 = A*x1^2 + B*x1 + C
                 * y2 = A*x2^2 + B*x2 + C
                 *
                 * This system of equations is solved for A,B,C.
                 */
                float p10 = float(maxIndex - 1);
                float p11 = getHistogram(featureIndex, prev); 
                float p20 = float(maxIndex);
                float p21 = getHistogram(featureIndex, maxIndex); 
                float p30 = float(maxIndex + 1);
                float p31 = getHistogram(featureIndex, next); 

                float d1 = (p30-p20)*(p30-p10);
                float d2 = (p10-p20)*(p30-p10);
                float d3 = p10-p20;

                // If any of the denominators are zero then, just use maxIndex.
                    float fbin = float(maxIndex);
                if ( abs(d1) > 0.00001 && abs(d2) > 0.00001 && abs(d3) > 0.00001) {
                float a = p10*p10;
                float b = p20*p20;

                // Solve for the coefficients A,B,C
                float A = ((p31-p21)/d1)-((p11-p21)/d2);
                float B = ((p11-p21)+(A*(b-a)))/d3;
                float C = p11-(A*a)-(B*p10);
                fbin = -B / (2. * A);
                }

                float an = 2.0 *${Math.PI} * (fbin + 0.5) / ${ORIENTATION_NUM_BINS}. - ${Math.PI};
                setOutput(an);
            }
            `
        }
        cache[key]=kernel;
    }
    return cache[key];
}

export const computeExtremaAngles=(args)=>{
    /** @type {import('@tensorflow/tfjs').TensorInfo} */
    const {histograms} = args.inputs;
    /** @type {MathBackendWebGL} */
    const backend = args.backend;

    const program = GetProgram(histograms);
    return backend.runWebGLProgram(program,[histograms],histograms.dtype);
}


export const computeExtremaAnglesConfig = {//: KernelConfig
    kernelName: "ComputeExtremaAngles",
    backendName: 'webgl',
    kernelFunc: computeExtremaAngles,// as {} as KernelFunc,
};
