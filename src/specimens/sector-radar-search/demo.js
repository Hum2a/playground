/** Fixed two-pass sector search: B, D, C, A are first-pass sweep order. */
const DISCOVERIES = [['B', 100], ['D', 300], ['C', 550], ['A', 850]]
let busy = false
let done = false
let timers = []
function rootEl() { return document.querySelector('[data-sector-radar]') }
function reduced() { return document.documentElement.getAttribute('data-force-reduced-motion') === 'true' || window.matchMedia('(prefers-reduced-motion: reduce)').matches }
function later(ms, fn) { const id = window.setTimeout(fn, ms); timers.push(id) }
function text(root, count, result, meta) {
  root.querySelector('[data-srs-count]').textContent = `SIGNALS // ${count}`
  root.querySelector('[data-srs-result]').textContent = result
  root.querySelector('[data-srs-meta]').textContent = meta
}
function status(root, value) { const el=root.querySelector('[data-srs-status]'); el.textContent=''; void el.offsetWidth; el.textContent=value }
function finish(root) {
  root.classList.remove('srs--sweep-1','srs--sweep-2'); root.classList.add('srs--locked'); root.dataset.state='locked'
  text(root,4,'TARGET LOCKED','TARGET // NODE D   DISTANCE // 2.4')
  root.querySelector('[data-srs-search]').disabled=true; busy=false; done=true
  status(root,'Target locked. Node D. Distance 2.4.')
}
export function runSectorRadarSearch() {
  const root=rootEl(); if(!root||busy||done)return Promise.resolve(); busy=true
  root.querySelector('[data-srs-search]').disabled=true
  if(reduced()){ root.querySelectorAll('.srs__candidate').forEach(x=>x.classList.add('is-found')); finish(root); return Promise.resolve() }
  root.classList.add('srs--sweep-1'); text(root,0,'SEARCHING','Candidate comparison in progress.')
  return new Promise(resolve=>{
    DISCOVERIES.forEach(([id,time], index)=>later(time,()=>{root.querySelector(`[data-id="${id}"]`).classList.add('is-found');text(root,index+1,'SEARCHING','Candidate comparison in progress.')}))
    later(1200,()=>{root.classList.remove('srs--sweep-1');root.classList.add('srs--sweep-2')})
    later(1390,()=>root.querySelector('[data-id="B"]').classList.add('is-tick'))
    later(1640,()=>root.querySelector('[data-id="C"]').classList.add('is-tick'))
    later(1880,()=>root.querySelector('[data-id="A"]').classList.add('is-tick'))
    later(2040,()=>{finish(root);resolve()})
  })
}
export function resetSectorRadarSearch() {
 const root=rootEl();if(!root||busy)return Promise.resolve();timers.forEach(window.clearTimeout);timers=[];done=false;root.className='srs';root.dataset.state='idle';root.querySelectorAll('.srs__candidate').forEach(x=>x.classList.remove('is-found','is-tick'));text(root,0,'SEARCHING','Target pending. Distance pending.');root.querySelector('[data-srs-search]').disabled=false;root.querySelector('[data-srs-status]').textContent='';return Promise.resolve()
}
export async function replaySectorRadarSearch(){if(!busy)await resetSectorRadarSearch()}
function bind(){const root=rootEl();if(!root)return;root.querySelector('[data-srs-search]').addEventListener('click',()=>void runSectorRadarSearch());window.addEventListener('message',e=>{if(e.data&&e.data.type==='restart')void replaySectorRadarSearch()})}bind()
