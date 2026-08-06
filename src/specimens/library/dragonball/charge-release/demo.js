/**
 * SPX-969 Charge Release (DB-004 Charge → Release)
 *
 * Charge ladder: 0 20 40 60 70 85 100
 * Node sizes:    24 34 44 54 60 68 76
 * RELEASE gated at 70%. Canonical demo releases at 85%.
 *
 * Release (ms):
 *   0–70     scaleX 1→.72
 *   70–410   travel ~340ms + 3 afterimages
 *   410–530  target translateX 0→4→-2→0 (120ms) + one impact ring
 *   then     charge 0%, target DEPLOYED, COMMITTED, static
 */

const STEPS = [0, 20, 40, 60, 70, 85, 100]
const NODE_PX = {
  0: 24,
  20: 34,
  40: 44,
  60: 54,
  70: 60,
  85: 68,
  100: 76,
}

const GATE_PCT = 70
const CANONICAL_RELEASE_PCT = 85
const STEP_MS = 140
const COMPRESS_MS = 70
const TRAVEL_MS = 340
const IMPACT_MS = 120
const GHOST_FADE_MS = 90

/** @type {number[]} */
let timers = []
let chargePct = 0
let charging = false
let committed = false
let done = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-charge-release]')
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
  const el = root.querySelector('[data-crl-announce]')
  if (!el) return
  el.textContent = ''
  void el.offsetWidth
  el.textContent = text
}

function setCharge(root, pct) {
  chargePct = pct
  const value = root.querySelector('[data-crl-charge]')
  if (value) value.textContent = `${pct}%`
  root.style.setProperty('--crl-node', `${NODE_PX[pct] ?? 24}px`)
  root.dataset.charge = String(pct)

  const gate = root.querySelector('[data-crl-gate]')
  const releaseBtn = root.querySelector('[data-crl-release]')
  const ready = pct >= GATE_PCT && !committed && !done

  if (gate) {
    gate.textContent = ready ? 'READY TO RELEASE' : 'INSUFFICIENT CHARGE'
  }
  if (releaseBtn) releaseBtn.disabled = !ready

  root.classList.toggle('is-ready', ready && !committed)
}

function setMeta(root, text) {
  const el = root.querySelector('[data-crl-meta]')
  if (el) el.textContent = text
}

function setTargetStatus(root, text) {
  const el = root.querySelector('[data-crl-target-status]')
  if (el) el.textContent = text
}

function clearTravelClasses(root) {
  root.classList.remove(
    'is-compressing',
    'is-travelling',
    'is-impacting',
    'is-ghost-1',
    'is-ghost-2',
    'is-ghost-3',
  )
}

/**
 * Advance charge one discrete step. Returns next pct or null at cap.
 */
function nextStep(pct) {
  const i = STEPS.indexOf(pct)
  if (i < 0) return STEPS[0]
  if (i >= STEPS.length - 1) return null
  return STEPS[i + 1]
}

/**
 * Auto-sequence charge toward a target percent (inclusive).
 * @param {number} [stopAt=100]
 * @returns {Promise<void>}
 */
export function runChargeSequence(stopAt = 100) {
  const root = rootEl()
  if (!root || committed || done) return Promise.resolve()

  const cap = STEPS.includes(stopAt) ? stopAt : 100
  charging = true
  root.dataset.state = 'charging'
  root.classList.add('is-charging')
  const chargeBtn = root.querySelector('[data-crl-charge]')
  if (chargeBtn) chargeBtn.disabled = true
  setAnnounce(root, 'Charging deploy. Reversible until release.')

  if (prefersReducedMotion()) {
    setCharge(root, cap)
    charging = false
    if (chargeBtn) chargeBtn.disabled = false
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    const tick = () => {
      if (committed || done) {
        charging = false
        resolve()
        return
      }
      if (chargePct >= cap) {
        charging = false
        root.classList.remove('is-charging')
        if (chargeBtn) chargeBtn.disabled = false
        root.dataset.state = chargePct >= GATE_PCT ? 'armed' : 'idle'
        resolve()
        return
      }
      const next = nextStep(chargePct)
      if (next == null || next > cap) {
        charging = false
        root.classList.remove('is-charging')
        if (chargeBtn) chargeBtn.disabled = false
        resolve()
        return
      }
      setCharge(root, next)
      later(STEP_MS, tick)
    }

    if (chargePct >= cap) {
      charging = false
      if (chargeBtn) chargeBtn.disabled = false
      resolve()
      return
    }
    // If still at 0, take first step immediately after a beat
    later(STEP_MS, tick)
  })
}

function finishDeployed(root) {
  clearTravelClasses(root)
  root.classList.add('is-complete')
  root.dataset.state = 'complete'
  setCharge(root, 0)
  setTargetStatus(root, 'DEPLOYED')
  setMeta(root, 'COMMITTED')
  committed = true
  done = true
  charging = false

  const chargeBtn = root.querySelector('[data-crl-charge]')
  const releaseBtn = root.querySelector('[data-crl-release]')
  const resetBtn = root.querySelector('[data-crl-reset]')
  if (chargeBtn) chargeBtn.disabled = true
  if (releaseBtn) releaseBtn.disabled = true
  if (resetBtn) resetBtn.hidden = false

  setAnnounce(root, 'Deploy committed. Production deployed.')
}

/**
 * Canonical demo: charge to 85%, then RELEASE to PRODUCTION.
 * @returns {Promise<void>}
 */
export function runChargeRelease() {
  const root = rootEl()
  if (!root || committed || done) return Promise.resolve()

  return runChargeSequence(CANONICAL_RELEASE_PCT).then(() => {
    if (committed || done) return
    if (chargePct < CANONICAL_RELEASE_PCT) {
      setCharge(root, CANONICAL_RELEASE_PCT)
    }
    return executeRelease(root)
  })
}

function executeRelease(root) {
  if (committed || done) return Promise.resolve()
  if (chargePct < GATE_PCT) return Promise.resolve()

  clearTimers()
  charging = false
  committed = true
  root.dataset.state = 'committed'
  root.classList.remove('is-charging', 'is-ready')
  setMeta(root, 'COMMITTED')
  setAnnounce(root, 'Release committed. Deploy travelling to production.')

  const chargeBtn = root.querySelector('[data-crl-charge]')
  const releaseBtn = root.querySelector('[data-crl-release]')
  if (chargeBtn) chargeBtn.disabled = true
  if (releaseBtn) releaseBtn.disabled = true

  // Freeze displayed charge at current value during flight
  const frozen = chargePct
  const value = root.querySelector('[data-crl-charge]')
  if (value) value.textContent = `${frozen}%`

  if (prefersReducedMotion()) {
    finishDeployed(root)
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    root.classList.add('is-compressing')
    void root.offsetWidth

    later(COMPRESS_MS, () => {
      root.classList.remove('is-compressing')
      root.classList.add('is-travelling', 'is-ghost-1', 'is-ghost-2', 'is-ghost-3')
    })

    // Afterimages drop sequentially along the travel
    later(COMPRESS_MS + 80, () => root.classList.remove('is-ghost-1'))
    later(COMPRESS_MS + 80 + GHOST_FADE_MS, () =>
      root.classList.remove('is-ghost-2'),
    )
    later(COMPRESS_MS + 80 + GHOST_FADE_MS * 2, () =>
      root.classList.remove('is-ghost-3'),
    )

    later(COMPRESS_MS + TRAVEL_MS, () => {
      root.classList.remove('is-travelling')
      root.classList.add('is-impacting')
    })

    later(COMPRESS_MS + TRAVEL_MS + IMPACT_MS, () => {
      finishDeployed(root)
      resolve()
    })
  })
}

/**
 * Restore idle reversible state.
 * @returns {Promise<void>}
 */
export function resetChargeRelease() {
  const root = rootEl()
  if (!root) return Promise.resolve()

  clearTimers()
  charging = false
  committed = false
  done = false
  delete root.dataset.manualRelease
  clearTravelClasses(root)
  root.classList.remove('is-charging', 'is-ready', 'is-complete')
  root.dataset.state = 'idle'
  setCharge(root, 0)
  setTargetStatus(root, 'WAITING')
  setMeta(root, 'REVERSIBLE')
  setAnnounce(root, '')

  const chargeBtn = root.querySelector('[data-crl-charge]')
  const releaseBtn = root.querySelector('[data-crl-release]')
  const resetBtn = root.querySelector('[data-crl-reset]')
  if (chargeBtn) chargeBtn.disabled = false
  if (releaseBtn) releaseBtn.disabled = true
  if (resetBtn) resetBtn.hidden = true
  void root.offsetWidth
  return Promise.resolve()
}

function bindUi() {
  const root = rootEl()
  if (!root || root.dataset.crlBound === '1') return
  root.dataset.crlBound = '1'

  setCharge(root, 0)
  setMeta(root, 'REVERSIBLE')
  setTargetStatus(root, 'WAITING')

  root.querySelector('[data-crl-charge]')?.addEventListener('click', () => {
    if (committed || done || charging) return
    // Manual charge: auto-sequence toward 100 (user may RELEASE at 70+)
    void runChargeSequence(100)
  })

  root.querySelector('[data-crl-release]')?.addEventListener('click', () => {
    if (committed || done || chargePct < GATE_PCT) return
    root.dataset.manualRelease = '1'
    void executeRelease(root)
  })

  root.querySelector('[data-crl-reset]')?.addEventListener('click', () => {
    void resetChargeRelease()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void resetChargeRelease()
  })
}

bindUi()
