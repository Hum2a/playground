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
    'Mount inline; keep system monospace stack — do not load an external display font.',
    'Import demo.css verbatim; preserve the frozen 16-sample ladder and HOLD_MS timings.',
    'Call runPowerLevelReadout / runPowerLevelReset; do not drive the display with a continuous counter.',
    'Announce only the final measurement via the polite live region.',
    'Honour both reduced-motion triggers with an immediate final state.',
  ],
  acceptance: [
    'Begins unresolved (----); MEASURE walks exactly the frozen sample sequence',
    'Holds accelerate from ~70ms toward ~35ms then slow 45/55/80ms near the end',
    'Thresholds lock once at 1000 (×10³), 5000 (rule), and 8000 (frame +4px)',
    'Ends at 8,471 with settle, brackets, and ABOVE BASELINE after the number',
    'No random values, no infinite flicker; reduced motion is immediate',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:380px;background:#10131a;display:grid;place-items:center;padding:16px;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
