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
    'Mount inside a relative overflow-hidden dark host (~280×220).',
    'Import demo.css verbatim; freeze 196→126+12+58 split and 320ms timing.',
    'Wire startDualActivitySplit / endDualActivitySplit / resetDualActivitySplit.',
    'Upload progress mark must remain on the left region.',
    'Bridge visible exactly 90ms; timer digits use vertical clipping.',
  ],
  acceptance: [
    'Starts as one 196×40 activity region',
    'Second task creates a second 58px region with 12px gap',
    'Upload identity never jumps to the wrong region',
    'Gap is exactly 12px; secondary width ends at 58px',
    'One connecting bridge for first 90ms then separates',
    'Ending timer returns to one 196px region',
    'Reduced motion: immediate layout switch',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:220px;background:#0c0d10;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
