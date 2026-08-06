/**
 * Stage Manager Stack Shift — staged workspace swap.
 * Sandbox-safe: no parent access, storage, or network.
 *
 * BUILD (2 windows) ↔ RESEARCH (3 windows) swap over 480ms.
 * Z-order transfers at 52%; one stage marker moves active state.
 */

const SWAP_MS = 480
const Z_SWAP_AT = 0.52
const FG_SCALE_END = 0.72
const FG_TX = -190
const BG_TX_START = 190

/** @type {number[]} */
let timers = []
let busy = false
/** @type {'build' | 'research'} */
let active = 'build'

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-stage-manager]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
  return id
}

function setStatus(text) {
  const el = document.querySelector('[data-sms-status]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-sms-swap]').forEach((btn) => {
    btn.disabled = !on
  })
}

/**
 * @param {'build' | 'research'} group
 */
function applyState(group) {
  const root = rootEl()
  if (!root) return

  active = group
  const isBuild = group === 'build'

  root.setAttribute('data-phase', isBuild ? 'build-foreground' : 'research-foreground')
  root.setAttribute('data-active', group)

  const stagedResearch = document.querySelector('[data-sms-staged-research]')
  const stagedBuild = document.querySelector('[data-sms-staged-build]')
  const foreground = document.querySelector('[data-sms-foreground]')
  const background = document.querySelector('[data-sms-background]')

  if (stagedResearch) {
    stagedResearch.hidden = !isBuild
    stagedResearch.classList.toggle('is-active', isBuild)
  }
  if (stagedBuild) {
    stagedBuild.hidden = isBuild
    stagedBuild.classList.toggle('is-active', !isBuild)
  }
  if (foreground) {
    foreground.classList.toggle('is-foreground', isBuild)
    foreground.classList.toggle('is-staged', !isBuild)
    foreground.setAttribute('aria-hidden', isBuild ? 'false' : 'true')
  }
  if (background) {
    background.classList.toggle('is-foreground', !isBuild)
    background.classList.toggle('is-staged', isBuild)
    background.setAttribute('aria-hidden', isBuild ? 'true' : 'false')
  }
}

function runSwap() {
  const root = rootEl()
  if (!root || busy) return

  const next = active === 'build' ? 'research' : 'build'
  busy = true
  clearTimers()
  setButtons(false)
  setStatus(`Swapping to ${next.toUpperCase()} foreground.`)
  root.setAttribute('data-phase', 'swapping')
  root.setAttribute('data-swap-to', next)
  void root.offsetWidth

  const rm = prefersReducedMotion()

  if (rm) {
    applyState(next)
    root.removeAttribute('data-swap-to')
    setStatus(
      next === 'research'
        ? 'RESEARCH foreground; BUILD staged in rail.'
        : 'BUILD foreground; RESEARCH staged in rail.',
    )
    busy = false
    setButtons(true)
    return
  }

  later(Math.round(SWAP_MS * Z_SWAP_AT), () => {
    root.setAttribute('data-z-swapped', 'true')
  })

  later(SWAP_MS, () => {
    applyState(next)
    root.removeAttribute('data-swap-to')
    root.removeAttribute('data-z-swapped')
    setStatus(
      next === 'research'
        ? 'RESEARCH foreground; BUILD staged in rail.'
        : 'BUILD foreground; RESEARCH staged in rail.',
    )
    busy = false
    setButtons(true)
  })
}

export function resetStageManagerStackShift() {
  clearTimers()
  busy = false
  const root = rootEl()
  root?.removeAttribute('data-swap-to')
  root?.removeAttribute('data-z-swapped')
  applyState('build')
  setStatus('BUILD foreground; RESEARCH staged in rail.')
  setButtons(true)
}

function bindUi() {
  document.querySelectorAll('[data-sms-swap]').forEach((btn) => {
    btn.addEventListener('click', () => runSwap())
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetStageManagerStackShift()
  })
}

bindUi()
resetStageManagerStackShift()

export const STAGE_MANAGER_STACK_SHIFT_CONTRACT = {
  SWAP_MS,
  Z_SWAP_AT,
  FG_SCALE_END,
  FG_TX,
  BG_TX_START,
  FOREGROUND_SIZE: { width: 360, height: 330 },
  RAIL_WIDTH: 92,
}
