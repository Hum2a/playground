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
    'Mount inside a relative overflow-hidden board.',
    'Import demo.css verbatim; wire Assign trigger or runHeroAssignmentDrag().',
    'Reset via resetHeroAssignmentDrag() on replay.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Assign trigger condenses card into proxy and moves it toward DISPATCH',
    'Source card becomes dashed placeholder during assignment',
    'Dispatch zone shows filled accent state on completion',
    'Replay resets card, proxy, and zone deterministically',
    'Reduced motion skips proxy animation',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#101820;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
