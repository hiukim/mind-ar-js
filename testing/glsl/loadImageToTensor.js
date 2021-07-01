const loadImageToTensor = (canvas) => {
  const width = canvas.width;
  const height = canvas.height;
  const backend = tf.backend();

  const texShape = [height, width];

  const textureMethod = tf.env().getNumber('WEBGL_VERSION') === 2? 'texture': 'texture2D';
  const program = {
    variableNames: ['A'],
    outputShape: texShape,
    userCode:`
      void main() {
	ivec2 coords = getOutputCoords();
	int texR = coords[0];
	int texC = coords[1];

	vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${width}.0, ${height}.0);
	vec4 values = ${textureMethod}(A, uv);
	float res = (values.r + values.g + values.b) * 255.0 / 3.0;

	setOutput(res);
      }
    `
  }

  if (!caches.loadImageToTensor) {
    const tempPixelHandle = backend.makeTensorInfo(texShape, 'int32');
    backend.gpgpu.uploadPixelDataToTexture(backend.getTexture(tempPixelHandle.dataId), canvas);
    backend.texData.get(tempPixelHandle.dataId).usage = 2;

    caches.loadImageToTensor = {
      tempPixelHandle
    }
  }

  const {tempPixelHandle} = caches.loadImageToTensor;

  const inputs = [tempPixelHandle];

  const result = runWebGLProgram(program, inputs, 'int32');
  return result;

  //const outInfo = tf.backend().compileAndRun(program, inputs);
  //const res = tf.engine().makeTensorFromDataId(outInfo.dataId, outInfo.shape, outInfo.dtype);
  //return res;
}
