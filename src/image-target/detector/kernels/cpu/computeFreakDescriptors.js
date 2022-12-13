
import { FREAKPOINTS } from '../../freak.js';

const FREAK_CONPARISON_COUNT = (FREAKPOINTS.length - 1) * (FREAKPOINTS.length) / 2;
const descriptorCount = Math.ceil(FREAK_CONPARISON_COUNT / 8);


function computeFreakDescriptorImpl(extremaFreaks,positionT) {
    const resultValues = new Float32Array(extremaFreaks.height* descriptorCount); 
    function getP(y, x) {
        return positionT.values[y*positionT.width+x];
    }
    function getFreak(y, x) {
        return extremaFreaks.values[y*extremaFreaks.width+x];
    }
    function setOutput(y,x,o){
        resultValues[y*descriptorCount+x]=o;
    }

    for (let featureIndex = 0; featureIndex < extremaFreaks.height; featureIndex++) {
        for (let _descIndex = 0; _descIndex < descriptorCount; _descIndex++) {
            const descIndex = _descIndex * 8;
            let sum = 0;
            for (let i = 0; i < 8; i++) {
                if (descIndex + i >= FREAK_CONPARISON_COUNT) {
                    continue;
                }

                const p1 = Math.trunc(getP(descIndex + i, 0));
                const p2 = Math.trunc(getP(descIndex + i, 1));

                const v1 = getFreak(featureIndex, p1);
                const v2 = getFreak(featureIndex, p2);

                if (v1 < v2 + 0.01) {
                    sum += Math.trunc(Math.pow(2.0, (7.0 - i)));
                }
            }
            setOutput(featureIndex,_descIndex, sum);
        }
    }

   

    return resultValues;
}

export const computeFreakDescriptor = (args) => {
    const { extremaFreaks, positionT } = args.inputs;
    const { backend } = args;

    const freaksData ={values:backend.data.get(extremaFreaks.dataId).values,height:extremaFreaks.shape[0], width:extremaFreaks.shape[1]};
    const positionData ={values:backend.data.get(positionT.dataId).values,width:positionT.shape[1]};
    //backend.runWebGLProgram(program,[extremaFreaks, positionT],'int32');

    const resultValues=computeFreakDescriptorImpl(freaksData,positionData);
    return backend.makeOutput(resultValues, [extremaFreaks.shape[0], descriptorCount], 'int32');
}

export const computeFreakDescriptorConfig = {//: KernelConfig
    kernelName: "ComputeFreakDescriptors",
    backendName: 'cpu',
    kernelFunc: computeFreakDescriptor,// as {} as KernelFunc,
};
