import { FREAKPOINTS } from '../../freak.js'

const FREAK_EXPANSION_FACTOR = 7.0;
const cache = {};
function GetProgram(imageCount, prunedExtremas) {
    const key = `${imageCount}|${prunedExtremas.shape[0]}`;
    if (!cache.hasOwnProperty(key)) {
		const imageVariableNames = [];
		for (let i = 1; i < imageCount; i++) {
			imageVariableNames.push('image' + i);
		}

		let pixelsSubCodes = `float getPixel(int octave, int y, int x) {`;
		for (let i = 1; i < imageCount; i++) {
			pixelsSubCodes += `
  if (octave == ${i}) {
	return getImage${i}(y, x);
  }
`
		}
		pixelsSubCodes += `}`;

		const kernel = {
			variableNames: [...imageVariableNames, 'extrema', 'angles', 'freakPoints'],
			outputShape: [prunedExtremas.shape[0], FREAKPOINTS.length],
			userCode: `
  ${pixelsSubCodes}
  void main() {
	ivec2 coords = getOutputCoords();
	int featureIndex = coords[0];
	int freakIndex = coords[1];

	float freakSigma = getFreakPoints(freakIndex, 0);
	float freakX = getFreakPoints(freakIndex, 1);
	float freakY = getFreakPoints(freakIndex, 2);

	int octave = int(getExtrema(featureIndex, 1));
	float inputY = getExtrema(featureIndex, 2);
	float inputX = getExtrema(featureIndex, 3);
	float inputAngle = getAngles(featureIndex);
	float cos = ${FREAK_EXPANSION_FACTOR}. * cos(inputAngle);
	float sin = ${FREAK_EXPANSION_FACTOR}. * sin(inputAngle);

	float yp = inputY + freakX * sin + freakY * cos;
	float xp = inputX + freakX * cos + freakY * -sin;

	int x0 = int(floor(xp));
	int x1 = x0 + 1;
	int y0 = int(floor(yp));
	int y1 = y0 + 1;

	float f1 = getPixel(octave, y0, x0);
	float f2 = getPixel(octave, y0, x1);
	float f3 = getPixel(octave, y1, x0);
	float f4 = getPixel(octave, y1, x1);

	float x1f = float(x1);
	float y1f = float(y1);
	float x0f = float(x0);
	float y0f = float(y0);

	// ratio for interpolation between four neighbouring points
	float value = (x1f - xp) * (y1f - yp) * f1
		+ (xp - x0f) * (y1f - yp) * f2
		+ (x1f - xp) * (yp - y0f) * f3
		+ (xp - x0f) * (yp - y0f) * f4;

	setOutput(value);
  }
`
		}

		cache[key] = kernel;
	}

    return cache[key];
}

export const computeExtremaFreak = (args) => {
    /** @type {import('@tensorflow/tfjs').TensorInfo} */
    const { gaussianImagesT, prunedExtremas, prunedExtremasAngles, freakPointsT,pyramidImagesLength } = args.inputs;
    /** @type {MathBackendWebGL} */
    const backend = args.backend;

    const program = GetProgram(pyramidImagesLength, prunedExtremas);

    return backend.runWebGLProgram(program, [...gaussianImagesT, prunedExtremas, prunedExtremasAngles, freakPointsT], 'float32');
}

export const computeExtremaFreakConfig = {//: KernelConfig
    kernelName: "ComputeExtremaFreak",
    backendName: 'webgl',
    kernelFunc: computeExtremaFreak,// as {} as KernelFunc,
};

