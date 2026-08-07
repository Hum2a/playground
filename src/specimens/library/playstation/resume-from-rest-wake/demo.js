/**
 * Resume-from-Rest Wake (SPX-3327) — focus restore from dim (≠ black lift).
 */

let phase = 'asleep'
let timer = 0

function root() {
  return document.querySelector('[data-rfw]')
}

function setPhase(p) {
  phase = p
  const r = root()
  if (!r) return
  r.setAttribute('data-phase', p)
  const status = r.querySelector('[data-rfw-status]')
  const btn = r.querySelector('[data-rfw-wake]')
  const copy = {
    asleep: 'Asleep — dock dimmed, focus memory retained (not black).',
    waking: 'Waking — luminance rising toward remembered tile…',
    awake: 'Awake — focus halo restored on remembered tile.',
  }
  if (status) status.textContent = copy[p] || p
  if (btn) btn.toggleAttribute('disabled', p !== 'asleep')
}

function reset() {
  if (timer) clearTimeout(timer)
  setPhase('asleep')
}

function bind() {
  root()?.querySelector('[data-rfw-wake]')?.addEventListener('click', () => {
    if (phase !== 'asleep') return
    setPhase('waking')
    timer = setTimeout(() => setPhase('awake'), 560)
  })
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'restart') reset()
  })
  reset()
}

bind()
