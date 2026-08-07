/**
 * Achievement Encounter — tiny portable rare-encounter API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

const STREAK_MS = 350
const ARENA_MS = 250
const SIGNAL_MS = 400
const MESSAGE_MS = 250
/** Full sequence = STREAK + ARENA + SIGNAL + MESSAGE = 1250ms */

const PHASES = ['ae--streaks', 'ae--arena', 'ae--signal', 'ae--message', 'ae--settled', 'ae--reduced', 'ae--active']

let busy = false
let settled = false
let announced = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-achievement-encounter]')
}

function overlayEl(root) {
  return root.querySelector('[data-achievement-encounter-overlay]')
}

function statusEl(root) {
  return root.querySelector('[data-achievement-encounter-status]')
}

function clearPhases(root) {
  root.classList.remove(...PHASES)
}

function announce(root) {
  if (announced) return
  const status = statusEl(root)
  if (!status) return
  status.textContent = ''
  void status.offsetWidth
  status.textContent = 'Rare encounter identified: Anomaly 010'
  announced = true
}

function showOverlay(root, show) {
  const overlay = overlayEl(root)
  if (!overlay) return
  if (show) overlay.removeAttribute('hidden')
  else overlay.setAttribute('hidden', '')
}

/**
 * Run the encounter sequence (or instant RM settle).
 * @returns {Promise<void>}
 */
export function runAchievementEncounter() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  busy = true
  settled = false
  announced = false
  clearPhases(root)
  showOverlay(root, true)
  root.classList.add('ae--active')
  void root.offsetWidth

  const status = statusEl(root)
  if (status) status.textContent = ''

  if (prefersReducedMotion()) {
    root.classList.add('ae--reduced', 'ae--settled', 'ae--arena', 'ae--signal', 'ae--message')
    announce(root)
    busy = false
    settled = true
    return Promise.resolve()
  }

  root.classList.add('ae--streaks')

  return new Promise((resolve) => {
    window.setTimeout(() => {
      root.classList.remove('ae--streaks')
      root.classList.add('ae--arena')

      window.setTimeout(() => {
        root.classList.add('ae--signal')

        window.setTimeout(() => {
          root.classList.add('ae--message')

          window.setTimeout(() => {
            root.classList.add('ae--settled')
            announce(root)
            busy = false
            settled = true
            resolve()
          }, MESSAGE_MS)
        }, SIGNAL_MS)
      }, ARENA_MS)
    }, STREAK_MS)
  })
}

/**
 * Reset to the trigger state (concealed encounter).
 * @returns {Promise<void>}
 */
export function resetAchievementEncounter() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  busy = true
  settled = false
  announced = false
  clearPhases(root)
  showOverlay(root, false)
  const status = statusEl(root)
  if (status) status.textContent = ''
  busy = false
  return Promise.resolve()
}

/**
 * Reset then run again — no DOM accumulation.
 * @returns {Promise<void>}
 */
export async function replayAchievementEncounter() {
  if (busy) return
  await resetAchievementEncounter()
  await runAchievementEncounter()
}

function bindUi() {
  const root = rootEl()
  const trigger = root?.querySelector('[data-achievement-encounter-trigger]')

  trigger?.addEventListener('click', () => {
    void runAchievementEncounter()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayAchievementEncounter()
  })
}

bindUi()
