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
    'Import demo.css verbatim; freeze 152×72, 152×152, 320×152 sizes.',
    'Only valid grid dimensions; top-left anchor fixed.',
    'Handles visible only while widget is selected.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Only valid grid dimensions can be reached',
    'Top-left grid anchor remains fixed',
    'Content genuinely reflows by size',
    'Handles disappear when deselected',
    'No overlap with neighbouring scaffold items',
    'Reduced motion: instant size change',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
