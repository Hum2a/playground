
function prefersRM(){const f=document.documentElement.getAttribute('data-force-reduced-motion')==='true';return f||window.matchMedia('(prefers-reduced-motion: reduce)').matches}

export function runPreviewExpand(){document.querySelector('[data-rail]')?.classList.add('is-open')}
export function runPreviewReturn(){document.querySelector('[data-rail]')?.classList.remove('is-open')}
document.querySelector('[data-expand]')?.addEventListener('click',()=>runPreviewExpand())
document.querySelector('[data-return]')?.addEventListener('click',()=>runPreviewReturn())
