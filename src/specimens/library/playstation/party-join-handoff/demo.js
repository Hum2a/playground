/**
 * Party Join Handoff (SPX-3402) — invite card → live voice session.
 */

function status(t) {
  const el = document.querySelector('[data-pjh-status]')
  if (el) el.textContent = t
}

function join() {
  const root = document.querySelector('[data-pjh]')
  if (!root) return
  root.classList.add('is-active')
  const session = root.querySelector('[data-pjh-session]')
  if (session) session.hidden = false
  status('Joined — voice session LIVE (you speaking)')
}

function leave() {
  const root = document.querySelector('[data-pjh]')
  if (!root) return
  root.classList.remove('is-active')
  const session = root.querySelector('[data-pjh-session]')
  if (session) session.hidden = true
  status('Invite card — not in voice session')
}

function bind() {
  document.querySelector('[data-pjh-join]')?.addEventListener('click', join)
  document.querySelector('[data-pjh-leave]')?.addEventListener('click', leave)
  addEventListener('message', (e) => {
    if (e.data?.type === 'restart') leave()
  })
}

bind()
