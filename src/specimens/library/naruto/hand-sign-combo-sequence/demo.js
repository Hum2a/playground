/**
 * Hand-Sign Combo Sequence — acquire four abstract glyphs in order.
 * iframe-safe; no storage / parent / network.
 */

const SIGN_COUNT = 4
const STEP_MS = 130
const SETTLE_MS = 90
const TOTAL_MS = SIGN_COUNT * STEP_MS + SETTLE_MS // ~610ms principal sequence

let busy = false
let acquired = 0
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-hscs]')
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
  const el = document.querySelector('[data-hscs-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-hscs-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-hscs-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-hscs-run], [data-hscs-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function slots() {
  return Array.from(document.querySelectorAll('[data-hscs-slot]'))
}

function paintSlots(count, pulseIndex) {
  slots().forEach((slot, i) => {
    const on = i < count
    slot.setAttribute('data-acquired', on ? 'true' : 'false')
    slot.setAttribute(
      'aria-label',
      on ? `Sign ${i + 1} acquired` : `Sign ${i + 1} pending`,
    )
    if (pulseIndex === i) {
      slot.setAttribute('data-pulse', 'true')
      later(STEP_MS, () => slot.removeAttribute('data-pulse'))
    } else {
      slot.removeAttribute('data-pulse')
    }
  })
}

function showResolved() {
  acquired = SIGN_COUNT
  paintSlots(SIGN_COUNT, -1)
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('READY')
  setHint('Sequence complete.')
  setLive('Command sequence ready. All four signs acquired.')
}

function resetVisual() {
  acquired = 0
  paintSlots(0, -1)
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('IDLE')
  setHint('Press Run or keys 1–4 in order.')
  setLive('Command sequence idle. Four signs pending.')
}

/**
 * Auto-run full acquisition (demo Run / replay).
 * @returns {Promise<void>}
 */
export function runHandSignComboSequence() {
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
  setStatus('ACQUIRING')
  setLive('Acquiring command signs.')

  return new Promise((resolve) => {
    let step = 0
    const tick = () => {
      if (step >= SIGN_COUNT) {
        later(SETTLE_MS, () => {
          showResolved()
          busy = false
          setButtons(true)
          resolve()
        })
        return
      }
      acquired = step + 1
      paintSlots(acquired, step)
      setLive(`Sign ${acquired} of ${SIGN_COUNT} acquired.`)
      step += 1
      later(STEP_MS, tick)
    }
    tick()
  })
}

export function resetHandSignComboSequence() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayHandSignComboSequence() {
  if (busy) return
  resetHandSignComboSequence()
  void rootEl()?.offsetWidth
  await runHandSignComboSequence()
}

/**
 * Manual key path: keys 1–4 in order acquire one sign each.
 * @param {number} index 0-based
 */
function acquireOne(index) {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'done') return
  if (index !== acquired) return
  if (prefersReducedMotion()) {
    showResolved()
    return
  }
  root.setAttribute('data-phase', 'active')
  setStatus('ACQUIRING')
  acquired = index + 1
  paintSlots(acquired, index)
  setLive(`Sign ${acquired} of ${SIGN_COUNT} acquired.`)
  if (acquired >= SIGN_COUNT) {
    later(SETTLE_MS, () => showResolved())
  }
}

function bindUi() {
  document.querySelector('[data-hscs-run]')?.addEventListener('click', () => {
    void runHandSignComboSequence()
  })
  document.querySelector('[data-hscs-replay]')?.addEventListener('click', () => {
    void replayHandSignComboSequence()
  })
  window.addEventListener('keydown', (event) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return
    const n = Number(event.key)
    if (n >= 1 && n <= SIGN_COUNT) {
      event.preventDefault()
      acquireOne(n - 1)
    }
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayHandSignComboSequence()
  })
}

void TOTAL_MS
bindUi()
resetHandSignComboSequence()
