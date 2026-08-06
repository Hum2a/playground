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
    'Mount inside a relative overflow-hidden frame.',
    'Import demo.css verbatim; wire Focus trigger or runAngularFocusBrackets().',
    'Reset via resetAngularFocusBrackets() on replay.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Focus trigger snaps four brackets onto the target card',
    'Locked state uses accent bracket colour and outline',
    'Replay retracts brackets deterministically',
    'Reduced motion shows locked brackets immediately',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#101820;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
