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
    'Mount inside a relative overflow-hidden host.',
    'Import demo.css verbatim; freeze card 286×500 and 380ms transition.',
    'Wire resetRecentsCardRestore on replay.',
    'Any of three cards can restore.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Any of the three task cards can be restored',
    'Selected card remains visually continuous throughout',
    'Neighbour cards leave before full expansion completes',
    'Returning to overview restores task order',
    'No raster screenshots or network resources',
    'Reduced motion: immediate geometry swap',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:760px;background:#0a0e16;display:grid;place-items:center;padding:0.5rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
