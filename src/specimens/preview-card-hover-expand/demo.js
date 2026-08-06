/**
 * Preview Card Hover Expand (SPX-3144) — tiny portable interaction.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * Hovering or focusing a card expands it in place; the neighbour(s) on
 * each side translate outward so nothing overlaps. Leaving the row (mouse)
 * or moving focus outside it (keyboard) collapses back to idle.
 */

const TITLES = ['SIGNAL DRIFT', 'AMBER FIELD', 'NIGHT ROUTE']

function rootEl() {
  return document.querySelector('[data-preview-card-hover-expand]')
}

function cards(root) {
  return Array.from(root.querySelectorAll('[data-pche-card]'))
}

function setActive(root, index) {
  const list = cards(root)
  list.forEach((card, i) => {
    card.classList.remove('is-expanded', 'is-pushed-left', 'is-pushed-right')
    card.setAttribute('aria-expanded', 'false')
    if (index === null) return
    if (i === index) {
      card.classList.add('is-expanded')
      card.setAttribute('aria-expanded', 'true')
    } else if (i < index) {
      card.classList.add('is-pushed-left')
    } else {
      card.classList.add('is-pushed-right')
    }
  })

  const hint = root.querySelector('[data-pche-hint]')
  if (hint) {
    hint.textContent =
      index === null ? 'Hover or focus a card to preview' : `Previewing ${TITLES[index]}`
  }
}

function bindUi() {
  const root = rootEl()
  if (!root) return
  const list = cards(root)

  list.forEach((card, i) => {
    card.addEventListener('mouseenter', () => setActive(root, i))
    card.addEventListener('focus', () => setActive(root, i))
  })

  root.addEventListener('mouseleave', () => setActive(root, null))
  root.addEventListener('focusout', (event) => {
    if (!root.contains(event.relatedTarget)) setActive(root, null)
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      setActive(root, null)
    }
  })
}

bindUi()
