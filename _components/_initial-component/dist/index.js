(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.frinitial = factory());
}(this, (function () { 'use strict';

var nodelistArray = (function (el) {
  var ctx = arguments.length <= 1 || arguments[1] === undefined ? document : arguments[1];
  return [].slice.call(ctx.querySelectorAll(el));
});

function frinitial() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref$selector = _ref.selector;
  var selector = _ref$selector === undefined ? '' : _ref$selector;
  var _ref$readyClass = _ref.readyClass;
  var readyClass = _ref$readyClass === undefined ? '' : _ref$readyClass;

  // supports
  if (!('querySelector' in document) || !('addEventListener' in window) || !document.documentElement.classList) return;
  // element
  var el = nodelistArray(selector)[0];
  // public functions
  function destroy() {
    el.classList.remove(readyClass);
  }
  function init() {
    console.log(el);
    if (!el.length) return;
    el.classList.add(readyClass);
  }
  init();
  // expose public functions
  return { init: init, destroy: destroy };
}

return frinitial;

})));
