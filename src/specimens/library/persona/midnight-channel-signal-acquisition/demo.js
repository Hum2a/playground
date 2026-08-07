/**
 * Midnight Channel Signal Acquisition — tune through noise until signal locks.
 * iframe-safe; no storage / parent / network.
 */

const LOCK_THRESHOLD = 88

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-mcsa]')
}

function setLive(text) {
  const el = document.querySelector('[data-mcsa-live]')
  if (el) el.textContent = text
}

function setPhase(phase) {
  rootEl()?.setAttribute('data-phase', phase)
}

function setStaticOpacity(value) {
  const el = document.querySelector('[data-mcsa-static]')
  if (el) el.style.opacity = String(value)
}

function applyTune(value) {
  const n = Number(value)
  const ratio = n / 100
  const staticOpacity = Math.max(0, 1 - ratio * 1.15)

  if (prefersReducedMotion()) {
    if (n >= LOCK_THRESHOLD) {
      setPhase('locked')
      setStaticOpacity(0)
      setLive('Signal locked.')
    } else {
      setPhase('idle')
      setStaticOpacity(0.35)
      setLive('Signal idle.')
    }
    return
  }

  setStaticOpacity(staticOpacity)

  if (n >= LOCK_THRESHOLD) {
    setPhase('locked')
    setLive('Signal locked.')
  } else {
    setPhase('tuning')
    setLive(`Tuning… ${n}%`)
  }
}

export function resetMidnightChannel() {
  const input = document.querySelector('[data-mcsa-tune]')
  if (input) input.value = '0'
  setPhase('idle')
  setStaticOpacity(1)
  setLive('Signal idle. Tune to acquire.')
}

function bindUi() {
  const input = document.querySelector('[data-mcsa-tune]')
  input?.addEventListener('input', (e) => {
    applyTune(e.target.value)
  })
  document.querySelector('[data-mcsa-reset]')?.addEventListener('click', resetMidnightChannel)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetMidnightChannel()
  })
}

bindUi()
resetMidnightChannel()
