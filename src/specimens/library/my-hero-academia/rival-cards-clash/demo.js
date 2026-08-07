/**
 * Rival Cards Clash — two cards slam into a central diagonal divider.
 * Sandbox-safe (no parent / storage / network).
 */

const PRIMARY_MS = 660
const TOTAL_MS = 1310

let busy = false
/** @type {number | null} */
let resetTimer = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-rival-cards-clash]')
}

function setStatus(text) {
  const el = document.querySelector('[data-rcc-status]')
  if (el) el.textContent = text
}

function setControls({ clashDisabled, replayHidden }) {
  const clash = document.querySelector('[data-rcc-clash]')
  const replay = document.querySelector('[data-rcc-replay]')
  if (clash) clash.disabled = clashDisabled
  if (replay) replay.hidden = replayHidden
}

export function resetRivalCardsClash() {
  if (resetTimer !== null) window.clearTimeout(resetTimer)
  resetTimer = null
  busy = false
  const el = root()
  if (!el) return
  el.classList.remove('rcc--active', 'rcc--settled')
  el.setAttribute('data-phase', 'idle')
  setStatus('Awaiting rival clash.')
  setControls({ clashDisabled: false, replayHidden: true })
}

export function runRivalCardsClash() {
  const el = root()
  if (!el || busy) return Promise.resolve()
  busy = true
  setControls({ clashDisabled: true, replayHidden: true })

  if (prefersReducedMotion()) {
    el.classList.add('rcc--active', 'rcc--settled')
    el.setAttribute('data-phase', 'ready')
    setStatus('Rivals locked — READY.')
    setControls({ clashDisabled: true, replayHidden: false })
    busy = false
    return Promise.resolve()
  }

  el.classList.remove('rcc--settled')
  el.classList.add('rcc--active')
  el.setAttribute('data-phase', 'clashing')
  setStatus('Cards slamming into divider…')

  return new Promise((resolve) => {
    window.setTimeout(() => {
      el.classList.add('rcc--settled')
      el.setAttribute('data-phase', 'ready')
      setStatus('Rivals locked — READY.')
      setControls({ clashDisabled: true, replayHidden: false })
    }, PRIMARY_MS)

    resetTimer = window.setTimeout(() => {
      busy = false
      resetTimer = null
      resolve()
    }, TOTAL_MS)
  })
}

export async function replayRivalCardsClash() {
  if (busy) return
  resetRivalCardsClash()
  void root()?.offsetWidth
  await runRivalCardsClash()
}

function bind() {
  document.querySelector('[data-rcc-clash]')?.addEventListener('click', () => {
    void runRivalCardsClash()
  })

  document.querySelector('[data-rcc-replay]')?.addEventListener('click', () => {
    void replayRivalCardsClash()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetRivalCardsClash()
    }
  })
}

bind()
