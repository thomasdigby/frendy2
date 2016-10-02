import { q, defer, emitter } from 'frend-utils'

export default function frbypasslinks(el, {
    readyClass: readyClass = 'is-ready'
  } = {}) {

  // supports
  if (
    !('querySelector' in document) ||
    !('addEventListener' in window)
  ) return

  // exists
  if (!el) return

  const links = q('a', el)
  let currTarget = null

  // wrap function in event emitter
  const wrappedEmitter = emitter({
    init,
    destroy
  })

  // run component and return to callee
  init()
  return wrappedEmitter

  // actions
  function _addFocusability() {
    links.forEach(item => {
      // get target element
      const id = item.getAttribute('href').slice(1)
      const target = document.getElementById(id)
      // set tabindex to allow focus
      if (target) target.setAttribute('tabindex', -1)
    })
  }
  function _removeFocusability() {
    links.forEach(item => {
      // get target element
      const id = item.getAttribute('href').slice(1)
      const target = document.getElementById(id)
      // set tabindex to allow focus
      if (target) target.removeAttribute('tabindex')
    })
  }

  // events
  function _handleLinkClick(e) {
    // get target element
    const id = e.target.getAttribute('href').slice(1)
    const target = document.getElementById(id)
    // detect element in DOM
    if (!target) return
    // focus target
    target.setAttribute('tabindex', -1)
    target.focus()
    // save reference
    currTarget = target
    // bind blur event
    _bindTargetBlur(target)
    // emit skip event
    wrappedEmitter.emit('skip')
  }
  function _handleTargetBlur(e) {
    // remove focusability, stops users highlighting element on click
    e.target.removeAttribute('tabindex')
    // remove reference
    currTarget = null
    // unbind blur event
    _unbindTargetBlur(e.target)
  }

  // bindings
  function _bindLinkClick() {
    links.forEach(item => item.addEventListener('click', _handleLinkClick))
  }
  function _bindTargetBlur(item) {
    item.addEventListener('blur', _handleTargetBlur)
  }

  // unbindings?
  function _unbindLinkClick() {
    links.forEach(item => item.removeEventListener('click', _handleLinkClick))
  }
  function _unbindTargetBlur(item) {
    item.removeEventListener('blur', _handleTargetBlur)
  }

  // public
  function destroy() {
    // undo init() work and any extras
    _unbindLinkClick()
    _unbindTargetBlur()
    _addFocusability()
    // remove any classes that might have been added
    el.classList.remove(readyClass)
    // emit destroy event
    wrappedEmitter.emit('destroy')
  }
  function init() {
    // add a11y attributes and bind initial events
    _bindLinkClick()
    _removeFocusability()
    // add class when ready
    el.classList.add(readyClass)
    // emit init event
    defer(() => wrappedEmitter.emit('init'))
  }
}
