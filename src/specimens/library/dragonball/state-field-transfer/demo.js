/**
 * SPX-1115 State Field Transfer (DB-150 State Aura Transfer)
 *
 * Timing from TRANSFER BOOST (ms):
 *   0–160      channel constructs (7 segments)
 *   160–295    contours collapse outer→middle→inner (45ms stagger ×3 + settle)
 *   295–635    token travels A→B (340ms); midpoint handoff at +170ms
 *   635–785    token compress then reconstruct inner→middle→outer (50ms stagger)
 *   785–945    channel retracts A→B
 *
 * Ownership: never A ACTIVE and B ACTIVE simultaneously.
 */

const CHANNEL_MS = 160
const COLLAPSE_STAGGER = 45
const COLLAPSE_EACH = 90
const TRAVEL_MS = 340
const ARRIVE_COMPRESS_MS = 50
const REBUILD_STAGGER = 50
const REBUILD_EACH = 90
const RETRACT_MS = 160

const T_CHANNEL = 0
const T_COLLAPSE = CHANNEL_MS
const T_TOKEN = T_COLLAPSE + COLLAPSE_STAGGER * 2 + COLLAPSE_EACH
const T_MID = T_TOKEN + Math.floor(TRAVEL_MS / 2)
const T_ARRIVE = T_TOKEN + TRAVEL_MS
const T_REBUILD = T_ARRIVE + ARRIVE_COMPRESS_MS
const T_ACTIVE_B = T_REBUILD + REBUILD_STAGGER * 2 + REBUILD_EACH
const T_RETRACT = T_ACTIVE_B
const T_DONE = T_RETRACT + RETRACT_MS

/** @type {number[]} */
let timers = []
let busy = false
let done = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-state-field-transfer]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function setAnnounce(root, text) {
  const el = root.querySelector('[data-sft-announce]')
  if (!el) return
  el.textContent = ''
  void el.offsetWidth
  el.textContent = text
}

function setBoost(root, side, text) {
  const el = root.querySelector(`[data-sft-boost-${side}]`)
  if (el) el.textContent = text
}

function setPhase(root, side, text) {
  const el = root.querySelector(`[data-sft-phase-${side}]`)
  if (el) el.textContent = text
}

function setControls(root, { transfer, resetVisible }) {
  const t = root.querySelector('[data-sft-transfer]')
  const r = root.querySelector('[data-sft-reset]')
  if (t) t.disabled = !transfer
  if (r) r.hidden = !resetVisible
}

function clearPhases(root) {
  root.classList.remove(
    'is-channeling',
    'is-collapsing',
    'is-travelling',
    'is-midpoint',
    'is-arriving',
    'is-rebuilding',
    'is-retracting',
    'is-complete',
    'is-reduced',
    'has-field-a',
    'has-field-b',
  )
  for (let i = 1; i <= 7; i += 1) {
    root.classList.remove(`is-seg-${i}`)
  }
}

function applyIdle(root) {
  clearPhases(root)
  root.classList.add('has-field-a')
  root.dataset.state = 'idle'
  setBoost(root, 'a', 'BOOST // ACTIVE')
  setBoost(root, 'b', 'BOOST // NONE')
  setPhase(root, 'a', 'ACTIVE')
  setPhase(root, 'b', 'IDLE')
}

function applyFinal(root) {
  clearPhases(root)
  root.classList.add('is-complete', 'has-field-b')
  root.dataset.state = 'complete'
  setBoost(root, 'a', 'BOOST // NONE')
  setBoost(root, 'b', 'BOOST // ACTIVE')
  setPhase(root, 'a', 'IDLE')
  setPhase(root, 'b', 'ACTIVE')
  setAnnounce(root, 'Boost transferred from Node A to Node B.')
  busy = false
  done = true
  setControls(root, { transfer: false, resetVisible: true })
}

/**
 * Transfer boost field from Node A to Node B.
 * @returns {Promise<void>}
 */
export function runStateFieldTransfer() {
  const root = rootEl()
  if (!root || busy || done) return Promise.resolve()

  busy = true
  clearTimers()
  clearPhases(root)
  root.classList.add('has-field-a')
  root.dataset.state = 'running'
  setControls(root, { transfer: false, resetVisible: false })
  setBoost(root, 'a', 'BOOST // ACTIVE')
  setBoost(root, 'b', 'BOOST // NONE')
  setPhase(root, 'a', 'ACTIVE')
  setPhase(root, 'b', 'IDLE')
  setAnnounce(root, 'Transferring boost from Node A toward Node B.')
  void root.offsetWidth

  if (prefersReducedMotion()) {
    root.classList.add('is-reduced')
    applyFinal(root)
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    root.classList.add('is-channeling')

    later(T_COLLAPSE, () => {
      root.classList.add('is-collapsing')
      setPhase(root, 'a', 'TRANSFERRING')
      setAnnounce(root, 'Node A transferring. Boost collapsing into token.')
    })

    later(T_TOKEN, () => {
      root.classList.remove('is-collapsing', 'has-field-a')
      root.classList.add('is-travelling')
    })

    // Segment strengthen as token passes (deterministic, 7 beats across 340ms)
    for (let i = 1; i <= 7; i += 1) {
      const at = T_TOKEN + Math.round(((i - 0.5) / 7) * TRAVEL_MS)
      later(at, () => {
        root.classList.add(`is-seg-${i}`)
        later(40, () => root.classList.remove(`is-seg-${i}`))
      })
    }

    later(T_MID, () => {
      root.classList.add('is-midpoint')
      setBoost(root, 'a', 'BOOST // NONE')
      setBoost(root, 'b', 'BOOST // PENDING')
      setPhase(root, 'a', 'IDLE')
      setPhase(root, 'b', 'PENDING')
      setAnnounce(root, 'Ownership handoff at midpoint. Boost pending on Node B.')
    })

    later(T_ARRIVE, () => {
      root.classList.remove('is-travelling')
      root.classList.add('is-arriving')
    })

    later(T_REBUILD, () => {
      root.classList.remove('is-arriving')
      root.classList.add('is-rebuilding', 'has-field-b')
    })

    later(T_ACTIVE_B, () => {
      setBoost(root, 'b', 'BOOST // ACTIVE')
      setPhase(root, 'b', 'ACTIVE')
      setBoost(root, 'a', 'BOOST // NONE')
      setPhase(root, 'a', 'IDLE')
      root.classList.add('is-retracting')
      root.classList.remove('is-channeling', 'is-midpoint', 'is-rebuilding')
      setAnnounce(root, 'Boost transferred from Node A to Node B.')
    })

    later(T_DONE, () => {
      applyFinal(root)
      resolve()
    })
  })
}

/**
 * Restore A ACTIVE / B NONE idle state.
 * @returns {Promise<void>}
 */
export function resetStateFieldTransfer() {
  const root = rootEl()
  if (!root) return Promise.resolve()

  clearTimers()
  busy = false
  done = false
  applyIdle(root)
  setAnnounce(root, '')
  setControls(root, { transfer: true, resetVisible: false })
  void root.offsetWidth
  return Promise.resolve()
}

function bindUi() {
  const root = rootEl()
  if (!root || root.dataset.sftBound === '1') return
  root.dataset.sftBound = '1'

  applyIdle(root)
  setControls(root, { transfer: true, resetVisible: false })

  root.querySelector('[data-sft-transfer]')?.addEventListener('click', () => {
    void runStateFieldTransfer()
  })

  root.querySelector('[data-sft-reset]')?.addEventListener('click', () => {
    void resetStateFieldTransfer()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void resetStateFieldTransfer()
  })
}

bindUi()
