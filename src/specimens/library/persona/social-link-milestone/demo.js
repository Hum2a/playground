/**
 * Social Link Milestone — bond nodes converge; unlock badge appears.
 * iframe-safe; no storage / parent / network.
 */

const CONVERGE_MS = 720
const UNLOCK_MS = 400

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-slm]')
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

function setLive(text) {
  const el = document.querySelector('[data-slm-live]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-slm-run], [data-slm-reset]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showDone() {
  setPhase('done')
  setLive('Capability unlocked: Wind Slash.')
}

function resetVisual() {
  setPhase('idle')
  setLive('Bond nodes idle.')
}

export function runSocialLinkMilestone() {
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

  setPhase('converge')
  setLive('Bond nodes converging.')

  return new Promise((resolve) => {
    later(CONVERGE_MS, () => {
      setPhase('unlock')
      setLive('Unlocking capability.')

      later(UNLOCK_MS, () => {
        showDone()
        busy = false
        setButtons(true)
        resolve()
      })
    })
  })
}

export function resetSocialLinkMilestone() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
}

function bindUi() {
  document.querySelector('[data-slm-run]')?.addEventListener('click', () => {
    void runSocialLinkMilestone()
  })
  document.querySelector('[data-slm-reset]')?.addEventListener('click', resetSocialLinkMilestone)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetSocialLinkMilestone()
  })
}

bindUi()
resetSocialLinkMilestone()
