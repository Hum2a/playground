/**
 * Character Freeze Introduction — abstract silhouette freezes; intro card slides in.
 */

const APPROACH_MS = 280
const FREEZE_MS = 140
const CARD_MS = 420
const SETTLE_MS = 230

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
  return document.querySelector('[data-cfi]')
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
  const el = document.querySelector('[data-cfi-live]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-cfi-start], [data-cfi-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

/** @returns {Promise<void>} */
export function runCharacterFreezeIntro() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'done') {
    return Promise.resolve()
  }

  busy = true
  clearTimers()
  setButtons(false)
  setLive('Subject approaching.')
  setPhase('idle')
  void root.offsetWidth

  if (prefersReducedMotion()) {
    setPhase('done')
    setLive('Profile locked.')
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  setPhase('approach')
  setLive('Motion blur.')

  return new Promise((resolve) => {
    later(APPROACH_MS, () => {
      setPhase('freeze')
      setLive('Freeze hold.')

      later(FREEZE_MS, () => {
        setPhase('card')
        setLive('Card reveal.')

        later(CARD_MS, () => {
          setPhase('settle')
          setLive('Profile locked.')

          later(SETTLE_MS, () => {
            setPhase('done')
            busy = false
            setButtons(true)
            resolve()
          })
        })
      })
    })
  })
}

export function resetCharacterFreezeIntro() {
  clearTimers()
  busy = false
  setPhase('idle')
  setLive('Subject approaching.')
  setButtons(true)
  const root = rootEl()
  if (root) void root.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayCharacterFreezeIntro() {
  if (busy) return
  resetCharacterFreezeIntro()
  void rootEl()?.offsetWidth
  await runCharacterFreezeIntro()
}

function bindUi() {
  document.querySelector('[data-cfi-start]')?.addEventListener('click', () => {
    void runCharacterFreezeIntro()
  })
  document.querySelector('[data-cfi-replay]')?.addEventListener('click', () => {
    void replayCharacterFreezeIntro()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayCharacterFreezeIntro()
  })
}

bindUi()
resetCharacterFreezeIntro()
