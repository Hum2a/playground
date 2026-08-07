/**
 * Substitution Swap — primary → decoy-only mid → failover target.
 * iframe-safe; no storage / parent / network.
 */

const TO_DECOY_MS = 100
const DECOY_HOLD_MS = 220
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
  return document.querySelector('[data-ssw]')
}

function slotEl() {
  return document.querySelector('[data-ssw-slot]')
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
  const el = document.querySelector('[data-ssw-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-ssw-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-ssw-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-ssw-run], [data-ssw-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function setLayerHidden(name, hidden) {
  const el = document.querySelector(`[data-ssw-layer="${name}"]`)
  if (el) el.setAttribute('aria-hidden', hidden ? 'true' : 'false')
}

function pop(slot) {
  slot.setAttribute('data-pop', 'true')
  later(PUFF_MS, () => slot.removeAttribute('data-pop'))
}

function showResolved() {
  const slot = slotEl()
  if (!slot) return
  slot.setAttribute('data-active', 'resolved')
  setLayerHidden('primary', true)
  setLayerHidden('decoy', true)
  setLayerHidden('resolved', false)
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('ACTIVE')
  setHint('Substitution resolved.')
  setLive('Substitution resolved. Failover target active.')
}

function resetVisual() {
  const slot = slotEl()
  slot?.setAttribute('data-active', 'primary')
  slot?.removeAttribute('data-pop')
  setLayerHidden('primary', false)
  setLayerHidden('decoy', true)
  setLayerHidden('resolved', true)
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('PRIMARY')
  setHint('Press Run to trigger the substitution.')
  setLive('Substitution idle. Primary target active.')
}

/**
 * Auto-run primary → decoy-only → resolved.
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
  setLive('Puff: primary → log decoy only.')
  pop(slot)
  slot.setAttribute('data-active', 'decoy')
  setLayerHidden('primary', true)
  setLayerHidden('decoy', false)
  setLayerHidden('resolved', true)
  setStatus('DECOY')
  setHint('Mid-state: decoy only.')

  return new Promise((resolve) => {
    later(TO_DECOY_MS + DECOY_HOLD_MS, () => {
      pop(slot)
      setLive('Puff: decoy → failover target.')
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
  document.querySelector('[data-ssw-run]')?.addEventListener('click', () => {
    void runSubstitutionSwap()
  })
  document.querySelector('[data-ssw-replay]')?.addEventListener('click', () => {
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
