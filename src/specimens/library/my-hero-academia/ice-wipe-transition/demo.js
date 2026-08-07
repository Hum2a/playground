/**
 * Ice Wipe Transition — frost leading edge sweeps, facets grow, then fracture away.
 * iframe-safe; no storage / parent / network.
 */

const FROST_MS = 480
const GROW_MS = 520
const FRACTURE_MS = 380
const SETTLE_MS = 270
const TOTAL_MS = FROST_MS + GROW_MS + FRACTURE_MS + SETTLE_MS

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
  return document.querySelector('[data-iwt]')
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
  const el = document.querySelector('[data-iwt-live]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-iwt-run], [data-iwt-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showSceneB() {
  const a = document.querySelector('[data-iwt-scene-a]')
  const b = document.querySelector('[data-iwt-scene-b]')
  if (a) a.hidden = true
  if (b) b.hidden = false
  setLive('Scene B active.')
}

function resetVisual() {
  const a = document.querySelector('[data-iwt-scene-a]')
  const b = document.querySelector('[data-iwt-scene-b]')
  if (a) a.hidden = false
  if (b) b.hidden = true
  setLive('Scene A active.')
}

/** @returns {Promise<void>} */
export function runIceWipeTransition() {
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
    showSceneB()
    setPhase('done')
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  setPhase('frost')
  setLive('Frost edge advancing.')

  return new Promise((resolve) => {
    later(FROST_MS, () => {
      setPhase('grow')
      setLive('Ice facets growing.')

      later(GROW_MS, () => {
        setPhase('fracture')
        setLive('Fracturing away.')
        showSceneB()

        later(FRACTURE_MS, () => {
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

export function resetIceWipeTransition() {
  clearTimers()
  busy = false
  resetVisual()
  setPhase('idle')
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayIceWipeTransition() {
  if (busy) return
  resetIceWipeTransition()
  void rootEl()?.offsetWidth
  await runIceWipeTransition()
}

function bindUi() {
  document.querySelector('[data-iwt-run]')?.addEventListener('click', () => {
    void runIceWipeTransition()
  })
  document.querySelector('[data-iwt-replay]')?.addEventListener('click', () => {
    void replayIceWipeTransition()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayIceWipeTransition()
  })
}

bindUi()
resetIceWipeTransition()
