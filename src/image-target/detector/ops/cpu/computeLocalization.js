const {TypedArray,KernelConfig} = require('@tensorflow/tfjs-core');
const {MathBackendCPU} =require('@tensorflow/tfjs-backend-cpu');

/*
let dogSubCodes = `float getPixel(int octave, int y, int x) {`;
      for (let i = 1; i < dogPyramidImagesT.length; i++) {  // extrema starts from second octave
	dogVariableNames.push('image' + i);
	dogSubCodes += `
	  if (octave == ${i}) {
	    return getImage${i}(y, x);
	  }

      getImage3(x,y)
 	`;

const kernel = {
	variableNames: [...dogVariableNames, 'extrema'],
	outputShape: [prunedExtremasList.length, 3, 3], // 3x3 pixels around the extrema
	userCode: `
	  ${dogSubCodes}

	  void main() {
	    ivec3 coords = getOutputCoords();
	    int featureIndex = coords[0];
	    float score = getExtrema(featureIndex, 0);
	    if (score == 0.0) {
	      return;
	    }

	    int dy = coords[1]-1;
	    int dx = coords[2]-1;
	    int octave = int(getExtrema(featureIndex, 1));
	    int y = int(getExtrema(featureIndex, 2));
	    int x = int(getExtrema(featureIndex, 3));
	    setOutput(getPixel(octave, y+dy, x+dx));
	  }
	`
      }

*/

function computeLocalizationImpl(images){

    function getPixel(octave, y, x) {
        return images[octave][y][x];
    }
}

const computeLocalization=(args)=>{
     /** @type {import('@tensorflow/tfjs').TensorInfo} */
     const x = args.inputs.x;
     /** @type {MathBackendCPU} */
     const cpuBackend = args.backend;


     /** @type {TypedArray} */
    const values = cpuBackend.data.get(x.dataId).values;
    
    
}

const computeLocalizationConfig = {//: KernelConfig
    kernelName: "ComputeLocalization",
    backendName: 'cpu',
    kernelFunc: computeLocalization,// as {} as KernelFunc,
};

module.exports={
    computeLocalizationConfig,
    computeLocalization,
    computeLocalizationImpl
}