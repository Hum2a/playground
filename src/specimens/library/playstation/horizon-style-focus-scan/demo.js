/**
 * Horizon-Style Focus Scan (SPX-3487) — bracket reticle + metadata panel.
 */

const SCAN_MS = 1100
let busy = false

function status(t) {
  const el = document.querySelector('[data-hfs-status]')
  if (el) el.textContent = t
}

function rm() {
  return (
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true' ||
    matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function scan() {
  const root = document.querySelector('[data-hfs]')
  if (!root || busy) return
  busy = true
  const btn = root.querySelector('[data-hfs-scan]')
  if (btn) btn.disabled = true
  root.classList.remove('is-revealed')
  root.classList.add('is-scanning')
  status('Scanning target…')
  const finish = () => {
    root.classList.remove('is-scanning')
    root.classList.add('is-revealed')
    const meta = root.querySelector('[data-hfs-meta]')
    if (meta) meta.hidden = false
    status('Scan complete — metadata panel revealed')
    busy = false
    if (btn) btn.disabled = false
  }
  if (rm()) finish()
  else setTimeout(finish, SCAN_MS)
}

function reset() {
  const root = document.querySelector('[data-hfs]')
  if (!root) return
  root.classList.remove('is-scanning', 'is-revealed')
  const meta = root.querySelector('[data-hfs-meta]')
  if (meta) meta.hidden = true
  status('Target idle — metadata hidden')
  busy = false
  const btn = root.querySelector('[data-hfs-scan]')
  if (btn) btn.disabled = false
}

function bind() {
  document.querySelector('[data-hfs-scan]')?.addEventListener('click', scan)
  addEventListener('message', (e) => {
    if (e.data?.type === 'restart') reset()
  })
}

bind()
