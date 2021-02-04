let processResult = null;
let displayMatchParams = {};

const colors = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'];

const loadImage = async (src) => {
  const img = new Image();
  return new Promise((resolve, reject) => {
    let img = new Image()
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src; 
  })
}

const drawPoint = (ctx, color, centerX, centerY) => {
  const radius = 10;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = color;
  ctx.lineWidth = 1;
  ctx.strokeStyle = color;
  ctx.stroke();
}
const drawLine = (ctx, color, fromX, fromY, toX, toY) => {
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();
}

const process = async () => {
  const queryImages = [];
  //for (let i = 1; i <= 3; i++) {
  for (let i = 1; i <= 11; i++) {
    queryImages.push(await loadImage('../tests/video/out' + i + '.png'));
  }
  const inputWidth = queryImages[0].width;
  const inputHeight = queryImages[0].height;
  const controller = new MINDAR.Controller(inputWidth, inputHeight);
  const proj = controller.getProjectionMatrix();

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

  const {dimensions, matchingDataList, imageListList} = await controller.addImageTargets('./assets/card-example/card.mind');
  const [markerWidth, markerHeight] = dimensions[0];

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

  const results = [];

  for (let i = 0; i < queryImages.length; i++) {
    const THREE = AFRAME.THREE;
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ alpha: true } );
    renderer.setSize( inputWidth, inputHeight );

    const queryImage = queryImages[i];
    const result = await controller.processImage(queryImage);
    const matchResults = Object.assign({}, globalDebug.allMatchResults);

    results.push({
      queryImage,
      worldMatrix: result.detectedWorldMatrix,
      featurePoints: result.featurePoints,
      matchResults,
    });
  }

  processResult = {
    queryResults: results,
    postMatrix,
    inputWidth,
    inputHeight,
    markerHeight,
    markerWidth,
    camera,
    matchingDataList,
    imageListList
  }
}

const _process = async () => {
  const queryImages = [];
  //for (let i = 1; i <= 5; i++) {
  for (let i = 1; i <= 3; i++) {
    queryImages.push(await loadImage('../tests/video/out' + i + '.png'));
  }

  const inputWidth = queryImages[0].width;
  const inputHeight = queryImages[0].height;
  const displayWidth = 400;
  //const displayWidth = inputWidth;
  const displayHeight = parseInt(displayWidth * inputHeight / inputWidth);
  const displayScale = displayWidth / queryImages[0].width;
  console.log("displayScale", displayScale);

  const controller = new MINDAR.Controller(inputWidth, inputHeight);
  const proj = controller.getProjectionMatrix();

  const fov = 2 * Math.atan(1/proj[5] /inputHeight * inputHeight ) * 180 / Math.PI; // vertical fov
  const near = proj[14] / (proj[10] - 1.0);
  const far = proj[14] / (proj[10] + 1.0);
  const ratio = proj[5] / proj[0]; // (r-l) / (t-b)
  const newAspect = displayWidth / displayHeight;

  const camera = new THREE.PerspectiveCamera();
  camera.fov = fov;
  camera.aspect = newAspect;
  camera.near = near;
  camera.far = far;
  camera.updateProjectionMatrix();

  const {dimensions, matchingDataList, imageListList} = await controller.addImageTargets('./assets/card-example/card.mind');
  const [markerWidth, markerHeight] = dimensions[0];

  console.log("image list", imageListList);
  console.log("matching list", matchingDataList);

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

  const contexts = [];

  const selectDetail = (queryImageIndex, keyframeIndex) => {
    console.log("select detail", queryImageIndex, keyframeIndex);
    const ctx = contexts[queryImageIndex];
    const targetImage = imageListList[0][keyframeIndex];

    let displayOffsetX = 400;
    let displayOffsetY = 0;
    for (let t = 0; t < keyframeIndex; t++) {
      displayOffsetY += targetImage.height;
    }

    const matchingFeaturePoints = matchingDataList[0][keyframeIndex].points;
    const matchResult = globalDebug.allMatchResults[keyframeIndex];
    if (matchResult) {
      const matches = matchResult.matches;
      for (let m = 0; m < matches.length; m++) {
	const querypoint = featurePoints[matches[m].querypointIndex];
	const targetpoint = matchingFeaturePoints[matches[m].keypointIndex];
	const color = colors[m % colors.length];

	drawLine(
	  ctx, 
	  color, 
	  Math.round(querypoint.x),
	  Math.round(querypoint.y),
	  Math.round(targetpoint.x) + displayOffsetX,
	  Math.round(targetpoint.y) + displayOffsetY,
	)

	drawPoint(ctx, color, Math.round(targetpoint.x) + displayOffsetX, Math.round(targetpoint.y) + displayOffsetY);
      }
    }
  }

  for (let i = 0; i < queryImages.length; i++) {
    const THREE = AFRAME.THREE;
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ alpha: true } );
    renderer.setSize( inputWidth, inputHeight );

    const queryImage = queryImages[i];
    queryImage.style.width = displayWidth;
    queryImage.style.height = displayHeight;

    const result = await controller.processImage(queryImage);
    console.log("result", result);
    const worldMatrix = result.detectedWorldMatrix;
    const featurePoints = result.featurePoints;

    //const worldMatrix = [0.9996180363835608, 0.0033864699981571316, 0.027428327649082325, 0, 0.004604954072149425, 0.9693120535952455, -0.24579043340407125, 0, -0.02741898847467591, 0.24582301748308294, 0.9689268512878242, 0, -374.16939442159844, -249.40222962022065, -1704.6804996288372, 1];

    if (worldMatrix) {
      var m = new AFRAME.THREE.Matrix4();
      m.elements = worldMatrix;
      m.multiply(postMatrix);

      const geometry = new THREE.PlaneGeometry(1, markerHeight / markerWidth);
      const material = new THREE.MeshBasicMaterial( { color: 0xff0000, transparent: true,  opacity: 0.2 } );
      const plane = new THREE.Mesh( geometry, material );
      plane.matrixAutoUpdate = false;
      plane.matrix = m;
      scene.add( plane );
    }

    const listContainer = document.getElementById("list-container");
    const container = document.createElement("div");
    container.style.height = displayHeight;
    container.classList.add("container");
    listContainer.appendChild(container);
    container.appendChild(queryImage);

    const renderCanvas = renderer.domElement;
    renderCanvas.style.width = displayWidth;
    renderCanvas.style.height = displayHeight;
    container.appendChild(renderCanvas);

    renderer.render(scene, camera);

    const canvas = document.createElement('canvas');
    const canvasWidth = inputWidth * 2;
    canvas.width = canvasWidth;
    canvas.height = inputHeight;
    canvas.style.width = displayWidth * 2;
    canvas.style.height = displayHeight;

    const canvas2 = document.createElement('canvas');
    canvas2.width = canvasWidth;
    canvas2.height = inputHeight;
    canvas2.style.width = displayWidth * 2;
    canvas2.style.height = displayHeight;
    
    container.appendChild(canvas);
    container.appendChild(canvas2);

    const controlPanel = document.createElement('div');
    controlPanel.classList.add("control-panel");
    for (let t = 0; t < imageListList[0].length; t++) {
      const imageDiv = document.createElement('div');
      imageDiv.innerHTML = 'image' + t;
      imageDiv.classList.add('control-image');
      imageDiv.addEventListener('click', () => {selectDetail(i, t)});
      controlPanel.appendChild(imageDiv);
    }
    container.appendChild(controlPanel);

    const ctx = canvas.getContext('2d');
    const ctx2 = canvas.getContext('2d');
    contexts.push(ctx2);


    for (let i=0; i < featurePoints.length; ++i) {
      drawPoint(ctx, '#0000ff', Math.round(featurePoints[i].x), Math.round(featurePoints[i].y));
    }

    let displayOffsetX = inputWidth;
    let displayOffsetY = 0;
    for (let t = 0; t < imageListList[0].length; t++) {
      const targetImage = imageListList[0][t];
      const matchingFeaturePoints = matchingDataList[0][t].points;

      const tData = new Uint8ClampedArray(targetImage.width * targetImage.height * 4);
      for (let i = 0; i < targetImage.data.length; i++) {
	tData[i*4+0] = targetImage.data[i];
	tData[i*4+1] = targetImage.data[i];
	tData[i*4+2] = targetImage.data[i];
	tData[i*4+3] = 255;
      }
      const imageData = new ImageData(tData, targetImage.width, targetImage.height);
      ctx.putImageData(imageData, displayOffsetX, displayOffsetY, 0, 0, targetImage.width, targetImage.height);

      for (let i=0; i < matchingFeaturePoints.length; ++i) {
	drawPoint(ctx, '#0000ff', Math.round(matchingFeaturePoints[i].x) + displayOffsetX, Math.round(matchingFeaturePoints[i].y) + displayOffsetY);
      }
      displayOffsetY += targetImage.height;
    }
    continue;

    displayOffsetY = 0;
    for (let t = 0; t < imageListList[0].length; t++) {
      const targetImage = imageListList[0][t];
      const matchingFeaturePoints = matchingDataList[0][t].points;
      const matchResult = globalDebug.allMatchResults[t];
      if (matchResult) {
	const matches = matchResult.matches;
	for (let m = 0; m < matches.length; m++) {
	  const querypoint = featurePoints[matches[m].querypointIndex];
	  const targetpoint = matchingFeaturePoints[matches[m].keypointIndex];
	  const color = colors[m % colors.length];

	  drawLine(
	    ctx, 
	    color, 
	    Math.round(querypoint.x),
	    Math.round(querypoint.y),
	    Math.round(targetpoint.x) + displayOffsetX,
	    Math.round(targetpoint.y) + displayOffsetY,
	  )

	  drawPoint(ctx, color, Math.round(targetpoint.x) + displayOffsetX, Math.round(targetpoint.y) + displayOffsetY);
	}
      }

      displayOffsetY += targetImage.height;
    }


    console.log("globalDebug", globalDebug);

  }
}

const displayMatch = (queryIndex, keyframeIndex, matchType) => {
  const {queryResults, camera, postMatrix, inputWidth, inputHeight, markerHeight, markerWidth, matchingDataList, imageListList} = processResult;

  const targetImage = imageListList[0][keyframeIndex];
  const targetFeaturePoints = matchingDataList[0][keyframeIndex].points;
  const {worldMatrix, queryImage, featurePoints} = queryResults[queryIndex];
  const matchResult = queryResults[queryIndex].matchResults[keyframeIndex];

  const displayWidth = 400;
  const displayHeight = parseInt(displayWidth * inputHeight / inputWidth);

  const THREE = AFRAME.THREE;
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({ alpha: true } );
  renderer.setSize(inputWidth, inputHeight);

  const canvas = document.getElementById('match-canvas');
  const canvasWidth = inputWidth * 2;
  canvas.width = canvasWidth;
  canvas.height = inputHeight;
  canvas.style.width = displayWidth * 2;
  canvas.style.height = displayHeight;

  const ctx = canvas.getContext('2d');

  ctx.drawImage(queryImage, 0, 0);

  const targetOffsetX = inputWidth;
  const targetOffsetY = 0;
  const tData = new Uint8ClampedArray(targetImage.width * targetImage.height * 4);
  for (let i = 0; i < targetImage.data.length; i++) {
    tData[i*4+0] = targetImage.data[i];
    tData[i*4+1] = targetImage.data[i];
    tData[i*4+2] = targetImage.data[i];
    tData[i*4+3] = 255;
  }
  const imageData = new ImageData(tData, targetImage.width, targetImage.height);
  ctx.putImageData(imageData, targetOffsetX, targetOffsetY, 0, 0, targetImage.width, targetImage.height);

  for (let i = 0; i < featurePoints.length; i++) {
    drawPoint(ctx, '#0000ff', Math.round(featurePoints[i].x), Math.round(featurePoints[i].y) + targetOffsetY);
  }

  for (let i = 0; i < targetFeaturePoints.length; i++) {
    drawPoint(ctx, '#0000ff', Math.round(targetFeaturePoints[i].x) + targetOffsetX, Math.round(targetFeaturePoints[i].y) + targetOffsetY);
  }

  if (matchType && matchResult[matchType]) {
    const matches = matchResult[matchType];
    for (let m = 0; m < matches.length; m++) {
      const querypoint = featurePoints[matches[m].querypointIndex];
      const targetpoint = targetFeaturePoints[matches[m].keypointIndex];
      const color = colors[m % colors.length];

      drawLine(
	ctx, 
	color, 
	Math.round(querypoint.x),
	Math.round(querypoint.y),
	Math.round(targetpoint.x) + targetOffsetX,
	Math.round(targetpoint.y) + targetOffsetY,
      )

      drawPoint(ctx, color, Math.round(targetpoint.x) + targetOffsetX, Math.round(targetpoint.y) + targetOffsetY);
    }
  }

  $("#match-popup").show();
}

const display = () => {
  const {queryResults, camera, postMatrix, inputWidth, inputHeight, markerHeight, markerWidth, matchingDataList, imageListList} = processResult;
    
  const listContainer = document.getElementById("list-container");
  const displayWidth = 100;
  const displayHeight = parseInt(displayWidth * inputHeight / inputWidth);

  for (let i = 0; i < queryResults.length; i++) {
    const queryResult = queryResults[i];
    const {worldMatrix, queryImage, featurePoints, matchResults} = queryResult;
    queryImage.style.width = displayWidth;
    queryImage.style.height = displayHeight;

    const THREE = AFRAME.THREE;
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ alpha: true } );
    renderer.setSize( inputWidth, inputHeight );

    const container = document.createElement("div");
    container.classList.add("container");
    container.style.height = displayHeight;
    listContainer.appendChild(container);
    container.appendChild(queryImage);

    if (worldMatrix) {
      var m = new AFRAME.THREE.Matrix4();
      m.elements = worldMatrix;
      m.multiply(postMatrix);

      const geometry = new THREE.PlaneGeometry(1, markerHeight / markerWidth);
      const material = new THREE.MeshBasicMaterial( { color: 0xff0000, transparent: true,  opacity: 0.2 } );
      const plane = new THREE.Mesh( geometry, material );
      plane.matrixAutoUpdate = false;
      plane.matrix = m;
      scene.add( plane );
    }

    const renderCanvas = renderer.domElement;
    renderCanvas.style.width = displayWidth;
    renderCanvas.style.height = displayHeight;
    container.appendChild(renderCanvas);

    renderer.render(scene, camera);

    const controlPanel = document.createElement('div');
    controlPanel.classList.add("control-panel");
    for (let t = 0; t < imageListList[0].length; t++) {
      const matchResult = matchResults[t];
      const imageDiv = document.createElement('div');

      const matchCount = [];
      matchCount.push( matchResult.matches && matchResult.matches.length || 0);
      matchCount.push( matchResult.houghMatches && matchResult.houghMatches.length || 0);
      matchCount.push( matchResult.inlierMatches && matchResult.inlierMatches.length || 0);
      matchCount.push( matchResult.matches2 && matchResult.matches2.length || 0);
      matchCount.push( matchResult.houghMatches2 && matchResult.houghMatches2.length || 0);
      matchCount.push( matchResult.inlierMatches2 && matchResult.inlierMatches2.length || 0);

      imageDiv.innerHTML = 'image' + t + " (" + matchCount.join("-") + ")";
      imageDiv.classList.add('control-image');
      imageDiv.addEventListener('click', () => {
	displayMatchParams.queryIndex = i;
	displayMatchParams.keyframeIndex = t;
	displayMatch(displayMatchParams.queryIndex, displayMatchParams.keyframeIndex);
      });
      controlPanel.appendChild(imageDiv);
    }
    container.appendChild(controlPanel);
  }
}

$(document).ready(async () => {
  await process();
  console.log("processResult", processResult);
  display();
  //displayMatch(0, 5);

  $("#match-close").click(() => {
    $("#match-popup").hide();
  });
  $("#match-type-matches").click(() => {
    displayMatch(displayMatchParams.queryIndex, displayMatchParams.keyframeIndex, 'matches');
  });
  $("#match-type-hough").click(() => {
    displayMatch(displayMatchParams.queryIndex, displayMatchParams.keyframeIndex, 'houghMatches');
  });
  $("#match-type-inlier").click(() => {
    displayMatch(displayMatchParams.queryIndex, displayMatchParams.keyframeIndex, 'inlierMatches');
  });
  $("#match-type-matches2").click(() => {
    displayMatch(displayMatchParams.queryIndex, displayMatchParams.keyframeIndex, 'matches2');
  });
  $("#match-type-hough2").click(() => {
    displayMatch(displayMatchParams.queryIndex, displayMatchParams.keyframeIndex, 'houghMatches2');
  });
  $("#match-type-inlier2").click(() => {
    displayMatch(displayMatchParams.queryIndex, displayMatchParams.keyframeIndex, 'inlierMatches2');
  });
});
