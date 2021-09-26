const utils = {
  loadImage: async (src) => {
    const img = new Image();
    return new Promise((resolve, reject) => {
      let img = new Image()
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src; 
    })
  },

  drawPoint: (ctx, color, centerX, centerY, radius=1) => {
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    //ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    ctx.stroke();
  },

  drawRect: (ctx, color, centerX, centerY, width) => {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.rect(centerX - width/2, centerY - width /2 , width, width);
    ctx.stroke();
  },

  drawLine: (ctx, color, fromX, fromY, toX, toY) => {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
  },

  pixel2DToImageData: (pixels) => {
    const height = pixels.length;
    const width = pixels[0].length;
    const data = new Uint8ClampedArray(height * width * 4);
    for (let j = 0; j < height; j++) {
      for (let i = 0; i < width; i++) {
	const pos = j * width + i;
	data[pos*4 + 0] = pixels[j][i];
	data[pos*4 + 1] = pixels[j][i];
	data[pos*4 + 2] = pixels[j][i];
	data[pos*4 + 3] = 255; 
      }
    }
    const imageData = new ImageData(data, width, height);
    return imageData;
  },

  pixel3DToImageData: (pixels) => {
    const height = pixels.length;
    const width = pixels[0].length;
    const data = new Uint8ClampedArray(height * width * 4);
    for (let j = 0; j < height; j++) {
      for (let i = 0; i < width; i++) {
	const pos = j * width + i;
	data[pos*4 + 0] = pixels[j][i][0];
	data[pos*4 + 1] = pixels[j][i][1];
	data[pos*4 + 2] = pixels[j][i][2];
	data[pos*4 + 3] = 255; 
      }
    }
    const imageData = new ImageData(data, width, height);
    return imageData;
  },

  pixel1DToImageData: (pixels, width, height) => {
    const data = new Uint8ClampedArray(pixels.length * 4);
    for (let j = 0; j < pixels.length; j++) {
      data[j*4 + 0] = pixels[j];
      data[j*4 + 1] = pixels[j];
      data[j*4 + 2] = pixels[j];
      data[j*4 + 3] = 255; 
    }
    const imageData = new ImageData(data, width, height);
    return imageData;
  },

  matrixInverse33: (A, threshold) => {
    const det = utils.determinant(A);
    if (Math.abs(det) <= threshold) return null;
    const oneOver = 1.0 / det;

    const B = [
      (A[4] * A[8] - A[5] * A[7]) * oneOver,
      (A[2] * A[7] - A[1] * A[8]) * oneOver,
      (A[1] * A[5] - A[2] * A[4]) * oneOver,
      (A[5] * A[6] - A[3] * A[8]) * oneOver,
      (A[0] * A[8] - A[2] * A[6]) * oneOver,
      (A[2] * A[3] - A[0] * A[5]) * oneOver,
      (A[3] * A[7] - A[4] * A[6]) * oneOver,
      (A[1] * A[6] - A[0] * A[7]) * oneOver,
      (A[0] * A[4] - A[1] * A[3]) * oneOver,
    ];
    return B;
  },
  determinant: (A) => {
    const C1 =  A[4] * A[8] - A[5] * A[7];
    const C2 =  A[3] * A[8] - A[5] * A[6];
    const C3 =  A[3] * A[7] - A[4] * A[6];
    return A[0] * C1 - A[1] * C2 + A[2] * C3;
  }
}
