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
    'Mount inside a relative overflow-hidden frame.',
    'Import demo.css verbatim; preserve 660ms clash and diagonal divider geometry.',
    'Wire Clash trigger or call runRivalCardsClash(); reset via resetRivalCardsClash() on replay.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with instant settled state.',
  ],
  acceptance: [
    'Clash trigger runs one deterministic sequence: idle → clash → READY',
    'Two cards meet at a central diagonal divider without escaping the arena clip',
    'Replay resets classes and timers before rerunning',
    'Reduced motion shows final READY composition immediately',
    'No external assets, storage, parent access, or network',
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
