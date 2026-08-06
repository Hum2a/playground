(() => {
  const root = document.querySelector('[data-bif]')
  if (!root) return
  const live = root.querySelector('[data-bif-live]')
  const card = root.querySelector('[data-bif-card]')
  const trigger = root.querySelector('[data-bif-trigger]')
  const reset = root.querySelector('[data-bif-reset]')
  const reduced = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    document.documentElement.dataset.forceReducedMotion === 'true'
  function setPhase(p) { root.dataset.phase = p }
  function run() {
    if (reduced()) { setPhase('done'); if (live) live.textContent = 'Boss encountered: King of Thieves.'; return }
    setPhase('freeze')
    if (live) live.textContent = 'Interface frozen.'
    setTimeout(() => { setPhase('card'); if (live) live.textContent = 'Boss encountered: King of Thieves.' }, 400)
    setTimeout(() => setPhase('done'), 1100)
  }
  function resetAll() { setPhase('idle'); if (live) live.textContent = 'Stand by.' }
  trigger.addEventListener('click', run)
  reset.addEventListener('click', resetAll)
})()