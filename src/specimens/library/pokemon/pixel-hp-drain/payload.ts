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
    'Mount inline; keep exactly 20 blocks — scale visually if needed, never change count.',
    'Import demo.css verbatim; use only the four frozen tones; no width transitions on blocks.',
    'Call runPixelHpDrain / runPixelHpReset; update HP via discrete filled-class toggles.',
    'Expose numeric HP via text and role=meter; treat blocks as supplementary.',
    'Honour both reduced-motion triggers with an immediate 7/20 final state.',
  ],
  acceptance: [
    'Exactly 20 logical blocks; starts with 18 filled; removes exactly 11 right-to-left',
    'Numeric value decreases alongside blocks to HP 7/20; no smooth width animation',
    'Crosses the 10/20 mid-tone threshold; ends at 7 (LOW not shown)',
    'Four-tone palette only; impact is a 2px stepped shove; reduced motion is immediate',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#101b16;display:grid;place-items:center;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
