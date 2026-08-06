const TARGETS={exp:420,yen:1250,total:1670};let busy=false,timers=[]
function rm(){return document.documentElement.getAttribute('data-force-reduced-motion')==='true'||matchMedia('(prefers-reduced-motion: reduce)').matches}
function live(t){const e=document.querySelector('[data-brt-live]');if(e)e.textContent=t}
function clear(){timers.forEach(id=>clearTimeout(id));timers=[]}
function count(el,target,dur){if(!el)return;const start=performance.now();function tick(now){const p=Math.min(1,(now-start)/dur);el.textContent=String(Math.round(target*p));if(p<1)requestAnimationFrame(tick)}requestAnimationFrame(tick)}
function run(){if(busy)return;busy=true;clear();const b=document.querySelector('[data-brt-run]');if(b)b.disabled=true;live('Tallying results.');const rows=document.querySelectorAll('.brt__row');rows.forEach((r,i)=>setTimeout(()=>r.classList.add('is-visible'),i*180));if(rm()){document.querySelector('[data-brt-exp]').textContent=String(TARGETS.exp);document.querySelector('[data-brt-yen]').textContent=String(TARGETS.yen);document.querySelector('[data-brt-total]').textContent=String(TARGETS.total);live('Tally complete.');busy=false;return}setTimeout(()=>count(document.querySelector('[data-brt-exp]'),TARGETS.exp,500),200);setTimeout(()=>count(document.querySelector('[data-brt-yen]'),TARGETS.yen,600),400);setTimeout(()=>{count(document.querySelector('[data-brt-total]'),TARGETS.total,400);live('Tally complete.');busy=false},700)}
document.querySelector('[data-brt-run]')?.addEventListener('click',run)
addEventListener('message',e=>{if(e.data?.type==='restart')run()})
