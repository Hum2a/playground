function prefersReducedMotion(){const f=document.documentElement.getAttribute('data-force-reduced-motion')==='true';return f||window.matchMedia('(prefers-reduced-motion: reduce)').matches}
window.addEventListener('message',e=>{if(e.data?.type==='restart')replay()})
const root=document.querySelector('[data-rr]');const status=document.querySelector('[data-rr-status]')
function setState(s){root?.setAttribute('data-state',s);status.textContent=s==='revealed'?'Content authorised.':'Content redacted.'}
function sweep(){setState('revealed')}
function reset(){setState('redacted')}
function replay(){reset();void root?.offsetWidth;sweep()}
document.querySelector('[data-rr-sweep]')?.addEventListener('click',sweep)
document.querySelector('[data-rr-reset]')?.addEventListener('click',reset)