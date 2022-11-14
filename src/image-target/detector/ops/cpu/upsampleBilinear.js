const {TypedArray,KernelConfig} = require('@tensorflow/tfjs-core');
const {MathBackendCPU} =require('@tensorflow/tfjs-backend-cpu');

/*
const kernel = {
	variableNames: ['p'],
	outputShape: [targetImage.shape[0], targetImage.shape[1]],
	userCode: `
	  void main() {
	    ivec2 coords = getOutputCoords();
	    int j = coords[0];
	    int i = coords[1];

	    float sj = 0.5 * float(j) - 0.25; 
	    float si = 0.5 * float(i) - 0.25;

	    float sj0 = floor(sj);
	    float sj1 = ceil(sj);
	    float si0 = floor(si);
	    float si1 = ceil(si);

	    int sj0I = int(sj0);
	    int sj1I = int(sj1);
	    int si0I = int(si0);
	    int si1I = int(si1);

	    float sum = 0.0;
	    sum += getP(sj0I, si0I) * (si1 - si) * (sj1 - sj);
	    sum += getP(sj1I, si0I) * (si1 - si) * (sj - sj0);
	    sum += getP(sj0I, si1I) * (si - si0) * (sj1 - sj);
	    sum += getP(sj1I, si1I) * (si - si0) * (sj - sj0);
	    setOutput(sum);
	  }
	`
      };
*/
/**
 * 
 * @param {TypedArray} vals 
 * @param {*} width 
 * @param {*} height 
 * @param {*} targetWidth 
 * @param {*} targetHeight 
 * @returns 
 */
const upsampleBilinearImpl=(vals,width,height,targetWidth,targetHeight)=>{
    
    const resultValues = new Float32Array(targetWidth*targetHeight);
    function getP(x,y){
        return vals[y*width+x];
    }
    function setOutput(x,y,o){
        resultValues[y*targetWidth+x]=o;
    }
    for(let j=0;j<targetWidth;j++){
        for(let i=0;i<targetHeight;i++){
            
            

            const sj = 0.5 * j - 0.25; 
            const si = 0.5 * i - 0.25;

            const sj0 = Math.floor(sj);
            const sj1 = Math.ceil(sj);
            const si0 = Math.floor(si);
            const si1 = Math.ceil(si);

            const sj0I = Math.trunc(sj0);
            const sj1I = Math.trunc(sj1);
            const si0I = Math.trunc(si0);
            const si1I = Math.trunc(si1);

            let sum = 0.0;
            sum += getP(sj0I, si0I) * (si1 - si) * (sj1 - sj);
            sum += getP(sj1I, si0I) * (si1 - si) * (sj - sj0);
            sum += getP(sj0I, si1I) * (si - si0) * (sj1 - sj);
            sum += getP(sj1I, si1I) * (si - si0) * (sj - sj0);
            //setOutput(sum);

            setOutput(j,i,sum);
        }
    }
    return resultValues;
}

const upsampleBilinear =(args)=>{
    /** @type {import('@tensorflow/tfjs').TensorInfo} */
    const x = args.inputs.x;
    const targetHeight=args.inputs.height;
    const targetWidth=args.inputs.width;
    
    /** @type {MathBackendCPU} */
    const cpuBackend = args.backend;
    const imageHeight = x.shape[0];
    const imageWidth = x.shape[1];
    /** @type {TypedArray} */
    const values = cpuBackend.data.get(x.dataId).values;

    const resultValues = upsampleBilinearImpl(values,imageWidth,imageHeight,targetWidth,targetHeight);

    return cpuBackend.makeOutput(resultValues, [targetHeight, targetWidth], 'float32');
}

const upsampleBilinearConfig = {//: KernelConfig
    kernelName: "UpsampleBilinear",
    backendName: 'cpu',
    kernelFunc: upsampleBilinear,// as {} as KernelFunc,
};

module.exports={
    upsampleBilinearConfig,
    upsampleBilinear,
    upsampleBilinearImpl
}