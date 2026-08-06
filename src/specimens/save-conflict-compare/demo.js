/**
 * Save Conflict Compare — PlayStation-inspired motion specimen.
 * iframe-safe; no storage / parent / network.
 */

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-scc]')
}

let busy = false
/** @type {number[]} */
let timers = []

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
  const el = document.querySelector('[data-scc-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-scc-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-scc-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-scc-run], [data-scc-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

const EXPAND_MS = 320

function resetVisual() {
  rootEl()?.setAttribute('data-phase', 'compact')
  setStatus('CONFLICT')
  setHint('Press Run to compare.')
  setLive('Save conflict compact.')
}

function showExpanded() {
  rootEl()?.setAttribute('data-phase', 'expanded')
  setStatus('COMPARING')
  setHint('Timestamps and progress visible.')
  setLive('Save versions expanded for compare.')
}

export function runSaveConflictCompare() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'expanded') return Promise.resolve()
  busy = true
  clearTimers()
  resetVisual()
  setButtons(false)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    showExpanded()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  showExpanded()
  return new Promise((resolve) => {
    later(EXPAND_MS, () => {
      busy = false
      setButtons(true)
      resolve()
    })
  })
}

export function resetSaveConflictCompare() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
}

export async function replaySaveConflictCompare() {
  if (busy) return
  resetSaveConflictCompare()
  await runSaveConflictCompare()
}

function bindUi() {
  document.querySelector('[data-scc-run]')?.addEventListener('click', () => {
    void runSaveConflictCompare()
  })
  document.querySelector('[data-scc-replay]')?.addEventListener('click', () => {
    void replaySaveConflictCompare()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replaySaveConflictCompare()
  })
}

bindUi()
resetSaveConflictCompare()
