const TITLES = ['TITLE A', 'TITLE B', 'TITLE C']

function setLive(text) {
  const live = document.querySelector('[data-hgfs-live]')
  if (live) live.textContent = text
}

export function focusGameTile(index) {
  const root = document.querySelector('[data-hgfs]')
  if (!root) return
  root.setAttribute('data-focus', String(index))
  document.querySelectorAll('[data-hgfs-tile]').forEach((tile, n) => {
    const on = n === index
    tile.classList.toggle('is-focused', on)
    tile.setAttribute('aria-pressed', on ? 'true' : 'false')
  })
  document.querySelectorAll('[data-hgfs-plane]').forEach((plane, n) => {
    plane.classList.toggle('is-active', n === index)
  })
  setLive(TITLES[index] + ' focused.')
}

function bind() {
  document.querySelectorAll('[data-hgfs-tile]').forEach((tile, i) => {
    tile.addEventListener('click', () => focusGameTile(i))
  })
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'restart') focusGameTile(1)
  })
}

bind()
focusGameTile(1)
