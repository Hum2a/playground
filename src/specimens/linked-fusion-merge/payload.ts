import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~440×360+).',
    'Import demo.css verbatim; keep 220px gap, 100×120 entities, link timings, and C at 126×138.',
    'Wire LINK via runLinkedFusion; RESET / harness restart via resetLinkedFusion.',
    'Keep the stage aria-hidden; announce merge via the polite status region.',
    'This is relationship-driven merge — do not restyle it into mirrored sync choreography.',
  ],
  acceptance: [
    'A and B begin unlinked with one dormant 10×10 node each',
    'Lines meet at centre; diamond forms before tension/convergence',
    'Short tension (±4px then 2px out); relationship stays attached while converging',
    'Final C inherits horizontal (A) and diagonal (B) structure with A+B provenance',
    'Static final LINKED MERGE; reduced motion shows C immediately',
    'No characters, earrings, or franchise symbols',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#0c1016;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
