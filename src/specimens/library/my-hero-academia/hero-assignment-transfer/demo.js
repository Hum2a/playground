/**
 * Hero Assignment Transfer — chip travels from roster to incident slot.
 */

const TRANSFER_MS = 740
const SETTLE_MS = 1390

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
  return document.querySelector('[data-hero-assignment]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  timers.push(window.setTimeout(fn, ms))
}

function setStatus(text) {
  const el = root()?.querySelector('[data-hat-status]')
  if (!el) return
  el.textContent = ''
  void el.offsetWidth
  el.textContent = text
}

export function runHeroAssignment() {
  const el = root()
  if (!el || busy || settled) return Promise.resolve()

  busy = true
  clearTimers()
  const trigger = el.querySelector('[data-hat-trigger]')
  if (trigger) trigger.disabled = true

  el.classList.add('hat--assign')

  const transferDelay = prefersReducedMotion() ? 0 : TRANSFER_MS
  const settleDelay = prefersReducedMotion() ? 0 : SETTLE_MS

  return new Promise((resolve) => {
    later(transferDelay, () => {
      el.classList.add('hat--settled')
      setStatus('UNIT-12 assigned to Incident 441.')
    })
    later(settleDelay, () => {
      settled = true
      busy = false
      resolve()
    })
  })
}

export function resetHeroAssignment() {
  const el = root()
  if (!el || busy) return Promise.resolve()

  clearTimers()
  settled = false
  busy = false
  el.classList.remove('hat--assign', 'hat--settled')

  const trigger = el.querySelector('[data-hat-trigger]')
  if (trigger) trigger.disabled = false

  setStatus('')
  void el.offsetWidth
  return Promise.resolve()
}

export async function replayHeroAssignment() {
  if (busy) return
  await resetHeroAssignment()
  await runHeroAssignment()
}

function bindUi() {
  root()?.querySelector('[data-hat-trigger]')?.addEventListener('click', () => {
    void runHeroAssignment()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      void replayHeroAssignment()
    }
  })
}

bindUi()
