/**
 * Transformation Morph — profile A collapses through a bold silhouette
 * intermediate and expands into profile B.
 * iframe-safe; no storage / parent / network.
 */

const COLLAPSE_MS = 140
const HOLD_MS = 120
const REVEAL_MS = 150
const TOTAL_MS = COLLAPSE_MS + HOLD_MS + REVEAL_MS
const TRAIT_FROM = 'Scout'
const TRAIT_TO = 'Sentinel'

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
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('PROFILE B')
  setHint('Transformation complete.')
  setLive('Transformation complete. Profile B active.')
}

function resetVisual() {
  done = false
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('PROFILE A')
  setHint('Press Run to transform.')
  setLive('Idle. Profile A active.')
}

/**
 * Auto-run full collapse → silhouette → reveal choreography.
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
  setHint('Profile A collapsing.')
  setLive(`Profile A (${TRAIT_FROM}) collapsing into ink mask.`)

  return new Promise((resolve) => {
    later(COLLAPSE_MS, () => {
      root.setAttribute('data-phase', 'silhouette')
      setStatus('INK')
      setHint('Identity inked.')
      setLive('Ink intermediate holding; traits suspended.')
    })

    later(COLLAPSE_MS + HOLD_MS, () => {
      root.setAttribute('data-phase', 'revealing')
      setStatus('EXPANDING')
      setHint(`${TRAIT_TO} expanding.`)
      setLive(`Expanding into Profile B (${TRAIT_TO}) with inherited Scout trait mark.`)
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
