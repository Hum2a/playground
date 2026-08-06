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
    'Mount inside a relative overflow-hidden host (600px preview height).',
    'Import demo.css verbatim; freeze expanded 520px and overshoot formula.',
    'Wire resetSheetRubberBandLimit.',
    'Downward drag retains normal sheet movement.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Sheet starts fully expanded at 520px',
    'Upward drag meets increasing resistance',
    'Overshoot max 54px displayed',
    'Exactly two limit ticks at 32px overshoot',
    'Release always returns to same expanded detent',
    'Reduced motion: 8px clamp and immediate snap',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:600px;background:#10141c;display:grid;place-items:center;padding:0.5rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
