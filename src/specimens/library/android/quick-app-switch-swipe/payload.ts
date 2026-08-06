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
    'Mount inside a relative overflow-clipped host.',
    'Import demo.css verbatim; freeze 32px bottom zone and 96px commit.',
    'Adjacent task visible before commitment; cancel restores current task.',
    'Support switching in both directions.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Gesture ownership is restricted to bottom zone',
    'Adjacent task is visible before commitment',
    'Cancel restores current task',
    'Commit supports both directions where a neighbour exists',
    'Internal task state is preserved',
    'Reduced motion: snap on release',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:460px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
