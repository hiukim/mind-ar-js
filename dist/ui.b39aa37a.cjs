"use strict";var f=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function v(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}function y(n){var i=n.default;if(typeof i=="function"){var t=function(){return i.apply(this,arguments)};t.prototype=i.prototype}else t={};return Object.defineProperty(t,"__esModule",{value:!0}),Object.keys(n).forEach(function(e){var r=Object.getOwnPropertyDescriptor(n,e);Object.defineProperty(t,e,r.get?r:{enumerable:!0,get:function(){return n[e]}})}),t}const c=(n,i)=>{const t=2*Math.PI*i*n;return t/(t+1)},h=(n,i,t)=>n*i+(1-n)*t;class b{constructor({minCutOff:i,beta:t}){this.minCutOff=i,this.beta=t,this.dCutOff=.001,this.xPrev=null,this.dxPrev=null,this.tPrev=null,this.initialized=!1}reset(){this.initialized=!1}filter(i,t){if(!this.initialized)return this.initialized=!0,this.xPrev=t,this.dxPrev=t.map(()=>0),this.tPrev=i,t;const{xPrev:e,tPrev:r,dxPrev:p}=this,o=i-r,u=c(o,this.dCutOff),l=[],s=[],d=[];for(let a=0;a<t.length;a++){l[a]=(t[a]-e[a])/o,s[a]=h(u,l[a],p[a]);const m=this.minCutOff+this.beta*Math.abs(s[a]),g=c(o,m);d[a]=h(g,t[a],e[a])}return this.xPrev=d,this.dxPrev=s,this.tPrev=i,d}}const x=`<div class="mindar-ui-overlay mindar-ui-loading">\r
  <div class="loader"/>\r
</div>\r
`,M=`<div class="mindar-ui-overlay mindar-ui-compatibility">\r
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
`,w=`<div class="mindar-ui-overlay mindar-ui-scanning">\r
  <div class="scanning">\r
    <div class="inner">\r
      <div class="scanline"/>\r
    </div>\r
  </div>\r
</div>\r
`,P=".mindar-ui-overlay{display:flex;align-items:center;justify-content:center;position:absolute;left:0;right:0;top:0;bottom:0;background:transparent;z-index:2}.mindar-ui-overlay.hidden{display:none}.mindar-ui-loading .loader{border:16px solid #222;border-top:16px solid white;opacity:.8;border-radius:50%;width:120px;height:120px;animation:spin 2s linear infinite}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.mindar-ui-compatibility .content{background:black;color:#fff;opacity:.8;text-align:center;margin:20px;padding:20px;min-height:50vh}@media (min-aspect-ratio: 1/1){.mindar-ui-scanning .scanning{width:50vh;height:50vh}}@media (max-aspect-ratio: 1/1){.mindar-ui-scanning .scanning{width:80vw;height:80vw}}.mindar-ui-scanning .scanning .inner{position:relative;width:100%;height:100%;opacity:.8;background:linear-gradient(to right,white 10px,transparent 10px) 0 0,linear-gradient(to right,white 10px,transparent 10px) 0 100%,linear-gradient(to left,white 10px,transparent 10px) 100% 0,linear-gradient(to left,white 10px,transparent 10px) 100% 100%,linear-gradient(to bottom,white 10px,transparent 10px) 0 0,linear-gradient(to bottom,white 10px,transparent 10px) 100% 0,linear-gradient(to top,white 10px,transparent 10px) 0 100%,linear-gradient(to top,white 10px,transparent 10px) 100% 100%;background-repeat:no-repeat;background-size:40px 40px}.mindar-ui-scanning .scanning .inner .scanline{position:absolute;width:100%;height:10px;background:white;animation:move 2s linear infinite}@keyframes move{0%,to{top:0%}50%{top:calc(100% - 10px)}}";class k{constructor({uiLoading:i,uiScanning:t,uiError:e}){const r=document.createElement("style");r.innerText=P,document.head.appendChild(r),i==="yes"?this.loadingModal=this._loadHTML(x):i!=="no"&&(this.loadingModal=document.querySelector(i)),e==="yes"?this.compatibilityModal=this._loadHTML(M):e!=="no"&&(this.compatibilityModal=document.querySelector(e)),t==="yes"?this.scanningMask=this._loadHTML(w):t!=="no"&&(this.scanningMask=document.querySelector(t)),this.hideLoading(),this.hideCompatibility(),this.hideScanning()}showLoading(){!this.loadingModal||this.loadingModal.classList.remove("hidden")}hideLoading(){!this.loadingModal||this.loadingModal.classList.add("hidden")}showCompatibility(){!this.compatibilityModal||this.compatibilityModal.classList.remove("hidden")}hideCompatibility(){!this.compatibilityModal||this.compatibilityModal.classList.add("hidden")}showScanning(){!this.scanningMask||this.scanningMask.classList.remove("hidden")}hideScanning(){!this.scanningMask||this.scanningMask.classList.add("hidden")}_loadHTML(i){const t=document.createElement("template");t.innerHTML=i.trim();const e=t.content.firstChild;return document.getElementsByTagName("body")[0].appendChild(e),e}}exports.OneEuroFilter=b;exports.UI=k;exports.commonjsGlobal=f;exports.getAugmentedNamespace=y;exports.getDefaultExportFromCjs=v;
