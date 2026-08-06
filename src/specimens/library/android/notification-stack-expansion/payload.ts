import type { SpecimenPayload } from '../types'
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
    'Import demo.css verbatim; freeze card dimensions and 320ms duration.',
    'Same four DOM cards throughout toggle.',
    'Parent height tracks final layout.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Four cards remain individually identifiable',
    'Expanded stack has no overlaps',
    'Collapsed state implies multiple items',
    'No cards created/destroyed during toggle',
    'Parent height tracks final layout',
    'Reduced motion: instant position jump',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#12141a;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
