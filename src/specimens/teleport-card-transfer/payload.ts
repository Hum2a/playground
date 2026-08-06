import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~420×320+).',
    'Import demo.css verbatim; freeze compress/reconstruct timings from contract.json.',
    'Wire runTeleportCardTransfer / resetTeleportCardTransfer / replayTeleportCardTransfer.',
    'Listen for a postMessage `{ type: "restart" }` to replay; honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Idle card sits at the source slot, destination empty, status SOURCE',
    'Active phase compresses the card at the source aperture then hides it in transit',
    'Resolved phase reconstructs the card at the destination aperture, status ARRIVED',
    'Replay returns the card to the source before rerunning',
    'Reduced motion shows the card already arrived',
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
