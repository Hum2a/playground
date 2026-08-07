/**
 * Game Launch Zoom (SPX-3332) — tile→viewport spatial zoom (640ms).
 */

let busy = false

function root() {
  return document.querySelector('[data-glz]')
}

function setLive(t) {
  const el = document.querySelector('[data-glz-live]')
  if (el) el.textContent = t
}

function setPhase(p) {
  root()?.setAttribute('data-phase', p)
}

export function resetGameLaunchZoom() {
  busy = false
  setPhase('idle')
  setLive('Tile idle in dock slot.')
}

export function runGameLaunchZoom() {
  if (busy || root()?.getAttribute('data-phase') === 'done') return Promise.resolve()
  busy = true
  setPhase('idle')
  void root()?.offsetWidth
  setPhase('zoom')
  setLive('Spatial zoom — tile expanding to viewport.')
  return new Promise((resolve) => {
    setTimeout(() => {
      setPhase('done')
      setLive('Launch surface ready.')
      busy = false
      resolve()
    }, 640)
  })
}

function bind() {
  document.querySelector('[data-glz-run]')?.addEventListener('click', () => void runGameLaunchZoom())
  document.querySelector('[data-glz-reset]')?.addEventListener('click', resetGameLaunchZoom)
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'restart') resetGameLaunchZoom()
  })
}

bind()
resetGameLaunchZoom()
