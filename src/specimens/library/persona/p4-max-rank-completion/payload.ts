import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount progression card in overflow-hidden frame.',
    'Wire runMaxRankCompletion / resetMaxRankCompletion.',
  ],
  acceptance: [
    'Whole card transforms (border, background, colour, seal) to max state',
    'Rank label becomes MAX and fill reaches 100%',
    'MAX COMPLETE seal visible at end',
    'Reset and harness restart return to rank 9',
    'Palette uses #F5C400 / #101010 / #F7F3E8 / #E8E8E8',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#101010;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
