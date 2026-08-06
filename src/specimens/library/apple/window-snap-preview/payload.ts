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
    'Mount inside a relative overflow-clipped host (~560×420).',
    'Import demo.css verbatim; freeze desktop 520×380, zone 54px, preview bounds.',
    'Drag window freely; preview only in left zone.',
    'Release in zone commits exact preview bounds over 260ms.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Preview only appears in left 54px activation zone',
    'Preview does not move window before release',
    'Leaving zone cancels preview in 90ms',
    'Release inside commits exact preview bounds',
    'Release elsewhere keeps free window position',
    'Reduced motion: instant preview and snap',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:420px;background:#0d1118;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
