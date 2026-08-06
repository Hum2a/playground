/**
 * Now Playing Expansion — compact strip to rich playback controls.
 */

const EXPAND_MS = 360
const PROGRESS_TIME = '01:42 / 03:18'
const PROGRESS_PCT = 52

/** @type {boolean} */
let expanded = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-now-playing-expansion]')
}

function compactBtn() {
  return document.querySelector('[data-npe-compact]')
}

function expandedPanel() {
  return document.querySelector('[data-npe-expanded]')
}

function statusEl() {
  return document.querySelector('[data-npe-status]')
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function setPhase(phase) {
  root()?.setAttribute('data-phase', phase)
}

function expand() {
  if (expanded) return
  expanded = true
  const panel = expandedPanel()
  const btn = compactBtn()
  if (!panel || !btn) return

  btn.hidden = true
  panel.hidden = false
  btn.setAttribute('aria-expanded', 'true')
  setPhase(prefersReducedMotion() ? 'expanded' : 'expanding')

  if (!prefersReducedMotion()) {
    requestAnimationFrame(() => setPhase('expanded'))
  }

  setStatus('Expanded — NIGHT SIGNAL controls revealing; progress remains 01:42.')
  window.setTimeout(() => {
    setStatus('Expanded playback at 01:42 / 03:18. Collapse retains progress.')
    document.querySelector('[data-npe-play]')?.focus()
  }, prefersReducedMotion() ? 0 : EXPAND_MS)
}

function collapse() {
  if (!expanded) return
  const panel = expandedPanel()
  const btn = compactBtn()
  if (!panel || !btn) return

  setPhase('collapsing')
  const finish = () => {
    panel.hidden = true
    btn.hidden = false
    btn.setAttribute('aria-expanded', 'false')
    expanded = false
    setPhase('compact')
    setStatus('Collapsed — NIGHT SIGNAL still at 01:42.')
    btn.focus()
  }

  if (prefersReducedMotion()) {
    finish()
    return
  }

  window.setTimeout(finish, EXPAND_MS)
}

export function resetNowPlayingExpansion() {
  expanded = false
  const panel = expandedPanel()
  const btn = compactBtn()
  if (panel) panel.hidden = true
  if (btn) {
    btn.hidden = false
    btn.setAttribute('aria-expanded', 'false')
  }
  setPhase('compact')
  setStatus('Compact now playing strip — NIGHT SIGNAL at 01:42.')
}

function bindUi() {
  compactBtn()?.addEventListener('click', expand)
  document.querySelector('[data-npe-collapse]')?.addEventListener('click', collapse)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetNowPlayingExpansion()
    }
  })
}

bindUi()
resetNowPlayingExpansion()

export const NOW_PLAYING_EXPANSION_CONTRACT = {
  EXPAND_MS,
  COMPACT_W: 300,
  COMPACT_H: 56,
  EXPANDED_W: 360,
  EXPANDED_H: 260,
  PROGRESS_TIME,
  PROGRESS_PCT,
}
