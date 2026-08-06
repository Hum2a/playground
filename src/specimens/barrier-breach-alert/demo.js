/**
 * Barrier Breach Alert — an intact perimeter fractures at one fixed point.
 * iframe-safe; no storage / parent / network.
 */

const ALARM_MS = 700
const SETTLE_MS = 60
const TOTAL_MS = ALARM_MS + SETTLE_MS

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
  return document.querySelector('[data-bba]')
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
  const el = document.querySelector('[data-bba-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-bba-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-bba-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-bba-run], [data-bba-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showResolved() {
  rootEl()?.setAttribute('data-phase', 'breached')
  setStatus('BREACH DETECTED')
  setHint('Perimeter compromised at marked point.')
  setLive('Barrier breached. Alert active at the fracture point.')
}

function resetVisual() {
  rootEl()?.setAttribute('data-phase', 'secure')
  setStatus('SECURE')
  setHint('Press Run to simulate a breach.')
  setLive('Perimeter secure. No breach detected.')
}

/**
 * Auto-run the breach sequence (Run / replay).
 * @returns {Promise<void>}
 */
export function runBarrierBreachAlert() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'breached') {
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

  root.setAttribute('data-phase', 'breaching')
  setStatus('BREACHING')
  setLive('Perimeter fracturing. Alert incoming.')

  return new Promise((resolve) => {
    later(ALARM_MS, () => {
      later(SETTLE_MS, () => {
        showResolved()
        busy = false
        setButtons(true)
        resolve()
      })
    })
  })
}

export function resetBarrierBreachAlert() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayBarrierBreachAlert() {
  if (busy) return
  resetBarrierBreachAlert()
  void rootEl()?.offsetWidth
  await runBarrierBreachAlert()
}

function bindUi() {
  document.querySelector('[data-bba-run]')?.addEventListener('click', () => {
    void runBarrierBreachAlert()
  })
  document.querySelector('[data-bba-replay]')?.addEventListener('click', () => {
    void replayBarrierBreachAlert()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayBarrierBreachAlert()
  })
}

void TOTAL_MS
bindUi()
resetBarrierBreachAlert()
