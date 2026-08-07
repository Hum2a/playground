/**
 * Chakra Charge Field — irregular boundary grows through frozen diameters to READY.
 * iframe-safe; no storage / parent / network.
 */

const DIAMETERS_PX = [72,96,118,140]
const STEP_MS = 140
const READY_HOLD_MS = 180
const STEP_COUNT = DIAMETERS_PX.length - 1

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
  return document.querySelector('[data-ccf]')
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
  const el = document.querySelector('[data-ccf-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-ccf-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-ccf-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-ccf-run], [data-ccf-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function setStep(step) {
  const root = rootEl()
  root?.setAttribute('data-step', String(step))
  const pctEl = document.querySelector('[data-ccf-pct]')
  if (pctEl) {
    const d = DIAMETERS_PX[step] ?? DIAMETERS_PX[DIAMETERS_PX.length - 1]
    pctEl.textContent = `${d}px`
  }
}

function showResolved(withHold) {
  const root = rootEl()
  setStep(STEP_COUNT)
  root?.setAttribute('data-phase', 'done')
  setStatus('READY')
  setHint('Charge field ready.')
  setLive('Chakra field ready at 140px irregular boundary.')
  if (withHold && root && !prefersReducedMotion()) {
    root.setAttribute('data-pulse', 'true')
    later(READY_HOLD_MS, () => root.removeAttribute('data-pulse'))
  } else {
    root?.removeAttribute('data-pulse')
  }
}

function resetVisual() {
  const root = rootEl()
  root?.setAttribute('data-phase', 'idle')
  root?.removeAttribute('data-pulse')
  setStep(0)
  setStatus('IDLE')
  setHint('Press Run to grow the charge field.')
  setLive('Charge field idle. Boundary at 72px.')
}

export function runChakraChargeField() {
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
    showResolved(false)
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  root.setAttribute('data-phase', 'active')
  setStatus('CHARGING')
  setLive('Growing irregular chakra boundary.')

  return new Promise((resolve) => {
    let step = 0
    const tick = () => {
      if (step >= STEP_COUNT) {
        later(READY_HOLD_MS, () => {
          showResolved(true)
          busy = false
          setButtons(true)
          resolve()
        })
        return
      }
      step += 1
      setStep(step)
      setLive(`Boundary step ${step}: ${DIAMETERS_PX[step]}px.`)
      later(STEP_MS, tick)
    }
    later(STEP_MS, tick)
  })
}

export function resetChakraChargeField() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

export async function replayChakraChargeField() {
  if (busy) return
  resetChakraChargeField()
  void rootEl()?.offsetWidth
  await runChakraChargeField()
}

function bindUi() {
  document.querySelector('[data-ccf-run]')?.addEventListener('click', () => {
    void runChakraChargeField()
  })
  document.querySelector('[data-ccf-replay]')?.addEventListener('click', () => {
    void replayChakraChargeField()
  })
  document.querySelector('[data-ccf-core]')?.addEventListener('click', () => {
    if (rootEl()?.getAttribute('data-phase') === 'idle') void runChakraChargeField()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayChakraChargeField()
  })
}

bindUi()
resetChakraChargeField()
