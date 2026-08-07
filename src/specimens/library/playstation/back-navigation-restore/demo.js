let focus = 0
const labels = ['Alpha', 'Bravo', 'Charlie', 'Delta']

function status(text) {
  const el = document.querySelector('[data-bnr-status]')
  if (el) el.textContent = text
}

function render() {
  const root = document.querySelector('[data-bnr]')
  if (!root) return
  root.setAttribute('data-focus-index', String(focus))
  root.querySelectorAll('[data-bnr-tile]').forEach((tile, i) => {
    tile.classList.toggle('is-focused', i === focus)
  })
}

function openDetail(idx) {
  const root = document.querySelector('[data-bnr]')
  if (!root) return
  focus = idx
  root.setAttribute('data-focus-index', String(focus))
  root.setAttribute('data-view', 'detail')
  root.querySelector('[data-bnr-list]').hidden = true
  const detail = root.querySelector('[data-bnr-detail]')
  detail.hidden = false
  const title = root.querySelector('[data-bnr-detail-title]')
  if (title) title.textContent = labels[idx] + ' — Details'
  status('Viewing details for ' + labels[idx] + ' (index ' + idx + ')')
}

function back() {
  const root = document.querySelector('[data-bnr]')
  if (!root) return
  const restored = focus
  root.setAttribute('data-view', 'list')
  root.querySelector('[data-bnr-detail]').hidden = true
  root.querySelector('[data-bnr-list]').hidden = false
  render()
  status('Focus restored on tile ' + (restored + 1) + ' (index ' + restored + ') — list view')
  const tile = root.querySelector('[data-bnr-tile="' + restored + '"]')
  tile?.focus()
}

function bind() {
  const root = document.querySelector('[data-bnr]')
  if (!root) return
  root.setAttribute('data-view', 'list')
  root.querySelectorAll('[data-bnr-tile]').forEach((tile) => {
    tile.addEventListener('click', () => openDetail(Number(tile.getAttribute('data-bnr-tile'))))
  })
  root.querySelector('[data-bnr-back]')?.addEventListener('click', back)
  render()
  addEventListener('message', (e) => {
    if (e.data?.type === 'restart') {
      focus = 0
      root.setAttribute('data-view', 'list')
      root.querySelector('[data-bnr-detail]').hidden = true
      root.querySelector('[data-bnr-list]').hidden = false
      render()
      status('Focus on tile 1 (index 0) — list view')
    }
  })
}

bind()
