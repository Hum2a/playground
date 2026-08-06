import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount stage with overflow hidden; import demo.css verbatim.',
    'Wire Impact wipe to runYellowImpactWipe (320ms in + 280ms out).',
    'Announce scene changes via aria-live region.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Scene A visible in idle state',
    'Yellow plane sweeps across stage',
    'Scene B revealed after wipe completes',
    'Live region announces scene change',
    'Reduced motion swaps scenes instantly',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#101010;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
