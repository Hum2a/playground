/**
 * Floating Label Lift — outlined field with semantic label relocation.
 * Sandbox-safe (no parent / storage / network).
 */

function field() {
  return document.querySelector('[data-fll-field]')
}

function input() {
  return document.querySelector('[data-fll-input]')
}

function support() {
  return document.querySelector('[data-fll-support]')
}

function statusEl() {
  return document.querySelector('[data-fll-status]')
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function syncFilled() {
  const el = field()
  const inp = input()
  if (!el || !inp) return
  el.classList.toggle('is-filled', inp.value.trim().length > 0)
}

function syncFocus(focused) {
  field()?.classList.toggle('is-focused', focused)
}

export function resetFloatingLabelLift() {
  const inp = input()
  const el = field()
  const sup = support()
  if (inp) {
    inp.value = ''
    inp.blur()
  }
  el?.classList.remove('is-error', 'is-focused', 'is-filled')
  if (sup) {
    sup.textContent = ''
    sup.hidden = true
  }
  setStatus('Focus or type to lift the label.')
}

function bindUi() {
  const inp = input()
  const toggle = document.querySelector('[data-fll-error-toggle]')
  if (!inp) return

  inp.addEventListener('focus', () => {
    syncFocus(true)
    setStatus('Label lifted to y=-7px with 12px type.')
  })
  inp.addEventListener('blur', () => {
    syncFocus(false)
    syncFilled()
    if (!inp.value.trim()) {
      setStatus('Focus or type to lift the label.')
    }
  })
  inp.addEventListener('input', () => {
    syncFilled()
    setStatus(
      inp.value.trim()
        ? 'Label stays floated while value is non-empty.'
        : 'Label returns when empty and unfocused.',
    )
  })

  toggle?.addEventListener('click', () => {
    const el = field()
    const sup = support()
    if (!el || !sup) return
    const next = !el.classList.contains('is-error')
    el.classList.toggle('is-error', next)
    if (next) {
      sup.hidden = false
      sup.textContent = 'Enter a valid email address.'
      setStatus('Error text below field; label position unchanged.')
    } else {
      sup.textContent = ''
      sup.hidden = true
      setStatus('Error cleared.')
    }
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetFloatingLabelLift()
    }
  })
}

bindUi()
resetFloatingLabelLift()

export const FLOATING_LABEL_LIFT_CONTRACT = {
  FIELD_W: 300,
  FIELD_H: 58,
  LABEL_REST_X: 16,
  LABEL_FLOAT_X: 12,
  LABEL_FLOAT_Y: -7,
  TRANSITION_MS: 180,
}
