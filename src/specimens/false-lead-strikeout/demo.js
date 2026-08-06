function prefersReducedMotion(){const f=document.documentElement.getAttribute('data-force-reduced-motion')==='true';return f||window.matchMedia('(prefers-reduced-motion: reduce)').matches}
window.addEventListener('message',e=>{if(e.data?.type==='restart')replay()})
const root=document.querySelector('[data-fls]');const status=document.querySelector('[data-fls-status]')
function setState(s){root?.setAttribute('data-state',s);status.textContent=s==='struck'?'False lead struck out.':'Hypothesis active.'}
function strike(){setState('struck')}
function reset(){setState('active')}
function replay(){reset();void root?.offsetWidth;strike()}
document.querySelector('[data-fls-strike]')?.addEventListener('click',strike)
document.querySelector('[data-fls-reset]')?.addEventListener('click',reset)