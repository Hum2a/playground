/**
 * Rank Promotion — profile moves upward; displaced ranks shift aside.
 */

const PROMOTE_MS = 580
const BADGE_MS = 680
const SETTLE_MS = 1230

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
  return document.querySelector('[data-rank-promotion]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  timers.push(window.setTimeout(fn, ms))
}

function setStatus(text) {
  const el = root()?.querySelector('[data-rpr-status]')
  if (!el) return
  el.textContent = ''
  void el.offsetWidth
  el.textContent = text
}

export function runRankPromotion() {
  const el = root()
  if (!el || busy || settled) return Promise.resolve()

  busy = true
  clearTimers()
  const trigger = el.querySelector('[data-rpr-trigger]')
  const stamp = el.querySelector('[data-rpr-stamp]')
  const num = el.querySelector('[data-rpr-num]')
  if (trigger) trigger.disabled = true

  el.classList.remove('rpr--settled')
  el.classList.add('rpr--promote')
  if (stamp) stamp.removeAttribute('hidden')

  const badgeDelay = prefersReducedMotion() ? 0 : BADGE_MS
  const settleDelay = prefersReducedMotion() ? 0 : SETTLE_MS

  return new Promise((resolve) => {
    later(badgeDelay, () => {
      if (num) num.textContent = '#3'
      setStatus('UNIT-07 promoted from #4 to #3.')
    })
    later(settleDelay, () => {
      el.classList.add('rpr--settled')
      settled = true
      busy = false
      resolve()
    })
  })
}

export function resetRankPromotion() {
  const el = root()
  if (!el || busy) return Promise.resolve()

  clearTimers()
  settled = false
  busy = false
  el.classList.remove('rpr--promote', 'rpr--settled')

  const trigger = el.querySelector('[data-rpr-trigger]')
  const stamp = el.querySelector('[data-rpr-stamp]')
  const num = el.querySelector('[data-rpr-num]')
  if (trigger) trigger.disabled = false
  if (stamp) stamp.setAttribute('hidden', '')
  if (num) num.textContent = '#4'

  setStatus('')
  void el.offsetWidth
  return Promise.resolve()
}

export async function replayRankPromotion() {
  if (busy) return
  await resetRankPromotion()
  await runRankPromotion()
}

function bindUi() {
  root()?.querySelector('[data-rpr-trigger]')?.addEventListener('click', () => {
    void runRankPromotion()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      void replayRankPromotion()
    }
  })
}

bindUi()
