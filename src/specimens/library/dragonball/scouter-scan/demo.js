/**
 * Scouter Scan — tiny portable diagnostic scanner API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * Timeline (frozen):
 *   0–320ms   bracket search → converge
 *   320–420ms lock snap (+ ticks); crosshair 140ms from lock
 *   420–940ms vertical scan sweep + metric cycling
 *   ~940ms    CLASS → EXTREME (clip) + bar 140ms
 *   ~1080ms   brackets +3px inward; diamond pulse once
 */

const SEARCH_MS = 320
const LOCK_MS = 100
const CROSS_MS = 140
const SWEEP_MS = 520
const CLASS_MS = 140
const SETTLE_MS = 220
const TOTAL_MS = SEARCH_MS + LOCK_MS + SWEEP_MS + CLASS_MS + SETTLE_MS

const OUTPUT_STEPS = ['0031', '0184', '0927', '4812', '7320', '8294', '8,471']
const LATENCY_STEPS = ['--', '91', '62', '47', '31', '26', '24']
const LOAD_STEPS = ['--', '18', '34', '51', '69', '77', '82']

/** @type {number[]} */
let timers = []
let busy = false
let complete = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-scouter-scan]')
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
  const el = document.querySelector('[data-ss-status]')
  if (el) el.textContent = text
}

function setButtonsEnabled(on) {
  document.querySelectorAll('[data-ss-scan], [data-ss-reset]').forEach((btn) => {
    if (btn.hasAttribute('data-ss-scan') && complete && on) {
      btn.disabled = true
      return
    }
    btn.disabled = !on
  })
}

function setText(sel, text) {
  const el = document.querySelector(sel)
  if (el) el.textContent = text
}

function applyMetrics(i) {
  const o = OUTPUT_STEPS[i]
  const l = LATENCY_STEPS[i]
  const d = LOAD_STEPS[i]
  setText('[data-ss-output]', o)
  setText(
    '[data-ss-latency]',
    l === '--' ? '----' : `${l}ms`,
  )
  setText('[data-ss-load]', d === '--' ? '----' : `${d}%`)
}

function showFinalReport(announce) {
  setText('[data-ss-target-val]', 'NODE 07')
  setText('[data-ss-output]', '8,471')
  setText('[data-ss-latency]', '24ms')
  setText('[data-ss-load]', '82%')
  const root = rootEl()
  root?.classList.add('scouter-scan--classified')
  const extreme = document.querySelector('[data-ss-class-e]')
  if (extreme) extreme.removeAttribute('aria-hidden')
  if (announce) {
    setStatus(
      'NODE 07, OUTPUT 8,471, LATENCY 24ms, LOAD 82%, CLASS EXTREME.',
    )
  }
}

function clearFinalVisuals() {
  const root = rootEl()
  root?.classList.remove('scouter-scan--classified', 'scouter-scan--confirmed')
  const extreme = document.querySelector('[data-ss-class-e]')
  if (extreme) extreme.setAttribute('aria-hidden', 'true')
  setText('[data-ss-target-val]', 'UNRESOLVED')
  setText('[data-ss-output]', '----')
  setText('[data-ss-latency]', '----')
  setText('[data-ss-load]', '----')
}

/**
 * Run one diagnostic scan.
 * @returns {Promise<void>}
 */
export function runScouterScan() {
  const root = rootEl()
  if (!root || busy || complete) return Promise.resolve()

  busy = true
  clearTimers()
  setButtonsEnabled(false)

  if (prefersReducedMotion()) {
    setPhase('done')
    complete = true
    showFinalReport(true)
    root.classList.add('scouter-scan--confirmed')
    busy = false
    setButtonsEnabled(true)
    return Promise.resolve()
  }

  setPhase('idle')
  void root.offsetWidth
  setPhase('search')
  setStatus('Scanning node 07.')

  return new Promise((resolve) => {
    later(SEARCH_MS, () => {
      setPhase('lock')
      setText('[data-ss-target-val]', 'NODE 07')
    })

    later(SEARCH_MS + LOCK_MS, () => {
      setPhase('sweep')
      const stepMs = Math.floor(SWEEP_MS / (OUTPUT_STEPS.length - 1))
      OUTPUT_STEPS.forEach((_, i) => {
        later(SEARCH_MS + LOCK_MS + i * stepMs, () => {
          applyMetrics(i)
        })
      })
    })

    const afterSweep = SEARCH_MS + LOCK_MS + SWEEP_MS
    later(afterSweep, () => {
      setPhase('classify')
      applyMetrics(OUTPUT_STEPS.length - 1)
      showFinalReport(false)
    })

    later(afterSweep + CLASS_MS, () => {
      setPhase('confirm')
      root.classList.add('scouter-scan--confirmed')
      setStatus(
        'NODE 07, OUTPUT 8,471, LATENCY 24ms, LOAD 82%, CLASS EXTREME.',
      )
    })

    later(TOTAL_MS, () => {
      setPhase('done')
      complete = true
      busy = false
      setButtonsEnabled(true)
      resolve()
    })
  })
}

export function resetScouterScan() {
  clearTimers()
  busy = false
  complete = false
  setPhase('idle')
  clearFinalVisuals()
  setStatus('Node 07. Target unresolved.')
  setButtonsEnabled(true)
}

/** @returns {Promise<void>} */
export async function replayScouterScan() {
  if (busy) return
  resetScouterScan()
  void rootEl()?.offsetWidth
  await runScouterScan()
}

function bindUi() {
  document.querySelectorAll('[data-ss-scan]').forEach((btn) => {
    btn.addEventListener('click', () => {
      void runScouterScan()
    })
  })
  document.querySelectorAll('[data-ss-reset]').forEach((btn) => {
    btn.addEventListener('click', () => {
      resetScouterScan()
    })
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') {
      void replayScouterScan()
    }
  })
}

bindUi()
resetScouterScan()
