/**
 * Max Rank Completion — whole card transforms to MAX state.
 * iframe-safe; no storage / parent / network.
 */

const TRANSFORM_MS = 700

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-pmrc]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function setLive(text) {
  const el = document.querySelector('[data-pmrc-live]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-pmrc-complete], [data-pmrc-reset]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showMax() {
  const root = rootEl()
  const rank = document.querySelector('[data-pmrc-rank]')
  const fill = document.querySelector('[data-pmrc-fill]')
  if (root) root.setAttribute('data-phase', 'max')
  if (rank) rank.textContent = 'MAX'
  if (fill) fill.style.width = '100%'
  setLive('Social link max rank complete.')
}

function resetVisual() {
  const root = rootEl()
  const rank = document.querySelector('[data-pmrc-rank]')
  const fill = document.querySelector('[data-pmrc-fill]')
  if (root) root.setAttribute('data-phase', 'rank9')
  if (rank) rank.textContent = 'RANK 9'
  if (fill) fill.style.width = '88%'
  setLive('Social link rank 9.')
}

export function runMaxRankCompletion() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  busy = true
  clearTimers()
  resetVisual()
  setButtons(false)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    showMax()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  root.setAttribute('data-phase', 'transform')
  setLive('Transforming bond card.')

  return new Promise((resolve) => {
    later(TRANSFORM_MS, () => {
      showMax()
      busy = false
      setButtons(true)
      resolve()
    })
  })
}

export function resetMaxRankCompletion() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
}

function bindUi() {
  document.querySelector('[data-pmrc-complete]')?.addEventListener('click', () => {
    void runMaxRankCompletion()
  })
  document.querySelector('[data-pmrc-reset]')?.addEventListener('click', resetMaxRankCompletion)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetMaxRankCompletion()
  })
}

bindUi()
resetMaxRankCompletion()
