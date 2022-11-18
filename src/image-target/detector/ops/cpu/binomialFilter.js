

// 4th order binomail filter [1,4,6,4,1] X [1,4,6,4,1]
/* function _applyFilter(image) {
    const imageHeight = image.shape[0];
    const imageWidth = image.shape[1];

    const kernelKey = 'w' + imageWidth;
    if (!this.kernelCaches.applyFilter) {
      this.kernelCaches.applyFilter = {};
    }

    if (!this.kernelCaches.applyFilter[kernelKey]) {
      const kernel1 = {
	variableNames: ['p'],
	outputShape: [imageHeight, imageWidth],
	userCode: `
	  void main() {
	    ivec2 coords = getOutputCoords();

	    float sum = getP(coords[0], coords[1]-2);
	    sum += getP(coords[0], coords[1]-1) * 4.;
	    sum += getP(coords[0], coords[1]) * 6.;
	    sum += getP(coords[0], coords[1]+1) * 4.;
	    sum += getP(coords[0], coords[1]+2);
	    setOutput(sum);
	  }
	`
      };

      const kernel2 = {
	variableNames: ['p'],
	outputShape: [imageHeight, imageWidth],
	userCode: `
	  void main() {
	    ivec2 coords = getOutputCoords();

	    float sum = getP(coords[0]-2, coords[1]);
	    sum += getP(coords[0]-1, coords[1]) * 4.;
	    sum += getP(coords[0], coords[1]) * 6.;
	    sum += getP(coords[0]+1, coords[1]) * 4.;
	    sum += getP(coords[0]+2, coords[1]);
	    sum /= 256.;
	    setOutput(sum);
	  }
	`
      };
      this.kernelCaches.applyFilter[kernelKey] = [kernel1, kernel2];
    }

    return tf.tidy(() => {
      const [program1, program2] = this.kernelCaches.applyFilter[kernelKey];

      const result1 = this._compileAndRun(program1, [image]);
      const result2 = this._compileAndRun(program2, [result1]);
      return result2;
    });
  }

 */

/**
 * 
 * @param {TypedArray} vals 
 */
function binomialFilterImpl(vals,width,height){
  
  const resultValues1 = new Float32Array(width*height);
  let p=vals;
  let result=resultValues1;
  function clamp(n,min,max){
    return Math.min(Math.max(min,n),max);
  }
  function getP(y,x){
    x=clamp(x,0,width-1);
    y=clamp(y,0,height-1);

    return p[y*width+x];
  }
  function setOutput(y,x,o){
    result[y*width+x]=o;
  }
  //step1
  for(let y=0;y<height;y++){
    for(let x=0;x<width;x++){
      const coords=[y,x];
      let sum = getP(coords[0], coords[1]-2);
	    sum += getP(coords[0], coords[1]-1) * 4.0;
	    sum += getP(coords[0], coords[1]) * 6.0;
	    sum += getP(coords[0], coords[1]+1) * 4.0;
	    sum += getP(coords[0], coords[1]+2);
      setOutput(y,x,sum);
    }
  }

  const resultValues2 = new Float32Array(vals.length);
  p=resultValues1;
  result=resultValues2;
  //step2
  for(let y=0;y<height;y++){
    for(let x=0;x<width;x++){
      const coords=[y,x];
      let sum = getP(coords[0]-2, coords[1]);
	    sum += getP(coords[0]-1, coords[1]) * 4.0;
	    sum += getP(coords[0], coords[1]) * 6.0;
	    sum += getP(coords[0]+1, coords[1]) * 4.0;
	    sum += getP(coords[0]+2, coords[1]);
	    sum /= 256.0;
      setOutput(y,x,sum);
    }
  }
  return result;
}



const binomialFilter = (args) =>{//{inputs: UnaryInputs, backend: MathBackendCPU}
  /** @type {import('@tensorflow/tfjs').TensorInfo} */
  const image = args.inputs.image;
  /** @type {MathBackendCPU} */
  const backend = args.backend;
  
  /** @type {TypedArray} */
  const values = backend.data.get(image.dataId).values;// as TypedArray;
  
  const resultValues = binomialFilterImpl(values,image.shape[1],image.shape[0]);

  return backend.makeOutput(resultValues, image.shape, image.dtype);
}




const binomialFilterConfig = {//: KernelConfig
    kernelName: "BinomialFilter",
    backendName: 'cpu',
    kernelFunc: binomialFilter,// as {} as KernelFunc,
};



module.exports={
  binomialFilterConfig,
  binomialFilter,
  binomialFilterImpl
}