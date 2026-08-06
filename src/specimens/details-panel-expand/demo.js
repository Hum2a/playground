
function prefersRM(){const f=document.documentElement.getAttribute('data-force-reduced-motion')==='true';return f||window.matchMedia('(prefers-reduced-motion: reduce)').matches}

export function runDetailsOpen(){const p=document.querySelector('[data-panel]'); if(p) p.hidden=false}
export function runDetailsClose(){const p=document.querySelector('[data-panel]'); if(p) p.hidden=true}
document.querySelector('[data-open]')?.addEventListener('click',()=>runDetailsOpen())
document.querySelector('[data-close]')?.addEventListener('click',()=>runDetailsClose())
