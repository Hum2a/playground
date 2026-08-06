/**
 * Pressed Control Compression — tactile press compression with release activation.
 * Sandbox-safe (no parent / storage / network).
 */

const BTN_W = 180
const BTN_H = 52
const PRESS_MS = 70
const RELEASE_UP_MS = 80
const RELEASE_SETTLE_MS = 90
const CANCEL_MS = 100

let pointerDown = false
let pointerInside = false
let activated = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-pressed-control]')
}

function btnEl() {
  return document.querySelector('[data-pcc-btn]')
}

function cardStateEl() {
  return document.querySelector('[data-pcc-card-state]')
}

function statusEl() {
  return document.querySelector('[data-pcc-status]')
}

function setPhase(phase) {
  const root = rootEl()
  if (root) root.setAttribute('data-phase', phase)
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function setPressed(on) {
  const btn = btnEl()
  if (!btn) return
  btn.classList.toggle('is-pressed', on)
  if (prefersReducedMotion() && on) {
    btn.classList.add('is-pressed-rm')
  } else {
    btn.classList.remove('is-pressed-rm')
  }
}

function activate() {
  activated = true
  setPhase('running')
  const card = cardStateEl()
  if (card) card.textContent = 'RUNNING'
  setStatus('Build running. Release inside activated control.')
}

export function resetPressedControlCompression() {
  activated = false
  pointerDown = false
  pointerInside = false
  const btn = btnEl()
  if (btn) {
    btn.classList.remove('is-pressed', 'is-pressed-rm', 'is-release', 'is-bounce')
    btn.disabled = false
  }
  const card = cardStateEl()
  if (card) card.textContent = 'READY'
  setPhase('idle')
  setStatus('Press RUN BUILD inside control bounds to activate.')
}

function onPointerDown(e) {
  const btn = btnEl()
  if (!btn || e.button !== 0 || activated) return
  pointerDown = true
  pointerInside = true
  setPhase('pressing')
  setPressed(true)
  setStatus('Control compressed.')
  btn.setPointerCapture(e.pointerId)
}

function onPointerMove(e) {
  if (!pointerDown) return
  const btn = btnEl()
  if (!btn) return
  const rect = btn.getBoundingClientRect()
  pointerInside =
    e.clientX >= rect.left &&
    e.clientX <= rect.right &&
    e.clientY >= rect.top &&
    e.clientY <= rect.bottom
}

function onPointerUp(e) {
  if (!pointerDown) return
  pointerDown = false
  const btn = btnEl()
  btn?.releasePointerCapture(e.pointerId)

  setPressed(false)

  if (pointerInside && !activated) {
    setPhase('releasing')
    if (prefersReducedMotion()) {
      activate()
      return
    }
    btn?.classList.add('is-release')
    window.setTimeout(() => {
      btn?.classList.add('is-bounce')
      window.setTimeout(() => {
        btn?.classList.remove('is-release', 'is-bounce')
        activate()
      }, RELEASE_SETTLE_MS)
    }, RELEASE_UP_MS)
    return
  }

  if (!pointerInside) {
    setPhase('idle')
    setStatus('Release outside — no activation.')
    window.setTimeout(() => {
      setStatus('Press RUN BUILD inside control bounds to activate.')
    }, CANCEL_MS)
  }
}

function onKeyDown(e) {
  if (e.key !== 'Enter' && e.key !== ' ') return
  if (activated) return
  e.preventDefault()
  if (e.key === ' ') {
    onPointerDown({ button: 0, pointerId: -1, clientX: 0, clientY: 0 })
  } else {
    activate()
    const btn = btnEl()
    if (btn) btn.disabled = true
  }
}

function onKeyUp(e) {
  if (e.key !== ' ') return
  if (!pointerDown) return
  pointerInside = true
  onPointerUp({ pointerId: -1 })
}

function bindUi() {
  const btn = btnEl()
  if (btn) {
    btn.addEventListener('pointerdown', onPointerDown)
    btn.addEventListener('pointermove', onPointerMove)
    btn.addEventListener('pointerup', onPointerUp)
    btn.addEventListener('pointercancel', onPointerUp)
    btn.addEventListener('keydown', onKeyDown)
    btn.addEventListener('keyup', onKeyUp)
  }

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetPressedControlCompression()
    }
  })
}

bindUi()
resetPressedControlCompression()

export const PRESSED_CONTROL_COMPRESSION_CONTRACT = {
  BTN_W,
  BTN_H,
  PRESS_MS,
  RELEASE_UP_MS,
  RELEASE_SETTLE_MS,
  CANCEL_MS,
}
