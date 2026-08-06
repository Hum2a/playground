const T = [120,220,130,110,100,140]
let busy=false,done=false,timers=[]
const root=()=>document.querySelector('[data-capsule-collapse]')
const reduced=()=>document.documentElement.getAttribute('data-force-reduced-motion')==='true'||matchMedia('(prefers-reduced-motion: reduce)').matches
const later=(n,f)=>timers.push(setTimeout(f,n))
function final(el){el.className='ccp ccp--stored';el.dataset.state='stored';el.querySelector('[data-ccp-message]').textContent='Service API-07 stored.';el.querySelector('[data-ccp-pack]').disabled=true;el.querySelector('[data-ccp-status]').textContent='Service API-07 stored.';busy=false;done=true}
export function runCapsuleCollapse(){const el=root();if(!el||busy||done)return Promise.resolve();busy=true;el.querySelector('[data-ccp-pack]').disabled=true;if(reduced()){final(el);return Promise.resolve()}let n=0;return new Promise(resolve=>{['ccp--prepare','ccp--fold','ccp--stage1','ccp--stage2','ccp--encode'].forEach((c,i)=>{later(n,()=>el.classList.add(c));n+=T[i]});later(n,()=>{final(el);resolve()})})}
export function resetCapsuleCollapse(){const el=root();if(!el||busy)return Promise.resolve();timers.forEach(clearTimeout);timers=[];done=false;el.className='ccp';el.dataset.state='idle';el.querySelector('[data-ccp-message]').textContent='Service API-07 ready to pack.';el.querySelector('[data-ccp-pack]').disabled=false;el.querySelector('[data-ccp-status]').textContent='';return Promise.resolve()}
export async function replayCapsuleCollapse(){if(!busy)await resetCapsuleCollapse()}
const el=root();if(el){el.querySelector('[data-ccp-pack]').addEventListener('click',()=>void runCapsuleCollapse());addEventListener('message',e=>{if(e.data?.type==='restart')void replayCapsuleCollapse()})}
