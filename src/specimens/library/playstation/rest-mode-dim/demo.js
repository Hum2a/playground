/**
 * Rest Mode Dim (SPX-3435) — sandbox-safe PlayStation specimen.
 */

const DIM_MS = 700

let phase = 'active'
/** @type {number | null} */
let dimTimer = null

function root() {
  return document.querySelector('[data-rmd]')
}

function clearDimTimer() {
  if (dimTimer != null) {
    window.clearTimeout(dimTimer)
    dimTimer = null
  }
}

function setPhase(p) {
  phase = p
  const r = root()
  r?.setAttribute('data-phase', p)
  r?.querySelector('[data-rmd-stage]')?.setAttribute('data-phase', p)
  const status = r?.querySelector('[data-rmd-status]')
  const btn = r?.querySelector('[data-rmd-enter]')
  const copy = {
    active: 'System active — full luminance.',
    dimming: 'Dimming interface layers…',
    rest: 'Rest mode — luminance at 18%.',
  }
  if (status) status.textContent = copy[p] || p
  if (btn) btn.textContent = p === 'rest' ? 'WAKE' : 'ENTER REST MODE'
}

function reset() {
  clearDimTimer()
  setPhase('active')
}

function enterRest() {
  if (phase !== 'active') return
  clearDimTimer()
  setPhase('dimming')
  dimTimer = window.setTimeout(() => {
    dimTimer = null
    setPhase('rest')
  }, DIM_MS)
}

function bind() {
  root()?.querySelector('[data-rmd-enter]')?.addEventListener('click', () => {
    if (phase === 'active') enterRest()
    else reset()
  })
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'restart') reset()
  })
  reset()
}

bind()
