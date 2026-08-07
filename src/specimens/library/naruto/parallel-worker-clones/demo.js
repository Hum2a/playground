/**
 * Parallel Worker Clones — job fans three marked clones with independent bars,
 * then recombines inheriting worker identity marks onto the job.
 * iframe-safe; no storage / parent / network.
 */

const SPLIT_MS = 140
const STAGGER_MS = 40
const WORKER_DURATIONS = [300, 240, 360]
const MARKS = ['peak', 'ring', 'bars']
const WORK_MS = Math.max(...WORKER_DURATIONS)
const RECOMBINE_MS = 160
const TOTAL_MS = SPLIT_MS + WORK_MS + RECOMBINE_MS

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

function setButtons(on) {
  document.querySelectorAll('[data-pwc-run], [data-pwc-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function bars() {
  return Array.from(document.querySelectorAll('[data-pwc-bar]'))
}

function traitsEl() {
  return document.querySelector('[data-pwc-traits]')
}

function setTraits(on) {
  const list = traitsEl()
  if (!list) return
  if (on) list.removeAttribute('hidden')
  else list.setAttribute('hidden', '')
  MARKS.forEach((mark) => {
    const el = list.querySelector(`[data-pwc-trait="${mark}"]`)
    if (!el) return
    el.setAttribute('data-on', on ? 'true' : 'false')
    el.setAttribute('aria-hidden', on ? 'false' : 'true')
  })
}

function showDone() {
  done = true
  bars().forEach((bar) => {
    bar.style.width = '100%'
  })
  setTraits(true)
  setJobKicker('JOB · COMPLETE')
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('RECOMBINED')
  setHint('Job inherited peak / ring / bars marks.')
  setLive('Workers recombined. Job inherited three clone identity marks.')
}

function resetVisual() {
  done = false
  bars().forEach((bar) => {
    bar.style.width = '0%'
  })
  setTraits(false)
  setJobKicker('JOB')
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('IDLE')
  setHint('Press Run to divide across three workers.')
  setLive('Idle. Job ready to divide across workers.')
}

/**
 * Auto-run full split → parallel-work → recombine choreography.
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
  setHint('Clones puffing out with identity marks.')
  setLive('Job splitting into three marked workers.')

  return new Promise((resolve) => {
    later(SPLIT_MS + STAGGER_MS * 2, () => {
      root.setAttribute('data-phase', 'working')
      setStatus('WORKING')
      setHint('Workers running in parallel.')
      setLive(`Workers running at ${WORKER_DURATIONS.join('/')}ms.`)
      bars().forEach((bar) => {
        void bar.offsetWidth
        bar.style.width = '100%'
      })
    })

    later(SPLIT_MS + STAGGER_MS * 2 + WORK_MS, () => {
      root.setAttribute('data-phase', 'recombining')
      setStatus('RECOMBINING')
      setHint('Absorbing worker marks into job.')
      setLive('Recombining — traits transferring to job.')
      setTraits(true)
    })

    later(TOTAL_MS + STAGGER_MS * 2, () => {
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
