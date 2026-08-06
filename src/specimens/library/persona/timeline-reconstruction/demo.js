function prefersReducedMotion(){const f=document.documentElement.getAttribute('data-force-reduced-motion')==='true';return f||window.matchMedia('(prefers-reduced-motion: reduce)').matches}
window.addEventListener('message',e=>{if(e.data?.type==='restart')replay()})
const root=document.querySelector('[data-tr]');const status=document.querySelector('[data-tr-status]')
function setState(s){root?.setAttribute('data-state',s);status.textContent=s==='sorted'?'Timeline reconstructed.':'Events scattered.'}
function sort(){setState('sorted')}
function reset(){setState('scattered')}
function replay(){reset();void root?.offsetWidth;sort()}
document.querySelector('[data-tr-sort]')?.addEventListener('click',sort)
document.querySelector('[data-tr-reset]')?.addEventListener('click',reset)