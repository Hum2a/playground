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
    'Eight rays at 45° increments; burst 500ms.',
    'Wire runQuirkActivationBurst / reset / replay.',
    'Honour reduced-motion triggers.',
  ],
  acceptance: [
    'Activate fires burst then ACTIVE end state',
    'STANDBY and ACTIVE visually distinct',
    'Replay resets cleanly',
    'Reduced motion shows ACTIVE immediately',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#101820;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
