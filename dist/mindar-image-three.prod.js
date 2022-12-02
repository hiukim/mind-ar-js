import { Vector3 as y, Quaternion as b, Matrix4 as x, Object3D as H, Scene as E, WebGLRenderer as _, sRGBEncoding as O, PerspectiveCamera as P, Group as A } from "three";
import { t as k, C as z } from "./controller.4d77898b.js";
import { U as L } from "./ui.f7b5eaac.js";
const D = new y(), N = new b(), R = new y();
class T extends H {
  constructor(o = document.createElement("div")) {
    super(), this.element = o, this.element.style.position = "absolute", this.element.style.pointerEvents = "auto", this.element.style.userSelect = "none", this.element.setAttribute("draggable", !1), this.addEventListener("removed", function() {
      this.traverse(function(n) {
        n.element instanceof Element && n.element.parentNode !== null && n.element.parentNode.removeChild(n.element);
      });
    });
  }
  copy(o, n) {
    return super.copy(o, n), this.element = o.element.cloneNode(!0), this;
  }
}
T.prototype.isCSS3DObject = !0;
class U extends T {
  constructor(o) {
    super(o), this.rotation2D = 0;
  }
  copy(o, n) {
    return super.copy(o, n), this.rotation2D = o.rotation2D, this;
  }
}
U.prototype.isCSS3DSprite = !0;
const m = new x(), F = new x();
class G {
  constructor(o = {}) {
    const n = this;
    let h, r, c, d;
    const l = {
      camera: { fov: 0, style: "" },
      objects: /* @__PURE__ */ new WeakMap()
    }, s = o.element !== void 0 ? o.element : document.createElement("div");
    s.style.overflow = "hidden", this.domElement = s;
    const a = document.createElement("div");
    a.style.transformStyle = "preserve-3d", a.style.pointerEvents = "none", s.appendChild(a), this.getSize = function() {
      return {
        width: h,
        height: r
      };
    }, this.render = function(i, e) {
      const u = e.projectionMatrix.elements[5] * d;
      l.camera.fov !== u && (s.style.perspective = e.isPerspectiveCamera ? u + "px" : "", l.camera.fov = u), i.autoUpdate === !0 && i.updateMatrixWorld(), e.parent === null && e.updateMatrixWorld();
      let C, p;
      e.isOrthographicCamera && (C = -(e.right + e.left) / 2, p = (e.top + e.bottom) / 2);
      const g = (e.isOrthographicCamera ? "scale(" + u + ")translate(" + t(C) + "px," + t(p) + "px)" + f(e.matrixWorldInverse) : "translateZ(" + u + "px)" + f(e.matrixWorldInverse)) + "translate(" + c + "px," + d + "px)";
      l.camera.style !== g && (a.style.transform = g, l.camera.style = g), S(i, i, e);
    }, this.setSize = function(i, e) {
      h = i, r = e, c = h / 2, d = r / 2, s.style.width = i + "px", s.style.height = e + "px", a.style.width = i + "px", a.style.height = e + "px";
    };
    function t(i) {
      return Math.abs(i) < 1e-10 ? 0 : i;
    }
    function f(i) {
      const e = i.elements;
      return "matrix3d(" + t(e[0]) + "," + t(-e[1]) + "," + t(e[2]) + "," + t(e[3]) + "," + t(e[4]) + "," + t(-e[5]) + "," + t(e[6]) + "," + t(e[7]) + "," + t(e[8]) + "," + t(-e[9]) + "," + t(e[10]) + "," + t(e[11]) + "," + t(e[12]) + "," + t(-e[13]) + "," + t(e[14]) + "," + t(e[15]) + ")";
    }
    function w(i) {
      const e = i.elements;
      return "translate(-50%,-50%)" + ("matrix3d(" + t(e[0]) + "," + t(e[1]) + "," + t(e[2]) + "," + t(e[3]) + "," + t(-e[4]) + "," + t(-e[5]) + "," + t(-e[6]) + "," + t(-e[7]) + "," + t(e[8]) + "," + t(e[9]) + "," + t(e[10]) + "," + t(e[11]) + "," + t(e[12]) + "," + t(e[13]) + "," + t(e[14]) + "," + t(e[15]) + ")");
    }
    function S(i, e, u, C) {
      if (i.isCSS3DObject) {
        i.onBeforeRender(n, e, u);
        let p;
        i.isCSS3DSprite ? (m.copy(u.matrixWorldInverse), m.transpose(), i.rotation2D !== 0 && m.multiply(F.makeRotationZ(i.rotation2D)), i.matrixWorld.decompose(D, N, R), m.setPosition(D), m.scale(R), m.elements[3] = 0, m.elements[7] = 0, m.elements[11] = 0, m.elements[15] = 1, p = w(m)) : p = w(i.matrixWorld);
        const v = i.element, g = l.objects.get(i);
        if (g === void 0 || g.style !== p) {
          v.style.transform = p;
          const I = { style: p };
          l.objects.set(i, I);
        }
        v.style.display = i.visible ? "" : "none", v.parentNode !== a && a.appendChild(v), i.onAfterRender(n, e, u);
      }
      for (let p = 0, v = i.children.length; p < v; p++)
        S(i.children[p], e, u);
    }
  }
}
const W = new x();
W.compose(new y(), new b(), new y(1e-3, 1e-3, 1e-3));
class B {
  constructor({
    container: o,
    imageTargetSrc: n,
    maxTrack: h,
    uiLoading: r = "yes",
    uiScanning: c = "yes",
    uiError: d = "yes",
    filterMinCF: l = null,
    filterBeta: s = null,
    warmupTolerance: a = null,
    missTolerance: t = null
  }) {
    this.container = o, this.imageTargetSrc = n, this.maxTrack = h, this.filterMinCF = l, this.filterBeta = s, this.warmupTolerance = a, this.missTolerance = t, this.ui = new L({ uiLoading: r, uiScanning: c, uiError: d }), this.scene = new E(), this.cssScene = new E(), this.renderer = new _({ antialias: !0, alpha: !0 }), this.cssRenderer = new G({ antialias: !0 }), this.renderer.outputEncoding = O, this.renderer.setPixelRatio(window.devicePixelRatio), this.camera = new P(), this.anchors = [], this.renderer.domElement.style.position = "absolute", this.cssRenderer.domElement.style.position = "absolute", this.container.appendChild(this.renderer.domElement), this.container.appendChild(this.cssRenderer.domElement), window.addEventListener("resize", this.resize.bind(this));
  }
  async start() {
    this.ui.showLoading(), await this._startVideo(), await this._startAR();
  }
  stop() {
    this.controller.stopProcessVideo(), this.video.srcObject.getTracks().forEach(function(n) {
      n.stop();
    }), this.video.remove();
  }
  addAnchor(o) {
    const n = new A();
    n.visible = !1, n.matrixAutoUpdate = !1;
    const h = { group: n, targetIndex: o, onTargetFound: null, onTargetLost: null, css: !1, visible: !1 };
    return this.anchors.push(h), this.scene.add(n), h;
  }
  addCSSAnchor(o) {
    const n = new A();
    n.visible = !1, n.matrixAutoUpdate = !1;
    const h = { group: n, targetIndex: o, onTargetFound: null, onTargetLost: null, css: !0, visible: !1 };
    return this.anchors.push(h), this.cssScene.add(n), h;
  }
  _startVideo() {
    return new Promise((o, n) => {
      if (this.video = document.createElement("video"), this.video.setAttribute("autoplay", ""), this.video.setAttribute("muted", ""), this.video.setAttribute("playsinline", ""), this.video.style.position = "absolute", this.video.style.top = "0px", this.video.style.left = "0px", this.video.style.zIndex = "-2", this.container.appendChild(this.video), !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        this.ui.showCompatibility(), n();
        return;
      }
      navigator.mediaDevices.getUserMedia({
        audio: !1,
        video: {
          facingMode: "environment"
        }
      }).then((h) => {
        this.video.addEventListener("loadedmetadata", () => {
          this.video.setAttribute("width", this.video.videoWidth), this.video.setAttribute("height", this.video.videoHeight), o();
        }), this.video.srcObject = h;
      }).catch((h) => {
        console.log("getUserMedia error", h), n();
      });
    });
  }
  _startAR() {
    return new Promise(async (o, n) => {
      const h = this.video;
      this.container, this.controller = new z({
        inputWidth: h.videoWidth,
        inputHeight: h.videoHeight,
        filterMinCF: this.filterMinCF,
        filterBeta: this.filterBeta,
        warmupTolerance: this.warmupTolerance,
        missTolerance: this.missTolerance,
        maxTrack: this.maxTrack,
        onUpdate: (c) => {
          if (c.type === "updateMatrix") {
            const { targetIndex: d, worldMatrix: l } = c;
            for (let s = 0; s < this.anchors.length; s++)
              if (this.anchors[s].targetIndex === d) {
                if (this.anchors[s].css ? this.anchors[s].group.children.forEach((a) => {
                  a.element.style.visibility = l === null ? "hidden" : "visible";
                }) : this.anchors[s].group.visible = l !== null, l !== null) {
                  let a = new x();
                  a.elements = [...l], a.multiply(this.postMatrixs[d]), this.anchors[s].css && a.multiply(W), this.anchors[s].group.matrix = a;
                }
                this.anchors[s].visible && l === null && (this.anchors[s].visible = !1, this.anchors[s].onTargetLost && this.anchors[s].onTargetLost()), !this.anchors[s].visible && l !== null && (this.anchors[s].visible = !0, this.anchors[s].onTargetFound && this.anchors[s].onTargetFound()), l !== null && this.ui.hideScanning();
              }
          }
        }
      }), this.resize();
      const { dimensions: r } = await this.controller.addImageTargets(this.imageTargetSrc);
      this.postMatrixs = [];
      for (let c = 0; c < r.length; c++) {
        const d = new y(), l = new b(), s = new y(), [a, t] = r[c];
        d.x = a / 2, d.y = a / 2 + (t - a) / 2, s.x = a, s.y = a, s.z = a;
        const f = new x();
        f.compose(d, l, s), this.postMatrixs.push(f);
      }
      await this.controller.dummyRun(this.video), this.ui.hideLoading(), this.ui.showScanning(), this.controller.processVideo(this.video), o();
    });
  }
  resize() {
    const { renderer: o, cssRenderer: n, camera: h, container: r, video: c } = this;
    if (!c)
      return;
    let d, l;
    const s = c.videoWidth / c.videoHeight, a = r.clientWidth / r.clientHeight;
    s > a ? (l = r.clientHeight, d = l * s) : (d = r.clientWidth, l = d / s);
    const t = this.controller.getProjectionMatrix(), f = 2 * Math.atan(1 / t[5] / l * r.clientHeight) * 180 / Math.PI, w = t[14] / (t[10] - 1), S = t[14] / (t[10] + 1);
    t[5] / t[0], h.fov = f, h.near = w, h.far = S, h.aspect = r.clientWidth / r.clientHeight, h.updateProjectionMatrix(), c.style.top = -(l - r.clientHeight) / 2 + "px", c.style.left = -(d - r.clientWidth) / 2 + "px", c.style.width = d + "px", c.style.height = l + "px";
    const i = o.domElement, e = n.domElement;
    i.style.position = "absolute", i.style.left = 0, i.style.top = 0, i.style.width = r.clientWidth + "px", i.style.height = r.clientHeight + "px", e.style.position = "absolute", e.style.left = 0, e.style.top = 0, e.style.width = r.clientWidth + "px", e.style.height = r.clientHeight + "px", o.setSize(r.clientWidth, r.clientHeight), n.setSize(r.clientWidth, r.clientHeight);
  }
}
window.MINDAR || (window.MINDAR = {});
window.MINDAR.IMAGE || (window.MINDAR.IMAGE = {});
window.MINDAR.IMAGE.MindARThree = B;
window.MINDAR.IMAGE.tf = k;
export {
  B as MindARThree
};
