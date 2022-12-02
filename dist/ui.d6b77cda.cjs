"use strict";var v=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function g(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function y(e){var i=e.default;if(typeof i=="function"){var t=function(){return i.apply(this,arguments)};t.prototype=i.prototype}else t={};return Object.defineProperty(t,"__esModule",{value:!0}),Object.keys(e).forEach(function(n){var o=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,o.get?o:{enumerable:!0,get:function(){return e[n]}})}),t}const c=(e,i)=>{const t=2*Math.PI*i*e;return t/(t+1)},h=(e,i,t)=>e*i+(1-e)*t;class b{constructor({minCutOff:i,beta:t}){this.minCutOff=i,this.beta=t,this.dCutOff=.001,this.xPrev=null,this.dxPrev=null,this.tPrev=null,this.initialized=!1}reset(){this.initialized=!1}filter(i,t){if(!this.initialized)return this.initialized=!0,this.xPrev=t,this.dxPrev=t.map(()=>0),this.tPrev=i,t;const{xPrev:n,tPrev:o,dxPrev:u}=this,r=i-o,f=c(r,this.dCutOff),l=[],a=[],d=[];for(let s=0;s<t.length;s++){l[s]=(t[s]-n[s])/r,a[s]=h(f,l[s],u[s]);const m=this.minCutOff+this.beta*Math.abs(a[s]),p=c(r,m);d[s]=h(p,t[s],n[s])}return this.xPrev=d,this.dxPrev=a,this.tPrev=i,d}}const M=`<div class="mindar-ui-overlay mindar-ui-loading">\r
  <div class="loader"/>\r
</div>\r
`,P=`<div class="mindar-ui-overlay mindar-ui-compatibility">\r
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
`,L=`<div class="mindar-ui-overlay mindar-ui-scanning">\r
  <div class="scanning">\r
    <div class="inner">\r
      <div class="scanline"/>\r
    </div>\r
  </div>\r
</div>\r
`;class O{constructor({uiLoading:i,uiScanning:t,uiError:n}){i==="yes"?this.loadingModal=this._loadHTML(M):i!=="no"&&(this.loadingModal=document.querySelector(i)),n==="yes"?this.compatibilityModal=this._loadHTML(P):n!=="no"&&(this.compatibilityModal=document.querySelector(n)),t==="yes"?this.scanningMask=this._loadHTML(L):t!=="no"&&(this.scanningMask=document.querySelector(t)),this.hideLoading(),this.hideCompatibility(),this.hideScanning()}showLoading(){!this.loadingModal||this.loadingModal.classList.remove("hidden")}hideLoading(){!this.loadingModal||this.loadingModal.classList.add("hidden")}showCompatibility(){!this.compatibilityModal||this.compatibilityModal.classList.remove("hidden")}hideCompatibility(){!this.compatibilityModal||this.compatibilityModal.classList.add("hidden")}showScanning(){!this.scanningMask||this.scanningMask.classList.remove("hidden")}hideScanning(){!this.scanningMask||this.scanningMask.classList.add("hidden")}_loadHTML(i){const t=document.createElement("template");t.innerHTML=i.trim();const n=t.content.firstChild;return document.getElementsByTagName("body")[0].appendChild(n),n}}exports.OneEuroFilter=b;exports.UI=O;exports.commonjsGlobal=v;exports.getAugmentedNamespace=y;exports.getDefaultExportFromCjs=g;
