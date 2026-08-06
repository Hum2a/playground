/**
 * Horizontal Content Rail (SPX-3134) — tiny portable interaction.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * Six cards sit in two three-card pages. NEXT/PREV translate the track by
 * exactly one viewport width so the whole visible group moves together,
 * with the same easing regardless of direction (directional continuity).
 */

const PAGE_COUNT = 2

let page = 0

function rootEl() {
  return document.querySelector('[data-horizontal-content-rail]')
}

function render(root) {
  const track = root.querySelector('[data-hcr-track]')
  if (track) track.classList.toggle('is-page-1', page === 1)

  const prev = root.querySelector('[data-hcr-prev]')
  const next = root.querySelector('[data-hcr-next]')
  if (prev) prev.disabled = page === 0
  if (next) next.disabled = page === PAGE_COUNT - 1

  const status = root.querySelector('[data-hcr-page]')
  if (status) status.textContent = `Page ${page + 1} of ${PAGE_COUNT}`
}

function goTo(root, next) {
  page = Math.max(0, Math.min(PAGE_COUNT - 1, next))
  render(root)
}

function bindUi() {
  const root = rootEl()
  if (!root) return

  root.querySelector('[data-hcr-prev]')?.addEventListener('click', () => goTo(root, page - 1))
  root.querySelector('[data-hcr-next]')?.addEventListener('click', () => goTo(root, page + 1))

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') goTo(root, 0)
  })

  render(root)
}

bindUi()
