const packKernel = (image) => {
  //const imageHeight = image.shape[0];
  const imageHeight = 10;
  const imageWidth = image.shape[1];

  const kernel = {
    variableNames: ['p'],
    outputShape: [imageHeight],
    packedOutput: true,
    userCode: `
      void main() {
	int coords = getOutputCoords();
	//setOutput(float(coords));
	setOutput(vec4(1,0,0,0));
      }
    `
  };

  const dummyKernel = {
    variableNames: ['a'],
    outputShape: [imageHeight],
    packedInputs: true,
    userCode: `
      void main() {
	int coords = getOutputCoords();

	int texNumC = 10;
	int texNumR = 1;
	int texelIndex = coords;
	int texR = texelIndex / texNumC;
	int texC = texelIndex - texR * texNumC;
	vec2 uv = (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);

	vec4 values = texture(a, vec2(0.3, 0.1));
	//vec4 values = texture(a, uv);
	//vec4 values = texture(a, resultUV);
	setOutput(values.r);

	//setOutput(getA(coords).r);
	//setOutput(getAAtOuttCoords().r);
      }

    `
  }

  return tf.tidy(() => {
    //const resultDummy = runWebGLProgram(dummyKernel, [image], 'int32');
    //const result = compileAndRun(kernel1, [resultDummy]);
    //return result;
    
    const out1 = tf.backend().runWebGLProgram(kernel, [image], 'int32');
    const out2 = tf.backend().runWebGLProgram(dummyKernel, [out1], 'int32');
    const result = tf.engine().makeTensorFromDataId(out1.dataId, out1.shape, out1.dtype);
    const result2 = tf.engine().makeTensorFromDataId(out2.dataId, out2.shape, out2.dtype);

    console.log("test pack", result, result.arraySync());
    console.log("test pack", result2, result2.arraySync());

    return result;
  });
}
