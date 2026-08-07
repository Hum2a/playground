/**
 * SPX-970 Overcharge Warning (DB-005)
 *
 * Ladder: 72 → 84 → 93 → 100 (hold 160ms, NOMINAL MAXIMUM)
 *         → 106 (two markers) → 112 (1px frame shift) → 118 OVERCHARGED
 * Hard limit 125% visible; canonical demo does not cross it.
 */

const STEPS = [72, 84, 93, 100, 106, 112, 118]
const HOLD_AT_100_MS = 160
const STEP_MS = 150
const SAFE_MAX = 100
const HARD_LIMIT = 125
const FINAL = 118

/** @type {number[]} */
let timers = []
let busy = false
let done = false
let value = 72

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-overcharge-warning]')
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
  const el = root.querySelector('[data-ocw-announce]')
  if (!el) return
  el.textContent = ''
  void el.offsetWidth
  el.textContent = text
}

function fillPercents(pct) {
  const safe = Math.min(pct, SAFE_MAX)
  const overflow = Math.max(0, Math.min(pct, HARD_LIMIT) - SAFE_MAX)
  return {
    safeFill: `${safe}%`,
    overflowFill: `${(overflow / (HARD_LIMIT - SAFE_MAX)) * 100}%`,
  }
}

function applyValue(root, pct, { status } = {}) {
  value = pct
  const fills = fillPercents(pct)

  root.style.setProperty('--ocw-safe-fill', fills.safeFill)
  root.style.setProperty('--ocw-overflow-fill', fills.overflowFill)
  root.dataset.value = String(pct)

  const pctEl = root.querySelector('[data-ocw-pct]')
  if (pctEl) pctEl.textContent = `${pct}%`

  const meter = root.querySelector('[data-ocw-meter]')
  if (meter) {
    meter.setAttribute('aria-valuenow', String(pct))
    let text = `${pct}% of compute reserve`
    if (pct > SAFE_MAX) {
      text = `${pct}%, above safe capacity of ${SAFE_MAX}%, hard limit ${HARD_LIMIT}%`
    } else if (pct === SAFE_MAX) {
      text = `${pct}%, at safe capacity of ${SAFE_MAX}%, hard limit ${HARD_LIMIT}%`
    }
    meter.setAttribute('aria-valuetext', text)
  }

  const statusEl = root.querySelector('[data-ocw-status]')
  if (statusEl && status) statusEl.textContent = status

  root.classList.toggle('is-overflowing', pct > SAFE_MAX)
  root.classList.toggle('is-ruptured', pct > SAFE_MAX)
  root.classList.toggle('is-at-max', pct === SAFE_MAX)
  root.classList.toggle('has-warn-marks', pct >= 106)
  root.classList.toggle('has-frame-shift', pct >= 112)
  root.classList.toggle('has-hatch', pct >= 118)
  root.classList.toggle('is-overcharged', pct >= 118)
}

function setControls(root, { run, resetVisible }) {
  const runBtn = root.querySelector('[data-ocw-run]')
  const resetBtn = root.querySelector('[data-ocw-reset]')
  if (runBtn) runBtn.disabled = !run
  if (resetBtn) resetBtn.hidden = !resetVisible
}

function finish(root) {
  applyValue(root, FINAL, { status: 'OVERCHARGED' })
  root.dataset.state = 'overcharged'
  root.classList.add('is-complete')
  busy = false
  done = true
  setControls(root, { run: false, resetVisible: true })
  setAnnounce(
    root,
    `${FINAL}%, above safe capacity of ${SAFE_MAX}%, hard limit ${HARD_LIMIT}%.`,
  )
}

/**
 * Run overcharge sequence from 72% to canonical 118%.
 * @returns {Promise<void>}
 */
export function runOverchargeWarning() {
  const root = rootEl()
  if (!root || busy || done) return Promise.resolve()

  busy = true
  clearTimers()
  root.classList.remove('is-complete')
  root.classList.add('is-running')
  root.dataset.state = 'running'
  setControls(root, { run: false, resetVisible: false })
  applyValue(root, 72, { status: 'LOADING' })
  setAnnounce(root, 'Increasing compute reserve load.')
  void root.offsetWidth

  if (prefersReducedMotion()) {
    root.classList.add(
      'is-overflowing',
      'is-ruptured',
      'has-warn-marks',
      'has-frame-shift',
      'has-hatch',
    )
    finish(root)
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    let i = 0

    const advance = () => {
      i += 1
      if (i >= STEPS.length) {
        finish(root)
        resolve()
        return
      }

      const pct = STEPS[i]

      if (pct <= SAFE_MAX) {
        applyValue(root, pct, {
          status: pct === SAFE_MAX ? 'NOMINAL MAXIMUM' : 'LOADING',
        })
        if (pct === SAFE_MAX) {
          root.dataset.state = 'nominal'
          setAnnounce(root, 'Nominal maximum. Safe capacity reached.')
          later(HOLD_AT_100_MS, () => {
            root.classList.add('is-unfolding')
            later(STEP_MS, advance)
          })
          return
        }
        later(STEP_MS, advance)
        return
      }

      // Overflow region unfolded
      root.classList.add('is-overflowing')
      root.classList.remove('is-unfolding')
      root.dataset.state = 'overflow'

      let status = 'OVERFLOW'
      if (pct >= 118) status = 'OVERCHARGED'
      applyValue(root, pct, { status })

      if (pct === 106) {
        setAnnounce(root, '106%, above safe capacity of 100%, hard limit 125%.')
      } else if (pct === 112) {
        setAnnounce(root, '112%, above safe capacity of 100%, hard limit 125%.')
      } else if (pct === 118) {
        finish(root)
        resolve()
        return
      }

      later(STEP_MS, advance)
    }

    // Start already at 72; take first step after a beat
    later(STEP_MS, advance)
  })
}

/**
 * Restore idle 72% state.
 * @returns {Promise<void>}
 */
export function resetOverchargeWarning() {
  const root = rootEl()
  if (!root) return Promise.resolve()

  clearTimers()
  busy = false
  done = false
  root.classList.remove(
    'is-running',
    'is-overflowing',
    'is-ruptured',
    'is-at-max',
    'is-unfolding',
    'has-warn-marks',
    'has-frame-shift',
    'has-hatch',
    'is-overcharged',
    'is-complete',
  )
  root.dataset.state = 'idle'
  applyValue(root, 72, { status: 'LOADING' })
  setControls(root, { run: true, resetVisible: false })
  setAnnounce(root, '')
  void root.offsetWidth
  return Promise.resolve()
}

function bindUi() {
  const root = rootEl()
  if (!root || root.dataset.ocwBound === '1') return
  root.dataset.ocwBound = '1'

  applyValue(root, 72, { status: 'LOADING' })
  setControls(root, { run: true, resetVisible: false })

  root.querySelector('[data-ocw-run]')?.addEventListener('click', () => {
    void runOverchargeWarning()
  })

  root.querySelector('[data-ocw-reset]')?.addEventListener('click', () => {
    void resetOverchargeWarning()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void resetOverchargeWarning()
  })
}

bindUi()
