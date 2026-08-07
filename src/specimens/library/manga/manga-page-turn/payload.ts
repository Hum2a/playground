import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  files: { html, css, js },
  spec,
  contract,
  scaffold: `
<div style="position:relative;width:100%;min-height:400px;overflow:hidden;background:#111111;padding:16px;">
  {{specimen}}
</div>
`.trim(),
  integration: [
    'Mount current and destination pages inside a bounded page-stage with a 1100px perspective wrapper.',
    'Keep the destination beneath the current page; trigger the turning state from the current page’s outer/right edge.',
    'Wait for the supplied 760ms transition before swapping host content.',
    'Under either reduced-motion trigger, swap immediately to the flat destination page.',
  ],
  acceptance: [
    'Current page travels from right to left while the destination remains visible below it.',
    'The bounded stage never exposes a blank iframe background.',
    'Destination ends flat at exactly 0deg rotation and fills the stage.',
    'Replay resets deterministically; reduced motion changes pages immediately.',
  ],
}

export default payload
