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
    'Mount the email row in a dark host with room for the 76×46 stamp plus a 4px backing offset.',
    'Import demo.css verbatim; freeze stamp 76×46, 3px #72D6E8 border, travel 24/−8, rot −18→−8, scale .75→1.05→1.',
    'Call window.successfulFieldStamp.trigger(root); reset then stamp once; ignore re-entry while busy.',
    'Keep aria-invalid="false"; stamp is decorative; announce via the polite status region.',
    'Honour both reduced-motion triggers with an immediate settled stamp and success border.',
  ],
  acceptance: [
    'VALIDATE lands exactly one OK stamp beside the still-readable email field',
    'Stamp is 76×46 with a 3px #72D6E8 border and #236B91 backing',
    'Entry travels 24/−8 from scale .75 rotate −18deg to 0/0/1/−8deg in 280ms',
    'Overshoot scale(1.05) near 220ms then 120ms settle; no bounce loop',
    'Success border is #72D6E8 plus a highlight; aria-invalid stays false',
    'Replay resets then restamps without adding DOM nodes',
    'Reduced motion shows stamp + success border immediately; no rotation/scale travel',
    'No external assets or libraries',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:240px;background:#111827;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
