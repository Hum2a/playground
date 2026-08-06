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
    'Import demo.css verbatim; freeze 600px breakpoint and 260px list pane.',
    'Preserve selected item DOM identity across layout changes.',
    'Narrow shrink shows detail if one is selected, otherwise list.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Breakpoint is exactly 600px',
    'Selected item survives both directions',
    'No content is duplicated during transition',
    'Wide state has persistent master and detail',
    'Narrow state remains fully navigable',
    'Reduced motion: instant layout switch',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:380px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
