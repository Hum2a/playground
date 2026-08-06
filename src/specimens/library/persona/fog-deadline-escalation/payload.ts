import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative overflow-hidden host; import demo.css verbatim.',
    'Wire days-remaining slider to fog density and warning stripe opacity.',
    'Phases: calm (>7), pressure (4–7), critical (1–3), expired (0).',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'High days remaining shows clear card',
    'Mid range adds partial fog overlay',
    'Low days add dense fog and warning stripes',
    'Zero days shows expired state with maximum obstruction',
    'Live region announces pressure level',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#101010;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
