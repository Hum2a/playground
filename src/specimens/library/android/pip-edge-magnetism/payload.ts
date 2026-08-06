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
    'Mount inside a relative overflow-hidden host (700px height).',
    'Import demo.css verbatim; freeze window 176×99, attract zone 56px, snap 180ms.',
    'Wire resetPipEdgeMagnetism.',
    'Four valid corner slots with 12px minimum inset.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Free drag feels unconstrained away from edges',
    'Attraction visible only inside 56px zone',
    'Window always finishes at a valid slot',
    'Velocity can bias chosen edge',
    'Window remains entirely accessible',
    'Reduced motion: no magnetic drag, instant snap',
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
