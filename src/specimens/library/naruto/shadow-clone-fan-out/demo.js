/**
 * Shadow Clone Fan-Out — one source card fans three proxy clones into worker slots.
 * iframe-safe; no storage / parent / network.
 */

const TARGETS = [
  { left: '16.6%', top: '82%' },
  { left: '50%', top: '82%' },
  { left: '83.4%', top: '82%' },
]
const STAGGER_MS = 70
const FAN_MS = 180
const SETTLE_MS = 90
const ARRIVE_AT = TARGETS.map((_, i) => i * STAGGER_MS + FAN_MS)
const TOTAL_MS = ARRIVE_AT[ARRIVE_AT.length - 1] + SETTLE_MS

let busy = false
let done = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-scf]')
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

function setLive(text) {
  const el = document.querySelector('[data-scf-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-scf-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-scf-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-scf-run], [data-scf-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function clones() {
  return Array.from(document.querySelectorAll('[data-scf-clone]'))
}

function slots() {
  return Array.from(document.querySelectorAll('[data-scf-slot]'))
}

function fillSlot(i) {
  const slot = slots()[i]
  if (!slot) return
  slot.setAttribute('data-filled', 'true')
  slot.setAttribute('aria-label', `Worker slot ${i + 1} online`)
  const label = slot.querySelector('[data-scf-slot-label]')
  if (label) label.textContent = `WORKER ${i + 1} ONLINE`
}

function resetSlot(i) {
  const slot = slots()[i]
  if (!slot) return
  slot.removeAttribute('data-filled')
  slot.setAttribute('aria-label', `Worker slot ${i + 1} empty`)
  const label = slot.querySelector('[data-scf-slot-label]')
  if (label) label.textContent = `WORKER ${i + 1}`
}

function fadeOutClone(i) {
  const clone = clones()[i]
  if (clone) clone.style.opacity = '0'
}

function setSourceKicker(text) {
  const el = document.querySelector('[data-scf-source-kicker]')
  if (el) el.textContent = text
}

function showDone() {
  done = true
  clones().forEach((c) => {
    c.style.opacity = '0'
  })
  TARGETS.forEach((_, i) => fillSlot(i))
  setSourceKicker('SOURCE · ORIGIN')
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('FANNED OUT')
  setHint('Three clones online.')
  setLive('Fan-out complete. Three worker clones online.')
}

function resetVisual() {
  done = false
  clones().forEach((c) => {
    c.style.left = '50%'
    c.style.top = '17%'
    c.style.opacity = '0'
  })
  TARGETS.forEach((_, i) => resetSlot(i))
  setSourceKicker('SOURCE')
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('IDLE')
  setHint('Press Run to fan out three clones.')
  setLive('Idle. Source task ready to fan out.')
}

/**
 * Auto-run full fan-out choreography.
 * @returns {Promise<void>}
 */
export function runShadowCloneFanOut() {
  const root = rootEl()
  if (!root || busy || done) return Promise.resolve()

  busy = true
  clearTimers()
  resetVisual()
  setButtons(false)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    showDone()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  root.setAttribute('data-phase', 'fanning')
  setStatus('FANNING OUT')
  setHint('Clones spawning.')
  setLive('Fanning out clones.')

  const list = clones()
  list.forEach((clone, i) => {
    void clone.offsetWidth
    clone.style.opacity = '1'
    clone.style.left = TARGETS[i].left
    clone.style.top = TARGETS[i].top
  })

  return new Promise((resolve) => {
    ARRIVE_AT.forEach((ms, i) => {
      later(ms, () => {
        fillSlot(i)
        fadeOutClone(i)
        setLive(`Worker ${i + 1} online.`)
      })
    })
    later(TOTAL_MS, () => {
      showDone()
      busy = false
      setButtons(true)
      resolve()
    })
  })
}

export function resetShadowCloneFanOut() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayShadowCloneFanOut() {
  if (busy) return
  resetShadowCloneFanOut()
  void rootEl()?.offsetWidth
  await runShadowCloneFanOut()
}

function bindUi() {
  document.querySelector('[data-scf-run]')?.addEventListener('click', () => {
    void runShadowCloneFanOut()
  })
  document.querySelector('[data-scf-replay]')?.addEventListener('click', () => {
    void replayShadowCloneFanOut()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayShadowCloneFanOut()
  })
}

bindUi()
resetShadowCloneFanOut()
