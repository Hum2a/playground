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
    'Mount stage with overflow hidden; import demo.css verbatim.',
    'Frozen scatter offsets and 0/60/120ms snap stagger via CSS vars.',
    'Snap 580ms + UNIT READY stamp 180ms; wire Form up / Replay.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Three cards start at frozen scatter positions',
    'Cards snap to bottom row on stagger ladder',
    'UNIT READY end stamp slams in after snap',
    'Replay returns cards to scatter positions',
    'Reduced motion: instant formation with stamp',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#101820;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
