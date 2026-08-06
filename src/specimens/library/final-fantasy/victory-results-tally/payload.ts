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
    'Mount inside a container with position: relative and overflow: hidden.',
    'Import demo.css verbatim; keep the frozen hex colours, timings, and padded targets.',
    'Call runVictoryResultsTally() from your activity-complete trigger (or wire FINISH ACTIVITY).',
    'Show TOTAL only after SCORE and BONUS have settled; LEVEL UP last with the CSS flare.',
    'Announce finals once via a polite live region — do not expose intermediate count ticks to AT.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with immediate finals.',
  ],
  acceptance: [
    'Rows reveal in fixed order (SCORE → BONUS → TIME → TOTAL → LEVEL UP)',
    'Number animation always lands exactly on 02450 / +0350 / 01:42 / 02800',
    'TOTAL appears only after SCORE and BONUS settle',
    'LEVEL UP appears last with a gold horizontal flare',
    'Reduced motion shows final values immediately',
    'No external assets',
    'Replays reset cleanly to zero/start state via restart',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#040914;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
