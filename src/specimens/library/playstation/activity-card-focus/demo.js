const PCTS = ['12%','48%','76%']
function setLive(t){document.querySelector('[data-acf-live]').textContent=t}
export function focusActivityCard(i){
  document.querySelectorAll('[data-acf-card]').forEach((c,n)=>{
    const on=n===i; c.classList.toggle('is-focused',on); c.setAttribute('aria-pressed',on?'true':'false')
    if(on) c.style.setProperty('--pct',PCTS[i])
  })
  setLive('Objective '+String.fromCharCode(65+i)+' focused.')
}
function bind(){
  document.querySelectorAll('[data-acf-card]').forEach((c,i)=>c.addEventListener('click',()=>focusActivityCard(i)))
  window.addEventListener('message',e=>{if(e.data?.type==='restart')focusActivityCard(1)})
}
bind(); focusActivityCard(1)
