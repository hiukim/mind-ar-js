const { useEffect, useMemo, useRef, useState, useCallback } = React;

const COLORS = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'];

const THREE = AFRAME.THREE;

const TEMPLATE_RADIUS = 6;
const AR2_SEARCH_SIZE = 10;

const Display = ({result}) => {
  const {queryImages, target, allPickedKeyframes, allTrackResults, dimensions, allWorldMatrices, allBeforeProjected, allAfterProjected, projectionMatrix} = result; 
  const {images: targetImages, trackingData: targetTrackingData} = target;

  const [trackType, setTrackType] = useState('none');
  const [keyframeIndex, setKeyframeIndex] = useState(0);
  const [queryIndex, setQueryIndex] = useState(0);
  const [planeParams, setPlaneParams] = useState(null);
  const canvasContainerRef = useRef(null);
  const resultContainerRef = useRef(null);
  const canvas2Ref = useRef(null);

  useEffect(() => {
    const firstQueryImage = result.queryImages[0];
    const {dimensions, projectionMatrix, allWorldMatrices} = result;
    const [markerWidth, markerHeight] = dimensions[0];
    const inputHeight = firstQueryImage.height;
    const inputWidth = firstQueryImage.width;

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


    const geometry = new THREE.PlaneGeometry(1, markerHeight / markerWidth);
    const material = new THREE.MeshBasicMaterial( { color: 0xff0000, transparent: true,  opacity: 0.6 } );
    const plane = new THREE.Mesh( geometry, material );
    scene.add( plane );
    plane.matrixAutoUpdate = false;

    const canvas2 = document.createElement("canvas");
    canvas2.width = inputWidth;
    canvas2.height = inputHeight;
    const renderer = new THREE.WebGLRenderer({ alpha: true, canvas: canvas2 } );

    console.log("qu", result.queryImages);
    for (let queryIndex = 0; queryIndex < result.queryImages.length; queryIndex++) {
      const queryImage = result.queryImages[queryIndex];

      const worldMatrix = Object.assign({}, allWorldMatrices[queryIndex]);
      var m = new AFRAME.THREE.Matrix4();
      m.elements = worldMatrix;
      m.multiply(postMatrix);
      plane.matrix = m;
      renderer.render(scene, camera);

      const canvasImage = document.createElement("img");
      canvasImage.src = canvas2.toDataURL();

      const container = document.createElement("div");
      container.appendChild(queryImage);
      container.appendChild(canvasImage);
      resultContainerRef.current.appendChild(container);
    }
  }, []);

  /*
  const queryImage = queryImages[queryIndex];
  const trackResults = allTrackResults[queryIndex];

  const inputWidth = queryImage.width;
  const inputHeight = queryImage.height;

  const canvasWidth = inputWidth + targetImages[0].width + 100;
  const canvasHeight = Math.max(inputHeight, targetImages[0].height * 3 + 50);

  //const displayWidth = 500;
  const displayWidth = inputWidth * 2;
  //const displayHeight = parseInt(displayWidth * inputHeight / inputWidth);
  const displayHeight = parseInt(displayWidth * canvasHeight / canvasWidth);


  useEffect(() => {
    const canvasContainer = canvasContainerRef.current;
    const canvas = canvasRef.current;
    const canvas2 = canvas2Ref.current; // for plane overlay

    //const canvasWidth = inputWidth * 2;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    //canvas.height = inputHeight;
    canvas.style.width = displayWidth;
    canvas.style.height = displayHeight;
    canvasContainer.style.width = displayWidth;
    canvasContainer.style.height = displayHeight;

    canvas2.width = inputWidth;
    canvas2.height = inputHeight;
    canvas2.style.width = displayWidth * inputWidth / canvasWidth;
    canvas2.style.height = displayHeight * inputHeight / canvasHeight;
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
    const afterProjectedImage = allAfterProjected[queryIndex][keyframeIndex]; 
    if (afterProjectedImage) {
      const imageData = utils.pixel2DToImageData(afterProjectedImage);
      ctx.putImageData(imageData, targetOffsetX, targetOffsetYAfterProjection, 0, 0, afterProjectedImage[0].length, afterProjectedImage.length);
    }

    const targetTrackingPoints = targetTrackingData[keyframeIndex].points;
    const keyScale = targetImage.scale;
    const trackResult = trackResults[keyframeIndex];

    for (let i = 0; i < targetTrackingPoints.length; i++) {
      const color = COLORS[i % COLORS.length];
      const targetPoint = targetTrackingPoints[i];
      utils.drawRect(ctx, color, Math.round(targetPoint.x) + targetOffsetX, Math.round(targetPoint.y) + targetOffsetYMarker, TEMPLATE_RADIUS * 2);
    }

    if (trackType === 'none') {

    } else if (trackType === 'search') {
      for (let i = 0; i < targetTrackingPoints.length; i++) {
	const color = COLORS[i % COLORS.length];
	const searchPoints = [trackResult.debugExtra.searchPoints[0][i], trackResult.debugExtra.searchPoints[1][i], trackResult.debugExtra.searchPoints[2][i]];

	searchPoints.forEach((searchPoint) => {
	  utils.drawRect(ctx, color, Math.round(searchPoint[0] * keyScale) + targetOffsetX, Math.round(searchPoint[1] * keyScale) + targetOffsetYBeforeProjection, AR2_SEARCH_SIZE * 2);
	});
      }
    } else if (trackType === 'track' || trackType === 'goodTrack') {
      for (let i = 0; i < targetTrackingPoints.length; i++) {
	const color = COLORS[i % COLORS.length];
	const matchingPoint = trackResult.debugExtra.matchingPoints[i]; 
	const trackedPoint = trackResult.debugExtra.trackedPoints[i]; 
	const sim = trackResult.debugExtra.sim[i]; 

	let show = true;
	if (trackType === 'goodTrack') {
	  const found = trackResult.worldCoords.find((f) => {
	    return (Math.abs(f.x * keyScale - targetTrackingPoints[i].x) < 0.0001) && (Math.abs(f.y * keyScale -targetTrackingPoints[i].y) < 0.0001);
	  });
	  show = !!found;
	}
	if (show) {
	  utils.drawRect(ctx, color, Math.round(matchingPoint[0] * keyScale) + targetOffsetX, Math.round(matchingPoint[1] * keyScale) + targetOffsetYBeforeProjection, TEMPLATE_RADIUS * 2);
	}

	if (show && trackType === 'goodTrack') {
	  utils.drawRect(ctx, color, Math.round(trackedPoint[0]), Math.round(trackedPoint[1]), TEMPLATE_RADIUS * 2);
	}
      }
    }
  }, [queryIndex, keyframeIndex, trackType]);

  const targetScaleList = useMemo(() => {
    return Object.keys(trackResults).map((index) => {
      const selected = allPickedKeyframes[queryIndex] == index;
      const trackResult = trackResults[index];
      return 'T' + index + ' [' + targetTrackingData[index].points.length + '-' + trackResult.worldCoords.length + ']' + (selected? " *": "");
    });
  }, [trackResults, queryIndex]);
  */

  return (
    <div>
      <div className="result-container" ref={resultContainerRef}>
      </div>
    </div>
  )
}

const Main = () => {
  const [result, setResult] = useState();

  useEffect(() => {
    const process = async () => {
      const queryImages = [];
      for (let i = 1; i <= 200; i+=3) {
      //for (let i = 107; i <= 114; i+=3) {
	try {
	  queryImages.push(await utils.loadImage('../tests/videos/c3/out' + String(i).padStart(3, '0') + '.png'));
	} catch (e) {
	}
      }

      const queryImage0 = queryImages[0];

      const inputWidth = queryImage0.width;
      const inputHeight = queryImage0.height;
      const controller = new MINDAR.Controller({inputWidth, inputHeight, debugMode: true});
      //const {dimensions, matchingDataList, trackingDataList, imageListList} = await controller.addImageTargets('../examples/assets/card-example/card.mind');
      //const {dimensions, matchingDataList, trackingDataList, imageListList} = await controller.addImageTargets('../examples/assets/band-example/raccoon-localized.mind');
      const {dimensions, matchingDataList, trackingDataList, imageListList} = await controller.addImageTargets('../examples/assets/card-example/card-localized.mind');

      const allTrackResults = [];
      const allBeforeProjected = [];
      const allAfterProjected = [];
      const allPickedKeyframes = [];

      const allWorldMatrices = [];
      for (let i = 0; i < queryImages.length; i++) {
	const queryImage = queryImages[i];
	const featurePoints = await controller.detect(queryImage);
	const {modelViewTransform, allMatchResults} = await controller.match(featurePoints);
	if (modelViewTransform) {
	  allWorldMatrices.push(controller.getWorldMatrix(modelViewTransform, 0));
	} else {
	  allWorldMatrices.push(null);
	}
      }
     
      const projectionMatrix = controller.getProjectionMatrix();

      const result = {
	queryImages,
	dimensions,
	allWorldMatrices,
	projectionMatrix,
	target: {
	  images: imageListList[0]
	},
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

