/**
 * Mission Rank Reveal — rank card lands, wax stamp overshoots then settles.
 * iframe-safe; no storage / parent / network.
 */

const CARD_MS = 280
const STAMP_IMPACT_MS = 180
const STAMP_SETTLE_MS = 120
const SETTLE_MS = 90
const STAMP_OVERSHOOT_DEG = -22
const STAMP_SETTLE_DEG = -12

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
  return document.querySelector('[data-mrr]')
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
  const el = document.querySelector('[data-mrr-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-mrr-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-mrr-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-mrr-run], [data-mrr-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function card() {
  return document.querySelector('[data-mrr-card]')
}

function stamp() {
  return document.querySelector('[data-mrr-stamp]')
}

function showResolved() {
  card()?.setAttribute('data-visible', 'true')
  const s = stamp()
  s?.setAttribute('data-visible', 'true')
  s?.setAttribute('data-phase', 'settle')
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('RANK CONFIRMED')
  setHint('Mission rank B confirmed.')
  setLive('Mission rank confirmed. Rank B.')
}

function resetVisual() {
  card()?.setAttribute('data-visible', 'false')
  const s = stamp()
  s?.setAttribute('data-visible', 'false')
  s?.removeAttribute('data-phase')
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('PENDING')
  setHint('Press Run to reveal the mission rank.')
  setLive('Briefing idle. Rank pending.')
}

/**
 * Auto-run the full reveal sequence (Run / replay).
 * @returns {Promise<void>}
 */
export function runMissionRankReveal() {
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
  setStatus('BRIEFING')
  setLive('Mission card incoming.')
  card()?.setAttribute('data-visible', 'true')

  return new Promise((resolve) => {
    later(CARD_MS, () => {
      setStatus('STAMPING')
      setLive('Wax stamp impact.')
      const s = stamp()
      s?.setAttribute('data-visible', 'true')
      s?.setAttribute('data-phase', 'impact')
      later(STAMP_IMPACT_MS, () => {
        s?.setAttribute('data-phase', 'settle')
        later(STAMP_SETTLE_MS + SETTLE_MS, () => {
          showResolved()
          busy = false
          setButtons(true)
          resolve()
        })
      })
    })
  })
}

export function resetMissionRankReveal() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayMissionRankReveal() {
  if (busy) return
  resetMissionRankReveal()
  void rootEl()?.offsetWidth
  await runMissionRankReveal()
}

function bindUi() {
  document.querySelector('[data-mrr-run]')?.addEventListener('click', () => {
    void runMissionRankReveal()
  })
  document.querySelector('[data-mrr-replay]')?.addEventListener('click', () => {
    void replayMissionRankReveal()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayMissionRankReveal()
  })
}

void STAMP_OVERSHOOT_DEG
void STAMP_SETTLE_DEG
bindUi()
resetMissionRankReveal()
