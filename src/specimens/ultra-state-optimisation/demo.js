/**
 * Ultra State Optimisation — noisy runtime → calm high-performance state.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 * No franchise names or imagery in the specimen surface.
 */

const PAUSE_MS = 90
const SUBTRACT_MS = 360
const GROUP_STAGGER_MS = 90
const METRIC_STEPS = [
  { cpu: 84, queue: 17 },
  { cpu: 67, queue: 11 },
  { cpu: 49, queue: 6 },
  { cpu: 38, queue: 2 },
  { cpu: 31, queue: 0 },
]
const TASKS = 42

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-uso]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
  return id
}

function setPhase(phase) {
  const root = rootEl()
  if (root) root.setAttribute('data-phase', phase)
}

function setLive(text) {
  const el = document.querySelector('[data-uso-live]')
  if (el) el.textContent = text
}

function setControls(opts) {
  const btn = document.querySelector('[data-uso-optimise]')
  if (!btn) return
  const ultra = rootEl()?.getAttribute('data-phase') === 'ultra'
  btn.disabled = Boolean(opts?.busy) || ultra
}

function setMetrics(cpu, queue) {
  const cpuEl = document.querySelector('[data-uso-cpu]')
  const queueEl = document.querySelector('[data-uso-queue]')
  const tasksEl = document.querySelector('[data-uso-tasks]')
  if (cpuEl) cpuEl.textContent = `${cpu}%`
  if (queueEl) queueEl.textContent = String(queue)
  if (tasksEl) tasksEl.textContent = String(TASKS)
}

function setModeUltra(on) {
  const to = document.querySelector('[data-uso-mode-to]')
  const from = document.querySelector('[data-uso-mode-from]')
  if (to) to.setAttribute('aria-hidden', on ? 'false' : 'true')
  if (from) from.setAttribute('aria-hidden', on ? 'true' : 'false')
}

function pauseAllMotion() {
  const root = rootEl()
  if (!root) return
  for (const el of root.querySelectorAll('*')) {
    for (const anim of el.getAnimations()) anim.pause()
  }
}

function prepareMarkerRetract() {
  const core = document.querySelector('[data-uso-core]')
  if (!core) return
  const cr = core.getBoundingClientRect()
  const cx = cr.left + cr.width / 2
  const cy = cr.top + cr.height / 2
  for (const mark of core.querySelectorAll('.uso__mark')) {
    const r = mark.getBoundingClientRect()
    const mx = r.left + r.width / 2
    const my = r.top + r.height / 2
    mark.style.setProperty('--tx', `${cx - mx}px`)
    mark.style.setProperty('--ty', `${cy - my}px`)
    mark.style.transition = `opacity ${SUBTRACT_MS}ms ease, transform ${SUBTRACT_MS}ms ease, translate ${SUBTRACT_MS}ms ease`
  }
}

function retractMarkerGroup(group) {
  const marks = document.querySelectorAll(`.uso__mark[data-group="${group}"]`)
  for (const mark of marks) {
    mark.style.opacity = '0'
    mark.style.transform = `translate(var(--tx), var(--ty)) scale(0.2)`
  }
}

function applyUltraVisual() {
  setPhase('ultra')
  setMetrics(31, 0)
  setModeUltra(true)
  setLive('Runtime optimised. Mode ultra.')
}

/**
 * Run optimisation: pause → subtract noise → calm ULTRA state.
 * @returns {Promise<void>}
 */
export function runUltraOptimise() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'ultra') {
    return Promise.resolve()
  }

  busy = true
  setControls({ busy: true })
  clearTimers()

  if (prefersReducedMotion()) {
    applyUltraVisual()
    busy = false
    setControls({ busy: false })
    return Promise.resolve()
  }

  setLive('Optimising runtime')
  setPhase('pause')
  pauseAllMotion()

  return new Promise((resolve) => {
    later(PAUSE_MS, () => {
      prepareMarkerRetract()
      setPhase('subtract')

      // Three groups of four markers
      later(0, () => retractMarkerGroup(1))
      later(GROUP_STAGGER_MS, () => retractMarkerGroup(2))
      later(GROUP_STAGGER_MS * 2, () => retractMarkerGroup(3))

      // Metric steps across subtraction window
      const stepMs = Math.floor(SUBTRACT_MS / (METRIC_STEPS.length - 1))
      METRIC_STEPS.forEach((step, i) => {
        later(i * stepMs, () => setMetrics(step.cpu, step.queue))
      })

      later(SUBTRACT_MS, () => {
        applyUltraVisual()
        busy = false
        setControls({ busy: false })
        resolve()
      })
    })
  })
}

export function resetUltraOptimise() {
  clearTimers()
  busy = false
  setPhase('noisy')
  setMetrics(84, 17)
  setModeUltra(false)
  setLive('Runtime in standard mode')
  setControls({ busy: false })

  for (const mark of document.querySelectorAll('.uso__mark')) {
    mark.style.opacity = ''
    mark.style.transform = ''
    mark.style.translate = ''
    mark.style.transition = ''
    mark.style.removeProperty('--tx')
    mark.style.removeProperty('--ty')
  }

  // Restart CSS animations after reset
  const root = rootEl()
  if (root) {
    void root.offsetWidth
  }
}

function bindUi() {
  document.querySelector('[data-uso-optimise]')?.addEventListener('click', () => {
    void runUltraOptimise()
  })
  document.querySelector('[data-uso-reset]')?.addEventListener('click', () => {
    resetUltraOptimise()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetUltraOptimise()
  })
}

bindUi()
resetUltraOptimise()
