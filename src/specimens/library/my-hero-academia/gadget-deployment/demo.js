const DEPLOY_MS = 520
const PULSE_MS = 480

let busy = false
/** @type {number | null} */
let timer = null
/** @type {number | null} */
let pulseTimer = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-gadget-deployment]')
}

function setLive(text) {
  const el = document.querySelector('[data-gdd-live]')
  if (el) el.textContent = text
}

function setControlsVisible(on) {
  const controls = document.querySelector('[data-gdd-controls]')
  if (!controls) return
  controls.hidden = !on
}

function setStatus(text, pulse) {
  const status = document.querySelector('[data-gdd-status]')
  if (!status) return
  status.textContent = text
  if (pulse) status.dataset.pulse = pulse
  else delete status.dataset.pulse
}

function pulseAction(kind, label, live) {
  if (root()?.dataset.phase !== 'done') return
  if (pulseTimer) window.clearTimeout(pulseTimer)
  setStatus(label, kind)
  setLive(live)
  pulseTimer = window.setTimeout(() => {
    setStatus('STATUS — READY')
    setLive('Grapple unit deployed and ready.')
    pulseTimer = null
  }, PULSE_MS)
}

function applyDone() {
  const r = root()
  const tray = document.querySelector('[data-gdd-tray]')
  const tile = document.querySelector('[data-gdd-tile]')
  if (tray) {
    tray.hidden = false
    tray.removeAttribute('hidden')
  }
  if (tile) tile.setAttribute('aria-expanded', 'true')
  if (r) r.dataset.phase = 'done'
  setStatus('STATUS — READY')
  setControlsVisible(true)
  setLive('Grapple unit deployed and ready.')
  const run = document.querySelector('[data-gdd-run]')
  const reset = document.querySelector('[data-gdd-reset]')
  if (run) run.disabled = true
  if (reset) reset.hidden = false
}

export function runGadgetDeployment() {
  const r = root()
  if (!r || busy || r.dataset.phase === 'done') return Promise.resolve()

  busy = true
  if (timer) window.clearTimeout(timer)
  const tray = document.querySelector('[data-gdd-tray]')
  if (tray) tray.hidden = false
  setLive('Unfolding gadget controls…')
  void r.offsetWidth

  if (prefersReducedMotion()) {
    applyDone()
    busy = false
    return Promise.resolve()
  }

  r.dataset.phase = 'deploy'

  return new Promise((resolve) => {
    timer = window.setTimeout(() => {
      applyDone()
      busy = false
      timer = null
      resolve()
    }, DEPLOY_MS)
  })
}

export function resetGadgetDeployment() {
  if (timer) window.clearTimeout(timer)
  if (pulseTimer) window.clearTimeout(pulseTimer)
  timer = null
  pulseTimer = null
  busy = false
  const r = root()
  const tray = document.querySelector('[data-gdd-tray]')
  const tile = document.querySelector('[data-gdd-tile]')
  if (tray) tray.hidden = true
  if (tile) tile.setAttribute('aria-expanded', 'false')
  if (r) r.dataset.phase = 'idle'
  setStatus('STATUS — READY')
  setControlsVisible(false)
  setLive('Gadget stowed.')
  const run = document.querySelector('[data-gdd-run]')
  const reset = document.querySelector('[data-gdd-reset]')
  if (run) run.disabled = false
  if (reset) reset.hidden = true
  void r?.offsetWidth
}

export async function replayGadgetDeployment() {
  if (busy) return
  resetGadgetDeployment()
  void root()?.offsetWidth
  await runGadgetDeployment()
}

function bind() {
  document.querySelector('[data-gdd-run]')?.addEventListener('click', () => {
    void runGadgetDeployment()
  })
  document.querySelector('[data-gdd-reset]')?.addEventListener('click', () => {
    resetGadgetDeployment()
  })
  document.querySelector('[data-gdd-fire]')?.addEventListener('click', () => {
    pulseAction('fire', 'STATUS — FIRING', 'Grapple fired.')
  })
  document.querySelector('[data-gdd-reel]')?.addEventListener('click', () => {
    pulseAction('reel', 'STATUS — REELING', 'Grapple reeling in.')
  })
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'restart') resetGadgetDeployment()
  })
}

bind()
