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
    'Import demo.css verbatim; freeze 300×58 field and 180ms label transition.',
    'Wire resetFloatingLabelLift; label stays floated when value non-empty.',
    'Error toggle adds supporting text without moving label.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Label stays floated whenever value is non-empty',
    'Placeholder is not used as a fake label',
    'Error text creates real layout space',
    'Clicking label focuses input',
    'Field remains usable with keyboard only',
    'Reduced motion: instant label position',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:200px;background:#f8f9fb;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
