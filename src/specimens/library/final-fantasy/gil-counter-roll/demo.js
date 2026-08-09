(() => {
  const root = document.querySelector('[data-credits]')
  if (!root) return
  const track = root.querySelector('[data-track]')
  const replay = root.querySelector('[data-replay]')
  const values = ['0000','0425','0910','1330','1765','2190','2610','3035','3460','3880','4305','4730','5150','5575','6000','6425','6850','7275','7700','8125','8500']
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || Boolean(document.querySelector('[data-force-reduced-motion="true"]'))
  const run = () => {
    root.className = 'jrpg-credits'
    track.textContent = reduced ? '8500' : `${values.join('\n')}\n8500`
    root.style.setProperty('--lines', reduced ? 0 : values.length - 1)
    if (!reduced) { requestAnimationFrame(() => { root.classList.add('is-rolling'); setTimeout(() => { root.classList.remove('is-rolling'); root.classList.add('is-settled') }, 720) }) }
  }
  replay.addEventListener('click', run)
  run()
})()
