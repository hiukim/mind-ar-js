
const oneOver2PI = 0.159154943091895;
const ORIENTATION_NUM_BINS = 36;

const cache={};

function GetPrograms(prunedExtremasT, radialPropertiesT,pyramidImagesLength){
    const key=`${pyramidImagesLength}|${prunedExtremasT.shape[0]}|${radialPropertiesT.shape[0]}`;
    if (!cache.hasOwnProperty(key)) {
        const imageVariableNames = [];
        for (let i = 1; i < pyramidImagesLength; i++) {
            imageVariableNames.push('image' + i);
        }

        let kernel1SubCodes = `float getPixel(int octave, int y, int x) {`;
        for (let i = 1; i <pyramidImagesLength; i++) {
            kernel1SubCodes += `
            if (octave == ${i}) {
                return getImage${i}(y, x);
            }
            `;
        }
        kernel1SubCodes += `}`;

        const kernel1 = {
            variableNames: [...imageVariableNames, 'extrema', 'radial'],
            outputShape: [prunedExtremasT.shape[0], radialPropertiesT.shape[0], 2], // last dimension: [fbin, magnitude]
            userCode: `
                ${kernel1SubCodes}

                void main() {
                    ivec3 coords = getOutputCoords();
                    int featureIndex = coords[0];
                    int radialIndex = coords[1];
                    int propertyIndex = coords[2];

                    int radialY = int(getRadial(radialIndex, 0));
                    int radialX = int(getRadial(radialIndex, 1));
                    float radialW = getRadial(radialIndex, 2);

                    int octave = int(getExtrema(featureIndex, 1));
                    int y = int(getExtrema(featureIndex, 2));
                    int x = int(getExtrema(featureIndex, 3));

                    int xp = x + radialX;
                    int yp = y + radialY;

                    float dy = getPixel(octave, yp+1, xp) - getPixel(octave, yp-1, xp);
                    float dx = getPixel(octave, yp, xp+1) - getPixel(octave, yp, xp-1);

                    if (propertyIndex == 0) {
                    // be careful that atan(0, 0) gives 1.57 instead of 0 (different from js), but doesn't matter here, coz magnitude is 0
                    
                    float angle = atan(dy, dx) + ${Math.PI};
                    float fbin = angle * ${ORIENTATION_NUM_BINS}. * ${oneOver2PI};
                    setOutput(fbin);
                    return;
                    }

                    if (propertyIndex == 1) {
                        float mag = sqrt(dx * dx + dy * dy);
                        float magnitude = radialW * mag;
                        setOutput(magnitude);
                        return;
                    }
                }

                `
        }

        const kernel2 = {
            variableNames: ['fbinMag'],
            outputShape: [prunedExtremasT.shape[0], ORIENTATION_NUM_BINS],
            userCode: `
            void main() {
                ivec2 coords = getOutputCoords();
                int featureIndex = coords[0];
                int binIndex = coords[1];

                float sum = 0.;
                for (int i = 0; i < ${radialPropertiesT.shape[0]}; i++) {
                    float fbin = getFbinMag(featureIndex, i, 0);
                    int bin = int(floor(fbin - 0.5));
                    int b1 = imod(bin + ${ORIENTATION_NUM_BINS}, ${ORIENTATION_NUM_BINS});
                    int b2 = imod(bin + 1 + ${ORIENTATION_NUM_BINS}, ${ORIENTATION_NUM_BINS});

                    if (b1 == binIndex || b2 == binIndex) {
                        float magnitude = getFbinMag(featureIndex, i, 1);
                        float w2 = fbin - float(bin) - 0.5;
                        float w1 = w2 * -1. + 1.;

                        if (b1 == binIndex) {
                            sum += w1 * magnitude;
                        }
                        if (b2 == binIndex) {
                            sum += w2 * magnitude;
                        }
                    }
                }
                setOutput(sum);
            }
            `
        }

        cache[key] = [kernel1, kernel2];
    }
    return cache[key];
}

export const computeOrientationHistograms=(args)=>{
    const {gaussianImagesT, prunedExtremasT, radialPropertiesT,pyramidImagesLength}=args.inputs;
    /** @type {MathBackendWebGL} */
    const backend = args.backend;
    const [program1,program2]=GetPrograms(prunedExtremasT, radialPropertiesT,pyramidImagesLength);
    
    const result1 = backend.runWebGLProgram(program1, [...gaussianImagesT, prunedExtremasT, radialPropertiesT],radialPropertiesT.dtype);
    const result2 = backend.runWebGLProgram(program2, [result1],radialPropertiesT.dtype);
    backend.disposeIntermediateTensorInfo(result1);
    return result2;
}

export const computeOrientationHistogramsConfig={
    kernelName: "ComputeOrientationHistograms",
    backendName: 'webgl',
    kernelFunc: computeOrientationHistograms,// as {} as KernelFunc,
}

