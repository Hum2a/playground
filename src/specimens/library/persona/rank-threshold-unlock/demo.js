let busy=false;function rm(){return document.documentElement.getAttribute('data-force-reduced-motion')==='true'||matchMedia('(prefers-reduced-motion: reduce)').matches}
function live(t){const e=document.querySelector('[data-rtu-live]');if(e)e.textContent=t}
function run(){if(busy)return;busy=true;const b=document.querySelector('[data-rtu-run]'),f=document.querySelector('[data-rtu-fill]'),p=document.querySelector('[data-rtu-pct]'),u=document.querySelector('[data-rtu-unlock]');if(!f||!p||!u)return;if(b)b.disabled=true;live('Rank advancing.');if(rm()){f.style.width='100%';p.textContent='100%';u.hidden=false;u.classList.add('is-visible');live('Assist Follow-Up unlocked.');busy=false;return}f.style.width='100%';p.textContent='100%';setTimeout(()=>{u.hidden=false;u.classList.add('is-visible');live('Assist Follow-Up unlocked.');busy=false},620)}
document.querySelector('[data-rtu-run]')?.addEventListener('click',run)
addEventListener('message',e=>{if(e.data?.type==='restart')run()})
