/**
 * Escalating Burst Multiplier — tiny portable temporary multiplier API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * Stages: 1× → 2× → 4× → 10× → 20×
 * Slam ~120ms; at 20× hold 100ms then four sectors shift 3px.
 */

/** @typedef {{ id: string, label: string, output: string, load: number, stability: number, status: string, contours: number, fragments: number, broken: boolean }} Stage */

/** @type {Stage[]} */
const STAGES = [
  {
    id: '1',
    label: '1×',
    output: '100/s',
    load: 42,
    stability: 100,
    status: 'NOMINAL',
    contours: 0,
    fragments: 0,
    broken: false,
  },
  {
    id: '2',
    label: '2×',
    output: '200/s',
    load: 58,
    stability: 91,
    status: 'NOMINAL',
    contours: 1,
    fragments: 0,
    broken: false,
  },
  {
    id: '4',
    label: '4×',
    output: '400/s',
    load: 72,
    stability: 76,
    status: 'NOMINAL',
    contours: 2,
    fragments: 0,
    broken: false,
  },
  {
    id: '10',
    label: '10×',
    output: '1,000/s',
    load: 89,
    stability: 48,
    status: 'STRAINED',
    contours: 3,
    fragments: 4,
    broken: false,
  },
  {
    id: '20',
    label: '20×',
    output: '2,000/s',
    load: 98,
    stability: 17,
    status: 'UNSTABLE',
    contours: 3,
    fragments: 8,
    broken: true,
  },
]

const SLAM_MS = 120
const HOLD_MS = 100
const SHIFT_MS = 180

let index = 0
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
  return document.querySelector('[data-escalating-burst]')
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

function setButtons(on) {
  const inc = document.querySelector('[data-ebm-increase]')
  const reset = document.querySelector('[data-ebm-reset]')
  if (reset) reset.disabled = !on
  if (inc) {
    inc.disabled = !on || index >= STAGES.length - 1
  }
}

function announce(stage) {
  const el = document.querySelector('[data-ebm-live]')
  if (!el) return
  el.textContent = `Worker 04. Multiplier ${stage.label.replace('×', ' times')}. Output ${stage.output.replace('/s', ' per second')}. Load ${stage.load} percent. Stability ${stage.stability} percent. ${stage.status.charAt(0)}${stage.status.slice(1).toLowerCase()}.`
}

/**
 * @param {Stage} stage
 * @param {{ animate?: boolean, prevLabel?: string }} [opts]
 */
function applyStage(stage, opts = {}) {
  const animate = opts.animate !== false && !prefersReducedMotion()
  const root = rootEl()
  if (!root) return

  root.setAttribute('data-stage', stage.id)
  root.classList.toggle('ebm--strained', stage.status === 'STRAINED')
  root.classList.toggle('ebm--unstable', stage.status === 'UNSTABLE')
  root.classList.toggle('ebm--broken', stage.broken)
  root.style.setProperty('--ebm-contours', String(stage.contours))
  root.style.setProperty('--ebm-frags', String(stage.fragments))
  root.style.setProperty('--ebm-stability', String(stage.stability))

  const curr = document.querySelector('[data-ebm-curr]')
  const prev = document.querySelector('[data-ebm-prev]')
  if (curr) curr.textContent = stage.label
  if (prev) prev.textContent = opts.prevLabel || ''

  const host = document.querySelector('[data-ebm-host]')
  if (animate && opts.prevLabel) {
    root.classList.remove('ebm--slam')
    void root.offsetWidth
    root.classList.add('ebm--slam')
    host?.classList.remove('ebm__host--kick')
    void host?.offsetWidth
    host?.classList.add('ebm__host--kick')
  } else {
    root.classList.remove('ebm--slam')
    host?.classList.remove('ebm__host--kick')
  }

  const out = document.querySelector('[data-ebm-output]')
  const load = document.querySelector('[data-ebm-load]')
  const stab = document.querySelector('[data-ebm-stability]')
  const status = document.querySelector('[data-ebm-status]')
  const rail = document.querySelector('[data-ebm-rail]')
  const fill = document.querySelector('[data-ebm-rail-fill]')
  if (out) out.textContent = stage.output
  if (load) load.textContent = `${stage.load}%`
  if (stab) stab.textContent = `${stage.stability}%`
  if (status) status.textContent = stage.status
  if (rail) {
    rail.setAttribute('aria-valuenow', String(stage.stability))
    rail.setAttribute(
      'aria-valuetext',
      `Stability ${stage.stability} percent`,
    )
  }
  if (fill) fill.style.transform = `scaleX(${stage.stability / 100})`

  announce(stage)
}

function clearShift() {
  rootEl()?.classList.remove('ebm--shifted')
}

/**
 * Advance one multiplier stage.
 * @returns {Promise<void>}
 */
export function increaseBurstMultiplier() {
  const root = rootEl()
  if (!root || busy || index >= STAGES.length - 1) return Promise.resolve()

  busy = true
  clearTimers()
  setButtons(false)

  const from = STAGES[index]
  const to = STAGES[index + 1]
  index += 1

  if (prefersReducedMotion()) {
    showFinalBurstMultiplier()
    return Promise.resolve()
  }

  applyStage(to, { animate: true, prevLabel: from.label })

  return new Promise((resolve) => {
    const afterSlam = SLAM_MS
    if (to.id === '20') {
      later(afterSlam + HOLD_MS, () => {
        root.classList.add('ebm--shifted')
      })
      later(afterSlam + HOLD_MS + SHIFT_MS, () => {
        busy = false
        setButtons(true)
        resolve()
      })
    } else {
      later(afterSlam + 40, () => {
        busy = false
        setButtons(true)
        resolve()
      })
    }
  })
}

export function resetBurstMultiplier() {
  clearTimers()
  busy = false
  index = 0
  clearShift()
  applyStage(STAGES[0], { animate: false })
  setButtons(true)
}

/** Jump to final 20× (reduced-motion / harness). */
export function showFinalBurstMultiplier() {
  clearTimers()
  busy = false
  index = STAGES.length - 1
  applyStage(STAGES[index], { animate: false })
  rootEl()?.classList.add('ebm--shifted')
  setButtons(true)
}

/** @returns {Promise<void>} */
export async function replayBurstMultiplier() {
  if (busy) return
  resetBurstMultiplier()
  void rootEl()?.offsetWidth
  if (prefersReducedMotion()) {
    showFinalBurstMultiplier()
    return
  }
  while (index < STAGES.length - 1) {
    await increaseBurstMultiplier()
  }
}

function bindUi() {
  document.querySelectorAll('[data-ebm-increase]').forEach((btn) => {
    btn.addEventListener('click', () => {
      void increaseBurstMultiplier()
    })
  })
  document.querySelectorAll('[data-ebm-reset]').forEach((btn) => {
    btn.addEventListener('click', () => {
      resetBurstMultiplier()
    })
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') {
      void replayBurstMultiplier()
    }
  })
}

bindUi()
resetBurstMultiplier()
