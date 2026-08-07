/**
 * Resume Activity Handoff (SPX-3333) — card→task spatial handoff (580ms).
 */

let busy = false

function root() {
  return document.querySelector('[data-rah]')
}

function setLive(t) {
  const el = document.querySelector('[data-rah-live]')
  if (el) el.textContent = t
}

function setPhase(p) {
  root()?.setAttribute('data-phase', p)
}

export function resetResumeActivityHandoff() {
  busy = false
  setPhase('card')
  setLive('Activity card idle in tray.')
}

export function runResumeActivityHandoff() {
  if (busy || root()?.getAttribute('data-phase') === 'done') return Promise.resolve()
  busy = true
  setPhase('card')
  void root()?.offsetWidth
  setPhase('handoff')
  setLive('Handing off — card expanding into task surface.')
  return new Promise((resolve) => {
    setTimeout(() => {
      setPhase('done')
      setLive('Activity resumed as full task.')
      busy = false
      resolve()
    }, 580)
  })
}

function bind() {
  document.querySelector('[data-rah-run]')?.addEventListener('click', () => void runResumeActivityHandoff())
  document.querySelector('[data-rah-reset]')?.addEventListener('click', resetResumeActivityHandoff)
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'restart') resetResumeActivityHandoff()
  })
}

bind()
resetResumeActivityHandoff()
