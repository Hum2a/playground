/**
 * Preview Collapse Return (SPX-3149) — tiny portable interaction.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * Activating a card expands it above its rail slot. Activating it again
 * (RETURN) removes the single expand class, so the card's transform snaps
 * back to the base rule exactly — no residual inline styles, no drift.
 */

let activeIndex = null

function rootEl() {
  return document.querySelector('[data-preview-collapse-return]')
}

function cards(root) {
  return Array.from(root.querySelectorAll('[data-pcr-card]'))
}

function render(root) {
  const list = cards(root)
  list.forEach((card, i) => {
    const isActive = i === activeIndex
    card.classList.toggle('is-expanded', isActive)
    card.setAttribute('aria-pressed', String(isActive))
    card.disabled = activeIndex !== null && !isActive
  })

  const status = root.querySelector('[data-pcr-status]')
  if (status) {
    status.textContent =
      activeIndex === null
        ? 'Idle'
        : `Previewing REEL 0${activeIndex + 1} — activate again to return`
  }
}

function bindUi() {
  const root = rootEl()
  if (!root) return

  cards(root).forEach((card, i) => {
    card.addEventListener('click', () => {
      activeIndex = activeIndex === i ? null : i
      render(root)
    })
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      activeIndex = null
      render(root)
    }
  })

  render(root)
}

bindUi()
