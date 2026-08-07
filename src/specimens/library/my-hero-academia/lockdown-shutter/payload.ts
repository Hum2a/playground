import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Panel must use overflow:hidden; wire LOCKDOWN to runLockdownShutter.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Five riveted shutters cascade closed over operational content',
    'LOCKDOWN label stamps after content fully covered',
    'Reduced motion snaps shutters closed with no slide',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#101820;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
