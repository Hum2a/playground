/**
 * Hero Name Slam — codename UNIT 07 slams in with angular brackets.
 */

const SLAM_MS = 740
const SETTLE_MS = 320

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
  return document.querySelector('[data-hns]')
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
  const el = document.querySelector('[data-hns-live]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-hns-assign], [data-hns-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showAssigned() {
  const role = document.querySelector('[data-hns-role]')
  if (role) role.textContent = 'OUTPUT // ASSIGNED'
  setLive('Codename assigned.')
}

function resetCopy() {
  const role = document.querySelector('[data-hns-role]')
  if (role) role.textContent = 'OUTPUT // READY'
  setLive('Codename pending.')
}

/** @returns {Promise<void>} */
export function runHeroNameSlam() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'done') {
    return Promise.resolve()
  }

  busy = true
  clearTimers()
  resetCopy()
  setButtons(false)
  setPhase('idle')
  void root.offsetWidth

  if (prefersReducedMotion()) {
    setPhase('done')
    showAssigned()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  setPhase('slam')
  setLive('Name slam.')

  return new Promise((resolve) => {
    later(SLAM_MS, () => {
      showAssigned()
      setPhase('settle')

      later(SETTLE_MS, () => {
        setPhase('done')
        busy = false
        setButtons(true)
        resolve()
      })
    })
  })
}

export function resetHeroNameSlam() {
  clearTimers()
  busy = false
  resetCopy()
  setPhase('idle')
  setButtons(true)
  const root = rootEl()
  if (root) void root.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayHeroNameSlam() {
  if (busy) return
  resetHeroNameSlam()
  void rootEl()?.offsetWidth
  await runHeroNameSlam()
}

function bindUi() {
  document.querySelector('[data-hns-assign]')?.addEventListener('click', () => {
    void runHeroNameSlam()
  })
  document.querySelector('[data-hns-replay]')?.addEventListener('click', () => {
    void replayHeroNameSlam()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayHeroNameSlam()
  })
}

bindUi()
resetHeroNameSlam()
