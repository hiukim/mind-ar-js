const tf = require('@tensorflow/tfjs');

// More efficient implementation for tf.browser.fromPixels
//   original implementation: /node_modules/@tensorflow/tfjs-backend-webgl/src/kernels/FromPixels.ts
// 
// This implementation return grey scale instead of RGBA in the orignal implementation 

class InputLoader {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.texShape = [height, width];

    const context = document.createElement('canvas').getContext('2d');
    context.canvas.width = width;
    context.canvas.height = height;
    this.context = context;

    this.program = this.buildProgram(width, height);

    const backend = tf.backend();
    //this.tempPixelHandle = backend.makeTensorInfo(this.texShape, 'int32');
    this.tempPixelHandle = backend.makeTensorInfo(this.texShape, 'float32');
    // warning!!!
    // usage type should be TextureUsage.PIXELS, but tfjs didn't export this enum type, so we hard-coded 2 here 
    //   i.e. backend.texData.get(tempPixelHandle.dataId).usage = TextureUsage.PIXELS;
    backend.texData.get(this.tempPixelHandle.dataId).usage = 2;
  }

  // old method
  _loadInput(input) {
    return tf.tidy(() => {
      let inputImage = tf.browser.fromPixels(input);
      inputImage = inputImage.mean(2);
      return inputImage;
    });
  }

  // input is instance of HTMLVideoElement or HTMLImageElement
  loadInput(input) {
    this.context.drawImage(input, 0, 0, this.width, this.height);

    const backend = tf.backend();
    backend.gpgpu.uploadPixelDataToTexture(backend.getTexture(this.tempPixelHandle.dataId), this.context.canvas);

    //const res = backend.compileAndRun(this.program, [this.tempPixelHandle]);
    const res = this._compileAndRun(this.program, [this.tempPixelHandle]);
    //const res = this._runWebGLProgram(this.program, [this.tempPixelHandle], 'float32');
    //backend.disposeData(tempPixelHandle.dataId);
    return res;
  }

  buildProgram(width, height) {
    const textureMethod = tf.env().getNumber('WEBGL_VERSION') === 2? 'texture': 'texture2D';

    const program = {
      variableNames: ['A'],
      outputShape: this.texShape,
      userCode:`
	void main() {
	  ivec2 coords = getOutputCoords();
	  int texR = coords[0];
	  int texC = coords[1];
	  vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${width}.0, ${height}.0);

	  vec4 values = ${textureMethod}(A, uv);
	  setOutput((0.299 * values.r + 0.587 * values.g + 0.114 * values.b) * 255.0);
	}
      `
    }
    return program;
  }

  _compileAndRun(program, inputs) {
    const outInfo = tf.backend().compileAndRun(program, inputs);
    return tf.engine().makeTensorFromDataId(outInfo.dataId, outInfo.shape, outInfo.dtype);
  }

  _runWebGLProgram(program, inputs, outputType) {
    const outInfo = tf.backend().runWebGLProgram(program, inputs, outputType);
    return tf.engine().makeTensorFromDataId(outInfo.dataId, outInfo.shape, outInfo.dtype);
  }
}

module.exports = {
  InputLoader
};
