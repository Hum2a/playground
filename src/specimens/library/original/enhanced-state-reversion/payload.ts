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
    'Mount in a relative overflow-hidden host so retracting channels and field clip cleanly.',
    'Import demo.css verbatim; keep eight channels, pair timings (90ms), and field stop→retract (70ms + 140ms).',
    'Wire enhancedStateReversion.revert / reset; never decrement or animate TASKS DONE — it stays 42.',
    'Announce reversion as capability rollback with work retained; do not frame as error or failure.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with an immediate BASE state.',
  ],
  acceptance: [
    'Begins at STAGE III with exactly eight channels and capacity 4.0×',
    'State field stops before reversion; then retracts (~70ms hold + 140ms)',
    'Channels retract in pairs 8→6→4→2 (~90ms each), not simultaneously',
    'Capacity steps 4.0× → 2.5× → 1.5× → 1.0×; STATE reads REVERTING during process',
    'Geometry folds (~20% height, ~8% width); settle scale 1.02→1 into BASE',
    'TASKS DONE remains exactly 42 throughout; final state is static BASE with 2 channels',
    'Reduced motion shows BASE immediately with TASKS DONE 42',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#0a0d12;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
