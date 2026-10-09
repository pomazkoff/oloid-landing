(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class{context;SETTLE_THRESHOLD_SQ=.01;smoothingFactor;lastMouseX=0;lastMouseY=0;lastMouseTime=0;_lerpStepXArgs={from:0,to:0,progress:0};_lerpStepYArgs={from:0,to:0,progress:0};constructor(e=.1,t){this.smoothingFactor=e,this.context=t,this.onSettingsChange({isDesktop:t.data.viewport.windowWidth>1024,isForceRebuild:!1,widthChanged:!0,heightChanged:!0,scrollHeightChanged:!0})}onMouseMove(e){let t=this.context.data.cursor;t.targetX=e.clientX,t.targetY=e.clientY;let n=performance.now(),r=Math.max(1,n-this.lastMouseTime);t.velocityX=(e.clientX-this.lastMouseX)/r,t.velocityY=(e.clientY-this.lastMouseY)/r,this.lastMouseX=e.clientX,this.lastMouseY=e.clientY,this.lastMouseTime=n}onFrame(){let e=this.context.data.cursor,t=e.targetX,n=e.targetY,r=e.smoothedX,i=e.smoothedY;this._lerpStepXArgs.from=r,this._lerpStepXArgs.to=t,this._lerpStepXArgs.progress=this.smoothingFactor,this._lerpStepYArgs.from=i,this._lerpStepYArgs.to=n,this._lerpStepYArgs.progress=this.smoothingFactor;let a=this.context.tools.lerp.process(this._lerpStepXArgs),o=this.context.tools.lerp.process(this._lerpStepYArgs);a*a+o*o<this.SETTLE_THRESHOLD_SQ?(e.smoothedX=t,e.smoothedY=n,e.stepX=0,e.stepY=0):(e.smoothedX+=a,e.smoothedY+=o,e.stepX=a,e.stepY=o)}onSettingsChange(e){let t=Number(this.context.settings[`cursor-lerp`]);this.setLerpFactor(t)}setLerpFactor(e){this.smoothingFactor=this.context.tools.adaptiveLerp.process({value:e,inMin:.1,inMax:1,outMin:.05,outMax:.65})}},t=class{listeners={};stateEvents=new Set;lastPayloads={};constructor(){this.stateEvents.add(`screen:mobile`),this.stateEvents.add(`screen:tablet`),this.stateEvents.add(`screen:laptop`),this.stateEvents.add(`screen:desktop`),this.stateEvents.add(`start`)}registerStateEvent(e,t){this.stateEvents.add(e),t!==void 0&&(this.lastPayloads[e]=t)}on(e,t,n){let r=n?`${e}:${n}`:e;this.listeners[r]||(this.listeners[r]=new Set),this.listeners[r].add(t),this.stateEvents.has(r)&&this.lastPayloads[r]!==void 0&&t(this.lastPayloads[r])}off(e,t,n){let r=n?`${e}:${n}`:e;this.listeners[r]&&this.listeners[r].delete(t)}emit(e,t){this.stateEvents.has(e)&&(this.lastPayloads[e]=t);let n=this.listeners[e];if(n)for(let e of n)e(t)}onProgress(e,t){this.on(`progress:${e}`,t)}emitProgress(e,t){this.emit(`progress:${e}`,t)}onInview(e,t){this.on(`object:inview:${e}`,t)}emitInview(e,t){this.emit(`object:inview:${e}`,t)}onScroll(e){this.on(`scroll`,e)}emitScroll(e){this.emit(`scroll`,e)}onUpdate(e){this.on(`update`,e)}emitUpdate(){this.emit(`update`)}clear(e){delete this.listeners[e]}clearAll(){this.listeners={}}},n=class{constructor(e){this.data=e}modules=[];uiModules=[];allModules=[];register(e){if(e.type===1?this.modules.push(e):e.type===2&&this.uiModules.push(e),e.cssProperties&&e.cssProperties.length>0&&typeof window.CSS<`u`&&`registerProperty`in window.CSS)for(let t=0;t<e.cssProperties.length;t++)try{window.CSS.registerProperty(e.cssProperties[t])}catch{}e.onSubscribe(),this.rebuildAllModules()}find(e){for(let t=0;t<this.allModules.length;t++){let n=this.allModules[t];if(n instanceof e)return n}}onInit(){this.callAll(`onInit`)}onFrame(){this.callAll(`onFrame`)}onMutate(){this.callAll(`onMutate`)}onScrollMeasure(){this.callAll(`onScrollMeasure`)}onMouseMoveMeasure(){this.callAll(`onMouseMoveMeasure`)}onScroll(){this.callAll(`onScroll`)}onResizeWidth(){this.callAll(`onResizeWidth`)}onResize(){this.callAll(`onResize`)}onRebuild(){this.callAll(`onRebuild`)}onMouseMove(e){this.callAll(`onMouseMove`,e)}onWheel(e){this.callAll(`onWheel`,e)}onDirectionChange(){this.callAll(`onDirectionChange`)}onScrollStart(){this.callAll(`onScrollStart`)}onScrollStop(){this.callAll(`onScrollStop`)}onAxisChange(){this.callAll(`onAxisChange`)}onDeviceChange(){this.callAll(`onDeviceChange`)}onScrollConfigChange(){this.callAll(`onScrollConfigChange`)}onSettingsChange(e){this.callAll(`onSettingsChange`)}onDOMMutate(e,t){this.callAll(`onDOMMutate`,e,t)}destroy(){this.callAll(`onUnsubscribe`),this.callAll(`destroy`),this.modules=[],this.uiModules=[],this.allModules=[]}get all(){return this.allModules}get core(){return this.modules}get ui(){return this.uiModules}callAll(e,t,n){this.modules.length>0&&this.callLifecycleStrict(this.modules,e,t,n),this.uiModules.length>0&&this.callLifecycleStrict(this.uiModules,e,t,n)}callLifecycleStrict(e,t,n,r){let i=e.length;switch(t){case`onFrame`:case`onMutate`:case`onScrollMeasure`:case`onMouseMoveMeasure`:case`onScroll`:for(let n=0;n<i;n++){let r=e[n];r&&r[t](this.data)}break;case`onDOMMutate`:for(let a=0;a<i;a++){let i=e[a];i&&i[t](n,r)}break;case`onMouseMove`:case`onWheel`:for(let r=0;r<i;r++){let i=e[r];i&&i[t](n)}break;default:for(let n=0;n<i;n++){let r=e[n];r&&r[t]()}}}rebuildAllModules(){this.allModules.length=0;for(let e=0;e<this.modules.length;e++)this.allModules.push(this.modules[e]);for(let e=0;e<this.uiModules.length;e++)this.allModules.push(this.uiModules[e])}},r=class{constructor(e,t,n){this.parent=n,this.id=e,this.htmlElement=t}id;htmlElement;properties=new Map;easingFn;get parentObject(){return this.parent}setProperty(e,t){this.properties.set(e,t)}getProperty(e){return this.properties.get(e)??null}setEasing(e){this.easingFn=e??void 0}getEasing(){return this.easingFn}applyProgress(e,t){let n=this.easingFn??t;return n?n(e):e}},i=class{htmlElement;id=``;keys=[];tokens=[];mirrors=new Map;_cachedMirrorObjects=[];_cachedConnects=[];_mirrorsDirty=!1;properties=new Map;modules=[];events=new t;eventNameCache=new Map;eventNameSuffixCache=new Map;constructor(e,t){this.htmlElement=t,this.id=e}getScopedEventName(e,t){if(t==null){let t=this.eventNameCache.get(e);if(t)return t;let n=`${e}:${this.id}`;return this.eventNameCache.set(e,n),n}let n=this.eventNameSuffixCache.get(e);n||(n=new Map,this.eventNameSuffixCache.set(e,n));let r=n.get(t);if(r)return r;let i=`${e}:${this.id}:${t}`;return n.set(t,i),i}setProperty(e,t){this.properties.set(e,t)}getProperty(e){return this.properties.get(e)??null}enter(){this.events.emit(`enter`,this),this.setProperty(`is-entered`,!0),this.modules.forEach(e=>{e.enterObject(this.id,this)})}leave(){this.events.emit(`leave`,this),this.setProperty(`is-entered`,!1),this.modules.forEach(e=>{e.exitObject(this.id)})}remove(){this.modules.forEach(e=>{e.removeObject(this.id)})}setInviewAutoBlocked(e){this.setProperty(`inview-auto-blocked`,e)}isInviewAutoBlocked(){return this.getProperty(`inview-auto-blocked`)===!0}setInviewManualActive(e){this.setProperty(`inview-manual-active`,e)}isInviewManualActive(){return this.getProperty(`inview-manual-active`)===!0}syncInviewClass(){if(this.isInviewAutoBlocked()){this.htmlElement.classList.remove(`-inview`);return}if(this.isInviewManualActive()){this.htmlElement.classList.add(`-inview`);return}if(this.getProperty(`is-inview`)===!0){this.htmlElement.classList.add(`-inview`);return}this.getProperty(`repeat`)&&this.htmlElement.classList.remove(`-inview`)}show(){this.isInviewAutoBlocked()||this.htmlElement.classList.add(`-inview`)}hide(){if(this.isInviewAutoBlocked()){this.htmlElement.classList.remove(`-inview`);return}this.isInviewManualActive()||this.getProperty(`repeat`)&&this.htmlElement.classList.remove(`-inview`)}connect(e){return!this.modules.includes(e)&&(this.modules.push(e),!0)}disconnect(e){let t=this.modules.indexOf(e);return t!==-1&&(this.modules.splice(t,1),!0)}isConnectedTo(e){return this.modules.includes(e)}setTokens(e){this.tokens=e,this.keys=e.map(e=>e.key)}getToken(e){for(let t=0;t<this.tokens.length;t++)if(this.tokens[t].key===e)return this.tokens[t];return null}updateMirrorsCache(){if(this._mirrorsDirty){this._cachedMirrorObjects=Array.from(this.mirrors.values());let e=this._cachedMirrorObjects.length;this._cachedConnects=Array(e);for(let t=0;t<e;t++)this._cachedConnects[t]=this._cachedMirrorObjects[t].htmlElement;this._mirrorsDirty=!1}}addMirror(e){this.mirrors.has(e.id)||(this.mirrors.set(e.id,e),this._mirrorsDirty=!0)}removeMirror(e){this.mirrors.delete(e)&&(this._mirrorsDirty=!0)}get mirrorObjects(){return this.updateMirrorsCache(),this._cachedMirrorObjects}get connects(){return this.updateMirrorsCache(),this._cachedConnects}},a=class{readQueue=[];writeQueue=[];computeQueue=[];isProcessing=!1;pendingFrame=null;rectCache=new WeakMap;dimensionCache=new WeakMap;scheduleRead(e,t=0){this.readQueue.push({priority:t,execute:e}),this.scheduleFlush()}scheduleCompute(e,t=0){this.computeQueue.push({priority:t,execute:e}),this.scheduleFlush()}scheduleWrite(e,t=0){this.writeQueue.push({priority:t,execute:e}),this.scheduleFlush()}batchModuleInitialization(e){e.forEach(({module:e,object:t,element:n,attributes:r,globalId:i})=>{this.scheduleRead(()=>{let a=n.getBoundingClientRect();this.rectCache.set(n,a),this.dimensionCache.set(n,{width:n.offsetWidth||n.clientWidth||a.width,height:n.offsetHeight||n.clientHeight||a.height}),e.initializeObject(i,t,n,r)},1)}),e.forEach(({module:e,object:t,windowSize:n})=>{this.scheduleCompute(()=>{e.calculatePositions(t,n)},2)}),e.forEach(({module:e,object:t})=>{this.scheduleWrite(()=>{e.connectObject(t),e.addObject(t.id,t)},3)})}getCachedRect(e){return this.rectCache.get(e)}getCachedDimensions(e){return this.dimensionCache.get(e)}scheduleFlush(){this.pendingFrame!==null||this.isProcessing||(this.pendingFrame=requestAnimationFrame(()=>{this.flush()}))}flush(){this.isProcessing=!0,this.pendingFrame=null;let e=(e,t)=>t.priority-e.priority;try{[...this.readQueue].sort(e).forEach(e=>{try{e.execute()}catch(e){console.error(`[DOMBatcher] Read task error:`,e)}}),this.readQueue=[],[...this.computeQueue].sort(e).forEach(e=>{try{e.execute()}catch(e){console.error(`[DOMBatcher] Compute task error:`,e)}}),this.computeQueue=[],[...this.writeQueue].sort(e).forEach(e=>{try{e.execute()}catch(e){console.error(`[DOMBatcher] Write task error:`,e)}}),this.writeQueue=[]}finally{this.rectCache=new WeakMap,this.dimensionCache=new WeakMap,this.isProcessing=!1}}flushSync(){this.pendingFrame!==null&&(cancelAnimationFrame(this.pendingFrame),this.pendingFrame=null),this.flush()}clear(){this.pendingFrame!==null&&(cancelAnimationFrame(this.pendingFrame),this.pendingFrame=null),this.readQueue=[],this.writeQueue=[],this.computeQueue=[],this.rectCache=new WeakMap,this.dimensionCache=new WeakMap}},o=class{desktop={rebuild:{width:!0,height:!0,scrollHeight:!0}};mobile={rebuild:{width:!0,height:!0,scrollHeight:!0}}},s=Object.freeze({}),c=class{attributesToMap;cssProperties=[];objectMapOnPage=new Map;allObjectMapOnPage=new Map;objectsOnPage=[];allObjectsOnPage=[];objectMap=new Map;allObjectMap=new Map;objects=[];allObjects=[];activeObjects=new Set;wake(e){this.activeObjects.add(e)}sleep(e){this.activeObjects.delete(e)}htmlKey=``;defaultModeScope=`all`;_type=1;get type(){return this._type}get key(){return this.htmlKey}tools;data;settings;events;centers;hover;objectManager;signals;scrollScopes;permissions=new o;constructor(e){this.tools=e.tools,this.data=e.data,this.settings=e.settings,this.events=e.events,this.centers=e.centers,this.hover=e.hover,this.objectManager=e.objectManager,this.signals=e.signals,this.scrollScopes=e.scrollScopes,this.attributesToMap=[{key:`active`,type:`boolean`,fallback:this.settings.active},{key:`fixed`,type:`boolean`,fallback:this.settings.fixed},{key:`outside-container`,type:`boolean`,fallback:this.settings[`outside-container`]},{key:`repeat`,type:`boolean`,fallback:this.settings.repeat},{key:`self-disable`,type:`boolean`,fallback:this.settings[`self-disable`]},{key:`abs`,type:`boolean`,fallback:this.settings.abs},{key:`key`,type:`string`,fallback:this.settings.key},{key:`offset-top`,type:`dimension`,fallback:this.settings[`offset-top`]},{key:`offset-bottom`,type:`dimension`,fallback:this.settings[`offset-bottom`]},{key:`offset-enter`,type:`dimension`,fallback:this.settings[`offset-enter`]},{key:`offset-exit`,type:`dimension`,fallback:this.settings[`offset-exit`]},{key:`inview-top`,type:`dimension`,fallback:this.settings[`inview-top`]},{key:`inview-bottom`,type:`dimension`,fallback:this.settings[`inview-bottom`]},{key:`start`,type:`number`,fallback:(e,t,n)=>{let r=n.top;return Math.floor(r)+this.data.scroll.transformedCurrent}},{key:`end`,type:`number`,fallback:(e,t,n)=>n.top+n.height-this.data.scroll.transformedCurrent},{key:`size`,type:`number`,fallback:(e,t,n)=>n.height},{key:`half-width`,type:`number`,fallback:(e,t,n)=>n.width/2},{key:`half-height`,type:`number`,fallback:(e,t,n)=>n.height/2},{key:`enter-el`,type:`string`,fallback:this.settings[`enter-el`]},{key:`enter-vp`,type:`string`,fallback:this.settings[`enter-vp`]},{key:`exit-el`,type:`string`,fallback:this.settings[`exit-el`]},{key:`exit-vp`,type:`string`,fallback:this.settings[`exit-vp`]}]}initializeObject(e,t,n,r){let i=this.tools.boundingClientRect.process({element:n});for(let{key:e,type:a,fallback:o,transform:s}of this.attributesToMap){let c=typeof o==`function`?o(n,t,i):o,l=r[e]??r[`string-${e}`]??r[`data-string-${e}`],u=this.tools.domAttribute.process({element:n,key:e,fallback:l??this.settings[e]??c}),d=this.parseAttribute(u,a,{element:n,boundingRect:i,viewportHeight:this.data.viewport.windowHeight,baseRem:this.data.viewport.baseRem});s&&(d=s(d)),t.setProperty(e,d)}this.cacheLayoutSnapshot(t,n)}cacheLayoutSnapshot(e,t){let n=this.data.scroll.container??document.body??document.documentElement,r=this.data.scroll.elementContainer??document.documentElement,i=this.tools.transformNullify.process({element:t}),a=window.getComputedStyle(t),o=this.getOffsetSize(t,a),s=0,c=0,l=i.width,u=i.height;if((!Number.isFinite(l)||l<=0)&&(l=o.width),(!Number.isFinite(u)||u<=0)&&(u=o.height),Number.isFinite(i.left)&&Number.isFinite(i.top)&&i.width>0&&i.height>0){if(n===document.body||n===document.documentElement)s=i.left+r.scrollLeft,c=i.top+r.scrollTop;else{let e=n.getBoundingClientRect();s=i.left-e.left+n.scrollLeft,c=i.top-e.top+n.scrollTop}}else{let e=this.getOffsetChainPosition(t);if(n===document.body||n===document.documentElement)s=e.left,c=e.top;else{let t=this.getOffsetChainPosition(n);s=e.left-t.left+n.scrollLeft,c=e.top-t.top+n.scrollTop}}e.setProperty(`layout-doc-left`,s),e.setProperty(`layout-doc-top`,c),e.setProperty(`layout-width`,l),e.setProperty(`layout-height`,u),e.setProperty(`layout-border-radius`,a.borderRadius||`0px`)}getOffsetSize(e,t){let n=parseFloat(t.width),r=parseFloat(t.height);return{width:e.offsetWidth||e.clientWidth||(Number.isFinite(n)?n:0),height:e.offsetHeight||e.clientHeight||(Number.isFinite(r)?r:0)}}getOffsetChainPosition(e){let t=0,n=0,r=e;for(;r;)t+=r.offsetLeft||0,n+=r.offsetTop||0,r=r.offsetParent;return{left:t,top:n}}calculatePositions(e,t){let n=e.getProperty(`start`),r=e.getProperty(`size`),i=e.getProperty(`offset-enter`)??e.getProperty(`offset-bottom`),a=e.getProperty(`offset-exit`)??e.getProperty(`offset-top`),o=e.getProperty(`enter-el`),s=e.getProperty(`enter-vp`),c=e.getProperty(`exit-el`),l=e.getProperty(`exit-vp`),u=-0,d=-0,f=-0,p=-0;o===`top`&&s===`top`||o===`left`&&s===`left`?(f=-t+1,u=n-i):o===`top`&&s===`bottom`||o===`left`&&s===`right`?u=n-t-i:o===`bottom`&&s===`top`||o===`right`&&s===`left`?(f=-t-r+1,u=n+r-i):(o===`bottom`&&s===`bottom`||o===`right`&&s===`right`)&&(f=-r+1,u=n-t+r-i),c===`top`&&l===`top`||c===`left`&&l===`left`?(p=-r+1,d=n+a):c===`top`&&l===`bottom`||c===`left`&&l===`right`?(p=-t-r+1,d=n-t+a):c===`bottom`&&l===`top`||c===`right`&&l===`left`?d=n+r+a:(c===`bottom`&&l===`bottom`||c===`right`&&l===`right`)&&(p=-t+1,d=n-t+r+a),e.setProperty(`start-bias`,f),e.setProperty(`end-bias`,p),e.setProperty(`start-position`,u-this.data.scroll.topPosition),e.setProperty(`end-position`,d-this.data.scroll.topPosition),e.setProperty(`difference-position`,d-u);let m=e.getProperty(`inview-top`)??-0,h=e.getProperty(`inview-bottom`)??-0;e.setProperty(`inview-start-position`,e.getProperty(`start-position`)+m),e.setProperty(`inview-end-position`,e.getProperty(`end-position`)+h)}parseAttribute(e,t,n=s){if(e==null)return null;let r=typeof e==`string`?e:String(e);if(typeof t==`object`&&t.type===`enum`)return t.values.includes(r)?r:t.values[0];switch(t){case`number`:return typeof e==`string`?+e||parseFloat(e):e;case`boolean`:return r===``||r===`true`;case`json`:try{return JSON.parse(r)}catch{return null}case`tuple`:return r.trim().split(/\s+/);case`easing`:return this.tools.easingFunction.process({easing:r});case`color`:return this.tools.colorParser.process({value:r});case`dimension`:return e===0||e==`0`?0:n.element!=null&&n.viewportHeight!=null&&n.baseRem!=null&&n.boundingRect!=null?this.tools.unitParser.process({value:e,element:n.element,viewportHeight:n.viewportHeight,boundingRect:n.boundingRect,baseRem:n.baseRem}):0;case`breakpoint-dimension`:if(n.element!=null&&n.viewportHeight!=null&&n.baseRem!=null&&n.boundingRect!=null){let e=r.trim().split(`|`),t=[];for(let r of e)if(r.includes(`:`)){let[e,i]=r.split(`:`);t.push({breakpoint:parseInt(e),value:this.tools.unitParser.process({value:`${i}|`,element:n.element,viewportHeight:n.viewportHeight,boundingRect:n.boundingRect,baseRem:n.baseRem})})}else t.push({breakpoint:0,value:this.tools.unitParser.process({value:r,element:n.element,viewportHeight:n.viewportHeight,boundingRect:n.boundingRect,baseRem:n.baseRem})});return t}default:return e}}canConnect(e){return e.keys.includes(this.htmlKey)}isTokenEnabledInCurrentMode(e){let t=this.data.scroll.mode;return e.modeSpec.kind===`all`?!0:e.modeSpec.kind===`include`?e.modeSpec.values.includes(t):this.defaultModeScope===`all`||this.defaultModeScope.includes(t)}isObjectEnabledInCurrentMode(e){let t=e.getToken(this.htmlKey);return t?this.isTokenEnabledInCurrentMode(t):!1}disconnectObject(e){e.disconnect(this)}connectObject(e){e.connect(this)&&this.onObjectConnected(e)}enterObject(e,t){this.allObjectMap.has(e)||(this.allObjectMap.set(e,t),this.allObjects.push(t)),this.isObjectEnabledInCurrentMode(t)&&!this.objectMap.has(e)&&(this.objectMap.set(e,t),this.objects.push(t))}fastRemoveFromArray(e,t){if(t===-1)return;let n=e.length-1;t!==n&&(e[t]=e[n]),e.pop()}exitObject(e){let t=this.objectMap.get(e);if(t){this.objectMap.delete(e);let n=this.objects.indexOf(t);this.fastRemoveFromArray(this.objects,n)}let n=this.allObjectMap.get(e);if(!n)return;this.allObjectMap.delete(e);let r=this.allObjects.indexOf(n);this.fastRemoveFromArray(this.allObjects,r)}addObject(e,t){this.allObjectMapOnPage.has(e)||(this.allObjectMapOnPage.set(e,t),this.allObjectsOnPage.push(t)),this.isObjectEnabledInCurrentMode(t)&&!this.objectMapOnPage.has(e)&&(this.objectMapOnPage.set(e,t),this.objectsOnPage.push(t))}removeObject(e){let t=this.objectMapOnPage.get(e);if(t){this.objectMapOnPage.delete(e);let n=this.objectsOnPage.indexOf(t);this.fastRemoveFromArray(this.objectsOnPage,n)}let n=this.allObjectMapOnPage.get(e);if(!n)return;this.allObjectMapOnPage.delete(e);let r=this.allObjectsOnPage.indexOf(n);this.fastRemoveFromArray(this.allObjectsOnPage,r),this.exitObject(e),this.sleep(n),this.onObjectDisconnected(n)}onObjectConnected(e){}onObjectDisconnected(e){}get respectSelfDisable(){return!0}isPrimaryElementEnabled(e){return!this.respectSelfDisable||e.getProperty(`self-disable`)!==!0}applyToElementAndConnects(e,t,n=t){this.isPrimaryElementEnabled(e)&&t(e.htmlElement),e.mirrorObjects.forEach(e=>n(e.htmlElement,e))}applyVarToElement(e,t,n){this.isPrimaryElementEnabled(e)&&this.tools.styleTxn.setVar(e.htmlElement,t,n)}applyPropToElement(e,t,n){this.isPrimaryElementEnabled(e)&&this.tools.styleTxn.setProp(e.htmlElement,t,n)}applyVarToConnects(e,t,n){for(let r of e.mirrorObjects)this.tools.styleTxn.setVar(r.htmlElement,t,n)}applyPropToConnects(e,t,n){for(let r of e.mirrorObjects)this.tools.styleTxn.setProp(r.htmlElement,t,n)}getObjectEventName(e,t,n){return e.getScopedEventName(t,n)}emitSignal(e,t,n){e.setProperty(`signal:${t}`,n),this.signals.publish(e.id,t,n)}getSignal(e,t){return this.signals.get(e,t)}clearManagedStyles(e){let t=t=>{for(let e=0;e<this.cssProperties.length;e++)t.style.removeProperty(this.cssProperties[e].name);let n=e.getProperty(`key`);typeof n==`string`&&n.length>0&&t.style.removeProperty(n)};t(e.htmlElement);let n=e.mirrorObjects;for(let e=0;e<n.length;e++)t(n[e].htmlElement)}onObjectModeActivated(e){}onObjectModeDeactivated(e){this.clearManagedStyles(e)}rebuildActiveObjectsForCurrentMode(){let e=new Map(this.objectMapOnPage);this.objectMapOnPage=new Map,this.objectsOnPage=[];for(let e=0;e<this.allObjectsOnPage.length;e++){let t=this.allObjectsOnPage[e];this.isObjectEnabledInCurrentMode(t)&&(this.objectMapOnPage.set(t.id,t),this.objectsOnPage.push(t))}this.objectMap=new Map,this.objects=[];for(let e=0;e<this.allObjects.length;e++){let t=this.allObjects[e];this.isObjectEnabledInCurrentMode(t)&&(this.objectMap.set(t.id,t),this.objects.push(t))}e.forEach((e,t)=>{this.objectMapOnPage.has(t)||this.onObjectModeDeactivated(e)}),this.objectMapOnPage.forEach((t,n)=>{e.has(n)||this.onObjectModeActivated(t)})}destroy(){this.objects=[],this.allObjects=[],this.objectMap=new Map,this.allObjectMap=new Map,this.objectsOnPage=[],this.allObjectsOnPage=[],this.objectMapOnPage=new Map,this.allObjectMapOnPage=new Map,this.activeObjects=new Set}onInit(){}onSubscribe(){}onUnsubscribe(){}onFrame(e){}onMutate(e){}onScrollMeasure(e){}onMouseMoveMeasure(e){}onResize(){}onResizeWidth(){}onRebuild(){}onScroll(e){}onDirectionChange(){}onScrollStart(){}onScrollStop(){}onScrollDirectionChange(){}onAxisChange(){}onDeviceChange(){}onScrollConfigChange(){this.rebuildActiveObjectsForCurrentMode()}onSettingsChange(){}onDOMRebuild(){}onMouseMove(e){}onWheel(e){}onDOMMutate(e,t){}},l=class e{constructor(e,t,n,r){this.data=e,this.modules=t,this.events=n,this.tools=r}objects=new Map;connectQueue=[];connectableModulesBuffer=[];mirrors=new Map;mirrorId=1;globalId=1;domBatcher=new a;domBatcherEnabled=!1;inviewStarts=[];inviewEnds=[];inviewActive=new Set;inviewStartIdx=0;inviewEndIdx=0;inviewIndexDirty=!0;lastInviewScrollPos=0;intersectionObserverEnabled=!0;domObserver=null;static DEVTOOLS_ARTIFACT_SELECTOR=`[data-stdg],[data-string-dev-viewport-layer],[data-string-dev-viewport-world]`;get all(){return this.objects}add(e){let t=`string-${this.globalId++}`,n=`string-id`;e.getAttribute(`string-id`)&&(t=e.getAttribute(`string-id`),n=`string-id`),e.getAttribute(`data-string-id`)&&(t=e.getAttribute(`data-string-id`),n=`data-string-id`);let r=t&&this.objects.has(t)?this.objects.get(t):new i(t,e);e.setAttribute(n,r.id);let a=e.getAttribute(`string`)??e.getAttribute(`data-string`);a&&r.setTokens(this.parseStringTokens(a)),e.setAttribute(`string-inited`,``),this.objects.set(r.id,r);let o=this.getAllAttributes(e),s=this.modules.core;for(let t=0;t<s.length;t++){let n=s[t];`setupCoreProperties`in n&&typeof n.setupCoreProperties==`function`&&n.setupCoreProperties(r,e,o)}let l=this.connectableModulesBuffer;l.length=0;let u=this.modules.all,d=null;for(let e=0;e<u.length;e++){let t=u[e];t instanceof c&&t.key===``&&(d=t),t instanceof c&&t.canConnect(r)&&l.push(t)}if(l.length===0&&d&&(r.setProperty(`inview-fallback`,!0),l.push(d)),this.domBatcherEnabled&&l.length>0){let t=Array(l.length);for(let n=0;n<l.length;n++)t[n]={module:l[n],object:r,element:e,attributes:o,globalId:this.globalId,windowSize:this.data.viewport.windowHeight};this.domBatcher.batchModuleInitialization(t),this.domBatcher.scheduleWrite(()=>{this.initObservers(r,e),this.checkInviewForObject(r)})}else{for(let t=0;t<l.length;t++){let n=l[t];n.initializeObject(this.globalId,r,e,o),n.calculatePositions(r,this.data.viewport.windowHeight),n.connectObject(r),n.addObject(r.id,r)}this.initObservers(r,e),this.checkInviewForObject(r)}if(this.connectQueue.length>0){let e=0;for(let t=0;t<this.connectQueue.length;t++){let n=this.connectQueue[t];if(n.id===r.id){this.attachMirrorToObject(r,n.element);continue}this.connectQueue[e++]=n}this.connectQueue.length=e}l.length=0,this.inviewIndexDirty=!0}setDOMBatcherEnabled(e){this.domBatcherEnabled=e,e||this.domBatcher.flushSync()}setIntersectionObserverEnabled(e){if(this.intersectionObserverEnabled!==e){this.intersectionObserverEnabled=e;for(let t of this.objects.values())t.getProperty(`observer-progress`)?.disconnect(),e&&this.initObservers(t,t.htmlElement)}}refreshObservers(){if(this.intersectionObserverEnabled)for(let e of this.objects.values()){let t=e.htmlElement;!t||!t.isConnected||this.initObservers(e,t)}}attachModule(e){this.objects.forEach(t=>{if(!e.canConnect(t))return;let n=t.htmlElement,r=this.getAllAttributes(n);e.initializeObject(this.globalId,t,n,r),e.calculatePositions(t,this.data.viewport.windowHeight),e.connectObject(t),e.addObject(t.id,t),t.getProperty(`is-entered`)===!0&&e.enterObject(t.id,t)})}refreshModuleConnectionsForCurrentMode(){let e=this.modules.all;for(let t of this.objects.values()){let n=t.htmlElement;if(!n||!n.isConnected)continue;let r=null;for(let i=0;i<e.length;i++){let a=e[i];if(!(a instanceof c)||!t.keys.includes(a.key))continue;let o=a.canConnect(t),s=t.isConnectedTo(a);if(o&&!s){r??=this.getAllAttributes(n),a.initializeObject(this.globalId,t,n,r),a.calculatePositions(t,this.data.viewport.windowHeight),a.connectObject(t),a.addObject(t.id,t),t.getProperty(`is-entered`)===!0&&a.enterObject(t.id,t);continue}!o&&s&&(a.exitObject(t.id),a.removeObject(t.id),a.disconnectObject(t))}}}invalidateInviewIndex(){this.inviewIndexDirty=!0}refreshLayoutForRoot(e){if(!e)return;let t=new Set,n=e=>{let n=e.getAttribute(`string-id`)??e.getAttribute(`data-string-id`);if(!n)return;let r=this.objects.get(n);r&&t.add(r)};if(e instanceof HTMLElement){n(e);let t=e.querySelectorAll(`[string-id],[data-string-id]`);for(let e=0;e<t.length;e++)n(t[e])}if(t.size===0)return;let r=this.data.viewport.windowHeight;for(let e of t){let t=e.htmlElement;if(!t||!t.isConnected)continue;let n=this.getAllAttributes(t),i=this.modules.all;for(let a=0;a<i.length;a++){let o=i[a];o instanceof c&&o.canConnect(e)&&(o.initializeObject(this.globalId,e,t,n),o.calculatePositions(e,r))}}this.inviewIndexDirty=!0,this.checkInview()}remove(e){let t=this.objects.get(e);t&&(t.events.clearAll(),t.getProperty(`observer-progress`)?.disconnect(),t.getProperty(`observer-inview`)?.disconnect(),t.htmlElement.removeAttribute(`string-inited`),t.leave(),t.remove(),t.mirrorObjects.forEach(e=>{let t=this.getMirrorIds(e.htmlElement);this.setMirrorIds(e.htmlElement,t.filter(t=>t!==e.id)),this.mirrors.delete(e.id);let n=e.htmlElement.getAttribute(`string-copy-from`)??e.htmlElement.getAttribute(`data-string-copy-from`);n&&this.enqueueConnection(n,e.htmlElement)}),this.objects.delete(e),this.inviewActive.delete(t),this.inviewIndexDirty=!0)}enqueueConnection(e,t){let n=this.splitPipeAndTrim(e);for(let e=0;e<n.length;e++){let r=n[e];this.connectQueue.some(e=>e.id===r&&e.element===t)||this.connectQueue.push({id:r,element:t})}}linkMirror(e,t){let n=this.splitPipeAndTrim(e);for(let e=0;e<n.length;e++){let r=n[e],i=this.objects.get(r);i?this.attachMirrorToObject(i,t):this.enqueueConnection(r,t)}}attachMirrorToObject(e,t){let n=this.getMirrorIds(t);for(let t of n){let n=this.mirrors.get(t);if(n&&n.parentObject===e)return n}let i=`string-mirror-${this.mirrorId++}`,a=new r(i,t,e);this.setMirrorIds(t,[...n,i]),e.addMirror(a),this.mirrors.set(i,a);let o=t.getAttribute(`string-easing`)??t.getAttribute(`data-string-easing`);o&&o.trim().length>0&&(a.setEasing(this.tools.easingFunction.process({easing:o})),a.setProperty(`easing`,o));let s=e.getProperty(`key`),c=e.getProperty(`progress-raw`),l=e.getProperty(`progress-value`);if(typeof c==`number`){let t=e.getProperty(`easing`)??void 0,n=a.applyProgress(c,t);a.setProperty(`progress`,n),s&&this.tools.styleTxn.setVarDirect(a.htmlElement,s,n)}else typeof l==`number`&&(a.setProperty(`progress`,l),s&&this.tools.styleTxn.setVarDirect(a.htmlElement,s,l));return a}detachMirrorByElement(e){let t=this.getMirrorIds(e);t.length!==0&&(t.forEach(e=>this.detachMirrorById(e)),this.clearMirrorIds(e))}detachMirrorById(e){let t=this.mirrors.get(e);t&&(t.parentObject.removeMirror(e),this.mirrors.delete(e))}getMirrorIds(e){let t=e.getAttribute(`string-mirror-id`)??e.getAttribute(`data-string-mirror-id`);return t?this.splitPipeAndTrim(t):[]}setMirrorIds(e,t){if(t.length===0){this.clearMirrorIds(e);return}e.setAttribute(`string-mirror-id`,t.join(`|`))}clearMirrorIds(e){e.removeAttribute(`string-mirror-id`),e.removeAttribute(`data-string-mirror-id`)}getAllAttributes(e){let t={},n=e.attributes;for(let e=0;e<n.length;e++){let r=n[e];t[r.name]=r.value}return t}initObservers(e,t){if(!this.intersectionObserverEnabled)return;let n=e.getProperty(`offset-exit`)??e.getProperty(`offset-top`)??0,r=e.getProperty(`offset-enter`)??e.getProperty(`offset-bottom`)??0;e.getProperty(`observer-progress`)?.disconnect();let i=t=>{t.forEach(t=>{this.events.emit(e.getScopedEventName(`object:activate`),t.isIntersecting),t.isIntersecting?e.enter():e.leave()})},a=e.getProperty(`outside-container`),o=t.getAttribute(`string-outside-container`)??t.getAttribute(`data-string-outside-container`),s=o==null?null:o.trim().toLowerCase(),c=a==null?s===``||s===`true`||s===`1`:a===!0,l=this.data.scroll.container===document.body||c?null:this.data.scroll.container,u=new IntersectionObserver(i,{root:l,rootMargin:`${r+this.data.viewport.windowHeight}px 0px ${n+this.data.viewport.windowHeight}px 0px`,threshold:0});u.observe(t),e.setProperty(`observer-progress`,u)}observeDOM(){this.domObserver?.disconnect();let e=new MutationObserver(e=>{let t=!1,n=!1;for(let r=0;r<e.length;r++){let i=e[r];if(i.type===`childList`){let e=!1;for(let t=0;t<i.removedNodes.length;t++){let r=i.removedNodes[t];if(r.nodeType!==Node.ELEMENT_NODE)continue;let a=r;if(this.isDevtoolsArtifact(a)||(e=!0,this.detachMirrorByElement(a),this.isFixed(a)))continue;(a.hasAttribute(`string`)||a.hasAttribute(`data-string`))&&(this.handleRemoved(a),n=!0);let o=a.querySelectorAll(`[string],[data-string]`);for(let e=0;e<o.length;e++){let t=o[e];this.isFixed(t)||(this.handleRemoved(t),n=!0)}let s=a.querySelectorAll(`[string-copy-from],[data-string-copy-from]`);for(let e=0;e<s.length;e++)this.detachMirrorByElement(s[e])}for(let t=0;t<i.addedNodes.length;t++){let r=i.addedNodes[t];if(r.nodeType!==Node.ELEMENT_NODE)continue;let a=r;if(this.isDevtoolsArtifact(a)||(e=!0,this.isFixed(a)))continue;a.hasAttribute(`string`)&&!a.hasAttribute(`string-inited`)&&(this.add(a),n=!0);let o=a.querySelectorAll(`[string]:not([string-inited]),[data-string]:not([string-inited])`);for(let e=0;e<o.length;e++)this.add(o[e]),n=!0;let s=a.getAttribute(`string-copy-from`)??a.getAttribute(`data-string-copy-from`);s&&this.linkMirror(s,a);let c=a.querySelectorAll(`[string-copy-from],[data-string-copy-from]`);for(let e=0;e<c.length;e++){let t=c[e],n=t.getAttribute(`string-copy-from`)??t.getAttribute(`data-string-copy-from`);n&&this.linkMirror(n,t)}}e&&(this.modules.onDOMMutate(i.addedNodes,i.removedNodes),t=!0)}}if(t){let e=this.modules.all;for(let t=0;t<e.length;t++)e[t].onDOMRebuild();this.events.emit(`dom:changed`,{stringElementChanged:n})}});e.observe(document.body,{childList:!0,subtree:!0}),this.domObserver=e}handleRemoved(e){let t=e.getAttribute(`string-id`)??e.getAttribute(`data-string-id`);if(!t)return;let n=e.getAttribute(`string-copy-from`)??e.getAttribute(`data-string-copy-from`);n&&(this.connectQueue=this.connectQueue.filter(e=>e.id!==n)),this.remove(t)}onSettingsChange(e){for(let t of this.objects.values()){if(!t.htmlElement||!t.htmlElement.isConnected)continue;let n=null,r=this.modules.all;for(let i=0;i<r.length;i++){let a=r[i],o=!1;e.isDesktop?(a.permissions.desktop.rebuild.scrollHeight&&e.scrollHeightChanged&&(o=!0),a.permissions.desktop.rebuild.width&&e.widthChanged&&(o=!0),a.permissions.desktop.rebuild.height&&e.heightChanged&&(o=!0)):(a.permissions.mobile.rebuild.scrollHeight&&e.scrollHeightChanged&&(o=!0),a.permissions.mobile.rebuild.width&&e.widthChanged&&(o=!0),a.permissions.mobile.rebuild.height&&e.heightChanged&&(o=!0)),(o||e.isForceRebuild)&&a.canConnect(t)&&(n??=this.getAllAttributes(t.htmlElement),a.initializeObject(this.globalId,t,t.htmlElement,n),a.calculatePositions(t,this.data.viewport.windowHeight),a.connectObject(t))}}this.inviewIndexDirty=!0}isFixed(e){return e.hasAttribute(`string-fixed`)}isDevtoolsArtifact(t){return t.closest(e.DEVTOOLS_ARTIFACT_SELECTOR)!=null}checkInview(){let e=this.data.scroll.transformedCurrent;this.updateInviewWindow(e);for(let e of this.inviewActive)this.checkInviewForObject(e)}checkInviewForObject(e){let t=this.data.scroll.transformedCurrent;if(!this.intersectionObserverEnabled){let n=e.getProperty(`start-position`),r=e.getProperty(`end-position`);if(n!=null&&r!=null){let i=Math.min(n,r),a=Math.max(n,r),o=e.getProperty(`is-active`)??!1,s=t>=i&&t<=a;s!==o&&(e.setProperty(`is-active`,s),this.events.emit(e.getScopedEventName(`object:activate`),s),s?e.enter():e.leave())}}let n=e.getProperty(`inview-start-position`),r=e.getProperty(`inview-end-position`),i=e.getProperty(`is-inview`)??!1,a=Math.min(n,r),o=Math.max(n,r),s=t>=a&&t<=o,c=null;!i&&s?c=Math.abs(t-a)<=Math.abs(o-t)?`enter-top`:`enter-bottom`:i&&!s&&(c=t<a?`exit-top`:`exit-bottom`),s!==i&&(e.setProperty(`is-inview`,s),e.setInviewAutoBlocked(!1),e.setInviewManualActive(!1),s?e.show():e.hide(),this.events.emit(e.getScopedEventName(`object:inview`),{inView:s,direction:c}))}updateInviewWindow(e){let t=this.data.viewport.windowHeight,n=e-t,r=e+this.data.viewport.windowHeight+t;for(this.inviewIndexDirty?this.rebuildInviewIndex(n,r):e<this.lastInviewScrollPos&&this.repositionInviewIndex(n,r);this.inviewStartIdx<this.inviewStarts.length&&this.inviewStarts[this.inviewStartIdx].pos<=r;)this.inviewActive.add(this.inviewStarts[this.inviewStartIdx].object),this.inviewStartIdx++;for(;this.inviewEndIdx<this.inviewEnds.length&&this.inviewEnds[this.inviewEndIdx].pos<n;)this.inviewActive.delete(this.inviewEnds[this.inviewEndIdx].object),this.inviewEndIdx++;this.lastInviewScrollPos=e}rebuildInviewIndex(e,t){this.inviewStarts=[],this.inviewEnds=[];for(let e of this.objects.values()){let t=e.getProperty(`inview-start-position`),n=e.getProperty(`inview-end-position`);t==null||n==null||(this.inviewStarts.push({pos:Math.min(t,n),object:e}),this.inviewEnds.push({pos:Math.max(t,n),object:e}))}this.inviewStarts.sort((e,t)=>e.pos-t.pos),this.inviewEnds.sort((e,t)=>e.pos-t.pos),this.repositionInviewIndex(e,t),this.inviewIndexDirty=!1}repositionInviewIndex(e,t){this.inviewActive.clear(),this.inviewStartIdx=this.upperBound(this.inviewStarts,t),this.inviewEndIdx=this.upperBound(this.inviewEnds,e-1);for(let e=0;e<this.inviewStartIdx;e++)this.inviewActive.add(this.inviewStarts[e].object);for(let e=0;e<this.inviewEndIdx;e++)this.inviewActive.delete(this.inviewEnds[e].object)}upperBound(e,t){let n=0,r=e.length;for(;n<r;){let i=n+r>>>1;e[i].pos<=t?n=i+1:r=i}return n}splitPipeAndTrim(e){let t=e.split(`|`),n=[];for(let e=0;e<t.length;e++){let r=t[e].trim();r.length>0&&n.push(r)}return n}parseStringTokens(e){let t=this.splitTopLevelPipe(e),n=[];for(let e=0;e<t.length;e++){let r=t[e].trim();if(r.length===0)continue;let i=r.match(/^([^\[\]]+?)(?:\[([^\]]*)\])?$/);if(!i){n.push({raw:r,key:r,modeSpec:{kind:`default`,values:[]}});continue}let a=i[1].trim(),o=i[2];if(!a)continue;if(o==null){n.push({raw:r,key:a,modeSpec:{kind:`default`,values:[]}});continue}let s=o.trim();if(s.length===0){n.push({raw:r,key:a,modeSpec:{kind:`all`,values:[]}});continue}let c=this.splitTopLevelPipe(s).map(e=>e.trim()).filter(e=>e.length>0);n.push({raw:r,key:a,modeSpec:c.length>0?{kind:`include`,values:c}:{kind:`all`,values:[]}})}return n}splitTopLevelPipe(e){let t=[],n=``,r=0;for(let i=0;i<e.length;i++){let a=e[i];if(a===`[`){r++,n+=a;continue}if(a===`]`){r=Math.max(0,r-1),n+=a;continue}if(a===`|`&&r===0){t.push(n),n=``;continue}n+=a}return n.length>0&&t.push(n),t}destroy(){this.domObserver?.disconnect(),this.domObserver=null,this.domBatcher.clear()}},u={SCROLL_FORWARD:`-scroll-forward`,SCROLL_BACKWARD:`-scroll-backward`,SCROLLING_FORWARD:`-scrolling-forward`,SCROLLING_BACKWARD:`-scrolling-backward`},d=class{context;document;name=``;isProg=!1;isParallaxEnabled=!1;_isVertical=!0;_scrollDirState=-1;_lastAppliedDirState=-1;isLastBottomScrollDirection=!0;scrollTriggerRules=[];isActive=!1;set scrollDirection(e){this._isVertical=e===`vertical`}constructor(e){this.document=document,this.context=e}onChangeDirection=()=>{};onScrollStart=()=>{};onScrollStop=()=>{};onCalcUpdate(){if(!this.isActive)return;let e=this.context.data.scroll.scrollContainer,t=this.context.data.scroll.current;e&&(this._isVertical?e.scrollTo({top:t,left:0,behavior:`auto`}):e.scrollTo({left:t,top:0,behavior:`auto`})),this._isVertical&&this.triggerScrollRules()}onFrame(){}onWheel(e){}onScroll(e){}onTouchStart(e){}onTouchMove(e){}onTouchEnd(e){}disableScrollEvents(){}enableScrollEvents(){}activate(){this.isActive||(this.isActive=!0,this.enableScrollEvents())}deactivate(){if(!this.isActive)return;this.isActive=!1,this.disableScrollEvents(),this.isProg=!1;let e=this.context.data.scroll;e.target=e.current,e.delta=0,e.lerped=0,e.displacement=0,this.clearScrollingClasses(),this._scrollDirState=-1,this._lastAppliedDirState=-1,this.onScrollStop()}destroy(){}updateScrollDirection(e){this.isLastBottomScrollDirection=e;let t=+!!e;if(this._scrollDirState===-1){this._scrollDirState=t;return}if(this._scrollDirState=t,this.context.data.scroll.isScrollingDown=e,this.onChangeDirection(),this.context.events.emit(`scroll:direction:change`,e),this.context.settings[`global-class`]&&this._lastAppliedDirState!==t){let n=document.documentElement.classList;e?(n.remove(u.SCROLLING_BACKWARD,u.SCROLL_BACKWARD),n.add(u.SCROLLING_FORWARD,u.SCROLL_FORWARD)):(n.remove(u.SCROLLING_FORWARD,u.SCROLL_FORWARD),n.add(u.SCROLLING_BACKWARD,u.SCROLL_BACKWARD)),this._lastAppliedDirState=t}}clearScrollingClasses(){document.documentElement.classList.remove(u.SCROLLING_BACKWARD,u.SCROLLING_FORWARD,u.SCROLL_BACKWARD,u.SCROLL_FORWARD)}triggerScrollRules(){let e=this.scrollTriggerRules,t=e.length,n=this.context.data.scroll.current,r=this.isLastBottomScrollDirection;for(let i=0;i<t;i++){let t=e[i],a=(t.direction===`any`||r&&t.direction===`forward`||!r&&t.direction===`backward`)&&n>=t.offset;a&&!t.isActive?(t.isActive=!0,t.onEnter?.(),t.toggleClass&&t.toggleClass.target.classList.add(t.toggleClass.className)):!a&&t.isActive&&(t.isActive=!1,t.onLeave?.(),t.toggleClass&&t.toggleClass.target.classList.remove(t.toggleClass.className))}}addScrollMark(e){this.scrollTriggerRules.push(e)}removeScrollMark(e){let t=this.scrollTriggerRules;for(let n=0;n<t.length;n++)if(t[n].id===e){t.splice(n,1);break}}scrollTo(e,t){}},f=class extends d{name=`default`;previousScrollTop=0;previousScrollTime=0;_logScrollCount=0;isScrolling=!1;lastScrollEventTime=0;nativeVelocity=0;nativeVelocityTarget=0;scrollStopDelay=120;nativeVelocityFollow=.2;nativeVelocityDecay=.84;nativeVelocityBoost=2;nativeVelocityDeadzone=.25;constructor(e){super(e)}onFrame(){let e=0;if(this.context.data.scroll.delta!==0){let t=this.context.data.scroll.delta*this.context.data.scroll.speedAccelerate;this.context.data.scroll.delta-=t,e=t,Math.abs(e)<.1&&(this.context.data.scroll.delta=0,e=0)}let t=performance.now();this.nativeVelocityTarget*=this.nativeVelocityDecay,Math.abs(this.nativeVelocityTarget)<this.nativeVelocityDeadzone&&(this.nativeVelocityTarget=0),this.nativeVelocity+=(this.nativeVelocityTarget-this.nativeVelocity)*this.nativeVelocityFollow,Math.abs(this.nativeVelocity)<this.nativeVelocityDeadzone&&(this.nativeVelocity=0),Math.abs(this.nativeVelocity)>Math.abs(e)&&(e=this.nativeVelocity),this.context.data.scroll.lerped=e,this.isScrolling&&this.context.data.scroll.delta===0&&this.nativeVelocityTarget===0&&this.nativeVelocity===0&&t-this.lastScrollEventTime>this.scrollStopDelay&&(this.isScrolling=!1,this.onScrollStop(),this.clearScrollingClasses())}onScroll(e){let t=performance.now(),n=this.context.data.scroll.elementContainer.scrollTop,r=n-this.previousScrollTop;if(this._logScrollCount<8&&this._logScrollCount++,this.context.data.scroll.current=n,this.context.data.scroll.target=n,this.context.data.scroll.transformedCurrent=n*this.context.data.viewport.transformScale,r!==0){this.updateScrollDirection(r>0);let e=this.previousScrollTime===0?16.6667:t-this.previousScrollTime,i=16.6667/Math.max(8,e)*r*this.nativeVelocityBoost;this.nativeVelocityTarget=i,this.previousScrollTop=n,this.previousScrollTime=t}this.triggerScrollRules(),this.lastScrollEventTime=t,this.isScrolling||(this.isScrolling=!0,this.onScrollStart())}onWheel(e){e.deltaY!==0&&(this.context.data.scroll.delta===0&&!this.isScrolling&&(this.isScrolling=!0,this.onScrollStart()),this.context.data.scroll.delta+=e.deltaY,this.lastScrollEventTime=performance.now())}deactivate(){super.deactivate(),this.isScrolling=!1,this.lastScrollEventTime=0,this.previousScrollTop=this.context.data.scroll.current,this.previousScrollTime=0,this.nativeVelocity=0,this.nativeVelocityTarget=0}scrollTo(e,t){let n=this.context.data.scroll.elementContainer.scrollTop,r=this.context.data.scroll;r.target=e,r.delta=0,r.lerped=0,this.nativeVelocity=0,this.nativeVelocityTarget=0,this.previousScrollTop=n,this.previousScrollTime=0,this._logScrollCount=0;let i=this.context.data.scroll.scrollContainer;t?(r.current=e,r.transformedCurrent=e*this.context.data.viewport.transformScale,this.triggerScrollRules(),this._isVertical?i?.scrollTo({top:e,left:0,behavior:`auto`}):i?.scrollTo({left:e,top:0,behavior:`auto`})):(r.current=n,r.transformedCurrent=n*this.context.data.viewport.transformScale,requestAnimationFrame(()=>{this._isVertical?i?.scrollTo({top:e,left:0,behavior:`smooth`}):i?.scrollTo({left:e,top:0,behavior:`smooth`})}))}},p=class extends d{name=`disable`;preventScroll=e=>{e.preventDefault()};preventKeyScroll=e=>{[`ArrowUp`,`ArrowDown`,`PageUp`,`PageDown`,` `,`Home`,`End`].includes(e.key)&&e.preventDefault()};onPreventScroll=this.preventScroll.bind(this);onPreventKeyScroll=this.preventKeyScroll.bind(this);constructor(e){super(e)}enableScrollEvents(){window.addEventListener(`touchmove`,this.onPreventScroll,{passive:!1}),window.addEventListener(`keydown`,this.onPreventKeyScroll)}disableScrollEvents(){window.removeEventListener(`touchmove`,this.onPreventScroll),window.removeEventListener(`keydown`,this.onPreventKeyScroll)}onFrame(){}onWheel(e){e.preventDefault()}onScroll(e){e.preventDefault()}},m=class extends d{name=`smooth`;scrollForce=0;wheelImpulse=0;previousCurrent=0;scrollToSequence=0;activeScrollToId=null;stepResult={current:.1,target:.1,delta:.1,lerped:.1,scrollForce:.1,absVelocity:.1};constructor(e){super(e),this.stepResult.current=0,this.stepResult.target=0,this.stepResult.delta=0,this.stepResult.lerped=0,this.stepResult.scrollForce=0,this.stepResult.absVelocity=0}stopScroll(){let e=this.context.data.scroll;e.lerped=0,e.delta=0,e.target=e.current,this.onCalcUpdate(),this.isProg=!1,this.clearScrollingClasses(),this._scrollDirState=-1,this._lastAppliedDirState=-1,this.activeScrollToId=null}onFrame(){let e=this.context.data.scroll;if(e.delta!==0){this.computeStep(e.current,e.target,e.delta,e.speed,e.speedAccelerate,e.decelerationCoefficient,e.maxDelta,e.bottomPosition,this.stepResult),this.scrollForce=this.stepResult.scrollForce,e.target=this.stepResult.target,e.delta=this.stepResult.delta,e.lerped=this.stepResult.lerped,e.current=this.stepResult.current;let t=this.context.data.viewport.transformScale;e.transformedCurrent=t===1?e.current:e.current*t,this.updateScrollDirection(e.lerped>0),this.stepResult.absVelocity<e.stopThreshold?(e.current=Math.round(e.target),this.previousCurrent=e.current,this.onCalcUpdate(),this.stopScroll(),this.onScrollStop()):(this.isProg=!0,this.previousCurrent!==e.current&&(this.previousCurrent=e.current,this.onCalcUpdate()))}}onWheel(e){if(e.deltaY!==0&&e.preventDefault(),this.wheelImpulse=e.deltaY,this.wheelImpulse===0)return;let t=this.context.data.scroll;t.delta===0&&this.onScrollStart();let n=this.wheelImpulse<0,r=t.target===0&&n,i=t.target===t.bottomPosition&&!n;!r&&!i&&(t.delta+=this.wheelImpulse*t.multiplier)}onScroll(e){if(!this.isProg){let e=this.context.data.scroll,t=e.elementContainer.scrollTop,n=t-e.current;e.current=t,e.target=t,e.delta=0,e.lerped=n,e.displacement=0;let r=this.context.data.viewport.transformScale;e.transformedCurrent=r===1?t:t*r,this.scrollForce=0,this.wheelImpulse=0,this.isProg=!1,this.previousCurrent=t,this.activeScrollToId=null,n!==0&&(this.updateScrollDirection(n>0),this.triggerScrollRules())}}deactivate(){super.deactivate(),this.scrollForce=0,this.wheelImpulse=0,this.previousCurrent=this.context.data.scroll.current}scrollTo(e,t){let n=this.context.data.scroll,r=++this.scrollToSequence;if(this.activeScrollToId=r,t){n.current=e,n.target=e,n.delta=0,n.lerped=0;let t=this.context.data.viewport.transformScale;n.transformedCurrent=t===1?e:e*t,this.onCalcUpdate();return}n.target=e,n.delta=1}computeStep(e,t,n,r,i,a,o,s,c){let l=this.clamp(n,-o,o),u=l*i,d=(1-i)**a,f=Math.min(Math.max(0,t+u),s),p=(f-e)*r,m=l*d;c.current=e+p,c.target=f,c.delta=m,c.lerped=p,c.scrollForce=u,c.absVelocity=Math.abs(p)}clamp(e,t,n){return Math.min(Math.max(e,t),n)}},h=class{constructor(e){this.context=e,this.registerMode(`smooth`,new m(e)),this.registerMode(`default`,new f(e)),this.registerMode(`disable`,new p(e)),this.updateResponsiveMode()}modes=new Map;boundEvents=null;scrollMarks=[];registerMode(e,t){let n=this.context.data.scroll.mode===e,r=this.modes.get(e);r&&(n&&r.deactivate(),r.destroy()),t.name||=String(e),this.modes.set(e,t),this.boundEvents&&(t.onScrollStart=this.boundEvents.onScrollStart,t.onScrollStop=this.boundEvents.onScrollStop,t.onChangeDirection=this.boundEvents.onDirectionChange),this.scrollMarks.length>0&&this.scrollMarks.forEach(e=>t.addScrollMark(e)),n&&t.activate()}setMobileMode(e){this.context.data.scroll.modeMobile=e,this.updateResponsiveMode()}setDesktopMode(e){this.context.data.scroll.modeDesktop=e,this.updateResponsiveMode()}updateResponsiveMode(){let e=window.innerWidth<1024?this.context.data.scroll.modeMobile:this.context.data.scroll.modeDesktop;this.setMode(e)}updatePosition(){this.get().onCalcUpdate()}lockPageScroll(){this.setMode(`disable`)}unlockPageScroll(){this.updateResponsiveMode()}setMode(e){if(!this.modes.has(e)){console.warn(`[ScrollManager] Unknown scroll mode: ${e}`);return}if(this.context.data.scroll.mode===e){this.get().activate();return}this.get().deactivate(),this.context.data.scroll.mode=e,this.get().activate(),this.boundEvents?.onModeChange()}get(){return this.modes.get(this.context.data.scroll.mode)}getEngines(){return this.modes}onFrame(){this.get().onFrame()}onScroll(e){this.get().onScroll(e)}onWheel(e){this.get().onWheel(e)}onTouchStart(e){this.get().onTouchStart(e)}onTouchMove(e){this.get().onTouchMove(e)}onTouchEnd(e){this.get().onTouchEnd(e)}bindEvents(e){this.boundEvents=e,this.modes.forEach(t=>{t.onScrollStart=e.onScrollStart,t.onScrollStop=e.onScrollStop,t.onChangeDirection=e.onDirectionChange})}addScrollMark(e){this.scrollMarks.push(e),this.modes.forEach(t=>{t.addScrollMark(e)})}removeScrollMark(e){this.scrollMarks=this.scrollMarks.filter(t=>t.id!==e),this.modes.forEach(t=>{t.removeScrollMark(e)})}destroy(){this.modes.forEach(e=>{e.deactivate(),e.destroy()})}},g=class{targetX=0;targetY=0;smoothedX=0;smoothedY=0;stepX=0;stepY=0;velocityX=0;velocityY=0},_=class{threeInstance=null},v=class{target=0;current=0;transformedCurrent=0;delta=0;lerped=0;displacement=0;isScrollingDown=!1;topPosition=0;bottomPosition=0;direction=`vertical`;elementContainer=document.documentElement;scrollContainer=window;container=document.body;mode=`smooth`;modeMobile=`default`;modeDesktop=`smooth`;speed=.09;acceleration=.8;speedAccelerate=.42;smoothness=.5;multiplier=1.1;maxDelta=2400;stopThreshold=.08;decelerationCoefficient=1},y=class{fpsTracker=!1;positionTracker=!1;suppressMasonryResize=!1},b=class{now=0;previous=0;delta=0;elapsed=0},x=class{windowWidth=0;windowHeight=0;contentWidth=0;contentHeight=0;scaleWidth=1;scaleHeight=1;transformScale=1;baseRem=16},S=class{scroll=new v;viewport=new x;cursor=new g;render=new _;time=new b;system=new y},C=class{process({element:e}){return e.getBoundingClientRect()}},w=class{process({element:e,key:t,fallback:n=null}){return e.getAttribute(`string-${t}`)??e.getAttribute(`data-string-${t}`)??n}},T=class{process({record:e,name:t,fallback:n=null}){return e[t]??e[`data-${t}`]??n}},E=class{process({element:e}){let t=e.getBoundingClientRect(),n=getComputedStyle(e).transform.match(/-?[\d.]+/g)?.map(parseFloat)??[];if(n.length===6){let[e,r,i,a,o,s]=n,c=e*a-r*i;return{width:t.width/(e||1),height:t.height/(a||1),left:(t.left*a-t.top*i+i*s-o*a)/c,top:(-t.left*r+t.top*e+o*r-e*s)/c}}return t}},D=class{constructor(e=new E){this.transformTool=e}process({element:e,container:t=document.body}){let n;try{n=t.getBoundingClientRect()}catch{n=document.body.getBoundingClientRect()}let r=this.transformTool.process({element:e});return{top:r.top-n.top,left:r.left-n.left}}},O=class{process({from:e,to:t,progress:n}){return(t-e)*n}},k=class{process({value:e,element:t,viewportHeight:n,baseRem:r,boundingRect:i}){let a=(typeof e==`number`?String(e):e).split(`|`).map(e=>e.trim()).filter(Boolean),o=0;for(let e of a){let a=e,s=!1;a.startsWith(`-`)&&(s=!0,a=a.slice(1));let c=0;c=a===`selfHeight`?t.offsetHeight:a.endsWith(`px`)?parseFloat(a):a.endsWith(`%`)?parseFloat(a)/100*n:a.endsWith(`rem`)?parseFloat(a)*r:a.endsWith(`sh`)?parseFloat(a)*i.height/100:parseFloat(a),o+=s?-c:c}return o}},A=class{process({value:e,inMin:t=.1,inMax:n=1,outMin:r=.05,outMax:i=.65}){return e<t?i:(e>1&&(e=1),e<=n?i-(e-t)/(n-t)*(i-r):r)}},j={left:0,center:.5,right:1},M={top:0,center:.5,bottom:1},ee=class{process({value:e}){if(!e)return`center`;let t=e.trim();if(t.startsWith(`random(`)&&t.endsWith(`)`)){let e=t.slice(7,-1).split(`,`).map(e=>e.trim()).filter(Boolean);return e[Math.floor(Math.random()*e.length)]}return t}toNormalized({value:e}){let t=this.process({value:e}).toLowerCase().split(/\s+/).filter(Boolean);if(t.length===0)return{x:.5,y:.5};if(t.length===1){let e=t[0],n=this.parseValue(e);return e in j&&!(e in M)?{x:n,y:.5}:e in M&&!(e in j)?{x:.5,y:n}:{x:n,y:n}}let[n,r]=t,i=n in M&&!(n in j),a=r in j&&!(r in M);return i||a?{x:this.parseValue(r,`horizontal`),y:this.parseValue(n,`vertical`)}:{x:this.parseValue(n,`horizontal`),y:this.parseValue(r,`vertical`)}}parseValue(e,t){if(t===`horizontal`&&e in j)return j[e];if(t===`vertical`&&e in M)return M[e];if(e in j)return j[e];if(e in M)return M[e];if(e.endsWith(`%`)){let t=parseFloat(e);if(!isNaN(t))return t/100}let n=parseFloat(e);return isNaN(n)?.5:n>1?n/100:n}},te=class{process({value:e}){let t=e.trim().toLowerCase();if(t.startsWith(`#`)){let e=t.slice(1);return e.length===3&&(e=e.split(``).map(e=>e+e).join(``)),{r:parseInt(e.slice(0,2),16),g:parseInt(e.slice(2,4),16),b:parseInt(e.slice(4,6),16),a:e.length===8?parseInt(e.slice(6,8),16)/255:1}}let n=t.match(/rgba?\(([^)]+)\)/);if(n){let[e,t,r,i=1]=n[1].split(`,`).map(e=>parseFloat(e.trim()));return{r:e,g:t,b:r,a:i}}let r=t.match(/hsla?\(([^)]+)\)/);if(r){let[e,t,n,i=`1`]=r[1].split(`,`).map(e=>e.trim()),[a,o,s]=this.hslToRgb(parseFloat(e),parseFloat(t),parseFloat(n));return{r:a,g:o,b:s,a:parseFloat(i)}}return{r:0,g:0,b:0,a:0}}hslToRgb(e,t,n){e/=360,t=parseFloat(t.toString())/100,n=parseFloat(n.toString())/100;let r=(e,t,n)=>(n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*(2/3-n)*6:e),i=n<.5?n*(1+t):n+t-n*t,a=2*n-i;return[Math.round(r(a,i,e+1/3)*255),Math.round(r(a,i,e)*255),Math.round(r(a,i,e-1/3)*255)]}},ne=class{namedCurves={linear:[0,0,1,1],ease:[.25,.1,.25,1],"ease-in":[.42,0,1,1],"ease-out":[0,0,.58,1],"ease-in-out":[.42,0,.58,1]};process({easing:e}){let t=e.trim();if(this.namedCurves[t])return this.cubicBezier(...this.namedCurves[t]);let n=t.match(/^cubic-bezier\s*\(\s*([-+]?\d*\.?\d+)\s*,\s*([-+]?\d*\.?\d+)\s*,\s*([-+]?\d*\.?\d+)\s*,\s*([-+]?\d*\.?\d+)\s*\)$/);if(n){let[e,t,r,i]=n.slice(1).map(Number);return this.cubicBezier(e,t,r,i)}return e=>e}cubicBezier(e,t,n,r){let i=3*e,a=3*(n-e)-i,o=1-i-a,s=3*t,c=3*(r-t)-s,l=1-s-c;function u(e){return((o*e+a)*e+i)*e}function d(e){return((l*e+c)*e+s)*e}function f(e){return(3*o*e+2*a)*e+i}function p(e,t=1e-5){let n,r,i=e,a,o,s=0;for(;s<8;s++){if(a=u(i)-e,Math.abs(a)<t)return i;if(o=f(i),Math.abs(o)<1e-6)break;i-=a/o}for(n=0,r=1,i=e;n<r;){if(a=u(i)-e,Math.abs(a)<t)return i;a>0?r=i:n=i,i=(r+n)/2}return i}return function(e){return d(p(e))}}},re=class{process({distance:e,radius:t,strength:n}){return e>=t?0:n*((t-e)/t)}},ie=class{process({from:e,to:t,progress:n}){return{r:e.r+(t.r-e.r)*n,g:e.g+(t.g-e.g)*n,b:e.b+(t.b-e.b)*n,a:e.a+(t.a-e.a)*n}}},ae=class{process({from:e,to:t,progress:n}){return{x:(t.x-e.x)*n,y:(t.y-e.y)*n}}},oe=class{process({value:e}){let t=e?.trim();if(!t||t===`none`)return 1;try{if(t.startsWith(`matrix(`)){let e=t.match(/matrix\(([^)]+)\)/);if(e&&e[1]){let t=e[1].split(`,`).map(e=>parseFloat(e.trim()));if(t.length>=1&&!isNaN(t[0]))return t[0]}}if(t.startsWith(`scale(`)){let e=t.match(/scale\(([^)]+)\)/);if(e&&e[1]){let t=e[1].split(`,`).map(e=>parseFloat(e.trim()));if(t.length>=1&&!isNaN(t[0]))return t[0]}}if(t.startsWith(`scaleX(`)){let e=t.match(/scaleX\(([^)]+)\)/);if(e&&e[1]){let t=parseFloat(e[1].trim());if(!isNaN(t))return t}}if(t.startsWith(`scale3d(`)){let e=t.match(/scale3d\(([^)]+)\)/);if(e&&e[1]){let t=e[1].split(`,`).map(e=>parseFloat(e.trim()));if(t.length>=1&&!isNaN(t[0]))return t[0]}}if(t.startsWith(`matrix3d(`)){let e=t.match(/matrix3d\(([^)]+)\)/);if(e&&e[1]){let t=e[1].split(`,`).map(e=>parseFloat(e.trim()));if(t.length>=1&&!isNaN(t[0]))return t[0]}}}catch(e){return console.error(`Error parsing transform string "${t}":`,e),1}return 1}},se=class{process({attributeValue:e}){let t={segment:`legacy`,line:[],word:[],char:[],charLine:[],charWord:[],wordLine:[],fit:!1,trimInlineGaps:!1};return e&&e.split(`|`).forEach(e=>{let n=e.trim();if(!n)return;let r=n.match(/^([\w-]+)(\[(.*?)\])?$/);if(r){let e=this.toCamelCase(r[1]),i=r[3]||``,a=i.split(`;`).map(e=>e.trim()).filter(e=>e.length>0),o=this.parseParamsArray(a);switch(e){case`segment`:{let e=this.parseSegmentMode(i);e?t.segment=e:console.warn(`SplitOptionsParserTool: Unsupported segment mode "${i}" in part "${n}"`);break}case`line`:t.line.push(o);break;case`word`:t.word.push(o);break;case`char`:t.char.push(o);break;case`charLine`:t.charLine.push(o);break;case`charWord`:t.charWord.push(o);break;case`wordLine`:t.wordLine.push(o);break;case`fit`:t.fit=!0;break;case`trimInlineGaps`:t.trimInlineGaps=!0;break;default:console.warn(`SplitOptionsParserTool: Unrecognized option type "${e}" in part "${n}"`)}}else console.warn(`SplitOptionsParserTool: Could not parse part format "${n}"`)}),t}toCamelCase(e){return e.replace(/-([a-z])/g,(e,t)=>t.toUpperCase())}parseParamsArray(e){let t={align:`start`};return e.forEach(e=>{if(e===`abs`)t.abs=!0;else if(e.startsWith(`random`)){t.align=`random`;let n=e.match(/random\(\s*(-?\d+)\s*,\s*(-?\d+)\s*\)/);if(n){let e=parseInt(n[1],10),r=parseInt(n[2],10);t.random={min:Math.min(e,r),max:Math.max(e,r)}}}else[`start`,`center`,`end`].includes(e)&&(t.align=e)}),t}parseSegmentMode(e){let t=e.trim().toLowerCase();return t===`legacy`||t===`visual`?t:null}},ce=class{process({value:e}){let t=[],n=``,r=0;for(let i=0;i<e.length;i++){let a=e[i];a===`(`&&r++,a===`)`&&r--,a===`|`&&r===0?(n.trim()&&t.push(n.trim()),n=``):n+=a}return n.trim()&&t.push(n.trim()),t.map(e=>{let t=e.match(/^(\w+)(?:\((.*)\))?$/);if(t){let[,e,n]=t;return n?{key:e,params:n.split(`,`).map(e=>e.trim())}:{key:e}}let n=e.indexOf(`:`);if(n!==-1){let t=e.slice(0,n).trim(),r=e.slice(n+1).trim();return{key:t,params:r?r.split(`,`).map(e=>e.trim()):void 0}}return{key:e}})}},le=class{process({rules:e,value:t,type:n=`input`,context:r}){let i=[];for(let l of e){var a=null,o=null,s=!0,c=!0;n==`input`&&(o=this.inputValidators[l.key],!o)||n==`beforeinput`&&(a=this.beforeInputValidators[l.key],!a)||(o&&(s=o(t,l.params,r)),a&&(c=a(t,l.params,r)),c||i.push(this.getErrorMessage(l.key,l.params)),s||i.push(this.getErrorMessage(l.key,l.params)))}return{valid:i.length===0,errors:i}}inputValidators={required:e=>e!=null&&String(e).trim()!==``,min:(e,t)=>typeof e==`string`&&e.length>=Number(t?.[0]??0),max:(e,t)=>typeof e==`string`&&e.length<=Number(t?.[0]??2**53-1),checked:e=>{if(Array.isArray(e))return e.length>0;if(e===!0||e===`true`||e===1||e===`1`)return!0;if(typeof e==`string`){let t=e.trim().toLowerCase();return t===`false`||t===`0`?!1:t.length>0}return!!e},email:e=>typeof e==`string`&&/^[^\s@]+@([a-z0-9-]+\.)+[a-z]{2,}$/i.test(e),phone:e=>{if(typeof e!=`string`)return!1;let t=e.trim();if(t===``||!/^[0-9()\s+-.]+$/.test(t))return!1;let n=t.replace(/\D/g,``).length;return n>=7&&n<=15},number:e=>typeof e==`string`&&/^-?\d+(\.\d+)?$/.test(e),integer:e=>typeof e==`string`&&/^-?\d+$/.test(e),url:e=>typeof e==`string`&&/^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:\/?#[\]@!$&'()*+,;=]*)?$/.test(e),regex:(e,t)=>this.testByRegex(e,t?.[0]),alpha:e=>this.testByRegex(e,`^[A-Za-z]+$`,!0),alpha_num:e=>this.testByRegex(e,`^[A-Za-z0-9]+$`,!0),alpha_dash:e=>this.testByRegex(e,`^[A-Za-z0-9_-]+$`,!0),same:(e,t,n)=>{let r=t?.[0],i=this.getContextValue(n,r);return r&&i===void 0?!1:this.areValuesEqual(e,i)},different:(e,t,n)=>{let r=t?.[0],i=this.getContextValue(n,r);return r&&i===void 0?!1:!this.areValuesEqual(e,i)},range:(e,t)=>{if(e==null||e===``)return!0;let n=Number(e),r=Number(t?.[0]),i=Number(t?.[1]);return Number.isNaN(n)||Number.isNaN(r)||Number.isNaN(i)?!1:n>=r&&n<=i},digits:(e,t)=>{if(typeof e!=`string`)return!1;let n=Number(t?.[0]??0);return n<=0?!1:RegExp(`^\\d{${n}}$`).test(e)},ip:e=>typeof e==`string`&&(this.isIPv4(e)||this.isIPv6(e)),mimes:(e,t)=>this.validateMimes(e,t),max_size:(e,t)=>{let n=Number(t?.[0]);return!n||n<=0||this.validateMaxSize(e,n)},after:(e,t,n)=>this.compareDates(e,t,n,`after`),before:(e,t,n)=>this.compareDates(e,t,n,`before`)};beforeInputValidators={number:e=>/^-?\d*\.?\d*$/.test(e),integer:e=>/^-?\d*$/.test(e),email:e=>/^[\w@.\-+]*$/.test(e),phone:e=>/^[0-9()\s+-.]*$/.test(e),letters:e=>/^[a-zA-Z]*$/.test(e),lettersSpaces:e=>/^[a-zA-Z\s]*$/.test(e),lettersNumbers:e=>/^[a-zA-Z0-9]*$/.test(e),alpha:e=>/^[A-Za-z]*$/.test(e),alpha_num:e=>/^[A-Za-z0-9]*$/.test(e),alpha_dash:e=>/^[A-Za-z0-9_-]*$/.test(e),digits:(e,t)=>{let n=Number(t?.[0]??0);return n<=0?/^\d*$/.test(e):RegExp(`^\\d{0,${n}}$`).test(e)},url:e=>/^[a-zA-Z0-9\-._~:\/?#\[\]@!$&'()*+,;=%]*$/.test(e),pattern:(e,t)=>{try{return new RegExp(t?.[0]||``).test(e)}catch{return!0}}};getErrorMessage(e,t){switch(e){case`required`:return`This field is required`;case`email`:return`Invalid email address`;case`min`:return`Minimum ${t?.[0]} characters`;case`max`:return`Maximum ${t?.[0]} characters`;case`phone`:return`Invalid phone number`;case`number`:return`Only numbers are allowed`;case`integer`:return`Only whole numbers are allowed`;case`url`:return`Invalid URL address`;case`checked`:return`You must accept`;case`regex`:return`Value does not match the required pattern`;case`alpha`:return`Only letters are allowed`;case`alpha_num`:return`Only letters and numbers are allowed`;case`alpha_dash`:return`Only letters, numbers, dashes, and underscores are allowed`;case`same`:return`Values do not match`;case`different`:return`Values must be different`;case`range`:return`Value must be between ${t?.[0]} and ${t?.[1]}`;case`digits`:return`Value must contain exactly ${t?.[0]} digits`;case`ip`:return`Invalid IP address`;case`mimes`:return`Allowed file types: ${t?.join(`, `)}`;case`max_size`:return`File must be smaller than ${t?.[0]} KB`;case`after`:return`Date must be after ${t?.[0]}`;case`before`:return`Date must be before ${t?.[0]}`;default:return`Invalid value`}}validateMimes(e,t){if(!t||t.length===0)return!0;let n=this.extractFiles(e);if(n.length===0)return!0;let r=t.map(e=>e.trim().toLowerCase());return n.every(e=>this.isMimeAllowed(e,r))}validateMaxSize(e,t){let n=this.extractFiles(e);if(n.length===0)return!0;let r=t*1024;return n.every(e=>typeof e.size!=`number`||e.size<=r)}extractFiles(e){if(!e)return[];let t=[];return typeof File<`u`&&e instanceof File?(t.push(e),t):typeof FileList<`u`&&e instanceof FileList?Array.from(e):Array.isArray(e)?(e.forEach(e=>{t.push(...this.extractFiles(e))}),t):typeof e==`object`&&(`name`in e||`size`in e||`type`in e)?(t.push(e),t):(typeof e==`string`&&e!==``&&t.push({name:e}),t)}isMimeAllowed(e,t){let n=(e.type||``).toLowerCase(),r=this.getFileExtension(e.name);return t.some(e=>{let t=e.replace(/^\./,``).toLowerCase();return t?t.includes(`/`)?n===t:r===t:!1})}getFileExtension(e){if(!e)return``;let t=e.split(`.`);return t.length<=1?``:(t.pop()||``).toLowerCase()}compareDates(e,t,n,r){if(e==null||e===``)return!0;let i=t?.[0];if(!i)return!0;let a=this.toDate(e),o=this.resolveDateReference(i,n);return!a||!o?!1:r===`after`?a.getTime()>o.getTime():a.getTime()<o.getTime()}resolveDateReference(e,t){let n=this.getContextValue(t,e);if(n!==void 0)return this.toDate(n);if(e.toLowerCase()===`now`)return new Date;if(e.toLowerCase()===`today`){let e=new Date;return e.setHours(0,0,0,0),e}return this.toDate(e)}toDate(e){if(e==null||e===``)return null;if(e instanceof Date)return Number.isNaN(e.getTime())?null:e;if(typeof e==`number`){let t=new Date(e);return Number.isNaN(t.getTime())?null:t}if(typeof e==`string`){let t=Date.parse(e);if(!Number.isNaN(t))return new Date(t)}return null}testByRegex(e,t,n=!1){if(t==null||t===``)return!0;let r=typeof e==`string`?e:e==null?``:String(e);if(n&&r===``)return!0;try{let{source:e,flags:n}=this.normalizeRegex(t);return new RegExp(e,n).test(r)}catch{return!0}}normalizeRegex(e){let t=e.trim();if(t.startsWith(`/`)&&t.lastIndexOf(`/`)>0){let e=t.lastIndexOf(`/`);return{source:t.slice(1,e),flags:t.slice(e+1)}}return{source:t,flags:``}}getContextValue(e,t){if(e&&t){if(e.values&&Object.prototype.hasOwnProperty.call(e.values,t))return e.values[t];if(e.getValue)return e.getValue(t)}}areValuesEqual(e,t){return Array.isArray(e)||Array.isArray(t)?JSON.stringify(e)===JSON.stringify(t):e===t}isIPv4(e){let t=e.split(`.`);return t.length===4&&t.every(e=>{if(!/^\d+$/.test(e))return!1;let t=Number(e);return t>=0&&t<=255})}isIPv6(e){if(!e)return!1;if(e===`::`)return!0;let t=e.split(`::`);if(t.length>2)return!1;let n=/^[0-9a-fA-F]{1,4}$/,r=e.split(`:`);return t.length===2?r.every(e=>e===``||n.test(e))&&r.length<=8:r.length===8&&r.every(e=>n.test(e))}},N=new class{pendingVars=new Map;pendingProps=new Map;isOpen=!1;canUseTypedOM(e){return`attributeStyleMap`in e&&typeof CSS<`u`&&typeof CSS.number==`function`&&typeof CSS.px==`function`}writeVar(e,t,n){let r=e.style;if(this.canUseTypedOM(e)&&typeof n==`number`&&Number.isFinite(n))try{e.attributeStyleMap.set(t,CSS.number(n));return}catch{}r.setProperty(t,String(n))}begin(){this.isOpen||=!0}setVars(e,t){if(!this.isOpen){console.warn(`StyleTxn: call begin() first to set custom properties.`);return}let n=this.pendingVars.get(e)??{};for(let[e,r]of Object.entries(t))n[e]!==r&&(n[e]=r);this.pendingVars.set(e,n)}setVar(e,t,n){if(!this.isOpen){console.warn(`StyleTxn: call begin() first to set custom properties.`);return}let r=this.pendingVars.get(e)??{};r[t]!==n&&(r[t]=n,this.pendingVars.set(e,r))}setVarDirect(e,t,n){this.writeVar(e,t,n)}setProps(e,t){if(!this.isOpen){console.warn(`StyleTxn: call begin() first to set standard properties.`);return}let n=this.pendingProps.get(e)??{};for(let[e,r]of Object.entries(t))n[e]!==r&&(n[e]=r);this.pendingProps.set(e,n)}setProp(e,t,n){if(!this.isOpen){console.warn(`StyleTxn: call begin() first to set standard properties.`);return}let r=this.pendingProps.get(e)??{};r[t]!==n&&(r[t]=n,this.pendingProps.set(e,r))}run(e){let t=this.isOpen;t||this.begin();try{e(),t||this.commit()}catch(e){throw t||this.cancel(),e}}commit(){if(this.isOpen){this.isOpen=!1;for(let[e,t]of this.pendingVars)for(let[n,r]of Object.entries(t))this.writeVar(e,n,r);this.pendingVars.clear();for(let[e,t]of this.pendingProps){let n=e.style;for(let[e,r]of Object.entries(t))n[e]=String(r)}this.pendingProps.clear()}}cancel(){this.pendingVars.clear(),this.pendingProps.clear(),this.isOpen=!1}},ue=class{domAttribute=new w;recordAttribute=new T;transformNullify=new E;boundingClientRect=new C;relativePosition=new D(this.transformNullify);unitParser=new k;lerp=new O;adaptiveLerp=new A;originParser=new ee;colorParser=new te;validation=new le;easingFunction=new ne;magneticPull=new re;lerpColor=new ie;lerpVector=new ae;transformScaleParser=new oe;optionsParser=new se;ruleParser=new ce;styleTxn=N},P=new class{measureQueue=[];mutateQueue=[];scheduled=!1;measure(e){this.measureQueue.push(e),this.schedule()}mutate(e){this.mutateQueue.push(e),this.schedule()}schedule(){this.scheduled||=!0}flush(){if(!this.scheduled)return;let e=this.measureQueue;this.measureQueue=[];for(let t=0;t<e.length;t++)try{e[t]()}catch(e){console.error(`Error in frameDOM measure task:`,e)}let t=this.mutateQueue;this.mutateQueue=[];for(let e=0;e<t.length;e++)try{t[e]()}catch(e){console.error(`Error in frameDOM mutate task:`,e)}this.scheduled=!1}};Math.PI*2,180/Math.PI;var de=class extends c{constructor(e){super(e),this.htmlKey=``}canConnect(e){return e.keys[0]==null||e.getProperty(`inview-fallback`)===!0}},fe=`__string-dev-progress-override`,pe={computeRawProgress(e,t,n){if(n===0)return 0;let r=(e-t)/n;return r<=0?0:r>=1?1:r},computeRawProgressBatch(e,t,n,r,i){for(let a=0;a<i;a++){let i=n[a];if(i===0){r[a]=0;continue}let o=(e-t[a])/i;o<=0?r[a]=0:o>=1?r[a]=1:r[a]=o}}},me=class extends c{updateScheduled=!1;batchStarts=new Float64Array;batchDiffs=new Float64Array;batchOut=new Float64Array;constructor(e){super(e),this.htmlKey=`progress`,this.cssProperties=[{name:`--progress`,syntax:`<number>`,initialValue:`0`,inherits:!0},{name:`--progress-slice`,syntax:`<number>`,initialValue:`0`,inherits:!0}],this.attributesToMap=[...this.attributesToMap,{key:`easing`,type:`easing`,fallback:this.settings.easing},{key:`precision`,type:`number`,fallback:this.settings.precision??-1}]}initializeObject(e,t,n,r){super.initializeObject(e,t,n,r)}sanitizeRawProgress(e){return!Number.isFinite(e)||e<=0?0:e>=1?1:(e>.9999?e=1:e<1e-4&&(e=0),e)}resolveRawProgress(e,t,n,r){let i=e.getProperty(fe);return i==null?pe.computeRawProgress(t,n,r):this.sanitizeRawProgress(i)}applyRawProgress(e,t){let n=this.sanitizeRawProgress(t),r=e.getProperty(`easing`),i=typeof r==`function`?r(n):n,a=e.getProperty(`precision`)??-1,o=a>=0?Math.round(i*10**a)/10**a:i;e.getProperty(`progress-value`)!==o&&(e.setProperty(`progress-raw`,n),e.setProperty(`progress-value`,o))}recomputeProgress(e){let t=e.getProperty(`start-position`)??e.getProperty(`progress-start-position`)??0,n=e.getProperty(`difference-position`)??e.getProperty(`progress-difference-position`)??0;e.setProperty(`progress-start-position`,t),e.setProperty(`progress-difference-position`,n);let r=this.resolveRawProgress(e,this.data.scroll.transformedCurrent,t,n);this.applyRawProgress(e,r)}ensureBatchCapacity(e){this.batchStarts.length>=e||(this.batchStarts=new Float64Array(e),this.batchDiffs=new Float64Array(e),this.batchOut=new Float64Array(e))}calculatePositions(e,t){super.calculatePositions(e,t),e.setProperty(`progress-start-position`,e.getProperty(`start-position`)??e.getProperty(`progress-start-position`)??0),e.setProperty(`progress-difference-position`,e.getProperty(`difference-position`)??e.getProperty(`progress-difference-position`)??0),this.recomputeProgress(e)}onScroll(e){super.onScroll(e)}onObjectConnected(e){super.onObjectConnected(e)}onScrollMeasure(e){let t=this.objects.length;if(t!==0){this.ensureBatchCapacity(t);for(let e=0;e<t;e++){let t=this.objects[e],n=t.getProperty(`start-position`)??t.getProperty(`progress-start-position`)??0,r=t.getProperty(`difference-position`)??t.getProperty(`progress-difference-position`)??0;t.setProperty(`progress-start-position`,n),t.setProperty(`progress-difference-position`,r),this.batchStarts[e]=n,this.batchDiffs[e]=r}pe.computeRawProgressBatch(this.data.scroll.transformedCurrent,this.batchStarts,this.batchDiffs,this.batchOut,t);for(let e=0;e<t;e++){let t=this.objects[e],n=t.getProperty(fe),r=n==null?this.batchOut[e]:this.sanitizeRawProgress(n);this.applyRawProgress(t,r)}}}onMutate(){N.run(()=>{let e=this.objects.length;for(let t=0;t<e;t++)this.updateObjectProgress(this.objects[t])})}updateObjectProgress(e){let t=e.getProperty(`progress-value`)??0;if(e.getProperty(`progress-applied`)===t)return;let n=e.getProperty(`key`),r=e.getProperty(`precision`)??-1;e.setProperty(`progress-applied`,t);let i=e.getProperty(`progress-raw`)??t,a=e.getProperty(`easing`),o=e.getProperty(`event-progress-name`)??e.getScopedEventName(`object:progress`);e.setProperty(`event-progress-name`,o),o&&this.events.emit(o,t),this.emitSignal(e,`progress`,t),n&&this.applyVarToElement(e,n,t);for(let t=0;t<e.mirrorObjects.length;t++){let o=e.mirrorObjects[t],s=o.applyProgress(i,typeof a==`function`?a:void 0),c=r>=0?Math.round(s*10**r)/10**r:s;o.setProperty(`progress`,c),n&&this.tools.styleTxn.setVar(o.htmlElement,n,c)}}onObjectDisconnected(e){super.onObjectDisconnected(e);let t=e.getProperty(`key`);if(!t)return;let n=e=>{e.style.removeProperty(t)};n(e.htmlElement);let r=e.mirrorObjects;for(let e=0;e<r.length;e++)n(r[e].htmlElement)}},he=class extends me{defaultModeScope=[`smooth`];updateScheduledTransform=!1;calculateParallaxForObject;constructor(e){super(e),this.htmlKey=`parallax`,this.attributesToMap=[...this.attributesToMap,{key:`parallax`,type:`number`,fallback:this.settings.parallax},{key:`parallax-bias`,type:`number`,fallback:this.settings[`parallax-bias`]}],this.calculateParallaxForObject=this.calculateParallax}initializeObject(e,t,n,r){super.initializeObject(e,t,n,r);let i=t.getProperty(`parallax-bias`)??0,a=Math.abs(t.getProperty(`parallax`)??.2);t.setProperty(`parallax-sign`,Math.sign(t.getProperty(`parallax`))),t.setProperty(`parallax`,a),t.setProperty(`parallax-position-start`,-.5+.5*i),t.setProperty(`parallax-position-end`,.5+.5*(1-i));let o=this.data.viewport.windowHeight;t.setProperty(`offset-top`,a*o),t.setProperty(`offset-bottom`,a*o)}calculatePositions(e,t){super.calculatePositions(e,t),e.setProperty(`parallax-transform-value`,this.calculateParallaxForObject(e))}onScroll(e){super.onScroll(e)}onScrollMeasure(e){super.onScrollMeasure(e);for(let e=0;e<this.objects.length;e++){let t=this.objects[e];t.setProperty(`parallax-transform-value`,this.calculateParallaxForObject(t))}}onMutate(){N.run(()=>{for(let e=0;e<this.objects.length;e++){let t=this.objects[e],n=t.getProperty(`progress-value`)??0;t.getProperty(`parallax-progress-applied`)!==n&&(t.setProperty(`parallax-transform-value`,this.calculateParallaxForObject(t)),t.setProperty(`parallax-progress-applied`,n));let r=t.getProperty(`parallax-transform-value`);r&&(this.applyPropToElement(t,`transform`,r.transform),this.applyPropToConnects(t,`transform`,r.transform))}})}calculateParallax=e=>{let t=e.getProperty(`progress-value`)??0,n=e.getProperty(`parallax`)??0,r=e.getProperty(`parallax-position-start`)??0,i=e.getProperty(`parallax-position-end`)??1,a=e.getProperty(`parallax-sign`)??1,o=this.data.viewport.windowHeight/this.data.viewport.transformScale,s=a*n*(o*r+t*o*i);return this.events.emit(this.getObjectEventName(e,`object:parallax`),s),{transform:`translate3d(0, ${s}px, 0)`}}},F={BEFORE_ELEMENT:`-before-element`,AFTER_ELEMENT:`-after-element`};function ge(e){if(!e||!Array.isArray(e.chars)||e.chars.length===0)return[];let t=null;for(let n of e.chars){let e=n.splitClass??[];if(e.length!==0){if(t===null){t=e;continue}if(e.length!==t.length)return[];for(let n=0;n<e.length;n++)if(e[n]!==t[n])return[]}}return t??[]}function _e(e){return e.chars[0]?.token?.meta?.wrappers??[]}function ve(e,t,n){if(n.trimInlineGaps!==!0||!t)return!1;let r=_e(e),i=_e(t);if(r.length===0||i.length===0)return!1;if(r.length!==i.length)return!0;for(let e=0;e<r.length;e++)if(r[e].id!==i[e].id)return!0;return!1}function ye(e,t,n){let r=document.createDocumentFragment(),i=L(t,`line`)||L(t,`charLine`)||L(t,`wordLine`),a=0,o=L(t,`char`)||L(t,`charLine`)||L(t,`charWord`),s=0;e.forEach(e=>s+=e.words.length);let c=0;e.forEach(e=>e.words.forEach(e=>c+=e.chars.length));let l=e.length,u=s,d=new Map;return e.forEach((s,c)=>{let l=c===e.length-1,u=r,d=``;i&&(u=document.createElement(`span`),u.setAttribute(`aria-hidden`,`true`),u.classList.add(`-s-line`),s.isBeforeElement&&u.classList.add(F.BEFORE_ELEMENT),s.isAfterElement&&u.classList.add(F.AFTER_ELEMENT),u.style.setProperty(`--line-index`,String(s.lineIndex)),u.style.setProperty(`--word-total`,String(s.words.length)),s.fitFontSize!==void 0&&u.style.setProperty(`--fit-font-size`,String(s.fitFontSize)),I(u,s.calculatedValues,t));let f=[],p=u;s.words.forEach((e,r)=>{let c=r===s.words.length-1,m=_e(e),h=0;for(;h<f.length&&h<m.length&&f[h].info.id===m[h].id;)h++;for(;f.length>h;)f.pop();p=f.length>0?f[f.length-1].element:u;for(let e=h;e<m.length;e++){let t=m[e],n=document.createElement(t.tag);for(let[e,r]of t.attributes)n.setAttribute(e,r);p.appendChild(n),f.push({info:t,element:n}),p=n}if(e.chars.length===1&&e.chars[0].token.type===`element`){let t=e.chars[0].token.node.cloneNode(!0);p.appendChild(t);return}let g=e.chars.map(e=>e.char).join(``);g&&(d+=d.length===0||e.noSpaceBefore?g:` ${g}`);let _=L(t,`word`)||L(t,`charWord`)||L(t,`wordLine`),v=_?document.createElement(`span`):p,y=ge(e);if(_&&(v.setAttribute(`aria-hidden`,`true`),v.classList.add(`-s-word`),e.isBeforeElement&&v.classList.add(F.BEFORE_ELEMENT),e.isAfterElement&&v.classList.add(F.AFTER_ELEMENT),v.style.setProperty(`--word-index`,String(e.wordIndexGlobal)),v.style.setProperty(`--char-total`,String(e.chars.length)),v.setAttribute(`data-split-content`,g),I(v,e.calculatedValues,t),y.length&&v.classList.add(...y)),o)e.chars.forEach((r,i)=>{if(r.char===` `||r.char===`	`)return;let o=document.createElement(`span`);o.setAttribute(`aria-hidden`,`true`);let s=o;s.classList.add(`-s-char`),r.isBeforeElement&&s.classList.add(F.BEFORE_ELEMENT),r.isAfterElement&&s.classList.add(F.AFTER_ELEMENT),s.textContent=r.char,s.setAttribute(`data-split-content`,r.char),s.style.setProperty(`--char-index`,String(a++));let c=e.chars[i+1];if(c){let e=n.getKerning(r.char,c.char);Math.abs(e)>.01&&(s.style.setProperty(`--kerning`,`${e.toFixed(2)}px`),s.style.marginRight=`var(--kerning)`)}I(s,r.calculatedValues,t);let l=r.splitClass??[];l.length&&(!y.length||!_)&&s.classList.add(...l),v.appendChild(o)});else{let e=document.createTextNode(g);v.appendChild(e)}_&&p.appendChild(v);let b=s.words[r+1],x=b?.noSpaceBefore||ve(e,b,t);i?c?l||u.appendChild(document.createElement(`br`)):x||v.appendChild(document.createTextNode(`\xA0`)):!c&&!x&&v.appendChild(document.createTextNode(`\xA0`))}),i&&(u.setAttribute(`data-split-content`,d),r.appendChild(u))}),i&&d.set(`--line-global-total`,String(l)),o&&d.set(`--char-global-total`,String(c)),(L(t,`word`)||L(t,`charWord`)||L(t,`wordLine`))&&d.set(`--word-global-total`,String(u)),{fragment:r,extraProps:d}}function I(e,t,n){if(t)for(let r of t){if(!be(r.type,r.align,n))continue;let t=xe(r.type,r.align);e.style.setProperty(t,String(r.value))}}function be(e,t,n){let r=n[e]??[];return Array.isArray(r)&&r.some(e=>t.startsWith(`random`)?e.align.startsWith(`random`):e.align===t)}function xe(e,t){return`--${e}-${t.startsWith(`random`)?`random`:t}`}function L(e,t){return Array.isArray(e[t])&&e[t].length>0}var Se=new Set([`img`,`video`,`audio`,`canvas`,`iframe`,`object`,`svg`,`input`,`textarea`,`select`,`button`,`area`,`base`,`col`,`embed`,`hr`,`link`,`meta`,`param`,`source`,`track`,`wbr`,`picture`,`table`]);function Ce(e){let t=[];for(let n=0;n<e.attributes.length;n++){let r=e.attributes[n];t.push([r.name,r.value])}return t}var R=0;function we(e){R=0;let t=[],n=(e,n)=>{n&&Object.keys(n).length&&(e.meta={...e.meta||{},...n}),t.push(e)},r=(e,t)=>{if(e.nodeType===Node.ELEMENT_NODE){let i=e,a=i.tagName.toLowerCase();if(a===`split-class`){let e=(i.getAttribute(`class`)??``).split(/\s+/).filter(Boolean),n={...t||{},splitClass:[...t?.splitClass??[],...e]};i.childNodes.forEach(e=>r(e,n));return}if(a===`br`){n({type:`br`,id:`br_${R++}`,node:i,tagName:`br`},t);return}if(!Se.has(a)&&i.childNodes.length>0){let e={id:`wrapper_${R++}`,tag:a,attributes:Ce(i)},n=t?.wrappers??[],o={...t||{},wrappers:[...n,e]};i.childNodes.forEach(e=>r(e,o));return}n({type:`element`,id:`el_${R++}`,node:i,tagName:a},t);return}if(e.nodeType===Node.TEXT_NODE){let r=e.nodeValue??``,i=`text_${R++}`;r.trim()?n({type:`text`,id:i,node:e,content:r},t):n({type:`space`,id:i,node:e,content:r},t);return}n({type:`other`,id:`node_${R++}`,node:e},t)};return e.forEach(e=>r(e)),t}var Te=class{ctx;font=``;cache={kerning:new Map,charWidth:new Map};constructor(e){let t=document.createElement(`canvas`);this.ctx=t.getContext(`2d`),this.setFontFromElement(e)}setFontFromElement(e){let t=window.getComputedStyle(e),n=`${t.fontStyle} ${t.fontVariant} ${t.fontWeight} ${t.fontSize}/${t.lineHeight} ${t.fontFamily}`;n!==this.font&&(this.font=n,this.ctx.font=this.font,this.cache.kerning.clear(),this.cache.charWidth.clear())}getCharWidth(e){if(this.cache.charWidth.has(e))return this.cache.charWidth.get(e);let t=this.ctx.measureText(e).width;return this.cache.charWidth.set(e,t),t}getKerning(e,t){let n=`${e}${t}`,r=`${this.font}|${n}`;if(this.cache.kerning.has(r))return this.cache.kerning.get(r);let i=this.ctx.measureText(n).width-(this.getCharWidth(e)+this.getCharWidth(t));return this.cache.kerning.set(r,i),i}measureWord(e){let t=0;for(let n=0;n<e.length;n++){let r=e[n];if(t+=this.getCharWidth(r),n>0){let i=e[n-1];t+=this.getKerning(i,r)}}return t}};function Ee(e,t){let n=t.contentWidth,r=e.cloneNode(!0);r.removeAttribute(`string`),r.removeAttribute(`data-string`),r.removeAttribute(`string-split`),r.removeAttribute(`data-string-split`),r.removeAttribute(`string-id`),r.removeAttribute(`data-string-id`),r.removeAttribute(`string-inited`),r.classList.remove(`-splitted`,`-inview`,`-restored`),r.innerHTML=e.getAttribute(`string-split-original-html`)??e.innerHTML,r.style.setProperty(`position`,`absolute`,`important`),r.style.setProperty(`visibility`,`hidden`,`important`),r.style.setProperty(`pointer-events`,`none`,`important`),r.style.setProperty(`left`,`0`,`important`),r.style.setProperty(`top`,`0`,`important`),r.style.setProperty(`display`,`block`,`important`),r.style.setProperty(`width`,`${n}px`,`important`),r.style.setProperty(`min-width`,`${n}px`,`important`),r.style.setProperty(`max-width`,`${n}px`,`important`),r.style.setProperty(`padding`,`0`,`important`),r.style.setProperty(`border`,`0`,`important`),r.style.setProperty(`margin`,`0`,`important`),r.style.setProperty(`transform`,`none`,`important`),r.style.setProperty(`scale`,`1`,`important`),(e.parentElement??document.body).appendChild(r);let i=new Map,a=document.createTreeWalker(e,NodeFilter.SHOW_ALL),o=document.createTreeWalker(r,NodeFilter.SHOW_ALL),s=a.currentNode,c=o.currentNode;for(i.set(s,c);(s=a.nextNode())&&(c=o.nextNode());)i.set(s,c);return{resolveNode(e){return i.get(e)??e},cleanup(){r.remove()}}}var De=class{id=`flex`;supports(e,t){return t.display===`flex`||t.display===`inline-flex`}createSource(e,t){return Ee(e,t)}};function Oe(){return{resolveNode(e){return e},cleanup(){}}}var ke=class{id=`inline-flow`;supports(e,t){return t.display!==`flex`&&t.display!==`inline-flex`}createSource(e,t){return Oe()}},z=[new De,new ke];function Ae(e){let t=window.getComputedStyle(e),n=e.getBoundingClientRect(),r=parseFloat(t.borderLeftWidth)||0,i=parseFloat(t.borderRightWidth)||0,a=parseFloat(t.paddingLeft)||0,o=parseFloat(t.paddingRight)||0;return Math.max(0,n.width-r-i-a-o)}function je(e){let t=e.parentElement;for(;t;){let e=window.getComputedStyle(t),n=e.display;if(n!==`inline`&&n!==`inline-block`&&n!==`ruby`){let n=t.getBoundingClientRect(),r=parseFloat(e.borderLeftWidth)||0,i=parseFloat(e.borderRightWidth)||0,a=parseFloat(e.paddingLeft)||0,o=parseFloat(e.paddingRight)||0;return Math.max(0,n.width-r-i-a-o)}t=t.parentElement}return 0}function Me(e){let t=window.getComputedStyle(e),n=Ae(e),r=je(e),i=t.display===`inline`||t.display===`inline-flex`||t.display===`inline-grid`,a=n;return(i&&r>n+1&&!e.style.width||a<=0)&&(a=r),{display:t.display,contentWidth:a,ownContentWidth:n,blockContainerContentWidth:r}}function Ne(e,t){return z.find(n=>n.supports(e,t))??z[z.length-1]}var B=typeof Intl<`u`&&`Segmenter`in Intl?new Intl.Segmenter(void 0,{granularity:`grapheme`}):null;function Pe(e,t){return t.segment===`visual`?Re(e):Ie(e)}function Fe(e,t){return t.segment!==`visual`||!e||!B?Array.from(e):Array.from(B.segment(e),({segment:e})=>e)}function Ie(e){let t=[],n=/\S+/g,r;for(;(r=n.exec(e))!==null;)Le(r[0],r.index,t);return t}function Le(e,t,n){let r=0;for(let i=1;i<e.length-1;i++){let a=e[i];if(a===`-`||a===`‐`){let a=e.slice(r,i+1),o=t+r;n.push({text:a,start:o,end:o+a.length,noSpaceBefore:n.length>0&&o===n[n.length-1].end}),r=i+1}}if(r<e.length){let i=e.slice(r),a=t+r;n.push({text:i,start:a,end:a+i.length,noSpaceBefore:n.length>0&&a===n[n.length-1].end})}}function Re(e){let t=ze(e),n=[],r=null,i=()=>{r&&=(n.push({text:r.text,start:r.start,end:r.end,noSpaceBefore:n.length>0&&r.start===n[n.length-1].end}),null)};return t.forEach(({segment:e,index:t})=>{if(/\s/u.test(e)){i();return}let a=Ve(e),o=t+e.length;if(a===`visual`){if(Be(e)){if(r){r.text+=e,r.end=o;return}if(n.length>0&&t===n[n.length-1].end){n[n.length-1].text+=e,n[n.length-1].end=o;return}}i(),n.push({text:e,start:t,end:o,noSpaceBefore:n.length>0&&t===n[n.length-1].end});return}let s=r!==null&&(r.text.endsWith(`-`)||r.text.endsWith(`‐`));if(!r||r.end!==t||s){i(),r={text:e,start:t,end:o};return}r.text+=e,r.end=o}),i(),n}function ze(e){if(!B){let t=[],n=0;return Array.from(e).forEach(e=>{t.push({segment:e,index:n}),n+=e.length}),t}return Array.from(B.segment(e),({segment:e,index:t})=>({segment:e,index:t}))}function Be(e){return/[\)\]\}）》」』】〕〗〙〛〉》〞〟›»"'\u3001\u3002\uFF0C\uFF0E\uFF01\uFF1F\uFF1A\uFF1B\u2026]/u.test(e)}function Ve(e){return/\p{Script=Han}|\p{Script=Hiragana}|\p{Script=Katakana}/u.test(e)?`visual`:/[\p{Script=Latin}\p{Script=Cyrillic}\p{Script=Greek}\p{Script=Hangul}\p{Number}]/u.test(e)||/[\p{Mark}\p{Connector_Punctuation}\p{Dash_Punctuation}'’._+#&/@]/u.test(e)?`word`:`visual`}function He(e,t){return!e?.length&&!t?.length?!0:!e||!t||e.length!==t.length?!1:e.every((e,n)=>e.id===t[n].id)}function Ue(e,t){return e.length===t.length&&e.every((e,n)=>e===t[n])}function We(e,t,n,r){let i=document.createRange(),a=[],o=!1,s=!1,c=!1,l,u=[];try{for(let d=0;d<e.length;d++){let f=e[d];switch(f.type){case`br`:a.push({token:f,rect:new DOMRect(0,0,0,0)}),s=!0,c=!1,l=void 0,u=[],o=!1;break;case`space`:s=!Ge(e,d,r);break;case`other`:c=!1,s=!1;break;case`text`:{let e=f.content,d=/^\s/.test(e),p=f.meta?.wrappers??[],m=f.meta?.splitClass??[],h=Pe(e,r),g=0;for(let e of h){let r=e.text,h=new DOMRect(0,0,0,0),_=t.resolveNode(f.node);try{i.setStart(_,e.start),i.setEnd(_,e.end),h=i.getBoundingClientRect()}catch{}let v=g===0&&!d&&!s&&c,y=g>0||He(l,p),b=g===0&&!Ue(u,m),x=n.measureWord(r),S=new DOMRect(h.x,h.y,x,h.height),C={...f.meta||{},joinPrev:v&&y&&!b,noSpaceBefore:e.noSpaceBefore||v&&(!y||b)};o&&g===0&&(C.isAfterElement=!0,o=!1),a.push({token:{type:`text`,id:``,node:f.node,content:r,meta:C},rect:S,browserWidth:h.width}),g++}g>0&&(s=/\s$/.test(e),c=!0,l=p,u=m);break}case`element`:{let e=t.resolveNode(f.node).getBoundingClientRect();a.push({token:f,rect:e,browserWidth:e.width});let n=a[a.length-2];n?.token.type===`text`&&(n.token.meta={...n.token.meta||{},isBeforeElement:!0}),o=!0,c=!1,u=[],s=!1;break}}}}finally{i.detach?.(),t.cleanup()}return a}function Ge(e,t,n){if(n.trimInlineGaps!==!0)return!1;let r=e[t];if(r?.type!==`space`||!/[\n\r\t]/.test(r.content)&&r.content.length<=1)return!1;let i=Ke(e,t-1),a=qe(e,t+1);if(!i||!a||!Je(i)||!Je(a))return!1;let o=Ye(i),s=Ye(a);return o.length===0||s.length===0?!1:o.join(`|`)!==s.join(`|`)}function Ke(e,t){for(let n=t;n>=0;n--){let t=e[n];if(t.type!==`space`&&t.type!==`other`)return t}return null}function qe(e,t){for(let n=t;n<e.length;n++){let t=e[n];if(t.type!==`space`&&t.type!==`other`)return t}return null}function Je(e){return e.type===`text`||e.type===`element`}function Ye(e){return(e.meta?.wrappers??[]).map(e=>e.id)}function Xe(e,t,n,r){let i=Me(t);return We(e,Ne(t,i).createSource(t,i),n,r)}var Ze=5;function Qe(e,t,n,r){let i=[],a=null,o=0,s=0,c=0,l=0;return e.forEach(e=>{let t=e.token,u=t.meta?.isBeforeElement??!1,d=t.meta?.isAfterElement??!1;if(t.type===`br`){a=null;return}if(t.type===`text`){let f=t.content,p=t.meta?.splitClass??[],m=!!t.meta?.joinPrev,h=[],g=0,_=Fe(f,r);for(let r=0;r<_.length;r++){let i=_[r],a=r>0?_[r-1]:null,o=n.getCharWidth(i),c=a?n.getKerning(a,i):0;g+=c;let l={char:i,rect:new DOMRect(e.rect.left+g,e.rect.top,o,e.rect.height),token:t,charIndexInWord:r,charIndexInLine:0,charIndexGlobal:s++};p.length&&(l.splitClass=p),h.push(l),g+=o}if(h.length>0){let e=h[h.length-1];u&&(e.isBeforeElement=!0),d&&(e.isAfterElement=!0)}let v=Math.round(e.rect.top);if((!a||Math.abs(v-Math.round(o))>Ze)&&(o=v,a={words:[],rect:e.rect,lineIndex:i.length},l=0,i.push(a)),!a)return;let y=e.rect.left+(e.browserWidth??e.rect.width);if(m&&a.words.length>0){let t=a.words[a.words.length-1],n=a.words.reduce((e,t)=>e+t.chars.length,0),r=t.chars.length;h.forEach((e,t)=>{e.charIndexInLine=n+t,e.charIndexInWord=r+t}),t.chars.push(...h),t.rect=V([t.rect,e.rect]),a.rect=V(a.words.map(e=>e.rect)),l=Math.max(l,y),a.fitWidth=l-a.rect.left,a.browserWordWidthSum=(a.browserWordWidthSum??0)+(e.browserWidth??e.rect.width),u&&(t.isBeforeElement=!0),d&&(t.isAfterElement=!0);return}let b=a.words.length,x=a.words.reduce((e,t)=>e+t.chars.length,0);h.forEach((e,t)=>e.charIndexInLine=x+t);let S={chars:h,rect:e.rect,wordIndexGlobal:c++,wordIndexInLine:b,isBeforeElement:u,isAfterElement:d,noSpaceBefore:!!t.meta?.noSpaceBefore};a.words.push(S),a.rect=V(a.words.map(e=>e.rect)),l=Math.max(l,y),a.fitWidth=l-a.rect.left,a.browserWordWidthSum=(a.browserWordWidthSum??0)+(e.browserWidth??e.rect.width),u&&(a.isBeforeElement=!0),d&&(a.isAfterElement=!0);return}if(t.type===`element`){let n=e.rect,r=Math.round(n.top);if((!a||Math.abs(r-Math.round(o))>Ze)&&(o=r,a={words:[],rect:n,lineIndex:i.length},l=0,i.push(a)),!a)return;let u=a.words.length,d={chars:[{char:`[E]`,rect:n,token:t,charIndexInWord:0,charIndexInLine:a.words.reduce((e,t)=>e+t.chars.length,0),charIndexGlobal:s++}],rect:n,wordIndexGlobal:c++,wordIndexInLine:u,isBeforeElement:!1,isAfterElement:!1};a.words.push(d),a.rect=V(a.words.map(e=>e.rect)),l=Math.max(l,e.rect.left+(e.browserWidth??e.rect.width)),a.fitWidth=l-a.rect.left,a.browserWordWidthSum=(a.browserWordWidthSum??0)+(e.browserWidth??e.rect.width)}}),i}function V(e){if(e.length===0)return new DOMRect(0,0,0,0);let t=Math.min(...e.map(e=>e.left)),n=Math.min(...e.map(e=>e.top)),r=Math.max(...e.map(e=>e.right)),i=Math.max(...e.map(e=>e.bottom));return new DOMRect(t,n,r-t,i-n)}var $e=class extends c{lastSplitWidth=new WeakMap;constructor(e){super(e),this.htmlKey=`split`,this.permissions.mobile.rebuild.height=!1,this.permissions.mobile.rebuild.width=!1}onInit(){let e=()=>{this.objectsOnPage.forEach(e=>{let t=e.htmlElement;if(!t)return;let n=this.getSplitOptions(t);this.needsForcedRebuildOnFontLoad(n)&&this.lastSplitWidth.delete(t),this.onObjectConnected(e)})};document.fonts.ready.then(e),document.fonts.addEventListener(`loadingdone`,e)}onObjectDisconnected(e){e.htmlElement&&this.lastSplitWidth.delete(e.htmlElement)}onResizeWidth(){this.objectsOnPage.forEach(e=>{let t=e.htmlElement;if(!t)return;let n=this.getSplitOptions(t);this.needsWidthRebuild(n)&&this.onObjectConnected(e)})}onObjectConnected(e){let t=e.htmlElement;if(!t)return;let n=this.isDebugEnabled(t),r=t.classList.contains(`-splitted`),i=t.getAttribute(`string-split-original-html`),a=t.getAttribute(`string-split-original`);i===null&&a!==null&&r&&(i=a,a=this.extractTextContent(i),t.setAttribute(`string-split-original-html`,i),t.setAttribute(`string-split-original`,a)),(!r||i===null||a===null)&&(i=this.escapeAttribute(t.innerHTML),a=t.textContent??``,t.setAttribute(`string-split-original-html`,i),t.setAttribute(`string-split-original`,a));let o=window.getComputedStyle(t),s=this.getElementContentWidth(t,o);n&&this.logConnectionStart(t,{isAlreadySplit:r,currentContentWidth:s,lastWidth:this.lastSplitWidth.get(t),originalHtml:i,originalText:a});let c=this.lastSplitWidth.get(t);if(!(r&&c!==void 0&&Math.abs(s-c)<1)){this.lastSplitWidth.set(t,s),r&&t.classList.remove(`-splitted`);try{e.htmlElement.innerHTML=i;let r=t.getAttribute(`string-split`)??t.getAttribute(`data-string-split`)??``,o=this.tools.optionsParser.process({attributeValue:r}),{fragment:s,result:c,extraProps:l}=this.split(t,o,n);e.setProperty(`nodes`,s.childNodes),t.setAttribute(`aria-label`,a),t.innerHTML=``,t.appendChild(c),this.applyFlexLineBreaks(t,o),t.classList.add(`-splitted`),l.forEach((e,n)=>{t.style.setProperty(n,e)}),n&&this.logRenderedState(t,o,l);let u=t.getAttribute(`string-split-restore-after`);u&&!isNaN(Number(u))&&setTimeout(()=>{t.innerHTML=i,t.classList.add(`-restored`)},Number(u))}finally{t.classList.contains(`-splitted`)||t.classList.add(`-splitted`)}}}extractTextContent(e){let t=document.createElement(`div`);return t.innerHTML=e,t.textContent??``}getSplitOptions(e){let t=e.getAttribute(`string-split`)??e.getAttribute(`data-string-split`)??``;return this.tools.optionsParser.process({attributeValue:t})}hasLineDrivenSplit(e){return(e.line?.length??0)>0||(e.wordLine?.length??0)>0||(e.charLine?.length??0)>0}needsWidthRebuild(e){return this.hasLineDrivenSplit(e)||e.fit===!0}needsForcedRebuildOnFontLoad(e){return this.needsWidthRebuild(e)}getDebugStoreKey(e){let t=e.getAttribute(`string-debug-save`)??e.getAttribute(`data-string-debug-save`)??``;return t?t===`true`||t===`1`?this.getDebugLabel(e):t:null}writeDebugRecord(e,t,n){let r=this.getDebugStoreKey(e);if(!r)return;let i=window,a=i.__stringSplitDebug??={},o=a[r]??{label:this.getDebugLabel(e),timestamp:Date.now()};o.timestamp=Date.now(),o[t]=n,a[r]=o}isDebugEnabled(e){let t=e.getAttribute(`string-debug`)??e.getAttribute(`data-string-debug`)??``;return t?t===``||t===`true`||t===`1`||t.includes(`split`)||t===`all`:!1}getDebugLabel(e){return e.getAttribute(`string-id`)??e.id??e.className??e.tagName.toLowerCase()}logConnectionStart(e,t){let n=window.getComputedStyle(e),r=this.captureBaselineSnapshot(e,n),i={text:t.originalText,html:t.originalHtml,baseline:r,flags:{isAlreadySplit:t.isAlreadySplit,display:n.display,whiteSpace:n.whiteSpace,position:n.position},widths:{currentContentWidth:t.currentContentWidth,lastWidth:t.lastWidth,rectWidth:e.getBoundingClientRect().width,clientWidth:e.clientWidth,parentContentWidth:this.getBlockContainerContentWidth(e)}};this.writeDebugRecord(e,`connect`,i)}captureBaselineSnapshot(e,t){let n=e.getBoundingClientRect(),r=parseFloat(t.lineHeight);return{rectWidth:Number(n.width.toFixed(2)),rectHeight:Number(n.height.toFixed(2)),fontSize:Number(parseFloat(t.fontSize).toFixed(2)),lineHeight:Number.isFinite(r)?Number(r.toFixed(2)):t.lineHeight,estimatedLineCount:Number.isFinite(r)&&r>0?Number((n.height/r).toFixed(2)):null}}logSplitAnalysis(e,t,n,r){let i={tokens:t.map(e=>({type:e.type,text:this.getTokenDebugText(e),wrappers:e.meta?.wrappers?.map(e=>e.tag)??[]})),measured:n.map(e=>({type:e.token.type,text:this.getTokenDebugText(e.token),left:Number(e.rect.left.toFixed(2)),top:Number(e.rect.top.toFixed(2)),width:Number(e.rect.width.toFixed(2)),browserWidth:Number((e.browserWidth??e.rect.width).toFixed(2))})),layoutLines:r.map(e=>({index:e.lineIndex,text:e.words.map(e=>e.chars.map(e=>e.char).join(``)).join(` `),wordCount:e.words.length,rect:{left:Number(e.rect.left.toFixed(2)),top:Number(e.rect.top.toFixed(2)),width:Number(e.rect.width.toFixed(2)),height:Number(e.rect.height.toFixed(2))},fitWidth:Number((e.fitWidth??e.rect.width).toFixed(2))}))};this.writeDebugRecord(e,`measure`,i)}getTokenDebugText(e){return`content`in e?e.content:`tagName`in e?e.tagName:`#other`}logRenderedState(e,t,n){let r=window.getComputedStyle(e),i=Array.from(e.querySelectorAll(`.-s-line`)),a={mode:{attr:e.getAttribute(`string-split`)??e.getAttribute(`data-string-split`),line:t.line?.length??0,wordLine:t.wordLine?.length??0,charLine:t.charLine?.length??0},root:{display:r.display,flexWrap:r.flexWrap,rectWidth:Number(e.getBoundingClientRect().width.toFixed(2)),rectHeight:Number(e.getBoundingClientRect().height.toFixed(2)),childCount:e.children.length,extraProps:Object.fromEntries(n.entries())},children:Array.from(e.children).map(e=>{let t=e,n=t.getBoundingClientRect();return{tag:t.tagName.toLowerCase(),className:t.className,text:t.textContent?.replace(/\s+/g,` `).trim(),width:Number(n.width.toFixed(2)),height:Number(n.height.toFixed(2))}}),lineNodes:i.map((e,t)=>{let n=e.getBoundingClientRect(),r=window.getComputedStyle(e);return{index:t,text:e.getAttribute(`data-split-content`),top:Number(n.top.toFixed(2)),left:Number(n.left.toFixed(2)),width:Number(n.width.toFixed(2)),height:Number(n.height.toFixed(2)),display:r.display,lineHeight:r.lineHeight,scale:r.scale,transform:r.transform}})};this.writeDebugRecord(e,`rendered`,a)}applyFlexLineBreaks(e,t){if(!((t.line?.length??0)>0||(t.wordLine?.length??0)>0||(t.charLine?.length??0)>0))return;let n=window.getComputedStyle(e).display;if(n!==`flex`&&n!==`inline-flex`)return;let r=Array.from(e.children).filter(e=>e.classList.contains(`-s-line`));if(!(r.length<2))for(let e=0;e<r.length-1;e++){let t=document.createElement(`span`);t.setAttribute(`aria-hidden`,`true`),t.classList.add(`-s-line-break`),t.style.flexBasis=`100%`,t.style.width=`0`,t.style.height=`0`,t.style.overflow=`hidden`,t.style.pointerEvents=`none`,r[e].after(t)}}getBlockContainerContentWidth(e){let t=e.parentElement;for(;t;){let e=window.getComputedStyle(t),n=e.display;if(n!==`inline`&&n!==`inline-block`&&n!==`ruby`){let n=t.getBoundingClientRect().width||t.clientWidth;return Math.max(0,n-(parseFloat(e.paddingLeft)||0)-(parseFloat(e.paddingRight)||0))}t=t.parentElement}return 0}getElementContentWidth(e,t=window.getComputedStyle(e)){let n=(parseFloat(t.paddingLeft)||0)+(parseFloat(t.paddingRight)||0),r=e.clientWidth||e.getBoundingClientRect().width,i=this.getBlockContainerContentWidth(e);return i>r+1&&!e.style.width&&(t.display===`inline`||t.display===`inline-flex`||t.display===`inline-grid`)?Math.max(0,i-n):r>0?Math.max(0,r-n):Math.max(0,i-n)}split(e,t,n=!1){let r=new Te(e),i=document.createDocumentFragment();e.childNodes.forEach(e=>i.appendChild(e.cloneNode(!0)));let a=we(e.childNodes),o=Xe(a,e,r,t),s=Qe(o,e,r,t);n&&this.logSplitAnalysis(e,a,o,s);let c=t.fit?this.getFitContext(s,e):null,l=c?this.applyFit(s,t,c):new Map;this.applyCalculatedValues(s,t);let u=ye(s,t,r);return l.forEach((e,t)=>u.extraProps.set(t,e)),c&&this.refineFitFontSize(e,u.fragment,u.extraProps,s,t,c),{fragment:i,result:u.fragment,extraProps:u.extraProps}}getFitContext(e,t){let n=window.getComputedStyle(t),r=parseFloat(n.fontSize);if(!r)return null;let i=this.getElementContentWidth(t,n);if(i<=0)return null;let a=0;for(let t of e){let e=t.fitWidth??t.rect.width;e>a&&(a=e)}if(a<=0)return null;let o=i;if(Math.abs(i-a)<2&&t.parentElement){let e=window.getComputedStyle(t.parentElement),n=t.parentElement.clientWidth-(parseFloat(e.paddingLeft)||0)-(parseFloat(e.paddingRight)||0);n>i&&(o=n)}let s=parseFloat(n.lineHeight)||0;return{currentFontSize:r,contentWidth:o,lineHeightPx:s}}applyFit(e,t,n){let r=new Map,{currentFontSize:i,contentWidth:a}=n,o=(t.line?.length??0)>0||(t.wordLine?.length??0)>0||(t.charLine?.length??0)>0,s=(t.char?.length??0)>0||(t.charLine?.length??0)>0||(t.charWord?.length??0)>0;if(o)for(let t of e){let e=t.fitWidth??t.rect.width;e>0&&(t.fitFontSize=this.computeFitFontSize(i,a,e,s?t.browserWordWidthSum:void 0))}else{let t=e.reduce((e,t)=>(t.fitWidth??t.rect.width)>(e.fitWidth??e.rect.width)?t:e,e[0]),n=t.fitWidth??t.rect.width,o=this.computeFitFontSize(i,a,n,s?t.browserWordWidthSum:void 0);r.set(`--fit-font-size`,String(Math.floor(o)))}return r}refineFitFontSize(e,t,n,r,i,a){let o=(i.line?.length??0)>0||(i.wordLine?.length??0)>0||(i.charLine?.length??0)>0,s=(i.char?.length??0)>0||(i.charLine?.length??0)>0||(i.charWord?.length??0)>0,c=e.innerHTML;try{if(e.innerHTML=``,e.appendChild(t.cloneNode(!0)),o){let n=Array.from(e.querySelectorAll(`.-s-line`)),i=Array.from(t.querySelectorAll(`.-s-line`));n.forEach((e,t)=>{let n=i[t];if(!n)return;let o=parseFloat(n.style.getPropertyValue(`--fit-font-size`));if(!o)return;let c=this.solveRenderedFitFontSize(e,a.currentFontSize,o,a.contentWidth,s);c&&(r[t].fitFontSize=c,n.style.setProperty(`--fit-font-size`,String(Math.floor(c))))})}else{let t=parseFloat(n.get(`--fit-font-size`)??``);if(!t)return;let r=this.solveRenderedFitFontSize(e,a.currentFontSize,t,a.contentWidth,s);if(!r)return;let i=Math.floor(r);n.set(`--fit-font-size`,String(i));let{lineHeightPx:o,currentFontSize:c,contentWidth:l}=a;if(o>0&&c>0){let e=i/c*o;e>0&&(n.set(`--fit-scale-y`,String(window.innerHeight/e)),n.set(`--fit-aspect-ratio`,String(l/e)))}}}finally{e.innerHTML=c}}solveRenderedFitFontSize(e,t,n,r,i){if(!Number.isFinite(t)||!Number.isFinite(n)||t<=0||n<=0)return null;let a=this.measureScopeAtFontSize(e,i,t);if(a<=0)return null;if(Math.abs(r-a)<.01)return t;let o=Math.abs(n-t)<.01?a:this.measureScopeAtFontSize(e,i,n);if(o<=0)return r/a*t;let s=(o-a)/(n-t);if(!Number.isFinite(s)||Math.abs(s)<1e-4)return r/a*t;let c=t+(r-a)/s;return!Number.isFinite(c)||c<=0?null:c}measureScopeAtFontSize(e,t,n){if(t){let t=Array.from(e.querySelectorAll(`.-s-char`)),r=t.map(e=>e.style.fontSize);t.forEach(e=>{e.style.fontSize=`${n}px`}),e.offsetWidth;let i=this.measureCharScopeWidth(e);return t.forEach((e,t)=>{e.style.fontSize=r[t]}),i}let r=e.style.fontSize;e.style.fontSize=`${n}px`,e.offsetWidth;let i=this.measureContentWidth(e);return e.style.fontSize=r,i}measureCharScopeWidth(e){let t=0;Array.from(e.querySelectorAll(`.-s-char`)).forEach(e=>{let n=e.getBoundingClientRect(),r=window.getComputedStyle(e);t+=n.width+(parseFloat(r.marginLeft)||0)+(parseFloat(r.marginRight)||0)});let n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT),r=n.nextNode();for(;r;){let e=r.parentElement,i=!!e?.closest(`.-s-char`),a=!!e&&!e.classList.contains(`-s-char`)&&!e.classList.contains(`-s-word`)&&!e.classList.contains(`-s-line`)&&!e.querySelector(`.-s-char, .-s-word, .-s-line`);if(!i&&!a&&r.textContent?.length){let e=document.createRange();e.selectNodeContents(r),t+=e.getBoundingClientRect().width}r=n.nextNode()}return Array.from(e.querySelectorAll(`*`)).filter(e=>{let t=e;return!t.classList.contains(`-s-char`)&&!t.classList.contains(`-s-word`)&&!t.classList.contains(`-s-line`)&&!t.querySelector(`.-s-char, .-s-word, .-s-line`)}).forEach(e=>{t+=e.getBoundingClientRect().width}),t}measureContentWidth(e){if(!e.childNodes.length)return e.getBoundingClientRect().width;let t=document.createRange();return t.selectNodeContents(e),t.getBoundingClientRect().width}computeFitFontSize(e,t,n,r){let i=r===void 0?0:n-r,a=n-i;return a<=0?t/n*e:e*(t-i)/a}computeValue(e,t,n){if(e.align.startsWith(`random`)){let t=e.random?.min??0,r=e.random?.max??n-1;return Math.floor(Math.random()*(r-t+1))+t}switch(e.align){case`start`:return t;case`end`:return n-t-1;case`center`:{let e=Math.floor((n-1)/2);return Math.abs(t-e)}default:return t}}applyCalculatedValues(e,t){let n=e=>e.words.reduce((e,t)=>e+t.chars.length,0),r=e.reduce((e,t)=>e+t.words.length,0),i=e.reduce((e,t)=>e+t.words.reduce((e,t)=>e+t.chars.length,0),0);e.forEach((a,o)=>{t.line&&(a.calculatedValues=t.line.map(t=>({type:`line`,align:t.align,value:this.computeValue(t,o,e.length)}))),a.words.forEach(e=>{t.word&&(e.calculatedValues=t.word.map(t=>({type:`word`,align:t.align,value:this.computeValue(t,e.wordIndexGlobal,r)}))),t.wordLine&&(e.calculatedValues??=[],e.calculatedValues.push(...t.wordLine.map(t=>({type:`wordLine`,align:t.align,value:this.computeValue(t,e.wordIndexInLine,a.words.length)}))));let o=n(a);e.chars.forEach(n=>{let r=[];t.char&&r.push(...t.char.map(e=>({type:`char`,align:e.align,value:this.computeValue(e,n.charIndexGlobal,i)}))),t.charWord&&r.push(...t.charWord.map(t=>({type:`charWord`,align:t.align,value:this.computeValue(t,n.charIndexInWord,e.chars.length)}))),t.charLine&&r.push(...t.charLine.map(e=>({type:`charLine`,align:e.align,value:this.computeValue(e,n.charIndexInLine,o)}))),n.calculatedValues=r})})})}escapeAttribute(e){return e.replace(/src="(https?:\/\/[^"\s]+)"/g,`src=$1`)}};function et(e,t){let n=null;return function(...r){let i=this;n&&clearTimeout(n),n=setTimeout(()=>{e.apply(i,r),n=null},t)}}var tt=class{fps=0;isAnimationStarted=!1;fpsInterval=0;then=0;requestAnimationId=0;onVisibilityChangeBind;onFrameCallback=e=>{};animate=()=>{};constructor(){this.onVisibilityChangeBind=this.onVisibilityChange.bind(this)}onVisibilityChange(){document.hidden?(this.stop(),this.isAnimationStarted=!1):this.start(this.fps)}start(e){this.fps=e,!this.isAnimationStarted&&(this.fpsInterval=1e3/e,this.then=performance.now(),this.isAnimationStarted=!0,this.animate=e===0?()=>{let e=performance.now();this.requestAnimationId=requestAnimationFrame(this.animate),this.onFrameCallback(e)}:()=>{let e=performance.now(),t=e-this.then;t>this.fpsInterval&&(this.then=e-t%this.fpsInterval,this.onFrameCallback(e)),this.requestAnimationId=requestAnimationFrame(this.animate)},this.animate())}stop(){this.isAnimationStarted&&=(cancelAnimationFrame(this.requestAnimationId),this.requestAnimationId=0,!1)}setOnFrame(e){this.onFrameCallback=e}destructor(){this.stop()}},nt=(e=>(e.ACTIVE=`-active`,e.ENTERING=`-entering`,e.LEAVING=`-leaving`,e.DISABLED=`-disabled`,e))(nt||{}),rt={PROGRESS:`--sequence-progress`,DIRECTION:`--sequence-direction`};(class e extends c{activeStep=new Map;leavingStep=new Map;transitions=new Map;elementIndex=new Map;triggerElements=new Map;globalSettings=new Map;stateRegistered=new Set;lastEnteredStep=new Map;defaultDuration;initialized=!1;static ALL_STATES=Object.values(nt);constructor(e){super(e),this.htmlKey=`sequence`,this.defaultDuration=this.settings[`sequence-duration`]??600,this.attributesToMap=[...this.attributesToMap,{key:`sequence`,type:`string`,fallback:``},{key:`sequence-trigger`,type:`string`,fallback:``},{key:`entering-easing`,type:`string`,fallback:``},{key:`leaving-easing`,type:`string`,fallback:``},{key:`entering-duration`,type:`string`,fallback:``},{key:`leaving-duration`,type:`string`,fallback:``},{key:`sequence-duration`,type:`string`,fallback:``},{key:`active-step`,type:`string`,fallback:``}]}onInit(){super.onInit(),this.events.on(`sequence`,this.onSequenceEvent.bind(this)),this.scanStandaloneTriggers()}scanStandaloneTriggers(){let e=document.querySelectorAll(`[string-sequence-trigger]:not([string-inited])`);for(let t of Array.from(e)){let e=t.getAttribute(`string-sequence-trigger`),n=e?this.parseTriggerKey(e):null;n&&(this.triggerElements.set(t,n),t.addEventListener(`click`,this.onTriggerClick))}}parseGlobalSettingsFromObject(e){let t=t=>e.getProperty(t),n=t(`sequence-duration`);this.tryParseGlobalSetting(n,`enteringDuration`),this.tryParseGlobalSetting(n,`leavingDuration`),this.tryParseGlobalSetting(t(`entering-duration`),`enteringDuration`),this.tryParseGlobalSetting(t(`leaving-duration`),`leavingDuration`),this.tryParseGlobalSetting(t(`entering-easing`),`enteringEasing`),this.tryParseGlobalSetting(t(`leaving-easing`),`leavingEasing`),this.tryParseGlobalSetting(t(`active-step`),`activeStep`)}tryParseGlobalSetting(e,t){if(!e)return;let n=e.match(/^(.+)\[(.+)\]$/);if(!n)return;let[,r,i]=n,a=this.globalSettings.get(r)??{};this.globalSettings.set(r,a),a[t]=t===`enteringEasing`||t===`leavingEasing`?i:parseFloat(i),this.applyGlobalSettingsToExistingObjects(r)}applyGlobalSettingsToExistingObjects(e){let t=this.globalSettings.get(e);if(t){for(let[n,r]of this.elementIndex)if(this.parseSequenceKey(n)?.slider===e){t.enteringDuration!==void 0&&(r.enteringDuration=t.enteringDuration),t.leavingDuration!==void 0&&(r.leavingDuration=t.leavingDuration);for(let e of r.objects)this.resolveEasings(e,n)}}}initializeSliders(){let e=new Set;for(let t of this.elementIndex.keys()){let n=this.parseSequenceKey(t);n&&e.add(n.slider)}for(let t of e){if(this.activeStep.has(t))continue;let e=this.globalSettings.get(t)?.activeStep??0;this.elementIndex.has(`${t}[${e}]`)||(e=0),this.switchInstant(t,e,1)}}tryApplyPendingActiveStep(e){if(this.activeStep.has(e))return;let t=this.globalSettings.get(e)?.activeStep;t!==void 0&&this.elementIndex.has(`${e}[${t}]`)&&this.switchInstant(e,t,1)}canConnect(e){return e.keys.includes(`sequence`)||e.keys.includes(`sequence-trigger`)}onObjectConnected(e){super.onObjectConnected(e),this.parseGlobalSettingsFromObject(e);let t=e.getProperty(`sequence`),n=e.getProperty(`sequence-trigger`);if(!t&&n){let r=this.parseTriggerKey(n);r&&typeof r.step==`number`&&(t=`${r.slider}[${r.step}]`,e.setProperty(`sequence`,t))}if(t){let n=this.parseSequenceKey(t);if(n){this.ensureStateEventRegistered(n.slider);let r=this.elementIndex.get(t);if(!r){let{enteringDuration:n,leavingDuration:i}=this.resolveDurations(e,t);r={objects:[],enteringDuration:n,leavingDuration:i},this.elementIndex.set(t,r)}r.objects.push(e),this.resolveEasings(e,t);let i=this.activeStep.get(n.slider);this.setState(e,i===n.step?`-active`:`-disabled`,+(i===n.step),1),this.tryApplyPendingActiveStep(n.slider)}}if(n){let t=this.parseTriggerKey(n);t&&(this.triggerElements.set(e.htmlElement,t),e.htmlElement.addEventListener(`click`,this.onTriggerClick))}}ensureStateEventRegistered(e){this.stateRegistered.has(e)||(this.stateRegistered.add(e),this.events.registerStateEvent?.(`sequence:active:${e}`))}parseTriggerKey(e){let t=e.match(/^(.+)\[(next|prev|\d+)(\|loop)?\]$/);if(!t)return null;let n=t[2]===`next`||t[2]===`prev`?t[2]:parseInt(t[2],10);return{slider:t[1],step:n,loop:t[3]===`|loop`}}getMaxStep(e){let t=-1;for(let n of this.elementIndex.keys()){let r=this.parseSequenceKey(n);r?.slider===e&&r.step>t&&(t=r.step)}return t}resolveDuration(e,t,n,r){let i=e.getProperty(r),a=e.getProperty(`sequence-duration`),o=this.globalSettings.get(t)?.[n];if(i&&!i.includes(`[`)){let e=parseFloat(i);if(!isNaN(e))return e}if(a&&!a.includes(`[`)){let e=parseFloat(a);if(!isNaN(e))return e}return o??this.defaultDuration}resolveDurations(e,t){let n=this.parseSequenceKey(t)?.slider??``;return{enteringDuration:this.resolveDuration(e,n,`enteringDuration`,`entering-duration`),leavingDuration:this.resolveDuration(e,n,`leavingDuration`,`leaving-duration`)}}resolveEasing(e,t,n,r){let i=e.getProperty(r);(!i||typeof i==`string`&&i.includes(`[`))&&(i=this.globalSettings.get(t)?.[n]??this.settings.easing??`ease-out`),typeof i==`string`&&e.setProperty(r,this.tools.easingFunction.process({easing:i}))}resolveEasings(e,t){let n=this.parseSequenceKey(t)?.slider;n&&(this.resolveEasing(e,n,`enteringEasing`,`entering-easing`),this.resolveEasing(e,n,`leavingEasing`,`leaving-easing`))}onObjectDisconnected(e){super.onObjectDisconnected(e);let t=e.getProperty(`sequence`);if(t){let n=this.elementIndex.get(t);if(n){let r=n.objects.indexOf(e);r!==-1&&n.objects.splice(r,1),n.objects.length||this.elementIndex.delete(t)}}this.triggerElements.has(e.htmlElement)&&(e.htmlElement.removeEventListener(`click`,this.onTriggerClick),this.triggerElements.delete(e.htmlElement))}parseSequenceKey(e){let t=e.match(/^(.+)\[(\d+)\]$/);return t?{slider:t[1],step:parseInt(t[2],10)}:null}onTriggerClick=e=>{let t=this.triggerElements.get(e.currentTarget);if(!t)return;let n=this.activeStep.get(t.slider)??0,r=this.getMaxStep(t.slider),i,a;if(t.step===`next`){if(i=n+1,a=1,!this.elementIndex.has(`${t.slider}[${i}]`)){if(t.loop&&r>=0)i=0;else return}}else if(t.step===`prev`){if(i=n-1,a=-1,i<0){if(t.loop&&r>=0)i=r;else return}if(!this.elementIndex.has(`${t.slider}[${i}]`))return}else{if(i=t.step,n===i)return;a=i>n?1:-1}this.startTransition(t.slider,i,a)};onSequenceEvent(e){let{slider:t,step:n,transitionProgress:r,direction:i=1,duration:a,instant:o}=e;this.activeStep.get(t)===n&&r===void 0||(r===void 0?o?this.switchInstant(t,n,i):this.startTransition(t,n,i,a):this.handleScrub(t,n,r,i))}startTransition(e,t,n,r){let i=this.activeStep.get(e),a=this.leavingStep.get(e);this.ensureStateEventRegistered(e),a!==void 0&&a!==i&&this.setStepState(e,a,`-disabled`,0,n);let o=this.elementIndex.get(`${e}[${t}]`),s=i===void 0?null:this.elementIndex.get(`${e}[${i}]`);i!==void 0&&this.leavingStep.set(e,i),this.activeStep.set(e,t),this.emitActiveState(e,t);let c={fromStep:i??t,toStep:t,direction:n,startTime:this.data.time.now,enteringDuration:r??o?.enteringDuration??this.defaultDuration,leavingDuration:r??s?.leavingDuration??this.defaultDuration};this.transitions.set(e,c),this.emitTransitionStart(e,c)}handleScrub(e,t,n,r){this.transitions.delete(e);let i=this.activeStep.get(e);if(i!==t){let n=this.leavingStep.get(e);n!==void 0&&this.setStepState(e,n,`-disabled`,0,r),i!==void 0&&this.leavingStep.set(e,i),this.activeStep.set(e,t),this.emitActiveState(e,t)}let a=this.leavingStep.get(e)??i??t;this.applyProgress(e,a,t,n,n,r)}switchInstant(e,t,n){this.transitions.delete(e);let r=this.activeStep.get(e),i=this.leavingStep.get(e);i!==void 0&&this.setStepState(e,i,`-disabled`,0,n),r!==void 0&&r!==t&&this.setStepState(e,r,`-disabled`,0,n),this.activeStep.set(e,t),this.leavingStep.delete(e),this.setStepState(e,t,`-active`,1,n),this.emitActiveState(e,t),i!==void 0&&i!==t?this.emitStepLeave(e,i,n,!0):r!==void 0&&r!==t&&this.emitStepLeave(e,r,n,!0),this.emitStepEnter(e,t,n,!0);let a={fromStep:r??t,toStep:t,direction:n,startTime:this.data.time.now,enteringDuration:0,leavingDuration:0};this.emitTransitionStart(e,a),this.emitTransitionEnd(e,t,r??t,n,!0)}applyProgress(e,t,n,r,i,a){let o=this.activeStep.get(e),s=this.leavingStep.get(e);this.setStepState(e,o,r>=1?`-active`:`-entering`,r,a),s!==void 0&&s!==o&&(i>=1?(this.setStepState(e,s,`-disabled`,0,a),this.leavingStep.delete(e),this.emitStepLeave(e,s,a,!1)):this.setStepState(e,s,`-leaving`,i,a)),this.emitTransitionProgress(e,t,n,r,i,a),r>=1&&this.emitStepEnter(e,o,a,!1)}setStepState(e,t,n,r,i){let a=this.elementIndex.get(`${e}[${t}]`);if(a)for(let e of a.objects)this.setState(e,n,r,i)}setState(t,n,r,i){let a=t.htmlElement,o=t.getProperty(`_state`),s=t.getProperty(`_direction`),c=t.getProperty(n===`-leaving`?`leaving-easing`:`entering-easing`);typeof c==`function`&&c(r),o!==n&&(a.classList.remove(...e.ALL_STATES),a.classList.add(n),t.setProperty(`_state`,n)),s!==i&&(t.setProperty(`_direction`,i),N.run(()=>N.setVars(a,{[rt.DIRECTION]:i.toString()})))}onFrame(e){super.onFrame(e),this.initialized||(this.initialized=!0,this.initializeSliders());for(let[t,n]of this.transitions){let r=e.time.now-n.startTime,i=Math.min(1,r/n.enteringDuration),a=Math.min(1,r/n.leavingDuration);this.applyProgress(t,n.fromStep,n.toStep,i,a,n.direction),i>=1&&a>=1&&(this.emitTransitionEnd(t,n.toStep,n.fromStep,n.direction,!1),this.transitions.delete(t))}}emitTransitionStart(e,t){let n={slider:e,from:t.fromStep,to:t.toStep,direction:t.direction,enteringDuration:t.enteringDuration,leavingDuration:t.leavingDuration,startedAt:t.startTime};this.events.emit(`sequence:transition:start`,n),this.events.emit(`sequence:transition:start:${e}`,n)}emitTransitionProgress(e,t,n,r,i,a){let o={slider:e,from:t,to:n,entering:r,leaving:i,direction:a};this.events.emit(`sequence:transition:progress`,o),this.events.emit(`sequence:transition:progress:${e}`,o)}emitTransitionEnd(e,t,n,r,i){let a={slider:e,from:n,to:t,direction:r,instant:i};this.events.emit(`sequence:transition:end`,a),this.events.emit(`sequence:transition:end:${e}`,a)}emitStepEnter(e,t,n,r){if(!r&&this.lastEnteredStep.get(e)===t)return;this.lastEnteredStep.set(e,t);let i={slider:e,step:t,direction:n,instant:r};this.events.emit(`sequence:step:enter`,i),this.events.emit(`sequence:step:enter:${e}`,i)}emitStepLeave(e,t,n,r){if(t==null)return;let i={slider:e,step:t,direction:n,instant:r};this.events.emit(`sequence:step:leave`,i),this.events.emit(`sequence:step:leave:${e}`,i)}emitActiveState(e,t){let n={slider:e,step:t};this.events.emit(`sequence:active`,n),this.events.emit(`sequence:active:${e}`,n)}});var it=class{root;scopes=new Map;constructor(e){this.root={element:e,epoch:0}}register(e){let t=this.scopes.get(e);return t||(t={element:e,epoch:0},this.scopes.set(e,t)),t}unregister(e){this.scopes.delete(e)}bump(e){e.epoch++}bumpRoot(){this.root.epoch++}resolveChain(e){let t=[],n=e.parentElement;for(;n;){let e=this.scopes.get(n);e&&t.push(e),n=n.parentElement}return t.push(this.root),t}static sumEpochs(e){let t=0;for(let n=0;n<e.length;n++)t+=e[n].epoch;return t}},at=class{constructor(e){this.scopes=e}map=new WeakMap;transformNullify=new E;attach(e,t){if(this.map.has(e))return;let n=e.htmlElement,r={cx:0,cy:0,width:0,height:0,valid:!1,epochSum:-1,scopeChain:this.scopes.resolveChain(n),el:n,nullifyTransform:t?.nullifyTransform===!0};r.ro=new ResizeObserver(()=>{r.valid=!1}),r.ro.observe(n),this.map.set(e,r)}detach(e){let t=this.map.get(e);t&&(t.ro?.disconnect(),this.map.delete(e))}invalidate(e){let t=this.map.get(e);t&&(t.valid=!1)}invalidateAll(){this.scopes.bumpRoot()}ensureFresh(e){let t=it.sumEpochs(e.scopeChain);if(e.valid&&e.epochSum===t||!e.el)return;let n=e.nullifyTransform?this.transformNullify.process({element:e.el}):e.el.getBoundingClientRect();e.cx=n.left+n.width/2,e.cy=n.top+n.height/2,e.width=n.width,e.height=n.height,e.valid=!0,e.epochSum=t}getCenter(e){let t=this.map.get(e);return!t||!t.el?{cx:0,cy:0}:(this.ensureFresh(t),{cx:t.cx,cy:t.cy})}getRect(e){let t=this.map.get(e);if(!t||!t.el)return null;this.ensureFresh(t);let n=t.width/2,r=t.height/2;return{left:t.cx-n,right:t.cx+n,top:t.cy-r,bottom:t.cy+r,width:t.width,height:t.height}}},ot=class{active=new Set;subs=new WeakMap;track(e){if(this.subs.has(e))return;let t=e.htmlElement,n=()=>this.active.add(e),r=()=>this.active.delete(e);t.addEventListener(`pointerenter`,n),t.addEventListener(`pointerleave`,r),this.subs.set(e,{enter:n,leave:r})}untrack(e){let t=this.subs.get(e);if(!t)return;let n=e.htmlElement;t.enter&&n.removeEventListener(`pointerenter`,t.enter),t.leave&&n.removeEventListener(`pointerleave`,t.leave),this.active.delete(e),this.subs.delete(e)}isActive(e){return this.active.has(e)}activeObjects(){return Array.from(this.active)}},st=class{constructor(e){this.emit=e}values=new Map;publish(e,t,n){let r=this.getKey(e,t);this.values.set(r,n),this.emit(this.getEventName(e,t),n)}subscribe(e,t,n,r){n.on(this.getEventName(e,t),r)}unsubscribe(e,t,n,r){n.off(this.getEventName(e,t),r)}get(e,t){return this.values.get(this.getKey(e,t))}getEventName(e,t){return`signal:${e}:${t}`}getKey(e,t){return`${e}.${t}`}},ct=[{id:`icon-20_logo`,viewBox:`0 0 20 20`,content:`<path fill="currentColor" id="Combined-Shape" d="M9.443,4.529L13.911,10.273L19.885,15.217L18.865,16.45L12.823,11.45L12.702,11.324L8.181,5.511C7.834,5.066 7.161,5.065 6.814,5.51L1.297,12.564L0.036,11.578L5.553,4.524C6.543,3.259 8.458,3.261 9.443,4.529ZM14.407,2.737L16.907,6.07L16.427,6.43L13.927,3.097L14.407,2.737ZM16.907,1.487L19.407,4.82L18.927,5.18L16.427,1.847L16.907,1.487Z"/>`},{id:`icon-20_layout`,viewBox:`0 0 20 20`,content:`<path fill="currentColor" d="M8.4,1.25L11.6,1.25C14.024,1.25 15.231,1.296 16.156,1.768C17.05,2.223 17.777,2.95 18.232,3.844C18.704,4.769 18.75,5.976 18.75,8.4L18.75,11.6C18.75,14.024 18.704,15.231 18.232,16.156C17.777,17.05 17.05,17.777 16.156,18.232C15.231,18.704 14.024,18.75 11.6,18.75L8.4,18.75C5.976,18.75 4.769,18.704 3.844,18.232C2.95,17.777 2.223,17.05 1.768,16.156C1.296,15.231 1.25,14.024 1.25,11.6L1.25,8.4C1.25,5.976 1.296,4.769 1.768,3.844C2.223,2.95 2.95,2.223 3.844,1.768C4.769,1.296 5.976,1.25 8.4,1.25ZM8.4,2.75C6.343,2.75 5.31,2.704 4.525,3.104C3.913,3.416 3.416,3.913 3.104,4.525C2.704,5.31 2.75,6.343 2.75,8.4L2.75,11.6C2.75,13.657 2.704,14.69 3.104,15.475C3.416,16.087 3.913,16.584 4.525,16.896C5.31,17.296 6.343,17.25 8.4,17.25L11.6,17.25C13.657,17.25 14.69,17.296 15.475,16.896C16.087,16.584 16.584,16.087 16.896,15.475C17.296,14.69 17.25,13.657 17.25,11.6L17.25,8.4C17.25,6.343 17.296,5.31 16.896,4.525C16.584,3.913 16.087,3.416 15.475,3.104C14.69,2.704 13.657,2.75 11.6,2.75L8.4,2.75ZM6.5,8.5L5.5,8.5L5.5,7.5L6.5,7.5L6.5,8.5ZM14.5,10.5L13.5,10.5L13.5,9.5L14.5,9.5L14.5,10.5ZM14.5,6.5L13.5,6.5L13.5,5.5L14.5,5.5L14.5,6.5ZM14.5,8.5L13.5,8.5L13.5,7.5L14.5,7.5L14.5,8.5ZM6.5,10.5L5.5,10.5L5.5,9.5L6.5,9.5L6.5,10.5ZM6.5,4.5L5.5,4.5L5.5,3.5L6.5,3.5L6.5,4.5ZM6.5,6.5L5.5,6.5L5.5,5.5L6.5,5.5L6.5,6.5ZM6.5,14.5L5.5,14.5L5.5,13.5L6.5,13.5L6.5,14.5ZM6.5,12.5L5.5,12.5L5.5,11.5L6.5,11.5L6.5,12.5ZM14.5,16.5L13.5,16.5L13.5,15.5L14.5,15.5L14.5,16.5ZM6.5,16.5L5.5,16.5L5.5,15.5L6.5,15.5L6.5,16.5ZM14.5,4.5L13.5,4.5L13.5,3.5L14.5,3.5L14.5,4.5ZM14.5,12.5L13.5,12.5L13.5,11.5L14.5,11.5L14.5,12.5ZM14.5,14.5L13.5,14.5L13.5,13.5L14.5,13.5L14.5,14.5ZM10.5,14.5L9.5,14.5L9.5,13.5L10.5,13.5L10.5,14.5ZM10.5,6.5L9.5,6.5L9.5,5.5L10.5,5.5L10.5,6.5ZM10.5,16.5L9.5,16.5L9.5,15.5L10.5,15.5L10.5,16.5ZM10.5,4.5L9.5,4.5L9.5,3.5L10.5,3.5L10.5,4.5ZM10.5,8.5L9.5,8.5L9.5,7.5L10.5,7.5L10.5,8.5ZM10.5,10.5L9.5,10.5L9.5,9.5L10.5,9.5L10.5,10.5ZM10.5,12.5L9.5,12.5L9.5,11.5L10.5,11.5L10.5,12.5ZM6.5,20L5.5,20L5.5,19.5L6.5,19.5L6.5,20ZM6.5,0.5L5.5,0.5L5.5,0L6.5,0L6.5,0.5ZM14.5,20L13.5,20L13.5,19.5L14.5,19.5L14.5,20ZM14.5,0.5L13.5,0.5L13.5,0L14.5,0L14.5,0.5ZM10.5,20L9.5,20L9.5,19.5L10.5,19.5L10.5,20ZM10.5,0.5L9.5,0.5L9.5,0L10.5,0L10.5,0.5Z"/>`},{id:`icon-20_intersection`,viewBox:`0 0 20 20`,content:`<path fill="currentColor" d="M12.702,1.659C13.408,2.018 13.982,2.592 14.341,3.298C14.577,3.76 14.589,4.044 14.75,4.341C14.958,4.726 15.274,5.042 15.659,5.25C15.956,5.41 16.24,5.423 16.702,5.659C17.408,6.018 17.982,6.592 18.341,7.298C18.704,8.009 18.75,8.936 18.75,10.8L18.75,13.2C18.75,15.064 18.704,15.991 18.341,16.702C17.982,17.408 17.408,17.982 16.702,18.341C15.991,18.704 15.064,18.75 13.2,18.75L10.8,18.75C8.936,18.75 8.009,18.704 7.298,18.341C6.592,17.982 6.018,17.408 5.659,16.702C5.423,16.24 5.411,15.956 5.25,15.659C5.042,15.274 4.726,14.958 4.341,14.75C4.044,14.589 3.76,14.577 3.298,14.341C2.592,13.982 2.018,13.408 1.659,12.702C1.296,11.991 1.25,11.064 1.25,9.2L1.25,6.8C1.25,4.936 1.296,4.009 1.659,3.298C2.018,2.592 2.592,2.018 3.298,1.659C4.009,1.296 4.936,1.25 6.8,1.25L9.2,1.25C11.064,1.25 11.991,1.296 12.702,1.659ZM13.715,5.502C13.61,5.36 13.515,5.211 13.431,5.055C13.265,4.748 13.248,4.456 13.005,3.979C12.789,3.555 12.445,3.211 12.021,2.995C11.45,2.704 10.697,2.75 9.2,2.75L6.8,2.75C5.303,2.75 4.55,2.704 3.979,2.995C3.555,3.211 3.211,3.555 2.995,3.979C2.704,4.55 2.75,5.303 2.75,6.8L2.75,9.2C2.75,10.697 2.704,11.45 2.995,12.021C3.211,12.445 3.555,12.789 3.979,13.005C4.456,13.248 4.748,13.265 5.055,13.431C5.275,13.55 5.481,13.69 5.672,13.848C5.562,13.658 5.5,13.438 5.5,13.203L5.5,10.8C5.5,8.997 5.531,8.1 5.881,7.411C6.217,6.752 6.752,6.217 7.411,5.881C8.1,5.531 8.997,5.5 10.8,5.5L13.2,5.5L13.626,5.5C13.658,5.5 13.687,5.501 13.715,5.502ZM6.152,14.328C6.31,14.519 6.45,14.725 6.569,14.945C6.735,15.252 6.752,15.544 6.995,16.021C7.211,16.445 7.555,16.789 7.979,17.005C8.55,17.296 9.303,17.25 10.8,17.25L13.2,17.25C14.697,17.25 15.45,17.296 16.021,17.005C16.445,16.789 16.789,16.445 17.005,16.021C17.296,15.45 17.25,14.697 17.25,13.2L17.25,10.8C17.25,9.303 17.296,8.55 17.005,7.979C16.789,7.555 16.445,7.211 16.021,6.995C15.544,6.752 15.252,6.735 14.945,6.569C14.789,6.485 14.641,6.39 14.5,6.286L14.5,6.8L14.5,9.2C14.5,11.003 14.469,11.9 14.119,12.589C13.783,13.248 13.248,13.783 12.589,14.119C11.9,14.469 11.003,14.5 9.2,14.5L6.797,14.5C6.562,14.5 6.342,14.438 6.152,14.328ZM13.5,6.5L13.2,6.5L10.8,6.5C9.242,6.5 8.46,6.469 7.865,6.772C7.395,7.012 7.012,7.395 6.772,7.865C6.469,8.46 6.5,9.242 6.5,10.8L6.5,13.203C6.5,13.367 6.633,13.5 6.797,13.5L9.2,13.5C10.758,13.5 11.54,13.531 12.135,13.228C12.605,12.988 12.988,12.605 13.228,12.135C13.531,11.54 13.5,10.758 13.5,9.2L13.5,6.8L13.5,6.5ZM10,8C11.104,8 12,8.896 12,10C12,11.104 11.104,12 10,12C8.896,12 8,11.104 8,10C8,8.896 8.896,8 10,8Z"/>`},{id:`icon-20_progress`,viewBox:`0 0 20 20`,content:`<path fill="currentColor" d="M11.6,2.5L11.6,1.5L12.402,1.501L12.398,2.501L11.6,2.5ZM11.6,2.5L11.4,2.5L11.4,1.5L11.598,1.5L11.6,2.5ZM2.5,11.378L2.501,12.376L1.501,12.379L1.5,11.378L2.5,11.378ZM6.105,18.243C4.791,18.574 3.416,18.75 2,18.75L2,17.25C2.393,17.25 2.783,17.235 3.169,17.206L3.683,16.624C3.879,16.796 4.094,16.948 4.326,17.074C10.886,16.07 16.07,10.886 17.074,4.326C16.951,4.1 16.804,3.89 16.636,3.698L17.203,3.203C17.234,2.806 17.25,2.405 17.25,2L18.75,2C18.75,3.424 18.572,4.807 18.238,6.128L18.469,6.116C18.484,6.421 18.492,6.758 18.496,7.136L17.946,7.141C16.296,12.264 12.245,16.31 7.119,17.953L7.113,18.496C6.735,18.492 6.398,18.484 6.093,18.468L6.105,18.243ZM9.4,1.5L9.4,2.5L8.363,2.5L8.363,1.5L9.4,1.5ZM2.5,9.378L1.5,9.378L1.5,8.378L2.5,8.378L2.5,9.378ZM14.348,2.568L14.448,1.573C14.864,1.615 15.216,1.681 15.53,1.781L15.227,2.734C14.972,2.653 14.685,2.602 14.348,2.568ZM17.5,9.141L18.5,9.141L18.5,10.141L17.5,10.141L17.5,9.141ZM17.5,12.14L18.5,12.141C18.499,12.509 18.497,12.843 18.492,13.149L17.492,13.132C17.498,12.831 17.499,12.502 17.5,12.14ZM17.326,15.012L18.298,15.246C18.227,15.539 18.133,15.8 18.01,16.043C17.964,16.133 17.915,16.221 17.864,16.307L17.005,15.794C17.045,15.727 17.083,15.659 17.119,15.589C17.208,15.413 17.275,15.224 17.326,15.012ZM15.777,17.015L16.285,17.877C16.206,17.923 16.125,17.968 16.043,18.01C15.794,18.137 15.525,18.233 15.221,18.304L14.993,17.33C15.213,17.279 15.408,17.211 15.589,17.119C15.653,17.086 15.716,17.051 15.777,17.015ZM13.11,17.493L13.127,18.493C12.821,18.498 12.486,18.499 12.119,18.5L12.118,17.5C12.48,17.499 12.809,17.498 13.11,17.493ZM10.119,17.5L10.119,18.5L9.119,18.5L9.119,17.5L10.119,17.5ZM2.728,15.209L1.773,15.506C1.676,15.192 1.611,14.84 1.57,14.425L2.565,14.327C2.599,14.665 2.649,14.953 2.728,15.209ZM2.52,6.396L1.521,6.36C1.535,5.966 1.56,5.622 1.6,5.316L2.591,5.447C2.555,5.725 2.533,6.038 2.52,6.396ZM3.232,3.858L2.441,3.246C2.671,2.949 2.937,2.682 3.233,2.451L3.848,3.24C3.618,3.419 3.411,3.627 3.232,3.858ZM5.433,2.593L5.3,1.602C5.606,1.561 5.95,1.536 6.345,1.521L6.382,2.52C6.024,2.534 5.711,2.556 5.433,2.593Z"/>`},{id:`icon-20_ruler`,viewBox:`0 0 20 20`,content:`<path fill="currentColor" d="M6,17.75C4.915,17.75 4.376,17.718 3.948,17.541C3.343,17.29 2.847,16.832 2.55,16.248C2.296,15.75 2.25,15.104 2.25,13.8L2.25,6.2C2.25,4.896 2.296,4.25 2.55,3.752C2.813,3.234 3.234,2.813 3.752,2.55C4.25,2.296 4.896,2.25 6.2,2.25L13.8,2.25C15.104,2.25 15.75,2.296 16.248,2.55C16.832,2.847 17.29,3.343 17.541,3.948C17.718,4.376 17.75,4.915 17.75,6L17.75,6.4C17.75,7.144 17.704,7.51 17.559,7.794C17.391,8.124 17.124,8.391 16.794,8.559C16.51,8.704 16.144,8.75 15.4,8.75L10,8.75L10,7.25L12.5,7.25L12.5,6L13.5,6L13.5,7.25L15.4,7.25C15.61,7.25 15.777,7.25 15.916,7.244C16.002,7.24 16.064,7.248 16.113,7.223C16.161,7.199 16.199,7.161 16.223,7.113C16.248,7.064 16.244,6.916 16.244,6.916C16.244,6.916 16.25,5.61 16.25,5.4C16.25,5.4 16.243,4.735 16.155,4.522C16.041,4.247 15.833,4.021 15.567,3.886C15.21,3.704 14.737,3.75 13.8,3.75L6.2,3.75C5.263,3.75 4.79,3.704 4.433,3.886C4.197,4.006 4.006,4.197 3.886,4.433C3.704,4.79 3.75,5.263 3.75,6.2L3.75,13.8C3.75,14.737 3.704,15.21 3.886,15.567C4.021,15.833 4.247,16.041 4.522,16.155C4.829,16.282 5.221,16.25 6,16.25L6,17.75ZM6,17.75L6.006,16.25L6.399,16.25C6.609,16.25 6.777,16.25 6.916,16.244C7.002,16.24 7.064,16.248 7.113,16.223C7.161,16.199 7.199,16.161 7.223,16.113C7.248,16.064 7.24,16.002 7.244,15.916C7.25,15.777 7.25,15.61 7.25,15.4L7.25,13.5L6,13.5L6,12.5L7.25,12.5L7.25,8.5L6,8.5L6,7.5L7.25,7.5L7.25,6L8.75,6L8.75,15.4C8.75,16.144 8.704,16.51 8.559,16.794C8.391,17.124 8.124,17.391 7.794,17.559C7.51,17.704 7.144,17.75 6.4,17.75L6,17.75Z"/>`},{id:`icon-16_noplus`,viewBox:`0 0 16 16`,content:`<path fill="currentColor" d="M2.38,0.675L7.499,6.647L7.5,1L8.5,1L8.5,7.5L15,7.5L15,8.5L9.085,8.498L14.38,14.675L13.62,15.325L1.62,1.325L2.38,0.675ZM7.5,10.119L8.5,11.286L8.5,15L7.5,15L7.5,10.119ZM5.254,7.499L6.111,8.499L1,8.5L1,7.5L5.254,7.499Z" />`},{id:`icon-16_nooffset`,viewBox:`0 0 16 16`,content:`<path fill="currentColor" d="M12.067,11.976L14.38,14.675L13.62,15.325L1.62,1.325L2.38,0.675L5.23,4L10.8,4C11.92,4 12.48,4 12.908,4.218C13.284,4.41 13.59,4.716 13.782,5.092C14,5.52 14,6.08 14,7.2L14,8.8C14,9.92 14,10.48 13.782,10.908C13.59,11.284 13.284,11.59 12.908,11.782C12.684,11.896 12.424,11.95 12.067,11.976ZM2.681,4.497L9.111,11.999L5.2,12C4.08,12 3.52,12 3.092,11.782C2.716,11.59 2.41,11.284 2.218,10.908C2,10.48 2,9.92 2,8.8L2,7.2C2,6.08 2,5.52 2.218,5.092C2.334,4.865 2.491,4.663 2.681,4.497ZM12.646,0.646L13.354,1.354L11,3.707L8.646,1.354L9.354,0.646L11,2.293L12.646,0.646ZM7.354,14.646L6.646,15.354L5,13.707L3.354,15.354L2.646,14.646L5,12.293L7.354,14.646Z"/>`},{id:`icon-16_settings`,viewBox:`0 0 16 16`,content:`<path fill="currentColor" d="M8.208,1.177C8.363,1.209 8.524,1.303 8.846,1.489L13.216,4.011C13.538,4.197 13.699,4.291 13.805,4.408C13.899,4.512 13.97,4.635 14.013,4.768C14.062,4.919 14.062,5.105 14.062,5.477L14.062,10.523C14.062,10.895 14.062,11.081 14.013,11.232C13.97,11.365 13.899,11.488 13.805,11.592C13.699,11.709 13.538,11.803 13.216,11.989L8.846,14.511C8.524,14.697 8.363,14.791 8.208,14.823C8.071,14.853 7.929,14.853 7.792,14.823C7.637,14.791 7.476,14.697 7.154,14.511L2.784,11.989C2.462,11.803 2.301,11.709 2.195,11.592C2.101,11.488 2.03,11.365 1.987,11.232C1.938,11.081 1.938,10.895 1.938,10.523L1.938,5.477C1.938,5.105 1.938,4.919 1.987,4.768C2.03,4.635 2.101,4.512 2.195,4.408C2.301,4.291 2.462,4.197 2.784,4.011L7.154,1.489C7.476,1.303 7.637,1.209 7.792,1.177C7.929,1.147 8.071,1.147 8.208,1.177ZM8,5C6.343,5 5,6.343 5,8C5,9.657 6.343,11 8,11C9.657,11 11,9.657 11,8C11,6.343 9.657,5 8,5Z"/>`},{id:`icon-16_options`,viewBox:`0 0 16 16`,content:`<path fill="currentColor" d="M9,7L9,9L7,9L7,7L9,7ZM9,3L9,5L7,5L7,3L9,3ZM9,11L9,13L7,13L7,11L9,11Z"/>`},{id:`icon-16_grab`,viewBox:`0 0 16 16`,content:`<path fill="currentColor" d="M10,4L12,4L12,6L10,6L10,4ZM10,10L12,10L12,12L10,12L10,10ZM7,4L9,4L9,6L7,6L7,4ZM7,10L9,10L9,12L7,12L7,10ZM7,13L9,13L9,15L7,15L7,13ZM4,4L6,4L6,6L4,6L4,4ZM7,1L9,1L9,3L7,3L7,1ZM4,10L6,10L6,12L4,12L4,10Z"/>`},{id:`icon-16_eye`,viewBox:`0 0 16 16`,content:`<path fill="currentColor" d="M8,3C10.692,3 13.2,4.46 15.526,7.381C15.815,7.744 15.815,8.256 15.526,8.619C13.2,11.54 10.692,13 8,13C5.308,13 2.8,11.54 0.474,8.619C0.185,8.256 0.185,7.744 0.474,7.381C2.8,4.46 5.308,3 8,3ZM8,5C6.343,5 5,6.343 5,8C5,9.657 6.343,11 8,11C9.657,11 11,9.657 11,8C11,6.343 9.657,5 8,5Z"/>`},{id:`icon-16_offset`,viewBox:`0 0 16 16`,content:`<path fill="currentColor" d="M5.2,4L10.8,4C11.92,4 12.48,4 12.908,4.218C13.284,4.41 13.59,4.716 13.782,5.092C14,5.52 14,6.08 14,7.2L14,8.8C14,9.92 14,10.48 13.782,10.908C13.59,11.284 13.284,11.59 12.908,11.782C12.48,12 11.92,12 10.8,12L5.2,12C4.08,12 3.52,12 3.092,11.782C2.716,11.59 2.41,11.284 2.218,10.908C2,10.48 2,9.92 2,8.8L2,7.2C2,6.08 2,5.52 2.218,5.092C2.41,4.716 2.716,4.41 3.092,4.218C3.52,4 4.08,4 5.2,4ZM12.646,0.646L13.354,1.354L11,3.707L8.646,1.354L9.354,0.646L11,2.293L12.646,0.646ZM7.354,14.646L6.646,15.354L5,13.707L3.354,15.354L2.646,14.646L5,12.293L7.354,14.646Z"/>`},{id:`icon-16_play-l`,viewBox:`0 0 16 16`,content:`<path fill="currentColor" d="M11.293,3.281C11.769,2.923 12.007,2.745 12.266,2.75C12.491,2.755 12.702,2.86 12.841,3.038C13,3.241 13,3.539 13,4.134L13,11.866C13,12.461 13,12.759 12.841,12.962C12.702,13.14 12.491,13.245 12.266,13.25C12.007,13.255 11.769,13.077 11.293,12.719L6.225,8.919C5.827,8.621 5.629,8.471 5.551,8.272C5.483,8.097 5.483,7.903 5.551,7.728C5.629,7.529 5.827,7.379 6.225,7.081L11.293,3.281ZM2.8,3L4.2,3C4.48,3 4.62,3 4.727,3.054C4.821,3.102 4.898,3.179 4.946,3.273C5,3.38 5,3.52 5,3.8L5,12.2C5,12.48 5,12.62 4.946,12.727C4.898,12.821 4.821,12.898 4.727,12.946C4.62,13 4.48,13 4.2,13L2.8,13C2.52,13 2.38,13 2.273,12.946C2.179,12.898 2.102,12.821 2.054,12.727C2,12.62 2,12.48 2,12.2L2,3.8C2,3.52 2,3.38 2.054,3.273C2.102,3.179 2.179,3.102 2.273,3.054C2.38,3 2.52,3 2.8,3Z"/>`},{id:`icon-16_play-r`,viewBox:`0 0 16 16`,content:`<path fill="currentColor" d="M4.707,3.281L9.775,7.081C10.173,7.379 10.371,7.529 10.449,7.728C10.517,7.903 10.517,8.097 10.449,8.272C10.371,8.471 10.173,8.621 9.775,8.919L4.707,12.719C4.231,13.077 3.993,13.255 3.734,13.25C3.509,13.245 3.298,13.14 3.159,12.962C3,12.759 3,12.461 3,11.866L3,4.134C3,3.539 3,3.241 3.159,3.038C3.298,2.86 3.509,2.755 3.734,2.75C3.993,2.745 4.231,2.923 4.707,3.281ZM11.8,3L13.2,3C13.48,3 13.62,3 13.727,3.054C13.821,3.102 13.898,3.179 13.946,3.273C14,3.38 14,3.52 14,3.8L14,12.2C14,12.48 14,12.62 13.946,12.727C13.898,12.821 13.821,12.898 13.727,12.946C13.62,13 13.48,13 13.2,13L11.8,13C11.52,13 11.38,13 11.273,12.946C11.179,12.898 11.102,12.821 11.054,12.727C11,12.62 11,12.48 11,12.2L11,3.8C11,3.52 11,3.38 11.054,3.273C11.102,3.179 11.179,3.102 11.273,3.054C11.38,3 11.52,3 11.8,3Z"/>`},{id:`icon-16_plus`,viewBox:`0 0 16 16`,content:`<path fill="currentColor" d="M7.5,8.5L1,8.5L1,7.5L7.5,7.5L7.5,1L8.5,1L8.5,7.5L15,7.5L15,8.5L8.5,8.5L8.5,15L7.5,15L7.5,8.5Z"/>`},{id:`icon-16_minus`,viewBox:`0 0 16 16`,content:`<rect x="3" y="7.5" width="10" height="1"/>`},{id:`icon-16_close`,viewBox:`0 0 16 16`,content:`<path fill="currentColor" d="M7.293,8L1.646,2.354L2.354,1.646L8,7.293L13.646,1.646L14.354,2.354L8.707,8L14.354,13.646L13.646,14.354L8,8.707L2.354,14.354L1.646,13.646L7.293,8Z"/>`},{id:`icon-16_layout-columns`,viewBox:`0 0 16 16`,content:`<path fill="currentColor" d="M7,3L9,3L9,13L7,13L7,3ZM3,3L5,3L5,13L3,13L3,3ZM11,3L13,3L13,13L11,13L11,3Z"/>`},{id:`icon-16_layout-rows`,viewBox:`0 0 16 16`,content:`<path fill="currentColor" d="M13,3L13,5L3,5L3,3L13,3ZM13,7L13,9L3,9L3,7L13,7ZM13,11L13,13L3,13L3,11L13,11Z"/>`},{id:`icon-16_layout-center`,viewBox:`0 0 16 16`,content:`<path fill="currentColor" d="M12.673,11.362C12.385,11.926 11.926,12.385 11.362,12.673C10.76,12.98 9.983,12.999 8.501,13L8.5,8.5L13,8.501C12.999,9.983 12.98,10.76 12.673,11.362ZM3,8.501L7.5,8.5L7.5,13C6.017,12.999 5.24,12.98 4.638,12.673C4.074,12.385 3.615,11.926 3.327,11.362C3.02,10.76 3.001,9.983 3,8.501ZM11.362,3.327C11.926,3.615 12.385,4.074 12.673,4.638C12.98,5.24 12.999,6.017 13,7.5L8.5,7.5L8.501,3C9.983,3.001 10.76,3.02 11.362,3.327ZM7.5,3L7.5,7.5L3,7.5C3.001,6.017 3.02,5.24 3.327,4.638C3.615,4.074 4.074,3.615 4.638,3.327C5.24,3.02 6.017,3.001 7.5,3Z"/>`},{id:`icon-16_layout-golden`,viewBox:`0 0 16 16`,content:`<path fill="currentColor" d="M8.488,3L8.5,3L8.501,13C8.404,13 8.304,13 8.2,13L7.8,13C6.12,13 5.28,13 4.638,12.673C4.074,12.385 3.615,11.926 3.327,11.362C3,10.72 3,9.88 3,8.2L3,7.8C3,6.12 3,5.28 3.327,4.638C3.615,4.074 4.074,3.615 4.638,3.327C5.28,3 6.12,3 7.8,3L8.2,3L8.488,3ZM12.673,11.362C12.385,11.926 11.926,12.385 11.362,12.673C10.913,12.902 10.366,12.971 9.501,12.991L9.5,9.5L12.991,9.501C12.971,10.366 12.902,10.913 12.673,11.362ZM11.362,3.327C11.926,3.615 12.385,4.074 12.673,4.638C13,5.28 13,6.12 13,7.8L13,8.2C13,8.304 13,8.404 13,8.501L9.5,8.5L9.501,3.009C10.366,3.029 10.913,3.098 11.362,3.327Z"/>`},{id:`icon-16_layout-thirds`,viewBox:`0 0 16 16`,content:`<path fill="currentColor" d="M6.5,10.5L9.5,10.5L9.501,12.991C9.131,13 8.703,13 8.2,13L7.8,13C7.297,13 6.869,13 6.5,12.991L6.5,10.5ZM3.077,10.502L5.5,10.5L5.499,12.923C5.159,12.876 4.884,12.798 4.638,12.673C4.074,12.385 3.615,11.926 3.327,11.362C3.202,11.116 3.125,10.841 3.077,10.502ZM12.673,11.362C12.385,11.926 11.926,12.385 11.362,12.673C11.116,12.798 10.841,12.875 10.502,12.923L10.5,10.5L12.923,10.502C12.875,10.841 12.798,11.116 12.673,11.362ZM13,7.8L13,8.2C13,8.703 13,9.131 12.991,9.501L10.5,9.5L10.5,6.5L12.991,6.5C13,6.869 13,7.297 13,7.8ZM3.009,6.5L5.5,6.5L5.5,9.5L3.009,9.501C3,9.131 3,8.703 3,8.2L3,7.8C3,7.297 3,6.869 3.009,6.5ZM6.5,6.5L9.5,6.5L9.5,9.5L6.5,9.5L6.5,6.5ZM11.362,3.327C11.926,3.615 12.385,4.074 12.673,4.638C12.798,4.884 12.876,5.159 12.923,5.499L10.5,5.5L10.502,3.077C10.841,3.125 11.116,3.202 11.362,3.327ZM5.499,3.077L5.5,5.5L3.077,5.499C3.124,5.159 3.202,4.884 3.327,4.638C3.615,4.074 4.074,3.615 4.638,3.327C4.884,3.202 5.159,3.124 5.499,3.077ZM9.501,3.009L9.5,5.5L6.5,5.5L6.5,3.009C6.869,3 7.297,3 7.8,3L8.2,3C8.703,3 9.131,3 9.501,3.009Z"/>`},{id:`icon-16_layout-dots`,viewBox:`0 0 16 16`,content:`<path fill="currentColor" d="M11,3L13,3L13,5L11,5L11,3ZM11,7L13,7L13,9L11,9L11,7ZM11,11L13,11L13,13L11,13L11,11ZM7,3L9,3L9,5L7,5L7,3ZM7,7L9,7L9,9L7,9L7,7ZM7,11L9,11L9,13L7,13L7,11ZM3,3L5,3L5,5L3,5L3,3ZM3,7L5,7L5,9L3,9L3,7ZM3,11L5,11L5,13L3,13L3,11Z"/>`},{id:`icon-16_export`,viewBox:`0 0 16 16`,content:`<path fill="currentColor" d="M8.5,5C9.983,5.001 10.76,5.02 11.362,5.327C12.12,5.713 12.678,6.402 12.898,7.224C13,7.605 13,8.07 13,9C13,9.93 13,10.395 12.898,10.776C12.678,11.598 12.12,12.287 11.362,12.673C10.72,13 9.88,13 8.2,13L7.8,13C6.12,13 5.28,13 4.638,12.673C3.88,12.287 3.322,11.598 3.102,10.776C3,10.395 3,9.93 3,9C3,8.07 3,7.605 3.102,7.224C3.322,6.402 3.88,5.713 4.638,5.327C5.24,5.02 6.017,5.001 7.5,5L7.5,10L8.5,10L8.5,5ZM7.5,5L7.5,3.207L6.354,4.354L5.646,3.646L8,1.293L10.354,3.646L9.646,4.354L8.5,3.207L8.5,5L7.5,5Z"/>`},{id:`icon-16_import`,viewBox:`0 0 16 16`,content:`<path fill="currentColor" d="M8.5,5C9.983,5.001 10.76,5.02 11.362,5.327C12.12,5.713 12.678,6.402 12.898,7.224C13,7.605 13,8.07 13,9C13,9.93 13,10.395 12.898,10.776C12.678,11.598 12.12,12.287 11.362,12.673C10.72,13 9.88,13 8.2,13L7.8,13C6.12,13 5.28,13 4.638,12.673C3.88,12.287 3.322,11.598 3.102,10.776C3,10.395 3,9.93 3,9C3,8.07 3,7.605 3.102,7.224C3.322,6.402 3.88,5.713 4.638,5.327C5.24,5.02 6.017,5.001 7.5,5L7.5,8.793L6.354,7.646L5.646,8.354L8,10.707L10.354,8.354L9.646,7.646L8.5,8.793L8.5,5ZM7.5,5L7.5,2L8.5,2L8.5,5L7.5,5Z"/>`},{id:`icon-16_break`,viewBox:`0 0 16 16`,content:`<path fill="currentColor" d="M10.475,11.182L11.182,10.475L14.01,13.303L13.303,14.01L10.475,11.182ZM11.437,9.197L11.634,8.217L15.169,8.924L14.973,9.905L11.437,9.197ZM8.217,11.634L9.197,11.437L9.905,14.973L8.924,15.169L8.217,11.634ZM5.525,4.818L4.818,5.525L1.99,2.697L2.697,1.99L5.525,4.818ZM7.783,4.366L6.803,4.563L6.095,1.027L7.076,0.831L7.783,4.366ZM4.563,6.803L4.366,7.783L0.831,7.076L1.027,6.095L4.563,6.803Z"/>`},{id:`icon-16_offset-marker-down`,viewBox:`0 0 16 16`,content:`<path fill="currentColor" d="M8.5,3L7.5,3L7.5,10.793L5.354,8.646L4.646,9.354L8,12.707L11.354,9.354L10.646,8.646L8.5,10.793L8.5,3Z"/>`},{id:`icon-16_offset-marker-up`,viewBox:`0 0 16 16`,content:`<path fill="currentColor" d="M7.5,13L8.5,13L8.5,5.207L10.646,7.354L11.354,6.646L8,3.293L4.646,6.646L5.354,7.354L7.5,5.207L7.5,13Z"/>`},{id:`icon-12_chevrone-up`,viewBox:`0 0 12 12`,content:`<path fill="currentColor" d="M3.277,7.416L2.723,6.584L6,4.399L9.277,6.584L8.723,7.416L6,5.601L3.277,7.416Z"/>`},{id:`icon-12_chevrone-down`,viewBox:`0 0 12 12`,content:`<path fill="currentColor" d="M8.723,4.584L9.277,5.416L6,7.601L2.723,5.416L3.277,4.584L6,6.399L8.723,4.584Z"/>`},{id:`icon-12_arrow-up`,viewBox:`0 0 12 12`,content:`<path fill="currentColor" d="M5.5,3.934L3.277,5.416L2.723,4.584L6,2.399L9.277,4.584L8.723,5.416L6.5,3.934L6.5,10L5.5,10L5.5,3.934Z"/>`},{id:`icon-12_arrow-down`,viewBox:`0 0 12 12`,content:`<path fill="currentColor" d="M6.5,8.066L8.723,6.584L9.277,7.416L6,9.601L2.723,7.416L3.277,6.584L5.5,8.066L5.5,2L6.5,2L6.5,8.066Z"/>`}],lt=class e{static instance=null;spriteRoot=null;constructor(){for(let e of ct)this.register(e)}static getInstance(){return this.instance||=new e,this.instance}register(e){let t=this.ensureSprite();if(t.querySelector(`#${e.id}`))return;let n=document.createElementNS(`http://www.w3.org/2000/svg`,`symbol`);n.id=e.id,n.setAttribute(`viewBox`,e.viewBox),n.innerHTML=e.content,t.appendChild(n)}resolve(e,t,...n){let r=`icon-${e}_${t}`;return`<svg data-stdg-icon-${e}${n.map(e=>` data-stdg-icon-${e}`).join(``)}><use href="#${r}"></use></svg>`}ensureSprite(){if(this.spriteRoot)return this.spriteRoot;let e=document.createElementNS(`http://www.w3.org/2000/svg`,`svg`);return e.setAttribute(`data-string-devtools-icon-sprite`,``),e.setAttribute(`aria-hidden`,`true`),e.style.cssText=`display:none;position:absolute;width:0;height:0;overflow:hidden`,(document.body??document.documentElement).prepend(e),this.spriteRoot=e,e}};function H(e,t,...n){return lt.getInstance().resolve(e,t,...n)}function ut(e){let{icon:t,size:n=16,label:r,modifiers:i=[],attrs:a}=e,o=document.createElement(`button`);o.type=`button`,o.setAttribute(`data-stdg-button`,``),o.setAttribute(`data-stdg-button-icon-${n}`,``);for(let e of i)o.setAttribute(`data-stdg-button-${e}`,``);if(o.setAttribute(`aria-label`,r),o.setAttribute(`title`,r),o.innerHTML=H(n,t),a)for(let[e,t]of Object.entries(a))o.setAttribute(e,t);return o}var dt=`

[data-string-devtools-overlay-badge][data-module-enabled="false"] {
  display: none;
}

[data-string-devtools-overlay-badge][data-visible="false"] {
  display: none;
}

[data-stdg] {
  --string-dg-font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', sans-serif;
  --string-dg-font-size: 12px;
  --string-dg-font-size-s: 10px;
  --string-dg-font-size-xs: 8px;
  --string-dg-font-normal: 400;
  --string-dg-font-medium: 500;
  --string-dg-font-bold: 600;

  --string-dg-color-blue: #3687ff;
  --string-dg-color-amber: #b45100;
  --string-dg-color-green: #00823c;
  --string-dg-color-teal: #00788c;
  --string-dg-color-red: #f45524;
  --string-dg-color-black: #111111;
  --string-dg-color-white: #ffffff;
  --string-dg-color-cloud-white: rgba(249, 249, 249, 0.8);
  --string-dg-color-middle-white: rgba(249, 249, 249, 0.4);
  --string-dg-color-hairline: rgba(220, 220, 220, 0.5);
  --string-dg-color-offset: rgba(127, 127, 127, 0.8);
  --string-dg-color-grey-1: #eeeeee;
  --string-dg-color-grey-2: #dddddd;
  --string-dg-color-grey-3: #cccccc;
  --string-dg-color-grey-4: #bbbbbb;
  --string-dg-color-grey-5: #aaaaaa;
  --string-dg-color-grey-6: #888888;

  /* dock */
  --string-dg-dock-radius: 16px;
  --string-dg-dock-padding: 3px 4px;
  --string-dg-dock-shadow: 0 16px 32px rgba(0, 0, 0, 0.08);

  /* badge */
  --string-dg-badge-radius: 12px;
  --string-dg-badge-padding: 1px;
  --string-dg-badge-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);

  /* panel */
  --string-dg-panel-radius: 18px;
  --string-dg-panel-padding: 0px;
  --string-dg-panel-shadow: 0 0 1px rgba(0, 0, 0, 0.4), 0 16px 32px rgba(0, 0, 0, 0.08);
  --string-dg-panel-header-padding: 5px;
  --string-dg-panel-responsive-margin: 0 5px 8px 5px;
  --string-dg-panel-conent-margin: 0 5px 8px 5px;
  --string-dg-panel-hr-margin: 16px 0;

  /* buttons | inputs | etc */
  --string-dg-min-height: 34px;

  /* input */
  --string-dg-input: 4px 0;
  --string-dg-input-container-negative-margin: -8px;
  --string-dg-input-range-padding: 6px 8px;
  --string-dg-panel-range-width: 2px;
  --string-dg-input-range-webkit-margin: 4px;

  /* toggle */
  --string-dg-toggle-gap: 8px;
  --string-dg-toggle-knob: 12px;
  --string-dg-toggle-padding: 1px;
  --string-dg-toggle-radius: 12px;
  --string-dg-toggle-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);

  /* button */
  /* button | icon-20 */
  --string-dg-button-icon-20-background: rgba(255, 255, 255, 0.25);
  --string-dg-button-icon-20-radius: 12px;
  --string-dg-button-icon-20-padding: 6px;
  /* button | icon-16 */
  --string-dg-button-icon-16-background: rgba(255, 255, 255, 0.25);
  --string-dg-button-icon-16-radius: 10px;
  --string-dg-button-icon-16-padding: 5px;
  /* button | icon-12 */
  --string-dg-button-icon-12-background: rgba(255, 255, 255, 0.25);
  --string-dg-button-icon-12-radius: 5px;
  --string-dg-button-icon-12-margin: 1px;

  /* panel button */
  --string-dg-panel-button-radius: 8px;
  --string-dg-panel-button-padding-1: 8px;
  --string-dg-panel-button-padding-2: 8px 12px 8px 5px;
  --string-dg-panel-button-gap: 8px;

  /* panel field */
  --string-dg-panel-field-slider-gap: 4px;

  --string-dg-panel-field-padding: 0 0 0 8px;
  --string-dg-panel-field-input-padding: 8px 0;
  --string-dg-panel-field-icon-left: 5px;
  --string-dg-panel-field-label-left: 8px;

  /* panel breakpoints */
  --string-dg-panel-breakpoints-margin: 16px 0 24px;
  --string-dg-panel-breakpoint-marker-width: 2px;
  --string-dg-panel-breakpoint-marker-padding: 4px 8px 0px;
  --string-dg-panel-breakpoint-marker-margin: -4px -16px 0px;
  --string-dg-panel-breakpoints-span-pos-cor: 4px;

  /* panel-item */
  --string-dg-panel-list-item-radius: 8px;
  --string-dg-panel-list-item-padding: 8px 5px 8px 5px;
  --string-dg-panel-list-item-grabbing: -8px -5px -8px -5px;
  --string-dg-panel-list-item-delete-margin: -4px 0;

  /* offsets */
  --string-dg-offsets-dasharray: 2px 8px;

  font-family: var(--string-dg-font-family);
  font-size: var(--string-dg-font-size);
  line-height: 1;
  color: var(--string-dg-color-black);
  box-sizing: content-box;
  box-shadow: none;
  background: none;
  border: none;
  border-radius: 0;
}

/* input */


[data-stdg-input], [data-stdg-input]:focus, [data-stdg-input]:hover {
  box-shadow: none !important;
  background-color: none;
  background-image: none;
  outline: none;
  border: none;
  color: none;
  -webkit-box-shadow: none !important;
}

input[type=number] {
  -moz-appearance:textfield; /* Firefox */
}
  

[data-stdg-input][type='color'] {
  display: flex;
  justify-content: center;
  
}

input[type="color" i]::-webkit-color-swatch-wrapper {
  padding: 0;
  height: 50%;
  width: 50%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid var(--string-dg-color-white);
}

input[type="color" i]::-webkit-color-swatch{
border: none;
}

[data-stdg-input][type='color']::-moz-color-swatch {
  padding: 0;
  height: 50%;
  width: 50%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid var(--string-dg-color-white);
}
[data-stdg-input][type='number'] {
  font-variant-numeric: tabular-nums;
}
[data-stdg-select],
[data-stdg-select]::-webkit-outer-spin-button,
[data-stdg-select]::-webkit-inner-spin-button,
[data-stdg-input][type='number']::-webkit-outer-spin-button,
[data-stdg-input][type='number']::-webkit-inner-spin-button {
  -moz-appearance: textfield;
  -webkit-appearance: none;
  margin: 0;
}
[data-stdg-input][type="range"] {
  -webkit-appearance: none;
  appearance: none;
  align-items: stretch;
  width: 100%;
  display: inline-block;
  background: transparent;
  background-image: linear-gradient(
    to right,
    var(--string-dg-color-grey-2) var(--string-progress-slider-fill),
    transparent var(--string-progress-slider-fill)
  );
  border-radius: var(--string-dg-panel-button-radius);
}
[data-stdg-input][type="range"]::-moz-range-track {
  display: none;
}
[data-stdg-input][type="range"]::-moz-range-thumb {
  appearance: none;
  width: 0;
  height: 100%;
  border: none;
  padding: var(--string-dg-input-range-padding);
  background: none;
  background-image:
    linear-gradient(0deg, var(--string-dg-color-black))
  ;
  background-repeat: no-repeat;
  background-size: var(--string-dg-panel-breakpoint-marker-width) 100%;
  background-position: center center;
  cursor: col-resize;
}
[data-stdg-input][type="range"]::-webkit-slider-container {
  margin-top: calc(-1.5 * var(--string-dg-input-range-webkit-margin));
  height: calc(100% + var(--string-dg-input-range-webkit-margin) * 3);

  margin-left: var(--string-dg-input-container-negative-margin);
  margin-right: var(--string-dg-input-container-negative-margin);
}
[data-stdg-input][type="range"]::-webkit-slider-runnable-track {
  height: 100%;
}
[data-stdg-input][type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 0;
  height: 100%;
  padding: var(--string-dg-input-range-padding);
  background-image:
    linear-gradient(0deg, var(--string-dg-color-black))
  ;
  background-repeat: no-repeat;
  background-size: var(--string-dg-panel-range-width) 100%;
  background-position: center center;
  cursor: col-resize;

  opacity: 0;
  transition: opacity 0.15s ease-out;
}
[data-stdg-input][type="range"]:hover::-webkit-slider-thumb,
[data-stdg-input][type="range"]:active::-webkit-slider-thumb {
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
}

[data-stdg-select],
[data-stdg-input],
[data-stdg-textarea] {
  display: block;
  width: 100%;
  box-sizing: content-box;
  background-color: transparent;
  padding: var(--string-dg-input);
  margin: 0;
  border-radius: 0;
  border: none;
  box-shadow: none;
  text-align: center;
  text-align-last: center;
  cursor: default;

  font-family: var(--string-dg-font-family);
  font-size: var(--string-dg-font-size-s);
  font-weight: var(--string-dg-font-bold);
}
[data-stdg-select]:focus,
[data-stdg-input]:focus,
[data-stdg-textarea]:focus {
  outline: none;
  box-shadow: none;
}

/* toggle */
[data-stdg-toggle] {
  border-radius: var(--string-dg-toggle-radius);
  background: var(--string-dg-color-grey-3);
  padding: var(--string-dg-toggle-padding) calc(var(--string-dg-toggle-gap) + var(--string-dg-toggle-padding))
    var(--string-dg-toggle-padding) var(--string-dg-toggle-padding);
  display: inline-flex;
  position: relative;
}
[data-stdg-toggle-input] {
  display: none;
}
[data-stdg-toggle-knob] {
  width: var(--string-dg-toggle-knob);
  height: var(--string-dg-toggle-knob);
  border-radius: var(--string-dg-toggle-radius);
  background: var(--string-dg-color-white);
  box-shadow: var(--string-dg-toggle-shadow);
  margin-left: auto;
}
[data-stdg-toggle][data-checked='true'] {
  background-color: var(--string-dg-color-blue);
}
[data-checked='false'] [data-stdg-toggle-knob] {
  translate: var(--string-dg-toggle-gap) 0;
}

/* button */

[data-stdg-panel-content] > [data-stdg-panel-breakpoints],
[data-stdg-panel-field-slider] > [data-stdg-panel-field],
[data-stdg-panel-content] > [data-stdg-panel-field],
[data-stdg-panel-content] > [data-stdg-button] {
  min-height: var(--string-dg-min-height);
}

[data-stdg-panel-breakpoints],
[data-stdg-panel-field],
[data-stdg-button] {
  display: flex;
  box-shadow: none;
  background: none;
  border-radius: 0;
  margin: 0;
  padding: 0;
  cursor: default;
  box-sizing: border-box;
  border: 1px solid transparent;
  font-family: var(--string-dg-font-family);
  font-size: var(--string-dg-font-size);
  font-weight: var(--string-dg-font-medium);
  color: var(--string-dg-color-black);
}
[data-stdg-panel-field][data-disabled="true"]{
  display: none;
}
[data-stdg-dock-list] > [data-stdg-button] {
  display: block;
}
[data-stdg-panel-breakpoints] > *,
[data-stdg-panel-field] > *,
[data-stdg-button] > * {
  grid-area: 1/1;
  flex-shrink: 0;
}
[data-stdg-panel-breakpoints] span,
[data-stdg-panel-field] span,
[data-stdg-button] span {
  pointer-events: none;
  -webkit-user-select: none;
  user-select: none;
}
/* button | icon-20 */
[data-stdg-holder-icon-20] {
  padding: var(--string-dg-button-icon-20-padding);
}
[data-stdg-button-icon-20] {
  background-color: var(--string-dg-button-icon-20-background);
  padding: var(--string-dg-button-icon-20-padding);
  border-radius: var(--string-dg-button-icon-20-radius);
}
[data-stdg-icon-20] {
  width: 20px;
  aspect-ratio: 1/1;
  color: var(--string-dg-color-black);
}
/* button | icon-16 */
[data-stdg-holder-icon-16] {
  padding: var(--string-dg-button-icon-16-padding);
}
[data-stdg-button-icon-16] {
  background-color: var(--string-dg-button-icon-16-background);
  padding: var(--string-dg-button-icon-16-padding);
  border-radius: var(--string-dg-button-icon-16-radius);
}
[data-stdg-icon-16] {
  width: 16px;
  aspect-ratio: 1/1;
  color: var(--string-dg-color-black);
}
/* button | icon-12 */
[data-stdg-holder-icon-12] {
}
[data-stdg-button-icon-12] {
  background-color: var(--string-dg-button-icon-12-background);
  border-radius: var(--string-dg-button-icon-12-radius);
  margin: var(--string-dg-button-icon-12-margin);
}
[data-stdg-icon-12] {
  width: 12px;
  aspect-ratio: 1/1;
  color: var(--string-dg-color-black);
}
/* button | icon-second */
[data-stdg-icon-second] {
  color: var(--string-dg-color-grey-4);
}
/* button | hover */
[data-stdg-button-hover] {
  display: grid;
  place-items: center;
}
[data-stdg-button-hover] svg:last-child {
  visibility: hidden;
}
[data-stdg-button-hover]:hover svg:first-child {
  visibility: hidden;
}
[data-stdg-button-hover]:hover svg:last-child {
  visibility: visible;
}
[data-stdg-dock] [data-stdg-button-hover] svg:last-child {
  transform: rotate(-90deg);
}
[data-stdg-dock] [data-stdg-button-hover][data-collapsed='true'] svg:last-child {
  transform: rotate(90deg);
}

/* button | data-active */
[data-active='false'] [data-stdg-icon-12],
[data-active='false'] [data-stdg-icon-16],
[data-active='false'] [data-stdg-icon-20] {
  color: var(--string-dg-color-grey-5);
}
/* button | toggle */
[data-stdg-button-toggle][data-active='false'] [data-stdg-icon-12]:not([data-stdg-icon-second]),
[data-stdg-button-toggle][data-active='false'] [data-stdg-icon-16]:not([data-stdg-icon-second]),
[data-stdg-button-toggle][data-active='false'] [data-stdg-icon-20]:not([data-stdg-icon-second]) {
  color: var(--string-dg-color-black);
}
[data-stdg-button-toggle][data-active='true'] {
  background-color: var(--string-dg-color-grey-2);
}
  
[data-stdg-button-toggle][data-active='true'] [data-stdg-icon-12]:not([data-stdg-icon-second]),
[data-stdg-button-toggle][data-active='true'] [data-stdg-icon-16]:not([data-stdg-icon-second]),
[data-stdg-button-toggle][data-active='true'] [data-stdg-icon-20]:not([data-stdg-icon-second]) {
  
}

[data-stdg-panel-breakpoints]:hover:not([data-stdg-panel-breakpoint-marker]):not([data-string-grid-list-delete]),
[data-stdg-panel-field]:hover:not([data-stdg-panel-breakpoint-marker]):not([data-string-grid-list-delete]),
[data-stdg-button]:hover:not([data-stdg-panel-breakpoint-marker]):not([data-string-grid-list-delete]) {
  border: 1px solid var(--string-dg-color-cloud-white);
  background-color: var(--string-dg-color-grey-1);
}
[data-stdg-button]:active:not(:has([data-stdg-toggle]:active)):not([data-stdg-panel-breakpoint-marker]) {
  border: 1px solid var(--string-dg-color-cloud-white);
  background-color: var(--string-dg-color-grey-3);
}

/* panel button */
[data-stdg-panel-button] {
  box-sizing: border-box;
  border: 1px solid var(--string-dg-color-white);
  background-color: var(--string-dg-color-grey-1);

  border-radius: var(--string-dg-panel-button-radius);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: var(--string-dg-panel-button-gap);
}
[data-stdg-panel-button]:has(svg):has(span) {
  width: 100%;
  padding: var(--string-dg-panel-button-padding-2);
}
[data-stdg-panel-button]:not(:has(svg):has(span)) {
  background-color: var(--string-dg-color-white);
  padding: var(--string-dg-panel-button-padding-1);
}

[data-stdg-panel-button]:not(:has(svg):has(span)) span {
  font-size: var(--string-dg-font-size-s);
  font-weight: var(--string-dg-font-bold);
  width: 16px;
  aspect-ratio: 1/1;
  display: grid;
  place-items: center;
}
[data-stdg-panel-button][data-active='true']:not(:has(svg):has(span)) span {
}

[data-string-grid-list-delete] {
  background-color: var(--string-dg-color-white);
  border-radius: 50%;
}


/* panel list-item */
[data-stdg-panel-list-item] {
  border: 1px solid var(--string-dg-color-white);
  background-color: var(--string-dg-color-grey-1);

  border-radius: var(--string-dg-panel-list-item-radius);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: var(--string-dg-panel-button-gap);

  padding: var(--string-dg-panel-list-item-padding);
}
[data-stdg-panel-list-item] [data-stdg-icon-second] {
  padding: var(--string-dg-panel-list-item-padding);
  margin: var(--string-dg-panel-list-item-grabbing);
}
[data-stdg-panel-list-item] [data-stdg-icon-second]:active {
  cursor: grabbing;
}
[data-stdg-panel-list-item] > span {
  margin-right: auto;
}
[data-stdg-panel-list-item] [data-stdg-toggle] {
}
[data-stdg-panel-list-item] [data-string-grid-list-delete] {
  margin: var(--string-dg-panel-list-item-delete-margin);
}
[data-stdg-panel-list-item][data-dragging="true"] {
  opacity: 0.4;
  cursor: grabbing;
}
[data-stdg-panel-list-item][data-drag-over="before"] {
  box-shadow: 0 -2px 0 var(--string-dg-color-black);
}
[data-stdg-panel-list-item][data-drag-over="after"] {
  box-shadow: 0 2px 0 var(--string-dg-color-black);
}

[data-stdg-panel-list-item]:has([data-checked='false']) > [data-stdg-icon-16] {
  color: var(--string-dg-color-grey-4) !important;
}
[data-stdg-panel-list-item]:has([data-checked='false']) > span {
  color: var(--string-dg-color-grey-6);
}

/* panel field */
[data-stdg-panel-field] {
  box-sizing: border-box;
  border: 1px solid var(--string-dg-color-white);
  background-color: var(--string-dg-color-grey-1);

  border-radius: var(--string-dg-panel-button-radius);
  padding: var(--string-dg-panel-field-padding);
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--string-dg-panel-button-gap);
}
[data-stdg-panel-field]:has(> [data-stdg-field-input-disable]) {
  padding: 0;
  gap: 0;
}

[data-stdg-panel-field]:has(> [data-stdg-toggle]:last-child) {
  padding-right: 8px;
}

[data-stdg-panel-field] span {
}

[data-stdg-field-input] {
  width: 50%;
  display: flex;
  align-items: center;
}
[data-stdg-field-input] > * {
  flex: 1;
}
[data-stdg-field-value] {
  display: flex;
  align-items: center;
  min-width: 0;
}
[data-stdg-field-value] [data-stdg-input] {
  flex: 1;
  min-width: 0;
}
[data-stdg-field-suffix] {
  flex: 0 0 auto;
  padding: var(--string-dg-panel-field-input-padding);
  color: var(--string-dg-color-grey-6);
  font-size: var(--string-dg-font-size-s);
  font-weight: var(--string-dg-font-bold);
  background-image: linear-gradient(0deg, var(--string-dg-color-grey-3));
  background-repeat: no-repeat;
  background-size: 1px 80%;
  background-position: left center;
}
[data-stdg-field-input] [data-stdg-select],
[data-stdg-field-input] [data-stdg-input] {
  padding: var(--string-dg-panel-field-input-padding);
  background-image: linear-gradient(0deg, var(--string-dg-color-grey-3));
  background-repeat: no-repeat;
  background-size: 1px 80%;
  background-position: left center;
}
[data-stdg-field-input] [data-stdg-input][type='color'] {
  flex: 0 0 33.3333%;
  height: 100%;
}
[data-stdg-field-input] [data-stdg-stepper] {
  flex: 0 0 33.3333%;
  display: flex;
  flex-wrap: wrap;
  justify-content: stretch;
  align-items: stretch;
  background-image: linear-gradient(0deg, var(--string-dg-color-grey-3)), linear-gradient(0deg, var(--string-dg-color-grey-3));
  background-repeat: no-repeat, no-repeat;
  background-size:
    1px 80%,
    90% 1px;
  background-position:
    left center,
    left center;
}
[data-stdg-field-input] [data-stdg-stepper] button {
  width: 100%;
  display: grid;
  place-items: center;
}

/* svg + input + px */
[data-stdg-panel-field] > span > [data-stdg-icon-16] {
  position: absolute;
  top: 8px;
  left: var(--string-dg-panel-field-icon-left);
  pointer-events: none;
}
[data-stdg-panel-field] > [data-stdg-icon-16] {
  position: absolute;
  left: var(--string-dg-panel-field-icon-left);
  pointer-events: none;
}
[data-stdg-panel-field] > input {
  align-self: stretch;
  flex: 1;
}
[data-stdg-panel-field]:has(> [data-stdg-icon-16]) > input {
  padding-left: var(--string-dg-panel-field-icon-left);
}
[data-stdg-field-input-disable] {
  flex: 0 0 16%;
  min-width: calc(var(--string-dg-font-size) * 3);
  text-align: center;
  color: var(--string-dg-color-grey-6);
  padding: var(--string-dg-panel-field-input-padding);
  background-image: linear-gradient(0deg, var(--string-dg-color-grey-3));
  background-repeat: no-repeat;
  background-size: 1px 80%;
  background-position: left center;
}

/* slider wrapper */
[data-stdg-panel-field-slider-row] {
  display: flex;
  gap: var(--string-dg-panel-field-slider-gap);
}
[data-stdg-panel-field-slider-row] [data-stdg-panel-field] {
  flex: 0 0 20%;
}
[data-stdg-panel-field-slider-row] [data-stdg-panel-field-slider] {
  flex: 1;
  padding: 0;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
[data-stdg-panel-field-slider] label {
  position: absolute;
  left: var(--string-dg-panel-field-label-left);
  color: var(--string-dg-color-grey-6);
  pointer-events: none;
}
[data-stdg-panel-field-slider] input {
  grid-area: 1/1;
  justify-self: stretch;
  min-width: 0;
  width: 100%;
}

/* panel responsive */
[data-stdg-panel-breakpoints] {
  box-sizing: border-box;
  border: 1px solid var(--string-dg-color-white);
  background-color: var(--string-dg-color-grey-1);

  border-radius: var(--string-dg-panel-button-radius);

  margin: var(--string-dg-panel-breakpoints-margin);

  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: var(--string-dg-panel-button-gap);

  font-size: var(--string-dg-font-size-s);
  font-weight: var(--string-dg-font-bold);
}
[data-stdg-panel-breakpoints]:before {
  content: '0';
  font-size: var(--string-dg-font-size-xs);
  color: var(--string-dg-color-grey-3);
  position: absolute;
  bottom: calc(100% + var(--string-dg-font-size-xs) / 2 + var(--string-dg-panel-breakpoints-span-pos-cor));
}
[data-stdg-panel-breakpoint-value] {
  flex: 1;
  display: grid;
  place-items: center;
  text-align: center;
}
[data-stdg-panel-breakpoint-value] > * {
  grid-area: 1/1;
}
[data-stdg-panel-breakpoint-value] [data-string-grid-list-delete] {
  visibility: hidden;
}
[data-stdg-panel-breakpoint-value]:hover [data-string-grid-list-delete] {
  visibility: visible;
}

[data-stdg-panel-breakpoint-marker] {
  align-self: stretch;
  position: relative;
  display: flex;
  justify-content: center;
  padding: var(--string-dg-panel-breakpoint-marker-padding);
  margin: var(--string-dg-panel-breakpoint-marker-margin);
  background-image: linear-gradient(0deg, var(--string-dg-color-black));
  background-repeat: no-repeat;
  background-size: var(--string-dg-panel-breakpoint-marker-width) 100%;
  background-position: center center;
}
[data-stdg-panel-breakpoint-marker]::before,
[data-stdg-panel-breakpoint-marker]::after {
  content: '';
  position: absolute;
  top: 100%;
  width: 100%;
  padding-bottom: 100%;
}
[data-stdg-panel-breakpoint-marker]::after {
  border-radius: 50%;
  background-color: var(--string-dg-color-black);
  transform-origin: 50% 0%;
  scale: 0.5;
}
[data-stdg-panel-breakpoint-marker] span {
  font-size: var(--string-dg-font-size-xs);
  color: var(--string-dg-color-grey-6);
  position: absolute;
  bottom: calc(100% + var(--string-dg-font-size-xs) / 2);
}
[data-stdg-panel-breakpoint-marker]:hover span {
  color: var(--string-dg-color-black);
}
[data-stdg-panel-breakpoint-marker][data-active='true']::after {
  scale: 1;
}
[data-stdg-panel-breakpoints] [data-stdg-panel-breakpoint-value]:first-child {
  border-radius: var(--string-dg-panel-button-radius);
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
[data-stdg-panel-breakpoints] [data-stdg-panel-breakpoint-value]:last-child {
  border-radius: var(--string-dg-panel-button-radius);
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
[data-stdg-panel-breakpoint-value]:has(+ [data-active='true']),
[data-stdg-panel-breakpoint-marker][data-active='true'] + div {
  background-color: var(--string-dg-color-grey-3);
}

/* dock */
[data-stdg-dock] {
  position: fixed;
  z-index: 10035;
  bottom: 24px;
  left: 124px;

  display: flex;
  flex-direction: row;
  align-items: center;

  background-color: var(--string-dg-color-cloud-white);
  padding: var(--string-dg-dock-padding);
  border: 1px solid var(--string-dg-color-middle-white);
  border-radius: var(--string-dg-dock-radius);
  box-shadow: var(--string-dg-dock-shadow);

  backdrop-filter: blur(4px);
}
[data-stdg-dock-list] {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0;
  overflow: visible;
}
[data-stdg-dock-tools] {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: visible;
  opacity: 1;
  transition:
    max-width 0.22s ease,
    opacity 0.16s ease;
}
[data-stdg-dock][data-collapsed="true"] [data-stdg-dock-tools] {
  overflow: hidden;
}
[data-stdg-dock-fps-separator] {
  display: block;
}
[data-stdg-dock] > [data-stdg-button] {
  align-self: center;
}
[data-string-defguides-doc-fps] {
  display: grid;
  place-items: center;
  aspect-ratio: 1/1;
  padding: var(--string-dg-button-icon-20-padding);
}
[data-string-defguides-doc-fps] span {
  grid-area: 1/1;
  width: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: default;
}
[data-stdg-horizontal-line] {
  align-self: stretch;
  display: block;
  width: 0px;
  margin: 0 4px;
  border-right: 1px solid var(--string-dg-color-hairline);
}

/* dock sub-badges */
[data-stdg-dock-slot] {
  position: relative;
  display: flex;
  align-items: center;
  overflow: visible;
}
[data-stdg-dock-slot][data-has-sub-badges]::after {
  content: "";
  position: absolute;
  left: -4px;
  right: -4px;
  bottom: 100%;
  height: 8px;
  pointer-events: auto;
}
[data-stdg-dock-sub-badges] {
  position: fixed;
  display: flex;
  flex-direction: row;
  gap: 4px;
  white-space: nowrap;
  padding: var(--string-dg-badge-padding);
  background-color: var(--string-dg-color-cloud-white);
  border: 1px solid var(--string-dg-color-middle-white);
  border-radius: var(--string-dg-badge-radius);
  box-shadow: var(--string-dg-badge-shadow);
  backdrop-filter: blur(4px);
  opacity: 0;
  pointer-events: none;
  z-index: 10034;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
  touch-action: manipulation;
  transform: translate(-50%, calc(100% + 16px));
  transition: transform .3s, opacity .3s;
}
[data-stdg-dock-sub-badge] {
  position: relative;
}
[data-stdg-dock-sub-badge][data-parent-active="false"] [data-stdg-icon-12],
[data-stdg-dock-sub-badge][data-parent-active="false"] [data-stdg-icon-16],
[data-stdg-dock-sub-badge][data-parent-active="false"] [data-stdg-icon-20] {
  color: var(--string-dg-color-grey-5);
}
[data-stdg-dock-sub-badge]::before {
  content: "";
  position: absolute;
  inset: -6px;
}
[data-stdg-dock-sub-badges][data-open="true"] {
  opacity: 1;
  transform: translate(-50%, 0);
  pointer-events: auto;
}

@media (max-width: 1024px), (pointer: coarse) {
  [data-stdg-dock] [data-stdg-button-hover] svg:last-child {
    transform: rotate(0deg);
  }

  [data-stdg-dock] [data-stdg-button-hover][data-collapsed='true'] svg:last-child {
    transform: rotate(180deg);
  }

  [data-stdg-dock] {
    top: 50%;
    bottom: auto;
    left: max(12px, env(safe-area-inset-left, 0px) + 12px);
    transform: translateY(-50%);
    max-height: calc(100vh - 24px - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px));
    flex-direction: column;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
    touch-action: manipulation;
  }

  [data-stdg-dock-list] {
    flex-direction: column;
  }

  [data-stdg-dock-tools] {
    flex-direction: column;
    transition:
      max-height 0.22s ease,
      opacity 0.16s ease;
  }

  [data-stdg-dock][data-collapsed="true"] [data-stdg-dock-tools] {
    overflow: hidden;
  }

  [data-stdg-horizontal-line] {
    width: auto;
    height: 0px;
    margin: 4px 0;
    border-right: none;
    border-top: 1px solid var(--string-dg-color-hairline);
  }

  [data-stdg-dock-slot][data-has-sub-badges]::after {
    left: 100%;
    right: auto;
    top: -4px;
    bottom: -4px;
    width: 8px;
    height: auto;
  }

  [data-stdg-dock-sub-badges] {
    flex-direction: column;
    transform: translate(8px, -50%);
  }

  [data-stdg-dock-sub-badges][data-open="true"] {
    transform: translate(0, -50%);
  }

  /* compact: panel width shrinks to fit narrow viewports */
  [data-stdg-panel] {
    width: min(280px, calc(100vw - 32px));
    max-width: calc(100vw - 32px);
  }

  [data-stdg-badge][data-mobile-sheet="true"] > [data-stdg-panel] {
    right: auto;
    height: auto;
    overflow: hidden auto;
    overscroll-behavior: contain;
  }

  [data-stdg-badge][data-mobile-sheet="true"] > [data-stdg-panel] > [data-stdg-panel] {
    position: static;
    display: none;
    inset: auto;
    width: 100%;
    max-width: 100%;
    height: auto;
    overflow: hidden auto;
    overscroll-behavior: contain;
    box-shadow: none;
    transform: none;
  }

  [data-stdg-badge][data-mobile-sheet="true"] > [data-stdg-panel]:has(> [data-stdg-panel][data-open="true"]) > :not([data-stdg-panel]) {
    display: none;
  }

  [data-stdg-badge][data-mobile-sheet="true"] > [data-stdg-panel] > [data-stdg-panel][data-open="true"] {
    display: block;
  }

  /* panel detached to body as fixed element in mobile mode */
  [data-stdg-panel][data-mobile-sheet="true"] {
    z-index: 10045;
    overflow: hidden auto;
    overscroll-behavior: contain;
  }

  [data-stdg-panel][data-mobile-sheet="true"] > [data-stdg-panel] {
    position: static;
    display: none;
    inset: auto;
    width: 100%;
    max-width: 100%;
    height: auto;
    overflow: hidden auto;
    overscroll-behavior: contain;
    box-shadow: none;
    transform: none;
  }

  [data-stdg-panel][data-mobile-sheet="true"]:has(> [data-stdg-panel][data-open="true"]) > :not([data-stdg-panel]) {
    display: none;
  }

  [data-stdg-panel][data-mobile-sheet="true"] > [data-stdg-panel][data-open="true"] {
    display: block;
  }

  /* compact: progress floating panel */
  [data-stdg-progress] {
    bottom: max(16px, env(safe-area-inset-bottom, 0px) + 16px);
    max-height: calc(100vh - 32px - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px));
  }
}

/* badge */
[data-stdg-badge] {
  position: absolute;
  z-index: 10030;
  top: 0;
  left: 0;
  width: auto;
  padding-bottom: auto;

  display: flex;
  pointer-events: auto;

  background-color: var(--string-dg-color-cloud-white);
  padding: var(--string-dg-badge-padding);
  border: 1px solid var(--string-dg-color-middle-white);
  border-radius: var(--string-dg-badge-radius);
  box-shadow: var(--string-dg-badge-shadow);
}

[data-dragging-active] [data-stdg-badge]:not([data-dragging]) {
  opacity: 0;
  pointer-events: none;
}

[data-stdg-badge][data-test-progress] {
  left: 62px;
}
[data-stdg-badge][data-test-layout] {
  position: fixed;
  top: 200px;
  left: auto;
  right: 100px;
}
[data-stdg-badge][data-visible="false"] {
  display: none;
}

[data-stdg-button]:has([data-stdg-badge-label]) {
  flex-direction: column;
  align-items: center;
}
[data-stdg-button]:has([data-stdg-badge-label]) svg {
  transform: translateY(-25%);
}
[data-stdg-button]:has([data-stdg-badge-label]) > :not([data-stdg-badge-label]) {
  grid-area: unset;
}
[data-stdg-badge-label] {
  grid-area: unset;
  font-size: var(--string-dg-font-size-xs);
  line-height: 0;
  text-align: center;
  color: var(--string-dg-color-black);
  pointer-events: none;
  user-select: none;
  // margin-bottom: -0.4em;
  white-space: nowrap;
  font-weight: var(--string-dg-font-bold);
  width: 0;
  display: flex;
  justify-content: center;
}

/* panel */
[data-stdg-panel] {
  position: absolute;

  width: 220px;
  background-color: var(--string-dg-color-white);
  padding: var(--string-dg-panel-padding);
  border-radius: var(--string-dg-panel-radius);
  box-shadow: var(--string-dg-panel-shadow);
}
[data-stdg-panel][data-open="false"] {
  opacity: 0;
  pointer-events: none;
  transform: translateY(4px);
  transition: opacity 0.15s ease, transform 0.15s ease;
}
[data-stdg-panel][data-open="true"] {
  z-index: 10045;
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
  transition: opacity 0.15s ease, transform 0.15s ease;
}
[data-stdg-panel][data-test-panel-1] {
  top: 0px;
  right: calc(100% + 20px);
}
[data-stdg-panel][data-test-panel-2] {
  top: 0;
  right: calc(100% + 20px + 220px + 80px);
}
[data-stdg-panel][data-test-panel-3] {
  top: 0;
  right: calc(100% + 20px);
}

[data-stdg-panel][data-test-panel-4] {
  top: 0;
  right: calc(100% + 20px + 220px + 80px + 220px + 20px + 220px + 80px);
}
[data-stdg-panel][data-test-panel-5] {
  top: 0;
  right: calc(100% + 20px);
}
[data-stdg-panel][data-test-panel-6] {
  top: calc(400px);
  right: calc(100% + 20px);
}
[data-stdg-panel][data-test-panel-7] {
  top: calc(36px);
  right: calc(100% + 20px);
}

/* progress */
[data-stdg-progress] {
  position: fixed;
  z-index: 999;
  bottom: 62px;
  left: calc((100vw + env(safe-area-inset-left, 0px) - env(safe-area-inset-right, 0px)) / 2);
  translate: -50% 0;

  width: min(
    440px,
    calc(100vw - 24px - env(safe-area-inset-left, 0px) - env(safe-area-inset-right, 0px))
  );
  max-height: calc(100vh - 86px - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px));
  overflow: hidden auto;
  overscroll-behavior: contain;
}

[data-stdg-panel-hr] {
  display: block;
  margin: var(--string-dg-panel-hr-margin);
  border-bottom: 1px solid var(--string-dg-color-grey-1);
}
/* header */
[data-stdg-panel-header] {
  display: grid;
  place-items: center;
  padding: var(--string-dg-panel-header-padding);
}
[data-stdg-panel-header] > * {
  grid-area: 1/1;
}
[data-stdg-button-left] {
  justify-self: start;
}
[data-stdg-button-right] {
  justify-self: end;
}
[data-stdg-panel-header] span {
  font-size: var(--string-dg-font-size-s);
  font-weight: var(--string-dg-font-bold);
}
[data-stdg-panel-header] nav {
  display: flex;
}

/* responsive */
[data-stdg-panel-responsive] {
  display: grid;
  place-items: center;
  padding: var(--string-dg-panel-responsive-margin);
}
[data-stdg-panel-responsive] > * {
  grid-area: 1/1;
}
[data-stdg-panel-list] {
  display: flex;
  flex-direction: row;
}

/* content */
[data-stdg-panel-content] {
  margin: var(--string-dg-panel-conent-margin);
}
[data-stdg-panel-content-50] {
  display: flex;
  flex-wrap: wrap;
}
[data-stdg-panel-content-50] > * {
  width: 50% !important;
}

/* list-item */

/* offsets */
[data-stdg-offsets-item] {
  position: absolute;
  z-index: 999;
  top: 600px;
  left: 260px;

  width: 400px;
  height: 400px;
  fill: none;
  overflow: visible;
}
[data-stdg-offsets-item] [data-stdg-offsets-item-border] {
  stroke-width: 1px;
  stroke: var(--string-dg-color-offset);
  stroke-dasharray: var(--string-dg-offsets-dasharray);
}
[data-stdg-offsets-item-offset] {
}
[data-stdg-offsets-item-offset-arrow-bg] {
  color: var(--string-dg-color-white);
}
[data-stdg-offsets-item-offset-arrow] {
  color: var(--string-dg-color-black);
}

`;function ft(){if(typeof document>`u`)return null;let e=`string-devtools-shared-styles`,t=document.getElementById(e);if(t instanceof HTMLStyleElement)return t;let n=document.createElement(`style`);return n.id=e,n.textContent=dt,document.head.appendChild(n),n}function pt(){return typeof window<`u`&&typeof window.matchMedia==`function`}function mt(){return pt()?window.matchMedia(`(pointer: coarse)`).matches||window.matchMedia(`(any-pointer: coarse)`).matches:!1}function U(e=typeof window<`u`?window.innerWidth:1024){let t=mt();return{coarsePointer:t,compact:e<=1024||t}}var W=``;function ht(e){let t=(e??``).trim();return t?encodeURIComponent(t):``}function gt(e){W=ht(e)}function _t(e){return W?`${e}::${W}`:e}var vt=`string-devtools:dock`,yt=600,bt=12,xt=`[data-stdg-dock]`,St=`[data-stdg-dock-sub-badges]`;function Ct(e){if(!e)return``;let t=[];return e.ctrlKey&&t.push(`Ctrl`),e.altKey&&t.push(`Alt`),e.shiftKey&&t.push(`Shift`),e.metaKey&&t.push(`Meta`),t.push(e.key.length===1?e.key.toUpperCase():e.key),t.join(`+`)}var wt=class{root;mainButton;itemsWrap;toolsWrap;fpsSeparator;fpsElement;entries=new Map;collapsed=!1;suppressPersist=!1;preferences;onKeydownBind;onResizeBind;constructor(){ft(),this.cleanupExistingDockArtifacts(),this.preferences=this.loadPreferences(),this.onResizeBind=()=>{window.requestAnimationFrame(()=>this.handleViewportChange())},this.onKeydownBind=e=>{let t=e.target;t&&(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement||t instanceof HTMLSelectElement||t.isContentEditable)||e.shiftKey&&!e.ctrlKey&&!e.altKey&&!e.metaKey&&e.code===`KeyS`&&(e.preventDefault(),this.setCollapsed(!this.collapsed))},window.addEventListener(`keydown`,this.onKeydownBind),window.addEventListener(`resize`,this.onResizeBind),this.root=document.createElement(`div`),this.root.setAttribute(`data-stdg`,``),this.root.setAttribute(`data-stdg-dock`,``),this.root.setAttribute(`data-collapsed`,this.preferences.collapsed?`true`:`false`),this.mainButton=this.createMainButton(),this.itemsWrap=document.createElement(`div`),this.itemsWrap.setAttribute(`data-stdg-dock-list`,``),this.toolsWrap=document.createElement(`div`),this.toolsWrap.setAttribute(`data-stdg-dock-tools`,``),this.fpsSeparator=this.createSeparator(),this.fpsSeparator.setAttribute(`data-stdg-dock-fps-separator`,``),this.fpsElement=document.createElement(`div`),this.fpsElement.setAttribute(`data-string-defguides-doc-fps`,``),this.fpsElement.title=`Current FPS`;let e=document.createElement(`span`);e.textContent=`0`,this.fpsElement.appendChild(e),this.root.appendChild(this.mainButton),this.itemsWrap.appendChild(this.toolsWrap),this.itemsWrap.appendChild(this.fpsSeparator),this.itemsWrap.appendChild(this.fpsElement),this.root.appendChild(this.itemsWrap),(document.body??document.documentElement).appendChild(this.root),this.setCollapsed(this.preferences.collapsed,!1)}add(e){if(this.entries.has(e.id))return;this.applyStoredActiveState(e);let t=document.createElement(`button`);t.type=`button`,t.setAttribute(`data-stdg`,``),t.setAttribute(`data-stdg-button`,``),t.setAttribute(`data-stdg-button-icon-20`,``),t.setAttribute(`data-devguides-id`,e.id);let n=Ct(e.hotkey),r=n?`${e.label} (${n})`:e.label;t.setAttribute(`aria-label`,r),t.innerHTML=H(20,e.icon),t.title=r,t.addEventListener(`click`,()=>{let n=!e.getState().active;if(e.setActive(n),!e.subscribe){let n=e.getState();this.renderButton(t,e.label,e.hotkey,n),this.persistActiveState(e.id,n.active)}});let i=document.createElement(`div`);i.setAttribute(`data-stdg`,``),i.setAttribute(`data-stdg-dock-slot`,``),i.setAttribute(`data-devguides-slot`,e.id),i.appendChild(t);let a=null;e.subBadges&&e.subBadges.length>0&&(i.setAttribute(`data-has-sub-badges`,``),a=this.createSubBadgeGroup(e));let o=[];a&&o.push(...this.attachSubBadges(i,a));let s=e.subscribe?e.subscribe(n=>{this.renderButton(t,e.label,e.hotkey,n),this.syncSubBadgeState(i,a,n.active),this.persistActiveState(e.id,n.active)}):null;this.entries.set(e.id,{definition:e,button:t,slot:i,subBadges:a,unsubscribe:s,cleanup:o}),this.toolsWrap.appendChild(i),this.sortButtons();let c=e.getState();this.renderButton(t,e.label,e.hotkey,c),this.syncSubBadgeState(i,a,c.active),this.persistActiveState(e.id,c.active)}attachSubBadges(e,t){let n=[];(document.body??document.documentElement).appendChild(t);let r=!1,i=null,a=null,o=0,s=0,c=!1,l=n=>{r!==n&&(r=n,t.setAttribute(`data-open`,n?`true`:`false`),n&&this.positionSubBadges(e,t))},u=()=>U(window.innerWidth).compact,d=()=>{i!==null&&(window.clearTimeout(i),i=null),a=null},f=()=>{d(),c&&window.setTimeout(()=>{c=!1},0)},p=()=>{window.setTimeout(()=>{e.matches(`:hover`)||t.matches(`:hover`)||l(!1)},60)},m=()=>{u()||l(!0)};e.addEventListener(`pointerenter`,m),n.push(()=>e.removeEventListener(`pointerenter`,m));let h=()=>{u()||p()};e.addEventListener(`pointerleave`,h),n.push(()=>e.removeEventListener(`pointerleave`,h));let g=()=>{u()||l(!0)};t.addEventListener(`pointerenter`,g),n.push(()=>t.removeEventListener(`pointerenter`,g));let _=()=>{u()||p()};t.addEventListener(`pointerleave`,_),n.push(()=>t.removeEventListener(`pointerleave`,_));let v=()=>l(!1);t.addEventListener(`string-devtools-sub-badge-action`,v),n.push(()=>t.removeEventListener(`string-devtools-sub-badge-action`,v));let y=e=>{u()&&(e.target instanceof HTMLElement&&e.target.closest(`[data-stdg-dock-sub-badge]`)||(d(),a=e.pointerId,o=e.clientX,s=e.clientY,i=window.setTimeout(()=>{i=null,c=!0,l(!0)},yt)))};e.addEventListener(`pointerdown`,y),n.push(()=>e.removeEventListener(`pointerdown`,y));let b=e=>{if(!u()||i===null||e.pointerId!==a)return;let t=Math.abs(e.clientX-o),n=Math.abs(e.clientY-s);(t>bt||n>bt)&&d()};e.addEventListener(`pointermove`,b),n.push(()=>e.removeEventListener(`pointermove`,b)),e.addEventListener(`pointerup`,f),n.push(()=>e.removeEventListener(`pointerup`,f)),e.addEventListener(`pointercancel`,f),n.push(()=>e.removeEventListener(`pointercancel`,f));let x=()=>{u()&&d()};e.addEventListener(`pointerleave`,x),n.push(()=>e.removeEventListener(`pointerleave`,x));let S=e=>{!u()||!c||e.preventDefault()};e.addEventListener(`contextmenu`,S),n.push(()=>e.removeEventListener(`contextmenu`,S));let C=e=>{u()&&e.preventDefault()};e.addEventListener(`selectstart`,C),n.push(()=>e.removeEventListener(`selectstart`,C));let w=e=>{!u()||!c||(c=!1,e.preventDefault(),e.stopImmediatePropagation())};e.addEventListener(`click`,w,!0),n.push(()=>e.removeEventListener(`click`,w,!0)),t.addEventListener(`pointerdown`,f),n.push(()=>t.removeEventListener(`pointerdown`,f)),t.addEventListener(`pointercancel`,f),n.push(()=>t.removeEventListener(`pointercancel`,f));let T=e=>{u()&&e.preventDefault()};t.addEventListener(`contextmenu`,T),n.push(()=>t.removeEventListener(`contextmenu`,T));let E=e=>{u()&&e.preventDefault()};t.addEventListener(`selectstart`,E),n.push(()=>t.removeEventListener(`selectstart`,E));let D=()=>{c=!1};t.addEventListener(`click`,D),n.push(()=>t.removeEventListener(`click`,D));let O=n=>{if(!r)return;let i=n.target;i instanceof Node&&(e.contains(i)||t.contains(i)||l(!1))};document.addEventListener(`pointerdown`,O),n.push(()=>document.removeEventListener(`pointerdown`,O));let k=new MutationObserver(()=>{t.querySelector(`[data-active="true"]`)||p()});k.observe(t,{subtree:!0,attributes:!0,attributeFilter:[`data-active`]}),n.push(()=>k.disconnect());let A=()=>{r&&this.positionSubBadges(e,t)};return window.addEventListener(`resize`,A),window.addEventListener(`scroll`,A,!0),n.push(()=>window.removeEventListener(`resize`,A)),n.push(()=>window.removeEventListener(`scroll`,A,!0)),t.setAttribute(`data-open`,`false`),n.push(()=>t.remove()),n}positionSubBadges(e,t){let n=e.getBoundingClientRect();U(window.innerWidth).compact?(t.style.left=`${Math.round(n.right+8)}px`,t.style.top=`${Math.round(n.top+n.height/2)}px`,t.style.bottom=``):(t.style.left=`${Math.round(n.left+n.width/2)}px`,t.style.top=``,t.style.bottom=`${Math.round(window.innerHeight-n.top+8)}px`)}createSubBadgeGroup(e){let t=document.createElement(`div`);t.setAttribute(`data-stdg`,``),t.setAttribute(`data-stdg-dock-sub-badges`,``),t.setAttribute(`data-parent-active`,`false`);for(let n of e.subBadges??[]){let r={"data-stdg":``,"data-stdg-dock-sub-badge":``,"data-sub-badge-id":n.id,"data-active":`false`,"data-parent-active":`false`};if(n.selectorAttribute&&(r[n.selectorAttribute]=``),n.attributes)for(let[e,t]of Object.entries(n.attributes))t==null||t===!1||(r[e]=t===!0?``:String(t));let i=ut({icon:n.icon,size:16,label:n.label,modifiers:[`toggle`],attrs:r});i.addEventListener(`pointerdown`,e=>{e.stopPropagation()}),i.addEventListener(`click`,t=>{t.stopPropagation(),e.getState().active||e.setActive(!0),n.onClick(i),i.setAttribute(`data-active`,`false`),i.dispatchEvent(new CustomEvent(`string-devtools-sub-badge-action`,{bubbles:!0}))}),t.appendChild(i)}return t}remove(e){let t=this.entries.get(e);if(t){t.unsubscribe?.();for(let e of t.cleanup)e();t.slot.remove(),this.entries.delete(e)}}destroy(){window.removeEventListener(`keydown`,this.onKeydownBind),window.removeEventListener(`resize`,this.onResizeBind);for(let e of this.entries.values()){e.unsubscribe?.();for(let t of e.cleanup)t();e.slot.remove()}this.entries.clear(),this.root.remove()}cleanupExistingDockArtifacts(){document.querySelectorAll(xt).forEach(e=>e.remove()),document.querySelectorAll(St).forEach(e=>e.remove())}setFPS(e){let t=this.fpsElement.querySelector(`span`);t&&(t.textContent=String(Math.max(0,Math.round(e))))}sortButtons(){let e=Array.from(this.entries.values()).sort((e,t)=>{let n=e.definition.order??0,r=t.definition.order??0;return n===r?e.definition.label.localeCompare(t.definition.label):n-r});this.toolsWrap.innerHTML=``,this.toolsWrap.appendChild(this.createSeparator());let t;for(let n of e){let e=n.definition.group;t!==void 0&&e!==t&&this.toolsWrap.appendChild(this.createSeparator()),t=e,this.toolsWrap.appendChild(n.slot)}this.fpsSeparator.style.display=e.length>0?`block`:`none`,this.syncCollapsedLayout()}createSeparator(){let e=document.createElement(`span`);return e.setAttribute(`data-stdg-horizontal-line`,``),e}createMainButton(){let e=document.createElement(`button`);return e.type=`button`,e.setAttribute(`data-stdg`,``),e.setAttribute(`data-stdg-button`,``),e.setAttribute(`data-stdg-button-hover`,``),e.setAttribute(`data-stdg-button-icon-20`,``),e.setAttribute(`data-collapsed`,this.preferences.collapsed?`true`:`false`),e.setAttribute(`aria-label`,`Toggle Dev Guides`),e.innerHTML=`
      ${H(20,`logo`)}
      ${H(12,`chevrone-up`)}
    `,e.addEventListener(`click`,()=>{this.setCollapsed(!this.collapsed)}),e}setCollapsed(e,t=!0){if(this.collapsed=e,this.root.setAttribute(`data-collapsed`,e?`true`:`false`),this.mainButton.setAttribute(`data-collapsed`,e?`true`:`false`),this.mainButton.setAttribute(`aria-label`,e?`Expand developer tools`:`Collapse developer tools`),e){this.suppressPersist=!0;for(let e of this.entries.values())e.definition.getState().active&&e.definition.setActive(!1);this.suppressPersist=!1}else{this.suppressPersist=!0;for(let e of this.entries.values())this.preferences.active[e.definition.id]===!0&&e.definition.setActive(!0);this.suppressPersist=!1}t&&(this.preferences.collapsed=e,this.savePreferences()),this.syncCollapsedLayout()}syncCollapsedLayout(){let e=U(window.innerWidth).compact,t=e?this.toolsWrap.scrollHeight:this.toolsWrap.scrollWidth;this.toolsWrap.style.maxHeight=e?this.collapsed?`0px`:`${t}px`:``,this.toolsWrap.style.maxWidth=e?``:this.collapsed?`0px`:`${t}px`,this.toolsWrap.style.opacity=this.collapsed?`0`:`1`,this.toolsWrap.style.pointerEvents=this.collapsed?`none`:`auto`}handleViewportChange(){this.syncCollapsedLayout();for(let e of this.entries.values())e.subBadges&&e.subBadges.getAttribute(`data-open`)===`true`&&this.positionSubBadges(e.slot,e.subBadges)}renderButton(e,t,n,r){let i=Ct(n),a=i?`${t} (${i})`:t;e.setAttribute(`data-active`,r.active?`true`:`false`),e.setAttribute(`aria-label`,`${a}: ${r.active?`On`:`Off`}`),e.title=`${a}: ${r.active?`On`:`Off`}`}syncSubBadgeState(e,t,n){let r=n?`true`:`false`;if(e.setAttribute(`data-active`,r),t){t.setAttribute(`data-parent-active`,r);for(let e of t.querySelectorAll(`[data-stdg-dock-sub-badge]`))e.setAttribute(`data-parent-active`,r),e.setAttribute(`aria-disabled`,n?`false`:`true`)}}applyStoredActiveState(e){let t=this.preferences.active[e.id];if(typeof t!=`boolean`)return;let n=!this.collapsed&&t;n!==e.getState().active&&e.setActive(n)}persistActiveState(e,t){this.suppressPersist||this.collapsed||(this.preferences.active[e]=t,this.savePreferences())}loadPreferences(){try{let e=localStorage.getItem(this.dockStorageKey);if(!e)return{collapsed:!1,active:{}};let t=JSON.parse(e);return{collapsed:t.collapsed===!0,active:t.active&&typeof t.active==`object`?t.active:{}}}catch{return{collapsed:!1,active:{}}}}savePreferences(){try{localStorage.setItem(this.dockStorageKey,JSON.stringify(this.preferences))}catch{}}get dockStorageKey(){return _t(vt)}},Tt=class{definitions=new Map;dock=null;register(e){!e||this.definitions.has(e.id)||(this.definitions.set(e.id,e),this.dock||=new wt,this.dock.add(e))}setFPS(e){this.dock?.setFPS(e)}destroy(){this.definitions.clear(),this.dock?.destroy(),this.dock=null}},Et=class{constructor(e,t){this.id=e,this.zIndex=t}screenRoot=null;world=null;screen=null;worldHost=null;hostPositionWasPatched=!1;hostPositionInlineValue=null;ensure(e){if(this.screenRoot?.isConnected)return e&&this.attachWorldToHost(e),this.screenRoot;let t=document.querySelector(`[data-string-dev-viewport-layer="${this.id}"]`);if(t)return this.screenRoot=t,this.screen=t.querySelector(`[data-string-dev-viewport-screen="${this.id}"]`),e&&this.attachWorldToHost(e),t;let n=document.createElement(`div`);n.setAttribute(`data-string-dev-viewport-layer`,this.id),n.setAttribute(`data-string-devtools-theme`,``),n.style.position=`fixed`,n.style.inset=`0`,n.style.zIndex=String(this.zIndex),n.style.pointerEvents=`none`,n.style.overflow=`hidden`;let r=document.createElement(`div`);return r.setAttribute(`data-string-dev-viewport-screen`,this.id),r.style.position=`absolute`,r.style.inset=`0`,r.style.pointerEvents=`none`,r.style.overflow=`hidden`,n.appendChild(r),(document.body??document.documentElement).appendChild(n),this.screenRoot=n,this.screen=r,this.attachWorldToHost(e??document.body??document.documentElement),n}getElement(){return this.screenRoot?.isConnected?this.screenRoot:null}getWorldElement(e){return this.ensure(e),this.world}getScreenElement(){return this.ensure(),this.screen}destroy(){this.restoreHostPosition(),this.screenRoot?.remove(),this.screenRoot=null,this.world?.remove(),this.world=null,this.screen=null,this.worldHost=null}attachWorldToHost(e){if(!(this.worldHost===e&&this.world?.isConnected)){if(this.restoreHostPosition(),this.worldHost=e,!this.world){let e=document.createElement(`div`);e.setAttribute(`data-string-dev-viewport-world`,this.id),e.setAttribute(`data-string-devtools-theme`,``),e.style.position=`absolute`,e.style.top=`0`,e.style.left=`0`,e.style.width=`1px`,e.style.height=`1px`,e.style.pointerEvents=`none`,e.style.overflow=`visible`,e.style.zIndex=String(this.zIndex),this.world=e}e!==document.body&&e!==document.documentElement&&window.getComputedStyle(e).position===`static`&&(this.hostPositionWasPatched=!0,this.hostPositionInlineValue=e.style.position||null,e.style.position=`relative`),e.appendChild(this.world)}}restoreHostPosition(){this.world&&this.world.remove(),this.worldHost&&this.hostPositionWasPatched&&(this.hostPositionInlineValue==null||this.hostPositionInlineValue===``?this.worldHost.style.removeProperty(`position`):this.worldHost.style.position=this.hostPositionInlineValue),this.hostPositionWasPatched=!1,this.hostPositionInlineValue=null}},Dt=class e{static instance=null;layers=new Map;static getInstance(){return this.instance||=new e,this.instance}acquire(e,t){let n=this.layers.get(e);if(n){if(n.zIndex!==t)throw Error(`Shared devtools layer "${e}" already exists with z-index ${n.zIndex}, requested ${t}.`);return n.refs+=1,n.layer}let r=new Et(e,t);return this.layers.set(e,{layer:r,refs:1,zIndex:t}),r}release(e){let t=this.layers.get(e);t&&(--t.refs,!(t.refs>0)&&(t.layer.destroy(),this.layers.delete(e)))}},Ot=class extends c{static devtool=null;overlayRegistry=Dt.getInstance();acquiredViewportLayers=new Map;devtoolListeners=new Set;hotkeyHandler=null;devtoolConfig=null;constructor(e){super(e),this._type=2,ft();let t=this.constructor.devtool;t&&(this.configureDevtool(t),this.bindDevtoolHotkey(t.hotkey));let n=t?.styles,r=(typeof n==`function`?n():n)??this.getStyles();r&&this.ensureStyle(`${this.getStyleScopeId(r)}-styles`,r)}get respectSelfDisable(){return!1}get connectsConfig(){return this.constructor.devtool?.connects}canConnect(e){let t=this.connectsConfig;return t?!!(t.global===!0||e.keys.includes(`dev-inspect`)||t.keys?.some(t=>e.keys.includes(t))||t.attributes?.some(t=>e.htmlElement.hasAttribute(t))):super.canConnect(e)}getStyleScopeId(e){let t=this.htmlKey||this.constructor.devtool?.connects?.keys?.[0];if(t)return t;let n=0;for(let t=0;t<e.length;t+=1)n=n*31+e.charCodeAt(t)>>>0;return`string-dev-${n.toString(16)}`}getStyles(){return null}getDevtoolDefinition(){if(!this.devtoolConfig)return null;let e=this.devtoolConfig,t=this.getDevtoolSubBadges();return{id:e.id,label:e.label,icon:e.icon,order:e.order,group:e.group,hotkey:e.hotkey,subBadges:t.length>0?t:void 0,getState:()=>({active:this.getDevtoolActiveState()}),setActive:e=>{this.setDevtoolActiveState(e)},subscribe:e=>(this.devtoolListeners.add(e),e({active:this.getDevtoolActiveState()}),()=>{this.devtoolListeners.delete(e)})}}getDevtoolSubBadges(){return[]}configureDevtool(e){this.devtoolConfig=e}bindDevtoolHotkey(e){typeof window>`u`||!e||(this.hotkeyHandler=t=>{let n=t.target;n&&(n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement||n instanceof HTMLSelectElement||n.isContentEditable)||t.key.toLowerCase()!==e.key.toLowerCase()||t.shiftKey!==(e.shiftKey??!1)||t.ctrlKey!==(e.ctrlKey??!1)||t.altKey!==(e.altKey??!1)||t.metaKey!==(e.metaKey??!1)||(t.preventDefault(),this.setDevtoolActiveState(!this.getDevtoolActiveState()))},window.addEventListener(`keydown`,this.hotkeyHandler))}emitDevtoolState(e=this.getDevtoolActiveState()){let t={active:e};for(let e of this.devtoolListeners)e(t)}acquireViewportLayer(e,t){let n=this.acquiredViewportLayers.get(e);if(n)return n;let r=this.overlayRegistry.acquire(e,t);return this.acquiredViewportLayers.set(e,r),r}releaseViewportLayer(e){this.acquiredViewportLayers.has(e)&&(this.overlayRegistry.release(e),this.acquiredViewportLayers.delete(e))}ensureStyle(e,t){let n=document.getElementById(e);if(n instanceof HTMLStyleElement)return n;let r=document.createElement(`style`);return r.id=e,r.textContent=t,document.head.appendChild(r),r}getWorldHost(){return this.data.scroll.container??document.body??document.documentElement}getDevtoolActiveState(){return!1}setDevtoolActiveState(e){}destroy(){this.hotkeyHandler&&=(window.removeEventListener(`keydown`,this.hotkeyHandler),null),this.devtoolListeners.clear();for(let e of this.acquiredViewportLayers.keys())this.overlayRegistry.release(e);this.acquiredViewportLayers.clear(),super.destroy()}},kt=`string-devtools-overlay-layout:change`;new class{entries=new Map;register(e,t,n=1){this.entries.set(e,{order:t,badgeCount:n})}unregister(e){this.entries.delete(e)}resolveAnchor(e,t,n){let r=this.getSorted(),i=r.findIndex(t=>t.id===e),a=0;for(let e=0;e<i;e+=1)a+=r[e].badgeCount;return{docX:t+0+a*31,docY:n+0}}resolveCollisionOffset(e,t,n,r){let i=[],a=e.parentElement;for(;a;){let e=a.getAttribute(`string-id`)??a.getAttribute(`data-string-id`);if(e){let t=r(e);t&&i.push(t)}a=a.parentElement}let o=0,s=!0;for(;s;){s=!1;for(let e of i)if(Math.abs(e.docX-t)<50&&Math.abs(e.docY-(n+o))<31){o+=33,s=!0;break}}return o}emitLayoutChange(){window.dispatchEvent(new CustomEvent(kt))}getSorted(){let e=[];for(let[t,n]of this.entries)e.push({id:t,...n});return e.sort((e,t)=>e.order===t.order?e.id.localeCompare(t.id):e.order-t.order),e}};var At=class{id=`default`;cornerLabel=`↗`;formatPosition(e){return e}getFixedLines(){return[]}},jt=class{id=`center`;cornerLabel=`+`;formatPosition(e,t,n,r){return e-(r+n/2)}getFixedLines(e,t,n,r){return[{axis:`horizontal`,position:r+t/2},{axis:`vertical`,position:n+e/2}]}};new At,new jt;function Mt(e){return typeof e==`object`&&!!e&&`getDevtoolDefinition`in e&&typeof e.getDevtoolDefinition==`function`}function Nt(){return`ontouchstart`in window||navigator.maxTouchPoints>0}var Pt=class{constructor(e){this.data=e}get speed(){return this.data.scroll.speed}set speed(e){this.data.scroll.speed=Math.max(0,e)}get acceleration(){return this.data.scroll.acceleration}set acceleration(e){let t=this.clamp01(e);this.data.scroll.acceleration=t,this.data.scroll.speedAccelerate=this.mapNormalizedAcceleration(t)}get smoothness(){return this.data.scroll.smoothness}set smoothness(e){this.data.scroll.smoothness=this.clamp01(e),this.data.scroll.decelerationCoefficient=this.getDecayPowerFromSmoothness(e)}get multiplier(){return this.data.scroll.multiplier}set multiplier(e){this.data.scroll.multiplier=Math.max(0,e)}get maxDelta(){return this.data.scroll.maxDelta}set maxDelta(e){this.data.scroll.maxDelta=Math.max(1,e)}get stopThreshold(){return this.data.scroll.stopThreshold}set stopThreshold(e){this.data.scroll.stopThreshold=Math.max(0,e)}configure(e){e.speed!==void 0&&(this.speed=e.speed),e.acceleration!==void 0&&(this.acceleration=e.acceleration),e.smoothness!==void 0&&(this.smoothness=e.smoothness),e.multiplier!==void 0&&(this.multiplier=e.multiplier),e.maxDelta!==void 0&&(this.maxDelta=e.maxDelta),e.stopThreshold!==void 0&&(this.stopThreshold=e.stopThreshold)}setLegacyDecelerationCoefficient(e){let t=Math.max(0,e);this.data.scroll.decelerationCoefficient=t,this.data.scroll.smoothness=this.getSmoothnessFromDecayPower(t)}mapNormalizedAcceleration(e){return .1+.4*e}getDecayPowerFromSmoothness(e){return 1+(.5-this.clamp01(e))*1.2}getSmoothnessFromDecayPower(e){return this.clamp01(.5-(e-1)/1.2)}clamp01(e){return Math.min(Math.max(0,e),1)}},Ft=class r{static DEVTOOLS_ACCESS_URL=`https://access.fiddle.digital/`;static DEVTOOLS_LOG_PREFIX=`[StringTune Devtools]`;static DEVTOOLS_ARTIFACT_SELECTORS=[`[data-string-dev-viewport-layer]`,`[data-string-dev-viewport-world]`,`[data-stdg-dock]`,`[data-stdg-dock-sub-badges]`];onScrollStartBind;onScrollStopBind;onDirectionChangeBind;onScrollConfigChangeBind;onWheelBind;onScrollBind;onResizeBind;onMouseMoveBind;onScrollToBind;onDOMChangedBind;onContainerTransitionEndBind;onResizeObserverBind;pendingScroll=!1;lastScrollEmitted=NaN;observerContainerMutation=null;pendingResizeRaf=null;pendingResizeForce=!1;pendingRebuildRaf=null;activeScrollIntent=null;static i;root;window;prevWidth=0;prevHeight=0;moduleManager;scrollManager;objectManager;eventManager;signalHub;cursorController;tools;loop=new tt;data;scrollSettings;context;centers;scrollScopes;hoverManager;devtools;devtoolsFpsLastSampleTime=0;devtoolsFpsFrameCount=0;observerContainerResize=null;devtoolsAccessToken=``;devtoolsAccessState=`unknown`;devtoolsAccessRequestId=0;pendingDevtoolUses=[];hasStarted=!1;devtoolsAccessLastMessage=`none`;canRebuild=!0;set scrollPosition(e){this.data.scroll.current=e,this.data.scroll.target=e,this.data.scroll.transformedCurrent=this.data.scroll.current*this.data.viewport.transformScale,this.data.scroll.delta=0,this.data.scroll.lerped=0,this.scrollManager.updatePosition(),this.moduleManager.onScroll(),this.objectManager.checkInview()}set accessDevtoolToken(e){let t=e.trim();if(t!==this.devtoolsAccessToken||this.devtoolsAccessState!==`granted`&&this.devtoolsAccessState!==`pending`){if(this.devtoolsAccessToken=t,t.length===0){this.devtoolsAccessState=`unknown`;return}this.validateDevtoolsAccess(t)}}set scrollContainer(e){let t=this.data.scroll.scrollContainer,n=this.data.scroll.container;this.hasStarted&&(t?.removeEventListener(`scroll`,this.onScrollBind),n?.removeEventListener(`wheel`,this.onWheelBind)),this.observerContainerResize?.unobserve(this.context.data.scroll.container),this.data.scroll.elementContainer.removeEventListener(`transitionend`,this.onContainerTransitionEndBind),e instanceof Window?(this.data.scroll.container=document.body,this.data.scroll.elementContainer=document.documentElement,this.data.scroll.scrollContainer=e):e instanceof HTMLElement?(this.data.scroll.container=e,this.data.scroll.elementContainer=e,this.data.scroll.scrollContainer=e):(this.data.scroll.container=document.body,this.data.scroll.elementContainer=document.documentElement,this.data.scroll.scrollContainer=e),this.data.scroll.elementContainer.addEventListener(`transitionend`,this.onContainerTransitionEndBind),this.observerContainerResize?.observe(this.context.data.scroll.container),this.observeContainerMutations(),this.hasStarted&&(this.data.scroll.scrollContainer?.addEventListener(`scroll`,this.onScrollBind),this.data.scroll.container?.addEventListener(`wheel`,this.onWheelBind,{passive:!1})),this.queueResize(!0,`scrollContainer`)}get scrollPosition(){return this.data.scroll.current}get scrollHeight(){return this.data.viewport.contentHeight}get containerHeight(){return this.data.viewport.windowHeight}get scroll(){return this.scrollSettings}set speed(e){this.scroll.speed=e}set speedAccelerate(e){this.scroll.acceleration=e}set decelerationCoefficient(e){this.scroll.setLegacyDecelerationCoefficient(e)}set scrollDesktopMode(e){this.scrollManager.setDesktopMode(e)}set scrollMobileMode(e){this.scrollManager.setMobileMode(e)}lockPageScroll(){this.scrollManager.lockPageScroll()}unlockPageScroll(){this.scrollManager.unlockPageScroll()}set FPSTrackerVisible(e){this.data.system.fpsTracker=e,this.eventManager.emit(`tracker:fps:visible`,e)}set PositionTrackerVisible(e){this.data.system.positionTracker=e,this.eventManager.emit(`tracker:position:visible`,e)}set domBatcherEnabled(e){this.objectManager.setDOMBatcherEnabled(e)}set intersectionObserverEnabled(e){this.objectManager.setIntersectionObserverEnabled(e)}debouncedResize=et(e=>{this.queueResize(!1,e)},30);debouncedRebuild=et(()=>{this.queueRebuild()},30);constructor(){this.cleanupExistingDevtoolsArtifacts(),this.root=document.body,this.window=window,this.tools=new ue,this.data=new S,this.scrollSettings=new Pt(this.data),this.eventManager=new t,this.signalHub=new st((e,t)=>this.eventManager.emit(e,t)),this.moduleManager=new n(this.data),this.objectManager=new l(this.data,this.moduleManager,this.eventManager,this.tools),this.scrollScopes=new it(window),this.centers=new at(this.scrollScopes),this.hoverManager=new ot,this.devtools=new Tt,this.context={events:this.eventManager,data:this.data,tools:this.tools,settings:{},centers:this.centers,hover:this.hoverManager,objectManager:this.objectManager,signals:this.signalHub,scrollScopes:this.scrollScopes},this.cursorController=new e(1,this.context),this.scrollManager=new h(this.context),this.setupSettings({"global-class":!1,"offset-top":`0%`,"offset-bottom":`0%`,key:`--progress`,"inview-top":`0%`,"inview-bottom":`0%`,"enter-el":`top`,"enter-vp":`bottom`,"exit-el":`bottom`,"exit-vp":`top`,"parallax-bias":`0.0`,parallax:`0.2`,lerp:`0.2`,"cursor-lerp":`0.75`,radius:`150`,strength:`0.3`,glide:`1`,anchor:`center center`,timeout:900,alignment:`center`,"target-disable":`false`,"target-style-disable":`false`,"target-class":``,active:`false`,fixed:`false`,repeat:`false`,"self-disable":`false`,abs:`false`,easing:`cubic-bezier(0.25, 0.25, 0.25, 0.25)`,"glide-base-velocity":.00125,"glide-reduce-velocity":625e-7,"glide-negative-velocity":-1e-4,"position-strength":3,"position-tension":.05,"position-friction":.15,"position-max-velocity":10,"position-update-threshold":.1,"rotation-strength":.75,"rotation-tension":.06,"rotation-friction":.18,"rotation-max-angular-velocity":6,"rotation-max-angle":18,"rotation-update-threshold":.15,"max-offset":220,"sleep-epsilon":.01,"continuous-push":!0}),this.onContainerTransitionEndBind=this.onContainerTransitionEnd.bind(this),this.onResizeObserverBind=this.onResizeObserverEvent.bind(this),this.observerContainerResize=new ResizeObserver(this.onResizeObserverBind),this.observerContainerResize.observe(this.context.data.scroll.container),this.onWheelBind=this.onWheelEvent.bind(this),this.onScrollBind=this.onScrollEvent.bind(this),this.onResizeBind=()=>{this.queueResize(!1,`resizeBind`)},this.onMouseMoveBind=this.onMouseMoveEvent.bind(this),this.onScrollStartBind=this.onScrollStart.bind(this),this.onScrollStopBind=this.onScrollStop.bind(this),this.onDirectionChangeBind=this.onDirectionChange.bind(this),this.onScrollConfigChangeBind=this.onScrollConfigChange.bind(this),this.onScrollToBind=this.scrollTo.bind(this),this.onDOMChangedBind=this.onDOMChanged.bind(this),this.eventManager.on(`wheel`,this.onWheelBind),this.eventManager.on(`resize`,this.onResizeBind),this.eventManager.on(`scrollTo`,this.onScrollToBind),this.eventManager.on(`dom:changed`,this.onDOMChangedBind),this.scrollManager.bindEvents({onScrollStart:this.onScrollStartBind,onScrollStop:this.onScrollStopBind,onDirectionChange:this.onDirectionChangeBind,onModeChange:this.onScrollConfigChangeBind}),this.loop.setOnFrame(e=>{this.data.time.delta=e-this.data.time.now,this.data.time.previous=this.data.time.now,this.data.time.now=e,this.data.time.elapsed+=this.data.time.delta,this.onUpdateEvent(),this.updateDevtoolsFPS(e)}),this.on(`image:load:all`,()=>{this.onRebuild()}),this.scrollContainer=window}static getInstance(){return r.i||=new r,r.i}reuse(e){return this.moduleManager.find(e)}use(e,t=null){this.moduleManager.find(e)||this.shouldDeferDevtoolModule(e,t)||this.instantiateModule(e,t)}cleanupExistingDevtoolsArtifacts(){for(let e of r.DEVTOOLS_ARTIFACT_SELECTORS)document.querySelectorAll(e).forEach(e=>e.remove())}instantiateModule(e,t=null){let n={...this.context.settings,...t},r=new e({events:this.eventManager,data:this.data,tools:this.tools,settings:n,centers:this.centers,hover:this.hoverManager,objectManager:this.objectManager,signals:this.signalHub,scrollScopes:this.scrollScopes});this.moduleManager.register(r),Mt(r)&&this.devtools.register(r.getDevtoolDefinition()),this.hasStarted&&(this.objectManager.attachModule(r),r.onInit(),r.onResize(),r.onScroll(this.data),r.onFrame(this.data))}shouldDeferDevtoolModule(e,t){return!(e===Ot||e.prototype instanceof Ot)||this.devtoolsAccessState===`granted`?!1:(this.pendingDevtoolUses.push({objectClass:e,settings:t}),this.devtoolsAccessToken.length>0&&this.devtoolsAccessState!==`pending`&&this.validateDevtoolsAccess(this.devtoolsAccessToken),!0)}async validateDevtoolsAccess(e){let t=++this.devtoolsAccessRequestId;this.devtoolsAccessState=`pending`;try{let n=await fetch(`${r.DEVTOOLS_ACCESS_URL}?token=${encodeURIComponent(e)}`),i=await this.resolveDevtoolsAccessResponse(n);if(t!==this.devtoolsAccessRequestId||e!==this.devtoolsAccessToken)return;if(this.devtoolsAccessState=i?`granted`:`denied`,!i){this.logDevtoolsAccess(`denied`),this.pendingDevtoolUses=[];return}this.logDevtoolsAccess(`granted`);let a=[...this.pendingDevtoolUses];this.pendingDevtoolUses=[],a.forEach(({objectClass:e,settings:t})=>{this.instantiateModule(e,t)})}catch{if(t!==this.devtoolsAccessRequestId||e!==this.devtoolsAccessToken||this.devtoolsAccessState===`granted`)return;this.devtoolsAccessState=`denied`,this.logDevtoolsAccess(`error`),this.pendingDevtoolUses=[]}}logDevtoolsAccess(e){if(this.devtoolsAccessLastMessage!==e){if(this.devtoolsAccessLastMessage=e,e===`granted`){console.info(`${r.DEVTOOLS_LOG_PREFIX} Access granted. Devtools modules are enabled.`);return}if(e===`denied`){console.warn(`${r.DEVTOOLS_LOG_PREFIX} Access denied. Devtools modules were not enabled. Check accessDevtoolToken.`);return}console.warn(`${r.DEVTOOLS_LOG_PREFIX} Access check failed. Devtools modules were not enabled.`)}}async resolveDevtoolsAccessResponse(e){if(!e.ok)return!1;if((e.headers.get(`content-type`)?.toLowerCase()??``).includes(`application/json`)){let t=await e.json();return typeof t==`boolean`?t:t&&typeof t==`object`&&`allowed`in t?t.allowed===!0:!1}return(await e.text()).trim().toLowerCase()===`true`}registerScrollMode(e,t){let n;n=typeof t==`function`&&t.prototype instanceof d?new t(this.context):t(this.context),n.name||(n.name=e),this.scrollManager.registerMode(e,n)}on(e,t,n=``){this.eventManager.on(e,t,n)}emit(e,t){this.eventManager.emit(e,t)}off(e,t,n=``){this.eventManager.off(e,t,n)}addScrollMark(e){this.scrollManager.addScrollMark(e)}removeScrollMark(e){this.scrollManager.removeScrollMark(e)}start(e){if(this.hasStarted)return;this.hasStarted=!0,this.data.scroll.scrollContainer?.addEventListener(`scroll`,this.onScrollBind),this.data.scroll.container?.addEventListener(`wheel`,this.onWheelBind,{passive:!1}),window.addEventListener(`resize`,this.onResizeBind),this.root.addEventListener(`mousemove`,this.onMouseMoveBind),this.observeContainerMutations(),this.use(de);let t=window.getComputedStyle(document.documentElement).fontSize,n=parseFloat(t);this.context.data.viewport.baseRem=n,document.documentElement.classList.add(`-string`),this.syncDebugScrollState(),this.moduleManager.onInit(),this.onResize(!1,`start`),this.initObjects(),this.objectManager.observeDOM(),this.loop.start(e),this.eventManager.emit(`start`,null)}initObjects(){document.querySelectorAll(`[string],[data-string]`).forEach(e=>{this.objectManager.add(e)}),document.querySelectorAll(`[string-copy-from],[data-string-copy-from]`).forEach(e=>{let t=this.tools.domAttribute.process({element:e,key:`copy-from`,fallback:``});t&&t.length>0&&this.objectManager.linkMirror(t,e)}),this.moduleManager.onResize(),this.moduleManager.onScroll(),this.moduleManager.onFrame()}setupSettings(e){this.context.settings={...this.context.settings,...e},typeof e.storageToken==`string`?gt(e.storageToken):typeof e[`storage-token`]==`string`&&gt(e[`storage-token`]),typeof e.accessDevtoolToken==`string`&&(this.accessDevtoolToken=e.accessDevtoolToken),this.onSettingsChange({isDesktop:this.data.viewport.windowWidth>1024,widthChanged:!0,heightChanged:!0,scrollHeightChanged:!0,isForceRebuild:!1})}onResizeObserverEvent(){this.debouncedResize(`resizeObserver`)}onContainerTransitionEnd(e){e.target===this.context.data.scroll.container&&this.queueResize(!0,`containerTransition`)}onDOMChanged(e){let t=e?.stringElementChanged===!0;this.queueResize(t,`domChanged`)}observeContainerMutations(){this.observerContainerMutation?.disconnect();let e=this.context.data.scroll.container;e&&(this.observerContainerMutation=new MutationObserver(e=>{for(let t=0;t<e.length;t++){let n=e[t];if(n.type===`attributes`&&(n.attributeName===`style`||n.attributeName===`class`)){this.debouncedResize(`containerMutation`);break}}}),this.observerContainerMutation.observe(e,{attributes:!0,attributeFilter:[`style`,`class`]}))}queueResize(e=!1,t=``){e&&(this.pendingResizeForce=!0),this.pendingResizeRaf??=requestAnimationFrame(()=>{this.pendingResizeRaf=null;let e=this.pendingResizeForce;this.pendingResizeForce=!1,this.onResize(e,t)})}queueRebuild(){this.pendingRebuildRaf??=requestAnimationFrame(()=>{this.pendingRebuildRaf=null,this.onRebuild()})}onRebuild(){let e=this.context.data.scroll,t=e.container.scrollHeight;this.context.data.viewport.contentHeight!==t&&(this.context.data.viewport.contentHeight=t,e.bottomPosition=t-this.context.data.viewport.windowHeight,this.moduleManager.onRebuild())}onMouseMoveEvent(e){this.cursorController.onMouseMove(e),this.moduleManager.onMouseMove(e),P.measure(()=>{this.moduleManager.onMouseMoveMeasure()})}onWheelEvent(e){e.target.closest(`[string-isolation],[data-string-isolation]`)??(this.clearActiveScrollIntent(`wheel`),this.scrollManager.get().onWheel(e),this.moduleManager.onWheel(e))}onScrollStart(){this.moduleManager.onScrollStart(),this.eventManager.emit(`scroll:start`,null)}onScrollStop(){this.clearActiveScrollIntent(`scroll-stop`),this.moduleManager.onScrollStop(),this.eventManager.emit(`scroll:stop`,null)}onDirectionChange(){this.moduleManager.onDirectionChange()}onScrollConfigChange(){this.moduleManager.onScrollConfigChange(),this.syncDebugScrollState(),this.moduleManager.onScroll(),this.moduleManager.onScrollMeasure(),this.moduleManager.onFrame(),N.run(()=>{this.moduleManager.onMutate()})}syncDebugScrollState(){let e=document.documentElement,t=window.innerWidth<1024;e.setAttribute(`data-string-scroll-mode`,String(this.data.scroll.mode)),e.setAttribute(`data-string-scroll-device`,t?`mobile`:`desktop`)}onSettingsChange(e){this.cursorController.onSettingsChange(e),this.objectManager.onSettingsChange(e),this.moduleManager.onSettingsChange(e)}onScrollEvent(e){return e.preventDefault(),this.context.centers.invalidateAll(),this.scrollManager.get().onScroll(e),this.data.scroll.mode!==`smooth`&&this.clearActiveScrollIntent(`native-scroll-non-smooth`),this.pendingScroll=!0,!1}onUpdateEvent(){this.cursorController.onFrame(),this.scrollManager.get().onFrame(),this.moduleManager.onFrame(),(this.pendingScroll||this.data.scroll.current!==this.lastScrollEmitted)&&(this.pendingScroll=!1,this.moduleManager.onScroll(),this.objectManager.checkInview(),this.eventManager.emit(`lerp`,this.data.scroll.lerped),this.eventManager.emit(`scroll`,this.data.scroll.current),P.measure(()=>{this.moduleManager.onScrollMeasure()}),this.lastScrollEmitted=this.data.scroll.current),P.mutate(()=>{N.begin(),this.moduleManager.onMutate(),N.commit()}),this.eventManager.emit(`update`,null),P.flush()}updateDevtoolsFPS(e){this.devtoolsFpsLastSampleTime===0&&(this.devtoolsFpsLastSampleTime=e),this.devtoolsFpsFrameCount+=1;let t=e-this.devtoolsFpsLastSampleTime;if(t<1e3)return;let n=this.devtoolsFpsFrameCount*1e3/t;this.devtools.setFPS(n),this.devtoolsFpsFrameCount=0,this.devtoolsFpsLastSampleTime=e}onResize(e=!1,t=``){if(this.canRebuild==0)return;let n=this.data.scroll.container,r=this.context.data.scroll,i=0,a=0;var o,s=0;let c=n.getBoundingClientRect();n.tagName==`BODY`?(i=document.documentElement.clientWidth||window.innerWidth||c.width,a=window.innerHeight):(i=c.width,a=c.height),s=n.tagName===`BODY`?0:c.top,o=r.container.scrollHeight;let l=this.tools.transformScaleParser.process({value:window.getComputedStyle(n).transform});this.context.data.viewport.transformScale=window.getComputedStyle(n).scale==`none`?l:Number(window.getComputedStyle(n).scale),this.context.data.scroll.transformedCurrent=this.context.data.scroll.current*this.context.data.viewport.transformScale;let u=Nt(),d=i>1024,f=this.prevWidth!==i,p=this.prevHeight!==a,m=Math.abs(this.prevHeight-a),h=this.context.data.viewport.contentHeight!==o,g=f||!u&&p||u&&m>150||h;this.context.data.scroll.topPosition=Math.floor(s),this.context.data.viewport.contentWidth=i,this.context.data.viewport.contentHeight=o,this.prevWidth=i,this.prevHeight=a,this.context.data.viewport.windowWidth=i,this.context.data.viewport.windowHeight=a;let _=window.getComputedStyle(document.documentElement).fontSize,v=parseFloat(_);if(this.context.data.viewport.baseRem=v*l,this.syncDebugScrollState(),r.bottomPosition=this.context.data.viewport.contentHeight-a,(f||typeof e==`boolean`&&e)&&this.moduleManager.onResizeWidth(),g||typeof e==`boolean`&&e){let t=this.context.data.scroll.elementContainer.scrollTop;this.context.data.scroll.target;let n=r.mode===`smooth`&&(Math.abs(r.target-r.current)>1||Math.abs(r.delta)>1e-4);if((t>0||r.current!==0)&&(this.context.data.scroll.current=Math.max(0,Math.min(t,this.context.data.scroll.bottomPosition)),this.context.data.scroll.transformedCurrent=this.context.data.scroll.current*this.context.data.viewport.transformScale),n){let e=(this.activeScrollIntent?this.resolveScrollIntentPosition(this.activeScrollIntent):null)??this.context.data.scroll.target,t=Math.max(0,Math.min(e,this.context.data.scroll.bottomPosition));this.context.data.scroll.target=t,Math.abs(this.context.data.scroll.target-this.context.data.scroll.current)<=1&&(this.context.data.scroll.target=this.context.data.scroll.current,this.context.data.scroll.delta=0,this.context.data.scroll.lerped=0)}else t>0&&(this.context.data.scroll.target=this.context.data.scroll.current);this.moduleManager.onResize(),this.scrollManager&&this.scrollManager.updateResponsiveMode(),this.onSettingsChange({isDesktop:d,widthChanged:f,heightChanged:p,scrollHeightChanged:h,isForceRebuild:e===!0}),this.objectManager.refreshObservers(),this.objectManager.invalidateInviewIndex(),this.moduleManager.onScroll(),this.moduleManager.onScrollMeasure(),this.moduleManager.onFrame()}this.objectManager.checkInview()}invalidateCenter(e){let t=this.objectManager.all.get(e);t&&this.centers.invalidate(t)}scrollTo(e){let t=this.resolveScrollToValue(e);t!=null&&(this.activeScrollIntent=t.intent,this.scrollManager.get().scrollTo(t.position,t.immediate))}resolveScrollToValue(e){if(typeof e==`number`)return{position:e,immediate:!1,intent:{kind:`position`,position:e,immediate:!1}};if(typeof e==`string`||e instanceof HTMLElement){let t=this.resolveElementScrollPosition(e);return t==null?null:{position:t,immediate:!1,intent:typeof e==`string`?{kind:`selector`,selector:e,offset:0,immediate:!1}:{kind:`element`,element:e,offset:0,immediate:!1}}}let t=e.immediate===!0,n=e.offset??0;if(`position`in e)return{position:e.position+n,immediate:t,intent:{kind:`position`,position:e.position+n,immediate:t}};let r=`selector`in e?e.selector:e.element,i=this.resolveElementScrollPosition(r);return i==null?null:{position:i+n,immediate:t,intent:`selector`in e?{kind:`selector`,selector:e.selector,offset:n,immediate:t}:{kind:`element`,element:e.element,offset:n,immediate:t}}}resolveElementScrollPosition(e){let t=typeof e==`string`?document.querySelector(e):e;if(!(t instanceof HTMLElement))return null;let n=this.data.scroll.container??document.body??document.documentElement,r=this.data.scroll.elementContainer??document.documentElement,i=this.tools.transformNullify.process({element:t});if(n===document.body||n===document.documentElement)return i.top+r.scrollTop;let a=n.getBoundingClientRect();return i.top-a.top+n.scrollTop}resolveScrollIntentPosition(e){switch(e.kind){case`position`:return e.position;case`selector`:{let t=this.resolveElementScrollPosition(e.selector);return t==null?null:t+e.offset}case`element`:{let t=this.resolveElementScrollPosition(e.element);return t==null?null:t+e.offset}}}clearActiveScrollIntent(e){this.activeScrollIntent&&=null}destroy(){this.hasStarted=!1,this.data.scroll.scrollContainer?.removeEventListener(`scroll`,this.onScrollBind),this.data.scroll.container?.removeEventListener(`wheel`,this.onWheelBind),window.removeEventListener(`resize`,this.onResizeBind),this.root.removeEventListener(`mousemove`,this.onMouseMoveBind),this.eventManager.off(`dom:changed`,this.onDOMChangedBind),this.observerContainerMutation?.disconnect(),this.observerContainerMutation=null,this.pendingResizeRaf!=null&&(cancelAnimationFrame(this.pendingResizeRaf),this.pendingResizeRaf=null),this.pendingRebuildRaf!=null&&(cancelAnimationFrame(this.pendingRebuildRaf),this.pendingRebuildRaf=null),this.objectManager.destroy(),this.scrollManager.destroy(),this.devtools.destroy()}},It=()=>{window.va||(window.va=function(...e){window.vaq||(window.vaq=[]),window.vaq.push(e)})},Lt=`@vercel/analytics`,Rt=`2.0.1`;function G(){return typeof window<`u`}function zt(){return`production`}function Bt(e=`auto`){if(e===`auto`){window.vam=zt();return}window.vam=e}function Vt(){return(G()?window.vam:zt())||`production`}function Ht(){return Vt()===`production`}function K(){return Vt()===`development`}function Ut(e,{[e]:t,...n}){return n}function Wt(e,t){if(!e)return;let n=e,r=[];for(let[i,a]of Object.entries(e))typeof a==`object`&&a&&(t.strip?n=Ut(i,n):r.push(i));if(r.length>0&&!t.strip)throw Error(`The following properties are not valid: ${r.join(`, `)}. Only strings, numbers, booleans, and null are allowed.`);return n}function Gt(e){return e.scriptSrc?q(e.scriptSrc):K()?`https://va.vercel-scripts.com/v1/script.debug.js`:e.basePath?q(`${e.basePath}/insights/script.js`):`/_vercel/insights/script.js`}function Kt(e,t){let n=e;if(t)try{n={...JSON.parse(t)?.analytics,...e}}catch{}Bt(n.mode);let r={sdkn:Lt+(n.framework?`/${n.framework}`:``),sdkv:Rt};return n.disableAutoTrack&&(r.disableAutoTrack=`1`),n.viewEndpoint&&(r.viewEndpoint=q(n.viewEndpoint)),n.eventEndpoint&&(r.eventEndpoint=q(n.eventEndpoint)),n.sessionEndpoint&&(r.sessionEndpoint=q(n.sessionEndpoint)),K()&&n.debug===!1&&(r.debug=`false`),n.dsn&&(r.dsn=n.dsn),n.endpoint?r.endpoint=n.endpoint:n.basePath&&(r.endpoint=q(`${n.basePath}/insights`)),{beforeSend:n.beforeSend,src:Gt(n),dataset:r}}function q(e){return e.startsWith(`http://`)||e.startsWith(`https://`)||e.startsWith(`/`)?e:`/${e}`}function qt(e={debug:!0},t){var n;if(!G())return;let{beforeSend:r,src:i,dataset:a}=Kt(e,t);if(It(),r&&((n=window.va)==null||n.call(window,`beforeSend`,r)),document.head.querySelector(`script[src*="${i}"]`))return;let o=document.createElement(`script`);o.src=i;for(let[e,t]of Object.entries(a))o.dataset[e]=t;o.defer=!0,o.onerror=()=>{let e=K()?`Please check if any ad blockers are enabled and try again.`:`Be sure to enable Web Analytics for your project and deploy again. See https://vercel.com/docs/analytics/quickstart for more information.`;console.log(`[Vercel Web Analytics] Failed to load script from ${i}. ${e}`)},document.head.appendChild(o)}function Jt(e,t,n){var r,i;if(!G()){let e="[Vercel Web Analytics] Please import `track` from `@vercel/analytics/server` when using this function in a server environment";if(Ht())console.warn(e);else throw Error(e);return}if(!t){(r=window.va)==null||r.call(window,`event`,{name:e,options:n});return}try{let r=Wt(t,{strip:Ht()});(i=window.va)==null||i.call(window,`event`,{name:e,data:r,options:n})}catch(e){e instanceof Error&&K()&&console.error(e)}}var Yt=()=>{window.si||(window.si=function(...e){window.siq=window.siq||[],window.siq.push(e)})},Xt=`@vercel/speed-insights`,Zt=`2.0.0`;function Qt(){return typeof window<`u`}function $t(){return`production`}function en(){return $t()===`development`}function tn(e){return e.scriptSrc?J(e.scriptSrc):en()?`https://va.vercel-scripts.com/v1/speed-insights/script.debug.js`:e.dsn?`https://va.vercel-scripts.com/v1/speed-insights/script.js`:e.basePath?J(`${e.basePath}/speed-insights/script.js`):`/_vercel/speed-insights/script.js`}function nn(e,t){let n=e;if(t)try{n={...JSON.parse(t)?.speedInsights,...e}}catch{}let r={sdkn:Xt+(n.framework?`/${n.framework}`:``),sdkv:Zt};return n.sampleRate&&(r.sampleRate=n.sampleRate.toString()),n.route&&(r.route=n.route),en()&&n.debug===!1&&(r.debug=`false`),n.dsn&&(r.dsn=n.dsn),n.endpoint?r.endpoint=J(n.endpoint):n.basePath&&(r.endpoint=J(`${n.basePath}/speed-insights/vitals`)),{src:tn(n),beforeSend:n.beforeSend,dataset:r}}function J(e){return e.startsWith(`http://`)||e.startsWith(`https://`)||e.startsWith(`/`)?e:`/${e}`}function rn(e={},t){var n;if(!Qt()||e.route===null)return null;Yt();let{beforeSend:r,src:i,dataset:a}=nn(e,t);if(document.head.querySelector(`script[src*="${i}"]`))return null;r&&((n=window.si)==null||n.call(window,`beforeSend`,r));let o=document.createElement(`script`);o.src=i,o.defer=!0;for(let[e,t]of Object.entries(a))o.dataset[e]=t;return o.onerror=()=>{console.log(`[Vercel Speed Insights] Failed to load script from ${i}. Please check if any content blockers are enabled and try again.`)},document.head.appendChild(o),{setRoute:e=>{o.dataset.route=e??void 0}}}var an=/(^|\.)vercel\.app$/.test(location.hostname)||location.hostname===`oloid-game.ru`;an&&(qt(),rn());var on=(e,t)=>{an&&Jt(e,t)},sn=window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,Y=Ft.getInstance();Y.use(me),Y.use(he),Y.use($e),sn&&(Y.scrollDesktopMode=`default`,document.documentElement.classList.add(`reduced`)),Y.speed=.16,Y.speedAccelerate=.55,Y.start(60);var cn=()=>{typeof Y.refreshLayoutForRoot==`function`?Y.refreshLayoutForRoot(document.body):typeof Y.invalidateAll==`function`&&Y.invalidateAll()};document.fonts?.ready.then(cn),window.addEventListener(`load`,cn);var ln=document.querySelector(`.hdr`);document.querySelectorAll(`a[data-scroll]`).forEach(e=>{e.addEventListener(`click`,t=>{let n=e.getAttribute(`href`);if(!n||!n.startsWith(`#`)||!document.querySelector(n))return;t.preventDefault();let r=(ln?.offsetHeight||76)+24;Y.scrollTo({selector:n,offset:-r}),history.replaceState(null,``,n)})});var un=()=>ln.classList.toggle(`is-solid`,window.scrollY>40);window.addEventListener(`scroll`,un,{passive:!0}),un();var dn=[],fn=e=>{if(!e||Number.isNaN(e))return`0:00`;let t=Math.floor(e/60),n=Math.floor(e%60);return`${t}:${String(n).padStart(2,`0`)}`};document.querySelectorAll(`[data-player]`).forEach(e=>{let t=e.querySelector(`[data-player-toggle]`),n=e.querySelector(`[data-player-time]`),r=e.querySelector(`[data-player-bar]`),i=e.querySelector(`[data-player-fill]`),a=null,o=()=>{if(!a)return;let e=a.duration||0,t=e?a.currentTime/e:0;i.style.transform=`scaleX(${t})`,n.textContent=`${fn(a.currentTime)} / ${fn(e)}`,r.setAttribute(`aria-valuenow`,String(Math.round(t*100)))},s=()=>a||(a=new Audio,a.preload=`none`,a.src=e.dataset.src,a.addEventListener(`timeupdate`,o),a.addEventListener(`loadedmetadata`,o),a.addEventListener(`ended`,()=>{e.classList.remove(`is-playing`),a.currentTime=0,o()}),a.addEventListener(`error`,()=>{e.classList.remove(`is-playing`),e.classList.add(`is-error`),n.textContent=`Не\xA0удалось загрузить`}),a),c={root:e,pause(){a&&!a.paused&&a.pause(),e.classList.remove(`is-playing`)},async play(){dn.forEach(e=>e!==c&&e.pause());let t=s();e.classList.add(`is-loading`);try{await t.play(),e.classList.add(`is-playing`)}catch{e.classList.add(`is-error`),n.textContent=`Не\xA0удалось воспроизвести`}finally{e.classList.remove(`is-loading`)}}};dn.push(c),t.addEventListener(`click`,()=>{e.classList.contains(`is-playing`)?c.pause():c.play()});let l=e=>{let t=s();t.duration&&(t.currentTime=Math.max(0,Math.min(1,e))*t.duration,o())};r.addEventListener(`click`,e=>{let t=r.getBoundingClientRect();l((e.clientX-t.left)/t.width)}),r.addEventListener(`keydown`,e=>{a&&a.duration&&(e.key===`ArrowRight`&&(a.currentTime=Math.min(a.duration,a.currentTime+5),o()),e.key===`ArrowLeft`&&(a.currentTime=Math.max(0,a.currentTime-5),o()))})});var X=document.querySelector(`[data-strip]`);if(X){let e=()=>{let e=X.querySelector(`.card`),t=parseFloat(getComputedStyle(X).columnGap||`0`)||0;return e?e.getBoundingClientRect().width+t:300},t=0,n=e=>{cancelAnimationFrame(t);let n=X.scrollLeft,r=X.scrollWidth-X.clientWidth,i=Math.max(0,Math.min(r,n+e));if(sn){X.scrollLeft=i;return}let a=performance.now(),o=e=>{let r=Math.min(1,(e-a)/420),s=1-(1-r)**3;X.scrollLeft=n+(i-n)*s,r<1&&(t=requestAnimationFrame(o))};t=requestAnimationFrame(o)};document.querySelector(`[data-strip-prev]`)?.addEventListener(`click`,()=>n(-e())),document.querySelector(`[data-strip-next]`)?.addEventListener(`click`,()=>n(e())),new IntersectionObserver(e=>{X.classList.toggle(`is-live`,e.some(e=>e.isIntersecting))},{threshold:.15}).observe(X)}var Z=document.querySelector(`[data-gallery]`);if(Z){let e=[{src:`https://oloid-media.s3.twcstorage.ru/img/screens/loc-corridor.webp`,label:`Коридор квартиры`},{src:`https://oloid-media.s3.twcstorage.ru/img/screens/loc-dvor-day.webp`,label:`Двор-колодец`},{src:`https://oloid-media.s3.twcstorage.ru/img/screens/loc-kitchen.webp`,label:`Кухня утром`},{src:`https://oloid-media.s3.twcstorage.ru/img/screens/loc-cabinet-day.webp`,label:`Кабинет днём`},{src:`https://oloid-media.s3.twcstorage.ru/img/screens/loc-car.webp`,label:`Машина Алика`},{src:`https://oloid-media.s3.twcstorage.ru/img/screens/loc-bar.webp`,label:`Рюмочная`},{src:`https://oloid-media.s3.twcstorage.ru/img/screens/loc-psych.webp`,label:`Больница`},{src:`https://oloid-media.s3.twcstorage.ru/img/screens/loc-morgue.webp`,label:`Морг`}],t=Z.querySelector(`[data-stage]`),n=Z.querySelector(`[data-stage-img]`),r=Z.querySelector(`[data-stage-label]`),i=Z.querySelector(`[data-stage-count]`),a=[...Z.querySelectorAll(`[data-thumb]`)],o=e=>String(e).padStart(2,`0`),s=s=>{t.classList.add(`is-switching`);let c=new Image;c.src=e[s].src;let l=()=>{n.src=e[s].src,n.alt=e[s].label,t.classList.remove(`is-switching`)};c.decode?c.decode().then(l,l):c.onload=l,r.textContent=e[s].label,i.textContent=`${o(s+1)} / ${o(e.length)}`,a.forEach((e,t)=>{e.classList.toggle(`is-active`,t===s),e.setAttribute(`aria-current`,t===s?`true`:`false`)})},c=0,l=t=>{c=(t+e.length)%e.length,s(c)};a.forEach(e=>e.addEventListener(`click`,()=>l(Number(e.dataset.thumb)))),Z.querySelector(`[data-stage-prev]`)?.addEventListener(`click`,()=>l(c-1)),Z.querySelector(`[data-stage-next]`)?.addEventListener(`click`,()=>l(c+1))}var Q=document.querySelector(`[data-wall]`);if(Q){let e=document.querySelector(`[data-knock-text]`),t=document.querySelector(`[data-wall-cta]`),n=Q.querySelector(`[data-crack]`),r=Q.querySelector(`[data-crack-fan]`),i={wall:Q.querySelector(`[data-layer="wall"]`),fan:Q.querySelector(`[data-layer="fan"]`)},a=[...Q.querySelectorAll(`.sc`)],o=(e,t=!1)=>{a.forEach((n,r)=>{n.classList.toggle(`is-on`,r===e),n.classList.toggle(`is-instant`,t&&r===e)})},s=0,c=null,l=()=>{if(!c)try{c=new(window.AudioContext||window.webkitAudioContext)}catch{c=null}return c};`requestIdleCallback`in window?requestIdleCallback(()=>l(),{timeout:4e3}):setTimeout(l,2e3),Q.addEventListener(`pointerenter`,l,{once:!0});let u=e=>e>=6?``:e===5?`Под\xA0фанерой\xA0— дверь, которой нет на\xA0планах дома. Нажмите.`:e===4?`Фанера. Кто-то очень не\xA0хотел, чтобы сюда заглядывали.`:e===3?`Под\xA0обоями оказалась фанера.`:e===2?`Обои отходят. Под\xA0ними что-то плоское.`:e>=1?`Слышали?..`:`Постучите в\xA0дверь`,d=e=>{try{if(!l())return;c.state===`suspended`&&c.resume();let t=c.currentTime,n=e===4||e===5,r=e>=6,i=e===3||e===5||e===6,a=n?170:r?120:88,o=n?95:r?70:48,s=n?.12:r?.18:.2,u=c.createOscillator(),d=c.createGain();u.type=`sine`,u.frequency.setValueAtTime(a,t),u.frequency.exponentialRampToValueAtTime(o,t+s*.45),d.gain.setValueAtTime(1e-4,t),d.gain.exponentialRampToValueAtTime(.7,t+.006),d.gain.exponentialRampToValueAtTime(1e-4,t+s),u.connect(d),d.connect(c.destination),u.start(t),u.stop(t+s+.02);let f=i?17640:2205,p=c.createBuffer(1,f,44100),m=p.getChannelData(0);for(let e=0;e<f;e++)m[e]=(Math.random()*2-1)*(1-e/f)**(i?1.6:3);let h=c.createBufferSource();h.buffer=p;let g=c.createBiquadFilter();g.type=`lowpass`,g.frequency.value=n||i?700:320;let _=c.createGain();_.gain.value=i?.4:.3,h.connect(g),g.connect(_),_.connect(c.destination),h.start(t)}catch{}try{navigator.vibrate&&navigator.vibrate(e>=5?60:30)}catch{}};Q.addEventListener(`click`,()=>{s>=6||(s+=1,d(s),Q.classList.remove(`shake-a`,`shake-b`),Q.offsetWidth,Q.classList.add(s%2?`shake-a`:`shake-b`),n.style.opacity=s===1?`0.5`:s===2?`1`:`0`,r.style.opacity=s===4?`1`:`0`,s===3&&(o(1,!0),i.wall.classList.add(`is-fallen`)),s===5&&(o(2),i.fan.classList.add(`is-fallen`)),s>=6&&(o(3),Q.classList.add(`is-open`),Q.setAttribute(`aria-label`,`Дверь приоткрыта`),t.hidden=!1),e.textContent=u(s),e.classList.toggle(`is-strong`,s>=6))})}var $=document.getElementById(`wishlist-modal`);if($){let e=e=>{e.preventDefault(),$.hidden=!1,document.body.style.overflow=`hidden`,$.querySelector(`.wl-modal-close`)?.focus()},t=()=>{$.hidden=!0,document.body.style.overflow=``};document.querySelectorAll(`a[href*="store.steampowered.com"]`).forEach(t=>{t.addEventListener(`click`,e)}),$.querySelector(`.wl-modal-close`)?.addEventListener(`click`,t),$.addEventListener(`click`,e=>{e.target===$&&t()}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&!$.hidden&&t()})}var pn=document.querySelector(`.epochs`);pn&&new IntersectionObserver(e=>{pn.classList.toggle(`is-live`,e.some(e=>e.isIntersecting))},{threshold:.4}).observe(pn);var mn=document.querySelector(`[data-days]`);if(mn){let e=Math.ceil((new Date(2026,9,1).getTime()-Date.now())/864e5);if(e>0){let t=e%100,n=e%10;mn.textContent=`До октября — ${e} ${t>10&&t<20?`дней`:n>1&&n<5?`дня`:n===1?`день`:`дней`}`,mn.hidden=!1}}var hn=e=>e.closest(`.hdr`)?`header`:e.closest(`.hero`)?`hero`:e.closest(`.wl-modal`)?`modal`:e.closest(`.wall-sec`)?`wall`:e.closest(`.release`)?`release`:e.closest(`.ftr`)?`footer`:`other`;document.addEventListener(`click`,e=>{let t=e.target.closest(`a[href]`);t&&(t.href.includes(`store.steampowered.com`)?on(`wishlist`,{place:hn(t)}):t.href.includes(`t.me/`)&&on(`telegram`,{place:hn(t)}))});