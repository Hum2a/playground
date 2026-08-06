/**
 * Isolated Time Freeze — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 * Freeze A/B/D in place → C exports 42→100 → resume A/B/D from frozen offsets → settle.
 */

const FREEZE_MS = 50
const EXPORT_MS = 500
const HOLD_MS = 120
const RESUME_MS = 350
const PROGRESS = [42, 58, 73, 89, 100]
const STEP_MS = Math.floor(EXPORT_MS / (PROGRESS.length - 1))

const EXPORT_AT = FREEZE_MS
const HOLD_AT = EXPORT_AT + EXPORT_MS
const RESUME_AT = HOLD_AT + HOLD_MS
const COMPLETE_AT = RESUME_AT + RESUME_MS

let busy = false
let done = false
/** @type {number[]} */
let timers = []
/** @type {Animation[]} */
let pausedAnims = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-itf]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function setStatus(root, text) {
  const status = root.querySelector('[data-itf-status]')
  if (!status) return
  status.textContent = ''
  void status.offsetWidth
  status.textContent = text
}

function setClock(root, text) {
  const clock = root.querySelector('[data-itf-clock]')
  if (clock) clock.textContent = text
}

function setBusyUi(root, isBusy) {
  const btn = root.querySelector('[data-itf-freeze]')
  if (btn) btn.disabled = isBusy || done
}

function setCardState(root, key, text) {
  const el = root.querySelector(`[data-itf-state-${key}]`)
  if (el) el.textContent = text
}

function setProgress(root, value) {
  const fill = root.querySelector('[data-itf-fill]')
  const state = root.querySelector('[data-itf-state-c]')
  if (fill) fill.style.width = `${value}%`
  if (state) state.textContent = `${value}%`
}

/**
 * Pause only A/B/D motion animations at their current local time.
 * Does not cancel or restart — resume continues from the same offset.
 */
function freezeMotions(root) {
  pausedAnims = []
  for (const el of root.querySelectorAll(
    '[data-role="frozen"] [data-itf-motion], [data-role="frozen"] [data-itf-motion] *',
  )) {
    for (const anim of el.getAnimations()) {
      if (anim.playState === 'running' || anim.playState === 'pending') {
        anim.pause()
        pausedAnims.push(anim)
      }
    }
  }
  root.classList.add('itf--frozen-motion')
}

function resumeMotions(root) {
  root.classList.remove('itf--frozen-motion')
  for (const anim of pausedAnims) {
    try {
      if (anim.playState === 'paused') anim.play()
    } catch {
      /* ignore finished animations */
    }
  }
  pausedAnims = []
}

function stopAllMotions(root) {
  root.classList.remove('itf--frozen-motion')
  root.classList.add('itf--settled')
  for (const el of root.querySelectorAll('[data-itf-motion], [data-itf-motion] *')) {
    for (const anim of el.getAnimations()) {
      anim.cancel()
    }
  }
  pausedAnims = []
}

function applyFinal(root, { reduced = false } = {}) {
  clearTimers()
  busy = false
  done = true
  stopAllMotions(root)
  root.classList.toggle('itf--reduced', reduced)
  root.setAttribute('data-state', 'complete')
  setClock(root, 'TIME // RESUMED')
  setCardState(root, 'a', 'READY')
  setCardState(root, 'b', 'READY')
  setCardState(root, 'c', 'COMPLETE')
  setCardState(root, 'd', 'READY')
  setProgress(root, 100)
  setStatus(
    root,
    'Processes A, B and D paused while Export C completed.',
  )
  setBusyUi(root, false)
}

/**
 * Freeze surrounding processes, complete Export C, then resume.
 * @returns {Promise<void>}
 */
export function runIsolatedTimeFreeze() {
  const root = rootEl()
  if (!root || busy || done) return Promise.resolve()

  busy = true
  clearTimers()
  root.classList.remove('itf--reduced', 'itf--settled', 'itf--frozen-motion')
  setBusyUi(root, true)

  if (prefersReducedMotion()) {
    applyFinal(root, { reduced: true })
    return Promise.resolve()
  }

  setStatus(root, 'Freezing processes A, B and D. Export C remains active.')
  root.setAttribute('data-state', 'freeze')
  void root.offsetWidth

  return new Promise((resolve) => {
    later(FREEZE_MS, () => {
      freezeMotions(root)
      setClock(root, 'TIME // SUSPENDED')
      setStatus(
        root,
        'Processes A, B and D paused while Export C runs.',
      )
      root.setAttribute('data-state', 'export')
      setProgress(root, PROGRESS[0])
    })

    PROGRESS.forEach((value, i) => {
      if (i === 0) return
      later(EXPORT_AT + i * STEP_MS, () => {
        setProgress(root, value)
      })
    })

    later(HOLD_AT, () => {
      setProgress(root, 100)
      setCardState(root, 'c', 'EXPORT COMPLETE')
      root.setAttribute('data-state', 'hold')
      setStatus(
        root,
        'Export C complete. Processes A, B and D still paused.',
      )
    })

    later(RESUME_AT, () => {
      resumeMotions(root)
      setClock(root, 'TIME // RESUMED')
      root.setAttribute('data-state', 'resume')
      setStatus(
        root,
        'Time resumed. Processes A, B and D continue from frozen positions.',
      )
    })

    later(COMPLETE_AT, () => {
      applyFinal(root)
      resolve()
    })
  })
}

/**
 * Reset to four active processes with C selected at 42%.
 * @returns {Promise<void>}
 */
export function resetIsolatedTimeFreeze() {
  const root = rootEl()
  if (!root) return Promise.resolve()

  clearTimers()
  busy = false
  done = false
  pausedAnims = []
  root.classList.remove('itf--reduced', 'itf--settled', 'itf--frozen-motion')
  root.setAttribute('data-state', 'idle')
  setClock(root, 'TIME // RUNNING')
  setCardState(root, 'a', 'ACTIVE')
  setCardState(root, 'b', 'ACTIVE')
  setCardState(root, 'c', '42%')
  setCardState(root, 'd', 'ACTIVE')
  setProgress(root, 42)
  void root.offsetWidth
  setStatus(root, 'Four processes active. C // EXPORT selected.')
  setBusyUi(root, false)
  return Promise.resolve()
}

function bind() {
  const root = rootEl()
  if (!root) return

  root.querySelector('[data-itf-freeze]')?.addEventListener('click', () => {
    void runIsolatedTimeFreeze()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') {
      void resetIsolatedTimeFreeze()
    }
  })
}

bind()
resetIsolatedTimeFreeze()
