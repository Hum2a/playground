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
    'Mount inside a relative overflow-hidden host so rays and field clip cleanly.',
    'Import demo.css verbatim; freeze base/ascended polygons, 10 marks, 8 rays, field 110%→165%→118%, and ~920ms timeline.',
    'Wire runPowerStateTransform / resetPowerStateTransform / replayPowerStateTransform; swap geometry by visibility during burst — do not crossfade illustrations.',
    'Update metrics with clipped movement; announce only initial and final state via aria-live.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an immediate Ascended path; leave a static thin outline, never a looping aura.',
  ],
  acceptance: [
    'Same ENGINE // 04 identity before and after',
    'Base and Ascended geometry visibly related (core + foot language)',
    'Exactly ten pressure marks; deterministic ≤2px shift',
    'Exactly eight transformation rays during burst',
    'Geometry structurally switches (no illustration crossfade)',
    'STATE → ASCENDED; THROUGHPUT → 3.0×; CHANNELS → 6',
    'No character / hair / franchise imagery',
    'Final state static with thin angular outline',
    'Reduced motion immediately shows Ascended + final metrics',
    'Polygons and timings frozen in contract.json',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#171b20;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
