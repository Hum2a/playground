/**
 * Quick Settings Tile Toggle — bounded ripple and growing active backing.
 * Sandbox-safe (no parent / storage / network).
 */

const BACKING_MS = 260

let active = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function tileEl() {
  return document.querySelector('[data-qstt-network]')
}

function statusEl() {
  return document.querySelector('[data-qstt-status]')
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function updateUi() {
  const tile = tileEl()
  const label = document.querySelector('[data-qstt-label]')
  const sub = document.querySelector('[data-qstt-sub]')
  if (!tile) return
  tile.setAttribute('aria-pressed', active ? 'true' : 'false')
  if (sub) sub.textContent = active ? 'Connected' : 'Off'
  if (label) label.textContent = 'Network'
  setStatus(active ? 'Network on — active backing expanded.' : 'Network tile off. Click or press Space to toggle.')
}

function spawnRipple(e) {
  const tile = tileEl()
  const ripple = document.querySelector('[data-qstt-ripple]')
  if (!tile || !ripple) return
  const rect = tile.getBoundingClientRect()
  const x = (e.clientX ?? rect.left + rect.width / 2) - rect.left
  const y = (e.clientY ?? rect.top + rect.height / 2) - rect.top
  ripple.style.left = `${x}px`
  ripple.style.top = `${y}px`
  ripple.classList.remove('is-active')
  void ripple.offsetWidth
  if (!prefersReducedMotion()) ripple.classList.add('is-active')
  else {
    tile.style.background = 'rgba(255,255,255,0.08)'
    window.setTimeout(() => {
      tile.style.background = ''
    }, 80)
  }
}

function toggle() {
  active = !active
  updateUi()
}

export function resetQuickSettingsTileToggle() {
  active = false
  updateUi()
}

function bindUi() {
  const tile = tileEl()
  tile?.addEventListener('pointerdown', spawnRipple)
  tile?.addEventListener('click', toggle)
  tile?.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      spawnRipple(e)
      toggle()
    }
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetQuickSettingsTileToggle()
    }
  })
}

bindUi()
resetQuickSettingsTileToggle()

export const QUICK_SETTINGS_TILE_TOGGLE_CONTRACT = { BACKING_MS, TILE_W: 148, TILE_H: 72 }
