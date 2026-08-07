import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host with overflow: hidden.',
    'Wire runWeaknessDiscovered / resetWeaknessDiscovered.',
    'Hit 420ms then WEAK reveal 280ms; state permanent until reset.',
  ],
  acceptance: [
    'Strike flash then permanent WEAK label',
    'Reduced motion shows WEAK immediately',
    'Harness restart clears to unknown',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#101010;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
