/**
 * Irreversible Threshold — tiny portable commit-boundary API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * Progress ladder (frozen %): 0 → 18 → 34 → 51 → 64 · hold 140ms · 65 · 78 · 91 · 100
 * Threshold COMMIT at 65%. CANCEL works only while progress < 65.
 */

const THRESHOLD = 65
const HOLD_MS = 140
const CROSS_MS = 90
const COMPRESS_MS = 100
const CANCEL_RETURN_MS = 280

/** Pre-threshold steps: value, duration to reach it from previous */
const PRE_STEPS = [
  { value: 18, durationMs: 200 },
  { value: 34, durationMs: 200 },
  { value: 51, durationMs: 200 },
  { value: 64, durationMs: 220 },
]

/** Post-threshold steps after crossing to 65 */
const POST_STEPS = [
  { value: 78, durationMs: 120 },
  { value: 91, durationMs: 90 },
  { value: 100, durationMs: 70 },
]

const PROGRESS_VALUES = [0, 18, 34, 51, 64, 65, 78, 91, 100]

/** @type {number[]} */
let timers = []
let busy = false
/** @type {'idle' | 'running' | 'committed' | 'purged' | 'cancelled'} */
let phase = 'idle'
let progress = 0
let committed = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-irreversible-threshold]')
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

function setStatus(text) {
  const el = document.querySelector('[data-irt-status]')
  if (el) el.textContent = text
}

function setButtons({ begin, cancel, replay }) {
  const beginBtn = document.querySelector('[data-irt-begin]')
  const cancelBtn = document.querySelector('[data-irt-cancel]')
  const replayBtn = document.querySelector('[data-irt-replay]')
  if (beginBtn && typeof begin === 'boolean') beginBtn.disabled = !begin
  if (cancelBtn && typeof cancel === 'boolean') cancelBtn.disabled = !cancel
  if (replayBtn && typeof replay === 'boolean') replayBtn.disabled = !replay
}

/**
 * @param {number} pct
 * @param {{ animate?: boolean }} [opts]
 */
function setProgress(pct, opts = {}) {
  const animate = opts.animate !== false && !prefersReducedMotion()
  progress = pct
  const root = rootEl()
  if (!root) return

  root.setAttribute('data-progress', String(pct))
  root.style.setProperty('--irt-progress', `${pct}%`)
  root.classList.toggle('irt--snap', !animate)

  const fill = root.querySelector('[data-irt-fill]')
  if (fill) fill.style.width = `${pct}%`

  const pctEl = root.querySelector('[data-irt-pct]')
  if (pctEl) pctEl.textContent = `${pct}%`

  const rail = root.querySelector('[data-irt-rail]')
  if (rail) {
    rail.setAttribute('aria-valuenow', String(pct))
    const region = committed || pct >= THRESHOLD ? 'committed' : 'reversible'
    rail.setAttribute(
      'aria-valuetext',
      `${pct} percent, ${region}`,
    )
  }
}

/**
 * @param {'reversible' | 'committed' | 'purged' | 'cancelled'} region
 */
function setRegion(region) {
  const root = rootEl()
  const el = document.querySelector('[data-irt-region]')
  root?.setAttribute('data-region', region)
  if (!el) return

  if (region === 'reversible') el.textContent = 'REVERSIBLE'
  else if (region === 'committed') el.textContent = 'COMMITTED'
  else if (region === 'purged') el.textContent = 'PURGED'
  else el.textContent = 'CANCELLED'
}

function setPhase(next) {
  phase = next
  rootEl()?.setAttribute('data-phase', next)
}

function markCommitted() {
  committed = true
  const root = rootEl()
  root?.classList.add('irt--committed')
  setRegion('committed')
  setButtons({ begin: false, cancel: false, replay: false })
  setStatus(
    'Commit threshold crossed at 65 percent. Operation irreversible. Cancel unavailable.',
  )
}

function finishPurged() {
  setPhase('purged')
  setRegion('purged')
  setProgress(100, { animate: false })
  setButtons({ begin: false, cancel: false, replay: true })
  setStatus('Purge complete. Cache-04 purged.')
  busy = false
}

function runCompressThenPurge() {
  const root = rootEl()
  root?.classList.add('irt--compress')
  later(COMPRESS_MS, () => {
    root?.classList.remove('irt--compress')
    finishPurged()
  })
}

function runPostThreshold() {
  setPhase('committed')
  if (prefersReducedMotion()) {
    setProgress(100, { animate: false })
    finishPurged()
    return
  }

  let delay = 0
  for (const step of POST_STEPS) {
    delay += step.durationMs
    later(delay, () => {
      if (!committed || phase === 'cancelled') return
      setProgress(step.value)
      if (step.value === 100) runCompressThenPurge()
    })
  }
}

function crossThreshold() {
  if (committed || phase === 'cancelled') return
  setProgress(THRESHOLD, { animate: !prefersReducedMotion() })
  markCommitted()
  const root = rootEl()
  root?.classList.add('irt--brackets-retract')
  later(prefersReducedMotion() ? 0 : CROSS_MS, () => {
    if (phase === 'cancelled') return
    runPostThreshold()
  })
}

/**
 * Begin purge. CANCEL remains available until progress reaches 65.
 * @returns {Promise<void>}
 */
export function runIrreversibleThreshold() {
  const root = rootEl()
  if (!root || busy || phase === 'purged' || phase === 'committed') {
    return Promise.resolve()
  }
  if (phase === 'running') return Promise.resolve()

  busy = true
  committed = false
  clearTimers()
  root.classList.remove('irt--committed', 'irt--brackets-retract', 'irt--compress', 'irt--approach')
  setPhase('running')
  setRegion('reversible')
  setProgress(0, { animate: false })
  setButtons({ begin: false, cancel: true, replay: false })
  setStatus('Purge running. Operation reversible. Cancel available.')
  void root.offsetWidth

  return new Promise((resolve) => {
    let delay = 0
    const rm = prefersReducedMotion()

    for (const step of PRE_STEPS) {
      const wait = rm ? 40 : step.durationMs
      delay += wait
      later(delay, () => {
        if (phase !== 'running' || committed) return
        setProgress(step.value, { animate: !rm })
        if (step.value === 64) {
          root.classList.add('irt--approach')
        }
      })
    }

    // Hold at 64
    delay += rm ? 160 : HOLD_MS
    later(delay, () => {
      if (phase !== 'running' || committed) return
      // Crossing
      const crossWait = rm ? 40 : CROSS_MS
      later(crossWait, () => {
        if (phase !== 'running' || committed) return
        crossThreshold()
      })
    })

    // Resolve after expected full timeline
    const total =
      (rm ? 40 * 4 + 160 + 40 : 200 + 200 + 200 + 220 + HOLD_MS + CROSS_MS) +
      (rm ? 0 : 120 + 90 + 70 + COMPRESS_MS) +
      40
    later(total, () => resolve())
  })
}

/**
 * Cancel only while progress < 65 and not yet committed.
 * @returns {Promise<void>}
 */
export function cancelIrreversibleThreshold() {
  const root = rootEl()
  if (!root) return Promise.resolve()
  if (committed || progress >= THRESHOLD) return Promise.resolve()
  if (phase !== 'running') return Promise.resolve()

  clearTimers()
  busy = true
  setPhase('cancelled')
  root.classList.remove('irt--approach')
  setButtons({ begin: false, cancel: false, replay: false })
  setStatus('Purge cancelled. Returning to idle.')

  const rm = prefersReducedMotion()
  if (rm) {
    setProgress(0, { animate: false })
    setRegion('cancelled')
    setStatus('Purge cancelled.')
    setButtons({ begin: true, cancel: false, replay: true })
    busy = false
    return Promise.resolve()
  }

  // Animate return toward 0
  setProgress(Math.max(0, progress - 10), { animate: true })
  later(CANCEL_RETURN_MS / 2, () => {
    setProgress(0, { animate: true })
  })
  later(CANCEL_RETURN_MS, () => {
    setRegion('cancelled')
    setStatus('Purge cancelled.')
    setButtons({ begin: true, cancel: false, replay: true })
    busy = false
  })
  return Promise.resolve()
}

export function resetIrreversibleThreshold() {
  clearTimers()
  busy = false
  committed = false
  progress = 0
  const root = rootEl()
  root?.classList.remove(
    'irt--committed',
    'irt--brackets-retract',
    'irt--compress',
    'irt--approach',
    'irt--snap',
  )
  setPhase('idle')
  setRegion('reversible')
  setProgress(0, { animate: false })
  setButtons({ begin: true, cancel: false, replay: true })
  setStatus('Purge idle. Operation reversible. Cancel available.')
}

/** @returns {Promise<void>} */
export async function replayIrreversibleThreshold() {
  if (busy && phase === 'running') return
  resetIrreversibleThreshold()
  void rootEl()?.offsetWidth
  await runIrreversibleThreshold()
}

function bindUi() {
  document.querySelectorAll('[data-irt-begin]').forEach((btn) => {
    btn.addEventListener('click', () => {
      void runIrreversibleThreshold()
    })
  })

  document.querySelectorAll('[data-irt-cancel]').forEach((btn) => {
    btn.addEventListener('click', () => {
      void cancelIrreversibleThreshold()
    })
  })

  document.querySelectorAll('[data-irt-replay]').forEach((btn) => {
    btn.addEventListener('click', () => {
      void replayIrreversibleThreshold()
    })
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') {
      void replayIrreversibleThreshold()
    }
  })
}

bindUi()
resetIrreversibleThreshold()

export const IRREVERSIBLE_THRESHOLD_CONTRACT = {
  THRESHOLD,
  HOLD_MS,
  CROSS_MS,
  COMPRESS_MS,
  PRE_STEPS,
  POST_STEPS,
  PROGRESS_VALUES,
}
