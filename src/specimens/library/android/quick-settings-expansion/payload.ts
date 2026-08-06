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
    'Mount inside relative overflow-clipped host.',
    'Import demo.css verbatim; freeze compact and expanded dimensions.',
    'First four controls maintain compact→expanded continuity.',
    'Collapse restores original order.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'First four controls have visible compact→expanded continuity',
    'Extra controls only in expanded phase',
    'Expanded layout fits without overflow',
    'Collapse restores original order',
    'No proprietary Android icons',
    'Reduced motion: immediate geometry switch',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:380px;background:#12141a;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
