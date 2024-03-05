import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  SRGBColorSpace,
  Mesh,
  MeshStandardMaterial,
  Group,
} from "three";
//import { CSS3DRenderer } from '../libs/CSS3DRenderer.js';
import {CSS3DRenderer} from 'three/addons/renderers/CSS3DRenderer.js'
import { Controller } from "./controller.js";
import { UI } from "../ui/ui.js";
import {BufferGeometry,BufferAttribute} from "three";
const THREE={BufferGeometry,BufferAttribute};

export class MindARThree {
  constructor({container, uiLoading="yes", uiScanning="yes", uiError="yes", filterMinCF=null, filterBeta=null,
    userDeviceId = null, environmentDeviceId = null, disableFaceMirror = false,
  }) {
    this.container = container;
    this.ui = new UI({ uiLoading, uiScanning, uiError });

    this.controller = new Controller({
      filterMinCF: filterMinCF,
      filterBeta: filterBeta,
    });
    this.disableFaceMirror = disableFaceMirror;
    this.scene = new Scene();
    this.cssScene = new Scene();
    this.renderer = new WebGLRenderer({ antialias: true, alpha: true });
    this.cssRenderer = new CSS3DRenderer({ antialias: true });
    this.renderer.outputColorSpace = SRGBColorSpace;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.camera = new PerspectiveCamera();
    this.userDeviceId = userDeviceId;
    this.environmentDeviceId = environmentDeviceId;

    this.anchors = [];
    this.faceMeshes = [];

    this.latestEstimate = null;

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
    tracks.forEach(function (track) {
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
    const faceGeometry = this.controller.createThreeFaceGeometry(THREE);
    const faceMesh = new Mesh(faceGeometry, new MeshStandardMaterial({ color: 0xffffff }));
    faceMesh.visible = false;
    faceMesh.matrixAutoUpdate = false;
    this.faceMeshes.push(faceMesh);
    return faceMesh;
  }

  addAnchor(landmarkIndex) {
    const group = new Group();
    group.matrixAutoUpdate = false;
    const anchor = { group, landmarkIndex, css: false };
    this.anchors.push(anchor);
    this.scene.add(group);
    return anchor;
  }

  addCSSAnchor(landmarkIndex) {
    const group = new Group();
    group.matrixAutoUpdate = false;
    const anchor = { group, landmarkIndex, css: true };
    this.anchors.push(anchor);
    this.cssScene.add(group);
    return anchor;
  }

  getLatestEstimate() {
    return this.latestEstimate;
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

      const constraints = {
        audio: false,
        video: {}
      };
      if (this.shouldFaceUser) {
        if (this.userDeviceId) {
          constraints.video.deviceId = { exact: this.userDeviceId };
        } else {
          constraints.video.facingMode = 'user';
        }
      } else {
        if (this.environmentDeviceId) {
          constraints.video.deviceId = { exact: this.environmentDeviceId };
        } else {
          constraints.video.facingMode = 'environment';
        }
      }

      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        this.video.addEventListener('loadedmetadata', () => {
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

      this.controller.onUpdate = ({ hasFace, estimateResult }) => {
        for (let i = 0; i < this.anchors.length; i++) {
          if (this.anchors[i].css) {
            this.anchors[i].group.children.forEach((obj) => {
              obj.element.style.visibility = hasFace ? "visible" : "hidden";
            });
          } else {
            this.anchors[i].group.visible = hasFace;
          }
        }
        for (let i = 0; i < this.faceMeshes.length; i++) {
          this.faceMeshes[i].visible = hasFace;
        }

        if (hasFace) {
          const { metricLandmarks, faceMatrix, faceScale, blendshapes} = estimateResult;
          this.latestEstimate = estimateResult;

          for (let i = 0; i < this.anchors.length; i++) {
            const landmarkIndex = this.anchors[i].landmarkIndex;
            const landmarkMatrix = this.controller.getLandmarkMatrix(landmarkIndex);

            if (this.anchors[i].css) {
              const cssScale = 0.001;

              const scaledElements = [
                cssScale * landmarkMatrix[0], cssScale * landmarkMatrix[1], landmarkMatrix[2], landmarkMatrix[3],
                cssScale * landmarkMatrix[4], cssScale * landmarkMatrix[5], landmarkMatrix[6], landmarkMatrix[7],
                cssScale * landmarkMatrix[8], cssScale * landmarkMatrix[9], landmarkMatrix[10], landmarkMatrix[11],
                cssScale * landmarkMatrix[12], cssScale * landmarkMatrix[13], landmarkMatrix[14], landmarkMatrix[15]
              ]
              this.anchors[i].group.matrix.set(...scaledElements);
            } else {
              this.anchors[i].group.matrix.set(...landmarkMatrix);
            }
          }
          for (let i = 0; i < this.faceMeshes.length; i++) {
            this.faceMeshes[i].matrix.set(...faceMatrix);
          }
        } else {
          this.latestEstimate = null;
        }
      }
      this._resize();

      const flipFace = this.shouldFaceUser && !this.disableFaceMirror;

      await this.controller.setup(flipFace);
      await this.controller.dummyRun(video);

      this._resize();
      this.controller.processVideo(video);
      resolve();
    });
  }

  _resize() {
    const { renderer, cssRenderer, camera, container, video } = this;
    if (!video) return;

    if (true) { // only needed if video dimension updated (e.g. when mobile orientation changes)
      this.video.setAttribute('width', this.video.videoWidth);
      this.video.setAttribute('height', this.video.videoHeight);
      this.controller.onInputResized(video);

      const { fov, aspect, near, far } = this.controller.getCameraParams();
      this.camera.fov = fov;
      this.camera.aspect = aspect;
      this.camera.near = near;
      this.camera.far = far;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(this.video.videoWidth, this.video.videoHeight);
      this.cssRenderer.setSize(this.video.videoWidth, this.video.videoHeight);
    }

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

    if (this.shouldFaceUser && !this.disableFaceMirror) {
      video.style.transform = 'scaleX(-1)';
    } else {
      video.style.transform = 'scaleX(1)';
    }

    const canvas = renderer.domElement;
    const cssCanvas = cssRenderer.domElement;

    canvas.style.position = 'absolute';
    canvas.style.top = video.style.top;
    canvas.style.left = video.style.left;
    canvas.style.width = video.style.width;
    canvas.style.height = video.style.height;

    cssCanvas.style.position = 'absolute';
    cssCanvas.style.top = video.style.top;
    cssCanvas.style.left = video.style.left;
    // cannot set style width for cssCanvas, because that is also used as renderer size
    //cssCanvas.style.width = video.style.width;
    //cssCanvas.style.height = video.style.height;
    cssCanvas.style.transformOrigin = "top left";
    cssCanvas.style.transform = 'scale(' + (vw / parseFloat(cssCanvas.style.width)) + ',' + (vh / parseFloat(cssCanvas.style.height)) + ')';
  }
}

if (!window.MINDAR) {
  window.MINDAR = {};
}
if (!window.MINDAR.FACE) {
  window.MINDAR.FACE = {};
}

window.MINDAR.FACE.MindARThree = MindARThree;
//window.MINDAR.FACE.THREE = THREE;
