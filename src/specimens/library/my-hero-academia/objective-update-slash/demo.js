/**
 * Objective Update Slash — strike completed objective, snap next active.
 * iframe-safe; no storage / parent / network.
 */

/** Frozen slash angle — matches contract geometry.slashAngleDeg */
const SLASH_ANGLE_DEG = -8
const SLASH_MS = 280
const SNAP_IMPACT_MS = 160
const SNAP_SETTLE_MS = 120
const SETTLE_MS = 400
const TOTAL_MS = SLASH_MS + SNAP_IMPACT_MS + SNAP_SETTLE_MS + SETTLE_MS

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-ous]')
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

function setPhase(phase) {
  rootEl()?.setAttribute('data-phase', phase)
}

function setLive(text) {
  const el = document.querySelector('[data-ous-live]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-ous-run], [data-ous-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function applyDone() {
  const item1 = document.querySelector('[data-ous-item="1"]')
  const item2 = document.querySelector('[data-ous-item="2"]')
  const slash = document.querySelector('[data-ous-slash]')
  item1?.classList.remove('ous__item--active')
  item1?.classList.add('ous__item--done')
  item2?.classList.add('ous__item--active')
  if (slash) {
    slash.style.transform = `scaleX(1) rotate(${SLASH_ANGLE_DEG}deg)`
  }
  setLive('Objective updated — ESCORT active.')
}

function resetVisual() {
  const item1 = document.querySelector('[data-ous-item="1"]')
  const item2 = document.querySelector('[data-ous-item="2"]')
  const slash = document.querySelector('[data-ous-slash]')
  item1?.classList.add('ous__item--active')
  item1?.classList.remove('ous__item--done')
  item2?.classList.remove('ous__item--active')
  if (slash) slash.style.transform = ''
  setLive('Objectives active.')
}

/** @returns {Promise<void>} */
export function runObjectiveUpdateSlash() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'done') {
    return Promise.resolve()
  }

  busy = true
  clearTimers()
  resetVisual()
  setButtons(false)
  setPhase('idle')
  void root.offsetWidth

  if (prefersReducedMotion()) {
    setPhase('done')
    applyDone()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  setPhase('slash')
  setLive('Completing TARGET.')

  return new Promise((resolve) => {
    later(SLASH_MS, () => {
      setPhase('snap')
      setLive('Activating ESCORT.')
      later(SNAP_IMPACT_MS, () => {
        setPhase('settle')
        later(SNAP_SETTLE_MS, () => {
          applyDone()
          setPhase('done')
          later(SETTLE_MS, () => {
            busy = false
            setButtons(true)
            resolve()
          })
        })
      })
    })
  })
}

export function resetObjectiveUpdateSlash() {
  clearTimers()
  busy = false
  resetVisual()
  setPhase('idle')
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayObjectiveUpdateSlash() {
  if (busy) return
  resetObjectiveUpdateSlash()
  void rootEl()?.offsetWidth
  await runObjectiveUpdateSlash()
}

function bindUi() {
  document.querySelector('[data-ous-run]')?.addEventListener('click', () => {
    void runObjectiveUpdateSlash()
  })
  document.querySelector('[data-ous-replay]')?.addEventListener('click', () => {
    void replayObjectiveUpdateSlash()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayObjectiveUpdateSlash()
  })
}

bindUi()
resetObjectiveUpdateSlash()
void SLASH_ANGLE_DEG
void TOTAL_MS
