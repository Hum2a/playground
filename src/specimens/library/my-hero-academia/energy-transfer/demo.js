/**
 * SPX-2011 Energy Transfer — luminous packet travels source → target.
 */
const PATH_MS = 280
const TRAVEL_MS = 500
const HIT_MS = 320
const TOTAL_MS = PATH_MS + TRAVEL_MS + HIT_MS

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-energy-transfer]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  timers.push(window.setTimeout(fn, ms))
}

function setPhase(phase) {
  rootEl()?.setAttribute('data-phase', phase)
}

function setLive(text) {
  const el = document.querySelector('[data-etr-live]')
  if (el) el.textContent = text
}

function setControls({ run, resetVisible }) {
  const runBtn = document.querySelector('[data-etr-run]')
  const resetBtn = document.querySelector('[data-etr-reset]')
  if (runBtn) runBtn.disabled = !run
  if (resetBtn) resetBtn.hidden = !resetVisible
}

function applyReceived() {
  const target = document.querySelector('.etr__node--to')
  const status = document.querySelector('[data-etr-status]')
  const stamp = document.querySelector('[data-etr-stamp]')
  if (target) target.classList.add('is-received')
  if (status) {
    status.textContent = 'TRANSFERRED'
    status.classList.remove('etr__badge--idle')
  }
  if (stamp) stamp.removeAttribute('hidden')
  setLive('Energy transferred to target.')
}

function resetVisual() {
  const target = document.querySelector('.etr__node--to')
  const status = document.querySelector('[data-etr-status]')
  const stamp = document.querySelector('[data-etr-stamp]')
  if (target) target.classList.remove('is-received')
  if (status) {
    status.textContent = 'IDLE'
    status.classList.add('etr__badge--idle')
  }
  if (stamp) stamp.setAttribute('hidden', '')
  setLive('Source charged. Target idle.')
}

export function runEnergyTransfer() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'done') return Promise.resolve()

  busy = true
  clearTimers()
  resetVisual()
  setControls({ run: false, resetVisible: false })
  setPhase('idle')
  void root.offsetWidth

  if (prefersReducedMotion()) {
    applyReceived()
    setPhase('done')
    busy = false
    setControls({ run: false, resetVisible: true })
    return Promise.resolve()
  }

  setLive('Path illuminating…')
  setPhase('path')

  return new Promise((resolve) => {
    later(PATH_MS, () => {
      setLive('Packet in transit.')
      setPhase('travel')

      later(TRAVEL_MS, () => {
        applyReceived()
        setPhase('done')
        setLive('Impact registered.')

        later(HIT_MS, () => {
          busy = false
          setControls({ run: false, resetVisible: true })
          resolve()
        })
      })
    })
  })
}

export function resetEnergyTransfer() {
  clearTimers()
  busy = false
  resetVisual()
  setPhase('idle')
  setControls({ run: true, resetVisible: false })
  void rootEl()?.offsetWidth
}

export async function replayEnergyTransfer() {
  if (busy) return
  resetEnergyTransfer()
  void rootEl()?.offsetWidth
  await runEnergyTransfer()
}

function bindUi() {
  document.querySelector('[data-etr-run]')?.addEventListener('click', () => {
    void runEnergyTransfer()
  })
  document.querySelector('[data-etr-reset]')?.addEventListener('click', () => {
    resetEnergyTransfer()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayEnergyTransfer()
  })
}

bindUi()
resetEnergyTransfer()
