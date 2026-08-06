function status(t) {
  const el = document.querySelector('[data-pjh-status]')
  if (el) el.textContent = t
}

function join() {
  const root = document.querySelector('[data-pjh]')
  if (!root) return
  root.classList.add('is-active')
  root.querySelector('[data-pjh-session]').hidden = false
  status('Joined — active voice session')
}

function leave() {
  const root = document.querySelector('[data-pjh]')
  if (!root) return
  root.classList.remove('is-active')
  root.querySelector('[data-pjh-session]').hidden = true
  status('Invite card — not joined')
}

function bind() {
  document.querySelector('[data-pjh-join]')?.addEventListener('click', join)
  document.querySelector('[data-pjh-leave]')?.addEventListener('click', leave)
  addEventListener('message', (e) => { if (e.data?.type === 'restart') leave() })
}

bind()
