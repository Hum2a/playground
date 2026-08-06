/**
 * Capture Thumbnail Flyout (SPX-3417) — sandbox-safe PlayStation specimen.
 */

let busy = false
function root() { return document.querySelector('[data-ps="capture-thumbnail-flyout"]') }
function capture() {
  if (busy) return
  busy = true
  const r = root()
  const thumb = r?.querySelector('[data-ctf-thumb]')
  const stage = r?.querySelector('[data-ctf-stage]')
  const status = r?.querySelector('[data-ctf-status]')
  if (!thumb) return
  stage?.classList.add('is-busy')
  thumb.hidden = false
  thumb.classList.remove('is-docked')
  if (status) status.textContent = 'Thumbnail appearing…'
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      thumb.classList.add('is-docked')
      if (status) status.textContent = 'Flying to saved-preview corner.'
    })
  })
  setTimeout(() => {
    busy = false
    if (status) status.textContent = 'Docked — press CAPTURE again.'
  }, 560)
}
function reset() {
  busy = false
  const thumb = root()?.querySelector('[data-ctf-thumb]')
  root()?.querySelector('[data-ctf-stage]')?.classList.remove('is-busy')
  if (thumb) { thumb.hidden = true; thumb.classList.remove('is-docked') }
}
function bind() {
  root()?.querySelector('[data-ctf-capture]')?.addEventListener('click', capture)
  window.addEventListener('message', (e) => { if (e.data?.type === 'restart') reset() })
}
bind()
