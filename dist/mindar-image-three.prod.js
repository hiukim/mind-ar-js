import { Matrix4 as m, Vector3 as p, Quaternion as w, Scene as v, WebGLRenderer as M, sRGBEncoding as b, PerspectiveCamera as T, Group as g } from "three";
import { t as A, C as R } from "./controller.354c9e2d.js";
import { C as E } from "./CSS3DRenderer.fa516df2.js";
import { u as I } from "./ui.65f3a8cb.js";
const f = new m();
f.compose(new p(), new w(), new p(1e-3, 1e-3, 1e-3));
class C {
  constructor({
    container: h,
    imageTargetSrc: i,
    maxTrack: s,
    uiLoading: t = "yes",
    uiScanning: r = "yes",
    uiError: a = "yes",
    filterMinCF: n = null,
    filterBeta: e = null,
    warmupTolerance: o = null,
    missTolerance: l = null
  }) {
    this.container = h, this.imageTargetSrc = i, this.maxTrack = s, this.filterMinCF = n, this.filterBeta = e, this.warmupTolerance = o, this.missTolerance = l, this.ui = new I.UI({ uiLoading: t, uiScanning: r, uiError: a }), this.scene = new v(), this.cssScene = new v(), this.renderer = new M({ antialias: !0, alpha: !0 }), this.cssRenderer = new E({ antialias: !0 }), this.renderer.outputEncoding = b, this.renderer.setPixelRatio(window.devicePixelRatio), this.camera = new T(), this.anchors = [], this.renderer.domElement.style.position = "absolute", this.cssRenderer.domElement.style.position = "absolute", this.container.appendChild(this.renderer.domElement), this.container.appendChild(this.cssRenderer.domElement), window.addEventListener("resize", this.resize.bind(this));
  }
  async start() {
    this.ui.showLoading(), await this._startVideo(), await this._startAR();
  }
  stop() {
    this.controller.stopProcessVideo(), this.video.srcObject.getTracks().forEach(function(i) {
      i.stop();
    }), this.video.remove();
  }
  addAnchor(h) {
    const i = new g();
    i.visible = !1, i.matrixAutoUpdate = !1;
    const s = { group: i, targetIndex: h, onTargetFound: null, onTargetLost: null, css: !1, visible: !1 };
    return this.anchors.push(s), this.scene.add(i), s;
  }
  addCSSAnchor(h) {
    const i = new g();
    i.visible = !1, i.matrixAutoUpdate = !1;
    const s = { group: i, targetIndex: h, onTargetFound: null, onTargetLost: null, css: !0, visible: !1 };
    return this.anchors.push(s), this.cssScene.add(i), s;
  }
  _startVideo() {
    return new Promise((h, i) => {
      if (this.video = document.createElement("video"), this.video.setAttribute("autoplay", ""), this.video.setAttribute("muted", ""), this.video.setAttribute("playsinline", ""), this.video.style.position = "absolute", this.video.style.top = "0px", this.video.style.left = "0px", this.video.style.zIndex = "-2", this.container.appendChild(this.video), !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        this.ui.showCompatibility(), i();
        return;
      }
      navigator.mediaDevices.getUserMedia({
        audio: !1,
        video: {
          facingMode: "environment"
        }
      }).then((s) => {
        this.video.addEventListener("loadedmetadata", () => {
          this.video.setAttribute("width", this.video.videoWidth), this.video.setAttribute("height", this.video.videoHeight), h();
        }), this.video.srcObject = s;
      }).catch((s) => {
        console.log("getUserMedia error", s), i();
      });
    });
  }
  _startAR() {
    return new Promise(async (h, i) => {
      const s = this.video;
      this.container, this.controller = new R({
        inputWidth: s.videoWidth,
        inputHeight: s.videoHeight,
        filterMinCF: this.filterMinCF,
        filterBeta: this.filterBeta,
        warmupTolerance: this.warmupTolerance,
        missTolerance: this.missTolerance,
        maxTrack: this.maxTrack,
        onUpdate: (r) => {
          if (r.type === "updateMatrix") {
            const { targetIndex: a, worldMatrix: n } = r;
            for (let e = 0; e < this.anchors.length; e++)
              if (this.anchors[e].targetIndex === a) {
                if (this.anchors[e].css ? this.anchors[e].group.children.forEach((o) => {
                  o.element.style.visibility = n === null ? "hidden" : "visible";
                }) : this.anchors[e].group.visible = n !== null, n !== null) {
                  let o = new m();
                  o.elements = [...n], o.multiply(this.postMatrixs[a]), this.anchors[e].css && o.multiply(f), this.anchors[e].group.matrix = o;
                }
                this.anchors[e].visible && n === null && (this.anchors[e].visible = !1, this.anchors[e].onTargetLost && this.anchors[e].onTargetLost()), !this.anchors[e].visible && n !== null && (this.anchors[e].visible = !0, this.anchors[e].onTargetFound && this.anchors[e].onTargetFound()), n !== null && this.ui.hideScanning();
              }
          }
        }
      }), this.resize();
      const { dimensions: t } = await this.controller.addImageTargets(this.imageTargetSrc);
      this.postMatrixs = [];
      for (let r = 0; r < t.length; r++) {
        const a = new p(), n = new w(), e = new p(), [o, l] = t[r];
        a.x = o / 2, a.y = o / 2 + (l - o) / 2, e.x = o, e.y = o, e.z = o;
        const u = new m();
        u.compose(a, n, e), this.postMatrixs.push(u);
      }
      await this.controller.dummyRun(this.video), this.ui.hideLoading(), this.ui.showScanning(), this.controller.processVideo(this.video), h();
    });
  }
  resize() {
    const { renderer: h, cssRenderer: i, camera: s, container: t, video: r } = this;
    if (!r)
      return;
    let a, n;
    const e = r.videoWidth / r.videoHeight, o = t.clientWidth / t.clientHeight;
    e > o ? (n = t.clientHeight, a = n * e) : (a = t.clientWidth, n = a / e);
    const l = this.controller.getProjectionMatrix(), u = 2 * Math.atan(1 / l[5] / n * t.clientHeight) * 180 / Math.PI, y = l[14] / (l[10] - 1), x = l[14] / (l[10] + 1);
    l[5] / l[0], s.fov = u, s.near = y, s.far = x, s.aspect = t.clientWidth / t.clientHeight, s.updateProjectionMatrix(), r.style.top = -(n - t.clientHeight) / 2 + "px", r.style.left = -(a - t.clientWidth) / 2 + "px", r.style.width = a + "px", r.style.height = n + "px";
    const c = h.domElement, d = i.domElement;
    c.style.position = "absolute", c.style.left = 0, c.style.top = 0, c.style.width = t.clientWidth + "px", c.style.height = t.clientHeight + "px", d.style.position = "absolute", d.style.left = 0, d.style.top = 0, d.style.width = t.clientWidth + "px", d.style.height = t.clientHeight + "px", h.setSize(t.clientWidth, t.clientHeight), i.setSize(t.clientWidth, t.clientHeight);
  }
}
window.MINDAR || (window.MINDAR = {});
window.MINDAR.IMAGE || (window.MINDAR.IMAGE = {});
window.MINDAR.IMAGE.MindARThree = C;
window.MINDAR.IMAGE.tf = A;
export {
  C as MindARThree
};
