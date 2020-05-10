const {build: buildPyramids} = require('./gaussian_pyramids');
const {debugImageData} = require('../utils/debug.js');

const KPM_SURF_FEATURE_DENSITY_L1 = 100;
const FREAK_SUB_DIMENSION = 96;

const extract = (options) => {
  const {imageData, width, height, dpi, pageNo, imageNo} = options;
  const featureDensity = KPM_SURF_FEATURE_DENSITY_L1;

  const maxFeatureNum = featureDensity * width * height / (480.0*360);
  console.log('extract kpm: ', pageNo, imageNo, width, height, dpi, maxFeatureNum);

  const pyramids = buildPyramids({imageData, width, height});

  return pyramids;
}

module.exports = {
  extract
};
