
function prefersRM(){const f=document.documentElement.getAttribute('data-force-reduced-motion')==='true';return f||window.matchMedia('(prefers-reduced-motion: reduce)').matches}

const IDLE=900; let timer=0
export function runControlsShow(){
  const s=document.querySelector('[data-stage]'); const c=document.querySelector('[data-chrome]');
  s?.classList.add('is-live'); if(c) c.setAttribute('aria-hidden','false');
  window.clearTimeout(timer);
  if(prefersRM()) return;
  timer=window.setTimeout(()=>{s?.classList.remove('is-live'); c?.setAttribute('aria-hidden','true')}, IDLE)
}
document.querySelector('[data-nudge]')?.addEventListener('click',()=>runControlsShow())
document.querySelector('[data-stage]')?.addEventListener('pointermove',()=>runControlsShow())
