import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~380×380+).',
    'Import demo.css verbatim; freeze openMs 260 / radius 3.6rem / anglesDeg [0,90,180,270] / sectorCount 4 from contract.json.',
    'Wire runShurikenRadialMenu / resetShurikenRadialMenu / replayShurikenRadialMenu.',
    'Honour both reduced-motion triggers — sectors open immediately.',
  ],
  acceptance: contract.acceptance,
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#0C1014;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
