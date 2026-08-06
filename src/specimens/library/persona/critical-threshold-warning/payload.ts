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
    'Mount inside a relative overflow-hidden frame (~380×320+) so clamps and the CRITICAL label clip safely.',
    'Import demo.css verbatim; keep the 90% marker, clamp travel (−35px / +35px), and red critical fill discrete.',
    'Drive ctw--critical from logical value > 90 — never from animation completion alone.',
    'Wire increaseCriticalThreshold / resetCriticalThreshold; one-shot sequence, no pulse loop.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an immediate 94% critical state.',
  ],
  acceptance: [
    'Initial metric is below the 90% threshold',
    '90% threshold is visibly marked (90 // LIMIT)',
    'Approach visually slows; marker reacts before crossing',
    'Crossing triggers upper/lower clamps; marker does not explode',
    'Critical region fill changes to red; CRITICAL appears once; final state is static',
    'Reset restores safe load; reduced motion is immediate',
    'No external dependencies, assets, or network',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#0a0b0e;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
