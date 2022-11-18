
/*
const kernel = {
		variableNames: ['extrema'],
		outputShape: [Math.floor(extremaHeight/2), Math.floor(extremaWidth/2)],
		userCode: `
		  void main() {
			ivec2 coords = getOutputCoords();
			int y = coords[0] * 2;
			int x = coords[1] * 2;
  
			float location = 0.0;
			float values = getExtrema(y, x);
  
			if (getExtrema(y+1, x) != 0.0) {
			  location = 1.0;
		  values = getExtrema(y+1, x);
			}
			else if (getExtrema(y, x+1) != 0.0) {
			  location = 2.0;
		  values = getExtrema(y, x+1);
			}
			else if (getExtrema(y+1, x+1) != 0.0) {
			  location = 3.0;
		  values = getExtrema(y+1, x+1);
			}
  
			if (values < 0.0) {
			  setOutput(location * -1000.0 + values);
			} else {
			  setOutput(location * 1000.0 + values);
			}
		  }
		`
	}

*/

function clamp(n,min,max){
    return Math.min(Math.max(min,n),max-1);
  }

const extremaReduction = (args) => {
    const { extremasResultT } = args.inputs;
    /** @type {MathBackendCPU} */
    const backend = args.backend;
    const extremaHeight = extremasResultT.shape[0];
    const extremaWidth = extremasResultT.shape[1];
    const outHeight=Math.floor(extremaHeight/2.0);
    const outWidth=Math.floor(extremaWidth/2.0);
    const extrema = backend.data.get(extremasResultT.dataId).values;
    const resultValues = new Float32Array(outHeight * outWidth);
    function getExtrema(y, x) {
        y=clamp(y,0,extremaHeight);
        x=clamp(x,0,extremaWidth);
        return extrema[y * extremaWidth + x];
    }
    function setOutput(y, x, o) {
        resultValues[y * outWidth+ x] = o;
    }
    for (let _y = 0; _y < outHeight; _y++) {
        for (let _x = 0; _x < outWidth; _x++) {
            const y = _y * 2;
            const x = _x * 2;

            let location = 0.0;
            let values = getExtrema(y, x);

            if (getExtrema(y + 1, x) != 0.0) {
                location = 1.0;
                values = getExtrema(y + 1, x);
            }
            else if (getExtrema(y, x + 1) != 0.0) {
                location = 2.0;
                values = getExtrema(y, x + 1);
            }
            else if (getExtrema(y + 1, x + 1) != 0.0) {
                location = 3.0;
                values = getExtrema(y + 1, x + 1);
            }

            if (values < 0.0) {
                setOutput(_y, _x, location * -1000.0 + values);
            } else {
                setOutput(_y, _x, location * 1000.0 + values);
            }
        }
    }
    return backend.makeOutput(resultValues,  [outHeight,outWidth], extremasResultT.dtype);
}

const extremaReductionConfig = {//: KernelConfig
    kernelName: "ExtremaReduction",
    backendName: 'cpu',
    kernelFunc: extremaReduction,// as {} as KernelFunc,
};

module.exports = {
    extremaReductionConfig,
    extremaReduction
}