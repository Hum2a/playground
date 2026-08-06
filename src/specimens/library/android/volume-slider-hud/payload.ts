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
    'Mount inside relative overflow-clipped host.',
    'Import demo.css verbatim; freeze HUD dimensions and 2200ms dwell.',
    'Each level change resets timeout.',
    'Expand widens same container to 240px.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Timeout resets after every level change',
    'Level stays 0–100 in 10-point steps',
    'Expanded state uses same container',
    'Mute glyph at exactly 0',
    'HUD never shifts host layout',
    'Reduced motion: appears in place',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:420px;background:#12141a;display:grid;place-items:center;padding:0;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
