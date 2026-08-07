import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Toggle data-phase between tile and details on the shared .ctdm__surface.',
    'Preserve morphMs 260, body delay 80ms, and start/end sizes.',
    'Import demo.css verbatim.',
    'Preserve RM overrides on .ctdm__surface and .ctdm__body.',
  ],
  acceptance: [
    'Toggle morphs the same surface from 100×120 to 280×168 over 260ms.',
    'Details body becomes visible after an 80ms delay within the morph.',
    'aria-expanded and data-phase stay in sync for tile/details.',
    'Reduced motion snaps size and body with no transition.',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#0B0F14;display:grid;place-items:center;padding:16px;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
