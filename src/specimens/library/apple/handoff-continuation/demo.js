/**
 * Handoff Continuation — cross-device task ownership transfer at fixed progress.
 */

const HANDOFF_MS = 720
const BRIDGE_SEGMENTS = 6
const PROGRESS_START = 68
const PROGRESS_END = 74

/** @type {boolean} */
let busy = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-handoff-continuation]')
}

function task() {
  return document.querySelector('[data-hfc-task]')
}

function bridge() {
  return document.querySelector('[data-hfc-bridge]')
}

function ownA() {
  return document.querySelector('[data-hfc-own-a]')
}

function ownB() {
  return document.querySelector('[data-hfc-own-b]')
}

function progressFill() {
  return document.querySelector('[data-hfc-progress]')
}

function progressLabel() {
  return document.querySelector('[data-hfc-progress-label]')
}

function dock() {
  return document.querySelector('[data-hfc-dock]')
}

function deviceA() {
  return document.querySelector('[data-hfc-device-a]')
}

function statusEl() {
  return document.querySelector('[data-hfc-status]')
}

function handoffBtn() {
  return document.querySelector('[data-hfc-handoff]')
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function setPhase(phase) {
  root()?.setAttribute('data-phase', phase)
}

function setProgress(pct) {
  progressFill()?.style.setProperty('width', `${pct}%`)
  const label = progressLabel()
  if (label) label.textContent = `${pct}%`
}

function runHandoff() {
  if (busy || root()?.getAttribute('data-phase') === 'received') return
  busy = true
  handoffBtn()?.setAttribute('disabled', 'true')
  const t = task()
  const br = bridge()
  if (!t || !br) return

  setPhase('handoff')
  br.classList.add('is-visible')
  t.classList.add('is-compressing')
  setStatus('Handoff bridge constructing — task compressing.')

  const midpoint = prefersReducedMotion() ? 0 : HANDOFF_MS * 0.5

  window.setTimeout(() => {
    ownA()?.textContent = 'RELEASED'
    ownB()?.textContent = 'RECEIVING'
    setStatus('Ownership transferring at midpoint — progress remains 68%.')
  }, midpoint)

  const finishCompress = () => {
    t.classList.remove('is-compressing')
    t.classList.add('is-token')
    deviceA()?.removeChild(t)
    dock()?.appendChild(t)
    setStatus('Token docked on TABLET — expanding back.')
  }

  window.setTimeout(
    () => {
      finishCompress()
      t.classList.remove('is-token')
      t.classList.add('is-expanded')
      ownB()?.textContent = 'ACTIVE'
      br.classList.remove('is-visible')
      setPhase('received')
      setStatus('TABLET received EDIT // REPORT at 68% — continuing to 74%.')
      window.setTimeout(() => {
        setProgress(PROGRESS_END)
        setStatus('TABLET continues EDIT // REPORT at 74%.')
        busy = false
      }, prefersReducedMotion() ? 80 : 400)
    },
    prefersReducedMotion() ? 60 : HANDOFF_MS,
  )
}

export function resetHandoffContinuation() {
  busy = false
  handoffBtn()?.removeAttribute('disabled')
  const t = task()
  const da = deviceA()
  const dk = dock()
  if (t && da && !da.contains(t)) {
    dk?.removeChild(t)
    da.appendChild(t)
  }
  t?.classList.remove('is-compressing', 'is-token', 'is-expanded')
  bridge()?.classList.remove('is-visible')
  ownA()?.textContent = 'ACTIVE'
  ownB()?.textContent = 'WAITING'
  setProgress(PROGRESS_START)
  setPhase('idle')
  setStatus('DESKTOP owns EDIT // REPORT at 68%.')
}

function bindUi() {
  handoffBtn()?.addEventListener('click', runHandoff)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetHandoffContinuation()
    }
  })
}

bindUi()
resetHandoffContinuation()

export const HANDOFF_CONTINUATION_CONTRACT = {
  HANDOFF_MS,
  BRIDGE_SEGMENTS,
  PROGRESS_START,
  PROGRESS_END,
}
