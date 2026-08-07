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
    'Mount in a relative overflow-hidden frame.',
    'Import demo.css verbatim; preserve frozen axis labels/values and 90ms stagger.',
    'Call runQuirkCapabilityRadarBuild() on Analyse; reset via resetQuirkCapabilityRadarBuild().',
    'Honour both reduced-motion triggers; aria-live announces PROFILE LOCKED.',
  ],
  acceptance: [
    'Analyse draws polygon with per-axis stagger to five frozen values',
    'PROFILE LOCKED readout and aria-live announcement at completion',
    'Replay resets polygon to center before rebuild',
    'Reduced motion shows final polygon immediately',
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
