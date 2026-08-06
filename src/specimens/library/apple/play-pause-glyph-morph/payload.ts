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
    'Mount inside a relative overflow-clipped host.',
    'Import demo.css verbatim; freeze 48×48 control and morph timings.',
    'One persistent glyph container; no duplicate play/pause icons.',
    'Keyboard activation via Space/Enter.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'One persistent glyph container',
    'No simultaneous full play and pause icons',
    'State toggles repeatedly without geometry drift',
    'Keyboard activation works',
    'Reduced motion: instant glyph swap',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:180px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
