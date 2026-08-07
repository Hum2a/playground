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
    'Mount inside a relative host (~360×350+).',
    'Import demo.css verbatim; retain all 24 coordinates and four fixed group timings.',
    'Call window.kiChargeMeter.charge() / .reset() or use CHARGE / RESET.',
    'Keep percentage commits discrete at 0/25/50/75/100.',
  ],
  acceptance: [
    'Exactly 24 deterministic diamonds/lines consume in four groups of six.',
    'Groups accelerate at 420/340/270/200ms with 30ms internal stagger.',
    'Vessel staging rings appear per group; node grows 34/46/58/70/82px after each group.',
    'Completion shows four cardinal lines and a 160ms 1→.92→1.05→1 compression.',
    'Final state is static 100% READY; reduced motion is immediate full vessel.',
    'window.kiChargeMeter.charge / reset / replay mirror exported functions.',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:350px;background:#111924;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
