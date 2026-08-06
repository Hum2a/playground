import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration:   [
    "Notch at 68% of bar; confirm only after crossing.",
    "Pointer and Space holds plus Run auto-hold.",
    "Wire runTriggerBreakpointConfirm / resetTriggerBreakpointConfirm / replayTriggerBreakpointConfirm."
  ],
  acceptance:   [
    "Visible notch at ~68% along hold bar",
    "Release before notch cancels without confirm",
    "Crossing notch then completing hold confirms",
    "Reduced motion keeps threshold without glow animation",
    "Status reports CANCELLED vs CONFIRMED in text"
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;">
  {{specimen}}
</div>`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
