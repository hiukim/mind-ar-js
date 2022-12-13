import {tensor} from '@tensorflow/tfjs'

const cache={};
function GetProgram(numDogPyramidImages,extremasListLength){
	const kernelKey=`${numDogPyramidImages}|${extremasListLength}`;
	if(!cache.hasOwnProperty(kernelKey)){
		const dogVariableNames = [];
		let dogSubCodes = `float getPixel(int octave, int y, int x) {`;
		for (let i = 1; i < numDogPyramidImages; i++) {  // extrema starts from second octave
			dogVariableNames.push('image' + i);
			dogSubCodes += `
				if (octave == ${i}) {
					return getImage${i}(y, x);
				}
			`;
		}
		dogSubCodes += `}`;

		cache[kernelKey] = {
			variableNames: [...dogVariableNames, 'extrema'],
			outputShape: [extremasListLength, 3, 3], // 3x3 pixels around the extrema
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
		};
	}
	return cache[kernelKey];
}

export const computeLocalization=(args)=>{
	/** @type {import('@tensorflow/tfjs').TensorInfo} */
	const {prunedExtremasList, dogPyramidImagesT} = args.inputs;
	/** @type {MathBackendWebGL} */
	const backend = args.backend;
	const program = GetProgram(dogPyramidImagesT.length,prunedExtremasList.length);
	const prunedExtremasT = tensor(prunedExtremasList, [prunedExtremasList.length, prunedExtremasList[0].length], 'int32');
	return backend.runWebGLProgram(program, [...dogPyramidImagesT.slice(1), prunedExtremasT],dogPyramidImagesT[0].dtype);
	 
}

export const computeLocalizationConfig = {//: KernelConfig
    kernelName: "ComputeLocalization",
    backendName: 'webgl',
    kernelFunc: computeLocalization,// as {} as KernelFunc,
};

