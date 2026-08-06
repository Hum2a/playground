/**
 * Static Portal Materialise — noise condenses into a clean panel.
 * iframe-safe; no storage / parent / network.
 */

const CONDENSE_MS = 760

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-spm]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function setLive(text) {
  const el = document.querySelector('[data-spm-live]')
  if (el) el.textContent = text
}

function setButtons(on) {
  const btn = document.querySelector('[data-spm-run]')
  if (btn) btn.disabled = !on
}

function showPanel() {
  const panel = document.querySelector('[data-spm-panel]')
  if (panel) panel.hidden = false
}

function resetVisual() {
  const panel = document.querySelector('[data-spm-panel]')
  if (panel) panel.hidden = true
  setLive('Static field idle.')
}

export function resetStaticPortalMaterialise() {
  clearTimers()
  busy = false
  resetVisual()
  rootEl()?.setAttribute('data-phase', 'idle')
  setButtons(true)
}

export function runStaticPortalMaterialise() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'done') return

  busy = true
  clearTimers()
  resetVisual()
  setButtons(false)
  root.setAttribute('data-phase', 'idle')
  void root.offsetWidth

  if (prefersReducedMotion()) {
    showPanel()
    root.setAttribute('data-phase', 'done')
    setLive('Portal panel ready.')
    busy = false
    setButtons(true)
    return
  }

  showPanel()
  root.setAttribute('data-phase', 'condense')
  setLive('Static condensing.')

  later(CONDENSE_MS, () => {
    root.setAttribute('data-phase', 'done')
    setLive('Portal panel ready.')
    busy = false
    setButtons(true)
  })
}

function bindUi() {
  document.querySelector('[data-spm-run]')?.addEventListener('click', () => {
    runStaticPortalMaterialise()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetStaticPortalMaterialise()
  })
}

bindUi()
resetStaticPortalMaterialise()
