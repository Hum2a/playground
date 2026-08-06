/**
 * Failure Shatter — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 * Never announces temporary SUCCESS — the operation never succeeded.
 */

const PROCESS_MS = 280
const SUCCESS_MS = 200 // 280–480
const STRIKE_MS = 90 // ~480–570
const FRACTURE_MS = 210 // 550–760
const FAILED_MS = 240 // 680–920
const CODE_DELAY_MS = 170 // within failed phase (~850 from t0 ≈ 680+170)
/** Total ≈ 920ms to stable FAILED + code; retry enabled after */

/** @type {number[]} */
let timers = []
let busy = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function root() {
  return document.querySelector('[data-failure-shatter]')
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
  const el = document.querySelector('[data-fsh-status]')
  if (el) el.textContent = text
}

function setButtons({ run, retry }) {
  const runBtn = document.querySelector('[data-fsh-run]')
  const retryBtn = document.querySelector('[data-fsh-retry]')
  if (runBtn) {
    runBtn.disabled = !run
    runBtn.hidden = !run
  }
  if (retryBtn) {
    retryBtn.hidden = !retry
    retryBtn.disabled = !retry
  }
}

function applyReady() {
  const el = root()
  if (!el) return
  el.setAttribute('data-state', 'ready')
  setButtons({ run: true, retry: false })
  setStatus('Export ready.')
}

function applyFailedImmediate() {
  const el = root()
  if (!el) return
  el.setAttribute('data-state', 'failed')
  setButtons({ run: false, retry: true })
  setStatus('Export failed. Error 042.')
}

/**
 * Run the false-success → shatter → FAILED sequence.
 * @returns {Promise<void>}
 */
export function runFailureShatter() {
  const el = root()
  if (!el || busy) return Promise.resolve()
  if (el.getAttribute('data-state') === 'failed') return Promise.resolve()

  busy = true
  clearTimers()
  setButtons({ run: false, retry: false })

  if (prefersReducedMotion()) {
    applyFailedImmediate()
    busy = false
    return Promise.resolve()
  }

  el.setAttribute('data-state', 'processing')
  setStatus('Export processing.')

  return new Promise((resolve) => {
    later(PROCESS_MS, () => {
      el.setAttribute('data-state', 'success')
      // Decorative SUCCESS only — do not announce success.

      later(SUCCESS_MS, () => {
        el.setAttribute('data-state', 'strike')

        later(70, () => {
          el.setAttribute('data-state', 'fracture')
        })

        later(STRIKE_MS + 100, () => {
          el.setAttribute('data-state', 'failed')
          setStatus('Export failed. Error 042.')

          later(CODE_DELAY_MS, () => {
            setButtons({ run: false, retry: true })
            busy = false
            resolve()
          })
        })
      })
    })
  })
}

/**
 * Reset to READY before another run.
 */
export function resetFailureShatter() {
  const el = root()
  if (!el) return
  busy = false
  clearTimers()
  applyReady()
}

function bind() {
  document.querySelector('[data-fsh-run]')?.addEventListener('click', () => {
    void runFailureShatter()
  })

  document.querySelector('[data-fsh-retry]')?.addEventListener('click', () => {
    resetFailureShatter()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetFailureShatter()
  })
}

bind()
applyReady()
