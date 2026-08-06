/**
 * Panel-to-Panel Route — selected comic panel grows into the next content state.
 */

const PRIMARY_MS = 740
const TOTAL_MS = 1390

let busy = false
let selected = 1
let timer = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-panel-to-panel-route]')
}

function setStatus(text) {
  const el = document.querySelector('[data-ppr-status]')
  if (el) el.textContent = text
}

function panels() {
  return Array.from(document.querySelectorAll('[data-ppr-panel]'))
}

function applySelection(index) {
  selected = index
  panels().forEach((btn, i) => {
    btn.classList.toggle('ppr__panel--selected', i === index)
    btn.setAttribute('aria-pressed', i === index ? 'true' : 'false')
  })
}

export function resetPanelToPanelRoute() {
  if (timer !== null) window.clearTimeout(timer)
  busy = false
  const el = root()
  const grid = document.querySelector('[data-ppr-grid]')
  const route = document.querySelector('[data-ppr-route]')
  if (!el || !grid || !route) return
  el.classList.remove('ppr--routing', 'ppr--done')
  el.setAttribute('data-phase', 'idle')
  grid.hidden = false
  route.hidden = true
  applySelection(1)
  setStatus('Select a panel, then Route.')
}

export function runPanelToPanelRoute() {
  const el = root()
  const grid = document.querySelector('[data-ppr-grid]')
  const route = document.querySelector('[data-ppr-route]')
  if (!el || !grid || !route || busy) return Promise.resolve()
  busy = true
  el.setAttribute('data-selected', String(selected))
  el.setAttribute('data-phase', 'routing')

  if (prefersReducedMotion()) {
    el.classList.add('ppr--routing', 'ppr--done')
    grid.hidden = true
    route.hidden = false
    el.setAttribute('data-phase', 'complete')
    setStatus('Route complete — MISSION COMPLETE.')
    busy = false
    return Promise.resolve()
  }

  el.classList.add('ppr--routing')
  setStatus('Panel expanding into next state…')

  return new Promise((resolve) => {
    timer = window.setTimeout(() => {
      el.classList.add('ppr--done')
      grid.hidden = true
      route.hidden = false
      el.setAttribute('data-phase', 'complete')
      setStatus('Route complete — MISSION COMPLETE.')
      busy = false
      timer = null
      resolve()
    }, PRIMARY_MS)
  })
}

function bind() {
  panels().forEach((btn) => {
    btn.addEventListener('click', () => {
      if (busy || root()?.classList.contains('ppr--done')) return
      applySelection(Number(btn.getAttribute('data-ppr-panel') ?? '0'))
    })
  })

  document.querySelector('[data-ppr-trigger]')?.addEventListener('click', () => {
    if (root()?.classList.contains('ppr--done')) {
      resetPanelToPanelRoute()
      return
    }
    void runPanelToPanelRoute()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetPanelToPanelRoute()
    }
  })
}

bind()
applySelection(1)
