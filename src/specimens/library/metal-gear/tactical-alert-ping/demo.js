/**
 * Tactical Alert Ping — tiny portable trigger API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

const TOTAL_MS = 650
const HOST_NUDGE_MS = 70

let busy = false
let visible = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-tactical-alert]')
}

function hostEl() {
  return document.querySelector('[data-tactical-alert-host]')
}

function clearMotionClasses(root) {
  root.classList.remove(
    'tactical-alert--fire',
    'tactical-alert--settled',
    'tactical-alert--reduced',
  )
}

function nudgeHost() {
  const host = hostEl()
  if (!host || prefersReducedMotion()) return
  host.classList.add('tactical-alert-host--hit')
  window.setTimeout(() => {
    host.classList.remove('tactical-alert-host--hit')
  }, HOST_NUDGE_MS)
}

/**
 * Fire the detection ping. Reuses the existing DOM node.
 * @returns {Promise<void>}
 */
export function fireTacticalAlert() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  busy = true
  clearMotionClasses(root)
  root.hidden = false
  void root.offsetWidth

  if (prefersReducedMotion()) {
    root.classList.add('tactical-alert--reduced', 'tactical-alert--settled')
    busy = false
    visible = true
    return Promise.resolve()
  }

  root.classList.add('tactical-alert--fire')
  nudgeHost()

  return new Promise((resolve) => {
    window.setTimeout(() => {
      clearMotionClasses(root)
      root.hidden = true
      busy = false
      visible = false
      resolve()
    }, TOTAL_MS)
  })
}

/**
 * Hide the alert and clear state.
 */
export function resetTacticalAlert() {
  const root = rootEl()
  if (!root) return
  clearMotionClasses(root)
  root.hidden = true
  hostEl()?.classList.remove('tactical-alert-host--hit')
  busy = false
  visible = false
}

/**
 * Reset then fire again — no DOM accumulation.
 * @returns {Promise<void>}
 */
export async function replayTacticalAlert() {
  if (busy) return
  if (visible) resetTacticalAlert()
  await fireTacticalAlert()
}

function bindUi() {
  document
    .querySelectorAll('[data-tactical-alert-trigger]')
    .forEach((btn) => {
      btn.addEventListener('click', () => {
        void replayTacticalAlert()
      })
    })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayTacticalAlert()
  })
}

bindUi()
