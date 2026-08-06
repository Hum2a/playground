/**
 * Arcana Rank-Up — bond card rises to new rank with flourish.
 * iframe-safe; no storage / parent / network.
 */

const RISE_MS = 520
const FLOURISH_MS = 360
const START_RANK = 3
const END_RANK = 4

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-aru]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function setPhase(phase) {
  rootEl()?.setAttribute('data-phase', phase)
}

function setRank(rank) {
  rootEl()?.setAttribute('data-rank', String(rank))
  const num = document.querySelector('[data-aru-rank-num]')
  if (num) num.textContent = String(rank)
}

function setLive(text) {
  const el = document.querySelector('[data-aru-live]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-aru-run], [data-aru-reset]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showDone() {
  setPhase('done')
  setRank(END_RANK)
  const flourish = document.querySelector('[data-aru-flourish]')
  if (flourish) flourish.setAttribute('aria-hidden', 'false')
  setLive(`Rank ${END_RANK} bond card.`)
}

function resetVisual() {
  setPhase('idle')
  setRank(START_RANK)
  const flourish = document.querySelector('[data-aru-flourish]')
  if (flourish) flourish.setAttribute('aria-hidden', 'true')
  setLive(`Rank ${START_RANK} bond card.`)
}

export function runArcanaRankUp() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  busy = true
  clearTimers()
  resetVisual()
  setButtons(false)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    showDone()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  setPhase('rise')
  setLive('Card rising.')

  return new Promise((resolve) => {
    later(RISE_MS, () => {
      setRank(END_RANK)
      setPhase('flourish')
      setLive('Rank increased.')

      later(FLOURISH_MS, () => {
        showDone()
        busy = false
        setButtons(true)
        resolve()
      })
    })
  })
}

export function resetArcanaRankUp() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
}

function bindUi() {
  document.querySelector('[data-aru-run]')?.addEventListener('click', () => {
    void runArcanaRankUp()
  })
  document.querySelector('[data-aru-reset]')?.addEventListener('click', resetArcanaRankUp)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetArcanaRankUp()
  })
}

bindUi()
resetArcanaRankUp()
