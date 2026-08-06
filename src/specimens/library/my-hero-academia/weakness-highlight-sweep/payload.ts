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
    'Mount inside a relative overflow-hidden host.',
    'Import demo.css verbatim; keep sweep and highlight timings.',
    'Wire RUN via weaknessHighlightSweep.run(root).',
    'Replay resets to idle before rerun.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Sweep bar traverses profile diagram left to right',
    'GUARD sector receives accent border highlight',
    'Weak bar fills shift to accent colour',
    'Status announces weakness sector at end',
    'Replay deterministic; clipped to host; sandbox allow-scripts',
    'Reduced motion shows static weakness highlight',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#101820;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
