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
    'Mount inside a relative overflow-clipped host (~400×320).',
    'Import demo.css verbatim; freeze proxy 108×58, offsets, scales, badge 4.',
    'Wire startMultiItemDrag / resetMultiItemDrag.',
    'Source placeholders remain during drag; no duplication after drop.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Exactly four items: A.MD B.PDF C.PNG D.JSON',
    'Exactly four visible stack layers where geometry permits',
    'Count badge equals 4',
    'A.MD remains top identity',
    'No source duplication after successful drop',
    'Reduced motion: instant stack formation',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
