/**
 * Incident Dispatch Card — urgent card tears into calm dashboard.
 */

const SLIDE_MS = 660
const SETTLE_MS = 1310

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
  return document.querySelector('[data-incident-dispatch]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  timers.push(window.setTimeout(fn, ms))
}

function setStatus(text) {
  const el = root()?.querySelector('[data-idc-status]')
  if (!el) return
  el.textContent = ''
  void el.offsetWidth
  el.textContent = text
}

export function runIncidentDispatch() {
  const el = root()
  if (!el || busy || settled) return Promise.resolve()

  busy = true
  clearTimers()
  const trigger = el.querySelector('[data-idc-trigger]')
  const card = el.querySelector('[data-idc-card]')
  if (trigger) trigger.disabled = true

  if (card) {
    card.removeAttribute('hidden')
    card.removeAttribute('aria-hidden')
  }

  el.classList.add('idc--dispatch')

  const settleDelay = prefersReducedMotion() ? 0 : SETTLE_MS

  return new Promise((resolve) => {
    later(prefersReducedMotion() ? 0 : SLIDE_MS, () => {
      setStatus('Critical incident dispatched to Sector 7.')
    })
    later(settleDelay, () => {
      settled = true
      busy = false
      resolve()
    })
  })
}

export function resetIncidentDispatch() {
  const el = root()
  if (!el || busy) return Promise.resolve()

  clearTimers()
  settled = false
  busy = false
  el.classList.remove('idc--dispatch')

  const trigger = el.querySelector('[data-idc-trigger]')
  const card = el.querySelector('[data-idc-card]')
  if (trigger) trigger.disabled = false
  if (card) {
    card.setAttribute('hidden', '')
    card.setAttribute('aria-hidden', 'true')
  }

  setStatus('')
  void el.offsetWidth
  return Promise.resolve()
}

export async function replayIncidentDispatch() {
  if (busy) return
  await resetIncidentDispatch()
  await runIncidentDispatch()
}

function bindUi() {
  root()?.querySelector('[data-idc-trigger]')?.addEventListener('click', () => {
    void runIncidentDispatch()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      void replayIncidentDispatch()
    }
  })
}

bindUi()
