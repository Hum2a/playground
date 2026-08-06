const g=document.querySelector('[data-grid]');export function runGridReflow(){g.classList.toggle('is-reflow')};document.querySelector('[data-filter]')?.addEventListener('click',()=>runGridReflow())
