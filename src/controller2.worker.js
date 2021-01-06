const tf = require('@tensorflow/tfjs');

const {Matcher} = require('./image-target/matching/matcher.js');
const {Detector} = require('./image-target/detectorTF/detector2.js');

let projectionTransform = null;
let matchingDataList = null;
let detector = null;
let matcher = null;

onmessage = (msg) => {
  const {data} = msg;

  if (data.type === 'setup') {
    projectionTransform = data.projectionTransform;
    matchingDataList = data.matchingDataList;
    matcher = new Matcher(data.inputWidth, data.inputHeight);
    detector = new Detector(data.inputWidth, data.inputHeight);
  }
  else if (data.type === 'process') {
    const input = data.input;
    const result = detector.detectPixels(input);
    //console.log("result", result);
    //const sum = tf.sum(input).arraySync();
    //console.log("sum", sum.arraySync());
    //console.log("process", input);
    postMessage({
      type: 'processDone',
      sum: 1,
    });
  }
}
