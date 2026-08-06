/**
 * Velvet Door Transition — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * Destination (state B) exists behind the door from the start — not swapped late.
 */

const SEAM_MS = 220
const OPEN_END_MS = 720
const ENTER_TOTAL_MS = 900
const CLOSE_MS = 500
const SEAM_CONTRACT_MS = 220
const RETURN_TOTAL_MS = 780
const RM_MS = 40

let busy = false
let context = 'a'

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function demoEl() {
  return document.querySelector('[data-velvet-door-demo]')
}

function doorEl() {
  return document.querySelector('[data-velvet-door]')
}

function clearDoorClasses(door) {
  door.classList.remove(
    'velvet-door--seam',
    'velvet-door--open',
    'velvet-door--entered',
    'velvet-door--closing',
    'velvet-door--contract',
    'velvet-door--rm',
  )
}

function setContext(next) {
  context = next
  const demo = demoEl()
  if (!demo) return
  demo.setAttribute('data-context', next)

  const enterBtn = demo.querySelector('[data-velvet-enter]')
  const returnBtn = demo.querySelector('[data-velvet-return]')
  const depth = demo.querySelector('[data-velvet-depth]')
  const surface = demo.querySelector('[data-velvet-surface]')

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
 * Open the velvet door onto the private context (A → B).
 * @returns {Promise<void>}
 */
export function runVelvetEnter() {
  if (busy || context === 'b') return Promise.resolve()

  const demo = demoEl()
  const door = doorEl()
  if (!demo || !door) return Promise.resolve()

  busy = true
  clearDoorClasses(door)
  void door.offsetWidth

  if (prefersReducedMotion()) {
    door.classList.add('velvet-door--rm', 'velvet-door--entered')
    demo.classList.add('velvet-door-demo--at-b')
    setContext('b')
    busy = false
    return Promise.resolve()
  }

  door.classList.add('velvet-door--seam')
  demo.classList.add('velvet-door-demo--entering')

  return new Promise((resolve) => {
    window.setTimeout(() => {
      door.classList.add('velvet-door--open')
    }, SEAM_MS)

    window.setTimeout(() => {
      door.classList.remove('velvet-door--seam', 'velvet-door--open')
      door.classList.add('velvet-door--entered')
      demo.classList.remove('velvet-door-demo--entering')
      demo.classList.add('velvet-door-demo--at-b')
      setContext('b')
      busy = false
      resolve()
    }, ENTER_TOTAL_MS)
  })
}

/**
 * Close the doorway and return to the public context (B → A).
 * @returns {Promise<void>}
 */
export function runVelvetReturn() {
  if (busy || context === 'a') return Promise.resolve()

  const demo = demoEl()
  const door = doorEl()
  if (!demo || !door) return Promise.resolve()

  busy = true
  clearDoorClasses(door)
  void door.offsetWidth

  if (prefersReducedMotion()) {
    door.classList.add('velvet-door--rm')
    demo.classList.remove('velvet-door-demo--at-b', 'velvet-door-demo--entering')
    setContext('a')
    window.setTimeout(() => {
      clearDoorClasses(door)
      busy = false
    }, RM_MS)
    return Promise.resolve()
  }

  door.classList.add('velvet-door--closing')
  demo.classList.remove('velvet-door-demo--at-b')
  demo.classList.add('velvet-door-demo--returning')

  return new Promise((resolve) => {
    window.setTimeout(() => {
      door.classList.remove('velvet-door--closing')
      door.classList.add('velvet-door--contract')
      setContext('a')
    }, CLOSE_MS)

    window.setTimeout(() => {
      clearDoorClasses(door)
      demo.classList.remove('velvet-door-demo--returning')
      busy = false
      resolve()
    }, RETURN_TOTAL_MS)
  })
}

function bindUi() {
  document.querySelector('[data-velvet-enter]')?.addEventListener('click', () => {
    void runVelvetEnter()
  })
  document.querySelector('[data-velvet-return]')?.addEventListener('click', () => {
    void runVelvetReturn()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') {
      if (context === 'b') void runVelvetReturn()
      else void runVelvetEnter()
    }
  })
}

bindUi()
