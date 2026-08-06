/**
 * Quick Resume Snapshot (SPX-3336) — sandbox-safe PlayStation specimen.
 */

let resumed = false
function root() { return document.querySelector('[data-ps="quick-resume-snapshot"]') }
function paint() {
  const r = root()
  const stage = r?.querySelector('[data-qrs-stage]')
  const btn = r?.querySelector('[data-qrs-resume]')
  const status = r?.querySelector('[data-qrs-status]')
  stage?.classList.toggle('is-resumed', resumed)
  if (btn) { btn.textContent = resumed ? 'RESET' : 'RESUME'; btn.disabled = false }
  if (status) status.textContent = resumed ? 'Session resumed — snapshot expanded to active surface.' : 'Snapshot card ready — press RESUME to expand.'
}
function reset() { resumed = false; paint() }
function bind() {
  root()?.querySelector('[data-qrs-resume]')?.addEventListener('click', () => { resumed = !resumed; paint() })
  window.addEventListener('message', (e) => { if (e.data?.type === 'restart') reset() })
  paint()
}
bind()
