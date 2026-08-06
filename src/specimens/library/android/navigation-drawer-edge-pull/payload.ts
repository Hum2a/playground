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
    'Mount inside a relative overflow-hidden host (700px preview height).',
    'Import demo.css verbatim; freeze drawer 304px, edge 24px, open 46%, velocity 0.5 px/ms.',
    'Wire resetNavigationDrawerEdgePull.',
    'Scrim click and Escape close drawer.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Closed drawer only acquired from first 24px edge zone',
    'Drawer position tracks pointer during drag',
    'Scrim opacity maps 0→0.32 with progress',
    'Release above 46% or velocity opens drawer',
    'Scrim click closes drawer',
    'Escape closes drawer and restores focus',
    'Five destinations with one moving selected pill',
    'Reduced motion: direct drag, instant snap on release',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:700px;background:#141218;display:grid;place-items:center;padding:0.5rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
