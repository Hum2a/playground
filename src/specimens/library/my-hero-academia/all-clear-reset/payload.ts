import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'ALL CLEAR triggers runAllClearReset; host clips overflow.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'ALERT retracts then ALL CLEAR stamp before quiet ops panel rebuild',
    'Done state shows nominal operations copy',
    'Reduced motion shows ops panel immediately',
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
