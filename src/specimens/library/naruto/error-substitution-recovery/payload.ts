import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative overflow-hidden host (~420×320+).',
    'Import demo.css verbatim; freeze faultMs 170 / subMs 120 / latchMs 140 / residueCount 4 from contract.json.',
    'Wire runErrorSubstitutionRecovery / resetErrorSubstitutionRecovery / replayErrorSubstitutionRecovery.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: contract.acceptance,
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#12141A;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
