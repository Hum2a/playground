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
    'Mount inside a relative overflow-hidden frame.',
    'Keep State B clipped from origin 68%/58% from the start; do not late-swap or crossfade-only.',
    'Import demo.css verbatim; keep frozen origin, ring radii/delays, and ~700ms total.',
    'Call runRippleEnter / runRippleReturn; busy-guard re-entrancy; restart resets origin exactly.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with an immediate State B show.',
  ],
  acceptance: [
    'Fixed non-central origin at 68% 58%; no click-position randomness',
    'Initial disturbance precedes at least three ripple rings',
    'Destination reveal shares the same origin and exists inside the growing radius',
    'Narrow refraction band follows the reveal boundary; cover exceeds host diagonal',
    'Rings continue briefly after full reveal then stop; no looping',
    'Reduced motion is immediate; exact origin/radii/delays documented',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#020b16;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
