import { q } from 'frend-utils'

export default function frinitial({
    selector: selector = '',
    readyClass: readyClass = ''
  } = {}) {
  // supports
  if (
    !('querySelector' in document) ||
    !('addEventListener' in window) ||
    !document.documentElement.classList
  ) return
  // element
  const el = q(selector)[0]
  // public functions
  function destroy() {
    el.classList.remove(readyClass)
  }
  function init() {
    console.log(el)
    if (!el.length) return
    el.classList.add(readyClass)
  }
  init()
  // expose public functions
  return { init, destroy }
}
