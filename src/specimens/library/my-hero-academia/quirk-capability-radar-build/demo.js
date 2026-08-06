/**
 * Quirk Capability Radar Build — radar polygon draws to fixed values.
 */

const PRIMARY_MS = 580
const TOTAL_MS = 1230

const CENTER = { x: 100, y: 100 }
const AXES = [
  { x: 100, y: 20 },
  { x: 170, y: 75 },
  { x: 145, y: 165 },
  { x: 55, y: 165 },
  { x: 30, y: 75 },
]
const VALUES = [0.82, 0.64, 0.48, 0.71, 0.9]

let busy = false
let raf = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function lerp(a, b, t) {
  return a + (b - a) * t
}

function pointAt(axisIndex, strength) {
  const tip = AXES[axisIndex]
  return {
    x: lerp(CENTER.x, tip.x, strength),
    y: lerp(CENTER.y, tip.y, strength),
  }
}

function polygonPoints(strengths) {
  return strengths
    .map((s, i) => {
      const p = pointAt(i, s)
      return `${p.x},${p.y}`
    })
    .join(' ')
}

function fillEl() {
  return document.querySelector('[data-qcrd-fill]')
}

function readout() {
  return document.querySelector('[data-qcrd-readout]')
}

export function resetQuirkCapabilityRadarBuild() {
  if (raf !== null) cancelAnimationFrame(raf)
  busy = false
  const root = document.querySelector('[data-quirk-capability-radar-build]')
  const fill = fillEl()
  if (!root || !fill) return
  root.classList.remove('qcrd--built')
  root.setAttribute('data-phase', 'idle')
  fill.setAttribute('points', polygonPoints([0, 0, 0, 0, 0]))
  if (readout()) readout().textContent = 'AWAITING SCAN'
}

export function runQuirkCapabilityRadarBuild() {
  const root = document.querySelector('[data-quirk-capability-radar-build]')
  const fill = fillEl()
  if (!root || !fill || busy) return Promise.resolve()
  busy = true
  root.setAttribute('data-phase', 'building')

  if (prefersReducedMotion()) {
    fill.setAttribute('points', polygonPoints(VALUES))
    root.classList.add('qcrd--built')
    root.setAttribute('data-phase', 'complete')
    if (readout()) readout().textContent = 'PROFILE LOCKED'
    busy = false
    return Promise.resolve()
  }

  const t0 = performance.now()

  return new Promise((resolve) => {
    const tick = (now) => {
      const t = Math.min((now - t0) / PRIMARY_MS, 1)
      const eased = 1 - Math.pow(1 - t, 2)
      const strengths = VALUES.map((v) => v * eased)
      fill.setAttribute('points', polygonPoints(strengths))
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        root.classList.add('qcrd--built')
        root.setAttribute('data-phase', 'complete')
        if (readout()) readout().textContent = 'PROFILE LOCKED'
        window.setTimeout(() => {
          busy = false
          raf = null
          resolve()
        }, TOTAL_MS - PRIMARY_MS)
      }
    }
    raf = requestAnimationFrame(tick)
  })
}

function bind() {
  document.querySelector('[data-qcrd-trigger]')?.addEventListener('click', () => {
    const root = document.querySelector('[data-quirk-capability-radar-build]')
    if (root?.classList.contains('qcrd--built')) {
      resetQuirkCapabilityRadarBuild()
      window.setTimeout(() => void runQuirkCapabilityRadarBuild(), 40)
      return
    }
    void runQuirkCapabilityRadarBuild()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetQuirkCapabilityRadarBuild()
    }
  })
}

bind()
