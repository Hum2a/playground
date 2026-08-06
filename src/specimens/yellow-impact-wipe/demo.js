/**
 * Yellow Impact Wipe — saturated yellow plane cuts across to exchange states.
 * iframe-safe; no storage / parent / network.
 */

const WIPE_IN_MS = 320
const WIPE_OUT_MS = 280

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-yiw]')
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
  const el = document.querySelector('[data-yiw-live]')
  if (el) el.textContent = text
}

function setButton(on) {
  const btn = document.querySelector('[data-yiw-run]')
  if (btn) btn.disabled = !on
}

function showB() {
  const a = document.querySelector('[data-yiw-a]')
  const b = document.querySelector('[data-yiw-b]')
  if (a) a.hidden = true
  if (b) b.hidden = false
}

function resetVisual() {
  const a = document.querySelector('[data-yiw-a]')
  const b = document.querySelector('[data-yiw-b]')
  if (a) a.hidden = false
  if (b) b.hidden = true
  setLive('Scene A active.')
}

export function resetYellowImpactWipe() {
  clearTimers()
  busy = false
  resetVisual()
  rootEl()?.setAttribute('data-phase', 'idle')
  setButton(true)
}

export function runYellowImpactWipe() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'done') return

  busy = true
  clearTimers()
  resetVisual()
  setButton(false)
  root.setAttribute('data-phase', 'idle')
  void root.offsetWidth

  if (prefersReducedMotion()) {
    showB()
    root.setAttribute('data-phase', 'done')
    setLive('Scene B active.')
    busy = false
    setButton(true)
    return
  }

  root.setAttribute('data-phase', 'wipe-in')
  setLive('Yellow impact wiping in.')

  later(WIPE_IN_MS, () => {
    showB()
    root.setAttribute('data-phase', 'wipe-out')
    setLive('Yellow impact wiping out.')
    later(WIPE_OUT_MS, () => {
      root.setAttribute('data-phase', 'done')
      setLive('Scene B active.')
      busy = false
      setButton(true)
    })
  })
}

function bindUi() {
  document.querySelector('[data-yiw-run]')?.addEventListener('click', () => {
    runYellowImpactWipe()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetYellowImpactWipe()
  })
}

bindUi()
resetYellowImpactWipe()
