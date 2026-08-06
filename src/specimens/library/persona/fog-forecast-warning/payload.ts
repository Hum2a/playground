import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    "Mount inside relative overflow-hidden host with {{specimen}} scaffold."
],
  acceptance: [
    "FOG FORECAST label readable",
    "Date/deadline copy visible",
    "Hazard pulse loops",
    "Reduced motion shows static alert"
],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#101010;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css },
  spec,
  contract,
}

export default payload
