const { useEffect, useMemo, useRef, useState, useCallback } = React;

const COLORS = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'];

const THREE = AFRAME.THREE;

const Display = ({result}) => {
  const {queryImages, target, allTrackResults, dimensions, allWorldMatrices, allBeforeProjected, allAfterProjected, projectionMatrix} = result; 
  const {images: targetImages, trackingData: targetTrackingData} = target;

  const [trackType, setTrackType] = useState('none');
  const [keyframeIndex, setKeyframeIndex] = useState(0);
  const [queryIndex, setQueryIndex] = useState(0);
  const [planeParams, setPlaneParams] = useState(null);
  const canvasContainerRef = useRef(null);
  const canvasRef = useRef(null);
  const canvas2Ref = useRef(null);

  const queryImage = queryImages[queryIndex];
  const trackResults = allTrackResults[queryIndex];

  const inputWidth = queryImage.width;
  const inputHeight = queryImage.height;
  const displayWidth = 500;
  const displayHeight = parseInt(displayWidth * inputHeight / inputWidth);

  useEffect(() => {
    const canvasContainer = canvasContainerRef.current;
    const canvas = canvasRef.current;
    const canvas2 = canvas2Ref.current;

    const canvasWidth = inputWidth * 2;
    canvas.width = canvasWidth;
    canvas.height = inputHeight;
    canvas.style.width = displayWidth * 2;
    canvas.style.height = displayHeight;
    canvasContainer.style.width = displayWidth * 2;
    canvasContainer.style.height = displayHeight;
    canvas2.style.width = displayWidth;
    canvas2.style.height = displayHeight;
  }, []);

  useEffect(() => {
    const canvas2 = canvas2Ref.current;
    const [markerWidth, markerHeight] = dimensions[0];
    const proj = projectionMatrix;
    const fov = 2 * Math.atan(1/proj[5] /inputHeight * inputHeight ) * 180 / Math.PI; // vertical fov
    const near = proj[14] / (proj[10] - 1.0);
    const far = proj[14] / (proj[10] + 1.0);
    const ratio = proj[5] / proj[0]; // (r-l) / (t-b)
    const newAspect = inputWidth / inputHeight;

    const camera = new THREE.PerspectiveCamera();
    camera.fov = fov;
    camera.aspect = newAspect;
    camera.near = near;
    camera.far = far;
    camera.updateProjectionMatrix();

    const scene = new THREE.Scene();
    const position = new AFRAME.THREE.Vector3();
    const quaternion = new AFRAME.THREE.Quaternion();
    const scale = new AFRAME.THREE.Vector3();
    position.x = markerWidth / 2;
    position.y = markerWidth / 2 + (markerHeight - markerWidth) / 2;
    scale.x = markerWidth;
    scale.y = markerWidth;
    scale.z = markerWidth;
    let postMatrix = new AFRAME.THREE.Matrix4();
    postMatrix.compose(position, quaternion, scale);
    const renderer = new THREE.WebGLRenderer({ alpha: true, canvas: canvas2 } );

    const geometry = new THREE.PlaneGeometry(1, markerHeight / markerWidth);
    const material = new THREE.MeshBasicMaterial( { color: 0xff0000, transparent: true,  opacity: 0.1 } );
    const plane = new THREE.Mesh( geometry, material );
    scene.add( plane );
    plane.matrixAutoUpdate = false;

    setPlaneParams({scene, camera, renderer, plane, postMatrix});
  }, []);

  useEffect(() => {
    if (planeParams === null) return;

    const {scene, camera, renderer, plane, postMatrix} = planeParams;
    const worldMatrix = Object.assign({}, allWorldMatrices[queryIndex]);
    var m = new AFRAME.THREE.Matrix4();
    m.elements = worldMatrix;
    m.multiply(postMatrix);
    plane.matrix = m;
    renderer.render(scene, camera);
  }, [queryIndex, planeParams]);

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

    const t2Image = allBeforeProjected[queryIndex]; 
    if (t2Image) {
      const t2Height = t2Image.length;
      const t2Width = t2Image[0].length;
      const t2Data = new Uint8ClampedArray(t2Height * t2Width * 4);
      for (let j = 0; j < t2Height; j++) {
	for (let i = 0; i < t2Width; i++) {
	  const pos = (t2Height -1 -j) * t2Width + i;
	  t2Data[pos*4 + 0] = t2Image[j][i];
	  t2Data[pos*4 + 1] = t2Image[j][i];
	  t2Data[pos*4 + 2] = t2Image[j][i];
	  t2Data[pos*4 + 3] = 255; 
	}
      }
      const imageData2 = new ImageData(t2Data, t2Width, t2Height);
      ctx.putImageData(imageData2, inputWidth+100, 0, 0, 0, t2Width, t2Height);
    }

    const t2ImageAfter = allAfterProjected[queryIndex]; 
    if (t2ImageAfter) {
      const t2Height = t2ImageAfter.length;
      const t2Width = t2ImageAfter[0].length;
      const t2DataAfter = new Uint8ClampedArray(t2Height * t2Width * 4);
      const imageData2After = new ImageData(t2DataAfter, t2Width, t2Height);
      for (let j = 0; j < t2Height; j++) {
	for (let i = 0; i < t2Width; i++) {
	  const pos = (t2Height -1 -j) * t2Width + i;
	  t2DataAfter[pos*4 + 0] = t2ImageAfter[j][i];
	  t2DataAfter[pos*4 + 1] = t2ImageAfter[j][i];
	  t2DataAfter[pos*4 + 2] = t2ImageAfter[j][i];
	  t2DataAfter[pos*4 + 3] = 255; 
	}
      }
      ctx.putImageData(imageData2After, inputWidth+100, t2Height+5, 0, 0, t2Width, t2Height);
    }


    const targetTrackingPoints = targetTrackingData[keyframeIndex].coords;
    const keyScale = targetImage.scale;
    const trackResult = trackResults[keyframeIndex];

    if (trackType === 'none') {
      for (let i = 0; i < targetTrackingPoints.length; i++) {
	utils.drawPoint(ctx, '#ff0000', Math.round(targetTrackingPoints[i].mx * keyScale) + targetOffsetX, Math.round(targetImage.height - targetTrackingPoints[i].my * keyScale) + targetOffsetY, 10);
      }


    } else if (trackType === 'search') {
      for (let i = 0; i < targetTrackingPoints.length; i++) {
	const color = COLORS[i % COLORS.length];
	const queryPoint = trackResult.searchPoints[i];
	const targetPoint = trackResult.searchPoints[i];

	utils.drawPoint(ctx, color, Math.round(queryPoint[0]), Math.round(queryPoint[1]), 10);
	utils.drawPoint(ctx, color, Math.round(targetTrackingPoints[i].mx * keyScale) + targetOffsetX, Math.round(targetImage.height - targetTrackingPoints[i].my * keyScale) + targetOffsetY, 10);
      }

    } else if (trackType === 'track') {
      for (let i = 0; i < trackResult.trackedPoints.length; i++) {
	//const color = COLORS[i % COLORS.length];
	const queryPoint = trackResult.trackedPoints[i].pos2D;
	const targetPoint = trackResult.trackedPoints[i].pos3D;
	const color = COLORS[ parseInt(queryPoint.x + queryPoint.y + targetPoint.x + targetPoint.y) % COLORS.length];

	utils.drawPoint(ctx, color, Math.round(queryPoint.x), Math.round(queryPoint.y), 10);
	utils.drawPoint(ctx, color, Math.round(targetPoint.x * keyScale) + targetOffsetX, Math.round(targetImage.height - targetPoint.y * keyScale) + targetOffsetY, 10);
      }
    } else if (trackType === 'filteredTrack') {
      let colorIndex = 0;
      for (let i = 0; i < trackResult.filteredTrackedPoints.length; i++) {
	const queryPoint = trackResult.filteredTrackedPoints[i].pos2D;
	const targetPoint = trackResult.filteredTrackedPoints[i].pos3D;
	const color = COLORS[ parseInt(queryPoint.x + queryPoint.y + targetPoint.x + targetPoint.y) % COLORS.length];

	utils.drawPoint(ctx, color, Math.round(queryPoint.x), Math.round(queryPoint.y), 10);
	utils.drawPoint(ctx, color, Math.round(targetPoint.x * keyScale) + targetOffsetX, Math.round(targetImage.height - targetPoint.y * keyScale) + targetOffsetY, 10);
      }
    }
  }, [queryIndex, keyframeIndex, trackType]);

  const targetScaleList = useMemo(() => {
    return Object.keys(trackResults).map((index) => {
      const trackResult = trackResults[index];
      return 'T' + index + ' [' + trackResult.trackedPoints.length + '-' + trackResult.filteredTrackedPoints.length + ']';
    });
  }, [trackResults, queryIndex]);

  return (
    <div>
      <div className="control">
	<div className="section">
    	  {queryImages.map((queryImage, index) => (
	    <button className={index===queryIndex? 'selected': ''}  key={index} onClick={() => {setQueryIndex(index)}}>I{index}</button>
	  ))}
	</div>

	<div className="section">
	  <button className={trackType==='none'? 'selected': ''} onClick={() => {setTrackType('none')}}>none</button>
	  <button className={trackType==='search'? 'selected': ''} onClick={() => {setTrackType('search')}}>search</button>
	  <button className={trackType==='track'? 'selected': ''} onClick={() => {setTrackType('track')}}>track</button>
	  <button className={trackType==='filteredTrack'? 'selected': ''} onClick={() => {setTrackType('filteredTrack')}}>filtered track</button>
	</div>

	<div className="section">
    	  {targetScaleList.map((scale, index) => (
	    <button className={index===keyframeIndex? 'selected': ''}  key={index} onClick={() => {setKeyframeIndex(index)}}>{scale}</button>
	  ))}
	</div>
      </div>
      <div className="canvas-container" ref={canvasContainerRef}>
	<canvas ref={canvasRef}></canvas>
	<canvas ref={canvas2Ref}></canvas>
      </div>
    </div>
  )
}

const Main = () => {
  const [result, setResult] = useState();

  useEffect(() => {
    const process = async () => {
      const queryImages = [];
      for (let i = 11; i <= 22; i++) {
	queryImages.push(await utils.loadImage('../tests/video2/out' + i + '.png'));
      }
      /*
      queryImages.push(await utils.loadImage('../tests/video2/out01.png'));
      queryImages.push(await utils.loadImage('../tests/video2/out11.png'));
      queryImages.push(await utils.loadImage('../tests/video2/out21.png'));
      */

      const queryImage0 = queryImages[0];

      const inputWidth = queryImage0.width;
      const inputHeight = queryImage0.height;
      const controller = new MINDAR.Controller(inputWidth, inputHeight);
      const {dimensions, matchingDataList, trackingDataList, imageListList} = await controller.addImageTargets('../examples/assets/card-example/card.mind');

      const allTrackResults = [];
      const allWorldMatrices = [];
      const allBeforeProjected = [];
      const allAfterProjected = [];

      const featurePoints = await controller.detect(queryImage0);
      const {modelViewTransform: firstModelViewTransform, allMatchResults} = await controller.match(featurePoints);

      let modelViewTransform = firstModelViewTransform;
      for (let i = 0; i < queryImages.length; i++) {
	allWorldMatrices.push(modelViewTransform && controller.getWorldMatrix(modelViewTransform));

	const trackResults = await controller.track(queryImages[i], modelViewTransform, 0, trackingDataList[0].length);
	for (let j = 0; j < trackResults.length; j++) {
	  const filteredTrackedPoints = controller.filterTrack(trackResults[j].trackedPoints, j);
	  trackResults[j].filteredTrackedPoints = filteredTrackedPoints; 
	}

	allTrackResults.push(trackResults);

	let bestTrackedPoints = [];
	for (let j = 0; j < trackResults.length; j++) {
	  if(trackResults[j].trackedPoints.length > bestTrackedPoints.length) {
	    bestTrackedPoints = trackResults[j].trackedPoints;
	  }
	  //if(trackResults[j].filteredTrackedPoints.length > bestTrackedPoints.length) {
	  //  bestTrackedPoints = trackResults[j].filteredTrackedPoints;
	  //}
	}
	console.log("best", bestTrackedPoints);

	const projectedBefore = modelViewTransform && await controller.trackProjection(queryImages[i], modelViewTransform, 0);
	modelViewTransform = await controller.trackUpdate(modelViewTransform, bestTrackedPoints);
	const projectedAfter = modelViewTransform && await controller.trackProjection(queryImages[i], modelViewTransform, 0);

	allBeforeProjected.push(projectedBefore);
	allAfterProjected.push(projectedAfter);

	if (!modelViewTransform) break;
      }
      allWorldMatrices.push(modelViewTransform && controller.getWorldMatrix(modelViewTransform));

      const projectionMatrix = controller.getProjectionMatrix();

      const result = {
	queryImages: queryImages.slice(0, allTrackResults.length),
	dimensions,
	allWorldMatrices,
	projectionMatrix,
	target: {
	  images: imageListList[0],
	  trackingData: trackingDataList[0]
	},
	allTrackResults,
	allBeforeProjected,
	allAfterProjected
      }
      setResult(result);
    }
    process();
  }, []);

  console.log("result", result);

  return (
    <div className="tracking">
      {result && <Display result={result} />}
      {!result && <div>Loading...</div>}

    </div>
  )
};

ReactDOM.render(
  <Main/>,
  document.getElementById('root')
);
