
const oneOver2PI = 0.159154943091895;
const ORIENTATION_NUM_BINS = 36;



function computeOrientationHistogramsImpl(gaussianImagesT, prunedExtremasT, radialPropertiesT) {

    const resultValues1 = new Float32Array(prunedExtremasT.height * radialPropertiesT.height * 2);
    function getPixel(octave, y, x) {
        const temp = gaussianImagesT[octave];
        //console.log("getPixel::",octave,y,x,temp);
        return temp.values[y * temp.width + x];
    }
    function getExtrema(y, x) {
        return prunedExtremasT.values[y*prunedExtremasT.width+x];
    }
    function getRadial(y, x) {
        return radialPropertiesT.values[y*radialPropertiesT.width+x];
    }
    function setOutput(z, y, x, o) {
        //prunedExtremasT.shape[0], radialPropertiesT.shape[0], 2
        resultValues1[(z * prunedExtremasT.height * radialPropertiesT.height) + (y * radialPropertiesT.height) + x] = o;
    }
    //Program 1
    for (let featureIndex = 0; featureIndex <prunedExtremasT.height; featureIndex++) {
        for (let radialIndex = 0; radialIndex <radialPropertiesT.height; radialIndex++) {
            for (let propertyIndex = 0; propertyIndex <2; propertyIndex++) {
                const radialY = Math.trunc(getRadial(radialIndex, 0));
                const radialX = Math.trunc(getRadial(radialIndex, 1));
                const radialW = getRadial(radialIndex, 2);

                const octave = Math.trunc(getExtrema(featureIndex, 1));
                const y = Math.trunc(getExtrema(featureIndex, 2));
                const x = Math.trunc(getExtrema(featureIndex, 3));

                const xp = x + radialX;
                const yp = y + radialY;

                const dy = getPixel(octave, yp + 1, xp) - getPixel(octave, yp - 1, xp);
                const dx = getPixel(octave, yp, xp + 1) - getPixel(octave, yp, xp - 1);

                if (propertyIndex == 0) {
                    // be careful that atan(0, 0) gives 1.57 instead of 0 (different from js), but doesn't matter here, coz magnitude is 0

                    const angle = Math.atan(dy, dx) + Math.PI;
                    const fbin = angle * ORIENTATION_NUM_BINS * oneOver2PI;
                    setOutput(featureIndex,radialIndex,propertyIndex,fbin);
                    continue;
                }

                if (propertyIndex == 1) {
                    const mag = Math.sqrt(dx * dx + dy * dy);
                    const magnitude = radialW * mag;
                    setOutput(featureIndex,radialIndex,propertyIndex,magnitude);
                    continue;
                }
            }
        }
    }

    const resultValues2= new Float32Array(ORIENTATION_NUM_BINS*prunedExtremasT.height);
    function getFbinMag(z,y,x){
        return resultValues1[z*radialPropertiesT.height*2+y*2+x];
    }
    function setOutput2(y,x,o){
        resultValues2[y*ORIENTATION_NUM_BINS+x]=o;
    }
    function imod(x,y){
        return x - y * Math.floor(x/y)
    }
    //program 2
    for(let featureIndex=0;featureIndex<prunedExtremasT.height;featureIndex++){
        for(let binIndex=0;binIndex<ORIENTATION_NUM_BINS;binIndex++){
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
                setOutput2(featureIndex,binIndex,sum);
        }
    }
    return resultValues2;
}

const computeOrientationHistograms = (args) => {
    const { gaussianImagesT, prunedExtremasT, radialPropertiesT } = args.inputs;
    /** @type {MathBackendCPU} */
    const backend = args.backend;
    //const [program1,program2]=GetPrograms(gaussianImagesT, prunedExtremasT, radialPropertiesT);
    
    const gaussianImagesTData = gaussianImagesT.map((tensorInfo) => { return { height: tensorInfo.shape[0], width: tensorInfo.shape[1], values: backend.data.get(tensorInfo.dataId).values, } });
    //console.log("computeOrientationHistograms::",gaussianImagesT,gaussianImagesTData);
    const prunedExtremasData = {values:backend.data.get(prunedExtremasT.dataId).values,height:prunedExtremasT.shape[0],width:prunedExtremasT.shape[1]};
    const radialPropertiesData={values:backend.data.get(radialPropertiesT.dataId).values,height:radialPropertiesT.shape[0],width:radialPropertiesT.shape[1]}
    //const result1 = backend.runWebGLProgram(program1, [...gaussianImagesT, prunedExtremasT, radialPropertiesT],radialPropertiesT.dtype);
    //return backend.runWebGLProgram(program2, [result1],radialPropertiesT.dtype);

    const resultValues=computeOrientationHistogramsImpl(gaussianImagesTData,prunedExtremasData,radialPropertiesData);
    return backend.makeOutput(resultValues, [prunedExtremasT.shape[0], ORIENTATION_NUM_BINS], radialPropertiesT.dtype);
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
}