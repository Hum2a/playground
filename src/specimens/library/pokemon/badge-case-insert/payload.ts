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
    'Mount inside a relative host (~340×380+).',
    'Import demo.css verbatim; keep 58px slots, 10px gaps, 4×2 grid, and post-dock progress timing.',
    'Call badgeCaseInsert.store() / .reset() or use STORE BADGE / RESET.',
    'Progress text and track must remain 5/8 until docking completes.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an immediate stored path.',
  ],
  acceptance: [
    'Exactly eight slots; five begin occupied; slots 7–8 stay empty',
    'Slot 6 is visibly targeted with four corner markers before travel',
    'Incoming badge starts outside the case (~80px above, scale 1.25) and docks into slot 6',
    'Travel ~320ms with scale 1.25→0.78; dock compress 0.78→0.70→0.80→0.78',
    'Progress stays 5/8 until dock, then becomes 6/8 with track 62.5%→75%',
    'Final state static; reduced motion immediate; no Pokémon badge art',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:380px;background:#0e0c08;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
