!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.froffcanvas=e()}(this,function(){"use strict";function t(){function t(t,e){return i[t]=i[t]||[],i[t].push(e),this}function e(t){for(var e=this,n=arguments.length,o=Array(n>1?n-1:0),r=1;r<n;r++)o[r-1]=arguments[r];var c=i[t];if(c)return c.forEach(function(t){return t.apply(e,o)}),this}var n=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],i={};return Object.assign(n,{on:t,emit:e})}function e(e){function o(){e.setAttribute("aria-hidden",!0)}function r(){e.removeAttribute("aria-hidden",!0)}function c(){e.style.visibility="visible",e.setAttribute("aria-hidden",!1),e.setAttribute("tabindex",-1),e.focus(),n(d),e.scrollTop=0,e.classList.add(L),x.emit("show")}function s(){e.style.visibility="hidden",e.setAttribute("aria-hidden",!0),e.removeAttribute("tabindex"),e.blur(),e.classList.remove(L),x.emit("hide")}function u(){c()}function f(){s()}function a(){g.forEach(function(t){return t.addEventListener("click",u)})}function d(){i(y,e).forEach(function(t){return t.addEventListener("click",f)})}function l(){g.forEach(function(t){return t.removeEventListener("click",u)})}function v(){r(),l(),e.classList.remove(A)}function h(){e&&(o(),a(),e.classList.add(A),n(function(){return x.emit("init")}))}var m=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],b=(m.openSelector,m.closeSelector),y=void 0===b?".js-fr-offcanvas-close":b,p=m.readyClass,A=void 0===p?"fr-offcanvas--is-ready":p,E=m.activeClass,L=void 0===E?"fr-offcanvas--is-active":E;if("querySelector"in document&&"addEventListener"in window&&document.documentElement.classList){var g=i('[aria-controls="'+e.getAttribute("id")+'"]'),x=t({init:h,destroy:v});return h(),x}}var n=function(t){"function"==typeof t&&setTimeout(t,0)},i=function(t){var e=arguments.length<=1||void 0===arguments[1]?document:arguments[1];return[].slice.call(e.querySelectorAll(t))};return e});