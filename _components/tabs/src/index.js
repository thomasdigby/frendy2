import { q, closest, defer, emitter } from 'frend-utils'

export default function frtabs(el, {
    listSelector: listSelector = '.js-fr-tabs__tablist',
    panelSelector: panelSelector = '.js-fr-tabs__panel',
    readyClass: readyClass = 'is-ready'
  } = {}) {

  // supports
  if (
    !('querySelector' in document) ||
    !('addEventListener' in window) ||
    !document.documentElement.classList
  ) return

  const lists = q(listSelector, el)
  const listItems = q(`${listSelector} li`, el)
  const listLinks = q(`${listSelector} a`, el)
  const panels = q(panelSelector, el)

  // wrap function in event emitter
  const wrappedEmitter = emitter({
    init,
    destroy,
    goToTab,
    activeTab: 0
  })

  // run component and return to callee
  init()
  return wrappedEmitter

  // a11y
  function _addA11y() {
    lists.forEach(item => {
      item.setAttribute('role', 'tablist')
    })
    listItems.forEach(item => {
      item.setAttribute('role', 'presentation')
    })
    listLinks.forEach(item => {
      item.setAttribute('role', 'tab')
      item.setAttribute('aria-controls', item.hash.substring(1))
    })
    panels.forEach((item, i) => {
      item.setAttribute('role', 'tabpanel')
      item.setAttribute('aria-labelledby', listLinks[i].id)
      item.setAttribute('tabindex', 0)
    })
  }
  function _removeA11y() {
    lists.forEach(item => {
      item.removeAttribute('role')
    })
    listItems.forEach(item => {
      item.removeAttribute('role')
    })
    listLinks.forEach(item => {
      item.removeAttribute('role')
      item.removeAttribute('aria-controls')
      item.removeAttribute('aria-selected')
      item.removeAttribute('tabindex')
    })
    panels.forEach(item => {
      item.removeAttribute('role')
      item.removeAttribute('aria-labelledby')
      item.removeAttribute('aria-hidden')
      item.removeAttribute('tabindex')
    })
  }

  // actions
  function _showTab(target, focus = true) {
    listLinks.forEach(item => {
      item.setAttribute('tabindex', -1)
      item.removeAttribute('aria-selected')
    })
    panels.forEach(item => {
      item.setAttribute('aria-hidden', 'true')
    })
    target.setAttribute('tabindex', 0)
    target.setAttribute('aria-selected', 'true')
    if (focus) target.focus()
    document.getElementById(target.getAttribute('aria-controls')).removeAttribute('aria-hidden')
    wrappedEmitter.activeTab = listLinks.indexOf(target)
    wrappedEmitter.emit('tab')
  }

  // events
  function _handleLinkClick(e) {
    _showTab(e.currentTarget)
    e.preventDefault()
  }
  function _handleLinkKeydown(e) {
    // don't catch key events when ⌘ or Alt modifier is present
    if (e.metaKey || e.altKey) return
    const current = e.currentTarget
    const currentList = closest(current, listSelector)
    let targetLink = {}
    // catch left/right and up/down arrow key events
    // if new next/prev tab available, show it by passing tab anchor to _showTab method
    switch (e.keyCode) {
      case 37:
      case 38:
        targetLink = current.parentNode.previousElementSibling || currentList.lastElementChild
        break
      case 39:
      case 40:
        targetLink = current.parentNode.nextElementSibling || currentList.firstElementChild
        break
      default:
        return
    }
    _showTab(q('[role="tab"]', targetLink)[0])
    e.preventDefault()
  }

  // bindings
  function _bindTabEvents() {
    listLinks.forEach(item => {
      item.addEventListener('click', _handleLinkClick)
      item.addEventListener('keydown', _handleLinkKeydown)
    })
  }

  // unbindings
  function _unbindTabEvents() {
    listLinks.forEach(item => {
      item.removeEventListener('click', _handleLinkClick)
      item.removeEventListener('keydown', _handleLinkKeydown)
    })
  }

  // public
  function destroy() {
    // undo init() work and any extras
    _removeA11y()
    _unbindTabEvents()
  }
  function init() {
    // detect existence of element on page
    if (!el) return
    // add a11y attributes and bind open button
    _addA11y()
    _bindTabEvents()
    _showTab(listLinks[0])
    // add class when ready
    el.classList.add(readyClass)
    // emit event
    defer(() => wrappedEmitter.emit('init'))
  }
  function goToTab(i) {
    _showTab(listLinks[i])
  }
}
