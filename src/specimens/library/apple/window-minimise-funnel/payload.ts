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
    'Mount inside a relative overflow-clipped host (~420×360).',
    'Import demo.css verbatim; freeze window 380×250, token 52×34, duration 520ms.',
    'Wire minimiseWindow / restoreWindow on MINIMISE / RESTORE.',
    'Destination token visible before minimise.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Destination token visible before minimise',
    'Geometry visibly funnels via clip-path',
    'TERMINAL identity persists through transition',
    'Final token occupies exact 52×34 destination',
    'RESTORE reconstructs full 380×250 window',
    'Reduced motion: instant state swap',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#0d1118;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
