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
    'Import demo.css verbatim; freeze 132×48 compact and 320×220 expanded geometry.',
    'One container owns both states — no hidden duplicate card.',
    'Close reverses to exact compact dimensions.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'One container owns both compact and expanded states',
    'Label remains visually continuous',
    'No cloned hidden card sits behind the button',
    'Reverse returns exact compact dimensions',
    'Works inside iframe without external CSS',
    'Reduced motion: immediate shape change',
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
