"use strict";const h=require("three"),M=new h.Vector3,O=new h.Quaternion,w=new h.Vector3;class E extends h.Object3D{constructor(s=document.createElement("div")){super(),this.element=s,this.element.style.position="absolute",this.element.style.pointerEvents="auto",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.addEventListener("removed",function(){this.traverse(function(i){i.element instanceof Element&&i.element.parentNode!==null&&i.element.parentNode.removeChild(i.element)})})}copy(s,i){return super.copy(s,i),this.element=s.element.cloneNode(!0),this}}E.prototype.isCSS3DObject=!0;class W extends E{constructor(s){super(s),this.rotation2D=0}copy(s,i){return super.copy(s,i),this.rotation2D=s.rotation2D,this}}W.prototype.isCSS3DSprite=!0;const l=new h.Matrix4,R=new h.Matrix4;class N{constructor(s={}){const i=this;let u,f,v,x;const p={camera:{fov:0,style:""},objects:new WeakMap},m=s.element!==void 0?s.element:document.createElement("div");m.style.overflow="hidden",this.domElement=m;const a=document.createElement("div");a.style.transformStyle="preserve-3d",a.style.pointerEvents="none",m.appendChild(a),this.getSize=function(){return{width:u,height:f}},this.render=function(n,e){const o=e.projectionMatrix.elements[5]*x;p.camera.fov!==o&&(m.style.perspective=e.isPerspectiveCamera?o+"px":"",p.camera.fov=o),n.autoUpdate===!0&&n.updateMatrixWorld(),e.parent===null&&e.updateMatrixWorld();let S,r;e.isOrthographicCamera&&(S=-(e.right+e.left)/2,r=(e.top+e.bottom)/2);const c=(e.isOrthographicCamera?"scale("+o+")translate("+t(S)+"px,"+t(r)+"px)"+C(e.matrixWorldInverse):"translateZ("+o+"px)"+C(e.matrixWorldInverse))+"translate("+v+"px,"+x+"px)";p.camera.style!==c&&(a.style.transform=c,p.camera.style=c),g(n,n,e)},this.setSize=function(n,e){u=n,f=e,v=u/2,x=f/2,m.style.width=n+"px",m.style.height=e+"px",a.style.width=n+"px",a.style.height=e+"px"};function t(n){return Math.abs(n)<1e-10?0:n}function C(n){const e=n.elements;return"matrix3d("+t(e[0])+","+t(-e[1])+","+t(e[2])+","+t(e[3])+","+t(e[4])+","+t(-e[5])+","+t(e[6])+","+t(e[7])+","+t(e[8])+","+t(-e[9])+","+t(e[10])+","+t(e[11])+","+t(e[12])+","+t(-e[13])+","+t(e[14])+","+t(e[15])+")"}function D(n){const e=n.elements;return"translate(-50%,-50%)"+("matrix3d("+t(e[0])+","+t(e[1])+","+t(e[2])+","+t(e[3])+","+t(-e[4])+","+t(-e[5])+","+t(-e[6])+","+t(-e[7])+","+t(e[8])+","+t(e[9])+","+t(e[10])+","+t(e[11])+","+t(e[12])+","+t(e[13])+","+t(e[14])+","+t(e[15])+")")}function g(n,e,o,S){if(n.isCSS3DObject){n.onBeforeRender(i,e,o);let r;n.isCSS3DSprite?(l.copy(o.matrixWorldInverse),l.transpose(),n.rotation2D!==0&&l.multiply(R.makeRotationZ(n.rotation2D)),n.matrixWorld.decompose(M,O,w),l.setPosition(M),l.scale(w),l.elements[3]=0,l.elements[7]=0,l.elements[11]=0,l.elements[15]=1,r=D(l)):r=D(n.matrixWorld);const d=n.element,c=p.objects.get(n);if(c===void 0||c.style!==r){d.style.transform=r;const _={style:r};p.objects.set(n,_)}d.style.display=n.visible?"":"none",d.parentNode!==a&&a.appendChild(d),n.onAfterRender(i,e,o)}for(let r=0,d=n.children.length;r<d;r++)g(n.children[r],e,o)}}}exports.CSS3DRenderer=N;