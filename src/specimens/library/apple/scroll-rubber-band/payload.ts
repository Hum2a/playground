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
    'Mount inside a relative overflow-hidden host (~360×440 viewport).',
    'Import demo.css verbatim; freeze resistance formula, 90px cap, 24px boundary stretch, and 420ms settle.',
    'Wire pointer pull at scrollTop 0 and wheel overscroll; normal list scrolling must remain functional.',
    'RELEASE marker appears at 60px displayed overscroll; no refresh action.',
    'Honour both reduced-motion triggers with ≤12px static resist and immediate return.',
  ],
  acceptance: [
    'Viewport 360×440 with 12 fixed ACTIVITY LOG rows starting at scroll top',
    'Overscroll activates only when scrollTop is 0 and user pulls downward',
    'displayOffset = 90 * (1 - exp(-dragDistance / 120)), clamped to 90px',
    'Top boundary stretches 0→24px proportional to overscroll',
    'RELEASE marker visible at ≥60px displayed overscroll',
    'Release springs to 0 in ~420ms with ≤4px overshoot; no refresh',
    'Normal list scrolling still works',
    'Reduced motion: ≤12px static resist, immediate return on release',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:440px;background:#111318;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
