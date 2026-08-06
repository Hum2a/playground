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
    'Import demo.css verbatim; freeze 86px radius, 28% max attraction, 42px tick threshold.',
    'Only ARCHIVE attracts; LOCKED is inert.',
    'Drop inside ARCHIVE commits; outside returns to source.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Only ARCHIVE attracts',
    'Attraction begins at 86px radius',
    'Maximum attraction limited to 28%',
    'Exactly four acquisition ticks below 42px',
    'Leaving radius restores normal drag',
    'Invalid target LOCKED never pulls proxy',
    'Reduced motion: static outline when in bounds',
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
