import { q, defer, emitter } from 'frend-utils'

export default function frdialogmodal(el, {
    closeSelector: closeSelector = '.js-fr-dialogmodal-close',
    modalSelector: modalSelector = '.js-fr-dialogmodal-modal',
    isAlert: isAlert = false,
    readyClass: readyClass = 'fr-dialogmodal--is-ready',
    activeClass: activeClass = 'fr-dialogmodal--is-active'
  } = {}) {

  // supports
  if (
    !('querySelector' in document) ||
    !('addEventListener' in window) ||
    !document.documentElement.classList
  ) return

  // exists
  if (!el) return


  const focusableSelectors = [
    '[contenteditable]',
    '[tabindex]:not([tabindex^="-"])',
    'a[href]',
    'area[href]',
    'button:not([disabled])',
    'embed',
    'iframe',
    'input:not([disabled])',
    'object',
    'select:not([disabled])',
    'textarea:not([disabled])'
  ]
  let focusableElements = null
  let currentOpenButton = null
  const id = el.getAttribute('id')
  const openButtons = q(`[aria-controls=${id}]`)
  const closeButton = q(closeSelector, el)[0]
  const modal = q(modalSelector, el)[0]

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
    // toggle dialog role, alertdialog shouldnt allow accidental closing
    const role = isAlert ? 'alertdialog' : 'dialog'
    // add relevant attributes
    el.setAttribute('aria-hidden', true)
    modal.setAttribute('role', role)
  }
  function _removeA11y() {
    // remove unnecessary attributes
    el.removeAttribute('aria-hidden')
    modal.removeAttribute('role')
  }

  // actions
  function _showModal() {
    // reset scroll position
    modal.scrollTop = 0
    // show container, add focusability of modal
    el.setAttribute('aria-hidden', false)
    modal.setAttribute('tabindex', -1)
    el.classList.add(activeClass)
    // save reference to focusable elements within modal
    focusableElements = q(focusableSelectors.join(), modal)
    // focus first element or modal
    if (focusableElements.length) focusableElements[0].focus()
    else modal.focus()
    // bind close events, deferred to prevent them firing too soon
    defer(_bindDocumentKeydown)
    defer(_bindCloseClick)
    // prevent click off modal to close
    if (!isAlert) defer(_bindContainerClick)
    // update dynamic values and emit show event
    wrappedEmitter.isOpen = true
    wrappedEmitter.emit('show')
  }
  function _hideModal(elToFocus = currentOpenButton) {
    // hide container, remove focusability of modal
    el.setAttribute('aria-hidden', true)
    modal.removeAttribute('tabindex')
    el.classList.remove(activeClass)
    // unbind events from showModal
    _unbindDocumentKeydown()
    _unbindCloseClick()
    _unbindContainerClick()
    // if focusable element available, focus it
    if (elToFocus) elToFocus.focus()
    // remove reference to currentOpenButton, no longer needed
    if (currentOpenButton) currentOpenButton = null
    // update dynamic values and emit hide event
    wrappedEmitter.isOpen = false
    wrappedEmitter.emit('hide')
  }

  // events
  function _handleOpenClick(e) {
    // save current open button to reference on hideModal
    currentOpenButton = e.currentTarget
    _showModal()
  }
  function _handleCloseClick() {
    _hideModal()
  }
  function _handleDocumentKeydown(e) {
    // esc key
    if (e.keyCode === 27) _hideModal()
    // tab key
    if (e.keyCode === 9) _handleTabKey(e)
  }
  function _handleContainerClick(e) {
    // if clicked element is the container, hideModal
    // not e.currentTarget as any click within the modal will bubble up
    if (e.target === el) _hideModal()
  }
  function _handleTabKey(e) {
    // get index of active element within focusable elements
    const index = focusableElements.indexOf(document.activeElement)
    // detect is active element is first/last within focusable elements
    const elIsFirst = index === 0 || index === -1
    const elIsLast = index === focusableElements.length - 1
    // if first element is focused and shiftKey is in use
    if (elIsFirst && e.shiftKey) {
      // focus last item in modal
      focusableElements[focusableElements.length - 1].focus()
      e.preventDefault()
    // if last element is focused and shiftKey is not in use
    } else if (elIsLast && !e.shiftKey) {
      // focus first item in modal
      focusableElements[0].focus()
      e.preventDefault()
    }
  }

  // bindings
  function _bindOpenClick() {
    openButtons.forEach(button => button.addEventListener('click', _handleOpenClick))
  }
  function _bindCloseClick() {
    closeButton.addEventListener('click', _handleCloseClick)
  }
  function _bindContainerClick() {
    el.addEventListener('click', _handleContainerClick)
  }
  function _bindDocumentKeydown() {
    document.addEventListener('keydown', _handleDocumentKeydown)
  }

  // unbindings
  function _unbindOpenClick() {
    openButtons.forEach(button => button.removeEventListener('click', _handleOpenClick))
  }
  function _unbindCloseClick() {
    closeButton.removeEventListener('click', _handleCloseClick)
  }
  function _unbindContainerClick() {
    el.removeEventListener('click', _handleContainerClick)
  }
  function _unbindDocumentKeydown() {
    document.removeEventListener('keydown', _handleDocumentKeydown)
  }

  // public
  function destroy() {
    // undo init() work and any extras
    _removeA11y()
    _unbindOpenClick()
    _unbindCloseClick()
    _unbindContainerClick()
    _unbindDocumentKeydown()
    // remove any classes that might have been added
    el.classList.remove(readyClass)
    el.classList.remove(activeClass)
    // emit destroy event
    wrappedEmitter.emit('destroy')
  }
  function init() {
    // add a11y attributes and bind initial events
    _addA11y()
    _bindOpenClick()
    // add class when ready
    el.classList.add(readyClass)
    // emit init event
    defer(() => wrappedEmitter.emit('init'))
  }
  function show() {
    _showModal()
  }
  function hide(elToFocus) {
    // el required to focus on hide
    _hideModal(elToFocus)
  }
}
