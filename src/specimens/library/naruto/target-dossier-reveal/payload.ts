import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~420×320+).',
    'Import demo.css verbatim; freeze seal/peel timings from contract.json.',
    'Wire runTargetDossierReveal / resetTargetDossierReveal / replayTargetDossierReveal.',
    'Listen for a postMessage `{ type: "restart" }` to replay; honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Idle dossier is sealed with a redaction layer over the intel, status CLASSIFIED',
    'Active phase breaks the seal and peels the redaction layer away',
    'Resolved phase shows the intel fully readable, status REVEALED',
    'Replay reseals the dossier before rerunning',
    'Reduced motion shows the revealed state immediately',
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
