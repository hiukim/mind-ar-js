
const tf = require('@tensorflow/tfjs');
const FREAK_EXPANSION_FACTOR = 7.0;

const LAPLACIAN_THRESHOLD = 3.0;
const LAPLACIAN_SQR_THRESHOLD = LAPLACIAN_THRESHOLD * LAPLACIAN_THRESHOLD;

const EDGE_THRESHOLD = 4.0;
const EDGE_HESSIAN_THRESHOLD = ((EDGE_THRESHOLD+1) * (EDGE_THRESHOLD+1) / EDGE_THRESHOLD);

/*
const kernel = {
	variableNames: ['image0', 'image1', 'image2'],
	outputShape: [imageHeight, imageWidth],
	userCode: `
	  void main() {
	    ivec2 coords = getOutputCoords();

	    int y = coords[0];
	    int x = coords[1];

	    float value = getImage1(y, x);

	    // Step 1: find local maxima/minima
	    if (value * value < ${LAPLACIAN_SQR_THRESHOLD}.) {
	      setOutput(0.);
	      return;
	    }
	    if (y < ${FREAK_EXPANSION_FACTOR} || y > ${imageHeight - 1 - FREAK_EXPANSION_FACTOR}) {
	      setOutput(0.);
	      return;
	    }
	    if (x < ${FREAK_EXPANSION_FACTOR} || x > ${imageWidth - 1 - FREAK_EXPANSION_FACTOR}) {
	      setOutput(0.);
	      return;
	    }

	    bool isMax = true;
	    bool isMin = true;
	    for (int dy = -1; dy <= 1; dy++) {
	      for (int dx = -1; dx <= 1; dx++) {
	        float value0 = getImage0(y+dy, x+dx);
	        float value1 = getImage1(y+dy, x+dx);
	        float value2 = getImage2(y+dy, x+dx);

		if (value < value0 || value < value1 || value < value2) {
		  isMax = false;
		}
		if (value > value0 || value > value1 || value > value2) {
		  isMin = false;
		}
	      }
	    }

	    if (!isMax && !isMin) {
	      setOutput(0.);
	      return;
	    }

	    // compute edge score and reject based on threshold
	    float dxx = getImage1(y, x+1) + getImage1(y, x-1) - 2. * getImage1(y, x);
	    float dyy = getImage1(y+1, x) + getImage1(y-1, x) - 2. * getImage1(y, x);
	    float dxy = 0.25 * (getImage1(y-1,x-1) + getImage1(y+1,x+1) - getImage1(y-1,x+1) - getImage1(y+1,x-1));

	    float det = (dxx * dyy) - (dxy * dxy);

	    if (abs(det) < 0.0001) { // determinant undefined. no solution
	      setOutput(0.);
	      return;
	    }

	    float edgeScore = (dxx + dyy) * (dxx + dyy) / det;

	    if (abs(edgeScore) >= ${EDGE_HESSIAN_THRESHOLD} ) {
	      setOutput(0.);
	      return;
	    }
	    setOutput(getImage1(y,x));
	  }
	`
      };
*/

const buildExtremasImpl=(image0,image1,image2,width,height)=>{
    const resultValues = new Float32Array(width*height);
    function getImage0(x,y){
        return image0[y*width+x];
    }
    function getImage1(x,y){
        return image1[y*width+x];
    }
    function getImage2(x,y){
        return image2[y*width+x];
    }

    function setOutput(x,y,o){
        resultValues[y*width+x]=o;
    }

    for(let y=0;y<height;y++){
      for(let x=0;x<width;x++){  
            const value = getImage1(x, y);

            // Step 1: find local maxima/minima
            if (value * value < LAPLACIAN_SQR_THRESHOLD) {
                setOutput(x,y,0);
                continue;
            }
            if (x < FREAK_EXPANSION_FACTOR || x > (height - 1 - FREAK_EXPANSION_FACTOR)) {
                setOutput(x,y,0);
                continue;
            }
            if (y < FREAK_EXPANSION_FACTOR || y > (width - 1 - FREAK_EXPANSION_FACTOR)) {
                setOutput(x,y,0);
                continue;
            }

            let isMax = true;
            let isMin = true;
            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    const value0 = getImage0(x+dx,y+dy);
                    const value1 = getImage1(x+dx,y+dy);
                    const value2 = getImage2(x+dx,y+dy);

                    if (value < value0 || value < value1 || value < value2) {
                        isMax = false;
                    }
                    if (value > value0 || value > value1 || value > value2) {
                        isMin = false;
                    }
                }
            }

            if (!isMax && !isMin) {
                setOutput(x,y,0);
                continue;
            }

            // compute edge score and reject based on threshold
            const dxx = getImage1(x, y+1) + getImage1(x, y-1) - 2. * getImage1(x, y);
            const dyy = getImage1(x+1, y) + getImage1(x-1, y) - 2. * getImage1(x, y);
            const dxy = 0.25 * (getImage1(x-1,y-1) + getImage1(x+1,y+1) - getImage1(x-1,y+1) - getImage1(x+1,y-1));

            const det = (dxx * dyy) - (dxy * dxy);

            if (Math.abs(det) < 0.0001) { // determinant undefined. no solution
                setOutput(x,y,0);
                continue;
            }

            const edgeScore = (dxx + dyy) * (dxx + dyy) / det;

            if (Math.abs(edgeScore) >= EDGE_HESSIAN_THRESHOLD ) {
                setOutput(x,y,0);
                continue;
            }
            setOutput(x,y,getImage1(x,y));
        }
    }
    return resultValues;
}

const buildExtremas=(args)=>{
    let {image0,image1,image2}=args.inputs;
    /** @type {MathBackendCPU} */
    const backend = args.backend;

    const imageHeight = image1.shape[0];
    const imageWidth = image1.shape[1];

    image0=tf.engine().runKernel('DownsampleBilinear',{image:image0});
    image2=tf.engine().runKernel('UpsampleBilinear',{image:image2,targetImage:image1});

    /** @type {TypedArray} */
    const vals0 = backend.data.get(image0.dataId).values;
    const vals1 = backend.data.get(image1.dataId).values;
    const vals2 = backend.data.get(image2.dataId).values;

    const resultValues = buildExtremasImpl(vals0,vals1,vals2,imageWidth,imageHeight);

    return backend.makeOutput(resultValues, [imageHeight, imageWidth], image1.dtype);
}

const buildExtremasConfig = {//: KernelConfig
    kernelName: "BuildExtremas",
    backendName: 'cpu',
    kernelFunc: buildExtremas,// as {} as KernelFunc,
};

module.exports={
    buildExtremasConfig,
    buildExtremas,
    buildExtremasImpl
}