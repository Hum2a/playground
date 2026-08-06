import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~420×320+).',
    'Import demo.css verbatim; freeze snap/link timings from contract.json.',
    'Wire runThreePersonCellFormation / resetThreePersonCellFormation / replayThreePersonCellFormation.',
    'Listen for a postMessage `{ type: "restart" }` to replay; honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Idle shows three nodes scattered away from the centre point, status SCATTERED',
    'Active phase snaps all three nodes into triangular positions',
    'Resolved phase lights the connecting lines between nodes, status FORMED',
    'Replay scatters the nodes before rerunning',
    'Reduced motion shows the formed, linked state immediately',
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
