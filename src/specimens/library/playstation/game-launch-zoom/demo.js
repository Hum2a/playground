let busy=false
function root(){return document.querySelector('[data-glz]')}
function setLive(t){document.querySelector('[data-glz-live]').textContent=t}
function setPhase(p){root()?.setAttribute('data-phase',p)}
export function resetGameLaunchZoom(){busy=false;setPhase('idle');setLive('Tile idle.')}
export function runGameLaunchZoom(){
  if(busy||root()?.getAttribute('data-phase')==='done')return Promise.resolve()
  busy=true; setPhase('idle'); void root()?.offsetWidth; setPhase('zoom'); setLive('Zooming.')
  return new Promise(resolve=>{setTimeout(()=>{setPhase('done');setLive('Launch ready.');busy=false;resolve()},700)})
}
function bind(){
  document.querySelector('[data-glz-run]')?.addEventListener('click',()=>void runGameLaunchZoom())
  document.querySelector('[data-glz-reset]')?.addEventListener('click',resetGameLaunchZoom)
  window.addEventListener('message',e=>{if(e.data?.type==='restart')resetGameLaunchZoom()})
}
bind(); resetGameLaunchZoom()
