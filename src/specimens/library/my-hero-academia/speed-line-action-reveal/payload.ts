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
    'Mount in relative overflow-hidden host.',
    'Freeze burst 580ms and settle 320ms.',
    'Wire runSpeedLineReveal / resetSpeedLineReveal / replaySpeedLineReveal.',
    'Lines must clip to stage; honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Activate triggers one burst reveal to TARGET end state',
    'Initial concealed and final revealed states are distinct',
    'No external resources; replay resets cleanly',
    'Reduced motion shows TARGET immediately',
    'Palette uses shared MHA study colours',
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
