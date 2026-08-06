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
    'Mount inline; keep the 300×12px bar and clipped level slot as the portable contract.',
    'Call runLevelUpOverflow from ADD XP; never animate 87%→25% directly.',
    'Reset progressbar semantics when the level increments (0/100 then 25/100).',
    'Exactly two threshold ticks at 100%; announce final level and XP once.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an immediate final state.',
  ],
  acceptance: [
    'Starts Level 12 at 87/100; reward is exactly +38',
    'Bar reaches 100% before reset; level increments only after threshold; exactly two markers',
    'Bar resets only after level becomes 13; remaining 25 XP fills the new level',
    'Ends Level 13 at 25/100; no progress visually lost; final state static',
    'Reduced motion presents correct final state immediately',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#e4e2dc;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
