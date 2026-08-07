import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~420×300+) with preview.scaffold dossier host.',
    'Import demo.css verbatim; freeze bandCount 3 / stagger 110ms / lift 160ms from contract.json.',
    'Wire runTargetDossierReveal / resetTargetDossierReveal / replayTargetDossierReveal.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Idle shows three redaction bands covering intel with SEALED mark',
    'Bands lift in order 0→1→2 with 110ms stagger (160ms lift each)',
    'Resolved shows REVEALED intel with bands gone',
    'Replay restores all three bands before rerunning',
    'Reduced motion shows all bands lifted / REVEALED immediately',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#1A1612;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
