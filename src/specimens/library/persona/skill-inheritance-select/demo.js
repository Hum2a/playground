/**
 * Skill Inheritance Select — select chips travel into result (320ms).
 * iframe-safe; no storage / parent / network.
 */

const TRAVEL_MS = 320

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function setLive(text) {
  const el = document.querySelector('[data-sis-live]')
  if (el) el.textContent = text
}

export function resetSkillInheritanceSelect() {
  document.querySelectorAll('[data-sis-chip]').forEach((chip) => {
    chip.classList.remove('is-sent')
    chip.disabled = false
  })
  const slots = document.querySelector('[data-sis-slots]')
  if (slots) slots.innerHTML = ''
  setLive('Select skills to inherit.')
}

function inheritChip(chip) {
  if (chip.classList.contains('is-sent')) return
  const skill = chip.dataset.skill || 'SKILL'
  const slots = document.querySelector('[data-sis-slots]')
  if (!slots) return

  chip.classList.add('is-sent')
  chip.disabled = true

  const el = document.createElement('span')
  el.className = 'sis__slot'
  el.textContent = skill
  if (prefersReducedMotion()) el.style.animation = 'none'
  slots.appendChild(el)

  setLive(`${skill} inherited.`)
  /* TRAVEL_MS held as freeze reference for CSS --travel-ms */
  void TRAVEL_MS
}

function bindUi() {
  document.querySelectorAll('[data-sis-chip]').forEach((chip) => {
    chip.addEventListener('click', () => inheritChip(chip))
  })
  document
    .querySelector('[data-sis-reset]')
    ?.addEventListener('click', resetSkillInheritanceSelect)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetSkillInheritanceSelect()
  })
}

bindUi()
resetSkillInheritanceSelect()
