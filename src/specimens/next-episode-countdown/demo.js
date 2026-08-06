
function prefersRM(){const f=document.documentElement.getAttribute('data-force-reduced-motion')==='true';return f||window.matchMedia('(prefers-reduced-motion: reduce)').matches}

let timers=[]; let n=5
function clear(){for(const id of timers) window.clearTimeout(id); timers=[]}
export function runNextCountdown(){
  clear(); n=5; const box=document.querySelector('[data-count]'); const num=document.querySelector('[data-n]'); const ep=document.querySelector('[data-ep]');
  if(box) box.hidden=false; if(num) num.textContent='5';
  if(prefersRM()){ if(ep) ep.textContent='S1 E4 · Deep Current'; if(box) box.hidden=true; return }
  function step(){
    n-=1; if(num) num.textContent=String(n);
    if(n<=0){ if(ep) ep.textContent='S1 E4 · Deep Current'; if(box) box.hidden=true; return }
    timers.push(window.setTimeout(step,1000))
  }
  timers.push(window.setTimeout(step,1000))
}
export function runNextCancel(){clear(); const box=document.querySelector('[data-count]'); if(box) box.hidden=true}
document.querySelector('[data-start]')?.addEventListener('click',()=>runNextCountdown())
document.querySelector('[data-cancel]')?.addEventListener('click',()=>runNextCancel())
