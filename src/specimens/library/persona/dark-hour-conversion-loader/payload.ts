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
    'Drive --dhcl-p from the same progress value shown in the numeric readout.',
    'Call startDarkHourConversionLoad / resetDarkHourConversionLoad; use setDarkHourConversionProgress for inspection.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Progress directly controls the conversion boundary (1:1 with --dhcl-p)',
    'Converted visual percentage matches numeric percentage',
    'Converted layer has structural diffs (v-rule, angled chips/rows, glyph)',
    'Exactly two anomaly streaks travel with the 2px boundary',
    '100% is fully converted; after ~180ms a pale line resolves to INDEX COMPLETE',
    'No spinner; demo finishes (no indefinite loop)',
    'role=progressbar exposes exact value; completion announces once',
    'Reduced motion skips travelling boundary',
    'Works at 320px; no external assets/libraries/network',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0a1016;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
