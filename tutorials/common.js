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
  }
}
