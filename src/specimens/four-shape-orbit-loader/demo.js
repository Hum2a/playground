function rm() {
  return document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
    || matchMedia('(prefers-reduced-motion: reduce)').matches
}

function status(t) {
  const el = document.querySelector('[data-fso-status]')
  if (el) el.textContent = t
}

function settleShapes(root) {
  const stage = root.querySelector('[data-fso-stage]')
  const frame = root.querySelector('[data-fso-frame]')
  if (!stage || !frame) return
  frame.hidden = false
  const positions = [
    ['12px', '12px'],
    ['calc(100% - 26px)', '12px'],
    ['12px', 'calc(100% - 26px)'],
    ['calc(100% - 26px)', 'calc(100% - 26px)'],
  ]
  const classes = ['fso__shape--circle', 'fso__shape--cross', 'fso__shape--square', 'fso__shape--triangle']
  positions.forEach(([left, top], i) => {
    const s = document.createElement('span')
    s.className = 'fso__shape ' + classes[i]
    s.setAttribute('data-fso-settled', String(i))
    s.style.cssText = 'position:absolute;left:' + left + ';top:' + top + ';'
    frame.appendChild(s)
  })
}

function reset(root) {
  root.classList.remove('is-complete')
  const frame = root.querySelector('[data-fso-frame]')
  if (frame) {
    frame.hidden = true
    frame.querySelectorAll('[data-fso-settled]').forEach((n) => n.remove())
  }
  status('Orbiting — loader active')
}

function complete(root) {
  if (root.classList.contains('is-complete')) return
  root.classList.add('is-complete')
  settleShapes(root)
  status(rm() ? 'Complete — shapes locked (static)' : 'Complete — shapes settled into frame')
}

function bind() {
  const root = document.querySelector('[data-fso]')
  if (!root) return
  root.querySelector('[data-fso-complete]')?.addEventListener('click', () => complete(root))
  root.querySelector('[data-fso-reset]')?.addEventListener('click', () => reset(root))
  addEventListener('message', (e) => { if (e.data?.type === 'restart') reset(root) })
}

bind()
