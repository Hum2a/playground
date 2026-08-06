/**
 * Summoning Seal Materialise — A seal constructs then materialises a tool panel.
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

function rootEl() { return document.querySelector('[data-ssm6]') }

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
  const el = document.querySelector('[data-ssm6-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-ssm6-status]')
  if (el) el.textContent = text
}

function setNote(text) {
  const el = document.querySelector('[data-ssm6-note]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-ssm6-run], [data-ssm6-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showDone() {
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('DONE')
  setNote('A seal constructs then materialises a tool panel. Resolved.')
  setLive('Summoning Seal Materialise. Resolved.')
}

function resetVisual() {
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('IDLE')
  setNote('A seal constructs then materialises a tool panel.')
  setLive('Summoning Seal Materialise. Idle.')
}

/** @returns {Promise<void>} */
export function runSummoningSealMaterialise() {
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
  setLive('Summoning Seal Materialise. Active.')
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

export function resetSummoningSealMaterialise() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replaySummoningSealMaterialise() {
  if (busy) return
  resetSummoningSealMaterialise()
  void rootEl()?.offsetWidth
  await runSummoningSealMaterialise()
}

function bindUi() {
  document.querySelector('[data-ssm6-run]')?.addEventListener('click', () => { void runSummoningSealMaterialise() })
  document.querySelector('[data-ssm6-replay]')?.addEventListener('click', () => { void replaySummoningSealMaterialise() })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replaySummoningSealMaterialise()
  })
}

bindUi()
resetSummoningSealMaterialise()
