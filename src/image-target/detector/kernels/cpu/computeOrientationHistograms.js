import * as FakeShader from './fakeShader.js';
const oneOver2PI = 0.159154943091895;
const ORIENTATION_NUM_BINS = 36;



const cache = {};
function GetPrograms(prunedExtremasT, radialPropertiesT, pyramidImagesLength) {
    const key = `${pyramidImagesLength}|${prunedExtremasT.shape[0]}|${radialPropertiesT.shape[0]}`;
    //if (!cache.hasOwnProperty(key)) {
    const imageVariableNames = [];
    for (let i = 1; i < pyramidImagesLength; i++) {
        imageVariableNames.push('image' + i);
    }

   /*  let kernel1SubCodes = `float getPixel(int octave, int y, int x) {`;
    for (let i = 1; i < pyramidImagesLength; i++) {
        kernel1SubCodes += `
              if (octave == ${i}) {
                  return getImage${i}(y, x);
              }
              `;
    }
    kernel1SubCodes += `}`; */

    const kernel1 = {
        variableNames: [...imageVariableNames, 'extrema', 'radial'],
        outputShape: [prunedExtremasT.shape[0], radialPropertiesT.shape[0], 2], // last dimension: [fbin, magnitude]
        userCode: function () {
            //${ kernel1SubCodes }
            const getPixel=(octave, y, x) =>{
                const k='getImage'+octave
                if(!this.hasOwnProperty(k)){
                    //console.error(`ComputeOrientationHistograms:: ${k} does not exist! y:${y} x:${x}`);
                    return 0.0;
                }
                return this[k](y, x);
            }
            /** replicated undefined behavior like you have on OpenGL */
            function atan(x, y) {
                if (x == 0 && y == 0) return 1.57;
                return Math.atan2(x, y);
            }
            //void main() {
            const coords = this.getOutputCoords();
            const featureIndex = coords[0];
            const radialIndex = coords[1];
            const propertyIndex = coords[2];

            const radialY = this.int(this.getRadial(radialIndex, 0));
            const radialX = this.int(this.getRadial(radialIndex, 1));
            const radialW = this.getRadial(radialIndex, 2);

            const octave = this.int(this.getExtrema(featureIndex, 1));
            const y = this.int(this.getExtrema(featureIndex, 2));
            const x = this.int(this.getExtrema(featureIndex, 3));

            const xp = x + radialX;
            const yp = y + radialY;

            const dy = getPixel(octave, yp + 1, xp) - getPixel(octave, yp - 1, xp);
            const dx = getPixel(octave, yp, xp + 1) - getPixel(octave, yp, xp - 1);
            
            if (propertyIndex == 0) {
                // be careful that atan(0, 0) gives 1.57 instead of 0 (different from js), but doesn't matter here, coz magnitude is 0

                const angle = this.atan(dy, dx) + Math.PI;
                const fbin = angle * ORIENTATION_NUM_BINS * oneOver2PI;
                this.setOutput(fbin);
                return;
            }

            if (propertyIndex == 1) {
                const mag = Math.sqrt(dx * dx + dy * dy);
                const magnitude = radialW * mag;
                this.setOutput(magnitude);
                return;
            }
            // }

        }
    }

    const kernel2 = {
        variableNames: ['fbinMag'],
        outputShape: [prunedExtremasT.shape[0], ORIENTATION_NUM_BINS],
        userCode:
            function () {

                function imod(x, y) {
                    return Math.trunc(x - y * Math.floor(x / y));
                }

                const coords = this.getOutputCoords();
                const featureIndex = coords[0];
                const binIndex = coords[1];

                let sum = 0.;
                for (let i = 0; i < radialPropertiesT.shape[0]; i++) {
                    const fbin = this.getFbinMag(featureIndex, i, 0);
                    const bin = Math.trunc(Math.floor(fbin - 0.5));
                    const b1 = imod(bin + ORIENTATION_NUM_BINS, ORIENTATION_NUM_BINS);
                    const b2 = imod(bin + 1 + ORIENTATION_NUM_BINS, ORIENTATION_NUM_BINS);

                    if (b1 == binIndex || b2 == binIndex) {
                        const magnitude = this.getFbinMag(featureIndex, i, 1);
                        const w2 = fbin - bin - 0.5;
                        const w1 = w2 * -1. + 1.;

                        if (b1 == binIndex) {
                            sum += w1 * magnitude;
                        }
                        if (b2 == binIndex) {
                            sum += w2 * magnitude;
                        }
                    }
                }
                this.setOutput(sum);
            }

    }

    return [kernel1, kernel2];
    //}
    //return cache[key];
}

export const computeOrientationHistograms = (args) => {
    const { gaussianImagesT, prunedExtremasT, radialPropertiesT, pyramidImagesLength } = args.inputs;
    /** @type {MathBackendCPU} */
    const backend = args.backend;
    const [program1,program2]=GetPrograms(prunedExtremasT, radialPropertiesT,pyramidImagesLength);
    
    const result1 = FakeShader.runCode(backend,program1, [...gaussianImagesT, prunedExtremasT, radialPropertiesT],radialPropertiesT.dtype);
	return FakeShader.runCode(backend,program2, [result1],radialPropertiesT.dtype);
}

export const computeOrientationHistogramsConfig = {
    kernelName: "ComputeOrientationHistograms",
    backendName: 'cpu',
    kernelFunc: computeOrientationHistograms,// as {} as KernelFunc,
}

