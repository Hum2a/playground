/**
 * Mission Complete Stamp — an original completion seal slams onto a briefing card.
 * iframe-safe; no storage / parent / network.
 */

const SLAM_MS = 220
const SETTLE_MS = 100
const RING_MS = 260
const STAMP_OVERSHOOT_DEG = -18
const STAMP_SETTLE_DEG = -14
const TOTAL_MS = SLAM_MS + SETTLE_MS + RING_MS

let busy = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-mcs]')
}

function stampEl() {
  return document.querySelector('[data-mcs-stamp]')
}

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
  const el = document.querySelector('[data-mcs-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-mcs-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-mcs-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-mcs-run], [data-mcs-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showResolved() {
  const stamp = stampEl()
  rootEl()?.setAttribute('data-phase', 'done')
  stamp?.setAttribute('data-ring', 'true')
  setStatus('COMPLETE')
  setHint('Stamp filed.')
  setLive('Mission complete stamp filed.')
}

function resetVisual() {
  const stamp = stampEl()
  stamp?.removeAttribute('data-ring')
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('PENDING')
  setHint('Press Run to file the completion stamp.')
  setLive('Mission briefing pending. No completion stamp filed.')
}

/**
 * Auto-run the full stamp sequence.
 * @returns {Promise<void>}
 */
export function runMissionCompleteStamp() {
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
  setStatus('STAMPING')
  setLive('Stamp descending.')

  return new Promise((resolve) => {
    later(SLAM_MS, () => {
      root.setAttribute('data-phase', 'done')
      later(SETTLE_MS, () => {
        later(RING_MS, () => {
          showResolved()
          busy = false
          setButtons(true)
          resolve()
        })
      })
    })
  })
}

export function resetMissionCompleteStamp() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayMissionCompleteStamp() {
  if (busy) return
  resetMissionCompleteStamp()
  void rootEl()?.offsetWidth
  await runMissionCompleteStamp()
}

function bindUi() {
  document.querySelector('[data-mcs-run]')?.addEventListener('click', () => {
    void runMissionCompleteStamp()
  })
  document.querySelector('[data-mcs-replay]')?.addEventListener('click', () => {
    void replayMissionCompleteStamp()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayMissionCompleteStamp()
  })
}

void TOTAL_MS
void STAMP_OVERSHOOT_DEG
void STAMP_SETTLE_DEG
bindUi()
resetMissionCompleteStamp()
