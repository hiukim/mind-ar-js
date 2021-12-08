const THREE = require("three");
const tf = require('@tensorflow/tfjs');
const {CSS3DRenderer} = require('three/examples/jsm/renderers/CSS3DRenderer.js');
const {Controller} = require("./controller");
const {UI} = require("../ui/ui");

const cssScaleDownMatrix = new THREE.Matrix4();
cssScaleDownMatrix.compose(new THREE.Vector3(), new THREE.Quaternion(), new THREE.Vector3(0.001, 0.001, 0.001));

class MindARThree {
  constructor({container, imageTargetSrc, maxTrack, captureRegion=false, uiLoading="yes", uiScanning="yes", uiError="yes"}) {
    this.container = container;
    this.imageTargetSrc = imageTargetSrc;
    this.maxTrack = maxTrack;
    this.captureRegion = captureRegion;
    this.ui = new UI({uiLoading, uiScanning, uiError});

    this.scene = new THREE.Scene();
    this.cssScene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    this.cssRenderer = new CSS3DRenderer({antialias: true });
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.camera = new THREE.PerspectiveCamera();
    this.anchors = [];

    this.renderer.domElement.style.position = 'absolute';
    this.cssRenderer.domElement.style.position = 'absolute';
    this.container.appendChild(this.renderer.domElement);
    this.container.appendChild(this.cssRenderer.domElement);

    window.addEventListener('resize', this.resize.bind(this));
  }

  async start() {
    this.ui.showLoading();
    await this._startVideo();
    await this._startAR();
  }

  stop() {
    this.controller.stopProcessVideo();
    const tracks = this.video.srcObject.getTracks();
    tracks.forEach(function(track) {
      track.stop();
    });
    this.video.remove();
  }

  addAnchor(targetIndex) {
    const group = new THREE.Group();
    group.visible = false;
    group.matrixAutoUpdate = false;
    const anchor = {group, targetIndex, onTargetFound: null, onTargetLost: null, css: false, visible: false};
    this.anchors.push(anchor);
    this.scene.add(group);
    return anchor;
  }

  addCSSAnchor(targetIndex) {
    const group = new THREE.Group();
    group.visible = false;
    group.matrixAutoUpdate = false;
    const anchor = {group, targetIndex, onTargetFound: null, onTargetLost: null, css: true, visible: false};
    this.anchors.push(anchor);
    this.cssScene.add(group);
    return anchor;
  }

  _startVideo() {
    return new Promise((resolve, reject) => {
      this.video = document.createElement('video');

      this.video.setAttribute('autoplay', '');
      this.video.setAttribute('muted', '');
      this.video.setAttribute('playsinline', '');
      this.video.style.position = 'absolute'
      this.video.style.top = '0px'
      this.video.style.left = '0px'
      this.video.style.zIndex = '-2'
      this.container.appendChild(this.video);

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
	this.ui.showCompatibility();
	reject();
	return;
      }

      navigator.mediaDevices.getUserMedia({audio: false, video: {
	facingMode: 'environment',
      }}).then((stream) => {
	this.video.addEventListener( 'loadedmetadata', () => {
	  this.video.setAttribute('width', this.video.videoWidth);
	  this.video.setAttribute('height', this.video.videoHeight);
	  resolve();
	});
	this.video.srcObject = stream;
      }).catch((err) => {
	console.log("getUserMedia error", err);
	reject();
      });
    });
  }

  _startAR() {
    return new Promise(async (resolve, reject) => {
      const video = this.video;
      const container = this.container;

      this.controller = new Controller({
	inputWidth: video.videoWidth,
	inputHeight: video.videoHeight,
	maxTrack: this.maxTrack, 
	onUpdate: (data) => {
	  if (data.type === 'updateMatrix') {
	    const {targetIndex, worldMatrix} = data;

	    for (let i = 0; i < this.anchors.length; i++) {
	      if (this.anchors[i].targetIndex === targetIndex) {
		if (this.anchors[i].onTargetLost && this.anchors[i].visible && worldMatrix === null) {
		  this.anchors[i].onTargetLost();
		  this.anchors[i].visible = false;
		}
		if (this.anchors[i].onTargetFound && !this.anchors[i].visible && worldMatrix !== null) {
		  let capturedImage = null; 
		  if (this.captureRegion) {
		    capturedImage = this._pixels3DToImage(this.controller.capturedRegion);
		  }
		  this.anchors[i].onTargetFound({capturedImage});
		  this.anchors[i].visible = true;
		}

		if (this.anchors[i].css) {
		  this.anchors[i].group.children.forEach((obj) => {
		    obj.element.style.visibility = worldMatrix === null? "hidden": "visible";
		  });
		} else {
		  this.anchors[i].group.visible = worldMatrix !== null;
		}

		if (worldMatrix !== null) {
		  let m = new THREE.Matrix4();
		  m.elements = [...worldMatrix];
		  m.multiply(this.postMatrixs[targetIndex]);
		  if (this.anchors[i].css) {
		    m.multiply(cssScaleDownMatrix);
		  }
		  this.anchors[i].group.matrix = m;
		}

		if (worldMatrix !== null) {
		  this.ui.hideScanning();
		}
	      }
	    }
	  }
	}
      });
      if (this.captureRegion) {
	this.controller.shouldCaptureRegion = true;
      }

      this.resize();

      const {dimensions: imageTargetDimensions} = await this.controller.addImageTargets(this.imageTargetSrc);

      this.postMatrixs = [];
      for (let i = 0; i < imageTargetDimensions.length; i++) { 
	const position = new THREE.Vector3();
	const quaternion = new THREE.Quaternion();
	const scale = new THREE.Vector3();
	const [markerWidth, markerHeight] = imageTargetDimensions[i];
	position.x = markerWidth / 2;
	position.y = markerWidth / 2 + (markerHeight - markerWidth) / 2;
	scale.x = markerWidth;
	scale.y = markerWidth;
	scale.z = markerWidth;
	const postMatrix = new THREE.Matrix4();
	postMatrix.compose(position, quaternion, scale);
	this.postMatrixs.push(postMatrix);
      }

      await this.controller.dummyRun(this.video);
      this.ui.hideLoading();
      this.ui.showScanning();

      this.controller.processVideo(this.video);
      resolve();
    });
  }

  resize() {
    const {renderer, cssRenderer, camera, container, video} = this;
    if (!video) return;

    let vw, vh; // display css width, height
    const videoRatio = video.videoWidth / video.videoHeight;
    const containerRatio = container.clientWidth / container.clientHeight;
    if (videoRatio > containerRatio) {
      vh = container.clientHeight;
      vw = vh * videoRatio;
    } else {
      vw = container.clientWidth;
      vh = vw / videoRatio;
    }

    const proj = this.controller.getProjectionMatrix();
    const fov = 2 * Math.atan(1/proj[5] / vh * container.clientHeight ) * 180 / Math.PI; // vertical fov
    const near = proj[14] / (proj[10] - 1.0);
    const far = proj[14] / (proj[10] + 1.0);
    const ratio = proj[5] / proj[0]; // (r-l) / (t-b)
    camera.fov = fov;
    camera.near = near;
    camera.far = far;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    
    video.style.top = (-(vh - container.clientHeight) / 2) + "px";
    video.style.left = (-(vw - container.clientWidth) / 2) + "px";
    video.style.width = vw + "px";
    video.style.height = vh + "px";

    const canvas = renderer.domElement;
    const cssCanvas = cssRenderer.domElement;

    canvas.style.position = 'absolute';
    canvas.style.left = 0;
    canvas.style.top = 0;
    canvas.style.width = container.clientWidth + 'px';
    canvas.style.height = container.clientHeight + 'px';

    cssCanvas.style.position = 'absolute';
    cssCanvas.style.left = 0;
    cssCanvas.style.top = 0;
    cssCanvas.style.width = container.clientWidth + 'px';
    cssCanvas.style.height = container.clientHeight + 'px';

    renderer.setSize(container.clientWidth, container.clientHeight);
    cssRenderer.setSize(container.clientWidth, container.clientHeight);
  }

  _pixels3DToImage(pixels) {
    const height = pixels.length;
    const width = pixels[0].length;
    const data = new Uint8ClampedArray(height * width * 4);
    for (let j = 0; j < height; j++) {
      for (let i = 0; i < width; i++) {
	const pos = j * width + i;
	data[pos*4 + 0] = pixels[j][i][0];
	data[pos*4 + 1] = pixels[j][i][1];
	data[pos*4 + 2] = pixels[j][i][2];
	data[pos*4 + 3] = 255; 
      }
    }
    const imageData = new ImageData(data, width, height);
    const canvas = document.createElement("canvas");
    canvas.height = height;
    canvas.width = width;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL("image/png");
  }
}

if (!window.MINDAR) {
  window.MINDAR = {};
}
if (!window.MINDAR.IMAGE) {
  window.MINDAR.IMAGE = {};
}

window.MINDAR.IMAGE.MindARThree = MindARThree;
window.MINDAR.IMAGE.THREE = THREE;
window.MINDAR.IMAGE.tf = tf;
