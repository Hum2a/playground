const STEPS = [0, 28, 55, 82, 100]
let idx = 0
let busy = false

function rm() {
  return document.documentElement.getAttribute('data-force-reduced-motion') === 'true' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() { return document.querySelector('[data-apf]') }
function paint() {
  const r = root()
  if (!r) return
  const pct = STEPS[idx]
  const fill = r.querySelector('[data-apf-fill]')
  const bar = r.querySelector('[data-apf-bar]')
  const label = r.querySelector('[data-apf-pct]')
  const live = r.querySelector('[data-apf-live]')
  const status = r.querySelector('[data-apf-status]')
  if (fill) fill.style.width = pct + '%'
  if (bar) bar.setAttribute('aria-valuenow', String(pct))
  if (label) label.textContent = pct + '%'
  r.setAttribute('data-phase', pct >= 100 ? 'done' : idx === 0 ? 'idle' : 'active')
  if (live) live.textContent = 'Activity at ' + pct + ' percent.'
  if (status) status.textContent = pct >= 100 ? 'Objective complete.' : 'Filling toward completion.'
}

function reset() { idx = 0; busy = false; paint() }

function advance() {
  if (busy || idx >= STEPS.length - 1) return
  busy = true
  if (rm()) { idx = STEPS.length - 1; paint(); busy = false; return }
  idx += 1
  paint()
  window.setTimeout(() => { busy = false }, 500)
}

function bind() {
  const r = root()
  if (!r) return
  r.querySelector('[data-apf-run]')?.addEventListener('click', advance)
  r.querySelector('[data-apf-reset]')?.addEventListener('click', reset)
  window.addEventListener('message', (e) => { if (e.data?.type === 'restart') reset() })
  paint()
}
bind()
