const BURST_MS = 560
const SETTLE_MS = 180
let busy = false
let timer = 0

function rm() {
  return (
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function root() {
  return document.querySelector('[data-acb]')
}

function setStatus(phase) {
  const r = root()
  if (!r) return
  const live = r.querySelector('[data-acb-live]')
  const status = r.querySelector('[data-acb-status]')
  const run = r.querySelector('[data-acb-run]')
  if (phase === 'idle') {
    if (live) live.textContent = 'Activity idle.'
    if (status) status.textContent = 'Press Complete for a finite geometric burst.'
    if (run) run.disabled = false
  } else if (phase === 'burst') {
    if (live) live.textContent = 'Geometric completion burst.'
    if (status) status.textContent = 'Eight PS-shape particles radiating…'
    if (run) run.disabled = true
  } else {
    if (live) live.textContent = 'Activity complete.'
    if (status) status.textContent = 'Burst settled — DONE badge held.'
    if (run) run.disabled = true
  }
}

function done() {
  const r = root()
  if (!r) return
  r.setAttribute('data-phase', 'done')
  setStatus('done')
  busy = false
}

function run() {
  const r = root()
  if (!r || busy) return
  busy = true
  window.clearTimeout(timer)
  if (rm()) {
    r.setAttribute('data-phase', 'done')
    setStatus('done')
    busy = false
    return
  }
  r.setAttribute('data-phase', 'burst')
  setStatus('burst')
  timer = window.setTimeout(done, BURST_MS + SETTLE_MS)
}

function reset() {
  window.clearTimeout(timer)
  busy = false
  const r = root()
  if (!r) return
  r.setAttribute('data-phase', 'idle')
  setStatus('idle')
}

function bind() {
  const r = root()
  if (!r) return
  r.querySelector('[data-acb-run]')?.addEventListener('click', run)
  r.querySelector('[data-acb-reset]')?.addEventListener('click', reset)
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'restart') reset()
  })
  setStatus('idle')
}

bind()
