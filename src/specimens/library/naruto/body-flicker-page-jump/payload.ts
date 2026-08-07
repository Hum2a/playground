import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~420×300+).',
    'Import demo.css verbatim; freeze flickerMs 140 / settleMs 90 / streakCount 5 / angles [-6,-2,0,3,7] from contract.json.',
    'Wire runBodyFlickerPageJump / resetBodyFlickerPageJump / replayBodyFlickerPageJump.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: contract.acceptance,
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#0C1014;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
