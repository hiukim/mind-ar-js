const {extract} = require('./image-target/tracking/extractor.js');
const {Detector} = require('./image-target/detectorGPU/detector.js');
//const {Detector} = require('./image-target/detectorCPU/detector.js');
const {build: hierarchicalClusteringBuild} = require('./image-target/matching/hierarchical-clustering.js');
const {buildImageList} = require('./image-target/image-list.js');

onmessage = (msg) => {
  const {data} = msg;
  if (data.type === 'compile') {
    const {targetImages} = data;
    const list = [];
    for (let i = 0; i < targetImages.length; i++) {
      const targetImage = targetImages[i];
      const imageList = buildImageList(targetImage);
      console.log("compiling tracking...", i);
      const trackingData = _extractTrackingFeatures(imageList);
      console.log("compiling matching...", i);
      const matchingData = _extractMatchingFeatures(imageList);
      list.push({
        targetImage,
        imageList,
        trackingData,
        matchingData
      });
    }
    postMessage({
      type: 'compileDone',
      list,
    });
  }
};

const _extractMatchingFeatures = (imageList) => {
  const keyframes = [];
  for (let i = 0; i < imageList.length; i++) {
    const image = imageList[i];
    const detector = new Detector(image.width, image.height);
    const ps = detector.detectImageData(image.data);
    const pointsCluster = hierarchicalClusteringBuild({points: ps});
    keyframes.push({points: ps, pointsCluster, width: image.width, height: image.height, scale: image.dpi});
  }
  return keyframes;
}

const _extractTrackingFeatures = (imageList) => {
  const featureSets = [];
  for (let i = 0; i < imageList.length; i++) {
    const image = imageList[i];
    const coords = extract(image);

    const featureSet = {};
    featureSet.scale = i;
    featureSet.mindpi = (i === imageList.length-1)? imageList[i].dpi * 0.5: imageList[i+1].dpi;
    featureSet.maxdpi = (i === 0)? imageList[i].dpi * 2: (imageList[i].dpi * 0.8 + imageList[i-1].dpi * 0.2);
    featureSet.coords = [];
    for (let j = 0; j < coords.length; j++) {
      featureSet.coords.push({
        mx: coords[j].mx,
        my: coords[j].my,
      });
    }
    featureSets.push(featureSet);
  }
  return featureSets;
}
