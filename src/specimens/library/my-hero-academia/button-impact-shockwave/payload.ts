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
    'Mount card in relative overflow-hidden host.',
    'Shockwave 660ms from button origin; total 1310ms.',
    'Wire Activate / Replay; harness restart support.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Activate fires one hex shockwave through card',
    'Card nudges once on impact',
    'COMPLETE label visible at end',
    'Replay resets to idle',
    'Reduced motion: instant COMPLETE',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#F4F7FA;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
