import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration:   [
    "Hold target supports pointer and Space; Run auto-holds.",
    "Resistance bands brighten as fill approaches 100%.",
    "Wire runAdaptiveTriggerMeter / resetAdaptiveTriggerMeter / replayAdaptiveTriggerMeter."
  ],
  acceptance:   [
    "Meter fill slows visually near the top third",
    "Resistance bands intensify with fill level",
    "Full hold reaches ENGAGED state",
    "Early release returns to idle",
    "Reduced motion keeps threshold but drops resistance animation"
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
