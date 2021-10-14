const {Controller, UI} = window.MINDAR.IMAGE;

class MindARThree {
  constructor({container, imageTargetSrc, maxTrack, uiLoading="yes", uiScanning="yes", uiError="yes"}) {
    this.container = container;
    this.imageTargetSrc = imageTargetSrc;
    this.maxTrack = maxTrack;
    this.ui = new UI({uiLoading, uiScanning, uiError});

    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.camera = new THREE.PerspectiveCamera();
    this.anchors = [];

    this.container.appendChild(this.renderer.domElement);

    window.addEventListener('resize', this.resize.bind(this));
  }

  async start() {
    this.ui.showLoading();
    await this._startVideo();
    await this._startAR();
  }

  stop() {
    const tracks = this.video.srcObject.getTracks();
    tracks.forEach(function(track) {
      track.stop();
    });
    this.video.remove();
  }

  addAnchor(targetIndex) {
    const anchor = new THREE.Group();
    anchor.matrixAutoUpdate = false;
    this.anchors.push({anchor, targetIndex});
    this.scene.add(anchor);
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
		this.anchors[i].anchor.visible = worldMatrix !== null;

		if (worldMatrix !== null) {
		  let m = new THREE.Matrix4();
		  m.elements = worldMatrix;
		  m.multiply(this.postMatrixs[targetIndex]);
		  this.anchors[i].anchor.matrix = m;
		}

		if (worldMatrix !== null) {
		  this.ui.hideScanning();
		}
	      }
	    }
	  }
	}
      });

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
    const {renderer, camera, container, video} = this;
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

    renderer.setSize(container.clientWidth, container.clientHeight);
  }
}

window.MINDAR.IMAGE.MindARThree = MindARThree;
