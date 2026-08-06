/**
 * Adaptive Recovery (SPX-1211) — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * Sequence: FAILED 18% → health ladder (~700ms) → hold 120ms at old baseline
 * → three adaptation struts + clipped metric upgrades → ADAPTED.
 */

const HEALTH = [18, 36, 57, 78, 100]
/** ms between health samples after the initial 18 (4 steps → 700ms). */
const HEALTH_STEP_MS = 175
const BASELINE_HOLD_MS = 120
const ADAPT_STAGGER_MS = [0, 140, 280]
const ADAPT_CLIP_MS = 180
const ADAPT_DONE_MS = 480

const METRICS = ['capacity', 'retries', 'latency']

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
  return document.querySelector('[data-adaptive-recovery]')
}

function setHealth(n) {
  const fill = document.querySelector('[data-ar-health-fill]')
  const val = document.querySelector('[data-ar-health]')
  if (fill) fill.style.width = `${n}%`
  if (val) val.textContent = String(n)
  rootEl()?.setAttribute('data-health', String(n))
}

function setStatus(text) {
  const el = document.querySelector('[data-ar-status]')
  if (el) el.textContent = text
}

function setStateLabel(text) {
  const el = document.querySelector('[data-ar-state]')
  if (el) el.textContent = text
}

function setAnnounce(text) {
  const el = document.querySelector('[data-ar-announce]')
  if (el) el.textContent = text
}

function clearPhases() {
  const root = rootEl()
  if (!root) return
  root.classList.remove(
    'is-recovering',
    'is-baseline',
    'is-adapting',
    'is-adapted',
    'is-rm',
  )
  for (const m of METRICS) {
    root.classList.remove(`is-adapt-${m}`)
  }
  const deltas = document.querySelector('[data-ar-deltas]')
  const tag = document.querySelector('[data-ar-baseline-tag]')
  if (deltas) deltas.hidden = true
  if (tag) tag.hidden = true
  for (const neu of root.querySelectorAll('[data-ar-new]')) {
    neu.setAttribute('aria-hidden', 'true')
  }
}

function applyFailed() {
  const root = rootEl()
  if (!root) return
  clearPhases()
  root.setAttribute('data-state', 'failed')
  setHealth(18)
  setStatus('FAILED')
  setStateLabel('CRITICAL')
  setAnnounce(
    'Worker 06 failed. Health 18 percent. Previous baseline capacity 100, retries 2, latency 84 milliseconds.',
  )
  done = false
  const btn = root.querySelector('[data-ar-recover]')
  if (btn) {
    btn.textContent = 'RECOVER'
    btn.disabled = false
  }
}

function applyAdapted(root) {
  root.classList.add('is-adapted')
  for (const m of METRICS) root.classList.add(`is-adapt-${m}`)
  root.setAttribute('data-state', 'adapted')
  setHealth(100)
  setStatus('ADAPTED')
  setStateLabel('ADAPTED')
  const deltas = document.querySelector('[data-ar-deltas]')
  const tag = document.querySelector('[data-ar-baseline-tag]')
  if (deltas) deltas.hidden = false
  if (tag) tag.hidden = false
  for (const neu of root.querySelectorAll('[data-ar-new]')) {
    neu.removeAttribute('aria-hidden')
  }
  setAnnounce(
    'Worker 06 adapted. Previous baseline capacity 100, retries 2, latency 84 milliseconds. New baseline capacity 128, retries 4, latency 61 milliseconds. Status adapted.',
  )
  done = true
}

/**
 * Recover through health ladder, then adapt metrics above prior baseline.
 * @returns {Promise<void>}
 */
export function runAdaptiveRecovery() {
  if (busy) return Promise.resolve()
  const root = rootEl()
  if (!root) return Promise.resolve()

  if (done) {
    return runAdaptiveRecoveryReset().then(() => runAdaptiveRecovery())
  }

  busy = true
  clearTimers()
  applyFailed()
  void root.offsetWidth

  const btn = root.querySelector('[data-ar-recover]')
  if (btn) btn.disabled = true

  if (prefersReducedMotion()) {
    root.classList.add('is-rm')
    applyAdapted(root)
    if (btn) btn.disabled = false
    busy = false
    return Promise.resolve()
  }

  root.classList.add('is-recovering')
  root.setAttribute('data-state', 'recovering')
  setStatus('RECOVERING')
  setStateLabel('RECOVERING')
  setAnnounce('Recovering Worker 06.')

  return new Promise((resolve) => {
    let i = 1

    function nextHealth() {
      if (i >= HEALTH.length) {
        root.classList.remove('is-recovering')
        root.classList.add('is-baseline')
        setStatus('BASELINE')
        setStateLabel('BASELINE')
        setAnnounce('Health restored to previous baseline.')

        later(BASELINE_HOLD_MS, () => {
          root.classList.remove('is-baseline')
          root.classList.add('is-adapting')
          root.setAttribute('data-state', 'adapting')
          setStatus('ADAPTING')
          setStateLabel('ADAPTING')

          METRICS.forEach((m, idx) => {
            later(ADAPT_STAGGER_MS[idx], () => {
              root.classList.add(`is-adapt-${m}`)
              const neu = root.querySelector(
                `[data-ar-metric="${m}"] [data-ar-new]`,
              )
              if (neu) neu.removeAttribute('aria-hidden')
            })
          })

          later(ADAPT_DONE_MS, () => {
            root.classList.remove('is-adapting')
            applyAdapted(root)
            if (btn) btn.disabled = false
            busy = false
            resolve()
          })
        })
        return
      }

      setHealth(HEALTH[i])
      i += 1
      later(HEALTH_STEP_MS, nextHealth)
    }

    later(HEALTH_STEP_MS, nextHealth)
  })
}

/**
 * Restore failed starting state.
 * @returns {Promise<void>}
 */
export function runAdaptiveRecoveryReset() {
  clearTimers()
  busy = false
  applyFailed()
  void rootEl()?.offsetWidth
  return Promise.resolve()
}

function bindUi() {
  document.querySelector('[data-ar-recover]')?.addEventListener('click', () => {
    void runAdaptiveRecovery()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') {
      void runAdaptiveRecoveryReset().then(() => runAdaptiveRecovery())
    }
  })
}

bindUi()
