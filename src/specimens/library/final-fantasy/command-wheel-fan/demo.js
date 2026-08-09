(() => {
  const menu = document.querySelector('[data-jrpg-wheel]')
  if (!menu) return

  const toggle = menu.querySelector('[data-jrpg-toggle]')
  const commands = [...menu.querySelectorAll('[data-command]')]
  const status = menu.querySelector('[data-jrpg-status]')
  let activeIndex = 0
  let settleTimer
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ||
    Boolean(document.querySelector('[data-force-reduced-motion="true"]'))

  const setActive = (index, announce = true) => {
    activeIndex = (index + commands.length) % commands.length
    commands.forEach((command, commandIndex) => {
      command.classList.toggle('is-active', commandIndex === activeIndex)
    })
    if (announce) status.textContent = `${commands[activeIndex].dataset.command} selected`
  }

  const open = (focusCommand = false) => {
    clearTimeout(settleTimer)
    menu.classList.remove('is-settled')
    menu.dataset.state = 'open'
    toggle.setAttribute('aria-expanded', 'true')
    commands.forEach((command) => {
      command.disabled = false
    })
    setActive(activeIndex, false)
    if (reducedMotion) menu.classList.add('is-settled')
    else settleTimer = setTimeout(() => menu.classList.add('is-settled'), 480)
    if (focusCommand) commands[activeIndex].focus()
  }

  const close = () => {
    clearTimeout(settleTimer)
    menu.classList.remove('is-settled')
    menu.dataset.state = 'closed'
    toggle.setAttribute('aria-expanded', 'false')
    commands.forEach((command) => {
      command.disabled = true
      command.classList.remove('is-active')
    })
    status.textContent = 'Command menu closed'
    toggle.focus()
  }

  toggle.addEventListener('click', () => {
    if (menu.dataset.state === 'open') close()
    else open(true)
  })

  commands.forEach((command, index) => {
    command.addEventListener('focus', () => setActive(index, false))
    command.addEventListener('click', () => {
      setActive(index)
      status.textContent = `${command.dataset.command} activated`
    })
    command.addEventListener('keydown', (event) => {
      const direction = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 1
        : event.key === 'ArrowUp' || event.key === 'ArrowLeft' ? -1
          : 0

      if (direction) {
        event.preventDefault()
        setActive(activeIndex + direction)
        commands[activeIndex].focus()
      }
    })
  })

  requestAnimationFrame(() => open())
})()
