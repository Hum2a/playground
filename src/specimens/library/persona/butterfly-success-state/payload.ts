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
    'Mount inside a relative overflow-hidden host so upward departure stays clipped.',
    'Import demo.css verbatim; keep frozen piece offsets (20–45px), 12deg open, and phase timings.',
    'Wire runButterflySuccess / resetButterflySuccess; reset must not reverse the choreography.',
    'Keep the butterfly aria-hidden; announce once via the polite status node when settled.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with an immediate COMPLETE state.',
  ],
  acceptance: [
    'Exactly one abstract butterfly built from four wing polygons plus one narrow body',
    'Pieces begin embedded around the status container and assemble first (~20–45px, 220ms)',
    'One restrained wing opening (~12deg) with an 80ms hold',
    'Whole form departs upward 60px while scaling 1 → 0.65 (260ms)',
    'COMPLETE becomes visible as the butterfly clears; meta reads Record saved.',
    'No particle swarm; no green success tick / checkmark',
    'Reduced motion shows static COMPLETE only; sandbox-safe; no dependencies',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#020912;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
