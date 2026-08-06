let busy=false;function rm(){return document.documentElement.getAttribute('data-force-reduced-motion')==='true'||matchMedia('(prefers-reduced-motion: reduce)').matches}
function live(t){const e=document.querySelector('[data-acd-live]');if(e)e.textContent=t}
function draw(){if(busy)return;busy=true;const c=document.querySelector('[data-acd-card]'),b=document.querySelector('[data-acd-draw]');if(!c)return;if(b)b.disabled=true;c.classList.remove('is-rise','is-flip');live('Drawing card.');if(rm()){c.classList.add('is-rise','is-flip');live('Chariot revealed.');busy=false;return}requestAnimationFrame(()=>{c.classList.add('is-rise');setTimeout(()=>{c.classList.add('is-flip');live('Chariot revealed.');busy=false},720)})}
document.querySelector('[data-acd-draw]')?.addEventListener('click',draw)
addEventListener('message',e=>{if(e.data?.type==='restart')draw()})
