import { q, defer, emitter } from 'frend-utils'

export default function froffcanvas(el, {
    openSelector: openSelector = '.js-fr-offcanvas-open',
    closeSelector: closeSelector = '.js-fr-offcanvas-close',
    readyClass: readyClass = 'fr-offcanvas--is-ready',
    activeClass: activeClass = 'fr-offcanvas--is-active'
  } = {}) {

  // supports
  if (
    !('querySelector' in document) ||
    !('addEventListener' in window) ||
    !document.documentElement.classList
  ) return

  const openButtons = q(`[aria-controls="${el.getAttribute('id')}"]`)

  // wrap function in event emitter
  const wrappedEmitter = emitter({
    init,
    destroy
  })

  // run component and return to callee
  init()
  return wrappedEmitter

  // a11y
  function _addA11y() {
    el.setAttribute('aria-hidden', true)
  }
  function _removeA11y() {
    el.removeAttribute('aria-hidden', true)
  }

  // actions
  function _showPanel() {
    // set visibility to override any previous set style
    el.style.visibility = 'visible'
    // remove aria-hidden, add focus
    el.setAttribute('aria-hidden', false)
    el.setAttribute('tabindex', -1)
    el.focus()
    // bind necessary events
    defer(_bindCloseClick)
    // reset scroll position
    el.scrollTop = 0
    // add active class
    el.classList.add(activeClass)
    // emit event
    wrappedEmitter.emit('show')
  }
  function _hidePanel() {
    // set visibility to override any previous set style
    el.style.visibility = 'hidden'
    // remove aria-hidden, add focus
    el.setAttribute('aria-hidden', true)
    el.removeAttribute('tabindex')
    el.blur()
    // add active class
    el.classList.remove(activeClass)
    // emit event
    wrappedEmitter.emit('hide')
  }

  // events
  function _handleOpenClick() {
    _showPanel()
  }
  function _handleCloseClick() {
    _hidePanel()
  }

  // bindings
  function _bindOpenClick() {
    openButtons.forEach(button => button.addEventListener('click', _handleOpenClick))
  }
  function _bindCloseClick() {
    q(closeSelector, el).forEach(button => button.addEventListener('click', _handleCloseClick))
  }
  function _unbindOpenClick() {
    openButtons.forEach(button => button.removeEventListener('click', _handleOpenClick))
  }

  function destroy() {
    // undo init() work and any extras
    _removeA11y()
    _unbindOpenClick()
    el.classList.remove(readyClass)
  }
  function init() {
    // detect existence of element on page
    if (!el) return
    // add a11y attributes and bind open button
    _addA11y()
    _bindOpenClick()
    // add class when ready
    el.classList.add(readyClass)
    // emit event
    defer(() => wrappedEmitter.emit('init'))
  }
}
