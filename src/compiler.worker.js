const {extract} = require('./image-target/tracker/extract.js');
const {Detector} = require('./image-target/detector/detector.js');
const {build: hierarchicalClusteringBuild} = require('./image-target/matching/hierarchical-clustering.js');
const {buildImageList} = require('./image-target/image-list.js');
const tf = require('@tensorflow/tfjs');

onmessage = (msg) => {
  const {data} = msg;
  if (data.type === 'compile') {
    console.log("worker compile...");

    const {targetImages} = data;
    const percentPerImage = 100.0 / targetImages.length;
    let percent = 0.0;
    const list = [];
    for (let i = 0; i < targetImages.length; i++) {
      const targetImage = targetImages[i];
      const imageList = buildImageList(targetImage);
      const percentPerAction = percentPerImage / imageList.length / 2;

      console.log("compiling tracking...", i);
      const trackingData = _extractTrackingFeatures(imageList, (index) => {
	console.log("done tracking", i, index);
	percent += percentPerAction;
	postMessage({type: 'progress', percent: percent});
      });

      console.log("compiling matching...", i);
      const matchingData = _extractMatchingFeatures(imageList, (index) => {
	console.log("done matching", i, index);
	percent += percentPerAction;
	postMessage({type: 'progress', percent: percent});
      });
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

const _extractMatchingFeatures = (imageList, doneCallback) => {
  const keyframes = [];
  for (let i = 0; i < imageList.length; i++) {
    const image = imageList[i];
    // TODO: can improve performance greatly if reuse the same detector. just need to handle resizing the kernel outputs
    const detector = new Detector(image.width, image.height);

    tf.tidy(() => {
      const inputT = tf.tensor(image.data, [image.data.length]).reshape([image.height, image.width]);
      //const ps = detector.detectImageData(image.data);
      const ps = detector.detect(inputT);
      const pointsCluster = hierarchicalClusteringBuild({points: ps});
      keyframes.push({
	points: ps,
	pointsCluster,
	width: image.width,
	height: image.height,
	scale: image.scale
      });

      doneCallback(i);
    });
  }
  return keyframes;
}

const _extractTrackingFeatures = (imageList, doneCallback) => {
  const featureSets = [];
  for (let i = 0; i < imageList.length; i++) {
    const image = imageList[i];
    const points = extract(image);

    const featureSet = {
      scale: image.scale,
      width: image.width,
      height: image.height,
      points,
    };
    featureSets.push(featureSet);

    doneCallback(i);
  }
  return featureSets;
}
