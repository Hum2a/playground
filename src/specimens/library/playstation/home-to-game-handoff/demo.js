const EXPAND_MS = 520
let busy = false
let timers = []

function clear() {
  timers.forEach((id) => clearTimeout(id))
  timers = []
}

function later(ms, fn) {
  timers.push(setTimeout(fn, ms))
}

function root() {
  return document.querySelector('[data-htgh]')
}

function setLive(text) {
  const live = document.querySelector('[data-htgh-live]')
  if (live) live.textContent = text
}

function setPhase(phase) {
  root()?.setAttribute('data-phase', phase)
}

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true' ||
    document.body?.getAttribute('data-force-reduced-motion') === 'true'
  return (
    forced ||
    (typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches)
  )
}

export function resetHomeToGameHandoff() {
  clear()
  busy = false
  setPhase('idle')
  setLive('Home ready.')
}

export function runHomeToGameHandoff() {
  if (busy || root()?.getAttribute('data-phase') === 'launch') return Promise.resolve()
  busy = true
  clear()
  setPhase('idle')
  void root()?.offsetWidth

  if (prefersReducedMotion()) {
    setPhase('launch')
    setLive('Launching.')
    busy = false
    return Promise.resolve()
  }

  setPhase('select')
  setLive('Selecting title.')
  void root()?.offsetWidth
  setPhase('expand')
  setLive('Expanding title.')

  return new Promise((resolve) => {
    later(EXPAND_MS, () => {
      setPhase('launch')
      setLive('Launching.')
      busy = false
      resolve()
    })
  })
}

function bind() {
  document.querySelector('[data-htgh-run]')?.addEventListener('click', () => {
    void runHomeToGameHandoff()
  })
  document.querySelector('[data-htgh-reset]')?.addEventListener('click', resetHomeToGameHandoff)
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'restart') resetHomeToGameHandoff()
  })
}

bind()
resetHomeToGameHandoff()
