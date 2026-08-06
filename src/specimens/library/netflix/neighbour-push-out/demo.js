/**
 * Neighbour Push-Out (SPX-3147) — tiny portable interaction.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * A keyboard-movable cursor sits over a row of five cards. SELECT expands
 * the cursor card; its immediate neighbours translate away to make room
 * while keeping their own size — only the selected card scales.
 */

const TOTAL = 5

let cursor = 2
let selected = false

function rootEl() {
  return document.querySelector('[data-neighbour-push-out]')
}

function cards(root) {
  return Array.from(root.querySelectorAll('[data-npo-card]'))
}

function render(root) {
  const list = cards(root)
  list.forEach((card, i) => {
    card.classList.remove('is-cursor', 'is-selected', 'is-pushed-left', 'is-pushed-right')
    if (selected) {
      if (i === cursor) card.classList.add('is-selected', 'is-cursor')
      else if (i < cursor) card.classList.add('is-pushed-left')
      else card.classList.add('is-pushed-right')
    } else if (i === cursor) {
      card.classList.add('is-cursor')
    }
  })

  const prev = root.querySelector('[data-npo-prev]')
  const next = root.querySelector('[data-npo-next]')
  if (prev) prev.disabled = selected || cursor === 0
  if (next) next.disabled = selected || cursor === TOTAL - 1

  const selectBtn = root.querySelector('[data-npo-select]')
  if (selectBtn) selectBtn.textContent = selected ? 'DESELECT' : 'SELECT'

  const status = root.querySelector('[data-npo-status]')
  if (status) {
    status.textContent = selected
      ? `Card ${cursor + 1} of ${TOTAL} selected — neighbours pushed out`
      : `Cursor on card ${cursor + 1} of ${TOTAL}`
  }
}

function reset(root) {
  cursor = 2
  selected = false
  render(root)
}

function bindUi() {
  const root = rootEl()
  if (!root) return

  root.querySelector('[data-npo-prev]')?.addEventListener('click', () => {
    if (selected || cursor === 0) return
    cursor -= 1
    render(root)
  })

  root.querySelector('[data-npo-next]')?.addEventListener('click', () => {
    if (selected || cursor === TOTAL - 1) return
    cursor += 1
    render(root)
  })

  root.querySelector('[data-npo-select]')?.addEventListener('click', () => {
    selected = !selected
    render(root)
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') reset(root)
  })

  render(root)
}

bindUi()
