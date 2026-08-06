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
    'Import demo.css verbatim; freeze control 72×32 and timing sequence.',
    'Wire resetCopyConfirmationMorph.',
    'Rapid clicks during dwell restart dwell without duplicate geometry.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'One control morphs geometry to success',
    'COPIED persists 900ms',
    'Returns to COPY',
    'Rapid clicks do not accumulate elements',
    'Reduced motion: label swap only with 900ms dwell',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:120px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
