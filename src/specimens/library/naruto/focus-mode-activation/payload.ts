import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~380×360+).',
    'Import demo.css verbatim; freeze the narrow (320ms) / settle (140ms) timing from contract.json.',
    'Wire runFocusModeActivation / resetFocusModeActivation / replayFocusModeActivation.',
    'Honour both reduced-motion triggers — activate focus mode directly with no convergence/dimming transition.',
  ],
  acceptance: [
    'Four corner brackets visibly converge from the field edges onto a central reticle',
    'Peripheral dots dim once focus mode is active',
    'Replay deactivates and reactivates focus mode',
    'Reduced motion activates focus mode immediately with no transition',
    'No external assets; sandbox-safe; clipped to stage',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#101318;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
