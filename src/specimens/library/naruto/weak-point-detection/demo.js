/**
 * Weak-Point Detection — scan line sweeps a wireframe and brackets four markers.
 * iframe-safe; no storage / parent / network.
 */

const MARKER_COUNT = 4
const MARKER_ORDER = [0, 1, 2, 3]
const STEP_MS = 140
const STEP_MS = 160
const SETTLE_MS = 100
const TOTAL_MS = MARKER_COUNT * STEP_MS + SETTLE_MS

let busy = false
let detected = 0
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-wpd]')
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

function setLive(text) {
  const el = document.querySelector('[data-wpd-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-wpd-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-wpd-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-wpd-run], [data-wpd-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function markers() {
  return Array.from(document.querySelectorAll('[data-wpd-marker]'))
}

function scanline() {
  return document.querySelector('[data-wpd-scanline]')
}

function markerTop(marker) {
  return marker.style.top || '50%'
}

function paintMarkers(count, pulseIndex) {
  markers().forEach((marker, i) => {
    const on = i < count
    marker.setAttribute('data-active', on ? 'true' : 'false')
    marker.setAttribute(
      'aria-label',
      on ? `Weak point ${i + 1} detected` : `Weak point ${i + 1} pending`,
    )
    if (pulseIndex === i) {
      marker.setAttribute('data-pulse', 'true')
      later(STEP_MS, () => marker.removeAttribute('data-pulse'))
    } else {
      marker.removeAttribute('data-pulse')
    }
  })
}

function moveScanline(top) {
  const line = scanline()
  if (line) line.style.top = top
}

function showResolved() {
  detected = MARKER_COUNT
  paintMarkers(MARKER_COUNT, -1)
  const last = markers()[MARKER_COUNT - 1]
  if (last) moveScanline(markerTop(last))
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('DETECTED')
  setHint('All weak points bracketed.')
  setLive('Scan complete. Four weak points detected.')
}

function resetVisual() {
  detected = 0
  paintMarkers(0, -1)
  moveScanline('8%')
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('IDLE')
  setHint('Press Run to sweep the diagram.')
  setLive('Scan idle. Four weak points pending.')
}

/**
 * Auto-run the full sweep (Run / replay).
 * @returns {Promise<void>}
 */
export function runWeakPointDetection() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'done') {
    return Promise.resolve()
  }

  busy = true
  clearTimers()
  resetVisual()
  setButtons(false)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    showResolved()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  root.setAttribute('data-phase', 'active')
  setStatus('SCANNING')
  setLive('Scanning diagram for weak points.')

  return new Promise((resolve) => {
    const list = markers()
    let step = 0
    const tick = () => {
      if (step >= MARKER_COUNT) {
        later(SETTLE_MS, () => {
          showResolved()
          busy = false
          setButtons(true)
          resolve()
        })
        return
      }
      moveScanline(markerTop(list[step]))
      detected = step + 1
      paintMarkers(detected, step)
      setLive(`Weak point ${detected} of ${MARKER_COUNT} detected.`)
      step += 1
      later(STEP_MS, tick)
    }
    tick()
  })
}

export function resetWeakPointDetection() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayWeakPointDetection() {
  if (busy) return
  resetWeakPointDetection()
  void rootEl()?.offsetWidth
  await runWeakPointDetection()
}

function bindUi() {
  document.querySelector('[data-wpd-run]')?.addEventListener('click', () => {
    void runWeakPointDetection()
  })
  document.querySelector('[data-wpd-replay]')?.addEventListener('click', () => {
    void replayWeakPointDetection()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayWeakPointDetection()
  })
}

void TOTAL_MS
bindUi()
resetWeakPointDetection()

void MARKER_ORDER
