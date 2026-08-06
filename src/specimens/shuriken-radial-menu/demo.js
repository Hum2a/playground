/**
 * Shuriken Radial Menu — Four-point geometry rotates open into action sectors.
 * iframe-safe; no storage / parent / network.
 */
const ACTIVE_MS = 480
const SETTLE_MS = 160

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced = document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() { return document.querySelector('[data-srm0]') }

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
  const el = document.querySelector('[data-srm0-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-srm0-status]')
  if (el) el.textContent = text
}

function setNote(text) {
  const el = document.querySelector('[data-srm0-note]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-srm0-run], [data-srm0-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showDone() {
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('DONE')
  setNote('Four-point geometry rotates open into action sectors. Resolved.')
  setLive('Shuriken Radial Menu. Resolved.')
}

function resetVisual() {
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('IDLE')
  setNote('Four-point geometry rotates open into action sectors.')
  setLive('Shuriken Radial Menu. Idle.')
}

/** @returns {Promise<void>} */
export function runShurikenRadialMenu() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'done') return Promise.resolve()
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
  root.setAttribute('data-phase', 'active')
  setStatus('ACTIVE')
  setLive('Shuriken Radial Menu. Active.')
  return new Promise((resolve) => {
    later(ACTIVE_MS, () => {
      showDone()
      later(SETTLE_MS, () => {
        busy = false
        setButtons(true)
        resolve()
      })
    })
  })
}

export function resetShurikenRadialMenu() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayShurikenRadialMenu() {
  if (busy) return
  resetShurikenRadialMenu()
  void rootEl()?.offsetWidth
  await runShurikenRadialMenu()
}

function bindUi() {
  document.querySelector('[data-srm0-run]')?.addEventListener('click', () => { void runShurikenRadialMenu() })
  document.querySelector('[data-srm0-replay]')?.addEventListener('click', () => { void replayShurikenRadialMenu() })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayShurikenRadialMenu()
  })
}

bindUi()
resetShurikenRadialMenu()
