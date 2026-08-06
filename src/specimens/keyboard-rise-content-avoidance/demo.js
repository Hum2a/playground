/**
 * Keyboard Rise & Content Avoidance — simulated keyboard reflows viewport.
 */

const KEYBOARD_H = 260
const RISE_MS = 260
const GAP = 16

let scrollBefore = 0

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-keyboard-rise-content-avoidance]')
}

function messages() {
  return document.querySelector('[data-krca-messages]')
}

function setPhase(phase) {
  root()?.setAttribute('data-phase', phase)
}

function setStatus(text) {
  const el = document.querySelector('[data-krca-status]')
  if (el) el.textContent = text
}

function openKeyboard(input) {
  const kb = document.querySelector('[data-krca-keyboard]')
  kb?.removeAttribute('hidden')
  kb?.setAttribute('aria-hidden', 'false')
  setPhase('open')
  setStatus('Keyboard raised — content reflowed.')

  const msgs = messages()
  if (msgs && input?.classList.contains('krca__input') && input === document.querySelector('[data-krca-input-bottom]')) {
    scrollBefore = msgs.scrollTop
    window.requestAnimationFrame(() => {
      input.scrollIntoView({ block: 'nearest', behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
    })
  }
}

function closeKeyboard() {
  const kb = document.querySelector('[data-krca-keyboard]')
  kb?.setAttribute('hidden', '')
  kb?.setAttribute('aria-hidden', 'true')
  setPhase('idle')
  const msgs = messages()
  if (msgs) msgs.scrollTop = scrollBefore
  setStatus('Keyboard dismissed — layout restored.')
}

function bindUi() {
  document.querySelectorAll('.krca__input').forEach((input) => {
    input.addEventListener('focus', () => openKeyboard(input))
  })

  document.querySelector('[data-krca-dismiss]')?.addEventListener('click', () => {
    document.activeElement?.blur()
    closeKeyboard()
  })

  document.querySelector('[data-krca-input-bottom]')?.addEventListener('blur', (e) => {
    if (!document.querySelector('[data-krca-input-top]')?.matches(':focus')) {
      window.setTimeout(() => {
        if (!document.querySelector('.krca__input:focus')) closeKeyboard()
      }, 120)
    }
  })
}

bindUi()

export function resetKeyboardRiseContentAvoidance() {
  closeKeyboard()
  setStatus('Focus an input to raise keyboard.')
}

export const KEYBOARD_RISE_CONTENT_AVOIDANCE_CONTRACT = { KEYBOARD_H, RISE_MS, GAP }
