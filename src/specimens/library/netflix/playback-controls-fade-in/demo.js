/**
 * Playback Controls Fade-In (SPX-3161) — tiny portable interaction.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * Pointer movement, focus, or the SHOW CONTROLS button reveal the control
 * bar over the player surface. After 900ms of no further activity, the
 * controls dissolve again.
 */

const IDLE_MS = 900

let idleTimer = null

function rootEl() {
  return document.querySelector('[data-playback-controls-fade-in]')
}

function show(root) {
  root.classList.add('is-visible')
  const status = root.querySelector('[data-pcf-status]')
  if (status) status.textContent = 'Controls visible'
  window.clearTimeout(idleTimer)
  idleTimer = window.setTimeout(() => hide(root), IDLE_MS)
}

function hide(root) {
  root.classList.remove('is-visible')
  const status = root.querySelector('[data-pcf-status]')
  if (status) status.textContent = 'Controls hidden'
  window.clearTimeout(idleTimer)
}

function bindUi() {
  const root = rootEl()
  if (!root) return
  const player = root.querySelector('[data-pcf-player]')
  const reveal = () => show(root)

  player?.addEventListener('mousemove', reveal)
  player?.addEventListener('mouseenter', reveal)
  player?.addEventListener('focusin', reveal)
  player?.addEventListener('keydown', reveal)
  root.querySelector('[data-pcf-show]')?.addEventListener('click', reveal)

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') hide(root)
  })

  hide(root)
}

bindUi()
