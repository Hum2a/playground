import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Wire cards to focusNeighbourCard(index).',
    'Keep frozen push distances via CSS custom properties.',
    'Import demo.css verbatim.',
    'Preserve RM override on .pnpo__card.',
  ],
  acceptance: [
    'Focused card expands to 112px width at scale 1.06.',
    'Neighbours yield by 20/24/36px push distances matching focus index.',
    'Changing focus restores previous neighbours and pushes the new ones.',
    'Reduced motion applies expand and offsets instantly with no transition.',
  ],
  scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
