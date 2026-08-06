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
    'Mount inside a relative overflow-clipped host.',
    'Import demo.css verbatim; freeze 70ms flash, 300ms arrival, 4200ms dwell.',
    'Use prebuilt miniature DOM — no canvas capture APIs.',
    'Only one thumbnail; new capture resets timeout.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Capture does not require browser screenshot permissions',
    'Only one thumbnail exists',
    'New capture replaces or resets existing timeout cleanly',
    'Thumbnail never changes app layout',
    'Timeout pauses while focused or hovered',
    'Reduced motion: in-place thumbnail',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:500px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
