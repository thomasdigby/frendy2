!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.froffcanvas=t()}(this,function(){"use strict";function e(e){function r(){e.setAttribute("aria-hidden",!0)}function c(){e.removeAttribute("aria-hidden",!0)}function u(){e.style.visibility="visible",e.setAttribute("aria-hidden",!1),e.setAttribute("tabindex",-1),e.focus(),n(p),n(y),n(h),n(m),e.scrollTop=0,e.classList.add(q),z.isOpen=!0,z.emit("show")}function s(){var t=arguments.length<=0||void 0===arguments[0]?N:arguments[0];e.style.visibility="hidden",e.setAttribute("aria-hidden",!0),e.removeAttribute("tabindex"),e.blur(),L(),b(),E(),v(),e.classList.remove(q),z.isOpen=!1,z.emit("hide"),t&&(t.focus(),t=null)}function f(e){N=e.currentTarget,u()}function a(){s()}function d(n){n.target===e||t(n.target,"#"+e.getAttribute("id"))||s()}function l(e){27===e.keyCode&&s()}function v(){M.forEach(function(e){return e.addEventListener("click",f)})}function m(){o(S,e).forEach(function(e){return e.addEventListener("click",a)})}function h(){document.addEventListener("click",d)}function y(){document.addEventListener("keydown",l)}function p(){M.forEach(function(e){return e.removeEventListener("click",f)})}function E(){o(S,e).forEach(function(e){return e.removeEventListener("click",a)})}function b(){document.removeEventListener("click",d)}function L(){document.removeEventListener("keydown",l)}function g(){c(),p(),L(),b(),E(),e.classList.remove(q),e.classList.remove(j),e.style.visibility="",N=null}function k(){e&&(r(),v(),e.classList.add(j),n(function(){return z.emit("init")}))}function A(){u()}function w(e){s(e)}var x=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],O=x.closeSelector,S=void 0===O?".js-fr-offcanvas-close":O,T=x.readyClass,j=void 0===T?"fr-offcanvas--is-ready":T,C=x.activeClass,q=void 0===C?"fr-offcanvas--is-active":C;if("querySelector"in document&&"addEventListener"in window&&document.documentElement.classList){var M=o('[aria-controls="'+e.getAttribute("id")+'"]'),N=null,z=i({init:k,destroy:g,show:A,hide:w,isOpen:!1});return k(),z}}var t=function(e,t){if(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector,"function"==typeof Element.prototype.closest)return e.closest(t);for(var n=e;n&&1===n.nodeType;){if(n.matches(t))return e;n=n.parentNode}return null},n=function(e){return"function"==typeof e&&setTimeout(e,0)},i=function(){function e(e,t){o[e]=o[e]||[],o[e].push(t)}function t(e){var t=!(arguments.length<=1||void 0===arguments[1])&&arguments[1],n=o[e];t?n.splice(n.indexOf(t),1):delete o[e]}function n(e){for(var t=this,n=arguments.length,i=Array(n>1?n-1:0),r=1;r<n;r++)i[r-1]=arguments[r];var c=o[e];c&&c.forEach(function(e){return e.apply(t,i)})}var i=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],o={};return Object.assign(i,{on:e,off:t,emit:n})},o=function(e){var t=arguments.length<=1||void 0===arguments[1]?document:arguments[1];return[].slice.call(t.querySelectorAll(e))};return e});
