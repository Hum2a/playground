import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Notch at 68%; hatched resistance band readable before commit.',
    'Pointer hold on grip plus Run auto-hold.',
    'Wire runTriggerBreakpointConfirm / resetTriggerBreakpointConfirm / replayTriggerBreakpointConfirm.',
  ],
  acceptance: [
    'Notch labelled 68% is visible before hold begins',
    'Hatched resistance band (48–68%) is readable before commit',
    'Release before full hold cancels; past-notch then full hold confirms',
    'Status reports CANCELLED vs CONFIRMED in text',
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
