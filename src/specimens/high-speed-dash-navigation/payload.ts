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
    'Keep frozen 320px OVERVIEW→LOGS span and single continuous travel animation.',
    'Exactly five trace lengths 18/30/44/62/78px — no random trails.',
    'Call runHighSpeedDash / resetHighSpeedDash; METRICS only reacts on pass.',
    'Traces must fully retract on lock; no residual motion.',
  ],
  acceptance: [
    'Starts at OVERVIEW with opposite-direction anticipation',
    'Path remains perceptible; exactly five speed traces; METRICS reacts when passed',
    'Accelerates then brakes; four destination ticks; ends at LOGS static',
    'No residual trails; reduced motion immediately selects LOGS',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#0e1016;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
