const applyFilter = (image) => {
  const imageHeight = image.shape[0];
  const imageWidth = image.shape[1];

    const imaxmin = `
      int imax(int a, int b) {
	if (a > b) return a;
	return b;
      }
      int imin(int a, int b) {
	if (a < b) return a;
	return b;
      }

    `
    const kernel1 = {
      variableNames: ['p'],
      outputShape: [imageHeight, imageWidth],
      userCode: `
	${imaxmin}
	void main() {
	  ivec2 coords = getOutputCoords();

	  float sum = getP(coords[0], imax(0, coords[1]-2));
	  sum += getP(coords[0], imax(0, coords[1]-1)) * 4.;
	  sum += getP(coords[0], coords[1]) * 6.;
	  sum += getP(coords[0], imin(${imageWidth}-1, coords[1]+1)) * 4.;
	  sum += getP(coords[0], imin(${imageWidth}-1, coords[1]+2));
	  setOutput(sum);

	}
      `
    };

    const kernel2 = {
      variableNames: ['p'],
      outputShape: [imageHeight, imageWidth],
      userCode: `
	${imaxmin}
	void main() {
	  ivec2 coords = getOutputCoords();

	  float sum = getP(imax(coords[0]-2, 0), coords[1]);
	  sum += getP(imax(coords[0]-1, 0), coords[1]) * 4.;
	  sum += getP(coords[0], coords[1]) * 6.;
	  sum += getP(imin(coords[0]+1, ${imageHeight}-1), coords[1]) * 4.;
	  sum += getP(imin(coords[0]+2, ${imageHeight}-1), coords[1]);
	  sum /= 256.;
	  setOutput(sum);
	}
      `
    };

  return tf.tidy(() => {
    const result1 = runWebGLProgram(kernel1, [image], 'float32');
    const result2 = runWebGLProgram(kernel2, [result1], 'float32');
    return result2;
  });
}
