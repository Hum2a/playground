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
    'Keep −18deg TL→BR reverse boundary and the same 12 scatter offsets as Erasure Delete.',
    'Do not import erasure-delete — copy frozen geometry into this portable artifact.',
    'Call runTemporalUndo / resetTemporalUndo (or window.temporalUndo).',
    'Metadata must restore identity→VERSION→LINKS→STATUS by spatial reverse, not a simple list.',
  ],
  acceptance: [
    'Begins deleted; UNDO shows timeline NOW→−3 and reverse boundary travel',
    'Exactly 12 fragments return from deterministic scatter; structure appears behind boundary',
    'Metadata returns in reverse spatial order; final ACTIVE + STATE RESTORED',
    'No looping; reduced motion immediately restores Record 028',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#111a21;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
