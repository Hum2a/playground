import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount in a bounded relative plate; keep the impact overlay above host content.',
    'Import demo.css verbatim; freeze anticipation 60ms, black frame 72ms, inverse 44ms, recovery 120ms from contract.json.',
    'Trigger runMangaBlackImpactFrame only from deliberate application events — never hover, scroll, or loading.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with a static 6px black border on the completed state (no full-surface flash).',
  ],
  acceptance: [
    'One activation produces exactly one sequence',
    'Black impact frame lasts 72ms',
    'Effect never loops',
    'Final application state is unchanged except for intended completion',
    'Reduced-motion mode performs no full-surface flash',
    'Repeated button presses while sequence is active cannot create a flashing loop',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#e4e0d4;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
