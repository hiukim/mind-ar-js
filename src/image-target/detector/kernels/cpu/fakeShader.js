import {zeros,map, flatten as mathjsflatten} from 'mathjs'
/**
 * @typedef {Object} Kernel
 * @property {string[]} variableNames
 * @property {number[]} outputShape
 * @property {Function} userCode 
 */

/**
 *
 * @param {MathBackendCPU} backend
 * @param {Kernel} kernel 
 * @param {Array<.TensorInfo>} inputs 
 * @param {DataType} dtype
 * @returns {Tensor}
 */
function runCode(backend, kernel, inputs, dtype) {
    const inputData = inputs.map((value) => { return backend.data.get(value.dataId).values; });

    //create getter functions for every variable name, clamping the input.
    const tempData = {}
    kernel.variableNames.forEach((name, index) => {
        const funName=`get${capFirstLetter(name)}`;
        //console.log("Making function:",funName,inputs[index].shape);
        tempData[funName] = function (...args) {
            const inputIndex=index;
            for (let i = 0; i < args.length; i++) {
                args[i] = clampInt(args[i], 0, inputs[inputIndex].shape[i] );
            }
            return inputData[index][flatten(args, inputs[inputIndex].shape)];
        }
    });
    tempData.int=Math.trunc;
    tempData.atan=Math.atan2;
    //create an empty matrix to map the output size, because i'm lazy and want to use Matrix.map(...)
    //const temp = new Matrix();
    //console.log("Creating output shape:",kernel.outputShape);
    const temp=zeros(kernel.outputShape);//reshape([0,0,0],kernel.outputShape);
    const output = map(temp,(value, index,matrix) => {
        
        tempData.getOutputCoords = () => { return index; }
        let out;

        tempData.setOutput = (newValue) => { out = Number.isNaN(newValue) ? 0 : Math.fround(newValue); }
        //bind the method calls and run the code
        kernel.userCode.bind(tempData)();
        return out;
    })
    
    //output.flat()
    //convert the output from a matrix into a tensor
    
    return backend.makeOutput(mathjsflatten(output), kernel.outputShape, dtype);
}

/**
 * 
 * @param {string} word 
 * @returns 
 */
function capFirstLetter(word) {
    return word[0].toUpperCase() + word.substring(1);
}

function clampInt(n, min, max) {
    return Math.min(Math.max(n, min), max - 1);
}
/**
 * 
 * @param {number[]} input 
 * @param {number[]} max 
 * @returns 
 */
function flatten(input, max) {
    return input.reduce((prev, current, index) => {
        for (let i = index + 1; i < max.length; i++) {
            current *= max[i];
        }
        return prev + current;
    },0);
}

export { runCode };