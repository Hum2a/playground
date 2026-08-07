/**
 * Screenshot Capture Flash (SPX-3416) — shutter only; no thumbnail flyout.
 */

const FLASH_MS = 360

function root() {
  return document.querySelector('[data-ps="screenshot-capture-flash"]')
}

function capture() {
  const stage = root()?.querySelector('.scf__stage')
  const status = root()?.querySelector('[data-scf-status]')
  if (!stage) return
  stage.classList.remove('is-firing')
  void stage.offsetWidth
  stage.classList.add('is-firing')
  if (status) status.textContent = 'Shutter flash fired (' + FLASH_MS + 'ms).'
  setTimeout(() => {
    stage.classList.remove('is-firing')
    if (status) status.textContent = 'Ready — shutter flash only (no flyout).'
  }, FLASH_MS)
}

function bind() {
  root()?.querySelector('[data-scf-capture]')?.addEventListener('click', capture)
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'restart') {
      root()?.querySelector('.scf__stage')?.classList.remove('is-firing')
    }
  })
}

bind()
