const THREE = require("three");
const {CSS3DRenderer} = require('three/examples/jsm/renderers/CSS3DRenderer.js');
const {Controller} = require("./controller");
const {UI} = require("../ui/ui");

const cssScaleDownMatrix = new THREE.Matrix4();
cssScaleDownMatrix.compose(new THREE.Vector3(), new THREE.Quaternion(), new THREE.Vector3(0.001, 0.001, 0.001));

class MindARThree {
  constructor({container, uiLoading="yes", uiScanning="yes", uiError="yes"}) {
    this.container = container;
    this.ui = new UI({uiLoading, uiScanning, uiError});

    this.controller = new Controller();
    this.scene = new THREE.Scene();
    this.cssScene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    this.cssRenderer = new CSS3DRenderer({antialias: true });
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.camera = new THREE.OrthographicCamera(1, 1, 1, 1, -1000, 1000);
    this.anchors = [];
    this.faceMeshes = [];

    this.container.appendChild(this.renderer.domElement);
    this.container.appendChild(this.cssRenderer.domElement);

    this.shouldFaceUser = true;
    this.faceVisible = false;
    this.processingVideo = false;

    window.addEventListener('resize', this._resize.bind(this));
  }

  async start() {
    this.ui.showLoading();
    await this._startVideo();
    await this._startAR();
    this.ui.hideLoading();
  }

  stop() {
    const tracks = this.video.srcObject.getTracks();
    tracks.forEach(function(track) {
      track.stop();
    });
    this.video.remove();
    this.processingVideo = false;
  }

  switchCamera() {
    this.shouldFaceUser = !this.shouldFaceUser;
    this.stop();
    this.start();
  }

  addFaceMesh() {
    const faceGeometry = this.controller.createFaceGeoemtry();
    const faceMesh = new THREE.Mesh(faceGeometry, new THREE.MeshPhongMaterial({color: 0xffffff}));
    faceMesh.visible = false;
    this.faceMeshes.push(faceMesh);
    return faceMesh;
  }

  addAnchor(landmarkIndex) {
    const group = new THREE.Group();
    group.visible = false;
    //group.matrixAutoUpdate = false;
    const anchor = {group, landmarkIndex, css: false};
    this.anchors.push(anchor);
    this.scene.add(group);
    return anchor;
  }

  addCSSAnchor(landmarkIndex) {
    const group = new THREE.Group();
    group.visible = false;
    //group.matrixAutoUpdate = false;
    const anchor = {group, landmarkIndex, css: true};
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
	facingMode: (this.shouldFaceUser? 'face': 'environment'),
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

      this.controller.setInputSize(this.video.videoWidth, this.video.videoHeight);
      this._resize();
      await this.controller.setup();
      await this.controller.detect(this.video); // warm up the model

      this._resize();
      this._startProcessing();
      resolve();
    });
  }

  async _startProcessing() {
    const sleep = () => { 
      return new Promise(window.requestAnimationFrame); 
    }

    this.processingVideo = true;
    while (true) {
      if (!this.processingVideo) break;

      const hasFace = await this.controller.detect(this.video);

      if (this.onTargetFound && hasFace && !this.faceVisible) {
	this.onTargetFound();
      }
      if (this.onTargetLost && !hasFace && this.faceVisible) {
	this.onTargetLost();
      }
      this.faceVisible = hasFace;

      for (let i = 0; i < this.anchors.length; i++) {
	if (hasFace) {
	  const {position, rotation, scale} = this.controller.getLandmarkProperties(this.anchors[i].landmarkIndex);
	  this.anchors[i].group.visible = true;
	  this.anchors[i].group.position.copy(position);
	  this.anchors[i].group.scale.copy(scale);
	  this.anchors[i].group.rotation.x = rotation.x;
	  this.anchors[i].group.rotation.y = rotation.y;
	  this.anchors[i].group.rotation.z = rotation.z;
	} else {
	  this.anchors[i].group.visible = false;
	}
      }
      for (let i = 0; i < this.faceMeshes.length; i++) {
	if (hasFace) {
	  this.faceMeshes[i].visible = true;
	} else {
	  this.faceMeshes[i].visible = false;
	}
      }
      await sleep();
    }
  }

  _resize() {
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

    //camera.left = -0.5 * vw;
    //camera.right = 0.5 * vw;
    //camera.top = 0.5 * vh;
    //camera.bottom = -0.5 * vh;
    camera.left = -0.5 * container.clientWidth;
    camera.right = 0.5 * container.clientWidth;
    camera.top = 0.5 * container.clientHeight;
    camera.bottom = -0.5 * container.clientHeight;
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

    this.controller.setDisplaySize(vw, vh);
    //this.controller.setDisplaySize(container.clientWidth, container.clientHeight);
  }
}

if (!window.MINDAR) {
  window.MINDAR = {};
}
if (!window.MINDAR.FACE) {
  window.MINDAR.FACE = {};
}

window.MINDAR.FACE.MindARThree = MindARThree;
window.MINDAR.FACE.THREE = THREE;
