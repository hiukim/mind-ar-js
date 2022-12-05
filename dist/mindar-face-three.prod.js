import { Scene as f, WebGLRenderer as w, sRGBEncoding as y, PerspectiveCamera as g, Mesh as M, MeshStandardMaterial as x, Group as p } from "three";
import { C as A } from "./CSS3DRenderer.8e2af789.js";
import { C as R } from "./controller.4ddb6dbe.js";
import { U as S } from "./ui.f7b5eaac.js";
class b {
  constructor({ container: o, uiLoading: e = "yes", uiScanning: i = "yes", uiError: n = "yes", filterMinCF: t = null, filterBeta: h = null }) {
    this.container = o, this.ui = new S({ uiLoading: e, uiScanning: i, uiError: n }), this.controller = new R({
      filterMinCF: t,
      filterBeta: h
    }), this.scene = new f(), this.cssScene = new f(), this.renderer = new w({ antialias: !0, alpha: !0 }), this.cssRenderer = new A({ antialias: !0 }), this.renderer.outputEncoding = y, this.renderer.setPixelRatio(window.devicePixelRatio), this.camera = new g(), this.anchors = [], this.faceMeshes = [], this.container.appendChild(this.renderer.domElement), this.container.appendChild(this.cssRenderer.domElement), this.shouldFaceUser = !0, window.addEventListener("resize", this._resize.bind(this));
  }
  async start() {
    this.ui.showLoading(), await this._startVideo(), await this._startAR(), this.ui.hideLoading();
  }
  stop() {
    this.video.srcObject.getTracks().forEach(function(e) {
      e.stop();
    }), this.video.remove(), this.controller.stopProcessVideo();
  }
  switchCamera() {
    this.shouldFaceUser = !this.shouldFaceUser, this.stop(), this.start();
  }
  addFaceMesh() {
    const o = this.controller.createThreeFaceGeometry(THREE), e = new M(o, new x({ color: 16777215 }));
    return e.visible = !1, e.matrixAutoUpdate = !1, this.faceMeshes.push(e), e;
  }
  addAnchor(o) {
    const e = new p();
    e.matrixAutoUpdate = !1;
    const i = { group: e, landmarkIndex: o, css: !1 };
    return this.anchors.push(i), this.scene.add(e), i;
  }
  addCSSAnchor(o) {
    const e = new p();
    e.matrixAutoUpdate = !1;
    const i = { group: e, landmarkIndex: o, css: !0 };
    return this.anchors.push(i), this.cssScene.add(e), i;
  }
  _startVideo() {
    return new Promise((o, e) => {
      if (this.video = document.createElement("video"), this.video.setAttribute("autoplay", ""), this.video.setAttribute("muted", ""), this.video.setAttribute("playsinline", ""), this.video.style.position = "absolute", this.video.style.top = "0px", this.video.style.left = "0px", this.video.style.zIndex = "-2", this.container.appendChild(this.video), !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        this.ui.showCompatibility(), e();
        return;
      }
      navigator.mediaDevices.getUserMedia({
        audio: !1,
        video: {
          facingMode: this.shouldFaceUser ? "face" : "environment"
        }
      }).then((i) => {
        this.video.addEventListener("loadedmetadata", () => {
          this.video.setAttribute("width", this.video.videoWidth), this.video.setAttribute("height", this.video.videoHeight), o();
        }), this.video.srcObject = i;
      }).catch((i) => {
        console.log("getUserMedia error", i), e();
      });
    });
  }
  _startAR() {
    return new Promise(async (o, e) => {
      const i = this.video;
      this.container, this.controller.onUpdate = ({ hasFace: l, estimateResult: m }) => {
        for (let r = 0; r < this.anchors.length; r++)
          this.anchors[r].css ? this.anchors[r].group.children.forEach((a) => {
            a.element.style.visibility = l ? "visible" : "hidden";
          }) : this.anchors[r].group.visible = l;
        for (let r = 0; r < this.faceMeshes.length; r++)
          this.faceMeshes[r].visible = l;
        if (l) {
          const { metricLandmarks: r, faceMatrix: a, faceScale: E } = m;
          for (let c = 0; c < this.anchors.length; c++) {
            const v = this.anchors[c].landmarkIndex, s = this.controller.getLandmarkMatrix(v);
            if (this.anchors[c].css) {
              const u = [
                1e-3 * s[0],
                1e-3 * s[1],
                s[2],
                s[3],
                1e-3 * s[4],
                1e-3 * s[5],
                s[6],
                s[7],
                1e-3 * s[8],
                1e-3 * s[9],
                s[10],
                s[11],
                1e-3 * s[12],
                1e-3 * s[13],
                s[14],
                s[15]
              ];
              this.anchors[c].group.matrix.set(...u);
            } else
              this.anchors[c].group.matrix.set(...s);
          }
          for (let c = 0; c < this.faceMeshes.length; c++)
            this.faceMeshes[c].matrix.set(...a);
        }
      }, this._resize(), await this.controller.setup(i);
      const { fov: n, aspect: t, near: h, far: d } = this.controller.getCameraParams();
      this.camera.fov = n, this.camera.aspect = t, this.camera.near = h, this.camera.far = d, this.camera.updateProjectionMatrix(), this.renderer.setSize(this.video.videoWidth, this.video.videoHeight), this.cssRenderer.setSize(this.video.videoWidth, this.video.videoHeight), await this.controller.dummyRun(i), this._resize(), this.controller.processVideo(i), o();
    });
  }
  _resize() {
    const { renderer: o, cssRenderer: e, camera: i, container: n, video: t } = this;
    if (!t)
      return;
    let h, d;
    const l = t.videoWidth / t.videoHeight, m = n.clientWidth / n.clientHeight;
    l > m ? (d = n.clientHeight, h = d * l) : (h = n.clientWidth, d = h / l), t.style.top = -(d - n.clientHeight) / 2 + "px", t.style.left = -(h - n.clientWidth) / 2 + "px", t.style.width = h + "px", t.style.height = d + "px";
    const r = o.domElement, a = e.domElement;
    r.style.position = "absolute", r.style.top = t.style.top, r.style.left = t.style.left, r.style.width = t.style.width, r.style.height = t.style.height, a.style.position = "absolute", a.style.top = t.style.top, a.style.left = t.style.left, a.style.transformOrigin = "top left", a.style.transform = "scale(" + h / parseFloat(a.style.width) + "," + d / parseFloat(a.style.height) + ")";
  }
}
window.MINDAR || (window.MINDAR = {});
window.MINDAR.FACE || (window.MINDAR.FACE = {});
window.MINDAR.FACE.MindARThree = b;
export {
  b as MindARThree
};
