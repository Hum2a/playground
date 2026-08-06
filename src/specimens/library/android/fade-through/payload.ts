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
    'Mount inside a relative overflow-hidden host (~340×420).',
    'Import demo.css verbatim; freeze duration 300ms, phase split 105ms, scale 0.96.',
    'Wire resetFadeThrough / replayFadeThrough.',
    'Outer geometry must remain stationary.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Outer geometry does not move',
    'Outgoing state relinquishes visibility before incoming state establishes itself',
    'Both directions use identical phase boundaries',
    'Rapid toggling cannot leave two visible states',
    'Reduced-motion state remains immediately understandable',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:420px;background:#14161c;display:grid;place-items:center;padding:0.5rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
