const {GPU} = require('gpu.js');
//const gpu = new GPU({mode: 'debug'});
const gpu = new GPU();
console.log("gpu", gpu);

const LAPLACIAN_SQR_THRESHOLD = 3 * 3;
const MAX_FEATURE_POINTS = 500;
const PRUNE_FEATURES_NUM_BUCKETS = 10; // per dimension
const ORIENTATION_NUM_BINS = 36;
const ORIENTATION_SMOOTHING_ITERATIONS = 5;
const ORIENTATION_PEAK_THRESHOLD = 0.8;

// 37 points = 6 rings x 6 points per ring + 1 center
const FREAK_RINGS = [
  // ring 5
  {
    sigma: 0.550000,
    points: [
      [-1.000000, 0.000000],
      [-0.500000, -0.866025],
      [0.500000, -0.866025],
      [1.000000, -0.000000],
      [0.500000, 0.866025],
      [-0.500000, 0.866025]
    ]
  },
  // ring 4
  {
    sigma: 0.475000,
    points: [
      [0.000000, 0.930969],
      [-0.806243, 0.465485],
      [-0.806243, -0.465485],
      [-0.000000, -0.930969],
      [0.806243, -0.465485],
      [0.806243, 0.465485]
    ]
  },
  // ring 3
  {
    sigma: 0.400000,
    points: [
      [0.847306, -0.000000],
      [0.423653, 0.733789],
      [-0.423653, 0.733789],
      [-0.847306, 0.000000],
      [-0.423653, -0.733789],
      [0.423653, -0.733789]
    ]
  },
  // ring 2
  {
    sigma: 0.325000,
    points: [
      [-0.000000, -0.741094],
      [0.641806, -0.370547],
      [0.641806, 0.370547],
      [0.000000, 0.741094],
      [-0.641806, 0.370547],
      [-0.641806, -0.370547]
    ]
  },
  // ring 1
  {
    sigma: 0.250000,
    points: [
      [-0.595502, 0.000000],
      [-0.297751, -0.515720],
      [0.297751, -0.515720],
      [0.595502, -0.000000],
      [0.297751, 0.515720],
      [-0.297751, 0.515720]
    ]
  },
  // ring 0
  {
    sigma: 0.175000,
    points: [
      [0.000000, 0.362783],
      [-0.314179, 0.181391],
      [-0.314179, -0.181391],
      [-0.000000, -0.362783],
      [0.314179, -0.181391],
      [0.314179, 0.181391]
    ]
  },
  // center
  {
    sigma: 0.100000,
    points: [
      [0, 0]
    ]
  }
];

const freakPoints = [];
for (let r = 0; r < FREAK_RINGS.length; r++) {
  const sigma = FREAK_RINGS[r].sigma;
  for (let i = 0; i < FREAK_RINGS[r].points.length; i++) {
    const point = FREAK_RINGS[r].points[i];
    freakPoints.push([sigma, point[0], point[1]]);
  }
}
//console.log("freakPoints", freakPoints);

const detect = ({image, numScalesPerOctaves, minSize, correctResult, correctResult3}) => {
  const {data, width, height} = image;

  const numOctaves = _numOctaves({width, height, minSize: minSize});
  //console.log("num octaves", numOctaves);

  if (typeof window !== 'undefined' && window.DEBUG_TIME) {
    var _start = new Date().getTime();
  }

  const inputImage = {width: image.width, height: image.height, data: new Float32Array(width * height)};
  for (let i = 0; i < inputImage.data.length; i++) inputImage.data[i] = image.data[i];

  let kernelIndex = 0;

  //const gPyramid = _buildGaussianPyramid(kernelIndex++, image, numOctaves, numScalesPerOctaves);
  //const gPyramid = _buildGaussianPyramid(kernelIndex++, image, 1, 1);

  const pyramidImages = [];
  for (let i = 0; i < numOctaves; i++) {
    if (i === 0) {
      pyramidImages.push(_applyFilter(kernelIndex++, inputImage));
    } else {
      // first image of each octave, downsample from previous
      pyramidImages.push(_downsampleBilinear(kernelIndex++, pyramidImages[pyramidImages.length-1]));
    }

    // remaining images of octave, 4th order binomail from previous
    for (let j = 0; j < numScalesPerOctaves - 1; j++) {
      pyramidImages.push(_applyFilter(kernelIndex++, pyramidImages[pyramidImages.length-1]));
    }
  }

  if (typeof window !== 'undefined' && window.DEBUG_TIME) {
    console.log('exec time until pyramid', new Date().getTime() - _start);
  }

  /*
  let curIndex = 0;
  let totalSize = 0;
  for (let i = 0; i < pyramidImages.length; i++) {
    let incorrectCount = 0;
    const vs = pyramidImages[i].data.toArray();
    totalSize += vs.length;
    for (let j = 0; j < vs.length; j++) {
      if (all[curIndex++] !== vs[j]) {
        incorrectCount += 1;
        if (incorrectCount < 5) {
          console.log("INCORRECT", i, j, all[curIndex-1], vs[j]);
        }
      }
    }
  }
  console.log("total size", all.length, totalSize);
  */

  //const gaussianImages = _stackImages(kernelIndex++, pyramidImages);
  //return [];
  //return [];

  //const gaussianImageSizes = [];
  //for (let k = 0; k < pyramidImages.length; k++) {
  //  gaussianImageSizes.push([image.width, image.height]);
  //}

  if (typeof window !== 'undefined' && window.DEBUG_TIME) {
    console.log('exec time until pyramid stack', new Date().getTime() - _start);
  }

  /*
  const gaussianImageSizes = [];
  const gaussianImagesData = gaussianImages.toArray();
  let incorrectCount = 0;
  for (let k = 0; k < pyramidImages.length; k++) {
    const image = pyramidImages[k];
    gaussianImageSizes.push([image.width, image.height]);

    const imageData = image.data.toArray();
    for (let i = 0; i < image.width; i++) {
      for (let j = 0; j < image.height; j++) {
        if (imageData[j * image.width + i] !== gaussianImagesData[k][j][i]) {
          if (incorrectCount < 1000) {
            console.log("INCORREECT gaussina image k j i: ", k, j, i, ':', imageData[j * image.width + i], gaussianImagesData[k][j][i]);
            incorrectCount += 1;
          }
        }
      }
    }
  }
  console.log("gaussianImages", gaussianImagesData);
  console.log("gaussianImagesSizes", gaussianImageSizes);
  */

  // compute feature orientations
  const gradients = [];
  for (let k = 0; k < pyramidImages.length; k++) {
    //gradients.push(_computeGradients(kernelIndex++, pyramidImages[k], gaussianImages, k));
    gradients.push(_computeGradients(kernelIndex++, pyramidImages[k]));
  }

  if (typeof window !== 'undefined' && window.DEBUG_TIME) {
    console.log('exec time until compute gradients', new Date().getTime() - _start);
  }

  /*
  for (let k = 0; k < pyramidImages.length; k++) {
    const pyramidImageData = pyramidImages[k].data.toArray();
    const gradientMags = gradients[k].saveMag.toArray();
    const gradientAngles = gradients[k].result.toArray();
    const dx = gradients[k].saveDx.toArray();
    const dy = gradients[k].saveDy.toArray();
    let count = 0;
    for (let i = 0; i < gradientMags.length; i++) {
      if (Math.abs(gradientMags[i] - correctResult3.gradients[k].values[i].mag) > 0.0001) {
        console.log("INCORRECT mag");
        break;
      }
      if (Math.abs(gradientAngles[i] - correctResult3.gradients[k].values[i].angle) > 0.01) {
        console.log("INCORRECT angle", k, i, gradientAngles[i], correctResult3.gradients[k].values[i].angle);
        console.log("dx dy", dx[i], dy[i], 'msg: ', gradientMags[i], correctResult3.gradients[k].values[i].mag);
        console.log(pyramidImageData[i], pyramidImageData[i + pyramidImages[k].width], pyramidImageData[i + pyramidImages[k].width], pyramidImageData[i-1], pyramidImageData[i+1]);
        count += 1;
      }
      if (count === 100) break;
    }
    //console.log('compare', gradientMags, gradientAngles, correctResult3.gradients[k].values);
  }
  */

  const gaussianPyramid = {
    numOctaves: numOctaves,
    numScalesPerOctaves: numScalesPerOctaves,
    images: pyramidImages
  }

  const dogPyramidImages = [];
  for (let i = 0; i < numOctaves; i++) {
    for (let j = 0; j < numScalesPerOctaves - 1; j++) {
      const image1 = gaussianPyramid.images[i * gaussianPyramid.numScalesPerOctaves + j];
      const image2 = gaussianPyramid.images[i * gaussianPyramid.numScalesPerOctaves + j + 1];
      dogPyramidImages.push(_differenceImageBinomial(kernelIndex++, image1, image2));
    }
  }
  const dogPyramid = {
    numOctaves: numOctaves,
    numScalesPerOctaves: numScalesPerOctaves - 1,
    images: dogPyramidImages
  }

  if (typeof window !== 'undefined' && window.DEBUG_TIME) {
    console.log('exec time until DOG', new Date().getTime() - _start);
  }

  const originalWidth = dogPyramid.images[0].width;
  const originalHeight = dogPyramid.images[0].height;

  let prunedExtremas = initialPrune(kernelIndex++);

  const featurePoints = [];
  for (let k = 1; k < dogPyramid.images.length - 1; k++) {
    let image0 = dogPyramid.images[k-1];
    let image1 = dogPyramid.images[k];
    let image2 = dogPyramid.images[k+1];

    const octave = Math.floor(k / dogPyramid.numScalesPerOctaves);
    const scale = k % dogPyramid.numScalesPerOctaves;
    // let gaussianImage = pyramidImages[octave * gaussianPyramid.numScalesPerOctaves + scale];

    let hasUpsample = false;
    let hasPadOneWidth = false;
    let hasPadOneHeight = false;

    if ( Math.floor(image0.width/2) == image1.width) {
      image0 = _downsampleBilinear(kernelIndex++, image0);
    }
    if ( Math.floor(image1.width/2) == image2.width) {
      hasUpsample = true;
      hasPadOneWidth = image1.width % 2 === 1;
      hasPadOneHeight = image1.height % 2 === 1;
      image2 = _upsampleBilinear(kernelIndex++, image2, hasPadOneWidth, hasPadOneHeight);
    }

    // In upsample image, ignore the border
    // it's possible to further pad one more line (i.e. upsacale 2x2 -> 5x5) at the end, so ignore one more line
    let startI = hasUpsample? 2: 1;
    let startJ = startI;

    // should it be "image1.width -2" ? but this yield consistent result with artoolkit
    let endI = hasUpsample? image1.width - 3: image1.width - 1;
    let endJ = hasUpsample? image1.height - 3: image1.height - 1;
    if (hasPadOneWidth) endI -= 1;
    if (hasPadOneHeight) endJ -= 1;

    const extremasResult = _buildExtremas(kernelIndex++, image0, image1, image2, octave, scale, originalWidth, originalHeight, dogPyramid.numScalesPerOctaves, startI, startJ, endI, endJ);

    if (typeof window !== 'undefined' && window.DEBUG_TIME) {
      console.log('exec time until build extremas', k,  new Date().getTime() - _start);
    }

    /*
    const extremasResult = _reduceExtremasResult(kernelIndex++, extremasResult1, image1.width, image1.height);
    if (typeof window !== 'undefined' && window.DEBUG_TIME) {
      console.log('exec time until build extremas reduce 1', k,  new Date().getTime() - _start);
    }
    //console.log("extremasresult", extremasResult);
    const extremasResult = _reduceExtremasResult(kernelIndex++, extremasResult2, Math.floor(image1.width/2), Math.floor(image1.height/2));
    if (typeof window !== 'undefined' && window.DEBUG_TIME) {
      console.log('exec time until build extremas reduce 2', k,  new Date().getTime() - _start);
    }
      */

    prunedExtremas = applyPrune(kernelIndex++, k, prunedExtremas, extremasResult.result, extremasResult.saveScore, extremasResult.saveSigma, extremasResult.saveX, extremasResult.saveY, image1.width, image1.height);


    /*
    const isExtremas = extremasResult.result.toArray();
    const extremaScores = extremasResult.saveScore.toArray();
    const extremaSigmas = extremasResult.saveSigma.toArray();
    const extremaXs = extremasResult.saveX.toArray();
    const extremaYs = extremasResult.saveY.toArray();
    */

    /*
    for (let i = 0; i < isExtremas.length; i++) {
      if (isExtremas[i] === 1) {
        // original x = x*2^n + 2^(n-1) - 0.5
        // original y = y*2^n + 2^(n-1) - 0.5
        const posI = i % image1.width;
        const posJ = Math.floor(i / image1.width);
        const originalX = posI * Math.pow(2, octave) + Math.pow(2, octave-1) - 0.5;
        const originalY = posJ * Math.pow(2, octave) + Math.pow(2, octave-1) - 0.5;
        const newX = extremaXs[i];
        const newY = extremaYs[i];

        let newOctaveX = newX * (1.0 / Math.pow(2, octave)) + 0.5 * (1.0 / Math.pow(2, octave)) - 0.5;
        let newOctaveY = newY * (1.0 / Math.pow(2, octave)) + 0.5 * (1.0 / Math.pow(2, octave)) - 0.5;

        console.log("extream xy", extremaXs[i], extremaYs[i], originalX, originalY, posI, posJ, newOctaveX, newOctaveY);
      }
    }
    */

    /*
    if (typeof window !== 'undefined' && window.DEBUG_TIME) {
      console.log('exec time until feature points toArray', k,  new Date().getTime() - _start);
    }

    for (let i = 0; i < isExtremas.length; i++) {
      if (isExtremas[i] === 1) {
        const newX = extremaXs[i];
        const newY = extremaYs[i];

        const posI = i % image1.width;
        const posJ = Math.floor(i / image1.width);
        const originalX = posI * Math.pow(2, octave) + Math.pow(2, octave-1) - 0.5;
        const originalY = posJ * Math.pow(2, octave) + Math.pow(2, octave-1) - 0.5;

        let newOctaveX = newX * (1.0 / Math.pow(2, octave)) + 0.5 * (1.0 / Math.pow(2, octave)) - 0.5;
        let newOctaveY = newY * (1.0 / Math.pow(2, octave)) + 0.5 * (1.0 / Math.pow(2, octave)) - 0.5;
        newOctaveX = Math.floor(newOctaveX + 0.5);
        newOctaveY = Math.floor(newOctaveY + 0.5);
        const octaveSigma = extremaSigmas[i] * (1.0 / Math.pow(2, octave));

        featurePoints.push({
          octave: octave,
          scale: scale,
          octaveX: newOctaveX,
          octaveY: newOctaveY,
          octaveSigma: octaveSigma,
          x: newX,
          y: newY,
          originalX: originalX,
          originalY: originalY,
          sigma: extremaSigmas[i],
          score: extremaScores[i],
        })
      }
    }
    if (typeof window !== 'undefined' && window.DEBUG_TIME) {
      console.log('exec time until feature points', k,  new Date().getTime() - _start);
    }
    */
  }

  //prunedExtremas = reducePrune(kernelIndex++, prunedExtremas);
  const prunedExtremasArr = prunedExtremas.toArray();
  //return {featurePoints: [], descriptors: []};

  const prunedFeaturePoints = [];
  for (let i = 0; i < prunedExtremasArr.length; i++) {
    for (let j = 0; j < prunedExtremasArr[i].length; j++) {
      if (prunedExtremasArr[i][j][0] !== 0) {
        const ext = prunedExtremasArr[i][j];
        const dogIndex = ext[4];
        const octave = Math.floor(dogIndex / dogPyramid.numScalesPerOctaves);
        const scale = dogIndex % dogPyramid.numScalesPerOctaves;
        const newX = ext[2];
        const newY = ext[3];

        let newOctaveX = newX * (1.0 / Math.pow(2, octave)) + 0.5 * (1.0 / Math.pow(2, octave)) - 0.5;
        let newOctaveY = newY * (1.0 / Math.pow(2, octave)) + 0.5 * (1.0 / Math.pow(2, octave)) - 0.5;
        newOctaveX = Math.floor(newOctaveX + 0.5);
        newOctaveY = Math.floor(newOctaveY + 0.5);
        const octaveSigma = ext[1] * (1.0 / Math.pow(2, octave));

        prunedFeaturePoints.push({
          bucket: i,
          octave: octave,
          scale: scale,
          octaveX: newOctaveX,
          octaveY: newOctaveY,
          octaveSigma: octaveSigma,
          octave: octave,
          scale: scale,
          score: ext[0],
          sigma: ext[1],
          x: ext[2],
          y: ext[3],
        });
      }
    }
  }
  //console.log("pruned extremas count", prunedFeaturePoints2.length);
  //console.log("prunedFeaturePoints2", prunedFeaturePoints2);

  //let prunedFeaturePoints = _pruneFeatures({featurePoints: featurePoints, width: originalWidth, height: originalHeight});
  //console.log("prunedFeature count", prunedFeaturePoints.length);
  //console.log("prunedFeaturePoints", prunedFeaturePoints);

  /*
  for (let i = 0; i < prunedFeaturePoints.length; i++) {
    const p1 = prunedFeaturePoints[i];
    const p2 = prunedFeaturePoints2[i];
    console.log("p1 p2", i, p1.x, p1.y, 'vs', p2.x, p2.y);
  }
  */

  if (typeof window !== 'undefined' && window.DEBUG_TIME) {
    console.log('exec time until feature points prune', new Date().getTime() - _start);
  }

  const orientedFeaturePoints = [];
  const descriptors = [];

  const featurePointsByGaussianIndex = [];
  for (let i = 0; i < gaussianPyramid.images.length; i++) {
    featurePointsByGaussianIndex.push([]);
  }
  for (let i = 0; i < prunedFeaturePoints.length; i++) {
    const fp = prunedFeaturePoints[i];
    const gaussianIndex = fp.octave * gaussianPyramid.numScalesPerOctaves + fp.scale;
    featurePointsByGaussianIndex[gaussianIndex].push(fp);
  }
  for (let i = 0; i < gaussianPyramid.images.length; i++) {
    const gaussianIndex = i;
    const gaussianImage = gaussianPyramid.images[gaussianIndex];
    const gradientMags = gradients[gaussianIndex].saveMag;
    const gradientAngles = gradients[gaussianIndex].result;
    //console.log("gradient mags", gradientMags.toArray());
    //console.log("gradient angles", gradientAngles.toArray());
    //console.log("featurePointsByGaussianIndex", featurePointsByGaussianIndex[i]);
    //

    const _histograms = _computeOrientationHistograms(kernelIndex++, gradientMags, gradientAngles, gaussianImage.width, gaussianImage.height, featurePointsByGaussianIndex[i]);

    if (featurePointsByGaussianIndex[i].length === 0) continue;

    const histograms = _histograms.toArray();

    //const x0 = _histograms.saveX0.toArray();
    //const x1 = _histograms.saveX1.toArray();
    //const y0 = _histograms.saveY0.toArray();
    //const y1 = _histograms.saveY1.toArray();
    //const histograms = _histograms.result.toArray();
    //console.log("histograms", x0, x1, y0, y1, histograms);
    //console.log("histograms", histograms);

    const orientedFeaturePointsByGaussianIndex = [];
    for (let j = 0; j < featurePointsByGaussianIndex[i].length; j++) {
      const fp = featurePointsByGaussianIndex[i][j];
      const angles = _computeOrientations(histograms[j]);

      for (let k = 0; k < angles.length; k++) {
        orientedFeaturePointsByGaussianIndex.push(Object.assign({
          angle: angles[k]
        }, fp));
      }
    }
    //const _freakValues2 = __computeFreak(kernelIndex++, gaussianImages, gaussianImageSizes, gaussianPyramid.numOctaves,  gaussianPyramid.numScalesPerOctaves, orientedFeaturePointsByGaussianIndex);

    const _freakValues = _computeFreak(kernelIndex++, gaussianPyramid.images, gaussianPyramid.numOctaves,  gaussianPyramid.numScalesPerOctaves, orientedFeaturePointsByGaussianIndex);

    const freakValues = _freakValues.toArray();
    //const freakValues2 = _freakValues2.toArray();
    //console.log("freak values", freakValues);
    //console.log("freak values 2", freakValues2);

    for (let p = 0; p < orientedFeaturePointsByGaussianIndex.length; p++) {
      orientedFeaturePoints.push(orientedFeaturePointsByGaussianIndex[p]);

      const desc = [];
      for (let m = 0; m < freakPoints.length; m++) {
        for (let n = m+1; n < freakPoints.length; n++) {
          // avoid too senstive to rounding precision
          desc.push(freakValues[p][m] < freakValues[p][n] + 0.0001);
        }
      }
      //console.log("desc", desc);

      // encode descriptors in binary format
      // 37 samples = 1+2+3+...+36 = 666 comparisons = 666 bits
      // ceil(666/32) = 84 numbers (32bit number)
      const descBit = [];
      let temp = 0;
      let count = 0;
      for (let m = 0; m < desc.length; m++) {
        if (desc[m]) temp += 1;
        count += 1;
        if (count === 32) {
          descBit.push(temp);
          temp = 0;
          count = 0;
        } else {
          temp = (temp << 1) >>> 0; // >>> 0 to make it unsigned
        }
      }
      descBit.push(temp);

      descriptors.push(descBit);
    }
  }
  if (typeof window !== 'undefined' && window.DEBUG_TIME) {
    console.log('exec time until done', new Date().getTime() - _start);
  }
  return {featurePoints: orientedFeaturePoints, descriptors};

  /*
  console.log("initial feature points count: ", featurePoints.length, 'vs', correctResult.featurePoints.length);
  console.log("pruned feature points", prunedFeaturePoints.length, 'vs', correctResult.prunedFeaturePoints.length);
  console.log("oriented feature points", orientedFeaturePoints.length, 'vs', correctResult.orientedFeaturePoints.length);

  correctResult.orientedFeaturePoints.sort((fp1, fp2) => {
    const gaussianIndex1 = fp1.octave * gaussianPyramid.numScalesPerOctaves + fp1.scale;
    const gaussianIndex2 = fp2.octave * gaussianPyramid.numScalesPerOctaves + fp2.scale;
    return gaussianIndex1 - gaussianIndex2;
  });

  for (let i = 0; i < orientedFeaturePoints.length; i++) {
    const f1 = orientedFeaturePoints[i];
    const f2 = correctResult.orientedFeaturePoints[i];
    if (Math.abs(f1.angle - f2.angle) > 0.0001) {
      console.log("INCORRECT compare angle", f1.angle, f2.angle);
    }
    if (Math.abs(f1.score - f2.score) > 0.0001) {
      console.log("INCORRECT compare score", f1.score, f2.score);
    }
    if (Math.abs(f1.sigma - f2.sigma) > 0.0001) {
      console.log("INCORRECT compare sigma", f1.sigma, f2.sigma);
    }
    if (Math.abs(f1.x - f2.x) > 0.0001) {
      console.log("INCORRECT compare X", f1.x, f2.x);
    }
    if (Math.abs(f1.y - f2.y) > 0.0001) {
      console.log("INCORRECT compare Y", f1.y, f2.y);
    }
    if (Math.abs(f1.octaveX - f2.octaveX) > 0.0001) {
      console.log("INCORRECT compare octave X", f1.octaveX, f2.octaveX);
    }
    if (Math.abs(f1.octaveY - f2.octaveY) > 0.0001) {
      console.log("INCORRECT compare octave Y", f1.octaveY, f2.octaveY);
    }
  }

  for (let i = 0; i < featurePoints.length; i++) {
    const f1 = featurePoints[i];
    const f2 = correctResult.featurePoints[i];
    if (Math.abs(f1.score - f2.score) > 0.0001) {
      console.log("INCORRECT compare score", f1.score, f2.score);
    }
    if (Math.abs(f1.sigma - f2.sigma) > 0.0001) {
      console.log("INCORRECT compare sigma", f1.sigma, f2.sigma);
    }
    if (Math.abs(f1.x - f2.x) > 0.0001) {
      console.log("INCORRECT compare X", f1.x, f2.x);
    }
    if (Math.abs(f1.y - f2.y) > 0.0001) {
      console.log("INCORRECT compare Y", f1.y, f2.y);
    }
    if (Math.abs(f1.octaveX - f2.octaveX) > 0.0001) {
      console.log("INCORRECT compare octave X", f1.octaveX, f2.octaveX);
    }
    if (Math.abs(f1.octaveY - f2.octaveY) > 0.0001) {
      console.log("INCORRECT compare octave Y", f1.octaveY, f2.octaveY);
    }
    //console.log("compare X Y", f1.x, f2.x, f1.y, f2.y, f1.octaveX, f2.octaveX, f1.octaveY, f2.octaveY);
  }
*/

  /*
  // TODO remove this. this is slow
  for (let i = 0; i < pyramidImages.length; i++) {
    if(!!pyramidImages[i].data.toArray) {
      pyramidImages[i].data = pyramidImages[i].data.toArray();
    }
  }
  for (let i = 0; i < dogPyramidImages.length; i++) {
    if(!!dogPyramidImages[i].data.toArray) {
      dogPyramidImages[i].data = dogPyramidImages[i].data.toArray();
    }
  }
*/

  //console.log("gpu", gpu);

  return {gaussianPyramid, dogPyramid};
}

const _numOctaves = (options) => {
  let {width, height, minSize} = options;
  let numOctaves = 0;
  while (width >= minSize && height >= minSize) {
    width /= 2;
    height /= 2;
    numOctaves++;
  }
  return numOctaves;
}

const _computeOrientations = (histogram) => {
  // The orientation histogram is smoothed with a Gaussian, sigma=1

  // just pick the max index, don't do smoothing
  /*
  const kernel = [0.274068619061197, 0.451862761877606, 0.274068619061197];
  for(let i = 0; i < ORIENTATION_SMOOTHING_ITERATIONS; i++) {
    const old = [];
    for (let j = 0; j < histogram.length; j++) {
      old[j] = histogram[j];
    }

    for (let j = 0; j < histogram.length; j++) {
      histogram[j] = kernel[0] * old[(j - 1 + histogram.length) % histogram.length]
                    + kernel[1] * old[j]
                    + kernel[2] * old[(j+1) % histogram.length];
    }
  }
  */

  // Find the peak of the histogram.
  let maxHeight = -1;
  let maxIndex = -1;
  for(let i = 0; i < ORIENTATION_NUM_BINS; i++) {
    if(histogram[i] > maxHeight) {
      maxHeight = histogram[i];
      maxIndex = i;
    }
  }

  if (maxHeight === 0) {
    return [];
  }

  // Find all the peaks.
  const angles = [];
  for(let i = 0; i < ORIENTATION_NUM_BINS; i++) {

    const prev = (i - 1 + histogram.length) % histogram.length;
    const next = (i + 1) % histogram.length;

    // add 0.0001 in comparison to avoid too sensitive to rounding precision
    //if (histogram[i] > ORIENTATION_PEAK_THRESHOLD * maxHeight && (histogram[i] > histogram[prev] + 0.0001) && (histogram[i] > histogram[next] + 0.0001)) {
    if (i === maxIndex) {
      // The default sub-pixel bin location is the discrete location if the quadratic fitting fails.
      let fbin = i;

      const ret = _quadratic3Points({
        p1: [i-1, histogram[prev]],
        p2: [i, histogram[i]],
        p3: [i+1, histogram[next]]
      });

      if (ret !== null) {
        const {A, B, C} = ret;

        // Find the critical point of a quadratic. y = A*x^2 + B*x + C
        if (A != 0) {
          fbin = -B / (2 * A);
        }
      }

      let an =  2.0 * Math.PI * ((fbin + 0.5 + ORIENTATION_NUM_BINS) / ORIENTATION_NUM_BINS);
      while (an > 2.0 * Math.PI) { // modula
        an -= 2.0 * Math.PI;
      }
      angles.push(an);
    }
  }
  return angles;
}

// divide the image into PRUNE_FEATURES_NUM_BUCKETS * PRUNE_FEATURES_NUM_BUCKETS area
// in each area, sort feature points by score, and return the top N
const _pruneFeatures = (options) => {
  const {featurePoints, width, height} = options;

  // Note: seems not to be a consistent implementation. Might need to remove this line
  //   The feature points are prune per bucket, e.g. if 501 points in bucket 1, turns out only 5 valid
  //   Similarly, if 500 points all in bucket 1, they all passed because globally <= maxNumFeaturePoints
  if (featurePoints.length <= MAX_FEATURE_POINTS) return featurePoints;

  const resultFeaturePoints = [];

  const nBuckets = PRUNE_FEATURES_NUM_BUCKETS * PRUNE_FEATURES_NUM_BUCKETS;
  const nPointsPerBuckets = MAX_FEATURE_POINTS / nBuckets;

  const buckets = [];
  for (let i = 0; i < nBuckets; i++) {
    buckets.push([]);
  }

  const dx = Math.ceil(1.0 * width / PRUNE_FEATURES_NUM_BUCKETS);
  const dy = Math.ceil(1.0 * height / PRUNE_FEATURES_NUM_BUCKETS);

  for (let i = 0; i < featurePoints.length; i++) {
    //const bucketX = Math.floor(featurePoints[i].x / dx);
    //const bucketY = Math.floor(featurePoints[i].y / dy);
    const bucketX = Math.floor(featurePoints[i].originalX / dx);
    const bucketY = Math.floor(featurePoints[i].originalY / dy);

    const bucketIndex = bucketY * PRUNE_FEATURES_NUM_BUCKETS + bucketX;

    if ( Math.abs(featurePoints[i].x - 54.77949523) < 0.0001) {
      console.log("[debug 54.77949523]", featurePoints[i], bucketX, bucketY, bucketIndex);
    }

    buckets[bucketIndex].push(featurePoints[i]);
  }

  console.log("bucet 20", buckets[20]);

  for (let j = 0; j < PRUNE_FEATURES_NUM_BUCKETS; j++) {
    for (let i = 0; i < PRUNE_FEATURES_NUM_BUCKETS; i++) {
      const bucketIndex = j * PRUNE_FEATURES_NUM_BUCKETS + i;
      const bucket = buckets[bucketIndex];
      const nSelected = Math.min(bucket.length, nPointsPerBuckets);

      //if (bucket.length > nSelected) {
        bucket.sort((f1, f2) => {
          return Math.abs(f1.score) > Math.abs(f2.score)? -1: 1;
        });
      //}
      for (let k = 0; k < nSelected; k++) {
        //resultFeaturePoints.push(bucket[k]);
        resultFeaturePoints.push(Object.assign(bucket[k], {bucket: bucketIndex}));
      }
    }
  }
  return resultFeaturePoints;
}


const kernels = [];

const initialPrune = (kernelIndex) => {
  const nBuckets = PRUNE_FEATURES_NUM_BUCKETS * PRUNE_FEATURES_NUM_BUCKETS;
  const nPointsPerBuckets = MAX_FEATURE_POINTS / nBuckets;

  if (kernelIndex === kernels.length) {
    kernels.push(
      gpu.createKernel(function() {
        return 0;
      }, {
        output: [5, nPointsPerBuckets, nBuckets], // first dimension: [score, sigma, x, y, dogIndex]
        pipeline: true,
      })
    )
  }
  const kernel = kernels[kernelIndex];
  const result = kernel();
  return result;
}

// removed necessary information for prunedExtremas
const reducePrune = (kernelIndex, prunedExtremas) => {
  const nBuckets = PRUNE_FEATURES_NUM_BUCKETS * PRUNE_FEATURES_NUM_BUCKETS;
  const nPointsPerBuckets = MAX_FEATURE_POINTS / nBuckets;
  if (kernelIndex === kernels.length) {
    kernels.push(
      gpu.createKernel(function(prunedExtremas) {
        return 0;
        return prunedExtremas[this.thread.z+1][this.thread.y][this.thread.x];
      }, {
        //output: [1, nPointsPerBuckets, nBuckets], // first dimension: [sigma, x, y, dogIndex]
        output: [1], // first dimension: [sigma, x, y, dogIndex]
        pipeline: true,
      })
    )
  }
  const kernel = kernels[kernelIndex];
  const result = kernel(prunedExtremas);
  return result;
}

const applyPrune = (kernelIndex, dogIndex, prunedExtremas, isExtremas, extremaScores, extremaSigmas, extremaXs, extremaYs, width, height) => {
  const nBuckets = PRUNE_FEATURES_NUM_BUCKETS * PRUNE_FEATURES_NUM_BUCKETS;
  const nPointsPerBuckets = MAX_FEATURE_POINTS / nBuckets;

  if (kernelIndex === kernels.length) {
    const subkernels = [];

    subkernels.push(
      gpu.createKernelMap({
        saveMax1: function(a) {return a},
        saveMax2: function(a) {return a},
        saveMax3: function(a) {return a},
        saveMax4: function(a) {return a},
        saveMax5: function(a) {return a}
      }, function(prunedExtremas, numBucketsPerDimension, isExtremas, extremaScores, width, height) {
        const bucketIndex = this.thread.x;
        const bucketX = bucketIndex % numBucketsPerDimension;
        const bucketY = Math.floor(bucketIndex / numBucketsPerDimension);
        const dx = Math.ceil(width / numBucketsPerDimension);
        const dy = Math.ceil(height / numBucketsPerDimension);

        // can declare array in gpu.js?
        // negative numbers indicate from exsiting prunedExtremas
        let max1 = -1;
        let max2 = -2;
        let max3 = -3;
        let max4 = -4;
        let max5 = -5;

        let maxs = [-1, -2, -3, -4, -5];

        for (let t = 0; t < 5; t++) {
          for (let i = bucketX * dx; i < bucketX * dx + dx; i++) {
            for (let j = bucketY * dy; j < bucketY * dy + dy; j++) {
              const pointIndex = j * width + i;
              if (isExtremas[pointIndex] === 1 && pointIndex !== max1 && pointIndex !== max2 && pointIndex !== max3 && pointIndex !== max4 && pointIndex !== max5)
              {
                //if ((max1 >= 0 && Math.abs(extremaScores[pointIndex]) > Math.abs(extremaScores[max1])) || (max1 < 0 && Math.abs(extremaScores[pointIndex]) > Math.abs(prunedExtremas[0][-1 * max1 - 1][bucketIndex]))) {
                if ((max1 >= 0 && Math.abs(extremaScores[pointIndex]) > Math.abs(extremaScores[max1])) || (max1 < 0 && Math.abs(extremaScores[pointIndex]) > Math.abs(prunedExtremas[bucketIndex][-1 * max1 - 1][0]))) {
                  max5 = max4;
                  max4 = max3;
                  max3 = max2;
                  max2 = max1;
                  max1 = pointIndex;
                }
                //else if ( (max2 >= 0 && Math.abs(extremaScores[pointIndex]) > Math.abs(extremaScores[max2])) || (max2 < 0 && Math.abs(extremaScores[pointIndex]) > Math.abs(prunedExtremas[0][-1 * max2 -1][bucketIndex]))) {
                else if ( (max2 >= 0 && Math.abs(extremaScores[pointIndex]) > Math.abs(extremaScores[max2])) || (max2 < 0 && Math.abs(extremaScores[pointIndex]) > Math.abs(prunedExtremas[bucketIndex][-1 * max2 -1][0]))) {
                  max5 = max4;
                  max4 = max3;
                  max3 = max2;
                  max2 = pointIndex;
                }
                //else if ( (max3 >= 0 && Math.abs(extremaScores[pointIndex]) > Math.abs(extremaScores[max3])) || (max3 < 0 && Math.abs(extremaScores[pointIndex]) > Math.abs(prunedExtremas[0][-1 * max3 -1][bucketIndex]))) {
                else if ( (max3 >= 0 && Math.abs(extremaScores[pointIndex]) > Math.abs(extremaScores[max3])) || (max3 < 0 && Math.abs(extremaScores[pointIndex]) > Math.abs(prunedExtremas[bucketIndex][-1 * max3 -1][0]))) {
                  max5 = max4;
                  max4 = max3;
                  max3 = pointIndex;
                }
                //else if ( (max4 >= 0 && Math.abs(extremaScores[pointIndex]) > Math.abs(extremaScores[max4])) || (max4 < 0 && Math.abs(extremaScores[pointIndex]) > Math.abs(prunedExtremas[0][-1 * max4 -1][bucketIndex]))) {
                else if ( (max4 >= 0 && Math.abs(extremaScores[pointIndex]) > Math.abs(extremaScores[max4])) || (max4 < 0 && Math.abs(extremaScores[pointIndex]) > Math.abs(prunedExtremas[bucketIndex][-1 * max4 -1][0]))) {
                  max5 = max4;
                  max4 = pointIndex;
                }
                //else if ( (max5 >= 0 && Math.abs(extremaScores[pointIndex]) > Math.abs(extremaScores[max5])) || (max5 < 0 && Math.abs(extremaScores[pointIndex]) > Math.abs(prunedExtremas[0][-1 * max5 -1][bucketIndex]))) {
                else if ( (max5 >= 0 && Math.abs(extremaScores[pointIndex]) > Math.abs(extremaScores[max5])) || (max5 < 0 && Math.abs(extremaScores[pointIndex]) > Math.abs(prunedExtremas[bucketIndex][-1 * max5 -1][0]))) {
                  max5 = pointIndex;
                }
              }
            }
          }
        }
        saveMax1(max1);
        saveMax2(max2);
        saveMax3(max3);
        saveMax4(max4);
        saveMax5(max5);
        return -1;
      }, {
        output: [nBuckets],
        pipeline: true,
      })
    );

    subkernels.push(
      gpu.createKernel(function(dogIndex, prunedExtremas, extremaScores, extremaSigmas, extremaXs, extremaYs, saveMax1, saveMax2, saveMax3, saveMax4, saveMax5) {
        const propertyIndex = this.thread.x;
        const bucketPointIndex = this.thread.y;
        const bucketIndex = this.thread.z;
        const max1 = saveMax1[bucketIndex];
        const max2 = saveMax2[bucketIndex];
        const max3 = saveMax3[bucketIndex];
        const max4 = saveMax4[bucketIndex];
        const max5 = saveMax5[bucketIndex];

        if (bucketPointIndex === 0) {
          if (max1 < 0) {
            //return prunedExtremas[propertyIndex][-1 * max1 -1][bucketIndex];
            return prunedExtremas[bucketIndex][-1 * max1 -1][propertyIndex];
          } else {
            if (propertyIndex === 0) return extremaScores[max1];
            if (propertyIndex === 1) return extremaSigmas[max1];
            if (propertyIndex === 2) return extremaXs[max1];
            if (propertyIndex === 3) return extremaYs[max1];
            if (propertyIndex === 4) return dogIndex;
          }
        }
        if (bucketPointIndex === 1) {
          if (max2 < 0) {
            //return prunedExtremas[propertyIndex][-1 * max2 -1][bucketIndex];
            return prunedExtremas[bucketIndex][-1 * max2 -1][propertyIndex];
          } else {
            if (propertyIndex === 0) return extremaScores[max2];
            if (propertyIndex === 1) return extremaSigmas[max2];
            if (propertyIndex === 2) return extremaXs[max2];
            if (propertyIndex === 3) return extremaYs[max2];
            if (propertyIndex === 4) return dogIndex;
          }
        }
        if (bucketPointIndex === 2) {
          if (max3 < 0) {
            //return prunedExtremas[propertyIndex][-1 * max3 -1][bucketIndex];
            return prunedExtremas[bucketIndex][-1 * max3 -1][propertyIndex];
          } else {
            if (propertyIndex === 0) return extremaScores[max3];
            if (propertyIndex === 1) return extremaSigmas[max3];
            if (propertyIndex === 2) return extremaXs[max3];
            if (propertyIndex === 3) return extremaYs[max3];
            if (propertyIndex === 4) return dogIndex;
          }
        }
        if (bucketPointIndex === 3) {
          if (max4 < 0) {
            //return prunedExtremas[propertyIndex][-1 * max4 -1][bucketIndex];
            return prunedExtremas[bucketIndex][-1 * max4 -1][propertyIndex];
          } else {
            if (propertyIndex === 0) return extremaScores[max4];
            if (propertyIndex === 1) return extremaSigmas[max4];
            if (propertyIndex === 2) return extremaXs[max4];
            if (propertyIndex === 3) return extremaYs[max4];
            if (propertyIndex === 4) return dogIndex;
          }
        }
        if (bucketPointIndex === 4) {
          if (max5 < 0) {
            //return prunedExtremas[propertyIndex][-1 * max5 -1][bucketIndex];
            return prunedExtremas[bucketIndex][-1 * max5 -1][propertyIndex];
          } else {
            if (propertyIndex === 0) return extremaScores[max5];
            if (propertyIndex === 1) return extremaSigmas[max5];
            if (propertyIndex === 2) return extremaXs[max5];
            if (propertyIndex === 3) return extremaYs[max5];
            if (propertyIndex === 4) return dogIndex;
          }
        }
      }, {
        output: [5, nPointsPerBuckets, nBuckets], // first dimension: [score, sigma, x, y]
        pipeline: true,
      })
    );
    kernels.push(subkernels);
  }
  const subkernels = kernels[kernelIndex];
  const orderResult = subkernels[0](prunedExtremas, PRUNE_FEATURES_NUM_BUCKETS, isExtremas, extremaScores, width, height);
  //console.log("orderResult", orderResult.saveMax1.toArray(), extremaScores.toArray());
  const result = subkernels[1](dogIndex, prunedExtremas, extremaScores, extremaSigmas, extremaXs, extremaYs, orderResult.saveMax1, orderResult.saveMax2, orderResult.saveMax3, orderResult.saveMax4, orderResult.saveMax5);
  return result;
}

const _computeGradients = (kernelIndex, image) => {
  if (kernelIndex === kernels.length) {
    kernels.push(
      gpu.createKernelMap({
        saveDy: function(a) {return a},
        saveDx: function(a) {return a},
        saveMag: function(a) {return a}
      },
      function(data, width, height) {
        const i = this.thread.x % width;
        const j = Math.floor(this.thread.x / width);
        const prevJ = j > 0? j - 1: j;
        const nextJ = j < height - 1? j + 1: j;
        const prevI = i > 0? i - 1: i;
        const nextI = i < width - 1? i + 1: i;
        const dx = data[j * width + nextI] - data[j * width + prevI];
        const dy = data[nextJ * width + i] - data[prevJ * width + i];

        // seems like gpu atan2 doesn't handle dx === 0 well
        let angle = 0;
        if (dx === 0 && dy === 0) angle = 0;
        else if (dy === 0) {
          if (dx < 0) angle = Math.PI;
          else angle = 0;
        }
        else if (dx === 0) {
          if (dy < 0) angle = -Math.PI / 2;
          else angle = Math.PI / 2;
        }
        else {
          angle = Math.atan2(Math.abs(dy), Math.abs(dx));
          if (dx < 0 && dy > 0) angle = Math.PI - angle;
          else if (dx < 0 && dy < 0) angle = -(Math.PI - angle);
          else if (dx > 0 && dy < 0) angle = -angle;
        }
        angle += Math.PI;

        const mag = Math.sqrt(dx * dx + dy * dy);
        saveMag(mag);
        saveDx(dx);
        saveDy(dy);
        return angle;
      }, {
        output: [image.width * image.height],
        pipeline: true,
      })
    )
  }
  const kernel = kernels[kernelIndex];
  const result = kernel(image.data, image.width, image.height);
  return result;
}

const __computeGradients = (kernelIndex, image, gaussianImages, gaussianImageIndex) => {
  if (kernelIndex === kernels.length) {
    kernels.push(
      gpu.createKernelMap({
        saveDy: function(a) {return a},
        saveDx: function(a) {return a},
        saveMag: function(a) {return a}
      },
      function(data, width, height, gaussianImages, gaussianImageIndex) {
        const i = this.thread.x % width;
        const j = Math.floor(this.thread.x / width);
        const prevJ = j > 0? j - 1: j;
        const nextJ = j < height - 1? j + 1: j;
        const prevI = i > 0? i - 1: i;
        const nextI = i < width - 1? i + 1: i;
        //const dx = data[j * width + nextI] - data[j * width + prevI];
        //const dy = data[nextJ * width + i] - data[prevJ * width + i];
        const dx = gaussianImages[gaussianImageIndex][j][nextI] - gaussianImages[gaussianImageIndex][j][prevI];
        const dy = gaussianImages[gaussianImageIndex][nextJ][i] - gaussianImages[gaussianImageIndex][prevJ][i];

        // seems like gpu atan2 doesn't handle dx === 0 well
        let angle = 0;
        if (dx === 0 && dy === 0) angle = 0;
        else if (dy === 0) {
          if (dx < 0) angle = Math.PI;
          else angle = 0;
        }
        else if (dx === 0) {
          if (dy < 0) angle = -Math.PI / 2;
          else angle = Math.PI / 2;
        }
        else {
          angle = Math.atan2(Math.abs(dy), Math.abs(dx));
          if (dx < 0 && dy > 0) angle = Math.PI - angle;
          else if (dx < 0 && dy < 0) angle = -(Math.PI - angle);
          else if (dx > 0 && dy < 0) angle = -angle;
        }
        angle += Math.PI;

        const mag = Math.sqrt(dx * dx + dy * dy);
        saveMag(mag);
        saveDx(dx);
        saveDy(dy);
        return angle;
      }, {
        output: [image.width * image.height],
        pipeline: true,
      })
    )
  }
  const kernel = kernels[kernelIndex];
  const result = kernel(image.data, image.width, image.height, gaussianImages, gaussianImageIndex);
  return result;
}

const _computeFreak = (kernelIndex, pyramidImages, gaussianNumOctaves, gaussianNumScalesPerOctaves, featurePoints) => {
  if (kernelIndex === kernels.length) {
    const subkernels = [];

    subkernels.push(
      gpu.createKernelMap({
        saveXp: function(a) {return a},
        saveYp: function(a) {return a}
      },
      function(gaussianNumOctaves, gaussianNumScalesPerOctaves, featureCount, xs, ys, sigmas, angles, freakPoints) {
        if (this.thread.y >= featureCount) return -1;

        const EXPANSION_FACTOR = 7;

        const mK = Math.pow(2, 1.0 / (gaussianNumScalesPerOctaves-1));
        const oneOverLogK = 1.0 / Math.log(mK);

        const inputX = xs[this.thread.y];
        const inputY = ys[this.thread.y];
        const inputSigma = sigmas[this.thread.y];
        const inputAngle = angles[this.thread.y];

        const freakSigma = freakPoints[this.thread.x][0];
        const freakX = freakPoints[this.thread.x][1];
        const freakY = freakPoints[this.thread.x][2];

        // Ensure the scale of the similarity transform is at least "1".
        const transformScale = Math.max(1, inputSigma * EXPANSION_FACTOR);
        const c = transformScale * Math.cos(inputAngle);
        const s = transformScale * Math.sin(inputAngle);
        // similarity matrix
        // const S = [
        //  c, -s, x,
        //  s, c, y,
        //  0, 0, 1
        //]
        const S0 = c;
        const S1 = -s;
        const S2 = inputX;
        const S3 = s;
        const S4 = c;
        const S5 = inputY;

        const sigma = transformScale * freakSigma;
        let octave = Math.floor(Math.log2(sigma));
        const fscale = Math.log(sigma / Math.pow(2, octave)) * oneOverLogK;
        let scale = Math.round(fscale);

        // sgima of last scale =  sigma of the first scale in next octave
        // prefer coarser octaves for efficiency
        if (scale === gaussianNumScalesPerOctaves - 1) {
          octave = octave + 1;
          scale = 0;
        }
        // clip octave and scale
        if (octave < 0) {
          octave = 0;
          scale = 0;
        }
        if (octave >= gaussianNumOctaves) {
          octave = gaussianNumOctaves - 1;
          scale = gaussianNumScalesPerOctaves - 1;
        }

        // for downsample point
        const imageIndex = octave * gaussianNumScalesPerOctaves + scale;
        const a = 1.0 / (Math.pow(2, octave));
        const b = 0.5 * a - 0.5;

        const x = S0 * freakX + S1 * freakY + S2;
        const y = S3 * freakX + S4 * freakY + S5;
        let xp = x * a + b; // x in octave
        let yp = y * a + b; // y in octave

        saveXp(xp);
        saveYp(yp);
        return imageIndex;
      }, {
        output: [freakPoints.length, MAX_FEATURE_POINTS],
        pipeline: true,
      })
    )

    subkernels.push(
      gpu.createKernel(function() {
        return 0;
      }, {
        output: [freakPoints.length, MAX_FEATURE_POINTS],
        pipeline: true,
      })
    );

    for (let i = 0; i < pyramidImages.length; i++) {
      subkernels.push(
        gpu.createKernel(function(data, thisIndex, imageData, width, height, xps, yps, imageIndexes) {
          if (imageIndexes[this.thread.y][this.thread.x] !== thisIndex) return data[this.thread.y][this.thread.x];

          let xp = xps[this.thread.y][this.thread.x];
          let yp = yps[this.thread.y][this.thread.x];

          // bilinear interpolation
          xp = Math.max(0, Math.min(xp, width - 2));
          yp = Math.max(0, Math.min(yp, height - 2));

          const x0 = Math.floor(xp);
          const x1 = x0 + 1;
          const y0 = Math.floor(yp);
          const y1 = y0 + 1;
          const value = (x1-xp) * (y1-yp) * imageData[y0 * width + x0]
                      + (xp-x0) * (y1-yp) * imageData[y0 * width + x1]
                      + (x1-xp) * (yp-y0) * imageData[y1 * width + x0]
                      + (xp-x0) * (yp-y0) * imageData[y1 * width + x1];
          return value;
        }, {
          output: [freakPoints.length, MAX_FEATURE_POINTS],
          pipeline: true,
        })
      )
    }
    kernels.push(subkernels);
  }
  const subkernels = kernels[kernelIndex];

  const inputxs = new Float32Array(MAX_FEATURE_POINTS);
  const inputys = new Float32Array(MAX_FEATURE_POINTS);
  const inputsigmas = new Float32Array(MAX_FEATURE_POINTS);
  const inputangles = new Float32Array(MAX_FEATURE_POINTS);
  for (let i = 0; i < featurePoints.length; i++) {
    const fp = featurePoints[i];
    inputxs[i] = fp.x;
    inputys[i] = fp.y;
    inputsigmas[i] = fp.sigma;
    inputangles[i] = fp.angle;
  }
  if (featurePoints.length === 0) return null;
  const result = subkernels[0](gaussianNumOctaves, gaussianNumScalesPerOctaves, featurePoints.length, inputxs, inputys, inputsigmas, inputangles, freakPoints);

  const imageIndexes = result.result;
  const xps = result.saveXp;
  const yps = result.saveYp;

  let freakResult = subkernels[1]();
  for (let i = 0; i < pyramidImages.length; i++) {
    freakResult = subkernels[i+2](freakResult, i, pyramidImages[i].data, pyramidImages[i].width, pyramidImages[i].height, xps, yps, imageIndexes);
  }
  return freakResult;
}

const __computeFreak = (kernelIndex, gaussianImages, gaussianImageSizes, gaussianNumOctaves, gaussianNumScalesPerOctaves, featurePoints) => {
  if (kernelIndex === kernels.length) {
    kernels.push(
      gpu.createKernel(function(gaussianImages, gaussianImageSizes, gaussianNumOctaves, gaussianNumScalesPerOctaves, featureCount, xs, ys, sigmas, angles, freakPoints) {
        if (this.thread.y >= featureCount) return 0;

        const EXPANSION_FACTOR = 7;

        const mK = Math.pow(2, 1.0 / (gaussianNumScalesPerOctaves-1));
        const oneOverLogK = 1.0 / Math.log(mK);

        const inputX = xs[this.thread.y];
        const inputY = ys[this.thread.y];
        const inputSigma = sigmas[this.thread.y];
        const inputAngle = angles[this.thread.y];

        const freakSigma = freakPoints[this.thread.x][0];
        const freakX = freakPoints[this.thread.x][1];
        const freakY = freakPoints[this.thread.x][2];

        // Ensure the scale of the similarity transform is at least "1".
        const transformScale = Math.max(1, inputSigma * EXPANSION_FACTOR);
        const c = transformScale * Math.cos(inputAngle);
        const s = transformScale * Math.sin(inputAngle);
        // similarity matrix
        // const S = [
        //  c, -s, x,
        //  s, c, y,
        //  0, 0, 1
        //]
        const S0 = c;
        const S1 = -s;
        const S2 = inputX;
        const S3 = s;
        const S4 = c;
        const S5 = inputY;

        const sigma = transformScale * freakSigma;
        let octave = Math.floor(Math.log2(sigma));
        const fscale = Math.log(sigma / Math.pow(2, octave)) * oneOverLogK;
        let scale = Math.round(fscale);

        // sgima of last scale =  sigma of the first scale in next octave
        // prefer coarser octaves for efficiency
        if (scale === gaussianNumScalesPerOctaves - 1) {
          octave = octave + 1;
          scale = 0;
        }
        // clip octave and scale
        if (octave < 0) {
          octave = 0;
          scale = 0;
        }
        if (octave >= gaussianNumOctaves) {
          octave = gaussianNumOctaves - 1;
          scale = gaussianNumScalesPerOctaves - 1;
        }

        // for downsample point
        const imageIndex = octave * gaussianNumScalesPerOctaves + scale;
        const imageData = gaussianImages[imageIndex];
        const width = gaussianImageSizes[imageIndex][0];
        const height = gaussianImageSizes[imageIndex][1];
        const a = 1.0 / (Math.pow(2, octave));
        const b = 0.5 * a - 0.5;

        const x = S0 * freakX + S1 * freakY + S2;
        const y = S3 * freakX + S4 * freakY + S5;
        let xp = x * a + b; // x in octave
        let yp = y * a + b; // y in octave

        // bilinear interpolation
        xp = Math.max(0, Math.min(xp, width - 2));
        yp = Math.max(0, Math.min(yp, height - 2));

        const x0 = Math.floor(xp);
        const x1 = x0 + 1;
        const y0 = Math.floor(yp);
        const y1 = y0 + 1;

        //const value = (x1-xp) * (y1-yp) * imageData[y0 * width + x0]
        //            + (xp-x0) * (y1-yp) * imageData[y0 * width + x1]
        //            + (x1-xp) * (yp-y0) * imageData[y1 * width + x0]
        //            + (xp-x0) * (yp-y0) * imageData[y1 * width + x1];
        const value = (x1-xp) * (y1-yp) * gaussianImages[imageIndex][y0][x0]
                    + (xp-x0) * (y1-yp) * gaussianImages[imageIndex][y0][x1]
                    + (x1-xp) * (yp-y0) * gaussianImages[imageIndex][y1][x0]
                    + (xp-x0) * (yp-y0) * gaussianImages[imageIndex][y1][x1];

        return value;
      }, {
        output: [freakPoints.length, MAX_FEATURE_POINTS],
        pipeline: true,
      })
    )
  }
  const kernel = kernels[kernelIndex];

  const inputxs = new Float32Array(MAX_FEATURE_POINTS);
  const inputys = new Float32Array(MAX_FEATURE_POINTS);
  const inputsigmas = new Float32Array(MAX_FEATURE_POINTS);
  const inputangles = new Float32Array(MAX_FEATURE_POINTS);
  for (let i = 0; i < featurePoints.length; i++) {
    const fp = featurePoints[i];
    inputxs[i] = fp.x;
    inputys[i] = fp.y;
    inputsigmas[i] = fp.sigma;
    inputangles[i] = fp.angle;
  }
  if (featurePoints.length === 0) return null;
  const result = kernel(gaussianImages, gaussianImageSizes, gaussianNumOctaves, gaussianNumScalesPerOctaves, featurePoints.length, inputxs, inputys, inputsigmas, inputangles, freakPoints);
  return result;
}

const _computeOrientationHistograms = (kernelIndex, gradientMags, gradientAngles, width, height, featurePoints) => {
  if (kernelIndex === kernels.length) {
    kernels.push(
      gpu.createKernel(function(gradientMags, gradientAngles, width, height, numBins, featureCount, xs, ys, sigmas) {
        if (this.thread.y >= featureCount) return 0;

        const x = xs[this.thread.y];
        const y = ys[this.thread.y];
        const sigma = sigmas[this.thread.y];

        const ORIENTATION_GAUSSIAN_EXPANSION_FACTOR = 3.0;
        const ORIENTATION_REGION_EXPANSION_FACTOR = 1.5;
        const ORIENTATION_SMOOTHING_ITERATIONS = 5;
        const ORIENTATION_PEAK_THRESHOLD = 0.8;
        const ONE_OVER_2PI = 0.159154943091895;

        const gwSigma = Math.max(1.0, ORIENTATION_GAUSSIAN_EXPANSION_FACTOR * sigma);
        const gwScale = -1.0 / (2 * gwSigma * gwSigma);

        const radius = ORIENTATION_REGION_EXPANSION_FACTOR * gwSigma;
        const radius2 = Math.ceil( radius * radius - 0.5);

        const x0 = Math.max(0, x - Math.floor(radius + 0.5));
        const x1 = Math.min(width-1, x + Math.floor(radius + 0.5));
        const y0 = Math.max(0, y - Math.floor(radius + 0.5));
        const y1 = Math.min(height-1, y + Math.floor(radius + 0.5));

        let sum = 0;

        for (let yp = y0; yp <= y1; yp++) {
          const dy = yp - y;
          const dy2 = dy * dy;
          for (let xp = x0; xp <= x1; xp++) {
            const dx = xp - x;
            const dx2 = dx * dx;
            const r2 = dx2 + dy2;

            if (r2 <= radius2) {
              const mag = gradientMags[yp * width + xp];
              const angle = gradientAngles[yp * width + xp];
              const _x = r2 * gwScale;
              const w = (720+_x*(720+_x*(360+_x*(120+_x*(30+_x*(6+_x))))))*0.0013888888;

              const fbin  = numBins * angle * ONE_OVER_2PI;
              const bin = Math.floor(fbin - 0.5);
              const w2 = fbin - bin - 0.5;
              const w1 = (1.0 - w2);
              const b1 = (bin + numBins) % numBins;
              const b2 = (bin + 1) % numBins;
              const magnitude = w * mag;

              if (b1 === this.thread.x) sum += w1 * magnitude;
              if (b2 === this.thread.x) sum += w2 * magnitude;
            }
          }
        }
        return sum;
      }, {
        output: [ORIENTATION_NUM_BINS, MAX_FEATURE_POINTS],
        pipeline: true,
      })
    )
  }
  const kernel = kernels[kernelIndex];

  const inputxs = new Float32Array(MAX_FEATURE_POINTS);
  const inputys = new Float32Array(MAX_FEATURE_POINTS);
  const inputsigmas = new Float32Array(MAX_FEATURE_POINTS);
  for (let i = 0; i < featurePoints.length; i++) {
    const fp = featurePoints[i];
    inputxs[i] = fp.octaveX;
    inputys[i] = fp.octaveY;
    inputsigmas[i] = fp.octaveSigma;
  }
  if (featurePoints.length === 0) return null;
  const result = kernel(gradientMags, gradientAngles, width, height, ORIENTATION_NUM_BINS, featurePoints.length, inputxs, inputys, inputsigmas);
  return result;
}

const _filterExtremas = (kernelIndex, extremas, extremaScores, extremaSigmas, width, height) => {
  const dstWidth = Math.floor(width / 2);
  const dstHeight = Math.floor(height / 2);
  if (kernelIndex === kernels.length) {
    kernels.push(
      gpu.createKernelMap({
        saveScore: function(a) {
          return a;
        },
        saveSigma: function(a) {
          return a;
        }
      },
      function(extremas, extremaScores, extremaSigmas, width) {
        const srcWidth = width * 2;
        const i = this.thread.x % width;
        const j = Math.floor(this.thread.x / width);
        const srcPos = j * 2 * srcWidth + i * 2;

        let bestSrcPos = -1;
        let bestScore = -1;
        for (let di = 0; di < 2; di++) {
          for (let dj = 0; dj < 2; dj++) {
            const newPos = srcPos + dj * srcWidth + di;
            if (extremas[newPos] === 0) continue;
            const newScore = Math.abs(extremaScores[newPos]);
            if (newScore > bestScore) {
              bestSrcPos = newPos;
              bestScore = newScore;
            }
          }
        }
        return bestSrcPos;
      }, {
        output: [dstWidth * dstHeight]
      })
    );
  }
  const kernel = kernels[kernelIndex];
  const result = kernel(extremas, extremaScores, extremaSigmas, dstWidth);
  return result;
}

const _reduceExtremasResult = (kernelIndex, extremasResult, width, height) => {
  const reduceTimes = 2;
  const dstWidth = Math.floor(width / reduceTimes);
  const dstHeight = Math.floor(height / reduceTimes);
  if (kernelIndex === kernels.length) {
    kernels.push(
      gpu.createKernelMap({
        saveScore: function(a) {
          return a;
        },
        saveSigma: function(a) {
          return a;
        },
        saveX: function(a) {
          return a;
        },
        saveY: function(a) {
          return a;
        }
      },
      function(isExtremas, scores, sigmas, xs, ys, width, reduceTimes) {
        const i = this.thread.x % width;
        const j = Math.floor(this.thread.x / width);
        const srcWidth = width * 2;

        const srcPos = (j * 2) * srcWidth + (i * 2);

        let bestSrcPos = -1;
        for (let ii = 0; ii < 2; ii++) {
          for (let jj = 0; jj < 2; jj++) {
            let srcPos2 = srcPos + jj * srcWidth + ii;
            if (isExtremas[srcPos2] === 1) {
              if (bestSrcPos === -1 || scores[srcPos2] > scores[bestSrcPos]) {
                bestSrcPos = srcPos2;
              }
            }
          }
        }

        if (bestSrcPos === -1) return 0;

        saveScore(scores[bestSrcPos]);
        saveSigma(sigmas[bestSrcPos]);
        saveX(xs[bestSrcPos]);
        saveY(ys[bestSrcPos]);
        return 1;
      }, {
        output: [dstWidth * dstHeight],
        pipeline: true,
      })
    )
  }
  const kernel = kernels[kernelIndex];
  const result = kernel(extremasResult.result, extremasResult.saveScore, extremasResult.saveSigma, extremasResult.saveX, extremasResult.saveY, dstWidth, reduceTimes);
  return result;
}

const _buildExtremas = (kernelIndex, image0, image1, image2, octave, scale, originalWidth, originalHeight, dogNumScalesPerOctaves, startI, startJ, endI, endJ) => {
  if (kernelIndex === kernels.length) {
    kernels.push(
      gpu.createKernelMap({
        saveScore: function(a) {
          return a;
        },
        saveSigma: function(a) {
          return a;
        },
        saveX: function(a) {
          return a;
        },
        saveY: function(a) {
          return a;
        }
      },
      function(data0, data1, data2, width, height, octave, scale, originalWidth, originalHeight, dogNumScalesPerOctaves, startI, startJ, endI, endJ, threshold) {
        const LAPLACIAN_SQR_THRESHOLD = 3 * 3;
        const MAX_SUBPIXEL_DISTANCE_SQR = 3 * 3;
        const EDGE_THRESHOLD = 4.0;
        const EDGE_HESSIAN_THRESHOLD = ((EDGE_THRESHOLD+1) * (EDGE_THRESHOLD+1) / EDGE_THRESHOLD);

        const pos = this.thread.x;
        const posI = pos % width;
        const posJ = Math.floor(pos / width);
        const v = data1[pos];
        if (posI < startI || posI > endI || posJ < startJ || posJ > endJ) return 0;
        if (data1[pos] * data1[pos] < threshold) return 0;

        let isMax = true;
        for (let d = 0; d < 9; d++) {
          const i = d % 3;
          const j = Math.floor(d / 3);
          const pos2 = pos + (j-1) * width + (i-1);
          if (data1[pos] <= data0[pos2]) {isMax = false; break;};
          if (data1[pos] <= data2[pos2]) {isMax = false; break;};
          if (pos !== pos2 && data1[pos] <= data1[pos2]) {isMax = false; break;};
        }

        let isMin = false;
        if (!isMax) {
          isMin = true;
          for (let d = 0; d < 9; d++) {
            const i = d % 3;
            const j = Math.floor(d / 3);
            const pos2 = pos + (j-1) * width + (i-1);
            if (data1[pos] >= data0[pos2]) {isMin = false; break};
            if (data1[pos] >= data2[pos2]) {isMin = false; break};
            if (pos !== pos2 && data1[pos] >= data1[pos2]) {isMin = false; break};
          }
        }
        if (!isMax && !isMin) return 0;

        // Step 2: sub-pixel refinement (I'm not sure what that means. Any educational ref?)

        // Compute spatial derivatives
        const dx = 0.5 * (data1[pos + 1] - data1[pos - 1]);
        const dy = 0.5 * (data1[pos + width] - data1[pos - width]);
        const dxx = data1[pos + 1] + data1[pos - 1] - 2 * data1[pos];
        const dyy = data1[pos + width] + data1[pos - width] - 2 * data1[pos];
        const dxy = 0.25 * (data1[pos - width -1] + data1[pos + width + 1] - data1[pos - width +1] - data1[pos + width - 1]);

        // Compute scale derivates
        const ds = 0.5 * (data2[pos] - data0[pos]);
        const dss = data2[pos] + data0[pos] - 2 * data1[pos];
        const dxs = 0.25 * ((data0[pos-1] - data0[pos+1]) + (-data2[pos-1] + data2[pos+1]));
        const dys = 0.25 * ((data0[pos-width] - data0[pos+width]) + (-data2[pos-width] + data2[pos+width]));

        // Solve Hessian A * u = b;
        const A0 = dxx;
        const A1 = dxy;
        const A2 = dxs;
        const A3 = dxy;
        const A4 = dyy;
        const A5 = dys;
        const A6 = dxs;
        const A7 = dys;
        const A8 = dss;
        const b0 = -dx;
        const b1 = -dy;
        const b2 = -ds;

        const detA = A0 * A4 * A8
                  - A0 * A5 * A5
                  - A4 * A2 * A2
                  - A8 * A1 * A1
                  + 2 * A1 * A2 * A5;

        if ( Math.abs(detA) < 0.0000001) return 0; // determinant undefined. no solution

        // B = inverse of A
        const B0 = A4 * A8 - A5 * A7;
        const B1 = A2 * A7 - A1 * A8;
        const B2 = A1 * A5 - A2 * A4;
        const B3 = B1;
        const B4 = A0 * A8 - A2 * A6;
        const B5 = A2 * A3 - A0 * A5;
        const B6 = B2;
        const B7 = B5;
        const B8 = A0 * A4 - A1 * A3;

        const u0 = (B0 * b0 + B1 * b1 + B2 * b2) / detA;
        const u1 = (B3 * b0 + B4 * b1 + B5 * b2) / detA;
        const u2 = (B6 * b0 + B7 * b1 + B8 * b2) / detA;

        // If points move too much in the sub-pixel update, then the point probably unstable.
        if (u0 * u0 + u1 * u1 > MAX_SUBPIXEL_DISTANCE_SQR) return 0;

        // compute edge score
        const det = (dxx * dyy) - (dxy * dxy);
        if (det === 0) return 0;

        const edgeScore = (dxx + dyy) * (dxx + dyy) / det;
        if (Math.abs(edgeScore) >= EDGE_HESSIAN_THRESHOLD ) return 0;

        const score = v - (b0 * u0 + b1 * u1 + b2 * u2);
        if (score * score < LAPLACIAN_SQR_THRESHOLD) return 0;

        // original x = x*2^n + 2^(n-1) - 0.5
        // original y = y*2^n + 2^(n-1) - 0.5
        const originalX = posI * Math.pow(2, octave) + Math.pow(2, octave-1) - 0.5;
        const originalY = posJ * Math.pow(2, octave) + Math.pow(2, octave-1) - 0.5;

        const newX = originalX + u0 * Math.pow(2, octave);
        const newY = originalY + u1 * Math.pow(2, octave);
        if (newX < 0 || newX >= originalWidth || newY < 0 || newY >= originalHeight) return 0;

        const spScale = Math.min(Math.max(0, scale + u2), dogNumScalesPerOctaves);
        const mK = Math.pow(2, 1.0 / dogNumScalesPerOctaves);
        const newSigma = Math.pow(mK, spScale) * (1 << octave);

        saveScore(score);
        saveSigma(newSigma);
        saveX(newX);
        saveY(newY);

        return 1;
      }, {
        output: [image1.width * image1.height],
        pipeline: true,
      })
    );
  }
  const kernel = kernels[kernelIndex];
  const result = kernel(image0.data, image1.data, image2.data, image1.width, image1.height, octave, scale, originalWidth, originalHeight, dogNumScalesPerOctaves, startI, startJ, endI, endJ, LAPLACIAN_SQR_THRESHOLD);
  return result;
}

const _downsampleBilinear = (kernelIndex, image) => {
  const dstWidth = Math.floor(image.width / 2);
  const dstHeight = Math.floor(image.height / 2);

  if (kernelIndex === kernels.length) {
    kernels.push(
      gpu.createKernel(function(data, width) {
        const srcWidth = width * 2;
        const j = Math.floor(this.thread.x / width);
        const i = this.thread.x % width;
        const srcPos = j * 2 * srcWidth + i * 2;
        const v = (data[srcPos] + data[srcPos+1] + data[srcPos+srcWidth] + data[srcPos+srcWidth+1]) * 0.25;
        return v;
      }, {
        output: [dstWidth * dstHeight],
        pipeline: true,
      })
    );
  }
  const kernel = kernels[kernelIndex];
  const result = kernel(image.data, dstWidth);
  return {width: dstWidth, height: dstHeight, data: result};
}

const _buildGaussianPyramid = (kernelIndex, image, numOctaves, numScalesPerOctaves) => {
  const {width, height} = image;
  let totalSize = 0;
  let curWidth = width;
  let curHeight = height;
  for (let i = 0; i < numOctaves; i++) {
    totalSize += curWidth * curHeight * numScalesPerOctaves;
    curWidth = Math.floor(curWidth / 2);
    curHeight = Math.floor(curHeight / 2);
  }

  if (kernelIndex === kernels.length) {
    const subkernels = [];
    const initKernel = gpu.createKernel(function(data, imageWidth, imageHeight) {
      if (this.thread.x >= imageWidth * imageHeight) return -1;
      return data[this.thread.x];
    }, {
      output: [totalSize],
      pipeline: true,
    });
    subkernels.push(initKernel);

    for (let i = 0; i < numOctaves * numScalesPerOctaves; i++) {
      // special case for imageIndex = 0, it apply binomail filter on itself
      const kernel = gpu.createKernel(function(data, imageWidth, imageHeight, numOctaves, numScalesPerOctaves, imageIndex) {
        const prevImageIndex = imageIndex === 0? 0: imageIndex - 1;
        const prevOctave = Math.floor(prevImageIndex / numScalesPerOctaves);
        const prevScale = prevImageIndex % numScalesPerOctaves;
        const curScale = imageIndex % numScalesPerOctaves;

        let prevStart = 0;
        let prevWidth = imageWidth;
        let prevHeight = imageHeight;
        for (let i = 0; i < prevOctave; i++) {
          prevStart += (numScalesPerOctaves * prevWidth * prevHeight);
          prevWidth = Math.floor(prevWidth / 2);
          prevHeight = Math.floor(prevHeight / 2);
        }
        prevStart += prevWidth * prevHeight * prevScale;

        let curStart = imageIndex === 0? 0: (prevStart + prevWidth * prevHeight);
        let curWidth = prevScale === numScalesPerOctaves - 1? Math.floor(prevWidth/2): prevWidth;
        let curHeight = prevScale === numScalesPerOctaves - 1? Math.floor(prevHeight/2): prevHeight;
        let curEnd = curStart + curWidth * curHeight;

        if (this.thread.x < curStart || this.thread.x >= curEnd) {
          return data[this.thread.x];
        }

        const x = (this.thread.x - curStart) % curWidth;
        const y = Math.floor((this.thread.x - curStart) / curWidth);

        if (imageIndex > 0 && curScale === 0) { // downsample binomial
          const srcPos = prevStart + (y*2) * prevWidth + (x*2);
          const v = (data[srcPos] + data[srcPos+1] + data[srcPos+prevWidth] + data[srcPos+prevWidth+1]) * 0.25;
          return v;
        }
        else { // 4th order binomail filter from previous
          //return data[prevStart];

          let v = data[ prevStart + Math.max(y-2, 0) * prevWidth + Math.max(x-2, 0)]
                + data[ prevStart + Math.max(y-2, 0) * prevWidth + Math.max(x-1, 0)] * 4
                + data[ prevStart + Math.max(y-2, 0) * prevWidth + Math.max(x, 0)] * 6
                + data[ prevStart + Math.max(y-2, 0) * prevWidth + Math.min(x+1, prevWidth-1)] * 4
                + data[ prevStart + Math.max(y-2, 0) * prevWidth + Math.min(x+2, prevWidth-1)]

                + data[ prevStart + Math.max(y-1, 0) * prevWidth + Math.max(x-2, 0)] * 4
                + data[ prevStart + Math.max(y-1, 0) * prevWidth + Math.max(x-1, 0)] * 16
                + data[ prevStart + Math.max(y-1, 0) * prevWidth + Math.max(x, 0)] *  24
                + data[ prevStart + Math.max(y-1, 0) * prevWidth + Math.min(x+1, prevWidth-1)] * 16
                + data[ prevStart + Math.max(y-1, 0) * prevWidth + Math.min(x+2, prevWidth-1)] * 4

                + data[ prevStart + Math.max(y, 0) * prevWidth + Math.max(x-2, 0)] * 6
                + data[ prevStart + Math.max(y, 0) * prevWidth + Math.max(x-1, 0)] * 24
                + data[ prevStart + Math.max(y, 0) * prevWidth + Math.max(x, 0)] * 36
                + data[ prevStart + Math.max(y, 0) * prevWidth + Math.min(x+1, prevWidth-1)] * 24
                + data[ prevStart + Math.max(y, 0) * prevWidth + Math.min(x+2, prevWidth-1)] * 6

                + data[ prevStart + Math.min(y+1, prevHeight-1) * prevWidth + Math.max(x-2, 0)] * 4
                + data[ prevStart + Math.min(y+1, prevHeight-1) * prevWidth + Math.max(x-1, 0)] * 16
                + data[ prevStart + Math.min(y+1, prevHeight-1) * prevWidth + Math.max(x, 0)] *  24
                + data[ prevStart + Math.min(y+1, prevHeight-1) * prevWidth + Math.min(x+1, prevWidth-1)] * 16
                + data[ prevStart + Math.min(y+1, prevHeight-1) * prevWidth + Math.min(x+2, prevWidth-1)] * 4

                + data[ prevStart + Math.min(y+2, prevHeight-1) * prevWidth + Math.max(x-2, 0)]
                + data[ prevStart + Math.min(y+2, prevHeight-1) * prevWidth + Math.max(x-1, 0)] * 4
                + data[ prevStart + Math.min(y+2, prevHeight-1) * prevWidth + Math.max(x, 0)] * 6
                + data[ prevStart + Math.min(y+2, prevHeight-1) * prevWidth + Math.min(x+1, prevWidth-1)] * 4
                + data[ prevStart + Math.min(y+2, prevHeight-1) * prevWidth + Math.min(x+2, prevWidth-1)];
          v /= 256;
          return v;
        }
      }, {
        output: [totalSize],
        pipeline: true,
      });

      subkernels.push(kernel);
    }

    const copykernel = gpu.createKernel(function(data) {
      return data[this.thread.x];
    }, {
      output: [totalSize],
      pipeline: true,
    });

    //kernels.push([initKernel, kernel, copykernel]);
    kernels.push(subkernels);
  }

  const subkernels = kernels[kernelIndex];

  let result = subkernels[0](image.data, image.width, image.height);

  for (let i = 0; i < numOctaves * numScalesPerOctaves; i++) {
    //let lastResult = result;
    result = subkernels[i+1](result, image.width, image.height, numOctaves, numScalesPerOctaves, i);
    //lastResult.delete();
    //if (i === 0) break;
  }
  //let finalResult = subkernels[2](result);
  //result.delete();
  return result;
  //return finalResult;
}

const _upsampleBilinear = (kernelIndex, image, padOneWidth, padOneHeight) => {
  const dstWidth = image.width * 2 + (padOneWidth?1:0);
  const dstHeight = image.height * 2 + (padOneHeight?1:0);

  if (kernelIndex === kernels.length) {
    kernels.push(
      gpu.createKernel(function(data, width, height) {
        const srcWidth = Math.floor(width / 2);
        const srcHeight = Math.floor(height / 2);

        const j = Math.floor(this.thread.x / width);
        const i = this.thread.x % width;
        const si = 0.5 * i - 0.25;
        const sj = 0.5 * j - 0.25;
        const si0 = Math.max(0, Math.floor(si));
        const si1 = Math.min(Math.ceil(si), srcWidth-1);
        const sj0 = Math.max(0, Math.floor(sj));
        const sj1 = Math.min(Math.ceil(sj), srcHeight-1);
        const value = (si1 - si) * (sj1 - sj) * data[ sj0 * width + si0 ] +
                      (si1 - si) * (sj - sj0) * data[ sj1 * width + si0 ] +
                      (si - si0) * (sj1 - sj) * data[ sj0 * width + si1 ] +
                      (si - si0) * (sj - sj0) * data[ sj1 * width + si1 ];
        return value;
      }, {
        output: [dstWidth * dstHeight],
        pipeline: true,
      })
    );
  }
  const kernel = kernels[kernelIndex];
  const result = kernel(image.data, dstWidth, dstHeight);
  return {width: dstWidth, height: dstHeight, data: result};
}

// 4th order binomail filter
const _applyFilter = (kernelIndex, image) => {
  if (kernelIndex === kernels.length) {
    const f1 = gpu.createKernel(function(data, width, height) {
      const j = Math.floor(this.thread.x / width);
      const i = this.thread.x % width;
      const joffset = j * width;
      let v = data[joffset + Math.max(i-2,0)] +
              data[joffset + Math.max(i-1,0)] * 4 +
              data[joffset + i] * 6 +
              data[joffset + Math.min(i+1,width-1)] * 4 +
              data[joffset + Math.min(i+2,width-1)];
      return v;
    }, {
      output: [image.width * image.height],
      pipeline: true
    });

    const f2 = gpu.createKernel(function(temp, width, height) {
      const j = Math.floor(this.thread.x / width);
      const i = this.thread.x % width;

      const v = temp[Math.max(j-2,0) * width + i] +
                 temp[Math.max(j-1,0) * width + i] * 4 +
                 temp[j * width + i] * 6 +
                 temp[Math.min(j+1,height-1) * width + i] * 4 +
                 temp[Math.min(j+2,height-1) * width + i];
      return v / 256;
    }, {
      output: [image.width * image.height],
      pipeline: true,
    });

    const f3 = gpu.createKernel(function(data, width, height) {
      const j = Math.floor(this.thread.x / width);
      const i = this.thread.x % width;
      const joffset = j * width;
      const prevStart = 0;
      const prevWidth = width;
      const prevHeight = height;
      const y = j;
      const x = i;
        let v = data[ prevStart + Math.max(y-2, 0) * prevWidth + Math.max(x-2, 0)]
              + data[ prevStart + Math.max(y-2, 0) * prevWidth + Math.max(x-1, 0)] * 4
              + data[ prevStart + Math.max(y-2, 0) * prevWidth + Math.max(x, 0)] * 6
              + data[ prevStart + Math.max(y-2, 0) * prevWidth + Math.min(x+1, prevWidth-1)] * 4
              + data[ prevStart + Math.max(y-2, 0) * prevWidth + Math.min(x+2, prevWidth-1)]

              + data[ prevStart + Math.max(y-1, 0) * prevWidth + Math.max(x-2, 0)] * 4
              + data[ prevStart + Math.max(y-1, 0) * prevWidth + Math.max(x-1, 0)] * 16
              + data[ prevStart + Math.max(y-1, 0) * prevWidth + Math.max(x, 0)] *  24
              + data[ prevStart + Math.max(y-1, 0) * prevWidth + Math.min(x+1, prevWidth-1)] * 16
              + data[ prevStart + Math.max(y-1, 0) * prevWidth + Math.min(x+2, prevWidth-1)] * 4

              + data[ prevStart + Math.max(y, 0) * prevWidth + Math.max(x-2, 0)] * 6
              + data[ prevStart + Math.max(y, 0) * prevWidth + Math.max(x-1, 0)] * 24
              + data[ prevStart + Math.max(y, 0) * prevWidth + Math.max(x, 0)] * 36
              + data[ prevStart + Math.max(y, 0) * prevWidth + Math.min(x+1, prevWidth-1)] * 24
              + data[ prevStart + Math.max(y, 0) * prevWidth + Math.min(x+2, prevWidth-1)] * 6

              + data[ prevStart + Math.min(y+1, prevHeight-1) * prevWidth + Math.max(x-2, 0)] * 4
              + data[ prevStart + Math.min(y+1, prevHeight-1) * prevWidth + Math.max(x-1, 0)] * 16
              + data[ prevStart + Math.min(y+1, prevHeight-1) * prevWidth + Math.max(x, 0)] *  24
              + data[ prevStart + Math.min(y+1, prevHeight-1) * prevWidth + Math.min(x+1, prevWidth-1)] * 16
              + data[ prevStart + Math.min(y+1, prevHeight-1) * prevWidth + Math.min(x+2, prevWidth-1)] * 4

              + data[ prevStart + Math.min(y+2, prevHeight-1) * prevWidth + Math.max(x-2, 0)]
              + data[ prevStart + Math.min(y+2, prevHeight-1) * prevWidth + Math.max(x-1, 0)] * 4
              + data[ prevStart + Math.min(y+2, prevHeight-1) * prevWidth + Math.max(x, 0)] * 6
              + data[ prevStart + Math.min(y+2, prevHeight-1) * prevWidth + Math.min(x+1, prevWidth-1)] * 4
              + data[ prevStart + Math.min(y+2, prevHeight-1) * prevWidth + Math.min(x+2, prevWidth-1)];
      v /= 256;
      return v;
    }, {
      output: [image.width * image.height],
      pipeline: true
    });
    kernels.push({f1, f2, f3});
  }
  const {f1, f2, f3} = kernels[kernelIndex];
  const result = f2(f1(image.data, image.width, image.height), image.width, image.height);
  //const result = f3(image.data, image.width, image.height);

  return {width: image.width, height: image.height, data: result};
}

const _differenceImageBinomial = (kernelIndex, image1, image2) => {
  if (kernelIndex === kernels.length) {
    kernels.push(
      gpu.createKernel(function(data1, data2) {
        return data1[this.thread.x] - data2[this.thread.x];
      }, {
        output: [image1.width * image1.height],
        pipeline: true,
      })
    );
  }
  const kernel = kernels[kernelIndex];
  const result = kernel(image1.data, image2.data);
  return {width: image1.width, height: image1.height, data: result};
}

// have better way?!
const __stackImages = (kernelIndex, images) => {
  if (kernelIndex === kernels.length) {
    let totalSize = 0;
    for (let i = 0; i < images.length; i++) {
      totalSize += images[i].width * images[i].height;
    }

    const subkernels = [];
    subkernels.push(
      gpu.createKernel(function() {
        return -1;
      }, {
        output: [totalSize],
        pipeline: true,
      })
    );

    for (let i = 0; i < images.length; i++) {
      subkernels.push(
        gpu.createKernel(function(data, newData, width, height, start, allData) {
          const x = this.thread.x - start;
          if (x < 0 || x >= width * height) return data[this.thread.x];
          ///return newData[x];
          return allData[0][x];
        }, {
          output: [totalSize],
          pipeline: true,
        })
      );
    }
    //kernels.push(subkernels);
    kernels.push(
      gpu.createKernel(function(allData) {
        return allData[0][0];
      }, {
        output: [totalSize],
        pipeline: true,
      })
    );
  }
  const allData = [];
  for (let i = 0; i < images.length; i++) {
    allData.push(images[i].data);
  }

  console.log("clal stack");
  const result = kernels[kernelIndex](allData);
  return result;

  /*
  const subkernels = kernels[kernelIndex];

  let result = subkernels[0]();
  let start = 0;
  for (let i = 0; i < images.length; i++) {
    result = subkernels[i+1](result, images[i].data, images[i].width, images[i].height, start, [images[0].data, images[1].data]);
    start += images[i].width * images[i].height;
  }
  return result;
  */
}

const _stackImages = (kernelIndex, images) => {
  const width = images[0].width;
  const height = images[0].height;
  const depth = images.length;

  if (kernelIndex === kernels.length) {
    const subkernels = [];

    for (let i = 0; i < images.length; i++) {
      if (i === 0) {
        subkernels.push(
          gpu.createKernel(function(data, width, height) {
            return data[this.thread.y * width + this.thread.x];
          }, {
            output: [width, height, 1],
            pipeline: true,
          })
        )
      } else {
        subkernels.push(
          gpu.createKernel(function(data1, data2, data2Width, data2Height, depth) {
            if (this.thread.z === depth) {
              if (this.thread.y >= data2Height) return -1;
              if (this.thread.x >= data2Width) return -1;

              return data2[this.thread.y * data2Width + this.thread.x];
            }
            return data1[this.thread.z][this.thread.y][this.thread.x];
          }, {
            output: [width, height, i+1],
            pipeline: true,
          })
        );
      }
    }
    kernels.push(subkernels);
  }

  let result = null;
  for (let i = 0; i < images.length; i++) {
    const kernel = kernels[kernelIndex][i];
    if (i === 0) {
      result = kernel(images[0].data, images[0].width, images[0].height);
    } else {
      result = kernel(result, images[i].data, images[i].width, images[i].height, i);
    }
  }
  return result;
}

/**
 * Fit a quatratic to 3 points. The system of equations is:
 *
 * y0 = A*x0^2 + B*x0 + C
 * y1 = A*x1^2 + B*x1 + C
 * y2 = A*x2^2 + B*x2 + C
 *
 * This system of equations is solved for A,B,C.
 */
const _quadratic3Points = (options) => {
  const {p1, p2, p3} = options;
  const d1 = (p3[0]-p2[0])*(p3[0]-p1[0]);
  const d2 = (p1[0]-p2[0])*(p3[0]-p1[0]);
  const d3 = p1[0]-p2[0];

  // If any of the denominators are zero then return FALSE.
  if (d1 == 0 || d2 == 0 || d3 == 0) {
    return null;
  }

  const a = p1[0]*p1[0];
  const b = p2[0]*p2[0];

  // Solve for the coefficients A,B,C
  const A = ((p3[1]-p2[1])/d1)-((p1[1]-p2[1])/d2);
  const B = ((p1[1]-p2[1])+(A*(b-a)))/d3;
  const C = p1[1]-(A*a)-(B*p1[0]);

  return {A, B, C};
}

module.exports = {
  detect
};
