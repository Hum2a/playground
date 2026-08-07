import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inline; import demo.css verbatim.',
    'COMPLETE sets data-phase=complete and reveals the diamond; RESET restores orbit.',
    'Honour both reduced-motion triggers by removing orbit/counter-spin animations.',
  ],
  acceptance: [
    'Four primitives (circle, upright cross, square, triangle) orbit a central hub on a dashed rail',
    'COMPLETE stops the orbit and places shapes at N/E/S/W vertices of a diamond frame',
    'RESET clears the diamond and resumes the continuous orbit',
    'Settled layout is a diamond lock — not a scatter toward a destination panel',
    'Reduced motion shows the settled diamond instantly on COMPLETE with no orbit',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:260px;background:#0B0F14;padding:12px;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
