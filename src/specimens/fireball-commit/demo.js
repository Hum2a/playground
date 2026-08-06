/**
 * Fireball Commit — charge grows at source, launches across the track, impacts, confirms target.
 * iframe-safe; no storage / parent / network.
 */

const CHARGE_MS = 380
const LAUNCH_MS = 220
const IMPACT_MS = 200
const SETTLE_MS = 150

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
  return document.querySelector('[data-fbc]')
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
  const el = document.querySelector('[data-fbc-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-fbc-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-fbc-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-fbc-run], [data-fbc-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function setPhase(phase) {
  rootEl()?.setAttribute('data-phase', phase)
}

function showResolved() {
  setPhase('done')
  setStatus('CONFIRMED')
  setHint('Target confirmed. Press Replay to commit again.')
  setLive('Target confirmed.')
}

function resetVisual() {
  setPhase('idle')
  setStatus('IDLE')
  setHint('Press Run to charge and commit.')
  setLive('Charge idle. Target unconfirmed.')
}

/**
 * Auto-run charge → launch → impact → confirm.
 * @returns {Promise<void>}
 */
export function runFireballCommit() {
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

  setPhase('charge')
  setStatus('CHARGING')
  setHint('Charging.')
  setLive('Charging.')

  return new Promise((resolve) => {
    later(CHARGE_MS, () => {
      setPhase('launch')
      setStatus('LAUNCHED')
      setHint('Travelling to target.')
      setLive('Launched toward target.')

      later(LAUNCH_MS, () => {
        setPhase('impact')
        setStatus('IMPACT')
        setLive('Impact.')

        later(IMPACT_MS, () => {
          later(SETTLE_MS, () => {
            showResolved()
            busy = false
            setButtons(true)
            resolve()
          })
        })
      })
    })
  })
}

export function resetFireballCommit() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayFireballCommit() {
  if (busy) return
  resetFireballCommit()
  void rootEl()?.offsetWidth
  await runFireballCommit()
}

function bindUi() {
  document.querySelector('[data-fbc-run]')?.addEventListener('click', () => {
    void runFireballCommit()
  })
  document.querySelector('[data-fbc-replay]')?.addEventListener('click', () => {
    void replayFireballCommit()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayFireballCommit()
  })
}

bindUi()
resetFireballCommit()
