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
    'Mount the 620×420 card in a dark overflow-clipped host.',
    'Import demo.css verbatim; expand the #09111D overlay from the measured button centre.',
    'preventDefault on submit; disable the button and ignore re-entry while busy.',
    'Keep field values; hide text visually and swap in geometric silhouette blocks.',
    'Honour both reduced-motion triggers: instant processing, 900ms hold, instant restore.',
  ],
  acceptance: [
    'Compact native form with NAME, EMAIL, MESSAGE, and SUBMIT',
    'Submit preventDefault; duplicate submits during the run are blocked',
    'Overlay #09111D expands from the button centre in 420ms cubic-bezier(.2,.8,.2,1)',
    'Fields become silhouettes (values preserved, text hidden, labels gone)',
    'PROCESSING #72D6E8 plus a static thin line; no spinner; 900ms hold then 360ms reveal',
    'aria-busy and role=status fire; no focus trap',
    'Reduced motion skips expansion, holds 900ms, restores instantly',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:420px;background:#0d121c;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
