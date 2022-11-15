
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

const downsampleBilinearImpl=(vals,width,height)=>{
    const w=Math.floor(width/2);
    const h=Math.floor(height/2);
    const resultValues = new Float32Array(w*h);
    function getP(x,y){
        return vals[y*width+x];
    }
    function setOutput(x,y,o){
        resultValues[y*width+x]=o;
    }
    for(let x=0;x<w;x++){
        for(let y=0;y<h;y++){
            const x2=x*2;
            const y2=y*2;
            let sum = getP(x2,y2) * 0.25;
            sum += getP(x2+1,y2) * 0.25; 
            sum += getP(x2, y2+1) * 0.25; 
            sum += getP(x2+1,y2+1) * 0.25;
            setOutput(x,y,sum);
        }
    }
    return resultValues;
}

const downsampleBilinear =(args)=>{
    /** @type {import('@tensorflow/tfjs').TensorInfo} */
    const x = args.inputs.image;
    /** @type {MathBackendCPU} */
    const cpuBackend = args.backend;
    const imageHeight = x.shape[0];
    const imageWidth = x.shape[1];
    /** @type {TypedArray} */
    const values = cpuBackend.data.get(x.dataId).values;

    const resultValues = downsampleBilinearImpl(values,imageWidth,imageHeight);

    return cpuBackend.makeOutput(resultValues, [Math.floor(imageHeight/2), Math.floor(imageWidth/2)], 'float32');
}

const downsampleBilinearConfig = {//: KernelConfig
    kernelName: "DownsampleBilinear",
    backendName: 'cpu',
    kernelFunc: downsampleBilinear,// as {} as KernelFunc,
};

module.exports={
    downsampleBilinearConfig,
    downsampleBilinear,
    downsampleBilinearImpl
}