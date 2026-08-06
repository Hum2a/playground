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
    'Mount inside a relative overflow-clipped host (~380×280).',
    'Import demo.css verbatim; freeze refusal 3px, pause 70ms, return 360ms.',
    'ARCHIVE visible for contrast; only READ ONLY triggers rejection.',
    'Placeholder prevents layout collapse during drag.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Invalid target READ ONLY is visibly distinct from ARCHIVE',
    'Rejected proxy returns to exact source',
    'One refusal movement only on invalid target',
    'Placeholder prevents layout collapse',
    'No duplicate proxy remains after merge',
    'Reduced motion: instant restore with rejection status',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
