let busy=false; let timers=[]
function clear(){timers.forEach(id=>clearTimeout(id));timers=[]}
function later(ms,fn){timers.push(setTimeout(fn,ms))}
function root(){return document.querySelector('[data-sbg]')}
function setLive(t){document.querySelector('[data-sbg-live]').textContent=t}
function setPhase(p){root()?.setAttribute('data-phase',p)}
export function resetSystemBootGlow(){clear();busy=false;setPhase('dark');setLive('System dark.')}
export function runSystemBootGlow(){
  if(busy)return Promise.resolve(); busy=true; clear(); setPhase('dark'); void root()?.offsetWidth
  setPhase('glow'); setLive('Glow building.')
  return new Promise(resolve=>{
    later(900,()=>{setPhase('ready');setLive('System ready.');busy=false;resolve()})
  })
}
function bind(){
  document.querySelector('[data-sbg-run]')?.addEventListener('click',()=>void runSystemBootGlow())
  window.addEventListener('message',e=>{if(e.data?.type==='restart')resetSystemBootGlow()})
}
bind(); resetSystemBootGlow()
