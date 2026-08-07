/**
 * Clone Merge Result — three parallel clone result cards converge into one
 * combined output card.
 * iframe-safe; no storage / parent / network.
 */

const VALUES = [7, 4, 9]
const MERGED_VALUE = VALUES.reduce((a, b) => a + b, 0)

const CONVERGE_MS = 220
const MERGE_MS = 140
const EXPAND_MS = 140
const TOTAL_MS = CONVERGE_MS + MERGE_MS + EXPAND_MS
const TRAVEL_PX = {
  a: { x: 72, y: 48 },
  b: { x: -72, y: 48 },
  c: { x: 0, y: -28 },
}

let busy = false
let resolved = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-cmr]')
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
  const el = document.querySelector('[data-cmr-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-cmr-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-cmr-hint]')
  if (el) el.textContent = text
}

function setOutputValue(text) {
  const el = document.querySelector('[data-cmr-output-value]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-cmr-run], [data-cmr-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showResolved() {
  resolved = true
  setOutputValue(String(MERGED_VALUE))
  rootEl()?.setAttribute('data-state', 'resolved')
  setStatus('MERGED')
  setHint(`Combined output: ${MERGED_VALUE}.`)
  setLive(`Clone results merged. Combined output ${MERGED_VALUE}.`)
}

function resetVisual() {
  resolved = false
  setOutputValue('—')
  rootEl()?.setAttribute('data-state', 'idle')
  setStatus('IDLE')
  setHint('Press Run to merge three clone results.')
  setLive('Idle. Three clone results are independent.')
}

/**
 * Auto-run full converge → merge → resolve choreography.
 * @returns {Promise<void>}
 */
export function runCloneMergeResult() {
  const root = rootEl()
  if (!root || busy || resolved) return Promise.resolve()

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

  root.setAttribute('data-state', 'converging')
  setStatus('CONVERGING')
  setHint('Clone results converging.')
  setLive(
    `Clones traveling inward A(${TRAVEL_PX.a.x},${TRAVEL_PX.a.y}) B(${TRAVEL_PX.b.x},${TRAVEL_PX.b.y}) C(${TRAVEL_PX.c.x},${TRAVEL_PX.c.y}).`,
  )

  return new Promise((resolve) => {
    later(CONVERGE_MS, () => {
      root.setAttribute('data-state', 'merging')
      setStatus('MERGING')
      setHint('Merging into one output.')
      setLive('Merging clone results.')
    })

    later(CONVERGE_MS + MERGE_MS, () => {
      showResolved()
    })

    later(TOTAL_MS, () => {
      busy = false
      setButtons(true)
      resolve()
    })
  })
}

export function resetCloneMergeResult() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayCloneMergeResult() {
  if (busy) return
  resetCloneMergeResult()
  void rootEl()?.offsetWidth
  await runCloneMergeResult()
}

function bindUi() {
  document.querySelector('[data-cmr-run]')?.addEventListener('click', () => {
    void runCloneMergeResult()
  })
  document.querySelector('[data-cmr-replay]')?.addEventListener('click', () => {
    void replayCloneMergeResult()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayCloneMergeResult()
  })
}

void VALUES
bindUi()
resetCloneMergeResult()
