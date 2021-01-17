// Deprecated CPU version - only keep for reference
const {extract} = require('./extractor');
const {track} = require('./tracking');
const {createRandomizer} = require('../utils/randomizer.js');

class Tracker {
  constructor(trackingData, imageList, projectionTransform) {
    this.featureSets = trackingData;
    this.imageList = imageList;
    this.projectionTransform = projectionTransform;
    this.randomizer = createRandomizer();
    this.prevResults = [];
  }

  setupQuery(queryWidth, queryHeight) {
    this.inputWidth = queryWidth;
    this.inputHeight = queryHeight;
    const processCanvas = document.createElement('canvas');
    processCanvas.width = this.inputWidth;
    processCanvas.height = this.inputHeight;

    this.workerProcessContext = processCanvas.getContext('2d');
    this.processData = new Uint8Array(this.inputWidth * this.inputHeight);
  }

  detected(modelViewTransform) {
    this.prevResults = [{
      modelViewTransform: modelViewTransform,
      selectedFeatures: []
    }];
  }

  // input is either html video/image
  track(input) {
    // TODO: if tracking multiple image target, we don't need to build targetImage multiple times
    const targetImage = this._buildQueryImage(input);
    const result = track({
      projectionTransform: this.projectionTransform,
      featureSets: this.featureSets,
      prevResults: this.prevResults,
      randomizer: this.randomizer,
      imageList: this.imageList,
      targetImage,
    });

    if (result !== null) {
      this.prevResults.push(result);
      if (this.prevResults.length > 3) {
        this.prevResults.shift();
      }
    } else {
      this.prevResults = [];
    }

    if (this.prevResults.length === 0) return null;
    return this.prevResults[this.prevResults.length-1].modelViewTransform;
  }

  _buildQueryImage(video) {
    this.workerProcessContext.clearRect(0, 0, this.inputWidth, this.inputHeight);
    this.workerProcessContext.drawImage(video, 0, 0, this.inputWidth, this.inputHeight);
    const imageData = this.workerProcessContext.getImageData(0, 0, this.inputWidth, this.inputHeight);
    for (let i = 0; i < this.processData.length; i++) {
      const offset = i * 4;
      this.processData[i] = Math.floor((imageData.data[offset] + imageData.data[offset+1] + imageData.data[offset+2])/3);
    }
    const queryImage = {data: this.processData, width: this.inputWidth, height: this.inputHeight, dpi: 1};
    return queryImage;
  }
}

const _buildFeatureSets = ({imageList}) => {
  const featureSets = [];
  for (let i = 0; i < imageList.length; i++) {
    if (window.DEBUG) {window.debug.extractIndex = i};

    const image = imageList[i];
    const coords = extract(image);

    const featureSet = {};
    featureSet.scale = i;
    featureSet.mindpi = (i === imageList.length-1)? imageList[i].dpi * 0.5: imageList[i+1].dpi;
    featureSet.maxdpi = (i === 0)? imageList[i].dpi * 2: (imageList[i].dpi * 0.8 + imageList[i-1].dpi * 0.2);
    featureSet.coords = [];
    for (let j = 0; j < coords.length; j++) {
      featureSet.coords.push({
        //x: coords[j].x,
        //y: coords[j].y,
        mx: coords[j].mx,
        my: coords[j].my,
        //maxSim: coords[j].maxSim,
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
