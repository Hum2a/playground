function setTab(root, requestedIndex) {
  const tabs = [...root.querySelectorAll('[data-gts-tab]')]
  const panels = [...root.querySelectorAll('[data-gts-panel]')]
  if (!tabs.length || tabs.length !== panels.length) return

  const index = Math.max(0, Math.min(requestedIndex, tabs.length - 1))

  root.style.setProperty('--gts-index', String(index))
  tabs.forEach((tab, tabIndex) => {
    const selected = tabIndex === index
    tab.setAttribute('aria-selected', String(selected))
    tab.tabIndex = selected ? 0 : -1
  })
  panels.forEach((panel, panelIndex) => {
    panel.hidden = panelIndex !== index
  })
}

function bindGlassTabSwitcher(scope = document) {
  scope.querySelectorAll('[data-glass-tab-switcher]').forEach((root) => {
    if (root.dataset.gtsBound === 'true') return
    root.dataset.gtsBound = 'true'

    const tabs = [...root.querySelectorAll('[data-gts-tab]')]
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => setTab(root, index))
      tab.addEventListener('keydown', (event) => {
        let nextIndex = index

        if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length
        else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length
        else if (event.key === 'Home') nextIndex = 0
        else if (event.key === 'End') nextIndex = tabs.length - 1
        else return

        event.preventDefault()
        setTab(root, nextIndex)
        tabs[nextIndex].focus()
      })
    })
  })
}

bindGlassTabSwitcher()

window.glassTabSwitcher = {
  init: bindGlassTabSwitcher,
  set: setTab,
}
