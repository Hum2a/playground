/**
 * Error Correction Rewrite — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 * Visual demo only — does not modify real user data.
 */

const WRONG_AT_MS = 120
const STRIKE_AT_MS = 220
const EXTRACT_AT_MS = 300
const CORRECT_AT_MS = 380
const TOTAL_MS = 580

const PHASES = [
  'ecr--isolate',
  'ecr--wrong-mark',
  'ecr--strike',
  'ecr--extract',
  'ecr--correct',
  'ecr--settled',
  'ecr--busy',
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
  return document.querySelector('[data-error-correction]')
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
  const status = root.querySelector('[data-ecr-status]')
  if (!status) return
  status.textContent = ''
  void status.offsetWidth
  status.textContent = text
}

function setFragmentAria(root, corrected) {
  const wrong = root.querySelector('[data-ecr-wrong]')
  const right = root.querySelector('[data-ecr-right]')
  const mark = root.querySelector('[data-ecr-corrected]')
  if (wrong) wrong.setAttribute('aria-hidden', corrected ? 'true' : 'false')
  if (right) right.setAttribute('aria-hidden', corrected ? 'false' : 'true')
  if (mark) mark.setAttribute('aria-hidden', corrected ? 'false' : 'true')
}

function announce(root) {
  if (announced) return
  setStatus(root, 'Correction: gmial replaced with gmail.')
  announced = true
}

/**
 * Run the fragment correction sequence.
 * @returns {Promise<void>}
 */
export function runErrorCorrection() {
  const root = rootEl()
  if (!root || busy || settled) return Promise.resolve()

  busy = true
  announced = false
  clearTimers()
  clearPhases(root)
  root.classList.add('ecr--busy')
  root.setAttribute('data-state', 'running')
  setStatus(root, '')
  setFragmentAria(root, false)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    root.classList.add('ecr--settled')
    root.setAttribute('data-state', 'settled')
    setFragmentAria(root, true)
    settled = true
    busy = false
    announce(root)
    return Promise.resolve()
  }

  root.classList.add('ecr--isolate')

  return new Promise((resolve) => {
    later(WRONG_AT_MS, () => {
      root.classList.add('ecr--wrong-mark')
    })

    later(STRIKE_AT_MS, () => {
      root.classList.add('ecr--strike')
    })

    later(EXTRACT_AT_MS, () => {
      root.classList.add('ecr--extract')
    })

    later(CORRECT_AT_MS, () => {
      root.classList.add('ecr--correct')
      setFragmentAria(root, true)
    })

    later(TOTAL_MS, () => {
      root.classList.remove(
        'ecr--isolate',
        'ecr--wrong-mark',
        'ecr--strike',
        'ecr--extract',
        'ecr--correct',
        'ecr--busy',
      )
      root.classList.add('ecr--settled')
      root.setAttribute('data-state', 'settled')
      settled = true
      busy = false
      announce(root)
      resolve()
    })
  })
}

/**
 * Restore typo state — deterministic.
 * @returns {Promise<void>}
 */
export function resetErrorCorrection() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  clearTimers()
  clearPhases(root)
  busy = false
  settled = false
  announced = false
  root.setAttribute('data-state', 'idle')
  setFragmentAria(root, false)
  setStatus(root, '')
  void root.offsetWidth
  return Promise.resolve()
}

/**
 * Reset then run — harness restart.
 * @returns {Promise<void>}
 */
export async function replayErrorCorrection() {
  if (busy) return
  await resetErrorCorrection()
  await runErrorCorrection()
}

function bindUi() {
  const root = rootEl()
  const trigger = root?.querySelector('[data-ecr-trigger]')

  trigger?.addEventListener('click', () => {
    void runErrorCorrection()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayErrorCorrection()
  })
}

bindUi()
