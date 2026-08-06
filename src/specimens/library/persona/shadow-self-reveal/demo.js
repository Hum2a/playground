/**
 * Shadow Self Reveal — polished profile fractures to expose shadow state.
 * iframe-safe; no storage / parent / network.
 */

const FRACTURE_MS = 520

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-ssr]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function setPhase(phase) {
  rootEl()?.setAttribute('data-phase', phase)
}

function setLive(text) {
  const el = document.querySelector('[data-ssr-live]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-ssr-run], [data-ssr-reset]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showShadow() {
  setPhase('done')
  const shadow = document.querySelector('[data-ssr-shadow]')
  if (shadow) shadow.setAttribute('aria-hidden', 'false')
  setLive('Shadow state revealed. DENIED SIGNAL visible.')
}

function resetVisual() {
  setPhase('polished')
  const shadow = document.querySelector('[data-ssr-shadow]')
  if (shadow) shadow.setAttribute('aria-hidden', 'true')
  setLive('Polished profile visible.')
}

export function runShadowSelfReveal() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  busy = true
  clearTimers()
  resetVisual()
  setButtons(false)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    showShadow()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  setPhase('fracture')
  setLive('Profile fracturing.')

  return new Promise((resolve) => {
    later(FRACTURE_MS, () => {
      showShadow()
      busy = false
      setButtons(true)
      resolve()
    })
  })
}

export function resetShadowSelfReveal() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
}

function bindUi() {
  document.querySelector('[data-ssr-run]')?.addEventListener('click', () => {
    void runShadowSelfReveal()
  })
  document.querySelector('[data-ssr-reset]')?.addEventListener('click', resetShadowSelfReveal)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetShadowSelfReveal()
  })
}

bindUi()
resetShadowSelfReveal()
