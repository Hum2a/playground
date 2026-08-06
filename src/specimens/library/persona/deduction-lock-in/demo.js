function prefersReducedMotion(){const f=document.documentElement.getAttribute('data-force-reduced-motion')==='true';return f||window.matchMedia('(prefers-reduced-motion: reduce)').matches}
window.addEventListener('message',e=>{if(e.data?.type==='restart')replay()})
const root=document.querySelector('[data-dli]');const status=document.querySelector('[data-dli-status]')
function setState(s){root?.setAttribute('data-state',s);status.textContent=s==='locked'?'Deduction locked in.':'Observations pending.'}
function lock(){setState('locked')}
function reset(){setState('idle')}
function replay(){reset();void root?.offsetWidth;lock()}
document.querySelector('[data-dli-lock]')?.addEventListener('click',lock)
document.querySelector('[data-dli-reset]')?.addEventListener('click',reset)