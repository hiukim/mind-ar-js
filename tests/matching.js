const fs = require('fs');
const {Image} = require('image-js');
const path = require('path');
const {kpmExtract} = require('../lib/features/kpm.js');
const {build: clusteringBuild, getDebugAssignments} = require('../lib/features/clustering.js');
const {createMatcher} = require('../lib/features/matcher.js');
const {debugImageData} = require('../lib/utils/debug.js');
const {matrixInverse33, matrixMul33} = require('../lib/features/geometry.js');
const {buildProjectionMatrix, buildWorldMatrix} = require('../lib/icp/icp.js');

const DEBUG = true;
let debugContent = null;
if (DEBUG) {
  debugContent = JSON.parse(fs.readFileSync("/Users/hiukim/Downloads/debugMatching2.txt", 'utf8'));
}

const DEFAULT_DPI = 72;
const MIN_IMAGE_PIXEL_SIZE = 28;
const EPSILON = 0.01;
const INPUT_FILE = 'card';

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
  buildWorldMatrix({screenCoords, worldCoords});
  buildProjectionMatrix();

  //console.log("matC", debugContent.matC);
  //console.log("initMatXw2Xc", debugContent.initMatXw2Xc);
  //console.log("camPose", debugContent.camPose);
  //console.log("matXc2U", debugContent.matXc2U);
}

exec();
