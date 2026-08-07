/**
 * Error Substitution Recovery — fault → decoy residue → recovery latch.
 * iframe-safe; no storage / parent / network.
 */

const FAULT_MS = 170
const SUB_MS = 100
const LATCH_MS = 140
const RESIDUE_MS = 180
const SETTLE_MS = 90
const TOTAL_MS = FAULT_MS + SUB_MS + LATCH_MS + RESIDUE_MS + SETTLE_MS

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
  root?.setAttribute('data-residue', 'clear')
  later(RESIDUE_MS, () => root?.removeAttribute('data-residue'))
  setStatus('RECOVERED')
  setHint('Fallback latched ACTIVE.')
  setLive('Fault recovered. Fallback Service B latched ACTIVE; primary FAULTED.')
}

function resetVisual() {
  recovered = false
  setBadges('NOMINAL', 'STANDBY')
  const root = rootEl()
  root?.setAttribute('data-phase', 'idle')
  root?.removeAttribute('data-residue')
  setStatus('NOMINAL')
  setHint('Press Run to simulate a fault.')
  setLive('Service nominal. No fault detected.')
}

/**
 * Auto-run fault → substitute with residue → latch recovered.
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
      setHint('Decoy residue present; swapping.')
      setBadges('FAULTED', 'ACQUIRING')
      setLive('Substituting fallback. Decoy residue visible.')
    })
    later(FAULT_MS + SUB_MS + LATCH_MS, () => {
      showRecovered()
    })
    later(TOTAL_MS, () => {
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
