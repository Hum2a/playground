/**
 * SPX-786 Entry Registration
 * Scan 620ms L→R; NAME @30%, CLASS @55%; STATUS waits.
 * Index cycles exactly 7 values (45ms each) then locks 086.
 * Brackets + STATUS + underline. Never announce intermediate indices.
 */
;(function () {
  const SCAN_MS = 620
  const NAME_AT = 0.3
  const CLASS_AT = 0.55
  const INDEX_MS = 45
  const INDEX_VALUES = ['014', '038', '051', '072', '083', '085', '086']
  const LOCK_MS = 200

  const IDLE_STATUS = 'Unregistered entry. Name unknown. Class unknown.'
  const DONE_STATUS =
    'Entry 086 registered. Name Vector Bloom. Class Transition. Status registered.'

  /** @type {WeakMap<HTMLElement, { timers: number[], raf: number, busy: boolean }>} */
  const stateMap = new WeakMap()

  function prefersReducedMotion(root) {
    if (root.closest('[data-force-reduced-motion="true"]')) return true
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  function getCtx(root) {
    let ctx = stateMap.get(root)
    if (!ctx) {
      ctx = { timers: [], raf: 0, busy: false }
      stateMap.set(root, ctx)
    }
    return ctx
  }

  function clearTimers(ctx) {
    ctx.timers.forEach((id) => window.clearTimeout(id))
    ctx.timers = []
    if (ctx.raf) {
      window.cancelAnimationFrame(ctx.raf)
      ctx.raf = 0
    }
  }

  function later(ctx, ms, fn) {
    ctx.timers.push(window.setTimeout(fn, ms))
  }

  function setScan(root, pct) {
    root.style.setProperty('--er-scan', `${pct}%`)
  }

  function setEntryLabel(root, text) {
    const el = root.querySelector('[data-er-entry]')
    if (el) el.textContent = text
  }

  function revealField(root, name) {
    const el = root.querySelector(`[data-er-field="${name}"]`)
    if (el) el.classList.add('is-revealed')
  }

  function clearFields(root) {
    root.querySelectorAll('[data-er-field]').forEach((el) => {
      el.classList.remove('is-revealed')
    })
  }

  function setLive(root, title, summary) {
    const t = root.querySelector('[data-er-title]')
    const s = root.querySelector('[data-er-summary]')
    if (t) t.textContent = title
    if (s) s.textContent = summary
  }

  function setStatus(root, text) {
    const el = root.querySelector('[data-er-status]')
    if (el) el.textContent = text
  }

  function setRegisterEnabled(root, on) {
    const btn = root.querySelector('[data-er-register]')
    if (btn) btn.disabled = !on
  }

  function finishDone(root) {
    const ctx = getCtx(root)
    root.dataset.state = 'done'
    setScan(root, 100)
    setEntryLabel(root, 'ENTRY // 086')
    revealField(root, 'name')
    revealField(root, 'class')
    revealField(root, 'status')
    setLive(root, 'ENTRY // 086', DONE_STATUS)
    setStatus(root, DONE_STATUS)
    setRegisterEnabled(root, false)
    ctx.busy = false
  }

  function reset(root) {
    const ctx = getCtx(root)
    clearTimers(ctx)
    ctx.busy = false
    root.dataset.state = 'idle'
    setScan(root, 0)
    setEntryLabel(root, 'ENTRY // ???')
    clearFields(root)
    setLive(root, 'ENTRY // ???', IDLE_STATUS)
    setStatus(root, IDLE_STATUS)
    setRegisterEnabled(root, true)
  }

  function runIndexCycle(root, done) {
    const ctx = getCtx(root)
    let i = 0
    const tick = () => {
      setEntryLabel(root, `ENTRY // ${INDEX_VALUES[i]}`)
      i += 1
      if (i >= INDEX_VALUES.length) {
        done()
        return
      }
      later(ctx, INDEX_MS, tick)
    }
    tick()
  }

  function register(root) {
    const ctx = getCtx(root)
    if (ctx.busy || root.dataset.state === 'done') return
    ctx.busy = true
    clearTimers(ctx)
    setRegisterEnabled(root, false)

    if (prefersReducedMotion(root)) {
      finishDone(root)
      return
    }

    root.dataset.state = 'scan'
    setScan(root, 0)
    clearFields(root)
    setEntryLabel(root, 'ENTRY // ???')
    // Keep live region quiet during scan/index flicker
    setStatus(root, 'Analysing entry.')

    let nameDone = false
    let classDone = false
    const start = performance.now()

    const frame = (now) => {
      const t = Math.min(1, (now - start) / SCAN_MS)
      const pct = t * 100
      setScan(root, pct)

      if (!nameDone && t >= NAME_AT) {
        nameDone = true
        revealField(root, 'name')
      }
      if (!classDone && t >= CLASS_AT) {
        classDone = true
        revealField(root, 'class')
      }

      if (t < 1) {
        ctx.raf = window.requestAnimationFrame(frame)
        return
      }

      ctx.raf = 0
      root.dataset.state = 'index'
      runIndexCycle(root, () => {
        setEntryLabel(root, 'ENTRY // 086')
        root.dataset.state = 'lock'
        revealField(root, 'status')
        later(ctx, LOCK_MS, () => {
          finishDone(root)
        })
      })
    }

    ctx.raf = window.requestAnimationFrame(frame)
  }

  function bind(root) {
    if (root.dataset.erBound === '1') return
    root.dataset.erBound = '1'
    getCtx(root)

    root.querySelector('[data-er-register]')?.addEventListener('click', () => {
      register(root)
    })
    root.querySelector('[data-er-reset]')?.addEventListener('click', () => {
      reset(root)
    })
  }

  function initAll(scope) {
    ;(scope || document)
      .querySelectorAll('[data-entry-registration]')
      .forEach((el) => bind(el))
  }

  window.entryRegistration = {
    init: initAll,
    register,
    reset,
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initAll())
  } else {
    initAll()
  }
})()
