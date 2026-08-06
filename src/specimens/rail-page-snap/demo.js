
function prefersRM(){const f=document.documentElement.getAttribute('data-force-reduced-motion')==='true';return f||window.matchMedia('(prefers-reduced-motion: reduce)').matches}

const STEP=324; let page=0
function paint(){
  const t=document.querySelector('[data-track]');
  const o=-page*STEP;
  if(t) t.style.transform='translateX('+o+'px)';
  const p=document.querySelector('[data-page]'); if(p) p.textContent=String(page+1);
  const d=document.querySelector('[data-offset]'); if(d) d.textContent=String(Math.abs(o));
}
export function runRailSnap(){page=page?0:1; paint()}
document.querySelector('[data-snap]')?.addEventListener('click',()=>runRailSnap())
