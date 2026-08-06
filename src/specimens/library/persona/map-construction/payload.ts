import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    "Mount in a relative overflow-hidden frame.",
    "Wire Explore / Reset; honour both reduced-motion triggers."
],
  acceptance: [
    "Corridors draw sequentially on explore",
    "Unexplored cells stay fogged",
    "Reset clears paths",
    "Reduced motion shows final map immediately"
],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#101010;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
