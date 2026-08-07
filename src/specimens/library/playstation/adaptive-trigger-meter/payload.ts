import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inline; import demo.css verbatim.',
    'Pointer-hold on the L2 silhouette or Run auto-holds for 1000ms.',
    'Wire runAdaptiveTriggerMeter / resetAdaptiveTriggerMeter / replayAdaptiveTriggerMeter.',
  ],
  acceptance: [
    'L2 trigger silhouette hangs from a DualSense-shaped pad body',
    'Fill grows downward through soft → firm → lock zones over 1000ms',
    'Fill visibly slows past ~66% before ENGAGED',
    'Firm/lock zones intensify while holding; notch glows when engaged',
    'Early release before threshold returns fill and status to idle',
    'Reduced motion keeps the 1000ms threshold but removes fill/zone transitions',
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
