const {Controller, UI} = window.MINDAR.FACE;

const THREE = AFRAME.THREE;

AFRAME.registerSystem('mindar-face-system', {
  container: null,
  video: null,
  processingVideo: false,
  shouldFaceUser: true,
  lastHasFace: false,

  init: function() {
    this.anchorEntities = [];
    this.faceMeshEntities = [];
  },

  setup: function({uiLoading, uiScanning, uiError}) {
    this.ui = new UI({uiLoading, uiScanning, uiError});
  },

  registerFaceMesh: function(el) {
    this.faceMeshEntities.push({el});
  },

  registerAnchor: function(el, anchorIndex) {
    this.anchorEntities.push({el: el, anchorIndex});
  },

  start: function() {
    this.ui.showLoading();

    this.container = this.el.sceneEl.parentNode;
    //this.__startVideo();
    this._startVideo();
  },

  stop: function() {
    this.pause();
    const tracks = this.video.srcObject.getTracks();
    tracks.forEach(function(track) {
      track.stop();
    });
    this.video.remove();
  },

  switchCamera: function() {
    this.shouldFaceUser = !this.shouldFaceUser;
    this.stop();
    this.start();
  },

  pause: function(keepVideo=false) {
    if (!keepVideo) {
      this.video.pause();
    }
    this.processingVideo = false;
  },

  unpause: function() {
    this.video.play();
    this.processingVideo = true;
  },

  // mock a video with an image
  __startVideo: function() {
    this.video = document.createElement("img");
    this.video.onload = async () => {
      this.video.videoWidth = this.video.width;
      this.video.videoHeight = this.video.height;

      await this._setupAR();
      this._processVideo();
      this.processingVideo = false;
      this.ui.hideLoading();
    }
    this.video.style.position = 'absolute'
    this.video.style.top = '0px'
    this.video.style.left = '0px'
    this.video.style.zIndex = '-2'
    this.video.src = "./assets/face1.jpeg";

    this.container.appendChild(this.video);
  },

  _startVideo: function() {
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
      this.el.emit("arError", {error: 'VIDEO_FAIL'});
      this.ui.showCompatibility();
      return;
    }

    navigator.mediaDevices.getUserMedia({audio: false, video: {
      facingMode: (this.shouldFaceUser? 'face': 'environment'),
    }}).then((stream) => {
      this.video.addEventListener( 'loadedmetadata', async () => {
        this.video.setAttribute('width', this.video.videoWidth);
        this.video.setAttribute('height', this.video.videoHeight);
        await this._setupAR();
	this.controller.setInputSize(this.video.videoWidth, this.video.videoHeight);
	this._processVideo();
	this.ui.hideLoading();
      });
      this.video.srcObject = stream;
    }).catch((err) => {
      console.log("getUserMedia error", err);
      this.el.emit("arError", {error: 'VIDEO_FAIL'});
    });
  },

  _processVideo: function() {
    const sleep = () => { 
      return new Promise(window.requestAnimationFrame); 
    }
    const startProcessing = async() => {
      while (true) {
	if (!this.processingVideo) break;

	const anchorIndexes = [];
	for (let i = 0; i < this.anchorEntities.length; i++) {
	  anchorIndexes.push(this.anchorEntities[i].anchorIndex);
	}
	const hasFace = await this.controller.detect(this.video);
	if (hasFace && !this.lastHasFace) {
	  this.el.emit("targetFound");
	}
	if (!hasFace && this.lastHasFace) {
	  this.el.emit("targetLost");
	}
	this.lastHasFace = hasFace;

	for (let i = 0; i < this.anchorEntities.length; i++) {
	  if (hasFace) {
	    const landmarkProperties = this.controller.getLandmarkProperties(this.anchorEntities[i].anchorIndex);
	    this.anchorEntities[i].el.updateVisibility(true);
	    this.anchorEntities[i].el.updatePosition(landmarkProperties);
	  } else {
	    this.anchorEntities[i].el.updateVisibility(false);
	  }
	}

	for (let i = 0; i < this.faceMeshEntities.length; i++) {
	  this.faceMeshEntities[i].el.updateVisibility(hasFace);
	}
	await sleep();
      }
    }
    this.processingVideo = true;
    startProcessing();
  },

  _setupAR: async function() {
    this.controller = new Controller();
    this._resize();
    await this.controller.setup();
    await this.controller.detect(this.video); // warm up the model

    for (let i = 0; i < this.faceMeshEntities.length; i++) {
      this.faceMeshEntities[i].el.addFaceMesh(this.controller.createFaceGeoemtry());
    }

    this._resize();
    window.addEventListener('resize', this._resize.bind(this));
    this.el.emit("arReady");
  },

  _resize: function() {
    const video = this.video;
    const container = this.container;
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
    this.video.style.top = (-(vh - container.clientHeight) / 2) + "px";
    this.video.style.left = (-(vw - container.clientWidth) / 2) + "px";
    this.video.style.width = vw + "px";
    this.video.style.height = vh + "px";

    const camera = new THREE.OrthographicCamera(1, 1, 1, 1, -1000, 1000);
    camera.left = -0.5 * vw;
    camera.right = 0.5 * vw;
    camera.top = 0.5 * vh;
    camera.bottom = -0.5 * vh;
    camera.updateProjectionMatrix();

    const sceneEl = container.getElementsByTagName("a-scene")[0];
    sceneEl.style.width = vw + "px";
    sceneEl.style.height = vh + "px";
    sceneEl.style.top = (-(vh - container.clientHeight) / 2) + "px";
    sceneEl.style.left = (-(vw - container.clientWidth) / 2) + "px";

    const cameraEle = container.getElementsByTagName("a-camera")[0];
    cameraEle.setObject3D('camera', camera);
    cameraEle.setAttribute('camera', 'active', true);

    this.controller.setDisplaySize(vw, vh);
  }
});

AFRAME.registerComponent('mindar-face', {
  dependencies: ['mindar-face-system'],

  schema: {
    autoStart: {type: 'boolean', default: true},
    faceOccluder: {type: 'boolean', default: true},
    uiLoading: {type: 'string', default: 'yes'},
    uiScanning: {type: 'string', default: 'yes'},
    uiError: {type: 'string', default: 'yes'},
  },

  init: function() {
    const arSystem = this.el.sceneEl.systems['mindar-face-system'];

    if (this.data.faceOccluder) {
      const faceOccluderMeshEntity = document.createElement('a-entity');
      faceOccluderMeshEntity.setAttribute("mindar-face-default-face-occluder", true);
      this.el.sceneEl.appendChild(faceOccluderMeshEntity);
    }

    arSystem.setup({
      uiLoading: this.data.uiLoading,
      uiScanning: this.data.uiScanning,
      uiError: this.data.uiError,
    });

    if (this.data.autoStart) {
      this.el.sceneEl.addEventListener('renderstart', () => {
        arSystem.start();
      });
    }
  },
});

AFRAME.registerComponent('mindar-face-target', {
  dependencies: ['mindar-face-system'],

  schema: {
    anchorIndex: {type: 'number'},
  },

  init: function() {
    const arSystem = this.el.sceneEl.systems['mindar-face-system'];
    arSystem.registerAnchor(this, this.data.anchorIndex);
    this.el.object3D.visible = false;
  },

  updateVisibility(visible) {
    this.el.object3D.visible = visible;
  },

  updatePosition({position, rotation, scale}) {
    const root = this.el.object3D;
    root.position.copy(position);
    root.scale.copy(scale);
    root.rotation.x = rotation.x;
    root.rotation.y = rotation.y;
    root.rotation.z = rotation.z;
  },
});

AFRAME.registerComponent('mindar-face-occluder', {
  init: function() {
    const root = this.el.object3D;
    this.el.addEventListener('model-loaded', () => {
      this.el.getObject3D('mesh').traverse((o) => {
	if (o.isMesh) {
	  const material = new THREE.MeshPhongMaterial({
	    colorWrite: false,
	  });
	  o.material = material;
	}
      });
    });
  },
});

AFRAME.registerComponent('mindar-face-default-face-occluder', {
  init: function() {
    const arSystem = this.el.sceneEl.systems['mindar-face-system'];
    arSystem.registerFaceMesh(this);
  },

  updateVisibility(visible) {
    this.el.object3D.visible = visible;
  },

  addFaceMesh(faceGeometry) {
    const material = new THREE.MeshPhongMaterial({colorWrite: false});
    //const material = new THREE.MeshPhongMaterial({color: 0xffffff});
    const mesh = new THREE.Mesh(faceGeometry, material);
    this.el.setObject3D('mesh', mesh);
  },
});
