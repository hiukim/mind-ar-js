const fs = require('fs');
const {Image} = require('image-js');
const path = require('path');
const {extract} = require('../lib/features/index.js');
const {debugImageData} = require('../lib/utils/debug.js');

const DEFAULT_DPI = 72;
const MIN_IMAGE_PIXEL_SIZE = 28;
const EPSILON = 0.00001;

const DEBUG = true;
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
  if (DEBUG) {
    debugContent = JSON.parse(fs.readFileSync("/Users/hiukim/Desktop/kimDebugData.txt", 'utf8'));
    //console.log("debug content: ", debugContent);
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


  //const targetImages = content.split('|');

  for (let i = 0; i < imageList.length; i++) {
    const image = imageList[i];
    const {featureMap} = extract({imageData: image.data, width: image.width, height: image.height, dpi: dpiList[i]});

    if (DEBUG) {
      const targetMap = debugContent.featureMaps[i];
      for (let i = 0; i < featureMap.length; i++) {
        if ( Math.abs(featureMap[i] - targetMap[i]) > EPSILON) {
          console.log('[DEBUG] incorrect feature map value: ', i, featureMap[i], targetMap[i]);
        }
      }
    }
  }

  /*
  const content = fs.readFileSync("/Users/hiukim/Desktop/scale0Image.txt", 'utf8');
  const targetImages = content.split('|');
  for (let k = 0; k < targetImages.length; k++) {
    console.log("image at: ", k);
    const targetImage = targetImages[k].split(",");
    if (targetImage.length !== imageList[k].data.length) {
      console.log("wrong size: ", k, targetImage.length, imageList[k].data.length);
    }
    for (let i = 0; i < targetImage.length; i++) {
      if ( parseInt(targetImage[i]) !== parseInt(imageList[k].data[i])) {
        console.log('wrong: ', i, targetImage[i], imageList[k].data[i]);
      }
    }
  }
  */
}

exec();
