import {Controller, UI} from './index.js';

const needsDOMRefresh=document.readyState === 'complete'||document.readyState=='interactive';
AFRAME.registerSystem('mindar-image-system', {
  container: null,
  video: null,
  processingImage: false,

  init: function() {
    this.anchorEntities = [];
  },

  tick: function() {
  },

  setup: function({imageTargetSrc, maxTrack, showStats, uiLoading, uiScanning, uiError, missTolerance, warmupTolerance, filterMinCF, filterBeta}) {
    this.imageTargetSrc = imageTargetSrc;
    this.maxTrack = maxTrack;
    this.filterMinCF = filterMinCF;
    this.filterBeta = filterBeta;
    this.missTolerance = missTolerance;
    this.warmupTolerance = warmupTolerance;
    this.showStats = showStats;
    this.ui = new UI({uiLoading, uiScanning, uiError});
  },

  registerAnchor: function(el, targetIndex) {
    this.anchorEntities.push({el: el, targetIndex: targetIndex});
  },

  start: function() {
    this.container = this.el.sceneEl.parentNode;

    if (this.showStats) {
      this.mainStats = new Stats();
      this.mainStats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
      this.mainStats.domElement.style.cssText = 'position:absolute;top:0px;left:0px;z-index:999';
      this.container.appendChild(this.mainStats.domElement);
    }

    this.ui.showLoading();
    this._startVideo();
  },

  switchTarget: function(targetIndex) {
    this.controller.interestedTargetIndex = targetIndex;
  },

  stop: function() {
    this.pause();
    const tracks = this.video.srcObject.getTracks();
    tracks.forEach(function(track) {
      track.stop();
    });
    this.video.remove();
    this.controller.dispose();
  },

  pause: function(keepVideo=false) {
    if (!keepVideo) {
      this.video.pause();
    }
    this.controller.stopProcessVideo();
  },

  unpause: function() {
    this.video.play();
    this.controller.processVideo(this.video);
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
      // TODO: show unsupported error
      this.el.emit("arError", {error: 'VIDEO_FAIL'});
      this.ui.showCompatibility();
      return;
    }

    navigator.mediaDevices.getUserMedia({audio: false, video: {
      facingMode: 'environment',
    }}).then((stream) => {
      this.video.addEventListener( 'loadedmetadata', () => {
        //console.log("video ready...", this.video);
        this.video.setAttribute('width', this.video.videoWidth);
        this.video.setAttribute('height', this.video.videoHeight);
        this._startAR();
      });
      this.video.srcObject = stream;
    }).catch((err) => {
      console.log("getUserMedia error", err);
      this.el.emit("arError", {error: 'VIDEO_FAIL'});
    });
  },

  _startAR: async function() {
    const video = this.video;
    const container = this.container;

    this.controller = new Controller({
      inputWidth: video.videoWidth,
      inputHeight: video.videoHeight,
      maxTrack: this.maxTrack, 
      filterMinCF: this.filterMinCF,
      filterBeta: this.filterBeta,
      missTolerance: this.missTolerance,
      warmupTolerance: this.warmupTolerance,
      onUpdate: (data) => {
	if (data.type === 'processDone') {
	  if (this.mainStats) this.mainStats.update();
	}
	else if (data.type === 'updateMatrix') {
	  const {targetIndex, worldMatrix} = data;

	  for (let i = 0; i < this.anchorEntities.length; i++) {
	    if (this.anchorEntities[i].targetIndex === targetIndex) {
	      this.anchorEntities[i].el.updateWorldMatrix(worldMatrix, );
	    }
    }

    let isAnyVisible = this.anchorEntities.reduce((acc, entity) => {
      return acc || entity.el.el.object3D.visible;
    }, false);
    if (isAnyVisible) {
      this.ui.hideScanning();
    } else {
      this.ui.showScanning();
    }
	}
      }
    });

    this._resize();
    window.addEventListener('resize', this._resize.bind(this));

    const {dimensions: imageTargetDimensions} = await this.controller.addImageTargets(this.imageTargetSrc);

    for (let i = 0; i < this.anchorEntities.length; i++) {
      const {el, targetIndex} = this.anchorEntities[i];
      if (targetIndex < imageTargetDimensions.length) {
        el.setupMarker(imageTargetDimensions[targetIndex]);
      }
    }

    await this.controller.dummyRun(this.video);
    this.el.emit("arReady");
    this.ui.hideLoading();
    this.ui.showScanning();

    this.controller.processVideo(this.video);
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

    const proj = this.controller.getProjectionMatrix();
    const fov = 2 * Math.atan(1/proj[5] / vh * container.clientHeight ) * 180 / Math.PI; // vertical fov
    const near = proj[14] / (proj[10] - 1.0);
    const far = proj[14] / (proj[10] + 1.0);
    const ratio = proj[5] / proj[0]; // (r-l) / (t-b)
    //console.log("loaded proj: ", proj, ". fov: ", fov, ". near: ", near, ". far: ", far, ". ratio: ", ratio);
    const newAspect = container.clientWidth / container.clientHeight;
    const cameraEle = container.getElementsByTagName("a-camera")[0];
    const camera = cameraEle.getObject3D('camera');
    camera.fov = fov;
    camera.aspect = newAspect;
    camera.near = near;
    camera.far = far;
    camera.updateProjectionMatrix();
    //const newCam = new AFRAME.THREE.PerspectiveCamera(fov, newRatio, near, far);
    //camera.getObject3D('camera').projectionMatrix = newCam.projectionMatrix;

    this.video.style.top = (-(vh - container.clientHeight) / 2) + "px";
    this.video.style.left = (-(vw - container.clientWidth) / 2) + "px";
    this.video.style.width = vw + "px";
    this.video.style.height = vh + "px";
  }
});

AFRAME.registerComponent('mindar-image', {
  dependencies: ['mindar-image-system'],

  schema: {
    imageTargetSrc: {type: 'string'},
    maxTrack: {type: 'int', default: 1},
    filterMinCF: {type: 'number', default: -1},
    filterBeta: {type: 'number', default: -1},
    missTolerance: {type: 'int', default: -1},
    warmupTolerance: {type: 'int', default: -1},
    showStats: {type: 'boolean', default: false},
    autoStart: {type: 'boolean', default: true},
    uiLoading: {type: 'string', default: 'yes'},
    uiScanning: {type: 'string', default: 'yes'},
    uiError: {type: 'string', default: 'yes'},
  },

  init: function() {
    const arSystem = this.el.sceneEl.systems['mindar-image-system'];

    arSystem.setup({
      imageTargetSrc: this.data.imageTargetSrc, 
      maxTrack: this.data.maxTrack,
      filterMinCF: this.data.filterMinCF === -1? null: this.data.filterMinCF,
      filterBeta: this.data.filterBeta === -1? null: this.data.filterBeta,
      missTolerance: this.data.missTolerance === -1? null: this.data.missTolerance,
      warmupTolerance: this.data.warmupTolerance === -1? null: this.data.warmupTolerance,
      showStats: this.data.showStats,
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
  remove: function () {
    const arSystem = this.el.sceneEl.systems['mindar-image-system'];
    arSystem.stop();
  }
});

AFRAME.registerComponent('mindar-image-target', {
  dependencies: ['mindar-image-system'],

  schema: {
    targetIndex: {type: 'number'},
  },

  postMatrix: null, // rescale the anchor to make width of 1 unit = physical width of card

  init: function() {
    const arSystem = this.el.sceneEl.systems['mindar-image-system'];
    arSystem.registerAnchor(this, this.data.targetIndex);

    this.invisibleMatrix = new AFRAME.THREE.Matrix4(0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,1);

    const root = this.el.object3D;
    root.visible = false;
    root.matrixAutoUpdate = false;
  },

  setupMarker([markerWidth, markerHeight]) {
    const position = new AFRAME.THREE.Vector3();
    const quaternion = new AFRAME.THREE.Quaternion();
    const scale = new AFRAME.THREE.Vector3();
    position.x = markerWidth / 2;
    position.y = markerWidth / 2 + (markerHeight - markerWidth) / 2;
    scale.x = markerWidth;
    scale.y = markerWidth;
    scale.z = markerWidth;
    this.postMatrix = new AFRAME.THREE.Matrix4();
    this.postMatrix.compose(position, quaternion, scale);
  },

  updateWorldMatrix(worldMatrix) {
    this.el.emit("targetUpdate");
    if (!this.el.object3D.visible && worldMatrix !== null) {
      this.el.emit("targetFound");
    } else if (this.el.object3D.visible && worldMatrix === null) {
      this.el.emit("targetLost");
    }

    this.el.object3D.visible = worldMatrix !== null;
    if (worldMatrix === null) {
      this.el.object3D.matrix = this.invisibleMatrix;
      return;
    }
    var m = new AFRAME.THREE.Matrix4();
    m.elements = worldMatrix;
    m.multiply(this.postMatrix);
    this.el.object3D.matrix = m;
  }
});
/*
This is a hack.
If the user's browser has cached A-Frame,
then A-Frame will process the webpage *before* the system and components get registered.
Resulting in a blank page. This happens because module loading is deferred. 
*/
/* if(needsDOMRefresh){
  console.log("mindar-face-aframe::Refreshing DOM...")
  document.body.innerHTML=document.body.innerHTML;
} */
