const PCTS = ['12%', '48%', '76%']
const TITLES = ['OBJECTIVE A', 'OBJECTIVE B', 'OBJECTIVE C']

function setLive(text) {
  const live = document.querySelector('[data-acf-live]')
  if (live) live.textContent = text
}

export function focusActivityCard(index) {
  document.querySelectorAll('[data-acf-card]').forEach((card, n) => {
    const on = n === index
    card.classList.toggle('is-focused', on)
    card.setAttribute('aria-pressed', on ? 'true' : 'false')
    if (on) {
      const bar = card.querySelector('.acf__bar')
      const pct = card.querySelector('[data-acf-pct]')
      if (bar) bar.style.setProperty('--pct', PCTS[index])
      if (pct) pct.textContent = PCTS[index]
    }
  })
  setLive(TITLES[index] + ' focused · ' + PCTS[index] + '.')
}

function bind() {
  document.querySelectorAll('[data-acf-card]').forEach((card, i) => {
    card.addEventListener('click', () => focusActivityCard(i))
  })
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'restart') focusActivityCard(1)
  })
}

bind()
focusActivityCard(1)
