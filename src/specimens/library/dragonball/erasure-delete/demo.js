const ERASE_MS=620,IDENTITY_HOLD_MS=60
let busy=false,timers=[]
function root(){return document.querySelector('[data-erasure-delete]')}
function reduced(){return document.documentElement.getAttribute('data-force-reduced-motion')==='true'||window.matchMedia('(prefers-reduced-motion: reduce)').matches}
function later(ms,fn){timers.push(setTimeout(fn,ms))}
function clear(){timers.forEach(clearTimeout);timers=[]}
function setButtons(el,erase,reset){el.querySelector('[data-ed-erase]').hidden=!erase;el.querySelector('[data-ed-erase]').disabled=!erase;el.querySelector('[data-ed-reset]').hidden=!reset}
function final(el){el.dataset.state='erased';el.querySelector('[data-ed-card]').hidden=true;el.querySelector('[data-ed-final]').hidden=false;el.querySelector('[data-ed-status]').textContent='Record 028 erased.';setButtons(el,false,true);busy=false}
function erase(){const el=root();if(!el||busy||el.dataset.state==='erased')return;busy=true;if(reduced())return final(el);setButtons(el,false,false);el.dataset.state='erasing';later(ERASE_MS+IDENTITY_HOLD_MS,()=>final(el))}
function reset(){const el=root();if(!el)return;clear();busy=false;el.dataset.state='active';el.querySelector('[data-ed-card]').hidden=false;el.querySelector('[data-ed-final]').hidden=true;el.querySelector('[data-ed-status]').textContent='Record 028 active.';setButtons(el,true,false)}
function init(){const el=root();if(!el||el.dataset.bound)return;el.dataset.bound='1';el.querySelector('[data-ed-erase]').addEventListener('click',erase);el.querySelector('[data-ed-reset]').addEventListener('click',reset)}
window.erasureDelete={erase,reset,init};document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init,{once:true}):init()
