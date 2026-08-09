/**
 * Current Direction Indicator — tiny portable direction control.
 * Changing animation-direction preserves the current animation timeline.
 */

function setDirection(root, direction) {
  const label = root.querySelector('[data-current-label]')
  const status = root.querySelector('[data-current-status]')
  const isEast = direction === 'east'

  root.setAttribute('data-direction', direction)
  if (label) label.textContent = isEast ? 'East' : 'West'
  if (status) status.textContent = `Current travelling ${isEast ? 'East' : 'West'}.`
}

function bindCurrentDirection() {
  document.querySelectorAll('[data-current-direction]').forEach((root) => {
    const control = root.querySelector('[data-current-reverse]')
    if (!control) return

    control.addEventListener('click', () => {
      const next = root.getAttribute('data-direction') === 'east' ? 'west' : 'east'
      setDirection(root, next)
    })
  })
}

bindCurrentDirection()
