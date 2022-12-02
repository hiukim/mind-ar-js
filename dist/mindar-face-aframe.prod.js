const { Controller: h, UI: c } = window.MINDAR.FACE, n = AFRAME.THREE;
AFRAME.registerSystem("mindar-face-system", {
  container: null,
  video: null,
  shouldFaceUser: !0,
  lastHasFace: !1,
  init: function() {
    this.anchorEntities = [], this.faceMeshEntities = [];
  },
  setup: function({ uiLoading: t, uiScanning: e, uiError: i, filterMinCF: s, filterBeta: a }) {
    this.ui = new c({ uiLoading: t, uiScanning: e, uiError: i }), this.filterMinCF = s, this.filterBeta = a;
  },
  registerFaceMesh: function(t) {
    this.faceMeshEntities.push({ el: t });
  },
  registerAnchor: function(t, e) {
    this.anchorEntities.push({ el: t, anchorIndex: e });
  },
  start: function() {
    this.ui.showLoading(), this.container = this.el.sceneEl.parentNode, this._startVideo();
  },
  stop: function() {
    this.pause(), this.video.srcObject.getTracks().forEach(function(e) {
      e.stop();
    }), this.video.remove();
  },
  switchCamera: function() {
    this.shouldFaceUser = !this.shouldFaceUser, this.stop(), this.start();
  },
  pause: function(t = !1) {
    t || this.video.pause(), this.controller.stopProcessVideo();
  },
  unpause: function() {
    this.video.play(), this.controller.processVideo(this.video);
  },
  __startVideo: function() {
    this.video = document.createElement("img"), this.video.onload = async () => {
      this.video.videoWidth = this.video.width, this.video.videoHeight = this.video.height, await this._setupAR(), this._processVideo(), this.ui.hideLoading();
    }, this.video.style.position = "absolute", this.video.style.top = "0px", this.video.style.left = "0px", this.video.style.zIndex = "-2", this.video.src = "./assets/face1.jpeg", this.container.appendChild(this.video);
  },
  _startVideo: function() {
    if (this.video = document.createElement("video"), this.video.setAttribute("autoplay", ""), this.video.setAttribute("muted", ""), this.video.setAttribute("playsinline", ""), this.video.style.position = "absolute", this.video.style.top = "0px", this.video.style.left = "0px", this.video.style.zIndex = "-2", this.container.appendChild(this.video), !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      this.el.emit("arError", { error: "VIDEO_FAIL" }), this.ui.showCompatibility();
      return;
    }
    navigator.mediaDevices.getUserMedia({ audio: !1, video: {
      facingMode: this.shouldFaceUser ? "face" : "environment"
    } }).then((t) => {
      this.video.addEventListener("loadedmetadata", async () => {
        this.video.setAttribute("width", this.video.videoWidth), this.video.setAttribute("height", this.video.videoHeight), await this._setupAR(), this._processVideo(), this.ui.hideLoading();
      }), this.video.srcObject = t;
    }).catch((t) => {
      console.log("getUserMedia error", t), this.el.emit("arError", { error: "VIDEO_FAIL" });
    });
  },
  _processVideo: function() {
    this.controller.onUpdate = ({ hasFace: t, estimateResult: e }) => {
      if (t && !this.lastHasFace && this.el.emit("targetFound"), !t && this.lastHasFace && this.el.emit("targetLost"), this.lastHasFace = t, t) {
        const { faceMatrix: i } = e;
        for (let s = 0; s < this.anchorEntities.length; s++) {
          const a = this.controller.getLandmarkMatrix(this.anchorEntities[s].anchorIndex);
          this.anchorEntities[s].el.updateVisibility(!0), this.anchorEntities[s].el.updateMatrix(a);
        }
        for (let s = 0; s < this.faceMeshEntities.length; s++)
          this.faceMeshEntities[s].el.updateVisibility(!0), this.faceMeshEntities[s].el.updateMatrix(i);
      } else {
        for (let i = 0; i < this.anchorEntities.length; i++)
          this.anchorEntities[i].el.updateVisibility(!1);
        for (let i = 0; i < this.faceMeshEntities.length; i++)
          this.faceMeshEntities[i].el.updateVisibility(!1);
      }
    }, this.controller.processVideo(this.video);
  },
  _setupAR: async function() {
    this.controller = new h({
      filterMinCF: this.filterMinCF,
      filterBeta: this.filterBeta
    }), this._resize(), await this.controller.setup(this.video), await this.controller.dummyRun(this.video);
    const { fov: t, aspect: e, near: i, far: s } = this.controller.getCameraParams(), a = new n.PerspectiveCamera();
    a.fov = t, a.aspect = e, a.near = i, a.far = s, a.updateProjectionMatrix();
    const r = this.container.getElementsByTagName("a-camera")[0];
    r.setObject3D("camera", a), r.setAttribute("camera", "active", !0);
    for (let o = 0; o < this.faceMeshEntities.length; o++)
      this.faceMeshEntities[o].el.addFaceMesh(this.controller.createThreeFaceGeometry(n));
    this._resize(), window.addEventListener("resize", this._resize.bind(this)), this.el.emit("arReady");
  },
  _resize: function() {
    const t = this.video, e = this.container;
    let i, s;
    const a = t.videoWidth / t.videoHeight, r = e.clientWidth / e.clientHeight;
    a > r ? (s = e.clientHeight, i = s * a) : (i = e.clientWidth, s = i / a), this.video.style.top = -(s - e.clientHeight) / 2 + "px", this.video.style.left = -(i - e.clientWidth) / 2 + "px", this.video.style.width = i + "px", this.video.style.height = s + "px";
    const o = e.getElementsByTagName("a-scene")[0];
    o.style.top = this.video.style.top, o.style.left = this.video.style.left, o.style.width = this.video.style.width, o.style.height = this.video.style.height;
  }
});
AFRAME.registerComponent("mindar-face", {
  dependencies: ["mindar-face-system"],
  schema: {
    autoStart: { type: "boolean", default: !0 },
    faceOccluder: { type: "boolean", default: !0 },
    uiLoading: { type: "string", default: "yes" },
    uiScanning: { type: "string", default: "yes" },
    uiError: { type: "string", default: "yes" },
    filterMinCF: { type: "number", default: -1 },
    filterBeta: { type: "number", default: -1 }
  },
  init: function() {
    const t = this.el.sceneEl.systems["mindar-face-system"];
    if (this.data.faceOccluder) {
      const e = document.createElement("a-entity");
      e.setAttribute("mindar-face-default-face-occluder", !0), this.el.sceneEl.appendChild(e);
    }
    t.setup({
      uiLoading: this.data.uiLoading,
      uiScanning: this.data.uiScanning,
      uiError: this.data.uiError,
      filterMinCF: this.data.filterMinCF === -1 ? null : this.data.filterMinCF,
      filterBeta: this.data.filterBeta === -1 ? null : this.data.filterBeta
    }), this.data.autoStart && this.el.sceneEl.addEventListener("renderstart", () => {
      t.start();
    });
  }
});
AFRAME.registerComponent("mindar-face-target", {
  dependencies: ["mindar-face-system"],
  schema: {
    anchorIndex: { type: "number" }
  },
  init: function() {
    this.el.sceneEl.systems["mindar-face-system"].registerAnchor(this, this.data.anchorIndex);
    const e = this.el.object3D;
    e.visible = !1, e.matrixAutoUpdate = !1;
  },
  updateVisibility(t) {
    this.el.object3D.visible = t;
  },
  updateMatrix(t) {
    this.el.object3D.matrix.set(...t);
  }
});
AFRAME.registerComponent("mindar-face-occluder", {
  init: function() {
    this.el.object3D, this.el.addEventListener("model-loaded", () => {
      this.el.getObject3D("mesh").traverse((t) => {
        if (t.isMesh) {
          const e = new n.MeshStandardMaterial({
            colorWrite: !1
          });
          t.material = e;
        }
      });
    });
  }
});
AFRAME.registerComponent("mindar-face-default-face-occluder", {
  init: function() {
    this.el.sceneEl.systems["mindar-face-system"].registerFaceMesh(this);
    const e = this.el.object3D;
    e.matrixAutoUpdate = !1;
  },
  updateVisibility(t) {
    this.el.object3D.visible = t;
  },
  updateMatrix(t) {
    this.el.object3D.matrix.set(...t);
  },
  addFaceMesh(t) {
    const e = new n.MeshBasicMaterial({ colorWrite: !1 }), i = new n.Mesh(t, e);
    this.el.setObject3D("mesh", i);
  }
});
