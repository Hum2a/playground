import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration:   [
    "Hold button with determinate ring fill over 850ms.",
    "Wire runPurchaseConfirmHold / resetPurchaseConfirmHold / replayPurchaseConfirmHold."
  ],
  acceptance:   [
    "Idle ring empty; holding fills clockwise",
    "Release before 850ms cancels",
    "Full hold confirms purchase",
    "Reduced motion keeps threshold without ring sweep",
    "Run performs deterministic confirm cycle"
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#0B0F14;">
  {{specimen}}
</div>`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
