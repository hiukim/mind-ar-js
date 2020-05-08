const {Image} = require('image-js');
const path = require('path');
const {debugImageData} = require('../utils/debug.js');

const SEARCH_SIZE1 = 10;
const SEARCH_SIZE2 = 2;
const TEMPLATE_SIZE = 22;
const MAP_SEARCH_SIZE1 = 10;
const MAP_SEARCH_SIZE2 = 2;
const MAX_SIM_THRESH = 0.95;
const TEMPLATE_SD_THRESH = 5.0;

const MAX_THRESH = 0.9;
const MIN_THRESH = 0.55;
const SD_THRESH = 8.0;
const OCCUPANCY_SIZE = 24 * 2 / 3;

/*
 * Input image is in grey format. the imageData array size is width * height. value range from 0-255
 * pixel value at row r and c = imageData[r * width + c]
 *
 * @param {Uint8Array} options.imageData
 * @param {int} options.width image width
 * @param {int} options.height image height
 */
const extract = (options) => {
  const {imageData, width, height, dpi} = options;

  // Step 1 - filter out interesting points. Interesting points have strong pixel value changed across neighbours
  const isPixelSelected = [width * height];
  for (let i = 0; i < isPixelSelected.length; i++) isPixelSelected[i] = false;

  // Step 1.1 consider a pixel at position (x, y). compute:
  //   dx = ((data[x+1, y-1] - data[x-1, y-1]) + (data[x+1, y] - data[x-1, y]) + (data[x+1, y+1] - data[x-1, y-1])) * 256 / 3
  //   dy = ((data[x+1, y+1] - data[x+1, y-1]) + (data[x, y+1] - data[x, y-1]) + (data[x-1, y+1] - data[x-1, y-1])) * 256 / 3
  //   dValue =  sqrt(dx^2 + dy^2) / 2;
  const dValue = new Float32Array(imageData.length);
  for (let i = 0; i < width; i++) {
    dValue[i] = -1;
    dValue[width * (height-1) + i] = -1;
  }
  for (let j = 0; j < height; j++) {
    dValue[j*width] = -1;
    dValue[j*width + width-1] = -1;
  }

  for (let i = 1; i < width-1; i++) {
    for (let j = 1; j < height-1; j++) {
      let pos = i + width * j;

      let dx = 0.0;
      let dy = 0.0;
      for (let k = -1; k <= 1; k++) {
        dx += (imageData[pos + width*k + 1] - imageData[pos + width*k -1]);
        dy += (imageData[pos + width + k] - imageData[pos - width + k]);
      }
      dx /= (3 * 256);
      dy /= (3 * 256);
      dValue[pos] = Math.sqrt( (dx * dx + dy * dy) / 2);
    }
  }

  // Step 1.2 - select all pixel which is dValue largest than all its neighbour as "potential" candidate
  //  the number of selected points is still too many, so we use the value to further filter (e.g. largest the dValue, the better)
  const dValueHist = new Uint8Array(1000);
  for (let i = 0; i < 1000; i++) dValueHist[i] = 0;
  const neighbourOffsets = [-1, 1, -width, width];
  let allCount = 0;
  for (let i = 1; i < width-1; i++) {
    for (let j = 1; j < height-1; j++) {
      let pos = i + width * j;
      let isMax = true;
      for (let d = 0; d < neighbourOffsets.length; d++) {
        if (dValue[pos] <= dValue[pos + neighbourOffsets[d]]) {
          isMax = false;
          break;
        }
      }
      if (isMax) {
        let k = Math.floor(dValue[pos] * 1000);
        if (k > 999) k = 999;
        if (k < 0) k = 0;
        dValueHist[k] += 1;
        allCount += 1;
        isPixelSelected[pos] = true;
      }
    }
  }

  const maxPoints = 0.02 * width * height;
  let k = 999;
  let filteredCount = 0;
  while (k >= 0) {
    filteredCount += dValueHist[k];
    if (filteredCount > maxPoints) break;
    k--;
  }

  console.log("image size: ", width * height);
  console.log("extracted featues: ", allCount);
  console.log("filtered featues: ", filteredCount);

  for (let i = 0; i < isPixelSelected.length; i++) {
    if (isPixelSelected[i]) {
      if (dValue[i] * 1000 < k) isPixelSelected[i] = false;
    }
  }

  console.log("selected count: ", isPixelSelected.reduce((a, b) => {return a + (b?1:0);}, 0));

  // Step 2
  const featureMap = new Float32Array(imageData.length);
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const pos = j * width + i;
      if (!isPixelSelected[pos]) {
        featureMap[pos] = 1.0;
        continue;
      }

      const ret = _makeTemplate({imageData: imageData, width: width, height: height, cx: i, cy: j, templateSize: TEMPLATE_SIZE, sdThresh: TEMPLATE_SD_THRESH});
      if (ret === null) {
        featureMap[pos] = 1.0;
        continue;
      }

      const {template, vlen} = ret;

      let max = -1.0;
      for (let ii = -SEARCH_SIZE1; ii <= SEARCH_SIZE1; ii++) {
        for (let jj = -SEARCH_SIZE1; jj <= SEARCH_SIZE1; jj++) {
          if (ii * ii + jj * jj <= SEARCH_SIZE2 * SEARCH_SIZE2) continue;
          const sim = _getSimilarity({imageData, width, height, cx: i+ii, cy: j+jj, templateSize: TEMPLATE_SIZE, vlen: vlen, template: template});
          if (sim === null) continue;

          if (sim > max) {
            max = sim;
            if (max > MAX_SIM_THRESH) break;
          }
        }
        if (max > MAX_SIM_THRESH) break;
      }
      featureMap[pos] = max;
    }
  }
  // debugImageData({filename: "./featureMap_"+width+".png", data: featureMap, height: height, width: width});

  // Step 2.2 select feature
  const coords = _selectFeature({imageData, width, height, dpi, featureMap, templateSize: TEMPLATE_SIZE, searchSize: SEARCH_SIZE2, occSize: OCCUPANCY_SIZE, maxSimThresh: MAX_THRESH, minSimThresh: MIN_THRESH, sdThresh: SD_THRESH});

  return {featureMap, coords}
}

const _selectFeature = (options) => {
  let {imageData, width, height, dpi, featureMap, templateSize, searchSize, occSize, maxSimThresh, minSimThresh, sdThresh} = options;

  console.log("params: ", templateSize, templateSize, occSize, maxSimThresh, minSimThresh, sdThresh);

  occSize *= 2;

  const divSize = (templateSize * 2 + 1) * 3;
  const xDiv = Math.floor(width / divSize);
  const yDiv = Math.floor(height / divSize);

  const maxFeatureNum = Math.floor(width / occSize) * Math.floor(height / occSize) + xDiv * yDiv;
  console.log("max feature num: ", maxFeatureNum);

  const coords = [];
  const image2 = new Float32Array(imageData.length);
  for (let i = 0; i < image2.length; i++) {
    image2[i] = featureMap[i];
  }

  let num = 0;
  while (num < maxFeatureNum) {
    let minSim = maxSimThresh;
    let cx = -1;
    let cy = -1;
    for (let j = 0; j < height; j++) {
      for (let i = 0; i < width; i++) {
        if (image2[j*width+i] < minSim) {
          minSim = image2[j*width+i];
          cx = i;
          cy = j;
        }
      }
    }
    if (cx === -1) break;

    const ret = _makeTemplate({imageData, width, height, cx, cy, templateSize, sdThresh: 0.0});
    if (ret === null) {
      image2[ cy * width + cx ] = 1.0;
      continue;
    }
    const {template, vlen} = ret;
    if (vlen / (templateSize * 2 + 1) < sdThresh) {
      image2[ cy * width + cx ] = 1.0;
      continue;
    }

    let min = 1.0;
    let max = -1.0;

    for (let j = -searchSize; j <= searchSize; j++) {
      for (let i = -searchSize; i <= searchSize; i++) {
        if (i*i + j*j > searchSize * searchSize) continue;
        if (i === 0 && j === 0) continue;

        const sim = _getSimilarity({imageData, width, height, template, vlen, templateSize, cx: cx+i, cy: cy+j});
        if (sim === null) continue;

        if (sim < min) {
          min = sim;
          if (min < minSimThresh && min < minSim) break;
        }
        if (sim > max) {
          max = sim;
          if (max > 0.99) break;
        }
      }
      if( (min < minSimThresh && min < minSim) || max > 0.99 ) break;
    }

    if( (min < minSimThresh && min < minSim) || max > 0.99 ) {
        image2[ cy * width + cx ] = 1.0;
        continue;
    }

    coords.push({
      x: cx,
      y: cy,
      mx: 1.0 * cx / dpi * 25.4,
      my: 1.0 * (height - cy) / dpi * 25.4,
      maxSim: minSim,
    })

    num += 1;
    console.log(num, '(', cx, ',', cy, ')', minSim, 'min = ', min, 'max = ', max, 'sd = ', vlen/(templateSize*2+1));

    for (let j = -occSize; j <= occSize; j++) {
      for (let i = -occSize; i <= occSize; i++) {
        if (cy + j < 0 || cy + j >= height || cx + i < 0 || cx + i >= width) continue;
        image2[ (cy+j)*width + (cx+i) ] = 1.0;
      }
    }
  }
  return coords;
}

const _makeTemplate = (options) => {
  const {imageData, width, height, cx, cy, templateSize, sdThresh} = options;

  if (cx - templateSize < 0 || cx + templateSize >= width) return null;
  if (cy - templateSize < 0 || cy + templateSize >= height) return null;

  const templateWidth = 2 * templateSize + 1;

  let average = 0.0;
  for (let i = cx - templateSize; i <= cx + templateSize; i++) {
    for (let j = cy - templateSize; j <= cy + templateSize; j++) {
      average += imageData[j*width+i];
    }
  }
  average /= (templateWidth * templateWidth);

  const template = [];
  let vlen = 0.0;
  for (let i = cx - templateSize; i <= cx + templateSize; i++) {
    for (let j = cy - templateSize; j <= cy + templateSize; j++) {
      const diff = imageData[j*width+i] - average;
      const templateX = i - (cx - templateSize);
      const templateY = j - (cy - templateSize);
      template[templateY * templateWidth + templateX] = diff;
      vlen += (diff*diff);
    }
  }

  if (vlen == 0) return null;
  if (vlen / (templateWidth * templateWidth) < sdThresh) return null;
  vlen = Math.sqrt(vlen);

  return {template: template, vlen: vlen};
}

const _getSimilarity = (options) => {
  const {imageData, width, height, cx, cy, template, vlen, templateSize} = options;

  if (cx - templateSize < 0 || cx + templateSize >= width) return null;
  if (cy - templateSize < 0 || cy + templateSize >= height) return null;

  const templateWidth = 2 * templateSize + 1;

  let sx = 0.0;
  let sxx = 0.0;
  let sxy = 0.0;

  for (let i = cx - templateSize; i <= cx + templateSize; i++) {
    for (let j = cy - templateSize; j <= cy + templateSize; j++) {
      const v = imageData[j*width+i];
      const templateX = i - (cx - templateSize);
      const templateY = j - (cy - templateSize);
      sx += v;
      sxx += v * v;
      sxy += v * template[templateY * templateWidth + templateX];
    }
  }

  let vlen2 = sxx - sx*sx / (templateWidth * templateWidth);
  if (vlen2 == 0) return null;
  vlen2 = Math.sqrt(vlen2);

  const sim = sxy / (vlen * vlen2);
  return sim;
}

module.exports = {
  extract
};
