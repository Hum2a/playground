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
    'Import demo.css verbatim; freeze edge 24px, max drag 160px, commit 118px, cancel 220ms, commit 180ms.',
    'Wire resetPredictiveBackAppShrink / replayPredictiveBackAppShrink.',
    'Internal border appears when scale drops below 0.97.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Shrink is continuously controlled by pointer distance',
    'Underlying surface is visible before commit',
    'Radius and inset increase progressively rather than switching',
    'Cancel returns to pixel-identical start geometry',
    'Works with mouse and touch-style pointer events',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:720px;background:#12141a;display:grid;place-items:center;padding:0;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
