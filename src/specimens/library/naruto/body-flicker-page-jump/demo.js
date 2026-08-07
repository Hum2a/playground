/**
 * Body Flicker Page Jump — view flickers into compressed directional streaks,
 * then hands off abruptly to a new destination view.
 * iframe-safe; no storage / parent / network.
 */

const FLICKER_MS = 140
const SETTLE_MS = 90
const TOTAL_MS = FLICKER_MS + SETTLE_MS

let busy = false
let arrived = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-bfp]')
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
  const el = document.querySelector('[data-bfp-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-bfp-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-bfp-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-bfp-run], [data-bfp-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function viewA() {
  return document.querySelector('[data-bfp-view-a]')
}

function viewB() {
  return document.querySelector('[data-bfp-view-b]')
}

function swapViews() {
  const a = viewA()
  const b = viewB()
  if (a) a.hidden = true
  if (b) b.hidden = false
}

function showArrived() {
  arrived = true
  swapViews()
  rootEl()?.setAttribute('data-phase', 'arrived')
  setStatus('MISSION BOARD')
  setHint('Arrived at destination.')
  setLive('Arrived at Mission Board.')
}

function resetVisual() {
  arrived = false
  const a = viewA()
  const b = viewB()
  if (a) a.hidden = false
  if (b) b.hidden = true
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('HOME')
  setHint('Press Run to jump to Mission Board.')
  setLive('Idle. Viewing HOME.')
}

/**
 * Auto-run full flicker → handoff → settle choreography.
 * @returns {Promise<void>}
 */
export function runBodyFlickerPageJump() {
  const root = rootEl()
  if (!root || busy || arrived) return Promise.resolve()

  busy = true
  clearTimers()
  resetVisual()
  setButtons(false)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    showArrived()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  root.setAttribute('data-phase', 'flickering')
  setStatus('JUMPING')
  setHint('View flickering.')
  setLive('View flickering.')

  return new Promise((resolve) => {
    later(FLICKER_MS, () => {
      swapViews()
      root.setAttribute('data-phase', 'settling')
      setStatus('MISSION BOARD')
      setHint('Streak residue clearing.')
      setLive('Handed off to Mission Board.')
    })

    later(TOTAL_MS, () => {
      showArrived()
      busy = false
      setButtons(true)
      resolve()
    })
  })
}

export function resetBodyFlickerPageJump() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayBodyFlickerPageJump() {
  if (busy) return
  resetBodyFlickerPageJump()
  void rootEl()?.offsetWidth
  await runBodyFlickerPageJump()
}

function bindUi() {
  document.querySelector('[data-bfp-run]')?.addEventListener('click', () => {
    void runBodyFlickerPageJump()
  })
  document.querySelector('[data-bfp-replay]')?.addEventListener('click', () => {
    void replayBodyFlickerPageJump()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayBodyFlickerPageJump()
  })
}

bindUi()
resetBodyFlickerPageJump()
requestAnimationFrame(() => {
  void runBodyFlickerPageJump()
})
