/**
 * Fade Through — two-phase content swap with no full-opacity overlap.
 */

const DURATION_MS = 300
const PHASE_SPLIT_MS = 105
const SCALE_OUT = 0.96

/** @type {number | null} */
let animFrame = null
let busy = false
/** @type {'a' | 'b'} */
let state = 'a'

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  return (
    forced ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function rootEl() {
  return document.querySelector('[data-fade-through]')
}

function clearAnim() {
  if (animFrame !== null) {
    window.cancelAnimationFrame(animFrame)
    animFrame = null
  }
}

function panel(id) {
  return document.querySelector(`[data-ft-panel="${id}"]`)
}

function setStatus(text) {
  document.querySelector('[data-ft-status]').textContent = text
}

function applyInstant(next) {
  state = next
  rootEl()?.setAttribute('data-ft-state', next)
  panel('a').hidden = next !== 'a'
  panel('b').hidden = next !== 'b'
  panel('a').classList.remove('is-outgoing', 'is-incoming')
  panel('b').classList.remove('is-outgoing', 'is-incoming')
  setStatus(next === 'a' ? 'Showing overview state.' : 'Showing schedule state.')
}

function toggle() {
  if (busy) return
  const next = state === 'a' ? 'b' : 'a'
  const outgoing = panel(state)
  const incoming = panel(next)
  if (!outgoing || !incoming) return

  if (prefersReducedMotion()) {
    applyInstant(next)
    return
  }

  busy = true
  incoming.hidden = false
  outgoing.classList.add('is-outgoing')
  incoming.classList.add('is-incoming')

  const start = performance.now()

  function frame(now) {
    const elapsed = now - start
    if (elapsed < PHASE_SPLIT_MS) {
      const p = elapsed / PHASE_SPLIT_MS
      outgoing.style.opacity = String(1 - p)
      outgoing.style.transform = `scale(${1 - (1 - SCALE_OUT) * p})`
      incoming.style.opacity = '0'
      incoming.style.transform = `scale(${SCALE_OUT})`
    } else if (elapsed < DURATION_MS) {
      outgoing.style.opacity = '0'
      outgoing.style.transform = `scale(${SCALE_OUT})`
      const p = (elapsed - PHASE_SPLIT_MS) / (DURATION_MS - PHASE_SPLIT_MS)
      incoming.style.opacity = String(p)
      incoming.style.transform = `scale(${SCALE_OUT + (1 - SCALE_OUT) * p})`
    } else {
      applyInstant(next)
      outgoing.style.cssText = ''
      incoming.style.cssText = ''
      busy = false
      return
    }
    animFrame = window.requestAnimationFrame(frame)
  }

  animFrame = window.requestAnimationFrame(frame)
}

export function resetFadeThrough() {
  clearAnim()
  busy = false
  applyInstant('a')
}

export function replayFadeThrough() {
  resetFadeThrough()
}

function bindUi() {
  document.querySelector('[data-ft-toggle]')?.addEventListener('click', toggle)

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') replayFadeThrough()
  })
}

bindUi()
resetFadeThrough()

export const FADE_THROUGH_CONTRACT = { DURATION_MS, PHASE_SPLIT_MS, SCALE_OUT }
