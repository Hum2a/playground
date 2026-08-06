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
    'Mount inside a relative overflow-hidden host.',
    'Import demo.css verbatim; keep connector draw and card travel timings.',
    'Wire ADVANCE via bracketWinnerAdvance.run(root).',
    'Winner must travel along visible connector geometry.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Connector path draws from round one to round two',
    'ALPHA card travels along connector into next slot',
    'Round-two slot shows ALPHA with accent border',
    'Replay resets to idle bracket',
    'Clipped to host; sandbox allow-scripts',
    'Reduced motion shows advanced slot immediately',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#101820;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
