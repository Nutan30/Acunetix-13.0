import{r as bh,a as ae,V as Ae,U as Xn,S as at,D as wh,b as Ch,c as Eh,d as _h,W as Nn,L as _a,e as Re,B as Ya,f as Sa,O as pi,M as vi,C as Go,g as aa,h as oa,i as pn,F as Sh,E as mi,j as Nu,N as Fu,k as _r,R as Pu,P as Rh,A as Ih,l as Bu,T as Ou,m as kh,n as Cs,o as Es,p as Lu,q as Th,s as Vn,t as Uu,u as j,v as Nt,w as Ah,x as Dh,y as Mh,z as Nh,G as Xt,H as Fh,I as Ph,J as Bh,K as Oh}from"./index-CM8Hp2a0.js";const Lh={some:0,all:1};function Uh(n,t,{root:e,margin:r,amount:a="some"}={}){const o=bh(n),i=new WeakMap,s=c=>{c.forEach(l=>{const h=i.get(l.target);if(l.isIntersecting!==!!h)if(l.isIntersecting){const f=t(l.target,l);typeof f=="function"?i.set(l.target,f):u.unobserve(l.target)}else typeof h=="function"&&(h(l),i.delete(l.target))})},u=new IntersectionObserver(s,{root:e,rootMargin:r,threshold:typeof a=="number"?a:Lh[a]});return o.forEach(c=>u.observe(c)),()=>u.disconnect()}function Wh(n,{root:t,margin:e,amount:r,once:a=!1,initial:o=!1}={}){const[i,s]=ae.useState(o);return ae.useEffect(()=>{if(!n.current||a&&i)return;const u=()=>(s(!0),a?void 0:()=>s(!1)),c={root:t&&t.current||void 0,margin:e,amount:r};return Uh(n.current,u,c)},[t,n,e,a,r]),i}var po=1/1e3,zh=1e3,Vh=class{constructor(){this.startTime=performance.now(),this.previousTime=0,this.currentTime=0,this._delta=0,this._elapsed=0,this._fixedDelta=1e3/60,this.timescale=1,this.useFixedDelta=!1,this._autoReset=!1}get autoReset(){return this._autoReset}set autoReset(n){typeof document<"u"&&document.hidden!==void 0&&(n?document.addEventListener("visibilitychange",this):document.removeEventListener("visibilitychange",this),this._autoReset=n)}get delta(){return this._delta*po}get fixedDelta(){return this._fixedDelta*po}set fixedDelta(n){this._fixedDelta=n*zh}get elapsed(){return this._elapsed*po}update(n){this.useFixedDelta?this._delta=this.fixedDelta:(this.previousTime=this.currentTime,this.currentTime=(n!==void 0?n:performance.now())-this.startTime,this._delta=this.currentTime-this.previousTime),this._delta*=this.timescale,this._elapsed+=this._delta}reset(){this._delta=0,this._elapsed=0,this.currentTime=performance.now()-this.startTime}getDelta(){return this.delta}getElapsed(){return this.elapsed}handleEvent(n){document.hidden||(this.currentTime=performance.now()-this.startTime)}dispose(){this.autoReset=!1}},Gh=(()=>{const n=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),t=new Float32Array([0,0,2,0,0,2]),e=new kh;return e.setAttribute("position",new Cs(n,3)),e.setAttribute("uv",new Cs(t,2)),e})(),Gt=class Ho{static get fullscreenGeometry(){return Gh}constructor(t="Pass",e=new Sa,r=new pi){this.name=t,this.renderer=null,this.scene=e,this.camera=r,this.screen=null,this.rtt=!0,this.needsSwap=!0,this.needsDepthTexture=!1,this.enabled=!0}get renderToScreen(){return!this.rtt}set renderToScreen(t){if(this.rtt===t){const e=this.fullscreenMaterial;e!==null&&(e.needsUpdate=!0),this.rtt=!t}}set mainScene(t){}set mainCamera(t){}setRenderer(t){this.renderer=t}isEnabled(){return this.enabled}setEnabled(t){this.enabled=t}get fullscreenMaterial(){return this.screen!==null?this.screen.material:null}set fullscreenMaterial(t){let e=this.screen;e!==null?e.material=t:(e=new vi(Ho.fullscreenGeometry,t),e.frustumCulled=!1,this.scene===null&&(this.scene=new Sa),this.scene.add(e),this.screen=e)}getFullscreenMaterial(){return this.fullscreenMaterial}setFullscreenMaterial(t){this.fullscreenMaterial=t}getDepthTexture(){return null}setDepthTexture(t,e=Ya){}render(t,e,r,a,o){throw new Error("Render method not implemented!")}setSize(t,e){}initialize(t,e,r){}dispose(){for(const t of Object.keys(this)){const e=this[t];(e instanceof Nn||e instanceof Bu||e instanceof Ou||e instanceof Ho)&&this[t].dispose()}this.fullscreenMaterial!==null&&this.fullscreenMaterial.dispose()}},Hh=class extends Gt{constructor(){super("ClearMaskPass",null,null),this.needsSwap=!1}render(n,t,e,r,a){const o=n.state.buffers.stencil;o.setLocked(!1),o.setTest(!1)}},jh=`#ifdef COLOR_WRITE
#include <common>
#include <dithering_pars_fragment>
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#endif
#ifdef DEPTH_WRITE
#include <packing>
#ifdef GL_FRAGMENT_PRECISION_HIGH
uniform highp sampler2D depthBuffer;
#else
uniform mediump sampler2D depthBuffer;
#endif
float readDepth(const in vec2 uv){
#if DEPTH_PACKING == 3201
return unpackRGBAToDepth(texture2D(depthBuffer,uv));
#else
return texture2D(depthBuffer,uv).r;
#endif
}
#endif
#ifdef USE_WEIGHTS
uniform vec4 channelWeights;
#endif
uniform float opacity;varying vec2 vUv;void main(){
#ifdef COLOR_WRITE
vec4 texel=texture2D(inputBuffer,vUv);
#ifdef USE_WEIGHTS
texel*=channelWeights;
#endif
gl_FragColor=opacity*texel;
#ifdef COLOR_SPACE_CONVERSION
#include <colorspace_fragment>
#endif
#include <dithering_fragment>
#else
gl_FragColor=vec4(0.0);
#endif
#ifdef DEPTH_WRITE
gl_FragDepth=readDepth(vUv);
#endif
}`,Wu="varying vec2 vUv;void main(){vUv=position.xy*0.5+0.5;gl_Position=vec4(position.xy,1.0,1.0);}",zu=class extends pn{constructor(){super({name:"CopyMaterial",defines:{COLOR_SPACE_CONVERSION:"1",DEPTH_PACKING:"0",COLOR_WRITE:"1"},uniforms:{inputBuffer:new Re(null),depthBuffer:new Re(null),channelWeights:new Re(null),opacity:new Re(1)},blending:_r,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:jh,vertexShader:Wu}),this.depthFunc=Ih}get inputBuffer(){return this.uniforms.inputBuffer.value}set inputBuffer(n){const t=n!==null;this.colorWrite!==t&&(t?this.defines.COLOR_WRITE=!0:delete this.defines.COLOR_WRITE,this.colorWrite=t,this.needsUpdate=!0),this.uniforms.inputBuffer.value=n}get depthBuffer(){return this.uniforms.depthBuffer.value}set depthBuffer(n){const t=n!==null;this.depthWrite!==t&&(t?this.defines.DEPTH_WRITE=!0:delete this.defines.DEPTH_WRITE,this.depthTest=t,this.depthWrite=t,this.needsUpdate=!0),this.uniforms.depthBuffer.value=n}set depthPacking(n){this.defines.DEPTH_PACKING=n.toFixed(0),this.needsUpdate=!0}get colorSpaceConversion(){return this.defines.COLOR_SPACE_CONVERSION!==void 0}set colorSpaceConversion(n){this.colorSpaceConversion!==n&&(n?this.defines.COLOR_SPACE_CONVERSION=!0:delete this.defines.COLOR_SPACE_CONVERSION,this.needsUpdate=!0)}get channelWeights(){return this.uniforms.channelWeights.value}set channelWeights(n){n!==null?(this.defines.USE_WEIGHTS="1",this.uniforms.channelWeights.value=n):delete this.defines.USE_WEIGHTS,this.needsUpdate=!0}setInputBuffer(n){this.uniforms.inputBuffer.value=n}getOpacity(n){return this.uniforms.opacity.value}setOpacity(n){this.uniforms.opacity.value=n}},qh=class extends Gt{constructor(n,t=!0){super("CopyPass"),this.fullscreenMaterial=new zu,this.needsSwap=!1,this.renderTarget=n,n===void 0&&(this.renderTarget=new Nn(1,1,{minFilter:_a,magFilter:_a,stencilBuffer:!1,depthBuffer:!1}),this.renderTarget.texture.name="CopyPass.Target"),this.autoResize=t}get resize(){return this.autoResize}set resize(n){this.autoResize=n}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}setAutoResizeEnabled(n){this.autoResize=n}render(n,t,e,r,a){this.fullscreenMaterial.inputBuffer=t.texture,n.setRenderTarget(this.renderToScreen?null:this.renderTarget),n.render(this.scene,this.camera)}setSize(n,t){this.autoResize&&this.renderTarget.setSize(n,t)}initialize(n,t,e){e!==void 0&&(this.renderTarget.texture.type=e,e!==Xn?this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1":n!==null&&n.outputColorSpace===at&&(this.renderTarget.texture.colorSpace=at))}},_s=new Go,Vu=class extends Gt{constructor(n=!0,t=!0,e=!1){super("ClearPass",null,null),this.needsSwap=!1,this.color=n,this.depth=t,this.stencil=e,this.overrideClearColor=null,this.overrideClearAlpha=-1}setClearFlags(n,t,e){this.color=n,this.depth=t,this.stencil=e}getOverrideClearColor(){return this.overrideClearColor}setOverrideClearColor(n){this.overrideClearColor=n}getOverrideClearAlpha(){return this.overrideClearAlpha}setOverrideClearAlpha(n){this.overrideClearAlpha=n}render(n,t,e,r,a){const o=this.overrideClearColor,i=this.overrideClearAlpha,s=n.getClearAlpha(),u=o!==null,c=i>=0;u?(n.getClearColor(_s),n.setClearColor(o,c?i:s)):c&&n.setClearAlpha(i),n.setRenderTarget(this.renderToScreen?null:t),n.clear(this.color,this.depth,this.stencil),u?n.setClearColor(_s,s):c&&n.setClearAlpha(s)}},Xh=class extends Gt{constructor(n,t){super("MaskPass",n,t),this.needsSwap=!1,this.clearPass=new Vu(!1,!1,!0),this.inverse=!1}set mainScene(n){this.scene=n}set mainCamera(n){this.camera=n}get inverted(){return this.inverse}set inverted(n){this.inverse=n}get clear(){return this.clearPass.enabled}set clear(n){this.clearPass.enabled=n}getClearPass(){return this.clearPass}isInverted(){return this.inverted}setInverted(n){this.inverted=n}render(n,t,e,r,a){const o=n.getContext(),i=n.state.buffers,s=this.scene,u=this.camera,c=this.clearPass,l=this.inverted?0:1,h=1-l;i.color.setMask(!1),i.depth.setMask(!1),i.color.setLocked(!0),i.depth.setLocked(!0),i.stencil.setTest(!0),i.stencil.setOp(o.REPLACE,o.REPLACE,o.REPLACE),i.stencil.setFunc(o.ALWAYS,l,4294967295),i.stencil.setClear(h),i.stencil.setLocked(!0),this.clearPass.enabled&&(this.renderToScreen?c.render(n,null):(c.render(n,t),c.render(n,e))),this.renderToScreen?(n.setRenderTarget(null),n.render(s,u)):(n.setRenderTarget(t),n.render(s,u),n.setRenderTarget(e),n.render(s,u)),i.color.setLocked(!1),i.depth.setLocked(!1),i.stencil.setLocked(!1),i.stencil.setFunc(o.EQUAL,1,4294967295),i.stencil.setOp(o.KEEP,o.KEEP,o.KEEP),i.stencil.setLocked(!0)}},Kh=class{constructor(n=null,{depthBuffer:t=!0,stencilBuffer:e=!1,multisampling:r=0,frameBufferType:a}={}){this.renderer=null,this.inputBuffer=this.createBuffer(t,e,a,r),this.outputBuffer=this.inputBuffer.clone(),this.copyPass=new qh,this.depthTexture=null,this.passes=[],this.timer=new Vh,this.autoRenderToScreen=!0,this.setRenderer(n)}get multisampling(){return this.inputBuffer.samples||0}set multisampling(n){const t=this.inputBuffer,e=this.multisampling;e>0&&n>0?(this.inputBuffer.samples=n,this.outputBuffer.samples=n,this.inputBuffer.dispose(),this.outputBuffer.dispose()):e!==n&&(this.inputBuffer.dispose(),this.outputBuffer.dispose(),this.inputBuffer=this.createBuffer(t.depthBuffer,t.stencilBuffer,t.texture.type,n),this.inputBuffer.depthTexture=this.depthTexture,this.outputBuffer=this.inputBuffer.clone())}getTimer(){return this.timer}getRenderer(){return this.renderer}setRenderer(n){if(this.renderer=n,n!==null){const t=n.getSize(new Ae),e=n.getContext().getContextAttributes().alpha,r=this.inputBuffer.texture.type;r===Xn&&n.outputColorSpace===at&&(this.inputBuffer.texture.colorSpace=at,this.outputBuffer.texture.colorSpace=at,this.inputBuffer.dispose(),this.outputBuffer.dispose()),n.autoClear=!1,this.setSize(t.width,t.height);for(const a of this.passes)a.initialize(n,e,r)}}replaceRenderer(n,t=!0){const e=this.renderer,r=e.domElement.parentNode;return this.setRenderer(n),t&&r!==null&&(r.removeChild(e.domElement),r.appendChild(n.domElement)),e}createDepthTexture(){const n=this.depthTexture=new wh;return this.inputBuffer.depthTexture=n,this.inputBuffer.dispose(),this.inputBuffer.stencilBuffer?(n.format=Ch,n.type=Eh):n.type=_h,n}deleteDepthTexture(){if(this.depthTexture!==null){this.depthTexture.dispose(),this.depthTexture=null,this.inputBuffer.depthTexture=null,this.inputBuffer.dispose();for(const n of this.passes)n.setDepthTexture(null)}}createBuffer(n,t,e,r){const a=this.renderer,o=a===null?new Ae:a.getDrawingBufferSize(new Ae),i={minFilter:_a,magFilter:_a,stencilBuffer:t,depthBuffer:n,type:e},s=new Nn(o.width,o.height,i);return r>0&&(s.samples=r),e===Xn&&a!==null&&a.outputColorSpace===at&&(s.texture.colorSpace=at),s.texture.name="EffectComposer.Buffer",s.texture.generateMipmaps=!1,s}setMainScene(n){for(const t of this.passes)t.mainScene=n}setMainCamera(n){for(const t of this.passes)t.mainCamera=n}addPass(n,t){const e=this.passes,r=this.renderer,a=r.getDrawingBufferSize(new Ae),o=r.getContext().getContextAttributes().alpha,i=this.inputBuffer.texture.type;if(n.setRenderer(r),n.setSize(a.width,a.height),n.initialize(r,o,i),this.autoRenderToScreen&&(e.length>0&&(e[e.length-1].renderToScreen=!1),n.renderToScreen&&(this.autoRenderToScreen=!1)),t!==void 0?e.splice(t,0,n):e.push(n),this.autoRenderToScreen&&(e[e.length-1].renderToScreen=!0),n.needsDepthTexture||this.depthTexture!==null)if(this.depthTexture===null){const s=this.createDepthTexture();for(n of e)n.setDepthTexture(s)}else n.setDepthTexture(this.depthTexture)}removePass(n){const t=this.passes,e=t.indexOf(n);if(e!==-1&&t.splice(e,1).length>0){if(this.depthTexture!==null){const o=(s,u)=>s||u.needsDepthTexture;t.reduce(o,!1)||(n.getDepthTexture()===this.depthTexture&&n.setDepthTexture(null),this.deleteDepthTexture())}this.autoRenderToScreen&&e===t.length&&(n.renderToScreen=!1,t.length>0&&(t[t.length-1].renderToScreen=!0))}}removeAllPasses(){const n=this.passes;this.deleteDepthTexture(),n.length>0&&(this.autoRenderToScreen&&(n[n.length-1].renderToScreen=!1),this.passes=[])}render(n){const t=this.renderer,e=this.copyPass;let r=this.inputBuffer,a=this.outputBuffer,o=!1,i,s,u;n===void 0&&(this.timer.update(),n=this.timer.getDelta());for(const c of this.passes)c.enabled&&(c.render(t,r,a,n,o),c.needsSwap&&(o&&(e.renderToScreen=c.renderToScreen,i=t.getContext(),s=t.state.buffers.stencil,s.setFunc(i.NOTEQUAL,1,4294967295),e.render(t,r,a,n,o),s.setFunc(i.EQUAL,1,4294967295)),u=r,r=a,a=u),c instanceof Xh?o=!0:c instanceof Hh&&(o=!1))}setSize(n,t,e){const r=this.renderer,a=r.getSize(new Ae);(n===void 0||t===void 0)&&(n=a.width,t=a.height),(a.width!==n||a.height!==t)&&r.setSize(n,t,e);const o=r.getDrawingBufferSize(new Ae);this.inputBuffer.setSize(o.width,o.height),this.outputBuffer.setSize(o.width,o.height);for(const i of this.passes)i.setSize(o.width,o.height)}reset(){this.dispose(),this.autoRenderToScreen=!0}dispose(){for(const n of this.passes)n.dispose();this.passes=[],this.inputBuffer!==null&&this.inputBuffer.dispose(),this.outputBuffer!==null&&this.outputBuffer.dispose(),this.deleteDepthTexture(),this.copyPass.dispose(),this.timer.dispose(),Gt.fullscreenGeometry.dispose()}},In={NONE:0,DEPTH:1,CONVOLUTION:2},Se={FRAGMENT_HEAD:"FRAGMENT_HEAD",FRAGMENT_MAIN_UV:"FRAGMENT_MAIN_UV",FRAGMENT_MAIN_IMAGE:"FRAGMENT_MAIN_IMAGE",VERTEX_HEAD:"VERTEX_HEAD",VERTEX_MAIN_SUPPORT:"VERTEX_MAIN_SUPPORT"},Yh=class{constructor(){this.shaderParts=new Map([[Se.FRAGMENT_HEAD,null],[Se.FRAGMENT_MAIN_UV,null],[Se.FRAGMENT_MAIN_IMAGE,null],[Se.VERTEX_HEAD,null],[Se.VERTEX_MAIN_SUPPORT,null]]),this.defines=new Map,this.uniforms=new Map,this.blendModes=new Map,this.extensions=new Set,this.attributes=In.NONE,this.varyings=new Set,this.uvTransformation=!1,this.readDepth=!1,this.colorSpace=Nu}},vo=!1,Ss=class{constructor(n=null){this.originalMaterials=new Map,this.material=null,this.materials=null,this.materialsBackSide=null,this.materialsDoubleSide=null,this.materialsFlatShaded=null,this.materialsFlatShadedBackSide=null,this.materialsFlatShadedDoubleSide=null,this.setMaterial(n),this.meshCount=0,this.replaceMaterial=t=>{if(t.isMesh){let e;if(t.material.flatShading)switch(t.material.side){case oa:e=this.materialsFlatShadedDoubleSide;break;case aa:e=this.materialsFlatShadedBackSide;break;default:e=this.materialsFlatShaded;break}else switch(t.material.side){case oa:e=this.materialsDoubleSide;break;case aa:e=this.materialsBackSide;break;default:e=this.materials;break}this.originalMaterials.set(t,t.material),t.isSkinnedMesh?t.material=e[2]:t.isInstancedMesh?t.material=e[1]:t.material=e[0],++this.meshCount}}}cloneMaterial(n){if(!(n instanceof pn))return n.clone();const t=n.uniforms,e=new Map;for(const a in t){const o=t[a].value;o.isRenderTargetTexture&&(t[a].value=null,e.set(a,o))}const r=n.clone();for(const a of e)t[a[0]].value=a[1],r.uniforms[a[0]].value=a[1];return r}setMaterial(n){if(this.disposeMaterials(),this.material=n,n!==null){const t=this.materials=[this.cloneMaterial(n),this.cloneMaterial(n),this.cloneMaterial(n)];for(const e of t)e.uniforms=Object.assign({},n.uniforms),e.side=Sh;t[2].skinning=!0,this.materialsBackSide=t.map(e=>{const r=this.cloneMaterial(e);return r.uniforms=Object.assign({},n.uniforms),r.side=aa,r}),this.materialsDoubleSide=t.map(e=>{const r=this.cloneMaterial(e);return r.uniforms=Object.assign({},n.uniforms),r.side=oa,r}),this.materialsFlatShaded=t.map(e=>{const r=this.cloneMaterial(e);return r.uniforms=Object.assign({},n.uniforms),r.flatShading=!0,r}),this.materialsFlatShadedBackSide=t.map(e=>{const r=this.cloneMaterial(e);return r.uniforms=Object.assign({},n.uniforms),r.flatShading=!0,r.side=aa,r}),this.materialsFlatShadedDoubleSide=t.map(e=>{const r=this.cloneMaterial(e);return r.uniforms=Object.assign({},n.uniforms),r.flatShading=!0,r.side=oa,r})}}render(n,t,e){const r=n.shadowMap.enabled;if(n.shadowMap.enabled=!1,vo){const a=this.originalMaterials;this.meshCount=0,t.traverse(this.replaceMaterial),n.render(t,e);for(const o of a)o[0].material=o[1];this.meshCount!==a.size&&a.clear()}else{const a=t.overrideMaterial;t.overrideMaterial=this.material,n.render(t,e),t.overrideMaterial=a}n.shadowMap.enabled=r}disposeMaterials(){if(this.material!==null){const n=this.materials.concat(this.materialsBackSide).concat(this.materialsDoubleSide).concat(this.materialsFlatShaded).concat(this.materialsFlatShadedBackSide).concat(this.materialsFlatShadedDoubleSide);for(const t of n)t.dispose()}}dispose(){this.originalMaterials.clear(),this.disposeMaterials()}static get workaroundEnabled(){return vo}static set workaroundEnabled(n){vo=n}},Cn=-1,Zt=class extends mi{constructor(n,t=Cn,e=Cn,r=1){super(),this.resizable=n,this.baseSize=new Ae(1,1),this.preferredSize=new Ae(t,e),this.target=this.preferredSize,this.s=r,this.effectiveSize=new Ae,this.addEventListener("change",()=>this.updateEffectiveSize()),this.updateEffectiveSize()}updateEffectiveSize(){const n=this.baseSize,t=this.preferredSize,e=this.effectiveSize,r=this.scale;t.width!==Cn?e.width=t.width:t.height!==Cn?e.width=Math.round(t.height*(n.width/Math.max(n.height,1))):e.width=Math.round(n.width*r),t.height!==Cn?e.height=t.height:t.width!==Cn?e.height=Math.round(t.width/Math.max(n.width/Math.max(n.height,1),1)):e.height=Math.round(n.height*r)}get width(){return this.effectiveSize.width}set width(n){this.preferredWidth=n}get height(){return this.effectiveSize.height}set height(n){this.preferredHeight=n}getWidth(){return this.width}getHeight(){return this.height}get scale(){return this.s}set scale(n){this.s!==n&&(this.s=n,this.preferredSize.setScalar(Cn),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getScale(){return this.scale}setScale(n){this.scale=n}get baseWidth(){return this.baseSize.width}set baseWidth(n){this.baseSize.width!==n&&(this.baseSize.width=n,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getBaseWidth(){return this.baseWidth}setBaseWidth(n){this.baseWidth=n}get baseHeight(){return this.baseSize.height}set baseHeight(n){this.baseSize.height!==n&&(this.baseSize.height=n,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getBaseHeight(){return this.baseHeight}setBaseHeight(n){this.baseHeight=n}setBaseSize(n,t){(this.baseSize.width!==n||this.baseSize.height!==t)&&(this.baseSize.set(n,t),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}get preferredWidth(){return this.preferredSize.width}set preferredWidth(n){this.preferredSize.width!==n&&(this.preferredSize.width=n,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getPreferredWidth(){return this.preferredWidth}setPreferredWidth(n){this.preferredWidth=n}get preferredHeight(){return this.preferredSize.height}set preferredHeight(n){this.preferredSize.height!==n&&(this.preferredSize.height=n,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getPreferredHeight(){return this.preferredHeight}setPreferredHeight(n){this.preferredHeight=n}setPreferredSize(n,t){(this.preferredSize.width!==n||this.preferredSize.height!==t)&&(this.preferredSize.set(n,t),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}copy(n){this.s=n.scale,this.baseSize.set(n.baseWidth,n.baseHeight),this.preferredSize.set(n.preferredWidth,n.preferredHeight),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height)}static get AUTO_SIZE(){return Cn}},Ce={ADD:0,ALPHA:1,AVERAGE:2,COLOR:3,COLOR_BURN:4,COLOR_DODGE:5,DARKEN:6,DIFFERENCE:7,DIVIDE:8,DST:9,EXCLUSION:10,HARD_LIGHT:11,HARD_MIX:12,HUE:13,INVERT:14,INVERT_RGB:15,LIGHTEN:16,LINEAR_BURN:17,LINEAR_DODGE:18,LINEAR_LIGHT:19,LUMINOSITY:20,MULTIPLY:21,NEGATION:22,NORMAL:23,OVERLAY:24,PIN_LIGHT:25,REFLECT:26,SATURATION:27,SCREEN:28,SOFT_LIGHT:29,SRC:30,SUBTRACT:31,VIVID_LIGHT:32},$h="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb+src.rgb;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Jh="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){return mix(dst,src,src.a*opacity);}",Qh="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=(dst.rgb+src.rgb)*0.5;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Zh="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(b.xy,a.z));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",ef="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=dst.rgb,b=src.rgb;vec3 c=mix(step(0.0,b)*(1.0-min(vec3(1.0),(1.0-a)/max(b,1e-9))),vec3(1.0),step(1.0,a));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",tf="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=dst.rgb,b=src.rgb;vec3 c=step(0.0,a)*mix(min(vec3(1.0),a/max(1.0-b,1e-9)),vec3(1.0),step(1.0,b));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",nf="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=min(dst.rgb,src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",rf="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=abs(dst.rgb-src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",af="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb/max(src.rgb,1e-9);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",of="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb+src.rgb-2.0*dst.rgb*src.rgb;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",sf="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=min(dst.rgb,1.0);vec3 b=min(src.rgb,1.0);vec3 c=mix(2.0*a*b,1.0-2.0*(1.0-a)*(1.0-b),step(0.5,b));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",uf="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=step(1.0,dst.rgb+src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",cf="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(b.x,a.yz));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",lf="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(1.0-src.rgb,0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",hf="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=src.rgb*max(1.0-dst.rgb,0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",ff="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(dst.rgb,src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",df="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=clamp(src.rgb+dst.rgb-1.0,0.0,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",pf="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=min(dst.rgb+src.rgb,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",vf="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=clamp(2.0*src.rgb+dst.rgb-1.0,0.0,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",mf="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(a.xy,b.z));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",gf="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb*src.rgb;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",yf="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(1.0-abs(1.0-dst.rgb-src.rgb),0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",xf="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){return mix(dst,src,opacity);}",bf="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=2.0*src.rgb*dst.rgb;vec3 b=1.0-2.0*(1.0-src.rgb)*(1.0-dst.rgb);vec3 c=mix(a,b,step(0.5,dst.rgb));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",wf="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 src2=2.0*src.rgb;vec3 c=mix(mix(src2,dst.rgb,step(0.5*dst.rgb,src.rgb)),max(src2-1.0,vec3(0.0)),step(dst.rgb,src2-1.0));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Cf="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=min(dst.rgb*dst.rgb/max(1.0-src.rgb,1e-9),1.0);vec3 c=mix(a,src.rgb,step(1.0,src.rgb));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Ef="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(a.x,b.y,a.z));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",_f="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb+src.rgb-min(dst.rgb*src.rgb,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Sf="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 src2=2.0*src.rgb;vec3 d=dst.rgb+(src2-1.0);vec3 w=step(0.5,src.rgb);vec3 a=dst.rgb-(1.0-src2)*dst.rgb*(1.0-dst.rgb);vec3 b=mix(d*(sqrt(dst.rgb)-dst.rgb),d*dst.rgb*((16.0*dst.rgb-12.0)*dst.rgb+3.0),w*(1.0-step(0.25,dst.rgb)));vec3 c=mix(a,b,w);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Rf="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){return src;}",If="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(dst.rgb-src.rgb,0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",kf="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=mix(max(1.0-min((1.0-dst.rgb)/(2.0*src.rgb),1.0),0.0),min(dst.rgb/(2.0*(1.0-src.rgb)),1.0),step(0.5,src.rgb));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Tf=new Map([[Ce.ADD,$h],[Ce.ALPHA,Jh],[Ce.AVERAGE,Qh],[Ce.COLOR,Zh],[Ce.COLOR_BURN,ef],[Ce.COLOR_DODGE,tf],[Ce.DARKEN,nf],[Ce.DIFFERENCE,rf],[Ce.DIVIDE,af],[Ce.DST,null],[Ce.EXCLUSION,of],[Ce.HARD_LIGHT,sf],[Ce.HARD_MIX,uf],[Ce.HUE,cf],[Ce.INVERT,lf],[Ce.INVERT_RGB,hf],[Ce.LIGHTEN,ff],[Ce.LINEAR_BURN,df],[Ce.LINEAR_DODGE,pf],[Ce.LINEAR_LIGHT,vf],[Ce.LUMINOSITY,mf],[Ce.MULTIPLY,gf],[Ce.NEGATION,yf],[Ce.NORMAL,xf],[Ce.OVERLAY,bf],[Ce.PIN_LIGHT,wf],[Ce.REFLECT,Cf],[Ce.SATURATION,Ef],[Ce.SCREEN,_f],[Ce.SOFT_LIGHT,Sf],[Ce.SRC,Rf],[Ce.SUBTRACT,If],[Ce.VIVID_LIGHT,kf]]),Af=class extends mi{constructor(n,t=1){super(),this._blendFunction=n,this.opacity=new Re(t)}getOpacity(){return this.opacity.value}setOpacity(n){this.opacity.value=n}get blendFunction(){return this._blendFunction}set blendFunction(n){this._blendFunction=n,this.dispatchEvent({type:"change"})}getBlendFunction(){return this.blendFunction}setBlendFunction(n){this.blendFunction=n}getShaderCode(){return Tf.get(this.blendFunction)}},Gu=class extends mi{constructor(n,t,{attributes:e=In.NONE,blendFunction:r=Ce.NORMAL,defines:a=new Map,uniforms:o=new Map,extensions:i=null,vertexShader:s=null}={}){super(),this.name=n,this.renderer=null,this.attributes=e,this.fragmentShader=t,this.vertexShader=s,this.defines=a,this.uniforms=o,this.extensions=i,this.blendMode=new Af(r),this.blendMode.addEventListener("change",u=>this.setChanged()),this._inputColorSpace=Nu,this._outputColorSpace=Fu}get inputColorSpace(){return this._inputColorSpace}set inputColorSpace(n){this._inputColorSpace=n,this.setChanged()}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(n){this._outputColorSpace=n,this.setChanged()}set mainScene(n){}set mainCamera(n){}getName(){return this.name}setRenderer(n){this.renderer=n}getDefines(){return this.defines}getUniforms(){return this.uniforms}getExtensions(){return this.extensions}getBlendMode(){return this.blendMode}getAttributes(){return this.attributes}setAttributes(n){this.attributes=n,this.setChanged()}getFragmentShader(){return this.fragmentShader}setFragmentShader(n){this.fragmentShader=n,this.setChanged()}getVertexShader(){return this.vertexShader}setVertexShader(n){this.vertexShader=n,this.setChanged()}setChanged(){this.dispatchEvent({type:"change"})}setDepthTexture(n,t=Ya){}update(n,t,e){}setSize(n,t){}initialize(n,t,e){}dispose(){for(const n of Object.keys(this)){const t=this[n];(t instanceof Nn||t instanceof Bu||t instanceof Ou||t instanceof Gt)&&this[n].dispose()}}},gi={MEDIUM:2,LARGE:3},Df=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec4 sum=texture2D(inputBuffer,vUv0);sum+=texture2D(inputBuffer,vUv1);sum+=texture2D(inputBuffer,vUv2);sum+=texture2D(inputBuffer,vUv3);gl_FragColor=sum*0.25;
#include <colorspace_fragment>
}`,Mf="uniform vec4 texelSize;uniform float kernel;uniform float scale;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec2 uv=position.xy*0.5+0.5;vec2 dUv=(texelSize.xy*vec2(kernel)+texelSize.zw)*scale;vUv0=vec2(uv.x-dUv.x,uv.y+dUv.y);vUv1=vec2(uv.x+dUv.x,uv.y+dUv.y);vUv2=vec2(uv.x+dUv.x,uv.y-dUv.y);vUv3=vec2(uv.x-dUv.x,uv.y-dUv.y);gl_Position=vec4(position.xy,1.0,1.0);}",Nf=[new Float32Array([0,0]),new Float32Array([0,1,1]),new Float32Array([0,1,1,2]),new Float32Array([0,1,2,2,3]),new Float32Array([0,1,2,3,4,4,5]),new Float32Array([0,1,2,3,4,5,7,8,9,10])],Ff=class extends pn{constructor(n=new Es){super({name:"KawaseBlurMaterial",uniforms:{inputBuffer:new Re(null),texelSize:new Re(new Es),scale:new Re(1),kernel:new Re(0)},blending:_r,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:Df,vertexShader:Mf}),this.setTexelSize(n.x,n.y),this.kernelSize=gi.MEDIUM}set inputBuffer(n){this.uniforms.inputBuffer.value=n}setInputBuffer(n){this.inputBuffer=n}get kernelSequence(){return Nf[this.kernelSize]}get scale(){return this.uniforms.scale.value}set scale(n){this.uniforms.scale.value=n}getScale(){return this.uniforms.scale.value}setScale(n){this.uniforms.scale.value=n}getKernel(){return null}get kernel(){return this.uniforms.kernel.value}set kernel(n){this.uniforms.kernel.value=n}setKernel(n){this.kernel=n}setTexelSize(n,t){this.uniforms.texelSize.value.set(n,t,n*.5,t*.5)}setSize(n,t){const e=1/n,r=1/t;this.uniforms.texelSize.value.set(e,r,e*.5,r*.5)}},Pf=class extends Gt{constructor({kernelSize:n=gi.MEDIUM,resolutionScale:t=.5,width:e=Zt.AUTO_SIZE,height:r=Zt.AUTO_SIZE,resolutionX:a=e,resolutionY:o=r}={}){super("KawaseBlurPass"),this.renderTargetA=new Nn(1,1,{depthBuffer:!1}),this.renderTargetA.texture.name="Blur.Target.A",this.renderTargetB=this.renderTargetA.clone(),this.renderTargetB.texture.name="Blur.Target.B";const i=this.resolution=new Zt(this,a,o,t);i.addEventListener("change",s=>this.setSize(i.baseWidth,i.baseHeight)),this._blurMaterial=new Ff,this._blurMaterial.kernelSize=n,this.copyMaterial=new zu}getResolution(){return this.resolution}get blurMaterial(){return this._blurMaterial}set blurMaterial(n){this._blurMaterial=n}get dithering(){return this.copyMaterial.dithering}set dithering(n){this.copyMaterial.dithering=n}get kernelSize(){return this.blurMaterial.kernelSize}set kernelSize(n){this.blurMaterial.kernelSize=n}get width(){return this.resolution.width}set width(n){this.resolution.preferredWidth=n}get height(){return this.resolution.height}set height(n){this.resolution.preferredHeight=n}get scale(){return this.blurMaterial.scale}set scale(n){this.blurMaterial.scale=n}getScale(){return this.blurMaterial.scale}setScale(n){this.blurMaterial.scale=n}getKernelSize(){return this.kernelSize}setKernelSize(n){this.kernelSize=n}getResolutionScale(){return this.resolution.scale}setResolutionScale(n){this.resolution.scale=n}render(n,t,e,r,a){const o=this.scene,i=this.camera,s=this.renderTargetA,u=this.renderTargetB,c=this.blurMaterial,l=c.kernelSequence;let h=t;this.fullscreenMaterial=c;for(let f=0,d=l.length;f<d;++f){const p=(f&1)===0?s:u;c.kernel=l[f],c.inputBuffer=h.texture,n.setRenderTarget(p),n.render(o,i),h=p}this.fullscreenMaterial=this.copyMaterial,this.copyMaterial.inputBuffer=h.texture,n.setRenderTarget(this.renderToScreen?null:e),n.render(o,i)}setSize(n,t){const e=this.resolution;e.setBaseSize(n,t);const r=e.width,a=e.height;this.renderTargetA.setSize(r,a),this.renderTargetB.setSize(r,a),this.blurMaterial.setSize(n,t)}initialize(n,t,e){e!==void 0&&(this.renderTargetA.texture.type=e,this.renderTargetB.texture.type=e,e!==Xn?(this.blurMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1",this.copyMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1"):n!==null&&n.outputColorSpace===at&&(this.renderTargetA.texture.colorSpace=at,this.renderTargetB.texture.colorSpace=at))}static get AUTO_SIZE(){return Zt.AUTO_SIZE}},Bf=`#include <common>
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#ifdef RANGE
uniform vec2 range;
#elif defined(THRESHOLD)
uniform float threshold;uniform float smoothing;
#endif
varying vec2 vUv;void main(){vec4 texel=texture2D(inputBuffer,vUv);float l=luminance(texel.rgb);float mask=1.0;
#ifdef RANGE
float low=step(range.x,l);float high=step(l,range.y);mask=low*high;
#elif defined(THRESHOLD)
mask=smoothstep(threshold,threshold+smoothing,l);
#endif
#ifdef COLOR
gl_FragColor=texel*mask;
#else
gl_FragColor=vec4(l*mask);
#endif
}`,Of=class extends pn{constructor(n=!1,t=null){super({name:"LuminanceMaterial",defines:{THREE_REVISION:Pu.replace(/\D+/g,"")},uniforms:{inputBuffer:new Re(null),threshold:new Re(0),smoothing:new Re(1),range:new Re(null)},blending:_r,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:Bf,vertexShader:Wu}),this.colorOutput=n,this.luminanceRange=t}set inputBuffer(n){this.uniforms.inputBuffer.value=n}setInputBuffer(n){this.uniforms.inputBuffer.value=n}get threshold(){return this.uniforms.threshold.value}set threshold(n){this.smoothing>0||n>0?this.defines.THRESHOLD="1":delete this.defines.THRESHOLD,this.uniforms.threshold.value=n}getThreshold(){return this.threshold}setThreshold(n){this.threshold=n}get smoothing(){return this.uniforms.smoothing.value}set smoothing(n){this.threshold>0||n>0?this.defines.THRESHOLD="1":delete this.defines.THRESHOLD,this.uniforms.smoothing.value=n}getSmoothingFactor(){return this.smoothing}setSmoothingFactor(n){this.smoothing=n}get useThreshold(){return this.threshold>0||this.smoothing>0}set useThreshold(n){}get colorOutput(){return this.defines.COLOR!==void 0}set colorOutput(n){n?this.defines.COLOR="1":delete this.defines.COLOR,this.needsUpdate=!0}isColorOutputEnabled(n){return this.colorOutput}setColorOutputEnabled(n){this.colorOutput=n}get useRange(){return this.luminanceRange!==null}set useRange(n){this.luminanceRange=null}get luminanceRange(){return this.uniforms.range.value}set luminanceRange(n){n!==null?this.defines.RANGE="1":delete this.defines.RANGE,this.uniforms.range.value=n,this.needsUpdate=!0}getLuminanceRange(){return this.luminanceRange}setLuminanceRange(n){this.luminanceRange=n}},Lf=class extends Gt{constructor({renderTarget:n,luminanceRange:t,colorOutput:e,resolutionScale:r=1,width:a=Zt.AUTO_SIZE,height:o=Zt.AUTO_SIZE,resolutionX:i=a,resolutionY:s=o}={}){super("LuminancePass"),this.fullscreenMaterial=new Of(e,t),this.needsSwap=!1,this.renderTarget=n,this.renderTarget===void 0&&(this.renderTarget=new Nn(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="LuminancePass.Target");const u=this.resolution=new Zt(this,i,s,r);u.addEventListener("change",c=>this.setSize(u.baseWidth,u.baseHeight))}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}getResolution(){return this.resolution}render(n,t,e,r,a){const o=this.fullscreenMaterial;o.inputBuffer=t.texture,n.setRenderTarget(this.renderToScreen?null:this.renderTarget),n.render(this.scene,this.camera)}setSize(n,t){const e=this.resolution;e.setBaseSize(n,t),this.renderTarget.setSize(e.width,e.height)}initialize(n,t,e){e!==void 0&&e!==Xn&&(this.renderTarget.texture.type=e,this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}},Uf=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#define WEIGHT_INNER 0.125
#define WEIGHT_OUTER 0.05556
varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;float clampToBorder(const in vec2 uv){return float(uv.s>=0.0&&uv.s<=1.0&&uv.t>=0.0&&uv.t<=1.0);}void main(){vec4 c=vec4(0.0);vec4 w=WEIGHT_INNER*vec4(clampToBorder(vUv00),clampToBorder(vUv01),clampToBorder(vUv02),clampToBorder(vUv03));c+=w.x*texture2D(inputBuffer,vUv00);c+=w.y*texture2D(inputBuffer,vUv01);c+=w.z*texture2D(inputBuffer,vUv02);c+=w.w*texture2D(inputBuffer,vUv03);w=WEIGHT_OUTER*vec4(clampToBorder(vUv04),clampToBorder(vUv05),clampToBorder(vUv06),clampToBorder(vUv07));c+=w.x*texture2D(inputBuffer,vUv04);c+=w.y*texture2D(inputBuffer,vUv05);c+=w.z*texture2D(inputBuffer,vUv06);c+=w.w*texture2D(inputBuffer,vUv07);w=WEIGHT_OUTER*vec4(clampToBorder(vUv08),clampToBorder(vUv09),clampToBorder(vUv10),clampToBorder(vUv11));c+=w.x*texture2D(inputBuffer,vUv08);c+=w.y*texture2D(inputBuffer,vUv09);c+=w.z*texture2D(inputBuffer,vUv10);c+=w.w*texture2D(inputBuffer,vUv11);c+=WEIGHT_OUTER*texture2D(inputBuffer,vUv);gl_FragColor=c;
#include <colorspace_fragment>
}`,Wf="uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;void main(){vUv=position.xy*0.5+0.5;vUv00=vUv+texelSize*vec2(-1.0,1.0);vUv01=vUv+texelSize*vec2(1.0,1.0);vUv02=vUv+texelSize*vec2(-1.0,-1.0);vUv03=vUv+texelSize*vec2(1.0,-1.0);vUv04=vUv+texelSize*vec2(-2.0,2.0);vUv05=vUv+texelSize*vec2(0.0,2.0);vUv06=vUv+texelSize*vec2(2.0,2.0);vUv07=vUv+texelSize*vec2(-2.0,0.0);vUv08=vUv+texelSize*vec2(2.0,0.0);vUv09=vUv+texelSize*vec2(-2.0,-2.0);vUv10=vUv+texelSize*vec2(0.0,-2.0);vUv11=vUv+texelSize*vec2(2.0,-2.0);gl_Position=vec4(position.xy,1.0,1.0);}",zf=class extends pn{constructor(){super({name:"DownsamplingMaterial",uniforms:{inputBuffer:new Re(null),texelSize:new Re(new Ae)},blending:_r,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:Uf,vertexShader:Wf})}set inputBuffer(n){this.uniforms.inputBuffer.value=n}setSize(n,t){this.uniforms.texelSize.value.set(1/n,1/t)}},Vf=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;uniform mediump sampler2D supportBuffer;
#else
uniform lowp sampler2D inputBuffer;uniform lowp sampler2D supportBuffer;
#endif
uniform float radius;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vec4 c=vec4(0.0);c+=texture2D(inputBuffer,vUv0)*0.0625;c+=texture2D(inputBuffer,vUv1)*0.125;c+=texture2D(inputBuffer,vUv2)*0.0625;c+=texture2D(inputBuffer,vUv3)*0.125;c+=texture2D(inputBuffer,vUv)*0.25;c+=texture2D(inputBuffer,vUv4)*0.125;c+=texture2D(inputBuffer,vUv5)*0.0625;c+=texture2D(inputBuffer,vUv6)*0.125;c+=texture2D(inputBuffer,vUv7)*0.0625;vec4 baseColor=texture2D(supportBuffer,vUv);gl_FragColor=mix(baseColor,c,radius);
#include <colorspace_fragment>
}`,Gf="uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vUv=position.xy*0.5+0.5;vUv0=vUv+texelSize*vec2(-1.0,1.0);vUv1=vUv+texelSize*vec2(0.0,1.0);vUv2=vUv+texelSize*vec2(1.0,1.0);vUv3=vUv+texelSize*vec2(-1.0,0.0);vUv4=vUv+texelSize*vec2(1.0,0.0);vUv5=vUv+texelSize*vec2(-1.0,-1.0);vUv6=vUv+texelSize*vec2(0.0,-1.0);vUv7=vUv+texelSize*vec2(1.0,-1.0);gl_Position=vec4(position.xy,1.0,1.0);}",Hf=class extends pn{constructor(){super({name:"UpsamplingMaterial",uniforms:{inputBuffer:new Re(null),supportBuffer:new Re(null),texelSize:new Re(new Ae),radius:new Re(.85)},blending:_r,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:Vf,vertexShader:Gf})}set inputBuffer(n){this.uniforms.inputBuffer.value=n}set supportBuffer(n){this.uniforms.supportBuffer.value=n}get radius(){return this.uniforms.radius.value}set radius(n){this.uniforms.radius.value=n}setSize(n,t){this.uniforms.texelSize.value.set(1/n,1/t)}},jf=class extends Gt{constructor(){super("MipmapBlurPass"),this.needsSwap=!1,this.renderTarget=new Nn(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="Upsampling.Mipmap0",this.downsamplingMipmaps=[],this.upsamplingMipmaps=[],this.downsamplingMaterial=new zf,this.upsamplingMaterial=new Hf,this.resolution=new Ae}get texture(){return this.renderTarget.texture}get levels(){return this.downsamplingMipmaps.length}set levels(n){if(this.levels!==n){const t=this.renderTarget;this.dispose(),this.downsamplingMipmaps=[],this.upsamplingMipmaps=[];for(let e=0;e<n;++e){const r=t.clone();r.texture.name="Downsampling.Mipmap"+e,this.downsamplingMipmaps.push(r)}this.upsamplingMipmaps.push(t);for(let e=1,r=n-1;e<r;++e){const a=t.clone();a.texture.name="Upsampling.Mipmap"+e,this.upsamplingMipmaps.push(a)}this.setSize(this.resolution.x,this.resolution.y)}}get radius(){return this.upsamplingMaterial.radius}set radius(n){this.upsamplingMaterial.radius=n}render(n,t,e,r,a){const{scene:o,camera:i}=this,{downsamplingMaterial:s,upsamplingMaterial:u}=this,{downsamplingMipmaps:c,upsamplingMipmaps:l}=this;let h=t;this.fullscreenMaterial=s;for(let f=0,d=c.length;f<d;++f){const p=c[f];s.setSize(h.width,h.height),s.inputBuffer=h.texture,n.setRenderTarget(p),n.render(o,i),h=p}this.fullscreenMaterial=u;for(let f=l.length-1;f>=0;--f){const d=l[f];u.setSize(h.width,h.height),u.inputBuffer=h.texture,u.supportBuffer=c[f].texture,n.setRenderTarget(d),n.render(o,i),h=d}}setSize(n,t){const e=this.resolution;e.set(n,t);let r=e.width,a=e.height;for(let o=0,i=this.downsamplingMipmaps.length;o<i;++o)r=Math.round(r*.5),a=Math.round(a*.5),this.downsamplingMipmaps[o].setSize(r,a),o<this.upsamplingMipmaps.length&&this.upsamplingMipmaps[o].setSize(r,a)}initialize(n,t,e){if(e!==void 0){const r=this.downsamplingMipmaps.concat(this.upsamplingMipmaps);for(const a of r)a.texture.type=e;if(e!==Xn)this.downsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1",this.upsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1";else if(n!==null&&n.outputColorSpace===at)for(const a of r)a.texture.colorSpace=at}}dispose(){super.dispose();for(const n of this.downsamplingMipmaps.concat(this.upsamplingMipmaps))n.dispose()}},qf=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D map;
#else
uniform lowp sampler2D map;
#endif
uniform float intensity;void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){outputColor=texture2D(map,uv)*intensity;}`,Xf=class extends Gu{constructor({blendFunction:n=Ce.SCREEN,luminanceThreshold:t=1,luminanceSmoothing:e=.03,mipmapBlur:r=!0,intensity:a=1,radius:o=.85,levels:i=8,kernelSize:s=gi.LARGE,resolutionScale:u=.5,width:c=Zt.AUTO_SIZE,height:l=Zt.AUTO_SIZE,resolutionX:h=c,resolutionY:f=l}={}){super("BloomEffect",qf,{blendFunction:n,uniforms:new Map([["map",new Re(null)],["intensity",new Re(a)]])}),this.renderTarget=new Nn(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="Bloom.Target",this.blurPass=new Pf({kernelSize:s}),this.luminancePass=new Lf({colorOutput:!0}),this.luminanceMaterial.threshold=t,this.luminanceMaterial.smoothing=e,this.mipmapBlurPass=new jf,this.mipmapBlurPass.enabled=r,this.mipmapBlurPass.radius=o,this.mipmapBlurPass.levels=i,this.uniforms.get("map").value=r?this.mipmapBlurPass.texture:this.renderTarget.texture;const d=this.resolution=new Zt(this,h,f,u);d.addEventListener("change",p=>this.setSize(d.baseWidth,d.baseHeight))}get texture(){return this.mipmapBlurPass.enabled?this.mipmapBlurPass.texture:this.renderTarget.texture}getTexture(){return this.texture}getResolution(){return this.resolution}getBlurPass(){return this.blurPass}getLuminancePass(){return this.luminancePass}get luminanceMaterial(){return this.luminancePass.fullscreenMaterial}getLuminanceMaterial(){return this.luminancePass.fullscreenMaterial}get width(){return this.resolution.width}set width(n){this.resolution.preferredWidth=n}get height(){return this.resolution.height}set height(n){this.resolution.preferredHeight=n}get dithering(){return this.blurPass.dithering}set dithering(n){this.blurPass.dithering=n}get kernelSize(){return this.blurPass.kernelSize}set kernelSize(n){this.blurPass.kernelSize=n}get distinction(){return console.warn(this.name,"distinction was removed"),1}set distinction(n){console.warn(this.name,"distinction was removed")}get intensity(){return this.uniforms.get("intensity").value}set intensity(n){this.uniforms.get("intensity").value=n}getIntensity(){return this.intensity}setIntensity(n){this.intensity=n}getResolutionScale(){return this.resolution.scale}setResolutionScale(n){this.resolution.scale=n}update(n,t,e){const r=this.renderTarget,a=this.luminancePass;a.enabled?(a.render(n,t),this.mipmapBlurPass.enabled?this.mipmapBlurPass.render(n,a.renderTarget):this.blurPass.render(n,a.renderTarget,r)):this.mipmapBlurPass.enabled?this.mipmapBlurPass.render(n,t):this.blurPass.render(n,t,r)}setSize(n,t){const e=this.resolution;e.setBaseSize(n,t),this.renderTarget.setSize(e.width,e.height),this.blurPass.resolution.copy(e),this.luminancePass.setSize(n,t),this.mipmapBlurPass.setSize(n,t)}initialize(n,t,e){this.blurPass.initialize(n,t,e),this.luminancePass.initialize(n,t,e),this.mipmapBlurPass.initialize(n,t,e),e!==void 0&&(this.renderTarget.texture.type=e,n!==null&&n.outputColorSpace===at&&(this.renderTarget.texture.colorSpace=at))}},Kf=`#ifdef RADIAL_MODULATION
uniform float modulationOffset;
#endif
varying float vActive;varying vec2 vUvR;varying vec2 vUvB;void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){vec2 ra=inputColor.ra;vec2 ba=inputColor.ba;
#ifdef RADIAL_MODULATION
const vec2 center=vec2(0.5);float d=distance(uv,center)*2.0;d=max(d-modulationOffset,0.0);if(vActive>0.0&&d>0.0){ra=texture2D(inputBuffer,mix(uv,vUvR,d)).ra;ba=texture2D(inputBuffer,mix(uv,vUvB,d)).ba;}
#else
if(vActive>0.0){ra=texture2D(inputBuffer,vUvR).ra;ba=texture2D(inputBuffer,vUvB).ba;}
#endif
outputColor=vec4(ra.x,inputColor.g,ba.x,max(max(ra.y,ba.y),inputColor.a));}`,Yf="uniform vec2 offset;varying float vActive;varying vec2 vUvR;varying vec2 vUvB;void mainSupport(const in vec2 uv){vec2 shift=offset*vec2(1.0,aspect);vActive=(shift.x!=0.0||shift.y!=0.0)?1.0:0.0;vUvR=uv+shift;vUvB=uv-shift;}",$f=class extends Gu{constructor({offset:n=new Ae(.001,5e-4),radialModulation:t=!1,modulationOffset:e=.15}={}){super("ChromaticAberrationEffect",Kf,{vertexShader:Yf,attributes:In.CONVOLUTION,uniforms:new Map([["offset",new Re(n)],["modulationOffset",new Re(e)]])}),this.radialModulation=t}get offset(){return this.uniforms.get("offset").value}set offset(n){this.uniforms.get("offset").value=n}get radialModulation(){return this.defines.has("RADIAL_MODULATION")}set radialModulation(n){n?this.defines.set("RADIAL_MODULATION","1"):this.defines.delete("RADIAL_MODULATION"),this.setChanged()}get modulationOffset(){return this.uniforms.get("modulationOffset").value}set modulationOffset(n){this.uniforms.get("modulationOffset").value=n}getOffset(){return this.offset}setOffset(n){this.offset=n}},Jf=class extends Gt{constructor(n,t,e=null){super("RenderPass",n,t),this.needsSwap=!1,this.clearPass=new Vu,this.overrideMaterialManager=e===null?null:new Ss(e),this.ignoreBackground=!1,this.skipShadowMapUpdate=!1,this.selection=null}set mainScene(n){this.scene=n}set mainCamera(n){this.camera=n}get renderToScreen(){return super.renderToScreen}set renderToScreen(n){super.renderToScreen=n,this.clearPass.renderToScreen=n}get overrideMaterial(){const n=this.overrideMaterialManager;return n!==null?n.material:null}set overrideMaterial(n){const t=this.overrideMaterialManager;n!==null?t!==null?t.setMaterial(n):this.overrideMaterialManager=new Ss(n):t!==null&&(t.dispose(),this.overrideMaterialManager=null)}getOverrideMaterial(){return this.overrideMaterial}setOverrideMaterial(n){this.overrideMaterial=n}get clear(){return this.clearPass.enabled}set clear(n){this.clearPass.enabled=n}getSelection(){return this.selection}setSelection(n){this.selection=n}isBackgroundDisabled(){return this.ignoreBackground}setBackgroundDisabled(n){this.ignoreBackground=n}isShadowMapDisabled(){return this.skipShadowMapUpdate}setShadowMapDisabled(n){this.skipShadowMapUpdate=n}getClearPass(){return this.clearPass}render(n,t,e,r,a){const o=this.scene,i=this.camera,s=this.selection,u=i.layers.mask,c=o.background,l=n.shadowMap.autoUpdate,h=this.renderToScreen?null:t;s!==null&&i.layers.set(s.getLayer()),this.skipShadowMapUpdate&&(n.shadowMap.autoUpdate=!1),(this.ignoreBackground||this.clearPass.overrideClearColor!==null)&&(o.background=null),this.clearPass.enabled&&this.clearPass.render(n,t),n.setRenderTarget(h),this.overrideMaterialManager!==null?this.overrideMaterialManager.render(n,o,i):n.render(o,i),i.layers.mask=u,o.background=c,n.shadowMap.autoUpdate=l}},Qf=`#include <common>
#include <packing>
#include <dithering_pars_fragment>
#define packFloatToRGBA(v) packDepthToRGBA(v)
#define unpackRGBAToFloat(v) unpackRGBAToDepth(v)
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#if DEPTH_PACKING == 3201
uniform lowp sampler2D depthBuffer;
#elif defined(GL_FRAGMENT_PRECISION_HIGH)
uniform highp sampler2D depthBuffer;
#else
uniform mediump sampler2D depthBuffer;
#endif
uniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;vec4 sRGBToLinear(const in vec4 value){return vec4(mix(pow(value.rgb*0.9478672986+vec3(0.0521327014),vec3(2.4)),value.rgb*0.0773993808,vec3(lessThanEqual(value.rgb,vec3(0.04045)))),value.a);}float readDepth(const in vec2 uv){
#if DEPTH_PACKING == 3201
float depth=unpackRGBAToDepth(texture2D(depthBuffer,uv));
#else
float depth=texture2D(depthBuffer,uv).r;
#endif
#if defined(USE_LOGARITHMIC_DEPTH_BUFFER) || defined(LOG_DEPTH)
float d=pow(2.0,depth*log2(cameraFar+1.0))-1.0;float a=cameraFar/(cameraFar-cameraNear);float b=cameraFar*cameraNear/(cameraNear-cameraFar);depth=a+b/d;
#elif defined(USE_REVERSED_DEPTH_BUFFER)
depth=1.0-depth;
#endif
return depth;}float getViewZ(const in float depth){
#ifdef PERSPECTIVE_CAMERA
return perspectiveDepthToViewZ(depth,cameraNear,cameraFar);
#else
return orthographicDepthToViewZ(depth,cameraNear,cameraFar);
#endif
}vec3 RGBToHCV(const in vec3 RGB){vec4 P=mix(vec4(RGB.bg,-1.0,2.0/3.0),vec4(RGB.gb,0.0,-1.0/3.0),step(RGB.b,RGB.g));vec4 Q=mix(vec4(P.xyw,RGB.r),vec4(RGB.r,P.yzx),step(P.x,RGB.r));float C=Q.x-min(Q.w,Q.y);float H=abs((Q.w-Q.y)/(6.0*C+EPSILON)+Q.z);return vec3(H,C,Q.x);}vec3 RGBToHSL(const in vec3 RGB){vec3 HCV=RGBToHCV(RGB);float L=HCV.z-HCV.y*0.5;float S=HCV.y/(1.0-abs(L*2.0-1.0)+EPSILON);return vec3(HCV.x,S,L);}vec3 HueToRGB(const in float H){float R=abs(H*6.0-3.0)-1.0;float G=2.0-abs(H*6.0-2.0);float B=2.0-abs(H*6.0-4.0);return clamp(vec3(R,G,B),0.0,1.0);}vec3 HSLToRGB(const in vec3 HSL){vec3 RGB=HueToRGB(HSL.x);float C=(1.0-abs(2.0*HSL.z-1.0))*HSL.y;return(RGB-0.5)*C+HSL.z;}FRAGMENT_HEAD void main(){FRAGMENT_MAIN_UV vec4 color0=texture2D(inputBuffer,UV);vec4 color1=vec4(0.0);FRAGMENT_MAIN_IMAGE color0.a=clamp(color0.a,0.0,1.0);gl_FragColor=color0;
#ifdef ENCODE_OUTPUT
#include <colorspace_fragment>
#endif
#include <dithering_fragment>
}`,Zf="uniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;VERTEX_HEAD void main(){vUv=position.xy*0.5+0.5;VERTEX_MAIN_SUPPORT gl_Position=vec4(position.xy,1.0,1.0);}",ed=class extends pn{constructor(n,t,e,r,a=!1){super({name:"EffectMaterial",defines:{THREE_REVISION:Pu.replace(/\D+/g,""),DEPTH_PACKING:"0",ENCODE_OUTPUT:"1"},uniforms:{inputBuffer:new Re(null),depthBuffer:new Re(null),resolution:new Re(new Ae),texelSize:new Re(new Ae),cameraNear:new Re(.3),cameraFar:new Re(1e3),aspect:new Re(1),time:new Re(0)},blending:_r,toneMapped:!1,depthWrite:!1,depthTest:!1,dithering:a}),n&&this.setShaderParts(n),t&&this.setDefines(t),e&&this.setUniforms(e),this.copyCameraSettings(r)}set inputBuffer(n){this.uniforms.inputBuffer.value=n}setInputBuffer(n){this.uniforms.inputBuffer.value=n}get depthBuffer(){return this.uniforms.depthBuffer.value}set depthBuffer(n){this.uniforms.depthBuffer.value=n}get depthPacking(){return Number(this.defines.DEPTH_PACKING)}set depthPacking(n){this.defines.DEPTH_PACKING=n.toFixed(0),this.needsUpdate=!0}setDepthBuffer(n,t=Ya){this.depthBuffer=n,this.depthPacking=t}setShaderData(n){this.setShaderParts(n.shaderParts),this.setDefines(n.defines),this.setUniforms(n.uniforms),this.setExtensions(n.extensions)}setShaderParts(n){return this.fragmentShader=Qf.replace(Se.FRAGMENT_HEAD,n.get(Se.FRAGMENT_HEAD)||"").replace(Se.FRAGMENT_MAIN_UV,n.get(Se.FRAGMENT_MAIN_UV)||"").replace(Se.FRAGMENT_MAIN_IMAGE,n.get(Se.FRAGMENT_MAIN_IMAGE)||""),this.vertexShader=Zf.replace(Se.VERTEX_HEAD,n.get(Se.VERTEX_HEAD)||"").replace(Se.VERTEX_MAIN_SUPPORT,n.get(Se.VERTEX_MAIN_SUPPORT)||""),this.needsUpdate=!0,this}setDefines(n){for(const t of n.entries())this.defines[t[0]]=t[1];return this.needsUpdate=!0,this}setUniforms(n){for(const t of n.entries())this.uniforms[t[0]]=t[1];return this}setExtensions(n){this.extensions={};for(const t of n)this.extensions[t]=!0;return this}get encodeOutput(){return this.defines.ENCODE_OUTPUT!==void 0}set encodeOutput(n){this.encodeOutput!==n&&(n?this.defines.ENCODE_OUTPUT="1":delete this.defines.ENCODE_OUTPUT,this.needsUpdate=!0)}isOutputEncodingEnabled(n){return this.encodeOutput}setOutputEncodingEnabled(n){this.encodeOutput=n}get time(){return this.uniforms.time.value}set time(n){this.uniforms.time.value=n}setDeltaTime(n){this.uniforms.time.value+=n}adoptCameraSettings(n){this.copyCameraSettings(n)}copyCameraSettings(n){n&&(this.uniforms.cameraNear.value=n.near,this.uniforms.cameraFar.value=n.far,n instanceof Rh?this.defines.PERSPECTIVE_CAMERA="1":delete this.defines.PERSPECTIVE_CAMERA,this.needsUpdate=!0)}setSize(n,t){const e=this.uniforms;e.resolution.value.set(n,t),e.texelSize.value.set(1/n,1/t),e.aspect.value=n/t}static get Section(){return Se}};function Rs(n,t,e){for(const r of t){const a="$1"+n+r.charAt(0).toUpperCase()+r.slice(1),o=new RegExp("([^\\.])(\\b"+r+"\\b)","g");for(const i of e.entries())i[1]!==null&&e.set(i[0],i[1].replace(o,a))}}function td(n,t,e){let r=t.getFragmentShader(),a=t.getVertexShader();const o=r!==void 0&&/mainImage/.test(r),i=r!==void 0&&/mainUv/.test(r);if(e.attributes|=t.getAttributes(),r===void 0)throw new Error(`Missing fragment shader (${t.name})`);if(i&&(e.attributes&In.CONVOLUTION)!==0)throw new Error(`Effects that transform UVs are incompatible with convolution effects (${t.name})`);if(!o&&!i)throw new Error(`Could not find mainImage or mainUv function (${t.name})`);{const s=/\w+\s+(\w+)\([\w\s,]*\)\s*{/g,u=e.shaderParts;let c=u.get(Se.FRAGMENT_HEAD)||"",l=u.get(Se.FRAGMENT_MAIN_UV)||"",h=u.get(Se.FRAGMENT_MAIN_IMAGE)||"",f=u.get(Se.VERTEX_HEAD)||"",d=u.get(Se.VERTEX_MAIN_SUPPORT)||"";const p=new Set,v=new Set;if(i&&(l+=`	${n}MainUv(UV);
`,e.uvTransformation=!0),a!==null&&/mainSupport/.test(a)){const y=/mainSupport *\([\w\s]*?uv\s*?\)/.test(a);d+=`	${n}MainSupport(`,d+=y?`vUv);
`:`);
`;for(const b of a.matchAll(/(?:varying\s+\w+\s+([\S\s]*?);)/g))for(const x of b[1].split(/\s*,\s*/))e.varyings.add(x),p.add(x),v.add(x);for(const b of a.matchAll(s))v.add(b[1])}for(const y of r.matchAll(s))v.add(y[1]);for(const y of t.defines.keys())v.add(y.replace(/\([\w\s,]*\)/g,""));for(const y of t.uniforms.keys())v.add(y);v.delete("while"),v.delete("for"),v.delete("if"),t.uniforms.forEach((y,b)=>e.uniforms.set(n+b.charAt(0).toUpperCase()+b.slice(1),y)),t.defines.forEach((y,b)=>e.defines.set(n+b.charAt(0).toUpperCase()+b.slice(1),y));const m=new Map([["fragment",r],["vertex",a]]);Rs(n,v,e.defines),Rs(n,v,m),r=m.get("fragment"),a=m.get("vertex");const g=t.blendMode;if(e.blendModes.set(g.blendFunction,g),o){t.inputColorSpace!==null&&t.inputColorSpace!==e.colorSpace&&(h+=t.inputColorSpace===at?`color0 = sRGBTransferOETF(color0);
	`:`color0 = sRGBToLinear(color0);
	`),t.outputColorSpace!==Fu?e.colorSpace=t.outputColorSpace:t.inputColorSpace!==null&&(e.colorSpace=t.inputColorSpace);const y=/MainImage *\([\w\s,]*?depth[\w\s,]*?\)/;h+=`${n}MainImage(color0, UV, `,(e.attributes&In.DEPTH)!==0&&y.test(r)&&(h+="depth, ",e.readDepth=!0),h+=`color1);
	`;const b=n+"BlendOpacity";e.uniforms.set(b,g.opacity),h+=`color0 = blend${g.blendFunction}(color0, color1, ${b});

	`,c+=`uniform float ${b};

`}if(c+=r+`
`,a!==null&&(f+=a+`
`),u.set(Se.FRAGMENT_HEAD,c),u.set(Se.FRAGMENT_MAIN_UV,l),u.set(Se.FRAGMENT_MAIN_IMAGE,h),u.set(Se.VERTEX_HEAD,f),u.set(Se.VERTEX_MAIN_SUPPORT,d),t.extensions!==null)for(const y of t.extensions)e.extensions.add(y)}}var nd=class extends Gt{constructor(n,...t){super("EffectPass"),this.fullscreenMaterial=new ed(null,null,null,n),this.listener=e=>this.handleEvent(e),this.effects=[],this.setEffects(t),this.skipRendering=!1,this.minTime=1,this.maxTime=Number.POSITIVE_INFINITY,this.timeScale=1}set mainScene(n){for(const t of this.effects)t.mainScene=n}set mainCamera(n){this.fullscreenMaterial.copyCameraSettings(n);for(const t of this.effects)t.mainCamera=n}get encodeOutput(){return this.fullscreenMaterial.encodeOutput}set encodeOutput(n){this.fullscreenMaterial.encodeOutput=n}get dithering(){return this.fullscreenMaterial.dithering}set dithering(n){const t=this.fullscreenMaterial;t.dithering=n,t.needsUpdate=!0}setEffects(n){for(const t of this.effects)t.removeEventListener("change",this.listener);this.effects=n.sort((t,e)=>e.attributes-t.attributes);for(const t of this.effects)t.addEventListener("change",this.listener)}updateMaterial(){const n=new Yh;let t=0;for(const i of this.effects)if(i.blendMode.blendFunction===Ce.DST)n.attributes|=i.getAttributes()&In.DEPTH;else{if((n.attributes&i.getAttributes()&In.CONVOLUTION)!==0)throw new Error(`Convolution effects cannot be merged (${i.name})`);td("e"+t++,i,n)}let e=n.shaderParts.get(Se.FRAGMENT_HEAD),r=n.shaderParts.get(Se.FRAGMENT_MAIN_IMAGE),a=n.shaderParts.get(Se.FRAGMENT_MAIN_UV);const o=/\bblend\b/g;for(const i of n.blendModes.values())e+=i.getShaderCode().replace(o,`blend${i.blendFunction}`)+`
`;(n.attributes&In.DEPTH)!==0?(n.readDepth&&(r=`float depth = readDepth(UV);

	`+r),this.needsDepthTexture=this.getDepthTexture()===null):this.needsDepthTexture=!1,n.colorSpace===at&&(r+=`color0 = sRGBToLinear(color0);
	`),n.uvTransformation?(a=`vec2 transformedUv = vUv;
`+a,n.defines.set("UV","transformedUv")):n.defines.set("UV","vUv"),n.shaderParts.set(Se.FRAGMENT_HEAD,e),n.shaderParts.set(Se.FRAGMENT_MAIN_IMAGE,r),n.shaderParts.set(Se.FRAGMENT_MAIN_UV,a);for(const[i,s]of n.shaderParts)s!==null&&n.shaderParts.set(i,s.trim().replace(/^#/,`
#`));this.skipRendering=t===0,this.needsSwap=!this.skipRendering,this.fullscreenMaterial.setShaderData(n)}recompile(){this.updateMaterial()}getDepthTexture(){return this.fullscreenMaterial.depthBuffer}setDepthTexture(n,t=Ya){this.fullscreenMaterial.depthBuffer=n,this.fullscreenMaterial.depthPacking=t;for(const e of this.effects)e.setDepthTexture(n,t)}render(n,t,e,r,a){for(const o of this.effects)o.update(n,t,r);if(!this.skipRendering||this.renderToScreen){const o=this.fullscreenMaterial;o.inputBuffer=t.texture,o.time+=r*this.timeScale,n.setRenderTarget(this.renderToScreen?null:e),n.render(this.scene,this.camera)}}setSize(n,t){this.fullscreenMaterial.setSize(n,t);for(const e of this.effects)e.setSize(n,t)}initialize(n,t,e){this.renderer=n;for(const r of this.effects)r.initialize(n,t,e);this.updateMaterial(),e!==void 0&&e!==Xn&&(this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}dispose(){super.dispose();for(const n of this.effects)n.removeEventListener("change",this.listener),n.dispose()}handleEvent(n){n.type==="change"&&this.recompile()}};var Hu=function(n,t){return(Hu=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,r){e.__proto__=r}||function(e,r){for(var a in r)r.hasOwnProperty(a)&&(e[a]=r[a])})(n,t)};function Ht(n,t){function e(){this.constructor=n}Hu(n,t),n.prototype=t===null?Object.create(t):(e.prototype=t.prototype,new e)}function $(n,t,e,r){return new(e||(e=Promise))((function(a,o){function i(c){try{u(r.next(c))}catch(l){o(l)}}function s(c){try{u(r.throw(c))}catch(l){o(l)}}function u(c){c.done?a(c.value):new e((function(l){l(c.value)})).then(i,s)}u((r=r.apply(n,[])).next())}))}function J(n,t){var e,r,a,o,i={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},typeof Symbol=="function"&&(o[Symbol.iterator]=function(){return this}),o;function s(u){return function(c){return(function(l){if(e)throw new TypeError("Generator is already executing.");for(;i;)try{if(e=1,r&&(a=2&l[0]?r.return:l[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,l[1])).done)return a;switch(r=0,a&&(l=[2&l[0],a.value]),l[0]){case 0:case 1:a=l;break;case 4:return i.label++,{value:l[1],done:!1};case 5:i.label++,r=l[1],l=[0];continue;case 7:l=i.ops.pop(),i.trys.pop();continue;default:if(!(a=(a=i.trys).length>0&&a[a.length-1])&&(l[0]===6||l[0]===2)){i=0;continue}if(l[0]===3&&(!a||l[1]>a[0]&&l[1]<a[3])){i.label=l[1];break}if(l[0]===6&&i.label<a[1]){i.label=a[1],a=l;break}if(a&&i.label<a[2]){i.label=a[2],i.ops.push(l);break}a[2]&&i.ops.pop(),i.trys.pop();continue}l=t.call(n,i)}catch(h){l=[6,h],r=0}finally{e=a=0}if(5&l[0])throw l[1];return{value:l[0]?l[1]:void 0,done:!0}})([u,c])}}}var rd=(function(){function n(t){this.global=t,this.flags={},this.flagRegistry={},this.urlFlags={},this.populateURLFlags()}return n.prototype.setPlatform=function(t,e){this.platform!=null&&console.warn("Platform "+this.platformName+" has already been set. Overwriting the platform with "+e+"."),this.platformName=t,this.platform=e},n.prototype.registerFlag=function(t,e,r){if(this.flagRegistry[t]={evaluationFn:e,setHook:r},this.urlFlags[t]!=null){var a=this.urlFlags[t];console.warn("Setting feature override from URL "+t+": "+a+"."),this.set(t,a)}},n.prototype.get=function(t){return t in this.flags?this.flags[t]:(this.flags[t]=this.evaluateFlag(t),this.flags[t])},n.prototype.getNumber=function(t){return this.get(t)},n.prototype.getBool=function(t){return this.get(t)},n.prototype.getFlags=function(){return this.flags},Object.defineProperty(n.prototype,"features",{get:function(){return this.flags},enumerable:!0,configurable:!0}),n.prototype.set=function(t,e){if(this.flagRegistry[t]==null)throw new Error("Cannot set flag "+t+" as it has not been registered.");this.flags[t]=e,this.flagRegistry[t].setHook!=null&&this.flagRegistry[t].setHook(e)},n.prototype.evaluateFlag=function(t){if(this.flagRegistry[t]==null)throw new Error("Cannot evaluate flag '"+t+"': no evaluation function found.");return this.flagRegistry[t].evaluationFn()},n.prototype.setFlags=function(t){this.flags=Object.assign({},t)},n.prototype.reset=function(){this.flags={},this.urlFlags={},this.populateURLFlags()},n.prototype.populateURLFlags=function(){var t=this;if(this.global!==void 0&&this.global.location!==void 0&&this.global.location.search!==void 0){var e,r,a=(e=this.global.location.search,r={},e.replace(/[?&]([^=?&]+)(?:=([^&]*))?/g,(function(o){for(var i=[],s=1;s<arguments.length;s++)i[s-1]=arguments[s];return ad(r,i[0],i[1]),i.join("=")})),r);"tfjsflags"in a&&a.tfjsflags.split(",").forEach((function(o){var i=o.split(":"),s=i[0],u=i[1];t.urlFlags[s]=(function(c,l){if((l=l.toLowerCase())==="true"||l==="false")return l==="true";if(""+ +l===l)return+l;throw new Error("Could not parse value flag value "+l+" for flag "+c+".")})(s,u)}))}},n})();function ad(n,t,e){n[decodeURIComponent(t)]=decodeURIComponent(e||"")}function W(){return ju}var ju=null,Ra=new Map,jo=new Map;function qu(n,t){var e=Ku(n,t);return Ra.get(e)}function od(n){return jo.get(n)}function Is(n){for(var t=Ra.entries(),e=[];;){var r=t.next(),a=r.done,o=r.value;if(a)break;var i=o[0],s=o[1];i.split("_")[0]===n&&e.push(s)}return e}function Xu(n){var t=n.kernelName,e=n.backendName,r=Ku(t,e);if(Ra.has(r))throw new Error("The kernel '"+t+"' for backend '"+e+"' is already registered");Ra.set(r,n)}function id(n){var t=n.kernelName;jo.has(t)&&console.warn("Overriding the gradient for '"+t+"'"),jo.set(t,n)}function Ku(n,t){return t+"_"+n}function qo(n,t,e){return Math.max(n,Math.min(t,e))}function Yu(n){return n%2==0?n:n+1}function sd(n){for(var t=0,e=0;e<n.length;e++)t+=n[e];return t}function I(n,t){if(!n)throw new Error(typeof t=="string"?t:t())}function ke(n,t,e){e===void 0&&(e=""),I(Qe(n,t),(function(){return e+" Shapes "+n+" and "+t+" must match"}))}function Sr(n){I(n!=null,(function(){return"The input to the tensor constructor must be a non-null value."}))}function br(n,t,e){if(t===void 0&&(t=[]),e===void 0&&(e=!1),t==null&&(t=[]),Array.isArray(n)||tn(n)&&!e)for(var r=0;r<n.length;++r)br(n[r],t,e);else t.push(n);return t}function Z(n){if(n.length===0)return 1;for(var t=n[0],e=1;e<n.length;e++)t*=n[e];return t}function Qe(n,t){if(n===t)return!0;if(n==null||t==null||n.length!==t.length)return!1;for(var e=0;e<n.length;e++)if(n[e]!==t[e])return!1;return!0}function ze(n){return n%1==0}function ud(n){if(Math.tanh!=null)return Math.tanh(n);if(n===1/0)return 1;if(n===-1/0)return-1;var t=Math.exp(2*n);return(t-1)/(t+1)}function Xo(n){var t=Math.ceil(Math.sqrt(n));return[t,Math.ceil(n/t)]}function fr(n,t){return t<=n.length?n:n+" ".repeat(t-n.length)}function ks(n,t,e){return t===void 0&&(t=function(r){return 0}),new Promise((function(r,a){var o=0,i=function(){if(n())r();else{o++;var s=t(o);e!=null&&o>=e?a():setTimeout(i,s)}};i()}))}function cd(n,t){for(var e=1,r=-1,a=0;a<n.length;++a)if(n[a]>=0)e*=n[a];else if(n[a]===-1){if(r!==-1)throw Error("Shapes can only have 1 implicit size. Found -1 at dim "+r+" and dim "+a);r=a}else if(n[a]<0)throw Error("Shapes can not be < 0. Found "+n[a]+" at dim "+a);if(r===-1){if(t>0&&t!==e)throw Error("Size("+t+") must match the product of shape "+n);return n}if(e===0)throw Error("Cannot infer the missing size in ["+n+"] when there are 0 elements");if(t%e!=0)throw Error("The implicit shape can't be a fractional number. Got "+t+" / "+e);var o=n.slice();return o[r]=t/e,o}function Ke(n,t){var e=t.length;return I((n=n==null?t.map((function(r,a){return a})):[].concat(n)).every((function(r){return r>=-e&&r<e})),(function(){return"All values in axis param must be in range [-"+e+", "+e+") but got axis "+n})),I(n.every((function(r){return ze(r)})),(function(){return"All values in axis param must be integers but got axis "+n})),n.map((function(r){return r<0?e+r:r}))}function Gn(n,t){for(var e=[],r=[],a=t!=null&&Array.isArray(t)&&t.length===0,o=t==null||a?null:Ke(t,n).sort(),i=0,s=0;s<n.length;++s){if(o!=null){if(o[i]===s&&n[s]!==1)throw new Error("Can't squeeze axis "+s+" since its dim '"+n[s]+"' is not 1");(o[i]==null||o[i]>s)&&n[s]===1&&(e.push(n[s]),r.push(s)),o[i]<=s&&i++}n[s]!==1&&(e.push(n[s]),r.push(s))}return{newShape:e,keptDims:r}}function Br(n,t){var e=null;if(n==null||n==="float32")e=new Float32Array(t);else if(n==="int32")e=new Int32Array(t);else{if(n!=="bool")throw new Error("Unknown data type "+n);e=new Uint8Array(t)}return e}function Ia(n,t){var e=null;if(n==null||n==="float32")e=new Float32Array(t);else if(n==="int32")e=new Int32Array(t);else if(n==="bool")e=new Uint8Array(t);else{if(n!=="string")throw new Error("Unknown data type "+n);e=new Array(t)}return e}function ld(n,t){for(var e=0;e<n.length;e++){var r=n[e];if(isNaN(r)||!isFinite(r))throw Error("A tensor of type "+t+" being uploaded contains "+r+".")}}function hd(n){return n==="bool"||n==="complex64"||n==="float32"||n==="int32"||n==="string"}function fd(n,t){return t!=="complex64"&&(t!=="float32"||n==="complex64")&&(t!=="int32"||n==="float32"||n==="complex64")&&(t!=="bool"||n!=="bool")}function tn(n){return n instanceof Float32Array||n instanceof Int32Array||n instanceof Uint8Array}function $u(n){if(n==="float32"||n==="int32")return 4;if(n==="complex64")return 8;if(n==="bool")return 1;throw new Error("Unknown dtype "+n)}function dd(n){if(n==null)return 0;var t=0;return n.forEach((function(e){return t+=e.length})),t}function yi(n){return typeof n=="string"||n instanceof String}function pd(n){return typeof n=="boolean"}function vd(n){return typeof n=="number"}function Gr(n){return Array.isArray(n)?Gr(n[0]):n instanceof Float32Array?"float32":n instanceof Int32Array||n instanceof Uint8Array?"int32":vd(n)?"float32":yi(n)?"string":pd(n)?"bool":"float32"}function Ko(n){return!!(n&&n.constructor&&n.call&&n.apply)}function Yo(n,t){for(var e=t;e<n;++e)if(n%e==0)return e;return n}function nn(n){var t=n.length;if(t<2)return[];var e=new Array(t-1);e[t-2]=n[t-1];for(var r=t-3;r>=0;--r)e[r]=e[r+1]*n[r+1];return e}function Ju(n,t,e){if(t==="string")throw new Error("Cannot convert a string[] to a TypedArray");if(Array.isArray(n)&&(n=br(n)),e&&ld(n,t),(function(o,i){return o instanceof Float32Array&&i==="float32"||o instanceof Int32Array&&i==="int32"||o instanceof Uint8Array&&i==="bool"})(n,t))return n;if(t==null||t==="float32"||t==="complex64")return new Float32Array(n);if(t==="int32")return new Int32Array(n);if(t==="bool"){for(var r=new Uint8Array(n.length),a=0;a<r.length;++a)Math.round(n[a])!==0&&(r[a]=1);return r}throw new Error("Unknown data type "+t)}function Ts(n,t){if(n.length===0)return t[0];var e=n.reduce((function(r,a){return r*a}));if(e===0)return[];if(e!==t.length)throw new Error("["+n+"] does not match the input size.");return(function r(a,o,i){var s=new Array;if(o.length===1)for(var u=o[0],c=0;c<u;c++)s[c]=i[a+c];else{u=o[0];var l=o.slice(1),h=l.reduce((function(f,d){return f*d}));for(c=0;c<u;c++)s[c]=r(a+c*h,l,i)}return s})(0,n,t)}function Qu(n,t){for(var e=Hr(n,t),r=0;r<e.length;r++)e[r]=1;return e}function Hr(n,t){if(t==null||t==="float32"||t==="complex64")return new Float32Array(n);if(t==="int32")return new Int32Array(n);if(t==="bool")return new Uint8Array(n);throw new Error("Unknown data type "+t)}function $t(){return W().platform.now()}function Zu(n){n.forEach((function(t){I(Number.isInteger(t)&&t>=0,(function(){return"Tensor must have a shape comprised of positive integers but got shape ["+n+"]."}))}))}function md(n,t){return t===void 0&&(t="utf-8"),t=t||"utf-8",W().platform.encode(n,t)}function ka(n,t){return t===void 0&&(t="utf-8"),t=t||"utf-8",W().platform.decode(n,t)}function As(n,t,e){if(t===0)return 0;if(t===1)return n[0];for(var r=n[n.length-1],a=0;a<n.length-1;++a)r+=e[a]*n[a];return r}function gd(n,t,e){if(t===0)return[];if(t===1)return[n];for(var r=new Array(t),a=0;a<r.length-1;++a)r[a]=Math.floor(n/e[a]),n-=r[a]*e[a];return r[r.length-1]=n,r}var yd=(function(){function n(t,e){this.backendTimer=t,this.logger=e,e==null&&(this.logger=new xd)}return n.prototype.profileKernel=function(t,e,r){var a,o=this,i=this.backendTimer.time((function(){a=r()}));return a.forEach((function(s){s.data().then((function(u){(function(c,l,h){if(l!=="float32")return!1;for(var f=0;f<c.length;f++){var d=c[f];if(isNaN(d)||!isFinite(d))return console.warn("Found "+d+" in the result of '"+h+"'"),!0}})(u,s.dtype,t),i.then((function(c){var l="";c.getExtraProfileInfo!=null&&(l=c.getExtraProfileInfo()),o.logger.logKernelProfile(t,s,u,c.kernelMs,e,l)}))}))})),a},n})(),xd=(function(){function n(){}return n.prototype.logKernelProfile=function(t,e,r,a,o,i){var s=typeof a=="number"?fr(a+"ms",9):a.error,u=fr(t,25),c=e.rank,l=e.size,h=fr(e.shape.toString(),14),f="";for(var d in o){var p=o[d].shape||e.shape,v=p.length;f+=d+": "+v+"D "+(v>0?p:"")+" "}console.log("%c"+u+"	%c"+s+"	%c"+c+"D "+h+"	%c"+l+"	%c"+f+"	%c"+i,"font-weight:bold","color:red","color:blue","color: orange","color: green","color: steelblue")},n})(),Ds=20,kr=3,mo=7;function bd(n,t,e,r){var a=nn(t),o=(function(c,l,h,f){var d=Z(l),p=f[f.length-1],v=new Array(p).fill(0),m=l.length,g=h==="complex64"?Ar(c):c;if(m>1)for(var y=0;y<d/p;y++)for(var b=y*p,x=0;x<p;x++)v[x]=Math.max(v[x],Tr(g[b+x],0,h).length);return v})(n,t,e,a),i=t.length,s=(function c(l,h,f,d,p,v){v===void 0&&(v=!0);var m=f==="complex64"?2:1,g=h[0],y=h.length;if(y===0)return f==="complex64"?[Tr(Ar(l)[0],0,f)]:f==="bool"?[ec(l[0])]:[l[0].toString()];if(y===1){if(g>Ds){var b=kr*m,x=Array.from(l.slice(0,b)),w=Array.from(l.slice((g-kr)*m,g*m));return f==="complex64"&&(x=Ar(x),w=Ar(w)),["["+x.map((function(F,V){return Tr(F,p[V],f)})).join(", ")+", ..., "+w.map((function(F,V){return Tr(F,p[g-kr+V],f)})).join(", ")+"]"]}return["["+(f==="complex64"?Ar(l):Array.from(l)).map((function(F,V){return Tr(F,p[V],f)})).join(", ")+"]"]}var C=h.slice(1),k=d.slice(1),S=d[0]*m,_=[];if(g>Ds){for(var R=0;R<kr;R++){var D=(A=R*S)+S;_.push.apply(_,c(l.slice(A,D),C,f,k,p,!1))}for(_.push("..."),R=g-kr;R<g;R++)D=(A=R*S)+S,_.push.apply(_,c(l.slice(A,D),C,f,k,p,R===g-1))}else for(R=0;R<g;R++){var A;D=(A=R*S)+S,_.push.apply(_,c(l.slice(A,D),C,f,k,p,R===g-1))}var O=y===2?",":"";for(_[0]="["+_[0]+O,R=1;R<_.length-1;R++)_[R]=" "+_[R]+O;var P=`,
`;for(R=2;R<y;R++)P+=`
`;return _[_.length-1]=" "+_[_.length-1]+"]"+(v?"":P),_})(n,t,e,a,o),u=["Tensor"];return r&&(u.push("  dtype: "+e),u.push("  rank: "+i),u.push("  shape: ["+t+"]"),u.push("  values:")),u.push(s.map((function(c){return"    "+c})).join(`
`)),u.join(`
`)}function Tr(n,t,e){return fr(Array.isArray(n)?parseFloat(n[0].toFixed(mo))+" + "+parseFloat(n[1].toFixed(mo))+"j":yi(n)?"'"+n+"'":e==="bool"?ec(n):parseFloat(n.toFixed(mo)).toString(),t)}function ec(n){return n===0?"false":"true"}function Ar(n){for(var t=[],e=0;e<n.length;e+=2)t.push([n[e],n[e+1]]);return t}var Or=(function(){function n(t,e,r){var a=this;if(this.dtype=e,this.shape=t.slice(),this.size=Z(t),r!=null){var o=r.length;I(o===this.size,(function(){return"Length of values '"+o+"' does not match the size inferred by the shape '"+a.size+"'."}))}if(e==="complex64")throw new Error("complex64 dtype TensorBuffers are not supported. Please create a TensorBuffer for the real and imaginary parts separately and call tf.complex(real, imag).");this.values=r||Ia(e,this.size),this.strides=nn(t)}return n.prototype.set=function(t){for(var e=this,r=[],a=1;a<arguments.length;a++)r[a-1]=arguments[a];r.length===0&&(r=[0]),I(r.length===this.rank,(function(){return"The number of provided coordinates ("+r.length+") must match the rank ("+e.rank+")"}));var o=this.locToIndex(r);this.values[o]=t},n.prototype.get=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];t.length===0&&(t=[0]);for(var r=0,a=0,o=t;a<o.length;a++){var i=o[a];if(i<0||i>=this.shape[r]){var s="Requested out of range element at "+t+".   Buffer shape="+this.shape;throw new Error(s)}r++}for(var u=t[t.length-1],c=0;c<t.length-1;++c)u+=this.strides[c]*t[c];return this.values[u]},n.prototype.locToIndex=function(t){if(this.rank===0)return 0;if(this.rank===1)return t[0];for(var e=t[t.length-1],r=0;r<t.length-1;++r)e+=this.strides[r]*t[r];return e},n.prototype.indexToLoc=function(t){if(this.rank===0)return[];if(this.rank===1)return[t];for(var e=new Array(this.shape.length),r=0;r<e.length-1;++r)e[r]=Math.floor(t/this.strides[r]),t-=e[r]*this.strides[r];return e[e.length-1]=t,e},Object.defineProperty(n.prototype,"rank",{get:function(){return this.shape.length},enumerable:!0,configurable:!0}),n.prototype.toTensor=function(){return Jt().makeTensor(this.values,this.shape,this.dtype)},n})(),Jt=null,B=null,tc=null,Be=(function(){function n(t,e,r,a){this.kept=!1,this.isDisposedInternal=!1,this.shape=t.slice(),this.dtype=e||"float32",this.size=Z(t),this.strides=nn(t),this.dataId=r,this.id=a,this.rankType=this.rank<5?this.rank.toString():"higher"}return n.prototype.flatten=function(){return this.throwIfDisposed(),this.as1D()},n.prototype.asScalar=function(){return this.throwIfDisposed(),I(this.size===1,(function(){return"The array must have only 1 element."})),this.reshape([])},n.prototype.as1D=function(){return this.throwIfDisposed(),this.reshape([this.size])},n.prototype.as2D=function(t,e){return this.throwIfDisposed(),this.reshape([t,e])},n.prototype.as3D=function(t,e,r){return this.throwIfDisposed(),this.reshape([t,e,r])},n.prototype.as4D=function(t,e,r,a){return this.throwIfDisposed(),this.reshape([t,e,r,a])},n.prototype.as5D=function(t,e,r,a,o){return this.throwIfDisposed(),this.reshape([t,e,r,a,o])},n.prototype.asType=function(t){return this.throwIfDisposed(),B.cast(this,t)},Object.defineProperty(n.prototype,"rank",{get:function(){return this.shape.length},enumerable:!0,configurable:!0}),n.prototype.buffer=function(){return $(this,void 0,void 0,(function(){var t;return J(this,(function(e){switch(e.label){case 0:return[4,this.data()];case 1:return t=e.sent(),[2,B.buffer(this.shape,this.dtype,t)]}}))}))},n.prototype.bufferSync=function(){return B.buffer(this.shape,this.dtype,this.dataSync())},n.prototype.array=function(){return $(this,void 0,void 0,(function(){var t;return J(this,(function(e){switch(e.label){case 0:return[4,this.data()];case 1:return t=e.sent(),[2,Ts(this.shape,t)]}}))}))},n.prototype.arraySync=function(){return Ts(this.shape,this.dataSync())},n.prototype.data=function(){return $(this,void 0,void 0,(function(){var t,e;return J(this,(function(r){switch(r.label){case 0:return this.throwIfDisposed(),t=Jt().read(this.dataId),this.dtype!=="string"?[3,2]:[4,t];case 1:e=r.sent();try{return[2,e.map((function(a){return ka(a)}))]}catch{throw new Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}r.label=2;case 2:return[2,t]}}))}))},n.prototype.dataSync=function(){this.throwIfDisposed();var t=Jt().readSync(this.dataId);if(this.dtype==="string")try{return t.map((function(e){return ka(e)}))}catch{throw new Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}return t},n.prototype.bytes=function(){return $(this,void 0,void 0,(function(){var t;return J(this,(function(e){switch(e.label){case 0:return this.throwIfDisposed(),[4,Jt().read(this.dataId)];case 1:return t=e.sent(),this.dtype==="string"?[2,t]:[2,new Uint8Array(t.buffer)]}}))}))},n.prototype.dispose=function(){this.isDisposed||(Jt().disposeTensor(this),this.isDisposedInternal=!0)},Object.defineProperty(n.prototype,"isDisposed",{get:function(){return this.isDisposedInternal},enumerable:!0,configurable:!0}),n.prototype.throwIfDisposed=function(){if(this.isDisposed)throw new Error("Tensor is disposed.")},n.prototype.toFloat=function(){return this.asType("float32")},n.prototype.toInt=function(){return this.asType("int32")},n.prototype.toBool=function(){return this.asType("bool")},n.prototype.print=function(t){return t===void 0&&(t=!1),B.print(this,t)},n.prototype.reshape=function(t){return this.throwIfDisposed(),B.reshape(this,t)},n.prototype.reshapeAs=function(t){return this.throwIfDisposed(),this.reshape(t.shape)},n.prototype.expandDims=function(t){return t===void 0&&(t=0),B.expandDims(this,t)},n.prototype.cumsum=function(t,e,r){return t===void 0&&(t=0),e===void 0&&(e=!1),r===void 0&&(r=!1),B.cumsum(this,t,e,r)},n.prototype.squeeze=function(t){return this.throwIfDisposed(),B.squeeze(this,t)},n.prototype.clone=function(){return this.throwIfDisposed(),B.clone(this)},n.prototype.oneHot=function(t,e,r){return this.throwIfDisposed(),B.oneHot(this,t,e,r)},n.prototype.toString=function(t){return t===void 0&&(t=!1),bd(this.dataSync(),this.shape,this.dtype,t)},n.prototype.tile=function(t){return this.throwIfDisposed(),B.tile(this,t)},n.prototype.gather=function(t,e){return e===void 0&&(e=0),this.throwIfDisposed(),B.gather(this,t,e)},n.prototype.matMul=function(t,e,r){return e===void 0&&(e=!1),r===void 0&&(r=!1),this.throwIfDisposed(),B.matMul(this,t,e,r)},n.prototype.dot=function(t){return this.throwIfDisposed(),B.dot(this,t)},n.prototype.norm=function(t,e,r){return t===void 0&&(t="euclidean"),e===void 0&&(e=null),r===void 0&&(r=!1),this.throwIfDisposed(),B.norm(this,t,e,r)},n.prototype.slice=function(t,e){return this.throwIfDisposed(),B.slice(this,t,e)},n.prototype.reverse=function(t){return this.throwIfDisposed(),B.reverse(this,t)},n.prototype.concat=function(t,e){return e===void 0&&(e=0),this.throwIfDisposed(),t instanceof n&&(t=[t]),B.concat([this].concat(t),e)},n.prototype.split=function(t,e){return e===void 0&&(e=0),this.throwIfDisposed(),B.split(this,t,e)},n.prototype.stack=function(t,e){return e===void 0&&(e=0),B.stack([this,t],e)},n.prototype.unstack=function(t){return t===void 0&&(t=0),B.unstack(this,t)},n.prototype.pad=function(t,e){return e===void 0&&(e=0),B.pad(this,t,e)},n.prototype.batchNormalization=function(t,e,r,a,o){return r===void 0&&(r=.001),tc("tf.batchNormalization() is going away. Use tf.batchNorm() instead, and note the positional argument change of scale, offset, and varianceEpsilon"),this.batchNorm(t,e,o,a,r)},n.prototype.batchNorm=function(t,e,r,a,o){return o===void 0&&(o=.001),this.throwIfDisposed(),B.batchNorm(this,t,e,r,a,o)},n.prototype.all=function(t,e){return t===void 0&&(t=null),e===void 0&&(e=!1),this.throwIfDisposed(),B.all(this,t,e)},n.prototype.any=function(t,e){return t===void 0&&(t=null),e===void 0&&(e=!1),this.throwIfDisposed(),B.any(this,t,e)},n.prototype.logSumExp=function(t,e){return t===void 0&&(t=null),e===void 0&&(e=!1),this.throwIfDisposed(),B.logSumExp(this,t,e)},n.prototype.sum=function(t,e){return t===void 0&&(t=null),e===void 0&&(e=!1),this.throwIfDisposed(),B.sum(this,t,e)},n.prototype.prod=function(t,e){return t===void 0&&(t=null),e===void 0&&(e=!1),this.throwIfDisposed(),B.prod(this,t,e)},n.prototype.mean=function(t,e){return t===void 0&&(t=null),e===void 0&&(e=!1),this.throwIfDisposed(),B.mean(this,t,e)},n.prototype.min=function(t,e){return t===void 0&&(t=null),e===void 0&&(e=!1),this.throwIfDisposed(),B.min(this,t,e)},n.prototype.max=function(t,e){return t===void 0&&(t=null),e===void 0&&(e=!1),this.throwIfDisposed(),B.max(this,t,e)},n.prototype.argMin=function(t){return t===void 0&&(t=null),this.throwIfDisposed(),B.argMin(this,t)},n.prototype.argMax=function(t){return t===void 0&&(t=null),this.throwIfDisposed(),B.argMax(this,t)},n.prototype.cast=function(t){return this.throwIfDisposed(),B.cast(this,t)},n.prototype.add=function(t){return this.throwIfDisposed(),B.add(this,t)},n.prototype.addStrict=function(t){return this.throwIfDisposed(),B.addStrict(this,t)},n.prototype.atan2=function(t){return this.throwIfDisposed(),B.atan2(this,t)},n.prototype.sub=function(t){return this.throwIfDisposed(),B.sub(this,t)},n.prototype.subStrict=function(t){return this.throwIfDisposed(),B.subStrict(this,t)},n.prototype.pow=function(t){return this.throwIfDisposed(),B.pow(this,t)},n.prototype.powStrict=function(t){return this.throwIfDisposed(),B.powStrict(this,t)},n.prototype.mul=function(t){return this.throwIfDisposed(),B.mul(this,t)},n.prototype.mulStrict=function(t){return this.throwIfDisposed(),B.mulStrict(this,t)},n.prototype.div=function(t){return this.throwIfDisposed(),B.div(this,t)},n.prototype.divNoNan=function(t){return this.throwIfDisposed(),B.divNoNan(this,t)},n.prototype.floorDiv=function(t){return this.throwIfDisposed(),B.floorDiv(this,t)},n.prototype.divStrict=function(t){return this.throwIfDisposed(),B.divStrict(this,t)},n.prototype.minimum=function(t){return this.throwIfDisposed(),B.minimum(this,t)},n.prototype.minimumStrict=function(t){return this.throwIfDisposed(),B.minimumStrict(this,t)},n.prototype.maximum=function(t){return this.throwIfDisposed(),B.maximum(this,t)},n.prototype.maximumStrict=function(t){return this.throwIfDisposed(),B.maximumStrict(this,t)},n.prototype.mod=function(t){return this.throwIfDisposed(),B.mod(this,t)},n.prototype.modStrict=function(t){return this.throwIfDisposed(),B.modStrict(this,t)},n.prototype.squaredDifferenceStrict=function(t){return this.throwIfDisposed(),B.squaredDifferenceStrict(this,t)},n.prototype.transpose=function(t){return this.throwIfDisposed(),B.transpose(this,t)},n.prototype.notEqual=function(t){return this.throwIfDisposed(),B.notEqual(this,t)},n.prototype.notEqualStrict=function(t){return this.throwIfDisposed(),B.notEqualStrict(this,t)},n.prototype.less=function(t){return this.throwIfDisposed(),B.less(this,t)},n.prototype.lessStrict=function(t){return this.throwIfDisposed(),B.lessStrict(this,t)},n.prototype.equal=function(t){return this.throwIfDisposed(),B.equal(this,t)},n.prototype.equalStrict=function(t){return this.throwIfDisposed(),B.equalStrict(this,t)},n.prototype.lessEqual=function(t){return this.throwIfDisposed(),B.lessEqual(this,t)},n.prototype.lessEqualStrict=function(t){return this.throwIfDisposed(),B.lessEqualStrict(this,t)},n.prototype.greater=function(t){return this.throwIfDisposed(),B.greater(this,t)},n.prototype.greaterStrict=function(t){return this.throwIfDisposed(),B.greaterStrict(this,t)},n.prototype.greaterEqual=function(t){return this.throwIfDisposed(),B.greaterEqual(this,t)},n.prototype.greaterEqualStrict=function(t){return this.throwIfDisposed(),B.greaterEqualStrict(this,t)},n.prototype.logicalAnd=function(t){return this.throwIfDisposed(),B.logicalAnd(this,t)},n.prototype.logicalOr=function(t){return this.throwIfDisposed(),B.logicalOr(this,t)},n.prototype.logicalNot=function(){return this.throwIfDisposed(),B.logicalNot(this)},n.prototype.logicalXor=function(t){return this.throwIfDisposed(),B.logicalXor(this,t)},n.prototype.where=function(t,e){return this.throwIfDisposed(),B.where(t,this,e)},n.prototype.neg=function(){return this.throwIfDisposed(),B.neg(this)},n.prototype.ceil=function(){return this.throwIfDisposed(),B.ceil(this)},n.prototype.floor=function(){return this.throwIfDisposed(),B.floor(this)},n.prototype.sign=function(){return this.throwIfDisposed(),B.sign(this)},n.prototype.isNaN=function(){return this.throwIfDisposed(),B.isNaN(this)},n.prototype.isInf=function(){return this.throwIfDisposed(),B.isInf(this)},n.prototype.isFinite=function(){return this.throwIfDisposed(),B.isFinite(this)},n.prototype.exp=function(){return this.throwIfDisposed(),B.exp(this)},n.prototype.expm1=function(){return this.throwIfDisposed(),B.expm1(this)},n.prototype.log=function(){return this.throwIfDisposed(),B.log(this)},n.prototype.log1p=function(){return this.throwIfDisposed(),B.log1p(this)},n.prototype.sqrt=function(){return this.throwIfDisposed(),B.sqrt(this)},n.prototype.rsqrt=function(){return this.throwIfDisposed(),B.rsqrt(this)},n.prototype.square=function(){return this.throwIfDisposed(),B.square(this)},n.prototype.reciprocal=function(){return this.throwIfDisposed(),B.reciprocal(this)},n.prototype.abs=function(){return this.throwIfDisposed(),B.abs(this)},n.prototype.clipByValue=function(t,e){return this.throwIfDisposed(),B.clipByValue(this,t,e)},n.prototype.relu=function(){return this.throwIfDisposed(),B.relu(this)},n.prototype.relu6=function(){return this.throwIfDisposed(),B.relu6(this)},n.prototype.elu=function(){return this.throwIfDisposed(),B.elu(this)},n.prototype.selu=function(){return this.throwIfDisposed(),B.selu(this)},n.prototype.leakyRelu=function(t){return t===void 0&&(t=.2),this.throwIfDisposed(),B.leakyRelu(this,t)},n.prototype.prelu=function(t){return this.throwIfDisposed(),B.prelu(this,t)},n.prototype.sigmoid=function(){return this.throwIfDisposed(),B.sigmoid(this)},n.prototype.logSigmoid=function(){return this.throwIfDisposed(),B.logSigmoid(this)},n.prototype.softplus=function(){return this.throwIfDisposed(),B.softplus(this)},n.prototype.zerosLike=function(){return this.throwIfDisposed(),B.zerosLike(this)},n.prototype.onesLike=function(){return this.throwIfDisposed(),B.onesLike(this)},n.prototype.sin=function(){return this.throwIfDisposed(),B.sin(this)},n.prototype.cos=function(){return this.throwIfDisposed(),B.cos(this)},n.prototype.tan=function(){return this.throwIfDisposed(),B.tan(this)},n.prototype.asin=function(){return this.throwIfDisposed(),B.asin(this)},n.prototype.acos=function(){return this.throwIfDisposed(),B.acos(this)},n.prototype.atan=function(){return this.throwIfDisposed(),B.atan(this)},n.prototype.sinh=function(){return this.throwIfDisposed(),B.sinh(this)},n.prototype.cosh=function(){return this.throwIfDisposed(),B.cosh(this)},n.prototype.tanh=function(){return this.throwIfDisposed(),B.tanh(this)},n.prototype.asinh=function(){return this.throwIfDisposed(),B.asinh(this)},n.prototype.acosh=function(){return this.throwIfDisposed(),B.acosh(this)},n.prototype.atanh=function(){return this.throwIfDisposed(),B.atanh(this)},n.prototype.erf=function(){return this.throwIfDisposed(),B.erf(this)},n.prototype.round=function(){return this.throwIfDisposed(),B.round(this)},n.prototype.step=function(t){return t===void 0&&(t=0),this.throwIfDisposed(),B.step(this,t)},n.prototype.softmax=function(t){return t===void 0&&(t=-1),this.throwIfDisposed(),B.softmax(this,t)},n.prototype.logSoftmax=function(t){return t===void 0&&(t=-1),this.throwIfDisposed(),B.logSoftmax(this,t)},n.prototype.resizeBilinear=function(t,e){return e===void 0&&(e=!1),this.throwIfDisposed(),B.image.resizeBilinear(this,t,e)},n.prototype.resizeNearestNeighbor=function(t,e){return e===void 0&&(e=!1),this.throwIfDisposed(),B.image.resizeNearestNeighbor(this,t,e)},n.prototype.conv1d=function(t,e,r,a,o,i){return a===void 0&&(a="NWC"),o===void 0&&(o=1),this.throwIfDisposed(),B.conv1d(this,t,e,r,a,o,i)},n.prototype.conv2d=function(t,e,r,a,o,i){return a===void 0&&(a="NHWC"),o===void 0&&(o=[1,1]),this.throwIfDisposed(),B.conv2d(this,t,e,r,a,o,i)},n.prototype.conv2dTranspose=function(t,e,r,a,o){return this.throwIfDisposed(),B.conv2dTranspose(this,t,e,r,a,o)},n.prototype.depthwiseConv2D=function(t,e,r,a,o,i){return a===void 0&&(a="NHWC"),o===void 0&&(o=[1,1]),this.throwIfDisposed(),B.depthwiseConv2d(this,t,e,r,a,o,i)},n.prototype.separableConv2d=function(t,e,r,a,o,i){return o===void 0&&(o=[1,1]),i===void 0&&(i="NHWC"),this.throwIfDisposed(),B.separableConv2d(this,t,e,r,a,o,i)},n.prototype.avgPool=function(t,e,r,a){return this.throwIfDisposed(),B.avgPool(this,t,e,r,a)},n.prototype.maxPool=function(t,e,r,a){return this.throwIfDisposed(),B.maxPool(this,t,e,r,a)},n.prototype.localResponseNormalization=function(t,e,r,a){return t===void 0&&(t=5),e===void 0&&(e=1),r===void 0&&(r=1),a===void 0&&(a=.5),B.localResponseNormalization(this,t,e,r,a)},n.prototype.pool=function(t,e,r,a,o){return this.throwIfDisposed(),B.pool(this,t,e,r,a,o)},n.prototype.variable=function(t,e,r){return t===void 0&&(t=!0),this.throwIfDisposed(),Jt().makeVariable(this,t,e,r)},n.prototype.unsortedSegmentSum=function(t,e){return this.throwIfDisposed(),B.unsortedSegmentSum(this,t,e)},n.prototype.batchToSpaceND=function(t,e){return this.throwIfDisposed(),B.batchToSpaceND(this,t,e)},n.prototype.spaceToBatchND=function(t,e){return this.throwIfDisposed(),B.spaceToBatchND(this,t,e)},n.prototype.topk=function(t,e){return t===void 0&&(t=1),e===void 0&&(e=!0),this.throwIfDisposed(),B.topk(this,t,e)},n.prototype.stridedSlice=function(t,e,r,a,o,i,s,u){return a===void 0&&(a=0),o===void 0&&(o=0),i===void 0&&(i=0),s===void 0&&(s=0),u===void 0&&(u=0),this.throwIfDisposed(),B.stridedSlice(this,t,e,r,a,o,i,s,u)},n.prototype.depthToSpace=function(t,e){return this.throwIfDisposed(),B.depthToSpace(this,t,e)},n.prototype.fft=function(){return this.throwIfDisposed(),B.spectral.fft(this)},n.prototype.ifft=function(){return this.throwIfDisposed(),B.spectral.ifft(this)},n.prototype.rfft=function(){return this.throwIfDisposed(),B.spectral.rfft(this)},n.prototype.irfft=function(){return this.throwIfDisposed(),B.spectral.irfft(this)},n})();Object.defineProperty(Be,Symbol.hasInstance,{value:function(n){return!!n&&n.dataId!=null&&n.shape!=null&&n.dtype!=null}});var Ms,$o,Jo,Qo,Zo,wr=(function(n){function t(e,r,a,o){var i=n.call(this,e.shape,e.dtype,e.dataId,o)||this;return i.trainable=r,i.name=a,i}return Ht(t,n),t.prototype.assign=function(e){if(e.dtype!==this.dtype)throw new Error("dtype of the new value ("+e.dtype+") and previous value ("+this.dtype+") must match");if(!Qe(e.shape,this.shape))throw new Error("shape of the new value ("+e.shape+") and previous value ("+this.shape+") must match");Jt().disposeTensor(this),this.dataId=e.dataId,Jt().incRef(this,null)},t.prototype.dispose=function(){Jt().disposeVariable(this),this.isDisposedInternal=!0},t})(Be);Object.defineProperty(wr,Symbol.hasInstance,{value:function(n){return n instanceof Be&&n.assign!=null&&n.assign instanceof Function}}),(function(n){n.R0="R0",n.R1="R1",n.R2="R2",n.R3="R3",n.R4="R4",n.R5="R5",n.R6="R6"})(Ms||(Ms={})),(function(n){n.float32="float32",n.int32="int32",n.bool="int32",n.complex64="complex64"})($o||($o={})),(function(n){n.float32="float32",n.int32="int32",n.bool="bool",n.complex64="complex64"})(Jo||(Jo={})),(function(n){n.float32="float32",n.int32="float32",n.bool="float32",n.complex64="complex64"})(Qo||(Qo={})),(function(n){n.float32="complex64",n.int32="complex64",n.bool="complex64",n.complex64="complex64"})(Zo||(Zo={}));var wd={float32:Qo,int32:$o,bool:Jo,complex64:Zo};function nt(n,t){if(n==="string"||t==="string"){if(n==="string"&&t==="string")return"string";throw new Error("Can not upcast "+n+" with "+t)}return wd[n][t]}function go(n){return nt(n,"int32")}function Le(n,t){if(n.dtype===t.dtype)return[n,t];var e=nt(n.dtype,t.dtype);return[n.cast(e),t.cast(e)]}function Cd(n,t){I(n.dtype===t.dtype,(function(){return"The dtypes of the first("+n.dtype+") and second("+t.dtype+") input must match"}))}function nc(n){var t=[];return(function e(r,a,o){if(r!=null){if(r instanceof Be)return void a.push(r);if(i=r,!(!Array.isArray(i)&&typeof i!="object")){var i,s=r;for(var u in s){var c=s[u];o.has(c)||(o.add(c),e(c,a,o))}}}})(n,t,new Set),t}var yo,Ns=(function(){function n(){this.registeredVariables={},this.nextTapeNodeId=0,this.numBytes=0,this.numTensors=0,this.numStringTensors=0,this.numDataBuffers=0,this.gradientDepth=0,this.kernelDepth=0,this.scopeStack=[],this.numDataMovesStack=[],this.nextScopeId=0,this.tensorInfo=new WeakMap,this.profiling=!1,this.activeProfile={newBytes:0,newTensors:0,peakBytes:0,kernels:[],result:null}}return n.prototype.dispose=function(){for(var t in this.registeredVariables)this.registeredVariables[t].dispose()},n})(),Ed=(function(){function n(t){this.ENV=t,this.registry={},this.registryFactory={},this.pendingBackendInitId=0,this.state=new Ns}return n.prototype.ready=function(){return $(this,void 0,void 0,(function(){var t,e,r;return J(this,(function(a){switch(a.label){case 0:if(this.pendingBackendInit!=null)return[2,this.pendingBackendInit.then((function(){}))];if(this.backendInstance!=null)return[2];t=this.getSortedBackends(),e=0,a.label=1;case 1:return e<t.length?(r=t[e],[4,this.initializeBackend(r).success]):[3,5];case 2:return a.sent()?[4,this.setBackend(r)]:[3,4];case 3:return a.sent(),[2];case 4:return e++,[3,1];case 5:throw new Error("Could not initialize any backends, all backend initializations failed.")}}))}))},Object.defineProperty(n.prototype,"backend",{get:function(){if(this.pendingBackendInit!=null)throw new Error("Backend '"+this.backendName+"' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods");if(this.backendInstance==null){var t=this.initializeBackendsAndReturnBest(),e=t.name;if(t.asyncInit)throw new Error("The highest priority backend '"+e+"' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods");this.setBackend(e)}return this.backendInstance},enumerable:!0,configurable:!0}),n.prototype.backendNames=function(){return Object.keys(this.registryFactory)},n.prototype.findBackend=function(t){return!(t in this.registry)&&(!(t in this.registryFactory)||this.initializeBackend(t).asyncInit)?null:this.registry[t]},n.prototype.findBackendFactory=function(t){return t in this.registryFactory?this.registryFactory[t].factory:null},n.prototype.registerBackend=function(t,e,r){return r===void 0&&(r=1),t in this.registryFactory?(console.warn(t+" backend was already registered. Reusing existing backend factory."),!1):(this.registryFactory[t]={factory:e,priority:r},!0)},n.prototype.setBackend=function(t){return $(this,void 0,void 0,(function(){var e,r,a;return J(this,(function(o){switch(o.label){case 0:if(this.registryFactory[t]==null)throw new Error("Backend name '"+t+"' not found in registry");return this.backendName=t,this.registry[t]!=null?[3,4]:(this.backendInstance=null,e=this.initializeBackend(t),r=e.success,e.asyncInit?[4,r]:[3,2]);case 1:return a=o.sent(),[3,3];case 2:a=r,o.label=3;case 3:if(!a)return[2,!1];o.label=4;case 4:return this.backendInstance=this.registry[t],this.setupRegisteredKernels(),this.profiler=new yd(this.backendInstance),[2,!0]}}))}))},n.prototype.setupRegisteredKernels=function(){var t=this;Is(this.backendName).forEach((function(e){e.setupFunc!=null&&e.setupFunc(t.backendInstance)}))},n.prototype.disposeRegisteredKernels=function(t){var e=this;Is(t).forEach((function(r){r.disposeFunc!=null&&r.disposeFunc(e.registry[t])}))},n.prototype.initializeBackend=function(t){var e=this,r=this.registryFactory[t];if(r==null)throw new Error("Cannot initialize backend "+t+", no registration found.");try{var a=r.factory();if(Promise.resolve(a)===a){var o=++this.pendingBackendInitId,i=a.then((function(s){return!(o<e.pendingBackendInitId)&&(e.registry[t]=s,e.pendingBackendInit=null,!0)})).catch((function(s){return!(o<e.pendingBackendInitId)&&(e.pendingBackendInit=null,console.warn("Initialization of backend "+t+" failed"),console.warn(s.stack||s.message),!1)}));return this.pendingBackendInit=i,{success:i,asyncInit:!0}}return this.registry[t]=a,{success:!0,asyncInit:!1}}catch(s){return console.warn("Initialization of backend "+t+" failed"),console.warn(s.stack||s.message),{success:!1,asyncInit:!1}}},n.prototype.removeBackend=function(t){if(!(t in this.registryFactory))throw new Error(t+" backend not found in registry");this.backendName===t&&this.pendingBackendInit!=null&&this.pendingBackendInitId++,t in this.registry&&(this.disposeRegisteredKernels(t),this.registry[t].dispose(),delete this.registry[t]),delete this.registryFactory[t],this.backendName===t&&(this.pendingBackendInit=null,this.backendName=null,this.backendInstance=null)},n.prototype.getSortedBackends=function(){var t=this;if(Object.keys(this.registryFactory).length===0)throw new Error("No backend found in registry.");return Object.keys(this.registryFactory).sort((function(e,r){return t.registryFactory[r].priority-t.registryFactory[e].priority}))},n.prototype.initializeBackendsAndReturnBest=function(){for(var t=this.getSortedBackends(),e=0;e<t.length;e++){var r=t[e],a=this.initializeBackend(r),o=a.success,i=a.asyncInit;if(i||o)return{name:r,asyncInit:i}}throw new Error("Could not initialize any backends, all backend initializations failed.")},n.prototype.moveData=function(t,e){var r=this.state.tensorInfo.get(e),a=r.backend,o=this.readSync(e);a.disposeData(e),r.backend=t,t.move(e,o,r.shape,r.dtype),this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack[this.state.numDataMovesStack.length-1]++},n.prototype.tidy=function(t,e){var r,a=this,o=null;if(e==null){if(typeof t!="function")throw new Error("Please provide a function to tidy()");e=t}else{if(typeof t!="string"&&!(t instanceof String))throw new Error("When calling with two arguments, the first argument to tidy() must be a string");if(typeof e!="function")throw new Error("When calling with two arguments, the 2nd argument to tidy() must be a function");o=t}return this.scopedRun((function(){return a.startScope(o)}),(function(){return a.endScope(r)}),(function(){return(r=e())instanceof Promise&&console.error("Cannot return a Promise inside of tidy."),r}))},n.prototype.scopedRun=function(t,e,r){t();try{var a=r();return e(),a}catch(o){throw e(),o}},n.prototype.nextTensorId=function(){return n.nextTensorId++},n.prototype.nextVariableId=function(){return n.nextVariableId++},n.prototype.clone=function(t){var e=this.makeTensorFromDataId(t.dataId,t.shape,t.dtype),r={x:t};return this.addTapeNode(this.state.activeScope.name,r,[e],(function(a){return{x:function(){return a.toFloat()}}}),[]),e},n.prototype.runKernel=function(t,e,r,a,o){return this.runKernelFunc(null,e,null,t,r,a,o)},n.prototype.shouldCheckForMemLeaks=function(){return this.ENV.getBool("IS_TEST")},n.prototype.checkKernelForMemLeak=function(t,e,r){var a=this.backend.numDataIds(),o=0;r.forEach((function(u){o+=u.dtype==="complex64"?3:1}));var i=this.state.numDataMovesStack[this.state.numDataMovesStack.length-1],s=a-e-o-i;if(s>0)throw new Error("Backend '"+this.backendName+"' has an internal memory leak ("+s+" data ids) after running '"+t+"'")},n.prototype.runKernelFunc=function(t,e,r,a,o,i,s){var u,c=this;i===void 0&&(i=[]),s===void 0&&(s=[]);var l=[],h=this.isTapeOn();a==null&&(a=this.state.activeScope!=null?this.state.activeScope.name:"");var f,d=function(y){h&&(l=y.map((function(b){return c.keep(c.clone(b))})))},p=this.state.numBytes,v=this.state.numTensors;this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack.push(0);var m,g=qu(a,this.backendName);return f=g!=null?function(){var y=c.backend.numDataIds();m=g.kernelFunc({inputs:e,attrs:o,backend:c.backend});var b=Array.isArray(m)?m:[m];c.shouldCheckForMemLeaks()&&c.checkKernelForMemLeak(a,y,b);var x=b.map((function(C){var k=C.dataId,S=C.shape,_=C.dtype;return c.makeTensorFromDataId(k,S,_)})),w=x.filter((function(C,k){return s[k]}));return d((i||[]).slice().concat(w)),x}:function(){var y=c.backend.numDataIds();m=c.tidy((function(){return t(c.backend,d)}));var b=Array.isArray(m)?m:[m];return c.shouldCheckForMemLeaks()&&c.checkKernelForMemLeak(a,y,b),b},this.scopedRun((function(){return c.state.kernelDepth++}),(function(){return c.state.kernelDepth--}),(function(){u=c.ENV.getBool("DEBUG")?c.profiler.profileKernel(a,e,(function(){return f()})):f()})),h&&this.addTapeNode(a,e,u,r,l),this.state.profiling&&this.state.activeProfile.kernels.push({name:a,bytesAdded:this.state.numBytes-p,totalBytesSnapshot:this.state.numBytes,tensorsAdded:this.state.numTensors-v,totalTensorsSnapshot:this.state.numTensors,inputShapes:Object.keys(e).map((function(y){return e[y].shape})),outputShapes:u.map((function(y){return y.shape}))}),Array.isArray(m)?u:u[0]},n.prototype.makeTensor=function(t,e,r,a){if(t==null)throw new Error("Values passed to engine.makeTensor() are null");r=r||"float32",a=a||this.backend;var o=t;r==="string"&&yi(t[0])&&(o=t.map((function(l){return md(l)})));var i=a.write(o,e,r),s=new Be(e,r,i,this.nextTensorId());if(this.incRef(s,a),r==="string"){var u=this.state.tensorInfo.get(i),c=dd(o);this.state.numBytes+=c-u.bytes,u.bytes=c}return s},n.prototype.makeTensorFromDataId=function(t,e,r,a){var o=new Be(e,r=r||"float32",t,this.nextTensorId());return this.incRef(o,a),o},n.prototype.makeVariable=function(t,e,r,a){e===void 0&&(e=!0),r=r||this.nextVariableId().toString(),a!=null&&a!==t.dtype&&(t=t.asType(a));var o=new wr(t,e,r,this.nextTensorId());if(this.state.registeredVariables[o.name]!=null)throw new Error("Variable with name "+o.name+" was already registered");return this.state.registeredVariables[o.name]=o,this.incRef(o,this.backend),o},n.prototype.incRef=function(t,e){var r=this.state.tensorInfo.has(t.dataId)?this.state.tensorInfo.get(t.dataId).refCount:0;if(this.state.numTensors++,t.dtype==="string"&&this.state.numStringTensors++,r===0){this.state.numDataBuffers++;var a=0;t.dtype!=="complex64"&&t.dtype!=="string"&&(a=t.size*$u(t.dtype)),this.state.tensorInfo.set(t.dataId,{backend:e||this.backend,dtype:t.dtype,shape:t.shape,bytes:a,refCount:0}),this.state.numBytes+=a}this.state.tensorInfo.get(t.dataId).refCount++,t instanceof wr||this.track(t)},n.prototype.disposeTensor=function(t){if(this.state.tensorInfo.has(t.dataId)){this.state.numTensors--,t.dtype==="string"&&this.state.numStringTensors--;var e=this.state.tensorInfo.get(t.dataId);e.refCount<=1?(t.dtype!=="complex64"&&(this.state.numBytes-=e.bytes),this.state.numDataBuffers--,e.backend.disposeData(t.dataId),this.state.tensorInfo.delete(t.dataId)):this.state.tensorInfo.get(t.dataId).refCount--}},n.prototype.disposeVariables=function(){for(var t in this.state.registeredVariables){var e=this.state.registeredVariables[t];this.disposeVariable(e)}},n.prototype.disposeVariable=function(t){this.disposeTensor(t),this.state.registeredVariables[t.name]!=null&&delete this.state.registeredVariables[t.name]},n.prototype.memory=function(){var t=this.backend.memory();return t.numTensors=this.state.numTensors,t.numDataBuffers=this.state.numDataBuffers,t.numBytes=this.state.numBytes,this.state.numStringTensors>0&&(t.unreliable=!0,t.reasons==null&&(t.reasons=[]),t.reasons.push("Memory usage by string tensors is approximate (2 bytes per character)")),t},n.prototype.profile=function(t){return $(this,void 0,void 0,(function(){var e,r;return J(this,(function(a){return this.state.profiling=!0,e=this.state.numBytes,r=this.state.numTensors,this.state.activeProfile.kernels=[],this.state.activeProfile.result=t(),this.state.profiling=!1,this.state.activeProfile.peakBytes=Math.max.apply(Math,this.state.activeProfile.kernels.map((function(o){return o.totalBytesSnapshot}))),this.state.activeProfile.newBytes=this.state.numBytes-e,this.state.activeProfile.newTensors=this.state.numTensors-r,[2,this.state.activeProfile]}))}))},n.prototype.isTapeOn=function(){return this.state.gradientDepth>0&&this.state.kernelDepth===0},n.prototype.addTapeNode=function(t,e,r,a,o){var i=this,s={id:this.state.nextTapeNodeId++,kernelName:t,inputs:e,outputs:r,saved:o},u=od(t);u!=null&&(a=u.gradFunc),a!=null&&(s.gradient=function(c){return c=c.map((function(l,h){if(l==null){var f=r[h],d=Hr(f.size,f.dtype);return i.makeTensor(d,f.shape,f.dtype)}return l})),a(c.length>1?c:c[0],o)}),this.state.activeTape.push(s)},n.prototype.keep=function(t){return t.kept=!0,t},n.prototype.startTape=function(){this.state.gradientDepth===0&&(this.state.activeTape=[]),this.state.gradientDepth++},n.prototype.endTape=function(){this.state.gradientDepth--},n.prototype.startScope=function(t){var e={track:[],name:"unnamed scope",id:this.state.nextScopeId++};t&&(e.name=t),this.state.scopeStack.push(e),this.state.activeScope=e},n.prototype.endScope=function(t){for(var e=this,r=nc(t),a=new Set(r.map((function(u){return u.id}))),o=0;o<this.state.activeScope.track.length;o++){var i=this.state.activeScope.track[o];i.kept||a.has(i.id)||i.dispose()}var s=this.state.scopeStack.pop();this.state.activeScope=this.state.scopeStack.length===0?null:this.state.scopeStack[this.state.scopeStack.length-1],r.forEach((function(u){u.kept||u.scopeId!==s.id||e.track(u)}))},n.prototype.gradients=function(t,e,r,a){var o=this;if(a===void 0&&(a=!1),I(e.length>0,(function(){return"gradients() received an empty list of xs."})),r!=null&&r.dtype!=="float32")throw new Error("dy must have 'float32' dtype, but has '"+r.dtype+"'");var i=this.scopedRun((function(){return o.startTape()}),(function(){return o.endTape()}),(function(){return o.tidy("forward",t)}));I(i instanceof Be,(function(){return"The result y returned by f() must be a tensor."}));var s=(function(u,c,l){for(var h={},f={},d=0;d<c.length;d++)h[c[d].id]=!0;for(d=0;d<u.length;d++){var p=(C=u[d]).inputs;for(var v in p){for(var m=p[v],g=!1,y=0;y<c.length;y++)if(h[m.id]){C.outputs.forEach((function(R){return h[R.id]=!0})),g=!0,f[C.id]=!0;break}if(g)break}}var b={};b[l.id]=!0;var x={};for(d=u.length-1;d>=0;d--)for(p=(C=u[d]).inputs,y=0;y<C.outputs.length;y++)if(b[C.outputs[y].id]){for(var v in p)b[p[v].id]=!0,x[C.id]=!0;break}var w=[];for(d=0;d<u.length;d++){var C;if(f[(C=u[d]).id]&&x[C.id]){var k={};for(var v in C.inputs){var S=C.inputs[v];h[S.id]&&(k[v]=S)}var _=Object.assign({},C);_.inputs=k,_.outputs=C.outputs,w.push(_)}}return w})(this.state.activeTape,e,i);if(!a&&s.length===0&&e.length>0)throw new Error("Cannot compute gradient of y=f(x) with respect to x. Make sure that the f you passed encloses all operations that lead from x to y.");return this.tidy("backward",(function(){var u,c,l={};l[i.id]=r??(u=i.shape,c=Qu(Z(u),"float32"),M.makeTensor(c,u,"float32")),(function(f,d,p){for(var v=function(g){var y=d[g],b=[];if(y.outputs.forEach((function(k){var S=f[k.id];S!=null?b.push(S):b.push(null)})),y.gradient==null)throw new Error("Cannot compute gradient: gradient function not found for "+y.kernelName+".");var x=y.gradient(b),w=function(k){if(!(k in x))throw new Error("Cannot backprop through input "+k+". Available gradients found: "+Object.keys(x)+".");var S=p((function(){return x[k]()}));if(S.dtype!=="float32")throw new Error("Error in gradient for op "+y.kernelName+". The gradient of input "+k+" must have 'float32' dtype, but has '"+S.dtype+"'");var _=y.inputs[k];if(!Qe(S.shape,_.shape))throw new Error("Error in gradient for op "+y.kernelName+". The gradient of input '"+k+"' has shape '"+S.shape+"', which does not match the shape of the input '"+_.shape+"'");if(f[_.id]==null)f[_.id]=S;else{var R=f[_.id];f[_.id]=R.add(S),R.dispose()}};for(var C in y.inputs)w(C)},m=d.length-1;m>=0;m--)v(m)})(l,s,(function(f){return o.tidy(f)}));var h=e.map((function(f){return l[f.id]}));return o.state.gradientDepth===0&&(o.state.activeTape.forEach((function(f){for(var d=0,p=f.saved;d<p.length;d++)p[d].dispose()})),o.state.activeTape=null),{value:i,grads:h}}))},n.prototype.customGrad=function(t){var e=this;return I(Ko(t),(function(){return"The f passed in customGrad(f) must be a function."})),function(){for(var r,a=[],o=0;o<arguments.length;o++)a[o]=arguments[o];I(a.every((function(s){return s instanceof Be})),(function(){return"The args passed in customGrad(f)(x1, x2,...) must all be tensors"}));var i={};return a.forEach((function(s,u){i[u]=s})),e.runKernelFunc((function(s,u){return I((r=t.apply(void 0,a.concat([u]))).value instanceof Be,(function(){return"The function f passed in customGrad(f) must return an object where `obj.value` is a tensor"})),I(Ko(r.gradFunc),(function(){return"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function."})),r.value}),i,(function(s,u){var c=r.gradFunc(s,u),l=Array.isArray(c)?c:[c];I(l.length===a.length,(function(){return"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns the same number of tensors as inputs passed to f(...)."})),I(l.every((function(f){return f instanceof Be})),(function(){return"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns a list of only tensors."}));var h={};return l.forEach((function(f,d){h[d]=function(){return f}})),h}))}},n.prototype.readSync=function(t){return this.state.tensorInfo.get(t).backend.readSync(t)},n.prototype.read=function(t){return this.state.tensorInfo.get(t).backend.read(t)},n.prototype.time=function(t){return $(this,void 0,void 0,(function(){var e,r;return J(this,(function(a){switch(a.label){case 0:return e=$t(),[4,this.backend.time(t)];case 1:return(r=a.sent()).wallMs=$t()-e,[2,r]}}))}))},n.prototype.track=function(t){return this.state.activeScope!=null&&(t.scopeId=this.state.activeScope.id,this.state.activeScope.track.push(t)),t},Object.defineProperty(n.prototype,"registeredVariables",{get:function(){return this.state.registeredVariables},enumerable:!0,configurable:!0}),n.prototype.reset=function(){for(var t in this.pendingBackendInitId++,this.state.dispose(),this.ENV.reset(),this.state=new Ns,this.registry)this.disposeRegisteredKernels(t),this.registry[t].dispose(),delete this.registry[t];this.backendName=null,this.backendInstance=null,this.pendingBackendInit=null},n.nextTensorId=0,n.nextVariableId=0,n})(),M=(function(){var n=(function(){if(yo==null){var e=void 0;if(typeof window<"u")e=window;else if(typeof global<"u")e=global;else if(typeof process<"u")e=process;else{if(typeof self>"u")throw new Error("Could not find a global object");e=self}yo=e}return yo})();if(n._tfengine==null){var t=new rd(n);n._tfengine=new Ed(t)}return(function(e){ju=e})(n._tfengine.ENV),Jt=function(){return n._tfengine},n._tfengine})();function rc(){return typeof window<"u"&&window.document!=null||typeof WorkerGlobalScope<"u"}var hn=W();hn.registerFlag("DEBUG",(function(){return!1}),(function(n){n&&console.warn("Debugging mode is ON. The output of every math call will be downloaded to CPU and checked for NaNs. This significantly impacts performance.")})),hn.registerFlag("IS_BROWSER",(function(){return rc()})),hn.registerFlag("IS_NODE",(function(){return typeof process<"u"&&process.versions!==void 0&&process.versions.node!==void 0})),hn.registerFlag("IS_CHROME",(function(){return typeof navigator<"u"&&navigator!=null&&navigator.userAgent!=null&&/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor)})),hn.registerFlag("PROD",(function(){return!1})),hn.registerFlag("TENSORLIKE_CHECK_SHAPE_CONSISTENCY",(function(){return hn.getBool("DEBUG")})),hn.registerFlag("DEPRECATION_WARNINGS_ENABLED",(function(){return!0})),hn.registerFlag("IS_TEST",(function(){return!1}));var Lr,St,_t,Wn={},xo={alpha:!1,antialias:!1,premultipliedAlpha:!1,preserveDrawingBuffer:!1,depth:!1,stencil:!1,failIfMajorPerformanceCaveat:!0};function _d(n,t){Wn[n]=t}function on(n){n in Wn||(Wn[n]=(function(e){if(e!==1&&e!==2)throw new Error("Cannot get WebGL rendering context, WebGL is disabled.");var r=(function(a){if(typeof OffscreenCanvas<"u"&&a===2)return new OffscreenCanvas(300,150);if(typeof document<"u")return document.createElement("canvas");throw new Error("Cannot create a canvas in this context")})(e);return r.addEventListener("webglcontextlost",(function(a){a.preventDefault(),delete Wn[e]}),!1),e===1?r.getContext("webgl",xo)||r.getContext("experimental-webgl",xo):r.getContext("webgl2",xo)})(n));var t=Wn[n];return t.isContextLost()?(delete Wn[n],on(n)):(t.disable(t.DEPTH_TEST),t.disable(t.STENCIL_TEST),t.disable(t.BLEND),t.disable(t.DITHER),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SAMPLE_COVERAGE),t.enable(t.SCISSOR_TEST),t.enable(t.CULL_FACE),t.cullFace(t.BACK),Wn[n])}function $a(n,t){return[t,n]}function Nr(n){var t=Z(n);return Xo(Math.ceil(t/4))}function jr(n,t){return[Math.max(1,Math.ceil(t/2)),Math.max(1,Math.ceil(n/2))]}function xi(n,t){var e,r,a,o,i,s,u,c,l,h=n;return W().getNumber("WEBGL_VERSION")===2?(e=h.R32F,r=h.R16F,a=h.RGBA16F,o=h.RGBA32F,i=h.RED,s=4,u=1,c=h.HALF_FLOAT,l=h.FLOAT):(e=n.RGBA,r=n.RGBA,a=n.RGBA,o=h.RGBA,i=n.RGBA,s=4,u=4,c=t!=null?t.HALF_FLOAT_OES:null,l=n.FLOAT),{internalFormatFloat:e,internalFormatHalfFloat:r,internalFormatPackedHalfFloat:a,internalFormatPackedFloat:o,textureFormatFloat:i,downloadTextureFormat:n.RGBA,downloadUnpackNumChannels:s,defaultNumChannels:u,textureTypeHalfFloat:c,textureTypeFloat:l}}function ee(n,t,e){var r=e();return t&&(function(a){var o=a.getError();if(o!==a.NO_ERROR)throw new Error("WebGL Error: "+kd(a,o))})(n),r}(function(n){n[n.DENSE=0]="DENSE",n[n.SHARED_BATCH=1]="SHARED_BATCH"})(Lr||(Lr={})),(function(n){n[n.RENDER=0]="RENDER",n[n.UPLOAD=1]="UPLOAD",n[n.PIXELS=2]="PIXELS",n[n.DOWNLOAD=3]="DOWNLOAD"})(St||(St={})),(function(n){n[n.UNPACKED_FLOAT16=0]="UNPACKED_FLOAT16",n[n.UNPACKED_FLOAT32=1]="UNPACKED_FLOAT32",n[n.PACKED_4X1_UNSIGNED_BYTE=2]="PACKED_4X1_UNSIGNED_BYTE",n[n.PACKED_2X2_FLOAT32=3]="PACKED_2X2_FLOAT32",n[n.PACKED_2X2_FLOAT16=4]="PACKED_2X2_FLOAT16"})(_t||(_t={}));var Sd=596e-10,Rd=65504;function Id(n){return!!(W().getBool("WEBGL_RENDER_FLOAT32_ENABLED")||n===0||Sd<Math.abs(n)&&Math.abs(n)<Rd)}function kd(n,t){switch(t){case n.NO_ERROR:return"NO_ERROR";case n.INVALID_ENUM:return"INVALID_ENUM";case n.INVALID_VALUE:return"INVALID_VALUE";case n.INVALID_OPERATION:return"INVALID_OPERATION";case n.INVALID_FRAMEBUFFER_OPERATION:return"INVALID_FRAMEBUFFER_OPERATION";case n.OUT_OF_MEMORY:return"OUT_OF_MEMORY";case n.CONTEXT_LOST_WEBGL:return"CONTEXT_LOST_WEBGL";default:return"Unknown error code "+t}}function ia(n,t,e){return vn(n,t,(function(){return n.getExtension(e)}),'Extension "'+e+'" not supported on this browser.')}function Td(n,t,e){var r=vn(n,t,(function(){return n.createShader(n.VERTEX_SHADER)}),"Unable to create vertex WebGLShader.");if(ee(n,t,(function(){return n.shaderSource(r,e)})),ee(n,t,(function(){return n.compileShader(r)})),n.getShaderParameter(r,n.COMPILE_STATUS)===!1)throw console.log(n.getShaderInfoLog(r)),new Error("Failed to compile vertex shader.");return r}function Ad(n,t,e){var r=vn(n,t,(function(){return n.createShader(n.FRAGMENT_SHADER)}),"Unable to create fragment WebGLShader.");if(ee(n,t,(function(){return n.shaderSource(r,e)})),ee(n,t,(function(){return n.compileShader(r)})),n.getShaderParameter(r,n.COMPILE_STATUS)===!1)throw(function(a,o){var i=Dd.exec(o);if(i==null)return console.log("Couldn't parse line number in error: "+o),void console.log(a);for(var s=+i[1],u=a.split(`
`),c=u.length.toString().length+2,l=u.map((function(m,g){return fr((g+1).toString(),c)+m})),h=0,f=0;f<l.length;f++)h=Math.max(l[f].length,h);var d=l.slice(0,s-1),p=l.slice(s-1,s),v=l.slice(s);console.log(d.join(`
`)),console.log(o.split(`
`)[0]),console.log("%c "+fr(p[0],h),"border:1px solid red; background-color:#e3d2d2; color:#a61717"),console.log(v.join(`
`))})(e,n.getShaderInfoLog(r)),new Error("Failed to compile fragment shader.");return r}var bo,wo,Dd=/ERROR: [0-9]+:([0-9]+):/g;function Md(n,t){return vn(n,t,(function(){return n.createProgram()}),"Unable to create WebGLProgram.")}function Nd(n,t,e){if(ee(n,t,(function(){return n.linkProgram(e)})),n.getProgramParameter(e,n.LINK_STATUS)===!1)throw console.log(n.getProgramInfoLog(e)),new Error("Failed to link vertex and fragment shaders.")}function Co(n,t,e){if(ee(n,t,(function(){return n.validateProgram(e)})),n.getProgramParameter(e,n.VALIDATE_STATUS)===!1)throw console.log(n.getProgramInfoLog(e)),new Error("Shader program validation failed.")}function Fd(n,t,e){var r=vn(n,t,(function(){return n.createBuffer()}),"Unable to create WebGLBuffer");return ee(n,t,(function(){return n.bindBuffer(n.ARRAY_BUFFER,r)})),ee(n,t,(function(){return n.bufferData(n.ARRAY_BUFFER,e,n.STATIC_DRAW)})),r}function Pd(n,t,e){var r=vn(n,t,(function(){return n.createBuffer()}),"Unable to create WebGLBuffer");return ee(n,t,(function(){return n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,r)})),ee(n,t,(function(){return n.bufferData(n.ELEMENT_ARRAY_BUFFER,e,n.STATIC_DRAW)})),r}function Bd(n,t){return vn(n,t,(function(){return n.createTexture()}),"Unable to create WebGLTexture.")}function Od(n,t){var e=W().getNumber("WEBGL_MAX_TEXTURE_SIZE");if(n<=0||t<=0){var r="["+n+"x"+t+"]";throw new Error("Requested texture size "+r+" is invalid.")}if(n>e||t>e)throw r="["+n+"x"+t+"]",new Error("Requested texture size "+r+" greater than WebGL maximum on this browser / GPU "+("["+e+"x"+e+"]")+".")}function Ld(n,t){return vn(n,t,(function(){return n.createFramebuffer()}),"Unable to create WebGLFramebuffer.")}function Fs(n,t,e,r,a,o,i,s){var u=n.getAttribLocation(e,r);return u!==-1&&(ee(n,t,(function(){return n.bindBuffer(n.ARRAY_BUFFER,a)})),ee(n,t,(function(){return n.vertexAttribPointer(u,o,n.FLOAT,!1,i,s)})),ee(n,t,(function(){return n.enableVertexAttribArray(u)})),!0)}function Ud(n,t,e,r){Hd(n,r),ee(n,t,(function(){return n.activeTexture(n.TEXTURE0+r)})),ee(n,t,(function(){return n.bindTexture(n.TEXTURE_2D,e)}))}function Wd(n,t,e,r){return vn(n,t,(function(){return n.getUniformLocation(e,r)}),'uniform "'+r+'" not present in program.')}function zd(n,t,e){return n.getUniformLocation(t,e)}function Vd(n,t,e,r,a,o){ee(n,t,(function(){return Ud(n,t,r,o)})),ee(n,t,(function(){return n.uniform1i(a,o)}))}function Eo(n,t,e,r){ee(n,t,(function(){return n.bindFramebuffer(n.FRAMEBUFFER,r)})),ee(n,t,(function(){return n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,e,0)}))}function Ps(n,t,e){ee(n,t,(function(){return n.bindFramebuffer(n.FRAMEBUFFER,e)})),ee(n,t,(function(){return n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,null,0)}))}function sa(n){var t=n.checkFramebufferStatus(n.FRAMEBUFFER);if(t!==n.FRAMEBUFFER_COMPLETE)throw new Error("Error binding framebuffer: "+Gd(n,t))}function Gd(n,t){switch(t){case n.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:return"FRAMEBUFFER_INCOMPLETE_ATTACHMENT";case n.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:return"FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT";case n.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:return"FRAMEBUFFER_INCOMPLETE_DIMENSIONS";case n.FRAMEBUFFER_UNSUPPORTED:return"FRAMEBUFFER_UNSUPPORTED";default:return"unknown error "+t}}function vn(n,t,e,r){var a=ee(n,t,(function(){return e()}));if(a==null)throw new Error(r);return a}function Hd(n,t){var e=n.MAX_COMBINED_TEXTURE_IMAGE_UNITS-1,r=t+n.TEXTURE0;if(r<n.TEXTURE0||r>e)throw new Error("textureUnit must be in "+("[gl.TEXTURE0, gl.TEXTURE"+e+"]")+".")}function Ta(n,t){return t===void 0&&(t=2),Z(n.slice(0,n.length-t))}function Aa(n){if(n.length===0)throw Error("Cannot get rows and columns of an empty shape array.");return[n.length>1?n[n.length-2]:1,n[n.length-1]]}function _o(n){var t=[1,1,1];return n.length===0||n.length===1&&n[0]===1||(t=[Ta(n)].concat(Aa(n))),t}function jd(n,t){var e;t===void 0&&(t=!1);var r=W().getNumber("WEBGL_MAX_TEXTURE_SIZE");if(t&&(r*=2,(n=n.map((function(c,l){return l>=n.length-2?Yu(n[l]):n[l]}))).length===1&&(n=[2,n[0]])),n.length!==2){var a=Gn(n);n=a.newShape}var o=Z(n);if(n.length<=1&&o<=r)return[1,o];if(n.length===2&&n[0]<=r&&n[1]<=r)return n;if(n.length===3&&n[0]*n[1]<=r&&n[2]<=r)return[n[0]*n[1],n[2]];if(n.length===3&&n[0]<=r&&n[1]*n[2]<=r)return[n[0],n[1]*n[2]];if(n.length===4&&n[0]*n[1]*n[2]<=r&&n[3]<=r)return[n[0]*n[1]*n[2],n[3]];if(n.length===4&&n[0]<=r&&n[1]*n[2]*n[3]<=r)return[n[0],n[1]*n[2]*n[3]];if(t){var i=Ta(n),s=2,u=2;return n.length&&(s=(e=Aa(n))[0],u=e[1]),Xo(o=i*(s/2)*(u/2)).map((function(c){return 2*c}))}return Xo(o)}function ua(n){return n%2==0}function ca(n,t){if(Qe(n=n.slice(-2),t=t.slice(-2))||!n.length||!t.length||n[0]===0||n[1]===0||t[0]===0||t[1]===0)return!0;if(n.length!==t.length){var e=n.slice(-1)[0],r=t.slice(-1)[0];if(e===r||ua(e)&&ua(r)&&(n[0]===1||t[0]===1))return!0}return n[1]===t[1]&&ua(n[0])&&ua(t[0])}function qd(n){if(bo==null){var t=on(n);bo=t.getParameter(t.MAX_TEXTURE_SIZE)}return bo}function Xd(n){if(wo==null){var t=on(n);wo=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS)}return Math.min(16,wo)}function Kd(n){if(n===0)return 0;var t=on(n);return Bt(t,"EXT_disjoint_timer_query_webgl2")&&n===2?2:Bt(t,"EXT_disjoint_timer_query")?1:0}function Bt(n,t){return n.getExtension(t)!=null}function Bs(n){try{if(on(n)!=null)return!0}catch{return!1}return!1}function Yd(n){if(n===0)return!1;var t=on(n);if(n===1){if(!Bt(t,"OES_texture_float"))return!1}else if(!Bt(t,"EXT_color_buffer_float"))return!1;return ei(t)}function $d(n){if(n===0)return!1;var t=on(n);if(n!==1){if(Bt(t,"EXT_color_buffer_float"))return ei(t);if(Bt(t,"EXT_color_buffer_half_float")){var e=t.getExtension("EXT_color_buffer_half_float");return(function(r,a){var o=xi(r,a),i=r.createTexture();r.bindTexture(r.TEXTURE_2D,i),r.texImage2D(r.TEXTURE_2D,0,o.internalFormatHalfFloat,1,1,0,o.textureFormatFloat,o.textureTypeHalfFloat,null);var s=r.createFramebuffer();r.bindFramebuffer(r.FRAMEBUFFER,s),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,i,0);var u=r.checkFramebufferStatus(r.FRAMEBUFFER)===r.FRAMEBUFFER_COMPLETE;return r.bindTexture(r.TEXTURE_2D,null),r.bindFramebuffer(r.FRAMEBUFFER,null),r.deleteTexture(i),r.deleteFramebuffer(s),u})(t,e)}return!1}return!!Bt(t,"OES_texture_float")&&!!Bt(t,"WEBGL_color_buffer_float")&&ei(t)}function ei(n){var t=xi(n),e=n.createTexture();n.bindTexture(n.TEXTURE_2D,e),n.texImage2D(n.TEXTURE_2D,0,t.internalFormatFloat,1,1,0,t.textureFormatFloat,t.textureTypeFloat,null);var r=n.createFramebuffer();n.bindFramebuffer(n.FRAMEBUFFER,r),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,e,0);var a=n.checkFramebufferStatus(n.FRAMEBUFFER)===n.FRAMEBUFFER_COMPLETE;return n.bindTexture(n.TEXTURE_2D,null),n.bindFramebuffer(n.FRAMEBUFFER,null),n.deleteTexture(e),n.deleteFramebuffer(r),a}function Jd(n){return n===2&&on(n).fenceSync!=null}var ue=W();function ac(n){W().getBool("DEPRECATION_WARNINGS_ENABLED")&&console.warn(n+" You can disable deprecation warnings with tf.disableDeprecationWarnings().")}function K(n,t){return M.tidy(n,t)}function xt(n){nc(n).forEach((function(t){return t.dispose()}))}function Qd(n){return M.keep(n)}function Da(){for(var n=[],t=0;t<arguments.length;t++)n[t]=arguments[t];W().getBool("IS_TEST")||console.warn.apply(console,n)}function Fn(n,t){var e=n;if(tn(n))return t==="string"?[]:[n.length];if(!Array.isArray(n))return[];for(var r=[];Array.isArray(e)||tn(e)&&t!=="string";)r.push(e.length),e=e[0];return Array.isArray(n)&&W().getBool("TENSORLIKE_CHECK_SHAPE_CONSISTENCY")&&(function a(o,i,s){if(s=s||[],!Array.isArray(o)&&!tn(o))return void I(i.length===0,(function(){return"Element arr["+s.join("][")+"] is a primitive, but should be an array/TypedArray of "+i[0]+" elements"}));I(i.length>0,(function(){return"Element arr["+s.join("][")+"] should be a primitive, but is an array of "+o.length+" elements"})),I(o.length===i[0],(function(){return"Element arr["+s.join("][")+"] should have "+i[0]+" elements, but has "+o.length+" elements"}));for(var u=i.slice(1),c=0;c<o.length;++c)a(o[c],u,s.concat(c))})(n,r,[]),r}function Os(n,t,e,r){if(n!=null&&(n!=="numeric"&&n!==t||n==="numeric"&&t==="string"))throw new Error("Argument '"+e+"' passed to '"+r+"' must be "+n+" tensor, but got "+t+" tensor")}function E(n,t,e,r){if(r===void 0&&(r="numeric"),n instanceof Be)return Os(r,n.dtype,t,e),n;var a=Gr(n);if(a!=="string"&&["bool","int32","float32"].indexOf(r)>=0&&(a=r),Os(r,a,t,e),n==null||!tn(n)&&!Array.isArray(n)&&typeof n!="number"&&typeof n!="boolean"&&typeof n!="string"){var o=n==null?"null":n.constructor.name;throw new Error("Argument '"+t+"' passed to '"+e+"' must be a Tensor or TensorLike, but got '"+o+"'")}var i=Fn(n,a);tn(n)||Array.isArray(n)||(n=[n]);var s=a!=="string"?Ju(n,a,W().getBool("DEBUG")):br(n,[],!0);return M.makeTensor(s,i,a)}function Ma(n,t,e,r){if(r===void 0&&(r="numeric"),!Array.isArray(n))throw new Error("Argument "+t+" passed to "+e+" must be a `Tensor[]` or `TensorLike[]`");return n.map((function(a,o){return E(a,t+"["+o+"]",e)}),r)}function oc(n,t){for(var e=0;e<n.length;++e)if(n[n.length-e-1]!==t-1-e)return!1;return!0}function Zd(n,t,e){for(var r=n.length+t.length,a=[],o=0,i=0,s=0;s<r;s++)e.indexOf(s)===-1?a.push(n[o++]):a.push(t[i++]);return a}function ot(n,t){for(var e=[],r=n.length,a=0;a<r;a++)t.indexOf(a)===-1&&e.push(n[a]);return[e,t.map((function(o){return n[o]}))]}function bt(n,t){return Zd(n,t.map((function(e){return 1})),t)}function Et(n,t,e){I(oc(t,e),(function(){return n+" supports only inner-most axes for now. Got axes "+t+" and rank-"+e+" input."}))}function sn(n,t){if(oc(n,t))return null;for(var e=[],r=0;r<t;++r)n.indexOf(r)===-1&&e.push(r);return n.forEach((function(a){return e.push(a)})),e}function bi(n){return n.map((function(t,e){return[e,t]})).sort((function(t,e){return t[1]-e[1]})).map((function(t){return t[0]}))}function un(n,t){for(var e=[],r=t-n;r<t;++r)e.push(r);return e}function ep(n,t){var e=n[0].length;n.forEach((function(a,o){I(a.length===e,(function(){return"Error in concat"+e+"D: rank of tensors["+o+"] must be the same as the rank of the rest ("+e+")"}))})),I(t>=0&&t<e,(function(){return"Error in concat"+e+"D: axis must be between 0 and "+(e-1)+"."}));var r=n[0];n.forEach((function(a,o){for(var i=0;i<e;i++)I(i===t||a[i]===r[i],(function(){return"Error in concat"+e+"D: Shape of tensors["+o+"] ("+a+") does not match the shape of the rest ("+r+") along the non-concatenated axis "+o+"."}))}))}function Cr(n,t){for(var e=n[0].slice(),r=1;r<n.length;r++)e[t]+=n[r][t];return e}function T(n){var t=Object.keys(n);if(t.length!==1)throw new Error("Please provide an object with a single key (operation name) mapping to a function. Got an object with "+t.length+" keys.");var e=t[0],r=n[e];e.endsWith("_")&&(e=e.substring(0,e.length-1));var a=function(){for(var o=[],i=0;i<arguments.length;i++)o[i]=arguments[i];M.startScope(e);try{var s=r.apply(void 0,o);return s instanceof Promise&&console.error("Cannot return a Promise inside of tidy."),M.endScope(s),s}catch(u){throw M.endScope(null),u}};return Object.defineProperty(a,"name",{value:e,configurable:!0}),a}ue.registerFlag("HAS_WEBGL",(function(){return ue.getNumber("WEBGL_VERSION")>0})),ue.registerFlag("WEBGL_VERSION",(function(){return Bs(2)?2:Bs(1)?1:0})),ue.registerFlag("WEBGL_BUFFER_SUPPORTED",(function(){return ue.get("WEBGL_VERSION")===2})),ue.registerFlag("WEBGL_CPU_FORWARD",(function(){return!0})),ue.registerFlag("WEBGL_FORCE_F16_TEXTURES",(function(){return!1})),ue.registerFlag("WEBGL_PACK",(function(){return ue.getBool("HAS_WEBGL")})),ue.registerFlag("WEBGL_PACK_NORMALIZATION",(function(){return ue.getBool("WEBGL_PACK")})),ue.registerFlag("WEBGL_PACK_CLIP",(function(){return ue.getBool("WEBGL_PACK")})),ue.registerFlag("WEBGL_PACK_DEPTHWISECONV",(function(){return!1})),ue.registerFlag("WEBGL_PACK_BINARY_OPERATIONS",(function(){return ue.getBool("WEBGL_PACK")})),ue.registerFlag("WEBGL_PACK_UNARY_OPERATIONS",(function(){return ue.getBool("WEBGL_PACK")})),ue.registerFlag("WEBGL_PACK_ARRAY_OPERATIONS",(function(){return ue.getBool("WEBGL_PACK")})),ue.registerFlag("WEBGL_PACK_IMAGE_OPERATIONS",(function(){return ue.getBool("WEBGL_PACK")})),ue.registerFlag("WEBGL_PACK_REDUCE",(function(){return ue.getBool("WEBGL_PACK")})),ue.registerFlag("WEBGL_LAZILY_UNPACK",(function(){return ue.getBool("WEBGL_PACK")})),ue.registerFlag("WEBGL_CONV_IM2COL",(function(){return ue.getBool("WEBGL_PACK")})),ue.registerFlag("WEBGL_MAX_TEXTURE_SIZE",(function(){return qd(ue.getNumber("WEBGL_VERSION"))})),ue.registerFlag("WEBGL_MAX_TEXTURES_IN_SHADER",(function(){return Xd(ue.getNumber("WEBGL_VERSION"))})),ue.registerFlag("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION",(function(){var n=ue.getNumber("WEBGL_VERSION");return n===0?0:Kd(n)})),ue.registerFlag("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE",(function(){return ue.getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")>0&&(n=navigator.userAgent||navigator.vendor||window.opera,!(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(n)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(n.substr(0,4))));var n})),ue.registerFlag("WEBGL_RENDER_FLOAT32_CAPABLE",(function(){return Yd(ue.getNumber("WEBGL_VERSION"))})),ue.registerFlag("WEBGL_RENDER_FLOAT32_ENABLED",(function(){return!ue.getBool("WEBGL_FORCE_F16_TEXTURES")&&ue.getBool("WEBGL_RENDER_FLOAT32_CAPABLE")})),ue.registerFlag("WEBGL_DOWNLOAD_FLOAT_ENABLED",(function(){return $d(ue.getNumber("WEBGL_VERSION"))})),ue.registerFlag("WEBGL_FENCE_API_ENABLED",(function(){return Jd(ue.getNumber("WEBGL_VERSION"))})),ue.registerFlag("WEBGL_SIZE_UPLOAD_UNIFORM",(function(){return ue.getBool("WEBGL_RENDER_FLOAT32_ENABLED")?4:0})),tc=ac;var tt=T({complex_:function(n,t){var e=E(n,"real","complex"),r=E(t,"imag","complex");return ke(e.shape,r.shape,"real and imag shapes, "+e.shape+" and "+r.shape+", must match in call to tf.complex()."),M.runKernelFunc((function(a){return a.complex(e,r)}),{$real:e,$imag:r})}}),Pt=T({real_:function(n){var t=E(n,"input","real");return M.runKernelFunc((function(e){return e.real(t)}),{$input:t})}}),Qt=T({imag_:function(n){var t=E(n,"input","imag");return M.runKernelFunc((function(e){return e.imag(t)}),{$input:t})}});function rt(n,t,e){return Pn(n,t,Fn(n,e),e)}function Pn(n,t,e,r){if(r==null&&(r=Gr(n)),r==="complex64")throw new Error("Cannot construct a complex64 tensor directly. Please use tf.complex(real, imag).");if(!tn(n)&&!Array.isArray(n)&&typeof n!="number"&&typeof n!="boolean"&&typeof n!="string")throw new Error("values passed to tensor(values) must be a number/boolean/string or an array of numbers/booleans/strings, or a TypedArray");if(t!=null){Zu(t);var a=Z(t),o=Z(e);I(a===o,(function(){return"Based on the provided shape, ["+t+"], the tensor should have "+a+" values but has "+o}));for(var i=0;i<e.length;++i){var s=e[i],u=i!==e.length-1||s!==Z(t.slice(i));I(e[i]===t[i]||!u,(function(){return"Error creating a new Tensor. Inferred shape ("+e+") does not match the provided shape ("+t+"). "}))}}return tn(n)||Array.isArray(n)||(n=[n]),t=t||e,n=r!=="string"?Ju(n,r,W().getBool("DEBUG")):br(n,[],!0),M.makeTensor(n,t,r)}function X(n,t){if((tn(n)&&t!=="string"||Array.isArray(n))&&t!=="complex64")throw new Error("Error creating a new Scalar: value must be a primitive (number|boolean|string)");if(t==="string"&&tn(n)&&!(n instanceof Uint8Array))throw new Error("When making a scalar from encoded string, the value must be `Uint8Array`.");return Pn(n,[],[],t)}function Ve(n,t){Sr(n);var e=Fn(n,t);if(e.length!==1)throw new Error("tensor1d() requires values to be a flat/TypedArray");return Pn(n,null,e,t)}function kn(n,t,e){if(Sr(n),t!=null&&t.length!==2)throw new Error("tensor2d() requires shape to have two numbers");var r=Fn(n,e);if(r.length!==2&&r.length!==1)throw new Error("tensor2d() requires values to be number[][] or flat/TypedArray");if(r.length===1&&t==null)throw new Error("tensor2d() requires shape to be provided when `values` are a flat/TypedArray");return Pn(n,t,r,e)}function wi(n,t,e){if(Sr(n),t!=null&&t.length!==3)throw new Error("tensor3d() requires shape to have three numbers");var r=Fn(n,e);if(r.length!==3&&r.length!==1)throw new Error("tensor3d() requires values to be number[][][] or flat/TypedArray");if(r.length===1&&t==null)throw new Error("tensor3d() requires shape to be provided when `values` are a flat array");return Pn(n,t,r,e)}function mt(n,t,e){if(Sr(n),t!=null&&t.length!==4)throw new Error("tensor4d() requires shape to have four numbers");var r=Fn(n,e);if(r.length!==4&&r.length!==1)throw new Error("tensor4d() requires values to be number[][][][] or flat/TypedArray");if(r.length===1&&t==null)throw new Error("tensor4d() requires shape to be provided when `values` are a flat array");return Pn(n,t,r,e)}function tp(n,t,e){if(Sr(n),t!=null&&t.length!==5)throw new Error("tensor5d() requires shape to have five numbers");var r=Fn(n,e);if(r.length!==5&&r.length!==1)throw new Error("tensor5d() requires values to be number[][][][][] or flat/TypedArray");if(r.length===1&&t==null)throw new Error("tensor5d() requires shape to be provided when `values` are a flat array");return Pn(n,t,r,e)}function np(n,t,e){if(Sr(n),t!=null&&t.length!==6)throw new Error("tensor6d() requires shape to have six numbers");var r=Fn(n,e);if(r.length!==6&&r.length!==1)throw new Error("tensor6d() requires values to be number[][][][][][] or flat/TypedArray");if(r.length===1&&t==null)throw new Error("tensor6d() requires shape to be provided when `values` are a flat array");return Pn(n,t=t||r,r,e)}function rp(n,t,e,r){return t===void 0&&(t=!0),M.makeVariable(n,t,e,r)}function Rr(n,t){if(t===void 0&&(t="float32"),t==="complex64"){var e=Rr(n,"float32"),r=Ne(n,"float32");return tt(e,r)}var a=Qu(Z(n),t);return M.makeTensor(a,n,t)}function Ne(n,t){if(t===void 0&&(t="float32"),t==="complex64"){var e=Ne(n,"float32"),r=Ne(n,"float32");return tt(e,r)}var a=Hr(Z(n),t);return M.makeTensor(a,n,t)}function rn(n,t,e){return M.runKernelFunc((function(r){return r.fill(n,t,e)}),{})}function ap(n,t,e){if(e<=0)throw new Error("The number of values should be positive.");return M.runKernelFunc((function(r){return r.linspace(n,t,e)}),{})}function Na(n,t,e,r){if(e===void 0&&(e=1),r===void 0&&(r="float32"),e===0)throw new Error("Cannot have a step of zero");if(n===t||n<t&&e<0||t<n&&e>1)return Ne([0],r);var a=Hr(Math.abs(Math.ceil((t-n)/e)),r);t<n&&e===1&&(e=-1),a[0]=n;for(var o=1;o<a.length;o++)a[o]=a[o-1]+e;return Ve(a,r)}var ic=T({onesLike_:function(n){var t=E(n,"x","onesLike");if(t.dtype==="complex64"){var e=ic(Pt(t)),r=Ee(Qt(t));return tt(e,r)}return M.runKernelFunc((function(a){return a.onesLike(t)}),{$x:t},(function(a,o){return{$x:function(){return Ee(a)}}}))}}),Ee=T({zerosLike_:function(n){var t=E(n,"x","zerosLike");return M.runKernelFunc((function(e){return e.zerosLike(t)}),{$x:t},(function(e,r){return{$x:function(){return Ee(e)}}}))}}),He=T({concat_:function(n,t){t===void 0&&(t=0),I(n.length>=1,(function(){return"Pass at least one tensor to concat"}));var e=Ma(n,"tensors","concat");e[0].dtype==="complex64"&&e.forEach((function(s){if(s.dtype!=="complex64")throw new Error(`Cannot concatenate complex64 tensors with a tensor
          with dtype `+s.dtype+". ")})),t=Ke(t,e[0].shape)[0];var r=Cr(e.map((function(s){return s.shape})),t);if(Z(r)===0)return rt([],r);if((e=e.filter((function(s){return s.size>0}))).length===1)return e[0];var a=e.map((function(s){return s.shape}));ep(a,t);var o=e,i={axis:t};return M.runKernelFunc((function(s){return s.concat(e,t)}),o,(function(s){var u=a.map((function(c){return c[t]}));return Ci(s,u,t).map((function(c){return function(){return c}}))}),"Concat",i)}}),op=T({concat1d_:function(n){return He(n,0)}}),ip=T({concat2d_:function(n,t){return He(n,t)}}),sp=T({concat3d_:function(n,t){return He(n,t)}}),up=T({concat4d_:function(n,t){return He(n,t)}}),Ci=T({split_:function(n,t,e){e===void 0&&(e=0);var r,a=E(n,"x","split");return e=Ke(e,a.shape)[0],typeof t=="number"?(I(a.shape[e]%t==0,(function(){return"Number of splits must evenly divide the axis."})),r=new Array(t).fill(a.shape[e]/t)):(I(a.shape[e]===t.reduce((function(o,i){return o+i})),(function(){return"The sum of sizes must match the size of the axis dimension."})),r=t),M.runKernelFunc((function(o){return o.split(a,r,e)}),{$x:a},(function(o){return{$x:function(){return He(o,e)}}}))}});function $n(n,t){return n(t={exports:{}},t.exports),t.exports}var cp=$n((function(n){(function(t,e,r){function a(s){var u,c=this,l=(u=4022871197,function(h){h=h.toString();for(var f=0;f<h.length;f++){var d=.02519603282416938*(u+=h.charCodeAt(f));d-=u=d>>>0,u=(d*=u)>>>0,u+=4294967296*(d-=u)}return 23283064365386963e-26*(u>>>0)});c.next=function(){var h=2091639*c.s0+23283064365386963e-26*c.c;return c.s0=c.s1,c.s1=c.s2,c.s2=h-(c.c=0|h)},c.c=1,c.s0=l(" "),c.s1=l(" "),c.s2=l(" "),c.s0-=l(s),c.s0<0&&(c.s0+=1),c.s1-=l(s),c.s1<0&&(c.s1+=1),c.s2-=l(s),c.s2<0&&(c.s2+=1),l=null}function o(s,u){return u.c=s.c,u.s0=s.s0,u.s1=s.s1,u.s2=s.s2,u}function i(s,u){var c=new a(s),l=u&&u.state,h=c.next;return h.int32=function(){return 4294967296*c.next()|0},h.double=function(){return h()+11102230246251565e-32*(2097152*h()|0)},h.quick=h,l&&(typeof l=="object"&&o(l,c),h.state=function(){return o(c,{})}),h}e&&e.exports?e.exports=i:this.alea=i})(0,n)})),lp=$n((function(n){(function(t,e,r){function a(s){var u=this,c="";u.x=0,u.y=0,u.z=0,u.w=0,u.next=function(){var h=u.x^u.x<<11;return u.x=u.y,u.y=u.z,u.z=u.w,u.w^=u.w>>>19^h^h>>>8},s===(0|s)?u.x=s:c+=s;for(var l=0;l<c.length+64;l++)u.x^=0|c.charCodeAt(l),u.next()}function o(s,u){return u.x=s.x,u.y=s.y,u.z=s.z,u.w=s.w,u}function i(s,u){var c=new a(s),l=u&&u.state,h=function(){return(c.next()>>>0)/4294967296};return h.double=function(){do var f=((c.next()>>>11)+(c.next()>>>0)/4294967296)/2097152;while(f===0);return f},h.int32=c.next,h.quick=h,l&&(typeof l=="object"&&o(l,c),h.state=function(){return o(c,{})}),h}e&&e.exports?e.exports=i:this.xor128=i})(0,n)})),hp=$n((function(n){(function(t,e,r){function a(s){var u=this,c="";u.next=function(){var h=u.x^u.x>>>2;return u.x=u.y,u.y=u.z,u.z=u.w,u.w=u.v,(u.d=u.d+362437|0)+(u.v=u.v^u.v<<4^h^h<<1)|0},u.x=0,u.y=0,u.z=0,u.w=0,u.v=0,s===(0|s)?u.x=s:c+=s;for(var l=0;l<c.length+64;l++)u.x^=0|c.charCodeAt(l),l==c.length&&(u.d=u.x<<10^u.x>>>4),u.next()}function o(s,u){return u.x=s.x,u.y=s.y,u.z=s.z,u.w=s.w,u.v=s.v,u.d=s.d,u}function i(s,u){var c=new a(s),l=u&&u.state,h=function(){return(c.next()>>>0)/4294967296};return h.double=function(){do var f=((c.next()>>>11)+(c.next()>>>0)/4294967296)/2097152;while(f===0);return f},h.int32=c.next,h.quick=h,l&&(typeof l=="object"&&o(l,c),h.state=function(){return o(c,{})}),h}e&&e.exports?e.exports=i:this.xorwow=i})(0,n)})),fp=$n((function(n){(function(t,e,r){function a(s){var u=this;u.next=function(){var c,l,h=u.x,f=u.i;return c=h[f],l=(c^=c>>>7)^c<<24,l^=(c=h[f+1&7])^c>>>10,l^=(c=h[f+3&7])^c>>>3,l^=(c=h[f+4&7])^c<<7,c=h[f+7&7],l^=(c^=c<<13)^c<<9,h[f]=l,u.i=f+1&7,l},(function(c,l){var h,f=[];if(l===(0|l))f[0]=l;else for(l=""+l,h=0;h<l.length;++h)f[7&h]=f[7&h]<<15^l.charCodeAt(h)+f[h+1&7]<<13;for(;f.length<8;)f.push(0);for(h=0;h<8&&f[h]===0;++h);for(h==8?f[7]=-1:f[h],c.x=f,c.i=0,h=256;h>0;--h)c.next()})(u,s)}function o(s,u){return u.x=s.x.slice(),u.i=s.i,u}function i(s,u){s==null&&(s=+new Date);var c=new a(s),l=u&&u.state,h=function(){return(c.next()>>>0)/4294967296};return h.double=function(){do var f=((c.next()>>>11)+(c.next()>>>0)/4294967296)/2097152;while(f===0);return f},h.int32=c.next,h.quick=h,l&&(l.x&&o(l,c),h.state=function(){return o(c,{})}),h}e&&e.exports?e.exports=i:this.xorshift7=i})(0,n)})),dp=$n((function(n){(function(t,e,r){function a(s){var u=this;u.next=function(){var c,l,h=u.w,f=u.X,d=u.i;return u.w=h=h+1640531527|0,l=f[d+34&127],c=f[d=d+1&127],l^=l<<13,c^=c<<17,l^=l>>>15,c^=c>>>12,l=f[d]=l^c,u.i=d,l+(h^h>>>16)|0},(function(c,l){var h,f,d,p,v,m=[],g=128;for(l===(0|l)?(f=l,l=null):(l+="\0",f=0,g=Math.max(g,l.length)),d=0,p=-32;p<g;++p)l&&(f^=l.charCodeAt((p+32)%l.length)),p===0&&(v=f),f^=f<<10,f^=f>>>15,f^=f<<4,f^=f>>>13,p>=0&&(v=v+1640531527|0,d=(h=m[127&p]^=f+v)==0?d+1:0);for(d>=128&&(m[127&(l&&l.length||0)]=-1),d=127,p=512;p>0;--p)f=m[d+34&127],h=m[d=d+1&127],f^=f<<13,h^=h<<17,f^=f>>>15,h^=h>>>12,m[d]=f^h;c.w=v,c.X=m,c.i=d})(u,s)}function o(s,u){return u.i=s.i,u.w=s.w,u.X=s.X.slice(),u}function i(s,u){s==null&&(s=+new Date);var c=new a(s),l=u&&u.state,h=function(){return(c.next()>>>0)/4294967296};return h.double=function(){do var f=((c.next()>>>11)+(c.next()>>>0)/4294967296)/2097152;while(f===0);return f},h.int32=c.next,h.quick=h,l&&(l.X&&o(l,c),h.state=function(){return o(c,{})}),h}e&&e.exports?e.exports=i:this.xor4096=i})(0,n)})),pp=$n((function(n){(function(t,e,r){function a(s){var u=this,c="";u.next=function(){var h=u.b,f=u.c,d=u.d,p=u.a;return h=h<<25^h>>>7^f,f=f-d|0,d=d<<24^d>>>8^p,p=p-h|0,u.b=h=h<<20^h>>>12^f,u.c=f=f-d|0,u.d=d<<16^f>>>16^p,u.a=p-h|0},u.a=0,u.b=0,u.c=-1640531527,u.d=1367130551,s===Math.floor(s)?(u.a=s/4294967296|0,u.b=0|s):c+=s;for(var l=0;l<c.length+20;l++)u.b^=0|c.charCodeAt(l),u.next()}function o(s,u){return u.a=s.a,u.b=s.b,u.c=s.c,u.d=s.d,u}function i(s,u){var c=new a(s),l=u&&u.state,h=function(){return(c.next()>>>0)/4294967296};return h.double=function(){do var f=((c.next()>>>11)+(c.next()>>>0)/4294967296)/2097152;while(f===0);return f},h.int32=c.next,h.quick=h,l&&(typeof l=="object"&&o(l,c),h.state=function(){return o(c,{})}),h}e&&e.exports?e.exports=i:this.tychei=i})(0,n)})),zn=$n((function(n){(function(t,e){var r,a=this,o=256,i=6,s="random",u=e.pow(o,i),c=e.pow(2,52),l=2*c,h=o-1;function f(g,y,b){var x=[],w=v((function S(_,R){var D,A=[],O=typeof _;if(R&&O=="object")for(D in _)try{A.push(S(_[D],R-1))}catch{}return A.length?A:O=="string"?_:_+"\0"})((y=y==1?{entropy:!0}:y||{}).entropy?[g,m(t)]:g??(function(){try{var S;return r&&(S=r.randomBytes)?S=S(o):(S=new Uint8Array(o),(a.crypto||a.msCrypto).getRandomValues(S)),m(S)}catch{var _=a.navigator,R=_&&_.plugins;return[+new Date,a,R,a.screen,m(t)]}})(),3),x),C=new d(x),k=function(){for(var S=C.g(i),_=u,R=0;S<c;)S=(S+R)*o,_*=o,R=C.g(1);for(;S>=l;)S/=2,_/=2,R>>>=1;return(S+R)/_};return k.int32=function(){return 0|C.g(4)},k.quick=function(){return C.g(4)/4294967296},k.double=k,v(m(C.S),t),(y.pass||b||function(S,_,R,D){return D&&(D.S&&p(D,C),S.state=function(){return p(C,{})}),R?(e[s]=S,_):S})(k,w,"global"in y?y.global:this==e,y.state)}function d(g){var y,b=g.length,x=this,w=0,C=x.i=x.j=0,k=x.S=[];for(b||(g=[b++]);w<o;)k[w]=w++;for(w=0;w<o;w++)k[w]=k[C=h&C+g[w%b]+(y=k[w])],k[C]=y;(x.g=function(S){for(var _,R=0,D=x.i,A=x.j,O=x.S;S--;)_=O[D=h&D+1],R=R*o+O[h&(O[D]=O[A=h&A+_])+(O[A]=_)];return x.i=D,x.j=A,R})(o)}function p(g,y){return y.i=g.i,y.j=g.j,y.S=g.S.slice(),y}function v(g,y){for(var b,x=g+"",w=0;w<x.length;)y[h&w]=h&(b^=19*y[h&w])+x.charCodeAt(w++);return m(y)}function m(g){return String.fromCharCode.apply(0,g)}if(e["seed"+s]=f,v(e.random(),t),n.exports){n.exports=f;try{r=require("crypto")}catch{}}})([],Math)}));zn.alea=cp,zn.xor128=lp,zn.xorwow=hp,zn.xorshift7=fp,zn.xor4096=dp,zn.tychei=pp;var Ja=zn.alea,Ei=(function(){function n(t,e,r,a,o){this.mean=t,this.stdDev=e,this.dtype=r,this.nextVal=NaN,this.truncated=a,this.truncated&&(this.upper=this.mean+2*this.stdDev,this.lower=this.mean-2*this.stdDev);var i=o||Math.random();this.random=Ja(i.toString())}return n.prototype.nextValue=function(){if(!isNaN(this.nextVal)){var t=this.nextVal;return this.nextVal=NaN,t}for(var e,r,a=!1;!a;){var o=void 0,i=void 0,s=void 0;do s=(o=2*this.random()-1)*o+(i=2*this.random()-1)*i;while(s>=1||s===0);var u=Math.sqrt(-2*Math.log(s)/s);e=this.mean+this.stdDev*o*u,r=this.mean+this.stdDev*i*u,this.truncated&&!this.isValidTruncated(e)||(a=!0)}return this.truncated&&!this.isValidTruncated(r)||(this.nextVal=this.convertValue(r)),this.convertValue(e)},n.prototype.convertValue=function(t){return this.dtype==null||this.dtype==="float32"?t:Math.round(t)},n.prototype.isValidTruncated=function(t){return t<=this.upper&&t>=this.lower},n})(),vp=(function(){function n(t,e,r,a){this.alpha=t,this.beta=1/e,this.dtype=r;var o=a||Math.random();this.randu=Ja(o.toString()),this.randn=new Ei(0,1,r,!1,this.randu()),this.d=t<1?t+2/3:t-1/3,this.c=1/Math.sqrt(9*this.d)}return n.prototype.nextValue=function(){for(var t,e,r,a,o,i;;){do a=this.randn.nextValue(),i=1+this.c*a;while(i<=0);if(i*=i*i,e=1-.331*(t=a*a)*t,r=.5*t+this.d*(1-i+Math.log(i)),(o=this.randu())<e||Math.log(o)<r)break}return i=1/this.beta*this.d*i,this.alpha<1&&(i*=Math.pow(this.randu(),1/this.alpha)),this.convertValue(i)},n.prototype.convertValue=function(t){return this.dtype==="float32"?t:Math.round(t)},n})(),mp=(function(){function n(t,e,r,a){var o=this;if(t===void 0&&(t=0),e===void 0&&(e=1),this.canReturnFloat=function(){return o.dtype==null||o.dtype==="float32"},this.min=t,this.range=e-t,this.dtype=r,a==null&&(a=Math.random()),typeof a=="number"&&(a=a.toString()),!this.canReturnFloat()&&this.range<=1)throw new Error("The difference between "+t+" - "+e+" <= 1 and dtype is not float");this.random=Ja(a)}return n.prototype.convertValue=function(t){return this.canReturnFloat()?t:Math.round(t)},n.prototype.nextValue=function(){return this.convertValue(this.min+this.range*this.random())},n})();function fe(n,t,e){return t===void 0&&(t="float32"),t=t||"float32",Zu(n),new Or(n,t,e)}function gp(n,t){t===void 0&&(t=!1),console.log(n.toString(t))}var sc=T({batchToSpaceND_:function(n,t,e){var r=E(n,"x","batchToSpaceND"),a=t.reduce((function(o,i){return o*i}));return I(r.rank>=1+t.length,(function(){return"input rank is "+r.rank+" but should be > than blockShape.length "+t.length})),I(e.length===t.length,(function(){return"crops.length is "+e.length+" but should be equal to blockShape.length  "+t.length})),I(r.shape[0]%a==0,(function(){return"input tensor batch is "+r.shape[0]+" but is not divisible by the product of the elements of blockShape "+t.join(" * ")+" === "+a})),M.runKernelFunc((function(o){return o.batchToSpaceND(r,t,e)}),{$x:r},(function(o){return{$x:function(){return o.spaceToBatchND(t,e)}}}))}}),yp=T({broadcastTo_:function(n,t){var e=E(n,"broadcastTo","x"),r=e.shape;if(t.some((function(u){return!(u>0)||u%1!=0})))throw new Error("broadcastTo(): Invalid broadcast shape ["+t+"].");if(t.length<e.rank)throw new Error("broadcastTo(): shape.length="+t.length+" < input.rank="+e.rank+".");if(t.length>e.rank){for(var a=e.shape.slice();a.length<t.length;)a.unshift(1);e=e.reshape(a)}for(var o=Array.from(t),i=t.length-1;i>=0;i--)if(e.shape[i]===t[i])o[i]=1;else if(e.shape[i]!==1)throw new Error("broadcastTo(): ["+r+"] cannot be broadcast to ["+t+"].");var s=o.map((function(u,c){return u>1?c:-1})).filter((function(u){return u>=0}));return s.length===0?e.clone():M.runKernelFunc((function(u){return u.tile(e,o)}),{input:e},(function(u){return{input:function(){return u.sum(s,!0)}}}))}}),xp=T({cast_:function(n,t){var e=E(n,"x","cast");if(!hd(t))throw new Error("Failed to cast to unknown dtype "+t);if(t==="string"&&e.dtype!=="string"||t!=="string"&&e.dtype==="string")throw new Error("Only strings can be casted to strings");var r={dtype:t};return M.runKernelFunc((function(a){return a.cast(e,t)}),{x:e},(function(a){return{x:function(){return a.clone()}}}),"Cast",r)}}),bp=T({clone_:function(n){var t=E(n,"x","clone",null);return M.runKernelFunc((function(){return M.makeTensorFromDataId(t.dataId,t.shape,t.dtype)}),{$x:t},(function(e){return{$x:function(){return e.toFloat()}}}))}}),wp=T({cumsum_:function(n,t,e,r){t===void 0&&(t=0),e===void 0&&(e=!1),r===void 0&&(r=!1);var a=E(n,"x","cumsum"),o=sn([t|=0],a.rank),i=a;o!=null&&(i=a.transpose(o));var s=un(1,a.rank)[0],u=M.runKernelFunc((function(c){return c.cumsum(i,s,e,r)}),{permutedX:i},(function(c){return{permutedX:function(){return c.cumsum(t,e,!r)}}}));return o!=null&&(u=u.transpose(o)),u}}),Cp=T({depthToSpace_:function(n,t,e){e===void 0&&(e="NHWC");var r=E(n,"x","depthToSpace"),a=e==="NHWC"?r.shape[1]:r.shape[2],o=e==="NHWC"?r.shape[2]:r.shape[3],i=e==="NHWC"?r.shape[3]:r.shape[1];return I(a*t>=0,(function(){return`Negative dimension size caused by overflow when multiplying
      `+a+" and "+t+`  for depthToSpace with input shape
      `+r.shape})),I(o*t>=0,(function(){return`Negative dimension size caused by overflow when multiplying
      `+o+" and "+t+` for depthToSpace with input shape
          `+r.shape})),I(i%(t*t)==0,(function(){return"Dimension size must be evenly divisible by "+t*t+" but is "+i+" for depthToSpace with input shape "+r.shape})),M.runKernelFunc((function(s){return s.depthToSpace(r,t,e)}),{$x:r})}}),Ft=T({expandDims_:function(n,t){t===void 0&&(t=0);var e=E(n,"x","expandDims",null);I(t<=e.rank,(function(){return"Axis must be <= rank of the tensor"}));var r=e.shape.slice();return t<0&&(I(-(e.rank+1)<=t,(function(){return"Axis must be in the interval ["+-(e.rank+1)+", "+e.rank+"]"})),t=e.rank+t+1),r.splice(t,0,1),zt(e,r)}}),uc=T({eye_:function(n,t,e,r){r===void 0&&(r="float32"),t==null&&(t=n);for(var a=fe([n,t],r),o=n<=t?n:t,i=0;i<o;++i)a.set(1,i,i);var s=a.toTensor().as2D(n,t);if(e==null)return s;if(e.length===1)return dr(Ft(s,0),[e[0],1,1]);if(e.length===2)return dr(Ft(Ft(s,0),0),[e[0],e[1],1,1]);if(e.length===3)return dr(Ft(Ft(Ft(s,0),0),0),[e[0],e[1],e[2],1,1]);throw new Error("eye() currently supports only 1D and 2D batchShapes, but received "+e.length+"D.")}}),Ep=T({multinomial_:function(n,t,e,r){r===void 0&&(r=!1);var a=E(n,"logits","multinomial"),o=a.size,i=a.rank;if(o<2)throw new Error("Error in multinomial: you need at least 2 outcomes, but got "+o+".");if(i>2)throw new Error("Rank of probabilities must be 1 or 2, but is "+i);e=e||Math.random();var s=i===1?a.as2D(1,-1):a,u=M.runKernelFunc((function(c){return c.multinomial(s,r,t,e)}),{logits2D:s});return i===1?u.as1D():u}}),ti=T({oneHot_:function(n,t,e,r){if(e===void 0&&(e=1),r===void 0&&(r=0),t<2)throw new Error("Error in oneHot: depth must be >=2, but it is "+t);var a=E(n,"indices","oneHot","int32"),o=a.shape.concat([t]);return a=a.flatten(),M.runKernelFunc((function(i){return i.oneHot(a,t,e,r)}),{$indices:a},(function(i){return{$indices:function(){return Ne(a.shape,"float32")}}})).reshape(o)}}),Jn=T({pad_:function(n,t,e){e===void 0&&(e=0);var r=E(n,"x","pad");if(r.rank===0)throw new Error("pad(scalar) is not defined. Pass non-scalar to pad");var a={paddings:t,constantValue:e};return M.runKernelFunc((function(o){return o.pad(r,t,e)}),{x:r},(function(o){var i=t.map((function(s){return s[0]}));return{x:function(){return o.slice(i,r.shape)}}}),"PadV2",a)}}),_p=T({pad1d_:function(n,t,e){return e===void 0&&(e=0),I(t.length===2,(function(){return"Invalid number of paddings. Must be length of 2."})),Jn(n,[t],e)}}),Sp=T({pad2d_:function(n,t,e){return e===void 0&&(e=0),I(t.length===2&&t[0].length===2&&t[1].length===2,(function(){return"Invalid number of paddings. Must be length of 2 each."})),Jn(n,t,e)}}),Rp=T({pad3d_:function(n,t,e){return e===void 0&&(e=0),I(t.length===3&&t[0].length===2&&t[1].length===2&&t[2].length===2,(function(){return"Invalid number of paddings. Must be length of 2 each."})),Jn(n,t,e)}}),Ip=T({pad4d_:function(n,t,e){return e===void 0&&(e=0),I(t.length===4&&t[0].length===2&&t[1].length===2&&t[2].length===2&&t[3].length===2,(function(){return"Invalid number of paddings. Must be length of 2 each."})),Jn(n,t,e)}}),kp=T({rand_:function(n,t,e){var r=Z(n),a=null;if(e==null||e==="float32")a=new Float32Array(r);else if(e==="int32")a=new Int32Array(r);else{if(e!=="bool")throw new Error("Unknown data type "+e);a=new Uint8Array(r)}for(var o=0;o<r;o++)a[o]=t();return M.makeTensor(a,n,e)}}),Tp=T({randomNormal_:function(n,t,e,r,a){if(t===void 0&&(t=0),e===void 0&&(e=1),r!=null&&r==="bool")throw new Error("Unsupported data type "+r);for(var o=new Ei(t,e,r,!1,a),i=fe(n,r),s=0;s<i.values.length;s++)i.values[s]=o.nextValue();return i.toTensor()}}),Ap=T({randomGamma_:function(n,t,e,r,a){if(e===void 0&&(e=1),r===void 0&&(r="float32"),e==null&&(e=1),r==null&&(r="float32"),r!=="float32"&&r!=="int32")throw new Error("Unsupported data type "+r);for(var o=new vp(t,e,r,a),i=fe(n,r),s=0;s<i.values.length;s++)i.values[s]=o.nextValue();return i.toTensor()}}),cc=T({randomUniform_:function(n,t,e,r,a){t===void 0&&(t=0),e===void 0&&(e=1),r===void 0&&(r="float32");for(var o=fe(n,r),i=new mp(t,e,null,a),s=0;s<o.values.length;s++)o.values[s]=i.nextValue();return o.toTensor()}}),zt=T({reshape_:function(n,t){var e=E(n,"x","reshape",null);t=cd(t,e.size),I(e.size===Z(t),(function(){return"new shape and old shape must have the same number of elements."}));var r={shape:t};return M.runKernelFunc((function(a){return a.reshape(e,t)}),{x:e},(function(a){return{x:function(){return a.reshape(e.shape)}}}),"Reshape",r)}}),lc=T({spaceToBatchND_:function(n,t,e){var r=E(n,"x","spaceToBatchND");return I(r.rank>=1+t.length,(function(){return"input rank "+r.rank+" should be > than [blockShape] "+t.length})),I(e.length===t.length,(function(){return"paddings.shape[0] "+e.length+" must be equal to [blockShape] "+t.length})),I(r.shape.reduce((function(a,o,i){return i>0&&i<=t.length?a&&(o+e[i-1][0]+e[i-1][1])%t[i-1]==0:a}),!0),(function(){return"input spatial dimensions "+r.shape.slice(1)+" with paddings "+e.toString()+" must be divisible by blockShapes "+t.toString()})),M.runKernelFunc((function(a){return a.spaceToBatchND(r,t,e)}),{$x:r},(function(a){return{$x:function(){return a.batchToSpaceND(t,e)}}}))}}),hc=T({squeeze_:function(n,t){var e=E(n,"x","squeeze");return zt(e,Gn(e.shape,t).newShape)}}),kt=T({stack_:function(n,t){t===void 0&&(t=0);var e=Ma(n,"tensors","stack");if(I(e.length>=1,(function(){return"Pass at least one tensor to tf.stack"})),e.length===1)return e[0].expandDims(t);var r=e[0].rank,a=e[0].shape,o=e[0].dtype;I(t<=r,(function(){return"Axis must be <= rank of the tensor"})),e.forEach((function(s){ke(a,s.shape,"All tensors passed to stack must have matching shapes")})),e.forEach((function(s){I(o===s.dtype,(function(){return"All tensors passed to stack must have matching dtypes"}))}));var i=e.map((function(s){return s.expandDims(t)}));return He(i,t)}}),dr=T({tile_:function(n,t){var e=E(n,"x","tile",null);I(e.rank===t.length,(function(){return"Error in transpose: rank of input "+e.rank+" must match length of reps "+t+"."}));var r=[e],a={reps:t};return M.runKernelFunc((function(o,i){var s=o.tile(e,t);return i([e]),s}),{x:e},(function(o,i){var s=i[0];return{x:function(){var u=Ee(s);if(s.rank===1)for(var c=0;c<t[0];++c)u=u.add(o.slice([c*s.shape[0]],[s.shape[0]]));else if(s.rank===2)for(c=0;c<t[0];++c)for(var l=0;l<t[1];++l)u=u.add(o.slice([c*s.shape[0],l*s.shape[1]],[s.shape[0],s.shape[1]]));else if(s.rank===3)for(c=0;c<t[0];++c)for(l=0;l<t[1];++l)for(var h=0;h<t[2];++h)u=u.add(o.slice([c*s.shape[0],l*s.shape[1],h*s.shape[2]],[s.shape[0],s.shape[1],s.shape[2]]));else{if(s.rank!==4)throw new Error("Gradient for tile operation is not implemented for rank-"+s.rank+" tensors yet.");for(c=0;c<t[0];++c)for(l=0;l<t[1];++l)for(h=0;h<t[2];++h)for(var f=0;f<t[3];++f)u=u.add(o.slice([c*s.shape[0],l*s.shape[1],h*s.shape[2],f*s.shape[3]],[s.shape[0],s.shape[1],s.shape[2],s.shape[3]]))}return u}}}),"Tile",a,r)}}),Dp=T({truncatedNormal_:function(n,t,e,r,a){if(t===void 0&&(t=0),e===void 0&&(e=1),r!=null&&r==="bool")throw new Error("Unsupported data type "+r);for(var o=new Ei(t,e,r,!0,a),i=fe(n,r),s=0;s<i.values.length;s++)i.values[s]=o.nextValue();return i.toTensor()}}),je=T({unstack_:function(n,t){t===void 0&&(t=0),t=t||0;var e=E(n,"x","unstack");I(t>=-e.shape.length&&t<e.shape.length,(function(){return"Axis = "+t+" is not in [-"+e.shape.length+", "+e.shape.length+")"})),t<0&&(t+=e.shape.length);var r={axis:t};return M.runKernelFunc((function(a){return a.unstack(e,t)}),{x:e},(function(a){return{x:function(){return kt(a,t)}}}),"Unpack",r)}}),Mp=function(n,t){return $(this,void 0,void 0,(function(){var e,r,a,o,i,s,u,c,l,h;return J(this,(function(f){switch(f.label){case 0:return e=E(n,"x","setdiff1d"),r=E(t,"y","setdiff1d"),I(e.dtype===r.dtype,(function(){return"x and y should have the same dtype, but got x ("+e.dtype+") and y ("+r.dtype+")."})),I(e.rank===1,(function(){return"x should be 1D tensor, but got x ("+e.shape+")."})),I(r.rank===1,(function(){return"y should be 1D tensor, but got y ("+r.shape+")."})),[4,e.data()];case 1:return a=f.sent(),[4,r.data()];case 2:for(o=f.sent(),i=new Set(o),s=0,l=0;l<a.length;l++)i.has(a[l])||s++;for(u=new Or([s],e.dtype),c=new Or([s],"int32"),l=0,h=0;l<a.length;l++)i.has(a[l])||(u.values[h]=a[l],c.values[h]=l,h++);return[2,[u.toTensor(),c.toTensor()]]}}))}))};function Fa(n,t,e,r){r===void 0&&(r=!0);var a=[];if(r)(a=a.concat(t.slice(0))).push(n[0]/e),a=a.concat(n.slice(1));else{a=a.concat(n[0]);for(var o=t.length,i=0;i<o;++i)a=a.concat([n[i+1]/t[i],t[i]]);a=a.concat(n.slice(o+1))}return a}function Pa(n,t,e){e===void 0&&(e=!0);var r=[];if(e){r.push(t);for(var a=t+1;a<n;++a)a<=2*t?(r.push(a),r.push(a-(t+1))):r.push(a)}else{var o=[],i=[];for(a=1;a<n;++a)a>=2*t+1||a%2==1?i.push(a):o.push(a);r.push.apply(r,o),r.push(0),r.push.apply(r,i)}return r}function Ba(n,t,e,r){r===void 0&&(r=!0);var a=[];r?a.push(n[0]/e):a.push(n[0]*e);for(var o=1;o<n.length;++o)o<=t.length?r?a.push(t[o-1]*n[o]):a.push(n[o]/t[o-1]):a.push(n[o]);return a}function fc(n,t){for(var e=[0],r=0;r<t;++r)e.push(n[r][0]);return e}function dc(n,t,e){for(var r=n.slice(0,1),a=0;a<e;++a)r.push(n[a+1]-t[a][0]-t[a][1]);return r}function pc(n,t){if(n.rank<1)throw new Error("tf.gatherND() expects the input to be rank 1 or higher, but the rank was "+n.rank+".");if(t.rank<1)throw new Error("tf.gatherND() expects the indices to be rank 1 or higher, but the rank was "+t.rank+".");if(t.dtype!=="int32")throw new Error("tf.gatherND() expects the indices to be int32 type, but the dtype was "+t.dtype+".");if(t.shape[t.rank-1]>n.rank)throw new Error("index innermost dimension length must be <= tensor rank; saw: "+t.shape[t.rank-1]+" vs. "+n.rank);if(n.size===0)throw new Error("Requested more than 0 entries, but input is empty. Input shape: "+n.shape+".");for(var e=t.shape,r=e[e.length-1],a=1,o=0;o<e.length-1;++o)a*=e[o];var i=n.shape,s=e.slice();s.pop();var u=1;for(o=r;o<n.rank;++o)u*=i[o],s.push(i[o]);var c=nn(n.shape).map((function(l){return l/u})).concat([1]).slice(0,r);return[s,a,u,c]}var vc=30;function So(n){return n<=vc?n:Yo(n,Math.floor(Math.sqrt(n)))}function Np(n,t,e){var r=t.rank>1?t.shape[t.rank-1]:1,a=t.rank>1?t.rank-1:1,o="Must have updates.shape = indices.shape[:batchDim] + shape[sliceDim:], got updates.shape: "+e.shape+", indices.shape: "+t.shape+", shape: "+n+", sliceDim: "+r+", and batchDim: "+a+".";if(e.rank<a)throw new Error(o+" update.rank < "+a+". ");if(n.length<r+(e.rank-a))throw new Error(o+" Output shape length < "+(r+(e.rank-a)));if(e.rank!==a+n.length-r)throw new Error(o+" update.rank != "+(a+n.length-r));for(var i=0;i<a;++i)if(e.shape[i]!==t.shape[i])throw new Error(o+" updates.shape["+i+"] ("+e.shape[i]+") != indices.shape["+i+"] ("+t.shape[i]+").");for(i=0;i<e.rank-a;++i)if(e.shape[i+a]!==n[i+r])throw new Error(o+" updates.shape["+(i+a)+"] ("+e.shape[i+a]+") != shape["+(i+a)+"] ("+n[i+a]+")")}function Fp(n,t,e){if(t.rank<1)throw new Error("tf.scatterND() expects the indices to be rank 1 or higher, but the rank was "+t.rank+".");if(n.rank<1)throw new Error("tf.scatterND() expects the updates to be rank 1 or higher, but the rank was "+n.rank+".");if(t.dtype!=="int32")throw new Error("The dtype of 'indices' should be int32, but got dtype: "+t.dtype);if(e.length<1)throw new Error("Output rank must be greater or equal to 1, but got shape: "+e);if(e.length===0){if(t.size===0)throw new Error("Indices specified for empty output. indices shape: "+t.shape);if(n.size===0)throw new Error("Updates specified for empty output. updates shape: "+n.shape)}Np(e,t,n)}function Oa(n,t,e){for(var r=t.shape.length,a=r>1?t.shape[r-1]:1,o=e.length,i=1,s=a;s<o;++s)i*=e[s];var u=a<1?1:a;return{sliceRank:a,numUpdates:Z(t.shape)/u,sliceSize:i,strides:nn(e.slice(0,a)).concat([1]),outputSize:Z(e)}}function Pp(n,t,e){I(n.rank===t.length,(function(){return"Error in slice"+n.rank+"D: Length of begin "+t+" must match the rank of the array ("+n.rank+")."})),I(n.rank===e.length,(function(){return"Error in slice"+n.rank+"D: Length of size "+e+" must match the rank of the array ("+n.rank+")."}));for(var r=function(o){I(t[o]+e[o]<=n.shape[o],(function(){return"Error in slice"+n.rank+"D: begin["+o+"] + size["+o+"] ("+(t[o]+e[o])+") would overflow input.shape["+o+"] ("+n.shape[o]+")"}))},a=0;a<n.rank;++a)r(a)}function Ls(n){for(var t=[],e=0;n>0;)1&n&&t.push(e),n/=2,e++;return t}function _i(n,t,e){for(var r=[],a=0;a<n.length;a++)r[a]=Math.ceil((t[a]-n[a])/e[a]);return r}function Bp(n,t,e,r,a){var o=t[a],i=e[a]||1;(n&1<<a||o==null)&&(o=i>0?Number.MIN_SAFE_INTEGER:Number.MAX_SAFE_INTEGER);var s=r[a];return o<0&&(o+=s),o=qo(0,o,s-1)}function Op(n,t,e,r,a){var o=t[a],i=e[a]||1;(n&1<<a||o==null)&&(o=i>0?Number.MAX_SAFE_INTEGER:Number.MIN_SAFE_INTEGER);var s=r[a];return o<0&&(o+=s),o=i>0?qo(0,o,s):qo(-1,o,s-1)}function mc(n,t,e){for(var r=e.length,a=0;a<e.length;a++)if(e[a]>1){r=a;break}for(a=r+1;a<e.length;a++)if(t[a]>0||e[a]!==n[a])return!1;return!0}function gc(n,t){for(var e=n.length>0?n[n.length-1]:1,r=0;r<n.length-1;r++)e+=n[r]*t[r];return e}function Lp(n,t){I(Ko(n),(function(){return"The f passed in variableGrads(f) must be a function"})),I(t==null||Array.isArray(t)&&t.every((function(l){return l instanceof wr})),(function(){return"The varList passed in variableGrads(f, varList) must be an array of variables"}));var e=t!=null;if(!e)for(var r in t=[],M.registeredVariables)t.push(M.registeredVariables[r]);var a=e?t.filter((function(l){return!l.trainable})):null,o=t.length;I((t=t.filter((function(l){return l.trainable}))).length>0,(function(){return"variableGrads() expects at least one of the input variables to be trainable, but none of the "+o+" variables is trainable."}));var i=M.gradients(n,t,null,!0),s=i.value,u=i.grads;I(u.some((function(l){return l!=null})),(function(){return"Cannot find a connection between any variable and the result of the loss function y=f(x). Please make sure the operations that use variables are inside the function f passed to minimize()."})),I(s.rank===0,(function(){return"The f passed in variableGrads(f) must return a scalar, but it returned a rank-"+s.rank+" tensor"}));var c={};return t.forEach((function(l,h){u[h]!=null&&(c[l.name]=u[h])})),a?.forEach((function(l){return c[l.name]=null})),{value:s,grads:c}}function Qa(n){return M.customGrad(n)}var mn=T({softmax_:function(n,t){t===void 0&&(t=-1);var e=E(n,"logits","softmax","float32");if(t===-1&&(t=e.rank-1),t!==e.rank-1)throw Error("Softmax along a non-last dimension is not yet supported. Logits was rank "+e.rank+" and dim was "+t);return M.runKernelFunc((function(r,a){var o=r.softmax(e,t);return a([o]),o}),{logits:e},(function(r,a){var o=a[0],i=r.mul(o);return{logits:function(){return i.sub(i.sum([t],!0).mul(o))}}}),"Softmax",{dim:t},[],[!0])}}),Up=T({logSoftmax_:function(n,t){t===void 0&&(t=-1);var e=E(n,"logits","logSoftmax");if(t===-1&&(t=e.rank-1),t!==e.rank-1)throw Error("Log Softmax along a non-last dimension is not yet supported. Logits was rank "+e.rank+" and axis was "+t);return Qa((function(r,a){var o=r.max(t,!0),i=r.sub(o),s=i.toFloat().sub(i.exp().sum(t,!0).log());return a([s]),{value:s,gradFunc:function(u,c){var l=c[0].exp();return u.sub(u.sum(t,!0).mul(l))}}}))(e)}}),yc=(function(){function n(t,e){this.backend=t,this.dataMover=e,this.data=new WeakMap,this.dataIdsCount=0}return n.prototype.get=function(t){return this.data.has(t)||this.dataMover.moveData(this.backend,t),this.data.get(t)},n.prototype.set=function(t,e){this.dataIdsCount++,this.data.set(t,e)},n.prototype.has=function(t){return this.data.has(t)},n.prototype.delete=function(t){return this.dataIdsCount--,this.data.delete(t)},n.prototype.numDataIds=function(){return this.dataIdsCount},n})(),xc=(function(){function n(){}return n.prototype.time=function(t){return N("time")},n.prototype.read=function(t){return N("read")},n.prototype.readSync=function(t){return N("readSync")},n.prototype.numDataIds=function(){return N("numDataIds")},n.prototype.disposeData=function(t){return N("disposeData")},n.prototype.write=function(t,e,r){return N("write")},n.prototype.move=function(t,e,r,a){return N("move")},n.prototype.memory=function(){return N("memory")},n.prototype.floatPrecision=function(){return N("floatPrecision")},n.prototype.epsilon=function(){return this.floatPrecision()===32?1e-7:1e-4},n.prototype.batchMatMul=function(t,e,r,a){return N("batchMatMul")},n.prototype.fusedBatchMatMul=function(t){return t.a,t.b,t.transposeA,t.transposeB,t.bias,t.activation,t.preluActivationWeights,N("fusedBatchMatMul")},n.prototype.slice=function(t,e,r){return N("slice")},n.prototype.stridedSlice=function(t,e,r,a){return N("stridedSlice")},n.prototype.unstack=function(t,e){return N("unstack")},n.prototype.reverse=function(t,e){return N("reverse")},n.prototype.concat=function(t,e){return N("concat")},n.prototype.neg=function(t){return N("neg")},n.prototype.add=function(t,e){return N("add")},n.prototype.addN=function(t){return N("addN")},n.prototype.subtract=function(t,e){return N("subtract")},n.prototype.multiply=function(t,e){return N("multiply")},n.prototype.realDivide=function(t,e){return N("realDivide")},n.prototype.floorDiv=function(t,e){return N("floorDiv")},n.prototype.sum=function(t,e){return N("sum")},n.prototype.prod=function(t,e){return N("prod")},n.prototype.unsortedSegmentSum=function(t,e,r){return N("unsortedSegmentSum")},n.prototype.argMin=function(t,e){return N("argMin")},n.prototype.argMax=function(t,e){return N("argMax")},n.prototype.equal=function(t,e){return N("equal")},n.prototype.notEqual=function(t,e){return N("notEqual")},n.prototype.less=function(t,e){return N("less")},n.prototype.lessEqual=function(t,e){return N("lessEqual")},n.prototype.greater=function(t,e){return N("greater")},n.prototype.greaterEqual=function(t,e){return N("greaterEqual")},n.prototype.logicalNot=function(t){return N("logicalNot")},n.prototype.logicalAnd=function(t,e){return N("logicalAnd")},n.prototype.logicalOr=function(t,e){return N("logicalOr")},n.prototype.where=function(t){return N("where")},n.prototype.select=function(t,e,r){return N("select")},n.prototype.topk=function(t,e,r){return N("topk")},n.prototype.min=function(t,e){return N("min")},n.prototype.minimum=function(t,e){return N("minimum")},n.prototype.mod=function(t,e){return N("mod")},n.prototype.max=function(t,e){return N("max")},n.prototype.maximum=function(t,e){return N("maximum")},n.prototype.all=function(t,e){return N("all")},n.prototype.any=function(t,e){return N("any")},n.prototype.squaredDifference=function(t,e){return N("squaredDifference")},n.prototype.ceil=function(t){return N("ceil")},n.prototype.floor=function(t){return N("floor")},n.prototype.round=function(t){return N("round")},n.prototype.sign=function(t){return N("sign")},n.prototype.isNaN=function(t){return N("isNaN")},n.prototype.isInf=function(t){return N("isInf")},n.prototype.isFinite=function(t){return N("isFinite")},n.prototype.pow=function(t,e){return N("pow")},n.prototype.exp=function(t){return N("exp")},n.prototype.expm1=function(t){return N("expm1")},n.prototype.softmax=function(t,e){return N("softmax")},n.prototype.log=function(t){return N("log")},n.prototype.log1p=function(t){return N("log1p")},n.prototype.sqrt=function(t){return N("sqrt")},n.prototype.rsqrt=function(t){return N("rsqrt")},n.prototype.square=function(t){return N("square")},n.prototype.reciprocal=function(t){return N("reciprocal")},n.prototype.relu=function(t){return N("relu")},n.prototype.relu6=function(t){return N("relu6")},n.prototype.prelu=function(t,e){return N("prelu")},n.prototype.elu=function(t){return N("elu")},n.prototype.eluDer=function(t,e){return N("eluDer")},n.prototype.selu=function(t){return N("selu")},n.prototype.int=function(t){return N("int")},n.prototype.clip=function(t,e,r){return N("clip")},n.prototype.abs=function(t){return N("abs")},n.prototype.complexAbs=function(t){return N("complexAbs")},n.prototype.sigmoid=function(t){return N("sigmoid")},n.prototype.softplus=function(t){return N("softplus")},n.prototype.sin=function(t){return N("sin")},n.prototype.cos=function(t){return N("cos")},n.prototype.tan=function(t){return N("tan")},n.prototype.asin=function(t){return N("asin")},n.prototype.acos=function(t){return N("acos")},n.prototype.atan=function(t){return N("atan")},n.prototype.atan2=function(t,e){return N("atan2")},n.prototype.sinh=function(t){return N("sinh")},n.prototype.cosh=function(t){return N("cosh")},n.prototype.tanh=function(t){return N("tanh")},n.prototype.asinh=function(t){return N("asinh")},n.prototype.acosh=function(t){return N("acosh")},n.prototype.atanh=function(t){return N("atanh")},n.prototype.erf=function(t){return N("erf")},n.prototype.step=function(t,e){return N("step")},n.prototype.fusedConv2d=function(t){return t.input,t.filter,t.convInfo,t.bias,t.activation,t.preluActivationWeights,N("fusedConv2d")},n.prototype.conv2d=function(t,e,r){return N("conv2d")},n.prototype.conv2dDerInput=function(t,e,r){return N("conv2dDerInput")},n.prototype.conv2dDerFilter=function(t,e,r){return N("conv2dDerFilter")},n.prototype.fusedDepthwiseConv2D=function(t){return t.input,t.filter,t.convInfo,t.bias,t.activation,t.preluActivationWeights,N("fusedDepthwiseConv2D")},n.prototype.depthwiseConv2D=function(t,e,r){return N("depthwiseConv2D")},n.prototype.depthwiseConv2DDerInput=function(t,e,r){return N("depthwiseConv2DDerInput")},n.prototype.depthwiseConv2DDerFilter=function(t,e,r){return N("depthwiseConv2DDerFilter")},n.prototype.conv3d=function(t,e,r){return N("conv3d")},n.prototype.conv3dDerInput=function(t,e,r){return N("conv3dDerInput")},n.prototype.conv3dDerFilter=function(t,e,r){return N("conv3dDerFilter")},n.prototype.maxPool=function(t,e){return N("maxPool")},n.prototype.maxPoolBackprop=function(t,e,r,a){return N("maxPoolBackprop")},n.prototype.avgPool=function(t,e){return N("avgPool")},n.prototype.avgPoolBackprop=function(t,e,r){return N("avgPoolBackprop")},n.prototype.avgPool3d=function(t,e){return N("avgPool3d")},n.prototype.avgPool3dBackprop=function(t,e,r){return N("avgPool3dBackprop")},n.prototype.maxPool3d=function(t,e){return N("maxPool3d")},n.prototype.maxPool3dBackprop=function(t,e,r,a){return N("maxPool3dBackprop")},n.prototype.reshape=function(t,e){return N("reshape")},n.prototype.cast=function(t,e){return N("cast")},n.prototype.tile=function(t,e){return N("tile")},n.prototype.pad=function(t,e,r){return N("pad")},n.prototype.transpose=function(t,e){return N("transpose")},n.prototype.gather=function(t,e,r){return N("gather")},n.prototype.gatherND=function(t,e){return N("gatherND")},n.prototype.scatterND=function(t,e,r){return N("scatterND")},n.prototype.batchToSpaceND=function(t,e,r){return N("batchToSpaceND")},n.prototype.spaceToBatchND=function(t,e,r){return N("spaceToBatchND")},n.prototype.resizeBilinear=function(t,e,r,a){return N("resizeBilinear")},n.prototype.resizeBilinearBackprop=function(t,e,r){return N("resizeBilinearBackprop")},n.prototype.resizeNearestNeighbor=function(t,e,r,a){return N("resizeNearestNeighbor")},n.prototype.resizeNearestNeighborBackprop=function(t,e,r){return N("resizeNearestNeighborBackprop")},n.prototype.batchNormalization=function(t,e,r,a,o,i){return N("batchNormalization")},n.prototype.localResponseNormalization4D=function(t,e,r,a,o){return N("localResponseNormalization4D")},n.prototype.LRNGrad=function(t,e,r,a,o,i,s){return N("LRNGrad")},n.prototype.multinomial=function(t,e,r,a){return N("multinomial")},n.prototype.oneHot=function(t,e,r,a){return N("oneHot")},n.prototype.cumsum=function(t,e,r,a){return N("cumsum")},n.prototype.nonMaxSuppression=function(t,e,r,a,o){return N("nonMaxSuppression")},n.prototype.fft=function(t){return N("fft")},n.prototype.ifft=function(t){return N("ifft")},n.prototype.complex=function(t,e){return N("complex")},n.prototype.real=function(t){return N("real")},n.prototype.imag=function(t){return N("imag")},n.prototype.cropAndResize=function(t,e,r,a,o,i){return N("cropAndResize")},n.prototype.depthToSpace=function(t,e,r){return N("depthToSpace")},n.prototype.split=function(t,e,r){return N("split")},n.prototype.sparseToDense=function(t,e,r,a){return N("sparseToDense")},n.prototype.diag=function(t){return N("diag")},n.prototype.fill=function(t,e,r){return N("fill")},n.prototype.onesLike=function(t){return N("onesLike")},n.prototype.zerosLike=function(t){return N("zerosLike")},n.prototype.linspace=function(t,e,r){return N("linspace")},n.prototype.dispose=function(){return N("dispose")},n})();function N(n){throw new Error("'"+n+"' not yet implemented or not found in the registry. Did you forget to import the kernel?")}function Sn(n,t){for(var e=n.length,r=[],a=0;a<e;a++){var o=e-1-a,i=n[o]||1;(t[t.length-1-a]||1)>1&&i===1&&r.unshift(o)}return r}function qe(n,t){for(var e=[],r=0;r<t.length;r++){var a=n[n.length-r-1],o=t.length-r-1,i=t[o];(a==null||a===1&&i>1)&&e.unshift(o)}return e}function we(n,t){for(var e=[],r=Math.max(n.length,t.length),a=0;a<r;a++){var o=n[n.length-a-1];o==null&&(o=1);var i=t[t.length-a-1];if(i==null&&(i=1),o===1)e.unshift(i);else if(i===1)e.unshift(o);else{if(o!==i)throw Error("Operands could not be broadcast together with shapes "+n+" and "+t+".");e.unshift(o)}}return e}function Ur(n,t,e,r,a,o,i){i===void 0&&(i="channelsLast");var s,u=Wa(t),c=u[0],l=u[1];if(i==="channelsLast")s=[c,l,n[3],n[3]];else{if(i!=="channelsFirst")throw new Error("Unknown dataFormat "+i);s=[c,l,n[1],n[1]]}return Qn(n,s,e,r,a,o,!1,i)}function La(n,t,e,r,a,o,i){i===void 0&&(i="NDHWC");var s,u,c=ni(t),l=c[0],h=c[1],f=c[2];if(i==="NDHWC")u="channelsLast",s=[l,h,f,n[4],n[4]];else{if(i!=="NCDHW")throw new Error("Unknown dataFormat "+i);u="channelsFirst",s=[l,h,f,n[1],n[1]]}return Ua(n,s,e,r,a,!1,u,o)}function Qn(n,t,e,r,a,o,i,s){i===void 0&&(i=!1),s===void 0&&(s="channelsLast");var u=[-1,-1,-1,-1],c=u[0],l=u[1],h=u[2],f=u[3];if(s==="channelsLast")c=n[0],l=n[1],h=n[2],f=n[3];else{if(s!=="channelsFirst")throw new Error("Unknown dataFormat "+s);c=n[0],f=n[1],l=n[2],h=n[3]}var d,p=t[0],v=t[1],m=t[3],g=Wa(e),y=g[0],b=g[1],x=Wa(r),w=x[0],C=x[1],k=pr(p,w),S=pr(v,C),_=(function(P,F,V,z,U,L,G,q){var Y,re,ie;if(typeof P=="number"){Y={top:P,bottom:P,left:P,right:P,type:P===0?"VALID":"NUMBER"};var se=(function(ve,me,oe,_e,be){_e==null&&(_e=bc(ve,me,oe));var Te=ve[0],vt=ve[1],ht=Fr((Te-me+2*_e)/oe+1,be);I(ze(ht),(function(){return"The output # of rows ("+ht+") must be an integer. Change the stride and/or zero pad parameters"}));var Ye=Fr((vt-me+2*_e)/oe+1,be);return I(ze(Ye),(function(){return"The output # of columns ("+Ye+") must be an integer. Change the stride and/or zero pad parameters"})),[ht,Ye]})([F,V],L,z,P,q);re=se[0],ie=se[1]}else if(P==="same"){re=Math.ceil(F/z),ie=Math.ceil(V/U);var ce=Math.max(0,(re-1)*z+L-F),he=Math.max(0,(ie-1)*U+G-V),de=Math.floor(ce/2),pe=ce-de,De=Math.floor(he/2);Y={top:de,bottom:pe,left:De,right:he-De,type:"SAME"}}else{if(P!=="valid")throw Error("Unknown padding parameter: "+P);Y={top:0,bottom:0,left:0,right:0,type:"VALID"},re=Math.ceil((F-L+1)/z),ie=Math.ceil((V-G+1)/U)}return{padInfo:Y,outHeight:re,outWidth:ie}})(a,l,h,y,b,k,S,o),R=_.padInfo,D=_.outHeight,A=_.outWidth,O=i?m*f:m;return s==="channelsFirst"?d=[c,O,D,A]:s==="channelsLast"&&(d=[c,D,A,O]),{batchSize:c,dataFormat:s,inHeight:l,inWidth:h,inChannels:f,outHeight:D,outWidth:A,outChannels:O,padInfo:R,strideHeight:y,strideWidth:b,filterHeight:p,filterWidth:v,effectiveFilterHeight:k,effectiveFilterWidth:S,dilationHeight:w,dilationWidth:C,inShape:n,outShape:d,filterShape:t}}function Ua(n,t,e,r,a,o,i,s){o===void 0&&(o=!1),i===void 0&&(i="channelsLast");var u=[-1,-1,-1,-1,-1],c=u[0],l=u[1],h=u[2],f=u[3],d=u[4];if(i==="channelsLast")c=n[0],l=n[1],h=n[2],f=n[3],d=n[4];else{if(i!=="channelsFirst")throw new Error("Unknown dataFormat "+i);c=n[0],d=n[1],l=n[2],h=n[3],f=n[4]}var p,v=t[0],m=t[1],g=t[2],y=t[4],b=ni(e),x=b[0],w=b[1],C=b[2],k=ni(r),S=k[0],_=k[1],R=k[2],D=pr(v,S),A=pr(m,_),O=pr(g,R),P=(function(G,q,Y,re,ie,se,ce,he,de,pe,De){var ve,me,oe,_e;if(typeof G=="number"){ve={top:G,bottom:G,left:G,right:G,front:G,back:G,type:G===0?"VALID":"NUMBER"};var be=(function(ln,At,tr,Ut,dt,nr){dt==null&&(dt=bc(ln,At,Ut));var ge=ln[0],Q=ln[1],Fe=ln[2],We=Fr((ge-At+2*dt)/Ut+1,nr);I(ze(We),(function(){return"The output # of depths ("+We+") must be an integer. Change the stride and/or zero pad parameters"}));var Pe=Fr((Q-At+2*dt)/Ut+1,nr);I(ze(Pe),(function(){return"The output # of rows ("+Pe+") must be an integer. Change the stride and/or zero pad parameters"}));var $e=Fr((Fe-At+2*dt)/Ut+1,nr);return I(ze($e),(function(){return"The output # of columns ("+$e+") must be an integer. Change the stride and/or zero pad parameters"})),[We,Pe,$e,tr]})([q,Y,re,1],he,1,ie,G,De);me=be[0],oe=be[1],_e=be[2]}else if(G==="same"){me=Math.ceil(q/ie),oe=Math.ceil(Y/se),_e=Math.ceil(re/ce);var Te=(me-1)*ie+he-q,vt=(oe-1)*se+de-Y,ht=(_e-1)*ce+pe-re,Ye=Math.floor(Te/2),Lt=Te-Ye,Tt=Math.floor(vt/2),ft=vt-Tt,Ct=Math.floor(ht/2);ve={top:Tt,bottom:ft,left:Ct,right:ht-Ct,front:Ye,back:Lt,type:"SAME"}}else{if(G!=="valid")throw Error("Unknown padding parameter: "+G);ve={top:0,bottom:0,left:0,right:0,front:0,back:0,type:"VALID"},me=Math.ceil((q-he+1)/ie),oe=Math.ceil((Y-de+1)/se),_e=Math.ceil((re-pe+1)/ce)}return{padInfo:ve,outDepth:me,outHeight:oe,outWidth:_e}})(a,l,h,f,x,w,C,D,A,O,s),F=P.padInfo,V=P.outDepth,z=P.outHeight,U=P.outWidth,L=o?y*d:y;return i==="channelsFirst"?p=[c,L,V,z,U]:i==="channelsLast"&&(p=[c,V,z,U,L]),{batchSize:c,dataFormat:i,inDepth:l,inHeight:h,inWidth:f,inChannels:d,outDepth:V,outHeight:z,outWidth:U,outChannels:L,padInfo:F,strideDepth:x,strideHeight:w,strideWidth:C,filterDepth:v,filterHeight:m,filterWidth:g,effectiveFilterDepth:D,effectiveFilterHeight:A,effectiveFilterWidth:O,dilationDepth:S,dilationHeight:_,dilationWidth:R,inShape:n,outShape:p,filterShape:t}}function bc(n,t,e,r){r===void 0&&(r=1);var a=pr(t,r);return Math.floor((n[0]*(e-1)-e+a)/2)}function Wa(n){return typeof n=="number"?[n,n,n]:n.length===2?[n[0],n[1],1]:n}function ni(n){return typeof n=="number"?[n,n,n]:n}function pr(n,t){return t<=1?n:n+(n-1)*(t-1)}function Fr(n,t){if(!t)return n;switch(t){case"round":return Math.round(n);case"ceil":return Math.ceil(n);case"floor":return Math.floor(n);default:throw new Error("Unknown roundingMode "+t)}}function Er(n){var t=Wa(n),e=t[0],r=t[1],a=t[2];return e===1&&r===1&&a===1}function wt(n,t){return Er(n)||Er(t)}function Si(n){if(n==="NHWC")return"channelsLast";if(n==="NCHW")return"channelsFirst";throw new Error("Unknown dataFormat "+n)}function wc(n,t,e){if(t==="complex64"){if(n.dtype==="complex64")return n.clone();var r=Ne(n.shape),a=n.toFloat(),o=e.complex(a,r);return r.dispose(),a.dispose(),o}if(!fd(n.dtype,t))return M.makeTensorFromDataId(n.dataId,n.shape,t);if(n.dtype==="complex64"){var i=e.real(n);return o=i.cast(t),i.dispose(),o}if(t==="int32")return e.int(n);if(t==="bool"){var s=X(0,n.dtype);return o=e.notEqual(n,s),s.dispose(),o}throw new Error("Error in Cast: failed to cast "+n.dtype+" to "+t)}function ri(n,t){return M.makeTensorFromDataId(n.dataId,t,n.dtype)}function Cc(n,t,e){var r=(t-n)/(e-1),a=Hr(e,"float32");a[0]=n;for(var o=1;o<a.length;o++)a[o]=a[o-1]+r;return Ve(a,"float32")}function ai(n,t){if(n.length!==t.length)throw new Error("Cannot merge real and imag arrays of different lengths. real:"+n.length+", imag: "+t.length+".");for(var e=new Float32Array(2*n.length),r=0;r<e.length;r+=2)e[r]=n[r/2],e[r+1]=t[r/2];return e}function Us(n,t){return{real:n[2*t],imag:n[2*t+1]}}function Wp(n,t,e,r){n[2*r]=t,n[2*r+1]=e}function zp(n,t,e){var r=(e?2:-2)*Math.PI*(n/t);return{real:Math.cos(r),imag:Math.sin(r)}}function Vp(n,t,e){var r=(function(o,i,s){return(function(u,c,l){for(var h=0,f=u.length,d=0,p=!1;h<f;){var v=l(c,u[d=h+(f-h>>>1)]);v>0?h=d+1:(f=d,p=!v)}return p?h:-h-1})(o,i,s||Gp)})(n,t,e),a=r<0?-(r+1):r;n.splice(a,0,t)}function Gp(n,t){return n>t?1:n<t?-1:0}function Ri(n,t,e,r,a){return Ec(n,t,e,r,a,0).selectedIndices}function Ii(n,t,e,r,a,o){var i=Ec(n,t,e,r,a,o);return i.numValidOutputs.dispose(),{selectedIndices:i.selectedIndices,selectedScores:i.selectedScores}}function Ec(n,t,e,r,a,o,i,s){s===void 0&&(s=!1);for(var u=Array.from(t).map((function(x,w){return{score:x,boxIndex:w,suppressBeginIndex:0}})).filter((function(x){return x.score>a})).sort(Ws),c=o>0?-.5/o:0,l=[],h=[];l.length<e&&u.length>0;){var f=u.pop(),d=f.score,p=f.boxIndex,v=f.suppressBeginIndex;if(d<a)break;for(var m=!1,g=l.length-1;g>=v;--g){var y=Hp(n,p,l[g]);if(y>=r){m=!0;break}if(f.score=f.score*jp(r,c,y),f.score<=a)break}f.suppressBeginIndex=l.length,m||(f.score===d?(l.push(p),h.push(f.score)):f.score>a&&Vp(u,f,Ws))}var b=l.length;return s&&(l.fill(0,b),h.fill(0,b)),{selectedIndices:Ve(l,"int32"),selectedScores:Ve(h,"float32"),numValidOutputs:X(b,"int32")}}function Hp(n,t,e){var r=n.subarray(4*t,4*t+4),a=n.subarray(4*e,4*e+4),o=Math.min(r[0],r[2]),i=Math.min(r[1],r[3]),s=Math.max(r[0],r[2]),u=Math.max(r[1],r[3]),c=Math.min(a[0],a[2]),l=Math.min(a[1],a[3]),h=Math.max(a[0],a[2]),f=Math.max(a[1],a[3]),d=(s-o)*(u-i),p=(h-c)*(f-l);if(d<=0||p<=0)return 0;var v=Math.max(o,c),m=Math.max(i,l),g=Math.min(s,h),y=Math.min(u,f),b=Math.max(g-v,0)*Math.max(y-m,0);return b/(d+p-b)}function jp(n,t,e){var r=Math.exp(t*e*e);return e<=n?r:0}function Ws(n,t){return n.score-t.score||n.score===t.score&&t.boxIndex-n.boxIndex}function _c(n,t,e){var r=new Array(n.rank).fill(0),a=n.shape.slice();return t.map((function(o){a[e]=o;var i=n.slice(r,a);return r[e]+=o,i}))}function Sc(n,t){for(var e=new Array(n.rank),r=0;r<e.length;r++)e[r]=n.shape[r]*t[r];var a=fe(e,n.dtype);for(r=0;r<a.values.length;++r){for(var o=a.indexToLoc(r),i=new Array(n.rank),s=0;s<i.length;s++)i[s]=o[s]%n.shape[s];var u=n.locToIndex(i);a.values[r]=n.values[u]}return a.toTensor()}function Rc(n,t,e,r,a){for(var o=t[t.length-1],i=[n.length/o,o],s=i[0],u=i[1],c=Br(e,s*r),l=Br("int32",s*r),h=0;h<s;h++){for(var f=h*u,d=n.subarray(f,f+u),p=[],v=0;v<d.length;v++)p.push({value:d[v],index:v});p.sort((function(x,w){return w.value-x.value}));var m=h*r,g=c.subarray(m,m+r),y=l.subarray(m,m+r);for(v=0;v<r;v++)g[v]=p[v].value,y[v]=p[v].index}var b=t.slice();return b[b.length-1]=r,[rt(c,b,e),rt(l,b,"int32")]}function ki(n,t){for(var e=[],r=0;r<t.length;r++)t[r]&&e.push(r);var a=fe(n,"int32"),o=fe([e.length,n.length],"int32");for(r=0;r<e.length;r++){var i=a.indexToLoc(e[r]),s=r*n.length;o.values.set(i,s)}return o.toTensor()}var qp=function(n,t){this.outputShape=[],this.outputShape=n,this.variableNames=t.map((function(a,o){return"T"+o}));var e=[];this.variableNames.forEach((function(a){e.push("float v"+a+" = get"+a+"AtOutCoords();")}));var r=this.variableNames.map((function(a){return"v"+a})).join(" + ");this.userCode=`
      void main() {
        `+e.join(`
        `)+`

        float result = `+r+`;
        setOutput(result);
      }
    `},Xp=function(n,t){this.outputShape=[],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=n,this.variableNames=t.map((function(a,o){return"T"+o}));var e=[];this.variableNames.forEach((function(a){e.push("vec4 v"+a+" = get"+a+"AtOutCoords();")}));var r=this.variableNames.map((function(a){return"v"+a})).join(" + ");this.userCode=`
      void main() {
        `+e.join(`
        `)+`

        vec4 result = `+r+`;
        setOutput(result);
      }
    `},Kp=function(n,t,e){this.variableNames=["A"];var r=n.windowSize,a=n.batchSize,o=n.inSize,i=Math.ceil(o/r);e||this.variableNames.push("bestIndicesA"),this.outputShape=[a,i];var s=t==="max"?">":"<",u=e?"inOffset + i;":"round(getBestIndicesA(batch, inOffset + i));";this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = outIdx * `+r+`;

        int bestIndex = inOffset;
        float bestValue = getA(batch, bestIndex);

        for (int i = 0; i < `+r+`; i++) {
          int inIdx = `+u+`;
          float candidate = getA(batch, inIdx);
          if (candidate `+s+` bestValue) {
            bestValue = candidate;
            bestIndex = inIdx;
          }
        }
        setOutput(float(bestIndex));
      }
    `};function Ic(n,t){return["x","y","z","w","u","v"].slice(0,t).map((function(e){return n+"."+e}))}function gt(n,t){return t===1?[n]:Ic(n,t)}function st(){var n,t,e,r,a,o,i,s,u,c;return W().getNumber("WEBGL_VERSION")===2?(n="#version 300 es",t="in",e="out",r="in",a="texture",o="outputColor",i="out vec4 outputColor;",s=`
      bool isnan_custom(float val) {
        return (val > 0.0 || val < 0.0) ? false : val != 0.0;
      }

      bvec4 isnan_custom(vec4 val) {
        return bvec4(isnan_custom(val.x),
          isnan_custom(val.y), isnan_custom(val.z), isnan_custom(val.w));
      }

      #define isnan(value) isnan_custom(value)
    `,u="",c=`
      #define round(value) newRound(value)
      int newRound(float value) {
        return int(floor(value + 0.5));
      }

      ivec4 newRound(vec4 value) {
        return ivec4(floor(value + vec4(0.5)));
      }
    `):(n="",t="attribute",e="varying",r="varying",a="texture2D",o="gl_FragColor",i="",s=`
      #define isnan(value) isnan_custom(value)
      bool isnan_custom(float val) {
        return (val > 0. || val < 1. || val == 0.) ? false : true;
      }
      bvec4 isnan_custom(vec4 val) {
        return bvec4(isnan(val.x), isnan(val.y), isnan(val.z), isnan(val.w));
      }
    `,u=`
      uniform float INFINITY;

      bool isinf(float val) {
        return abs(val) == INFINITY;
      }
      bvec4 isinf(vec4 val) {
        return equal(abs(val), vec4(INFINITY));
      }
    `,c=`
      int round(float value) {
        return int(floor(value + 0.5));
      }

      ivec4 round(vec4 value) {
        return ivec4(floor(value + vec4(0.5)));
      }
    `),{version:n,attribute:t,varyingVs:e,varyingFs:r,texture2D:a,output:o,defineOutput:i,defineSpecialNaN:s,defineSpecialInf:u,defineRound:c}}function Hn(n,t,e){e===void 0&&(e="index");var r=nn(t);return r.map((function(a,o){return"int "+n[o]+" = "+e+" / "+a+"; "+(o===r.length-1?"int "+n[o+1]+" = "+e+" - "+n[o]+" * "+a:"index -= "+n[o]+" * "+a)+";"})).join("")}function Ti(n){var t=nn(n).map((function(e){return e.toString()}));return`
  int getFlatIndex(ivec3 coords) {
    return coords.x * `+t[0]+" + coords.y * "+t[1]+` + coords.z;
  }
`}var kc=`
  const float FLOAT_MAX = 1.70141184e38;
  const float FLOAT_MIN = 1.17549435e-38;

  lowp vec4 encode_float(highp float v) {
    if (isnan(v)) {
      return vec4(255, 255, 255, 255);
    }

    highp float av = abs(v);

    if(av < FLOAT_MIN) {
      return vec4(0.0, 0.0, 0.0, 0.0);
    } else if(v > FLOAT_MAX) {
      return vec4(0.0, 0.0, 128.0, 127.0) / 255.0;
    } else if(v < -FLOAT_MAX) {
      return vec4(0.0, 0.0,  128.0, 255.0) / 255.0;
    }

    highp vec4 c = vec4(0,0,0,0);

    highp float e = floor(log2(av));
    highp float m = exp2(fract(log2(av))) - 1.0;

    c[2] = floor(128.0 * m);
    m -= c[2] / 128.0;
    c[1] = floor(32768.0 * m);
    m -= c[1] / 32768.0;
    c[0] = floor(8388608.0 * m);

    highp float ebias = e + 127.0;
    c[3] = floor(ebias / 2.0);
    ebias -= c[3] * 2.0;
    c[2] += floor(ebias) * 128.0;

    c[3] += 128.0 * step(0.0, -v);

    return c / 255.0;
  }
`;function Yp(n,t,e,r){var a=[];n.forEach((function(d){var p=Z(d.shapeInfo.logicalShape);d.shapeInfo.isUniform?a.push("uniform float "+d.name+(p>1?"["+p+"]":"")+";"):(a.push("uniform sampler2D "+d.name+";"),a.push("uniform int offset"+d.name+";"))}));var o,i,s=a.join(`
`),u=n.map((function(d){return(function(p,v,m){m===void 0&&(m=!1);var g="";g+=m?Tc(p):ur(p);var y=p.shapeInfo.logicalShape,b=v.logicalShape;return y.length<=b.length&&(g+=m?(function(x,w){var C,k=x.name,S=k.charAt(0).toUpperCase()+k.slice(1),_="get"+S+"AtOutCoords",R=x.shapeInfo.logicalShape.length,D=w.logicalShape.length,A=Sn(x.shapeInfo.logicalShape,w.logicalShape),O=Me(D),P=D-R,F=["x","y","z","w","u","v"];C=R===0?"":D<2&&A.length>=1?"coords = 0;":A.map((function(Y){return"coords."+F[Y+P]+" = 0;"})).join(`
`);var V="";V=D<2&&R>0?"coords":x.shapeInfo.logicalShape.map((function(Y,re){return"coords."+F[re+P]})).join(", ");var z="return outputValue;",U=Z(x.shapeInfo.logicalShape)===1,L=Z(w.logicalShape)===1;if(R!==1||U||L){if(U&&!L)z=D===1?`
        return vec4(outputValue.x, outputValue.x, 0., 0.);
      `:`
        return vec4(outputValue.x);
      `;else if(A.length){var G=R-2,q=R-1;A.indexOf(G)>-1&&A.indexOf(q)>-1?z="return vec4(outputValue.x);":A.indexOf(G)>-1?z="return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);":A.indexOf(q)>-1&&(z="return vec4(outputValue.xx, outputValue.zz);")}}else z=`
      return vec4(outputValue.xy, outputValue.xy);
    `;return`
    vec4 `+_+`() {
      `+O+` coords = getOutputCoords();
      `+C+`
      vec4 outputValue = get`+S+"("+V+`);
      `+z+`
    }
  `})(p,v):(function(x,w){var C=x.name,k=C.charAt(0).toUpperCase()+C.slice(1),S="get"+k+"AtOutCoords",_=w.texShape,R=x.shapeInfo.texShape,D=x.shapeInfo.logicalShape.length,A=w.logicalShape.length;if(!x.shapeInfo.isUniform&&D===A&&x.shapeInfo.flatOffset==null&&Qe(R,_))return`
      float `+S+`() {
        return sampleTexture(`+C+`, resultUV);
      }
    `;var O,P=Me(A),F=Sn(x.shapeInfo.logicalShape,w.logicalShape),V=A-D,z=["x","y","z","w","u","v"];O=D===0?"":A<2&&F.length>=1?"coords = 0;":F.map((function(L){return"coords."+z[L+V]+" = 0;"})).join(`
`);var U="";return U=A<2&&D>0?"coords":x.shapeInfo.logicalShape.map((function(L,G){return"coords."+z[G+V]})).join(", "),`
    float `+S+`() {
      `+P+` coords = getOutputCoords();
      `+O+`
      return get`+k+"("+U+`);
    }
  `})(p,v)),g})(d,t,r)})).join(`
`),c=t.texShape,l=st(),h=(function(d){return`
    float sampleTexture(sampler2D textureSampler, vec2 uv) {
      return `+d.texture2D+`(textureSampler, uv).r;
    }
  `})(l),f=(function(d){return d.version+`
    precision highp float;
    precision highp int;
    precision highp sampler2D;
    `+d.varyingFs+` vec2 resultUV;
    `+d.defineOutput+`
    const vec2 halfCR = vec2(0.5, 0.5);

    struct ivec5
    {
      int x;
      int y;
      int z;
      int w;
      int u;
    };

    struct ivec6
    {
      int x;
      int y;
      int z;
      int w;
      int u;
      int v;
    };

    uniform float NAN;
    `+d.defineSpecialNaN+`
    `+d.defineSpecialInf+`
    `+d.defineRound+`

    int imod(int x, int y) {
      return x - y * (x / y);
    }

    int idiv(int a, int b, float sign) {
      int res = a / b;
      int mod = imod(a, b);
      if (sign < 0. && mod != 0) {
        res -= 1;
      }
      return res;
    }

    //Based on the work of Dave Hoskins
    //https://www.shadertoy.com/view/4djSRW
    #define HASHSCALE1 443.8975
    float random(float seed){
      vec2 p = resultUV * seed;
      vec3 p3  = fract(vec3(p.xyx) * HASHSCALE1);
      p3 += dot(p3, p3.yzx + 19.19);
      return fract((p3.x + p3.y) * p3.z);
    }

    `+$p+`
    `+Jp+`
    `+Qp+`
  `})(l);return t.isPacked?(o=(function(d,p){switch(d.length){case 0:return`
    int getOutputCoords() {
      return 0;
    }
  `;case 1:return(function(x,w){var C=[Math.ceil(w[0]/2),Math.ceil(w[1]/2)];return C[0]===1?`
      int getOutputCoords() {
        return 2 * int(resultUV.x * `+C[1]+`.0);
      }
    `:C[1]===1?`
      int getOutputCoords() {
        return 2 * int(resultUV.y * `+C[0]+`.0);
      }
    `:`
    int getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(`+C[0]+", "+C[1]+`));
      return 2 * (resTexRC.x * `+C[1]+` + resTexRC.y);
    }
  `})(0,p);case 2:return(function(x,w){var C=[Math.ceil(w[0]/2),Math.ceil(w[1]/2)];if(Qe(x,w))return`
      ivec2 getOutputCoords() {
        return 2 * ivec2(resultUV.yx * vec2(`+C[0]+", "+C[1]+`));
      }
    `;var k=Math.ceil(x[1]/2);return`
    ivec2 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(`+C[0]+", "+C[1]+`));

      int index = resTexRC.x * `+C[1]+` + resTexRC.y;
      int r = 2 * (index / `+k+`);
      int c = imod(index, `+k+`) * 2;

      return ivec2(r, c);
    }
  `})(d,p);case 3:return v=d,m=p,g=[Math.ceil(m[0]/2),Math.ceil(m[1]/2)],y=Math.ceil(v[2]/2),b=y*Math.ceil(v[1]/2),`
    ivec3 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(`+g[0]+", "+g[1]+`));
      int index = resTexRC.x * `+g[1]+` + resTexRC.y;

      int b = index / `+b+`;
      index -= b * `+b+`;

      int r = 2 * (index / `+y+`);
      int c = imod(index, `+y+`) * 2;

      return ivec3(b, r, c);
    }
  `;default:return(function(x,w){for(var C=[Math.ceil(w[0]/2),Math.ceil(w[1]/2)],k=Math.ceil(x[x.length-1]/2),S=k*Math.ceil(x[x.length-2]/2),_=S,R="",D="b, r, c",A=2;A<x.length-1;A++)_*=x[x.length-A-1],R=`
      int b`+A+" = index / "+_+`;
      index -= b`+A+" * "+_+`;
    `+R,D="b"+A+", "+D;return`
    ivec`+x.length+` getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(`+C[0]+", "+C[1]+`));
      int index = resTexRC.x * `+C[1]+` + resTexRC.y;

      `+R+`

      int b = index / `+S+`;
      index -= b * `+S+`;

      int r = 2 * (index / `+k+`);
      int c = imod(index, `+k+`) * 2;

      return ivec`+x.length+"("+D+`);
    }
  `})(d,p)}var v,m,g,y,b})(t.logicalShape,c),i=(function(d){return`
    void setOutput(vec4 val) {
      `+d.output+` = val;
    }
  `})(l)):(o=(function(d,p){switch(d.length){case 0:return`
    int getOutputCoords() {
      return 0;
    }
  `;case 1:return(function(g,y){return y[0]===1?`
      int getOutputCoords() {
        return int(resultUV.x * `+y[1]+`.0);
      }
    `:y[1]===1?`
      int getOutputCoords() {
        return int(resultUV.y * `+y[0]+`.0);
      }
    `:`
    int getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(`+y[0]+", "+y[1]+`));
      return resTexRC.x * `+y[1]+` + resTexRC.y;
    }
  `})(0,p);case 2:return(function(g,y){return Qe(g,y)?`
      ivec2 getOutputCoords() {
        return ivec2(resultUV.yx * vec2(`+y[0]+", "+y[1]+`));
      }
    `:g[1]===1?`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(`+y[0]+", "+y[1]+`));
        int index = resTexRC.x * `+y[1]+` + resTexRC.y;
        return ivec2(index, 0);
      }
    `:g[0]===1?`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(`+y[0]+", "+y[1]+`));
        int index = resTexRC.x * `+y[1]+` + resTexRC.y;
        return ivec2(0, index);
      }
    `:`
    ivec2 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(`+y[0]+", "+y[1]+`));
      int index = resTexRC.x * `+y[1]+` + resTexRC.y;
      int r = index / `+g[1]+`;
      int c = index - r * `+g[1]+`;
      return ivec2(r, c);
    }
  `})(d,p);case 3:return v=p,m=Hn(["r","c","d"],d),`
    ivec3 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(`+v[0]+", "+v[1]+`));
      int index = resTexRC.x * `+v[1]+` + resTexRC.y;
      `+m+`
      return ivec3(r, c, d);
    }
  `;case 4:return(function(g,y){var b=Hn(["r","c","d","d2"],g);return`
    ivec4 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(`+y[0]+", "+y[1]+`));
      int index = resTexRC.x * `+y[1]+` + resTexRC.y;
      `+b+`
      return ivec4(r, c, d, d2);
    }
  `})(d,p);case 5:return(function(g,y){var b=Hn(["r","c","d","d2","d3"],g);return`
    ivec5 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx * vec2(`+y[0]+`,
                             `+y[1]+`));

      int index = resTexRC.x * `+y[1]+` + resTexRC.y;

      `+b+`

      ivec5 outShape = ivec5(r, c, d, d2, d3);
      return outShape;
    }
  `})(d,p);case 6:return(function(g,y){var b=Hn(["r","c","d","d2","d3","d4"],g);return`
    ivec6 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(`+y[0]+", "+y[1]+`));
      int index = resTexRC.x * `+y[1]+` + resTexRC.y;

      `+b+`

      ivec6 result = ivec6(r, c, d, d2, d3, d4);
      return result;
    }
  `})(d,p);default:throw new Error(d.length+"-D output sampling is not yet supported")}var v,m})(t.logicalShape,c),i=(function(d){return`
    void setOutput(float val) {
      `+d.output+` = vec4(val, 0, 0, 0);
    }
  `})(l)),r&&(f+=Zp),[f,h,i,s,o,u,e].join(`
`)}function ur(n){var t=n.shapeInfo.logicalShape;switch(t.length){case 0:return(function(e){var r=e.name,a="get"+r.charAt(0).toUpperCase()+r.slice(1);if(e.shapeInfo.isUniform)return"float "+a+"() {return "+r+";}";var o=e.shapeInfo.texShape,i=o[0],s=o[1];if(i===1&&s===1)return`
      float `+a+`() {
        return sampleTexture(`+r+`, halfCR);
      }
    `;var u=e.shapeInfo.texShape,c=u[0],l=u[1],h=Un(r);return`
    float `+a+`() {
      vec2 uv = uvFromFlat(`+c+", "+l+", "+h+`);
      return sampleTexture(`+r+`, uv);
    }
  `})(n);case 1:return(function(e){var r=e.name,a="get"+r.charAt(0).toUpperCase()+r.slice(1);if(e.shapeInfo.isUniform)return`
      float `+a+`(int index) {
        `+ar(e)+`
      }
    `;var o=e.shapeInfo.texShape,i=o[0],s=o[1];if(s===1&&i===1)return`
      float `+a+`(int index) {
        return sampleTexture(`+r+`, halfCR);
      }
    `;var u=Un(r);return s===1?`
      float `+a+`(int index) {
        vec2 uv = vec2(0.5, (float(index + `+u+") + 0.5) / "+i+`.0);
        return sampleTexture(`+r+`, uv);
      }
    `:i===1?`
      float `+a+`(int index) {
        vec2 uv = vec2((float(index + `+u+") + 0.5) / "+s+`.0, 0.5);
        return sampleTexture(`+r+`, uv);
      }
    `:`
    float `+a+`(int index) {
      vec2 uv = uvFromFlat(`+i+", "+s+", index + "+u+`);
      return sampleTexture(`+r+`, uv);
    }
  `})(n);case 2:return(function(e){var r=e.shapeInfo.logicalShape,a=e.name,o="get"+a.charAt(0).toUpperCase()+a.slice(1),i=e.shapeInfo.texShape;if(i!=null&&Qe(r,i)){var s=i[0],u=i[1];return`
    float `+o+`(int row, int col) {
      vec2 uv = (vec2(col, row) + halfCR) / vec2(`+u+".0, "+s+`.0);
      return sampleTexture(`+a+`, uv);
    }
  `}var c=Gn(r),l=c.newShape,h=c.keptDims,f=l;if(f.length<r.length){var d=cr(e,f);return`
      `+ur(d)+`
      float `+o+`(int row, int col) {
        return `+o+"("+lr(["row","col"],h)+`);
      }
    `}if(e.shapeInfo.isUniform)return`
      float `+o+`(int row, int col) {
        int index = round(dot(vec2(row, col), vec2(`+r[1]+`, 1)));
        `+ar(e)+`
      }
    `;var p=i[0],v=i[1],m=Un(a);return v===1?`
    float `+o+`(int row, int col) {
      float index = dot(vec3(row, col, `+m+"), vec3("+r[1]+`, 1, 1));
      vec2 uv = vec2(0.5, (index + 0.5) / `+p+`.0);
      return sampleTexture(`+a+`, uv);
    }
  `:p===1?`
    float `+o+`(int row, int col) {
      float index = dot(vec3(row, col, `+m+"), vec3("+r[1]+`, 1, 1));
      vec2 uv = vec2((index + 0.5) / `+v+`.0, 0.5);
      return sampleTexture(`+a+`, uv);
    }
  `:`
  float `+o+`(int row, int col) {
    // Explicitly use integer operations as dot() only works on floats.
    int index = row * `+r[1]+" + col + "+m+`;
    vec2 uv = uvFromFlat(`+p+", "+v+`, index);
    return sampleTexture(`+a+`, uv);
  }
`})(n);case 3:return(function(e){var r=e.shapeInfo.logicalShape,a=e.name,o="get"+a.charAt(0).toUpperCase()+a.slice(1),i=r[1]*r[2],s=r[2],u=Gn(r),c=u.newShape,l=u.keptDims,h=c;if(h.length<r.length){var f=cr(e,h);return`
        `+ur(f)+`
        float `+o+`(int row, int col, int depth) {
          return `+o+"("+lr(["row","col","depth"],l)+`);
        }
      `}if(e.shapeInfo.isUniform)return`
      float `+o+`(int row, int col, int depth) {
        int index = round(dot(vec3(row, col, depth),
                          vec3(`+i+", "+s+`, 1)));
        `+ar(e)+`
      }
    `;var d=e.shapeInfo.texShape,p=d[0],v=d[1],m=e.shapeInfo.flatOffset;if(v===i&&m==null)return`
        float `+o+`(int row, int col, int depth) {
          float texR = float(row);
          float texC = dot(vec2(col, depth), vec2(`+s+`, 1));
          vec2 uv = (vec2(texC, texR) + halfCR) /
                     vec2(`+v+".0, "+p+`.0);
          return sampleTexture(`+a+`, uv);
        }
      `;if(v===s&&m==null)return`
    float `+o+`(int row, int col, int depth) {
      float texR = dot(vec2(row, col), vec2(`+r[1]+`, 1));
      float texC = float(depth);
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(`+v+".0, "+p+`.0);
      return sampleTexture(`+a+`, uv);
    }
  `;var g=Un(a);return`
      float `+o+`(int row, int col, int depth) {
        // Explicitly use integer operations as dot() only works on floats.
        int index = row * `+i+" + col * "+s+" + depth + "+g+`;
        vec2 uv = uvFromFlat(`+p+", "+v+`, index);
        return sampleTexture(`+a+`, uv);
      }
  `})(n);case 4:return(function(e){var r=e.shapeInfo.logicalShape,a=e.name,o="get"+a.charAt(0).toUpperCase()+a.slice(1),i=r[3],s=r[2]*i,u=r[1]*s,c=Gn(r),l=c.newShape,h=c.keptDims;if(l.length<r.length){var f=cr(e,l);return`
      `+ur(f)+`
      float `+o+`(int row, int col, int depth, int depth2) {
        return `+o+"("+lr(["row","col","depth","depth2"],h)+`);
      }
    `}if(e.shapeInfo.isUniform)return`
      float `+o+`(int row, int col, int depth, int depth2) {
        int index = round(dot(vec4(row, col, depth, depth2),
                          vec4(`+u+", "+s+", "+i+`, 1)));
        `+ar(e)+`
      }
    `;var d=e.shapeInfo.flatOffset,p=e.shapeInfo.texShape,v=p[0],m=p[1];if(m===u&&d==null)return`
      float `+o+`(int row, int col, int depth, int depth2) {
        float texR = float(row);
        float texC =
            dot(vec3(col, depth, depth2),
                vec3(`+s+", "+i+`, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(`+m+".0, "+v+`.0);
        return sampleTexture(`+a+`, uv);
      }
    `;if(m===i&&d==null)return`
      float `+o+`(int row, int col, int depth, int depth2) {
        float texR = dot(vec3(row, col, depth),
                         vec3(`+r[1]*r[2]+", "+r[2]+`, 1));
        float texC = float(depth2);
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(`+m+".0, "+v+`.0);
        return sampleTexture(`+a+`, uv);
      }
    `;var g=Un(a);return`
    float `+o+`(int row, int col, int depth, int depth2) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * `+u+" + col * "+s+` +
          depth * `+i+` + depth2;
      vec2 uv = uvFromFlat(`+v+", "+m+", index + "+g+`);
      return sampleTexture(`+a+`, uv);
    }
  `})(n);case 5:return(function(e){var r=e.shapeInfo.logicalShape,a=e.name,o="get"+a.charAt(0).toUpperCase()+a.slice(1),i=r[4],s=r[3]*i,u=r[2]*s,c=r[1]*u,l=Gn(r),h=l.newShape,f=l.keptDims;if(h.length<r.length){var d=cr(e,h);return`
      `+ur(d)+`
      float `+o+`(int row, int col, int depth, int depth2, int depth3) {
        return `+o+"("+lr(["row","col","depth","depth2","depth3"],f)+`);
      }
    `}if(e.shapeInfo.isUniform)return`
      float `+o+`(int row, int col, int depth, int depth2, int depth3) {
        float index = dot(
          vec4(row, col, depth, depth2),
          vec4(`+c+", "+u+", "+s+", "+i+`)) +
          depth3;
        `+ar(e)+`
      }
    `;var p=e.shapeInfo.flatOffset,v=e.shapeInfo.texShape,m=v[0],g=v[1];if(g===c&&p==null)return`
      float `+o+`(int row, int col, int depth, int depth2, int depth3) {
        int texR = row;
        float texC = dot(vec4(col, depth, depth2, depth3),
                         vec4(`+u+", "+s+", "+i+`, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(`+g+".0, "+m+`.0);
        return sampleTexture(`+a+`, uv);
      }
    `;if(g===i&&p==null)return`
      float `+o+`(int row, int col, int depth, int depth2, int depth3) {
        float texR = dot(
          vec4(row, col, depth, depth2),
          vec4(`+r[1]*r[2]*r[3]+`,
               `+r[2]*r[3]+", "+r[3]+`, 1));
        int texC = depth3;
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(`+g+".0, "+m+`.0);
        return sampleTexture(`+a+`, uv);
      }
    `;var y=Un(a);return`
    float `+o+`(int row, int col, int depth, int depth2, int depth3) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * `+c+" + col * "+u+" + depth * "+s+` +
          depth2 * `+i+" + depth3 + "+y+`;
      vec2 uv = uvFromFlat(`+m+", "+g+`, index);
      return sampleTexture(`+a+`, uv);
    }
  `})(n);case 6:return(function(e){var r=e.shapeInfo.logicalShape,a=e.name,o="get"+a.charAt(0).toUpperCase()+a.slice(1),i=Gn(r),s=i.newShape,u=i.keptDims;if(s.length<r.length){var c=cr(e,s);return`
      `+ur(c)+`
      float `+o+`(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        return `+o+"("+lr(["row","col","depth","depth2","depth3","depth4"],u)+`);
      }
    `}var l=r[5],h=r[4]*l,f=r[3]*h,d=r[2]*f,p=r[1]*d;if(e.shapeInfo.isUniform)return`
      float `+o+`(int row, int col, int depth,
                  int depth2, int depth3, int depth4) {
        int index = round(dot(
          vec4(row, col, depth, depth2),
          vec4(`+p+", "+d+", "+f+", "+h+`)) +
          dot(
            vec2(depth3, depth4),
            vec2(`+l+`, 1)));
        `+ar(e)+`
      }
    `;var v=e.shapeInfo.flatOffset,m=e.shapeInfo.texShape,g=m[0],y=m[1];if(y===p&&v==null)return`
      float `+o+`(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        int texR = row;
        float texC = dot(vec4(col, depth, depth2, depth3),
          vec4(`+d+", "+f+", "+h+", "+l+`)) +
               float(depth4);
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(`+y+".0, "+g+`.0);
        return sampleTexture(`+a+`, uv);
      }
    `;if(y===l&&v==null)return`
      float `+o+`(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        float texR = dot(vec4(row, col, depth, depth2),
          vec4(`+r[1]*r[2]*r[3]*r[4]+`,
               `+r[2]*r[3]*r[4]+`,
               `+r[3]*r[4]+`,
               `+r[4]+`)) + float(depth3);
        int texC = depth4;
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(`+y+".0, "+g+`.0);
        return sampleTexture(`+a+`, uv);
      }
    `;var b=Un(a);return`
    float `+o+`(int row, int col, int depth,
                  int depth2, int depth3, int depth4) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * `+p+" + col * "+d+" + depth * "+f+` +
          depth2 * `+h+" + depth3 * "+l+" + depth4 + "+b+`;
      vec2 uv = uvFromFlat(`+g+", "+y+`, index);
      return sampleTexture(`+a+`, uv);
    }
  `})(n);default:throw new Error(t.length+"-D input sampling is not yet supported")}}function Tc(n){var t,e,r;switch(n.shapeInfo.logicalShape.length){case 0:return t=n.name,e="get"+t.charAt(0).toUpperCase()+t.slice(1),r=st(),`
    vec4 `+e+`() {
      return `+r.texture2D+"("+t+`, halfCR);
    }
  `;case 1:return(function(a){var o=a.name,i="get"+o.charAt(0).toUpperCase()+o.slice(1),s=a.shapeInfo.texShape,u=[Math.ceil(s[0]/2),Math.ceil(s[1]/2)],c=st();return`
    vec4 `+i+`(int index) {
      vec2 uv = packedUVfrom1D(
        `+u[0]+", "+u[1]+`, index);
      return `+c.texture2D+"("+o+`, uv);
    }
  `})(n);case 2:return(function(a){var o=a.shapeInfo.logicalShape,i=a.name,s="get"+i.charAt(0).toUpperCase()+i.slice(1),u=a.shapeInfo.texShape,c=u[0],l=u[1],h=st();if(u!=null&&Qe(o,u))return`
      vec4 `+s+`(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(`+l+".0, "+c+`.0);

        return `+h.texture2D+"("+i+`, uv);
      }
    `;var f=[Math.ceil(u[0]/2),Math.ceil(u[1]/2)],d=Math.ceil(o[1]/2);return`
    vec4 `+s+`(int row, int col) {
      vec2 uv = packedUVfrom2D(`+d+", "+f[0]+", "+f[1]+`, row, col);
      return `+h.texture2D+"("+i+`, uv);
    }
  `})(n);case 3:return(function(a){var o=a.shapeInfo.logicalShape,i=a.name,s="get"+i.charAt(0).toUpperCase()+i.slice(1),u=a.shapeInfo.texShape,c=[Math.ceil(u[0]/2),Math.ceil(u[1]/2)];if(o[0]===1){var l=o.slice(1),h=cr(a,l);return`
        `+Tc(h)+`
        vec4 `+s+`(int b, int row, int col) {
          return `+s+"("+lr(["b","row","col"],[1,2])+`);
        }
      `}var f=c[0],d=c[1],p=Math.ceil(o[2]/2),v=p*Math.ceil(o[1]/2),m=st();return`
    vec4 `+s+`(int b, int row, int col) {
      vec2 uv = packedUVfrom3D(
        `+f+", "+d+", "+v+", "+p+`, b, row, col);
      return `+m.texture2D+"("+i+`, uv);
    }
  `})(n);default:return(function(a){for(var o=a.shapeInfo.logicalShape,i=o.length,s=a.name,u="get"+s.charAt(0).toUpperCase()+s.slice(1),c=a.shapeInfo.texShape,l=[Math.ceil(c[0]/2),Math.ceil(c[1]/2)],h=l[0],f=l[1],d=Math.ceil(o[i-1]/2),p=d*Math.ceil(o[i-2]/2),v="int b, int row, int col",m="b * "+p+" + (row / 2) * "+d+" + (col / 2)",g=2;g<i-1;g++)v="int b"+g+", "+v,p*=o[i-g-1],m="b"+g+" * "+p+" + "+m;var y=st();return`
    vec4 `+u+"("+v+`) {
      int index = `+m+`;
      int texR = index / `+f+`;
      int texC = index - texR * `+f+`;
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(`+f+", "+h+`);
      return `+y.texture2D+"("+s+`, uv);
    }
  `})(n)}}var $p=`
vec2 uvFromFlat(int texNumR, int texNumC, int index) {
  int texR = index / texNumC;
  int texC = index - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
vec2 packedUVfrom1D(int texNumR, int texNumC, int index) {
  int texelIndex = index / 2;
  int texR = texelIndex / texNumC;
  int texC = texelIndex - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,Jp=`
vec2 packedUVfrom2D(int texelsInLogicalRow, int texNumR,
  int texNumC, int row, int col) {
  int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);
  int texR = texelIndex / texNumC;
  int texC = texelIndex - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,Qp=`
vec2 packedUVfrom3D(int texNumR, int texNumC,
    int texelsInBatch, int texelsInLogicalRow, int b,
    int row, int col) {
  int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);
  int texR = index / texNumC;
  int texC = index - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,Zp=`
  float getChannel(vec4 frag, vec2 innerDims) {
    vec2 modCoord = mod(innerDims, 2.);
    return modCoord.x == 0. ?
      (modCoord.y == 0. ? frag.r : frag.g) :
      (modCoord.y == 0. ? frag.b : frag.a);
  }
  float getChannel(vec4 frag, int dim) {
    float modCoord = mod(float(dim), 2.);
    return modCoord == 0. ? frag.r : frag.g;
  }
`;function Un(n){return"offset"+n}function ar(n){var t=n.name,e=Z(n.shapeInfo.logicalShape);return e<2?"return "+t+";":`
    for (int i = 0; i < `+e+`; i++) {
      if (i == index) {
        return `+t+`[i];
      }
    }
  `}function Me(n){if(n<=1)return"int";if(n===2)return"ivec2";if(n===3)return"ivec3";if(n===4)return"ivec4";if(n===5)return"ivec5";if(n===6)return"ivec6";throw Error("GPU for rank "+n+" is not yet supported")}function cr(n,t){var e=JSON.parse(JSON.stringify(n));return e.shapeInfo.logicalShape=t,e}function lr(n,t){return t.map((function(e){return n[e]})).join(", ")}var ev=function(n,t,e,r){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,I(n.length>2,(function(){return"Packed arg"+(e.charAt(0).toUpperCase()+e.slice(1))+" supports only inputs with rank above 2."}));var a=n[n.length-1],o=Math.ceil(a/t);this.outputShape=n.slice(0,-1),o>1&&this.outputShape.push(o),r||this.variableNames.push("bestIndicesA");var i,s,u=this.outputShape,c=u.length,l=Me(c),h=gt("coords",c);if(o===1){var f=Me(s=c+1);i=`
        `+f+" sourceLocR = "+f+"("+h.join()+`, 0);
        ++`+h[c-1]+`;
        `+f+" sourceLocG = "+f+"("+h.join()+`, 0);
        ++`+h[c-2]+`;
        `+f+" sourceLocA = "+f+"("+h.join()+`, 0);
        --`+h[c-1]+`;
        `+f+" sourceLocB = "+f+"("+h.join()+`, 0);
        --`+h[c-2]+";"}else s=c,i=`
        `+l+` sourceLocR = coords;
        ++`+h[c-1]+`;
        `+l+` sourceLocG = coords;
        ++`+h[c-2]+`;
        `+l+` sourceLocA = coords;
        --`+h[c-1]+`;
        `+l+` sourceLocB = coords;
        --`+h[c-2]+";";var d=["x","y","z","w","u","v"].slice(0,s),p="."+d[s-1],v=d.map((function(S){return"int "+S})),m=gt("sourceLocR",s-1).concat("inIdx.r"),g=gt("sourceLocG",s-1).concat("inIdx.g"),y=gt("sourceLocB",s-1).concat("inIdx.b"),b=gt("sourceLocA",s-1).concat("inIdx.a"),x=e==="max"?"greaterThan":"lessThan",w=r?"":`
          inIdx = round(vec4(getBestIndicesAChannel(`+m.join()+`),
                             getBestIndicesAChannel(`+g.join()+`),
                             getBestIndicesAChannel(`+y.join()+`),
                             getBestIndicesAChannel(`+b.join()+")));",C=`vec4(
            getAChannel(`+m.join()+`),
            hasNextCol ? getAChannel(`+g.join()+`) : 0.,
            hasNextRow ? getAChannel(`+y.join()+`) : 0.,
            hasNextRow && hasNextCol ? getAChannel(`+b.join()+") : 0.)",k=r?"":`
      float getBestIndicesAChannel(`+v.join()+`) {
        return getChannel(getBestIndicesA(`+d.join()+`),
                                          vec2(`+d.slice(-2).join()+`));
      }`;this.userCode=`
      float getAChannel(`+v.join()+`) {
        return getChannel(getA(`+d.join()+`),
                               vec2(`+d.slice(-2).join()+`));
      }
      `+k+`
      void main() {
        `+l+` coords = getOutputCoords();
        bool hasNextCol = `+h[c-1]+" < "+(u[c-1]-1)+`;
        bool hasNextRow = `+h[c-2]+" < "+(u[c-2]-1)+`;
        `+i+`
        ivec4 srcIdx = ivec4(sourceLocR`+p+", sourceLocG"+p+`,
          sourceLocB`+p+", sourceLocA"+p+") * "+t+`;
        ivec4 inIdx = srcIdx;
        vec4 bestIndex = vec4(inIdx);
        vec4 bestValue = `+C+`;

        for (int i = 0; i < `+t+`; i++) {
          inIdx = srcIdx;
          `+w+`
          vec4 candidate = `+C+`;
          bvec4 nan = isnan(candidate);
          bvec4 replace = bvec4(
            vec4(`+x+`(candidate, bestValue)) * (vec4(1.0) - vec4(nan)));

          bestValue = vec4(replace.x  ? candidate.x : bestValue.x,
                           replace.y  ? candidate.y : bestValue.y,
                           replace.z  ? candidate.z : bestValue.z,
                           replace.w  ? candidate.w : bestValue.w);
          bestIndex = mix(bestIndex, vec4(inIdx), vec4(replace));
          srcIdx++;
        }
        setOutput(bestIndex);
      }
    `},tv=function(n){this.variableNames=["dy"],this.outputShape=n.inShape;var t=n.filterHeight,e=n.filterWidth,r=n.strideHeight,a=n.strideWidth,o=n.dilationHeight,i=n.dilationWidth,s=n.effectiveFilterHeight,u=n.effectiveFilterWidth,c=s-1-n.padInfo.top,l=u-1-n.padInfo.left,h=1/(t*e);this.userCode=`
      const ivec2 pads = ivec2(`+c+", "+l+`);
      const float avgMultiplier = float(`+h+`);

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];

        ivec2 dyRCCorner = coords.yz - pads;
        int dyRCorner = dyRCCorner.x;
        int dyCCorner = dyRCCorner.y;

        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < `+s+`;
            wR += `+o+`) {
          float dyR = float(dyRCorner + wR) / `+r+`.0;

          if (dyR < 0.0 || dyR >= `+n.outHeight+`.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          for (int wC = 0; wC < `+u+`;
            wC+= `+i+`) {
            float dyC = float(dyCCorner + wC) / `+a+`.0;

            if (dyC < 0.0 || dyC >= `+n.outWidth+`.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            float dyValue = getDy(b, idyR, idyC, d);

            dotProd += dyValue * avgMultiplier;
          }
        }
        setOutput(dotProd);
      }
    `},nv=function(n){this.variableNames=["dy"],this.outputShape=n.inShape;var t=n.filterDepth,e=n.filterHeight,r=n.filterWidth,a=n.strideDepth,o=n.strideHeight,i=n.strideWidth,s=n.dilationDepth,u=n.dilationHeight,c=n.dilationWidth,l=n.effectiveFilterDepth,h=n.effectiveFilterHeight,f=n.effectiveFilterWidth,d=l-1-n.padInfo.front,p=h-1-n.padInfo.top,v=f-1-n.padInfo.left,m=1/(t*e*r);this.userCode=`
      const ivec3 pads = ivec3(`+d+", "+p+", "+v+`);
      const float avgMultiplier = float(`+m+`);

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int ch = coords.u;

        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;
        int dyDCorner = dyCorner.x;
        int dyRCorner = dyCorner.y;
        int dyCCorner = dyCorner.z;

        // Convolve dy(?, ?, ?, d) with pos mask(:, :, :, ch) to get
        // dx(xD, xR, xC, ch).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int wD = 0; wD < `+l+`;
            wD += `+s+`) {
          float dyD = float(dyDCorner + wD) / `+a+`.0;

          if (dyD < 0.0 || dyD >= `+n.outDepth+`.0 || fract(dyD) > 0.0) {
            continue;
          }
          int idyD = int(dyD);

          for (int wR = 0; wR < `+h+`;
              wR += `+u+`) {
            float dyR = float(dyRCorner + wR) / `+o+`.0;

            if (dyR < 0.0 || dyR >= `+n.outHeight+`.0 ||
                fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            for (int wC = 0; wC < `+f+`;
                wC += `+c+`) {
              float dyC = float(dyCCorner + wC) / `+i+`.0;

              if (dyC < 0.0 || dyC >= `+n.outWidth+`.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              float dyValue = getDy(batch, idyD, idyR, idyC, ch);

              dotProd += dyValue * avgMultiplier;
            }
          }
        }
        setOutput(dotProd);
      }
    `},rv=function(n,t,e,r,a,o){this.outputShape=[],this.variableNames=["x","mean","variance"],we(n,t),we(n,e);var i="0.0";r!=null&&(we(n,r),this.variableNames.push("offset"),i="getOffsetAtOutCoords()");var s="1.0";a!=null&&(we(n,a),this.variableNames.push("scale"),s="getScaleAtOutCoords()"),this.outputShape=n,this.userCode=`
      void main() {
        float x = getXAtOutCoords();
        float mean = getMeanAtOutCoords();
        float variance = getVarianceAtOutCoords();
        float offset = `+i+`;
        float scale = `+s+`;
        float inv = scale * inversesqrt(variance + float(`+o+`));
        setOutput(dot(vec3(x, -mean, offset), vec3(inv, inv, 1)));
      }
    `},av=function(n,t,e,r,a,o){this.packedInputs=!0,this.packedOutput=!0,this.variableNames=["x","mean","variance"],we(n,t),we(n,e);var i="vec4(0.0)";r!=null&&(we(n,r),this.variableNames.push("offset"),i="getOffsetAtOutCoords()");var s="vec4(1.0)";a!=null&&(we(n,a),this.variableNames.push("scale"),s="getScaleAtOutCoords()"),this.outputShape=n,this.userCode=`
      void main() {
        vec4 offset = `+i+`;
        vec4 scale = `+s+`;

        vec4 x = getXAtOutCoords();
        vec4 mean = getMeanAtOutCoords();
        vec4 variance = getVarianceAtOutCoords();

        vec4 inv = scale * inversesqrt(variance + vec4(`+o+`));

        setOutput((x - mean) * inv + offset);
      }
    `},ov="return areal * breal - aimag * bimag;",iv="return areal * bimag + aimag * breal;",zs=function(n,t,e){this.variableNames=["AReal","AImag","BReal","BImag"],this.outputShape=we(t,e),this.userCode=`
      float binaryOpComplex(
          float areal, float aimag, float breal, float bimag) {
        `+n+`
      }

      void main() {
        float areal = getARealAtOutCoords();
        float aimag = getAImagAtOutCoords();
        float breal = getBRealAtOutCoords();
        float bimag = getBImagAtOutCoords();
        setOutput(binaryOpComplex(areal, aimag, breal, bimag));
      }
    `},Ro="return a + b;",Io="return a - b;",Vs="return a * b;",Ac="return (a < 0.) ? b * a : a;",Ue=function(n,t,e){this.variableNames=["A","B"],this.outputShape=we(t,e),this.userCode=`
      float binaryOperation(float a, float b) {
        `+n+`
      }

      void main() {
        float a = getAAtOutCoords();
        float b = getBAtOutCoords();
        setOutput(binaryOperation(a, b));
      }
    `},Dc=`
  vec4 aLessThanZero = vec4(lessThan(a, vec4(0.)));
  return (aLessThanZero * (b * a)) + ((vec4(1.0) - aLessThanZero) * a);
`,fn=function(n,t,e,r){r===void 0&&(r=!1),this.variableNames=["A","B"],this.supportsBroadcasting=!0,this.packedInputs=!0,this.packedOutput=!0,this.outputShape=we(t,e);var a=this.outputShape.length,o="";if(r)if(a===0||Z(this.outputShape)===1)o=`
          result.y = 0.;
          result.z = 0.;
          result.w = 0.;
        `;else if(o=`
          `+Me(a)+` coords = getOutputCoords();
        `,a===1)o+=`
            result.y = (coords + 1) >= `+this.outputShape[0]+` ? 0. : result.y;
            result.z = 0.;
            result.w = 0.;
          `;else{var i=gt("coords",a);o+=`
            bool nextRowOutOfBounds =
              (`+i[a-2]+" + 1) >= "+this.outputShape[a-2]+`;
            bool nextColOutOfBounds =
              (`+i[a-1]+" + 1) >= "+this.outputShape[a-1]+`;
            result.y = nextColOutOfBounds ? 0. : result.y;
            result.z = nextRowOutOfBounds ? 0. : result.z;
            result.w = nextColOutOfBounds || nextRowOutOfBounds ? 0. : result.w;
          `}this.userCode=`
      vec4 binaryOperation(vec4 a, vec4 b) {
        `+n+`
      }

      void main() {
        vec4 a = getAAtOutCoords();
        vec4 b = getBAtOutCoords();

        vec4 result = binaryOperation(a, b);
        `+o+`

        setOutput(result);
      }
    `},sv=(function(){function n(t){this.variableNames=["A"],this.outputShape=t,this.userCode=`
      uniform float minVal;
      uniform float maxVal;

      void main() {
        float value = getAAtOutCoords();
        if (isnan(value)) {
          setOutput(value);
          return;
        }

        setOutput(clamp(value, minVal, maxVal));
      }
    `}return n.prototype.getCustomSetupFunc=function(t,e){var r=this;return function(a,o){r.minLoc==null&&(r.minLoc=a.getUniformLocationNoThrow(o,"minVal"),r.maxLoc=a.getUniformLocationNoThrow(o,"maxVal")),a.gl.uniform1f(r.minLoc,t),a.gl.uniform1f(r.maxLoc,e)}},n})(),uv=(function(){function n(t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t,this.userCode=`
      uniform float minVal;
      uniform float maxVal;

      void main() {
        vec4 value = getAAtOutCoords();

        if (any(isnan(value))) {
          setOutput(value);
          return;
        }

        setOutput(clamp(value, vec4(minVal), vec4(maxVal)));
      }
    `}return n.prototype.getCustomSetupFunc=function(t,e){var r=this;return function(a,o){r.minLoc==null&&(r.minLoc=a.getUniformLocationNoThrow(o,"minVal"),r.maxLoc=a.getUniformLocationNoThrow(o,"maxVal")),a.gl.uniform1f(r.minLoc,t),a.gl.uniform1f(r.maxLoc,e)}},n})(),cv=function(n){this.variableNames=["real","imag"],this.outputShape=n,this.userCode=`
      void main() {
        float re = abs(getRealAtOutCoords());
        float im = abs(getImagAtOutCoords());
        float mx = max(re, im);

        // sadly the length function in glsl is not underflow-safe
        // (at least not on Intel GPUs). So the safe solution is
        // to ensure underflow-safety in all cases.
        setOutput(
          mx == 0.0 ? 0.0 : mx * length(vec2(1, min(re, im)/mx))
        );
      }
    `},lv=function(n){this.outputShape=[],this.outputShape=Cr(n,1),this.variableNames=n.map((function(s,u){return"T"+u}));var t=new Array(n.length-1);t[0]=n[0][1];for(var e=1;e<t.length;e++)t[e]=t[e-1]+n[e][1];var r=["if (yC < "+t[0]+") setOutput(getT0(yR, yC));"];for(e=1;e<t.length;e++){var a=t[e-1];r.push("else if (yC < "+t[e]+") setOutput(getT"+e+"(yR, yC-"+a+"));")}var o=t.length,i=t[t.length-1];r.push("else setOutput(getT"+o+"(yR, yC-"+i+"));"),this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int yR = coords.x;
        int yC = coords.y;

        `+r.join(`
        `)+`
      }
    `},hv=function(n,t){this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[],this.outputShape=Cr(n,t);var e=this.outputShape,r=e.length,a=Me(r),o=gt("coords",r),i=["x","y","z","w","u","v"].slice(0,r);this.variableNames=n.map((function(m,g){return"T"+g}));var s=new Array(n.length-1);s[0]=n[0][t];for(var u=1;u<s.length;u++)s[u]=s[u-1]+n[u][t];var c=i[t],l=i.slice(-2),h=i.join(),f="if ("+c+" < "+s[0]+`) {
        return getChannel(
            getT0(`+h+"), vec2("+l.join()+`));
        }`;for(u=1;u<s.length;u++){var d=s[u-1];f+=`
        if (`+c+" < "+s[u]+"  && "+c+" >= "+s[u-1]+`) {
          return getChannel(
            getT`+u+"("+la(i,c,d)+`),
            vec2(`+la(l,c,d)+`));
        }`}var p=s.length,v=s[s.length-1];f+=`
        return getChannel(
          getT`+p+"("+la(i,c,v)+`),
          vec2(`+la(l,c,v)+"));",this.userCode=`
      float getValue(`+i.map((function(m){return"int "+m}))+`) {
        `+f+`
      }

      void main() {
        `+a+` coords = getOutputCoords();
        vec4 result = vec4(getValue(`+o+`), 0., 0., 0.);

        `+o[r-1]+" = "+o[r-1]+` + 1;
        if (`+o[r-1]+" < "+e[r-1]+`) {
          result.g = getValue(`+o+`);
        }

        `+o[r-2]+" = "+o[r-2]+` + 1;
        if (`+o[r-2]+" < "+e[r-2]+`) {
          result.a = getValue(`+o+`);
        }

        `+o[r-1]+" = "+o[r-1]+` - 1;
        if (`+o[r-2]+" < "+e[r-2]+` &&
            `+o[r-1]+" < "+e[r-1]+`) {
          result.b = getValue(`+o+`);
        }
        setOutput(result);
      }
    `};function la(n,t,e){var r=n.indexOf(t);return n.map((function(a,o){return o===r?a+" - "+e:a})).join()}var fv=function(n){this.variableNames=["x","dy"],this.outputShape=n.filterShape;var t=n.strideHeight,e=n.strideWidth,r=n.padInfo.top,a=n.padInfo.left,o=n.dataFormat==="channelsLast";this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int wR = coords.x;
        int wC = coords.y;
        int d1 = coords.z;
        int d2 = coords.w;

        // Convolve x(?, ?, d1) with dy(:, :, d2) to get dw(wR, wC, d1, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int b = 0; b < `+n.batchSize+`; b++) {
          for (int yR = 0; yR < `+n.outHeight+`; yR++) {
            int xR = wR + yR * `+t+" - "+r+`;

            if (xR < 0 || xR >= `+n.inHeight+`) {
              continue;
            }

            for (int yC = 0; yC < `+n.outWidth+`; yC++) {
              int xC = wC + yC * `+e+" - "+a+`;

              if (xC < 0 || xC >= `+n.inWidth+`) {
                continue;
              }

              if (`+o+`) {
                float dyValue = getDy(b, yR, yC, d2);
                float xValue = getX(b, xR, xC, d1);
                dotProd += (xValue * dyValue);
              } else {
                float dyValue = getDy(b, d2, yR, yC);
                float xValue = getX(b, d1, xR, xC);
                dotProd += (xValue * dyValue);
              }

            }
          }
        }
        setOutput(dotProd);
      }
    `},dv=function(n){this.variableNames=["dy","W"],this.outputShape=n.inShape;var t=n.filterHeight,e=n.filterWidth,r=n.strideHeight,a=n.strideWidth,o=n.dataFormat==="channelsLast",i=t-1-n.padInfo.top,s=e-1-n.padInfo.left,u=o?1:2,c=o?2:3,l=o?3:1;this.userCode=`
      const ivec2 pads = ivec2(`+i+", "+s+`);

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d1 = coords[`+l+`];

        ivec2 dyCorner = ivec2(coords[`+u+"], coords["+c+`]) - pads;
        int dyRCorner = dyCorner.x;
        int dyCCorner = dyCorner.y;

        // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < `+t+`; wR++) {
          float dyR = float(dyRCorner + wR) / `+r+`.0;

          if (dyR < 0.0 || dyR >= `+n.outHeight+`.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          int wRPerm = `+t+` - 1 - wR;

          for (int wC = 0; wC < `+e+`; wC++) {
            float dyC = float(dyCCorner + wC) / `+a+`.0;

            if (dyC < 0.0 || dyC >= `+n.outWidth+`.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            int wCPerm = `+e+` - 1 - wC;

            for (int d2 = 0; d2 < `+n.outChannels+`; d2++) {

              if (`+o+`) {
                float xValue = getDy(batch, idyR, idyC, d2);
                float wValue = getW(wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              } else {
                float xValue = getDy(batch, d2, idyR, idyC);
                float wValue = getW(wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              }

            }
          }
        }
        setOutput(dotProd);
      }
    `},pv=function(n){this.variableNames=["x","dy"],this.outputShape=n.filterShape;var t=n.strideDepth,e=n.strideHeight,r=n.strideWidth,a=n.padInfo.front,o=n.padInfo.top,i=n.padInfo.left;this.userCode=`
      void main() {
        ivec5 coords = getOutputCoords();
        int wF = coords.x;
        int wR = coords.y;
        int wC = coords.z;
        int d1 = coords.w;
        int d2 = coords.u;

        float dotProd = 0.0;

        for (int b = 0; b < `+n.batchSize+`; b++) {
          for (int yF = 0; yF < `+n.outDepth+`; yF++) {
            int xF = wF + yF * `+t+" - "+a+`;

            if (xF < 0 || xF >= `+n.inDepth+`) {
              continue;
            }

            for (int yR = 0; yR < `+n.outHeight+`; yR++) {
              int xR = wR + yR * `+e+" - "+o+`;

              if (xR < 0 || xR >= `+n.inHeight+`) {
                continue;
              }

              for (int yC = 0; yC < `+n.outWidth+`; yC++) {
                int xC = wC + yC * `+r+" - "+i+`;

                if (xC < 0 || xC >= `+n.inWidth+`) {
                  continue;
                }

                float dyValue = getDy(b, yF, yR, yC, d2);
                float xValue = getX(b, xF, xR, xC, d1);
                dotProd += (xValue * dyValue);
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `},vv=function(n){this.variableNames=["dy","W"],this.outputShape=n.inShape;var t=n.filterDepth,e=n.filterHeight,r=n.filterWidth,a=n.strideDepth,o=n.strideHeight,i=n.strideWidth,s=t-1-n.padInfo.front,u=e-1-n.padInfo.top,c=r-1-n.padInfo.left;this.userCode=`
      const ivec3 pads = ivec3(`+s+", "+u+", "+c+`);

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int d1 = coords.u;


        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;
        int dyFCorner = dyCorner.x;
        int dyRCorner = dyCorner.y;
        int dyCCorner = dyCorner.z;

        float dotProd = 0.0;
        for (int wF = 0; wF < `+t+`; wF++) {
          float dyF = float(dyFCorner + wF) / `+a+`.0;

          if (dyF < 0.0 || dyF >= `+n.outDepth+`.0 || fract(dyF) > 0.0) {
            continue;
          }
          int idyF = int(dyF);

          int wFPerm = `+t+` - 1 - wF;

          for (int wR = 0; wR < `+e+`; wR++) {
            float dyR = float(dyRCorner + wR) / `+o+`.0;

            if (dyR < 0.0 || dyR >= `+n.outHeight+`.0 ||
              fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            int wRPerm = `+e+` - 1 - wR;

            for (int wC = 0; wC < `+r+`; wC++) {
              float dyC = float(dyCCorner + wC) / `+i+`.0;

              if (dyC < 0.0 || dyC >= `+n.outWidth+`.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              int wCPerm = `+r+` - 1 - wC;

              for (int d2 = 0; d2 < `+n.outChannels+`; d2++) {
                float xValue = getDy(batch, idyF, idyR, idyC, d2);
                float wValue = getW(wFPerm, wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `},mv=function(n){this.variableNames=["x","dy"],this.outputShape=n.filterShape;var t=n.strideHeight,e=n.strideWidth,r=n.padInfo.top,a=n.padInfo.left,o=n.outChannels/n.inChannels;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int wR = coords.x;
        int wC = coords.y;
        int d1 = coords.z;
        int dm = coords.w;
        int d2 = d1 * `+o+` + dm;

        float dotProd = 0.0;

        // TO DO: Vec4 over the batch size
        for (int b = 0; b < `+n.batchSize+`; b++) {
          for (int yR = 0; yR < `+n.outHeight+`; yR++) {
            int xR = wR + yR * `+t+" - "+r+`;

            if (xR < 0 || xR >= `+n.inHeight+`) {
              continue;
            }

            for (int yC = 0; yC < `+n.outWidth+`; yC++) {
              int xC = wC + yC * `+e+" - "+a+`;

              if (xC < 0 || xC >= `+n.inWidth+`) {
                continue;
              }

              float dyValue = getDy(b, yR, yC, d2);
              float xValue = getX(b, xR, xC, d1);
              dotProd += (xValue * dyValue);
            }
          }
        }
        setOutput(dotProd);
      }
    `},gv=function(n){this.variableNames=["dy","W"],this.outputShape=n.inShape;var t=n.filterHeight,e=n.filterWidth,r=n.strideHeight,a=n.strideWidth,o=t-1-n.padInfo.top,i=e-1-n.padInfo.left,s=n.outChannels/n.inChannels;this.userCode=`
      const ivec2 pads = ivec2(`+o+", "+i+`);

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d1 = coords[3];
        ivec2 dyCorner = coords.yz - pads;
        int dyRCorner = dyCorner.x;
        int dyCCorner = dyCorner.y;

        float dotProd = 0.0;

        for (int wR = 0; wR < `+t+`; wR++) {
          float dyR = float(dyRCorner + wR) / `+r+`.0;

          if (dyR < 0.0 || dyR >= `+n.outHeight+`.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          int wRPerm = `+t+` - 1 - wR;

          for (int wC = 0; wC < `+e+`; wC++) {
            float dyC = float(dyCCorner + wC) / `+a+`.0;

            if (dyC < 0.0 || dyC >= `+n.outWidth+`.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            int wCPerm = `+e+` - 1 - wC;

            // TO DO: Vec4 over the channelMul
            for (int dm = 0; dm < `+s+`; dm++) {
              int d2 = d1 * `+s+` + dm;
              float xValue = getDy(batch, idyR, idyC, d2);
              float wValue = getW(wRPerm, wCPerm, d1, dm);
              dotProd += xValue * wValue;
            }
          }
        }
        setOutput(dotProd);
      }
    `},Gs=function(n,t,e,r){t===void 0&&(t=!1),e===void 0&&(e=null),r===void 0&&(r=!1),this.variableNames=["x","W"],this.outputShape=n.outShape;var a=n.padInfo.top,o=n.padInfo.left,i=n.strideHeight,s=n.strideWidth,u=n.dilationHeight,c=n.dilationWidth,l=n.filterHeight,h=n.filterWidth,f=4*Math.floor(n.inChannels/4),d=n.inChannels%4,p=n.dataFormat==="channelsLast",v=p?1:2,m=p?2:3,g=p?3:1,y="",b="";e&&(y=r?`float activation(float a) {
          float b = getPreluActivationWeightsAtOutCoords();
          `+e+`
        }`:`
          float activation(float x) {
            `+e+`
          }
        `,b="result = activation(result);");var x=t?"result += getBiasAtOutCoords();":"";t&&this.variableNames.push("bias"),r&&this.variableNames.push("preluActivationWeights"),this.userCode=`
      `+y+`

      const ivec2 strides = ivec2(`+i+", "+s+`);
      const ivec2 pads = ivec2(`+a+", "+o+`);

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d2 = coords[`+g+`];

        ivec2 xRCCorner =
            ivec2(coords[`+v+"], coords["+m+`]) * strides - pads;
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        // Convolve x(?, ?, d1) with w(:, :, d1, d2) to get y(yR, yC, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < `+l+`; wR++) {
          int xR = xRCorner + wR * `+u+`;

          if (xR < 0 || xR >= `+n.inHeight+`) {
            continue;
          }

          for (int wC = 0; wC < `+h+`; wC++) {
            int xC = xCCorner + wC * `+c+`;

            if (xC < 0 || xC >= `+n.inWidth+`) {
              continue;
            }

            for (int d1 = 0; d1 < `+f+`; d1 += 4) {
              vec4 wValues = vec4(
                getW(wR, wC, d1, d2),
                getW(wR, wC, d1 + 1, d2),
                getW(wR, wC, d1 + 2, d2),
                getW(wR, wC, d1 + 3, d2)
              );

              if (`+p+`) {
                vec4 xValues = vec4(
                  getX(batch, xR, xC, d1),
                  getX(batch, xR, xC, d1 + 1),
                  getX(batch, xR, xC, d1 + 2),
                  getX(batch, xR, xC, d1 + 3)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec4 xValues = vec4(
                  getX(batch, d1, xR, xC),
                  getX(batch, d1 + 1, xR, xC),
                  getX(batch, d1 + 2, xR, xC),
                  getX(batch, d1 + 3, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }
            }

            if (`+(d===1)+`) {

              if (`+p+`) {
                dotProd +=
                    getX(batch, xR, xC, `+f+`) *
                    getW(wR, wC, `+f+`, d2);
              } else {
                dotProd +=
                    getX(batch, `+f+`, xR, xC) *
                    getW(wR, wC, `+f+`, d2);
              }

            } else if (`+(d===2)+`) {
              vec2 wValues = vec2(
                getW(wR, wC, `+f+`, d2),
                getW(wR, wC, `+f+` + 1, d2)
              );

              if (`+p+`) {
                vec2 xValues = vec2(
                  getX(batch, xR, xC, `+f+`),
                  getX(batch, xR, xC, `+f+` + 1)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec2 xValues = vec2(
                  getX(batch, `+f+`, xR, xC),
                  getX(batch, `+f+` + 1, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }

            } else if (`+(d===3)+`) {
              vec3 wValues = vec3(
                getW(wR, wC, `+f+`, d2),
                getW(wR, wC, `+f+` + 1, d2),
                getW(wR, wC, `+f+` + 2, d2)
              );

              if (`+p+`) {
                vec3 xValues = vec3(
                  getX(batch, xR, xC, `+f+`),
                  getX(batch, xR, xC, `+f+` + 1),
                  getX(batch, xR, xC, `+f+` + 2)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec3 xValues = vec3(
                  getX(batch, `+f+`, xR, xC),
                  getX(batch, `+f+` + 1, xR, xC),
                  getX(batch, `+f+` + 2, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }

            }
          }
        }

        float result = dotProd;
        `+x+`
        `+b+`
        setOutput(result);
      }
    `},yv=function(n){this.variableNames=["x","W"],this.outputShape=n.outShape;var t=n.padInfo.front,e=n.padInfo.top,r=n.padInfo.left,a=n.strideDepth,o=n.strideHeight,i=n.strideWidth,s=n.dilationDepth,u=n.dilationHeight,c=n.dilationWidth,l=n.filterDepth,h=n.filterHeight,f=n.filterWidth,d=4*Math.floor(n.inChannels/4),p=n.inChannels%4;this.userCode=`
      const ivec3 strides = ivec3(`+a+", "+o+", "+i+`);
      const ivec3 pads = ivec3(`+t+", "+e+", "+r+`);

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int d2 = coords.u;

        ivec3 xFRCCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;
        int xFCorner = xFRCCorner.x;
        int xRCorner = xFRCCorner.y;
        int xCCorner = xFRCCorner.z;

        // Convolve x(?, ?, ?, d1) with w(:, :, :, d1, d2) to get
        // y(yF, yR, yC, d2). ? = to be determined. : = across all
        // values in that axis.
        float dotProd = 0.0;
        for (int wF = 0; wF < `+l+`; wF++) {
          int xF = xFCorner + wF * `+s+`;

          if (xF < 0 || xF >= `+n.inDepth+`) {
            continue;
          }

          for (int wR = 0; wR < `+h+`; wR++) {
            int xR = xRCorner + wR * `+u+`;

            if (xR < 0 || xR >= `+n.inHeight+`) {
              continue;
            }

            for (int wC = 0; wC < `+f+`; wC++) {
              int xC = xCCorner + wC * `+c+`;

              if (xC < 0 || xC >= `+n.inWidth+`) {
                continue;
              }

              for (int d1 = 0; d1 < `+d+`; d1 += 4) {
                vec4 xValues = vec4(
                  getX(batch, xF, xR, xC, d1),
                  getX(batch, xF, xR, xC, d1 + 1),
                  getX(batch, xF, xR, xC, d1 + 2),
                  getX(batch, xF, xR, xC, d1 + 3)
                );
                vec4 wValues = vec4(
                  getW(wF, wR, wC, d1, d2),
                  getW(wF, wR, wC, d1 + 1, d2),
                  getW(wF, wR, wC, d1 + 2, d2),
                  getW(wF, wR, wC, d1 + 3, d2)
                );

                dotProd += dot(xValues, wValues);
              }

              if (`+(p===1)+`) {
                dotProd +=
                  getX(batch, xF, xR, xC, `+d+`) *
                  getW(wF, wR, wC, `+d+`, d2);
              } else if (`+(p===2)+`) {
                vec2 xValues = vec2(
                  getX(batch, xF, xR, xC, `+d+`),
                  getX(batch, xF, xR, xC, `+d+` + 1)
                );
                vec2 wValues = vec2(
                  getW(wF, wR, wC, `+d+`, d2),
                  getW(wF, wR, wC, `+d+` + 1, d2)
                );
                dotProd += dot(xValues, wValues);
              } else if (`+(p===3)+`) {
                vec3 xValues = vec3(
                  getX(batch, xF, xR, xC, `+d+`),
                  getX(batch, xF, xR, xC, `+d+` + 1),
                  getX(batch, xF, xR, xC, `+d+` + 2)
                );
                vec3 wValues = vec3(
                  getW(wF, wR, wC, `+d+`, d2),
                  getW(wF, wR, wC, `+d+` + 1, d2),
                  getW(wF, wR, wC, `+d+` + 2, d2)
                );
                dotProd += dot(xValues, wValues);
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `},Hs=function(n,t,e,r){t===void 0&&(t=!1),e===void 0&&(e=null),r===void 0&&(r=!1),this.variableNames=["x","W"],this.outputShape=n.outShape;var a=n.inHeight,o=n.inWidth,i=n.padInfo.top,s=n.padInfo.left,u=n.strideHeight,c=n.strideWidth,l=n.dilationHeight,h=n.dilationWidth,f=n.filterHeight,d=n.filterWidth,p=n.outChannels/n.inChannels,v="",m="";e&&(v=r?`float activation(float a) {
          float b = getPreluActivationWeightsAtOutCoords();
          `+e+`
        }`:`
          float activation(float x) {
            `+e+`
          }
        `,m="result = activation(result);");var g=t?"result += getBiasAtOutCoords();":"";t&&this.variableNames.push("bias"),r&&this.variableNames.push("preluActivationWeights"),this.userCode=`
      `+v+`

      const ivec2 strides = ivec2(`+u+", "+c+`);
      const ivec2 pads = ivec2(`+i+", "+s+`);

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords.x;
        ivec2 xRCCorner = coords.yz * strides - pads;
        int d2 = coords.w;
        int d1 = d2 / `+p+`;
        int q = d2 - d1 * `+p+`;

        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        // Convolve x(?, ?, d1) with w(:, :, d1, q) to get y(yR, yC, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        // TO DO(dsmilkov): Flatten the two for loops and vec4 the operations.
        for (int wR = 0; wR < `+f+`; wR++) {
          int xR = xRCorner + wR * `+l+`;

          if (xR < 0 || xR >= `+a+`) {
            continue;
          }

          for (int wC = 0; wC < `+d+`; wC++) {
            int xC = xCCorner + wC * `+h+`;

            if (xC < 0 || xC >= `+o+`) {
              continue;
            }

            float xVal = getX(batch, xR, xC, d1);
            float wVal = getW(wR, wC, d1, q);
            dotProd += xVal * wVal;
          }
        }

        float result = dotProd;
        `+g+`
        `+m+`
        setOutput(result);
      }
    `},js=function(n,t,e,r){t===void 0&&(t=!1),e===void 0&&(e=null),r===void 0&&(r=!1),this.variableNames=["x","W"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=n.outShape;for(var a=n.inHeight,o=n.inWidth,i=n.padInfo.top,s=n.padInfo.left,u=n.strideHeight,c=n.strideWidth,l=n.dilationHeight,h=n.dilationWidth,f=n.filterHeight,d=n.filterWidth,p=d,v="int xR; int xC; int xCOffset;",m=0;m<f;m++)for(var g=0;g<d;g++)v+=`
          vec4 xTexelR`+m+"C"+2*g+` = vec4(0.);
          vec4 wR`+m+"C"+g+` = vec4(0.);
          vec4 xR`+m+"C"+g+" = vec4(0.);";for(m=0;m<f;m++)for(var y=0;y<p;y++){if(v+=`
          xR = xRCorner + `+m*l+`;
          xC = xCCorner + `+(g=2*y)*h+`;
        `,c===1){if(g<d&&(v+=s%2==1?`
                xCOffset = xC + 1;
                if(xR >= 0 && xR < `+a+" && xCOffset >= 0 && xCOffset < "+o+`) {
                  xTexelR`+m+"C"+g+` = getX(batch, xR, xCOffset, d1);

                  // Need to manually clear unused channels in case
                  // we're reading from recycled texture.
                  if(xCOffset + 1 >= `+o+`) {
                    xTexelR`+m+"C"+g+`.zw = vec2(0.);
                  }
                } else {
                  xTexelR`+m+"C"+g+` = vec4(0.);
                }

                xCOffset = xC + 1 - 2;
                if(xR >= 0 && xR < `+a+" && xCOffset >= 0 && xCOffset < "+o+`) {
                  vec4 previous = getX(batch, xR, xCOffset, d1);

                  // Need to manually clear unused channels in case
                  // we're reading from recycled texture.
                  if(xCOffset + 1 >= `+o+`) {
                    previous.zw = vec2(0.);
                  }

                  xR`+m+"C"+g+" = vec4(previous.zw, xTexelR"+m+"C"+g+`.xy);
                } else {
                  xR`+m+"C"+g+" = vec4(0, 0, xTexelR"+m+"C"+g+`.xy);
                }
              `:`
                if(xR >= 0 && xR < `+a+" && xC >= 0 && xC < "+o+`) {
                  xTexelR`+m+"C"+g+` = getX(batch, xR, xC, d1);
                } else {
                  xTexelR`+m+"C"+g+` = vec4(0.);
                }

                xR`+m+"C"+g+" = xTexelR"+m+"C"+g+`;
              `,g+1<d)){var b=s%2==0?Yu(h):h;h%2==0&&s%2==1||h%2!=0&&s%2!=1?(v+=`
                  xCOffset = xC + `+s%2+" + "+b+`;

                  if(xR >= 0 && xR < `+a+` &&
                    xCOffset >= 0 && xCOffset < `+o+`) {
                    xTexelR`+m+"C"+(g+2)+` = getX(batch, xR, xCOffset, d1);
                  }
                `,h>1&&(v+=`
                    xCOffset -= 2;
                    if(xR >= 0 && xR < `+a+` &&
                      xCOffset >= 0 && xCOffset < `+o+`) {
                      xTexelR`+m+"C"+g+` = getX(batch, xR, xCOffset, d1);
                    } else {
                      xTexelR`+m+"C"+g+` = vec4(0.);
                    }
                  `),v+=`
                  xR`+m+"C"+(g+1)+` = vec4(
                    xTexelR`+m+"C"+g+".zw, xTexelR"+m+"C"+(g+2)+`.xy);
                `):v+=`
                  xCOffset = xC + `+b+`;

                  if(xR >= 0 && xR < `+a+` &&
                    xCOffset >= 0 && xCOffset < `+o+`) {
                    xTexelR`+m+"C"+(g+2)+` = getX(batch, xR, xCOffset, d1);
                  }

                  xR`+m+"C"+(g+1)+" = xTexelR"+m+"C"+(g+2)+`;
                `}}else g<d&&(v+=`
              if(xR >= 0 && xR < `+a+`) {
            `,s%2==1?(v+=`
                xCOffset = xC + 1 - `+c+`;
                if(xCOffset >= 0 && xCOffset < `+o+`) {
                  xTexelR`+m+"C"+g+` = getX(batch, xR, xCOffset, d1);
                } else {
                  xTexelR`+m+"C"+g+` = vec4(0.);
                }

                if(xC + 1 >= 0 && xC + 1 < `+o+`) {
                  xTexelR`+m+"C"+(g+2)+` = getX(batch, xR, xC + 1, d1);
                } else {
                  xTexelR`+m+"C"+(g+2)+` = vec4(0.);
                }

                xR`+m+"C"+g+` = vec4(
                  xTexelR`+m+"C"+g+".zw, xTexelR"+m+"C"+(g+2)+`.zw);
              `,g+1<d&&(v+=`
                  vec4 final = vec4(0.);
                  xCOffset = xC + 1 + `+c+`;
                  if(xCOffset >= 0 && xCOffset < `+o+`) {
                    final = getX(batch, xR, xCOffset, d1);
                  }
                  xR`+m+"C"+(g+1)+" = vec4(xTexelR"+m+"C"+(g+2)+`.xy, final.xy);
                `)):(v+=`
                if(xC >= 0 && xC < `+o+`) {
                  xTexelR`+m+"C"+g+` = getX(batch, xR, xC, d1);
                } else {
                  xTexelR`+m+"C"+g+` = vec4(0.);
                }

                xCOffset = xC + `+c+`;
                if(xCOffset >= 0 && xCOffset < `+o+`) {
                  xTexelR`+m+"C"+(g+2)+` = getX(batch, xR, xCOffset, d1);
                } else {
                  xTexelR`+m+"C"+(g+2)+` = vec4(0.);
                }

                xR`+m+"C"+g+` = vec4(
                  xTexelR`+m+"C"+g+".xy, xTexelR"+m+"C"+(g+2)+`.xy);
              `,g+1<d&&(v+=`
                  xR`+m+"C"+(g+1)+` = vec4(
                    xTexelR`+m+"C"+g+".zw, xTexelR"+m+"C"+(g+2)+`.zw);
                `)),v+="}");g<d&&(v+=`
            vec4 wTexelR`+m+"C"+g+" = getW("+m+", "+g+`, d1, q);
            wR`+m+"C"+g+" = vec4(wTexelR"+m+"C"+g+".xz, wTexelR"+m+"C"+g+`.xz);
          `,g+1<d&&(v+=`
              vec4 wTexelR`+m+"C"+(g+1)+" = getW("+m+", "+(g+1)+`, d1, q);
              wR`+m+"C"+(g+1)+` =
                vec4(wTexelR`+m+"C"+(g+1)+".xz, wTexelR"+m+"C"+(g+1)+".xz);"))}for(m=0;m<f;m++)for(g=0;g<d;g++)v+="dotProd += xR"+m+"C"+g+" * wR"+m+"C"+g+";";var x="",w="";e&&(x=r?`vec4 activation(vec4 a) {
          vec4 b = getPreluActivationWeightsAtOutCoords();
          `+e+`
        }`:`vec4 activation(vec4 x) {
          `+e+`
        }`,w="result = activation(result);");var C=t?"result += getBiasAtOutCoords();":"";t&&this.variableNames.push("bias"),r&&this.variableNames.push("preluActivationWeights"),this.userCode=`
      `+x+`

      const ivec2 strides = ivec2(`+u+", "+c+`);
      const ivec2 pads = ivec2(`+i+", "+s+`);

      void main() {

        ivec4 coords = getOutputCoords();
        int batch = coords.x;
        ivec2 xRCCorner = coords.yz * strides - pads;
        int d2 = coords.w;
        int d1 = d2;
        int q = 0;
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        vec4 dotProd = vec4(0.);

        `+v+`

        vec4 result = dotProd;
        `+C+`
        `+w+`
        setOutput(result);
      }
    `},xv=function(n,t,e,r,a){this.variableNames=["Image","Boxes","BoxInd"],this.outputShape=[];var o=n[0],i=n[1],s=n[2],u=n[3],c=t[0],l=e[0],h=e[1];this.outputShape=[c,l,h,u];var f=r==="bilinear"?1:0,d=[i-1+".0",s-1+".0"],p=d[0],v=d[1],m=l>1?[""+(i-1)/(l-1),"(y2-y1) * height_ratio","y1*"+p+" + float(y)*(height_scale)"]:["0.0","0.0","0.5 * (y1+y2) * "+p],g=m[0],y=m[1],b=m[2],x=h>1?[""+(s-1)/(h-1),"(x2-x1) * width_ratio","x1*"+v+" + float(x)*(width_scale)"]:["0.0","0.0","0.5 * (x1+x2) * "+v],w=x[0],C=x[1],k=x[2];this.userCode=`
      const float height_ratio = float(`+g+`);
      const float width_ratio = float(`+w+`);
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int y = coords[1];
        int x = coords[2];
        int d = coords[3];

        // get box vals
        float y1 = getBoxes(b,0);
        float x1 = getBoxes(b,1);
        float y2 = getBoxes(b,2);
        float x2 = getBoxes(b,3);

        // get image in batch index
        int bInd = round(getBoxInd(b));
        if(bInd < 0 || bInd >= `+o+`) {
          return;
        }

        float height_scale = `+y+`;
        float width_scale = `+C+`;

        float in_y = `+b+`;
        if( in_y < 0.0 || in_y > `+p+` ) {
          setOutput(float(`+a+`));
          return;
        }
        float in_x = `+k+`;
        if( in_x < 0.0 || in_x > `+v+` ) {
          setOutput(float(`+a+`));
          return;
        }

        vec2 sourceFracIndexCR = vec2(in_x,in_y);
        if(`+f+` == 1) {
          // Compute the four integer indices.
          ivec2 sourceFloorCR = ivec2(sourceFracIndexCR);
          ivec2 sourceCeilCR = ivec2(ceil(sourceFracIndexCR));

          float topLeft = getImage(b, sourceFloorCR.y, sourceFloorCR.x, d);
          float bottomLeft = getImage(b, sourceCeilCR.y, sourceFloorCR.x, d);
          float topRight = getImage(b, sourceFloorCR.y, sourceCeilCR.x, d);
          float bottomRight = getImage(b, sourceCeilCR.y, sourceCeilCR.x, d);

          vec2 fracCR = sourceFracIndexCR - vec2(sourceFloorCR);

          float top = topLeft + (topRight - topLeft) * fracCR.x;
          float bottom = bottomLeft + (bottomRight - bottomLeft) * fracCR.x;
          float newValue = top + (bottom - top) * fracCR.y;
          setOutput(newValue);
        } else {
          // Compute the coordinators of nearest neighbor point.
          ivec2 sourceNearestCR = ivec2(floor(
            sourceFracIndexCR + vec2(0.5,0.5)));
          float newValue = getImage(b, sourceNearestCR.y, sourceNearestCR.x, d);
          setOutput(newValue);
        }
      }
    `},bv=function(n,t,e){this.variableNames=["x"],this.outputShape=n;var r=n.length,a=n[n.length-1],o=e?"<":">";this.userCode=`
      int getIndex(int i) {
        `+(e?"return "+a+" -i - 1;":"return i;")+`
      }

      void main() {
        `+Me(r)+` coords = getOutputCoords();
        int end = `+qs(r,"coords")+`;
        float val = 0.0;
        for (int i = `+a+` - 1; i >= 0; i -= 1) {
          int idx = getIndex(i);
          if (idx `+o+` end) {
            continue;
          }
          if (idx == end && `+t+`) {
            continue;
          }
          `+qs(r,"coords")+` = idx;
          val += getX(`+(function(i,s){if(i===1)return""+s;if(i===2)return s+".x, "+s+".y";if(i===3)return s+".x, "+s+".y, "+s+".z";if(i===4)return s+".x, "+s+".y, "+s+".z, "+s+".w";throw Error("Cumulative sum for rank "+i+" is not yet supported")})(r,"coords")+`);
        }
        setOutput(val);
      }
    `};function qs(n,t){if(n===1)return""+t;if(n===2)return t+".y";if(n===3)return t+".z";if(n===4)return t+".w";throw Error("Cumulative sum for rank "+n+" is not yet supported")}var wv=function(n){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.outPackingScheme=Lr.DENSE;var t=Nr(n),e=st();this.outputShape=n,this.userCode=`
      ivec3 outCoordsFromFlatIndex(int index) {
        `+Hn(["r","c","d"],n)+`
        return ivec3(r, c, d);
      }

      void main() {
        ivec2 resTexRC = ivec2(resultUV.yx *
          vec2(`+t[0]+", "+t[1]+`));
        int index = 4 * (resTexRC.x * `+t[1]+` + resTexRC.y);

        vec4 result = vec4(0.);

        for (int i=0; i<4; i++) {
          int flatIndex = index + i;
          ivec3 rc = outCoordsFromFlatIndex(flatIndex);
          result[i] = getA(rc.x, rc.y, rc.z);
        }

        `+e.output+` = result;
      }
    `},Cv=function(n){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outPackingScheme=Lr.DENSE;var t=Nr(n),e=st();this.outputShape=n,this.userCode=`
      ivec3 outCoordsFromFlatIndex(int index) {
        `+Hn(["r","c","d"],n)+`
        return ivec3(r, c, d);
      }

      void main() {
        ivec2 resTexRC = ivec2(resultUV.yx *
          vec2(`+t[0]+", "+t[1]+`));
        int index = 4 * (resTexRC.x * `+t[1]+` + resTexRC.y);

        vec4 result = vec4(0.);

        for (int i=0; i<4; i++) {
          int flatIndex = index + i;
          ivec3 rc = outCoordsFromFlatIndex(flatIndex);
          result[i] = getChannel(getA(rc.x, rc.y, rc.z), vec2(rc.y, rc.z));
        }

        `+e.output+` = result;
      }
    `},Ev=(function(){function n(t,e,r){this.variableNames=["x"],this.outputShape=[],this.outputShape=t,this.blockSize=e,this.dataFormat=r,this.userCode=`
    void main() {
      ivec4 coords = getOutputCoords();
      int b = coords[0];
      int h = `+this.getHeightCoordString()+`;
      int w = `+this.getWidthCoordString()+`;
      int d = `+this.getDepthCoordString()+`;

      int in_h = h / `+e+`;
      int offset_h = imod(h, `+e+`);
      int in_w = w / `+e+`;
      int offset_w = imod(w, `+e+`);
      int offset_d = (offset_h * `+e+` + offset_w) *
        `+this.getOutputDepthSize()+`;
      int in_d = d + offset_d;

      float result = `+this.getInputSamplingString()+`;
      setOutput(result);
    }
  `}return n.prototype.getHeightCoordString=function(){return this.dataFormat==="NHWC"?"coords[1]":"coords[2]"},n.prototype.getWidthCoordString=function(){return this.dataFormat==="NHWC"?"coords[2]":"coords[3]"},n.prototype.getDepthCoordString=function(){return this.dataFormat==="NHWC"?"coords[3]":"coords[1]"},n.prototype.getOutputDepthSize=function(){return this.dataFormat==="NHWC"?this.outputShape[3]:this.outputShape[1]},n.prototype.getInputSamplingString=function(){return this.dataFormat==="NHWC"?"getX(b, in_h, in_w, in_d)":"getX(b, in_d, in_h, in_w)"},n})(),_v=function(n){this.variableNames=["X"],this.outputShape=[n,n],this.userCode=`
      void main() {
          ivec2 coords = getOutputCoords();
          float val = coords[0] == coords[1] ? getX(coords[0]) : 0.0;
          setOutput(val);
      }
    `},Sv=function(n){this.variableNames=["A"],this.outTexUsage=St.DOWNLOAD;var t=st();this.outputShape=n,this.userCode=`
      `+kc+`

      void main() {
        float x = getAAtOutCoords();
        `+t.output+` = encode_float(x);
      }
    `},Rv=function(n){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!1,this.outTexUsage=St.DOWNLOAD;var t=st();this.outputShape=n,this.userCode=`
      `+kc+`

      void main() {
        ivec3 coords = getOutputCoords();
        float x = getChannel(getAAtOutCoords(), vec2(coords.y, coords.z));
        `+t.output+` = encode_float(x);
      }
    `},Iv=function(n,t,e){e===void 0&&(e=!1),this.variableNames=["A"];var r=st(),a=t[0],o=t[1];this.outputShape=n;var i="result";e&&(i="floor(result * 255. + 0.5)"),this.userCode=`
      `+Ti(n)+`

      void main() {
        ivec3 coords = getOutputCoords();

        int flatIndex = getFlatIndex(coords);
        int offset = imod(flatIndex, 4);

        flatIndex = idiv(flatIndex, 4, 1.);
        
        int r = flatIndex / `+o+`;
        int c = imod(flatIndex, `+o+`);
        vec2 uv = (vec2(c, r) + halfCR) / vec2(`+o+".0, "+a+`.0);
        vec4 values = `+r.texture2D+`(A, uv);

        float result;

        if(offset == 0) {
          result = values[0];
        } else if(offset == 1) {
          result = values[1];
        } else if(offset == 2) {
          result = values[2];
        } else {
          result = values[3];
        }

        `+r.output+" = vec4("+i+`, 0., 0., 0.);
      }
    `},kv=function(n,t,e){e===void 0&&(e=!1),this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0;var r=st(),a=t[0],o=t[1];this.outputShape=n;var i="",s="result";e&&(s="floor(result * 255. + 0.5)");for(var u=0;u<=1;u++)for(var c=0;c<=1;c++){var l=2*u+c;i+=`
          localCoords = coords;
          if(localCoords[2] + `+c+" < "+n[2]+`) {
            localCoords[2] += `+c+`;
            if(localCoords[1] + `+u+" < "+n[1]+`) {
              localCoords[1] += `+u+`;

              flatIndex = getFlatIndex(localCoords);
              offset = imod(flatIndex, 4);

              flatIndex = idiv(flatIndex, 4, 1.);

              r = flatIndex / `+o+`;
              c = imod(flatIndex, `+o+`);
              uv = (vec2(c, r) + halfCR) / vec2(`+o+".0, "+a+`.0);
              values = `+r.texture2D+`(A, uv);

              if(offset == 0) {
                result[`+l+`] = values[0];
              } else if(offset == 1) {
                result[`+l+`] = values[1];
              } else if(offset == 2) {
                result[`+l+`] = values[2];
              } else {
                result[`+l+`] = values[3];
              }
            }
          }
        `}this.userCode=`
      `+Ti(n)+`

      void main() {
        ivec3 coords = getOutputCoords();

        vec4 result = vec4(0.);
        int flatIndex, r, c, offset;
        ivec3 localCoords;
        vec2 uv;
        vec4 values;

        `+i+`

        `+r.output+" = "+s+`;
      }
    `},Tv="return real * expR - imag * expI;",Av="return real * expI + imag * expR;",Xs=function(n,t,e){this.variableNames=["real","imag"];var r=t[1];this.outputShape=t;var a=e?"2.0 * "+Math.PI:"-2.0 * "+Math.PI,o=e?r+".0":"1.0";this.userCode=`
      const float exponentMultiplier = `+a+`;

      float unaryOpComplex(float real, float expR, float imag, float expI) {
        `+n+`
      }

      float mulMatDFT(int batch, int index) {
        float indexRatio = float(index) / float(`+r+`);
        float exponentMultiplierTimesIndexRatio =
            exponentMultiplier * indexRatio;

        float result = 0.0;

        for (int i = 0; i < `+r+`; i++) {
          // x = (-2|2 * PI / N) * index * i;
          float x = exponentMultiplierTimesIndexRatio * float(i);
          float expR = cos(x);
          float expI = sin(x);
          float real = getReal(batch, i);
          float imag = getImag(batch, i);

          result +=
              unaryOpComplex(real, expR, imag, expI) / `+o+`;
        }

        return result;
      }

      void main() {
        ivec2 coords = getOutputCoords();
        setOutput(mulMatDFT(coords[0], coords[1]));
      }
    `},Dv=(function(){function n(t,e){this.outputShape=[],this.variableNames=["x"],this.outputShape=t,this.userCode=`
      uniform float value;
      void main() {
        // Input can be obtained from uniform value.
        setOutput(value);
      }
    `}return n.prototype.getCustomSetupFunc=function(t){var e=this;return function(r,a){e.valueLoc==null&&(e.valueLoc=r.getUniformLocationNoThrow(a,"value")),r.gl.uniform1f(e.valueLoc,t)}},n})(),Mv=function(n,t,e){this.variableNames=["A","indices"];var r=n.slice();r[e]=t,this.outputShape=r,this.rank=r.length;var a=Me(this.rank),o=(function(i,s){var u=i.length;if(u>4)throw Error("Gather for rank "+u+" is not yet supported");if(u===1)return"int(getIndices(resRC))";for(var c=["resRC.x","resRC.y","resRC.z","resRC.w"],l=[],h=0;h<i.length;h++)h===s?l.push("int(getIndices("+c[h]+"))"):l.push(""+c[h]);return l.join()})(n,e);this.userCode=`
      void main() {
        `+a+` resRC = getOutputCoords();
        setOutput(getA(`+o+`));
      }
    `},Nv=function(n,t,e){this.sliceDim=n,this.strides=t,this.variableNames=["x","indices"],this.outputShape=e;var r=Me(t.length),a=Me(e.length),o=this.sliceDim>1?"strides[j]":"strides";this.userCode=`
        `+r+" strides = "+r+"("+this.strides+`);
         void main() {
          `+a+` coords = getOutputCoords();
          int flattenIndex = 0;
          for (int j = 0; j < `+this.sliceDim+`; j++) {
            int index = round(getIndices(coords[0], j));
            flattenIndex += index * `+o+`;
          }
          setOutput(getX(flattenIndex, coords[1]));
        }
      `};function Fv(n,t){var e=st();return Td(n,t,e.version+`
    precision highp float;
    `+e.attribute+` vec3 clipSpacePos;
    `+e.attribute+` vec2 uv;
    `+e.varyingVs+` vec2 resultUV;

    void main() {
      gl_Position = vec4(clipSpacePos, 1);
      resultUV = uv;
    }`)}function Pv(n,t){return Fd(n,t,new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0]))}function Bv(n,t){return Pd(n,t,new Uint16Array([0,1,2,2,1,3]))}function qr(n,t,e,r,a,o,i){Od(e,r);var s=Bd(n,t),u=n.TEXTURE_2D;return ee(n,t,(function(){return n.bindTexture(u,s)})),ee(n,t,(function(){return n.texParameteri(u,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE)})),ee(n,t,(function(){return n.texParameteri(u,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)})),ee(n,t,(function(){return n.texParameteri(u,n.TEXTURE_MIN_FILTER,n.NEAREST)})),ee(n,t,(function(){return n.texParameteri(u,n.TEXTURE_MAG_FILTER,n.NEAREST)})),ee(n,t,(function(){return n.texImage2D(u,0,a,e,r,0,o,i,null)})),ee(n,t,(function(){return n.bindTexture(n.TEXTURE_2D,null)})),s}function Ov(n,t,e,r,a){var o=$a(e,r);return qr(n,t,o[0],o[1],a.internalFormatFloat,a.textureFormatFloat,n.FLOAT)}function Lv(n,t,e,r,a){var o=$a(e,r);return qr(n,t,o[0],o[1],a.internalFormatHalfFloat,a.textureFormatFloat,a.textureTypeHalfFloat)}function Uv(n,t,e,r,a){var o=$a(e,r);return qr(n,t,o[0],o[1],n.RGBA,n.RGBA,n.UNSIGNED_BYTE)}function Wv(n,t,e,r,a){var o=jr(e,r);return qr(n,t,o[0],o[1],a.internalFormatPackedFloat,n.RGBA,n.FLOAT)}function zv(n,t,e,r,a){var o=jr(e,r);return qr(n,t,o[0],o[1],a.internalFormatPackedHalfFloat,n.RGBA,a.textureTypeHalfFloat)}function Vv(n,t,e,r){return ee(n,t,(function(){return n.bindBuffer(n.ARRAY_BUFFER,r)})),Fs(n,t,e,"clipSpacePos",r,3,20,0)&&Fs(n,t,e,"uv",r,2,20,12)}function Gv(n,t,e,r,a,o,i){var s,u,c;ee(n,t,(function(){return n.bindTexture(n.TEXTURE_2D,e)})),o instanceof Uint8Array?(s=new Uint8Array(r*a*4),u=n.UNSIGNED_BYTE,c=n.RGBA):(s=new Float32Array(r*a*4),u=n.FLOAT,c=i.internalFormatPackedFloat),s.set(o),ee(n,t,(function(){return n.texImage2D(n.TEXTURE_2D,0,c,r,a,0,n.RGBA,u,s)})),ee(n,t,(function(){return n.bindTexture(n.TEXTURE_2D,null)}))}function Hv(n,t,e,r){ee(n,t,(function(){return n.bindTexture(n.TEXTURE_2D,e)})),r.data instanceof Uint8Array?ee(n,t,(function(){return n.texImage2D(n.TEXTURE_2D,0,n.RGBA,r.width,r.height,0,n.RGBA,n.UNSIGNED_BYTE,r.data)})):ee(n,t,(function(){return n.texImage2D(n.TEXTURE_2D,0,n.RGBA,n.RGBA,n.UNSIGNED_BYTE,r)})),ee(n,t,(function(){return n.bindTexture(n.TEXTURE_2D,null)}))}function jv(n,t,e,r,a){var o=n.createBuffer();ee(n,t,(function(){return n.bindBuffer(n.PIXEL_PACK_BUFFER,o)}));var i=16*e*r;return ee(n,t,(function(){return n.bufferData(n.PIXEL_PACK_BUFFER,i,n.STREAM_READ)})),ee(n,t,(function(){return n.readPixels(0,0,r,e,n.RGBA,n.FLOAT,0)})),ee(n,t,(function(){return n.bindBuffer(n.PIXEL_PACK_BUFFER,null)})),o}function qv(n,t,e){var r=n,a=new Float32Array(e);return r.bindBuffer(r.PIXEL_PACK_BUFFER,t),r.getBufferSubData(r.PIXEL_PACK_BUFFER,0,a),r.bindBuffer(r.PIXEL_PACK_BUFFER,null),a}function Xv(n,t,e,r,a){var o=$a(e,r),i=o[0],s=o[1],u=new Uint8Array(e*r*4);return ee(n,t,(function(){return n.readPixels(0,0,i,s,a.downloadTextureFormat,n.UNSIGNED_BYTE,u)})),new Float32Array(u.buffer)}function Kv(n,t,e,r,a,o,i,s){var u=n,c=new Float32Array((function(l,h){var f=jr(l,h);return f[0]*f[1]*4})(o,i));return u.bindBuffer(u.PIXEL_PACK_BUFFER,t),u.getBufferSubData(u.PIXEL_PACK_BUFFER,0,c),u.bindBuffer(u.PIXEL_PACK_BUFFER,null),c}function Yv(n,t,e,r){var a=new Float32Array(e*r*4);return ee(n,t,(function(){return n.readPixels(0,0,r,e,n.RGBA,n.FLOAT,a)})),a}var $v=(function(){function n(t){this.outputTexture=null,this.program=null,this.disposed=!1,this.vertexAttrsAreBound=!1,this.itemsToPoll=[];var e=W().getNumber("WEBGL_VERSION");t!=null?(this.gl=t,_d(e,t)):this.gl=on(e);var r="WEBGL_color_buffer_float";if(W().getNumber("WEBGL_VERSION")===1){if(this.textureFloatExtension=ia(this.gl,this.debug,"OES_texture_float"),Bt(this.gl,"OES_texture_half_float"))this.textureHalfFloatExtension=ia(this.gl,this.debug,"OES_texture_half_float");else if(W().get("WEBGL_FORCE_F16_TEXTURES"))throw new Error("GL context does not support half float textures, yet the environment flag WEBGL_FORCE_F16_TEXTURES is set to true.");if(this.colorBufferFloatExtension=this.gl.getExtension(r),Bt(this.gl,"EXT_color_buffer_half_float"))this.colorBufferHalfFloatExtension=ia(this.gl,this.debug,"EXT_color_buffer_half_float");else if(W().get("WEBGL_FORCE_F16_TEXTURES"))throw new Error("GL context does not support color renderable half floats, yet the environment flag WEBGL_FORCE_F16_TEXTURES is set to true.")}else if(r="EXT_color_buffer_float",Bt(this.gl,r))this.colorBufferFloatExtension=this.gl.getExtension(r);else{if(!Bt(this.gl,"EXT_color_buffer_half_float"))throw new Error("GL context does not support color renderable floats");this.colorBufferHalfFloatExtension=this.gl.getExtension("EXT_color_buffer_half_float")}this.vertexBuffer=Pv(this.gl,this.debug),this.indexBuffer=Bv(this.gl,this.debug),this.framebuffer=Ld(this.gl,this.debug),this.textureConfig=xi(this.gl,this.textureHalfFloatExtension)}return Object.defineProperty(n.prototype,"debug",{get:function(){return W().getBool("DEBUG")},enumerable:!0,configurable:!0}),n.prototype.dispose=function(){var t=this;if(!this.disposed){this.program!=null&&console.warn("Disposing a GPGPUContext that still has a bound WebGLProgram. This is probably a resource leak, delete the program with GPGPUContext.deleteProgram before disposing."),this.outputTexture!=null&&console.warn("Disposing a GPGPUContext that still has a bound output matrix texture.  This is probably a resource leak, delete the output matrix texture with GPGPUContext.deleteMatrixTexture before disposing.");var e=this.gl;ee(e,this.debug,(function(){return e.finish()})),ee(e,this.debug,(function(){return e.bindFramebuffer(e.FRAMEBUFFER,null)})),ee(e,this.debug,(function(){return e.deleteFramebuffer(t.framebuffer)})),ee(e,this.debug,(function(){return e.bindBuffer(e.ARRAY_BUFFER,null)})),ee(e,this.debug,(function(){return e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null)})),ee(e,this.debug,(function(){return e.deleteBuffer(t.indexBuffer)})),this.disposed=!0}},n.prototype.createFloat32MatrixTexture=function(t,e){return this.throwIfDisposed(),Ov(this.gl,this.debug,t,e,this.textureConfig)},n.prototype.createFloat16MatrixTexture=function(t,e){return this.throwIfDisposed(),Lv(this.gl,this.debug,t,e,this.textureConfig)},n.prototype.createUnsignedBytesMatrixTexture=function(t,e){return this.throwIfDisposed(),Uv(this.gl,this.debug,t,e,this.textureConfig)},n.prototype.uploadPixelDataToTexture=function(t,e){this.throwIfDisposed(),Hv(this.gl,this.debug,t,e)},n.prototype.uploadDenseMatrixToTexture=function(t,e,r,a){this.throwIfDisposed(),Gv(this.gl,this.debug,t,e,r,a,this.textureConfig)},n.prototype.createFloat16PackedMatrixTexture=function(t,e){return this.throwIfDisposed(),zv(this.gl,this.debug,t,e,this.textureConfig)},n.prototype.createPackedMatrixTexture=function(t,e){return this.throwIfDisposed(),Wv(this.gl,this.debug,t,e,this.textureConfig)},n.prototype.deleteMatrixTexture=function(t){var e=this;this.throwIfDisposed(),this.outputTexture===t&&(Ps(this.gl,this.debug,this.framebuffer),this.outputTexture=null),ee(this.gl,this.debug,(function(){return e.gl.deleteTexture(t)}))},n.prototype.downloadByteEncodedFloatMatrixFromOutputTexture=function(t,e,r){var a=this;return this.downloadMatrixDriver(t,(function(){return Xv(a.gl,a.debug,e,r,a.textureConfig)}))},n.prototype.downloadPackedMatrixFromBuffer=function(t,e,r,a,o,i){return Kv(this.gl,t,0,0,0,o,i,this.textureConfig)},n.prototype.downloadFloat32MatrixFromBuffer=function(t,e){return qv(this.gl,t,e)},n.prototype.createBufferFromTexture=function(t,e,r){this.bindTextureToFrameBuffer(t);var a=jv(this.gl,this.debug,e,r,this.textureConfig);return this.unbindTextureToFrameBuffer(),a},n.prototype.createAndWaitForFence=function(){var t=this.createFence(this.gl);return this.pollFence(t)},n.prototype.createFence=function(t){var e,r,a=this;if(W().getBool("WEBGL_FENCE_API_ENABLED")){var o=t,i=o.fenceSync(o.SYNC_GPU_COMMANDS_COMPLETE,0);t.flush(),r=function(){var s=o.clientWaitSync(i,0,0);return s===o.ALREADY_SIGNALED||s===o.CONDITION_SATISFIED},e=i}else W().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")>0?(e=this.beginQuery(),this.endQuery(),r=function(){return a.isQueryAvailable(e,W().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))}):r=function(){return!0};return{query:e,isFencePassed:r}},n.prototype.downloadMatrixFromPackedTexture=function(t,e,r){var a=this;return this.downloadMatrixDriver(t,(function(){return Yv(a.gl,a.debug,e,r)}))},n.prototype.createProgram=function(t){this.throwIfDisposed();var e=this.gl,r=Ad(e,this.debug,t),a=Fv(e,this.debug),o=Md(e,this.debug);return ee(e,this.debug,(function(){return e.attachShader(o,a)})),ee(e,this.debug,(function(){return e.attachShader(o,r)})),Nd(e,this.debug,o),this.debug&&Co(e,this.debug,o),this.vertexAttrsAreBound||(this.setProgram(o),this.vertexAttrsAreBound=Vv(e,this.debug,this.program,this.vertexBuffer)),o},n.prototype.deleteProgram=function(t){var e=this;this.throwIfDisposed(),t===this.program&&(this.program=null),t!=null&&ee(this.gl,this.debug,(function(){return e.gl.deleteProgram(t)}))},n.prototype.setProgram=function(t){var e=this;this.throwIfDisposed(),this.program=t,this.program!=null&&this.debug&&Co(this.gl,this.debug,this.program),ee(this.gl,this.debug,(function(){return e.gl.useProgram(t)}))},n.prototype.getUniformLocation=function(t,e,r){return r===void 0&&(r=!0),this.throwIfDisposed(),r?Wd(this.gl,this.debug,t,e):zd(this.gl,t,e)},n.prototype.getAttributeLocation=function(t,e){var r=this;return this.throwIfDisposed(),ee(this.gl,this.debug,(function(){return r.gl.getAttribLocation(t,e)}))},n.prototype.getUniformLocationNoThrow=function(t,e){return this.throwIfDisposed(),this.gl.getUniformLocation(t,e)},n.prototype.setInputMatrixTexture=function(t,e,r){this.throwIfDisposed(),this.throwIfNoProgram(),Vd(this.gl,this.debug,this.program,t,e,r)},n.prototype.setOutputMatrixTexture=function(t,e,r){this.setOutputMatrixTextureDriver(t,r,e)},n.prototype.setOutputPackedMatrixTexture=function(t,e,r){this.throwIfDisposed();var a=jr(e,r),o=a[0],i=a[1];this.setOutputMatrixTextureDriver(t,o,i)},n.prototype.setOutputMatrixWriteRegion=function(t,e,r,a){this.setOutputMatrixWriteRegionDriver(r,t,a,e)},n.prototype.setOutputPackedMatrixWriteRegion=function(t,e,r,a){throw new Error("setOutputPackedMatrixWriteRegion not implemented.")},n.prototype.debugValidate=function(){this.program!=null&&Co(this.gl,this.debug,this.program),sa(this.gl)},n.prototype.executeProgram=function(){this.throwIfDisposed(),this.throwIfNoProgram();var t=this.gl;this.debug&&this.debugValidate(),ee(t,this.debug,(function(){return t.drawElements(t.TRIANGLES,6,t.UNSIGNED_SHORT,0)}))},n.prototype.blockUntilAllProgramsCompleted=function(){var t=this;this.throwIfDisposed(),ee(this.gl,this.debug,(function(){return t.gl.finish()}))},n.prototype.getQueryTimerExtension=function(){return this.disjointQueryTimerExtension==null&&(this.disjointQueryTimerExtension=ia(this.gl,this.debug,W().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")===2?"EXT_disjoint_timer_query_webgl2":"EXT_disjoint_timer_query")),this.disjointQueryTimerExtension},n.prototype.getQueryTimerExtensionWebGL2=function(){return this.getQueryTimerExtension()},n.prototype.getQueryTimerExtensionWebGL1=function(){return this.getQueryTimerExtension()},n.prototype.beginQuery=function(){if(W().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")===2){var t=this.gl,e=this.getQueryTimerExtensionWebGL2(),r=t.createQuery();return t.beginQuery(e.TIME_ELAPSED_EXT,r),r}var a=this.getQueryTimerExtensionWebGL1(),o=a.createQueryEXT();return a.beginQueryEXT(a.TIME_ELAPSED_EXT,o),o},n.prototype.endQuery=function(){if(W().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")!==2){var t=this.getQueryTimerExtensionWebGL1();t.endQueryEXT(t.TIME_ELAPSED_EXT)}else{var e=this.gl,r=this.getQueryTimerExtensionWebGL2();e.endQuery(r.TIME_ELAPSED_EXT)}},n.prototype.waitForQueryAndGetTime=function(t){return $(this,void 0,void 0,(function(){var e=this;return J(this,(function(r){switch(r.label){case 0:return[4,ks((function(){return e.disposed||e.isQueryAvailable(t,W().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))}))];case 1:return r.sent(),[2,this.getQueryTime(t,W().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))]}}))}))},n.prototype.getQueryTime=function(t,e){if(e===0)return null;if(e===2){var r=this.gl;return r.getQueryParameter(t,r.QUERY_RESULT)/1e6}var a=this.getQueryTimerExtensionWebGL1();return a.getQueryObjectEXT(t,a.QUERY_RESULT_EXT)/1e6},n.prototype.isQueryAvailable=function(t,e){if(e===0)return!0;if(e===2){var r=this.gl,a=this.getQueryTimerExtensionWebGL2(),o=r.getQueryParameter(t,r.QUERY_RESULT_AVAILABLE);return this.disjoint==null&&(this.disjoint=this.gl.getParameter(a.GPU_DISJOINT_EXT)),o&&!this.disjoint}return o=(a=this.getQueryTimerExtensionWebGL1()).getQueryObjectEXT(t,a.QUERY_RESULT_AVAILABLE_EXT),this.disjoint==null&&(this.disjoint=this.gl.getParameter(a.GPU_DISJOINT_EXT)),o&&!this.disjoint},n.prototype.pollFence=function(t){var e=this;return new Promise((function(r){e.addItemToPoll((function(){return t.isFencePassed()}),(function(){return r()}))}))},n.prototype.pollItems=function(){for(var t=(function(r){for(var a=0;a<r.length&&r[a]();++a);return a-1})(this.itemsToPoll.map((function(r){return r.isDoneFn}))),e=0;e<=t;++e)(0,this.itemsToPoll[e].resolveFn)();this.itemsToPoll=this.itemsToPoll.slice(t+1)},n.prototype.addItemToPoll=function(t,e){var r=this;this.itemsToPoll.push({isDoneFn:t,resolveFn:e}),this.itemsToPoll.length>1||ks((function(){return r.pollItems(),r.itemsToPoll.length===0}))},n.prototype.bindTextureToFrameBuffer=function(t){this.throwIfDisposed(),Eo(this.gl,this.debug,t,this.framebuffer),this.debug&&sa(this.gl)},n.prototype.unbindTextureToFrameBuffer=function(){this.outputTexture!=null?(Eo(this.gl,this.debug,this.outputTexture,this.framebuffer),this.debug&&sa(this.gl)):Ps(this.gl,this.debug,this.framebuffer)},n.prototype.downloadMatrixDriver=function(t,e){this.bindTextureToFrameBuffer(t);var r=e();return this.unbindTextureToFrameBuffer(),r},n.prototype.setOutputMatrixTextureDriver=function(t,e,r){this.throwIfDisposed();var a=this.gl;Eo(a,this.debug,t,this.framebuffer),this.debug&&sa(a),this.outputTexture=t,ee(a,this.debug,(function(){return a.viewport(0,0,e,r)})),ee(a,this.debug,(function(){return a.scissor(0,0,e,r)}))},n.prototype.setOutputMatrixWriteRegionDriver=function(t,e,r,a){var o=this;this.throwIfDisposed(),ee(this.gl,this.debug,(function(){return o.gl.scissor(t,e,r,a)}))},n.prototype.throwIfDisposed=function(){if(this.disposed)throw new Error("Attempted to use disposed GPGPUContext.")},n.prototype.throwIfNoProgram=function(){if(this.program==null)throw new Error("No GPU program is currently set.")},n})();function Ks(n,t){if(n.length!==t.length)throw Error("Binary was compiled with "+n.length+" inputs, but was executed with "+t.length+" inputs");n.forEach((function(e,r){var a=e.logicalShape,o=t[r],i=o.shape;if(!Qe(a,i))throw Error("Binary was compiled with different shapes than the current args. Shapes "+a+" and "+i+" must match");if(!e.isUniform||!o.isUniform){var s=e.texShape,u=o.isUniform?null:o.texData.texShape;if(!Qe(s,u))throw Error("Binary was compiled with different texture shapes than the current args. Shape "+s+" and "+u+" must match")}}))}var Jv=function(n,t,e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=n;for(var r=e.filterWidth,a=e.inChannels,o=e.strideWidth,i=e.strideHeight,s=e.padInfo,u=e.outWidth,c=e.dilationWidth,l=e.dilationHeight,h=e.dataFormat,f=s.left,d=s.top,p=a*r,v=st(),m=h==="channelsLast",g=m?0:1,y=m?1:2,b="",x=0;x<=1;x++)for(var w=0;w<=1;w++)b+=`
          blockIndex = rc.y + `+w+`;
          pos = rc.x + `+x+`;

          if(blockIndex < `+n[1]+" && pos < "+n[0]+`) {
            offsetY = int(blockIndex / (`+u+")) * "+i+" - "+d+`;
            d0 = offsetY + `+l+" * (pos / "+p+`);

            if(d0 < `+t[g]+` && d0 >= 0) {

              offsetX = int(mod(float(blockIndex), `+u+".) * "+o+". - "+f+`.);
              d1 = offsetX + `+c+" * (int(mod(float(pos), "+p+".) / "+a+`.));

              if(d1 < `+t[y]+` && d1 >= 0) {

                ch = int(mod(float(pos), `+a+`.));

                if (`+m+`) {
                  innerDims = vec2(d1, ch);
                  result[`+(2*x+w)+`] = getChannel(
                    getA(d0, int(innerDims.x),
                    int(innerDims.y)), innerDims);
                } else {
                  innerDims = vec2(d0, d1);
                  result[`+(2*x+w)+`] = getChannel(
                    getA(ch, int(innerDims.x),
                    int(innerDims.y)), innerDims);
                }
              }
            }
          }
        `;this.userCode=`
      void main() {
        ivec2 rc = getOutputCoords();

        vec4 result = vec4(0);

        int blockIndex, pos, offsetY, d0, offsetX, d1, ch;
        vec2 innerDims;

        `+b+`

        `+v.output+` = result;
      }
    `},Qv=function(n,t,e,r,a){this.variableNames=["x"],this.outputShape=[];var o,i=t,s=n[3]-1;this.outputShape=n;var u="float("+e+") + float("+r+") * sum";o=a===.5?"inversesqrt("+u+")":a===1?"1.0/("+u+")":"exp(log("+u+") * float(-"+a+"));",this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int r = coords[1];
        int c = coords[2];
        int d = coords[3];
        float x = getX(b, r, c, d);
        float sum = 0.0;
        for (int j = -`+i+"; j <= "+i+`; j++) {
          int idx = d + j;
          if (idx >= 0 && idx <=  `+s+`) {
            float z = getX(b, r, c, idx);
            sum += z * z;
          }
        }
        float val = x * `+o+`;
        setOutput(val);
      }
    `},Zv=function(n,t,e,r,a){this.variableNames=["inputImage","outputImage","dy"],this.outputShape=[],this.outputShape=n,this.depth=n[3],this.depthRadius=t,this.bias=e,this.alpha=r,this.beta=a,this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int r = coords[1];
        int c = coords[2];

        float result = 0.0;
        for (int d = 0; d < `+this.depth+`; ++d) {
          int depthBegin = int(max(0.0, float(d - `+t+`)));
          int depthEnd = int(min(float(`+this.depth+`),
              float(d + `+t+` + 1)));

          const int MIN_DEPTH_BEGIN = 0;
          const int MAX_DEPTH_END = `+this.depth+`;

          float norm = 0.0;
          for (int k = MIN_DEPTH_BEGIN; k < MAX_DEPTH_END; ++k) {
            if (k < depthBegin){
              continue;
            }
            else if (k >= depthBegin && k < depthEnd) {
              norm += getInputImage(b, r, c, k) * getInputImage(b, r, c, k);
            }
            else {
              break;
            }
          }

          norm = float(`+r+") * norm + float("+e+`);

          for(int k = MIN_DEPTH_BEGIN; k < MAX_DEPTH_END; ++k){
            if (k < depthBegin){
              continue;
            }
            else if (k >= depthBegin && k < depthEnd){
              float dyi = -2.0 * float(`+r+`)
                * float(`+a+`)
                * getInputImage(b ,r ,c, k) * getOutputImage(b, r, c, d)
                / norm;
              if (k == d) {
                dyi += pow(norm, -1.0 * `+a+`);
              }
              if (k == coords[3]) {
                dyi *= getDy(b, r, c, d);
                result += dyi;
              }
            }
            else {
              break;
            }
          }
      }
      setOutput(result);
      }
    `},em=function(n,t,e,r,a){this.variableNames=["x"],this.outputShape=[],this.packedInputs=!0,this.packedOutput=!0;var o,i=t,s=n[3]-1;this.outputShape=n;var u="float("+e+") + float("+r+") * sum";o=a===.5?"inversesqrt("+u+")":a===1?"1.0/("+u+")":"exp(log("+u+") * float(-"+a+"));",this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords.x;
        int r = coords.y;
        int c = coords.z;
        int d = coords.w;

        bool hasNextCol = d < `+this.outputShape[3]+`;
        bool hasNextRow = c < `+this.outputShape[2]+`;

        vec4 sum = vec4(0.);
        vec4 xFragAtOutputCoords = getX(b, r, c, d);

        vec4 xAtOutputCoords = vec4(
          getChannel(xFragAtOutputCoords, vec2(c, d)),
          hasNextCol ?
            getChannel(xFragAtOutputCoords, vec2(c, d + 1)) : 0.0,
          hasNextRow ?
            getChannel(xFragAtOutputCoords , vec2(c + 1, d)) : 0.0,
          (hasNextRow && hasNextCol) ?
            getChannel(xFragAtOutputCoords, vec2(c + 1, d + 1)) : 0.0
        );

        int firstChannel = d - `+i+`;
        vec2 cache = vec2(0.);
        if(firstChannel >= 0){
          vec4 firstChannelFrag = getX(b, r, c, firstChannel);
          cache.x = getChannel(firstChannelFrag, vec2(c, firstChannel));
            if(hasNextRow){
              cache.y = getChannel(firstChannelFrag, vec2(c + 1, firstChannel));
            }
        }

        ivec2 depth = ivec2(d, d + 1);
        for (int j = - `+i+"; j <= "+i+`; j++) {
          ivec2 idx = depth + j;
          bvec2 aboveLowerBound = greaterThanEqual(idx, ivec2(0));
          bvec2 belowUpperBound = lessThanEqual(idx, ivec2(`+s+`));

          bool depthInRange = aboveLowerBound.x && belowUpperBound.x;
          bool depthPlusOneInRange = aboveLowerBound.y && belowUpperBound.y;

          if(depthInRange || depthPlusOneInRange){
            vec4 z = vec4(0.);
            vec4 xFragAtCurrentDepth;
            z.xz = cache.xy;
            if(depthPlusOneInRange && hasNextCol){
              xFragAtCurrentDepth = idx.y != d ?
                getX(b, r, c, idx.y) : xFragAtOutputCoords;
              z.y = getChannel(xFragAtCurrentDepth, vec2(c, idx.y));
              if(hasNextRow){
                z.w = getChannel(xFragAtCurrentDepth, vec2(c + 1, idx.y));
              }
            }
            cache.xy = z.yw;
            sum += z * z;
          }
        }
        vec4 result = xAtOutputCoords * `+o+`;
        setOutput(result);
      }
    `},tm=function(n){this.variableNames=["dy","maxPos"],this.outputShape=n.inShape;var t=n.strideHeight,e=n.strideWidth,r=n.dilationHeight,a=n.effectiveFilterHeight,o=n.effectiveFilterWidth,i=a-1-n.padInfo.top,s=o-1-n.padInfo.left,u=a*o-1;this.userCode=`
      const ivec2 pads = ivec2(`+i+", "+s+`);

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];

        ivec2 dyRCCorner = coords.yz - pads;
        int dyRCorner = dyRCCorner.x;
        int dyCCorner = dyRCCorner.y;

        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < `+a+`;
          wR += `+r+`) {
          float dyR = float(dyRCorner + wR) / `+t+`.0;

          if (dyR < 0.0 || dyR >= `+n.outHeight+`.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          for (int wC = 0; wC < `+o+`; wC++) {
            float dyC = float(dyCCorner + wC) / `+e+`.0;

            if (dyC < 0.0 || dyC >= `+n.outWidth+`.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            float dyValue = getDy(b, idyR, idyC, d);
            int maxPosValue = `+u+` - int(getMaxPos(b, idyR, idyC, d));

            // Get the current value, check it against the value from the
            // position matrix.
            int curPosValue = wR * `+o+` + wC;
            float mask = float(maxPosValue == curPosValue ? 1.0 : 0.0);

            dotProd += dyValue * mask;
          }
        }
        setOutput(dotProd);
      }
    `},nm=function(n){this.variableNames=["dy","maxPos"],this.outputShape=n.inShape;var t=n.strideDepth,e=n.strideHeight,r=n.strideWidth,a=n.dilationDepth,o=n.dilationHeight,i=n.dilationWidth,s=n.effectiveFilterDepth,u=n.effectiveFilterHeight,c=n.effectiveFilterWidth,l=s-1-n.padInfo.front,h=u-1-n.padInfo.top,f=c-1-n.padInfo.left,d=s*u*c-1;this.userCode=`
      const ivec3 pads = ivec3(`+l+", "+h+", "+f+`);

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int ch = coords.u;

        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;
        int dyDCorner = dyCorner.x;
        int dyRCorner = dyCorner.y;
        int dyCCorner = dyCorner.z;

        // Convolve dy(?, ?, ?, ch) with pos mask(:, :, :, d) to get
        // dx(xD, xR, xC, ch).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int wD = 0; wD < `+s+`;
           wD += `+a+`) {
          float dyD = float(dyDCorner + wD) / `+t+`.0;

          if (dyD < 0.0 || dyD >= `+n.outDepth+`.0 || fract(dyD) > 0.0) {
            continue;
          }
          int idyD = int(dyD);

          for (int wR = 0; wR < `+u+`;
              wR += `+o+`) {
            float dyR = float(dyRCorner + wR) / `+e+`.0;

            if (dyR < 0.0 || dyR >= `+n.outHeight+`.0 ||
                fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            for (int wC = 0; wC < `+c+`;
                wC += `+i+`) {
              float dyC = float(dyCCorner + wC) / `+r+`.0;

              if (dyC < 0.0 || dyC >= `+n.outWidth+`.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              float dyValue = getDy(batch, idyD, idyR, idyC, ch);
              int maxPosValue = `+d+` -
                  int(getMaxPos(batch, idyD, idyR, idyC, ch));

              // Get the current value, check it against the value from the
              // position matrix.
              int curPosValue =
                  wD * `+u+" * "+c+` +
                  wR * `+c+` + wC;
              float mask = float(maxPosValue == curPosValue ? 1.0 : 0.0);

              dotProd += dyValue * mask;
            }
          }
        }
        setOutput(dotProd);
      }
    `},ko=function(n,t,e,r,a,o,i){e===void 0&&(e=!1),r===void 0&&(r=!1),a===void 0&&(a=!1),o===void 0&&(o=null),i===void 0&&(i=!1),this.variableNames=["matrixA","matrixB"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t;var s=e?n[1]:n[2],u=Math.ceil(s/2),c=e?"i * 2, rc.y":"rc.y, i * 2",l=r?"rc.z, i * 2":"i * 2, rc.z",h=e?["a.xxyy","a.zzww"]:["a.xxzz","a.yyww"],f=r?["b.xzxz","b.ywyw"]:["b.xyxy","b.zwzw"],d="",p="";o&&(d=i?`vec4 activation(vec4 a) {
          vec4 b = getPreluActivationWeightsAtOutCoords();
          `+o+`
        }`:`vec4 activation(vec4 x) {
          `+o+`
        }`,p="result = activation(result);");var v=a?"result += getBiasAtOutCoords();":"";a&&this.variableNames.push("bias"),i&&this.variableNames.push("preluActivationWeights"),this.userCode=`
      `+d+`

      const float sharedDimension = `+u+`.0;

      vec4 dot2x2ARowBCol(ivec3 rc) {
        vec4 result = vec4(0);
        for (int i = 0; i < `+u+`; i++) {
          vec4 a = getMatrixA(rc.x, `+c+`);
          vec4 b = getMatrixB(rc.x, `+l+`);

          // These swizzled products need to be separately added.
          // See: https://github.com/tensorflow/tfjs/issues/1735
          result += (`+h[0]+" * "+f[0]+`);
          result += (`+h[1]+" * "+f[1]+`);
        }
        return result;
      }

      void main() {
        ivec3 rc = getOutputCoords();
        vec4 result = dot2x2ARowBCol(rc);

        `+v+`

        `+p+`

        setOutput(result);
      }
    `},rm=(function(){function n(t,e,r){this.variableNames=["probs"],this.outputShape=[t,r],this.userCode=`
      uniform float seed;

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];

        float r = random(seed);
        float cdf = 0.0;

        for (int i = 0; i < `+(e-1)+`; i++) {
          cdf += getProbs(batch, i);

          if (r < cdf) {
            setOutput(float(i));
            return;
          }
        }

        // If no other event happened, last event happened.
        setOutput(float(`+(e-1)+`));
      }
    `}return n.prototype.getCustomSetupFunc=function(t){var e=this;return function(r,a){e.seedLoc==null&&(e.seedLoc=r.getUniformLocation(a,"seed")),r.gl.uniform1f(e.seedLoc,t)}},n})(),am=function(n,t,e,r){this.variableNames=["indices"],this.outputShape=[n,t],this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int index = round(getIndices(coords.x));
        setOutput(mix(float(`+r+"), float("+e+`),
                      float(index == coords.y)));
      }
    `},om=function(n){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.outputShape=n;var t=n.length;if(t===0)this.userCode=`
        void main() {
          setOutput(vec4(getA(), 0., 0., 0.));
        }
      `;else{var e=gt("rc",t),r=Me(t),a=(function(s,u,c){if(s===1)return"rc > "+u[0];for(var l="",h=s-2;h<s;h++)l+=c[h]+" >= "+u[h],h<s-1&&(l+="||");return l})(t,n,e),o=(function(s,u,c,l){if(s===1)return"";var h=l.slice(-2);return`
    int r = `+h[0]+`;
    int c = `+h[1]+`;
    int rp1 = r + 1;
    int cp1 = c + 1;

    bool cEdge = cp1 >= `+u+`;
    bool rEdge = rp1 >= `+c+`;
  `})(t,n[n.length-1],n[n.length-2],e),i=(function(s,u){var c=s.length,l=(function(h,f){for(var d=[],p=0;p<=1;p++)for(var v=0;v<=1;v++){for(var m=(p===0?"r":"rp1")+", "+(v===0?"c":"cp1"),g=2;g<h;g++)m=f[f.length-1-g]+","+m;d.push(m)}return d})(c,u);return c===1?`getA(rc),
            rc + 1 >= `+s[0]+` ? 0. : getA(rc + 1),
            0, 0`:"getA("+l[0]+`),
          cEdge ? 0. : getA(`+l[1]+`),
          rEdge ? 0. : getA(`+l[2]+`),
          rEdge || cEdge ? 0. : getA(`+l[3]+")"})(n,e);this.userCode=`
        void main() {
          `+r+` rc = getOutputCoords();

          if(`+a+`) {
            setOutput(vec4(0));
          } else {
            `+o+`

            setOutput(vec4(`+i+`));
          }
        }
      `}},im=function(n,t,e){this.variableNames=["x"],this.outputShape=t.map((function(u,c){return u[0]+n[c]+u[1]}));var r=n.length,a=Me(r),o=t.map((function(u){return u[0]})).join(","),i=t.map((function(u,c){return u[0]+n[c]})).join(","),s=["coords[0]","coords[1]","coords[2]","coords[3]"].slice(0,r);this.userCode=r!==1?`
      `+a+" start = "+a+"("+o+`);
      `+a+" end = "+a+"("+i+`);

      void main() {
        `+a+` outC = getOutputCoords();
        if (any(lessThan(outC, start)) || any(greaterThanEqual(outC, end))) {
          setOutput(float(`+e+`));
        } else {
          `+a+` coords = outC - start;
          setOutput(getX(`+s+`));
        }
      }
    `:`
        int start = `+o+`;
        int end = `+i+`;

        void main() {
          int outC = getOutputCoords();
          if (outC < start || outC >= end) {
            setOutput(float(`+e+`));
          } else {
            setOutput(getX(outC - start));
          }
        }
      `},sm=function(n,t,e){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t.map((function(m,g){return m[0]+n[g]+m[1]}));for(var r=n.length,a=Me(r),o=t.map((function(m){return m[0]})).join(","),i=t.map((function(m,g){return m[0]+n[g]})).join(","),s=gt("rc",r),u=gt("source",r),c=s[r-1]+" < "+this.outputShape[r-1],l=r===1?"source":"vec2("+u.slice(-2).join()+")",h=[a+" rc = outputLoc;",s[r-1]+` += 1;
       if(`+c+`) {
      `,r===1?"":`}
       rc = outputLoc;
       `+s[r-2]+` += 1;
       if(`+s[r-2]+" < "+this.outputShape[r-2]+") {",r===1?"":"  "+s[r-1]+` += 1;
         if(`+c+") {"],f=r===1?"rc < start || rc >= end":"any(lessThan(rc, start)) || any(greaterThanEqual(rc, end))",d="",p=0,v=r===1?2:4;p<v;p++)d+=`
        `+h[p]+`
        if (`+f+`) {
          result[`+p+"] = float("+e+`);
        } else {
          `+a+` source = rc - start;
          result[`+p+"] = getChannel(getX("+u.join()+"), "+l+`);
        }
      `;d+=r===1?"} ":"}}",this.userCode=`
      const `+a+" start = "+a+"("+o+`);
      const `+a+" end = "+a+"("+i+`);

      void main() {
        `+a+` outputLoc = getOutputCoords();
        vec4 result = vec4(0.);
        `+d+`
        setOutput(result);
      }
    `},To=function(n,t,e){if(this.variableNames=["x"],t==="avg"&&e)throw new Error("Cannot compute positions for average pool.");var r=n.filterWidth,a=n.strideHeight,o=n.strideWidth,i=n.dilationHeight,s=n.dilationWidth,u=n.effectiveFilterHeight,c=n.effectiveFilterWidth,l=n.padInfo.top,h=n.padInfo.left;this.outputShape=n.outShape;var f=t==="avg",d="0.0";if(f||(d="-1.0 / 1e-20"),e)this.userCode=`
        const ivec2 strides = ivec2(`+a+", "+o+`);
        const ivec2 pads = ivec2(`+l+", "+h+`);

        void main() {
          ivec4 coords = getOutputCoords();
          int batch = coords[0];
          int d = coords[3];

          ivec2 xRCCorner = coords.yz * strides - pads;
          int xRCorner = xRCCorner.x;
          int xCCorner = xRCCorner.y;

          // max/min x(?, ?, d) to get y(yR, yC, d).
          // ? = to be determined
          float minMaxValue = 0.0;
          float minMaxValueFound = 0.0;
          int minMaxPosition = 0;
          float avgValue = 0.0;

          for (int wR = 0; wR < `+u+`;
              wR += `+i+`) {
            int xR = xRCorner + wR;

            if (xR < 0 || xR >= `+n.inHeight+`) {
              continue;
            }

            for (int wC = 0; wC < `+c+`;
                wC += `+s+`) {
              int xC = xCCorner + wC;

              if (xC < 0 || xC >= `+n.inWidth+`) {
                continue;
              }

              float value = getX(batch, xR, xC, d);

              // If a min / max value has already been found, use it. If not,
              // use the current value.
              float currMinMaxValue = mix(
                  value, minMaxValue, minMaxValueFound);
              if (value >= currMinMaxValue) {
                minMaxValue = value;
                minMaxValueFound = 1.0;
                minMaxPosition = wR * `+c+` + wC;
              }
            }
          }
          setOutput(float(minMaxPosition));
        }
      `;else{var p=t+"("+t+"("+t+"(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])";t==="avg"&&(p="avgValue / count");var v=4*Math.floor(r/4),m=r%4,g=`
      if (`+f+`) {
        avgValue += dot(values, ones);
      } else {
        minMaxValue = max(values, minMaxValue);
      }
    `;this.userCode=`
      const ivec2 strides = ivec2(`+a+", "+o+`);
      const ivec2 pads = ivec2(`+l+", "+h+`);
      const float initializationValue = `+d+`;
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float count = 0.0;

      float getValue(int batch, int xR, int xC, int d) {
        if (xC < 0 || xC >= `+n.inWidth+`) {
          return initializationValue;
        }
        count += 1.0;
        return getX(batch, xR, xC, d);
      }

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d = coords[3];

        ivec2 xRCCorner = coords.yz * strides - pads;
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        // max/min x(?, ?, d) to get y(yR, yC, d).
        // ? = to be determined
        vec4 minMaxValue = vec4(`+d+`);
        float avgValue = 0.0;
        count = 0.0;

        for (int wR = 0; wR < `+u+`;
            wR += `+i+`) {
          int xR = xRCorner + wR;

          if (xR < 0 || xR >= `+n.inHeight+`) {
            continue;
          }

          for (int wC = 0; wC < `+v+`; wC += 4) {
            int xC = xCCorner + wC * `+s+`;

            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + `+s+`, d),
              getValue(batch, xR, xC + 2 * `+s+`, d),
              getValue(batch, xR, xC + 3 * `+s+`, d)
            );

            `+g+`
          }

          int xC = xCCorner + `+v+`;
          if (`+(m===1)+`) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              initializationValue,
              initializationValue,
              initializationValue
            );

            `+g+`
          } else if (`+(m===2)+`) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + `+s+`, d),
              initializationValue,
              initializationValue
            );

            `+g+`
          } else if (`+(m===3)+`) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + `+s+`, d),
              getValue(batch, xR, xC + 2 * `+s+`, d),
              initializationValue
            );

            `+g+`
          }
        }
        setOutput(`+p+`);
      }
    `}},Ao=function(n,t,e){if(this.variableNames=["x"],t==="avg"&&e)throw new Error("Cannot compute positions for average pool.");var r=n.filterWidth,a=n.strideDepth,o=n.strideHeight,i=n.strideWidth,s=n.dilationDepth,u=n.dilationHeight,c=n.dilationWidth,l=n.effectiveFilterDepth,h=n.effectiveFilterHeight,f=n.effectiveFilterWidth,d=n.padInfo.front,p=n.padInfo.top,v=n.padInfo.left;this.outputShape=n.outShape;var m=t==="avg",g="0.0";if(m||(g="-1.0 / 1e-20"),e)this.userCode=`
        const ivec3 strides =
            ivec3(`+a+", "+o+", "+i+`);
        const ivec3 pads = ivec3(`+d+", "+p+", "+v+`);

        void main() {
          ivec5 coords = getOutputCoords();
          int batch = coords.x;
          int ch = coords.u;

          ivec3 xCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;
          int xDCorner = xCorner.x;
          int xRCorner = xCorner.y;
          int xCCorner = xCorner.z;

          // max/min x(?, ?, ?, ch) to get y(yD, yR, yC, ch).
          // ? = to be determined
          float minMaxValue = 0.0;
          float minMaxValueFound = 0.0;
          int minMaxPosition = 0;

          for (int wD = 0; wD < `+l+`;
              wD += `+s+`) {
            int xD = xDCorner + wD;

            if (xD < 0 || xD >= `+n.inDepth+`) {
              continue;
            }

            for (int wR = 0; wR < `+h+`;
                wR += `+u+`) {
              int xR = xRCorner + wR;

              if (xR < 0 || xR >= `+n.inHeight+`) {
                continue;
              }

              for (int wC = 0; wC < `+f+`;
                  wC += `+c+`) {
                int xC = xCCorner + wC;

                if (xC < 0 || xC >= `+n.inWidth+`) {
                  continue;
                }

                float value = getX(batch, xD, xR, xC, ch);

                // If a min / max value has already been found, use it. If not,
                // use the current value.
                float currMinMaxValue = mix(
                    value, minMaxValue, minMaxValueFound);
                if (value >= currMinMaxValue) {
                  minMaxValue = value;
                  minMaxValueFound = 1.0;
                  minMaxPosition =
                      wD * `+h+" * "+f+` +
                      wR * `+f+` + wC;;
                }
              }
            }
          }
          setOutput(float(minMaxPosition));
        }
      `;else{var y=t+"("+t+"("+t+"(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])";t==="avg"&&(y="avgValue / count");var b=4*Math.floor(r/4),x=r%4,w=`
      if (`+m+`) {
        avgValue += dot(values, ones);
      } else {
        minMaxValue = max(values, minMaxValue);
      }
    `;this.userCode=`
      const ivec3 strides =
        ivec3(`+a+", "+o+", "+i+`);
      const ivec3 pads = ivec3(`+d+", "+p+", "+v+`);
      const float initializationValue = `+g+`;
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float count = 0.0;

      float getValue(int batch, int xD, int xR, int xC, int ch) {
        if (xC < 0 || xC >= `+n.inWidth+`) {
          return initializationValue;
        }
        count += 1.0;
        return getX(batch, xD, xR, xC, ch);
      }

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int ch = coords.u;

        ivec3 xCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;
        int xDCorner = xCorner.x;
        int xRCorner = xCorner.y;
        int xCCorner = xCorner.z;

        // max/min x(?, ?, ?, d) to get y(yD, yR, yC, ch).
        // ? = to be determined
        vec4 minMaxValue = vec4(`+g+`);
        float avgValue = 0.0;
        count = 0.0;

        for (int wD = 0; wD < `+l+`;
            wD += `+s+`) {
          int xD = xDCorner + wD;

          if (xD < 0 || xD >= `+n.inDepth+`) {
            continue;
          }

          for (int wR = 0; wR < `+h+`;
            wR += `+u+`) {
            int xR = xRCorner + wR;

            if (xR < 0 || xR >= `+n.inHeight+`) {
              continue;
            }

            for (int wC = 0; wC < `+b+`; wC += 4) {
              int xC = xCCorner + wC * `+c+`;

              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + `+c+`, ch),
                getValue(batch, xD, xR, xC + 2 * `+c+`, ch),
                getValue(batch, xD, xR, xC + 3 * `+c+`, ch)
              );

              `+w+`
            }

            int xC = xCCorner + `+b+`;
            if (`+(x===1)+`) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                initializationValue,
                initializationValue,
                initializationValue
              );

              `+w+`
            } else if (`+(x===2)+`) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + `+c+`, ch),
                initializationValue,
                initializationValue
              );

              `+w+`
            } else if (`+(x===3)+`) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + `+c+`, ch),
                getValue(batch, xD, xR, xC + 2 * `+c+`, ch),
                initializationValue
              );

              `+w+`
            }
          }
          setOutput(`+y+`);
        }
      }
    `}},um=function(n,t){this.variableNames=["x"];var e=n.windowSize,r=n.batchSize,a=n.inSize,o=Math.ceil(a/e);this.outputShape=[r,o];var i="0.0",s="";t==="prod"?i="1.0":t==="min"?(i="1.0 / 1e-20",s="min"):t==="max"&&(i="-1.0 / 1e-20",s="max");var u=t+"("+t+"("+t+"(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])";t==="sum"?u="sumValue":t==="prod"?u="prodValue":t==="all"?u="allValue":t==="any"&&(u="anyValue");var c=4*Math.floor(e/4),l=e%4,h=`
      if (`+(t==="sum")+`) {
        sumValue += dot(values, ones);
      } else if (`+(t==="prod")+`) {
        vec2 tmp = vec2(values[0], values[1]) * vec2(values[2], values[3]);
        prodValue *= tmp[0] * tmp[1];
      } else {
        minMaxValue = `+s+`(values, minMaxValue);
      }
    `,f="vec4";t==="all"?(i="1.0",h=`
        bool reducedAllValue = all(values);
        float floatedReducedAllValue = float(reducedAllValue);
        allValue = float(allValue >= 1.0 && floatedReducedAllValue >= 1.0);
      `,f="bvec4"):t==="any"&&(i="0.0",h=`
        bool reducedAnyValue = any(values);
        float floatedReducedAnyValue = float(reducedAnyValue);
        anyValue = float(anyValue >= 1.0 || floatedReducedAnyValue >= 1.0);
      `,f="bvec4");var d="";a%e>0&&(d=`
        if (inIdx < 0 || inIdx >= `+a+`) {
          return initializationValue;
        }
      `),this.userCode=`
      const float initializationValue = `+i+`;
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float getValue(int batch, int inIdx) {
        `+d+`
        return getX(batch, inIdx);
      }

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = outIdx * `+e+`;

        vec4 minMaxValue = vec4(`+i+`);
        float prodValue = 1.0;
        float sumValue = 0.0;
        float allValue = 1.0;
        float anyValue = 0.0;

        for (int i = 0; i < `+c+`; i += 4) {
          int inIdx = inOffset + i;
          `+f+" values = "+f+`(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            getValue(batch, inIdx + 3)
          );

          `+h+`
        }

        int inIdx = inOffset + `+c+`;
        if (`+(l===1)+`) {
          `+f+" values = "+f+`(
            getValue(batch, inIdx),
            initializationValue,
            initializationValue,
            initializationValue
          );

          `+h+`
        } else if (`+(l===2)+`) {
          `+f+" values = "+f+`(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            initializationValue,
            initializationValue
          );

          `+h+`
        } else if (`+(l===3)+`) {
          `+f+" values = "+f+`(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            initializationValue
          );

          `+h+`
        }
        setOutput(`+u+`);
      }
    `},cm=function(n,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=n;for(var e="",r=0;r<4;r++){var a="thisRC = rc;";r%2==1&&(a+="thisRC.z += 1;"),r>1&&(a+="thisRC.y += 1;"),e+=`
        `+a+`
        `+(r>0?"if(thisRC.y < rows && thisRC.z < cols){":"")+`
          int flatIndex = getFlatIndex(thisRC);

          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flatIndex);
          vec2 inputRCInnerDims = vec2(float(inputRC.y),float(inputRC.z));

          result[`+r+`] =
            getChannel(getA(inputRC.x, inputRC.y, inputRC.z), inputRCInnerDims);
        `+(r>0?"}":"")+`
      `}this.userCode=`
      
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      `+Hn(["r","c","d"],t)+`
      return ivec3(r, c, d);
    }
  
      `+Ti(n)+`

      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0.);

        ivec3 thisRC;
        int rows = `+n[1]+`;
        int cols = `+n[2]+`;

        `+e+`

        setOutput(result);
      }
    `},lm=function(n,t,e){this.variableNames=["dy"],this.outputShape=[],this.outputShape=t.shape;var r=t.shape,a=r[1],o=r[2],i=n.shape,s=i[1],u=i[2],c=[e&&s>1?a-1:a,e&&u>1?o-1:o],l=[e&&s>1?s-1:s,e&&u>1?u-1:u],h=c[0]/l[0],f=c[1]/l[1],d=1/h,p=1/f,v=2*Math.ceil(d)+2,m=2*Math.ceil(p)+2;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        int r = coords[1];
        int c = coords[2];

        float accumulator = 0.0;

        const float heightScale = float(`+h+`);
        const float widthScale = float(`+f+`);

        const float invHeightScale = float(`+d+`);
        const float invWidthScale = float(`+p+`);

        const int winHeight = int(`+v+`);
        const int winWidth = int(`+m+`);

        // Compute bounds for where in dy we will look
        float startRLerp = floor(float(r) * invHeightScale);
        int startDyR = int(startRLerp - float(winHeight / 2));

        float startCLerp = floor(float(c) * invWidthScale);
        int startDyC = int(startCLerp - float(winWidth / 2));

        // Loop over dy
        for (int dyROffset = 0; dyROffset < winHeight; dyROffset++) {
          int dyR = dyROffset + startDyR;

          // Guard against the window exceeding the bounds of dy
          if (dyR < 0 || dyR >= `+s+`) {
            continue;
          }

          for (int dyCOffset = 0; dyCOffset < winWidth; dyCOffset++) {
            int dyC = dyCOffset + startDyC;

            // Guard against the window exceeding the bounds of dy
            if (dyC < 0 || dyC >= `+u+`) {
              continue;
            }

            float dxR = float(dyR) * heightScale;
            int topDxRIndex = int(floor(dxR));
            int bottomDxRIndex = int(min(ceil(dxR), `+(a-1)+`.0));
            float dxRLerp = dxR - float(topDxRIndex);
            float inverseDxRLerp = 1.0 - dxRLerp;

            float dxC = float(dyC) * widthScale;
            int leftDxCIndex = int(floor(dxC));
            int rightDxCIndex = int(min(ceil(dxC), `+(o-1)+`.0));
            float dxCLerp = dxC - float(leftDxCIndex);
            float inverseDxCLerp = 1.0 - dxCLerp;

            if (r == topDxRIndex && c == leftDxCIndex) {
              // topLeft
              accumulator +=
                getDy(b, dyR, dyC, d) * inverseDxRLerp * inverseDxCLerp;
            }

            if (r == topDxRIndex && c == rightDxCIndex) {
              // topRight
              accumulator += getDy(b, dyR, dyC, d) * inverseDxRLerp * dxCLerp;
            }

            if (r == bottomDxRIndex && c == leftDxCIndex) {
              // bottomLeft
              accumulator += getDy(b, dyR, dyC, d) * dxRLerp * inverseDxCLerp;
            }

            if (r == bottomDxRIndex && c == rightDxCIndex) {
              // bottomRight
              accumulator += getDy(b, dyR, dyC, d) * dxRLerp * dxCLerp;
            }
          }
        }
        // End loop over dy

        setOutput(accumulator);
      }
    `},hm=function(n,t,e,r){this.variableNames=["A"],this.outputShape=[];var a=n[0],o=n[1],i=n[2],s=n[3];this.outputShape=[a,t,e,s];var u=[r&&t>1?o-1:o,r&&e>1?i-1:i],c=[r&&t>1?t-1:t,r&&e>1?e-1:e];this.userCode=`
      const vec2 effectiveInputOverOutputRatioRC = vec2(
          `+u[0]/c[0]+`,
          `+u[1]/c[1]+`);
      const vec2 inputShapeRC = vec2(`+o+".0, "+i+`.0);

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        ivec2 yRC = coords.yz;

        // Fractional source index.
        vec2 sourceFracIndexRC = vec2(yRC) * effectiveInputOverOutputRatioRC;

        // Compute the four integer indices.
        ivec2 sourceFloorRC = ivec2(sourceFracIndexRC);
        ivec2 sourceCeilRC = ivec2(
          min(inputShapeRC - 1.0, ceil(sourceFracIndexRC)));

        float topLeft = getA(b, sourceFloorRC.x, sourceFloorRC.y, d);
        float bottomLeft = getA(b, sourceCeilRC.x, sourceFloorRC.y, d);
        float topRight = getA(b, sourceFloorRC.x, sourceCeilRC.y, d);
        float bottomRight = getA(b, sourceCeilRC.x, sourceCeilRC.y, d);

        vec2 fracRC = sourceFracIndexRC - vec2(sourceFloorRC);

        float top = topLeft + (topRight - topLeft) * fracRC.y;
        float bottom = bottomLeft + (bottomRight - bottomLeft) * fracRC.y;
        float newValue = top + (bottom - top) * fracRC.x;

        setOutput(newValue);
      }
    `},fm=function(n,t,e,r){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[];var a=n[0],o=n[1],i=n[2],s=n[3];this.outputShape=[a,t,e,s];var u=[r&&t>1?o-1:o,r&&e>1?i-1:i],c=[r&&t>1?t-1:t,r&&e>1?e-1:e];this.userCode=`
      const vec3 effectiveInputOverOutputRatioRC = vec3(
          `+u[0]/c[0]+`,
          `+u[1]/c[1]+`,
          `+u[1]/c[1]+`);
      const vec3 inputShapeRC = vec3(`+o+".0, "+i+`.0,
                                     `+i+`.0);

      float getAValue(int b, int r, int c, int d) {
        return getChannel(getA(b, r, c, d), vec2(c, d));
      }

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        // Calculate values for next column in yRC.z.
        ivec3 yRC = coords.yzz + ivec3(0, 0, 1);

        // Fractional source index.
        vec3 sourceFracIndexRC = vec3(yRC) * effectiveInputOverOutputRatioRC;

        // Compute the four integer indices.
        ivec3 sourceFloorRC = ivec3(sourceFracIndexRC);
        ivec3 sourceCeilRC = ivec3(
          min(inputShapeRC - 1.0, ceil(sourceFracIndexRC)));

        // Should we calculate next column and row elements in 2x2 packed cell.
        bool hasNextCol = d < `+(s-1)+`;
        bool hasNextRow = coords.z < `+(e-1)+`;

        // In parallel, construct four corners for all four components in
        // packed 2x2 cell.
        vec4 topLeft = vec4(
          getAValue(b, sourceFloorRC.x, sourceFloorRC.y, d),
          hasNextCol ? getAValue(b, sourceFloorRC.x, sourceFloorRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceFloorRC.x, sourceFloorRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceFloorRC.x, sourceFloorRC.z, d + 1) : 0.0);

        vec4 bottomLeft = vec4(
          getAValue(b, sourceCeilRC.x, sourceFloorRC.y, d),
          hasNextCol ? getAValue(b, sourceCeilRC.x, sourceFloorRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceCeilRC.x, sourceFloorRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceCeilRC.x, sourceFloorRC.z, d + 1) : 0.0);

        vec4 topRight = vec4(
          getAValue(b, sourceFloorRC.x, sourceCeilRC.y, d),
          hasNextCol ? getAValue(b, sourceFloorRC.x, sourceCeilRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceFloorRC.x, sourceCeilRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceFloorRC.x, sourceCeilRC.z, d + 1) : 0.0);

        vec4 bottomRight = vec4(
          getAValue(b, sourceCeilRC.x, sourceCeilRC.y, d),
          hasNextCol ? getAValue(b, sourceCeilRC.x, sourceCeilRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceCeilRC.x, sourceCeilRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceCeilRC.x, sourceCeilRC.z, d + 1) : 0.0);

        vec3 fracRC = sourceFracIndexRC - vec3(sourceFloorRC);

        vec4 top = mix(topLeft, topRight, fracRC.yyzz);
        vec4 bottom = mix(bottomLeft, bottomRight, fracRC.yyzz);
        vec4 newValue = mix(top, bottom, fracRC.x);

        setOutput(newValue);
      }
    `},dm=function(n,t,e){this.variableNames=["dy"],this.outputShape=[],this.outputShape=t.shape;var r=t.shape,a=r[1],o=r[2],i=n.shape,s=i[1],u=i[2],c=[e&&s>1?a-1:a,e&&u>1?o-1:o],l=[e&&s>1?s-1:s,e&&u>1?u-1:u],h=c[0]/l[0],f=c[1]/l[1],d=1/h,p=1/f,v=2*Math.ceil(d)+2,m=2*Math.ceil(p)+2;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        int r = coords[1];
        int c = coords[2];

        float accumulator = 0.0;

        const float heightScale = float(`+h+`);
        const float widthScale = float(`+f+`);

        const float invHeightScale = float(`+d+`);
        const float invWidthScale = float(`+p+`);

        const int winHeight = int(`+v+`);
        const int winWidth = int(`+m+`);

        // Compute bounds for where in dy we will look
        float startRLerp = floor(float(r) * invHeightScale);
        int startDyR = int(floor(startRLerp - float(winHeight / 2)));

        float startCLerp = floor(float(c) * invWidthScale);
        int startDyC = int(floor(startCLerp - float(winWidth / 2)));

        // Loop over dy
        for (int dyROffset = 0; dyROffset < winHeight; dyROffset++) {
          int dyR = dyROffset + startDyR;

          // Guard against the window exceeding the bounds of dy
          if (dyR < 0 || dyR >= `+s+`) {
            continue;
          }

          for (int dyCOffset = 0; dyCOffset < winWidth; dyCOffset++) {
            int dyC = dyCOffset + startDyC;

            // Guard against the window exceeding the bounds of dy
            if (dyC < 0 || dyC >= `+u+`) {
              continue;
            }

            float sourceFracRow =
              float(`+c[0]+`) *
                (float(dyR) / float(`+l[0]+`));

            float sourceFracCol =
                float(`+c[1]+`) *
                  (float(dyC) / float(`+l[1]+`));

            int sourceNearestRow = int(min(
                float(int(`+a+`) - 1),
                `+e+` ? float(round(sourceFracRow)) :
                                  float(floor(sourceFracRow))));

            int sourceNearestCol = int(min(
                float(int(`+o+`) - 1),
                `+e+` ? float(round(sourceFracCol)) :
                                  float(floor(sourceFracCol))));

            if (r == sourceNearestRow && c == sourceNearestCol) {
              accumulator += getDy(b, dyR, dyC, d);
            }
          }
        }
        // End loop over dy

        setOutput(accumulator);
      }
    `},pm=function(n,t,e,r){this.variableNames=["A"],this.outputShape=[];var a=n[0],o=n[1],i=n[2],s=n[3];this.outputShape=[a,t,e,s];var u=[r&&t>1?o-1:o,r&&e>1?i-1:i],c=[r&&t>1?t-1:t,r&&e>1?e-1:e],l=r?"0.5":"0.0";this.userCode=`
      const vec2 effectiveInputOverOutputRatioRC = vec2(
          `+u[0]/c[0]+`,
          `+u[1]/c[1]+`);
      const vec2 inputShapeRC = vec2(`+o+".0, "+i+`.0);

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        ivec2 yRC = coords.yz;

        // Fractional source index.
        vec2 sourceFracIndexRC = vec2(yRC) * effectiveInputOverOutputRatioRC;

        // Compute the coordinators of nearest neighbor point.
        ivec2 sourceNearestRC = ivec2(
          min(inputShapeRC - 1.0, floor(sourceFracIndexRC + `+l+`)));

        float newValue = getA(b, sourceNearestRC.x, sourceNearestRC.y, d);

        setOutput(newValue);
      }
    `},vm=function(n,t){this.variableNames=["x"];var e=n.length;if(e>4)throw new Error("WebGL backend: Reverse of rank-"+e+" tensor is not yet supported");if(this.outputShape=n,e!==1){var r=n.map((function(o,i){return(function(s){return t.indexOf(s)!==-1&&n[s]!==1?n[s]+" - coords["+s+"] - 1":"coords["+s+"]"})(i)})).join(","),a=Me(e);this.userCode=`
      void main() {
        `+a+` coords = getOutputCoords();
        setOutput(getX(`+r+`));
      }
    `}else this.userCode=`
        void main() {
          int coord = getOutputCoords();
          setOutput(getX(`+n[0]+` - coord - 1));
        }
      `},mm=function(n,t){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0;var e=n.length;if(e>4)throw new Error("WebGL backend: Reverse of rank-"+e+" tensor is not yet supported");this.outputShape=n;var r=gt("rc",e),a=r[e-1]+" + 1 < "+this.outputShape[e-1],o=r[e-2]+" + 1 < "+this.outputShape[e-2],i=Me(e);function s(u){var c=n.map((function(l,h){return(function(f,d){return t.indexOf(f)!==-1&&n[f]!==1?n[f]+" - "+d[f]+" - 1":""+d[f]})(h,u)}));return"getChannel(getX("+c.join(",")+"), vec2("+c.slice(-2).join(",")+"))"}this.userCode=e===1?`
        void main(){
          int rc = getOutputCoords();
          vec4 result = vec4(0.);
          result.r = getChannel(getX(`+n[0]+` - rc - 1),
            `+n[0]+` - rc - 1);
          if(`+a+`){
              result.g = getChannel(getX(`+n[0]+` - (rc  + 1) - 1),
                `+n[0]+` - (rc  + 1) - 1);
          }
          setOutput(result);
        }
      `:`
        void main() {
          `+i+` rc = getOutputCoords();
          vec4 result = vec4(0.);
          result.r = `+(function(u){return s(u)})(r.slice())+`;
          if(`+a+`){
            result.g = `+(function(u){return u[e-1]="("+u[e-1]+" + 1)",s(u)})(r.slice())+`;
          }
          if(`+o+`) {
            result.b = `+(function(u){return u[e-2]="("+u[e-2]+" + 1)",s(u)})(r.slice())+`;
            if(`+a+`) {
              result.a = `+(function(u){return u[e-1]="("+u[e-1]+" + 1)",u[e-2]="("+u[e-2]+" + 1)",s(u)})(r.slice())+`;
            }
          }
          setOutput(result);
        }
    `},Ys=function(n,t,e,r,a,o,i){this.variableNames=["updates","indices","defaultValue"],this.outputShape=o;var s=Me(a.length),u=Me(o.length),c="";e===1?c="i":e===2&&(c="i, j");var l="getIndices("+c+")",h="";r===1?h="i":r===2&&(h="i, coords[1]");var f="getUpdates("+h+")",d=t>1?"strides[j]":"strides";this.userCode=`
        `+s+" strides = "+s+"("+a+`);

        void main() {
          `+u+` coords = getOutputCoords();
          float sum = 0.0;
          bool found = false;
          for (int i = 0; i < `+n+`; i++) {
            int flattenedIndex = 0;
            for (int j = 0; j < `+t+`; j++) {
              int index = round(`+l+`);
              flattenedIndex += index * `+d+`;
            }
            if (flattenedIndex == coords[0]) {
              sum += `+f+`;
              found = true;
            }
          }
          setOutput(mix(getDefaultValue(), sum, float(found)));
        }
      `},gm=function(n,t){this.variableNames=["x","segmentIds"];var e=n.windowSize,r=n.batchSize,a=n.inSize,o=n.numSegments,i=o*Math.ceil(a/e);this.outputShape=[r,i];var s=4*Math.floor(e/4),u=e%4,c=`
        sumValue += dot(values, segFilter);
    `,l="";a%e>0&&(l=`
        if (inIdx < 0 || inIdx >= `+a+`) {
          return initializationValue;
        }
      `);var h="";a%e>0&&(h=`
        if (inIdx < 0 || inIdx >= `+a+`) {
          return -1.0;
        }
      `),this.userCode=`
      const float initializationValue = 0.0;

      float getValue(int batch, int inIdx) {
        `+l+`
        return getX(batch, inIdx);
      }

      float getSegmentIdAtIndex(int inIdx) {
        `+h+`
        return getSegmentIds(inIdx);
      }

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = int(floor(float(outIdx) / float(
          `+o+")) * float("+e+`));
        int currentSeg = int(mod(float(outIdx), float(`+o+`)));

        float sumValue = 0.0;

        for (int i = 0; i < `+s+`; i += 4) {
          int inIdx = inOffset + i;
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            getValue(batch, inIdx + 3)
          );

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 2)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 3)) == currentSeg ? 1 : 0
          );

          `+c+`
        }

        int inIdx = inOffset + `+s+`;
        if (`+(u===1)+`) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            initializationValue,
            initializationValue,
            initializationValue
          );

          int inIdxSeg = int(getSegmentIdAtIndex(inIdx));

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            0,
            0,
            0
          );

          `+c+`
        } else if (`+(u===2)+`) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            initializationValue,
            initializationValue
          );

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,
              0,
              0
          );

          `+c+`
        } else if (`+(u===3)+`) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            initializationValue
          );

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 2)) == currentSeg ? 1 : 0,
            0
          );

          `+c+`
        }
        setOutput(sumValue);
      }
    `},ym=function(n,t,e){var r,a;if(this.variableNames=["c","a","b"],this.outputShape=t,e>4)throw Error("Where for rank "+e+" is not yet supported");if(e===1)a="resRC",r="resRC";else{for(var o=["resRC.x","resRC.y","resRC.z","resRC.w"],i=[],s=[],u=0;u<t.length;u++)s.push(""+o[u]),u<n&&i.push(""+o[u]);r=i.join(),a=s.join()}var c=Me(e);this.userCode=`
      void main() {
        `+c+` resRC = getOutputCoords();
        float cVal = getC(`+r+`);
        if (cVal >= 1.0) {
          setOutput(getA(`+a+`));
        } else {
          setOutput(getB(`+a+`));
        }
      }
    `},xm=(function(){function n(t){this.variableNames=["source"],this.outputShape=t,this.rank=t.length;var e,r=Me(this.rank),a="uniform int start["+this.rank+"];",o=(function(i){if(i===1)return"sourceLoc";if(i<=6)return Do.slice(0,i).map((function(s){return"sourceLoc."+s})).join(",");throw Error("Slicing for rank "+i+" is not yet supported")})(this.rank);e=`
        `+r+` sourceLoc;
        `+r+` coords = getOutputCoords();
        `+t.map((function(i,s){return"sourceLoc."+Do[s]+" = start["+s+"] + coords."+Do[s]+";"})).join(`
`)+`
      `,this.userCode=`
      `+a+`
      void main() {
        `+e+`
        setOutput(getSource(`+o+`));
      }
    `}return n.prototype.getCustomSetupFunc=function(t){var e=this;if(t.length!==this.rank)throw Error("The rank ("+this.rank+") of the program must match the length of start ("+t.length+")");return function(r,a){e.startLoc==null&&(e.startLoc=r.getUniformLocationNoThrow(a,"start"),e.startLoc==null)||r.gl.uniform1iv(e.startLoc,t)}},n})(),Do=["x","y","z","w","u","v"],bm=(function(){function n(t){this.variableNames=["source"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t,this.rank=t.length;var e=Me(this.rank),r=gt("coords",this.rank),a=gt("sourceLoc",this.rank),o=this.rank===1?"sourceLoc":"vec2("+a.slice(-2).join()+")",i="getChannel(getSource("+a.join()+"), "+o+")",s=`
      result.x = `+i+`;
      if (++`+r[this.rank-1]+" < "+t[this.rank-1]+`) {
        ++`+a[this.rank-1]+`;
        result.y = `+i+`;
        --`+a[this.rank-1]+`;
      }
    `,u=this.rank===1?"":`
      --`+r[this.rank-1]+`;
      if (++`+r[this.rank-2]+" < "+t[this.rank-2]+`) {
        ++`+a[this.rank-2]+`;
        result.z = `+i+`;
        if (++`+r[this.rank-1]+" < "+t[this.rank-1]+`) {
          ++`+a[this.rank-1]+`;
          result.w = `+i+`;
        }
      }
    `,c=this.rank<=4?`sourceLoc = coords +
            `+e+"("+t.map((function(l,h){return"start["+h+"]"})).join()+");":t.map((function(l,h){return a[h]+" = "+r[h]+" + start["+h+"];"})).join(`
`);this.userCode=`
      uniform int start[`+this.rank+`];
      void main() {
        `+e+` coords = getOutputCoords();
        `+e+` sourceLoc;
        `+c+`
        vec4 result = vec4(0.);
        `+s+`
        `+u+`
        setOutput(result);
      }
    `}return n.prototype.getCustomSetupFunc=function(t){var e=this;if(t.length!==this.rank)throw Error("The rank ("+this.rank+") of the program must match the length of start ("+t.length+")");return function(r,a){e.startLoc==null&&(e.startLoc=r.getUniformLocationNoThrow(a,"start"),e.startLoc==null)||r.gl.uniform1iv(e.startLoc,t)}},n})(),wm=function(n,t,e){this.variableNames=["x"],this.outputShape=e;var r=e.length,a=Me(e.length),o=Me(e.length),i="";if(r===1)i="coords * strides + begin";else{var s=0;i=e.map((function(u,c){return s++,e.length===1?"coords * strides["+c+"] + begin["+c+"]":"coords["+(s-1)+"] * strides["+c+"] + begin["+c+"]"})).join(",")}this.userCode=`
      `+a+" begin = "+a+"("+n+`);
      `+a+" strides = "+a+"("+t+`);

      void main() {
        `+o+` coords = getOutputCoords();
        setOutput(getX(`+i+`));
      }
    `},Cm=(function(){function n(t){this.gpgpu=t,this.numUsedTextures=0,this.numFreeTextures=0,this.freeTextures={},this.logEnabled=!1,this.usedTextures={}}return n.prototype.acquireTexture=function(t,e,r){var a,o=$s(e,r),i=Js(t,o,r);if(i in this.freeTextures||(this.freeTextures[i]=[]),i in this.usedTextures||(this.usedTextures[i]=[]),this.freeTextures[i].length>0){this.numFreeTextures--,this.numUsedTextures++,this.log();var s=this.freeTextures[i].shift();return this.usedTextures[i].push(s),s}return this.numUsedTextures++,this.log(),o===_t.PACKED_2X2_FLOAT32?a=this.gpgpu.createPackedMatrixTexture(t[0],t[1]):o===_t.PACKED_2X2_FLOAT16?a=this.gpgpu.createFloat16PackedMatrixTexture(t[0],t[1]):o===_t.UNPACKED_FLOAT32?a=this.gpgpu.createFloat32MatrixTexture(t[0],t[1]):o===_t.UNPACKED_FLOAT16?a=this.gpgpu.createFloat16MatrixTexture(t[0],t[1]):o===_t.PACKED_4X1_UNSIGNED_BYTE&&(a=this.gpgpu.createUnsignedBytesMatrixTexture(t[0],t[1])),this.usedTextures[i].push(a),a},n.prototype.releaseTexture=function(t,e,r,a){if(this.freeTextures!=null){var o=Js(e,$s(r,a),a);o in this.freeTextures||(this.freeTextures[o]=[]),this.freeTextures[o].push(t),this.numFreeTextures++,this.numUsedTextures--;var i=this.usedTextures[o],s=i.indexOf(t);if(s<0)throw new Error("Cannot release a texture that was never provided by this texture manager");i.splice(s,1),this.log()}},n.prototype.log=function(){if(this.logEnabled){var t=this.numFreeTextures+this.numUsedTextures;console.log("Free/Used",this.numFreeTextures+" / "+this.numUsedTextures,"("+t+")")}},n.prototype.getNumUsedTextures=function(){return this.numUsedTextures},n.prototype.getNumFreeTextures=function(){return this.numFreeTextures},n.prototype.dispose=function(){var t=this;if(this.freeTextures!=null){for(var e in this.freeTextures)this.freeTextures[e].forEach((function(r){t.gpgpu.deleteMatrixTexture(r)}));for(var e in this.usedTextures)this.usedTextures[e].forEach((function(a){t.gpgpu.deleteMatrixTexture(a)}));this.freeTextures=null,this.usedTextures=null,this.numUsedTextures=0,this.numFreeTextures=0}},n})();function $s(n,t){if(n===St.UPLOAD)return _t.PACKED_2X2_FLOAT32;if(n===St.RENDER||n==null)return(function(e){return W().getBool("WEBGL_RENDER_FLOAT32_ENABLED")?e?_t.PACKED_2X2_FLOAT32:_t.UNPACKED_FLOAT32:e?_t.PACKED_2X2_FLOAT16:_t.UNPACKED_FLOAT16})(t);if(n===St.DOWNLOAD||n===St.PIXELS)return _t.PACKED_4X1_UNSIGNED_BYTE;throw new Error("Unknown logical texture type "+n)}function Js(n,t,e){return n[0]+"_"+n[1]+"_"+t+"_"+e}var Em=function(n,t){this.variableNames=["A"];for(var e=new Array(n.length),r=0;r<e.length;r++)e[r]=n[r]*t[r];this.outputShape=e,this.rank=e.length;var a=Me(this.rank),o=(function(i){var s=i.length;if(s>5)throw Error("Tile for rank "+s+" is not yet supported");if(s===1)return"imod(resRC, "+i[0]+")";for(var u=["resRC.x","resRC.y","resRC.z","resRC.w","resRC.u"],c=[],l=0;l<i.length;l++)c.push("imod("+u[l]+", "+i[l]+")");return c.join()})(n);this.userCode=`
      void main() {
        `+a+` resRC = getOutputCoords();
        setOutput(getA(`+o+`));
      }
    `},_m=function(n,t){this.variableNames=["A"];for(var e=new Array(n.length),r=0;r<e.length;r++)e[r]=n[t[r]];this.outputShape=e,this.rank=e.length;var a=Me(this.rank),o=(function(i){var s=i.length;if(s>6)throw Error("Transpose for rank "+s+" is not yet supported");for(var u=["resRC.x","resRC.y","resRC.z","resRC.w","resRC.u","resRC.v"],c=new Array(s),l=0;l<i.length;l++)c[i[l]]=u[l];return c.join()})(t);this.userCode=`
    void main() {
      `+a+` resRC = getOutputCoords();
      setOutput(getA(`+o+`));
    }
    `},Sm=function(n,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0;for(var e=new Array(n.length),r=0;r<e.length;r++)e[r]=n[t[r]];if(this.outputShape=e,this.rank=e.length,this.rank>6)throw Error("Packed transpose for rank "+this.rank+" is not yet supported.");var a=Me(this.rank),o=Ic("rc",this.rank),i=new Array(this.rank);for(r=0;r<t.length;r++)i[t[r]]=o[r];var s="vec2("+i.slice(-2).join()+")",u="++"+o[this.rank-1]+" < "+e[this.rank-1],c="getChannel(getA("+i.join()+"), "+s+")";this.userCode=`
    void main() {
      `+a+` rc = getOutputCoords();
      vec4 result = vec4(0.);
      result[0] = `+c+`;
      if(`+u+`) {
        result[1] = `+c+`;
      }
      --`+o[this.rank-1]+`;
      if(++`+o[this.rank-2]+" < "+e[this.rank-2]+`) {
        result[2] = `+c+`;
        if(`+u+`) {
          result[3] = `+c+`;
        }
      }
      setOutput(result);
    }
    `},Ai=1.7580993408473768,Di=1.0507009873554805,ye=function(n,t){this.variableNames=["A"],this.outputShape=n,this.userCode=`
      float unaryOperation(float x) {
        `+t+`
      }

      void main() {
        float x = getAAtOutCoords();
        float y = unaryOperation(x);

        setOutput(y);
      }
    `},jt="if (isnan(x)) return x;",Rm="return x;",Qs="return abs(x);",Mc=jt+`
  return (x < 0.0) ? 0.0 : x;
`,Nc=jt+`
  return (x < 0.0) ? 0.0 : min(6.0, x);
`,Fc="return (x >= 0.0) ? x : (exp(x) - 1.0);",Im=`
  // Stable and Attracting Fixed Point (0, 1) for Normalized Weights.
  // see: https://arxiv.org/abs/1706.02515
  float scaleAlpha = `+Ai+`;
  float scale = `+Di+`;
  return (x >= 0.0) ? scale * x : scaleAlpha * (exp(x) - 1.0);
`,Zs="return -x;",eu="return ceil(x);",tu="return floor(x);",nu="return exp(x);",ru="return exp(x) - 1.0;",km=jt+`
  return sin(x);
`,Tm=jt+`
  return cos(x);
`,Am=jt+`
  if (abs(x) > 1.) {
    return NAN;
  }
  return asin(x);
`,Dm=jt+`
  if (abs(x) > 1.) {
    return NAN;
  }
  return acos(x);
`,Mm=jt+`
  return atan(x);
`,Nm=jt+"return log(x + sqrt(x * x + 1.0));",Fm=jt+`
  if (x < 1.0) return NAN;
  return log(x + sqrt(x * x - 1.0));`,Pm=jt+`
  if ((x < -1.0) || (x > 1.0)) return NAN;
  return (log(1.0 + x) - log(1.0 - x)) / 2.0;`,ha="return x;",Bm="return x;",Pc=`
  vec4 result = x * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,Bc=`
  vec4 result = min(x, vec4(6.)) * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,Oc=`
  vec4 result;

  result.r = (x.r >= 0.0) ? x.r : (exp(x.r) - 1.0);
  result.g = (x.g >= 0.0) ? x.g : (exp(x.g) - 1.0);
  result.b = (x.b >= 0.0) ? x.b : (exp(x.b) - 1.0);
  result.a = (x.a >= 0.0) ? x.a : (exp(x.a) - 1.0);

  return result;
`,Dr=function(n,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=n,this.userCode=`
      vec4 unaryOperation(vec4 x) {
        `+t+`
      }

      void main() {
        vec4 x = getAAtOutCoords();
        vec4 y = unaryOperation(x);

        setOutput(y);
      }
    `},Om=function(n){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!1,this.outputShape=n;var t=n.length,e=gt("rc",t),r=Me(t),a=(function(s,u){if(s===1)return"rc";for(var c="",l=0;l<s;l++)c+=u[l],l<s-1&&(c+=",");return c})(t,e),o=e.slice(-2),i=t<=1?"rc":"vec2("+o.join(",")+")";this.userCode=`
      void main() {
        `+r+` rc = getOutputCoords();
        vec4 packedInput = getA(`+a+`);

        setOutput(getChannel(packedInput, `+i+`));
      }
    `},fa={};function da(n,t){if(t===void 0&&(t=!1),n==="linear")return t?Bm:Rm;if(n==="relu")return t?Pc:Mc;if(n==="elu")return t?Oc:Fc;if(n==="relu6")return t?Bc:Nc;if(n==="prelu")return t?Dc:Ac;throw new Error("Activation "+n+" has not been implemented for the WebGL backend.")}var Lm=600,Um=(function(n){function t(e){var r,a=n.call(this)||this;if(a.pendingRead=new WeakMap,a.pendingDisposal=new WeakSet,a.dataRefCount=new WeakMap,a.numBytesInGPU=0,a.uploadWaitMs=0,a.downloadWaitMs=0,a.warnedAboutMemory=!1,a.pendingDeletes=0,a.disposed=!1,!W().getBool("HAS_WEBGL"))throw new Error("WebGL is not supported on this device");if(e==null){var o=on(W().getNumber("WEBGL_VERSION"));a.binaryCache=((r=W().getNumber("WEBGL_VERSION"))in fa||(fa[r]={}),fa[r]),a.gpgpu=new $v(o),a.canvas=o.canvas,a.gpgpuCreatedLocally=!0}else a.gpgpu=e,a.binaryCache={},a.gpgpuCreatedLocally=!1,a.canvas=e.gl.canvas;return a.textureManager=new Cm(a.gpgpu),a.numMBBeforeWarning=W().global.screen==null?1024:W().global.screen.height*W().global.screen.width*window.devicePixelRatio*Lm/1024/1024,a.texData=new yc(a,M),a}return Ht(t,n),t.prototype.numDataIds=function(){return this.texData.numDataIds()+(this.cpuBackend?this.cpuBackend.numDataIds():0)-this.pendingDeletes},t.prototype.write=function(e,r,a){if(W().getBool("DEBUG")&&this.checkNumericalProblems(e),a==="complex64"&&e!=null)throw new Error("Cannot write to a complex64 dtype. Please use tf.complex(real, imag).");var o={};return this.texData.set(o,{shape:r,dtype:a,values:e,usage:St.UPLOAD}),o},t.prototype.move=function(e,r,a,o){if(W().getBool("DEBUG")&&this.checkNumericalProblems(r),o==="complex64")throw new Error("Cannot write to a complex64 dtype. Please use tf.complex(real, imag).");this.texData.set(e,{shape:a,dtype:o,values:r,usage:St.UPLOAD})},t.prototype.readSync=function(e){var r=this.texData.get(e),a=r.values,o=r.dtype,i=r.complexTensors,s=r.slice,u=r.shape,c=r.isPacked;if(s!=null){var l=void 0;l=c?new Dr(u,ha):new ye(u,ha);var h=this.runWebGLProgram(l,[{dataId:e,shape:u,dtype:o}],o),f=this.readSync(h.dataId);return this.disposeData(h.dataId),f}if(a!=null)return this.convertAndCacheOnCPU(e);if(o==="string")return a;var d,p,v=this.activeTimers!=null;return v&&(d=$t()),o==="complex64"?p=ai(i.real.dataSync(),i.imag.dataSync()):p=this.getValuesFromTexture(e),v&&(this.downloadWaitMs+=$t()-d),this.convertAndCacheOnCPU(e,p)},t.prototype.read=function(e){return $(this,void 0,void 0,(function(){var r,a,o,i,s,u,c,l,h,f,d,p,v,m,g,y,b,x,w,C,k,S;return J(this,(function(_){switch(_.label){case 0:if(this.pendingRead.has(e))return r=this.pendingRead.get(e),[2,new Promise((function(R){return r.push(R)}))];if(a=this.texData.get(e),o=a.values,i=a.shape,s=a.slice,u=a.dtype,c=a.complexTensors,l=a.isPacked,s!=null)return h=void 0,h=l?new Dr(i,ha):new ye(i,ha),f=this.runWebGLProgram(h,[{dataId:e,shape:i,dtype:u}],u),d=this.read(f.dataId),this.disposeData(f.dataId),[2,d];if(o!=null)return[2,this.convertAndCacheOnCPU(e)];if(!W().getBool("WEBGL_DOWNLOAD_FLOAT_ENABLED")&&W().getNumber("WEBGL_VERSION")===2)throw new Error("tensor.data() with WEBGL_DOWNLOAD_FLOAT_ENABLED=false and WEBGL_VERSION=2 not yet supported.");return p=null,u!=="complex64"&&W().get("WEBGL_BUFFER_SUPPORTED")&&(v=this.decode(e),m=this.texData.get(v.dataId),p=(S=this.gpgpu).createBufferFromTexture.apply(S,[m.texture].concat(Nr(i)))),this.pendingRead.set(e,[]),u==="complex64"?[3,2]:[4,this.gpgpu.createAndWaitForFence()];case 1:_.sent(),_.label=2;case 2:return u!=="complex64"?[3,4]:[4,Promise.all([c.real.data(),c.imag.data()])];case 3:return y=_.sent(),b=y[0],x=y[1],g=ai(b,x),[3,5];case 4:p==null?g=this.getValuesFromTexture(e):(w=Z(i),g=this.gpgpu.downloadFloat32MatrixFromBuffer(p,w)),_.label=5;case 5:return v!=null&&this.disposeData(v.dataId),C=this.convertAndCacheOnCPU(e,g),k=this.pendingRead.get(e),this.pendingRead.delete(e),k.forEach((function(R){return R(C)})),this.pendingDisposal.has(e)&&(this.pendingDisposal.delete(e),this.disposeData(e),this.pendingDeletes--),[2,C]}}))}))},t.prototype.checkNumericalProblems=function(e){if(e!=null)for(var r=0;r<e.length;r++){var a=e[r];if(!Id(a))throw W().getBool("WEBGL_RENDER_FLOAT32_CAPABLE")?Error("The value "+a+" cannot be represented with your current settings. Consider enabling float32 rendering: 'tf.env().set('WEBGL_RENDER_FLOAT32_ENABLED', true);'"):Error("The value "+a+" cannot be represented on this device.")}},t.prototype.getValuesFromTexture=function(e){var r,a=this.texData.get(e),o=a.shape,i=a.dtype,s=a.isPacked,u=Z(o);if(W().getBool("WEBGL_DOWNLOAD_FLOAT_ENABLED")){var c=this.decode(e),l=this.texData.get(c.dataId),h=(r=this.gpgpu).downloadMatrixFromPackedTexture.apply(r,[l.texture].concat(Nr(o))).subarray(0,u);return this.disposeData(c.dataId),h}var f=W().getBool("WEBGL_PACK")&&s===!0,d=f?_o(o):o,p=f?new Rv(d):new Sv(d),v=this.runWebGLProgram(p,[{shape:d,dtype:i,dataId:e}],"float32"),m=this.texData.get(v.dataId),g=this.gpgpu.downloadByteEncodedFloatMatrixFromOutputTexture(m.texture,m.texShape[0],m.texShape[1]).subarray(0,u);return this.disposeData(v.dataId),g},t.prototype.time=function(e){return $(this,void 0,void 0,(function(){var r,a,o,i,s,u,c;return J(this,(function(l){switch(l.label){case 0:return r=this.activeTimers,a=[],o=!1,this.programTimersStack==null?(this.programTimersStack=a,o=!0):this.activeTimers.push(a),this.activeTimers=a,e(),i=br(this.activeTimers.map((function(h){return h.query}))).filter((function(h){return h!=null})),s=br(this.activeTimers.map((function(h){return h.name}))).filter((function(h){return h!=null})),this.activeTimers=r,o&&(this.programTimersStack=null),u={uploadWaitMs:this.uploadWaitMs,downloadWaitMs:this.downloadWaitMs,kernelMs:null,wallMs:null},W().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0?[4,Promise.all(i)]:[3,2];case 1:return c=l.sent(),u.kernelMs=sd(c),u.getExtraProfileInfo=function(){return c.map((function(h,f){return{name:s[f],ms:h}})).map((function(h){return h.name+": "+h.ms})).join(", ")},[3,3];case 2:u.kernelMs={error:"WebGL query timers are not supported in this environment."},l.label=3;case 3:return this.uploadWaitMs=0,this.downloadWaitMs=0,[2,u]}}))}))},t.prototype.memory=function(){return{unreliable:!1,numBytesInGPU:this.numBytesInGPU}},t.prototype.startTimer=function(){return W().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0?this.gpgpu.beginQuery():{startMs:$t(),endMs:null}},t.prototype.endTimer=function(e){return W().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0?(this.gpgpu.endQuery(),e):(e.endMs=$t(),e)},t.prototype.getQueryTime=function(e){return $(this,void 0,void 0,(function(){var r;return J(this,(function(a){return W().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0?[2,this.gpgpu.waitForQueryAndGetTime(e)]:[2,(r=e).endMs-r.startMs]}))}))},t.prototype.disposeData=function(e){if(!this.pendingDisposal.has(e)){if(this.pendingRead.has(e))return this.pendingDisposal.add(e),void this.pendingDeletes++;if(this.texData.has(e)){this.releaseGPUData(e);var r=this.texData.get(e).complexTensors;r!=null&&(r.real.dispose(),r.imag.dispose()),this.texData.delete(e)}}},t.prototype.releaseGPUData=function(e){var r=this.texData.get(e),a=r.texture,o=r.dtype,i=r.texShape,s=r.usage,u=r.isPacked,c=r.slice,l=c&&c.origDataId||e,h=this.dataRefCount.get(l);h>1?this.dataRefCount.set(l,h-1):(this.dataRefCount.delete(l),a!=null&&(this.numBytesInGPU-=this.computeBytes(i,o),this.textureManager.releaseTexture(a,i,s,u)));var f=this.texData.get(e);f.texture=null,f.texShape=null,f.isPacked=!1,f.slice=null},t.prototype.getTexture=function(e){return this.uploadToGPU(e),this.texData.get(e).texture},t.prototype.getDataInfo=function(e){return this.texData.get(e)},t.prototype.getCPUBackend=function(){return W().getBool("WEBGL_CPU_FORWARD")?(this.cpuBackend==null&&(this.cpuBackend=M.findBackend("cpu")),this.cpuBackend):null},t.prototype.shouldExecuteOnCPU=function(e,r){var a=this;return r===void 0&&(r=128),this.getCPUBackend()!=null&&e.every((function(o){return a.texData.get(o.dataId).texture==null&&o.size<r}))},t.prototype.getGPGPUContext=function(){return this.gpgpu},t.prototype.complex=function(e,r){var a=this.makeOutput(e.shape,"complex64");return this.texData.get(a.dataId).complexTensors={real:M.keep(e.clone()),imag:M.keep(r.clone())},a},t.prototype.real=function(e){return this.texData.get(e.dataId).complexTensors.real.clone()},t.prototype.imag=function(e){return this.texData.get(e.dataId).complexTensors.imag.clone()},t.prototype.slice=function(e,r,a){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.slice(e,r,a);if(Z(a)===0)return rt([],a,e.dtype);var o=this.texData.get(e.dataId).isPacked,i=mc(e.shape,r,a);if(o||!i){var s=W().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new bm(a):new xm(a),u=s.getCustomSetupFunc(r);return this.compileAndRun(s,[e],null,u)}return this.uploadToGPU(e.dataId),this.shallowSlice(e,r,a)},t.prototype.shallowSlice=function(e,r,a){var o=this.texData.get(e.dataId),i=this.makeOutput(a,e.dtype),s=this.texData.get(i.dataId);Object.assign(s,o),s.shape=a,s.dtype=e.dtype;var u=gc(r,e.strides);o.slice&&(u+=o.slice.flatOffset),s.slice={flatOffset:u,origDataId:o.slice&&o.slice.origDataId||e.dataId};var c=this.dataRefCount.get(s.slice.origDataId)||1;return this.dataRefCount.set(s.slice.origDataId,c+1),i},t.prototype.stridedSlice=function(e,r,a,o){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.stridedSlice(e,r,a,o);var i=_i(r,a,o);if(i.some((function(u){return u===0})))return rt([],i);var s=new wm(r,o,i);return this.compileAndRun(s,[e])},t.prototype.reverse=function(e,r){var a=W().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new mm(e.shape,r):new vm(e.shape,r);return this.compileAndRun(a,[e])},t.prototype.concat=function(e,r){if(e[0].dtype==="complex64"){var a=e.map((function(d){return Pt(d)})),o=e.map((function(d){return Qt(d)}));return tt(this.concat(a,r),this.concat(o,r))}if(this.shouldExecuteOnCPU(e))return this.cpuBackend.concat(e,r);if(e.length===1)return e[0];if(e.length>W().getNumber("WEBGL_MAX_TEXTURES_IN_SHADER")){var i=Math.floor(e.length/2),s=this.concat(e.slice(0,i),r),u=this.concat(e.slice(i),r);return this.concat([s,u],r)}if(W().getBool("WEBGL_PACK_ARRAY_OPERATIONS")&&e[0].rank>1){var c=new hv(e.map((function(d){return d.shape})),r);return this.compileAndRun(c,e)}var l=Cr(e.map((function(d){return d.shape})),r),h=e.map((function(d){return d.as2D(-1,Z(d.shape.slice(r)))})),f=new lv(h.map((function(d){return d.shape})));return this.compileAndRun(f,h).reshape(l)},t.prototype.neg=function(e){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.neg(e);if(W().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,Zs,e.dtype);var r=new ye(e.shape,Zs);return this.compileAndRun(r,[e])},t.prototype.batchMatMul=function(e,r,a,o){var i=a?e.shape[2]:e.shape[1],s=o?r.shape[1]:r.shape[2],u=a?e.shape[1]:e.shape[2],c=e.shape[0];if((i===1||s===1)&&u>1e3){a&&(e=e.transpose([0,2,1])),o&&(r=r.transpose([0,2,1]));var l=s===1?e:e.as3D(c,u,1),h=s===1?2:1,f=s===1?r.as3D(c,1,u):r;return this.multiply(l,f).sum(h,!0)}var d=nt(e.dtype,r.dtype),p=new ko(e.shape,[c,i,s],a,o);return this.compileAndRun(p,[e,r],d)},t.prototype.fusedBatchMatMul=function(e){var r=e.a,a=e.b,o=e.transposeA,i=e.transposeB,s=e.bias,u=e.activation,c=e.preluActivationWeights,l=o?r.shape[2]:r.shape[1],h=i?a.shape[1]:a.shape[2],f=r.shape[0],d=nt(r.dtype,a.dtype),p=s!=null,v=c!=null,m=u?da(u,!0):null,g=new ko(r.shape,[f,l,h],o,i,p,m,v),y=[r,a];return s&&y.push(s),c&&y.push(c),this.compileAndRun(g,y,d)},t.prototype.multiply=function(e,r){if(e.dtype==="complex64"){var a=this.texData.get(e.dataId),o=this.texData.get(r.dataId),i=new zs(ov,e.shape,r.shape),s=new zs(iv,e.shape,r.shape),u=[this.makeComplexComponentTensorInfo(e,a.complexTensors.real),this.makeComplexComponentTensorInfo(e,a.complexTensors.imag),this.makeComplexComponentTensorInfo(r,o.complexTensors.real),this.makeComplexComponentTensorInfo(r,o.complexTensors.imag)],c=this.compileAndRun(i,u),l=this.compileAndRun(s,u),h=this.complex(c,l);return c.dispose(),l.dispose(),h}if(this.shouldExecuteOnCPU([e,r]))return this.cpuBackend.multiply(e,r);if(W().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,r,Vs,e.dtype);var f=new Ue(Vs,e.shape,r.shape);return this.compileAndRun(f,[e,r],e.dtype)},t.prototype.batchNormalization=function(e,r,a,o,i,s){var u=[e,r,a],c=null;s!=null&&(c=s.shape,u.push(s));var l=null;if(i!=null&&(l=i.shape,u.push(i)),W().getBool("WEBGL_PACK_NORMALIZATION")){var h=new av(e.shape,r.shape,a.shape,c,l,o);return this.compileAndRun(h,u)}var f=new rv(e.shape,r.shape,a.shape,c,l,o);return this.compileAndRun(f,u)},t.prototype.localResponseNormalization4D=function(e,r,a,o,i){var s=W().getBool("WEBGL_PACK_NORMALIZATION")?new em(e.shape,r,a,o,i):new Qv(e.shape,r,a,o,i);return this.compileAndRun(s,[e])},t.prototype.LRNGrad=function(e,r,a,o,i,s,u){var c=new Zv(r.shape,o,i,s,u);return this.compileAndRun(c,[r,a,e])},t.prototype.tile=function(e,r){if(e.dtype==="string"){var a=this.readSync(e.dataId).map((function(i){return ka(i)}));return Sc(fe(e.shape,e.dtype,a),r)}var o=new Em(e.shape,r);return this.compileAndRun(o,[e])},t.prototype.pad=function(e,r,a){var o=W().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new sm(e.shape,r,a):new im(e.shape,r,a);return this.compileAndRun(o,[e])},t.prototype.transpose=function(e,r){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.transpose(e,r);var a=W().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new Sm(e.shape,r):new _m(e.shape,r);return this.compileAndRun(a,[e])},t.prototype.gather=function(e,r,a){if(this.shouldExecuteOnCPU([e,r]))return this.cpuBackend.gather(e,r,a);var o=new Mv(e.shape,r.size,a);return this.compileAndRun(o,[e,r])},t.prototype.batchToSpaceND=function(e,r,a){I(e.rank<=4,(function(){return"batchToSpaceND for rank > 4 with a WebGL backend not implemented yet"}));var o=r.reduce((function(h,f){return h*f})),i=Fa(e.shape,r,o),s=Pa(i.length,r.length),u=Ba(e.shape,r,o),c=fc(a,r.length),l=dc(u,a,r.length);return e.reshape(i).transpose(s).reshape(u).slice(c,l)},t.prototype.spaceToBatchND=function(e,r,a){I(e.rank<=4,(function(){return"spaceToBatchND for rank > 4 with a WebGL backend not implemented yet"}));var o=r.reduce((function(f,d){return f*d})),i=[[0,0]];i.push.apply(i,a);for(var s=1+r.length;s<e.shape.length;++s)i.push([0,0]);var u=e.pad(i),c=Fa(u.shape,r,o,!1),l=Pa(c.length,r.length,!1),h=Ba(u.shape,r,o,!1);return u.reshape(c).transpose(l).reshape(h)},t.prototype.reduce=function(e,r,a){var o=e.shape[0],i=e.shape[1],s=So(i),u=new um({windowSize:s,inSize:i,batchSize:o},r),c=this.compileAndRun(u,[e],a);return c.shape[1]===1?c:this.reduce(c,r,a)},t.prototype.argReduce=function(e,r,a){a===void 0&&(a=null);var o=e.shape[0],i=e.shape[1];a!=null&&(o=a.shape[0],i=a.shape[1]);var s=So(i),u=new Kp({windowSize:s,inSize:i,batchSize:o},r,a==null),c=[e];a!=null&&c.push(a);var l=this.compileAndRun(u,c,"int32");return l.shape[1]===1?l:this.argReduce(e,r,l)},t.prototype.argReducePacked=function(e,r,a){a===void 0&&(a=null);var o=a!=null?a.shape:e.shape,i=So(o[o.length-1]),s=new ev(o,i,r,a==null),u=a==null?[e]:[e,a],c=this.compileAndRun(s,u,"int32");return c.rank===e.rank?this.argReducePacked(e,r,c):c},t.prototype.sum=function(e,r){Et("sum",r,e.rank);var a=ot(e.shape,r),o=a[0],i=Z(a[1]),s=e.as2D(-1,i),u=go(e.dtype);return this.reduce(s,"sum",u).reshape(o)},t.prototype.prod=function(e,r){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.prod(e,r);var a=ot(e.shape,r),o=a[0],i=Z(a[1]),s=e.as2D(-1,i),u=go(e.dtype);return this.reduce(s,"prod",u).reshape(o)},t.prototype.unsortedSegmentSum=function(e,r,a){var o=0,i=sn([o],e.rank),s=e;i!=null&&(s=e.transpose(i),o=un(1,e.rank)[0]);var u=(function(d,p,v){for(var m=[],g=d.length,y=0;y<g;y++)y!==p?m.push(d[y]):m.push(v);return m})(s.shape,o,a),c=Z([s.shape[o]]),l=s.as2D(-1,c),h=go(e.dtype),f=this.segOpCompute(l,"unsortedSegmentSum",r,h,a).reshape(u);return i!=null&&(f=f.transpose(bi(i))),f},t.prototype.segOpCompute=function(e,r,a,o,i){var s=e.shape[0],u=e.shape[1],c=(function(f,d){var p,v=!1;for(f<=vc?(p=f,v=!0):p=Yo(f,Math.floor(Math.sqrt(f)));!v;)p>d||p===f?v=!0:p=Yo(f,p+1);return p})(u,i),l=new gm({windowSize:c,inSize:u,batchSize:s,numSegments:i}),h=this.compileAndRun(l,[e,a],o);return h.shape[1]===i?h:(a=Na(0,i).tile([u/c]),this.segOpCompute(h,r,a,o,i))},t.prototype.argMinMaxReduce=function(e,r,a){var o=[r];if(Et("arg"+a.charAt(0).toUpperCase()+a.slice(1),o,e.rank),!W().getBool("WEBGL_PACK_REDUCE")||e.rank<=2){var i=ot(e.shape,o),s=i[0],u=Z(i[1]),c=e.as2D(-1,u);return this.argReduce(c,a).reshape(s)}return this.argReducePacked(e,a)},t.prototype.argMin=function(e,r){return this.argMinMaxReduce(e,r,"min")},t.prototype.argMax=function(e,r){return this.argMinMaxReduce(e,r,"max")},t.prototype.cumsum=function(e,r,a,o){if(r!==e.rank-1)throw new Error("WebGL cumsum shader expects an inner-most axis="+(e.rank-1)+" but got axis="+r);var i=new bv(e.shape,a,o);return this.compileAndRun(i,[e])},t.prototype.equal=function(e,r){if(W().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,r,`
  return vec4(equal(a, b));
`,"bool");var a=new Ue("return float(a == b);",e.shape,r.shape);return this.compileAndRun(a,[e,r],"bool")},t.prototype.notEqual=function(e,r){if(W().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,r,`
  return vec4(notEqual(a, b));
`,"bool");var a=new Ue("return float(a != b);",e.shape,r.shape);return this.compileAndRun(a,[e,r],"bool")},t.prototype.less=function(e,r){if(this.shouldExecuteOnCPU([e,r]))return this.cpuBackend.less(e,r);if(W().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,r,`
  return vec4(lessThan(a, b));
`,"bool");var a=new Ue("return float(a < b);",e.shape,r.shape);return this.compileAndRun(a,[e,r],"bool")},t.prototype.lessEqual=function(e,r){if(W().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,r,`
  return vec4(lessThanEqual(a, b));
`,"bool");var a=new Ue("return float(a <= b);",e.shape,r.shape);return this.compileAndRun(a,[e,r],"bool")},t.prototype.greater=function(e,r){if(this.shouldExecuteOnCPU([e,r]))return this.cpuBackend.greater(e,r);if(W().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,r,`
  return vec4(greaterThan(a, b));
`,"bool");var a=new Ue("return float(a > b);",e.shape,r.shape);return this.compileAndRun(a,[e,r],"bool")},t.prototype.greaterEqual=function(e,r){if(W().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,r,`
  return vec4(greaterThanEqual(a, b));
`,"bool");var a=new Ue("return float(a >= b);",e.shape,r.shape);return this.compileAndRun(a,[e,r],"bool")},t.prototype.logicalNot=function(e){var r=new ye(e.shape,"return float(!(x >= 1.0));");return this.compileAndRun(r,[e])},t.prototype.logicalAnd=function(e,r){if(W().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,r,`
  return vec4(
    vec4(greaterThanEqual(a, vec4(1.0))) *
    vec4(greaterThanEqual(b, vec4(1.0))));
`,"bool");var a=new Ue("return float(a >= 1.0 && b >= 1.0);",e.shape,r.shape);return this.compileAndRun(a,[e,r],"bool")},t.prototype.logicalOr=function(e,r){if(W().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,r,`
  return min(
    vec4(greaterThanEqual(a, vec4(1.0))) +
    vec4(greaterThanEqual(b, vec4(1.0))),
    vec4(1.0));
`,"bool");var a=new Ue("return float(a >= 1.0 || b >= 1.0);",e.shape,r.shape);return this.compileAndRun(a,[e,r],"bool")},t.prototype.select=function(e,r,a){var o=new ym(e.rank,r.shape,r.rank);return this.compileAndRun(o,[e,r,a],nt(r.dtype,a.dtype))},t.prototype.where=function(e){Da("tf.where() in webgl locks the UI thread. Call tf.whereAsync() instead");var r=e.dataSync();return ki(e.shape,r)},t.prototype.topk=function(e,r,a){return Rc(e.dataSync(),e.shape,e.dtype,r)},t.prototype.min=function(e,r){Et("min",r,e.rank);var a=ot(e.shape,r),o=a[0],i=Z(a[1]),s=e.as2D(-1,i);return this.reduce(s,"min",s.dtype).reshape(o)},t.prototype.minimum=function(e,r){if(this.shouldExecuteOnCPU([e,r]))return this.cpuBackend.minimum(e,r);var a=W().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new fn(`
  vec4 result = vec4(min(a, b));
  vec4 isNaN = min(vec4(isnan(a)) + vec4(isnan(b)), vec4(1.0));
  
  result.r = isNaN.r > 0. ? NAN : result.r;
  result.g = isNaN.g > 0. ? NAN : result.g;
  result.b = isNaN.b > 0. ? NAN : result.b;
  result.a = isNaN.a > 0. ? NAN : result.a;

  return result;
`,e.shape,r.shape):new Ue(`
  if (isnan(a)) return a;
  if (isnan(b)) return b;

  return min(a, b);
`,e.shape,r.shape);return this.compileAndRun(a,[e,r])},t.prototype.mod=function(e,r){var a=W().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new fn(`
  vec4 result = mod(a, b);
  vec4 isNaN = vec4(equal(b, vec4(0.0)));
  
  result.r = isNaN.r > 0. ? NAN : result.r;
  result.g = isNaN.g > 0. ? NAN : result.g;
  result.b = isNaN.b > 0. ? NAN : result.b;
  result.a = isNaN.a > 0. ? NAN : result.a;

  return result;
`,e.shape,r.shape):new Ue(`if (b == 0.0) return NAN;
  return mod(a, b);`,e.shape,r.shape);return this.compileAndRun(a,[e,r])},t.prototype.max=function(e,r){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.max(e,r);Et("max",r,e.rank);var a=ot(e.shape,r),o=a[0],i=Z(a[1]),s=e.as2D(-1,i);return this.reduce(s,"max",s.dtype).reshape(o)},t.prototype.maximum=function(e,r){if(this.shouldExecuteOnCPU([e,r]))return this.cpuBackend.maximum(e,r);var a=W().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new fn(`
  vec4 result = vec4(max(a, b));
  vec4 isNaN = min(vec4(isnan(a)) + vec4(isnan(b)), vec4(1.0));
  
  result.r = isNaN.r > 0. ? NAN : result.r;
  result.g = isNaN.g > 0. ? NAN : result.g;
  result.b = isNaN.b > 0. ? NAN : result.b;
  result.a = isNaN.a > 0. ? NAN : result.a;

  return result;
`,e.shape,r.shape):new Ue(`
  if (isnan(a)) return a;
  if (isnan(b)) return b;

  return max(a, b);
`,e.shape,r.shape);return this.compileAndRun(a,[e,r])},t.prototype.all=function(e,r){Et("all",r,e.rank);var a=ot(e.shape,r),o=a[0],i=Z(a[1]),s=e.as2D(-1,i);return this.reduce(s,"all",s.dtype).reshape(o)},t.prototype.any=function(e,r){Et("any",r,e.rank);var a=ot(e.shape,r),o=a[0],i=Z(a[1]),s=e.as2D(-1,i);return this.reduce(s,"any",s.dtype).reshape(o)},t.prototype.realDivide=function(e,r){if(W().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,r,`
  // vec4 one = vec4(equal(a, b));
  // return one + (vec4(1.0) - one) * a / b;
  vec4 result = a / b;
  if(a.x == b.x) {
    result.x = 1.;
  }
  if(a.y == b.y) {
    result.y = 1.;
  }
  if(a.z == b.z) {
    result.z = 1.;
  }
  if(a.w == b.w) {
    result.w = 1.;
  }

  return result;
`,"float32",!0);var a=new Ue(`
if (a == b) {
  return 1.0;
};
return a / b;`,e.shape,r.shape);return this.compileAndRun(a,[e,r],"float32")},t.prototype.floorDiv=function(e,r){if(W().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,r,`
  ivec4 ia = round(a);
  ivec4 ib = round(b);
  bvec4 cond = notEqual(ib, ivec4(0));
  ivec4 result = ivec4(0);
  vec4 s = sign(a) * sign(b);

  // Windows (D3D) wants guaranteed non-zero int division at compile-time.
  if (cond[0]) {
    result[0] = idiv(ia[0], ib[0], s[0]);
  }
  if (cond[1]) {
    result[1] = idiv(ia[1], ib[1], s[1]);
  }
  if (cond[2]) {
    result[2] = idiv(ia[2], ib[2], s[2]);
  }
  if (cond[3]) {
    result[3] = idiv(ia[3], ib[3], s[3]);
  }
  return vec4(result);
`,"int32");var a=new Ue(`
  float s = sign(a) * sign(b);
  int ia = round(a);
  int ib = round(b);
  if (ib != 0) {
    // Windows (D3D) wants guaranteed non-zero int division at compile-time.
    return float(idiv(ia, ib, s));
  } else {
    return NAN;
  }
`,e.shape,r.shape);return this.compileAndRun(a,[e,r],"int32")},t.prototype.add=function(e,r){if(e.dtype==="complex64"&&r.dtype==="complex64")return this.complexSeparableBinaryOp(e,r,Ro);if(this.shouldExecuteOnCPU([e,r]))return this.cpuBackend.add(e,r);var a=nt(e.dtype,r.dtype);if(W().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,r,Ro,a);var o=new Ue(Ro,e.shape,r.shape);return this.compileAndRun(o,[e,r],a)},t.prototype.packedUnaryOp=function(e,r,a){var o=new Dr(e.shape,r);return this.compileAndRun(o,[e],a)},t.prototype.packedBinaryOp=function(e,r,a,o,i){i===void 0&&(i=!1);var s=new fn(a,e.shape,r.shape,i);return this.compileAndRun(s,[e,r],o)},t.prototype.complexSeparableBinaryOp=function(e,r,a){var o=this,i=this.texData.get(e.dataId),s=this.texData.get(r.dataId),u=[[i.complexTensors.real,s.complexTensors.real],[i.complexTensors.imag,s.complexTensors.imag]].map((function(f){var d=f[0],p=f[1],v=o.makeComplexComponentTensorInfo(e,d),m=o.makeComplexComponentTensorInfo(r,p),g=new Ue(a,e.shape,r.shape);return o.compileAndRun(g,[v,m],nt(d.dtype,p.dtype))})),c=u[0],l=u[1],h=this.complex(c,l);return c.dispose(),l.dispose(),h},t.prototype.makeComplexComponentTensorInfo=function(e,r){return{dataId:r.dataId,dtype:r.dtype,shape:e.shape}},t.prototype.addN=function(e){if(e.length===1)return e[0];if(e.length>W().get("WEBGL_MAX_TEXTURES_IN_SHADER")){var r=Math.floor(e.length/2),a=this.addN(e.slice(0,r)),o=this.addN(e.slice(r));return this.addN([a,o])}var i=e.map((function(c){return c.dtype})).reduce((function(c,l){return nt(c,l)})),s=e.map((function(c){return c.shape})),u=W().getBool("WEBGL_PACK")?new Xp(e[0].shape,s):new qp(e[0].shape,s);return this.compileAndRun(u,e,i)},t.prototype.subtract=function(e,r){if(e.dtype==="complex64"&&r.dtype==="complex64")return this.complexSeparableBinaryOp(e,r,Io);if(this.shouldExecuteOnCPU([e,r]))return this.cpuBackend.subtract(e,r);var a=nt(e.dtype,r.dtype);if(W().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,r,Io,e.dtype);var o=new Ue(Io,e.shape,r.shape);return this.compileAndRun(o,[e,r],a)},t.prototype.pow=function(e,r){var a=W().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new fn(`
  // isModRound1 has 1 for components with round(mod(b, 2.0)) == 1, 0 otherwise.
  vec4 isModRound1 = vec4(equal(round(mod(b, 2.0)), ivec4(1)));
  vec4 multiplier = sign(a) * isModRound1 + (vec4(1.0) - isModRound1);
  vec4 result = multiplier * pow(abs(a), b);

  // Ensure that a^0 = 1, including 0^0 = 1 as this correspond to TF and JS
  bvec4 isExpZero = equal(b, vec4(0.0));
  result.r = isExpZero.r ? 1.0 : result.r;
  result.g = isExpZero.g ? 1.0 : result.g;
  result.b = isExpZero.b ? 1.0 : result.b;
  result.a = isExpZero.a ? 1.0 : result.a;

  vec4 isNaN = vec4(lessThan(a, vec4(0.0))) * vec4(lessThan(floor(b), b));
  
  result.r = isNaN.r > 0. ? NAN : result.r;
  result.g = isNaN.g > 0. ? NAN : result.g;
  result.b = isNaN.b > 0. ? NAN : result.b;
  result.a = isNaN.a > 0. ? NAN : result.a;

  return result;
`,e.shape,r.shape):new Ue(`
if(a < 0.0 && floor(b) < b){
  return NAN;
}
if (b == 0.0) {
  return 1.0;
}
return (round(mod(b, 2.0)) != 1) ?
    pow(abs(a), b) : sign(a) * pow(abs(a), b);
`,e.shape,r.shape),o=nt(e.dtype,r.dtype);return this.compileAndRun(a,[e,r],o)},t.prototype.ceil=function(e){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.ceil(e);if(W().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,eu,e.dtype);var r=new ye(e.shape,eu);return this.compileAndRun(r,[e])},t.prototype.floor=function(e){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.floor(e);if(W().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,tu,e.dtype);var r=new ye(e.shape,tu);return this.compileAndRun(r,[e])},t.prototype.sign=function(e){var r=new ye(e.shape,`
  if (isnan(x)) { return 0.0; }
  return sign(x);
`);return this.compileAndRun(r,[e])},t.prototype.isNaN=function(e){var r=new ye(e.shape,"return float(isnan(x));");return this.compileAndRun(r,[e],"bool")},t.prototype.isInf=function(e){var r=new ye(e.shape,"return float(isinf(x));");return this.compileAndRun(r,[e],"bool")},t.prototype.isFinite=function(e){var r=new ye(e.shape,"return float(!isnan(x) && !isinf(x));");return this.compileAndRun(r,[e],"bool")},t.prototype.round=function(e){var r=new ye(e.shape,`
  // OpenGL ES does not support round function.
  // The algorithm is based on banker's rounding.
  float base = floor(x);
  if ((x - base) < 0.5) {
    return floor(x);
  } else if ((x - base) > 0.5) {
    return ceil(x);
  } else {
    if (mod(base, 2.0) == 0.0) {
      return base;
    } else {
      return base + 1.0;
    }
  }
`);return this.compileAndRun(r,[e])},t.prototype.exp=function(e){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.exp(e);if(W().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,nu,e.dtype);var r=new ye(e.shape,nu);return this.compileAndRun(r,[e])},t.prototype.expm1=function(e){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.expm1(e);if(W().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,ru,e.dtype);var r=new ye(e.shape,ru);return this.compileAndRun(r,[e])},t.prototype.softmax=function(e,r){var a=Ke([r],e.shape),o=this.max(e,a),i=bt(o.shape,a),s=this.subtract(e,o.reshape(i)),u=this.exp(s),c=this.sum(u,a).reshape(i);return this.realDivide(u,c)},t.prototype.log=function(e){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.log(e);if(W().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,`
  vec4 result = log(x);
  vec4 isNaN = vec4(lessThan(x, vec4(0.0)));
  result.r = isNaN.r == 1.0 ? NAN : result.r;
  result.g = isNaN.g == 1.0 ? NAN : result.g;
  result.b = isNaN.b == 1.0 ? NAN : result.b;
  result.a = isNaN.a == 1.0 ? NAN : result.a;

  return result;
`,e.dtype);var r=new ye(e.shape,`if (x < 0.0) return NAN;
  return log(x);`);return this.compileAndRun(r,[e])},t.prototype.log1p=function(e){var r=new ye(e.shape,"return log(1.0 + x);");return this.compileAndRun(r,[e])},t.prototype.sqrt=function(e){var r=new ye(e.shape,"return sqrt(x);");return this.compileAndRun(r,[e])},t.prototype.rsqrt=function(e){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.rsqrt(e);var r=new ye(e.shape,"return inversesqrt(x);");return this.compileAndRun(r,[e])},t.prototype.reciprocal=function(e){var r=new ye(e.shape,"return 1.0 / x;");return this.compileAndRun(r,[e])},t.prototype.relu=function(e){var r;return r=W().getBool("WEBGL_PACK")?new Dr(e.shape,Pc):new ye(e.shape,Mc),this.compileAndRun(r,[e])},t.prototype.relu6=function(e){var r;return r=W().getBool("WEBGL_PACK")?new Dr(e.shape,Bc):new ye(e.shape,Nc),this.compileAndRun(r,[e])},t.prototype.prelu=function(e,r){var a=W().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new fn(Dc,e.shape,r.shape):new Ue(Ac,e.shape,r.shape);return this.compileAndRun(a,[e,r])},t.prototype.elu=function(e){if(W().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,Oc,e.dtype);var r=new ye(e.shape,Fc);return this.compileAndRun(r,[e])},t.prototype.eluDer=function(e,r){var a=W().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new fn(`
  vec4 bGTEZero = vec4(greaterThanEqual(b, vec4(0.)));
  return (bGTEZero * a) + ((vec4(1.0) - bGTEZero) * (a * (b + vec4(1.0))));
`,e.shape,r.shape):new Ue("return (b >= 1.0) ? a : a * (b + 1.0);",e.shape,r.shape);return this.compileAndRun(a,[e,r])},t.prototype.selu=function(e){var r=new ye(e.shape,Im);return this.compileAndRun(r,[e])},t.prototype.int=function(e){var r=new ye(e.shape,"return float(int(x));");return this.compileAndRun(r,[e],"int32")},t.prototype.clip=function(e,r,a){var o,i=(o=W().getBool("WEBGL_PACK_CLIP")?new uv(e.shape):new sv(e.shape)).getCustomSetupFunc(r,a);return this.compileAndRun(o,[e],null,i)},t.prototype.abs=function(e){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.abs(e);if(W().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,Qs,e.dtype);var r=new ye(e.shape,Qs);return this.compileAndRun(r,[e])},t.prototype.complexAbs=function(e){var r=this.texData.get(e.dataId),a=new cv(e.shape),o=[this.makeComplexComponentTensorInfo(e,r.complexTensors.real),this.makeComplexComponentTensorInfo(e,r.complexTensors.imag)];return this.compileAndRun(a,o)},t.prototype.sigmoid=function(e){var r=new ye(e.shape,"return 1.0 / (1.0 + exp(-1.0 * x));");return this.compileAndRun(r,[e])},t.prototype.softplus=function(e){var r=new ye(e.shape,`
  float epsilon = 1.1920928955078125e-7;
  float threshold = log(epsilon) + 2.0;

  bool too_large = x > -threshold;
  bool too_small = x < threshold;

  float result;
  float exp_x = exp(x);

  if (too_large){
    result = x;
  }
  else if (too_small){
    result = exp_x;
  }
  else{
    result = log(exp_x + 1.0);
  }
  return result;
`);return this.compileAndRun(r,[e])},t.prototype.sin=function(e){var r=new ye(e.shape,km);return this.compileAndRun(r,[e])},t.prototype.cos=function(e){var r=new ye(e.shape,Tm);return this.compileAndRun(r,[e])},t.prototype.tan=function(e){var r=new ye(e.shape,"return tan(x);");return this.compileAndRun(r,[e])},t.prototype.asin=function(e){var r=new ye(e.shape,Am);return this.compileAndRun(r,[e])},t.prototype.acos=function(e){var r=new ye(e.shape,Dm);return this.compileAndRun(r,[e])},t.prototype.atan=function(e){var r=new ye(e.shape,Mm);return this.compileAndRun(r,[e])},t.prototype.atan2=function(e,r){var a=W().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new fn(`
  vec4 result = atan(a, b);
  vec4 isNaN = min(vec4(isnan(a)) + vec4(isnan(b)), vec4(1.0));
  
  result.r = isNaN.r > 0. ? NAN : result.r;
  result.g = isNaN.g > 0. ? NAN : result.g;
  result.b = isNaN.b > 0. ? NAN : result.b;
  result.a = isNaN.a > 0. ? NAN : result.a;

  return result;
`,e.shape,r.shape):new Ue(`
  if (isnan(a)) return a;
  if (isnan(b)) return b;

  return atan(a, b);
`,e.shape,r.shape);return this.compileAndRun(a,[e,r])},t.prototype.sinh=function(e){var r=new ye(e.shape,`
  float e2x = exp(x);
  return (e2x - 1.0 / e2x) / 2.0;
`);return this.compileAndRun(r,[e])},t.prototype.cosh=function(e){var r=new ye(e.shape,`
  float e2x = exp(-x);
  return (e2x + 1.0 / e2x) / 2.0;
`);return this.compileAndRun(r,[e])},t.prototype.tanh=function(e){var r=new ye(e.shape,`
  float e2x = exp(-2.0 * abs(x));
  return sign(x) * (1.0 - e2x) / (1.0 + e2x);
`);return this.compileAndRun(r,[e])},t.prototype.asinh=function(e){var r=new ye(e.shape,Nm);return this.compileAndRun(r,[e])},t.prototype.acosh=function(e){var r=new ye(e.shape,Fm);return this.compileAndRun(r,[e])},t.prototype.atanh=function(e){var r=new ye(e.shape,Pm);return this.compileAndRun(r,[e])},t.prototype.erf=function(e){var r=new ye(e.shape,`
  // Error function is calculated approximately with elementary function.
  // See "Handbook of Mathematical Functions with Formulas,
  // Graphs, and Mathematical Tables", Abramowitz and Stegun.
  float p = 0.3275911;
  float a1 = 0.254829592;
  float a2 = -0.284496736;
  float a3 = 1.421413741;
  float a4 = -1.453152027;
  float a5 = 1.061405429;

  float sign = sign(x);
  x = abs(x);
  float t = 1.0 / (1.0 + p * x);
  return sign * (1.0 - (((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*exp(-x*x));
`);return this.compileAndRun(r,[e])},t.prototype.step=function(e,r){var a=new ye(e.shape,(function(o){return o===void 0&&(o=0),jt+`
    return x > 0.0 ? 1.0 : float(`+o+`);
  `})(r));return this.compileAndRun(a,[e])},t.prototype.conv2dByMatMul=function(e,r,a,o,i,s){var u=e.shape,c=this.texData.get(e.dataId),l=a.inChannels,h=u[0]*u[1]*u[2],f=a.outChannels,d=a.dataFormat==="channelsLast",p=(h===1||f===1)&&l>1e3,v=u[2]%2!=0&&!!c.isPacked;if(p||!W().getBool("WEBGL_LAZILY_UNPACK")||!W().getBool("WEBGL_PACK_BINARY_OPERATIONS")||!v){var m=d?u[0]*u[1]*u[2]:u[0]*u[2]*u[3],g=this.reshape(e,[1,m,a.inChannels]),y=this.reshape(r,[1,a.inChannels,a.outChannels]);return this.reshape(this.fusedBatchMatMul({a:g,b:y,transposeA:!1,transposeB:!1,bias:o,activation:i,preluActivationWeights:s}),a.outShape)}var b=d?u[0]*u[1]*(u[2]+1):u[0]*u[2]*(u[3]+1),x={dataId:e.dataId,shape:[1,b,a.inChannels],dtype:e.dtype},w=c.shape;c.shape=c.shape.slice(),c.shape[c.shape.length-2]++,I(ca(c.shape,x.shape),(function(){return"packed reshape "+c.shape+" to "+x.shape+" isn't free"}));var C=this.reshape(r,[1,a.inChannels,a.outChannels]),k=this.fusedBatchMatMul({a:x,b:C,transposeA:!1,transposeB:!1,bias:o,activation:i,preluActivationWeights:s}),S=this.texData.get(k.dataId);return I(S.isPacked,(function(){return"batchMatMul result is expected to be packed"})),c.shape=w,S.shape=a.outShape,M.makeTensorFromDataId(k.dataId,a.outShape,k.dtype)},t.prototype.conv2dWithIm2Row=function(e,r,a,o,i,s){var u=a.filterWidth,c=a.filterHeight,l=a.inChannels,h=a.outWidth,f=a.outHeight,d=a.dataFormat==="channelsLast",p=u*c*l,v=f*h,m=[p,v],g=e.squeeze([0]),y=r.reshape([1,p,-1]),b=new Jv(m,g.shape,a),x=this.compileAndRun(b,[g]).reshape([1,m[0],m[1]]),w=o!=null,C=s!=null,k=i?da(i,!0):null,S=new ko(x.shape,[1,v,a.outChannels],!0,!1,w,k,C),_=[x,y];o&&_.push(o),C&&_.push(s);var R=this.compileAndRun(S,_);return d?R.reshape([1,f,h,a.outChannels]):R.reshape([1,a.outChannels,f,h])},t.prototype.fusedConv2d=function(e){var r=e.input,a=e.filter,o=e.convInfo,i=e.bias,s=e.activation,u=e.preluActivationWeights;if(o.filterHeight===1&&o.filterWidth===1&&o.dilationHeight===1&&o.dilationWidth===1&&o.strideHeight===1&&o.strideWidth===1&&(o.padInfo.type==="SAME"||o.padInfo.type==="VALID"))return this.conv2dByMatMul(r,a,o,i,s,u);if(W().getBool("WEBGL_CONV_IM2COL")&&r.shape[0]===1)return this.conv2dWithIm2Row(r,a,o,i,s,u);var c=i!=null,l=u!=null,h=s?da(s,!1):null,f=new Gs(o,c,h,l),d=[r,a];return i&&d.push(i),u&&d.push(u),this.compileAndRun(f,d)},t.prototype.conv2d=function(e,r,a){if(a.filterHeight===1&&a.filterWidth===1&&a.dilationHeight===1&&a.dilationWidth===1&&a.strideHeight===1&&a.strideWidth===1&&(a.padInfo.type==="SAME"||a.padInfo.type==="VALID"))return this.conv2dByMatMul(e,r,a);if(W().getBool("WEBGL_CONV_IM2COL")&&e.shape[0]===1)return this.conv2dWithIm2Row(e,r,a);var o=new Gs(a);return this.compileAndRun(o,[e,r])},t.prototype.conv2dDerInput=function(e,r,a){var o=new dv(a);return this.compileAndRun(o,[e,r])},t.prototype.conv2dDerFilter=function(e,r,a){var o=new fv(a);return this.compileAndRun(o,[e,r])},t.prototype.fusedDepthwiseConv2D=function(e){var r,a=e.input,o=e.filter,i=e.convInfo,s=e.bias,u=e.activation,c=e.preluActivationWeights,l=W().getBool("WEBGL_PACK_DEPTHWISECONV")&&i.strideWidth<=2&&i.outChannels/i.inChannels==1,h=u?da(u,l):null,f=[a,o],d=s!=null,p=c!=null;return d&&f.push(s),p&&f.push(c),l?(r=new js(i,d,h,p),this.compileAndRun(r,f)):(r=new Hs(i,d,h,p),this.compileAndRun(r,f))},t.prototype.depthwiseConv2D=function(e,r,a){var o;return W().getBool("WEBGL_PACK_DEPTHWISECONV")&&a.strideWidth<=2&&a.outChannels/a.inChannels==1?(o=new js(a),this.compileAndRun(o,[e,r])):(o=new Hs(a),this.compileAndRun(o,[e,r]))},t.prototype.depthwiseConv2DDerInput=function(e,r,a){var o=new gv(a);return this.compileAndRun(o,[e,r])},t.prototype.depthwiseConv2DDerFilter=function(e,r,a){var o=new mv(a);return this.compileAndRun(o,[e,r])},t.prototype.conv3d=function(e,r,a){var o=new yv(a);return this.compileAndRun(o,[e,r])},t.prototype.conv3dDerInput=function(e,r,a){var o=new vv(a);return this.compileAndRun(o,[e,r])},t.prototype.conv3dDerFilter=function(e,r,a){var o=new pv(a);return this.compileAndRun(o,[e,r])},t.prototype.maxPool=function(e,r){var a=new To(r,"max",!1);return this.compileAndRun(a,[e])},t.prototype.avgPool=function(e,r){var a=new To(r,"avg",!1);return this.compileAndRun(a,[e],"float32")},t.prototype.maxPoolBackprop=function(e,r,a,o){var i=new To(o,"max",!0),s=this.compileAndRun(i,[r]),u=new tm(o),c=this.compileAndRun(u,[e,s],r.dtype);return s.dispose(),c},t.prototype.avgPoolBackprop=function(e,r,a){var o=new tv(a);return this.compileAndRun(o,[e],r.dtype)},t.prototype.cast=function(e,r){return wc(e,r,this)},t.prototype.unstack=function(e,r){for(var a=e.shape[r],o=new Array(e.rank-1),i=0,s=0;s<e.rank;s++)s!==r&&(o[i++]=e.shape[s]);var u=new Array(e.rank).fill(0),c=e.shape.slice();c[r]=1;var l=new Array(a);for(s=0;s<l.length;s++)u[r]=s,l[s]=this.slice(e,u,c).reshape(o);return l},t.prototype.avgPool3d=function(e,r){var a=new Ao(r,"avg",!1);return this.compileAndRun(a,[e],"float32")},t.prototype.avgPool3dBackprop=function(e,r,a){var o=new nv(a);return this.compileAndRun(o,[e],r.dtype)},t.prototype.maxPool3d=function(e,r){var a=new Ao(r,"max",!1);return this.compileAndRun(a,[e],"float32")},t.prototype.maxPool3dBackprop=function(e,r,a,o){var i=new Ao(o,"max",!0),s=this.compileAndRun(i,[r]),u=new nm(o),c=this.compileAndRun(u,[e,s],r.dtype);return s.dispose(),c},t.prototype.reshape=function(e,r){var a=this.texData.get(e.dataId);if(a.isPacked&&!ca(e.shape,r)&&(a.texture===null||!ca(a.shape,r))){var o=this.packedReshape(e,r);return M.makeTensorFromDataId(o.dataId,o.shape,o.dtype)}return ri(e,r)},t.prototype.resizeBilinear=function(e,r,a,o){var i=W().getBool("WEBGL_PACK_IMAGE_OPERATIONS")?new fm(e.shape,r,a,o):new hm(e.shape,r,a,o);return this.compileAndRun(i,[e],"float32")},t.prototype.resizeBilinearBackprop=function(e,r,a){var o=new lm(e,r,a);return this.compileAndRun(o,[e])},t.prototype.resizeNearestNeighbor=function(e,r,a,o){var i=new pm(e.shape,r,a,o);return this.compileAndRun(i,[e])},t.prototype.resizeNearestNeighborBackprop=function(e,r,a){var o=new dm(e,r,a);return this.compileAndRun(o,[e])},t.prototype.multinomial=function(e,r,a,o){var i=r?e:mn(e),s=i.shape[0],u=i.shape[1],c=new rm(s,u,a),l=c.getCustomSetupFunc(o);return this.compileAndRun(c,[i],"int32",l)},t.prototype.oneHot=function(e,r,a,o){var i=new am(e.size,r,a,o);return this.compileAndRun(i,[e])},t.prototype.diag=function(e){var r=new _v(e.size);return this.compileAndRun(r,[e])},t.prototype.nonMaxSuppression=function(e,r,a,o,i){return Da("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead"),Ri(e.dataSync(),r.dataSync(),a,o,i)},t.prototype.cropAndResize=function(e,r,a,o,i,s){var u=new xv(e.shape,r.shape,o,i,s);return this.compileAndRun(u,[e,r,a],"float32")},t.prototype.depthToSpace=function(e,r,a){I(r>1,(function(){return"blockSize should be > 1 for depthToSpace, but was: "+r}));var o=e.shape[0],i=a==="NHWC"?e.shape[1]:e.shape[2],s=a==="NHWC"?e.shape[2]:e.shape[3],u=a==="NHWC"?e.shape[3]:e.shape[1],c=i*r,l=s*r,h=u/(r*r),f=new Ev(a==="NHWC"?[o,c,l,h]:[o,h,c,l],r,a);return this.compileAndRun(f,[e])},t.prototype.split=function(e,r,a){return _c(e,r,a)},t.prototype.scatterND=function(e,r,a){var o=Oa(0,e,a),i=o.sliceRank,s=o.numUpdates,u=o.sliceSize,c=o.strides,l=o.outputSize,h=[l/u,u],f=e.reshape([s,i]),d=r.reshape([s,u]);if(l===0)return ri(rt([]),a);var p=X(0),v=new Ys(s,i,f.rank,d.rank,c,h);return this.compileAndRun(v,[d,f,p]).reshape(a)},t.prototype.sparseToDense=function(e,r,a,o){var i=Oa(0,e,a),s=i.sliceRank,u=i.numUpdates,c=i.strides,l=i.outputSize,h=new Ys(u,s,e.rank,r.rank,c,[l,1]);return this.compileAndRun(h,[r,e,o]).reshape(a)},t.prototype.fft=function(e){return this.fftImpl(e,!1)},t.prototype.ifft=function(e){return this.fftImpl(e,!0)},t.prototype.fftImpl=function(e,r){var a=this.texData.get(e.dataId),o=new Xs(Tv,e.shape,r),i=new Xs(Av,e.shape,r),s=[this.makeComplexComponentTensorInfo(e,a.complexTensors.real),this.makeComplexComponentTensorInfo(e,a.complexTensors.imag)],u=this.compileAndRun(o,s),c=this.compileAndRun(i,s),l=this.complex(u,c).as2D(e.shape[0],e.shape[1]);return u.dispose(),c.dispose(),l},t.prototype.gatherND=function(e,r){var a=r.shape,o=a[a.length-1],i=pc(e,r),s=i[0],u=i[1],c=i[2],l=i[3],h=r.reshape([u,o]),f=e.reshape([e.size/c,c]),d=new Nv(o,l,[u,c]);return this.compileAndRun(d,[f,h]).reshape(s)},t.prototype.fill=function(e,r,a){if((a=a||Gr(r))==="string"){var o=Ia(a,Z(e));return o.fill(r),M.makeTensor(o,e,a,this)}var i=new Dv(e,r),s=i.getCustomSetupFunc(r);return this.compileAndRun(i,[],a,s)},t.prototype.onesLike=function(e){if(e.dtype==="string")throw new Error("onesLike is not supported under string dtype");return this.fill(e.shape,1,e.dtype)},t.prototype.zerosLike=function(e){return this.fill(e.shape,e.dtype==="string"?"":0,e.dtype)},t.prototype.linspace=function(e,r,a){return Cc(e,r,a)},t.prototype.makeTensorInfo=function(e,r){var a=this.write(null,e,r);return this.texData.get(a).usage=null,{dataId:a,shape:e,dtype:r}},t.prototype.makeOutput=function(e,r){var a=this.makeTensorInfo(e,r).dataId;return M.makeTensorFromDataId(a,e,r,this)},t.prototype.unpackTensor=function(e){var r=new Om(e.shape);return this.runWebGLProgram(r,[e],e.dtype)},t.prototype.packTensor=function(e){var r=new om(e.shape);return this.runWebGLProgram(r,[e],e.dtype,null,!0)},t.prototype.packedReshape=function(e,r){var a=[Ta(e.shape)].concat(Aa(e.shape)),o={dtype:e.dtype,shape:a,dataId:e.dataId},i=[Ta(r)].concat(Aa(r)),s=new cm(i,a),u=this.runWebGLProgram(s,[o],e.dtype,null,!0);return{dataId:u.dataId,shape:r,dtype:u.dtype}},t.prototype.decode=function(e){var r,a=this.texData.get(e),o=a.isPacked,i=a.shape,s=a.dtype,u=_o(i);return r=o?new Cv(u):new wv(u),{dtype:s,shape:i,dataId:this.runWebGLProgram(r,[{shape:u,dtype:s,dataId:e}],s,null,!0).dataId}},t.prototype.runWebGLProgram=function(e,r,a,o,i){var s=this;i===void 0&&(i=!1);var u=this.makeTensorInfo(e.outputShape,a),c=this.texData.get(u.dataId);if(e.packedOutput&&(c.isPacked=!0),e.outPackingScheme===Lr.DENSE){var l=Nr(e.outputShape);c.texShape=l.map((function(b){return 2*b}))}if(e.outTexUsage!=null&&(c.usage=e.outTexUsage),Z(u.shape)===0)return c.values=Br(u.dtype,0),u;var h=[],f=r.map((function(b){if(b.dtype==="complex64")throw new Error("GPGPUProgram does not support complex64 input. For complex64 dtypes, please separate the program into real and imaginary parts.");var x=s.texData.get(b.dataId);if(x.texture==null){if(!e.packedInputs&&Z(b.shape)<=W().getNumber("WEBGL_SIZE_UPLOAD_UNIFORM"))return{shape:b.shape,texData:null,isUniform:!0,uniformValues:x.values};e.packedInputs&&(x.isPacked=!0,x.shape=b.shape)}else if(!!x.isPacked!=!!e.packedInputs)b=x.isPacked?s.unpackTensor(b):s.packTensor(b),h.push(b),x=s.texData.get(b.dataId);else if(x.isPacked&&!ca(x.shape,b.shape)){var w=b,C=b.shape;b.shape=x.shape,b=s.packedReshape(b,C),h.push(b),x=s.texData.get(b.dataId),w.shape=C}return s.uploadToGPU(b.dataId),{shape:b.shape,texData:x,isUniform:!1}}));this.uploadToGPU(u.dataId);var d,p={shape:u.shape,texData:c,isUniform:!1},v=(function(b,x,w){var C="";x.concat(w).forEach((function(_){var R=_.texData!=null&&_.texData.slice!=null&&_.texData.slice.flatOffset>0,D=_.isUniform?"uniform":_.texData.texShape;C+=_.shape+"_"+D+"_"+R}));var k=b.userCode,S=b.constructor.name;return S+="_"+C+"_"+k})(e,f,p),m=this.getAndSaveBinary(v,(function(){return(function(b,x,w,C){var k=x.userCode,S=w.map((function(U,L){var G={logicalShape:U.shape,texShape:U.isUniform?null:U.texData.texShape,isUniform:U.isUniform,isPacked:!U.isUniform&&U.texData.isPacked,flatOffset:null};return U.texData!=null&&U.texData.slice!=null&&U.texData.slice.flatOffset>0&&(G.flatOffset=U.texData.slice.flatOffset),{name:x.variableNames[L],shapeInfo:G}})),_=S.map((function(U){return U.shapeInfo})),R={logicalShape:C.shape,texShape:C.texData.texShape,isUniform:!1,isPacked:C.texData.isPacked,flatOffset:null},D=Yp(S,R,k,x.packedInputs),A=b.createProgram(D),O=null,P=b.getUniformLocation(A,"NAN",!1);W().getNumber("WEBGL_VERSION")===1&&(O=b.getUniformLocation(A,"INFINITY",!1));for(var F={},V=0;V<x.variableNames.length;V++){var z=x.variableNames[V];F[z]=b.getUniformLocation(A,z,!1),F["offset"+z]=b.getUniformLocation(A,"offset"+z,!1)}return{program:x,source:D,webGLProgram:A,uniformLocations:F,inShapeInfos:_,outShapeInfo:R,infLoc:O,nanLoc:P}})(s.gpgpu,e,f,p)})),g=this.activeTimers!=null;if(g&&(d=this.startTimer()),(function(b,x,w,C,k){Ks(x.inShapeInfos,w),Ks([x.outShapeInfo],[C]);var S=C.texData.texture,_=C.texData.texShape;C.texData.isPacked?b.setOutputPackedMatrixTexture(S,_[0],_[1]):b.setOutputMatrixTexture(S,_[0],_[1]),b.setProgram(x.webGLProgram),W().getNumber("WEBGL_VERSION")===1&&x.infLoc!==null&&b.gl.uniform1f(x.infLoc,1/0),x.nanLoc!==null&&b.gl.uniform1f(x.nanLoc,NaN),w.forEach((function(R,D){var A=x.program.variableNames[D],O=x.uniformLocations[A],P=x.uniformLocations["offset"+A];if(O!=null)if(R.isUniform)if(Z(R.shape)<2)b.gl.uniform1f(O,R.uniformValues[0]);else{var F=R.uniformValues;F instanceof Float32Array||(F=new Float32Array(F)),b.gl.uniform1fv(O,F)}else R.texData.slice!=null&&P!=null&&b.gl.uniform1i(P,R.texData.slice.flatOffset),b.setInputMatrixTexture(R.texData.texture,O,D)})),k?.(b,x.webGLProgram),b.executeProgram()})(this.gpgpu,m,f,p,o),h.forEach((function(b){return s.disposeData(b.dataId)})),g&&(d=this.endTimer(d),this.activeTimers.push({name:e.constructor.name,query:this.getQueryTime(d)})),!W().getBool("WEBGL_LAZILY_UNPACK")&&c.isPacked&&i===!1){var y=this.unpackTensor(u);return this.disposeData(u.dataId),y}return u},t.prototype.compileAndRun=function(e,r,a,o,i){i===void 0&&(i=!1),a=a||r[0].dtype;var s=this.runWebGLProgram(e,r,a,o,i);return M.makeTensorFromDataId(s.dataId,s.shape,s.dtype)},t.prototype.getAndSaveBinary=function(e,r){return e in this.binaryCache||(this.binaryCache[e]=r()),this.binaryCache[e]},t.prototype.getTextureManager=function(){return this.textureManager},t.prototype.dispose=function(){var e=this;this.disposed||(W().getBool("IS_TEST")||Object.keys(this.binaryCache).forEach((function(r){e.gpgpu.deleteProgram(e.binaryCache[r].webGLProgram),delete e.binaryCache[r]})),this.textureManager.dispose(),this.canvas!=null&&typeof HTMLCanvasElement<"u"&&this.canvas instanceof HTMLCanvasElement?this.canvas.remove():this.canvas=null,this.gpgpuCreatedLocally&&(this.gpgpu.program=null,this.gpgpu.dispose()),this.disposed=!0)},t.prototype.floatPrecision=function(){var e=this;return this.floatPrecisionValue==null&&(this.floatPrecisionValue=K((function(){if(!W().get("WEBGL_RENDER_FLOAT32_ENABLED")){var r=W().getBool("DEBUG");W().set("DEBUG",!1);var a=e.abs(X(1e-8)).dataSync()[0];if(W().set("DEBUG",r),a>0)return 32}return 16}))),this.floatPrecisionValue},t.prototype.epsilon=function(){return this.floatPrecision()===32?1e-7:1e-4},t.prototype.uploadToGPU=function(e){var r,a=this.texData.get(e),o=a.shape,i=a.dtype,s=a.values,u=a.texture,c=a.usage,l=a.isPacked;if(u==null){var h,f=this.activeTimers!=null;f&&(h=$t());var d=a.texShape;if(d==null&&(d=jd(o,l),a.texShape=d),s!=null){var p=_o(o),v=void 0,m=d[1],g=d[0],y=s instanceof Uint8Array;l?(m=(r=jr(d[0],d[1]))[0],g=r[1],v=new kv(p,[g,m],y)):v=new Iv(p,[g,m],y);var b=this.makeTensorInfo([g,m],i);this.texData.get(b.dataId).usage=y?St.PIXELS:St.UPLOAD,this.gpgpu.uploadDenseMatrixToTexture(this.getTexture(b.dataId),m,g,s);var x=this.runWebGLProgram(v,[b],i,null,!0),w=this.texData.get(x.dataId);a.texture=w.texture,a.texShape=w.texShape,a.isPacked=w.isPacked,a.usage=w.usage,this.disposeData(b.dataId),this.texData.delete(x.dataId),a.values=null,f&&(this.uploadWaitMs+=$t()-h)}else{var C=this.acquireTexture(d,c,i,l);a.texture=C}}},t.prototype.convertAndCacheOnCPU=function(e,r){var a=this.texData.get(e),o=a.dtype;return this.releaseGPUData(e),r!=null&&(a.values=(function(i,s){if(s==="float32"||s==="complex64")return i;if(s==="int32"||s==="bool"){for(var u=s==="int32"?new Int32Array(i.length):new Uint8Array(i.length),c=0;c<u.length;++c)u[c]=Math.round(i[c]);return u}throw new Error("Unknown dtype "+s)})(r,o)),a.values},t.prototype.acquireTexture=function(e,r,a,o){if(this.numBytesInGPU+=this.computeBytes(e,a),!this.warnedAboutMemory&&this.numBytesInGPU>1024*this.numMBBeforeWarning*1024){var i=(this.numBytesInGPU/1024/1024).toFixed(2);this.warnedAboutMemory=!0,console.warn("High memory usage in GPU: "+i+" MB, most likely due to a memory leak")}return this.textureManager.acquireTexture(e,r,o)},t.prototype.computeBytes=function(e,r){return e[0]*e[1]*$u(r)},t})(xc);rc()&&M.registerBackend("webgl",(function(){return new Um}),2);var Wm=T({square_:function(n){var t=E(n,"x","square"),e=[t];return M.runKernelFunc((function(r,a){return a([t]),r.square(t)}),{x:t},null,"Square",{},e,[])}}),Wr="SquaredDifference",Lc=T({squaredDifference_:function(n,t){var e,r=E(n,"a","squaredDifference"),a=E(t,"b","squaredDifference");e=Le(r,a),r=e[0],a=e[1],we(r.shape,a.shape);var o={a:r,b:a},i=[r,a];return M.runKernelFunc((function(s,u){var c=s.squaredDifference(r,a);return u([r,a]),c}),o,(function(s,u){var c=u[0],l=u[1],h=X(2);return{a:function(){return s.mul(c.sub(l).mul(h))},b:function(){return s.mul(l.sub(c).mul(h))}}}),Wr,{},i,[])}}),zm=T({abs_:function(n){var t=E(n,"x","abs");return t.dtype==="complex64"?M.runKernelFunc((function(e){return e.complexAbs(t)}),{$x:t}):M.runKernelFunc((function(e,r){var a=e.abs(t);return r([t]),a}),{x:t},(function(e,r){var a=r[0];return{x:function(){return e.mul(a.toFloat().step(-1))}}}),"Abs")}}),Vm=T({acos_:function(n){var t=E(n,"x","acos");return M.runKernelFunc((function(e,r){var a=e.acos(t);return r([t]),a}),{$x:t},(function(e,r){var a=r[0];return{$x:function(){return e.divStrict(X(1).sub(a.toFloat().square()).sqrt()).neg()}}}))}}),Gm=T({acosh_:function(n){var t=E(n,"x","acosh");return M.runKernelFunc((function(e,r){var a=e.acosh(t);return r([t]),a}),{$x:t},(function(e,r){var a=r[0];return{$x:function(){return e.divStrict(a.toFloat().square().sub(1).sqrt())}}}))}}),Hm=T({asin_:function(n){var t=E(n,"x","asin");return M.runKernelFunc((function(e,r){var a=e.asin(t);return r([t]),a}),{$x:t},(function(e,r){var a=r[0];return{$x:function(){return e.divStrict(X(1).sub(a.toFloat().square()).sqrt())}}}))}}),jm=T({asinh_:function(n){var t=E(n,"x","asinh");return M.runKernelFunc((function(e,r){var a=e.asinh(t);return r([t]),a}),{$x:t},(function(e,r){var a=r[0];return{$x:function(){return e.divStrict(X(1).add(a.toFloat().square()).sqrt())}}}))}}),qm=T({atan_:function(n){var t=E(n,"x","atan");return M.runKernelFunc((function(e,r){var a=e.atan(t);return r([t]),a}),{$x:t},(function(e,r){var a=r[0];return{$x:function(){return e.div(a.toFloat().square().add(1))}}}))}}),Xm=T({atanh_:function(n){var t=E(n,"x","atanh");return M.runKernelFunc((function(e,r){var a=e.atanh(t);return r([t]),a}),{$x:t},(function(e,r){var a=r[0];return{$x:function(){return e.div(X(1).sub(a.toFloat().square()))}}}))}}),Km=T({ceil_:function(n){var t=E(n,"x","ceil");return M.runKernelFunc((function(e){return e.ceil(t)}),{$x:t},(function(e){return{$x:function(){return Ee(e)}}}))}}),Mi=T({clipByValue_:function(n,t,e){var r=E(n,"x","clipByValue");I(t<=e,(function(){return"Error in clip: min ("+t+") must be less than or equal to max ("+e+")."}));var a=[r],o={min:t,max:e};return M.runKernelFunc((function(i,s){var u=i.clip(r,t,e);return s([r]),u}),{x:r},(function(i,s){var u=s[0];return{x:function(){return i.where(u.greaterEqual(t).logicalAnd(u.lessEqual(e)),Ee(i))}}}),"ClipByValue",o,a)}}),Ym=T({cos_:function(n){var t=E(n,"x","cos"),e=[t];return M.runKernelFunc((function(r,a){var o=r.cos(t);return a([t]),o}),{x:t},(function(r,a){var o=a[0];return{x:function(){return o.toFloat().sin().neg().mul(r)}}}),"Cos",{},e)}}),$m=T({cosh_:function(n){var t=E(n,"x","cosh");return M.runKernelFunc((function(e,r){var a=e.cosh(t);return r([t]),a}),{$x:t},(function(e,r){var a=r[0];return{$x:function(){return a.toFloat().sinh().mulStrict(e)}}}))}}),Jm=T({erf_:function(n){var t=E(n,"x","erf");return I(t.dtype==="int32"||t.dtype==="float32",(function(){return"Input dtype must be `int32` or `float32`."})),t.dtype==="int32"&&(t=t.toFloat()),M.runKernelFunc((function(e,r){var a=e.erf(t);return r([t]),a}),{$x:t},(function(e,r){var a=r[0];return{$x:function(){return e.mul(a.square().neg().exp().mul(2/Math.sqrt(Math.PI)))}}}))}}),oi=T({exp_:function(n){var t=E(n,"x","exp");return M.runKernelFunc((function(e,r){var a=e.exp(t);return r([a]),a}),{x:t},(function(e,r){return{x:function(){return e.mulStrict(r[0])}}}),"Exp",{},[],[!0])}}),Qm=T({expm1_:function(n){var t=E(n,"x","expm1");return M.runKernelFunc((function(e,r){var a=e.expm1(t);return r([t]),a}),{$x:t},(function(e,r){var a=r[0];return{$x:function(){return e.mul(a.exp())}}}))}}),Zm=T({floor_:function(n){var t=E(n,"x","floor");return M.runKernelFunc((function(e){return e.floor(t)}),{$x:t},(function(e){return{$x:function(){return Ee(e)}}}))}}),eg=T({log_:function(n){var t=E(n,"x","log"),e=[t];return M.runKernelFunc((function(r,a){var o=r.log(t);return a([t]),o}),{x:t},(function(r,a){var o=a[0];return{x:function(){return r.div(o.toFloat())}}}),"Log",{},e)}}),tg=T({log1p_:function(n){var t=E(n,"x","log1p");return M.runKernelFunc((function(e,r){var a=e.log1p(t);return r([t]),a}),{$x:t},(function(e,r){var a=r[0];return{$x:function(){return e.div(a.add(1))}}}))}}),ng=T({logSigmoid_:function(n){var t=E(n,"x","logSigmoid");return M.runKernelFunc((function(e,r){var a=e.softplus(t.neg()).neg();return r([t]),a}),{$x:t},(function(e,r){var a=r[0];return{$x:function(){return e.mul(a.neg().sigmoid())}}}))}}),za=T({neg_:function(n){var t=E(n,"x","neg"),e=[t];return M.runKernelFunc((function(r){return r.neg(t)}),{x:t},(function(r){return{x:function(){return r.neg()}}}),"Neg",{},e)}}),rg=T({reciprocal_:function(n){var t=E(n,"x","reciprocal");return M.runKernelFunc((function(e,r){var a=e.reciprocal(t);return r([t]),a}),{$x:t},(function(e,r){var a=r[0];return{$x:function(){return e.div(a.square().neg())}}}))}}),ag=T({round_:function(n){var t=E(n,"x","round");return M.runKernelFunc((function(e){return e.round(t)}),{$x:t},(function(e){return{$x:function(){return Ee(e)}}}))}}),Uc=T({rsqrt_:function(n){var t=E(n,"x","rsqrt"),e=[t];return M.runKernelFunc((function(r,a){var o=r.rsqrt(t);return a([t]),o}),{x:t},(function(r,a){var o=a[0];return{x:function(){return r.div(o.pow(1.5).mul(2)).neg()}}}),"Rsqrt",{},e)}}),Wc=T({sigmoid_:function(n){var t=E(n,"x","sigmoid");return M.runKernelFunc((function(e,r){var a=e.sigmoid(t);return r([a]),a}),{x:t},(function(e,r){var a=r[0];return{x:function(){return e.mul(a.mul(X(1).sub(a)))}}}),"Sigmoid")}}),og=T({sign_:function(n){var t=E(n,"x","sign");return M.runKernelFunc((function(e){return e.sign(t)}),{$x:t},(function(e){return{$x:function(){return Ee(e)}}}))}}),ig=T({isNaN_:function(n){var t=E(n,"x","isNaN");return M.runKernelFunc((function(e){return e.isNaN(t)}),{$x:t},(function(e){return{$x:function(){return Ee(e)}}}))}}),sg=T({isInf_:function(n){var t=E(n,"x","isInf");return M.runKernelFunc((function(e){return e.isInf(t)}),{$x:t},(function(e){return{$x:function(){return Ee(e)}}}))}}),ug=T({isFinite_:function(n){var t=E(n,"x","isFinite");return M.runKernelFunc((function(e){return e.isFinite(t)}),{$x:t},(function(e){return{$x:function(){return Ee(e)}}}))}}),cg=T({sin_:function(n){var t=E(n,"x","sin"),e=[t];return M.runKernelFunc((function(r,a){var o=r.sin(t);return a([t]),o}),{x:t},(function(r,a){var o=a[0];return{x:function(){return o.toFloat().cos().mul(r)}}}),"Sin",{},e)}}),lg=T({sinh_:function(n){var t=E(n,"x","sinh");return M.runKernelFunc((function(e,r){var a=e.sinh(t);return r([t]),a}),{$x:t},(function(e,r){var a=r[0];return{$x:function(){return a.toFloat().cosh().mulStrict(e)}}}))}}),hg=T({softplus_:function(n){var t=E(n,"x","softplus");return M.runKernelFunc((function(e,r){var a=e.softplus(t);return r([t]),a}),{$x:t},(function(e,r){var a=r[0];return{$x:function(){return e.mul(a.sigmoid())}}}))}}),fg=T({sqrt_:function(n){var t=E(n,"x","sqrt");return M.runKernelFunc((function(e,r){var a=e.sqrt(t);return r([t]),a}),{$x:t},(function(e,r){var a=r[0];return{$x:function(){return e.div(a.toFloat().sqrt().mul(2))}}}))}}),dg=T({step_:function(n,t){t===void 0&&(t=0);var e=E(n,"x","step");return M.runKernelFunc((function(r){return r.step(e,t)}),{$x:e},(function(r){return{$x:function(){return Ee(r)}}}))}}),pg=T({tan_:function(n){var t=E(n,"x","tan");return M.runKernelFunc((function(e,r){var a=e.tan(t);return r([t]),a}),{$x:t},(function(e,r){var a=r[0];return{$x:function(){return e.div(a.cos().square())}}}))}}),vg=T({tanh_:function(n){var t=E(n,"x","tanh");return M.runKernelFunc((function(e,r){var a=e.tanh(t);return r([a]),a}),{x:t},(function(e,r){var a=r[0];return{x:function(){return X(1).sub(a.square()).mulStrict(e)}}}),"Tanh",{},null,[!0])}});function zc(n,t,e,r,a,o){var i,s,u=E(n,"x","batchNorm"),c=E(t,"mean","batchNorm"),l=E(e,"variance","batchNorm");return a!=null&&(i=E(a,"scale","batchNorm")),r!=null&&(s=E(r,"offset","batchNorm")),I(u.rank===2,(function(){return"Error in batchNorm3D: x must be rank 3 but got rank "+u.rank+"."})),I(c.rank===2||c.rank===1,(function(){return"Error in batchNorm2D: mean must be rank 2 or rank 1 but got rank "+c.rank+"."})),I(l.rank===2||l.rank===1,(function(){return"Error in batchNorm2D: variance must be rank 2 or rank 1 but got rank "+l.rank+"."})),i!=null&&I(i.rank===2||i.rank===1,(function(){return"Error in batchNorm2D: scale must be rank 2 or rank 1 but got rank "+i.rank+"."})),s!=null&&I(s.rank===2||s.rank===1,(function(){return"Error in batchNorm2D: offset must be rank 2 or rank 1 but got rank "+s.rank+"."})),Xr(u,c,l,s,i,o)}function Vc(n,t,e,r,a,o){var i,s,u=E(n,"x","batchNorm"),c=E(t,"mean","batchNorm"),l=E(e,"variance","batchNorm");return a!=null&&(i=E(a,"scale","batchNorm")),r!=null&&(s=E(r,"offset","batchNorm")),I(u.rank===3,(function(){return"Error in batchNorm3D: x must be rank 3 but got rank "+u.rank+"."})),I(c.rank===3||c.rank===1,(function(){return"Error in batchNorm3D: mean must be rank 3 or rank 1 but got rank "+c.rank+"."})),I(l.rank===3||l.rank===1,(function(){return"Error in batchNorm3D: variance must be rank 3 or rank 1 but got rank "+l.rank+"."})),i!=null&&I(i.rank===3||i.rank===1,(function(){return"Error in batchNorm3D: scale must be rank 3 or rank 1 but got rank "+i.rank+"."})),s!=null&&I(s.rank===3||s.rank===1,(function(){return"Error in batchNorm3D: offset must be rank 3 or rank 1 but got rank "+s.rank+"."})),Xr(u,c,l,s,i,o)}function Gc(n,t,e,r,a,o){var i,s,u=E(n,"x","batchNorm"),c=E(t,"mean","batchNorm"),l=E(e,"variance","batchNorm");return a!=null&&(i=E(a,"scale","batchNorm")),r!=null&&(s=E(r,"offset","batchNorm")),I(u.rank===4,(function(){return"Error in batchNorm4D: x must be rank 4 but got rank "+u.rank+"."})),I(c.rank===4||c.rank===1,(function(){return"Error in batchNorm4D: mean must be rank 4 or rank 1 but got rank "+c.rank+"."})),I(l.rank===4||l.rank===1,(function(){return"Error in batchNorm4D: variance must be rank 4 or rank 1 but got rank "+l.rank+"."})),i!=null&&I(i.rank===4||i.rank===1,(function(){return"Error in batchNorm4D: scale must be rank 4 or rank 1 but got rank "+i.rank+"."})),s!=null&&I(s.rank===4||s.rank===1,(function(){return"Error in batchNorm4D: offset must be rank 4 or rank 1 but got rank "+s.rank+"."})),Xr(u,c,l,s,i,o)}function Xr(n,t,e,r,a,o){o==null&&(o=.001);var i,s,u,c=E(n,"x","batchNorm"),l=E(t,"mean","batchNorm"),h=E(e,"variance","batchNorm");a!=null&&(i=E(a,"scale","batchNorm")),r!=null&&(s=E(r,"offset","batchNorm")),I(l.rank===h.rank,(function(){return"Batch normalization gradient requires mean and variance to have equal ranks."})),I(s==null||l.rank===s.rank,(function(){return"Batch normalization gradient requires mean and offset to have equal ranks."})),I(i==null||l.rank===i.rank,(function(){return"Batch normalization gradient requires mean and scale to have equal ranks."})),u=c.rank===0||c.rank===1?c.as4D(1,1,1,c.size):c.rank===2?c.as4D(1,1,c.shape[0],c.shape[1]):c.rank===3?c.as4D(1,c.shape[0],c.shape[1],c.shape[2]):c;var f=[c,l,h,i];return M.runKernelFunc((function(d,p){var v=d.batchNormalization(u,pa(l),pa(h),o,pa(i),pa(s));return p([c,l,h,i]),v}),{x:c,mean:l,variance:h,scale:i,offset:s},(function(d,p){var v=p,m=v[0],g=v[1],y=v[2],b=v[3],x=b??X(1),w=qe(g.shape,u.shape),C=[];if(g.rank===1){for(var k=0;k<u.shape.length-1;++k)C.push(u.shape[k]);C.push(1)}var S=m.sub(g),_=d.mul(x),R=Uc(y.add(X(o))),D=R.mul(R).mul(R).mul(X(-.5));return{x:function(){return g.rank===1?d.mul(dr(R.as4D(1,1,1,g.shape[0]),C)).mul(x).reshape(m.shape):d.mul(R).mul(x).reshape(m.shape)},mean:function(){var A=R.mul(X(-1)).mul(_);return g.rank===1&&(A=A.sum(w)),A.reshape(g.shape)},variance:function(){var A=D.mul(S).mul(_);return g.rank===1&&(A=A.sum(w)),A.reshape(g.shape)},scale:function(){var A=S.mul(R),O=d.mul(A);return g.rank===1&&(O=O.sum(w)),O.reshape(g.shape)},offset:function(){var A=d;return g.rank===1&&(A=A.sum(w)),A.reshape(g.shape)}}}),"BatchNormalization",{varianceEpsilon:o},f).reshape(c.shape)}function pa(n){return n==null?null:n.rank===0?n.as1D():n.rank===1?n:n.rank===2?n.as4D(1,1,n.shape[0],n.shape[1]):n.rank===3?n.as4D(1,n.shape[0],n.shape[1],n.shape[2]):n}function Za(){ac("tf.batchNormalization() is going away. Use tf.batchNorm() instead, and note the positional argument change of scale, offset, and varianceEpsilon")}var mg=T({batchNormalization2d_:function(n,t,e,r,a,o){return r===void 0&&(r=.001),Za(),zc(n,t,e,o,a,r)}}),gg=T({batchNormalization3d_:function(n,t,e,r,a,o){return r===void 0&&(r=.001),Za(),Vc(n,t,e,o,a,r)}}),yg=T({batchNormalization4d_:function(n,t,e,r,a,o){return r===void 0&&(r=.001),Za(),Gc(n,t,e,o,a,r)}}),xg=T({batchNormalization_:function(n,t,e,r,a,o){return r===void 0&&(r=.001),Za(),Xr(n,t,e,o,a,r)}}),Hc=T({batchNorm_:Xr}),bg=T({batchNorm2d_:zc}),wg=T({batchNorm3d_:Vc}),Cg=T({batchNorm4d_:Gc}),eo=T({logicalAnd_:function(n,t){var e=E(n,"a","logicalAnd","bool"),r=E(t,"b","logicalAnd","bool");return we(e.shape,r.shape),M.runKernelFunc((function(a){return a.logicalAnd(e,r)}),{a:e,b:r},null,"LogicalAnd")}}),Eg=T({logicalNot_:function(n){var t=E(n,"x","logicalNot","bool");return M.runKernelFunc((function(e){return e.logicalNot(t)}),{$x:t})}}),jc=T({logicalOr_:function(n,t){var e=E(n,"a","logicalOr","bool"),r=E(t,"b","logicalOr","bool");return we(e.shape,r.shape),M.runKernelFunc((function(a){return a.logicalOr(e,r)}),{$a:e,$b:r})}}),_g=T({logicalXor_:function(n,t){var e=E(n,"a","logicalXor","bool"),r=E(t,"b","logicalXor","bool");return we(e.shape,r.shape),jc(n,t).logicalAnd(eo(n,t).logicalNot())}}),Kn=T({where_:function(n,t,e){var r=E(t,"a","where"),a=E(e,"b","where"),o=E(n,"condition","where","bool");return ke(r.shape,a.shape,"Error in where: "),o.rank===1?I(o.shape[0]===r.shape[0],(function(){return"The first dimension of `a` must match the size of `condition`."})):ke(o.shape,a.shape,"Error in where: "),M.runKernelFunc((function(i,s){var u=i.select(o,r,a);return s([o]),u}),{$condition:o,$a:r,$b:a},(function(i,s){var u=s[0];return{$condition:function(){return Ee(u).toFloat()},$a:function(){return i.mul(u.cast(i.dtype))},$b:function(){return i.mul(u.logicalNot().cast(i.dtype))}}}))}}),qc=function(n){return $(this,void 0,void 0,(function(){var t,e,r;return J(this,(function(a){switch(a.label){case 0:return[4,(t=E(n,"condition","whereAsync","bool")).data()];case 1:return e=a.sent(),r=ki(t.shape,e),n!==t&&t.dispose(),[2,r]}}))}))},xe=T({add_:function(n,t){var e,r=E(n,"a","add"),a=E(t,"b","add");e=Le(r,a),r=e[0],a=e[1];var o=we(r.shape,a.shape);return M.runKernelFunc((function(i){return i.add(r,a)}),{a:r,b:a},(function(i){return{a:function(){var s=i,u=qe(r.shape,o);return u.length>0&&(s=s.sum(u)),s.reshape(r.shape)},b:function(){var s=i,u=qe(a.shape,o);return u.length>0&&(s=s.sum(u)),s.reshape(a.shape)}}}),"Add")}}),Sg=T({addN_:function(n){I(Array.isArray(n),(function(){return"The argument passed to tf.addN() must be a list of tensors"})),I(n.length>=1,(function(){return"Must pass at least one tensor to tf.addN(), but got "+n.length}));var t=n.map((function(a,o){return E(a,"tensors"+o,"addN")})),e=t[0];t.forEach((function(a){if(a.dtype!==e.dtype)throw new Error("All tensors passed to tf.addN() must have the same dtype")})),t.forEach((function(a){if(!Qe(a.shape,e.shape))throw new Error("All tensors passed to tf.addN() must have the same shape")}));var r=t;return M.runKernelFunc((function(a){return a.addN(t)}),r,(function(a){var o={};return t.forEach((function(i,s){o[s]=function(){return a.clone()}})),o}),"AddN")}}),Rg=T({addStrict_:function(n,t){var e=E(n,"a","addStrict"),r=E(t,"b","addStrict");return ke(e.shape,r.shape,"Error in addStrict: "),e.add(r)}}),Ig=T({atan2_:function(n,t){var e,r=E(n,"a","atan2"),a=E(t,"b","atan2");e=Le(r,a),r=e[0],a=e[1];var o=we(r.shape,a.shape);return M.runKernelFunc((function(i,s){var u=i.atan2(r,a);return s([r,a]),u}),{$a:r,$b:a},(function(i,s){var u=s[0],c=s[1];return{$a:function(){var l=xe(u.square(),c.square()),h=i.mul(c.div(l)),f=qe(u.shape,o);return f.length>0&&(h=h.sum(f)),h.reshape(u.shape)},$b:function(){var l=xe(u.square(),c.square()),h=za(i.mul(u.div(l))),f=qe(c.shape,o);return f.length>0&&(h=h.sum(f)),h.reshape(c.shape)}}}))}}),Wt=T({div_:function(n,t){var e,r=E(n,"a","div"),a=E(t,"b","div");if(e=Le(r,a),r=e[0],a=e[1],r.dtype==="int32"&&a.dtype==="int32")return Xc(r,a);var o=we(r.shape,a.shape);return M.runKernelFunc((function(i,s){var u=i.realDivide(r,a);return s([r,a]),u}),{a:r,b:a},(function(i,s){var u=s[0],c=s[1];return{a:function(){var l=i.div(c.toFloat()),h=qe(u.shape,o);return h.length>0?l.sum(h).reshape(u.shape):l},b:function(){var l=i.mul(u.toFloat()),h=qe(c.shape,o);h.length>0&&(l=l.sum(h).reshape(c.shape));var f=c.square();return l.div(f.toFloat()).neg()}}}),"Div")}}),kg=T({divNoNan_:function(n,t){var e,r=E(n,"a","div"),a=E(t,"b","div");r=(e=Le(r,a))[0],a=e[1];var o=Wt(r,a),i=Ee(o),s=a.equal(i);return Kn(s,i,o)}}),Tg=T({divStrict_:function(n,t){var e=E(n,"a","div"),r=E(t,"b","div");return ke(e.shape,r.shape,"Error in divideStrict: "),e.div(r)}}),Xc=T({floorDiv_:function(n,t){var e,r=E(n,"a","floorDiv"),a=E(t,"b","floorDiv");e=Le(r,a),r=e[0],a=e[1];var o=we(r.shape,a.shape);return M.runKernelFunc((function(i,s){var u=i.floorDiv(r,a);return s([r,a]),u}),{a:r,b:a},(function(i,s){var u=s[0],c=s[1];return{a:function(){var l=i.div(c.toFloat()),h=qe(u.shape,o);return h.length>0?l.sum(h).reshape(u.shape):l},b:function(){var l=i.mul(u.toFloat()),h=qe(c.shape,o);h.length>0&&(l=l.sum(h).reshape(c.shape));var f=c.square();return l.div(f.toFloat()).neg()}}}),"FloorDiv")}}),Ni=T({maximum_:function(n,t){var e,r=E(n,"a","maximum"),a=E(t,"b","maximum");return e=Le(r,a),r=e[0],a=e[1],r.dtype==="bool"&&(r=r.toInt(),a=a.toInt()),we(r.shape,a.shape),M.runKernelFunc((function(o,i){var s=o.maximum(r,a);return i([r,a]),s}),{a:r,b:a},(function(o,i){var s=i[0],u=i[1];return{a:function(){return o.mul(s.greaterEqual(u).toFloat())},b:function(){return o.mul(s.less(u).toFloat())}}}),"Maximum")}}),Ag=T({maximumStrict_:function(n,t){var e=E(n,"a","maximumStrict"),r=E(t,"b","maximumStrict");return ke(e.shape,r.shape,"Error in maximumStrict: "),e.maximum(r)}}),Kc=T({minimum_:function(n,t){var e,r=E(n,"a","minimum"),a=E(t,"b","minimum");return e=Le(r,a),r=e[0],a=e[1],r.dtype==="bool"&&(r=r.toInt(),a=a.toInt()),we(r.shape,a.shape),M.runKernelFunc((function(o,i){var s=o.minimum(r,a);return i([r,a]),s}),{a:r,b:a},(function(o,i){var s=i[0],u=i[1];return{a:function(){return o.mul(s.lessEqual(u).toFloat())},b:function(){return o.mul(s.greater(u).toFloat())}}}),"Minimum")}}),Dg=T({minimumStrict_:function(n,t){var e=E(n,"a","minimumStrict"),r=E(t,"b","minimumStrict");return ke(e.shape,r.shape,"Error in minimumStrict: "),e.minimum(r)}}),Mg=T({mod_:function(n,t){var e,r=E(n,"a","mod"),a=E(t,"b","mod");e=Le(r,a),r=e[0],a=e[1];var o=we(r.shape,a.shape);return M.runKernelFunc((function(i,s){var u=i.mod(r,a);return s([r,a]),u}),{$a:r,$b:a},(function(i,s){var u=s[0],c=s[1];return{$a:function(){var l=qe(u.shape,o);return l.length>0?i.sum(l).reshape(u.shape):i},$b:function(){var l=i.mul(u.div(c).floor().neg()),h=qe(c.shape,o);return h.length>0?l.sum(h).reshape(c.shape):l}}}))}}),Ng=T({modStrict_:function(n,t){var e=E(n,"a","modStrict"),r=E(t,"b","modStrict");return ke(e.shape,r.shape,"Error in modStrict: "),e.mod(r)}}),ct=T({mul_:function(n,t){var e,r=E(n,"a","mul"),a=E(t,"b","mul");e=Le(r,a),r=e[0],a=e[1];var o=we(r.shape,a.shape);return M.runKernelFunc((function(i,s){var u=i.multiply(r,a);return s([r,a]),u}),{a:r,b:a},(function(i,s){var u=s[0],c=s[1];return{a:function(){var l=i.mul(c.toFloat()),h=qe(u.shape,o);return h.length>0?l.sum(h).reshape(u.shape):l},b:function(){var l=i.mul(u.toFloat()),h=qe(c.shape,o);return h.length>0?l.sum(h).reshape(c.shape):l}}}),"Mul")}}),Fg=T({mulStrict_:function(n,t){var e=E(n,"a","mul"),r=E(t,"b","mul");return ke(e.shape,r.shape,"Error in multiplyStrict: "),e.mul(r)}}),Va=T({pow_:function(n,t){var e,r=E(n,"base","pow"),a=E(t,"exp","pow");e=Le(r,a),r=e[0],a=e[1];var o=we(r.shape,a.shape),i=[r,a];return M.runKernelFunc((function(s,u){var c=s.pow(r,a);return u([r,a,c]),c}),{a:r,b:a},(function(s,u){var c=u[0],l=u[1],h=u[2];return{a:function(){var f=l.toFloat(),d=s.mul(f.mul(c.pow(f.sub(X(1))))),p=qe(c.shape,o);return p.length>0&&(d=d.sum(p)),d.reshape(c.shape)},b:function(){var f=c.greater(0),d=c.log().where(f,Ee(c)),p=s.mul(h.mul(d)),v=qe(l.shape,o);return v.length>0&&(p=p.sum(v)),p.reshape(l.shape)}}}),"Pow",{},i,[!0])}}),Pg=T({powStrict_:function(n,t){return ke(n.shape,t.shape,"Error in powStrict: "),n.pow(t)}}),Bg=T({squaredDifferenceStrict_:function(n,t){var e=E(n,"a","squaredDifferenceStrict"),r=E(t,"b","squaredDifferenceStrict");return ke(e.shape,r.shape,"Error in squaredDifferenceStrict: "),e.squaredDifference(r)}}),Xe=T({sub_:function(n,t){var e,r=E(n,"a","sub"),a=E(t,"b","sub");e=Le(r,a),r=e[0],a=e[1];var o=we(r.shape,a.shape);return M.runKernelFunc((function(i){return i.subtract(r,a)}),{a:r,b:a},(function(i){return{a:function(){var s=i,u=qe(r.shape,o);return u.length>0&&(s=s.sum(u)),s.reshape(r.shape)},b:function(){var s=i,u=qe(a.shape,o);return u.length>0&&(s=s.sum(u)),s.neg().reshape(a.shape)}}}),"Sub")}}),Og=T({subStrict_:function(n,t){var e=E(n,"a","subStrict"),r=E(t,"b","subStrict");return ke(e.shape,r.shape,"Error in subStrict: "),e.sub(r)}}),Yc=T({equal_:function(n,t){var e,r=E(n,"a","equal"),a=E(t,"b","equal");return e=Le(r,a),r=e[0],a=e[1],we(r.shape,a.shape),M.runKernelFunc((function(o){return o.equal(r,a)}),{$a:r,$b:a})}}),Lg=T({equalStrict_:function(n,t){var e=E(n,"a","equalStrict"),r=E(t,"b","equalStrict");return ke(e.shape,r.shape,"Error in equalStrict: "),e.equal(r)}}),Ug=T({greater_:function(n,t){var e,r=E(n,"a","greater"),a=E(t,"b","greater");return e=Le(r,a),r=e[0],a=e[1],we(r.shape,a.shape),M.runKernelFunc((function(o){return o.greater(r,a)}),{a:r,b:a},null,"Greater")}}),$c=T({greaterEqual_:function(n,t){var e,r=E(n,"a","greaterEqual"),a=E(t,"b","greaterEqual");return e=Le(r,a),r=e[0],a=e[1],we(r.shape,a.shape),M.runKernelFunc((function(o,i){var s=o.greaterEqual(r,a);return i([r,a]),s}),{a:r,b:a},(function(o,i){var s=i[0],u=i[1];return{a:function(){return Ee(s)},b:function(){return Ee(u)}}}),"GreaterEqual")}}),Wg=T({greaterEqualStrict_:function(n,t){var e=E(n,"a","greaterEqualStrict"),r=E(t,"b","greaterEqualStrict");return ke(e.shape,r.shape,"Error in greaterEqualStrict: "),e.greaterEqual(r)}}),zg=T({greaterStrict_:function(n,t){var e=E(n,"a","greaterStrict"),r=E(t,"b","greaterStrict");return ke(e.shape,r.shape,"Error in greaterStrict: "),e.greater(r)}}),Vg=T({less_:function(n,t){var e,r=E(n,"a","less"),a=E(t,"b","less");return e=Le(r,a),r=e[0],a=e[1],we(r.shape,a.shape),M.runKernelFunc((function(o){return o.less(r,a)}),{a:r,b:a},null,"Less")}}),Gg=T({lessEqual_:function(n,t){var e,r=E(n,"a","lessEqual"),a=E(t,"b","lessEqual");return e=Le(r,a),r=e[0],a=e[1],we(r.shape,a.shape),M.runKernelFunc((function(o,i){var s=o.lessEqual(r,a);return i([r,a]),s}),{a:r,b:a},null,"LessEqual")}}),Hg=T({lessEqualStrict_:function(n,t){var e=E(n,"a","lessEqualStrict"),r=E(t,"b","lessEqualStrict");return ke(e.shape,r.shape,"Error in lessEqualStrict: "),e.lessEqual(r)}}),jg=T({lessStrict_:function(n,t){var e=E(n,"a","lessStrict"),r=E(t,"b","lessStrict");return ke(e.shape,r.shape,"Error in lessStrict: "),e.less(r)}}),qg=T({notEqual_:function(n,t){var e,r=E(n,"a","notEqual"),a=E(t,"b","notEqual");return e=Le(r,a),r=e[0],a=e[1],we(r.shape,a.shape),M.runKernelFunc((function(o){return o.notEqual(r,a)}),{a:r,b:a},null,"NotEqual")}}),Xg=T({notEqualStrict_:function(n,t){var e=E(n,"a","notEqualStrict"),r=E(t,"b","notEqualStrict");return ke(e.shape,r.shape,"Error in notEqualStrict: "),e.notEqual(r)}});function au(n,t){for(var e=[],r=n;r<t;++r)e.push(r);return e}function ou(n){for(var t=[],e=0;e<n.length;++e)for(var r=0;r<n[e].length;++r)t.push(n[e][r]);return t}var Fi=T({gather_:function(n,t,e){e===void 0&&(e=0);var r=E(n,"x","gather"),a=E(t,"indices","gather","int32");e=Ke(e,r.shape)[0];var o=(function(i,s,u){for(var c=i.shape[u],l=[],h=1,f=1,d=0;d<u;d++)l.push(i.shape[d]),h*=i.shape[d];for(d=0;d<s.rank;d++)l.push(s.shape[d]);for(d=u+1;d<i.rank;d++)l.push(i.shape[d]),f*=i.shape[d];return{batchSize:h,sliceSize:f,dimSize:c,outputShape:l}})(r,a,e);return M.runKernelFunc((function(i,s){var u=i.gather(r,a.flatten(),e);return s([a]),u}),{x:r,indices:a},(function(i,s){var u=s[0];return{x:function(){var c=r.shape,l=u.size,h=c.slice(0,e),f=h.length,d=c.slice(e,c.length).slice(1),p=d.length,v=au(0,f),m=au(f+1,f+1+p),g=ou([h,[l],d]),y=i.reshape(g),b=u.reshape([l]),x=ou([[f],v,m]),w=y.transpose(x),C=Jc(w,b,r.shape[e]),k=bi(x);return C=C.transpose(k)},indices:function(){return u}}}),"Gather",{axis:e}).reshape(o.outputShape)}}),Jc=T({unsortedSegmentSum_:function(n,t,e){var r=E(n,"x","unsortedSegmentSum"),a=E(t,"segmentIds","unsortedSegmentSum","int32");return I(ze(e),(function(){return"numSegments must be of dtype int"})),M.runKernelFunc((function(o,i){var s=o.unsortedSegmentSum(r,a,e);return i([a]),s}),{$x:r},(function(o,i){var s=i[0];return{$x:function(){return(function(u,c){for(var l=Ni(c,Ee(c)),h=Fi(u,l),f=$c(c,X(0,"int32")),d=h.rank-f.rank,p=0;p<d;++p)f=Ft(f,p+1);f=eo(f,Rr(h.shape,"bool"));var v=Ee(h);return Kn(f,h,v)})(o,s)}}}))}}),Kg=function(n,t,e){return $(this,void 0,void 0,(function(){var r,a,o,i,s,u,c,l,h,f,d,p,v;return J(this,(function(m){switch(m.label){case 0:for(r=E(n,"tensor","boolMask"),a=E(t,"mask","boolMask","bool"),o=e??0,i=a.rank,s=r.shape,I(i>0,(function(){return"mask cannot be scalar"})),ke(s.slice(o,o+i),a.shape,"mask's shape must match the first K dimensions of tensor's shape,"),u=1,c=o;c<o+i;c++)u*=s[c];return l=s.slice(0,o).concat([u],s.slice(o+i)),h=r.reshape(l),f=a.reshape([-1]),[4,qc(f)];case 1:return d=m.sent(),p=d.squeeze([1]),v=Fi(h,p,o),n!==r&&r.dispose(),t!==a&&a.dispose(),p.dispose(),h.dispose(),f.dispose(),d.dispose(),[2,v]}}))}))};function Qc(n,t,e,r,a,o,i){o===void 0&&(o="NHWC"),I(n.length===t.rank,(function(){return"Length of inShape ("+n.length+") and rank of dy ("+t.rank+") must match"}));var s=n,u=t,c=!1;t.rank===3&&(c=!0,u=t.as4D(1,t.shape[0],t.shape[1],t.shape[2]),s=[1,n[0],n[1],n[2]]),I(s.length===4,(function(){return"Error in conv2dDerInput: inShape must be length 4, but got length "+s.length+"."})),I(u.rank===4,(function(){return"Error in conv2dDerInput: dy must be rank 4, but got rank "+u.rank})),I(e.rank===4,(function(){return"Error in conv2dDerInput: filter must be rank 4, but got rank "+e.rank}));var l=o==="NHWC"?s[3]:s[1],h=o==="NHWC"?u.shape[3]:u.shape[1];I(l===e.shape[2],(function(){return"Error in conv2dDerInput: depth of input ("+l+") must match input depth for filter "+e.shape[2]+"."})),I(h===e.shape[3],(function(){return"Error in conv2dDerInput: depth of output ("+h+") must match output depth for filter "+e.shape[3]+"."})),i!=null&&I(ze(a),(function(){return"Error in conv2dDerInput: pad must be an integer when using, dimRoundingMode "+i+" but got pad "+a+"."}));var f=Si(o),d=Qn(s,e.shape,r,1,a,i,!1,f),p=M.runKernelFunc((function(v,m){var g=v.conv2dDerInput(u,e,d);return m([e,u]),g}),{dy4D:u,filter:e},(function(v,m){var g=m[0],y=m[1];return{dy4D:function(){return Ot(v,g,r,a,o,1,i)},filter:function(){return Pi(v,y,g.shape,r,a,o,i)}}}));return c?p.as3D(p.shape[1],p.shape[2],p.shape[3]):p}function Mo(n){var t=(function(o){return typeof o=="number"?[o,o,o]:o.length===2?[o[0],o[1],1]:o})(n),e=t[0],r=t[1],a=t[2];return e===1&&r===1&&a===1}function Zc(n,t,e,r,a){I(n.length===t.rank,(function(){return"Length of inShape ("+n.length+") and rank of dy ("+t.rank+") must match"}));var o=n,i=t,s=!1;t.rank===4&&(s=!0,i=t.as5D(1,t.shape[0],t.shape[1],t.shape[2],t.shape[3]),o=[1,n[0],n[1],n[2],n[3]]);var u=o[4],c=i.shape[4];I(o.length===5,(function(){return"Error in conv3dDerInput: inShape must be length 5, but got length "+o.length+"."})),I(i.rank===5,(function(){return"Error in conv3dDerInput: dy must be rank 5, but got rank "+i.rank})),I(e.rank===5,(function(){return"Error in conv3dDerInput: filter must be rank 5, but got rank "+e.rank})),I(u===e.shape[3],(function(){return"Error in conv3dDerInput: depth of input ("+u+") must match input depth for filter "+e.shape[3]+"."})),I(c===e.shape[4],(function(){return"Error in conv3dDerInput: depth of output ("+c+") must match output depth for filter "+e.shape[4]+"."}));var l=Ua(o,e.shape,r,1,a),h=M.runKernelFunc((function(f){return f.conv3dDerInput(i,e,l)}),{dy5D:i});return s?h.as4D(h.shape[1],h.shape[2],h.shape[3],h.shape[4]):h}var Yg=T({conv1d_:function(n,t,e,r,a,o,i){a===void 0&&(a="NWC"),o===void 0&&(o=1);var s=E(n,"x","conv1d"),u=E(t,"filter","conv1d"),c=s,l=!1;s.rank===2&&(l=!0,c=s.as3D(1,s.shape[0],s.shape[1])),I(c.rank===3,(function(){return"Error in conv1d: input must be rank 3, but got rank "+c.rank+"."})),I(u.rank===3,(function(){return"Error in conv1d: filter must be rank 3, but got rank "+u.rank+"."})),i!=null&&I(ze(r),(function(){return"Error in conv1d: pad must be an integer when using, dimRoundingMode "+i+" but got pad "+r+"."})),I(c.shape[2]===u.shape[1],(function(){return"Error in conv1d: depth of input ("+c.shape[2]+") must match input depth for filter "+u.shape[1]+"."})),I(wt(e,o),(function(){return"Error in conv1D: Either stride or dilation must be 1. Got stride "+e+" and dilation '"+o+"'"})),I(a==="NWC",(function(){return"Error in conv1d: got dataFormat of "+a+" but only NWC is currently supported."}));var h=u.as4D(1,u.shape[0],u.shape[1],u.shape[2]),f=c.as4D(c.shape[0],1,c.shape[1],c.shape[2]),d=Ot(f,h,[1,e],r,"NHWC",[1,o],i);return l?d.as2D(d.shape[2],d.shape[3]):d.as3D(d.shape[0],d.shape[2],d.shape[3])}}),Ot=T({conv2d_:function(n,t,e,r,a,o,i){a===void 0&&(a="NHWC"),o===void 0&&(o=[1,1]);var s=E(n,"x","conv2d"),u=E(t,"filter","conv2d"),c=s,l=!1;s.rank===3&&(l=!0,c=s.as4D(1,s.shape[0],s.shape[1],s.shape[2])),I(c.rank===4,(function(){return"Error in conv2d: input must be rank 4, but got rank "+c.rank+"."})),I(u.rank===4,(function(){return"Error in conv2d: filter must be rank 4, but got rank "+u.rank+"."})),i!=null&&I(ze(r),(function(){return"Error in conv2d: pad must be an integer when using, dimRoundingMode "+i+" but got pad "+r+"."}));var h=a==="NHWC"?c.shape[3]:c.shape[1];I(h===u.shape[2],(function(){return"Error in conv2d: depth of input ("+h+") must match input depth for filter "+u.shape[2]+"."})),I(wt(e,o),(function(){return"Error in conv2D: Either strides or dilations must be 1. Got strides "+e+" and dilations '"+o+"'"}));var f=Si(a),d=Qn(c.shape,u.shape,e,o,r,i,!1,f),p=[u,c],v=M.runKernelFunc((function(m,g){var y=m.conv2d(c,u,d);return g([u,c]),y}),{x:c,filter:u},(function(m,g){var y=g,b=y[0],x=y[1];return I(Er(o),(function(){return"Error in gradient of conv2D: dilation rates greater than 1 are not yet supported in gradients. Got dilations '"+o+"'"})),{x:function(){return el(x.shape,m,b,e,r,a)},filter:function(){return Pi(x,m,b.shape,e,r,a)}}}),"Conv2D",d,p);return l?v.as3D(v.shape[1],v.shape[2],v.shape[3]):v}}),$g=T({conv3d_:function(n,t,e,r,a,o){a===void 0&&(a="NDHWC"),o===void 0&&(o=[1,1,1]);var i=E(n,"x","conv3d"),s=E(t,"filter","conv3d"),u=i,c=!1;i.rank===4&&(c=!0,u=i.as5D(1,i.shape[0],i.shape[1],i.shape[2],i.shape[3])),I(u.rank===5,(function(){return"Error in conv3d: input must be rank 5, but got rank "+u.rank+"."})),I(s.rank===5,(function(){return"Error in conv3d: filter must be rank 5, but got rank "+s.rank+"."})),I(u.shape[4]===s.shape[3],(function(){return"Error in conv3d: depth of input ("+u.shape[4]+") must match input depth for filter "+s.shape[3]+"."})),I((function(f,d){return Mo(f)||Mo(d)})(e,o),(function(){return"Error in conv3D: Either strides or dilations must be 1. Got strides "+e+" and dilations '"+o+"'"})),I(a==="NDHWC",(function(){return"Error in conv3d: got dataFormat of "+a+" but only NDHWC is currently supported."}));var l=Ua(u.shape,s.shape,e,o,r),h=M.runKernelFunc((function(f,d){var p=f.conv3d(u,s,l);return d([u,s]),p}),{x:u,$filter:s},(function(f,d){I(Mo(o),(function(){return"Error in gradient of conv3D: dilation rates greater than 1 are not yet supported in gradients. Got dilations '"+o+"'"}));var p=d[0],v=d[1];return{x:function(){return Zc(p.shape,f,v,e,r)},$filter:function(){return(function(m,g,y,b,x){var w=m;m.rank===4&&(w=m.as5D(1,m.shape[0],m.shape[1],m.shape[2],m.shape[3]));var C=g;C.rank===4&&(C=g.as5D(1,g.shape[0],g.shape[1],g.shape[2],g.shape[3])),I(w.rank===5,(function(){return"Error in conv3dDerFilter: input must be rank 5, but got shape "+w.shape+"."})),I(C.rank===5,(function(){return"Error in conv3dDerFilter: dy must be rank 5, but got shape "+C.shape+"."})),I(y.length===5,(function(){return"Error in conv3dDerFilter: filterShape must be length 5, but got "+y+"."})),I(w.shape[4]===y[3],(function(){return"Error in conv3dDerFilter: depth of input "+w.shape[4]+") must match input depth in filter ("+y[3]+"."})),I(C.shape[4]===y[4],(function(){return"Error in conv3dDerFilter: depth of dy ("+C.shape[4]+") must match output depth for filter ("+y[4]+")."}));var k=Ua(w.shape,y,b,1,x);return M.runKernelFunc((function(S){return S.conv3dDerFilter(w,C,k)}),{x5D:w,dy5D:C})})(p,f,v.shape,e,r)}}}));return c?h.as4D(h.shape[1],h.shape[2],h.shape[3],h.shape[4]):h}}),Pi=T({conv2dDerFilter_:function(n,t,e,r,a,o,i){o===void 0&&(o="NHWC");var s=n;n.rank===3&&(s=n.as4D(1,n.shape[0],n.shape[1],n.shape[2]));var u=t;u.rank===3&&(u=t.as4D(1,t.shape[0],t.shape[1],t.shape[2])),I(s.rank===4,(function(){return"Error in conv2dDerFilter: input must be rank 4, but got shape "+s.shape+"."})),I(u.rank===4,(function(){return"Error in conv2dDerFilter: dy must be rank 4, but got shape "+u.shape+"."})),I(e.length===4,(function(){return"Error in conv2dDerFilter: filterShape must be length 4, but got "+e+"."}));var c=o==="NHWC"?s.shape[3]:s.shape[1],l=o==="NHWC"?u.shape[3]:u.shape[1];I(c===e[2],(function(){return"Error in conv2dDerFilter: depth of input "+c+") must match input depth in filter ("+e[2]+"."})),I(l===e[3],(function(){return"Error in conv2dDerFilter: depth of dy ("+l+") must match output depth for filter ("+e[3]+")."})),i!=null&&I(ze(a),(function(){return"Error in conv2dDerFilter: pad must be an integer when using, dimRoundingMode "+i+" but got pad "+a+"."}));var h=Si(o),f=Qn(s.shape,e,r,1,a,i,!1,h);return M.runKernelFunc((function(d){return d.conv2dDerFilter(s,u,f)}),{x4D:s,dy4D:u})}}),el=T({conv2dDerInput_:Qc}),to=T({depthwiseConv2d_:function(n,t,e,r,a,o,i){o===void 0&&(o=[1,1]);var s=E(n,"x","depthwiseConv2d"),u=E(t,"filter","depthwiseConv2d"),c=s,l=!1;s.rank===3&&(l=!0,c=s.as4D(1,s.shape[0],s.shape[1],s.shape[2])),I(c.rank===4,(function(){return"Error in depthwiseConv2d: input must be rank 4, but got rank "+c.rank+"."})),I(u.rank===4,(function(){return"Error in depthwiseConv2d: filter must be rank 4, but got rank "+u.rank+"."})),I(c.shape[3]===u.shape[2],(function(){return"Error in depthwiseConv2d: number of input channels ("+c.shape[3]+") must match the inChannels dimension in filter "+u.shape[2]+"."})),o==null&&(o=[1,1]),I(wt(e,o),(function(){return"Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides "+e+" and dilations '"+o+"'"})),i!=null&&I(ze(r),(function(){return"Error in depthwiseConv2d: pad must be an integer when using, dimRoundingMode "+i+" but got pad "+r+"."}));var h=Qn(c.shape,u.shape,e,o,r,i,!0),f=[c,u],d=M.runKernelFunc((function(p,v){var m=p.depthwiseConv2D(c,u,h);return v([c,u]),m}),{x:c,filter:u},(function(p,v){I(Er(o),(function(){return"Error in gradient of depthwiseConv2d: dilation rates greater than 1 are not yet supported. Got dilations '"+o+"'"}));var m=v[0],g=v[1];return{x:function(){return tl(m.shape,p,g,h)},filter:function(){return nl(m,p,g.shape,h)}}}),"DepthwiseConv2dNative",h,f);return l?d.as3D(d.shape[1],d.shape[2],d.shape[3]):d}}),tl=T({depthwiseConv2dDerInput_:function(n,t,e,r){var a=t,o=!1;t.rank===3&&(o=!0,a=t.as4D(1,t.shape[0],t.shape[1],t.shape[2]));var i=M.runKernelFunc((function(s){return s.depthwiseConv2DDerInput(a,e,r)}),{dy4D:a});return o?i.as3D(i.shape[1],i.shape[2],i.shape[3]):i}}),nl=T({depthwiseConv2dDerFilter_:function(n,t,e,r){var a=n;n.rank===3&&(a=n.as4D(1,n.shape[0],n.shape[1],n.shape[2]));var o=t;return o.rank===3&&(o=t.as4D(1,t.shape[0],t.shape[1],t.shape[2])),M.runKernelFunc((function(i){return i.depthwiseConv2DDerFilter(a,o,r)}),{x4D:a,dy4D:o})}}),Bi=T({separableConv2d_:function(n,t,e,r,a,o,i){o===void 0&&(o=[1,1]),i===void 0&&(i="NHWC");var s=E(n,"x","separableConv2d"),u=E(t,"depthwiseFilter","separableConv2d"),c=E(e,"pointwiseFilter","separableConv2d"),l=s,h=!1;if(s.rank===3&&(h=!0,l=s.as4D(1,s.shape[0],s.shape[1],s.shape[2])),i==="NCHW")throw new Error("separableConv2d currently does not support dataFormat NCHW; only NHWC is supported");I(l.rank===4,(function(){return"Error in separableConv2d: input must be rank 4, but got rank "+l.rank+"."})),I(u.rank===4,(function(){return"Error in separableConv2d: depthwise filter must be rank 4, but got rank "+u.rank+"."})),I(c.rank===4,(function(){return"Error in separableConv2d: pointwise filter must be rank 4, but got rank "+u.rank+"."})),I(c.shape[0]===1,(function(){return"Error in separableConv2d: the first dimension of pointwise filter  must be 1, but got "+c.shape[0]+"."})),I(c.shape[1]===1,(function(){return"Error in separableConv2d: the second dimension of pointwise filter must be 1, but got "+c.shape[1]+"."}));var f=u.shape[2],d=u.shape[3];I(c.shape[2]===f*d,(function(){return"Error in separableConv2d: the third dimension of pointwise filter must be "+f*d+", but got "+c.shape[2]+"."}));var p=to(l,u,r,a,i,o),v=Ot(p,c,1,"valid",i);return h?v.as3D(v.shape[1],v.shape[2],v.shape[3]):v}}),Jg=T({conv2dTranspose_:function(n,t,e,r,a,o){return Qc(e,E(n,"x","conv2dTranspose"),E(t,"filter","conv2dTranspose"),r,a,"NHWC",o)}}),Qg=T({conv3dTranspose_:function(n,t,e,r,a){return Zc(e,E(n,"x","conv3dTranspose"),E(t,"filter","conv3dTranspose"),r,a)}}),no=T({matMul_:function(n,t,e,r){var a;e===void 0&&(e=!1),r===void 0&&(r=!1);var o=E(n,"a","matMul"),i=E(t,"b","matMul");a=Le(o,i),o=a[0],i=a[1];var s=e?o.shape[o.rank-2]:o.shape[o.rank-1],u=r?i.shape[i.rank-1]:i.shape[i.rank-2],c=e?o.shape[o.rank-1]:o.shape[o.rank-2],l=r?i.shape[i.rank-2]:i.shape[i.rank-1],h=o.shape.slice(0,-2),f=i.shape.slice(0,-2),d=Z(h),p=Z(f);I(o.rank>=2&&i.rank>=2&&o.rank===i.rank,(function(){return"Error in matMul: inputs must have the same rank of at least 2, got ranks "+o.rank+" and "+i.rank+"."})),I(Qe(h,f),(function(){return"Error in matMul: outer dimensions ("+h+") and ("+f+") of Tensors with shapes "+o.shape+" and "+i.shape+" must match."})),I(s===u,(function(){return"Error in matMul: inner shapes ("+s+") and ("+u+") of Tensors with shapes "+o.shape+" and "+i.shape+" and transposeA="+e+" and transposeB="+r+" must match."}));var v=o.shape.slice(0,-2).concat([c,l]),m=e?o.as3D(d,s,c):o.as3D(d,c,s),g=r?i.as3D(p,l,u):i.as3D(p,u,l),y={transposeA:e,transposeB:r};return M.runKernelFunc((function(b,x){var w=b.batchMatMul(m,g,e,r);return x([m,g]),w}),{a:m,b:g},(function(b,x){var w=x,C=w[0],k=w[1];return e||r?!e&&r?{a:function(){return b.matMul(k,!1,!1)},b:function(){return b.matMul(C,!0,!1)}}:e&&!r?{a:function(){return k.matMul(b,!1,!0)},b:function(){return C.matMul(b,!1,!1)}}:{a:function(){return k.matMul(b,!0,!0)},b:function(){return b.matMul(C,!0,!0)}}:{a:function(){return b.matMul(k,!1,!0)},b:function(){return C.matMul(b,!0,!1)}}}),"BatchMatMul",y).reshape(v)}}),Zg=T({dot_:function(n,t){var e=E(n,"t1","dot"),r=E(t,"t2","dot");I(!(e.rank!==1&&e.rank!==2||r.rank!==1&&r.rank!==2),(function(){return"Error in dot: inputs must all be rank 1 or 2, but got ranks "+e.rank+" and "+r.rank+"."}));var a=e.rank===1?e.size:e.shape[1],o=r.rank===1?r.size:r.shape[0];return I(a===o,(function(){return"Error in dot: inner dimensions of inputs must match, but got "+a+" and "+o+"."})),e.rank===1&&r.rank===1?e.as2D(1,-1).matMul(r.as2D(-1,1)).asScalar():e.rank===1&&r.rank===2?e.as2D(1,-1).matMul(r.as2D(r.shape[0],r.shape[1])).as1D():e.rank===2&&r.rank===1?e.matMul(r.as2D(-1,1)).as1D():e.matMul(r.as2D(r.shape[0],r.shape[1]))}}),e0=T({outerProduct_:function(n,t){var e=E(n,"v1","outerProduct"),r=E(t,"v2","outerProduct");return I(e.rank===1&&r.rank===1,(function(){return"Error in outerProduct: inputs must be rank 1, but got ranks "+e.rank+" and "+r.rank+"."})),e.as2D(-1,1).matMul(r.as2D(1,-1))}}),Kr=T({reverse_:function(n,t){var e=E(n,"x","reverse");if(e.rank===0)return e.clone();var r=Ke(t,e.shape);return M.runKernelFunc((function(a){return a.reverse(e,r)}),{$x:e},(function(a){return{$x:function(){return a.reverse(r)}}})).reshapeAs(e)}}),t0=T({reverse1d_:function(n){var t=E(n,"x","reverse");return I(t.rank===1,(function(){return"Error in reverse1D: x must be rank 1 but got rank "+t.rank+"."})),Kr(t,0)}}),n0=T({reverse2d_:function(n,t){var e=E(n,"x","reverse");return I(e.rank===2,(function(){return"Error in reverse2D: x must be rank 2 but got rank "+e.rank+"."})),Kr(e,t)}}),r0=T({reverse3d_:function(n,t){var e=E(n,"x","reverse");return I(e.rank===3,(function(){return"Error in reverse3D: x must be rank 3 but got rank "+e.rank+"."})),Kr(e,t)}}),a0=T({reverse4d_:function(n,t){var e=E(n,"x","reverse");return I(e.rank===4,(function(){return"Error in reverse4D: x must be rank 4 but got rank "+e.rank+"."})),Kr(e,t)}});function rl(n,t,e,r,a,o){var i=E(n,"x","maxPool"),s=i,u=!1;i.rank===3&&(u=!0,s=i.as4D(1,i.shape[0],i.shape[1],i.shape[2])),I(s.rank===4,(function(){return"Error in maxPool: input must be rank 4 but got rank "+s.rank+"."})),I(wt(e,r),(function(){return"Error in maxPool: Either strides or dilations must be 1. Got strides "+e+" and dilations '"+r+"'"})),o!=null&&I(ze(a),(function(){return"Error in maxPool: pad must be an integer when using, dimRoundingMode "+o+" but got pad "+a+"."}));var c=Ur(s.shape,t,e,r,a,o);if(c.filterWidth===1&&c.filterHeight===1&&Qe(c.inShape,c.outShape))return i.clone();var l=[s],h=M.runKernelFunc((function(f,d){var p=f.maxPool(s,c);return d([s,p]),p}),{x:s},(function(f,d){var p=d[0],v=d[1];return{x:function(){return(function(m,g,y,b,x,w,C,k){var S=E(m,"dy","maxPoolBackprop"),_=E(g,"input","maxPoolBackprop"),R=E(y,"output","maxPoolBackprop");I(_.rank===S.rank,(function(){return"Rank of input ("+_.rank+") does not match rank of dy ("+S.rank+")"})),I(wt(x,w),(function(){return"Error in maxPoolBackProp: Either strides or dilations must be 1. Got strides "+x+" and dilations '"+w+"'"})),I(S.rank===4,(function(){return"Error in maxPoolBackprop: dy must be rank 4 but got rank "+S.rank+"."})),I(_.rank===4,(function(){return"Error in maxPoolBackprop: input must be rank 4 but got rank "+_.rank+"."}));var D=Ur(_.shape,b,x,w,C,k);return M.runKernelFunc((function(A){return A.maxPoolBackprop(S,_,R,D)}),{$dy:S,$input:_})})(f,p,v,t,e,r,a)}}}),"MaxPool",c,l);return u?h.as3D(h.shape[1],h.shape[2],h.shape[3]):h}function al(n,t,e,r,a,o){var i=E(n,"x","avgPool","float32");I(wt(e,r),(function(){return"Error in avgPool: Either strides or dilations must be 1. Got strides "+e+" and dilations '"+r+"'"}));var s=i,u=!1;i.rank===3&&(u=!0,s=i.as4D(1,i.shape[0],i.shape[1],i.shape[2])),I(s.rank===4,(function(){return"Error in avgPool: x must be rank 4 but got rank "+s.rank+"."})),o!=null&&I(ze(a),(function(){return"Error in avgPool: pad must be an integer when using, dimRoundingMode "+o+" but got pad "+a+"."}));var c=Ur(s.shape,t,e,r,a,o);if(c.filterWidth===1&&c.filterHeight===1&&Qe(c.inShape,c.outShape))return i.clone();var l=M.runKernelFunc((function(h){return h.avgPool(s,c)}),{x:s},(function(h){return{x:function(){return(function(f,d,p,v,m,g){var y=E(f,"dy","avgPoolBackprop"),b=E(d,"input","avgPoolBackprop");I(b.rank===y.rank,(function(){return"Rank of input ("+b.rank+") does not match rank of dy ("+y.rank+")"})),I(wt(v,m),(function(){return"Error in avgPoolBackprop: Either strides or dilations must be 1. Got strides "+v+" and dilations '"+m+"'"}));var x=b,w=y,C=!1;b.rank===3&&(C=!0,x=b.as4D(1,b.shape[0],b.shape[1],b.shape[2]),w=y.as4D(1,y.shape[0],y.shape[1],y.shape[2])),I(w.rank===4,(function(){return"Error in avgPoolBackprop: dy must be rank 4 but got rank "+w.rank+"."})),I(x.rank===4,(function(){return"Error in avgPoolBackprop: input must be rank 4 but got rank "+x.rank+"."}));var k=Ur(x.shape,p,v,m,g),S=M.runKernelFunc((function(_){return _.avgPoolBackprop(w,x,k)}),{dy4D:w,input4D:x});return C?S.as3D(S.shape[1],S.shape[2],S.shape[3]):S})(h,s,t,e,r,a)}}}),"AvgPool",c);return l=l.cast(i.dtype),u?l.as3D(l.shape[1],l.shape[2],l.shape[3]):l}var Je=T({maxPool_:function(n,t,e,r,a){return rl(n,t,e,1,r,a)}}),Yr=T({avgPool_:function(n,t,e,r,a){return al(n,t,e,1,r,a)}}),o0=T({pool_:function(n,t,e,r,a,o){a==null&&(a=[1,1]),o==null&&(o=1),r===0&&(r="valid");var i=E(n,"x","maxPool"),s=i,u=!1;i.rank===3&&(u=!0,s=i.as4D(1,i.shape[0],i.shape[1],i.shape[2])),I(wt(o,a),(function(){return"Error in pool: Either strides or dilations must be 1. Got strides "+o+" and dilations '"+a+"'"}));var c,l=Ur(s.shape,t,o,a,r),h=[l.dilationHeight,l.dilationWidth];c=r==="same"?(function(x,w){var C=x.map((function(_,R){return _+(_-1)*(w[R]-1)})).map((function(_){return _-1})),k=C.map((function(_){return Math.floor(_/2)})),S=C.map((function(_,R){return _-k[R]}));return C.map((function(_,R){return[k[R],S[R]]}))})([l.filterHeight,l.filterWidth],h):[[0,0],[0,0]];var f=h[0]===1&&h[1]===1,d=(function(x,w,C){var k=C.map((function(P){return P[0]})),S=C.map((function(P){return P[1]})),_=x.concat(k,S),R=w.map((function(P,F){return(P-_[F]%P)%P})),D=S.map((function(P,F){return P+R[F]})),A=w.map((function(P,F){return[k[F],D[F]]})),O=w.map((function(P,F){return[0,R[F]]}));return[A,O]})([l.inHeight,l.inWidth],h,c),p=d[0],v=d[1],m=f?r:"valid",g=f?s:lc(s,h,p),y=(e==="avg"?function(){return al(g,t,o,1,m)}:function(){return rl(g,t,o,1,m)})(),b=f?y:sc(y,h,v);return u?b.as3D(b.shape[1],b.shape[2],b.shape[3]):b}}),i0=T({maxPool3d_:function(n,t,e,r,a,o,i){o===void 0&&(o="NDHWC");var s=E(n,"x","maxPool3d"),u=s,c=!1;s.rank===4&&(c=!0,u=s.as5D(1,s.shape[0],s.shape[1],s.shape[2],s.shape[3])),i==null&&(i=[1,1,1]),I(u.rank===5,(function(){return"Error in maxPool3d: x must be rank 5 but got rank "+u.rank+"."})),I(o==="NDHWC",(function(){return"Error in maxPool3d: Only NDHWC is currently supported, but got dataFormat of "+o})),I(wt(e,i),(function(){return"Error in maxPool3d: Either strides or dilations must be 1. Got strides "+e+" and dilations '"+i+"'"})),a!=null&&I(ze(r),(function(){return"Error in maxPool3d: pad must be an integer when using, dimRoundingMode "+a+" but got pad "+r+"."}));var l=La(u.shape,t,e,i,r,a,o),h=M.runKernelFunc((function(f,d){var p=f.maxPool3d(u,l);return d([u,p]),p}),{x:u},(function(f,d){var p=d[0],v=d[1];return{x:function(){return(function(m,g,y,b,x,w,C,k){var S=E(m,"dy","maxPool3dBackprop"),_=E(g,"input","maxPool3dBackprop"),R=E(y,"output","maxPool3dBackprop"),D=S,A=_,O=R,P=!1;_.rank===4&&(P=!0,D=S.as5D(1,S.shape[0],S.shape[1],S.shape[2],S.shape[3]),A=_.as5D(1,_.shape[0],_.shape[1],_.shape[2],_.shape[3]),O=R.as5D(1,R.shape[0],R.shape[1],R.shape[2],R.shape[3])),I(D.rank===5,(function(){return"Error in maxPool3dBackprop: dy must be rank 5 but got rank "+D.rank+"."})),I(A.rank===5,(function(){return"Error in maxPool3dBackprop: input must be rank 5 but got rank "+A.rank+"."})),I(O.rank===5,(function(){return"Error in maxPool3dBackprop: output must be rank 5 but got rank "+O.rank+"."})),w==null&&(w=[1,1,1]),I(wt(x,w),(function(){return"Error in maxPool3dBackprop: Either strides or dilations must be 1. Got strides "+x+" and dilations '"+w+"'"})),k!=null&&I(ze(C),(function(){return"Error in maxPool3dBackprop: pad must be an integer when using, dimRoundingMode "+k+" but got pad "+C+"."}));var F=La(A.shape,b,x,w,C,k),V=M.runKernelFunc((function(z){return z.maxPool3dBackprop(D,A,O,F)}),{dy5D:D,input5D:A});return P?V.as4D(V.shape[1],V.shape[2],V.shape[3],V.shape[4]):V})(f,p,v,t,e,i,r,a)}}}));return c?h.as4D(h.shape[1],h.shape[2],h.shape[3],h.shape[4]):h}}),s0=T({avgPool3d_:function(n,t,e,r,a,o,i){o===void 0&&(o="NDHWC");var s=E(n,"x","avgPool3d","float32"),u=s,c=!1;s.rank===4&&(c=!0,u=s.as5D(1,s.shape[0],s.shape[1],s.shape[2],s.shape[3])),i==null&&(i=[1,1,1]),I(u.rank===5,(function(){return"Error in avgPool3d: x must be rank 5 but got rank "+u.rank+"."})),I(o==="NDHWC",(function(){return"Error in avgPool3d: Only NDHWC is currently supported, but got dataFormat of "+o})),I(wt(e,i),(function(){return"Error in avgPool3d: Either strides or dilations must be 1. Got strides "+e+" and dilations '"+i+"'"})),a!=null&&I(ze(r),(function(){return"Error in avgPool3d: pad must be an integer when using, dimRoundingMode "+a+" but got pad "+r+"."}));var l=La(u.shape,t,e,i,r,a,o),h=M.runKernelFunc((function(f){return f.avgPool3d(u,l)}),{x:u},(function(f){return{x:function(){return(function(d,p,v,m,g,y,b){var x=E(d,"dy","avgPool3dBackprop"),w=E(p,"input","avgPool3dBackprop"),C=x,k=w,S=!1;w.rank===4&&(S=!0,C=x.as5D(1,x.shape[0],x.shape[1],x.shape[2],x.shape[3]),k=w.as5D(1,w.shape[0],w.shape[1],w.shape[2],w.shape[3])),I(C.rank===5,(function(){return"Error in avgPool3dBackprop: dy must be rank 5 but got rank "+C.rank+"."})),I(k.rank===5,(function(){return"Error in avgPool3dBackprop: input must be rank 5 but got rank "+k.rank+"."})),g==null&&(g=[1,1,1]),I(wt(m,g),(function(){return"Error in avgPool3dBackprop: Either strides or dilations must be 1. Got strides "+m+" and dilations '"+g+"'"})),b!=null&&I(ze(y),(function(){return"Error in maxPool3dBackprop: pad must be an integer when using, dimRoundingMode "+b+" but got pad "+y+"."}));var _=La(k.shape,v,m,g,y,b),R=M.runKernelFunc((function(D){return D.avgPool3dBackprop(C,k,_)}),{dy5D:C,input5D:k});return S?R.as4D(R.shape[1],R.shape[2],R.shape[3],R.shape[4]):R})(f,u,t,e,i,r,a)}}}));return h=h.cast(u.dtype),c?h.as4D(h.shape[1],h.shape[2],h.shape[3],h.shape[4]):h}}),an=T({slice_:function(n,t,e){var r,a,o=E(n,"x","slice");if(o.rank===0)throw new Error("Slicing scalar is not possible");(r=typeof t=="number"?[t].concat(new Array(o.rank-1).fill(0)):t.length<o.rank?t.concat(new Array(o.rank-t.length).fill(0)):t.slice()).forEach((function(u){I(u!==-1,(function(){return"slice() does not support negative begin indexing."}))})),a=(a=e==null?new Array(o.rank).fill(-1):typeof e=="number"?[e].concat(new Array(o.rank-1).fill(-1)):e.length<o.rank?e.concat(new Array(o.rank-e.length).fill(-1)):e).map((function(u,c){return u>=0?u:(I(u===-1,(function(){return"Negative size values should be exactly -1 but got "+u+" for the slice() size at index "+c+"."})),o.shape[c]-r[c])})),Pp(o,r,a);var i=o.shape,s={begin:r,size:a};return M.runKernelFunc((function(u){return u.slice(o,r,a)}),{x:o},(function(u){for(var c=[],l=0;l<u.rank;l++)c.push([r[l],i[l]-r[l]-a[l]]);return{x:function(){return u.pad(c)}}}),"Slice",s)}}),u0=T({slice1d_:function(n,t,e){var r=E(n,"x","slice1d");return I(r.rank===1,(function(){return"slice1d expects a rank-1 tensor, but got a rank-"+r.rank+" tensor"})),an(r,[t],[e])}}),c0=T({slice2d_:function(n,t,e){var r=E(n,"x","slice2d");return I(r.rank===2,(function(){return"slice2d expects a rank-2 tensor, but got a rank-"+r.rank+" tensor"})),an(r,t,e)}}),ol=T({slice3d_:function(n,t,e){var r=E(n,"x","slice3d");return I(r.rank===3,(function(){return"slice3d expects a rank-3 tensor, but got a rank-"+r.rank+" tensor"})),an(r,t,e)}}),l0=T({slice4d_:function(n,t,e){var r=E(n,"x","slice4d");return I(r.rank===4,(function(){return"slice4d expects a rank-4 tensor, but got a rank-"+r.rank+" tensor"})),an(r,t,e)}});function il(n,t,e,r,a){return t.rank<e.rank&&(t=t.reshape(bt(t.shape,r))),n.rank<e.rank&&(n=n.reshape(bt(n.shape,r))),{x:function(){var o=n.mul(e.equal(t).cast(n.dtype));return a==null?o:o.transpose(a)}}}var h0=T({all_:function(n,t,e){t===void 0&&(t=null),e===void 0&&(e=!1);var r=E(n,"x","all","bool"),a=Ke(t,r.shape),o=a,i=sn(o,r.rank);i!=null&&(r=r.transpose(i),o=un(o.length,r.rank));var s=M.runKernelFunc((function(c){return c.all(r,o)}),{$x:r});if(e){var u=bt(s.shape,a);return s.reshape(u)}return s}}),f0=T({any_:function(n,t,e){t===void 0&&(t=null),e===void 0&&(e=!1);var r=E(n,"x","any","bool"),a=Ke(t,r.shape),o=a,i=sn(o,r.rank);i!=null&&(r=r.transpose(i),o=un(o.length,r.rank));var s=M.runKernelFunc((function(c){return c.any(r,o)}),{$x:r});if(e){var u=bt(s.shape,a);return s.reshape(u)}return s}}),d0=T({argMax_:function(n,t){t===void 0&&(t=0);var e=E(n,"x","argMax");t==null&&(t=0);var r=Ke(t,e.shape),a=sn(r,e.rank);a!=null&&(e=e.transpose(a),r=un(r.length,e.rank));var o={axis:r[0]},i=[e];return M.runKernelFunc((function(s,u){var c=s.argMax(e,r[0]);return u([e]),c}),{x:e},(function(s,u){var c=u[0];return{x:function(){return Ee(c)}}}),"ArgMax",o,i)}}),p0=T({argMin_:function(n,t){t===void 0&&(t=0);var e=E(n,"x","argMin");t==null&&(t=0);var r=Ke(t,e.shape),a=sn(r,e.rank);return a!=null&&(e=e.transpose(a),r=un(r.length,e.rank)),M.runKernelFunc((function(o,i){var s=o.argMin(e,r[0]);return i([e]),s}),{$x:e},(function(o,i){var s=i[0];return{$x:function(){return Ee(s)}}}))}}),v0=T({logSumExp_:function(n,t,e){t===void 0&&(t=null),e===void 0&&(e=!1);var r=E(n,"x","logSumExp"),a=Ke(t,r.shape),o=r.max(a,!0),i=r.sub(o).exp().sum(a).log(),s=o.reshape(i.shape).add(i);if(e){var u=bt(s.shape,a);return s.reshape(u)}return s}}),ro=T({max_:function(n,t,e){t===void 0&&(t=null),e===void 0&&(e=!1);var r=E(n,"x","max"),a=r,o=Ke(t,r.shape),i=o,s=sn(i,r.rank);s!=null&&(r=r.transpose(s),i=un(i.length,r.rank));var u=[r],c=M.runKernelFunc((function(h,f){var d=h.max(r,i);return f([a,d]),d}),{x:r},(function(h,f){return il(h,f[1],f[0],o,s)}),"Max",{axes:i},u,[!0]);if(e){var l=bt(c.shape,o);c=c.reshape(l)}return c}}),m0=T({mean_:function(n,t,e){t===void 0&&(t=null),e===void 0&&(e=!1);var r=E(n,"x","mean"),a=Ke(t,r.shape),o=Z(ot(r.shape,a)[1]);return Qa((function(i){var s=X(o);return{value:(s.dtype===i.dtype?i:i.cast(s.dtype)).div(s).sum(t,e),gradFunc:function(u){var c=i.shape.slice();return a.forEach((function(l){c[l]=1})),u.reshape(c).mul(Rr(i.shape,"float32")).div(o)}}}))(r)}}),g0=T({min_:function(n,t,e){t===void 0&&(t=null),e===void 0&&(e=!1);var r=E(n,"x","min"),a=r,o=Ke(t,r.shape),i=o,s=sn(i,r.rank);s!=null&&(r=r.transpose(s),i=un(i.length,r.rank));var u=[r],c=M.runKernelFunc((function(h,f){var d=h.min(r,i);return f([a,d]),d}),{x:r},(function(h,f){return il(h,f[1],f[0],o,s)}),"Min",{axes:i},u,[!0]);if(e){var l=bt(c.shape,o);c=c.reshape(l)}return c}}),y0=T({moments_:function(n,t,e){t===void 0&&(t=null),e===void 0&&(e=!1);var r=Ke(t,(n=E(n,"x","moments")).shape),a=n.mean(r,e),o=a.shape;e||(o=bt(a.shape,r));var i=n.toFloat().sub(a.reshape(o)).square();return{mean:a,variance:i.mean(r,e)}}}),sl=T({sum_:function(n,t,e){t===void 0&&(t=null),e===void 0&&(e=!1);var r=E(n,"x","sum");r.dtype==="bool"&&(r=r.toInt());var a=Ke(t,r.shape);return Qa((function(o){var i=sn(a,o.rank),s=a,u=o;i!=null&&(u=o.transpose(i),s=un(s.length,o.rank));var c=function(d){var p=o.shape.slice();return a.forEach((function(v){p[v]=1})),d.reshape(p).mul(Rr(o.shape,"float32"))},l={axes:s},h=M.runKernelFunc((function(d){return d.sum(u,s)}),{x:u},(function(d){return{x:function(){return c(d)}}}),"Sum",l);if(e){var f=bt(h.shape,a);h=h.reshape(f)}return{value:h,gradFunc:c}}))(r)}}),x0=T({prod_:function(n,t,e){t===void 0&&(t=null),e===void 0&&(e=!1);var r=E(n,"x","prod");r.dtype==="bool"&&(r=r.toInt());var a=Ke(t,r.shape),o=sn(a,r.rank),i=a,s=r;o!=null&&(s=r.transpose(o),i=un(i.length,r.rank));var u=M.runKernelFunc((function(l){return l.prod(s,i)}),{permutedX:s});if(e){var c=bt(u.shape,a);u=u.reshape(c)}return u}}),ul=T({elu_:function(n){var t=E(n,"x","elu");return M.runKernelFunc((function(e,r){var a=e.elu(t);return r([a]),a}),{$x:t},(function(e,r){var a=r[0];return{$x:function(){return M.runKernelFunc((function(o){return o.eluDer(e,a)}),{dy:e,y:a})}}}))}}),b0=T({leakyRelu_:function(n,t){t===void 0&&(t=.2);var e=E(n,"x","leakyRelu");return Ni(X(t).mul(e),e)}}),cl=T({prelu_:function(n,t){var e=E(n,"x","prelu"),r=E(t,"alpha","prelu");return M.runKernelFunc((function(a,o){var i=a.prelu(e,r);return o([e,r]),i}),{x:e,alpha:r},(function(a,o){var i=o[0],s=o[1],u=i.greater(0);return{x:function(){return Kn(u,a,a.mul(s))},alpha:function(){var c=Kn(u,Ee(a),a.mul(i)),l=qe(s.shape,a.shape);return l.length>0&&(c=c.sum(l)),c.reshape(s.shape)}}}),"Prelu")}}),Oe=T({relu_:function(n){var t=E(n,"x","relu");return t.dtype==="bool"?t.toInt():M.runKernelFunc((function(e,r){var a=e.relu(t);return r([t]),a}),{x:t},(function(e,r){var a=r[0];return{x:function(){return e.mulStrict(a.step().toFloat())}}}),"Relu")}}),ll=T({relu6_:function(n){var t=E(n,"x","relu6");return t.dtype==="bool"?t.toInt():M.runKernelFunc((function(e,r){var a=e.relu6(t);return r([t]),a}),{x:t},(function(e,r){var a=r[0],o=a.lessEqual(6).mul(a.step());return{x:function(){return e.mulStrict(o.toFloat())}}}),"Relu6")}}),w0=T({selu_:function(n){var t=E(n,"x","selu");return M.runKernelFunc((function(e,r){var a=e.selu(t);return r([t]),a}),{$x:t},(function(e,r){var a=r[0];return{$x:function(){var o=a.greater(X(0)),i=X(Ai),s=X(Di),u=e.mul(s),c=e.mul(i).mul(a.toFloat().exp());return Kn(o,u,c)}}}))}}),Dn=T({transpose_:function(n,t){var e=E(n,"x","transpose");if(t==null&&(t=e.shape.map((function(a,o){return o})).reverse()),I(e.rank===t.length,(function(){return"Error in transpose: rank of input "+e.rank+" must match length of perm "+t+"."})),t.forEach((function(a){I(a>=0&&a<e.rank,(function(){return"All entries in 'perm' must be between 0 and "+(e.rank-1)+" but got "+t}))})),e.rank<=1)return e.clone();var r={perm:t};return M.runKernelFunc((function(a){return a.transpose(e,t)}),{x:e},(function(a){var o=bi(t);return{x:function(){return a.transpose(o)}}}),"Transpose",r)}}),C0=T({localResponseNormalization_:function(n,t,e,r,a){t===void 0&&(t=5),e===void 0&&(e=1),r===void 0&&(r=1),a===void 0&&(a=.5);var o=E(n,"x","localResponseNormalization");I(o.rank===4||o.rank===3,(function(){return`Error in localResponseNormalization: x must be rank 3 or 4 but got
               rank `+o.rank+"."})),I(ze(t),(function(){return"Error in localResponseNormalization: depthRadius must be an integer but got depthRadius "+t+"."}));var i=o,s=!1;o.rank===3&&(s=!0,i=o.as4D(1,o.shape[0],o.shape[1],o.shape[2]));var u=M.runKernelFunc((function(c,l){var h=c.localResponseNormalization4D(i,t,e,r,a);return l([i,h]),h}),{x4D:i},(function(c,l){var h=l[0],f=l[1];return{x4D:function(){return M.runKernelFunc((function(d){return d.LRNGrad(c,h,f,t,e,r,a)}),{})}}}));return s?u.as3D(u.shape[1],u.shape[2],u.shape[3]):u}}),hl=T({norm_:function(n,t,e,r){t===void 0&&(t="euclidean"),e===void 0&&(e=null),r===void 0&&(r=!1);var a=(function s(u,c,l){if(l===void 0&&(l=null),u.rank===0)return u.abs();if(u.rank!==1&&l===null)return s(u.reshape([-1]),c,l);if(u.rank===1||typeof l=="number"||Array.isArray(l)&&l.length===1){if(c===1)return u.abs().sum(l);if(c===1/0)return u.abs().max(l);if(c===-1/0)return u.abs().min(l);if(c==="euclidean"||c===2)return u.abs().pow(X(2,"int32")).sum(l).sqrt();throw new Error("Error in norm: invalid ord value: "+c)}if(Array.isArray(l)&&l.length===2){if(c===1)return u.abs().sum(l[0]).max(l[1]-1);if(c===1/0)return u.abs().sum(l[1]).max(l[0]);if(c===-1/0)return u.abs().sum(l[1]).min(l[0]);if(c==="fro"||c==="euclidean")return u.square().sum(l).sqrt();throw new Error("Error in norm: invalid ord value: "+c)}throw new Error("Error in norm: invalid axis: "+l)})(n=E(n,"x","norm"),t,e),o=a.shape;if(r){var i=Ke(e,n.shape);o=bt(a.shape,i)}return a.reshape(o)}}),E0=T({basicLSTMCell_:function(n,t,e,r,a,o){var i=E(n,"forgetBias","basicLSTMCell"),s=E(t,"lstmKernel","basicLSTMCell"),u=E(e,"lstmBias","basicLSTMCell"),c=E(r,"data","basicLSTMCell"),l=E(a,"c","basicLSTMCell"),h=E(o,"h","basicLSTMCell"),f=c.concat(h,1).matMul(s).add(u),d=f.shape[0],p=f.shape[1]/4,v=[d,p],m=f.slice([0,0],v),g=f.slice([0,p],v),y=f.slice([0,2*p],v),b=f.slice([0,3*p],v),x=m.sigmoid().mulStrict(g.tanh()).addStrict(l.mulStrict(i.add(y).sigmoid())),w=x.tanh().mulStrict(b.sigmoid());return[x,w]}}),_0=T({multiRNNCell_:function(n,t,e,r){for(var a=E(t,"data","multiRNNCell"),o=Ma(e,"c","multiRNNCell"),i=Ma(r,"h","multiRNNCell"),s=a,u=[],c=0;c<n.length;c++){var l=n[c](s,o[c],i[c]);u.push(l[0]),u.push(l[1]),s=l[1]}var h=[],f=[];for(c=0;c<u.length;c+=2)h.push(u[c]),f.push(u[c+1]);return[h,f]}}),S0=T({movingAverage_:function(n,t,e,r,a){a===void 0&&(a=!0);var o=E(n,"v","movingAverage"),i=E(t,"x","movingAverage"),s=E(e,"decay","movingAverage");Cd(o,i),I(Qe(o.shape,i.shape),(function(){return"Shape mismatch in v and x"}));var u=X(1),c=u.sub(s),l=i.sub(o).mul(c);if(a){I(r!=null,(function(){return"When using zeroDebias: true, step is required."}));var h=E(r,"step","movingAverage");l=l.div(u.sub(Va(s,h)))}return o.add(l)}}),R0=T({stridedSlice_:function(n,t,e,r,a,o,i,s,u){if(a===void 0&&(a=0),o===void 0&&(o=0),i===void 0&&(i=0),s===void 0&&(s=0),u===void 0&&(u=0),r==null&&(r=new Array(t.length)),i!==0)throw new Error("ellipsis mask is not yet supported");var c=E(n,"x","stridedSlice"),l=Ls(s),h=c.shape.slice();l.forEach((function(m){t[m]=0,e[m]=1,h.splice(m,0,1)})),c=c.reshape(h);for(var f=0;f<c.rank;f++)t[f]=Bp(a,t,r,c.shape,f),e[f]=Op(o,e,r,c.shape,f),r[f]=r[f]||1;var d=Ls(u);d.forEach((function(m){e[m]=t[m]+1,r[m]=1}));var p=_i(t,e,r),v=p.filter((function(m,g){return d.indexOf(g)===-1}));return r.every((function(m){return m===1}))?an(c,t,p).reshape(v):M.runKernelFunc((function(m){return m.stridedSlice(c,t,e,r)}),{$x:c}).reshape(v)}}),I0=T({topk_:function(n,t,e){t===void 0&&(t=1),e===void 0&&(e=!0);var r=E(n,"x","topk");if(r.rank===0)throw new Error("topk() expects the input to be of rank 1 or higher");var a=r.shape[r.shape.length-1];if(t>a)throw new Error("'k' passed to topk() must be <= the last dimension ("+a+") but got "+t);var o=M.runKernelFunc((function(i){return i.topk(r,t,e)}),{$x:r});return{values:o[0],indices:o[1]}}}),k0=T({scatterND_:function(n,t,e){var r=E(n,"indices","scatterND","int32"),a=E(t,"updates","scatterND");return Fp(a,r,e),M.runKernelFunc((function(o){return o.scatterND(r,a,e)}),{indices:r,updates:a},null,"ScatterNd",{shape:e})}}),Oi=T({fft_:function(n){I(n.dtype==="complex64",(function(){return"The dtype for tf.spectral.fft() must be complex64 but got "+n.dtype+"."}));var t=n.shape[n.shape.length-1],e=n.size/t,r=n.as2D(e,t);return M.runKernelFunc((function(a){return a.fft(r)}),{input:n}).reshape(n.shape)}}),Ga=T({ifft_:function(n){I(n.dtype==="complex64",(function(){return"The dtype for tf.spectral.ifft() must be complex64 but got "+n.dtype+"."}));var t=n.shape[n.shape.length-1],e=n.size/t,r=n.as2D(e,t);return M.runKernelFunc((function(a){return a.ifft(r)}),{input:n}).reshape(n.shape)}}),Li=T({rfft_:function(n,t){I(n.dtype==="float32",(function(){return"The dtype for rfft() must be real value but got "+n.dtype}));var e,r=n.shape[n.shape.length-1],a=n.size/r;if(t!=null&&t<r){var o=n.shape.map((function(g){return 0})),i=n.shape.map((function(g){return g}));i[n.shape.length-1]=t,e=n.slice(o,i),r=t}else if(t!=null&&t>r){var s=n.shape.map((function(g){return g}));s[n.shape.length-1]=t-r,e=n.concat(Ne(s),n.shape.length-1),r=t}else e=n;var u=e.zerosLike(),c=tt(e,u).as2D(a,r),l=Oi(c),h=Math.floor(r/2)+1,f=Pt(l),d=Qt(l),p=f.split([h,r-h],f.shape.length-1),v=d.split([h,r-h],d.shape.length-1),m=e.shape.slice();return m[e.shape.length-1]=h,tt(p[0],v[0]).reshape(m)}}),fl=T({irfft_:function(n){var t=n.shape[n.shape.length-1],e=n.size/t;if(t<=2){var r=n.as2D(e,t),a=Ga(r);return Pt(a)}var o=[e,2*(t-1)],i=Pt(n).as2D(e,t),s=Qt(n).as2D(e,t),u=i.slice([0,1],[e,t-2]).reverse(1),c=s.slice([0,1],[e,t-2]).reverse(1).mul(X(-1)),l=i.concat(u,1),h=s.concat(c,1);return r=tt(l,h).as2D(o[0],o[1]),a=Ga(r),Pt(a)}}),T0=Object.freeze({fft:Oi,ifft:Ga,rfft:Li,irfft:fl}),A0=T({sparseToDense_:function(n,t,e,r){r===void 0&&(r=0);var a=E(n,"sparseIndices","sparseToDense","int32"),o=E(t,"sparseValues","sparseToDense"),i=E(r,"defaultValue","sparseToDense",o.dtype);return(function(s,u,c,l){if(s.dtype!=="int32")throw new Error("tf.sparseToDense() expects the indices to be int32 type, but the dtype was "+s.dtype+".");if(s.rank>2)throw new Error("sparseIndices should be a scalar, vector, or matrix, but got shape "+s.shape+".");var h=s.rank>0?s.shape[0]:1,f=s.rank>1?s.shape[1]:1;if(c.length!==f)throw new Error("outputShape has incorrect number of elements:, "+c.length+", should be: "+f+".");var d=u.size;if(u.rank!==0&&(u.rank!==1||d!==h))throw new Error("sparseValues has incorrect shape "+u.shape+", should be [] or ["+h+"]");if(u.dtype!==l.dtype)throw new Error("sparseValues.dtype must match defaultValues.dtype")})(a,o,e,i),M.runKernelFunc((function(s){return s.sparseToDense(a,o,e,i)}),{$sparseIndices:a,$sparseValues:o,$defaultValue:i})}}),D0=T({gatherND_:function(n,t){var e=E(t,"indices","gatherND","int32"),r=E(n,"x","gatherND");return M.runKernelFunc((function(a){return a.gatherND(r,e)}),{x:r,indices:e},null,"GatherNd")}}),M0=T({diag_:function(n){var t=E(n,"x","diag").flatten(),e=n.shape.concat(n.shape);return M.runKernelFunc((function(r){return r.diag(t)}),{$x:t}).reshape(e)}}),N0=T({dropout_:function(n,t,e,r){var a=E(n,"x","dropout");if(I(a.dtype==="float32",(function(){return"x has to be a floating point tensor since it's going to be scaled, but got a "+a.dtype+" tensor instead."})),I(t>=0&&t<1,(function(){return"rate must be a float in the range [0, 1), but got "+t+"."})),t===0)return n instanceof Be?a.clone():a;var o=(function(u,c){if(c==null)return u.shape.slice();if(Qe(u.shape,c))return c;if(u.shape.length===c.length){for(var l=[],h=0;h<u.shape.length;h++)c[h]==null&&u.shape[h]!=null?l.push(u.shape[h]):l.push(c[h]);return l}return c})(a,e),i=1-t,s=cc(o,0,1,"float32",r).add(i).floor().div(i);return a.mul(s)}});function dl(n,t,e){for(var r=1-n%2,a=new Float32Array(n),o=0;o<n;++o){var i=2*Math.PI*o/(n+r-1);a[o]=t-e*Math.cos(i)}return Ve(a,"float32")}var Ui=T({hannWindow_:function(n){return dl(n,.5,.5)}}),pl=T({hammingWindow_:function(n){return dl(n,.54,.46)}}),Wi=T({frame_:function(n,t,e,r,a){r===void 0&&(r=!1),a===void 0&&(a=0);for(var o=0,i=[];o+t<=n.size;)i.push(an(n,o,t)),o+=e;if(r)for(;o<n.size;){var s=o+t-n.size,u=He([an(n,o,t-s),rn([s],a)]);i.push(u),o+=e}return i.length===0?kn([],[0,t]):He(i).as2D(i.length,t)}}),vl=T({stft_:function(n,t,e,r,a){var o;a===void 0&&(a=Ui),r==null&&(o=t,r=Math.floor(Math.pow(2,Math.ceil(Math.log(o)/Math.log(2)))));for(var i=Wi(n,t,e),s=ct(i,a(t)),u=[],c=0;c<i.shape[0];c++)u.push(Li(s.slice([c,0],[1,t]),r));return He(u)}}),F0=Object.freeze({hannWindow:Ui,hammingWindow:pl,frame:Wi,stft:vl}),ut,P0=function(n,t,e){return e===void 0&&(e=1),$(this,void 0,void 0,(function(){var r,a,o,i,s,u,c,l,h,f,d,p,v,m;return J(this,(function(g){switch(g.label){case 0:return r=E(n,"predictions","inTopK"),a=E(t,"targets","inTopK"),I(r.rank>1,(function(){return"inTopK() expects the predictions to be of rank 2 or higher, but got "+r.rank})),I(r.rank-1===a.rank,(function(){return"predictions rank should be 1 larger than targets rank, but got predictions rank "+r.rank+" and targets rank "+a.rank})),ke(r.shape.slice(0,r.shape.length-1),a.shape,"predictions's shape should be align with the targets' shape, except the last dimension."),o=r.shape[r.shape.length-1],I(e>0&&e<=o,(function(){return"'k' passed to inTopK() must be > 0 && <= the predictions last dimension ("+o+"), but got "+e})),[4,r.data()];case 1:return i=g.sent(),[4,a.data()];case 2:for(s=g.sent(),u=[i.length/o,o],l=u[1],h=Br("bool",c=u[0]),f=0;f<c;f++){for(d=f*l,p=i.subarray(d,d+l),v=[],m=0;m<p.length;m++)v.push({value:p[m],index:m});for(v.sort((function(y,b){return b.value-y.value})),h[f]=0,m=0;m<e;m++)if(v[m].index===s[f]){h[f]=1;break}}return n!==r&&r.dispose(),t!==a&&a.dispose(),[2,rt(h,a.shape,"bool")]}}))}))};(function(n){n[n.NONE=0]="NONE",n[n.MEAN=1]="MEAN",n[n.SUM=2]="SUM",n[n.SUM_BY_NONZERO_WEIGHTS=3]="SUM_BY_NONZERO_WEIGHTS"})(ut||(ut={}));var B0=T({absoluteDifference_:function(n,t,e,r){r===void 0&&(r=ut.SUM_BY_NONZERO_WEIGHTS);var a=E(n,"labels","absoluteDifference"),o=E(t,"predictions","absoluteDifference"),i=null;e!=null&&(i=E(e,"weights","absoluteDifference")),ke(a.shape,o.shape,"Error in absoluteDifference: ");var s=a.sub(o).abs();return gn(s,i,r)}}),gn=T({computeWeightedLoss_:function(n,t,e){e===void 0&&(e=ut.SUM_BY_NONZERO_WEIGHTS);var r=E(n,"losses","computeWeightedLoss"),a=null;t!=null&&(a=E(t,"weights","computeWeightedLoss"));var o=a==null?r:r.mul(a);if(e===ut.NONE)return o;if(e===ut.SUM)return o.sum();if(e===ut.MEAN){if(a==null)return o.mean();var i=r.size/a.size,s=o.sum().div(a.sum());return i>1?s.div(X(i)):s}if(e===ut.SUM_BY_NONZERO_WEIGHTS){if(a==null)return o.sum().div(X(r.size));var u=a.mul(Rr(r.shape)).notEqual(X(0)).sum().toFloat();return o.sum().div(u)}throw Error("Unknown reduction: "+e)}}),O0=T({cosineDistance_:function(n,t,e,r,a){a===void 0&&(a=ut.SUM_BY_NONZERO_WEIGHTS);var o=E(n,"labels","cosineDistance"),i=E(t,"predictions","cosineDistance"),s=null;r!=null&&(s=E(r,"weights","cosineDistance")),ke(o.shape,i.shape,"Error in cosineDistance: ");var u=X(1).sub(o.mul(i).sum(e,!0));return gn(u,s,a)}}),L0=T({hingeLoss_:function(n,t,e,r){r===void 0&&(r=ut.SUM_BY_NONZERO_WEIGHTS);var a=E(n,"labels","hingeLoss"),o=E(t,"predictions","hingeLoss"),i=null;e!=null&&(i=E(e,"weights","hingeLoss")),ke(a.shape,o.shape,"Error in hingeLoss: ");var s=X(1);a=X(2).mul(a).sub(s);var u=s.sub(a.mul(o)).relu();return gn(u,i,r)}}),U0=T({huberLoss_:function(n,t,e,r,a){r===void 0&&(r=1),a===void 0&&(a=ut.SUM_BY_NONZERO_WEIGHTS);var o=E(n,"labels","huberLoss"),i=E(t,"predictions","huberLoss"),s=null;e!=null&&(s=E(e,"weights","huberLoss")),ke(o.shape,i.shape,"Error in huberLoss: ");var u=X(r),c=i.sub(o).abs(),l=Kc(c,u),h=c.sub(l),f=X(.5).mul(l.square()).add(u.mul(h));return gn(f,s,a)}}),W0=T({logLoss_:function(n,t,e,r,a){r===void 0&&(r=1e-7),a===void 0&&(a=ut.SUM_BY_NONZERO_WEIGHTS);var o=E(n,"labels","logLoss"),i=E(t,"predictions","logLoss"),s=null;e!=null&&(s=E(e,"weights","logLoss")),ke(o.shape,i.shape,"Error in logLoss: ");var u=X(1),c=X(r),l=o.mul(i.add(c).log()).neg().sub(u.sub(o).mul(u.sub(i).add(c).log()));return gn(l,s,a)}}),z0=T({meanSquaredError_:function(n,t,e,r){r===void 0&&(r=ut.SUM_BY_NONZERO_WEIGHTS);var a=E(n,"labels","meanSquaredError"),o=E(t,"predictions","meanSquaredError"),i=null;e!=null&&(i=E(e,"weights","meanSquaredError")),ke(a.shape,o.shape,"Error in meanSquaredError: ");var s=a.squaredDifference(o);return gn(s,i,r)}}),V0=T({sigmoidCrossEntropy_:function(n,t,e,r,a){r===void 0&&(r=0),a===void 0&&(a=ut.SUM_BY_NONZERO_WEIGHTS);var o=E(n,"multiClassLabels","sigmoidCrossEntropy"),i=E(t,"logits","sigmoidCrossEntropy"),s=null;if(e!=null&&(s=E(e,"weights","sigmoidCrossEntropy")),ke(o.shape,i.shape,"Error in sigmoidCrossEntropy: "),r>0){var u=X(r),c=X(1),l=X(.5);o=o.mul(c.sub(u)).add(l.mul(u))}var h=(function(f,d){var p=E(f,"labels","sigmoidCrossEntropyWithLogits"),v=E(d,"logits","sigmoidCrossEntropyWithLogits");ke(p.shape,v.shape,"Error in sigmoidCrossEntropyWithLogits: ");var m=v.relu(),g=v.mul(p),y=v.abs().neg().exp().log1p();return m.sub(g).add(y)})(o,i);return gn(h,s,a)}}),G0=T({softmaxCrossEntropy_:function(n,t,e,r,a){r===void 0&&(r=0),a===void 0&&(a=ut.SUM_BY_NONZERO_WEIGHTS);var o=E(n,"onehotLabels","softmaxCrossEntropy"),i=E(t,"logits","softmaxCrossEntropy"),s=null;if(e!=null&&(s=E(e,"weights","softmaxCrossEntropy")),ke(o.shape,i.shape,"Error in softmaxCrossEntropy: "),r>0){var u=X(r),c=X(1),l=X(o.shape[1]);o=o.mul(c.sub(u)).add(u.div(l))}var h=(function(f,d,p){if(p===void 0&&(p=-1),p===-1&&(p=d.rank-1),p!==d.rank-1)throw Error("Softmax cross entropy along a non-last dimension is not yet supported. Labels / logits was rank "+d.rank+" and dim was "+p);return Qa((function(v,m,g){var y=m.logSumExp([p],!0),b=m.toFloat().sub(y);return g([v,b]),{value:b.mul(v).neg().sum([p]),gradFunc:function(x,w){var C=w[0],k=w[1],S=bt(x.shape,[p]);return[x.reshape(S).mul(C.toFloat().sub(k.exp())),x.reshape(S).mul(k.exp().sub(C.toFloat()))]}}}))(f,d)})(o,i);return gn(h,s,a)}}),H0=Object.freeze({get Reduction(){return ut},absoluteDifference:B0,computeWeightedLoss:gn,cosineDistance:O0,hingeLoss:L0,huberLoss:U0,logLoss:W0,meanSquaredError:z0,sigmoidCrossEntropy:V0,softmaxCrossEntropy:G0});function iu(n,t){return t===void 0&&(t=!1),M.tidy((function(){if(n.shape.length!==2)throw new Error("qr2d() requires a 2D Tensor, but got a "+n.shape.length+"D Tensor.");for(var e=n.shape[0],r=n.shape[1],a=uc(e),o=n.clone(),i=kn([[1]],[1,1]),s=i.clone(),u=e>=r?r:e,c=function(h){var f,d=o,p=s,v=a;f=M.tidy((function(){var m=o.slice([h,h],[e-h,1]),g=m.norm(),y=o.slice([h,h],[1,1]),b=kn([[-1]]).where(y.greater(0),kn([[1]])),x=y.sub(b.mul(g)),w=m.div(x);s=w.shape[0]===1?i.clone():i.concat(w.slice([1,0],[w.shape[0]-1,w.shape[1]]),0);var C=b.matMul(x).div(g).neg(),k=o.slice([h,0],[e-h,r]),S=C.mul(s);if(h===0)o=k.sub(S.matMul(s.transpose().matMul(k)));else{var _=k.sub(S.matMul(s.transpose().matMul(k)));o=o.slice([0,0],[h,r]).concat(_,0)}var R=a.slice([0,h],[e,a.shape[1]-h]);if(h===0)a=R.sub(R.matMul(s).matMul(S.transpose()));else{var D=R.sub(R.matMul(s).matMul(S.transpose()));a=a.slice([0,0],[e,h]).concat(D,1)}return[s,o,a]})),s=f[0],o=f[1],a=f[2],xt([d,p,v])},l=0;l<u;++l)c(l);return!t&&e>r&&(a=a.slice([0,0],[e,r]),o=o.slice([0,0],[r,r])),[a,o]}))}var j0=T({bandPart_:function(n,t,e){if(t%1!=0)throw new Error("bandPart(): numLower must be an integer, got "+t+".");if(e%1!=0)throw new Error("bandPart(): numUpper must be an integer, got "+e+".");var r=E(n,"a","bandPart");if(r.rank<2)throw new Error("bandPart(): Rank must be at least 2, got "+r.rank+".");var a=r.shape,o=r.shape.slice(-2),i=o[0],s=o[1];if(!(t<=i))throw new Error("bandPart(): numLower ("+t+") must not be greater than the number of rows ("+i+").");if(!(e<=s))throw new Error("bandPart(): numUpper ("+e+") must not be greater than the number of columns ("+s+").");t<0&&(t=i),e<0&&(e=s);var u=Na(0,i,1,"int32").reshape([-1,1]),c=Na(0,s,1,"int32"),l=Xe(u,c),h=eo(l.lessEqual(X(+t,"int32")),l.greaterEqual(X(-e,"int32"))),f=Ne([i,s],r.dtype);return kt(je(r.reshape([-1,i,s])).map((function(d){return Kn(h,d,f)}))).reshape(a)}}),q0=T({gramSchmidt_:function(n){var t;if(Array.isArray(n)){t=!1,I(n!=null&&n.length>0,(function(){return"Gram-Schmidt process: input must not be null, undefined, or empty"}));for(var e=n[0].shape[0],r=function(u){I(n[u].shape[0]===e,(function(){return"Gram-Schmidt: Non-unique lengths found in the input vectors: ("+n[u].shape[0]+" vs. "+e+")"}))},a=1;a<n.length;++a)r(a)}else t=!0,n=Ci(n,n.shape[0],0).map((function(u){return hc(u,[0])}));I(n.length<=n[0].shape[0],(function(){return"Gram-Schmidt: Number of vectors ("+n.length+") exceeds number of dimensions ("+n[0].shape[0]+")."}));var o=[],i=n,s=function(u){o.push(M.tidy((function(){var c=i[u];if(u>0)for(var l=0;l<u;++l){var h=sl(o[l].mulStrict(c)).mul(o[l]);c=c.sub(h)}return c.div(hl(c,"euclidean"))})))};for(a=0;a<n.length;++a)s(a);return t?kt(o,0):o}}),X0=T({qr_:function(n,t){if(t===void 0&&(t=!1),n.rank<2)throw new Error("qr() requires input tensor to have a rank >= 2, but got rank "+n.rank);if(n.rank===2)return iu(n,t);var e=n.shape.slice(0,n.shape.length-2).reduce((function(i,s){return i*s})),r=je(n.reshape([e,n.shape[n.shape.length-2],n.shape[n.shape.length-1]]),0),a=[],o=[];return r.forEach((function(i){var s=iu(i,t),u=s[0],c=s[1];a.push(u),o.push(c)})),[kt(a,0).reshape(n.shape),kt(o,0).reshape(n.shape)]}}),K0=Object.freeze({bandPart:j0,gramSchmidt:q0,qr:X0});function ao(n,t,e,r,a,o){r==null&&(r=.5),a==null&&(a=Number.NEGATIVE_INFINITY),o==null&&(o=0);var i=n.shape[0];return e=Math.min(e,i),I(0<=r&&r<=1,(function(){return"iouThreshold must be in [0, 1], but was '"+r+"'"})),I(n.rank===2,(function(){return"boxes must be a 2D tensor, but was of rank '"+n.rank+"'"})),I(n.shape[1]===4,(function(){return"boxes must have 4 columns, but 2nd dimension was "+n.shape[1]})),I(t.rank===1,(function(){return"scores must be a 1D tensor"})),I(t.shape[0]===i,(function(){return"scores has incompatible shape with boxes. Expected "+i+", but was "+t.shape[0]})),I(0<=o&&o<=1,(function(){return"softNmsSigma must be in [0, 1], but was '"+o+"'"})),{maxOutputSize:e,iouThreshold:r,scoreThreshold:a,softNmsSigma:o}}var Y0=T({resizeBilinear_:function(n,t,e){e===void 0&&(e=!1);var r=E(n,"images","resizeBilinear");I(r.rank===3||r.rank===4,(function(){return"Error in resizeBilinear: x must be rank 3 or 4, but got rank "+r.rank+"."})),I(t.length===2,(function(){return"Error in resizeBilinear: new shape must 2D, but got shape "+t+"."}));var a=r,o=!1;r.rank===3&&(o=!0,a=r.as4D(1,r.shape[0],r.shape[1],r.shape[2]));var i=t[0],s=t[1],u=M.runKernelFunc((function(c,l){return l([a]),c.resizeBilinear(a,i,s,e)}),{x:a},(function(c,l){return{x:function(){return M.runKernelFunc((function(h){return h.resizeBilinearBackprop(c,l[0],e)}),{})}}}),"ResizeBilinear",{alignCorners:e,newHeight:i,newWidth:s});return o?u.as3D(u.shape[1],u.shape[2],u.shape[3]):u}}),$0=T({resizeNearestNeighbor_:function(n,t,e){e===void 0&&(e=!1);var r=E(n,"images","resizeNearestNeighbor");I(r.rank===3||r.rank===4,(function(){return"Error in resizeNearestNeighbor: x must be rank 3 or 4, but got rank "+r.rank+"."})),I(t.length===2,(function(){return"Error in resizeNearestNeighbor: new shape must 2D, but got shape "+t+"."})),I(r.dtype==="float32"||r.dtype==="int32",(function(){return"`images` must have `int32` or `float32` as dtype"}));var a=r,o=!1;r.rank===3&&(o=!0,a=r.as4D(1,r.shape[0],r.shape[1],r.shape[2]));var i=t[0],s=t[1],u=M.runKernelFunc((function(c,l){return l([a]),c.resizeNearestNeighbor(a,i,s,e)}),{batchImages:a},(function(c,l){return{batchImages:function(){return M.runKernelFunc((function(h){return h.resizeNearestNeighborBackprop(c,l[0],e)}),{})}}}));return o?u.as3D(u.shape[1],u.shape[2],u.shape[3]):u}}),J0=T({nonMaxSuppression_:function(n,t,e,r,a){r===void 0&&(r=.5),a===void 0&&(a=Number.NEGATIVE_INFINITY);var o=E(n,"boxes","nonMaxSuppression"),i=E(t,"scores","nonMaxSuppression"),s=ao(o,i,e,r,a);e=s.maxOutputSize,r=s.iouThreshold,a=s.scoreThreshold;var u={maxOutputSize:e,iouThreshold:r,scoreThreshold:a};return M.runKernelFunc((function(c){return c.nonMaxSuppression(o,i,e,r,a)}),{boxes:o,scores:i},null,"NonMaxSuppressionV3",u)}}),Q0=function(n,t,e,r,a){return r===void 0&&(r=.5),a===void 0&&(a=Number.NEGATIVE_INFINITY),$(this,void 0,void 0,(function(){var o,i,s,u,c,l,h;return J(this,(function(f){switch(f.label){case 0:return o=E(n,"boxes","nonMaxSuppressionAsync"),i=E(t,"scores","nonMaxSuppressionAsync"),s=ao(o,i,e,r,a),e=s.maxOutputSize,r=s.iouThreshold,a=s.scoreThreshold,[4,Promise.all([o.data(),i.data()])];case 1:return u=f.sent(),c=u[0],l=u[1],h=Ri(c,l,e,r,a),o!==n&&o.dispose(),i!==t&&i.dispose(),[2,h]}}))}))},Z0=T({nonMaxSuppressionWithScore_:function(n,t,e,r,a,o){r===void 0&&(r=.5),a===void 0&&(a=Number.NEGATIVE_INFINITY),o===void 0&&(o=0);var i=E(n,"boxes","nonMaxSuppression"),s=E(t,"scores","nonMaxSuppression"),u=ao(i,s,e,r,a,o),c={maxOutputSize:e=u.maxOutputSize,iouThreshold:r=u.iouThreshold,scoreThreshold:a=u.scoreThreshold,softNmsSigma:o=u.softNmsSigma},l=M.runKernel("NonMaxSuppressionV5",{boxes:i,scores:s},c);return{selectedIndices:l[0],selectedScores:l[1]}}}),ey=function(n,t,e,r,a,o){return r===void 0&&(r=.5),a===void 0&&(a=Number.NEGATIVE_INFINITY),o===void 0&&(o=0),$(this,void 0,void 0,(function(){var i,s,u,c,l,h,f;return J(this,(function(d){switch(d.label){case 0:return i=E(n,"boxes","nonMaxSuppressionAsync"),s=E(t,"scores","nonMaxSuppressionAsync"),u=ao(i,s,e,r,a,o),e=u.maxOutputSize,r=u.iouThreshold,a=u.scoreThreshold,o=u.softNmsSigma,[4,Promise.all([i.data(),s.data()])];case 1:return c=d.sent(),l=c[0],h=c[1],f=Ii(l,h,e,r,a,o),i!==n&&i.dispose(),s!==t&&s.dispose(),[2,f]}}))}))},ty=T({cropAndResize_:function(n,t,e,r,a,o){var i=E(n,"image","cropAndResize"),s=E(t,"boxes","cropAndResize","float32"),u=E(e,"boxInd","cropAndResize","int32");a=a||"bilinear",o=o||0;var c=s.shape[0];return I(i.rank===4,(function(){return"Error in cropAndResize: image must be rank 4,but got rank "+i.rank+"."})),I(s.rank===2&&s.shape[1]===4,(function(){return"Error in cropAndResize: boxes must be have size ["+c+",4] but had shape "+s.shape+"."})),I(u.rank===1&&u.shape[0]===c,(function(){return"Error in cropAndResize: boxInd must be have size ["+c+"] but had shape "+s.shape+"."})),I(r.length===2,(function(){return"Error in cropAndResize: cropSize must be of length 2, but got length "+r.length+"."})),I(r[0]>=1&&r[1]>=1,(function(){return"cropSize must be atleast [1,1], but was "+r})),I(a==="bilinear"||a==="nearest",(function(){return"method must be bilinear or nearest, but was "+a})),M.runKernelFunc((function(l,h){return l.cropAndResize(i,s,u,r,a,o)}),{images:i,boxes:s,boxInd:u},null,"CropAndResize",{method:a,extrapolationValue:o,cropSize:r})}}),zi=Object.freeze({resizeBilinear:Y0,resizeNearestNeighbor:$0,nonMaxSuppression:J0,nonMaxSuppressionAsync:Q0,nonMaxSuppressionWithScore:Z0,nonMaxSuppressionWithScoreAsync:ey,cropAndResize:ty}),Vi=function(n,t){return!(n>0)||t==="linear"},Gi=function(n,t,e){if(e==null||e==="linear")return n;if(e==="relu")return n.mul(t.step());throw new Error("Gradient for activation "+e+" has not been implemented yet.")},Hi=function(n,t){var e=t,r=qe(n.shape,t.shape);return r.length>0&&(e=e.sum(r)),e.reshape(n.shape)},ji=function(n,t,e){if(t==="linear")return n;if(t==="relu")return Oe(n);if(t==="elu")return ul(n);if(t==="relu6")return ll(n);if(t==="prelu")return cl(n,e);throw new Error("Unknown fused activation "+t+".")},ny=T({fusedMatMul_:function(n){var t,e=n.a,r=n.b,a=n.transposeA,o=a!==void 0&&a,i=n.transposeB,s=i!==void 0&&i,u=n.bias,c=n.activation,l=c===void 0?"linear":c,h=n.preluActivationWeights;if(Vi(M.state.gradientDepth,l)===!1){var f=no(e,r,o,s);return u!=null&&(f=xe(f,u)),ji(f,l,h)}var d=E(e,"a","fused matMul"),p=E(r,"b","fused matMul");t=Le(d,p),d=t[0],p=t[1];var v=o?d.shape[d.rank-2]:d.shape[d.rank-1],m=s?p.shape[p.rank-1]:p.shape[p.rank-2],g=o?d.shape[d.rank-1]:d.shape[d.rank-2],y=s?p.shape[p.rank-2]:p.shape[p.rank-1],b=d.shape.slice(0,-2),x=p.shape.slice(0,-2),w=Z(b),C=Z(x);I(d.rank>=2&&p.rank>=2&&d.rank===p.rank,(function(){return"Error in fused matMul: inputs must have the same rank of at least 2, got ranks "+d.rank+" and "+p.rank+"."})),I(Qe(b,x),(function(){return"Error in fused matMul: outer dimensions ("+b+") and ("+x+") of Tensors with shapes "+d.shape+" and "+p.shape+" must match."})),I(v===m,(function(){return"Error in fused matMul: inner shapes ("+v+") and ("+m+") of Tensors with shapes "+d.shape+" and "+p.shape+" and transposeA="+o+" and transposeB="+s+" must match."}));var k,S,_=d.shape.slice(0,-2).concat([g,y]),R=o?d.as3D(w,v,g):d.as3D(w,g,v),D=s?p.as3D(C,y,m):p.as3D(C,m,y);u!=null&&we(_,(k=Le(k=E(u,"bias","fused matMul"),d)[0]).shape),h!=null&&(S=E(h,"prelu weights","fused matMul"));var A={a:R,b:D};u!=null&&(A.bias=k),h!=null&&(A.preluActivationWeights=S);var O=[R,D];return M.runKernelFunc((function(P,F){var V=P.fusedBatchMatMul({a:R,b:D,transposeA:o,transposeB:s,bias:k,activation:l,preluActivationWeights:S});return F([R,D,V]),V}),A,(function(P,F){var V=F[0],z=F[1],U=F[2],L=Gi(P,U,l),G={};return u!=null&&(G={bias:function(){return Hi(k,L)}}),Object.assign(o||s?!o&&s?{a:function(){return L.matMul(z,!1,!1)},b:function(){return L.matMul(V,!0,!1)}}:o&&!s?{a:function(){return z.matMul(L,!1,!0)},b:function(){return V.matMul(L,!1,!1)}}:{a:function(){return z.matMul(L,!0,!0)},b:function(){return L.matMul(V,!0,!0)}}:{a:function(){return L.matMul(z,!1,!0)},b:function(){return V.matMul(L,!0,!1)}},G)}),"_FusedMatMul",{transposeA:o,transposeB:s,activation:l},O,[!0]).reshape(_)}}),ry=T({fusedConv2d_:function(n){var t=n.x,e=n.filter,r=n.strides,a=n.pad,o=n.dataFormat,i=o===void 0?"NHWC":o,s=n.dilations,u=s===void 0?[1,1]:s,c=n.dimRoundingMode,l=n.bias,h=n.activation,f=h===void 0?"linear":h,d=n.preluActivationWeights;if(f=f||"linear",Vi(M.state.gradientDepth,f)===!1){var p=Ot(t,e,r,a,i,u,c);return l!=null&&(p=xe(p,l)),ji(p,f,d)}var v=E(t,"x","conv2d"),m=E(e,"filter","conv2d"),g=v,y=!1;v.rank===3&&(y=!0,g=v.as4D(1,v.shape[0],v.shape[1],v.shape[2])),I(g.rank===4,(function(){return"Error in fused conv2d: input must be rank 4, but got rank "+g.rank+"."})),I(m.rank===4,(function(){return"Error in fused conv2d: filter must be rank 4, but got rank "+m.rank+"."})),c!=null&&I(ze(a),(function(){return"Error in fused conv2d: pad must be an integer when using, dimRoundingMode "+c+" but got pad "+a+"."})),I(g.shape[3]===m.shape[2],(function(){return"Error in conv2d: depth of input ("+g.shape[3]+") must match input depth for filter "+m.shape[2]+"."})),I(wt(r,u),(function(){return"Error in conv2D: Either strides or dilations must be 1. Got strides "+r+" and dilations '"+u+"'"})),I(i==="NHWC",(function(){return"Error in conv2d: got dataFormat of "+i+" but only NHWC is currently supported."}));var b,x,w=Qn(g.shape,m.shape,r,u,a,c);l!=null&&(b=Le(b=E(l,"bias","fused conv2d"),v)[0],we(w.outShape,b.shape)),d!=null&&(x=E(d,"prelu weights","fused conv2d"));var C={x:g,filter:m};l!=null&&(C.bias=b),d!=null&&(C.preluActivationWeights=x);var k=[m,g],S=M.runKernelFunc((function(_,R){var D=_.fusedConv2d({input:g,filter:m,convInfo:w,bias:b,activation:f,preluActivationWeights:x});return R([m,g,D]),D}),C,(function(_,R){var D=R,A=D[0],O=D[1],P=D[2],F=Gi(_,P,f);I(Er(u),(function(){return"Error in gradient of fused conv2D: dilation rates greater than 1 are not yet supported in gradients. Got dilations '"+u+"'"}));var V={};return l!=null&&(V={bias:function(){return Hi(b,F)}}),Object.assign({x:function(){return el(O.shape,F,A,r,a)},filter:function(){return Pi(O,F,A.shape,r,a)}},V)}),"FusedConv2D",{convInfo:w,activation:f},k,[!0]);return y?S.as3D(S.shape[1],S.shape[2],S.shape[3]):S}}),ay=T({fusedDepthwiseConv2d_:function(n){var t=n.x,e=n.filter,r=n.strides,a=n.pad,o=n.dataFormat,i=o===void 0?"NHWC":o,s=n.dilations,u=s===void 0?[1,1]:s,c=n.dimRoundingMode,l=n.bias,h=n.activation,f=h===void 0?"linear":h,d=n.preluActivationWeights;if(Vi(M.state.gradientDepth,f)===!1){var p=to(t,e,r,a,i,u,c);return l!=null&&(p=xe(p,l)),ji(p,f,d)}var v=E(t,"x","depthwiseConv2d"),m=E(e,"filter","depthwiseConv2d"),g=v,y=!1;v.rank===3&&(y=!0,g=v.as4D(1,v.shape[0],v.shape[1],v.shape[2])),I(g.rank===4,(function(){return"Error in fused depthwiseConv2d: input must be rank 4, but got rank "+g.rank+"."})),I(m.rank===4,(function(){return"Error in fused depthwiseConv2d: filter must be rank 4, but got rank "+m.rank+"."})),I(g.shape[3]===m.shape[2],(function(){return"Error in fused depthwiseConv2d: number of input channels ("+g.shape[3]+") must match the inChannels dimension in filter "+m.shape[2]+"."})),u==null&&(u=[1,1]),I(wt(r,u),(function(){return"Error in fused depthwiseConv2d: Either strides or dilations must be 1. Got strides "+r+" and dilations '"+u+"'"})),c!=null&&I(ze(a),(function(){return"Error in fused depthwiseConv2d: pad must be an integer when using dimRoundingMode "+c+" but got pad "+a+"."}));var b,x,w=Qn(g.shape,m.shape,r,u,a,c,!0);l!=null&&(b=Le(b=E(l,"bias","fused conv2d"),v)[0],we(w.outShape,b.shape)),d!=null&&(x=E(d,"prelu weights","fused depthwiseConv2d"));var C={x:g,filter:m};l!=null&&(C.bias=b),d!=null&&(C.preluActivationWeights=x);var k=[m,g],S=M.runKernelFunc((function(_,R){var D=_.fusedDepthwiseConv2D({input:g,filter:m,convInfo:w,bias:b,activation:f,preluActivationWeights:x});return R([m,g,D]),D}),C,(function(_,R){I(Er(u),(function(){return"Error in gradient of fused depthwiseConv2d: dilation rates greater than 1 are not yet supported. Got dilations '"+u+"'"}));var D=R[0],A=R[1],O=R[2],P=Gi(_,O,f),F={};return l!=null&&(F={bias:function(){return Hi(b,P)}}),Object.assign({x:function(){return tl(A.shape,P,D,w)},filter:function(){return nl(A,P,D.shape,w)}},F)}),"FusedDepthwiseConv2D",{convInfo:w,activation:f},k,[!0]);return y?S.as3D(S.shape[1],S.shape[2],S.shape[3]):S}}),oy=Object.freeze({matMul:ny,conv2d:ry,depthwiseConv2d:ay}),iy=Object.freeze({image:zi,linalg:K0,losses:H0,spectral:T0,fused:oy,signal:F0,square:Wm,squaredDifference:Lc,conv1d:Yg,conv2d:Ot,conv3d:$g,depthwiseConv2d:to,separableConv2d:Bi,conv2dTranspose:Jg,conv3dTranspose:Qg,op:T,batchNormalization2d:mg,batchNormalization3d:gg,batchNormalization4d:yg,batchNormalization:xg,batchNorm:Hc,batchNorm2d:bg,batchNorm3d:wg,batchNorm4d:Cg,booleanMaskAsync:Kg,complex:tt,real:Pt,imag:Qt,concat:He,concat1d:op,concat2d:ip,concat3d:sp,concat4d:up,split:Ci,matMul:no,dot:Zg,outerProduct:e0,reverse:Kr,reverse1d:t0,reverse2d:n0,reverse3d:r0,reverse4d:a0,maxPool:Je,avgPool:Yr,pool:o0,maxPool3d:i0,avgPool3d:s0,slice:an,slice1d:u0,slice2d:c0,slice3d:ol,slice4d:l0,abs:zm,acos:Vm,acosh:Gm,asin:Hm,asinh:jm,atan:qm,atanh:Xm,ceil:Km,clipByValue:Mi,cos:Ym,cosh:$m,erf:Jm,exp:oi,expm1:Qm,floor:Zm,log:eg,log1p:tg,logSigmoid:ng,neg:za,reciprocal:rg,round:ag,rsqrt:Uc,sigmoid:Wc,sign:og,isNaN:ig,isInf:sg,isFinite:ug,sin:cg,sinh:lg,softplus:hg,sqrt:fg,step:dg,tan:pg,tanh:vg,all:h0,any:f0,argMax:d0,argMin:p0,logSumExp:v0,max:ro,mean:m0,min:g0,moments:y0,sum:sl,prod:x0,equal:Yc,equalStrict:Lg,greater:Ug,greaterEqual:$c,greaterEqualStrict:Wg,greaterStrict:zg,less:Vg,lessEqual:Gg,lessEqualStrict:Hg,lessStrict:jg,notEqual:qg,notEqualStrict:Xg,add:xe,addN:Sg,addStrict:Rg,atan2:Ig,div:Wt,divNoNan:kg,divStrict:Tg,floorDiv:Xc,maximum:Ni,maximumStrict:Ag,minimum:Kc,minimumStrict:Dg,mod:Mg,modStrict:Ng,mul:ct,mulStrict:Fg,pow:Va,powStrict:Pg,squaredDifferenceStrict:Bg,sub:Xe,subStrict:Og,elu:ul,leakyRelu:b0,prelu:cl,relu:Oe,relu6:ll,selu:w0,logicalAnd:eo,logicalNot:Eg,logicalOr:jc,logicalXor:_g,where:Kn,whereAsync:qc,buffer:fe,print:gp,batchToSpaceND:sc,broadcastTo:yp,cast:xp,clone:bp,cumsum:wp,depthToSpace:Cp,expandDims:Ft,eye:uc,multinomial:Ep,oneHot:ti,pad:Jn,pad1d:_p,pad2d:Sp,pad3d:Rp,pad4d:Ip,rand:kp,randomNormal:Tp,randomGamma:Ap,randomUniform:cc,reshape:zt,spaceToBatchND:lc,squeeze:hc,stack:kt,tile:dr,truncatedNormal:Dp,unstack:je,setdiff1dAsync:Mp,fill:rn,linspace:ap,ones:Rr,range:Na,scalar:X,tensor:rt,tensor1d:Ve,tensor2d:kn,tensor3d:wi,tensor4d:mt,tensor5d:tp,tensor6d:np,variable:rp,zeros:Ne,onesLike:ic,zerosLike:Ee,transpose:Dn,softmax:mn,logSoftmax:Up,localResponseNormalization:C0,norm:hl,gather:Fi,unsortedSegmentSum:Jc,basicLSTMCell:E0,multiRNNCell:_0,movingAverage:S0,stridedSlice:R0,topk:I0,scatterND:k0,fft:Oi,ifft:Ga,rfft:Li,irfft:fl,sparseToDense:A0,gatherND:D0,diag:M0,dropout:N0,hannWindow:Ui,hammingWindow:pl,frame:Wi,stft:vl,inTopKAsync:P0});function H(n,t){Array.isArray(n)||(n=[n]),n.forEach((function(e){e!=null&&I(e.dtype!=="complex64",(function(){return t+" does not support complex64 tensors."}))}))}function No(n,t,e,r){if(e==="linear")return n.linear(t);if(e==="relu")return n.relu(t);if(e==="elu")return n.elu(t);if(e==="relu6")return n.relu6(t);if(e==="prelu")return n.prelu(t,r);throw new Error("Activation "+e+" has not been implemented for the CPU backend.")}var sy=(function(n){function t(){var e=n.call(this)||this;return e.blockSize=48,e.firstUse=!0,e.data=new yc(e,M),e}return Ht(t,n),t.prototype.write=function(e,r,a){this.firstUse&&(this.firstUse=!1,W().get("IS_NODE")&&Da(`
============================
Hi there 👋. Looks like you are running TensorFlow.js in Node.js. To speed things up dramatically, install our node backend, which binds to TensorFlow C++, by running npm i @tensorflow/tfjs-node, or npm i @tensorflow/tfjs-node-gpu if you have CUDA. Then call require('@tensorflow/tfjs-node'); (-gpu suffix for CUDA) at the start of your program. Visit https://github.com/tensorflow/tfjs-node for more details.
============================`));var o={};return this.data.set(o,{values:e,dtype:a}),o},t.prototype.move=function(e,r,a,o){this.data.set(e,{values:r,dtype:o})},t.prototype.numDataIds=function(){return this.data.numDataIds()},t.prototype.read=function(e){return $(this,void 0,void 0,(function(){return J(this,(function(r){return[2,this.readSync(e)]}))}))},t.prototype.readSync=function(e){var r=this.data.get(e),a=r.dtype,o=r.complexTensors;return a==="complex64"?ai(this.readSync(o.real.dataId),this.readSync(o.imag.dataId)):this.data.get(e).values},t.prototype.bufferSync=function(e){var r=this.readSync(e.dataId),a=r;if(e.dtype==="string")try{a=r.map((function(o){return ka(o)}))}catch{throw new Error("Failed to decode encoded string bytes into utf-8")}return fe(e.shape,e.dtype,a)},t.prototype.makeOutput=function(e,r,a){var o=this.write(e,r,a);return M.makeTensorFromDataId(o,r,a,this)},t.prototype.disposeData=function(e){if(this.data.has(e)){var r=this.data.get(e).complexTensors;r!=null&&(r.real.dispose(),r.imag.dispose()),this.data.delete(e)}},t.prototype.time=function(e){return $(this,void 0,void 0,(function(){var r;return J(this,(function(a){return r=$t(),e(),[2,{kernelMs:$t()-r}]}))}))},t.prototype.memory=function(){return{unreliable:!0,reasons:["The reported memory is an upper bound. Due to automatic garbage collection, the true allocated memory may be less."]}},t.prototype.complex=function(e,r){var a=this.makeOutput(null,e.shape,"complex64");return this.data.get(a.dataId).complexTensors={real:M.keep(e.clone()),imag:M.keep(r.clone())},a},t.prototype.real=function(e){return this.data.get(e.dataId).complexTensors.real.clone()},t.prototype.imag=function(e){return this.data.get(e.dataId).complexTensors.imag.clone()},t.prototype.slice=function(e,r,a){if(H(e,"slice"),mc(e.shape,r,a)){var o=gc(r,e.strides),i=Z(a);return rt(this.readSync(e.dataId).subarray(o,o+i),a,e.dtype)}for(var s=fe(a,e.dtype),u=this.bufferSync(e),c=0;c<s.size;++c){var l=s.indexToLoc(c).map((function(h,f){return h+r[f]}));s.values[c]=u.get.apply(u,l)}return s.toTensor()},t.prototype.stridedSlice=function(e,r,a,o){H(e,"stridedSlice");var i=_i(r,a,o);if(i.some((function(d){return d===0})))return rt([],i);for(var s=fe(i,e.dtype),u=this.bufferSync(e),c=0;c<s.size;c++){for(var l=s.indexToLoc(c),h=new Array(l.length),f=0;f<h.length;f++)h[f]=l[f]*o[f]+r[f];s.set.apply(s,[u.get.apply(u,h)].concat(l))}return s.toTensor()},t.prototype.diag=function(e){for(var r=this.readSync(e.dataId),a=fe([e.size,e.size],e.dtype),o=a.values,i=0;i<r.length;i++)o[i*e.size+i]=r[i];return a.toTensor()},t.prototype.unstack=function(e,r){for(var a=e.shape[r],o=new Array(e.rank-1),i=0,s=0;s<e.rank;s++)s!==r&&(o[i++]=e.shape[s]);var u=new Array(e.rank).fill(0),c=e.shape.slice();c[r]=1;var l=new Array(a);for(s=0;s<l.length;s++)u[r]=s,l[s]=this.slice(e,u,c).reshape(o);return l},t.prototype.reverse=function(e,r){H(e,"reverse");for(var a=fe(e.shape,e.dtype),o=this.bufferSync(e),i=function(u){var c=a.indexToLoc(u),l=c.slice();r.forEach((function(h){return l[h]=e.shape[h]-1-l[h]})),a.set.apply(a,[o.get.apply(o,l)].concat(c))},s=0;s<a.size;s++)i(s);return a.toTensor()},t.prototype.concat=function(e,r){var a=this;if(e[0].dtype==="complex64"){var o=e.map((function(d){return Pt(d)})),i=e.map((function(d){return Qt(d)}));return tt(this.concat(o,r),this.concat(i,r))}var s=e.map((function(d){var p=Z(d.shape.slice(r));return d.as2D(-1,p)})),u=Cr(s.map((function(d){return d.shape})),1),c=fe(u,e[0].dtype).values;if(s[0].shape[0]===1){var l=0;s.forEach((function(d){c.set(a.readSync(d.dataId),l),l+=d.size}))}else{var h=0;s.forEach((function(d){for(var p=a.readSync(d.dataId),v=0,m=0;m<d.shape[0];++m)for(var g=m*u[1]+h,y=0;y<d.shape[1];++y)c[g+y]=p[v++];h+=d.shape[1]}))}var f=Cr(e.map((function(d){return d.shape})),r);return rt(c,f,e[0].dtype)},t.prototype.neg=function(e){return H(e,"neg"),this.multiply(X(-1),e)},t.prototype.add=function(e,r){return e.dtype==="complex64"||r.dtype==="complex64"?this.broadcastedBinaryComplexOp(e.cast("complex64"),r.cast("complex64"),(function(a,o,i,s){return{real:a+i,imag:o+s}})):this.broadcastedBinaryOp(e,r,nt(e.dtype,r.dtype),(function(a,o){return a+o}))},t.prototype.addN=function(e){var r=this;H(e,"addN");for(var a=e.map((function(l){return r.readSync(l.dataId)})),o=fe(e[0].shape,e[0].dtype),i=o.values,s=0;s<e.length;s++)for(var u=a[s],c=0;c<i.length;c++)i[c]+=u[c];return o.toTensor()},t.prototype.softmax=function(e,r){var a=Ke([r],e.shape),o=this.max(e,a),i=bt(o.shape,a),s=this.subtract(e,o.reshape(i)),u=this.exp(s),c=this.sum(u,a).reshape(i);return this.realDivide(u,c)},t.prototype.subtract=function(e,r){return e.dtype==="complex64"||r.dtype==="complex64"?this.broadcastedBinaryComplexOp(e.cast("complex64"),r.cast("complex64"),(function(a,o,i,s){return{real:a-i,imag:o-s}})):this.broadcastedBinaryOp(e,r,nt(e.dtype,r.dtype),(function(a,o){return a-o}))},t.prototype.pow=function(e,r){return H([e,r],"pow"),this.broadcastedBinaryOp(e,r,e.dtype,(function(a,o){return Math.pow(a,o)}))},t.prototype.batchMatMul=function(e,r,a,o){H([e,r],"matMul");for(var i=a?e.shape[1]:e.shape[2],s=a?e.shape[2]:e.shape[1],u=o?r.shape[1]:r.shape[2],c=e.shape[0],l=this.readSync(e.dataId),h=this.readSync(r.dataId),f=a?[e.strides[0],1,e.strides[1]]:[e.strides[0],e.strides[1],1],d=f[0],p=f[1],v=f[2],m=o?[1,r.strides[1],r.strides[0]]:[r.strides[1],1,r.strides[0]],g=m[0],y=m[1],b=m[2],x=s*u,w=fe([c,s,u],e.dtype),C=w.values,k=this.blockSize,S=0;S<c;S++)for(var _=0;_<s;_+=k)for(var R=0;R<u;R+=k)for(var D=0;D<i;D+=k)for(var A=Math.min(_+k,s),O=Math.min(R+k,u),P=Math.min(D+k,i),F=_;F<A;F++)for(var V=R;V<O;V++){for(var z=0,U=D;U<P;U++)z+=l[S*d+F*p+U*v]*h[U*g+V*y+S*b];C[S*x+(F*u+V)]+=z}return w.toTensor()},t.prototype.fusedBatchMatMul=function(e){var r=e.a,a=e.b,o=e.transposeA,i=e.transposeB,s=e.bias,u=e.activation,c=e.preluActivationWeights,l=this.batchMatMul(r,a,o,i);return s&&(l=this.add(l,s)),u&&(l=No(this,l,u,c)),l},t.prototype.multiply=function(e,r){return e.dtype==="complex64"||r.dtype==="complex64"?this.broadcastedBinaryComplexOp(e.cast("complex64"),r.cast("complex64"),(function(a,o,i,s){return{real:a*i-o*s,imag:a*s+o*i}})):this.broadcastedBinaryOp(e,r,nt(e.dtype,r.dtype),(function(a,o){return a*o}))},t.prototype.realDivide=function(e,r){return H([e,r],"realDivide"),this.broadcastedBinaryOp(e,r,"float32",(function(a,o){return a/o}))},t.prototype.floorDiv=function(e,r){return H([e,r],"floorDiv"),this.broadcastedBinaryOp(e,r,"int32",(function(a,o){return Math.floor(a/o)}))},t.prototype.sum=function(e,r){H(e,"sum"),Et("sum",r,e.rank);for(var a=ot(e.shape,r),o=a[0],i=a[1],s=Ne(o,nt(e.dtype,"int32")),u=Z(i),c=this.readSync(s.dataId),l=this.readSync(e.dataId),h=0;h<c.length;++h){for(var f=h*u,d=0,p=0;p<u;++p)d+=l[f+p];c[h]=d}return s},t.prototype.prod=function(e,r){H(e,"sum");for(var a=ot(e.shape,r),o=a[0],i=a[1],s=Ne(o,nt(e.dtype,"int32")),u=Z(i),c=this.readSync(s.dataId),l=this.readSync(e.dataId),h=0;h<c.length;++h){for(var f=h*u,d=1,p=0;p<u;++p)d*=l[f+p];c[h]=d}return s},t.prototype.unsortedSegmentSum=function(e,r,a){H(e,"unsortedSegmentSum");for(var o=[],i=e.rank-r.rank,s=0;s<i;++s)r=r.expandDims(s+1);for(s=0;s<a;++s){var u=X(s,"int32"),c=Yc(u,r).asType("float32").mul(e).sum(0);o.push(c)}return kt(o)},t.prototype.argMin=function(e,r){H(e,"argMin");var a=[r];Et("argMin",a,e.rank);for(var o=ot(e.shape,a),i=o[0],s=o[1],u=Ne(i,"int32"),c=Z(s),l=this.readSync(u.dataId),h=this.readSync(e.dataId),f=0;f<l.length;++f){for(var d=f*c,p=h[d],v=0,m=0;m<c;++m){var g=h[d+m];g<p&&(p=g,v=m)}l[f]=v}return u},t.prototype.argMax=function(e,r){H(e,"argMax");var a=[r];Et("argMax",a,e.rank);for(var o=ot(e.shape,a),i=o[0],s=o[1],u=Ne(i,"int32"),c=Z(s),l=this.readSync(u.dataId),h=this.readSync(e.dataId),f=0;f<l.length;++f){for(var d=f*c,p=h[d],v=0,m=0;m<c;++m){var g=h[d+m];g>p&&(p=g,v=m)}l[f]=v}return u},t.prototype.cumsum=function(e,r,a,o){if(H(e,"cumsum"),r!==e.rank-1)throw new Error("backend.cumsum in CPU expects an inner-most axis="+(e.rank-1)+" but got axis="+r);for(var i=nt(e.dtype,"int32"),s=Ne(e.shape,i),u=this.readSync(s.dataId),c=this.readSync(e.dataId),l=e.shape[e.rank-1],h=o?function(m,g){return m+l-g-1}:function(m,g){return m+g},f=0;f<c.length;f+=l)for(var d=0;d<l;d++){var p=h(f,d);if(d===0)u[p]=a?0:c[p];else{var v=h(f,d-1);u[p]=a?c[v]+u[v]:c[p]+u[v]}}return s},t.prototype.equal=function(e,r){return H([e,r],"equal"),this.broadcastedBinaryOp(e,r,"bool",(function(a,o){return a===o?1:0}))},t.prototype.notEqual=function(e,r){return H([e,r],"notEqual"),this.broadcastedBinaryOp(e,r,"bool",(function(a,o){return a!==o?1:0}))},t.prototype.less=function(e,r){return H([e,r],"less"),this.broadcastedBinaryOp(e,r,"bool",(function(a,o){return a<o?1:0}))},t.prototype.lessEqual=function(e,r){return H([e,r],"lessEqual"),this.broadcastedBinaryOp(e,r,"bool",(function(a,o){return a<=o?1:0}))},t.prototype.greater=function(e,r){return H([e,r],"greater"),this.broadcastedBinaryOp(e,r,"bool",(function(a,o){return a>o?1:0}))},t.prototype.greaterEqual=function(e,r){return H([e,r],"greaterEqual"),this.broadcastedBinaryOp(e,r,"bool",(function(a,o){return a>=o?1:0}))},t.prototype.logicalNot=function(e){H(e,"logicalNot");for(var r=this.readSync(e.dataId),a=new Uint8Array(r.length),o=0;o<r.length;++o)a[o]=r[o]?0:1;return this.makeOutput(a,e.shape,"bool")},t.prototype.logicalAnd=function(e,r){return H([e,r],"logicalAnd"),this.broadcastedBinaryOp(e,r,"bool",(function(a,o){return a&&o}))},t.prototype.logicalOr=function(e,r){return H([e,r],"logicalOr"),this.broadcastedBinaryOp(e,r,"bool",(function(a,o){return a||o}))},t.prototype.select=function(e,r,a){H([e,r,a],"select");for(var o=this.readSync(e.dataId),i=this.readSync(r.dataId),s=this.readSync(a.dataId),u=Ne(r.shape,nt(r.dtype,a.dtype)),c=this.readSync(u.dataId),l=0,h=e.rank===0||e.rank>1||r.rank===1?1:Z(r.shape.slice(1)),f=0;f<o.length;f++)for(var d=0;d<h;d++)o[f]===1?c[l++]=i[f]:c[l++]=s[f];return u},t.prototype.where=function(e){H([e],"where");var r=this.readSync(e.dataId);return ki(e.shape,r)},t.prototype.topk=function(e,r,a){return H(e,"topk"),Rc(this.readSync(e.dataId),e.shape,e.dtype,r)},t.prototype.min=function(e,r){H(e,"min"),Et("min",r,e.rank);for(var a=ot(e.shape,r),o=a[0],i=a[1],s=Ne(o,e.dtype),u=Z(i),c=this.readSync(s.dataId),l=this.readSync(e.dataId),h=0;h<c.length;++h){for(var f=h*u,d=l[f],p=0;p<u;++p){var v=l[f+p];v<d&&(d=v)}c[h]=d}return s},t.prototype.minimum=function(e,r){return H([e,r],"minimum"),this.broadcastedBinaryOp(e,r,e.dtype,(function(a,o){return Math.min(a,o)}))},t.prototype.mod=function(e,r){return H([e,r],"mod"),this.broadcastedBinaryOp(e,r,e.dtype,(function(a,o){var i=a%o;return a<0&&o<0||a>=0&&o>=0?i:(i+o)%o}))},t.prototype.max=function(e,r){H(e,"max"),Et("max",r,e.rank);for(var a=ot(e.shape,r),o=a[0],i=a[1],s=Ne(o,e.dtype),u=Z(i),c=this.readSync(s.dataId),l=this.readSync(e.dataId),h=0;h<c.length;++h){for(var f=h*u,d=l[f],p=0;p<u;++p){var v=l[f+p];v>d&&(d=v)}c[h]=d}return s},t.prototype.maximum=function(e,r){return H([e,r],"maximum"),this.broadcastedBinaryOp(e,r,e.dtype,(function(a,o){return Math.max(a,o)}))},t.prototype.all=function(e,r){H(e,"all"),Et("all",r,e.rank);for(var a=ot(e.shape,r),o=a[0],i=a[1],s=Ne(o,e.dtype),u=Z(i),c=this.readSync(s.dataId),l=this.readSync(e.dataId),h=0;h<c.length;++h){for(var f=h*u,d=l[f],p=0;p<u;++p){var v=l[f+p];d=d&&v}c[h]=d}return s},t.prototype.any=function(e,r){H(e,"any"),Et("any",r,e.rank);for(var a=ot(e.shape,r),o=a[0],i=a[1],s=Ne(o,e.dtype),u=Z(i),c=this.readSync(s.dataId),l=this.readSync(e.dataId),h=0;h<c.length;++h){for(var f=h*u,d=l[f],p=0;p<u;++p){var v=l[f+p];d=d||v}c[h]=d}return s},t.prototype.squaredDifference=function(e,r){return H([e,r],"squaredDifference"),this.broadcastedBinaryOp(e,r,e.dtype,(function(a,o){var i=a-o;return i*i}))},t.prototype.ceil=function(e){H(e,"ceil");for(var r=this.readSync(e.dataId),a=new Float32Array(r.length),o=0;o<r.length;++o)a[o]=Math.ceil(r[o]);return this.makeOutput(a,e.shape,"float32")},t.prototype.floor=function(e){H(e,"floor");for(var r=this.readSync(e.dataId),a=new Float32Array(r.length),o=0;o<r.length;++o)a[o]=Math.floor(r[o]);return this.makeOutput(a,e.shape,"float32")},t.prototype.sign=function(e){H(e,"x");for(var r=this.readSync(e.dataId),a=new Float32Array(r.length),o=0;o<r.length;++o)r[o]<0?a[o]=-1:r[o]>0?a[o]=1:a[o]=0;return this.makeOutput(a,e.shape,"float32")},t.prototype.isNaN=function(e){H(e,"x");for(var r=this.readSync(e.dataId),a=new Uint8Array(r.length),o=0;o<r.length;++o)Number.isNaN(r[o])&&(a[o]=1);return this.makeOutput(a,e.shape,"bool")},t.prototype.isInf=function(e){H(e,"x");for(var r=this.readSync(e.dataId),a=new Uint8Array(r.length),o=0;o<r.length;++o)Math.abs(r[o])===1/0&&(a[o]=1);return this.makeOutput(a,e.shape,"bool")},t.prototype.isFinite=function(e){H(e,"x");for(var r=this.readSync(e.dataId),a=new Uint8Array(r.length),o=0;o<r.length;++o)Number.isFinite(r[o])&&(a[o]=1);return this.makeOutput(a,e.shape,"bool")},t.prototype.round=function(e){H(e,"round");for(var r=this.readSync(e.dataId),a=new Float32Array(r.length),o=0;o<r.length;++o){var i=Math.floor(r[o]);r[o]-i<.5?a[o]=Math.floor(r[o]):r[o]-i>.5?a[o]=Math.ceil(r[o]):a[o]=i%2==0?i:i+1}return this.makeOutput(a,e.shape,"float32")},t.prototype.exp=function(e){H(e,"exp");for(var r=this.readSync(e.dataId),a=new Float32Array(r.length),o=0;o<r.length;++o)a[o]=Math.exp(r[o]);return this.makeOutput(a,e.shape,"float32")},t.prototype.expm1=function(e){H(e,"expm1");for(var r=this.readSync(e.dataId),a=new Float32Array(r.length),o=0;o<r.length;++o)a[o]=Math.expm1(r[o]);return this.makeOutput(a,e.shape,"float32")},t.prototype.log=function(e){H(e,"log");for(var r=this.readSync(e.dataId),a=new Float32Array(r.length),o=0;o<r.length;++o){var i=r[o];a[o]=Math.log(i)}return this.makeOutput(a,e.shape,"float32")},t.prototype.log1p=function(e){H(e,"log1p");for(var r=this.readSync(e.dataId),a=new Float32Array(r.length),o=0;o<r.length;++o){var i=r[o];a[o]=Math.log1p(i)}return this.makeOutput(a,e.shape,"float32")},t.prototype.sqrt=function(e){H(e,"sqrt");for(var r=this.readSync(e.dataId),a=new Float32Array(r.length),o=0;o<r.length;++o){var i=r[o];a[o]=Math.sqrt(i)}return this.makeOutput(a,e.shape,"float32")},t.prototype.rsqrt=function(e){H(e,"rsqrt");for(var r=this.readSync(e.dataId),a=new Float32Array(r.length),o=0;o<r.length;++o){var i=r[o];a[o]=1/Math.sqrt(i)}return this.makeOutput(a,e.shape,"float32")},t.prototype.reciprocal=function(e){H(e,"reciprocal");for(var r=this.readSync(e.dataId),a=new Float32Array(r.length),o=0;o<r.length;++o)a[o]=1/r[o];return this.makeOutput(a,e.shape,"float32")},t.prototype.linear=function(e){return e},t.prototype.relu=function(e){H(e,"relu");for(var r=Ne(e.shape,e.dtype),a=this.readSync(r.dataId),o=this.readSync(e.dataId),i=0;i<o.length;++i)a[i]=Math.max(0,o[i]);return r},t.prototype.relu6=function(e){H(e,"relu");for(var r=Ne(e.shape,e.dtype),a=this.readSync(r.dataId),o=this.readSync(e.dataId),i=0;i<o.length;++i)a[i]=Math.min(Math.max(0,o[i]),6);return r},t.prototype.prelu=function(e,r){return H([e,r],"prelu"),this.broadcastedBinaryOp(e,r,e.dtype,(function(a,o){return a<0?o*a:a}))},t.prototype.elu=function(e){H(e,"elu");for(var r=new Float32Array(e.size),a=this.readSync(e.dataId),o=0;o<a.length;++o){var i=a[o];r[o]=i>=0?i:Math.exp(i)-1}return this.makeOutput(r,e.shape,"float32")},t.prototype.eluDer=function(e,r){H([e,r],"eluDer");for(var a=new Float32Array(r.size),o=this.readSync(r.dataId),i=this.readSync(e.dataId),s=0;s<o.length;++s){var u=o[s];a[s]=u>=1?i[s]:i[s]*(u+1)}return this.makeOutput(a,r.shape,"float32")},t.prototype.selu=function(e){H(e,"selu");for(var r=Ai,a=Di,o=new Float32Array(e.size),i=this.readSync(e.dataId),s=0;s<i.length;++s){var u=i[s];o[s]=u>=0?a*u:r*(Math.exp(u)-1)}return this.makeOutput(o,e.shape,"float32")},t.prototype.clip=function(e,r,a){H(e,"clip");for(var o=new Float32Array(e.size),i=this.readSync(e.dataId),s=0;s<i.length;++s){var u=i[s];o[s]=u>a?a:u<r?r:u}return this.makeOutput(o,e.shape,"float32")},t.prototype.abs=function(e){for(var r=new Float32Array(e.size),a=this.readSync(e.dataId),o=0;o<a.length;++o)r[o]=Math.abs(a[o]);return this.makeOutput(r,e.shape,"float32")},t.prototype.complexAbs=function(e){for(var r=new Float32Array(e.size),a=this.readSync(e.dataId),o=0;o<e.size;++o){var i=a[2*o],s=a[2*o+1];r[o]=Math.hypot(i,s)}return this.makeOutput(r,e.shape,"float32")},t.prototype.int=function(e){H(e,"int");for(var r=new Int32Array(e.size),a=this.readSync(e.dataId),o=0;o<a.length;++o)r[o]=a[o];return this.makeOutput(r,e.shape,"int32")},t.prototype.sigmoid=function(e){H(e,"sigmoid");for(var r=new Float32Array(e.size),a=this.readSync(e.dataId),o=0;o<a.length;++o)r[o]=1/(1+Math.exp(-a[o]));return this.makeOutput(r,e.shape,"float32")},t.prototype.softplus=function(e){H(e,"softplus");for(var r=Math.log(11920928955078125e-23)+2,a=new Float32Array(e.size),o=this.readSync(e.dataId),i=0;i<o.length;++i){var s=o[i]>-r,u=o[i]<r,c=Math.exp(o[i]),l=void 0;l=u?c:s?o[i]:Math.log(1+c),a[i]=l}return this.makeOutput(a,e.shape,"float32")},t.prototype.sin=function(e){H(e,"sin");for(var r=new Float32Array(e.size),a=this.readSync(e.dataId),o=0;o<a.length;++o)r[o]=Math.sin(a[o]);return this.makeOutput(r,e.shape,"float32")},t.prototype.cos=function(e){H(e,"cos");for(var r=new Float32Array(e.size),a=this.readSync(e.dataId),o=0;o<a.length;++o)r[o]=Math.cos(a[o]);return this.makeOutput(r,e.shape,"float32")},t.prototype.tan=function(e){H(e,"tan");for(var r=new Float32Array(e.size),a=this.readSync(e.dataId),o=0;o<a.length;++o)r[o]=Math.tan(a[o]);return this.makeOutput(r,e.shape,"float32")},t.prototype.asin=function(e){H(e,"asin");for(var r=new Float32Array(e.size),a=this.readSync(e.dataId),o=0;o<a.length;++o)r[o]=Math.asin(a[o]);return this.makeOutput(r,e.shape,"float32")},t.prototype.acos=function(e){H(e,"acos");for(var r=new Float32Array(e.size),a=this.readSync(e.dataId),o=0;o<a.length;++o)r[o]=Math.acos(a[o]);return this.makeOutput(r,e.shape,"float32")},t.prototype.atan=function(e){H(e,"atan");for(var r=new Float32Array(e.size),a=this.readSync(e.dataId),o=0;o<a.length;++o)r[o]=Math.atan(a[o]);return this.makeOutput(r,e.shape,"float32")},t.prototype.atan2=function(e,r){return H([e,r],"atan2"),this.broadcastedBinaryOp(e,r,e.dtype,(function(a,o){return Math.atan2(a,o)}))},t.prototype.sinh=function(e){H(e,"sinh");for(var r=new Float32Array(e.size),a=this.readSync(e.dataId),o=0;o<a.length;++o)r[o]=Math.sinh(a[o]);return this.makeOutput(r,e.shape,"float32")},t.prototype.cosh=function(e){H(e,"cosh");for(var r=new Float32Array(e.size),a=this.readSync(e.dataId),o=0;o<a.length;++o)r[o]=Math.cosh(a[o]);return this.makeOutput(r,e.shape,"float32")},t.prototype.tanh=function(e){H(e,"tanh");for(var r=new Float32Array(e.size),a=this.readSync(e.dataId),o=0;o<a.length;++o)r[o]=ud(a[o]);return this.makeOutput(r,e.shape,"float32")},t.prototype.asinh=function(e){H(e,"asinh");for(var r=new Float32Array(e.size),a=this.readSync(e.dataId),o=0;o<a.length;++o)r[o]=Math.asinh(a[o]);return this.makeOutput(r,e.shape,"float32")},t.prototype.acosh=function(e){H(e,"acosh");for(var r=new Float32Array(e.size),a=this.readSync(e.dataId),o=0;o<a.length;++o)r[o]=Math.acosh(a[o]);return this.makeOutput(r,e.shape,"float32")},t.prototype.atanh=function(e){H(e,"atanh");for(var r=new Float32Array(e.size),a=this.readSync(e.dataId),o=0;o<a.length;++o)r[o]=Math.atanh(a[o]);return this.makeOutput(r,e.shape,"float32")},t.prototype.erf=function(e){H(e,"erf");for(var r=new Float32Array(e.size),a=this.readSync(e.dataId),o=0;o<a.length;++o){var i=Math.sign(a[o]),s=Math.abs(a[o]),u=1/(1+.3275911*s);r[o]=i*(1-((((1.061405429*u-1.453152027)*u+1.421413741)*u-.284496736)*u+.254829592)*u*Math.exp(-s*s))}return this.makeOutput(r,e.shape,"float32")},t.prototype.step=function(e,r){r===void 0&&(r=0),H(e,"step");for(var a=new Float32Array(e.size),o=this.readSync(e.dataId),i=0;i<o.length;++i){var s=o[i];isNaN(s)?a[i]=NaN:a[i]=s>0?1:r}return this.makeOutput(a,e.shape,"float32")},t.prototype.fusedConv2d=function(e){var r=e.input,a=e.filter,o=e.convInfo,i=e.bias,s=e.activation,u=e.preluActivationWeights,c=this.conv2d(r,a,o);return i&&(c=this.add(c,i)),s&&(c=No(this,c,s,u)),c},t.prototype.conv2d=function(e,r,a){H([e,r],"conv2d");for(var o=a.filterHeight,i=a.filterWidth,s=a.dilationHeight,u=a.dilationWidth,c=a.padInfo.left,l=a.padInfo.top,h=a.dataFormat==="channelsLast",f=fe(a.outShape,e.dtype),d=e.strides[0],p=h?e.strides[1]:e.strides[2],v=h?e.strides[2]:1,m=h?1:e.strides[1],g=f.strides[0],y=h?f.strides[1]:f.strides[2],b=h?f.strides[2]:1,x=h?1:f.strides[1],w=this.readSync(e.dataId),C=this.readSync(r.dataId),k=f.values,S=0;S<a.batchSize;++S)for(var _=S*d,R=S*g,D=0;D<a.outHeight;++D)for(var A=R+D*y,O=D*a.strideHeight-l,P=0;P<o;P++){var F=O+P*s;if(!(F<0||F>=a.inHeight))for(var V=P*r.strides[0],z=_+F*p,U=0;U<a.outWidth;++U)for(var L=A+U*b,G=U*a.strideWidth-c,q=0;q<i;q++){var Y=G+q*u;if(!(Y<0||Y>=a.inWidth))for(var re=z+Y*v,ie=V+q*r.strides[1],se=0;se<a.inChannels;++se){for(var ce=w[re+se*m],he=0;he<a.outChannels;++he)k[L+he*x]+=ce*C[ie+he];ie+=a.outChannels}}}return f.toTensor()},t.prototype.conv3d=function(e,r,a){for(var o=a.filterDepth,i=a.filterHeight,s=a.filterWidth,u=a.dilationDepth,c=a.dilationHeight,l=a.dilationWidth,h=a.padInfo.front,f=a.padInfo.left,d=a.padInfo.top,p=fe(a.outShape,e.dtype),v=this.readSync(e.dataId),m=this.readSync(r.dataId),g=p.values,y=0;y<a.batchSize;++y)for(var b=y*e.strides[0],x=y*p.strides[0],w=0;w<a.outDepth;++w)for(var C=x+w*p.strides[1],k=w*a.strideDepth-h,S=0;S<o;S++){var _=k+S*u;if(!(_<0||_>=a.inDepth))for(var R=S*r.strides[0],D=b+_*e.strides[1],A=0;A<a.outHeight;++A)for(var O=C+A*p.strides[2],P=A*a.strideHeight-d,F=0;F<i;F++){var V=P+F*c;if(!(V<0||V>=a.inHeight))for(var z=R+F*r.strides[1],U=D+V*e.strides[2],L=0;L<a.outWidth;++L)for(var G=O+L*a.outChannels,q=L*a.strideWidth-f,Y=0;Y<s;Y++){var re=q+Y*l;if(!(re<0||re>=a.inWidth))for(var ie=z+Y*r.strides[2],se=U+re*a.inChannels,ce=ie,he=0;he<a.inChannels;++he){for(var de=v[se+he],pe=0;pe<a.outChannels;++pe)g[G+pe]+=de*m[ce+pe];ce+=a.outChannels}}}}return p.toTensor()},t.prototype.conv2dDerInput=function(e,r,a){H([e,r],"conv2dDerInput");for(var o=fe(a.inShape,"float32"),i=o.values,s=this.readSync(e.dataId),u=this.readSync(r.dataId),c=r.strides,l=c[0],h=c[1],f=c[2],d=a.batchSize,p=a.filterHeight,v=a.filterWidth,m=a.inChannels,g=a.inHeight,y=a.inWidth,b=a.outChannels,x=a.outHeight,w=a.outWidth,C=a.strideHeight,k=a.strideWidth,S=a.dataFormat,_=p-1-a.padInfo.top,R=v-1-a.padInfo.left,D=S==="channelsLast",A=o.strides[0],O=D?o.strides[1]:o.strides[2],P=D?o.strides[2]:1,F=D?1:o.strides[1],V=e.strides[0],z=D?e.strides[1]:e.strides[2],U=D?e.strides[2]:1,L=D?1:e.strides[1],G=0;G<d;++G)for(var q=0;q<m;++q)for(var Y=0;Y<g;++Y)for(var re=Y-_,ie=Math.max(0,Math.ceil(re/C)),se=Math.min(x,(p+re)/C),ce=0;ce<y;++ce){for(var he=ce-R,de=Math.max(0,Math.ceil(he/k)),pe=Math.min(w,(v+he)/k),De=0,ve=ie;ve<se;++ve)for(var me=ve*C-re,oe=de;oe<pe;++oe)for(var _e=V*G+z*ve+U*oe,be=l*(p-1-me)+h*(v-1-(oe*k-he))+f*q,Te=0;Te<b;++Te)De+=s[_e+L*Te]*u[be+Te];i[A*G+O*Y+P*ce+F*q]=De}return o.toTensor()},t.prototype.conv3dDerInput=function(e,r,a){for(var o=fe(a.inShape,"float32"),i=o.values,s=o.strides,u=s[0],c=s[1],l=s[2],h=s[3],f=this.readSync(e.dataId),d=e.strides,p=d[0],v=d[1],m=d[2],g=d[3],y=this.readSync(r.dataId),b=r.strides,x=b[0],w=b[1],C=b[2],k=b[3],S=a.batchSize,_=a.filterDepth,R=a.filterHeight,D=a.filterWidth,A=a.inChannels,O=a.inDepth,P=a.inHeight,F=a.inWidth,V=a.outChannels,z=a.outDepth,U=a.outHeight,L=a.outWidth,G=a.strideDepth,q=a.strideHeight,Y=a.strideWidth,re=_-1-a.padInfo.front,ie=R-1-a.padInfo.top,se=D-1-a.padInfo.left,ce=0;ce<S;++ce)for(var he=0;he<A;++he)for(var de=0;de<O;++de)for(var pe=de-re,De=Math.max(0,Math.ceil(pe/G)),ve=Math.min(z,(_+pe)/G),me=0;me<P;++me)for(var oe=me-ie,_e=Math.max(0,Math.ceil(oe/q)),be=Math.min(U,(R+oe)/q),Te=0;Te<F;++Te){for(var vt=Te-se,ht=Math.max(0,Math.ceil(vt/Y)),Ye=Math.min(L,(D+vt)/Y),Lt=0,Tt=De;Tt<ve;++Tt)for(var ft=Tt*G-pe,Ct=_e;Ct<be;++Ct)for(var ln=Ct*q-oe,At=ht;At<Ye;++At)for(var tr=p*ce+v*Tt+m*Ct+g*At,Ut=x*(_-1-ft)+w*(R-1-ln)+C*(D-1-(At*Y-vt))+k*he,dt=0;dt<V;++dt)Lt+=f[tr+dt]*y[Ut+dt];i[u*ce+c*de+l*me+h*Te+he]=Lt}return o.toTensor()},t.prototype.conv2dDerFilter=function(e,r,a){H([e,r],"conv2dDerFilter");for(var o=a.strideHeight,i=a.strideWidth,s=a.filterHeight,u=a.filterWidth,c=a.dataFormat==="channelsLast",l=fe(a.filterShape,"float32"),h=a.padInfo.left,f=a.padInfo.top,d=this.bufferSync(e),p=this.bufferSync(r),v=0;v<s;++v)for(var m=Math.max(0,Math.ceil((f-v)/o)),g=Math.min(a.outHeight,(a.inHeight+f-v)/o),y=0;y<u;++y)for(var b=Math.max(0,Math.ceil((h-y)/i)),x=Math.min(a.outWidth,(a.inWidth+h-y)/i),w=0;w<a.inChannels;++w)for(var C=0;C<a.outChannels;++C){for(var k=0,S=0;S<a.batchSize;++S)for(var _=m;_<g;++_)for(var R=v+_*o-f,D=b;D<x;++D){var A=y+D*i-h;k+=c?d.get(S,R,A,w)*p.get(S,_,D,C):d.get(S,w,R,A)*p.get(S,C,_,D)}l.set(k,v,y,w,C)}return l.toTensor()},t.prototype.conv3dDerFilter=function(e,r,a){for(var o=a.strideDepth,i=a.strideHeight,s=a.strideWidth,u=a.filterDepth,c=a.filterHeight,l=a.filterWidth,h=fe(a.filterShape,"float32"),f=h.values,d=h.strides,p=d[0],v=d[1],m=d[2],g=d[3],y=this.readSync(r.dataId),b=r.strides,x=b[0],w=b[1],C=b[2],k=b[3],S=this.readSync(e.dataId),_=e.strides,R=_[0],D=_[1],A=_[2],O=_[3],P=a.padInfo.front,F=a.padInfo.left,V=a.padInfo.top,z=0;z<u;++z)for(var U=Math.max(0,Math.ceil((P-z)/o)),L=Math.min(a.outDepth,(a.inDepth+P-z)/o),G=z*p,q=0;q<c;++q)for(var Y=Math.max(0,Math.ceil((V-q)/i)),re=Math.min(a.outHeight,(a.inHeight+V-q)/i),ie=q*v+G,se=0;se<l;++se)for(var ce=Math.max(0,Math.ceil((F-se)/s)),he=Math.min(a.outWidth,(a.inWidth+F-se)/s),de=se*m+ie,pe=0;pe<a.inChannels;++pe)for(var De=pe*g+de,ve=0;ve<a.outChannels;++ve){for(var me=0,oe=0;oe<a.batchSize;++oe)for(var _e=oe*R,be=oe*x,Te=U;Te<L;++Te)for(var vt=(z+Te*o-P)*D+_e,ht=Te*w+be,Ye=Y;Ye<re;++Ye)for(var Lt=(q+Ye*i-V)*A+vt,Tt=Ye*C+ht,ft=ce;ft<he;++ft){var Ct=ft*k+Tt;me+=S[(se+ft*s-F)*O+Lt+pe]*y[Ct+ve]}f[De+ve]=me}return h.toTensor()},t.prototype.fusedDepthwiseConv2D=function(e){var r=e.input,a=e.filter,o=e.convInfo,i=e.bias,s=e.activation,u=e.preluActivationWeights,c=this.depthwiseConv2D(r,a,o);return i&&(c=this.add(c,i)),s&&(c=No(this,c,s,u)),c},t.prototype.depthwiseConv2D=function(e,r,a){H([e,r],"depthwiseConv2D");for(var o=a.filterHeight,i=a.filterWidth,s=a.dilationHeight,u=a.dilationWidth,c=a.padInfo.left,l=a.padInfo.top,h=a.outChannels/a.inChannels,f=fe(a.outShape,e.dtype),d=this.readSync(e.dataId),p=this.readSync(r.dataId),v=f.values,m=0;m<a.batchSize;++m)for(var g=m*e.strides[0],y=m*f.strides[0],b=0;b<a.outHeight;++b)for(var x=y+b*f.strides[1],w=b*a.strideHeight-c,C=0;C<o;++C){var k=w+C*s;if(!(k<0||k>=a.inHeight))for(var S=C*r.strides[0],_=g+k*e.strides[1],R=0;R<a.outWidth;++R)for(var D=x+R*f.strides[2],A=R*a.strideWidth-l,O=0;O<i;++O){var P=A+O*u;if(!(P<0||P>=a.inWidth))for(var F=S+O*r.strides[1],V=_+P*a.inChannels,z=D,U=F,L=0;L<a.inChannels;++L){for(var G=d[V+L],q=0;q<h;++q)v[z+q]+=G*p[U+q];z+=h,U+=h}}}return f.toTensor()},t.prototype.depthwiseConv2DDerInput=function(e,r,a){H([e,r],"depthwiseConv2DDerInput");for(var o=fe(a.inShape,"float32"),i=o.values,s=o.strides,u=s[0],c=s[1],l=s[2],h=this.readSync(e.dataId),f=e.strides,d=f[0],p=f[1],v=f[2],m=this.readSync(r.dataId),g=r.strides,y=g[0],b=g[1],x=g[2],w=a.batchSize,C=a.filterHeight,k=a.filterWidth,S=a.inChannels,_=a.inHeight,R=a.inWidth,D=a.outChannels,A=a.outHeight,O=a.outWidth,P=a.strideHeight,F=a.strideWidth,V=C-1-a.padInfo.top,z=k-1-a.padInfo.left,U=D/S,L=0;L<w;++L)for(var G=0;G<S;++G)for(var q=0;q<_;++q)for(var Y=q-V,re=Math.max(0,Math.ceil(Y/P)),ie=Math.min(A,(C+Y)/P),se=0;se<R;++se){for(var ce=se-z,he=Math.max(0,Math.ceil(ce/F)),de=Math.min(O,(k+ce)/F),pe=0,De=re;De<ie;++De)for(var ve=De*P-Y,me=he;me<de;++me)for(var oe=d*L+p*De+v*me,_e=y*(C-1-ve)+b*(k-1-(me*F-ce))+x*G,be=0;be<U;++be)pe+=h[oe+(G*U+be)]*m[_e+be];i[u*L+c*q+l*se+G]=pe}return o.toTensor()},t.prototype.depthwiseConv2DDerFilter=function(e,r,a){H([e,r],"depthwiseConv2DDerFilter");for(var o=a.strideHeight,i=a.strideWidth,s=a.filterHeight,u=a.filterWidth,c=fe(a.filterShape,"float32"),l=a.padInfo.left,h=a.padInfo.top,f=a.outChannels/a.inChannels,d=this.bufferSync(e),p=this.bufferSync(r),v=0;v<s;++v)for(var m=Math.max(0,Math.ceil((h-v)/o)),g=Math.min(a.outHeight,(a.inHeight+h-v)/o),y=0;y<u;++y)for(var b=Math.max(0,Math.ceil((l-y)/i)),x=Math.min(a.outWidth,(a.inWidth+l-y)/i),w=0;w<a.outChannels;++w){for(var C=Math.trunc(w/f),k=w%f,S=0,_=0;_<a.batchSize;++_)for(var R=m;R<g;++R)for(var D=v+R*o-h,A=b;A<x;++A){var O=y+A*i-l;S+=d.get(_,D,O,C)*p.get(_,R,A,w)}c.set(S,v,y,C,k)}return c.toTensor()},t.prototype.tile=function(e,r){return H(e,"tile"),Sc(this.bufferSync(e),r)},t.prototype.pad=function(e,r,a){H(e,"pad");var o=r.map((function(f,d){return f[0]+e.shape[d]+f[1]})),i=r.map((function(f){return f[0]})),s=this.bufferSync(e),u=fe(o,e.dtype);a!==0&&u.values.fill(a);for(var c=0;c<e.size;c++){var l=s.indexToLoc(c),h=l.map((function(f,d){return f+i[d]}));u.set.apply(u,[s.get.apply(s,l)].concat(h))}return u.toTensor()},t.prototype.transpose=function(e,r){H(e,"transpose");for(var a=new Array(e.rank),o=0;o<a.length;o++)a[o]=e.shape[r[o]];var i=this.readSync(e.dataId),s=fe(a,e.dtype),u=this.bufferSync(e);for(o=0;o<e.size;++o){for(var c=u.indexToLoc(o),l=new Array(c.length),h=0;h<l.length;h++)l[h]=c[r[h]];var f=s.locToIndex(l);s.values[f]=i[o]}return s.toTensor()},t.prototype.gather=function(e,r,a){H([e,r],"gather");var o=e.shape.slice(),i=this.readSync(r.dataId);o[a]=i.length;for(var s=fe(o,e.dtype),u=this.bufferSync(e),c=0;c<s.size;++c){var l=s.indexToLoc(c),h=l.slice();h[a]=i[l[a]];var f=u.locToIndex(h);s.values[c]=u.values[f]}return s.toTensor()},t.prototype.batchToSpaceND=function(e,r,a){H([e],"batchToSpaceND");var o=r.reduce((function(h,f){return h*f})),i=Fa(e.shape,r,o),s=Pa(i.length,r.length),u=Ba(e.shape,r,o),c=fc(a,r.length),l=dc(u,a,r.length);return e.reshape(i).transpose(s).reshape(u).slice(c,l)},t.prototype.spaceToBatchND=function(e,r,a){H([e],"spaceToBatchND");var o=r.reduce((function(f,d){return f*d})),i=[[0,0]];i.push.apply(i,a);for(var s=1+r.length;s<e.shape.length;++s)i.push([0,0]);var u=e.pad(i),c=Fa(u.shape,r,o,!1),l=Pa(c.length,r.length,!1),h=Ba(u.shape,r,o,!1);return u.reshape(c).transpose(l).reshape(h)},t.prototype.pool=function(e,r,a){H(e,"pool");for(var o=r.strideHeight,i=r.strideWidth,s=r.dilationHeight,u=r.dilationWidth,c=r.effectiveFilterHeight,l=r.effectiveFilterWidth,h=r.padInfo.top,f=r.padInfo.left,d=a==="max"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,p=this.readSync(e.dataId),v=fe(r.outShape,e.dtype),m=v.values,g=r.outShape[1]*r.outShape[2]*r.outShape[3],y=r.outShape[2]*r.outShape[3],b=r.outShape[3],x=0;x<r.batchSize;++x)for(var w=x*g,C=x*e.strides[0],k=0;k<r.inChannels;++k)for(var S=0;S<r.outHeight;++S)for(var _=S*o-h,R=Math.max(0,_),D=Math.min(r.inHeight,c+_),A=w+S*y,O=0;O<r.outWidth;++O){for(var P=O*i-f,F=Math.max(0,P),V=Math.min(r.inWidth,l+P),z=d,U=0,L=0,G=R;G<D;G+=s){for(var q=C+G*e.strides[1],Y=F;Y<V;Y+=u){var re=p[q+Y*e.strides[2]+k];a==="max"&&re>z?z=re:a==="avg"&&(U+=re,L++)}if(isNaN(z))break}m[A+O*b+k]=a==="avg"?U/L:z}return v.toTensor()},t.prototype.maxPool=function(e,r){return this.pool(e,r,"max")},t.prototype.maxPoolPositions=function(e,r){for(var a=fe(r.outShape,"int32"),o=r.strideHeight,i=r.strideWidth,s=r.dilationHeight,u=r.dilationWidth,c=r.effectiveFilterHeight,l=r.effectiveFilterWidth,h=r.padInfo.top,f=r.padInfo.left,d=this.bufferSync(e),p=0;p<r.batchSize;++p)for(var v=0;v<r.inChannels;++v)for(var m=0;m<r.outHeight;++m){for(var g=m*o-h,y=g;y<0;)y+=s;for(var b=Math.min(r.inHeight,c+g),x=0;x<r.outWidth;++x){for(var w=x*i-f,C=w;C<0;)C+=u;for(var k=Math.min(r.inWidth,l+w),S=Number.NEGATIVE_INFINITY,_=-1,R=y;R<b;R+=s)for(var D=R-g,A=C;A<k;A+=u){var O=A-w,P=d.get(p,R,A,v);P>S&&(S=P,_=D*l+O)}a.set(_,p,m,x,v)}}return a.toTensor()},t.prototype.maxPoolBackprop=function(e,r,a,o){H([r,a],"maxPoolBackprop");for(var i=this.maxPoolPositions(r,o),s=o.strideHeight,u=o.strideWidth,c=o.dilationHeight,l=o.dilationWidth,h=o.effectiveFilterHeight,f=o.effectiveFilterWidth,d=f-1-o.padInfo.left,p=h-1-o.padInfo.top,v=fe(r.shape,"float32"),m=this.bufferSync(i),g=this.bufferSync(e),y=0;y<o.batchSize;++y)for(var b=0;b<o.inChannels;++b)for(var x=0;x<o.inHeight;++x)for(var w=0;w<o.inWidth;++w){for(var C=x-p,k=w-d,S=0,_=0;_<h;_+=c){var R=(C+_)/s;if(!(R<0||R>=o.outHeight||Math.floor(R)!==R))for(var D=0;D<f;D+=l){var A=(k+D)/u;if(!(A<0||A>=o.outWidth||Math.floor(A)!==A)){var O=h*f-1-m.get(y,R,A,b)===_*f+D?1:0;O!==0&&(S+=g.get(y,R,A,b)*O)}}}v.set(S,y,x,w,b)}return v.toTensor()},t.prototype.avgPoolBackprop=function(e,r,a){H([e,r],"avgPoolBackprop");for(var o=a.strideHeight,i=a.strideWidth,s=a.filterHeight,u=a.filterWidth,c=a.dilationHeight,l=a.dilationWidth,h=a.effectiveFilterHeight,f=a.effectiveFilterWidth,d=f-1-a.padInfo.left,p=h-1-a.padInfo.top,v=fe(r.shape,"float32"),m=1/(s*u),g=this.bufferSync(e),y=0;y<a.batchSize;++y)for(var b=0;b<a.inChannels;++b)for(var x=0;x<a.inHeight;++x)for(var w=0;w<a.inWidth;++w){for(var C=x-p,k=w-d,S=0,_=0;_<h;_+=c){var R=(C+_)/o;if(!(R<0||R>=a.outHeight||Math.floor(R)!==R))for(var D=0;D<f;D+=l){var A=(k+D)/i;A<0||A>=a.outWidth||Math.floor(A)!==A||(S+=g.get(y,R,A,b))}}v.set(S*m,y,x,w,b)}return v.toTensor()},t.prototype.pool3d=function(e,r,a){H(e,"pool3d");for(var o=r.strideDepth,i=r.strideHeight,s=r.strideWidth,u=r.dilationDepth,c=r.dilationHeight,l=r.dilationWidth,h=r.effectiveFilterDepth,f=r.effectiveFilterHeight,d=r.effectiveFilterWidth,p=r.padInfo.front,v=r.padInfo.top,m=r.padInfo.left,g=a==="max"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,y=this.readSync(e.dataId),b=fe(r.outShape,e.dtype),x=b.values,w=r.outShape[1]*r.outShape[2]*r.outShape[3]*r.outShape[4],C=r.outShape[2]*r.outShape[3]*r.outShape[4],k=r.outShape[3]*r.outShape[4],S=r.outShape[4],_=0;_<r.batchSize;++_)for(var R=_*w,D=_*e.strides[0],A=0;A<r.inChannels;++A)for(var O=0;O<r.outDepth;++O){for(var P=O*o-p,F=P;F<0;)F+=u;for(var V=Math.min(r.inDepth,h+P),z=R+O*C,U=0;U<r.outHeight;++U){for(var L=U*i-v,G=L;G<0;)G+=c;for(var q=Math.min(r.inHeight,f+L),Y=z+U*k,re=0;re<r.outWidth;++re){for(var ie=re*s-m,se=ie;se<0;)se+=l;for(var ce=Math.min(r.inWidth,d+ie),he=Y+re*S,de=g,pe=0,De=0,ve=F;ve<V;ve+=u){for(var me=D+ve*e.strides[1],oe=G;oe<q;oe+=c){for(var _e=me+oe*e.strides[2],be=se;be<ce;be+=l){var Te=y[_e+be*e.strides[3]+A];if(a==="max"&&Te>de?de=Te:a==="avg"&&(pe+=Te,De++),isNaN(de))break}if(isNaN(de))break}if(isNaN(de))break}x[he+A]=a==="avg"?pe/De:de}}}return b.toTensor()},t.prototype.avgPool3d=function(e,r){return H(e,"avgPool3d"),this.pool3d(e,r,"avg").toFloat()},t.prototype.avgPool3dBackprop=function(e,r,a){H([e,r],"avgPool3dBackprop");for(var o=a.strideDepth,i=a.strideHeight,s=a.strideWidth,u=a.filterDepth,c=a.filterHeight,l=a.filterWidth,h=a.dilationDepth,f=a.dilationHeight,d=a.dilationWidth,p=a.effectiveFilterDepth,v=a.effectiveFilterHeight,m=a.effectiveFilterWidth,g=p-1-a.padInfo.front,y=m-1-a.padInfo.left,b=v-1-a.padInfo.top,x=fe(r.shape,"float32"),w=1/(u*c*l),C=this.bufferSync(e),k=0;k<a.batchSize;++k)for(var S=0;S<a.inChannels;++S)for(var _=0;_<a.inDepth;++_)for(var R=0;R<a.inHeight;++R)for(var D=0;D<a.inWidth;++D){for(var A=_-g,O=R-b,P=D-y,F=0,V=0;V<p;V+=h){var z=(A+V)/o;if(!(z<0||z>=a.outDepth||Math.floor(z)!==z))for(var U=0;U<v;U+=f){var L=(O+U)/i;if(!(L<0||L>=a.outHeight||Math.floor(L)!==L))for(var G=0;G<m;G+=d){var q=(P+G)/s;q<0||q>=a.outWidth||Math.floor(q)!==q||(F+=C.get(k,z,L,q,S))}}}x.set(F*w,k,_,R,D,S)}return x.toTensor()},t.prototype.maxPool3d=function(e,r){return H(e,"maxPool3d"),this.pool3d(e,r,"max").toFloat()},t.prototype.maxPool3dPositions=function(e,r){for(var a=fe(r.outShape,"int32"),o=r.strideDepth,i=r.strideHeight,s=r.strideWidth,u=r.dilationDepth,c=r.dilationHeight,l=r.dilationWidth,h=r.effectiveFilterDepth,f=r.effectiveFilterHeight,d=r.effectiveFilterWidth,p=r.padInfo.front,v=r.padInfo.top,m=r.padInfo.left,g=this.bufferSync(e),y=0;y<r.batchSize;++y)for(var b=0;b<r.inChannels;++b)for(var x=0;x<r.outDepth;++x){for(var w=x*o-p,C=w;C<0;)C+=u;for(var k=Math.min(r.inDepth,h+w),S=0;S<r.outHeight;++S){for(var _=S*i-v,R=_;R<0;)R+=c;for(var D=Math.min(r.inHeight,f+_),A=0;A<r.outWidth;++A){for(var O=A*s-m,P=O;P<0;)P+=l;for(var F=Math.min(r.inWidth,d+O),V=Number.NEGATIVE_INFINITY,z=-1,U=C;U<k;U+=u)for(var L=U-w,G=R;G<D;G+=c)for(var q=G-_,Y=P;Y<F;Y+=l){var re=Y-O,ie=g.get(y,U,G,Y,b);ie>=V&&(V=ie,z=L*f*d+q*f+re)}a.set(z,y,x,S,A,b)}}}return a.toTensor()},t.prototype.maxPool3dBackprop=function(e,r,a,o){H([r,a],"maxPool3dBackprop");for(var i=this.maxPool3dPositions(r,o),s=o.strideDepth,u=o.strideHeight,c=o.strideWidth,l=o.dilationDepth,h=o.dilationHeight,f=o.dilationWidth,d=o.effectiveFilterDepth,p=o.effectiveFilterHeight,v=o.effectiveFilterWidth,m=d-1-o.padInfo.front,g=v-1-o.padInfo.left,y=p-1-o.padInfo.top,b=fe(r.shape,"float32"),x=this.bufferSync(i),w=this.bufferSync(e),C=0;C<o.batchSize;++C)for(var k=0;k<o.inChannels;++k)for(var S=0;S<o.inDepth;++S)for(var _=0;_<o.inHeight;++_)for(var R=0;R<o.inWidth;++R){for(var D=S-m,A=_-y,O=R-g,P=0,F=0;F<d;F+=l){var V=(D+F)/s;if(!(V<0||V>=o.outDepth||Math.floor(V)!==V))for(var z=0;z<p;z+=h){var U=(A+z)/u;if(!(U<0||U>=o.outHeight||Math.floor(U)!==U))for(var L=0;L<v;L+=f){var G=(O+L)/c;if(!(G<0||G>=o.outWidth||Math.floor(G)!==G)){var q=d*p*v-1-x.get(C,V,U,G,k)===F*p*v+z*v+L?1:0;q!==0&&(P+=w.get(C,V,U,G,k)*q)}}}}b.set(P,C,S,_,R,k)}return b.toTensor()},t.prototype.cast=function(e,r){return wc(e,r,this)},t.prototype.reshape=function(e,r){return ri(e,r)},t.prototype.avgPool=function(e,r){return H(e,"avgPool"),this.pool(e,r,"avg").toFloat()},t.prototype.resizeBilinear=function(e,r,a,o){H(e,"resizeBilinear");for(var i=e.shape,s=i[0],u=i[1],c=i[2],l=i[3],h=this.readSync(e.dataId),f=new Float32Array(Z([s,r,a,l])),d=[o&&r>1?u-1:u,o&&a>1?c-1:c],p=[o&&r>1?r-1:r,o&&a>1?a-1:a],v=0,m=d[0]/p[0],g=d[1]/p[1],y=0;y<s;y++)for(var b=0;b<r;b++)for(var x=m*b,w=Math.floor(x),C=x-w,k=Math.min(u-1,Math.ceil(x)),S=y*e.strides[0]+w*e.strides[1],_=y*e.strides[0]+k*e.strides[1],R=0;R<a;R++)for(var D=g*R,A=Math.floor(D),O=D-A,P=Math.min(c-1,Math.ceil(D)),F=S+A*e.strides[2],V=_+A*e.strides[2],z=S+P*e.strides[2],U=_+P*e.strides[2],L=0;L<l;L++){var G=h[F+L],q=h[V+L],Y=G+(h[z+L]-G)*O,re=Y+(q+(h[U+L]-q)*O-Y)*C;f[v++]=re}return rt(f,[s,r,a,l])},t.prototype.resizeBilinearBackprop=function(e,r,a){H([e,r],"resizeBilinearBackprop");for(var o=r.shape,i=o[0],s=o[1],u=o[2],c=o[3],l=e.shape,h=l[1],f=l[2],d=new Float32Array(i*s*u*c),p=[a&&h>1?s-1:s,a&&f>1?u-1:u],v=[a&&h>1?h-1:h,a&&f>1?f-1:f],m=p[0]/v[0],g=p[1]/v[1],y=this.readSync(e.dataId),b=0,x=0;x<i;x++)for(var w=x*r.strides[0],C=0;C<h;C++)for(var k=C*m,S=Math.floor(k),_=Math.min(Math.ceil(k),s-1),R=w+S*r.strides[1],D=w+_*r.strides[1],A=k-S,O=1-A,P=0;P<f;P++)for(var F=P*g,V=Math.floor(F),z=Math.min(Math.ceil(F),u-1),U=F-V,L=1-U,G=R+V*r.strides[2],q=R+z*r.strides[2],Y=D+V*r.strides[2],re=D+z*r.strides[2],ie=O*L,se=O*U,ce=A*L,he=A*U,de=0;de<c;de++){var pe=y[b++];d[G+de]+=pe*ie,d[q+de]+=pe*se,d[Y+de]+=pe*ce,d[re+de]+=pe*he}return mt(d,[i,u,s,c],r.dtype)},t.prototype.resizeNearestNeighbor=function(e,r,a,o){H(e,"resizeNearestNeighbor");for(var i=e.shape,s=i[0],u=i[1],c=i[2],l=i[3],h=this.readSync(e.dataId),f=new Float32Array(s*r*a*l),d=[o&&r>1?u-1:u,o&&a>1?c-1:c],p=[o&&r>1?r-1:r,o&&a>1?a-1:a],v=d[0]/p[0],m=d[1]/p[1],g=0,y=0;y<s;y++)for(var b=y*e.strides[0],x=0;x<r;x++)for(var w=v*x,C=b+Math.min(u-1,o?Math.round(w):Math.floor(w))*e.strides[1],k=0;k<a;k++)for(var S=m*k,_=C+Math.min(c-1,o?Math.round(S):Math.floor(S))*e.strides[2],R=0;R<l;R++){var D=h[_+R];f[g++]=D}return rt(f,[s,r,a,l],e.dtype)},t.prototype.resizeNearestNeighborBackprop=function(e,r,a){H([e,r],"resizeNearestNeighborBackprop");for(var o=r.shape,i=o[0],s=o[1],u=o[2],c=o[3],l=e.shape,h=l[1],f=l[2],d=new Float32Array(i*s*u*c),p=this.readSync(e.dataId),v=[a&&h>1?s-1:s,a&&f>1?u-1:u],m=[a&&h>1?h-1:h,a&&f>1?f-1:f],g=v[0]/m[0],y=v[1]/m[1],b=1/g,x=1/y,w=2*Math.ceil(b)+2,C=2*Math.ceil(x)+2,k=0;k<i;k++)for(var S=k*r.strides[0],_=0;_<s;_++)for(var R=S+_*r.strides[1],D=Math.floor(_*b),A=Math.floor(D-w/2),O=0;O<u;O++)for(var P=R+O*r.strides[2],F=Math.floor(O*x),V=Math.floor(F-C/2),z=0;z<c;z++){for(var U=0,L=0;L<w;L++){var G=L+A;if(!(G<0||G>=h)){var q=S+G*e.strides[1],Y=G*g;if(_===Math.min(s-1,a?Math.round(Y):Math.floor(Y)))for(var re=0;re<C;re++){var ie=re+V;if(!(ie<0||ie>=f)){var se=q+ie*e.strides[2],ce=ie*y;O===Math.min(u-1,a?Math.round(ce):Math.floor(ce))&&(U+=p[se+z])}}}}d[P+z]=U}return mt(d,r.shape,r.dtype)},t.prototype.batchNormalization=function(e,r,a,o,i,s){H([e,r,a,i,s],"batchNorm");for(var u=this.readSync(e.dataId),c=this.readSync(r.dataId),l=this.readSync(a.dataId),h=i?this.readSync(i.dataId):new Float32Array([1]),f=s?this.readSync(s.dataId):new Float32Array([0]),d=new Float32Array(u.length),p=f.length,v=h.length,m=l.length,g=c.length,y=0,b=0,x=0,w=0,C=0;C<u.length;++C)d[C]=f[y++]+(u[C]-c[b++])*h[x++]/Math.sqrt(l[w++]+o),y>=p&&(y=0),b>=g&&(b=0),x>=v&&(x=0),w>=m&&(w=0);return mt(d,e.shape)},t.prototype.localResponseNormalization4D=function(e,r,a,o,i){H(e,"localResponseNormalization4D");var s=e.shape[3],u=s-1,c=this.readSync(e.dataId),l=e.size,h=new Float32Array(l);function f(m){for(var g=m%s,y=m-g+Math.max(0,g-r),b=m-g+Math.min(g+r,u),x=0;y<=b;y++){var w=c[y];x+=w*w}return x}for(var d=0;d<l;d++){var p=f(d),v=c[d]*Math.pow(a+o*p,-i);h[d]=v}return mt(h,e.shape)},t.prototype.LRNGrad=function(e,r,a,o,i,s,u){H(e,"LRNGrad");for(var c=e.shape[3],l=this.readSync(e.dataId),h=this.readSync(r.dataId),f=this.readSync(a.dataId),d=new Float32Array(e.size),p=e.size,v=0;v<p;v++){for(var m=v%c,g=v-m+Math.max(0,m-o),y=v-m+Math.min(c,m+o+1),b=0,x=g;x<y;x++)b+=Math.pow(h[x],2);for(b=s*b+i,x=g;x<y;x++){var w=-2*s*u*h[x]*f[v]/b;v===x&&(w+=Math.pow(b,-u)),w*=l[v],d[x]+=w}}return mt(d,e.shape)},t.prototype.multinomial=function(e,r,a,o){H(e,"multinomial");for(var i=r?e:mn(e),s=i.shape[0],u=i.shape[1],c=Ne([s,a],"int32"),l=this.readSync(c.dataId),h=this.readSync(i.dataId),f=0;f<s;++f){var d=f*u,p=new Float32Array(u-1);p[0]=h[d];for(var v=1;v<p.length;++v)p[v]=p[v-1]+h[d+v];for(var m=Ja(o.toString()),g=f*a,y=0;y<a;++y){var b=m();l[g+y]=p.length;for(var x=0;x<p.length;x++)if(b<p[x]){l[g+y]=x;break}}}return c},t.prototype.oneHot=function(e,r,a,o){H(e,"oneHot");var i=new Float32Array(e.size*r);i.fill(o);for(var s=this.readSync(e.dataId),u=0;u<e.size;++u)s[u]>=0&&s[u]<r&&(i[u*r+s[u]]=a);return kn(i,[e.size,r],"int32")},t.prototype.nonMaxSuppression=function(e,r,a,o,i){return H(e,"nonMaxSuppression"),Ri(this.readSync(e.dataId),this.readSync(r.dataId),a,o,i)},t.prototype.fft=function(e){return this.fftBatch(e,!1)},t.prototype.ifft=function(e){return this.fftBatch(e,!0)},t.prototype.fftBatch=function(e,r){for(var a=e.shape[0],o=e.shape[1],i=fe(e.shape,"float32"),s=fe(e.shape,"float32"),u=Pt(e).as2D(a,o),c=Qt(e).as2D(a,o),l=0;l<a;l++)for(var h=u.slice([l,0],[1,o]),f=c.slice([l,0],[1,o]),d=tt(h,f),p=this.readSync(this.fftImpl(d,r).dataId),v=0;v<o;v++){var m=Us(p,v);i.values[l*o+v]=m.real,s.values[l*o+v]=m.imag}return tt(i.toTensor(),s.toTensor()).as2D(a,o)},t.prototype.fftImpl=function(e,r){var a=e.as1D(),o=a.size;if(this.isExponentOf2(o)){var i=this.fftRadix2(a,o,r).as2D(e.shape[0],e.shape[1]);return r&&(i=tt(Pt(i).div(X(o)),Qt(i).div(X(o)))),i}var s=this.readSync(e.dataId),u=(function(c){for(var l=new Float32Array(c.length/2),h=new Float32Array(c.length/2),f=0;f<c.length;f+=2)l[f/2]=c[f],h[f/2]=c[f+1];return{real:l,imag:h}})(this.fourierTransformByMatmul(s,o,r));return tt(u.real,u.imag).as2D(e.shape[0],e.shape[1])},t.prototype.isExponentOf2=function(e){return(e&e-1)==0},t.prototype.fftRadix2=function(e,r,a){if(r===1)return e;var o=this.readSync(e.dataId),i=r/2,s=(function(g){for(var y=Math.ceil(g.length/4),b=new Float32Array(y),x=new Float32Array(y),w=0;w<g.length;w+=4)b[Math.floor(w/4)]=g[w],x[Math.floor(w/4)]=g[w+1];return{real:b,imag:x}})(o),u=tt(s.real,s.imag).as1D(),c=(function(g){for(var y=Math.floor(g.length/4),b=new Float32Array(y),x=new Float32Array(y),w=2;w<g.length;w+=4)b[Math.floor(w/4)]=g[w],x[Math.floor(w/4)]=g[w+1];return{real:b,imag:x}})(o),l=tt(c.real,c.imag).as1D();u=this.fftRadix2(u,i,a),l=this.fftRadix2(l,i,a);var h=(function(g,y){for(var b=new Float32Array(g/2),x=new Float32Array(g/2),w=0;w<Math.ceil(g/2);w++){var C=(y?2:-2)*Math.PI*(w/g);b[w]=Math.cos(C),x[w]=Math.sin(C)}return{real:b,imag:x}})(r,a),f=tt(h.real,h.imag).mul(l),d=u.add(f),p=u.sub(f),v=Pt(d).concat(Pt(p)),m=Qt(d).concat(Qt(p));return tt(v,m).as1D()},t.prototype.fourierTransformByMatmul=function(e,r,a){for(var o=new Float32Array(2*r),i=0;i<r;i++){for(var s=0,u=0,c=0;c<r;c++){var l=zp(i*c,r,a),h=Us(e,c);s+=h.real*l.real-h.imag*l.imag,u+=h.real*l.imag+h.imag*l.real}a&&(s/=r,u/=r),Wp(o,s,u,i)}return o},t.prototype.depthToSpace=function(e,r,a){I(a==="NHWC",(function(){return"Only NHWC dataFormat supported on CPU for depthToSpace. Got "+a})),I(r>1,(function(){return"blockSize should be > 1 for depthToSpace, but was: "+r}));for(var o=e.shape[0],i=e.shape[1],s=e.shape[2],u=e.shape[3],c=i*r,l=s*r,h=u/(r*r),f=this.readSync(e.dataId),d=new Float32Array(o*c*l*h),p=0,v=0;v<o;++v)for(var m=0;m<c;++m)for(var g=Math.floor(m/r),y=m%r,b=0;b<l;++b)for(var x=Math.floor(b/r),w=(y*r+b%r)*h,C=0;C<h;++C){var k=C+w+u*(x+s*(g+i*v));d[p++]=f[k]}return mt(d,[o,c,l,h])},t.prototype.broadcastedBinaryOp=function(e,r,a,o){var i=we(e.shape,r.shape),s=fe(i,a),u=this.readSync(e.dataId),c=this.readSync(r.dataId),l=Sn(e.shape,i),h=Sn(r.shape,i),f=s.values;if(l.length+h.length===0)for(var d=0;d<f.length;++d)f[d]=o(u[d%u.length],c[d%c.length]);else{var p=this.bufferSync(e),v=this.bufferSync(r),m=function(g){var y=s.indexToLoc(g),b=y.slice(-e.rank);l.forEach((function(k){return b[k]=0}));var x=p.locToIndex(b),w=y.slice(-r.rank);h.forEach((function(k){return w[k]=0}));var C=v.locToIndex(w);f[g]=o(u[x],c[C])};for(d=0;d<f.length;++d)m(d)}return s.toTensor()},t.prototype.broadcastedBinaryComplexOp=function(e,r,a){var o=we(e.shape,r.shape),i=fe(o,"float32"),s=fe(o,"float32"),u=this.readSync(e.dataId),c=this.readSync(r.dataId),l=Sn(e.shape,o),h=Sn(r.shape,o),f=i.values,d=s.values;if(l.length+h.length===0)for(var p=0;p<f.length;p++){var v=p%u.length,m=p%c.length,g=a(u[2*v],u[2*v+1],c[2*m],c[2*m+1]);f[p]=g.real,d[p]=g.imag}else{var y=this.bufferSync(this.data.get(e.dataId).complexTensors.real),b=this.bufferSync(this.data.get(r.dataId).complexTensors.real),x=function(w){var C=i.indexToLoc(w),k=C.slice(-e.rank);l.forEach((function(A){return k[A]=0}));var S=y.locToIndex(k),_=C.slice(-r.rank);h.forEach((function(A){return _[A]=0}));var R=b.locToIndex(_),D=a(u[2*S],u[2*S+1],c[2*R],c[2*R+1]);f[w]=D.real,d[w]=D.imag};for(p=0;p<f.length;p++)x(p)}return this.complex(i.toTensor(),s.toTensor())},t.prototype.split=function(e,r,a){return _c(e,r,a)},t.prototype.dispose=function(){},t.prototype.floatPrecision=function(){return 32},t.prototype.epsilon=function(){return 1e-7},t.prototype.cropAndResize=function(e,r,a,o,i,s){for(var u=e.shape,c=u[0],l=u[1],h=u[2],f=u[3],d=r.shape[0],p=o[0],v=o[1],m=fe([d,p,v,f],"float32"),g=this.readSync(r.dataId),y=this.readSync(a.dataId),b=this.readSync(e.dataId),x=e.strides,w=m.strides,C=0;C<d;C++){var k=4*C,S=g[k],_=g[k+1],R=g[k+2],D=g[k+3],A=y[C];if(!(A>=c))for(var O=p>1?(R-S)*(l-1)/(p-1):0,P=v>1?(D-_)*(h-1)/(v-1):0,F=0;F<p;F++){var V=p>1?S*(l-1)+F*O:.5*(S+R)*(l-1);if(V<0||V>l-1)for(var z=0;z<v;z++)for(var U=0;U<f;U++){var L=U+z*w[2]+F*w[1]+C*w[0];m.values[L]=s}else if(i==="bilinear"){var G=Math.floor(V),q=Math.ceil(V),Y=V-G;for(z=0;z<v;z++)if((ve=v>1?_*(h-1)+z*P:.5*(_+D)*(h-1))<0||ve>h-1)for(U=0;U<f;U++)L=U+z*w[2]+F*w[1]+C*w[0],m.values[L]=s;else{var re=Math.floor(ve),ie=Math.ceil(ve),se=ve-re;for(U=0;U<f;U++){var ce=b[L=U+re*x[2]+G*x[1]+A*x[0]],he=b[L=U+ie*x[2]+G*x[1]+A*x[0]],de=b[L=U+re*x[2]+q*x[1]+A*x[0]],pe=ce+(he-ce)*se,De=de+(b[L=U+ie*x[2]+q*x[1]+A*x[0]]-de)*se;L=U+z*w[2]+F*w[1]+C*w[0],m.values[L]=pe+(De-pe)*Y}}}else for(z=0;z<v;++z){var ve;if((ve=v>1?_*(h-1)+z*P:.5*(_+D)*(h-1))<0||ve>h-1)for(U=0;U<f;U++)L=U+z*w[2]+F*w[1]+C*w[0],m.values[L]=s;else{var me=Math.round(ve),oe=Math.round(V);for(U=0;U<f;U++){var _e=U+me*x[2]+oe*x[1]+A*x[0],be=U+z*w[2]+F*w[1]+C*w[0];m.values[be]=b[_e]}}}}}return m.toTensor()},t.prototype.sparseToDense=function(e,r,a,o){var i=Oa(0,e,a),s=i.sliceRank,u=i.numUpdates,c=i.sliceSize,l=i.strides,h=i.outputSize;return this.scatter(e,r,a,h,c,u,s,l,o,!1)},t.prototype.gatherND=function(e,r){var a=r.shape,o=a[a.length-1],i=pc(e,r),s=i[0],u=i[1],c=i[2],l=i[3];if(u===0)return rt([],s,e.dtype);for(var h=new Or([u,c],e.dtype),f=this.readSync(r.dataId),d=this.readSync(e.dataId),p=0;p<u;p++){for(var v=[],m=0,g=0;g<o;g++){var y=f[p*o+g];m+=y*l[g],v.push(y)}if(m<0||m>=e.size/c)throw new Error("Invalid indices: "+v+" does not index into "+e.shape);for(var b=0;b<c;b++)h.values[p*c+b]=d[m*c+b]}return h.toTensor().reshape(s)},t.prototype.scatterND=function(e,r,a){var o=Oa(0,e,a),i=o.sliceRank,s=o.numUpdates,u=o.sliceSize,c=o.strides,l=o.outputSize,h=X(0);return this.scatter(e,r,a,l,u,s,i,c,h,!0)},t.prototype.fill=function(e,r,a){var o=Ia(a=a||Gr(r),Z(e));return o.fill(r),M.makeTensor(o,e,a,this)},t.prototype.onesLike=function(e){if(e.dtype==="string")throw new Error("onesLike is not supported for string tensors");return this.fill(e.shape,1,e.dtype)},t.prototype.zerosLike=function(e){var r=Ia(e.dtype,Z(e.shape));return this.makeOutput(r,e.shape,e.dtype)},t.prototype.linspace=function(e,r,a){return Cc(e,r,a)},t.prototype.scatter=function(e,r,a,o,i,s,u,c,l,h){var f=[o/i,i],d=this.readSync(e.dataId),p=this.readSync(r.dataId);if(o===0)return rt([],a,r.dtype);var v=new Or(f,r.dtype);v.values.fill(this.readSync(l.dataId)[0]);for(var m=0;m<s;m++){for(var g=[],y=0,b=0;b<u;b++){var x=d[m*u+b];g.push(x),y+=x*c[b]}if(y<0||y>=o/i)throw new Error("Invalid indices: "+g+" does not index into "+a);for(var w=0;w<i;w++)h?v.values[y*i+w]+=p[m*i+w]:v.values[y*i+w]=r.rank===0?p[0]:p[m*i+w]}return v.toTensor().reshape(a)},t})(xc);M.registerBackend("cpu",(function(){return new sy}),1);for(var Fo=0,su=[{kernelName:"NonMaxSuppressionV5",backendName:"cpu",kernelFunc:function(n){var t=n.inputs,e=n.backend,r=n.attrs,a=t,o=a.boxes,i=a.scores,s=r,u=s.maxOutputSize,c=s.iouThreshold,l=s.scoreThreshold,h=s.softNmsSigma,f=e;H(o,"NonMaxSuppressionWithScore");var d=Ii(f.data.get(o.dataId).values,f.data.get(i.dataId).values,u,c,l,h);return[d.selectedIndices,d.selectedScores]}},{kernelName:"Square",backendName:"cpu",kernelFunc:function(n){var t=n.inputs,e=n.backend,r=t.x,a=e;H(r,"square");for(var o=a.data.get(r.dataId).values,i=new Float32Array(o.length),s=0;s<o.length;++s){var u=o[s];i[s]=u*u}return{dataId:a.write(i,r.shape,r.dtype),shape:r.shape,dtype:r.dtype}}},{kernelName:Wr,backendName:"cpu",kernelFunc:function(n){var t=n.inputs,e=n.backend,r=t,a=r.a,o=r.b,i=e;H([a,o],Wr);var s=i.data.get(a.dataId).values,u=i.data.get(o.dataId).values,c=(function(f,d,p,v,m,g){var y=we(f,d),b=y.length,x=nn(y),w=Br(m,Z(y)),C=f.length,k=d.length,S=nn(f),_=nn(d),R=Sn(f,y),D=Sn(d,y);if(R.length+D.length===0)for(var A=0;A<w.length;++A)w[A]=g(p[A%p.length],v[A%v.length]);else{var O=function(P){var F=gd(P,b,x),V=F.slice(-C);R.forEach((function(G){return V[G]=0}));var z=As(V,C,S),U=F.slice(-k);D.forEach((function(G){return U[G]=0}));var L=As(U,k,_);w[P]=g(p[z],v[L])};for(A=0;A<w.length;++A)O(A)}return[w,y]})(a.shape,o.shape,s,u,a.dtype,(function(f,d){var p=f-d;return p*p})),l=c[0],h=c[1];return{dataId:i.write(l,h,a.dtype),shape:h,dtype:a.dtype}}}];Fo<su.length;Fo++)Xu(su[Fo]);var or,uy=function(n){this.variableNames=["A"];var t=st(),e=n[0],r=n[1];this.outputShape=n,this.userCode=`
      void main() {
        ivec3 coords = getOutputCoords();
        int texR = coords[0];
        int texC = coords[1];
        int depth = coords[2];
        vec2 uv = (vec2(texC, texR) + halfCR) / vec2(`+r+".0, "+e+`.0);

        vec4 values = `+t.texture2D+`(A, uv);
        float value;
        if (depth == 0) {
          value = values.r;
        } else if (depth == 1) {
          value = values.g;
        } else if (depth == 2) {
          value = values.b;
        } else if (depth == 3) {
          value = values.a;
        }

        setOutput(floor(value * 255.0 + 0.5));
      }
    `},cy=function(n){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0;var t=st(),e=n[0],r=n[1];this.outputShape=n,this.userCode=`
      void main() {
        ivec3 coords = getOutputCoords();
        int texR = coords[0];
        int texC = coords[1];
        int depth = coords[2];

        vec4 result = vec4(0.);

        for(int row=0; row<=1; row++) {
          for(int col=0; col<=1; col++) {
            texC = coords[1] + row;
            depth = coords[2] + col;

            vec2 uv = (vec2(texC, texR) + halfCR) /
                       vec2(`+r+".0, "+e+`.0);
            vec4 values = `+t.texture2D+`(A, uv);
            float value;
            if (depth == 0) {
              value = values.r;
            } else if (depth == 1) {
              value = values.g;
            } else if (depth == 2) {
              value = values.b;
            } else if (depth == 3) {
              value = values.a;
            }

            result[row * 2 + col] = floor(value * 255.0 + 0.5);
          }
        }

        `+t.output+` = result;
      }
    `};for(var Po=0,uu=[{kernelName:"FromPixels",backendName:"webgl",kernelFunc:function(n){var t=n.inputs,e=n.backend,r=n.attrs,a=t.pixels,o=r.numChannels,i=typeof HTMLVideoElement<"u"&&a instanceof HTMLVideoElement,s=typeof HTMLImageElement<"u"&&a instanceof HTMLImageElement,u=i?[a.videoWidth,a.videoHeight]:[a.width,a.height],c=u[0],l=u[1],h=[l,c],f=[l,c,o];(s||i)&&(or==null&&(or=document.createElement("canvas").getContext("2d")),or.canvas.width=c,or.canvas.height=l,or.drawImage(a,0,0,c,l),a=or.canvas);var d=e.makeTensorInfo(h,"int32");e.texData.get(d.dataId).usage=St.PIXELS,e.gpgpu.uploadPixelDataToTexture(e.getTexture(d.dataId),a);var p=W().getBool("WEBGL_PACK")?new cy(f):new uy(f),v=e.runWebGLProgram(p,[d],"int32");return e.disposeData(d.dataId),v}},{kernelName:"NonMaxSuppressionV5",backendName:"webgl",kernelFunc:function(n){var t=n.inputs,e=n.backend,r=n.attrs;Da("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");var a=t,o=a.boxes,i=a.scores,s=r,u=s.maxOutputSize,c=s.iouThreshold,l=s.scoreThreshold,h=s.softNmsSigma,f=e,d=Ii(f.readSync(o.dataId),f.readSync(i.dataId),u,c,l,h);return[d.selectedIndices,d.selectedScores]}},{kernelName:"Square",backendName:"webgl",kernelFunc:function(n){var t=n.inputs,e=n.backend,r=t.x,a=e,o=new ye(r.shape,"return x * x;");return a.runWebGLProgram(o,[r],r.dtype)}},{kernelName:Wr,backendName:"webgl",kernelFunc:function(n){var t=n.inputs,e=n.backend,r=t,a=r.a,o=r.b,i=e,s=W().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new fn("return (a - b) * (a - b);",a.shape,o.shape):new Ue("return (a - b) * (a - b);",a.shape,o.shape);return i.compileAndRun(s,[a,o])}}];Po<uu.length;Po++)Xu(uu[Po]);for(var Bo=0,cu=[{kernelName:"Square",gradFunc:function(n,t){var e=t[0];return{x:function(){return n.mul(e.toFloat().mul(2))}}}},{kernelName:Wr,gradFunc:function(n,t){var e=t[0],r=t[1],a=X(2);return{a:function(){return ct(n,ct(a,Xe(e,r)))},b:function(){return ct(n,ct(a,Xe(r,e)))}}}}];Bo<cu.length;Bo++)id(cu[Bo]);var ly=(function(){function n(){}return n.prototype.fetch=function(t,e){return fetch(t,e)},n.prototype.now=function(){return performance.now()},n.prototype.encode=function(t,e){if(e!=="utf-8"&&e!=="utf8")throw new Error("Browser's encoder only supports utf-8, but got "+e);return this.textEncoder==null&&(this.textEncoder=new TextEncoder),this.textEncoder.encode(t)},n.prototype.decode=function(t,e){return new TextDecoder(e).decode(t)},n})();W().get("IS_BROWSER")&&W().setPlatform("browser",new ly);var Oo,hy=function(){return require("node-fetch")},fy=(function(){function n(){this.util=require("util"),this.textEncoder=new this.util.TextEncoder}return n.prototype.fetch=function(t,e){return W().global.fetch!=null?W().global.fetch(t,e):(Oo==null&&(Oo=hy()),Oo(t,e))},n.prototype.now=function(){var t=process.hrtime();return 1e3*t[0]+t[1]/1e6},n.prototype.encode=function(t,e){if(e!=="utf-8"&&e!=="utf8")throw new Error("Node built-in encoder only supports utf-8, but got "+e);return this.textEncoder.encode(t)},n.prototype.decode=function(t,e){return t.length===0?"":new this.util.TextDecoder(e).decode(t)},n})();W().get("IS_NODE")&&W().setPlatform("node",new fy);var ii={float32:4,int32:4,uint16:2,uint8:1,bool:1},Ha=4;function ml(n,t){for(var e={},r=0,a=function(s){var u=s.name,c=s.dtype,l=s.shape,h=Z(l),f=void 0;if("quantization"in s){var d=s.quantization;if(d.dtype!=="uint8"&&d.dtype!=="uint16")throw new Error("Weight "+s.name+" has unknown quantization dtype "+d.dtype+". Supported quantization dtypes are: 'uint8' and 'uint16'.");var p=ii[d.dtype],v=n.slice(r,r+h*p),m=d.dtype==="uint8"?new Uint8Array(v):new Uint16Array(v);if(c==="float32")f=Float32Array.from(m,(function(C){return C*d.scale+d.min}));else{if(c!=="int32")throw new Error("Unsupported dtype in weight '"+u+"': "+c);f=Int32Array.from(m,(function(C){return Math.round(C*d.scale+d.min)}))}r+=h*p}else if(c==="string"){var g=Z(s.shape);f=[];for(var y=0;y<g;y++){var b=new Uint32Array(n.slice(r,r+Ha))[0];r+=Ha;var x=new Uint8Array(n.slice(r,r+b));f.push(x),r+=b}}else{var w=ii[c];if(v=n.slice(r,r+h*w),c==="float32")f=new Float32Array(v);else if(c==="int32")f=new Int32Array(v);else{if(c!=="bool")throw new Error("Unsupported dtype in weight '"+u+"': "+c);f=new Uint8Array(v)}r+=h*w}e[u]=rt(f,l,c)},o=0,i=t;o<i.length;o++)a(i[o]);return e}function dy(n){if(n===null)throw new Error("Invalid input value: "+JSON.stringify(n));var t=0,e=[];n.forEach((function(o){if(t+=o.byteLength,e.push(o.byteLength===o.buffer.byteLength?o:new o.constructor(o)),!(o instanceof Float32Array||o instanceof Int32Array||o instanceof Uint8Array))throw new Error("Unsupported TypedArray subtype: "+o.constructor.name)}));var r=new Uint8Array(t),a=0;return e.forEach((function(o){r.set(new Uint8Array(o.buffer),a),a+=o.byteLength})),r.buffer}var si=typeof Buffer<"u"&&(typeof Blob>"u"||typeof atob>"u"||typeof btoa>"u");function lu(n){return si?Buffer.byteLength(n):new Blob([n]).size}function qi(n){var t=0;n.forEach((function(a){t+=a.byteLength}));var e=new Uint8Array(t),r=0;return n.forEach((function(a){e.set(new Uint8Array(a),r),r+=a.byteLength})),e.buffer}function hu(n){for(n=n.trim();n.endsWith("/");)n=n.slice(0,n.length-1);var t=n.split("/");return t[t.length-1]}function $r(n){if(n.modelTopology instanceof ArrayBuffer)throw new Error("Expected JSON model topology, received ArrayBuffer.");return{dateSaved:new Date,modelTopologyType:"JSON",modelTopologyBytes:n.modelTopology==null?0:lu(JSON.stringify(n.modelTopology)),weightSpecsBytes:n.weightSpecs==null?0:lu(JSON.stringify(n.weightSpecs)),weightDataBytes:n.weightData==null?0:n.weightData.byteLength}}var Rt=(function(){function n(){this.saveRouters=[],this.loadRouters=[]}return n.getInstance=function(){return n.instance==null&&(n.instance=new n),n.instance},n.registerSaveRouter=function(t){n.getInstance().saveRouters.push(t)},n.registerLoadRouter=function(t){n.getInstance().loadRouters.push(t)},n.getSaveHandlers=function(t){return n.getHandlers(t,"save")},n.getLoadHandlers=function(t,e){return n.getHandlers(t,"load",e)},n.getHandlers=function(t,e,r){var a=[];return(e==="load"?n.getInstance().loadRouters:n.getInstance().saveRouters).forEach((function(o){var i=o(t,r);i!==null&&a.push(i)})),a},n})(),vr="://",Tn=(function(){function n(){this.managers={}}return n.getInstance=function(){return n.instance==null&&(n.instance=new n),n.instance},n.registerManager=function(t,e){I(t!=null,(function(){return"scheme must not be undefined or null."})),t.endsWith(vr)&&(t=t.slice(0,t.indexOf(vr))),I(t.length>0,(function(){return"scheme must not be an empty string."}));var r=n.getInstance();I(r.managers[t]==null,(function(){return"A model store manager is already registered for scheme '"+t+"'."})),r.managers[t]=e},n.getManager=function(t){var e=this.getInstance().managers[t];if(e==null)throw new Error("Cannot find model manager for scheme '"+t+"'");return e},n.getSchemes=function(){return Object.keys(this.getInstance().managers)},n})();function Ea(n){if(n.indexOf(vr)===-1)throw new Error("The url string provided does not contain a scheme. Supported schemes are: "+Tn.getSchemes().join(","));return{scheme:n.split(vr)[0],path:n.split(vr)[1]}}function fu(n,t,e){return e===void 0&&(e=!1),$(this,void 0,void 0,(function(){var r,a,o,i,s,u,c,l,h;return J(this,(function(f){switch(f.label){case 0:return I(n!==t,(function(){return"Old path and new path are the same: '"+n+"'"})),I((r=Rt.getLoadHandlers(n)).length>0,(function(){return"Copying failed because no load handler is found for source URL "+n+"."})),I(r.length<2,(function(){return"Copying failed because more than one ("+r.length+") load handlers for source URL "+n+"."})),a=r[0],I((o=Rt.getSaveHandlers(t)).length>0,(function(){return"Copying failed because no save handler is found for destination URL "+t+"."})),I(o.length<2,(function(){return"Copying failed because more than one ("+r.length+") save handlers for destination URL "+t+"."})),i=o[0],s=Ea(n).scheme,u=Ea(n).path,c=s===Ea(n).scheme,[4,a.load()];case 1:return l=f.sent(),e&&c?[4,Tn.getManager(s).removeModel(u)]:[3,3];case 2:f.sent(),f.label=3;case 3:return[4,i.save(l)];case 4:return h=f.sent(),!e||c?[3,6]:[4,Tn.getManager(s).removeModel(u)];case 5:f.sent(),f.label=6;case 6:return[2,h.modelArtifactsInfo]}}))}))}var jn="models_store",Rn="model_info_store";function gl(){if(!W().getBool("IS_BROWSER"))throw new Error("Failed to obtain IndexedDB factory because the current environmentis not a web browser.");var n=window||self,t=n.indexedDB||n.mozIndexedDB||n.webkitIndexedDB||n.msIndexedDB||n.shimIndexedDB;if(t==null)throw new Error("The current browser does not appear to support IndexedDB.");return t}function ui(n){var t=n.result;t.createObjectStore(jn,{keyPath:"modelPath"}),t.createObjectStore(Rn,{keyPath:"modelPath"})}var mr=(function(){function n(t){if(this.indexedDB=gl(),t==null||!t)throw new Error("For IndexedDB, modelPath must not be null, undefined or empty.");this.modelPath=t}return n.prototype.save=function(t){return $(this,void 0,void 0,(function(){return J(this,(function(e){if(t.modelTopology instanceof ArrayBuffer)throw new Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");return[2,this.databaseAction(this.modelPath,t)]}))}))},n.prototype.load=function(){return $(this,void 0,void 0,(function(){return J(this,(function(t){return[2,this.databaseAction(this.modelPath)]}))}))},n.prototype.databaseAction=function(t,e){var r=this;return new Promise((function(a,o){var i=r.indexedDB.open("tensorflowjs",1);i.onupgradeneeded=function(){return ui(i)},i.onsuccess=function(){var s=i.result;if(e==null){var u=s.transaction(jn,"readonly"),c=u.objectStore(jn).get(r.modelPath);c.onsuccess=function(){if(c.result==null)return s.close(),o(new Error("Cannot find model with path '"+r.modelPath+"' in IndexedDB."));a(c.result.modelArtifacts)},c.onerror=function(v){return s.close(),o(c.error)},u.oncomplete=function(){return s.close()}}else{var l,h=$r(e),f=s.transaction(Rn,"readwrite"),d=f.objectStore(Rn),p=d.put({modelPath:r.modelPath,modelArtifactsInfo:h});p.onsuccess=function(){var v=(l=s.transaction(jn,"readwrite")).objectStore(jn).put({modelPath:r.modelPath,modelArtifacts:e,modelArtifactsInfo:h});v.onsuccess=function(){return a({modelArtifactsInfo:h})},v.onerror=function(m){var g=(d=f.objectStore(Rn)).delete(r.modelPath);g.onsuccess=function(){return s.close(),o(v.error)},g.onerror=function(y){return s.close(),o(v.error)}}},p.onerror=function(v){return s.close(),o(p.error)},f.oncomplete=function(){l==null?s.close():l.oncomplete=function(){return s.close()}}}},i.onerror=function(s){return o(i.error)}}))},n.URL_SCHEME="indexeddb://",n})(),du=function(n){return W().getBool("IS_BROWSER")&&!Array.isArray(n)&&n.startsWith(mr.URL_SCHEME)?(t=n.slice(mr.URL_SCHEME.length),new mr(t)):null;var t};Rt.registerSaveRouter(du),Rt.registerLoadRouter(du);var py=(function(){function n(){this.indexedDB=gl()}return n.prototype.listModels=function(){return $(this,void 0,void 0,(function(){var t=this;return J(this,(function(e){return[2,new Promise((function(r,a){var o=t.indexedDB.open("tensorflowjs",1);o.onupgradeneeded=function(){return ui(o)},o.onsuccess=function(){var i=o.result,s=i.transaction(Rn,"readonly"),u=s.objectStore(Rn).getAll();u.onsuccess=function(){for(var c={},l=0,h=u.result;l<h.length;l++){var f=h[l];c[f.modelPath]=f.modelArtifactsInfo}r(c)},u.onerror=function(c){return i.close(),a(u.error)},s.oncomplete=function(){return i.close()}},o.onerror=function(i){return a(o.error)}}))]}))}))},n.prototype.removeModel=function(t){return $(this,void 0,void 0,(function(){var e=this;return J(this,(function(r){var a;return t=(a=t).startsWith(mr.URL_SCHEME)?a.slice(mr.URL_SCHEME.length):a,[2,new Promise((function(o,i){var s=e.indexedDB.open("tensorflowjs",1);s.onupgradeneeded=function(){return ui(s)},s.onsuccess=function(){var u,c=s.result,l=c.transaction(Rn,"readwrite"),h=l.objectStore(Rn),f=h.get(t);f.onsuccess=function(){if(f.result==null)return c.close(),i(new Error("Cannot find model with path '"+t+"' in IndexedDB."));var d=h.delete(t),p=function(){var v=(u=c.transaction(jn,"readwrite")).objectStore(jn).delete(t);v.onsuccess=function(){return o(f.result.modelArtifactsInfo)},v.onerror=function(m){return i(f.error)}};d.onsuccess=p,d.onerror=function(v){return p(),c.close(),i(f.error)}},f.onerror=function(d){return c.close(),i(f.error)},l.oncomplete=function(){u==null?c.close():u.oncomplete=function(){return c.close()}}},s.onerror=function(u){return i(s.error)}}))]}))}))},n})();if(W().getBool("IS_BROWSER"))try{Tn.registerManager(mr.URL_SCHEME,new py)}catch{}var dn="/",hr="tensorflowjs_models",yl="info",vy="model_topology",my="weight_specs",gy="weight_data",yy="model_metadata";function xl(n){return{info:[hr,n,yl].join(dn),topology:[hr,n,vy].join(dn),weightSpecs:[hr,n,my].join(dn),weightData:[hr,n,gy].join(dn),modelMetadata:[hr,n,yy].join(dn)}}function xy(n){var t=n.split(dn);if(t.length<3)throw new Error("Invalid key format: "+n);return t.slice(1,t.length-1).join(dn)}var gr=(function(){function n(t){if(!W().getBool("IS_BROWSER")||typeof window>"u"||window.localStorage===void 0)throw new Error("The current environment does not support local storage.");if(this.LS=window.localStorage,t==null||!t)throw new Error("For local storage, modelPath must not be null, undefined or empty.");this.modelPath=t,this.keys=xl(this.modelPath)}return n.prototype.save=function(t){return $(this,void 0,void 0,(function(){var e,r,a;return J(this,(function(o){if(t.modelTopology instanceof ArrayBuffer)throw new Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");e=JSON.stringify(t.modelTopology),r=JSON.stringify(t.weightSpecs),a=$r(t);try{return this.LS.setItem(this.keys.info,JSON.stringify(a)),this.LS.setItem(this.keys.topology,e),this.LS.setItem(this.keys.weightSpecs,r),this.LS.setItem(this.keys.weightData,(function(i){if(si)return Buffer.from(i).toString("base64");for(var s=new Uint8Array(i),u="",c=0,l=s.length;c<l;c++)u+=String.fromCharCode(s[c]);return btoa(u)})(t.weightData)),this.LS.setItem(this.keys.modelMetadata,JSON.stringify({format:t.format,generatedBy:t.generatedBy,convertedBy:t.convertedBy,userDefinedMetadata:t.userDefinedMetadata})),[2,{modelArtifactsInfo:a}]}catch{throw this.LS.removeItem(this.keys.info),this.LS.removeItem(this.keys.topology),this.LS.removeItem(this.keys.weightSpecs),this.LS.removeItem(this.keys.weightData),this.LS.removeItem(this.keys.modelMetadata),new Error("Failed to save model '"+this.modelPath+"' to local storage: size quota being exceeded is a possible cause of this failure: modelTopologyBytes="+a.modelTopologyBytes+", weightSpecsBytes="+a.weightSpecsBytes+", weightDataBytes="+a.weightDataBytes+".")}return[2]}))}))},n.prototype.load=function(){return $(this,void 0,void 0,(function(){var t,e,r,a,o,i,s;return J(this,(function(u){if((t=JSON.parse(this.LS.getItem(this.keys.info)))==null)throw new Error("In local storage, there is no model with name '"+this.modelPath+"'");if(t.modelTopologyType!=="JSON")throw new Error("BrowserLocalStorage does not support loading non-JSON model topology yet.");if(e={},(r=JSON.parse(this.LS.getItem(this.keys.topology)))==null)throw new Error("In local storage, the topology of model '"+this.modelPath+"' is missing.");if(e.modelTopology=r,(a=JSON.parse(this.LS.getItem(this.keys.weightSpecs)))==null)throw new Error("In local storage, the weight specs of model '"+this.modelPath+"' are missing.");if(e.weightSpecs=a,(o=this.LS.getItem(this.keys.modelMetadata))!=null&&(i=JSON.parse(o),e.format=i.format,e.generatedBy=i.generatedBy,e.convertedBy=i.convertedBy,e.userDefinedMetadata=i.userDefinedMetadata),(s=this.LS.getItem(this.keys.weightData))==null)throw new Error("In local storage, the binary weight values of model '"+this.modelPath+"' are missing.");return e.weightData=(function(c){if(si){var l=Buffer.from(c,"base64");return l.buffer.slice(l.byteOffset,l.byteOffset+l.byteLength)}for(var h=atob(c),f=new Uint8Array(h.length),d=0;d<h.length;++d)f.set([h.charCodeAt(d)],d);return f.buffer})(s),[2,e]}))}))},n.URL_SCHEME="localstorage://",n})(),pu=function(n){return W().getBool("IS_BROWSER")&&!Array.isArray(n)&&n.startsWith(gr.URL_SCHEME)?(t=n.slice(gr.URL_SCHEME.length),new gr(t)):null;var t};Rt.registerSaveRouter(pu),Rt.registerLoadRouter(pu);var by=(function(){function n(){I(W().getBool("IS_BROWSER"),(function(){return"Current environment is not a web browser"})),I(typeof window>"u"||window.localStorage!==void 0,(function(){return"Current browser does not appear to support localStorage"})),this.LS=window.localStorage}return n.prototype.listModels=function(){return $(this,void 0,void 0,(function(){var t,e,r,a,o,i;return J(this,(function(s){for(t={},e=hr+dn,r=dn+yl,a=0;a<this.LS.length;++a)(o=this.LS.key(a)).startsWith(e)&&o.endsWith(r)&&(i=xy(o),t[i]=JSON.parse(this.LS.getItem(o)));return[2,t]}))}))},n.prototype.removeModel=function(t){return $(this,void 0,void 0,(function(){var e,r;return J(this,(function(a){var o;if(t=(o=t).startsWith(gr.URL_SCHEME)?o.slice(gr.URL_SCHEME.length):o,e=xl(t),this.LS.getItem(e.info)==null)throw new Error("Cannot find model at path '"+t+"'");return r=JSON.parse(this.LS.getItem(e.info)),this.LS.removeItem(e.info),this.LS.removeItem(e.topology),this.LS.removeItem(e.weightSpecs),this.LS.removeItem(e.weightData),[2,r]}))}))},n})();if(W().getBool("IS_BROWSER"))try{Tn.registerManager(gr.URL_SCHEME,new by)}catch{}var wy="model",Cy=".json",Ey=".weights.bin";function vu(n){return new Promise((function(t){return setTimeout(t)})).then(n)}var Lo=(function(){function n(t){if(!W().getBool("IS_BROWSER"))throw new Error("browserDownloads() cannot proceed because the current environment is not a browser.");t.startsWith(n.URL_SCHEME)&&(t=t.slice(n.URL_SCHEME.length)),t!=null&&t.length!==0||(t=wy),this.modelTopologyFileName=t+Cy,this.weightDataFileName=t+Ey}return n.prototype.save=function(t){return $(this,void 0,void 0,(function(){var e,r,a,o,i,s;return J(this,(function(u){switch(u.label){case 0:if(typeof document>"u")throw new Error("Browser downloads are not supported in this environment since `document` is not present");if(e=window.URL.createObjectURL(new Blob([t.weightData],{type:"application/octet-stream"})),!(t.modelTopology instanceof ArrayBuffer))return[3,1];throw new Error("BrowserDownloads.save() does not support saving model topology in binary formats yet.");case 1:return r=[{paths:["./"+this.weightDataFileName],weights:t.weightSpecs}],a={modelTopology:t.modelTopology,format:t.format,generatedBy:t.generatedBy,convertedBy:t.convertedBy,weightsManifest:r},o=window.URL.createObjectURL(new Blob([JSON.stringify(a)],{type:"application/json"})),(i=this.jsonAnchor==null?document.createElement("a"):this.jsonAnchor).download=this.modelTopologyFileName,i.href=o,[4,vu((function(){return i.dispatchEvent(new MouseEvent("click"))}))];case 2:return u.sent(),t.weightData==null?[3,4]:((s=this.weightDataAnchor==null?document.createElement("a"):this.weightDataAnchor).download=this.weightDataFileName,s.href=e,[4,vu((function(){return s.dispatchEvent(new MouseEvent("click"))}))]);case 3:u.sent(),u.label=4;case 4:return[2,{modelArtifactsInfo:$r(t)}]}}))}))},n.URL_SCHEME="downloads://",n})(),_y=(function(){function n(t){if(t==null||t.length<1)throw new Error("When calling browserFiles, at least 1 file is required, but received "+t);this.files=t}return n.prototype.load=function(){return $(this,void 0,void 0,(function(){var t,e,r=this;return J(this,(function(a){return t=this.files[0],e=this.files.slice(1),[2,new Promise((function(o,i){var s=new FileReader;s.onload=function(u){var c=JSON.parse(u.target.result),l=c.modelTopology;if(l!=null){e.length===0&&o({modelTopology:l});var h=c.weightsManifest;if(h!=null){var f;try{f=r.checkManifestAndWeightFiles(h,e)}catch(m){return void i(m)}var d=[],p=[],v=[];h.forEach((function(m){m.paths.forEach((function(g){p.push(g),v.push(null)})),d.push.apply(d,m.weights)})),h.forEach((function(m){m.paths.forEach((function(g){var y=new FileReader;y.onload=function(b){var x=b.target.result,w=p.indexOf(g);v[w]=x,v.indexOf(null)===-1&&o({modelTopology:l,weightSpecs:d,weightData:qi(v),format:c.format,generatedBy:c.generatedBy,convertedBy:c.convertedBy,userDefinedMetadata:c.userDefinedMetadata})},y.onerror=function(b){return i("Failed to weights data from file of path '"+g+"'.")},y.readAsArrayBuffer(f[g])}))}))}else i(new Error("weightManifest field is missing from file "+t.name))}else i(new Error("modelTopology field is missing from file "+t.name))},s.onerror=function(u){return i("Failed to read model topology and weights manifest JSON from file '"+t.name+"'. BrowserFiles supports loading Keras-style tf.Model artifacts only.")},s.readAsText(t)}))]}))}))},n.prototype.checkManifestAndWeightFiles=function(t,e){for(var r=[],a=e.map((function(u){return hu(u.name)})),o={},i=0,s=t;i<s.length;i++)s[i].paths.forEach((function(u){var c=hu(u);if(r.indexOf(c)!==-1)throw new Error("Duplicate file basename found in weights manifest: '"+c+"'");if(r.push(c),a.indexOf(c)===-1)throw new Error("Weight file with basename '"+c+"' is not provided.");o[u]=e[a.indexOf(c)]}));if(r.length!==e.length)throw new Error("Mismatch in the number of files in weights manifest ("+r.length+") and the number of weight files provided ("+e.length+").");return o},n})();function mu(n,t,e,r){(function(o){I(o!=null&&Array.isArray(o)&&o.length>0,(function(){return"promises must be a none empty array"}))})(n),(function(o,i){I(o>=0&&o<=1,(function(){return"Progress fraction must be in range [0, 1], but got startFraction "+o})),I(i>=0&&i<=1,(function(){return"Progress fraction must be in range [0, 1], but got endFraction "+i})),I(i>=o,(function(){return"startFraction must be no more than endFraction, but got startFraction "+o+" and endFraction "+i}))})(e=e??0,r=r??1);var a=0;return Promise.all(n.map((function(o){return o.then((function(i){var s=e+ ++a/n.length*(r-e);return t(s),i})),o})))}function bl(n,t){return $(this,void 0,void 0,(function(){var e,r,a,o,i,s,u,c,l;return J(this,(function(h){switch(h.label){case 0:return t==null&&(t={}),e=t.fetchFunc==null?W().platform.fetch:t.fetchFunc,r=n.map((function(f){return e(f,t.requestInit,{isBinary:!0})})),a=0,o=.5,t.onProgress!=null?[3,2]:[4,Promise.all(r)];case 1:return i=h.sent(),[3,4];case 2:return[4,mu(r,t.onProgress,a,o)];case 3:i=h.sent(),h.label=4;case 4:return s=i.map((function(f){return f.arrayBuffer()})),u=.5,c=1,t.onProgress!=null?[3,6]:[4,Promise.all(s)];case 5:return l=h.sent(),[3,8];case 6:return[4,mu(s,t.onProgress,u,c)];case 7:l=h.sent(),h.label=8;case 8:return[2,l]}}))}))}function gu(n){var t=this;return function(e,r,a){return r===void 0&&(r=""),$(t,void 0,void 0,(function(){var o,i,s,u,c,l,h,f,d,p;return J(this,(function(v){switch(v.label){case 0:if(o=e.map((function(){return!1})),i={},s=a!=null?a.map((function(){return!1})):[],u=[],e.forEach((function(m,g){var y=0;m.weights.forEach((function(b){var x="quantization"in b?b.quantization.dtype:b.dtype,w=ii[x]*Z(b.shape),C=function(){o[g]=!0,i[g]==null&&(i[g]=[]),i[g].push({manifestEntry:b,groupOffset:y,sizeBytes:w})};a!=null?a.forEach((function(k,S){k===b.name&&(C(),s[S]=!0)})):C(),u.push(b.name),y+=w}))})),!s.every((function(m){return m})))throw c=a.filter((function(m,g){return!s[g]})),new Error("Could not find weights in manifest with names: "+c.join(", ")+`. 
Manifest JSON has weights with names: `+u.join(", ")+".");return l=o.reduce((function(m,g,y){return g&&m.push(y),m}),[]),h=[],l.forEach((function(m){e[m].paths.forEach((function(g){var y=r+(r.endsWith("/")?"":"/")+g;h.push(y)}))})),[4,n(h)];case 1:return f=v.sent(),d={},p=0,l.forEach((function(m){for(var g=e[m].paths.length,y=0,b=0;b<g;b++)y+=f[p+b].byteLength;for(var x=new ArrayBuffer(y),w=new Uint8Array(x),C=0,k=0;k<g;k++){var S=new Uint8Array(f[p+k]);w.set(S,C),C+=S.byteLength}i[m].forEach((function(_){var R=ml(x.slice(_.groupOffset,_.groupOffset+_.sizeBytes),[_.manifestEntry]);for(var D in R)d[D]=R[D]})),p+=g})),[2,d]}}))}))}}Rt.registerSaveRouter((function(n){return W().getBool("IS_BROWSER")&&!Array.isArray(n)&&n.startsWith(Lo.URL_SCHEME)?(function(t){return t===void 0&&(t="model"),new Lo(t)})(n.slice(Lo.URL_SCHEME.length)):null}));var wl=(function(){function n(t,e){if(this.DEFAULT_METHOD="POST",e==null&&(e={}),this.weightPathPrefix=e.weightPathPrefix,this.onProgress=e.onProgress,e.fetchFunc!=null?(I(typeof e.fetchFunc=="function",(function(){return"Must pass a function that matches the signature of `fetch` (see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)"})),this.fetch=e.fetchFunc):this.fetch=W().platform.fetch,I(t!=null&&t.length>0,(function(){return"URL path for http must not be null, undefined or empty."})),Array.isArray(t)&&I(t.length===2,(function(){return"URL paths for http must have a length of 2, (actual length is "+t.length+")."})),this.path=t,e.requestInit!=null&&e.requestInit.body!=null)throw new Error("requestInit is expected to have no pre-existing body, but has one.");this.requestInit=e.requestInit||{}}return n.prototype.save=function(t){return $(this,void 0,void 0,(function(){var e,r,a,o;return J(this,(function(i){switch(i.label){case 0:if(t.modelTopology instanceof ArrayBuffer)throw new Error("BrowserHTTPRequest.save() does not support saving model topology in binary formats yet.");return(e=Object.assign({method:this.DEFAULT_METHOD},this.requestInit)).body=new FormData,r=[{paths:["./model.weights.bin"],weights:t.weightSpecs}],a={modelTopology:t.modelTopology,format:t.format,generatedBy:t.generatedBy,convertedBy:t.convertedBy,userDefinedMetadata:t.userDefinedMetadata,weightsManifest:r},e.body.append("model.json",new Blob([JSON.stringify(a)],{type:"application/json"}),"model.json"),t.weightData!=null&&e.body.append("model.weights.bin",new Blob([t.weightData],{type:"application/octet-stream"}),"model.weights.bin"),[4,this.fetch(this.path,e)];case 1:if((o=i.sent()).ok)return[2,{modelArtifactsInfo:$r(t),responses:[o]}];throw new Error("BrowserHTTPRequest.save() failed due to HTTP response status "+o.status+".")}}))}))},n.prototype.load=function(){return $(this,void 0,void 0,(function(){var t,e,r,a,o,i,s,u,c,l,h,f;return J(this,(function(d){switch(d.label){case 0:return[4,this.fetch(this.path,this.requestInit)];case 1:if(!(t=d.sent()).ok)throw new Error("Request to "+this.path+" failed with status code "+t.status+". Please verify this URL points to the model JSON of the model to load.");d.label=2;case 2:return d.trys.push([2,4,,5]),[4,t.json()];case 3:return e=d.sent(),[3,5];case 4:throw d.sent(),r="Failed to parse model JSON of response from "+this.path+".",this.path.endsWith(".pb")?r+=" Your path contains a .pb file extension. Support for .pb models have been removed in TensorFlow.js 1.0 in favor of .json models. You can re-convert your Python TensorFlow model using the TensorFlow.js 1.0 conversion scripts or you can convert your.pb models with the 'pb2json'NPM script in the tensorflow/tfjs-converter repository.":r+=" Please make sure the server is serving valid JSON for this request.",new Error(r);case 5:if(a=e.modelTopology,o=e.weightsManifest,i=e.generatedBy,s=e.convertedBy,u=e.format,c=e.userDefinedMetadata,a==null&&o==null)throw new Error("The JSON from HTTP path "+this.path+" contains neither model topology or manifest for weights.");return o==null?[3,7]:[4,this.loadWeights(o)];case 6:f=d.sent(),l=f[0],h=f[1],d.label=7;case 7:return[2,{modelTopology:a,weightSpecs:l,weightData:h,userDefinedMetadata:c,generatedBy:i,convertedBy:s,format:u}]}}))}))},n.prototype.loadWeights=function(t){return $(this,void 0,void 0,(function(){var e,r,a,o,i,s,u,c,l,h,f;return J(this,(function(d){switch(d.label){case 0:for(e=Array.isArray(this.path)?this.path[1]:this.path,r=(function(p){var v=p.lastIndexOf("/"),m=p.lastIndexOf("?"),g=p.substring(0,v),y=m>v?p.substring(m):"";return[g+"/",y]})(e),a=r[0],o=r[1],i=this.weightPathPrefix||a,s=[],u=0,c=t;u<c.length;u++)l=c[u],s.push.apply(s,l.weights);return h=[],t.forEach((function(p){p.paths.forEach((function(v){h.push(i+v+o)}))})),[4,bl(h,{requestInit:this.requestInit,fetchFunc:this.fetch,onProgress:this.onProgress})];case 1:return f=d.sent(),[2,[s,qi(f)]]}}))}))},n.URL_SCHEME_REGEX=/^https?:\/\//,n})();function ci(n){return n.match(wl.URL_SCHEME_REGEX)!=null}var yu=function(n,t){return typeof fetch>"u"?null:(Array.isArray(n)?n.every((function(e){return ci(e)})):ci(n))?li(n,{onProgress:t}):null};function li(n,t){return new wl(n,t)}Rt.registerSaveRouter(yu),Rt.registerLoadRouter(yu);var Uo=(function(){function n(t){this.modelArtifacts=t}return n.prototype.load=function(){return $(this,void 0,void 0,(function(){return J(this,(function(t){return[2,this.modelArtifacts]}))}))},n})(),Sy=(function(){function n(t){this.saveHandler=t}return n.prototype.save=function(t){return $(this,void 0,void 0,(function(){return J(this,(function(e){return[2,this.saveHandler(t)]}))}))},n})(),Cl=Object.freeze({browserFiles:function(n){return new _y(n)},browserHTTPRequest:function(n,t){return li(n,t)},concatenateArrayBuffers:qi,decodeWeights:ml,encodeWeights:function(n,t){return $(this,void 0,void 0,(function(){var e,r,a,o,i,s=this;return J(this,(function(u){switch(u.label){case 0:for(e=[],r=[],a=Array.isArray(n)?n.map((function(c){return c.name})):Object.keys(n),o=function(c){var l=a[c],h=Array.isArray(n)?n[c].tensor:n[l];if(h.dtype!=="float32"&&h.dtype!=="int32"&&h.dtype!=="bool"&&h.dtype!=="string")throw new Error("Unsupported dtype in weight '"+l+"': "+h.dtype);var f={name:l,shape:h.shape,dtype:h.dtype};if(h.dtype==="string"){var d=new Promise((function(p){return $(s,void 0,void 0,(function(){var v,m,g,y,b,x,w;return J(this,(function(C){switch(C.label){case 0:return[4,h.bytes()];case 1:for(v=C.sent(),m=v.reduce((function(k,S){return k+S.length}),0)+Ha*v.length,g=new Uint8Array(m),y=0,b=0;b<v.length;b++)x=v[b],w=new Uint8Array(new Uint32Array([x.length]).buffer),g.set(w,y),y+=Ha,g.set(x,y),y+=x.length;return p(g),[2]}}))}))}));r.push(d)}else r.push(h.data());t!=null&&(f.group=t),e.push(f)},i=0;i<a.length;++i)o(i);return[4,Promise.all(r)];case 1:return[2,{data:dy(u.sent()),specs:e}]}}))}))},fromMemory:function(n,t,e,r){return arguments.length===1?n.modelTopology!=null||n.weightSpecs!=null?new Uo(n):(console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release."),new Uo({modelTopology:n})):(console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release."),new Uo({modelTopology:n,weightSpecs:t,weightData:e,trainingConfig:r}))},getLoadHandlers:function(n,t){return Rt.getLoadHandlers(n,t)},getModelArtifactsInfoForJSON:$r,getSaveHandlers:function(n){return Rt.getSaveHandlers(n)},http:li,isHTTPScheme:ci,loadWeights:function(n,t,e,r){return t===void 0&&(t=""),$(this,void 0,void 0,(function(){return J(this,(function(a){return[2,gu((function(o){return bl(o,{requestInit:r})}))(n,t,e)]}))}))},registerLoadRouter:function(n){return Rt.registerLoadRouter(n)},registerSaveRouter:function(n){return Rt.registerSaveRouter(n)},weightsLoaderFactory:gu,withSaveHandler:function(n){return new Sy(n)},copyModel:function(n,t){return $(this,void 0,void 0,(function(){return J(this,(function(e){return[2,fu(n,t,!1)]}))}))},listModels:function(){return $(this,void 0,void 0,(function(){var n,t,e,r,a,o,i;return J(this,(function(s){switch(s.label){case 0:n=Tn.getSchemes(),t={},e=0,r=n,s.label=1;case 1:return e<r.length?(a=r[e],[4,Tn.getManager(a).listModels()]):[3,4];case 2:for(i in o=s.sent())t[a+vr+i]=o[i];s.label=3;case 3:return e++,[3,1];case 4:return[2,t]}}))}))},moveModel:function(n,t){return $(this,void 0,void 0,(function(){return J(this,(function(e){return[2,fu(n,t,!0)]}))}))},removeModel:function(n){return $(this,void 0,void 0,(function(){var t;return J(this,(function(e){return t=Ea(n),[2,Tn.getManager(t.scheme).removeModel(t.path)]}))}))}}),ir;T({confusionMatrix_:function(n,t,e){var r=E(n,"labels","confusionMatrix"),a=E(t,"predictions","confusionMatrix");I(e==null||e>0&&Number.isInteger(e),(function(){return"If provided, numClasses must be a positive integer, but got "+e})),I(r.rank===1,(function(){return"Expected the rank of labels to be 1, but got "+r.rank})),I(a.rank===1,(function(){return"Expected the rank of predictions to be 1, but got "+a.rank})),I(r.shape[0]===a.shape[0],(function(){return"Mismatch in the number of examples: "+r.shape[0]+" vs. "+a.shape[0]+". Labels and predictions should have the same number of elements."})),I(e>0&&Number.isInteger(e),(function(){return"numClasses is required to be a positive integer, but got "+e}));var o=ti(r.asType("int32"),e),i=ti(a.asType("int32"),e);return o.transpose().matMul(i).asType("int32")}});var Ry=T({fromPixels_:function(n,t){if(t===void 0&&(t=3),t>4)throw new Error("Cannot construct Tensor with more than 4 channels from pixels.");if(n==null)throw new Error("pixels passed to tf.browser.fromPixels() can not be null");var e=!1,r=!1,a=!1,o=!1,i=!1;if(n.data instanceof Uint8Array)e=!0;else if(typeof ImageData<"u"&&n instanceof ImageData)r=!0;else if(typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement)a=!0;else if(typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement)o=!0;else{if(n.getContext==null)throw new Error("pixels passed to tf.browser.fromPixels() must be either an HTMLVideoElement, HTMLImageElement, HTMLCanvasElement, ImageData in browser, or OffscreenCanvas, ImageData in webworker or {data: Uint32Array, width: number, height: number}, but was "+n.constructor.name);i=!0}if(a&&a&&n.readyState<2)throw new Error("The video element has not loaded data yet. Please wait for `loadeddata` event on the <video> element.");if(qu("FromPixels",M.backendName)!=null)return M.runKernel("FromPixels",{pixels:n},{numChannels:t});var s,u,c=a?[n.videoWidth,n.videoHeight]:[n.width,n.height],l=c[0],h=c[1];if(i?s=n.getContext("2d").getImageData(0,0,l,h).data:r||e?s=n.data:(o||a)&&(ir==null&&(ir=document.createElement("canvas").getContext("2d")),ir.canvas.width=l,ir.canvas.height=h,ir.drawImage(n,0,0,l,h),s=ir.getImageData(0,0,l,h).data),t===4)u=new Int32Array(s);else{var f=l*h;u=new Int32Array(f*t);for(var d=0;d<f;d++)for(var p=0;p<t;++p)u[d*t+p]=s[4*d+p]}return wi(u,[h,l,t],"int32")}}),Xi=Object.freeze({toPixels:function(n,t){return $(this,void 0,void 0,(function(){var e,r,a,o,i,s,u,c,l,h,f,d,p,v,m,g,y,b,x,w,C,k,S;return J(this,(function(_){switch(_.label){case 0:if(e=E(n,"img","toPixels"),n instanceof Be||(e=e.toInt()),e.rank!==2&&e.rank!==3)throw new Error("toPixels only supports rank 2 or 3 tensors, got rank "+e.rank+".");if(r=e.shape.slice(0,2),a=r[0],o=r[1],(i=e.rank===2?1:e.shape[2])>4||i===2)throw new Error("toPixels only supports depth of size 1, 3 or 4 but got "+i);return[4,e.data()];case 1:return s=_.sent(),u=e.min(),c=e.max(),[4,Promise.all([u.data(),c.data()])];case 2:if(l=_.sent(),h=l[0],f=l[1],d=h[0],p=f[0],u.dispose(),c.dispose(),e.dtype==="float32"){if(d<0||p>1)throw new Error("Tensor values for a float32 Tensor must be in the range [0 - 1] but got range ["+d+" - "+p+"].")}else{if(e.dtype!=="int32")throw new Error("Unsupported type for toPixels: "+e.dtype+". Please use float32 or int32 tensors.");if(d<0||p>255)throw new Error("Tensor values for a int32 Tensor must be in the range [0 - 255] but got range ["+d+" - "+p+"].")}for(v=e.dtype==="float32"?255:1,m=new Uint8ClampedArray(o*a*4),g=0;g<a*o;++g)y=void 0,b=void 0,x=void 0,w=void 0,i===1?(y=s[g]*v,b=s[g]*v,x=s[g]*v,w=255):i===3?(y=s[3*g]*v,b=s[3*g+1]*v,x=s[3*g+2]*v,w=255):i===4&&(y=s[4*g]*v,b=s[4*g+1]*v,x=s[4*g+2]*v,w=s[4*g+3]*v),m[(C=4*g)+0]=Math.round(y),m[C+1]=Math.round(b),m[C+2]=Math.round(x),m[C+3]=Math.round(w);return t!=null&&(t.width=o,t.height=a,k=t.getContext("2d"),S=new ImageData(m,o,a),k.putImageData(S,0,0)),e!==n&&e.dispose(),[2,m]}}))}))},fromPixels:Ry}),Iy=(function(){function n(){}return n.prototype.getClassName=function(){return this.constructor.className},n.fromConfig=function(t,e){return new t(e)},n})(),ky=(function(){function n(){this.classNameMap={}}return n.getMap=function(){return n.instance==null&&(n.instance=new n),n.instance},n.register=function(t){n.getMap().classNameMap[t.className]=[t,t.fromConfig]},n})();function Zn(n){I(n.className!=null,(function(){return"Class being registered does not have the static className property defined."})),I(typeof n.className=="string",(function(){return"className is required to be a string, but got type "+typeof n.className})),I(n.className.length>0,(function(){return"Class being registered has an empty-string as its className, which is disallowed."})),ky.register(n)}var er=(function(n){function t(){return n!==null&&n.apply(this,arguments)||this}return Ht(t,n),t.prototype.minimize=function(e,r,a){r===void 0&&(r=!1);var o=this.computeGradients(e,a),i=o.value,s=o.grads;if(a!=null){var u=a.map((function(c){return{name:c.name,tensor:s[c.name]}}));this.applyGradients(u)}else this.applyGradients(s);return xt(s),r?i:(i.dispose(),null)},Object.defineProperty(t.prototype,"iterations",{get:function(){return this.iterations_==null&&(this.iterations_=0),this.iterations_},enumerable:!0,configurable:!0}),t.prototype.incrementIterations=function(){this.iterations_=this.iterations+1},t.prototype.computeGradients=function(e,r){return Lp(e,r)},t.prototype.dispose=function(){this.iterations_!=null&&xt(this.iterations_)},t.prototype.saveIterations=function(){return $(this,void 0,void 0,(function(){return J(this,(function(e){return this.iterations_==null&&(this.iterations_=0),[2,{name:"iter",tensor:X(this.iterations_,"int32")}]}))}))},t.prototype.getWeights=function(){return $(this,void 0,void 0,(function(){return J(this,(function(e){throw new Error("getWeights() is not implemented for this optimizer yet.")}))}))},t.prototype.setWeights=function(e){return $(this,void 0,void 0,(function(){return J(this,(function(r){throw new Error("setWeights() is not implemented for this optimizer class "+this.getClassName())}))}))},t.prototype.extractIterations=function(e){return $(this,void 0,void 0,(function(){var r;return J(this,(function(a){switch(a.label){case 0:return r=this,[4,e[0].tensor.data()];case 1:return r.iterations_=a.sent()[0],[2,e.slice(1)]}}))}))},t})(Iy);Object.defineProperty(er,Symbol.hasInstance,{value:function(n){return n.minimize!=null&&n.computeGradients!=null&&n.applyGradients!=null}});var Ty=(function(n){function t(e,r,a){a===void 0&&(a=null);var o=n.call(this)||this;return o.learningRate=e,o.rho=r,o.epsilon=a,o.accumulatedGrads=[],o.accumulatedUpdates=[],a==null&&(o.epsilon=M.backend.epsilon()),o}return Ht(t,n),t.prototype.applyGradients=function(e){var r=this;(Array.isArray(e)?e.map((function(a){return a.name})):Object.keys(e)).forEach((function(a,o){var i=M.registeredVariables[a];r.accumulatedGrads[o]==null&&(r.accumulatedGrads[o]={originalName:a+"/accum_grad",variable:K((function(){return Ee(i).variable(!1)}))}),r.accumulatedUpdates[o]==null&&(r.accumulatedUpdates[o]={originalName:a+"/accum_var",variable:K((function(){return Ee(i).variable(!1)}))});var s=Array.isArray(e)?e[o].tensor:e[a];if(s!=null){var u=r.accumulatedGrads[o].variable,c=r.accumulatedUpdates[o].variable;K((function(){var l=u.mul(r.rho).add(s.square().mul(1-r.rho)),h=c.add(r.epsilon).sqrt().div(u.add(r.epsilon).sqrt()).mul(s),f=c.mul(r.rho).add(h.square().mul(1-r.rho));u.assign(l),c.assign(f);var d=h.mul(-r.learningRate).add(i);i.assign(d)}))}})),this.incrementIterations()},t.prototype.dispose=function(){this.accumulatedUpdates!=null&&(xt(this.accumulatedGrads.map((function(e){return e.variable}))),xt(this.accumulatedUpdates.map((function(e){return e.variable}))))},t.prototype.getWeights=function(){return $(this,void 0,void 0,(function(){var e;return J(this,(function(r){switch(r.label){case 0:return e=this.accumulatedGrads.concat(this.accumulatedUpdates),[4,this.saveIterations()];case 1:return[2,[r.sent()].concat(e.map((function(a){return{name:a.originalName,tensor:a.variable}})))]}}))}))},t.prototype.setWeights=function(e){return $(this,void 0,void 0,(function(){var r;return J(this,(function(a){switch(a.label){case 0:return[4,this.extractIterations(e)];case 1:return e=a.sent(),r=e.length/2,this.accumulatedGrads=e.slice(0,r).map((function(o){return{originalName:o.name,variable:o.tensor.variable(!1)}})),this.accumulatedUpdates=e.slice(r,2*r).map((function(o){return{originalName:o.name,variable:o.tensor.variable(!1)}})),[2]}}))}))},t.prototype.getConfig=function(){return{learningRate:this.learningRate,rho:this.rho,epsilon:this.epsilon}},t.fromConfig=function(e,r){return new e(r.learningRate,r.rho,r.epsilon)},t.className="Adadelta",t})(er);Zn(Ty);var Ay=(function(n){function t(e,r){r===void 0&&(r=.1);var a=n.call(this)||this;return a.learningRate=e,a.initialAccumulatorValue=r,a.accumulatedGrads=[],a}return Ht(t,n),t.prototype.applyGradients=function(e){var r=this;(Array.isArray(e)?e.map((function(a){return a.name})):Object.keys(e)).forEach((function(a,o){var i=M.registeredVariables[a];r.accumulatedGrads[o]==null&&(r.accumulatedGrads[o]={originalName:a+"/accumulator",variable:K((function(){return rn(i.shape,r.initialAccumulatorValue).variable(!1)}))});var s=Array.isArray(e)?e[o].tensor:e[a];if(s!=null){var u=r.accumulatedGrads[o].variable;K((function(){var c=u.add(s.square());u.assign(c);var l=s.div(c.add(M.backend.epsilon()).sqrt()).mul(-r.learningRate).add(i);i.assign(l)}))}})),this.incrementIterations()},t.prototype.dispose=function(){this.accumulatedGrads!=null&&xt(this.accumulatedGrads.map((function(e){return e.variable})))},t.prototype.getWeights=function(){return $(this,void 0,void 0,(function(){return J(this,(function(e){switch(e.label){case 0:return[4,this.saveIterations()];case 1:return[2,[e.sent()].concat(this.accumulatedGrads.map((function(r){return{name:r.originalName,tensor:r.variable}})))]}}))}))},t.prototype.setWeights=function(e){return $(this,void 0,void 0,(function(){return J(this,(function(r){switch(r.label){case 0:return[4,this.extractIterations(e)];case 1:return e=r.sent(),this.accumulatedGrads=e.map((function(a){return{originalName:a.name,variable:a.tensor.variable(!1)}})),[2]}}))}))},t.prototype.getConfig=function(){return{learningRate:this.learningRate,initialAccumulatorValue:this.initialAccumulatorValue}},t.fromConfig=function(e,r){return new e(r.learningRate,r.initialAccumulatorValue)},t.className="Adagrad",t})(er);Zn(Ay);var Dy=(function(n){function t(e,r,a,o){o===void 0&&(o=null);var i=n.call(this)||this;return i.learningRate=e,i.beta1=r,i.beta2=a,i.epsilon=o,i.accumulatedFirstMoment=[],i.accumulatedSecondMoment=[],K((function(){i.accBeta1=X(r).variable(),i.accBeta2=X(a).variable()})),o==null&&(i.epsilon=M.backend.epsilon()),i}return Ht(t,n),t.prototype.applyGradients=function(e){var r=this,a=Array.isArray(e)?e.map((function(o){return o.name})):Object.keys(e);K((function(){var o=Xe(1,r.accBeta1),i=Xe(1,r.accBeta2);a.forEach((function(s,u){var c=M.registeredVariables[s];r.accumulatedFirstMoment[u]==null&&(r.accumulatedFirstMoment[u]={originalName:s+"/m",variable:K((function(){return Ee(c).variable(!1)}))}),r.accumulatedSecondMoment[u]==null&&(r.accumulatedSecondMoment[u]={originalName:s+"/v",variable:K((function(){return Ee(c).variable(!1)}))});var l=Array.isArray(e)?e[u].tensor:e[s];if(l!=null){var h=r.accumulatedFirstMoment[u].variable,f=r.accumulatedSecondMoment[u].variable,d=h.mul(r.beta1).add(l.mul(1-r.beta1)),p=f.mul(r.beta2).add(l.square().mul(1-r.beta2)),v=d.div(o),m=p.div(i);h.assign(d),f.assign(p);var g=v.div(m.sqrt().add(r.epsilon)).mul(-r.learningRate).add(c);c.assign(g)}})),r.accBeta1.assign(r.accBeta1.mul(r.beta1)),r.accBeta2.assign(r.accBeta2.mul(r.beta2))})),this.incrementIterations()},t.prototype.dispose=function(){this.accBeta1.dispose(),this.accBeta2.dispose(),this.accumulatedFirstMoment!=null&&xt(this.accumulatedFirstMoment.map((function(e){return e.variable}))),this.accumulatedSecondMoment!=null&&xt(this.accumulatedSecondMoment.map((function(e){return e.variable})))},t.prototype.getWeights=function(){return $(this,void 0,void 0,(function(){var e;return J(this,(function(r){switch(r.label){case 0:return e=this.accumulatedFirstMoment.concat(this.accumulatedSecondMoment),[4,this.saveIterations()];case 1:return[2,[r.sent()].concat(e.map((function(a){return{name:a.originalName,tensor:a.variable}})))]}}))}))},t.prototype.setWeights=function(e){return $(this,void 0,void 0,(function(){var r,a=this;return J(this,(function(o){switch(o.label){case 0:return[4,this.extractIterations(e)];case 1:return e=o.sent(),K((function(){a.accBeta1.assign(Va(a.beta1,a.iterations_+1)),a.accBeta2.assign(Va(a.beta2,a.iterations_+1))})),r=e.length/2,this.accumulatedFirstMoment=e.slice(0,r).map((function(i){return{originalName:i.name,variable:i.tensor.variable(!1)}})),this.accumulatedSecondMoment=e.slice(r,2*r).map((function(i){return{originalName:i.name,variable:i.tensor.variable(!1)}})),[2]}}))}))},t.prototype.getConfig=function(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon}},t.fromConfig=function(e,r){return new e(r.learningRate,r.beta1,r.beta2,r.epsilon)},t.className="Adam",t})(er);Zn(Dy);var My=(function(n){function t(e,r,a,o,i){o===void 0&&(o=null),i===void 0&&(i=0);var s=n.call(this)||this;return s.learningRate=e,s.beta1=r,s.beta2=a,s.epsilon=o,s.decay=i,s.accumulatedFirstMoment=[],s.accumulatedWeightedInfNorm=[],K((function(){s.iteration=X(0).variable(),s.accBeta1=X(r).variable()})),o==null&&(s.epsilon=M.backend.epsilon()),s}return Ht(t,n),t.prototype.applyGradients=function(e){var r=this,a=Array.isArray(e)?e.map((function(o){return o.name})):Object.keys(e);K((function(){var o=Xe(1,r.accBeta1),i=Wt(-r.learningRate,r.iteration.mul(r.decay).add(1));a.forEach((function(s,u){var c=M.registeredVariables[s];r.accumulatedFirstMoment[u]==null&&(r.accumulatedFirstMoment[u]={originalName:s+"/m",variable:Ee(c).variable(!1)}),r.accumulatedWeightedInfNorm[u]==null&&(r.accumulatedWeightedInfNorm[u]={originalName:s+"/v",variable:Ee(c).variable(!1)});var l=Array.isArray(e)?e[u].tensor:e[s];if(l!=null){var h=r.accumulatedFirstMoment[u].variable,f=r.accumulatedWeightedInfNorm[u].variable,d=h.mul(r.beta1).add(l.mul(1-r.beta1)),p=f.mul(r.beta2),v=l.abs(),m=p.maximum(v);h.assign(d),f.assign(m);var g=i.div(o).mul(d.div(m.add(r.epsilon))).add(c);c.assign(g)}})),r.iteration.assign(r.iteration.add(1)),r.accBeta1.assign(r.accBeta1.mul(r.beta1))})),this.incrementIterations()},t.prototype.dispose=function(){this.accBeta1.dispose(),this.iteration.dispose(),this.accumulatedFirstMoment!=null&&xt(this.accumulatedFirstMoment.map((function(e){return e.variable}))),this.accumulatedWeightedInfNorm!=null&&xt(this.accumulatedWeightedInfNorm.map((function(e){return e.variable})))},t.prototype.getWeights=function(){return $(this,void 0,void 0,(function(){return J(this,(function(e){throw new Error("getWeights() is not implemented for Adamax yet.")}))}))},t.prototype.setWeights=function(e){return $(this,void 0,void 0,(function(){return J(this,(function(r){throw new Error("setWeights() is not implemented for Adamax yet.")}))}))},t.prototype.getConfig=function(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon,decay:this.decay}},t.fromConfig=function(e,r){return new e(r.learningRate,r.beta1,r.beta2,r.epsilon,r.decay)},t.className="Adamax",t})(er);Zn(My);var El=(function(n){function t(e){var r=n.call(this)||this;return r.learningRate=e,r.setLearningRate(e),r}return Ht(t,n),t.prototype.applyGradients=function(e){var r=this;(Array.isArray(e)?e.map((function(a){return a.name})):Object.keys(e)).forEach((function(a,o){var i=Array.isArray(e)?e[o].tensor:e[a];if(i!=null){var s=M.registeredVariables[a];K((function(){var u=r.c.mul(i).add(s);s.assign(u)}))}})),this.incrementIterations()},t.prototype.setLearningRate=function(e){this.learningRate=e,this.c!=null&&this.c.dispose(),this.c=Qd(X(-e))},t.prototype.dispose=function(){this.c.dispose()},t.prototype.getWeights=function(){return $(this,void 0,void 0,(function(){return J(this,(function(e){switch(e.label){case 0:return[4,this.saveIterations()];case 1:return[2,[e.sent()]]}}))}))},t.prototype.setWeights=function(e){return $(this,void 0,void 0,(function(){return J(this,(function(r){switch(r.label){case 0:return[4,this.extractIterations(e)];case 1:if((e=r.sent()).length!==0)throw new Error("SGD optimizer does not have settable weights.");return[2]}}))}))},t.prototype.getConfig=function(){return{learningRate:this.learningRate}},t.fromConfig=function(e,r){return new e(r.learningRate)},t.className="SGD",t})(er);Zn(El);var Ny=(function(n){function t(e,r,a){a===void 0&&(a=!1);var o=n.call(this,e)||this;return o.learningRate=e,o.momentum=r,o.useNesterov=a,o.accumulations=[],o.m=X(o.momentum),o}return Ht(t,n),t.prototype.applyGradients=function(e){var r=this;(Array.isArray(e)?e.map((function(a){return a.name})):Object.keys(e)).forEach((function(a,o){var i=M.registeredVariables[a];r.accumulations[o]==null&&(r.accumulations[o]={originalName:a+"/momentum",variable:K((function(){return Ee(i).variable(!1)}))});var s=r.accumulations[o].variable,u=Array.isArray(e)?e[o].tensor:e[a];u!=null&&K((function(){var c,l=r.m.mul(s).add(u);c=r.useNesterov?r.c.mul(u.add(l.mul(r.m))).add(i):r.c.mul(l).add(i),s.assign(l),i.assign(c)}))})),this.incrementIterations()},t.prototype.dispose=function(){this.m.dispose(),this.accumulations!=null&&xt(this.accumulations.map((function(e){return e.variable})))},t.prototype.setMomentum=function(e){this.momentum=e},t.prototype.getWeights=function(){return $(this,void 0,void 0,(function(){return J(this,(function(e){switch(e.label){case 0:return[4,this.saveIterations()];case 1:return[2,[e.sent()].concat(this.accumulations.map((function(r){return{name:r.originalName,tensor:r.variable}})))]}}))}))},t.prototype.setWeights=function(e){return $(this,void 0,void 0,(function(){return J(this,(function(r){switch(r.label){case 0:return[4,this.extractIterations(e)];case 1:return e=r.sent(),this.accumulations=e.map((function(a){return{originalName:a.name,variable:a.tensor.variable(!1)}})),[2]}}))}))},t.prototype.getConfig=function(){return{learningRate:this.learningRate,momentum:this.momentum,useNesterov:this.useNesterov}},t.fromConfig=function(e,r){return new e(r.learningRate,r.momentum,r.useNesterov)},t.className="Momentum",t})(El);Zn(Ny);var Fy=(function(n){function t(e,r,a,o,i){r===void 0&&(r=.9),a===void 0&&(a=0),o===void 0&&(o=null),i===void 0&&(i=!1);var s=n.call(this)||this;if(s.learningRate=e,s.decay=r,s.momentum=a,s.epsilon=o,s.accumulatedMeanSquares=[],s.accumulatedMoments=[],s.accumulatedMeanGrads=[],s.centered=i,o==null&&(s.epsilon=M.backend.epsilon()),e==null)throw new Error("learningRate for RMSPropOptimizer must be defined.");return s}return Ht(t,n),t.prototype.applyGradients=function(e){var r=this;(Array.isArray(e)?e.map((function(a){return a.name})):Object.keys(e)).forEach((function(a,o){var i=M.registeredVariables[a];r.accumulatedMeanSquares[o]==null&&(r.accumulatedMeanSquares[o]={originalName:a+"/rms",variable:K((function(){return Ee(i).variable(!1)}))}),r.accumulatedMoments[o]==null&&(r.accumulatedMoments[o]={originalName:a+"/momentum",variable:K((function(){return Ee(i).variable(!1)}))}),r.accumulatedMeanGrads[o]==null&&r.centered&&(r.accumulatedMeanGrads[o]={originalName:a+"/mg",variable:K((function(){return Ee(i).variable(!1)}))});var s=Array.isArray(e)?e[o].tensor:e[a];if(s!=null){var u=r.accumulatedMeanSquares[o].variable,c=r.accumulatedMoments[o].variable;K((function(){var l=u.mul(r.decay).add(s.square().mul(1-r.decay));if(r.centered){var h=r.accumulatedMeanGrads[o].variable,f=h.mul(r.decay).add(s.mul(1-r.decay)),d=c.mul(r.momentum).add(s.mul(r.learningRate).div(l.sub(f.square().add(r.epsilon)).sqrt()));u.assign(l),h.assign(f),c.assign(d);var p=i.sub(d);i.assign(p)}else{var v=u.mul(r.decay).add(s.square().mul(1-r.decay));d=c.mul(r.momentum).add(s.mul(r.learningRate).div(v.add(r.epsilon).sqrt())),u.assign(v),c.assign(d),p=i.sub(d),i.assign(p)}}))}})),this.incrementIterations()},t.prototype.dispose=function(){this.accumulatedMeanSquares!=null&&xt(this.accumulatedMeanSquares.map((function(e){return e.variable}))),this.accumulatedMeanGrads!=null&&this.centered&&xt(this.accumulatedMeanGrads.map((function(e){return e.variable}))),this.accumulatedMoments!=null&&xt(this.accumulatedMoments.map((function(e){return e.variable})))},t.prototype.getWeights=function(){return $(this,void 0,void 0,(function(){var e;return J(this,(function(r){switch(r.label){case 0:return e=this.accumulatedMeanSquares.concat(this.accumulatedMoments),this.centered&&e.push.apply(e,this.accumulatedMeanGrads),[4,this.saveIterations()];case 1:return[2,[r.sent()].concat(e.map((function(a){return{name:a.originalName,tensor:a.variable}})))]}}))}))},t.prototype.setWeights=function(e){return $(this,void 0,void 0,(function(){var r;return J(this,(function(a){switch(a.label){case 0:return[4,this.extractIterations(e)];case 1:return e=a.sent(),r=this.centered?e.length/3:e.length/2,this.accumulatedMeanSquares=e.slice(0,r).map((function(o){return{originalName:o.name,variable:o.tensor.variable(!1)}})),this.accumulatedMoments=e.slice(r,2*r).map((function(o){return{originalName:o.name,variable:o.tensor.variable(!1)}})),this.centered&&(this.accumulatedMeanGrads=e.slice(2*r,3*r).map((function(o){return{originalName:o.name,variable:o.tensor.variable(!1)}}))),[2]}}))}))},t.prototype.getConfig=function(){return{learningRate:this.learningRate,decay:this.decay,momentum:this.momentum,epsilon:this.epsilon,centered:this.centered}},t.fromConfig=function(e,r){return new e(r.learningRate,r.decay,r.momentum,r.epsilon,r.centered)},t.className="RMSProp",t})(er);Zn(Fy);Be.prototype.squaredDifference=function(n){return Lc(this,n)},B=iy;var hi=function(n,t){return hi=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,r){e.__proto__=r}||function(e,r){for(var a in r)r.hasOwnProperty(a)&&(e[a]=r[a])},hi(n,t)};function le(n,t){hi(n,t);function e(){this.constructor=n}n.prototype=t===null?Object.create(t):(e.prototype=t.prototype,new e)}var it=function(){return it=Object.assign||function(t){for(var e,r=1,a=arguments.length;r<a;r++){e=arguments[r];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t},it.apply(this,arguments)};function te(n,t,e,r){function a(o){return o instanceof e?o:new e(function(i){i(o)})}return new(e||(e=Promise))(function(o,i){function s(l){try{c(r.next(l))}catch(h){i(h)}}function u(l){try{c(r.throw(l))}catch(h){i(h)}}function c(l){l.done?o(l.value):a(l.value).then(s,u)}c((r=r.apply(n,[])).next())})}function ne(n,t){var e={label:0,sent:function(){if(o[0]&1)throw o[1];return o[1]},trys:[],ops:[]},r,a,o,i;return i={next:s(0),throw:s(1),return:s(2)},typeof Symbol=="function"&&(i[Symbol.iterator]=function(){return this}),i;function s(c){return function(l){return u([c,l])}}function u(c){if(r)throw new TypeError("Generator is already executing.");for(;e;)try{if(r=1,a&&(o=c[0]&2?a.return:c[0]?a.throw||((o=a.return)&&o.call(a),0):a.next)&&!(o=o.call(a,c[1])).done)return o;switch(a=0,o&&(c=[c[0]&2,o.value]),c[0]){case 0:case 1:o=c;break;case 4:return e.label++,{value:c[1],done:!1};case 5:e.label++,a=c[1],c=[0];continue;case 7:c=e.ops.pop(),e.trys.pop();continue;default:if(o=e.trys,!(o=o.length>0&&o[o.length-1])&&(c[0]===6||c[0]===2)){e=0;continue}if(c[0]===3&&(!o||c[1]>o[0]&&c[1]<o[3])){e.label=c[1];break}if(c[0]===6&&e.label<o[1]){e.label=o[1],o=c;break}if(o&&e.label<o[2]){e.label=o[2],e.ops.push(c);break}o[2]&&e.ops.pop(),e.trys.pop();continue}c=t.call(n,e)}catch(l){c=[6,l],a=0}finally{r=o=0}if(c[0]&5)throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}}function Pr(){for(var n=0,t=0,e=arguments.length;t<e;t++)n+=arguments[t].length;for(var r=Array(n),a=0,t=0;t<e;t++)for(var o=arguments[t],i=0,s=o.length;i<s;i++,a++)r[a]=o[i];return r}var yr=(function(){function n(t,e){if(!qn(t)||!qn(e))throw new Error("Dimensions.constructor - expected width and height to be valid numbers, instead have "+JSON.stringify({width:t,height:e}));this._width=t,this._height=e}return Object.defineProperty(n.prototype,"width",{get:function(){return this._width},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"height",{get:function(){return this._height},enumerable:!0,configurable:!0}),n.prototype.reverse=function(){return new n(1/this.width,1/this.height)},n})();function oo(n,t){return n instanceof Be&&n.shape.length===t}function Py(n){return oo(n,2)}function io(n){return oo(n,3)}function An(n){return oo(n,4)}function By(n){return n%1!==0}function xu(n){return n%2===0}function Oy(n,t){t===void 0&&(t=2);var e=Math.pow(10,t);return Math.floor(n*e)/e}function bu(n){return n&&n.width&&n.height}function Ly(n,t){var e=n.width,r=n.height,a=t/Math.max(r,e);return new yr(Math.round(e*a),Math.round(r*a))}function Ki(n){return n.reduce(function(t,e){return t.add(e)},new Ie(0,0)).div(new Ie(n.length,n.length))}function zr(n,t,e){return Array(n).fill(0).map(function(r,a){return t+a*e})}function qn(n){return!!n&&n!==1/0&&n!==-1/0&&!isNaN(n)||n===0}function wu(n){return qn(n)&&0<=n&&n<=1}var Ie=(function(){function n(t,e){this._x=t,this._y=e}return Object.defineProperty(n.prototype,"x",{get:function(){return this._x},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"y",{get:function(){return this._y},enumerable:!0,configurable:!0}),n.prototype.add=function(t){return new n(this.x+t.x,this.y+t.y)},n.prototype.sub=function(t){return new n(this.x-t.x,this.y-t.y)},n.prototype.mul=function(t){return new n(this.x*t.x,this.y*t.y)},n.prototype.div=function(t){return new n(this.x/t.x,this.y/t.y)},n.prototype.abs=function(){return new n(Math.abs(this.x),Math.abs(this.y))},n.prototype.magnitude=function(){return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2))},n.prototype.floor=function(){return new n(Math.floor(this.x),Math.floor(this.y))},n})(),Mn=(function(){function n(t,e){e===void 0&&(e=!0);var r=t||{},a=[r.left,r.top,r.right,r.bottom].every(qn),o=[r.x,r.y,r.width,r.height].every(qn);if(!o&&!a)throw new Error("Box.constructor - expected box to be IBoundingBox | IRect, instead have "+JSON.stringify(r));var i=o?[r.x,r.y,r.width,r.height]:[r.left,r.top,r.right-r.left,r.bottom-r.top],s=i[0],u=i[1],c=i[2],l=i[3];n.assertIsValidBox({x:s,y:u,width:c,height:l},"Box.constructor",e),this._x=s,this._y=u,this._width=c,this._height=l}return n.isRect=function(t){return!!t&&[t.x,t.y,t.width,t.height].every(qn)},n.assertIsValidBox=function(t,e,r){if(r===void 0&&(r=!1),!n.isRect(t))throw new Error(e+" - invalid box: "+JSON.stringify(t)+", expected object with properties x, y, width, height");if(!r&&(t.width<0||t.height<0))throw new Error(e+" - width ("+t.width+") and height ("+t.height+") must be positive numbers")},Object.defineProperty(n.prototype,"x",{get:function(){return this._x},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"y",{get:function(){return this._y},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"width",{get:function(){return this._width},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"height",{get:function(){return this._height},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"left",{get:function(){return this.x},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"top",{get:function(){return this.y},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"right",{get:function(){return this.x+this.width},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"bottom",{get:function(){return this.y+this.height},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"area",{get:function(){return this.width*this.height},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"topLeft",{get:function(){return new Ie(this.left,this.top)},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"topRight",{get:function(){return new Ie(this.right,this.top)},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"bottomLeft",{get:function(){return new Ie(this.left,this.bottom)},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"bottomRight",{get:function(){return new Ie(this.right,this.bottom)},enumerable:!0,configurable:!0}),n.prototype.round=function(){var t=[this.x,this.y,this.width,this.height].map(function(i){return Math.round(i)}),e=t[0],r=t[1],a=t[2],o=t[3];return new n({x:e,y:r,width:a,height:o})},n.prototype.floor=function(){var t=[this.x,this.y,this.width,this.height].map(function(i){return Math.floor(i)}),e=t[0],r=t[1],a=t[2],o=t[3];return new n({x:e,y:r,width:a,height:o})},n.prototype.toSquare=function(){var t=this,e=t.x,r=t.y,a=t.width,o=t.height,i=Math.abs(a-o);return a<o&&(e-=i/2,a+=i),o<a&&(r-=i/2,o+=i),new n({x:e,y:r,width:a,height:o})},n.prototype.rescale=function(t){var e=bu(t)?t.width:t,r=bu(t)?t.height:t;return new n({x:this.x*e,y:this.y*r,width:this.width*e,height:this.height*r})},n.prototype.pad=function(t,e){var r=[this.x-t/2,this.y-e/2,this.width+t,this.height+e],a=r[0],o=r[1],i=r[2],s=r[3];return new n({x:a,y:o,width:i,height:s})},n.prototype.clipAtImageBorders=function(t,e){var r=this,a=r.x,o=r.y,i=r.right,s=r.bottom,u=Math.max(a,0),c=Math.max(o,0),l=i-u,h=s-c,f=Math.min(l,t-u),d=Math.min(h,e-c);return new n({x:u,y:c,width:f,height:d}).floor()},n.prototype.shift=function(t,e){var r=this,a=r.width,o=r.height,i=this.x+t,s=this.y+e;return new n({x:i,y:s,width:a,height:o})},n.prototype.padAtBorders=function(t,e){var r=this.width+1,a=this.height+1,o=1,i=1,s=r,u=a,c=this.left,l=this.top,h=this.right,f=this.bottom;return h>e&&(s=-h+e+r,h=e),f>t&&(u=-f+t+a,f=t),c<1&&(u=2-c,c=1),l<1&&(u=2-l,l=1),{dy:i,edy:u,dx:o,edx:s,y:l,ey:f,x:c,ex:h,w:r,h:a}},n.prototype.calibrate=function(t){return new n({left:this.left+t.left*this.width,top:this.top+t.top*this.height,right:this.right+t.right*this.width,bottom:this.bottom+t.bottom*this.height}).toSquare().round()},n})(),so=(function(n){le(t,n);function t(e,r,a,o,i){return i===void 0&&(i=!1),n.call(this,{left:e,top:r,right:a,bottom:o},i)||this}return t})(Mn),_l=(function(){function n(t,e,r,a,o){this._imageDims=new yr(o.width,o.height),this._score=t,this._classScore=e,this._className=r,this._box=new Mn(a).rescale(this._imageDims)}return Object.defineProperty(n.prototype,"score",{get:function(){return this._score},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"classScore",{get:function(){return this._classScore},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"className",{get:function(){return this._className},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"box",{get:function(){return this._box},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"imageDims",{get:function(){return this._imageDims},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"imageWidth",{get:function(){return this.imageDims.width},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"imageHeight",{get:function(){return this.imageDims.height},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"relativeBox",{get:function(){return new Mn(this._box).rescale(this.imageDims.reverse())},enumerable:!0,configurable:!0}),n.prototype.forSize=function(t,e){return new n(this.score,this.classScore,this.className,this.relativeBox,{width:t,height:e})},n})(),cn=(function(n){le(t,n);function t(e,r,a){return n.call(this,e,e,"",r,a)||this}return t.prototype.forSize=function(e,r){var a=n.prototype.forSize.call(this,e,r),o=a.score,i=a.relativeBox,s=a.imageDims;return new t(o,i,s)},t})(_l);function Uy(n,t,e){e===void 0&&(e=!0);var r=Math.max(0,Math.min(n.right,t.right)-Math.max(n.left,t.left)),a=Math.max(0,Math.min(n.bottom,t.bottom)-Math.max(n.top,t.top)),o=r*a;return e?o/(n.area+t.area-o):o/Math.min(n.area,t.area)}function Wy(n){var t=n.map(function(s){return s.x}),e=n.map(function(s){return s.y}),r=t.reduce(function(s,u){return u<s?u:s},1/0),a=e.reduce(function(s,u){return u<s?u:s},1/0),o=t.reduce(function(s,u){return s<u?u:s},0),i=e.reduce(function(s,u){return s<u?u:s},0);return new so(r,a,o,i)}function Vr(n,t,e,r){r===void 0&&(r=!0);for(var a=t.map(function(s,u){return{score:s,boxIndex:u}}).sort(function(s,u){return s.score-u.score}).map(function(s){return s.boxIndex}),o=[],i=function(){var s=a.pop();o.push(s);for(var u=a,c=[],l=0;l<u.length;l++){var h=u[l],f=n[s],d=n[h];c.push(Uy(f,d,r))}a=a.filter(function(p,v){return c[v]<=e})};a.length>0;)i();return o}function Jr(n,t){return K(function(){var e=t[0],r=t[1],a=t[2],o=rn(Pr(n.shape.slice(0,3),[1]),e),i=rn(Pr(n.shape.slice(0,3),[1]),r),s=rn(Pr(n.shape.slice(0,3),[1]),a),u=He([o,i,s],3);return Xe(n,u)})}function zy(n,t){return t===void 0&&(t=!1),K(function(){var e=n.shape.slice(1),r=e[0],a=e[1];if(r===a)return n;var o=Math.abs(r-a),i=Math.round(o*(t?.5:1)),s=r>a?2:1,u=function(d){var p=n.shape.slice();return p[s]=d,rn(p,0)},c=u(i),l=o-c.shape[s],h=t&&l?u(l):null,f=[h,n,c].filter(function(d){return!!d}).map(function(d){return d.toFloat()});return He(f,s)})}function Wo(n){return 1/(1+Math.exp(-n))}var Yi=(function(n){le(t,n);function t(e,r,a,o,i){return i===void 0&&(i=!1),n.call(this,{x:e,y:r,width:a,height:o},i)||this}return t})(Mn),Vy=.5,Gy=.43,Hy=.45,ja=(function(){function n(t,e,r){r===void 0&&(r=new Ie(0,0));var a=e.width,o=e.height;this._imgDims=new yr(a,o),this._shift=r,this._positions=t.map(function(i){return i.mul(new Ie(a,o)).add(r)})}return Object.defineProperty(n.prototype,"shift",{get:function(){return new Ie(this._shift.x,this._shift.y)},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"imageWidth",{get:function(){return this._imgDims.width},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"imageHeight",{get:function(){return this._imgDims.height},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"positions",{get:function(){return this._positions},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"relativePositions",{get:function(){var t=this;return this._positions.map(function(e){return e.sub(t._shift).div(new Ie(t.imageWidth,t.imageHeight))})},enumerable:!0,configurable:!0}),n.prototype.forSize=function(t,e){return new this.constructor(this.relativePositions,{width:t,height:e})},n.prototype.shiftBy=function(t,e){return new this.constructor(this.relativePositions,this._imgDims,new Ie(t,e))},n.prototype.shiftByPoint=function(t){return this.shiftBy(t.x,t.y)},n.prototype.align=function(t,e){if(e===void 0&&(e={}),t){var r=t instanceof cn?t.box.floor():new Mn(t);return this.shiftBy(r.x,r.y).align(null,e)}var a=Object.assign({},{useDlibAlignment:!1,minBoxPadding:.2},e),o=a.useDlibAlignment,i=a.minBoxPadding;return o?this.alignDlib():this.alignMinBbox(i)},n.prototype.alignDlib=function(){var t=this.getRefPointsForAlignment(),e=t[0],r=t[1],a=t[2],o=function(h){return a.sub(h).magnitude()},i=(o(e)+o(r))/2,s=Math.floor(i/Hy),u=Ki(t),c=Math.floor(Math.max(0,u.x-Vy*s)),l=Math.floor(Math.max(0,u.y-Gy*s));return new Yi(c,l,Math.min(s,this.imageWidth+c),Math.min(s,this.imageHeight+l))},n.prototype.alignMinBbox=function(t){var e=Wy(this.positions);return e.pad(e.width*t,e.height*t)},n.prototype.getRefPointsForAlignment=function(){throw new Error("getRefPointsForAlignment not implemented by base class")},n})(),jy=(function(n){le(t,n);function t(){return n!==null&&n.apply(this,arguments)||this}return t.prototype.getRefPointsForAlignment=function(){var e=this.positions;return[e[0],e[1],Ki([e[3],e[4]])]},t})(ja),qy=(function(n){le(t,n);function t(){return n!==null&&n.apply(this,arguments)||this}return t.prototype.getJawOutline=function(){return this.positions.slice(0,17)},t.prototype.getLeftEyeBrow=function(){return this.positions.slice(17,22)},t.prototype.getRightEyeBrow=function(){return this.positions.slice(22,27)},t.prototype.getNose=function(){return this.positions.slice(27,36)},t.prototype.getLeftEye=function(){return this.positions.slice(36,42)},t.prototype.getRightEye=function(){return this.positions.slice(42,48)},t.prototype.getMouth=function(){return this.positions.slice(48,68)},t.prototype.getRefPointsForAlignment=function(){return[this.getLeftEye(),this.getRightEye(),this.getMouth()].map(Ki)},t})(ja),Cu=(function(){function n(t,e){this._label=t,this._distance=e}return Object.defineProperty(n.prototype,"label",{get:function(){return this._label},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"distance",{get:function(){return this._distance},enumerable:!0,configurable:!0}),n.prototype.toString=function(t){return t===void 0&&(t=!0),""+this.label+(t?" ("+Oy(this.distance)+")":"")},n})(),Eu=(function(n){le(t,n);function t(e,r){var a=n.call(this,e)||this;return a._label=r,a}return t.assertIsValidLabeledBox=function(e,r){if(Mn.assertIsValidBox(e,r),!qn(e.label))throw new Error(r+" - expected property label ("+e.label+") to be a number")},Object.defineProperty(t.prototype,"label",{get:function(){return this._label},enumerable:!0,configurable:!0}),t})(Mn),va=(function(){function n(t,e){if(typeof t!="string")throw new Error("LabeledFaceDescriptors - constructor expected label to be a string");if(!Array.isArray(e)||e.some(function(r){return!(r instanceof Float32Array)}))throw new Error("LabeledFaceDescriptors - constructor expected descriptors to be an array of Float32Array");this._label=t,this._descriptors=e}return Object.defineProperty(n.prototype,"label",{get:function(){return this._label},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"descriptors",{get:function(){return this._descriptors},enumerable:!0,configurable:!0}),n.prototype.toJSON=function(){return{label:this.label,descriptors:this.descriptors.map(function(t){return Array.from(t)})}},n.fromJSON=function(t){var e=t.descriptors.map(function(r){return new Float32Array(r)});return new n(t.label,e)},n})();(function(n){le(t,n);function t(e,r,a,o){var i=n.call(this,e,r)||this;return i._score=a,i._classScore=o,i}return t.assertIsValidPredictedBox=function(e,r){if(Eu.assertIsValidLabeledBox(e,r),!wu(e.score)||!wu(e.classScore))throw new Error(r+" - expected properties score ("+e.score+") and ("+e.classScore+") to be a number between [0, 1]")},Object.defineProperty(t.prototype,"score",{get:function(){return this._score},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"classScore",{get:function(){return this._classScore},enumerable:!0,configurable:!0}),t})(Eu);function Xy(n){return n.detection instanceof cn}function $i(n,t){var e={detection:t};return Object.assign({},n,e)}function Sl(){var n=window.fetch||function(){throw new Error("fetch - missing fetch implementation for browser environment")},t=function(){throw new Error("readFile - filesystem not available for browser environment")};return{Canvas:HTMLCanvasElement,CanvasRenderingContext2D,Image:HTMLImageElement,ImageData,Video:HTMLVideoElement,createCanvasElement:function(){return document.createElement("canvas")},createImageElement:function(){return document.createElement("img")},fetch:n,readFile:t}}function Rl(n){var t="";if(!n)try{n=require("fs")}catch(r){t=r.toString()}var e=n?function(r){return new Promise(function(a,o){n.readFile(r,function(i,s){return i?o(i):a(s)})})}:function(){throw new Error("readFile - failed to require fs in nodejs environment with error: "+t)};return{readFile:e}}function Il(){var n=global.Canvas||global.HTMLCanvasElement,t=global.Image||global.HTMLImageElement,e=function(){if(n)return new n;throw new Error("createCanvasElement - missing Canvas implementation for nodejs environment")},r=function(){if(t)return new t;throw new Error("createImageElement - missing Image implementation for nodejs environment")},a=global.fetch||function(){throw new Error("fetch - missing fetch implementation for nodejs environment")},o=Rl();return it({Canvas:n||(function(){function i(){}return i})(),CanvasRenderingContext2D:global.CanvasRenderingContext2D||(function(){function i(){}return i})(),Image:t||(function(){function i(){}return i})(),ImageData:global.ImageData||(function(){function i(){}return i})(),Video:global.HTMLVideoElement||(function(){function i(){}return i})(),createCanvasElement:e,createImageElement:r,fetch:a},o)}function kl(){return typeof window=="object"&&typeof document<"u"&&typeof HTMLImageElement<"u"&&typeof HTMLCanvasElement<"u"&&typeof HTMLVideoElement<"u"&&typeof ImageData<"u"&&typeof CanvasRenderingContext2D<"u"}function Tl(){return typeof global=="object"&&typeof require=="function"&&typeof module<"u"&&typeof process<"u"&&!!process.version}var Ge;function Ky(){if(!Ge)throw new Error("getEnv - environment is not defined, check isNodejs() and isBrowser()");return Ge}function fi(n){Ge=n}function Ji(){kl()&&fi(Sl()),Tl()&&fi(Il())}function Yy(n){if(Ge||Ji(),!Ge)throw new Error("monkeyPatch - environment is not defined, check isNodejs() and isBrowser()");var t=n.Canvas,e=t===void 0?Ge.Canvas:t,r=n.Image,a=r===void 0?Ge.Image:r;Ge.Canvas=e,Ge.Image=a,Ge.createCanvasElement=n.createCanvasElement||(function(){return new e}),Ge.createImageElement=n.createImageElement||(function(){return new a}),Ge.ImageData=n.ImageData||Ge.ImageData,Ge.Video=n.Video||Ge.Video,Ge.fetch=n.fetch||Ge.fetch,Ge.readFile=n.readFile||Ge.readFile}var lt={getEnv:Ky,setEnv:fi,initialize:Ji,createBrowserEnv:Sl,createFileSystem:Rl,createNodejsEnv:Il,monkeyPatch:Yy,isBrowser:kl,isNodejs:Tl};Ji();function Al(n){return!lt.isNodejs()&&typeof n=="string"?document.getElementById(n):n}function Yn(n){var t=lt.getEnv(),e=t.Canvas,r=t.CanvasRenderingContext2D;if(n instanceof r)return n;var a=Al(n);if(!(a instanceof e))throw new Error("resolveContext2d - expected canvas to be of instance of Canvas");var o=a.getContext("2d");if(!o)throw new Error("resolveContext2d - canvas 2d context is null");return o}var _u;(function(n){n.TOP_LEFT="TOP_LEFT",n.TOP_RIGHT="TOP_RIGHT",n.BOTTOM_LEFT="BOTTOM_LEFT",n.BOTTOM_RIGHT="BOTTOM_RIGHT"})(_u||(_u={}));function Dl(n){var t=lt.getEnv(),e=t.Image,r=t.Video;return n instanceof e&&n.complete||n instanceof r&&n.readyState>=3}function $y(n){return new Promise(function(t,e){if(n instanceof lt.getEnv().Canvas||Dl(n))return t();function r(o){o.currentTarget&&(o.currentTarget.removeEventListener("load",r),o.currentTarget.removeEventListener("error",a),t(o))}function a(o){o.currentTarget&&(o.currentTarget.removeEventListener("load",r),o.currentTarget.removeEventListener("error",a),e(o))}n.addEventListener("load",r),n.addEventListener("error",a)})}function Ml(n){var t=lt.getEnv(),e=t.Image,r=t.Video;return n instanceof e?new yr(n.naturalWidth,n.naturalHeight):n instanceof r?new yr(n.videoWidth,n.videoHeight):new yr(n.width,n.height)}function uo(n){var t=n.width,e=n.height,r=lt.getEnv().createCanvasElement,a=r();return a.width=t,a.height=e,a}function Qi(n,t){var e=lt.getEnv().ImageData;if(!(n instanceof e)&&!Dl(n))throw new Error("createCanvasFromMedia - media has not finished loading yet");var r=Ml(n),a=r.width,o=r.height,i=uo({width:a,height:o});return n instanceof e?Yn(i).putImageData(n,0,0):Yn(i).drawImage(n,0,0,a,o),i}function Jy(n,t){return te(this,void 0,void 0,function(){var e,r,a,o,i,s;return ne(this,function(u){switch(u.label){case 0:return e=lt.getEnv().createCanvasElement(),r=n.shape.slice(An(n)?1:0),a=r[0],o=r[1],i=r[2],s=K(function(){return n.as3D(a,o,i).toInt()}),[4,Xi.toPixels(s,e)];case 1:return u.sent(),s.dispose(),[2,e]}})})}function Su(n){var t=lt.getEnv(),e=t.Image,r=t.Canvas,a=t.Video;return n instanceof e||n instanceof r||n instanceof a}function Qy(n,t,e){e===void 0&&(e=!1);var r=lt.getEnv(),a=r.Image,o=r.Canvas;if(!(n instanceof a||n instanceof o))throw new Error("imageToSquare - expected arg0 to be HTMLImageElement | HTMLCanvasElement");var i=Ml(n),s=t/Math.max(i.height,i.width),u=s*i.width,c=s*i.height,l=uo({width:t,height:t}),h=n instanceof o?n:Qi(n),f=Math.abs(u-c)/2,d=e&&u<c?f:0,p=e&&c<u?f:0;return Yn(l).drawImage(h,d,p,u,c),l}var qa=(function(){function n(t,e){var r=this;if(e===void 0&&(e=!1),this._imageTensors=[],this._canvases=[],this._treatAsBatchInput=!1,this._inputDimensions=[],!Array.isArray(t))throw new Error("NetInput.constructor - expected inputs to be an Array of TResolvedNetInput or to be instanceof tf.Tensor4D, instead have "+t);this._treatAsBatchInput=e,this._batchSize=t.length,t.forEach(function(a,o){if(io(a)){r._imageTensors[o]=a,r._inputDimensions[o]=a.shape;return}if(An(a)){var i=a.shape[0];if(i!==1)throw new Error("NetInput - tf.Tensor4D with batchSize "+i+" passed, but not supported in input array");r._imageTensors[o]=a,r._inputDimensions[o]=a.shape.slice(1);return}var s=a instanceof lt.getEnv().Canvas?a:Qi(a);r._canvases[o]=s,r._inputDimensions[o]=[s.height,s.width,3]})}return Object.defineProperty(n.prototype,"imageTensors",{get:function(){return this._imageTensors},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"canvases",{get:function(){return this._canvases},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"isBatchInput",{get:function(){return this.batchSize>1||this._treatAsBatchInput},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"batchSize",{get:function(){return this._batchSize},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"inputDimensions",{get:function(){return this._inputDimensions},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"inputSize",{get:function(){return this._inputSize},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"reshapedInputDimensions",{get:function(){var t=this;return zr(this.batchSize,0,1).map(function(e,r){return t.getReshapedInputDimensions(r)})},enumerable:!0,configurable:!0}),n.prototype.getInput=function(t){return this.canvases[t]||this.imageTensors[t]},n.prototype.getInputDimensions=function(t){return this._inputDimensions[t]},n.prototype.getInputHeight=function(t){return this._inputDimensions[t][0]},n.prototype.getInputWidth=function(t){return this._inputDimensions[t][1]},n.prototype.getReshapedInputDimensions=function(t){if(typeof this.inputSize!="number")throw new Error("getReshapedInputDimensions - inputSize not set, toBatchTensor has not been called yet");var e=this.getInputWidth(t),r=this.getInputHeight(t);return Ly({width:e,height:r},this.inputSize)},n.prototype.toBatchTensor=function(t,e){var r=this;return e===void 0&&(e=!0),this._inputSize=t,K(function(){var a=zr(r.batchSize,0,1).map(function(i){var s=r.getInput(i);if(s instanceof Be){var u=An(s)?s:s.expandDims();return u=zy(u,e),(u.shape[1]!==t||u.shape[2]!==t)&&(u=zi.resizeBilinear(u,[t,t])),u.as3D(t,t,3)}if(s instanceof lt.getEnv().Canvas)return Xi.fromPixels(Qy(s,t,e));throw new Error("toBatchTensor - at batchIdx "+i+", expected input to be instanceof tf.Tensor or instanceof HTMLCanvasElement, instead have "+s)}),o=kt(a.map(function(i){return i.toFloat()})).as4D(r.batchSize,t,t,3);return o})},n})();function Ze(n){return te(this,void 0,void 0,function(){var t,e,r;return ne(this,function(a){switch(a.label){case 0:if(n instanceof qa)return[2,n];if(t=Array.isArray(n)?n:[n],!t.length)throw new Error("toNetInput - empty array passed as input");return e=function(o){return Array.isArray(n)?" at input index "+o+":":""},r=t.map(Al),r.forEach(function(o,i){if(!Su(o)&&!io(o)&&!An(o))throw typeof t[i]=="string"?new Error("toNetInput -"+e(i)+" string passed, but could not resolve HTMLElement for element id "+t[i]):new Error("toNetInput -"+e(i)+" expected media to be of type HTMLImageElement | HTMLVideoElement | HTMLCanvasElement | tf.Tensor3D, or to be an element id");if(An(o)){var s=o.shape[0];if(s!==1)throw new Error("toNetInput -"+e(i)+" tf.Tensor4D with batchSize "+s+" passed, but not supported in input array")}}),[4,Promise.all(r.map(function(o){return Su(o)&&$y(o)}))];case 1:return a.sent(),[2,new qa(r,Array.isArray(n))]}})})}function Zi(n,t){return te(this,void 0,void 0,function(){var e,r,a,o,i,s,u;return ne(this,function(c){switch(c.label){case 0:return e=lt.getEnv().Canvas,r=n,n instanceof e?[3,5]:[4,Ze(n)];case 1:if(a=c.sent(),a.batchSize>1)throw new Error("extractFaces - batchSize > 1 not supported");return o=a.getInput(0),o instanceof e?(i=o,[3,4]):[3,2];case 2:return[4,Jy(o)];case 3:i=c.sent(),c.label=4;case 4:r=i,c.label=5;case 5:return s=Yn(r),u=t.map(function(l){return l instanceof cn?l.forSize(r.width,r.height).box.floor():l}).map(function(l){return l.clipAtImageBorders(r.width,r.height)}),[2,u.map(function(l){var h=l.x,f=l.y,d=l.width,p=l.height,v=uo({width:d,height:p});return Yn(v).putImageData(s.getImageData(h,f,d,p),0,0),v})]}})})}function es(n,t){return te(this,void 0,void 0,function(){return ne(this,function(e){if(!io(n)&&!An(n))throw new Error("extractFaceTensors - expected image tensor to be 3D or 4D");if(An(n)&&n.shape[0]>1)throw new Error("extractFaceTensors - batchSize > 1 not supported");return[2,K(function(){var r=n.shape.slice(An(n)?1:0),a=r[0],o=r[1],i=r[2],s=t.map(function(c){return c instanceof cn?c.forSize(o,a).box:c}).map(function(c){return c.clipAtImageBorders(o,a)}),u=s.map(function(c){var l=c.x,h=c.y,f=c.width,d=c.height;return ol(n.as3D(a,o,i),[h,l,0],[d,f,i])});return u})]})})}function Zy(n,t){return te(this,void 0,void 0,function(){var e,r;return ne(this,function(a){switch(a.label){case 0:return e=lt.getEnv().fetch,[4,e(n,t)];case 1:if(r=a.sent(),!(r.status<400))throw new Error("failed to fetch: ("+r.status+") "+r.statusText+", from url: "+r.url);return[2,r]}})})}function ex(n){return te(this,void 0,void 0,function(){return ne(this,function(t){switch(t.label){case 0:return[4,Zy(n)];case 1:return[2,t.sent().json()]}})})}function Nl(n,t){var e=t+"-weights_manifest.json";if(!n)return{modelBaseUri:"",manifestUri:e};if(n==="/")return{modelBaseUri:"/",manifestUri:"/"+e};var r=n.startsWith("http://")?"http://":n.startsWith("https://")?"https://":"";n=n.replace(r,"");var a=n.split("/").filter(function(s){return s}),o=n.endsWith(".json")?a[a.length-1]:e,i=r+(n.endsWith(".json")?a.slice(0,a.length-1):a).join("/");return i=n.startsWith("/")?"/"+i:i,{modelBaseUri:i,manifestUri:i==="/"?"/"+o:i+"/"+o}}function tx(n,t){return te(this,void 0,void 0,function(){var e,r,a,o;return ne(this,function(i){switch(i.label){case 0:return e=Nl(n,t),r=e.manifestUri,a=e.modelBaseUri,[4,ex(r)];case 1:return o=i.sent(),[2,Cl.loadWeights(o,a)]}})})}var yn=(function(){function n(t){this._name=t,this._params=void 0,this._paramMappings=[]}return Object.defineProperty(n.prototype,"params",{get:function(){return this._params},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"paramMappings",{get:function(){return this._paramMappings},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"isLoaded",{get:function(){return!!this.params},enumerable:!0,configurable:!0}),n.prototype.getParamFromPath=function(t){var e=this.traversePropertyPath(t),r=e.obj,a=e.objProp;return r[a]},n.prototype.reassignParamFromPath=function(t,e){var r=this.traversePropertyPath(t),a=r.obj,o=r.objProp;a[o].dispose(),a[o]=e},n.prototype.getParamList=function(){var t=this;return this._paramMappings.map(function(e){var r=e.paramPath;return{path:r,tensor:t.getParamFromPath(r)}})},n.prototype.getTrainableParams=function(){return this.getParamList().filter(function(t){return t.tensor instanceof wr})},n.prototype.getFrozenParams=function(){return this.getParamList().filter(function(t){return!(t.tensor instanceof wr)})},n.prototype.variable=function(){var t=this;this.getFrozenParams().forEach(function(e){var r=e.path,a=e.tensor;t.reassignParamFromPath(r,a.variable())})},n.prototype.freeze=function(){var t=this;this.getTrainableParams().forEach(function(e){var r=e.path,a=e.tensor,o=rt(a.dataSync());a.dispose(),t.reassignParamFromPath(r,o)})},n.prototype.dispose=function(t){t===void 0&&(t=!0),this.getParamList().forEach(function(e){if(t&&e.tensor.isDisposed)throw new Error("param tensor has already been disposed for path "+e.path);e.tensor.dispose()}),this._params=void 0},n.prototype.serializeParams=function(){return new Float32Array(this.getParamList().map(function(t){var e=t.tensor;return Array.from(e.dataSync())}).reduce(function(t,e){return t.concat(e)}))},n.prototype.load=function(t){return te(this,void 0,void 0,function(){return ne(this,function(e){switch(e.label){case 0:return t instanceof Float32Array?(this.extractWeights(t),[2]):[4,this.loadFromUri(t)];case 1:return e.sent(),[2]}})})},n.prototype.loadFromUri=function(t){return te(this,void 0,void 0,function(){var e;return ne(this,function(r){switch(r.label){case 0:if(t&&typeof t!="string")throw new Error(this._name+".loadFromUri - expected model uri");return[4,tx(t,this.getDefaultModelName())];case 1:return e=r.sent(),this.loadFromWeightMap(e),[2]}})})},n.prototype.loadFromDisk=function(t){return te(this,void 0,void 0,function(){var e,r,a,o,i,s,u,c,l,h;return ne(this,function(f){switch(f.label){case 0:if(t&&typeof t!="string")throw new Error(this._name+".loadFromDisk - expected model file path");return e=lt.getEnv().readFile,r=Nl(t,this.getDefaultModelName()),a=r.manifestUri,o=r.modelBaseUri,i=function(d){return Promise.all(d.map(function(p){return e(p).then(function(v){return v.buffer})}))},s=Cl.weightsLoaderFactory(i),l=(c=JSON).parse,[4,e(a)];case 1:return u=l.apply(c,[f.sent().toString()]),[4,s(u,o)];case 2:return h=f.sent(),this.loadFromWeightMap(h),[2]}})})},n.prototype.loadFromWeightMap=function(t){var e=this.extractParamsFromWeigthMap(t),r=e.paramMappings,a=e.params;this._paramMappings=r,this._params=a},n.prototype.extractWeights=function(t){var e=this.extractParams(t),r=e.paramMappings,a=e.params;this._paramMappings=r,this._params=a},n.prototype.traversePropertyPath=function(t){if(!this.params)throw new Error("traversePropertyPath - model has no loaded params");var e=t.split("/").reduce(function(o,i){if(!o.nextObj.hasOwnProperty(i))throw new Error("traversePropertyPath - object does not have property "+i+", for path "+t);return{obj:o.nextObj,objProp:i,nextObj:o.nextObj[i]}},{nextObj:this.params}),r=e.obj,a=e.objProp;if(!r||!a||!(r[a]instanceof Be))throw new Error("traversePropertyPath - parameter is not a tensor, for path "+t);return{obj:r,objProp:a}},n})();function It(n,t,e){return K(function(){var r=Bi(n,t.depthwise_filter,t.pointwise_filter,e,"same");return r=xe(r,t.bias),r})}function zo(n,t,e){return e===void 0&&(e=!1),K(function(){var r=Oe(e?xe(Ot(n,t.conv0.filters,[2,2],"same"),t.conv0.bias):It(n,t.conv0,[2,2])),a=It(r,t.conv1,[1,1]),o=Oe(xe(r,a)),i=It(o,t.conv2,[1,1]);return Oe(xe(r,xe(a,i)))})}function ma(n,t,e,r){return e===void 0&&(e=!1),r===void 0&&(r=!0),K(function(){var a=Oe(e?xe(Ot(n,t.conv0.filters,r?[2,2]:[1,1],"same"),t.conv0.bias):It(n,t.conv0,r?[2,2]:[1,1])),o=It(a,t.conv1,[1,1]),i=Oe(xe(a,o)),s=It(i,t.conv2,[1,1]),u=Oe(xe(a,xe(o,s))),c=It(u,t.conv3,[1,1]);return Oe(xe(a,xe(o,xe(s,c))))})}function Vt(n,t,e,r){return e===void 0&&(e="same"),r===void 0&&(r=!1),K(function(){var a=xe(Ot(n,t.filters,[1,1],e),t.bias);return r?Oe(a):a})}function xn(n,t){Object.keys(n).forEach(function(e){t.some(function(r){return r.originalPath===e})||n[e].dispose()})}function co(n,t){return function(e,r,a,o){var i=mt(n(e*r*a*a),[a,a,e,r]),s=Ve(n(r));return t.push({paramPath:o+"/filters"},{paramPath:o+"/bias"}),{filters:i,bias:s}}}function ts(n,t){return function(e,r,a){var o=kn(n(e*r),[e,r]),i=Ve(n(r));return t.push({paramPath:a+"/weights"},{paramPath:a+"/bias"}),{weights:o,bias:i}}}var Fl=(function(){function n(t,e,r){this.depthwise_filter=t,this.pointwise_filter=e,this.bias=r}return n})();function ns(n,t){return function(e,r,a){var o=mt(n(9*e),[3,3,e,1]),i=mt(n(e*r),[1,1,e,r]),s=Ve(n(r));return t.push({paramPath:a+"/depthwise_filter"},{paramPath:a+"/pointwise_filter"},{paramPath:a+"/bias"}),new Fl(o,i,s)}}function rs(n){return function(t){var e=n(t+"/depthwise_filter",4),r=n(t+"/pointwise_filter",4),a=n(t+"/bias",1);return new Fl(e,r,a)}}function Bn(n,t){return function(e,r,a){var o=n[e];if(!oo(o,r))throw new Error("expected weightMap["+e+"] to be a Tensor"+r+"D, instead have "+o);return t.push({originalPath:e,paramPath:a||e}),o}}function bn(n){var t=n;function e(a){var o=t.slice(0,a);return t=t.slice(a),o}function r(){return t}return{extractWeights:e,getRemainingWeights:r}}function Pl(n,t){var e=co(n,t),r=ns(n,t);function a(i,s,u,c){c===void 0&&(c=!1);var l=c?e(i,s,3,u+"/conv0"):r(i,s,u+"/conv0"),h=r(s,s,u+"/conv1"),f=r(s,s,u+"/conv2");return{conv0:l,conv1:h,conv2:f}}function o(i,s,u,c){c===void 0&&(c=!1);var l=a(i,s,u,c),h=l.conv0,f=l.conv1,d=l.conv2,p=r(s,s,u+"/conv3");return{conv0:h,conv1:f,conv2:d,conv3:p}}return{extractDenseBlock3Params:a,extractDenseBlock4Params:o}}function nx(n){var t=[],e=bn(n),r=e.extractWeights,a=e.getRemainingWeights,o=Pl(r,t).extractDenseBlock4Params,i=o(3,32,"dense0",!0),s=o(32,64,"dense1"),u=o(64,128,"dense2"),c=o(128,256,"dense3");if(a().length!==0)throw new Error("weights remaing after extract: "+a().length);return{paramMappings:t,params:{dense0:i,dense1:s,dense2:u,dense3:c}}}function Bl(n){return function(t){var e=n(t+"/filters",4),r=n(t+"/bias",1);return{filters:e,bias:r}}}function Ol(n,t){var e=Bn(n,t),r=Bl(e),a=rs(e);function o(s,u){u===void 0&&(u=!1);var c=u?r(s+"/conv0"):a(s+"/conv0"),l=a(s+"/conv1"),h=a(s+"/conv2");return{conv0:c,conv1:l,conv2:h}}function i(s,u){u===void 0&&(u=!1);var c=u?r(s+"/conv0"):a(s+"/conv0"),l=a(s+"/conv1"),h=a(s+"/conv2"),f=a(s+"/conv3");return{conv0:c,conv1:l,conv2:h,conv3:f}}return{extractDenseBlock3Params:o,extractDenseBlock4Params:i}}function rx(n){var t=[],e=Ol(n,t).extractDenseBlock4Params,r={dense0:e("dense0",!0),dense1:e("dense1"),dense2:e("dense2"),dense3:e("dense3")};return xn(n,t),{params:r,paramMappings:t}}var Ll=(function(n){le(t,n);function t(){return n.call(this,"FaceFeatureExtractor")||this}return t.prototype.forwardInput=function(e){var r=this.params;if(!r)throw new Error("FaceFeatureExtractor - load model before inference");return K(function(){var a=e.toBatchTensor(112,!0),o=[122.782,117.001,104.298],i=Jr(a,o).div(X(255)),s=ma(i,r.dense0,!0);return s=ma(s,r.dense1),s=ma(s,r.dense2),s=ma(s,r.dense3),s=Yr(s,[7,7],[2,2],"valid"),s})},t.prototype.forward=function(e){return te(this,void 0,void 0,function(){var r;return ne(this,function(a){switch(a.label){case 0:return r=this.forwardInput,[4,Ze(e)];case 1:return[2,r.apply(this,[a.sent()])]}})})},t.prototype.getDefaultModelName=function(){return"face_feature_extractor_model"},t.prototype.extractParamsFromWeigthMap=function(e){return rx(e)},t.prototype.extractParams=function(e){return nx(e)},t})(yn);function en(n,t){return K(function(){return xe(no(n,t.weights),t.bias)})}function ax(n,t,e){var r=[],a=bn(n),o=a.extractWeights,i=a.getRemainingWeights,s=ts(o,r),u=s(t,e,"fc");if(i().length!==0)throw new Error("weights remaing after extract: "+i().length);return{paramMappings:r,params:{fc:u}}}function ox(n){var t=[],e=Bn(n,t);function r(o){var i=e(o+"/weights",2),s=e(o+"/bias",1);return{weights:i,bias:s}}var a={fc:r("fc")};return xn(n,t),{params:a,paramMappings:t}}function Ul(n){var t={},e={};return Object.keys(n).forEach(function(r){var a=r.startsWith("fc")?e:t;a[r]=n[r]}),{featureExtractorMap:t,classifierMap:e}}var Wl=(function(n){le(t,n);function t(e,r){var a=n.call(this,e)||this;return a._faceFeatureExtractor=r,a}return Object.defineProperty(t.prototype,"faceFeatureExtractor",{get:function(){return this._faceFeatureExtractor},enumerable:!0,configurable:!0}),t.prototype.runNet=function(e){var r=this,a=this.params;if(!a)throw new Error(this._name+" - load model before inference");return K(function(){var o=e instanceof qa?r.faceFeatureExtractor.forwardInput(e):e;return en(o.as2D(o.shape[0],-1),a.fc)})},t.prototype.dispose=function(e){e===void 0&&(e=!0),this.faceFeatureExtractor.dispose(e),n.prototype.dispose.call(this,e)},t.prototype.loadClassifierParams=function(e){var r=this.extractClassifierParams(e),a=r.params,o=r.paramMappings;this._params=a,this._paramMappings=o},t.prototype.extractClassifierParams=function(e){return ax(e,this.getClassifierChannelsIn(),this.getClassifierChannelsOut())},t.prototype.extractParamsFromWeigthMap=function(e){var r=Ul(e),a=r.featureExtractorMap,o=r.classifierMap;return this.faceFeatureExtractor.loadFromWeightMap(a),ox(o)},t.prototype.extractParams=function(e){var r=this.getClassifierChannelsIn(),a=this.getClassifierChannelsOut(),o=a*r+a,i=e.slice(0,e.length-o),s=e.slice(e.length-o);return this.faceFeatureExtractor.extractWeights(i),this.extractClassifierParams(s)},t})(yn),Ru=["neutral","happy","sad","angry","fearful","disgusted","surprised"],ix=(function(){function n(t){var e=this;if(t.length!==7)throw new Error("FaceExpressions.constructor - expected probabilities.length to be 7, have: "+t.length);Ru.forEach(function(r,a){e[r]=t[a]})}return n.prototype.asSortedArray=function(){var t=this;return Ru.map(function(e){return{expression:e,probability:t[e]}}).sort(function(e,r){return r.probability-e.probability})},n})(),sx=(function(n){le(t,n);function t(e){return e===void 0&&(e=new Ll),n.call(this,"FaceExpressionNet",e)||this}return t.prototype.forwardInput=function(e){var r=this;return K(function(){return mn(r.runNet(e))})},t.prototype.forward=function(e){return te(this,void 0,void 0,function(){var r;return ne(this,function(a){switch(a.label){case 0:return r=this.forwardInput,[4,Ze(e)];case 1:return[2,r.apply(this,[a.sent()])]}})})},t.prototype.predictExpressions=function(e){return te(this,void 0,void 0,function(){var r,a,o,i,s=this;return ne(this,function(u){switch(u.label){case 0:return[4,Ze(e)];case 1:return r=u.sent(),[4,this.forwardInput(r)];case 2:return a=u.sent(),[4,Promise.all(je(a).map(function(c){return te(s,void 0,void 0,function(){var l;return ne(this,function(h){switch(h.label){case 0:return[4,c.data()];case 1:return l=h.sent(),c.dispose(),[2,l]}})})}))];case 3:return o=u.sent(),a.dispose(),i=o.map(function(c){return new ix(c)}),[2,r.isBatchInput?i:i[0]]}})})},t.prototype.getDefaultModelName=function(){return"face_expression_model"},t.prototype.getClassifierChannelsIn=function(){return 256},t.prototype.getClassifierChannelsOut=function(){return 7},t})(Wl);function zl(n,t){var e={expressions:t};return Object.assign({},n,e)}function ux(n){return Xy(n)&&n.landmarks instanceof ja&&n.unshiftedLandmarks instanceof ja&&n.alignedRect instanceof cn}function as(n,t){var e=n.detection.box,r=t.shiftBy(e.x,e.y),a=r.align(),o=n.detection.imageDims,i=new cn(n.detection.score,a.rescale(o.reverse()),o),s={landmarks:r,unshiftedLandmarks:t,alignedRect:i};return Object.assign({},n,s)}function cx(n,t){var e=co(n,t),r=ns(n,t);function a(i,s,u){var c=r(i,s,u+"/separable_conv0"),l=r(s,s,u+"/separable_conv1"),h=e(i,s,1,u+"/expansion_conv");return{separable_conv0:c,separable_conv1:l,expansion_conv:h}}function o(i,s){var u=r(i,i,s+"/separable_conv0"),c=r(i,i,s+"/separable_conv1"),l=r(i,i,s+"/separable_conv2");return{separable_conv0:u,separable_conv1:c,separable_conv2:l}}return{extractConvParams:e,extractSeparableConvParams:r,extractReductionBlockParams:a,extractMainBlockParams:o}}function lx(n,t){var e=[],r=bn(n),a=r.extractWeights,o=r.getRemainingWeights,i=cx(a,e),s=i.extractConvParams,u=i.extractSeparableConvParams,c=i.extractReductionBlockParams,l=i.extractMainBlockParams,h=s(3,32,3,"entry_flow/conv_in"),f=c(32,64,"entry_flow/reduction_block_0"),d=c(64,128,"entry_flow/reduction_block_1"),p={conv_in:h,reduction_block_0:f,reduction_block_1:d},v={};zr(t,0,1).forEach(function(b){v["main_block_"+b]=l(128,"middle_flow/main_block_"+b)});var m=c(128,256,"exit_flow/reduction_block"),g=u(256,512,"exit_flow/separable_conv"),y={reduction_block:m,separable_conv:g};if(o().length!==0)throw new Error("weights remaing after extract: "+o().length);return{paramMappings:e,params:{entry_flow:p,middle_flow:v,exit_flow:y}}}function hx(n,t){var e=Bn(n,t),r=Bl(e),a=rs(e);function o(s){var u=a(s+"/separable_conv0"),c=a(s+"/separable_conv1"),l=r(s+"/expansion_conv");return{separable_conv0:u,separable_conv1:c,expansion_conv:l}}function i(s){var u=a(s+"/separable_conv0"),c=a(s+"/separable_conv1"),l=a(s+"/separable_conv2");return{separable_conv0:u,separable_conv1:c,separable_conv2:l}}return{extractConvParams:r,extractSeparableConvParams:a,extractReductionBlockParams:o,extractMainBlockParams:i}}function fx(n,t){var e=[],r=hx(n,e),a=r.extractConvParams,o=r.extractSeparableConvParams,i=r.extractReductionBlockParams,s=r.extractMainBlockParams,u=a("entry_flow/conv_in"),c=i("entry_flow/reduction_block_0"),l=i("entry_flow/reduction_block_1"),h={conv_in:u,reduction_block_0:c,reduction_block_1:l},f={};zr(t,0,1).forEach(function(m){f["main_block_"+m]=s("middle_flow/main_block_"+m)});var d=i("exit_flow/reduction_block"),p=o("exit_flow/separable_conv"),v={reduction_block:d,separable_conv:p};return xn(n,e),{params:{entry_flow:h,middle_flow:f,exit_flow:v},paramMappings:e}}function Vl(n,t,e){return xe(Ot(n,t.filters,e,"same"),t.bias)}function Vo(n,t,e){e===void 0&&(e=!0);var r=e?Oe(n):n;return r=It(r,t.separable_conv0,[1,1]),r=It(Oe(r),t.separable_conv1,[1,1]),r=Je(r,[3,3],[2,2],"same"),r=xe(r,Vl(n,t.expansion_conv,[2,2])),r}function dx(n,t){var e=It(Oe(n),t.separable_conv0,[1,1]);return e=It(Oe(e),t.separable_conv1,[1,1]),e=It(Oe(e),t.separable_conv2,[1,1]),e=xe(e,n),e}var px=(function(n){le(t,n);function t(e){var r=n.call(this,"TinyXception")||this;return r._numMainBlocks=e,r}return t.prototype.forwardInput=function(e){var r=this,a=this.params;if(!a)throw new Error("TinyXception - load model before inference");return K(function(){var o=e.toBatchTensor(112,!0),i=[122.782,117.001,104.298],s=Jr(o,i).div(X(256)),u=Oe(Vl(s,a.entry_flow.conv_in,[2,2]));return u=Vo(u,a.entry_flow.reduction_block_0,!1),u=Vo(u,a.entry_flow.reduction_block_1),zr(r._numMainBlocks,0,1).forEach(function(c){u=dx(u,a.middle_flow["main_block_"+c])}),u=Vo(u,a.exit_flow.reduction_block),u=Oe(It(u,a.exit_flow.separable_conv,[1,1])),u})},t.prototype.forward=function(e){return te(this,void 0,void 0,function(){var r;return ne(this,function(a){switch(a.label){case 0:return r=this.forwardInput,[4,Ze(e)];case 1:return[2,r.apply(this,[a.sent()])]}})})},t.prototype.getDefaultModelName=function(){return"tiny_xception_model"},t.prototype.extractParamsFromWeigthMap=function(e){return fx(e,this._numMainBlocks)},t.prototype.extractParams=function(e){return lx(e,this._numMainBlocks)},t})(yn);function vx(n){var t=[],e=bn(n),r=e.extractWeights,a=e.getRemainingWeights,o=ts(r,t),i=o(512,1,"fc/age"),s=o(512,2,"fc/gender");if(a().length!==0)throw new Error("weights remaing after extract: "+a().length);return{paramMappings:t,params:{fc:{age:i,gender:s}}}}function mx(n){var t=[],e=Bn(n,t);function r(o){var i=e(o+"/weights",2),s=e(o+"/bias",1);return{weights:i,bias:s}}var a={fc:{age:r("fc/age"),gender:r("fc/gender")}};return xn(n,t),{params:a,paramMappings:t}}var Xa;(function(n){n.FEMALE="female",n.MALE="male"})(Xa||(Xa={}));var gx=(function(n){le(t,n);function t(e){e===void 0&&(e=new px(2));var r=n.call(this,"AgeGenderNet")||this;return r._faceFeatureExtractor=e,r}return Object.defineProperty(t.prototype,"faceFeatureExtractor",{get:function(){return this._faceFeatureExtractor},enumerable:!0,configurable:!0}),t.prototype.runNet=function(e){var r=this,a=this.params;if(!a)throw new Error(this._name+" - load model before inference");return K(function(){var o=e instanceof qa?r.faceFeatureExtractor.forwardInput(e):e,i=Yr(o,[7,7],[2,2],"valid").as2D(o.shape[0],-1),s=en(i,a.fc.age).as1D(),u=en(i,a.fc.gender);return{age:s,gender:u}})},t.prototype.forwardInput=function(e){var r=this;return K(function(){var a=r.runNet(e),o=a.age,i=a.gender;return{age:o,gender:mn(i)}})},t.prototype.forward=function(e){return te(this,void 0,void 0,function(){var r;return ne(this,function(a){switch(a.label){case 0:return r=this.forwardInput,[4,Ze(e)];case 1:return[2,r.apply(this,[a.sent()])]}})})},t.prototype.predictAgeAndGender=function(e){return te(this,void 0,void 0,function(){var r,a,o,i,s,u,c=this;return ne(this,function(l){switch(l.label){case 0:return[4,Ze(e)];case 1:return r=l.sent(),[4,this.forwardInput(r)];case 2:return a=l.sent(),o=je(a.age),i=je(a.gender),s=o.map(function(h,f){return{ageTensor:h,genderTensor:i[f]}}),[4,Promise.all(s.map(function(h){var f=h.ageTensor,d=h.genderTensor;return te(c,void 0,void 0,function(){var p,v,m,g,y;return ne(this,function(b){switch(b.label){case 0:return[4,f.data()];case 1:return p=b.sent()[0],[4,d.data()];case 2:return v=b.sent()[0],m=v>.5,g=m?Xa.MALE:Xa.FEMALE,y=m?v:1-v,f.dispose(),d.dispose(),[2,{age:p,gender:g,genderProbability:y}]}})})}))];case 3:return u=l.sent(),a.age.dispose(),a.gender.dispose(),[2,r.isBatchInput?u:u[0]]}})})},t.prototype.getDefaultModelName=function(){return"age_gender_model"},t.prototype.dispose=function(e){e===void 0&&(e=!0),this.faceFeatureExtractor.dispose(e),n.prototype.dispose.call(this,e)},t.prototype.loadClassifierParams=function(e){var r=this.extractClassifierParams(e),a=r.params,o=r.paramMappings;this._params=a,this._paramMappings=o},t.prototype.extractClassifierParams=function(e){return vx(e)},t.prototype.extractParamsFromWeigthMap=function(e){var r=Ul(e),a=r.featureExtractorMap,o=r.classifierMap;return this.faceFeatureExtractor.loadFromWeightMap(a),mx(o)},t.prototype.extractParams=function(e){var r=1539,a=e.slice(0,e.length-r),o=e.slice(e.length-r);return this.faceFeatureExtractor.extractWeights(a),this.extractClassifierParams(o)},t})(yn),Gl=(function(n){le(t,n);function t(){return n!==null&&n.apply(this,arguments)||this}return t.prototype.postProcess=function(e,r,a){var o=a.map(function(s){var u=s.width,c=s.height,l=r/Math.max(c,u);return{width:u*l,height:c*l}}),i=o.length;return K(function(){var s=function(f,d){return kt([rn([68],f),rn([68],d)],1).as2D(1,136).as1D()},u=function(f,d){var p=o[f],v=p.width,m=p.height;return d(v,m)?Math.abs(v-m)/2:0},c=function(f){return u(f,function(d,p){return d<p})},l=function(f){return u(f,function(d,p){return p<d})},h=e.mul(rn([i,136],r)).sub(kt(Array.from(Array(i),function(f,d){return s(c(d),l(d))}))).div(kt(Array.from(Array(i),function(f,d){return s(o[d].width,o[d].height)})));return h})},t.prototype.forwardInput=function(e){var r=this;return K(function(){var a=r.runNet(e);return r.postProcess(a,e.inputSize,e.inputDimensions.map(function(o){var i=o[0],s=o[1];return{height:i,width:s}}))})},t.prototype.forward=function(e){return te(this,void 0,void 0,function(){var r;return ne(this,function(a){switch(a.label){case 0:return r=this.forwardInput,[4,Ze(e)];case 1:return[2,r.apply(this,[a.sent()])]}})})},t.prototype.detectLandmarks=function(e){return te(this,void 0,void 0,function(){var r,a,o,i=this;return ne(this,function(s){switch(s.label){case 0:return[4,Ze(e)];case 1:return r=s.sent(),a=K(function(){return je(i.forwardInput(r))}),[4,Promise.all(a.map(function(u,c){return te(i,void 0,void 0,function(){var l,h,f,d,p;return ne(this,function(v){switch(v.label){case 0:return f=(h=Array).from,[4,u.data()];case 1:return l=f.apply(h,[v.sent()]),d=l.filter(function(m,g){return xu(g)}),p=l.filter(function(m,g){return!xu(g)}),[2,new qy(Array(68).fill(0).map(function(m,g){return new Ie(d[g],p[g])}),{height:r.getInputHeight(c),width:r.getInputWidth(c)})]}})})}))];case 2:return o=s.sent(),a.forEach(function(u){return u.dispose()}),[2,r.isBatchInput?o:o[0]]}})})},t.prototype.getClassifierChannelsOut=function(){return 136},t})(Wl),Hl=(function(n){le(t,n);function t(e){return e===void 0&&(e=new Ll),n.call(this,"FaceLandmark68Net",e)||this}return t.prototype.getDefaultModelName=function(){return"face_landmark_68_model"},t.prototype.getClassifierChannelsIn=function(){return 256},t})(Gl);function yx(n){var t=[],e=Ol(n,t).extractDenseBlock3Params,r={dense0:e("dense0",!0),dense1:e("dense1"),dense2:e("dense2")};return xn(n,t),{params:r,paramMappings:t}}function xx(n){var t=[],e=bn(n),r=e.extractWeights,a=e.getRemainingWeights,o=Pl(r,t).extractDenseBlock3Params,i=o(3,32,"dense0",!0),s=o(32,64,"dense1"),u=o(64,128,"dense2");if(a().length!==0)throw new Error("weights remaing after extract: "+a().length);return{paramMappings:t,params:{dense0:i,dense1:s,dense2:u}}}var bx=(function(n){le(t,n);function t(){return n.call(this,"TinyFaceFeatureExtractor")||this}return t.prototype.forwardInput=function(e){var r=this.params;if(!r)throw new Error("TinyFaceFeatureExtractor - load model before inference");return K(function(){var a=e.toBatchTensor(112,!0),o=[122.782,117.001,104.298],i=Jr(a,o).div(X(255)),s=zo(i,r.dense0,!0);return s=zo(s,r.dense1),s=zo(s,r.dense2),s=Yr(s,[14,14],[2,2],"valid"),s})},t.prototype.forward=function(e){return te(this,void 0,void 0,function(){var r;return ne(this,function(a){switch(a.label){case 0:return r=this.forwardInput,[4,Ze(e)];case 1:return[2,r.apply(this,[a.sent()])]}})})},t.prototype.getDefaultModelName=function(){return"face_feature_extractor_tiny_model"},t.prototype.extractParamsFromWeigthMap=function(e){return yx(e)},t.prototype.extractParams=function(e){return xx(e)},t})(yn),wx=(function(n){le(t,n);function t(e){return e===void 0&&(e=new bx),n.call(this,"FaceLandmark68TinyNet",e)||this}return t.prototype.getDefaultModelName=function(){return"face_landmark_68_tiny_model"},t.prototype.getClassifierChannelsIn=function(){return 128},t})(Gl);(function(n){le(t,n);function t(){return n!==null&&n.apply(this,arguments)||this}return t})(Hl);function Cx(n,t){return xe(ct(n,t.weights),t.biases)}function os(n,t,e,r,a){a===void 0&&(a="same");var o=t.conv,i=o.filters,s=o.bias,u=Ot(n,i,e,a);return u=xe(u,s),u=Cx(u,t.scale),r?Oe(u):u}function Ex(n,t){return os(n,t,[1,1],!0)}function jl(n,t){return os(n,t,[1,1],!1)}function ql(n,t){return os(n,t,[2,2],!0,"valid")}function _x(n,t){function e(s,u,c){var l=n(s),h=l.length/(u*c*c);if(By(h))throw new Error("depth has to be an integer: "+h+", weights.length: "+l.length+", numFilters: "+u+", filterSize: "+c);return K(function(){return Dn(mt(l,[u,h,c,c]),[2,3,1,0])})}function r(s,u,c,l){var h=e(s,u,c),f=Ve(n(u));return t.push({paramPath:l+"/filters"},{paramPath:l+"/bias"}),{filters:h,bias:f}}function a(s,u){var c=Ve(n(s)),l=Ve(n(s));return t.push({paramPath:u+"/weights"},{paramPath:u+"/biases"}),{weights:c,biases:l}}function o(s,u,c,l){var h=r(s,u,c,l+"/conv"),f=a(u,l+"/scale");return{conv:h,scale:f}}function i(s,u,c,l,h){h===void 0&&(h=!1);var f=o((h?.5:1)*s,u,c,l+"/conv1"),d=o(s,u,c,l+"/conv2");return{conv1:f,conv2:d}}return{extractConvLayerParams:o,extractResidualLayerParams:i}}function Sx(n){var t=bn(n),e=t.extractWeights,r=t.getRemainingWeights,a=[],o=_x(e,a),i=o.extractConvLayerParams,s=o.extractResidualLayerParams,u=i(4704,32,7,"conv32_down"),c=s(9216,32,3,"conv32_1"),l=s(9216,32,3,"conv32_2"),h=s(9216,32,3,"conv32_3"),f=s(36864,64,3,"conv64_down",!0),d=s(36864,64,3,"conv64_1"),p=s(36864,64,3,"conv64_2"),v=s(36864,64,3,"conv64_3"),m=s(147456,128,3,"conv128_down",!0),g=s(147456,128,3,"conv128_1"),y=s(147456,128,3,"conv128_2"),b=s(589824,256,3,"conv256_down",!0),x=s(589824,256,3,"conv256_1"),w=s(589824,256,3,"conv256_2"),C=s(589824,256,3,"conv256_down_out"),k=K(function(){return Dn(kn(e(256*128),[128,256]),[1,0])});if(a.push({paramPath:"fc"}),r().length!==0)throw new Error("weights remaing after extract: "+r().length);var S={conv32_down:u,conv32_1:c,conv32_2:l,conv32_3:h,conv64_down:f,conv64_1:d,conv64_2:p,conv64_3:v,conv128_down:m,conv128_1:g,conv128_2:y,conv256_down:b,conv256_1:x,conv256_2:w,conv256_down_out:C,fc:k};return{params:S,paramMappings:a}}function Rx(n,t){var e=Bn(n,t);function r(i){var s=e(i+"/scale/weights",1),u=e(i+"/scale/biases",1);return{weights:s,biases:u}}function a(i){var s=e(i+"/conv/filters",4),u=e(i+"/conv/bias",1),c=r(i);return{conv:{filters:s,bias:u},scale:c}}function o(i){return{conv1:a(i+"/conv1"),conv2:a(i+"/conv2")}}return{extractConvLayerParams:a,extractResidualLayerParams:o}}function Ix(n){var t=[],e=Rx(n,t),r=e.extractConvLayerParams,a=e.extractResidualLayerParams,o=r("conv32_down"),i=a("conv32_1"),s=a("conv32_2"),u=a("conv32_3"),c=a("conv64_down"),l=a("conv64_1"),h=a("conv64_2"),f=a("conv64_3"),d=a("conv128_down"),p=a("conv128_1"),v=a("conv128_2"),m=a("conv256_down"),g=a("conv256_1"),y=a("conv256_2"),b=a("conv256_down_out"),x=n.fc;if(t.push({originalPath:"fc",paramPath:"fc"}),!Py(x))throw new Error("expected weightMap[fc] to be a Tensor2D, instead have "+x);var w={conv32_down:o,conv32_1:i,conv32_2:s,conv32_3:u,conv64_down:c,conv64_1:l,conv64_2:h,conv64_3:f,conv128_down:d,conv128_1:p,conv128_2:v,conv256_down:m,conv256_1:g,conv256_2:y,conv256_down_out:b,fc:x};return xn(n,t),{params:w,paramMappings:t}}function Kt(n,t){var e=Ex(n,t.conv1);return e=jl(e,t.conv2),e=xe(e,n),e=Oe(e),e}function ga(n,t){var e=ql(n,t.conv1);e=jl(e,t.conv2);var r=Yr(n,2,2,"valid"),a=Ne(r.shape),o=r.shape[3]!==e.shape[3],i=r.shape[1]!==e.shape[1]||r.shape[2]!==e.shape[2];if(i){var s=Pr(e.shape);s[1]=1;var u=Ne(s);e=He([e,u],1);var c=Pr(e.shape);c[2]=1;var l=Ne(c);e=He([e,l],2)}return r=o?He([r,a],3):r,e=xe(r,e),e=Oe(e),e}var kx=(function(n){le(t,n);function t(){return n.call(this,"FaceRecognitionNet")||this}return t.prototype.forwardInput=function(e){var r=this.params;if(!r)throw new Error("FaceRecognitionNet - load model before inference");return K(function(){var a=e.toBatchTensor(150,!0).toFloat(),o=[122.782,117.001,104.298],i=Jr(a,o).div(X(256)),s=ql(i,r.conv32_down);s=Je(s,3,2,"valid"),s=Kt(s,r.conv32_1),s=Kt(s,r.conv32_2),s=Kt(s,r.conv32_3),s=ga(s,r.conv64_down),s=Kt(s,r.conv64_1),s=Kt(s,r.conv64_2),s=Kt(s,r.conv64_3),s=ga(s,r.conv128_down),s=Kt(s,r.conv128_1),s=Kt(s,r.conv128_2),s=ga(s,r.conv256_down),s=Kt(s,r.conv256_1),s=Kt(s,r.conv256_2),s=ga(s,r.conv256_down_out);var u=s.mean([1,2]),c=no(u,r.fc);return c})},t.prototype.forward=function(e){return te(this,void 0,void 0,function(){var r;return ne(this,function(a){switch(a.label){case 0:return r=this.forwardInput,[4,Ze(e)];case 1:return[2,r.apply(this,[a.sent()])]}})})},t.prototype.computeFaceDescriptor=function(e){return te(this,void 0,void 0,function(){var r,a,o,i=this;return ne(this,function(s){switch(s.label){case 0:return[4,Ze(e)];case 1:return r=s.sent(),a=K(function(){return je(i.forwardInput(r))}),[4,Promise.all(a.map(function(u){return u.data()}))];case 2:return o=s.sent(),a.forEach(function(u){return u.dispose()}),[2,r.isBatchInput?o:o[0]]}})})},t.prototype.getDefaultModelName=function(){return"face_recognition_model"},t.prototype.extractParamsFromWeigthMap=function(e){return Ix(e)},t.prototype.extractParams=function(e){return Sx(e)},t})(yn);function Xl(n,t){var e={descriptor:t};return Object.assign({},n,e)}function Kl(n,t){var e={age:t};return Object.assign({},n,e)}function Yl(n,t,e){var r={gender:t,genderProbability:e};return Object.assign({},n,r)}var $l=(function(){function n(t){var e=t===void 0?{}:t,r=e.minFaceSize,a=e.scaleFactor,o=e.maxNumScales,i=e.scoreThresholds,s=e.scaleSteps;if(this._name="MtcnnOptions",this._minFaceSize=r||20,this._scaleFactor=a||.709,this._maxNumScales=o||10,this._scoreThresholds=i||[.6,.7,.7],this._scaleSteps=s,typeof this._minFaceSize!="number"||this._minFaceSize<0)throw new Error(this._name+" - expected minFaceSize to be a number > 0");if(typeof this._scaleFactor!="number"||this._scaleFactor<=0||this._scaleFactor>=1)throw new Error(this._name+" - expected scaleFactor to be a number between 0 and 1");if(typeof this._maxNumScales!="number"||this._maxNumScales<0)throw new Error(this._name+" - expected maxNumScales to be a number > 0");if(!Array.isArray(this._scoreThresholds)||this._scoreThresholds.length!==3||this._scoreThresholds.some(function(u){return typeof u!="number"}))throw new Error(this._name+" - expected scoreThresholds to be an array of numbers of length 3");if(this._scaleSteps&&(!Array.isArray(this._scaleSteps)||this._scaleSteps.some(function(u){return typeof u!="number"})))throw new Error(this._name+" - expected scaleSteps to be an array of numbers")}return Object.defineProperty(n.prototype,"minFaceSize",{get:function(){return this._minFaceSize},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"scaleFactor",{get:function(){return this._scaleFactor},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"maxNumScales",{get:function(){return this._maxNumScales},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"scoreThresholds",{get:function(){return this._scoreThresholds},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"scaleSteps",{get:function(){return this._scaleSteps},enumerable:!0,configurable:!0}),n})();function Tx(n,t){function e(u,c){var l=mt(n(9*u),[3,3,u,1]),h=Ve(n(u)),f=Ve(n(u)),d=Ve(n(u)),p=Ve(n(u));return t.push({paramPath:c+"/filters"},{paramPath:c+"/batch_norm_scale"},{paramPath:c+"/batch_norm_offset"},{paramPath:c+"/batch_norm_mean"},{paramPath:c+"/batch_norm_variance"}),{filters:l,batch_norm_scale:h,batch_norm_offset:f,batch_norm_mean:d,batch_norm_variance:p}}function r(u,c,l,h,f){var d=mt(n(u*c*l*l),[l,l,u,c]),p=Ve(n(c));return t.push({paramPath:h+"/filters"},{paramPath:h+"/"+(f?"batch_norm_offset":"bias")}),{filters:d,bias:p}}function a(u,c,l,h){var f=r(u,c,l,h,!0),d=f.filters,p=f.bias;return{filters:d,batch_norm_offset:p}}function o(u,c,l){var h=e(u,l+"/depthwise_conv"),f=a(u,c,1,l+"/pointwise_conv");return{depthwise_conv:h,pointwise_conv:f}}function i(){var u=a(3,32,3,"mobilenetv1/conv_0"),c=o(32,64,"mobilenetv1/conv_1"),l=o(64,128,"mobilenetv1/conv_2"),h=o(128,128,"mobilenetv1/conv_3"),f=o(128,256,"mobilenetv1/conv_4"),d=o(256,256,"mobilenetv1/conv_5"),p=o(256,512,"mobilenetv1/conv_6"),v=o(512,512,"mobilenetv1/conv_7"),m=o(512,512,"mobilenetv1/conv_8"),g=o(512,512,"mobilenetv1/conv_9"),y=o(512,512,"mobilenetv1/conv_10"),b=o(512,512,"mobilenetv1/conv_11"),x=o(512,1024,"mobilenetv1/conv_12"),w=o(1024,1024,"mobilenetv1/conv_13");return{conv_0:u,conv_1:c,conv_2:l,conv_3:h,conv_4:f,conv_5:d,conv_6:p,conv_7:v,conv_8:m,conv_9:g,conv_10:y,conv_11:b,conv_12:x,conv_13:w}}function s(){var u=a(1024,256,1,"prediction_layer/conv_0"),c=a(256,512,3,"prediction_layer/conv_1"),l=a(512,128,1,"prediction_layer/conv_2"),h=a(128,256,3,"prediction_layer/conv_3"),f=a(256,128,1,"prediction_layer/conv_4"),d=a(128,256,3,"prediction_layer/conv_5"),p=a(256,64,1,"prediction_layer/conv_6"),v=a(64,128,3,"prediction_layer/conv_7"),m=r(512,12,1,"prediction_layer/box_predictor_0/box_encoding_predictor"),g=r(512,9,1,"prediction_layer/box_predictor_0/class_predictor"),y=r(1024,24,1,"prediction_layer/box_predictor_1/box_encoding_predictor"),b=r(1024,18,1,"prediction_layer/box_predictor_1/class_predictor"),x=r(512,24,1,"prediction_layer/box_predictor_2/box_encoding_predictor"),w=r(512,18,1,"prediction_layer/box_predictor_2/class_predictor"),C=r(256,24,1,"prediction_layer/box_predictor_3/box_encoding_predictor"),k=r(256,18,1,"prediction_layer/box_predictor_3/class_predictor"),S=r(256,24,1,"prediction_layer/box_predictor_4/box_encoding_predictor"),_=r(256,18,1,"prediction_layer/box_predictor_4/class_predictor"),R=r(128,24,1,"prediction_layer/box_predictor_5/box_encoding_predictor"),D=r(128,18,1,"prediction_layer/box_predictor_5/class_predictor"),A={box_encoding_predictor:m,class_predictor:g},O={box_encoding_predictor:y,class_predictor:b},P={box_encoding_predictor:x,class_predictor:w},F={box_encoding_predictor:C,class_predictor:k},V={box_encoding_predictor:S,class_predictor:_},z={box_encoding_predictor:R,class_predictor:D};return{conv_0:u,conv_1:c,conv_2:l,conv_3:h,conv_4:f,conv_5:d,conv_6:p,conv_7:v,box_predictor_0:A,box_predictor_1:O,box_predictor_2:P,box_predictor_3:F,box_predictor_4:V,box_predictor_5:z}}return{extractMobilenetV1Params:i,extractPredictionLayerParams:s}}function Ax(n){var t=[],e=bn(n),r=e.extractWeights,a=e.getRemainingWeights,o=Tx(r,t),i=o.extractMobilenetV1Params,s=o.extractPredictionLayerParams,u=i(),c=s(),l=wi(r(5118*4),[1,5118,4]),h={extra_dim:l};if(t.push({paramPath:"output_layer/extra_dim"}),a().length!==0)throw new Error("weights remaing after extract: "+a().length);return{params:{mobilenetv1:u,prediction_layer:c,output_layer:h},paramMappings:t}}function Dx(n,t){var e=Bn(n,t);function r(c,l,h){var f=e(c+"/Conv2d_"+l+"_pointwise/weights",4,h+"/filters"),d=e(c+"/Conv2d_"+l+"_pointwise/convolution_bn_offset",1,h+"/batch_norm_offset");return{filters:f,batch_norm_offset:d}}function a(c){var l="mobilenetv1/conv_"+c,h="MobilenetV1/Conv2d_"+c+"_depthwise",f=l+"/depthwise_conv",d=l+"/pointwise_conv",p=e(h+"/depthwise_weights",4,f+"/filters"),v=e(h+"/BatchNorm/gamma",1,f+"/batch_norm_scale"),m=e(h+"/BatchNorm/beta",1,f+"/batch_norm_offset"),g=e(h+"/BatchNorm/moving_mean",1,f+"/batch_norm_mean"),y=e(h+"/BatchNorm/moving_variance",1,f+"/batch_norm_variance");return{depthwise_conv:{filters:p,batch_norm_scale:v,batch_norm_offset:m,batch_norm_mean:g,batch_norm_variance:y},pointwise_conv:r("MobilenetV1",c,d)}}function o(){return{conv_0:r("MobilenetV1",0,"mobilenetv1/conv_0"),conv_1:a(1),conv_2:a(2),conv_3:a(3),conv_4:a(4),conv_5:a(5),conv_6:a(6),conv_7:a(7),conv_8:a(8),conv_9:a(9),conv_10:a(10),conv_11:a(11),conv_12:a(12),conv_13:a(13)}}function i(c,l){var h=e(c+"/weights",4,l+"/filters"),f=e(c+"/biases",1,l+"/bias");return{filters:h,bias:f}}function s(c){var l=i("Prediction/BoxPredictor_"+c+"/BoxEncodingPredictor","prediction_layer/box_predictor_"+c+"/box_encoding_predictor"),h=i("Prediction/BoxPredictor_"+c+"/ClassPredictor","prediction_layer/box_predictor_"+c+"/class_predictor");return{box_encoding_predictor:l,class_predictor:h}}function u(){return{conv_0:r("Prediction",0,"prediction_layer/conv_0"),conv_1:r("Prediction",1,"prediction_layer/conv_1"),conv_2:r("Prediction",2,"prediction_layer/conv_2"),conv_3:r("Prediction",3,"prediction_layer/conv_3"),conv_4:r("Prediction",4,"prediction_layer/conv_4"),conv_5:r("Prediction",5,"prediction_layer/conv_5"),conv_6:r("Prediction",6,"prediction_layer/conv_6"),conv_7:r("Prediction",7,"prediction_layer/conv_7"),box_predictor_0:s(0),box_predictor_1:s(1),box_predictor_2:s(2),box_predictor_3:s(3),box_predictor_4:s(4),box_predictor_5:s(5)}}return{extractMobilenetV1Params:o,extractPredictionLayerParams:u}}function Mx(n){var t=[],e=Dx(n,t),r=e.extractMobilenetV1Params,a=e.extractPredictionLayerParams,o=n["Output/extra_dim"];if(t.push({originalPath:"Output/extra_dim",paramPath:"output_layer/extra_dim"}),!io(o))throw new Error("expected weightMap['Output/extra_dim'] to be a Tensor3D, instead have "+o);var i={mobilenetv1:r(),prediction_layer:a(),output_layer:{extra_dim:o}};return xn(n,t),{params:i,paramMappings:t}}function Yt(n,t,e){return K(function(){var r=Ot(n,t.filters,e,"same");return r=xe(r,t.batch_norm_offset),Mi(r,0,6)})}var Nx=.0010000000474974513;function Fx(n,t,e){return K(function(){var r=to(n,t.filters,e,"same");return r=Hc(r,t.batch_norm_mean,t.batch_norm_variance,t.batch_norm_offset,t.batch_norm_scale,Nx),Mi(r,0,6)})}function Px(n){return[2,4,6,12].some(function(t){return t===n})?[2,2]:[1,1]}function Bx(n,t){return K(function(){var e=null,r=Yt(n,t.conv_0,[2,2]),a=[t.conv_1,t.conv_2,t.conv_3,t.conv_4,t.conv_5,t.conv_6,t.conv_7,t.conv_8,t.conv_9,t.conv_10,t.conv_11,t.conv_12,t.conv_13];if(a.forEach(function(o,i){var s=i+1,u=Px(s);r=Fx(r,o.depthwise_conv,u),r=Yt(r,o.pointwise_conv,[1,1]),s===11&&(e=r)}),e===null)throw new Error("mobileNetV1 - output of conv layer 11 is null");return{out:r,conv11:e}})}function Ox(n,t,e,r,a){var o=n.shape[0],i=Math.min(e,o),s=t.map(function(l,h){return{score:l,boxIndex:h}}).filter(function(l){return l.score>a}).sort(function(l,h){return h.score-l.score}),u=function(l){return l<=r?1:0},c=[];return s.forEach(function(l){if(!(c.length>=i)){for(var h=l.score,f=c.length-1;f>=0;--f){var d=Lx(n,l.boxIndex,c[f]);if(d!==0&&(l.score*=u(d),l.score<=a))break}h===l.score&&c.push(l.boxIndex)}}),c}function Lx(n,t,e){var r=n.arraySync(),a=Math.min(r[t][0],r[t][2]),o=Math.min(r[t][1],r[t][3]),i=Math.max(r[t][0],r[t][2]),s=Math.max(r[t][1],r[t][3]),u=Math.min(r[e][0],r[e][2]),c=Math.min(r[e][1],r[e][3]),l=Math.max(r[e][0],r[e][2]),h=Math.max(r[e][1],r[e][3]),f=(i-a)*(s-o),d=(l-u)*(h-c);if(f<=0||d<=0)return 0;var p=Math.max(a,u),v=Math.max(o,c),m=Math.min(i,l),g=Math.min(s,h),y=Math.max(m-p,0)*Math.max(g-v,0);return y/(f+d-y)}function Ux(n){var t=je(Dn(n,[1,0])),e=[Xe(t[2],t[0]),Xe(t[3],t[1])],r=[xe(t[0],Wt(e[0],X(2))),xe(t[1],Wt(e[1],X(2)))];return{sizes:e,centers:r}}function Wx(n,t){var e=Ux(n),r=e.sizes,a=e.centers,o=je(Dn(t,[1,0])),i=Wt(ct(oi(Wt(o[2],X(5))),r[0]),X(2)),s=xe(ct(Wt(o[0],X(10)),r[0]),a[0]),u=Wt(ct(oi(Wt(o[3],X(5))),r[1]),X(2)),c=xe(ct(Wt(o[1],X(10)),r[1]),a[1]);return Dn(kt([Xe(s,i),Xe(c,u),xe(s,i),xe(c,u)]),[1,0])}function zx(n,t,e){return K(function(){var r=n.shape[0],a=Wx(zt(dr(e.extra_dim,[r,1,1]),[-1,4]),zt(n,[-1,4]));a=zt(a,[r,a.shape[0]/r,4]);var o=Wc(an(t,[0,0,1],[-1,-1,-1])),i=an(o,[0,0,0],[-1,-1,1]);i=zt(i,[r,i.shape[1]]);var s=je(a),u=je(i);return{boxes:s,scores:u}})}function sr(n,t){return K(function(){var e=n.shape[0],r=zt(Vt(n,t.box_encoding_predictor),[e,-1,1,4]),a=zt(Vt(n,t.class_predictor),[e,-1,3]);return{boxPredictionEncoding:r,classPrediction:a}})}function Vx(n,t,e){return K(function(){var r=Yt(n,e.conv_0,[1,1]),a=Yt(r,e.conv_1,[2,2]),o=Yt(a,e.conv_2,[1,1]),i=Yt(o,e.conv_3,[2,2]),s=Yt(i,e.conv_4,[1,1]),u=Yt(s,e.conv_5,[2,2]),c=Yt(u,e.conv_6,[1,1]),l=Yt(c,e.conv_7,[2,2]),h=sr(t,e.box_predictor_0),f=sr(n,e.box_predictor_1),d=sr(a,e.box_predictor_2),p=sr(i,e.box_predictor_3),v=sr(u,e.box_predictor_4),m=sr(l,e.box_predictor_5),g=He([h.boxPredictionEncoding,f.boxPredictionEncoding,d.boxPredictionEncoding,p.boxPredictionEncoding,v.boxPredictionEncoding,m.boxPredictionEncoding],1),y=He([h.classPrediction,f.classPrediction,d.classPrediction,p.classPrediction,v.classPrediction,m.classPrediction],1);return{boxPredictions:g,classPredictions:y}})}var lo=(function(){function n(t){var e=t===void 0?{}:t,r=e.minConfidence,a=e.maxResults;if(this._name="SsdMobilenetv1Options",this._minConfidence=r||.5,this._maxResults=a||100,typeof this._minConfidence!="number"||this._minConfidence<=0||this._minConfidence>=1)throw new Error(this._name+" - expected minConfidence to be a number between 0 and 1");if(typeof this._maxResults!="number")throw new Error(this._name+" - expected maxResults to be a number")}return Object.defineProperty(n.prototype,"minConfidence",{get:function(){return this._minConfidence},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"maxResults",{get:function(){return this._maxResults},enumerable:!0,configurable:!0}),n})(),Jl=(function(n){le(t,n);function t(){return n.call(this,"SsdMobilenetv1")||this}return t.prototype.forwardInput=function(e){var r=this.params;if(!r)throw new Error("SsdMobilenetv1 - load model before inference");return K(function(){var a=e.toBatchTensor(512,!1).toFloat(),o=Xe(ct(a,X(.007843137718737125)),X(1)),i=Bx(o,r.mobilenetv1),s=Vx(i.out,i.conv11,r.prediction_layer),u=s.boxPredictions,c=s.classPredictions;return zx(u,c,r.output_layer)})},t.prototype.forward=function(e){return te(this,void 0,void 0,function(){var r;return ne(this,function(a){switch(a.label){case 0:return r=this.forwardInput,[4,Ze(e)];case 1:return[2,r.apply(this,[a.sent()])]}})})},t.prototype.locateFaces=function(e,r){return r===void 0&&(r={}),te(this,void 0,void 0,function(){var a,o,i,s,u,c,l,h,f,d,p,v,m,g,y,b,x,w,C,k,S;return ne(this,function(_){switch(_.label){case 0:return a=new lo(r),o=a.maxResults,i=a.minConfidence,[4,Ze(e)];case 1:for(s=_.sent(),u=this.forwardInput(s),c=u.boxes,l=u.scores,h=c[0],f=l[0],d=1;d<c.length;d++)c[d].dispose(),l[d].dispose();return m=(v=Array).from,[4,f.data()];case 2:return p=m.apply(v,[_.sent()]),g=.5,y=Ox(h,p,o,g,i),b=s.getReshapedInputDimensions(0),x=s.inputSize,w=x/b.width,C=x/b.height,k=h.arraySync(),S=y.map(function(R){var D=[Math.max(0,k[R][0]),Math.min(1,k[R][2])].map(function(z){return z*C}),A=D[0],O=D[1],P=[Math.max(0,k[R][1]),Math.min(1,k[R][3])].map(function(z){return z*w}),F=P[0],V=P[1];return new cn(p[R],new Yi(F,A,V-F,O-A),{height:s.getInputHeight(0),width:s.getInputWidth(0)})}),h.dispose(),f.dispose(),[2,S]}})})},t.prototype.getDefaultModelName=function(){return"ssd_mobilenetv1_model"},t.prototype.extractParamsFromWeigthMap=function(e){return Mx(e)},t.prototype.extractParams=function(e){return Ax(e)},t})(yn);(function(n){le(t,n);function t(){return n!==null&&n.apply(this,arguments)||this}return t})(Jl);var Gx=.4,Hx=[new Ie(.738768,.874946),new Ie(2.42204,2.65704),new Ie(4.30971,7.04493),new Ie(10.246,4.59428),new Ie(12.6868,11.8741)],jx=[new Ie(1.603231,2.094468),new Ie(6.041143,7.080126),new Ie(2.882459,3.518061),new Ie(4.266906,5.178857),new Ie(9.041765,10.66308)],qx=[117.001,114.697,97.404],Xx="tiny_yolov2_model",Kx="tiny_yolov2_separable_conv_model",ya=function(n){return typeof n=="number"};function Yx(n){if(!n)throw new Error("invalid config: "+n);if(typeof n.withSeparableConvs!="boolean")throw new Error("config.withSeparableConvs has to be a boolean, have: "+n.withSeparableConvs);if(!ya(n.iouThreshold)||n.iouThreshold<0||n.iouThreshold>1)throw new Error("config.iouThreshold has to be a number between [0, 1], have: "+n.iouThreshold);if(!Array.isArray(n.classes)||!n.classes.length||!n.classes.every(function(t){return typeof t=="string"}))throw new Error("config.classes has to be an array class names: string[], have: "+JSON.stringify(n.classes));if(!Array.isArray(n.anchors)||!n.anchors.length||!n.anchors.map(function(t){return t||{}}).every(function(t){return ya(t.x)&&ya(t.y)}))throw new Error("config.anchors has to be an array of { x: number, y: number }, have: "+JSON.stringify(n.anchors));if(n.meanRgb&&(!Array.isArray(n.meanRgb)||n.meanRgb.length!==3||!n.meanRgb.every(ya)))throw new Error("config.meanRgb has to be an array of shape [number, number, number], have: "+JSON.stringify(n.meanRgb))}function is(n){return K(function(){var t=ct(n,X(.10000000149011612));return xe(Oe(Xe(n,t)),t)})}function En(n,t){return K(function(){var e=Jn(n,[[0,0],[1,1],[1,1],[0,0]]);return e=Ot(e,t.conv.filters,[1,1],"valid"),e=Xe(e,t.bn.sub),e=ct(e,t.bn.truediv),e=xe(e,t.conv.bias),is(e)})}function _n(n,t){return K(function(){var e=Jn(n,[[0,0],[1,1],[1,1],[0,0]]);return e=Bi(e,t.depthwise_filter,t.pointwise_filter,[1,1],"valid"),e=xe(e,t.bias),is(e)})}function $x(n,t){var e=co(n,t);function r(i,s){var u=Ve(n(i)),c=Ve(n(i));return t.push({paramPath:s+"/sub"},{paramPath:s+"/truediv"}),{sub:u,truediv:c}}function a(i,s,u){var c=e(i,s,3,u+"/conv"),l=r(s,u+"/bn");return{conv:c,bn:l}}var o=ns(n,t);return{extractConvParams:e,extractConvWithBatchNormParams:a,extractSeparableConvParams:o}}function Jx(n,t,e,r){var a=bn(n),o=a.extractWeights,i=a.getRemainingWeights,s=[],u=$x(o,s),c=u.extractConvParams,l=u.extractConvWithBatchNormParams,h=u.extractSeparableConvParams,f;if(t.withSeparableConvs){var d=r[0],p=r[1],v=r[2],m=r[3],g=r[4],y=r[5],b=r[6],x=r[7],w=r[8],C=t.isFirstLayerConv2d?c(d,p,3,"conv0"):h(d,p,"conv0"),k=h(p,v,"conv1"),S=h(v,m,"conv2"),_=h(m,g,"conv3"),R=h(g,y,"conv4"),D=h(y,b,"conv5"),A=x?h(b,x,"conv6"):void 0,O=w?h(x,w,"conv7"):void 0,P=c(w||x||b,5*e,1,"conv8");f={conv0:C,conv1:k,conv2:S,conv3:_,conv4:R,conv5:D,conv6:A,conv7:O,conv8:P}}else{var d=r[0],p=r[1],v=r[2],m=r[3],g=r[4],y=r[5],b=r[6],x=r[7],w=r[8],C=l(d,p,"conv0"),k=l(p,v,"conv1"),S=l(v,m,"conv2"),_=l(m,g,"conv3"),R=l(g,y,"conv4"),D=l(y,b,"conv5"),A=l(b,x,"conv6"),O=l(x,w,"conv7"),P=c(w,5*e,1,"conv8");f={conv0:C,conv1:k,conv2:S,conv3:_,conv4:R,conv5:D,conv6:A,conv7:O,conv8:P}}if(i().length!==0)throw new Error("weights remaing after extract: "+i().length);return{params:f,paramMappings:s}}function Qx(n,t){var e=Bn(n,t);function r(s){var u=e(s+"/sub",1),c=e(s+"/truediv",1);return{sub:u,truediv:c}}function a(s){var u=e(s+"/filters",4),c=e(s+"/bias",1);return{filters:u,bias:c}}function o(s){var u=a(s+"/conv"),c=r(s+"/bn");return{conv:u,bn:c}}var i=rs(e);return{extractConvParams:a,extractConvWithBatchNormParams:o,extractSeparableConvParams:i}}function Zx(n,t){var e=[],r=Qx(n,e),a=r.extractConvParams,o=r.extractConvWithBatchNormParams,i=r.extractSeparableConvParams,s;if(t.withSeparableConvs){var u=t.filterSizes&&t.filterSizes.length||9;s={conv0:t.isFirstLayerConv2d?a("conv0"):i("conv0"),conv1:i("conv1"),conv2:i("conv2"),conv3:i("conv3"),conv4:i("conv4"),conv5:i("conv5"),conv6:u>7?i("conv6"):void 0,conv7:u>8?i("conv7"):void 0,conv8:a("conv8")}}else s={conv0:o("conv0"),conv1:o("conv1"),conv2:o("conv2"),conv3:o("conv3"),conv4:o("conv4"),conv5:o("conv5"),conv6:o("conv6"),conv7:o("conv7"),conv8:a("conv8")};return xn(n,e),{params:s,paramMappings:e}}var Iu;(function(n){n[n.XS=224]="XS",n[n.SM=320]="SM",n[n.MD=416]="MD",n[n.LG=608]="LG"})(Iu||(Iu={}));var ss=(function(){function n(t){var e=t===void 0?{}:t,r=e.inputSize,a=e.scoreThreshold;if(this._name="TinyYolov2Options",this._inputSize=r||416,this._scoreThreshold=a||.5,typeof this._inputSize!="number"||this._inputSize%32!==0)throw new Error(this._name+" - expected inputSize to be a number divisible by 32");if(typeof this._scoreThreshold!="number"||this._scoreThreshold<=0||this._scoreThreshold>=1)throw new Error(this._name+" - expected scoreThreshold to be a number between 0 and 1")}return Object.defineProperty(n.prototype,"inputSize",{get:function(){return this._inputSize},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"scoreThreshold",{get:function(){return this._scoreThreshold},enumerable:!0,configurable:!0}),n})(),Ql=(function(n){le(t,n);function t(e){var r=n.call(this,"TinyYolov2")||this;return Yx(e),r._config=e,r}return Object.defineProperty(t.prototype,"config",{get:function(){return this._config},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"withClassScores",{get:function(){return this.config.withClassScores||this.config.classes.length>1},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"boxEncodingSize",{get:function(){return 5+(this.withClassScores?this.config.classes.length:0)},enumerable:!0,configurable:!0}),t.prototype.runTinyYolov2=function(e,r){var a=En(e,r.conv0);return a=Je(a,[2,2],[2,2],"same"),a=En(a,r.conv1),a=Je(a,[2,2],[2,2],"same"),a=En(a,r.conv2),a=Je(a,[2,2],[2,2],"same"),a=En(a,r.conv3),a=Je(a,[2,2],[2,2],"same"),a=En(a,r.conv4),a=Je(a,[2,2],[2,2],"same"),a=En(a,r.conv5),a=Je(a,[2,2],[1,1],"same"),a=En(a,r.conv6),a=En(a,r.conv7),Vt(a,r.conv8,"valid",!1)},t.prototype.runMobilenet=function(e,r){var a=this.config.isFirstLayerConv2d?is(Vt(e,r.conv0,"valid",!1)):_n(e,r.conv0);return a=Je(a,[2,2],[2,2],"same"),a=_n(a,r.conv1),a=Je(a,[2,2],[2,2],"same"),a=_n(a,r.conv2),a=Je(a,[2,2],[2,2],"same"),a=_n(a,r.conv3),a=Je(a,[2,2],[2,2],"same"),a=_n(a,r.conv4),a=Je(a,[2,2],[2,2],"same"),a=_n(a,r.conv5),a=Je(a,[2,2],[1,1],"same"),a=r.conv6?_n(a,r.conv6):a,a=r.conv7?_n(a,r.conv7):a,Vt(a,r.conv8,"valid",!1)},t.prototype.forwardInput=function(e,r){var a=this,o=this.params;if(!o)throw new Error("TinyYolov2 - load model before inference");return K(function(){var i=e.toBatchTensor(r,!1).toFloat();return i=a.config.meanRgb?Jr(i,a.config.meanRgb):i,i=i.div(X(256)),a.config.withSeparableConvs?a.runMobilenet(i,o):a.runTinyYolov2(i,o)})},t.prototype.forward=function(e,r){return te(this,void 0,void 0,function(){var a;return ne(this,function(o){switch(o.label){case 0:return a=this.forwardInput,[4,Ze(e)];case 1:return[4,a.apply(this,[o.sent(),r])];case 2:return[2,o.sent()]}})})},t.prototype.detect=function(e,r){return r===void 0&&(r={}),te(this,void 0,void 0,function(){var a,o,i,s,u,c,l,h,f,d,p,v,m,g,y=this;return ne(this,function(b){switch(b.label){case 0:return a=new ss(r),o=a.inputSize,i=a.scoreThreshold,[4,Ze(e)];case 1:return s=b.sent(),[4,this.forwardInput(s,o)];case 2:return u=b.sent(),c=K(function(){return je(u)[0].expandDims()}),l={width:s.getInputWidth(0),height:s.getInputHeight(0)},[4,this.extractBoxes(c,s.getReshapedInputDimensions(0),i)];case 3:return h=b.sent(),u.dispose(),c.dispose(),f=h.map(function(x){return x.box}),d=h.map(function(x){return x.score}),p=h.map(function(x){return x.classScore}),v=h.map(function(x){return y.config.classes[x.label]}),m=Vr(f.map(function(x){return x.rescale(o)}),d,this.config.iouThreshold,!0),g=m.map(function(x){return new _l(d[x],p[x],v[x],f[x],l)}),[2,g]}})})},t.prototype.getDefaultModelName=function(){return""},t.prototype.extractParamsFromWeigthMap=function(e){return Zx(e,this.config)},t.prototype.extractParams=function(e){var r=this.config.filterSizes||t.DEFAULT_FILTER_SIZES,a=r?r.length:void 0;if(a!==7&&a!==8&&a!==9)throw new Error("TinyYolov2 - expected 7 | 8 | 9 convolutional filters, but found "+a+" filterSizes in config");return Jx(e,this.config,this.boxEncodingSize,r)},t.prototype.extractBoxes=function(e,r,a){return te(this,void 0,void 0,function(){var o,i,s,u,c,l,h,f,d,p,v,m,g,y,b,x,w,C,k,S,_,R,D,A,O,P,F,V,z,U=this;return ne(this,function(L){switch(L.label){case 0:return o=r.width,i=r.height,s=Math.max(o,i),u=s/o,c=s/i,l=e.shape[1],h=this.config.anchors.length,f=K(function(){var G=e.reshape([l,l,h,U.boxEncodingSize]),q=G.slice([0,0,0,0],[l,l,h,4]),Y=G.slice([0,0,0,4],[l,l,h,1]),re=U.withClassScores?mn(G.slice([0,0,0,5],[l,l,h,U.config.classes.length]),3):X(0);return[q,Y,re]}),d=f[0],p=f[1],v=f[2],m=[],[4,p.array()];case 1:return g=L.sent(),[4,d.array()];case 2:y=L.sent(),b=0,L.label=3;case 3:if(!(b<l))return[3,12];x=0,L.label=4;case 4:if(!(x<l))return[3,11];w=0,L.label=5;case 5:return w<h?(C=Wo(g[b][x][w][0]),!a||C>a?(k=(x+Wo(y[b][x][w][0]))/l*u,S=(b+Wo(y[b][x][w][1]))/l*c,_=Math.exp(y[b][x][w][2])*this.config.anchors[w].x/l*u,R=Math.exp(y[b][x][w][3])*this.config.anchors[w].y/l*c,D=k-_/2,A=S-R/2,O={row:b,col:x,anchor:w},this.withClassScores?[4,this.extractPredictedClass(v,O)]:[3,7]):[3,9]):[3,10];case 6:return z=L.sent(),[3,8];case 7:z={classScore:1,label:0},L.label=8;case 8:P=z,F=P.classScore,V=P.label,m.push(it({box:new so(D,A,D+_,A+R),score:C,classScore:C*F,label:V},O)),L.label=9;case 9:return w++,[3,5];case 10:return x++,[3,4];case 11:return b++,[3,3];case 12:return d.dispose(),p.dispose(),v.dispose(),[2,m]}})})},t.prototype.extractPredictedClass=function(e,r){return te(this,void 0,void 0,function(){var a,o,i,s;return ne(this,function(u){switch(u.label){case 0:return a=r.row,o=r.col,i=r.anchor,[4,e.array()];case 1:return s=u.sent(),[2,Array(this.config.classes.length).fill(0).map(function(c,l){return s[a][o][i][l]}).map(function(c,l){return{classScore:c,label:l}}).reduce(function(c,l){return c.classScore>l.classScore?c:l})]}})})},t.DEFAULT_FILTER_SIZES=[3,16,32,64,128,256,512,1024,1024],t})(yn),eb=(function(n){le(t,n);function t(e){e===void 0&&(e=!0);var r=this,a=Object.assign({},{withSeparableConvs:e,iouThreshold:Gx,classes:["face"]},e?{anchors:jx,meanRgb:qx}:{anchors:Hx,withClassScores:!0});return r=n.call(this,a)||this,r}return Object.defineProperty(t.prototype,"withSeparableConvs",{get:function(){return this.config.withSeparableConvs},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"anchors",{get:function(){return this.config.anchors},enumerable:!0,configurable:!0}),t.prototype.locateFaces=function(e,r){return te(this,void 0,void 0,function(){var a;return ne(this,function(o){switch(o.label){case 0:return[4,this.detect(e,r)];case 1:return a=o.sent(),[2,a.map(function(i){return new cn(i.score,i.relativeBox,{width:i.imageWidth,height:i.imageHeight})})]}})})},t.prototype.getDefaultModelName=function(){return this.withSeparableConvs?Kx:Xx},t.prototype.extractParamsFromWeigthMap=function(e){return n.prototype.extractParamsFromWeigthMap.call(this,e)},t})(Ql),Zl=(function(n){le(t,n);function t(){var e=n!==null&&n.apply(this,arguments)||this;return e._name="TinyFaceDetectorOptions",e}return t})(ss),Qr=(function(){function n(){}return n.prototype.then=function(t){return te(this,void 0,void 0,function(){var e;return ne(this,function(r){switch(r.label){case 0:return e=t,[4,this.run()];case 1:return[2,e.apply(void 0,[r.sent()])]}})})},n.prototype.run=function(){return te(this,void 0,void 0,function(){return ne(this,function(t){throw new Error("ComposableTask - run is not implemented")})})},n})();function ho(n,t,e,r,a){return a===void 0&&(a=function(o){var i=o.alignedRect;return i}),te(this,void 0,void 0,function(){var o,i,s,u,c;return ne(this,function(l){switch(l.label){case 0:return o=n.map(function(h){return ux(h)?a(h):h.detection}),s=r,s?[3,5]:t instanceof Be?[4,es(t,o)]:[3,2];case 1:return u=l.sent(),[3,4];case 2:return[4,Zi(t,o)];case 3:u=l.sent(),l.label=4;case 4:s=u,l.label=5;case 5:return i=s,[4,e(i)];case 6:return c=l.sent(),i.forEach(function(h){return h instanceof Be&&h.dispose()}),[2,c]}})})}function us(n,t,e,r,a){return te(this,void 0,void 0,function(){var o=this;return ne(this,function(i){return[2,ho([n],t,function(s){return te(o,void 0,void 0,function(){return ne(this,function(u){return[2,e(s[0])]})})},r,a)]})})}function tb(n){return K(function(){return kt(je(n,3).reverse(),3)})}var xa=2,Ka=12;function nb(n,t){var e=co(n,t),r=ts(n,t);function a(c,l){var h=Ve(n(c));return t.push({paramPath:l}),h}function o(c,l,h){h===void 0&&(h=!1);var f=e(c[0],c[1],3,l+"/conv1"),d=a(c[1],l+"/prelu1_alpha"),p=e(c[1],c[2],3,l+"/conv2"),v=a(c[2],l+"/prelu2_alpha"),m=e(c[2],c[3],h?2:3,l+"/conv3"),g=a(c[3],l+"/prelu3_alpha");return{conv1:f,prelu1_alpha:d,conv2:p,prelu2_alpha:v,conv3:m,prelu3_alpha:g}}function i(){var c=o([3,10,16,32],"pnet"),l=e(32,2,1,"pnet/conv4_1"),h=e(32,4,1,"pnet/conv4_2");return it(it({},c),{conv4_1:l,conv4_2:h})}function s(){var c=o([3,28,48,64],"rnet",!0),l=r(576,128,"rnet/fc1"),h=a(128,"rnet/prelu4_alpha"),f=r(128,2,"rnet/fc2_1"),d=r(128,4,"rnet/fc2_2");return it(it({},c),{fc1:l,prelu4_alpha:h,fc2_1:f,fc2_2:d})}function u(){var c=o([3,32,64,64],"onet"),l=e(64,128,2,"onet/conv4"),h=a(128,"onet/prelu4_alpha"),f=r(1152,256,"onet/fc1"),d=a(256,"onet/prelu5_alpha"),p=r(256,2,"onet/fc2_1"),v=r(256,4,"onet/fc2_2"),m=r(256,10,"onet/fc2_3");return it(it({},c),{conv4:l,prelu4_alpha:h,fc1:f,prelu5_alpha:d,fc2_1:p,fc2_2:v,fc2_3:m})}return{extractPNetParams:i,extractRNetParams:s,extractONetParams:u}}function rb(n){var t=bn(n),e=t.extractWeights,r=t.getRemainingWeights,a=[],o=nb(e,a),i=o.extractPNetParams,s=o.extractRNetParams,u=o.extractONetParams,c=i(),l=s(),h=u();if(r().length!==0)throw new Error("weights remaing after extract: "+r().length);return{params:{pnet:c,rnet:l,onet:h},paramMappings:a}}function ab(n,t){var e=Bn(n,t);function r(l){var h=e(l+"/weights",4,l+"/filters"),f=e(l+"/bias",1);return{filters:h,bias:f}}function a(l){var h=e(l+"/weights",2),f=e(l+"/bias",1);return{weights:h,bias:f}}function o(l){return e(l,1)}function i(l){var h=r(l+"/conv1"),f=o(l+"/prelu1_alpha"),d=r(l+"/conv2"),p=o(l+"/prelu2_alpha"),v=r(l+"/conv3"),m=o(l+"/prelu3_alpha");return{conv1:h,prelu1_alpha:f,conv2:d,prelu2_alpha:p,conv3:v,prelu3_alpha:m}}function s(){var l=i("pnet"),h=r("pnet/conv4_1"),f=r("pnet/conv4_2");return it(it({},l),{conv4_1:h,conv4_2:f})}function u(){var l=i("rnet"),h=a("rnet/fc1"),f=o("rnet/prelu4_alpha"),d=a("rnet/fc2_1"),p=a("rnet/fc2_2");return it(it({},l),{fc1:h,prelu4_alpha:f,fc2_1:d,fc2_2:p})}function c(){var l=i("onet"),h=r("onet/conv4"),f=o("onet/prelu4_alpha"),d=a("onet/fc1"),p=o("onet/prelu5_alpha"),v=a("onet/fc2_1"),m=a("onet/fc2_2"),g=a("onet/fc2_3");return it(it({},l),{conv4:h,prelu4_alpha:f,fc1:d,prelu5_alpha:p,fc2_1:v,fc2_2:m,fc2_3:g})}return{extractPNetParams:s,extractRNetParams:u,extractONetParams:c}}function ob(n){var t=[],e=ab(n,t),r=e.extractPNetParams,a=e.extractRNetParams,o=e.extractONetParams,i=r(),s=a(),u=o();return xn(n,t),{params:{pnet:i,rnet:s,onet:u},paramMappings:t}}function di(n,t){var e=t[0],r=t[1];return{height:Math.floor(e*n),width:Math.floor(r*n)}}function ib(n,t,e){for(var r=e[0],a=e[1],o=Ka/n,i=[],s=Math.min(r,a)*o,u=0;s>=12;)i.push(o*Math.pow(t,u)),s=s*t,u+=1;return i}var cs=(function(n){le(t,n);function t(e,r,a,o){return n.call(this,{left:e,top:r,right:a,bottom:o},!0)||this}return t})(Mn);function eh(n){return K(function(){return ct(Xe(n,X(127.5)),X(.0078125))})}function xr(n,t){return K(function(){return xe(Oe(n),ct(t,za(Oe(za(n)))))})}function ls(n,t,e){return e===void 0&&(e=!1),K(function(){var r=Vt(n,t.conv1,"valid");return r=xr(r,t.prelu1_alpha),r=Je(r,e?[2,2]:[3,3],[2,2],"same"),r=Vt(r,t.conv2,"valid"),r=xr(r,t.prelu2_alpha),r=e?r:Je(r,[3,3],[2,2],"valid"),r=Vt(r,t.conv3,"valid"),r=xr(r,t.prelu3_alpha),r})}function sb(n,t){return K(function(){var e=ls(n,t,!0),r=Vt(e,t.conv4_1,"valid"),a=Ft(ro(r,3),3),o=mn(Xe(r,a),3),i=Vt(e,t.conv4_2,"valid");return{prob:o,regions:i}})}function ub(n,t){return K(function(){var e=di(t,n.shape.slice(1)),r=e.height,a=e.width,o=zi.resizeBilinear(n,[r,a]),i=eh(o);return Dn(i,[0,2,1,3])})}function cb(n,t,e,r){for(var a=[],o=n.arraySync(),i=0;i<n.shape[0];i++)for(var s=0;s<n.shape[1];s++)o[i][s]>=r&&a.push(new Ie(s,i));var u=a.map(function(c){var l=new so(Math.round((c.y*xa+1)/e),Math.round((c.x*xa+1)/e),Math.round((c.y*xa+Ka)/e),Math.round((c.x*xa+Ka)/e)),h=o[c.y][c.x],f=t.arraySync(),d=new cs(f[c.y][c.x][0],f[c.y][c.x][1],f[c.y][c.x][2],f[c.y][c.x][3]);return{cell:l,score:h,region:d}});return u}function lb(n,t,e,r,a){a.stage1=[];var o=t.map(function(f){return K(function(){var d={scale:f},p=ub(n,f),v=Date.now(),m=sb(p,r),g=m.prob,y=m.regions;d.pnet=Date.now()-v;var b=je(je(g,3)[1])[0],x=je(y)[0];return{scoresTensor:b,regionsTensor:x,scale:f,statsForScale:d}})}),i=o.map(function(f){var d=f.scoresTensor,p=f.regionsTensor,v=f.scale,m=f.statsForScale,g=cb(d,p,v,e);if(d.dispose(),p.dispose(),!g.length)return a.stage1.push(m),[];var y=Date.now(),b=Vr(g.map(function(x){return x.cell}),g.map(function(x){return x.score}),.5);return m.nms=Date.now()-y,m.numBoxes=b.length,a.stage1.push(m),b.map(function(x){return g[x]})}),s=i.reduce(function(f,d){return f.concat(d)},[]),u=[],c=[];if(s.length>0){var l=Date.now(),h=Vr(s.map(function(f){return f.cell}),s.map(function(f){return f.score}),.7);a.stage1_nms=Date.now()-l,c=h.map(function(f){return s[f].score}),u=h.map(function(f){return s[f]}).map(function(f){var d=f.cell,p=f.region;return new so(d.left+p.left*d.width,d.top+p.top*d.height,d.right+p.right*d.width,d.bottom+p.bottom*d.height).toSquare().round()})}return{boxes:u,scores:c}}function th(n,t,e){var r=e.width,a=e.height;return te(this,void 0,void 0,function(){var o,i,s,u=this;return ne(this,function(c){switch(c.label){case 0:return o=Yn(n),[4,Promise.all(t.map(function(l){return te(u,void 0,void 0,function(){var h,f,d,p,v,m,g,y;return ne(this,function(b){return h=l.padAtBorders(n.height,n.width),f=h.y,d=h.ey,p=h.x,v=h.ex,m=p-1,g=f-1,y=o.getImageData(m,g,v-m,d-g),[2,lt.isNodejs()?Qi(y):createImageBitmap(y)]})})}))];case 1:return i=c.sent(),s=[],i.forEach(function(l){var h=uo({width:r,height:a}),f=Yn(h);f.drawImage(l,0,0,r,a);for(var d=f.getImageData(0,0,r,a).data,p=[],v=0;v<d.length;v+=4)p.push(d[v+2]),p.push(d[v+1]),p.push(d[v]);s.push(p)}),[2,s.map(function(l){var h=K(function(){var f=Dn(mt(l,[1,r,a,3]),[0,2,1,3]).toFloat();return eh(f)});return h})]}})})}function hb(n,t){return K(function(){var e=ls(n,t),r=zt(e,[e.shape[0],t.fc1.weights.shape[0]]),a=en(r,t.fc1),o=xr(a,t.prelu4_alpha),i=en(o,t.fc2_1),s=Ft(ro(i,1),1),u=mn(Xe(i,s),1),c=en(o,t.fc2_2),l=je(u,1)[1];return{scores:l,regions:c}})}function fb(n,t,e,r,a){return te(this,void 0,void 0,function(){var o,i,s,u,c,l,h,f,d,p,v,m,g,y;return ne(this,function(b){switch(b.label){case 0:return o=Date.now(),[4,th(n,t,{width:24,height:24})];case 1:return i=b.sent(),a.stage2_extractImagePatches=Date.now()-o,o=Date.now(),s=i.map(function(x){var w=hb(x,r);return x.dispose(),w}),a.stage2_rnet=Date.now()-o,u=s.length>1?He(s.map(function(x){return x.scores})):s[0].scores,h=(l=Array).from,[4,u.data()];case 2:return c=h.apply(l,[b.sent()]),u.dispose(),f=c.map(function(x,w){return{score:x,idx:w}}).filter(function(x){return x.score>e}).map(function(x){var w=x.idx;return w}),d=f.map(function(x){return t[x]}),p=f.map(function(x){return c[x]}),v=[],m=[],d.length>0&&(o=Date.now(),g=Vr(d,p,.7),a.stage2_nms=Date.now()-o,y=g.map(function(x){var w=s[f[x]].regions.arraySync();return new cs(w[0][0],w[0][1],w[0][2],w[0][3])}),m=g.map(function(x){return p[x]}),v=g.map(function(x,w){return d[x].calibrate(y[w])})),s.forEach(function(x){x.regions.dispose(),x.scores.dispose()}),[2,{boxes:v,scores:m}]}})})}function db(n,t){return K(function(){var e=ls(n,t);e=Je(e,[2,2],[2,2],"same"),e=Vt(e,t.conv4,"valid"),e=xr(e,t.prelu4_alpha);var r=zt(e,[e.shape[0],t.fc1.weights.shape[0]]),a=en(r,t.fc1),o=xr(a,t.prelu5_alpha),i=en(o,t.fc2_1),s=Ft(ro(i,1),1),u=mn(Xe(i,s),1),c=en(o,t.fc2_2),l=en(o,t.fc2_3),h=je(u,1)[1];return{scores:h,regions:c,points:l}})}function pb(n,t,e,r,a){return te(this,void 0,void 0,function(){var o,i,s,u,c,l,h,f,d,p,v,m,g,y,b;return ne(this,function(x){switch(x.label){case 0:return o=Date.now(),[4,th(n,t,{width:48,height:48})];case 1:return i=x.sent(),a.stage3_extractImagePatches=Date.now()-o,o=Date.now(),s=i.map(function(w){var C=db(w,r);return w.dispose(),C}),a.stage3_onet=Date.now()-o,u=s.length>1?He(s.map(function(w){return w.scores})):s[0].scores,h=(l=Array).from,[4,u.data()];case 2:return c=h.apply(l,[x.sent()]),u.dispose(),f=c.map(function(w,C){return{score:w,idx:C}}).filter(function(w){return w.score>e}).map(function(w){var C=w.idx;return C}),d=f.map(function(w){var C=s[w].regions.arraySync();return new cs(C[0][0],C[0][1],C[0][2],C[0][3])}),p=f.map(function(w,C){return t[w].calibrate(d[C])}),v=f.map(function(w){return c[w]}),m=[],g=[],y=[],p.length>0&&(o=Date.now(),b=Vr(p,v,.7,!1),a.stage3_nms=Date.now()-o,m=b.map(function(w){return p[w]}),g=b.map(function(w){return v[w]}),y=b.map(function(w,C){return Array(5).fill(0).map(function(k,S){var _=s[w].points.arraySync();return new Ie(_[0][S]*(m[C].width+1)+m[C].left,_[0][S+5]*(m[C].height+1)+m[C].top)})})),s.forEach(function(w){w.regions.dispose(),w.scores.dispose(),w.points.dispose()}),[2,{boxes:m,scores:g,points:y}]}})})}var vb=(function(n){le(t,n);function t(){return n.call(this,"Mtcnn")||this}return t.prototype.load=function(e){return te(this,void 0,void 0,function(){return ne(this,function(r){return console.warn("mtcnn is deprecated and will be removed soon"),[2,n.prototype.load.call(this,e)]})})},t.prototype.loadFromDisk=function(e){return te(this,void 0,void 0,function(){return ne(this,function(r){return console.warn("mtcnn is deprecated and will be removed soon"),[2,n.prototype.loadFromDisk.call(this,e)]})})},t.prototype.forwardInput=function(e,r){return r===void 0&&(r={}),te(this,void 0,void 0,function(){var a,o,i,s,u,c,l,h,f,d,p,v,m,g,y,b,x,w,C,k,S;return ne(this,function(_){switch(_.label){case 0:if(a=this.params,!a)throw new Error("Mtcnn - load model before inference");if(o=e.canvases[0],!o)throw new Error("Mtcnn - inputCanvas is not defined, note that passing tensors into Mtcnn.forwardInput is not supported yet.");return i={},s=Date.now(),u=K(function(){return tb(Ft(Xi.fromPixels(o)).toFloat())}),c=function(R){return u.dispose(),i.total=Date.now()-s,R},l=u.shape.slice(1),h=l[0],f=l[1],d=new $l(r),p=d.minFaceSize,v=d.scaleFactor,m=d.maxNumScales,g=d.scoreThresholds,y=d.scaleSteps,b=(y||ib(p,v,[h,f])).filter(function(R){var D=di(R,[h,f]);return Math.min(D.width,D.height)>Ka}).slice(0,m),i.scales=b,i.pyramid=b.map(function(R){return di(R,[h,f])}),x=Date.now(),[4,lb(u,b,g[0],a.pnet,i)];case 1:return w=_.sent(),i.total_stage1=Date.now()-x,w.boxes.length?(i.stage2_numInputBoxes=w.boxes.length,x=Date.now(),[4,fb(o,w.boxes,g[1],a.rnet,i)]):[2,c({results:[],stats:i})];case 2:return C=_.sent(),i.total_stage2=Date.now()-x,C.boxes.length?(i.stage3_numInputBoxes=C.boxes.length,x=Date.now(),[4,pb(o,C.boxes,g[2],a.onet,i)]):[2,c({results:[],stats:i})];case 3:return k=_.sent(),i.total_stage3=Date.now()-x,S=k.boxes.map(function(R,D){return as($i({},new cn(k.scores[D],new Yi(R.left/f,R.top/h,R.width/f,R.height/h),{height:h,width:f})),new jy(k.points[D].map(function(A){return A.sub(new Ie(R.left,R.top)).div(new Ie(R.width,R.height))}),{width:R.width,height:R.height}))}),[2,c({results:S,stats:i})]}})})},t.prototype.forward=function(e,r){return r===void 0&&(r={}),te(this,void 0,void 0,function(){var a;return ne(this,function(o){switch(o.label){case 0:return a=this.forwardInput,[4,Ze(e)];case 1:return[4,a.apply(this,[o.sent(),r])];case 2:return[2,o.sent().results]}})})},t.prototype.forwardWithStats=function(e,r){return r===void 0&&(r={}),te(this,void 0,void 0,function(){var a;return ne(this,function(o){switch(o.label){case 0:return a=this.forwardInput,[4,Ze(e)];case 1:return[2,a.apply(this,[o.sent(),r])]}})})},t.prototype.getDefaultModelName=function(){return"mtcnn_model"},t.prototype.extractParamsFromWeigthMap=function(e){return ob(e)},t.prototype.extractParams=function(e){return rb(e)},t})(yn),mb=.4,gb=[new Ie(1.603231,2.094468),new Ie(6.041143,7.080126),new Ie(2.882459,3.518061),new Ie(4.266906,5.178857),new Ie(9.041765,10.66308)],yb=[117.001,114.697,97.404],xb=(function(n){le(t,n);function t(){var e=this,r={withSeparableConvs:!0,iouThreshold:mb,classes:["face"],anchors:gb,meanRgb:yb,isFirstLayerConv2d:!0,filterSizes:[3,16,32,64,128,256,512]};return e=n.call(this,r)||this,e}return Object.defineProperty(t.prototype,"anchors",{get:function(){return this.config.anchors},enumerable:!0,configurable:!0}),t.prototype.locateFaces=function(e,r){return te(this,void 0,void 0,function(){var a;return ne(this,function(o){switch(o.label){case 0:return[4,this.detect(e,r)];case 1:return a=o.sent(),[2,a.map(function(i){return new cn(i.score,i.relativeBox,{width:i.imageWidth,height:i.imageHeight})})]}})})},t.prototype.getDefaultModelName=function(){return"tiny_face_detector_model"},t.prototype.extractParamsFromWeigthMap=function(e){return n.prototype.extractParamsFromWeigthMap.call(this,e)},t})(Ql),yt={ssdMobilenetv1:new Jl,tinyFaceDetector:new xb,tinyYolov2:new eb,mtcnn:new vb,faceLandmark68Net:new Hl,faceLandmark68TinyNet:new wx,faceRecognitionNet:new kx,faceExpressionNet:new sx,ageGenderNet:new gx},nh=(function(n){le(t,n);function t(e,r,a){var o=n.call(this)||this;return o.parentTask=e,o.input=r,o.extractedFaces=a,o}return t})(Qr),hs=(function(n){le(t,n);function t(){return n!==null&&n.apply(this,arguments)||this}return t.prototype.run=function(){return te(this,void 0,void 0,function(){var e,r,a=this;return ne(this,function(o){switch(o.label){case 0:return[4,this.parentTask];case 1:return e=o.sent(),[4,ho(e,this.input,function(i){return te(a,void 0,void 0,function(){return ne(this,function(s){switch(s.label){case 0:return[4,Promise.all(i.map(function(u){return yt.faceExpressionNet.predictExpressions(u)}))];case 1:return[2,s.sent()]}})})},this.extractedFaces)];case 2:return r=o.sent(),[2,e.map(function(i,s){return zl(i,r[s])})]}})})},t.prototype.withAgeAndGender=function(){return new vs(this,this.input)},t})(nh),fs=(function(n){le(t,n);function t(){return n!==null&&n.apply(this,arguments)||this}return t.prototype.run=function(){return te(this,void 0,void 0,function(){var e,r;return ne(this,function(a){switch(a.label){case 0:return[4,this.parentTask];case 1:return e=a.sent(),e?[4,us(e,this.input,function(o){return yt.faceExpressionNet.predictExpressions(o)},this.extractedFaces)]:[2];case 2:return r=a.sent(),[2,zl(e,r)]}})})},t.prototype.withAgeAndGender=function(){return new ms(this,this.input)},t})(nh),ds=(function(n){le(t,n);function t(){return n!==null&&n.apply(this,arguments)||this}return t.prototype.withAgeAndGender=function(){return new gs(this,this.input)},t.prototype.withFaceDescriptors=function(){return new xs(this,this.input)},t})(hs),ps=(function(n){le(t,n);function t(){return n!==null&&n.apply(this,arguments)||this}return t.prototype.withAgeAndGender=function(){return new ys(this,this.input)},t.prototype.withFaceDescriptor=function(){return new bs(this,this.input)},t})(fs),rh=(function(n){le(t,n);function t(e,r,a){var o=n.call(this)||this;return o.parentTask=e,o.input=r,o.extractedFaces=a,o}return t})(Qr),vs=(function(n){le(t,n);function t(){return n!==null&&n.apply(this,arguments)||this}return t.prototype.run=function(){return te(this,void 0,void 0,function(){var e,r,a=this;return ne(this,function(o){switch(o.label){case 0:return[4,this.parentTask];case 1:return e=o.sent(),[4,ho(e,this.input,function(i){return te(a,void 0,void 0,function(){return ne(this,function(s){switch(s.label){case 0:return[4,Promise.all(i.map(function(u){return yt.ageGenderNet.predictAgeAndGender(u)}))];case 1:return[2,s.sent()]}})})},this.extractedFaces)];case 2:return r=o.sent(),[2,e.map(function(i,s){var u=r[s],c=u.age,l=u.gender,h=u.genderProbability;return Kl(Yl(i,l,h),c)})]}})})},t.prototype.withFaceExpressions=function(){return new hs(this,this.input)},t})(rh),ms=(function(n){le(t,n);function t(){return n!==null&&n.apply(this,arguments)||this}return t.prototype.run=function(){return te(this,void 0,void 0,function(){var e,r,a,o,i;return ne(this,function(s){switch(s.label){case 0:return[4,this.parentTask];case 1:return e=s.sent(),e?[4,us(e,this.input,function(u){return yt.ageGenderNet.predictAgeAndGender(u)},this.extractedFaces)]:[2];case 2:return r=s.sent(),a=r.age,o=r.gender,i=r.genderProbability,[2,Kl(Yl(e,o,i),a)]}})})},t.prototype.withFaceExpressions=function(){return new fs(this,this.input)},t})(rh),gs=(function(n){le(t,n);function t(){return n!==null&&n.apply(this,arguments)||this}return t.prototype.withFaceExpressions=function(){return new ds(this,this.input)},t.prototype.withFaceDescriptors=function(){return new xs(this,this.input)},t})(vs),ys=(function(n){le(t,n);function t(){return n!==null&&n.apply(this,arguments)||this}return t.prototype.withFaceExpressions=function(){return new ps(this,this.input)},t.prototype.withFaceDescriptor=function(){return new bs(this,this.input)},t})(ms),ah=(function(n){le(t,n);function t(e,r){var a=n.call(this)||this;return a.parentTask=e,a.input=r,a}return t})(Qr),xs=(function(n){le(t,n);function t(){return n!==null&&n.apply(this,arguments)||this}return t.prototype.run=function(){return te(this,void 0,void 0,function(){var e,r;return ne(this,function(a){switch(a.label){case 0:return[4,this.parentTask];case 1:return e=a.sent(),[4,ho(e,this.input,function(o){return Promise.all(o.map(function(i){return yt.faceRecognitionNet.computeFaceDescriptor(i)}))},null,function(o){return o.landmarks.align(null,{useDlibAlignment:!0})})];case 2:return r=a.sent(),[2,r.map(function(o,i){return Xl(e[i],o)})]}})})},t.prototype.withFaceExpressions=function(){return new ds(this,this.input)},t.prototype.withAgeAndGender=function(){return new gs(this,this.input)},t})(ah),bs=(function(n){le(t,n);function t(){return n!==null&&n.apply(this,arguments)||this}return t.prototype.run=function(){return te(this,void 0,void 0,function(){var e,r;return ne(this,function(a){switch(a.label){case 0:return[4,this.parentTask];case 1:return e=a.sent(),e?[4,us(e,this.input,function(o){return yt.faceRecognitionNet.computeFaceDescriptor(o)},null,function(o){return o.landmarks.align(null,{useDlibAlignment:!0})})]:[2];case 2:return r=a.sent(),[2,Xl(e,r)]}})})},t.prototype.withFaceExpressions=function(){return new ps(this,this.input)},t.prototype.withAgeAndGender=function(){return new ys(this,this.input)},t})(ah),oh=(function(n){le(t,n);function t(e,r,a){var o=n.call(this)||this;return o.parentTask=e,o.input=r,o.useTinyLandmarkNet=a,o}return Object.defineProperty(t.prototype,"landmarkNet",{get:function(){return this.useTinyLandmarkNet?yt.faceLandmark68TinyNet:yt.faceLandmark68Net},enumerable:!0,configurable:!0}),t})(Qr),bb=(function(n){le(t,n);function t(){return n!==null&&n.apply(this,arguments)||this}return t.prototype.run=function(){return te(this,void 0,void 0,function(){var e,r,a,o,i,s=this;return ne(this,function(u){switch(u.label){case 0:return[4,this.parentTask];case 1:return e=u.sent(),r=e.map(function(c){return c.detection}),this.input instanceof Be?[4,es(this.input,r)]:[3,3];case 2:return o=u.sent(),[3,5];case 3:return[4,Zi(this.input,r)];case 4:o=u.sent(),u.label=5;case 5:return a=o,[4,Promise.all(a.map(function(c){return s.landmarkNet.detectLandmarks(c)}))];case 6:return i=u.sent(),a.forEach(function(c){return c instanceof Be&&c.dispose()}),[2,e.map(function(c,l){return as(c,i[l])})]}})})},t.prototype.withFaceExpressions=function(){return new ds(this,this.input)},t.prototype.withAgeAndGender=function(){return new gs(this,this.input)},t.prototype.withFaceDescriptors=function(){return new xs(this,this.input)},t})(oh),wb=(function(n){le(t,n);function t(){return n!==null&&n.apply(this,arguments)||this}return t.prototype.run=function(){return te(this,void 0,void 0,function(){var e,r,a,o,i;return ne(this,function(s){switch(s.label){case 0:return[4,this.parentTask];case 1:return e=s.sent(),e?(r=e.detection,this.input instanceof Be?[4,es(this.input,[r])]:[3,3]):[2];case 2:return o=s.sent(),[3,5];case 3:return[4,Zi(this.input,[r])];case 4:o=s.sent(),s.label=5;case 5:return a=o,[4,this.landmarkNet.detectLandmarks(a[0])];case 6:return i=s.sent(),a.forEach(function(u){return u instanceof Be&&u.dispose()}),[2,as(e,i)]}})})},t.prototype.withFaceExpressions=function(){return new ps(this,this.input)},t.prototype.withAgeAndGender=function(){return new ys(this,this.input)},t.prototype.withFaceDescriptor=function(){return new bs(this,this.input)},t})(oh),ih=(function(n){le(t,n);function t(e,r){r===void 0&&(r=new lo);var a=n.call(this)||this;return a.input=e,a.options=r,a}return t})(Qr),Cb=(function(n){le(t,n);function t(){return n!==null&&n.apply(this,arguments)||this}return t.prototype.run=function(){return te(this,void 0,void 0,function(){var e,r,a,o;return ne(this,function(i){switch(i.label){case 0:return e=this,r=e.input,a=e.options,a instanceof $l?[4,yt.mtcnn.forward(r,a)]:[3,2];case 1:return[2,i.sent().map(function(s){return s.detection})];case 2:if(o=a instanceof Zl?function(s){return yt.tinyFaceDetector.locateFaces(s,a)}:a instanceof lo?function(s){return yt.ssdMobilenetv1.locateFaces(s,a)}:a instanceof ss?function(s){return yt.tinyYolov2.locateFaces(s,a)}:null,!o)throw new Error("detectFaces - expected options to be instance of TinyFaceDetectorOptions | SsdMobilenetv1Options | MtcnnOptions | TinyYolov2Options");return[2,o(r)]}})})},t.prototype.runAndExtendWithFaceDetections=function(){var e=this;return new Promise(function(r){return te(e,void 0,void 0,function(){var a;return ne(this,function(o){switch(o.label){case 0:return[4,this.run()];case 1:return a=o.sent(),[2,r(a.map(function(i){return $i({},i)}))]}})})})},t.prototype.withFaceLandmarks=function(e){return e===void 0&&(e=!1),new bb(this.runAndExtendWithFaceDetections(),this.input,e)},t.prototype.withFaceExpressions=function(){return new hs(this.runAndExtendWithFaceDetections(),this.input)},t.prototype.withAgeAndGender=function(){return new vs(this.runAndExtendWithFaceDetections(),this.input)},t})(ih),Eb=(function(n){le(t,n);function t(){return n!==null&&n.apply(this,arguments)||this}return t.prototype.run=function(){return te(this,void 0,void 0,function(){var e,r;return ne(this,function(a){switch(a.label){case 0:return[4,new Cb(this.input,this.options)];case 1:return e=a.sent(),r=e[0],e.forEach(function(o){o.score>r.score&&(r=o)}),[2,r]}})})},t.prototype.runAndExtendWithFaceDetection=function(){var e=this;return new Promise(function(r){return te(e,void 0,void 0,function(){var a;return ne(this,function(o){switch(o.label){case 0:return[4,this.run()];case 1:return a=o.sent(),[2,r(a?$i({},a):void 0)]}})})})},t.prototype.withFaceLandmarks=function(e){return e===void 0&&(e=!1),new wb(this.runAndExtendWithFaceDetection(),this.input,e)},t.prototype.withFaceExpressions=function(){return new fs(this.runAndExtendWithFaceDetection(),this.input)},t.prototype.withAgeAndGender=function(){return new ms(this.runAndExtendWithFaceDetection(),this.input)},t})(ih);function _b(n,t){return t===void 0&&(t=new lo),new Eb(n,t)}function Sb(n,t){if(n.length!==t.length)throw new Error("euclideanDistance: arr1.length !== arr2.length");var e=Array.from(n),r=Array.from(t);return Math.sqrt(e.map(function(a,o){return a-r[o]}).reduce(function(a,o){return a+Math.pow(o,2)},0))}(function(){function n(t,e){e===void 0&&(e=.6),this._distanceThreshold=e;var r=Array.isArray(t)?t:[t];if(!r.length)throw new Error("FaceRecognizer.constructor - expected atleast one input");var a=1,o=function(){return"person "+a++};this._labeledDescriptors=r.map(function(i){if(i instanceof va)return i;if(i instanceof Float32Array)return new va(o(),[i]);if(i.descriptor&&i.descriptor instanceof Float32Array)return new va(o(),[i.descriptor]);throw new Error("FaceRecognizer.constructor - expected inputs to be of type LabeledFaceDescriptors | WithFaceDescriptor<any> | Float32Array | Array<LabeledFaceDescriptors | WithFaceDescriptor<any> | Float32Array>")})}return Object.defineProperty(n.prototype,"labeledDescriptors",{get:function(){return this._labeledDescriptors},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"distanceThreshold",{get:function(){return this._distanceThreshold},enumerable:!0,configurable:!0}),n.prototype.computeMeanDistance=function(t,e){return e.map(function(r){return Sb(r,t)}).reduce(function(r,a){return r+a},0)/(e.length||1)},n.prototype.matchDescriptor=function(t){var e=this;return this.labeledDescriptors.map(function(r){var a=r.descriptors,o=r.label;return new Cu(o,e.computeMeanDistance(t,a))}).reduce(function(r,a){return r.distance<a.distance?r:a})},n.prototype.findBestMatch=function(t){var e=this.matchDescriptor(t);return e.distance<this.distanceThreshold?e:new Cu("unknown",e.distance)},n.prototype.toJSON=function(){return{distanceThreshold:this.distanceThreshold,labeledDescriptors:this.labeledDescriptors.map(function(t){return t.toJSON()})}},n.fromJSON=function(t){var e=t.labeledDescriptors.map(function(r){return va.fromJSON(r)});return new n(e,t.distanceThreshold)},n})();const Rb=`
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,Ib=`
precision highp float;
uniform vec3 iResolution;
uniform float iTime;
uniform vec2 uSkew;
uniform float uTilt;
uniform float uYaw;
uniform float uLineThickness;
uniform vec3 uLinesColor;
uniform vec3 uScanColor;
uniform float uGridScale;
uniform float uLineStyle;
uniform float uLineJitter;
uniform float uScanOpacity;
uniform float uScanDirection;
uniform float uNoise;
uniform float uBloomOpacity;
uniform float uScanGlow;
uniform float uScanSoftness;
uniform float uPhaseTaper;
uniform float uScanDuration;
uniform float uScanDelay;
varying vec2 vUv;

uniform float uScanStarts[8];
uniform float uScanCount;

const int MAX_SCANS = 8;

float smoother01(float a, float b, float x){
  float t = clamp((x - a) / max(1e-5, (b - a)), 0.0, 1.0);
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 p = (2.0 * fragCoord - iResolution.xy) / iResolution.y;

    vec3 ro = vec3(0.0);
    vec3 rd = normalize(vec3(p, 2.0));

    float cR = cos(uTilt), sR = sin(uTilt);
    rd.xy = mat2(cR, -sR, sR, cR) * rd.xy;

    float cY = cos(uYaw), sY = sin(uYaw);
    rd.xz = mat2(cY, -sY, sY, cY) * rd.xz;

    vec2 skew = clamp(uSkew, vec2(-0.7), vec2(0.7));
    rd.xy += skew * rd.z;

    vec3 color = vec3(0.0);
  float minT = 1e20;
  float gridScale = max(1e-5, uGridScale);
    float fadeStrength = 2.0;
    vec2 gridUV = vec2(0.0);

  float hitIsY = 1.0;
    for (int i = 0; i < 4; i++)
    {
        float isY = float(i < 2);
        float pos = mix(-0.2, 0.2, float(i)) * isY + mix(-0.5, 0.5, float(i - 2)) * (1.0 - isY);
        float num = pos - (isY * ro.y + (1.0 - isY) * ro.x);
        float den = isY * rd.y + (1.0 - isY) * rd.x;
        float t = num / den;
        vec3 h = ro + rd * t;

        float depthBoost = smoothstep(0.0, 3.0, h.z);
        h.xy += skew * 0.15 * depthBoost;

    bool use = t > 0.0 && t < minT;
    gridUV = use ? mix(h.zy, h.xz, isY) / gridScale : gridUV;
    minT = use ? t : minT;
    hitIsY = use ? isY : hitIsY;
    }

    vec3 hit = ro + rd * minT;
    float dist = length(hit - ro);

  float jitterAmt = clamp(uLineJitter, 0.0, 1.0);
  if (jitterAmt > 0.0) {
    vec2 j = vec2(
      sin(gridUV.y * 2.7 + iTime * 1.8),
      cos(gridUV.x * 2.3 - iTime * 1.6)
    ) * (0.15 * jitterAmt);
    gridUV += j;
  }
  float fx = fract(gridUV.x);
  float fy = fract(gridUV.y);
  float ax = min(fx, 1.0 - fx);
  float ay = min(fy, 1.0 - fy);
  float wx = fwidth(gridUV.x);
  float wy = fwidth(gridUV.y);
  float halfPx = max(0.0, uLineThickness) * 0.5;

  float tx = halfPx * wx;
  float ty = halfPx * wy;

  float aax = wx;
  float aay = wy;

  float lineX = 1.0 - smoothstep(tx, tx + aax, ax);
  float lineY = 1.0 - smoothstep(ty, ty + aay, ay);
  if (uLineStyle > 0.5) {
    float dashRepeat = 4.0;
    float dashDuty = 0.5;
    float vy = fract(gridUV.y * dashRepeat);
    float vx = fract(gridUV.x * dashRepeat);
    float dashMaskY = step(vy, dashDuty);
    float dashMaskX = step(vx, dashDuty);
    if (uLineStyle < 1.5) {
      lineX *= dashMaskY;
      lineY *= dashMaskX;
    } else {
      float dotRepeat = 6.0;
      float dotWidth = 0.18;
      float cy = abs(fract(gridUV.y * dotRepeat) - 0.5);
      float cx = abs(fract(gridUV.x * dotRepeat) - 0.5);
      float dotMaskY = 1.0 - smoothstep(dotWidth, dotWidth + fwidth(gridUV.y * dotRepeat), cy);
      float dotMaskX = 1.0 - smoothstep(dotWidth, dotWidth + fwidth(gridUV.x * dotRepeat), cx);
      lineX *= dotMaskY;
      lineY *= dotMaskX;
    }
  }
  float primaryMask = max(lineX, lineY);

  vec2 gridUV2 = (hitIsY > 0.5 ? hit.xz : hit.zy) / gridScale;
  if (jitterAmt > 0.0) {
    vec2 j2 = vec2(
      cos(gridUV2.y * 2.1 - iTime * 1.4),
      sin(gridUV2.x * 2.5 + iTime * 1.7)
    ) * (0.15 * jitterAmt);
    gridUV2 += j2;
  }
  float fx2 = fract(gridUV2.x);
  float fy2 = fract(gridUV2.y);
  float ax2 = min(fx2, 1.0 - fx2);
  float ay2 = min(fy2, 1.0 - fy2);
  float wx2 = fwidth(gridUV2.x);
  float wy2 = fwidth(gridUV2.y);
  float tx2 = halfPx * wx2;
  float ty2 = halfPx * wy2;
  float aax2 = wx2;
  float aay2 = wy2;
  float lineX2 = 1.0 - smoothstep(tx2, tx2 + aax2, ax2);
  float lineY2 = 1.0 - smoothstep(ty2, ty2 + aay2, ay2);
  if (uLineStyle > 0.5) {
    float dashRepeat2 = 4.0;
    float dashDuty2 = 0.5;
    float vy2m = fract(gridUV2.y * dashRepeat2);
    float vx2m = fract(gridUV2.x * dashRepeat2);
    float dashMaskY2 = step(vy2m, dashDuty2);
    float dashMaskX2 = step(vx2m, dashDuty2);
    if (uLineStyle < 1.5) {
      lineX2 *= dashMaskY2;
      lineY2 *= dashMaskX2;
    } else {
      float dotRepeat2 = 6.0;
      float dotWidth2 = 0.18;
      float cy2 = abs(fract(gridUV2.y * dotRepeat2) - 0.5);
      float cx2 = abs(fract(gridUV2.x * dotRepeat2) - 0.5);
      float dotMaskY2 = 1.0 - smoothstep(dotWidth2, dotWidth2 + fwidth(gridUV2.y * dotRepeat2), cy2);
      float dotMaskX2 = 1.0 - smoothstep(dotWidth2, dotWidth2 + fwidth(gridUV2.x * dotRepeat2), cx2);
      lineX2 *= dotMaskY2;
      lineY2 *= dotMaskX2;
    }
  }
    float altMask = max(lineX2, lineY2);

    float edgeDistX = min(abs(hit.x - (-0.5)), abs(hit.x - 0.5));
    float edgeDistY = min(abs(hit.y - (-0.2)), abs(hit.y - 0.2));
    float edgeDist = mix(edgeDistY, edgeDistX, hitIsY);
    float edgeGate = 1.0 - smoothstep(gridScale * 0.5, gridScale * 2.0, edgeDist);
    altMask *= edgeGate;

  float lineMask = max(primaryMask, altMask);

    float fade = exp(-dist * fadeStrength);

    float dur = max(0.05, uScanDuration);
    float del = max(0.0, uScanDelay);
    float scanZMax = 2.0;
    float widthScale = max(0.1, uScanGlow);
    float sigma = max(0.001, 0.18 * widthScale * uScanSoftness);
    float sigmaA = sigma * 2.0;

    float combinedPulse = 0.0;
    float combinedAura = 0.0;

    float cycle = dur + del;
    float tCycle = mod(iTime, cycle);
    float scanPhase = clamp((tCycle - del) / dur, 0.0, 1.0);
    float phase = scanPhase;
    if (uScanDirection > 0.5 && uScanDirection < 1.5) {
      phase = 1.0 - phase;
    } else if (uScanDirection > 1.5) {
      float t2 = mod(max(0.0, iTime - del), 2.0 * dur);
      phase = (t2 < dur) ? (t2 / dur) : (1.0 - (t2 - dur) / dur);
    }
    float scanZ = phase * scanZMax;
    float dz = abs(hit.z - scanZ);
    float lineBand = exp(-0.5 * (dz * dz) / (sigma * sigma));
    float taper = clamp(uPhaseTaper, 0.0, 0.49);
    float headW = taper;
    float tailW = taper;
    float headFade = smoother01(0.0, headW, phase);
    float tailFade = 1.0 - smoother01(1.0 - tailW, 1.0, phase);
    float phaseWindow = headFade * tailFade;
    float pulseBase = lineBand * phaseWindow;
    combinedPulse += pulseBase * clamp(uScanOpacity, 0.0, 1.0);
    float auraBand = exp(-0.5 * (dz * dz) / (sigmaA * sigmaA));
    combinedAura += (auraBand * 0.25) * phaseWindow * clamp(uScanOpacity, 0.0, 1.0);

    for (int i = 0; i < MAX_SCANS; i++) {
      if (float(i) >= uScanCount) break;
      float tActiveI = iTime - uScanStarts[i];
      float phaseI = clamp(tActiveI / dur, 0.0, 1.0);
      if (uScanDirection > 0.5 && uScanDirection < 1.5) {
        phaseI = 1.0 - phaseI;
      } else if (uScanDirection > 1.5) {
        phaseI = (phaseI < 0.5) ? (phaseI * 2.0) : (1.0 - (phaseI - 0.5) * 2.0);
      }
      float scanZI = phaseI * scanZMax;
      float dzI = abs(hit.z - scanZI);
      float lineBandI = exp(-0.5 * (dzI * dzI) / (sigma * sigma));
      float headFadeI = smoother01(0.0, headW, phaseI);
      float tailFadeI = 1.0 - smoother01(1.0 - tailW, 1.0, phaseI);
      float phaseWindowI = headFadeI * tailFadeI;
      combinedPulse += lineBandI * phaseWindowI * clamp(uScanOpacity, 0.0, 1.0);
      float auraBandI = exp(-0.5 * (dzI * dzI) / (sigmaA * sigmaA));
      combinedAura += (auraBandI * 0.25) * phaseWindowI * clamp(uScanOpacity, 0.0, 1.0);
    }

  float lineVis = lineMask;
  vec3 gridCol = uLinesColor * lineVis * fade;
  vec3 scanCol = uScanColor * combinedPulse;
  vec3 scanAura = uScanColor * combinedAura;

    color = gridCol + scanCol + scanAura;

  float n = fract(sin(dot(gl_FragCoord.xy + vec2(iTime * 123.4), vec2(12.9898,78.233))) * 43758.5453123);
  color += (n - 0.5) * uNoise;
  color = clamp(color, 0.0, 1.0);
  float alpha = clamp(max(lineVis, combinedPulse), 0.0, 1.0);
  float gx = 1.0 - smoothstep(tx * 2.0, tx * 2.0 + aax * 2.0, ax);
  float gy = 1.0 - smoothstep(ty * 2.0, ty * 2.0 + aay * 2.0, ay);
  float halo = max(gx, gy) * fade;
  alpha = max(alpha, halo * clamp(uBloomOpacity, 0.0, 1.0));
  fragColor = vec4(color, alpha);
}

void main(){
  vec4 c;
  mainImage(c, vUv * iResolution.xy);
  gl_FragColor = c;
}
`,kb=({enableWebcam:n=!1,showPreview:t=!1,modelsPath:e="https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@0.22.2/weights",sensitivity:r=.55,lineThickness:a=1,linesColor:o="#392e4e",scanColor:i="#FF9FFC",scanOpacity:s=.4,gridScale:u=.1,lineStyle:c="solid",lineJitter:l=.1,scanDirection:h="pingpong",enablePost:f=!0,bloomIntensity:d=0,bloomThreshold:p=0,bloomSmoothing:v=0,chromaticAberration:m=.002,noiseIntensity:g=.01,scanGlow:y=.5,scanSoftness:b=2,scanPhaseTaper:x=.9,scanDuration:w=2,scanDelay:C=2,enableGyro:k=!1,scanOnClick:S=!1,snapBackDelay:_=250,className:R,style:D})=>{const A=ae.useRef(null),O=ae.useRef(null),P=Wh(A),F=ae.useRef(P);ae.useEffect(()=>{F.current=P},[P]);const V=ae.useRef(null),z=ae.useRef(null),U=ae.useRef(null),L=ae.useRef(null),G=ae.useRef(null),q=ae.useRef(null),[Y,re]=ae.useState(!1),[ie,se]=ae.useState(!1),ce=ae.useRef(new Ae(0,0)),he=ae.useRef(0),de=ae.useRef(0),pe=ae.useRef(new Ae(0,0)),De=ae.useRef(new Ae(0,0)),ve=ae.useRef(0),me=ae.useRef(0),oe=ae.useRef(0),_e=ae.useRef(0),be=8,Te=ae.useRef([]),vt=ge=>{const Q=Te.current.slice();if(Q.length>=be&&Q.shift(),Q.push(ge),Te.current=Q,z.current){const Fe=z.current.uniforms,We=new Array(be).fill(0);for(let Pe=0;Pe<Q.length&&Pe<be;Pe++)We[Pe]=Q[Pe];Fe.uScanStarts.value=We,Fe.uScanCount.value=Q.length}},ht=ae.useRef([]),Ye=ae.useRef([]),Lt=ae.useRef([]),Tt=ae.useRef([]),ft=Nt.clamp(r,0,1),Ct=Nt.lerp(.06,.2,ft),ln=Nt.lerp(.12,.3,ft),At=Nt.lerp(.1,.28,ft),tr=Nt.lerp(.25,.45,ft),Ut=Nt.lerp(.45,.12,ft),dt=1/0,nr=Nt.lerp(1.2,1.6,ft);return ae.useEffect(()=>{const ge=A.current;if(!ge)return;let Q=null;const Fe=Dt=>{if(ie)return;Q&&(clearTimeout(Q),Q=null);const et=ge.getBoundingClientRect(),Ir=(Dt.clientX-et.left)/et.width*2-1,Mt=-((Dt.clientY-et.top)/et.height*2-1);ce.current.set(Ir,Mt)},We=async()=>{const Dt=performance.now()/1e3;if(S&&vt(Dt),k&&typeof window<"u"&&window.DeviceOrientationEvent&&DeviceOrientationEvent.requestPermission)try{await DeviceOrientationEvent.requestPermission()}catch{}},Pe=()=>{Q&&(clearTimeout(Q),Q=null)},$e=()=>{ie||(Q&&clearTimeout(Q),Q=window.setTimeout(()=>{ce.current.set(0,0),he.current=0,de.current=0},Math.max(0,_||0)))};return ge.addEventListener("mousemove",Fe),ge.addEventListener("mouseenter",Pe),S&&ge.addEventListener("click",We),ge.addEventListener("mouseleave",$e),()=>{ge.removeEventListener("mousemove",Fe),ge.removeEventListener("mouseenter",Pe),ge.removeEventListener("mouseleave",$e),S&&ge.removeEventListener("click",We),Q&&clearTimeout(Q)}},[ie,_,S,k]),ae.useEffect(()=>{const ge=A.current;if(!ge)return;const Q=new Lu({antialias:!0,alpha:!0});V.current=Q,Q.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),Q.setSize(ge.clientWidth,ge.clientHeight),Q.outputColorSpace=at,Q.toneMapping=Th,Q.autoClear=!1,Q.setClearColor(0,0),ge.appendChild(Q.domElement);const Fe={iResolution:{value:new Vn(ge.clientWidth,ge.clientHeight,Q.getPixelRatio())},iTime:{value:0},uSkew:{value:new Ae(0,0)},uTilt:{value:0},uYaw:{value:0},uLineThickness:{value:a},uLinesColor:{value:ba(o)},uScanColor:{value:ba(i)},uGridScale:{value:u},uLineStyle:{value:c==="dashed"?1:c==="dotted"?2:0},uLineJitter:{value:Math.max(0,Math.min(1,l||0))},uScanOpacity:{value:s},uNoise:{value:g},uBloomOpacity:{value:d},uScanGlow:{value:y},uScanSoftness:{value:b},uPhaseTaper:{value:x},uScanDuration:{value:w},uScanDelay:{value:C},uScanDirection:{value:h==="backward"?1:h==="pingpong"?2:0},uScanStarts:{value:new Array(be).fill(0)},uScanCount:{value:0}},We=new pn({uniforms:Fe,vertexShader:Rb,fragmentShader:Ib,transparent:!0,depthWrite:!1,depthTest:!1});z.current=We;const Pe=new Sa,$e=new pi(-1,1,1,-1,0,1),Dt=new vi(new Uu(2,2),We);Pe.add(Dt);let et=null;if(f){et=new Kh(Q),U.current=et;const wn=new Jf(Pe,$e);et.addPass(wn);const qt=new Xf({intensity:1,luminanceThreshold:p,luminanceSmoothing:v});qt.blendMode.opacity.value=Math.max(0,d),L.current=qt;const On=new $f({offset:new Ae(m,m),radialModulation:!0,modulationOffset:0});G.current=On;const Ln=new nd($e,qt,On);Ln.renderToScreen=!0,et.addPass(Ln)}const Ir=()=>{Q.setSize(ge.clientWidth,ge.clientHeight),We.uniforms.iResolution.value.set(ge.clientWidth,ge.clientHeight,Q.getPixelRatio()),U.current&&U.current.setSize(ge.clientWidth,ge.clientHeight)};window.addEventListener("resize",Ir);let Mt=performance.now();const rr=()=>{if(!F.current){Mt=performance.now(),q.current=requestAnimationFrame(rr);return}const wn=performance.now(),qt=Math.max(0,Math.min(.1,(wn-Mt)/1e3));Mt=wn,pe.current.copy(Tb(pe.current,ce.current,De.current,Ut,dt,qt));const On=ku(ve.current,he.current,{v:me.current},Ut,dt,qt);ve.current=On.value,me.current=On.v;const Ln=ku(oe.current,de.current,{v:_e.current},Ut,dt,qt);oe.current=Ln.value,_e.current=Ln.v;const Zr=new Ae(pe.current.x*Ct,-pe.current.y*nr*Ct);We.uniforms.uSkew.value.set(Zr.x,Zr.y),We.uniforms.uTilt.value=ve.current*ln,We.uniforms.uYaw.value=Nt.clamp(oe.current*At,-.6,.6),We.uniforms.iTime.value=wn/1e3,Q.clear(!0,!0,!0),U.current?U.current.render(qt):Q.render(Pe,$e),q.current=requestAnimationFrame(rr)};return q.current=requestAnimationFrame(rr),()=>{q.current&&cancelAnimationFrame(q.current),window.removeEventListener("resize",Ir),We.dispose(),Dt.geometry.dispose(),U.current&&(U.current.dispose(),U.current=null),Q.forceContextLoss(),Q.dispose(),ge.removeChild(Q.domElement)}},[r,a,o,i,s,u,c,l,h,f,g,d,y,b,x,w,C,p,v,m,Ut,dt,Ct,nr,ln,At]),ae.useEffect(()=>{const ge=z.current;if(ge){const Q=ge.uniforms;Q.uLineThickness.value=a,Q.uLinesColor.value.copy(ba(o)),Q.uScanColor.value.copy(ba(i)),Q.uGridScale.value=u,Q.uLineStyle.value=c==="dashed"?1:c==="dotted"?2:0,Q.uLineJitter.value=Math.max(0,Math.min(1,l||0)),Q.uBloomOpacity.value=Math.max(0,d),Q.uNoise.value=Math.max(0,g),Q.uScanGlow.value=y,Q.uScanOpacity.value=Math.max(0,Math.min(1,s)),Q.uScanDirection.value=h==="backward"?1:h==="pingpong"?2:0,Q.uScanSoftness.value=b,Q.uPhaseTaper.value=x,Q.uScanDuration.value=Math.max(.05,w),Q.uScanDelay.value=Math.max(0,C)}L.current&&(L.current.blendMode.opacity.value=Math.max(0,d),L.current.luminanceMaterial.threshold=p,L.current.luminanceMaterial.smoothing=v),G.current&&G.current.offset.set(m,m)},[a,o,i,u,c,l,d,p,v,m,g,y,s,h,b,x,w,C]),ae.useEffect(()=>{if(!k)return;const ge=Q=>{if(ie)return;const Fe=Q.gamma??0,We=Q.beta??0,Pe=Nt.clamp(Fe/45,-1,1),$e=Nt.clamp(-We/30,-1,1);ce.current.set(Pe,$e),he.current=Nt.degToRad(Fe)*.4};return window.addEventListener("deviceorientation",ge),()=>{window.removeEventListener("deviceorientation",ge)}},[k,ie]),ae.useEffect(()=>{let ge=!1;return(async()=>{try{await Promise.all([yt.tinyFaceDetector.loadFromUri(e),yt.faceLandmark68TinyNet.loadFromUri(e)]),ge||re(!0)}catch{ge||re(!1)}})(),()=>{ge=!0}},[e]),ae.useEffect(()=>{let ge=!1,Q=0;const Fe=O.current;return(async()=>{if(!n||!Y||!Fe)return;try{const Dt=await navigator.mediaDevices.getUserMedia({video:{facingMode:"user",width:{ideal:1280},height:{ideal:720}},audio:!1});Fe.srcObject=Dt,await Fe.play()}catch{return}const Pe=new Zl({inputSize:320,scoreThreshold:.5}),$e=async Dt=>{if(!ge){if(Dt-Q>=33){Q=Dt;try{const et=await _b(Fe,Pe).withFaceLandmarks(!0);if(et&&et.detection){const Mt=et.detection.box,rr=Fe.videoWidth||1,wn=Fe.videoHeight||1,qt=Mt.x+Mt.width*.5,On=Mt.y+Mt.height*.5,Ln=qt/rr*2-1,Zr=On/wn*2-1;wa(ht.current,Ln,5),wa(Ye.current,Zr,5);const sh=Ca(ht.current),uh=Ca(Ye.current),ch=new Ae(Math.tanh(sh),Math.tanh(uh)),lh=Math.min(1,Math.hypot(Mt.width/rr,Mt.height/wn)),hh=1+tr*(lh-.25);ce.current.copy(ch.multiplyScalar(hh));const fh=et.landmarks.getLeftEye(),dh=et.landmarks.getRightEye(),ea=Tu(fh),ta=Tu(dh),ph=Math.atan2(ta.y-ea.y,ta.x-ea.x);wa(Lt.current,ph,5),he.current=Ca(Lt.current);const na=et.landmarks.getNose(),ws=na[na.length-1]||na[Math.floor(na.length/2)],ra=et.landmarks.getJawOutline(),vh=ra[3]||ra[2],mh=ra[13]||ra[14],gh=Au(ws,vh),yh=Au(ws,mh),xh=Math.hypot(ta.x-ea.x,ta.y-ea.y)+1e-6;let fo=Nt.clamp((yh-gh)/(xh*1.6),-1,1);fo=Math.tanh(fo),wa(Tt.current,fo,5),de.current=Ca(Tt.current),se(!0)}else se(!1)}catch{se(!1)}}"requestVideoFrameCallback"in HTMLVideoElement.prototype?Fe.requestVideoFrameCallback(()=>$e(performance.now())):requestAnimationFrame($e)}};requestAnimationFrame($e)})(),()=>{if(ge=!0,Fe){const Pe=Fe.srcObject;Pe&&Pe.getTracks().forEach($e=>$e.stop()),Fe.pause(),Fe.srcObject=null}}},[n,Y,tr]),j.jsx("div",{ref:A,className:`relative w-full h-full overflow-hidden ${R??""}`,style:D,children:t&&j.jsxs("div",{className:"absolute right-3 bottom-3 w-[220px] h-[132px] rounded-lg overflow-hidden border border-white/25 shadow-[0_4px_16px_rgba(0,0,0,0.4)] bg-black text-white text-[12px] leading-[1.2] font-sans pointer-events-none",children:[j.jsx("video",{ref:O,muted:!0,playsInline:!0,autoPlay:!0,className:"w-full h-full object-cover -scale-x-100"}),j.jsx("div",{className:"absolute left-2 top-2 px-[6px] py-[2px] bg-black/50 rounded-[6px] backdrop-blur-[4px]",children:n?Y?ie?"Face: tracking":"Face: searching":"Loading models":"Webcam disabled"})]})})};function ba(n){let t=n;(!n||n==="transparent")&&(t="#000000");let e;try{e=new Go(t)}catch{e=new Go("#000000")}return e.convertSRGBToLinear()}function Tb(n,t,e,r,a,o){const i=n.clone();r=Math.max(1e-4,r);const s=2/r,u=s*o,c=1/(1+u+.48*u*u+.235*u*u*u);let l=n.clone().sub(t);const h=t.clone(),f=a*r;l.length()>f&&l.setLength(f),t=n.clone().sub(l);const d=e.clone().addScaledVector(l,s).multiplyScalar(o);e.sub(d.clone().multiplyScalar(s)),e.multiplyScalar(c),i.copy(t.clone().add(l.add(d).multiplyScalar(c)));const p=h.clone().sub(n),v=i.clone().sub(h);return p.dot(v)>0&&(i.copy(h),e.set(0,0)),i}function ku(n,t,e,r,a,o){r=Math.max(1e-4,r);const i=2/r,s=i*o,u=1/(1+s+.48*s*s+.235*s*s*s);let c=n-t;const l=t,h=a*r;c=Math.sign(c)*Math.min(Math.abs(c),h),t=n-c;const f=(e.v+i*c)*o;e.v=(e.v-i*f)*u;let d=t+(c+f)*u;const p=l-n,v=d-l;return p*v>0&&(d=l,e.v=0),{value:d,v:e.v}}function wa(n,t,e){n.push(t),n.length>e&&n.shift()}function Ca(n){if(n.length===0)return 0;const t=[...n].sort((r,a)=>r-a),e=Math.floor(t.length/2);return t.length%2?t[e]:(t[e-1]+t[e])*.5}function Tu(n){let t=0,e=0;const r=n.length||1;for(const a of n)t+=a.x,e+=a.y;return{x:t/r,y:e/r}}function Au(n,t){return Math.hypot(n.x-t.x,n.y-t.y)}const Ab=({color:n="#4ac8c8",fontSize:t=16,className:e=""})=>{const r=ae.useRef(null),a=ae.useRef();return ae.useEffect(()=>{const o=r.current;if(!o)return;const i=o.getContext("2d"),s=()=>{o.width=window.innerWidth,o.height=window.innerHeight};s(),window.addEventListener("resize",s);const u="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}".split(""),c=Math.floor(o.width/t),l=Array(c).fill(1);function h(){i.fillStyle="rgba(0,0,0,0.04)",i.fillRect(0,0,o.width,o.height),i.font=`${t}px monospace`,i.fillStyle=n;for(let f=0;f<l.length;f++){const d=u[Math.floor(Math.random()*u.length)];i.fillText(d,f*t,l[f]*t),l[f]*t>o.height&&Math.random()>.975&&(l[f]=0),l[f]++}a.current=requestAnimationFrame(h)}return h(),()=>{cancelAnimationFrame(a.current),window.removeEventListener("resize",s)}},[n,t]),j.jsx("canvas",{ref:r,className:`fixed inset-0 w-full h-full pointer-events-none z-2 ${e}`,style:{mixBlendMode:"screen"}})},pt={baseDensity:.12,maxSpeed:.6,radius:[1,2.2],linkDist:110,linkAlpha:.16,mouseInfluence:110,repelStrength:.35,clickBurst:120,colorParticle:"#c9e7ff",colorLink:"#7dd3fc"};function Db(){const n=ae.useRef(null),t=ae.useRef([]);return ae.useEffect(()=>{const e=n.current;if(!e)return;const r=e.getContext("2d",{alpha:!0});let a=Math.max(1,Math.min(2,window.devicePixelRatio||1)),o=0,i=0,s=null;const u={x:null,y:null,down:!1},c=()=>{a=Math.max(1,Math.min(2,window.devicePixelRatio||1)),o=e.width=Math.floor(window.innerWidth*a),i=e.height=Math.floor(window.innerHeight*a),e.style.width=window.innerWidth+"px",e.style.height=window.innerHeight+"px",d()},l=(w,C)=>Math.random()*(C-w)+w,h=(w,C,k)=>Math.max(C,Math.min(k,w));class f{constructor(){this.reset(!0)}reset(C=!1){this.x=C?l(0,o):Math.random()<.5?0:o,this.y=l(0,i);const k=l(0,Math.PI*2),S=l(.05,pt.maxSpeed);this.vx=Math.cos(k)*S,this.vy=Math.sin(k)*S,this.r=l(pt.radius[0],pt.radius[1])*a}step(C,k){if(C!==null&&k!==null){const R=this.x-C,D=this.y-k,A=R*R+D*D,O=pt.mouseInfluence*a;if(A<O*O){const P=Math.sqrt(A)||.001,F=R/P,V=D/P,z=pt.repelStrength;this.vx+=F*z*(1-P/O),this.vy+=V*z*(1-P/O)}}const S=Math.hypot(this.vx,this.vy),_=pt.maxSpeed;S>_&&(this.vx*=_/S,this.vy*=_/S),this.x+=this.vx*a,this.y+=this.vy*a,this.x<-50&&(this.x=o+50),this.x>o+50&&(this.x=-50),this.y<-50&&(this.y=i+50),this.y>i+50&&(this.y=-50)}draw(){r.beginPath(),r.arc(this.x,this.y,this.r,0,Math.PI*2),r.fillStyle=pt.colorParticle,r.globalAlpha=.9,r.fill()}}const d=()=>{const w=o*i/(a*a),C=pt.baseDensity;let k=Math.round(C*(w/1e4));k=h(k,40,220);const S=t.current;if(S.length<k){const _=k-S.length;for(let R=0;R<_;R++)S.push(new f)}else S.length>k&&(S.length=k)},p=()=>{const w=t.current;r.lineWidth=1*a,r.strokeStyle=pt.colorLink;for(let C=0;C<w.length;C++)for(let k=C+1;k<w.length;k++){const S=w[C],_=w[k],R=S.x-_.x,D=S.y-_.y,A=Math.hypot(R,D);if(A<pt.linkDist*a){const O=pt.linkAlpha*(1-A/(pt.linkDist*a));r.globalAlpha=O,r.beginPath(),r.moveTo(S.x,S.y),r.lineTo(_.x,_.y),r.stroke()}}r.globalAlpha=1},v=()=>{r.clearRect(0,0,o,i);const w=t.current;for(let C=0;C<w.length;C++)w[C].step(u.x,u.y);p();for(let C=0;C<w.length;C++)w[C].draw();s=requestAnimationFrame(v)},m=w=>{u.x=w.clientX*a,u.y=w.clientY*a},g=()=>{u.x=u.y=null},y=()=>{u.down=!0},b=()=>{u.down=!1},x=w=>{const C=w.clientX*a,k=w.clientY*a,S=t.current;for(let _=0;_<S.length;_++){const R=S[_],D=R.x-C,A=R.y-k,O=D*D+A*A,P=pt.mouseInfluence*a;if(O<P*P){const F=Math.sqrt(O)||.001,V=D/F,z=A/F;R.vx+=V*(pt.clickBurst/100),R.vy+=z*(pt.clickBurst/100)}}};window.addEventListener("resize",c,{passive:!0}),window.addEventListener("mousemove",m,{passive:!0}),window.addEventListener("mouseleave",g),window.addEventListener("mousedown",y),window.addEventListener("mouseup",b),window.addEventListener("click",x),c();for(let w=0;w<120;w++)t.current.push(new f);return d(),v(),()=>{window.removeEventListener("resize",c),window.removeEventListener("mousemove",m),window.removeEventListener("mouseleave",g),window.removeEventListener("mousedown",y),window.removeEventListener("mouseup",b),window.removeEventListener("click",x),cancelAnimationFrame(s)}},[]),j.jsxs(j.Fragment,{children:[j.jsx("div",{className:"fixed inset-0 z-0 bg-[#0b1220]",style:{backgroundImage:`
          radial-gradient(1200px 600px at 20% 20%, rgba(56, 189, 248, 0.1), transparent 60%),
          radial-gradient(1000px 500px at 80% 30%, rgba(124, 58, 237, 0.1), transparent 60%)
        `}}),j.jsx("canvas",{ref:n,className:"fixed inset-0 w-screen h-screen block z-0"})]})}const Mb=`
precision highp float;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,Nb=`
precision highp float;

uniform float iTime;
uniform vec3  iResolution;
uniform float animationSpeed;

uniform bool enableTop;
uniform bool enableMiddle;
uniform bool enableBottom;

uniform int topLineCount;
uniform int middleLineCount;
uniform int bottomLineCount;

uniform float topLineDistance;
uniform float middleLineDistance;
uniform float bottomLineDistance;

uniform vec3 topWavePosition;
uniform vec3 middleWavePosition;
uniform vec3 bottomWavePosition;

uniform vec2 iMouse;
uniform bool interactive;
uniform float bendRadius;
uniform float bendStrength;
uniform float bendInfluence;

uniform bool parallax;
uniform float parallaxStrength;
uniform vec2 parallaxOffset;

uniform vec3 lineGradient[8];
uniform int lineGradientCount;

const vec3 BLACK = vec3(0.0);
const vec3 PINK  = vec3(233.0, 71.0, 245.0) / 255.0;
const vec3 BLUE  = vec3(47.0,  75.0, 162.0) / 255.0;

mat2 rotate(float r) {
  return mat2(cos(r), sin(r), -sin(r), cos(r));
}

vec3 background_color(vec2 uv) {
  vec3 col = vec3(0.0);

  float y = sin(uv.x - 0.2) * 0.3 - 0.1;
  float m = uv.y - y;

  col += mix(BLUE, BLACK, smoothstep(0.0, 1.0, abs(m)));
  col += mix(PINK, BLACK, smoothstep(0.0, 1.0, abs(m - 0.8)));
  return col * 0.5;
}

vec3 getLineColor(float t, vec3 baseColor) {
  if (lineGradientCount <= 0) {
    return baseColor;
  }

  vec3 gradientColor;
  
  if (lineGradientCount == 1) {
    gradientColor = lineGradient[0];
  } else {
    float clampedT = clamp(t, 0.0, 0.9999);
    float scaled = clampedT * float(lineGradientCount - 1);
    int idx = int(floor(scaled));
    float f = fract(scaled);
    int idx2 = min(idx + 1, lineGradientCount - 1);

    vec3 c1 = lineGradient[idx];
    vec3 c2 = lineGradient[idx2];
    
    gradientColor = mix(c1, c2, f);
  }
  
  return gradientColor * 0.5;
}

  float wave(vec2 uv, float offset, vec2 screenUv, vec2 mouseUv, bool shouldBend) {
  float time = iTime * animationSpeed;

  float x_offset   = offset;
  float x_movement = time * 0.1;
  float amp        = sin(offset + time * 0.2) * 0.3;
  float y          = sin(uv.x + x_offset + x_movement) * amp;

  if (shouldBend) {
    vec2 d = screenUv - mouseUv;
    float influence = exp(-dot(d, d) * bendRadius); // radial falloff around cursor
    float bendOffset = (mouseUv.y - screenUv.y) * influence * bendStrength * bendInfluence;
    y += bendOffset;
  }

  float m = uv.y - y;
  return 0.0175 / max(abs(m) + 0.01, 1e-3) + 0.01;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 baseUv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
  baseUv.y *= -1.0;
  
  if (parallax) {
    baseUv += parallaxOffset;
  }

  vec3 col = vec3(0.0);

  vec3 b = lineGradientCount > 0 ? vec3(0.0) : background_color(baseUv);

  vec2 mouseUv = vec2(0.0);
  if (interactive) {
    mouseUv = (2.0 * iMouse - iResolution.xy) / iResolution.y;
    mouseUv.y *= -1.0;
  }
  
  if (enableBottom) {
    for (int i = 0; i < bottomLineCount; ++i) {
      float fi = float(i);
      float t = fi / max(float(bottomLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t, b);
      
      float angle = bottomWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      col += lineCol * wave(
        ruv + vec2(bottomLineDistance * fi + bottomWavePosition.x, bottomWavePosition.y),
        1.5 + 0.2 * fi,
        baseUv,
        mouseUv,
        interactive
      ) * 0.2;
    }
  }

  if (enableMiddle) {
    for (int i = 0; i < middleLineCount; ++i) {
      float fi = float(i);
      float t = fi / max(float(middleLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t, b);
      
      float angle = middleWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      col += lineCol * wave(
        ruv + vec2(middleLineDistance * fi + middleWavePosition.x, middleWavePosition.y),
        2.0 + 0.15 * fi,
        baseUv,
        mouseUv,
        interactive
      ) * 0.15;
    }
  }

  if (enableTop) {
    for (int i = 0; i < topLineCount; ++i) {
      float fi = float(i);
      float t = fi / max(float(topLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t, b);
      
      float angle = topWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      ruv.x *= -1.0;
      col += lineCol * wave(
        ruv + vec2(topLineDistance * fi + topWavePosition.x, topWavePosition.y),
        1.0 + 0.2 * fi,
        baseUv,
        mouseUv,
        interactive
      ) * 0.1;
    }
  }

  fragColor = vec4(col, 1.0);
}

void main() {
  vec4 color = vec4(0.0);
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor = color;
}
`,Du=8;function Fb(n){let t=n.trim();t.startsWith("#")&&(t=t.slice(1));let e=255,r=255,a=255;return t.length===3?(e=parseInt(t[0]+t[0],16),r=parseInt(t[1]+t[1],16),a=parseInt(t[2]+t[2],16)):t.length===6&&(e=parseInt(t.slice(0,2),16),r=parseInt(t.slice(2,4),16),a=parseInt(t.slice(4,6),16)),new Vn(e/255,r/255,a/255)}function Pb({linesGradient:n,enabledWaves:t=["top","middle","bottom"],lineCount:e=[6],lineDistance:r=[5],topWavePosition:a,middleWavePosition:o,bottomWavePosition:i={x:2,y:-.7,rotate:-1},animationSpeed:s=1,interactive:u=!0,bendRadius:c=5,bendStrength:l=-.5,mouseDamping:h=.05,parallax:f=!0,parallaxStrength:d=.2,mixBlendMode:p="screen"}){const v=ae.useRef(null),m=ae.useRef(new Ae(-1e3,-1e3)),g=ae.useRef(new Ae(-1e3,-1e3)),y=ae.useRef(0),b=ae.useRef(0),x=ae.useRef(new Ae(0,0)),w=ae.useRef(new Ae(0,0)),C=F=>{if(typeof e=="number")return e;if(!t.includes(F))return 0;const V=t.indexOf(F);return e[V]??6},k=F=>{if(typeof r=="number")return r;if(!t.includes(F))return .1;const V=t.indexOf(F);return r[V]??.1},S=t.includes("top")?C("top"):0,_=t.includes("middle")?C("middle"):0,R=t.includes("bottom")?C("bottom"):0,D=t.includes("top")?k("top")*.01:.01,A=t.includes("middle")?k("middle")*.01:.01,O=t.includes("bottom")?k("bottom")*.01:.01,P=JSON.stringify({linesGradient:n,enabledWaves:t,lineCount:e,lineDistance:r,topWavePosition:a,middleWavePosition:o,bottomWavePosition:i});return ae.useEffect(()=>{const F=v.current;if(!F)return;let V=!0;const z=new Sa,U=new pi(-1,1,1,-1,0,1);U.position.z=1;const L=new Lu({antialias:!0,alpha:!1});L.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),L.domElement.style.width="100%",L.domElement.style.height="100%",F.appendChild(L.domElement);const G={iTime:{value:0},iResolution:{value:new Vn(1,1,1)},animationSpeed:{value:s},enableTop:{value:t.includes("top")},enableMiddle:{value:t.includes("middle")},enableBottom:{value:t.includes("bottom")},topLineCount:{value:S},middleLineCount:{value:_},bottomLineCount:{value:R},topLineDistance:{value:D},middleLineDistance:{value:A},bottomLineDistance:{value:O},topWavePosition:{value:new Vn(a?.x??10,a?.y??.5,a?.rotate??-.4)},middleWavePosition:{value:new Vn(o?.x??5,o?.y??0,o?.rotate??.2)},bottomWavePosition:{value:new Vn(i?.x??2,i?.y??-.7,i?.rotate??.4)},iMouse:{value:new Ae(-1e3,-1e3)},interactive:{value:u},bendRadius:{value:c},bendStrength:{value:l},bendInfluence:{value:0},parallax:{value:f},parallaxStrength:{value:d},parallaxOffset:{value:new Ae(0,0)},lineGradient:{value:Array.from({length:Du},()=>new Vn(1,1,1))},lineGradientCount:{value:0}};if(n&&n.length>0){const me=n.slice(0,Du);G.lineGradientCount.value=me.length,me.forEach((oe,_e)=>{const be=Fb(oe);G.lineGradient.value[_e].set(be.x,be.y,be.z)})}const q=new pn({uniforms:G,vertexShader:Mb,fragmentShader:Nb}),Y=new Uu(2,2),re=new vi(Y,q);z.add(re);const ie=new Ah;let se={width:0,height:0};const ce=()=>{if(!V)return;const me=F.clientWidth||1,oe=F.clientHeight||1;if(Math.abs(se.width-me)<2&&Math.abs(se.height-oe)<2)return;se={width:me,height:oe},L.setSize(me,oe,!1);const _e=L.domElement.width,be=L.domElement.height;G.iResolution.value.set(_e,be,1)};ce();const he=typeof ResizeObserver<"u"?new ResizeObserver(()=>{V&&ce()}):null;he&&he.observe(F);const de=me=>{const oe=L.domElement.getBoundingClientRect(),_e=me.clientX-oe.left,be=me.clientY-oe.top,Te=L.getPixelRatio();if(m.current.set(_e*Te,(oe.height-be)*Te),y.current=1,f){const vt=oe.width/2,ht=oe.height/2,Ye=(_e-vt)/oe.width,Lt=-(be-ht)/oe.height;x.current.set(Ye*d,Lt*d)}},pe=()=>{y.current=0};u&&(L.domElement.addEventListener("pointermove",de),L.domElement.addEventListener("pointerleave",pe));let De=0;const ve=()=>{V&&(G.iTime.value=ie.getElapsedTime(),u&&(g.current.lerp(m.current,h),G.iMouse.value.copy(g.current),b.current+=(y.current-b.current)*h,G.bendInfluence.value=b.current),f&&(w.current.lerp(x.current,h),G.parallaxOffset.value.copy(w.current)),L.render(z,U),De=requestAnimationFrame(ve))};return ve(),()=>{V=!1,cancelAnimationFrame(De),he&&he.disconnect(),u&&(L.domElement.removeEventListener("pointermove",de),L.domElement.removeEventListener("pointerleave",pe)),Y.dispose(),q.dispose(),L.dispose(),L.forceContextLoss(),L.domElement.parentElement&&L.domElement.parentElement.removeChild(L.domElement)}},[P,s,u,c,l,h,f,d]),j.jsx("div",{ref:v,className:"absolute inset-0 w-full h-full overflow-hidden floating-lines-container",style:{mixBlendMode:p,zIndex:0}})}const Mr=["fa-brands fa-python","fa-brands fa-java","fa-brands fa-js","fa-solid fa-c"],Mu=[...Mr,...Mr,...Mr,...Mr,...Mr];function Bb(){const n=Array.from({length:15});return j.jsxs("section",{className:"ctrlelite-bg-section pointer-events-auto",children:[j.jsx("link",{rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"}),j.jsx("div",{className:"ctrlelite-wrapper pointer-events-none",children:n.map((t,e)=>j.jsxs("div",{className:"ctrlelite-row pointer-events-none",children:[j.jsx("div",{className:"pointer-events-none",children:Mu.map((r,a)=>j.jsx("i",{className:`${r} pointer-events-auto`},`a-${a}`))}),j.jsx("div",{className:"pointer-events-none",children:Mu.map((r,a)=>j.jsx("i",{className:`${r} pointer-events-auto`},`b-${a}`))})]},e))}),j.jsx("style",{dangerouslySetInnerHTML:{__html:`
        .ctrlelite-bg-section {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: #1a1a1a;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            z-index: 0;
        }

        .ctrlelite-wrapper {
            position: absolute;
            width: 250vw;
            height: 250vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            transform: rotate(-30deg);
        }

        .ctrlelite-row {
            position: relative;
            width: 100%;
            display: flex;
            padding: 10px 0;
            white-space: nowrap;
            font-size: 64px;
        }

        .ctrlelite-row i {
            color: rgba(0, 0, 0, 0.5);
            transition: 1s;
            padding: 0 5px;
            user-select: none;
            cursor: default;
        }

        .ctrlelite-row i:hover {
            color: #ac2a2a;
            transition: 0s;
            text-shadow: 0 0 120px #ac2a2a;
        }

        .ctrlelite-row div {
            font-size: 1.5em;
            display: flex;
        }

        .ctrlelite-row div:nth-child(1) {
            animation: animatectl1 80s linear infinite;
            animation-delay: -80s;
        }

        .ctrlelite-row div:nth-child(2) {
            animation: animatectl2 80s linear infinite;
            animation-delay: -40s;
        }

        @keyframes animatectl1 {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
        }
        @keyframes animatectl2 {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-200%); }
        }
      `}})]})}const Ob=({words:n,color:t})=>j.jsx("div",{className:"relative z-30 w-full overflow-hidden border-t py-3 mt-auto",style:{borderColor:`${t}30`,backgroundColor:"rgba(0,0,0,0.75)",backdropFilter:"blur(10px)"},children:j.jsx("div",{className:"marquee-track",children:[...Array(4)].map((e,r)=>j.jsx(Oh.Fragment,{children:n.map((a,o)=>j.jsxs("span",{className:"inline-flex items-center gap-3 mx-5 text-xs md:text-sm font-bold tracking-[0.25em] uppercase whitespace-nowrap",style:{color:`${t}`},children:[j.jsx("span",{style:{color:t},children:"◆"}),a]},`${r}-${o}`))},r))})}),Lb=()=>{const{eventName:n}=Dh(),t=Mh(),e=Nh.find(s=>s.id===n),r=ae.useCallback(()=>{t("/"),setTimeout(()=>{const s=document.getElementById("events");s&&s.scrollIntoView({behavior:"smooth"})},100)},[t]);if(ae.useEffect(()=>{window.scrollTo(0,0)},[n]),!e)return j.jsx("div",{className:"min-h-screen bg-black flex items-center justify-center",children:j.jsxs("div",{className:"text-center",children:[j.jsx("h1",{className:"text-4xl font-bold text-white mb-4",children:"Event Not Found"}),j.jsx("button",{onClick:()=>t("/"),className:"px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors cursor-pointer",children:"← Back to Events"})]})});const{theme:a,id:o}=e;function i(s){let u=s.replace("#","");if(u.length===3&&(u=u.split("").map(f=>f+f).join("")),u.length!==6)return"#fff";const c=(255-parseInt(u.slice(0,2),16)).toString(16).padStart(2,"0"),l=(255-parseInt(u.slice(2,4),16)).toString(16).padStart(2,"0"),h=(255-parseInt(u.slice(4,6),16)).toString(16).padStart(2,"0");return`#${c}${l}${h}`}return i(a.primary),j.jsxs(Xt.div,{className:"min-h-screen relative flex flex-col overflow-x-hidden bg-black text-white",style:o==="treasure-trove"||o==="dpl"?{background:"#000"}:{background:a.gradient},initial:{opacity:0,position:"absolute",width:"100%",top:0,left:0},animate:{opacity:1,position:"relative"},exit:{opacity:0,position:"absolute",width:"100%",top:0,left:0,zIndex:50},transition:{duration:.6},children:[o==="codeoflies"&&j.jsxs(j.Fragment,{children:[j.jsx(Ab,{color:a.primary}),j.jsx("div",{className:"fixed inset-0 w-full h-full z-0 pointer-events-none bg-slate-900"}),j.jsx("div",{className:"fixed inset-0 w-full h-full z-0 pointer-events-none",style:{background:"rgba(0,0,0,0.85)"}})]}),o==="ctrlaltelite"&&j.jsx("div",{className:"fixed inset-0 w-full h-full z-0 pointer-events-none",children:j.jsx(Bb,{})}),o==="brainiac"&&j.jsx("div",{className:"fixed inset-0 w-full h-full z-0",children:j.jsx(Db,{})}),o==="treasure-trove"&&j.jsx("div",{className:"fixed inset-0 w-full h-full z-0 pointer-events-none",children:j.jsx("div",{style:{width:"100%",height:"100%",position:"absolute"},className:"pointer-events-auto",children:j.jsx(Pb,{linesGradient:["#fff5cc",a.primary,a.secondary,a.primary,"#fff5cc"],enabledWaves:["top","bottom","middle"],lineCount:5,lineDistance:14.5,bendRadius:13.5,bendStrength:0,interactive:!0,parallax:!0})})}),o==="timescape"&&j.jsxs("div",{className:"fixed inset-0 w-full h-full z-1 pointer-events-none bg-[#08000c]",children:[j.jsx(kb,{sensitivity:.55,lineThickness:1,gridScale:.1,scanOpacity:.3,enablePost:!0,bloomIntensity:.5,noiseIntensity:.01,linesColor:"#260e35",scanColor:a.primary,chromaticAberration:.001,scanSoftness:5,scanGlow:.8}),j.jsx("div",{className:"absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#08000c]"})]}),o==="dpl"&&j.jsx("div",{className:"fixed inset-0 w-full h-full z-0 pointer-events-none",children:j.jsx("div",{style:{width:"100%",height:"100%",position:"absolute"},className:"pointer-events-auto",children:j.jsx(Fh,{speed:.44,squareSize:40,direction:"left",borderColor:"#353317",hoverFillColor:"#e8d020",shape:"hexagon",hoverTrailAmount:0})})}),j.jsxs("div",{className:"relative z-10 grow pt-24 pb-32",children:[j.jsx(Xt.div,{className:"pt-6 md:pt-8 px-6 md:px-12 lg:px-20",initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{duration:.5,delay:.2},children:j.jsx("button",{onClick:r,className:"inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-xs tracking-[0.2em] uppercase border transition-all duration-300 hover:scale-105 cursor-pointer",style:{borderColor:`${a.primary}60`,color:a.primary,backgroundColor:`${a.primary}15`,boxShadow:"none"},children:"← Back to Events"})}),j.jsx("div",{className:"px-4 sm:px-6 md:px-12 lg:px-20 mt-8 md:mt-12 overflow-hidden",children:j.jsxs("div",{className:"flex flex-col lg:flex-row gap-8 lg:gap-16 items-start w-full max-w-7xl mx-auto",children:[j.jsx(Xt.div,{className:"lg:hidden w-full flex justify-center",initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{duration:.6,delay:.3},children:j.jsx("div",{className:"relative rounded-2xl overflow-hidden",style:{width:"min(85vw, 340px)",boxShadow:"none",border:`2px solid ${a.primary}40`},children:j.jsx("img",{src:e.poster,alt:e.name,className:"w-full h-auto block"})})}),j.jsxs(Xt.div,{className:"flex-1 min-w-0",initial:{opacity:0,x:-40},animate:{opacity:1,x:0},transition:{duration:.6,delay:.3},children:[j.jsx("div",{className:"mb-4 flex flex-wrap",children:j.jsxs("span",{className:"inline-flex items-center gap-2 px-3 py-1.5 md:px-4 text-[10px] md:text-xs font-semibold tracking-[0.15em] uppercase border",style:{borderColor:`${a.primary}50`,color:a.primary,backgroundColor:`${a.primary}15`,boxShadow:"none"},children:[e.category," · ",e.categoryIcon]})}),j.jsx("h1",{className:"text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase leading-tight md:leading-none mb-4 break-words",style:{fontFamily:"'VerminVibes', 'Orbitron', monospace",color:"#fff",textShadow:"none"},children:e.name}),j.jsx("p",{className:"text-sm md:text-base font-mono tracking-wider mb-6",style:{color:`${a.primary}`},children:e.tagline}),j.jsx("div",{className:"h-0.5 w-full mb-8",style:{background:`linear-gradient(to right, ${a.primary}80, ${a.primary}20, transparent)`,boxShadow:"none"}}),j.jsx("p",{className:"text-white/60 text-sm md:text-base leading-relaxed mb-6 md:mb-8 font-mono break-words",children:e.description}),j.jsx("div",{className:"space-y-3 mb-10",children:e.highlights.map((s,u)=>j.jsxs(Xt.div,{className:"flex items-start gap-3",initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{duration:.4,delay:.5+u*.1},children:[j.jsx("span",{className:"w-2.5 h-2.5 rounded-full mt-1 shrink-0",style:{backgroundColor:a.primary,boxShadow:"none"}}),j.jsx("span",{className:"text-white/80 text-xs sm:text-sm font-semibold break-words",children:s})]},u))}),j.jsxs(Xt.div,{className:"flex flex-row flex-wrap items-end gap-6 md:gap-10 mb-10",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.8},children:[j.jsxs("div",{children:[j.jsx("p",{className:"text-[10px] font-bold tracking-[0.3em] uppercase text-white/30 mb-1",children:"Entry Fee"}),j.jsx("p",{className:"text-3xl md:text-4xl font-black",style:{color:a.primary,textShadow:"none"},children:e.entryFee})]}),j.jsxs("div",{children:[j.jsx("p",{className:"text-[10px] font-bold tracking-[0.3em] uppercase text-white/30 mb-1",children:"Prize Pool"}),j.jsx("p",{className:"text-3xl md:text-4xl font-black",style:{color:a.primary,textShadow:"none"},children:e.prizePool})]})]}),j.jsx(Xt.a,{href:e.registerLink,target:"_blank",rel:"noopener noreferrer",className:"inline-block px-10 py-4 rounded-lg font-black text-sm tracking-[0.25em] uppercase text-black transition-all duration-300 no-underline",style:{backgroundColor:a.primary,boxShadow:"none"},whileHover:{scale:1.05,boxShadow:"none"},whileTap:{scale:.97},initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:1},children:"Register Now"})]}),j.jsx(Xt.div,{className:"hidden lg:block shrink-0 py-8",style:{width:"clamp(300px, 25vw, 420px)"},initial:{opacity:0,x:60,rotate:3},animate:{opacity:1,x:0,rotate:0},transition:{type:"spring",stiffness:100,damping:20,delay:.4},children:j.jsx(Xt.div,{className:"relative rounded-2xl overflow-hidden",style:{boxShadow:"none",border:`2px solid ${a.primary}40`},animate:{y:[0,-14,0]},transition:{duration:4,repeat:1/0,ease:"easeInOut"},children:j.jsx("img",{src:e.poster,alt:e.name,className:"w-full h-auto block"})})})]})}),j.jsx(Xt.div,{className:"px-4 sm:px-6 md:px-12 lg:px-20 mt-12",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:1.05},children:j.jsxs("div",{className:"w-full max-w-7xl mx-auto rounded-xl border p-5 md:p-7",style:{borderColor:`${a.primary}45`,backgroundColor:"rgba(0, 0, 0, 0.45)",backdropFilter:"blur(4px)"},children:[j.jsx("p",{className:"text-2xl md:text-4xl font-black uppercase mb-6 tracking-[0.24em]",style:{color:a.primary},children:"Instructions"}),j.jsxs("ol",{className:"list-decimal pl-7 space-y-5 text-white text-2xl md:text-3xl leading-10 md:leading-[3.2rem] font-black",children:[j.jsx("li",{children:"Please ensure that all the details provided in the form are accurate and complete."}),j.jsx("li",{children:"The payment made must match the event you have registered for; incorrect selections or payments will not be accepted or refunded."}),j.jsx("li",{children:"Further details and updates regarding the event will be communicated via email."})]})]})})]}),j.jsx(Ob,{words:a.marqueeWords,color:a.primary}),j.jsx(Ph,{scrollToRefs:{heroRef:!0},scrollToSection:()=>t("/")}),j.jsx(Bh,{scrollToRefs:{},scrollToSection:()=>{},isScrolled:!0})]},`event-${o}`)};function Wb(){return j.jsx(Lb,{})}export{Wb as default};
