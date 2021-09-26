const { useEffect, useMemo, useRef, useState, useCallback } = React;

const COLORS = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'];

const TEMPLATE_RADIUS = 6;
const AR2_SEARCH_SIZE = 10;

const TRACKING_KEYFRAME = 1; // 0: 256px, 1: 128px

const Display = ({result}) => {
  const [trackType, setTrackType] = useState('goodTrack');
  const [keyframeIndex, setKeyframeIndex] = useState(0);
  const [queryIndex, setQueryIndex] = useState(0);
  const projectedCanvasContainerRef = useRef(null);
  const queryCanvasRef = useRef(null);
  const capturedCanvasRef = useRef(null);
  const targetCanvasRef = useRef(null);
  const newProjectedCanvasRef = useRef(null);
  const projectedCanvasRef = useRef(null);
  const rotatedProjectedCanvasRef = useRef(null);
  const smartDetectionCanvas = useRef(null);

  const {queryImages, queryResults, target, dimensions, projectionMatrix} = result; 
  const {dimenion: targetDimension, trackingData: targetTrackingData} = target;

  const queryResult = useMemo(() => {
    return queryResults[queryIndex];
  }, [queryIndex]);
  
  const targetTrackingPoints = useMemo(() => {
    return targetTrackingData[TRACKING_KEYFRAME].points;
  }, []);
  const targetTrackingFrame = useMemo(() => {
    return targetTrackingData[TRACKING_KEYFRAME];
  }, []);

  useEffect(() => {
    const numTrials = 1;
    const projectedContainer = projectedCanvasContainerRef.current;

    for (let i = 0; i < numTrials; i++) {
      const canvas = document.createElement("canvas");
      const div = document.createElement("div");
      projectedContainer.appendChild(div);
      projectedContainer.appendChild(canvas);
    }
  }, []);

  // target canvas
  useEffect(() => {
    const goodTrack = queryResult.trackResult.debugExtra.goodTrack;

    const canvas = targetCanvasRef.current;
    canvas.width = targetTrackingFrame.width;
    canvas.height = targetTrackingFrame.height;
    const ctx = canvas.getContext('2d');

    const imageData = utils.pixel1DToImageData(targetTrackingFrame.data, targetTrackingFrame.width, targetTrackingFrame.height);
    ctx.putImageData(imageData, 0, 0);

    ctx.lineWidth = 2;
    for (let i = 0; i < targetTrackingPoints.length; i++) {
      const color = COLORS[i % COLORS.length];
      const targetPoint = targetTrackingPoints[i];

      if (trackType === 'search' || trackType === 'track' || (trackType === 'goodTrack' && goodTrack.includes(i))) { 
	utils.drawRect(ctx, color, Math.round(targetPoint.x), Math.round(targetPoint.y), TEMPLATE_RADIUS * 2);
      }
    }
  }, [queryIndex, keyframeIndex, trackType]);

  // projected image canvas
  useEffect(() => {
    const trackResult = queryResult.trackResult[keyframeIndex];
    const projectedImage = queryResult.trackResult.debugExtra.projectedImage;

    const projectedImages = [queryResult.trackResult.debugExtra.projectedImage];
    for (let i = 0; i < projectedImages.length; i++) {
      const projectedImage = projectedImages[i];
      const goodTrack = queryResult.trackResult.debugExtra.goodTrack;
      //const avgSim = queryResult.trackResult.debugExtra.avgSims[i];
      //const isBest = queryResult.trackResult.debugExtra.bestProjectedIndex === i;

      const canvas =  projectedCanvasContainerRef.current.getElementsByTagName("canvas")[i];
      const div =  projectedCanvasContainerRef.current.getElementsByTagName("div")[i];
      const ctx = canvas.getContext('2d');
      canvas.height = projectedImage.length;
      canvas.width = projectedImage[0].length;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      //div.innerHTML = (isBest? "*": "") + goodTrack.length + "(" + avgSim + ")";
      ctx.putImageData(utils.pixel2DToImageData(projectedImage), 0, 0);

      for (let j = 0; j < targetTrackingPoints.length; j++) {
	const color = COLORS[j % COLORS.length];
	const trackingPoint = targetTrackingPoints[j];
	const matchingPoint = queryResult.trackResult.debugExtra.matchingPoints[j];

	if (trackType === 'search') {
	  utils.drawPoint(ctx, color, Math.round(trackingPoint.x), Math.round(trackingPoint.y), AR2_SEARCH_SIZE);
	}
	if (trackType === 'track') {
	  utils.drawRect(ctx, color, Math.round(matchingPoint[0] * targetTrackingFrame.scale), Math.round(matchingPoint[1] * targetTrackingFrame.scale), TEMPLATE_RADIUS * 2);
	}
	if (trackType === 'goodTrack' && goodTrack.includes(j)) {
	  utils.drawRect(ctx, color, Math.round(matchingPoint[0] * targetTrackingFrame.scale), Math.round(matchingPoint[1] * targetTrackingFrame.scale), TEMPLATE_RADIUS * 2);
	}
      }
    }
  }, [queryIndex, keyframeIndex, trackType]);

  // new projected
  useEffect(() => {
    const projectedImage = queryResult.updatedProjectedImage;
    const canvas = newProjectedCanvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (projectedImage) {
      canvas.height = projectedImage.length;
      canvas.width = projectedImage[0].length;
      ctx.putImageData(utils.pixel2DToImageData(projectedImage), 0, 0);
    }
  }, [queryIndex, keyframeIndex, trackType]);

  // region captured image
  useEffect(() => {
    const projectedImage = queryResult.capturedImage;
    const canvas = capturedCanvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (projectedImage) {
      canvas.height = projectedImage.length;
      canvas.width = projectedImage[0].length;
      ctx.putImageData(utils.pixel3DToImageData(projectedImage), 0, 0);
    }
  }, [queryIndex, keyframeIndex, trackType]);

  // query
  useEffect(() => {
    const queryImage = queryImages[queryIndex];
    const center = queryResult.trackResult.debugExtra.center;
    const trackedPoints = queryResult.trackResult.debugExtra.trackedPoints;
    const goodTrack = queryResult.trackResult.debugExtra.goodTrack;

    const canvas = queryCanvasRef.current;
    canvas.width = queryImage.width;
    canvas.height = queryImage.height;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(queryImage, 0, 0);

    ctx.lineWidth = 5;
    for (let i = 0; i < trackedPoints.length; i++) {
      const color = COLORS[goodTrack[i] % COLORS.length];
      const trackedPoint = trackedPoints[i]; 

      if (trackType === 'goodTrack') {
	utils.drawRect(ctx, color, Math.round(trackedPoint.x), Math.round(trackedPoint.y), TEMPLATE_RADIUS * 2);
      }
    }
  }, [queryIndex, keyframeIndex, trackType]);

  return (
    <div>
      <div className="control">
	<div className="section">
    	  {queryImages.map((queryImage, index) => (
	    <button className={index===queryIndex? 'selected': ''}  key={index} onClick={() => {setQueryIndex(index)}}>I{index} {queryResults[index].smartDetection? "*": ""}</button>
	  ))}
	</div>

	<div className="section">
	  <button className={trackType==='none'? 'selected': ''} onClick={() => {setTrackType('none')}}>none</button>
	  <button className={trackType==='search'? 'selected': ''} onClick={() => {setTrackType('search')}}>search</button>
	  <button className={trackType==='track'? 'selected': ''} onClick={() => {setTrackType('track')}}>track</button>
	  <button className={trackType==='goodTrack'? 'selected': ''} onClick={() => {setTrackType('goodTrack')}}>good track</button>
	  <button className={trackType==='detection'? 'selected': ''} onClick={() => {setTrackType('detection')}}>detection</button>
	</div>

        {/*
	<div className="section">
    	  {targetScaleList.map((scale, index) => (
	    <button className={index===keyframeIndex? 'selected': ''}  key={index} onClick={() => {setKeyframeIndex(index)}}>{scale}</button>
	  ))}
	</div>
	*/}
      </div>

      <div className="canvas-container">
	<div className="column">
	  <canvas className="query-canvas" ref={queryCanvasRef}></canvas>
	</div>
	<div className="column">
	  <canvas className="target-canvas" ref={targetCanvasRef}></canvas>
	  <canvas className="new-projected-canvas" ref={newProjectedCanvasRef}></canvas>
	  <canvas className="captured-canvas" ref={capturedCanvasRef}></canvas>
	</div>
	<div className="column" ref={projectedCanvasContainerRef}>
	</div>
      </div>
    </div>
  )
};

const Main = () => {
  const [result, setResult] = useState();

  useEffect(() => {
    const targetIndex = 0;
    const queryImages = [];
    const process = async () => {
      //for (let i = 39; i <= 39; i+=2) {
      //for (let i = 39; i <= 43; i+=2) {
      for (let i = 39; i <= 100; i+=2) {
	try {queryImages.push(await utils.loadImage('../tests/videos/p1/out' + String(i).padStart(3, '0') + '.png'));} catch (e) {}
      }
      for (let i = 107; i <= 307; i+=5) {
	//queryImages.push(await utils.loadImage('../tests/video2/out' + i + '.png'));
      }

      const queryImage0 = queryImages[0];
      const inputWidth = queryImage0.width;
      const inputHeight = queryImage0.height;
      const controller = new MINDAR.Controller({inputWidth, inputHeight, debugMode: true});
      //const {dimensions, matchingDataList, trackingDataList} = await controller.addImageTargets('../examples/assets/card-example/card.mind');
      const {dimensions, matchingDataList, trackingDataList} = await controller.addImageTargets('../examples/assets/band-example/raccoon.mind');

      // initial match
      let firstModelViewTransform;
      while (queryImages.length > 0) {
	const {featurePoints} = await controller.detect(queryImages[0]);
	const {modelViewTransform} = await controller.match(featurePoints, targetIndex);

	if (!modelViewTransform) {
	  console.log("no match...", queryImages.length);
	  queryImages.shift();
	} else {
	  firstModelViewTransform = modelViewTransform; 
	  break;
	}
      }
      if (!firstModelViewTransform) {
	return;
      }

      let lastModelViewTransform = firstModelViewTransform;

      const queryResults = [];
      for (let i = 0; i < queryImages.length; i++) {
	console.log("process", i);

	const trackResult = await controller.track(queryImages[i], lastModelViewTransform, targetIndex);

	const newModelViewTransform = await controller.trackUpdate(lastModelViewTransform, trackResult);

	lastModelViewTransform = newModelViewTransform;

	let updatedProjectedImage = null; 
	let capturedImage = null;
	if (newModelViewTransform) {
	  const trackAgainResult = await controller.track(queryImages[i], lastModelViewTransform, targetIndex);
	  updatedProjectedImage = trackAgainResult.debugExtra.projectedImage;

	  capturedImage = controller.captureRegion(queryImages[i], lastModelViewTransform, targetIndex);
	}

	queryResults.push({
	  trackResult,
	  updatedProjectedImage,
	  capturedImage,
	});

	if (!newModelViewTransform) break;
      }

      const result = {
	queryImages: queryImages.slice(0, queryResults.length),
	projectionMatrix: controller.getProjectionMatrix(),
	target: {
	  dimension: dimensions[0],
	  trackingData: trackingDataList[0]
	},
	queryResults,
      }
      console.log("result", result);
      setResult(result);
    };
    process();
  }, [])

  return (
    <div>
      {result && <Display result={result} />}
      {!result && <div>Loading...</div>}
    </div>
  )
}

ReactDOM.render(
  <Main/>,
  document.getElementById('root')
);

