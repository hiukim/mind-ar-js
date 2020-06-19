const {extract} = require('./extractor');
const {track} = require('./tracking');
const {createRandomizer} = require('../utils/randomizer.js');

class Tracker {
  constructor(trackingData, imageList, projectionTransform) {
    console.log("tracking data", trackingData);
    this.featureSets = trackingData.featureSets;
    this.imageList = imageList;
    this.projectionTransform = projectionTransform;
    this.randomizer = createRandomizer();
  }

  track(modelViewTransform, targetImage) {
    const newModelViewTransform = track({
      projectionTransform: this.projectionTransform,
      featureSets: this.featureSets,
      modelViewTransform,
      targetImage,
      randomizer: this.randomizer,
      imageList: this.imageList,
    });
    return newModelViewTransform;
  }
}

const _buildFeatureSets = ({imageList}) => {
  const featureSets = [];
  for (let i = 0; i < imageList.length; i++) {
    if (window.DEBUG) {window.debug.extractIndex = i};

    const image = imageList[i];
    const coords = extract({imageData: image.data, width: image.width, height: image.height, dpi: image.dpi});

    const featureSet = {};
    featureSet.scale = i;
    featureSet.mindpi = (i === imageList.length-1)? imageList[i].dpi * 0.5: imageList[i+1].dpi;
    featureSet.maxdpi = (i === 0)? imageList[i].dpi * 2: (imageList[i].dpi * 0.8 + imageList[i-1].dpi * 0.2);
    featureSet.coords = [];
    for (let j = 0; j < coords.length; j++) {
      featureSet.coords.push({
        x: coords[j].x,
        y: coords[j].y,
        mx: coords[j].mx,
        my: coords[j].my,
        maxSim: coords[j].maxSim,
      });
    }
    featureSets.push(featureSet);
  }
  return featureSets;
}

const compileTracking = ({imageList}) => {
  const featureSets = _buildFeatureSets({imageList});
  return {featureSets};
}

module.exports = {
  Tracker,
  compileTracking
}
