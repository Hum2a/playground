let busy=false
function root(){return document.querySelector('[data-rah]')}
function setLive(t){document.querySelector('[data-rah-live]').textContent=t}
function setPhase(p){root()?.setAttribute('data-phase',p)}
export function resetResumeActivityHandoff(){busy=false;setPhase('card');setLive('Activity card idle.')}
export function runResumeActivityHandoff(){
  if(busy||root()?.getAttribute('data-phase')==='done')return Promise.resolve()
  busy=true; setPhase('card'); void root()?.offsetWidth; setPhase('handoff'); setLive('Resuming.')
  return new Promise(resolve=>{setTimeout(()=>{setPhase('done');setLive('Activity resumed.');busy=false;resolve()},650)})
}
function bind(){
  document.querySelector('[data-rah-run]')?.addEventListener('click',()=>void runResumeActivityHandoff())
  document.querySelector('[data-rah-reset]')?.addEventListener('click',resetResumeActivityHandoff)
  window.addEventListener('message',e=>{if(e.data?.type==='restart')resetResumeActivityHandoff()})
}
bind(); resetResumeActivityHandoff()
