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
    'Mount inside a relative overflow-hidden host so offscreen slabs clip.',
    'Import demo.css verbatim; keep frozen stack translates/scales and timing.',
    'Call ascendTartarusFloor / descendTartarusFloor / resetTartarusFloor; rebuild after each move to avoid drift.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with immediate stack rebuild.',
  ],
  acceptance: [
    'At least three depth layers visible (current / next / future)',
    'ASCEND moves current upward beyond canonical position while scaling up slightly',
    'Next floor rises from below; future advances into next slot',
    'New floor locks with edge brackets and label',
    'Repeated ASCEND rebuilds canonical positions (no cumulative drift)',
    'Floor 043 unknown glass retracts to DISCOVERED after lock',
    'DESCEND uses complementary downward motion (not reverse)',
    'Reduced motion updates stack immediately; live region announces active floor',
    'Works at 320px; no external assets/libraries/network',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#030a12;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
