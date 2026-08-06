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
    'Mount inside a relative overflow-clipped host (~360×280).',
    'Import demo.css verbatim; freeze compact 330×76, expanded 330×184, height 280ms.',
    'Click compact card expands; CLOSE collapses.',
    'Detail rows reveal after height passes 120px; buttons stagger 40ms.',
    'Honour both reduced-motion triggers with instant state swap.',
  ],
  acceptance: [
    'Width remains constant at 330px',
    'Height expands 76→184px over 280ms',
    'Title REVIEW REQUEST identity persists',
    'Actions OPEN and APPROVE only appear in expanded state',
    'CLOSE collapses to exact compact height',
    'Reduced motion: immediate height/state switch',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#101218;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
