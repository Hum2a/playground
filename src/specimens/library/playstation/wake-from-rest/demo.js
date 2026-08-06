/**
 * Wake from Rest (SPX-3436) — sandbox-safe PlayStation specimen.
 */

let phase = 'dark'
function root() { return document.querySelector('[data-ps="wake-from-rest"]') }
function setPhase(p) {
  phase = p
  root()?.querySelector('[data-wfr-stage]')?.setAttribute('data-phase', p)
  const copy = { dark: 'Resting — screen dark, focus memory held.', lifting: 'Lifting darkness — UI restoring…', awake: 'Awake — previous focus tile intact.' }
  root()?.querySelector('[data-wfr-status]')?.replaceChildren(document.createTextNode(copy[p] || p))
  root()?.querySelector('[data-wfr-wake]')?.toggleAttribute('disabled', phase !== 'dark')
}
function reset() { setPhase('dark'); root()?.querySelector('[data-wfr-wake]')?.removeAttribute('disabled') }
function bind() {
  root()?.querySelector('[data-wfr-wake]')?.addEventListener('click', () => {
    if (phase !== 'dark') return
    setPhase('lifting')
    setTimeout(() => setPhase('awake'), 600)
  })
  window.addEventListener('message', (e) => { if (e.data?.type === 'restart') reset() })
  reset()
}
bind()
