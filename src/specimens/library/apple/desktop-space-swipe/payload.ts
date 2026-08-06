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
    'Mount inside a relative overflow-clipped host (~560×400).',
    'Import demo.css verbatim; freeze viewport 520×360, transition 460ms.',
    'Wire nextSpace / previousSpace on NEXT SPACE / PREVIOUS.',
    'All windows within a plane move as one unit.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'All windows within a space move as one plane',
    'No window independently lags behind plane motion',
    'Space indicator changes once per transition at 50%',
    'PREVIOUS returns to exact Space 01 arrangement',
    'SPACE 01 has three windows; SPACE 02 has two',
    'Reduced motion: instant plane switch',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:400px;background:#0d1118;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
