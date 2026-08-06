/**
 * Resume-from-Rest Wake (SPX-3327) — sandbox-safe PlayStation specimen.
 */

let phase = 'asleep'
function root() { return document.querySelector('[data-ps="resume-from-rest-wake"]') }
function setPhase(p) {
  phase = p
  const stage = root()?.querySelector('[data-rfw-stage]')
  const status = root()?.querySelector('[data-rfw-status]')
  if (stage) stage.setAttribute('data-phase', p)
  const copy = { asleep: 'Rest mode — interface dimmed, focus memory retained.', waking: 'Waking — blue glow lifting luminance.', awake: 'Awake — previous focus tile restored with halo.' }
  if (status) status.textContent = copy[p] || p
}
function reset() { setPhase('asleep'); root()?.querySelector('[data-rfw-wake]')?.removeAttribute('disabled') }
function bind() {
  const r = root()
  if (!r) return
  r.querySelector('[data-rfw-wake]')?.addEventListener('click', () => {
    if (phase !== 'asleep') return
    r.querySelector('[data-rfw-wake]')?.setAttribute('disabled', '')
    setPhase('waking')
    setTimeout(() => setPhase('awake'), 520)
  })
  window.addEventListener('message', (e) => { if (e.data?.type === 'restart') reset() })
  reset()
}
bind()
