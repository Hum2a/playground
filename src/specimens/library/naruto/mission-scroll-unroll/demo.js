/**
 * Mission Scroll Unroll — physical height expand then briefing lines unclip.
 * iframe-safe; no storage / parent / network.
 */

const UNROLL_MS = 480
const LINE_STAGGER_MS = 70
const LINE_START_MS = 280
const SETTLE_MS = 90
const LINE_COUNT = 4
const ROLLED_HEIGHT_PX = 16
const OPEN_HEIGHT_PX = 190

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
  return document.querySelector('[data-msu]')
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
  const el = document.querySelector('[data-msu-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-msu-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-msu-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-msu-run], [data-msu-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function lines() {
  return Array.from(document.querySelectorAll('[data-msu-line]'))
}

function showResolved() {
  lines().forEach((line) => line.setAttribute('data-visible', 'true'))
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('BRIEFED')
  setHint('Briefing revealed.')
  setLive('Mission scroll fully unrolled. Briefing revealed.')
}

function resetVisual() {
  lines().forEach((line) => line.removeAttribute('data-visible'))
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('ROLLED')
  setHint('Press Run to unroll the mission scroll.')
  setLive('Mission scroll rolled. Briefing hidden.')
}

/**
 * Auto-run the unroll + briefing reveal (demo Run).
 * @returns {Promise<void>}
 */
export function runMissionScrollUnroll() {
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
  setStatus('UNROLLING')
  setLive('Unrolling mission scroll.')

  return new Promise((resolve) => {
    lines().forEach((line, i) => {
      later(LINE_START_MS + i * LINE_STAGGER_MS, () => {
        line.setAttribute('data-visible', 'true')
      })
    })

    const totalMs = Math.max(
      UNROLL_MS,
      LINE_START_MS + (LINE_COUNT - 1) * LINE_STAGGER_MS + 200,
    )
    later(totalMs + SETTLE_MS, () => {
      showResolved()
      busy = false
      setButtons(true)
      resolve()
    })
  })
}

export function resetMissionScrollUnroll() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayMissionScrollUnroll() {
  if (busy) return
  resetMissionScrollUnroll()
  void rootEl()?.offsetWidth
  await runMissionScrollUnroll()
}

function bindUi() {
  document.querySelector('[data-msu-run]')?.addEventListener('click', () => {
    void runMissionScrollUnroll()
  })
  document.querySelector('[data-msu-replay]')?.addEventListener('click', () => {
    void replayMissionScrollUnroll()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayMissionScrollUnroll()
  })
}

void ROLLED_HEIGHT_PX
void OPEN_HEIGHT_PX
bindUi()
resetMissionScrollUnroll()
