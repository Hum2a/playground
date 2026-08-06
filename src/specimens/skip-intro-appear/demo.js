
function prefersRM(){const f=document.documentElement.getAttribute('data-force-reduced-motion')==='true';return f||window.matchMedia('(prefers-reduced-motion: reduce)').matches}

const INTRO_MS=3000; const APPEAR_AT=400; let timers=[]
function clear(){for(const id of timers) window.clearTimeout(id); timers=[]}
export function runSkipIntroDemo(){
  clear(); const skip=document.querySelector('[data-skip]'); const t=document.querySelector('[data-t]');
  if(skip) skip.hidden=true; let start=performance.now();
  function tick(now){
    const elapsed=now-start; if(t) t.textContent=(elapsed/1000).toFixed(1);
    if(elapsed>=APPEAR_AT && elapsed<=INTRO_MS){ if(skip) skip.hidden=false }
    else if(elapsed>INTRO_MS){ if(skip) skip.hidden=true; return }
    timers.push(window.requestAnimationFrame(tick))
  }
  if(prefersRM()){ if(skip) skip.hidden=false; if(t) t.textContent='1.2'; return }
  timers.push(window.requestAnimationFrame(tick))
}
document.querySelector('[data-play]')?.addEventListener('click',()=>runSkipIntroDemo())
document.querySelector('[data-skip]')?.addEventListener('click',()=>{clear(); const s=document.querySelector('[data-skip]'); if(s) s.hidden=true})
