/**
 * Winner Advance — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 * Resolve QF → identify NOVA → spawn token → travel path → dock SEMI.
 */

const COMPARE_MS = 120
const HOLD_MS = 100
const IDENTIFY_MS = 140
const EMERGE_MS = 90
const TRAVEL_MS = 320
const DOCK_MS = 100

const HOLD_AT = COMPARE_MS
const IDENTIFY_AT = HOLD_AT + HOLD_MS
const EMERGE_AT = IDENTIFY_AT + IDENTIFY_MS
const TRAVEL_AT = EMERGE_AT + EMERGE_MS
const DOCK_AT = TRAVEL_AT + TRAVEL_MS
const COMPLETE_AT = DOCK_AT + DOCK_MS

let busy = false
let done = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-wa]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function setStatus(root, text) {
  const status = root.querySelector('[data-wa-status]')
  if (!status) return
  status.textContent = ''
  void status.offsetWidth
  status.textContent = text
}

function setResult(root, text) {
  const el = root.querySelector('[data-wa-result]')
  if (el) el.textContent = text
}

function setBusyUi(root, isBusy) {
  const btn = root.querySelector('[data-wa-resolve]')
  if (btn) btn.disabled = isBusy || done
}

function applyFinal(root, { reduced = false } = {}) {
  clearTimers()
  busy = false
  done = true
  root.classList.toggle('wa--reduced', reduced)
  root.setAttribute('data-state', 'complete')
  setResult(root, 'WINNER // NOVA')

  const tagA = root.querySelector('[data-wa-tag-a]')
  const tagB = root.querySelector('[data-wa-tag-b]')
  if (tagA) tagA.textContent = 'WINNER'
  if (tagB) tagB.textContent = 'ELIMINATED'

  const slot = root.querySelector('[data-wa-slot]')
  if (slot) slot.textContent = 'NOVA'

  const delta = root.querySelector('[data-wa-delta]')
  if (delta) delta.textContent = '+13'

  setStatus(
    root,
    'Nova defeated Kite 84 to 71 and advanced to the semi-final.',
  )
  setBusyUi(root, false)
}

/**
 * Resolve quarter-final and advance NOVA token to semi-final.
 * @returns {Promise<void>}
 */
export function resolveWinnerAdvance() {
  const root = rootEl()
  if (!root || busy || done) return Promise.resolve()

  busy = true
  clearTimers()
  root.classList.remove('wa--reduced')
  setBusyUi(root, true)
  setStatus(root, 'Comparing scores. Nova 84 versus Kite 71.')

  if (prefersReducedMotion()) {
    applyFinal(root, { reduced: true })
    return Promise.resolve()
  }

  root.setAttribute('data-state', 'compare')
  void root.offsetWidth

  return new Promise((resolve) => {
    later(HOLD_AT, () => {
      root.setAttribute('data-state', 'hold')
      const delta = root.querySelector('[data-wa-delta]')
      if (delta) delta.textContent = '+13'
      setStatus(root, 'Score delta +13. Holding comparison.')
    })

    later(IDENTIFY_AT, () => {
      root.setAttribute('data-state', 'identify')
      const tagA = root.querySelector('[data-wa-tag-a]')
      const tagB = root.querySelector('[data-wa-tag-b]')
      if (tagA) tagA.textContent = 'WINNER'
      if (tagB) tagB.textContent = 'ELIMINATED'
      setResult(root, 'WINNER // NOVA')
      setStatus(root, 'Nova selected. Kite eliminated. Preparing advance token.')
    })

    later(EMERGE_AT, () => {
      root.setAttribute('data-state', 'emerge')
      setStatus(root, 'Advancement token emerging from Nova.')
    })

    later(TRAVEL_AT, () => {
      root.setAttribute('data-state', 'travel')
      setStatus(root, 'Token travelling along bracket path to semi-final.')
    })

    later(DOCK_AT, () => {
      root.setAttribute('data-state', 'dock')
      const slot = root.querySelector('[data-wa-slot]')
      if (slot) slot.textContent = 'NOVA'
      setStatus(
        root,
        'Nova defeated Kite 84 to 71 and advanced to the semi-final.',
      )
    })

    later(COMPLETE_AT, () => {
      applyFinal(root)
      resolve()
    })
  })
}

/**
 * Reset to unresolved quarter-final.
 * @returns {Promise<void>}
 */
export function resetWinnerAdvance() {
  const root = rootEl()
  if (!root) return Promise.resolve()

  clearTimers()
  busy = false
  done = false
  root.classList.remove('wa--reduced')
  root.setAttribute('data-state', 'idle')
  setResult(root, 'UNRESOLVED')

  const tagA = root.querySelector('[data-wa-tag-a]')
  const tagB = root.querySelector('[data-wa-tag-b]')
  if (tagA) tagA.textContent = ''
  if (tagB) tagB.textContent = ''

  const slot = root.querySelector('[data-wa-slot]')
  if (slot) slot.textContent = 'EMPTY'

  const delta = root.querySelector('[data-wa-delta]')
  if (delta) delta.textContent = '+13'

  void root.offsetWidth
  setStatus(root, 'Quarter-final unresolved. Nova and Kite awaiting resolve.')
  setBusyUi(root, false)
  return Promise.resolve()
}

function bind() {
  const root = rootEl()
  if (!root) return

  root.querySelector('[data-wa-resolve]')?.addEventListener('click', () => {
    void resolveWinnerAdvance()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') {
      void resetWinnerAdvance()
    }
  })
}

bind()
resetWinnerAdvance()
