/**
 * Element Merge Recipe — two orbs travel to a central slot, merge, and produce a result token.
 * iframe-safe; no storage / parent / network.
 */

const TRAVEL_MS = 340
const MERGE_MS = 200
const SETTLE_MS = 160

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
  return document.querySelector('[data-emr]')
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
  const el = document.querySelector('[data-emr-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-emr-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-emr-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-emr-run], [data-emr-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function setPhase(phase) {
  rootEl()?.setAttribute('data-phase', phase)
}

function showResolved() {
  setPhase('done')
  setStatus('MERGED')
  setHint('Merged. Press Replay to combine again.')
  setLive('Elements merged. Dual-tone result ready.')
}

function resetVisual() {
  setPhase('idle')
  setStatus('IDLE')
  setHint('Press Run to merge the two elements.')
  setLive('Two elements idle. No result.')
}

/**
 * Auto-run travel → merge → result.
 * @returns {Promise<void>}
 */
export function runElementMergeRecipe() {
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

  setPhase('run')
  setStatus('COMBINING')
  setHint('Travelling to the slot.')
  setLive('Elements travelling to the slot.')

  return new Promise((resolve) => {
    later(TRAVEL_MS, () => {
      setPhase('merge')
      setStatus('MERGING')
      setLive('Merging.')

      later(MERGE_MS, () => {
        later(SETTLE_MS, () => {
          showResolved()
          busy = false
          setButtons(true)
          resolve()
        })
      })
    })
  })
}

export function resetElementMergeRecipe() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayElementMergeRecipe() {
  if (busy) return
  resetElementMergeRecipe()
  void rootEl()?.offsetWidth
  await runElementMergeRecipe()
}

function bindUi() {
  document.querySelector('[data-emr-run]')?.addEventListener('click', () => {
    void runElementMergeRecipe()
  })
  document.querySelector('[data-emr-replay]')?.addEventListener('click', () => {
    void replayElementMergeRecipe()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayElementMergeRecipe()
  })
}

bindUi()
resetElementMergeRecipe()
