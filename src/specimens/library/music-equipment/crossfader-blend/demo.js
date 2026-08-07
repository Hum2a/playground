(() => {
  const root = document.querySelector('[data-music-effect]')
  if (!root) return
  const start = root.querySelector('[data-me-run]')
  const reset = root.querySelector('[data-me-reset]')
  const label = root.querySelector('[data-me-state]')
  const status = root.querySelector('[data-me-status]')
  let timer
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.forceReducedMotion === 'true'
  const set = (state, text, message) => {
    root.dataset.state = state
    label.textContent = text
    status.textContent = message
  }
  const finish = () => {
    timer = undefined
    set('final', '50 / 50', 'Channels A and B are blended at 50 / 50.')
    start.hidden = true
    reset.hidden = false
  }
  const engage = () => {
    clearTimeout(timer)
    set('action', 'BLENDING', 'Blending in progress.')
    start.disabled = true
    if (reduced()) { finish(); return }
    timer = setTimeout(finish, 560)
  }
  start.addEventListener('click', engage)
  reset.addEventListener('click', () => {
    clearTimeout(timer)
    set('idle', 'READY', 'Crossfader is parked on channel A.')
    start.disabled = false
    start.hidden = false
    reset.hidden = true
  })
  if (reduced()) engage()
})()
