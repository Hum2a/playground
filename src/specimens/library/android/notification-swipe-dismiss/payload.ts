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
    'Import demo.css verbatim; freeze 336×76 cards and 45% commit threshold.',
    'Dismissal field revealed behind dragged card.',
    'Height collapse only after horizontal exit completes.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Vertical stack does not move until dismissal is committed',
    'Both left and right dismiss work',
    'Cancel leaves card unchanged',
    'Height collapse happens only after horizontal exit',
    'Remaining cards preserve order',
    'Reduced motion: instant dismiss on commit',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:400px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
