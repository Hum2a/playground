
function prefersRM(){const f=document.documentElement.getAttribute('data-force-reduced-motion')==='true';return f||window.matchMedia('(prefers-reduced-motion: reduce)').matches}

const PAGE=108; let page=0
function paint(){const t=document.querySelector('[data-track]'); if(t) t.style.transform='translateX('+(-page*PAGE*3)+'px)'}
export function runRailNext(){page=Math.min(1,page+1); paint()}
export function runRailPrev(){page=Math.max(0,page-1); paint()}
document.querySelector('[data-next]')?.addEventListener('click',()=>runRailNext())
document.querySelector('[data-prev]')?.addEventListener('click',()=>runRailPrev())
