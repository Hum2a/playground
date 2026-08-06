const LEVELS=[{load:20,status:'NOMINAL',ms:0},{load:45,status:'ELEVATED',ms:300},{load:70,status:'HIGH',ms:300},{load:95,status:'CRITICAL',ms:360}]
let timers=[],busy=false
function root(){return document.querySelector('[data-state-intensity]')}
function reduced(){return document.documentElement.getAttribute('data-force-reduced-motion')==='true'||window.matchMedia('(prefers-reduced-motion: reduce)').matches}
function later(ms,fn){timers.push(setTimeout(fn,ms))}
function set(el,n){const x=LEVELS[n];el.dataset.level=String(n+1);el.querySelector('[data-sif-load]').textContent=`${x.load}%`;el.querySelector('[data-sif-status]').textContent=x.status;el.querySelector('[data-sif-sr]').textContent=`ENGINE 04 load ${x.load} percent. ${x.status}.`}
function controls(el,increase,reset){el.querySelector('[data-sif-increase]').hidden=!increase;el.querySelector('[data-sif-increase]').disabled=!increase;el.querySelector('[data-sif-reset]').hidden=!reset}
function increase(){const el=root();if(!el||busy)return;busy=true;controls(el,false,false);if(reduced()){set(el,3);controls(el,false,true);busy=false;return}let at=0;[1,2,3].forEach(n=>{at+=LEVELS[n].ms;later(at,()=>set(el,n));at+=220});later(at,()=>{busy=false;controls(el,false,true)})}
function reset(){const el=root();if(!el)return;timers.forEach(clearTimeout);timers=[];busy=false;set(el,0);controls(el,true,false)}
function init(){const el=root();if(!el||el.dataset.bound)return;el.dataset.bound='1';el.querySelector('[data-sif-increase]').addEventListener('click',increase);el.querySelector('[data-sif-reset]').addEventListener('click',reset)}
window.stateIntensityField={increase,reset,init};document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init,{once:true}):init()
