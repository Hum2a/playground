/**
 * Seal Stamp Confirmation — overshoot settle + single ring pulse; wax lacquer.
 * iframe-safe; no storage / parent / network.
 */

const DESCENT_MS = 220
const IMPACT_MS = 90
const SETTLE_MS = 160
const PULSE_MS = 280
const OVERSHOOT_DEG = -14
const SETTLE_DEG = 4
const FINAL_DEG = 0

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

function showResolved() {
  const root = rootEl()
  root?.setAttribute('data-phase', 'done')
  root?.removeAttribute('data-impact')
  root?.removeAttribute('data-settle')
  root?.setAttribute('data-pulse', 'true')
  setStatus('FILED')
  setHint('Stamped and filed.')
  setLive(
    `Document stamped. Mark settled ${OVERSHOOT_DEG}° → ${SETTLE_DEG}° → ${FINAL_DEG}° with one ring pulse.`,
  )
  later(PULSE_MS, () => root?.removeAttribute('data-pulse'))
}

function resetVisual() {
  const root = rootEl()
  root?.setAttribute('data-phase', 'idle')
  root?.removeAttribute('data-impact')
  root?.removeAttribute('data-settle')
  root?.removeAttribute('data-pulse')
  setStatus('PENDING')
  setHint('Press Run to strike the seal stamp.')
  setLive('Document pending. No stamp applied.')
}

/**
 * Auto-run the stamp descent, impact overshoot, settle, and ring pulse.
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
    showResolved()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  root.setAttribute('data-phase', 'active')
  setStatus('STRIKING')
  setLive(`Stamp descending toward ${OVERSHOOT_DEG}° overshoot.`)

  return new Promise((resolve) => {
    later(DESCENT_MS, () => {
      root.setAttribute('data-impact', 'true')
      setLive('Stamp struck. Wax mark blooming.')
      later(IMPACT_MS, () => {
        root.removeAttribute('data-impact')
        root.setAttribute('data-phase', 'done')
        root.setAttribute('data-settle', 'true')
        setStatus('SETTLING')
        later(SETTLE_MS, () => {
          root.removeAttribute('data-settle')
          showResolved()
          later(PULSE_MS + 40, () => {
            busy = false
            setButtons(true)
            resolve()
          })
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
