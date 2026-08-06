/**
 * Choice Execution Slash — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

const LABELS = {
  standard: 'STANDARD',
  express: 'EXPRESS',
  overnight: 'OVERNIGHT',
}

const STATUS_NAMES = {
  standard: 'Standard',
  express: 'Express',
  overnight: 'Overnight',
}

let selected = 'express'
let busy = false
let confirmed = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function demo() {
  return document.querySelector('[data-choice-slash-demo]')
}

function setStatus(text) {
  const el = document.querySelector('[data-choice-slash-status]')
  if (el) el.textContent = text
}

function syncSelectionUI() {
  document.querySelectorAll('[data-choice]').forEach((btn) => {
    const on = btn.getAttribute('data-choice') === selected
    btn.classList.toggle('is-selected', on)
    btn.setAttribute('aria-checked', on ? 'true' : 'false')
  })
  if (!confirmed) {
    setStatus(
      `${STATUS_NAMES[selected]} selected for delivery speed. Confirm to commit.`,
    )
  }
}

/**
 * @param {'standard' | 'express' | 'overnight'} choice
 */
export function selectChoice(choice) {
  if (busy || confirmed) return
  if (!LABELS[choice]) return
  selected = choice
  syncSelectionUI()
}

function clearShards() {
  document.querySelectorAll('.choice-slash-demo__shard').forEach((n) => n.remove())
  document.querySelector('.choice-slash-demo__slash')?.remove()
}

function placeShards(root) {
  const stage = root.querySelector('[data-choice-slash-stage]')
  if (!stage) return
  stage.replaceChildren()

  const buttons = [...document.querySelectorAll('[data-choice]')]
  const selectedIndex = buttons.findIndex(
    (btn) => btn.getAttribute('data-choice') === selected,
  )

  buttons.forEach((btn, index) => {
    const id = btn.getAttribute('data-choice')
    if (id === selected) return
    const rect = btn.getBoundingClientRect()
    const rootRect = root.getBoundingClientRect()
    const top = rect.top - rootRect.top
    const left = rect.left - rootRect.left
    const width = rect.width
    const height = rect.height
    const text = LABELS[id]
    // Above selected → UL/LR split; below → opposite rotational accents
    const accent = index < selectedIndex ? 'above' : 'below'

    ;['a', 'b'].forEach((half) => {
      const shard = document.createElement('div')
      shard.className = `choice-slash-demo__shard choice-slash-demo__shard--${half} is-${accent}`
      shard.setAttribute('aria-hidden', 'true')
      shard.textContent = text
      shard.style.top = `${top}px`
      shard.style.left = `${left}px`
      shard.style.width = `${width}px`
      shard.style.height = `${height}px`
      stage.appendChild(shard)
    })

    btn.classList.add('is-ghost')
  })
}

function showFinal(root) {
  const final = root.querySelector('[data-choice-slash-final]')
  const label = root.querySelector('[data-choice-slash-final-label]')
  const confirm = root.querySelector('[data-choice-slash-confirm]')
  const reset = root.querySelector('[data-choice-slash-reset]')
  if (label) label.textContent = LABELS[selected]
  if (final) final.hidden = false
  if (confirm) confirm.hidden = true
  if (reset) reset.hidden = false
  setStatus(`${STATUS_NAMES[selected]} selected.`)
}

/**
 * Run confirmation slash sequence for the current selection.
 * @returns {Promise<void>}
 */
export function runChoiceSlash() {
  if (busy || confirmed) return Promise.resolve()
  const root = demo()
  if (!root) return Promise.resolve()

  busy = true
  document.querySelectorAll('[data-choice], [data-choice-slash-confirm]').forEach((el) => {
    el.disabled = true
  })

  if (prefersReducedMotion()) {
    confirmed = true
    root.classList.add('is-confirmed')
    document.querySelectorAll('[data-choice]').forEach((b) => {
      if (b.getAttribute('data-choice') !== selected) b.hidden = true
    })
    showFinal(root)
    busy = false
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    clearShards()
    const slash = document.createElement('div')
    slash.className = 'choice-slash-demo__slash'
    slash.setAttribute('aria-hidden', 'true')
    root.appendChild(slash)

    root.classList.add('is-slashing')
    placeShards(root)

    // Rejection starts as slash crosses (~60ms)
    window.setTimeout(() => {
      root.classList.add('is-rejecting')
    }, 60)

    // Attack / expand selected ~220ms
    window.setTimeout(() => {
      root.classList.add('is-attacking')
      showFinal(root)
    }, 220)

    // Done ~620ms
    window.setTimeout(() => {
      confirmed = true
      root.classList.remove('is-slashing', 'is-rejecting', 'is-attacking')
      root.classList.add('is-confirmed')
      clearShards()
      document.querySelectorAll('[data-choice]').forEach((b) => {
        if (b.getAttribute('data-choice') !== selected) b.hidden = true
        else b.classList.add('is-ghost')
      })
      busy = false
      resolve()
    }, 620)
  })
}

/**
 * Restore all three options and selection controls.
 */
export function resetChoiceSlash() {
  const root = demo()
  if (!root) return
  busy = false
  confirmed = false
  selected = 'express'
  clearShards()
  root.classList.remove(
    'is-slashing',
    'is-rejecting',
    'is-attacking',
    'is-confirmed',
  )
  const final = root.querySelector('[data-choice-slash-final]')
  const confirm = root.querySelector('[data-choice-slash-confirm]')
  const reset = root.querySelector('[data-choice-slash-reset]')
  if (final) final.hidden = true
  if (confirm) {
    confirm.hidden = false
    confirm.disabled = false
  }
  if (reset) reset.hidden = true
  document.querySelectorAll('[data-choice]').forEach((btn) => {
    btn.hidden = false
    btn.disabled = false
    btn.classList.remove('is-ghost')
  })
  syncSelectionUI()
}

function bind() {
  const options = document.querySelector('[data-choice-slash-options]')
  document.querySelectorAll('[data-choice]').forEach((btn) => {
    btn.addEventListener('click', () => {
      selectChoice(btn.getAttribute('data-choice'))
    })
  })
  options?.addEventListener('keydown', (event) => {
    if (busy || confirmed) return
    const buttons = [...document.querySelectorAll('[data-choice]')]
    const current = buttons.findIndex((b) => b.getAttribute('data-choice') === selected)
    let next = current
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault()
      next = (current + 1) % buttons.length
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault()
      next = (current - 1 + buttons.length) % buttons.length
    } else if (event.key === 'Home') {
      event.preventDefault()
      next = 0
    } else if (event.key === 'End') {
      event.preventDefault()
      next = buttons.length - 1
    } else {
      return
    }
    const choice = buttons[next]?.getAttribute('data-choice')
    if (choice) {
      selectChoice(choice)
      buttons[next].focus()
    }
  })
  document
    .querySelector('[data-choice-slash-confirm]')
    ?.addEventListener('click', () => {
      void runChoiceSlash()
    })
  document
    .querySelector('[data-choice-slash-reset]')
    ?.addEventListener('click', () => {
      resetChoiceSlash()
    })
  syncSelectionUI()
}

bind()
