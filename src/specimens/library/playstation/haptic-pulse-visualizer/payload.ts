import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Pulse core and Run fire three radial bursts of four staggered rings.',
    'Wire runHapticPulseVisualizer / resetHapticPulseVisualizer / replayHapticPulseVisualizer.',
  ],
  acceptance: [
    'Core sits in a radial radar; pulses expand as concentric rings (not a hold meter)',
    'Run fires three bursts; each burst activates four staggered rings',
    'Live region announces burst count',
    'Reduced motion shows a static radial highlight without expanding animation',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#0B0F14;">
  {{specimen}}
</div>`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
