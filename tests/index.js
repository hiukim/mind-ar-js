const fs = require('fs');
const {Image} = require('image-js');
const path = require('path');
const {extract} = require('../lib/features/index.js');
const {debugImageData} = require('../lib/utils/debug.js');

const DEFAULT_DPI = 72;
const MIN_IMAGE_PIXEL_SIZE = 28;
const EPSILON = 0.01;

const DEBUG = false;
let debugContent = null;

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
          sum += image.data[jj * image.width + ii];
          count += 1;
        }
      }
      imageData[j * width + i] = Math.floor(1.0 * sum / count);
    }
  }
  //debugImageData({filename: "./resize_"+width+".png", data: imageData, height: height, width: width});

  return {data: imageData, width: width, height: height};
}

const exec = async() => {
  var _start = new Date().getTime();

  if (DEBUG) {
    debugContent = JSON.parse(fs.readFileSync("/Users/hiukim/Desktop/kimDebugData.txt", 'utf8'));
  }

  const imagePath = path.join(__dirname, 'card.png');
  const image = await new Promise((resolve, reject) => {
    Image.load(imagePath).then((image) => {
      //console.log('Width', image.width);
      //console.log('Height', image.height);
      //console.log('colorModel', image.colorModel);
      //console.log('components', image.components);
      //console.log('alpha', image.alpha);
      //console.log('channels', image.channels);
      //console.log('bitDepth', image.bitDepth);
      //console.log('data', image.data.length);
      resolve(image);
    });
  });

  const greyImage = image.grey({algorithm: "average"});
  const dpi = DEFAULT_DPI;
  const minDpi = Math.floor(1.0 * MIN_IMAGE_PIXEL_SIZE / Math.min(greyImage.width, greyImage.height) * dpi * 1000) / 1000;

  const dpiList = [];
  let c = minDpi;
  while (true) {
    dpiList.push(c);
    c *= Math.pow(2.0, 1.0/3.0);
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
  console.log("image list: ", imageList.length);

  if (DEBUG) {
    // verify image
    let allGood = true;
    for (let i = 0; i < imageList.length; i++) {
      const image = imageList[i];
      for (let j = 0; j < image.data.length; j++) {
        if (image.data[j] !== debugContent.imageSets[i][j]) {
          console.log("[DEBUG] incorrect image pixe: ", i, image.data[j], debugContent.imageSets[i][j]);
          allGood = false;
        }
      }
    }
    if (allGood) console.log("[DEBUG] all image good");
  }

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
