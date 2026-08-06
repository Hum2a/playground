/**
 * Crystallised Selection — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

const LABELS = {
  motion: 'Motion',
  structure: 'Structure',
  depth: 'Depth',
}

const ASSEMBLE_MS = 260
const SEPARATE_MS = 120
const SWEEP_MS = 90
/** Sweep starts after facets have mostly locked (~last stagger 95 + assemble) */
const SWEEP_AT = 200

let selected = ''
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-crystallised-selection]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function setStatus(text) {
  const el = document.querySelector('[data-cs-status]')
  if (!el) return
  el.textContent = ''
  void el.offsetWidth
  el.textContent = text
}

function options() {
  return [...document.querySelectorAll('[data-choice]')]
}

function clearPhase(btn, ...names) {
  btn.classList.remove(...names)
}

/**
 * @param {'motion' | 'structure' | 'depth'} choice
 */
export function selectCrystallised(choice) {
  const root = rootEl()
  if (!root || !LABELS[choice]) return
  if (choice === selected) return

  const prev = selected
  selected = choice
  root.setAttribute('data-selected', choice)

  const nextBtn = root.querySelector(`[data-choice="${choice}"]`)
  const prevBtn = prev
    ? root.querySelector(`[data-choice="${prev}"]`)
    : null

  options().forEach((btn) => {
    const on = btn.getAttribute('data-choice') === choice
    btn.setAttribute('aria-checked', on ? 'true' : 'false')
  })

  setStatus(`${LABELS[choice]} selected.`)

  if (prefersReducedMotion()) {
    options().forEach((btn) => {
      clearPhase(
        btn,
        'is-assembling',
        'is-separating',
        'is-sweeping',
        'is-selected',
        'is-locked',
      )
      if (btn.getAttribute('data-choice') === choice) {
        btn.classList.add('is-selected', 'is-locked')
      }
    })
    return
  }

  // Outgoing crystal separates on its own facets (no teleport)
  if (prevBtn) {
    clearPhase(prevBtn, 'is-assembling', 'is-sweeping', 'is-locked', 'is-selected')
    prevBtn.classList.add('is-separating')
    later(SEPARATE_MS, () => {
      clearPhase(prevBtn, 'is-separating')
    })
  }

  // Incoming begins immediately (handoff overlaps separation)
  if (nextBtn) {
    clearPhase(nextBtn, 'is-separating', 'is-locked', 'is-sweeping')
    nextBtn.classList.add('is-selected', 'is-assembling')
    void nextBtn.offsetWidth

    later(SWEEP_AT, () => {
      if (selected !== choice) return
      nextBtn.classList.add('is-sweeping')
      later(SWEEP_MS, () => nextBtn.classList.remove('is-sweeping'))
    })

    later(ASSEMBLE_MS, () => {
      if (selected !== choice) return
      nextBtn.classList.remove('is-assembling')
      nextBtn.classList.add('is-locked')
    })
  }
}

function bind() {
  const group = document.querySelector('[data-cs-options]')
  options().forEach((btn) => {
    btn.addEventListener('click', () => {
      selectCrystallised(btn.getAttribute('data-choice'))
    })
  })

  group?.addEventListener('keydown', (event) => {
    const buttons = options()
    const ids = buttons.map((b) => b.getAttribute('data-choice'))
    let idx = ids.indexOf(selected)
    if (idx < 0) idx = -1
    let next = idx
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault()
      next = (idx + 1 + buttons.length) % buttons.length
      if (idx < 0) next = 0
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault()
      next = (idx - 1 + buttons.length) % buttons.length
      if (idx < 0) next = buttons.length - 1
    } else if (event.key === 'Home') {
      event.preventDefault()
      next = 0
    } else if (event.key === 'End') {
      event.preventDefault()
      next = buttons.length - 1
    } else {
      return
    }
    const choice = ids[next]
    selectCrystallised(choice)
    buttons[next]?.focus()
  })

  setStatus('No selection.')
}

bind()
