/**
 * Capture Thumbnail Flyout (SPX-3417) — arc travel to saved dock.
 */

const TRAVEL_MS = 640
let busy = false
let timer = null

function root() {
  return document.querySelector('[data-ps="capture-thumbnail-flyout"]')
}

function rm() {
  return (
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true' ||
    matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

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
  thumb.classList.remove('is-fly', 'is-docked', 'is-spawn')
  void thumb.offsetWidth
  thumb.classList.add('is-spawn')

  if (rm()) {
    thumb.classList.add('is-docked')
    if (status) status.textContent = 'Docked (reduced motion).'
    busy = false
    return
  }

  if (status) status.textContent = 'Thumbnail arcing to saved dock…'
  requestAnimationFrame(() => {
    thumb.classList.add('is-fly')
  })

  clearTimeout(timer)
  timer = setTimeout(() => {
    thumb.classList.remove('is-fly', 'is-spawn')
    thumb.classList.add('is-docked')
    if (status) status.textContent = 'Docked — press CAPTURE again.'
    busy = false
  }, TRAVEL_MS)
}

function reset() {
  busy = false
  clearTimeout(timer)
  const thumb = root()?.querySelector('[data-ctf-thumb]')
  root()?.querySelector('[data-ctf-stage]')?.classList.remove('is-busy')
  if (thumb) {
    thumb.hidden = true
    thumb.classList.remove('is-docked', 'is-fly', 'is-spawn')
  }
  const status = root()?.querySelector('[data-ctf-status]')
  if (status) status.textContent = 'Ready — thumb will arc to saved dock.'
}

function bind() {
  root()?.querySelector('[data-ctf-capture]')?.addEventListener('click', capture)
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'restart') reset()
  })
}

bind()
