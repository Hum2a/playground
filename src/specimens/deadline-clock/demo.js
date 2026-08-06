/**
 * Deadline Clock — tiny portable deadline enclosure API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * States (enclosure metaphor — ring grows as deadline nears):
 *   72h → 25% perimeter, tracking 0.08em, 0 marks
 *   24h → 60%, tracking tighter, 1 pale radial mark
 *   6h  → 85%, 2 marks
 *   1h  → 96%, tracking 0, 4 marks
 *   0h  → 100% closed + CLOSED
 */

/** @typedef {'72h' | '24h' | '6h' | '1h' | '0h'} DeadlineState */

/** @type {DeadlineState[]} */
const STATES = ['72h', '24h', '6h', '1h', '0h']

const STATE_META = {
  '72h': {
    label: '72 HOURS',
    status: 'Submission window. 72 hours remaining.',
    arc: 25,
    tracking: '0.08em',
    marks: 0,
  },
  '24h': {
    label: '24 HOURS',
    status: 'Submission window. 24 hours remaining.',
    arc: 60,
    tracking: '0.05em',
    marks: 1,
  },
  '6h': {
    label: '6 HOURS',
    status: 'Submission window. 6 hours remaining.',
    arc: 85,
    tracking: '0.02em',
    marks: 2,
  },
  '1h': {
    label: '1 HOUR',
    status: 'Submission window. 1 hour remaining.',
    arc: 96,
    tracking: '0',
    marks: 4,
  },
  '0h': {
    label: 'CLOSED',
    status: 'Submission window closed.',
    arc: 100,
    tracking: '0',
    marks: 4,
  },
}

/** @type {DeadlineState} */
let state = '72h'
let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-deadline-clock]')
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

function setButtonsEnabled(on) {
  document.querySelectorAll('[data-dc-advance], [data-dc-reset]').forEach((btn) => {
    btn.disabled = !on
  })
}

/**
 * @param {DeadlineState} next
 * @param {{ animate?: boolean }} [opts]
 */
function applyState(next, opts = {}) {
  const animate = opts.animate !== false && !prefersReducedMotion()
  const meta = STATE_META[next]
  const root = rootEl()
  if (!root || !meta) return

  state = next
  root.setAttribute('data-state', next)
  root.classList.toggle('deadline-clock--closed', next === '0h')
  root.classList.toggle('deadline-clock--animate', animate)
  root.style.setProperty('--dc-arc', `${meta.arc}`)
  root.style.setProperty('--dc-tracking', meta.tracking)
  root.style.setProperty('--dc-marks', String(meta.marks))

  const time = document.querySelector('[data-dc-time]')
  const closed = document.querySelector('[data-dc-closed]')
  const status = document.querySelector('[data-dc-status]')

  if (next === '0h') {
    if (time) {
      time.hidden = true
      time.textContent = 'CLOSED'
    }
    if (closed) closed.hidden = false
  } else {
    if (time) {
      time.hidden = false
      time.textContent = meta.label
    }
    if (closed) closed.hidden = true
  }

  if (status) status.textContent = meta.status

  const advance = document.querySelector('[data-dc-advance]')
  if (advance) advance.disabled = next === '0h'
}

/**
 * Advance one deadline state (72h → … → 0h).
 * @returns {Promise<void>}
 */
export function advanceDeadlineClock() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()
  const idx = STATES.indexOf(state)
  if (idx < 0 || idx >= STATES.length - 1) return Promise.resolve()

  const next = STATES[idx + 1]
  if (prefersReducedMotion()) {
    applyState(next, { animate: false })
    return Promise.resolve()
  }

  busy = true
  setButtonsEnabled(false)
  clearTimers()
  applyState(next, { animate: true })

  return new Promise((resolve) => {
    later(420, () => {
      busy = false
      setButtonsEnabled(true)
      if (next === '0h') {
        const advance = document.querySelector('[data-dc-advance]')
        if (advance) advance.disabled = true
      }
      resolve()
    })
  })
}

export function resetDeadlineClock() {
  clearTimers()
  busy = false
  applyState('72h', { animate: false })
  setButtonsEnabled(true)
}

/** @returns {Promise<void>} */
export async function replayDeadlineClock() {
  if (busy) return
  resetDeadlineClock()
  void rootEl()?.offsetWidth
  // Step through all states for harness restart
  for (let i = 0; i < STATES.length - 1; i++) {
    await advanceDeadlineClock()
  }
}

function bindUi() {
  document.querySelectorAll('[data-dc-advance]').forEach((btn) => {
    btn.addEventListener('click', () => {
      void advanceDeadlineClock()
    })
  })

  document.querySelectorAll('[data-dc-reset]').forEach((btn) => {
    btn.addEventListener('click', () => {
      resetDeadlineClock()
    })
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') {
      void replayDeadlineClock()
    }
  })
}

bindUi()
resetDeadlineClock()
