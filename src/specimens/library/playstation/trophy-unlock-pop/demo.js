const ENTER_MS = 320
const SHINE_MS = 480
const SETTLE_MS = 200
let busy = false
let timers = []

function rm() {
  return (
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function clearTimers() {
  timers.forEach((t) => window.clearTimeout(t))
  timers = []
}

function later(fn, ms) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function root() {
  return document.querySelector('[data-tup]')
}

function announce(phase) {
  const r = root()
  if (!r) return
  const live = r.querySelector('[data-tup-live]')
  const status = r.querySelector('[data-tup-status]')
  const run = r.querySelector('[data-tup-run]')
  const map = {
    idle: ['Waiting for unlock.', 'Idle — press Unlock for enter → shine → settle.'],
    enter: ['Trophy toast entering.', 'Phase: enter (320ms).'],
    shine: ['Trophy shine sweep.', 'Phase: shine (480ms).'],
    settled: ['Trophy unlocked and settled.', 'Phase: settled — toast held.'],
  }
  const pair = map[phase] || map.idle
  if (live) live.textContent = pair[0]
  if (status) status.textContent = pair[1]
  if (run) run.disabled = phase !== 'idle' && phase !== 'settled' ? true : phase === 'settled'
  if (phase === 'idle' && run) run.disabled = false
}

function settled() {
  const r = root()
  if (!r) return
  r.setAttribute('data-phase', 'settled')
  const t = r.querySelector('[data-tup-toast]')
  if (t) t.hidden = false
  announce('settled')
  busy = false
}

function run() {
  const r = root()
  if (!r || busy) return
  busy = true
  clearTimers()
  const t = r.querySelector('[data-tup-toast]')
  if (t) t.hidden = false

  if (rm()) {
    settled()
    return
  }

  r.setAttribute('data-phase', 'enter')
  announce('enter')
  later(() => {
    r.setAttribute('data-phase', 'shine')
    announce('shine')
    later(() => {
      later(settled, SETTLE_MS)
    }, SHINE_MS)
  }, ENTER_MS)
}

function reset() {
  clearTimers()
  busy = false
  const r = root()
  if (!r) return
  r.setAttribute('data-phase', 'idle')
  const t = r.querySelector('[data-tup-toast]')
  if (t) t.hidden = true
  announce('idle')
}

function bind() {
  root()?.querySelector('[data-tup-run]')?.addEventListener('click', run)
  root()?.querySelector('[data-tup-reset]')?.addEventListener('click', reset)
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'restart') reset()
  })
  announce('idle')
}

bind()
