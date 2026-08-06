const TITLES=['TITLE A','TITLE B','TITLE C']
function setLive(t){document.querySelector('[data-hgfs-live]').textContent=t}
export function focusGameTile(i){
  const r=document.querySelector('[data-hgfs]'); if(!r)return
  r.setAttribute('data-focus',String(i))
  document.querySelectorAll('[data-hgfs-tile]').forEach((t,n)=>t.classList.toggle('is-focused',n===i))
  setLive(TITLES[i]+' focused.')
}
function bind(){
  document.querySelectorAll('[data-hgfs-tile]').forEach((t,i)=>t.addEventListener('click',()=>focusGameTile(i)))
  window.addEventListener('message',e=>{if(e.data?.type==='restart')focusGameTile(1)})
}
bind(); focusGameTile(1)
