/**
 * Exam Start Seal — seal cracks, halves split outward, exam surface activates.
 * iframe-safe; no storage / parent / network.
 */

const CRACK_MS = 160
const SPLIT_MS = 260
const ACTIVATE_MS = 180
const SPLIT_PX = 42
const HALF_ROT_DEG = 18
const CRACK_HEIGHT_PX = 72

let busy = false
let tickHandle = null
let seconds = 0
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-ess]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
  if (tickHandle !== null) {
    window.clearInterval(tickHandle)
    tickHandle = null
  }
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
  return id
}

function setLive(text) {
  const el = document.querySelector('[data-ess-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-ess-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-ess-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-ess-run], [data-ess-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function paintTimer() {
  const el = document.querySelector('[data-ess-timer]')
  if (!el) return
  const m = String(Math.floor(seconds / 60)).padStart(2, '0')
  const s = String(seconds % 60).padStart(2, '0')
  el.textContent = `${m}:${s}`
}

function startTimer() {
  seconds = 0
  paintTimer()
  tickHandle = window.setInterval(() => {
    seconds += 1
    paintTimer()
  }, 1000)
}

function showResolved() {
  rootEl()?.setAttribute('data-phase', 'done')
  startTimer()
  setStatus('ACTIVE')
  setHint('Exam in progress.')
  setLive('Seal broken. Exam panel active and timer running.')
}

function resetVisual() {
  seconds = 0
  paintTimer()
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('LOCKED')
  setHint('Press Run to break the seal and begin.')
  setLive('Exam panel locked. Seal intact.')
}

/**
 * Auto-run crack → split → activate.
 * @returns {Promise<void>}
 */
export function runExamStartSeal() {
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

  root.setAttribute('data-phase', 'cracking')
  setStatus('UNSEALING')
  setLive(`Seal crack forming (${CRACK_HEIGHT_PX}px).`)

  return new Promise((resolve) => {
    later(CRACK_MS, () => {
      root.setAttribute('data-phase', 'active')
      setLive(`Seal halves splitting ±${SPLIT_PX}px / ±${HALF_ROT_DEG}°.`)
      later(SPLIT_MS, () => {
        later(ACTIVATE_MS, () => {
          showResolved()
          busy = false
          setButtons(true)
          resolve()
        })
      })
    })
  })
}

export function resetExamStartSeal() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayExamStartSeal() {
  if (busy) return
  resetExamStartSeal()
  void rootEl()?.offsetWidth
  await runExamStartSeal()
}

function bindUi() {
  document.querySelector('[data-ess-run]')?.addEventListener('click', () => {
    void runExamStartSeal()
  })
  document.querySelector('[data-ess-replay]')?.addEventListener('click', () => {
    void replayExamStartSeal()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayExamStartSeal()
  })
}

bindUi()
resetExamStartSeal()
