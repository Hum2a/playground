
function prefersRM(){const f=document.documentElement.getAttribute('data-force-reduced-motion')==='true';return f||window.matchMedia('(prefers-reduced-motion: reduce)').matches}

export function runNeighbourPush(){document.querySelector('[data-rail]')?.classList.add('is-push')}
export function runNeighbourReset(){document.querySelector('[data-rail]')?.classList.remove('is-push')}
document.querySelector('[data-select]')?.addEventListener('click',()=>runNeighbourPush())
