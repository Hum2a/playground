/**
 * Clone Failure Pop — failed clone leaves residue then clears.
 * iframe-safe; no storage / parent / network.
 */

const FAIL_INDEX = 1
const FAIL_AT_MS = 150
const POP_MS = 140
const RESIDUE_COUNT = 5
const RESIDUE_HOLD_MS = 200
const RESIDUE_CLEAR_MS = 180
const FINISH_MS = 320
const SETTLE_MS = 80

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

function rootEl() {
  return document.querySelector('[data-cfp]')
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
  const el = document.querySelector('[data-cfp-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-cfp-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-cfp-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-cfp-run], [data-cfp-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function workers() {
  return Array.from(document.querySelectorAll('[data-cfp-worker]'))
}

function bars() {
  return Array.from(document.querySelectorAll('[data-cfp-bar]'))
}

function setWorkerState(i, outcome, label) {
  const worker = workers()[i]
  if (!worker) return
  worker.setAttribute('data-outcome', outcome)
  worker.setAttribute('aria-label', `Worker ${i + 1} ${label.toLowerCase()}`)
  const state = worker.querySelector('[data-cfp-worker-state]')
  if (state) state.textContent = label
}

function showDone() {
  done = true
  setWorkerState(0, 'succeeded', 'DONE')
  setWorkerState(FAIL_INDEX, 'cleared', 'CLEARED')
  setWorkerState(2, 'succeeded', 'DONE')
  const failed = workers()[FAIL_INDEX]
  failed?.removeAttribute('data-residue')
  bars().forEach((bar, i) => {
    bar.style.width = i === FAIL_INDEX ? '0%' : '100%'
  })
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('2 SUCCEEDED · 1 CLEARED')
  setHint('Worker 2 popped; residue cleared.')
  setLive(`Run complete. Failed clone left ${RESIDUE_COUNT} residue then cleared.`)
}

function resetVisual() {
  done = false
  workers().forEach((worker, i) => {
    worker.removeAttribute('data-outcome')
    worker.removeAttribute('data-residue')
    worker.setAttribute('aria-label', `Worker ${i + 1} pending`)
    const state = worker.querySelector('[data-cfp-worker-state]')
    if (state) state.textContent = 'PENDING'
  })
  bars().forEach((bar) => {
    bar.style.width = '0%'
    bar.style.transition = ''
  })
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('IDLE')
  setHint('Press Run to start three workers.')
  setLive('Idle. Three workers ready to run.')
}

/**
 * Auto-run parallel work → pop + residue → clear → complete.
 * @returns {Promise<void>}
 */
export function runCloneFailurePop() {
  const root = rootEl()
  if (!root || busy || done) return Promise.resolve()

  busy = true
  clearTimers()
  resetVisual()
  setButtons(false)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    showDone()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  root.setAttribute('data-phase', 'running')
  setStatus('RUNNING')
  setHint('Three workers running in parallel.')
  setLive('Three workers running in parallel.')
  workers().forEach((worker, i) => {
    const state = worker.querySelector('[data-cfp-worker-state]')
    if (state) state.textContent = 'RUNNING'
    void worker.offsetWidth
    bars()[i].style.width = '100%'
  })

  return new Promise((resolve) => {
    later(FAIL_AT_MS, () => {
      const failed = workers()[FAIL_INDEX]
      setWorkerState(FAIL_INDEX, 'failed', 'FAILED')
      bars()[FAIL_INDEX].style.transition = `width ${POP_MS}ms linear`
      bars()[FAIL_INDEX].style.width = '38%'
      failed?.setAttribute('data-residue', 'true')
      root.setAttribute('data-phase', 'residue')
      setLive(`Worker 2 popped. ${RESIDUE_COUNT} residue fragments present.`)
      later(RESIDUE_HOLD_MS, () => {
        failed?.setAttribute('data-residue', 'clearing')
        setLive('Residue clearing.')
        later(RESIDUE_CLEAR_MS, () => {
          setWorkerState(FAIL_INDEX, 'cleared', 'CLEARED')
          failed?.removeAttribute('data-residue')
        })
      })
    })

    later(FINISH_MS + SETTLE_MS + RESIDUE_HOLD_MS + RESIDUE_CLEAR_MS, () => {
      showDone()
      busy = false
      setButtons(true)
      resolve()
    })
  })
}

export function resetCloneFailurePop() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayCloneFailurePop() {
  if (busy) return
  resetCloneFailurePop()
  void rootEl()?.offsetWidth
  await runCloneFailurePop()
}

function bindUi() {
  document.querySelector('[data-cfp-run]')?.addEventListener('click', () => {
    void runCloneFailurePop()
  })
  document.querySelector('[data-cfp-replay]')?.addEventListener('click', () => {
    void replayCloneFailurePop()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayCloneFailurePop()
  })
}

bindUi()
resetCloneFailurePop()
