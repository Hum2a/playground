/**
 * Shadow Bind Selection — three bind tendrils extend then lock selection.
 * iframe-safe; no storage / parent / network.
 */

const BIND_COUNT = 3
const EXTEND_MS = 260
const STAGGER_MS = 60
const LOCK_MS = 220
const TOTAL_MS = EXTEND_MS + STAGGER_MS * (BIND_COUNT - 1) + LOCK_MS

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-sbd]')
}

function targetEl() {
  return document.querySelector('[data-sbd-target]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
  return id
}

function setLive(text) {
  const el = document.querySelector('[data-sbd-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-sbd-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-sbd-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-sbd-run], [data-sbd-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showResolved() {
  const target = targetEl()
  rootEl()?.setAttribute('data-phase', 'done')
  target?.setAttribute('data-lock', 'true')
  setStatus('BOUND')
  setHint('Target bound.')
  setLive(`Target locked by ${BIND_COUNT} shadow tendrils.`)
}

function resetVisual() {
  const target = targetEl()
  target?.removeAttribute('data-lock')
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('FREE')
  setHint('Press Run to bind the target.')
  setLive('Target unbound. Shadow source idle.')
}

/**
 * Auto-run tendril extend → lock.
 * @returns {Promise<void>}
 */
export function runShadowBindSelection() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'done') {
    return Promise.resolve()
  }

  busy = true
  clearTimers()
  resetVisual()
  setButtons(false)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    showResolved()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  root.setAttribute('data-phase', 'active')
  setStatus('BINDING')
  setLive(`${BIND_COUNT} shadow tendrils extending.`)

  return new Promise((resolve) => {
    const extendEnd = EXTEND_MS + STAGGER_MS * (BIND_COUNT - 1)
    later(extendEnd, () => {
      setLive('Tendrils reached target — locking.')
      later(LOCK_MS, () => {
        showResolved()
        busy = false
        setButtons(true)
        resolve()
      })
    })
  })
}

export function resetShadowBindSelection() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayShadowBindSelection() {
  if (busy) return
  resetShadowBindSelection()
  void rootEl()?.offsetWidth
  await runShadowBindSelection()
}

function bindUi() {
  document.querySelector('[data-sbd-run]')?.addEventListener('click', () => {
    void runShadowBindSelection()
  })
  document.querySelector('[data-sbd-replay]')?.addEventListener('click', () => {
    void replayShadowBindSelection()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayShadowBindSelection()
  })
}

void TOTAL_MS
bindUi()
resetShadowBindSelection()
