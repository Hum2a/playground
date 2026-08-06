export function runErrorClear(){document.querySelector('[data-err]').classList.remove('is-on')};document.querySelector('[data-retry]')?.addEventListener('click',()=>runErrorClear())
