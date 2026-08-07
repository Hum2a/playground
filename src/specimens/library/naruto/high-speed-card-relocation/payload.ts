import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~440×280+).',
    'Import demo.css verbatim; freeze travelMs 200 / ghostCount 2 / leftPct [0,25] / pathPct 100 from contract.json.',
    'Wire runHighSpeedCardRelocation / resetHighSpeedCardRelocation / replayHighSpeedCardRelocation.',
    'Honour both reduced-motion triggers — card appears in slot B immediately.',
  ],
  acceptance: contract.acceptance,
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:260px;background:#0C1014;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
