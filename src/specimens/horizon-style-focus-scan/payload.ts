import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
      "Toggle is-scanning then is-revealed states."
  ],
  acceptance: [
      "SCAN TARGET plays reticle sweep animation",
      "Metadata chips appear after scan completes",
      "Reduced motion reveals metadata instantly"
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;padding:12px;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
