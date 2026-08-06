/**
 * Dark Hour Conversion Loader — progress drives conversion boundary 1:1.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

const LOAD_MS = 3000
const HOLD_MS = 180
const RESOLVE_MS = 320

let busy = false
/** @type {number | null} */
let raf = null
/** @type {number[]} */
let timers = []
/** Current progress 0–100 (source of truth for boundary + numeric). */
let progress = 0

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-dhcl]')
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

function cancelRaf() {
  if (raf != null) {
    window.cancelAnimationFrame(raf)
    raf = null
  }
}

function padPct(n) {
  const v = Math.max(0, Math.min(100, Math.round(n)))
  return `${String(v).padStart(2, '0')}%`
}

/**
 * Map progress → boundary + numeric readout (same value).
 * @param {number} pct 0–100
 */
function setProgress(pct) {
  progress = Math.max(0, Math.min(100, pct))
  const root = rootEl()
  if (!root) return

  root.style.setProperty('--dhcl-p', `${progress}%`)

  const bar = document.querySelector('[data-dhcl-bar]')
  const label = document.querySelector('[data-dhcl-pct]')
  if (bar) bar.setAttribute('aria-valuenow', String(Math.round(progress)))
  if (label) label.textContent = padPct(progress)
}

function setPhase(phase) {
  const root = rootEl()
  if (!root) return
  root.setAttribute('data-phase', phase)
}

function setOp(text) {
  const normal = document.querySelector('[data-dhcl-op]')
  const converted = document.querySelector('[data-dhcl-converted] .dhcl__op')
  if (normal) normal.textContent = text
  if (converted) converted.textContent = text
}

function announce(text) {
  const live = document.querySelector('[data-dhcl-live]')
  if (live) live.textContent = text
}

function setControls(running) {
  const start = document.querySelector('[data-dhcl-start]')
  if (start) start.disabled = running
}

function finishComplete() {
  setPhase('complete')
  setProgress(100)
  setOp('INDEX COMPLETE')
  announce('Archive indexing complete.')
  busy = false
  setControls(false)
}

/**
 * Run determinate 0→100% conversion load (~3000ms), then resolve.
 * @returns {Promise<void>}
 */
export function startDarkHourConversionLoad() {
  if (busy) return Promise.resolve()
  busy = true
  setControls(true)
  clearTimers()
  cancelRaf()
  announce('')
  setOp('INDEXING ARCHIVE')
  setProgress(0)
  setPhase('running')

  if (prefersReducedMotion()) {
    // Discrete jump to completed state — no travelling boundary.
    setProgress(100)
    setPhase('hold')
    return new Promise((resolve) => {
      later(HOLD_MS, () => {
        finishComplete()
        resolve()
      })
    })
  }

  const start = performance.now()

  return new Promise((resolve) => {
    const tick = (now) => {
      const t = Math.min(1, (now - start) / LOAD_MS)
      setProgress(t * 100)

      if (t < 1) {
        raf = window.requestAnimationFrame(tick)
        return
      }

      raf = null
      setProgress(100)
      setPhase('hold')

      later(HOLD_MS, () => {
        setPhase('resolve')
        later(RESOLVE_MS, () => {
          finishComplete()
          resolve()
        })
      })
    }

    raf = window.requestAnimationFrame(tick)
  })
}

export function resetDarkHourConversionLoad() {
  cancelRaf()
  clearTimers()
  busy = false
  setProgress(0)
  setPhase('idle')
  setOp('INDEXING ARCHIVE')
  announce('')
  setControls(false)
}

/** Inspect helpers for acceptance checks at fixed percentages. */
export function setDarkHourConversionProgress(pct) {
  cancelRaf()
  clearTimers()
  busy = false
  setOp('INDEXING ARCHIVE')
  setPhase(pct <= 0 ? 'idle' : pct >= 100 ? 'hold' : 'running')
  setProgress(pct)
  setControls(false)
}

function bindUi() {
  document.querySelector('[data-dhcl-start]')?.addEventListener('click', () => {
    void startDarkHourConversionLoad()
  })
  document.querySelector('[data-dhcl-reset]')?.addEventListener('click', () => {
    resetDarkHourConversionLoad()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetDarkHourConversionLoad()
  })
}

bindUi()
resetDarkHourConversionLoad()

// Preview/e2e inspection hooks (sandbox-local only)
Object.assign(globalThis, {
  startDarkHourConversionLoad,
  resetDarkHourConversionLoad,
  setDarkHourConversionProgress,
})
