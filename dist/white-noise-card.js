function t(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const o=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:a,defineProperty:l,getOwnPropertyDescriptor:h,getOwnPropertyNames:c,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,u=globalThis,_=u.trustedTypes,m=_?_.emptyScript:"",y=u.reactiveElementPolyfillSupport,g=(t,e)=>t,f={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!a(t,e),$={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:v};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);n?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(g("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(g("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(g("properties"))){const t=this.properties,e=[...c(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),n=e.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:f).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:f;this._$Em=s;const r=n.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(void 0!==t){const r=this.constructor;if(!1===s&&(n=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??v)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==n||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[g("elementProperties")]=new Map,b[g("finalized")]=new Map,y?.({ReactiveElement:b}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,A=t=>t,x=w.trustedTypes,S=x?x.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",T=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+T,C=`<${P}>`,M=document,k=()=>M.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,R="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,z=/>/g,j=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,I=/"/g,L=/^(?:script|style|textarea|title)$/i,V=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),B=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),q=new WeakMap,K=M.createTreeWalker(M,129);function J(t,e){if(!U(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const F=(t,e)=>{const i=t.length-1,s=[];let n,r=2===e?"<svg>":3===e?"<math>":"",o=N;for(let e=0;e<i;e++){const i=t[e];let a,l,h=-1,c=0;for(;c<i.length&&(o.lastIndex=c,l=o.exec(i),null!==l);)c=o.lastIndex,o===N?"!--"===l[1]?o=H:void 0!==l[1]?o=z:void 0!==l[2]?(L.test(l[2])&&(n=RegExp("</"+l[2],"g")),o=j):void 0!==l[3]&&(o=j):o===j?">"===l[0]?(o=n??N,h=-1):void 0===l[1]?h=-2:(h=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?j:'"'===l[3]?I:D):o===I||o===D?o=j:o===H||o===z?o=N:(o=j,n=void 0);const d=o===j&&t[e+1].startsWith("/>")?" ":"";r+=o===N?i+C:h>=0?(s.push(a),i.slice(0,h)+E+i.slice(h)+T+d):i+T+(-2===h?e:d)}return[J(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Z{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,r=0;const o=t.length-1,a=this.parts,[l,h]=F(t,e);if(this.el=Z.createElement(l,i),K.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=K.nextNode())&&a.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(E)){const e=h[r++],i=s.getAttribute(t).split(T),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:o[2],strings:i,ctor:"."===o[1]?tt:"?"===o[1]?et:"@"===o[1]?it:X}),s.removeAttribute(t)}else t.startsWith(T)&&(a.push({type:6,index:n}),s.removeAttribute(t));if(L.test(s.tagName)){const t=s.textContent.split(T),e=t.length-1;if(e>0){s.textContent=x?x.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],k()),K.nextNode(),a.push({type:2,index:++n});s.append(t[e],k())}}}else if(8===s.nodeType)if(s.data===P)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(T,t+1));)a.push({type:7,index:n}),t+=T.length-1}n++}}static createElement(t,e){const i=M.createElement("template");return i.innerHTML=t,i}}function Y(t,e,i=t,s){if(e===B)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const r=O(e)?void 0:e._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),void 0===r?n=void 0:(n=new r(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=Y(t,n._$AS(t,e.values),n,s)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??M).importNode(e,!0);K.currentNode=s;let n=K.nextNode(),r=0,o=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new Q(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new st(n,this,t)),this._$AV.push(e),a=i[++o]}r!==a?.index&&(n=K.nextNode(),r++)}return K.currentNode=M,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),O(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new G(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new Z(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new Q(this.O(k()),this.O(k()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,s){const n=this.strings;let r=!1;if(void 0===n)t=Y(this,t,e,0),r=!O(t)||t!==this._$AH&&t!==B,r&&(this._$AH=t);else{const s=t;let o,a;for(t=n[0],o=0;o<n.length-1;o++)a=Y(this,s[i+o],e,o),a===B&&(a=this._$AH[o]),r||=!O(a)||a!==this._$AH[o],a===W?t=W:t!==W&&(t+=(a??"")+n[o+1]),this._$AH[o]=a}r&&!s&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class et extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class it extends X{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=Y(this,t,e,0)??W)===B)return;const i=this._$AH,s=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==W&&(i===W||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}}const nt=w.litHtmlPolyfillSupport;nt?.(Z,Q),(w.litHtmlVersions??=[]).push("3.3.2");const rt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ot extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new Q(e.insertBefore(k(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}}ot._$litElement$=!0,ot.finalized=!0,rt.litElementHydrateSupport?.({LitElement:ot});const at=rt.litElementPolyfillSupport;at?.({LitElement:ot}),(rt.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const lt={attribute:!0,type:String,converter:f,reflect:!1,hasChanged:v},ht=(t=lt,e,i)=>{const{kind:s,metadata:n}=i;let r=globalThis.litPropertyMetadata.get(n);if(void 0===r&&globalThis.litPropertyMetadata.set(n,r=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,n,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const n=this[s];e.call(this,i),this.requestUpdate(s,n,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ct(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function dt(t){return ct({...t,state:!0,attribute:!1})}const pt=((t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(i,t,s)})`
  :host {
    --wn-primary: var(--primary-color, #03a9f4);
    --wn-primary-light: var(--light-primary-color, #e1f5fe);
    --wn-bg: var(--card-background-color, #fff);
    --wn-text: var(--primary-text-color, #212121);
    --wn-text-secondary: var(--secondary-text-color, #727272);
    --wn-border-radius: var(--ha-card-border-radius, 12px);
  }

  ha-card {
    padding: 16px;
    box-sizing: border-box;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .header .name {
    font-size: 1.1em;
    font-weight: 500;
    color: var(--wn-text);
  }

  .header .status {
    font-size: 0.8em;
    color: var(--wn-text-secondary);
    text-transform: capitalize;
  }

  .noise-selector {
    display: flex;
    gap: 8px;
    justify-content: center;
    margin-bottom: 20px;
  }

  .noise-btn {
    flex: 1;
    padding: 10px 12px;
    border: 2px solid var(--divider-color, #e0e0e0);
    border-radius: 8px;
    background: transparent;
    color: var(--wn-text);
    font-size: 0.9em;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: inherit;
  }

  .noise-btn:hover {
    border-color: var(--wn-primary);
    background: var(--wn-primary-light);
  }

  .noise-btn.active {
    border-color: var(--wn-primary);
    background: var(--wn-primary);
    color: #fff;
  }

  .volume-container {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
    padding: 0 4px;
  }

  .volume-container .label {
    font-size: 0.85em;
    color: var(--wn-text-secondary);
    min-width: 50px;
  }

  .volume-container input[type='range'] {
    flex: 1;
    height: 6px;
    -webkit-appearance: none;
    appearance: none;
    background: var(--divider-color, #e0e0e0);
    border-radius: 3px;
    outline: none;
  }

  .volume-container input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--wn-primary);
    cursor: pointer;
  }

  .volume-container input[type='range']::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--wn-primary);
    cursor: pointer;
    border: none;
  }

  .volume-value {
    font-size: 0.85em;
    color: var(--wn-text-secondary);
    min-width: 35px;
    text-align: right;
  }

  .controls {
    display: flex;
    justify-content: center;
    gap: 12px;
  }

  .play-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: none;
    background: var(--wn-primary);
    color: #fff;
    cursor: pointer;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  .play-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .play-btn:active {
    transform: scale(0.95);
  }

  .play-btn svg {
    width: 24px;
    height: 24px;
    fill: currentColor;
  }

  .stop-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid var(--divider-color, #e0e0e0);
    background: transparent;
    color: var(--wn-text-secondary);
    cursor: pointer;
    transition: all 0.15s ease;
    align-self: center;
  }

  .stop-btn:hover {
    border-color: var(--error-color, #db4437);
    color: var(--error-color, #db4437);
  }

  .stop-btn svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
  }

  .timer-container {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
    padding: 0 4px;
    flex-wrap: wrap;
  }

  .timer-presets {
    display: flex;
    gap: 6px;
    flex: 1;
  }

  .timer-btn {
    padding: 6px 10px;
    border: 1px solid var(--divider-color, #e0e0e0);
    border-radius: 6px;
    background: transparent;
    color: var(--wn-text);
    font-size: 0.8em;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: inherit;
  }

  .timer-btn:hover:not([disabled]) {
    border-color: var(--wn-primary);
  }

  .timer-btn.active {
    border-color: var(--wn-primary);
    background: var(--wn-primary);
    color: #fff;
  }

  .timer-btn[disabled] {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .timer-countdown {
    font-size: 0.9em;
    font-weight: 500;
    color: var(--wn-primary);
    font-variant-numeric: tabular-nums;
  }

  .unavailable {
    text-align: center;
    padding: 16px;
    color: var(--wn-text-secondary);
  }
`,ut=[{id:"white",label:"White",file:"white_noise.mp3"},{id:"brown",label:"Brown",file:"brown_noise.mp3"},{id:"pink",label:"Pink",file:"pink_noise.mp3"},{id:"rain",label:"Rain",file:"rain.mp3"},{id:"rain_combo",label:"Rain+White",file:"rain_combo.mp3"}],_t=[{label:"Off",minutes:0},{label:"1h",minutes:60},{label:"2h",minutes:120},{label:"4h",minutes:240},{label:"8h",minutes:480}],mt="white";class yt{constructor(){this._hass=null,this._entity=""}set hass(t){this._hass=t}set entity(t){this._entity=t}getAudioUrl(t){const e=ut.find(e=>e.id===t),i=e?.file??"white_noise.mp3";return`${this._hass?window.location.origin:"http://10.0.0.3:8123"}/local/white-noise/${i}`}async play(t){if(!this._hass||!this._entity)return void console.error("[white-noise-card] No hass or entity",!!this._hass,this._entity);const e=this.getAudioUrl(t);console.log("[white-noise-card] Playing:",{entity:this._entity,url:e,noiseType:t});try{await this._hass.callService("music_assistant","play_announcement",{entity_id:this._entity,url:e}),console.log("[white-noise-card] Service call succeeded")}catch(t){throw console.error("[white-noise-card] Service call failed:",t),t}}async stop(){this._hass&&this._entity&&await this._hass.callService("media_player","media_stop",{entity_id:this._entity})}async setVolume(t){this._hass&&this._entity&&await this._hass.callService("media_player","volume_set",{entity_id:this._entity,volume_level:t/100})}getEntityState(){return this._hass&&this._entity?this._hass.states[this._entity]?.state??"unavailable":"unavailable"}getEntityVolume(){if(!this._hass||!this._entity)return null;const t=this._hass.states[this._entity]?.attributes?.volume_level;return"number"==typeof t?Math.round(100*t):null}}console.info("%c WHITE-NOISE-CARD %c v1.0.0 ","color: white; background: #03a9f4; font-weight: bold; padding: 2px 4px;","color: #03a9f4; background: white; font-weight: bold; padding: 2px 4px;");let gt=class extends ot{constructor(){super(...arguments),this._noiseType=mt,this._volume=50,this._isPlaying=!1,this._timerMinutes=0,this._timerRemaining=0,this._audioManager=new yt,this._volumeTimeout=null,this._userActionTime=0,this._loopTimeout=null,this._timerInterval=null,this._timerEndTime=0}setConfig(t){if(!t.entity)throw new Error("You must specify an entity (media_player)");this._config=t,this._audioManager.entity=t.entity,this._noiseType=t.default_noise??mt,this._volume=t.default_volume??50,this._loadState()}getCardSize(){return 4}static getConfigElement(){return document.createElement("white-noise-card-editor")}static getStubConfig(){return{entity:"",name:"White Noise"}}disconnectedCallback(){super.disconnectedCallback(),this._clearLoopTimeout(),this._clearTimer()}updated(t){super.updated(t),t.has("hass")&&this.hass&&(this._audioManager.hass=this.hass,this._syncFromEntity())}_syncFromEntity(){const t=this._audioManager.getEntityState(),e=Date.now()-this._userActionTime<1e4;"playing"===t?this._isPlaying=!0:e||"idle"!==t&&"off"!==t&&"paused"!==t||(this._isPlaying=!1),this._isPlaying&&!e&&"idle"===t&&this._scheduleLoop()}_scheduleLoop(){this._loopTimeout||(console.log("[white-noise-card] Scheduling loop replay"),this._loopTimeout=setTimeout(async()=>{if(this._loopTimeout=null,this._isPlaying){this._userActionTime=Date.now();try{await this._audioManager.play(this._noiseType),await this._audioManager.setVolume(this._volume),console.log("[white-noise-card] Loop replay triggered")}catch(t){console.error("[white-noise-card] Loop replay failed:",t)}}},2e3))}_clearLoopTimeout(){this._loopTimeout&&(clearTimeout(this._loopTimeout),this._loopTimeout=null)}_storageKey(){return`white-noise-card-${this._config.entity}`}_loadState(){try{const t=localStorage.getItem(this._storageKey());if(t){const e=JSON.parse(t);e.noise_type&&(this._noiseType=e.noise_type),"number"==typeof e.volume&&(this._volume=e.volume)}}catch{}}_saveState(){try{localStorage.setItem(this._storageKey(),JSON.stringify({noise_type:this._noiseType,volume:this._volume}))}catch{}}async _handleNoiseSelect(t){this._noiseType=t,this._saveState(),this._isPlaying&&(this._userActionTime=Date.now(),await this._audioManager.play(t))}async _handlePlayPause(){if(this._isPlaying)await this._stopPlayback();else try{await this._audioManager.setVolume(this._volume),await this._audioManager.play(this._noiseType),this._isPlaying=!0,this._userActionTime=Date.now()}catch(t){console.error("[white-noise-card] Play failed:",t),this._isPlaying=!1}this._saveState()}async _stopPlayback(){this._clearLoopTimeout(),this._clearTimer(),await this._audioManager.stop(),this._isPlaying=!1,this._timerMinutes=0,this._timerRemaining=0}async _handleStop(){await this._stopPlayback()}_handleVolumeChange(t){const e=t.target;this._volume=parseInt(e.value,10),this._saveState(),this._volumeTimeout&&clearTimeout(this._volumeTimeout),this._volumeTimeout=setTimeout(async()=>{await this._audioManager.setVolume(this._volume),this._volumeTimeout=null},150)}_handleTimerSelect(t){this._clearTimer(),this._timerMinutes=t,0!==t?(this._timerEndTime=Date.now()+60*t*1e3,this._timerRemaining=60*t,this._timerInterval=setInterval(()=>{const t=Math.max(0,Math.round((this._timerEndTime-Date.now())/1e3));this._timerRemaining=t,t<=0&&this._stopPlayback()},1e3)):this._timerRemaining=0}_clearTimer(){this._timerInterval&&(clearInterval(this._timerInterval),this._timerInterval=null)}_formatTime(t){const e=Math.floor(t/3600),i=Math.floor(t%3600/60),s=t%60;return e>0?`${e}:${String(i).padStart(2,"0")}:${String(s).padStart(2,"0")}`:`${i}:${String(s).padStart(2,"0")}`}render(){if(!this._config||!this.hass)return W;const t=this._audioManager.getEntityState();if("unavailable"===t)return V`
        <ha-card>
          <div class="unavailable">
            Speaker unavailable: ${this._config.entity}
          </div>
        </ha-card>
      `;const e=this._config.name??this.hass.states[this._config.entity]?.attributes?.friendly_name??"White Noise";return V`
      <ha-card>
        <div class="header">
          <span class="name">${e}</span>
          <span class="status">${this._isPlaying?"playing":t}</span>
        </div>

        <div class="noise-selector">
          ${ut.map(t=>V`
              <button
                class="noise-btn ${this._noiseType===t.id?"active":""}"
                @click=${()=>this._handleNoiseSelect(t.id)}
              >
                ${t.label}
              </button>
            `)}
        </div>

        <div class="volume-container">
          <span class="label">Volume</span>
          <input
            type="range"
            min="0"
            max="100"
            .value=${String(this._volume)}
            @input=${this._handleVolumeChange}
          />
          <span class="volume-value">${this._volume}%</span>
        </div>

        <div class="timer-container">
          <span class="label">Timer</span>
          <div class="timer-presets">
            ${_t.map(t=>V`
                <button
                  class="timer-btn ${this._timerMinutes===t.minutes?"active":""}"
                  @click=${()=>this._handleTimerSelect(t.minutes)}
                  ?disabled=${!this._isPlaying&&t.minutes>0}
                >
                  ${t.label}
                </button>
              `)}
          </div>
          ${this._timerRemaining>0?V`<span class="timer-countdown">${this._formatTime(this._timerRemaining)}</span>`:W}
        </div>

        <div class="controls">
          <button class="play-btn" @click=${this._handlePlayPause}>
            ${this._isPlaying?V`<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`:V`<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`}
          </button>
          ${this._isPlaying?V`
                <button class="stop-btn" @click=${this._handleStop}>
                  <svg viewBox="0 0 24 24"><path d="M6 6h12v12H6z"/></svg>
                </button>
              `:W}
        </div>
      </ha-card>
    `}};gt.styles=pt,t([ct({attribute:!1})],gt.prototype,"hass",void 0),t([dt()],gt.prototype,"_config",void 0),t([dt()],gt.prototype,"_noiseType",void 0),t([dt()],gt.prototype,"_volume",void 0),t([dt()],gt.prototype,"_isPlaying",void 0),t([dt()],gt.prototype,"_timerMinutes",void 0),t([dt()],gt.prototype,"_timerRemaining",void 0),gt=t([(t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)})("white-noise-card")],gt),window.customCards=window.customCards||[],window.customCards.push({type:"white-noise-card",name:"White Noise Card",description:"Turn connected speakers into a white noise machine",preview:!0});export{gt as WhiteNoiseCard};
