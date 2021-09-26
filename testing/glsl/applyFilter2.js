const applyFilter2 = (image) => {
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
	  float sum = getP(coords[0], coords[1]-1) * 0.25;
	  sum += getP(coords[0], coords[1]) * 0.5;
	  sum += getP(coords[0], coords[1]+1) * 0.25;
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
	  float sum = getP(coords[0]-1, coords[1]) * 0.25;
	  sum += getP(coords[0], coords[1]) * 0.5;
	  sum += getP(coords[0]+1, coords[1]) * 0.25;
	  setOutput(sum);
	}
      `
    };

  const textureMethod = tf.env().getNumber('WEBGL_VERSION') === 2? 'texture': 'texture2D';

  const dummyKernel = {
    variableNames: ['p'],
    outputShape: [imageHeight, imageWidth],
    packedOutput: true,
    userCode: `
      void main() {
	ivec2 coords = getOutputCoords();

	vec4 values = ${textureMethod}(p, resultUV);
	vec4 v = vec4(getP(coords[0], coords[1]), 0, 0, 0);
	setOutput(v);
      }
    `
  }

  return tf.tidy(() => {
    //const resultDummy = runWebGLProgram(dummyKernel, [image], 'int32');
    //const result = compileAndRun(kernel1, [resultDummy]);
    //return result;
    
    const out1 = tf.backend().runWebGLProgram(kernel1, [image], 'float32');
    const out2 = tf.backend().runWebGLProgram(kernel2, [out1], 'float32');
    tf.backend().disposeIntermediateTensorInfo(out1);
    return tf.engine().makeTensorFromDataId(out2.dataId, out2.shape, out2.dtype);

    const result1 = compileAndRun(kernel1, [image]);
    return result1;
    const result2 = compileAndRun(kernel2, [result1]);
    return result2;
  });
}
