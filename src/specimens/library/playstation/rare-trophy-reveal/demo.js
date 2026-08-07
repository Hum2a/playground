const VEIL_MS = 280
const RAYS_MS = 420
const TIER_HOLD_MS = 360
const SETTLE_MS = 220
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
  timers.push(window.setTimeout(fn, ms))
}

function root() {
  return document.querySelector('[data-rtr]')
}

function announce(phase) {
  const r = root()
  if (!r) return
  const live = r.querySelector('[data-rtr-live]')
  const status = r.querySelector('[data-rtr-status]')
  const run = r.querySelector('[data-rtr-run]')
  const copy = {
    idle: ['Rare trophy concealed behind veil.', 'Idle — reveal uses veil → rays → tier hold (not a toast pop).'],
    veil: ['Veil thinning over rare trophy.', 'Phase: veil (280ms).'],
    rays: ['Ray burst revealing rare trophy.', 'Phase: rays (420ms).'],
    tier: ['Gold tier badge holding.', 'Phase: tier hold (360ms).'],
    done: ['Rare gold trophy revealed and held.', 'Reveal complete — distinct from unlock toast.'],
  }
  const pair = copy[phase] || copy.idle
  if (live) live.textContent = pair[0]
  if (status) status.textContent = pair[1]
  if (run) run.disabled = phase !== 'idle' && phase !== 'done' ? true : phase === 'done'
  if (phase === 'idle' && run) run.disabled = false
}

function done() {
  const r = root()
  if (!r) return
  r.setAttribute('data-phase', 'done')
  const card = r.querySelector('[data-rtr-card]')
  if (card) card.hidden = false
  announce('done')
  busy = false
}

function run() {
  const r = root()
  if (!r || busy) return
  busy = true
  clearTimers()
  const card = r.querySelector('[data-rtr-card]')
  if (card) card.hidden = false

  if (rm()) {
    done()
    return
  }

  r.setAttribute('data-phase', 'veil')
  announce('veil')
  later(() => {
    r.setAttribute('data-phase', 'rays')
    announce('rays')
    later(() => {
      r.setAttribute('data-phase', 'tier')
      announce('tier')
      later(() => {
        later(done, SETTLE_MS)
      }, TIER_HOLD_MS)
    }, RAYS_MS)
  }, VEIL_MS)
}

function reset() {
  clearTimers()
  busy = false
  const r = root()
  if (!r) return
  r.setAttribute('data-phase', 'idle')
  const card = r.querySelector('[data-rtr-card]')
  if (card) card.hidden = true
  announce('idle')
}

function bind() {
  root()?.querySelector('[data-rtr-run]')?.addEventListener('click', run)
  root()?.querySelector('[data-rtr-reset]')?.addEventListener('click', reset)
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'restart') reset()
  })
  announce('idle')
}

bind()
