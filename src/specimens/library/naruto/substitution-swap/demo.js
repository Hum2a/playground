/**
 * Substitution Swap — Log → decoy-only mid-state → true target, via clip/scale
 * and puff at each swap (not opacity crossfade).
 * iframe-safe; no storage / parent / network.
 */

const TO_DECOY_MS = 120
const DECOY_HOLD_MS = 200
const TO_TARGET_MS = 140
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

function setLayerHidden(name, hidden) {
  const el = document.querySelector(`[data-sbs-layer="${name}"]`)
  if (!el) return
  if (hidden) el.setAttribute('aria-hidden', 'true')
  else el.removeAttribute('aria-hidden')
}

function pop(slot) {
  slot.setAttribute('data-pop', 'true')
  later(PUFF_MS, () => slot.removeAttribute('data-pop'))
}

function showResolved() {
  const slot = slotEl()
  if (!slot) return
  slot.setAttribute('data-active', 'target')
  setLayerHidden('log', true)
  setLayerHidden('decoy', true)
  setLayerHidden('target', false)
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('TARGET')
  setHint('True failover settled.')
  setLive('Substitution resolved. True target active.')
}

function resetVisual() {
  const slot = slotEl()
  slot?.setAttribute('data-active', 'log')
  slot?.removeAttribute('data-pop')
  setLayerHidden('log', false)
  setLayerHidden('decoy', true)
  setLayerHidden('target', true)
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('LOG')
  setHint('Press Run to trigger the substitution.')
  setLive('Substitution idle. Log target active.')
}

/**
 * Auto-run Log → decoy → true target swap sequence.
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
  setLive('Swapping Log for decoy stand-in.')
  pop(slot)
  slot.setAttribute('data-active', 'decoy')
  setLayerHidden('log', true)
  setLayerHidden('decoy', false)
  setLayerHidden('target', true)
  setStatus('DECOY')

  return new Promise((resolve) => {
    later(TO_DECOY_MS + DECOY_HOLD_MS, () => {
      pop(slot)
      setLive('Decoy-only mid-state ending; revealing true target.')
      later(TO_TARGET_MS, () => {
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
