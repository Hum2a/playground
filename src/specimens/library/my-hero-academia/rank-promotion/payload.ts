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
    'Mount inside a relative overflow-hidden host.',
    'Import demo.css verbatim; freeze row height (44px) and 580ms promotion translation.',
    'Call runRankPromotion() from PROMOTE; ignore re-entry while busy or settled.',
    'Use resetRankPromotion / replayRankPromotion for deterministic replay.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'UNIT-07 visibly moves from #4 to #3',
    'UNIT-22 shifts down to #4 during promotion',
    'RANK UP badge appears on promoted row',
    'Replay restores initial order deterministically',
    'Reduced motion shows final ranks without translation',
    'Works in sandboxed iframe without external resources',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:300px;border:2px solid #101820;background:#F4F7FA;display:grid;place-items:center;padding:0.5rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
