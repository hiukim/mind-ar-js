const { useEffect, useMemo, useRef, useState, useCallback } = React;

const MATCH_TYPES = ['none', 'matches', 'houghMatches', 'inlierMatches', 'matches2', 'houghMatches2', 'inlierMatches2'];
const COLORS = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'];

const Display = ({result}) => {
  const pyramidContainerRef = useRef(null);
  const dogContainerRef = useRef(null);
  const extremasContainerRef = useRef(null);
  const prunedContainerRef = useRef(null);

  const freakExpansion = 7;

  const toImage = (arr, points, lines) => {
    const imageData = utils.pixel2DToImageData(arr);

    const canvas = document.createElement('canvas');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    const ctx = canvas.getContext('2d');
    ctx.putImageData(imageData, 0, 0);

    if (points) {
      for (let i = 0; i < points.length; i++) {
	const {x, y, radius} = points[i];
	utils.drawPoint(ctx, '#00ff00', x, y, radius);
	utils.drawPoint(ctx, '#00ff00', x, y, freakExpansion);
      }
    }

    if (lines) {
      for (let i = 0; i < lines.length; i++) {
	const {x, y, toX, toY} = lines[i];
	utils.drawLine(ctx, '#00ff00', x, y, toX, toY);
      }
    }

    const image = new Image();
    //image.style.width = imageData.width / 4;
    image.src = canvas.toDataURL();
    return image;
  }

  useEffect(() => {
    const {queryImage, pyramidImages, extremaAngles, dogPyramidImages, extremasResults, localizedExtremas, crop} = result;

    const octavePoints = [];
    const octaveLines = [];
    for (let i = 0; i < pyramidImages.length; i++) {
      octavePoints.push([]);
      octaveLines.push([]);
    }
    for (let j = 0; j < localizedExtremas.length; j++) {
      //if (j !== 46) continue;

      //const ex = localizedExtremas[j];
      const ex = localizedExtremas[j];

      const octave = Math.round(ex[1]);
      const y = ex[2];
      const x = ex[3];

      const angle = extremaAngles[j];
      //const dx = 10 * Math.sqrt(1 / (1 + Math.tan(angle) * Math.tan(angle)));
      //const dy = Math.tan(angle) * dx;

      const r = freakExpansion;
      let dx = Math.sqrt(r*r / (1 + Math.tan(angle) * Math.tan(angle))); 
      let dy = Math.sqrt(r*r - dx*dx);
      if (angle < 0) dy = -dy;
      if (Math.abs(angle) > Math.PI/2) dx = -dx;

      octaveLines[octave].push({
	x: x,
	y: y,
	toX: x + dx,
	toY: y + dy,
      });
      //console.log("angle", angle);

      octavePoints[octave].push({
	y: y,
	x: x,
	radius: 2,
	//radius: Math.pow(2, octave) 
      });
    }
    console.log("octavePoints", octavePoints);

    for (let i = 0; i < pyramidImages.length; i++) {
      for (let j = 0; j < pyramidImages[i].length; j++) {
	pyramidContainerRef.current.appendChild(toImage(pyramidImages[i][j], octavePoints[i], octaveLines[i]));
      }
    }

    for (let i = 0; i < dogPyramidImages.length; i++) {
      const img = dogPyramidImages[i];
      if (!img) continue;
      //console.log("img", img);

      const pixels = img.map((row) => {
	return row.map((col) => {
	  return Math.abs(col) * 25;
	});
      });
      dogContainerRef.current.appendChild(toImage(pixels, octavePoints[i]));
    }

    for (let i = 0; i < extremasResults.length; i++) {
      const img = extremasResults[i];
      const pixels = img.map((row) => {
	return row.map((col) => {
	  return col > 0? 255: 0;
	});
      });
      extremasContainerRef.current.appendChild(toImage(pixels));
    }

    const canvas = document.createElement("canvas");
    canvas.width = queryImage.width;
    canvas.height = queryImage.height;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(queryImage, 0, 0);

    for (let i = 0; i < localizedExtremas.length; i++) {
      const ex = localizedExtremas[i];
      if (ex[0] == 0) continue;
      const octave = ex[1]; 
      const y = ex[2]; 
      const x = ex[3]; 
      let originalY = y * Math.pow(2, octave) + Math.pow(2, octave-1) - 0.5;
      let originalX = x * Math.pow(2, octave) + Math.pow(2, octave-1) - 0.5;
      originalY += crop.startY;
      originalX += crop.startX;

      let radius = Math.pow(2, octave);
      utils.drawPoint(ctx, '#ff0000', originalX, originalY, radius);

      const angle = extremaAngles[i];
      //const dx = 5 * Math.pow(2, octave) * Math.sqrt(1 / (1 + Math.tan(angle) * Math.tan(angle)));
      //const dy = Math.tan(angle) * dx;

      const r = 10;
      let dx = Math.sqrt(r*r / (1 + Math.tan(angle) * Math.tan(angle))); 
      let dy = Math.sqrt(r*r - dx*dx);
      if (angle < 0) dy = -dy;
      if (Math.abs(angle) > Math.PI/2) dx = -dx;
      //console.log("dy", dx, dy);

      utils.drawLine(ctx, '#ff0000', originalX, originalY, originalX+dx, originalY+dy);
    }
    prunedContainerRef.current.appendChild(canvas);
  }, [result]);
  return (
    <div>
      <div ref={pyramidContainerRef}>
      </div>
      <div ref={dogContainerRef}>
      </div>
      <div ref={extremasContainerRef}>
      </div>
      <div ref={prunedContainerRef}>
      </div>
    </div>
  )
}

const Main = () => {
  const [result, setResult] = useState();

  useEffect(() => {
    const process = async () => {
      //const queryImage = await utils.loadImage('../tests/video2/out11.png');
      const queryImage = await utils.loadImage('../tests/videos/c1/out015.png');
      //const queryImage = await utils.loadImage('../tests/card-parallel.png');

      const inputWidth = queryImage.width;
      const inputHeight = queryImage.height;
      const controller = new MINDAR.Controller({inputWidth, inputHeight, debugMode: true});

      const {featurePoints, debugExtra} = await controller.detect(queryImage);

      const result = {
	queryImage,
	pyramidImages: debugExtra.pyramidImages,
	dogPyramidImages: debugExtra.dogPyramidImages,
	extremasResults: debugExtra.extremasResults,
	prunedExtremas: debugExtra.prunedExtremas,
	localizedExtremas: debugExtra.localizedExtremas,
	extremaAngles: debugExtra.extremaAngles,
	crop: debugExtra.crop
      }
      console.log("result", result);
      setResult(result);
    }
    process();
  }, []);

  return (
    <div className="detection">
      {result && <Display result={result} />}
      {!result && <div>Loading...</div>}
    </div>
  )
};

ReactDOM.render(
  <Main/>,
  document.getElementById('root')
);

