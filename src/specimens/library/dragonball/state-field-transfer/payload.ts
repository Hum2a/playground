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
    'Mount inside a relative host (~480×340+).',
    'Import demo.css verbatim; keep 240px gap, 7 segments, 3 contours, and frozen timings.',
    'Wire TRANSFER BOOST via runStateFieldTransfer; RESET / harness restart via resetStateFieldTransfer.',
    'Never show BOOST // ACTIVE on A and B simultaneously.',
    'Announce “Boost transferred from Node A to Node B.”; honour both reduced-motion triggers.',
  ],
  acceptance: [
    'A owns BOOST with exactly three contours; B starts with none',
    'Seven-segment channel; contours collapse outer→inner; one 18×18 transfer token',
    'Midpoint handoff: A NONE / B PENDING; never both ACTIVE',
    'B rebuilds inner→outer with ignite flash; channel retracts; final static',
    'Four wisps peel from donor during collapse; token travels with trail + pulse',
    'Reduced motion immediately shows final ownership',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#0a0c10;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
