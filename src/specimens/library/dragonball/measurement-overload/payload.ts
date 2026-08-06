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
    'Mount inside a relative host (~360×340+).',
    'Import demo.css verbatim; keep frozen sequence, timings, three fragments, and −18° fracture.',
    'Call window.measurementOverload.run() / .reset() or use MEASURE / RESET.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an immediate overflow path.',
  ],
  acceptance: [
    'Supported range visibly 0 — 9,999',
    'Deterministic climb through 0142…9999 then ---- then > 9,999',
    '9999 holds 180ms before ---- (90ms) then overflow',
    'Exactly three right-side frame fragments and one −18° fracture',
    'Final overflow remains static and readable; no looping glitch',
    'Reduced motion is immediate; a11y announces range exceeded',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#07140f;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
