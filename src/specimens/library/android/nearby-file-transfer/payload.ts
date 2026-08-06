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
    'Import demo.css verbatim; freeze 240px separation, 650ms arc, 1100ms ring.',
    'Reject sends proxy 40px toward recipient then returns to source.',
    'Completion absorbs proxy — no duplicate document nodes.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Transfer path has visible source and destination',
    'Reject never reaches completed state',
    'Completion absorbs proxy rather than leaving duplicates',
    'Progress is finite and deterministic',
    'Reset reconstructs original document',
    'Reduced motion: jump proxy, keep determinate progress',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:220px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
