(() => {
  const root=document.querySelector('[data-xp-fill]');if(!root)return
  const bar=root.querySelector('[data-bar]'),level=root.querySelector('[data-level]'),value=root.querySelector('[data-value]')
  const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches||Boolean(document.querySelector('[data-force-reduced-motion="true"]'))
  const run=()=>{bar.style.transition='none';bar.style.width='82%';level.textContent='4';value.textContent='82 / 100 XP';root.classList.remove('is-burst');if(reduced){bar.style.width='17%';level.textContent='5';value.textContent='17 / 100 XP';return}requestAnimationFrame(()=>{bar.style.transition='width 390ms steps(6,end)';bar.style.width='100%';setTimeout(()=>{level.textContent='5';bar.style.transition='none';bar.style.width='0%';root.classList.add('is-burst');setTimeout(()=>{bar.style.transition='width 390ms steps(6,end)';bar.style.width='17%';value.textContent='17 / 100 XP'},120)},390)})}
  root.querySelector('[data-replay]').addEventListener('click',run);run()
})()
