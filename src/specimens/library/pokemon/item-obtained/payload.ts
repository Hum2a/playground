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
    'Mount inline; keep the 58×72px five-facet gem and lower-right inventory slot as the portable contract.',
    'Call runItemObtained from OBTAIN ITEM; never increment quantity before docking.',
    'Transfer uses a two-stage CSS path (no animation library); exactly two completion accents.',
    'Announce final quantity once via the status region — skip intermediate counts.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an immediate final state.',
  ],
  acceptance: [
    'Item visibly appears outside inventory with exactly five primary facets',
    'Item is presented before storage, then physically travels into the slot',
    'Quantity remains ×02 until docking, then becomes ×03',
    'Exactly two completion accents; final state static at ENERGY SHARD ×03',
    'Reduced motion immediately shows ×03 and ITEM OBTAINED',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#e6e3dc;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
