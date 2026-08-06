/**
 * Control Centre Module Collapse — rich NETWORK surface condenses to compact summary.
 */

const COLLAPSE_MS = 300
const ROW_STAGGER_MS = 35

/** @type {boolean} */
let collapsed = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-control-module-collapse]')
}

function moduleEl() {
  return document.querySelector('[data-cmc-module]')
}

function expandedPanel() {
  return document.querySelector('[data-cmc-expanded]')
}

function compactBtn() {
  return document.querySelector('[data-cmc-compact]')
}

function statusEl() {
  return document.querySelector('[data-cmc-status]')
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function setPhase(phase) {
  root()?.setAttribute('data-phase', phase)
}

function collapse() {
  if (collapsed) return
  collapsed = true
  setPhase('collapsing')
  setStatus('Collapsing — latency retracts first, then route; CONNECTED persists.')

  const retract = (selector, delay) => {
    window.setTimeout(() => {
      document.querySelector(selector)?.classList.add('is-retracted')
    }, prefersReducedMotion() ? 0 : delay)
  }

  retract('[data-cmc-row="latency"]', 0)
  retract('[data-cmc-row="route"]', ROW_STAGGER_MS)

  const finish = () => {
    expandedPanel()?.setAttribute('hidden', '')
    compactBtn()?.removeAttribute('hidden')
    setPhase('compact')
    setStatus('Compact NETWORK // CONNECTED — values preserved.')
  }

  window.setTimeout(finish, prefersReducedMotion() ? 0 : COLLAPSE_MS)
}

export function resetControlModuleCollapse() {
  collapsed = false
  setPhase('expanded')
  expandedPanel()?.removeAttribute('hidden')
  compactBtn()?.setAttribute('hidden', '')
  document.querySelectorAll('.cmc__row').forEach((row) => {
    row.classList.remove('is-retracted')
  })
  moduleEl()?.classList.remove('is-collapsed')
  setStatus('Expanded NETWORK module — STATUS CONNECTED, ROUTE PRIMARY, LATENCY 18ms.')
}

function bindUi() {
  document.querySelector('[data-cmc-collapse]')?.addEventListener('click', collapse)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetControlModuleCollapse()
    }
  })
}

bindUi()
resetControlModuleCollapse()

export const CONTROL_MODULE_COLLAPSE_CONTRACT = {
  COLLAPSE_MS,
  ROW_STAGGER_MS,
  EXPANDED_W: 320,
  EXPANDED_H: 210,
  COMPACT_W: 142,
  COMPACT_H: 72,
}
