const fs = require('fs');
const {Image} = require('image-js');
const path = require('path');
const {kpmExtract} = require('../lib/features/kpm.js');
const {build: clusteringBuild, getDebugAssignments} = require('../lib/features/clustering.js');
const {createMatcher} = require('../lib/features/matcher.js');
const {createTracker} = require('../lib/features/tracker.js');
const {debugImageData} = require('../lib/utils/debug.js');
const {matrixInverse33, matrixMul33} = require('../lib/features/geometry.js');
const {buildTransforms} = require('../lib/icp/icp.js');
const {getProjectionTransform} = require('../lib/icp/utils.js');

const DEBUG = true;
let debugContent = null;
if (DEBUG) {
  debugContent = JSON.parse(fs.readFileSync("/Users/hiukim/Downloads/debugMatching2.txt", 'utf8'));
}

const DEFAULT_DPI = 72;
const MIN_IMAGE_PIXEL_SIZE = 28;
const EPSILON = 0.01;
const INPUT_FILE = 'card';

const featureSets = JSON.parse(fs.readFileSync("/Users/hiukim/Desktop/featureSets_" + INPUT_FILE + ".txt", 'utf8'));

//console.log("ref data set: ", debugContent.refsets);

// image: Imagejs.Image
const getGreyImage = (image) => {
  const _greyImage = image.grey({algorithm: "average"});

  const greyImage = {
    width: _greyImage.width,
    height: _greyImage.height,
    data: []
  };
  for (let i = 0; i < _greyImage.data.length; i++) {
    greyImage.data.push( Math.floor(_greyImage.data[i] / _greyImage.maxValue * 255));
  }
  return greyImage;
}

const resizeImage = (image, ratio) => {
  const width = Math.round(image.width * ratio);
  const height = Math.round(image.height * ratio);

  const imageData = new Uint8Array(width * height);
  for (let i = 0; i < width; i++) {
    let si1 = Math.round(1.0 * i / ratio);
    let si2 = Math.round(1.0 * (i+1) / ratio) - 1;
    if (si2 >= image.width) si2 = image.width - 1;

    for (let j = 0; j < height; j++) {
      let sj1 = Math.round(1.0 * j / ratio);
      let sj2 = Math.round(1.0 * (j+1) / ratio) - 1;
      if (sj2 >= image.height) sj2 = image.height - 1;

      let sum = 0;
      let count = 0;
      for (let ii = si1; ii <= si2; ii++) {
        for (let jj = sj1; jj <= sj2; jj++) {
          sum += (1.0 * image.data[jj * image.width + ii]);
          count += 1;
        }
      }
      imageData[j * width + i] = Math.floor(sum / count);
    }
  }
  return {data: imageData, width: width, height: height};
}

const exec = async() => {
  var _start = new Date().getTime();

  const imagePath = path.join(__dirname, INPUT_FILE + '.png');
  const image = await new Promise((resolve, reject) => {
    Image.load(imagePath).then((image) => {
      resolve(image);
    });
  });
  const greyImage = getGreyImage(image);

  const dpi = DEFAULT_DPI;
  const minDpi = Math.floor(1.0 * MIN_IMAGE_PIXEL_SIZE / Math.min(greyImage.width, greyImage.height) * dpi * 1000) / 1000;

  const dpiList = [];
  let c = minDpi;
  while (true) {
    dpiList.push(c);
    c *= Math.pow(2.0, 1.0/3.0);
    c = Math.fround(c); // can remove this line in production. trying to reproduce the same result as artoolkit, which use float.
    if (c >= dpi * 0.95) {
      c = dpi;
      break;
    }
  }
  dpiList.push(c);
  dpiList.reverse();

  console.log("dpi list: ", dpiList);

  const imageList = []; // list of {data: Uint8Array[width x height], width, height}
  for (let i = 0; i < dpiList.length; i++) {
    const w = greyImage.width * dpiList[i] / dpi;
    const h = greyImage.height * dpiList[i] / dpi;
    imageList.push( resizeImage(greyImage, dpiList[i]/dpi) );
  }

  const keyframes = [];

  for (let i = 0; i < imageList.length; i++) {
    const image = imageList[i];
    const points = kpmExtract({imageData: image.data, width: image.width, height: image.height, dpi: dpiList[i], pageNo: 1, imageNo: i});
    const rootNode = clusteringBuild({points: points});

    keyframes.push({points: points, rootNode: rootNode, width: image.width, height: image.height});

    const clusterList = [];
    const go = (node) => {
      clusterList.push({
        leaf: node.leaf,
        pointIndexes: node.pointIndexes,
        centerPointIndex: node.centerPointIndex
      })
      if (!node.leaf) {
        for (let i = 0; i < node.children.length; i++) {
          go(node.children[i]);
        }
      }
    }
    go(rootNode);

    /*
    console.log('cluster length', clusterList.length, debugContent.clusters[i].length);
    console.log(clusterList);
    console.log(debugContent.clusters[i]);
    for (let j = 0; j < clusterList.length; j++) {
      if (debugContent.clusters[i][j].reverseIndexes.length > 0) {
        console.log("point indexes length", j, clusterList[j].pointIndexes.length, debugContent.clusters[i][j].reverseIndexes.length);
        for (let k = 0; k < clusterList[j].pointIndexes.length; k++) {
          if (clusterList[j].pointIndexes[k] !== debugContent.clusters[i][j].reverseIndexes[k]) {
            console.log("incorrect cluster");
          }
        }
      } else {
        console.log("point indexes length", j, clusterList[j].pointIndexes, debugContent.clusters[i][j].reverseIndexes.length);
      }
    }
    */
  }

  console.log("test matching");
  const inputImage = debugContent.inputImage;
  console.log("inDataSet: ", debugContent.inDataSet);
  console.log("debug points: ", debugContent.points.length);

  const targetImage = {
    data: inputImage.values,
    width: inputImage.width,
    height: inputImage.height
  }

  //console.log("dddd", debugContent.dataPtr);
  //console.log("dataPtr", debugContent.dataPtr.length, debugContent.dataPtr[0].length, targetImage.height, targetImage.width);
  for (let j = 0; j < targetImage.height; j++) {
    for (let i = 0; i < targetImage.width; i++) {
      //console.log(i, j, debugContent.dataPtr[j][i], (debugContent.dataPtr[j][i][0] + debugContent.dataPtr[j][i][1] + debugContent.dataPtr[j][i][2])/3,  targetImage.data[j*targetImage.width+i]);
    }
  }
  //return;

  const points = kpmExtract({imageData: targetImage.data, width: targetImage.width, height: targetImage.height, dpi: 72, pageNo: 1, imageNo: 0});
  console.log("target points: ", points.length);
  console.log("keyframes: ", keyframes.length);
  for (let i = 0; i < points.length; i++) {
    if( Math.abs(points[i].x2D - debugContent.points[i].x) > 0.0001) console.log(points[i], debugContent.points[i]);
  }

  const matcher = createMatcher({keyframes, debugContent});
  const result = matcher.match({querypoints: points, querywidth: targetImage.width, queryheight: targetImage.height});
  console.log("match result: ", result, debugContent.finalH, debugContent.finalMatchId, debugContent.finalMatches);

  const screenCoords = [];
  const worldCoords = [];
  const keyframe = keyframes[result.keyframeIndex];
  for (let i = 0; i < result.matches.length; i++) {
    const querypointIndex = result.matches[i].querypointIndex;
    const keypointIndex = result.matches[i].keypointIndex;
    screenCoords.push({
      x: points[querypointIndex].x2D,
      y: points[querypointIndex].y2D,
    })
    worldCoords.push({
      x: keyframe.points[keypointIndex].x3D,
      y: keyframe.points[keypointIndex].y3D,
      z: 0,
    })
  }

  let modelViewTransform = buildTransforms({screenCoords, worldCoords, debugContent});

  const openGLWorldMatrix = [
    modelViewTransform[0][0], -modelViewTransform[1][0], -modelViewTransform[2][0], 0,
    modelViewTransform[0][1], -modelViewTransform[1][1], -modelViewTransform[2][1], 0,
    modelViewTransform[0][2], -modelViewTransform[1][2], -modelViewTransform[2][2], 0,
    modelViewTransform[0][3], -modelViewTransform[1][3], -modelViewTransform[2][3], 1
  ];

  //console.log('tran', trans);
  //console.log("matC", debugContent.matC);
  //console.log("matXc2U", debugContent.matXc2U);
  console.log('openGLWorldMatrix', openGLWorldMatrix);

  //console.log('featuresets', featureSets[0]);
  //console.log('trackFeatures', debugContent.trackFeatures);
  //console.log('wTrans1', debugContent.wTrans1);

  // remove this: temporary set to align with debug content
  modelViewTransform = [ [ 0.9197675585746765,
    -0.39036545157432556,
    -0.04052652046084404,
    91.61624145507812 ],
  [ -0.38534390926361084,
    -0.9178342223167419,
    0.09534380584955215,
    181.5712890625 ],
  [ -0.07441555708646774,
    -0.07207749038934708,
    -0.9946191310882568,
    464.1438903808594 ] ];

  modelViewTransform = [ [ 0.9265531301498413,
    -0.3751317262649536,
    -0.027848180383443832,
    90.0240249633789 ],
  [ -0.3739980459213257,
    -0.9266232252120972,
    0.038663968443870544,
    181.0799102783203 ],
  [ -0.04030885174870491,
    -0.02540905401110649,
    -0.9988641142845154,
    457.211669921875 ] ];

  const projectionTransform = getProjectionTransform();
  const tracker = createTracker({dpiList, imageList, targetImage, featureSets, projectionTransform, modelViewTransform, debugContent});
  const newModelViewTransform = tracker.track({modelViewTransform});

  /*
  const newModelViewTransform = [ [ 0.9358950853347778,
    -0.35104820132255554,
    0.029421554878354073,
    87.93341827392578 ],
  [ -0.351280152797699,
    -0.936265766620636,
    0.0029550453182309866,
    178.6919403076172 ],
  [ 0.026509026065468788,
    -0.013100818730890751,
    -0.999562680721283,
    447.44122314453125 ] ];
    */

  const newOpenGLWorldMatrix = [
    newModelViewTransform[0][0], -newModelViewTransform[1][0], -newModelViewTransform[2][0], 0,
    newModelViewTransform[0][1], -newModelViewTransform[1][1], -newModelViewTransform[2][1], 0,
    newModelViewTransform[0][2], -newModelViewTransform[1][2], -newModelViewTransform[2][2], 0,
    newModelViewTransform[0][3], -newModelViewTransform[1][3], -newModelViewTransform[2][3], 1
  ];
  console.log('new openGLWorldMatrix', newOpenGLWorldMatrix);
}

exec();
