function prefersReducedMotion(){const f=document.documentElement.getAttribute('data-force-reduced-motion')==='true';return f||window.matchMedia('(prefers-reduced-motion: reduce)').matches}
window.addEventListener('message',e=>{if(e.data?.type==='restart')replay()})
const root=document.querySelector('[data-eca]');const status=document.querySelector('[data-eca-status]')
let step=0;function setStep(s){step=s;root?.setAttribute('data-step',String(s));status.textContent='Chain at step '+s+'.'}
function advance(){if(step<3)setStep(step+1)}
function reset(){setStep(0)}
function replay(){reset();void root?.offsetWidth;advance();setTimeout(()=>advance(),400);setTimeout(()=>advance(),800)}
document.querySelector('[data-eca-advance]')?.addEventListener('click',advance)
document.querySelector('[data-eca-reset]')?.addEventListener('click',reset)