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
    'Import demo.css verbatim; freeze bracket/node timings.',
    'Same nodes become completion geometry — no unrelated icon fade-in.',
    'CONTINUE disabled until morph completes.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Same nodes become completion geometry',
    'No unrelated success icon fade-in',
    'CONTINUE locked before completion',
    'Final state static',
    'Reduced motion: instant verified geometry',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
