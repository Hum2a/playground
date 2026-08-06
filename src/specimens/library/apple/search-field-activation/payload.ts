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
    'Mount inside a relative overflow-clipped host (~400×120).',
    'Import demo.css verbatim; freeze header 360px, search 38→276px.',
    'Wire activateSearch / cancelSearch on trigger and CANCEL.',
    'Title retracts 120ms; placeholder after 55% expand.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Search starts compact at 38px',
    'Expanded width is 276px',
    'Focus enters input on activation',
    'CANCEL restores title LIBRARY and ADD',
    'No elements overlap during transition',
    'Reduced motion: immediate layout swap',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:120px;background:#101218;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
