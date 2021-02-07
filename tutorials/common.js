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
    ctx.lineWidth = 4;
    ctx.strokeStyle = color;
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
