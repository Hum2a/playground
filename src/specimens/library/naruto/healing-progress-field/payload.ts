import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
    integration: [
    'Mount inside a relative + overflow host (~420×320+).',
    'Import demo.css verbatim; freeze tileCount 25 / staggerMs 220 from contract.json.',
    'Wire runHealingProgressField / resetHealingProgressField / replayHealingProgressField.',
    'Honour both reduced-motion triggers.',
  ], / 25 tiles / 160ms from contract.json.',
    'Wire runHealingProgressField / reset / replay.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: contract.acceptance,
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#070B0E;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
