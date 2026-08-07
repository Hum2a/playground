/**
 * Seal Stamp Confirmation — descent, impact squash, overshoot settle, one ring pulse.
 * iframe-safe; no storage / parent / network.
 */

const DESCENT_MS = 220
const IMPACT_MS = 90
const SETTLE_MS = 180
const RING_MS = 280
const OVERSHOOT_DEG = -14
const SETTLE_DEG = -6

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
  return document.querySelector('[data-ssc]')
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
  const el = document.querySelector('[data-ssc-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-ssc-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-ssc-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-ssc-run], [data-ssc-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showResolved(withRing) {
  const root = rootEl()
  root?.setAttribute('data-phase', 'done')
  root?.removeAttribute('data-impact')
  setStatus('FILED')
  setHint(`Stamped at ${SETTLE_DEG}°.`)
  setLive(`Document stamped. Seal settled at ${SETTLE_DEG}°.`)
  if (withRing && root && !prefersReducedMotion()) {
    root.setAttribute('data-ring', 'true')
    later(RING_MS, () => root.removeAttribute('data-ring'))
  } else {
    root?.removeAttribute('data-ring')
  }
}

function resetVisual() {
  const root = rootEl()
  root?.setAttribute('data-phase', 'idle')
  root?.removeAttribute('data-impact')
  root?.removeAttribute('data-ring')
  setStatus('PENDING')
  setHint('Press Run to strike the seal stamp.')
  setLive('Document pending. No stamp applied.')
}

/**
 * Auto-run the stamp descent, impact, settle, and one ring pulse.
 * @returns {Promise<void>}
 */
export function runSealStampConfirmation() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'done') {
    return Promise.resolve()
  }

  busy = true
  clearTimers()
  resetVisual()
  setButtons(false)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    showResolved(false)
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  root.setAttribute('data-phase', 'active')
  setStatus('STRIKING')
  setLive('Stamp descending.')

  return new Promise((resolve) => {
    later(DESCENT_MS, () => {
      root.setAttribute('data-impact', 'true')
      setLive('Stamp struck the document.')
      later(IMPACT_MS, () => {
        root.removeAttribute('data-impact')
        showResolved(true)
        setLive(
          `Ink mark overshot ${OVERSHOOT_DEG}° then settled to ${SETTLE_DEG}°; ring pulsed once.`,
        )
        later(SETTLE_MS + RING_MS, () => {
          busy = false
          setButtons(true)
          resolve()
        })
      })
    })
  })
}

export function resetSealStampConfirmation() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replaySealStampConfirmation() {
  if (busy) return
  resetSealStampConfirmation()
  void rootEl()?.offsetWidth
  await runSealStampConfirmation()
}

function bindUi() {
  document.querySelector('[data-ssc-run]')?.addEventListener('click', () => {
    void runSealStampConfirmation()
  })
  document.querySelector('[data-ssc-replay]')?.addEventListener('click', () => {
    void replaySealStampConfirmation()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replaySealStampConfirmation()
  })
}

bindUi()
resetSealStampConfirmation()
