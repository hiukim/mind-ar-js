const { useEffect, useMemo, useRef, useState, useCallback } = React;

const COLORS = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'];

const TEMPLATE_RADIUS = 6;
const AR2_SEARCH_SIZE = 10;

const Display = ({result}) => {
  const [trackType, setTrackType] = useState('goodTrack');
  const [keyframeIndex, setKeyframeIndex] = useState(0);
  const [queryIndex, setQueryIndex] = useState(0);
  const queryCanvasRef = useRef(null);
  const targetCanvasRef = useRef(null);
  const newProjectedCanvasRef = useRef(null);
  const projectedCanvasRef = useRef(null);
  const rotatedProjectedCanvasRef = useRef(null);
  const smartDetectionCanvas = useRef(null);

  const {queryImages, queryResults, target, dimensions, projectionMatrix} = result; 
  const {images: targetImages, trackingData: targetTrackingData} = target;

  const queryResult = useMemo(() => {
    return queryResults[queryIndex];
  }, [queryIndex]);
  
  const targetImage = useMemo(() => {
    return targetImages[keyframeIndex];
  }, [keyframeIndex]);

  const targetTrackingPoints = useMemo(() => {
    return targetTrackingData[keyframeIndex].points;
  }, [keyframeIndex]);

  // target canvas
  useEffect(() => {
    const goodTracks = queryResult.goodTracks[keyframeIndex];

    const canvas = targetCanvasRef.current;
    canvas.width = targetImage.width;
    canvas.height = targetImage.height;
    const imageData = utils.pixel1DToImageData(targetImage.data, targetImage.width, targetImage.height);
    const ctx = canvas.getContext('2d');
    ctx.putImageData(imageData, 0, 0);

    ctx.lineWidth = 2;
    for (let i = 0; i < targetTrackingPoints.length; i++) {
      const color = COLORS[i % COLORS.length];
      const targetPoint = targetTrackingPoints[i];
      if (trackType === 'search' || trackType === 'track' || (trackType === 'goodTrack' && goodTracks[i])) { 
	utils.drawRect(ctx, color, Math.round(targetPoint.x), Math.round(targetPoint.y), TEMPLATE_RADIUS * 2);
      }
    }
  }, [queryIndex, keyframeIndex, trackType]);

  // smart detection canvas
  useEffect(() => {
    const smartDetection = queryResult.smartDetection;

    const canvas = smartDetectionCanvas.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!smartDetection) return;

    const {projectedImage, projectedFeaturePoints: featurePoints} = smartDetection;
    canvas.height = projectedImage.length;
    canvas.width = projectedImage[0].length;
    ctx.putImageData(utils.pixel2DToImageData(projectedImage), 0, 0);

    if (trackType === 'detection') {
      for (let i = 0; i < featurePoints.length; i++) {
	utils.drawPoint(ctx, "#FF0000", Math.round(featurePoints[i].x), Math.round(featurePoints[i].y), featurePoints[i].scale);
      }
    }
  }, [queryIndex, trackType]);

  // rotate projected
  useEffect(() => {
    const trackResult = queryResult.trackResults[keyframeIndex];
    const goodTracks = queryResult.goodTracks[keyframeIndex];
    const projectedImage = queryResult.rotatedProjected[keyframeIndex];
    console.log("rotate", projectedImage); 

    const canvas = rotatedProjectedCanvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!projectedImage) return;

    canvas.height = projectedImage.length;
    canvas.width = projectedImage[0].length;
    ctx.putImageData(utils.pixel2DToImageData(projectedImage), 0, 0);
  }, [queryIndex, keyframeIndex, trackType]);

  // projected image canvas
  useEffect(() => {
    const trackResult = queryResult.trackResults[keyframeIndex];
    const goodTracks = queryResult.goodTracks[keyframeIndex];
    const projectedImage = queryResult.projectedBefore[keyframeIndex];

    const canvas = projectedCanvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!projectedImage) return;

    canvas.height = projectedImage.length;
    canvas.width = projectedImage[0].length;
    ctx.putImageData(utils.pixel2DToImageData(projectedImage), 0, 0);

    ctx.lineWidth = 2;
    for (let i = 0; i < targetTrackingPoints.length; i++) {
      const color = COLORS[i % COLORS.length];
      const matchingPoint = trackResult.debugExtra.matchingPoints[i]; 
      const trackedPoint = trackResult.debugExtra.trackedPoints[i]; 
      const searchPoints = trackResult.debugExtra.searchPoints;

      const sPoints = [searchPoints[0][i], searchPoints[1][i], searchPoints[2][i]];

      if (trackType === 'search') {
	sPoints.forEach((point) => {
	  utils.drawRect(ctx, color, Math.round(point[0] * targetImage.scale), Math.round(point[1] * targetImage.scale), AR2_SEARCH_SIZE * 2);
	});
      }

      if (trackType === 'track' || trackType === 'goodTrack') {
	if (trackType === 'track' || (trackType === 'goodTrack' && goodTracks[i])) { 
	  utils.drawRect(ctx, color, Math.round(matchingPoint[0] * targetImage.scale), Math.round(matchingPoint[1] * targetImage.scale), TEMPLATE_RADIUS * 2);
	}
      }
    }
  }, [queryIndex, keyframeIndex, trackType]);

  // new projected
  useEffect(() => {
    const projectedImage = queryResult.projectedAfter[keyframeIndex];
    const canvas = newProjectedCanvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (projectedImage) {
      canvas.height = projectedImage.length;
      canvas.width = projectedImage[0].length;
      ctx.putImageData(utils.pixel2DToImageData(projectedImage), 0, 0);
    }
  }, [queryIndex, keyframeIndex, trackType]);

  // query
  useEffect(() => {
    const queryImage = queryImages[queryIndex];
    const goodTracks = queryResult.goodTracks[keyframeIndex];
    const trackResult = queryResult.trackResults[keyframeIndex];

    const canvas = queryCanvasRef.current;
    canvas.width = queryImage.width;
    canvas.height = queryImage.height;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(queryImage, 0, 0);

    ctx.lineWidth = 2;
    for (let i = 0; i < targetTrackingPoints.length; i++) {
      const color = COLORS[i % COLORS.length];
      const trackedPoint = trackResult.debugExtra.trackedPoints[i]; 

      if (trackType === 'track' || trackType === 'goodTrack') {
	if (trackType === 'track' || (trackType === 'goodTrack' && goodTracks[i])) { 
	  utils.drawRect(ctx, color, Math.round(trackedPoint[0]), Math.round(trackedPoint[1]), TEMPLATE_RADIUS * 2);
	}
      }
    }

    if (trackType === 'detection') {
      const smartDetection = queryResult.smartDetection;
      if (smartDetection) {
	const {featurePoints} = smartDetection;
	for (let i = 0; i < featurePoints.length; i++) {
	  utils.drawPoint(ctx, "#FF0000", Math.round(featurePoints[i].x), Math.round(featurePoints[i].y), featurePoints[i].scale);
	}
      }
    }
  }, [queryIndex, keyframeIndex, trackType]);

  const targetScaleList = useMemo(() => {
    return Object.keys(queryResult.trackResults).map((index) => {
      const selected = queryResult.pickedKeyframeIndex == index;
      const trackResult = queryResult.trackResults[index];
      return 'T' + index + ' [' + targetTrackingData[index].points.length + '-' + trackResult.worldCoords.length + ']' + (selected? " *": "");
    });
  }, [queryIndex]);

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

	<div className="section">
    	  {targetScaleList.map((scale, index) => (
	    <button className={index===keyframeIndex? 'selected': ''}  key={index} onClick={() => {setKeyframeIndex(index)}}>{scale}</button>
	  ))}
	</div>
      </div>

      <div className="canvas-container">
	<div className="column">
	  <canvas className="query-canvas" ref={queryCanvasRef}></canvas>
	</div>
	<div className="column">
	  <canvas className="target-canvas" ref={targetCanvasRef}></canvas>
	  <canvas className="projected-canvas" ref={projectedCanvasRef}></canvas>
	  <canvas className="new-projected-canvas" ref={newProjectedCanvasRef}></canvas>

	  <canvas className="rotate-projected-canvas" ref={rotatedProjectedCanvasRef}></canvas>

	</div>
	<div className="column">
	  <canvas className="smart-detection-canvas" ref={smartDetectionCanvas}></canvas>
	</div>
      </div>
    </div>
  )
};

const Main = () => {
  const [result, setResult] = useState();

  useEffect(() => {
    const queryImages = [];
    const process = async () => {
      //for (let i = 39; i <= 39; i+=2) {
      //for (let i = 39; i <= 43; i+=2) {
      for (let i = 39; i <= 100; i+=3) {
	try {queryImages.push(await utils.loadImage('../tests/videos/p1/out' + String(i).padStart(3, '0') + '.png'));} catch (e) {}
      }
      for (let i = 107; i <= 307; i+=5) {
	//queryImages.push(await utils.loadImage('../tests/video2/out' + i + '.png'));
      }

      const queryImage0 = queryImages[0];
      const inputWidth = queryImage0.width;
      const inputHeight = queryImage0.height;
      const controller = new MINDAR.Controller({inputWidth, inputHeight, debugMode: true});
      //const {dimensions, matchingDataList, trackingDataList, imageListList} = await controller.addImageTargets('../examples/assets/card-example/card-detector10.mind');
      const {dimensions, matchingDataList, trackingDataList, imageListList} = await controller.addImageTargets('../examples/assets/band-example/raccoon-detector9.mind');

      const targetIndex = 0;
      const nKeyframes = trackingDataList[0].length;
      //const nKeyframes = 1;

      // initial match
      let firstModelViewTransform;
      while (queryImages.length > 0) {
	const {featurePoints} = await controller.detect(queryImages[0]);
	const {modelViewTransform} = await controller.match(featurePoints);

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

      let lastModelViewTransforms = [firstModelViewTransform, firstModelViewTransform, firstModelViewTransform];

      const queryResults = [];
      for (let i = 0; i < queryImages.length; i++) {
	console.log("process", i);
	const trackResults = [];
	const goodTracks = [];
	const projectedBefore = [];
	const projectedAfter = [];
	const rotatedProjected = [];
	let smartDetection = null;

	// try tracking results in all key frames
	for (let j = 0; j < nKeyframes; j++) {
	  const keyScale = imageListList[targetIndex][j].scale;
	  const trackResult = await controller.trackFrame(queryImages[i], lastModelViewTransforms, targetIndex, j);
	  trackResults.push(trackResult);

	  rotatedProjected.push(trackResult.debugExtra.rotatedProjectedImage);
	  projectedBefore.push(trackResult.debugExtra.projectedImage);

	  const goodTrack = trackingDataList[targetIndex][j].points.map((p) => {
	    const found = trackResult.worldCoords.find((f) => {
	      return (Math.abs(f.x * keyScale - p.x) < 0.0001) && (Math.abs(f.y * keyScale - p.y) < 0.0001);
	    });
	    return !!found;
	  });
	  goodTracks.push(goodTrack);

	  const updatedModelViewTransform = await controller.trackUpdate(lastModelViewTransforms[0], trackResult);
	  if (!updatedModelViewTransform) {
	    projectedAfter.push(null);
	    continue;
	  }

	  const trackResult2 = await controller.trackFrame(queryImages[i], [updatedModelViewTransform, lastModelViewTransforms[0], lastModelViewTransforms[1]], targetIndex, j); 
	  projectedAfter.push(trackResult2.debugExtra.projectedImage);
	}

	// use default track result for next frame
	const defaultTrackResult = await controller.track(queryImages[i], lastModelViewTransforms, targetIndex);
	let newModelViewTransform = await controller.trackUpdate(lastModelViewTransforms[0], defaultTrackResult);

	if (!newModelViewTransform) {
	  console.log("miss");
	  const detectResult = await controller.detectExpect(queryImages[i], lastModelViewTransforms[0], targetIndex);
	  console.log("detectResult", detectResult);
	  const {modelViewTransform, debugExtras} = await controller.match(detectResult.featurePoints);
	  if (modelViewTransform) {
	    newModelViewTransform = modelViewTransform;
	  }
	  console.log("modelViewTransform", modelViewTransform);

	  smartDetection = {
	    projectedImage: detectResult.debugExtra.projectedImage,
	    featurePoints: detectResult.featurePoints,
	    projectedFeaturePoints: detectResult.debugExtra.projectedFeaturePoints,
	    modelViewTransform: modelViewTransform
	  }
	}

	/*
	if (!newModelViewTransform) {
	  const detectResult = await controller.smartDetect(queryImages[i], lastModelViewTransforms[0], targetIndex);

	  const {debugExtras: debugExtra1} = await controller.match(detectResult.debugExtra.featurePoints);
	  const {debugExtras: debugExtra2} = await controller.match(detectResult.debugExtra.reprojectedFeaturePoints);

	  const {modelViewTransform, debugExtras: smartDebugExtras} = await controller.match(detectResult.featurePoints);
	  smartDetection = {
	    projectedImage: detectResult.debugExtra.projectedImage,
	    featurePoints: detectResult.debugExtra.featurePoints,
	    reprojectedFeaturePoints: detectResult.debugExtra.reprojectedFeaturePoints,
	    modelViewTransform: modelViewTransform
	  }
	  if (!modelViewTransform) {
	    console.log("smart detect failed");
	  }
	  lastModelViewTransforms = [modelViewTransform, modelViewTransform, modelViewTransform];
	  newModelViewTransform = modelViewTransform;
	}
	*/

	lastModelViewTransforms.unshift(newModelViewTransform);
	lastModelViewTransforms.pop();

	queryResults.push({
	  trackResults,
	  projectedBefore,
	  projectedAfter,
	  rotatedProjected,
	  goodTracks,
	  pickedKeyframeIndex: defaultTrackResult.debugExtra.keyframeIndex,
	  smartDetection
	});

	if (!newModelViewTransform) break;
      }

      const result = {
	queryImages: queryImages.slice(0, queryResults.length),
	projectionMatrix: controller.getProjectionMatrix(),
	target: {
	  images: imageListList[0],
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
