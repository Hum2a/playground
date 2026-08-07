/**
 * Wake from Rest (SPX-3436) — black veil lift over home shelf (≠ focus restore).
 */

let phase = 'dark'
let timer = 0

function root() {
  return document.querySelector('[data-wfr]')
}

function setPhase(p) {
  phase = p
  const r = root()
  if (!r) return
  r.setAttribute('data-phase', p)
  const copy = {
    dark: 'Resting — full black veil; home held underneath.',
    lifting: 'Lifting black veil — home shelf emerging…',
    awake: 'Awake — black cleared; focus tile intact on shelf.',
  }
  const status = r.querySelector('[data-wfr-status]')
  if (status) status.textContent = copy[p] || p
  r.querySelector('[data-wfr-wake]')?.toggleAttribute('disabled', p !== 'dark')
}

function reset() {
  if (timer) clearTimeout(timer)
  setPhase('dark')
}

function bind() {
  root()?.querySelector('[data-wfr-wake]')?.addEventListener('click', () => {
    if (phase !== 'dark') return
    setPhase('lifting')
    timer = setTimeout(() => setPhase('awake'), 700)
  })
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'restart') reset()
  })
  reset()
}

bind()
