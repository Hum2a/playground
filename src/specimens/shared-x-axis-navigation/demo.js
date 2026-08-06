/**
 * Shared X-Axis Navigation — hierarchical panel transitions.
 */

const DURATION_MS = 300
const OFFSET_PX = 30
const SCALE_MIN = 0.92

const STEPS = ['Overview', 'Details', 'Confirm']

/** @type {number | null} */
let animFrame = null
let step = 0
let busy = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  return (
    forced ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function rootEl() {
  return document.querySelector('[data-shared-x-axis]')
}

function clearAnim() {
  if (animFrame !== null) {
    window.cancelAnimationFrame(animFrame)
    animFrame = null
  }
}

function panel(i) {
  return document.querySelector(`[data-sxan-panel="${i}"]`)
}

function setStatus(text) {
  document.querySelector('[data-sxan-status]').textContent = text
}

function updateChrome() {
  const root = rootEl()
  root?.setAttribute('data-sxan-step', String(step))
  const progress = document.querySelector('[data-sxan-progress]')
  if (progress) {
    progress.textContent = `Step ${step + 1} of 3 · ${STEPS[step]}`
  }
  const back = document.querySelector('[data-sxan-back]')
  const forward = document.querySelector('[data-sxan-forward]')
  if (back) back.disabled = busy || step === 0
  if (forward) {
    forward.disabled = busy
    forward.textContent = step === 2 ? 'Done' : 'Next'
  }
  setStatus(`${STEPS[step]} panel active.`)
}

function applyInstant(next) {
  step = next
  STEPS.forEach((_, i) => {
    const p = panel(i)
    if (p) p.hidden = i !== next
  })
  updateChrome()
}

function transition(direction) {
  if (busy) return
  const next = step + direction
  if (next < 0 || next > 2) return

  const outgoing = panel(step)
  const incoming = panel(next)
  if (!outgoing || !incoming) return

  if (prefersReducedMotion()) {
    applyInstant(next)
    return
  }

  busy = true
  updateChrome()
  incoming.hidden = false

  const outFrom = 0
  const outTo = direction > 0 ? -OFFSET_PX : OFFSET_PX
  const inFrom = direction > 0 ? OFFSET_PX : -OFFSET_PX
  const inTo = 0
  const start = performance.now()

  function frame(now) {
    const t = Math.min(1, (now - start) / DURATION_MS)
    const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2

    outgoing.style.opacity = String(1 - eased)
    outgoing.style.transform = `translateX(${outFrom + (outTo - outFrom) * eased}px) scale(${1 - (1 - SCALE_MIN) * eased})`
    incoming.style.opacity = String(eased)
    incoming.style.transform = `translateX(${inFrom + (inTo - inFrom) * eased}px) scale(${SCALE_MIN + (1 - SCALE_MIN) * eased})`

    if (t < 1) {
      animFrame = window.requestAnimationFrame(frame)
    } else {
      outgoing.hidden = true
      outgoing.style.cssText = ''
      incoming.style.cssText = ''
      step = next
      busy = false
      updateChrome()
    }
  }

  animFrame = window.requestAnimationFrame(frame)
}

export function resetSharedXAxisNavigation() {
  clearAnim()
  busy = false
  applyInstant(0)
}

export function replaySharedXAxisNavigation() {
  resetSharedXAxisNavigation()
}

function bindUi() {
  document.querySelector('[data-sxan-forward]')?.addEventListener('click', () => {
    if (step < 2) transition(1)
  })
  document.querySelector('[data-sxan-back]')?.addEventListener('click', () => {
    if (step > 0) transition(-1)
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') replaySharedXAxisNavigation()
  })
}

bindUi()
resetSharedXAxisNavigation()

export const SHARED_X_AXIS_CONTRACT = { DURATION_MS, OFFSET_PX, SCALE_MIN }
