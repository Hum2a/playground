import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Build 4×3 tiles in JS; track row/col focus index.',
    'Import demo.css verbatim — no mega-kit shape selectors.',
    'Preserve RM override on .lgf__tile.',
  ],
  acceptance: [
    'Arrow controls move focus within a 4×3 dense library grid.',
    'Focused tile scales to 1.06 with a blue ring within 180ms travel.',
    'Status reports the current row and column.',
    'Reduced motion snaps focus with no tile transition.',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#0B0F14;padding:12px;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
