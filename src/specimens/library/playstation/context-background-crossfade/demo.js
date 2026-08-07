const LABELS = ['TITLE A', 'TITLE B', 'TITLE C']
const LAYERS = ['a', 'b', 'c']

function setLive(text) {
  const live = document.querySelector('[data-cbc-live]')
  if (live) live.textContent = text
}

export function setContextFocus(index) {
  const root = document.querySelector('[data-cbc]')
  if (!root) return
  const layer = LAYERS[index]
  root.setAttribute('data-layer', layer)
  document.querySelectorAll('[data-cbc-bg]').forEach((bg) => {
    bg.classList.toggle('is-active', bg.getAttribute('data-cbc-bg') === layer)
  })
  const label = document.querySelector('[data-cbc-label]')
  if (label) label.textContent = LABELS[index]
  document.querySelectorAll('[data-cbc-tile]').forEach((tile, n) => {
    const on = n === index
    tile.classList.toggle('is-focused', on)
    tile.setAttribute('aria-pressed', on ? 'true' : 'false')
  })
  setLive('Context: ' + LABELS[index] + '.')
}

function bind() {
  document.querySelectorAll('[data-cbc-tile]').forEach((tile, i) => {
    tile.addEventListener('click', () => setContextFocus(i))
  })
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'restart') setContextFocus(0)
  })
}

bind()
setContextFocus(0)
