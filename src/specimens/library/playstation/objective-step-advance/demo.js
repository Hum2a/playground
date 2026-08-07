const LABELS = ['Scan route', 'Secure node', 'Extract data']
const N = 3
const COMPLETE_MS = 160
const PULSE_MS = 280
const FOCUS_MS = 200
let cur = 0
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
  return id
}

function steps() {
  return Array.from(document.querySelectorAll('[data-osa-step]'))
}

function links() {
  return Array.from(document.querySelectorAll('[data-osa-link]'))
}

function paint() {
  const root = document.querySelector('[data-osa]')
  const status = document.querySelector('[data-osa-status]')
  const live = document.querySelector('[data-osa-live]')
  const run = document.querySelector('[data-osa-run]')

  steps().forEach((el, i) => {
    const st = i < cur ? 'complete' : i === cur ? 'current' : 'pending'
    el.setAttribute('data-state', st)
    el.classList.toggle('is-current', i === cur && cur < N)
    el.classList.remove('is-handoff')
  })

  links().forEach((link, i) => {
    link.classList.toggle('is-filled', i < cur)
    const pulse = link.querySelector('.osa__pulse')
    if (pulse) {
      pulse.classList.remove('is-on')
      pulse.style.transform = 'translateX(0)'
    }
  })

  if (cur >= N) {
    root?.setAttribute('data-phase', 'done')
    if (status) status.textContent = 'All objectives complete — focus chain finished.'
    if (live) live.textContent = 'All objectives complete.'
    if (run) run.disabled = true
  } else {
    root?.setAttribute('data-phase', cur === 0 ? 'idle' : 'active')
    if (status) {
      status.textContent =
        'Step ' + (cur + 1) + ' of ' + N + ' focused — complete to hand off focus.'
    }
    if (live) live.textContent = 'Focus on step ' + (cur + 1) + ': ' + LABELS[cur] + '.'
    if (run) run.disabled = false
  }
}

function handoff(from) {
  const fromEl = steps()[from]
  const to = from + 1
  const link = links()[from]
  const pulse = link?.querySelector('.osa__pulse')

  fromEl?.classList.add('is-handoff')
  fromEl?.setAttribute('data-state', 'complete')
  fromEl?.classList.remove('is-current')

  if (!link || !pulse || rm()) {
    cur = Math.min(to, N)
    paint()
    busy = false
    return
  }

  const width = link.getBoundingClientRect().width || 40
  pulse.classList.add('is-on')
  void pulse.offsetWidth
  pulse.style.transform = 'translateX(' + width + 'px)'
  link.classList.add('is-filled')

  later(() => {
    pulse.classList.remove('is-on')
    cur = Math.min(to, N)
    paint()
    busy = false
  }, PULSE_MS + FOCUS_MS)
}

function advance() {
  if (busy || cur >= N) return
  busy = true
  clearTimers()

  if (rm()) {
    cur = Math.min(cur + 1, N)
    paint()
    busy = false
    return
  }

  const from = cur
  if (from >= N - 1) {
    steps()[from]?.setAttribute('data-state', 'complete')
    steps()[from]?.classList.remove('is-current')
    later(() => {
      cur = N
      paint()
      busy = false
    }, COMPLETE_MS)
    return
  }

  later(() => handoff(from), COMPLETE_MS)
}

function reset() {
  clearTimers()
  cur = 0
  busy = false
  paint()
}

function bind() {
  document.querySelector('[data-osa-run]')?.addEventListener('click', advance)
  document.querySelector('[data-osa-reset]')?.addEventListener('click', reset)
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'restart') reset()
  })
  reset()
}

bind()
