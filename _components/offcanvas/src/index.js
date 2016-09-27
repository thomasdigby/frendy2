import { q, defer, closest, emitter } from 'frend-utils'

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
  let currentOpen = {}

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
    // unbind open click
    defer(_unbindOpenClick)
    // bind other events
    defer(_bindDocKey)
    defer(_bindDocClick)
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
    // unbind other events
    _unbindDocKey()
    _unbindDocClick()
    _unbindCloseClick()
    _bindOpenClick()
    // add active class
    el.classList.remove(activeClass)
    // emit event
    wrappedEmitter.emit('hide')
    if (currentOpen) currentOpen.focus()
  }

  // events
  function _handleOpenClick(e) {
    currentOpen = e.currentTarget
    _showPanel()
  }
  function _handleCloseClick() {
    _hidePanel()
  }
  function _handleDocClick(e) {
    //  check if target is panel or child of
    if (
      e.target !== el &&
      !closest(e.target, `#${el.getAttribute('id')}`)
    ) _hidePanel()
  }
  function _handleDocKey(e) {
    if (e.keyCode === 27) _hidePanel()
  }

  // bindings
  function _bindOpenClick() {
    openButtons.forEach(button => button.addEventListener('click', _handleOpenClick))
  }
  function _bindCloseClick() {
    q(closeSelector, el).forEach(button => button.addEventListener('click', _handleCloseClick))
  }
  function _bindDocClick() {
    document.addEventListener('click', _handleDocClick)
  }
  function _bindDocKey() {
    document.addEventListener('keydown', _handleDocKey)
  }

  function _unbindOpenClick() {
    openButtons.forEach(button => button.removeEventListener('click', _handleOpenClick))
  }
  function _unbindCloseClick() {
    q(closeSelector, el).forEach(button => button.removeEventListener('click', _handleCloseClick))
  }
  function _unbindDocClick() {
    document.removeEventListener('click', _handleDocClick)
  }
  function _unbindDocKey() {
    document.removeEventListener('keydown', _handleDocKey)
  }

  function destroy() {
    // undo init() work and any extras
    _removeA11y()
    _unbindOpenClick()
    _unbindDocKey()
    _unbindDocClick()
    _unbindCloseClick()
    el.classList.remove(activeClass)
    el.classList.remove(readyClass)
    el.style.visibility = ''
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
