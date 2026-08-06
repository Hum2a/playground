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
    'Mount inside a relative overflow-clipped host.',
    'Import demo.css verbatim; freeze 304×220 dialog and origin CSS vars.',
    'Wire resetDialogMaterialise; Confirm reuses same dialog surface.',
    'Scrim click and Escape cancel; focus returns to trigger.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Background is inert while dialog is open',
    'Focus moves into dialog and returns to trigger',
    'Confirm does not spawn a second surface',
    'Scrim and dialog have separate timing',
    'No infinite loading state',
    'Reduced motion: final scale, opacity-only',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#e8eaee;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
