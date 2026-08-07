/**
 * Manga Panel Expand Focus — interactive panel hierarchy replate.
 * Sandbox-safe (no parent / storage / network).
 */

const LABELS = ['01 · INK', '02 · GUTTER', '03 · BLEED', '04 · TOME']

function rootEl() {
  return document.querySelector('[data-manga-panel-expand-focus]')
}

function statusEl() {
  return document.querySelector('[data-mpe-status]')
}

/**
 * @param {string} index
 */
function promote(index) {
  const root = rootEl()
  if (!root) return

  root.dataset.active = index
  root.dataset.layout = 'focus'

  root.querySelectorAll('.mpe__panel').forEach((panel) => {
    const on = panel.getAttribute('data-panel') === index
    panel.classList.toggle('is-active', on)
    panel.setAttribute('aria-pressed', on ? 'true' : 'false')
  })

  const status = statusEl()
  if (status) {
    status.textContent = `Dominant frame: Panel ${LABELS[Number(index)]}.`
  }
}

function bindUi() {
  const root = rootEl()
  if (!root) return

  root.querySelectorAll('.mpe__panel').forEach((panel) => {
    panel.addEventListener('click', () => {
      const index = panel.getAttribute('data-panel')
      if (index != null) promote(index)
    })
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetMangaPanelExpandFocus()
    }
  })
}

export function resetMangaPanelExpandFocus() {
  const root = rootEl()
  if (!root) return

  root.dataset.layout = 'equal'
  root.dataset.active = '0'

  root.querySelectorAll('.mpe__panel').forEach((panel) => {
    const on = panel.getAttribute('data-panel') === '0'
    panel.classList.toggle('is-active', on)
    panel.setAttribute('aria-pressed', on ? 'true' : 'false')
  })

  const status = statusEl()
  if (status) {
    status.textContent = 'Equal page. Panel 01 selected.'
  }
}

export function promoteMangaPanelExpandFocus(index) {
  promote(String(index))
}

bindUi()
