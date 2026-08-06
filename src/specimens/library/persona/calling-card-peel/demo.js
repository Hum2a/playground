/**
 * Calling Card Peel — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

const LIFT_MS = 180
const TENSION_MS = 160
const PEEL_MS = 460
const RELEASE_MS = 240
const TOTAL_MS = LIFT_MS + TENSION_MS + PEEL_MS + RELEASE_MS // 1040

const PHASES = [
  'ccp--lift',
  'ccp--tension',
  'ccp--peel',
  'ccp--release',
  'ccp--revealed',
  'ccp--reduced',
  'ccp--busy',
]

let busy = false
let revealed = false
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-calling-card-peel]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function clearPhases(root) {
  root.classList.remove(...PHASES)
}

function setStatus(root, text) {
  const status = root.querySelector('[data-calling-card-peel-status]')
  if (status) status.textContent = text
}

function setActionEnabled(root, enabled) {
  const action = root.querySelector('[data-calling-card-peel-action]')
  if (!action) return
  action.disabled = !enabled
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
  return id
}

/**
 * Peel the attached notice away. Content stays in the DOM underneath.
 * @param {() => void} [onRevealed] — called once when substantially/fully revealed
 * @returns {Promise<void>}
 */
export function peelCallingCard(onRevealed) {
  const root = rootEl()
  if (!root || busy || revealed) return Promise.resolve()

  busy = true
  clearTimers()
  clearPhases(root)
  root.classList.add('ccp--busy')
  void root.offsetWidth

  if (prefersReducedMotion()) {
    root.classList.add('ccp--reduced', 'ccp--revealed')
    revealed = true
    busy = false
    setActionEnabled(root, true)
    setStatus(root, 'Material revealed. Restricted notice removed.')
    try {
      onRevealed?.()
    } catch {
      /* keep portable */
    }
    return Promise.resolve()
  }

  root.classList.add('ccp--lift')

  return new Promise((resolve) => {
    later(LIFT_MS, () => {
      root.classList.add('ccp--tension')
    })

    later(LIFT_MS + TENSION_MS, () => {
      root.classList.add('ccp--peel')
    })

    later(LIFT_MS + TENSION_MS + PEEL_MS, () => {
      root.classList.add('ccp--release')
    })

    later(TOTAL_MS, () => {
      root.classList.remove('ccp--lift', 'ccp--tension', 'ccp--peel', 'ccp--release')
      root.classList.add('ccp--revealed')
      revealed = true
      busy = false
      setActionEnabled(root, true)
      setStatus(root, 'Material revealed. Restricted notice removed.')
      try {
        onRevealed?.()
      } catch {
        /* ignore */
      }
      resolve()
    })
  })
}

/**
 * Restore the attached-paper covering state.
 * @returns {Promise<void>}
 */
export function resetCallingCardPeel() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  clearTimers()
  clearPhases(root)
  revealed = false
  busy = false
  setActionEnabled(root, false)
  setStatus(root, 'Restricted notice covering material.')
  void root.offsetWidth
  return Promise.resolve()
}

/**
 * Reset then peel again — no DOM accumulation.
 * @returns {Promise<void>}
 */
export async function replayCallingCardPeel() {
  if (busy) return
  await resetCallingCardPeel()
  await peelCallingCard()
}

function bindUi() {
  const root = rootEl()
  const trigger = root?.querySelector('[data-calling-card-peel-trigger]')

  trigger?.addEventListener('click', () => {
    void peelCallingCard()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayCallingCardPeel()
  })
}

bindUi()
