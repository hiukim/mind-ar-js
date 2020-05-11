// compute Difference-of-Gaussian pyramids from gaussian pyramids
//
// pyramid = {
//   numOctaves,
//   numScalesPerOctaves,
//   images: [{imageData, width, height}, {}, {}] // image at octave i and scale j = images[i * numScalesPerOctaves + j]
// }

const build = (options) => {
  const {gaussianPyramid} = options;

  const numOctaves = gaussianPyramid.numOctaves;
  const numScalesPerOctaves = gaussianPyramid.numScalesPerOctaves - 1;

  const pyramidImages = [];
  for (let i = 0; i < numOctaves; i++) {
    for (let j = 0; j < numScalesPerOctaves; j++) {
      const image1 = gaussianPyramid.images[i * gaussianPyramid.numScalesPerOctaves + j];
      const image2 = gaussianPyramid.images[i * gaussianPyramid.numScalesPerOctaves + j + 1];
      pyramidImages.push(  _differenceImageBinomial({image1, image2}));
    }
  }
  return {
    numOctaves,
    numScalesPerOctaves,
    images: pyramidImages
  }
}

const _differenceImageBinomial = (options) => {
  const {image1, image2} = options;
  if (image1.imageData.length !== image2.imageData.length) {
    throw "image length doesn't match";
  }

  const imageData = new Float32Array(image1.imageData.length);
  for (let i = 0; i < image1.imageData.length; i++) {
    imageData[i] = image1.imageData[i] - image2.imageData[i];
  }
  return {imageData: imageData, width: image1.width, height: image1.height};
}

module.exports = {
  build
};
