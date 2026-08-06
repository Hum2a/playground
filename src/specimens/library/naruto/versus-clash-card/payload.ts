import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~420×320+).',
    'Import demo.css verbatim; freeze close/flash timings from contract.json.',
    'Wire runVersusClashCard / resetVersusClashCard / replayVersusClashCard.',
    'Listen for a postMessage `{ type: "restart" }` to replay; honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Idle shows two cards apart with a VS badge between them, status STANDBY',
    'Active phase closes both cards together toward the centre',
    'Resolved phase shows an impact flash and locked CLASH state',
    'Replay resets both cards apart before rerunning',
    'Reduced motion shows the clashed state immediately',
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
