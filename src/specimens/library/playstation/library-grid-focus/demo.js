const COLS = 4
const ROWS = 3
let row = 0
let col = 0

function status() {
  const el = document.querySelector('[data-lgf-status]')
  if (el) el.textContent = 'Focus: row ' + (row + 1) + ', col ' + (col + 1)
}

function buildGrid() {
  const grid = document.querySelector('[data-lgf-grid]')
  if (!grid || grid.childElementCount) return
  for (let i = 0; i < COLS * ROWS; i++) {
    const d = document.createElement('div')
    d.className = 'lgf__tile'
    d.setAttribute('data-lgf-tile', String(i))
    d.setAttribute('data-idx', String(i + 1).padStart(2, '0'))
    grid.appendChild(d)
  }
}

function render() {
  const idx = row * COLS + col
  document.querySelectorAll('[data-lgf-tile]').forEach((t, i) => {
    t.classList.toggle('is-focus', i === idx)
  })
  status()
}

function move(dr, dc) {
  row = Math.max(0, Math.min(ROWS - 1, row + dr))
  col = Math.max(0, Math.min(COLS - 1, col + dc))
  render()
}

function bind() {
  buildGrid()
  render()
  document.querySelector('[data-lgf-up]')?.addEventListener('click', () => move(-1, 0))
  document.querySelector('[data-lgf-down]')?.addEventListener('click', () => move(1, 0))
  document.querySelector('[data-lgf-left]')?.addEventListener('click', () => move(0, -1))
  document.querySelector('[data-lgf-right]')?.addEventListener('click', () => move(0, 1))
  addEventListener('message', (e) => {
    if (e.data?.type === 'restart') {
      row = 0
      col = 0
      render()
    }
  })
}

bind()
