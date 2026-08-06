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
    'Mount inside a relative overflow-clipped host; foreground 360×330, rail 92px.',
    'Import demo.css verbatim; freeze swap 480ms, scale 0.72, translate ±190px, z at 52%.',
    'Wire resetStageManagerStackShift; SWAP toggles BUILD ↔ RESEARCH.',
    'Both groups remain visible during swap; one stage marker transfers.',
    'Honour both reduced-motion triggers with instant swap.',
  ],
  acceptance: [
    'Two distinct groups: BUILD (2 windows) and RESEARCH (3 windows)',
    'BUILD begins foreground; RESEARCH begins staged in rail',
    'Both remain visible during 480ms swap',
    'Z-order changes once at 52% progress',
    'Final RESEARCH workspace contains three windows',
    'BUILD remains available as staged two-window stack in rail',
    'Reduced motion: instant layout swap',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#0e1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
