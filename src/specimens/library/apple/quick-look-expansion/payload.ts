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
    'Import demo.css verbatim; freeze 380ms expansion, 52px row, 420×330 preview.',
    'List remains visible at scale 0.985; three blocks at 45ms stagger.',
    'ESC/CLOSE collapses back to DESIGN.PDF row without navigation.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'File list remains present during preview',
    'DESIGN.PDF identity persists through transition',
    'Preview expands from selected row context',
    'Exactly three document content blocks reveal',
    'Close returns focus/visual ownership to selected row',
    'Reduced motion: instant preview toggle',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:400px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
