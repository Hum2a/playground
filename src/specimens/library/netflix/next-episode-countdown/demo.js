/**
 * Next Episode Countdown (SPX-3184) — tiny portable interaction.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * At end of episode, a next-up card counts down 5 -> 0 then hands off to
 * the next episode automatically. CANCEL stops the countdown and keeps
 * the current end-state; PLAY NOW hands off immediately.
 */

const COUNT_START = 5
const TICK_MS = 700

let timers = []
let count = COUNT_START
let settled = false

function rootEl() {
  return document.querySelector('[data-next-episode-countdown]')
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

function renderCount(root) {
  const countEl = root.querySelector('[data-nec-count]')
  const ring = root.querySelector('[data-nec-ring]')
  const status = root.querySelector('[data-nec-status]')
  if (countEl) countEl.textContent = String(count)
  if (ring) ring.style.setProperty('--nec-progress', String((COUNT_START - count) / COUNT_START))
  if (status) status.textContent = `Next episode in ${count} second${count === 1 ? '' : 's'}`
}

function tick(root) {
  count -= 1
  if (count <= 0) {
    count = 0
    renderCount(root)
    handoff(root)
    return
  }
  renderCount(root)
  later(TICK_MS, () => tick(root))
}

function startCountdown(root) {
  clearTimers()
  settled = false
  count = COUNT_START
  root.setAttribute('data-state', 'counting')
  root.classList.remove('is-dismissed')
  const scene = root.querySelector('[data-nec-scene-label]')
  if (scene) scene.textContent = 'END OF EPISODE'
  const replay = root.querySelector('[data-nec-replay]')
  if (replay) replay.hidden = true
  renderCount(root)
  later(TICK_MS, () => tick(root))
}

function handoff(root) {
  if (settled) return
  settled = true
  clearTimers()
  root.setAttribute('data-state', 'playing')
  root.classList.add('is-dismissed')
  const scene = root.querySelector('[data-nec-scene-label]')
  if (scene) scene.textContent = 'PLAYING EP. 05 — SIGNAL DRIFT'
  const status = root.querySelector('[data-nec-status]')
  if (status) status.textContent = 'Handed off to the next episode'
  const replay = root.querySelector('[data-nec-replay]')
  if (replay) replay.hidden = false
}

function cancel(root) {
  if (settled) return
  settled = true
  clearTimers()
  root.setAttribute('data-state', 'cancelled')
  root.classList.add('is-dismissed')
  const status = root.querySelector('[data-nec-status]')
  if (status) status.textContent = 'Countdown cancelled — staying on this episode'
  const replay = root.querySelector('[data-nec-replay]')
  if (replay) replay.hidden = false
}

function bindUi() {
  const root = rootEl()
  if (!root) return

  root.querySelector('[data-nec-cancel]')?.addEventListener('click', () => cancel(root))
  root.querySelector('[data-nec-play]')?.addEventListener('click', () => handoff(root))
  root.querySelector('[data-nec-replay]')?.addEventListener('click', () => startCountdown(root))

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') startCountdown(root)
  })

  startCountdown(root)
}

bindUi()
