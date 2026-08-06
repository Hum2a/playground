const T=['TITLE A','TITLE B','TITLE C']
function setLive(t){document.querySelector('[data-fhs-live]').textContent=t}
export function settleFocusHalo(i){
  const r=document.querySelector('[data-fhs]'); if(!r)return
  r.setAttribute('data-index',String(i))
  setLive('Halo on '+T[i]+'.')
}
function bind(){
  document.querySelectorAll('[data-fhs-tile]').forEach((t,i)=>t.addEventListener('click',()=>settleFocusHalo(i)))
  window.addEventListener('message',e=>{if(e.data?.type==='restart')settleFocusHalo(1)})
}
bind(); settleFocusHalo(1)
