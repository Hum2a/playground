/**
 * App Launch from Icon — tile-centre container transform to full app.
 */

const DURATION_MS = 420
const START_SCALE = 0.12
const RADIUS_START_PX = 18
const INTERNALS_THRESHOLD = 0.45

/** @type {number | null} */
let animFrame = null
let open = false
let busy = false
/** @type {{ cx: number, cy: number, w: number, h: number } | null} */
let launchOrigin = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  return (
    forced ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function rootEl() {
  return document.querySelector('[data-app-launch]')
}

function clearAnim() {
  if (animFrame !== null) {
    window.cancelAnimationFrame(animFrame)
    animFrame = null
  }
}

function measureLaunch() {
  const scaffold = document.querySelector('[data-alf-scaffold]')
  const source = document.querySelector('[data-alf-source]')
  const app = document.querySelector('[data-alf-app]')
  if (!scaffold || !source || !app) return null

  const sRect = scaffold.getBoundingClientRect()
  const tRect = source.getBoundingClientRect()
  const cx = tRect.left + tRect.width / 2 - sRect.left
  const cy = tRect.top + tRect.height / 2 - sRect.top
  return { scaffold, app, cx, cy, w: sRect.width, h: sRect.height }
}

function applyProgress(m, p) {
  const { app, cx, cy, w, h } = m
  const scale = START_SCALE + (1 - START_SCALE) * p
  const radius = RADIUS_START_PX * (1 - p)
  const tx = cx - w / 2
  const ty = cy - h / 2
  const offsetX = tx * (1 - p)
  const offsetY = ty * (1 - p)

  app.style.transformOrigin = `${cx}px ${cy}px`
  app.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`
  app.style.borderRadius = `${radius}px`
  app.classList.toggle('is-internals-visible', p >= INTERNALS_THRESHOLD)
}

function setState(isOpen) {
  open = isOpen
  const root = rootEl()
  root?.setAttribute('data-alf-state', isOpen ? 'app' : 'launcher')
  const app = document.querySelector('[data-alf-app]')
  const launcher = document.querySelector('[data-alf-launcher]')
  if (launcher) launcher.hidden = isOpen
  if (app) app.hidden = !isOpen
  document.querySelector('[data-alf-status]').textContent = isOpen
    ? 'Atlas app open.'
    : 'Launcher grid · tap Atlas to launch.'
}

function animateLaunch() {
  if (busy || open) return
  const m = measureLaunch()
  if (!m) return

  const { app } = m
  app.hidden = false
  busy = true

  if (prefersReducedMotion()) {
    applyProgress(m, 1)
    launchOrigin = { cx: m.cx, cy: m.cy, w: m.w, h: m.h }
    setState(true)
    busy = false
    return
  }

  const start = performance.now()
  function frame(now) {
    const p = Math.min(1, (now - start) / DURATION_MS)
    const eased = 1 - Math.pow(1 - p, 3)
    applyProgress(m, eased)
    if (p < 1) {
      animFrame = window.requestAnimationFrame(frame)
    } else {
      launchOrigin = { cx: m.cx, cy: m.cy, w: m.w, h: m.h }
      setState(true)
      app.style.cssText = ''
      app.classList.add('is-internals-visible')
      busy = false
    }
  }
  animFrame = window.requestAnimationFrame(frame)
}

function animateClose() {
  if (busy || !open) return
  const scaffold = document.querySelector('[data-alf-scaffold]')
  const app = document.querySelector('[data-alf-app]')
  if (!scaffold || !app || !launchOrigin) return

  const m = {
    scaffold,
    app,
    ...launchOrigin,
  }
  busy = true

  if (prefersReducedMotion()) {
    setState(false)
    busy = false
    return
  }

  const start = performance.now()
  function frame(now) {
    const p = Math.min(1, (now - start) / DURATION_MS)
    const eased = 1 - Math.pow(1 - p, 3)
    applyProgress(m, 1 - eased)
    if (p < 1) {
      animFrame = window.requestAnimationFrame(frame)
    } else {
      setState(false)
      m.app.style.cssText = ''
      m.app.classList.remove('is-internals-visible')
      busy = false
    }
  }
  animFrame = window.requestAnimationFrame(frame)
}

export function resetAppLaunchFromIcon() {
  clearAnim()
  busy = false
  launchOrigin = null
  const app = document.querySelector('[data-alf-app]')
  if (app) {
    app.style.cssText = ''
    app.classList.remove('is-internals-visible')
  }
  setState(false)
}

export function replayAppLaunchFromIcon() {
  resetAppLaunchFromIcon()
}

function bindUi() {
  document.querySelector('[data-alf-source]')?.addEventListener('click', animateLaunch)
  document.querySelector('[data-alf-close]')?.addEventListener('click', animateClose)

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') replayAppLaunchFromIcon()
  })
}

bindUi()
resetAppLaunchFromIcon()

export const APP_LAUNCH_FROM_ICON_CONTRACT = {
  DURATION_MS,
  START_SCALE,
  RADIUS_START_PX,
  INTERNALS_THRESHOLD,
}
