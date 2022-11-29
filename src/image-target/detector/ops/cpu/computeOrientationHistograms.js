const FakeShader = require('./fakeShader.js');
const oneOver2PI = 0.159154943091895;
const ORIENTATION_NUM_BINS = 36;



function clamp(n, min, max) {
    return Math.min(Math.max(min, n), max - 1);
}
const cache = {};
let badCount=0;
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
            if(octave==0){
                //console.log("Bad octave. FeatureIndex:",featureIndex," RadialIndex:",radialIndex," PropertyIndex:",propertyIndex," PreInt: ",this.getExtrema(featureIndex, 1));
                badCount++;
            }

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
                if(featureIndex==225&&radialIndex==21){
                    console.log("Weird numbers dy:",dy,"dx:",dx,"angle:",angle);
                }
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

/**
 * 
 * @param {Array<*>} gaussianImagesT 
 * @param {*} prunedExtremasT 
 * @param {*} radialPropertiesT 
 * @returns 
 */
function computeOrientationHistogramsImpl(gaussianImagesT, prunedExtremasT, radialPropertiesT, pyramidImagesLength) {

    const resultValues1 = new Float32Array(prunedExtremasT.height * radialPropertiesT.height * 2);
    //octaves map on the range of 1 -> pyramidImagesLength
    //but our gaussianImages are 0 indexed. So we insert a null ref at the beginning to offset it

    gaussianImagesT.unshift(null);
    function getPixel(octave, y, x) {

        const temp = gaussianImagesT[octave];
        //console.log("getPixel::",octave,y,x,temp);
        //if(temp==null) return 0;
        y = clamp(y, 0, temp.height);
        x = clamp(x, 0, temp.width);
        return temp.values[y * temp.width + x];
    }
    function getExtrema(y, x) {
        y = clamp(y, 0, prunedExtremasT.height);
        x = clamp(x, 0, prunedExtremasT.width);
        return prunedExtremasT.values[y * prunedExtremasT.width + x];
    }
    function getRadial(y, x) {
        y = clamp(y, 0, radialPropertiesT.height);
        x = clamp(x, 0, radialPropertiesT.width);
        return radialPropertiesT.values[y * radialPropertiesT.width + x];
    }
    function setOutput(z, y, x, o) {
        //prunedExtremasT.shape[0], radialPropertiesT.shape[0], 2
        resultValues1[(z * 2 * radialPropertiesT.height) + (y * 2) + x] = o;
    }
    /** replicated undefined behavior like you have on OpenGL */
    function atan(x, y) {
        if (x == 0 && y == 0) return 1.57;
        return Math.atan2(x, y);
    }
    //Program 1
    for (let featureIndex = 0; featureIndex < prunedExtremasT.height; featureIndex++) {
        for (let radialIndex = 0; radialIndex < radialPropertiesT.height; radialIndex++) {
            for (let propertyIndex = 0; propertyIndex < 2; propertyIndex++) {
                const radialY = Math.trunc(getRadial(radialIndex, 0));
                const radialX = Math.trunc(getRadial(radialIndex, 1));
                const radialW = getRadial(radialIndex, 2);

                const octave = Math.trunc(getExtrema(featureIndex, 1));
                //if(octave==0) console.log("Got zero octave for ",featureIndex,1);
                const y = Math.trunc(getExtrema(featureIndex, 2));
                const x = Math.trunc(getExtrema(featureIndex, 3));

                const xp = x + radialX;
                const yp = y + radialY;

                const dy = getPixel(octave, yp + 1, xp) - getPixel(octave, yp - 1, xp);
                const dx = getPixel(octave, yp, xp + 1) - getPixel(octave, yp, xp - 1);

                if (propertyIndex == 0) {
                    // be careful that atan(0, 0) gives 1.57 instead of 0 (different from js), but doesn't matter here, coz magnitude is 0

                    const angle = badAtan(dy, dx) + Math.PI;
                    const fbin = angle * ORIENTATION_NUM_BINS * oneOver2PI;
                    setOutput(featureIndex, radialIndex, propertyIndex, fbin);
                    continue;
                }

                if (propertyIndex == 1) {
                    const mag = Math.sqrt(dx * dx + dy * dy);
                    const magnitude = radialW * mag;
                    setOutput(featureIndex, radialIndex, propertyIndex, magnitude);
                    continue;
                }
            }
        }
    }

    const resultValues2 = new Float32Array(ORIENTATION_NUM_BINS * prunedExtremasT.height);
    function getFbinMag(z, y, x) {
        z = clamp(z, 0, prunedExtremasT.height);
        y = clamp(y, 0, radialPropertiesT.height.height);
        x = clamp(x, 0, 2);
        return resultValues1[z * radialPropertiesT.height * 2 + y * 2 + x];
    }
    function setOutput2(y, x, o) {
        resultValues2[y * ORIENTATION_NUM_BINS + x] = o;
    }
    function imod(x, y) {
        return x - y * Math.floor(x / y)
    }
    //program 2
    for (let featureIndex = 0; featureIndex < prunedExtremasT.height; featureIndex++) {
        for (let binIndex = 0; binIndex < ORIENTATION_NUM_BINS; binIndex++) {
            let sum = 0.0;
            for (let i = 0; i < radialPropertiesT.height; i++) {
                const fbin = getFbinMag(featureIndex, i, 0);
                const bin = Math.trunc(Math.floor(fbin - 0.5));
                const b1 = imod(bin + ORIENTATION_NUM_BINS, ORIENTATION_NUM_BINS);
                const b2 = imod(bin + 1 + ORIENTATION_NUM_BINS, ORIENTATION_NUM_BINS);

                if (b1 == binIndex || b2 == binIndex) {
                    const magnitude = getFbinMag(featureIndex, i, 1);
                    const w2 = fbin - bin - 0.5;
                    const w1 = w2 * -1.0 + 1.0;

                    if (b1 == binIndex) {
                        sum += w1 * magnitude;
                    }
                    if (b2 == binIndex) {
                        sum += w2 * magnitude;
                    }
                }
            }
            setOutput2(featureIndex, binIndex, sum);
        }
    }
    return resultValues2;
}

const computeOrientationHistograms = (args) => {
    const { gaussianImagesT, prunedExtremasT, radialPropertiesT, pyramidImagesLength } = args.inputs;
    /** @type {MathBackendCPU} */
    const backend = args.backend;
    const [program1,program2]=GetPrograms(prunedExtremasT, radialPropertiesT,pyramidImagesLength);
    
    const result1 = FakeShader.runCode(backend,program1, [...gaussianImagesT, prunedExtremasT, radialPropertiesT],radialPropertiesT.dtype);
    console.error("Bad octave count:",badCount,"/",(prunedExtremasT.shape[0]* radialPropertiesT.shape[0]* 2));
	return FakeShader.runCode(backend,program2, [result1],radialPropertiesT.dtype);

    /* const gaussianImagesTData = gaussianImagesT.map((tensorInfo) => { return { height: tensorInfo.shape[0], width: tensorInfo.shape[1], values: backend.data.get(tensorInfo.dataId).values, } });
    //console.log("computeOrientationHistograms::",gaussianImagesT,gaussianImagesTData);
    const prunedExtremasData = { values: backend.data.get(prunedExtremasT.dataId).values, height: prunedExtremasT.shape[0], width: prunedExtremasT.shape[1] };
    const radialPropertiesData = { values: backend.data.get(radialPropertiesT.dataId).values, height: radialPropertiesT.shape[0], width: radialPropertiesT.shape[1] }
    //const result1 = backend.runWebGLProgram(program1, [...gaussianImagesT, prunedExtremasT, radialPropertiesT],radialPropertiesT.dtype);
    //return backend.runWebGLProgram(program2, [result1],radialPropertiesT.dtype);

    const resultValues = computeOrientationHistogramsImpl(gaussianImagesTData, prunedExtremasData, radialPropertiesData, pyramidImagesLength);
    return backend.makeOutput(resultValues, [prunedExtremasT.shape[0], ORIENTATION_NUM_BINS], radialPropertiesT.dtype); */

}

const computeOrientationHistogramsConfig = {
    kernelName: "ComputeOrientationHistograms",
    backendName: 'cpu',
    kernelFunc: computeOrientationHistograms,// as {} as KernelFunc,
}

module.exports = {
    computeOrientationHistograms,
    computeOrientationHistogramsConfig,
    computeOrientationHistogramsImpl,
    computeOrientationHistogramsPrograms:GetPrograms
}