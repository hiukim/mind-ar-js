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
const int = Math.trunc;
function clamp(n, min, max) {
    return Math.min(Math.max(min, n), max-1);
}

function computeLocalizationImpl(images, extrema) {
	const resultValues = new Float32Array(extrema.height * 3 * 3);
	//so normally we would unshift since we're 0 indexed and octaves start at 1.
	//however we never sliced out the first element, so we should be fine?
	function getPixel(octave, y, x) {
		const temp = images[octave];
		y=clamp(y,0,temp.height);
		x=clamp(x,0,temp.width);
		return temp.values[y * temp.width + x];
	}
	function getExtrema(y, x) {
		y=clamp(y,0,extrema.height);
		x=clamp(x,0,extrema.width);
		return extrema.values[y * extrema.width + x];
	}
	function setOutput(z, y, x, o) {
		//(z * xMax * yMax) + (y * xMax) + x;
		resultValues[z * 3 * 3 + y * 3 + x] = o;
	}
	
	for (let _featureIndex = 0; _featureIndex < extrema.height; _featureIndex++) {
		for (let _y = 0; _y < 3; _y++) {
			for (let _x = 0; _x < 3; _x++) {
				const coords = [_featureIndex, _y, _x];
				const featureIndex = coords[0];
				const score = getExtrema(featureIndex, 0);
				if (score == 0.0) {
					continue;
				}

				const dy = coords[1] - 1;
				const dx = coords[2] - 1;
				const octave = int(getExtrema(featureIndex, 1));
				const y = int(getExtrema(featureIndex, 2));
				const x = int(getExtrema(featureIndex, 3));
				setOutput(_featureIndex, _y, _x, getPixel(octave, y + dy, x + dx));
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
	const resultValues = computeLocalizationImpl(dogPyramidImagesTData, prunedExtremasData)

	return backend.makeOutput(resultValues, [prunedExtremasData.height, 3, 3], dogPyramidImagesT[0].dtype);
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