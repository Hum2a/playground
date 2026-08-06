const TITLES = ['TITLE A', 'TITLE B', 'TITLE C']

function setLive(text) {
  const live = document.querySelector('[data-pnpo-live]')
  if (live) live.textContent = text
}

export function focusNeighbourCard(index) {
  const root = document.querySelector('[data-pnpo]')
  if (!root) return
  root.setAttribute('data-focus', String(index))
  document.querySelectorAll('[data-pnpo-card]').forEach((card, i) => {
    card.classList.toggle('is-focused', i === index)
  })
  setLive(`${TITLES[index]} expanded; neighbours pushed aside.`)
}

function bind() {
  document.querySelectorAll('[data-pnpo-card]').forEach((card, i) => {
    card.addEventListener('click', () => focusNeighbourCard(i))
  })
  window.addEventListener('message', (event) => {
    if (event.data?.type === 'restart') focusNeighbourCard(1)
  })
}

bind()
focusNeighbourCard(1)
