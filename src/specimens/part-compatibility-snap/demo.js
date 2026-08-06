/**
 * Part Compatibility Snap — component magnetically locks into valid slot.
 */

const MAGNET_MS = 180
const SNAP_MS = 520
const SETTLE_MS = 1100

let busy = false
let settled = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-part-snap]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  timers.push(window.setTimeout(fn, ms))
}

function setStatus(text) {
  const el = root()?.querySelector('[data-pcs-status]')
  if (!el) return
  el.textContent = ''
  void el.offsetWidth
  el.textContent = text
}

export function runPartSnap() {
  const el = root()
  if (!el || busy || settled) return Promise.resolve()

  busy = true
  clearTimers()
  const trigger = el.querySelector('[data-pcs-trigger]')
  if (trigger) trigger.disabled = true

  if (prefersReducedMotion()) {
    el.classList.add('pcs--magnet', 'pcs--snapped')
    setStatus('MODULE-3 snapped into Slot A. Compatible.')
    settled = true
    busy = false
    return Promise.resolve()
  }

  el.classList.add('pcs--magnet')

  return new Promise((resolve) => {
    later(MAGNET_MS, () => {
      setStatus('Magnetic pull toward compatible slot.')
    })
    later(SNAP_MS, () => {
      el.classList.add('pcs--snapped')
      setStatus('MODULE-3 snapped into Slot A. Compatible.')
    })
    later(SETTLE_MS, () => {
      settled = true
      busy = false
      resolve()
    })
  })
}

export function resetPartSnap() {
  const el = root()
  if (!el || busy) return Promise.resolve()

  clearTimers()
  settled = false
  busy = false
  el.classList.remove('pcs--magnet', 'pcs--snapped')

  const trigger = el.querySelector('[data-pcs-trigger]')
  if (trigger) trigger.disabled = false

  setStatus('')
  void el.offsetWidth
  return Promise.resolve()
}

export async function replayPartSnap() {
  if (busy) return
  await resetPartSnap()
  await runPartSnap()
}

function bindUi() {
  root()?.querySelector('[data-pcs-trigger]')?.addEventListener('click', () => {
    void runPartSnap()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      void replayPartSnap()
    }
  })
}

bindUi()
