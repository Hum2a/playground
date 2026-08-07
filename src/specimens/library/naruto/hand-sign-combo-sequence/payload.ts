import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~420×320+).',
    'Import demo.css verbatim; freeze stepMs 130 / snapMs 110 / settleMs 90 / readyHoldMs 220 from contract.json.',
    'Wire runHandSignComboSequence / resetHandSignComboSequence / replayHandSignComboSequence.',
    'Optional keys 1–4 acquire in order; honour both reduced-motion triggers.',
  ],
  acceptance: contract.acceptance,
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#140C0C;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
