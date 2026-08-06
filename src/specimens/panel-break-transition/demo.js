/**
 * Panel Break Transition — ANALYSIS panel shatters to reveal COMPLETE.
 */

const BREAK_MS = 480
const SETTLE_MS = 260

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
  return document.querySelector('[data-pbt]')
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
  const el = document.querySelector('[data-pbt-live]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-pbt-run], [data-pbt-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

/** @returns {Promise<void>} */
export function runPanelBreak() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'done') {
    return Promise.resolve()
  }

  busy = true
  clearTimers()
  setButtons(false)
  setLive('Panel breaking.')
  setPhase('idle')
  void root.offsetWidth

  if (prefersReducedMotion()) {
    setPhase('done')
    setLive('Analysis complete.')
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  setPhase('break')

  return new Promise((resolve) => {
    later(BREAK_MS, () => {
      setPhase('settle')
      setLive('Analysis complete.')

      later(SETTLE_MS, () => {
        setPhase('done')
        busy = false
        setButtons(true)
        resolve()
      })
    })
  })
}

export function resetPanelBreak() {
  clearTimers()
  busy = false
  setPhase('idle')
  setLive('Analysis in progress.')
  setButtons(true)
  const root = rootEl()
  if (root) void root.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayPanelBreak() {
  if (busy) return
  resetPanelBreak()
  void rootEl()?.offsetWidth
  await runPanelBreak()
}

function bindUi() {
  document.querySelector('[data-pbt-run]')?.addEventListener('click', () => {
    void runPanelBreak()
  })
  document.querySelector('[data-pbt-replay]')?.addEventListener('click', () => {
    void replayPanelBreak()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayPanelBreak()
  })
}

bindUi()
resetPanelBreak()
