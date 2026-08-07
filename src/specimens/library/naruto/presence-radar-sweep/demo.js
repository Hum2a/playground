/**
 * Presence Radar Sweep — finite arc sweep logs three fixed blips into a contact log.
 * iframe-safe; no storage / parent / network.
 */

const BLIP_COUNT = 3
const BLIP_COORDS = [{"x":57.6,"y":49.3,"bearing":42},{"x":111.5,"y":35,"bearing":90},{"x":154.1,"y":62.1,"bearing":138}]
const STEP_MS = 190
const SETTLE_MS = 110
const ANGLES = [-40, 10, 55]
const START_DEG = -70
const END_DEG = 70
const STEP_MS = 190
const SETTLE_MS = 110
const TOTAL_MS = BLIP_COUNT * STEP_MS + SETTLE_MS

let busy = false
let logged = 0
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-prs]')
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
  const el = document.querySelector('[data-prs-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-prs-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-prs-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-prs-run], [data-prs-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function blips() {
  return Array.from(document.querySelectorAll('[data-prs-blip]'))
}

function logItems() {
  return Array.from(document.querySelectorAll('[data-prs-log-item]'))
}

function sweepEl() {
  return document.querySelector('[data-prs-sweep]')
}

function rotateSweep(deg) {
  const sweep = sweepEl()
  if (sweep) sweep.style.transform = `rotate(${deg}deg)`
}

function paint(count, pulseIndex) {
  blips().forEach((blip, i) => {
    const on = i < count
    blip.setAttribute('data-active', on ? 'true' : 'false')
    blip.setAttribute(
      'aria-label',
      on ? `Contact ${i + 1} detected` : `Contact ${i + 1} pending`,
    )
    if (pulseIndex === i) {
      blip.setAttribute('data-pulse', 'true')
      later(STEP_MS, () => blip.removeAttribute('data-pulse'))
    } else {
      blip.removeAttribute('data-pulse')
    }
  })
  logItems().forEach((item, i) => {
    item.setAttribute('data-active', i < count ? 'true' : 'false')
  })
}

function showResolved() {
  logged = BLIP_COUNT
  paint(BLIP_COUNT, -1)
  rotateSweep(END_DEG)
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('SWEEP COMPLETE')
  setHint('Three contacts logged.')
  setLive('Radar sweep complete. Three contacts logged.')
}

function resetVisual() {
  logged = 0
  paint(0, -1)
  rotateSweep(START_DEG)
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('IDLE')
  setHint('Press Run to sweep for presences.')
  setLive('Radar idle. Three presences pending.')
}

/**
 * Auto-run the full arc sweep (Run / replay).
 * @returns {Promise<void>}
 */
export function runPresenceRadarSweep() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'done') {
    return Promise.resolve()
  }

  busy = true
  clearTimers()
  resetVisual()
  setButtons(false)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    showResolved()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  root.setAttribute('data-phase', 'active')
  setStatus('SWEEPING')
  setLive('Sweeping for presences.')

  return new Promise((resolve) => {
    let step = 0
    const tick = () => {
      if (step >= BLIP_COUNT) {
        later(SETTLE_MS, () => {
          showResolved()
          busy = false
          setButtons(true)
          resolve()
        })
        return
      }
      rotateSweep(ANGLES[step])
      logged = step + 1
      paint(logged, step)
      setLive(`Contact ${logged} of ${BLIP_COUNT} logged.`)
      step += 1
      later(STEP_MS, tick)
    }
    tick()
  })
}

export function resetPresenceRadarSweep() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayPresenceRadarSweep() {
  if (busy) return
  resetPresenceRadarSweep()
  void rootEl()?.offsetWidth
  await runPresenceRadarSweep()
}

function bindUi() {
  document.querySelector('[data-prs-run]')?.addEventListener('click', () => {
    void runPresenceRadarSweep()
  })
  document.querySelector('[data-prs-replay]')?.addEventListener('click', () => {
    void replayPresenceRadarSweep()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayPresenceRadarSweep()
  })
}

void TOTAL_MS
bindUi()
resetPresenceRadarSweep()

void BLIP_COORDS
