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

    this.controller = new Controller({});
    this.scene = new THREE.Scene();
    this.cssScene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    this.cssRenderer = new CSS3DRenderer({antialias: true });
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.camera = new THREE.PerspectiveCamera();

    this.anchors = [];
    this.faceMeshes = [];
    this.faceGroup = new THREE.Group();
    this.faceGroup.matrixAutoUpdate = false;
    this.cssFaceGroup = new THREE.Group();
    this.cssFaceGroup.matrixAutoUpdate = false;

    this.scene.add(this.faceGroup);
    this.cssScene.add(this.cssFaceGroup);

    this.container.appendChild(this.renderer.domElement);
    this.container.appendChild(this.cssRenderer.domElement);

    this.shouldFaceUser = true;

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
    this.controller.stopProcessVideo();
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
    const anchor = {group, landmarkIndex, css: false};
    this.anchors.push(anchor);
    this.faceGroup.add(group);
    return anchor;
  }

  addCSSAnchor(landmarkIndex) {
    const group = new THREE.Group();
    const anchor = {group, landmarkIndex, css: true};
    this.anchors.push(anchor);
    this.cssFaceGroup.add(group);
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

      //this.controller.setInputSize(this.video.videoWidth, this.video.videoHeight);
      this.controller.onUpdate = ({hasFace, estimateResult}) => {
	this.faceGroup.visible = hasFace;
	this.cssFaceGroup.visible = hasFace;

	if (hasFace) {
	  const {metricLandmarks, faceMatrix, faceScale} = estimateResult;
	  const m = new THREE.Matrix4();
	  m.set(
	    faceMatrix[0],faceMatrix[1],faceMatrix[2],faceMatrix[3],
	    faceMatrix[4],faceMatrix[5],faceMatrix[6],faceMatrix[7],
	    faceMatrix[8],faceMatrix[9],faceMatrix[10],faceMatrix[11],
	    faceMatrix[12],faceMatrix[13],faceMatrix[14],faceMatrix[15],
	  )
	  this.faceGroup.matrix = m;
	  this.cssFaceGroup.matrix = m;

	  for (let i = 0; i < this.anchors.length; i++) {
	    const landmarkIndex = this.anchors[i].landmarkIndex;
	    if (this.anchors[i].css) {
	      //this.anchors[i].group.scale.set(faceScale/100, faceScale/100, faceScale/100);
	      this.anchors[i].group.scale.set(faceScale/100, faceScale/100, faceScale/100);
	      /*
	      this.anchors[i].group.position.set(
		metricLandmarks[landmarkIndex][0],
		metricLandmarks[landmarkIndex][1],
		metricLandmarks[landmarkIndex][2]);
		*/

	    } else {
	      this.anchors[i].group.scale.set(faceScale, faceScale, faceScale);
	      this.anchors[i].group.position.set(
		metricLandmarks[landmarkIndex][0],
		metricLandmarks[landmarkIndex][1],
		metricLandmarks[landmarkIndex][2]);
	    }
	  }
	}
      }
      this._resize();
      await this.controller.setup(video);

      const {fov, aspect, near, far} = this.controller.getCameraParams();
      this.camera.fov = fov;
      this.camera.aspect = aspect;
      this.camera.near = near;
      this.camera.far = far;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(this.video.videoWidth, this.video.videoHeight);
      this.cssRenderer.setSize(this.video.videoWidth, this.video.videoHeight);

      await this.controller.dummyRun(video);

      this._resize();
      this.controller.processVideo(video);
      resolve();
    });
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

    video.style.top = (-(vh - container.clientHeight) / 2) + "px";
    video.style.left = (-(vw - container.clientWidth) / 2) + "px";
    video.style.width = vw + "px";
    video.style.height = vh + "px";

    const canvas = renderer.domElement;
    const cssCanvas = cssRenderer.domElement;

    canvas.style.position = 'absolute';
    canvas.style.left = video.style.left;
    canvas.style.right = video.style.right;
    canvas.style.width = video.style.width;
    canvas.style.height = video.style.height;

    cssCanvas.style.position = 'absolute';
    cssCanvas.style.left = video.style.left;
    cssCanvas.style.right = video.style.right;
    cssCanvas.style.width = video.style.width;
    cssCanvas.style.height = video.style.height;
    //cssCanvas.style.left = 0;
    //cssCanvas.style.top = 0;
    //cssCanvas.style.width = container.clientWidth + 'px';
    //cssCanvas.style.height = container.clientHeight + 'px';

    //renderer.setSize(container.clientWidth, container.clientHeight);
    //cssRenderer.setSize(container.clientWidth, container.clientHeight);
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
