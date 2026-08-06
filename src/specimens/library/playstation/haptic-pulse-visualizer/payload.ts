import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration:   [
    "Pulse button and Run fire three staggered waves.",
    "Wire runHapticPulseVisualizer / resetHapticPulseVisualizer / replayHapticPulseVisualizer."
  ],
  acceptance:   [
    "Each pulse emits visible expanding wave from button centre",
    "Run fires three pulses in sequence",
    "Replay clears waves before rerun",
    "Reduced motion shows static pulse highlight only",
    "Live region counts pulses in text"
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#0B0F14;">
  {{specimen}}
</div>`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
