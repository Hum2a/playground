const LABELS=['TITLE A','TITLE B','TITLE C']
function setLive(t){document.querySelector('[data-cbc-live]').textContent=t}
export function setContextFocus(i){
  const r=document.querySelector('[data-cbc]'); if(!r)return
  r.setAttribute('data-layer', i===0?'a':'b')
  document.querySelector('[data-cbc-label]').textContent=LABELS[i]
  document.querySelectorAll('[data-cbc-tile]').forEach((t,n)=>t.classList.toggle('is-focused',n===i))
  setLive('Context: '+LABELS[i]+'.')
}
function bind(){
  document.querySelectorAll('[data-cbc-tile]').forEach((t,i)=>t.addEventListener('click',()=>setContextFocus(i)))
  window.addEventListener('message',e=>{if(e.data?.type==='restart')setContextFocus(0)})
}
bind(); setContextFocus(0)
