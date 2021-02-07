const { useEffect, useMemo, useRef, useState, useCallback } = React;

const COLORS = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'];

const THREE = AFRAME.THREE;

const Display = ({result}) => {
  const {queryImage, target, trackResults, matchResults, dimensions, worldMatrix, projectionMatrix} = result; 
  const {images: targetImages, trackingData: targetTrackingData} = target;

  const [trackType, setTrackType] = useState('none');
  const [keyframeIndex, setKeyframeIndex] = useState(0);
  const canvasContainerRef = useRef(null);
  const canvasRef = useRef(null);
  const canvas2Ref = useRef(null);

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
    var m = new AFRAME.THREE.Matrix4();
    m.elements = worldMatrix;
    m.multiply(postMatrix);
    const geometry = new THREE.PlaneGeometry(1, markerHeight / markerWidth);
    const material = new THREE.MeshBasicMaterial( { color: 0xff0000, transparent: true,  opacity: 0.5 } );
    const plane = new THREE.Mesh( geometry, material );
    plane.matrixAutoUpdate = false;
    plane.matrix = m;
    scene.add( plane );
    renderer.render(scene, camera);
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

    const t2Image = result.track2Result; 
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
	const color = COLORS[i % COLORS.length];
	const queryPoint = trackResult.trackedPoints[i].pos2D;
	const targetPoint = trackResult.trackedPoints[i].pos3D;

	utils.drawPoint(ctx, color, Math.round(queryPoint.x), Math.round(queryPoint.y), 10);
	utils.drawPoint(ctx, color, Math.round(targetPoint.x * keyScale) + targetOffsetX, Math.round(targetImage.height - targetPoint.y * keyScale) + targetOffsetY, 10);
      }
    }

    if (matchResults[keyframeIndex].H2) {
      const H = matchResults[keyframeIndex].H2;
      const HInv = utils.matrixInverse33(H, 0.00001);
      console.log("H", H, HInv);
    }

  }, [keyframeIndex, trackType]);

  const targetScaleList = useMemo(() => {
    return Object.keys(trackResults).map((index) => {
      const trackResult = trackResults[index];
      return 'T' + index + ' [' + trackResult.trackedPoints.length + ']';
    });
  }, [result]);

  return (
    <div>
      <div className="control">
	<div className="section">
	  <button className={trackType==='none'? 'selected': ''} onClick={() => {setTrackType('none')}}>none</button>
	  <button className={trackType==='search'? 'selected': ''} onClick={() => {setTrackType('search')}}>search</button>
	  <button className={trackType==='track'? 'selected': ''} onClick={() => {setTrackType('track')}}>track</button>
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
      const queryImage = await utils.loadImage('../tests/video/out1.png');

      const inputWidth = queryImage.width;
      const inputHeight = queryImage.height;
      const controller = new MINDAR.Controller(inputWidth, inputHeight);
      const {dimensions, matchingDataList, trackingDataList, imageListList} = await controller.addImageTargets('../examples/assets/card-example/card.mind');

      const featurePoints = await controller.detect(queryImage);
      const {modelViewTransform, allMatchResults} = await controller.match(featurePoints);
      const {trackResults, track2Result} = await controller.track(queryImage, modelViewTransform, 0, trackingDataList[0].length);

      const worldMatrix = modelViewTransform && controller.getWorldMatrix(modelViewTransform);
      const projectionMatrix = controller.getProjectionMatrix();

      const result = {
	queryImage: queryImage,
	dimensions,
	worldMatrix,
	projectionMatrix,
	target: {
	  images: imageListList[0],
	  trackingData: trackingDataList[0]
	},
	matchResults: allMatchResults,
	trackResults,
	track2Result,
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
