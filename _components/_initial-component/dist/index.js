(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.frinitial = factory());
}(this, (function () { 'use strict';

var defer = (function (fn) {
  //  defers invoking the function until the current call stack has cleared
  if (typeof fn === 'function') setTimeout(fn, 0);
});

function emitter() {
  var object = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var events = {};

  function on(name, handler) {
    events[name] = events[name] || [];
    events[name].push(handler);
    // console.log(events);
    return this;
  }

  function emit(name) {
    var _this = this;

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    // console.log(events);
    var evt = events[name];
    if (!evt) {
      return;
    }
    evt.forEach(function (handler) {
      handler.apply(_this, args);
    });
    return this;
  }

  return Object.assign(object, {
    on: on,
    emit: emit
  });
}

function frinitial(el) {
  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var _ref$readyClass = _ref.readyClass;
  var readyClass = _ref$readyClass === undefined ? '' : _ref$readyClass;

  // supports
  if (!('querySelector' in document) || !('addEventListener' in window) || !document.documentElement.classList) return;
  var wrappedEmitter = {};
  // public functions
  function destroy() {
    el.classList.remove(readyClass);
  }
  function init() {
    if (!el) return;
    el.classList.add(readyClass);
    defer(function () {
      return wrappedEmitter.emit('test');
    });
  }
  wrappedEmitter = emitter({
    init: init,
    destroy: destroy
  });
  init();
  // expose public functions
  return wrappedEmitter;
}

return frinitial;

})));
