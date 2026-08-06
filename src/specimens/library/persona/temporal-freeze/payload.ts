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
    'Import demo.css verbatim; keep subsystem x-fractions and 700ms/500ms timings.',
    'Call freezeTemporal / resumeTemporal; do not globally pause animations on click.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'At least three independently looping systems (ticker, dial, pulse)',
    'Freeze boundary travels left→right (~700ms, 2px)',
    'Systems stop at different times matching their x positions',
    'Frozen palette veil follows the boundary',
    'Angular freeze bracket appears per system on freeze',
    'Final state has zero looping motion; line exits',
    'Resume travels right→left (~500ms) and restores motion progressively',
    'Reduced motion: no loops; FREEZE snaps frozen palette',
    'Works at 320px; no external assets/libraries/network',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#0a0b0e;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
