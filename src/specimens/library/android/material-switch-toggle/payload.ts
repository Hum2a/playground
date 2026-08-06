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
    'Import demo.css verbatim; freeze 52×32 track, 24px thumb, 20px travel.',
    'Wire resetMaterialSwitchToggle; native checkbox is authoritative.',
    '40px ripple on pointer-down centred on thumb.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Native checkbox state is authoritative',
    'Thumb travel is exactly 20px',
    'Disabled switch cannot toggle',
    'Keyboard Space works',
    'State remains distinguishable without animation',
    'Reduced motion: instant thumb position, no ripple',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:220px;background:#f4f5f7;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
