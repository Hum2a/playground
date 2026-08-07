/**
 * Summoning Seal Materialise — draw-stroke then panel expands from seal center.
 * iframe-safe; no storage / parent / network.
 */

const RING_OUTER_MS = 300
const RING_INNER_MS = 260
const PANEL_MS = 300
const SETTLE_MS = 100
const OUTER_R = 70
const INNER_R = 46
const TICK_COUNT = 8

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
  return document.querySelector('[data-ssm]')
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
  const el = document.querySelector('[data-ssm-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-ssm-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-ssm-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-ssm-run], [data-ssm-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function ringOuter() {
  return document.querySelector('[data-ssm-ring-outer]')
}

function ringInner() {
  return document.querySelector('[data-ssm-ring-inner]')
}

function ticks() {
  return document.querySelector('[data-ssm-ticks]')
}

function panel() {
  return document.querySelector('[data-ssm-panel]')
}

function showResolved() {
  ringOuter()?.setAttribute('data-drawn', 'true')
  ringInner()?.setAttribute('data-drawn', 'true')
  ticks()?.setAttribute('data-visible', 'true')
  panel()?.setAttribute('data-visible', 'true')
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('MATERIALISED')
  setHint('Panel materialised.')
  setLive('Summoning complete. Panel expanded from seal center.')
}

function resetVisual() {
  ringOuter()?.setAttribute('data-drawn', 'false')
  ringInner()?.setAttribute('data-drawn', 'false')
  ticks()?.setAttribute('data-visible', 'false')
  panel()?.setAttribute('data-visible', 'false')
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('IDLE')
  setHint('Press Run to draw the seal.')
  setLive('Summoning idle. Seal undrawn.')
}

/**
 * Auto-run draw-stroke then center expand.
 * @returns {Promise<void>}
 */
export function runSummoningSealMaterialise() {
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
  setStatus('DRAWING')
  setLive(`Drawing outer ring r=${OUTER_R}.`)

  return new Promise((resolve) => {
    ringOuter()?.setAttribute('data-drawn', 'true')
    later(RING_OUTER_MS, () => {
      ringInner()?.setAttribute('data-drawn', 'true')
      ticks()?.setAttribute('data-visible', 'true')
      setLive(`Inner ring r=${INNER_R} drawn; ${TICK_COUNT} ticks latched.`)
      later(RING_INNER_MS, () => {
        setStatus('MATERIALISING')
        panel()?.setAttribute('data-visible', 'true')
        setLive('Panel expanding from seal center via clip/scale.')
        later(PANEL_MS + SETTLE_MS, () => {
          showResolved()
          busy = false
          setButtons(true)
          resolve()
        })
      })
    })
  })
}

export function resetSummoningSealMaterialise() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replaySummoningSealMaterialise() {
  if (busy) return
  resetSummoningSealMaterialise()
  void rootEl()?.offsetWidth
  await runSummoningSealMaterialise()
}

function bindUi() {
  document.querySelector('[data-ssm-run]')?.addEventListener('click', () => {
    void runSummoningSealMaterialise()
  })
  document.querySelector('[data-ssm-replay]')?.addEventListener('click', () => {
    void replaySummoningSealMaterialise()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replaySummoningSealMaterialise()
  })
}

bindUi()
resetSummoningSealMaterialise()
