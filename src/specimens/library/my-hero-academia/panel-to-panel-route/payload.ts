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
    'Mount in a relative overflow-hidden frame.',
    'Import demo.css verbatim; preserve 740ms expansion and frozen selected scale/offset.',
    'Wire panel selection and Route trigger; reset via resetPanelToPanelRoute().',
    'Honour both reduced-motion triggers; aria-live announces route changes.',
  ],
  acceptance: [
    'From→to label shows selected panel → MISSION COMPLETE before routing',
    'Route expands selected panel from frozen scale 1.04 then reveals MISSION COMPLETE',
    'aria-live announces route change on completion',
    'Replay resets grid, labels, and live region deterministically',
    'Reduced motion shows final route state immediately',
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
