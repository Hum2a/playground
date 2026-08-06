(() => {
  const root = document.querySelector('[data-mc]')
  if (!root) return
  const live = root.querySelector('[data-mc-live]')
  const paths = root.querySelector('[data-mc-paths]')
  const fog = root.querySelector('[data-mc-fog]')
  const player = root.querySelector('[data-mc-player]')
  const exploreBtn = root.querySelector('[data-mc-explore]')
  const resetBtn = root.querySelector('[data-mc-reset]')
  const segments = [
    'M 24 24 L 24 80 L 80 80 L 80 136',
    'M 80 80 L 136 80 L 136 40',
    'M 80 80 L 136 80 L 136 136',
  ]
  const fogCells = []
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 5; c++) {
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
      rect.setAttribute('x', String(c * 40))
      rect.setAttribute('y', String(r * 40))
      rect.setAttribute('width', '40')
      rect.setAttribute('height', '40')
      rect.setAttribute('fill', '#E8E8E8')
      rect.setAttribute('opacity', '0.35')
      fog.appendChild(rect)
      fogCells.push(rect)
    }
  }
  const reduced = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    document.documentElement.dataset.forceReducedMotion === 'true'
  let running = false
  function announce(msg) { if (live) live.textContent = msg }
  function clearPaths() {
    while (paths.firstChild) paths.removeChild(paths.firstChild)
    fogCells.forEach((c) => c.setAttribute('opacity', '0.35'))
    player.setAttribute('cx', '24')
    player.setAttribute('cy', '24')
  }
  function drawAll() {
    segments.forEach((d) => {
      const p = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      p.setAttribute('d', d)
      paths.appendChild(p)
    })
    fogCells.forEach((c) => c.setAttribute('opacity', '0.08'))
    player.setAttribute('cx', '136')
    player.setAttribute('cy', '136')
    announce('Dungeon map — fully explored.')
  }
  async function explore() {
    if (running) return
    running = true
    exploreBtn.disabled = true
    clearPaths()
    announce('Exploring corridors…')
    if (reduced()) { drawAll(); running = false; exploreBtn.disabled = false; return }
    for (let i = 0; i < segments.length; i++) {
      const p = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      p.setAttribute('d', segments[i])
      p.style.strokeDasharray = '200'
      p.style.strokeDashoffset = '200'
      paths.appendChild(p)
      fogCells.slice(i * 3, i * 3 + 3).forEach((c) => c.setAttribute('opacity', '0.12'))
      await new Promise((r) => {
        p.style.transition = 'stroke-dashoffset 520ms ease-out'
        p.style.strokeDashoffset = '0'
        setTimeout(r, 540)
      })
      const nums = segments[i].match(/\d+/g).map(Number)
      player.setAttribute('cx', String(nums[nums.length - 2]))
      player.setAttribute('cy', String(nums[nums.length - 1]))
    }
    announce('Dungeon map — fully explored.')
    running = false
    exploreBtn.disabled = false
  }
  exploreBtn.addEventListener('click', explore)
  resetBtn.addEventListener('click', () => { clearPaths(); announce('Dungeon map — unexplored.') })
  clearPaths()
})()