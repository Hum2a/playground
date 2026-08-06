/**
 * Impact Frame Slam — flash impact frame + status slam STANDBY → ALERT.
 * iframe-safe; no storage / parent / network.
 */

const FLASH_MS = 90
const SLAM_MS = 500
const SETTLE_MS = 280
const TOTAL_MS = FLASH_MS + SLAM_MS + SETTLE_MS

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
  return document.querySelector('[data-ifs]')
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
  const el = document.querySelector('[data-ifs-live]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-ifs-run], [data-ifs-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showAlert() {
  const from = document.querySelector('[data-ifs-from]')
  const to = document.querySelector('[data-ifs-to]')
  const note = document.querySelector('[data-ifs-note]')
  if (from) from.setAttribute('aria-hidden', 'true')
  if (to) to.setAttribute('aria-hidden', 'false')
  if (note) note.textContent = 'Impact registered.'
  setLive('Status alert.')
}

function resetVisual() {
  const from = document.querySelector('[data-ifs-from]')
  const to = document.querySelector('[data-ifs-to]')
  const note = document.querySelector('[data-ifs-note]')
  if (from) from.setAttribute('aria-hidden', 'false')
  if (to) to.setAttribute('aria-hidden', 'true')
  if (note) note.textContent = 'Awaiting trigger.'
  setLive('Status standby.')
}

/** @returns {Promise<void>} */
export function runImpactFrameSlam() {
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
    showAlert()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  setPhase('flash')
  setLive('Impact flash.')

  return new Promise((resolve) => {
    later(FLASH_MS, () => {
      setPhase('slam')
      setLive('Slam in progress.')

      later(SLAM_MS, () => {
        showAlert()
        setPhase('settle')
        setLive('Settling.')

        later(SETTLE_MS, () => {
          setPhase('done')
          busy = false
          setButtons(true)
          resolve()
        })
      })
    })
  })
}

export function resetImpactFrameSlam() {
  clearTimers()
  busy = false
  resetVisual()
  setPhase('idle')
  setButtons(true)
  const root = rootEl()
  if (root) void root.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayImpactFrameSlam() {
  if (busy) return
  resetImpactFrameSlam()
  void rootEl()?.offsetWidth
  await runImpactFrameSlam()
}

function bindUi() {
  document.querySelector('[data-ifs-run]')?.addEventListener('click', () => {
    void runImpactFrameSlam()
  })
  document.querySelector('[data-ifs-replay]')?.addEventListener('click', () => {
    void replayImpactFrameSlam()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayImpactFrameSlam()
  })
}

bindUi()
resetImpactFrameSlam()
