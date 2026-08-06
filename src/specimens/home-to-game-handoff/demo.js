let busy=false; let timers=[]
function clear(){timers.forEach(id=>clearTimeout(id));timers=[]}
function later(ms,fn){timers.push(setTimeout(fn,ms))}
function root(){return document.querySelector('[data-htgh]')}
function setLive(t){document.querySelector('[data-htgh-live]').textContent=t}
function setPhase(p){root()?.setAttribute('data-phase',p)}
export function resetHomeToGameHandoff(){clear();busy=false;setPhase('idle');setLive('Home ready.')}
export function runHomeToGameHandoff(){
  if(busy||root()?.getAttribute('data-phase')==='launch')return Promise.resolve()
  busy=true; clear(); setPhase('idle'); void root()?.offsetWidth
  setPhase('expand'); setLive('Expanding title.')
  return new Promise(resolve=>{
    later(520,()=>{setPhase('launch');setLive('Launching.');busy=false;resolve()})
  })
}
function bind(){
  document.querySelector('[data-htgh-run]')?.addEventListener('click',()=>void runHomeToGameHandoff())
  document.querySelector('[data-htgh-reset]')?.addEventListener('click',resetHomeToGameHandoff)
  window.addEventListener('message',e=>{if(e.data?.type==='restart')resetHomeToGameHandoff()})
}
bind(); resetHomeToGameHandoff()
