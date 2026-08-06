/**
 * Skip Intro Appear (SPX-3178) — tiny portable interaction.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * During the simulated 0-3s intro, the SKIP INTRO button fades in shortly
 * after start and remains available only while the intro is playing.
 * Activating it — or reaching the end of the window — moves to episode
 * phase and the button disappears.
 */

const APPEAR_DELAY_MS = 400
const INTRO_DURATION_MS = 3000
const TICK_MS = 1000

let timers = []
let tickCount = 0

function rootEl() {
  return document.querySelector('[data-skip-intro-appear]')
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

function setClock(root, seconds) {
  const status = root.querySelector('[data-sia-status]')
  if (status) status.textContent = `Intro playing — 00:0${seconds}`
}

function showSkip(root) {
  const skip = root.querySelector('[data-sia-skip]')
  if (!skip) return
  skip.classList.add('is-visible')
  skip.setAttribute('aria-hidden', 'false')
  skip.tabIndex = 0
}

function hideSkip(root) {
  const skip = root.querySelector('[data-sia-skip]')
  if (!skip) return
  skip.classList.remove('is-visible')
  skip.setAttribute('aria-hidden', 'true')
  skip.tabIndex = -1
}

function toEpisode(root) {
  clearTimers()
  hideSkip(root)
  root.setAttribute('data-phase', 'episode')
  const label = root.querySelector('[data-sia-label]')
  if (label) label.textContent = 'EPISODE'
  const status = root.querySelector('[data-sia-status]')
  if (status) status.textContent = 'Episode playing — intro skipped or complete'
}

function startIntro(root) {
  clearTimers()
  root.setAttribute('data-phase', 'intro')
  hideSkip(root)
  tickCount = 0
  const label = root.querySelector('[data-sia-label]')
  if (label) label.textContent = 'INTRO'
  setClock(root, 0)

  later(APPEAR_DELAY_MS, () => showSkip(root))

  const totalTicks = Math.floor(INTRO_DURATION_MS / TICK_MS)
  function tick() {
    tickCount += 1
    setClock(root, tickCount)
    if (tickCount >= totalTicks) return
    later(TICK_MS, tick)
  }
  later(TICK_MS, tick)

  later(INTRO_DURATION_MS, () => toEpisode(root))
}

function bindUi() {
  const root = rootEl()
  if (!root) return

  root.querySelector('[data-sia-skip]')?.addEventListener('click', () => {
    if (root.getAttribute('data-phase') !== 'intro') return
    toEpisode(root)
  })

  root.querySelector('[data-sia-replay]')?.addEventListener('click', () => startIntro(root))

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') startIntro(root)
  })

  startIntro(root)
}

bindUi()
