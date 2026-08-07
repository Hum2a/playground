/**
 * Fingerprint Scan Match — scan aligns ridges; MATCH beat.
 * iframe-safe; no storage / parent / network.
 */

const SCAN_MS = 900

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const root = document.querySelector('[data-fsm]')
const status = document.querySelector('[data-fsm-status]')
/** @type {number | undefined} */
let timer

function setState(s) {
  root?.setAttribute('data-state', s)
  if (!status) return
  if (s === 'match') status.textContent = 'Fingerprint match confirmed.'
  else if (s === 'scanning') status.textContent = 'Scanning…'
  else status.textContent = 'Ready to scan.'
}

export function reset() {
  if (timer != null) window.clearTimeout(timer)
  timer = undefined
  setState('idle')
}

export function scan() {
  reset()
  if (prefersReducedMotion()) {
    setState('match')
    return
  }
  setState('scanning')
  timer = window.setTimeout(() => setState('match'), SCAN_MS)
}

document.querySelector('[data-fsm-scan]')?.addEventListener('click', scan)
document.querySelector('[data-fsm-reset]')?.addEventListener('click', reset)
window.addEventListener('message', (e) => {
  if (e.data?.type === 'restart') reset()
})
