const {registerKernel} = require('@tensorflow/tfjs');
const {binomialFilterConfig}=require('./binomialFilter');
const {buildExtremasConfig} = require('./buildExtremas');
const {computeExtremaAnglesConfig} = require('./computeExtremaAngles');
const {computeExtremaFreakConfig} = require('./computeExtremaFreak')
const {computeFreakDescriptorConfig}=require('./computeFreakDescriptors')
const {computeLocalizationConfig}=require('./computeLocalization')
const {computeOrientationHistogramsConfig} = require('./computeOrientationHistograms')
const {downsampleBilinearConfig}=require('./downsampleBilinear');
const {extremaReductionConfig} = require('./extremaReduction');
const {smoothHistogramsConfig} = require('./smoothHistograms');
const {upsampleBilinearConfig} = require('./upsampleBilinear');

function Register(){
    registerKernel(binomialFilterConfig);
    registerKernel(buildExtremasConfig);
    registerKernel(computeExtremaAnglesConfig);
    registerKernel(computeExtremaFreakConfig);
    registerKernel(computeFreakDescriptorConfig);
    registerKernel(computeLocalizationConfig);
    registerKernel(computeOrientationHistogramsConfig);
    registerKernel(downsampleBilinearConfig);
    registerKernel(extremaReductionConfig);
    registerKernel(smoothHistogramsConfig);
    registerKernel(upsampleBilinearConfig);
}
module.exports= Register;