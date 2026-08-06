/**
 * Forget a Move — tiny portable capability-replacement API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

const T = {
  compress: 80,
  exit: 180,
  vacancy: 100,
  install: 220,
  sweep: 160,
}

const CANONICAL = 'cache'
const INCOMING = 'SYNC'

let selected = null
let busy = false
let complete = false
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
  return document.querySelector('[data-forget-move]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function setAnnounce(text) {
  const el = document.querySelector('[data-fm-announce]')
  if (!el) return
  el.textContent = ''
  void el.offsetWidth
  el.textContent = text
}

function slotButtons() {
  return [...document.querySelectorAll('[data-fm-slot]')]
}

function slotById(id) {
  return document.querySelector(`[data-fm-slot="${id}"]`)
}

function setTriggers({ replace, reset, select }) {
  const root = rootEl()
  if (!root) return
  const replaceBtn = root.querySelector('[data-fm-replace]')
  const resetBtn = root.querySelector('[data-fm-reset]')
  if (replaceBtn) {
    replaceBtn.hidden = complete ? true : false
    if (complete) replaceBtn.hidden = true
    else replaceBtn.hidden = false
    replaceBtn.disabled = !replace || busy || complete || !selected
  }
  if (resetBtn) {
    resetBtn.hidden = !reset
    resetBtn.disabled = !reset
  }
  for (const slot of slotButtons()) {
    slot.disabled = !select || busy || complete
  }
}

function selectSlot(id) {
  if (busy || complete) return
  selected = id
  for (const slot of slotButtons()) {
    const on = slot.getAttribute('data-fm-slot') === id
    slot.setAttribute('aria-checked', on ? 'true' : 'false')
    slot.tabIndex = on ? 0 : -1
  }
  const label = slotById(id)?.getAttribute('data-fm-label') ?? id.toUpperCase()
  setAnnounce(`Replace ${label} with ${INCOMING}.`)
  setTriggers({ replace: true, reset: false, select: true })
}

function clearSlotPhases(slot) {
  slot.classList.remove(
    'is-compressing',
    'is-breaking',
    'is-vacant',
    'is-installing',
    'is-locked',
  )
}

function applyInstantReplace(root, slot) {
  clearSlotPhases(slot)
  const oldLabel = slot.getAttribute('data-fm-label') || 'CACHE'
  const labelEl = slot.querySelector('[data-fm-slot-label]')
  if (labelEl) labelEl.textContent = INCOMING
  slot.setAttribute('data-fm-label', INCOMING)
  slot.setAttribute('aria-checked', 'false')
  slot.classList.add('is-locked')
  root.classList.add('is-installing')
  root.setAttribute('data-state', 'complete')
  complete = true
  busy = false
  setAnnounce(`Replaced ${oldLabel} with ${INCOMING}.`)
  setTriggers({ replace: false, reset: true, select: false })
}

/**
 * Run replacement for the selected slot (canonical demo: CACHE).
 * @returns {Promise<void>}
 */
export function runForgetMove() {
  const root = rootEl()
  if (!root || busy || complete) return Promise.resolve()

  if (!selected) selectSlot(CANONICAL)
  const targetId = selected || CANONICAL
  const slot = slotById(targetId)
  if (!slot) return Promise.resolve()

  const oldLabel = slot.getAttribute('data-fm-label') || 'CACHE'
  busy = true
  clearTimers()
  root.classList.remove('is-installing', 'is-sweeping')
  root.setAttribute('data-state', 'replacing')
  setTriggers({ replace: false, reset: false, select: false })
  setAnnounce(`Replacing ${oldLabel} with ${INCOMING}.`)

  if (prefersReducedMotion()) {
    applyInstantReplace(root, slot)
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    clearSlotPhases(slot)
    slot.classList.add('is-compressing')
    slot.setAttribute('aria-checked', 'false')

    later(T.compress, () => {
      slot.classList.remove('is-compressing')
      slot.classList.add('is-breaking')
    })

    later(T.compress + T.exit, () => {
      slot.classList.remove('is-breaking')
      slot.classList.add('is-vacant')
      const labelEl = slot.querySelector('[data-fm-slot-label]')
      if (labelEl) labelEl.textContent = ''
    })

    later(T.compress + T.exit + T.vacancy, () => {
      slot.classList.remove('is-vacant')
      slot.classList.add('is-installing')
      root.classList.add('is-installing')
      const labelEl = slot.querySelector('[data-fm-slot-label]')
      if (labelEl) labelEl.textContent = INCOMING
      slot.setAttribute('data-fm-label', INCOMING)
    })

    later(T.compress + T.exit + T.vacancy + T.install, () => {
      slot.classList.remove('is-installing')
      slot.classList.add('is-locked')
      root.classList.remove('is-installing')
      root.classList.add('is-sweeping')
    })

    later(T.compress + T.exit + T.vacancy + T.install + T.sweep, () => {
      root.classList.remove('is-sweeping')
      root.setAttribute('data-state', 'complete')
      complete = true
      busy = false
      setAnnounce(`Replaced ${oldLabel} with ${INCOMING}.`)
      setTriggers({ replace: false, reset: true, select: false })
      resolve()
    })
  })
}

/** Reset to four original capabilities. */
export function resetForgetMove() {
  const root = rootEl()
  if (!root) return
  clearTimers()
  busy = false
  complete = false
  selected = null
  root.classList.remove('is-installing', 'is-sweeping')
  root.setAttribute('data-state', 'idle')

  const labels = {
    scan: 'SCAN',
    filter: 'FILTER',
    export: 'EXPORT',
    cache: 'CACHE',
  }
  for (const slot of slotButtons()) {
    clearSlotPhases(slot)
    const id = slot.getAttribute('data-fm-slot')
    const text = labels[id] || id?.toUpperCase()
    slot.setAttribute('data-fm-label', text)
    slot.setAttribute('aria-checked', 'false')
    slot.tabIndex = -1
    const labelEl = slot.querySelector('[data-fm-slot-label]')
    if (labelEl) labelEl.textContent = text
  }
  const first = slotById('scan')
  if (first) first.tabIndex = 0

  setAnnounce('')
  setTriggers({ replace: false, reset: false, select: true })
}

function onSlotKeydown(event, index) {
  if (busy || complete) return
  const slots = slotButtons()
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    event.preventDefault()
    const next = slots[(index + 1) % slots.length]
    selectSlot(next.getAttribute('data-fm-slot'))
    next.focus()
  } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    event.preventDefault()
    const prev = slots[(index - 1 + slots.length) % slots.length]
    selectSlot(prev.getAttribute('data-fm-slot'))
    prev.focus()
  } else if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault()
    selectSlot(slots[index].getAttribute('data-fm-slot'))
  }
}

function bind() {
  const root = rootEl()
  if (!root) return

  slotButtons().forEach((slot, index) => {
    slot.addEventListener('click', () => {
      selectSlot(slot.getAttribute('data-fm-slot'))
    })
    slot.addEventListener('keydown', (event) => onSlotKeydown(event, index))
  })

  root.querySelector('[data-fm-replace]')?.addEventListener('click', () => {
    if (!selected) selectSlot(CANONICAL)
    void runForgetMove()
  })
  root.querySelector('[data-fm-reset]')?.addEventListener('click', () => {
    resetForgetMove()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetForgetMove()
  })

  resetForgetMove()
  selectSlot(CANONICAL)
}

bind()
