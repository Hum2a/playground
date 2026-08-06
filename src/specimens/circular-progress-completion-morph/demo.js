/**
 * Circular Progress Completion Morph — ring reaches 100% then morphs into check geometry.
 * Sandbox-safe (no parent / storage / network).
 */

const RING_SIZE = 72
const STROKE = 5
const RADIUS = 33.5
const CIRC = 2 * Math.PI * RADIUS
const PROGRESS_STEPS = [0, 18, 37, 61, 84, 100]
const PROGRESS_MS = 1100
const HOLD_MS = 100
const MORPH_MS = 240
const RETAINED_ARC_DEG = 110

/** @type {number[]} */
let timers = []
let busy = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-circular-progress]')
}

function ringEl() {
  return document.querySelector('[data-cpcm-ring]')
}

function labelEl() {
  return document.querySelector('[data-cpcm-label]')
}

function statusEl() {
  return document.querySelector('[data-cpcm-status]')
}

function checkA() {
  return document.querySelector('[data-cpcm-check-a]')
}

function checkB() {
  return document.querySelector('[data-cpcm-check-b]')
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

function setPhase(phase) {
  const root = rootEl()
  if (root) root.setAttribute('data-phase', phase)
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function setProgress(pct) {
  const ring = ringEl()
  if (!ring) return
  const offset = CIRC * (1 - pct / 100)
  ring.style.strokeDasharray = `${CIRC}`
  ring.style.strokeDashoffset = String(offset)
  ring.style.setProperty('--cpcm-pct', String(pct))
}

function initRing() {
  const ring = ringEl()
  if (!ring) return
  ring.style.strokeDasharray = `${CIRC}`
  ring.style.strokeDashoffset = String(CIRC)
  ring.style.transform = 'rotate(-90deg)'
  ring.style.transformOrigin = '36px 36px'
}

function hideChecks() {
  const a = checkA()
  const b = checkB()
  if (a) {
    a.setAttribute('x1', '36')
    a.setAttribute('y1', '36')
    a.setAttribute('x2', '36')
    a.setAttribute('y2', '36')
    a.style.opacity = '0'
  }
  if (b) {
    b.setAttribute('x1', '36')
    b.setAttribute('y1', '36')
    b.setAttribute('x2', '36')
    b.setAttribute('y2', '36')
    b.style.opacity = '0'
  }
}

function showChecks(progress) {
  const a = checkA()
  const b = checkB()
  if (!a || !b) return
  const p = Math.min(1, Math.max(0, progress))
  const ax1 = 28
  const ay1 = 38
  const ax2 = 33
  const ay2 = 44
  const bx1 = 33
  const by1 = 44
  const bx2 = 46
  const by2 = 30
  a.setAttribute('x1', String(ax1))
  a.setAttribute('y1', String(ay1))
  a.setAttribute('x2', String(ax1 + (ax2 - ax1) * p))
  a.setAttribute('y2', String(ay1 + (ay2 - ay1) * p))
  b.setAttribute('x1', String(bx1))
  b.setAttribute('y1', String(by1))
  b.setAttribute('x2', String(bx1 + (bx2 - bx1) * p))
  b.setAttribute('y2', String(by1 + (by2 - by1) * p))
  a.style.opacity = String(p)
  b.style.opacity = String(p)
}

function morphToComplete() {
  const ring = ringEl()
  if (!ring) return
  setPhase('morphing')
  setStatus('Morphing ring into completion mark.')

  const retained = (RETAINED_ARC_DEG / 360) * CIRC
  const startOffset = 0
  const endOffset = CIRC - retained
  const start = performance.now()

  function tick(now) {
    const t = Math.min(1, (now - start) / MORPH_MS)
    const eased = 1 - (1 - t) ** 2
    const offset = startOffset + (endOffset - startOffset) * eased
    ring.style.strokeDashoffset = String(offset)
    showChecks(eased)
    if (t < 1) {
      requestAnimationFrame(tick)
    } else {
      setPhase('complete')
      const label = labelEl()
      if (label) label.textContent = 'COMPLETE'
      setStatus('Export complete. Completion geometry is static.')
      busy = false
    }
  }

  if (prefersReducedMotion()) {
    ring.style.strokeDashoffset = String(endOffset)
    showChecks(1)
    setPhase('complete')
    const label = labelEl()
    if (label) label.textContent = 'COMPLETE'
    setStatus('Export complete. Completion geometry is static.')
    busy = false
    return
  }

  requestAnimationFrame(tick)
}

export function resetCircularProgressMorph() {
  clearTimers()
  busy = false
  initRing()
  hideChecks()
  setProgress(0)
  setPhase('idle')
  const label = labelEl()
  if (label) label.textContent = 'EXPORT'
  setStatus('Ready. Press START EXPORT to run progression.')
  const run = document.querySelector('[data-cpcm-run]')
  if (run) run.disabled = false
}

export function runCircularProgressMorph() {
  if (busy) return
  busy = true
  clearTimers()
  initRing()
  hideChecks()
  setPhase('progress')
  setStatus('Export running.')
  const run = document.querySelector('[data-cpcm-run]')
  if (run) run.disabled = true

  if (prefersReducedMotion()) {
    setProgress(100)
    later(HOLD_MS, () => morphToComplete())
    return
  }

  const stepCount = PROGRESS_STEPS.length - 1
  const stepMs = PROGRESS_MS / stepCount

  PROGRESS_STEPS.forEach((pct, i) => {
    later(i * stepMs, () => {
      setProgress(pct)
      setStatus(`Export ${pct}%.`)
      if (pct === 100) {
        later(HOLD_MS, () => morphToComplete())
      }
    })
  })
}

function bindUi() {
  const run = document.querySelector('[data-cpcm-run]')
  if (run) {
    run.addEventListener('click', () => runCircularProgressMorph())
  }
  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetCircularProgressMorph()
    }
  })
}

bindUi()
resetCircularProgressMorph()

export const CIRCULAR_PROGRESS_MORPH_CONTRACT = {
  RING_SIZE,
  STROKE,
  PROGRESS_STEPS,
  PROGRESS_MS,
  HOLD_MS,
  MORPH_MS,
  RETAINED_ARC_DEG,
}
