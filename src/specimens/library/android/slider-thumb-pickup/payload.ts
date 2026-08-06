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
    'Mount inside a relative overflow-clipped host.',
    'Import demo.css verbatim; freeze 280px track, step 5, thumb 20/28px.',
    'Wire resetSliderThumbPickup; bubble hides 180ms after release.',
    'Track fill width must match numeric value.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Value is always a multiple of 5',
    'Bubble follows thumb centre',
    'Keyboard arrows update value',
    'Track fill and numeric value cannot disagree',
    'Thumb returns to 20px after interaction',
    'Reduced motion: instant thumb and bubble state',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:180px;background:#f4f5f7;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
