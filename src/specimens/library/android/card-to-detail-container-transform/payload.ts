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
    'Mount inside a relative overflow-hidden host (~360×620).',
    'Import demo.css verbatim; freeze card 304×112, detail 336×548, radius 20→28px, duration 420ms.',
    'Wire resetCardToDetail / replayCardToDetail.',
    'Middle card is the morph source; Back reverses geometry.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Expanded surface visibly originates from the selected card',
    'Title never disappears during the transformation',
    'Closing returns to the exact source card',
    'Sibling cards remain static beneath the overlay layer',
    'Reopening after resize recomputes geometry correctly',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:620px;background:#14161c;display:grid;place-items:center;padding:0.5rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
