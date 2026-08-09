/**
 * Input Focus Attack — tiny portable trigger API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

function rootEl() {
  return document.querySelector('[data-focus-attack]')
}

function inputEl() {
  return document.querySelector('.focus-attack__input')
}

function bindUi() {
  const root = rootEl()
  const input = inputEl()
  const replay = document.querySelector('[data-focus-attack-replay]')

  input?.addEventListener('focus', () => {
    root?.classList.add('focus-attack--active')
  })

  input?.addEventListener('blur', () => {
    root?.classList.remove('focus-attack--active')
  })

  replay?.addEventListener('click', () => {
    const el = inputEl()
    if (!el) return
    if (document.activeElement === el) {
      el.blur()
      window.setTimeout(() => el.focus(), 260)
    } else {
      el.focus()
    }
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') {
      const el = inputEl()
      if (!el) return
      el.blur()
      window.setTimeout(() => el.focus(), 260)
    }
  })
}

bindUi()
window.setTimeout(() => inputEl()?.focus(), 350)
