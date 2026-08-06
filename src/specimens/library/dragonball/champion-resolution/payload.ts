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
    'Mount in a relative overflow-hidden host.',
    'Keep frozen scores 92/87, +05 margin, 8 rays, and 6 historical paths at 25ms stagger.',
    'Call runChampionResolution / resetChampionResolution; NOVA must remain as runner-up.',
    'Do not add confetti, trophies, or looping celebration motion.',
  ],
  acceptance: [
    'Exactly two finalists and six historical markers',
    'Scores resolve to 92 and 87; difference +05; NOVA remains runner-up',
    'Exactly eight winner rays; historical paths converge on ATLAS',
    'Tournament becomes COMPLETE; no confetti; static final; reduced motion immediate',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:440px;background:#0e1016;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
