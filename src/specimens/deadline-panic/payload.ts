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
    'Mount inside a relative overflow-hidden frame (~360×320+).',
    'Import demo.css verbatim; keep frozen shatter/scatter transforms — no Math.random.',
    'Drive time with performance.now + rAF; do not chain setTimeouts for the tick.',
    'Wire startDeadlinePanic / resetDeadlinePanic; announce Time expired. once at the end only.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with spatially static digits.',
  ],
  acceptance: [
    'Timer runs accurately from 00:10 to 00:00',
    'Early countdown is visually stable; disorder increases at deterministic thresholds',
    'No runtime randomness and no flashing backgrounds',
    '1-second state is visibly fragmented with frozen transforms',
    'Zero resolves into TIME UP impact',
    'Reduced motion keeps the timer spatially static',
    'Exact transforms and timing documented in the recreation contract',
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
