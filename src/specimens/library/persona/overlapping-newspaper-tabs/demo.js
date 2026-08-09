/**
 * Overlapping Newspaper Tabs — tiny portable trigger API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 * Implements the WAI-ARIA APG tabs pattern (roving tabindex, Arrow key navigation).
 */

function tabs() {
  return Array.from(document.querySelectorAll('[data-newspaper-tab]'))
}

function panels() {
  return Array.from(document.querySelectorAll('.newspaper-tabs__panel'))
}

/**
 * Select tab `index`: updates aria-selected, roving tabindex, and panel visibility.
 * @param {number} index
 * @param {boolean} [focus]
 */
export function selectTab(index, focus = true) {
  const tabEls = tabs()
  const panelEls = panels()
  if (index < 0 || index >= tabEls.length) return

  tabEls.forEach((tab, i) => {
    const active = i === index
    tab.setAttribute('aria-selected', active ? 'true' : 'false')
    tab.tabIndex = active ? 0 : -1
  })

  panelEls.forEach((panel, i) => {
    const active = i === index
    panel.hidden = !active
    panel.classList.toggle('newspaper-tabs__panel--active', active)
  })

  if (focus) tabEls[index].focus()
}

function bindUi() {
  const tabEls = tabs()

  tabEls.forEach((tab, i) => {
    tab.addEventListener('click', () => selectTab(i, false))

    tab.addEventListener('keydown', (event) => {
      const key = event.key
      if (key !== 'ArrowRight' && key !== 'ArrowLeft' && key !== 'Home' && key !== 'End') return
      event.preventDefault()
      let next = i
      if (key === 'ArrowRight') next = (i + 1) % tabEls.length
      if (key === 'ArrowLeft') next = (i - 1 + tabEls.length) % tabEls.length
      if (key === 'Home') next = 0
      if (key === 'End') next = tabEls.length - 1
      selectTab(next)
    })
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') selectTab(0, false)
  })
}

bindUi()
