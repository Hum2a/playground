const PARTICLES = [
  [1, 12, 18], [1, 67, 12], [1, 140, 25], [1, 248, 16], [1, 294, 57], [1, 302, 126],
  [2, 22, 181], [2, 74, 148], [2, 119, 205], [2, 207, 193], [2, 274, 170], [2, 306, 207],
  [3, 9, 98], [3, 48, 61], [3, 103, 115], [3, 211, 76], [3, 259, 103], [3, 315, 34],
  [4, 30, 31], [4, 82, 190], [4, 151, 9], [4, 232, 209], [4, 280, 91], [4, 309, 154],
]
const DURATIONS = [420, 340, 270, 200]
const STAGGER_MS = 30
let busy = false
let done = false
let timers = []

function rootEl() { return document.querySelector('[data-ki-charge-meter]') }
function reduced() {
  return document.documentElement.getAttribute('data-force-reduced-motion') === 'true' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
function later(ms, fn) { const id = window.setTimeout(fn, ms); timers.push(id) }
function clearTimers() { timers.forEach(window.clearTimeout); timers = [] }
function setText(root, percent, state) {
  root.querySelector('[data-kcm-percent]').textContent = `${percent}%`
  root.querySelector('[data-kcm-progress-text]').textContent =
    `Progress: ${percent}%. Status: ${state.toLowerCase()}.`
}
function announce(root, text) {
  const el = root.querySelector('[data-kcm-status]')
  el.textContent = ''; void el.offsetWidth; el.textContent = text
}
function buildParticles(root) {
  const field = root.querySelector('[data-kcm-field]')
  field.querySelectorAll('.kcm__particle').forEach((el) => el.remove())
  PARTICLES.forEach(([group, x, y], index) => {
    const el = document.createElement('span')
    el.className = 'kcm__particle'
    el.dataset.group = String(group)
    el.style.setProperty('--x', `${x}px`)
    el.style.setProperty('--y', `${y}px`)
    el.style.transitionDelay = `${(index % 6) * STAGGER_MS}ms`
    field.append(el)
  })
}
function final(root) {
  root.className = 'kcm kcm--stage-4 kcm--ready'
  root.dataset.state = 'ready'
  setText(root, 100, 'READY')
  root.querySelector('[data-kcm-charge]').disabled = true
  busy = false; done = true
  announce(root, 'Build release is 100 percent. Ready.')
}
export function runKiChargeMeter() {
  const root = rootEl()
  if (!root || busy || done) return Promise.resolve()
  busy = true
  root.querySelector('[data-kcm-charge]').disabled = true
  if (reduced()) { final(root); return Promise.resolve() }
  let offset = 0
  return new Promise((resolve) => {
    DURATIONS.forEach((duration, index) => {
      const group = index + 1
      later(offset, () => root.classList.add(`kcm--group-${group}`))
      const completeAt = offset + duration + STAGGER_MS * 5
      later(completeAt, () => {
        root.classList.add(`kcm--stage-${group}`)
        setText(root, group * 25, 'CHARGING')
      })
      offset = completeAt
    })
    later(offset + 10, () => { final(root); resolve() })
  })
}
export function resetKiChargeMeter() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()
  clearTimers(); done = false
  root.className = 'kcm'; root.dataset.state = 'idle'
  buildParticles(root); setText(root, 0, 'CHARGING')
  root.querySelector('[data-kcm-charge]').disabled = false
  root.querySelector('[data-kcm-status]').textContent = ''
  return Promise.resolve()
}
export async function replayKiChargeMeter() { if (!busy) await resetKiChargeMeter() }
function bindUi() {
  const root = rootEl(); if (!root) return
  buildParticles(root)
  root.querySelector('[data-kcm-charge]').addEventListener('click', () => void runKiChargeMeter())
  window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'restart') void replayKiChargeMeter()
  })
}
bindUi()
