const { useEffect, useMemo, useRef, useState, useCallback } = React;

const COLORS = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'];

//const THREE = AFRAME.THREE;

const TEMPLATE_RADIUS = 6;
const AR2_SEARCH_SIZE = 10;

const Display = ({result}) => {
  const {queryImages, allPickedKeyframes, allTrackResults, dimensions, allWorldMatrices, allBeforeProjected, allAfterProjected, projectionMatrix} = result; 
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
    const position = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3();
    position.x = markerWidth / 2;
    position.y = markerWidth / 2 + (markerHeight - markerWidth) / 2;
    scale.x = markerWidth;
    scale.y = markerWidth;
    scale.z = markerWidth;
    let postMatrix = new THREE.Matrix4();
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

    for (let queryIndex = 0; queryIndex < result.queryImages.length; queryIndex++) {
      const queryImage = result.queryImages[queryIndex];

      const worldMatrix = Object.assign({}, allWorldMatrices[queryIndex]);
      var m = new THREE.Matrix4();
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
      const targetIndex = 0;
      const queryImages = [];
      for (let i = 1; i <= 200; i+=3) {
      //for (let i = 107; i <= 114; i+=3) {
	try {
	  queryImages.push(await utils.loadImage('../tests/videos/c1/out' + String(i).padStart(3, '0') + '.png'));
	} catch (e) {
	}
      }

      const queryImage0 = queryImages[0];

      const inputWidth = queryImage0.width;
      const inputHeight = queryImage0.height;
      const controller = new MINDAR.Controller({inputWidth, inputHeight, debugMode: false});
      const {dimensions, matchingDataList, trackingDataList} = await controller.addImageTargets('../examples/assets/card-example/card.mind');
      //const {dimensions, matchingDataList, trackingDataList} = await controller.addImageTargets('../examples/assets/band-example/raccoon.mind');

      const allTrackResults = [];
      const allBeforeProjected = [];
      const allAfterProjected = [];
      const allPickedKeyframes = [];

      const allWorldMatrices = [];
      for (let i = 0; i < queryImages.length; i++) {
	const queryImage = queryImages[i];
	const {featurePoints} = await controller.detect(queryImage);
	const {modelViewTransform, allMatchResults} = await controller.match(featurePoints, targetIndex);
	if (modelViewTransform) {
	  allWorldMatrices.push(controller.getWorldMatrix(modelViewTransform, targetIndex));
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

