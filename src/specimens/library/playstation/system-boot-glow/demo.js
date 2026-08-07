/**
 * System Boot Glow (SPX-3325) — dark → glow(55%) → settle(100%) → READY.
 */

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
  return document.querySelector('[data-sbg]')
}

function setLive(t) {
  const el = document.querySelector('[data-sbg-live]')
  if (el) el.textContent = t
}

function setLuma(pct) {
  const el = document.querySelector('[data-sbg-luma]')
  if (el) el.textContent = pct
}

function setPhase(p) {
  root()?.setAttribute('data-phase', p)
}

export function resetSystemBootGlow() {
  clear()
  busy = false
  setPhase('dark')
  setLuma('0%')
  setLive('System dark — luminance 0%.')
}

export function runSystemBootGlow() {
  if (busy) return Promise.resolve()
  busy = true
  clear()
  setPhase('dark')
  setLuma('0%')
  void root()?.offsetWidth

  setPhase('glow')
  setLuma('55%')
  setLive('Glow building — luminance 55%.')

  return new Promise((resolve) => {
    later(900, () => {
      setPhase('settle')
      setLuma('100%')
      setLive('Glow settled — luminance 100%.')
      later(320, () => {
        setPhase('ready')
        setLuma('READY')
        setLive('System ready.')
        busy = false
        resolve()
      })
    })
  })
}

function bind() {
  document.querySelector('[data-sbg-run]')?.addEventListener('click', () => void runSystemBootGlow())
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'restart') resetSystemBootGlow()
  })
}

bind()
resetSystemBootGlow()
