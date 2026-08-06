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
    'Import demo.css verbatim; freeze 6px threshold, 140ms formation, 8px pointer offset.',
    'Source placeholder remains during drag; proxy centre hit-tests ARCHIVE.',
    'Valid drop absorbs; cancel returns and merges without duplicate cards.',
    'Honour both reduced-motion triggers with instant compact proxy.',
  ],
  acceptance: [
    'Drag begins only after 6px movement',
    'Original source location remains represented as placeholder',
    'Proxy is smaller than source (116×64)',
    'REPORT // Q3 and 18 PAGES persist on proxy',
    'Valid drop target ARCHIVE responds when proxy centre enters bounds',
    'Cancel restores source without duplicate cards',
    'Reduced motion: fixed compact proxy, no formation morph',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
