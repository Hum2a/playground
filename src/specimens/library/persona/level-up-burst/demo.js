let busy=false;function rm(){return document.documentElement.getAttribute('data-force-reduced-motion')==='true'||matchMedia('(prefers-reduced-motion: reduce)').matches}
function live(t){const e=document.querySelector('[data-lub-live]');if(e)e.textContent=t}
function run(){if(busy)return;busy=true;const b=document.querySelector('[data-lub-run]');if(b)b.disabled=true;const lv=document.querySelector('[data-lub-lv]'),burst=document.querySelector('[data-lub-burst]');live('Leveling up.');function finish(){if(lv)lv.textContent='13';document.querySelector('[data-lub-hp]').textContent='348';document.querySelector('[data-lub-sp]').textContent='195';document.querySelector('[data-lub-str]').textContent='16';document.querySelectorAll('.lub__stats li').forEach(li=>li.classList.add('is-up'));live('Level 13. Stats increased.');busy=false}
if(rm()){finish();burst?.classList.add('is-active');return}burst?.classList.add('is-active');let n=12;const tick=setInterval(()=>{n++;if(lv)lv.textContent=String(n);if(n>=13){clearInterval(tick);finish()}},120)}
document.querySelector('[data-lub-run]')?.addEventListener('click',run)
addEventListener('message',e=>{if(e.data?.type==='restart')run()})
