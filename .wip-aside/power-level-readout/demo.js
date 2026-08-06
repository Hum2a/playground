/**
 * Power Level Readout (SPX-997) — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * Deterministic sample sequence (no random cycling).
 * Hold timings (ms): search → accelerate → converge.
 */

const SAMPLES = [
  4, 17, 48, 126, 314, 782, 1640, 2917, 4381, 5790, 6844, 7512, 8021, 8310, 8448,
  8471,
]

/** Hold duration for each sample before advancing (last hold precedes settle). */
const HOLD_MS = [70, 68, 64, 58, 52, 46, 40, 36, 35, 35, 35, 38, 42, 45, 55, 80]

const FINAL = 8471
const SETTLE_MS = 100
const THRESH = { kilo: 1000, mid: 5000, high: 8000 }

let busy = false
let done = false
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
  return document.querySelector('[data-power-level]')
}

function formatSample(n) {
  return String(n).padStart(4, '0')
}

function formatFinal(n) {
  return n.toLocaleString('en-US')
}

function setValueText(text) {
  const el = document.querySelector('[data-plr-value]')
  if (el) el.textContent = text
}

function setClassState(mode) {
  const root = rootEl()
  const box = document.querySelector('[data-plr-class]')
  if (!root || !box) return
  root.classList.remove('is-class-busy', 'is-class-done')
  if (mode === 'busy') {
    root.classList.add('is-class-busy')
    box.removeAttribute('aria-hidden')
  } else if (mode === 'done') {
    root.classList.add('is-class-done')
    box.removeAttribute('aria-hidden')
  } else {
    box.setAttribute('aria-hidden', 'true')
  }
}

function setAnnounce(text) {
  const el = document.querySelector('[data-plr-announce]')
  if (el) el.textContent = text
}

function applyThresholds(n) {
  const root = rootEl()
  if (!root) return
  if (n >= THRESH.kilo) root.classList.add('is-thresh-kilo')
  if (n >= THRESH.mid) root.classList.add('is-thresh-mid')
  if (n >= THRESH.high) root.classList.add('is-thresh-high')
}

function clearPhases() {
  const root = rootEl()
  if (!root) return
  root.classList.remove(
    'is-measuring',
    'is-settle',
    'is-done',
    'is-rm',
    'is-thresh-kilo',
    'is-thresh-mid',
    'is-thresh-high',
    'is-class-busy',
    'is-class-done',
  )
  setClassState('idle')
  setAnnounce('')
  setValueText('----')
  const val = document.querySelector('[data-plr-value]')
  if (val) val.setAttribute('aria-hidden', 'true')
}

function applyFinal(root) {
  root.classList.add(
    'is-done',
    'is-thresh-kilo',
    'is-thresh-mid',
    'is-thresh-high',
  )
  root.setAttribute('data-state', 'done')
  setValueText(formatFinal(FINAL))
  const val = document.querySelector('[data-plr-value]')
  if (val) val.removeAttribute('aria-hidden')
  setClassState('done')
  setAnnounce(`Measurement ${formatFinal(FINAL)}. Above baseline.`)
  done = true
}

function resetVisual() {
  clearPhases()
  const root = rootEl()
  if (!root) return
  root.setAttribute('data-state', 'idle')
  done = false
  const btn = root.querySelector('[data-plr-measure]')
  if (btn) {
    btn.textContent = 'MEASURE'
    btn.disabled = false
  }
}

/**
 * Run the deterministic measurement sequence.
 * @returns {Promise<void>}
 */
export function runPowerLevelReadout() {
  if (busy) return Promise.resolve()
  const root = rootEl()
  if (!root) return Promise.resolve()

  if (done) {
    return runPowerLevelReset().then(() => runPowerLevelReadout())
  }

  busy = true
  clearTimers()
  resetVisual()
  void root.offsetWidth

  const btn = root.querySelector('[data-plr-measure]')
  if (btn) btn.disabled = true

  if (prefersReducedMotion()) {
    root.classList.add('is-rm')
    applyFinal(root)
    if (btn) btn.disabled = false
    busy = false
    return Promise.resolve()
  }

  root.classList.add('is-measuring')
  root.setAttribute('data-state', 'measuring')
  setClassState('busy')

  return new Promise((resolve) => {
    let i = 0

    function step() {
      if (i >= SAMPLES.length) {
        root.classList.remove('is-measuring')
        root.classList.add('is-settle')
        setValueText(formatFinal(FINAL))
        const val = document.querySelector('[data-plr-value]')
        if (val) val.removeAttribute('aria-hidden')

        later(SETTLE_MS, () => {
          root.classList.remove('is-settle')
          applyFinal(root)
          if (btn) btn.disabled = false
          busy = false
          resolve()
        })
        return
      }

      const n = SAMPLES[i]
      setValueText(formatSample(n))
      applyThresholds(n)
      const hold = HOLD_MS[i]
      i += 1
      later(hold, step)
    }

    step()
  })
}

/**
 * Restore unresolved idle state.
 * @returns {Promise<void>}
 */
export function runPowerLevelReset() {
  clearTimers()
  busy = false
  resetVisual()
  void rootEl()?.offsetWidth
  return Promise.resolve()
}

function bindUi() {
  document.querySelector('[data-plr-measure]')?.addEventListener('click', () => {
    void runPowerLevelReadout()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') {
      void runPowerLevelReset().then(() => runPowerLevelReadout())
    }
  })
}

bindUi()
