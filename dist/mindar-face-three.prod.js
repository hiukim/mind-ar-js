import { Vector3 as A, Quaternion as W, Matrix4 as D, Object3D as U, Scene as M, WebGLRenderer as I, sRGBEncoding as O, PerspectiveCamera as k, Mesh as z, MeshStandardMaterial as H, Group as C } from "three";
import { C as P } from "./controller.f401b103.js";
import { U as F } from "./ui.f7b5eaac.js";
const E = new A(), N = new W(), R = new A();
class b extends U {
  constructor(n = document.createElement("div")) {
    super(), this.element = n, this.element.style.position = "absolute", this.element.style.pointerEvents = "auto", this.element.style.userSelect = "none", this.element.setAttribute("draggable", !1), this.addEventListener("removed", function() {
      this.traverse(function(s) {
        s.element instanceof Element && s.element.parentNode !== null && s.element.parentNode.removeChild(s.element);
      });
    });
  }
  copy(n, s) {
    return super.copy(n, s), this.element = n.element.cloneNode(!0), this;
  }
}
b.prototype.isCSS3DObject = !0;
class L extends b {
  constructor(n) {
    super(n), this.rotation2D = 0;
  }
  copy(n, s) {
    return super.copy(n, s), this.rotation2D = n.rotation2D, this;
  }
}
L.prototype.isCSS3DSprite = !0;
const v = new D(), G = new D();
class T {
  constructor(n = {}) {
    const s = this;
    let r, h, o, c;
    const a = {
      camera: { fov: 0, style: "" },
      objects: /* @__PURE__ */ new WeakMap()
    }, l = n.element !== void 0 ? n.element : document.createElement("div");
    l.style.overflow = "hidden", this.domElement = l;
    const m = document.createElement("div");
    m.style.transformStyle = "preserve-3d", m.style.pointerEvents = "none", l.appendChild(m), this.getSize = function() {
      return {
        width: r,
        height: h
      };
    }, this.render = function(i, e) {
      const f = e.projectionMatrix.elements[5] * c;
      a.camera.fov !== f && (l.style.perspective = e.isPerspectiveCamera ? f + "px" : "", a.camera.fov = f), i.autoUpdate === !0 && i.updateMatrixWorld(), e.parent === null && e.updateMatrixWorld();
      let g, u;
      e.isOrthographicCamera && (g = -(e.right + e.left) / 2, u = (e.top + e.bottom) / 2);
      const x = (e.isOrthographicCamera ? "scale(" + f + ")translate(" + t(g) + "px," + t(u) + "px)" + d(e.matrixWorldInverse) : "translateZ(" + f + "px)" + d(e.matrixWorldInverse)) + "translate(" + o + "px," + c + "px)";
      a.camera.style !== x && (m.style.transform = x, a.camera.style = x), p(i, i, e);
    }, this.setSize = function(i, e) {
      r = i, h = e, o = r / 2, c = h / 2, l.style.width = i + "px", l.style.height = e + "px", m.style.width = i + "px", m.style.height = e + "px";
    };
    function t(i) {
      return Math.abs(i) < 1e-10 ? 0 : i;
    }
    function d(i) {
      const e = i.elements;
      return "matrix3d(" + t(e[0]) + "," + t(-e[1]) + "," + t(e[2]) + "," + t(e[3]) + "," + t(e[4]) + "," + t(-e[5]) + "," + t(e[6]) + "," + t(e[7]) + "," + t(e[8]) + "," + t(-e[9]) + "," + t(e[10]) + "," + t(e[11]) + "," + t(e[12]) + "," + t(-e[13]) + "," + t(e[14]) + "," + t(e[15]) + ")";
    }
    function S(i) {
      const e = i.elements;
      return "translate(-50%,-50%)" + ("matrix3d(" + t(e[0]) + "," + t(e[1]) + "," + t(e[2]) + "," + t(e[3]) + "," + t(-e[4]) + "," + t(-e[5]) + "," + t(-e[6]) + "," + t(-e[7]) + "," + t(e[8]) + "," + t(e[9]) + "," + t(e[10]) + "," + t(e[11]) + "," + t(e[12]) + "," + t(e[13]) + "," + t(e[14]) + "," + t(e[15]) + ")");
    }
    function p(i, e, f, g) {
      if (i.isCSS3DObject) {
        i.onBeforeRender(s, e, f);
        let u;
        i.isCSS3DSprite ? (v.copy(f.matrixWorldInverse), v.transpose(), i.rotation2D !== 0 && v.multiply(G.makeRotationZ(i.rotation2D)), i.matrixWorld.decompose(E, N, R), v.setPosition(E), v.scale(R), v.elements[3] = 0, v.elements[7] = 0, v.elements[11] = 0, v.elements[15] = 1, u = S(v)) : u = S(i.matrixWorld);
        const y = i.element, x = a.objects.get(i);
        if (x === void 0 || x.style !== u) {
          y.style.transform = u;
          const _ = { style: u };
          a.objects.set(i, _);
        }
        y.style.display = i.visible ? "" : "none", y.parentNode !== m && m.appendChild(y), i.onAfterRender(s, e, f);
      }
      for (let u = 0, y = i.children.length; u < y; u++)
        p(i.children[u], e, f);
    }
  }
}
class V {
  constructor({ container: n, uiLoading: s = "yes", uiScanning: r = "yes", uiError: h = "yes", filterMinCF: o = null, filterBeta: c = null }) {
    this.container = n, this.ui = new F({ uiLoading: s, uiScanning: r, uiError: h }), this.controller = new P({
      filterMinCF: o,
      filterBeta: c
    }), this.scene = new M(), this.cssScene = new M(), this.renderer = new I({ antialias: !0, alpha: !0 }), this.cssRenderer = new T({ antialias: !0 }), this.renderer.outputEncoding = O, this.renderer.setPixelRatio(window.devicePixelRatio), this.camera = new k(), this.anchors = [], this.faceMeshes = [], this.container.appendChild(this.renderer.domElement), this.container.appendChild(this.cssRenderer.domElement), this.shouldFaceUser = !0, window.addEventListener("resize", this._resize.bind(this));
  }
  async start() {
    this.ui.showLoading(), await this._startVideo(), await this._startAR(), this.ui.hideLoading();
  }
  stop() {
    this.video.srcObject.getTracks().forEach(function(s) {
      s.stop();
    }), this.video.remove(), this.controller.stopProcessVideo();
  }
  switchCamera() {
    this.shouldFaceUser = !this.shouldFaceUser, this.stop(), this.start();
  }
  addFaceMesh() {
    const n = this.controller.createThreeFaceGeometry(THREE), s = new z(n, new H({ color: 16777215 }));
    return s.visible = !1, s.matrixAutoUpdate = !1, this.faceMeshes.push(s), s;
  }
  addAnchor(n) {
    const s = new C();
    s.matrixAutoUpdate = !1;
    const r = { group: s, landmarkIndex: n, css: !1 };
    return this.anchors.push(r), this.scene.add(s), r;
  }
  addCSSAnchor(n) {
    const s = new C();
    s.matrixAutoUpdate = !1;
    const r = { group: s, landmarkIndex: n, css: !0 };
    return this.anchors.push(r), this.cssScene.add(s), r;
  }
  _startVideo() {
    return new Promise((n, s) => {
      if (this.video = document.createElement("video"), this.video.setAttribute("autoplay", ""), this.video.setAttribute("muted", ""), this.video.setAttribute("playsinline", ""), this.video.style.position = "absolute", this.video.style.top = "0px", this.video.style.left = "0px", this.video.style.zIndex = "-2", this.container.appendChild(this.video), !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        this.ui.showCompatibility(), s();
        return;
      }
      navigator.mediaDevices.getUserMedia({
        audio: !1,
        video: {
          facingMode: this.shouldFaceUser ? "face" : "environment"
        }
      }).then((r) => {
        this.video.addEventListener("loadedmetadata", () => {
          this.video.setAttribute("width", this.video.videoWidth), this.video.setAttribute("height", this.video.videoHeight), n();
        }), this.video.srcObject = r;
      }).catch((r) => {
        console.log("getUserMedia error", r), s();
      });
    });
  }
  _startAR() {
    return new Promise(async (n, s) => {
      const r = this.video;
      this.container, this.controller.onUpdate = ({ hasFace: l, estimateResult: m }) => {
        for (let t = 0; t < this.anchors.length; t++)
          this.anchors[t].css ? this.anchors[t].group.children.forEach((d) => {
            d.element.style.visibility = l ? "visible" : "hidden";
          }) : this.anchors[t].group.visible = l;
        for (let t = 0; t < this.faceMeshes.length; t++)
          this.faceMeshes[t].visible = l;
        if (l) {
          const { metricLandmarks: t, faceMatrix: d, faceScale: S } = m;
          for (let p = 0; p < this.anchors.length; p++) {
            const i = this.anchors[p].landmarkIndex, e = this.controller.getLandmarkMatrix(i);
            if (this.anchors[p].css) {
              const g = [
                1e-3 * e[0],
                1e-3 * e[1],
                e[2],
                e[3],
                1e-3 * e[4],
                1e-3 * e[5],
                e[6],
                e[7],
                1e-3 * e[8],
                1e-3 * e[9],
                e[10],
                e[11],
                1e-3 * e[12],
                1e-3 * e[13],
                e[14],
                e[15]
              ];
              this.anchors[p].group.matrix.set(...g);
            } else
              this.anchors[p].group.matrix.set(...e);
          }
          for (let p = 0; p < this.faceMeshes.length; p++)
            this.faceMeshes[p].matrix.set(...d);
        }
      }, this._resize(), await this.controller.setup(r);
      const { fov: h, aspect: o, near: c, far: a } = this.controller.getCameraParams();
      this.camera.fov = h, this.camera.aspect = o, this.camera.near = c, this.camera.far = a, this.camera.updateProjectionMatrix(), this.renderer.setSize(this.video.videoWidth, this.video.videoHeight), this.cssRenderer.setSize(this.video.videoWidth, this.video.videoHeight), await this.controller.dummyRun(r), this._resize(), this.controller.processVideo(r), n();
    });
  }
  _resize() {
    const { renderer: n, cssRenderer: s, camera: r, container: h, video: o } = this;
    if (!o)
      return;
    let c, a;
    const l = o.videoWidth / o.videoHeight, m = h.clientWidth / h.clientHeight;
    l > m ? (a = h.clientHeight, c = a * l) : (c = h.clientWidth, a = c / l), o.style.top = -(a - h.clientHeight) / 2 + "px", o.style.left = -(c - h.clientWidth) / 2 + "px", o.style.width = c + "px", o.style.height = a + "px";
    const t = n.domElement, d = s.domElement;
    t.style.position = "absolute", t.style.top = o.style.top, t.style.left = o.style.left, t.style.width = o.style.width, t.style.height = o.style.height, d.style.position = "absolute", d.style.top = o.style.top, d.style.left = o.style.left, d.style.transformOrigin = "top left", d.style.transform = "scale(" + c / parseFloat(d.style.width) + "," + a / parseFloat(d.style.height) + ")";
  }
}
window.MINDAR || (window.MINDAR = {});
window.MINDAR.FACE || (window.MINDAR.FACE = {});
window.MINDAR.FACE.MindARThree = V;
export {
  V as MindARThree
};
