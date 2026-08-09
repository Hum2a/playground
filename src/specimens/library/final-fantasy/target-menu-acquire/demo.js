(() => {
  const targeting = document.querySelector('[data-jrpg-targeting]')
  if (!targeting) return

  const scene = targeting.querySelector('[data-target-scene]')
  const reticle = targeting.querySelector('[data-target-reticle]')
  const targets = [...targeting.querySelectorAll('[data-target]')]
  const status = targeting.querySelector('[data-target-status]')
  let selectedIndex = 0

  const selectTarget = (index, announce = true) => {
    selectedIndex = (index + targets.length) % targets.length
    const selected = targets[selectedIndex]

    targeting.dataset.state = 'open'
    reticle.style.setProperty('--reticle-x', selected.style.getPropertyValue('--x'))
    reticle.style.setProperty('--reticle-y', selected.style.getPropertyValue('--y'))
    targets.forEach((target, targetIndex) => {
      target.classList.toggle('is-selected', targetIndex === selectedIndex)
    })
    if (announce) status.textContent = `${selected.textContent.trim()} acquired`
  }

  const open = () => {
    selectTarget(selectedIndex, false)
    status.textContent = `${targets[selectedIndex].textContent.trim()} acquired`
  }

  targets.forEach((target, index) => {
    target.addEventListener('click', () => selectTarget(index))
    target.addEventListener('focus', () => selectTarget(index, false))
  })

  targeting.addEventListener('keydown', (event) => {
    const direction = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1
      : event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1
        : 0

    if (direction) {
      event.preventDefault()
      selectTarget(selectedIndex + direction)
      targets[selectedIndex].focus()
      return
    }

    if (event.key === 'Enter') {
      event.preventDefault()
      status.textContent = `${targets[selectedIndex].textContent.trim()} confirmed`
      return
    }

    if (event.key === 'Escape') {
      event.preventDefault()
      targeting.dataset.state = 'cancelled'
      status.textContent = 'Targeting cancelled'
    }
  })

  scene.addEventListener('click', (event) => {
    if (event.target === scene && targeting.dataset.state === 'cancelled') open()
  })

  requestAnimationFrame(open)
})()
