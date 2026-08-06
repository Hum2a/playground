/**
 * Torn Edge Drawer — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

const OPEN_MS = 520
const CLOSE_MS = 360

let busy = false
let open = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function root() {
  return document.querySelector('[data-torn-drawer]')
}

function clearTimers() {
  timers.forEach((id) => window.clearTimeout(id))
  timers = []
}

function later(fn, ms) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
  return id
}

function setExpanded(expanded) {
  const btn = document.querySelector('[data-td-open]')
  btn?.setAttribute('aria-expanded', expanded ? 'true' : 'false')
}

function setPanelHidden(hidden) {
  const panel = document.querySelector('[data-td-panel]')
  if (!panel) return
  if (hidden) panel.setAttribute('hidden', '')
  else panel.removeAttribute('hidden')
}

function resetClosed() {
  const el = root()
  if (!el) return
  clearTimers()
  busy = false
  open = false
  el.classList.remove('torn-drawer--open', 'torn-drawer--closing', 'torn-drawer--settled')
  setExpanded(false)
  setPanelHidden(true)
}

/**
 * Open the torn-edge drawer.
 * @returns {Promise<void>}
 */
export function openTornDrawer() {
  const el = root()
  if (!el || busy || open) return Promise.resolve()

  busy = true
  clearTimers()
  el.classList.remove('torn-drawer--closing', 'torn-drawer--settled')
  setPanelHidden(false)
  void el.offsetWidth
  el.classList.add('torn-drawer--open')
  setExpanded(true)
  open = true

  if (prefersReducedMotion()) {
    el.classList.add('torn-drawer--settled')
    busy = false
    document.querySelector('[data-td-close]')?.focus({ preventScroll: true })
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    later(() => {
      el.classList.add('torn-drawer--settled')
      busy = false
      document.querySelector('[data-td-close]')?.focus({ preventScroll: true })
      resolve()
    }, OPEN_MS)
  })
}

/**
 * Close the torn-edge drawer.
 * @returns {Promise<void>}
 */
export function closeTornDrawer() {
  const el = root()
  if (!el || busy || !open) return Promise.resolve()

  busy = true
  clearTimers()
  el.classList.remove('torn-drawer--settled')

  if (prefersReducedMotion()) {
    resetClosed()
    document.querySelector('[data-td-open]')?.focus({ preventScroll: true })
    return Promise.resolve()
  }

  el.classList.add('torn-drawer--closing')
  el.classList.remove('torn-drawer--open')

  return new Promise((resolve) => {
    later(() => {
      el.classList.remove('torn-drawer--closing')
      open = false
      busy = false
      setExpanded(false)
      setPanelHidden(true)
      document.querySelector('[data-td-open]')?.focus({ preventScroll: true })
      resolve()
    }, CLOSE_MS)
  })
}

function bind() {
  document.querySelector('[data-td-open]')?.addEventListener('click', () => {
    void openTornDrawer()
  })
  document.querySelector('[data-td-close]')?.addEventListener('click', () => {
    void closeTornDrawer()
  })
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && open) {
      event.preventDefault()
      void closeTornDrawer()
    }
  })
}

window.addEventListener('message', (event) => {
  const data = event.data
  if (!data || typeof data !== 'object') return
  if (data.type === 'restart') resetClosed()
})

bind()
