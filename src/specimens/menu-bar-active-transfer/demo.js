/**
 * Menu Bar Active Transfer — open menu transfers between adjacent headings.
 */

const TRANSFER_X_MS = 120
const HEIGHT_MS = 100
const GRACE_MS = 220

/** @type {'file' | 'edit' | 'view' | null} */
let activeMenu = null
/** @type {ReturnType<typeof setTimeout> | null} */
let graceTimer = null

const MENUS = {
  file: ['NEW', 'OPEN', 'SAVE', 'EXPORT', 'CLOSE'],
  edit: ['UNDO', 'REDO', 'CUT', 'COPY', 'PASTE', 'SELECT ALL'],
  view: ['ZOOM IN', 'ZOOM OUT', 'FIT', 'FULL SCREEN'],
}

const HEADING_OFFSETS = { file: 8, edit: 56, view: 104 }

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-menu-bar-active-transfer]')
}

function menu() {
  return document.querySelector('[data-mbt-menu]')
}

function rowsEl() {
  return document.querySelector('[data-mbt-rows]')
}

function marker() {
  return document.querySelector('[data-mbt-marker]')
}

function statusEl() {
  return document.querySelector('[data-mbt-status]')
}

function headings() {
  return document.querySelectorAll('[data-mbt-heading]')
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function setPhase(phase) {
  root()?.setAttribute('data-phase', phase)
}

function renderRows(key) {
  const rows = rowsEl()
  if (!rows) return
  rows.innerHTML = ''
  MENUS[key].forEach((label) => {
    const row = document.createElement('div')
    row.className = 'mbt__row'
    row.setAttribute('role', 'menuitem')
    row.textContent = label
    rows.appendChild(row)
  })
  menu()?.style.setProperty('height', `${MENUS[key].length * 32}px`)
}

function setActiveHeading(key) {
  headings().forEach((h) => {
    const k = h.getAttribute('data-mbt-heading')
    h.classList.toggle('is-active', k === key)
    h.setAttribute('aria-expanded', k === key ? 'true' : 'false')
  })
  const m = marker()
  if (m && key) {
    m.style.left = `${HEADING_OFFSETS[key]}px`
  }
}

function openMenu(key) {
  if (graceTimer) {
    clearTimeout(graceTimer)
    graceTimer = null
  }
  const wasOpen = activeMenu !== null
  const transferring = wasOpen && activeMenu !== key

  if (transferring) {
    root()?.classList.add('is-transferring')
    window.setTimeout(() => {
      renderRows(key)
      root()?.classList.remove('is-transferring')
    }, prefersReducedMotion() ? 0 : 80)
  } else {
    renderRows(key)
  }

  activeMenu = key
  menu()?.removeAttribute('hidden')
  setPhase('open')
  setActiveHeading(key)
  setStatus(`${key.toUpperCase()} menu active — ${MENUS[key].length} rows.`)
}

function closeMenu() {
  activeMenu = null
  menu()?.setAttribute('hidden', '')
  setPhase('closed')
  headings().forEach((h) => {
    h.classList.remove('is-active')
    h.setAttribute('aria-expanded', 'false')
  })
  setStatus('Menu closed. Click FILE to reopen.')
}

function scheduleClose() {
  if (graceTimer) clearTimeout(graceTimer)
  graceTimer = setTimeout(closeMenu, GRACE_MS)
}

export function resetMenuBarActiveTransfer() {
  if (graceTimer) clearTimeout(graceTimer)
  graceTimer = null
  activeMenu = null
  menu()?.setAttribute('hidden', '')
  setPhase('closed')
  headings().forEach((h) => {
    h.classList.remove('is-active')
    h.setAttribute('aria-expanded', 'false')
  })
  setStatus('Click FILE to open menu. Hover EDIT or VIEW to transfer ownership.')
}

function bindUi() {
  headings().forEach((heading) => {
    const key = /** @type {'file' | 'edit' | 'view'} */ (
      heading.getAttribute('data-mbt-heading')
    )
    heading.addEventListener('click', () => openMenu(key))
    heading.addEventListener('mouseenter', () => {
      if (activeMenu) openMenu(key)
    })
  })

  menu()?.addEventListener('mouseleave', scheduleClose)
  root()?.addEventListener('mouseenter', () => {
    if (graceTimer) {
      clearTimeout(graceTimer)
      graceTimer = null
    }
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetMenuBarActiveTransfer()
    }
  })
}

bindUi()
resetMenuBarActiveTransfer()

export const MENU_BAR_ACTIVE_TRANSFER_CONTRACT = {
  TRANSFER_X_MS,
  HEIGHT_MS,
  GRACE_MS,
  MENU_W: 190,
  BAR_H: 32,
  ROW_COUNTS: { file: 5, edit: 6, view: 4 },
}
