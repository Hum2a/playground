/**
 * Transformation Morph — collapse → ink intermediate → expand with traits.
 * iframe-safe; no storage / parent / network.
 */

const COLLAPSE_MS = 160
const INK_HOLD_MS = 120
const EXPAND_MS = 180
const TOTAL_MS = COLLAPSE_MS + INK_HOLD_MS + EXPAND_MS
const TRAIT_A = 'SPEED'
const TRAIT_B = 'SPEED · GUARD'

let busy = false
let done = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-trm]')
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
  const el = document.querySelector('[data-trm-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-trm-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-trm-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-trm-run], [data-trm-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showDone() {
  done = true
  const cardA = document.querySelector('[data-trm-card-a]')
  const cardB = document.querySelector('[data-trm-card-b]')
  cardA?.setAttribute('aria-hidden', 'true')
  cardB?.setAttribute('aria-hidden', 'false')
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('PROFILE B')
  setHint(`Transformation complete. Inherited ${TRAIT_A}.`)
  setLive(`Profile B expanded with inherited traits ${TRAIT_B}.`)
}

function resetVisual() {
  done = false
  const cardA = document.querySelector('[data-trm-card-a]')
  const cardB = document.querySelector('[data-trm-card-b]')
  cardA?.setAttribute('aria-hidden', 'false')
  cardB?.setAttribute('aria-hidden', 'true')
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('PROFILE A')
  setHint('Press Run to transform.')
  setLive('Idle. Profile A active.')
}

/**
 * Auto-run collapse → ink → expand.
 * @returns {Promise<void>}
 */
export function runTransformationMorph() {
  const root = rootEl()
  if (!root || busy || done) return Promise.resolve()

  busy = true
  clearTimers()
  resetVisual()
  setButtons(false)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    showDone()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  root.setAttribute('data-phase', 'collapsing')
  setStatus('COLLAPSING')
  setHint('Profile A collapsing into ink.')
  setLive('Profile A collapsing.')

  return new Promise((resolve) => {
    later(COLLAPSE_MS, () => {
      root.setAttribute('data-phase', 'ink')
      setStatus('INK')
      setHint('Ink intermediate holding.')
      setLive('Ink blot intermediate — not a crossfade.')
    })

    later(COLLAPSE_MS + INK_HOLD_MS, () => {
      root.setAttribute('data-phase', 'expanding')
      setStatus('EXPANDING')
      setHint('Profile B expanding with traits.')
      setLive(`Expanding Profile B; inheriting ${TRAIT_A}.`)
    })

    later(TOTAL_MS, () => {
      showDone()
      busy = false
      setButtons(true)
      resolve()
    })
  })
}

export function resetTransformationMorph() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayTransformationMorph() {
  if (busy) return
  resetTransformationMorph()
  void rootEl()?.offsetWidth
  await runTransformationMorph()
}

function bindUi() {
  document.querySelector('[data-trm-run]')?.addEventListener('click', () => {
    void runTransformationMorph()
  })
  document.querySelector('[data-trm-replay]')?.addEventListener('click', () => {
    void replayTransformationMorph()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayTransformationMorph()
  })
}

bindUi()
resetTransformationMorph()
