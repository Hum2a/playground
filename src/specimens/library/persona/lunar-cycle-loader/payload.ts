import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount in a 420×300 dark host; keep the 72px moon circular via equal width/height.',
    'Import demo.css verbatim; do not restyle to host tokens or interrupt the 8s phase cycle.',
    'Treat the moon as decorative; expose loading in surrounding product copy.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion by freezing at quarter phase.',
  ],
  acceptance: [
    'A 72px geometric moon cycles new → crescent → quarter → gibbous → full → wane → new in 8s',
    'LOADING label stays static; no per-letter animation',
    '1px mute orbit remains visible around the moon',
    'Loop has no obvious jump at the full-moon midpoint',
    'Reduced motion freezes a readable quarter moon with LOADING visible',
    'No JavaScript, external images, or libraries',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#09111d;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css },
  spec,
  contract,
}

export default payload
