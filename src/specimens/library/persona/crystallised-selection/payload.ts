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
    'Mount the radiogroup with per-option crystal facets (five each) in a relative frame.',
    'Import demo.css verbatim; keep frozen polygons and approach transforms.',
    'Call selectCrystallised(choice); outgoing facets separate while incoming assemble.',
    'Keep decorative facets/sweep aria-hidden; announce selection via polite status.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with the instant lock path.',
  ],
  acceptance: [
    'Exactly five primary glass regions converge from distinct directions',
    'Selected label moves minimally (5px / 1.025); geometry visibly locks; final state static',
    'Switching separates old crystal (~120ms) without teleporting geometry between items',
    'Pale diagonal sweep 90ms then disappears; no targeting reticle; no spring',
    'Reduced motion immediate; polygons frozen in contract.json; sandbox-safe',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#071525;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
