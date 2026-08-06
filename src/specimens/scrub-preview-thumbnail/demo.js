
function prefersRM(){const f=document.documentElement.getAttribute('data-force-reduced-motion')==='true';return f||window.matchMedia('(prefers-reduced-motion: reduce)').matches}

function sync(){
  const r=document.querySelector('[data-range]'); const th=document.querySelector('[data-thumb]'); const tm=document.querySelector('[data-time]');
  if(!r||!th||!tm) return;
  const v=Number(r.value); const pct=v/100; const w=r.clientWidth||300;
  th.hidden=false; th.style.left=(12+pct*w)+'px';
  const sec=Math.round(pct*3600); tm.textContent=String(Math.floor(sec/60)).padStart(2,'0')+':'+String(sec%60).padStart(2,'0');
}
export function runScrubTo(v=50){const r=document.querySelector('[data-range]'); if(r){r.value=String(v); sync()}}
const range=document.querySelector('[data-range]');
range?.addEventListener('input',sync); range?.addEventListener('pointerdown',sync);
