import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
      "Mount in fullscreen scaffold host; sequence is-open then is-traveling."
  ],
  acceptance: [
      "OPEN RIFT grows central slit then pulls Zone A through",
      "Zone B reconstructs on the far side",
      "Reduced motion swaps panels instantly"
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:12px;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
