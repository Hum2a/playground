/**
 * Panel-to-Panel Route — selected comic panel grows into the next content state.
 */

const EXPAND_MS = 740
const SETTLE_MS = 650
const TOTAL_MS = EXPAND_MS + SETTLE_MS
const SELECTED_SCALE = 1.04

const PANEL_LABELS = ['01 ANALYSIS', '02 TARGET', '03 OUTPUT']
const ROUTE_TO = 'MISSION COMPLETE'

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

function setLive(text) {
  const el = document.querySelector('[data-ppr-live]')
  if (el) el.textContent = text
}

function updateRouteLabel(fromLabel) {
  const from = document.querySelector('[data-ppr-from]')
  const to = document.querySelector('[data-ppr-to]')
  if (from) from.textContent = fromLabel
  if (to) to.textContent = ROUTE_TO
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
  const label = PANEL_LABELS[index] ?? PANEL_LABELS[1]
  updateRouteLabel(label)
  setLive(`Panel ${label} selected.`)
}

function announceRoute(fromLabel) {
  setLive(`Route changed: ${fromLabel} to ${ROUTE_TO}.`)
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
  const fromLabel = PANEL_LABELS[selected] ?? PANEL_LABELS[1]
  el.setAttribute('data-selected', String(selected))
  el.setAttribute('data-phase', 'routing')
  el.style.setProperty('--ppr-selected-scale', String(SELECTED_SCALE))
  updateRouteLabel(fromLabel)

  if (prefersReducedMotion()) {
    el.classList.add('ppr--routing', 'ppr--done')
    grid.hidden = true
    route.hidden = false
    el.setAttribute('data-phase', 'complete')
    setStatus('Route complete — MISSION COMPLETE.')
    announceRoute(fromLabel)
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
      announceRoute(fromLabel)
      busy = false
      timer = null
      resolve()
    }, EXPAND_MS)
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
