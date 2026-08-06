/**
 * Scrub Preview Thumbnail (SPX-3170) — tiny portable interaction.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * Dragging (or keying through) the timeline handle shows a preview
 * thumbnail anchored above the current handle position, labelled with the
 * time at that point. Releasing hides the thumbnail again.
 */

const DURATION_S = 18 * 60

function formatTime(seconds) {
  const s = Math.round(seconds)
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${String(m).padStart(2, '0')}:${String(r).padStart(2, '0')}`
}

function rootEl() {
  return document.querySelector('[data-scrub-preview-thumbnail]')
}

function positionThumb(root, range, thumb) {
  const min = Number(range.min) || 0
  const max = Number(range.max) || 100
  const pct = (Number(range.value) - min) / (max - min)
  const trackWidth = range.clientWidth
  const x = pct * trackWidth
  thumb.style.left = `${x}px`

  const fill = root.querySelector('[data-spt-fill]')
  if (fill) fill.style.width = `${pct * 100}%`

  return pct
}

function updateReadout(root, pct, scrubbing) {
  const seconds = pct * DURATION_S
  const label = formatTime(seconds)
  const readout = root.querySelector('[data-spt-readout]')
  const thumbTime = root.querySelector('[data-spt-thumb-time]')
  if (thumbTime) thumbTime.textContent = label
  if (readout) {
    readout.textContent = `${scrubbing ? 'Scrubbing to' : 'Idle at'} ${label} / ${formatTime(DURATION_S)}`
  }
}

function beginScrub(root) {
  root.classList.add('is-scrubbing')
  const thumb = root.querySelector('[data-spt-thumb]')
  if (thumb) thumb.hidden = false
}

function endScrub(root) {
  root.classList.remove('is-scrubbing')
  const thumb = root.querySelector('[data-spt-thumb]')
  if (thumb) thumb.hidden = true
  const range = root.querySelector('[data-spt-range]')
  if (range) {
    const pct = positionThumb(root, range, root.querySelector('[data-spt-thumb]') || thumb)
    updateReadout(root, pct, false)
  }
}

function bindUi() {
  const root = rootEl()
  if (!root) return
  const range = root.querySelector('[data-spt-range]')
  const thumb = root.querySelector('[data-spt-thumb]')
  if (!range || !thumb) return

  const sync = (scrubbing) => {
    const pct = positionThumb(root, range, thumb)
    updateReadout(root, pct, scrubbing)
  }

  range.addEventListener('pointerdown', () => beginScrub(root))
  range.addEventListener('input', () => sync(root.classList.contains('is-scrubbing')))
  range.addEventListener('pointerup', () => endScrub(root))
  range.addEventListener('keydown', () => beginScrub(root))
  range.addEventListener('blur', () => endScrub(root))
  range.addEventListener('pointercancel', () => endScrub(root))

  sync(false)
}

bindUi()
