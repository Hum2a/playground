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
    'Mount inside a relative overflow-hidden host (~420×560).',
    'Import demo.css verbatim; freeze edge 28px, commit 42%, velocity 0.62 px/ms, settle 260/220ms.',
    'Wire resetInteractiveBackSwipe / replayInteractiveBackSwipe.',
    'Gesture starts only in left 28px edge zone.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Gesture starts only within 28px edge zone',
    'Current page tracks drag 1:1 horizontally',
    'Previous page reveals continuously from -28% scale .98',
    '42% position threshold shows 2px tick',
    'Fast release above 0.62 px/ms can commit below 42%',
    'Short/slow release cancels with 220ms settle',
    'No page half-positioned after release',
    'REPLAY resets to ORBIT detail',
    'Reduced motion preserves thresholds without parallax scale',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:560px;background:#12141a;display:grid;place-items:center;padding:0.5rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
