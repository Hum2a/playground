/**
 * Mission Incoming — mission dispatch card enters with speed lines.
 * iframe-safe; no storage / parent / network.
 */

const ENTER_MS = 420
const SETTLE_MS = 650
const TOTAL_MS = ENTER_MS + SETTLE_MS

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
  return document.querySelector('[data-mi]')
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
  const el = document.querySelector('[data-mi-live]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-mi-run], [data-mi-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showDone() {
  setLive('Mission card received.')
}

function resetVisual() {
  setLive('Dispatch channel idle.')
}

/** @returns {Promise<void>} */
export function runMissionIncoming() {
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
    showDone()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  setPhase('enter')
  setLive('Mission incoming.')

  return new Promise((resolve) => {
    later(ENTER_MS, () => {
      setPhase('settle')
      showDone()
      later(SETTLE_MS, () => {
        setPhase('done')
        busy = false
        setButtons(true)
        resolve()
      })
    })
  })
}

export function resetMissionIncoming() {
  clearTimers()
  busy = false
  resetVisual()
  setPhase('idle')
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayMissionIncoming() {
  if (busy) return
  resetMissionIncoming()
  void rootEl()?.offsetWidth
  await runMissionIncoming()
}

function bindUi() {
  document.querySelector('[data-mi-run]')?.addEventListener('click', () => {
    void runMissionIncoming()
  })
  document.querySelector('[data-mi-replay]')?.addEventListener('click', () => {
    void replayMissionIncoming()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayMissionIncoming()
  })
}

bindUi()
resetMissionIncoming()
