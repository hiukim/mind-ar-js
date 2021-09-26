const loadImageToTensor2 = (canvas) => {
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
	vec4 values = ${textureMethod}(A, resultUV);
	float res = (0.299 * values.r + 0.587 * values.g + 0.114 * values.b) * 255.0;
	setOutput(res);
      }
    `
  }

  if (!caches.loadImageToTensor2) {
    const tempPixelHandle = backend.makeTensorInfo(texShape, 'int32');
    backend.gpgpu.uploadPixelDataToTexture(backend.getTexture(tempPixelHandle.dataId), canvas);
    backend.texData.get(tempPixelHandle.dataId).usage = 2;

    caches.loadImageToTensor2 = {
      tempPixelHandle
    }
  }

  const {tempPixelHandle} = caches.loadImageToTensor2;

  const inputs = [tempPixelHandle];

  const outInfo = tf.backend().compileAndRun(program, inputs);
  const res = tf.engine().makeTensorFromDataId(outInfo.dataId, outInfo.shape, outInfo.dtype);

  return res;
}

