/**
 * Decay Delete — target crumbles from contact point outward.
 */

const CRACK_MS = 220
const DECAY_MS = 580
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
  return document.querySelector('[data-decay-delete]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  timers.push(window.setTimeout(fn, ms))
}

function setStatus(text) {
  const el = root()?.querySelector('[data-dcd-status]')
  if (!el) return
  el.textContent = ''
  void el.offsetWidth
  el.textContent = text
}

export function runDecayDelete() {
  const el = root()
  if (!el || busy || settled) return Promise.resolve()

  busy = true
  clearTimers()
  const trigger = el.querySelector('[data-dcd-trigger]')
  const shards = el.querySelector('[data-dcd-shards]')
  if (trigger) trigger.disabled = true

  const reduced = prefersReducedMotion()

  if (!reduced) {
    el.classList.add('dcd--crack')
    later(CRACK_MS, () => {
      if (shards) shards.removeAttribute('hidden')
      el.classList.add('dcd--decay')
    })
  } else {
    el.classList.add('dcd--crack', 'dcd--decay')
  }

  const settleDelay = reduced ? 0 : SETTLE_MS

  return new Promise((resolve) => {
    later(reduced ? 0 : CRACK_MS + DECAY_MS, () => {
      el.classList.add('dcd--settled')
      const voidEl = el.querySelector('[data-dcd-void]')
      if (voidEl) voidEl.removeAttribute('hidden')
      setStatus('Target record removed by decay delete.')
    })
    later(settleDelay, () => {
      settled = true
      busy = false
      resolve()
    })
  })
}

export function resetDecayDelete() {
  const el = root()
  if (!el || busy) return Promise.resolve()

  clearTimers()
  settled = false
  busy = false
  el.classList.remove('dcd--crack', 'dcd--decay', 'dcd--settled')

  const trigger = el.querySelector('[data-dcd-trigger]')
  const shards = el.querySelector('[data-dcd-shards]')
  const voidEl = el.querySelector('[data-dcd-void]')
  if (trigger) trigger.disabled = false
  if (shards) shards.setAttribute('hidden', '')
  if (voidEl) voidEl.setAttribute('hidden', '')

  setStatus('')
  void el.offsetWidth
  return Promise.resolve()
}

export async function replayDecayDelete() {
  if (busy) return
  await resetDecayDelete()
  await runDecayDelete()
}

function bindUi() {
  root()?.querySelector('[data-dcd-trigger]')?.addEventListener('click', () => {
    void runDecayDelete()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      void replayDecayDelete()
    }
  })
}

bindUi()
