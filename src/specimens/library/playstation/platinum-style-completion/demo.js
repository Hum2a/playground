let earned = 4

function status(t) {
  const el = document.querySelector('[data-psc-status]')
  if (el) el.textContent = t
}

function render() {
  const root = document.querySelector('[data-psc]')
  if (!root) return
  root.querySelectorAll('[data-psc-slot]').forEach((slot, i) => {
    slot.classList.toggle('is-earned', i < earned)
  })
}

function unlock() {
  const root = document.querySelector('[data-psc]')
  if (!root || earned >= 5) return
  earned = 5
  render()
  const plat = root.querySelector('[data-psc-platinum]')
  root.classList.add('is-platinum')
  if (plat) plat.hidden = false
  status('Platinum master state — collection complete')
  const btn = root.querySelector('[data-psc-unlock]')
  if (btn) btn.disabled = true
}

function reset() {
  earned = 4
  const root = document.querySelector('[data-psc]')
  if (!root) return
  root.classList.remove('is-platinum')
  const plat = root.querySelector('[data-psc-platinum]')
  if (plat) plat.hidden = true
  const btn = root.querySelector('[data-psc-unlock]')
  if (btn) btn.disabled = false
  render()
  status('4 of 5 earned — one remaining')
}

function bind() {
  render()
  document.querySelector('[data-psc-unlock]')?.addEventListener('click', unlock)
  addEventListener('message', (e) => { if (e.data?.type === 'restart') reset() })
}

bind()
