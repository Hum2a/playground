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
    'Mount inside a relative overflow-hidden viewport.',
    'Import demo.css verbatim; origin is set from trigger click position.',
    'Swap content while mask is fully expanded (~220ms).',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Activate expands halftone mask from button origin and swaps to COMPLETE',
    'Mask remains clipped to specimen bounds',
    'Reset returns to STANDBY via restart message or Reset button',
    'Reduced motion swaps states without mask travel',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#101820;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
