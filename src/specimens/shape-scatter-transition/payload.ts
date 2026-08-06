import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
      "Mount in relative host; wire RUN SCATTER and restart handler."
  ],
  acceptance: [
      "RUN SCATTER animates tokens from source toward destination field",
      "Destination panel highlights when tokens arrive",
      "Reduced motion jumps directly to arrived state"
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#0B0F14;padding:12px;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
