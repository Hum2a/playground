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
    'Mount inside a relative overflow-clipped host (~320×240 stage).',
    'Import demo.css verbatim; keep double-bond, 09→10 reel, and four diamond path timings.',
    'Call completeMaxRank() from MAX LINK; resetMaxRank() or harness restart restores rank 09.',
    'Keep the stage aria-hidden; announce via the polite status region.',
    'Honour both reduced-motion triggers with the immediate completed path.',
  ],
  acceptance: [
    'Starts at rank 09 with a strong double-line bond between YOU and ALLY',
    'Energy travels inward from both entities before the rank reel moves',
    '09→10 vertical transition; four circuit paths construct afterward',
    'Circuit visibly reconnects both entity nodes; MAX appears last',
    'Pale outline expands ~6px then settles; final state is completely static',
    'No particles, confetti, or perpetual glow; reduced motion shows Rank 10 circuit immediately',
    'No external assets; sandbox="allow-scripts" safe',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#020b16;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
