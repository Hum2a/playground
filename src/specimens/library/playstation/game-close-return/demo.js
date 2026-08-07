/**
 * Game Close Return (SPX-3337) — spatial reconstruct-to-tile (520ms).
 */

let phase = 'playing'
let timer = 0

function root() {
  return document.querySelector('[data-gcr]')
}

function setPhase(p) {
  phase = p
  const r = root()
  if (!r) return
  r.setAttribute('data-phase', p)
  const status = r.querySelector('[data-gcr-status]')
  const btn = r.querySelector('[data-gcr-close]')
  const copy = {
    playing: 'Full-screen session active.',
    returning: 'Reconstructing into origin tile…',
    home: 'Home rail restored — origin tile focused.',
  }
  if (status) status.textContent = copy[p] || p
  if (btn) btn.textContent = p === 'home' ? 'RELAUNCH' : 'CLOSE GAME'
}

function reset() {
  if (timer) clearTimeout(timer)
  setPhase('playing')
}

function bind() {
  root()?.querySelector('[data-gcr-close]')?.addEventListener('click', () => {
    if (phase === 'playing') {
      setPhase('returning')
      timer = setTimeout(() => setPhase('home'), 520)
    } else {
      reset()
    }
  })
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'restart') reset()
  })
  reset()
}

bind()
