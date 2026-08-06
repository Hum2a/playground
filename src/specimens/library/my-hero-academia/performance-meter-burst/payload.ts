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
    'Import demo.css verbatim; keep staggered bar race timings.',
    'Wire RUN via performanceMeterBurst.run(root).',
    'OUTPUT bar must break graph ceiling visually.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Three meters race to POWER 62%, SPEED 48%, OUTPUT 94%',
    'OUTPUT bar exceeds ceiling with accent shadow',
    'Staggered start between bars',
    'Replay resets to 0% idle',
    'Clipped to host; sandbox allow-scripts',
    'Reduced motion shows final values immediately',
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
