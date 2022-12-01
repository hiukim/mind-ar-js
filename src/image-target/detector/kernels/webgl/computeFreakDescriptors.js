
import { FREAKPOINTS } from '../../freak.js';

const FREAK_CONPARISON_COUNT = (FREAKPOINTS.length - 1) * (FREAKPOINTS.length) / 2;
const descriptorCount = Math.ceil(FREAK_CONPARISON_COUNT / 8);

const cache={};
function GetProgram(extremaFreaks){
    const key=`${extremaFreaks.shape[0]}`;
    if (!cache.hasOwnProperty(key)) {
        const kernel = {
            variableNames: ['freak', 'p'],
            outputShape: [extremaFreaks.shape[0], descriptorCount],
            userCode: `
  void main() {
    ivec2 coords = getOutputCoords();
    int featureIndex = coords[0];
    int descIndex = coords[1] * 8;

    int sum = 0;
    for (int i = 0; i < 8; i++) {
      if (descIndex + i >= ${FREAK_CONPARISON_COUNT}) {
        continue;
      }

      int p1 = int(getP(descIndex + i, 0));
      int p2 = int(getP(descIndex + i, 1));

      float v1 = getFreak(featureIndex, p1);
      float v2 = getFreak(featureIndex, p2);

      if (v1 < v2 + 0.01) {
        sum += int(pow(2.0, float(7 - i)));
      }
    }
    setOutput(float(sum));
  }
`
        }
        cache[key]=kernel;
    }
    return cache[key];
}

export const computeFreakDescriptor=(args)=>{
    const {extremaFreaks, positionT} =args.inputs;
    const {backend} = args;
    const program = GetProgram(extremaFreaks);
    return backend.runWebGLProgram(program,[extremaFreaks, positionT],'int32');
}

export const computeFreakDescriptorConfig = {//: KernelConfig
    kernelName: "ComputeFreakDescriptors",
    backendName: 'webgl',
    kernelFunc: computeFreakDescriptor,// as {} as KernelFunc,
};

