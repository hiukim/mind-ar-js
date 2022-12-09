import { registerKernel } from '@tensorflow/tfjs';
import { binomialFilterConfig } from './binomialFilter.js';
import { buildExtremasConfig } from './buildExtremas.js';
import { computeExtremaAnglesConfig } from './computeExtremaAngles.js';
import { computeExtremaFreakConfig } from './computeExtremaFreak.js'
import { computeFreakDescriptorConfig } from './computeFreakDescriptors.js'
import { computeLocalizationConfig } from './computeLocalization.js'
import { computeOrientationHistogramsConfig } from './computeOrientationHistograms.js'
import { downsampleBilinearConfig } from './downsampleBilinear.js';
import { extremaReductionConfig } from './extremaReduction.js';
import { smoothHistogramsConfig } from './smoothHistograms.js';
import { upsampleBilinearConfig } from './upsampleBilinear.js';

//export function Register(){
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
//}
