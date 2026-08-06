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
    'Import demo.css verbatim; freeze 32px bar, 190px menu, row counts.',
    'Single reused menu surface — no duplicates.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Menu must be opened first',
    'Pointer transfer changes ownership',
    'Surface is reused rather than duplicated',
    'Row counts correct',
    'Grace period prevents accidental close during transfer',
    'Reduced motion: instant transfer',
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
