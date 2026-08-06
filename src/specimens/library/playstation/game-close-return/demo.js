/**
 * Game Close Return (SPX-3337) — sandbox-safe PlayStation specimen.
 */

let phase = 'playing'
function root() { return document.querySelector('[data-ps="game-close-return"]') }
function setPhase(p) {
  phase = p
  const stage = root()?.querySelector('[data-gcr-stage]')
  const status = root()?.querySelector('[data-gcr-status]')
  const btn = root()?.querySelector('[data-gcr-close]')
  if (stage) stage.setAttribute('data-phase', p)
  const copy = { playing: 'Full-screen session active.', returning: 'Collapsing to origin tile…', home: 'Home grid restored — origin tile focused.' }
  if (status) status.textContent = copy[p] || p
  if (btn) btn.textContent = p === 'home' ? 'RELAUNCH' : 'CLOSE GAME'
}
function reset() { setPhase('playing') }
function bind() {
  root()?.querySelector('[data-gcr-close]')?.addEventListener('click', () => {
    if (phase === 'playing') { setPhase('returning'); setTimeout(() => setPhase('home'), 440) }
    else { setPhase('playing') }
  })
  window.addEventListener('message', (e) => { if (e.data?.type === 'restart') reset() })
  reset()
}
bind()
