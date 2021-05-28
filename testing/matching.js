const { useEffect, useMemo, useRef, useState, useCallback } = React;

const MATCH_TYPES = ['none', 'matches', 'houghMatches', 'inlierMatches', 'matches2', 'houghMatches2', 'inlierMatches2'];
const COLORS = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'];

const Display = ({result}) => {
  const {queryImage, queryFeaturePoints, target, matchResults} = result; 
  const {images: targetImages, matchingData: targetMatchingData} = target;

  const [matchType, setMatchType] = useState('none');
  const [pointScale, setPointScale] = useState('');
  const [keyframeIndex, setKeyframeIndex] = useState(0);
  const canvasRef = useRef(null);

  const inputWidth = queryImage.width;
  const inputHeight = queryImage.height;
  const displayWidth = 500;
  const displayHeight = parseInt(displayWidth * inputHeight / inputWidth);

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasWidth = inputWidth * 2;
    canvas.width = canvasWidth;
    canvas.height = inputHeight;
    canvas.style.width = displayWidth * 2;
    canvas.style.height = displayHeight;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(queryImage, 0, 0);

    const targetImage = targetImages[keyframeIndex];

    const tData = new Uint8ClampedArray(targetImage.width * targetImage.height * 4);
    for (let i = 0; i < targetImage.data.length; i++) {
      tData[i*4+0] = targetImage.data[i];
      tData[i*4+1] = targetImage.data[i];
      tData[i*4+2] = targetImage.data[i];
      tData[i*4+3] = 255;
    }
    const targetOffsetX = inputWidth + 100;
    const targetOffsetY = Math.floor((inputHeight - targetImage.height) / 2);
    const imageData = new ImageData(tData, targetImage.width, targetImage.height);
    ctx.putImageData(imageData, targetOffsetX, targetOffsetY, 0, 0, targetImage.width, targetImage.height);

    const targetFeaturePoints = targetMatchingData[keyframeIndex].points;

    const matchResult = matchResults[keyframeIndex];
    if (matchType === 'none') {
      for (let i = 0; i < queryFeaturePoints.length; i++) {
	if (pointScale === '' || pointScale == queryFeaturePoints[i].scale) {
	  utils.drawPoint(ctx, '#ff0000', Math.round(queryFeaturePoints[i].x), Math.round(queryFeaturePoints[i].y), queryFeaturePoints[i].scale);
	}
      }
      for (let i = 0; i < targetFeaturePoints.length; i++) {
	if (pointScale === '' || pointScale == targetFeaturePoints[i].scale) {
	  utils.drawPoint(ctx, '#ff0000', Math.round(targetFeaturePoints[i].x) + targetOffsetX, Math.round(targetFeaturePoints[i].y) + targetOffsetY, targetFeaturePoints[i].scale);
	}
      }
    } else {
      if (matchResult[matchType]) {
	const matches = matchResult[matchType];
	for (let m = 0; m < matches.length; m++) {
	  const querypoint = queryFeaturePoints[matches[m].querypointIndex];
	  const targetpoint = targetFeaturePoints[matches[m].keypointIndex];
	  const color = COLORS[m % COLORS.length];

	  utils.drawLine(
	    ctx, 
	    color, 
	    Math.round(querypoint.x),
	    Math.round(querypoint.y),
	    Math.round(targetpoint.x) + targetOffsetX,
	    Math.round(targetpoint.y) + targetOffsetY,
	  )

	  utils.drawPoint(ctx, color, Math.round(querypoint.x), Math.round(querypoint.y), querypoint.scale);
	  utils.drawPoint(ctx, color, Math.round(targetpoint.x) + targetOffsetX, Math.round(targetpoint.y) + targetOffsetY, targetpoint.scale);
	}
      }
    }
  }, [matchType, keyframeIndex, pointScale]);
  
  const targetScaleList = useMemo(() => {
    return matchResults.map((matchResult, index) => {
      let count = [];
      for (let i = 0; i < MATCH_TYPES.length; i++) {
	const type = MATCH_TYPES[i];
	if (type === 'none') continue;
	count.push( matchResult[type]? matchResult[type].length: 0);
      }
      return 'T' + index + '[' + count.join("-") + ']';
    });
  }, [result]);

  const pointScaleList = useMemo(() => {
    const scaleSet = {};
    queryFeaturePoints.forEach((featurePoint) => {
      scaleSet[featurePoint.scale] = true;
    });
    return ['', ...Object.keys(scaleSet)];
  }, [result]);

  return (
    <div>
      <div className="control">
	<div className="section">
	  {MATCH_TYPES.map((type) => (
	    <button className={type===matchType? 'selected': ''} key={type} onClick={() => {setMatchType(type)}}>{type}</button>
	  ))}
	</div>
	<div className="section">
    	  {targetScaleList.map((scale, index) => (
	    <button className={index===keyframeIndex? 'selected': ''}  key={index} onClick={() => {setKeyframeIndex(index)}}>{scale}</button>
	  ))}
	</div>
	<div className="section">
    	  {pointScaleList.map((scale) => (
	    <button className={scale===pointScale? 'selected': ''}  key={scale} onClick={() => {setPointScale(scale)}}>{scale || 'all'}</button>
	  ))}
	</div>
      </div>
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}

const Main = () => {
  const [result, setResult] = useState();

  useEffect(() => {
    const process = async () => {
      const queryImage = await utils.loadImage('../tests/video2/out11.png');

      const inputWidth = queryImage.width;
      const inputHeight = queryImage.height;
      const controller = new MINDAR.Controller({inputWidth, inputHeight, debugMode: true});
      const {dimensions, matchingDataList, imageListList} = await controller.addImageTargets('../examples/assets/card-example/card.mind');

      const featurePoints = await controller.detect(queryImage);
      const {modelViewTransform, debugExtras} = await controller.match(featurePoints);

      const result = {
	queryImage: queryImage,
	queryFeaturePoints: featurePoints,
	target: {
	  images: imageListList[0],
	  matchingData: matchingDataList[0]
	},
	matchResults: debugExtras[0],
      }
      setResult(result);
    }
    process();
  }, []);

  console.log("result", result);

  return (
    <div className="matching">
      {result && <Display result={result} />}
      {!result && <div>Loading...</div>}
    </div>
  )
};

ReactDOM.render(
  <Main/>,
  document.getElementById('root')
);
