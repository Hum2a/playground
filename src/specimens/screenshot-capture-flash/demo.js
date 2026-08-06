/**
 * Screenshot Capture Flash (SPX-3416) — sandbox-safe PlayStation specimen.
 */

function root() { return document.querySelector('[data-ps="screenshot-capture-flash"]') }
function capture() {
  const flash = root()?.querySelector('[data-scf-flash]')
  const status = root()?.querySelector('[data-scf-status]')
  if (!flash) return
  flash.classList.remove('is-on')
  void flash.offsetWidth
  flash.classList.add('is-on')
  if (status) status.textContent = 'Capture flash fired.'
  setTimeout(() => { if (status) status.textContent = 'Ready — press CAPTURE for shutter flash.' }, 500)
}
function bind() {
  root()?.querySelector('[data-scf-capture]')?.addEventListener('click', capture)
  window.addEventListener('message', (e) => { if (e.data?.type === 'restart') {} })
}
bind()
