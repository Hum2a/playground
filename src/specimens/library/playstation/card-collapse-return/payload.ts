import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Toggle is-expanded on one .ccr__card; disable siblings while expanded.',
    'Collapse must restore exact 96×132 geometry (paired with card-to-details-morph timings language).',
    'Import demo.css verbatim.',
    'Preserve RM overrides so return snaps original bounds.',
  ],
  acceptance: [
    'Expand lifts one tile by 16px at scale 1.26 and shows RETURN; siblings disable.',
    'Second activate collapses to exact original 96×132 rail geometry.',
    'Collapse travel is 200ms with transform-origin bottom center.',
    'Reduced motion snaps expand and return to original bounds with no transition.',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:260px;background:#0B0F14;display:grid;place-items:center;padding:16px;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
