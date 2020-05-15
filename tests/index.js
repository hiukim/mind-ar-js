const fs = require('fs');
const {Image} = require('image-js');
const path = require('path');
const {extract} = require('../lib/features/index.js');
const {kpmExtract} = require('../lib/features/kpm.js');
const {debugImageData} = require('../lib/utils/debug.js');

const DEFAULT_DPI = 72;
const MIN_IMAGE_PIXEL_SIZE = 28;
const EPSILON = 0.01;

const INPUT_FILE = 'card3';

const DEBUG = true;
let debugContent = null;
if (DEBUG) {
  debugContent = JSON.parse(fs.readFileSync("/Users/hiukim/Desktop/kimDebugData_" + INPUT_FILE + ".txt", 'utf8'));
}

// image: Imagejs.Image
const getGreyImage = (image) => {
  const _greyImage = image.grey({algorithm: "average"});

  const greyImage = {
    width: _greyImage.width,
    height: _greyImage.height,
    data: []
  };

  for (let i = 0; i < _greyImage.data.length; i++) {
   // greyImage.data.push( (_greyImage.data[i]+1) / (_greyImage.maxValue+1) * 256 - 1);
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
      //console.log("sum: ", sum, count, imageData[j * width + i]);
    }
  }
  //console.log("image: ", imageData);
  //debugImageData({filename: "./debug/resize_"+width+".png", data: imageData, height: height, width: width});
  return {data: imageData, width: width, height: height};
}

const exec = async() => {
  var _start = new Date().getTime();

  const imagePath = path.join(__dirname, INPUT_FILE + '.png');
  const image = await new Promise((resolve, reject) => {
    Image.load(imagePath).then((image) => {
      console.log('Width', image.width);
      console.log('Height', image.height);
      console.log('colorModel', image.colorModel);
      console.log('components', image.components);
      console.log('alpha', image.alpha);
      console.log('channels', image.channels);
      console.log('bitDepth', image.bitDepth);
      console.log('maxValue', image.maxValue);
      console.log('data', image.data.length);
      resolve(image);
    });
  });
  const greyImage = getGreyImage(image);

  //console.log("grey Image: ", greyImage);
  //debugImageData({filename: "./debug/input_image.png", data: greyImage.data, height: greyImage.height, width: greyImage.width});

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

  if (debugContent) {
    // verify image
    console.log("[DEBUG] verifying image list....");
    let allGood = true;
    for (let i = 0; i < imageList.length; i++) {
      const image = imageList[i];
      debugImageData({filename: "./debug/resize_"+image.width+".png", data: image.data, height: image.height, width: image.width});

      if (image.data.length !== debugContent.imageSets[i].length) {
        console.log("incorrect imageset image size: ", i, image.data.length, debugContent.imageSets[i].length);
      }
      for (let j = 0; j < image.data.length; j++) {
        if (image.data[j] !== debugContent.imageSets[i][j]) {
          console.log("[DEBUG] incorrect image pixe: ", i, j, image.data[j], debugContent.imageSets[i][j]);
          allGood = false;
        }
      }
    }
    if (allGood) console.log("[DEBUG] image list good");
  }

  if (debugContent) {
    console.log("[DEBUG] verifying gaussian original images....");
    let allGood = true;
    for (let i = 0; i < imageList.length; i++) {
      const image = imageList[i];
      for (let j = 0; j < image.data.length; j++) {
        if (image.data[j] !== debugContent.pyramidOriginalImages[i].values[j]) {
          console.log("pyramid original image pixel incorrect: ", i, j, image.data[j], debugContent.pyramidOriginalImages[i].values[j]);
          allGood = false;
        }
      }
    }
    if (allGood) console.log("[DEBUG] gaussian original images good");
  }

  const refPoints = [];
  for (let i = 0; i < imageList.length; i++) {
    const image = imageList[i];

    const points = kpmExtract({imageData: image.data, width: image.width, height: image.height, dpi: dpiList[i], pageNo: 1, imageNo: i, debugContent});

    for (let j = 0; j < points.length; j++) {
      refPoints.push(points[j]);
    }
  }

//  console.log(debugContent.freak[1427].samples);

  if (debugContent) {
    console.log("[DEBUG] fset 3");
    let allGood = true;

    const pageInfo = debugContent.fSets3.pageInfo[0];
    if (pageInfo.imageNum !== imageList.length) {
      console.log("incorrect image num: ", pageInfo.imageNum, 'vs', imageList.length);
      allGood = false;
    }
    for (let i = 0; i < imageList.length; i++) {
      if (imageList[i].width !== pageInfo.imageInfo[i].width || imageList[i].height !== pageInfo.imageInfo[i].height) {
        console.log('incorrect image size', i, imageList[i].width, imageList[i].height, 'vs', pageInfo.imageInfo[i].width, pageInfo.imageInfo[i].height);
        allGood = false;
      }
    }

    const debugRefPoints = debugContent.fSets3.refPoint;
    if (debugRefPoints.length !== refPoints.length) {
      console.log("incorrect ref points num: ", debugRefPoints.length, 'vs', refPoints.length)
    }
    for (let i = 0; i < refPoints.length; i++) {
      const p1 = refPoints[i];
      const p2 = debugRefPoints[i];

      if (p1.imageIndex !== p2.refImageNo
        || Math.abs(p1.x2D - p2.coord2D.x) > EPSILON || Math.abs(p1.y2D - p2.coord2D.y) > EPSILON
        || Math.abs(p1.x3D - p2.coord3D.x) > EPSILON || Math.abs(p1.y3D - p2.coord3D.y) > EPSILON
        || Math.abs(p1.angle - p2.angle) > EPSILON || Math.abs(p1.scale - p2.scale) > EPSILON
        || (!!p1.maxima !== !!p2.featureVec.maxima)
      ) {
        console.log("incorrect point propertyes")
        console.log("ref imagge: ", p1.imageIndex, p2.refImageNo);
        console.log("point 2D", i, p1.x2D, p1.y2D, p2.coord2D.x, p2.coord2D.y);
        console.log("point 3D", i, p1.x3D, p1.y3D, p2.coord3D.x, p2.coord3D.y);
        console.log("feature", i, p1.angle, p1.scale, p1.maxima, p2.featureVec.angle, p2.featureVec.scale, p2.featureVec.maxima);
        allGood = false;
      }

      const vs = [];
      for (let j = 0; j < 96; j++) vs.push(0);

      for (let j = 0; j < p1.descriptors.length; j+=8) {
        let v = 0;
        for (let k = 0; k < 8; k++) {
          if (p1.descriptors[j+k]) {
            v = v + (1 << k);
          }
        }
        vs[j/8] = v;
      }

      let dCorrect = true;
      for (let j = 0; j < p2.featureVec.v.length; j++) {
        if (p2.featureVec.v[j] !== vs[j]) {
          console.log("incorrect v: ", j);
          dCorrect = false;
        }
      }
      if (!dCorrect) {
        console.log("incorrect desc", i, JSON.stringify(vs), JSON.stringify(p2.featureVec.v));
        allGood = false;
      }
    }
  }

  return;

  for (let i = 0; i < imageList.length; i++) {
    const image = imageList[i];
    const {featureMap, coords} = extract({imageData: image.data, width: image.width, height: image.height, dpi: dpiList[i]});

    const featureSet = {};
    featureSet.scale = i;
    featureSet.num = coords.length;
    featureSet.mindpi = (i === imageList.length-1)? dpiList[i] * 0.5: dpiList[i+1];
    featureSet.maxdpi = (i === 0)? dpiList[i] * 2: (dpiList[i] * 0.8 + dpiList[i-1] * 0.2);
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

    if (DEBUG) {
      const targetMap = debugContent.featureMaps[i];
      for (let i = 0; i < featureMap.length; i++) {
        if ( Math.abs(featureMap[i] - targetMap[i]) > EPSILON) {
          console.log('[DEBUG] incorrect feature map value: ', i, featureMap[i], targetMap[i]);
        }
      }

      const targetSet = debugContent.featureSets[i];
      if (Math.abs(targetSet.mindpi - featureSet.mindpi) > EPSILON) console.log("incorrect mindpi: ", i, targetSet.mindpi, featureSet.mindpi);
      if (Math.abs(targetSet.maxdpi - featureSet.maxdpi) > EPSILON) console.log("incorrect maxdpi: ", i, targetSet.maxdpi, featureSet.maxdpi);
      if (Math.abs(targetSet.scale - featureSet.scale) > EPSILON) console.log("incorrect scale: ", i, targetSet.scale, featureSet.scale);
      if (Math.abs(targetSet.num - featureSet.num) > EPSILON) console.log("incorrect num: ", i, targetSet.num, featureSet.num);
      for (let j = 0; j < targetSet.num; j++) {
        let c1 = targetSet.coords[j];
        let c2 = featureSet.coords[j];
        if ( Math.abs(c1.x - c2.x) > EPSILON || Math.abs(c1.y - c2.y) > EPSILON || Math.abs(c1.mx - c2.mx) > EPSILON || Math.abs(c1.my - c2.my) > EPSILON || Math.abs(c1.maxSim - c2.maxSim) > EPSILON) {
          console.log("incoorrct coord: ", j, c1, c2);
        }
      }
    }
  }

  var _end = new Date().getTime();
  console.log('exec time: ', _end - _start);
}

exec();
