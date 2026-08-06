function prefersReducedMotion(){const f=document.documentElement.getAttribute('data-force-reduced-motion')==='true';return f||window.matchMedia('(prefers-reduced-motion: reduce)').matches}
window.addEventListener('message',e=>{if(e.data?.type==='restart')replay()})
const root=document.querySelector('[data-cdr]');const status=document.querySelector('[data-cdr-status]')
function setState(s){root?.setAttribute('data-state',s);status.textContent=s==='revealed'?'Case file verified.':'Case file locked.'}
function verify(){setState('revealed')}
function reset(){setState('locked')}
function replay(){reset();void root?.offsetWidth;verify()}
document.querySelector('[data-cdr-verify]')?.addEventListener('click',verify)
document.querySelector('[data-cdr-reset]')?.addEventListener('click',reset)