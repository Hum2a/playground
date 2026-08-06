/**
 * Cross-Out Replacement — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

const IMPACT_AT_MS = 150
const INVALIDATE_AT_MS = 180
const REPLACE_AT_MS = 260
const EXIT_AT_MS = 420
const TOTAL_MS = 560

const PHASES = [
  'cor--strike',
  'cor--impact',
  'cor--invalidate',
  'cor--replace',
  'cor--exit',
  'cor--settled',
  'cor--busy',
]

let busy = false
let settled = false
let announced = false
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-cross-out]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function clearPhases(root) {
  root.classList.remove(...PHASES)
}

function setStatus(root, text) {
  const status = root.querySelector('[data-cor-status]')
  if (!status) return
  status.textContent = ''
  void status.offsetWidth
  status.textContent = text
}

function announceOnce(root) {
  if (announced) return
  setStatus(root, 'Monthly plan changed to £29 per month.')
  announced = true
}

function setAriaForSettled(root, settledNow) {
  const oldEl = root.querySelector('[data-cor-old]')
  const newEl = root.querySelector('[data-cor-new]')
  if (oldEl) oldEl.setAttribute('aria-hidden', settledNow ? 'true' : 'false')
  if (newEl) newEl.setAttribute('aria-hidden', settledNow ? 'false' : 'true')
}

/**
 * Run the cross-out → replacement sequence.
 * @returns {Promise<void>}
 */
export function applyCrossOutReplacement() {
  const root = rootEl()
  if (!root || busy || settled) return Promise.resolve()

  busy = true
  announced = false
  clearTimers()
  clearPhases(root)
  root.classList.add('cor--busy')
  root.setAttribute('data-state', 'running')
  setStatus(root, '')
  void root.offsetWidth

  if (prefersReducedMotion()) {
    root.classList.add('cor--settled')
    root.setAttribute('data-state', 'settled')
    setAriaForSettled(root, true)
    settled = true
    busy = false
    announceOnce(root)
    return Promise.resolve()
  }

  root.classList.add('cor--strike')

  return new Promise((resolve) => {
    later(IMPACT_AT_MS, () => {
      root.classList.add('cor--impact')
    })

    later(INVALIDATE_AT_MS, () => {
      root.classList.add('cor--invalidate')
    })

    later(REPLACE_AT_MS, () => {
      root.classList.add('cor--replace')
      setAriaForSettled(root, true)
    })

    later(EXIT_AT_MS, () => {
      root.classList.add('cor--exit')
    })

    later(TOTAL_MS, () => {
      root.classList.remove(
        'cor--strike',
        'cor--impact',
        'cor--invalidate',
        'cor--replace',
        'cor--exit',
        'cor--busy',
      )
      root.classList.add('cor--settled')
      root.setAttribute('data-state', 'settled')
      settled = true
      busy = false
      announceOnce(root)
      resolve()
    })
  })
}

/**
 * Restore £49 idle state — deterministic, no transform accumulation.
 * @returns {Promise<void>}
 */
export function resetCrossOutReplacement() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  clearTimers()
  clearPhases(root)
  settled = false
  announced = false
  busy = false
  root.setAttribute('data-state', 'idle')
  setAriaForSettled(root, false)
  setStatus(root, '')
  void root.offsetWidth
  return Promise.resolve()
}

/**
 * Reset then apply — harness restart.
 * @returns {Promise<void>}
 */
export async function replayCrossOutReplacement() {
  if (busy) return
  await resetCrossOutReplacement()
  await applyCrossOutReplacement()
}

function bindUi() {
  const root = rootEl()
  const trigger = root?.querySelector('[data-cor-trigger]')

  trigger?.addEventListener('click', () => {
    void applyCrossOutReplacement()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayCrossOutReplacement()
  })
}

bindUi()
