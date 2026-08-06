/**
 * Emergency Screen Takeover — diagonal warning planes interrupt calm UI.
 */

const PLANE_MS = 420
const SETTLE_MS = 1070

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
  return document.querySelector('[data-emergency-takeover]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  timers.push(window.setTimeout(fn, ms))
}

function setStatus(text) {
  const el = root()?.querySelector('[data-est-status]')
  if (!el) return
  el.textContent = ''
  void el.offsetWidth
  el.textContent = text
}

export function runEmergencyTakeover() {
  const el = root()
  if (!el || busy || settled) return Promise.resolve()

  busy = true
  clearTimers()
  const trigger = el.querySelector('[data-est-trigger]')
  const overlay = el.querySelector('[data-est-overlay]')
  if (trigger) trigger.disabled = true

  if (overlay) {
    overlay.removeAttribute('hidden')
    overlay.removeAttribute('aria-hidden')
  }

  el.classList.add('est--alert')

  const settleDelay = prefersReducedMotion() ? 0 : SETTLE_MS

  return new Promise((resolve) => {
    later(prefersReducedMotion() ? 0 : PLANE_MS, () => {
      setStatus('Emergency screen takeover active. Threat level elevated.')
    })
    later(settleDelay, () => {
      settled = true
      busy = false
      resolve()
    })
  })
}

export function resetEmergencyTakeover() {
  const el = root()
  if (!el || busy) return Promise.resolve()

  clearTimers()
  settled = false
  busy = false
  el.classList.remove('est--alert')

  const trigger = el.querySelector('[data-est-trigger]')
  const overlay = el.querySelector('[data-est-overlay]')
  if (trigger) trigger.disabled = false
  if (overlay) {
    overlay.setAttribute('hidden', '')
    overlay.setAttribute('aria-hidden', 'true')
  }

  setStatus('')
  void el.offsetWidth
  return Promise.resolve()
}

export async function replayEmergencyTakeover() {
  if (busy) return
  await resetEmergencyTakeover()
  await runEmergencyTakeover()
}

function bindUi() {
  root()?.querySelector('[data-est-trigger]')?.addEventListener('click', () => {
    void runEmergencyTakeover()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      void replayEmergencyTakeover()
    }
  })
}

bindUi()
