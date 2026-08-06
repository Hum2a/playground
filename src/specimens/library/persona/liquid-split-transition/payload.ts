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
    'Mount inside a relative overflow-hidden host so departing slabs clip cleanly.',
    'Import demo.css verbatim; freeze seam at 54%, five segments, ±58%/±8px split, and 760ms total.',
    'Wire runLiquidSplit / resetLiquidSplit; destination must exist beneath from the start (scale 0.97→1, no fade).',
    'Keep seam, lobes, and refraction decorative; announce only Depth 01 and Depth 02 statuses.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with an immediate destination reveal.',
  ],
  acceptance: [
    'Seam forms before the split (0–180ms grow at 54% height)',
    'Upper and lower surfaces travel in opposite directions with slight horizontal offset',
    'Inner edges read as liquid via 6 frozen lobes per boundary',
    'Destination exists behind the split and scales 0.97→1 without crossfade',
    'Narrow ~24px refraction bands with 2–3px decorative offset',
    'Old state continues offscreen; nothing loops',
    'Reduced motion shows destination immediately',
    'Works at ~320–768px; geometry and timing frozen in contract.json',
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
