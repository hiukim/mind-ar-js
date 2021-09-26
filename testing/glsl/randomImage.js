const randomImage = (height, width) => {
  const mRandSeed = 1234;

  const createRandomizer = () => {
    const randomizer = {
      seed: mRandSeed,

      arrayShuffle(options) {
	const {arr, sampleSize} = options;
	for (let i = 0; i < sampleSize; i++) {

	  this.seed = (214013 * this.seed + 2531011) % (1 << 31);
	  let k = (this.seed >> 16) & 0x7fff;
	  k = k % arr.length;

	  let tmp = arr[i];
	  arr[i] = arr[k];
	  arr[k] = tmp;
	}
      },

      nextInt(maxValue) {
	this.seed = (214013 * this.seed + 2531011) % (1 << 31);
	let k = (this.seed >> 16) & 0x7fff;
	k = k % maxValue;
	return k;
      }
    }
    return randomizer;
  }

  const randomizer = createRandomizer();

  const tData = new Uint8ClampedArray(height * width * 4);
  for (let j = 0; j < height; j++) {
    for (let i = 0; i < width; i++) {
      const index = j * width + i;
      tData[index*4] = randomizer.nextInt(255);
      tData[index*4+1] = randomizer.nextInt(255);
      tData[index*4+2] = randomizer.nextInt(255);
      tData[index*4+3] = 255;
    }
  }
  const imageData = new ImageData(tData, width, height);
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.putImageData(imageData, 0, 0);

  console.log("tData", tData);

  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.onload = () => {
      resolve(img);
    }
    img.src = canvas.toDataURL("image/png");
  });
}
