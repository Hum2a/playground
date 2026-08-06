const DOCK_MS=280,HOLD_MS=140,RESONANCE_MS=220
let timers=[],busy=false
function root(){return document.querySelector('[data-prerequisite-collection]')}
function reduce(){return document.documentElement.getAttribute('data-force-reduced-motion')==='true'||window.matchMedia('(prefers-reduced-motion: reduce)').matches}
function later(ms,fn){timers.push(setTimeout(fn,ms))}
function clear(){timers.forEach(clearTimeout);timers=[]}
function text(el,count,status,sr){el.querySelector('[data-spc-count]').textContent=count;el.querySelector('[data-spc-status]').textContent=status;el.querySelector('[data-spc-sr]').textContent=sr}
function controls(el,receive,reset,ready){const r=el.querySelector('[data-spc-receive]'),x=el.querySelector('[data-spc-reset]'),p=el.querySelector('[data-spc-publish]'),l=el.querySelector('[data-spc-lock]');r.disabled=!receive;r.hidden=!receive;x.hidden=!reset;p.disabled=!ready;l.textContent=ready?'READY':'LOCKED'}
function final(el){el.dataset.state='ready';text(el,'7 / 7','COMPLETE','7 of 7 release requirements complete. Publish ready.');controls(el,false,true,true);busy=false}
function receive(){const el=root();if(!el||busy||el.dataset.state==='ready')return;busy=true;if(reduce())return final(el);controls(el,false,false,false);el.dataset.state='dock';later(DOCK_MS,()=>{el.dataset.state='complete';text(el,'7 / 7','INCOMPLETE','7 of 7 release requirements complete. Connection structure forming.');later(HOLD_MS,()=>{el.dataset.state='resonance';later(RESONANCE_MS,()=>final(el))})})}
function reset(){const el=root();if(!el)return;clear();busy=false;el.dataset.state='idle';text(el,'6 / 7','INCOMPLETE','6 of 7 release requirements complete. Approval missing. Publish locked.');controls(el,true,false,false)}
function init(){const el=root();if(!el||el.dataset.bound)return;el.dataset.bound='1';el.querySelector('[data-spc-receive]').addEventListener('click',receive);el.querySelector('[data-spc-reset]').addEventListener('click',reset)}
window.sevenPartPrerequisiteCollection={receive,reset,init};document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init,{once:true}):init()
