const N = 3
let cur = 0
let busy = false
function rm() { return document.documentElement.getAttribute('data-force-reduced-motion') === 'true' || window.matchMedia('(prefers-reduced-motion: reduce)').matches }
function steps() { return Array.from(document.querySelectorAll('[data-osa-step]')) }
function links() { return Array.from(document.querySelectorAll('[data-osa-link]')) }
function paint() {
  steps().forEach((el, i) => {
    const st = i < cur ? 'complete' : i === cur ? 'current' : 'pending'
    el.setAttribute('data-state', st)
  })
  const status = document.querySelector('[data-osa-status]')
  const live = document.querySelector('[data-osa-live]')
  const root = document.querySelector('[data-osa]')
  if (cur >= N) {
    root?.setAttribute('data-phase', 'done')
    if (status) status.textContent = 'All objectives complete.'
    if (live) live.textContent = 'All objectives complete.'
  } else {
    root?.setAttribute('data-phase', 'active')
    if (status) status.textContent = 'Step ' + (cur + 1) + ' of ' + N + ' active.'
    if (live) live.textContent = 'Step ' + (cur + 1) + ' active.'
  }
}
function pulse(i, cb) {
  const p = links()[i]?.querySelector('.osa__pulse')
  if (!p || rm()) { cb(); return }
  p.style.left = '0%'; p.classList.add('is-on'); void p.offsetWidth; p.style.left = '100%'
  window.setTimeout(() => { p.classList.remove('is-on'); p.style.left = '0%'; cb() }, 260)
}
function advance() {
  if (busy || cur >= N) return
  busy = true
  if (rm()) { cur = N; paint(); busy = false; return }
  const done = cur
  cur = Math.min(cur + 1, N)
  steps()[done]?.setAttribute('data-state', 'complete')
  if (done < N - 1) {
    pulse(done, () => { paint(); busy = false })
  } else { paint(); busy = false }
}
function reset() { cur = 0; busy = false; paint(); document.querySelector('[data-osa]')?.setAttribute('data-phase', 'idle') }
function bind() {
  document.querySelector('[data-osa-run]')?.addEventListener('click', advance)
  window.addEventListener('message', (e) => { if (e.data?.type === 'restart') reset() })
  reset()
}
bind()
