/**
 * Ripple Portal Transition (SPX-406) — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * Origin frozen at 68% 58%. Destination lives inside the expanding clip.
 *
 * Timing (ms):
 *   Disturbance     0–100
 *   Ring 1         60–320   (12→180px)
 *   Ring 2        170–…    (10→240px; +110ms after ring 1 start)
 *   Ring 3        180–…    (primary reveal boundary)
 *   Reveal cover    ~520
 *   Rings fade      +150 after cover
 *   Total           ~700
 */

const DISTURB_MS = 100
const REVEAL_MS = 520
const AFTERGLOW_MS = 150
const TOTAL_MS = REVEAL_MS + AFTERGLOW_MS
const RM_MS = 40

let busy = false
let context = 'a'
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
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

function demoEl() {
  return document.querySelector('[data-ripple-portal-demo]')
}

function clearPhaseClasses(demo) {
  demo.classList.remove(
    'ripple-portal-demo--running',
    'ripple-portal-demo--at-b',
    'ripple-portal-demo--returning',
    'ripple-portal-demo--rm',
  )
}

function setContext(next) {
  context = next
  const demo = demoEl()
  if (!demo) return
  demo.setAttribute('data-context', next)

  const enterBtn = demo.querySelector('[data-ripple-enter]')
  const returnBtn = demo.querySelector('[data-ripple-return]')
  const depth = demo.querySelector('[data-ripple-depth]')
  const surface = demo.querySelector('[data-ripple-surface]')

  if (next === 'b') {
    depth?.removeAttribute('aria-hidden')
    surface?.setAttribute('aria-hidden', 'true')
    enterBtn?.setAttribute('tabindex', '-1')
    returnBtn?.removeAttribute('tabindex')
    returnBtn?.focus({ preventScroll: true })
  } else {
    surface?.removeAttribute('aria-hidden')
    depth?.setAttribute('aria-hidden', 'true')
    returnBtn?.setAttribute('tabindex', '-1')
    enterBtn?.removeAttribute('tabindex')
    enterBtn?.focus({ preventScroll: true })
  }
}

/**
 * Expand the ripple portal onto State B (A → B).
 * @returns {Promise<void>}
 */
export function runRippleEnter() {
  if (busy || context === 'b') return Promise.resolve()

  const demo = demoEl()
  if (!demo) return Promise.resolve()

  busy = true
  clearTimers()
  clearPhaseClasses(demo)
  void demo.offsetWidth

  if (prefersReducedMotion()) {
    demo.classList.add('ripple-portal-demo--rm', 'ripple-portal-demo--at-b')
    setContext('b')
    busy = false
    return Promise.resolve()
  }

  demo.classList.add('ripple-portal-demo--running')

  return new Promise((resolve) => {
    later(REVEAL_MS, () => {
      /* cover reached; rings keep going briefly */
    })

    later(TOTAL_MS, () => {
      demo.classList.remove('ripple-portal-demo--running')
      demo.classList.add('ripple-portal-demo--at-b')
      setContext('b')
      busy = false
      resolve()
    })
  })
}

/**
 * Instantly restore State A (replay-friendly reset).
 * @returns {Promise<void>}
 */
export function runRippleReturn() {
  if (busy || context === 'a') return Promise.resolve()

  const demo = demoEl()
  if (!demo) return Promise.resolve()

  busy = true
  clearTimers()
  clearPhaseClasses(demo)
  void demo.offsetWidth

  if (prefersReducedMotion()) {
    demo.classList.add('ripple-portal-demo--rm')
    setContext('a')
    later(RM_MS, () => {
      clearPhaseClasses(demo)
      busy = false
    })
    return Promise.resolve()
  }

  demo.classList.add('ripple-portal-demo--returning')
  setContext('a')

  return new Promise((resolve) => {
    later(DISTURB_MS + 80, () => {
      clearPhaseClasses(demo)
      busy = false
      resolve()
    })
  })
}

function bindUi() {
  document.querySelector('[data-ripple-enter]')?.addEventListener('click', () => {
    void runRippleEnter()
  })
  document.querySelector('[data-ripple-return]')?.addEventListener('click', () => {
    void runRippleReturn()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') {
      if (context === 'b') void runRippleReturn()
      else void runRippleEnter()
    }
  })
}

bindUi()
