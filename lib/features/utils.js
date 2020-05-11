const upsampleBilinear = (options) => {
  const {imageData, width, height, padOneWidth, padOneHeight} = options;

  const dstWidth = width * 2 + (padOneWidth?1:0);
  const dstHeight = height * 2 + (padOneHeight?1:0);

  const temp = new Float32Array(dstWidth * dstHeight);
  for (let i = 0; i < dstWidth; i++) {
    const si = 0.5 * i - 0.25;
    let si0 = Math.floor(si);
    let si1 = Math.ceil(si);
    if (si0 < 0) si0 = 0; // border
    if (si1 >= width) si1 = width - 1; // border

    for (let j = 0; j < dstHeight; j++) {
      const sj = 0.5 * j - 0.25;
      let sj0 = Math.floor(sj);
      let sj1 = Math.ceil(sj);
      if (sj0 < 0) sj0 = 0; // border
      if (sj1 >= height) sj1 = height - 1; //border

      const value = (si1 - si) * (sj1 - sj) * imageData[ sj0 * width + si0 ] +
                    (si1 - si) * (sj - sj0) * imageData[ sj1 * width + si0 ] +
                    (si - si0) * (sj1 - sj) * imageData[ sj0 * width + si1 ] +
                    (si - si0) * (sj - sj0) * imageData[ sj1 * width + si1 ];

      temp[j * dstWidth + i] = value;
    }
  }
  return {imageData: temp, width: dstWidth, height: dstHeight};
}

const downsampleBilinear = (options) => {
  const {imageData, width, height} = options;

  const dstWidth = Math.floor(width / 2);
  const dstHeight = Math.floor(height / 2);

  const temp = new Float32Array(dstWidth * dstHeight);
  const offsets = [0, 1, width, width+1];
  for (let j = 0; j < dstHeight; j++) {
    for (let i = 0; i < dstWidth; i++) {
      let srcPos = j*2 * width + i*2;

      let value = 0.0;
      for (let d = 0; d < offsets.length; d++) {
        value += imageData[srcPos+ offsets[d]];
      }
      value *= 0.25;
      temp[j*dstWidth+i] = value;
    }
  }
  return {imageData: temp, width: dstWidth, height: dstHeight};
}

module.exports = {
  downsampleBilinear,
  upsampleBilinear,
}
