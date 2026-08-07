/**
 * Error Substitution Recovery — fault → decoy residue → latched fallback recovery.
 * iframe-safe; no storage / parent / network.
 */

const FAULT_MS = 170
const SUB_MS = 120
const LATCH_MS = 140
const SETTLE_MS = 90
const RESIDUE_COUNT = 4
const TOTAL_MS = FAULT_MS + SUB_MS + LATCH_MS + SETTLE_MS

let busy = false
let recovered = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-esr]')
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

function setLive(text) {
  const el = document.querySelector('[data-esr-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-esr-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-esr-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-esr-run], [data-esr-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function setBadges(primary, fallback) {
  const p = document.querySelector('[data-esr-badge-primary]')
  const f = document.querySelector('[data-esr-badge-fallback]')
  if (p) p.textContent = primary
  if (f) f.textContent = fallback
}

function showRecovered() {
  recovered = true
  setBadges('FAULTED', 'ACTIVE')
  const root = rootEl()
  root?.setAttribute('data-phase', 'recovered')
  root?.setAttribute('data-latched', 'true')
  root?.removeAttribute('data-residue')
  setStatus('RECOVERED')
  setHint('Fallback latched active.')
  setLive('Fault recovered. Fallback service latched ACTIVE.')
}

function resetVisual() {
  recovered = false
  setBadges('NOMINAL', 'STANDBY')
  const root = rootEl()
  root?.setAttribute('data-phase', 'idle')
  root?.removeAttribute('data-latched')
  root?.removeAttribute('data-residue')
  setStatus('NOMINAL')
  setHint('Press Run to simulate a fault.')
  setLive('Service nominal. No fault detected.')
}

/**
 * Auto-run full fault → substitute → latch recover choreography.
 * @returns {Promise<void>}
 */
export function runErrorSubstitutionRecovery() {
  const root = rootEl()
  if (!root || busy || recovered) return Promise.resolve()

  busy = true
  clearTimers()
  resetVisual()
  setButtons(false)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    showRecovered()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  root.setAttribute('data-phase', 'error')
  setStatus('FAULT DETECTED')
  setHint('Primary service failing.')
  setBadges('FAULTING', 'STANDBY')
  setLive('Fault detected on primary service.')

  return new Promise((resolve) => {
    later(FAULT_MS, () => {
      root.setAttribute('data-phase', 'substituting')
      root.setAttribute('data-residue', 'true')
      setStatus('SUBSTITUTING')
      setHint('Decoy residue visible; acquiring fallback.')
      setBadges('FAULTED', 'ACQUIRING')
      setLive(`Substituting fallback with ${RESIDUE_COUNT} decoy residue marks.`)
    })
    later(FAULT_MS + SUB_MS, () => {
      root.setAttribute('data-phase', 'recovered')
      root.setAttribute('data-latched', 'true')
      root.removeAttribute('data-residue')
      setBadges('FAULTED', 'ACTIVE')
      setStatus('LATCHING')
      setLive('Recovery latch closing on fallback.')
    })
    later(TOTAL_MS, () => {
      showRecovered()
      busy = false
      setButtons(true)
      resolve()
    })
  })
}

export function resetErrorSubstitutionRecovery() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayErrorSubstitutionRecovery() {
  if (busy) return
  resetErrorSubstitutionRecovery()
  void rootEl()?.offsetWidth
  await runErrorSubstitutionRecovery()
}

function bindUi() {
  document.querySelector('[data-esr-run]')?.addEventListener('click', () => {
    void runErrorSubstitutionRecovery()
  })
  document.querySelector('[data-esr-replay]')?.addEventListener('click', () => {
    void replayErrorSubstitutionRecovery()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayErrorSubstitutionRecovery()
  })
}

bindUi()
resetErrorSubstitutionRecovery()
