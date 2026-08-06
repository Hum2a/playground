/**
 * Victory Results Tally — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

const PLATE_ENTER_MS = 300
const ROW_STAGGER_MS = 180
const TALLY_MS = 500

const TARGETS = {
  score: 2450,
  bonus: 350,
  timeSeconds: 102, // 01:42
  total: 2800,
}

let busy = false
/** @type {number[]} */
let timers = []
/** @type {Set<number>} */
const rafIds = new Set()

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function root() {
  return document.querySelector('[data-victory-tally]')
}

function clearTimers() {
  timers.forEach((id) => window.clearTimeout(id))
  timers = []
  rafIds.forEach((id) => window.cancelAnimationFrame(id))
  rafIds.clear()
}

function later(fn, ms) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
  return id
}

function pad5(n) {
  return String(Math.max(0, Math.round(n))).padStart(5, '0')
}

function pad4(n) {
  return String(Math.max(0, Math.round(n))).padStart(4, '0')
}

function formatBonus(n) {
  return `+${pad4(n)}`
}

function formatTime(totalSeconds) {
  const s = Math.max(0, Math.round(totalSeconds))
  const mm = String(Math.floor(s / 60)).padStart(2, '0')
  const ss = String(s % 60).padStart(2, '0')
  return `${mm}:${ss}`
}

function setValue(key, text) {
  const el = document.querySelector(`[data-vt-value="${key}"]`)
  if (el) el.textContent = text
}

function showRow(key) {
  document.querySelector(`[data-vt-row="${key}"]`)?.classList.add('is-visible')
}

function announceFinals() {
  const live = document.querySelector('[data-vt-live]')
  if (!live) return
  live.textContent =
    'Results. Score 2450. Bonus 350. Time 1 minute 42 seconds. Total 2800. Level up.'
}

function countTo({ from, to, durationMs, onUpdate }) {
  return new Promise((resolve) => {
    if (durationMs <= 0 || from === to) {
      onUpdate(to)
      resolve(to)
      return
    }

    const start = performance.now()
    const delta = to - from
    let handle = 0

    function frame(now) {
      rafIds.delete(handle)
      const t = Math.min(1, (now - start) / durationMs)
      const eased = 1 - (1 - t) * (1 - t)
      const value = t >= 1 ? to : from + delta * eased
      onUpdate(value)
      if (t >= 1) {
        onUpdate(to)
        resolve(to)
        return
      }
      handle = window.requestAnimationFrame(frame)
      rafIds.add(handle)
    }

    handle = window.requestAnimationFrame(frame)
    rafIds.add(handle)
  })
}

function resetUi() {
  const el = root()
  if (!el) return

  clearTimers()
  busy = false
  el.classList.remove('victory-tally--enter', 'victory-tally--running', 'victory-tally--done')

  el.querySelector('[data-vt-plate]')?.setAttribute('aria-hidden', 'true')
  el.querySelectorAll('[data-vt-row]').forEach((row) => {
    row.classList.remove('is-visible')
  })
  el.querySelector('[data-vt-finale]')?.classList.remove('is-visible')

  setValue('score', '00000')
  setValue('bonus', '+0000')
  setValue('time', '00:00')
  setValue('total', '00000')

  const live = el.querySelector('[data-vt-live]')
  if (live) live.textContent = ''

  const trigger = el.querySelector('[data-vt-trigger]')
  if (trigger instanceof HTMLButtonElement) trigger.disabled = false
}

/**
 * Run the victory results sequence.
 * @returns {Promise<void>}
 */
export function runVictoryResultsTally() {
  const el = root()
  if (!el || busy) return Promise.resolve()

  busy = true
  clearTimers()

  const trigger = el.querySelector('[data-vt-trigger]')
  if (trigger instanceof HTMLButtonElement) trigger.disabled = true

  el.classList.remove('victory-tally--done')
  el.classList.add('victory-tally--enter', 'victory-tally--running')
  el.querySelector('[data-vt-plate]')?.setAttribute('aria-hidden', 'false')

  el.querySelectorAll('[data-vt-row]').forEach((row) => {
    row.classList.remove('is-visible')
  })
  el.querySelector('[data-vt-finale]')?.classList.remove('is-visible')
  setValue('score', '00000')
  setValue('bonus', '+0000')
  setValue('time', '00:00')
  setValue('total', '00000')

  const live = el.querySelector('[data-vt-live]')
  if (live) live.textContent = ''

  if (prefersReducedMotion()) {
    showRow('score')
    showRow('bonus')
    showRow('time')
    showRow('total')
    setValue('score', pad5(TARGETS.score))
    setValue('bonus', formatBonus(TARGETS.bonus))
    setValue('time', formatTime(TARGETS.timeSeconds))
    setValue('total', pad5(TARGETS.total))
    el.querySelector('[data-vt-finale]')?.classList.add('is-visible')
    announceFinals()
    el.classList.remove('victory-tally--running')
    el.classList.add('victory-tally--done')
    busy = false
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    later(async () => {
      const scoreP = (async () => {
        showRow('score')
        await countTo({
          from: 0,
          to: TARGETS.score,
          durationMs: TALLY_MS,
          onUpdate: (v) => setValue('score', pad5(v)),
        })
      })()

      const bonusP = new Promise((r) => {
        later(async () => {
          showRow('bonus')
          await countTo({
            from: 0,
            to: TARGETS.bonus,
            durationMs: TALLY_MS,
            onUpdate: (v) => setValue('bonus', formatBonus(v)),
          })
          r()
        }, ROW_STAGGER_MS)
      })

      later(async () => {
        showRow('time')
        await countTo({
          from: 0,
          to: TARGETS.timeSeconds,
          durationMs: TALLY_MS,
          onUpdate: (v) => setValue('time', formatTime(v)),
        })
      }, ROW_STAGGER_MS * 2)

      await Promise.all([scoreP, bonusP])

      showRow('total')
      await countTo({
        from: 0,
        to: TARGETS.total,
        durationMs: TALLY_MS,
        onUpdate: (v) => setValue('total', pad5(v)),
      })

      await new Promise((r) => later(r, ROW_STAGGER_MS))
      el.querySelector('[data-vt-finale]')?.classList.add('is-visible')
      announceFinals()

      el.classList.remove('victory-tally--running')
      el.classList.add('victory-tally--done')
      busy = false
      resolve()
    }, PLATE_ENTER_MS)
  })
}

function bind() {
  document.querySelector('[data-vt-trigger]')?.addEventListener('click', () => {
    void runVictoryResultsTally()
  })
}

window.addEventListener('message', (event) => {
  const data = event.data
  if (!data || typeof data !== 'object') return
  if (data.type === 'restart') resetUi()
})

bind()
