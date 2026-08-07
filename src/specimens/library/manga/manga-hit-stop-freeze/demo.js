/**
 * Manga Hit Stop Freeze — impact emphasis with an explicit motionless plateau.
 * Sandbox-safe (no parent / storage / network).
 *
 * wind-up 120 → impact 90 → HIT STOP 110 (frozen) → recoil 90 → settle 180
 */

const WINDUP_MS = 120
const IMPACT_MS = 90
const HITSTOP_MS = 110
const RECOIL_MS = 90
const SETTLE_MS = 180
const REDUCED_HOLD_MS = 250

/** @type {number[]} */
let timers = []
let busy = false

function rootEl() {
  return document.querySelector('[data-manga-hit-stop-freeze]')
}

function triggerEl() {
  return document.querySelector('[data-mhs-trigger]')
}

function statusEl() {
  return document.querySelector('[data-mhs-status]')
}

function prefersReducedMotion() {
  return (
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function clearTimers() {
  timers.forEach((id) => window.clearTimeout(id))
  timers = []
}

/**
 * @param {number} ms
 * @param {() => void} fn
 */
function after(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

/**
 * @param {string} text
 */
function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

/**
 * @param {string} phase
 */
function setPhase(phase) {
  const root = rootEl()
  if (!root) return
  root.dataset.phase = phase
}

function setBusy(on) {
  busy = on
  const btn = triggerEl()
  if (btn) btn.disabled = on
}

function finishIdle() {
  setPhase('idle')
  setBusy(false)
  setStatus('Ready. Hit-stop freezes impact pose for 110ms.')
}

export function resetMangaHitStopFreeze() {
  clearTimers()
  setBusy(false)
  setPhase('idle')
  setStatus('Ready. Hit-stop freezes impact pose for 110ms.')
}

/**
 * @returns {Promise<void>}
 */
export function runMangaHitStopFreeze() {
  if (busy) return Promise.resolve()
  const root = rootEl()
  if (!root) return Promise.resolve()

  clearTimers()
  setBusy(true)

  if (prefersReducedMotion()) {
    setPhase('reduced')
    setStatus('Reduced motion: static impact marks, no freeze motion.')
    return new Promise((resolve) => {
      after(REDUCED_HOLD_MS, () => {
        finishIdle()
        resolve()
      })
    })
  }

  setPhase('windup')
  setStatus('Wind-up.')

  return new Promise((resolve) => {
    after(WINDUP_MS, () => {
      setPhase('impact')
      setStatus('Impact.')
    })

    after(WINDUP_MS + IMPACT_MS, () => {
      setPhase('hitstop')
      setStatus('Hit stop — frozen 110ms at scale(1.08) rotate(-1.2deg).')
    })

    after(WINDUP_MS + IMPACT_MS + HITSTOP_MS, () => {
      setPhase('recoil')
      setStatus('Recoil.')
    })

    after(WINDUP_MS + IMPACT_MS + HITSTOP_MS + RECOIL_MS, () => {
      setPhase('settle')
      setStatus('Settle.')
    })

    after(WINDUP_MS + IMPACT_MS + HITSTOP_MS + RECOIL_MS + SETTLE_MS, () => {
      finishIdle()
      resolve()
    })
  })
}

function bindUi() {
  document.querySelectorAll('[data-mhs-trigger]').forEach((btn) => {
    btn.addEventListener('click', () => {
      void runMangaHitStopFreeze()
    })
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetMangaHitStopFreeze()
    }
  })
}

bindUi()

export const MANGA_HIT_STOP_FREEZE_CONTRACT = {
  WINDUP_MS,
  IMPACT_MS,
  HITSTOP_MS,
  RECOIL_MS,
  SETTLE_MS,
  REDUCED_HOLD_MS,
}
