/**
 * Details Panel Expand (SPX-3198) — tiny portable interaction.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * A compact card expands a details panel beneath it in place — no
 * navigation, no route change. CLOSE (or the toggle again) collapses it.
 */

function rootEl() {
  return document.querySelector('[data-details-panel-expand]')
}

function setOpen(root, open) {
  root.classList.toggle('is-open', open)
  const toggle = root.querySelector('[data-dpe-toggle]')
  if (toggle) {
    toggle.setAttribute('aria-expanded', String(open))
    toggle.textContent = open ? 'HIDE DETAILS' : 'DETAILS'
  }
}

function bindUi() {
  const root = rootEl()
  if (!root) return

  root.querySelector('[data-dpe-toggle]')?.addEventListener('click', () => {
    setOpen(root, !root.classList.contains('is-open'))
  })

  root.querySelector('[data-dpe-close]')?.addEventListener('click', () => setOpen(root, false))

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') setOpen(root, false)
  })
}

bindUi()
