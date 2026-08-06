/**
 * Fireball Commit — A charge grows then shoots into a target to confirm.
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

function rootEl() { return document.querySelector('[data-fc5]') }

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
  const el = document.querySelector('[data-fc5-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-fc5-status]')
  if (el) el.textContent = text
}

function setNote(text) {
  const el = document.querySelector('[data-fc5-note]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-fc5-run], [data-fc5-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showDone() {
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('DONE')
  setNote('A charge grows then shoots into a target to confirm. Resolved.')
  setLive('Fireball Commit. Resolved.')
}

function resetVisual() {
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('IDLE')
  setNote('A charge grows then shoots into a target to confirm.')
  setLive('Fireball Commit. Idle.')
}

/** @returns {Promise<void>} */
export function runFireballCommit() {
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
  setLive('Fireball Commit. Active.')
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

export function resetFireballCommit() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayFireballCommit() {
  if (busy) return
  resetFireballCommit()
  void rootEl()?.offsetWidth
  await runFireballCommit()
}

function bindUi() {
  document.querySelector('[data-fc5-run]')?.addEventListener('click', () => { void runFireballCommit() })
  document.querySelector('[data-fc5-replay]')?.addEventListener('click', () => { void replayFireballCommit() })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayFireballCommit()
  })
}

bindUi()
resetFireballCommit()
