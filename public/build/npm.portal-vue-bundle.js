(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{9:function(t,e,r){"use strict";
/*! 
  * portal-vue © Thorsten Lünborg, 2019 
  * 
  * Version: 2.1.7
  * 
  * LICENCE: MIT 
  * 
  * https://github.com/linusborg/portal-vue
  * 
 */Object.defineProperty(e,"__esModule",{value:!0});var n,o=(n=r(7))&&"object"==typeof n&&"default"in n?n.default:n;function s(t){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(t){return function(t){if(Array.isArray(t)){for(var e=0,r=new Array(t.length);e<t.length;e++)r[e]=t[e];return r}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var a="undefined"!=typeof window;function u(t,e){return e.reduce((function(e,r){return t.hasOwnProperty(r)&&(e[r]=t[r]),e}),{})}var l={},c={},p={},h=new(o.extend({data:function(){return{transports:l,targets:c,sources:p,trackInstances:a}},methods:{open:function(t){if(a){var e=t.to,r=t.from,n=t.passengers,i=t.order,u=void 0===i?1/0:i;if(e&&r&&n){var l,c={to:e,from:r,passengers:(l=n,Array.isArray(l)||"object"===s(l)?Object.freeze(l):l),order:u};-1===Object.keys(this.transports).indexOf(e)&&o.set(this.transports,e,[]);var p,h=this.$_getTransportIndex(c),d=this.transports[e].slice(0);-1===h?d.push(c):d[h]=c,this.transports[e]=(p=function(t,e){return t.order-e.order},d.map((function(t,e){return[e,t]})).sort((function(t,e){return p(t[1],e[1])||t[0]-e[0]})).map((function(t){return t[1]})))}}},close:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=t.to,n=t.from;if(r&&(n||!1!==e)&&this.transports[r])if(e)this.transports[r]=[];else{var o=this.$_getTransportIndex(t);if(o>=0){var s=this.transports[r].slice(0);s.splice(o,1),this.transports[r]=s}}},registerTarget:function(t,e,r){a&&(this.trackInstances&&!r&&this.targets[t]&&console.warn("[portal-vue]: Target ".concat(t," already exists")),this.$set(this.targets,t,Object.freeze([e])))},unregisterTarget:function(t){this.$delete(this.targets,t)},registerSource:function(t,e,r){a&&(this.trackInstances&&!r&&this.sources[t]&&console.warn("[portal-vue]: source ".concat(t," already exists")),this.$set(this.sources,t,Object.freeze([e])))},unregisterSource:function(t){this.$delete(this.sources,t)},hasTarget:function(t){return!(!this.targets[t]||!this.targets[t][0])},hasSource:function(t){return!(!this.sources[t]||!this.sources[t][0])},hasContentFor:function(t){return!!this.transports[t]&&!!this.transports[t].length},$_getTransportIndex:function(t){var e=t.to,r=t.from;for(var n in this.transports[e])if(this.transports[e][n].from===r)return+n;return-1}}}))(l),d=1,f=o.extend({name:"portal",props:{disabled:{type:Boolean},name:{type:String,default:function(){return String(d++)}},order:{type:Number,default:0},slim:{type:Boolean},slotProps:{type:Object,default:function(){return{}}},tag:{type:String,default:"DIV"},to:{type:String,default:function(){return String(Math.round(1e7*Math.random()))}}},created:function(){var t=this;this.$nextTick((function(){h.registerSource(t.name,t)}))},mounted:function(){this.disabled||this.sendUpdate()},updated:function(){this.disabled?this.clear():this.sendUpdate()},beforeDestroy:function(){h.unregisterSource(this.name),this.clear()},watch:{to:function(t,e){e&&e!==t&&this.clear(e),this.sendUpdate()}},methods:{clear:function(t){var e={from:this.name,to:t||this.to};h.close(e)},normalizeSlots:function(){return this.$scopedSlots.default?[this.$scopedSlots.default]:this.$slots.default},normalizeOwnChildren:function(t){return"function"==typeof t?t(this.slotProps):t},sendUpdate:function(){var t=this.normalizeSlots();if(t){var e={from:this.name,to:this.to,passengers:i(t),order:this.order};h.open(e)}else this.clear()}},render:function(t){var e=this.$slots.default||this.$scopedSlots.default||[],r=this.tag;return e&&this.disabled?e.length<=1&&this.slim?this.normalizeOwnChildren(e)[0]:t(r,[this.normalizeOwnChildren(e)]):this.slim?t():t(r,{class:{"v-portal":!0},style:{display:"none"},key:"v-portal-placeholder"})}}),g=o.extend({name:"portalTarget",props:{multiple:{type:Boolean,default:!1},name:{type:String,required:!0},slim:{type:Boolean,default:!1},slotProps:{type:Object,default:function(){return{}}},tag:{type:String,default:"div"},transition:{type:[String,Object,Function]}},data:function(){return{transports:h.transports,firstRender:!0}},created:function(){var t=this;this.$nextTick((function(){h.registerTarget(t.name,t)}))},watch:{ownTransports:function(){this.$emit("change",this.children().length>0)},name:function(t,e){h.unregisterTarget(e),h.registerTarget(t,this)}},mounted:function(){var t=this;this.transition&&this.$nextTick((function(){t.firstRender=!1}))},beforeDestroy:function(){h.unregisterTarget(this.name)},computed:{ownTransports:function(){var t=this.transports[this.name]||[];return this.multiple?t:0===t.length?[]:[t[t.length-1]]},passengers:function(){return function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return t.reduce((function(t,r){var n=r.passengers[0],o="function"==typeof n?n(e):r.passengers;return t.concat(o)}),[])}(this.ownTransports,this.slotProps)}},methods:{children:function(){return 0!==this.passengers.length?this.passengers:this.$scopedSlots.default?this.$scopedSlots.default(this.slotProps):this.$slots.default||[]},noWrapper:function(){var t=this.slim&&!this.transition;return t&&this.children().length>1&&console.warn("[portal-vue]: PortalTarget with `slim` option received more than one child element."),t}},render:function(t){var e=this.noWrapper(),r=this.children(),n=this.transition||this.tag;return e?r[0]:this.slim&&!n?t():t(n,{props:{tag:this.transition&&this.tag?this.tag:void 0},class:{"vue-portal-target":!0}},r)}}),m=0,y=["disabled","name","order","slim","slotProps","tag","to"],v=["multiple","transition"],S=o.extend({name:"MountingPortal",inheritAttrs:!1,props:{append:{type:[Boolean,String]},bail:{type:Boolean},mountTo:{type:String,required:!0},disabled:{type:Boolean},name:{type:String,default:function(){return"mounted_"+String(m++)}},order:{type:Number,default:0},slim:{type:Boolean},slotProps:{type:Object,default:function(){return{}}},tag:{type:String,default:"DIV"},to:{type:String,default:function(){return String(Math.round(1e7*Math.random()))}},multiple:{type:Boolean,default:!1},targetSlim:{type:Boolean},targetSlotProps:{type:Object,default:function(){return{}}},targetTag:{type:String,default:"div"},transition:{type:[String,Object,Function]}},created:function(){if("undefined"!=typeof document){var t=document.querySelector(this.mountTo);if(t){var e=this.$props;if(h.targets[e.name])e.bail?console.warn("[portal-vue]: Target ".concat(e.name," is already mounted.\n        Aborting because 'bail: true' is set")):this.portalTarget=h.targets[e.name];else{var r=e.append;if(r){var n="string"==typeof r?r:"DIV",o=document.createElement(n);t.appendChild(o),t=o}var s=u(this.$props,v);s.slim=this.targetSlim,s.tag=this.targetTag,s.slotProps=this.targetSlotProps,s.name=this.to,this.portalTarget=new g({el:t,parent:this.$parent||this,propsData:s})}}else console.error("[portal-vue]: Mount Point '".concat(this.mountTo,"' not found in document"))}},beforeDestroy:function(){var t=this.portalTarget;if(this.append){var e=t.$el;e.parentNode.removeChild(e)}t.$destroy()},render:function(t){if(!this.portalTarget)return console.warn("[portal-vue] Target wasn't mounted"),t();if(!this.$scopedSlots.manual){var e=u(this.$props,y);return t(f,{props:e,attrs:this.$attrs,on:this.$listeners,scopedSlots:this.$scopedSlots},this.$slots.default)}var r=this.$scopedSlots.manual({to:this.to});return Array.isArray(r)&&(r=r[0]),r||t()}});var b={install:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t.component(e.portalName||"Portal",f),t.component(e.portalTargetName||"PortalTarget",g),t.component(e.MountingPortalName||"MountingPortal",S)}};e.default=b,e.Portal=f,e.PortalTarget=g,e.MountingPortal=S,e.Wormhole=h}}]);