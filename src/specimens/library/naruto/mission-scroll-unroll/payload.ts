import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~360×320+).',
    'Import demo.css verbatim; freeze the 480ms unroll / 70ms line stagger from contract.json.',
    'Wire runMissionScrollUnroll / resetMissionScrollUnroll / replayMissionScrollUnroll.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Rolled and briefed states are visually distinct',
    'Body height animates open before briefing lines reveal',
    'Replay resets the scroll before rerunning',
    'Reduced motion shows the fully open scroll with all lines visible immediately',
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
