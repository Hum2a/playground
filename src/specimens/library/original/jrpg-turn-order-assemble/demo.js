(() => {
  const timeline = document.querySelector('[data-turn-order]')
  if (!timeline) return

  const tokens = [...timeline.querySelectorAll('[data-actor]')]
  const status = timeline.querySelector('[data-turn-status]')
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ||
    Boolean(document.querySelector('[data-force-reduced-motion="true"]'))
  let settleTimer

  const setActive = (index, announce = true) => {
    tokens.forEach((token, tokenIndex) => {
      token.classList.toggle('is-active', tokenIndex === index)
    })
    if (announce) status.textContent = `${tokens[index].dataset.actor} active`
  }

  const open = () => {
    timeline.dataset.state = 'open'
    setActive(0, false)
    if (reducedMotion) timeline.classList.add('is-settled')
    else settleTimer = setTimeout(() => timeline.classList.add('is-settled'), 590)
  }

  tokens.forEach((token, index) => {
    token.addEventListener('click', () => setActive(index))
    token.addEventListener('focus', () => setActive(index, false))
  })

  requestAnimationFrame(open)
  window.addEventListener('beforeunload', () => clearTimeout(settleTimer), { once: true })
})()
