var b = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function M(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function P(e) {
  var t = e.default;
  if (typeof t == "function") {
    var i = function() {
      return t.apply(this, arguments);
    };
    i.prototype = t.prototype;
  } else
    i = {};
  return Object.defineProperty(i, "__esModule", { value: !0 }), Object.keys(e).forEach(function(n) {
    var o = Object.getOwnPropertyDescriptor(e, n);
    Object.defineProperty(i, n, o.get ? o : {
      enumerable: !0,
      get: function() {
        return e[n];
      }
    });
  }), i;
}
const c = (e, t) => {
  const i = 2 * Math.PI * t * e;
  return i / (i + 1);
}, h = (e, t, i) => e * t + (1 - e) * i;
class L {
  constructor({ minCutOff: t, beta: i }) {
    this.minCutOff = t, this.beta = i, this.dCutOff = 1e-3, this.xPrev = null, this.dxPrev = null, this.tPrev = null, this.initialized = !1;
  }
  reset() {
    this.initialized = !1;
  }
  filter(t, i) {
    if (!this.initialized)
      return this.initialized = !0, this.xPrev = i, this.dxPrev = i.map(() => 0), this.tPrev = t, i;
    const { xPrev: n, tPrev: o, dxPrev: u } = this, r = t - o, f = c(r, this.dCutOff), l = [], a = [], d = [];
    for (let s = 0; s < i.length; s++) {
      l[s] = (i[s] - n[s]) / r, a[s] = h(f, l[s], u[s]);
      const m = this.minCutOff + this.beta * Math.abs(a[s]), p = c(r, m);
      d[s] = h(p, i[s], n[s]);
    }
    return this.xPrev = d, this.dxPrev = a, this.tPrev = t, d;
  }
}
const v = `<div class="mindar-ui-overlay mindar-ui-loading">\r
  <div class="loader"/>\r
</div>\r
`, y = `<div class="mindar-ui-overlay mindar-ui-compatibility">\r
  <div class="content">\r
    <h1>Failed to launch :(</h1>\r
    <p>\r
      Looks like your device/browser is not compatible.\r
    </p>\r
\r
    <br/>\r
    <br/>\r
    <p>\r
      Please try the following recommended browsers:\r
    </p>\r
    <p>\r
      For Android device - Chrome\r
    </p>\r
    <p>\r
      For iOS device - Safari\r
    </p>\r
  </div>\r
</div>\r
`, g = `<div class="mindar-ui-overlay mindar-ui-scanning">\r
  <div class="scanning">\r
    <div class="inner">\r
      <div class="scanline"/>\r
    </div>\r
  </div>\r
</div>\r
`;
class O {
  constructor({ uiLoading: t, uiScanning: i, uiError: n }) {
    t === "yes" ? this.loadingModal = this._loadHTML(v) : t !== "no" && (this.loadingModal = document.querySelector(t)), n === "yes" ? this.compatibilityModal = this._loadHTML(y) : n !== "no" && (this.compatibilityModal = document.querySelector(n)), i === "yes" ? this.scanningMask = this._loadHTML(g) : i !== "no" && (this.scanningMask = document.querySelector(i)), this.hideLoading(), this.hideCompatibility(), this.hideScanning();
  }
  showLoading() {
    !this.loadingModal || this.loadingModal.classList.remove("hidden");
  }
  hideLoading() {
    !this.loadingModal || this.loadingModal.classList.add("hidden");
  }
  showCompatibility() {
    !this.compatibilityModal || this.compatibilityModal.classList.remove("hidden");
  }
  hideCompatibility() {
    !this.compatibilityModal || this.compatibilityModal.classList.add("hidden");
  }
  showScanning() {
    !this.scanningMask || this.scanningMask.classList.remove("hidden");
  }
  hideScanning() {
    !this.scanningMask || this.scanningMask.classList.add("hidden");
  }
  _loadHTML(t) {
    const i = document.createElement("template");
    i.innerHTML = t.trim();
    const n = i.content.firstChild;
    return document.getElementsByTagName("body")[0].appendChild(n), n;
  }
}
export {
  L as O,
  O as U,
  M as a,
  b as c,
  P as g
};
