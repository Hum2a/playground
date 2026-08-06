/**
 * Dramatic Objection Error — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

const VALID_CODE = 'ARCHIVE'
const ERROR_TEXT = "That code isn't valid."
const BURST_MS = 80
const STRIP_AT_MS = 300
const HOLD_AT_MS = 520
const INLINE_AT_MS = 900

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function root() {
  return document.querySelector('[data-dramatic-objection]')
}

function clearTimers() {
  timers.forEach((id) => window.clearTimeout(id))
  timers = []
}

function later(fn, ms) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
  return id
}

function clearPhases(el) {
  el.classList.remove(
    'dramatic-objection--armed',
    'dramatic-objection--burst',
    'dramatic-objection--shout',
    'dramatic-objection--strip',
    'dramatic-objection--hold',
    'dramatic-objection--inline',
  )
}

function setFieldError(active) {
  const input = document.querySelector('[data-do-input]')
  const error = document.querySelector('[data-do-error]')
  if (!input || !error) return

  if (active) {
    input.setAttribute('aria-invalid', 'true')
    error.textContent = ERROR_TEXT
    error.hidden = false
  } else {
    input.removeAttribute('aria-invalid')
    error.textContent = ''
    error.hidden = true
  }
}

/**
 * Run the HOLD IT interruption for a major validation failure.
 * @returns {Promise<void>}
 */
export function runDramaticObjection() {
  const el = root()
  if (!el || busy) return Promise.resolve()

  busy = true
  clearTimers()
  clearPhases(el)
  setFieldError(true)

  if (prefersReducedMotion()) {
    void el.offsetWidth
    el.classList.add('dramatic-objection--hold')
    later(() => {
      clearPhases(el)
      el.classList.add('dramatic-objection--inline')
      busy = false
    }, 400)
    return Promise.resolve()
  }

  void el.offsetWidth
  el.classList.add('dramatic-objection--burst')

  later(() => {
    el.classList.remove('dramatic-objection--burst')
    el.classList.add('dramatic-objection--shout')
  }, BURST_MS)

  later(() => {
    el.classList.remove('dramatic-objection--shout')
    el.classList.add('dramatic-objection--strip')
  }, STRIP_AT_MS)

  later(() => {
    el.classList.remove('dramatic-objection--strip')
    el.classList.add('dramatic-objection--hold')
  }, HOLD_AT_MS)

  later(() => {
    clearPhases(el)
    el.classList.add('dramatic-objection--inline')
    busy = false
  }, INLINE_AT_MS)

  return Promise.resolve()
}

function resetDemo() {
  const el = root()
  const form = document.querySelector('[data-do-form]')
  const input = document.querySelector('[data-do-input]')
  clearTimers()
  busy = false
  if (el) clearPhases(el)
  setFieldError(false)
  if (form) form.reset()
  if (input) input.value = ''
}

function onSubmit(event) {
  event.preventDefault()
  const input = document.querySelector('[data-do-input]')
  const value = (input?.value ?? '').trim().toUpperCase()

  if (value === VALID_CODE) {
    clearTimers()
    busy = false
    const el = root()
    if (el) clearPhases(el)
    setFieldError(false)
    return
  }

  void runDramaticObjection()
}

function bind() {
  // Preview iframe is sandbox="allow-scripts" only (no allow-forms), so native
  // form submission never fires. Drive the demo from button click / Enter.
  const form = document.querySelector('[data-do-form]')
  const submit = document.querySelector('[data-do-submit]')
  const input = document.querySelector('[data-do-input]')

  form?.addEventListener('submit', onSubmit)
  submit?.addEventListener('click', onSubmit)
  input?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') onSubmit(event)
  })
}

window.addEventListener('message', (event) => {
  const data = event.data
  if (!data || typeof data !== 'object') return
  if (data.type === 'restart') resetDemo()
})

bind()
