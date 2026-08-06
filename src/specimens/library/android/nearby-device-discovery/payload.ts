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
    'Import demo.css verbatim; freeze 120ms stagger, 260ms settle, 900ms ready.',
    'Four recipients at fixed radial positions; NODE C receives ready border/check.',
    'Orbit rings draw once per discovery run.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Node positions are fixed between runs',
    'Discovery has a finite end state',
    'Ready state is structurally distinguishable',
    'Re-running resets cleanly',
    'No network or Bluetooth APIs are called',
    'Reduced motion: instant recipient appearance',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:480px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
