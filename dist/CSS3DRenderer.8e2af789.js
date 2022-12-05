import { Vector3 as w, Quaternion as W, Matrix4 as E, Object3D as N } from "three";
const g = new w(), R = new W(), M = new w();
class _ extends N {
  constructor(s = document.createElement("div")) {
    super(), this.element = s, this.element.style.position = "absolute", this.element.style.pointerEvents = "auto", this.element.style.userSelect = "none", this.element.setAttribute("draggable", !1), this.addEventListener("removed", function() {
      this.traverse(function(r) {
        r.element instanceof Element && r.element.parentNode !== null && r.element.parentNode.removeChild(r.element);
      });
    });
  }
  copy(s, r) {
    return super.copy(s, r), this.element = s.element.cloneNode(!0), this;
  }
}
_.prototype.isCSS3DObject = !0;
class I extends _ {
  constructor(s) {
    super(s), this.rotation2D = 0;
  }
  copy(s, r) {
    return super.copy(s, r), this.rotation2D = s.rotation2D, this;
  }
}
I.prototype.isCSS3DSprite = !0;
const l = new E(), k = new E();
class A {
  constructor(s = {}) {
    const r = this;
    let h, u, S, f;
    const p = {
      camera: { fov: 0, style: "" },
      objects: /* @__PURE__ */ new WeakMap()
    }, m = s.element !== void 0 ? s.element : document.createElement("div");
    m.style.overflow = "hidden", this.domElement = m;
    const a = document.createElement("div");
    a.style.transformStyle = "preserve-3d", a.style.pointerEvents = "none", m.appendChild(a), this.getSize = function() {
      return {
        width: h,
        height: u
      };
    }, this.render = function(n, e) {
      const o = e.projectionMatrix.elements[5] * f;
      p.camera.fov !== o && (m.style.perspective = e.isPerspectiveCamera ? o + "px" : "", p.camera.fov = o), n.autoUpdate === !0 && n.updateMatrixWorld(), e.parent === null && e.updateMatrixWorld();
      let x, i;
      e.isOrthographicCamera && (x = -(e.right + e.left) / 2, i = (e.top + e.bottom) / 2);
      const c = (e.isOrthographicCamera ? "scale(" + o + ")translate(" + t(x) + "px," + t(i) + "px)" + v(e.matrixWorldInverse) : "translateZ(" + o + "px)" + v(e.matrixWorldInverse)) + "translate(" + S + "px," + f + "px)";
      p.camera.style !== c && (a.style.transform = c, p.camera.style = c), D(n, n, e);
    }, this.setSize = function(n, e) {
      h = n, u = e, S = h / 2, f = u / 2, m.style.width = n + "px", m.style.height = e + "px", a.style.width = n + "px", a.style.height = e + "px";
    };
    function t(n) {
      return Math.abs(n) < 1e-10 ? 0 : n;
    }
    function v(n) {
      const e = n.elements;
      return "matrix3d(" + t(e[0]) + "," + t(-e[1]) + "," + t(e[2]) + "," + t(e[3]) + "," + t(e[4]) + "," + t(-e[5]) + "," + t(e[6]) + "," + t(e[7]) + "," + t(e[8]) + "," + t(-e[9]) + "," + t(e[10]) + "," + t(e[11]) + "," + t(e[12]) + "," + t(-e[13]) + "," + t(e[14]) + "," + t(e[15]) + ")";
    }
    function C(n) {
      const e = n.elements;
      return "translate(-50%,-50%)" + ("matrix3d(" + t(e[0]) + "," + t(e[1]) + "," + t(e[2]) + "," + t(e[3]) + "," + t(-e[4]) + "," + t(-e[5]) + "," + t(-e[6]) + "," + t(-e[7]) + "," + t(e[8]) + "," + t(e[9]) + "," + t(e[10]) + "," + t(e[11]) + "," + t(e[12]) + "," + t(e[13]) + "," + t(e[14]) + "," + t(e[15]) + ")");
    }
    function D(n, e, o, x) {
      if (n.isCSS3DObject) {
        n.onBeforeRender(r, e, o);
        let i;
        n.isCSS3DSprite ? (l.copy(o.matrixWorldInverse), l.transpose(), n.rotation2D !== 0 && l.multiply(k.makeRotationZ(n.rotation2D)), n.matrixWorld.decompose(g, R, M), l.setPosition(g), l.scale(M), l.elements[3] = 0, l.elements[7] = 0, l.elements[11] = 0, l.elements[15] = 1, i = C(l)) : i = C(n.matrixWorld);
        const d = n.element, c = p.objects.get(n);
        if (c === void 0 || c.style !== i) {
          d.style.transform = i;
          const O = { style: i };
          p.objects.set(n, O);
        }
        d.style.display = n.visible ? "" : "none", d.parentNode !== a && a.appendChild(d), n.onAfterRender(r, e, o);
      }
      for (let i = 0, d = n.children.length; i < d; i++)
        D(n.children[i], e, o);
    }
  }
}
export {
  A as C
};
