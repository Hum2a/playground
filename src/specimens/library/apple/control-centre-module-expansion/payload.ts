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
    'Import demo.css verbatim; freeze 142×72 compact, 320×210 expanded, 340ms expansion.',
    '62% value persists; slider at 70% width; rows stagger 45ms.',
    'Collapse preserves any changed slider value.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Compact and expanded states share AUDIO identity',
    '62% persists through expansion',
    'Expanded size exactly 320×210',
    'OUTPUT then BALANCE rows reveal in order',
    'Changed volume persists after collapse',
    'Reduced motion: instant state swap',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:260px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
