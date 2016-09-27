import { defer, emitter } from 'frend-utils'


export default function frinitial(el, {
    readyClass: readyClass = ''
  } = {}) {
  // supports
  if (
    !('querySelector' in document) ||
    !('addEventListener' in window) ||
    !document.documentElement.classList
  ) return
  let wrappedEmitter = {}
  // public functions
  function destroy() {
    el.classList.remove(readyClass)
  }
  function init() {
    if (!el) return
    el.classList.add(readyClass)
    defer(() => wrappedEmitter.emit('test'))
  }
  wrappedEmitter = emitter({
    init,
    destroy
  })
  init()
  // expose public functions
  return wrappedEmitter
}
