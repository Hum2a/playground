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
    'Import demo.css verbatim; freeze 300×56 compact and 360×260 expanded.',
    'Progress 01:42 must not reset on collapse.',
    'Controls reveal in deterministic order.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Track identity persists',
    'Progress does not reset',
    'Compact and expanded dimensions exact',
    'Controls reveal deterministically',
    'Reduced motion: instant state switch',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
