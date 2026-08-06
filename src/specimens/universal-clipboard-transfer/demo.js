/**
 * Universal Clipboard Transfer — copied text becomes a token handed to another device.
 */

const TOKEN_W = 96
const TOKEN_H = 34
const LIFT_PX = 8
const GAP_MS = 70
const CORRIDOR_DOTS = 6
const TEXT = 'BUILD-184'

/** @type {boolean} */
let busy = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-universal-clipboard-transfer]')
}

function token() {
  return document.querySelector('[data-uct-token]')
}

function corridor() {
  return document.querySelector('[data-uct-corridor]')
}

function copiedMarker() {
  return document.querySelector('[data-uct-copied]')
}

function destText() {
  return document.querySelector('[data-uct-dest-text]')
}

function handoffBtn() {
  return document.querySelector('[data-uct-handoff]')
}

function statusEl() {
  return document.querySelector('[data-uct-status]')
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function setPhase(phase) {
  root()?.setAttribute('data-phase', phase)
}

function runHandoff() {
  if (busy || root()?.getAttribute('data-phase') === 'pasted') return
  busy = true
  handoffBtn()?.setAttribute('disabled', 'true')
  setPhase('copying')
  setStatus('Token BUILD-184 lifting from DESKTOP selection.')

  const t = token()
  const source = document.querySelector('[data-uct-selection]')
  const stage = document.querySelector('[data-uct-stage]')
  if (!t || !source || !stage) return

  const stageRect = stage.getBoundingClientRect()
  const selRect = source.getBoundingClientRect()
  t.removeAttribute('hidden')
  t.style.left = `${selRect.left - stageRect.left}px`
  t.style.top = `${selRect.top - stageRect.top}px`

  copiedMarker()?.removeAttribute('hidden')
  corridor()?.classList.add('is-visible')

  if (prefersReducedMotion()) {
    t.setAttribute('hidden', '')
    const dest = destText()
    if (dest) {
      dest.innerHTML = `Notes: ${TEXT}<span class="uct__caret" data-uct-caret aria-hidden="true"></span>`
    }
    setPhase('pasted')
    setStatus('PASTED — BUILD-184 on TABLET.')
    return
  }

  requestAnimationFrame(() => {
    t.style.transform = `translateY(-${LIFT_PX}px) scale(0.85)`
    t.style.opacity = '0'
  })

  window.setTimeout(() => {
    t.setAttribute('hidden', '')
    setStatus('Token absent for 70ms — continuity gap.')
  }, 200)

  window.setTimeout(() => {
    const dest = document.querySelector('[data-uct-dest]')
    const caret = document.querySelector('[data-uct-caret]')
    if (!dest || !stage) return
    const destRect = dest.getBoundingClientRect()
    const caretRect = caret?.getBoundingClientRect() ?? destRect
    t.removeAttribute('hidden')
    t.style.opacity = '1'
    t.style.transform = 'scale(1)'
    t.style.left = `${caretRect.left - stageRect.left - TOKEN_W / 2}px`
    t.style.top = `${caretRect.top - stageRect.top - TOKEN_H / 2}px`
    setStatus('Token reconstructing at TABLET caret.')
  }, 200 + GAP_MS)

  window.setTimeout(() => {
    token()?.setAttribute('hidden', '')
    const dest = destText()
    if (dest) {
      dest.innerHTML = `Notes: ${TEXT}<span class="uct__caret" data-uct-caret aria-hidden="true"></span>`
    }
    setPhase('pasted')
    setStatus('PASTED — BUILD-184 inserted at TABLET caret.')
  }, 200 + GAP_MS + 280)
}

export function resetUniversalClipboardTransfer() {
  busy = false
  setPhase('idle')
  token()?.setAttribute('hidden', '')
  token()?.style.removeProperty('left')
  token()?.style.removeProperty('top')
  token()?.style.removeProperty('transform')
  token()?.style.removeProperty('opacity')
  copiedMarker()?.setAttribute('hidden', '')
  corridor()?.classList.remove('is-visible')
  handoffBtn()?.removeAttribute('disabled')
  const dest = destText()
  if (dest) {
    dest.innerHTML = 'Notes:<span class="uct__caret" data-uct-caret aria-hidden="true"></span>'
  }
  setStatus('Select BUILD-184 on DESKTOP and hand off to TABLET.')
}

function bindUi() {
  handoffBtn()?.addEventListener('click', runHandoff)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetUniversalClipboardTransfer()
    }
  })
}

bindUi()
resetUniversalClipboardTransfer()

export const UNIVERSAL_CLIPBOARD_TRANSFER_CONTRACT = {
  TOKEN_W,
  TOKEN_H,
  LIFT_PX,
  GAP_MS,
  CORRIDOR_DOTS,
  TEXT,
}
