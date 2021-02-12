const { useEffect, useMemo, useRef, useState, useCallback } = React;

const COLORS = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'];

const THREE = AFRAME.THREE;

const TEMPLATE_RADIUS = 6;
const AR2_SIM_THRESH = 0.8;
const AR2_SEARCH_SIZE = 6;

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
    const targetImage = targetImages[keyframeIndex];

    const targetOffsetX = inputWidth + 100; 
    const targetOffsetYMarker = 0;
    const targetOffsetYBeforeProjection = targetImage.height + 10;
    const targetOffsetYAfterProjection = (targetImage.height + 10) * 2;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(queryImage, 0, 0);

    const imageData = utils.pixel1DToImageData(targetImage.data, targetImage.width, targetImage.height);
    ctx.putImageData(imageData, targetOffsetX, targetOffsetYMarker, 0, 0, targetImage.width, targetImage.height);

    const beforeProjectedImage = allBeforeProjected[queryIndex][keyframeIndex]; 
    if (beforeProjectedImage) {
      const imageData = utils.pixel2DToImageData(beforeProjectedImage);
      ctx.putImageData(imageData, targetOffsetX, targetOffsetYBeforeProjection, 0, 0, beforeProjectedImage[0].length, beforeProjectedImage.length);
    }
    const afterProjectedImage = allBeforeProjected[queryIndex][keyframeIndex]; 
    if (afterProjectedImage) {
      const imageData = utils.pixel2DToImageData(afterProjectedImage);
      ctx.putImageData(imageData, targetOffsetX, targetOffsetYAfterProjection, 0, 0, afterProjectedImage[0].length, afterProjectedImage.length);
    }

    const targetTrackingPoints = targetTrackingData[keyframeIndex].coords;
    const keyScale = targetImage.scale;
    const trackResult = trackResults[keyframeIndex];

    for (let i = 0; i < targetTrackingPoints.length; i++) {
      const color = COLORS[i % COLORS.length];
      const targetPoint = targetTrackingPoints[i];
      utils.drawPoint(ctx, color, Math.round(targetPoint.mx * keyScale) + targetOffsetX, Math.round(targetImage.height - targetPoint.my * keyScale) + targetOffsetYMarker, TEMPLATE_RADIUS);
    }

    if (trackType === 'none') {

    } else if (trackType === 'search') {
      for (let i = 0; i < targetTrackingPoints.length; i++) {
	const color = COLORS[i % COLORS.length];
	const searchPoints = [trackResult.searchPoints[0][i], trackResult.searchPoints[1][i], trackResult.searchPoints[2][i]];

	searchPoints.forEach((searchPoint) => {
	  utils.drawPoint(ctx, color, Math.round(searchPoint[0] * keyScale) + targetOffsetX, Math.round(targetImage.height - searchPoint[1] * keyScale) + targetOffsetYBeforeProjection, AR2_SEARCH_SIZE);
	});
      }
    } else if (trackType === 'track' || trackType === 'goodTrack') {
      for (let i = 0; i < targetTrackingPoints.length; i++) {
	const color = COLORS[i % COLORS.length];
	const matchingPoint = trackResult.matchingPoints[i]; 
	const sim = trackResult.sim[i]; 
	if (trackType === 'track' || sim >= AR2_SIM_THRESH) {
	  utils.drawPoint(ctx, color, Math.round(matchingPoint[0] * keyScale) + targetOffsetX, Math.round(targetImage.height - matchingPoint[1] * keyScale) + targetOffsetYBeforeProjection, TEMPLATE_RADIUS);
	}
      }
    }
  }, [queryIndex, keyframeIndex, trackType]);

  const targetScaleList = useMemo(() => {
    return Object.keys(trackResults).map((index) => {
      const trackResult = trackResults[index];
      return 'T' + index + ' [' + targetTrackingData[index].coords.length + '-' + trackResult.selectedFeatures.length + ']';
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
	  <button className={trackType==='goodTrack'? 'selected': ''} onClick={() => {setTrackType('goodTrack')}}>good track</button>
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
      for (let i = 11; i <= 32; i+=2) {
      //for (let i = 11; i <= 15; i++) {
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

      if (!firstModelViewTransform) {
	console.log("no match...");
	return;
      }

      //const nKeyframes = trackingDataList[0].length;
      const nKeyframes = 3;

      const lastModelViewTransforms = [firstModelViewTransform, firstModelViewTransform, firstModelViewTransform];
      for (let i = 0; i < queryImages.length; i++) {
	allWorldMatrices.push(controller.getWorldMatrix(lastModelViewTransforms[0]));

	const trackResults = await controller.track(queryImages[i], lastModelViewTransforms, 0, nKeyframes);
	allTrackResults.push(trackResults);

	let bestKeyframe = 0;
	for (let j = 1; j < trackResults.length; j++) {
	  if (trackResults[j].selectedFeatures.length > trackResults[bestKeyframe].selectedFeatures.length) {
	    bestKeyframe = j;
	  }
	}
	const bestSelectedFeatures = trackResults[bestKeyframe].selectedFeatures; 
	console.log("best selected features", bestKeyframe, bestSelectedFeatures);

	const projectedBefore = [];
	const projectedAfter = [];
	for (let j = 0; j < trackResults.length; j++) {
	  projectedBefore.push(trackResults[j].projectedImage);
	}
	const newModelViewTransform = await controller.trackUpdate(lastModelViewTransforms[0], bestSelectedFeatures);

	const trackAgainResults = newModelViewTransform && await controller.track(queryImages[i], lastModelViewTransforms, 0, nKeyframes);
	for (let j = 0; j < trackResults.length; j++) {
	  projectedAfter.push(trackAgainResults && trackAgainResults[j].projectedImage);
	}

	lastModelViewTransforms.unshift(newModelViewTransform);
	lastModelViewTransforms.pop();

	console.log("lastModelViewTransforms", Object.assign({}, lastModelViewTransforms));

	allBeforeProjected.push(projectedBefore);
	allAfterProjected.push(projectedAfter);

	if (!newModelViewTransform) break;
      }

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
