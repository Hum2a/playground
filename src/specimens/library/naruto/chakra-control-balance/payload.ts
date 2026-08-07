import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~420×300+).',
    'Import demo.css verbatim; freeze lockThreshold 0.08 / band 12% from contract.json.',
    'Wire dual-hold inputs plus runChakraControlBalance / reset / replay.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Needle must enter ±8% lock threshold inside the centre band to lock',
    'Hold both inputs; early release cancels before lock',
    'Lock holds then pulses LOCKED',
    'Replay returns needle unbalanced before rerunning',
    'Reduced motion shows LOCKED immediately',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#070b0e;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
