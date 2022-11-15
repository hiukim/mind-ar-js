const tf = require('@tensorflow/tfjs');

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

function computeLocalizationImpl(images, extrema) {
	const resultValues=new Float32Array(extrema.height*3*3);
	function getPixel(octave, y, x) {
        const temp = images[octave - 1];
        return temp.values[y * temp.width + x];
    }
	function getExtrema(y, x) {
		return extrema.values[y * extrema.width + x];
	}
	function setOutput(z, y, x, o) {
		//(z * xMax * yMax) + (y * xMax) + x;
		resultValues[z*3*3+y*3+x]=o;
	}

	for (let featureIndex = 0; featureIndex < extrema.height; featureIndex++) {
		for (let y = 0; y < 3; y++) {
			for (let x = 0; x < 3; x++) {
				const score = getExtrema(featureIndex, 0);
				if (score == 0.0) continue;
				const dy = y - 1;
				const dx = x - 1;
				const octave = Math.trunc(getExtrema(featureIndex, 1));
				const y = Math.trunc(getExtrema(featureIndex, 2));
				const x = Math.trunc(getExtrema(featureIndex, 3));
				setOutput(featureIndex,y,x, getPixel(octave, y + dy, x + dx));
			}
		}
	}

	return resultValues;
}

const computeLocalization = (args) => {
	/** @type {import('@tensorflow/tfjs').TensorInfo} */
	const { prunedExtremasList, dogPyramidImagesT } = args.inputs;
	/** @type {MathBackendCPU} */
	const backend = args.backend;
	const prunedExtremasT = tf.tensor(prunedExtremasList, [prunedExtremasList.length, prunedExtremasList[0].length], 'int32');

	const dogPyramidImagesTData = dogPyramidImagesT.map((tensorInfo) => { return { height: tensorInfo.shape[0], width: tensorInfo.shape[1], values: backend.data.get(tensorInfo.dataId).values, } });
	const prunedExtremasData = { values: backend.data.get(prunedExtremasT.dataId).values, height: prunedExtremasT.shape[0], width: prunedExtremasT.shape[1] };
	const resultValues=computeLocalizationImpl(dogPyramidImagesTData, prunedExtremasData)

	return backend.makeOutput(resultValues, [prunedExtremasData.height, 3,3], dogPyramidImagesT[0].dtype);
}

const computeLocalizationConfig = {//: KernelConfig
	kernelName: "ComputeLocalization",
	backendName: 'cpu',
	kernelFunc: computeLocalization,// as {} as KernelFunc,
};

module.exports = {
	computeLocalizationConfig,
	computeLocalization,
	computeLocalizationImpl
}