/**
 * Rest Mode Dim (SPX-3435) — sandbox-safe PlayStation specimen.
 */

let phase = 'active'
function root() { return document.querySelector('[data-ps="rest-mode-dim"]') }
function setPhase(p) {
  phase = p
  root()?.querySelector('[data-rmd-stage]')?.setAttribute('data-phase', p)
  const status = root()?.querySelector('[data-rmd-status]')
  const btn = root()?.querySelector('[data-rmd-enter]')
  const copy = { active: 'System active — full luminance.', dimming: 'Dimming interface layers…', rest: 'Rest mode — luminance and activity reduced.' }
  if (status) status.textContent = copy[p] || p
  if (btn) btn.textContent = p === 'rest' ? 'WAKE' : 'ENTER REST MODE'
}
function reset() { setPhase('active') }
function bind() {
  root()?.querySelector('[data-rmd-enter]')?.addEventListener('click', () => {
    if (phase === 'active') { setPhase('dimming'); setTimeout(() => setPhase('rest'), 700) }
    else reset()
  })
  window.addEventListener('message', (e) => { if (e.data?.type === 'restart') reset() })
  reset()
}
bind()
