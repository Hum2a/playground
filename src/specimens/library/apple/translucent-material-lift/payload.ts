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
    'Mount inside a relative overflow-hidden host.',
    'Import demo.css verbatim; freeze panel 286×214 and 220ms open.',
    'backdrop-filter is enhancement; semi-transparent fallback required.',
    'Wire open/close and resetTranslucentMaterialLift.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Panel readable without backdrop-filter',
    'Underlying context remains visible',
    'Exactly two boundary layers (outer + inner highlight)',
    'Lift is subtle — no giant shadow',
    'Close reverses hierarchy',
    'Reduced motion: immediate material state',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#0e1116;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
