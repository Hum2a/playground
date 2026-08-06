import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
      "Mount inline; import demo.css verbatim.",
      "COMPLETE toggles is-complete and injects settled corner shapes.",
      "Honour both reduced-motion triggers by removing orbit animation."
  ],
  acceptance: [
      "Four abstract shapes orbit a central hub in a continuous loop",
      "COMPLETE stops orbit and shows shapes at frame corners",
      "RESET clears completion and resumes orbit",
      "Reduced motion shows settled frame instantly on COMPLETE"
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
