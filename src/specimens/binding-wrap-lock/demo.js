/**
 * Binding Wrap Lock — strips wrap card to indicate restricted state.
 * iframe-safe; no storage / parent / network.
 */

const WRAP_MS = 500
const SETTLE_MS = 650
const TOTAL_MS = WRAP_MS + SETTLE_MS

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
  return document.querySelector('[data-bwl]')
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

function setPhase(phase) {
  rootEl()?.setAttribute('data-phase', phase)
}

function setLive(text) {
  const el = document.querySelector('[data-bwl-live]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-bwl-run], [data-bwl-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showLocked() {
  const lock = document.querySelector('[data-bwl-lock]')
  if (lock) lock.hidden = false
  setLive('Resource locked.')
}

function resetVisual() {
  const lock = document.querySelector('[data-bwl-lock]')
  if (lock) lock.hidden = true
  setLive('Resource unlocked.')
}

/** @returns {Promise<void>} */
export function runBindingWrapLock() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'done') {
    return Promise.resolve()
  }

  busy = true
  clearTimers()
  resetVisual()
  setButtons(false)
  setPhase('idle')
  void root.offsetWidth

  if (prefersReducedMotion()) {
    setPhase('done')
    showLocked()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  setPhase('wrap')
  setLive('Binding strips deploying.')

  return new Promise((resolve) => {
    later(WRAP_MS, () => {
      showLocked()
      setPhase('done')
      later(SETTLE_MS, () => {
        busy = false
        setButtons(true)
        resolve()
      })
    })
  })
}

export function resetBindingWrapLock() {
  clearTimers()
  busy = false
  resetVisual()
  setPhase('idle')
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayBindingWrapLock() {
  if (busy) return
  resetBindingWrapLock()
  void rootEl()?.offsetWidth
  await runBindingWrapLock()
}

function bindUi() {
  document.querySelector('[data-bwl-run]')?.addEventListener('click', () => {
    void runBindingWrapLock()
  })
  document.querySelector('[data-bwl-replay]')?.addEventListener('click', () => {
    void replayBindingWrapLock()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayBindingWrapLock()
  })
}

bindUi()
resetBindingWrapLock()
