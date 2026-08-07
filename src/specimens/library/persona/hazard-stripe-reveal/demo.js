/**
 * Hazard Stripe Reveal — diagonal warning stripes sweep away to expose content.
 * iframe-safe; no storage / parent / network.
 */

const REVEAL_MS = 620

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-hsr]')
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
  const el = document.querySelector('[data-hsr-live]')
  if (el) el.textContent = text
}

function setButton(on) {
  const btn = document.querySelector('[data-hsr-reveal]')
  if (btn) btn.disabled = !on
}

export function resetHazardStripeReveal() {
  clearTimers()
  busy = false
  rootEl()?.setAttribute('data-phase', 'covered')
  setLive('Content covered by hazard stripes.')
  setButton(true)
}

export function runHazardStripeReveal() {
  const root = rootEl()
  if (!root || busy) return

  busy = true
  clearTimers()
  root.setAttribute('data-phase', 'covered')
  void root.offsetWidth
  setButton(false)

  if (prefersReducedMotion()) {
    root.setAttribute('data-phase', 'revealed')
    setLive('Content revealed.')
    busy = false
    setButton(true)
    return
  }

  root.setAttribute('data-phase', 'reveal')
  setLive('Hazard stripes sweeping away.')

  later(REVEAL_MS, () => {
    root.setAttribute('data-phase', 'revealed')
    setLive('Content revealed.')
    busy = false
    setButton(true)
  })
}

function bindUi() {
  document.querySelector('[data-hsr-reveal]')?.addEventListener('click', () => {
    runHazardStripeReveal()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetHazardStripeReveal()
  })
}

bindUi()
resetHazardStripeReveal()
