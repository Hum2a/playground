/**
 * Transformation Morph — Profile A collapses to scale 0.12, ink intermediate
 * holds, then Profile B expands inheriting the PEAK trait mark.
 * iframe-safe; no storage / parent / network.
 */

const COLLAPSE_MS = 160
const INK_MS = 120
const EXPAND_MS = 160
const COLLAPSE_SCALE = 0.12
const INHERITED_TRAIT = 'MARK · PEAK'
const TOTAL_MS = COLLAPSE_MS + INK_MS + EXPAND_MS

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

function cardA() {
  return document.querySelector('[data-trm-card-a]')
}

function cardB() {
  return document.querySelector('[data-trm-card-b]')
}

function showDone() {
  done = true
  cardA()?.setAttribute('aria-hidden', 'true')
  cardB()?.removeAttribute('aria-hidden')
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('PROFILE B')
  setHint(`Transformed. Inherited ${INHERITED_TRAIT}.`)
  setLive(`Transformation complete. Profile B active with inherited ${INHERITED_TRAIT}.`)
}

function resetVisual() {
  done = false
  cardA()?.removeAttribute('aria-hidden')
  cardB()?.setAttribute('aria-hidden', 'true')
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('PROFILE A')
  setHint('Press Run to transform.')
  setLive('Idle. Profile A active.')
}

/**
 * Auto-run collapse → ink → expand choreography.
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
  setHint(`Profile A collapsing to scale ${COLLAPSE_SCALE}.`)
  setLive(`Profile A collapsing to ${COLLAPSE_SCALE}.`)

  return new Promise((resolve) => {
    later(COLLAPSE_MS, () => {
      root.setAttribute('data-phase', 'ink')
      setStatus('INK')
      setHint('Ink intermediate holding.')
      setLive('Ink blot intermediate — identity masked.')
      cardA()?.setAttribute('aria-hidden', 'true')
    })

    later(COLLAPSE_MS + INK_MS, () => {
      root.setAttribute('data-phase', 'expanding')
      setStatus('EXPANDING')
      setHint('Profile B expanding with inherited trait.')
      setLive(`Profile B expanding; inheriting ${INHERITED_TRAIT}.`)
      cardB()?.removeAttribute('aria-hidden')
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
