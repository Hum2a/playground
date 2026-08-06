const ALLOCATIONS=[['build',8,40],['test',7,35],['ship',3,15]]
const UNIT_MS=60
let timers=[],busy=false
function root(){return document.querySelector('[data-shared-resource]')}
function reduced(){return document.documentElement.getAttribute('data-force-reduced-motion')==='true'||window.matchMedia('(prefers-reduced-motion: reduce)').matches}
function later(ms,fn){timers.push(setTimeout(fn,ms))}
function units(el){const pool=el.querySelector('[data-srp-units]');pool.innerHTML='';for(let i=0;i<20;i++){const u=document.createElement('i');u.className='srp__unit';u.dataset.unit=i;pool.append(u)}}
function text(el,pool,build,test,ship,state='AVAILABLE'){el.querySelector('[data-srp-pool]').textContent=pool;el.querySelector('[data-srp-remaining]').textContent=pool;el.querySelector('[data-srp-build]').textContent=build;el.querySelector('[data-srp-test]').textContent=test;el.querySelector('[data-srp-ship]').textContent=ship;el.querySelector('[data-srp-state]').textContent=state;el.querySelector('[data-srp-status]').textContent=`Pool ${pool}. Build ${build}, Test ${test}, Ship ${ship}. ${state}.`}
function controls(el,go,reset){el.querySelector('[data-srp-allocate]').hidden=!go;el.querySelector('[data-srp-allocate]').disabled=!go;el.querySelector('[data-srp-reset]').hidden=!reset}
function final(el){text(el,10,40,35,15,'LOW');el.dataset.low='10';controls(el,false,true);busy=false}
function allocate(){const el=root();if(!el||busy)return;busy=true;el.dataset.active='1';controls(el,false,false);if(reduced()){const us=[...el.querySelectorAll('.srp__unit')];us.slice(0,8).forEach(x=>x.dataset.to='build');us.slice(8,15).forEach(x=>x.dataset.to='test');us.slice(15,18).forEach(x=>x.dataset.to='ship');return final(el)}const us=[...el.querySelectorAll('.srp__unit')];const start=[0,UNIT_MS*3,UNIT_MS*3+UNIT_MS*2];let cursor=0;ALLOCATIONS.forEach(([to,count,amount],group)=>{for(let i=0;i<count;i++){const unit=us[cursor++];later(start[group]+i*UNIT_MS,()=>unit.dataset.to=to)}const done=start[group]+(count-1)*UNIT_MS+240;later(done,()=>{if(group===0)text(el,60,40,0,0);if(group===1){text(el,25,40,35,0);el.dataset.low='25'}if(group===2)final(el)})})}
function reset(){const el=root();if(!el)return;timers.forEach(clearTimeout);timers=[];busy=false;delete el.dataset.active;delete el.dataset.low;units(el);text(el,100,0,0,0);controls(el,true,false)}
function init(){const el=root();if(!el||el.dataset.bound)return;el.dataset.bound='1';units(el);el.querySelector('[data-srp-allocate]').addEventListener('click',allocate);el.querySelector('[data-srp-reset]').addEventListener('click',reset)}
window.sharedResourcePool={allocate,reset,init};document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init,{once:true}):init()
