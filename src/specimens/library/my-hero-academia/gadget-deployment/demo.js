const DEPLOY_MS = 520

let busy = false
/** @type {number | null} */
let timer = null

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

function applyDone() {
  const r = root()
  const deploy = document.querySelector('[data-gdd-deploy]')
  const tile = document.querySelector('[data-gdd-tile]')
  if (deploy) {
    deploy.hidden = false
    deploy.removeAttribute('hidden')
  }
  if (tile) tile.setAttribute('aria-expanded', 'true')
  if (r) r.dataset.phase = 'done'
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
  const deploy = document.querySelector('[data-gdd-deploy]')
  if (deploy) deploy.hidden = false
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
  timer = null
  busy = false
  const r = root()
  const deploy = document.querySelector('[data-gdd-deploy]')
  const tile = document.querySelector('[data-gdd-tile]')
  if (deploy) deploy.hidden = true
  if (tile) tile.setAttribute('aria-expanded', 'false')
  if (r) r.dataset.phase = 'idle'
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
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'restart') resetGadgetDeployment()
  })
}

bind()
