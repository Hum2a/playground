import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~360×300+).',
    'Import demo.css verbatim; freeze the 480ms shape morph from contract.json.',
    'Wire runScrollToPanelTransform / resetScrollToPanelTransform / replayScrollToPanelTransform.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Sealed token and opened panel states are visually distinct',
    'Same element morphs shape rather than swapping to a different node',
    'Replay resets the token before rerunning',
    'Reduced motion shows the fully opened panel with copy visible immediately',
    'No external assets; sandbox-safe; clipped to stage',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#101318;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
