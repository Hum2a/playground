import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~420×320+).',
    'Import demo.css verbatim; freeze compressMs 200 / reconstructMs 220 / apertureOpenPx 44 / emptyHoldMs 80 from contract.json.',
    'Wire runTeleportCardTransfer / resetTeleportCardTransfer / replayTeleportCardTransfer.',
    'Listen for a postMessage `{ type: "restart" }` to replay; honour both reduced-motion triggers.',
  ],
  acceptance: contract.acceptance,
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#070B0E;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
