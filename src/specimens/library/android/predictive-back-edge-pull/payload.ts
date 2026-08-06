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
    'Mount inside a relative overflow-hidden host (~390×720).',
    'Import demo.css verbatim; freeze edge 24px, max drag 140px, translate factor 0.72, commit 112px, velocity 0.55 px/ms.',
    'Wire resetPredictiveBackEdgePull / replayPredictiveBackEdgePull.',
    'Gesture starts only in left 24px edge zone.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Gesture can only begin in the left 24px edge zone',
    'Current and previous surfaces visibly coexist during drag',
    'Below-threshold release restores exact starting state',
    'Above-threshold or velocity release completes navigation',
    'Repeated runs do not accumulate transforms or listeners',
    'Reduced motion preserves drag distance and threshold semantics',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:720px;background:#141218;display:grid;place-items:center;padding:0;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
