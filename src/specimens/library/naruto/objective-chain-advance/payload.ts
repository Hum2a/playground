import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~420×300+).',
    'Import demo.css verbatim; freeze 4 checkpoints / latch 200ms / pulse 220ms from contract.json.',
    'Wire runObjectiveChainAdvance / resetObjectiveChainAdvance / replayObjectiveChainAdvance.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Exactly 4 checkpoints; idle starts with OBJ 1 current',
    'Each checkpoint latches complete over 200ms then pulse advances 220ms',
    'Final state CLEAR with all four nodes complete',
    'Replay resets to OBJ 1 current before rerunning',
    'Reduced motion shows CLEAR immediately',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#1a1612;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
