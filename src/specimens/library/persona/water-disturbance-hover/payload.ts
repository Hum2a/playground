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
    'Mount the 460×260 surface in a relative host; import demo.css verbatim.',
    'Handle pointerenter/move/leave only on the local surface; set --disturb-x/--disturb-y in px.',
    'Reuse exactly three ring nodes; restart ripple only after ≥18px travel; max line nudge 8px.',
    'Do not read parent/top documents. Keyboard focus uses a static centre disturbance.',
    'Honour both reduced-motion triggers: static highlight only, no expanding rings or displacement.',
  ],
  acceptance: [
    'Pointer enter creates a local disturbance; coords stay inside the iframe surface',
    'Exactly three reused rings expand from --disturb-x/--disturb-y over 520ms',
    'Movement does not create unbounded DOM; leave returns the surface to calm',
    'Focus-visible produces a static equivalent highlight without requiring a pointer',
    'Reduced motion: no ripple expansion or line travel; static cyan ring remains',
    'Not a generic glow card; no parent-frame access; no external assets',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#09111D;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
