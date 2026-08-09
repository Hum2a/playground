/**
 * New Moon Locked State — tiny portable trigger API.
 * Sequential busy-guard; one timer at a time. iframe-safe.
 */

const EMPHASIS_MS = 80
const FLASH_MS = 180
const RECOIL_MS = 120
const DENIED_MS = 600
const RETURN_MS = 220

let busy = false
/** @type {number} */
let timer = 0

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const closest = document.querySelector('[data-force-reduced-motion="true"]')
  return forced || !!closest || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-nmls]')
}

function wait(ms) {
  return new Promise((resolve) => {
    window.clearTimeout(timer)
    timer = window.setTimeout(resolve, ms)
  })
}

function setStatus(text) {
  const node = document.querySelector('[data-nmls-status-text]')
  if (node) node.textContent = text
}

function setPhase(phase) {
  const root = rootEl()
  if (!root) return
  root.setAttribute('data-phase', phase)
}

function setBusy(next) {
  busy = next
  const root = rootEl()
  const btn = document.querySelector('[data-nmls-attempt]')
  if (root) root.setAttribute('aria-busy', next ? 'true' : 'false')
  if (btn) btn.disabled = next
}

export function resetLock() {
  window.clearTimeout(timer)
  timer = 0
  setBusy(false)
  setPhase('idle')
  setStatus('UNAVAILABLE')
}

/**
 * Run the refusal sequence once. Busy-guarded; no stacked timers.
 */
export async function attemptAccess() {
  if (busy) return
  const root = rootEl()
  if (!root) return

  setBusy(true)

  if (prefersReducedMotion()) {
    setPhase('denied')
    setStatus('ACCESS DENIED')
    await wait(DENIED_MS)
    setPhase('return')
    setStatus('UNAVAILABLE')
    await wait(RETURN_MS)
    setPhase('idle')
    setBusy(false)
    return
  }

  setPhase('emphasis')
  await wait(EMPHASIS_MS)
  setPhase('flash')
  await wait(FLASH_MS)
  setPhase('recoil')
  await wait(RECOIL_MS)
  setPhase('denied')
  setStatus('ACCESS DENIED')
  await wait(DENIED_MS)
  setPhase('return')
  setStatus('UNAVAILABLE')
  await wait(RETURN_MS)
  setPhase('idle')
  setBusy(false)
}

function bindUi() {
  document.querySelector('[data-nmls-attempt]')?.addEventListener('click', () => {
    void attemptAccess()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetLock()
  })
}

bindUi()
resetLock()
