import { q, defer, emitter } from 'frend-utils'

export default function frtoggle(el, {
    contentSelector: contentSelector = '.js-fr-toggle-content',
    buttonSelector: buttonSelector = '.js-fr-toggle-button',
    toggleId: toggleId = 'toggle',
    readyClass: readyClass = 'is-ready'
  } = {}) {

  // supports
  if (
    !('querySelector' in document) ||
    !('addEventListener' in window) ||
    !document.documentElement.classList
  ) return

  // exists
  if (!el) return

  const button = q(buttonSelector, el)[0]
  const content = q(contentSelector, el)[0]

  // wrap function in event emitter
  const wrappedEmitter = emitter({
    init,
    destroy,
    show,
    hide,
    isOpen: false
  })

  // run component and return to callee
  init()
  return wrappedEmitter

  // a11y
  function _addA11y() {
    button.setAttribute('aria-expanded', 'false')
    button.setAttribute('aria-controls', toggleId)
    content.setAttribute('id', toggleId)
    content.setAttribute('aria-hidden', 'true')
    content.setAttribute('aria-labelledby', toggleId)
  }
  function _removeA11y() {
    button.removeAttribute('aria-expanded')
    button.removeAttribute('aria-controls')
    content.removeAttribute('id')
    content.removeAttribute('aria-hidden')
    content.removeAttribute('aria-labelledby')
  }

  // actions
  function _toggleContent(isOpen) {
    button.setAttribute('aria-expanded', isOpen ? 'false' : 'true')
    content.setAttribute('aria-hidden', isOpen ? 'true' : 'false')
    // emit toggle event
    wrappedEmitter.isOpen = !isOpen
    wrappedEmitter.emit('toggle')
  }

  // events
  function _handleButtonClick() {
    _toggleContent(button.getAttribute('aria-expanded') === 'true')
  }

  // bindings
  function _bindButtonClick() {
    button.addEventListener('click', _handleButtonClick)
  }
  function _unbindButtonClick() {
    button.removeEventListener('click', _handleButtonClick)
  }

  // public
  function destroy() {
    // undo init() work and any extras
    _removeA11y()
    _unbindButtonClick()
    // remove any classes that might have been added
    el.classList.remove(readyClass)
    // emit destroy event
    wrappedEmitter.emit('destroy')
  }
  function init() {
    // add a11y attributes and bind initial events
    _addA11y()
    _bindButtonClick()
    // add class when ready
    el.classList.add(readyClass)
    // emit init event
    defer(() => wrappedEmitter.emit('init'))
  }
  function show() {
    _toggleContent(false)
  }
  function hide() {
    _toggleContent(true)
  }
}
