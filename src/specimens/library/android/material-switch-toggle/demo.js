/**
 * Material Switch Toggle — checkbox-driven track/thumb with touch ripple.
 * Sandbox-safe (no parent / storage / network).
 */

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function statusEl() {
  return document.querySelector('[data-mst-status]')
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function bindRipples() {
  document.querySelectorAll('[data-mst-switch]').forEach((label) => {
    const input = label.querySelector('[data-mst-input]')
    const ripple = label.querySelector('[data-mst-ripple]')
    if (!input || !ripple || input.disabled) return

    label.addEventListener('pointerdown', (event) => {
      if (event.button !== 0) return
      if (prefersReducedMotion()) return
      ripple.classList.remove('is-active')
      void ripple.offsetWidth
      ripple.classList.add('is-active')
      const thumb = label.querySelector('.mst__thumb')
      const track = label.querySelector('.mst__track')
      if (thumb && track) {
        const trackR = track.getBoundingClientRect()
        const thumbR = thumb.getBoundingClientRect()
        ripple.style.left = `${thumbR.left + thumbR.width / 2 - trackR.left}px`
      }
    })

    input.addEventListener('change', () => {
      setStatus(
        input.checked
          ? 'Switch on — thumb at +20px with check mark.'
          : 'Switch off — thumb at start position.',
      )
    })
  })
}

export function resetMaterialSwitchToggle() {
  document.querySelectorAll('[data-mst-input]').forEach((input, index) => {
    if (input.disabled) return
    input.checked = index === 1
    input.dispatchEvent(new Event('change'))
  })
  document.querySelectorAll('[data-mst-ripple]').forEach((r) => {
    r.classList.remove('is-active')
  })
  setStatus('Toggle the interactive switch with pointer or Space.')
}

function bindRestart() {
  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetMaterialSwitchToggle()
    }
  })
}

bindRipples()
bindRestart()
resetMaterialSwitchToggle()

export const MATERIAL_SWITCH_TOGGLE_CONTRACT = {
  TRACK_W: 52,
  TRACK_H: 32,
  THUMB_SIZE: 24,
  THUMB_TRAVEL: 20,
  TRACK_MS: 180,
}
