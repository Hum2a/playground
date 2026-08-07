/**
 * Parallel Worker Clones — identity marks on workers; recombine inherits marks.
 * iframe-safe; no storage / parent / network.
 */

const SPLIT_MS = 120
const WORKER_DURATIONS = [300, 240, 360]
const WORK_MS = Math.max(...WORKER_DURATIONS)
const RECOMBINE_MS = 160
const TOTAL_MS = SPLIT_MS + WORK_MS + RECOMBINE_MS
const IDENTITY_MARKS = ['◆', '▲', '■']

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
  return document.querySelector('[data-pwc]')
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
  const el = document.querySelector('[data-pwc-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-pwc-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-pwc-hint]')
  if (el) el.textContent = text
}

function setJobKicker(text) {
  const el = document.querySelector('[data-pwc-job-kicker]')
  if (el) el.textContent = text
}

function setJobMarks(text) {
  const el = document.querySelector('[data-pwc-job-marks]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-pwc-run], [data-pwc-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function bars() {
  return Array.from(document.querySelectorAll('[data-pwc-bar]'))
}

function showDone() {
  done = true
  bars().forEach((bar) => {
    bar.style.width = '100%'
  })
  setJobKicker('JOB · COMPLETE')
  setJobMarks(IDENTITY_MARKS.join(''))
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('RECOMBINED')
  setHint('Workers merged; job inherited ◆▲■ marks.')
  setLive('Workers recombined. Job inherited identity marks ◆▲■.')
}

function resetVisual() {
  done = false
  bars().forEach((bar) => {
    bar.style.width = '0%'
  })
  setJobKicker('JOB')
  setJobMarks('')
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('IDLE')
  setHint('Press Run to divide across three workers.')
  setLive('Idle. Job ready to divide across workers.')
}

/**
 * Auto-run split → parallel-work → recombine with inherited marks.
 * @returns {Promise<void>}
 */
export function runParallelWorkerClones() {
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

  root.setAttribute('data-phase', 'splitting')
  setStatus('SPLITTING')
  setHint('Job dividing into marked workers.')
  setLive('Job splitting into three identity-marked workers.')

  return new Promise((resolve) => {
    later(SPLIT_MS, () => {
      root.setAttribute('data-phase', 'working')
      setStatus('WORKING')
      setHint('Workers running in parallel.')
      setLive('Workers ◆▲■ running in parallel.')
      bars().forEach((bar) => {
        void bar.offsetWidth
        bar.style.width = '100%'
      })
    })

    later(SPLIT_MS + WORK_MS, () => {
      root.setAttribute('data-phase', 'recombining')
      setStatus('RECOMBINING')
      setHint('Merging worker output + marks.')
      setLive('Recombining; transferring identity marks to job.')
    })

    later(TOTAL_MS, () => {
      showDone()
      busy = false
      setButtons(true)
      resolve()
    })
  })
}

export function resetParallelWorkerClones() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayParallelWorkerClones() {
  if (busy) return
  resetParallelWorkerClones()
  void rootEl()?.offsetWidth
  await runParallelWorkerClones()
}

function bindUi() {
  document.querySelector('[data-pwc-run]')?.addEventListener('click', () => {
    void runParallelWorkerClones()
  })
  document.querySelector('[data-pwc-replay]')?.addEventListener('click', () => {
    void replayParallelWorkerClones()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayParallelWorkerClones()
  })
}

bindUi()
resetParallelWorkerClones()
