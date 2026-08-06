import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inline on a dark host; keep three cards in one rail.',
    'Import demo.css verbatim; preserve 1.18 expand scale and neighbour translate distances.',
    'Hover and focus must share the same expand behaviour; collapse on leave/blur.',
    'Honour both reduced-motion triggers (instant geometry, no timed easing).',
  ],
  acceptance: [
    'Exactly three cards; focused card scales to 1.18',
    'Neighbours translate outward rather than overlapping',
    'Keyboard focus expands the same as hover',
    'Collapse returns cards to baseline slots',
    'Reduced motion skips timed transitions',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#0c0c0f;display:grid;place-items:center;padding:16px;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
