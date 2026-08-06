function prefersReducedMotion(){const f=document.documentElement.getAttribute('data-force-reduced-motion')==='true';return f||window.matchMedia('(prefers-reduced-motion: reduce)').matches}
window.addEventListener('message',e=>{if(e.data?.type==='restart')replay()})
const root=document.querySelector('[data-csc]');const status=document.querySelector('[data-csc-status]')
function setState(s){root?.setAttribute('data-state',s);status.textContent=s==='solved'?'Case solved.':'Clues active.'}
function solve(){setState('solved')}
function reset(){setState('clues')}
function replay(){reset();void root?.offsetWidth;solve()}
document.querySelector('[data-csc-solve]')?.addEventListener('click',solve)
document.querySelector('[data-csc-reset]')?.addEventListener('click',reset)