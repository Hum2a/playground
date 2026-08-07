/**
 * Quick Resume Snapshot (SPX-3336) — frozen still → live surface.
 */

let phase = 'frozen'

function root() {
  return document.querySelector('[data-qrs]')
}

function paint() {
  const r = root()
  if (!r) return
  r.setAttribute('data-phase', phase)
  const btn = r.querySelector('[data-qrs-resume]')
  const status = r.querySelector('[data-qrs-status]')
  if (btn) btn.textContent = phase === 'live' ? 'RESET' : 'RESUME'
  if (status) {
    status.textContent =
      phase === 'live'
        ? 'Live surface — playhead pulsing, LIVE badge on.'
        : 'Frozen snapshot — still frame with PAUSED stamp.'
  }
}

function reset() {
  phase = 'frozen'
  paint()
}

function bind() {
  root()?.querySelector('[data-qrs-resume]')?.addEventListener('click', () => {
    phase = phase === 'frozen' ? 'live' : 'frozen'
    paint()
  })
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'restart') reset()
  })
  paint()
}

bind()
