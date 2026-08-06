import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inline; keep the 2×2 × 150×42px angular slots and 80×30px SYNC token as the portable contract.',
    'Call runMoveLearned from LEARN; complete the empty outline only after token arrival.',
    'Exactly four corner markers during approach; no permanent celebratory highlight after lock.',
    'Expose capabilities as list text; announce Sync learned once via the status region.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an immediate final state.',
  ],
  acceptance: [
    'Exactly four capability slots; one begins visibly empty',
    'SYNC exists outside the grid, then physically enters the empty slot',
    'Empty outline completes only after arrival; four corner markers during installation',
    'Final SYNC slot matches existing capabilities; no permanent celebration',
    'Reduced motion immediately shows all four capabilities including SYNC',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#e2dfd7;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
