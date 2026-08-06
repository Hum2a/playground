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
    'Mount inline; import demo.css verbatim.',
    'Track a single cursor index and a selected boolean; derive is-cursor / is-selected / is-pushed-left / is-pushed-right per render.',
    'Keep the 46px neighbour push and 1.3 selected scale frozen; never scale the pushed neighbours.',
    'Disable cursor navigation while a card is selected.',
    'Honour both reduced-motion triggers by removing the transition, not the state change.',
  ],
  acceptance: [
    'Idle: cursor on card 3 of 5, no card selected',
    'Prev/Next move the cursor between cards while nothing is selected',
    'SELECT expands the cursor card to scale 1.3 and lifts it 8px',
    'Only the immediate left/right neighbours translate 46px away, keeping their own size',
    'SELECT becomes DESELECT; activating it again returns every card to baseline',
    'Reduced motion keeps the same states with transitions disabled',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:260px;background:#0c0c0f;display:grid;place-items:center;padding:16px;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
