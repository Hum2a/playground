function rm(){return document.documentElement.getAttribute('data-force-reduced-motion')==='true'||matchMedia('(prefers-reduced-motion: reduce)').matches}
function live(t){const e=document.querySelector('[data-sis-live]');if(e)e.textContent=t}
function reset(){document.querySelectorAll('[data-sis-chip]').forEach(c=>c.classList.remove('is-sent'));const s=document.querySelector('[data-sis-slots]');if(s)s.innerHTML='';const r=document.querySelector('[data-sis-reset]');if(r)r.hidden=true;live('Select skills to inherit.')}
function send(chip){if(chip.classList.contains('is-sent'))return;const skill=chip.dataset.skill||'Skill';const slots=document.querySelector('[data-sis-slots]');if(!slots)return;chip.classList.add('is-sent');const el=document.createElement('span');el.className='sis__slot';el.textContent=skill;if(rm())el.style.animation='none';slots.appendChild(el);document.querySelector('[data-sis-reset]').hidden=false;live(skill+' inherited.')}
document.querySelectorAll('[data-sis-chip]').forEach(c=>c.addEventListener('click',()=>send(c)))
document.querySelector('[data-sis-reset]')?.addEventListener('click',reset)
