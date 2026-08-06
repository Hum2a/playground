/**
 * Preview Card Hover Expand (SPX-3144)
 */
const EXPAND_MS = 220

function rail() {
  return document.querySelector('[data-pche-rail]')
}

function clearExpanded() {
  const r = rail()
  if (!r) return
  r.removeAttribute('data-expanded')
  r.querySelectorAll('[data-pche-card]').forEach((c) => c.classList.remove('is-active'))
}

function expand(index) {
  const r = rail()
  if (!r) return
  clearExpanded()
  r.setAttribute('data-expanded', String(index))
  r.querySelector(`[data-pche-card="${index}"]`)?.classList.add('is-active')
}

function bind() {
  const r = rail()
  if (!r) return
  r.querySelectorAll('[data-pche-card]').forEach((card) => {
    const index = card.getAttribute('data-pche-card')
    card.addEventListener('pointerenter', () => expand(index))
    card.addEventListener('focus', () => expand(index))
    card.addEventListener('pointerleave', () => {
      if (document.activeElement !== card) clearExpanded()
    })
    card.addEventListener('blur', () => {
      window.setTimeout(() => {
        if (!r.contains(document.activeElement)) clearExpanded()
      }, 0)
    })
  })
  r.addEventListener('pointerleave', () => {
    if (!r.contains(document.activeElement)) clearExpanded()
  })
}

export function runPreviewExpand(index = 1) {
  expand(String(index))
}

export function runPreviewCollapse() {
  clearExpanded()
}

bind()
void EXPAND_MS
