const SHAPES = ['sst__shape--circle', 'sst__shape--cross', 'sst__shape--square', 'sst__shape--triangle']
const DEST = [
  { x: 0.12, y: 0.35 },
  { x: 0.88, y: 0.35 },
  { x: 0.12, y: 0.72 },
  { x: 0.88, y: 0.72 },
]
let busy = false

function rm() {
  return document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
    || matchMedia('(prefers-reduced-motion: reduce)').matches
}

function status(t) {
  const el = document.querySelector('[data-sst-status]')
  if (el) el.textContent = t
}

function ensureTokens(root) {
  const burst = root.querySelector('[data-sst-burst]')
  if (!burst || burst.childElementCount) return
  SHAPES.forEach((cls, i) => {
    const t = document.createElement('span')
    t.className = 'sst__token sst__shape ' + cls
    t.setAttribute('data-sst-token', String(i))
    burst.appendChild(t)
  })
}

function placeTokens(root, atDest) {
  const stage = root.querySelector('.sst__stage')
  const source = root.querySelector('[data-sst-source]')
  const dest = root.querySelector('[data-sst-dest]')
  if (!stage || !source) return
  const sr = stage.getBoundingClientRect()
  const sRect = source.getBoundingClientRect()
  const dRect = dest?.getBoundingClientRect()
  const sx = sRect.left + sRect.width / 2 - sr.left
  const sy = sRect.top + sRect.height / 2 - sr.top

  root.querySelectorAll('[data-sst-token]').forEach((token, i) => {
    let x = sx
    let y = sy
    if (atDest && dRect) {
      x = dRect.left - sr.left + dRect.width * DEST[i].x
      y = dRect.top - sr.top + dRect.height * DEST[i].y
    }
    token.style.transform = 'translate(' + (x - 6) + 'px, ' + (y - 6) + 'px)'
    token.style.opacity = atDest || root.classList.contains('is-scattering') ? '1' : '0'
  })
}

function run() {
  const root = document.querySelector('[data-sst]')
  if (!root || busy) return
  busy = true
  const btn = root.querySelector('[data-sst-run]')
  if (btn) btn.disabled = true
  root.classList.remove('is-arrived')
  ensureTokens(root)
  placeTokens(root, false)
  root.classList.add('is-scattering')
  status('Scattering tokens…')

  const finish = () => {
    placeTokens(root, true)
    root.classList.add('is-arrived')
    status('Tokens reformed around destination')
    busy = false
    if (btn) btn.disabled = false
  }

  if (rm()) finish()
  else requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(finish, 900)))
}

function reset() {
  const root = document.querySelector('[data-sst]')
  if (!root) return
  root.classList.remove('is-scattering', 'is-arrived')
  root.querySelectorAll('[data-sst-token]').forEach((t) => {
    t.style.opacity = '0'
  })
  status('Ready — tokens at source')
  busy = false
  const btn = root.querySelector('[data-sst-run]')
  if (btn) btn.disabled = false
}

function bind() {
  const root = document.querySelector('[data-sst]')
  if (!root) return
  ensureTokens(root)
  root.querySelector('[data-sst-run]')?.addEventListener('click', run)
  addEventListener('message', (e) => { if (e.data?.type === 'restart') reset() })
}

bind()
