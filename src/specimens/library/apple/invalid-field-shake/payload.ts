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
    'Import demo.css verbatim; freeze shake offsets and 310ms duration.',
    'Wire resetInvalidFieldShake.',
    'Valid pattern: uppercase letters, digits, hyphen only.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Invalid value produces exact offset sequence 0,-6,+5,-4,+3,-2,0',
    'Field returns to exact original position',
    'Error region uses layout space (34px)',
    'Correct ORBIT-7 clears error and shows success tick',
    'No looping shake',
    'Reduced motion: immediate error without shake',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:220px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
