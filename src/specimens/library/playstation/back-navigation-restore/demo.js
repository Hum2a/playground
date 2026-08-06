let focus = 0
const labels = ['Alpha', 'Bravo', 'Charlie', 'Delta']

function status(t) {
  const el = document.querySelector('[data-bnr-status]')
  if (el) el.textContent = t
}

function render() {
  const root = document.querySelector('[data-bnr]')
  if (!root) return
  root.querySelectorAll('[data-bnr-tile]').forEach((tile, i) => {
    tile.classList.toggle('is-focused', i === focus)
  })
}

function openDetail(idx) {
  const root = document.querySelector('[data-bnr]')
  if (!root) return
  focus = idx
  root.querySelector('[data-bnr-list]').hidden = true
  const detail = root.querySelector('[data-bnr-detail]')
  detail.hidden = false
  const title = root.querySelector('[data-bnr-detail-title]')
  if (title) title.textContent = labels[idx] + ' — Details'
  status('Viewing details for ' + labels[idx])
}

function back() {
  const root = document.querySelector('[data-bnr]')
  if (!root) return
  root.querySelector('[data-bnr-detail]').hidden = true
  root.querySelector('[data-bnr-list]').hidden = false
  render()
  status('Focus restored on tile ' + (focus + 1) + ' — list view')
  const tile = root.querySelector('[data-bnr-tile="' + focus + '"]')
  tile?.focus()
}

function bind() {
  const root = document.querySelector('[data-bnr]')
  if (!root) return
  root.querySelectorAll('[data-bnr-tile]').forEach((tile) => {
    tile.addEventListener('click', () => openDetail(Number(tile.getAttribute('data-bnr-tile'))))
  })
  root.querySelector('[data-bnr-back]')?.addEventListener('click', back)
  render()
  addEventListener('message', (e) => {
    if (e.data?.type === 'restart') {
      focus = 0
      root.querySelector('[data-bnr-detail]').hidden = true
      root.querySelector('[data-bnr-list]').hidden = false
      render()
      status('Focus on tile 1 — list view')
    }
  })
}

bind()
