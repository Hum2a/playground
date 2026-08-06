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
    'Mount inside a relative overflow-hidden frame.',
    'Keep the entity layer under the card from the start; do not late-swap or fade it in.',
    'Import demo.css verbatim; preserve 170×230 card, four crack lines, five clip regions, and ~820ms timing.',
    'Call runCardBreakSummon / runCardBreakReset; busy-guard re-entrancy.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with an immediate result state.',
  ],
  acceptance: [
    'Generic sealed card (no tarot artwork); exactly five major pieces from four break lines',
    'Shake then cracks with blue leak; cracks precede separation at ~300ms',
    'Entity exists underneath and scales .9→1.04→1 without fade',
    'Pieces leave the host; no particle explosion; final state static',
    'Reduced motion shows the result immediately',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#020b15;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
