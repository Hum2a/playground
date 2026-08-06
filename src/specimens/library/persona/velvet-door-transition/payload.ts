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
    'Keep state B mounted behind the door from the start; do not late-swap content.',
    'Import demo.css verbatim; keep frozen palette, 52% seam, ±52% panel travel, and 900ms enter timing.',
    'Call runVelvetEnter / runVelvetReturn; busy-guard re-entrancy.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with an immediate context switch.',
  ],
  acceptance: [
    'Transition begins with a thin vertical seam that grows from centre to ~72% height',
    'Two angular panels separate from the seam; destination is visible behind them',
    'Destination scales ~0.9→1 with slow depth lines; no particles/starfield',
    'Threshold copy ENTERING // COMPENDIUM appears mid-open; motion stays calm',
    'RETURN closes panels from outside then contracts the seam; restores public context',
    'Reduced motion is immediate; no Velvet Room assets; exact geometry/timing documented',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#020711;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
