/**
 * Quirk Capability Radar Build — radar polygon draws with per-axis stagger.
 */

const BUILD_MS = 580
const AXIS_STAGGER_MS = 90
const AXIS_BUILD_MS = 220
const SETTLE_MS = 650
const TOTAL_MS = BUILD_MS + SETTLE_MS

const CENTER = { x: 100, y: 100 }
const AXES = [
  { x: 100, y: 20 },
  { x: 170, y: 75 },
  { x: 145, y: 165 },
  { x: 55, y: 165 },
  { x: 30, y: 75 },
]
const AXIS_LABELS = ['POWER', 'SPEED', 'RANGE', 'TECH', 'CONTROL']
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

function strengthsAt(elapsed) {
  return VALUES.map((target, i) => {
    const start = i * AXIS_STAGGER_MS
    const t = Math.min(Math.max((elapsed - start) / AXIS_BUILD_MS, 0), 1)
    const eased = 1 - Math.pow(1 - t, 2)
    return target * eased
  })
}

function fillEl() {
  return document.querySelector('[data-qcrd-fill]')
}

function readout() {
  return document.querySelector('[data-qcrd-readout]')
}

function setLive(text) {
  const el = document.querySelector('[data-qcrd-live]')
  if (el) el.textContent = text
}

function announceLocked() {
  if (readout()) readout().textContent = 'PROFILE LOCKED'
  setLive('Profile locked. Capability scan complete.')
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
  setLive('Awaiting capability scan.')
}

export function runQuirkCapabilityRadarBuild() {
  const root = document.querySelector('[data-quirk-capability-radar-build]')
  const fill = fillEl()
  if (!root || !fill || busy) return Promise.resolve()
  busy = true
  root.setAttribute('data-phase', 'building')
  setLive('Scanning capability profile.')

  if (prefersReducedMotion()) {
    fill.setAttribute('points', polygonPoints(VALUES))
    root.classList.add('qcrd--built')
    root.setAttribute('data-phase', 'complete')
    announceLocked()
    busy = false
    return Promise.resolve()
  }

  const t0 = performance.now()

  return new Promise((resolve) => {
    const tick = (now) => {
      const elapsed = now - t0
      const strengths = strengthsAt(elapsed)
      fill.setAttribute('points', polygonPoints(strengths))
      if (elapsed < BUILD_MS) {
        raf = requestAnimationFrame(tick)
      } else {
        fill.setAttribute('points', polygonPoints(VALUES))
        root.classList.add('qcrd--built')
        root.setAttribute('data-phase', 'complete')
        announceLocked()
        window.setTimeout(() => {
          busy = false
          raf = null
          resolve()
        }, SETTLE_MS)
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
