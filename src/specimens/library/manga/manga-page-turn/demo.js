;(function () {
  const root = document.querySelector('.manga-page-turn')
  if (!root) return

  const next = root.querySelector('[data-page-next]')
  const reset = root.querySelector('[data-page-reset]')
  const current = root.querySelector('.manga-page-turn__page--current')
  const status = root.querySelector('[data-page-status]')
  const reduced = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    document.documentElement.dataset.forceReducedMotion === 'true'

  function complete() {
    root.dataset.pageState = 'second'
    next.disabled = true
    status.textContent = 'Page 005 is flat and ready.'
  }

  function turn() {
    if (root.dataset.pageState !== 'first') return
    if (reduced()) {
      complete()
      return
    }
    root.dataset.pageState = 'turning'
    next.disabled = true
    status.textContent = 'Turning page right to left.'
    current.addEventListener('transitionend', complete, { once: true })
  }

  function replay() {
    root.dataset.pageState = 'first'
    next.disabled = false
    status.textContent = 'Page 004 is ready to turn left.'
  }

  next.addEventListener('click', turn)
  reset.addEventListener('click', replay)
})()
