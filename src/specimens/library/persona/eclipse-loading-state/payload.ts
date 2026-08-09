import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount in a 420×300 dark host; keep the 120px eclipse circular via equal width/height.',
    'Import demo.css verbatim; do not restyle to host tokens or interrupt the 1400ms alternate travel.',
    'Treat the eclipse as decorative; expose loading in surrounding product copy.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion by freezing the moon on centre with the ring visible.',
  ],
  acceptance: [
    'A 120px eclipse shows a luminous ring, moon disc, 3px corona, and static LOADING label',
    'Moon travels −70px to +70px in 1400ms with animation-direction alternate and ease-in-out',
    'At centre the moon overlaps the ring, the ring brightens, and the field darkens slightly',
    'Corona opacity moves .45 → .9 at the 50% keyframe over a 180ms peak window',
    'LOADING letters do not animate',
    'Reduced motion centres the moon, keeps the ring visible, and leaves LOADING static',
    'No JavaScript, external images, or libraries',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#09111D;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css },
  spec,
  contract,
}

export default payload
