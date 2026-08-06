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
    'Mount inside a relative overflow-hidden host.',
    'Import demo.css verbatim; keep countdown and burst timings.',
    'Wire START via trainingSimulationStart.start(root).',
    'Replay resets to standby before rerun.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'READY countdown displays 3-2-1-GO sequence',
    'READY panel explodes into telemetry grid',
    'Tiles show PULSE, LOAD, and ACTIVE ALERT values',
    'Replay returns to exact standby idle',
    'Clipped to host; sandbox allow-scripts; no external assets',
    'Reduced motion shows live telemetry immediately',
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
