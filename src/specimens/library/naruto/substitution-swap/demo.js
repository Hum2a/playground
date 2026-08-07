/**
 * Substitution Swap — primary target swaps through a proxy decoy to the
 * resolved failover target, with a puff flash at each swap point.
 * iframe-safe; no storage / parent / network.
 */

const TO_DECOY_MS = 100
const DECOY_HOLD_MS = 180
const TO_RESOLVED_MS = 140
const PUFF_MS = 120
const SETTLE_MS = 90

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
  return document.querySelector('[data-sbs]')
}

function slotEl() {
  return document.querySelector('[data-sbs-slot]')
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
  const el = document.querySelector('[data-sbs-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-sbs-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-sbs-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-sbs-run], [data-sbs-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function pop(slot) {
  slot.setAttribute('data-pop', 'true')
  later(PUFF_MS, () => slot.removeAttribute('data-pop'))
}

function showResolved() {
  const slot = slotEl()
  if (!slot) return
  slot.setAttribute('data-active', 'resolved')
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('ACTIVE')
  setHint('Substitution resolved.')
  setLive('Substitution resolved. Failover target active.')
}

function resetVisual() {
  const slot = slotEl()
  slot?.setAttribute('data-active', 'primary')
  slot?.removeAttribute('data-pop')
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('PRIMARY')
  setHint('Press Run to trigger the substitution.')
  setLive('Substitution idle. Primary target active.')
}

/**
 * Auto-run the primary → decoy → resolved swap sequence (demo Run).
 * @returns {Promise<void>}
 */
export function runSubstitutionSwap() {
  const root = rootEl()
  const slot = slotEl()
  if (!root || !slot || busy || root.getAttribute('data-phase') === 'done') {
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
  setStatus('SUBSTITUTING')
  setLive('Primary collapsing; decoy-only mid-state.')
  pop(slot)
  slot.setAttribute('data-active', 'decoy')
  setStatus('DECOY')

  return new Promise((resolve) => {
    later(TO_DECOY_MS + DECOY_HOLD_MS, () => {
      pop(slot)
      setStatus('RESOLVING')
      setLive('Swapping decoy for failover target.')
      later(TO_RESOLVED_MS, () => {
        showResolved()
        later(SETTLE_MS, () => {
          busy = false
          setButtons(true)
          resolve()
        })
      })
    })
  })
}

export function resetSubstitutionSwap() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replaySubstitutionSwap() {
  if (busy) return
  resetSubstitutionSwap()
  void rootEl()?.offsetWidth
  await runSubstitutionSwap()
}

function bindUi() {
  document.querySelector('[data-sbs-run]')?.addEventListener('click', () => {
    void runSubstitutionSwap()
  })
  document.querySelector('[data-sbs-replay]')?.addEventListener('click', () => {
    void replaySubstitutionSwap()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replaySubstitutionSwap()
  })
}

bindUi()
resetSubstitutionSwap()
