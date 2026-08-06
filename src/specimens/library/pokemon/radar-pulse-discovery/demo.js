/**
 * Radar Pulse Discovery (SPX-946) — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * Frozen reaction times (ms from SCAN) — ring-1 leading edge ≈ reach:
 *   D  396
 *   C  453
 *   A  577
 *   B  819
 * Rings: 0 / 180 / 360 start; each 900ms; clear after last finishes (1260).
 */

const RING_MS = 900
const RING3_DELAY = 360
const CLEAR_MS = RING3_DELAY + RING_MS

const REACT = {
  D: 396,
  C: 453,
  A: 577,
  B: 819,
}

let busy = false
let found = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
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

function rootEl() {
  return document.querySelector('[data-radar-pulse]')
}

function setFoundStatus(on) {
  const idle = document.querySelector('[data-rp-word-idle]')
  const fin = document.querySelector('[data-rp-word-found]')
  if (idle) idle.setAttribute('aria-hidden', on ? 'true' : 'false')
  if (fin) fin.setAttribute('aria-hidden', on ? 'false' : 'true')
  rootEl()?.classList.toggle('is-found-status', on)
}

function clearPhases(root) {
  root.classList.remove(
    'is-scanning',
    'is-pulse',
    'is-react-a',
    'is-react-b',
    'is-react-c',
    'is-react-d',
    'is-link',
    'is-done',
    'is-rm',
  )
  for (const t of root.querySelectorAll('[data-rp-target]')) {
    t.classList.remove('is-hit', 'is-found')
  }
}

function applyFoundFinal(root) {
  clearPhases(root)
  root.classList.add('is-done')
  root.setAttribute('data-state', 'found')
  root.querySelector('[data-rp-target="C"]')?.classList.add('is-found')
  setFoundStatus(true)
  found = true
}

function resetVisual() {
  const root = rootEl()
  if (!root) return
  clearPhases(root)
  root.setAttribute('data-state', 'idle')
  setFoundStatus(false)
  found = false
  const btn = root.querySelector('[data-rp-scan]')
  if (btn) {
    btn.textContent = 'SCAN'
    btn.disabled = false
  }
}

/**
 * Emit three radar pulses and discover NODE // C.
 * @returns {Promise<void>}
 */
export function runRadarPulseScan() {
  if (busy) return Promise.resolve()
  const root = rootEl()
  if (!root) return Promise.resolve()

  if (found) {
    return runRadarPulseReset().then(() => runRadarPulseScan())
  }

  busy = true
  clearTimers()
  resetVisual()
  void root.offsetWidth

  const btn = root.querySelector('[data-rp-scan]')
  if (btn) btn.disabled = true

  if (prefersReducedMotion()) {
    root.classList.add('is-rm')
    applyFoundFinal(root)
    if (btn) btn.disabled = false
    busy = false
    return Promise.resolve()
  }

  root.classList.add('is-scanning', 'is-pulse')
  root.setAttribute('data-state', 'scanning')

  return new Promise((resolve) => {
    later(REACT.D, () => {
      root.classList.add('is-react-d')
      root.querySelector('[data-rp-target="D"]')?.classList.add('is-hit')
    })

    later(REACT.C, () => {
      root.classList.add('is-react-c')
      root.querySelector('[data-rp-target="C"]')?.classList.add('is-hit', 'is-found')
      root.classList.add('is-link')
      setFoundStatus(true)
    })

    later(REACT.A, () => {
      root.classList.add('is-react-a')
      root.querySelector('[data-rp-target="A"]')?.classList.add('is-hit')
    })

    later(REACT.B, () => {
      root.classList.add('is-react-b')
      root.querySelector('[data-rp-target="B"]')?.classList.add('is-hit')
    })

    later(CLEAR_MS, () => {
      root.classList.remove('is-pulse', 'is-scanning')
      root.classList.add('is-done')
      root.setAttribute('data-state', 'found')
      found = true
      if (btn) btn.disabled = false
      busy = false
      resolve()
    })
  })
}

/**
 * Restore idle field (no signal).
 * @returns {Promise<void>}
 */
export function runRadarPulseReset() {
  clearTimers()
  busy = false
  resetVisual()
  void rootEl()?.offsetWidth
  return Promise.resolve()
}

function bindUi() {
  document.querySelector('[data-rp-scan]')?.addEventListener('click', () => {
    void runRadarPulseScan()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') {
      void runRadarPulseReset().then(() => runRadarPulseScan())
    }
  })
}

bindUi()
