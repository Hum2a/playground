function prefersReducedMotion(){const f=document.documentElement.getAttribute('data-force-reduced-motion')==='true';return f||window.matchMedia('(prefers-reduced-motion: reduce)').matches}
window.addEventListener('message',e=>{if(e.data?.type==='restart')replay()})
const root=document.querySelector('[data-fsm]');const status=document.querySelector('[data-fsm-status]')
let timer;function setState(s){root?.setAttribute('data-state',s);status.textContent=s==='match'?'Fingerprint match confirmed.':s==='scanning'?'Scanning…':'Ready to scan.'}
function reset(){clearTimeout(timer);setState('idle')}
function scan(){reset();setState('scanning');timer=setTimeout(()=>setState('match'),prefersReducedMotion()?0:900)}
function replay(){reset();void root?.offsetWidth;scan()}
document.querySelector('[data-fsm-scan]')?.addEventListener('click',scan)
document.querySelector('[data-fsm-reset]')?.addEventListener('click',reset)